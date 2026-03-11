// ─────────────────────────────────────────────
//  Shared types — mirrors the Supabase schema
// ─────────────────────────────────────────────

// Cuisine grouped by region — drives the filter sidebar hierarchy.
// The cuisine strings here MUST exactly match the `cuisine` text values
// used in the restaurants table (and cuisine_categories table).
// To add a new cuisine: add it here AND run add_cuisine_categories.sql.
export const CUISINE_REGIONS: { region: string; cuisines: string[] }[] = [
  {
    region: "East Asian",
    cuisines: ["Chinese", "Japanese", "Korean", "Taiwanese", "Uyghur"],
  },
  {
    region: "South East Asian",
    cuisines: ["Indonesian", "Malaysian", "Thai", "Vietnamese"],
  },
  {
    region: "South Asian",
    cuisines: ["Indian", "South Indian", "Pakistani", "Sri Lankan"],
  },
  {
    region: "Middle Eastern",
    cuisines: [
      "Afghan",
      "Lebanese",
      "Middle Eastern",
      "Moroccan",
      "Persian",
      "Syrian",
      "Turkish",
      "Yemeni",
    ],
  },
  {
    region: "Western",
    cuisines: ["American", "Australian", "Italian", "Mexican", "Portuguese"],
  },
];

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
  { key: "halal_chicken", label: "Halal Chicken",    file: "halal-chicken"     },
  { key: "halal_beef",    label: "Halal Beef",       file: "halal-beef"        },
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
  cuisine_id: number | null;
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
  halal_chicken: boolean;
  halal_beef: boolean;
  seafood_options: boolean;
  vegetarian_options: boolean;
  vegan_options: boolean;
  // Admin
  featured: boolean;
  verified: boolean;
  created_at: string;
  // Geo
  latitude: number | null;
  longitude: number | null;
};
