import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/contact — public contact form submission
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const phone =
    typeof body.phone === "string" && body.phone.trim()
      ? body.phone.trim()
      : null;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Name, email, subject, and message are required" },
      { status: 400 }
    );
  }

  await db.contactMessage.create({
    data: {
      name,
      email,
      phone,
      subject,
      message,
      read: false,
    },
  });

  return NextResponse.json({ ok: true });
}
