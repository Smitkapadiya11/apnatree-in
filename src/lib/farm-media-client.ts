/**
 * Client-safe media paths — no `fs`, safe for `"use client"` imports.
 * Mirrors confirmed assets under `public/media/`.
 */

const AERIAL = `/media/${encodeURIComponent("Ultra_realistic_cinematic_aerial_shot_202605042327.jpeg")}`;

export const MEDIA = {
  images: {
    hero: [AERIAL, "/media/20260503_093551.jpg", "/media/20260503_093553.jpg"],
    farm: [
      "/media/20260503_093551.jpg",
      "/media/20260503_093553.jpg",
      "/media/20260503_093555.jpg",
      "/media/20260503_094533.jpg",
      "/media/20260503_110320.jpg",
    ],
    trees: {
      small: AERIAL,
      medium: "/media/20260503_093551.jpg",
      large: "/media/20260503_093553.jpg",
    },
    testimonial: "/media/20260503_093551.jpg",
  },
  videos: {
    hero: null as string | null,
    farm: null as string | null,
    harvest: null as string | null,
  },
} as const;
