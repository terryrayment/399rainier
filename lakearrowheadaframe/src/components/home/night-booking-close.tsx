import Link from "next/link";
import { AirbnbButton } from "@/components/airbnb-button";
import { ForestTransition } from "@/components/illustration/forest-transition";
import { SceneChapter } from "@/components/illustration/scene-chapter";
import { cabin } from "@/data/cabin";
import { clusterNavLinks } from "@/lib/routes";

export function NightBookingClose() {
  return (
    <>
      <ForestTransition variant="night" />
      <SceneChapter
        scene="night"
        id="reviews"
        className="night-booking-close"
        contentClassName="night-booking-inner"
      >
        <div className="night-window-glow" aria-hidden="true" />
        <div className="night-booking-layout">
          <blockquote className="night-featured-review">
            <p className="font-serif night-rating">{cabin.rating}★</p>
            <p className="font-serif night-quote">&ldquo;{cabin.featuredReview.quote}&rdquo;</p>
            <footer className="night-quote-meta">
              {cabin.featuredReview.author} · {cabin.featuredReview.detail}
            </footer>
            <Link href="/chapters" className="night-link">
              Read more guest lines →
            </Link>
          </blockquote>

          <div className="night-cta">
            <h2 className="font-serif night-cta-title">{cabin.ctaHeadline}</h2>
            <p className="night-cta-body">
              Indoor sauna, hot tub in the pines, dog-friendly, 165 Mbps for remote weeks.
            </p>
            <AirbnbButton
              campaign="homepage"
              content="final-cta"
              variant="light"
              label="Check availability"
            />
          </div>
        </div>

        <nav className="night-cluster-nav" aria-label="Explore cabin guides">
          {clusterNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="night-cluster-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </SceneChapter>
    </>
  );
}
