/* GeoATM marketing site — home.geoatm.app
 * A static informational landing page. No data, cash or admin code here. */

import Image from "next/image";
import NavActions from "@/components/NavActions";
import SiteFooter from "@/components/SiteFooter";
import { IconGlobe, IconPin, IconBank, IconBankBig, IconNetwork, IconScales, IconShield, IconUser, IconBulb, IconPhone, IconCheck, IconArrowRight, IconExternal, IconChevron, IconMap, IconList, IconHeart, IconMore } from "@/components/icons";

const APP_URL = "https://geoatm.app";
const CONTACT_EMAIL = "info@geoatm.app";
const PARTICIPATE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=GeoATM%20Participation%20Enquiry`;
/** Self-service registration for banks and ATM operators (the operator portal's application page). */
const REGISTER_URL = "https://admin.geoatm.app/apply";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "For Operators", href: "/operators" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// Single source of truth for the FAQ — rendered on the page AND emitted as
// FAQPage structured data so Google can show rich results.
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is GeoATM?",
    a: "GeoATM is an intelligent cash-access platform. It combines a directory of more than 238,000 ATM locations with live availability reported by participating institutions, so you can find the best place to withdraw cash — not just the nearest pin.",
  },
  {
    q: "How does GeoATM know if cash is available?",
    a: "Participating institutions publish live status for their machines directly to GeoATM, and GeoATM shows it as operator reported. Where a machine isn't yet part of a live feed, it's shown from public map data and clearly marked as estimated — GeoATM never claims a live cash status it can't confirm.",
  },
  {
    q: "Is GeoATM free to use?",
    a: "Yes. Finding ATMs and checking availability in the consumer app is free, everywhere GeoATM operates.",
  },
  {
    q: "How do institutions participate?",
    a: "Banks, ATM operators, processors and central banks can join the GeoATM network to publish live availability and gain visibility. Register your institution online: we verify your organisation, then your 30-day free trial of Monitor starts. Central banks and associations can write to us.",
  },
  {
    q: "Which countries are covered?",
    a: "GeoATM's directory maps more than 238,000 ATM locations in 219 countries and territories. Operator-reported live availability expands as more institutions join the network.",
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
          <NavActions />
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
              GeoATM helps people find nearby ATMs, check cash availability, and choose where to withdraw with confidence.
            </p>
            <p className="hero-sub-ops">
              ATM operators can also list their networks for free, monitor performance, and access powerful geographic
              intelligence to improve coverage, analyse competitive positioning, and make informed expansion decisions.
            </p>
            <div className="hero-btns">
              <a className="btn btn-red" href={APP_URL} target="_blank" rel="noopener noreferrer">
                <IconPhone /> Open GeoATM
              </a>
              <a className="btn btn-outline" href="/operators">
                <IconBank /> For banks and operators
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden>
            {/* A real map of central London, with GeoATM pins at real places */}
            <div className="hero-scene" />
            <Image
              src="/home/geoatm-finder-phone.png"
              alt=""
              width={560}
              height={1069}
              priority
              sizes="(max-width: 900px) 70vw, 300px"
              className="hero-phone"
            />
          </div>
        </div>
      </section>

      {/* ---------- Stats bar ---------- */}
      <section className="stats">
        <div className="wrap stats-grid">
          <Stat icon={<IconGlobe />} big="219" mid="Countries & territories" sub="With mapped ATM locations" />
          <Stat icon={<IconPin />} big="238,000+" mid="ATM locations" sub="Mapped worldwide, refreshed weekly" />
          <Stat icon={<IconBank />} big="Growing" mid="Network" sub="of participating institutions" />
          <Stat icon={<IconShield />} big="Live" mid="Operator-reported status" sub="Expanding globally" />
        </div>
      </section>

      {/* ---------- Two audiences ---------- */}
      <section className="section">
        <div className="wrap">
          <h2 className="center">Built for the whole cash ecosystem</h2>
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
                <li><IconCheck /> Live status from participating banks</li>
                <li><IconCheck /> Compare nearby cash access</li>
                <li><IconCheck /> Smart recommendations</li>
                <li><IconCheck /> Available in 219 countries and territories</li>
              </ul>
              <ConsumerMock />
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
                Publish live ATM availability, improve customer experience, and reach customers
                across 238,000+ mapped ATM locations in 219 countries and territories.
              </p>
              <DashboardMock />
              <a className="link-red" href="/operators">
                See what operators get <IconArrowRight />
              </a>
            </div>
            {/* Industry Associations */}
            <div className="aud-card">
              <div className="aud-head">
                <span className="aud-ic"><IconNetwork /></span>
                <h3 className="red">Industry Associations</h3>
              </div>
              <p className="aud-lead">Coordinate cash access across your membership.</p>
              <p className="aud-body">
                Give members and the public a shared, current view of the sector's ATM network while
                reducing duplicated data collection and publishing.
              </p>
              <ul className="ticks">
                <li><IconCheck /> Maintain one consolidated view of member ATM networks</li>
                <li><IconCheck /> Reduce duplicated collection and reconciliation of ATM information</li>
                <li><IconCheck /> Publish consistent ATM and cash-access information for the sector</li>
                <li><IconCheck /> See which institutions and regions provide coverage—and where gaps remain</li>
                <li><IconCheck /> Track changes in network availability and geographic reach</li>
                <li><IconCheck /> Give members shared intelligence on consumer cash demand and access patterns</li>
              </ul>
              <AssociationMock />
              <a
                className="link-red"
                href={`mailto:${CONTACT_EMAIL}?subject=GeoATM%20Industry%20Association%20Access`}
              >
                Explore Industry Access <IconArrowRight />
              </a>
            </div>
            {/* Central Banks & Public Authorities */}
            <div className="aud-card">
              <div className="aud-head">
                <span className="aud-ic"><IconScales /></span>
                <h3 className="red">Central Banks &amp; Public Authorities</h3>
              </div>
              <p className="aud-lead">Manage the national picture of cash access.</p>
              <p className="aud-body">
                For authorities that already collect, maintain, monitor or publish ATM information,
                GeoATM can become a common infrastructure layer for keeping that information current,
                understanding whether infrastructure is actually available, and communicating cash
                access to the public.
              </p>
              <ul className="ticks">
                <li><IconCheck /> Maintain a consolidated national view of ATM infrastructure</li>
                <li><IconCheck /> Reduce manual collection, reconciliation and publication of ATM information</li>
                <li><IconCheck /> Distinguish ATM locations from machines actually available to consumers</li>
                <li><IconCheck /> Monitor geographic coverage and emerging cash-access gaps</li>
                <li><IconCheck /> Understand network resilience when institutions or areas experience disruption</li>
                <li><IconCheck /> Publish trusted, current cash-access information through a consumer-facing network</li>
                <li><IconCheck /> Use aggregated demand and journey intelligence to see where people seek cash</li>
              </ul>
              <AuthorityMock />
              <a
                className="link-red"
                href={`mailto:${CONTACT_EMAIL}?subject=GeoATM%20Institutional%20Briefing%20Request`}
              >
                Request an Institutional Briefing <IconArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Why GeoATM ---------- */}
      <section className="section why-band" id="about">
        <div className="wrap">
          <h2 className="center">Why GeoATM?</h2>
          <div className="why-grid">
            <Why
              icon={<IconGlobe />}
              title="Global Directory"
              body="238,000+ ATM locations mapped in 219 countries and territories, refreshed weekly."
            />
            <Why
              icon={<IconShield />}
              title="Operator-reported status"
              body="Participating institutions publish live ATM availability directly to customers."
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
              <Step n="3" icon={<IconShield solid />} title="Participating institutions publish live status" sub="Live availability from participating partners" />
              <IconArrowRight className="step-arrow" />
              <Step n="4" icon={<IconCheck />} title="Choose the best place to get cash" sub="Go with confidence" />
            </div>
          </div>

          <div className="panel panel-inst" id="institutions">
            <IconBankBig className="inst-bg" />
            <div className="inst-eyebrow">For Financial Institutions</div>
            <h3 className="inst-title red">Become a GeoATM Participant</h3>
            <p className="inst-body">
              Banks and ATM operators list their ATMs free, and Monitor shows how their network looks to the
              world: listing gaps, nearby institutions and exceptions in their own reports.
            </p>
            <div className="inst-btns">
              <a className="btn btn-red" href="/operators">
                <IconBank /> See what operators get
              </a>
              <a className="btn btn-outline" href={REGISTER_URL}>
                Register your institution
              </a>
            </div>
            <p className="inst-alt">
              Already registered? <a href="https://admin.geoatm.app/">Sign in</a> · Central banks and associations:{" "}
              <a href={PARTICIPATE_MAILTO}>{CONTACT_EMAIL}</a>
            </p>
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
              directory with live availability reported by participating institutions, GeoATM helps
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

      <SiteFooter />
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

/* ---------- Phone mockup (neutral — no bank branding) ---------- */

// Illustrative product UI — shows the shape of each view, not real metrics.
// No figures are shown (nothing here should read as live data).
// Consumer view: the best place for cash nearby, not just the nearest pin.
// Illustrative.
function ConsumerMock() {
  return (
    <div className="dash">
      <div className="dash-head"><IconPin /> Best places for cash nearby</div>
      <div className="cm-row best">
        <span className="cm-rank">1</span>
        <span className="cm-txt"><b>City Centre</b><small>0.3 km · 3 ATMs · 24-hour</small></span>
        <span className="cm-badge ok">Cash available</span>
      </div>
      <div className="cm-row">
        <span className="cm-rank">2</span>
        <span className="cm-txt"><b>Half Way Tree</b><small>1.1 km · 2 ATMs</small></span>
        <span className="cm-badge">Location only</span>
      </div>
      <div className="dash-foot"><IconBulb /> Recommended for cash, not just distance</div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="dash">
      <div className="dash-head"><IconShield solid /> Operator reported</div>
      <div className="dash-row">
        <div className="dash-label">Live ATM status</div>
        <div className="ring">
          <svg viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" className="ring-bg" />
            <circle cx="22" cy="22" r="18" className="ring-fg" strokeDasharray="113" strokeDashoffset="0" />
          </svg>
          <div className="ring-num">
            <svg viewBox="0 0 24 24" fill="none" stroke="#17A45B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
          </div>
        </div>
      </div>
      <div className="dash-avail">Live from the bank</div>
      <div className="dash-label">Customer reach</div>
      <div className="bars">
        {[38, 30, 52, 44, 60, 50, 72, 66, 84].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

// Association-level view: many member institutions consolidated into one sector
// picture — reporting status, coverage and gaps. Illustrative, no figures.
function AssociationMock() {
  const members = ["ok", "ok", "ok", "ok", "ok", "ok", "ok", "late", "ok"] as const;
  return (
    <div className="dash">
      <div className="dash-head"><IconNetwork /> Sector network view</div>
      <div className="dash-label">Member reporting status</div>
      <div className="memberdots">
        {members.map((m, i) => (
          <span key={i} className={`mdot ${m}`} />
        ))}
      </div>
      <div className="legendrow">
        <span><i className="lg green" /> Reporting</span>
        <span><i className="lg amber" /> Late</span>
      </div>
      <div className="dash-label" style={{ marginTop: 12 }}>Network coverage</div>
      <div className="covbar"><i style={{ width: "72%" }} /></div>
      <div className="dash-foot">
        <span className="gapdot" /> Emerging access gaps flagged
      </div>
    </div>
  );
}

// National command view: coverage heat, what's operator-reported vs located, underserved
// areas and resilience — the shape of the view, no figures.
function AuthorityMock() {
  const heat = [
    0.9, 0.8, 0.6, 0.5, 0.7, 0.9,
    0.8, 0.7, 0.4, 0.3, 0.6, 0.8,
    0.6, 0.5, 0.3, 0.2, 0.4, 0.7,
    0.7, 0.6, 0.5, 0.4, 0.6, 0.8,
  ];
  return (
    <div className="dash">
      <div className="dash-head"><IconScales /> National cash-access</div>
      <div className="cmdgrid">
        <div className="heatmap" aria-hidden>
          {heat.map((v, i) => (
            <i key={i} style={{ background: `rgba(228,1,43,${0.12 + v * 0.78})` }} />
          ))}
        </div>
        <div className="cmdstats">
          <div className="cmd-stat2"><span className="csdot green" /> Operator-reported &amp; live</div>
          <div className="cmd-stat2"><span className="csdot amber" /> Located, no live status</div>
          <div className="cmd-stat2"><span className="csdot gap" /> Underserved areas</div>
          <div className="cmd-stat2"><span className="csdot line" /> Network resilience</div>
        </div>
      </div>
      <div className="heatlegend"><span>Lower coverage</span><i /><span>higher</span></div>
      <div className="dash-foot">
        <span className="gapdot" /> Demand concentrated in urban corridors
      </div>
    </div>
  );
}
