import React, { ComponentProps, useEffect } from "react";
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
        animate={{ pathLength: 1, transition: { duration: 0.5 } }}
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
let rerender = 0;
function CheckBox(props: Checkbox.CheckboxProps) {
  const checked = props.checked === "indeterminate" ? false : props.checked;
  const formerChecked = !checked;
  const [key, setKey] = React.useState("init");
  // helps to prevenet the animation from playing on first render
  useEffect(() => {
    if (formerChecked === false) {
      setKey("init-" + rerender);
    }
  }, [formerChecked]);
  rerender++;

  return (
    <CheckboxRoot {...props} active={checked}>
      <CheckboxIndicator active={checked} forceMount>
        <AnimatePresence mode="wait">
          <CheckIcon key={key} />
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
  "&:focus-visible": { boxShadow: "0 0 0 2px $colors$text inset" },
  "&[data-state='checked'] svg": {
    opacity: "1",
  },
  "&[data-state='unchecked'] svg": {
    opacity: 0,
  },
  "&:hover": {
    "& svg": { opacity: 1, color: "rgba($textRGB,0.7)" },
  },
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
  transition: "all 0.2s ease",

  variants: {
    active: {
      true: {
        color: "$bg",
      },
    },
  },
});
