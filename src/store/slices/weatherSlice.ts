import { geocodeToCityName } from "@utils";
import type { StateCreator } from "..";
import type { OpenmeteoResponse, Weather, IpapiResponse } from "@types";

type Unit = "celsius" | "fahrenheit";
export interface WeatherSlice {
  location?: {
    longitude: number;
    latitude: number;
    cityName?: string;
  };
  getCurrentLocation: () => Promise<"success" | "failure">;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  setLocation: (location: {
    longitude: number;
    latitude: number;
    cityName?: string;
  }) => void;
  weather?: Weather;
  getWeather: () => void;
  getCityName: () => void;
}

const createWeatherSlice: StateCreator<WeatherSlice> = (set, get) => ({
  unit: "celsius",
  setUnit(unit) {
    set({ unit });
  },
  getCurrentLocation() {
    const get: Promise<"success" | "failure"> = new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          set({ location });
          resolve("success");
        },
        (error) => {
          fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((json) => {
              const data = json as IpapiResponse;
              set({
                location: {
                  longitude: data.longitude,
                  latitude: data.latitude,
                },
              });
              resolve("success");
            })
            .catch((e) => {
              const mute = e;
              reject("failure");
            });
        }
      )
    );
    return get;
  },
  getWeather() {
    const { location, unit } = get();
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    if (!location) return;
    url.searchParams.set("latitude", location.latitude.toString());
    url.searchParams.set("longitude", location.longitude.toString());
    url.searchParams.set(
      "hourly",
      "temperature_2m,apparent_temperature,weathercode"
    );
    url.searchParams.set("timeformat", "unixtime");
    url.searchParams.set("temperature_unit", "celsius");
    if (unit === "fahrenheit") {
      url.searchParams.set("temperature_unit", "fahrenheit");
    }
    url.searchParams.set("current_weather", "true");
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = json as OpenmeteoResponse;

        set({
          weather: {
            timestamp: Date.now(),
            conditions: data.hourly.time.map((time: number, i: number) => ({
              timestamp: time * 1000, // convert to ms
              temperature: data.hourly.temperature_2m[i],
              apparentTemperature: data.hourly.apparent_temperature[i],
              weatherCode: data.hourly.weathercode[i],
            })),
          },
        });
      })
      .catch((e) => {
        const mute = e;
      });
  },
  getCityName() {
    const location = get().location;
    if (!location) return;
    geocodeToCityName(location.longitude, location.latitude).then(
      (cityName) => {
        set({ location: { ...location, cityName } });
      }
    );
  },
  setLocation(location) {
    console.log(location);
    set({ location });
  },
});

export default createWeatherSlice;
