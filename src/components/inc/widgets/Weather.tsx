import { Box, Card, Flex, Text } from "@components/base";
import React, { useState } from "react";
import useStore from "@store";
import { findCurrent, HOURS } from "@utils";
import { useCachedEffect } from "@hooks";
import {
  weatherCodes,
  icon,
  weatherConditions,
} from "@utils/weatherConditions";
import { shallow } from "zustand/shallow";
import { AnimatePresence, motion } from "framer-motion";
import { isToday } from "date-fns";
const TIME_REFRESH = 1;

const WeatherWidget = () => {
  const [
    weather,
    location,
    getWeather,
    getCurrentLocation,
    getCityName,
    position,
  ] = useStore(
    (state) => [
      state.weather,
      state.location,
      state.getWeather,
      state.getCurrentLocation,
      state.getCityName,
      state.sideBarPosition,
    ],
    shallow
  );
  const pos = position === "left" ? "right" : "left";
  const [hovered, setHovered] = useState(false);
  const conditions =
    weather && weather.conditions
      ? findCurrent(weather.conditions, Date.now())
      : null;
  const todayCondition =
    weather && weather.conditions
      ? weather.conditions.flatMap((c) =>
        isToday(new Date(c.timestamp)) ? c.temperature : []
      )
      : [];
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
  const conditionName = weatherConditions[conditions.weatherCode];

  return (
    <AnimatePresence mode="wait">
      {hovered ? (
        <Card
          as={motion.div}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.4 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.4 },
          }}
          onMouseLeave={() => setHovered(false)}
          css={{
            minWidth: 300,
            position: "absolute",
            top: 10,
            [pos]: 10,
            pd: "$3",
            display: "flex",
            flexDirection: "column",
            gap: "$2",
          }}
        >
          <Flex fd="column" gap="1">
            <Text fs="md" fw="medium">
              {location?.cityName}
            </Text>
            <Text fs="xs">{conditionName}</Text>
          </Flex>
          <Flex jc="between" css={{ mt: "$2" }}>
            <Flex ai="center" css={{ color: "$text" }}>
              <Box css={{ position: "relative" }}>
                <Box
                  as={motion.img}
                  layoutId={"weather-icon"}
                  transition={{
                    layout: {
                      duration: 0.4,
                    },
                  }}
                  css={{ size: 60 }}
                  src={icon(iconName)}
                  alt={iconName}
                />
              </Box>
              <Text
                as={motion.h2}
                layoutId="weather-temperature"
                transition={{
                  layout: {
                    duration: 0.4,
                  },
                }}
                fs={"3xl"}
                fw="semibold"
              >
                {Math.round(conditions.temperature)}˚
              </Text>
            </Flex>
            <Flex fd="column" gap="1">
              <Text as="p" fs="sm">
                Feels like {Math.round(conditions.apparentTemperature)}˚
              </Text>
              <Text as="p" fs="sm">
                High {Math.round(Math.max(...todayCondition))}˚
              </Text>
              <Text as="p" fs="sm">
                Low {Math.round(Math.min(...todayCondition))}˚
              </Text>
            </Flex>
          </Flex>
          <Flex fd="column" gap="2">
            <Box css={{ bg: "$text", height: 0.5 }} />
            <Text as="a" fs="xs" href="https://open-meteo.com/" target="_blank">
              @Open-Meteo
            </Text>
          </Flex>
        </Card>
      ) : (
        <Flex fd="column" onMouseEnter={() => setHovered(true)}>
          <Flex ai="center" css={{ color: "$text" }}>
            <Box css={{ position: "relative" }}>
              <Box
                as={motion.img}
                layoutId={"weather-icon"}
                transition={{
                  layout: {
                    duration: 0.4,
                  },
                }}
                css={{ size: 45 }}
                src={icon(iconName)}
                alt={iconName}
              />
            </Box>
            <Text
              as={motion.h2}
              layoutId="weather-temperature"
              transition={{
                layout: {
                  duration: 0.4,
                },
              }}
              fs={"2xl"}
              fw="semibold"
            >
              {Math.round(conditions.temperature)}˚
            </Text>
          </Flex>
          <Text color="text" fs="md" fw="medium">
            {conditionName}
          </Text>
        </Flex>
      )}
    </AnimatePresence>
  );
};

export default WeatherWidget;
