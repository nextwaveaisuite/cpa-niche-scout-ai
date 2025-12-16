"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function run(endpoint: string, label: string) {
    setLoading(true);
    setTitle("");
    setContent("");

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });

      const json = await res.json();

      const value =
        json.quick_score ||
        json.keywords ||
        json.offers ||
        json.domains ||
        json.blueprint ||
        json.video ||
        "No data returned";

      setTitle(label);
      setContent(value);
    } catch (e) {
      setTitle("Error");
      setContent("Request failed");
    }

    setLoading(false);
  }

  async function upgradeToPro() {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (!data.url) {
        alert("Stripe checkout failed");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      alert("Stripe checkout failed");
    }
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
      />

      <div>
        <button onClick={() => run("analyze", "Analysis")}>Analyze</button>
        <button onClick={() => run("keywords", "Keywords")}>Keywords</button>
        <button onClick={() => run("offers", "Offers")}>Offers</button>
        <button onClick={() => run("domains", "Domains")}>Domains</button>
        <button onClick={() => run("blueprint", "Blueprint")}>Blueprint</button>
        <button onClick={() => run("video", "Video Script")}>
          Video Script
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={upgradeToPro}>Upgrade to Pro</button>
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
