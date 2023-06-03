import React, { useState } from "react";
import { Box, Text, Flex, Card, CheckBox, Dialog } from "@components/base";
import { RepeatIcon } from "@components/icons";
import { motion } from "framer-motion";
import useStore from "@store";
import { analyzeDate } from "@utils";
const ReminderItems = () => {
  const todos = useStore((store) => store.todos);
  const reminders = todos.flatMap((t) => (t.reminder ? [t] : []));
  return (
    <Flex
      fd="column"
      css={{
        $$y: "15px",
        isolation: "isolate",
        gap: "$$y",
        minWidth: 330,
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
              scale: -1 * index * 0.1 + 1,
              opacity: (1 / (index + 0.2)) * 1,
            }}
            css={{
              $$height: first ? "120px" : "80px",
              height: "$$height",
              pd: "$4",
              mt: first ? "" : "calc(-1 * $$height)",
              zIndex: 3 - index,
              spacey: "$1",
            }}
          >
            {first && (
              <Flex as={motion.div} layoutId="reminder-top" jc="between">
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
                  {reminder.text}
                </Text>
                <Flex
                  css={{
                    border: "0.3px solid $text",
                    px: "$2",
                    py: "$1",
                    br: "$pill",
                    gap: "$1",
                    fontSize: "$2xs",
                    width: "fit-content",
                    color: "$text",
                  }}
                >
                  {analyzeDate(new Date(reminder.date))}
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
  const todos = useStore((store) => store.todos);
  const reminders = todos.flatMap((t) => (t.reminder ? [t] : []));
  return (
    <Flex
      fd="column"
      css={{
        $$y: "8px",
        isolation: "isolate",
        gap: "$$y",
        minWidth: 380,
      }}
    >
      <Card
        as={motion.div}
        layoutId="reminder-top"
        css={{ px: "$4", py: "$2" }}
      >
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
                  {reminder.text}
                </Text>
                <Flex
                  css={{
                    border: "0.3px solid $text",
                    px: "$2",
                    py: "$1",
                    br: "$pill",
                    gap: "$1",
                    fontSize: "$2xs",
                    width: "fit-content",
                    color: "$text",
                  }}
                >
                  {analyzeDate(new Date(reminder.date))}
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

export default Reminder;
