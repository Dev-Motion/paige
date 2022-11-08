import { Box, Flex, Grid, Text } from "@components/base";
import { motion } from "framer-motion";
import { useState } from "react";
import { styled } from "stitches.config";

const MAXCHARS = 10;
const ReadMore = styled("button", {
  appearance: "none",
  background: "none",
  border: "none",
  outline: "none",
  color: "$primary",
  cursor: "pointer",
  ml: "$2",
  "&:hover": {
    textDecoration: "underline",
  },
});
type textProps =
  | {
      link?: false;
      heading: string;
      subscript: string;
    }
  | {
      link: true;
      heading: { text: string; link: string };
      subscript: { text: string; link: string };
    };
type gridProps = React.ComponentProps<typeof Grid>;
const HoverToReveal = ({
  heading,
  subscript,
  link = false,
  ...gridProps
}: textProps & gridProps) => {
  const [readMore, setReadMore] = useState(false);
  const headingText = typeof heading === "string" ? heading : heading.text;
  const subscriptText =
    typeof subscript === "string" ? subscript : subscript.text;
  const splitHeading = headingText.split(" ");
  const toggleReadMore = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setReadMore((r) => !r);
  };
  return (
    <Grid
      ai={"center"}
      css={{
        height: 60,
        gridTemplateRows: "1fr 1fr",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        "&>*": {
          height: "100%",
          transition: "all 0.3s ease-in-out",
        },
        "&:hover": {
          ".heading, .footnote": {
            transform: "translateY(0)",
          },
          ".footnote": {
            pointerEvents: "all",
            opacity: 1,
          },
        },
      }}
      {...gridProps}
    >
      {splitHeading.length > MAXCHARS ? (
        <Box
          className="heading"
          css={{
            transform: "translateY(50%)",
            position: "relative",
          }}
        >
          <Box
            {...(readMore && {
              css: { position: "absolute", bottom: 0, left: 0, right: 0 },
            })}
          >
            <Text
              as={motion.p}
              fs="sm"
              layout="size"
              transition={{ duration: 1 }}
              {...(link && {
                as: motion.a,
                href: heading.link,
                target: "_blank",
                layout: "size",
                transition: { duration: 1 },
              })}
            >
              {readMore
                ? headingText
                : splitHeading.slice(0, MAXCHARS).join(" ")}
            </Text>

            <ReadMore onClick={toggleReadMore}>
              {readMore ? "read less" : "read more"}
            </ReadMore>
          </Box>
        </Box>
      ) : (
        <Text
          as="p"
          fs="sm"
          className="heading"
          css={{
            display: "block",
            transform: "translateY(50%)",
            position: "relat",
          }}
          {...(link && { as: "a", href: heading.link, target: "_blank" })}
        >
          {headingText}
        </Text>
      )}
      <Text
        as="span"
        fs="2xs"
        className="footnote"
        css={{
          transform: "translateY(-100%)",
          opacity: 0,
          pointerEvents: "none",
          width:'fit-content'
        }}
        {...(link && { as: "a", href: subscript.link, target: "_blank" })}
      >
        {subscriptText}
      </Text>
    </Grid>
  );
};

export default HoverToReveal;
