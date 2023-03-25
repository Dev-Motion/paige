import React from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Flex, Text, IconButton, Popover } from "@components/base";
import { styled } from "stitches.config";
import useStore from "@store";
import { searchProviders, SearchProviders } from "@constants";
import search from "@utils/Search";
import {
  BookmarkIcon,
  GoogleIcon,
  More,
  SearchIcon,
  SuggestionIcon,
} from "@components/icons";
interface Link {
  id: string;
  url: string;
  title: string;
}

const CommandMenu = () => {
  const [open, setOpen, history, setHistory, searchProvider] = useStore(
    (state) => [
      state.searchOpen,
      state.setSearchOpen,
      state.history,
      state.setHistory,
      state.searchProvider,
    ]
  );
  const [inputValue, setInputValue] = React.useState("");
  const deferedInputValue = React.useDeferredValue(inputValue);
  const [bookmarks, setBookmarks] = React.useState<Link[]>([]);
  const [chromeHist, setChromeHist] = React.useState<Link[]>([]);

  function tabAction(url: string) {
    setHistory([...history, inputValue]);
    window.open(url, "_self");
  }
  function searchAction(query: string) {
    setHistory([...history, inputValue]);
    search(query, searchProvider);
  }
  React.useEffect(() => {
    // Toggle the menu when ⌘K is pressed
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        setOpen(true);
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
      const bookmarks: Link[] = results
        .map(({ id, title, url }) => {
          const complete = id && title && url;
          if (complete) {
            return {
              id,
              title,
              url,
            };
          }
        })
        .filter(Boolean);

      setBookmarks(bookmarks.slice(0, 3));
    });
    chrome.history.search({ text: deferedInputValue }, (results) => {
      const histRes: Link[] = results
        .map(({ id, title, url }) => {
          const complete = id && title && url;
          if (complete) {
            return {
              id,
              title,
              url,
            };
          }
        })
        .filter(Boolean);
      const titleSet = new Set<string>();
      histRes.forEach((hist) => {
        titleSet.add(hist.title);
      });
      const uniqueHist = Array.from(titleSet)
        .map((title) => {
          return histRes.find((hist) => hist.title === title);
        })
        .filter(Boolean);
      setChromeHist(uniqueHist.slice(0, 5));
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
            <StyledCommand label="Chroma web search" value={inputValue}>
              <Flex cmdk-chroma-header="">
                <SearchIcon />
                <Command.Input
                  value={inputValue}
                  onValueChange={setInputValue}
                  placeholder="Search Google or type a URL"
                  autoFocus
                />
                <Popover
                  content={
                    <Box css={{ width: 150 }}>
                      {searchProviders.map(({ name }) => (
                        <ProviderItem key={name} provider={name} />
                      ))}
                    </Box>
                  }
                >
                  <IconButton size="sm" bg="transparent">
                    <Text css={{ include: "screenReaderOnly" }}>
                      show search providers
                    </Text>
                    <More css={{ color: "White" }} />
                  </IconButton>
                </Popover>
              </Flex>
              <Command.List>
                <Box cmdk-chroma-items="">
                  {/* set empty to true if */}
                  <Command.Empty>{inputValue}</Command.Empty>
                  {chromeHist.length !== 0 && (
                    <Command.Group>
                      {chromeHist.map((h) => {
                        const baseUrl = h.url.split("//")[1].split("/")[0];

                        return (
                          <Command.Item
                            key={h.id}
                            value={h.title}
                            onSelect={() => tabAction(h.url)}
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
                              <Text fs="sm">{h.title}</Text>
                            </Flex>
                          </Command.Item>
                        );
                      })}
                    </Command.Group>
                  )}
                  <Command.Group>
                    <Command.Item
                      value={`"${inputValue}"`}
                      onSelect={() => searchAction(inputValue)}
                    >
                      <Flex
                        ai="center"
                        gap="2"
                        css={{
                          pl: "$5",
                        }}
                      >
                        <SuggestionIcon />
                        <Text fs="sm">{inputValue}</Text>
                      </Flex>
                    </Command.Item>
                  </Command.Group>
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
                          .split("//")[1]
                          .split("/")[0];

                        return (
                          <Command.Item
                            key={bookmark.id}
                            value={bookmark.title}
                            onSelect={() => tabAction(bookmark.url)}
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
                              <Text fs="sm">{bookmark.title}</Text>
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

function ProviderItem({ provider }: { provider: SearchProviders }) {
  const [searchProvider, setSearchProvider] = useStore((state) => [
    state.searchProvider,
    state.setSearchProvider,
  ]);
  const image = searchProviders.find((p) => p.name === provider)!.image;
  const selected = searchProvider === provider;
  console.log(`"${searchProvider}"`, `"${provider}"`);
  return (
    <Flex
      jc="between"
      css={{
        br: "$2",
        px: "$2",
        py: "$1",
        "&:hover": {
          bg: "rgba(255,255,255,0.5)",
        },
      }}
      ai="center"
      onClick={() => setSearchProvider(provider)}
    >
      <Flex gap="2" ai="center">
        <Box
          as="img"
          height="18"
          width="18"
          css={{ objectFit: "contain" }}
          src={image}
        />
        <Text fs="sm" as="span">
          {provider}
        </Text>
      </Flex>
      {selected && (
        <Box
          css={{
            size: 10,
            br: "$round",
            bg: "#4CBF3F",
          }}
        />
      )}
    </Flex>
  );
}

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
  $$borderColor: "#707070",
  width: "80vw",
  maxWidth: 540,
  color: "white",
  br: 25,
  overflow: "hidden",
  boxShadow: "0 0 0 1px $$borderColor",
  bg: "rgba(30, 30, 30, 0.5)",
  backdropFilter: "blur(50px)",
  "& [cmdk-chroma-header]": {
    px: "$4",
    py: "$2",
    ai: "center",
    gap: "$2",
    borderBottom: "1px solid $$borderColor",
    "& input": {
      appearance: "none",
      outline: "none",
      color: "white",
      fontSize: "$md",
      border: "none",
      bg: "transparent",
      flex: 1,
      height: 40,
    },
  },
  "& [cmdk-list]": {
    py: "$3",
  },
  "& [cmdk-chroma-items]": {
    px: "$4",
    spacey: "$4",
    "& [cmdk-item]": {
      py: "$2",
      br: "$2",
      "& p": {
        textOverflow: "ellipsis",

        /* Needed to make it work */
        overflow: "hidden",
        whiteSpace: "nowrap",
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
