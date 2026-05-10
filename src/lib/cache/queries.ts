import { unstable_cache } from "next/cache";

import { Prisma } from "@prisma/client";
import type { TreeTier } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type TierAvailabilityMap = Record<TreeTier, number>;

const emptyTierMap = (): TierAvailabilityMap => ({
  SMALL: 0,
  MEDIUM: 0,
  LARGE: 0,
});

/** When Postgres is unreachable, keep marketing/checkout from showing bare zeros. */
export const MARKETING_FALLBACK_TIER_AVAILABILITY: TierAvailabilityMap = {
  SMALL: 12,
  MEDIUM: 8,
  LARGE: 4,
};

/** Connection failures when Postgres is unreachable (common in local dev). */
const DB_UNAVAILABLE_KNOWN_CODES = new Set([
  "P1001", // Can't reach database server
  "P1002", // Connection timeout
  "P1017", // Server has closed the connection
]);

let warnedDbDown = false;

function warnDbDownOnce(): void {
  if (process.env.NODE_ENV !== "development" || warnedDbDown) return;
  warnedDbDown = true;
  console.warn("[apnatree] Database unreachable — using cached fallbacks");
}

/**
 * Detect a Prisma "database unreachable" error.
 *
 * Uses several signals because in dev `instanceof` can fail when Next.js HMR
 * or bundling loads multiple `@prisma/client` copies, leaving an error whose
 * prototype chain doesn't match the imported `Prisma.PrismaClientInitializationError`.
 */
export function isDbUnavailableError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) return true;
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return DB_UNAVAILABLE_KNOWN_CODES.has(error.code);
  }

  if (error !== null && typeof error === "object") {
    const named = error as { name?: unknown; constructor?: { name?: unknown } };
    if (named.name === "PrismaClientInitializationError") return true;
    if (named.constructor?.name === "PrismaClientInitializationError") return true;

    const errorCode = (error as { errorCode?: unknown }).errorCode;
    if (typeof errorCode === "string" && DB_UNAVAILABLE_KNOWN_CODES.has(errorCode)) {
      return true;
    }
  }

  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "";
  if (!message) return false;
  return (
    message.includes("Can't reach database server") ||
    message.includes("ECONNREFUSED")
  );
}

export const getCachedTreeAvailability = unstable_cache(
  async (): Promise<TierAvailabilityMap> => {
    try {
      const grouped = await prisma.tree.groupBy({
        by: ["tier"],
        where: { isAvailable: true },
        _count: { id: true },
      });

      const map: TierAvailabilityMap = emptyTierMap();

      for (const row of grouped) {
        map[row.tier] = row._count.id;
      }

      return map;
    } catch (error) {
      if (isDbUnavailableError(error)) {
        warnDbDownOnce();
        return MARKETING_FALLBACK_TIER_AVAILABILITY;
      }
      console.error("[getCachedTreeAvailability]", error);
      return emptyTierMap();
    }
  },
  ["tree-availability-map"],
  { revalidate: 3600, tags: ["trees"] }
);

export async function getAvailableCountForTier(tier: TreeTier): Promise<number> {
  try {
    const map = await getCachedTreeAvailability();
    return map[tier];
  } catch (error) {
    console.error("[getAvailableCountForTier]", tier, error);
    return MARKETING_FALLBACK_TIER_AVAILABILITY[tier];
  }
}

export function getCachedSiteConfigValue(key: string): Promise<string | null> {
  return unstable_cache(
    async () => {
      try {
        const row = await prisma.siteConfig.findUnique({
          where: { key },
          select: { value: true },
        });
        return row?.value ?? null;
      } catch (error) {
        if (isDbUnavailableError(error)) {
          warnDbDownOnce();
          return null;
        }
        console.error("[getCachedSiteConfigValue]", key, error);
        return null;
      }
    },
    ["site-config", key],
    { revalidate: 300, tags: ["site-config"] }
  )();
}
