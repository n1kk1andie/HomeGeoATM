# GeoATM — Marketing Site

The public information / landing page for **GeoATM**, served at
[home.geoatm.app](https://home.geoatm.app). This is the page the in‑app info
(ⓘ) icon points to.

A static [Next.js 14](https://nextjs.org) (App Router) site — no data, cash, or
admin code. It links out to the consumer app at
[geoatm.app](https://geoatm.app).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Deploy (Vercel)

1. Import this repository as a new Vercel project. Framework preset **Next.js**
   is detected automatically; no root‑directory override is needed (the app
   lives at the repo root).
2. Add the domain **home.geoatm.app** to the project and point the CNAME record
   Vercel provides at your DNS host.

## Structure

```
app/
  layout.tsx      Root layout, fonts, metadata
  page.tsx        The full landing page (all sections + inline icons)
  globals.css     Design system + section styles
  icon.png        Favicon / app icons
public/
  geoatm-lockup.png         Primary GEO|ATM lockup (light backgrounds)
  geoatm-lockup-white.png   White variant (dark footer)
```

---

GeoATM™ by Tumblehill Labs.

## IndexNow

IndexNow key (Bing, Yandex and other engines): `6589a70edefc060c8df79e5dc92e2882`,
served from `public/6589a70edefc060c8df79e5dc92e2882.txt` at
`https://home.geoatm.app/6589a70edefc060c8df79e5dc92e2882.txt`. To resubmit the
sitemap's pages after a change: `node scripts/indexnow.mjs home.geoatm.app` from
the `pulsus-about` repo (it reads the live sitemap and POSTs to
`https://api.indexnow.org/indexnow`).
