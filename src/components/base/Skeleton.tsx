import React from "react";
import { styled, CSS } from "stitches.config";
import { animation } from "@utils";

const { shimmer } = animation;

const Skeleton = ({
  width,
  height,
  aspectRatio,
  br,
}: {
  width?: CSS["width"];
  height?: CSS["height"];
  aspectRatio?: CSS["aspectRatio"];
  br?: CSS["borderRadius"];
}) => {
  return (
    <BareSkeleton
      css={{
        width,
        height,
        aspectRatio,
        borderRadius: br,
      }}
    />
  );
};

const BareSkeleton = styled("div", {
  backgroundImage:
    "linear-gradient(270deg,rgba($textRGB,0.5),rgba($bgRGB,0.5),rgba($bgRGB,0.5),rgba($textRGB,0.5))",
  backgroundSize: "400% 100%",
  animation: `${shimmer} 8s ease-in-out infinite`,
});

Skeleton.displayName = "Skeleton";
export default Skeleton;
