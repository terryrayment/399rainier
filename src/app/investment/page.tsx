import type { Metadata } from "next";
import Link from "next/link";
import { property, airbnbData } from "@/data/property";

export const metadata: Metadata = {
  title: "Investment — 399 Rainier Road, Lake Arrowhead",
  description:
    "Proven Airbnb performer with real rental income data. View the full investment details for 399 Rainier Road.",
};

function RevenueBar({
  month,
  revenue,
  max,
  isPeak,
}: {
  month: string;
  revenue: number;
  max: number;
  isPeak: boolean;
}) {
  const pct = (revenue / max) * 100;
  return (
    <div className="flex flex-col items-center gap-2 flex-1 group cursor-default">
      <span
        className={`text-xs font-medium transition-colors ${isPeak ? "text-accent" : "text-muted group-hover:text-foreground"}`}
      >
        ${(revenue / 1000).toFixed(1)}K
      </span>
      <div className="w-full flex items-end h-full">
        <div
          className={`w-full rounded-t-lg transition-all duration-300 ${
            isPeak
              ? "bg-accent shadow-lg shadow-accent/20"
              : "bg-accent/25 group-hover:bg-accent/50"
          }`}
          style={{ height: `${Math.max(pct, 3)}%` }}
        />
      </div>
      <span
        className={`text-xs ${isPeak ? "text-accent font-medium" : "text-muted"}`}
      >
        {month}
      </span>
    </div>
  );
}

export default function InvestmentPage() {
  const grossYield = (
    (airbnbData.annualRevenue2025 / property.price) *
    100
  ).toFixed(1);
  const avgMonthly = airbnbData.annualRevenue2025 / 12;
  const bestMonth = airbnbData.monthly2025.reduce((a, b) =>
    a.revenue > b.revenue ? a : b,
  );
  const maxRevenue = bestMonth.revenue;

  const jan2025 = airbnbData.monthly2025[0].revenue;
  const jan2026 = airbnbData.monthly2026[0].revenue;
  const janGrowth = Math.round(((jan2026 - jan2025) / jan2025) * 100);

  return (
    <main className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">
            Investment — Real Numbers
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-8">
            A Mountain Retreat That
            <br />
            <span className="text-accent">Pays For Itself</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl">
            No projections. No estimates. These are actual rental earnings from
            399 Rainier Road — a proven, turnkey income property in one of
            Southern California&apos;s most popular mountain destinations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-8 bg-background rounded-2xl">
              <p className="text-4xl md:text-5xl font-light tracking-tight text-accent mb-2">
                ${(airbnbData.annualRevenue2025 / 1000).toFixed(1)}K
              </p>
              <p className="text-muted text-sm">2025 Revenue</p>
            </div>
            <div className="text-center p-8 bg-background rounded-2xl">
              <p className="text-4xl md:text-5xl font-light tracking-tight text-accent mb-2">
                ${Math.round(avgMonthly).toLocaleString()}
              </p>
              <p className="text-muted text-sm">Avg. Monthly</p>
            </div>
            <div className="text-center p-8 bg-background rounded-2xl">
              <p className="text-4xl md:text-5xl font-light tracking-tight text-accent mb-2">
                {grossYield}%
              </p>
              <p className="text-muted text-sm">Gross Yield</p>
            </div>
            <div className="text-center p-8 bg-background rounded-2xl">
              <p className="text-4xl md:text-5xl font-light tracking-tight text-accent mb-2">
                +{janGrowth}%
              </p>
              <p className="text-muted text-sm">YoY Growth (Jan)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly earnings chart — the hero of the page */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
                2025 Monthly Earnings
              </h2>
              <p className="text-muted text-lg">
                Actual rental payouts across Airbnb + VRBO
              </p>
            </div>
            <p className="text-4xl md:text-5xl font-light tracking-tight text-accent">
              ${airbnbData.annualRevenue2025.toLocaleString()}
            </p>
          </div>

          {/* Chart */}
          <div className="bg-surface rounded-3xl p-8 md:p-10">
            <div className="flex items-end gap-3 md:gap-4 h-80 md:h-96">
              {airbnbData.monthly2025.map((m) => (
                <RevenueBar
                  key={m.month}
                  month={m.month}
                  revenue={m.revenue}
                  max={maxRevenue}
                  isPeak={m.revenue === maxRevenue}
                />
              ))}
            </div>
          </div>

          {/* Peak callout */}
          <div className="mt-8 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 p-6 bg-accent rounded-2xl text-white">
              <p className="text-sm text-white/60 uppercase tracking-wider mb-1">
                Peak Month
              </p>
              <p className="text-3xl font-light tracking-tight">
                ${bestMonth.revenue.toLocaleString()}
              </p>
              <p className="text-white/70 text-sm mt-1">
                {bestMonth.month} 2025 — holiday season demand
              </p>
            </div>
            <div className="flex-1 p-6 bg-surface rounded-2xl">
              <p className="text-sm text-muted uppercase tracking-wider mb-1">
                Average Month
              </p>
              <p className="text-3xl font-light tracking-tight text-foreground">
                ${Math.round(avgMonthly).toLocaleString()}
              </p>
              <p className="text-muted text-sm mt-1">
                Consistent income across all 12 months
              </p>
            </div>
            <div className="flex-1 p-6 bg-surface rounded-2xl">
              <p className="text-sm text-muted uppercase tracking-wider mb-1">
                Platforms
              </p>
              <p className="text-3xl font-light tracking-tight text-foreground">
                2
              </p>
              <p className="text-muted text-sm mt-1">
                Multi-platform: Airbnb + VRBO
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8">
            2026 Is <span className="text-accent">Trending Up</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-background rounded-2xl">
              <h3 className="text-sm text-muted tracking-wider uppercase mb-4">
                2026 Year-to-Date (Jan-Feb)
              </h3>
              <p className="text-4xl font-light tracking-tight text-accent mb-6">
                ${airbnbData.ytd2026.toLocaleString()}
              </p>
              <div className="space-y-3">
                {airbnbData.monthly2026.map((m) => (
                  <div key={m.month} className="flex justify-between text-sm">
                    <span className="text-muted">{m.month} 2026</span>
                    <span className="text-foreground">
                      ${m.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-3 border-t border-black/5">
                  <span className="text-muted">Upcoming (Mar)</span>
                  <span className="text-foreground">
                    ${airbnbData.upcomingPayouts.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-8 bg-background rounded-2xl">
              <h3 className="text-sm text-muted tracking-wider uppercase mb-4">
                Year-over-Year Growth
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted">January 2025</span>
                    <span className="text-sm text-muted">
                      ${jan2025.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-black/5 h-3 rounded-full">
                    <div
                      className="bg-muted h-3 rounded-full"
                      style={{
                        width: `${(jan2025 / jan2026) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-accent">January 2026</span>
                    <span className="text-sm text-accent">
                      ${jan2026.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-black/5 h-3 rounded-full">
                    <div className="bg-accent h-3 w-full rounded-full" />
                  </div>
                </div>
                <p className="text-center">
                  <span className="text-3xl font-light tracking-tight text-accent">
                    +{janGrowth}%
                  </span>
                  <br />
                  <span className="text-sm text-muted">
                    year-over-year increase
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8">
            Seasonal Revenue Pattern
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface rounded-2xl">
              <h3 className="font-light tracking-tight text-xl mb-3 text-accent">
                Holiday Season
              </h3>
              <p className="text-3xl font-light tracking-tight mb-2">
                $9,481
              </p>
              <p className="text-muted text-sm">
                December alone generated nearly 23% of the year&apos;s revenue.
                Holidays in a mountain A-frame command premium rates.
              </p>
            </div>
            <div className="p-6 bg-surface rounded-2xl">
              <h3 className="font-light tracking-tight text-xl mb-3 text-accent">
                Summer Peak
              </h3>
              <p className="text-3xl font-light tracking-tight mb-2">
                $5,491
              </p>
              <p className="text-muted text-sm">
                August was the summer high — families escaping the LA heat for
                lake days and mountain air.
              </p>
            </div>
            <div className="p-6 bg-surface rounded-2xl">
              <h3 className="font-light tracking-tight text-xl mb-3 text-accent">
                Steady Shoulder
              </h3>
              <p className="text-3xl font-light tracking-tight mb-2">
                $3,504
              </p>
              <p className="text-muted text-sm">
                Average across all 12 months. Even the slower months generate
                consistent income to cover carrying costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            What Guests Are Saying
          </h2>
          <p className="text-muted text-lg mb-12">
            {airbnbData.totalReviews} reviews &middot;{" "}
            {airbnbData.averageRating} average rating &middot;{" "}
            {airbnbData.superhostStatus && "Superhost status"}
          </p>
          <div className="space-y-8">
            {airbnbData.topReviews.map((review, i) => (
              <div key={i} className="p-8 bg-background rounded-2xl">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-warm">
                      &#9733;
                    </span>
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

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-12">
            Why This Property{" "}
            <span className="text-accent">Outperforms</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
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
              <div
                key={i}
                className="p-6 bg-surface rounded-2xl hover:shadow-md transition-shadow"
              >
                <h3 className="font-light tracking-tight text-xl mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Ready to See More?
          </h2>
          <p className="text-muted text-lg mb-8">
            Request the full investment package with detailed financials,
            operating costs, and comparable market analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-accent text-white px-8 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent-light transition-colors"
            >
              Request Full Prospectus
            </Link>
            <Link
              href="/calculator"
              className="border border-accent text-accent px-8 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              Try the Calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
