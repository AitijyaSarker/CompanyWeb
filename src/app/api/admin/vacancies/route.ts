import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vacancies = await db.vacancy.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(vacancies);
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

  if (!title || !department || !type || !location || !description || !requirements) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: title, department, type, location, description, requirements",
      },
      { status: 400 }
    );
  }

  const vacancy = await db.vacancy.create({
    data: {
      title,
      department,
      type,
      location,
      description,
      requirements,
      hiring: hiring ?? true,
      order: typeof order === "number" ? order : 0,
    },
  });

  return NextResponse.json(vacancy, { status: 201 });
}
