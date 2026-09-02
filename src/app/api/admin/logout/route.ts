import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

// POST /api/admin/logout — clears the admin session cookie
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearSessionCookie());
  return res;
}
