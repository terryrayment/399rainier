export type HolidayKitStatus = "live" | "coming";

export type HolidayKit = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  price: number;
  /** Human-readable window for the page */
  windowLabel: string;
  requestCutoffDays: number;
  includes: string[];
  excludes: string[];
  /** Shown as available to request now vs next window */
  status: HolidayKitStatus;
  /** Fixed calendar month/day window (may wrap year for NYE) */
  window: {
    kind: "fixed" | "thanksgiving";
    /** 1-based month */
    startMonth?: number;
    startDay?: number;
    endMonth?: number;
    endDay?: number;
  };
};

export const holidayKits: HolidayKit[] = [
  {
    slug: "thanksgiving",
    name: "Thanksgiving for 8",
    shortName: "Thanksgiving",
    tagline: "The table is set. You bring the people.",
    price: 199,
    windowLabel: "Wed–Sun of Thanksgiving week",
    requestCutoffDays: 5,
    status: "live",
    window: { kind: "thanksgiving" },
    includes: [
      "Table set for 8 with place cards",
      "Autumn centerpiece",
      "Carving board ready",
      "Gravy and cider pantry starters",
      "Fireplace autumn staging",
    ],
    excludes: [
      "Cooked turkey or full catering",
      "Mid-stay grocery restocking",
    ],
  },
  {
    slug: "christmas",
    name: "Christmas Ready",
    shortName: "Christmas",
    tagline: "Arrive to a cabin already dressed for Christmas.",
    price: 249,
    windowLabel: "December 15–26",
    requestCutoffDays: 5,
    status: "live",
    window: {
      kind: "fixed",
      startMonth: 12,
      startDay: 15,
      endMonth: 12,
      endDay: 26,
    },
    includes: [
      "Pre-lit tree with ornaments",
      "Stockings and garland",
      "Cocoa bar — mixes, mugs, marshmallows",
      "Throw blankets",
      "Fireplace Christmas staging",
    ],
    excludes: [
      "Real Christmas trees",
      "Cooked meals",
      "Mid-stay restocking",
    ],
  },
  {
    slug: "new-year",
    name: "New Year in the Pines",
    shortName: "New Year’s",
    tagline: "Midnight under the string lights. Quiet morning after.",
    price: 179,
    windowLabel: "December 28 – January 2",
    requestCutoffDays: 5,
    status: "coming",
    window: {
      kind: "fixed",
      startMonth: 12,
      startDay: 28,
      endMonth: 1,
      endDay: 2,
    },
    includes: [
      "Champagne flutes and sparkling cider",
      "Midnight snack tray setup",
      "String-light refresh",
      "First-morning breakfast staples",
    ],
    excludes: [
      "Alcohol beyond sparkling cider unless confirmed 21+",
      "Fireworks or outdoor sparklers",
    ],
  },
  {
    slug: "valentines",
    name: "Valentine Reset",
    shortName: "Valentine’s",
    tagline: "Sauna, hot tub, and a cabin set for two.",
    price: 149,
    windowLabel: "February 12–15",
    requestCutoffDays: 3,
    status: "coming",
    window: {
      kind: "fixed",
      startMonth: 2,
      startDay: 12,
      endMonth: 2,
      endDay: 15,
    },
    includes: [
      "Robe and towel staging for two",
      "Chocolate and strawberries (day-of)",
      "Candle-safe ambiance (LED)",
      "Sauna → hot tub ritual note card",
    ],
    excludes: [
      "Full spa service",
      "Requests inside 3 days of check-in",
    ],
  },
  {
    slug: "halloween",
    name: "Halloween Cozy",
    shortName: "Halloween",
    tagline: "Spooky-soft. Fireplace warm. Candy bowl ready.",
    price: 129,
    windowLabel: "October 24–31",
    requestCutoffDays: 5,
    status: "coming",
    window: {
      kind: "fixed",
      startMonth: 10,
      startDay: 24,
      endMonth: 10,
      endDay: 31,
    },
    includes: [
      "Porch and entry pumpkin staging",
      "Cozy throws",
      "Warm living-room setup",
      "Candy bowl",
    ],
    excludes: ["Jump-scare décor", "Costume rentals"],
  },
  {
    slug: "fourth-of-july",
    name: "Fourth of July Deck",
    shortName: "July 4th",
    tagline: "Deck dinner energy. S’mores after dark.",
    price: 129,
    windowLabel: "July 2–5",
    requestCutoffDays: 5,
    status: "coming",
    window: {
      kind: "fixed",
      startMonth: 7,
      startDay: 2,
      endMonth: 7,
      endDay: 5,
    },
    includes: [
      "Red and white deck table staging",
      "BBQ toolkit check",
      "S’mores kit",
    ],
    excludes: ["Fireworks", "Catered BBQ"],
  },
];

/** Fourth Thursday of November (local date parts). */
export function getThanksgivingDate(year: number): Date {
  const nov1 = new Date(year, 10, 1);
  const day = nov1.getDay();
  const firstThursday = day <= 4 ? 1 + (4 - day) : 1 + (11 - day);
  return new Date(year, 10, firstThursday + 21);
}

function monthDayKey(month: number, day: number): number {
  return month * 100 + day;
}

function isInFixedWindow(
  date: Date,
  startMonth: number,
  startDay: number,
  endMonth: number,
  endDay: number,
): boolean {
  const md = monthDayKey(date.getMonth() + 1, date.getDate());
  const start = monthDayKey(startMonth, startDay);
  const end = monthDayKey(endMonth, endDay);

  if (start <= end) {
    return md >= start && md <= end;
  }

  // Wraps year boundary (e.g. Dec 28 – Jan 2)
  return md >= start || md <= end;
}

function isInThanksgivingWindow(date: Date): boolean {
  const tg = getThanksgivingDate(date.getFullYear());
  const startDay = tg.getDate() - 1; // Wednesday
  const endDay = tg.getDate() + 3; // Sunday
  const y = tg.getFullYear();
  const m = tg.getMonth();
  const start = new Date(y, m, startDay);
  const end = new Date(y, m, endDay);
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return day >= start && day <= end;
}

export function isKitWindowActive(kit: HolidayKit, date: Date = new Date()): boolean {
  if (kit.window.kind === "thanksgiving") {
    return isInThanksgivingWindow(date);
  }

  const { startMonth, startDay, endMonth, endDay } = kit.window;
  if (
    startMonth == null ||
    startDay == null ||
    endMonth == null ||
    endDay == null
  ) {
    return false;
  }

  return isInFixedWindow(date, startMonth, startDay, endMonth, endDay);
}

/** Active kit for homepage strip — prefer live kits currently in window. */
export function getActiveHolidayKit(date: Date = new Date()): HolidayKit | null {
  const active = holidayKits.filter(
    (kit) => kit.status === "live" && isKitWindowActive(kit, date),
  );
  return active[0] ?? null;
}

export function formatKitPrice(price: number): string {
  return `$${price}`;
}
