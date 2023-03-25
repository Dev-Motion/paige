import { styled } from "stitches.config";

const IconButton = styled("button", {
  appearance: "none",
  outline: "none",
  border: "none",
  display: "flex",
  ai: "center",
  jc: "center",
  size: 50,
  br: "$round",
  transition: "transform 0.2s ease-in-out",
  "&:active": {
    scale: 0.95,
    transformOrigin: "center center",
  },
  variants: {
    size: {
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
  },
});
export default IconButton;
