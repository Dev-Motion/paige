import type { StateCreator } from "..";
import {
  WhiteTheme,
  PurpleTheme,
  GoldTheme,
  BrownTheme,
  CaramelTheme,
} from "stitches.config";
import { getTodayImage } from "@utils";
import autoTheme from "@utils/autoTheme";

export interface ThemeSlice {
  autoTheme: boolean;
  theme: AvailableThemes;
  setTheme: (theme?: AvailableThemes) => void;
}
export function changeTheme(theme: string, className: string) {
  const HTML = document.getElementsByTagName("html")[0];
  HTML.setAttribute("data-theme", theme);
  HTML.setAttribute("class", className);
}

const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  autoTheme: true,
  theme: "default",
  setTheme: (theme) => {
    set((state) => {
      let set_theme: AvailableThemes;
      const todayImage = getTodayImage(state.photos);
      set_theme = theme || state.theme;
      if (state.autoTheme) {
        set_theme = theme || autoTheme(todayImage?.color ?? "#000000");
      }
      changeTheme(set_theme, themes[set_theme]);

      return { theme: set_theme };
    });
  },
});
export default createThemeSlice;
const themes = {
  default: "darks",
  light: WhiteTheme.className,
  purple: PurpleTheme.className,
  gold: GoldTheme.className,
  brown: BrownTheme.className,
  caramel: CaramelTheme.className,
};
export type AvailableThemes = typeof availableThemes[number]["name"];
export const availableThemes = [
  {
    name: "default",
    color: "#000000",
  },
  {
    name: "light",
    color: "#ffffff",
  },
  {
    name: "purple",
    color: "#01AB9D",
  },
  {
    name: "gold",
    color: "#F7A935",
  },
  {
    name: "brown",
    color: "#825e4a",
  },
  {
    name: "caramel",
    color: "#FFD19B",
  },
] as const;
