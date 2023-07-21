import React from "react";
import { motion } from "framer-motion";
import { styled } from "stitches.config";
import { Box, Flex, Switch, Text } from "@components/base";
import { GalleryTabs } from "..";
import useStore from "@store";
import { availableAccents } from "@constants/themes";
import ThemeCategories from "../ThemeCategories";
import { shallow } from "zustand/shallow";

const ThemesTab = () => {
  const [theme, accent, autoTheme, setAutoTheme, setTheme] = useStore(
    (state) => [
      state.theme,
      state.accent,
      state.autoTheme,
      state.setAutoTheme,
      state.setTheme,
    ],
    shallow
  );
  return (
    <Box css={{ py: "$5", spacey: "$5" }}>
      <Box>
        <Text as="h1" fs="lg" fw="bold">
          Themes
        </Text>
        <Text as="p" fs="xs" css={{ mt: 5 }}>
          Personalize your themes here
        </Text>
        <Box css={{ mt: "$3", spacey: "$5" }}>
          <Flex jc="between">
            <Text as="span" fw="medium" fs={{ "@initial": "xs", "@md": "sm" }}>
              Auto Theme
            </Text>
            <Switch
              checked={autoTheme}
              onCheckedChange={(checked) => setAutoTheme(checked)}
            />
          </Flex>
          <Flex jc="between">
            <Text as="span" fw="medium" fs={{ "@initial": "xs", "@md": "sm" }}>
              Toggle Dark mode
            </Text>
            <Switch
              checked={theme == "dark"}
              onCheckedChange={(checked) =>
                setTheme(accent, checked ? "dark" : "light")
              }
            />
          </Flex>
        </Box>
      </Box>
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
  br: "$round",
});
const ActiveTheme = styled(motion.div, {
  $$padding: "8px",
  border: "1.5px dashed $colors$text",
  height: "calc(100% + $$padding)",
  width: "calc(100% + $$padding)",
  position: "absolute",
  top: "calc(-$$padding / 2)",
  left: "calc(-$$padding / 2)",
  br: "$round",
});
const ThemeChanger = () => {
  const theme = useStore((state) => state.accent);
  const setTheme = useStore((state) => state.setTheme);
  return (
    <Box>
      <Text as="span" fs="sm" fw="semibold">
        Choose accent color
      </Text>
      <Flex jc="between" css={{ mt: "$2", maxWidth: "250px" }}>
        {availableAccents.map(({ name, color }) => {
          return (
            <ThemeButton
              key={name}
              css={{ $$bg: color }}
              onClick={() => setTheme(name)}
            >
              {theme == name && (
                <ActiveTheme
                  layoutId="active-theme"
                  style={{
                    borderRadius: "var(--radii-round)",
                  }}
                />
              )}
            </ThemeButton>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ThemesTab;
