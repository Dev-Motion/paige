import { CSS } from "@stitches/react";

function createMixins<T extends string>(obj: Record<T, CSS>) {
  return obj;
}

const mixins = createMixins({
  accessibleShadow: {
    $$br: "50%",
    position: "relative",
    zIndex: 0,
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "var(---w,100%)",
      height: "100%",
      br: "$$br",
      pointerEvents: "none",
      filter: "blur(var(---blur,20px))",
      opacity: "var(---opacity,0.5)",
      zIndex: -1,
      bg: "$shadow",
      ml: "$$ml",
    },
  },
  buttonReset: {
    appearance: "none",
    border: "none",
    bg: "transparent",
    outline: "none",
    cursor: "pointer",
    p: 0,
    m: 0,
  },
});

export default mixins;
