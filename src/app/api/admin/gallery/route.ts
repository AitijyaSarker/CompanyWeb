import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const images = await db.galleryImage.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(images);
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

  const { title, imageUrl, category, order } = body as {
    title?: string;
    imageUrl?: string;
    category?: string;
    order?: number;
  };

  if (!title || !imageUrl || !category) {
    return NextResponse.json(
      { error: "Missing required fields: title, imageUrl, category" },
      { status: 400 }
    );
  }

  const image = await db.galleryImage.create({
    data: {
      title,
      imageUrl,
      category,
      order: typeof order === "number" ? order : 0,
    },
  });

  return NextResponse.json(image, { status: 201 });
}
