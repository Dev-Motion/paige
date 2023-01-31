import React from "react";
import { Flex, IconButton, Text } from "@components/base";
import { Hamburger } from "@components/icons";
import useStore from "@store";

const TopBar = () => {
  const [sideBar, setOpen] = useStore((state) => [
    state.sideBarPosition,
    state.setSideBarOpen,
  ]);
  const left = sideBar === "left";
  return (
    <Flex
      jc="between"
      ai="center"
      css={{
        height: 60,
        px: "$6",
        flexDirection: left ? "row" : "row-reverse",
      }}
    >
      <IconButton
        size="md"
        bg="bgLight"
        css={{
          backdropFilter: "blur(10px)",
          border: "1px solid $bg",
          include: "accessibleShadow",
        }}
        onClick={() => setOpen(true)}
      >
        <Hamburger
          css={
            !left
              ? {
                transform: "rotate(-180deg)",
                path: { stroke: "$text !important" },
              }
              : { path: { stroke: "$text !important" } }
          }
        />
        <Text css={{ include: "screenReaderOnly" }}>Open side bar</Text>
      </IconButton>
      <Text fs="2xl">Today</Text>
    </Flex>
  );
};
export default TopBar;
