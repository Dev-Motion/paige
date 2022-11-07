import { Box, Text, Flex } from "@component/base";
import React from "react";
import { styled } from "stitches.config";

const Card = styled("div", {
  backdropFilter: "blur(40px)",
  br: "$4",
  bg: "rgba(0, 0, 0, 0.5)",
  pd: "$6",
  color: "$text",
  minWidth: 420,
});
const Remainder = () => {
  return (
    <Card>
      <Text as={"h3"} fs="md" fw="bold">
        Remainder
      </Text>
      <Flex gap={1} fd="column" css={{ mt: "$2" }}>
        {reminders.map((reminder, index) => {
          return (
            <Box key={index} css={{}}>
              <Text fs="sm" fw="bold">
                {reminder.title}
              </Text>
              <Box
                css={{
                  border: "1px solid $text",
                  px: "$2",
                  py: "$1",
                  br: "$pill",
                  fontSize: "$xs",
                  width: "fit-content",
                  mt: "$1",
                }}
              >
                {reminder.date}
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Card>
  );
};

const reminders = [
  {
    id: 1,
    title: "Set my laptop up and running",
    description: "I need to set up my laptop and get it running",
    date: "Today, 10:00 AM",
  },
  {
    id: 2,
    title: "Set my laptop up and running",
    description: "I need to set up my laptop and get it running",
    date: "Today, 10:00 AM",
  },
];
export default Remainder;
