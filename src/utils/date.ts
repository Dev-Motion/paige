import { isToday, isTomorrow, isThisWeek } from "date-fns";

export default function analyzeDate(date: Date) {
  const time = date.toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dayOfWeek = date.toLocaleString("en-us", {
    weekday: "short",
  });
  const month = date.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
  });
  const sameWeek = isThisWeek(date);
  const today = isToday(date);
  const tomorrow = isTomorrow(date);
  if (sameWeek) {
    if (today) {
      return `Today, ${time}`;
    } else if (tomorrow) {
      return `Tomorrow, ${time}`;
    }
    return `${dayOfWeek}, ${time}`;
  }
  return `${dayOfWeek}, ${month}`;
}
