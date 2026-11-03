/* GeoATM for operators — home.geoatm.app/operators
 * The commercial page: what banks and ATM operators get, how self-service
 * works, and what it costs. Registration and everything after it happen in
 * the operator portal (admin.geoatm.app); nothing here takes data or payment.
 * Describe only what the portal does today. */
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconArrowRight, IconBank, IconCheck, IconMap, IconNetwork, IconShield } from "@/components/icons";

const REGISTER_URL = "https://admin.geoatm.app/apply";
const SIGN_IN_URL = "https://admin.geoatm.app/operators";
const CONTACT_EMAIL = "info@geoatm.app";

export const metadata: Metadata = {
  title: "For banks and ATM operators",
  description:
    "Decisions about your ATM network, not just a map: how your network is covered, where you stand against other institutions, and how candidate sites compare. Free listing; Monitor with a 30-day free trial.",
  alternates: { canonical: "/operators" },
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    unit: "",
    for: "Every bank and ATM operator",
    items: ["List and correct your ATMs", "Their status shown in GeoATM", "Your own uptime, history and regulator reports"],
  },
  {
    name: "Monitor",
    price: "$12",
    unit: "per ATM / month · minimum $150",
    for: "Your network, day to day",
    items: [
      "Exceptions in your own status reports",
      "Your listings against the public record",
      "Other institutions' ATMs near yours",
      "What customers report at your ATMs",
      "Compare two networks, or two sites, in your country",
      "Send corrections to OpenStreetMap",
    ],
    note: "30-day free trial, from the day you're verified",
    lead: true,
  },
  {
    name: "Intelligence",
    price: "$25",
    unit: "per ATM / month · minimum $400",
    for: "Planning and expansion",
    items: [
      "Everything in Monitor",
      "Searches that found no ATM, at a distance you choose",
      "Coverage gaps near your network",
      "Compare up to five networks or sites, in any one country",
      "Search counts for each candidate site",
      "Download comparisons and demand figures to Excel",
    ],
    note: "Paid from activation; demonstration on request",
  },
  {
    name: "Enterprise",
    price: "Custom pricing",
    unit: "Tailored to your network and integrations",
    for: "Larger and multinational networks",
    items: [
      "Everything in Intelligence",
      "Compare up to ten networks and twenty sites, across borders",
      "Regional benchmarking",
      "Integration with your ATM monitoring systems, scoped with you",
      "Customised reporting, dedicated onboarding, a named contact and agreed service levels",
    ],
    note: "Contact sales",
    contact: true,
  },
];

/** The three decisions GeoATM supports, and the plan each starts on. */
const DECISIONS = [
  {
    title: "Network coverage",
    body: "Where your ATMs are, how each appears on the public record, and where people searching in the GeoATM app found no ATM within the distance you choose.",
    plan: "Listings on Monitor · search gaps on Intelligence",
  },
  {
    title: "Competitive position",
    body: "Your network beside any other institution's in a country: how many ATMs each has, how much of the country each covers, how often they sit within 1 km of each other, and where each is alone.",
    plan: "Two networks on Monitor · up to five on Intelligence",
  },
  {
    title: "Expansion opportunities",
    body: "Candidate sites side by side: your nearest ATM, other institutions within 1 km, the nearest ATM of any institution and, on Intelligence, the searches around each.",
    plan: "Two sites on Monitor · up to five on Intelligence",
  },
];

const MONITOR = [
  { title: "Availability", body: "Uptime and history for every ATM, from the daily status report you already produce. On every plan, Free included." },
  { title: "Exceptions", body: "Machines offline in several reports running, statuses that keep flipping, machines missing from your latest report, and reports that have stopped." },
  { title: "Competitor locations", body: "Other institutions' ATMs within 500 m and 1 km of yours, your most contested sites, and two networks compared side by side. Locations only: never another bank's status or data." },
  { title: "Customer issues", body: "When customers say an ATM had no cash or was out of service, you see it against the status you reported. This grows as more people use GeoATM." },
  { title: "Your listings against the public record", body: "ATMs missing from the public map, placed in the wrong spot or listed twice, listings under your name that aren't in your inventory, and hours that differ. Your administrators hear of new findings by email, at most once a day." },
];

const INTELLIGENCE = [
  { title: "Coverage analysis", body: "Areas where people searched and found no ATM within the distance you choose (5, 10, 15, 20 km or your own), against the ATMs mapped today, with the gaps near your network on your own map." },
  { title: "Expansion comparisons", body: "Up to five candidate sites in one country, side by side: the searches around each, your nearest ATM and the institutions already there." },
  { title: "Network comparisons", body: "Up to five institutions in any country: footprint, overlap and the areas where rivals are and you aren't." },
  { title: "Demand indicators", body: "Searches counted by area of about 2 km, month by month. Areas with fewer than three searches in a month are never shown." },
  { title: "Excel downloads", body: "Every comparison (networks, sites and, on Enterprise, the regional benchmark) and the demand figures, downloadable to Excel for your board and planning teams." },
];

const STEPS = [
  { title: "Register", body: "Choose your institution from the register and tell us who you are." },
  { title: "Verification", body: "Prove your email domain; someone at your organisation, found independently, confirms you." },
  { title: "Operator portal", body: "Add your ATMs. Each is checked against the public record and other institutions' listings." },
  { title: "30-day free trial", body: "Monitor, from the day you're verified. The portal keeps a running tally of what it found and what you fixed." },
  { title: "Subscription", body: "Continue on Monitor, move to Intelligence, or stay on Free. Nothing renews by itself." },
];

const FAQ = [
  { q: "Do we need to connect GeoATM to our ATMs?", a: "No. Monitor works from your ATM inventory and the daily status report you already produce, set against the public record of ATMs. Connecting your own monitoring system directly is something we scope with you on Enterprise." },
  { q: "What does verification establish?", a: "That your organisation controls its email domain, and that someone there, whom we found independently, confirmed you may act for it. It is not a banking licence; where a regulator publishes a list, the register shows that separately." },
  { q: "Can other banks see our data?", a: "No. Your status reports, uploads and findings are yours. Other institutions see your ATMs only as locations on the public map, as you see theirs, and that is all a network comparison uses." },
  { q: "Does GeoATM alert us when an ATM goes down?", a: "Not by itself: GeoATM isn't connected to your machines. It works from the status reports you upload, flags exceptions in them, and emails your administrators about new findings. Connecting your own monitoring system is something we scope with you on Enterprise." },
  { q: "How is the bill worked out?", a: "Per ATM listed on the 1st of the month, with a monthly minimum, billed by invoice. Annual terms get two months free. Upgrades start straight away; downgrades from the next period; nothing is prorated." },
];

export default function ProductPage() {
  return (
    <>
      <SiteHeader current="For Operators" />

      <section className="pp-hero">
        <div className="wrap pp-hero-grid">
          <div>
            <div className="pp-eyebrow">For banks and ATM operators</div>
            <h1>
              Decisions about your ATM network,
              <br />
              <span className="red">not just a map.</span>
            </h1>
            <p className="hero-sub">
              See how your network is covered, where you stand against other institutions, and how candidate sites compare. Built from
              your own inventory and reports, the public record of ATMs and searches in the GeoATM app.
            </p>
            <div className="hero-btns">
              <a className="btn btn-red" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                <IconBank /> Register your institution
              </a>
              <a className="btn btn-outline" href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer">
                Sign in
              </a>
            </div>
            <p className="pp-small">Listing is free. Monitor starts with a 30-day free trial.</p>
          </div>
          <NetworkPreview />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center">Three decisions, one network</h2>
          <div className="pp-grid">
            {DECISIONS.map((d) => (
              <div key={d.title} className="pp-feature">
                <h3>{d.title}</h3>
                <p>{d.body}</p>
                <p className="pp-feature-plan">{d.plan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pp-band">
        <div className="wrap">
          <h2 className="center">Monitor: your network, day to day</h2>
          <div className="pp-grid">
            {MONITOR.map((m) => (
              <div key={m.title} className="pp-feature">
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
            ))}
            <div className="pp-feature pp-feature-osm">
              <h3>Fix the public map, not just your records</h3>
              <p>Send a finding about your own ATM to OpenStreetMap as a note for local mappers to check, after seeing exactly what it will say.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center">Intelligence: planning where to go next</h2>
          <div className="pp-grid pp-grid-4">
            {INTELLIGENCE.map((m) => (
              <div key={m.title} className="pp-feature">
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
          <p className="pp-plans-lead" style={{ marginTop: 22 }}>
            Search counts come from people using GeoATM and grow with use; we hold no footfall or transaction data. Paid from
            activation, and we&apos;re happy to give you a demonstration first: {CONTACT_EMAIL}
          </p>
        </div>
      </section>

      <section className="section pp-band" id="plans">
        <div className="wrap">
          <h2 className="center">Plans</h2>
          <p className="pp-plans-lead">Per ATM per month, in US dollars, billed by invoice. Two months free on annual terms.</p>
          <div className="pp-plans">
            {PLANS.map((p) => (
              <div key={p.name} className={`pp-plan${p.lead ? " pp-plan-lead" : ""}`}>
                <div className="pp-plan-name">{p.name}</div>
                <div className="pp-plan-price">{p.price}</div>
                <div className="pp-plan-unit">{p.unit || " "}</div>
                <div className="pp-plan-for">{p.for}</div>
                <ul>
                  {p.items.map((i) => (
                    <li key={i}><IconCheck /> {i}</li>
                  ))}
                </ul>
                {"contact" in p && p.contact ? (
                  <a className="btn btn-outline-red pp-plan-cta" href={`mailto:${CONTACT_EMAIL}?subject=GeoATM%20Enterprise`}>Contact sales</a>
                ) : (
                  p.note && <div className="pp-plan-note">{p.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center">How self-service works</h2>
          <ol className="pp-steps">
            {STEPS.map((s) => (
              <li key={s.title}>
                <div className="pp-step-title">{s.title}</div>
                <div className="pp-step-body">{s.body}</div>
              </li>
            ))}
          </ol>
          <div className="center" style={{ marginTop: 32 }}>
            <a className="btn btn-red" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              Register your institution <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      <section className="section pp-band">
        <div className="wrap pp-trust">
          <div className="pp-trust-ic"><IconShield /></div>
          <div>
            <h3>Verified institutions, checked claims</h3>
            <p>
              Before a bank can publish, it proves control of its email domain and someone at the bank, found independently of the
              applicant, confirms them. Every ATM it adds is checked against the public map and other institutions&apos; listings; a
              disputed ATM stays off the map until it is resolved. Each decision is recorded in GeoVerify, the GEO network&apos;s
              verification service.
            </p>
          </div>
          <div className="pp-trust-ic"><IconNetwork /></div>
          <div>
            <h3>Your data stays yours</h3>
            <p>
              Status reports, uploads and findings are seen only by your organisation and the GeoATM team. Other institutions see your
              ATMs only as locations on the public map. Your own uptime, history and regulator reports are on every plan.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap faq-wrap">
          <h2 className="center">Questions institutions ask</h2>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>
                  <span>{f.q}</span>
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <a className="btn btn-red" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              Register your institution <IconArrowRight />
            </a>
            <p className="pp-small" style={{ marginTop: 12 }}>Already registered? <a href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer">Sign in</a></p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

/** Network Intelligence preview: a simplified map with illustrative markers. Not real data.
 *  Drawn the way the admin app's map draws them (apps/admin/components/MapView.tsx in GEOATM):
 *  your pins ringed in the status colours, other institutions as navy dots, network gaps as
 *  dashed pins and rings, coverage gaps as dashed circles. */
const PIN = "M0,-24 C-9.4,-24 -15,-17 -15,-9.5 C-15,1 0,13 0,13 C0,13 15,1 15,-9.5 C15,-17 9.4,-24 0,-24 Z";
// The app's status colours (STATUS_COLOR in apps/admin/lib/types.ts).
const STATUS = { available: "#0E8A4D", caution: "#A07208", empty: "#C7561A", offline: "#8A7E7A" } as const;
const YOURS: [number, number, keyof typeof STATUS][] = [[118, 126, "available"], [212, 116, "available"], [160, 226, "caution"], [252, 162, "available"], [92, 190, "empty"], [306, 108, "offline"]];
const OTHERS: [number, number][] = [[136, 144], [232, 130], [272, 180], [180, 248], [66, 160], [322, 128]];
const LEGEND: [keyof typeof STATUS, string][] = [["available", "Available"], ["caution", "Limited service"], ["empty", "Out of cash"], ["offline", "Out of service"]];

function NetworkPreview() {
  return (
    <figure className="np" aria-label="Illustration of GeoATM network intelligence on a map: your ATMs, other institutions nearby, a listing missing from the public map and a coverage gap. Illustrative, not real data.">
      <figcaption className="np-head">
        <span className="np-title">GeoATM Network Intelligence</span>
        <span className="np-tag">Illustrative</span>
      </figcaption>
      <div className="np-map">
        <svg viewBox="0 0 460 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="460" height="340" className="np-land" />
          <path className="np-water" d="M332,0 L460,0 L460,340 L428,340 C410,300 402,262 392,232 C376,186 356,150 346,112 C338,78 326,36 332,0 Z" />
          <rect className="np-park" x="36" y="232" width="74" height="46" rx="8" />
          <rect className="np-park" x="250" y="250" width="58" height="40" rx="8" />
          <g className="np-road">
            <path d="M0,60 L320,40" /><path d="M0,128 L340,112" /><path d="M0,196 L370,190" /><path d="M0,268 L460,286" />
            <path d="M60,0 L48,340" /><path d="M118,0 L112,340" /><path d="M232,0 L246,340" /><path d="M290,120 L300,340" />
          </g>
          <path className="np-main" d="M172,0 L176,340" />
          {/* Coverage gap: where people looked and found nothing */}
          <circle className="np-gap" cx="196" cy="300" r="34" />
          {/* Other institutions' ATMs: locations only */}
          {OTHERS.map(([x, y]) => (
            <circle key={`o${x}`} className="np-other" cx={x} cy={y} r="6.5" />
          ))}
          {/* A listing the public map puts in the wrong place: dashed line from your position to the map's */}
          <path className="np-moved" d="M252,162 L286,232" />
          <circle className="np-moved-at" cx="286" cy="232" r="4" />
          {/* One of yours that the public map doesn't show: a dashed ring at its point */}
          <circle className="np-missing-ring" cx="160" cy="226" r="17" />
          {/* Your ATMs, ringed by status */}
          {YOURS.map(([x, y, st]) => (
            <g key={`y${x}`} transform={`translate(${x} ${y})`}>
              <path className="np-pin" d={PIN} style={{ stroke: STATUS[st] }} />
              <circle cx="0" cy="-9.5" r="5" fill="#fff" />
            </g>
          ))}
          {/* Where the public map puts it */}
          <g transform="translate(286 232)">
            <path className="np-pin-missing" d={PIN} />
            <circle cx="0" cy="-9.5" r="4" className="np-pin-missing-dot" />
          </g>
        </svg>

        <div className="np-chips">
          <span className="np-chip"><svg viewBox="0 0 20 20"><path className="np-pin-missing" d="M10,2 C6,2 4,5 4,8 C4,12.5 10,18 10,18 C10,18 16,12.5 16,8 C16,5 14,2 10,2 Z" /></svg>Gaps<i>2</i></span>
          <span className="np-chip"><svg viewBox="0 0 20 20"><circle className="np-other" cx="10" cy="10" r="5" /></svg>Nearby<i>6</i></span>
          <span className="np-chip"><svg viewBox="0 0 20 20"><circle className="np-gap" cx="10" cy="10" r="6.5" /></svg>Coverage<i>1</i></span>
        </div>
      </div>
      <div className="np-legend" aria-hidden="true">
        {LEGEND.map(([k, label]) => (
          <span key={k}><i className="np-l-status" style={{ borderColor: STATUS[k] }} /> {label}</span>
        ))}
        <span><i className="np-l-other" /> Other institutions</span>
        <span><i className="np-l-netgap" /> Network gap</span>
        <span><i className="np-l-gap" /> Coverage gap</span>
      </div>
    </figure>
  );
}
