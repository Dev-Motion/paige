import { getTimeItem, getPicture } from "@utils";
import { createApi } from "unsplash-js";
import type { StateCreator } from "..";
import { Picture, PictureWithDate, Random, RandomPicture } from "src/types";
import { defaultNextPhoto, defaultTodayPhoto } from "@constants";

export interface ImageSlice {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  temporaryBackground: { bg: string; blur_hash: string };
  setTemporaryBackground: (tempBg: ImageSlice["temporaryBackground"]) => void;
  todayPhoto: PictureWithDate;
  setTodayPhoto: (photo: PictureWithDate) => void;
  nextPhoto: Picture;
  cloudPhotos: Picture[];
  // create react query like api for getCloudPhotos
  getCloudPhotos: (fetchmore?: boolean) => void;
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
  setTodayPhoto: (photo) => {
    set({ todayPhoto: photo });
  },
  temporaryBackground: {
    bg: "",
    blur_hash: "",
  },
  setTemporaryBackground: (tempBg) => {
    set({ temporaryBackground: tempBg });
  },
  nextPhoto: defaultNextPhoto,
  cloudPhotos: [],
  getCloudPhotos: async (fetchmore) => {
    try {
      const count = fetchmore ? 4 : 6;
      const result = await unsplash.photos.getRandom({
        topicIds: get().keywords,
        orientation: "landscape",
        count,
        featured: true,
      });
      const response = (await result.response!) as RandomPicture[];
      const pictures = response.map((resp) => getPicture(resp));
      set({ cloudPhotos: pictures });
    } catch (err) {
      const mute = err;
    }
  },
  favoritePhotos: [],
  setFavoritePhotos: (photos) => {
    set({ favoritePhotos: photos });
  },
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
    } catch (err) {
      const mute = err;
    }
  },
});
export default createImageSlice;
