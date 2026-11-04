import { getTranslations } from "next-intl/server";
import NavActions from "@/components/NavActions";

// The GeoATM site header for pages other than the homepage: links back to the homepage's sections.
const NAV = [
  { id: "home", href: "/" },
  { id: "how", href: "/#how" },
  { id: "operators", href: "/operators" },
  { id: "faq", href: "/#faq" },
] as const;

export default async function SiteHeader({ current }: { current: string }) {
  const t = await getTranslations("nav");
  return (
    <header className="nav" id="top">
      <div className="wrap nav-inner">
        <a href="/" className="nav-logo" aria-label={t("homeLabel")}>
          <img src="/geoatm-lockup.png" alt={t("logoAlt")} />
        </a>
        <nav className="nav-links" aria-label={t("primary")}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={n.id === current ? "on" : ""}>
              {t(n.id)}
            </a>
          ))}
        </nav>
        <NavActions />
      </div>
    </header>
  );
}
