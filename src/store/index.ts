import create, { StateCreator as ZStateCreator } from "zustand";
import createLayoutSlice, { LayoutSlice } from "./slices/layoutSlice";
import { persist, subscribeWithSelector } from "zustand/middleware";
import createThemeSlice, { ThemeSlice } from "./slices/themeSlice";
import createImageSlice, { ImageSlice } from "./slices/imageSlice";
import createTodoSlice, { TodoSlice } from "./slices/todoSlice";
import { preloadImage, handleImages, handleQuotes, handleGoals } from "@utils";
import { imageQuality } from "@constants";
import createQuotesSlice, { QuotesSlice } from "./slices/QuotesSlice";
import createSearchSlice, { SearchSlice } from "./slices/searchSlice";

export type Slices = LayoutSlice &
  ThemeSlice &
  ImageSlice &
  TodoSlice &
  QuotesSlice &
  SearchSlice;
export type StateCreator<T> = ZStateCreator<Slices, [], [], T>;

const useStore = create<Slices>()(
  subscribeWithSelector(
    persist(
      (...a) => ({
        ...createLayoutSlice(...a),
        ...createThemeSlice(...a),
        ...createImageSlice(...a),
        ...createTodoSlice(...a),
        ...createQuotesSlice(...a),
        ...createSearchSlice(...a),
      }),
      {
        name: "store",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["searchOpen", "sideBarOpen"].includes(key)
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
useStore.getState().getCloudPhotos();

useStore.getState().setTheme();
