import { IconExternal } from "@/components/icons";

// The GeoATM site header for pages other than the homepage: links back to the homepage's sections.
const NAV = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how" },
  { label: "For Operators", href: "/operators" },
  { label: "FAQ", href: "/#faq" },
];

export default function SiteHeader({ current }: { current: string }) {
  return (
    <header className="nav" id="top">
      <div className="wrap nav-inner">
        <a href="/" className="nav-logo" aria-label="GeoATM home">
          <img src="/geoatm-lockup.png" alt="GeoATM — Live, Local Everywhere" />
        </a>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={n.label === current ? "on" : ""}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-red nav-cta" href="https://admin.geoatm.app/operators" target="_blank" rel="noopener noreferrer">
          Sign in <IconExternal />
        </a>
      </div>
    </header>
  );
}
