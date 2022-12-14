import create, { StateCreator as ZStateCreator } from "zustand";
import createLayoutSlice, { LayoutSlice } from "./layoutSlice";
import { persist } from "zustand/middleware";
import createThemeSlice, { ThemeSlice } from "./themeSlice";
import createImageSlice, { ImageSlice } from "./imageSlice";

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
