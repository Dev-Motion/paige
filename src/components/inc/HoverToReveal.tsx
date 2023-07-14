import React from "react";
import { Box, Text } from "@components/base";
import { CSS, styled } from "stitches.config";

const Header = styled(Text, {
  display: "block",
});
const FooterText = styled(Text, {
  display: "inline-block",
});

export default function HoverReveal({
  children,
  css,
}: {
  children: React.ReactNode;
  css?: CSS;
}) {
  return (
    <Box
      css={{
        $$lh: "16px",
        $$gap: "4px",
        $$move: "calc($$lh + $$gap)",
        lineHeight: "$$lh",
        "&>*+*": {
          mt: "$$gap",
        },
        [`${Header}`]: {
          transform: "translateY(calc($$move / 2))",
          transformOrigin: "center",
          transition: "all 500ms ease-in-out",
        },
        [`& ${FooterText},${Box}`]: {
          opacity: 0,
          transform: "translateY(calc(-1 * calc($$move / 2)))",
          transition: "all 500ms ease-in-out",
        },
        "&:is(:hover,:focus-within)": {
          [`${Header}`]: { transform: "translateY(0)", opacity: 1 },
          [`& ${FooterText},${Box}`]: {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        ...css,
      }}
    >
      {children}
    </Box>
  );
}

HoverReveal.displayName = "Hover to Reveal";
HoverReveal.Header = Header;
HoverReveal.FooterText = FooterText;
HoverReveal.Footer = Box;
