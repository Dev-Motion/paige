import { isRunningInExtension } from "@constants";
import { api } from "@store";
import {
  Condition,
  Picture,
  PictureAttribution,
  PictureInfo,
  RandomPicture,
} from "@types";
export { default as animation } from "./animations";
export { default as analyzeDate } from "./date";

export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
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
  const Hours = is24Hour ? tHour : tHour > 12 ? tHour - 12 : tHour;
  const Minutes = time.getMinutes();
  const isAM = tHour < 12;
  const timeString = `${Hours.toString().padStart(
    2,
    "0",
  )}:${Minutes.toString().padStart(2, "0")}`;
  return { timeString, isAM };
}
// get's image from chrome
export function faviconURL(u: string) {
  // https://www.google.com/s2/favicons?domain=${u}&sz=128
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", "32");
  return url.toString();
}

export function requestNotificationPermission(action?: () => void) {
  if (!("Notification" in window)) {
    alert("Notification API not supported!");
    return;
  }

  Notification.requestPermission(function () {
    action;
  });
}

export function spawnTodoNotification(id: number, body: string, title: string) {
  if (isRunningInExtension) {
    chrome.notifications.create(`todo-${id}`, {
      type: "basic",
      iconUrl: "/pwa-64x64.png",
      title,
      message: body,
      buttons: [
        {
          title: "Snooze",
        },
        {
          title: "Completed",
        },
      ],
    });
    return;
  }
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      new Notification(title, { body, icon: "/pwa-64x64.png" });
    }
  });
}

export function getTimeItem<T extends { for: Date }[]>(
  item: T,
  day?: "tomorrow" | "today",
): T[number] | undefined {
  day = day || "today";
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = day === "tomorrow" ? tomorrow : today;
  const time = date.toDateString();
  return item.find((item) => new Date(item.for).toDateString() === time);
}

/**
 * The function `handleGoals` checks if the user is online and if the current goal is stale, and if so,
 * it sets a new goal and logs a message.
 */
export function handleGoals() {
  const todayGoal = api.goal;
  const isOnline = navigator.onLine;
  const today = new Date().toDateString();
  const isStale = new Date(todayGoal.for).toDateString() !== today;
  if (isOnline) {
    if (!todayGoal || isStale) {
      api.setGoal({ text: "", for: new Date() });
    }
  }
}

export function tweetHandler(text: string) {
  const hashtags = ["paige_devmotion", "inspring", "inspirational"];
  const via = "paige_devmotion";
  const baseUrl = "https://twitter.com/intent/tweet";
  const url = `${baseUrl}?text=${encodeURI(
    text,
  )}&via=${via}&hashtags=${hashtags.join(",")}`;
  return url;
}

export function getPicture(photo: RandomPicture): Picture {
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
    blur_hash,
    urls,
    color,
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
    blur_hash,
    urls,
    color,
  };
}
export function getPictureInfo(photo: Picture): PictureInfo {
  const { blur_hash, urls, color, alt_description } = photo;
  return { blur_hash, urls, color, alt_description };
}
export function getPictureAttribution(photo: Picture): PictureAttribution {
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

export const findCurrent = (
  conditions: Condition[],
  now: number,
): Condition | null =>
  conditions
    .slice()
    .reverse()
    .find((condition) => now >= condition.timestamp) ?? null;
