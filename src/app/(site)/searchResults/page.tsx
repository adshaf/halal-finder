"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Search,
  MapPin,
  Heart,
  ChevronRight,
  SlidersHorizontal,
  X,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { HALAL_ICONS, CUISINE_REGIONS } from "@/lib/constants";
import type { Restaurant } from "@/lib/constants";
import ViewToggle from "@/components/search/ViewToggle";
import RestaurantMapModal from "@/components/search/RestaurantMapModal";
import { useGeolocation } from "@/hooks/useGeolocation";

// Leaflet is browser-only — must be loaded dynamically with SSR disabled
const MapView = dynamic(() => import("@/components/search/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-slate-500">
      <Loader2 size={28} className="animate-spin mr-3" />
      Loading map...
    </div>
  ),
});

// Columns fetched for the map — skips heavy text fields not needed for pins/modal
const MAP_COLUMNS = [
  "id", "slug", "name", "cuisine", "price", "location", "image",
  "verified", "featured", "latitude", "longitude",
  "halal_certified", "no_alcohol", "no_pork", "muslim_owned",
  "muslim_chefs", "prayer_room", "halal_chicken", "halal_beef",
  "seafood_options", "vegetarian_options",
].join(", ");

const priceOptions = ["$", "$$", "$$$"];

// Three-state checkbox for region headers (checked / indeterminate / unchecked)
function RegionCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: (e: React.MouseEvent) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={() => {}}
      onClick={onChange}
      className="w-4 h-4 rounded accent-primary border-zinc-600 cursor-pointer shrink-0"
    />
  );
}

// Grouped cuisine filter — collapsible regions with child cuisine checkboxes
function CuisineSection({
  selectedCuisines,
  toggleCuisine,
  toggleRegion,
}: {
  selectedCuisines: string[];
  toggleCuisine: (c: string) => void;
  toggleRegion: (region: string, cuisines: string[]) => void;
}) {
  const [expandedRegions, setExpandedRegions] = useState<string[]>([]);

  useEffect(() => {
    setExpandedRegions((prev) => {
      const toAdd = CUISINE_REGIONS.filter(({ cuisines }) =>
        cuisines.some((c) => selectedCuisines.includes(c))
      ).map(({ region }) => region);
      return [...new Set([...prev, ...toAdd])];
    });
  }, [selectedCuisines]);

  const toggleExpand = (region: string) =>
    setExpandedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );

  return (
    <div className="space-y-0.5">
      {CUISINE_REGIONS.map(({ region, cuisines }) => {
        const selectedCount = cuisines.filter((c) =>
          selectedCuisines.includes(c)
        ).length;
        const allSelected = selectedCount === cuisines.length;
        const someSelected = selectedCount > 0 && !allSelected;
        const isExpanded = expandedRegions.includes(region);

        return (
          <div key={region}>
            <div className="flex items-center gap-2 py-1.5 px-1 rounded-lg hover:bg-white/5 transition-colors group">
              <RegionCheckbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleRegion(region, cuisines);
                }}
              />
              <button
                onClick={() => toggleExpand(region)}
                className="flex items-center justify-between flex-1 text-left gap-2 min-w-0"
              >
                <span
                  className={`text-sm font-medium transition-colors truncate ${
                    selectedCount > 0 ? "text-slate-200" : "text-slate-400 group-hover:text-slate-300"
                  }`}
                >
                  {region}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {selectedCount > 0 && (
                    <span className="text-xs text-gold font-bold">{selectedCount}</span>
                  )}
                  <ChevronRight
                    size={13}
                    className={`text-slate-600 transition-transform duration-200 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {isExpanded && (
              <div className="ml-6 mb-1 border-l border-white/8 pl-3 space-y-0.5">
                {cuisines.map((c) => {
                  const active = selectedCuisines.includes(c);
                  return (
                    <label key={c} className="flex items-center gap-2.5 py-1 cursor-pointer group/item">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleCuisine(c)}
                        className="w-3.5 h-3.5 rounded accent-primary border-zinc-700 cursor-pointer shrink-0"
                      />
                      <span
                        className={`text-sm transition-colors ${
                          active ? "text-slate-200 font-medium" : "text-slate-500 group-hover/item:text-slate-300"
                        }`}
                      >
                        {c}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

type FilterPanelProps = {
  selectedCuisines: string[];
  selectedPrice: string;
  selectedFeatures: string[];
  toggleCuisine: (c: string) => void;
  toggleRegion: (region: string, cuisines: string[]) => void;
  setSelectedPrice: (p: string) => void;
  toggleFeature: (f: string) => void;
  resetFilters: () => void;
};

function FilterPanel({
  selectedCuisines,
  selectedPrice,
  selectedFeatures,
  toggleCuisine,
  toggleRegion,
  setSelectedPrice,
  toggleFeature,
  resetFilters,
}: FilterPanelProps) {
  const totalActive =
    selectedCuisines.length + (selectedPrice ? 1 : 0) + selectedFeatures.length;

  return (
    <div className="bg-dark-surface/60 border border-gold/15 rounded-xl p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
          <SlidersHorizontal size={15} />
          Filters
          {totalActive > 0 && (
            <span className="bg-gold text-dark-bg text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
              {totalActive}
            </span>
          )}
        </h2>
        {totalActive > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-gold hover:text-gold/80 font-semibold transition-colors"
          >
            RESET
          </button>
        )}
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Cuisine</h3>
        <CuisineSection
          selectedCuisines={selectedCuisines}
          toggleCuisine={toggleCuisine}
          toggleRegion={toggleRegion}
        />
      </div>

      <div className="h-px bg-white/5" />

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Price Range (AUD)</h3>
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

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Features</h3>
        <div className="space-y-2">
          {HALAL_ICONS.map(({ key, label, file }) => {
            const active = selectedFeatures.includes(String(key));
            return (
              <button
                key={String(key)}
                onClick={() => toggleFeature(String(key))}
                className={`flex items-center gap-3 w-full rounded-lg px-2 py-1.5 transition-colors ${
                  active ? "bg-primary/10" : "hover:bg-white/5"
                }`}
              >
                <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={`/assets/halal-icons/${file}-${active ? "true" : "false"}.png`}
                    alt={label}
                    fill
                    className="object-cover scale-[1.1]"
                    unoptimized
                  />
                </div>
                <span className={`text-sm transition-colors ${active ? "text-primary font-medium" : "text-slate-400"}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SearchResultsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(searchQuery);

  // Cards state — server-filtered, paginated
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Map state — all restaurants, partial columns, client-filtered
  const [mapRestaurants, setMapRestaurants] = useState<Restaurant[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [view, setView] = useState<"cards" | "map">("cards");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const { position: userPosition, request: requestGeo } = useGeolocation();

  // Responsive page size
  const [pageSize, setPageSize] = useState(12);
  useEffect(() => {
    const update = () => setPageSize(window.innerWidth >= 768 ? 30 : 12);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCuisines, selectedPrice, selectedFeatures]);

  // ── Cards fetch — server-side filtered + paginated ────────────────────────
  useEffect(() => {
    if (view === "map") return;

    const supabase = createClient();
    setLoading(true);

    const offset = (currentPage - 1) * pageSize;
    let query = supabase
      .from("restaurants")
      .select("*", { count: "exact" })
      .order("featured", { ascending: false })
      .order("name")
      .range(offset, offset + pageSize - 1);

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,cuisine.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`
      );
    }
    if (selectedCuisines.length) {
      query = query.in("cuisine", selectedCuisines);
    }
    if (selectedPrice) {
      query = query.eq("price", selectedPrice);
    }
    for (const feature of selectedFeatures) {
      query = query.eq(feature as keyof Restaurant, true);
    }

    query.then(({ data, count }) => {
      setRestaurants(data ?? []);
      setTotalCount(count ?? 0);
      setLoading(false);
    });
  }, [searchQuery, selectedCuisines, selectedPrice, selectedFeatures, currentPage, pageSize, view]);

  // ── Map fetch — all restaurants, partial columns, fires once per session ──
  useEffect(() => {
    if (view !== "map" || mapLoaded) return;

    const supabase = createClient();
    supabase
      .from("restaurants")
      .select(MAP_COLUMNS)
      .order("featured", { ascending: false })
      .order("name")
      .then(({ data }) => {
        setMapRestaurants((data as unknown as Restaurant[]) ?? []);
        setMapLoaded(true);
      });
  }, [view, mapLoaded]);

  // ── Load saved IDs for logged-in user ──────────────────────────────────────
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from("saved_restaurants")
        .select("restaurant_id")
        .eq("user_id", user.id)
        .then(({ data }) => {
          if (data) setWishlist(data.map((r) => r.restaurant_id));
        });
    });
  }, []);

  const toggleCuisine = (c: string) =>
    setSelectedCuisines((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const toggleRegion = (region: string, cuisines: string[]) => {
    const allSelected = cuisines.every((c) => selectedCuisines.includes(c));
    if (allSelected) {
      setSelectedCuisines((prev) => prev.filter((c) => !cuisines.includes(c)));
    } else {
      setSelectedCuisines((prev) => [...new Set([...prev, ...cuisines])]);
    }
  };

  // Auto-detect cuisine/region keywords from the search query
  useEffect(() => {
    if (!searchQuery) return;
    const q = searchQuery.toLowerCase();
    const matched: string[] = [];
    for (const { region, cuisines } of CUISINE_REGIONS) {
      if (region.toLowerCase().includes(q)) {
        matched.push(...cuisines);
      } else {
        for (const c of cuisines) {
          if (c.toLowerCase().includes(q)) matched.push(c);
        }
      }
    }
    if (matched.length > 0) setSelectedCuisines(matched);
  }, [searchQuery]);

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const toggleWishlist = async (id: number) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth");
      return;
    }
    const isSaved = wishlist.includes(id);
    setWishlist((prev) => isSaved ? prev.filter((x) => x !== id) : [...prev, id]);
    if (isSaved) {
      await supabase.from("saved_restaurants").delete().eq("user_id", user.id).eq("restaurant_id", id);
    } else {
      await supabase.from("saved_restaurants").insert({ user_id: user.id, restaurant_id: id });
    }
  };

  const resetFilters = () => {
    setSelectedCuisines([]);
    setSelectedPrice("");
    setSelectedFeatures([]);
  };

  const handleSearch = () => {
    const q = inputValue.trim();
    router.push(`/searchResults?q=${encodeURIComponent(q)}`);
  };

  // Map: client-side filter the pre-fetched lightweight dataset
  const mapFiltered = mapRestaurants.filter((r) => {
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
    for (const key of selectedFeatures) {
      if (!r[key as keyof Restaurant]) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(totalCount / pageSize);
  const displayCount = view === "map" ? mapFiltered.length : totalCount;

  return (
    <div className="pt-24 pb-16">
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
            {loading && view === "cards" ? "Loading..." : `${displayCount} halal places found`}
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="flex items-center h-12 bg-dark-surface/60 border border-gold/15 rounded-lg overflow-hidden focus-within:border-gold/40 transition-colors">
            <Search className="ml-4 text-slate-500 shrink-0" size={18} />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search restaurants, cuisines, or suburbs..."
              className="flex-1 bg-transparent px-3 text-slate-200 placeholder:text-slate-500 text-sm outline-none"
            />
            {inputValue && (
              <button
                onClick={() => { setInputValue(""); router.push("/searchResults"); }}
                className="text-slate-500 hover:text-slate-300 px-2"
              >
                <X size={16} />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="h-full px-4 bg-gold/10 border-l border-gold/15 text-gold text-sm font-semibold hover:bg-gold/20 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* View toggle + mobile filter toggle */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <ViewToggle
            view={view}
            onToggle={(v) => {
              setView(v);
              if (v === "map") requestGeo();
              if (v === "cards") setSelectedRestaurant(null);
            }}
          />
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-dark-surface/60 border border-gold/15 text-slate-300"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-[1500] bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile sidebar */}
          <aside
            className={`
              fixed top-0 left-0 bottom-0 z-[2000] w-72 overflow-y-auto transition-transform duration-300 lg:hidden
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              bg-dark-bg border-r border-gold/15 p-6
            `}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-slate-100">Filters</span>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <FilterPanel
              selectedCuisines={selectedCuisines}
              selectedPrice={selectedPrice}
              selectedFeatures={selectedFeatures}
              toggleCuisine={toggleCuisine}
              toggleRegion={toggleRegion}
              setSelectedPrice={setSelectedPrice}
              toggleFeature={toggleFeature}
              resetFilters={resetFilters}
            />
          </aside>

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-4">
            <FilterPanel
              selectedCuisines={selectedCuisines}
              selectedPrice={selectedPrice}
              selectedFeatures={selectedFeatures}
              toggleCuisine={toggleCuisine}
              toggleRegion={toggleRegion}
              setSelectedPrice={setSelectedPrice}
              toggleFeature={toggleFeature}
              resetFilters={resetFilters}
            />
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {loading && view === "cards" ? (
              <div className="flex items-center justify-center h-64 text-slate-500">
                <Loader2 size={28} className="animate-spin mr-3" />
                Loading restaurants...
              </div>
            ) : view === "map" ? (
              <div key={searchQuery} className="h-[calc(100vh-220px)] min-h-[400px] rounded-xl overflow-hidden">
                <MapView
                  restaurants={mapFiltered}
                  userPosition={userPosition}
                  searchQuery={searchQuery}
                  onSelectRestaurant={setSelectedRestaurant}
                />
              </div>
            ) : restaurants.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <p className="text-lg font-medium mb-2">No restaurants found</p>
                <p className="text-sm">Try adjusting your filters or search term</p>
                <button onClick={resetFilters} className="mt-4 text-gold text-sm hover:underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {restaurants.map((r) => (
                    <Link
                      key={r.id}
                      href={`/restaurant/${r.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-dark-surface/0 border border-green rounded-xl overflow-hidden hover:border-gold transition-all cursor-pointer group flex flex-col"
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
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          {r.featured && (
                            <span className="bg-gold text-dark-bg text-xs font-bold px-2.5 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
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
                      <div className="p-4 flex flex-col flex-1">
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

                        {/* Halal attribute icons */}
                        <div className="grid grid-cols-5 gap-1.5 mb-4">
                          {HALAL_ICONS.map(({ key, label, file }) => (
                            <div key={key} className="flex flex-col items-center gap-0.5">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                <Image
                                  src={`/assets/halal-icons/${file}-${r[key] ? "true" : "false"}.png`}
                                  alt={label}
                                  fill
                                  className="object-cover scale-[1.1]"
                                  unoptimized
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto w-full py-2.5 rounded-lg border border-gold/40 text-gold text-sm font-bold text-center hover:bg-gold/10 transition-colors">
                          View Details
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-10">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border border-white/10 text-slate-400 hover:border-gold/40 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) =>
                        p === 1 || p === totalPages || (p >= currentPage - 2 && p <= currentPage + 2)
                      )
                      .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, i) =>
                        p === "…" ? (
                          <span key={`ellipsis-${i}`} className="px-2 text-slate-600 text-sm">…</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p as number)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === p
                                ? "bg-gold text-dark-bg font-bold"
                                : "border border-white/10 text-slate-400 hover:border-gold/40 hover:text-gold"
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border border-white/10 text-slate-400 hover:border-gold/40 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <RestaurantMapModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense>
      <SearchResultsInner />
    </Suspense>
  );
}
