import { getUnreadMediaCount } from "@/lib/queries/dashboard-media";

export async function UnreadMediaBadge({ userId }: { userId: string }) {
  const count = await getUnreadMediaCount(userId);

  if (!count) {
    return <span className="text-muted-foreground text-xs tracking-[0.35em] uppercase">All caught up</span>;
  }

  return (
    <span className="border-[#c8972a]/40 text-foreground inline-flex min-h-11 items-center rounded-full border bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] px-4 text-sm font-semibold">
      {count} unseen {count === 1 ? "moment" : "moments"}
    </span>
  );
}
