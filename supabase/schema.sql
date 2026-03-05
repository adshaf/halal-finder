-- ─────────────────────────────────────────────
--  HalalFind — initial schema (Sydney MVP)
-- ─────────────────────────────────────────────

-- Restaurants
create table if not exists restaurants (
  id                  bigint generated always as identity primary key,
  slug                text unique not null,
  name                text not null,
  description         text,                  -- short blurb for cards
  long_description    text,                  -- full detail page description
  cuisine             text,
  price               text,                  -- '$', '$$', '$$$' (AUD)
  location            text,                  -- suburb, e.g. "Lakemba, Sydney"
  address             text,
  phone               text,
  email               text,
  website             text,
  hours               text[],                -- e.g. ["Mon–Fri: 11:00–22:00"]
  image               text,                  -- card thumbnail URL
  hero_image          text,                  -- detail page hero URL
  gallery             text[],                -- array of image URLs
  menu_pdf            text,                  -- URL to downloadable menu PDF
  map_embed           text,                  -- Google Maps embed URL

  -- Dietary / facility booleans
  no_alcohol          boolean default false,
  no_pork             boolean default false,
  halal_certified     boolean default false,
  muslim_owned        boolean default false,
  muslim_chefs        boolean default false,
  prayer_room         boolean default false,
  halal_chicken_only  boolean default false,
  halal_beef_only     boolean default false,
  seafood_options     boolean default false,
  vegetarian_options  boolean default false,
  vegan_options       boolean default false,

  -- Admin
  featured            boolean default false,
  verified            boolean default false,

  created_at          timestamptz default now()
);

-- Menu items
create table if not exists menu_items (
  id              bigint generated always as identity primary key,
  restaurant_id   bigint references restaurants(id) on delete cascade,
  name            text not null,
  description     text,
  price           text                       -- e.g. '$18'
);

-- Users (extends Supabase auth.users)
create table if not exists profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz default now()
);

-- Saved / wishlist restaurants
create table if not exists saved_restaurants (
  id              bigint generated always as identity primary key,
  user_id         uuid references profiles(id) on delete cascade,
  restaurant_id   bigint references restaurants(id) on delete cascade,
  created_at      timestamptz default now(),
  unique (user_id, restaurant_id)
);

-- ── Row Level Security ──────────────────────────────────────────

alter table restaurants        enable row level security;
alter table menu_items         enable row level security;
alter table profiles           enable row level security;
alter table saved_restaurants  enable row level security;

-- Restaurants and menus are public (anyone can read)
create policy "Public read restaurants"
  on restaurants for select using (true);

create policy "Public read menu_items"
  on menu_items for select using (true);

-- Profiles: users manage their own
create policy "Users read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update using (auth.uid() = id);

-- Saved restaurants: users manage their own
create policy "Users manage own saved"
  on saved_restaurants for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
