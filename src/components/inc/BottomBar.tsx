import React from "react";
import { Box, Flex, Text } from "@components/base";
import { HoverReveal } from "@components/inc";
import {
  HeartIcon,
  SkipIcon,
  Todo,
  TwitterOutlineIcon,
} from "@components/icons";
import useStore from "@store";

const BottomBar = () => {
  const photos = useStore((state) => state.photos);
  const today = new Date().toDateString();
  const todayImage =
    photos.filter((photo) => new Date(photo.for).toDateString() === today)[0] ||
    photos[1];
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
        <Todo />
        <Text>Todo</Text>
      </Flex>
    </Flex>
  );
};
export default BottomBar;
