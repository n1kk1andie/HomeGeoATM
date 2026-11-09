import { getLocale, getTranslations } from "next-intl/server";

// Google's official "Get it on Google Play" badge, in the page's language,
// linking to the GeoATM listing. Badge artwork © Google, used per its guidelines.
export const PLAY_URL = "https://play.google.com/store/apps/details?id=app.GeoATM";
const BADGE_LOCALES = new Set(["en", "fr", "es", "pt-BR", "de", "ar", "zh-Hans", "hi"]);

export default async function PlayBadge({ height = 52, className }: { height?: number; className?: string }) {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const src = `/google-play-${BADGE_LOCALES.has(locale) ? locale : "en"}.png`;
  return (
    <a className={`play-badge${className ? ` ${className}` : ""}`} href={PLAY_URL} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={t("playAlt")} style={{ height, width: "auto", display: "block" }} />
    </a>
  );
}
