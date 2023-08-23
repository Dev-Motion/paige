export type Coordinates = {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  id: string;
};

export interface GetQuoteResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface GetCityNameResponse {
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

export interface OpenmeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

export interface Hourly {
  time: number[];
  temperature_2m: number[];
  apparent_temperature: number[];
  weathercode: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  apparent_temperature: string;
  weathercode: string;
}
