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
  onNavigate?: () => void;
};

export function AirbnbButton({
  campaign = "homepage",
  content = "cta",
  label = "Check availability",
  className = "",
  variant = "dark",
  onNavigate,
}: AirbnbButtonProps) {
  const href = buildAirbnbUrl(campaign, content);
  const base =
    variant === "dark"
      ? "bg-ink text-parchment hover:bg-forest"
      : "bg-parchment text-ink border border-[#d9d3c2] shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:bg-white";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className={`airbnb-button inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-8 text-center text-sm font-medium leading-none tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-copper ${base} ${className}`}
    >
      {label}
    </a>
  );
}

const fieldClass =
  "mt-1 w-full rounded-md bg-transparent text-sm text-ink [color-scheme:light] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

export function BookingPill() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [bringingDog, setBringingDog] = useState(false);

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
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="booking-pill">
      <div className="booking-pill-fields">
        <BookingCalendarFields
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(nextIn, nextOut) => {
            setCheckIn(nextIn);
            setCheckOut(nextOut);
          }}
        />

        <div className="booking-pill-guests">
          <label className="block">
            <span className="booking-calendar-label uppercase text-muted">
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
          <label className="booking-pill-dog">
            <input
              type="checkbox"
              checked={bringingDog}
              onChange={(e) => setBringingDog(e.target.checked)}
              className="size-4 shrink-0 accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            />
            <span>Bringing a dog?</span>
          </label>
        </div>
      </div>

      <div className="booking-pill-cta">
        <button type="submit" className="booking-pill-submit">
          Check availability
        </button>
      </div>

      {!datesValid ? (
        <p className="booking-pill-hint">
          Add dates for a direct stay link, or browse open weekends.
        </p>
      ) : null}
    </form>
  );
}
