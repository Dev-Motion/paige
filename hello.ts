function getTimeItem<T extends { for: Date }[]>(
  item: T,
  day?: "tomorrow" | "today"
): T[number] | undefined {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = day === "tomorrow" ? tomorrow : today;
  const time = date.toDateString();
  return item.find((item) => item.for.toDateString() === time);
}
