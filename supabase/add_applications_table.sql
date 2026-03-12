-- ─────────────────────────────────────────────
--  HalalFind — restaurant applications table
--  Run in Supabase SQL Editor
-- ─────────────────────────────────────────────

create table if not exists restaurant_applications (
  id              bigint generated always as identity primary key,
  -- Submitted details
  name            text not null,
  description     text,
  cuisine         text,
  address         text,
  suburb          text,
  phone           text,
  email           text,
  website         text,
  hours           text,          -- free-text; admin converts to array on approval
  -- Halal attributes (self-reported by applicant)
  halal_certified boolean default false,
  no_pork         boolean default false,
  no_alcohol      boolean default false,
  muslim_owned    boolean default false,
  prayer_room     boolean default false,
  -- Submitter info
  submitted_by    text,          -- name or email of person submitting
  submitted_at    timestamptz default now(),
  -- Admin workflow
  status          text default 'pending',   -- 'pending' | 'approved' | 'rejected'
  admin_notes     text
);

-- RLS — only allow reads/writes via service role key (admin API routes)
alter table restaurant_applications enable row level security;

-- No public policy — applications are private (admin-only via service role)
