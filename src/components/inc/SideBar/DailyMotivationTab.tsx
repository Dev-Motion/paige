import React from "react";
import { Box, Flex, Switch, Text, Grid } from "@components/base";
import TagInput from "../TagInput";
import useStore from "@store";
import { Quote } from "@store/slices/QuotesSlice";
import { HeartIcon, TwitterOutlineIcon } from "@components/icons";
import { tweetHandler } from "@utils";

const DailyMotivationTab = () => {
  const [quoteKeywords, setQuoteKeywords, favouriteQuotes, setFavouriteQuotes] =
    useStore((state) => [
      state.quoteKeywords,
      state.setQuoteKeywords,
      state.favouriteQuotes,
      state.setFavouriteQuotes,
    ]);
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
    <Box css={{ pt: "$8", pb: "$5", spacey: "$5" }}>
      <Box>
        <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
          Daily motivation
        </Text>
        <Text as="p" fs={{ "@initial": "sm", "@md": "md" }} css={{ mt: 8 }}>
          Positive thought to change your whole day
        </Text>
      </Box>
      <Box css={{ spacey: "$2" }}>
        <Text as="h2" fs="md" fw="medium">
          Quotes category
        </Text>
        <TagInput tags={quoteKeywords} setTags={setQuoteKeywords} />
      </Box>
      <Box css={{ spacey: "$2" }}>
        <Text as="h2" fs="md" fw="medium">
          Favorite quotes
        </Text>
        <Grid columns={{ "@initial": 1, "@lg": 2 }} gap="2" css={{ pt: "$2" }}>
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
                }}
              >
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
      </Box>
    </Box>
  );
};

export default DailyMotivationTab;
