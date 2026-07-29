import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-art" aria-hidden="true" />
      <div className="not-found-content">
        <p className="not-found-kicker">404 · The trail ends here</p>
        <h1 className="font-display">Lost in the pines.</h1>
        <p>
          This path does not lead to the A-frame, but the cabin, lake guide, and
          open weekends are still close by.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="airbnb-button">
            Return to the cabin
          </Link>
          <Link href="/shoreline-rights">Read the lake guide</Link>
        </div>
      </div>
    </main>
  );
}
