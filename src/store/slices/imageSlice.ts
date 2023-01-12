import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";
import type { StateCreator } from "..";

// export type Photo = {
//   id: number;
//   width: number;
//   height: number;
//   urls: { large: string; regular: string; raw: string; small: string };
//   color: string | null;
//   user: {
//     username: string;
//     name: string;
//   };
// };
// interface setPhotos {
//   (prompt: string, setImage: true, count?: number): null;
//   (prompt: string, setImage: false, count: number): Random[];
// }

export type Photos = Random & { for: Date };

export interface ImageSlice {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  photos: Photos[];
  setPhotos: (prompt: string, update?: boolean) => void;
  // update meaning your are adding a new image(refresh is the opposite)
  getPhotos: (count: number) => Promise<Random[]>;
}

const unsplash = createApi({
  accessKey: "KxpNPWHtw7i2ylXHm1MRNLLReT1rabDWHSfU61zpUfg",
  //...other fetch options
});

const createImageSlice: StateCreator<ImageSlice> = (set, get) => ({
  keywords: ["nature"],
  photos: [],
  setKeywords: (keywords) => {
    set({ keywords: keywords });
  },
  setPhotos: (prompt, update = true) => {
    const count = update ? 1 : 2;
    unsplash.photos.getRandom({ query: prompt, count }).then((result) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = result.response!;
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isArray = Array.isArray(response);
      let photos: Photos[];
      if (isArray) {
        photos = response.map((photo, i) => ({
          ...photo,
          for: new Date(tomorrow.setDate(today.getDate() + i)),
        }));
      } else {
        photos = [
          {
            ...response,
            for: new Date(),
          },
        ];
      }
      if (update) {
        set((state) => ({
          photos: [state.photos[1], ...photos],
        }));
      } else {
        set({ photos });
      }
    });
  },
  getPhotos: async (count: number) => {
    const result = await unsplash.photos.getRandom({
      query: get().keywords.join(" "),
      count,
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await result.response!;
    const isArray = Array.isArray(response);
    if (isArray) {
      return response;
    } else {
      return [response];
    }
  },
});
export default createImageSlice;
