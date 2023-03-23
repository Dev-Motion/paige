import { getTimeItem, getPicture } from "@utils";
import { createApi } from "unsplash-js";
import type { StateCreator } from "..";
import { Picture, PictureWithDate, Random, RandomPicture } from "src/types";
import { defaultNextPhoto, defaultTodayPhoto } from "@constants";

export interface ImageSlice {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  todayPhoto: PictureWithDate;
  nextPhoto: Picture;
  favoritePhotos: Picture[];
  setFavoritePhotos: (photos: Picture[]) => void;

  // update meaning your are adding a new image(refresh is the opposite)
  getPhotos: (update: boolean) => Promise<void>;
}

const unsplash = createApi({
  accessKey: "KxpNPWHtw7i2ylXHm1MRNLLReT1rabDWHSfU61zpUfg",
  //...other fetch options
});

const createImageSlice: StateCreator<ImageSlice> = (set, get) => ({
  keywords: ["Wallpapers"],
  todayPhoto: { ...defaultTodayPhoto, for: new Date() },
  favoritePhotos: [],
  setFavoritePhotos: (photos) => {
    set({ favoritePhotos: photos });
  },
  nextPhoto: defaultNextPhoto,
  setKeywords: (keywords) => {
    set({ keywords: keywords });
  },
  getPhotos: async (update: boolean) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    try {
      const result = await unsplash.photos.getRandom({
        topicIds: get().keywords,
        orientation: "landscape",
        count: 2,
        featured: true,
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = (await result.response!) as RandomPicture[];
      const today = new Date();
      if (update) {
        set((state) => ({
          todayPhoto: { ...state.nextPhoto, for: today },
          nextPhoto: getPicture(response[0]),
        }));
      } else {
        set(() => ({
          todayPhoto: { ...getPicture(response[0]), for: today },
          nextPhoto: getPicture(response[1]),
        }));
      }
    } catch (e) {
      console.log(e);
    }
  },
});
export default createImageSlice;
