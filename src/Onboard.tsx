import { Box, Flex, Text } from "@components/base";
import React, { useId } from "react";
import { Scaffold } from "@components/inc";
import { m } from "framer-motion";
import useStore from "@store";

const Onboard = () => {
  const [value, setValue] = React.useState("");
  const id = useId();
  const setName = useStore((state) => state.setName);
  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setName(value);
  }
  return (
    <Flex
      fd="column"
      ai="center"
      css={{
        height: "100vh",
      }}
    >
      <Box
        css={{
          size: 100,
          include: "accessibleShadow",
          br: "$round",
          mt: "$4",
          $$opacity: 0.4,
        }}
      >
        <Box
          as="img"
          src={"/logo/128x128.png"}
          css={{
            size: 100,
          }}
        />
      </Box>

      <Flex
        fd="column"
        jc="center"
        ai="center"
        css={{
          flex: 1,
        }}
      >
        <Flex
          fd="column"
          ai="center"
          as="form"
          onSubmit={handelSubmit}
          css={{
            include: "accessibleShadow",
            $$blur: "60px",
            $$opacity: 0.8,
          }}
        >
          <Text as="label" htmlFor={id} fs="xl" color="text">
            Hello, what’s your name?
          </Text>
          <Box
            as="input"
            id={id}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            css={{
              fontSize: "$xl",
              ta: "center",
              bg: "transparent",
              appearance: "none",
              py: "$1",
              border: "none",
              color: "$text",
              outline: "none",
              borderBottom: "2px solid $text",
            }}
          />
          <input type="submit" hidden />
        </Flex>
      </Flex>
      <Scaffold />
    </Flex>
  );
};

export default Onboard;
