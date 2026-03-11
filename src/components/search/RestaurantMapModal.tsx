"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, MapPin, ExternalLink } from "lucide-react";
import { HALAL_ICONS } from "@/lib/constants";
import type { Restaurant } from "@/lib/constants";

type Props = {
  restaurant: Restaurant | null;
  onClose: () => void;
};

export default function RestaurantMapModal({ restaurant, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    if (!restaurant) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [restaurant, onClose]);

  if (!restaurant) return null;

  const r = restaurant;

  return (
    // z-[1000] exceeds Leaflet's default z-index of 400
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-1000 w-[340px] max-w-[calc(100vw-2rem)]">
      <div className="bg-dark-surface border border-gold/20 rounded-xl shadow-2xl overflow-hidden">

        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={r.image ?? "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"}
            alt={r.name}
            fill
            className="object-cover"
            unoptimized
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {r.featured && (
              <span className="bg-gold text-dark-bg text-xs font-bold px-2.5 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Name + verified */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-bold text-slate-100 text-base leading-tight">
              {r.name}
            </h3>
            {r.verified && (
              <span className="text-primary text-xs font-bold shrink-0">✓ Verified</span>
            )}
          </div>

          {/* Description */}
          {r.description && (
            <p className="text-slate-500 text-xs mb-3 line-clamp-2">{r.description}</p>
          )}

          {/* Location / price / cuisine */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin size={10} /> {r.location}
            </span>
            {r.price && <><span className="text-slate-600">•</span><span>{r.price}</span></>}
            {r.cuisine && <><span className="text-slate-600">•</span><span>{r.cuisine}</span></>}
          </div>

          {/* Halal icons — same 5-per-row grid as cards */}
          <div className="grid grid-cols-5 gap-1.5 mb-4">
            {HALAL_ICONS.map(({ key, label, file }) => (
              <div key={String(key)} className="flex flex-col items-center gap-0.5">
                <div className="relative w-11 h-11 rounded-lg overflow-hidden">
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

          <Link
            href={`/restaurant/${r.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gold/40 text-gold text-sm font-bold hover:bg-gold/10 transition-colors"
          >
            View Details
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
