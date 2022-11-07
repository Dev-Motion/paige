import { Box, Text } from "@component/base";
import React, { useCallback } from "react";
import { styled, css } from "stitches.config";

const srOnly = css({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
});

const Input = styled("input", {
  fontSize: "$xl",
  ta: "center",
  bg: "transparent",
  appearance: "none",
  py: "$1",
  border: "none",
  color: "$text",
  outline: "none",
  "&:focus": {
    borderBottom: "2px solid $text",
  },
});
const Mantra = () => {
  const [value, setValue] = React.useState("Learning how to teach");
  const [active, setActive] = React.useState(false);

  return (
    <Box css={{ color: "white", fontWeight: "$4" }}>
      <Text ta="center" fs="lg" as="h3">
        Today
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
            onBlur={() => setActive(false)}
          />
        </Box>
      ) : (
        <Text
          fs="xl"
          ta="center"
          onDoubleClick={() => {
            console.log("double click");
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

