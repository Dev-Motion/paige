import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Popover,
  IconButton,
  HoverCard,
} from "@components/base";
import { DailyMotivation, TodoPane, ImageInfo } from "@components/inc/widgets";
import { Info, TodoIcon } from "@components/icons";
import useStore from "@store";

const BottomBar = () => {
  const todos = useStore((state) => state.todos);
  const showTodo = useStore((state) => state.showTodo);
  const unCompletedTodos = todos.filter((todo) => !todo.completed);
  const [visible, setVisible] = useState(false);
  const openChange = (visible: boolean) => {
    setVisible(visible);
  };

  return (
    <Flex
      jc="between"
      ai="center"
      css={{
        height: "8vh",
        px: "$6",
        color: "$text",
        width: "100%",
        "& .fixed": {
          width: "10vw",
          minWidth: 200,
        },
      }}
    >
      <Box className="fixed">
        <HoverCard
          trigger={
            <IconButton
              bg="transparent"
              css={{
                include: "accessibleShadow",
              }}
            >
              <Info
                css={{
                  size: 30,
                  color: "$text",
                  "&:hover": {
                    fill: "$text",
                    stroke: "$bg",
                  },
                }}
              />
            </IconButton>
          }
        >
          <ImageInfo />
        </HoverCard>
      </Box>
      <DailyMotivation />
      <Flex ai="center" jc="end" gap={2} className="fixed">
        {showTodo && (
          <Popover>
            <Popover.Button asChild>
              <Flex
                ai="center"
                gap="1"
                as="button"
                css={{
                  py: "$2",
                  px: "$3",
                  color: "$text",
                  include: ["buttonReset", "accessibleShadow"],
                  position: "relative",
                }}
              >
                <TodoIcon />
                <Text>Todo</Text>
                <Badge
                  ping
                  hidden={unCompletedTodos.length === 0}
                  css={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    transform: "translate(50%, -50%)",
                  }}
                >
                  {unCompletedTodos.length}
                </Badge>
              </Flex>
            </Popover.Button>
            <Popover.Content>
              <TodoPane />
              <Popover.Close />
              <Popover.Arrow />
            </Popover.Content>
          </Popover>
        )}
      </Flex>
    </Flex>
  );
};
export default BottomBar;
