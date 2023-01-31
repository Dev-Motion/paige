import React from "react";
import { Box, Flex, IconButton, Popover, Switch, Text } from "@components/base";
import { More } from "@components/icons";
import { getDaySegment, processTime } from "@utils";
import { styled } from "stitches.config";

interface State {
  time: Date;
  visible: boolean;
}
function reducer(state: State, action: Partial<State>): State {
  const newState = { ...state, ...action };
  return newState;
}
const initialState = {
  time: new Date(),
  visible: false,
};

const Time = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [is24Hour, setIs24Hour] = React.useState(false);
  const { timeString, isAM } = processTime(state.time, is24Hour);
  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ time: new Date() });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const openChange = (visible: boolean) => {
    dispatch({ visible });
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
      <Box
        onMouseOver={() => dispatch({ visible: true })}
        css={{
          position: "relative",
        }}
      >
        <Text as="h1" fs="6xl" fw={"bold"}>
          {timeString}
        </Text>
        <Popover
          openChange={openChange}
          content={<Menu checked={is24Hour} onChecked={onChecked} />}
        >
          <MoreButton size="sm" bg="transparent" visible={state.visible}>
            <More css={{ circle: { fill: "$text !important" } }} />
          </MoreButton>
        </Popover>
      </Box>
      {!is24Hour && (
        <Text
          fs="lg"
          css={{ ml: "auto", display: "block", width: "min-content", mt: -20 }}
        >
          {isAM ? "am" : "pm"}
        </Text>
      )}
      <Text fs="2xl" fw="bold" ta="center" css={{ mt: "$2" }}>
        Good {getDaySegment(state.time)} Victor
      </Text>
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
    <Flex jc="between">
      <Text as="label">24-hour clock</Text>
      <Switch checked={checked} onCheckedChange={onChecked} />
    </Flex>
  );
};

export default Time;
