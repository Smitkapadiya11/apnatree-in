import "server-only";

import { MediaType, type Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type MediaGalleryTile = {
  id: string;
  contractId: string;
  fileUrl: string;
  blurDataURL: string | null;
  caption: string | null;
  takenAt: string;
  mediaType: MediaType;
  isViewed: boolean;
};

export type MediaFilter = "all" | "photo" | "video";

export async function getMediaGalleryPage(opts: {
  userId: string;
  page: number;
  pageSize: number;
  filter: MediaFilter;
  contractId?: string;
}): Promise<{ items: MediaGalleryTile[]; total: number }> {
  const where: Prisma.MediaUpdateWhereInput = {
    contract: { userId: opts.userId },
    ...(opts.contractId ? { contractId: opts.contractId } : {}),
    ...(opts.filter === "photo" ? { mediaType: MediaType.PHOTO } : {}),
    ...(opts.filter === "video" ? { mediaType: MediaType.VIDEO } : {}),
  };

  try {
    const [rows, total] = await prisma.$transaction([
      prisma.mediaUpdate.findMany({
        where,
        select: {
          id: true,
          contractId: true,
          fileUrl: true,
          blurDataURL: true,
          caption: true,
          takenAt: true,
          mediaType: true,
          isViewed: true,
        },
        orderBy: { takenAt: "desc" },
        take: opts.pageSize,
        skip: (opts.page - 1) * opts.pageSize,
      }),
      prisma.mediaUpdate.count({ where }),
    ]);

    return {
      items: rows.map((row) => ({
        ...row,
        takenAt: row.takenAt.toISOString(),
      })),
      total,
    };
  } catch (error) {
    console.error("[getMediaGalleryPage]", error);
    return { items: [], total: 0 };
  }
}

export async function getUnreadMediaCount(userId: string): Promise<number> {
  try {
    return prisma.mediaUpdate.count({
      where: {
        contract: { userId },
        isViewed: false,
      },
    });
  } catch (error) {
    console.error("[getUnreadMediaCount]", error);
    return 0;
  }
}

export async function getContractsForMediaFilters(userId: string) {
  try {
    return prisma.contract.findMany({
      where: {
        userId,
        treeId: { not: null },
      },
      select: {
        id: true,
        contractNumber: true,
        tree: { select: { treeCode: true } },
      },
      take: 50,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[getContractsForMediaFilters]", error);
    return [];
  }
}
