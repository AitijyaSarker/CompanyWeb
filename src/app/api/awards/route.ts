import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/awards — returns awards ordered by `order` asc
export async function GET() {
  const awards = await db.award.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(awards);
}
