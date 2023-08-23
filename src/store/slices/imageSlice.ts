import { RandomPicture } from "@types";
import type { StateCreator } from "..";

export interface ImageSlice {
  cursor: number;
  setCursor: (cursor: number) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  temporaryBackground: { bg: string; blur_hash: string };
  setTemporaryBackground: (tempBg: ImageSlice["temporaryBackground"]) => void;
  favoritePhotos: RandomPicture[];
  setFavoritePhotos: (photos: RandomPicture[]) => void;
}

const createImageSlice: StateCreator<ImageSlice> = (set, get) => ({
  cursor: 0,
  setCursor: (cursor) => {
    set({ cursor });
  },
  keywords: ["Wallpapers", "Nature"],
  setKeywords: (keywords) => {
    set({ keywords: keywords });
  },
  temporaryBackground: {
    bg: "",
    blur_hash: "",
  },
  setTemporaryBackground: (tempBg) => {
    set({ temporaryBackground: tempBg });
  },
  favoritePhotos: [],
  setFavoritePhotos: (photos) => {
    set({ favoritePhotos: photos });
  },
});
export default createImageSlice;
