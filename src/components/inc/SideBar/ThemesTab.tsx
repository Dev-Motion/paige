import React from "react";
import { motion } from "framer-motion";
import { styled } from "stitches.config";
import { Box, Flex, Switch, Text } from "@components/base";
import { GalleryTabs } from "..";
import useStore from "@store";
import { availableThemes } from "@store/slices/themeSlice";
import ThemeCategories from "../ThemeCategories";

const ThemesTab = () => {
  const [autoTheme, setAutoTheme] = useStore((state) => [
    state.autoTheme,
    state.setAutoTheme,
  ]);
  return (
    <Box css={{ pt: "$8", spacey: "$2" }}>
      <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
        Themes
      </Text>
      <Text as="p" fs={{ "@initial": "sm", "@md": "md" }}>
        Personalize your themes here
      </Text>
      <Flex jc="between">
        <Text as="span" fs={{ "@initial": "xs", "@md": "sm" }}>
          Auto theme
        </Text>
        <Switch
          checked={autoTheme}
          onCheckedChange={(checked) => setAutoTheme(checked)}
        />
      </Flex>
      <ThemeChanger />
      <ThemeCategories />
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
  $$padding: "8px",
  border: "1.5px dashed $colors$text",
  height: "calc(100% + $$padding)",
  width: "calc(100% + $$padding)",
  position: "absolute",
  top: "calc(-$$padding / 2)",
  left: "calc(-$$padding / 2)",
});
const ThemeChanger = () => {
  const [theme, setTheme] = useStore((state) => [state.theme, state.setTheme]);
  return (
    <Box
      css={{
        bg: "rgba($bgRGB,0.1)",
        px: "$2",
        py: "$3",
        br: "$4",
        backdropFilter: "blur(10px)",
      }}
    >
      <Text as="span" fs={{ "@initial": "xs", "@md": "sm" }}>
        choose theme colors here
      </Text>
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
    </Box>
  );
};

export default ThemesTab;
