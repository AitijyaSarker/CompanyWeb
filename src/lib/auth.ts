import { db } from "@/lib/db";

// ---- Password hashing (Node built-in scrypt, no extra deps) ----
import {
  scryptSync,
  randomBytes,
  timingSafeEqual,
  createHmac,
} from "crypto";

const SESSION_SECRET =
  process.env.SESSION_SECRET || "ultrabulb-it-dev-secret-change-in-production-9f2k4";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, "hex");
  const testBuf = scryptSync(password, salt, 64);
  if (hashBuf.length !== testBuf.length) return false;
  return timingSafeEqual(hashBuf, testBuf);
}

// ---- Simple signed token: base64(payload).hmac ----
function sign(payload: string): string {
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = createHmac("sha256", SESSION_SECRET)
    .update(b64)
    .digest("base64url");
  return `${b64}.${sig}`;
}

function verify(token: string): string | null {
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;
  const expected = createHmac("sha256", SESSION_SECRET)
    .update(b64)
    .digest("base64url");
  try {
    if (sig.length !== expected.length) return null;
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!timingSafeEqual(a, b)) return null;
    return Buffer.from(b64, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

export function createSessionToken(adminId: string, email: string): string {
  const payload = JSON.stringify({ id: adminId, email, ts: Date.now() });
  return sign(payload);
}

export function verifySessionToken(
  token: string
): { id: string; email: string } | null {
  const decoded = verify(token);
  if (!decoded) return null;
  try {
    const parsed = JSON.parse(decoded);
    // tokens expire after 7 days
    if (Date.now() - parsed.ts > 7 * 24 * 60 * 60 * 1000) return null;
    return { id: parsed.id, email: parsed.email };
  } catch {
    return null;
  }
}

// ---- Cookie helpers (for use in Server Components / Route Handlers) ----
export const SESSION_COOKIE = "ub_admin_session";

export function setSessionCookie(token: string): string {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
    7 * 24 * 60 * 60
  }; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0;`;
}

// ---- Auth guard for API routes ----
import { cookies } from "next/headers";

export async function getAdminSession(): Promise<{
  id: string;
  email: string;
} | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<{
  id: string;
  email: string;
} | null> {
  return getAdminSession();
}

// ---- Seed default admin if none exists ----
export async function ensureDefaultAdmin() {
  const existing = await db.adminUser.findFirst();
  if (!existing) {
    await db.adminUser.create({
      data: {
        email: "admin@ultrabulb.com",
        passwordHash: hashPassword("admin123"),
        name: "ULTRABULB Admin",
      },
    });
  }
}
