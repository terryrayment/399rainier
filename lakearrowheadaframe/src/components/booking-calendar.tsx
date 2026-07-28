"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  addMonths,
  formatFriendlyDate,
  monthGrid,
  monthLabel,
  nightsBetween,
  parseISO,
  startOfMonth,
  toISO,
  todayISO,
} from "@/lib/dates";

type BookingCalendarProps = {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
};

type Selecting = "checkIn" | "checkOut";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function BookingCalendarFields({ checkIn, checkOut, onChange }: BookingCalendarProps) {
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState<Selecting>("checkIn");
  const [hoverISO, setHoverISO] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const minISO = todayISO();
  const nights = nightsBetween(checkIn, checkOut);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openFor(field: Selecting) {
    setSelecting(field);
    setOpen(true);
    const anchor = field === "checkOut" && checkOut ? checkOut : checkIn || minISO;
    setViewMonth(startOfMonth(parseISO(anchor)));
  }

  function pickDay(iso: string) {
    if (iso < minISO) return;

    if (selecting === "checkIn" || !checkIn || (checkIn && checkOut)) {
      onChange(iso, "");
      setSelecting("checkOut");
      setHoverISO(null);
      return;
    }

    if (iso <= checkIn) {
      onChange(iso, "");
      setSelecting("checkOut");
      return;
    }

    onChange(checkIn, iso);
    setSelecting("checkOut");
    setHoverISO(null);
    setOpen(false);
  }

  function clearDates() {
    onChange("", "");
    setSelecting("checkIn");
    setHoverISO(null);
  }

  const previewEnd =
    selecting === "checkOut" && checkIn && !checkOut && hoverISO && hoverISO > checkIn
      ? hoverISO
      : checkOut;

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => openFor("checkIn")}
          className={`min-w-0 border-b border-line pb-3 text-left sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4 ${
            open && selecting === "checkIn" ? "text-ink" : ""
          }`}
          aria-expanded={open}
          aria-controls={labelId}
        >
          <span className="booking-calendar-label uppercase text-muted">
            Check-in
          </span>
          <span className="mt-1 block whitespace-nowrap text-sm text-ink">
            {checkIn ? formatFriendlyDate(checkIn) : "Add date"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => openFor("checkOut")}
          className="min-w-0 pb-3 text-left sm:pb-0 sm:pl-1"
          aria-expanded={open}
          aria-controls={labelId}
        >
          <span className="booking-calendar-label uppercase text-muted">
            Check-out
          </span>
          <span className="mt-1 block whitespace-nowrap text-sm text-ink">
            {checkOut ? formatFriendlyDate(checkOut) : "Add date"}
          </span>
        </button>
      </div>

      {nights > 0 && (
        <p className="mt-2 text-xs text-muted" aria-live="polite">
          {nights} {nights === 1 ? "night" : "nights"}
        </p>
      )}

      {open && (
        <div
          id={labelId}
          role="dialog"
          aria-label="Select stay dates"
          className="booking-calendar absolute left-0 right-0 z-40 mt-3 origin-top md:right-auto md:w-[min(100vw-2rem,36rem)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <p className="text-sm text-ink">
              {selecting === "checkIn" || !checkIn
                ? "Select check-in"
                : checkOut
                  ? "Adjust your stay"
                  : "Select check-out"}
            </p>
            <div className="flex items-center gap-3">
              {(checkIn || checkOut) && (
                <button
                  type="button"
                  onClick={clearDates}
                  className="text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
              >
                Done
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 px-4 pt-3">
            <button
              type="button"
              aria-label="Previous month"
              disabled={viewMonth.getTime() <= startOfMonth(new Date()).getTime()}
              onClick={() => setViewMonth((m) => addMonths(m, -1))}
              className="rounded-full px-3 py-1 text-sm text-muted hover:bg-parchment-elevated hover:text-ink disabled:opacity-30"
            >
              ←
            </button>
            <div className="flex flex-1 justify-center gap-8 text-center">
              <p className="font-serif text-lg text-ink">{monthLabel(viewMonth)}</p>
              <p className="font-serif hidden text-lg text-ink md:block">
                {monthLabel(addMonths(viewMonth, 1))}
              </p>
            </div>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              className="rounded-full px-3 py-1 text-sm text-muted hover:bg-parchment-elevated hover:text-ink"
            >
              →
            </button>
          </div>

          <div className="grid gap-6 p-4 md:grid-cols-2">
            <MonthPanel
              month={viewMonth}
              minISO={minISO}
              checkIn={checkIn}
              checkOut={previewEnd}
              onPick={pickDay}
              onHover={setHoverISO}
            />
            <div className="hidden md:block">
              <MonthPanel
                month={addMonths(viewMonth, 1)}
                minISO={minISO}
                checkIn={checkIn}
                checkOut={previewEnd}
                onPick={pickDay}
                onHover={setHoverISO}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MonthPanel({
  month,
  minISO,
  checkIn,
  checkOut,
  onPick,
  onHover,
}: {
  month: Date;
  minISO: string;
  checkIn: string;
  checkOut: string;
  onPick: (iso: string) => void;
  onHover: (iso: string | null) => void;
}) {
  const cells = monthGrid(month);

  return (
    <div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-[0.12em] text-muted-light">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) return <span key={`e-${index}`} />;
          const iso = toISO(day);
          const disabled = iso < minISO;
          const isStart = iso === checkIn;
          const isEnd = iso === checkOut;
          const inRange =
            Boolean(checkIn && checkOut) && iso > checkIn && iso < checkOut;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onPick(iso)}
              onMouseEnter={() => onHover(iso)}
              onMouseLeave={() => onHover(null)}
              className={[
                "booking-calendar-day",
                disabled ? "is-disabled" : "",
                isStart || isEnd ? "is-endpoint" : "",
                inRange ? "is-in-range" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
