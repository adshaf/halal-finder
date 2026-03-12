import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function checkAuth(req: NextRequest) {
  const secret =
    process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD;
  return req.cookies.get("admin_auth")?.value === secret;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = adminClient();

  const [total, verified, featured, pendingApps] = await Promise.all([
    supabase
      .from("restaurants")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("restaurants")
      .select("*", { count: "exact", head: true })
      .eq("verified", true),
    supabase
      .from("restaurants")
      .select("*", { count: "exact", head: true })
      .eq("featured", true),
    supabase
      .from("restaurant_applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  return Response.json({
    total: total.count ?? 0,
    verified: verified.count ?? 0,
    featured: featured.count ?? 0,
    pendingApps: pendingApps.count ?? 0,
  });
}
