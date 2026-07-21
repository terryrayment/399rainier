import { cabin } from "@/data/cabin";
import { airbnbConfig } from "@/lib/site";

export function ReviewStrip() {
  const quotes = cabin.reviews;

  return (
    <section
      aria-label="Guest reviews"
      className="review-strip border-b border-line bg-forest-deep text-parchment"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:gap-8">
        <div className="shrink-0 md:w-52 md:border-r md:border-white/15 md:pr-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-copper-light">
            Guest Favorite
          </p>
          <p className="font-serif mt-1 text-3xl tracking-tight">
            {cabin.rating}
            <span className="text-copper">★</span>
          </p>
          <p className="mt-1 text-xs text-white/55">{cabin.reviewCount} quiet stays · Superhost</p>
        </div>

        <div className="review-marquee min-w-0 flex-1 overflow-hidden">
          <div className="review-marquee-track">
            {[...quotes, ...quotes].map((review, index) => (
              <blockquote
                key={`${review.quote}-${index}`}
                className="review-marquee-item shrink-0"
              >
                <p className="font-serif text-xl leading-snug tracking-tight md:text-2xl">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-3 text-xs text-white/50">
        <p>Real guest themes from Airbnb stays</p>
        <a
          href={airbnbConfig.listingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/45 transition hover:text-parchment"
        >
          See on Airbnb
        </a>
      </div>
    </section>
  );
}
