import type { MetadataRoute } from "next";

const BASE = "https://home.geoatm.app";

// Single-page marketing site today. When programmatic local pages are added
// (e.g. /atms/[place]), enumerate them here so they're all discoverable.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];
}
