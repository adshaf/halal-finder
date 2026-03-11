import { createClient } from "@supabase/supabase-js";
import { geocodeAddress } from "@/app/actions/geocode";
import type { NextRequest } from "next/server";

// Uses the service role key to bypass RLS for admin writes.
// Add SUPABASE_SERVICE_ROLE_KEY to your .env.local and Vercel env vars.
// Find it in: Supabase dashboard → Project Settings → API → service_role key.
function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(_req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return Response.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY not set in environment" },
      { status: 500 },
    );
  }

  const supabase = adminClient();

  // Fetch all restaurants that have an address but no coordinates yet
  const { data: restaurants, error } = await supabase
    .from("restaurants")
    .select("id, name, address")
    .not("address", "is", null)
    .is("latitude", null);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  if (!restaurants?.length) {
    return Response.json({ message: "No restaurants need geocoding", updated: 0 });
  }

  let updated = 0;
  const failed: string[] = [];

  for (const r of restaurants) {
    const geo = await geocodeAddress(r.address!);
    if (geo) {
      await supabase
        .from("restaurants")
        .update({ latitude: geo.lat, longitude: geo.lng })
        .eq("id", r.id);
      updated++;
    } else {
      failed.push(r.name);
    }

    // Nominatim: 1 req/sec limit — wait 1.1s between requests
    await delay(1100);
  }

  return Response.json({
    message: `Geocoded ${updated} of ${restaurants.length} restaurants`,
    updated,
    failed,
  });
}
