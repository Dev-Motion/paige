import { styled } from "stitches.config";
import Box from "./Box";

const Card = styled(Box, {
  backdropFilter: "blur(50px)",
  br: "$4",
  bg: "rgba($bgRGB, 0.8)",
  color: "$text",
  variants: {
    nested: {
      true: {
        bg: "rgba($bgRGB, .95)",
      },
    },
  },
});

Card.displayName = "Card";

export default Card;
