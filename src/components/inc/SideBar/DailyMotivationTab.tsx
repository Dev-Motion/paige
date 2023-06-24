import React from "react";
import { Box, Flex, Switch, Text, Grid } from "@components/base";
import * as Tabs from "@radix-ui/react-tabs";
import TagInput from "../TagInput";
import useStore from "@store";
import { Quote } from "@store/slices/QuotesSlice";
import { HeartIcon, Quotes, TwitterOutlineIcon } from "@components/icons";
import { tweetHandler } from "@utils";
import { shallow } from "zustand/shallow";
import { motion } from "framer-motion";
import { styled } from "stitches.config";

const DailyMotivationTab = () => {
  const [currentTab, setCurrentTab] = React.useState("favorite-quotes");
  const [quoteKeywords, setQuoteKeywords, favouriteQuotes, setFavouriteQuotes] =
    useStore(
      (state) => [
        state.quoteKeywords,
        state.setQuoteKeywords,
        state.favouriteQuotes,
        state.setFavouriteQuotes,
      ],
      shallow
    );
  function isFavorite(quote: Quote) {
    return favouriteQuotes.some((favQuote) => favQuote.id === quote.id);
  }
  function ToggleFavorite(quote: Quote) {
    if (isFavorite(quote)) {
      setFavouriteQuotes(
        favouriteQuotes.filter((favQuote) => favQuote.id !== quote.id)
      );
    } else {
      setFavouriteQuotes([...favouriteQuotes, quote]);
    }
  }
  return (
    <Box css={{ py: "$5", spacey: "$5" }}>
      <Box>
        <Text as="h1" fs="lg" fw="bold">
          Daily motivation
        </Text>
        <Text as="p" fs="xs" css={{ mt: 8 }}>
          Positive thought to change your whole day
        </Text>
      </Box>
      <Box css={{ spacey: "$2" }}>
        <Text as="h2" fs="sm" fw="semibold">
          Quotes category
        </Text>
        <TagInput tags={quoteKeywords} setTags={setQuoteKeywords} />
      </Box>
      <TabRoot
        value={currentTab}
        onValueChange={setCurrentTab}
        css={{ spacey: "$2" }}
      >
        <TabList>
          <TabTrigger value="favorite-quotes">
            Favorite quotes
            {currentTab === "favorite-quotes" && (
              <TabUnderline layoutId="quote-btn-underline" />
            )}
          </TabTrigger>
          <TabTrigger value="custom-quotes">
            Custom quotes
            {currentTab === "custom-quotes" && (
              <TabUnderline layoutId="quote-btn-underline" />
            )}
          </TabTrigger>
        </TabList>
        <Tabs.Content value="favorite-quotes">
          <Grid
            columns={{ "@initial": 1, "@lg": 2 }}
            gap="2"
            css={{ pt: "$2" }}
          >
            {favouriteQuotes.map((quote, index) => {
              const tweetText = `I love this quote by ${quote.author}!
          “${quote.text}”`;
              const favorite = isFavorite(quote);
              return (
                <Flex
                  fd="column"
                  key={index}
                  css={{
                    bg: "rgba($bgRGB,0.8)",
                    pd: "$3",
                    br: "$4",
                    position: "relative",
                    isolation: "isolate",
                  }}
                >
                  <Quotes
                    css={{
                      position: "absolute",
                      zIndex: -1,
                      size: "$6",
                      opacity: 0.2,
                      top: 4,
                      left: 4,
                    }}
                  />
                  <Text fs="sm" css={{ flex: 1 }}>
                    {quote.text}
                  </Text>
                  <Flex jc="between" ai="center">
                    <Text fs="xs" css={{ mt: "$1" }}>
                      {quote.author}
                    </Text>
                    <Flex ai="center">
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
                            bg: "rgba($textRGB,0.3)",
                          },
                          "&>svg": {
                            size: 10,
                            fill: favorite ? "$text" : "transparent",
                          },
                        }}
                        onClick={() => ToggleFavorite(quote)}
                      >
                        <Text css={{ include: "screenReaderOnly" }}>
                          Add to favourite quotes
                        </Text>
                        <HeartIcon />
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
                            bg: "rgba($textRGB,0.3)",
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
                  </Flex>
                </Flex>
              );
            })}
          </Grid>
        </Tabs.Content>
        <Tabs.Content value="custom-quotes">Hello</Tabs.Content>
      </TabRoot>
    </Box>
  );
};

const TabRoot = styled(Tabs.Root, {});
const TabList = styled(Tabs.List, {
  bg: "transparent",
  mt: "$1",
  display: "flex",
  gap: "$2",
});
const TabTrigger = styled(Tabs.Trigger, {
  include: "buttonReset",
  position: "relative",
  color: "$text",
  py: "$1",
  minWidth: 80,
  fontSize: "$sm",
  fontWeight: 600,
});

const TabUnderline = styled(motion.div, {
  position: "absolute",
  bottom: 0,
  height: 2,
  bg: "$accent",
  br: "$pill",
  width: "100%",
});

export default DailyMotivationTab;
