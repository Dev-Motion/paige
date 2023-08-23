import type { StateCreator } from "..";

type Unit = "celsius" | "fahrenheit";
export interface WeatherSlice {
  unit: Unit;
  setUnit: (unit: Unit) => void;
}

const createWeatherSlice: StateCreator<WeatherSlice> = (set, get) => ({
  unit: "celsius",
  setUnit(unit) {
    set({ unit });
  },
});

export default createWeatherSlice;
