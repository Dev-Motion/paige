import { styled } from "stitches.config";

const IconButton = styled("button", {
  include: "buttonReset",
  display: "flex",
  ai: "center",
  jc: "center",
  size: 50,
  br: "$round",
  transition: "scale 0.2s ease-in-out",
  "&:focus": {
    scale: 1.05,
    transformOrigin: "center center",
  },
  "&:active": {
    scale: 0.95,
    transformOrigin: "center center",
  },
  variants: {
    size: {
      xs: {
        size: "$5",
      },
      sm: {
        size: "$6",
      },
      md: {
        size: "$7",
      },
      lg: {
        size: "$8",
      },
    },
    bg: {
      transparent: {
        bg: "transparent",
      },
      text: {
        bg: "$text",
      },
      bg: {
        bg: "$bg",
      },
      textLight: {
        bg: "rgba($textRGB,0.5)",
      },
      bgLight: {
        bg: "rgba($bgRGB,0.4)",
      },
    },
    square: {
      true: {
        borderRadius: "$2",
      },
    },
  },
});
IconButton.displayName = "IconButton";

export default IconButton;
