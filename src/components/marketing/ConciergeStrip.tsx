"use client";

import * as React from "react";

import { submitConciergeCallRequest } from "@/actions/waitlist";

type Status = "idle" | "success" | "error";

export function ConciergeStrip() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState("");
  const [pending, startTransition] = React.useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setStatus("idle");
    startTransition(async () => {
      const result = await submitConciergeCallRequest({ email });
      if (result.success) {
        setStatus("success");
        setMessage(
          result.data.offline
            ? "Request noted. Database is offline — email concierge@apnatree.in directly and we will reply within one business day."
            : "Concierge will reach out within one business day."
        );
        setEmail("");
        return;
      }
      setStatus("error");
      setMessage(result.error);
    });
  };

  return (
    <section className="border-y border-[color:rgba(184,145,42,0.35)] bg-[var(--forest-rich)] px-[clamp(1.5rem,5vw,4rem)] py-16">
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <p className="font-km-mono text-[0.62rem] tracking-[0.26em] text-[color:var(--gold-light)]">LIVE CONCIERGE</p>
          <h3 className="font-[family-name:var(--font-heading)] text-[2.5rem] font-light text-[color:var(--ivory-50)]">
            Speak with Bharatbhai.
          </h3>
          <p className="max-w-md font-[family-name:var(--font-body)] text-[0.9rem] font-light leading-relaxed text-[color:rgba(253,252,248,0.72)]">
            Our lead agronomist takes calls before you commit. Twenty-two years in Gir. He answers the questions no brochure
            can.
          </p>
          <div className="space-y-2 font-km-mono text-[0.65rem] tracking-[0.12em] text-[color:rgba(253,252,248,0.45)]">
            <p>+91 285 123 4567 · MON–SAT 9AM–7PM IST</p>
            <p>concierge@apnatree.in</p>
          </div>
        </div>

        <div className="rounded-[8px] border border-[color:rgba(253,252,248,0.1)] bg-[rgba(255,255,255,0.04)] p-8 md:p-10">
          <p className="font-km-mono text-[0.6rem] tracking-[0.22em] text-[color:var(--gold-light)]">SCHEDULE A CALL</p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4" aria-live="polite">
            <label className="block font-km-mono text-[0.55rem] tracking-[0.14em] text-[color:rgba(253,252,248,0.45)]">
              EMAIL
              <input
                type="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="mt-2 w-full rounded-[6px] border border-[color:rgba(253,252,248,0.14)] bg-[rgba(5,8,10,0.35)] px-4 py-3 font-[family-name:var(--font-body)] text-sm text-[color:var(--ivory-50)] outline-none focus:border-[color:var(--gold-primary)]"
                placeholder="you@domain.com"
                autoComplete="email"
              />
            </label>
            <button
              type="submit"
              disabled={pending}
              data-cursor="hover"
              className="font-km-mono w-full rounded-[4px] bg-[color:var(--gold-primary)] py-3.5 text-[0.62rem] tracking-[0.22em] text-[color:var(--obsidian-950)] transition-colors hover:bg-[color:var(--gold-pale)] disabled:opacity-60"
            >
              {pending ? "SENDING…" : "REQUEST CALL"}
            </button>
            {status !== "idle" ? (
              <p
                className={`font-km-mono text-[0.58rem] tracking-[0.08em] ${
                  status === "success" ? "text-[color:var(--gold-light)]" : "text-[color:#f6a08e]"
                }`}
              >
                {message}
              </p>
            ) : null}
          </form>

          <a
            href="https://wa.me/912851234567"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="font-km-mono mt-8 flex w-full items-center justify-center rounded-[4px] border border-[color:rgba(37,211,102,0.45)] bg-[rgba(37,211,102,0.08)] py-3 text-[0.62rem] tracking-[0.18em] text-[color:#b9f5cf] transition-colors hover:border-[color:rgba(37,211,102,0.85)]"
          >
            CONNECT ON WHATSAPP →
          </a>
        </div>
      </div>
    </section>
  );
}
