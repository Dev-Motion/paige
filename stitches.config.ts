import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
export type { VariantProps } from "@stitches/react";

export const {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
  reset,
} = createStitches({
  theme: {
    colors: {
      text: "#FFFFFF",
      textRGB: "255, 255, 255",
      bg: "#000000",
      bgRGB: "0, 0, 0",
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
      "2xs": "9.26px",
      xs: "11.11px",
      sm: "13.33px",
      md: "16px",
      lg: "19.2px",
      xl: "23.04px",
      "2xl": " 27.65px",
      "3xl": " 33.2px",
      "4xl": " 39.81px",
      "5xl": " 47.78px",
      "6xl": " 118.88px",
    },
    radii: {
      1: "4px",
      2: "6px",
      3: "8px",
      4: "12px",
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
    ta: (value: Stitches.PropertyValue<"textAlign">) => ({ textAlign: value }),

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
    as: (value: Stitches.PropertyValue<"alignSelf">) => ({ alignSelf: value }),
    fg: (value: Stitches.PropertyValue<"flexGrow">) => ({ flexGrow: value }),
    fs: (value: Stitches.PropertyValue<"flexShrink">) => ({
      flexShrink: value,
    }),
    fb: (value: Stitches.PropertyValue<"flexBasis">) => ({ flexBasis: value }),
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

    bs: (value: Stitches.PropertyValue<"boxShadow">) => ({ boxShadow: value }),

    lh: (value: Stitches.PropertyValue<"lineHeight">) => ({
      lineHeight: value,
    }),

    ox: (value: Stitches.PropertyValue<"overflowX">) => ({ overflowX: value }),
    oy: (value: Stitches.PropertyValue<"overflowY">) => ({ overflowY: value }),

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
  "@font-face": [
    {
      fontFamily: "Inter",
      src: "local('./public/fonts/Inter-VariableFont.ttf')",
    },
  ],
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
    bg: "#FFFFFF",
    bgRGB: "255,255,255",
    text: "#000000",
    textRGB: "0,0,0",
  },
});
export const PurpleTheme = createTheme("purple-theme", {
  colors: {
    bg: "#01AB9D",
    bgRGB: "1, 171, 157",
    text: "#FFFFFF",
    textRGB: "255,255,255",
  },
});
export const GoldTheme = createTheme("gold-theme", {
  colors: {
    bg: "#F7A935",
    bgRGB: "247, 169, 53",
    text: "#FFFFFF",
    textRGB: "255,255,255",
  },
});
export const BrownTheme = createTheme("brown-theme", {
  colors: {
    bg: "#825e4a",
    bgRGB: "130, 94, 74",
    text: "#FFFFFF",
    textRGB: "255,255,255",
  },
});
export const CaramelTheme = createTheme("caramel-theme", {
  colors: {
    bg: "#FFD19B",
    bgRGB: "255, 209, 155",
    text: "#FFFFFF",
    textRGB: "255,255,255",
  },
});
