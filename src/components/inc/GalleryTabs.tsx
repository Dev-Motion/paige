import { Box, Flex, Grid, Skeleton } from "@components/base";
import { galleryTabs, tempImageQuality } from "@constants";
import * as Tabs from "@radix-ui/react-tabs";
import useStore from "@store";
import { Picture } from "@types";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { styled } from "stitches.config";
import { shallow } from "zustand/shallow";
import { ScrollArea } from ".";
import { GalleryImage } from "./GalleryImage";
import { GalleryTabItems } from "@constants/galleryTabs";

const TabRoot = styled(Tabs.Root, {});
const TabList = styled(Tabs.List, {
  bg: "transparent",
  mt: "$1",
});
const TabTrigger = styled(Tabs.Trigger, {
  include: "buttonReset",
  position: "relative",
  color: "$text",
  py: "$1",
  minWidth: 80,
  fontSize: "$xs",
});

const TabUnderline = styled(motion.div, {
  position: "absolute",
  bottom: 0,
  height: 2,
  bg: "$accent",
  br: "$pill",
  width: "100%",
});

const GalleryTabs = () => {
  const [activeTab, setActiveTab] = useState<GalleryTabItems>("cloud");

  return (
    <TabRoot
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as GalleryTabItems)}
      css={{ maxWidth: "100%" }}
    >
      <TabList asChild>
        <ScrollArea orientation="horizontal" css={{}}>
          <Flex gap="1" css={{ pb: "$2" }}>
            {galleryTabs.map(({ value, name }) => {
              const active = value === activeTab;
              return (
                <TabTrigger key={name} value={value}>
                  {name}
                  {active && <TabUnderline layoutId="gallery-btn-underline" />}
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
            const onMouseEnter = () => {
              setTempBg({
                bg: photo.urls.raw + tempImageQuality,
                blur_hash: photo.blur_hash || "",
              });
            };
            const onMouseLeave = () => {
              setTempBg({ bg: "", blur_hash: "" });
            };
            const toggleFavorite = () => {
              if (!favorite) {
                setFavoritePhotos([...favoritePhotos, photo]);
              } else {
                setFavoritePhotos(
                  favoritePhotos.filter((p) => p.id !== photo.id)
                );
              }
            };
            const setPhoto = () => {
              setTodayPhoto({ ...photo, for: new Date() });
              toast({
                message: "Photo set as today's background",
              });
            };
            return (
              <GalleryImage
                key={i}
                {...{
                  onMouseEnter,
                  onMouseLeave,
                  toggleFavorite,
                  setPhoto,
                  favorite,
                  photo,
                }}
              />
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
