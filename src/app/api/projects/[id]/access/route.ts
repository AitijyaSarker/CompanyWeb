import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendProjectInquiryEmail } from "@/lib/project-inquiry-email";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.product.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const body = await req.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!name || !email) return NextResponse.json({ error: "Name and email are required" }, { status: 400 });

  await db.contactMessage.create({ data: { name, email, phone: phone || null, subject: `Project access: ${project.title}`, message: [company && `Company: ${company}`, message].filter(Boolean).join("\n\n") || "Project access requested.", read: false } });
  let emailSent = false;
  try { emailSent = await sendProjectInquiryEmail({ projectTitle: project.title, name, email, phone, company, message }); } catch { emailSent = false; }
  return NextResponse.json({ ok: true, emailSent });
}