import React from "react";
import { Box, Text } from "@components/base";

const WeatherTab = () => {
  return (
    <Box css={{ py: "$5", spacey: "$5" }}>
      <Box>
        <Text as="h1" fs="lg" fw="bold">
          Weather Settings
        </Text>
        <Text as="p" fs="xs" css={{ mt: 8 }}>
          Adjust you weather settings to get the most accurate weather
        </Text>
      </Box>
    </Box>
  );
};

export default WeatherTab;
