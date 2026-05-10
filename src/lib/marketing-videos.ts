/**
 * Client-safe video URLs under `/public/media` (segment-encoded filenames).
 * Uses assets already in the repo — swap for CDN URLs in production if desired.
 */

function media(file: string) {
  return `/media/${encodeURIComponent(file)}`;
}

export const MARKETING_VIDEOS = {
  heroDrone: media("Drone_flying_over_mango_orchard_202605042346.mp4"),
  girSunrise: media("Gir_forest_landscape_at_sunrise_202605042349.mp4"),
  mangoGrowth: media("Mango_tree_growing_in_India_202605042329.mp4"),
  harvestSlice: media("Kesar_mangoes_slicing_juicy_pulp_202605042330.mp4"),
  hangingFruit: media("Kesar_mangoes_hanging_on_tree_202605042349.mp4"),
  pondWalk: media("Animals_drinking_at_water_pond_202605042346.mp4"),
} as const;
