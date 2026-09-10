import mongoose from "mongoose";

const { Schema, model } = mongoose;
const timestamps = { timestamps: true };

export const AdminUser = model("AdminUser", new Schema({ email: { type: String, required: true, unique: true, lowercase: true }, passwordHash: { type: String, required: true }, name: { type: String, required: true } }, timestamps));
export const SiteContent = model("SiteContent", new Schema({ _id: String, value: { type: String, required: true } }, { ...timestamps, _id: false }));
export const ServiceCategory = model("ServiceCategory", new Schema({ name: { type: String, required: true }, slug: { type: String, required: true, unique: true }, description: String, active: { type: Boolean, default: true }, order: { type: Number, default: 0 } }, timestamps));
export const Product = model("Product", new Schema({ title: { type: String, required: true }, description: { type: String, required: true }, imageUrl: { type: String, required: true }, galleryUrls: String, category: { type: String, required: true }, categoryId: { type: Schema.Types.ObjectId, ref: "ServiceCategory" }, techStack: String, review: String, awards: String, accessFeatures: String, serviceOwners: String, link: String, tags: String, featured: { type: Boolean, default: false }, order: { type: Number, default: 0 } }, timestamps));
export const Vacancy = model("Vacancy", new Schema({ title: String, department: String, type: String, location: String, description: String, requirements: String, hiring: { type: Boolean, default: true }, order: { type: Number, default: 0 } }, timestamps));
export const GalleryImage = model("GalleryImage", new Schema({ title: String, imageUrl: String, category: String, order: Number, createdAt: Date }));
export const Review = model("Review", new Schema({ name: String, email: String, role: String, company: String, rating: Number, message: String, avatarUrl: String, approved: { type: Boolean, default: false }, createdAt: { type: Date, default: Date.now } }));
export const Award = model("Award", new Schema({ title: String, description: String, imageUrl: String, issuer: String, year: String, order: Number, createdAt: Date }));
export const ScheduledCall = model("ScheduledCall", new Schema({ name: String, email: String, phone: String, company: String, topic: String, date: String, timeSlot: String, message: String, status: { type: String, default: "pending" }, createdAt: { type: Date, default: Date.now } }));
export const ContactMessage = model("ContactMessage", new Schema({ name: String, email: String, phone: String, subject: String, message: String, read: { type: Boolean, default: false }, createdAt: { type: Date, default: Date.now } }));
export const TimeSlot = model("TimeSlot", new Schema({ label: String, value: String, active: { type: Boolean, default: true }, order: Number }));
