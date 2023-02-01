import React, { useState } from "react";
import { Box, Flex, Text, Popover, Badge } from "@components/base";
import { HoverReveal, TodoPane } from "@components/inc";
import {
  HeartIcon,
  SkipIcon,
  TodoIcon,
  TwitterOutlineIcon,
} from "@components/icons";
import useStore from "@store";

const BottomBar = () => {
  const [photos, todos] = useStore((state) => [state.photos, state.todos]);
  const [visible, setVisible] = useState(false);
  const today = new Date().toDateString();
  const todayImage =
    photos.filter((photo) => new Date(photo.for).toDateString() === today)[0] ||
    photos[1];
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
        <HoverReveal>
          <HoverReveal.Header as="a" fs="md" href={todayImage?.links?.html}>
            {todayImage?.description || todayImage?.alt_description}
          </HoverReveal.Header>
          <HoverReveal.FooterText
            as="a"
            fs="sm"
            href={todayImage?.user?.links?.self}
          >
            {todayImage?.user?.username}
          </HoverReveal.FooterText>
        </HoverReveal>
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
              hidden={!todos.length}
              css={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(50%, -50%)",
              }}
            >
              {todos.filter((todo) => !todo.completed).length}
            </Badge>
          </Flex>
        </Popover>
      </Flex>
    </Flex>
  );
};
export default BottomBar;
