import React from "react";
import { Box, Text, Flex, Card } from "@components/base";

const Reminder = () => {
  return (
    <Card px="6" py="4">
      <Text as={"h3"} fs="md" fw="bold">
        Reminder
      </Text>
      <Flex gap={2} fd="column" css={{ mt: "$2" }}>
        {reminders.map((reminder, index) => {
          return (
            <Flex key={index} gap="1" ai="start">
              <Box as="input" type="checkbox" />
              <Box css={{}}>
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
            </Flex>
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
export default Reminder;
