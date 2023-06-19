import React from "react";
import { SearchIcon } from "@components/icons";
import { Flex, IconButton, Text, Dialog } from "@components/base";
import useStore from "@store";
import CommandMenu from "../CommandMenu";
import { isRunningInExtension } from "@constants";

function Search() {
  const open = useStore((state) => state.searchOpen);
  const setOpen = useStore((state) => state.setSearchOpen);
  function openChange(open: boolean) {
    if (isRunningInExtension) {
      setOpen(open);
      return;
    }
    setOpen(false);
  }

  React.useEffect(() => {
    // Toggle the menu when ⌘K is pressed
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        openChange(true);
        e.preventDefault();
      }
      if (e.key === "Escape") {
        openChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Flex ai="center" jc="center">
      <Dialog open={open} onOpenChange={openChange}>
        <Dialog.Button asChild>
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
        </Dialog.Button>
        <Dialog.Content overlay>
          <CommandMenu />
        </Dialog.Content>
      </Dialog>
    </Flex>
  );
}

export default Search;
