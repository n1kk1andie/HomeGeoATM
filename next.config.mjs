import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
// GeoATM marketing site (home.geoatm.app) — static informational landing page.

// Content-Security-Policy tuned to what the landing page loads:
//  - self images (logo), data URIs, Google Fonts (style + font).
//  - 'unsafe-inline' is required for inline style attributes and Next's inline
//    bootstrap scripts; a nonce-based policy is a future hardening step.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=(), payment=(), usb=()" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The API (newsletter sign-up) is never a search result.
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
    ];
  },
  // The policies live with the app (www.geoatm.app); the usual paths on this
  // marketing site send people there instead of a 404.
  async redirects() {
    return [
      { source: "/privacy", destination: "https://www.geoatm.app/privacy", permanent: false },
      { source: "/terms", destination: "https://www.geoatm.app/terms", permanent: false },
    ];
  },
};

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig);
