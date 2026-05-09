import Link from "next/link";
import { ArrowUpRight, CalendarDays, Camera, Leaf, Sprout, Wallet } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/shared/StaggerGroup";
import { PremiumCard, PremiumCardHeader } from "@/components/ui/PremiumCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { TreeCard } from "@/components/dashboard/TreeCard";
import { FARM_MEDIA, FARM_MEDIA_FALLBACKS } from "@/lib/farm-media";

export default function DashboardHomePage() {
  const heroImage = FARM_MEDIA.orchard[0] ?? FARM_MEDIA_FALLBACKS.gallery;
  const harvestImage = FARM_MEDIA.harvest[0] ?? FARM_MEDIA_FALLBACKS.gallery;

  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <ScrollReveal className="flex flex-col gap-3">
        <p className="eyebrow">Overview</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight sm:text-5xl">
          Welcome back to ApnaTree
        </h1>
        <p className="text-[color:var(--muted-foreground)] max-w-3xl text-lg leading-relaxed">
          Contract timelines, bi-weekly media, harvest allotments, and payments consolidate here. Pin the modules you visit most and let concierge handle the rest.
        </p>
      </ScrollReveal>

      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-6 md:auto-rows-[minmax(140px,auto)]">
        <StaggerItem className="md:col-span-4">
          <PremiumCard tone="forest" padding="lg" className="h-full">
            <div className="grid h-full gap-6 sm:grid-cols-2 sm:items-center">
              <div className="space-y-3">
                <p className="eyebrow text-[color:var(--brand-gold-light)]">Live grove</p>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[color:var(--brand-cream)]">
                  Bharatbhai is in your block today
                </h2>
                <p className="text-[color:var(--brand-cream)]/80 text-sm leading-relaxed">
                  Today&apos;s capture window is open. New chronicles will appear in the media observatory before nightfall.
                </p>
                <PremiumButton href="/dashboard/media" tone="gold" size="md" iconRight={<ArrowUpRight className="size-4" />}>
                  Open observatory
                </PremiumButton>
              </div>
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
                style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
                aria-hidden
              >
                <span className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </PremiumCard>
        </StaggerItem>

        <StaggerItem className="md:col-span-2">
          <PremiumCard tone="gold" padding="lg" accent className="h-full">
            <PremiumCardHeader
              eyebrow="Visits"
              title="3 of 3 free visits"
              description="Annual hospitality refreshes 1 January. Concierge can ledger an extra visit on request."
            />
            <div className="mt-6 flex items-center gap-3 text-[color:var(--brand-forest)]">
              <CalendarDays className="size-5" aria-hidden />
              <Link href="/dashboard/visits" className="text-sm font-semibold underline-offset-4 hover:underline">
                Schedule a walk
              </Link>
            </div>
          </PremiumCard>
        </StaggerItem>

        <StaggerItem className="md:col-span-2">
          <PremiumCard tone="cream" padding="lg" className="h-full">
            <PremiumCardHeader
              eyebrow="Stewardship"
              title="2 active contracts"
              description="One Medium tier in pre-book, one Large tier in stewardship. Auto-renew enabled."
            />
            <div className="mt-6 flex items-center gap-3 text-[color:var(--brand-forest)]">
              <Leaf className="size-5" aria-hidden />
              <Link href="/dashboard/profile" className="text-sm font-semibold underline-offset-4 hover:underline">
                Manage contracts
              </Link>
            </div>
          </PremiumCard>
        </StaggerItem>

        <StaggerItem className="md:col-span-2">
          <PremiumCard tone="cream" padding="lg" className="h-full">
            <PremiumCardHeader
              eyebrow="Media"
              title="6 unread chronicles"
              description="Latest captures from Block-3 buffered into your dashboard between rains."
            />
            <div className="mt-6 flex items-center gap-3 text-[color:var(--brand-forest)]">
              <Camera className="size-5" aria-hidden />
              <Link href="/dashboard/media" className="text-sm font-semibold underline-offset-4 hover:underline">
                Open library
              </Link>
            </div>
          </PremiumCard>
        </StaggerItem>

        <StaggerItem className="md:col-span-2">
          <PremiumCard tone="forest" padding="lg" className="h-full">
            <PremiumCardHeader
              eyebrow="Harvest"
              title="Pack-house ETA · Apr 14"
              description="Yield projections will tighten ±5 kg as the second flush sets fruit."
            />
            <div className="mt-6 flex items-center gap-3 text-[color:var(--brand-cream)]">
              <Sprout className="size-5" aria-hidden />
              <Link
                href="/dashboard/harvest"
                className="text-sm font-semibold text-[color:var(--brand-gold-light)] underline-offset-4 hover:underline"
              >
                Track yield
              </Link>
            </div>
          </PremiumCard>
        </StaggerItem>
      </StaggerGroup>

      <ScrollReveal className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight">Your trees</h2>
          <Link
            href="/trees"
            className="text-sm font-semibold text-[color:var(--brand-gold-dark)] underline-offset-4 hover:underline"
          >
            Adopt another canopy →
          </Link>
        </div>
        <StaggerGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <StaggerItem>
            <TreeCard treeCode="GIR-K-104" tierLabel="Medium tier" status="Stewarding" contractNumber="ATC-2042" zone="Block 3" yieldEstimateKg={42} />
          </StaggerItem>
          <StaggerItem>
            <TreeCard treeCode="GIR-K-227" tierLabel="Large tier" status="Pre-booked" contractNumber="ATC-2058" zone="Block 5" yieldEstimateKg={86} imageSrc={harvestImage} />
          </StaggerItem>
          <StaggerItem>
            <TreeCard treeCode="GIR-K-301" tierLabel="Small tier" status="Reserved" contractNumber="ATC-2071" zone="Block 1" />
          </StaggerItem>
        </StaggerGroup>
      </ScrollReveal>

      <ScrollReveal>
        <PremiumCard tone="cream" padding="lg" accent>
          <PremiumCardHeader
            eyebrow="Payments"
            title="No pending settlements"
            description="Stripe ledger reconciles deposits, stewardship rent, and shipping. Receipts sync into Profile → Documents within a few seconds."
          />
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[color:var(--brand-forest)]">
            <Wallet className="size-5" aria-hidden />
            <PremiumButton href="/dashboard/payments" tone="forest" size="md" iconRight={<ArrowUpRight className="size-4" />}>
              Open payments ledger
            </PremiumButton>
          </div>
        </PremiumCard>
      </ScrollReveal>
    </section>
  );
}
