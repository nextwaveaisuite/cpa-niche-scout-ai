"use client";

import { useState } from "react";

export default function Dashboard() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  async function run(endpoint: string) {
    setLoading(true);
    setData(null);
    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche }),
    });
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>CPA Niche Scout AI – Dashboard</h1>

      <input
        placeholder="Enter niche (e.g. credit repair)"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        style={{ padding: 10, width: 320, marginRight: 10 }}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={() => run("analyze")}>Analyze</button>{" "}
        <button onClick={() => run("keywords")}>Keywords</button>{" "}
        <button onClick={() => run("offers")}>Offers</button>{" "}
        <button onClick={() => run("domains")}>Domains</button>{" "}
        <button onClick={() => run("blueprint")}>Blueprint</button>
      </div>

      {loading && <p>Loading…</p>}

      {data && (
        <pre
          style={{
            marginTop: 20,
            padding: 16,
            background: "#111",
            color: "#0f0",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
      }
          
