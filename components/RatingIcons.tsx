import { getTranslations } from "next-intl/server";

// The app's age ratings from IARC, as each board's own icon: suitable for all
// ages everywhere. Icons are the rating boards' trademarks, shown unaltered
// for the rating the app was given.
const RATINGS = [
  { src: "/ratings/esrb-everyone.svg", alt: "ESRB: Everyone" },
  { src: "/ratings/pegi-3.svg", alt: "PEGI 3" },
  { src: "/ratings/usk-0.svg", alt: "USK ab 0" },
  { src: "/ratings/classind-l.svg", alt: "ClassInd: L (Livre)" },
  { src: "/ratings/rars-0.svg", alt: "RARS 0+" },
];

export default async function RatingIcons() {
  const t = await getTranslations("footer");
  return (
    <div className="ratings" role="list" aria-label={t("ratingsLabel")}>
      {RATINGS.map((r) => (
        <img key={r.src} role="listitem" src={r.src} alt={r.alt} title={r.alt} />
      ))}
    </div>
  );
}
