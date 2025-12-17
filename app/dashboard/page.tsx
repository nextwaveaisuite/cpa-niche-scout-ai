"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Pro persistence
    if (params.get("upgrade") === "success") {
      document.cookie = "cpa_pro=1; path=/; max-age=31536000";
    }

    // Credit top-up return
    const added = params.get("credits");
    if (added) {
      const match = document.cookie.match(/cpa_credits=(\d+)/);
      const current = match ? parseInt(match[1], 10) : 0;
      const total = current + parseInt(added, 10);

      document.cookie = `cpa_credits=${total}; path=/; max-age=2592000`;
      window.history.replaceState({}, "", "/dashboard");
    }

    // Read credits
    const match = document.cookie.match(/cpa_credits=(\d+)/);
    if (match) setCredits(parseInt(match[1], 10));
  }, []);

  async function run(endpoint: string, label: string) {
    if (!niche) return alert("Enter a niche first");

    setLoading(true);
    setTitle("");
    setContent("");

    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche }),
    });

    const json = await res.json();

    if (json.error) {
      alert(json.message);
      setLoading(false);
      return;
    }

    setTitle(label);
    setContent(
      json.quick_score ||
        json.keywords ||
        json.offers ||
        json.domains ||
        json.blueprint ||
        json.video
    );

    const match = document.cookie.match(/cpa_credits=(\d+)/);
    if (match) setCredits(parseInt(match[1], 10));

    setLoading(false);
  }

  async function buyCredits(pack: string) {
    const res = await fetch("/api/credits/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pack }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="container">
      <Link href="/">← Back to Home</Link>

      <h1>
        <span className="header-green">CPA Niche</span>{" "}
        <span className="header-yellow">Scout AI</span>
      </h1>

      <p>
        Credits remaining: <strong>{credits}</strong>
      </p>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => buyCredits("small")}>Buy 20 Credits</button>{" "}
        <button onClick={() => buyCredits("medium")}>Buy 50 Credits</button>{" "}
        <button onClick={() => buyCredits("large")}>Buy 100 Credits</button>
      </div>

      <input
        placeholder="Enter a niche"
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

      {loading && <p>Loading…</p>}
      {content && <div className="result-box">{content}</div>}
    </div>
  );
  }
        
