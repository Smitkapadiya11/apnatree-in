import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TierNotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-24 text-center">
      <p className="font-[family-name:var(--font-heading)] text-5xl">404</p>
      <p className="text-muted-foreground text-lg">This tree tier path doesn&apos;t exist… yet.</p>
      <Link href="/trees" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10")}>
        Explore tiers
      </Link>
    </main>
  );
}
