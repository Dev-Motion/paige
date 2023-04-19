import { styled } from "stitches.config";
import Box from "./Box";

const Card = styled(Box, {
  backdropFilter: "blur(40px)",
  br: "$4",
  bg: "rgba($bgRGB, 0.5)",
  color: "$text",
  minWidth: 420,
});

export default Card;
