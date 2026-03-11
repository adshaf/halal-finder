"use server";

// Geocoding via Nominatim (OpenStreetMap) — free, no API key required.
// Called server-side to avoid browser rate-limit issues.
// Nominatim policy: max 1 request/second per IP. This is fine for individual
// restaurant saves; the bulk geocode utility adds a 1.1s delay between requests.

export type GeoResult = { lat: number; lng: number } | null;

export async function geocodeAddress(address: string): Promise<GeoResult> {
  if (!address.trim()) return null;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", address);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("countrycodes", "au"); // bias to Australia

    const res = await fetch(url.toString(), {
      headers: {
        // Nominatim requires a descriptive User-Agent identifying your app
        "User-Agent": "HalalBites/1.0 (halalbites.com.au)",
      },
      next: { revalidate: 0 }, // never cache geocode results
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch {
    return null;
  }
}
