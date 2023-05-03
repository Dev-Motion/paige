import React from "react";
import useStore from "@store";
import { Box, Text } from "@components/base";
import { styled } from "stitches.config";

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
      }}
    >
      <Box
        css={{
          include: "accessibleShadow",
          $$blur: "60px",
          $$opacity: 0.8,
        }}
      >
        <Text ta="center" fs="lg" as="h3">
          {empty || active ? "What is your Goal for today?" : "Today"}
        </Text>
        {empty || active ? (
          <Box
            as="form"
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
        ) : (
          <Text
            fs="xl"
            ta="center"
            onDoubleClick={() => {
              setActive(true);
            }}
          >
            {value.text}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Mantra;
const Input = styled("input", {
  fontSize: "$xl",
  ta: "center",
  bg: "transparent",
  appearance: "none",
  py: "$1",
  border: "none",
  color: "$text",
  outline: "none",
  borderBottom: "2px solid $text",
});
