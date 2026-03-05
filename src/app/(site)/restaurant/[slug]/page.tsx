"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Heart,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { RESTAURANTS } from "@/lib/constants";

const TIME_SLOTS = ["19:00", "20:00", "20:30", "21:00", "22:00", "22:30"];
const GUEST_OPTIONS = ["1 Person", "2 People", "3 People", "4 People", "6 People", "Private Dining (8+)"];

export default function RestaurantPage() {
  const { slug } = useParams<{ slug: string }>();
  const restaurant = RESTAURANTS.find((r) => r.slug === slug);

  const [selectedTime, setSelectedTime] = useState("20:30");
  const [wishlisted, setWishlisted] = useState(false);

  if (!restaurant) notFound();

  const r = restaurant;

  return (
    <main className="bg-warm-dark min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {/* Background image + gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(30,27,20,0.90) 0%, rgba(30,27,20,0.35) 55%, rgba(30,27,20,0.15) 100%), url('${r.heroImage}')`,
          }}
          role="img"
          aria-label={r.name}
        />

        {/* Breadcrumb */}
        <nav className="absolute top-28 left-0 right-0 px-6 md:px-20" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-slate-400">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/searchResults" className="hover:text-gold transition-colors">Search</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300">{r.name}</span>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative h-full flex flex-col justify-end px-6 md:px-20 pb-16 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            {r.badge && (
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-gold text-dark-bg rounded-full">
                {r.badge}
              </span>
            )}
            <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-100 mb-4 leading-tight">
              {r.name}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              {r.longDescription}
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="px-8 py-3 bg-gold text-dark-bg font-bold rounded-lg hover:brightness-110 transition-all">
                Book Table
              </button>
              <button className="px-8 py-3 bg-transparent border border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all">
                View Menu
              </button>
              <button
                onClick={() => setWishlisted((v) => !v)}
                aria-label="Save to wishlist"
                className="px-4 py-3 bg-transparent border border-white/20 rounded-lg hover:border-gold/40 transition-all"
              >
                <Heart
                  size={18}
                  className={wishlisted ? "text-red-400 fill-red-400" : "text-slate-400"}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {r.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-warm-dark/95 border border-gold/30 backdrop-blur-md p-6 rounded-xl flex flex-col items-center text-center"
            >
              <ShieldCheck className="text-gold mb-2" size={28} aria-hidden="true" />
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-display font-bold text-gold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left: Menu + Gallery */}
        <div className="lg:col-span-2 space-y-12">

          {/* Rating summary */}
          <div className="flex items-center gap-4 pb-6 border-b border-gold/10">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-gold" fill="currentColor" />
              <span className="text-2xl font-display font-bold text-gold">{r.rating}</span>
            </div>
            <span className="text-slate-400 text-sm">/ 5.0 · Verified reviews</span>
            <span className="text-slate-600 mx-2">|</span>
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <MapPin size={14} />
              {r.location}
            </div>
            <span className="text-slate-600 mx-1">·</span>
            <span className="text-slate-400 text-sm">{r.price}</span>
          </div>

          {/* Tasting Menu */}
          <section>
            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3 text-slate-100">
              <span className="text-gold">✦</span>
              The Tasting Experience
            </h2>
            <div className="space-y-0">
              {r.menuItems.map((item, i) => (
                <div
                  key={i}
                  className="group flex justify-between items-baseline gap-4 border-b border-gold/10 py-6 hover:border-gold/30 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-display font-bold text-slate-100 group-hover:text-gold transition-colors mb-1">
                      {item.name}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed italic">{item.description}</p>
                  </div>
                  <span className="text-gold font-bold text-lg shrink-0">{item.price}</span>
                </div>
              ))}
            </div>
            <button className="mt-8 text-gold font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View Full Menu <ArrowRight size={18} aria-hidden="true" />
            </button>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6 text-slate-100">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {r.gallery.map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${r.name} gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {r.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Reservation + Info */}
        <aside className="space-y-6">

          {/* Reservation card */}
          <div className="bg-gold/5 border border-gold/20 p-6 rounded-xl sticky top-28">
            <h3 className="text-2xl font-display font-bold text-slate-100 mb-6">
              Make a Reservation
            </h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full bg-zinc-900/80 border border-gold/20 rounded-lg text-slate-100 px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold mb-2">
                  Guests
                </label>
                <select className="w-full bg-zinc-900/80 border border-gold/20 rounded-lg text-slate-100 px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors">
                  {GUEST_OPTIONS.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold mb-2">
                  Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 text-sm rounded-lg border transition-all font-medium ${
                        selectedTime === slot
                          ? "border-gold bg-gold text-dark-bg font-bold"
                          : "border-gold/30 text-slate-300 hover:border-gold/60 hover:bg-gold/5"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gold text-dark-bg font-bold rounded-lg hover:brightness-110 shadow-lg shadow-gold/20 transition-all"
              >
                Confirm Table
              </button>
            </form>
            <p className="text-center text-xs text-slate-500 mt-4 leading-relaxed">
              For private events or parties of 8+,{" "}
              <a href={`mailto:${r.email}`} className="text-gold underline hover:no-underline">
                contact us directly
              </a>.
            </p>
          </div>

          {/* Location & Hours */}
          <div className="p-6 border border-gold/10 rounded-xl space-y-5">
            <h4 className="font-display font-bold text-slate-100 text-lg">
              Location &amp; Hours
            </h4>
            <div className="flex gap-3 text-sm text-slate-400">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <p>{r.address}</p>
            </div>
            <div className="flex gap-3 text-sm text-slate-400">
              <Clock size={16} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                {r.hours.map((h) => <p key={h}>{h}</p>)}
              </div>
            </div>
            <div className="flex gap-3 text-sm text-slate-400">
              <Phone size={16} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <a href={`tel:${r.phone}`} className="hover:text-gold transition-colors">{r.phone}</a>
            </div>
            <div className="flex gap-3 text-sm text-slate-400">
              <Mail size={16} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <a href={`mailto:${r.email}`} className="hover:text-gold transition-colors">{r.email}</a>
            </div>
          </div>

        </aside>
      </div>
    </main>
  );
}
