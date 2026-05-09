import { MediaFilters } from "@/components/dashboard/media/MediaFilters";
import { getContractsForMediaFilters } from "@/lib/queries/dashboard-media";

export async function MediaFiltersSection({ userId }: { userId: string }) {
  const contracts = await getContractsForMediaFilters(userId);

  return (
    <MediaFilters
      contracts={contracts.map((row) => ({
        id: row.id,
        contractNumber: row.contractNumber,
        treeCode: row.tree?.treeCode ?? null,
      }))}
    />
  );
}
