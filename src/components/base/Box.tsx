import { getVariants } from "@utils/getPropertyVariants";
import { styled } from "stitches.config";

const Box = styled("div", {
  // Reset
  boxSizing: "border-box",
  padding: 0,
  variants: {
    px: getVariants("space", { px: "$$" }),
    py: getVariants("space", { py: "$$" }),
  },
});
export default Box;
