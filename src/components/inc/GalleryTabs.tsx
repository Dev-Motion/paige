import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import useStore from "@store";
import { galleryTabs, tempImageQuality } from "@constants";
import { styled } from "stitches.config";
import { Grid, Flex, Skeleton, Box } from "@components/base";
import { ScrollArea } from ".";
import { StarIcon } from "@components/icons";
import { Picture } from "@types";
import { toast } from "sonner";

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
                <TabTrigger key={name} value={value} asChild>
                  <GalleryBtn onClick={() => setActiveTab(value)}>
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
        <FavoriteContent />
      </Tabs.Content>
    </TabRoot>
  );
};

const GalleryContent = () => {
  const [cloudPhotos, setTempBg, setTodayPhoto] = useStore((state) => [
    state.cloudPhotos,
    state.setTemporaryBackground,
    state.setTodayPhoto,
  ]);
  const empty = cloudPhotos.length === 0;
  return (
    <>
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
          {cloudPhotos.map((photo, i) => {
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
                  css={{
                    size: "100%",
                    aspectRation: "16/9",
                    objectFit: "cover",
                  }}
                />
                <Flex
                  jc="end"
                  ai="center"
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
                      padding: "4px 8px",
                      fontSize: "$xs",
                      br: "$2",
                      bg: "$text",
                      color: "$bg",
                      border: "none",
                    }}
                    onClick={() => {
                      setTodayPhoto({ ...photo, for: new Date() });
                      toast("Photo set as today's background");
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
    </>
  );
};

const FavoriteContent = () => {
  const [favorites, setFavorites, setTodayPhoto] = useStore(
    (state) =>
      [
        state.favoritePhotos,
        state.setFavoritePhotos,
        state.setTodayPhoto,
      ] as const
  );
  function isFavorite(picture: Picture) {
    return favorites.some((photo) => photo.id === picture.id);
  }
  function ToggleFavorite(picture: Picture) {
    if (isFavorite(picture)) {
      setFavorites(favorites.filter((photo) => photo.id !== picture.id));
    } else {
      setFavorites([...favorites, picture]);
    }
  }
  return (
    <Grid columns={{ "@initial": 1, "@lg": 2 }} gap="2" css={{ pt: "$2" }}>
      {favorites.map((fav, i) => {
        return (
          <Box
            key={i}
            css={{
              position: "relative",
              br: "$4",
              overflow: "hidden",
              "&:hover": {
                "& > button": {
                  opacity: 1,
                },
                [`${Flex}`]: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <Box
              as="button"
              css={{
                $$opacity: 0.8,
                include: "accessibleShadow",
                position: "absolute",
                top: 0,
                right: 0,
                color: "$text",
                pd: "$2",
                bg: "transparent",
                border: "none",
                borderRadius: "$pill",
                opacity: 0,
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "$text",
                },
              }}
              onClick={() => {
                ToggleFavorite(fav);
              }}
            >
              <StarIcon
                css={{
                  size: "$4",
                  color: "$text",
                  fill: isFavorite(fav) ? "$text" : "transparent",
                  transition: "all 300ms ease-in-out",
                }}
              />
            </Box>
            <Flex
              jc="end"
              ai="center"
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
                  padding: "4px 8px",
                  fontSize: "$xs",
                  br: "$2",
                  bg: "$text",
                  color: "$bg",
                  border: "none",
                }}
                onClick={() => {
                  setTodayPhoto({ ...fav, for: new Date() });
                  toast("Photo set as today's background");
                }}
              >
                Set
              </Box>
            </Flex>
            <Box
              as="img"
              src={fav.urls.thumb}
              css={{
                size: "100%",
                aspectRation: "16/9",
                objectFit: "cover",
              }}
            />
          </Box>
        );
      })}
    </Grid>
  );
};

export default GalleryTabs;
