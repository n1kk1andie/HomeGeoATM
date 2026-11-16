// Who may crawl home.geoatm.app. Search engines are welcome on every page; the
// API (the newsletter sign-up) is not for crawling; crawlers that collect
// material to train AI models are not allowed anywhere. The same list the other
// Tumblehill sites publish (GeoATM, GeoEV, Astrum).
export const AI_TRAINING_CRAWLERS = [
  "GPTBot", "CCBot", "ClaudeBot", "anthropic-ai", "Claude-Web", "Google-Extended",
  "Applebot-Extended", "Bytespider", "Amazonbot", "meta-externalagent", "Meta-ExternalAgent",
  "FacebookBot", "cohere-ai", "cohere-training-data-crawler", "Diffbot", "omgili", "omgilibot",
  "ImagesiftBot", "AI2Bot", "Ai2Bot-Dolma", "Timpibot", "PanguBot",
];

export function robotsRules() {
  return [
    { userAgent: AI_TRAINING_CRAWLERS, disallow: "/" },
    { userAgent: "*", allow: "/", disallow: "/api/" },
  ];
}
