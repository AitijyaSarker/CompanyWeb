import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { access, mkdir } from "node:fs/promises";
import { Readable } from "node:stream";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { AdminUser, Award, ContactMessage, GalleryImage, Product, Review, ScheduledCall, ServiceCategory, SiteContent, TimeSlot, Vacancy } from "./models.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret && process.env.NODE_ENV === "production") throw new Error("JWT_SECRET is required in production");
const secret = jwtSecret || "ultrabulb-local-secret";
const uploadDirectory = path.resolve(process.env.UPLOAD_DIR || "uploads");
const defaultClientDirectory = path.resolve(__dirname, "../dist");
const clientDirectory = process.env.CLIENT_DIR && path.isAbsolute(process.env.CLIENT_DIR)
  ? path.resolve(process.env.CLIENT_DIR)
  : defaultClientDirectory;
const assetDirectory = path.join(clientDirectory, "assets");
const isProduction = process.env.NODE_ENV === "production";
const configuredOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
const cloudinaryEnabled = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
if (cloudinaryEnabled) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}
const serialize = (record) => {
  if (!record) return record;
  const { _id, __v, ...rest } = record;
  return { id: String(_id), ...rest };
};
const companyContentOverrides = {
  contact_email: "contact@ultrabulbit.com",
  footer_email: "contact@ultrabulbit.com",
  contact_address: "Sylhet, Bangladesh",
  footer_address: "Sylhet, Bangladesh",
};
const companyContentRows = () => Object.entries(companyContentOverrides).map(([id, value]) => ({ id, value }));
const applyCompanyContentOverrides = (content) => ({ ...content, ...companyContentOverrides });
const normalizeCollectionPayload = (payload) => ({
  ...payload,
  ...(payload.categoryId === "" ? { categoryId: null } : {}),
});
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_TEXT_LENGTH = 2000;
const text = (value, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const isEmail = (value) => EMAIL_RE.test(value);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  return configuredOrigins.includes(origin.replace(/\/$/, ""));
}

function validateSameOrigin(req, res, next) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) return next();
  const origin = req.get("origin");
  const referer = req.get("referer");
  let source = origin || "";
  if (!source && referer) {
    try {
      source = new URL(referer).origin;
    } catch {
      return res.status(403).json({ error: "Invalid request origin" });
    }
  }
  if (isProduction && !source) return res.status(403).json({ error: "Missing request origin" });
  if (source && !isAllowedOrigin(source)) return res.status(403).json({ error: "Invalid request origin" });
  next();
}

async function verifyAdminPassword(password, passwordHash) {
  if (!passwordHash.includes(":")) return { valid: await bcrypt.compare(password, passwordHash), legacy: false };
  const [salt, storedHash] = passwordHash.split(":");
  if (!salt || !storedHash) return { valid: false, legacy: true };
  const expected = Buffer.from(storedHash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return { valid: expected.length === actual.length && timingSafeEqual(expected, actual), legacy: true };
}

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (isProduction) res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});
app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
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

const publicWriteLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });
const adminWriteLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: true, legacyHeaders: false });

app.get("/api/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ ok: connected, database: connected ? "connected" : "disconnected" });
});
app.get("/api/content", asyncRoute(async (_req, res) => {
  const rows = await SiteContent.find().lean();
  res.json(applyCompanyContentOverrides(Object.fromEntries(rows.map((row) => [row._id, row.value]))));
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
app.post("/api/reviews", publicWriteLimiter, asyncRoute(async (req, res) => {
  const { name, email, role, company, rating, message, avatarUrl } = req.body || {};
  const cleanedName = text(name, 120);
  const cleanedEmail = text(email, 254).toLowerCase();
  const cleanedMessage = text(message, MAX_TEXT_LENGTH);
  if (!cleanedName || !isEmail(cleanedEmail) || !cleanedMessage) return res.status(400).json({ error: "Name, valid email, and message are required" });
  const review = await Review.create({ name: cleanedName, email: cleanedEmail, role: text(role, 120), company: text(company, 120), rating: Math.min(5, Math.max(1, Number(rating) || 5)), message: cleanedMessage, avatarUrl: text(avatarUrl, 500) || null, approved: false });
  res.status(201).json({ ok: true, id: review.id });
}));

app.post("/api/contact", publicWriteLimiter, asyncRoute(async (req, res) => {
  const { name, email, subject, message, phone } = req.body || {};
  const cleanedName = text(name, 120);
  const cleanedEmail = text(email, 254).toLowerCase();
  const cleanedSubject = text(subject, 180);
  const cleanedMessage = text(message, MAX_TEXT_LENGTH);
  if (!cleanedName || !isEmail(cleanedEmail) || !cleanedSubject || !cleanedMessage) return res.status(400).json({ error: "Name, valid email, subject, and message are required" });
  await ContactMessage.create({ name: cleanedName, email: cleanedEmail, subject: cleanedSubject, message: cleanedMessage, phone: text(phone, 50) || null });
  res.json({ ok: true });
}));
app.post("/api/projects/:id/access", publicWriteLimiter, asyncRoute(async (req, res) => {
  const project = await Product.findById(req.params.id).lean();
  if (!project) return res.status(404).json({ error: "Project not found" });
  const { name, email, phone, company, message } = req.body || {};
  const cleanedName = text(name, 120);
  const cleanedEmail = text(email, 254).toLowerCase();
  if (!cleanedName || !isEmail(cleanedEmail)) return res.status(400).json({ error: "Name and valid email are required" });
  await ContactMessage.create({ name: cleanedName, email: cleanedEmail, phone: text(phone, 50) || null, subject: `Project access: ${project.title}`, message: [company && `Company: ${text(company, 120)}`, text(message, MAX_TEXT_LENGTH)].filter(Boolean).join("\n\n") || "Project access requested." });
  res.json({ ok: true });
}));
app.post("/api/schedule", publicWriteLimiter, asyncRoute(async (req, res) => {
  const { name, email, phone, topic, date, timeSlot, company, message } = req.body || {};
  const cleanedName = text(name, 120);
  const cleanedEmail = text(email, 254).toLowerCase();
  const cleanedDate = text(date, 10);
  const cleanedTimeSlot = text(timeSlot, 80);
  if (!cleanedName || !isEmail(cleanedEmail) || !text(phone, 50) || !text(topic, 180) || !DATE_RE.test(cleanedDate) || !cleanedTimeSlot) return res.status(400).json({ error: "Required booking fields are missing or invalid" });
  const slot = await TimeSlot.findOne({ value: cleanedTimeSlot, active: true });
  if (!slot) return res.status(400).json({ error: "That time slot is unavailable" });
  const call = await ScheduledCall.create({ name: cleanedName, email: cleanedEmail, phone: text(phone, 50), topic: text(topic, 180), date: cleanedDate, timeSlot: cleanedTimeSlot, company: text(company, 120) || null, message: text(message, MAX_TEXT_LENGTH) || null });
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
app.use("/api/admin", validateSameOrigin, adminWriteLimiter);
app.post("/api/admin/logout", (_req, res) => { res.clearCookie("ub_admin_session", { sameSite: "lax", secure: isProduction }); res.json({ ok: true }); });
app.get("/api/admin/session", requireAdmin, asyncRoute(async (req, res) => res.json({ authenticated: true, admin: { id: req.admin.id, email: req.admin.email } })));
app.get("/api/admin/content", requireAdmin, asyncRoute(async (_req, res) => {
  const rows = await SiteContent.find().sort({ _id: 1 }).lean();
  const byId = new Map(rows.map((row) => [row._id, { id: row._id, value: row.value }]));
  for (const row of companyContentRows()) byId.set(row.id, row);
  res.json([...byId.values()].sort((a, b) => a.id.localeCompare(b.id)));
}));
app.put("/api/admin/content", requireAdmin, asyncRoute(async (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  const normalizedItems = items
    .filter((item) => item?.id)
    .map((item) => ({ id: item.id, value: companyContentOverrides[item.id] ?? String(item.value ?? "") }));
  await SiteContent.bulkWrite(normalizedItems.map((item) => ({ updateOne: { filter: { _id: item.id }, update: { _id: item.id, value: item.value }, upsert: true } })));
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

const upload = multer({
  storage: cloudinaryEnabled ? multer.memoryStorage() : multer.diskStorage({ destination: uploadDirectory }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => callback(null, /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)),
});
const uploadToCloudinary = (buffer) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream({ folder: "ultrabulb" }, (error, result) => error ? reject(error) : resolve(result));
  Readable.from(buffer).pipe(stream);
});
app.post("/api/admin/upload", requireAdmin, upload.single("file"), asyncRoute(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "An image file is required" });
  if (cloudinaryEnabled) {
    const result = await uploadToCloudinary(req.file.buffer);
    return res.status(201).json({ url: result.secure_url });
  }
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
}));
app.use("/assets", express.static(assetDirectory, {
  fallthrough: false,
  immutable: true,
  maxAge: "1y",
}));
app.use(express.static(clientDirectory));
app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  return res.sendFile(path.join(clientDirectory, "index.html"), (error) => {
    if (error) next(error);
  });
});
app.use((error, req, res, _next) => {
  console.error(`${req.method} ${req.originalUrl}`, error);
  if (error?.status === 404 || error?.statusCode === 404) return res.status(404).json({ error: "Not found" });
  res.status(500).json({ error: "Internal server error" });
});

await mkdir(uploadDirectory, { recursive: true });
await access(path.join(clientDirectory, "index.html"));
await access(assetDirectory);
await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ultrabulb", {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});
await SiteContent.bulkWrite(companyContentRows().map((item) => ({ updateOne: { filter: { _id: item.id }, update: { _id: item.id, value: item.value }, upsert: true } })));
app.listen(port, () => console.log(`Ultrabulb MERN API listening on ${port}; serving client from ${clientDirectory}`));
