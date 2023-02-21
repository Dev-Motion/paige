import { availableThemes } from "@store/slices/themeSlice";
import { colorPerception } from "./colorDistance";
export default function autoGetTheme(currentColor: string) {
  const distances = availableThemes.map((theme) => {
    return colorPerception(currentColor, theme.color);
  });
  const minDistance = Math.min(...distances);
  const index = distances.indexOf(minDistance);
  return availableThemes[index]["name"];
}
