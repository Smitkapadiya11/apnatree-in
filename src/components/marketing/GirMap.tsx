/**
 * Stylised locator map — no third-party map tiles or API keys.
 */
export function GirMap() {
  return (
    <figure
      className="relative overflow-hidden rounded-[6px] border border-[rgba(184,145,42,0.18)] bg-[var(--obsidian-900)]"
      style={{ aspectRatio: "4/3" }}
      aria-label="Illustrated map of Gujarat highlighting the Gir Somnath corridor"
    >
      <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-hidden>
        <defs>
          <linearGradient id="girSea" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1409" />
            <stop offset="100%" stopColor="#0d0a06" />
          </linearGradient>
          <linearGradient id="girLand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#243828" />
            <stop offset="100%" stopColor="#142018" />
          </linearGradient>
          <radialGradient id="girGlow" cx="72%" cy="58%" r="35%">
            <stop offset="0%" stopColor="rgba(184,145,42,0.35)" />
            <stop offset="100%" stopColor="rgba(184,145,42,0)" />
          </radialGradient>
        </defs>

        <rect width="400" height="300" fill="url(#girSea)" />

        <path
          fill="url(#girLand)"
          stroke="rgba(184,145,42,0.22)"
          strokeWidth="1"
          d="M48 42 L340 28 L372 96 L358 188 L312 248 L180 278 L72 242 L28 156 Z"
        />

        <ellipse cx="295" cy="175" rx="120" ry="90" fill="url(#girGlow)" />

        <circle cx="278" cy="168" r="5.5" fill="rgba(184,145,42,0.95)" stroke="rgba(253,252,248,0.35)" strokeWidth="1" />
        <circle cx="278" cy="168" r="14" fill="none" stroke="rgba(184,145,42,0.25)" strokeWidth="1" />

        <path
          d="M278 168 L305 92"
          stroke="rgba(253,252,248,0.18)"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          fill="none"
        />

        <text x="312" y="82" fill="rgba(253,252,248,0.38)" fontSize="9" fontFamily="var(--font-body), sans-serif" letterSpacing="0.12em">
          ARABIAN SEA
        </text>
        <text x="62" y="268" fill="rgba(253,252,248,0.28)" fontSize="8" fontFamily="var(--font-body), sans-serif" letterSpacing="0.18em">
          GUJARAT · WESTERN INDIA
        </text>
      </svg>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-5">
        <div
          className="rounded px-4 py-2 text-center shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          style={{
            background: "rgba(6,5,4,0.88)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(184,145,42,0.28)",
          }}
        >
          <p className="uppercase tracking-[0.12em] text-[color:var(--gold-primary)]" style={{ fontSize: "0.55rem" }}>
            ApnaTree grove
          </p>
          <p className="mt-0.5 text-[color:var(--brand-cream)]" style={{ fontSize: "0.72rem" }}>
            Gir Forest buffer · Talala corridor
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
