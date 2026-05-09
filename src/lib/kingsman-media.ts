/** Encoded public URLs for marketing imagery (handles filenames with spaces). */

export const KINGSMAN_MEDIA = {
  aerialHero: `/media/${encodeURIComponent("Ultra_realistic_cinematic_aerial_shot_202605042327.jpeg")}`,
  grove551: "/media/20260503_093551.jpg",
  grove553: "/media/20260503_093553.jpg",
  grove555: "/media/20260503_093555.jpg",
  grove533: "/media/20260503_094533.jpg",
  grove0320: "/media/20260503_110320.jpg",
} as const;

export const CHRONICLE_PANELS = [
  {
    src: KINGSMAN_MEDIA.grove551,
    title: "The Limestone Ridge",
    subtitle: "Where ancient soil meets monsoon memory",
    k: "01",
  },
  {
    src: KINGSMAN_MEDIA.grove553,
    title: "The Canopy",
    subtitle: "Fourteen-year shade that remembers every drought",
    k: "02",
  },
  {
    src: KINGSMAN_MEDIA.grove555,
    title: "First Fruit",
    subtitle: "Kesar signals readiness through colour, not calendar",
    k: "03",
  },
  {
    src: KINGSMAN_MEDIA.grove533,
    title: "The Harvest Day",
    subtitle: "Our agronomist marks each tree at peak brix",
    k: "04",
  },
  {
    src: KINGSMAN_MEDIA.grove0320,
    title: "Your Doorstep",
    subtitle: "Crate-to-counter in 36 hours from cut",
    k: "05",
  },
] as const;
