import { MediaGrid } from "@/components/dashboard/media/MediaGrid";
import { MediaLightboxRoot } from "@/components/dashboard/media/MediaLightboxRoot";
import { MediaPagination } from "@/components/dashboard/media/MediaPagination";
import { getMediaGalleryPage, type MediaFilter } from "@/lib/queries/dashboard-media";

const PAGE_SIZE = 12;

export async function MediaGallerySection({
  userId,
  page,
  filter,
  contractId,
}: {
  userId: string;
  page: number;
  filter: MediaFilter;
  contractId?: string;
}) {
  const { items, total } = await getMediaGalleryPage({
    userId,
    page,
    pageSize: PAGE_SIZE,
    filter,
    contractId,
  });

  return (
    <div className="space-y-10">
      <MediaGrid tiles={items} page={page} filter={filter} contractId={contractId} />
      <MediaPagination page={page} pageSize={PAGE_SIZE} total={total} filter={filter} contractId={contractId} />
      <MediaLightboxRoot tiles={items} />
    </div>
  );
}
