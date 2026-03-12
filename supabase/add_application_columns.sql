-- ─────────────────────────────────────────────────────────────────
--  Add missing columns to restaurant_applications
--  + RLS policies for authenticated users
--  + Supabase Storage bucket instructions
--  Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────

-- Add missing halal attribute columns (the HALAL_ICONS list has more than the original table)
ALTER TABLE restaurant_applications
  ADD COLUMN IF NOT EXISTS muslim_chefs       boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS halal_chicken      boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS halal_beef         boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS seafood_options    boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS vegetarian_options boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS image_urls         text[];

-- Allow authenticated users to INSERT their own applications
DROP POLICY IF EXISTS "Users can submit applications" ON restaurant_applications;
CREATE POLICY "Users can submit applications"
  ON restaurant_applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = submitted_by);

-- Allow users to SELECT their own applications (for dashboard)
DROP POLICY IF EXISTS "Users can view own applications" ON restaurant_applications;
CREATE POLICY "Users can view own applications"
  ON restaurant_applications FOR SELECT TO authenticated
  USING (auth.uid()::text = submitted_by);

-- ─────────────────────────────────────────────────────────────────
--  Supabase Storage — create the 'submissions' bucket manually:
--
--  1. Go to Supabase Dashboard → Storage → New bucket
--  2. Name: submissions
--  3. Public bucket: ON (so image URLs are publicly readable)
--  4. Then run the policies below:
-- ─────────────────────────────────────────────────────────────────

-- Allow authenticated users to upload to their own folder
DROP POLICY IF EXISTS "Authenticated users can upload submission images" ON storage.objects;
CREATE POLICY "Authenticated users can upload submission images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'submissions' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public read of submission images
DROP POLICY IF EXISTS "Public read submission images" ON storage.objects;
CREATE POLICY "Public read submission images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'submissions');
