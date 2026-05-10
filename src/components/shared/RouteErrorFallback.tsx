"use client";

import Link from "next/link";
import { useEffect } from "react";

type RouteErrorFallbackProps = {
  error: Error & { digest?: string };
  reset: () => void;
  homeHref?: string;
  homeLabel?: string;
};

export function RouteErrorFallback({
  error,
  reset,
  homeHref = "/",
  homeLabel = "RETURN TO HOME",
}: RouteErrorFallbackProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("[Error Boundary]", error);
    }
  }, [error]);

  const digest = error.digest;
  const showDigest = Boolean(digest && digest !== "n/a");

  return (
    <main
      className="flex min-h-[100svh] flex-col items-center justify-center px-8 py-16 text-center"
      style={{ background: "var(--obsidian-950)" }}
    >
      <p className="font-km-mono text-[0.65rem] tracking-[0.28em] text-[color:var(--gold-light)]">
        SOMETHING WENT WRONG IN THE GROVE.
      </p>

      <h1
        className="mt-6 max-w-xl font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] font-light leading-snug text-[color:var(--ivory-50)]"
      >
        We&apos;ll steady the branches.
      </h1>

      {showDigest ? (
        <p className="font-km-mono mt-8 text-[0.65rem] tracking-[0.1em] text-[color:rgba(253,252,248,0.2)]">
          REF: {digest}
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="font-km-mono rounded-[4px] bg-[color:var(--gold-primary)] px-7 py-3.5 text-[0.65rem] tracking-[0.2em] text-[color:var(--obsidian-950)] transition-colors hover:bg-[color:var(--gold-pale)]"
        >
          TRY AGAIN
        </button>
        <Link
          href={homeHref}
          className="font-km-mono rounded-[4px] border border-[color:rgba(253,252,248,0.22)] px-7 py-3.5 text-[0.65rem] tracking-[0.2em] text-[color:var(--ivory-50)] transition-colors hover:border-[color:rgba(253,252,248,0.45)]"
        >
          {homeLabel}
        </Link>
      </div>
    </main>
  );
}
