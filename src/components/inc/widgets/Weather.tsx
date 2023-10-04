import { useCityName, useCurrentLocation, useWeather } from "@api/hooks";
import { Box, Card, Flex, Text } from "@components/base";
import useStore from "@store";
import { findCurrent } from "@utils";
import {
  icon,
  weatherCodes,
  weatherConditions,
} from "@utils/weatherConditions";
import { isToday } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
const TIME_REFRESH = 1;

const WeatherWidget = () => {
  const position = useStore((state) => state.sideBarPosition);
  const pos = position === "left" ? "right" : "left";
  const [hovered, setHovered] = useState(false);
  const { data: location } = useCurrentLocation();
  const { data: cityName } = useCityName({
    variables: location!,
    enabled: !!location,
  });
  const { data: weather, isSuccess: weatherAvailable } = useWeather({
    variables: location!,
    enabled: !!location,
  });
  if (!weatherAvailable) return null;
  const conditions = findCurrent(weather.conditions, Date.now());

  const todayCondition = weather.conditions.flatMap((c) =>
    isToday(new Date(c.timestamp)) ? c.temperature : []
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
              {cityName}
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
          <Text color="text" fs="sm" fw="medium">
            {conditionName}
          </Text>
        </Flex>
      )}
    </AnimatePresence>
  );
};

export default WeatherWidget;
