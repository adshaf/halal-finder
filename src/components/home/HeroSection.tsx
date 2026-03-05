"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const q = query.trim();
    router.push(q ? `/searchResults?q=${encodeURIComponent(q)}` : "/searchResults");
  };

  return (
    <section className="relative pt-36 pb-32 px-6 lg:px-20 bg-dark-bg text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy + search */}
        <div className="z-10">
          <span className="inline-block px-4 py-1 rounded-full bg-dark-surface border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
            Sydney&apos;s Halal Restaurant Guide
          </span>
          <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Find Halal <br />
            <span className="text-gold italic">Done Right</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
            Discover Sydney&apos;s best halal restaurants — verified information
            on cuisine, location, hours, and halal credentials, all in one place.
          </p>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-2 p-2 bg-dark-surface/30 border border-gold/10 rounded-2xl backdrop-blur-sm max-w-xl">
            <div className="flex flex-1 items-center gap-3 px-4 py-3">
              <Search size={20} className="text-gold shrink-0" aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Cuisine, suburb, or restaurant name..."
                className="bg-transparent border-none outline-none focus:ring-0 text-slate-100 placeholder:text-slate-500 w-full text-sm"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-gold text-dark-bg px-8 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all"
            >
              Find Restaurants
            </button>
          </div>
        </div>

        {/* Right: arch image frame */}
        <div className="relative hidden lg:block">
          <div className="arch-container w-full h-[600px] overflow-hidden border-4 border-gold/10 shadow-2xl relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCF-TH9T_zLYXf-Risj-78wDwpONEs-KgQZWze-V6CpQNTHTfr2qRVyRBwZxe_ymtKyRpIaoppO7XNroetN5LlnWsQR1PZopM0ozo8RNUdH58aLX94en5EshP0zSeme1A4lc4GNc39u0_5nkwyE8dIKzuoG2NHaLeODJSFhEvtxkvG2Pv8STfD_tf94nOkSO2fYSTuas0vF7RBkaCcH77japW97UA5ITFEDDBOxIsAgPmbViZjBWTb5ZIsoN_wBWRDVTD_4afIJXj6"
              alt="Modern upscale restaurant interior with golden lighting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-transparent to-transparent" />
          </div>

          {/* Floating accent image */}
          <div className="absolute -bottom-10 -left-10 arch-container w-64 h-80 overflow-hidden border-4 border-dark-surface shadow-2xl z-20 hidden xl:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsHRiA66-zelb63p_TNa6HYZBmQTqFB9LRAQU0lIGv-ynYcC5fztPq1ZD-YOc41YCP5z9JO6jPZ97KG7yBza9XA-4ACGuGW3EjpLeDOuOmJnGG_JpAOHEm5UODgtkFu-BqDTtuZ3bXxLu9vMh1kM_VHr9Hz9hSXkquYsmkT-Dneann1uVx5Aa7so1QXN2YE2w78ElnAjGgLIJReYpZD539qndWqspqKRrE9CM6pQqlRS0Wo4a2_j_ZyK7d5uBPL-4_mJdmXU6Tdb6v"
              alt="Exotic gourmet halal dish with vibrant colors"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
