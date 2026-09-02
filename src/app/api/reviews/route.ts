import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/reviews — returns only approved reviews, newest first
export async function GET() {
  const reviews = await db.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reviews);
}

// POST /api/reviews — public review submission (pending approval)
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const ratingRaw = body.rating;
  const rating =
    typeof ratingRaw === "string" ? parseInt(ratingRaw, 10) : ratingRaw;
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be a number between 1 and 5" },
      { status: 400 }
    );
  }

  const review = await db.review.create({
    data: {
      name,
      email,
      role,
      company,
      rating,
      message,
      approved: false,
    },
  });

  return NextResponse.json({ ok: true, id: review.id });
}
