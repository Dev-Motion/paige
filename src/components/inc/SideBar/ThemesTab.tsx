import React from "react";
import { Box, Flex, Text } from "@components/base";

const ThemesTab = () => {
  return (
    <Box>
      <Box css={{ mb: "$4" }}>
        <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
          Themes
        </Text>
        <Text as="p" fs={{ "@initial": "sm", "@md": "md" }}>
          Personalize your themes here
        </Text>
      </Box>
    </Box>
  );
};

export default ThemesTab;
