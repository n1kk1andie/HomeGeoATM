import { test } from "node:test";
import assert from "node:assert/strict";
import { AI_TRAINING_CRAWLERS, robotsRules } from "../lib/robots.ts";

test("AI training crawlers are refused everywhere; search engines only kept off the API", () => {
  const [ai, everyone] = robotsRules();
  assert.deepEqual(ai.userAgent, AI_TRAINING_CRAWLERS);
  assert.equal(ai.disallow, "/");
  assert.deepEqual(everyone, { userAgent: "*", allow: "/", disallow: "/api/" });
  for (const ua of ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot", "OAI-SearchBot", "PerplexityBot"]) {
    assert.ok(!AI_TRAINING_CRAWLERS.includes(ua), ua);
  }
  assert.ok(AI_TRAINING_CRAWLERS.includes("GPTBot") && AI_TRAINING_CRAWLERS.includes("CCBot"));
});
