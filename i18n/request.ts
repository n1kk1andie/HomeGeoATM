import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { LANGUAGE_COOKIE, resolveLanguage } from "@/lib/language/server";
import en from "../messages/en.json";

// Which language to show: the user's own choice (cookie set by the language
// picker), else the device's language, else English. Languages come from the
// shared Tumblehill Language list; their files (messages/<code>.json) are
// written by the language service before each build. A missing file or a
// missing line falls back to English.

type Messages = { [k: string]: string | Messages };

function merge(base: Messages, over: Messages): Messages {
  const out: Messages = { ...base };
  for (const [k, v] of Object.entries(over ?? {})) {
    const b = base[k];
    out[k] = typeof v === "object" && v && typeof b === "object" ? merge(b, v) : typeof v === "string" && typeof b === "string" ? v : b;
  }
  return out;
}

export default getRequestConfig(async () => {
  let locale = resolveLanguage({ cookie: cookies().get(LANGUAGE_COOKIE)?.value, acceptLanguage: headers().get("accept-language") });
  let messages: Messages = en as Messages;
  if (locale !== "en") {
    try {
      messages = merge(en as Messages, (await import(`../messages/${locale}.json`)).default as Messages);
    } catch {
      locale = "en";
    }
  }
  return { locale, messages, onError: () => {}, getMessageFallback: ({ key }) => key };
});
