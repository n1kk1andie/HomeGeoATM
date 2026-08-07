import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://home.geoatm.app/sitemap.xml",
    host: "https://home.geoatm.app",
  };
}
