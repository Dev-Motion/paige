import type { StateCreator } from "..";

export interface LastFetchedSlice {
  lastFetched: {
    quote: Date;
    cloudPhotos: Date;
    todayPhoto: Date;
  };
  updateLastFetched: (key: keyof LastFetchedSlice["lastFetched"]) => void;
}

const createLastFetchedSlice: StateCreator<LastFetchedSlice> = (set, get) => ({
  lastFetched: {
    quote: new Date(),
    cloudPhotos: new Date(),
    todayPhoto: new Date(),
  },
  updateLastFetched: (key) => {
    set((state) => ({
      lastFetched: { ...state.lastFetched, [key]: new Date() },
    }));
  },
});
// thanks copilot :)
export default createLastFetchedSlice;
