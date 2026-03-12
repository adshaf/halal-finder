-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: user reviews + saved restaurants + auth RLS policies
-- Run once in the Supabase SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Reviews ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id            bigserial PRIMARY KEY,
  restaurant_id int       NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id       uuid      NOT NULL REFERENCES auth.users(id)  ON DELETE CASCADE,
  rating        int       NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body          text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now(),
  UNIQUE (restaurant_id, user_id)   -- one review per user per restaurant
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews
CREATE POLICY "Public read reviews"
  ON reviews FOR SELECT USING (true);

-- Authenticated users can insert their own review
CREATE POLICY "Users can write own reviews"
  ON reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update only their own review
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete only their own review
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE TO authenticated
  USING (auth.uid() = user_id);


-- ── 2. Saved restaurants ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_restaurants (
  user_id       uuid NOT NULL REFERENCES auth.users(id)  ON DELETE CASCADE,
  restaurant_id int  NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  saved_at      timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, restaurant_id)
);

ALTER TABLE saved_restaurants ENABLE ROW LEVEL SECURITY;

-- Users can only access their own saves
CREATE POLICY "Users manage own saves"
  ON saved_restaurants FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ── 3. Restaurant applications — add auth RLS policies ────────────────────────
-- (Table already exists from add_applications_table.sql)

-- Users can submit their own applications
CREATE POLICY "Users can submit applications"
  ON restaurant_applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = submitted_by::uuid);

-- Users can view their own applications
CREATE POLICY "Users can view own applications"
  ON restaurant_applications FOR SELECT TO authenticated
  USING (auth.uid() = submitted_by::uuid);
