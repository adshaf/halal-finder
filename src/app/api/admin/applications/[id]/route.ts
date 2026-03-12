import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { geocodeAddress } from "@/app/actions/geocode";

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

// Slugify a restaurant name + suburb
function makeSlug(name: string, suburb: string) {
  const base = `${name} ${suburb}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-${Date.now()}`;
}

// PATCH — approve or reject an application
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { action, notes } = await req.json(); // action: 'approve' | 'reject'

  const supabase = adminClient();

  if (action === "reject") {
    const { error } = await supabase
      .from("restaurant_applications")
      .update({ status: "rejected", admin_notes: notes ?? null })
      .eq("id", id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  if (action === "approve") {
    // Fetch the application
    const { data: app, error: fetchErr } = await supabase
      .from("restaurant_applications")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr || !app)
      return Response.json({ error: "Application not found" }, { status: 404 });

    // Check for potential duplicates by address
    const { data: dupes } = app.address
      ? await supabase
          .from("restaurants")
          .select("id, name, address")
          .ilike("address", `%${app.address.split(",")[0]}%`)
      : { data: [] };

    // Convert hours string to array (split by newline or semicolon)
    const hoursArr = app.hours
      ? app.hours.split(/[\n;]/).map((h: string) => h.trim()).filter(Boolean)
      : [];

    // Insert into restaurants — unfeatured, unverified
    const { data: inserted, error: insertErr } = await supabase.from("restaurants").insert({
      slug: makeSlug(app.name, app.suburb ?? ""),
      name: app.name,
      description: app.description ?? null,
      long_description: app.long_description ?? null,
      cuisine: app.cuisine ?? null,
      address: app.address ?? null,
      location: app.suburb ?? null,
      phone: app.phone ?? null,
      email: app.email ?? null,
      website: app.website ?? null,
      hours: hoursArr.length ? hoursArr : null,
      image: app.image_urls?.[0] ?? app.banner_url ?? null,
      hero_image: app.banner_url ?? null,
      gallery: app.image_urls?.length ? app.image_urls : null,
      halal_certified: app.halal_certified ?? false,
      no_pork: app.no_pork ?? false,
      no_alcohol: app.no_alcohol ?? false,
      muslim_owned: app.muslim_owned ?? false,
      prayer_room: app.prayer_room ?? false,
      muslim_chefs: app.muslim_chefs ?? false,
      halal_chicken: app.halal_chicken ?? false,
      halal_beef: app.halal_beef ?? false,
      seafood_options: app.seafood_options ?? false,
      vegetarian_options: app.vegetarian_options ?? false,
      vegan_options: false,
      featured: false,
      verified: false,
    }).select("id").single();

    if (insertErr)
      return Response.json({ error: insertErr.message }, { status: 500 });

    // Auto-geocode the new restaurant
    if (inserted?.id && app.address) {
      const geo = await geocodeAddress(app.address);
      if (geo) {
        await supabase
          .from("restaurants")
          .update({ latitude: geo.lat, longitude: geo.lng })
          .eq("id", inserted.id);
      }
    }

    // Update application status
    await supabase
      .from("restaurant_applications")
      .update({ status: "approved", admin_notes: notes ?? null })
      .eq("id", id);

    return Response.json({ ok: true, potentialDuplicates: dupes ?? [] });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}

// GET — fetch one application + duplicate check
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = adminClient();

  const { data: app, error } = await supabase
    .from("restaurant_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !app)
    return Response.json({ error: "Not found" }, { status: 404 });

  // Only run duplicate check for pending applications — approved/rejected ones
  // already have a restaurant entry in the DB which would falsely match itself.
  if (app.status !== "pending") {
    return Response.json({ app, duplicates: [] });
  }

  // Duplicate check — match by address street number + street name
  const addressKey = app.address?.split(",")[0] ?? "";
  const nameKey = app.name ?? "";

  const [byAddress, byName] = await Promise.all([
    addressKey
      ? supabase
          .from("restaurants")
          .select("id, name, address, location")
          .ilike("address", `%${addressKey}%`)
      : { data: [] },
    supabase
      .from("restaurants")
      .select("id, name, address, location")
      .ilike("name", `%${nameKey.split(" ")[0]}%`),
  ]);

  const dupeIds = new Set<number>();
  const duplicates: { id: number; name: string; address: string | null; location: string | null; matchType: string }[] = [];

  for (const r of byAddress.data ?? []) {
    if (!dupeIds.has(r.id)) {
      dupeIds.add(r.id);
      duplicates.push({ ...r, matchType: "address" });
    }
  }
  for (const r of byName.data ?? []) {
    if (!dupeIds.has(r.id)) {
      dupeIds.add(r.id);
      duplicates.push({ ...r, matchType: "name" });
    }
  }

  return Response.json({ app, duplicates });
}
