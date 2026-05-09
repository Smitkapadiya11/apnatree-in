import { HeroCinematic } from "@/components/marketing/HeroCinematic";
import { FARM_MEDIA, FARM_MEDIA_FALLBACKS, getImage } from "@/lib/farm-media";

export function HeroSection() {
  const fallbackImage = FARM_MEDIA.hero.fallbackImage ?? FARM_MEDIA_FALLBACKS.hero;
  const heroVideo = FARM_MEDIA.hero.video ?? FARM_MEDIA.videos.hero;
  const posterImage = getImage(FARM_MEDIA.images.hero, 0);
  const storyClip =
    FARM_MEDIA.videos.all.length > 1 ? FARM_MEDIA.videos.all[1] : FARM_MEDIA.videos.all[0] ?? null;

  return (
    <HeroCinematic heroVideo={heroVideo} fallbackImage={fallbackImage} posterImage={posterImage} storyVideo={storyClip} />
  );
}
