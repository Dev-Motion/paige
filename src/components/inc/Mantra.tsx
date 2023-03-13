import React from "react";
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
  const [value, setValue] = React.useState("");
  const [active, setActive] = React.useState(true);

  const empty = value.trim() === "";
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
          {value}
        </Text>
      )}
    </Box>
  );
};

export default Mantra;
