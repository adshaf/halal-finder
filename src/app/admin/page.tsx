"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Store,
  ClipboardList,
  LogOut,
  Search,
  MapPin as MapPinIcon,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  ExternalLink,
  Pencil,
  TrendingUp,
  UserPlus,
  Filter,
  Download,
  Clock,
} from "lucide-react";
import { HALAL_ICONS } from "@/lib/constants";
import type { Restaurant } from "@/lib/constants";

// ── Types ────────────────────────────────────────────────────────────────────

type Stats = {
  total: number;
  verified: number;
  featured: number;
  pendingApps: number;
};

type Application = {
  id: number;
  name: string;
  description: string | null;
  long_description: string | null;
  cuisine: string | null;
  address: string | null;
  suburb: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  hours: string | null;
  banner_url: string | null;
  image_urls: string[] | null;
  halal_certified: boolean;
  no_pork: boolean;
  no_alcohol: boolean;
  muslim_owned: boolean;
  prayer_room: boolean;
  muslim_chefs: boolean;
  halal_chicken: boolean;
  halal_beef: boolean;
  seafood_options: boolean;
  vegetarian_options: boolean;
  submitted_by: string | null;
  submitted_at: string;
  status: "pending" | "approved" | "rejected";
  admin_notes: string | null;
};

type DuplicateHit = {
  id: number;
  name: string;
  address: string | null;
  location: string | null;
  matchType: "address" | "name";
};

// ── Logo ─────────────────────────────────────────────────────────────────────

const HalalBitesStar = () => (
  <svg className="size-5 text-dark-bg" fill="currentColor" viewBox="0 0 48 48">
    <path d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" />
  </svg>
);

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    approved: "bg-primary/10 text-primary border-primary/20",
    rejected: "bg-red-400/10 text-red-400 border-red-400/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${map[status] ?? map.pending}`}
    >
      {status}
    </span>
  );
}

// ── Bool toggle ───────────────────────────────────────────────────────────────

function BoolToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded accent-primary"
      />
      <span className="text-sm text-slate-400">{label}</span>
    </label>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Tab: Dashboard
// ────────────────────────────────────────────────────────────────────────────

function DashboardTab() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeResult, setGeocodeResult] = useState<string | null>(null);
  const [reviewId, setReviewId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
    fetch("/api/admin/applications")
      .then((r) => r.json())
      .then((data: Application[]) =>
        setRecentApps(Array.isArray(data) ? data.slice(0, 5) : [])
      );
  }, []);

  async function handleGeocode() {
    setGeocoding(true);
    setGeocodeResult(null);
    try {
      const res = await fetch("/api/admin/geocode-missing", { method: "POST" });
      const data = await res.json();
      setGeocodeResult(data.message ?? data.error ?? "Done");
    } catch {
      setGeocodeResult("Request failed");
    } finally {
      setGeocoding(false);
    }
  }

  const kpis = [
    {
      label: "Total Restaurants",
      value: stats?.total,
      trend: "Live count",
      trendColor: "text-gold",
      icon: Store,
      iconBg: "bg-gold/10",
      iconColor: "text-gold",
      barColor: "from-gold",
    },
    {
      label: "Pending Applications",
      value: stats?.pendingApps,
      trend: stats?.pendingApps ? `${stats.pendingApps} active` : "0 active",
      trendColor: "text-amber-400",
      icon: Clock,
      iconBg: "bg-amber-400/10",
      iconColor: "text-amber-400",
      barColor: "from-amber-400",
    },
    {
      label: "Verified Restaurants",
      value: stats?.verified,
      trend: "Live count",
      trendColor: "text-primary",
      icon: UserPlus,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      barColor: "from-primary",
    },
    {
      label: "Featured Listings",
      value: stats?.featured,
      trend: "Live count",
      trendColor: "text-slate-400",
      icon: TrendingUp,
      iconBg: "bg-white/10",
      iconColor: "text-slate-400",
      barColor: "from-slate-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-slate-100 tracking-tight">
          Overview Dashboard
        </h2>
        <p className="text-gold/60 mt-1 text-sm">
          Welcome back. Here is a live summary of HalalBites activity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(({ label, value, trend, trendColor, icon: Icon, iconBg, iconColor, barColor }) => (
          <div
            key={label}
            className="bg-dark-surface/60 p-6 rounded-2xl border border-gold/10 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`size-12 rounded-xl ${iconBg} flex items-center justify-center`}>
                <Icon size={22} className={iconColor} />
              </div>
              <span className={`${trendColor} text-xs font-bold flex items-center gap-1`}>
                {trend}
              </span>
            </div>
            <p className="text-gold/60 text-sm font-medium">{label}</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-100">
              {stats === null ? (
                <Loader2 size={22} className="animate-spin inline text-slate-600" />
              ) : (
                (value ?? 0).toLocaleString()
              )}
            </h3>
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-linear-to-r ${barColor} to-transparent opacity-50`} />
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-dark-surface/60 rounded-2xl border border-gold/10 overflow-hidden">
        <div className="p-6 border-b border-gold/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-display font-bold text-slate-100">
              Recent Restaurant Applications
            </h3>
            <p className="text-gold/50 text-sm mt-0.5">
              Latest submissions from business owners.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-lg text-sm text-slate-400 hover:bg-dark-surface/60 hover:text-slate-200 transition-colors">
              <Filter size={15} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-lg text-sm text-slate-400 hover:bg-dark-surface/60 hover:text-slate-200 transition-colors">
              <Download size={15} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {recentApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-600">
              <ClipboardList size={32} className="mb-3 text-slate-700" />
              <p className="text-sm">No applications yet</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-surface/60 text-gold/40 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Restaurant</th>
                  <th className="px-6 py-4">Cuisine</th>
                  <th className="px-6 py-4">Submission Date</th>
                  <th className="px-6 py-4">Suburb</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {recentApps.map((app) => (
                  <tr key={app.id} className="hover:bg-dark-surface/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-sm text-slate-100">{app.name}</p>
                      <p className="text-gold/40 text-xs">{app.email ?? "—"}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {app.cuisine ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gold/50">
                      {new Date(app.submitted_at).toLocaleString("en-AU", {
                        day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gold/50">
                      {app.suburb ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setReviewId(app.id)}
                        className={`font-bold text-sm transition-colors ${
                          app.status === "pending"
                            ? "text-gold hover:text-gold/80"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {app.status === "pending" ? "Review" : "View Details"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t border-gold/10 flex items-center justify-between">
          <p className="text-xs text-gold/40">
            Showing {recentApps.length} most recent applications
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="size-8 rounded flex items-center justify-center border border-gold/20 text-slate-600 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              disabled
              className="size-8 rounded flex items-center justify-center border border-gold/20 text-slate-600 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Geocode tool */}
      <div className="bg-dark-surface/60 rounded-2xl border border-gold/10 p-6">
        <h3 className="font-bold text-slate-100 text-sm mb-4">Admin Tools</h3>
        <button
          onClick={handleGeocode}
          disabled={geocoding}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gold/20 text-slate-300 hover:border-gold/40 hover:text-white text-sm transition-colors disabled:opacity-50"
        >
          {geocoding ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <MapPinIcon size={14} />
          )}
          {geocoding ? "Geocoding…" : "Geocode Missing Coordinates"}
        </button>
        <p className="text-xs text-slate-600 mt-2">
          Fills lat/lng for any restaurants missing coordinates using Nominatim.
        </p>
        {geocodeResult && (
          <p className="text-xs text-slate-400 mt-1">{geocodeResult}</p>
        )}
      </div>

      {reviewId !== null && (
        <ReviewModal
          appId={reviewId}
          onClose={() => setReviewId(null)}
          onDone={() => {
            setReviewId(null);
            fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
            fetch("/api/admin/applications")
              .then((r) => r.json())
              .then((data: Application[]) =>
                setRecentApps(Array.isArray(data) ? data.slice(0, 5) : [])
              );
          }}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Review Application Modal
// ────────────────────────────────────────────────────────────────────────────

function ReviewModal({
  appId,
  onClose,
  onDone,
}: {
  appId: number;
  onClose: () => void;
  onDone: () => void;
}) {
  const [app, setApp] = useState<Application | null>(null);
  const [dupes, setDupes] = useState<DuplicateHit[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/applications/${appId}`)
      .then((r) => r.json())
      .then((d) => {
        setApp(d.app);
        setDupes(d.duplicates ?? []);
        setLoading(false);
      });
  }, [appId]);

  async function handleAction(action: "approve" | "reject") {
    setSaving(true);
    setError("");
    const res = await fetch(`/api/admin/applications/${appId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, notes }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
    } else {
      onDone();
    }
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-dark-surface border border-gold/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto admin-scroll shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/10 sticky top-0 bg-dark-surface z-10">
          <h3 className="font-display font-bold text-slate-100 text-lg">
            Review Application
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48 text-slate-500">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : app ? (
          <div className="p-6 space-y-6">
            {/* Basic info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Name", app.name],
                ["Cuisine", app.cuisine],
                ["Address", app.address],
                ["Suburb", app.suburb],
                ["Phone", app.phone],
                ["Email", app.email],
                ["Website", app.website],
                ["Submitted by", app.submitted_by],
                [
                  "Submitted at",
                  new Date(app.submitted_at).toLocaleString("en-AU"),
                ],
              ].map(([label, val]) =>
                val ? (
                  <div key={label}>
                    <p className="text-xs text-slate-600 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    <p className="text-slate-300">{val}</p>
                  </div>
                ) : null
              )}
            </div>

            {app.description && (
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
                  Short Description
                </p>
                <p className="text-slate-300 text-sm">{app.description}</p>
              </div>
            )}

            {app.long_description && (
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
                  Full Description
                </p>
                <p className="text-slate-300 text-sm whitespace-pre-line">{app.long_description}</p>
              </div>
            )}

            {app.hours && (
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
                  Hours
                </p>
                <p className="text-slate-300 text-sm whitespace-pre-line">
                  {app.hours}
                </p>
              </div>
            )}

            {/* Halal attributes — all 10 */}
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider mb-2">
                Halal Attributes (self-reported)
              </p>
              <div className="flex flex-wrap gap-2">
                {HALAL_ICONS.map(({ key, label }) => {
                  const val = app[key as keyof Application] as boolean;
                  return (
                    <span
                      key={key}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                        val
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-white/5 text-slate-500 border-white/10"
                      }`}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Banner image */}
            {app.banner_url && (
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-2">Banner Image</p>
                <img src={app.banner_url} alt="Banner" className="w-full h-36 object-cover rounded-xl border border-gold/10" />
              </div>
            )}

            {/* Gallery images */}
            {app.image_urls && app.image_urls.length > 0 && (
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-2">Gallery Photos</p>
                <div className="grid grid-cols-3 gap-2">
                  {app.image_urls.map((url, i) => (
                    <img key={i} src={url} alt={`Photo ${i + 1}`} className="aspect-square object-cover rounded-lg border border-gold/10" />
                  ))}
                </div>
              </div>
            )}

            {/* Duplicate check */}
            {dupes.length > 0 && (
              <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={15} className="text-amber-400" />
                  <p className="text-amber-400 text-sm font-bold">
                    {dupes.length} potential duplicate
                    {dupes.length > 1 ? "s" : ""} found
                  </p>
                </div>
                <div className="space-y-2">
                  {dupes.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-start justify-between text-sm"
                    >
                      <div>
                        <p className="text-slate-200 font-medium">{d.name}</p>
                        <p className="text-slate-500 text-xs">
                          {d.address} · {d.location}
                        </p>
                      </div>
                      <span className="text-xs text-amber-400/70 shrink-0 ml-4">
                        matched by {d.matchType}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-xs text-slate-600 uppercase tracking-wider mb-2">
                Admin Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Reason for rejection, follow-up required, etc."
                className="w-full bg-dark-bg border border-gold/15 focus:border-gold/40 rounded-lg px-3 py-2 text-slate-200 placeholder:text-slate-600 text-sm outline-none resize-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleAction("approve")}
                disabled={saving || app.status !== "pending"}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-dark-bg font-bold text-sm hover:brightness-110 transition-all disabled:opacity-40"
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={15} />
                )}
                Approve & Add to Database
              </button>
              <button
                onClick={() => handleAction("reject")}
                disabled={saving || app.status !== "pending"}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-400/30 text-red-400 font-bold text-sm hover:bg-red-400/10 transition-all disabled:opacity-40"
              >
                <XCircle size={15} />
                Reject
              </button>
            </div>
          </div>
        ) : (
          <p className="p-6 text-slate-500 text-sm">Application not found.</p>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Tab: Applications
// ────────────────────────────────────────────────────────────────────────────

function ApplicationsTab() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/applications")
      .then((r) => r.json())
      .then((data) => {
        setApps(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const pending = apps.filter((a) => a.status === "pending");
  const reviewed = apps.filter((a) => a.status !== "pending");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold text-slate-100 tracking-tight">
          Applications
        </h2>
        <p className="text-gold/60 mt-1 text-sm">
          Restaurant submissions awaiting review.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-slate-500">
          <Loader2 size={24} className="animate-spin mr-3" />
          Loading applications…
        </div>
      ) : apps.length === 0 ? (
        <div className="bg-dark-surface/60 rounded-2xl border border-gold/10 p-16 text-center">
          <ClipboardList size={40} className="text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">No applications yet</p>
          <p className="text-slate-600 text-sm mt-1">
            Submitted applications will appear here for review.
          </p>
        </div>
      ) : (
        <>
          {/* Pending */}
          {pending.length > 0 && (
            <div className="bg-dark-surface/60 rounded-2xl border border-gold/10 overflow-hidden">
              <div className="p-5 border-b border-gold/10 flex items-center justify-between">
                <h3 className="font-bold text-slate-100">
                  Pending Review
                  <span className="ml-2 bg-amber-400/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">
                    {pending.length}
                  </span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gold/40 text-xs uppercase tracking-wider font-bold border-b border-gold/5">
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Cuisine</th>
                      <th className="px-5 py-3">Suburb</th>
                      <th className="px-5 py-3">Submitted</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/5">
                    {pending.map((a) => (
                      <tr
                        key={a.id}
                        className="hover:bg-white/2 transition-colors"
                      >
                        <td className="px-5 py-4 font-medium text-slate-200 text-sm">
                          {a.name}
                        </td>
                        <td className="px-5 py-4 text-slate-500 text-sm">
                          {a.cuisine ?? "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-500 text-sm">
                          {a.suburb ?? "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-600 text-sm">
                          {new Date(a.submitted_at).toLocaleDateString("en-AU")}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => setSelectedId(a.id)}
                            className="text-gold hover:text-gold/80 font-bold text-sm transition-colors"
                          >
                            Review →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviewed */}
          {reviewed.length > 0 && (
            <div className="bg-dark-surface/60 rounded-2xl border border-gold/10 overflow-hidden">
              <div className="p-5 border-b border-gold/10">
                <h3 className="font-bold text-slate-100">
                  Reviewed
                  <span className="ml-2 text-slate-600 text-sm font-normal">
                    ({reviewed.length})
                  </span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gold/40 text-xs uppercase tracking-wider font-bold border-b border-gold/5">
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Cuisine</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Submitted</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/5">
                    {reviewed.map((a) => (
                      <tr
                        key={a.id}
                        className="hover:bg-white/2 transition-colors"
                      >
                        <td className="px-5 py-4 font-medium text-slate-400 text-sm">
                          {a.name}
                        </td>
                        <td className="px-5 py-4 text-slate-600 text-sm">
                          {a.cuisine ?? "—"}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={a.status} />
                        </td>
                        <td className="px-5 py-4 text-slate-600 text-sm">
                          {new Date(a.submitted_at).toLocaleDateString("en-AU")}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => setSelectedId(a.id)}
                            className="text-slate-500 hover:text-slate-300 font-bold text-sm transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {selectedId !== null && (
        <ReviewModal
          appId={selectedId}
          onClose={() => setSelectedId(null)}
          onDone={() => {
            setSelectedId(null);
            load();
          }}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Edit Restaurant Modal
// ────────────────────────────────────────────────────────────────────────────

function EditRestaurantModal({
  restaurant,
  onClose,
  onSaved,
}: {
  restaurant: Restaurant;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Restaurant>({ ...restaurant });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof Restaurant>(key: K, value: Restaurant[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadFile(file: File, folder: string): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  }

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBanner(true);
    const url = await uploadFile(file, `admin-edits/${form.id}/banner`);
    setUploadingBanner(false);
    if (url) {
      set("hero_image", url);
      if (!form.image) set("image", url);
    } else {
      setError("Banner upload failed");
    }
    e.target.value = "";
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadingGallery(true);
    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadFile(file, `admin-edits/${form.id}/gallery`);
      if (url) urls.push(url);
    }
    setUploadingGallery(false);
    if (urls.length) {
      set("gallery", [...(form.gallery ?? []), ...urls]);
      if (!form.image) set("image", urls[0]);
    } else {
      setError("Gallery upload failed");
    }
    e.target.value = "";
  }

  function removeGalleryImage(idx: number) {
    const next = (form.gallery ?? []).filter((_, i) => i !== idx);
    set("gallery", next.length ? next : null);
    if (form.image === (form.gallery ?? [])[idx]) {
      set("image", next[0] ?? form.hero_image ?? null);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    const res = await fetch(`/api/admin/restaurants/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error ?? "Save failed");
    } else {
      onSaved();
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const inputCls =
    "w-full bg-dark-bg border border-gold/15 focus:border-gold/40 rounded-lg px-3 py-2 text-slate-200 placeholder:text-slate-600 text-sm outline-none transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-dark-surface border border-gold/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto admin-scroll shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/10 sticky top-0 bg-dark-surface z-10">
          <h3 className="font-display font-bold text-slate-100 text-lg truncate pr-4">
            Edit: {form.name}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic info */}
          <section>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Basic Info
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs text-slate-600 mb-1">Name</label>
                <input
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-600 mb-1">
                  Short Description
                </label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={2}
                  value={form.description ?? ""}
                  onChange={(e) => set("description", e.target.value || null)}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-600 mb-1">
                  Full Description
                </label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={form.long_description ?? ""}
                  onChange={(e) =>
                    set("long_description", e.target.value || null)
                  }
                />
              </div>
              {(
                [
                  ["Cuisine", "cuisine"],
                  ["Price ($  $$  $$$)", "price"],
                  ["Location (suburb)", "location"],
                  ["Address", "address"],
                  ["Phone", "phone"],
                  ["Email", "email"],
                  ["Website", "website"],
                ] as [string, keyof Restaurant][]
              ).map(([label, key]) => (
                <div key={key}>
                  <label className="block text-xs text-slate-600 mb-1">
                    {label}
                  </label>
                  <input
                    className={inputCls}
                    value={(form[key] as string) ?? ""}
                    onChange={(e) =>
                      set(key, (e.target.value || null) as Restaurant[typeof key])
                    }
                  />
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs text-slate-600 mb-1">
                  Hours (one line per period, e.g. "Mon–Fri: 11:00–22:00")
                </label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={(form.hours ?? []).join("\n")}
                  onChange={(e) =>
                    set(
                      "hours",
                      e.target.value
                        ? e.target.value.split("\n").map((l) => l.trim()).filter(Boolean)
                        : null
                    )
                  }
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          {/* Images */}
          <section>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Images
            </h4>

            {/* Banner / Hero */}
            <div className="mb-4">
              <label className="block text-xs text-slate-600 mb-2">Banner Image (hero)</label>
              {form.hero_image ? (
                <div className="relative group rounded-lg overflow-hidden border border-gold/10 mb-2" style={{ height: 120 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.hero_image} alt="Banner" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      set("hero_image", null);
                      if (form.image === form.hero_image) set("image", form.gallery?.[0] ?? null);
                    }}
                    className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gold/20 bg-dark-bg flex items-center justify-center h-20 mb-2 text-slate-600 text-xs">
                  No banner image
                </div>
              )}
              <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                disabled={uploadingBanner}
                className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors disabled:opacity-50"
              >
                {uploadingBanner ? <Loader2 size={12} className="animate-spin" /> : null}
                {uploadingBanner ? "Uploading…" : form.hero_image ? "Replace banner" : "Upload banner"}
              </button>
            </div>

            {/* Gallery */}
            <div>
              <label className="block text-xs text-slate-600 mb-2">Gallery Photos</label>
              {(form.gallery ?? []).length > 0 ? (
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {(form.gallery ?? []).map((url, i) => (
                    <div key={i} className="relative group rounded-md overflow-hidden border border-gold/10 aspect-square">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(i)}
                        className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gold/20 bg-dark-bg flex items-center justify-center h-16 mb-2 text-slate-600 text-xs">
                  No gallery images
                </div>
              )}
              <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                disabled={uploadingGallery}
                className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors disabled:opacity-50"
              >
                {uploadingGallery ? <Loader2 size={12} className="animate-spin" /> : null}
                {uploadingGallery ? "Uploading…" : "Add photos"}
              </button>
            </div>

            {/* Card thumbnail override */}
            <div className="mt-4">
              <label className="block text-xs text-slate-600 mb-1">Card Thumbnail URL</label>
              <p className="text-xs text-slate-700 mb-1.5">Auto-set from gallery/banner. Override here if needed.</p>
              <input
                className={inputCls}
                value={form.image ?? ""}
                onChange={(e) => set("image", e.target.value || null)}
                placeholder="https://…"
              />
            </div>
          </section>

          <div className="h-px bg-white/5" />

          {/* Halal attributes */}
          <section>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Halal Attributes
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {HALAL_ICONS.map(({ key, label }) => (
                <BoolToggle
                  key={String(key)}
                  label={label}
                  checked={Boolean(form[key])}
                  onChange={(v) => set(key, v as Restaurant[typeof key])}
                />
              ))}
              <BoolToggle
                label="Vegan Options"
                checked={form.vegan_options}
                onChange={(v) => set("vegan_options", v)}
              />
            </div>
          </section>

          <div className="h-px bg-white/5" />

          {/* Admin flags */}
          <section>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Admin
            </h4>
            <div className="flex gap-6">
              <BoolToggle
                label="Featured"
                checked={form.featured}
                onChange={(v) => set("featured", v)}
              />
              <BoolToggle
                label="Verified"
                checked={form.verified}
                onChange={(v) => set("verified", v)}
              />
            </div>
          </section>

          {error && (
            <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gold text-dark-bg font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Tab: Restaurants
// ────────────────────────────────────────────────────────────────────────────

function RestaurantsTab() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [editTarget, setEditTarget] = useState<Restaurant | null>(null);

  const PAGE_SIZE = 50;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const load = useCallback(
    (p: number, q: string) => {
      setLoading(true);
      fetch(`/api/admin/restaurants?page=${p}&q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((d) => {
          setRestaurants(d.data ?? []);
          setTotalCount(d.count ?? 0);
          setLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    load(page, search);
  }, [load, page, search]);

  function handleSearch() {
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-100 tracking-tight">
            Restaurants
          </h2>
          <p className="text-gold/60 mt-1 text-sm">
            {totalCount} total · page {page} of {totalPages || 1}
          </p>
        </div>
        {/* Search */}
        <div className="flex items-center h-10 bg-dark-surface/60 border border-gold/15 rounded-lg overflow-hidden focus-within:border-gold/40 transition-colors">
          <Search className="ml-3 text-slate-500 shrink-0" size={15} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Name, cuisine, location…"
            className="bg-transparent px-3 text-slate-200 placeholder:text-slate-500 text-sm outline-none w-56"
          />
          <button
            onClick={handleSearch}
            className="h-full px-3 bg-gold/10 border-l border-gold/15 text-gold text-xs font-semibold hover:bg-gold/20 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div className="bg-dark-surface/60 rounded-2xl border border-gold/10 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-slate-500">
            <Loader2 size={24} className="animate-spin mr-3" />
            Loading…
          </div>
        ) : restaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500">
            <Store size={32} className="mb-3 text-slate-700" />
            <p>No restaurants found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gold/40 text-xs uppercase tracking-wider font-bold border-b border-gold/5">
                  <th className="px-5 py-3">Restaurant</th>
                  <th className="px-5 py-3">Cuisine</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3 text-center">Verified</th>
                  <th className="px-5 py-3 text-center">Featured</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {restaurants.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {r.image && (
                          <Image
                            src={r.image}
                            alt={r.name}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-lg object-cover border border-gold/10 shrink-0"
                            unoptimized
                          />
                        )}
                        <div>
                          <p className="font-medium text-slate-200 text-sm leading-tight">
                            {r.name}
                          </p>
                          <p className="text-slate-600 text-xs">{r.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-sm">
                      {r.cuisine ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-sm">
                      {r.location ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-sm">
                      {r.price ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {r.verified ? (
                        <CheckCircle2 size={16} className="text-primary inline" />
                      ) : (
                        <span className="text-slate-700 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {r.featured ? (
                        <CheckCircle2 size={16} className="text-gold inline" />
                      ) : (
                        <span className="text-slate-700 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setEditTarget(r)}
                          className="text-gold hover:text-gold/80 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <a
                          href={`/restaurant/${r.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-slate-300 transition-colors"
                          title="View page"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gold/10 flex items-center justify-between">
            <p className="text-xs text-gold/40">
              {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, totalCount)} of {totalCount}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="size-8 rounded flex items-center justify-center border border-gold/20 text-slate-400 hover:bg-dark-surface/60 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm text-slate-400">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="size-8 rounded flex items-center justify-center border border-gold/20 text-slate-400 hover:bg-dark-surface/60 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {editTarget && (
        <EditRestaurantModal
          restaurant={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={() => {
            setEditTarget(null);
            load(page, search);
          }}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main page
// ────────────────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Applications", icon: ClipboardList },
  { label: "Restaurants", icon: Store },
] as const;

type Tab = (typeof NAV)[number]["label"];

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Dashboard");
  const [pendingCount, setPendingCount] = useState<number | null>(null);

  // Load pending count for sidebar badge
  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setPendingCount(d.pendingApps ?? 0));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
  }

  return (
    <div className="bg-dark-bg text-slate-100 min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 xl:w-72 bg-dark-surface border-r border-gold/10 flex flex-col h-screen sticky top-0 shrink-0">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-gold/10">
          <div className="size-10 rounded-full bg-gold flex items-center justify-center shrink-0">
            <HalalBitesStar />
          </div>
          <div>
            <h1 className="text-white text-lg font-display font-bold leading-none">
              HalalBites
            </h1>
            <p className="text-slate-500 text-xs mt-1">Admin Console</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setTab(label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === label
                  ? "bg-gold text-dark-bg font-bold"
                  : "text-slate-400 hover:bg-dark-surface/60 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === "Applications" &&
                pendingCount !== null &&
                pendingCount > 0 && (
                  <span className="ml-auto bg-amber-400/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {pendingCount}
                  </span>
                )}
            </button>
          ))}
        </nav>

        {/* User card */}
        <div className="p-4 border-t border-gold/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-surface/60">
            <div className="size-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-bold text-sm shrink-0">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-sm font-bold truncate">Admin</p>
              <p className="text-slate-500 text-xs truncate">Super Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-8 overflow-auto">
          {tab === "Dashboard" && <DashboardTab />}
          {tab === "Applications" && <ApplicationsTab />}
          {tab === "Restaurants" && <RestaurantsTab />}
        </div>

        <footer className="p-4 border-t border-gold/10 text-center">
          <p className="text-xs text-gold/30">
            © 2025 HalalBites — Admin Console · v1.0.0
          </p>
        </footer>
      </main>
    </div>
  );
}
