"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background text-foreground flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div className="max-w-lg space-y-4">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Something shifted in the grove</p>
        <h2 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight">We couldn&apos;t render this moment.</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Please retry. If the issue persists, email support@apnatree.in with digest{" "}
          <span className="font-semibold">{error.digest ?? "n/a"}</span>.
        </p>
      </div>
      <Button type="button" onClick={() => reset()} className="rounded-full px-8">
        Try again
      </Button>
    </div>
  );
}
