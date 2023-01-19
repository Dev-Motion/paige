import create, { StateCreator as ZStateCreator } from "zustand";
import createLayoutSlice, { LayoutSlice } from "./slices/layoutSlice";
import { persist } from "zustand/middleware";
import createThemeSlice, { ThemeSlice } from "./slices/themeSlice";
import createImageSlice, { ImageSlice } from "./slices/imageSlice";
import { preloadImage, cacheImages, getTodayImage } from "@utils";
import { imageQuality } from "@constants";

export type Slices = LayoutSlice & ThemeSlice & ImageSlice;
export type StateCreator<T> = ZStateCreator<Slices, [], [], T>;

const useStore = create<Slices>()(
  persist(
    (...a) => ({
      ...createLayoutSlice(...a),
      ...createThemeSlice(...a),
      ...createImageSlice(...a),
    }),
    {
      name: "store",
    }
  )
);
export default useStore;

// Actions
function handleImages() {
  const photos = useStore.getState().photos;
  const keywords = useStore.getState().keywords;
  const today = new Date().toDateString();
  const todayImage = photos.filter(
    (photo) => new Date(photo.for).toDateString() === today
  )[0];
  if (photos.length === 0 || !todayImage) {
    useStore.getState().setPhotos(keywords.join(" "), false);
  }
}
handleImages();

useStore.getState().setTheme();
const images = useStore.getState().photos;

const todayImage = getTodayImage(images);
preloadImage(todayImage.urls.raw + imageQuality);
cacheImages(images.map((image) => image.urls.raw + imageQuality));
