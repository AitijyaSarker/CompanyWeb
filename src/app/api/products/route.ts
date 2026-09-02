import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/products — returns products ordered by `order` asc
export async function GET() {
  const products = await db.product.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(products);
}
