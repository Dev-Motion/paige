import React, { useState, useDeferredValue } from "react";
import { Box, Text, Flex } from "@components/base";
import { styled } from "stitches.config";
import { SearchIcon } from "@components/icons";
import { Combobox } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLocation } from "@api";
import { Coordinates } from "@api/types";
import useStore from "@store";
import { shallow } from "zustand/shallow";
import { useCityName, useCurrentLocation, useWeather } from "@api/hooks";

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
      <Box css={{ spacey: "$1" }}>
        <Text as="h2" fs="sm" fw="semibold">
          Location
        </Text>
        <Text fs="xs">Set your location to get the most accurate weather</Text>
        <LocationFinder />
      </Box>
      <Box css={{ spacey: "$1" }}>
        <Text as="h2" fs="sm" fw="semibold">
          Weather Unit
        </Text>
        <Text fs="xs">
          Set your weather unit to get the most accurate weather
        </Text>
        <WeatherUnitSelect />
      </Box>
    </Box>
  );
};

export default WeatherTab;

function WeatherUnitSelect() {
  const [unit, setUnit] = useStore(
    (store) => [store.unit, store.setUnit],
    shallow,
  );
  const queryClient = useQueryClient();
  function setUnitAndRefetch(unit: "fahrenheit" | "celsius") {
    setUnit(unit);
    queryClient.invalidateQueries(useWeather.getKey());
  }
  return (
    <Flex gap={2}>
      <WeatherUnitCard
        active={unit === "fahrenheit"}
        onClick={() => setUnitAndRefetch("fahrenheit")}
      >
        <Text fs="sm">Fahrenheit (&lrm;°F)</Text>
      </WeatherUnitCard>
      <WeatherUnitCard
        active={unit === "celsius"}
        onClick={() => setUnitAndRefetch("celsius")}
      >
        <Text fs="sm">Celsius (&lrm;°C)</Text>
      </WeatherUnitCard>
    </Flex>
  );
}
function LocationFinder() {
  const [value, setValue] = useState("");
  const deferredValue = useDeferredValue(value);
  const queryClient = useQueryClient();
  const { isError, isLoading, data } = useQuery(
    ["location", deferredValue],
    () => getLocation(value),
    {
      keepPreviousData: true,
    },
  );
  const [selectedLocation, setSelectedLocation] = useState<null | Coordinates>(
    null,
  );
  function setLocation({
    cityName,
    ...position
  }: {
    longitude: number;
    latitude: number;
    cityName: string;
  }) {
    queryClient.setQueryData(useCurrentLocation.getKey(), position);
    queryClient.setQueryData(useCityName.getKey(position), cityName);
  }
  return (
    <Combobox
      value={selectedLocation}
      onChange={(v) => {
        if (v) {
          setSelectedLocation(v);
          const { longitude, latitude, name } = v;
          setLocation({ longitude, latitude, cityName: name });
        }
      }}
    >
      <InputContainer>
        <Input
          displayValue={(v: Coordinates | undefined) =>
            v ? `${v.name} ${v.country}` : ""
          }
          onChange={(event) => setValue(event.target.value)}
        />
        <RightIcon>
          <SearchIcon css={{ size: "$3" }} />
        </RightIcon>
      </InputContainer>
      <Box css={{ position: "relative" }}>
        <ComoboxOptions>
          {/* error state */}
          {isError && (
            <EmptyState>
              <Text fs="xs">An Error Occurred...</Text>
            </EmptyState>
          )}
          {/* Not found */}
          {data?.length === 0 && !isError && (
            <EmptyState>
              <Text fs="xs">No Location found...</Text>
            </EmptyState>
          )}
          {/* Loading state */}
          {isLoading && (
            <EmptyState>
              <Text fs="xs">Loading...</Text>
            </EmptyState>
          )}
          {/* Data found */}
          {data?.map((location) => {
            return (
              <ComboboxOption
                key={`${location.name} ${location.longitude} ${location.latitude}`}
                value={location}
              >
                <Text fw="bold" fs="sm">
                  {location.name}
                </Text>
                <Text fs="xs">{location.country}</Text>
              </ComboboxOption>
            );
          })}
        </ComoboxOptions>
      </Box>
    </Combobox>
  );
}

const WeatherUnitCard = styled("button", {
  include: "buttonReset",
  cursor: "pointer",
  display: "flex",
  flex: 1,
  ai: "center",
  jc: "center",
  bg: "rgba($bgRGB,1)",
  br: "$2",
  height: 50,
  $$borderColor: "rgba($colors$textRGB,0.2)",
  boxShadow: "0 0 0 1.5px $$borderColor inset",
  pd: "$2",
  variants: {
    active: {
      true: {
        $$borderColor: "$colors$accent",
      },
    },
  },
});
const Input = styled(Combobox.Input, {
  appearance: "none",
  py: "$2",
  px: "$2",
  pr: "$3",
  br: "$pill",
  width: "100%",
  border: "none",
  outline: "none",
  bg: "transparent",
  color: "$text",
  "&::placeholder": {
    color: "rgba($colors$textRGB,.7)",
  },
});
const InputContainer = styled("div", {
  br: "$pill",
  overflow: "hidden",
  border: "1px solid rgba($colors$textRGB,0.7)",
  color: "$text",
  position: "relative",
  "&:focus-within": {
    borderColor: "$accent",
    "& svg": {
      color: "$accent",
    },
  },
});
const ComoboxOptions = styled(Combobox.Options, {
  display: "flex",
  flexDirection: "column",
  br: "$4",
  overflow: "hidden",
  pd: "$1",
  bg: "$bg",
  gap: "$1",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
});

const ComboboxOption = styled(Combobox.Option, {
  py: "$1",
  px: "$2",
  bg: "$text",
  color: "$bg",
  br: "$2",

  "&[data-headlessui-state=active]": {
    bg: "$accent",
    color: "$text",
  },
});
const EmptyState = styled("div", {
  py: "$1",
  px: "$2",
  bg: "$text",
  color: "$bg",
  br: "$2",

  "&[data-headlessui-state=active]": {
    bg: "$accent",
    color: "$text",
  },
});

const RightIcon = styled("div", {
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  pr: "$2",
  color: "$text",
  cursor: "pointer",
});
