import React from "react";
import { Box, Text, Flex, Card } from "@components/base";
import { RepeatIcon } from "@components/icons";

const Reminder = () => {
  return (
    <Card css={{ pd: "$5" }}>
      <Text as={"h3"} fs="md" fw="bold">
        Reminder
      </Text>
      <Flex gap={2} fd="column" css={{ mt: "$2" }}>
        {reminders.map((reminder, index) => {
          return (
            <Flex key={index} gap="1" ai="start">
              <Box as="input" type="checkbox" />
              <Box css={{ spacey: "$1" }}>
                <Text fs="sm" fw="medium">
                  {reminder.title}
                </Text>
                <Flex
                  css={{
                    border: "1px solid $text",
                    px: "$2",
                    py: "$1",
                    br: "$pill",
                    gap: "$1",
                    fontSize: "$xs",
                    width: "fit-content",
                    color: "$text",
                  }}
                >
                  {reminder.date}
                  <RepeatIcon />
                </Flex>
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
    title: "Get help to setup my laptop",
    description: "I need to set up my laptop and get it running",
    date: "Today, 10:00 AM",
  },
  {
    id: 2,
    title: "Schedule a meeting with my team",
    description: "Meet with my team to discuss the next step in the project",
    date: "Today, 4:30 PM",
  },
];
export default Reminder;
