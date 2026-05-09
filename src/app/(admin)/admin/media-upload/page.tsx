import { Suspense } from "react";

import { MediaUploadForm } from "@/components/admin/MediaUploadForm";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function AdminMediaUploadContent() {
  let contracts: {
    id: string;
    contractNumber: string;
    userName: string | null;
    treeId: string;
    treeCode: string;
  }[] = [];

  try {
    const rows = await prisma.contract.findMany({
      where: {
        treeId: { not: null },
      },
      select: {
        id: true,
        contractNumber: true,
        user: { select: { name: true } },
        tree: { select: { id: true, treeCode: true } },
      },
      take: 200,
      orderBy: { updatedAt: "desc" },
    });

    contracts = rows
      .filter((row): row is typeof row & { tree: NonNullable<typeof row.tree> } => Boolean(row.tree))
      .map((row) => ({
        id: row.id,
        contractNumber: row.contractNumber,
        userName: row.user.name,
        treeId: row.tree.id,
        treeCode: row.tree.treeCode,
      }));
  } catch (error) {
    console.error("[admin/media-upload]", error);
  }

  return <MediaUploadForm contracts={contracts} />;
}

export default function AdminMediaUploadPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="space-y-3">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Phase 3 portal</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight">Publish canopy proof</h1>
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          Pair UploadThing captures with contract metadata. Each publish notifies stewards instantly via Resend.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-10">
            <Skeleton className="h-14 w-full max-w-xl animate-pulse rounded-2xl" />
            <Skeleton className="h-48 w-full animate-pulse rounded-3xl" />
          </div>
        }
      >
        <AdminMediaUploadContent />
      </Suspense>
    </div>
  );
}
