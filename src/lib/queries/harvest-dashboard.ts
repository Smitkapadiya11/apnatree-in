import "server-only";

import type { HarvestStatus, ShippingPaymentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type HarvestOrderCard = {
  id: string;
  season: string;
  estimatedYieldKg: number | null;
  actualYieldKg: number | null;
  status: HarvestStatus;
  shippingPaymentStatus: ShippingPaymentStatus;
  shippingCostPaise: number | null;
  trackingNumber: string | null;
  courierPartner: string | null;
  shippingAddressLine1: string | null;
  shippingAddressLine2: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingPincode: string | null;
  shippingCountry: string;
  updatedAt: Date;
};

export async function getHarvestOrdersForUser(userId: string): Promise<HarvestOrderCard[]> {
  try {
    return prisma.harvestOrder.findMany({
      where: { userId },
      select: {
        id: true,
        season: true,
        estimatedYieldKg: true,
        actualYieldKg: true,
        status: true,
        shippingPaymentStatus: true,
        shippingCostPaise: true,
        trackingNumber: true,
        courierPartner: true,
        shippingAddressLine1: true,
        shippingAddressLine2: true,
        shippingCity: true,
        shippingState: true,
        shippingPincode: true,
        shippingCountry: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 25,
    });
  } catch (error) {
    console.error("[getHarvestOrdersForUser]", error);
    return [];
  }
}
