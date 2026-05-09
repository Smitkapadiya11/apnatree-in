import { FarmStoryInner } from "@/components/marketing/FarmStoryInner";
import { FARM_MEDIA, getImage, getVideo } from "@/lib/farm-media";

export function FarmStorySection() {
  const videoSrc = getVideo("farm") ?? getVideo("trees");
  const fallbackPoster =
    FARM_MEDIA.images.farm.length > 0
      ? getImage(FARM_MEDIA.images.farm, 0)
      : getImage(FARM_MEDIA.images.hero, 0);

  return (
    <FarmStoryInner
      videoSrc={videoSrc}
      fallbackPoster={fallbackPoster}
      headline="Where every mango tastes like memory."
      paragraphs={[
        "Limestone dust lifts off the Gir ridge each dawn; our crews trace those breezes row by row, pairing laser-coded trunks with the renters who safeguard them.",
        "Bi-weekly films land straight inside your dashboard — proof that stewardship isn’t a slogan buried in fine print, but footage you can replay beside your morning chai.",
        "When harvest arrives, the same agronomists who narrated the canopy oversee packing manifests and courier handoffs — no anonymous middle mile.",
      ]}
      quote="Luxury, for us, is remembering which branch laughed in the monsoon wind."
      quoteAuthor="ApnaTree field narrative desk"
      quoteRole="Gir · Kesar stewardship ledger"
    />
  );
}
