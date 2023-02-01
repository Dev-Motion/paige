import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { styled } from "stitches.config";
import { CheckIcon } from "@components/icons";

function CheckBox(props: Checkbox.CheckboxProps) {
  return (
    <CheckboxRoot {...props}>
      <CheckboxIndicator>
        <CheckIcon />
      </CheckboxIndicator>
    </CheckboxRoot>
  );
}

export default CheckBox;

const CheckboxRoot = styled(Checkbox.Root, {
  all: "unset",
  backgroundColor: "transparent",
  size: 15,
  borderRadius: "$round",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 10px $colors$bg , 0 0 0 1px $colors$text",
  "&:hover": {
    backgroundColor: "rgba($textRGB,0.4)",
    "& svg": { color: "$bg" },
  },
  "&:focus": { boxShadow: "0 0 0 2px $colors$text" },
});

const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: "$text",
  "& svg": {
    size: 14,
  },
});
