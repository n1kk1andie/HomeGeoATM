import { getTranslations } from "next-intl/server";

// "Get it on Google Play", styled as the site's own rounded white button with
// Google's Play logo (taken from Google's badge), linking to the GeoATM listing.
export const PLAY_URL = "https://play.google.com/store/apps/details?id=app.GeoATM";

export default async function PlayBadge({ small = false, className }: { small?: boolean; className?: string }) {
  const t = await getTranslations("footer");
  return (
    <a
      className={`btn btn-outline play-btn${small ? " play-btn-sm" : ""}${className ? ` ${className}` : ""}`}
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("playAlt")}
    >
      <img src="/google-play-logo.png" alt="" aria-hidden="true" />
      <span className="play-txt">
        <small>{t("playTop")}</small>
        <b>Google Play</b>
      </span>
    </a>
  );
}
