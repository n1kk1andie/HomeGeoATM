/* GeoATM for operators — home.geoatm.app/operators
 * The commercial page: what banks and ATM operators get, how self-service
 * works, and what it costs. Registration and everything after it happen in
 * the operator portal (admin.geoatm.app); nothing here takes data or payment.
 * Describe only what the portal does today. */
import type { Metadata } from "next";
import Image from "next/image";
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
    price: "$35",
    unit: "per ATM / month · minimum $1,000",
    for: "Larger and multinational networks",
    items: [
      "Everything in Intelligence",
      "Compare up to ten networks and twenty sites, across borders",
      "Regional benchmarking",
      "Integration with your ATM monitoring systems, scoped with you",
    ],
    note: "Chosen in the portal like any other plan",
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
              See how your network is covered, where you stand against other institutions, and where your next ATM could make the
              greatest difference. Built from your own inventory and reports, the public record of ATMs and searches in the GeoATM app.
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
          <figure className="pp-devices">
            <Image
              src="/operators/geoatm-tablet-and-phone.png"
              alt="The GeoATM operator portal on a tablet, showing a bank's ATM network across London with other institutions, network gaps and coverage gaps, and on a phone, showing availability with exceptions, competitor locations and customer issues."
              width={1400}
              height={930}
              priority
              sizes="(max-width: 900px) 94vw, 640px"
            />
            <figcaption>The operator portal. Illustrative data.</figcaption>
          </figure>
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
                {p.note && <div className="pp-plan-note">{p.note}</div>}
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
