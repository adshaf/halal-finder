"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Star,
  MapPin,
  FileText,
  MessageSquare,
  LogOut,
  Loader2,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Restaurant } from "@/lib/constants";

// ── Types ────────────────────────────────────────────────────────────────────

type SavedRow = {
  restaurant_id: number;
  created_at: string;
  restaurants: Restaurant;
};

type Application = {
  id: string;
  name: string;
  cuisine: string | null;
  suburb: string | null;
  submitted_at: string;
  status: "pending" | "approved" | "rejected";
  admin_notes: string | null;
};

type Review = {
  id: number;
  rating: number;
  body: string | null;
  created_at: string;
  restaurants: { name: string; slug: string };
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Application["status"] }) {
  if (status === "approved")
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
        <CheckCircle2 size={11} /> Approved
      </span>
    );
  if (status === "rejected")
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">
        <XCircle size={11} /> Rejected
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">
      <Clock size={11} /> Pending
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          className={n <= rating ? "text-gold fill-gold" : "text-slate-600"}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Tab = "saved" | "applications" | "reviews";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<Tab>("saved");

  const [saved, setSaved] = useState<SavedRow[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth");
        return;
      }

      setUser(user);

      const [savedIdsRes, appRes, reviewRes] = await Promise.all([
        supabase
          .from("saved_restaurants")
          .select("restaurant_id, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("restaurant_applications")
          .select("id, name, cuisine, suburb, submitted_at, status, admin_notes")
          .eq("submitted_by", user.id)
          .order("submitted_at", { ascending: false }),
        supabase
          .from("reviews")
          .select("id, rating, body, created_at, restaurant_id")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (savedIdsRes.error) console.error("saved_restaurants query error:", savedIdsRes.error);
      if (appRes.error) console.error("applications query error:", appRes.error);
      if (reviewRes.error) console.error("reviews query error:", reviewRes.error);

      // Fetch full restaurant data for saved rows
      const savedIds = (savedIdsRes.data ?? []).map((r) => r.restaurant_id);
      let savedRestaurants: Restaurant[] = [];
      if (savedIds.length > 0) {
        const { data } = await supabase
          .from("restaurants")
          .select("*")
          .in("id", savedIds);
        savedRestaurants = (data as Restaurant[]) ?? [];
      }
      const savedRows: SavedRow[] = (savedIdsRes.data ?? []).map((row) => ({
        restaurant_id: row.restaurant_id,
        created_at: row.created_at,
        restaurants: savedRestaurants.find((r) => r.id === row.restaurant_id)!,
      })).filter((row) => row.restaurants);

      // Fetch restaurant name/slug for reviews
      const reviewRestaurantIds = (reviewRes.data ?? []).map((r) => r.restaurant_id);
      let reviewRestaurants: { id: number; name: string; slug: string }[] = [];
      if (reviewRestaurantIds.length > 0) {
        const { data } = await supabase
          .from("restaurants")
          .select("id, name, slug")
          .in("id", reviewRestaurantIds);
        reviewRestaurants = data ?? [];
      }
      const reviewRows: Review[] = (reviewRes.data ?? []).map((r) => ({
        id: r.id,
        rating: r.rating,
        body: r.body,
        created_at: r.created_at,
        restaurants: reviewRestaurants.find((rest) => rest.id === r.restaurant_id) ?? { name: "Unknown", slug: "" },
      }));

      setSaved(savedRows);
      setApplications((appRes.data as Application[]) ?? []);
      setReviews(reviewRows);
      setLoading(false);
    }

    load();
  }, [router]);

  async function unsaveRestaurant(restaurantId: number) {
    if (!user) return;
    const supabase = createClient();
    await supabase
      .from("saved_restaurants")
      .delete()
      .eq("user_id", user.id)
      .eq("restaurant_id", restaurantId);
    setSaved((prev) => prev.filter((r) => r.restaurant_id !== restaurantId));
  }

  async function deleteReview(reviewId: number) {
    const supabase = createClient();
    await supabase.from("reviews").delete().eq("id", reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const userInitial =
    user?.user_metadata?.full_name?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "U";

  const displayName =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "User";

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-gold" />
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: "saved", label: "Saved", icon: <Heart size={16} />, count: saved.length },
    { id: "applications", label: "Applications", icon: <FileText size={16} />, count: applications.length },
    { id: "reviews", label: "My Reviews", icon: <MessageSquare size={16} />, count: reviews.length },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-200">
      {/* Header */}
      <div className="border-b border-gold/10 bg-warm-dark/60 backdrop-blur-sm px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-bold text-lg">
              {userInitial}
            </div>
            <div>
              <p className="font-bold text-slate-100">{displayName}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/searchResults"
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400 hover:text-gold transition-colors"
            >
              Explore <ChevronRight size={14} />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-dark-surface/60 border border-gold/10 rounded-xl p-1 mb-8 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === t.id
                  ? "bg-gold text-dark-bg shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.icon}
              {t.label}
              {t.count > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    tab === t.id ? "bg-dark-bg/20 text-dark-bg" : "bg-gold/10 text-gold"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Saved Restaurants ─────────────────────────────────────────────── */}
        {tab === "saved" && (
          <div>
            {saved.length === 0 ? (
              <EmptyState
                icon={<Heart size={32} className="text-gold/40" />}
                title="No saved restaurants yet"
                description="Bookmark restaurants while exploring to find them here."
                cta={{ label: "Explore restaurants", href: "/searchResults" }}
              />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {saved.map((row) => {
                  const r = row.restaurants;
                  return (
                    <div
                      key={row.restaurant_id}
                      className="bg-dark-surface/60 border border-gold/10 rounded-xl overflow-hidden hover:border-gold/25 transition-colors"
                    >
                      {r.image && (
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-full h-36 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-bold text-slate-100 truncate">{r.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {[r.cuisine, r.location].filter(Boolean).join(" · ")}
                            </p>
                          </div>
                          <button
                            onClick={() => unsaveRestaurant(row.restaurant_id)}
                            className="text-slate-600 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                            title="Remove from saved"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <Link
                          href={`/restaurant/${r.slug}`}
                          target="_blank"
                          className="mt-3 flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold/80 transition-colors"
                        >
                          View Details <ExternalLink size={11} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Applications ──────────────────────────────────────────────────── */}
        {tab === "applications" && (
          <div>
            {applications.length === 0 ? (
              <EmptyState
                icon={<FileText size={32} className="text-gold/40" />}
                title="No applications submitted"
                description="Submit a restaurant listing and track its status here."
                cta={{ label: "Submit a restaurant", href: "/application" }}
              />
            ) : (
              <div className="space-y-3">
                <div className="flex justify-end mb-1">
                  <Link
                    href="/application"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
                  >
                    + Submit another restaurant
                  </Link>
                </div>
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-dark-surface/60 border border-gold/10 rounded-xl p-5 hover:border-gold/25 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-bold text-slate-100">{app.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin size={11} />
                          {[app.cuisine, app.suburb].filter(Boolean).join(" · ") || "—"}
                        </p>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                    {app.admin_notes && (
                      <p className="mt-3 text-xs text-slate-400 bg-dark-bg/40 rounded-lg px-3 py-2 border border-gold/5">
                        <span className="font-semibold text-slate-300">Admin note: </span>
                        {app.admin_notes}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-slate-600">
                      Submitted{" "}
                      {new Date(app.submitted_at).toLocaleDateString("en-AU", {
                        dateStyle: "medium",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Reviews ───────────────────────────────────────────────────────── */}
        {tab === "reviews" && (
          <div>
            {reviews.length === 0 ? (
              <EmptyState
                icon={<MessageSquare size={32} className="text-gold/40" />}
                title="No reviews written yet"
                description="Visit a restaurant page and share your experience."
                cta={{ label: "Explore restaurants", href: "/searchResults" }}
              />
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-dark-surface/60 border border-gold/10 rounded-xl p-5 hover:border-gold/25 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link
                          href={`/restaurant/${review.restaurants.slug}`}
                          target="_blank"
                          className="font-bold text-slate-100 hover:text-gold transition-colors flex items-center gap-1"
                        >
                          {review.restaurants.name}
                          <ExternalLink size={12} />
                        </Link>
                        <div className="mt-1">
                          <Stars rating={review.rating} />
                        </div>
                      </div>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="text-slate-600 hover:text-red-400 transition-colors shrink-0"
                        title="Delete review"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {review.body && (
                      <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                        {review.body}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-slate-600">
                      {new Date(review.created_at).toLocaleDateString("en-AU", {
                        dateStyle: "medium",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Empty state helper ────────────────────────────────────────────────────────

function EmptyState({
  icon,
  title,
  description,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: { label: string; href: string };
}) {
  return (
    <div className="text-center py-16 px-6">
      <div className="flex justify-center mb-4">{icon}</div>
      <p className="font-bold text-slate-300 mb-2">{title}</p>
      <p className="text-sm text-slate-500 mb-6">{description}</p>
      <Link
        href={cta.href}
        className="inline-flex items-center gap-2 bg-gold text-dark-bg text-sm font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
      >
        {cta.label} <ChevronRight size={15} />
      </Link>
    </div>
  );
}
