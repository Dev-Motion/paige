import { styled } from "stitches.config";
import { Box } from "@components/base";

const Card = styled(Box, {
  backdropFilter: "blur(40px)",
  br: "$4",
  bg: "rgba($bgRGB, 0.2)",
  color: "$text",
  minWidth: 420,
  minHeight: 200,
});

export default Card;
