import React from "react";
import { motion } from "framer-motion";
import { styled } from "stitches.config";
import { Box, Flex, Switch, Text } from "@components/base";
import { GalleryTabs } from "..";
import useStore from "@store";
import { availableThemes } from "@store/slices/themeSlice";
import ThemeCategories from "../ThemeCategories";

const ThemesTab = () => {
  const autoTheme = useStore((state) => state.autoTheme);
  const setAutoTheme = useStore((state) => state.setAutoTheme);
  return (
    <Box css={{ pt: "$8", pb: "$5", spacey: "$5" }}>
      <Box>
        <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
          Themes
        </Text>
        <Text as="p" fs={{ "@initial": "sm", "@md": "md" }} css={{ mt: 8 }}>
          Personalize your themes here
        </Text>
      </Box>
      <Box>
        <Flex jc="between" css={{ mb: 8 }}>
          <Text as="span" fs={{ "@initial": "xs", "@md": "sm" }}>
            Auto theme
          </Text>
          <Switch
            checked={autoTheme}
            onCheckedChange={(checked) => setAutoTheme(checked)}
          />
        </Flex>
        <ThemeChanger />
      </Box>
      <Box>
        <ThemeCategories />
        <GalleryTabs />
      </Box>
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
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
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
        Choose theme colors
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
