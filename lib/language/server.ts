import { languageOf } from "./languages";
import { negotiate } from "./negotiate";

// For the server side of a web app (e.g. a Next.js layout): which language to
// render, from the user's saved choice and the browser's Accept-Language.
//   const lang = resolveLanguage({ cookie: cookies().get(LANGUAGE_COOKIE)?.value, acceptLanguage: headers().get("accept-language") });
//   <html lang={lang} dir={dirOf(lang)}>

export const LANGUAGE_COOKIE = "tl-lang";

export function resolveLanguage(opts: { cookie?: string | null; acceptLanguage?: string | null; supported?: readonly string[] }): string {
  return negotiate({ choice: opts.cookie ?? null, requested: opts.acceptLanguage ?? null, supported: opts.supported });
}

/** Attributes for <html>: lang and text direction (Arabic is right-to-left). */
export function htmlAttributes(lang: string): { lang: string; dir: "ltr" | "rtl" } {
  const l = languageOf(lang);
  return { lang: l.code, dir: l.dir };
}

/**
 * The site-wide domain to remember a choice on, so one choice covers a
 * product's app and website (www.geoatm.app and home.geoatm.app -> .geoatm.app).
 * Null on hosts where that can't apply (localhost, IPs, *.vercel.app previews).
 */
export function cookieDomain(hostname: string): string | null {
  if (!hostname || hostname === "localhost" || /^[\d.]+$/.test(hostname) || hostname.includes(":")) return null;
  if (/\.vercel\.app$/.test(hostname)) return null;
  const parts = hostname.split(".");
  return parts.length >= 2 ? `.${parts.slice(-2).join(".")}` : null;
}
