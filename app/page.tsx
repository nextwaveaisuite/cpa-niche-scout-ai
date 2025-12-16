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
      <div style={{ maxWidth: "720px" }}>
        <h1>
          <span className="header-green">CPA Niche</span>{" "}
          <span className="header-yellow">Scout AI</span>
        </h1>

        <p style={{ marginTop: "16px", color: "#d1fae5", fontSize: "18px" }}>
          Discover profitable CPA niches instantly using AI-powered market
          analysis.
        </p>

        <p
          style={{
            marginTop: "12px",
            color: "#9ca3af",
            fontSize: "15px",
            lineHeight: 1.6,
          }}
        >
          Enter any niche and instantly analyze keyword demand, CPA offers,
          monetization angles, expired domain ideas, and a complete website
          blueprint — all in one dashboard.
        </p>

        <div style={{ marginTop: "32px" }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              background: "#00ff9c",
              color: "#0b0f14",
              padding: "16px 26px",
              borderRadius: "6px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>
    </main>
  );
}
