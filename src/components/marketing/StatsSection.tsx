import { getCachedSiteConfigValue } from "@/lib/cache/queries";

import { StatsScene, type StatsQuote } from "@/components/marketing/StatsScene";
import { FARM_MEDIA, getImage, getVideo } from "@/lib/farm-media";

async function resolveStat(key: string, fallback: number) {
  const raw = await getCachedSiteConfigValue(key);
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

const QUOTE: StatsQuote = {
  body: "We don't mass-produce stewardship. Every Kesar tree gets a name, a number, and a phone call before harvest.",
  author: "Bharatbhai Solanki",
  role: "Lead orchard agronomist · 22 years in Gir",
};

export async function StatsSection() {
  const [trees, renters, visits, kgDelivered, groveYears] = await Promise.all([
    resolveStat("marketing_stat_trees", 150),
    resolveStat("marketing_stat_renters", 87),
    resolveStat("marketing_stat_visits_quota", 3),
    resolveStat("marketing_stat_kg_delivered", 4200),
    resolveStat("marketing_stat_grove_years", 12),
  ]);

  const videoSrc = getVideo("harvest") ?? getVideo("trees");
  const fallbackImage =
    FARM_MEDIA.images.harvest.length > 0
      ? getImage(FARM_MEDIA.images.harvest, 0)
      : getImage(FARM_MEDIA.gallery, 0);

  return (
    <StatsScene
      trees={trees}
      renters={renters}
      visits={visits}
      kgDelivered={kgDelivered}
      groveYears={groveYears}
      videoSrc={videoSrc}
      fallbackImage={fallbackImage}
      quote={QUOTE}
    />
  );
}
