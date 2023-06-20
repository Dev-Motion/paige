import { styled } from "stitches.config";

export const Button = styled("button", {
  include: "buttonReset",
  "&:active": {
    transform: "scale(0.95)",
  },
  variants: {
    size: {
      xs: {
        fontSize: "$xs",
        padding: "$1 $2",
      },
      sm: {
        fontSize: "$sm",
        padding: "$1 $2",
      },
      md: {
        fontSize: "$md",
        padding: "$2 $3",
      },
      lg: {
        fontSize: "$lg",
        padding: "$3 $4",
      },
    },
    color: {
      accent: {
        backgroundColor: "rgba($accentRGB, 0.8)",
        color: "$bg",
        "&:hover": {
          backgroundColor: "$accent",
        },
      },
      bland: {
        backgroundColor: "rgba($textRGB, 0.8)",
        color: "$bg",
        "&:hover": {
          backgroundColor: "$text",
        },
      },
    },
    outline: {
      true: {
        // backgroundColor: "$transparent",
        // color: "$text",
      },
    },
    br: {
      sm: {
        borderRadius: "$2",
      },
      md: {
        borderRadius: "$3",
      },
      pill: {
        borderRadius: "$pill",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "bland",
    br: "sm",
  },
  compoundVariants: [
    {
      color: "accent",
      outline: "true",
      css: {
        backgroundColor: "transparent",
        color: "$accent",
        border: "1px solid $colors$accent",
        "&:hover": {
          backgroundColor: "$accent",
          color: "$bg",
        },
      },
    },
    {
      color: "bland",
      outline: "true",
      css: {
        backgroundColor: "transparent",
        color: "$text",
        border: "1px solid $colors$text",
        "&:hover": {
          backgroundColor: "$text",
          color: "$bg",
        },
      },
    },
  ],
});
