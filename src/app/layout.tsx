import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import { Providers } from "@/components/layout/Providers";
import { RootMotion } from "@/components/layout/RootMotion";
import { UploadThingSSR } from "@/components/shared/UploadThingSSR";

import "@uploadthing/react/styles.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apnatree.in"),
  title: {
    default: "ApnaTree.in — Rent a Kesar Mango Tree from Gir Forest",
    template: "%s | ApnaTree.in",
  },
  description:
    "Rent an authentic Kesar mango tree from Gujarat's legendary Gir Forest. Receive bi-weekly farm updates, 3 annual visits, and 100% of your harvest delivered to your door.",
  keywords: [
    "Kesar mango",
    "Gir forest",
    "rent mango tree",
    "tree adoption",
    "Gujarat mango",
    "Alphonso mango alternative",
    "apnatree",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://apnatree.in",
    siteName: "ApnaTree.in",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#fdf6e9" />
      </head>
      <body className="font-[family-name:var(--font-body)] bg-background text-foreground min-h-full antialiased">
        <UploadThingSSR />
        <Providers>
          <RootMotion>{children}</RootMotion>
        </Providers>
      </body>
    </html>
  );
}
