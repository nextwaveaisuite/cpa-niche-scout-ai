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
      <div>
        <h1>
          <span className="header-green">CPA Niche</span>{" "}
          <span className="header-yellow">Scout AI</span>
        </h1>

        <p style={{ marginBottom: "24px", color: "#d1fae5" }}>
          Find profitable CPA niches in minutes.
        </p>

        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            background: "#00ff9c",
            color: "#0b0f14",
            padding: "14px 22px",
            borderRadius: "6px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Go to Dashboard →
        </Link>
      </div>
    </main>
  );
}
