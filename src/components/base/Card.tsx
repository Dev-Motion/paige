import { styled } from "stitches.config";
import Box from "./Box";

const Card = styled(Box, {
  backdropFilter: "blur(50px)",
  br: "$4",
  bg: "rgba($bgRGB, 0.9)",
  color: "$text",
});

Card.displayName = "Card";

export default Card;
