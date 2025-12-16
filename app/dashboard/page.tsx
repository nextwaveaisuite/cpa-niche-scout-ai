"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lastEndpoint, setLastEndpoint] = useState<string | null>(null);

  /* ============================
     RESTORE SESSION + AUTO-RUN
     ============================ */
  useEffect(() => {
    const saved = localStorage.getItem("cpa_niche_scout_session");
    if (saved) {
      const data = JSON.parse(saved);
      setNiche(data.niche || "");
      setTitle(data.title || "");
      setContent(data.content || "");
      setLastEndpoint(data.endpoint || null);

      // Auto-run last module if possible
      if (data.niche && data.endpoint && data.label) {
        run(data.endpoint, data.label, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function run(endpoint: string, label: string, silent = false) {
    if (!niche) return;

    if (!silent) {
      setLoading(true);
      setTitle("");
      setContent("");
    }

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
      json.deep_analysis ||
      "No data returned";

    setTitle(label);
    setContent(value);
    setLastEndpoint(endpoint);
    setLoading(false);

    /* ============================
       SAVE SESSION
       ============================ */
    localStorage.setItem(
      "cpa_niche_scout_session",
      JSON.stringify({
        niche,
        endpoint,
        label,
        content: value,
      })
    );
  }

  /* ============================
     COPY RESULT (LOGIC ONLY)
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
     EXPORT RESULT (LOGIC ONLY)
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
