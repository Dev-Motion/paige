import React from "react";
import { motion } from "framer-motion";
import { styled } from "stitches.config";
import { Box, Flex, Text } from "@components/base";
import { GalleryTabs } from "..";
import useStore from "@store";
import { availableThemes } from "@store/slices/themeSlice";

const ThemesTab = () => {
  return (
    <Box css={{ pt: "$4" }}>
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
      <GalleryTabs />
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
  const [theme, setTheme] = useStore((state) => [state.theme, state.setTheme]);
  return (
    <Flex jc="between" css={{ mt: "$2", maxWidth: "250px" }}>
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
