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

// GET — list all applications
export async function GET(req: NextRequest) {
  if (!checkAuth(req))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = adminClient();
  const { data, error } = await supabase
    .from("restaurant_applications")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data ?? []);
}
