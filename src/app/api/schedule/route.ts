import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/schedule — public scheduled call submission
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const timeSlot =
    typeof body.timeSlot === "string" ? body.timeSlot.trim() : "";
  const company =
    typeof body.company === "string" && body.company.trim()
      ? body.company.trim()
      : null;
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : null;

  if (!name || !email || !phone || !topic || !date || !timeSlot) {
    return NextResponse.json(
      { error: "Name, email, phone, topic, date, and timeSlot are required" },
      { status: 400 }
    );
  }

  const call = await db.scheduledCall.create({
    data: {
      name,
      email,
      phone,
      company,
      topic,
      date,
      timeSlot,
      message,
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true, id: call.id });
}
