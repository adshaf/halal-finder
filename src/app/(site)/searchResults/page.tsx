"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Heart,
  ChevronRight,
  SlidersHorizontal,
  X,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Restaurant } from "@/lib/constants";

const priceOptions = ["$", "$$", "$$$"];

const FEATURE_FILTERS: { label: string; key: keyof Restaurant }[] = [
  { label: "No Alcohol", key: "no_alcohol" },
  { label: "No Pork", key: "no_pork" },
  { label: "Halal Certified", key: "halal_certified" },
  { label: "Muslim Owned", key: "muslim_owned" },
  { label: "Prayer Room", key: "prayer_room" },
  { label: "Vegetarian Options", key: "vegetarian_options" },
  { label: "Vegan Options", key: "vegan_options" },
];

function SearchResultsInner() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("restaurants")
      .select("*")
      .order("featured", { ascending: false })
      .order("name")
      .then(({ data }) => {
        setRestaurants(data ?? []);
        setLoading(false);
      });
  }, []);

  const cuisineOptions = [...new Set(restaurants.map((r) => r.cuisine).filter(Boolean))] as string[];

  const toggleCuisine = (c: string) =>
    setSelectedCuisines((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const filtered = restaurants.filter((r) => {
    if (
      searchQuery &&
      !r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.location?.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (selectedCuisines.length && !selectedCuisines.includes(r.cuisine ?? ""))
      return false;
    if (selectedPrice && r.price !== selectedPrice) return false;
    for (const feat of selectedFeatures) {
      const match = FEATURE_FILTERS.find((f) => f.label === feat);
      if (match && !r[match.key]) return false;
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedCuisines([]);
    setSelectedPrice("");
    setSelectedFeatures([]);
  };

  const FilterPanel = () => (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
          <SlidersHorizontal size={15} />
          Filters
        </h2>
        <button
          onClick={resetFilters}
          className="text-xs text-gold hover:text-gold/80 font-semibold transition-colors"
        >
          RESET
        </button>
      </div>

      {/* Cuisine */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Cuisine
        </h3>
        {cuisineOptions.map((c) => (
          <label key={c} className="flex items-center gap-3 mb-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedCuisines.includes(c)}
              onChange={() => toggleCuisine(c)}
              className="w-4 h-4 rounded accent-deep-green border-zinc-600"
            />
            <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
              {c}
            </span>
          </label>
        ))}
      </div>

      <div className="h-px bg-white/5" />

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Price Range (AUD)
        </h3>
        <div className="flex gap-2">
          {priceOptions.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPrice(p === selectedPrice ? "" : p)}
              className={`flex-1 py-1.5 text-sm rounded-lg border transition-all font-medium ${
                selectedPrice === p
                  ? "bg-gold text-dark-bg border-gold"
                  : "border-white/10 text-slate-400 hover:border-gold/40"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* Features */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Features
        </h3>
        {FEATURE_FILTERS.map(({ label }) => (
          <label key={label} className="flex items-center gap-3 mb-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedFeatures.includes(label)}
              onChange={() => toggleFeature(label)}
              className="w-4 h-4 rounded accent-deep-green border-zinc-600"
            />
            <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <main className="bg-warm-dark min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 pt-6">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">Sydney</span>
          <ChevronRight size={12} />
          <span className="text-slate-300">Halal Restaurants</span>
        </nav>

        {/* Page title */}
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-100">
            Halal Restaurants in Sydney
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            {loading ? "Loading..." : `${filtered.length} halal places found`}
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="flex items-center h-12 bg-zinc-900/80 border border-white/10 rounded-lg overflow-hidden focus-within:border-gold/30 transition-colors">
            <Search className="ml-4 text-slate-500 shrink-0" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants, cuisines, or suburbs..."
              className="flex-1 bg-transparent px-3 text-slate-200 placeholder:text-slate-500 text-sm outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="mr-3 text-slate-500 hover:text-slate-300">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Sort pills + mobile filter toggle */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          {["Top Rated", "Price: Low to High", "Newest"].map((sort) => (
            <button
              key={sort}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-zinc-900/60 border border-white/10 text-slate-300 hover:border-gold/30 transition-colors"
            >
              {sort}
              <ChevronDown size={14} />
            </button>
          ))}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-zinc-900/60 border border-white/10 text-slate-300"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        <div className="flex gap-6">

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile sidebar */}
          <aside
            className={`
              fixed top-0 left-0 bottom-0 z-50 w-72 overflow-y-auto transition-transform duration-300 lg:hidden
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              bg-zinc-900 border-r border-white/10 p-6
            `}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-slate-100">Filters</span>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <FilterPanel />
          </aside>

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-4">
            <FilterPanel />
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-slate-500">
                <Loader2 size={28} className="animate-spin mr-3" />
                Loading restaurants...
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <p className="text-lg font-medium mb-2">No restaurants found</p>
                <p className="text-sm">Try adjusting your filters or search term</p>
                <button onClick={resetFilters} className="mt-4 text-gold text-sm hover:underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((r) => (
                  <Link
                    key={r.id}
                    href={`/restaurant/${r.slug}`}
                    className="bg-zinc-900/60 border border-white/10 rounded-xl overflow-hidden hover:border-gold/30 transition-all cursor-pointer group block"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={r.image ?? "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"}
                        alt={r.name}
                        width={600}
                        height={220}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {r.halal_certified && (
                          <span className="bg-deep-green text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            ✓ Certified
                          </span>
                        )}
                        {r.featured && (
                          <span className="bg-gold text-dark-bg text-xs font-bold px-2.5 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      {/* Wishlist */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(r.id); }}
                        aria-label="Save to wishlist"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                      >
                        <Heart
                          size={15}
                          className={wishlist.includes(r.id) ? "text-red-400 fill-red-400" : "text-white"}
                        />
                      </button>
                    </div>

                    {/* Card body */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1 gap-2">
                        <h3 className="font-display font-bold text-slate-100 text-base leading-tight">
                          {r.name}
                        </h3>
                        {r.verified && (
                          <span className="text-primary text-xs font-bold shrink-0">✓ Verified</span>
                        )}
                      </div>

                      <p className="text-slate-500 text-xs mb-3 line-clamp-2">{r.description}</p>

                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {r.location}
                        </span>
                        {r.price && (
                          <>
                            <span className="text-slate-600">•</span>
                            <span>{r.price}</span>
                          </>
                        )}
                        {r.cuisine && (
                          <>
                            <span className="text-slate-600">•</span>
                            <span>{r.cuisine}</span>
                          </>
                        )}
                      </div>

                      {/* Feature pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {r.no_alcohol && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                            No Alcohol
                          </span>
                        )}
                        {r.prayer_room && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                            Prayer Room
                          </span>
                        )}
                        {r.muslim_owned && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                            Muslim Owned
                          </span>
                        )}
                      </div>

                      <div className="w-full py-2.5 rounded-lg border border-gold/40 text-gold text-sm font-bold text-center hover:bg-gold/10 transition-colors">
                        View Details
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchResults() {
  return (
    <Suspense>
      <SearchResultsInner />
    </Suspense>
  );
}
