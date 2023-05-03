import React, { useRef, useState } from "react";
import { Box, Flex, IconButton, Popover, Switch, Text } from "@components/base";
import { More } from "@components/icons";
import { getDaySegment, processTime } from "@utils";
import { styled } from "stitches.config";
import useStore from "@store";

const Time = () => {
  const [visible, setVisible] = useState(false);
  const [time, name, is24Hour, setIs24Hour, showTime, showGreeting] = useStore(
    (state) => [
      state.time,
      state.name,
      state.is24Hour,
      state.setIs24Hour,
      state.showTime,
      state.showGreeting,
    ]
  );
  const timeDate = new Date(time);
  const dayofWeek = useRef(timeDate.getDay());

  const { timeString, isAM } = processTime(timeDate, is24Hour);

  const openChange = (visible: boolean) => {
    setVisible(visible);
  };
  const onChecked = (checked: boolean) => setIs24Hour(checked);
  return (
    <Box
      css={{
        include: "accessibleShadow",
        justifySelf: "flex-start",
        color: "$text",
        transition: "opacity 0.3s ease-in-out",
        $$blur: "50px",
        $$opacity: 0.3,
      }}
    >
      {showTime && (
        <Box>
          <Box
            onMouseOver={() => setVisible(true)}
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
            <Popover
              openChange={openChange}
              content={<Menu checked={is24Hour} onChecked={onChecked} />}
            >
              <MoreButton size="sm" bg="transparent" visible={visible}>
                <More css={{ circle: { fill: "$text !important" } }} />
              </MoreButton>
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
  position: "absolute",
  right: -40,
  transition: "all 0.3s ease-in-out",
  top: "50%",
  color: "$text",
  transform: "translateY(-50%)",
  opacity: 0,
  pointerEvents: "none",
  "&:focus": {
    opacity: 1,
  },
  variants: {
    visible: {
      true: {
        opacity: 100,
        pointerEvents: "all",
      },
    },
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
    <Flex jc="between" gap="2">
      <Text as="label">24-hour clock</Text>
      <Switch checked={checked} onCheckedChange={onChecked} />
    </Flex>
  );
};

export default Time;
