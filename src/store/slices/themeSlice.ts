import type { StateCreator } from "..";
import {
  WhiteTheme,
  OrangeTheme,
  GoldTheme,
  PersianGreenTheme,
  PacificBlueTheme,
  CeruleanBlueTheme,
  IrisTheme,
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
        const todayImage = state.todayPhoto;
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
      const todayImage = state.todayPhoto;
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

export type AvailableThemes = (typeof availableThemes)[number]["name"];
// #56E49B

const themes = {
  default: "dark-theme",
  orange: OrangeTheme.className,
  gold: GoldTheme.className,
  persianGreen: PersianGreenTheme.className,
  pacificBlue: PacificBlueTheme.className,
  ceruleanBlue: CeruleanBlueTheme.className,
  iris: IrisTheme.className,
  light: WhiteTheme.className,
};
export const availableThemes = [
  {
    name: "default",
    color: "#000000",
  },
  {
    name: "orange",
    color: "#E2654C",
  },
  {
    name: "gold",
    color: "#F7A935",
  },
  {
    name: "persianGreen",
    color: "#01AB9D",
  },
  {
    name: "pacificBlue",
    color: "#1B9ECE",
  },
  {
    name: "ceruleanBlue",
    color: "#3053B9",
  },
  {
    name: "iris",
    color: "#6D33CC",
  },
  {
    name: "light",
    color: "#ffffff",
  },
] as const;
