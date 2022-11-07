import { Box, Flex, Grid, Text } from "@component/base";
import { Time, Search, Mantra, Remainder, SideBar } from "@component/inc";
import { styled } from "stitches.config";
import React, { useState } from "react";
import { Hamburger, Todo } from "@component/icons";
import Portal from "@utils/Portals";

const Main = () => {
  const [open, setOpen] = useState(false);
  return (
    <Flex fd="column" css={{ minHeight: "100vh" }}>
      <Portal root="side_bar_root">
        <SideBar open={open} onClose={() => setOpen(false)} />
      </Portal>
      <TopBar setOpen={() => setOpen(true)} />
      <Grid
        ai="center"
        as="main"
        css={{
          flex: 1,
          gridTemplateRows: "1fr 1fr",
          "&>*": {
            height: "100%",
          },
        }}
      >
        <Flex ai="center" jc="between" fd="column" css={{ pb: "$5" }}>
          <Time />
          <Search />
        </Flex>
        <Flex ai="center" fd="column" jc="end" gap={6}>
          <Mantra />
          <Remainder />
        </Flex>
      </Grid>
      <BottomBar />
    </Flex>
  );
};

const IconButton = styled("button", {
  appearance: "none",
  outline: "none",
  border: "none",
  display: "flex",
  ai: "center",
  jc: "center",
  size: 50,
  bg: "rgba(0, 0, 0, 0.2)",
  br: "$round",
});
const TopBar = ({ setOpen }: { setOpen: () => void }) => {
  return (
    <Flex jc="between" ai="center" css={{ height: "8vh", px: "$6" }}>
      <IconButton onClick={setOpen}>
        <Hamburger />
      </IconButton>
    </Flex>
  );
};

const BottomBar = () => {
  return (
    <Flex
      jc="between"
      ai="center"
      css={{
        height: "8vh",
        px: "$6",
        color: "$text",
        width: "100%",
        "& .fixed": {
          width: "10vw",
          minWidth: 200,
        },
      }}
    >
      <HoverToReveal
        heading="a sight of north atlantic world.”"
        subscript="Miyamoto Musashi"
        ai="start"
        className="fixed"
      />
      <HoverToReveal
        heading="“Think lightly of yourself and deeply of the world.”"
        subscript="Miyamoto Musashi"
      />
      <Flex ai="center" jc="end" gap={2} className="fixed">
        <Todo />
        <Text>Todo</Text>
      </Flex>
    </Flex>
  );
};

export default Main;

type flexProps = React.ComponentProps<typeof Flex>;
const HoverToReveal = ({
  heading,
  subscript,
  ...flexProps
}: { heading: string; subscript: string } & flexProps) => {
  return (
    <Flex
      fd="column"
      ai={"center"}
      gap={2}
      css={{
        minHeight: 50,
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          minHeight: 40,
          h3: {
            transform: "translateY(0px)",
          },
          p: {
            opacity: 1,
          },
        },
      }}
      {...flexProps}
    >
      <Text
        as="h3"
        fs="sm"
        css={{
          transform: "translateY(calc(100% + 8px))",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {heading}
      </Text>
      <Text
        as="p"
        fs="2xs"
        css={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
      >
        {subscript}
      </Text>
    </Flex>
  );
};
