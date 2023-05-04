import React from "react";
import { Box, Text, Flex, Card, CheckBox } from "@components/base";
import { RepeatIcon } from "@components/icons";

const Reminder = () => {
  return (
    <Flex
      fd="column"
      css={{
        $$y: "15px",
        isolation: "isolate",
        gap: "$$y",
        minWidth: 420,
      }}
    >
      {reminders.slice(0, 2).map((reminder, index) => {
        const first = index == 0;
        return (
          <Card
            key={index}
            css={{
              opacity: (1 / (index + 0.2)) * 1,
              $$height: first ? "120px" : "80px",
              height: "$$height",
              pd: "$4",
              mt: first ? "" : "calc(-1 * $$height)",
              zIndex: 3 - index,
              transform: `scale(calc(-1 * ${index} * 0.05 + 1))`,
              spacey: "$2",
            }}
          >
            {first && (
              <Text as={"h3"} fs="md" fw="bold">
                Reminder
              </Text>
            )}
            <Flex gap="1" ai="start">
              <CheckBox />
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
          </Card>
        );
      })}
    </Flex>
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
  {
    id: 3,
    title: "Schedule a meeting with my team",
    description: "Meet with my team to discuss the next step in the project",
    date: "Today, 4:30 PM",
  },
  {
    id: 4,
    title: "Schedule a meeting with my team",
    description: "Meet with my team to discuss the next step in the project",
    date: "Today, 4:30 PM",
  },
];
export default Reminder;
