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

    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche }),
    });

    const json = await res.json();

    setTitle(label);
    setContent(
      json.quick_score ||
        json.keywords ||
        json.offers ||
        json.domains ||
        json.blueprint ||
        json.deep_analysis ||
        "No data returned"
    );

    setLoading(false);
  }

  function copyResult() {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard");
  }

  function exportResult() {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "result"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container">
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <Link href="/" style={{ color: "#00ff9c", fontWeight: 600 }}>
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

      {/* 🔥 STRIPE FIX — NORMAL LINK */}
      <a
        href="/api/checkout"
        style={{
          display: "inline-block",
          marginTop: "20px",
          background: "#00ff9c",
          color: "#0b0f14",
          padding: "12px 20px",
          borderRadius: "6px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Upgrade to Pro
      </a>

      {loading && <p>Loading…</p>}

      {content && (
        <div className="result-box">
          <div className="section-title">{title}</div>

          <div style={{ marginBottom: "10px" }}>
            <button onClick={copyResult}>Copy</button>
            <button onClick={exportResult}>Export</button>
          </div>

          <div className="content">{content}</div>
        </div>
      )}
    </div>
  );
}
