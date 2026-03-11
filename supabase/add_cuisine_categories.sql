-- ─────────────────────────────────────────────
--  HalalFind — cuisine categories migration
--  Run this AFTER schema.sql in the Supabase SQL Editor
-- ─────────────────────────────────────────────

-- 1. Create the categories table
create table if not exists cuisine_categories (
  id      serial primary key,
  region  text not null,   -- "East Asian", "Middle Eastern", etc.
  cuisine text not null unique  -- must match the cuisine text in restaurants
);

-- Enable RLS (public read, like restaurants)
alter table cuisine_categories enable row level security;

create policy "Public read cuisine_categories"
  on cuisine_categories for select using (true);

-- 2. Seed all known cuisines
insert into cuisine_categories (region, cuisine) values
  -- East Asian
  ('East Asian', 'Chinese'),
  ('East Asian', 'Japanese'),
  ('East Asian', 'Korean'),
  ('East Asian', 'Taiwanese'),
  ('East Asian', 'Uyghur'),

  -- South East Asian
  ('South East Asian', 'Indonesian'),
  ('South East Asian', 'Malaysian'),
  ('South East Asian', 'Thai'),
  ('South East Asian', 'Vietnamese'),

  -- South Asian
  ('South Asian', 'Indian'),
  ('South Asian', 'South Indian'),
  ('South Asian', 'Pakistani'),
  ('South Asian', 'Sri Lankan'),

  -- Middle Eastern
  ('Middle Eastern', 'Afghan'),
  ('Middle Eastern', 'Lebanese'),
  ('Middle Eastern', 'Middle Eastern'),
  ('Middle Eastern', 'Moroccan'),
  ('Middle Eastern', 'Persian'),
  ('Middle Eastern', 'Syrian'),
  ('Middle Eastern', 'Turkish'),
  ('Middle Eastern', 'Yemeni'),

  -- Western
  ('Western', 'American'),
  ('Western', 'Australian'),
  ('Western', 'Italian'),
  ('Western', 'Mexican'),
  ('Western', 'Portuguese')

on conflict (cuisine) do nothing;

-- 3. Add cuisine_id FK to restaurants (nullable — graceful backfill)
alter table restaurants
  add column if not exists cuisine_id int references cuisine_categories(id);

-- 4. Backfill cuisine_id for all existing restaurants
--    Any restaurant whose cuisine text doesn't exactly match a category row
--    will keep cuisine_id = NULL (no data loss, just unlinked)
update restaurants r
set cuisine_id = c.id
from cuisine_categories c
where r.cuisine = c.cuisine;

-- ─────────────────────────────────────────────
-- HOW TO FIX A TYPO LATER:
--   Rename "China" to "Chinese" everywhere in one go:
--
--   update cuisine_categories set cuisine = 'Chinese' where cuisine = 'China';
--
--   That's it. All restaurants linked via cuisine_id will automatically
--   resolve to "Chinese" — no touching the restaurants table needed.
--
-- HOW TO MOVE A CUISINE TO A DIFFERENT REGION:
--   update cuisine_categories set region = 'East Asian' where cuisine = 'Uyghur';
-- ─────────────────────────────────────────────
