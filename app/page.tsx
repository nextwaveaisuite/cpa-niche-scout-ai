import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>CPA Niche Scout AI</h1>
      <p>Find profitable CPA niches in minutes.</p>
      <Link href="/dashboard">Go to Dashboard →</Link>
    </main>
  );
}
