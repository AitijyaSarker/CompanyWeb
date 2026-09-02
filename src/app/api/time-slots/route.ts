import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/time-slots — returns active time slots ordered by `order` asc
export async function GET() {
  const slots = await db.timeSlot.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(slots);
}
