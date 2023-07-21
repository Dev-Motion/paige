import React from "react";
import { FallbackProps } from "react-error-boundary";
import Scaffold from "./Scaffold";
import { Card, Text, Box, Flex } from "@components/base";

function ErrorUI(props: FallbackProps) {
  return (
    <div>
      <Scaffold />
      <Box
        css={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(10px)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Card
          css={{
            bg: "rgba(0,0,0,0.6)",
            maxWidth: 500,
            pd: "$3",
            br: "$5",
            display: "flex",
            ai: "center",
            jc: "center",
            fd: "column",
            gap: "$3",
          }}
        >
          <Text as="h1" fs="2xl" fw="bold">
            Something Went Wrong
          </Text>

          <Text as="p" css={{ color: "red" }}>
            {props.error.message}
          </Text>

          <Text as="p" css={{ fontSize: "$sm", color: "red" }}>
            {props.error.stack}
          </Text>
          <Box
            as="button"
            onClick={props.resetErrorBoundary}
            css={{
              include: "buttonReset",
              pd: "$2 $3",
              br: "$2",
              bc: "transparent",
              bg: "rgba(0,0,0,0.5)",
              color: "white",
              cursor: "pointer",
              "&:hover": {
                bg: "rgba(0,0,0,0.7)",
              },
            }}
          >
            reset
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default ErrorUI;
