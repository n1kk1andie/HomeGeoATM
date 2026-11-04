import { getTranslations } from "next-intl/server";
import Subscribe from "@/components/Subscribe";
import { IconInstagram, IconLinkedIn, IconFacebook } from "@/components/icons";

// The GeoATM site footer, shared by the home and product pages.
const APP_URL = "https://geoatm.app";
const CONTACT_EMAIL = "info@geoatm.app";
const PARTICIPATE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=GeoATM%20Participation%20Enquiry`;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  const link = (href: string) => (chunks: React.ReactNode) => <a href={href} {...ext}>{chunks}</a>;
  return (
    <>
      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <Subscribe />
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src="/geoatm-lockup-white.png" alt={t("logoAlt")} />
            <p>{t("tagline")}</p>
            <div className="socials" aria-label={t("social")}>
              <a href="https://www.facebook.com/profile.php?id=61595043167041" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><IconFacebook /></a>
              <a href="https://www.instagram.com/tumblehill.labs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconInstagram /></a>
              <a href="https://www.linkedin.com/company/tumblehillholdings/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
            </div>
          </div>

          <FooterCol
            title={t("consumers")}
            links={[
              { label: t("open"), href: APP_URL },
              { label: t("faq"), href: "/#faq" },
              { label: t("support"), href: `mailto:${CONTACT_EMAIL}` },
              { label: t("privacy"), href: "https://geoatm.app/legal/GeoATM-Privacy-Policy.pdf" },
              { label: t("terms"), href: "https://geoatm.app/legal/GeoATM-Terms-of-Use.pdf" },
            ]}
          />
          <FooterCol
            title={t("institutions")}
            links={[
              { label: t("plans"), href: "/operators" },
              { label: t("status"), href: "/#about" },
              { label: t("benefits"), href: "/operators" },
              { label: t("partnerships"), href: PARTICIPATE_MAILTO },
            ]}
          />
          <FooterCol
            title={t("company")}
            links={[
              { label: t("aboutGeo"), href: "/#about" },
              { label: t("geoev"), href: "https://home.geoev.app" },
              { label: t("api"), href: "https://geoatm.app/developers" },
              { label: t("careers"), href: `mailto:${CONTACT_EMAIL}` },
              { label: t("holdings"), href: "https://www.tumblehillholdings.com" },
            ]}
          />
        </div>
        <div className="footer-bottom">
          <div className="wrap">
            {t.rich("by", { a: link("https://www.tumblehillholdings.com/research/labs/geoatm") })}
            {" · "}
            {t.rich("partOf", { a: link("https://www.tumblehillholdings.com/research/labs/geo") })}
            <br />
            {t.rich("studio", { a: link("https://www.tumblehillholdings.com") })}
            <br />
            <br />
            {t("rights")}
            <br />
            {t.rich("maps", { a: link("https://www.openstreetmap.org/copyright") })}
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="footer-col">
      <h4>{title}</h4>
      <ul>
        {links.map((l) => (
          <li key={l.href + l.label}>
            <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
