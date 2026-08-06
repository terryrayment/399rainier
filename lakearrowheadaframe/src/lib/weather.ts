export type WeatherKind =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm";

export type CabinWeather = {
  temperatureF: number;
  weatherCode: number;
  kind: WeatherKind;
  label: string;
  isDay: boolean;
};

/** WMO weather interpretation codes used by Open-Meteo. */
export function weatherKindFromCode(code: number): WeatherKind {
  if (code === 0) return "clear";
  if (code <= 2) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 95) return "storm";
  return "cloudy";
}

export function weatherLabel(kind: WeatherKind): string {
  switch (kind) {
    case "clear":
      return "Clear";
    case "partly-cloudy":
      return "Partly cloudy";
    case "cloudy":
      return "Cloudy";
    case "fog":
      return "Fog";
    case "drizzle":
      return "Drizzle";
    case "rain":
      return "Rain";
    case "snow":
      return "Snow";
    case "storm":
      return "Storm";
  }
}

type OpenMeteoCurrent = {
  temperature_2m?: number;
  weather_code?: number;
  is_day?: number;
};

export function parseCabinWeather(current: OpenMeteoCurrent | undefined): CabinWeather | null {
  if (!current || typeof current.temperature_2m !== "number") return null;
  const weatherCode = typeof current.weather_code === "number" ? current.weather_code : 3;
  const kind = weatherKindFromCode(weatherCode);
  return {
    temperatureF: Math.round(current.temperature_2m),
    weatherCode,
    kind,
    label: weatherLabel(kind),
    isDay: current.is_day !== 0,
  };
}
