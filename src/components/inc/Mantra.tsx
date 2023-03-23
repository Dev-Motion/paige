import React from "react";
import useStore from "@store";
import { Box, Text } from "@components/base";
import { styled } from "stitches.config";

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
const Mantra = () => {
  const [value, setValue] = useStore((state) => [state.goal, state.setGoal]);
  const empty = value.text.trim() === "";
  const [active, setActive] = React.useState(empty);

  console.log("empty: ", empty);
  return (
    <Box css={{ color: "$text", fontWeight: "$4" }}>
      <Text ta="center" fs="lg" as="h3">
        {empty || active ? "What is your Goal for today?" : "Today"}
      </Text>
      {active ? (
        <Box
          as="form"
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              setActive(false);
            }
          }}
        >
          <Input
            ref={(el) => el?.focus()}
            value={value.text}
            onChange={(e) => setValue({ text: e.target.value, for: value.for })}
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
  );
};

export default Mantra;
