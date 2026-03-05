"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Heart,
  ChevronRight,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Restaurant } from "@/lib/constants";

const ATTRIBUTE_LABELS: { key: keyof Restaurant; label: string }[] = [
  { key: "halal_certified", label: "Halal Certified" },
  { key: "no_alcohol", label: "No Alcohol" },
  { key: "no_pork", label: "No Pork" },
  { key: "muslim_owned", label: "Muslim Owned" },
  { key: "muslim_chefs", label: "Muslim Chefs" },
  { key: "prayer_room", label: "Prayer Room" },
  { key: "halal_chicken_only", label: "Halal Chicken Only" },
  { key: "halal_beef_only", label: "Halal Beef Only" },
  { key: "seafood_options", label: "Seafood Options" },
  { key: "vegetarian_options", label: "Vegetarian Options" },
  { key: "vegan_options", label: "Vegan Options" },
];

export default function RestaurantPage() {
  const { slug } = useParams<{ slug: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("restaurants")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data }) => {
        if (!data) setNotFoundFlag(true);
        else setRestaurant(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-warm-dark min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gold" />
      </main>
    );
  }

  if (notFoundFlag) notFound();

  const r = restaurant!;
  const activeAttributes = ATTRIBUTE_LABELS.filter((a) => r[a.key]);

  return (
    <main className="bg-warm-dark min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(30,27,20,0.92) 0%, rgba(30,27,20,0.35) 55%, rgba(30,27,20,0.15) 100%), url('${r.hero_image}')`,
          }}
          role="img"
          aria-label={r.name}
        />

        {/* Breadcrumb */}
        <nav className="absolute top-28 left-0 right-0 px-6 md:px-20">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-slate-400">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/searchResults" className="hover:text-gold transition-colors">Restaurants</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300">{r.name}</span>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative h-full flex flex-col justify-end px-6 md:px-20 pb-12 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              {r.verified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-widest uppercase bg-primary/20 text-primary border border-primary/30 rounded-full">
                  <CheckCircle2 size={12} /> Verified
                </span>
              )}
              {r.featured && (
                <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-gold text-dark-bg rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-100 mb-2 leading-tight">
              {r.name}
            </h1>
            <p className="text-slate-400 text-sm mb-6 flex items-center gap-2">
              <MapPin size={14} className="text-gold" />
              {r.location}
              {r.cuisine && <><span className="text-slate-600">·</span><span>{r.cuisine}</span></>}
              {r.price && <><span className="text-slate-600">·</span><span>{r.price}</span></>}
            </p>
            <div className="flex gap-3 flex-wrap">
              {r.website && (
                <a
                  href={r.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-gold text-dark-bg font-bold rounded-lg hover:brightness-110 transition-all text-sm"
                >
                  Visit Website
                </a>
              )}
              {r.menu_pdf && (
                <a
                  href={r.menu_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-transparent border border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all text-sm flex items-center gap-2"
                >
                  <FileText size={15} /> Download Menu
                </a>
              )}
              <button
                onClick={() => setWishlisted((v) => !v)}
                aria-label="Save to wishlist"
                className="px-4 py-2.5 bg-transparent border border-white/20 rounded-lg hover:border-gold/40 transition-all"
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

      {/* ── Attributes bar ── */}
      {activeAttributes.length > 0 && (
        <div className="bg-black/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex flex-wrap gap-2">
            {activeAttributes.map(({ label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-deep-green/30 border border-primary/20 text-primary"
              >
                <CheckCircle2 size={11} />
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left: About + Gallery */}
        <div className="lg:col-span-2 space-y-12">

          {/* About */}
          {r.long_description && (
            <section>
              <h2 className="text-2xl font-display font-bold mb-4 text-slate-100">
                About
              </h2>
              <p className="text-slate-400 leading-relaxed">{r.long_description}</p>
            </section>
          )}

          {/* Gallery */}
          {r.gallery && r.gallery.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-bold mb-6 text-slate-100">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {r.gallery.map((src, i) => (
                  <div key={i} className="aspect-video rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${r.name} photo ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right: Contact + Hours */}
        <aside className="space-y-5">

          {/* Location & Hours */}
          <div className="p-6 border border-gold/15 rounded-xl space-y-4 bg-black/20">
            <h4 className="font-display font-bold text-slate-100 text-lg">Location &amp; Hours</h4>

            {r.address && (
              <div className="flex gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <p>{r.address}</p>
              </div>
            )}

            {r.hours && r.hours.length > 0 && (
              <div className="flex gap-3 text-sm text-slate-400">
                <Clock size={16} className="text-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  {r.hours.map((h) => <p key={h}>{h}</p>)}
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="p-6 border border-gold/15 rounded-xl space-y-4 bg-black/20">
            <h4 className="font-display font-bold text-slate-100 text-lg">Contact</h4>

            {r.phone && (
              <div className="flex gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-gold shrink-0 mt-0.5" />
                <a href={`tel:${r.phone}`} className="hover:text-gold transition-colors">
                  {r.phone}
                </a>
              </div>
            )}

            {r.email && (
              <div className="flex gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-gold shrink-0 mt-0.5" />
                <a href={`mailto:${r.email}`} className="hover:text-gold transition-colors break-all">
                  {r.email}
                </a>
              </div>
            )}

            {r.website && (
              <div className="flex gap-3 text-sm text-slate-400">
                <Globe size={16} className="text-gold shrink-0 mt-0.5" />
                <a
                  href={r.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors break-all"
                >
                  {r.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* Menu download */}
          {r.menu_pdf && (
            <a
              href={r.menu_pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-colors text-sm font-bold"
            >
              <FileText size={16} />
              Download Menu (PDF)
            </a>
          )}
        </aside>
      </div>
    </main>
  );
}
