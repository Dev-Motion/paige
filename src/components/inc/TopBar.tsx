import React from "react";
import { Flex, IconButton, Text } from "@components/base";
import { Hamburger } from "@components/icons";
import useStore from "@store";
import { accessibilityShadow } from "@components/base/utilityClass";
import { useSideBar } from "@context/SideBarContext";

const TopBar = () => {
  const { setOpen } = useSideBar();
  const sideBar = useStore((state) => state.sideBarPosition);
  const left = sideBar === "left";
  return (
    <Flex
      jc="between"
      ai="center"
      css={{
        height: "8vh",
        px: "$6",
        flexDirection: left ? "row" : "row-reverse",
      }}
    >
      <IconButton
        size="md"
        bg="bgLight"
        css={{ backdropFilter: "blur(10px)", border: "1px solid $bg" }}
        onClick={() => setOpen(true)}
        className={accessibilityShadow()}
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
      </IconButton>
      <Text fs="2xl">Today</Text>
    </Flex>
  );
};
export default TopBar;
