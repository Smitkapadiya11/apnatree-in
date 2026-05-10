import { MARKETING_VIDEOS } from "@/lib/marketing-videos";

export function VideoStrip() {
  return (
    <section
      aria-label="Gir Forest grove cinematography"
      className="relative overflow-hidden"
      style={{ height: "clamp(200px, 30vw, 420px)", background: "#040302" }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.52) saturate(1.2) contrast(1.05)" }}
      >
        <source src={MARKETING_VIDEOS.heroDrone} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to right,
            rgba(4,3,2,0.88) 0%,
            rgba(4,3,2,0.0) 38%,
            rgba(4,3,2,0.0) 62%,
            rgba(4,3,2,0.88) 100%
          )`,
        }}
      />

      <div className="absolute inset-0 z-20 flex items-center" style={{ padding: "0 clamp(1.5rem,5vw,4rem)" }}>
        <div>
          <p
            className="mb-4 uppercase tracking-[0.18em] text-[color:var(--gold-primary)]"
            style={{ fontSize: "0.6rem", fontFamily: "var(--font-body)" }}
          >
            Gir Forest buffer zone · Gujarat
          </p>
          <h3
            className="font-light text-[color:var(--brand-cream)]"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.7rem,4vw,3.2rem)",
              lineHeight: 1.15,
              maxWidth: "520px",
            }}
          >
            22 years of roots.
            <br />
            One season at a time.
          </h3>
        </div>
      </div>
    </section>
  );
}
