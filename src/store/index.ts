import create, { StateCreator as ZStateCreator } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";
import createLayoutSlice, { LayoutSlice } from "./slices/layoutSlice";
import createThemeSlice, { ThemeSlice } from "./slices/themeSlice";
import createImageSlice, { ImageSlice } from "./slices/imageSlice";
import createTodoSlice, { TodoSlice } from "./slices/todoSlice";
import createQuotesSlice, { QuotesSlice } from "./slices/QuotesSlice";
import createSearchSlice, { SearchSlice } from "./slices/searchSlice";
import createToastSlice, { ToastSlice } from "./slices/ToastSlice";
import { preloadImage, handleImages, handleQuotes, handleGoals } from "@utils";
import { imageQuality } from "@constants";

interface GeneralSlice {
  name?: string;
  setName: (name: string) => void;
}

export type Slices = LayoutSlice &
  ThemeSlice &
  ImageSlice &
  TodoSlice &
  QuotesSlice &
  SearchSlice &
  ToastSlice &
  GeneralSlice;
export type StateCreator<T> = ZStateCreator<Slices, [], [], T>;

const useStore = create<Slices>()(
  subscribeWithSelector(
    persist(
      (...a) => ({
        setName: (name) => {
          a[0]({ name });
        },
        ...createLayoutSlice(...a),
        ...createThemeSlice(...a),
        ...createImageSlice(...a),
        ...createTodoSlice(...a),
        ...createQuotesSlice(...a),
        ...createSearchSlice(...a),
        ...createToastSlice(...a),
      }),
      {
        name: "store",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) =>
                !["searchOpen", "sideBarOpen", "activeToasts"].includes(key)
            )
          ),
      }
    )
  )
);
export default useStore;

// Actions

useStore.subscribe(
  (state) => state.todayPhoto,
  (photo) => {
    preloadImage(photo.urls.raw + imageQuality);
    useStore.getState().setTheme();
  }
);
// add image to link tag in head
preloadImage(useStore.getState().todayPhoto.urls.raw + imageQuality, true);
preloadImage(useStore.getState().nextPhoto.urls.raw + imageQuality);
// fetches images when stale
handleImages();
// fetches quotes when stale
handleQuotes();
// fetches goals when stale
handleGoals();
if (useStore.getState().cloudPhotos.length === 0) {
  useStore.getState().getCloudPhotos();
} else if (useStore.getState().lastFetchCloudPhotos !== undefined) {
  if (
    new Date().getTime() -
      new Date(useStore.getState().lastFetchCloudPhotos || "").getTime() >
    1000 * 60 * 60 * 24
  ) {
    useStore.getState().getCloudPhotos();
  }
}

useStore.getState().setTheme();
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Main Store", useStore);
}
