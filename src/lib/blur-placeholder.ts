import "server-only";

import sharp from "sharp";

const placeholderCache = new Map<string, string>();

export async function generateBlurPlaceholder(imageUrl: string): Promise<string | null> {
  const cached = placeholderCache.get(imageUrl);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const resized = await sharp(buffer).resize(8, 8, { fit: "cover" }).jpeg({ quality: 55 }).toBuffer();
    const dataUri = `data:image/jpeg;base64,${resized.toString("base64")}`;
    placeholderCache.set(imageUrl, dataUri);
    return dataUri;
  } catch (error) {
    console.error("[generateBlurPlaceholder]", error);
    return null;
  }
}
