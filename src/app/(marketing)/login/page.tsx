"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center gap-8 px-4 py-24 sm:px-6">
      <div className="space-y-3 text-center">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Welcome back</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight">Enter your grove dashboard</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Sign in with Google to manage contracts, media drops, visits, and harvest logistics.
        </p>
      </div>

      <Button type="button" size="lg" className="w-full rounded-full py-6 text-base font-semibold" onClick={() => signIn("google")}>
        Continue with Google
      </Button>
    </section>
  );
}
