import { Box, Flex, Text } from "@components/base";
import useStore from "@store";
import React from "react";
import { styled } from "stitches.config";

const ThemeCategories = () => {
  const [keywords, setKeywords] = useStore((state) => [
    state.keywords,
    state.setKeywords,
  ]);

  function onClick(keyword: string) {
    if (keywords.includes(keyword)) {
      // remove keyword
      setKeywords(keywords.filter((k) => k !== keyword));
    } else {
      // add keyword
      setKeywords([...keywords, keyword]);
    }
  }

  return (
    <Box css={{ pb: "$2", spacey: "$1" }}>
      <Text>Theme category</Text>
      <Flex
        wrap="wrap"
        gap="1"
        css={{
          px: "$1",
        }}
      >
        {categories.map((category) => (
          <Badge
            key={category}
            active={keywords.includes(category)}
            onClick={() => onClick(category)}
          >
            {category}
          </Badge>
        ))}
      </Flex>
    </Box>
  );
};

const Badge = styled("button", {
  appearance: "none",
  pd: "$1",
  border: "none",
  outlineColor: "transparent",
  color: "$text",
  bg: "transparent",
  br: "$pill",
  boxShadow: "0 0 0 1px $colors$text",
  transition: "all 0.2s ease",
  "&:active": {
    transform: "scale(0.95)",
  },
  variants: {
    active: {
      true: {
        bg: "$text",
        color: "$bg",
      },
    },
  },
});

const categories = [
  "Wallpapers",
  "3D Renders",
  "Travel",
  "Arts & Culture",
  "Business & Work",
  "Textures & Patterns",
  "Nature",
  "People",
  "Architecture & Interiors",
];

export default ThemeCategories;
