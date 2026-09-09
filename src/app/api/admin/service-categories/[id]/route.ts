import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const category = await db.serviceCategory.update({ where: { id }, data: { ...(body.name !== undefined && { name: body.name }), ...(body.slug !== undefined && { slug: body.slug.toLowerCase().trim().replace(/\s+/g, "-") }), ...(body.description !== undefined && { description: body.description || null }), ...(body.active !== undefined && { active: body.active }), ...(body.order !== undefined && { order: Number(body.order) || 0 }) } });
  return NextResponse.json(category);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.serviceCategory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}