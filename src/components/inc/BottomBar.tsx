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
import { tweetHandler } from "@utils";

const BottomBar = () => {
  const [todos, quote, getQuotes, favouriteQuotes, setFavouriteQuotes] =
    useStore((state) => [
      state.todos,
      state.quote,
      state.getQuotes,
      state.favouriteQuotes,
      state.setFavouriteQuotes,
    ]);
  const unCompletedTodos = todos.filter((todo) => !todo.completed);
  const [visible, setVisible] = useState(false);
  const openChange = (visible: boolean) => {
    setVisible(visible);
  };
  const tweetText = `I love this quote by ${quote.author}!
“${quote.text}”`;
  const favourite = favouriteQuotes.includes(quote);

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
          <HoverReveal.Header fs="sm" fw="semibold">
            “{quote.text}”
          </HoverReveal.Header>
          <HoverReveal.Footer
            as={Flex}
            ai="center"
            gap="1"
            jc="center"
            css={{ width: "100%", color: "$text" }}
          >
            <Text fs="2xs">{quote.author}</Text>
            <Flex>
              <Box
                as="button"
                css={{
                  appearance: "none",
                  border: "none",
                  bg: "transparent",
                  color: "$text",
                  size: 20,
                  br: "$round",
                  "&:hover": {
                    bg: "rgba($bgRGB,0.5)",
                  },
                  "&>svg": {
                    size: 10,
                    fill: favourite ? "white" : "transparent",
                  },
                }}
                onClick={() => {
                  if (!favourite) {
                    setFavouriteQuotes((quotes) => [...quotes, quote]);
                  } else {
                    setFavouriteQuotes((quotes) =>
                      quotes.filter((q) => q.id !== quote.id)
                    );
                  }
                }}
              >
                <Text css={{ include: "screenReaderOnly" }}>
                  Add to favourite quotes
                </Text>
                <HeartIcon />
              </Box>
              <Box
                as="button"
                css={{
                  appearance: "none",
                  border: "none",
                  color: "$text",
                  bg: "transparent",
                  size: 20,
                  br: "$round",
                  "&:hover": {
                    bg: "rgba($bgRGB,0.5)",
                  },
                  "&>svg": {
                    size: 10,
                  },
                }}
                onClick={() => getQuotes()}
              >
                <Text css={{ include: "screenReaderOnly" }}>Skip quote</Text>
                <SkipIcon />
              </Box>
              <Box
                as="a"
                css={{
                  appearance: "none",
                  border: "none",
                  bg: "transparent",
                  color: "$text",
                  size: 20,
                  display: "grid",
                  placeItems: "center",
                  br: "$round",
                  "&:hover": {
                    bg: "rgba($bgRGB,0.5)",
                  },
                  "&>svg": {
                    size: 10,
                  },
                }}
                href={tweetHandler(
                  tweetText,
                  ["chroma", "inspring", "inspirational"],
                  "chroma"
                )}
                target="_blank"
                rel="noreferrer"
              >
                <TwitterOutlineIcon />
              </Box>
            </Flex>
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
