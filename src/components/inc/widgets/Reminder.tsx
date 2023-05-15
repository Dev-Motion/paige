import React, { useState } from "react";
import { Box, Text, Flex, Card, CheckBox, Dialog } from "@components/base";
import { RepeatIcon } from "@components/icons";
import { motion } from "framer-motion";

const ReminderItems = () => {
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
            as={motion.div}
            layoutId={`reminder-item-${index + 1}`}
            initial={false}
            animate={{
              scale: -1 * index * 0.05 + 1,
            }}
            css={{
              opacity: (1 / (index + 0.2)) * 1,
              $$height: first ? "120px" : "80px",
              height: "$$height",
              pd: "$4",
              mt: first ? "" : "calc(-1 * $$height)",
              zIndex: 3 - index,
              spacey: "$2",
            }}
          >
            {first && (
              <Flex jc="between">
                <Text as={"h3"} fs="md" fw="bold">
                  Reminder
                </Text>
                <Dialog.Button asChild>
                  <Box
                    as="button"
                    css={{
                      include: "buttonReset",
                      px: "$2",
                      py: "$1",
                      fontSize: "$sm",
                      br: "$pill",
                      boxShadow: "0 0 0 1px solid $text",
                      color: "$text",
                    }}
                  >
                    view all
                  </Box>
                </Dialog.Button>
              </Flex>
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

const FloatingReminderItems = () => {
  return (
    <Flex
      fd="column"
      css={{
        $$y: "8px",
        isolation: "isolate",
        gap: "$$y",
        minWidth: 420,
      }}
    >
      <Card css={{ px: "$4", py: "$2" }}>
        <Text as={"h3"} fs="md" fw="bold">
          Reminder
        </Text>
      </Card>
      {reminders.map((reminder, index) => {
        return (
          <Card
            key={index}
            as={motion.div}
            layoutId={`reminder-item-${index + 1}`}
            css={{
              pd: "$4",
              spacey: "$2",
            }}
          >
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

const Reminder = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!open && <ReminderItems />}
      <Dialog.Content overlay>
        <Dialog.Close />
        <FloatingReminderItems />
      </Dialog.Content>
    </Dialog>
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
