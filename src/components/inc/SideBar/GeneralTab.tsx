import React from "react";
import { Box, Flex, Switch, Text } from "@components/base";
import { LeftLayout, RightLayout } from "@components/icons";

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
          <Box>
            <RightLayout />
            <Text fs="sm">Right Layout</Text>
          </Box>
          <Box>
            <LeftLayout css={{ $$color: "gray", strokeColor: "Gainsboro" }} />
            <Text fs="sm" css={{ color: "gray" }}>
              Left Layout
            </Text>
          </Box>
        </Flex>
      </Box>
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
export default GeneralTab;
