import { usePhotos } from "@api/hooks";
import type { StateCreator } from "..";

import {
  AvailableAccents,
  BaseTheme,
  accents,
  baseTheme,
} from "@constants/themes";
import autoGetTheme, { autoGetAccent } from "@utils/autoTheme";
import { queryClient } from "../../main";
import { RandomPicture } from "@types";

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
  },
) {
  const HTML = document.getElementsByTagName("html")[0];
  HTML.setAttribute("data-theme", `${base.name}-${accent.name}`);
  HTML.setAttribute("class", `${base.className} ${accent.className}`);
}

const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  autoTheme: true,
  setAutoTheme: (autoTheme) => {
    set({ autoTheme });
    if (autoTheme) {
      get().setTheme();
    }
  },
  accent: "CeruleanBlue",
  theme: "dark",
  setTheme: (accent, base) => {
    set((state) => {
      const todayImage = (
        queryClient.getQueryData(usePhotos.getKey()) as RandomPicture[]
      )[state.cursor];

      if (state.autoTheme) {
        if (accent || base) {
          get().addToast({
            message: "You can't change theme while auto theme is on",
          });
        }
        const newAccent = autoGetAccent(todayImage?.color ?? "#000000");
        const newTheme = autoGetTheme(todayImage?.color ?? "#000000");
        console.log({ todayImage, newAccent, newTheme });
        changeTheme(
          { name: newAccent, className: accents[newAccent] },
          { name: newTheme, className: baseTheme[newTheme].className },
        );
        return { accent: newAccent, theme: newTheme };
      }
      accent = accent || state.accent;
      base = base || state.theme;

      changeTheme(
        { name: accent, className: accents[accent] },
        { name: base, className: baseTheme[base].className },
      );
      return { theme: base, accent };
    });
  },
});
export default createThemeSlice;
