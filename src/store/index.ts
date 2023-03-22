import create, { StateCreator as ZStateCreator } from "zustand";
import createLayoutSlice, { LayoutSlice } from "./slices/layoutSlice";
import { persist, subscribeWithSelector } from "zustand/middleware";
import createThemeSlice, { ThemeSlice } from "./slices/themeSlice";
import createImageSlice, { ImageSlice } from "./slices/imageSlice";
import createTodoSlice, { TodoSlice } from "./slices/todoSlice";
import { preloadImage, cacheImages, getTimeItem, handleImages } from "@utils";
import { imageQuality } from "@constants";
import createQuotesSlice, { QuotesSlice } from "./slices/QuotesSlice";

export type Slices = LayoutSlice &
  ThemeSlice &
  ImageSlice &
  TodoSlice &
  QuotesSlice;
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
  }
);
// add image to link tag in head
preloadImage(useStore.getState().todayPhoto.urls.raw + imageQuality, true);
preloadImage(useStore.getState().nextPhoto.urls.raw + imageQuality);
handleImages();

useStore.getState().setTheme();
