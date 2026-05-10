import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "*.uploadthing.com",
      },
    ],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "date-fns"],
    // optimizeCss requires the optional `critters` (or `beasties`) runtime dep
    // which is not installed in this project. Re-enable here once added:
    //   npm i -D critters
    //   experimental.optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Frame-Options", value: "DENY" }],
      },
      {
        source: "/api/webhooks/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
