import React from "react";
import { Box, Flex, Switch, Text } from "@components/base";
import { LeftLayout, RightLayout } from "@components/icons";
import SideBar from ".";
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
      <Box>
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
const LayoutSwitch = ({ label }: { label: string }) => {
  return (
    <Flex jc="between">
      <Text as="label">{label}</Text>
      <Switch />
    </Flex>
  );
};

const SideBarLayout = () => {
  const [sideBar, setSideBar] = useStore((state) => [
    state.sideBar,
    state.setSideBar,
  ]);
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
          onClick={() => setSideBar("left")}
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
          onClick={() => setSideBar("right")}
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
