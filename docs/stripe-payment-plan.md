# Stripe Payment System — Featured Badge & Self-Verification

## Context

HalalBites currently has no monetization. Restaurants are submitted via user applications, approved by admin, and manually toggled as `featured`/`verified`. The goal is to let restaurant owners **pay for Featured status** (gold pin, priority search, "Featured" label) and **pay for Listing Verification** (information authenticity confirmation, annual renewal). This requires a **Business Account** upgrade so owners can prove ownership and link to their restaurant listings — all admin-vetted, no auto-linking.

**Stack**: Next.js 16, React 19, TypeScript, Supabase (auth + DB + storage), Tailwind v4, Upstash Redis rate limiting. No existing payment code.

**Pricing** (per restaurant location):

- **Featured Badge**: $29/month subscription (each location is a separate subscription)
- **Verified Listing**: $149 one-off payment, expires after 12 months, manual renewal

**Verification framing**: The "Verified" badge means *"the information displayed on this listing has been confirmed by someone with verified authority over the restaurant — not crowd-sourced or assumed public knowledge."* It is **not** a halal certification. HalalBites does not certify the halal-ness of any restaurant. The badge signals information provenance and authenticity.

The owner submits a **Listing Confirmation Form** confirming the details shown on their listing (name, address, hours, cuisine, halal criteria ticked) and uploads evidence of their authority to speak for the restaurant (ABN, business registration, lease, etc.). Admin reviews the evidence and creates a verification report summarising what was checked. The $149 covers the admin review work.

**Verification refund policy** _(define before go-live)_:
- Option A: No refund if admin cannot verify — report explains what evidence was insufficient
- Option B: Full refund if admin is unable to verify within 14 days of submission (admin capacity issue, not applicant fault)

> **Recommended**: Option A with a clear pre-payment disclaimer ("Payment is for the admin review process, not a guaranteed outcome"). Since we're verifying information — not making halal judgements — rejections should be rare (only if the evidence of authority is clearly insufficient or information is contradictory).

---

## Key Design Decisions

### Deriving featured/verified status from timestamps (not booleans)

`featured` and `verified` are **not stored as booleans**. Status is computed from date columns:

```sql
-- is featured?
featured_until > now()

-- is verified?
verified_until > now()
```

This avoids inconsistent state, double-updates, and cron jobs correcting stale flags. All queries use `featured_until > now()` directly.

### restaurant_owners table (not owner_id)

`restaurants.owner_id` is replaced with a `restaurant_owners` join table. Real restaurants often have multiple people who need access (owner, manager, marketing). This prevents painful migration later.

```sql
restaurant_owners(restaurant_id, user_id, role)
```

> **My view**: For solo-MVP this adds a join to every ownership check. If you want to defer multi-owner support, keeping `owner_id` on the `restaurants` table as a denormalized cache is acceptable short-term — but the reviewer is right that migrating away from it later is painful. **Recommendation: implement `restaurant_owners` now.**

### Stripe idempotency via stripe_events table

Stripe webhooks can fire multiple times. A dedicated `stripe_events` table is the cleanest guard:

```sql
stripe_events(stripe_event_id, processed_at)
```

Before processing any webhook: check if `stripe_event_id` already exists. If yes, return 200 and skip.

### Subscription cancellation grace period

When `customer.subscription.deleted` fires, do **not** immediately remove featured status. Set `featured_until = subscription.current_period_end`. The pg_cron job will clean it up after the paid period ends. Owners keep access for the time they already paid for.

---

## Phase 1: Database Schema & Stripe Setup [ ]

### Pre-requisites

- Create Stripe account, obtain API keys
- Create Stripe Products + Prices:
  - **Featured Badge**: $29 AUD/month recurring
  - **Verification**: $149 AUD one-time
- Use separate `.env` files for test vs production (`.env.local` for test, `.env.production` for live keys)

### Package Installation

```bash
npm install stripe
```

### Environment Variables (add to `.env.local`)

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_FEATURED_MONTHLY_PRICE_ID=price_...
STRIPE_VERIFICATION_PRICE_ID=price_...
```

> **Security**: Price IDs are set server-side from env vars only. The client never passes a price ID — the checkout route resolves it from `process.env` based on the requested product type.

### SQL Migration (`supabase/add_stripe_tables.sql`)

```sql
-- Extend profiles for business accounts
-- Note: stripe_customer_id moved to dedicated stripe_customers table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS account_type TEXT NOT NULL DEFAULT 'regular'
    CHECK (account_type IN ('regular', 'business')),
  ADD COLUMN IF NOT EXISTS business_name TEXT,
  ADD COLUMN IF NOT EXISTS business_phone TEXT,
  ADD COLUMN IF NOT EXISTS abn TEXT,
  ADD COLUMN IF NOT EXISTS business_role TEXT;

-- Dedicated Stripe customer mapping table
-- Avoids cluttering profiles; easier migration if payment provider changes
CREATE TABLE stripe_customers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Stripe webhook event deduplication table
CREATE TABLE stripe_events (
  id BIGSERIAL PRIMARY KEY,
  stripe_event_id TEXT NOT NULL UNIQUE,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Restaurant ownership (replaces owner_id scalar — supports multiple roles)
CREATE TABLE restaurant_owners (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'owner'
    CHECK (role IN ('owner', 'manager')),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(restaurant_id, user_id)
);

-- Restaurant link requests: business user -> restaurant (admin-vetted)
CREATE TABLE restaurant_links (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  evidence TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  UNIQUE(restaurant_id, user_id)
);

-- Payment records
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  payment_type TEXT NOT NULL
    CHECK (payment_type IN ('featured_subscription', 'verification')),
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'aud',
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
  -- Stores stripe_invoice_id, subscription_period_start/end etc. for audit trail
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- Admin verification reports
CREATE TABLE verification_reports (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  payment_id BIGINT REFERENCES payments(id),
  created_by UUID NOT NULL REFERENCES auth.users(id),   -- admin who wrote the report
  report_body TEXT NOT NULL,
  revoked_reason TEXT,                                    -- populated if status = revoked
  verified_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'expired', 'revoked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Extend restaurants table
-- No owner_id scalar — ownership is in restaurant_owners table
ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS featured_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS featured_since TIMESTAMPTZ,     -- analytics
  ADD COLUMN IF NOT EXISTS verified_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Indexes
CREATE INDEX idx_restaurants_featured_until ON restaurants(featured_until);
CREATE INDEX idx_restaurants_verified_until ON restaurants(verified_until);
CREATE INDEX idx_payments_status ON payments(status, payment_type);
CREATE INDEX idx_links_status ON restaurant_links(status);
CREATE INDEX idx_restaurant_owners ON restaurant_owners(restaurant_id, user_id);
CREATE INDEX idx_stripe_events ON stripe_events(stripe_event_id);
```

### New Files

| File                             | Purpose                            |
| -------------------------------- | ---------------------------------- |
| `src/lib/stripe.ts`              | Stripe SDK singleton (server-only) |
| `supabase/add_stripe_tables.sql` | Migration file (SQL above)         |

### Files to Modify

| File                   | Change                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `src/lib/constants.ts` | Add to `Restaurant` type: `featured_until`, `featured_since`, `verified_until`      |

---

## Phase 2: Business Account & Restaurant Linking [ ]

### Business Account Upgrade Flow

1. User clicks "Switch to Business" in their dashboard
2. Fills out business profile form:
   - Business Name (required)
   - Business Phone (required)
   - ABN / Business Registration # (required)
   - Role: Owner / Manager / Authorized Rep
3. `profiles.account_type` flips to `'business'`
4. Dashboard shows new "Business" tab with restaurant management

### Restaurant Linking Flow (Admin-Vetted, No Auto-Linking)

1. Business user searches for their restaurant or visits the restaurant page
2. If restaurant already has an owner in `restaurant_owners`: block link request (or surface admin contact)
3. Submits a "Link Request" with proof of ownership (ABN match, lease doc, business email, etc.)
4. Admin reviews in Links tab — sees business profile details + evidence
5. On approve: insert into `restaurant_owners(restaurant_id, user_id, role='owner')`, restaurant appears in Business Dashboard
6. On reject: admin provides notes

> **Edge case — replacing an owner**: If a restaurant's owner changes, admin must manually remove the old `restaurant_owners` record and approve the new link request. No automated transfer.

### What Business Owners CAN Do

- Edit restaurant details — only for restaurants they own and only while `verified_until > now()`
- Pay for verification of linked restaurants — annual payment
- Pay for featured status

### What Business Owners CANNOT Do

- Remove restaurant from platform (must require admin approval)
- Transfer ownership without admin approval
- Purchase verification if `verified_until > now()` (blocked server-side)
- Purchase featured subscription if one is already active (blocked server-side)

### New Files

| File                                               | Purpose                                                                                               |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/app/api/business/upgrade/route.ts`            | POST: upgrade account to business. Validates required fields, updates `profiles`                      |
| `src/app/api/business/link/route.ts`               | POST: submit link request (business required, rate limited 3/hr). Checks `restaurant_owners` — blocks if already owned |
| `src/app/api/admin/links/route.ts`                 | GET: list all link requests (admin auth)                                                              |
| `src/app/api/admin/links/[id]/route.ts`            | PATCH: approve/reject link. On approve: insert into `restaurant_owners`                               |
| `src/components/dashboard/BusinessUpgradeForm.tsx` | Business profile form (name, phone, ABN, role)                                                        |
| `src/components/dashboard/MyRestaurants.tsx`       | Linked restaurants list with status, featured/verification actions                                    |
| `src/components/restaurant/LinkButton.tsx`         | "Link this restaurant to your business" button on restaurant detail page                              |

### Files to Modify

| File                                        | Change                                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `src/app/(site)/restaurant/[slug]/page.tsx` | Add `LinkButton` (hidden if already owned). Show "Managed by [business]" badge if owned  |
| `src/app/dashboard/page.tsx`                | Add "Business" tab: upgrade CTA if regular, or `MyRestaurants` + link request if business |
| `src/app/admin/page.tsx`                    | Add Links tab (pending/approved/rejected, approve/reject buttons)                         |
| `src/lib/ratelimit.ts`                      | Add `linkRequestRateLimit`                                                                |

---

## Phase 3: Featured Badge Payment [ ]

### Flow

1. Business owner visits dashboard -> "My Restaurants" -> clicks "Get Featured" on a linked restaurant
2. Server checks: does `restaurant_owners` confirm ownership? Does an active subscription already exist (block stacking)?
3. Redirected to Stripe Checkout ($29/month subscription) — price ID resolved server-side from env, never from client
4. Stripe webhook confirms payment -> `featured_until` set, `featured_since` recorded
5. Subscription renews automatically; `invoice.paid` webhook extends `featured_until`
6. Cancellation -> `customer.subscription.deleted` webhook -> `featured_until = subscription.current_period_end` (not immediate removal — owner keeps badge for period they paid for)

### Webhook Idempotency Pattern

```typescript
// On every webhook event:
const existing = await supabase
  .from('stripe_events')
  .select('id')
  .eq('stripe_event_id', event.id)
  .single();

if (existing.data) return Response.json({ received: true }); // already processed

await supabase.from('stripe_events').insert({ stripe_event_id: event.id });
// ... process event
```

### New Files

| File                                     | Purpose                                                                                                                                                                                |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/api/checkout/featured/route.ts` | POST: create Stripe Checkout Session (`mode: 'subscription'`). Validates ownership via `restaurant_owners`. Checks no active subscription. Gets/creates Stripe Customer. Returns URL   |
| `src/app/api/webhooks/stripe/route.ts`   | Stripe webhook handler. Handles: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`. Signature-verified, idempotent via `stripe_events` table               |
| `src/lib/stripe-helpers.ts`              | `getOrCreateStripeCustomer()`, `handleFeaturedPayment()`, `handleSubscriptionRenewal()`, `handleSubscriptionCancelled()`                                                               |

### Files to Modify

| File                                         | Change                                                                              |
| -------------------------------------------- | ----------------------------------------------------------------------------------- |
| `src/components/dashboard/MyRestaurants.tsx` | "Get Featured" button, subscription status + renewal date, "Cancel Featured" option |

### Key Implementation Details

- Webhook reads raw body via `req.text()` (required for Stripe signature verification)
- `featured_until` set to `subscription.current_period_end` on first payment
- `featured_since` set once on first successful payment (not overwritten on renewals)
- `invoice.paid`: extend `featured_until = new current_period_end`; store invoice ID in `payments.metadata`
- `customer.subscription.deleted`: set `featured_until = event.data.object.current_period_end` (grace period to end of billing cycle)
- Admin manual toggle: set `featured_until = NULL` (indefinite/admin-granted) or a specific date
- `stripe_customers` table used for `getOrCreateStripeCustomer()` — never overwrite existing record

---

## Phase 4: Verification Payment & Admin Pipeline [ ]

### What the Verified Badge Means (important — informs all UI copy)

> *"The information on this listing has been confirmed by a person with verified authority over the restaurant. It is not crowd-sourced or assumed. HalalBites does not certify halal status."*

The badge signals **information authenticity**, not halal certification. This is a meaningful distinction for both legal reasons and user trust — we're confirming provenance, not making religious or safety claims.

### Flow

1. Business owner pays for listing verification ($149 AUD one-off) via Stripe Checkout
2. Server blocks purchase if `verified_until > now()` (already verified)
3. Payment confirmed -> restaurant enters "Pending Verification" state (NOT immediately verified)
4. Owner is prompted to fill in **Listing Confirmation Form** (multi-step form):
   - Confirm the information currently displayed on their listing is accurate (name, address, hours, cuisine, halal criteria)
   - Correct any details that are wrong — these corrections are reviewed before going live
   - Upload evidence of authority over the restaurant (ABN, business registration, lease, or other relevant doc)
   - Any additional context or notes for the admin reviewer
5. Completed submission enters Admin Verification Queue
6. Admin reviews: does the evidence confirm the person has authority to speak for this restaurant? Does the submitted information match the listing? Admin creates a verification report summarising the evidence reviewed.
7. Report submitted -> `verified_until = now + 1 year`; report is publicly viewable
8. If information corrections were submitted, admin applies them to the listing during the same review step
9. Owner sees "Renew" button 60 days before expiry -> new $149 payment, same flow

### Listing Confirmation Form (new component/page)

The form appears after payment is confirmed (success redirect or webhook-triggered unlock). It is a multi-step form gated behind a completed `payments` record for this restaurant.

Fields (final list to be confirmed):
- **Listing review**: display current listing details (name, address, hours, cuisine, halal criteria) with a checkbox "This information is accurate" or a text field for corrections
- **Evidence of authority**: upload one or more documents — ABN registration, business lease, council permit, or similar
- **Your role**: Owner / Manager / Authorized Representative (with company name if applicable)
- **Declaration**: checkbox — "I confirm I am authorized to provide information on behalf of this restaurant and the above is accurate to the best of my knowledge"
- **Additional notes**: free text for any context the admin reviewer should know

### New Files

| File                                                     | Purpose                                                                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/app/api/checkout/verification/route.ts`             | POST: create Checkout Session (`mode: 'payment'`, one-time $149). Validates ownership. Blocks if already verified. Returns URL |
| `src/app/api/verification/questionnaire/route.ts`        | POST: submit completed questionnaire. Gated behind confirmed payment for this restaurant                       |
| `src/app/api/admin/verification/route.ts`                | GET: list restaurants awaiting verification (paid + questionnaire submitted, no report yet)                    |
| `src/app/api/admin/verification/[restaurantId]/route.ts` | POST: create verification report (sets `verified_until`, stores `created_by`). PATCH: revoke with reason       |
| `src/components/dashboard/VerificationQuestionnaire.tsx` | Multi-step form: questionnaire fields + document uploads, submits to questionnaire API                         |

### Files to Modify

| File                                         | Change                                                                                                           |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `src/app/api/webhooks/stripe/route.ts`       | Add `verification` payment type handling (mark paid, trigger questionnaire unlock — no verified flag set yet)    |
| `src/app/admin/page.tsx`                     | Add Verification Queue tab: "Awaiting Questionnaire" / "Awaiting Review" / "Active" / "Expiring Soon" / "Expired" |
| `src/components/dashboard/MyRestaurants.tsx` | Show: "Not Verified" / "Complete Questionnaire" / "Pending Review" / "Verified until [date]" / "Renew"          |

---

## Phase 5: Admin Dashboard Updates [ ]

### Goal

Give admin full visibility into business accounts, restaurant links, payments, and verification pipeline.

### New Admin Tabs (extract to separate component files)

| File                                       | Purpose                                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `src/components/admin/LinksTab.tsx`        | Pending/approved/rejected link requests, business profile details, approve/reject actions |
| `src/components/admin/PaymentsTab.tsx`     | All payments with type/status filters, amounts, Stripe session links, metadata viewer     |
| `src/components/admin/VerificationTab.tsx` | Verification queue, report creation/viewing, expiry management, revoke with reason        |

### New Files

| File                                  | Purpose                                                       |
| ------------------------------------- | ------------------------------------------------------------- |
| `src/app/api/admin/payments/route.ts` | GET: list all payments (paginated, filterable by type/status) |

### Files to Modify

| File                               | Change                                                                                                      |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `src/app/admin/page.tsx`           | Import new tab components, add to sidebar nav, update KPI cards (pending links, revenue, verifications due) |
| `src/app/api/admin/stats/route.ts` | Add payment totals, pending links count, verification queue count                                           |

---

## Phase 6: Frontend Polish [ ]

### New Files

| File                                                            | Purpose                                                    |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| `src/app/(site)/restaurant/[slug]/verification-report/page.tsx` | Public page showing verification report for a restaurant   |
| `src/components/restaurant/OwnerBanner.tsx`                     | Banner on restaurant page for owners with management links |

### Files to Modify

| File                                        | Change                                                                       |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/app/(site)/restaurant/[slug]/page.tsx` | Owner banner, enhanced featured/verified badges, link to verification report |
| `src/app/(site)/searchResults/page.tsx`     | Gold border on featured restaurant cards                                     |
| `src/components/search/MapView.tsx`         | Gold pins for featured restaurants                                           |

---

## Expiry Handling

Use Supabase pg_cron (daily job). No boolean flags — status is computed from timestamps:

```sql
-- Expire verification reports
UPDATE verification_reports SET status = 'expired'
  WHERE status = 'active' AND expires_at < now();

-- Sync verified_until on restaurants when report expires (if needed for index perf)
UPDATE restaurants r SET verified_until = NULL
  WHERE verified_until IS NOT NULL
    AND verified_until < now()
    AND NOT EXISTS (
      SELECT 1 FROM verification_reports vr
      WHERE vr.restaurant_id = r.id AND vr.status = 'active'
    );
```

Featured expiry is handled by the `customer.subscription.deleted` webhook (sets `featured_until = period_end`). The cron job is a safety net only — no boolean flags to reset.

Admin manual overrides: set `featured_until = NULL` (indefinite) or to a specific date.

---

## Security Notes

- Webhook signature verification via `STRIPE_WEBHOOK_SECRET` — never trust client-side redirect
- **Price IDs resolved server-side only** — checkout routes use `process.env.STRIPE_FEATURED_MONTHLY_PRICE_ID`, client never passes a price ID
- Ownership validated via `restaurant_owners` join on every checkout route
- **Subscription stacking blocked** — before creating featured checkout, check for existing active subscription (`featured_until > now()`)
- **Verification stacking blocked** — before creating verification checkout, check `verified_until > now()`
- **Link blocking** — if `restaurant_owners` already has a record for the restaurant, block new link requests (or surface admin contact)
- Business account required for link requests and payments
- Idempotency: `stripe_events` table checked before processing any webhook
- Admin routes use existing `checkAuth()` cookie pattern
- Rate limit link request submissions (3/hour/user)
- Separate Stripe keys for test vs production (`.env.local` vs `.env.production`)

---

## Scenario Reference

| Scenario                             | Behavior                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| Featured subscription cancelled      | `featured_until = current_period_end`; badge stays until period ends              |
| Featured subscription renewed        | `featured_until` extended to new `current_period_end`                             |
| Verification expires (12 months)     | pg_cron sets report -> expired; `verified_until` cleared. Owner sees "Renew"      |
| Admin revokes featured               | `featured_until = NULL` or specific date (manual control)                         |
| Admin revokes verification           | Report `status = 'revoked'`, `revoked_reason` populated (e.g. ownership changed, info found inaccurate), `verified_until` cleared |
| User requests link to owned restaurant | Blocked with message to contact support                                          |
| User requests link to unowned restaurant | Goes to admin for review — no auto-approve                                    |
| Already featured, tries to pay again | Blocked server-side — "Active subscription already exists"                        |
| Already verified, tries to pay again | Blocked server-side — "Currently verified until [date]"                           |
| Restaurant has no owner              | "Link this restaurant" button visible to business accounts                        |
| Regular user tries to link           | Prompted to upgrade to business account first                                     |
| Verification rejected by admin       | No refund (per policy — payment is for review process). Report explains what evidence was insufficient |

---

## Deferred / Post-MVP

- **Multiple managers per restaurant**: `restaurant_owners` table already supports this schema-wise. Admin UI for managing roles is deferred.
- **Analytics dashboard**: restaurant owners paying to see views/clicks. Deferred to post-revenue phase.
- **Promoted search results**: per-search-query placement separate from featured subscription. Deferred.

---

## Verification Checklist

- [ ] SQL migration runs cleanly
- [ ] `stripe` package builds with Next.js 16
- [ ] `stripe_events` deduplication prevents double-processing
- [ ] `stripe_customers` table used for customer creation (not profiles column)
- [ ] User can upgrade to business account
- [ ] Business user can submit link request with evidence
- [ ] Link request blocked if restaurant already has an owner
- [ ] Admin can approve/reject link requests; approve inserts into `restaurant_owners`
- [ ] Owner can purchase featured ($29/mo) via Stripe Checkout (price ID from env, not client)
- [ ] Subscription stacking blocked server-side
- [ ] Webhook fires and sets `featured_until` idempotently
- [ ] Subscription renewal extends `featured_until` to new period end
- [ ] Subscription cancellation sets `featured_until = current_period_end` (grace period)
- [ ] Owner can purchase listing verification ($149); blocked if already verified
- [ ] Post-payment: Listing Confirmation Form unlocked, owner confirms listing details + uploads authority evidence
- [ ] Form submission appears in admin verification queue
- [ ] Admin reviews evidence, creates report with `created_by` recorded -> `verified_until = now + 1 year`
- [ ] Admin can revoke verification with `revoked_reason`
- [ ] Expiry cron updates `verification_reports.status`; does not require boolean flags
- [ ] Admin can manually override featured/verified via `featured_until`/`verified_until`
- [ ] All new pages follow dark-theme design tokens
- [ ] Stripe test/production key separation confirmed before go-live
