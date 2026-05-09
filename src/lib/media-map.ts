import "server-only";

import fs from "fs";
import path from "path";

const MEDIA_ROOT = path.join(process.cwd(), "public", "media");

function listFilesRecursive(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function toPublicPath(absPath: string): string {
  const rel = path.relative(path.join(process.cwd(), "public"), absPath).replace(/\\/g, "/");
  return `/${rel}`;
}

function filterImages(paths: string[]): string[] {
  const imageExt = new Set([".jpg", ".jpeg", ".png", ".webp"]);
  return paths.filter((p) => imageExt.has(path.extname(p).toLowerCase()));
}

function filterVideos(paths: string[]): string[] {
  return paths.filter((p) => path.extname(p).toLowerCase() === ".mp4");
}

function buildMediaMap() {
  const heroDir = path.join(MEDIA_ROOT, "hero");
  const videosDir = path.join(MEDIA_ROOT, "videos");
  const treesDir = path.join(MEDIA_ROOT, "trees");
  const farmDir = path.join(MEDIA_ROOT, "farm");
  const harvestDir = path.join(MEDIA_ROOT, "harvest");
  const teamDir = path.join(MEDIA_ROOT, "team");
  const trustDir = path.join(MEDIA_ROOT, "trust");

  const heroFiles = filterImages(listFilesRecursive(heroDir)).sort();
  const mp4s = filterVideos(listFilesRecursive(videosDir)).sort();
  const treeFiles = filterImages(listFilesRecursive(treesDir)).sort();
  const farmGallery = filterImages(listFilesRecursive(farmDir)).sort().map(toPublicPath);
  const harvestGallery = filterImages(listFilesRecursive(harvestDir)).sort().map(toPublicPath);
  const team = filterImages(listFilesRecursive(teamDir)).sort().map(toPublicPath);
  const trust = filterImages(listFilesRecursive(trustDir)).sort().map(toPublicPath);

  const small = treeFiles.filter((f) => /small/i.test(path.basename(f))).map(toPublicPath);
  const medium = treeFiles.filter((f) => /medium/i.test(path.basename(f))).map(toPublicPath);
  const large = treeFiles.filter((f) => /large/i.test(path.basename(f))).map(toPublicPath);

  const third = Math.max(1, Math.ceil(treeFiles.length / 3));
  const fallbackSmall = treeFiles.slice(0, third).map(toPublicPath);
  const fallbackMedium = treeFiles.slice(third, third * 2).map(toPublicPath);
  const fallbackLarge = treeFiles.slice(third * 2).map(toPublicPath);

  return {
    hero: {
      mainVideo: mp4s[0] ? toPublicPath(mp4s[0]) : undefined,
      fallbackImage: heroFiles[0] ? toPublicPath(heroFiles[0]) : undefined,
      overlayImage: heroFiles[1] ? toPublicPath(heroFiles[1]) : undefined,
    },
    trees: {
      small: small.length ? small : fallbackSmall,
      medium: medium.length ? medium : fallbackMedium,
      large: large.length ? large : fallbackLarge,
    },
    farm: {
      gallery: farmGallery,
    },
    harvest: {
      gallery: harvestGallery,
    },
    team,
    trust,
  };
}

export const MEDIA = buildMediaMap();
