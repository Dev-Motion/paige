import React from "react";
import { Command } from "cmdk";
import { motion } from "framer-motion";
import { Box } from "@components/base";
import { styled } from "stitches.config";
import useStore from "@store";

// const Dialog=

const CommandMenu = () => {
  const [open, setOpen] = useStore((state) => [
    state.searchOpen,
    state.setSearchOpen,
  ]);

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        setOpen(!open);
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const from = open ? { y: 100 } : { y: 0 };
  const to = open ? { y: 0 } : { y: 100 };

  return (
    <Overlay open={open} onClick={() => setOpen(false)}>
      <Box
        as={motion.div}
        initial={from}
        animate={to}
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          label="Global Command Menu"
          style={{
            width: 300,
            background: "white",
          }}
        >
          <Command.Input />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Letters">
              <Command.Item>a</Command.Item>
              <Command.Item>b</Command.Item>
              <Command.Separator />
              <Command.Item>c</Command.Item>
            </Command.Group>
            <Command.Item>Apple</Command.Item>
          </Command.List>
        </Command>
      </Box>
    </Overlay>
  );
};

const Overlay = styled(motion.div, {
  display: "grid",
  placeItems: "center",
  position: "fixed",
  inset: 0,
  bg: "rgba(0,0,0,0.5)",
  transition: "opacity 0.2s ease",
  backdropFilter: "blur(5px)",
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
