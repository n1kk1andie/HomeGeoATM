import type { MetadataRoute } from "next";
import { robotsRules } from "@/lib/robots";

// Search engines on the pages; nobody on the API; AI training crawlers nowhere.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: robotsRules(),
    sitemap: "https://home.geoatm.app/sitemap.xml",
    host: "https://home.geoatm.app",
  };
}
