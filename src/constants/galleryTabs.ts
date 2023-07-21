const galleryTabs = [
  {
    value: "cloud",
    name: "Cloud Wallpapers",
  },
  {
    value: "favourites",
    name: "Favourites",
  },
] as const;
export type GalleryTabItems = (typeof galleryTabs)[number]["value"];
export default galleryTabs;
