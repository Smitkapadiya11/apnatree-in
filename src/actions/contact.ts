"use server";

import { z } from "zod";

import type { ActionResult } from "@/types/actions";

import { sendContactSubmissionEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(40).optional().nullable(),
  message: z.string().min(10).max(8000),
});

const SUPPORT_INBOX = "support@apnatree.in";

export async function submitContactForm(input: unknown): Promise<ActionResult<{ id: string }>> {
  try {
    const parsed = contactSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: "Please complete every field with a thoughtful message." };
    }

    const row = await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        message: parsed.data.message,
      },
      select: { id: true },
    });

    await sendContactSubmissionEmail({
      to: SUPPORT_INBOX,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
    });

    return { success: true, data: { id: row.id } };
  } catch (error) {
    console.error("[submitContactForm]", error);
    return { success: false, error: "We could not deliver that note just yet." };
  }
}
