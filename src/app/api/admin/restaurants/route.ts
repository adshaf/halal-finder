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

const PAGE_SIZE = 50;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, hoursText, ...rest } = body;

  if (!name?.trim())
    return Response.json({ error: "Name is required." }, { status: 400 });

  const supabase = adminClient();

  // Generate unique slug
  const base = slugify(name.trim());
  let slug = base;
  let attempt = 0;
  while (true) {
    const { data } = await supabase
      .from("restaurants")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!data) break;
    attempt++;
    slug = `${base}-${attempt + 1}`;
  }

  const hours = hoursText
    ? hoursText.split("\n").map((l: string) => l.trim()).filter(Boolean)
    : null;

  const { data, error } = await supabase
    .from("restaurants")
    .insert({ name: name.trim(), slug, hours, ...rest })
    .select("id, slug")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, id: data.id, slug: data.slug });
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const search = searchParams.get("q") ?? "";
  const from = (page - 1) * PAGE_SIZE;

  const supabase = adminClient();
  let query = supabase
    .from("restaurants")
    .select("*", { count: "exact" })
    .order("name")
    .range(from, from + PAGE_SIZE - 1);

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,cuisine.ilike.%${search}%,location.ilike.%${search}%`
    );
  }

  const { data, count, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data, count, page, pageSize: PAGE_SIZE });
}
