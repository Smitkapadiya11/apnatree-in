import "server-only";

import { addDays, format, startOfDay } from "date-fns";

import { ContractStatus, VisitStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const CAPACITY_PER_DAY = 10;

/** UTC date keys `yyyy-MM-dd` where REQUESTED + CONFIRMED visitors already meet daily capacity. */
export async function getFullyBookedVisitDateKeys(): Promise<string[]> {
  try {
    const start = startOfDay(new Date());
    const end = addDays(start, 370);

    const visits = await prisma.farmVisit.findMany({
      where: {
        status: { in: [VisitStatus.REQUESTED, VisitStatus.CONFIRMED] },
        visitDate: { gte: start, lte: end },
      },
      select: {
        visitDate: true,
        numberOfVisitors: true,
      },
    });

    const totals = new Map<string, number>();
    for (const row of visits) {
      const key = format(startOfDay(row.visitDate), "yyyy-MM-dd");
      totals.set(key, (totals.get(key) ?? 0) + row.numberOfVisitors);
    }

    return [...totals.entries()].filter(([, total]) => total >= CAPACITY_PER_DAY).map(([key]) => key);
  } catch (error) {
    console.error("[getFullyBookedVisitDateKeys]", error);
    return [];
  }
}

export async function getUsedFreeVisitCount(userId: string, visitYear: number): Promise<number> {
  try {
    return prisma.farmVisit.count({
      where: {
        userId,
        visitYear,
        usedFreeSlot: true,
      },
    });
  } catch (error) {
    console.error("[getUsedFreeVisitCount]", error);
    return 0;
  }
}

export async function getActiveContractsForVisits(userId: string) {
  try {
    return prisma.contract.findMany({
      where: {
        userId,
        status: ContractStatus.ACTIVE,
        treeId: { not: null },
      },
      select: {
        id: true,
        contractNumber: true,
        tree: { select: { treeCode: true } },
      },
      take: 10,
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    console.error("[getActiveContractsForVisits]", error);
    return [];
  }
}

export async function listFarmVisitsForUser(userId: string) {
  try {
    const now = startOfDay(new Date());

    const [upcoming, past] = await Promise.all([
      prisma.farmVisit.findMany({
        where: {
          userId,
          visitDate: { gte: now },
          status: { not: VisitStatus.CANCELLED },
        },
        select: {
          id: true,
          visitDate: true,
          numberOfVisitors: true,
          status: true,
          confirmationCode: true,
          notes: true,
        },
        orderBy: { visitDate: "asc" },
        take: 20,
      }),
      prisma.farmVisit.findMany({
        where: {
          userId,
          visitDate: { lt: now },
        },
        select: {
          id: true,
          visitDate: true,
          numberOfVisitors: true,
          status: true,
          confirmationCode: true,
        },
        orderBy: { visitDate: "desc" },
        take: 20,
      }),
    ]);

    return { upcoming, past };
  } catch (error) {
    console.error("[listFarmVisitsForUser]", error);
    return { upcoming: [], past: [] };
  }
}
