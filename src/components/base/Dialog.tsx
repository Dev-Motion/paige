import React, { ComponentProps } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { styled, keyframes, CSS } from "stitches.config";
import { CancelIcon } from "@components/icons";
import { animation } from "@utils";

const { fadeIn } = animation;

const slideIn = keyframes({
  "0%": { transform: "translate(-50%,50%)" },
  "100%": { transform: "translate(-50%,-50%)" },
});
function Dialog(props: RadixDialog.DialogProps) {
  return <RadixDialog.Root {...props} />;
}

function DialogButton(props: { children: React.ReactNode; asChild?: boolean }) {
  return <RadixDialog.Trigger {...props} />;
}

const DialogOverlay = styled(RadixDialog.Overlay, {
  bg: "rgba(0,0,0,0.5)",
  position: "fixed",
  inset: 0,
  animation: `${fadeIn} .3s ease-in-out`,
});

const DialogContent = styled(RadixDialog.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  animation: `${fadeIn} .5s ease-in-out, ${slideIn} .5s ease-in-out`,
  animationFillMode: "forwards",
});

function OverlayContent({
  overlay = false,
  ...others
}: {
  overlay?: boolean;
} & ComponentProps<typeof DialogContent>) {
  return (
    <RadixDialog.Portal>
      {overlay && <DialogOverlay />}
      <DialogContent {...others} />
    </RadixDialog.Portal>
  );
}

const DialogClose = styled(RadixDialog.Close, {
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

function OverlayClose({ css }: { css?: CSS }) {
  return (
    <DialogClose aria-label="close" css={css}>
      <CancelIcon />
    </DialogClose>
  );
}

Dialog.Button = DialogButton;
Dialog.Content = OverlayContent;
Dialog.Close = OverlayClose;

export default Dialog;
