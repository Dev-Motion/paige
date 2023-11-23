import { create, StateCreator as ZStateCreator } from "zustand";
import { persist, subscribeWithSelector, devtools } from "zustand/middleware";
import createLayoutSlice, { LayoutSlice } from "./slices/layoutSlice";
import createThemeSlice, { ThemeSlice } from "./slices/themeSlice";
import createImageSlice, { ImageSlice } from "./slices/imageSlice";
import createTodoSlice, { TodoSlice } from "./slices/todoSlice";
import createQuotesSlice, { QuotesSlice } from "./slices/QuotesSlice";
import createSearchSlice, { SearchSlice } from "./slices/searchSlice";
import createToastSlice, { ToastSlice } from "./slices/ToastSlice";
import createWeatherSlice, { WeatherSlice } from "./slices/weatherSlice";
import createPinnedSitesSlice, {
  PinnedSitesSlice,
} from "./slices/PinnedSitesSlice";
import createLastFetchedSlice, { LastFetchedSlice } from "./slices/lastFetched";
import { isRunningInExtension } from "@constants";

interface GeneralSlice {
  name?: string;
  setName: (name: string) => void;
  tour: boolean;
  completeTour: () => void;
}

export type Slices = LayoutSlice &
  ThemeSlice &
  ImageSlice &
  TodoSlice &
  QuotesSlice &
  SearchSlice &
  ToastSlice &
  WeatherSlice &
  PinnedSitesSlice &
  LastFetchedSlice &
  GeneralSlice;
export type StateCreator<T> = ZStateCreator<Slices, [], [], T>;

const useStore = create<Slices>()(
  subscribeWithSelector(
    persist(
      devtools((...a) => ({
        setName: (name) => {
          a[0]({ name });
        },
        tour: false,
        completeTour: () => {
          a[0]({ tour: true });
        },
        ...createLayoutSlice(...a),
        ...createThemeSlice(...a),
        ...createImageSlice(...a),
        ...createTodoSlice(...a),
        ...createQuotesSlice(...a),
        ...createSearchSlice(...a),
        ...createToastSlice(...a),
        ...createWeatherSlice(...a),
        ...createPinnedSitesSlice(...a),
        ...createLastFetchedSlice(...a),
      })),
      {
        name: "store",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) =>
                !["searchOpen", "time", "sideBarOpen", "activeToasts"].includes(
                  key,
                ),
            ),
          ),
      },
    ),
  ),
);
export default useStore;

export const api = useStore.getState();

if (isRunningInExtension && api.pinnedSites.length === 0) {
  chrome.topSites.get((data) => {
    data.slice(0, 4).map((d) => {
      api.addPinnedSite(d);
    });
  });
}
if (Notification.permission === "default") {
  Notification.requestPermission().then((res) => console.log(res));
}

if (isRunningInExtension) {
  chrome.notifications.onButtonClicked.addListener((notificationId, i) => {
    const [pre, id] = notificationId.split("-");
    if (pre === "todo") {
      if (i === 1) {
        api.toggleTodo(parseInt(id));
      }
      if (i === 0) {
        api.snoozeTodo(parseInt(id));
      }
    }
  });
}
