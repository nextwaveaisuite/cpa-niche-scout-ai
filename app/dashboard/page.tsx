"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function run(endpoint: string, label: string) {
    if (!niche) return;

    setLoading(true);
    setTitle("");
    setContent("");

    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche }),
    });

    const json = await res.json();

    setTitle(label);

    const value =
      json.quick_score ||
      json.keywords ||
      json.offers ||
      json.domains ||
      json.blueprint ||
      json.deep_analysis ||
      "No data returned";

    setContent(value);
    setLoading(false);
  }

  return (
    <main className="dash-wrap">
      {/* Back */}
      <div className="dash-back">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
      </div>

      {/* Header */}
      <h1 className="dash-title">
        <span className="header-green">CPA Niche Scout AI</span>
      </h1>

      <p className="dash-sub">
        Enter a niche and run instant CPA intelligence.
      </p>

      {/* Input */}
      <input
        className="dash-input"
        placeholder="Enter a niche (e.g. Alcohol Rehabilitation)"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
      />

      {/* Actions */}
      <div className="dash-actions">
        <button onClick={() => run("analyze", "Analysis")}>Analyze</button>
        <button onClick={() => run("keywords", "Keywords")}>Keywords</button>
        <button onClick={() => run("offers", "Offers")}>Offers</button>
        <button onClick={() => run("domains", "Domains")}>Domains</button>
        <button onClick={() => run("blueprint", "Blueprint")}>Blueprint</button>
      </div>

      {/* Loading */}
      {loading && <p className="dash-loading">Running analysis…</p>}

      {/* Results */}
      {content && (
        <section className="result-card">
          <div className="result-header">{title}</div>

          <div className="result-content">
            {typeof content === "string" ? (
              content.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))
            ) : (
              <pre>{JSON.stringify(content, null, 2)}</pre>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
