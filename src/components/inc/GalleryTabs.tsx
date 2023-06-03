import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import useStore from "@store";
import { galleryTabs, tempImageQuality } from "@constants";
import { styled } from "stitches.config";
import { Grid, Flex, Skeleton, Box, Text } from "@components/base";
import { ScrollArea } from ".";
import { StarIcon } from "@components/icons";
import { Picture } from "@types";
import { HeartIcon } from "@components/icons";
import { shallow } from "zustand/shallow";

const TabRoot = styled(Tabs.Root, {});
const TabList = styled(Tabs.List, {
  bg: "transparent",
  mt: "$1",
});
const TabTrigger = styled(Tabs.Trigger);
const GalleryBtn = styled("button", {
  appearance: "none",
  border: "none",
  bg: "transparent",
  position: "relative",
  color: "$text",
  py: "$1",
  minWidth: 80,
  fontSize: "$xs",
});
const GalleryBtnUnderline = styled(motion.div, {
  position: "absolute",
  bottom: 0,
  height: 2,
  bg: "$text",
  br: "$pill",
  width: "100%",
});

const GalleryTabs = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof galleryTabs)[number]["value"]>("cloud");

  return (
    <TabRoot defaultValue={activeTab} css={{ maxWidth: "100%" }}>
      <TabList asChild>
        <ScrollArea orientation="horizontal" css={{}}>
          <Flex gap="1" css={{ pb: "$2" }}>
            {galleryTabs.map(({ value, name }) => {
              return (
                <TabTrigger
                  key={name}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  asChild
                >
                  <GalleryBtn>
                    {name}
                    {value === activeTab && (
                      <GalleryBtnUnderline layoutId="gallery-btn-underline" />
                    )}
                  </GalleryBtn>
                </TabTrigger>
              );
            })}
          </Flex>
        </ScrollArea>
      </TabList>
      {/* <TagInput /> */}
      <Tabs.Content value="cloud">
        <GalleryContent />
      </Tabs.Content>
      <Tabs.Content value="favourites">
        <GalleryContent favoriteTab />
      </Tabs.Content>
    </TabRoot>
  );
};

const GalleryContent = ({ favoriteTab = false }: { favoriteTab?: boolean }) => {
  const [
    cloudPhotos,
    setTempBg,
    setTodayPhoto,
    favoritePhotos,
    setFavoritePhotos,
    getCloudPhotos,
    toast,
  ] = useStore(
    (state) => [
      state.cloudPhotos,
      state.setTemporaryBackground,
      state.setTodayPhoto,
      state.favoritePhotos,
      state.setFavoritePhotos,
      state.getCloudPhotos,
      state.addToast,
    ],
    shallow
  );
  const isFavorite = (photo: Picture) => {
    return favoritePhotos.some((p) => p.id === photo.id);
  };
  const empty = cloudPhotos.length === 0;
  const photos = favoriteTab ? favoritePhotos : cloudPhotos;
  const fetchedmore = cloudPhotos.length === 10;
  return (
    <Box>
      {empty ? (
        <Grid columns={{ "@initial": 1, "@lg": 2 }} gap="2" css={{ pt: "$2" }}>
          {Array.from({ length: 6 }).map((_, i) => {
            return (
              <Skeleton width="100%" aspectRatio={"16/9"} br="$3" key={i} />
            );
          })}
        </Grid>
      ) : (
        <Grid columns={{ "@initial": 1, "@lg": 2 }} gap="2" css={{ pt: "$2" }}>
          {photos.map((photo, i) => {
            const favorite = isFavorite(photo);
            return (
              <Box
                key={i}
                css={{
                  position: "relative",
                  br: "$4",
                  overflow: "hidden",
                  "&:hover": {
                    [`${Flex}`]: {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
                onMouseEnter={() => {
                  setTempBg({
                    bg: photo.urls.raw + tempImageQuality,
                    blur_hash: photo.blur_hash || "",
                  });
                }}
                onMouseLeave={() => {
                  setTempBg({ bg: "", blur_hash: "" });
                }}
              >
                <Box
                  as="img"
                  src={photo.urls.thumb}
                  alt={photo.alt_description ?? ""}
                  css={{
                    size: "100%",
                    aspectRation: "16/9",
                    objectFit: "cover",
                  }}
                />
                <Flex
                  jc="end"
                  ai="center"
                  gap="2"
                  css={{
                    border: "none",
                    position: "absolute",
                    height: "40%",
                    width: "100%",
                    bottom: 0,
                    left: 0,
                    px: "$2",
                    bg: "linear-gradient(0deg, rgba($bgRGB,0.8) 0%,rgba($bgRGB,0.4) 50%,transparent 100%)",
                    opacity: 0,
                    transform: "translateY(100%)",
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  <Box
                    as="button"
                    css={{
                      appearance: "none",
                      border: "none",
                      bg: "transparent",
                      color: "$text",
                      "&>svg": {
                        size: 16,
                        fill: favorite ? "$text" : "transparent",
                      },
                    }}
                    onClick={() => {
                      if (!favorite) {
                        setFavoritePhotos([...favoritePhotos, photo]);
                      } else {
                        setFavoritePhotos(
                          favoritePhotos.filter((p) => p.id !== photo.id)
                        );
                      }
                    }}
                  >
                    <Text css={{ include: "screenReaderOnly" }}>
                      Add to favourite quotes
                    </Text>
                    <HeartIcon />
                  </Box>
                  <Box
                    as="button"
                    css={{
                      padding: "4px 8px",
                      fontSize: "$xs",
                      br: "$2",
                      bg: "$text",
                      color: "$bg",
                      border: "none",
                    }}
                    onClick={() => {
                      setTodayPhoto({ ...photo, for: new Date() });
                      toast({
                        message: "Photo set as today's background",
                      });
                    }}
                  >
                    Set
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </Grid>
      )}
      {!favoriteTab && !fetchedmore && (
        <Flex jc="center" css={{ py: "$4" }}>
          <Box
            as="button"
            css={{
              padding: "4px 8px",
              fontSize: "$xs",
              br: "$2",
              bg: "$text",
              color: "$bg",
              border: "none",
            }}
            onClick={() => {
              getCloudPhotos(true);
            }}
          >
            Load more
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default GalleryTabs;
