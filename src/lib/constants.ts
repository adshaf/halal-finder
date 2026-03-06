// ─────────────────────────────────────────────
//  Shared types — mirrors the Supabase schema
// ─────────────────────────────────────────────

// Maps each boolean attribute to its icon filename in /public/assets/halal-icons/
// Each icon has a -true.png and -false.png variant.
// Note: vegan_options has no icon file yet, so it is excluded.
export const HALAL_ICONS: { key: keyof Restaurant; label: string; file: string }[] = [
  { key: "halal_certified",    label: "Halal Certified", file: "halal-certified"   },
  { key: "no_alcohol",         label: "No Alcohol",       file: "no-alcohol"        },
  { key: "no_pork",            label: "No Pork",          file: "no-pork"           },
  { key: "muslim_owned",       label: "Muslim Owned",     file: "muslim-owned"      },
  { key: "muslim_chefs",       label: "Muslim Chefs",     file: "muslim-chef"       },
  { key: "prayer_room",        label: "Prayer Room",      file: "prayer-room"       },
  { key: "halal_chicken_only", label: "Halal Chicken",    file: "halal-chicken"     },
  { key: "halal_beef_only",    label: "Halal Beef",       file: "halal-beef"        },
  { key: "seafood_options",    label: "Halal Seafood",          file: "halal-seafood"     },
  { key: "vegetarian_options", label: "Vegetarian Options",       file: "vegetarian-option" },
];

export type Restaurant = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  long_description: string | null;
  cuisine: string | null;
  price: string | null;
  location: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  hours: string[] | null;
  image: string | null;
  hero_image: string | null;
  gallery: string[] | null;
  menu_pdf: string | null;
  map_embed: string | null;
  // Dietary / facility
  no_alcohol: boolean;
  no_pork: boolean;
  halal_certified: boolean;
  muslim_owned: boolean;
  muslim_chefs: boolean;
  prayer_room: boolean;
  halal_chicken_only: boolean;
  halal_beef_only: boolean;
  seafood_options: boolean;
  vegetarian_options: boolean;
  vegan_options: boolean;
  // Admin
  featured: boolean;
  verified: boolean;
  created_at: string;
};
