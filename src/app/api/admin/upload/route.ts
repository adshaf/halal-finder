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

// POST — upload a file to Supabase Storage, return the public URL
export async function POST(req: NextRequest) {
  if (!checkAuth(req))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "admin-uploads";

  if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabase = adminClient();
  const { data, error } = await supabase.storage
    .from("submissions")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const { data: urlData } = supabase.storage
    .from("submissions")
    .getPublicUrl(data.path);

  return Response.json({ url: urlData.publicUrl });
}
