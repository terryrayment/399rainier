import Link from "next/link";
import { formatKitPrice, getActiveHolidayKit } from "@/data/holiday-kits";

/** Seasonal homepage strip — renders only when a live kit window is active. */
export function HolidayReadyStrip() {
  const kit = getActiveHolidayKit();
  if (!kit) return null;

  return (
    <section className="border-b border-line bg-forest text-parchment">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-5 md:flex-row md:items-center">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-copper">
            Holiday Ready · {kit.windowLabel}
          </p>
          <p className="mt-1 font-serif text-xl tracking-tight md:text-2xl">
            {kit.name} — {formatKitPrice(kit.price)}
          </p>
          <p className="mt-1 max-w-xl text-sm leading-6 text-white/70">{kit.tagline}</p>
        </div>
        <Link
          href={`/holiday-ready#${kit.slug}`}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-parchment/30 bg-parchment px-6 text-sm font-medium text-ink transition-colors hover:bg-white"
        >
          See the kit
        </Link>
      </div>
    </section>
  );
}
