import Subscribe from "@/components/Subscribe";
import { IconInstagram, IconLinkedIn, IconFacebook } from "@/components/icons";

// The GeoATM site footer, shared by the home and product pages.
const APP_URL = "https://geoatm.app";
const CONTACT_EMAIL = "info@geoatm.app";
const PARTICIPATE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=GeoATM%20Participation%20Enquiry`;
const REGISTER_URL = "https://admin.geoatm.app/apply";

export default function SiteFooter() {
  return (
    <>
      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <Subscribe />
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src="/geoatm-lockup-white.png" alt="GeoATM" />
            <p>The world's intelligent cash-access network.</p>
            <div className="socials" aria-label="Social links">
              <a href="https://www.facebook.com/profile.php?id=61595043167041" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><IconFacebook /></a>
              <a href="https://www.instagram.com/tumblehill.labs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconInstagram /></a>
              <a href="https://www.linkedin.com/company/tumblehillholdings/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
            </div>
          </div>

          <FooterCol
            title="For Consumers"
            links={[
              { label: "Open GeoATM", href: APP_URL },
              { label: "FAQ", href: "/#faq" },
              { label: "Support", href: `mailto:${CONTACT_EMAIL}` },
              { label: "Privacy Policy", href: "https://geoatm.app/legal/GeoATM-Privacy-Policy.pdf" },
              { label: "Terms of Use", href: "https://geoatm.app/legal/GeoATM-Terms-of-Use.pdf" },
            ]}
          />
          <FooterCol
            title="For Institutions"
            links={[
              { label: "For operators: plans and pricing", href: "/operators" },
              { label: "Register your institution", href: REGISTER_URL },
              { label: "Operator-reported status", href: "/#about" },
              { label: "Partner Benefits", href: "/operators" },
              { label: "Contact Partnerships", href: PARTICIPATE_MAILTO },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About GeoATM", href: "/#about" },
              { label: "GeoEV: EV charging", href: "https://home.geoev.app" },
              { label: "Geo API for developers", href: "https://geoatm.app/developers" },
              { label: "Careers", href: `mailto:${CONTACT_EMAIL}` },
              { label: "Tumblehill Holdings", href: "https://www.tumblehillholdings.com" },
            ]}
          />
        </div>
        <div className="footer-bottom">
          <div className="wrap">
            GeoATM&trade; by{" "}
            <a href="https://www.tumblehillholdings.com/research/labs/geoatm" target="_blank" rel="noopener noreferrer">
              Tumblehill Labs
            </a>
            {" · "}Part of the{" "}
            <a href="https://www.tumblehillholdings.com/research/labs/geo" target="_blank" rel="noopener noreferrer">GEO intelligence network</a>
            <br />
            A product studio of{" "}
            <a href="https://www.tumblehillholdings.com" target="_blank" rel="noopener noreferrer">
              Tumblehill Holdings LLC
            </a>
            <br />
            <br />
            © 2026 Tumblehill Holdings LLC. All rights reserved.
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
          <li key={l.label}>
            <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

