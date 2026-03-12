"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { HALAL_ICONS } from "@/lib/constants";
import type { Restaurant } from "@/lib/constants";

export default function FeaturedCollections() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("restaurants")
      .select("*")
      .eq("featured", true)
      .limit(3)
      .then(async ({ data: featured }) => {
        if ((featured?.length ?? 0) >= 3) {
          setRestaurants(featured!);
        } else {
          const needed = 3 - (featured?.length ?? 0);
          const featuredIds = (featured ?? []).map((r) => r.id);
          const { data: rest } = await supabase
            .from("restaurants")
            .select("*")
            .not(
              "id",
              "in",
              featuredIds.length ? `(${featuredIds.join(",")})` : "(0)",
            )
            .limit(needed);
          setRestaurants([...(featured ?? []), ...(rest ?? [])]);
        }
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 px-6 lg:px-20 bg-dark-bg text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4">
              Featured Restaurants
            </h2>
            <p className="text-slate-400">
              Hand-picked halal dining spots across Sydney.
            </p>
          </div>
          <Link
            href="/searchResults"
            className="text-gold font-bold flex items-center gap-2 hover:underline decoration-2 underline-offset-4"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="flex items-center justify-center h-48 text-slate-500">
            <Loader2 size={24} className="animate-spin mr-2" />
            Loading...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((r) => (
              <Link
                key={r.id}
                href={`/restaurant/${r.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer block"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-4/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      r.image ??
                      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"
                    }
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {r.verified && (
                    <div className="absolute top-4 right-4 bg-dark-bg/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1">
                      <CheckCircle2 size={11} /> Verified
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-transparent to-transparent opacity-60" />
                </div>
                <h3 className="font-display text-xl font-bold group-hover:text-gold transition-colors mb-1">
                  {r.name}
                </h3>
                <p className="text-slate-400 text-sm mb-3 flex items-center gap-1.5">
                  <MapPin size={13} className="text-gold shrink-0" />
                  {r.location}
                  {r.cuisine && (
                    <>
                      <span className="text-slate-600">·</span>
                      {r.cuisine}
                    </>
                  )}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
