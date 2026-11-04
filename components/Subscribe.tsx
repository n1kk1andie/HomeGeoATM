"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const PARISHES = [
  "Kingston", "St. Andrew", "St. Catherine", "Clarendon", "Manchester", "St. Elizabeth", "Westmoreland",
  "Hanover", "St. James", "Trelawny", "St. Ann", "St. Mary", "Portland", "St. Thomas",
];

// "Get GeoATM updates" in the footer: one field, one button.
export default function Subscribe() {
  const t = useTranslations("subscribe");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, area, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setState("done"); return; }
      setMsg(data.error || t("error"));
      setState("error");
    } catch {
      setMsg(t("error"));
      setState("error");
    }
  }

  return (
    <div className="wrap nl">
      <div className="nl-copy">
        <h3>{t("title")}</h3>
        <p>{t("body")}</p>
      </div>
      {state === "done" ? (
        <p className="nl-done">{t("done")}</p>
      ) : (
        <form className="nl-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="nl-email">{t("email")}</label>
          <input id="nl-email" type="email" required autoComplete="email" placeholder="you@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="sr-only" htmlFor="nl-area">{t("area")}</label>
          <select id="nl-area" className="nl-area" value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">{t("areaOptional")}</option>
            {PARISHES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input className="nl-hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={website} onChange={(e) => setWebsite(e.target.value)} />
          <button className="btn btn-red" type="submit" disabled={state === "busy"}>
            {state === "busy" ? "…" : t("button")}
          </button>
          {state === "error" && <p className="nl-err" role="alert">{msg}</p>}
        </form>
      )}
    </div>
  );
}
