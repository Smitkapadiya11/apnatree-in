import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ApnaTree.in — Rent a Kesar Mango Tree from Gir Forest";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg,#0f2415,#1f3d24)",
          color: "#fdf6e9",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 72, letterSpacing: "-0.04em" }}>ApnaTree.in</div>
        <div style={{ fontSize: 34, maxWidth: 720, lineHeight: 1.3 }}>
          Rent a Kesar Mango Tree from the Gir Forest
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 22,
            color: "#e8d9b6",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 24,
          }}
        >
          <span>87+ Trees Rented</span>
          <span>·</span>
          <span>3 Annual Visits</span>
          <span>·</span>
          <span>100% Harvest Delivered</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
