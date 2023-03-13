import React from "react";
import * as StitchesPopover from "@radix-ui/react-popover";
import { styled, keyframes } from "stitches.config";
import { CancelIcon } from "@components/icons";

export default function Popover({
  children: trigger,
  side = "bottom",
  content,
  openChange,
  showClose = true,
  open,
}: {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  showClose?: boolean;
  content: React.ReactNode;
  open?: boolean;
  openChange?: (open: boolean) => void;
}) {
  // const  = props;
  return (
    <StitchesPopover.Root open={open} onOpenChange={openChange}>
      <StitchesPopover.Trigger asChild>{trigger}</StitchesPopover.Trigger>
      <StitchesPopover.Portal>
        <PopoverContent side={side} collisionPadding={10} sideOffset={5}>
          {content}
          <PopoverClose
            css={{ display: showClose ? "inline-flex" : "none" }}
            aria-label="Close"
          >
            <CancelIcon />
          </PopoverClose>
          <PopoverArrow />
        </PopoverContent>
      </StitchesPopover.Portal>
    </StitchesPopover.Root>
  );
}

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const PopoverContent = styled(StitchesPopover.Content, {
  $$shadow: "$colors$textRGB",
  borderRadius: 4,
  px: 10,
  pt: 10,
  pr: 15,
  pb: 10,
  color: "$text",
  backgroundColor: "rgba($bgRGB,0.5)",
  backdropFilter: "blur(50px)",
  boxShadow:
    "rgba($$shadow,0.2) 0px 10px 38px -10px, rgba($$shadow,0.5) 0px 10px 20px -15px",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  "&[data-state='open']": {
    "&[data-side='top']": { animationName: slideDownAndFade },
    "&[data-side='right']": { animationName: slideLeftAndFade },
    "&[data-side='bottom']": { animationName: slideUpAndFade },
    "&[data-side='left']": { animationName: slideRightAndFade },
  },
  "&:focus": {
    boxShadow:
      "rgba($$shadow,0.6) 0px 10px 38px -10px, rgba($$shadow,0.5) 0px 10px 20px -15px, 0 0 0 2px rgba($$shadow,0.2)",
  },
});

const PopoverArrow = styled(StitchesPopover.Arrow, {
  fill: "rgba($bgRGB,0.5)",
  // backdropFilter: "blur(50px)",
});

const PopoverClose = styled(StitchesPopover.Close, {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 20,
  width: 20,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$text",
  position: "absolute",
  top: 0,
  right: 0,

  "&:hover": { backgroundColor: "rgba($textRGB,0.2)" },
  "&:focus": { boxShadow: "0 0 0 2px rgba($textRGB,0.4)" },
});
