import React from "react";
import { Flex, IconButton, Text } from "@components/base";
import { Hamburger } from "@components/icons";
import useStore from "@store";
import { WiCloudy, WiDegrees } from "react-icons/wi";

const TopBar = () => {
  const [sideBar, setOpen, weather] = useStore((state) => [
    state.sideBarPosition,
    state.setSideBarOpen,
    state.weather,
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
          css={{
            transform: !left ? "rotate(-180deg)" : "unset",
            path: { stroke: "$text !important" },
          }}
        />
        <Text css={{ include: "screenReaderOnly" }}>Open side bar</Text>
      </IconButton>
      <Flex fd="column">
        {weather ? (
          <>
            <Flex ai="center" css={{ color: "$text" }}>
              <WiCloudy size={40} />
              <Text fs={"3xl"} fw="semibold">
                {Math.round(weather.temperature)}˚
              </Text>
            </Flex>
            <Text color="text" css={{ alignSelf: "end" }}>
              Lagos
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  );
};
export default TopBar;
