# ⚡ APNATREE.IN — CURSOR AGENT EXECUTION PROMPT
## Phase 2 → Phase 3 → Phase 4 | Hyper-Performance Edition
### React 19 · Next.js 15 · Edge Architecture · 100/100 Core Web Vitals

---

> **AGENT BRIEFING:** You are an Elite Performance Architect and Senior Next.js Full-Stack Developer executing a production build for `apnatree.in`. Phase 1 is complete. This document is your absolute execution authority for Phases 2, 3, and 4. Read every section fully before writing a single line of code. Execute phases sequentially. Do not skip steps. Do not hallucinate packages. Every decision defaults to maximum performance.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 0 — CURRENT STATE BRIEFING & IMMUTABLE LAWS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 0.1 What Phase 1 Delivered (Do Not Touch Unless Instructed)
- Next.js 15 App Router scaffold with `src/` directory and `@/` alias
- React 19 with concurrent features enabled
- Tailwind CSS v4 with brand design tokens in `globals.css`
- Prisma ORM with full schema: User, Tree, Contract, RentPayment, MediaUpdate, FarmVisit, HarvestOrder, Waitlist, SiteConfig
- PostgreSQL database (seeded with 50 trees, 1 admin, sample SiteConfig)
- NextAuth.js with Google OAuth, role-based middleware protecting `/dashboard` and `/admin`
- shadcn/ui component library initialized
- All routing shells: `(marketing)`, `(auth)`, `(dashboard)`, `(admin)` route groups
- `src/lib/pricing.ts` — pricing engine with `calculatePricing()`
- `src/lib/media-map.ts` — media asset mapping
- `src/lib/animations.ts` — Framer Motion presets
- Navbar, Footer, DashboardSidebar, AdminSidebar layout components (shells)
- `.env.example` and `src/lib/env.ts` with Zod validation

### 0.2 Current Package Inventory (Do NOT add packages not on this list without explicit justification)
```
ALREADY INSTALLED:
next@15, react@19, react-dom@19, typescript, tailwindcss@4,
prisma, @prisma/client, next-auth, @auth/prisma-adapter,
shadcn/ui (all components initialized), framer-motion,
react-hook-form, @hookform/resolvers, zod,
lucide-react, clsx, tailwind-merge, date-fns

TO INSTALL (only these, in order, at the start of Phase 2):
stripe @stripe/stripe-js @stripe/react-stripe-js
uploadthing @uploadthing/react @uploadthing/next
resend react-email @react-email/components
@vercel/og
sharp  ← Required by next/image for blur placeholder generation
```

Run this ONCE before Phase 2 execution begins:
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
npm install uploadthing @uploadthing/react @uploadthing/next
npm install resend react-email @react-email/components
npm install @vercel/og sharp
npx prisma generate
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 1 — IMMUTABLE PERFORMANCE LAWS (React 19 / Next.js 15)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These are **non-negotiable architectural laws**. Violating any of them is a hard failure.

### LAW 1 — React Server Components Are the Default Universe
Every component you create is a React Server Component (RSC) **unless** it requires one of exactly these capabilities:
- `useState` or `useReducer`
- `useEffect` or `useLayoutEffect`
- Browser-only APIs (`window`, `document`, `localStorage`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Third-party hooks that internally use the above

When `"use client"` is needed, **push the boundary DOWN the component tree as far as physically possible**. The goal: RSC shells that stream HTML, with tiny interactive islands.

Pattern to enforce:
```
// ✅ CORRECT — RSC shell, tiny client island
// page.tsx (RSC) → fetches data → passes to:
// ContractList.tsx (RSC) → renders list shell → contains:
// ContractActions.tsx ("use client") → only the 2 buttons that need onClick

// ❌ WRONG — marking the whole page client-side because one button needs onClick
```

### LAW 2 — Granular Suspense Boundaries Are Mandatory
Every data-fetching RSC must be wrapped in a `<Suspense>` boundary **at the closest possible ancestor** — not at the page level. This enables streaming: the UI shell renders immediately while data loads.

Rules:
- Dashboard pages: minimum 3 Suspense boundaries per page (header data, main content, sidebar stats)
- Marketing pages: Suspense wraps any section that fetches from DB (tree availability, stats counters)
- Every `<Suspense fallback={...}>` uses a **purpose-built skeleton**, never a generic spinner
- Skeletons must mirror the exact layout of the content they replace (same height, same columns)

### LAW 3 — Data Caching Is Explicit and Intentional
Use Next.js 15 data cache with these exact patterns:

```typescript
// PATTERN A — Static data that changes rarely (pricing, tree tiers)
// Revalidate every 1 hour via ISR
import { unstable_cache } from "next/cache";

const getCachedTreeAvailability = unstable_cache(
  async () => prisma.tree.findMany({ where: { isAvailable: true }, select: { id: true, tier: true } }),
  ["tree-availability"],
  { revalidate: 3600, tags: ["trees"] }
);

// PATTERN B — User-specific data (contracts, media) — NEVER cached
// These always go through regular async functions, no caching layer

// PATTERN C — Site config (open/closed, stats)
const getCachedSiteConfig = unstable_cache(
  async (key: string) => prisma.siteConfig.findUnique({ where: { key } }),
  ["site-config"],
  { revalidate: 300, tags: ["site-config"] }
);

// PATTERN D — After admin mutations, invalidate cache tags
import { revalidateTag } from "next/cache";
// After admin toggles tree availability: revalidateTag("trees")
// After admin updates site config: revalidateTag("site-config")
```

### LAW 4 — Dynamic Imports for Heavy Client Libraries
Never import Framer Motion or Stripe Elements at the top level of a client component that renders on first paint. Use `next/dynamic`:

```typescript
// Framer Motion (only for marketing scroll-reveal components)
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

// Stripe Elements (only on checkout pages)
const StripeCheckoutForm = dynamic(
  () => import("@/components/booking/StripeCheckoutForm"),
  { loading: () => <CheckoutSkeleton />, ssr: false }
);
```

**Exception:** Framer Motion's `AnimatePresence` used for page transitions at layout level may be static imported. Scroll-reveal animations must ALWAYS be dynamically imported.

### LAW 5 — next/image Is the Only Image Renderer
No `<img>` tags anywhere. Every image:
```typescript
<Image
  src={src}
  alt={descriptiveAlt}
  width={w}
  height={h}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={blurDataURL} // Generate with sharp at build time
  loading="lazy"            // Except hero images: loading="eager" priority={true}
  quality={85}
/>
```

### LAW 6 — Prisma Queries Are Always Selective
Never use `findMany()` without `select` and `take`. Every Prisma call:
```typescript
// ✅ CORRECT
await prisma.contract.findMany({
  where: { userId: session.user.id, status: "ACTIVE" },
  select: {
    id: true,
    contractNumber: true,
    tier: true,
    status: true,
    startDate: true,
    endDate: true,
    tree: { select: { treeCode: true, tier: true, profileImageUrl: true } },
  },
  take: 10,
  orderBy: { createdAt: "desc" },
});

// ❌ WRONG — fetches every field including heavy JSON, no limit
await prisma.contract.findMany({ where: { userId } });
```

**Prisma Connection Pooling for Serverless:** In `src/lib/prisma.ts`, ensure the singleton pattern prevents connection exhaustion on Vercel's serverless functions. Append `?pgbouncer=true&connection_limit=1` to DATABASE_URL if using PgBouncer (Neon/Supabase provide this).

### LAW 7 — No Unnecessary Re-renders
- `useCallback` on every function passed as prop to memoized children
- `useMemo` for expensive derivations (pricing calculations, filtered lists)
- `React.memo()` on pure presentational components that receive stable props
- Server Actions do NOT cause re-renders — prefer them over client-side fetch wherever possible

### LAW 8 — TypeScript Strict, Zero Compromise
- `strict: true` in `tsconfig.json` — verify it is on
- No `any`. No `@ts-ignore`. No `as unknown as X`
- All Prisma query results typed via the generated `Prisma` namespace:
  ```typescript
  import type { Prisma } from "@prisma/client";
  type ContractWithTree = Prisma.ContractGetPayload<{
    include: { tree: true };
  }>;
  ```
- All Server Action return types explicitly declared with discriminated unions:
  ```typescript
  type ActionResult<T> = 
    | { success: true; data: T }
    | { success: false; error: string };
  ```

### LAW 9 — Server Actions Are the Mutation Layer
No separate POST API routes for form mutations. Every write operation uses a Server Action in `src/actions/`. Every action:
1. Validates input with Zod
2. Checks authentication via `auth()` from NextAuth
3. Scopes all DB operations to the authenticated user
4. Returns a typed `ActionResult`
5. Uses `revalidatePath()` or `revalidateTag()` after mutations

### LAW 10 — Every Route Has Its Three Companions
For every `page.tsx` you create or modify:
```
page.tsx
loading.tsx   ← Skeleton that mirrors page layout exactly
error.tsx     ← "use client", graceful error with retry button
not-found.tsx ← Friendly 404 with navigation back
```

No exceptions. These are not optional.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 2 — STRIPE BOOKING ENGINE
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### PHASE 2 OBJECTIVE
Build the complete booking flow: tree selection → contract configuration → Stripe Checkout (Phase 1 pre-booking) → webhook confirmation → contract status update → dashboard confirmation. Also build the Phase 2 annual rent payment trigger from admin.

---

### STEP 2.1 — Stripe Singleton & Configuration

**File to create: `src/lib/stripe.ts`**

Instructions:
- Create a Stripe singleton using the secret key from `env.STRIPE_SECRET_KEY`
- Initialize with `apiVersion: "2024-12-18.acacia"` (latest stable)
- Export both server-side `stripe` instance and client-side publishable key constant
- Add JSDoc comment explaining server vs client usage boundary

**File to create: `src/lib/stripe-helpers.ts`**

Instructions:
- Create `formatAmountForStripe(amountPaise: number, currency: string): number` — converts paise to Stripe's integer format (paise for INR, cents for USD/GBP/EUR)
- Create `formatAmountFromStripe(amount: number, currency: string): number` — inverse
- Create `getCurrencyConfig(currency: string): { symbol: string; locale: string }` — returns formatting config per currency
- Create `buildStripeLineItem(tier, duration, currency, pricing)` — returns a properly typed `Stripe.Checkout.SessionCreateParams.LineItem`

---

### STEP 2.2 — Pre-Booking Server Action (Phase 1 Payment)

**File to create: `src/actions/booking.ts`**

This is the most critical file in Phase 2. Build it with these exact requirements:

**Function 1: `createPreBookingSession(formData: FormData): Promise<ActionResult<{ url: string }>>`**

Logic flow (implement each step, no skipping):
1. Extract and validate: `tier` (TreeTier enum), `duration` (ContractDuration enum), `currency` ("INR" | "USD" | "GBP" | "EUR") from formData using Zod
2. Call `auth()` — if no session, return `{ success: false, error: "Please sign in to continue" }`
3. **Check for duplicate pending bookings:** Query `prisma.contract.findFirst({ where: { userId, status: "PREBOOKING_PENDING", tier, duration } })` — if exists and created within last 30 minutes, return error: "You have a pending booking in progress. Check your dashboard."
4. **Check tree availability:** Call `getCachedTreeAvailability()` — count available trees of requested tier. If zero, redirect to waitlist.
5. Calculate pricing via `calculatePricing(tier, duration)`
6. Create the Contract record in DB with status `PREBOOKING_PENDING`
7. Create Stripe Checkout Session with:
   - `payment_method_types: ["card"]` + add `"upi"` if currency is "INR"
   - Line item built via `buildStripeLineItem()`
   - `metadata: { contractId, userId, type: "PREBOOKING", tier, duration }`
   - `client_reference_id: contract.id`
   - `expires_at: Math.floor(Date.now() / 1000) + 1800` (30-minute session expiry — **pessimistic lock**)
   - Success URL: `${env.NEXT_PUBLIC_APP_URL}/dashboard?booking=success&ref={CHECKOUT_SESSION_ID}`
   - Cancel URL: `${env.NEXT_PUBLIC_APP_URL}/trees/${tier.toLowerCase()}?cancelled=true`
8. Update Contract record with `prebookingStripeSessionId`
9. Return `{ success: true, data: { url: session.url } }`

**Function 2: `getContractById(contractId: string): Promise<ContractWithTree | null>`**
- Fetches contract scoped to `session.user.id`
- Uses selective `select` — only fields needed for dashboard display
- No caching (user-specific data)

**Function 3: `cancelExpiredPendingContracts(): Promise<void>`**
- Admin-only action
- Finds all PREBOOKING_PENDING contracts older than 24 hours
- Updates status to CANCELLED
- Should be called via a cron job or admin panel button

---

### STEP 2.3 — Annual Rent Payment (Phase 2)

**Add to `src/actions/booking.ts`:**

**Function: `createAnnualRentSession(contractId: string): Promise<ActionResult<{ url: string }>>`**

Logic:
1. Auth check — must be the contract owner OR admin
2. Fetch contract with tree assignment (must exist and be `AWAITING_CONFIRMATION` or admin triggers this)
3. Create `RentPayment` record with `yearNumber`, `amountPaise`, `dueDate`
4. Create Stripe Session with `metadata.type = "ANNUAL_RENT"`, `metadata.rentPaymentId`
5. Return checkout URL

**Admin Function: `assignTreeAndTriggerRent(contractId: string, treeId: string): Promise<ActionResult<void>>`**
- Admin-only (check `session.user.role === "ADMIN"`)
- Atomic transaction: update Contract `treeId`, update Tree `isAvailable = false`, set contract status to `AWAITING_CONFIRMATION`
- Send Phase 2 payment email to user via `sendContractActivatedEmail()`
- `revalidateTag("trees")` after mutation

---

### STEP 2.4 — Stripe Webhook Handler

**File to create: `src/app/api/webhooks/stripe/route.ts`**

This is a Route Handler (not a Server Action). Requirements:

```
METHOD: POST only. Reject all other methods.

SIGNATURE VERIFICATION (first thing, before any logic):
- Read raw body as Buffer: `const body = await req.arrayBuffer()`
- Get header: `const sig = req.headers.get("stripe-signature")`
- Construct event: `stripe.webhooks.constructEvent(Buffer.from(body), sig, env.STRIPE_WEBHOOK_SECRET)`
- If verification fails: return 400 immediately, log warning

HANDLE THESE EVENTS:

Event 1: "checkout.session.completed"
  → Read metadata.type to branch:

  BRANCH "PREBOOKING":
  - Find Contract by metadata.contractId
  - Verify contract.userId matches session.customer_email's user (security check)
  - Update Contract:
    status: "PREBOOKING_PAID"
    prebookingPaidAt: new Date()
    prebookingStripePaymentId: session.payment_intent
  - Send email: sendPreBookingConfirmationEmail(user, contract)
  - Return 200

  BRANCH "ANNUAL_RENT":
  - Find RentPayment by metadata.rentPaymentId
  - Update RentPayment: paidAt = new Date(), stripePaymentId = session.payment_intent
  - If rentPayment.yearNumber === 1:
    - Update Contract: status = "ACTIVE", startDate = new Date()
    - Calculate endDate based on ContractDuration
    - Update Contract: endDate
  - Else:
    - Update Contract status remains ACTIVE (already set)
  - Send email: sendRentConfirmationEmail(user, contract, rentPayment)
  - Return 200

  BRANCH "SHIPPING":
  - Update HarvestOrder: shippingPaymentStatus = "PAID", shippingPaidAt = new Date()
  - Send email: sendShippingConfirmationEmail(user, harvestOrder)
  - Return 200

Event 2: "checkout.session.expired"
  → If type = "PREBOOKING": update Contract status to CANCELLED
  → Return 200

Event 3: "payment_intent.payment_failed"
  → Log failure, send failure notification email to user
  → Return 200

CRITICAL: Wrap all DB operations in try/catch. A webhook handler must ALWAYS return 200
to Stripe (except signature failure). If our DB write fails, log to console.error and
still return 200 — Stripe will retry. Handle idempotency: check if contract is already
PREBOOKING_PAID before re-processing.
```

---

### STEP 2.5 — Booking UI Components

**File: `src/components/booking/TierSelector.tsx`** (RSC)
- Receives available tree counts per tier (pre-fetched by parent RSC)
- Renders 3 cards: Small / Medium / Large
- Each card shows: tier name, age, expected yield, pre-booking amount, yearly rent
- "Sold Out" overlay if tier has 0 available trees
- Selected tier gets gold ring border
- Pass selected state up — this IS a client component due to selection state (`"use client"`)

**File: `src/components/booking/ContractDurationSelector.tsx`** (`"use client"`)
- Radio group for 1-Year / 2-Year / 5-Year (Mega)
- 5-Year card has "Save 12%" badge
- onChange recalculates and displays live pricing breakdown

**File: `src/components/booking/PricingBreakdown.tsx`** (RSC-compatible)
- Receives `PricingBreakdown` object from `calculatePricing()`
- Displays: Pre-booking today / Annual rent / Total contract value / Discount
- "What happens after pre-booking?" expandable section

**File: `src/components/booking/BookingForm.tsx`** (`"use client"`)
- Orchestrates TierSelector + ContractDurationSelector + PricingBreakdown
- Currency selector (INR / USD / GBP / EUR) with flag emoji
- Submit button calls `createPreBookingSession` Server Action
- Button state: idle / loading (with spinner) / success (redirect happens) / error (shows message)
- Uses `useTransition` from React 19 for non-blocking submission:
  ```typescript
  const [isPending, startTransition] = useTransition();
  const handleSubmit = () => startTransition(async () => {
    const result = await createPreBookingSession(formData);
    if (!result.success) setError(result.error);
    else window.location.href = result.data.url;
  });
  ```

**File: `src/app/(marketing)/trees/[tier]/page.tsx`** (RSC)
- Fetch available tree count for this tier (cached)
- Fetch site config `prebooking_open` (cached)
- If prebooking closed: show waitlist form, hide booking form
- Suspense wrap BookingForm with BookingFormSkeleton fallback
- Full metadata export with tier-specific title/description

---

### STEP 2.6 — Booking Success Handler

**File: `src/app/(dashboard)/dashboard/booking-success/page.tsx`** (RSC)

- Reads `?ref=` query param (Stripe checkout session ID)
- Fetches contract by Stripe session ID from DB
- Shows premium success animation (Lottie or CSS-only confetti — no heavy library)
- Displays contract details: contract number, tree tier, what happens next timeline
- CTA: "Go to My Dashboard"
- If contract not found or not paid yet: show "Payment processing..." with auto-refresh every 5 seconds (client component for this case only)

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 3 — MEDIA DASHBOARD & UPLOADTHING
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### PHASE 3 OBJECTIVE
Build the bi-weekly media update system: admin upload portal (field agent uploads photos/videos for specific trees) → user media gallery dashboard (paginated, optimized, lightbox). This is the emotional heart of the product — it must feel fast and beautiful.

---

### STEP 3.1 — UploadThing Configuration

**File to create: `src/lib/uploadthing.ts`**
- Create UploadThing file router with these endpoints:
  - `treeMediaUploader`: accepts `image/jpeg`, `image/png`, `image/webp`, `video/mp4`, `video/quicktime`
  - Max file size: images 8MB, videos 256MB
  - Max files per upload: 10
  - `middleware`: verify session exists AND user role is ADMIN or FIELD_AGENT
  - `onUploadComplete`: DO NOT write to DB here — just return the file URL and key. DB write happens in the Server Action after admin fills in metadata.

**File to create: `src/app/api/uploadthing/route.ts`**
- Standard UploadThing Next.js App Router handler
- Export `GET` and `POST` from `createRouteHandler`

**File to create: `src/components/shared/UploadThingProvider.tsx`** (`"use client"`)
- Wrap `<NextSSRPlugin>` from UploadThing for hydration

---

### STEP 3.2 — Blur Placeholder Generation

**File to create: `src/lib/blur-placeholder.ts`** (Server-only, never imported client-side)

Instructions:
- Create `generateBlurPlaceholder(imageUrl: string): Promise<string>` using `sharp`
- Fetch the image, resize to 8x8 pixels, convert to base64 JPEG, return as data URI
- Cache results in a simple in-memory Map during server runtime to avoid re-processing
- This function is called when admin uploads media, and the resulting `blurDataURL` is stored in the `MediaUpdate` DB record
- Add `blurDataURL String?` field to `MediaUpdate` model in Prisma schema — run `npx prisma migrate dev --name add_blur_placeholder`

---

### STEP 3.3 — Admin Media Upload Portal

**File: `src/app/(admin)/admin/media-upload/page.tsx`** (RSC)

Page structure:
- Page is an RSC that fetches: all active contracts (select: id, contractNumber, tree.treeCode, user.name)
- Passes contract list to client upload form component
- Wraps form in Suspense with skeleton

**File: `src/components/admin/MediaUploadForm.tsx`** (`"use client"`)

Full implementation requirements:
1. **Step 1 — Contract Search:** Searchable combobox (shadcn `<Command>`) to find active contract by contract number or user name. On select, auto-fills tree code and user name display.
2. **Step 2 — Media Upload Zone:** UploadThing `<UploadDropzone>` with drag-and-drop. Show thumbnail previews immediately on file select. Distinguish photo vs video by MIME type.
3. **Step 3 — Metadata Form:** For each uploaded file, show:
   - Caption textarea
   - `takenAt` date picker (defaults to today)
   - Auto-detected mediaType badge (PHOTO / VIDEO)
4. **Submit:** Calls `createMediaUpdate` Server Action. Shows per-file progress states.
5. On success: clear form, show "Update sent to [User Name]" toast, reset all state.

**File to create: `src/actions/media.ts`**

**Function: `createMediaUpdate(data: CreateMediaUpdateInput): Promise<ActionResult<MediaUpdate>>`**
- Admin/Field Agent only
- Validate input with Zod schema (contractId, treeId, fileUrl, uploadThingKey, mediaType, caption, takenAt)
- Call `generateBlurPlaceholder(fileUrl)` — catch errors gracefully (if sharp fails, store null)
- Create `MediaUpdate` record in Prisma with blurDataURL
- Call `sendNewMediaUpdateEmail(user, contract, mediaUpdate)` via Resend
- `revalidatePath("/dashboard/media")`
- Return result

**Function: `deleteMediaUpdate(id: string): Promise<ActionResult<void>>`**
- Admin only
- Delete from DB
- Delete from UploadThing via their API
- `revalidatePath("/dashboard/media")`

---

### STEP 3.4 — User Media Gallery

**File: `src/app/(dashboard)/dashboard/media/page.tsx`** (RSC)

Performance architecture for this page is critical. Implement exactly:

```
PAGE STRUCTURE:
├── Suspense boundary 1: <MediaFilters /> — client component for filter state
├── Suspense boundary 2: <MediaGallery contractId={...} page={...} filter={...} />
│   ├── RSC that fetches paginated MediaUpdate records
│   ├── Passes blurDataURL to each card
│   └── Suspense boundary 3: <UnreadCount /> — badge in page title
```

**Pagination strategy:**
- URL-based pagination: `?page=1&filter=all`
- Page reads `searchParams` (RSC receives this automatically in Next.js 15)
- Default page size: 12 items
- Query: `prisma.mediaUpdate.findMany({ where: { contract: { userId } }, take: 12, skip: (page-1)*12, orderBy: { takenAt: "desc" } })`
- No infinite scroll (avoid client-side complexity) — use simple numbered pagination
- Pre-fetch next page link (Next.js `<Link prefetch>`) for instant page transitions

**File: `src/components/dashboard/MediaGallery.tsx`** (RSC)

Build grid layout:
- CSS grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` 
- For PHOTO items: `<Image>` with `placeholder="blur"`, `blurDataURL={item.blurDataURL ?? FALLBACK_BLUR}`, `loading="lazy"`, `sizes` optimized
- For VIDEO items: Display thumbnail (first frame) with play button overlay; clicking opens video in dialog
- Unread items: gold ring border
- Each card shows: takenAt date, caption (truncated), PHOTO/VIDEO badge

**File: `src/components/dashboard/MediaLightbox.tsx`** (`"use client"`)

- Dynamic imported: `const MediaLightbox = dynamic(() => import("@/components/dashboard/MediaLightbox"), { ssr: false })`
- Opens on card click via a shared context or URL state (`?media=id`)
- PHOTO: full-screen `<Image>` with keyboard navigation (arrow keys, escape)
- VIDEO: `<video controls autoPlay>` with native controls
- Swipe gesture support on mobile via pointer events (do NOT add a swipe library — implement with native `onPointerDown`/`onPointerUp` delta calculation)
- Background click closes lightbox
- Mark as viewed: Server Action `markMediaAsViewed(id)` — fire-and-forget (no await in UI)

**File: `src/components/dashboard/MediaFilters.tsx`** (`"use client"`)

- Filter tabs: All / Photos / Videos / By Tree (dropdown if multiple contracts)
- Updates URL search params using `useRouter().push()` on change
- Selected filter visually distinct (gold underline)
- Does NOT cause full page re-render — only the Suspense-wrapped gallery re-fetches

---

### STEP 3.5 — Farm Visit Scheduler

**File: `src/app/(dashboard)/dashboard/visits/page.tsx`** (RSC)

Fetch and display in RSC:
- Current year's free visits quota: calculate `usedVisits` count from DB, display "X of 3 free visits used"
- Upcoming confirmed visits list
- Past visits list

**File: `src/components/dashboard/VisitScheduler.tsx`** (`"use client"`)

Requirements:
- shadcn `<Calendar>` component for date selection
- Disable: past dates, dates within 7 days of today (minimum notice), dates that are already fully booked (fetch unavailable dates from `getCachedUnavailableDates()`)
- `numberOfVisitors` input: 1–6 selector
- Notes textarea: optional
- On submit: call `requestFarmVisit` Server Action
- If 0 free visits remaining: show "You have used all 3 free visits this year. Contact us to book additional visits." — disable form

**Add to `src/actions/visits.ts`:**

**Function: `requestFarmVisit(data): Promise<ActionResult<FarmVisit>>`**
- Auth check
- Verify active contract exists for this user
- Count visits this contract year: `prisma.farmVisit.count({ where: { userId, visitYear: currentYear, usedFreeSlot: true } })`
- If count >= 3: return error
- Check date availability (not already 10+ visitors that day across all contracts)
- Create FarmVisit with `status: "REQUESTED"`, `usedFreeSlot: true`
- Generate random `confirmationCode` (6-char alphanumeric)
- Send confirmation email via `sendFarmVisitRequestEmail()`
- `revalidatePath("/dashboard/visits")`

---

### STEP 3.6 — Harvest Tracker

**File: `src/app/(dashboard)/dashboard/harvest/page.tsx`** (RSC)

Fetch all HarvestOrders for user's contracts (current + past seasons).

**File: `src/components/dashboard/HarvestTimeline.tsx`** (RSC)

Status pipeline visualization:
```
PENDING → IN_PROGRESS → PACKAGED → SHIPPED → DELIVERED
```
- Visual: horizontal stepper (desktop) / vertical stepper (mobile)
- Each stage: icon, label, date if completed, shimmer if current stage
- When status = PACKAGED: render `<ShippingPaymentCard />` client component

**File: `src/components/dashboard/ShippingPaymentCard.tsx`** (`"use client"`)

- Shows estimated yield, actual yield (if known), packing date
- Shipping address: auto-fills from user profile, editable
- "Calculate Shipping" button → calls `calculateShippingCost` Server Action → shows cost
- "Pay Shipping (₹X)" → calls `createShippingPaymentSession` Server Action → redirects to Stripe

**Add to `src/actions/harvest.ts`:**

**Function: `calculateShippingCost(harvestOrderId, address): Promise<ActionResult<number>>`**
- Simple calculation based on weight × distance zone (Gujarat = ₹80/kg, rest of India = ₹150/kg, international = ₹400/kg)
- Update HarvestOrder with calculated `shippingCostPaise`
- Return cost for display before charging

**Function: `createShippingPaymentSession(harvestOrderId): Promise<ActionResult<{ url: string }>>`**
- Creates Stripe session with `metadata.type = "SHIPPING"`, `metadata.harvestOrderId`
- Includes shipping cost as line item

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 4 — MARKETING EXCELLENCE & SEO
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### PHASE 4 OBJECTIVE
Build the premium public marketing pages with flawless performance: streaming hero, optimized scroll animations, dynamic OG images, perfect Core Web Vitals, full SEO infrastructure.

---

### STEP 4.1 — Homepage Architecture (Performance-First)

**File: `src/app/(marketing)/page.tsx`** (RSC — the conductor)

This page MUST render above-the-fold content in under 200ms. Architecture:

```typescript
// page.tsx — no async at this level for above-fold content
export default function HomePage() {
  return (
    <>
      {/* Renders IMMEDIATELY — no data dependency */}
      <HeroSection />
      <TrustBadgesStrip />
      
      {/* Below-fold sections stream in — each independently */}
      <Suspense fallback={<HowItWorksSkeleton />}>
        <HowItWorksSection />
      </Suspense>
      
      <Suspense fallback={<TreeTiersSkeleton />}>
        <TreeTiersSection />   {/* Fetches live availability */}
      </Suspense>
      
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />       {/* Fetches site config */}
      </Suspense>
      
      <FarmGallerySection />   {/* Static MEDIA map — no DB */}
      
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection /> {/* Static or CMS */}
      </Suspense>
      
      <NewsletterSection />    {/* Client component, isolated */}
    </>
  );
}
```

**HeroSection.tsx** (RSC + one tiny client sub-component):

Structure:
- RSC outer shell: renders semantic HTML, background video tag, text content
- `<HeroVideoPlayer />` (`"use client"`): handles `autoPlay`, `muted`, mobile/desktop switching, intersection observer to pause when off-screen
- Video: `<video autoPlay muted loop playsInline preload="metadata">` — NOT `preload="auto"` (saves bandwidth)
- On mobile (viewport width < 768px): do NOT autoplay video — show hero image instead (detect with CSS `@media`, not JavaScript)
- Hero text and CTAs are in RSC — instantly rendered, zero JS for text
- Scroll indicator: CSS-only animation (no Framer Motion in hero — it's critical path)

**ScrollReveal.tsx** (shared utility, `"use client"`, dynamically imported):

```
Build using Framer Motion's `useInView` with these settings:
- triggerOnce: true (animate in only once, never animate out)
- margin: "-10% 0px" (triggers slightly before element enters viewport)
- Export variants: fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer
- Every usage: dynamic import from parent RSC — NEVER static import in RSC
```

**StatsSection.tsx** (RSC, fetches cached site config):

```
Animated counter component:
- RSC renders the target numbers (from DB via cached query)
- Client sub-component <AnimatedCounter /> does the count-up animation
- Uses `useInView` to trigger only when visible
- Count-up duration: 2 seconds, ease-out cubic
- Do NOT use any external counter library — implement with useEffect + requestAnimationFrame
```

---

### STEP 4.2 — Tree Pages (ISR + Streaming)

**File: `src/app/(marketing)/trees/page.tsx`** (RSC with ISR)

```typescript
export const revalidate = 3600; // Revalidate every hour

// generateStaticParams not needed (no dynamic segments here)
// Page renders at build time + ISR
```

**File: `src/app/(marketing)/trees/[tier]/page.tsx`** (RSC with ISR)

```typescript
export const revalidate = 1800; // 30 min — pricing and availability

export function generateStaticParams() {
  return [
    { tier: "small" },
    { tier: "medium" },
    { tier: "large" },
  ];
}
// Pre-rendered at build time for all three tiers
// ISR updates availability counts every 30 minutes
```

Per-tier metadata:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const tierMeta = {
    small: {
      title: "Small Kesar Mango Tree (3-Year) | ApnaTree.in",
      description: "Rent a 3-year-old Kesar mango tree from Gir Forest. Expected yield 15–25kg per season. Pre-book for just ₹1,000.",
    },
    medium: { ... },
    large: { ... },
  };
  return { ...tierMeta[params.tier], openGraph: { ... } };
}
```

---

### STEP 4.3 — Email System (Resend + React Email)

**File: `src/emails/PreBookingConfirmation.tsx`**

Build as a React Email component:
- Full HTML email, mobile-responsive (use React Email's `<Section>`, `<Row>`, `<Column>` primitives)
- Brand colors: forest green header, gold accents, cream body
- Content: contract number, tree tier badge, what happens next (3-step timeline), support email
- Note: pre-booking fee is non-refundable (displayed prominently but warmly)
- Footer: unsubscribe link, registered address

**File: `src/emails/ContractActivated.tsx`**
- Tree code prominently displayed (bold, large, gold)
- Tree profile image (if available)
- "Your Tree's Location" section with farm sector info
- What to expect: first media update within 15 days, visit booking instructions

**File: `src/emails/NewMediaUpdate.tsx`**
- Media thumbnail embedded (for photos) or play button graphic (for videos)
- Caption from admin
- "View Full Gallery" CTA button → deep link to `/dashboard/media`
- "Your tree update #[N] from the Gir Forest" subject line

**File: `src/emails/FarmVisitConfirmation.tsx`**
- Confirmation code: large, prominent (for field agent check-in)
- Visit date, number of visitors
- Farm address with Google Maps link
- "What to bring" checklist
- Important reminder: travel and accommodation are self-arranged

**File: `src/emails/HarvestShipping.tsx`**
- Season summary: yield kg, grade, packing date
- Tracking number + courier partner
- Expected delivery date
- "Your Kesar mangoes are on their way 🥭" subject

**File: `src/lib/email.ts`** (Server-only)

Create one central `sendEmail()` function that:
- Instantiates Resend client from `env.RESEND_API_KEY`
- Accepts `{ to, subject, react: ReactElement }`
- Renders email via `render()` from `@react-email/components`
- Sends via Resend
- Catches and logs errors — NEVER throws (email failure must not crash the main flow)
- Returns `{ success: boolean }`

---

### STEP 4.4 — SEO Infrastructure

**File: `src/app/sitemap.ts`**

```
Generate sitemap with:
STATIC ROUTES (always include):
- / (priority: 1.0, changefreq: weekly)
- /trees (priority: 0.9, changefreq: daily)
- /trees/small, /trees/medium, /trees/large (priority: 0.9, changefreq: daily)
- /how-it-works (priority: 0.8, changefreq: monthly)
- /about (priority: 0.7, changefreq: monthly)
- /pricing (priority: 0.8, changefreq: weekly)
- /trust (priority: 0.7, changefreq: monthly)
- /faq (priority: 0.6, changefreq: monthly)
- /farm-visits (priority: 0.6, changefreq: monthly)
- /terms (priority: 0.3, changefreq: yearly)
- /privacy (priority: 0.3, changefreq: yearly)
- /contact (priority: 0.5, changefreq: monthly)

DYNAMIC ROUTES (fetch from DB):
- /blog/[slug] for each published blog post (priority: 0.6, changefreq: weekly)

EXCLUDE: all /dashboard, /admin, /api routes
```

**File: `src/app/robots.ts`**

```
Allow: / (all marketing routes)
Disallow: /dashboard, /admin, /api, /login, /register
Sitemap: https://apnatree.in/sitemap.xml
```

**File: `src/app/opengraph-image.tsx`** (Dynamic OG image)

Using `@vercel/og`, generate the root OG image:
- 1200×630px
- Dark forest green background
- ApnaTree.in wordmark (large, Cormorant-style font)
- Tagline: "Rent a Kesar Mango Tree from the Gir Forest"
- Small: a mango illustration (use text/emoji or simple SVG path — no external image fetch in OG)
- Stats strip: "87 Trees Rented | 3 Annual Visits | 100% Harvest Delivered"

**File: `src/app/(marketing)/trees/[tier]/opengraph-image.tsx`**

Per-tier OG images:
- Gold gradient background for LARGE, green gradient for MEDIUM, warm cream for SMALL
- Tier name, yield range, pre-booking price, CTA: "Reserve from ₹X"

---

### STEP 4.5 — Per-Route Loading, Error, Not-Found

For EVERY route in `(marketing)`, `(dashboard)`, and `(admin)`, create the three companion files. Instructions for each:

**`loading.tsx` rules:**
- Must be a Skeleton that mirrors the EXACT layout of the page
- Use shadcn `<Skeleton>` component
- Same number of columns, same approximate heights
- No text "Loading..." anywhere — skeletons communicate loading state visually
- Add `animate-pulse` to all skeleton elements

**`error.tsx` rules:**
- Must be `"use client"` (Next.js requirement)
- Props: `{ error: Error & { digest?: string }, reset: () => void }`
- Show: friendly message in Cormorant style ("Something went wrong in the grove.")
- Show error digest for debugging: `Error ref: {error.digest}`
- "Try Again" button calls `reset()`
- "Return to Home" link
- `useEffect(() => console.error(error), [error])`

**`not-found.tsx` rules:**
- RSC (no `"use client"` needed)
- Premium 404 design: large "404" in Cormorant, message "This tree doesn't exist... yet."
- Link back to home and to `/trees`
- Use a tree emoji or simple SVG illustration

Priority order for creating companions — build in this sequence:
1. `/dashboard` (most user-facing)
2. `/dashboard/media`
3. `/dashboard/visits`
4. `/dashboard/harvest`
5. `/trees/[tier]`
6. `/trees`
7. `/` (homepage — loading.tsx is the skeleton above-the-fold)
8. All remaining marketing pages
9. Admin pages

---

### STEP 4.6 — Core Web Vitals Audit Checklist

After Phase 4 is complete, perform this audit and fix any failures before committing:

**LCP (Largest Contentful Paint) — Target: < 1.5s**
- [ ] Hero image/video has `priority={true}` and `loading="eager"` on the `<Image>` fallback
- [ ] Hero text is server-rendered (RSC) — no hydration delay
- [ ] Fonts preloaded: add `<link rel="preload" as="font">` in root layout for Cormorant and DM Sans
- [ ] No render-blocking scripts in `<head>`

**CLS (Cumulative Layout Shift) — Target: < 0.05**
- [ ] Every `<Image>` has explicit `width` and `height` — no layout shift from images loading
- [ ] Fonts: `display: swap` prevents layout shift from font load
- [ ] No dynamic content that changes container heights after render (skeleton heights must match content)
- [ ] No ads or embeds that inject unknown height

**INP (Interaction to Next Paint) — Target: < 100ms**
- [ ] No heavy synchronous JS on the main thread
- [ ] All event handlers are lightweight (no expensive computation in onClick)
- [ ] Stripe Elements loaded asynchronously — not in initial bundle
- [ ] `useTransition` used for all server action calls (keeps UI responsive during pending state)

**TTFB (Time to First Byte) — Target: < 300ms**
- [ ] All static marketing pages use ISR (not SSR)
- [ ] Vercel Edge Network deployment (automatic on Vercel)
- [ ] Prisma connection pooling enabled

---

### STEP 4.7 — Bundle Analysis & Optimization

After Phase 4, run:
```bash
npm run build
npx @next/bundle-analyzer
```

Rules:
- Total First Load JS per page: target < 80kb
- If any page exceeds 80kb: identify the largest module and dynamic import it
- Framer Motion must NOT appear in any RSC bundle
- Stripe must NOT appear in any non-checkout page bundle
- Check for duplicate dependencies (e.g., two versions of zod)

---

### STEP 4.8 — About, Trust, FAQ, How-It-Works Pages

**`/about/page.tsx`** (RSC + ISR `revalidate: 86400`)

Sections:
1. Hero: full-width image from `MEDIA.farm.gallery[0]` with overlay text
2. Our Story: founder narrative (Cormorant pull-quote style), 2-column text + image
3. The Farm: stats (acreage, trees, farmhands) + gallery grid from `MEDIA.farm.gallery`
4. Our Team: cards from `MEDIA.team` if available
5. Certifications: `MEDIA.trust` images in horizontal strip
6. Map embed: static image map of Gir Forest region (do NOT embed Google Maps iframe — use a static image for performance)

**`/how-it-works/page.tsx`** (RSC + ISR)

4 major sections with expanded copy:
1. Pre-booking explained (with Phase 1/Phase 2 payment timeline visual)
2. Tree assignment process
3. Media updates explained (screenshot mockup of media dashboard)
4. Harvest & shipping explained

**`/trust/page.tsx`** (RSC + ISR)

Sections:
1. "The ApnaTree Guarantee" (4 guarantee cards with icons)
2. "Universal Laws of the Grove" (5 laws in elegant numbered list)
3. Legal structure section with certificate images
4. Payment security: Stripe PCI-DSS badge + explanation
5. FAQ teaser: top 5 questions with "See All FAQs" CTA

**`/faq/page.tsx`** (RSC + ISR)

- shadcn `<Accordion>` component
- 6 category groups: Payment & Pre-booking / Tree Assignment / Media Updates / Farm Visits / Harvest & Shipping / Legal & Cancellation
- Each group: 4–5 detailed questions
- Schema.org FAQ structured data injected via `<script type="application/ld+json">` for rich Google results

**`/contact/page.tsx`** (RSC shell + client form)

- Contact form (react-hook-form + zod)
- Server Action: saves to DB table `ContactSubmission` (add to Prisma schema) + sends email to `support@apnatree.in` via Resend
- WhatsApp link: `https://wa.me/91XXXXXXXXXX` (configured via env var)
- Farm address with copy-to-clipboard button

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 5 — FINAL CODE QUALITY DIRECTIVES
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These directives apply to every line written in Phases 2, 3, and 4.

```
QUALITY DIRECTIVE 1 — ZERO CONSOLE LOGS IN PRODUCTION
Remove all console.log. Use console.error only in catch blocks.
For development debugging: use a conditional:
if (process.env.NODE_ENV === "development") console.log(...)

QUALITY DIRECTIVE 2 — NO MAGIC STRINGS
Every enum value, status string, and configuration key must be
referenced from a typed constant or Prisma enum. No inline strings
like "ACTIVE" — always ContractStatus.ACTIVE or the Prisma-generated type.

QUALITY DIRECTIVE 3 — ERROR BOUNDARIES AT EVERY ASYNC BOUNDARY
Every await call in a Server Action is wrapped in try/catch.
Every async Server Component uses error.tsx for the route.
Webhook handler never throws — always returns HTTP 200 to Stripe.

QUALITY DIRECTIVE 4 — ACCESSIBILITY IS NOT OPTIONAL
- All interactive elements: aria-label or visible text label
- Form fields: associated <label> with htmlFor
- Images: descriptive alt text (not "image" or file names)
- Modals/dialogs: use shadcn Dialog which handles focus trap and aria
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation: Tab order logical, all clickable items reachable

QUALITY DIRECTIVE 5 — MOBILE PERFORMANCE IS PRIORITY ZERO
Verify at 375px viewport before any other breakpoint.
Touch targets minimum 44×44px (buttons, links, form controls).
No horizontal scroll at any mobile viewport width.
Video autplay disabled on mobile — show static image instead.
Reduce animation duration by 40% on mobile (use CSS media query,
not JavaScript: @media (prefers-reduced-motion: reduce)).

QUALITY DIRECTIVE 6 — SECURITY CHECKLIST
- Every Server Action verifies auth() at the top
- Every DB query scoped to session.user.id
- Stripe webhook verifies constructEvent signature
- UploadThing middleware verifies session + role
- No user-controlled data injected into Prisma `where` without Zod validation first
- No sensitive data (Stripe keys, DB URLs) ever in client bundles
- Content Security Policy headers in next.config.ts:
  headers: [{ key: "X-Frame-Options", value: "DENY" }]

QUALITY DIRECTIVE 7 — GIT COMMIT CADENCE
After each major step completes and passes basic smoke test:
  git add .
  git commit -m "feat(phase-N): [descriptive message] | apnatree.in"
  git push origin main
Vercel auto-deploys on push. After each phase completion, verify
deployment on https://apnatree-in.vercel.app before proceeding.

QUALITY DIRECTIVE 8 — PRISMA MIGRATIONS
Every schema change: npx prisma migrate dev --name [descriptive-name]
Never edit the DB directly. Never use prisma db push in production.
After migration, always: npx prisma generate

QUALITY DIRECTIVE 9 — NO LAYOUT THRASH
Never read and write DOM properties in the same synchronous block.
For animations that need DOM measurement, use useLayoutEffect
inside a "use client" component, never in RSCs.

QUALITY DIRECTIVE 10 — TURBOPACK COMPATIBLE
Next.js 15 uses Turbopack for dev by default.
Do not use any webpack-only plugins or loaders.
Do not use require() in any component files — ES modules only.
CSS: do not use @import in Tailwind files — use @layer instead.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 6 — EXECUTION ORDER SUMMARY
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Execute in this EXACT order. Do not parallelize. Each step depends on the previous.

```
PRE-PHASE: Install packages, run prisma generate
           ↓
PHASE 2:
  2.1 → src/lib/stripe.ts + src/lib/stripe-helpers.ts
  2.2 → src/actions/booking.ts (createPreBookingSession)
  2.3 → src/actions/booking.ts (createAnnualRentSession + assignTreeAndTriggerRent)
  2.4 → src/app/api/webhooks/stripe/route.ts
  2.5 → BookingForm UI components (TierSelector, ContractDurationSelector, PricingBreakdown, BookingForm)
  2.6 → Wire tier detail page (/trees/[tier]) with booking form
  2.7 → Booking success page
  2.8 → git commit + push → verify Vercel deploy
           ↓
PHASE 3:
  3.1 → src/lib/uploadthing.ts + API route
  3.2 → src/lib/blur-placeholder.ts + Prisma migration (add blurDataURL)
  3.3 → Admin MediaUploadForm + src/actions/media.ts
  3.4 → User MediaGallery + Lightbox + Filters (/dashboard/media)
  3.5 → VisitScheduler + src/actions/visits.ts (/dashboard/visits)
  3.6 → HarvestTimeline + ShippingPaymentCard + src/actions/harvest.ts (/dashboard/harvest)
  3.7 → Dashboard overview page (contract cards, quick stats)
  3.8 → Dashboard payments history page
  3.9 → git commit + push → verify Vercel deploy
           ↓
PHASE 4:
  4.1 → Homepage all sections (HeroSection, TrustBadges, HowItWorks, TreeTiers, Stats, Gallery, Testimonials, Newsletter)
  4.2 → Tree listing + tree detail pages (ISR)
  4.3 → Email templates (all 5) + src/lib/email.ts
  4.4 → Wire all email sends in webhook handler and server actions
  4.5 → SEO: sitemap.ts, robots.ts, opengraph-image.tsx (root + per-tier)
  4.6 → Per-route loading.tsx, error.tsx, not-found.tsx (all routes, priority order)
  4.7 → About, Trust, FAQ, How It Works, Contact pages
  4.8 → Bundle analysis + Core Web Vitals audit + fixes
  4.9 → Final git commit + push → npm run build locally → verify 0 errors
  4.10 → npx vercel --prod → production Vercel deploy
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 7 — ENVIRONMENT VARIABLES REQUIRED FOR PHASE 2+
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Confirm these are set in both `.env.local` AND Vercel dashboard before Phase 2 begins:

```bash
# Stripe (use test keys for dev, live keys only in production)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # From: stripe listen --forward-to localhost:3000/api/webhooks/stripe

# UploadThing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...

# Resend (email)
RESEND_API_KEY=re_...
FROM_EMAIL=hello@apnatree.in

# App URL
NEXT_PUBLIC_APP_URL=https://apnatree-in.vercel.app  # or http://localhost:3000 for dev

# Already set from Phase 1 (verify):
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

For local webhook testing during Phase 2 development:
```bash
# Install Stripe CLI and run:
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the whsec_ key it gives you → STRIPE_WEBHOOK_SECRET in .env.local
```

---

*END OF CURSOR EXECUTION PROMPT — PHASES 2, 3, AND 4*
*apnatree.in | Performance Edition | React 19 + Next.js 15 + Edge Architecture*
*Every directive is final and authoritative. Execute sequentially. Ship premium.*
```
