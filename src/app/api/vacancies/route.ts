import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/vacancies — returns vacancies ordered by `order` asc
export async function GET() {
  const vacancies = await db.vacancy.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(vacancies);
}
