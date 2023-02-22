import React from "react";
import { Box } from "@components/base";
import { styled, keyframes, CSS } from "stitches.config";

const shimmer = keyframes({
  "0%": {
    backgroundPosition: "200% 0",
  },
  "100%": {
    backgroundPosition: "-200% 0",
  },
});

const Skeleton = ({
  width,
  height,
  br,
}: {
  width: CSS["width"];
  height: CSS["height"];
  br?: CSS["borderRadius"];
}) => {
  return (
    <BareSkeleton
      css={{
        width,
        height,
        borderRadius: br,
      }}
    />
  );
};

const BareSkeleton = styled("div", {
  backgroundImage: "linear-gradient(270deg,#111,#333,#333,#111)",
  backgroundSize: "400% 100%",
  animation: `${shimmer} 8s ease-in-out infinite`,
});

export default Skeleton;
