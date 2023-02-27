import React from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Flex, Text } from "@components/base";
import { styled } from "stitches.config";
import useStore from "@store";

import {
  BookmarkIcon,
  More,
  SearchIcon,
  SuggestionIcon,
  TwitterOutlineIcon,
} from "@components/icons";

const CommandMenu = () => {
  const [open, setOpen] = useStore((state) => [
    state.searchOpen,
    state.setSearchOpen,
  ]);
  const [filterValue, setFilterValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const deferedInputValue = React.useDeferredValue(inputValue);
  const [bookmarks, setBookmarks] = React.useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [history, setHistory] = React.useState<chrome.history.HistoryItem[]>(
    []
  );
  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        setOpen(true);
        console.log("pressed ctrl-k");
        e.preventDefault();
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  React.useEffect(() => {
    chrome.bookmarks.search(deferedInputValue, (results) => {
      setBookmarks(results.slice(0, 3));
    });
    chrome.history.search({ text: deferedInputValue }, (results) => {
      setHistory(results.slice(0, 5));
    });
  }, [deferedInputValue]);

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={() => setOpen(false)}
        >
          <Box
            as={motion.div}
            initial={{
              y: 100,
              height: "auto",
            }}
            exit={{
              y: 100,
            }}
            animate={{
              y: 0,
              height: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
            id="hey"
          >
            <StyledCommand
              label="Chroma web search"
              value={filterValue}
              onValueChange={(v) => setFilterValue(v)}
            >
              <Flex cmdk-chroma-header="">
                <SearchIcon />
                <Command.Input
                  value={inputValue}
                  onValueChange={setInputValue}
                  autoFocus
                />
                <More />
              </Flex>
              <Command.List>
                <Box cmdk-chroma-items="">
                  {/* set empty to true if */}
                  <Command.Empty>{inputValue}</Command.Empty>
                  {history.length !== 0 && (
                    <Command.Group>
                      {history.map((hist) => {
                        const baseUrl = hist.url?.split("//")[1].split("/")[0];

                        return (
                          <Command.Item
                            key={hist.id}
                            value={hist.title}
                            onSelect={() => window.open(hist.url)}
                          >
                            <Flex
                              ai="center"
                              gap="2"
                              css={{
                                pl: "$5",
                              }}
                            >
                              <Box
                                as="img"
                                css={{
                                  size: "$5",
                                  br: "50%",
                                }}
                                src={`https://www.google.com/s2/favicons?domain=${baseUrl}&sz=128`}
                              />
                              <Text>{hist.title}</Text>
                            </Flex>
                          </Command.Item>
                        );
                      })}
                    </Command.Group>
                  )}
                  {/* <Command.Group
                    heading={
                      <Flex>
                        <SuggestionIcon />
                        <Text>Suggestions</Text>
                      </Flex>
                    }
                  >
                    <Command.Item value="hello">
                      <Flex
                        ai="center"
                        gap="2"
                        css={{
                          pl: "$5",
                        }}
                      >
                        <TwitterOutlineIcon css={{ size: 15 }} />
                        <Text>hello </Text>
                      </Flex>
                    </Command.Item>
                  </Command.Group> */}
                  {bookmarks.length !== 0 && (
                    <Command.Group
                      heading={
                        <Flex>
                          <BookmarkIcon />
                          <Text>Bookmarks</Text>
                        </Flex>
                      }
                    >
                      {bookmarks.map((bookmark) => {
                        const baseUrl = bookmark.url
                          ?.split("//")[1]
                          .split("/")[0];

                        return (
                          <Command.Item
                            key={bookmark.id}
                            value={bookmark.title}
                            onSelect={(value) => window.open(bookmark.url)}
                          >
                            <Flex
                              ai="center"
                              gap="2"
                              css={{
                                pl: "$5",
                              }}
                            >
                              <Box
                                as="img"
                                css={{
                                  size: "$5",
                                  br: "50%",
                                }}
                                src={`https://www.google.com/s2/favicons?domain=${baseUrl}&sz=128`}
                              />
                              <Text>{bookmark.title}</Text>
                            </Flex>
                          </Command.Item>
                        );
                      })}
                      {/* <Command.Separator /> */}
                    </Command.Group>
                  )}
                </Box>
              </Command.List>
            </StyledCommand>
          </Box>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div, {
  display: "grid",
  placeItems: "center",
  position: "fixed",
  inset: 0,
  bg: "rgba(0,0,0,0.5)",
  transition: "opacity 0.2s ease",
  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: "all",
      },
      false: {
        opacity: 0,
        pointerEvents: "none",
      },
    },
  },
});
export default CommandMenu;

const StyledCommand = styled(Command, {
  bg: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(10px)",
  width: "40vw",
  color: "$text",
  br: "$4",
  pb: "$3",
  boxShadow: "0 0 0 1px gainsboro",
  "& [cmdk-chroma-header]": {
    px: "$4",
    py: "$2",
    ai: "center",
    gap: "$2",
    "& input": {
      appearance: "none",
      outline: "none",
      color: "$text",
      fontSize: "$md",
      border: "none",
      bg: "transparent",
      flex: 1,
      height: 40,
    },
  },
  "& [cmdk-chroma-items]": {
    px: "$4",
    spacey: "$4",
    "& [cmdk-item]": {
      py: "$2",
      br: "$2",
      "&:hover": {
        bg: "rgba(256,256,256,0.3)",
      },
      "&[aria-selected='true']": {
        bg: "rgba(256,256,256,0.3)",
      },
    },
    "& [cmdk-group-heading]": {
      opacity: 0.8,
    },
  },
});
