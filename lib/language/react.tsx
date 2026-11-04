"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { createTranslator, type Messages, type Translate } from "./messages";
import { LANGUAGES, dirOf, languageOf, type Language } from "./languages";
import { LANGUAGE_COOKIE, cookieDomain } from "./server";

// React binding: wrap the app once, then useT() anywhere.
//   <LanguageProvider lang={lang} messages={messages} fallback={english}>
//   const t = useT(); t("nearby.title", { count: 3 })

type Ctx = { lang: string; dir: "ltr" | "rtl"; t: Translate; setLanguage: (code: string) => void; languages: readonly Language[] };
const LanguageContext = createContext<Ctx | null>(null);

/** Remember the user's choice (a cookie the server reads) and reload in that language. */
export function chooseLanguage(code: string) {
  const c = languageOf(code).code;
  try {
    const domain = cookieDomain(location.hostname);
    // A choice saved for this site alone (older versions) would shadow the site-wide one.
    if (domain) document.cookie = `${LANGUAGE_COOKIE}=; path=/; max-age=0`;
    document.cookie = `${LANGUAGE_COOKIE}=${encodeURIComponent(c)}; path=/; max-age=31536000; samesite=lax${domain ? `; domain=${domain}` : ""}`;
    localStorage.setItem(LANGUAGE_COOKIE, c);
  } catch {}
  location.reload();
}

export function LanguageProvider(props: { lang: string; messages: Messages; fallback?: Messages; languages?: readonly Language[]; children: ReactNode }) {
  const { lang, messages, fallback } = props;
  const t = useMemo(() => createTranslator({ lang, messages, fallback }), [lang, messages, fallback]);
  const setLanguage = useCallback((code: string) => chooseLanguage(code), []);
  const value = useMemo(() => ({ lang, dir: dirOf(lang), t, setLanguage, languages: props.languages ?? LANGUAGES }), [lang, t, setLanguage, props.languages]);
  return <LanguageContext.Provider value={value}>{props.children}</LanguageContext.Provider>;
}

function use(): Ctx {
  const c = useContext(LanguageContext);
  if (!c) throw new Error("Wrap the app in <LanguageProvider>");
  return c;
}

export const useT = () => use().t;
export const useLanguage = () => {
  const { lang, dir, setLanguage, languages } = use();
  return { lang, dir, setLanguage, languages };
};

const Globe = ({ size = 16 }: { size?: number }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </svg>
);

/**
 * The language picker every product uses. `compact` (for headers) shows a
 * globe and a short code; tapping opens the device's own list with every
 * language written in its own script. Choosing one remembers it across the
 * product's app and website and reloads.
 */
export function LanguageSelect({ current, compact, label = "Language", className }: { current: string; compact?: boolean; label?: string; className?: string }) {
  const lang = languageOf(current);
  const short = lang.code.split("-")[0].toUpperCase();
  return (
    <label
      className={className}
      title={label}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", ...(compact ? { padding: "6px 10px", border: "1px solid currentColor", borderRadius: 999, fontSize: 13, fontWeight: 600, lineHeight: 1, opacity: 0.85 } : {}) }}
    >
      <Globe />
      {compact ? <span aria-hidden="true">{short}</span> : null}
      <select
        aria-label={label}
        value={lang.code}
        onChange={(e) => chooseLanguage(e.target.value)}
        style={
          compact
            ? { position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%", font: "inherit" }
            : { font: "inherit", background: "transparent", border: 0, color: "inherit", cursor: "pointer" }
        }
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} lang={l.code} dir={l.dir}>
            {l.name}
          </option>
        ))}
      </select>
    </label>
  );
}
