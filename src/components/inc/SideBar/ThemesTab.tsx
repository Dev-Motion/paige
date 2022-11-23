import React from "react";
import { Box, Flex, Text } from "@components/base";
import { styled } from "stitches.config";
import { availableThemes, useTheme } from "@context/ThemeContext";
import { motion } from "framer-motion";

const ThemesTab = () => {
  return (
    <Box>
      <Box css={{ mb: "$4" }}>
        <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
          Themes
        </Text>
        <Text as="p" fs={{ "@initial": "sm", "@md": "md" }}>
          Personalize your themes here
        </Text>
      </Box>
      <Text as="span" fs={{ "@initial": "xs", "@md": "sm" }}>
        choose theme colors here
      </Text>
      <ThemeChanger />
    </Box>
  );
};

const ThemeButton = styled("button", {
  appearance: "none",
  size: 20,
  bg: "$$bg",
  position: "relative",
  border: "none",
});
const ActiveTheme = styled(motion.div, {
  $$padding: "10px",
  border: "2px dashed $$bg",
  height: "calc(100% + $$padding)",
  width: "calc(100% + $$padding)",
  position: "absolute",
  top: "calc(-$$padding / 2)",
  left: "calc(-$$padding / 2)",
});
const ThemeChanger = () => {
  const [theme, setTheme] = useTheme();
  return (
    <Flex jc="between" css={{ mt: "$1" }}>
      {availableThemes.map(({ name, color }) => {
        return (
          <ThemeButton
            key={name}
            css={{ $$bg: color }}
            onClick={() => setTheme(name)}
          >
            {theme == name && <ActiveTheme layoutId="active-theme" />}
          </ThemeButton>
        );
      })}
    </Flex>
  );
};

export default ThemesTab;
