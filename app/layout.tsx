import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { dirOf } from "@/lib/language/languages";

const SITE = "https://home.geoatm.app";
const APP = "https://geoatm.app";
const TITLE = "GeoATM — Know where cash is, before you go";
const DESC =
  "GeoATM helps people find nearby ATMs, see community-reported status where available, and choose the best place to withdraw cash with confidence — across 219 countries and territories.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s · GeoATM",
  },
  description: DESC,
  applicationName: "GeoATM",
  keywords: [
    "ATM near me",
    "find an ATM",
    "cash near me",
    "ATM locator",
    "ATM finder",
    "ATM availability",
    "24 hour ATM",
    "where to withdraw cash",
    "GeoATM",
  ],
  authors: [{ name: "Nicola Anderson", url: "https://www.linkedin.com/in/nicolaanderson/" }],
  creator: "Nicola Anderson",
  publisher: "Tumblehill Labs",
  category: "finance",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    siteName: "GeoATM",
    url: SITE,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "GeoATM — Know where cash is, before you go" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
  appleWebApp: { capable: true, title: "GeoATM", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E4012B",
};

// Site-wide structured data: who GeoATM is, the site itself, and the app.
// Creator and owner: in the metadata only, for search engines; never shown on the page.
const CREATOR = { "@type": "Person", "@id": "https://about.pulsus.tech/#creator", name: "Nicola Anderson", jobTitle: "Founder", sameAs: ["https://www.linkedin.com/in/nicolaanderson/"] };
const OWNER = { "@type": "Organization", name: "Tumblehill Holdings LLC", url: "https://www.tumblehillholdings.com", founder: CREATOR };
const LABS = { "@type": "Organization", name: "Tumblehill Labs", founder: CREATOR, parentOrganization: OWNER };

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "GeoATM",
      url: SITE,
      logo: `${SITE}/og.png`,
      description: DESC,
      sameAs: ["https://www.tumblehillholdings.com/research/labs/geoatm"],
      parentOrganization: LABS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "GeoATM",
      description: DESC,
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: "GeoATM",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web, iOS, Android",
      url: APP,
      description: DESC,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: CREATOR,
      publisher: LABS,
      copyrightHolder: OWNER,
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} dir={dirOf(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
