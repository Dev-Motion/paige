import { Photos } from "@store/slices/imageSlice";

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
export function getDaySegment(time: Date | null) {
  const hours = time?.getHours() || 0;
  if (hours < 12 && hours >= 5) {
    return "morning";
  } else if (hours >= 12 && hours < 17) {
    return "afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "evening";
  } else {
    return "night";
  }
}
export function processTime(time: Date, is24Hour: boolean) {
  const tHour = time.getHours();
  const Hours = is24Hour ? tHour : tHour % 12;
  const Minutes = time.getMinutes();
  const isAM = tHour < 12;
  const timeString = `${Hours.toString().padStart(
    2,
    "0"
  )}:${Minutes.toString().padStart(2, "0")}`;
  return { timeString, isAM };
}
// Caching and Preloading Images
export function preloadImage(image: string) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = image;
  link.as = "image";
  document.head.appendChild(link);
}

export function cacheImages(images: string[]) {
  caches.open("paige-assets").then((cache) => {
    images.forEach((image) => {
      //check the image is already in the cache
      cache.match(image).then((response) => {
        if (!response) {
          //if not, add it to the cache
          cache.add(image);
        }
      });
    });
  });
}

export function getTodayImage(images: Photos[]) {
  const today = new Date().toDateString();
  const todayImage =
    images.filter((image) => new Date(image.for).toDateString() === today)[0] ||
    images[1];
  return todayImage;
}
