import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-primary text-xs tracking-[0.35em] uppercase">Lost among the mangroves</p>
      <h1 className="font-[family-name:var(--font-heading)] text-5xl tracking-tight">404 — Grove not found</h1>
      <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
        The path you requested isn&apos;t mapped yet. Return home to continue exploring Gir&apos;s living orchards.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10 text-base")}>
        Return home
      </Link>
    </main>
  );
}
