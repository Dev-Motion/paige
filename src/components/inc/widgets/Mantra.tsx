import React from "react";
import useStore from "@store";
import { Box, Text, Flex } from "@components/base";
import { styled } from "stitches.config";
import { HoverReveal } from "@components/inc";
import { TodoIcon } from "@components/icons";
import { withTour } from "@components/base/Tour";

const Mantra = () => {
  const [value, setValue, showTodayGoal] = useStore((state) => [
    state.goal,
    state.setGoal,
    state.showTodayGoal,
  ]);

  const empty = value.text.trim() === "";
  const [active, setActive] = React.useState(empty);

  if (!showTodayGoal) return null;
  return (
    <Box
      css={{
        color: "$text",
        fontWeight: "$4",
        include: "accessibleShadow",
        $$blur: "60px",
        $$opacity: 0.8,
      }}
    >
      {empty || active ? (
        <HoverReveal css={{ height: 60, overflow: "hidden", $$lh: "24px" }}>
          <HoverReveal.Header as="div">
            <Flex ai="center" jc="center" gap="1" css={{}}>
              <TodoIcon />
              <Text ta="center" fs="lg" as="h3">
                What is your target for today?
              </Text>
            </Flex>
          </HoverReveal.Header>
          <HoverReveal.Footer as="div">
            <Box
              onKeyDown={(e) => {
                if (e.key === "Escape" || e.key === "Enter") {
                  setActive(false);
                }
              }}
            >
              <Input
                autoFocus
                value={value.text}
                onChange={(e) =>
                  setValue({ text: e.target.value, for: value.for })
                }
                onBlur={() => setActive(empty)}
              />
            </Box>
          </HoverReveal.Footer>
        </HoverReveal>
      ) : (
        <Text
          fs="xl"
          ta="center"
          onDoubleClick={() => {
            setActive(true);
          }}
          css={{
            maxWidth: 540,
            display: "-webkit-box",
            "-webkit-line-clamp": 2,
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
          }}
        >
          {value.text}
        </Text>
      )}
    </Box>
  );
};

export default withTour(Mantra, {
  name: "mantra",
  title: "Mantra",
  description:
    "This is your mantra. It's a reminder of what you want to achieve today. Hover to input a mantra and Double click to edit.",
});
const Input = styled("input", {
  all: "unset",
  fontSize: "$lg",
  ta: "center",
  bg: "transparent",
  appearance: "none",
  pb: "$1",
  border: "none",
  color: "$text",
  outline: "none",
  borderBottom: "2px solid $text",
});
