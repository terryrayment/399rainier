"use client";

import { useEffect, useState } from "react";
import type { CabinWeather, WeatherKind } from "@/lib/weather";

function WeatherGlyph({ kind, isDay }: { kind: WeatherKind; isDay: boolean }) {
  if (kind === "clear") {
    return (
      <svg viewBox="0 0 32 32" className="nav-weather-glyph" aria-hidden="true" focusable="false">
        {isDay ? (
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="16" cy="16" r="5.5" fill="currentColor" stroke="none" className="nav-weather-sun" />
            <path d="M16 4v3.2M16 24.8V28M4 16h3.2M24.8 16H28M7.6 7.6l2.3 2.3M22.1 22.1l2.3 2.3M7.6 24.4l2.3-2.3M22.1 9.9l2.3-2.3" />
          </g>
        ) : (
          <path
            d="M20.5 8.5c-1.2-.5-2.5-.8-3.9-.8C11.2 7.7 7 11.9 7 17s4.2 9.3 9.6 9.3c2.8 0 5.3-1.2 7-3.1-4.8-.2-8.6-4.1-8.6-9 0-2.1.7-4 1.9-5.7z"
            fill="currentColor"
            className="nav-weather-moon"
          />
        )}
      </svg>
    );
  }

  if (kind === "partly-cloudy") {
    return (
      <svg viewBox="0 0 32 32" className="nav-weather-glyph" aria-hidden="true" focusable="false">
        <circle cx="11" cy="11" r="4.2" fill="currentColor" className="nav-weather-sun" />
        <path
          d="M10 22.5c-3.2 0-5.8-2.4-5.8-5.4 0-2.7 2-5 4.7-5.4C10 9.4 12.4 7.5 15.3 7.5c3.4 0 6.2 2.5 6.6 5.7 2.4.4 4.2 2.4 4.2 4.8 0 2.7-2.2 4.9-5 4.9H10z"
          fill="currentColor"
          className="nav-weather-cloud"
        />
      </svg>
    );
  }

  if (kind === "fog") {
    return (
      <svg viewBox="0 0 32 32" className="nav-weather-glyph" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M6 12h20M8 16.5h16M7 21h18" />
        </g>
      </svg>
    );
  }

  if (kind === "drizzle" || kind === "rain" || kind === "storm") {
    return (
      <svg viewBox="0 0 32 32" className="nav-weather-glyph" aria-hidden="true" focusable="false">
        <path
          d="M9.5 16.5c-2.8 0-5-2.1-5-4.7 0-2.4 1.8-4.4 4.2-4.7C9.4 5.1 11.6 3.5 14.2 3.5c3 0 5.5 2.2 5.9 5 2.1.3 3.7 2.1 3.7 4.2 0 2.4-2 4.3-4.4 4.3H9.5z"
          fill="currentColor"
          className="nav-weather-cloud"
        />
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M11 20.5l-1.2 4M16 20.5l-1.2 4M21 20.5l-1.2 4" />
          {kind === "storm" ? <path d="M17 14l-3 5h3.5L15 24" className="nav-weather-bolt" /> : null}
        </g>
      </svg>
    );
  }

  if (kind === "snow") {
    return (
      <svg viewBox="0 0 32 32" className="nav-weather-glyph" aria-hidden="true" focusable="false">
        <path
          d="M9.5 15c-2.8 0-5-2.1-5-4.7 0-2.4 1.8-4.4 4.2-4.7C9.4 3.6 11.6 2 14.2 2c3 0 5.5 2.2 5.9 5 2.1.3 3.7 2.1 3.7 4.2 0 2.4-2 4.3-4.4 4.3H9.5z"
          fill="currentColor"
          className="nav-weather-cloud"
        />
        <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M11 20v5M9 21.5h4M16 20v5M14 21.5h4M21 20v5M19 21.5h4" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className="nav-weather-glyph" aria-hidden="true" focusable="false">
      <path
        d="M8.5 21c-3.2 0-5.8-2.4-5.8-5.4 0-2.7 2-5 4.7-5.4C8.1 7.9 10.5 6 13.4 6c3.4 0 6.2 2.5 6.6 5.7 2.4.4 4.2 2.4 4.2 4.8 0 2.7-2.2 4.9-5 4.9H8.5z"
        fill="currentColor"
        className="nav-weather-cloud"
      />
    </svg>
  );
}

export function NavWeather() {
  const [weather, setWeather] = useState<CabinWeather | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) return;
        const data = (await response.json()) as CabinWeather;
        if (!cancelled && typeof data.temperatureF === "number") {
          setWeather(data);
        }
      } catch {
        /* Keep nav quiet if weather is down */
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!weather) return null;

  return (
    <div
      className="site-nav-weather"
      title={`Lake Arrowhead: ${weather.temperatureF}°F, ${weather.label}. Weather data by Open-Meteo`}
    >
      <WeatherGlyph kind={weather.kind} isDay={weather.isDay} />
      <span className="site-nav-weather-temp">{weather.temperatureF}°</span>
      <span className="site-nav-weather-meta">
        <span className="site-nav-weather-label">{weather.label}</span>
        <span className="site-nav-weather-place">Arrowhead</span>
      </span>
      <span className="sr-only">
        Current weather in Lake Arrowhead, {weather.temperatureF} degrees Fahrenheit,{" "}
        {weather.label}. Data by Open-Meteo.
      </span>
    </div>
  );
}
