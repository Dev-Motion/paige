import { Box, Flex, IconButton, Popover, Text } from "@components/base";
import { HistoryIcon, MoreIcon, SearchIcon } from "@components/icons";
import { SearchProviders, searchProviders } from "@constants";
import useStore from "@store";
import { faviconURL } from "@utils";
import search from "@utils/Search";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { styled } from "stitches.config";
interface Link {
  id: string;
  url: string;
  title: string;
}

const CommandMenu = () => {
  const [history, setHistory, searchProvider] = useStore((state) => [
    state.history,
    state.setHistory,
    state.searchProvider,
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const deferedInputValue = React.useDeferredValue(inputValue);
  const [bookmarks, setBookmarks] = React.useState<Link[]>([]);
  const [chromeHist, setChromeHist] = React.useState<Link[]>([]);
  const providerLogo = searchProviders.find(
    (p) => p.name === searchProvider
  )!.image;
  function tabAction(url: string) {
    window.open(url, "_self");
  }
  function searchAction(query: string) {
    if (inputValue.trim()) {
      setHistory([...history, inputValue]);
    }
    search(query, searchProvider);
  }

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
    <StyledCommand label="Chroma web search">
      <Flex cmdk-chroma-header="">
        <SearchIcon />
        <Command.Input
          value={inputValue}
          onValueChange={setInputValue}
          placeholder={`Search ${searchProvider} or type a URL`}
          autoFocus
        />
        <Popover>
          <Popover.Button asChild>
            <IconButton size="sm" bg="transparent">
              <Text css={{ include: "screenReaderOnly" }}>
                show search providers
              </Text>
              <MoreIcon css={{ color: "White" }} />
            </IconButton>
          </Popover.Button>
          <Popover.Content>
            <Box css={{ width: 150 }}>
              {searchProviders.map(({ name }) => (
                <ProviderItem key={name} provider={name} />
              ))}
            </Box>
            <Popover.Arrow />
          </Popover.Content>
        </Popover>
      </Flex>
      <Command.List>
        <Box cmdk-chroma-items="">
          {inputValue && (
            <Command.Group heading="Recent">
              {history.slice(0, 3).map((h) => {
                return (
                  <Command.Item
                    key={"recent: " + h}
                    value={h}
                    onSelect={() => searchAction(h)}
                  >
                    <Flex ai="center" gap="2">
                      <HistoryIcon />
                      <Text fs="sm">{h}</Text>
                    </Flex>
                  </Command.Item>
                );
              })}
            </Command.Group>
          )}
          <Command.Group heading="History">
            {chromeHist.map((h) => {
              return (
                <Command.Item
                  key={"hist: " + h.id}
                  value={"hist: " + h.title}
                  onSelect={() => tabAction(h.url)}
                >
                  <Flex ai="center" gap="2">
                    <Box
                      as="img"
                      css={{
                        size: "$5",
                        br: "50%",
                      }}
                      src={faviconURL(h.url)}
                    />
                    <Text fs="sm">{h.title}</Text>
                  </Flex>
                </Command.Item>
              );
            })}
          </Command.Group>
          {inputValue && (
            <Command.Group heading="Search">
              <Command.Item
                value={`"${inputValue}"`}
                onSelect={() => searchAction(inputValue)}
              >
                <Flex ai="center" gap="2">
                  <Box
                    as="img"
                    src={providerLogo}
                    height="25"
                    width="25"
                    css={{
                      objectFit: "cover",
                    }}
                  />
                  <Text fs="sm">
                    {inputValue}{" "}
                    <Text as="span" css={{ color: "Gray" }}>
                      - {searchProvider} Search
                    </Text>
                  </Text>
                </Flex>
              </Command.Item>
            </Command.Group>
          )}
          {bookmarks.length !== 0 && (
            <Command.Group heading={"Bookmarks"}>
              {bookmarks.map((bookmark) => {
                return (
                  <Command.Item
                    key={"bookmark: " + bookmark.id}
                    value={"bookmark: " + bookmark.title}
                    onSelect={() => tabAction(bookmark.url)}
                  >
                    <Flex ai="center" gap="2">
                      <Box
                        as="img"
                        css={{
                          size: "$5",
                          br: "50%",
                        }}
                        src={faviconURL(bookmark.url)}
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
      <Flex
        jc="between"
        ai="center"
        cmdk-chroma-footer=""
        css={{
          pd: "$4",
        }}
      >
        <Box as="img" src="/logo/64x64.png" css={{ size: 24 }} />

        <Flex
          gap="2"
          ai="center"
          css={{
            "& kbd": {
              fontSize: "$md",
              br: "$1",
              size: "$5",
              bg: "rgba(0,0,0,0.4)",
              display: "grid",
              placeItems: "center",
            },
          }}
        >
          <Text>Shortcut</Text>
          <Flex gap="1">
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </Flex>
        </Flex>
      </Flex>
    </StyledCommand>
  );
};

export function ProviderItem({ provider }: { provider: SearchProviders }) {
  const searchProvider = useStore((state) => state.searchProvider);
  const setSearchProvider = useStore((state) => state.setSearchProvider);
  const image = searchProviders.find((p) => p.name === provider)!.image;
  const selected = searchProvider === provider;
  return (
    <Flex
      jc="between"
      css={{
        br: "$2",
        px: "$2",
        py: "$1",
        "&:hover": {
          bg: "rgba(255,255,255,0.3)",
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
        <Text fs="sm" fw="semibold" as="span">
          {provider}
        </Text>
      </Flex>
      {selected && (
        <Box
          css={{
            size: 10,
            br: "$round",
            bg: "$accent",
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
      px: "$3",
      ml: "$2",
      br: "$2",
      "& p": {
        textOverflow: "ellipsis",

        /* Needed to make it work */
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
      "&[aria-selected='true'], &:hover": {
        bg: "rgba(256,256,256,0.3)",
        "& span": {
          color: "white",
        },
      },
    },
    "& [cmdk-group-heading]": {
      opacity: 0.8,
      mb: "$2",
    },
  },
});
