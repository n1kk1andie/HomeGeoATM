/* GeoATM marketing site — home.geoatm.app
 * A static informational landing page. No data, cash or admin code here. */

const APP_URL = "https://geoatm.app";
const CONTACT_EMAIL = "info@geoatm.app";
const PARTICIPATE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=GeoATM%20Participation%20Enquiry`;

const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "For Institutions", href: "#institutions" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// Single source of truth for the FAQ — rendered on the page AND emitted as
// FAQPage structured data so Google can show rich results.
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is GeoATM?",
    a: "GeoATM is an intelligent cash-access platform. It combines one of the world's largest ATM directories with verified live availability from participating institutions, so you can find the best place to withdraw cash — not just the nearest pin.",
  },
  {
    q: "How does GeoATM know if cash is available?",
    a: "Participating institutions publish verified live status for their machines directly to GeoATM. Where a machine isn't yet part of a live feed, it's shown from public map data and clearly marked as estimated — GeoATM never claims a live cash status it can't confirm.",
  },
  {
    q: "Is GeoATM free to use?",
    a: "Yes. Finding ATMs and checking availability in the consumer app is free, everywhere GeoATM operates.",
  },
  {
    q: "How do institutions participate?",
    a: "Banks, ATM operators, processors and central banks can join the GeoATM network to publish verified availability and gain visibility. Request participation and our team will be in touch.",
  },
  {
    q: "Which countries are covered?",
    a: "GeoATM's directory spans 195+ countries. Verified live availability expands as more institutions join the network.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      {/* ---------- Nav ---------- */}
      <header className="nav" id="top">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-logo" aria-label="GeoATM home">
            <img src="/geoatm-lockup.png" alt="GeoATM — Live, Local Everywhere" />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={n.label === "Home" ? "on" : ""}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="btn btn-red nav-cta" href={APP_URL} target="_blank" rel="noopener noreferrer">
            Open GeoATM <IconExternal />
          </a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>
              Know where cash is.
              <br />
              <span className="red">Before you go.</span>
            </h1>
            <p className="hero-sub">
              GeoATM helps people find nearby ATMs, see where cash is available, and choose the best
              place to withdraw cash with confidence.
            </p>
            <div className="hero-btns">
              <a className="btn btn-red" href={APP_URL} target="_blank" rel="noopener noreferrer">
                <IconPhone /> Open GeoATM
              </a>
              <a className="btn btn-outline" href="#institutions">
                <IconBank /> Become a Participant
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden>
            <WorldArcs />
            <Phone />
          </div>
        </div>
      </section>

      {/* ---------- Stats bar ---------- */}
      <section className="stats">
        <div className="wrap stats-grid">
          <Stat icon={<IconGlobe />} big="195+" mid="Countries" sub="Global coverage" />
          <Stat icon={<IconPin />} big="Millions" mid="of ATM Locations" sub="One of the world's largest directories" />
          <Stat icon={<IconBank />} big="Growing" mid="Network" sub="of participating institutions" />
          <Stat icon={<IconShield />} big="GeoATM" mid="Verified" sub="Expanding globally" />
        </div>
      </section>

      {/* ---------- Two audiences ---------- */}
      <section className="section">
        <div className="wrap">
          <h2 className="center">Built for two audiences</h2>
          <div className="aud-grid">
            {/* Consumers */}
            <div className="aud-card">
              <div className="aud-head">
                <span className="aud-ic"><IconUser /></span>
                <h3 className="red">For Consumers</h3>
              </div>
              <p className="aud-lead">Find the best ATM nearby—not just the nearest one.</p>
              <ul className="ticks">
                <li><IconCheck /> Find nearby ATMs</li>
                <li><IconCheck /> GeoATM Verified locations</li>
                <li><IconCheck /> Compare nearby cash access</li>
                <li><IconCheck /> Smart recommendations</li>
                <li><IconCheck /> Available in 195+ countries</li>
              </ul>
              <a className="link-red" href={APP_URL} target="_blank" rel="noopener noreferrer">
                Launch App <IconArrowRight />
              </a>
            </div>
            {/* Institutions */}
            <div className="aud-card">
              <div className="aud-head">
                <span className="aud-ic"><IconBank /></span>
                <h3 className="red">For Financial Institutions</h3>
              </div>
              <p className="aud-lead">Join the GeoATM network.</p>
              <p className="aud-body">
                Provide verified ATM availability, improve customer experience, and increase
                visibility across the world's first intelligent cash-access platform.
              </p>
              <DashboardMock />
              <a className="link-red" href="#institutions">
                Become a Participant <IconArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Why GeoATM ---------- */}
      <section className="section" id="about">
        <div className="wrap">
          <h2 className="center">Why GeoATM?</h2>
          <div className="why-grid">
            <Why
              icon={<IconGlobe />}
              title="Global Directory"
              body="Access one of the world's largest and most comprehensive ATM directories."
            />
            <Why
              icon={<IconShield />}
              title="GeoATM Verified"
              body="Participating institutions can publish verified live ATM availability directly to customers."
            />
            <Why
              icon={<IconBulb />}
              title="Intelligent Recommendations"
              body="GeoATM doesn't simply show the nearest ATM. It recommends the best place to get cash with confidence."
            />
          </div>
        </div>
      </section>

      {/* ---------- How it works + Participate ---------- */}
      <section className="section" id="how">
        <div className="wrap how-grid">
          <div className="panel">
            <h3 className="panel-title">How it Works</h3>
            <div className="steps">
              <Step n="1" icon={<IconPhone />} title="Open GeoATM" sub="Launch the app or website" />
              <IconArrowRight className="step-arrow" />
              <Step n="2" icon={<IconPin />} title="GeoATM finds nearby ATMs" sub="Search by location or allow GPS" />
              <IconArrowRight className="step-arrow" />
              <Step n="3" icon={<IconShield solid />} title="Verified institutions publish live status" sub="Live availability from participating partners" />
              <IconArrowRight className="step-arrow" />
              <Step n="4" icon={<IconCheckCircle />} title="Choose the best place to get cash" sub="Go with confidence" />
            </div>
          </div>

          <div className="panel panel-inst" id="institutions">
            <IconBankBig className="inst-bg" />
            <div className="inst-eyebrow">For Financial Institutions</div>
            <h3 className="inst-title red">Become a GeoATM Participant</h3>
            <p className="inst-body">
              GeoATM partners with banks, ATM operators, processors, central banks and financial
              institutions to deliver trusted live ATM information.
            </p>
            <ul className="ticks two-col">
              <li><IconCheck /> GeoATM Verified</li>
              <li><IconCheck /> Global visibility</li>
              <li><IconCheck /> Better customer experience</li>
              <li><IconCheck /> Secure integration</li>
              <li><IconCheck /> Live ATM availability</li>
            </ul>
            <a className="btn btn-red" href={PARTICIPATE_MAILTO}>
              <IconBank /> Request Participation
            </a>
          </div>
        </div>
      </section>

      {/* ---------- About strip ---------- */}
      <section className="section">
        <div className="wrap about-strip">
          <div className="about-text">
            <h3 className="panel-title">About GeoATM</h3>
            <p>
              GeoATM is building the world's trusted cash-access network. By combining a global ATM
              directory with verified live availability from participating institutions, GeoATM helps
              consumers make better decisions while helping financial institutions better serve their
              customers.
            </p>
          </div>
          <img className="about-logo" src="/geoatm-lockup.png" alt="GeoATM" />
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" id="faq">
        <div className="wrap faq-wrap">
          <h2 className="center">Frequently asked questions</h2>
          <div className="faq">
            {FAQ_ITEMS.map((f) => (
              <Faq key={f.q} q={f.q}>{f.a}</Faq>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
          />
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="section" id="contact">
        <div className="wrap contact-card">
          <div>
            <h2>Contact</h2>
            <p>We'd love to hear from you. For general enquiries and partnership requests, reach us any time.</p>
            <p className="contact-email">Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          </div>
          <a className="btn btn-red" href={`mailto:${CONTACT_EMAIL}`}>
            Contact Us <IconArrowRight />
          </a>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src="/geoatm-lockup-white.png" alt="GeoATM" />
            <p>The world's intelligent cash-access network.</p>
            <div className="socials" aria-label="Social links">
              <a href="#" aria-label="Facebook"><IconFacebook /></a>
              <a href="#" aria-label="X"><IconX /></a>
              <a href="#" aria-label="LinkedIn"><IconLinkedIn /></a>
              <a href="#" aria-label="YouTube"><IconYouTube /></a>
            </div>
          </div>

          <FooterCol
            title="For Consumers"
            links={[
              { label: "Open GeoATM", href: APP_URL },
              { label: "FAQ", href: "#faq" },
              { label: "Support", href: `mailto:${CONTACT_EMAIL}` },
              { label: "Privacy Policy", href: "https://geoatm.app/legal/GeoATM-Privacy-Policy.pdf" },
              { label: "Terms of Use", href: "https://geoatm.app/legal/GeoATM-Terms-of-Use.pdf" },
            ]}
          />
          <FooterCol
            title="For Institutions"
            links={[
              { label: "Become a Participant", href: "#institutions" },
              { label: "GeoATM Verified", href: "#about" },
              { label: "Partner Benefits", href: "#institutions" },
              { label: "Contact Partnerships", href: PARTICIPATE_MAILTO },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About GeoATM", href: "#about" },
              { label: "News", href: "#top" },
              { label: "Careers", href: `mailto:${CONTACT_EMAIL}` },
              { label: "Tumblehill Holdings", href: "https://www.tumblehillholdings.com/research/labs/geoatm" },
            ]}
          />
          <div className="footer-col">
            <h4>Contact</h4>
            <p className="footer-contact">Email: {CONTACT_EMAIL}</p>
            <p className="footer-contact">We'd love to hear from you.</p>
            <a className="btn btn-outline-red" href={`mailto:${CONTACT_EMAIL}`}>
              Contact Us <IconArrowRight />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="wrap">© {new Date().getFullYear()} GeoATM. All rights reserved. · GeoATM™ by Tumblehill Labs</div>
        </div>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Stat({ icon, big, mid, sub }: { icon: React.ReactNode; big: string; mid: string; sub: string }) {
  return (
    <div className="stat">
      <span className="stat-ic">{icon}</span>
      <div className="stat-txt">
        <div className="stat-big">{big}</div>
        <div className="stat-mid">{mid}</div>
        <div className="stat-sub">{sub}</div>
      </div>
    </div>
  );
}

function Why({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="why">
      <span className="why-ic">{icon}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function Step({ n, icon, title, sub }: { n: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="step">
      <span className="step-ic">{icon}</span>
      <div className="step-n">{n}</div>
      <div className="step-title">{title}</div>
      <div className="step-sub">{sub}</div>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="faq-item">
      <summary>
        <span>{q}</span>
        <span className="faq-plus" aria-hidden><IconChevron /></span>
      </summary>
      <div className="faq-a">{children}</div>
    </details>
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

/* ---------- Phone mockup (neutral — no bank branding) ---------- */
function Phone() {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="pscreen-top">
          <img src="/geoatm-lockup.png" alt="GeoATM" />
        </div>
        <div className="pmap">
          <span className="ppin p1"><PinGlyph /></span>
          <span className="ppin p2"><PinGlyph /></span>
          <span className="ppin p3"><PinGlyph /></span>
          <span className="ppin p4"><PinGlyph /></span>
          <span className="ppin p5"><PinGlyph ink /></span>
          <span className="pme" />
        </div>
        <div className="pcard">
          <div className="pcard-row">
            <div>
              <div className="pcard-name">New Kingston</div>
              <div className="pcard-dist"><span className="pdot" /> 0.3 km away</div>
            </div>
            <span className="pbadge">Cash Available</span>
          </div>
          <div className="pcard-btn">View Details</div>
        </div>
        <div className="ptabs">
          <span className="ptab on"><IconMap /> Map</span>
          <span className="ptab"><IconList /> List</span>
          <span className="ptab"><IconHeart /> Favorites</span>
          <span className="ptab"><IconMore /> More</span>
        </div>
      </div>
    </div>
  );
}

function WorldArcs() {
  return (
    <svg className="world" viewBox="0 0 620 460" fill="none" aria-hidden>
      <path className="arc" d="M60 250 Q 250 60 470 150" />
      <path className="arc" d="M90 330 Q 300 420 540 300" />
      <path className="arc" d="M120 180 Q 320 120 500 260" />
      <circle className="arc-dot" cx="60" cy="250" r="4" />
      <circle className="arc-dot" cx="470" cy="150" r="4" />
      <circle className="arc-dot" cx="540" cy="300" r="4" />
      <circle className="arc-dot" cx="90" cy="330" r="4" />
      <circle className="arc-dot" cx="500" cy="260" r="4" />
    </svg>
  );
}

function DashboardMock() {
  return (
    <div className="dash">
      <div className="dash-head"><IconShield solid /> GeoATM Verified</div>
      <div className="dash-row">
        <div className="dash-label">Live ATM Status</div>
        <div className="ring">
          <svg viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" className="ring-bg" />
            <circle cx="22" cy="22" r="18" className="ring-fg" strokeDasharray="113" strokeDashoffset="4" />
          </svg>
          <div className="ring-num">98%</div>
        </div>
      </div>
      <div className="dash-avail">Availability</div>
      <div className="dash-label">Customer Reach</div>
      <div className="bars">
        {[38, 30, 52, 44, 60, 50, 72, 66, 84].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icons                                                              */
/* ------------------------------------------------------------------ */
const S = (p: React.SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

function IconGlobe(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></svg>;
}
function IconPin(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
function IconBank(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M3 10 12 4l9 6" /><path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" /></svg>;
}
function IconBankBig(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M3 10 12 4l9 6" /><path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" /></svg>;
}
function IconShield({ solid, ...p }: { solid?: boolean } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...S(p)} fill={solid ? "currentColor" : "none"}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      {!solid && <path d="m9 12 2 2 4-4" />}
    </svg>
  );
}
function IconUser(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>;
}
function IconBulb(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" /></svg>;
}
function IconPhone(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg>;
}
function IconCheck(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="m5 12 5 5L20 7" /></svg>;
}
function IconCheckCircle(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)} fill="currentColor" stroke="#fff"><circle cx="12" cy="12" r="10" stroke="none" /><path d="m8 12 3 3 5-5" fill="none" stroke="#fff" /></svg>;
}
function IconArrowRight(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
function IconExternal(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>;
}
function IconChevron(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="m6 9 6 6 6-6" /></svg>;
}
function IconMap(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></svg>;
}
function IconList(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>;
}
function IconHeart(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M12 21C5 15 3 12 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 12 19 15 12 21Z" /></svg>;
}
function IconMore(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" /></svg>;
}
function PinGlyph({ ink }: { ink?: boolean }) {
  return (
    <svg viewBox="0 0 24 32" fill={ink ? "#122036" : "#E4012B"} aria-hidden>
      <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20 12 32 12 32s12-12 12-20.3C24 5.2 18.6 0 12 0Z" />
      <circle cx="12" cy="11.5" r="4.2" fill="#fff" />
    </svg>
  );
}
function IconFacebook(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" /></svg>;
}
function IconX(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M3 3h4.5l4 5.7L16.5 3H21l-6.6 8.4L21 21h-4.5l-4.3-6.1L7.4 21H3l7-8.9L3 3Z" /></svg>;
}
function IconLinkedIn(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M6.5 8H4v11h2.5V8ZM5.2 3.5A1.5 1.5 0 1 0 5.2 6.5 1.5 1.5 0 0 0 5.2 3.5ZM20 19h-2.5v-5.5c0-1.4-.9-2-1.7-2s-1.8.6-1.8 2V19H11.5V8H14v1.3c.4-.7 1.5-1.5 2.9-1.5 2 0 3.1 1.4 3.1 4V19Z" /></svg>;
}
function IconYouTube(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1c.3-1.3.4-3.8.4-3.8s0-2.5-.4-3.8ZM10 15V9l5 3-5 3Z" /></svg>;
}
