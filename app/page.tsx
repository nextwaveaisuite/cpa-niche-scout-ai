import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "700px" }}>
        <h1>
          <span className="header-green">CPA Niche</span>{" "}
          <span className="header-yellow">Scout AI</span>
        </h1>

        <p style={{ color: "#d1fae5", fontSize: "18px", marginBottom: "20px" }}>
          CPA Niche Scout AI helps you quickly identify profitable CPA niches,
          uncover buyer-intent keywords, analyze offers, discover brandable
          domains, and generate complete monetization blueprints — all in one
          place.
        </p>

        <p style={{ color: "#9ca3af", marginBottom: "30px" }}>
          <strong>How it works:</strong><br />
          1. Enter a niche<br />
          2. Click Analyze or choose a module<br />
          3. Get instant, AI-powered insights you can act on
        </p>

        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            background: "#00ff9c",
            color: "#0b0f14",
            padding: "14px 24px",
            borderRadius: "6px",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "16px",
          }}
        >
          Go to Dashboard →
        </Link>
      </div>
    </main>
  );
}
