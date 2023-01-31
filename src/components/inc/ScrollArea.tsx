import { Box } from "@components/base";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import React from "react";
import { CSS, styled } from "stitches.config";

const SCROLLBAR_SIZE = 7;

const ScrollAreaScrollbar = styled(RadixScrollArea.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: 2,
  background: "rgba($bgRGB,0.25)",
  transition: "background 160ms ease-out",
  "&:hover": { background: "rgba($bgRGB,0.4)" },
  "&[data-orientation='vertical']": { width: SCROLLBAR_SIZE },
  "&[data-orientation='horizontal']": {
    flexDirection: "column",
    height: SCROLLBAR_SIZE,
  },
});
const ScrollAreaThumb = styled(RadixScrollArea.Thumb, {
  flex: 1,
  background: "$text",
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: 20,
    minHeight: 20,
  },
});
const ScrollAreaViewport = styled(RadixScrollArea.Viewport, {
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  pr: SCROLLBAR_SIZE,
});
const ScrollAreaCorner = styled(RadixScrollArea.Corner, {
  background: "black",
});
const ScrollAreaRoot = styled(RadixScrollArea.Root, {});
const ScrollArea = ({
  children,
  css,
  orientation = "vertical",
  asChild,
}: {
  children: React.ReactNode;
  css?: CSS;
  orientation?: "vertical" | "horizontal" | "both";
  asChild?: boolean;
}) => {
  const vertical = ["vertical", "both"].includes(orientation);
  const horizontal = ["horizontal", "both"].includes(orientation);
  return (
    <ScrollAreaRoot css={css}>
      <ScrollAreaViewport asChild={asChild}>{children}</ScrollAreaViewport>
      {vertical ? (
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      ) : null}
      {horizontal ? (
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      ) : null}
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
};

export default ScrollArea;
