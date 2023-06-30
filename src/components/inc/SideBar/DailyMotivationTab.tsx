import { Box, Card, Flex, Grid, Text } from "@components/base";
import { Button } from "@components/base/Button";
import * as Tabs from "@radix-ui/react-tabs";
import useStore from "@store";
import { motion } from "framer-motion";
import React from "react";
import { styled } from "stitches.config";
import { shallow } from "zustand/shallow";
import { QuoteCard } from "../QuoteCard";
import TagInput from "../TagInput";

const DailyMotivationTab = () => {
  const [currentTab, setCurrentTab] = React.useState("favorite-quotes");
  const [quoteKeywords, setQuoteKeywords, favouriteQuotes] = useStore(
    (state) => [
      state.quoteKeywords,
      state.setQuoteKeywords,
      state.favouriteQuotes,
    ],
    shallow
  );

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
              return <QuoteCard key={index} quote={quote} />;
            })}
          </Grid>
        </Tabs.Content>
        <Tabs.Content value="custom-quotes">
          <CustomQuotesTab />
        </Tabs.Content>
      </TabRoot>
    </Box>
  );
};

function CustomQuotesTab() {
  const customQuotes = useStore((state) => state.customQuotes);
  const [showInput, setShowInput] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);

  if (customQuotes.length === 0) {
    return (
      <>
        {showInput ? (
          <AddCustomQuotes />
        ) : (
          <Card
            css={{
              mt: "$2",
              display: "flex",
              fd: "column",
              ai: "center",
              pd: "$4",
              gap: "$2",
              width: "80%",
              mx: "auto",
            }}
          >
            <Text as="h2" fs="sm" css={{ ta: "center" }}>
              You currently do not have custom quotes
            </Text>
            <Button size="xs" color="accent" onClick={() => setShowInput(true)}>
              add Quotes
            </Button>
          </Card>
        )}
      </>
    );
  }
  if (editId) {
    return (
      <UpdateCustomQuotes editId={editId} onComplete={() => setEditId(null)} />
    );
  }
  return (
    <Box>
      <Grid
        columns={{ "@initial": 1, "@lg": 2 }}
        gap="2"
        css={{ pt: "$2", mb: "$2" }}
      >
        {customQuotes.map((quote, index) => {
          return (
            <QuoteCard
              key={index}
              editable
              onEdit={(id) => setEditId(id)}
              quote={quote}
            />
          );
        })}
      </Grid>
      {showInput ? (
        <AddCustomQuotes onComplete={() => setShowInput(false)} />
      ) : (
        <Flex jc="end">
          <Button color="accent" size="xs" onClick={() => setShowInput(true)}>
            Add new quote
          </Button>
        </Flex>
      )}
    </Box>
  );
}
// Add a new Custom Quote
function AddCustomQuotes({ onComplete }: { onComplete?: () => void }) {
  const [newQuote, setNewQuote] = React.useState({ text: "", author: "" });
  const [customQuotes, setCustomQuotes] = useStore(
    (state) => [state.customQuotes, state.setCustomQuotes],
    shallow
  );
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newQuote.text) {
      const quote = {
        text: newQuote.text,
        author: newQuote.author ? newQuote.author : "Unknown",
      };
      setCustomQuotes([...customQuotes, { id: crypto.randomUUID(), ...quote }]);
      clear();
      onComplete?.();
    }
  }
  function clear() {
    setNewQuote({ text: "", author: "" });
  }
  return (
    <Box
      as="form"
      css={{
        mt: "$2",
        display: "flex",
        fd: "column",
        gap: "$2",
      }}
      onSubmit={onSubmit}
    >
      <Flex fd="column" gap="1">
        <Text as="label" fs="sm" fw="medium" htmlFor="quote">
          Quote
        </Text>
        <QuoteInput
          id="quote"
          name="quote"
          rows={6}
          value={newQuote.text}
          onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
          placeholder="Type a quote here..."
        />
      </Flex>
      <Flex fd="column" gap="1">
        <Text as="label" fs="sm" fw="medium" htmlFor="author">
          Author
        </Text>

        <QuoteInput
          as="input"
          id="author"
          name="author"
          value={newQuote.author}
          onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
          type="text"
          placeholder="Add authors name here..."
        />
      </Flex>
      <Flex gap="1" jc="end">
        <Button type="button" size="sm" kind="ghost">
          Clear
        </Button>
        <Button type={"submit"} size="sm" color="accent">
          Save
        </Button>
      </Flex>
    </Box>
  );
}

// Update a Custom Quote
function UpdateCustomQuotes({
  onComplete,
  editId,
}: {
  onComplete?: () => void;
  editId: string;
}) {
  const [customQuotes, setCustomQuotes] = useStore(
    (state) => [state.customQuotes, state.setCustomQuotes],
    shallow
  );
  const quote = customQuotes.find((quote) => quote.id === editId) ?? {
    text: "",
    author: "",
  };
  const [newQuote, setNewQuote] = React.useState({
    text: quote.text,
    author: quote.author,
  });
  return (
    <Box
      as="form"
      css={{
        mt: "$2",
        display: "flex",
        fd: "column",
        gap: "$2",
      }}
    >
      <Flex fd="column" gap="1">
        <Text as="label" fs="sm" fw="medium" htmlFor="quote">
          Quote
        </Text>
        <QuoteInput
          id="quote"
          name="quote"
          rows={6}
          value={newQuote.text}
          onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
          placeholder="Type a quote here..."
        />
      </Flex>
      <Flex fd="column" gap="1">
        <Text as="label" fs="sm" fw="medium" htmlFor="author">
          Author
        </Text>
        <QuoteInput
          id="author"
          name="author"
          value={newQuote.author}
          onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
          placeholder="Type the author here..."
        />
      </Flex>
      <Flex jc="end" gap="1">
        <Button
          type="button"
          kind="ghost"
          color="accent"
          size="xs"
          onClick={() => {
            setCustomQuotes(
              customQuotes.filter((quote) => quote.id !== editId)
            );
            onComplete?.();
          }}
        >
          Delete
        </Button>
        <Button
          type="button"
          color="accent"
          size="xs"
          onClick={() => {
            setCustomQuotes(
              customQuotes.map((quote) => {
                if (quote.id === editId) {
                  return { ...quote, ...newQuote };
                }
                return quote;
              })
            );
            onComplete?.();
          }}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
}

// Styles
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
const QuoteInput = styled("textarea", {
  apprearance: "none",
  bg: "$bg",
  color: "$text",
  br: "$3",
  maxWidth: "100%",
  border: "none",
  outline: "none",
  pd: "$2",
  "&:focus": {
    boxShadow: "0 0 0 2px $colors$accent inset",
  },
  "&::placeholder": {
    color: "$text",
  },
});

export default DailyMotivationTab;
