-- ─────────────────────────────────────────────────────────────────
--  Add long_description and banner_url to restaurant_applications
--  Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────

ALTER TABLE restaurant_applications
  ADD COLUMN IF NOT EXISTS long_description text,
  ADD COLUMN IF NOT EXISTS banner_url       text;
