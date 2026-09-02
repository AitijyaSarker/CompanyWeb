import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await db.product.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(products);
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

  const {
    title,
    description,
    imageUrl,
    category,
    link,
    tags,
    featured,
    order,
  } = body as {
    title?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    link?: string | null;
    tags?: string | null;
    featured?: boolean;
    order?: number;
  };

  if (!title || !description || !imageUrl || !category) {
    return NextResponse.json(
      { error: "Missing required fields: title, description, imageUrl, category" },
      { status: 400 }
    );
  }

  const product = await db.product.create({
    data: {
      title,
      description,
      imageUrl,
      category,
      link: link ?? null,
      tags: tags ?? null,
      featured: featured ?? false,
      order: typeof order === "number" ? order : 0,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
