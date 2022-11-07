import React from "react";
import { styled } from "stitches.config";
import { AnimatePresence, motion } from "framer-motion";
import { More, SearchIcon } from "@component/icons";
const Box = styled(motion.div, {});
const Input = styled(motion.input, {
  bg: "transparent",
  appearance: "none",
  border: 0,
  outline: "none",
  height: "100%",
  color: "$text",
  paddingLeft: "$2",
});
const Label = styled(motion.label, {});
const Search = () => {
  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Box>
      <Box
        onClick={() => setActive((a) => !a)}
        css={{
          bs: "0 0 0 1px gainsboro",
          br: "$pill",
          px: "$3",
          py: "$3",
          display: "flex",
          ai: "center",
          jc: "center",
          width: "fit-content",
          backdropFilter: active ? "blur(40px)" : "none",
          transition: "backdrop-filter 0.3s ease-in-out",
        }}
      >
        <Label css={{ size: 25 }}>
          <SearchIcon css={{ size: 25 }} />
        </Label>
        <AnimatePresence>
          {active && (
            <>
              <Input
                key="input"
                onClick={(e) => e.stopPropagation()}
                initial={{ width: 0 }}
                animate={{ width: 400 }}
                exit={{ width: 0, transition: { duration: 0.5, delay: 0.1 } }}
                ref={(el) => el && el.focus()}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Box
                initial={{ opacity: 0, y: 10, x: "-100%" }}
                animate={{ opacity: 1, y: 0, x: "-100%" }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { duration: 0.1 },
                  width: 0,
                }}
                transition={{ delay: 0.3 }}
                as={motion.div}
                css={{ transform: "translateX(-100%)" }}
              >
                <More />
              </Box>
            </>
          )}
        </AnimatePresence>
      </Box>
      <Box css={{ position: "relative" }}>
        <AnimatePresence>{active && value && <Stagger />}</AnimatePresence>
      </Box>
    </Box>
  );
};

const Stagger = () => {
  return (
    <Box
      css={{
        display: "flex",
        position: "absolute",
        width: "100%",
        top: 0,
        fd: "column",
        gap: "$4",
        mt: "$4",
        height: 500,
      }}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <Box
          key={i}
          as={motion.div}
          initial={{ x: 20, scale: 0.8, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 0.8 }}
          transition={{ delay: i * 0.2 }}
          exit={{
            x: 20,
            scale: 0.8,
            opacity: 0,
            transition: { duration: 0.2, delay: (3 - i) * 0.2 },
          }}
          css={{
            bg: "White",
            opacity: 0.8,
            br: "$4",
            height: "40px",
            width: "100%",
          }}
        />
      ))}
    </Box>
  );
};

export default Search;
