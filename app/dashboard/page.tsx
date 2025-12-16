"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function run(endpoint: string, label: string) {
    if (!niche.trim()) return;

    setLoading(true);
    setTitle("");
    setContent("");

    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche }),
    });

    const json = await res.json();

    // ✅ PHASE 2: Soft Monetization Gate (LOGIC ONLY)
    if (json.error) {
      setTitle("Limit Reached");
      setContent(
        "⚠️ You’ve reached today’s free usage limit.\n\nUpgrade to unlock unlimited niche research, deeper insights, and advanced features."
      );
      setLoading(false);
      return;
    }

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
    <div className="container">
      {/* Back Button */}
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <Link
          href="/"
          style={{
            color: "#00ff9c",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ← Back to Home
        </Link>
      </div>

      <h1>
        <span className="header-green">CPA Niche</span>{" "}
        <span className="header-yellow">Scout AI</span>
      </h1>

      <input
        placeholder="Enter a niche (e.g. Alcohol Rehabilitation)"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") run("analyze", "Analysis");
        }}
      />

      <div>
        <button disabled={loading} onClick={() => run("analyze", "Analysis")}>
          Analyze
        </button>
        <button disabled={loading} onClick={() => run("keywords", "Keywords")}>
          Keywords
        </button>
        <button disabled={loading} onClick={() => run("offers", "Offers")}>
          Offers
        </button>
        <button disabled={loading} onClick={() => run("domains", "Domains")}>
          Domains
        </button>
        <button disabled={loading} onClick={() => run("blueprint", "Blueprint")}>
          Blueprint
        </button>
      </div>

      {loading && <p>Loading…</p>}

      {content && (
        <div className="result-box">
          <div className="section-title">{title}</div>
          <div className="content">{content}</div>
        </div>
      )}
    </div>
  );
}
