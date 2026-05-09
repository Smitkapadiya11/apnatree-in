import { HowItWorksScene } from "@/components/marketing/HowItWorksScene";
import { FARM_MEDIA, getImage, getVideo } from "@/lib/farm-media";

export function HowItWorksSection() {
  const videoSrc = getVideo("trees") ?? getVideo("farm");
  const posterSrc = getImage(FARM_MEDIA.images.trees.all, 0);

  return <HowItWorksScene videoSrc={videoSrc} posterSrc={posterSrc} />;
}

export { HowItWorksSection as HowItWorksHome };
