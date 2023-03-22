import type { Random } from "unsplash-js/dist/methods/photos/types";

export type RandomPicture = Random & { views: number; downloads: number };

export type Picture = Omit<
  RandomPicture,
  | "promoted_at"
  | "updated_at"
  | "exif"
  | "liked_by_user"
  | "current_user_collections"
  | "sponsorship"
>;
export type PictureWithDate = Picture & { for: Date };

export type PictureInfo = Pick<
  PictureWithDate,
  "blur_hash" | "urls" | "color" | "alt_description"
>;

export type PictureAttribution = Omit<
  PictureWithDate,
  | "blur_hash"
  | "urls"
  | "color"
  | "promoted_at"
  | "updated_at"
  | "exif"
  | "liked_by_user"
  | "current_user_collections"
  | "sponsorship"
  | "for"
>;

export type { Random };
