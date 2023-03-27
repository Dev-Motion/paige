import React from "react";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { css, keyframes } from "stitches.config";

const reveal = keyframes({
  "0%": {
    transform: "translateY(20px)",
    opacity: 0,
  },
  "100%": {
    transform: "translateY(0)",
    opacity: 1,
  },
});

const hide = keyframes({
  "0%": {
    transform: "translateY(0)",
    opacity: 1,
  },
  "100%": {
    transform: "translateY(20px)",
    opacity: 0,
  },
});

const HoverCard = ({
  children,
  trigger,
  asChild = false,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
  asChild?: boolean;
}) => {
  return (
    <RadixHoverCard.Root>
      <RadixHoverCard.Trigger asChild={asChild}>
        {trigger}
      </RadixHoverCard.Trigger>
      <RadixHoverCard.Content
        collisionPadding={10}
        className={css({
          br: 6,
          padding: 20,
          width: 300,
          backgroundColor: "rgba($bgRGB,0.5)",
          backdropFilter: "blur(50px)",
          boxShadow:
            "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
          animationDuration: "800ms",
          animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity",
          "&[data-state='open']": {
            animationName: `${reveal}`,
          },
          "&[data-state='closed']": {
            animationName: `${hide}`,
          },
        })()}
        sideOffset={5}
      >
        {children}
      </RadixHoverCard.Content>
    </RadixHoverCard.Root>
  );
};

export default HoverCard;
