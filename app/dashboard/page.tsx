"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  /* ============================
     ADDED: RESTORE SAVED SESSION
     ============================ */
  useEffect(() => {
    const saved = localStorage.getItem("cpa_niche_scout_session");
    if (saved) {
      const data = JSON.parse(saved);
      setNiche(data.niche || "");
      setTitle(data.title || "");
      setContent(data.content || "");
    }
  }, []);

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

    /* ============================
       ADDED: SAVE SESSION
       ============================ */
    localStorage.setItem(
      "cpa_niche_scout_session",
      JSON.stringify({
        niche,
        title: label,
        content: value,
      })
    );
  }

  /* ============================
     ADDED: COPY RESULT
     ============================ */
  function copyResult() {
    if (!content) return;
    navigator.clipboard.writeText(
      typeof content === "string"
        ? content
        : JSON.stringify(content, null, 2)
    );
  }

  /* ============================
     ADDED: EXPORT RESULT
     ============================ */
  function exportResult() {
    if (!content) return;

    const text =
      typeof content === "string"
        ? content
        : JSON.stringify(content, null, 2);

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "result"}.txt`;
    a.click();

    URL.revokeObjectURL(url);
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
          <div className="section-title">
            {title}
            <button onClick={copyResult}>Copy</button>
            <button onClick={exportResult}>Export</button>
          </div>

          <div className="content">{content}</div>
        </div>
      )}
    </div>
  );
}
