import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Card,
  CheckBox,
  Dialog,
  ScrollArea,
} from "@components/base";
import { motion } from "framer-motion";
import useStore from "@store";
import { analyzeDate } from "@utils";

const ReminderItems = () => {
  const todos = useStore((store) => store.todos);
  const toggleTodo = useStore((store) => store.toggleTodo);
  const reminders = todos.flatMap((t) => (t.reminder ? [t] : []));
  const completedReminders = reminders.filter((rem) => rem.completed);
  const activeReminders = reminders.filter((rem) => !rem.completed);
  const orderedActiveReminders = activeReminders.sort((a) => {
    if (a.important) return -1;
    return 0;
  });
  const display = [...orderedActiveReminders, ...completedReminders];
  return (
    <Flex
      fd="column"
      css={{
        $$y: "15px",
        isolation: "isolate",
        gap: "$$y",
        minWidth: 330,
        maxWidth: 360,
        minHeight: 120,
      }}
    >
      {display.slice(0, 2).map((reminder, index) => {
        const first = index == 0;
        return (
          <Card
            key={reminder.id}
            as={motion.div}
            layoutId={`reminder-item-${reminder.id}`}
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
              <CheckBox
                checked={reminder.completed}
                onCheckedChange={() => toggleTodo(reminder.id)}
              />
              <Box css={{ spacey: "$1" }}>
                <Text
                  fs="sm"
                  fw="medium"
                  css={{
                    display: "-webkit-box",
                    "-webkit-line-clamp": first ? 2 : 1,
                    "-webkit-box-orient": "vertical",
                    overflow: "hidden",
                  }}
                >
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

type FlexPrimitive = React.ComponentProps<typeof Flex>;
const FloatingReminderItems = React.forwardRef<HTMLDivElement, FlexPrimitive>(
  function FloatingReminderItemPrimitive({ children, ...props }, forwardedRef) {
    const todos = useStore((store) => store.todos);
    const toggleTodo = useStore((store) => store.toggleTodo);
    const reminders = todos.flatMap((t) => (t.reminder ? [t] : []));
    const completedReminders = reminders.filter((rem) => rem.completed);
    const activeReminders = reminders.filter((rem) => !rem.completed);
    const orderedActiveReminders = activeReminders.sort((a) => {
      if (a.important) return -1;
      return 0;
    });

    return (
      <Flex
        fd="column"
        css={{
          $: "8px",
          isolation: "isolate",
          gap: "$",
          minWidth: 380,
        }}
        ref={forwardedRef}
        {...props}
      >
        {children}
        <Card
          nested
          as={motion.div}
          layoutId="reminder-top"
          css={{ px: "$4", py: "$2" }}
        >
          <Text as={"h3"} fs="md" fw="bold">
            Reminder
          </Text>
        </Card>
        <ScrollArea css={{ height: "80vh", mt: "$2" }}>
          <Flex fd="column" gap={1}>
            {[...orderedActiveReminders, ...completedReminders].map(
              (reminder) => {
                return (
                  <Card
                    nested
                    key={reminder.id}
                    as={motion.div}
                    layoutId={`reminder-item-${reminder.id}`}
                    css={{
                      pd: "$4",
                      spacey: "$2",
                      maxWidth: 480,
                    }}
                  >
                    <Flex gap="1" ai="start">
                      <CheckBox
                        checked={reminder.completed}
                        onCheckedChange={() => toggleTodo(reminder.id)}
                      />
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
              }
            )}
          </Flex>
        </ScrollArea>
      </Flex>
    );
  }
);

const Reminder = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!open && <ReminderItems />}
      <Dialog.Content overlay asChild>
        <FloatingReminderItems>
          <Dialog.Close />
        </FloatingReminderItems>
      </Dialog.Content>
    </Dialog>
  );
};

export default Reminder;
