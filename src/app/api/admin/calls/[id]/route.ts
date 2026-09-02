import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

const ALLOWED_STATUSES = new Set([
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

export async function PATCH(
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

  const { status } = body as { status?: string };

  if (!status || typeof status !== "string") {
    return NextResponse.json(
      { error: "Field 'status' (string) is required" },
      { status: 400 }
    );
  }

  if (!ALLOWED_STATUSES.has(status)) {
    return NextResponse.json(
      {
        error: `Invalid status. Allowed values: ${[...ALLOWED_STATUSES].join(
          ", "
        )}`,
      },
      { status: 400 }
    );
  }

  const existing = await db.scheduledCall.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await db.scheduledCall.update({
    where: { id },
    data: { status },
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

  const existing = await db.scheduledCall.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.scheduledCall.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
