"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { property, airbnbData } from "@/data/property";

// Derived from actual 2025 data (Airbnb + VRBO combined)
// Average nightly rate estimated from annual revenue / occupied nights
// At ~55% occupancy: 365 * 0.55 = ~200 nights → $42,047 / 200 ≈ $210/night
const BASE_NIGHTLY_RATE = 210;
const ANNUAL_REVENUE_2025 = airbnbData.annualRevenue2025;
const PROPERTY_PRICE = property.price;

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-muted">{label}</span>
        <span className="text-2xl font-light tracking-tight text-accent">
          {format(value)}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input w-full"
        />
        <div
          className="absolute top-1/2 left-0 h-2 bg-accent/30 rounded-full pointer-events-none -translate-y-1/2"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted/60">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-surface">
      <p className="text-3xl md:text-4xl font-light tracking-tight mb-1 text-foreground">
        {value}
      </p>
      <p className="text-sm text-muted">{label}</p>
      {sub && <p className="text-xs mt-1 text-muted/60">{sub}</p>}
    </div>
  );
}

export default function CalculatorPage() {
  const [occupancy, setOccupancy] = useState(55);
  const [nightlyRate, setNightlyRate] = useState(BASE_NIGHTLY_RATE);

  const results = useMemo(() => {
    const occupiedNights = Math.round((occupancy / 100) * 365);
    const grossRevenue = occupiedNights * nightlyRate;
    const monthlyRevenue = grossRevenue / 12;
    const grossYield = (grossRevenue / PROPERTY_PRICE) * 100;

    return {
      occupiedNights,
      grossRevenue,
      monthlyRevenue,
      grossYield,
    };
  }, [occupancy, nightlyRate]);

  // Bar chart data — show how revenue scales with occupancy
  const chartPoints = useMemo(() => {
    return [30, 40, 50, 60, 70, 80].map((occ) => {
      const nights = Math.round((occ / 100) * 365);
      const gross = nights * nightlyRate;
      return { occ, gross };
    });
  }, [nightlyRate]);

  const chartMax = chartPoints[chartPoints.length - 1].gross;

  return (
    <main className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">
            Interactive Calculator
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-8">
            What Could <span className="text-accent">You Earn?</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl">
            Slide the dials to model your own scenario. Based on real 2025
            earnings of{" "}
            <span className="text-accent font-light tracking-tight">
              {formatCurrency(ANNUAL_REVENUE_2025)}
            </span>{" "}
            from 399 Rainier across Airbnb and VRBO.
          </p>
        </div>
      </section>

      <section className="py-12 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Slider
                label="Occupancy Rate"
                value={occupancy}
                min={20}
                max={90}
                step={5}
                onChange={setOccupancy}
                format={(v) => `${v}%`}
              />
              <Slider
                label="Average Nightly Rate"
                value={nightlyRate}
                min={100}
                max={1000}
                step={5}
                onChange={setNightlyRate}
                format={(v) => `$${v}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label="Annual Revenue"
                value={formatCurrency(results.grossRevenue)}
                sub={`${results.occupiedNights} nights booked`}
              />
              <StatCard
                label="Monthly Revenue"
                value={formatCurrency(results.monthlyRevenue)}
                sub="Average per month"
              />
              <StatCard
                label="Gross Yield"
                value={`${results.grossYield.toFixed(1)}%`}
                sub="Revenue ÷ purchase price"
              />
              <StatCard
                label="Nightly Rate"
                value={`$${nightlyRate}`}
                sub={`${occupancy}% occupancy`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Revenue at different occupancies */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            Revenue by Occupancy
          </h2>
          <p className="text-muted text-lg mb-8">
            At your current nightly rate of{" "}
            <span className="text-accent">${nightlyRate}</span>
          </p>
          <div className="space-y-4">
            {chartPoints.map((pt) => {
              const pct = (pt.gross / chartMax) * 100;
              const isActive = pt.occ === occupancy;
              return (
                <button
                  key={pt.occ}
                  onClick={() => setOccupancy(pt.occ)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-12 text-right text-sm ${isActive ? "text-accent font-medium" : "text-muted"}`}
                    >
                      {pt.occ}%
                    </span>
                    <div className="flex-1 h-10 bg-surface rounded-xl overflow-hidden">
                      <div
                        className={`h-full rounded-xl transition-all ${isActive ? "bg-accent" : "bg-accent/20 group-hover:bg-accent/40"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span
                      className={`w-24 text-right text-sm ${isActive ? "text-accent font-medium" : "text-muted"}`}
                    >
                      {formatCurrency(pt.gross)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Actual 2025 context */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            Based on <span className="text-accent">Real Numbers</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-2xl">
            This calculator uses the actual 2025 earnings from 399
            Rainier across Airbnb and VRBO. Not projections — real payouts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 bg-background rounded-2xl text-center">
              <p className="text-3xl font-light tracking-tight text-accent mb-1">
                {formatCurrency(ANNUAL_REVENUE_2025)}
              </p>
              <p className="text-sm text-muted">2025 Actual Revenue</p>
            </div>
            <div className="p-6 bg-background rounded-2xl text-center">
              <p className="text-3xl font-light tracking-tight text-accent mb-1">
                {airbnbData.averageRating}
              </p>
              <p className="text-sm text-muted">Guest Rating</p>
            </div>
            <div className="p-6 bg-background rounded-2xl text-center">
              <p className="text-3xl font-light tracking-tight text-accent mb-1">
                {airbnbData.totalReviews}
              </p>
              <p className="text-sm text-muted">Reviews</p>
            </div>
            <div className="p-6 bg-background rounded-2xl text-center">
              <p className="text-3xl font-light tracking-tight text-accent mb-1">
                +66%
              </p>
              <p className="text-sm text-muted">YoY Growth (Jan)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section className="py-8 border-t border-black/5">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs text-muted/60 leading-relaxed">
            Calculator estimates are for informational purposes only and do not
            constitute financial advice. Actual results will vary based on
            pricing strategy, seasonal demand, and market conditions. The 2025
            revenue figure of {formatCurrency(ANNUAL_REVENUE_2025)} represents
            actual rental payouts across Airbnb and VRBO. Consult a financial advisor and CPA for
            personalized investment analysis.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Like What You See?
          </h2>
          <p className="text-muted text-lg mb-8">
            Request the full investment package with verified financials,
            detailed operating history, and comparable market data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-accent text-white px-8 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent-light transition-colors"
            >
              Request Full Prospectus
            </Link>
            <Link
              href="/investment"
              className="border border-accent text-accent px-8 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              View 2025 Earnings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
