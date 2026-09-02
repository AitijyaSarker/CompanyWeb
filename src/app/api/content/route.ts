import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/content — returns all site content as a flat { id: value } map
export async function GET() {
  const items = await db.siteContent.findMany();
  const map: Record<string, string> = {};
  for (const item of items) {
    map[item.id] = item.value;
  }
  return NextResponse.json(map);
}
