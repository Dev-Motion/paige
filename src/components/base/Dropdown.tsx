import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Card } from ".";
import { CSS, styled } from "stitches.config";
import { animation } from "@utils";

const {
  slideDownAndFade,
  slideUpAndFade,
  slideRightAndFade,
  slideLeftAndFade,
} = animation;
export default function Dropdown({
  ...props
}: DropdownMenuPrimitive.DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

function DropdownButton({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Trigger asChild={asChild}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
}

function DropdownMenu({
  css,
  children,
  ...others
}: DropdownMenuPrimitive.DropdownMenuContentProps & {
  css?: CSS;
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <AnimatedDropdownContent sideOffset={5} collisionPadding={10} {...others}>
        <Card css={{ pd: "$1", ...css }}>{children}</Card>
        <StyledArrow />
      </AnimatedDropdownContent>
    </DropdownMenuPrimitive.Portal>
  );
}

const AnimatedDropdownContent = styled(DropdownMenuPrimitive.Content, {
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
});

const DropdownMenuItem = styled(DropdownMenuPrimitive.DropdownMenuItem, {
  include: "buttonReset",
  color: "$text",
  fontSize: "$sm",
  fontWeight: "$medium",
  br: "$2",
  py: 2,
  px: 5,
  width: "100%",
  textAlign: "left",
  "&:hover": {
    bg: "rgba($textRGB, 0.1)",
  },
});

Dropdown.Button = DropdownButton;

Dropdown.Menu = DropdownMenu;

Dropdown.MenuItem = DropdownMenuItem;
const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "$bg",
});
