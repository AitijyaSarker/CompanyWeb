import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await db.serviceCategory.findMany({ orderBy: { order: "asc" } }));
}

export async function POST(req: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.name || !body.slug) return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  const category = await db.serviceCategory.create({ data: { name: body.name, slug: body.slug.toLowerCase().trim().replace(/\s+/g, "-"), description: body.description || null, active: body.active ?? true, order: Number(body.order) || 0 } });
  return NextResponse.json(category, { status: 201 });
}