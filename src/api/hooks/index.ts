import { createQuery, createInfiniteQuery } from "react-query-kit";
import {
  getCityName,
  getCurrentLocation,
  getQuotes,
  getWeather,
  getPhotos,
  getCloudPhotos,
  getLocation,
} from "@api";

export const useQuotes = createQuery({
  primaryKey: "quote",
  queryFn: () => {
    // primaryKey equals to 'quote'
    return getQuotes();
  },
  initialData: {
    _id: "nYm8bumyc0E",
    author: "Babe Ruth",
    content: "You just can't beat the person who never gives up.",
    tags: ["Motivational"],
    authorSlug: "babe-ruth",
    length: 50,
    dateAdded: "2022-07-06",
    dateModified: "2023-04-14",
  },
  initialDataUpdatedAt: Date.now() + 1000 * 60 * 60 * 4,
  staleTime: 1000 * 60 * 60 * 4, // 4 hours
});

export const useCurrentLocation = createQuery({
  primaryKey: "current-location",
  queryFn: () => {
    return getCurrentLocation();
  },
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
});

export const useCityName = createQuery<
  string,
  { longitude: number; latitude: number }
>({
  primaryKey: "city-name",
  queryFn: ({ queryKey }) => {
    return getCityName(queryKey[1]);
  },
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
});

export const useWeather = createQuery<
  Awaited<ReturnType<typeof getWeather>>,
  { longitude: number; latitude: number }
>({
  primaryKey: "weather",
  queryFn: ({ queryKey }) => {
    return getWeather(queryKey[1]);
  },
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
});

export const usePhotos = createQuery({
  primaryKey: "photos",
  queryFn: getPhotos,
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
});

export const useCloudPhotos = createInfiniteQuery({
  initialPageParam: 0,
  primaryKey: "cloud-photos",
  queryFn: ({ pageParam = 0 }) => {
    // if variable.fetchmore is true, append the result to the already existing photos
    return getCloudPhotos({ fetchmore: pageParam > 0 });
  },
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
  getNextPageParam: (lastPage, pages) => {
    if (lastPage.length === 4) {
      return undefined;
    }
    return pages.length + 1;
  },
});

export const useLocation = createQuery<
  Awaited<ReturnType<typeof getLocation>>,
  { query: string }
>({
  primaryKey: "location",
  queryFn: ({ queryKey }) => {
    return getLocation(queryKey[1].query);
  },
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
});
