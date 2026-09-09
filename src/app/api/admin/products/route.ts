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
    galleryUrls,
    category,
    categoryId,
    techStack,
    review,
    awards,
    accessFeatures,
    serviceOwners,
    link,
    tags,
    featured,
    order,
  } = body as {
    title?: string;
    description?: string;
    imageUrl?: string;
    galleryUrls?: string | null;
    category?: string;
    categoryId?: string | null;
    techStack?: string | null;
    review?: string | null;
    awards?: string | null;
    accessFeatures?: string | null;
    serviceOwners?: string | null;
    link?: string | null;
    tags?: string | null;
    featured?: boolean;
    order?: number;
  };

  if (!title || !description || !imageUrl || (!category && !categoryId)) {
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
      galleryUrls: galleryUrls || null,
          category: category || (categoryId ? (await db.serviceCategory.findUnique({ where: { id: categoryId } }))?.name : "") || "General",
      categoryId: categoryId || null,
      techStack: techStack || null,
      review: review || null,
      awards: awards || null,
      accessFeatures: accessFeatures || null,
      serviceOwners: serviceOwners || null,
      link: link ?? null,
      tags: tags ?? null,
      featured: featured ?? false,
      order: typeof order === "number" ? order : 0,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
