import React from "react";
import { SearchIcon } from "@components/icons";
import { Flex, IconButton, Text } from "@components/base";
import useStore from "@store";
import CommandMenu from "../CommandMenu";

const isRunningInExtension =
  window.chrome && chrome.runtime && chrome.runtime.id ? true : false;

function Search() {
  const [open, setOpen] = useStore((state) => [
    state.searchOpen,
    state.setSearchOpen,
  ]);
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
  return (
    <Flex ai="center" jc="center">
      <IconButton
        size="md"
        bg="bgLight"
        css={{
          backdropFilter: "blur(10px)",
          border: "1px solid $bg",
          include: "accessibleShadow",
        }}
        onClick={() => setOpen(!open)}
      >
        <SearchIcon css={{ path: { stroke: "$text !important" } }} />
        <Text css={{ include: "screenReaderOnly" }}>Search Google</Text>
      </IconButton>
      {isRunningInExtension && <CommandMenu {...{ open, setOpen }} />}
    </Flex>
  );
}

export default Search;
