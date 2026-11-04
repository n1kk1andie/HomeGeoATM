#!/usr/bin/env node
// Sync a product's messages with the Tumblehill Language service: send its
// English (messages/en.json) and write every language's file back
// (messages/<code>.json). Anything new or changed is drafted by machine on
// the service; what reviewers wrote is kept. Run from the product's folder:
//
//   LANGUAGE_SERVICE_URL=https://… LANGUAGE_API_KEY=tl_… node ../../packages/language/sync-messages.mjs messages
//   options: --langs fr,de   --terms "CCS,Type 2"   --soft (don't fail the build if the service is unreachable)
//
// Without LANGUAGE_API_KEY it does nothing, so builds keep the files already in the repository.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const dir = args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--")) ?? "messages";
const service = (process.env.LANGUAGE_SERVICE_URL ?? "").replace(/\/+$/, "");
const key = process.env.LANGUAGE_API_KEY ?? "";
const soft = args.includes("--soft");
const terms = (opt("terms") ?? "").split(",").map((s) => s.trim()).filter(Boolean);

if (!key || !service) {
  console.log("language sync: LANGUAGE_API_KEY / LANGUAGE_SERVICE_URL not set; keeping the message files in the repository.");
  process.exit(0);
}

const flatten = (m, p = "", out = {}) => {
  for (const [k, v] of Object.entries(m)) {
    const kk = p ? `${p}.${k}` : k;
    if (typeof v === "string") out[kk] = v;
    else if (v && typeof v === "object") flatten(v, kk, out);
  }
  return out;
};
const unflatten = (flat, order) => {
  const out = {};
  for (const k of order.filter((k) => k in flat)) {
    const parts = k.split(".");
    let cur = out;
    for (const p of parts.slice(0, -1)) cur = cur[p] = typeof cur[p] === "object" ? cur[p] : {};
    cur[parts.at(-1)] = flat[k];
  }
  return out;
};

const enFile = join(dir, "en.json");
if (!existsSync(enFile)) {
  console.error(`language sync: no ${enFile}`);
  process.exit(1);
}
const source = flatten(JSON.parse(readFileSync(enFile, "utf8")));
const order = Object.keys(source);

async function call(path, body) {
  const r = await fetch(`${service}${path}`, {
    method: body ? "POST" : "GET",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(90_000),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error ?? `HTTP ${r.status}`);
  return d;
}

try {
  const langs = opt("langs")?.split(",").map((s) => s.trim()).filter(Boolean) ?? (await call("/api/language/v1/languages")).languages.map((l) => l.code).filter((c) => c !== "en");
  let first = true;
  for (const lang of langs) {
    const d = await call("/api/language/v1/sync", { lang, terms, ...(first ? { source } : {}) });
    first = false;
    writeFileSync(join(dir, `${lang}.json`), JSON.stringify(unflatten(d.messages, order), null, 2) + "\n");
    console.log(`language sync: ${lang}: ${d.human} reviewed, ${d.machine} machine drafts${d.translated ? `, ${d.translated} newly drafted` : ""}${d.removed ? `, ${d.removed} removed` : ""}`);
  }
} catch (e) {
  console.error(`language sync failed: ${e.message}`);
  process.exit(soft ? 0 : 1);
}
