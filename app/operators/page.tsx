/* GeoATM for operators — home.geoatm.app/operators
 * The commercial page: what banks and ATM operators get, how self-service
 * works, and what it costs. Registration and everything after it happen in
 * the operator portal (admin.geoatm.app); nothing here takes data or payment.
 * Describe only what the portal does today. */
import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getTranslations } from "next-intl/server";
import { IconArrowRight, IconBank, IconCheck, IconMap, IconNetwork, IconShield } from "@/components/icons";

const REGISTER_URL = "https://admin.geoatm.app/apply";
const SIGN_IN_URL = "https://admin.geoatm.app/operators";
const CONTACT_EMAIL = "info@geoatm.app";

export const metadata: Metadata = {
  title: "For banks and ATM operators",
  description:
    "Decisions about your ATM network, not just a map: how your network is covered, where you stand against other institutions, and how candidate sites compare. Free listing; Monitor with a 30-day free trial; consent-based sharing with associations and regulators on Enterprise.",
  alternates: { canonical: "/operators" },
};

/** Plans: names and prices stay in code; what each includes comes from the messages. */
const PLANS = [
  { id: "free", name: "Free", price: "$0", min: "", items: 3 },
  { id: "monitor", name: "Monitor", price: "$12", min: "$150", items: 6, note: true, lead: true },
  { id: "intelligence", name: "Intelligence", price: "$25", min: "$400", items: 6 },
  { id: "enterprise", name: "Enterprise", price: "$35", min: "$1,000", items: 5 },
] as const;

/** The three decisions GeoATM supports, and the plan each starts on. */
const DECISIONS = ["coverage", "competitive", "expansion"] as const;
const MONITOR = ["availability", "exceptions", "competitors", "customers", "listings"] as const;
const INTELLIGENCE = ["coverage", "expansion", "network", "demand", "excel"] as const;
/** Enterprise: consent-based sharing. Only what the portal enforces today. */
const SHARING = ["terms", "onward", "revoke", "history"] as const;
const STEPS = ["register", "verification", "portal", "trial", "subscription"] as const;
const FAQ = [1, 2, 3, 4, 5, 6, 7] as const;

/** "Geo" + the coloured product name, as the brand is always written. */
const geo = (name: string) => () => (
  <>
    Geo<span className="gname">{name}</span>
  </>
);

export default async function ProductPage() {
  const t = await getTranslations("operators");
  return (
    <>
      <SiteHeader current="operators" />

      <section className="pp-hero">
        <div className="wrap pp-hero-grid">
          <div>
            <div className="pp-eyebrow">{t("eyebrow")}</div>
            <h1>
              {t("title1")}
              <br />
              <span className="red">{t("title2")}</span>
            </h1>
            <p className="hero-sub">
              {t("sub")}
            </p>
            <div className="hero-btns">
              <a className="btn btn-red" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                <IconBank /> {t("register")}
              </a>
              <a className="btn btn-outline" href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer">
                {t("signIn")}
              </a>
            </div>
            <p className="pp-small">
              {t.rich("small", { a: (c) => <a href="#sharing">{c}</a> })}
            </p>
          </div>
          <figure className="pp-devices">
            <Image
              src="/operators/geoatm-tablet-and-phone.png"
              alt={t("devicesAlt")}
              width={1400}
              height={930}
              priority
              sizes="(max-width: 900px) 94vw, 640px"
            />
            <figcaption>{t("devicesCaption")}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center">{t("decisionsTitle")}</h2>
          <div className="pp-grid">
            {DECISIONS.map((d) => (
              <div key={d} className="pp-feature">
                <h3>{t(`decisions.${d}.title`)}</h3>
                <p>{t(`decisions.${d}.body`)}</p>
                <p className="pp-feature-plan">{t(`decisions.${d}.plan`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pp-band">
        <div className="wrap">
          <h2 className="center">{t("monitorTitle")}</h2>
          <div className="pp-grid">
            {MONITOR.map((m) => (
              <div key={m} className="pp-feature">
                <h3>{t(`monitor.${m}.title`)}</h3>
                <p>{t(`monitor.${m}.body`)}</p>
              </div>
            ))}
            <div className="pp-feature pp-feature-osm">
              <h3>{t("monitor.osm.title")}</h3>
              <p>{t("monitor.osm.body")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center">{t("intelligenceTitle")}</h2>
          <div className="pp-grid pp-grid-4">
            {INTELLIGENCE.map((m) => (
              <div key={m} className="pp-feature">
                <h3>{t(`intelligence.${m}.title`)}</h3>
                <p>{t(`intelligence.${m}.body`)}</p>
              </div>
            ))}
          </div>
          <p className="pp-plans-lead" style={{ marginTop: 22 }}>
            {t("intelligenceNote", { email: CONTACT_EMAIL })}
          </p>
        </div>
      </section>

      <section className="section pp-band" id="sharing">
        <div className="wrap">
          <div className="pp-eyebrow center">{t.rich("sharingEyebrow", { gt: geo("Trust") })}</div>
          <h2 className="center">{t("sharingTitle")}</h2>
          <p className="pp-plans-lead pp-sharing-lead">
            {t.rich("sharingLead", { gt: geo("Trust") })}
          </p>
          <div className="pp-sharing">
            <figure className="pp-sharing-art">
              <span className="geo-badge"><IconShield /><span>{t.rich("sharingBadge", { gt: geo("Trust") })}</span></span>
              <Image
                src="/operators/consent-phones.png"
                alt={t("sharingAlt")}
                width={1813}
                height={1785}
                sizes="(max-width: 900px) 86vw, 520px"
              />
              <figcaption>{t("sharingCaption")}</figcaption>
            </figure>
            <div className="pp-sharing-points">
              {SHARING.map((m) => (
                <div key={m}>
                  <h3>{t(`sharing.${m}.title`)}</h3>
                  <p>{t(`sharing.${m}.body`)}</p>
                </div>
              ))}
              <p className="pp-small">
                {t("sharingSmall")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="plans">
        <div className="wrap">
          <h2 className="center">{t("plansTitle")}</h2>
          <p className="pp-plans-lead">{t("plansLead")}</p>
          <div className="pp-plans">
            {PLANS.map((p) => (
              <div key={p.id} className={`pp-plan${"lead" in p && p.lead ? " pp-plan-lead" : ""}`}>
                <div className="pp-plan-name">{p.name}</div>
                <div className="pp-plan-price">{p.price}</div>
                <div className="pp-plan-unit">{p.min ? t("unit", { min: p.min }) : " "}</div>
                <div className="pp-plan-for">{t(`plans.${p.id}.for`)}</div>
                <ul>
                  {Array.from({ length: p.items }, (_, i) => (
                    <li key={i}><IconCheck /> {t(`plans.${p.id}.items.${i + 1}`)}</li>
                  ))}
                </ul>
                {"note" in p && p.note && <div className="pp-plan-note">{t(`plans.${p.id}.note`)}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pp-band">
        <div className="wrap">
          <h2 className="center">{t("stepsTitle")}</h2>
          <ol className="pp-steps">
            {STEPS.map((s) => (
              <li key={s}>
                <div className="pp-step-title">{t(`steps.${s}.title`)}</div>
                <div className="pp-step-body">{t.rich(`steps.${s}.body`, { gv: geo("Verify") })}</div>
              </li>
            ))}
          </ol>
          <div className="center" style={{ marginTop: 32 }}>
            <a className="btn btn-red" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              {t("register")} <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap pp-trust">
          <div className="pp-trust-ic"><IconShield /></div>
          <div>
            <span className="geo-badge"><IconShield /><span>{t.rich("trust.badge", { gv: geo("Verify") })}</span></span>
            <h3>{t("trust.title")}</h3>
            <p>
              {t.rich("trust.body", { gv: geo("Verify"), b: (c) => <b>{c}</b> })}
            </p>
          </div>
          <div className="pp-trust-ic"><IconNetwork /></div>
          <div>
            <h3>{t("trust.dataTitle")}</h3>
            <p>
              {t("trust.dataBody")}
            </p>
          </div>
        </div>
      </section>

      <section className="section pp-band" id="faq">
        <div className="wrap faq-wrap">
          <h2 className="center">{t("faqTitle")}</h2>
          <div className="faq">
            {FAQ.map((n) => (
              <details key={n} className="faq-item">
                <summary>
                  <span>{t(`faq.q${n}`)}</span>
                </summary>
                <div className="faq-a">{t(`faq.a${n}`)}</div>
              </details>
            ))}
          </div>
          <div className="center" style={{ marginTop: 32 }}>
            <a className="btn btn-red" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              {t("register")} <IconArrowRight />
            </a>
            <p className="pp-small" style={{ marginTop: 12 }}>{t.rich("alreadyRegistered", { a: (c) => <a href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer">{c}</a> })}</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
