"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Heart,
  Star,
  MapPin,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Home,
  Compass,
  Menu,
  X,
} from "lucide-react";

const SAVED_RESTAURANTS = [
  {
    id: 1,
    name: "The Saffron Grill",
    cuisine: "Persian · Fine Dining",
    rating: 4.8,
    location: "Mayfair, London",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    certified: true,
  },
  {
    id: 2,
    name: "Masala Street",
    cuisine: "Indian · Street Food",
    rating: 4.7,
    location: "Soho, London",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600",
    certified: true,
  },
  {
    id: 3,
    name: "Ottoman Kitchen",
    cuisine: "Turkish · Group Dining",
    rating: 4.2,
    location: "Camden, London",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    certified: false,
  },
  {
    id: 4,
    name: "The Prime Cut",
    cuisine: "Steakhouse · Gourmet",
    rating: 4.6,
    location: "Kensington, London",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600",
    certified: false,
  },
];


export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-warm-dark font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-white hidden sm:block">HalalBites</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {[
              { label: "Home", href: "/", icon: Home },
              { label: "Explore", href: "/searchResults", icon: Compass },
              { label: "Saved", href: "/dashboard", icon: BookOpen },
              { label: "Community", href: "#", icon: MessageSquare },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-dark-surface transition-colors"
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 bg-dark-surface/60 border border-gold/15 rounded-lg px-3 py-2 w-56 focus-within:border-primary/40 transition-colors">
            <Search size={14} className="text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="bg-transparent text-sm text-slate-300 placeholder-slate-500 outline-none w-full"
            />
          </div>

          {/* Bell */}
          <button className="relative p-2 rounded-lg hover:bg-dark-surface transition-colors">
            <Bell size={18} className="text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center shrink-0">
            <span className="text-warm-dark font-bold text-sm">A</span>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-dark-surface transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gold/10 px-4 py-3 flex flex-col gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "Explore", href: "/searchResults" },
              { label: "Saved", href: "/dashboard" },
              { label: "Community", href: "#" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-dark-surface transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── Main ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-10">
        {/* Welcome */}
        <section>
          <p className="text-slate-400 text-sm mb-1">Welcome back</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Assalamu Alaikum, <span className="text-primary">Ahmed</span> 👋
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Here&apos;s what&apos;s happening with your halal dining journey
          </p>
        </section>

        {/* Quick stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Saved Places", value: "12", icon: Heart, sub: "3 new this week" },
            { label: "Restaurants Viewed", value: "34", icon: Compass, sub: "This month" },
            { label: "Reviews Written", value: "8", icon: Star, sub: "Avg. 4.6 rating" },
          ].map(({ label, value, icon: Icon, sub }) => (
            <div
              key={label}
              className="bg-dark-surface/60 border border-gold/15 rounded-xl p-5 flex items-start gap-4 hover:border-gold/20 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-slate-300 font-medium">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Saved restaurants */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Saved Restaurants</h2>
            <Link
              href="/searchResults"
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAVED_RESTAURANTS.map((r) => (
              <Link
                key={r.id}
                href={`/restaurant/${r.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-dark-surface/60 border border-gold/15 rounded-xl overflow-hidden hover:border-gold/20 hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Heart */}
                  <button
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-dark-bg/70 backdrop-blur-sm flex items-center justify-center"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart size={13} className="text-gold fill-gold" />
                  </button>
                  {/* Certified badge */}
                  {r.certified && (
                    <span className="absolute top-2 left-2 bg-primary/90 text-warm-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      HMC ✓
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-white text-sm truncate group-hover:text-gold transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{r.cuisine}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-gold fill-gold" />
                      <span className="text-xs text-slate-300">{r.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={11} className="text-slate-500" />
                      <span className="text-xs text-slate-500 truncate max-w-[80px]">{r.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-dark-surface/30 border-t border-gold/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-warm-dark font-bold text-sm">H</span>
                </div>
                <span className="font-bold text-white">HalalBites</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Your guide to the best halal restaurants in Sydney.
              </p>
            </div>

            {/* Links */}
            {[
              {
                heading: "Explore",
                links: ["All Restaurants", "Fine Dining", "Casual Eats", "Takeaway"],
              },
              {
                heading: "Account",
                links: ["My Profile", "Saved Places", "Reviews", "Settings"],
              },
              {
                heading: "Company",
                links: ["About Us", "Careers", "Privacy Policy", "Terms"],
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                  {heading}
                </p>
                <ul className="space-y-2">
                  {links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-slate-500 text-xs hover:text-slate-300 transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gold/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">
              © 2025 HalalBites. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs">Made with ♥ for the Muslim community</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
