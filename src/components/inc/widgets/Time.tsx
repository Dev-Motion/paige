import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Popover,
  Switch,
  Text,
  Card,
} from "@components/base";
import { MoreIcon } from "@components/icons";
import { getDaySegment, processTime } from "@utils";
import { styled } from "stitches.config";
import useStore from "@store";
import { shallow } from "zustand/shallow";

const Time = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(Date.now());
  const [name, is24Hour, setIs24Hour, showTime, showGreeting] = useStore(
    (state) => [
      state.name,
      state.is24Hour,
      state.setIs24Hour,
      state.showTime,
      state.showGreeting,
    ],
    shallow
  );
  const timeDate = new Date(time);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  });
  const { timeString, isAM } = processTime(timeDate, is24Hour);
  const onChecked = (checked: boolean) => setIs24Hour(checked);
  return (
    <Box
      data-show-more={open}
      css={{
        include: "accessibleShadow",
        justifySelf: "flex-start",
        color: "$text",
        transition: "opacity 0.3s ease-in-out",
        $$blur: "50px",
        $$opacity: 0.3,
        "&:hover": {
          [`& ${MoreButton}`]: {
            opacity: 1,
            pointerEvents: "all",
          },
        },
        "&[data-show-more = 'true']": {
          [`& ${MoreButton}`]: {
            opacity: 1,
            pointerEvents: "all",
          },
        },
      }}
    >
      {showTime && (
        <Box css={{}}>
          <Box
            css={{
              position: "relative",
            }}
          >
            <Text
              as="h1"
              fs="6xl"
              css={{
                fontWeight: 700,
              }}
            >
              {timeString}
            </Text>
            <Popover open={open} onOpenChange={setOpen}>
              <Popover.Button asChild>
                <MoreButton size="sm" bg="transparent">
                  <MoreIcon css={{ circle: { fill: "$text !important" } }} />
                </MoreButton>
              </Popover.Button>
              <Popover.Content>
                <Menu checked={is24Hour} onChecked={onChecked} />
                <Popover.Arrow />
              </Popover.Content>
            </Popover>
          </Box>
          {!is24Hour && (
            <Text
              fs="lg"
              css={{
                ml: "auto",
                display: "block",
                width: "min-content",
                mt: -20,
              }}
            >
              {isAM ? "am" : "pm"}
            </Text>
          )}
        </Box>
      )}
      {showGreeting && (
        <Text fs="2xl" ta="center" css={{ mt: "$2", fontWeight: 600 }}>
          Good {getDaySegment(timeDate)}, {name}
        </Text>
      )}
    </Box>
  );
};

const MoreButton = styled(IconButton, {
  include: "buttonReset",
  pd: "$16",
  boxSizing: "content-box",
  position: "absolute",
  right: -40,
  transition: "all 0.3s ease-in-out",
  top: "50%",
  color: "$text",
  transform: "translateY(-50%)",
  opacity: 0,
  "&:focus": {
    opacity: 1,
    transform: "translateY(-50%)",
  },
  "&:hover": {
    opacity: 1,
  },
});
const Menu = ({
  checked,
  onChecked,
}: {
  checked: boolean;
  onChecked: (check: boolean) => void;
}) => {
  return (
    <Card css={{ pd: "$2" }}>
      <Flex jc="between" gap="2">
        <Text as="label">24-hour clock</Text>
        <Switch checked={checked} onCheckedChange={onChecked} />
      </Flex>
    </Card>
  );
};

export default Time;
