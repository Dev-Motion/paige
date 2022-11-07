import React from "react";
import { Box, Text } from "@component/base";
import { More } from "@component/icons";

const getDaySegment = (time: Date | null) => {
  const hours = time?.getHours() || 0;
  if (hours < 12 && hours >= 5) {
    return "morning";
  } else if (hours >= 12 && hours < 17) {
    return "afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "evening";
  } else {
    return "night";
  }
};
const Time = () => {
  const [time, setTime] = React.useState<Date | null>(null);
  const Hours = time?.getHours() || 0;
  const Minutes = time?.getMinutes() || 0;
  const isAM = Hours < 12;
  const Hours12 = Hours % 12;
  const timeString = `${Hours.toString().padStart(
    2,
    "0"
  )}:${Minutes.toString().padStart(2, "0")}`;
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box
      css={{
        justifySelf: "flex-start",
        color: "$text",
        opacity: time === null ? 0 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <Box
        css={{
          position: "relative",
          "&:hover": {
            svg: {
              opacity: 1,
            },
          },
        }}
      >
        <Text as="h1" fs="6xl" fw={"bold"}>
          {timeString}
        </Text>
        <More
          css={{
            position: "absolute",
            right: -40,
            opacity: 0,
            transition: "all 0.3s ease-in-out",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>
      <Text
        fs="lg"
        css={{ ml: "auto", display: "block", width: "min-content", mt: -20 }}
      >
        {isAM ? "am" : "pm"}
      </Text>
      <Text fs="2xl" fw="bold" ta="center" css={{ mt: "$2" }}>
        Good {getDaySegment(time)} Victor
      </Text>
    </Box>
  );
};

export default Time;
