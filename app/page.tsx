import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ background: "#0b0f14", color: "#ffffff" }}>
      {/* HERO */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "100px 20px 80px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "46px", fontWeight: 800, marginBottom: "20px" }}>
          Find Profitable <span style={{ color: "#00ff9c" }}>CPA Niches</span>{" "}
          in Minutes — Not Weeks
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#cfd6dd",
            maxWidth: "800px",
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          Stop guessing. CPA Niche Scout AI shows you buyer-intent keywords, CPA
          offers, domain ideas, and monetization angles — instantly.
        </p>

        <Link href="/dashboard">
          <button
            style={{
              background: "#ffd400",
              color: "#000",
              padding: "16px 36px",
              fontSize: "18px",
              fontWeight: 700,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try It Free — Upgrade Only If It’s Worth It
          </button>
        </Link>

        <p style={{ marginTop: "15px", color: "#9aa4af", fontSize: "14px" }}>
          No credit card required to start
        </p>
      </section>

      {/* FEATURES */}
      <section
        style={{
          background: "#0f141b",
          padding: "80px 20px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "34px",
              marginBottom: "50px",
            }}
          >
            Everything You Need to Validate a CPA Niche
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              {
                title: "Buyer-Intent Keywords",
                text: "Identify keywords people are actively searching for before they buy.",
              },
              {
                title: "CPA Offer Ideas",
                text: "Discover relevant CPA offers aligned with real user intent.",
              },
              {
                title: "Brandable Domain Ideas",
                text: "Generate clean, niche-specific domain ideas instantly.",
              },
              {
                title: "Monetization Blueprints",
                text: "Get structured ideas on how to turn niches into revenue streams.",
              },
              {
                title: "Video Script Angles",
                text: "Perfect for YouTube Shorts, TikTok, or paid traffic testing.",
              },
              {
                title: "Fast, Focused Output",
                text: "No bloated dashboards. Just actionable research you can use immediately.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#151b23",
                  padding: "30px",
                  borderRadius: "14px",
                }}
              >
                <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#b6c0cc", lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "40px" }}>
          How It Works
        </h2>

        <ol
          style={{
            textAlign: "left",
            maxWidth: "600px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "#cfd6dd",
          }}
        >
          <li>Enter a niche (e.g. “Alcohol Rehabilitation”)</li>
          <li>Run instant analysis across keywords, offers, and ideas</li>
          <li>Use free credits to evaluate viability</li>
          <li>Upgrade only if the data is valuable to you</li>
        </ol>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          background: "#0f141b",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "34px", marginBottom: "20px" }}>
          Stop Guessing. Start Validating.
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "#cfd6dd",
            marginBottom: "30px",
          }}
        >
          CPA Niche Scout AI helps you focus on niches with real intent — not
          assumptions.
        </p>

        <Link href="/dashboard">
          <button
            style={{
              background: "#ffd400",
              color: "#000",
              padding: "16px 36px",
              fontSize: "18px",
              fontWeight: 700,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try It Free — Upgrade Only If It’s Worth It
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "30px 20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#9aa4af",
        }}
      >
        <Link href="/privacy">Privacy</Link> ·{" "}
        <Link href="/terms">Terms</Link> ·{" "}
        <Link href="/refunds">Refunds</Link> ·{" "}
        <Link href="/disclaimer">Disclaimer</Link>
      </footer>
    </main>
  );
}
