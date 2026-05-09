import { HeroBackdrop } from "@/components/marketing/HeroBackdrop";
import { HeroBackgroundMedia } from "@/components/marketing/HeroBackgroundMedia";
import { HeroContent } from "@/components/marketing/HeroContent";
import { FARM_MEDIA, FARM_MEDIA_FALLBACKS } from "@/lib/farm-media";

export function HeroSection() {
  const videoSrc = FARM_MEDIA.hero.video;
  const fallbackImage = FARM_MEDIA.hero.fallbackImage ?? FARM_MEDIA_FALLBACKS.hero;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[color:var(--brand-forest)] text-white"
    >
      <div className="absolute inset-0">
        <HeroBackgroundMedia
          videoSrc={videoSrc}
          posterSrc={fallbackImage}
          posterAlt="Kesar mango orchard on the Gir limestone ridge — field photography from ApnaTree"
        />
        <HeroBackdrop />
      </div>

      <div className="relative container-luxe flex min-h-[100svh] flex-col justify-end pb-16 pt-32 sm:pt-40">
        <HeroContent />
      </div>
    </section>
  );
}
