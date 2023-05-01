import type { StateCreator } from "..";
import type { OpenmeteoResponse, CurrentWeather, IpapiResponse } from "@types";

type Unit = "celsius" | "fahrenheit" | "kelvin";
export interface WeatherSlice {
  location?: {
    longitude: number;
    latitude: number;
  };
  getCurrentLocation: () => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  weather?: CurrentWeather;
  getWeather: () => void;
}

const createWeatherSlice: StateCreator<WeatherSlice> = (set, get) => ({
  unit: "celsius",
  setUnit(unit) {
    set({ unit });
  },
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        set({ location });
      },
      (error) => {
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((json) => {
            const data = json as IpapiResponse;
            set({
              location: { longitude: data.longitude, latitude: data.latitude },
            });
          });
      }
    );
  },
  getWeather() {
    const { location, unit } = get();
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    if (!location) return;
    url.searchParams.set("latitude", location.latitude.toString());
    url.searchParams.set("longitude", location.longitude.toString());
    url.searchParams.set("current_weather", "true");
    if (unit === "fahrenheit") {
      url.searchParams.set("temperature_unit", "fahrenheit");
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = json as OpenmeteoResponse;
        set({ weather: data.current_weather });
      });
  },
});

export default createWeatherSlice;
