import Link from "next/link";
import { SceneChapter } from "@/components/illustration/scene-chapter";
import { HolidayReadyStrip } from "@/components/holiday-ready-strip";
import { cabin } from "@/data/cabin";

const proofItems = [
  { label: `${cabin.rating}★ Guest Favorite`, href: "/chapters" },
  { label: `${cabin.reviewCount} reviews`, href: "/chapters" },
  { label: cabin.community, href: "/shoreline-rights" },
  { label: `Sleeps ${cabin.guests}`, href: "/lake-arrowhead-a-frame-cabin" },
  { label: "Indoor sauna", href: "/lake-arrowhead-cabin-with-sauna" },
  { label: "Hot tub in the pines", href: "/lake-arrowhead-cabin-with-sauna" },
  { label: "Dog-friendly yard", href: "/dog-friendly-lake-arrowhead-cabin" },
];

/** Calmer responsive proof band — replaces clipping marquee. */
export function TrustForestFloor() {
  return (
    <SceneChapter
      scene={{
        name: "arrival",
        tone: "forest",
        density: "medium",
        foreground: "none",
        mist: "none",
        intensity: 0.95,
        canopy: false,
        sideRails: false,
      }}
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

      <ul className="trust-proof-list">
        {proofItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="trust-proof-chip">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Seasonal strip mounts only when a kit window is active */}
      <div className="trust-holiday">
        <HolidayReadyStrip />
      </div>
    </SceneChapter>
  );
}
