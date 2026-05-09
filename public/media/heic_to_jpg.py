#!/usr/bin/env python3
"""
Batch-convert HEIC images in ./input to JPEG in ./output using Pillow + pillow-heif.
After each successful conversion (or when the JPEG already exists), the source HEIC is deleted.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image
from pillow_heif import register_heif_opener

JPEG_QUALITY = 95
INPUT_DIR = Path("input")
OUTPUT_DIR = Path("output")


def ensure_directories() -> None:
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def collect_heic_files(directory: Path) -> list[Path]:
    return sorted(
        p
        for p in directory.iterdir()
        if p.is_file() and p.suffix.lower() == ".heic"
    )


def as_rgb(img: Image.Image) -> Image.Image:
    if img.mode == "RGBA":
        background = Image.new("RGB", img.size, (255, 255, 255))
        alpha = img.split()[3]
        background.paste(img, mask=alpha)
        return background
    if img.mode == "RGB":
        return img
    return img.convert("RGB")


def jpeg_exif_bytes(img: Image.Image) -> bytes | None:
    raw = img.info.get("exif")
    if isinstance(raw, bytes) and raw:
        return raw
    try:
        exif = img.getexif()
        if exif:
            return exif.tobytes()
    except Exception:
        pass
    return None


def convert_one(src: Path, dst: Path) -> None:
    with Image.open(src) as loaded:
        img = as_rgb(loaded)
        exif = jpeg_exif_bytes(loaded)
        save_kw: dict = {
            "format": "JPEG",
            "quality": JPEG_QUALITY,
            "subsampling": 0,
            "optimize": True,
        }
        if exif:
            save_kw["exif"] = exif
        img.save(dst, **save_kw)


def delete_original(src: Path, i: int, total: int, context: str) -> bool:
    try:
        src.unlink()
        return True
    except OSError as exc:
        print(
            f"[{i}/{total}] Failed to delete original ({context}): {src.name} — {exc}",
            file=sys.stderr,
        )
        return False


def main() -> int:
    register_heif_opener()
    ensure_directories()

    sources = collect_heic_files(INPUT_DIR)
    total = len(sources)
    if total == 0:
        print(
            f"No .heic/.HEIC files found in '{INPUT_DIR.resolve()}'. "
            "Add HEIC files to that folder and run again."
        )
        return 0

    converted = 0
    skipped = 0
    failed = 0

    for i, src in enumerate(sources, start=1):
        dst = OUTPUT_DIR / f"{src.stem}.jpg"
        if dst.exists():
            if delete_original(src, i, total, "JPEG already present"):
                print(
                    f"[{i}/{total}] JPEG exists; removed original: {src.name} "
                    f"(output: {dst.name})"
                )
                skipped += 1
            else:
                failed += 1
            continue
        try:
            convert_one(src, dst)
            if delete_original(src, i, total, "after conversion"):
                print(
                    f"[{i}/{total}] Converted: {src.name} -> {dst.name}; "
                    "original removed"
                )
                converted += 1
            else:
                failed += 1
        except Exception as exc:
            print(f"[{i}/{total}] Failed: {src.name} — {exc}", file=sys.stderr)
            failed += 1

    print(
        f"\nSummary — converted (original removed): {converted}, "
        f"jpeg already existed (original removed): {skipped}, failed: {failed}."
    )
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
