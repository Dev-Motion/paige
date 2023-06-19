import { Box, Flex, Text } from "@components/base";
import React from "react";
import useStore from "@store";
import { findCurrent, HOURS } from "@utils";
import { useCachedEffect } from "@hooks";
import { weatherCodes, icon } from "@utils/weatherConditions";
import { shallow } from "zustand/shallow";

const TIME_REFRESH = 1;

const WeatherWidget = () => {
  const [weather, location, getWeather, getCurrentLocation, getCityName] =
    useStore(
      (state) => [
        state.weather,
        state.location,
        state.getWeather,
        state.getCurrentLocation,
        state.getCityName,
      ],
      shallow
    );
  const conditions =
    weather && weather.conditions
      ? findCurrent(weather.conditions, Date.now())
      : null;

  useCachedEffect(
    () => {
      getCurrentLocation().then(() => {
        getWeather();
        getCityName();
      });
    },
    weather ? weather.timestamp + TIME_REFRESH * HOURS : 0,
    [location?.longitude, location?.latitude]
  );
  // Blank or loading state
  if (!conditions) return <div className="Weather">-</div>;
  const iconName = weatherCodes[conditions.weatherCode];
  return (
    <Flex fd="column">
      <Flex ai="center" css={{ color: "$text" }}>
        <Box css={{ position: "relative" }}>
          <Box
            as="img"
            css={{ size: 40 }}
            src={icon(iconName)}
            alt={iconName}
          />
        </Box>
        <Text fs={"3xl"} fw="semibold">
          {Math.round(conditions.temperature)}˚
        </Text>
      </Flex>
      {location?.cityName && (
        <Text color="text" css={{ alignSelf: "end" }}>
          {location?.cityName}
        </Text>
      )}
    </Flex>
  );
};

export default WeatherWidget;
