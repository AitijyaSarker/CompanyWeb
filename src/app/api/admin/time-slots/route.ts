import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const slots = await db.timeSlot.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(slots);
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { label, value, active, order } = body as {
    label?: string;
    value?: string;
    active?: boolean;
    order?: number;
  };

  if (!label || !value) {
    return NextResponse.json(
      { error: "Missing required fields: label, value" },
      { status: 400 }
    );
  }

  const slot = await db.timeSlot.create({
    data: {
      label,
      value,
      active: active ?? true,
      order: typeof order === "number" ? order : 0,
    },
  });

  return NextResponse.json(slot, { status: 201 });
}
