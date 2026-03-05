// ─────────────────────────────────────────────
//  Shared types — mirrors the Supabase schema
// ─────────────────────────────────────────────

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
