import { Box, Card, Flex, IconButton, Popover, Text } from "@components/base";
import { MoreIcon, SearchIcon } from "@components/icons";
import { SearchProviders, searchProviders } from "@constants";
import useStore from "@store";
import { faviconURL } from "@utils";
import search from "@utils/Search";
import { getPrefix, searchEngine, searchPrefixes } from "@utils/searchEngine";
import { Command } from "cmdk";
import React from "react";
import { keyframes, styled } from "stitches.config";
import { motion } from "framer-motion";
interface Link {
  id: string;
  url: string;
  title: string;
}

type Links = {
  history: Link[];
  bookmarks: Link[];
  tabs: Link[];
};
const defaultLinks: Links = {
  history: [],
  bookmarks: [],
  tabs: [],
};

const CommandMenu = () => {
  const searchProvider = useStore((state) => state.searchProvider);
  const [inputValue, setInputValue] = React.useState("");
  const deferedInputValue = React.useDeferredValue(inputValue);
  const [links, setLinks] = React.useState(defaultLinks);

  const prefix = getPrefix(inputValue);
  const providerLogo =
    searchProviders.find((p) => p.name === searchProvider)?.image ??
    searchProviders[0].image;
  function tabAction(
    url: string,
    tab?: {
      id: string;
    },
  ) {
    if (tab) {
      chrome.tabs.update(parseInt(tab.id), { active: true });
      return;
    }
    window.open(url, "_self");
  }
  function searchAction(query: string) {
    search(query, searchProvider);
  }

  React.useEffect(() => {
    searchEngine(deferedInputValue).then((links) => {
      setLinks(links);
    });
  }, [deferedInputValue]);

  return (
    <StyledCommand
      label="Chroma web search"
      onClick={(e) => e.stopPropagation()}
      shouldFilter={false}
    >
      <Flex as="header" cmdk-chroma-header="">
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
              <Text srOnly>show search providers</Text>
              <MoreIcon css={{ color: "White" }} />
            </IconButton>
          </Popover.Button>
          <Popover.Content>
            <Card css={{ width: 150, overflow: "hidden" }}>
              {searchProviders.map(({ name }) => (
                <ProviderItem key={name} provider={name} />
              ))}
            </Card>
            <Popover.Arrow />
          </Popover.Content>
        </Popover>
      </Flex>
      <Flex fd="column" css={{ flex: "1 1 auto", overflow: "auto" }}>
        <Command.List>
          <Box cmdk-chroma-items="">
            {inputValue && !prefix && (
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
            {Object.keys(links).map((key) => {
              const group = key as keyof Links;
              const groupLinks = links[group];
              if (groupLinks.length === 0) return null;
              return (
                <Command.Group key={group} heading={group}>
                  {groupLinks.slice(0, 5).map((link) => {
                    return (
                      <Command.Item
                        key={group + link.id}
                        value={group + link.title}
                        onSelect={() =>
                          group === "tabs"
                            ? tabAction(link.url, {
                              id: link.id,
                            })
                            : tabAction(link.url)
                        }
                      >
                        <Flex
                          layoutId={group + link.id}
                          as={motion.div}
                          ai="center"
                          gap="2"
                        >
                          <Box
                            as="img"
                            css={{
                              size: "$5",
                              br: "50%",
                            }}
                            src={faviconURL(link.url)}
                          />
                          <Text fs="sm">{link.title}</Text>
                        </Flex>
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              );
            })}
          </Box>
        </Command.List>
      </Flex>
      <Flex gap="2" jc="between" ai="center" cmdk-chroma-footer="">
        <Box as="img" src="/logo/64x64.png" css={{ size: 24 }} />
        <Box css={{ width: 1, height: "80%", bg: "$$borderColor" }} />
        <Flex
          gap="2"
          ai="center"
          css={{
            flex: 1,
          }}
        >
          <Text fs="sm">Filter by:</Text>
          <Flex gap="1">
            {Object.keys(searchPrefixes).map((key) => {
              const prefixKey = key as keyof typeof searchPrefixes;
              const inputPrefix = prefix?.prefix;
              const active = inputPrefix ? inputPrefix === prefixKey : false;
              return (
                <FilterTag
                  key={prefixKey}
                  active={active}
                  onClick={() => {
                    if (inputPrefix) {
                      const newInputValue = inputValue.replace(
                        searchPrefixes[inputPrefix],
                        "",
                      );
                      setInputValue(searchPrefixes[prefixKey] + newInputValue);
                    } else {
                      setInputValue(searchPrefixes[prefixKey] + inputValue);
                    }
                  }}
                >
                  {key}
                </FilterTag>
              );
            })}
          </Flex>
        </Flex>
        <Box css={{ width: 1, height: "80%", bg: "$$borderColor" }} />
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

export default CommandMenu;

const slideIn = keyframes({
  "0%": { transform: "translateY(50%)" },
  "100%": { transform: "translateY(0%)" },
});
const FilterTag = styled("button", {
  include: "buttonReset",
  fontSize: "$sm",
  color: "white",
  br: "$1",
  pd: "$1 $2",
  bg: "rgba(0,0,0,0.4)",
  display: "flex",
  textTransform: "capitalize",
  variants: {
    active: {
      true: {
        bg: "$accent",
        color: "white",
      },
    },
  },
});
const StyledCommand = styled(Command, {
  $$borderColor: "#707070",
  display: "flex",
  fd: "column",
  width: "100%",
  maxWidth: 758,
  minHeight: 0,
  m: "0 auto",
  animation: `${slideIn} .5s ease-in-out`,
  color: "white",
  br: 8,
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

        /* Needed to make the overflow work */
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
      textTransform: "capitalize",
    },
  },
  "& [cmdk-chroma-footer]": {
    borderTop: "1px solid $$borderColor",
    px: "$4",
    py: "$2",
  },
});
