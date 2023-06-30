import { Box, Flex, Text } from "@components/base";
import { Button } from "@components/base/Button";
import useStore from "@store";
import React from "react";
import { styled } from "stitches.config";
import { shallow } from "zustand/shallow";

const ThemeCategories = () => {
  const [keywords, setKeywords, getCloudPhotos] = useStore(
    (state) => [state.keywords, state.setKeywords, state.getCloudPhotos],
    shallow
  );

  function onClick(keyword: string) {
    if (keywords.includes(keyword)) {
      // remove keyword
      setKeywords(keywords.filter((k) => k !== keyword));
    } else {
      // add keyword
      setKeywords([...keywords, keyword]);
    }
    getCloudPhotos();
  }

  return (
    <Box css={{ spacey: "$1" }}>
      <Text fs="sm" fw="semibold">
        Theme category
      </Text>
      <Flex
        wrap="wrap"
        gap="1"
        css={{
          px: "$1",
        }}
      >
        {categories.map((category) => {
          const active = keywords.includes(category);
          return (
            <Button
              key={category}
              size="xs"
              br="pill"
              {...(active
                ? {
                  color: "accent",
                  css: { color: "$text" },
                }
                : {
                  kind: "outline",
                })}
              onClick={() => onClick(category)}
            >
              {category}
            </Button>
          );
        })}
      </Flex>
    </Box>
  );
};

const categories = [
  "Wallpapers",
  "3D Renders",
  "Travel",
  "Nature",
  "People",
  "Arts & Culture",
  "Business & Work",
  "Textures & Patterns",
  "Architecture & Interiors",
];

export default ThemeCategories;
