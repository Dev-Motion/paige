import React from "react";
import { Flex, Box, Text } from "@components/base";
import { Picture } from "@types";
import { HeartIcon } from "@components/icons";
import { styled } from "stitches.config";
import { IconButton } from "@components/base";
import { Button } from "@components/base/Button";

export function GalleryImage({
  onMouseEnter,
  onMouseLeave,
  photo,
  toggleFavorite,
  setPhoto,
  favorite,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  toggleFavorite: () => void;
  setPhoto: () => void;
  photo: Picture;
  favorite: boolean;
}) {
  return (
    <Figure onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Box as="img" src={photo.urls.thumb} alt={photo.alt_description ?? ""} />
      <Figcaption>
        <Flex jc="end" ai="center" gap="2">
          <IconButton
            size="xs"
            css={{
              "&>svg": {
                size: 16,
                color: favorite ? "$accent" : "$text",
                fill: favorite ? "$accent" : "none",
                transition: "fill 0.4s ease-in-out",
              },
            }}
            onClick={toggleFavorite}
          >
            <Text css={{ include: "screenReaderOnly" }}>
              Add to favourite quotes
            </Text>
            <HeartIcon />
          </IconButton>
          <Button size="xs" color="accent" onClick={setPhoto}>
            Set
          </Button>
        </Flex>
      </Figcaption>
    </Figure>
  );
}
const Figcaption = styled("figcaption", {
  opacity: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
  maxHeight: "100%",
  padding: "$1",
  transition: "opacity 0.4s ease-in-out",
  backgroundImage:
    "linear-gradient(to bottom, rgba($bgRGB,0),rgba($bgRGB,0),rgba($bgRGB,0.75))",
});

const Figure = styled("figure", {
  br: "$4",
  aspectRatio: "16/9",
  overflow: "hidden",
  display: "grid",
  gridTemplateAreas: "stack",
  "& > *": {
    gridArea: "stack",
  },
  "& > img": {
    size: "100%",
    objectFit: "cover",
    aspectRatio: "inherit",
  },
  "&:hover": {
    [`${Figcaption}`]: {
      opacity: 1,
    },
  },
});
