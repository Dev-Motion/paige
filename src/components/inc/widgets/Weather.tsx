import { Box, Flex, Text } from "@components/base";
import React from "react";
import useStore from "@store";
import { WiCloudy } from "react-icons/wi";
import { findCurrent, HOURS } from "@utils";
import { useCachedEffect } from "@hooks";

const WeatherWidget = () => {
  const [weather, location, getWeather, getCurrentLocation, getCityName] =
    useStore((state) => [
      state.weather,
      state.location,
      state.getWeather,
      state.getCurrentLocation,
      state.getCityName,
    ]);
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
    weather ? weather.timestamp + 6 * HOURS : 0,
    [location?.longitude, location?.latitude]
  );
  // Blank or loading state
  if (!conditions) return <div className="Weather">-</div>;

  return (
    <Flex fd="column">
      <Flex ai="center" css={{ color: "$text" }}>
        <WiCloudy size={40} />
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
