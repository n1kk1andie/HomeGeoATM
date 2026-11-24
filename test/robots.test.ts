import { test } from "node:test";
import assert from "node:assert/strict";
import { BULK_SCRAPERS, WELCOME, robotsRules } from "../lib/robots.ts";

test("search engines and AI assistants may read every page; only the API is kept out", () => {
  const [scrapers, everyone] = robotsRules();
  assert.deepEqual(scrapers, { userAgent: ["CCBot", "Bytespider"], disallow: "/" });
  assert.deepEqual(everyone, { userAgent: WELCOME, allow: "/", disallow: "/api/" });
  for (const ua of ["Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Applebot", "Applebot-Extended", "DuckAssistBot", "meta-externalagent", "*"]) {
    assert.ok(WELCOME.includes(ua), ua);
    assert.ok(!BULK_SCRAPERS.includes(ua), ua);
  }
});
