import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  // 1. Refresh Supabase auth session on every request
  const { supabase, response } = createMiddlewareClient(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  // 2. Protect /dashboard — redirect unauthenticated users to /auth
  if (pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // 3. Protect /admin — use cookie-based admin auth (separate from Supabase auth)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin-login")
  ) {
    const secret =
      process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD;
    const cookie = req.cookies.get("admin_auth")?.value;
    if (!secret || cookie !== secret) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all paths except static assets and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
