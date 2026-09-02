import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/gallery — returns gallery images ordered by `order` asc
export async function GET() {
  const images = await db.galleryImage.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(images);
}
