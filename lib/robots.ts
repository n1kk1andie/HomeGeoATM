// Who may crawl home.geoatm.app. It is a public marketing site, so search
// engines and AI assistants are welcome on every page, so they can read and
// describe GeoATM correctly. Bulk scrapers are not allowed anywhere, and the API
// (the newsletter sign-up) is not for crawling by anyone.
export const WELCOME = [
  "Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai", "PerplexityBot",
  "Perplexity-User", "Applebot", "Applebot-Extended", "DuckAssistBot", "meta-externalagent", "*",
];

export const BULK_SCRAPERS = ["CCBot", "Bytespider"];

export function robotsRules() {
  return [
    { userAgent: BULK_SCRAPERS, disallow: "/" },
    { userAgent: WELCOME, allow: "/", disallow: "/api/" },
  ];
}
