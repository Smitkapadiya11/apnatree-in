import type { Metadata } from "next";
import Image from "next/image";

import { FARM_MEDIA, FARM_MEDIA_FALLBACKS } from "@/lib/farm-media";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About",
  description: "Origins of ApnaTree — stewarding authentic Kesar genetics inside Gujarat's Gir Forest buffer.",
};

export default function AboutPage() {
  const galleryPool = FARM_MEDIA.gallery.length > 0
    ? FARM_MEDIA.gallery
    : Array.from({ length: 5 }, () => FARM_MEDIA_FALLBACKS.gallery);
  const hero = FARM_MEDIA.hero.fallbackImage ?? galleryPool[0] ?? FARM_MEDIA_FALLBACKS.hero;
  const gallery = galleryPool.slice(0, 4);

  return (
    <article className="space-y-20 pb-20">
      <section className="relative isolate min-h-[480px] overflow-hidden">
        <Image
          src={hero}
          alt="Sunrise mist across Gir orchard terraces"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-premium)" }} />
        <div className="container-luxe relative flex flex-col gap-4 py-28 text-white">
          <p className="eyebrow text-[color:var(--brand-gold-light)]">Our story</p>
          <h1 className="font-[family-name:var(--font-heading)] text-balance text-4xl tracking-tight sm:text-5xl">
            Gir limestone · monsoon-fed · steward-led.
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-relaxed text-[color-mix(in_oklab,white_82%,transparent)]">
            ApnaTree exists so urban families can anchor capital into living orchards instead of speculative crates. Every contract ties to a coded tree,
            measured yields, and concierge-grade logistics without diluting farmer dignity.
          </p>
        </div>
      </section>

      <section className="container-luxe grid gap-10 sm:grid-cols-2">
        <div className="space-y-4">
          <p className="eyebrow">Operating thesis</p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight text-[color:var(--brand-forest)]">
            Radical traceability
          </h2>
          <p className="text-[color:var(--muted-foreground)] leading-relaxed">
            Stripe handles treasury rails, UploadThing stores immutable proof, Prisma models every lifecycle edge — no spreadsheets masquerading as truth.
          </p>
        </div>
        <blockquote className="border-l-4 border-[color:var(--brand-gold)]/60 pl-6 font-[family-name:var(--font-heading)] text-2xl leading-snug text-[color:var(--brand-forest)]">
          “Luxury is knowing the rain that touched your fruit.”
        </blockquote>
      </section>

      <section className="container-luxe">
        <div className="mb-8 flex flex-col gap-2 text-center">
          <p className="eyebrow">The farm</p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight text-[color:var(--brand-forest)]">
            Gallery · limestone ridges
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {gallery.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--brand-gold)]/15"
            >
              <Image
                src={src}
                alt="Farm corridor along Gir buffer forests"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe">
        <p className="eyebrow">Map note</p>
        <p className="text-[color:var(--muted-foreground)] mt-3 max-w-3xl leading-relaxed">
          Static photography replaces embedded maps for Core Web Vitals — navigate to Talala Taluka (Gir Somnath) for geographic reference while we finalize illustration assets.
        </p>
      </section>
    </article>
  );
}
