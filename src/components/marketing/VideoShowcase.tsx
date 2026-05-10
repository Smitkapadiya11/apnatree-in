"use client";

import { MARKETING_VIDEOS } from "@/lib/marketing-videos";
import { KINGSMAN_MEDIA } from "@/lib/kingsman-media";

const VIDEOS = [
  {
    src: MARKETING_VIDEOS.heroDrone,
    poster: KINGSMAN_MEDIA.aerialHero,
    label: "Grove Chronicles · Season 1",
    title: "The Kesar canopy at dawn",
    span: true as const,
  },
  {
    src: MARKETING_VIDEOS.harvestSlice,
    poster: KINGSMAN_MEDIA.grove533,
    label: "Harvest Week",
    title: "First pick of the season",
  },
  {
    src: MARKETING_VIDEOS.pondWalk,
    poster: KINGSMAN_MEDIA.grove555,
    label: "Tree stewardship · Weekly",
    title: "Morning rounds on the ridge",
  },
];

export function VideoShowcase() {
  return (
    <section
      aria-labelledby="video-showcase-heading"
      className="relative overflow-hidden bg-[#060503]"
      style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,4rem)" }}
    >
      <div className="mx-auto max-w-[1240px]">
        <p
          className="mb-5 uppercase tracking-[0.18em] text-[color:var(--gold-primary)]"
          style={{ fontSize: "0.65rem", fontFamily: "var(--font-body)" }}
        >
          The living grove
        </p>
        <h2
          id="video-showcase-heading"
          className="mb-3 font-light text-[color:var(--brand-cream)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.4rem,5vw,4.2rem)",
            lineHeight: 1.1,
          }}
        >
          Watch your tree
          <br />
          through every season.
        </h2>
        <p className="mb-14 max-w-[520px] text-[rgba(253,252,248,0.48)]" style={{ fontSize: "0.95rem" }}>
          From blossom to box — your tree filmed, documented, and delivered. Every season has a story.
        </p>

        <div className="vs-grid grid gap-5 md:grid-cols-2">
          {VIDEOS.map((v, i) => (
            <VideoCard key={`${v.src}-${i}`} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  src,
  poster,
  label,
  title,
  span,
}: {
  src: string;
  poster?: string;
  label: string;
  title: string;
  span?: boolean;
}) {
  return (
    <div
      className={`vs-card-span group relative aspect-video cursor-pointer overflow-hidden rounded-[5px] border border-[rgba(184,145,42,0.12)] bg-[#0f0c07] transition-[border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(184,145,42,0.4)] ${span ? "md:col-span-2 md:aspect-[21/9]" : ""}`}
      onClick={(e) => {
        const vid = e.currentTarget.querySelector("video");
        if (!vid) return;
        void (vid.paused ? vid.play() : vid.pause());
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        const vid = e.currentTarget.querySelector("video");
        if (!vid) return;
        void (vid.paused ? vid.play() : vid.pause());
      }}
      role="button"
      tabIndex={0}
      aria-label={`Play or pause: ${title}`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
        style={{ filter: "brightness(0.72) saturate(1.1)" }}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: "65%",
          background: "linear-gradient(to top, rgba(6,5,3,0.95) 0%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 p-6">
        <span className="mb-2 block uppercase tracking-[0.15em] text-[color:var(--gold-primary)]" style={{ fontSize: "0.58rem" }}>
          {label}
        </span>
        <strong
          className="block font-light text-[color:var(--brand-cream)]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1rem,2vw,1.5rem)",
          }}
        >
          {title}
        </strong>
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(184,145,42,0.8)] backdrop-blur-[6px] transition-transform duration-300 group-hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}
