import "dotenv/config";
import path from "node:path";
import sqlite3 from "sqlite3";
import mongoose from "mongoose";
import { AdminUser, Award, ContactMessage, GalleryImage, Product, Review, ScheduledCall, ServiceCategory, SiteContent, TimeSlot, Vacancy } from "./models.js";

const source = path.resolve(process.env.SQLITE_PATH || "../db/custom.db");
const sqlite = new sqlite3.Database(source);
const all = (table) => new Promise((resolve, reject) => sqlite.all(`SELECT * FROM "${table}"`, (error, rows) => error ? reject(error) : resolve(rows)));
const optional = (value) => value === undefined ? null : value;

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ultrabulb", {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  const categories = await all("ServiceCategory");
  const categoryIds = new Map();
  for (const category of categories) {
    const created = await ServiceCategory.findOneAndUpdate({ slug: category.slug }, { name: category.name, slug: category.slug, description: optional(category.description), active: Boolean(category.active), order: category.order || 0 }, { upsert: true, new: true });
    categoryIds.set(category.id, created._id);
  }
  const collections = [
    ["AdminUser", AdminUser], ["SiteContent", SiteContent], ["Vacancy", Vacancy], ["GalleryImage", GalleryImage],
    ["Review", Review], ["Award", Award], ["ScheduledCall", ScheduledCall], ["ContactMessage", ContactMessage], ["TimeSlot", TimeSlot],
  ];
  for (const [table, Collection] of collections) {
    const rows = await all(table);
    if (Collection === SiteContent) await Collection.bulkWrite(rows.map((row) => ({ updateOne: { filter: { _id: row.id }, update: { _id: row.id, value: row.value }, upsert: true } })));
    else if (rows.length) await Collection.insertMany(rows.map(({ id, ...row }) => ({ ...row, legacyId: id })), { ordered: false }).catch((error) => { if (error.code !== 11000) throw error; });
  }
  const products = await all("Product");
  if (products.length) await Product.insertMany(products.map(({ id, categoryId, ...row }) => ({ ...row, categoryId: categoryIds.get(categoryId) || null, legacyId: id })), { ordered: false }).catch((error) => { if (error.code !== 11000) throw error; });
  sqlite.close();
  await mongoose.disconnect();
  console.log(`Imported ${products.length} products and ${categories.length} service categories from ${source}`);
}

main().catch(async (error) => { console.error(error); sqlite.close(); await mongoose.disconnect().catch(() => {}); process.exitCode = 1; });