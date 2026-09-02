import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

// GET /api/admin/content — returns all SiteContent as an array (admin only)
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await db.siteContent.findMany();
  return NextResponse.json(items.map((i) => ({ id: i.id, value: i.value })));
}

// PUT /api/admin/content — bulk upsert site content (admin only)
// Body: { items: [{ id, value }] }
export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { items?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawItems = body.items;
  if (!Array.isArray(rawItems)) {
    return NextResponse.json(
      { error: "items must be an array of { id, value }" },
      { status: 400 }
    );
  }

  const items: { id: string; value: string }[] = [];
  for (const raw of rawItems) {
    if (
      raw &&
      typeof raw === "object" &&
      "id" in raw &&
      "value" in raw &&
      typeof (raw as Record<string, unknown>).id === "string" &&
      typeof (raw as Record<string, unknown>).value === "string"
    ) {
      items.push({
        id: (raw as Record<string, string>).id,
        value: (raw as Record<string, string>).value,
      });
    }
  }

  await db.$transaction(
    items.map((item) =>
      db.siteContent.upsert({
        where: { id: item.id },
        update: { value: item.value },
        create: { id: item.id, value: item.value },
      })
    )
  );

  return NextResponse.json({ ok: true });
}
