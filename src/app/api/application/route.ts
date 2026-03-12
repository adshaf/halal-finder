import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { applyRateLimit, getIp } from "@/lib/ratelimit";

function adminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  // ── Rate limit ────────────────────────────────────────────────
  const { success } = await applyRateLimit.limit(getIp(req));
  if (!success) {
    return Response.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  // ── Auth — must be signed in ──────────────────────────────────
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Unauthorised" }, { status: 401 });
  }

  // ── Parse body ───────────────────────────────────────────────
  const body = await req.json();
  const {
    name, cuisine, address, suburb, phone, email, website,
    hours, description, long_description, banner_url, image_urls,
    halal_certified, no_alcohol, no_pork, muslim_owned, muslim_chefs,
    prayer_room, halal_chicken, halal_beef, seafood_options, vegetarian_options,
  } = body;

  if (!name?.trim()) {
    return Response.json({ error: "Restaurant name is required." }, { status: 400 });
  }

  // ── Insert via service role (bypasses RLS) ────────────────────
  const admin = adminClient();
  const { error } = await admin.from("restaurant_applications").insert({
    name: name.trim(),
    cuisine: cuisine?.trim() || null,
    address: address?.trim() || null,
    suburb: suburb?.trim() || null,
    phone: phone?.trim() || null,
    email: email?.trim() || null,
    website: website?.trim() || null,
    hours: hours?.trim() || null,
    description: description?.trim() || null,
    long_description: long_description?.trim() || null,
    banner_url: banner_url ?? null,
    image_urls: image_urls?.length ? image_urls : null,
    halal_certified: !!halal_certified,
    no_alcohol: !!no_alcohol,
    no_pork: !!no_pork,
    muslim_owned: !!muslim_owned,
    muslim_chefs: !!muslim_chefs,
    prayer_room: !!prayer_room,
    halal_chicken: !!halal_chicken,
    halal_beef: !!halal_beef,
    seafood_options: !!seafood_options,
    vegetarian_options: !!vegetarian_options,
    submitted_by: user.id,
  });

  if (error) {
    console.error("Application insert error:", error);
    return Response.json({ error: "Failed to submit application." }, { status: 500 });
  }

  return Response.json({ success: true });
}
