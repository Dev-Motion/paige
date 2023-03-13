import { Photos } from "@store/slices/imageSlice";
import useStore from "@store";
import { cacheName } from "@constants";
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
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}
export function processTime(time: Date, is24Hour: boolean) {
  const tHour = time.getHours();
  const Hours = is24Hour ? tHour : tHour > 12 ? tHour - 12 : tHour + 12;
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
  caches.open(cacheName).then((cache) => {
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

export function getTimeItem<T extends { for: Date }[]>(
  item: T,
  day?: "tomorrow" | "today"
): T[number] | undefined {
  day = day || "today";
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = day === "tomorrow" ? tomorrow : today;
  const time = date.toDateString();
  return item.find((item) => new Date(item.for).toDateString() === time);
}

export function handleImages() {
  const photos = useStore.getState().photos;
  const today = new Date().toDateString();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayImage = photos.find(
    (photo) => new Date(photo.for).toDateString() === today
  );
  const tomorrowImage = photos.find(
    (photo) => new Date(photo.for).toDateString() === tomorrow.toDateString()
  );
  const isOnline = navigator.onLine;
  // if online and no images or today's image is available
  // get new images
  // if online and tomorrow's image is not available
  // get tomorrow's image
  // write the code
  if (isOnline) {
    if (photos.length === 0 || !todayImage) {
      useStore.getState().getPhotos(false);
    } else if (!tomorrowImage && todayImage) {
      useStore.getState().getPhotos(true);
    }
  }
}

export function tweetHandler(text: string, hashtags: string[], via: string) {
  const baseUrl = "https://twitter.com/intent/tweet";
  const url = `${baseUrl}?text=${encodeURI(
    text
  )}&via=${via}&hashtags=${hashtags.join(",")}`;
  return url;
}
