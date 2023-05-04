import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { styled, keyframes } from "stitches.config";
import { CancelIcon } from "@components/icons";

export default function Popover({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <RadixPopover.Root
      open={open ? open : isOpen}
      onOpenChange={onOpenChange ? onOpenChange : setIsOpen}
    >
      {children}
    </RadixPopover.Root>
  );
}

function PopoverButton({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return (
    <RadixPopover.Trigger asChild={asChild}>{children}</RadixPopover.Trigger>
  );
}

function PopoverContent({
  children,
  asChild,
  side,
}: {
  children: React.ReactNode;
  asChild?: boolean;
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <StyledPopoverContent
      asChild={asChild}
      collisionPadding={10}
      sideOffset={5}
      side={side}
    >
      {children}
    </StyledPopoverContent>
  );
}

function PopoverClose() {
  return (
    <StyledPopoverClose aria-label="close">
      <CancelIcon />
    </StyledPopoverClose>
  );
}

const PopoverArrow = styled(RadixPopover.Arrow, {
  fill: "$bg",
  // backdropFilter: "blur(50px)",
});

Popover.Button = PopoverButton;

Popover.Content = PopoverContent;

Popover.Close = PopoverClose;

Popover.Arrow = PopoverArrow;

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-10px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(10px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledPopoverContent = styled(RadixPopover.Content, {
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

const StyledPopoverClose = styled(RadixPopover.Close, {
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
