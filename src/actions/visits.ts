"use server";

import { revalidatePath } from "next/cache";

import { addDays, format, startOfDay } from "date-fns";

import { ContractStatus, VisitStatus } from "@prisma/client";
import { z } from "zod";

import type { ActionResult } from "@/types/actions";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";
import { sendFarmVisitRequestEmail } from "@/lib/email";

const CAPACITY_PER_DAY = 10;

const visitRequestSchema = z.object({
  contractId: z.string().min(1),
  visitDate: z.coerce.date(),
  numberOfVisitors: z.coerce.number().int().min(1).max(6),
  notes: z.string().max(2000).optional().nullable(),
});

function confirmationCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]!;
  }
  return code;
}

export async function requestFarmVisit(input: unknown): Promise<ActionResult<{ confirmationCode: string }>> {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id || !session.user.email) {
      return { success: false, error: "Please sign in to request a visit." };
    }

    const parsed = visitRequestSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: "Please check your visit details." };
    }

    const { contractId, visitDate, numberOfVisitors, notes } = parsed.data;
    const userId = session.user.id;

    const contract = await prisma.contract.findFirst({
      where: {
        id: contractId,
        userId,
        status: ContractStatus.ACTIVE,
        treeId: { not: null },
      },
      select: { id: true },
    });

    if (!contract) {
      return { success: false, error: "No active steward contract found for this selection." };
    }

    const today = startOfDay(new Date());
    const earliest = addDays(today, 7);
    const dayStart = startOfDay(visitDate);

    if (dayStart < earliest) {
      return { success: false, error: "Please choose a date at least seven days from today." };
    }

    const visitYear = dayStart.getFullYear();
    const usedFree = await prisma.farmVisit.count({
      where: {
        userId,
        visitYear,
        usedFreeSlot: true,
      },
    });

    if (usedFree >= 3) {
      return {
        success: false,
        error: "You have used all 3 complimentary visits this calendar year. Contact us for paid visits.",
      };
    }

    const sameDay = await prisma.farmVisit.findMany({
      where: {
        status: { in: [VisitStatus.REQUESTED, VisitStatus.CONFIRMED] },
        visitDate: {
          gte: dayStart,
          lt: addDays(dayStart, 1),
        },
      },
      select: { numberOfVisitors: true },
    });

    const booked = sameDay.reduce((sum, row) => sum + row.numberOfVisitors, 0);
    if (booked + numberOfVisitors > CAPACITY_PER_DAY) {
      return {
        success: false,
        error: "That date has reached visitor capacity. Pick another day.",
      };
    }

    let code = confirmationCode();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const clash = await prisma.farmVisit.findUnique({
        where: { confirmationCode: code },
        select: { id: true },
      });
      if (!clash) break;
      code = confirmationCode();
    }

    await prisma.farmVisit.create({
      data: {
        contractId,
        userId,
        visitDate: dayStart,
        numberOfVisitors,
        status: VisitStatus.REQUESTED,
        notes: notes ?? undefined,
        confirmationCode: code,
        usedFreeSlot: true,
        visitYear,
      },
    });

    await sendFarmVisitRequestEmail({
      to: session.user.email,
      confirmationCode: code,
      visitDate: format(dayStart, "PPPP"),
      visitors: numberOfVisitors,
    });

    revalidatePath("/dashboard/visits");

    return { success: true, data: { confirmationCode: code } };
  } catch (error) {
    console.error("[requestFarmVisit]", error);
    return { success: false, error: "Could not submit visit request." };
  }
}
