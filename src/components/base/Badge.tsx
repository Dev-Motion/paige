import { animation } from "@utils";
import { styled } from "stitches.config";

const { ping } = animation;
const Badge = styled("div", {
  // Reset
  boxSizing: "border-box",
  color: "$bg",
  bg: "$text",
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    animation: "$$animation",
    zIndex: -1,
    bg: "$text",
    br: "$pill",
  },
  variants: {
    size: {
      sm: {
        px: "$1",
        borderRadius: "$pill",
        fontSize: "$sm",
      },
      md: {
        pd: "$2",
        borderRadius: "$pill",
      },
      lg: {
        pd: "$3",
        borderRadius: "$pill",
      },
    },
    ping: {
      true: { $$animation: `${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite` },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export default Badge;
