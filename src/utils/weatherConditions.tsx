/** Weather conditions for a point in time */
export interface Conditions {
  timestamp: number;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  weatherCode: number;
}

const date = new Date();
const hour = date.getHours();
const isNight = hour < 6 || hour > 18;
/** Find conditions for the current time */
export const findCurrent = (
  conditions: Conditions[],
  now: number
): Conditions | null =>
  conditions
    .slice()
    .reverse()
    .find((condition) => now >= condition.timestamp) ?? null;

export function icon(icon: string) {
  return `/images/weather-icons/${icon}.svg`;
}
/** Map of weatherCode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           s to icons */
export const weatherCodes: Record<number, string> = {
  0: isNight ? "clear-night" : "clear-day", // clear sky // TODO: or moon
  1: isNight ? "clear-night" : "clear-day", // mainly clear // TODO: or moon
  2: isNight ? "partly-cloudy-night" : "partly-cloudy-day", // party cloudy
  3: isNight ? "overcast-night" : "overcast-day", // overcast
  45: "fog", // fog
  48: "fog", // depositing rime fog
  51: "drizzle", // light drizzle
  53: "drizzle", // moderate drizzle
  55: "drizzle", // heavy drizzle
  56: "drizzle", // light freezing drizzle
  57: "drizzle", // heavy freezing drizzle
  61: "rain", // light rain
  63: "rain", // moderate rain
  65: "rain", // heavy rain
  66: "rain", // light freezing rain
  67: "rain", // heavy freezing rain
  71: "snow", // light snow
  73: "snow", // moderate snow
  75: "snow", // heavy snow
  77: "snow", // snow grains
  80: "rain", // light rain showers
  81: "rain", // moderate rain showers
  82: "rain", // heavy rain showers
  85: "snow", // light snow showers
  86: "snow", // heavy snow showers
  95: "thunderstorms", // thunderstorm
  96: "thunderstorms-rain", // thunderstorm light hail
  99: "thunderstorms-rain", // thunderstorm heavy hail
};
