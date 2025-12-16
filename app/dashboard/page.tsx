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

  /* ============================
     READABILITY FORMATTER
     ============================ */
  function renderFormattedContent(text: string) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("###")) {
        return <h3 key={i}>{line.replace("###", "").trim()}</h3>;
      }

      if (line.startsWith("##")) {
        return <h2 key={i}>{line.replace("##", "").trim()}</h2>;
      }

      if (line.startsWith("- ")) {
        return <li key={i}>{line.replace("- ", "")}</li>;
      }

      if (line.includes("|") && line.includes("---")) {
        return null;
      }

      if (line.includes("|")) {
        const cells = line
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean);

        return (
          <div key={i}>
            {cells.map((cell, idx) => (
              <span key={idx} style={{ marginRight: "12px" }}>
                {cell}
              </span>
            ))}
          </div>
        );
      }

      return <p key={i}>{line}</p>;
    });
  }

  /* ============================
     MICRO ACTIONS
     ============================ */
  function copyToClipboard() {
    navigator.clipboard.writeText(content);
  }

  function exportTxt() {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "cpa-niche-result"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ============================
     VIDEO HOOK (CONTEXTUAL)
     ============================ */
  async function generateVideoHook() {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        niche,
        context: content,
        mode: "video_hook",
      }),
    });

    const json = await res.json();

    setTitle("60-Second YouTube Hook");
    setContent(json.video_hook || "No hook generated");
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
      />

      <div>
        <button onClick={() => run("analyze", "Analysis")}>Analyze</button>
        <button onClick={() => run("keywords", "Keywords")}>Keywords</button>
        <button onClick={() => run("offers", "Offers")}>Offers</button>
        <button onClick={() => run("domains", "Domains")}>Domains</button>
        <button onClick={() => run("blueprint", "Blueprint")}>Blueprint</button>
      </div>

      {loading && <p>Loading…</p>}

      {content && (
        <div className="result-box">
          <div className="section-title">{title}</div>

          {/* Action Buttons */}
          <div style={{ marginBottom: "10px" }}>
            <button onClick={copyToClipboard}>Copy</button>
            <button onClick={exportTxt}>Export</button>
            <button onClick={generateVideoHook}>
              🎬 60s Video Hook
            </button>
          </div>

          <div className="content">
            {renderFormattedContent(content)}
          </div>
        </div>
      )}
    </div>
  );
}
