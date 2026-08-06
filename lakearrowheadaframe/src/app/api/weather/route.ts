import { NextResponse } from "next/server";
import { cabin } from "@/data/cabin";
import { parseCabinWeather } from "@/lib/weather";

export const revalidate = 600;

export async function GET() {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(cabin.latitude));
  url.searchParams.set("longitude", String(cabin.longitude));
  url.searchParams.set("current", "temperature_2m,weather_code,is_day");
  url.searchParams.set("temperature_unit", "fahrenheit");
  url.searchParams.set("timezone", "America/Los_Angeles");

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Weather unavailable" }, { status: 502 });
    }

    const data = (await response.json()) as { current?: Record<string, number> };
    const weather = parseCabinWeather(data.current);
    if (!weather) {
      return NextResponse.json({ error: "Weather unavailable" }, { status: 502 });
    }

    return NextResponse.json(weather, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      },
    });
  } catch {
    return NextResponse.json({ error: "Weather unavailable" }, { status: 502 });
  }
}
