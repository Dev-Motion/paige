import React, { ComponentProps } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { styled } from "stitches.config";
import { AnimatePresence, motion } from "framer-motion";

export const CheckIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 1 } }}
        exit={{ pathLength: 0, transition: { duration: 1 } }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

function CheckBox(props: Checkbox.CheckboxProps) {
  const checked = props.checked === "indeterminate" ? false : props.checked;
  return (
    <CheckboxRoot {...props} active={checked}>
      <CheckboxIndicator active={checked} forceMount>
        <AnimatePresence mode="wait">
          {props.checked && <CheckIcon />}
        </AnimatePresence>
      </CheckboxIndicator>
    </CheckboxRoot>
  );
}

export default CheckBox;

const CheckboxRoot = styled(Checkbox.Root, {
  all: "unset",
  backgroundColor: "transparent",
  size: 18,
  minWidth: 18,
  borderRadius: "$round",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 10px $colors$bg , 0 0 0 1px $colors$text inset",
  "&:hover": {
    backgroundColor: "rgba($textRGB,0.4)",
    "& svg": { color: "$bg" },
  },
  "&:focus": { boxShadow: "0 0 0 2px $colors$text inset" },
  variants: {
    active: {
      true: {
        backgroundColor: "$accent",
        boxShadow: "none",
      },
    },
  },
});

const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: "$text",
  width: "60%",
  variants: {
    active: {
      true: {
        color: "$bg",
      },
    },
  },
});
