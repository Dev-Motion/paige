import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { styled } from "stitches.config";

const SwitchRoot = styled(RadixSwitch.Root, {
  $$border: "$colors$text",
  all: "unset",
  width: 26,
  height: 14,
  backgroundColor: "$background",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: "0 0 0 1px $$border",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  "&:focus": { boxShadow: "0 0 0 1px $colors$accent" },
  "&[data-state='checked']": {
    backgroundColor: "$accent",
    boxShadow: "0 0 0 1px $colors$accent",
  },
});

const SwitchThumb = styled(RadixSwitch.Thumb, {
  display: "block",
  size: 9,
  backgroundColor: "$text",
  borderRadius: "9999px",
  boxShadow: "0 2px 2px $background",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  "&[data-state='checked']": { transform: "translateX(15px)" },
});

export default function Switch(props: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <SwitchRoot {...props}>
      <SwitchThumb />
    </SwitchRoot>
  );
}
