import "dotenv/config";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { AdminUser, Award, ContactMessage, GalleryImage, Product, Review, ScheduledCall, ServiceCategory, SiteContent, TimeSlot, Vacancy } from "./models.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret && process.env.NODE_ENV === "production") throw new Error("JWT_SECRET is required in production");
const secret = jwtSecret || "ultrabulb-local-secret";
const uploadDirectory = path.resolve(process.env.UPLOAD_DIR || "uploads");
const clientDirectory = path.resolve(process.env.CLIENT_DIR || "../frontend/dist");
const serialize = (record) => {
  if (!record) return record;
  const { _id, __v, ...rest } = record;
  return { id: String(_id), ...rest };
};
const normalizeCollectionPayload = (payload) => ({
  ...payload,
  ...(payload.categoryId === "" ? { categoryId: null } : {}),
});

async function verifyAdminPassword(password, passwordHash) {
  if (!passwordHash.includes(":")) return { valid: await bcrypt.compare(password, passwordHash), legacy: false };
  const [salt, storedHash] = passwordHash.split(":");
  if (!salt || !storedHash) return { valid: false, legacy: true };
  const expected = Buffer.from(storedHash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return { valid: expected.length === actual.length && timingSafeEqual(expected, actual), legacy: true };
}

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(uploadDirectory));

const requireAdmin = (req, res, next) => {
  try {
    const token = req.cookies.ub_admin_session;
    const session = token ? jwt.verify(token, secret) : null;
    if (!session?.id) return res.status(401).json({ error: "Unauthorized" });
    req.admin = session;
    next();
  } catch { res.status(401).json({ error: "Unauthorized" }); }
};
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
const sortOrder = { order: 1 };

app.get("/api/health", (_req, res) => res.json({ ok: true, database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));
app.get("/api/content", asyncRoute(async (_req, res) => {
  const rows = await SiteContent.find().lean();
  res.json(Object.fromEntries(rows.map((row) => [row._id, row.value])));
}));
app.get("/api/products", asyncRoute(async (_req, res) => res.json((await Product.find().populate("categoryId").sort(sortOrder).lean()).map(serialize))));
app.get("/api/products/:id", asyncRoute(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("categoryId").lean();
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(serialize(product));
}));
app.get("/api/service-categories", asyncRoute(async (_req, res) => res.json((await ServiceCategory.find({ active: true }).sort(sortOrder).lean()).map(serialize))));
app.get("/api/vacancies", asyncRoute(async (_req, res) => res.json((await Vacancy.find().sort(sortOrder).lean()).map(serialize))));
app.get("/api/gallery", asyncRoute(async (_req, res) => res.json((await GalleryImage.find().sort(sortOrder).lean()).map(serialize))));
app.get("/api/awards", asyncRoute(async (_req, res) => res.json((await Award.find().sort(sortOrder).lean()).map(serialize))));
app.get("/api/time-slots", asyncRoute(async (_req, res) => res.json((await TimeSlot.find({ active: true }).sort(sortOrder).lean()).map(serialize))));
app.get("/api/reviews", asyncRoute(async (_req, res) => res.json((await Review.find({ approved: true }).select("name role company rating message avatarUrl createdAt").sort({ createdAt: -1 }).lean()).map(serialize))));
app.post("/api/reviews", asyncRoute(async (req, res) => {
  const { name, email, role, company, rating, message, avatarUrl } = req.body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) return res.status(400).json({ error: "Name, email, and message are required" });
  const review = await Review.create({ name: name.trim(), email: email.trim(), role: role?.trim() || "", company: company?.trim() || "", rating: Math.min(5, Math.max(1, Number(rating) || 5)), message: message.trim(), avatarUrl: avatarUrl?.trim() || null, approved: false });
  res.status(201).json({ ok: true, id: review.id });
}));

app.post("/api/contact", asyncRoute(async (req, res) => {
  const { name, email, subject, message, phone } = req.body || {};
  if (![name, email, subject, message].every((value) => typeof value === "string" && value.trim())) return res.status(400).json({ error: "Name, email, subject, and message are required" });
  await ContactMessage.create({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim(), phone: phone?.trim() || null });
  res.json({ ok: true });
}));
app.post("/api/projects/:id/access", asyncRoute(async (req, res) => {
  const project = await Product.findById(req.params.id).lean();
  if (!project) return res.status(404).json({ error: "Project not found" });
  const { name, email, phone, company, message } = req.body || {};
  if (!name?.trim() || !email?.trim()) return res.status(400).json({ error: "Name and email are required" });
  await ContactMessage.create({ name: name.trim(), email: email.trim(), phone: phone?.trim() || null, subject: `Project access: ${project.title}`, message: [company && `Company: ${company.trim()}`, message?.trim()].filter(Boolean).join("\n\n") || "Project access requested." });
  res.json({ ok: true });
}));
app.post("/api/schedule", asyncRoute(async (req, res) => {
  const { name, email, phone, topic, date, timeSlot, company, message } = req.body || {};
  if (![name, email, phone, topic, date, timeSlot].every((value) => typeof value === "string" && value.trim())) return res.status(400).json({ error: "Required booking fields are missing" });
  const slot = await TimeSlot.findOne({ value: timeSlot, active: true });
  if (!slot) return res.status(400).json({ error: "That time slot is unavailable" });
  const call = await ScheduledCall.create({ name: name.trim(), email: email.trim(), phone: phone.trim(), topic: topic.trim(), date: date.trim(), timeSlot: timeSlot.trim(), company: company?.trim() || null, message: message?.trim() || null });
  res.json({ ok: true, id: call.id });
}));

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
app.post("/api/admin/login", loginLimiter, asyncRoute(async (req, res) => {
  const { email, password } = req.body || {};
  const admin = await AdminUser.findOne({ email: email?.trim().toLowerCase() }).lean();
  const passwordCheck = admin ? await verifyAdminPassword(password || "", admin.passwordHash) : { valid: false, legacy: false };
  if (!admin || !passwordCheck.valid) return res.status(401).json({ error: "Invalid credentials" });
  if (passwordCheck.legacy) await AdminUser.updateOne({ _id: admin._id }, { $set: { passwordHash: await bcrypt.hash(password, 12) } });
  res.cookie("ub_admin_session", jwt.sign({ id: admin._id.toString(), email: admin.email }, secret, { expiresIn: "7d" }), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.json({ ok: true, admin: { id: admin._id, email: admin.email, name: admin.name } });
}));
app.post("/api/admin/logout", (_req, res) => { res.clearCookie("ub_admin_session"); res.json({ ok: true }); });
app.get("/api/admin/session", requireAdmin, asyncRoute(async (req, res) => res.json({ authenticated: true, admin: { id: req.admin.id, email: req.admin.email } })));
app.get("/api/admin/content", requireAdmin, asyncRoute(async (_req, res) => {
  const rows = await SiteContent.find().sort({ _id: 1 }).lean();
  res.json(rows.map((row) => ({ id: row._id, value: row.value })));
}));
app.put("/api/admin/content", requireAdmin, asyncRoute(async (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  await SiteContent.bulkWrite(items.filter((item) => item?.id).map((item) => ({ updateOne: { filter: { _id: item.id }, update: { _id: item.id, value: String(item.value ?? "") }, upsert: true } })));
  res.json({ ok: true });
}));
app.get("/api/admin/messages", requireAdmin, asyncRoute(async (_req, res) => res.json((await ContactMessage.find().sort({ createdAt: -1 }).lean()).map(serialize))));
app.patch("/api/admin/messages/:id", requireAdmin, asyncRoute(async (req, res) => res.json(serialize(await ContactMessage.findByIdAndUpdate(req.params.id, { read: Boolean(req.body.read) }, { new: true }).lean()))));
app.delete("/api/admin/messages/:id", requireAdmin, asyncRoute(async (req, res) => { await ContactMessage.findByIdAndDelete(req.params.id); res.json({ ok: true }); }));

const adminCollections = { products: Product, "service-categories": ServiceCategory, vacancies: Vacancy, gallery: GalleryImage, awards: Award, "time-slots": TimeSlot };
for (const [name, Collection] of Object.entries(adminCollections)) {
  app.get(`/api/admin/${name}`, requireAdmin, asyncRoute(async (_req, res) => res.json((await Collection.find().sort(sortOrder).lean()).map(serialize))));
  app.post(`/api/admin/${name}`, requireAdmin, asyncRoute(async (req, res) => res.status(201).json(serialize(await Collection.create(normalizeCollectionPayload(req.body))))));
  app.put(`/api/admin/${name}/:id`, requireAdmin, asyncRoute(async (req, res) => res.json(serialize(await Collection.findByIdAndUpdate(req.params.id, normalizeCollectionPayload(req.body), { new: true, runValidators: true }).lean()))));
  app.delete(`/api/admin/${name}/:id`, requireAdmin, asyncRoute(async (req, res) => { await Collection.findByIdAndDelete(req.params.id); res.json({ ok: true }); }));
}
app.get("/api/admin/reviews", requireAdmin, asyncRoute(async (_req, res) => res.json((await Review.find().sort({ createdAt: -1 }).lean()).map(serialize))));
app.patch("/api/admin/reviews/:id", requireAdmin, asyncRoute(async (req, res) => res.json(serialize(await Review.findByIdAndUpdate(req.params.id, { approved: Boolean(req.body.approved) }, { new: true }).lean()))));
app.delete("/api/admin/reviews/:id", requireAdmin, asyncRoute(async (req, res) => { await Review.findByIdAndDelete(req.params.id); res.json({ ok: true }); }));
app.get("/api/admin/calls", requireAdmin, asyncRoute(async (_req, res) => res.json((await ScheduledCall.find().sort({ createdAt: -1 }).lean()).map(serialize))));
app.patch("/api/admin/calls/:id", requireAdmin, asyncRoute(async (req, res) => res.json(serialize(await ScheduledCall.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean()))));
app.delete("/api/admin/calls/:id", requireAdmin, asyncRoute(async (req, res) => { await ScheduledCall.findByIdAndDelete(req.params.id); res.json({ ok: true }); }));

const upload = multer({ dest: uploadDirectory, limits: { fileSize: 8 * 1024 * 1024 } });
app.post("/api/admin/upload", requireAdmin, upload.single("file"), (req, res) => res.status(201).json({ url: `/uploads/${req.file.filename}` }));
app.use(express.static(clientDirectory));
app.get("/{*splat}", (req, res, next) => req.path.startsWith("/api/") ? next() : res.sendFile(path.join(clientDirectory, "index.html")));
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ error: "Internal server error" }); });

await mkdir(uploadDirectory, { recursive: true });
await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ultrabulb", {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});
app.listen(port, () => console.log(`Ultrabulb MERN API listening on ${port}`));
