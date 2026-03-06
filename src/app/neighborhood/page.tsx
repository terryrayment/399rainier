import type { Metadata } from "next";
import Link from "next/link";
import { neighborhood } from "@/data/property";

export const metadata: Metadata = {
  title: "Neighborhood — 399 Rainier Road, Lake Arrowhead",
  description:
    "Discover Lake Arrowhead — mountain village life, world-class recreation, and four-season beauty just 90 minutes from LA.",
};

const categoryIcons: Record<string, string> = {
  shopping: "\uD83D\uDECD\uFE0F",
  adventure: "\u26F7\uFE0F",
  water: "\uD83D\uDEA3",
  hiking: "\uD83E\uDD7E",
};

export default function NeighborhoodPage() {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            The Neighborhood
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-8">
            Life at <span className="text-accent">Lake Arrowhead</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl">
            Perched at 5,100 feet in the San Bernardino National Forest, Lake Arrowhead is
            a mountain community that feels worlds away from the city — yet it&apos;s just
            90 minutes from downtown Los Angeles. Here, every morning starts with pine-scented
            air and birdsong.
          </p>
        </div>
      </section>

      {/* A Day in the Life */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
            A Day at 399 Rainier
          </h2>

          <div className="space-y-12">
            <div className="flex gap-8 items-start">
              <div className="text-accent font-serif text-2xl w-24 shrink-0 text-right">
                7:00am
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Morning Light</h3>
                <p className="text-muted leading-relaxed">
                  Wake to sunlight filtering through the floor-to-ceiling windows. The forest
                  is still. Make coffee in the modern kitchen and take it to the upper deck —
                  you&apos;re eye-level with the treetops.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="text-accent font-serif text-2xl w-24 shrink-0 text-right">
                10:00am
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Mountain Morning</h3>
                <p className="text-muted leading-relaxed">
                  Hike the Heart Rock Trail (10 minutes away) or take the kids to Heaps Peak
                  Arboretum to walk among giant sequoias. Back home, the A-frame&apos;s open
                  layout makes lunch prep feel effortless.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="text-accent font-serif text-2xl w-24 shrink-0 text-right">
                2:00pm
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Lake Life</h3>
                <p className="text-muted leading-relaxed">
                  Head to the Village for a boat tour, browse the waterfront shops, or grab
                  lunch at Jettie&apos;s overlooking the water. In summer, Lake Gregory is
                  perfect for swimming and kayaking.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="text-accent font-serif text-2xl w-24 shrink-0 text-right">
                6:00pm
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Golden Hour</h3>
                <p className="text-muted leading-relaxed">
                  The light through the A-frame windows at this hour is why you bought the
                  house. Grill on the deck, open a bottle of wine, and watch the forest turn
                  gold.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="text-accent font-serif text-2xl w-24 shrink-0 text-right">
                9:00pm
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Evening Quiet</h3>
                <p className="text-muted leading-relaxed">
                  Light the fireplace. The only sounds are crackling wood and wind in the pines.
                  Look up from the loft and see stars through the windows. This is the life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Seasons */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12 text-center">
            Four Seasons of <span className="text-accent">Mountain Living</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {neighborhood.seasons.map((season) => {
              const emoji: Record<string, string> = {
                snowflake: "\u2744\uFE0F",
                flower: "\uD83C\uDF38",
                sun: "\u2600\uFE0F",
                leaf: "\uD83C\uDF41",
              };
              return (
                <div
                  key={season.name}
                  className="p-8 border border-white/5 hover:border-accent/30 transition-colors"
                >
                  <span className="text-4xl mb-4 block">{emoji[season.icon]}</span>
                  <h3 className="font-serif text-2xl mb-3">{season.name}</h3>
                  <p className="text-muted leading-relaxed">{season.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Things to Do
          </h2>
          <p className="text-muted text-lg mb-12">
            From world-class adventure parks to peaceful forest trails, Lake Arrowhead has
            something for every mood and season.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {neighborhood.attractions.map((attraction, i) => (
              <div
                key={i}
                className="p-6 bg-background border border-white/5 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{categoryIcons[attraction.category]}</span>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-serif text-lg text-foreground">
                        {attraction.name}
                      </h3>
                      <span className="text-xs text-accent border border-accent/30 px-2 py-0.5">
                        {attraction.distance}
                      </span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">
                      {attraction.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
            Local Dining
          </h2>

          <div className="space-y-6">
            {neighborhood.dining.map((restaurant, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b border-white/5"
              >
                <h3 className="font-serif text-lg text-foreground">{restaurant.name}</h3>
                <p className="text-muted text-sm">{restaurant.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drive times */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
            How Far Is Everything?
          </h2>

          <div className="space-y-4">
            {neighborhood.driveTimesFrom.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b border-white/5"
              >
                <span className="text-foreground/80">{item.place}</span>
                <span className="font-serif text-xl text-accent">{item.time}</span>
              </div>
            ))}
          </div>

          <p className="text-muted text-sm mt-8">
            Drive times are approximate and may vary with traffic and weather conditions.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Come See It For Yourself
          </h2>
          <p className="text-muted text-lg mb-8">
            Photos and descriptions only go so far. Schedule a visit and feel what life at
            399 Rainier is really like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-accent text-background px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent-light transition-colors"
            >
              Schedule a Visit
            </Link>
            <Link
              href="/experience"
              className="border border-accent text-accent px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent hover:text-background transition-colors"
            >
              Or Stay Before You Buy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
