import { createStitches, createTheme } from "@stitches/react";
import type * as Stitches from "@stitches/react";
export type { VariantProps } from "@stitches/react";
import { mixins } from "stitches-mixins";
import { mixins as mixinStyles } from "@constants";

export const {
  styled,
  css,
  theme,
  getCssText,
  globalCss,
  keyframes,
  config,
  reset,
} = createStitches({
  theme: {
    colors: {
      text: "#FFFFFF",
      textRGB: "255,255,255",
      bg: "rgb(44 44 44)",
      bgRGB: "44, 44, 44",
      shadow: "#000000",
      shadowRGB: "0, 0, 0",
    },
    fonts: {
      inter: "Inter, sans-serif",
    },
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "35px",
      7: "45px",
      8: "65px",
      9: "80px",
    },
    fontWeights: {
      1: "300",
      2: "400",
      3: "500",
      4: "600",
      5: "700",
    },
    sizes: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "35px",
      7: "45px",
      8: "65px",
      9: "80px",
    },
    fontSizes: {
      "2xs": "10px",
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
      "3xl": "36px",
      "4xl": "40px",
      "5xl": "48px",
      "6xl": "118.88px",
    },
    radii: {
      1: "4px",
      2: "6px",
      3: "8px",
      4: "10px",
      5: "12px",
      round: "50%",
      pill: "9999px",
    },
    zIndices: {
      1: "100",
      2: "200",
      3: "300",
      4: "400",
      5: "500",
      6: "600",
      max: "999",
    },
  },
  media: {
    xxs: "(min-width: 360px)",
    xs: "(min-width: 480px)",
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    xxl: "(min-width: 1536px)",
    motion: "(prefers-reduced-motion)",
    hover: "(any-hover: hover)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
  utils: {
    include: mixins(mixinStyles),
    pd: (value: Stitches.PropertyValue<"padding">) => ({
      padding: value,
    }),
    pt: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<"paddingRight">) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<"paddingBottom">) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<"paddingLeft">) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<"paddingLeft">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<"paddingTop">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.PropertyValue<"margin">) => ({
      margin: value,
    }),
    mt: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<"marginRight">) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<"marginBottom">) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<"marginLeft">) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<"marginLeft">) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<"marginTop">) => ({
      marginTop: value,
      marginBottom: value,
    }),
    spacey: (value: Stitches.PropertyValue<"marginTop">) => ({
      "&>*+*": {
        marginTop: value,
      },
    }),
    ta: (value: Stitches.PropertyValue<"textAlign">) => ({
      textAlign: value,
    }),

    fd: (value: Stitches.PropertyValue<"flexDirection">) => ({
      flexDirection: value,
    }),
    fw: (value: Stitches.PropertyValue<"flexWrap">) => ({ flexWrap: value }),

    ai: (value: Stitches.PropertyValue<"alignItems">) => ({
      alignItems: value,
    }),
    ac: (value: Stitches.PropertyValue<"alignContent">) => ({
      alignContent: value,
    }),
    jc: (value: Stitches.PropertyValue<"justifyContent">) => ({
      justifyContent: value,
    }),
    as: (value: Stitches.PropertyValue<"alignSelf">) => ({
      alignSelf: value,
    }),
    fg: (value: Stitches.PropertyValue<"flexGrow">) => ({ flexGrow: value }),
    fs: (value: Stitches.PropertyValue<"flexShrink">) => ({
      flexShrink: value,
    }),
    fb: (value: Stitches.PropertyValue<"flexBasis">) => ({
      flexBasis: value,
    }),
    gcs: (value: Stitches.PropertyValue<"gridColumn">) => ({
      gridColumn: value,
    }),
    grs: (value: Stitches.PropertyValue<"gridRow">) => ({ gridRow: value }),
    bg: (value: Stitches.PropertyValue<"background">) => ({
      background: value,
    }),
    bc: (value: Stitches.PropertyValue<"backgroundColor">) => ({
      backgroundColor: value,
    }),

    br: (value: Stitches.PropertyValue<"borderRadius">) => ({
      borderRadius: value,
    }),
    blr: (value: Stitches.PropertyValue<"borderTopRightRadius">) => ({
      borderTopLeftRadius: value,
      borderBottomLeftRadius: value,
    }),
    brr: (value: Stitches.PropertyValue<"borderBottomRightRadius">) => ({
      borderTopRightRadius: value,
      borderBottomRightRadius: value,
    }),
    btrr: (value: Stitches.PropertyValue<"borderTopRightRadius">) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: Stitches.PropertyValue<"borderBottomRightRadius">) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: Stitches.PropertyValue<"borderBottomLeftRadius">) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: Stitches.PropertyValue<"borderTopLeftRadius">) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value: Stitches.PropertyValue<"boxShadow">) => ({
      boxShadow: value,
    }),

    lh: (value: Stitches.PropertyValue<"lineHeight">) => ({
      lineHeight: value,
    }),

    ox: (value: Stitches.PropertyValue<"overflowX">) => ({
      overflowX: value,
    }),
    oy: (value: Stitches.PropertyValue<"overflowY">) => ({
      overflowY: value,
    }),

    pe: (value: Stitches.PropertyValue<"pointerEvents">) => ({
      pointerEvents: value,
    }),
    us: (value: Stitches.PropertyValue<"userSelect">) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),
    mw: (value: Stitches.PropertyValue<"maxWidth">) => ({ maxWidth: value }),
    userSelect: (value: Stitches.PropertyValue<"userSelect">) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value: Stitches.PropertyValue<"width">) => ({
      width: value,
      height: value,
    }),

    appearance: (value: Stitches.PropertyValue<"appearance">) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: Stitches.PropertyValue<"backgroundClip">) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});

export type CSS = Stitches.CSS<typeof config>;

export const GlobalStyles = globalCss({
  "*,*::before,*::after": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    fontFamily: "$inter",
    transition: "background 500ms ease-in-out",
  },
  html: {
    scrollBehavior: "smooth!important",
    scrollPaddingTop: "$9",
  },
  a: {
    color: "inherit",
    textDecoration: " none",
  },
});

GlobalStyles();
export const WhiteTheme = createTheme("light-theme", {
  colors: {
    bg: "rgb(249 249 249 )",
    shadow: "#FFFFFF",
    shadowRGB: "255,255,255",
    bgRGB: "249,249,249",
    text: "#000000",
    textRGB: "0,0,0",
  },
});
export const OrangeTheme = createTheme("orange-theme", {
  colors: {
    accent: "rgb(226 101 76)",
    accentRGB: "226,101,76",
  },
});
export const GoldTheme = createTheme("gold-theme", {
  colors: {
    accent: "rgb(247 169 53)",
    accentRGB: "247 ,169, 53",
  },
});
export const PersianGreenTheme = createTheme("persian-green-theme", {
  colors: {
    accent: "rgb(1 171 157)",
    accentRGB: "1, 171 ,157",
  },
});

// new Accents
export const JellyBeanTheme = createTheme("jelly-bean-theme", {
  colors: {
    accent: "rgba(226, 101, 76, 1)",
    accentRGB: "226, 101, 76",
  },
});

export const TigerEyeTheme = createTheme("tiger-eye-theme", {
  colors: {
    accent: "rgba(222, 156, 55, 1)",
    accentRGB: "222, 156, 55",
  },
});

export const JonquilTheme = createTheme("jonquil-theme", {
  colors: {
    accent: "rgba(249, 204, 21, 1)",
    accentRGB: "249, 204, 21",
  },
});
export const LimeGreenTheme = createTheme("lime-green-theme", {
  colors: {
    accent: "rgba(51, 204, 76, 1)",
    accentRGB: "51, 204, 76",
  },
});
export const PacificBlueTheme = createTheme("pacific-blue-theme", {
  colors: {
    accent: "rgb(27 158 206)",
    accentRGB: "27, 158, 206",
  },
});
export const SlateBlue = createTheme("slate-blue-theme", {
  colors: {
    accent: "rgba(111, 120, 240, 1)",
    accentRGB: "111, 120, 240",
  },
});
export const CeruleanBlueTheme = createTheme("cerulean-blue-theme", {
  colors: {
    accent: "rgb(48 83 185)",
    accentRGB: "48, 83, 185",
  },
});
export const IrisTheme = createTheme("iris-theme", {
  colors: {
    accent: "rgb(109 51 204)",
    accentRGB: "109, 51, 204",
  },
});
export const SteelPinkTheme = createTheme("steel-pink-theme", {
  colors: {
    accent: "rgba(204, 51, 198, 1)",
    accentRGB: "204, 51, 198",
  },
});
