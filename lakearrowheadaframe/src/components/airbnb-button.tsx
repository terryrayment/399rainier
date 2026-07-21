"use client";

import { useMemo, useState, type FormEvent } from "react";
import { BookingCalendarFields } from "@/components/booking-calendar";
import { airbnbConfig, buildAirbnbUrl } from "@/lib/site";

type AirbnbButtonProps = {
  campaign?: string;
  content?: string;
  label?: string;
  className?: string;
  variant?: "dark" | "light";
};

export function AirbnbButton({
  campaign = "homepage",
  content = "cta",
  label = "Check availability",
  className = "",
  variant = "dark",
}: AirbnbButtonProps) {
  const href = buildAirbnbUrl(campaign, content);
  const base =
    variant === "dark"
      ? "bg-ink text-parchment hover:bg-forest"
      : "bg-parchment text-ink border border-line hover:bg-white";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-8 text-center text-sm font-medium leading-none tracking-wide transition-colors ${base} ${className}`}
    >
      {label}
    </a>
  );
}

const fieldClass =
  "mt-1 w-full bg-transparent text-sm text-ink outline-none [color-scheme:light]";

export function BookingPill() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [bringingDog, setBringingDog] = useState(false);
  const [touched, setTouched] = useState(false);

  const datesValid = Boolean(checkIn && checkOut && checkOut > checkIn);
  const href = useMemo(
    () =>
      buildAirbnbUrl("homepage", "booking-pill", {
        checkIn: datesValid ? checkIn : undefined,
        checkOut: datesValid ? checkOut : undefined,
        adults,
        pets: bringingDog ? 1 : 0,
      }),
    [adults, bringingDog, checkIn, checkOut, datesValid],
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);
    if (!datesValid) return;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="booking-pill mx-auto flex w-full max-w-4xl flex-col items-stretch gap-4 px-4 py-4 md:flex-row md:items-center md:gap-6 md:px-8 md:py-5"
    >
      <div className="grid flex-1 grid-cols-1 gap-3 text-sm md:grid-cols-3">
        <BookingCalendarFields
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(nextIn, nextOut) => {
            setCheckIn(nextIn);
            setCheckOut(nextOut);
          }}
        />

        <div>
          <label>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-light">
              Guests
            </span>
            <select
              name="adults"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className={`${fieldClass} appearance-none`}
            >
              {Array.from({ length: airbnbConfig.maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-2 flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={bringingDog}
              onChange={(e) => setBringingDog(e.target.checked)}
              className="accent-ink"
            />
            Bringing a dog?
          </label>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-2 md:items-end">
        <button
          type="submit"
          disabled={!datesValid}
          className="inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-ink px-8 text-center text-sm font-medium leading-none tracking-wide text-parchment transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-40"
        >
          Check availability
        </button>
        {touched && !datesValid && (
          <p className="text-xs text-copper">Choose check-in and check-out dates</p>
        )}
      </div>
    </form>
  );
}
