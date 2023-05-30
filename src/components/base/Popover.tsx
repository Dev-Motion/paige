import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styled } from "stitches.config";
import { CancelIcon } from "@components/icons";
import { animation } from "@utils";

const {
  slideDownAndFade,
  slideUpAndFade,
  slideRightAndFade,
  slideLeftAndFade,
} = animation;

export default function Popover(props: PopoverPrimitive.PopoverProps) {
  return <PopoverPrimitive.Root {...props} />;
}

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverPrimitive.PopoverContentProps
>(function PopoverC({ children, ...props }, forwardedRef) {
  return (
    <PopoverPrimitive.Portal>
      <StyledPopoverContent
        sideOffset={5}
        collisionPadding={10}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <PopoverPrimitive.Arrow />
      </StyledPopoverContent>
    </PopoverPrimitive.Portal>
  );
});

function PopoverClose() {
  return (
    <StyledPopoverClose aria-label="close">
      <CancelIcon />
    </StyledPopoverClose>
  );
}

const PopoverArrow = styled(PopoverPrimitive.Arrow, {
  fill: "$bg",
  // backdropFilter: "blur(50px)",
});

Popover.Button = PopoverTrigger;

Popover.Content = PopoverContent;

Popover.Close = PopoverClose;

Popover.Arrow = PopoverArrow;

const StyledPopoverContent = styled(PopoverPrimitive.Content, {
  animationDuration: "1000ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  "&[data-state='open']": {
    "&[data-side='top']": { animationName: slideDownAndFade },
    "&[data-side='right']": { animationName: slideLeftAndFade },
    "&[data-side='bottom']": { animationName: slideUpAndFade },
    "&[data-side='left']": { animationName: slideRightAndFade },
  },
  "&[data-state='close']": {
    "&[data-side='top']": { animationName: slideUpAndFade },
    "&[data-side='right']": { animationName: slideRightAndFade },
    "&[data-side='bottom']": { animationName: slideDownAndFade },
    "&[data-side='left']": { animationName: slideLeftAndFade },
  },
  "&:focus": {
    boxShadow:
      "rgba($$shadow,0.6) 0px 10px 38px -10px, rgba($$shadow,0.5) 0px 10px 20px -15px, 0 0 0 2px rgba($$shadow,0.2)",
  },
});

const StyledPopoverClose = styled(PopoverPrimitive.Close, {
  $$size: 18,
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  size: 18,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$text",
  position: "absolute",
  top: 0,
  right: 0,
  transform: "translate(50%, -50%)",
  bg: "rgba($bgRGB,0.5)",
  backdropFilter: "blur(50px)",
  "& svg": {
    size: "70%",
  },
  "&:hover": { backgroundColor: "rgba($bgRGB,0.3)" },
  "&:focus": { boxShadow: "0 0 0 2px rgba($textRGB,0.4)" },
});
