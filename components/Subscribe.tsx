"use client";

import { useState } from "react";

// "Get GeoATM updates" in the footer: one field, one button.
export default function Subscribe() {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, website }),
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
        <p>New features and new countries. No spam; unsubscribe any time.</p>
      </div>
      {state === "done" ? (
        <p className="nl-done">Thanks — you&rsquo;re subscribed.</p>
      ) : (
        <form className="nl-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="nl-email">Email address</label>
          <input id="nl-email" type="email" required autoComplete="email" placeholder="you@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
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
