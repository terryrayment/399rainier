import Link from "next/link";
import { SceneChapter } from "@/components/illustration/scene-chapter";
import { HolidayReadyStrip } from "@/components/holiday-ready-strip";
import { cabin } from "@/data/cabin";

const proofItems = [
  { label: `${cabin.rating}★ Guest Favorite`, href: "/chapters" },
  { label: `Sleeps ${cabin.guests}`, href: "/lake-arrowhead-a-frame-cabin" },
  { label: "Indoor sauna", href: "/lake-arrowhead-cabin-with-sauna" },
  { label: "Hot tub in the pines", href: "/lake-arrowhead-cabin-with-sauna" },
  { label: "Dog-friendly yard", href: "/dog-friendly-lake-arrowhead-cabin" },
];

const proofPrimary = proofItems.slice(0, 2);
const proofSecondary = proofItems.slice(2);

/** Proof band inside the forest floor. Not a dashboard of equal chips. */
export function TrustForestFloor() {
  return (
    <SceneChapter
      scene="trust"
      className="trust-forest-floor"
      contentClassName="trust-forest-floor-inner"
    >
      <blockquote className="trust-featured">
        <p className="font-serif trust-featured-quote">
          &ldquo;{cabin.featuredReview.quote}&rdquo;
        </p>
        <footer className="trust-featured-meta">
          {cabin.featuredReview.author} · {cabin.featuredReview.detail}
        </footer>
      </blockquote>

      <div className="trust-proof-trail" role="list">
        <ul className="trust-proof-row" role="presentation">
          {proofPrimary.map((item) => (
            <li key={item.label} role="listitem">
              <Link href={item.href} className="trust-proof-chip">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="trust-proof-row trust-proof-row--secondary" role="presentation">
          {proofSecondary.map((item) => (
            <li key={item.label} role="listitem">
              <Link href={item.href} className="trust-proof-chip">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Seasonal strip mounts only when a kit window is active */}
      <div className="trust-holiday">
        <HolidayReadyStrip />
      </div>
    </SceneChapter>
  );
}
