import type { MetadataRoute } from "next";

import { getSiteBaseUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteBaseUrl();

  const paths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/trees", changeFrequency: "daily", priority: 0.9 },
    { path: "/trees/small", changeFrequency: "daily", priority: 0.9 },
    { path: "/trees/medium", changeFrequency: "daily", priority: 0.9 },
    { path: "/trees/large", changeFrequency: "daily", priority: 0.9 },
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/pricing", changeFrequency: "weekly", priority: 0.8 },
    { path: "/trust", changeFrequency: "monthly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/farm-visits", changeFrequency: "monthly", priority: 0.6 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
    { path: "/harvest", changeFrequency: "monthly", priority: 0.6 },
    { path: "/login", changeFrequency: "monthly", priority: 0.3 },
  ];

  return paths.map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
