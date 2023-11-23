import React from "react";
import { Flex, IconButton, Text } from "@components/base";
import { Hamburger } from "@components/icons";
import useStore from "@store";
import WeatherWidget from "./widgets/Weather";
import * as Tour from "@components/base/Tour";

const TopBar = () => {
  const sideBar = useStore((state) => state.sideBarPosition);
  const setOpen = useStore((state) => state.setSideBarOpen);
  const left = sideBar === "left";
  return (
    <Flex
      jc="between"
      ai="center"
      css={{
        height: 60,
        top: 0,
        left: 0,
        width: "100%",
        px: "$6",
        flexDirection: left ? "row" : "row-reverse",
      }}
    >
      <Tour.Step
        name="menu"
        title="Menu"
        description="Here is the menu icon to open your customizable settings"
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
            css={{
              transform: !left ? "rotate(-180deg)" : "unset",
              path: { stroke: "$text !important" },
            }}
          />
          <Text srOnly>Open side bar</Text>
        </IconButton>
      </Tour.Step>
      <WeatherWidget />
    </Flex>
  );
};
export default TopBar;
