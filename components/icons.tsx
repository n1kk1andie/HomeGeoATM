// Line icons shared by the GeoATM pages (home and product).
import type React from "react";

const S = (p: React.SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});


export function IconGlobe(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></svg>;
}
export function IconPin(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
export function IconBank(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M3 10 12 4l9 6" /><path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" /></svg>;
}
export function IconBankBig(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M3 10 12 4l9 6" /><path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" /></svg>;
}
export function IconNetwork(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><circle cx="12" cy="5" r="2.4" /><circle cx="5" cy="19" r="2.4" /><circle cx="19" cy="19" r="2.4" /><path d="M10.6 6.9 6.4 17.1M13.4 6.9l4.2 10.2M7.4 19h9.2" /></svg>;
}
export function IconScales(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M12 3v18M7 21h10M5 7h14M8.5 6 5 7m3.5-1L12 5l3.5 1M19 7l-3.5-1" /><path d="M5 7 2.5 12.5a2.5 2.5 0 0 0 5 0L5 7ZM19 7l-2.5 5.5a2.5 2.5 0 0 0 5 0L19 7Z" /></svg>;
}
export function IconShield({ solid, ...p }: { solid?: boolean } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...S(p)} fill={solid ? "currentColor" : "none"}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      {!solid && <path d="m9 12 2 2 4-4" />}
    </svg>
  );
}
export function IconUser(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>;
}
export function IconBulb(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" /></svg>;
}
export function IconPhone(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg>;
}
export function IconCheck(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="m5 12 5 5L20 7" /></svg>;
}
export function IconArrowRight(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
export function IconExternal(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>;
}
export function IconChevron(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="m6 9 6 6 6-6" /></svg>;
}
export function IconMap(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></svg>;
}
export function IconList(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>;
}
export function IconHeart(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><path d="M12 21C5 15 3 12 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 12 19 15 12 21Z" /></svg>;
}
export function IconMore(p: React.SVGProps<SVGSVGElement>) {
  return <svg {...S(p)}><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" /></svg>;
}
export function IconInstagram(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}
export function IconLinkedIn(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M6.5 8H4v11h2.5V8ZM5.2 3.5A1.5 1.5 0 1 0 5.2 6.5 1.5 1.5 0 0 0 5.2 3.5ZM20 19h-2.5v-5.5c0-1.4-.9-2-1.7-2s-1.8.6-1.8 2V19H11.5V8H14v1.3c.4-.7 1.5-1.5 2.9-1.5 2 0 3.1 1.4 3.1 4V19Z" /></svg>;
}
export function IconFacebook(p: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" /></svg>;
}
