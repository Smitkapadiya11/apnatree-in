import { ImageResponse } from "next/og";

import { TreeTier } from "@prisma/client";

export const runtime = "edge";
export const alt = "ApnaTree tier reserve graphic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function parseTier(raw: string): TreeTier | null {
  switch (raw.toLowerCase()) {
    case "small":
      return TreeTier.SMALL;
    case "medium":
      return TreeTier.MEDIUM;
    case "large":
      return TreeTier.LARGE;
    default:
      return null;
  }
}

export default async function Image({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: raw } = await params;
  const tier = parseTier(raw);
  const label =
    tier === TreeTier.LARGE ? "Large canopy" : tier === TreeTier.MEDIUM ? "Medium canopy" : tier === TreeTier.SMALL ? "Small canopy" : "ApnaTree tiers";

  const gradient =
    tier === TreeTier.LARGE
      ? "linear-gradient(135deg,#7a5b12,#d8b35c)"
      : tier === TreeTier.MEDIUM
        ? "linear-gradient(135deg,#12351f,#3f8f5b)"
        : "linear-gradient(135deg,#fdf6e9,#f1d9a5)";

  const fg = tier === TreeTier.SMALL ? "#1a2e1a" : "#fdf6e9";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: 64,
          background: gradient,
          color: fg,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.4em", textTransform: "uppercase" }}>Reserve · Gir Forest</div>
        <div style={{ fontSize: 72 }}>{label}</div>
        <div style={{ fontSize: 36 }}>Reserve from transparent tier pricing</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
