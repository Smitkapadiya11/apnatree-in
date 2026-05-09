"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { ActionResult } from "@/types/actions";

import { prisma } from "@/lib/prisma";

const waitlistSchema = z.object({
  email: z.string().trim().email().max(320),
  name: z.string().trim().max(200).optional(),
  tier: z.enum(["SMALL", "MEDIUM", "LARGE"]),
});

export async function submitWaitlist(input: unknown): Promise<ActionResult<{ ok: true }>> {
  try {
    const parsed = waitlistSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: "Please enter a valid email and tier." };
    }

    const email = parsed.data.email.toLowerCase();
    const name = parsed.data.name && parsed.data.name.length > 0 ? parsed.data.name : null;

    await prisma.waitlist.upsert({
      where: { email },
      create: {
        email,
        name,
        tier: parsed.data.tier,
      },
      update: {
        name,
        tier: parsed.data.tier,
      },
    });

    revalidatePath("/");
    return { success: true, data: { ok: true } };
  } catch (error) {
    console.error("[submitWaitlist]", error);
    return { success: false, error: "We could not save that right now. Please try again shortly." };
  }
}
