import axios from "axios";
import {
  Coordinates,
  GetCityNameResponse,
  GetQuoteResponse,
  OpenmeteoResponse,
} from "./types";
import useStore from "@store";
import { IpapiResponse, RandomPicture } from "@types";
import { createApi } from "unsplash-js";

export async function getLocation(query: string): Promise<Coordinates[]> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`;
  const res = await fetch(url);
  const data = (await res.json()) as any;

  return (
    data?.results?.map((result: any) => ({
      id: result.id,
      latitude: result.latitude,
      longitude: result.longitude,
      name: result.name,
      country: result.country,
    })) || []
  );
}

export async function getQuotes() {
  const response = await axios.get<GetQuoteResponse>(
    "https://api.quotable.io/random?minLength=40&maxLength=60&tags=" +
      useStore.getState().quoteKeywords.join("|")
  );
  return response.data;
}
export async function getCurrentLocation() {
  const response = await new Promise<{
    longitude: number;
    latitude: number;
    name?: string;
  }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        resolve(location);
      },
      (error) => {
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((json) => {
            const data = json as IpapiResponse;
            const location = {
              longitude: data.longitude,
              latitude: data.latitude,
            };
            resolve(location);
          })
          .catch((e) => {
            const mute = e;
            reject(new Error("failure"));
          });
      }
    );
  });
  return response;
}

export async function getCityName({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  const response = await axios.get<GetCityNameResponse>(url);
  return response.data.address.state.replace(" state", "");
}

export async function getWeather({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) {
  const { unit } = useStore.getState();
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
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
  const response = await axios.get<OpenmeteoResponse>(url.toString());
  const formattedData = {
    conditions: response.data.hourly.time.map((time: number, i: number) => ({
      timestamp: time * 1000, // convert to ms
      temperature: response.data.hourly.temperature_2m[i],
      apparentTemperature: response.data.hourly.apparent_temperature[i],
      weatherCode: response.data.hourly.weathercode[i],
    })),
  };
  return formattedData;
}

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_KEY,
  //...other fetch options
});

export async function getPhotos() {
  const today = new Date();
  const tomorrow = new Date(today);
  const { keywords } = useStore.getState();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const result = await unsplash.photos.getRandom({
    topicIds: keywords,
    orientation: "landscape",
    count: 24,
    featured: true,
  });
  return (result?.response ?? []) as RandomPicture[];
}
export async function getCloudPhotos({ fetchmore }: { fetchmore: boolean }) {
  const { keywords } = useStore.getState();
  const count = fetchmore ? 4 : 6;
  const result = await unsplash.photos.getRandom({
    topicIds: keywords,
    orientation: "landscape",
    count,
    featured: true,
  });

  return (result?.response ?? []) as RandomPicture[];
}
