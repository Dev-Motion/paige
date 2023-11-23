import React from "react";
import { Box, Flex, Text } from "@components/base";
import { HeartIcon, SkipIcon, TwitterOutlineIcon } from "@components/icons";
import { HoverReveal } from "@components/inc";
import useStore from "@store";
import { useQuotes } from "@api/hooks";
import { Quote } from "@store/slices/QuotesSlice";
import { tweetHandler } from "@utils";
import { shallow } from "zustand/shallow";
import { withTour } from "@components/base/Tour";

function Quotes() {
  const {
    data: quote,
    isSuccess,
    refetch: getQuotes,
  } = useQuotes({
    select: (d) => ({ id: d._id, text: d.content, author: d.author }) as Quote,
  });

  const [favouriteQuotes, setFavouriteQuotes, showDailyMotivation] = useStore(
    (state) => [
      state.favouriteQuotes,
      state.setFavouriteQuotes,
      state.showDailyMotivation,
    ],
    shallow,
  );
  if (!isSuccess) return null;
  const tweetText = `I love this quote by ${quote.author}!
“${quote.text}”`;
  const favourite = favouriteQuotes.includes(quote);
  if (!showDailyMotivation) return null;
  return (
    <Box
      css={{
        include: "accessibleShadow",
        $$blur: "30px",
      }}
    >
      <HoverReveal>
        <HoverReveal.Header ta="center" fs="sm" fw="semibold">
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
                  fill: favourite ? "$text" : "transparent",
                },
              }}
              onClick={() => {
                if (!favourite) {
                  setFavouriteQuotes((quotes) => [...quotes, quote]);
                } else {
                  setFavouriteQuotes((quotes) =>
                    quotes.filter((q) => q.id !== quote.id),
                  );
                }
              }}
            >
              <Text srOnly>Add to favourite quotes</Text>
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
              <Text srOnly>Skip quote</Text>
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
                "chroma",
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
  );
}

export default withTour(Quotes, {
  name: "quotes",
  title: "Quotes",
  description: "Get inspired by daily quotes",
});
