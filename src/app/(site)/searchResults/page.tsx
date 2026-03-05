"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Heart,
  ChevronRight,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RESTAURANTS } from "@/lib/constants";

const cuisineOptions = ["Turkish", "Indian", "Middle Eastern", "Burgers & Steaks"];
const priceOptions = ["£", "££", "£££"];
const ratingOptions = [{ label: "4.5+", value: 4.5 }, { label: "4.0+", value: 4.0 }];
const featureOptions = ["Alcohol Free", "Prayer Room", "Outdoor Seating"];

export default function SearchResults() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openNow, setOpenNow] = useState(true);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(["Turkish"]);
  const [selectedPrice, setSelectedPrice] = useState<string>("££");
  const [selectedRating, setSelectedRating] = useState<number>(4.0);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleCuisine = (c: string) =>
    setSelectedCuisines((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <main className="bg-warm-dark min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 pt-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">London</span>
          <ChevronRight size={12} />
          <span className="text-slate-300">Halal Restaurants</span>
        </nav>

        {/* Page title */}
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-100">
            Halal Restaurants in London
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            {RESTAURANTS.length * 26} verified halal places discovered in your area
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="flex items-center h-12 bg-zinc-900/80 border border-white/10 rounded-lg overflow-hidden">
            <Search className="ml-4 text-slate-500 shrink-0" size={18} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search RESTAURANTS, cuisines, or locations..."
              className="flex-1 bg-transparent px-3 text-slate-200 placeholder:text-slate-500 text-sm outline-none"
              aria-label="Search RESTAURANTS"
            />
          </div>
        </div>

        {/* Sort pills + mobile filter toggle */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setOpenNow((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              openNow
                ? "bg-deep-green text-white"
                : "bg-zinc-900/60 border border-white/10 text-slate-400 hover:border-gold/30"
            }`}
          >
            Open Now
            {openNow && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
          </button>
          {["Top Rated", "Price: Low to High", "Distance"].map((sort) => (
            <button
              key={sort}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-zinc-900/60 border border-white/10 text-slate-300 hover:border-gold/30 transition-colors"
            >
              {sort}
              <ChevronDown size={14} />
            </button>
          ))}

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-zinc-900/60 border border-white/10 text-slate-300"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        <div className="flex gap-6">

          {/* ── Sidebar ── */}
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          <aside
            className={`
              fixed top-0 left-0 bottom-0 z-50 w-72 overflow-y-auto transition-transform duration-300 lg:hidden
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              bg-zinc-900 border-r border-white/10 p-6
              lg:relative lg:translate-x-0 lg:z-auto lg:w-64 lg:shrink-0 lg:bg-transparent lg:p-0
            `}
          >
            {/* Mobile close */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <span className="font-bold text-slate-100">Filters</span>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close filters" className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-5 space-y-6">

              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                  <SlidersHorizontal size={15} />
                  Filters
                </h2>
                <button
                  onClick={() => { setSelectedCuisines([]); setSelectedFeatures([]); setSelectedPrice(""); setSelectedRating(0); }}
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
                  Price Range
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

              {/* Minimum Rating */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Minimum Rating
                </h3>
                {ratingOptions.map(({ label, value }) => (
                  <label key={value} className="flex items-center gap-3 mb-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === value}
                      onChange={() => setSelectedRating(value)}
                      className="w-4 h-4 accent-deep-green"
                    />
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-1">
                      {label}
                      <Star size={13} className="text-gold" fill="currentColor" />
                    </span>
                  </label>
                ))}
              </div>

              <div className="h-px bg-white/5" />

              {/* Features */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Features
                </h3>
                {featureOptions.map((f) => (
                  <label key={f} className="flex items-center gap-3 mb-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(f)}
                      onChange={() => toggleFeature(f)}
                      className="w-4 h-4 rounded accent-deep-green border-zinc-600"
                    />
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                      {f}
                    </span>
                  </label>
                ))}
              </div>

              {/* Apply button */}
              <button className="w-full bg-gold hover:brightness-110 text-dark-bg font-bold py-3 rounded-lg transition-all text-sm">
                Apply Filters
              </button>
            </div>

            {/* Featured promo card */}
            <div className="mt-4 rounded-xl overflow-hidden relative border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
                alt="Featured restaurant"
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-xs font-bold bg-gold text-dark-bg px-2 py-0.5 rounded-full mb-2 inline-block">
                  FEATURED
                </span>
                <p className="text-white text-sm font-bold leading-tight">
                  Win a dinner for two<br />at The Great Kebab
                </p>
              </div>
            </div>
          </aside>

          {/* Desktop sidebar (always visible) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-5 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                  <SlidersHorizontal size={15} />
                  Filters
                </h2>
                <button
                  onClick={() => { setSelectedCuisines([]); setSelectedFeatures([]); setSelectedPrice(""); setSelectedRating(0); }}
                  className="text-xs text-gold hover:text-gold/80 font-semibold transition-colors"
                >
                  RESET
                </button>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Cuisine</h3>
                {cuisineOptions.map((c) => (
                  <label key={c} className="flex items-center gap-3 mb-2.5 cursor-pointer group">
                    <input type="checkbox" checked={selectedCuisines.includes(c)} onChange={() => toggleCuisine(c)} className="w-4 h-4 rounded accent-deep-green border-zinc-600" />
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{c}</span>
                  </label>
                ))}
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Price Range</h3>
                <div className="flex gap-2">
                  {priceOptions.map((p) => (
                    <button key={p} onClick={() => setSelectedPrice(p === selectedPrice ? "" : p)}
                      className={`flex-1 py-1.5 text-sm rounded-lg border transition-all font-medium ${selectedPrice === p ? "bg-gold text-dark-bg border-gold" : "border-white/10 text-slate-400 hover:border-gold/40"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Minimum Rating</h3>
                {ratingOptions.map(({ label, value }) => (
                  <label key={value} className="flex items-center gap-3 mb-2.5 cursor-pointer group">
                    <input type="radio" name="rating-desktop" checked={selectedRating === value} onChange={() => setSelectedRating(value)} className="w-4 h-4 accent-deep-green" />
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-1">
                      {label} <Star size={13} className="text-gold" fill="currentColor" />
                    </span>
                  </label>
                ))}
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Features</h3>
                {featureOptions.map((f) => (
                  <label key={f} className="flex items-center gap-3 mb-2.5 cursor-pointer group">
                    <input type="checkbox" checked={selectedFeatures.includes(f)} onChange={() => toggleFeature(f)} className="w-4 h-4 rounded accent-deep-green border-zinc-600" />
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{f}</span>
                  </label>
                ))}
              </div>

              <button className="w-full bg-gold hover:brightness-110 text-dark-bg font-bold py-3 rounded-lg transition-all text-sm">
                Apply Filters
              </button>
            </div>

            {/* Featured promo */}
            <div className="mt-4 rounded-xl overflow-hidden relative border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
                alt="Featured restaurant"
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-xs font-bold bg-gold text-dark-bg px-2 py-0.5 rounded-full mb-2 inline-block">FEATURED</span>
                <p className="text-white text-sm font-bold leading-tight">Win a dinner for two<br />at The Great Kebab</p>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Restaurant grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {RESTAURANTS.map((r) => (
                <Link
                  key={r.id}
                  href={`/restaurant/${r.slug}`}
                  className="bg-zinc-900/60 border border-white/10 rounded-xl overflow-hidden hover:border-gold/30 transition-all cursor-pointer group block"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.name}
                      width={600}
                      height={220}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    {/* Certified badge */}
                    {r.certified && (
                      <span className="absolute top-3 left-3 bg-deep-green text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        ✓ CERTIFIED
                      </span>
                    )}
                    {/* Wishlist */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(r.id); }}
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
                    {/* Name + rating */}
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display font-bold text-slate-100 text-base leading-tight">
                        {r.name}
                      </h3>
                      <span className="flex items-center gap-1 text-sm font-bold text-gold shrink-0 ml-2">
                        {r.rating}
                        <Star size={13} fill="currentColor" className="text-gold" />
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-xs mb-3 line-clamp-1">{r.description}</p>

                    {/* Location + price */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {r.location}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span>{r.price}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {r.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="w-full py-2.5 rounded-lg border border-gold/40 text-gold text-sm font-bold hover:bg-gold/10 transition-colors">
                      {r.cta}
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <button className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:border-gold/30 hover:text-gold transition-colors" aria-label="Previous page">
                <ChevronLeft size={16} />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                    page === 1
                      ? "bg-gold text-dark-bg"
                      : "border border-white/10 text-slate-400 hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-slate-600 px-1">...</span>
              <button className="w-9 h-9 rounded-lg border border-white/10 text-sm font-bold text-slate-400 hover:border-gold/30 hover:text-gold transition-colors">
                15
              </button>
              <button className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:border-gold/30 hover:text-gold transition-colors" aria-label="Next page">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
