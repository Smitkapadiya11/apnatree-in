"use server";

import { revalidatePath } from "next/cache";

import { MediaType, UserRole } from "@prisma/client";
import { UTApi } from "uploadthing/server";
import { z } from "zod";

import type { ActionResult } from "@/types/actions";

import { generateBlurPlaceholder } from "@/lib/blur-placeholder";
import { sendNewMediaUpdateEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";

const mediaRowSchema = z.object({
  fileUrl: z.string().url(),
  uploadThingKey: z.string().min(1),
  mediaType: z.nativeEnum(MediaType),
  caption: z.string().max(5000).optional().nullable(),
  takenAt: z.coerce.date(),
});

const createMediaUpdateSchema = z.object({
  contractId: z.string().min(1),
  treeId: z.string().min(1),
  items: z.array(mediaRowSchema).min(1).max(10),
});

export async function createMediaUpdate(input: unknown): Promise<ActionResult<{ created: number }>> {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return { success: false, error: "Please sign in to continue." };
    }

    const role = session.user.role;
    if (role !== UserRole.ADMIN && role !== UserRole.FIELD_AGENT) {
      return { success: false, error: "You do not have permission to publish media." };
    }

    const parsed = createMediaUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: "Invalid media payload." };
    }

    const { contractId, treeId, items } = parsed.data;

    const contract = await prisma.contract.findFirst({
      where: {
        id: contractId,
        treeId,
      },
      select: {
        id: true,
        user: { select: { email: true, name: true } },
      },
    });

    if (!contract?.user.email) {
      return { success: false, error: "Contract or steward email could not be resolved." };
    }

    const uploadedBy = session.user.id;

    const enriched = await Promise.all(
      items.map(async (item) => ({
        ...item,
        blurDataURL:
          item.mediaType === MediaType.PHOTO ? (await generateBlurPlaceholder(item.fileUrl)) ?? null : null,
      }))
    );

    const rows = await prisma.$transaction(
      enriched.map((item) =>
        prisma.mediaUpdate.create({
          data: {
            contractId,
            treeId,
            uploadedBy,
            mediaType: item.mediaType,
            fileUrl: item.fileUrl,
            uploadThingKey: item.uploadThingKey,
            caption: item.caption ?? null,
            takenAt: item.takenAt,
            blurDataURL: item.blurDataURL,
          },
          select: { id: true },
        })
      )
    );

    await sendNewMediaUpdateEmail({
      to: contract.user.email,
      caption: items[0]?.caption ?? null,
      count: items.length,
    });

    revalidatePath("/dashboard/media");

    return { success: true, data: { created: rows.length } };
  } catch (error) {
    console.error("[createMediaUpdate]", error);
    return { success: false, error: "Could not save media updates." };
  }
}

export async function deleteMediaUpdate(id: string): Promise<ActionResult<void>> {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      return { success: false, error: "Admin access required." };
    }

    const existing = await prisma.mediaUpdate.findUnique({
      where: { id },
      select: { uploadThingKey: true },
    });

    if (!existing) {
      return { success: false, error: "Media not found." };
    }

    if (existing.uploadThingKey) {
      const utapi = new UTApi();
      try {
        await utapi.deleteFiles(existing.uploadThingKey);
      } catch (error) {
        console.error("[deleteMediaUpdate] UploadThing delete failed", error);
      }
    }

    await prisma.mediaUpdate.delete({ where: { id } });

    revalidatePath("/dashboard/media");

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[deleteMediaUpdate]", error);
    return { success: false, error: "Could not delete media." };
  }
}

export async function markMediaAsViewed(id: string): Promise<ActionResult<void>> {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.mediaUpdate.updateMany({
      where: {
        id,
        contract: { userId: session.user.id },
      },
      data: { isViewed: true },
    });

    revalidatePath("/dashboard/media");

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[markMediaAsViewed]", error);
    return { success: false, error: "Could not mark media as viewed." };
  }
}
