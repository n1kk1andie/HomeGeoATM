/* GeoATM marketing site — home.geoatm.app
 * A static informational landing page. No data, cash or admin code here. */

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import NavActions from "@/components/NavActions";
import PlayBadge from "@/components/PlayBadge";
import SiteFooter from "@/components/SiteFooter";
import { IconGlobe, IconPin, IconBank, IconBankBig, IconNetwork, IconScales, IconShield, IconUser, IconBulb, IconPhone, IconCheck, IconArrowRight, IconExternal, IconChevron, IconMap, IconList, IconHeart, IconMore } from "@/components/icons";

const APP_URL = "https://geoatm.app";
const CONTACT_EMAIL = "info@geoatm.app";
const PARTICIPATE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=GeoATM%20Participation%20Enquiry`;
/** Self-service registration for banks and ATM operators (the operator portal's application page). */
const REGISTER_URL = "https://admin.geoatm.app/apply";

/** Figures quoted on the page (kept in code: numbers aren't translated). */
const ATMS = "238,000";
const COUNTRIES = "219";

const NAV = [
  { id: "home", href: "#top" },
  { id: "about", href: "#about" },
  { id: "how", href: "#how" },
  { id: "operators", href: "/operators" },
  { id: "faq", href: "#faq" },
  { id: "contact", href: "#contact" },
] as const;

export default async function HomePage() {
  const t = await getTranslations("home");
  const tn = await getTranslations("nav");
  // Single source of truth for the FAQ — rendered on the page AND emitted as
  // FAQPage structured data so Google can show rich results.
  const FAQ_ITEMS = [1, 2, 3, 4, 5].map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`, { atms: ATMS, countries: COUNTRIES }) }));
  const FAQ_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const mail = (chunks: React.ReactNode) => <a href={`mailto:${CONTACT_EMAIL}`}>{chunks}</a>;
  return (
    <>
      {/* ---------- Nav ---------- */}
      <header className="nav" id="top">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-logo" aria-label={tn("homeLabel")}>
            <img src="/geoatm-lockup.png" alt={tn("logoAlt")} />
          </a>
          <nav className="nav-links" aria-label={tn("primary")}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={n.id === "home" ? "on" : ""}>
                {tn(n.id)}
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
              {t("hero.title1")}
              <br />
              <span className="red">{t("hero.title2")}</span>
            </h1>
            <p className="hero-sub">
              {t("hero.sub")}
            </p>
            <p className="hero-sub-ops">
              {t("hero.subOps")}
            </p>
            <div className="hero-btns">
              <a className="btn btn-red" href={APP_URL} target="_blank" rel="noopener noreferrer">
                <IconPhone /> {t("hero.open")}
              </a>
              <a className="btn btn-outline" href="/operators">
                <IconBank /> {t("hero.operators")}
              </a>
              <PlayBadge />
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
          <Stat icon={<IconGlobe />} big={COUNTRIES} mid={t("stats.countriesMid")} sub={t("stats.countriesSub")} />
          <Stat icon={<IconPin />} big={`${ATMS}+`} mid={t("stats.atmsMid")} sub={t("stats.atmsSub")} />
          <Stat icon={<IconBank />} big={t("stats.growing")} mid={t("stats.networkMid")} sub={t("stats.networkSub")} />
          <Stat icon={<IconShield />} big={t("stats.live")} mid={t("stats.liveMid")} sub={t("stats.liveSub")} />
        </div>
      </section>

      {/* ---------- Two audiences ---------- */}
      <section className="section">
        <div className="wrap">
          <h2 className="center">{t("aud.title")}</h2>
          <div className="aud-grid">
            {/* Consumers */}
            <div className="aud-card">
              <div className="aud-head">
                <span className="aud-ic"><IconUser /></span>
                <h3 className="red">{t("aud.consumers")}</h3>
              </div>
              <p className="aud-lead">{t("aud.consumersLead")}</p>
              <ul className="ticks">
                <li><IconCheck /> {t("aud.c1")}</li>
                <li><IconCheck /> {t("aud.c2")}</li>
                <li><IconCheck /> {t("aud.c3")}</li>
                <li><IconCheck /> {t("aud.c4")}</li>
                <li><IconCheck /> {t("aud.c5", { countries: COUNTRIES })}</li>
              </ul>
              <ConsumerMock />
              <a className="link-red" href={APP_URL} target="_blank" rel="noopener noreferrer">
                {t("aud.launch")} <IconArrowRight />
              </a>
            </div>
            {/* Institutions */}
            <div className="aud-card">
              <div className="aud-head">
                <span className="aud-ic"><IconBank /></span>
                <h3 className="red">{t("aud.fi")}</h3>
              </div>
              <p className="aud-lead">{t("aud.fiLead")}</p>
              <p className="aud-body">
                {t("aud.fiBody", { atms: `${ATMS}+`, countries: COUNTRIES })}
              </p>
              <DashboardMock />
              <a className="link-red" href="/operators">
                {t("aud.fiLink")} <IconArrowRight />
              </a>
            </div>
            {/* Industry Associations */}
            <div className="aud-card">
              <div className="aud-head">
                <span className="aud-ic"><IconNetwork /></span>
                <h3 className="red">{t("aud.assoc")}</h3>
              </div>
              <p className="aud-lead">{t("aud.assocLead")}</p>
              <p className="aud-body">
                {t("aud.assocBody")}
              </p>
              <ul className="ticks">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <li key={n}><IconCheck /> {t(`aud.a${n}`)}</li>
                ))}
              </ul>
              <AssociationMock />
              <a
                className="link-red"
                href={`mailto:${CONTACT_EMAIL}?subject=GeoATM%20Industry%20Association%20Access`}
              >
                {t("aud.assocLink")} <IconArrowRight />
              </a>
            </div>
            {/* Central Banks & Public Authorities */}
            <div className="aud-card">
              <div className="aud-head">
                <span className="aud-ic"><IconScales /></span>
                <h3 className="red">{t("aud.auth")}</h3>
              </div>
              <p className="aud-lead">{t("aud.authLead")}</p>
              <p className="aud-body">
                {t("aud.authBody")}
              </p>
              <ul className="ticks">
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <li key={n}><IconCheck /> {t(`aud.p${n}`)}</li>
                ))}
              </ul>
              <AuthorityMock />
              <a
                className="link-red"
                href={`mailto:${CONTACT_EMAIL}?subject=GeoATM%20Institutional%20Briefing%20Request`}
              >
                {t("aud.authLink")} <IconArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Why GeoATM ---------- */}
      <section className="section why-band" id="about">
        <div className="wrap">
          <h2 className="center">{t("why.title")}</h2>
          <div className="why-grid">
            <Why
              icon={<IconGlobe />}
              title={t("why.dirTitle")}
              body={t("why.dirBody", { atms: `${ATMS}+`, countries: COUNTRIES })}
            />
            <Why
              icon={<IconShield />}
              title={t("why.opTitle")}
              body={t("why.opBody")}
            />
            <Why
              icon={<IconBulb />}
              title={t("why.recTitle")}
              body={t("why.recBody")}
            />
          </div>
        </div>
      </section>

      {/* ---------- How it works + Participate ---------- */}
      <section className="section" id="how">
        <div className="wrap how-grid">
          <div className="panel">
            <h3 className="panel-title">{t("how.title")}</h3>
            <div className="steps">
              <Step n="1" icon={<IconPhone />} title={t("how.s1")} sub={t("how.s1sub")} />
              <IconArrowRight className="step-arrow" />
              <Step n="2" icon={<IconPin />} title={t("how.s2")} sub={t("how.s2sub")} />
              <IconArrowRight className="step-arrow" />
              <Step n="3" icon={<IconShield solid />} title={t("how.s3")} sub={t("how.s3sub")} />
              <IconArrowRight className="step-arrow" />
              <Step n="4" icon={<IconCheck />} title={t("how.s4")} sub={t("how.s4sub")} />
            </div>
          </div>

          <div className="panel panel-inst" id="institutions">
            <IconBankBig className="inst-bg" />
            <div className="inst-eyebrow">{t("inst.eyebrow")}</div>
            <h3 className="inst-title red">{t("inst.title")}</h3>
            <p className="inst-body">
              {t("inst.body")}
            </p>
            <div className="inst-btns">
              <a className="btn btn-red" href="/operators">
                <IconBank /> {t("inst.operators")}
              </a>
              <a className="btn btn-outline" href={REGISTER_URL}>
                {t("inst.register")}
              </a>
            </div>
            <p className="inst-alt">
              {t.rich("inst.alt", {
                email: CONTACT_EMAIL,
                signin: (c) => <a href="https://admin.geoatm.app/">{c}</a>,
                mail: (c) => <a href={PARTICIPATE_MAILTO}>{c}</a>,
              })}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- About strip ---------- */}
      <section className="section">
        <div className="wrap about-strip">
          <div className="about-text">
            <h3 className="panel-title">{t("about.title")}</h3>
            <p>
              {t("about.body")}
            </p>
          </div>
          <img className="about-logo" src="/geoatm-lockup.png" alt={t("about.logoAlt")} />
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" id="faq">
        <div className="wrap faq-wrap">
          <h2 className="center">{t("faq.title")}</h2>
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
            <h2>{t("contact.title")}</h2>
            <p>{t("contact.body")}</p>
            <p className="contact-email">{t.rich("contact.email", { email: CONTACT_EMAIL, mail })}</p>
          </div>
          <a className="btn btn-red" href={`mailto:${CONTACT_EMAIL}`}>
            {t("contact.button")} <IconArrowRight />
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
async function ConsumerMock() {
  const t = await getTranslations("home.mock");
  return (
    <div className="dash">
      <div className="dash-head"><IconPin /> {t("bestPlaces")}</div>
      <div className="cm-row best">
        <span className="cm-rank">1</span>
        <span className="cm-txt"><b>{t("cityCentre")}</b><small>{t("metaBest", { km: "0.3", atms: 3 })}</small></span>
        <span className="cm-badge ok">{t("cashAvailable")}</span>
      </div>
      <div className="cm-row">
        <span className="cm-rank">2</span>
        <span className="cm-txt"><b>{t("secondPlace")}</b><small>{t("metaSecond", { km: "1.1", atms: 2 })}</small></span>
        <span className="cm-badge">{t("locationOnly")}</span>
      </div>
      <div className="dash-foot"><IconBulb /> {t("recommended")}</div>
    </div>
  );
}

async function DashboardMock() {
  const t = await getTranslations("home.mock");
  return (
    <div className="dash">
      <div className="dash-head"><IconShield solid /> {t("operatorReported")}</div>
      <div className="dash-row">
        <div className="dash-label">{t("liveStatus")}</div>
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
      <div className="dash-avail">{t("liveFromBank")}</div>
      <div className="dash-label">{t("reach")}</div>
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
async function AssociationMock() {
  const t = await getTranslations("home.mock");
  const members = ["ok", "ok", "ok", "ok", "ok", "ok", "ok", "late", "ok"] as const;
  return (
    <div className="dash">
      <div className="dash-head"><IconNetwork /> {t("sector")}</div>
      <div className="dash-label">{t("memberStatus")}</div>
      <div className="memberdots">
        {members.map((m, i) => (
          <span key={i} className={`mdot ${m}`} />
        ))}
      </div>
      <div className="legendrow">
        <span><i className="lg green" /> {t("reporting")}</span>
        <span><i className="lg amber" /> {t("late")}</span>
      </div>
      <div className="dash-label" style={{ marginTop: 12 }}>{t("coverage")}</div>
      <div className="covbar"><i style={{ width: "72%" }} /></div>
      <div className="dash-foot">
        <span className="gapdot" /> {t("gaps")}
      </div>
    </div>
  );
}

// National command view: coverage heat, what's operator-reported vs located, underserved
// areas and resilience — the shape of the view, no figures.
async function AuthorityMock() {
  const t = await getTranslations("home.mock");
  const heat = [
    0.9, 0.8, 0.6, 0.5, 0.7, 0.9,
    0.8, 0.7, 0.4, 0.3, 0.6, 0.8,
    0.6, 0.5, 0.3, 0.2, 0.4, 0.7,
    0.7, 0.6, 0.5, 0.4, 0.6, 0.8,
  ];
  return (
    <div className="dash">
      <div className="dash-head"><IconScales /> {t("national")}</div>
      <div className="cmdgrid">
        <div className="heatmap" aria-hidden>
          {heat.map((v, i) => (
            <i key={i} style={{ background: `rgba(228,1,43,${0.12 + v * 0.78})` }} />
          ))}
        </div>
        <div className="cmdstats">
          <div className="cmd-stat2"><span className="csdot green" /> {t("liveReported")}</div>
          <div className="cmd-stat2"><span className="csdot amber" /> {t("located")}</div>
          <div className="cmd-stat2"><span className="csdot gap" /> {t("underserved")}</div>
          <div className="cmd-stat2"><span className="csdot line" /> {t("resilience")}</div>
        </div>
      </div>
      <div className="heatlegend"><span>{t("lower")}</span><i /><span>{t("higher")}</span></div>
      <div className="dash-foot">
        <span className="gapdot" /> {t("demand")}
      </div>
    </div>
  );
}
