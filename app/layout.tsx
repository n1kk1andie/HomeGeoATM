import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://home.geoatm.app";
const APP = "https://geoatm.app";
const TITLE = "GeoATM — Know where cash is, before you go";
const DESC =
  "GeoATM helps people find nearby ATMs, see where cash is available, and choose the best place to withdraw cash with confidence — across 195+ countries.";

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
  authors: [{ name: "Tumblehill Labs" }],
  creator: "Tumblehill Labs",
  publisher: "GeoATM",
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
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
      <body>{children}</body>
    </html>
  );
}
