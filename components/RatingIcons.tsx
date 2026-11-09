import { getTranslations } from "next-intl/server";

// The app's age ratings from IARC, as each board's own icon: suitable for all
// ages everywhere. Icons are the rating boards' trademarks, shown unaltered
// for the rating the app was given.
/** All five icons are in public/ratings. */
const READY = true;

const RATINGS = [
  { src: "/ratings/esrb-everyone.png", alt: "ESRB: Everyone" },
  { src: "/ratings/pegi-3.png", alt: "PEGI 3" },
  { src: "/ratings/usk-0.png", alt: "USK ab 0" },
  { src: "/ratings/classind-l.png", alt: "ClassInd: L (Livre)" },
  { src: "/ratings/rars-0.png", alt: "RARS 0+" },
];

export default async function RatingIcons() {
  // Switched on once all five icons are in public/ratings: never a partial row or a broken image.
  if (!READY) return null;
  const t = await getTranslations("footer");
  return (
    <div className="ratings" role="list" aria-label={t("ratingsLabel")}>
      {RATINGS.map((r) => (
        <img key={r.src} role="listitem" src={r.src} alt={r.alt} title={r.alt} />
      ))}
    </div>
  );
}
