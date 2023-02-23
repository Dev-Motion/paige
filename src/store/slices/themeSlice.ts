import type { StateCreator } from "..";
import {
  WhiteTheme,
  PurpleTheme,
  GoldTheme,
  BrownTheme,
  CaramelTheme,
} from "stitches.config";
import { getTimeItem } from "@utils";
import autoGetTheme from "@utils/autoTheme";

export interface ThemeSlice {
  autoTheme: boolean;
  setAutoTheme: (autoTheme: boolean) => void;
  theme: AvailableThemes;
  setTheme: (theme?: AvailableThemes) => void;
}
export function changeTheme(theme: string, className: string) {
  const HTML = document.getElementsByTagName("html")[0];
  HTML.setAttribute("data-theme", theme);
  HTML.setAttribute("class", className);
}

const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  autoTheme: false,
  setAutoTheme: (autoTheme) => {
    set((state) => {
      if (autoTheme) {
        const todayImage = getTimeItem(state.photos);
        const set_theme = autoGetTheme(todayImage?.color ?? "#000000");
        changeTheme(set_theme, themes[set_theme]);
        return { autoTheme, theme: set_theme };
      } else {
        return { autoTheme };
      }
    });
  },
  theme: "default",
  setTheme: (theme) => {
    set((state) => {
      let set_theme: AvailableThemes;
      const todayImage = getTimeItem(state.photos);
      set_theme = theme || state.theme;
      if (state.autoTheme) {
        set_theme = theme || autoGetTheme(todayImage?.color ?? "#000000");
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
export type AvailableThemes = (typeof availableThemes)[number]["name"];
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
