import { NextRequest, NextResponse } from "next/server";
import { adminLoginRateLimit, getIp } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const { success } = await adminLoginRateLimit.limit(getIp(req));
  if (!success)
    return NextResponse.json(
      { error: "Too many attempts — please wait before trying again" },
      { status: 429 }
    );

  const { password } = await req.json();

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD not configured on server" },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // The cookie value is ADMIN_SESSION_SECRET (or falls back to ADMIN_PASSWORD).
  // The middleware checks for this exact value.
  const sessionSecret =
    process.env.ADMIN_SESSION_SECRET ?? adminPassword;

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_auth", sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // No maxAge — session cookie, expires when browser closes
    path: "/",
  });

  return response;
}
