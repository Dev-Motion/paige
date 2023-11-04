import React from "react";
import { SearchIcon } from "@components/icons";
import { Flex, IconButton, Text, Dialog } from "@components/base";
import useStore from "@store";
import CommandMenu from "../CommandMenu";
import { isRunningInExtension } from "@constants";
import { styled } from "stitches.config";
import { animation } from "@utils";
import * as RadixDialog from "@radix-ui/react-dialog";

const { fadeIn } = animation;

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
            <Text srOnly>Search Google</Text>
          </IconButton>
        </Dialog.Button>

        <RadixDialog.Portal>
          <DialogContent onClick={() => setOpen(false)}>
            <CommandMenu />
          </DialogContent>
        </RadixDialog.Portal>
      </Dialog>
    </Flex>
  );
}

export default Search;

const DialogContent = styled(RadixDialog.Content, {
  height: "100vh",
  width: "100vw",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  top: 0,
  left: 0,
  backdropFilter: "blur(4px)",
  animation: `${fadeIn} .5s ease-in-out`,
  animationFillMode: "forwards",
  "@sm": {
    pd: "1.5rem",
  },
  "@md": {
    pd: "10vh",
  },
  "@lg": {
    pd: "12vh",
  },
});
