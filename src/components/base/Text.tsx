import { styled } from "stitches.config";
import { generatePropertyVariants } from "@utils/getPropertyVariants";

const Text = styled("p", {
  variants: {
    fs: generatePropertyVariants("fontSizes", {
      fontSize: "$--fontSizes--",
    }),
    color: generatePropertyVariants("colors", {
      color: "$--colors--",
    }),
    ta: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
    },
    fw: {
      light: {
        fontWeight: "$1",
      },
      normal: {
        fontWeight: "$2",
      },
      medium: {
        fontWeight: "$3",
      },
      semibold: {
        fontWeight: "$4",
      },
      bold: {
        fontWeight: "$5",
      },
    },
    srOnly: {
      true: {
        include: "screenReaderOnly",
      },
    },
  },
  defaultVariants: {
    fs: "md",
    fw: "normal",
    ta: "left",
  },
});

Text.displayName = "Text";
export default Text;
