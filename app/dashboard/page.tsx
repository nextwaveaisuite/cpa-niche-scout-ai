"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [niche, setNiche] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function run(type: string) {
    if (!niche) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Analysis failed" });
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        textAlign: "center",
      }}
    >
      {/* Back button */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/"
          style={{
            color: "#facc15",
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

      <p style={{ color: "#9ca3af", marginTop: "10px" }}>
        Enter a niche and run instant CPA intelligence.
      </p>

      <input
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        placeholder="Enter a niche (e.g. Alcohol Rehabilitation)"
        style={{
          marginTop: "20px",
          padding: "14px",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "6px",
          border: "1px solid #1f2933",
          background: "#0b0f14",
          color: "#e5e7eb",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        {["analyze", "keywords", "offers", "domains", "blueprint"].map(
          (t) => (
            <button
              key={t}
              onClick={() => run(t)}
              style={{
                margin: "6px",
                padding: "10px 14px",
                background: "#111827",
                color: "#00ff9c",
                border: "1px solid #1f2933",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          )
        )}
      </div>

      {loading && (
        <p style={{ marginTop: "20px", color: "#facc15" }}>
          Running analysis…
        </p>
      )}

      {result && (
        <pre
          style={{
            marginTop: "30px",
            background: "#020617",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "left",
            maxWidth: "900px",
            marginInline: "auto",
            overflowX: "auto",
            color: "#e5e7eb",
            fontSize: "14px",
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
