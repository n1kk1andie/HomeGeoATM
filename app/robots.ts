import type { MetadataRoute } from "next";
import { robotsRules } from "@/lib/robots";

// Search engines and AI assistants on every page; nobody on the API; bulk scrapers nowhere.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: robotsRules(),
    sitemap: "https://home.geoatm.app/sitemap.xml",
    host: "https://home.geoatm.app",
  };
}
