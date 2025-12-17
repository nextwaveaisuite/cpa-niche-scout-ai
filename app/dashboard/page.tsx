"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        console.error("Stripe checkout response:", data);
        throw new Error(data?.stripeMessage || "Stripe checkout failed");
      }

      // 🔥 THIS IS THE CRITICAL LINE
      window.location.href = data.url;

    } catch (err: any) {
      console.error("Upgrade error:", err);
      setError(err.message || "Stripe checkout failed");
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b0b0b",
        color: "#ffffff",
      }}
    >
      <div style={{ width: "100%", maxWidth: 720, textAlign: "center" }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>
          <span style={{ color: "#22c55e" }}>CPA Niche</span>{" "}
          <span style={{ color: "#eab308" }}>Scout AI</span>
        </h1>

        <p style={{ opacity: 0.85, marginBottom: 24 }}>
          Discover profitable CPA niches in minutes
        </p>

        {/* Placeholder for your existing tools / inputs */}
        <div
          style={{
            border: "1px solid #1f2937",
            borderRadius: 8,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <p style={{ opacity: 0.8 }}>
            Use the tools above to analyze niches, keywords, offers, domains,
            blueprints, and video scripts.
          </p>
        </div>

        <button
          onClick={handleUpgrade}
          disabled={loading}
          style={{
            background: "#22c55e",
            color: "#000",
            padding: "12px 24px",
            borderRadius: 6,
            fontWeight: 600,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Redirecting to Stripe..." : "Upgrade to Pro"}
        </button>

        {error && (
          <p style={{ color: "#ef4444", marginTop: 16 }}>
            {error}
          </p>
        )}
      </div>
    </main>
  );
      }
               
