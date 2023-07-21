import {
  WhiteTheme,
  JellyBeanTheme,
  TigerEyeTheme,
  JonquilTheme,
  LimeGreenTheme,
  PacificBlueTheme,
  SlateBlue,
  CeruleanBlueTheme,
  IrisTheme,
  SteelPinkTheme,
} from "stitches.config";

export type AvailableAccents = (typeof availableAccents)[number]["name"];
// #56E49B

export const baseTheme = {
  light: { className: WhiteTheme.className, color: "#f2f2f2" },
  dark: { className: "dark", color: "#292929" },
};
export type BaseTheme = keyof typeof baseTheme;
export const accents = {
  JellyBean: JellyBeanTheme.className,
  TigerEye: TigerEyeTheme.className,
  Jonquil: JonquilTheme.className,
  LimeGreen: LimeGreenTheme.className,
  PacificBlue: PacificBlueTheme.className,
  SlateBlue: SlateBlue.className,
  CeruleanBlue: CeruleanBlueTheme.className,
  Iris: IrisTheme.className,
  SteelPink: SteelPinkTheme.className,
};
export const availableAccents = [
  {
    name: "JellyBean",
    color: "#E2654C",
  },
  {
    name: "TigerEye",
    color: "#DE9C37",
  },
  {
    name: "Jonquil",
    color: "#F9CC15",
  },
  {
    name: "LimeGreen",
    color: "#33CC4C",
  },
  {
    name: "PacificBlue",
    color: "#1B9ECE",
  },
  {
    name: "SlateBlue",
    color: "#6F78F0",
  },
  {
    name: "CeruleanBlue",
    color: "#3053B9",
  },
  {
    name: "Iris",
    color: "#6D33CC",
  },
  {
    name: "SteelPink",
    color: "#CC33C6",
  },
] as const;
