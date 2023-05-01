import type { Random } from "unsplash-js/dist/methods/photos/types";

export type RandomPicture = Random & { views: number; downloads: number };

export type Picture = Omit<
  RandomPicture,
  | "promoted_at"
  | "updated_at"
  | "exif"
  | "liked_by_user"
  | "current_user_collections"
  | "sponsorship"
>;
export type PictureWithDate = Picture & { for: Date };

export type PictureInfo = Pick<
  PictureWithDate,
  "blur_hash" | "urls" | "color" | "alt_description"
>;

export type PictureAttribution = Omit<
  PictureWithDate,
  | "blur_hash"
  | "urls"
  | "color"
  | "promoted_at"
  | "updated_at"
  | "exif"
  | "liked_by_user"
  | "current_user_collections"
  | "sponsorship"
  | "for"
>;
export interface OpenmeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface IpapiResponse {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export interface NominatimResponse {
  placeID: number;
  licence: string;
  osmType: string;
  osmID: number;
  lat: string;
  lon: string;
  displayName: string;
  address: Address;
  boundingbox: string[];
}

export interface Address {
  road: string;
  village: string;
  county: string;
  state: string;
  iso31662Lvl4: string;
  postcode: string;
  country: string;
  countryCode: string;
}

export type { Random };
