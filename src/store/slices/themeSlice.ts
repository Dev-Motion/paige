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
import autoGetTheme, { autoGetAccent } from "@utils/autoTheme";

export interface ThemeSlice {
  autoTheme: boolean;
  setAutoTheme: (autoTheme: boolean) => void;
  accent: AvailableAccents;
  theme: BaseTheme;
  setTheme: (accent?: AvailableAccents, baseTheme?: BaseTheme) => void;
}
export function changeTheme(
  accent: { name: AvailableAccents; className: string },
  base: {
    name: BaseTheme;
    className: string;
  }
) {
  const HTML = document.getElementsByTagName("html")[0];
  HTML.setAttribute("data-theme", `${base.name}-${accent.name}`);
  HTML.setAttribute("class", `${base.className} ${accent.className}`);
  console.log("set theme");
}

const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  autoTheme: false,
  setAutoTheme: (autoTheme) => {
    set({ autoTheme });
    if (autoTheme) {
      get().setTheme();
    }
  },
  accent: "ceruleanBlue",
  theme: "dark",
  setTheme: (accent, base) => {
    set((state) => {
      const todayImage = state.todayPhoto;

      if (state.autoTheme) {
        if (accent || base) {
          get().addToast({
            message: "You can't change theme while auto theme is on",
          });
        }
        const newAccent = autoGetAccent(todayImage?.color ?? "#000000");
        const newTheme = autoGetTheme(todayImage?.color ?? "#000000");
        changeTheme(
          { name: newAccent, className: accents[newAccent] },
          { name: newTheme, className: baseTheme[newTheme].className }
        );
        return { accent: newAccent, theme: newTheme };
      }
      accent = accent || state.accent;
      base = base || state.theme;

      changeTheme(
        { name: accent, className: accents[accent] },
        { name: base, className: baseTheme[base].className }
      );
      return { theme: base, accent };
    });
  },
});
export default createThemeSlice;

export type AvailableAccents = (typeof availableAccents)[number]["name"];
// #56E49B

export const baseTheme = {
  light: { className: WhiteTheme.className, color: "#f2f2f2" },
  dark: { className: "dark", color: "#292929" },
};
type BaseTheme = keyof typeof baseTheme;
const accents = {
  orange: OrangeTheme.className,
  gold: GoldTheme.className,
  persianGreen: PersianGreenTheme.className,
  pacificBlue: PacificBlueTheme.className,
  ceruleanBlue: CeruleanBlueTheme.className,
  iris: IrisTheme.className,
};
export const availableAccents = [
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
] as const;
