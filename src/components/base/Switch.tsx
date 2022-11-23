import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { styled } from "stitches.config";

const SwitchRoot = styled(RadixSwitch.Root, {
  $$border: "$colors$text",
  all: "unset",
  width: 32,
  height: 18,
  backgroundColor: "$background",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: "0 0 0 1px $$border",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  "&:focus": { boxShadow: "0 0 0 1px #4CBF3F" },
  "&[data-state='checked']": {
    backgroundColor: "#4CBF3F",
    boxShadow: "0 0 0 1px #4CBF3F",
  },
});

const SwitchThumb = styled(RadixSwitch.Thumb, {
  display: "block",
  size: 15,
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: "0 2px 2px $background",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  "&[data-state='checked']": { transform: "translateX(15px)" },
});

export default function Switch() {
  return (
    <SwitchRoot>
      <SwitchThumb />
    </SwitchRoot>
  );
}