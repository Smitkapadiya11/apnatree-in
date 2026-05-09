import "server-only";

import fs from "fs";
import path from "path";

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const FARM_ROOT = path.join(PUBLIC_ROOT, "media", "farm");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".mov", ".webm", ".m4v"]);

const FALLBACK_HERO_IMAGE = "/media/farm/_placeholder-hero.svg";
const FALLBACK_GALLERY_IMAGE = "/media/farm/_placeholder-gallery.svg";

type FileEntry = {
  /** absolute path on disk */
  abs: string;
  /** path within `public/media/farm` (forward slashes, no leading slash) */
  rel: string;
  /** browser-resolvable URL beginning with /media/farm/... */
  url: string;
  /** lower-cased extension including the leading dot */
  ext: string;
  /** lower-cased subfolder (immediate child of `public/media/farm`) or "" if file lives at root */
  subfolder: string;
  /** lower-cased basename without extension */
  base: string;
};

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
      if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile()) {
        out.push(full);
      }
    }
  }
  return out;
}

function toEntry(abs: string): FileEntry {
  const rel = path.relative(FARM_ROOT, abs).replace(/\\/g, "/");
  const segments = rel.split("/");
  const subfolder = segments.length > 1 ? segments[0].toLowerCase() : "";
  const ext = path.extname(abs).toLowerCase();
  const base = path.basename(abs, ext).toLowerCase();
  const url = `/${path.relative(PUBLIC_ROOT, abs).replace(/\\/g, "/")}`;
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

function buildFarmMedia() {
  const entries = listFilesRecursive(FARM_ROOT)
    .map(toEntry)
    .sort((a, b) => a.rel.localeCompare(b.rel));

  const images = entries.filter(isImage);
  const videos = entries.filter(isVideo);

  const heroVideos = videos
    .filter((entry) => entry.ext === ".mp4" || entry.ext === ".mov")
    .filter((entry) => matches(entry, ["hero", "cinematic", "intro", "drone", "aerial"]));
  const fallbackVideo = videos.find((entry) => entry.ext === ".mp4" || entry.ext === ".mov");
  const heroVideo = heroVideos[0] ?? fallbackVideo;

  const heroImageCandidates = images.filter((entry) =>
    matches(entry, ["hero", "cover", "banner", "01", "001", "drone", "aerial"])
  );
  const heroImage = heroImageCandidates[0] ?? images[0];

  const orchard = images.filter((entry) =>
    matches(entry, ["orchard", "canopy", "tree", "grove", "field", "rows"])
  );
  const harvest = images.filter((entry) =>
    matches(entry, ["harvest", "mango", "fruit", "kesar", "basket", "crate", "pick"])
  );
  const visitors = images.filter((entry) =>
    matches(entry, ["visit", "guest", "people", "family", "tour", "walk", "host"])
  );
  const team = images.filter((entry) =>
    matches(entry, ["team", "agent", "staff", "farmer", "uncle", "didi"])
  );
  const sunrise = images.filter((entry) =>
    matches(entry, ["sunrise", "sunset", "golden", "light", "dawn", "dusk"])
  );

  const allUrls = images.map((entry) => entry.url);

  const gallery = dedupe(images.map((entry) => entry.url));

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

  return {
    hero: {
      video: heroVideo?.url,
      poster: heroImage?.url ?? FALLBACK_HERO_IMAGE,
      fallbackImage: heroImage?.url ?? FALLBACK_HERO_IMAGE,
    },
    gallery,
    orchard: fallback(orchard.map((e) => e.url), 6),
    harvest: fallback(harvest.map((e) => e.url), 4),
    visitors: fallback(visitors.map((e) => e.url), 3),
    team: fallback(team.map((e) => e.url), 3),
    sunrise: fallback(sunrise.map((e) => e.url), 3),
    videos: videos.map((entry) => entry.url),
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

export const FARM_MEDIA_FALLBACKS = {
  hero: FALLBACK_HERO_IMAGE,
  gallery: FALLBACK_GALLERY_IMAGE,
} as const;
