import { NextResponse } from "next/server";
const APP_URL = "https://geoatm.app";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// The site's sign-up box posts here (same origin, so the page's strict CSP is
// untouched), and this passes it on to the GeoATM app, which keeps the list.
// The visitor's IP is used only for this in-memory throttle; it is not sent on.
const hits = new Map<string, { n: number; reset: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.reset) { hits.set(ip, { n: 1, reset: now + 60_000 }); return false; }
  return ++e.n > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (throttled(ip)) return NextResponse.json({ error: "Too many attempts. Please wait a minute." }, { status: 429 });
  let body: { email?: unknown; website?: unknown } = {};
  try { body = await req.json(); } catch { /* ignore */ }
  try {
    const res = await fetch(`${APP_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, website: body.website, source: "site" }),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Sign-up is unavailable right now. Please try again later." }, { status: 503 });
  }
}
