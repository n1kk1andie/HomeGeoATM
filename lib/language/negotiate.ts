import { DEFAULT_LANGUAGE, LANGUAGES, canonicalCode } from "./languages";

// Picking a language from what the device asks for (Accept-Language, or
// navigator.languages). Decided by the device's language, never by country
// or IP: a French speaker in Mexico gets French.

/** "fr-CA,fr;q=0.9,en;q=0.8" -> ["fr-CA", "fr", "en"], best first. */
export function parseAcceptLanguage(header: string | null | undefined): string[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { tag: tag.trim(), weight: Number.isFinite(weight) ? weight : 0, i };
    })
    .filter((x) => x.tag && x.tag !== "*" && x.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.i - b.i)
    .map((x) => x.tag);
}

/** The supported language one requested tag maps to, or null. */
export function matchTag(tag: string, supported: readonly string[] = LANGUAGES.map((l) => l.code)): string | null {
  const t = tag.trim().replace(/_/g, "-");
  const has = (c: string) => supported.find((s) => s.toLowerCase() === c.toLowerCase()) ?? null;
  const exact = has(t);
  if (exact) return exact;
  const [base, ...rest] = t.toLowerCase().split("-");
  if (base === "zh") {
    // Chinese is chosen by script. Traditional (Taiwan, Hong Kong, Macau)
    // uses its own file when a product offers one; until then Simplified is
    // closer for those readers than English.
    const traditional = rest.includes("hant") || rest.some((r) => ["tw", "hk", "mo"].includes(r));
    return (traditional && has("zh-Hant")) || has("zh-Hans");
  }
  if (base === "pt") return has("pt-BR") ?? has("pt");
  return has(base) ?? supported.find((s) => s.toLowerCase().split("-")[0] === base) ?? null;
}

/**
 * The language to show: the user's own choice if they made one and it is
 * supported, else the first of the device's languages we support, else English.
 */
export function negotiate(opts: { choice?: string | null; requested?: readonly string[] | string | null; supported?: readonly string[] }): string {
  const supported = opts.supported ?? LANGUAGES.map((l) => l.code);
  const chosen = opts.choice ? matchTag(opts.choice, supported) : null;
  if (chosen) return chosen;
  const requested = typeof opts.requested === "string" ? parseAcceptLanguage(opts.requested) : opts.requested ?? [];
  for (const tag of requested) {
    const m = matchTag(tag, supported);
    if (m) return m;
  }
  return canonicalCode(DEFAULT_LANGUAGE) ?? DEFAULT_LANGUAGE;
}
