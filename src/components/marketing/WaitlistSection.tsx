"use client";

import * as React from "react";

import { submitWaitlist } from "@/actions/waitlist";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";

type Status = "idle" | "success" | "error";

export function WaitlistSection() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [tier, setTier] = React.useState("MEDIUM");
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState<string>("");
  const [pending, startTransition] = React.useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setStatus("idle");
    startTransition(async () => {
      const result = await submitWaitlist({
        email,
        name: name.trim() || undefined,
        tier,
      });
      if (result.success) {
        setStatus("success");
        setMessage(
          "You're on the canopy memo. A concierge agent will reach out before the next batch opens."
        );
        setEmail("");
        setName("");
        return;
      }
      setStatus("error");
      setMessage(result.error);
    });
  };

  return (
    <section
      id="waitlist"
      className="relative section-luxe overflow-hidden text-[color:var(--brand-cream)]"
      style={{ background: "var(--gradient-hero)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 70% 30%, color-mix(in oklab, var(--brand-gold-light) 28%, transparent), transparent 60%)",
        }}
      />

      <ScrollReveal className="container-luxe relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="eyebrow text-[color:var(--brand-gold-light)]">Concierge desk</p>
          <h2 className="font-[family-name:var(--font-heading)] text-balance text-4xl tracking-tight sm:text-5xl">
            Reserve a spot for the next allotment
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-[color:var(--brand-cream)]/80 sm:text-lg">
            We open trees in small batches to honour the soil. Drop your email and a concierge agent will reach out the next time canopy opens.
          </p>
          <ul className="grid grid-cols-2 gap-3 text-sm text-[color:var(--brand-cream)]/85">
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="block text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold-light)]">No spam</span>
              <span className="mt-1 block">One email per cycle</span>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="block text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold-light)]">Honest pacing</span>
              <span className="mt-1 block">Capacity-led, never oversold</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-[var(--radius-2xl)] border border-white/15 bg-black/25 p-6 backdrop-blur-md sm:p-8"
          aria-describedby="waitlist-status"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--brand-cream)]/80">Name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-touch rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-[color:var(--brand-gold)] focus:outline-none"
                placeholder="What we should call you"
                autoComplete="name"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--brand-cream)]/80">Tier interest</span>
              <select
                value={tier}
                onChange={(event) => setTier(event.target.value)}
                className="min-touch rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white focus:border-[color:var(--brand-gold)] focus:outline-none"
              >
                <option value="SMALL">Small · 3-year tree</option>
                <option value="MEDIUM">Medium · 5-year tree</option>
                <option value="LARGE">Large · 8-year tree</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--brand-cream)]/80">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="min-touch rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-[color:var(--brand-gold)] focus:outline-none"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <PremiumButton
            type="submit"
            tone="gold"
            size="lg"
            loading={pending}
            className="w-full"
          >
            {status === "success" ? "On the memo" : "Join the canopy memo"}
          </PremiumButton>

          <p
            id="waitlist-status"
            role="status"
            aria-live="polite"
            className={cn(
              "text-sm leading-relaxed transition-colors duration-300",
              status === "error" && "text-[color:var(--brand-gold-light)]",
              status === "success" && "text-[color:var(--brand-cream)]"
            )}
          >
            {message ||
              "We never sell your address. We barely send emails — only when canopy opens or harvest closes."}
          </p>
        </form>
      </ScrollReveal>
    </section>
  );
}
