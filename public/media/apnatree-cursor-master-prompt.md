# 🌳 APNATREE.IN — ULTIMATE CURSOR MASTER PROMPT
### The Complete Autonomous Build Specification for a World-Class Agri-Tech Marketplace

---

> **HOW TO USE:** Copy this entire document and paste it as your `.cursorrules` file in the root of your Next.js project. Additionally, paste the "MASTER SYSTEM PROMPT" section into Cursor's system prompt/AI instructions field. This document is self-contained and authoritative — Cursor must treat every instruction herein as inviolable law.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 0 — `.cursorrules` CONFIGURATION BLOCK
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
# .cursorrules — ApnaTree.in Platform
# Version: 1.0.0 | Stack: Next.js 14 App Router + Prisma + PostgreSQL + Stripe

## IDENTITY
You are a Senior Full-Stack Engineer, UI/UX Director, and System Architect
with 15+ years of experience building premium SaaS, e-commerce, and
marketplace platforms. You write production-grade code only. You do not
write placeholder code. You do not skip logic. You do not hallucinate
libraries or APIs that do not exist.

## NON-NEGOTIABLE RULES
1. Every component is mobile-first. Test mentally at 375px before 1440px.
2. Never use inline styles. Always use Tailwind utility classes.
3. All data-fetching uses React Server Components unless client interaction is required.
4. All forms use react-hook-form + zod for validation. No exceptions.
5. All database access goes through Prisma. No raw SQL unless absolutely necessary.
6. All sensitive routes are protected by NextAuth.js middleware.
7. Every page has loading.tsx, error.tsx, and not-found.tsx siblings.
8. Never hallucinate npm packages. Only use: next, react, prisma, @prisma/client,
   next-auth, @auth/prisma-adapter, tailwindcss, shadcn/ui, framer-motion,
   stripe, @stripe/stripe-js, react-hook-form, @hookform/resolvers, zod,
   uploadthing (for media), date-fns, lucide-react, clsx, tailwind-merge,
   resend (for emails), @vercel/og (for OG images).
9. Use server actions for all form mutations. No separate API routes for forms.
10. Every image uses next/image with explicit width, height, and alt text.
11. All local project images and videos live in /public/media/. Reference them
    as /media/[filename]. Cursor must scan /public/media/ at build time and
    map files to appropriate sections as specified in this document.
12. Build modular, atomic components. Maximum component file size: 200 lines.
    If longer, split into sub-components.
13. All monetary values stored in paise (smallest INR unit) in the database.
    Display layer converts to ₹ with formatting.
14. TypeScript strict mode is ON. No `any` types. No `@ts-ignore`.
15. Environment variables must be validated at startup using a /lib/env.ts
    module with zod schema. App must fail fast if required vars are missing.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 1 — MASTER SYSTEM PROMPT (Paste into Cursor AI Instructions)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You are building **apnatree.in** — a world-class, premium agri-tech marketplace that allows customers globally to **rent authentic Kesar mango trees** directly from the legendary Gir Forest, Gujarat, India. This is not a generic e-commerce site. This is an **emotional luxury experience** — comparable in premium feel to how a fine whisky cask ownership program or a vineyard share program presents itself. Every pixel, every word, every interaction must reinforce three pillars:

1. **Exclusivity** — "You own a piece of Gir Forest."
2. **Trust** — "We are transparent, legal, and rooted in tradition."
3. **Connection** — "Watch your tree grow. Taste your own harvest."

The platform handles **high traffic**, a **pre-booking queue system**, and a **phased payment model**. It is built for users in India (₹ INR) and internationally (USD/GBP/EUR via Stripe).

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 2 — PROJECT INITIALIZATION & FOLDER STRUCTURE
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 2.1 Bootstrap Command
```bash
npx create-next-app@latest apnatree --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd apnatree
npx shadcn@latest init
# Select: Default style, Zinc base color, CSS variables YES
npx shadcn@latest add button card dialog sheet tabs badge avatar
npx shadcn@latest add form input label select textarea toast progress
npx shadcn@latest add separator skeleton table calendar popover
npm install prisma @prisma/client next-auth @auth/prisma-adapter
npm install stripe @stripe/stripe-js framer-motion
npm install react-hook-form @hookform/resolvers zod
npm install uploadthing @uploadthing/react
npm install resend date-fns lucide-react clsx tailwind-merge
npm install -D @types/node
npx prisma init --datasource-provider postgresql
```

### 2.2 Required Folder Structure
```
apnatree/
├── .cursorrules                    ← This file
├── public/
│   └── media/                      ← ALL local images & videos go here
│       ├── hero/                   ← Hero section visuals
│       ├── trees/                  ← Tree tier product images (small/medium/large)
│       ├── farm/                   ← Farm landscape, Gir forest ambience
│       ├── harvest/                ← Mango harvest, packaging, shipping
│       ├── team/                   ← Team/founder photos
│       ├── trust/                  ← Certificates, documents, badges
│       └── videos/                 ← .mp4 background/promo videos
├── src/
│   ├── app/
│   │   ├── (marketing)/            ← Public pages layout group
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx            ← Homepage /
│   │   │   ├── about/page.tsx
│   │   │   ├── how-it-works/page.tsx
│   │   │   ├── trees/
│   │   │   │   ├── page.tsx        ← All tree tiers listing
│   │   │   │   └── [tier]/page.tsx ← Individual tier detail (small/medium/large)
│   │   │   ├── pricing/page.tsx
│   │   │   ├── farm-visits/page.tsx
│   │   │   ├── harvest/page.tsx
│   │   │   ├── trust/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── verify/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx          ← Protected layout with sidebar
│   │   │   └── dashboard/
│   │   │       ├── page.tsx        ← Overview / My Trees
│   │   │       ├── media/page.tsx  ← Media updates feed
│   │   │       ├── visits/page.tsx ← Farm visit scheduling
│   │   │       ├── harvest/page.tsx ← Harvest tracking & shipping
│   │   │       ├── contracts/page.tsx
│   │   │       ├── payments/page.tsx
│   │   │       └── profile/page.tsx
│   │   ├── (admin)/
│   │   │   ├── layout.tsx          ← Admin-only protected layout
│   │   │   └── admin/
│   │   │       ├── page.tsx        ← Admin overview
│   │   │       ├── trees/page.tsx  ← Manage tree inventory
│   │   │       ├── contracts/page.tsx
│   │   │       ├── media-upload/page.tsx ← Upload bi-weekly updates
│   │   │       ├── visits/page.tsx
│   │   │       └── users/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── webhooks/stripe/route.ts
│   │   │   └── uploadthing/route.ts
│   │   ├── layout.tsx              ← Root layout
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                     ← shadcn auto-generated
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── marketing/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── TreeTierCard.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── TrustBadges.tsx
│   │   │   ├── FarmGallery.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── ProcessTimeline.tsx
│   │   │   └── NewsletterSignup.tsx
│   │   ├── dashboard/
│   │   │   ├── TreeCard.tsx
│   │   │   ├── MediaUpdateCard.tsx
│   │   │   ├── VisitScheduler.tsx
│   │   │   ├── HarvestTracker.tsx
│   │   │   ├── ContractSummary.tsx
│   │   │   └── ShippingPayment.tsx
│   │   ├── booking/
│   │   │   ├── PreBookingForm.tsx
│   │   │   ├── ContractSelector.tsx
│   │   │   ├── TierSelector.tsx
│   │   │   └── PaymentSummary.tsx
│   │   └── shared/
│   │       ├── AnimatedCounter.tsx
│   │       ├── ScrollReveal.tsx
│   │       ├── VideoBackground.tsx
│   │       ├── MediaGrid.tsx
│   │       └── PageHeader.tsx
│   ├── lib/
│   │   ├── prisma.ts               ← Prisma singleton
│   │   ├── env.ts                  ← Zod env validation
│   │   ├── auth.ts                 ← NextAuth config
│   │   ├── stripe.ts               ← Stripe instance
│   │   ├── pricing.ts              ← Pricing engine
│   │   ├── media-map.ts            ← Auto-maps /public/media/ files
│   │   └── utils.ts                ← cn(), formatINR(), formatDate()
│   ├── actions/
│   │   ├── booking.ts              ← Pre-booking server actions
│   │   ├── contracts.ts
│   │   ├── visits.ts
│   │   ├── media.ts
│   │   ├── harvest.ts
│   │   └── payments.ts
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   └── useScrollReveal.ts
│   └── types/
│       └── index.ts                ← All shared TypeScript types
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── middleware.ts                   ← Route protection
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 3 — DATABASE SCHEMA (Prisma)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**File: `prisma/schema.prisma`** — Generate this exactly:

```prisma
// prisma/schema.prisma
// ApnaTree.in — Complete Data Model

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────

enum UserRole {
  CUSTOMER
  ADMIN
  FIELD_AGENT
}

enum TreeTier {
  SMALL    // 3-year-old tree
  MEDIUM   // 5-year-old tree
  LARGE    // 8-year-old tree
}

enum ContractDuration {
  ONE_YEAR
  TWO_YEAR
  FIVE_YEAR
}

enum ContractStatus {
  PREBOOKING_PENDING     // Phase 1 payment initiated
  PREBOOKING_PAID        // Phase 1 confirmed
  AWAITING_CONFIRMATION  // Admin reviewing allocation
  ACTIVE                 // Phase 2 paid, tree assigned
  HARVESTING             // Current season harvest in progress
  COMPLETED              // Contract term ended
  CANCELLED
}

enum MediaType {
  PHOTO
  VIDEO
}

enum VisitStatus {
  REQUESTED
  CONFIRMED
  COMPLETED
  CANCELLED
}

enum HarvestStatus {
  PENDING
  IN_PROGRESS
  PACKAGED
  SHIPPED
  DELIVERED
}

enum ShippingPaymentStatus {
  PENDING
  PAID
  FAILED
}

// ─────────────────────────────────────────
// USER
// ─────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  phone         String?
  address       String?
  city          String?
  state         String?
  country       String    @default("IN")
  pincode       String?
  role          UserRole  @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  contracts     Contract[]
  farmVisits    FarmVisit[]
  harvestOrders HarvestOrder[]

  @@map("users")
}

// NextAuth required models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ─────────────────────────────────────────
// TREE INVENTORY
// ─────────────────────────────────────────

model Tree {
  id              String   @id @default(cuid())
  treeCode        String   @unique  // e.g. "GIR-K-0042"
  tier            TreeTier
  ageYears        Int      // actual age in years
  locationLat     Float?
  locationLng     Float?
  farmSector      String?  // e.g. "Block A, Row 3"
  isAvailable     Boolean  @default(true)
  totalYieldKgAvg Float?   // average annual yield in kg
  profileImageUrl String?
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  contracts     Contract[]
  mediaUpdates  MediaUpdate[]

  @@map("trees")
}

// ─────────────────────────────────────────
// CONTRACT (Core Business Entity)
// ─────────────────────────────────────────

model Contract {
  id               String           @id @default(cuid())
  contractNumber   String           @unique @default(cuid()) // Human-readable: AT-2024-00042
  userId           String
  treeId           String?          // Assigned after Phase 2

  // Contract terms
  tier             TreeTier
  duration         ContractDuration
  status           ContractStatus   @default(PREBOOKING_PENDING)
  startDate        DateTime?
  endDate          DateTime?

  // Pricing (stored in paise / cents)
  prebookingAmountPaise  Int        // Phase 1 lock-in
  yearlyRentPaise        Int        // Annual rent Phase 2
  totalContractValuePaise Int       // Full contract value

  // Phase 1 — Pre-booking payment
  prebookingStripeSessionId  String?
  prebookingPaidAt           DateTime?
  prebookingStripePaymentId  String?

  // Phase 2 — Annual rent payments
  currency         String    @default("INR")
  
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  // Relations
  user             User            @relation(fields: [userId], references: [id])
  tree             Tree?           @relation(fields: [treeId], references: [id])
  mediaUpdates     MediaUpdate[]
  farmVisits       FarmVisit[]
  harvestOrders    HarvestOrder[]
  rentPayments     RentPayment[]

  @@map("contracts")
}

model RentPayment {
  id                String    @id @default(cuid())
  contractId        String
  yearNumber        Int       // 1, 2, 3, etc.
  amountPaise       Int
  stripeSessionId   String?
  stripePaymentId   String?
  paidAt            DateTime?
  dueDate           DateTime
  createdAt         DateTime  @default(now())

  contract          Contract  @relation(fields: [contractId], references: [id])

  @@map("rent_payments")
}

// ─────────────────────────────────────────
// MEDIA UPDATES (Bi-weekly from field agents)
// ─────────────────────────────────────────

model MediaUpdate {
  id          String    @id @default(cuid())
  contractId  String
  treeId      String
  uploadedBy  String    // Field agent user ID or name
  mediaType   MediaType
  fileUrl     String    // UploadThing URL
  thumbnailUrl String?
  caption     String?
  takenAt     DateTime  // When photo/video was taken at farm
  isViewed    Boolean   @default(false)
  createdAt   DateTime  @default(now())

  // Relations
  contract    Contract  @relation(fields: [contractId], references: [id])
  tree        Tree      @relation(fields: [treeId], references: [id])

  @@map("media_updates")
}

// ─────────────────────────────────────────
// FARM VISITS
// ─────────────────────────────────────────

model FarmVisit {
  id              String      @id @default(cuid())
  contractId      String
  userId          String
  visitDate       DateTime
  numberOfVisitors Int        @default(1)
  status          VisitStatus @default(REQUESTED)
  notes           String?
  confirmationCode String?    @unique
  adminNotes      String?
  usedFreeSlot    Boolean     @default(true) // First 3 per year are free
  visitYear       Int         // Which contract year this visit belongs to
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  // Relations
  contract        Contract    @relation(fields: [contractId], references: [id])
  user            User        @relation(fields: [userId], references: [id])

  @@map("farm_visits")
}

// ─────────────────────────────────────────
// HARVEST & SHIPPING
// ─────────────────────────────────────────

model HarvestOrder {
  id                    String               @id @default(cuid())
  contractId            String
  userId                String
  season                String               // e.g. "Summer 2025"
  estimatedYieldKg      Float?
  actualYieldKg         Float?
  status                HarvestStatus        @default(PENDING)

  // Shipping details
  shippingAddressLine1  String?
  shippingAddressLine2  String?
  shippingCity          String?
  shippingState         String?
  shippingPincode       String?
  shippingCountry       String               @default("IN")
  
  // Dynamic shipping cost (calculated at dispatch)
  shippingCostPaise     Int?
  shippingPaymentStatus ShippingPaymentStatus @default(PENDING)
  shippingStripeSessionId String?
  shippingPaidAt        DateTime?

  // Tracking
  trackingNumber        String?
  courierPartner        String?
  estimatedDelivery     DateTime?
  deliveredAt           DateTime?

  createdAt             DateTime             @default(now())
  updatedAt             DateTime             @updatedAt

  // Relations
  contract              Contract             @relation(fields: [contractId], references: [id])
  user                  User                 @relation(fields: [userId], references: [id])

  @@map("harvest_orders")
}

// ─────────────────────────────────────────
// WAITLIST (Pre-launch / high-demand overflow)
// ─────────────────────────────────────────

model Waitlist {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  phone     String?
  tier      TreeTier?
  position  Int      @default(autoincrement())
  notified  Boolean  @default(false)
  createdAt DateTime @default(now())

  @@map("waitlist")
}

// ─────────────────────────────────────────
// SITE CONFIG (Admin-editable settings)
// ─────────────────────────────────────────

model SiteConfig {
  id                    String   @id @default(cuid())
  key                   String   @unique
  value                 String   @db.Text
  updatedAt             DateTime @updatedAt

  @@map("site_config")
}
```

### 3.1 Seed File
**File: `prisma/seed.ts`** — Populate with:
- 50 sample trees (spread across SMALL/MEDIUM/LARGE tiers, treeCode format: "GIR-K-XXXX")
- Default SiteConfig entries: `prebooking_open = "true"`, `total_trees_available = "150"`, `trees_rented = "87"`
- One admin user account

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 4 — PRICING ENGINE
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**File: `src/lib/pricing.ts`** — Implement this exact logic:

```typescript
// src/lib/pricing.ts

import { TreeTier, ContractDuration } from "@prisma/client";

// All values in PAISE (multiply ₹ by 100)
export const PREBOOKING_AMOUNTS = {
  SMALL:  100_000,   // ₹1,000
  MEDIUM: 250_000,   // ₹2,500
  LARGE:  500_000,   // ₹5,000
} as const;

export const YEARLY_RENT = {
  SMALL:  1_000_000, // ₹10,000/year
  MEDIUM: 1_500_000, // ₹15,000/year
  LARGE:  2_200_000, // ₹22,000/year
} as const;

export const CONTRACT_YEARS = {
  ONE_YEAR:  1,
  TWO_YEAR:  2,
  FIVE_YEAR: 5,
} as const;

// Multi-year discount rates
export const MULTI_YEAR_DISCOUNT = {
  ONE_YEAR:  0,      // No discount
  TWO_YEAR:  0.05,   // 5% discount on total
  FIVE_YEAR: 0.12,   // 12% discount — "Mega Contract"
} as const;

export interface PricingBreakdown {
  tier: TreeTier;
  duration: ContractDuration;
  prebookingAmountPaise: number;
  yearlyRentPaise: number;
  years: number;
  baseContractValuePaise: number;
  discountRate: number;
  discountAmountPaise: number;
  totalContractValuePaise: number;
  // Display values
  prebookingDisplay: string;
  yearlyRentDisplay: string;
  totalDisplay: string;
  discountDisplay: string;
}

export function calculatePricing(
  tier: TreeTier,
  duration: ContractDuration
): PricingBreakdown {
  const prebookingAmountPaise = PREBOOKING_AMOUNTS[tier];
  const yearlyRentPaise = YEARLY_RENT[tier];
  const years = CONTRACT_YEARS[duration];
  const discountRate = MULTI_YEAR_DISCOUNT[duration];
  const baseContractValuePaise = yearlyRentPaise * years;
  const discountAmountPaise = Math.floor(baseContractValuePaise * discountRate);
  const totalContractValuePaise = baseContractValuePaise - discountAmountPaise;

  return {
    tier,
    duration,
    prebookingAmountPaise,
    yearlyRentPaise,
    years,
    baseContractValuePaise,
    discountRate,
    discountAmountPaise,
    totalContractValuePaise,
    prebookingDisplay: formatINR(prebookingAmountPaise),
    yearlyRentDisplay: formatINR(yearlyRentPaise),
    totalDisplay: formatINR(totalContractValuePaise),
    discountDisplay: formatINR(discountAmountPaise),
  };
}

export function formatINR(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function getTierLabel(tier: TreeTier): string {
  const labels = {
    SMALL: "Small (3-Year Tree)",
    MEDIUM: "Medium (5-Year Tree)",
    LARGE: "Large (8-Year Tree)",
  };
  return labels[tier];
}

export function getContractLabel(duration: ContractDuration): string {
  const labels = {
    ONE_YEAR: "1-Year Contract",
    TWO_YEAR: "2-Year Contract",
    FIVE_YEAR: "5-Year Mega Contract",
  };
  return labels[duration];
}

export function getExpectedYieldRange(tier: TreeTier): string {
  const yields = {
    SMALL: "15–25 kg",
    MEDIUM: "30–50 kg",
    LARGE: "60–100 kg",
  };
  return yields[tier];
}

// Validate free farm visits remaining
export function getRemainingFreeVisits(
  usedVisitsThisYear: number
): number {
  return Math.max(0, 3 - usedVisitsThisYear);
}
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 5 — ENVIRONMENT VARIABLES SCHEMA
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**File: `src/lib/env.ts`**

```typescript
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  UPLOADTHING_SECRET: z.string(),
  UPLOADTHING_APP_ID: z.string(),
  RESEND_API_KEY: z.string(),
  FROM_EMAIL: z.string().email().default("hello@apnatree.in"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
});

export const env = envSchema.parse(process.env);
```

**File: `.env.example`** — Create with all keys listed, values as empty strings or descriptive placeholders.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 6 — DESIGN SYSTEM & THEME
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 6.1 Color Palette (Add to `globals.css`)
```css
:root {
  /* Brand Palette — "Gir Gold & Forest Deep" */
  --brand-gold: #C8972A;          /* Kesar mango gold */
  --brand-gold-light: #F0C060;    /* Ripe mango */
  --brand-gold-dark: #8B6914;     /* Aged gold */
  --brand-forest: #1A2E1A;        /* Deep Gir forest green */
  --brand-forest-mid: #2D4A2D;    /* Forest mid */
  --brand-forest-light: #4A7C59;  /* Leaf green */
  --brand-earth: #8B6347;         /* Gir soil */
  --brand-cream: #FDF6E9;         /* Aged parchment */
  --brand-cream-dark: #F5E6C8;    /* Warm off-white */
  --brand-charcoal: #1C1C1C;      /* Premium black */
  
  /* Semantic */
  --background: var(--brand-cream);
  --foreground: var(--brand-charcoal);
  --primary: var(--brand-gold);
  --primary-foreground: var(--brand-charcoal);
  --accent: var(--brand-forest);
  --accent-foreground: var(--brand-cream);
  
  /* Gradients */
  --gradient-hero: linear-gradient(
    135deg, 
    var(--brand-forest) 0%, 
    var(--brand-forest-mid) 40%, 
    #3D6B3A 70%, 
    var(--brand-forest) 100%
  );
  --gradient-gold: linear-gradient(
    135deg,
    var(--brand-gold-dark) 0%,
    var(--brand-gold) 50%,
    var(--brand-gold-light) 100%
  );
  --gradient-premium: linear-gradient(
    180deg,
    rgba(26,46,26,0) 0%,
    rgba(26,46,26,0.8) 60%,
    rgba(26,46,26,0.97) 100%
  );
}
```

### 6.2 Typography (Add Google Fonts to `layout.tsx`)
```typescript
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

// Elegant serif for headings — conveys heritage and premium
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Clean humanist sans for body — conveys clarity and trust  
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
```

CSS Variables:
```css
--font-heading: 'Cormorant Garamond', Georgia, serif;
--font-body: 'DM Sans', system-ui, sans-serif;
```

Usage rule:
- All `h1`, `h2`, `h3`: `font-[family-name:var(--font-heading)]` — Cormorant
- All body text, labels, buttons: `font-[family-name:var(--font-body)]` — DM Sans
- Hero display text: Cormorant at `text-6xl lg:text-8xl font-light tracking-tight`

### 6.3 Framer Motion Presets
**File: `src/lib/animations.ts`**

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.12 },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const cardHover = {
  whileHover: {
    y: -6,
    boxShadow: "0 24px 48px rgba(200, 151, 42, 0.18)",
    transition: { duration: 0.3 },
  },
};

export const buttonPress = {
  whileTap: { scale: 0.97 },
  whileHover: { scale: 1.02 },
  transition: { duration: 0.15 },
};
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 7 — MEDIA MAPPING STRATEGY
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**File: `src/lib/media-map.ts`**

Cursor must scan the `/public/media/` directory and create a mapping module:

```typescript
// src/lib/media-map.ts
// AUTO-GENERATED — Cursor scans /public/media/ and maps all files

import path from "path";
import fs from "fs";

// At build time, scan all folders and create lookup objects
// This is used ONLY at server-side/build time

export const MEDIA = {
  hero: {
    // Files from /public/media/hero/
    // Usage: <VideoBackground src={MEDIA.hero.mainVideo} />
    // Map first .mp4 found → mainVideo
    // Map first .jpg/.webp found → fallbackImage
    // Map second image → overlay
    mainVideo:     "/media/videos/[FIRST_MP4_IN_VIDEOS]",
    fallbackImage: "/media/hero/[FIRST_JPG_IN_HERO]",
  },
  trees: {
    // Map images alphabetically / by filename pattern
    // If file contains "small" → small tier
    // If file contains "medium" → medium tier
    // If file contains "large" → large tier
    small:  ["/media/trees/[FILES_CONTAINING_small_OR_FIRST_THIRD]"],
    medium: ["/media/trees/[FILES_CONTAINING_medium_OR_SECOND_THIRD]"],
    large:  ["/media/trees/[FILES_CONTAINING_large_OR_LAST_THIRD]"],
  },
  farm: {
    // All files in /public/media/farm/
    gallery: ["all paths as array"],
  },
  harvest: {
    gallery: ["all paths as array"],
  },
  team:  ["all paths as array"],
  trust: ["all paths as array"],
};

/*
 * CURSOR INSTRUCTION:
 * 1. Use Node.js fs.readdirSync to scan each subfolder of /public/media/
 * 2. Build the MEDIA object with actual filenames found
 * 3. For videos folder: separate .mp4 files
 * 4. For images: .jpg, .jpeg, .png, .webp
 * 5. Export the fully resolved public paths (no /public prefix, just /media/...)
 * 6. This module is imported by marketing components and server components
 *    to dynamically place real project assets throughout the site
 */
```

**Usage rule across site:**
- Hero section: Use `MEDIA.hero.mainVideo` for background video, `MEDIA.hero.fallbackImage` for static fallback
- Tree tier cards: Use `MEDIA.trees.small[0]`, `MEDIA.trees.medium[0]`, `MEDIA.trees.large[0]`
- Farm gallery section: Map `MEDIA.farm.gallery` to masonry grid
- Harvest section: Map `MEDIA.harvest.gallery` to scroll-reveal strip
- About/Trust pages: Use `MEDIA.team` and `MEDIA.trust` arrays

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 8 — PAGE-BY-PAGE BUILD SPECIFICATIONS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 8.1 HOMEPAGE (`/`) — The Crown Jewel

**Sections in order (each a separate component):**

#### SECTION 1: `HeroSection.tsx`
- **Full-viewport (100svh)** dark overlay video/image hero
- Background: `<video autoPlay muted loop playsInline>` using `MEDIA.hero.mainVideo`; fallback to `MEDIA.hero.fallbackImage`
- Overlay: `var(--gradient-premium)` dark gradient from bottom
- Content (centered, bottom-anchored):
  - Eyebrow tag: `"🌿 Gir Forest, Gujarat — Since 2024"` — small caps, letter-spaced, gold
  - H1 (Cormorant, 72–96px light): `"Own a Kesar Mango Tree."` on one line, then `"Taste What You Grow."` on next line
  - Subheading (DM Sans): `"Rent an authentic Kesar mango tree from India's most prized grove. Receive bi-weekly farm updates, 3 annual visits, and 100% of your harvest — delivered to your door."`
  - TWO CTAs side by side:
    1. Primary gold button: `"Reserve Your Tree →"` → links to `/trees`
    2. Ghost button with play icon: `"Watch Our Story"` → opens video modal
  - Scroll indicator: animated chevron down, fades in after 2 seconds
- Stats strip pinned at bottom of hero (white on dark): `"87 Trees Rented | 150 Trees Available | 3 Free Annual Visits | 100% Harvest Delivered"`
- Framer Motion: Stagger all hero text elements with fadeInUp, 0.15s delay between each

#### SECTION 2: `TrustBadges.tsx`
- Light cream background
- 5 trust badges in a horizontal scrolling row (mobile) or flex row (desktop)
- Badges: "Gir Forest Certified", "100% Organic", "Legal Lease Agreement", "Stripe Secured Payments", "ISO Compliant Packaging"
- Use actual badge/seal images from `MEDIA.trust` if available, otherwise use Lucide icons + labels
- Subtle animation: each badge slides in from bottom on scroll enter

#### SECTION 3: `HowItWorksSection.tsx`
- Heading: `"From Pre-Booking to Your Doorstep"` — Cormorant, centered
- 4-step process with timeline connector line (desktop), stacked cards (mobile):
  1. **"Choose & Reserve"** — Select your tree tier & contract. Pay pre-booking fee (₹1,000–₹5,000). Non-refundable.
  2. **"We Confirm & Assign"** — Our team assigns your specific tree. You pay annual rent. Your legal agreement begins.
  3. **"Watch It Grow"** — Every 15 days, receive photos & videos of YOUR tree. Book 3 free farm visits/year.
  4. **"Harvest Comes Home"** — We pick, grade, pack, and ship 100% of your yield. Pay only shipping at delivery.
- Icon: use mango/tree emojis or custom SVG illustrations, gold-colored
- Image: place a horizontal `MEDIA.farm.gallery[0]` image behind the section with 15% opacity as texture

#### SECTION 4: `TreeTierSection.tsx`
- Heading: `"Find Your Perfect Tree"` — Cormorant
- 3 cards side by side (or stacked mobile):
  - **Small (3-Year)**: `MEDIA.trees.small[0]`, pre-book ₹1,000, rent ₹10,000/yr, yield 15–25kg
  - **Medium (5-Year)**: `MEDIA.trees.medium[0]`, pre-book ₹2,500, rent ₹15,000/yr, yield 30–50kg — add "Most Popular" badge
  - **Large (8-Year)**: `MEDIA.trees.large[0]`, pre-book ₹5,000, rent ₹22,000/yr, yield 60–100kg — add "Best Value" badge
- Each card: Image top, tier name, yield estimate, brief description, price, CTA button
- Card hover: `cardHover` animation (lift + gold shadow)

#### SECTION 5: `StatsCounter.tsx`
- Dark forest green background
- Animated counting numbers on scroll:
  - `87+` Trees Currently Rented
  - `150` Total Available Trees
  - `3` Annual Free Farm Visits
  - `100%` Harvest Delivered to Renter
  - `15` Days Between Photo Updates
- Use Framer Motion `useInView` to trigger count animation once

#### SECTION 6: `FarmGallery.tsx`
- Heading: `"Step Inside the Gir Forest"` — Cormorant
- Masonry grid layout using CSS columns: `columns-2 md:columns-3 lg:columns-4`
- Source all images from `MEDIA.farm.gallery`
- Each image has a hover overlay with a subtle gold tint and zoom
- "View Full Gallery" button links to `/about#gallery`

#### SECTION 7: `PricingTable.tsx`
- Heading: `"Transparent Pricing, No Surprises"` — Cormorant
- Tabbed interface: tabs for 1-Year / 2-Year / 5-Year (Mega)
- Table or card grid showing full pricing breakdown per tier and duration
- Highlight 5-year "Mega Contract" with a special gold border and "Save 12%" badge
- Below table: note about multi-year discount logic

#### SECTION 8: `TestimonialsSection.tsx`
- Cream background
- 3 testimonials in card carousel (auto-scroll, pause on hover)
- Each testimonial: quote (Cormorant italic), name, location, tree tier rented, star rating
- Seed with 5 realistic, emotionally resonant testimonials — e.g.:
  - `"When the field agent sent me the first video of MY tree in bloom, I literally cried. This is something no supermarket can ever give you." — Priya S., Mumbai`
  - `"The Kesar mangoes arrived at my doorstep in Dubai, perfectly packed. My family in India is jealous." — Rajesh M., Dubai`

#### SECTION 9: `NewsletterSignup.tsx`
- Gold gradient background
- Heading: `"Be First. The Queue is Growing."` — Cormorant
- Subheading: "Only 63 trees remain. Enter your email to lock your spot in line."
- Email input + "Join Waitlist" button
- Server action saves to `Waitlist` model
- On submit: confirmation message with queue position number

---

### 8.2 TREES LISTING PAGE (`/trees`)

- Page header with forest background image from `MEDIA.farm.gallery`
- Filter bar: All / Small / Medium / Large tabs
- Grid of TreeTierCard components (3 col desktop, 1 col mobile)
- Each card links to `/trees/[tier]`
- Live availability counter fetched from DB: "X trees available"
- Pre-booking Open/Closed badge (driven by `SiteConfig.prebooking_open`)

---

### 8.3 TREE DETAIL PAGE (`/trees/[tier]`)

- `tier` param = "small" | "medium" | "large" (map to Prisma enum)
- Hero image: `MEDIA.trees.[tier][0]`, full-width with overlay
- Detailed specs table:
  - Tree Age, Expected Yield, Contract Options, Pre-booking Fee, Annual Rent
- Contract duration selector (radio group: 1yr / 2yr / 5yr)
- Live pricing breakdown (recalculates on duration change) using `calculatePricing()`
- Payment summary card (sticky on desktop):
  - Phase 1 today: ₹X (pre-booking)
  - Phase 2 after confirmation: ₹Y/year
  - Contract total: ₹Z
- CTA: `"Reserve with ₹[prebooking_amount] →"` → initiates Stripe checkout (Phase 1)
- "What's Included" accordion section
- Image gallery of this tier's trees (all `MEDIA.trees.[tier]` images)

---

### 8.4 AUTH FLOW (`/login`, `/register`)

- Minimal, premium layout — use `MEDIA.farm.gallery[last]` as full-bleed left panel (50/50 split desktop, hidden mobile)
- Google OAuth button (primary)
- Email magic link (secondary)
- Post-login redirect: `/dashboard`
- Post-register redirect: `/register/complete` (collect phone, address, country)
- NextAuth with `@auth/prisma-adapter`

---

### 8.5 USER DASHBOARD (`/dashboard`)

**Layout: `DashboardSidebar.tsx`**
- Fixed left sidebar (desktop), bottom nav drawer (mobile)
- Nav items: Overview, My Trees, Media Updates, Farm Visits, Harvest, Payments, Profile
- User avatar + name at top of sidebar
- "New Update" badge on Media Updates if unread items exist

**Dashboard Overview Page (`/dashboard`):**
- Welcome banner: `"Welcome back, [Name]. Your Kesar trees are growing beautifully."`
- Active contract cards (TreeCard component):
  - Tree code, tier badge, contract status, days until harvest season
  - Progress bar: contract term progress
  - Quick action buttons: "View Updates", "Book Visit"
- Recent Media Update preview strip (last 3 items)
- Upcoming visits calendar widget
- Next payment due alert (if applicable)

**Media Updates Page (`/dashboard/media`):**
- Chronological feed of all `MediaUpdate` records for user's contracts
- Each item: thumbnail, date, caption, PHOTO/VIDEO badge
- Click → full-screen lightbox modal
- Unread items visually distinct (gold left border)
- Filter by: All / Photos / Videos / By Tree
- "Your tree was updated on [date] by our field agent in Gir" timestamp header
- Loading skeleton while fetching

**Farm Visits Page (`/dashboard/visits`):**
- Annual quota display: `"3 Free Visits Used: [X/3] this year"`
- Progress bar for visits used
- Calendar date picker to request a visit:
  - Unavailable dates shown (booked out or off-season)
  - `numberOfVisitors` input (1–6)
  - Notes textarea
  - Submit → creates `FarmVisit` record, sends confirmation email
- List of past and upcoming visits with status badges
- Important disclaimer card: `"Travel and accommodation (2–3 days stay) is at the renter's expense. We will host you at the farm. See our Farm Visit Guidelines."`

**Harvest Page (`/dashboard/harvest`):**
- Season timeline showing current harvest status
- `HarvestTracker` component: shows stage pipeline (Pending → In Progress → Packaged → Shipped → Delivered)
- When status = PACKAGED: shipping address form + dynamic shipping cost display
- Stripe checkout for shipping payment
- Tracking number display when SHIPPED
- Past seasons archive

**Payments Page (`/dashboard/payments`):**
- List of all payments: pre-booking, annual rents, shipping
- Status, date, amount, Stripe receipt link
- "Next Payment Due" card if applicable

---

### 8.6 ADMIN PORTAL (`/admin`)

**Media Upload Portal (`/admin/media-upload`):**
- Select Contract (searchable dropdown of all active contracts)
- Auto-fills: tree code, user name
- UploadThing file uploader for PHOTO or VIDEO
- Caption input
- `takenAt` date picker
- Submit → creates `MediaUpdate` record, sends push/email notification to user
- Recent uploads table

**Admin Tree Management (`/admin/trees`):**
- Table of all trees with filters
- Toggle availability
- Assign tree to contract
- Edit tree details

**Admin Contracts (`/admin/contracts`):**
- All contracts list with status filter
- Approve/confirm prebooking → change status, assign tree, trigger Phase 2 payment link email
- Change contract status

---

### 8.7 TRUST & LEGAL PAGES

#### `About Us` (`/about`)
Copy content (generate this full text):
```
ABOUT APNATREE.IN

We Are Rooted in Gir.

ApnaTree.in was born from a singular conviction: that the finest Kesar mango 
in the world — grown in the iron-rich soil of Gujarat's Gir Forest, kissed 
by the same climate that shelters the last Asiatic lions — deserves a direct 
and sacred relationship with the people who love it.

We are not a mango delivery service. We are a living connection.

[Founder story: third-generation mango farmer family from Talala, Junagadh 
district. Opened to renters in 2024 to create sustainable income for farming 
families while giving urban families an unbreakable bond with the land.]

Our Farm:
Located in [Talala-Gir region], our grove spans [X] acres. Every tree is 
tended by skilled farmhands whose families have worked this land for decades. 
Our trees are certified organic, never chemically forced to ripen, and 
harvested only at peak natural maturity.

[Farm images gallery using MEDIA.farm.gallery]
[Team photos using MEDIA.team]
```

#### `How It Works` (`/how-it-works`)
Expanded version of the 4-step process with full explanatory paragraphs, FAQ-style questions, and legal notes.

#### `Terms of Service` (`/terms`) — Generate full legal text covering:

```
APNATREE.IN — TREE RENTAL AGREEMENT & TERMS OF SERVICE
Effective Date: January 1, 2025

1. DEFINITIONS
   "ApnaTree" = ApnaTree.in, operated by [Company Name], registered under 
   Indian law.
   "Renter" = User who has completed Phase 1 pre-booking and Phase 2 rent 
   payment.
   "Tree" = A specific Kesar mango tree in Gir Forest, Gujarat assigned to 
   Renter.
   "Contract Year" = 12 calendar months from contract start date.

2. PRE-BOOKING POLICY (PHASE 1)
   - The pre-booking fee (₹1,000 / ₹2,500 / ₹5,000 depending on tier) is 
     strictly NON-REFUNDABLE.
   - Pre-booking secures a priority position in the queue; it does not 
     guarantee a specific tree until Phase 2 confirmation.
   - If ApnaTree cannot allocate a tree within 90 days of pre-booking, a 
     full refund will be issued.

3. TREE RENTAL AGREEMENT (PHASE 2)
   - Upon tree allocation, Renter pays the annual rent.
   - Annual rent is due on the anniversary of the contract start date.
   - The rental relationship is a service contract. Renter does not acquire 
     ownership, title, or any property rights to the tree or land.
   - ApnaTree retains full ownership of all trees and land.

4. HARVEST RIGHTS
   - Renter is entitled to 100% of the documented yield from their assigned 
     tree during each contract year.
   - Yield quantity depends on natural conditions including weather, disease,
     and biological cycles. ApnaTree does not guarantee a minimum yield.
   - Shipping costs are borne by the Renter and are payable at the time of 
     dispatch. ApnaTree will notify Renter of shipping costs before charging.
   - International shipments may be subject to customs duties and import 
     taxes, which are the sole responsibility of the Renter.

5. FARM VISITS
   - Each active contract includes 3 (three) complimentary farm visits per 
     contract year.
   - Farm visits must be pre-scheduled via the platform with a minimum 7-day 
     advance notice.
   - Travel to and from the Gir Farm, accommodation, meals, and all personal 
     expenses during the visit are entirely the Renter's responsibility.
   - Additional visits beyond the 3 free quota may be arranged at a fee.
   - ApnaTree reserves the right to reschedule or cancel farm visits due to 
     weather, harvest operations, or force majeure events.

6. MEDIA UPDATES
   - ApnaTree provides bi-weekly (every ~15 days) personalized photos and/or 
     videos of the Renter's assigned tree via the dashboard.
   - Media delivery may be delayed during harvest season or due to adverse 
     weather. This does not constitute a breach of contract.
   - All media remains the intellectual property of ApnaTree; Renter receives 
     a license to use for personal, non-commercial purposes only.

7. CONTRACT RENEWAL & TERMINATION
   - Contracts expire at the end of the agreed term unless renewed.
   - Renter may choose not to renew without penalty.
   - Early termination by Renter: pre-booking fees and paid annual rent are 
     non-refundable.
   - ApnaTree may terminate a contract with 30 days notice if: (a) rent 
     payments are more than 30 days overdue; (b) Renter misuses platform or 
     violates these terms.

8. FORCE MAJEURE
   ApnaTree shall not be liable for delays or failures caused by events 
   beyond reasonable control, including natural disasters, pandemic, 
   government orders, crop disease, or severe drought.

9. DISPUTE RESOLUTION
   - Parties agree to attempt resolution through good-faith negotiation first.
   - If unresolved, disputes shall be subject to arbitration under the 
     Arbitration and Conciliation Act, 1996 (India).
   - Jurisdiction: Courts of Junagadh, Gujarat, India.

10. GOVERNING LAW
    These Terms are governed by the laws of the Republic of India.

11. CONTACT
    ApnaTree.in Support: support@apnatree.in
    Registered Office: [Address], Talala, Junagadh, Gujarat — 362150
```

#### `Trust Page` (`/trust`) — Generate full trust-building page:
- Sections: Our Legal Structure, Why Your Money is Safe, Organic Certifications, Harvest Accountability, Media Transparency, Data Privacy
- Use `MEDIA.trust` images for certificates and documents
- Download links for sample lease agreement (PDF placeholder)
- Money-back guarantee section (within 90-day allocation window)

#### `FAQ` (`/faq`) — Generate 25+ realistic questions covering:
- Pre-booking, payment, tree allocation, harvest quantities, shipping,  
  international orders, farm visits, media updates, cancellation, renewals

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 9 — BOOKING FLOW (Stripe Integration)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 9.1 Phase 1 — Pre-Booking Checkout

**Server Action: `src/actions/booking.ts`**

```typescript
"use server";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { calculatePricing } from "@/lib/pricing";
import { TreeTier, ContractDuration } from "@prisma/client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createPreBookingCheckout(
  tier: TreeTier,
  duration: ContractDuration,
  currency: "INR" | "USD" = "INR"
) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const pricing = calculatePricing(tier, duration);

  // Create pending contract record
  const contract = await prisma.contract.create({
    data: {
      userId: session.user.id,
      tier,
      duration,
      status: "PREBOOKING_PENDING",
      prebookingAmountPaise: pricing.prebookingAmountPaise,
      yearlyRentPaise: pricing.yearlyRentPaise,
      totalContractValuePaise: pricing.totalContractValuePaise,
      currency,
      contractNumber: `AT-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`,
    },
  });

  // Create Stripe Checkout Session
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: currency.toLowerCase(),
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: pricing.prebookingAmountPaise,
          product_data: {
            name: `ApnaTree.in Pre-Booking — ${pricing.tier} Tree (${pricing.years}-Year Contract)`,
            description: `Non-refundable reservation fee. Secures your position in the allocation queue. Annual rent of ${pricing.yearlyRentDisplay} billed separately upon tree assignment.`,
            images: ["https://apnatree.in/media/trees/og-tree.jpg"],
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      contractId: contract.id,
      userId: session.user.id,
      type: "PREBOOKING",
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?prebooking=success&contract=${contract.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/trees/${tier.toLowerCase()}?cancelled=true`,
    customer_email: session.user.email ?? undefined,
    payment_intent_data: {
      metadata: {
        contractId: contract.id,
      },
    },
  });

  // Save Stripe session ID
  await prisma.contract.update({
    where: { id: contract.id },
    data: { prebookingStripeSessionId: stripeSession.id },
  });

  redirect(stripeSession.url!);
}
```

### 9.2 Stripe Webhook Handler

**File: `src/app/api/webhooks/stripe/route.ts`**

Handle these events:
- `checkout.session.completed` with `metadata.type === "PREBOOKING"`:
  - Update contract status to `PREBOOKING_PAID`
  - Set `prebookingPaidAt`
  - Store `prebookingStripePaymentId`
  - Send confirmation email via Resend
- `checkout.session.completed` with `metadata.type === "ANNUAL_RENT"`:
  - Update `RentPayment.paidAt`
  - If first rent payment: set contract status to `ACTIVE`, set `startDate`
  - Send receipt email
- `checkout.session.completed` with `metadata.type === "SHIPPING"`:
  - Update `HarvestOrder.shippingPaymentStatus = PAID`
  - Set `shippingPaidAt`
  - Send dispatch confirmation email

Always verify Stripe webhook signature using `stripe.webhooks.constructEvent()`.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 10 — EMAIL SYSTEM (Resend)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**File: `src/lib/emails.ts`** — Create email sending functions for:

1. `sendPreBookingConfirmation(user, contract)` — "Your tree is reserved!"
2. `sendContractActivated(user, contract, tree)` — "Your tree has been assigned: GIR-K-XXXX"
3. `sendNewMediaUpdate(user, contract, mediaUpdate)` — "New photos from your tree 🌿"
4. `sendFarmVisitConfirmation(user, farmVisit)` — Visit details + confirmation code
5. `sendHarvestStarting(user, contract)` — "Your harvest season begins!"
6. `sendShippingPaymentRequest(user, harvestOrder)` — "Your mangoes are ready. Pay shipping."
7. `sendTrackingUpdate(user, harvestOrder)` — "Your mangoes are on their way 🥭"

All emails must be HTML templates (inline styled) featuring:
- ApnaTree brand colors (gold + forest green)
- Cormorant Garamond heading font fallback to Georgia
- Mobile-responsive layout
- Unsubscribe footer

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 11 — MIDDLEWARE (Route Protection)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**File: `middleware.ts`**

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin routes — require ADMIN role
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 12 — PERFORMANCE & SEO REQUIREMENTS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 12.1 Metadata (Root `layout.tsx`)
```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://apnatree.in"),
  title: {
    default: "ApnaTree.in — Rent a Kesar Mango Tree from Gir Forest",
    template: "%s | ApnaTree.in",
  },
  description: "Rent an authentic Kesar mango tree from Gujarat's legendary Gir Forest. Receive bi-weekly farm updates, 3 annual visits, and 100% of your harvest delivered to your door.",
  keywords: ["Kesar mango", "Gir forest", "rent mango tree", "tree adoption", "Gujarat mango", "Alphonso mango alternative", "apnatree"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://apnatree.in",
    siteName: "ApnaTree.in",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 12.2 Performance Rules
- All images: use `next/image` with `sizes` prop optimized per breakpoint
- Hero video: `preload="none"` on mobile viewports (detect via CSS)
- Dashboard pages: Use `Suspense` with `<Skeleton>` loading states for all DB calls
- Static pages: `export const revalidate = 3600` (1 hour ISR)
- DB queries: Use Prisma `select` to fetch only needed fields — never `findMany()` without limits
- API rate limiting: Add rate limit headers to booking actions (max 5 pre-bookings per IP per hour)

### 12.3 Accessibility
- All interactive elements have `aria-label`
- Color contrast minimum 4.5:1 for body text
- All images have descriptive `alt` text
- Form fields have visible labels (not just placeholders)
- Focus styles visible (gold ring)
- Skip to main content link at top of page

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 13 — IMPLEMENTATION PHASES
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### PHASE 1: Foundation (Shell, DB, Auth, Design System)
**Execute in this exact order:**

1. Run bootstrap commands from Part 2.1
2. Set up `globals.css` with full design system from Part 6.1
3. Add Google Fonts to `layout.tsx` per Part 6.2
4. Create `/src/lib/env.ts`, `/src/lib/prisma.ts`, `/src/lib/utils.ts`
5. Write full `prisma/schema.prisma` from Part 3
6. Run `npx prisma migrate dev --name init`
7. Run `npx prisma db seed`
8. Configure NextAuth in `/src/lib/auth.ts` and `/src/app/api/auth/[...nextauth]/route.ts`
9. Build `middleware.ts` from Part 11
10. Build `Navbar.tsx` and `Footer.tsx` layout components
11. Create `src/lib/animations.ts` from Part 6.3
12. Build `ScrollReveal.tsx` wrapper component using Framer Motion `whileInView`
13. Scan `/public/media/` and build `src/lib/media-map.ts`

### PHASE 2: Marketing Site & Booking Engine
1. Build `HeroSection.tsx` with video background
2. Build all marketing section components (Parts 8.1 through 8.3)
3. Assemble homepage (`src/app/(marketing)/page.tsx`)
4. Build tree listing and detail pages
5. Build auth pages (`/login`, `/register`)
6. Write `src/lib/pricing.ts` from Part 4
7. Build `PreBookingForm.tsx`, `ContractSelector.tsx`, `TierSelector.tsx`
8. Configure Stripe: `/src/lib/stripe.ts`
9. Write `src/actions/booking.ts` from Part 9.1
10. Build Stripe webhook handler from Part 9.2
11. Test full booking flow end-to-end in Stripe test mode

### PHASE 3: User Dashboard & Media System
1. Build `DashboardSidebar.tsx` layout
2. Build dashboard overview page with `TreeCard.tsx`
3. Build media updates feed (`/dashboard/media`) with lightbox
4. Build farm visit scheduler (`/dashboard/visits`) with calendar
5. Build harvest tracker (`/dashboard/harvest`) with shipping payment
6. Build payments history page
7. Build user profile page
8. Set up UploadThing for media files
9. Write email templates in `/src/lib/emails.ts`
10. Wire up all email triggers in webhook handler

### PHASE 4: Admin Portal, Trust Pages & Polish
1. Build admin layout and sidebar
2. Build media upload portal (`/admin/media-upload`)
3. Build admin contracts, trees, users pages
4. Write full `Terms of Service` page content from Part 8.7
5. Write full `About Us` page with media
6. Write full `Trust` page
7. Write `FAQ` page (25+ questions)
8. Write `How It Works` expanded page
9. Add `loading.tsx`, `error.tsx`, `not-found.tsx` to all route groups
10. Full responsive QA pass at 375px, 768px, 1024px, 1440px
11. Lighthouse audit — target score 90+ on all metrics
12. Set up `sitemap.ts` and `robots.ts` in `/src/app/`

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 14 — ABSOLUTE CURSOR DIRECTIVES
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**These are inviolable. Read and comply fully before generating any code:**

```
DIRECTIVE 1 — NO HALLUCINATED APIS
Only use npm packages listed in Part 2.1 bootstrap command.
If a package is not listed, do NOT use it. Use native Next.js or 
React primitives instead. No third-party state management (no Redux, 
no Zustand) unless explicitly requested.

DIRECTIVE 2 — REAL CODE ONLY
Never generate placeholder functions like `// TODO: implement`.
Every function must be fully implemented. Every API call must include
error handling. Every form must have server-side validation with zod.

DIRECTIVE 3 — MOBILE-FIRST ALWAYS
Every component starts at 375px. Add responsive modifiers only to 
scale UP. Never write desktop styles and hack mobile as an afterthought.
Test every layout at these breakpoints: 375, 430, 768, 1024, 1280, 1440.

DIRECTIVE 4 — NO INLINE STYLES
Zero `style={{ }}` props. Zero hardcoded hex colors. Use only:
- Tailwind utility classes
- CSS variables defined in globals.css
- shadcn/ui component variants

DIRECTIVE 5 — TYPE SAFETY
TypeScript strict mode. No `any`. Use Prisma-generated types for all 
DB models. Zod schemas for all form inputs and API payloads.
Create proper interfaces/types in `/src/types/index.ts`.

DIRECTIVE 6 — COMPONENT SIZE LIMIT
Max 200 lines per component file. If a component is getting long,
extract sub-components. Each component does ONE thing well.

DIRECTIVE 7 — SERVER COMPONENTS BY DEFAULT
Every page is a React Server Component unless it needs:
- useState / useEffect
- Browser APIs
- Event listeners
Only then add `"use client"` — and isolate it to the smallest possible component.

DIRECTIVE 8 — SECURE BY DEFAULT
- All dashboard and admin routes check session server-side before rendering
- Never expose user IDs or sensitive data in client-side state
- Stripe webhook verifies signature before processing
- UploadThing validates file type and size server-side
- All Prisma queries scoped by userId to prevent data leakage

DIRECTIVE 9 — MEDIA ASSETS FIRST
Before building any marketing component, check MEDIA object in 
`src/lib/media-map.ts` for available files. Use REAL project images.
Never use Lorem Picsum, Unsplash API, or external placeholder images.
If a specific image category is empty, use the closest available category.

DIRECTIVE 10 — PREMIUM FEEL MANDATORY
The brand is LUXURY + ORGANIC + TRUSTWORTHY. Every component must reflect:
- Generous whitespace (padding: 80px+ on sections)
- Cormorant for all headings (minimum 2rem, usually larger)
- Gold accent (#C8972A) for interactive elements and highlights
- Forest green (#1A2E1A) for backgrounds and accents
- No harsh borders — use subtle shadows and spacing for separation
- Smooth transitions on all interactive elements (min 200ms)
- Framer Motion for all scroll reveals — nothing just "pops" in

DIRECTIVE 11 — PRICING ENGINE IS SACRED
Never hardcode prices anywhere in the UI. Always compute via 
`calculatePricing()` from `/src/lib/pricing.ts`. This is the single 
source of truth for all monetary values. Changes here propagate everywhere.

DIRECTIVE 12 — DATABASE QUERIES ARE SECURE
Every Prisma query that fetches user data MUST include:
`where: { userId: session.user.id }`
Never fetch a contract, media update, or farm visit without verifying
the authenticated user owns it.

DIRECTIVE 13 — ERROR STATES ARE REAL
Every async operation must have:
- Loading state (skeleton or spinner)
- Error state (user-friendly message, not raw error)
- Empty state (helpful prompt when no data)
Never leave a component that can fail without all three states.

DIRECTIVE 14 — EMAIL CONFIRMATIONS ARE REQUIRED
Every transactional event (booking, payment, visit confirmed, harvest 
shipped) MUST trigger an email via Resend. Emails are part of the 
premium experience. Wire them up in the webhook handler.

DIRECTIVE 15 — BUILD FOR PRODUCTION
Code is production-ready from line 1. No `console.log` in production 
paths. Use `console.error` only in catch blocks. Implement proper 
Next.js error boundaries. Use `notFound()` for missing DB records.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 15 — COMPETITOR-INSPIRED TRUST COPY
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Inspired by rentatree.in's operational model, but positioned as superior:*

### "The ApnaTree Guarantee" (for homepage Trust section):

```
THE APNATREE PROMISE

We believe transparency is the only currency that matters.

✦ YOUR MONEY IS PROTECTED
Your pre-booking fee reserves your spot in our allocation queue. If we 
cannot assign you a tree within 90 days, you receive a full refund — 
no questions asked. After tree assignment, your investment is protected 
by a legally signed lease agreement.

✦ YOUR TREE IS REAL
Every tree has a unique code (e.g. GIR-K-0042). You can see it on your 
dashboard. Our field agents photograph and video your specific tree every 
15 days. You are not renting a concept — you are connected to a living, 
growing tree.

✦ YOUR HARVEST IS YOURS
100% of the yield from your tree is yours. We do not blend harvests. 
We do not substitute grades. Your mangoes are picked, weighed, graded, 
packed in your name, and shipped to your address. Harvest reports include 
total weight, grade breakdown, and packing date.

✦ YOUR VISITS ARE REAL
We welcome you to the farm 3 times a year. Meet your tree. Walk the grove. 
Witness the harvest. Speak to the farmhands who care for it. This is not 
a virtual experience — this is your land.

✦ WE ARE LEGALLY COMPLIANT
ApnaTree.in operates under a formal lease structure governed by Indian 
contract law. Every renter receives a digital lease agreement. Our farming 
practices comply with FSSAI organic standards. Our payment infrastructure 
is powered by Stripe, a PCI-DSS Level 1 certified payment processor.
```

### "Universal Laws of the Grove" (for `/trust` page):

```
THE UNIVERSAL LAWS OF APNATREE

LAW I — THE TREE IS SOVEREIGN
No renter shall instruct, demand, or interfere with the agricultural 
management of their tree. Decisions on watering, pruning, pest control, 
and harvest timing are made exclusively by our expert farmers. Nature 
leads; we follow.

LAW II — THE HARVEST IS HONEST
Yield quantities are determined by nature, not by contract. We document 
and deliver every kilogram from your tree. We make no guarantee of minimum 
yield, and we make no excuse for abundance.

LAW III — TRANSPARENCY IS TOTAL
Every media update, every visit, every payment, every contract term is 
visible in your dashboard. We hide nothing. If your tree had a difficult 
season, you will know first.

LAW IV — THE LAND IS SHARED
By renting with ApnaTree, you become a steward of Gir. A portion of all 
rental revenue directly funds the livelihoods of farming families and 
conservation efforts in the Gir ecosystem.

LAW V — THE MANGO IS SACRED
The Kesar mango of Gir holds a Geographical Indication (GI) tag — India's 
highest agricultural certification. We honour this designation by shipping 
only authentic Gir Kesar. We will never substitute, blend, or misrepresent 
our fruit.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 16 — DEPLOYMENT CHECKLIST
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before deploying to production (Vercel recommended):

```
□ All environment variables set in Vercel dashboard
□ PostgreSQL database provisioned (Neon, Supabase, or Railway)
□ Prisma migrate deploy run on production DB
□ Stripe webhook endpoint registered pointing to /api/webhooks/stripe
□ UploadThing app configured with production credentials
□ Resend domain verified for hello@apnatree.in
□ Google OAuth credentials updated with production callback URL
□ /public/media/ folder populated with all production images/videos
□ next.config.js: images.domains or remotePatterns configured
□ Lighthouse audit run — target 90+ performance, 100 accessibility
□ Mobile smoke test on real iPhone and Android device
□ Full booking flow tested with Stripe test cards
□ Webhook flow tested with Stripe CLI
□ Admin account created in production DB
□ robots.txt and sitemap.xml verified
□ Domain DNS configured and SSL certificate active
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 17 — NEXT.JS CONFIG
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**File: `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // UploadThing CDN
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/api/webhooks/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
```

---

*END OF APNATREE.IN CURSOR MASTER PROMPT*
*Document Version: 1.0.0 | Generated for Cursor AI | apnatree.in*
*All business logic, pricing, schema, and directives are authoritative and final.*
```
