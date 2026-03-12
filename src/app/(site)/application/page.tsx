"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ChevronRight,
  Loader2,
  MapPin,
  Upload,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { HALAL_ICONS, CUISINE_REGIONS } from "@/lib/constants";
import type { Restaurant } from "@/lib/constants";

// ── Nominatim address suggestion ─────────────────────────────────
type AddressSuggestion = {
  place_id: number;
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    suburb?: string;
    neighbourhood?: string;
    town?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};

/** Formats a Nominatim address object into a clean human-readable string.
 *  Output: "12 Example St, Suburb, NSW 2000, Australia"
 */
function formatAddress(a: AddressSuggestion["address"]): string {
  const street = [a.house_number, a.road].filter(Boolean).join(" ");
  const locality = a.suburb ?? a.neighbourhood ?? a.town ?? a.city ?? "";
  const statePostcode = [a.state, a.postcode].filter(Boolean).join(" ");
  return [street, locality, statePostcode, "Australia"]
    .filter(Boolean)
    .join(", ");
}

const DEBOUNCE_MS = 400;

export default function ApplicationPage() {
  const router = useRouter();
  const supabase = createClient();

  // ── Auth ──────────────────────────────────────────────────────
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace("/auth?next=/application");
      else setUserId(user.id);
    });
  }, []);

  // ── Form state ────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");       // selected value from dropdown
  const [cuisineOther, setCuisineOther] = useState(""); // free-text when "Other" selected
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");       // short tagline
  const [longDescription, setLongDescription] = useState(""); // full about text
  const [suburb, setSuburb] = useState("");

  // Halal criteria — keyed by HALAL_ICONS key
  const [halalFlags, setHalalFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(HALAL_ICONS.map(({ key }) => [key, false]))
  );
  const toggleHalal = (key: string) =>
    setHalalFlags((prev) => ({ ...prev, [key]: !prev[key] }));

  // ── Address autocomplete ──────────────────────────────────────
  const [addressInput, setAddressInput] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [duplicateRestaurant, setDuplicateRestaurant] = useState<Pick<
    Restaurant,
    "name" | "slug"
  > | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (addressConfirmed || addressInput.length < 4) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setAddressLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            addressInput + ", Australia"
          )}&format=json&countrycodes=au&limit=5&addressdetails=1`,
          { headers: { "User-Agent": "HalalBites/1.0" } }
        );
        const data: AddressSuggestion[] = await res.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      } finally {
        setAddressLoading(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [addressInput, addressConfirmed]);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setSuggestions([]);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function selectAddress(s: AddressSuggestion) {
    const formatted = formatAddress(s.address);
    setAddressInput(formatted);
    setAddressConfirmed(true);
    setSuggestions([]);
    const a = s.address;
    const derivedSuburb = [a.suburb ?? a.neighbourhood ?? a.town ?? a.city, a.state]
      .filter(Boolean)
      .join(", ");
    setSuburb(derivedSuburb);

    // Check for duplicate in DB using the street portion
    const streetPart = [a.house_number, a.road].filter(Boolean).join(" ");
    if (streetPart) {
      const { data } = await supabase
        .from("restaurants")
        .select("name, slug")
        .ilike("address", `%${streetPart}%`)
        .maybeSingle();
      setDuplicateRestaurant(data ?? null);
    }
  }

  function clearAddress() {
    setAddressInput("");
    setAddressConfirmed(false);
    setSuburb("");
    setDuplicateRestaurant(null);
  }

  // ── Banner image ──────────────────────────────────────────────
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  function selectBanner(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  }

  function removeBanner() {
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setBannerFile(null);
    setBannerPreview(null);
  }

  // ── Gallery images ────────────────────────────────────────────
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addImages(files: FileList | null) {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 3 - imageFiles.length);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  }

  function removeImage(i: number) {
    URL.revokeObjectURL(imagePreviews[i]);
    setImageFiles((prev) => prev.filter((_, idx) => idx !== i));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  }

  // ── Submit ────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;

    // Client-side validation for non-HTML-required fields
    if (!addressInput.trim()) {
      setError("Please select an address from the suggestions.");
      return;
    }
    const anyHalal = Object.values(halalFlags).some(Boolean);
    if (!anyHalal) {
      setError("Please select at least one halal criterion.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Upload banner image
      let bannerUrl: string | null = null;
      if (bannerFile) {
        const path = `${userId}/banner-${Date.now()}-${bannerFile.name.replace(/\s+/g, "_")}`;
        const { data: uploaded, error: uploadError } = await supabase.storage
          .from("submissions")
          .upload(path, bannerFile, { upsert: false });
        if (uploadError) throw new Error(`Banner upload failed: ${uploadError.message}`);
        bannerUrl = supabase.storage.from("submissions").getPublicUrl(uploaded.path).data.publicUrl;
      }

      // Upload gallery images
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        const path = `${userId}/gallery-${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const { data: uploaded, error: uploadError } = await supabase.storage
          .from("submissions")
          .upload(path, file, { upsert: false });
        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);
        imageUrls.push(supabase.storage.from("submissions").getPublicUrl(uploaded.path).data.publicUrl);
      }

      // Submit form data to API
      const resolvedCuisine = cuisine === "Other" ? cuisineOther.trim() : cuisine;
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, cuisine: resolvedCuisine, phone, email, website, hours,
          description, long_description: longDescription || null,
          banner_url: bannerUrl,
          address: addressInput || null,
          suburb: suburb || null,
          image_urls: imageUrls,
          ...halalFlags,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed.");

      router.push("/application/confirm");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold text-slate-100 mb-3">
            Submit a Restaurant
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Know a halal spot that&apos;s not listed yet? Fill in what you know
            and our team will review it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ── Basic Info ─────────────────────────────────────── */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Restaurant Details
            </legend>

            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                Restaurant name <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Al Aseel Grill"
                className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">
                  Cuisine <span className="text-red-400">*</span>
                </label>
                <select
                  value={cuisine}
                  onChange={(e) => { setCuisine(e.target.value); setCuisineOther(""); }}
                  required
                  className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                >
                  <option value="" disabled>Select cuisine…</option>
                  {CUISINE_REGIONS.map(({ region, cuisines }) => (
                    <optgroup key={region} label={region}>
                      {cuisines.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="Other">Other…</option>
                </select>
                {cuisine === "Other" && (
                  <input
                    value={cuisineOther}
                    onChange={(e) => setCuisineOther(e.target.value)}
                    required
                    placeholder="Enter cuisine type"
                    className="mt-2 w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="02 9XXX XXXX"
                  className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="restaurant@email.com"
                  className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Website</label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            </div>
          </fieldset>

          {/* ── Address ───────────────────────────────────────── */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Location
            </legend>

            <div className="relative" ref={dropdownRef}>
              <label className="flex items-center gap-2 text-sm text-slate-300 mb-1.5">
                <MapPin size={13} className="text-gold" /> Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  value={addressInput}
                  onChange={(e) => {
                    setAddressInput(e.target.value);
                    setAddressConfirmed(false);
                    setDuplicateRestaurant(null);
                  }}
                  placeholder="Start typing the street address…"
                  className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 pr-10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
                />
                {addressLoading && (
                  <Loader2
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-500"
                  />
                )}
                {addressConfirmed && (
                  <button
                    type="button"
                    onClick={clearAddress}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute z-50 top-full mt-1 w-full bg-dark-surface border border-gold/20 rounded-xl shadow-2xl overflow-hidden">
                  {suggestions.map((s) => (
                    <button
                      key={s.place_id}
                      type="button"
                      onClick={() => selectAddress(s)}
                      className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-gold/10 hover:text-slate-100 transition-colors border-b border-gold/5 last:border-0"
                    >
                      {formatAddress(s.address)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Suburb (auto-filled) */}
            {suburb && (
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Suburb / Area</label>
                <input
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            )}

            {/* Duplicate warning */}
            {duplicateRestaurant && (
              <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
                <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-300">
                  <span className="font-semibold">{duplicateRestaurant.name}</span> may already
                  be listed at this address.{" "}
                  <Link
                    href={`/restaurant/${duplicateRestaurant.slug}`}
                    target="_blank"
                    className="underline hover:text-amber-200"
                  >
                    View listing →
                  </Link>
                </p>
              </div>
            )}
          </fieldset>

          {/* ── Hours & Description ───────────────────────────── */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              More Info
            </legend>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                Opening Hours <span className="text-red-400">*</span>
              </label>
              <input
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
                placeholder="e.g. Mon–Fri 11am–10pm, Sat–Sun 10am–11pm"
                className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                Short Description <span className="text-red-400">*</span>
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="One-line tagline, e.g. Authentic Lebanese grill in the heart of Lakemba"
                className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <p className="mt-1 text-xs text-slate-600">Shown on cards and search results.</p>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                Full Description
              </label>
              <textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                rows={4}
                placeholder="Tell us more about the restaurant — history, specialties, atmosphere…"
                className="w-full bg-dark-surface border border-gold/15 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
              <p className="mt-1 text-xs text-slate-600">Shown on the restaurant detail page About section.</p>
            </div>
          </fieldset>

          {/* ── Halal Criteria ────────────────────────────────── */}
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Halal Criteria <span className="text-red-400">*</span>
            </legend>
            <p className="text-xs text-slate-500 mb-5">
              Select at least one criterion that applies. These are self-reported
              and will be verified by our team.
            </p>
            <div className="grid grid-cols-5 gap-3">
              {HALAL_ICONS.map(({ key, label, file }) => {
                const active = halalFlags[String(key)];
                return (
                  <button
                    key={String(key)}
                    type="button"
                    onClick={() => toggleHalal(String(key))}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                      active
                        ? "border-primary/40 bg-primary/10"
                        : "border-gold/10 bg-dark-surface hover:border-gold/25"
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                      <Image
                        src={`/assets/halal-icons/${file}-${active ? "true" : "false"}.png`}
                        alt={label}
                        fill
                        className="object-cover scale-[1.1]"
                        unoptimized
                      />
                    </div>
                    <span
                      className={`text-[9px] text-center leading-tight font-medium ${
                        active ? "text-primary" : "text-slate-500"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* ── Banner Image ─────────────────────────────────── */}
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-widest text-gold mb-1">
              Banner Image
            </legend>
            <p className="text-xs text-slate-500 mb-4">
              Used as the full-width hero image on the restaurant page. Landscape format recommended.
            </p>

            {bannerPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-gold/15 mb-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={bannerPreview} alt="Banner preview" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={removeBanner}
                  className="absolute top-2 right-2 bg-dark-bg/80 rounded-full p-1.5 text-slate-300 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gold/20 hover:border-gold/40 rounded-xl py-8 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Upload size={20} />
                <span className="text-sm">Click to add banner image</span>
                <span className="text-xs text-slate-600">JPG, PNG, WEBP — landscape recommended</span>
              </button>
            )}
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => selectBanner(e.target.files)}
            />
          </fieldset>

          {/* ── Gallery Photos ───────────────────────────────── */}
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-widest text-gold mb-1">
              Gallery Photos <span className="text-slate-600 normal-case font-normal">(up to 3)</span>
            </legend>
            <p className="text-xs text-slate-500 mb-4">
              Additional photos shown in the gallery section of the restaurant page.
            </p>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gold/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1.5 right-1.5 bg-dark-bg/80 rounded-full p-1 text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {imageFiles.length < 3 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gold/20 hover:border-gold/40 rounded-xl py-8 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Upload size={20} />
                <span className="text-sm">Click to add photos</span>
                <span className="text-xs text-slate-600">JPG, PNG, WEBP — max 5 MB each</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => addImages(e.target.files)}
            />
          </fieldset>

          {/* ── Error ─────────────────────────────────────────── */}
          {error && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* ── Submit ───────────────────────────────────────── */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold text-dark-bg font-bold py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting…
              </>
            ) : (
              <>
                Submit Application <ChevronRight size={16} />
              </>
            )}
          </button>

          <p className="text-xs text-slate-600 text-center">
            By submitting you confirm the information is accurate to the best of
            your knowledge. Our team will verify before publishing.
          </p>
        </form>
      </div>
    </div>
  );
}
