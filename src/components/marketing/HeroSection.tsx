import Image from "next/image";

import { HeroBackdrop } from "@/components/marketing/HeroBackdrop";
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
        <div className="absolute inset-0 md:hidden">
          <Image
            src={fallbackImage}
            alt="Golden hour across the Gir orchard canopy"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          {videoSrc ? (
            <video
              className="size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              poster={fallbackImage}
            >
              <source src={videoSrc} type={videoSrc.endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
            </video>
          ) : (
            <Image
              src={fallbackImage}
              alt="Golden hour across the Gir orchard canopy"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>
        <HeroBackdrop />
      </div>

      <div className="relative container-luxe flex min-h-[100svh] flex-col justify-end pb-16 pt-32 sm:pt-40">
        <HeroContent />
      </div>
    </section>
  );
}
