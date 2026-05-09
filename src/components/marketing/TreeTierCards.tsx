import { ContractDuration, TreeTier } from "@prisma/client";

import { TreeTierDeck, type TierDeckItem } from "@/components/marketing/TreeTierDeck";
import { getCachedTreeAvailability } from "@/lib/cache/queries";
import { FARM_MEDIA, getImage, getVideo, type VideoSlotKey } from "@/lib/farm-media";
import { calculatePricing, getExpectedYieldRange, getTierLabel } from "@/lib/pricing";

const TIERS = [TreeTier.SMALL, TreeTier.MEDIUM, TreeTier.LARGE] as const;

const TIER_DETAILS: Record<
  TreeTier,
  {
    slug: string;
    age: string;
    pitch: string;
    highlights: string[];
    featured?: boolean;
    videoKey: VideoSlotKey;
  }
> = {
  SMALL: {
    slug: "small",
    age: "3-year canopy",
    pitch: "An approachable Kesar steward — perfect for first-time renters who want to learn the rhythm.",
    highlights: ["15–25 kg yield window", "Bi-weekly chronicles", "Annual Gir hospitality"],
    videoKey: "trees",
  },
  MEDIUM: {
    slug: "medium",
    age: "5-year canopy",
    pitch: "Our most-loved tier. Generous yield, predictable timeline, and the most flexible contract terms.",
    highlights: ["30–50 kg yield window", "Priority harvest packing", "Concierge visit slots"],
    featured: true,
    videoKey: "harvest",
  },
  LARGE: {
    slug: "large",
    age: "8-year canopy",
    pitch: "A flagship grove veteran. Heirloom-grade fruit, dedicated agronomist, premium freight.",
    highlights: ["60–100 kg yield window", "Dedicated field agronomist", "Premium courier handoff"],
    videoKey: "farm",
  },
};

function tierPosterPool(tier: TreeTier): string[] {
  const pools = FARM_MEDIA.images.trees;
  if (tier === TreeTier.SMALL) return pools.small;
  if (tier === TreeTier.MEDIUM) return pools.medium;
  return pools.large;
}

export async function TreeTierCards() {
  const availability = await getCachedTreeAvailability();

  const tiers: TierDeckItem[] = TIERS.map((tier) => {
    const detail = TIER_DETAILS[tier];
    const pricing = calculatePricing(tier, ContractDuration.ONE_YEAR);
    const open = availability[tier];
    const soldOut = !open;

    return {
      tierKey: tier,
      slug: detail.slug,
      labelShort: getTierLabel(tier).replace(/\s*\(.*\)$/, ""),
      age: detail.age,
      pitch: detail.pitch,
      highlights: detail.highlights,
      featured: detail.featured,
      soldOut,
      openCount: open,
      prebookingDisplay: pricing.prebookingDisplay,
      yearlyRentDisplay: pricing.yearlyRentDisplay,
      yieldRange: getExpectedYieldRange(tier),
      videoSrc: getVideo(detail.videoKey),
      posterSrc: getImage(tierPosterPool(tier), TIERS.indexOf(tier)),
    };
  });

  return <TreeTierDeck tiers={tiers} />;
}

export { TreeTierCards as TreeTiersSection };
