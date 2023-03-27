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
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        px: "$6",
        flexDirection: left ? "row" : "row-reverse",
      }}
    >
      <IconButton
        size="sm"
        bg="bgLight"
        css={{
          backdropFilter: "blur(10px)",
          border: "1px solid $text",
          include: "accessibleShadow",
          "& svg": {
            size: "60%",
          },
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
      <Flex />
    </Flex>
  );
};
export default TopBar;
