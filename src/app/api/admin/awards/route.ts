import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const awards = await db.award.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(awards);
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

  const { title, description, imageUrl, issuer, year, order } = body as {
    title?: string;
    description?: string;
    imageUrl?: string;
    issuer?: string;
    year?: string;
    order?: number;
  };

  if (!title || !description || !imageUrl || !issuer || !year) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: title, description, imageUrl, issuer, year",
      },
      { status: 400 }
    );
  }

  const award = await db.award.create({
    data: {
      title,
      description,
      imageUrl,
      issuer,
      year,
      order: typeof order === "number" ? order : 0,
    },
  });

  return NextResponse.json(award, { status: 201 });
}
