"use client";

import { useState } from "react";

const PARISHES = [
  "Kingston", "St. Andrew", "St. Catherine", "Clarendon", "Manchester", "St. Elizabeth", "Westmoreland",
  "Hanover", "St. James", "Trelawny", "St. Ann", "St. Mary", "Portland", "St. Thomas",
];

// "Get GeoATM updates" in the footer: one field, one button.
export default function Subscribe() {
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
      setMsg(data.error || "Something went wrong. Please try again.");
      setState("error");
    } catch {
      setMsg("Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <div className="wrap nl">
      <div className="nl-copy">
        <h3>Get GeoATM updates</h3>
        <p>ATM status changes in your area, plus news. No spam; unsubscribe any time.</p>
      </div>
      {state === "done" ? (
        <p className="nl-done">Thanks — you&rsquo;re subscribed.</p>
      ) : (
        <form className="nl-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="nl-email">Email address</label>
          <input id="nl-email" type="email" required autoComplete="email" placeholder="you@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="sr-only" htmlFor="nl-area">Your area</label>
          <select id="nl-area" className="nl-area" value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">Your area (optional)</option>
            {PARISHES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input className="nl-hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={website} onChange={(e) => setWebsite(e.target.value)} />
          <button className="btn btn-red" type="submit" disabled={state === "busy"}>
            {state === "busy" ? "…" : "Subscribe"}
          </button>
          {state === "error" && <p className="nl-err" role="alert">{msg}</p>}
        </form>
      )}
    </div>
  );
}
