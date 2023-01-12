import type { StateCreator } from "..";
import {
  WhiteTheme,
  PurpleTheme,
  GoldTheme,
  BrownTheme,
  CaramelTheme,
} from "stitches.config";

export interface ThemeSlice {
  theme: AvailableThemes;
  setTheme: (theme?: AvailableThemes) => void;
}
export function changeTheme(theme: string, className: string) {
  const HTML = document.getElementsByTagName("html")[0];
  HTML.setAttribute("data-theme", theme);
  HTML.setAttribute("class", className);
}

const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: "default",
  setTheme: (theme) => {
    set((state) => {
      const set_theme = theme || state.theme;
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
    color: "#000",
  },
  {
    name: "light",
    color: "#fff",
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
