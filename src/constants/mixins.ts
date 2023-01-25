const mixins = {
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
} as const;

export default mixins;
