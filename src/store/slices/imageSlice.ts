import { createApi } from "unsplash-js";
import { Random as RandomImage } from "unsplash-js/dist/methods/photos/types";
import type { StateCreator } from "..";

type Random = RandomImage & { views: number; downloads: number };

export type Photos = Pick<
  Random,
  "blur_hash" | "urls" | "color" | "alt_description"
> & { for: Date };

export type PhotoAttribution = Omit<
  Random & { for: Date },
  | "blur_hash"
  | "urls"
  | "color"
  | "promoted_at"
  | "updated_at"
  | "exif"
  | "liked_by_user"
  | "current_user_collections"
  | "sponsorship"
>;

function getPhotoInfo(photo: Random): Omit<Photos, "for"> {
  const { blur_hash, urls, color, alt_description } = photo;
  return { blur_hash, urls, color, alt_description };
}
function getPhotoAttribution(photo: Random): Omit<PhotoAttribution, "for"> {
  const {
    id,
    created_at,
    width,
    height,
    description,
    alt_description,
    links,
    likes,
    user,
    location,
    views,
    downloads,
  } = photo;
  return {
    id,
    created_at,
    width,
    height,
    description,
    alt_description,
    links,
    likes,
    user,
    location,
    views,
    downloads,
  };
}
export interface ImageSlice {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  photos: Photos[];
  photoAttributions: PhotoAttribution[];
  // update meaning your are adding a new image(refresh is the opposite)
  getPhotos: (update: boolean) => Promise<void>;
}

const unsplash = createApi({
  accessKey: "KxpNPWHtw7i2ylXHm1MRNLLReT1rabDWHSfU61zpUfg",
  //...other fetch options
});

const createImageSlice: StateCreator<ImageSlice> = (set, get) => ({
  keywords: ["wallpapers"],
  photos: [],
  photoAttributions: [],
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

      const response = (await result.response!) as Random[];
      const photos = response.map((photo) => getPhotoInfo(photo));
      const photoAttributions = response.map((photo) =>
        getPhotoAttribution(photo)
      );
      if (update) {
        set((state) => ({
          photos: [state.photos[0], { ...photos[0], for: tomorrow }],
          photoAttributions: [
            state.photoAttributions[0],
            { ...photoAttributions[0], for: tomorrow },
          ],
        }));
      } else {
        set(() => ({
          photos: [
            { ...photos[0], for: today },
            { ...photos[1], for: tomorrow },
          ],
          photoAttributions: [
            { ...photoAttributions[0], for: today },
            { ...photoAttributions[1], for: tomorrow },
          ],
        }));
      }
    } catch (e) {
      console.log(e);
    }
  },
});
export default createImageSlice;
