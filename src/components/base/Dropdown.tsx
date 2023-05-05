import * as React from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { Card } from ".";
import { CSS, styled } from "stitches.config";

export default function Dropdown({
  ...props
}: RadixDropdownMenu.DropdownMenuProps) {
  return <RadixDropdownMenu.Root {...props} />;
}

function DropdownButton({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild: boolean;
}) {
  return (
    <RadixDropdownMenu.Trigger asChild={asChild}>
      {children}
    </RadixDropdownMenu.Trigger>
  );
}

function DropdownMenu({
  children,
  css,
}: {
  children: React.ReactNode;
  css?: CSS;
}) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content>
        <Card css={{ pd: "$1", ...css }}>{children}</Card>
        <StyledArrow />
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

function DropdownMenuItem({ children }: { children: React.ReactNode }) {
  return <RadixDropdownMenu.Item>{children}</RadixDropdownMenu.Item>;
}

Dropdown.Button = DropdownButton;

Dropdown.Menu = DropdownMenu;

Dropdown.MenuItem = DropdownMenuItem;
const StyledArrow = styled(RadixDropdownMenu.Arrow, {
  fill: "$bg",
});
