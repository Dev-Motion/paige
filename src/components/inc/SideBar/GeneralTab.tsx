import React from "react";
import { Box, Flex, Switch, Text } from "@components/base";
import { LeftLayout, RightLayout } from "@components/icons";
import useStore from "@store";

const showItems = [
  "Daily Motivation",
  "Clock",
  "Reminder",
  "Weather",
  "Search",
  "Greeting",
  "Todays Focus",
  "Todo",
  "Feed",
  "Settings",
];
const GeneralTab = () => {
  return (
    <>
      <Box css={{ pt: "$4" }}>
        <Box css={{ mb: "$4" }}>
          <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
            General
          </Text>
          <Text as="p" fs={{ "@initial": "sm", "@md": "md" }}>
            Personalize your home page
          </Text>
        </Box>
        <Box>
          <Text as="h2" fs={{ "@initial": "md", "@md": "lg" }} fw="medium">
            SHOW
          </Text>
          <Flex fd="column" gap="3" css={{ mt: "$4" }}>
            {showItems.map((item) => (
              <LayoutSwitch key={item} label={item} />
            ))}
          </Flex>
        </Box>
      </Box>
      <SideBarLayout />
    </>
  );
};
function LayoutSwitch({ label }: { label: string }) {
  return (
    <Flex jc="between">
      <Text as="label">{label}</Text>
      <Switch />
    </Flex>
  );
}

const SideBarLayout = () => {
  const [sideBar, setSideBar, setOpen] = useStore((state) => [
    state.sideBarPosition,
    state.setSideBarPosition,
    state.setSideBarOpen,
  ]);
  const close = (position: "left" | "right") => {
    setOpen(false);
    setSideBar(position);
    setTimeout(() => {
      setOpen(true);
    }, 500);
  };
  return (
    <Box>
      <Box css={{ mt: "$5", mb: "$4" }}>
        <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
          Layout
        </Text>
        <Text as="p" fs={{ "@initial": "sm", "@md": "md" }}>
          Select layout
        </Text>
      </Box>
      <Flex gap="2">
        <Box
          onClick={() => {
            close("left");
          }}
          css={{
            $$tabColor:
              sideBar === "left"
                ? "$colors$text"
                : "rgba($colors$textRGB, 0.5)",
          }}
        >
          <RightLayout
            css={{
              $$color: "$$tabColor",
            }}
          />
          <Text fs="sm" css={{ color: "$$tabColor" }}>
            Left Layout
          </Text>
        </Box>
        <Box
          onClick={() => {
            close("right");
          }}
          css={{
            $$tabColor:
              sideBar === "right"
                ? "$colors$text"
                : "rgba($colors$textRGB, 0.5)",
          }}
        >
          <LeftLayout
            css={{
              $$color: "$$tabColor",
            }}
          />
          <Text fs="sm" css={{ color: "$$tabColor" }}>
            Right Layout
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
export default GeneralTab;
