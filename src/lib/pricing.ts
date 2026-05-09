import { ContractDuration, TreeTier } from "@prisma/client";

export const PREBOOKING_AMOUNTS = {
  SMALL: 100_000,
  MEDIUM: 250_000,
  LARGE: 500_000,
} as const;

export const YEARLY_RENT = {
  SMALL: 1_000_000,
  MEDIUM: 1_500_000,
  LARGE: 2_200_000,
} as const;

export const CONTRACT_YEARS = {
  ONE_YEAR: 1,
  TWO_YEAR: 2,
  FIVE_YEAR: 5,
} as const;

export const MULTI_YEAR_DISCOUNT = {
  ONE_YEAR: 0,
  TWO_YEAR: 0.05,
  FIVE_YEAR: 0.12,
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
  const labels: Record<TreeTier, string> = {
    SMALL: "Small (3-Year Tree)",
    MEDIUM: "Medium (5-Year Tree)",
    LARGE: "Large (8-Year Tree)",
  };
  return labels[tier];
}

export function getContractLabel(duration: ContractDuration): string {
  const labels: Record<ContractDuration, string> = {
    ONE_YEAR: "1-Year Contract",
    TWO_YEAR: "2-Year Contract",
    FIVE_YEAR: "5-Year Mega Contract",
  };
  return labels[duration];
}

export function getExpectedYieldRange(tier: TreeTier): string {
  const yields: Record<TreeTier, string> = {
    SMALL: "15–25 kg",
    MEDIUM: "30–50 kg",
    LARGE: "60–100 kg",
  };
  return yields[tier];
}

export function getRemainingFreeVisits(usedVisitsThisYear: number): number {
  return Math.max(0, 3 - usedVisitsThisYear);
}
