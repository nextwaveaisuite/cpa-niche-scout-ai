export default function HomePage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0b0f14",
      color: "#ffffff",
      textAlign: "center",
      padding: "60px 20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
          Find Profitable CPA Niches in Minutes — Not Weeks
        </h1>

        <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: "30px" }}>
          Stop guessing. CPA Niche Scout AI shows you buyer-intent keywords,
          CPA offers, and monetization ideas instantly.
        </p>

        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "30px auto",
          textAlign: "left",
          display: "inline-block"
        }}>
          <li>🔍 Buyer-intent CPA keywords</li>
          <li>💰 CPA offer ideas by niche</li>
          <li>🌐 Brandable domain suggestions</li>
          <li>🧠 Monetization blueprints</li>
          <li>🎥 Video script angles that convert</li>
        </ul>

        <p>Enter a niche. Get real data. Use free credits.</p>

        <a
          href="/dashboard"
          style={{
            display: "inline-block",
            marginTop: "30px",
            padding: "15px 30px",
            background: "#facc15",
            color: "#000",
            fontWeight: "bold",
            textDecoration: "none",
            borderRadius: "6px"
          }}
        >
          Try It Free — Upgrade Only If It’s Worth It
        </a>

        <footer style={{ marginTop: "60px", fontSize: "0.85rem", opacity: 0.7 }}>
          <a href="/privacy" style={{ color: "#facc15", margin: "0 10px" }}>Privacy</a>
          <a href="/terms" style={{ color: "#facc15", margin: "0 10px" }}>Terms</a>
          <a href="/refunds" style={{ color: "#facc15", margin: "0 10px" }}>Refunds</a>
          <a href="/disclaimer" style={{ color: "#facc15", margin: "0 10px" }}>Disclaimer</a>
        </footer>
      </div>
    </main>
  );
            }
