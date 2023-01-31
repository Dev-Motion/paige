import React from "react";
import { SearchIcon } from "@components/icons";
import { Flex, IconButton, Text } from "@components/base";
import useStore from "@store";

function Search() {
  const [open, setOpen] = useStore((state) => [
    state.searchOpen,
    state.setSearchOpen,
  ]);
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
    </Flex>
  );
}

export default Search;
