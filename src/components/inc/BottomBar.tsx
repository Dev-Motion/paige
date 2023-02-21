import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Popover,
  Badge,
  IconButton,
  HoverCard,
} from "@components/base";
import { HoverReveal, TodoPane, ImageInfo } from "@components/inc";
import {
  HeartIcon,
  Info,
  SkipIcon,
  TodoIcon,
  TwitterOutlineIcon,
} from "@components/icons";
import useStore from "@store";

const BottomBar = () => {
  const todos = useStore((state) => state.todos);
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
            <IconButton bg="transparent">
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
      <Box
        css={{
          include: "accessibleShadow",
        }}
      >
        <HoverReveal>
          <HoverReveal.Header fs="md" fw="bold">
            “Think lightly of yourself and deeply of the world.”
          </HoverReveal.Header>
          <HoverReveal.Footer
            as={Flex}
            ai="center"
            gap="1"
            jc="center"
            css={{ width: "100%", color: "$text" }}
          >
            <Text>Miyamoto Musashi</Text>
            <HeartIcon />
            <SkipIcon />
            <TwitterOutlineIcon />
          </HoverReveal.Footer>
        </HoverReveal>
      </Box>
      <Flex ai="center" jc="end" gap={2} className="fixed">
        <Popover openChange={openChange} content={<TodoPane />}>
          <Flex
            ai="center"
            gap="1"
            as="button"
            css={{
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
        </Popover>
      </Flex>
    </Flex>
  );
};
export default BottomBar;
