import type { Metadata, Viewport } from "next";
import "./globals.css";

const DESC =
  "GeoATM helps people find nearby ATMs, see where cash is available, and choose the best place to withdraw cash with confidence — across 195+ countries.";

export const metadata: Metadata = {
  metadataBase: new URL("https://home.geoatm.app"),
  title: "GeoATM — Know where cash is, before you go",
  description: DESC,
  openGraph: {
    title: "GeoATM — Know where cash is, before you go",
    description: DESC,
    siteName: "GeoATM",
    url: "https://home.geoatm.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoATM — Know where cash is, before you go",
    description: DESC,
  },
  appleWebApp: { capable: true, title: "GeoATM", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E4012B",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
