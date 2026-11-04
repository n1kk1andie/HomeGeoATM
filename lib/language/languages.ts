// The languages Tumblehill products are offered in. Adding one is adding a
// row here (and its message files in each product); nothing else changes.
// `engine` is the code the machine-translation engine expects.

export interface Language {
  code: string;
  /** The language's own name, as shown in a language picker. */
  name: string;
  /** Its name in English, for admin screens and logs. */
  english: string;
  dir: "ltr" | "rtl";
  engine: string;
}

export const LANGUAGES: readonly Language[] = [
  { code: "en", name: "English", english: "English", dir: "ltr", engine: "en" },
  { code: "zh-Hans", name: "简体中文", english: "Chinese (Simplified)", dir: "ltr", engine: "zh-CN" },
  { code: "hi", name: "हिन्दी", english: "Hindi", dir: "ltr", engine: "hi" },
  { code: "es", name: "Español", english: "Spanish", dir: "ltr", engine: "es" },
  { code: "ar", name: "العربية", english: "Arabic", dir: "rtl", engine: "ar" },
  { code: "fr", name: "Français", english: "French", dir: "ltr", engine: "fr" },
  { code: "pt-BR", name: "Português (Brasil)", english: "Portuguese (Brazil)", dir: "ltr", engine: "pt" },
  { code: "de", name: "Deutsch", english: "German", dir: "ltr", engine: "de" },
];

/** What every product falls back to when a language or a message is missing. */
export const DEFAULT_LANGUAGE = "en";

const byCode = new Map(LANGUAGES.map((l) => [l.code.toLowerCase(), l]));

export const isLanguage = (code: unknown): code is string => typeof code === "string" && byCode.has(code.toLowerCase());

/** The language for a code, or the default language. Codes are matched without regard to case. */
export function languageOf(code: string | null | undefined): Language {
  return byCode.get(String(code ?? "").toLowerCase()) ?? byCode.get(DEFAULT_LANGUAGE)!;
}

/** The canonical spelling of a supported code ("PT-br" -> "pt-BR"), or null. */
export function canonicalCode(code: unknown): string | null {
  return typeof code === "string" ? byCode.get(code.toLowerCase())?.code ?? null : null;
}

export const dirOf = (code: string) => languageOf(code).dir;
