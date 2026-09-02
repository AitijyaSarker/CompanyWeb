import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    title,
    department,
    type,
    location,
    description,
    requirements,
    hiring,
    order,
  } = body as {
    title?: string;
    department?: string;
    type?: string;
    location?: string;
    description?: string;
    requirements?: string;
    hiring?: boolean;
    order?: number;
  };

  const existing = await db.vacancy.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await db.vacancy.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(department !== undefined && { department }),
      ...(type !== undefined && { type }),
      ...(location !== undefined && { location }),
      ...(description !== undefined && { description }),
      ...(requirements !== undefined && { requirements }),
      ...(hiring !== undefined && { hiring }),
      ...(order !== undefined && { order }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const existing = await db.vacancy.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.vacancy.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
