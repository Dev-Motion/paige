import { availableAccents, baseTheme } from "@constants/themes";
import { colorPerception } from "./colorDistance";
export function autoGetAccent(currentColor: string) {
  const distances = availableAccents.map((theme) => {
    return colorPerception(currentColor, theme.color);
  });
  const minDistance = Math.min(...distances);
  const index = distances.indexOf(minDistance);
  return availableAccents[index]["name"];
}
export default function autoGetTheme(currentColor: string) {
  const keys = Object.keys(baseTheme) as Array<keyof typeof baseTheme>;
  const distances = keys.map((key) => {
    return colorPerception(currentColor, baseTheme[key].color);
  });
  const minDistance = Math.min(...distances);
  const index = distances.indexOf(minDistance);
  return keys[index];
}
