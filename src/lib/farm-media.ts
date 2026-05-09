import "server-only";

import fs from "fs";
import path from "path";

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const MEDIA_ROOT = path.join(PUBLIC_ROOT, "media");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".mov", ".webm", ".m4v"]);
const SKIP_EXT = new Set([".md", ".py", ".txt", ".gitkeep"]);

const FALLBACK_HERO_IMAGE = "/media/farm/_placeholder-hero.svg";
const FALLBACK_GALLERY_IMAGE = "/media/farm/_placeholder-gallery.svg";

export type VideoSlotKey = "hero" | "trees" | "harvest" | "farm";

type FileEntry = {
  abs: string;
  rel: string;
  url: string;
  ext: string;
  subfolder: string;
  base: string;
};

function toPublicUrl(abs: string): string {
  const rel = path.relative(PUBLIC_ROOT, abs).replace(/\\/g, "/");
  const segments = rel.split("/").filter(Boolean);
  return `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

function listFilesRecursive(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  const stack: string[] = [dir];
  while (stack.length) {
    const current = stack.pop() as string;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile()) {
        if (entry.name.startsWith("_")) continue;
        if (/\s\(1\)\./i.test(entry.name)) continue;
        out.push(full);
      }
    }
  }
  return out;
}

function toEntry(abs: string): FileEntry {
  const rel = path.relative(MEDIA_ROOT, abs).replace(/\\/g, "/");
  const segments = rel.split("/");
  const subfolder = segments.length > 1 ? segments[0].toLowerCase() : "";
  const ext = path.extname(abs).toLowerCase();
  const base = path.basename(abs, ext).toLowerCase();
  const url = toPublicUrl(abs);
  return { abs, rel, url, ext, subfolder, base };
}

function isImage(entry: FileEntry): boolean {
  return IMAGE_EXTS.has(entry.ext);
}

function isVideo(entry: FileEntry): boolean {
  return VIDEO_EXTS.has(entry.ext);
}

function matches(entry: FileEntry, keywords: string[]): boolean {
  const haystack = `${entry.subfolder} ${entry.rel} ${entry.base}`;
  return keywords.some((keyword) => haystack.includes(keyword));
}

function dedupe(urls: string[]): string[] {
  return Array.from(new Set(urls));
}

function urlsMatching(entries: FileEntry[], keywords: string[]): string[] {
  return dedupe(
    entries
      .filter((entry) => {
        const hay = `${entry.subfolder} ${entry.rel} ${entry.base}`;
        return keywords.some((k) => hay.includes(k.toLowerCase()));
      })
      .map((e) => e.url)
  ).sort((a, b) => a.localeCompare(b));
}

function filterUrlsOrAll(allUrls: string[], keywords: string[]): string[] {
  const hit = allUrls.filter((url) => {
    try {
      const decoded = decodeURIComponent(url).toLowerCase();
      return keywords.some((k) => decoded.includes(k.toLowerCase()));
    } catch {
      return false;
    }
  });
  return hit.length > 0 ? hit : [...allUrls];
}

function pickVideo(playable: string[], keywords: string[], fallbackIndex: number): string | null {
  const filtered = filterUrlsOrAll(playable, keywords);
  const chosen = filtered[0] ?? playable[fallbackIndex % playable.length] ?? playable[0];
  return chosen ?? null;
}

function heroVideoScore(entry: FileEntry): number {
  const hay = `${entry.subfolder} ${entry.rel} ${entry.base}`;
  if (/drone|aerial/i.test(hay)) return 0;
  if (/gir|sunrise|landscape|forest/i.test(hay)) return 1;
  if (/orchard|canopy|timelapse|time-lapse/i.test(hay)) return 2;
  if (/kesar|mango|tree/i.test(hay)) return 3;
  return 4;
}

function heroImageScore(entry: FileEntry): number {
  const hay = entry.base;
  if (/aerial|cinematic|drone/i.test(hay)) return 0;
  if (/sunrise|landscape|forest|gir/i.test(hay)) return 1;
  if (/kesar|mango|orchard|tree|wildlife/i.test(hay)) return 2;
  return 3;
}

export function getImage(arr: string[], index = 0): string {
  if (arr.length === 0) return FALLBACK_GALLERY_IMAGE;
  return arr[index % arr.length];
}

function buildFarmMedia() {
  const rawPaths = listFilesRecursive(MEDIA_ROOT)
    .filter((abs) => !SKIP_EXT.has(path.extname(abs).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const entries = rawPaths.map(toEntry).filter((entry) => isImage(entry) || isVideo(entry));

  const images = entries.filter(isImage).sort((a, b) => a.rel.localeCompare(b.rel));
  const videos = entries.filter(isVideo).sort((a, b) => a.rel.localeCompare(b.rel));

  const playable = videos.filter((entry) => entry.ext === ".mp4" || entry.ext === ".mov");
  const playableUrls = playable.map((e) => e.url);

  const heroVideoEntry = [...playable].sort(
    (a, b) => heroVideoScore(a) - heroVideoScore(b) || a.rel.localeCompare(b.rel)
  )[0];

  const heroImageEntry = [...images].sort(
    (a, b) => heroImageScore(a) - heroImageScore(b) || a.rel.localeCompare(b.rel)
  )[0];

  const orchard = images.filter((entry) =>
    matches(entry, ["orchard", "canopy", "tree", "grove", "field", "rows", "aerial", "drone", "landscape", "forest", "gir"])
  );
  const harvest = images.filter((entry) =>
    matches(entry, ["harvest", "mango", "fruit", "kesar", "basket", "crate", "pick", "ripe", "close", "juicy", "pulp", "slice"])
  );
  const visitors = images.filter((entry) =>
    matches(entry, ["visit", "guest", "people", "family", "tour", "walk", "host", "lifestyle", "happiness", "experience"])
  );
  const team = images.filter((entry) =>
    matches(entry, ["team", "agent", "staff", "farmer", "uncle", "didi"])
  );
  const sunrise = images.filter((entry) =>
    matches(entry, ["sunrise", "sunset", "golden", "light", "dawn", "dusk"])
  );

  const allUrls = images.map((entry) => entry.url);

  const gallery = dedupe(images.map((entry) => entry.url)).sort((a, b) => a.localeCompare(b));

  const fallback = (urls: string[], minCount: number): string[] => {
    if (urls.length >= minCount) return urls.slice(0, Math.max(minCount, urls.length));
    if (allUrls.length === 0) {
      return Array.from({ length: minCount }, () => FALLBACK_GALLERY_IMAGE);
    }
    const out = [...urls];
    let i = 0;
    while (out.length < minCount) {
      out.push(allUrls[i % allUrls.length]);
      i += 1;
    }
    return out;
  };

  const farmImages = urlsMatching(images, ["farm", "field", "land", "aerial", "drone", "landscape", "forest", "gir", "pond", "animal"]);
  const harvestImages = urlsMatching(images, ["harvest", "fruit", "mango", "pick", "ripe", "kesar", "slice", "juicy", "pulp"]);
  const heroImages = urlsMatching(images, ["hero", "cover", "forest", "aerial", "cinematic", "drone", "kesar", "mango", "wildlife", "landscape"]);
  const treeImagesPool =
    urlsMatching(images, ["tree", "mango", "grove", "kesar", "orchard", "canopy", "forest"]).length > 0
      ? urlsMatching(images, ["tree", "mango", "grove", "kesar", "orchard", "canopy", "forest"])
      : gallery.length > 0
        ? gallery
        : [FALLBACK_GALLERY_IMAGE];

  const videosBlock = {
    hero: heroVideoEntry?.url ?? pickVideo(playableUrls, ["hero", "main", "intro", "forest"], 0),
    trees: pickVideo(playableUrls, ["tree", "mango", "grove", "growth", "kesar", "hanging", "orchard"], 1),
    harvest: pickVideo(playableUrls, ["harvest", "slice", "juicy", "pulp", "fruit", "pick"], 2),
    farm: pickVideo(playableUrls, ["farm", "field", "drone", "aerial", "landscape", "forest", "animals", "pond", "gir", "sunrise"], 3),
    all: playableUrls,
  } as const;

  const imagesBlock = {
    hero: heroImages.length > 0 ? heroImages : fallback(gallery.slice(0, 3), 3),
    trees: {
      small: treeImagesPool,
      medium: treeImagesPool,
      large: treeImagesPool,
      all: treeImagesPool,
    },
    farm: farmImages.length > 0 ? farmImages : fallback(gallery, 4),
    harvest: harvestImages.length > 0 ? harvestImages : fallback(gallery, 4),
    team: fallback(team.map((e) => e.url), 3),
    all: gallery.length > 0 ? gallery : [FALLBACK_GALLERY_IMAGE],
  } as const;

  return {
    hero: {
      video: heroVideoEntry?.url ?? videosBlock.hero,
      poster: heroImageEntry?.url ?? FALLBACK_HERO_IMAGE,
      fallbackImage: heroImageEntry?.url ?? FALLBACK_HERO_IMAGE,
    },
    gallery,
    orchard: fallback(
      orchard.map((e) => e.url),
      6
    ),
    harvest: fallback(
      harvest.map((e) => e.url),
      4
    ),
    visitors: fallback(
      visitors.map((e) => e.url),
      3
    ),
    team: fallback(
      team.map((e) => e.url),
      3
    ),
    sunrise: fallback(
      sunrise.map((e) => e.url),
      3
    ),
    videos: videosBlock,
    images: imagesBlock,
    counts: {
      total: entries.length,
      images: images.length,
      videos: videos.length,
    },
    isEmpty: entries.length === 0,
  } as const;
}

export type FarmMedia = ReturnType<typeof buildFarmMedia>;

export const FARM_MEDIA: FarmMedia = buildFarmMedia();

export function getVideo(key: VideoSlotKey): string | null {
  return FARM_MEDIA.videos[key];
}

export const FARM_MEDIA_FALLBACKS = {
  hero: FALLBACK_HERO_IMAGE,
  gallery: FALLBACK_GALLERY_IMAGE,
} as const;
