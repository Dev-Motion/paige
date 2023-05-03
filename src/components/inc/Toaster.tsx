import { Card, Text, Flex } from "@components/base";
import useStore from "@store";
import Portal from "@utils/Portals";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Toaster() {
  const [activeToast, removeToast] = useStore((state) => [
    state.activeToasts,
    state.removeToast,
  ]);

  return (
    <Portal root="modal_root">
      <Flex
        fd="column"
        gap="2"
        css={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          zIndex: "$max",
        }}
      >
        <AnimatePresence initial={false}>
          {activeToast.map((toast) => (
            <Card
              key={toast.id}
              layoutId={toast.id}
              as={motion.div}
              initial={{
                x: "100%",
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: "100%",
                opacity: 0,
                transition: {
                  type: "tween",
                },
              }}
              css={{
                py: "$4",
                px: "$2",
              }}
              onClick={() => removeToast(toast.id)}
            >
              <Text color="text" fs="sm">
                {toast.message}
              </Text>
            </Card>
          ))}
        </AnimatePresence>
      </Flex>
    </Portal>
  );
}
