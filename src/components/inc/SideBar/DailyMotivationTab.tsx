import React from "react";
import { Box, Flex, Switch, Text } from "@components/base";

const DailyMotivationTab = () => {
  return (
    <Box css={{ pt: "$8", pb: "$5", spacey: "$5" }}>
      <Box>
        <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
          Daily motivation
        </Text>
        <Text as="p" fs={{ "@initial": "sm", "@md": "md" }} css={{ mt: 8 }}>
          Positive thought to change your whole day
        </Text>
      </Box>
    </Box>
  );
};

export default DailyMotivationTab;
