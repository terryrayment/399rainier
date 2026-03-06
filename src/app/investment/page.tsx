import type { Metadata } from "next";
import Link from "next/link";
import { property, airbnbData } from "@/data/property";

export const metadata: Metadata = {
  title: "Investment — 399 Rainier Road, Lake Arrowhead",
  description:
    "Proven Airbnb performer with strong rental income. View the full investment prospectus for 399 Rainier Road.",
};

export default function InvestmentPage() {
  const grossYield = ((airbnbData.annualRevenue / property.price) * 100).toFixed(1);

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            Investment Prospectus
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-8">
            A Mountain Retreat That
            <br />
            <span className="text-accent">Pays For Itself</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl">
            Lake Arrowhead ranks <strong className="text-foreground">#43 nationally</strong> for
            Airbnb return on investment, with an average gross yield of 11.27%. This fully
            renovated A-frame is one of the area&apos;s top performers — a turnkey business
            you can also call home.
          </p>
        </div>
      </section>

      {/* Key metrics */}
      <section className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-8 border border-white/5">
              <p className="text-4xl md:text-5xl font-serif text-accent mb-2">
                ${airbnbData.averageNightlyRate}
              </p>
              <p className="text-muted text-sm">Avg. Nightly Rate</p>
            </div>
            <div className="text-center p-8 border border-white/5">
              <p className="text-4xl md:text-5xl font-serif text-accent mb-2">
                {Math.round(airbnbData.occupancyRate * 100)}%
              </p>
              <p className="text-muted text-sm">Occupancy Rate</p>
            </div>
            <div className="text-center p-8 border border-white/5">
              <p className="text-4xl md:text-5xl font-serif text-accent mb-2">
                ${(airbnbData.annualRevenue / 1000).toFixed(0)}K
              </p>
              <p className="text-muted text-sm">Annual Revenue</p>
            </div>
            <div className="text-center p-8 border border-white/5">
              <p className="text-4xl md:text-5xl font-serif text-accent mb-2">{grossYield}%</p>
              <p className="text-muted text-sm">Gross Yield</p>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Projections */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Revenue Projections
          </h2>
          <p className="text-muted text-lg mb-12">
            Based on the property&apos;s track record and Lake Arrowhead market data, here&apos;s
            what to expect at different occupancy levels.
          </p>

          <div className="overflow-hidden border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left px-6 py-4 text-sm text-muted font-medium tracking-wider uppercase">
                    Occupancy
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-muted font-medium tracking-wider uppercase">
                    Monthly Revenue
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-muted font-medium tracking-wider uppercase">
                    Annual Revenue
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-muted font-medium tracking-wider uppercase">
                    Gross Yield
                  </th>
                </tr>
              </thead>
              <tbody>
                {airbnbData.projections.map((proj, i) => (
                  <tr
                    key={i}
                    className={`border-t border-white/5 ${
                      proj.occupancy === airbnbData.occupancyRate ? "bg-accent/10" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      {Math.round(proj.occupancy * 100)}%
                      {proj.occupancy === airbnbData.occupancyRate && (
                        <span className="ml-2 text-xs text-accent font-medium">CURRENT</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-serif text-lg">
                      ${proj.monthly.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-serif text-lg">
                      ${proj.annual.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-serif text-lg text-accent">
                      {((proj.annual / property.price) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted/60 text-xs mt-4">
            * Revenue figures are based on actual property performance data and Lake Arrowhead
            market averages. Individual results may vary. Projections do not account for
            operating expenses, property management fees, or taxes.
          </p>
        </div>
      </section>

      {/* Guest Reviews */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            What Guests Are Saying
          </h2>
          <p className="text-muted text-lg mb-12">
            {airbnbData.totalReviews} reviews &middot; {airbnbData.averageRating} average rating
            &middot;{" "}
            {airbnbData.superhostStatus && "Superhost status"}
          </p>

          <div className="space-y-8">
            {airbnbData.topReviews.map((review, i) => (
              <div key={i} className="p-8 border border-white/5 bg-background">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-accent">&#9733;</span>
                  ))}
                </div>
                <p className="text-foreground/80 text-lg leading-relaxed italic mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-muted text-sm">
                  {review.guest} &middot; {review.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this property */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
            Why This Property <span className="text-accent">Outperforms</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "A-Frame Appeal",
                text: "A-frames are the most sought-after cabin style on Airbnb. They photograph beautifully, go viral on social media, and command premium nightly rates.",
              },
              {
                title: "Fully Renovated",
                text: "No deferred maintenance, no surprise repairs. Modern finishes, updated systems, and move-in ready for both guests and owners.",
              },
              {
                title: "Location Premium",
                text: "90 minutes from 13 million people in Greater LA. Close to the Village, lake access, skiing, and hiking — guests never run out of things to do.",
              },
              {
                title: "Turnkey Handoff",
                text: "Fully furnished, professionally managed, with an existing booking pipeline. Buy it Friday, host guests Saturday.",
              },
              {
                title: "Year-Round Demand",
                text: "Unlike seasonal markets, Lake Arrowhead draws visitors in all four seasons — snow in winter, lake in summer, foliage in fall, flowers in spring.",
              },
              {
                title: "STR Compliant",
                text: "Fully permitted and compliant with San Bernardino County short-term rental regulations. No permitting surprises.",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-white/5 hover:border-accent/30 transition-colors">
                <h3 className="font-serif text-xl mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-surface text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Ready to See the Numbers?
          </h2>
          <p className="text-muted text-lg mb-8">
            Request the full investment package with detailed financials, operating costs,
            tax benefits, and comparable market analysis.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-accent text-background px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent-light transition-colors"
          >
            Request Full Prospectus
          </Link>
        </div>
      </section>
    </main>
  );
}
