import React from "react";
import {
  HeartIcon,
  Quotes,
  TwitterOutlineIcon,
  EditIcon,
} from "@components/icons";
import { tweetHandler } from "@utils";
import { Flex, Text, Box, IconButton } from "@components/base";
import { Quote } from "@store/slices/QuotesSlice";
import useStore from "@store";
import { shallow } from "zustand/shallow";

type QuoteCardProps =
  | {
      quote: Omit<Quote, "for">;
      editable?: false;
      onEdit?: never;
    }
  | { quote: Omit<Quote, "for">; editable: true; onEdit: (id: string) => void };

export function QuoteCard(props: QuoteCardProps) {
  const { id, text, author } = props.quote;
  const [favouriteQuotes, setFavouriteQuotes] = useStore(
    (state) => [state.favouriteQuotes, state.setFavouriteQuotes],
    shallow
  );
  const tweetText = `I love this quote by ${author}!
    “${text}”`;
  function isFavorite(quoteId: string) {
    return favouriteQuotes.some((favQuote) => favQuote.id === quoteId);
  }
  function ToggleFavorite(quoteId: string) {
    if (isFavorite(quoteId)) {
      setFavouriteQuotes(
        favouriteQuotes.filter((favQuote) => favQuote.id !== quoteId)
      );
    } else {
      setFavouriteQuotes([...favouriteQuotes, props.quote]);
    }
  }
  const favorite = isFavorite(id);
  return (
    <Flex
      fd="column"
      css={{
        bg: "rgba($bgRGB,0.8)",
        pd: "$3",
        br: "$4",
        position: "relative",
        isolation: "isolate",
        pt: "$6",
      }}
    >
      {props.editable && (
        <IconButton
          onClick={() => props.onEdit(id)}
          size="sm"
          css={{ position: "absolute", right: 0, top: 0 }}
        >
          <Text
            css={{
              include: "screenReaderOnly",
            }}
          >
            Edit todo
          </Text>
          <EditIcon />
        </IconButton>
      )}
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
      <Text
        fs="sm"
        css={{
          flex: 1,
        }}
      >
        {text}
      </Text>
      <Flex jc="between">
        <Text
          fs="xs"
          css={{
            mt: "$2",
            alignSelf: "center",
          }}
        >
          {author}
        </Text>
        <Flex ai="center">
          <IconButton size="xs" onClick={() => ToggleFavorite(id)}>
            <Text
              css={{
                include: "screenReaderOnly",
              }}
            >
              Add to favourite quotes
            </Text>
            <HeartIcon
              css={{
                size: "$3",
                color: favorite ? "$accent" : "$text",
                fill: favorite ? "$accent" : "none",
              }}
            />
          </IconButton>
          <IconButton
            size="xs"
            as="a"
            href={tweetHandler(
              tweetText,
              ["chroma", "inspring", "inspirational"],
              "chroma"
            )}
            target="_blank"
            rel="noreferrer"
          >
            <Text
              css={{
                include: "screenReaderOnly",
              }}
            >
              Share with a tweet
            </Text>
            <TwitterOutlineIcon css={{ size: "$3" }} />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
}
