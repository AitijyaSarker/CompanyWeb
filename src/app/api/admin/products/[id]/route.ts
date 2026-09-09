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

  const existing = await db.product.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await db.product.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(galleryUrls !== undefined && { galleryUrls: galleryUrls || null }),
      ...(category !== undefined && { category }),
      ...(categoryId !== undefined && { categoryId: categoryId || null }),
      ...(techStack !== undefined && { techStack: techStack || null }),
      ...(review !== undefined && { review: review || null }),
      ...(awards !== undefined && { awards: awards || null }),
      ...(accessFeatures !== undefined && { accessFeatures: accessFeatures || null }),
      ...(serviceOwners !== undefined && { serviceOwners: serviceOwners || null }),
      ...(link !== undefined && { link }),
      ...(tags !== undefined && { tags }),
      ...(featured !== undefined && { featured }),
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

  const existing = await db.product.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.product.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
