import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useLocalStorage } from "react-use";
import useStore from "@store";
import { motion } from "framer-motion";
import { Grid, Flex } from "@components/base";
import { styled } from "stitches.config";
import { Random } from "unsplash-js/dist/methods/photos/types";
import { ScrollArea, TagInput } from ".";
import { galleryTabs } from "@constants";

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
const Skeleton = styled("div", {
  width: "100%",
  height: 150,
  br: "$4",
  bg: "Gray",
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
      <Tabs.Content value="2">hey</Tabs.Content>
    </TabRoot>
  );
};

const GalleryContent = () => {
  const [loading, setLoading] = useState(true);
  const getPhotos = useStore((state) => state.getPhotos);
  const [images, setImages] = useLocalStorage<Random[]>(
    "gallery content",
    undefined
  );
  return (
    <ScrollArea>
      <Grid columns={{ "@initial": 1, "@lg": 2 }} gap="2">
        {Array.from({ length: 10 }).map((_, i) => {
          return <Skeleton key={i} />;
        })}
      </Grid>
    </ScrollArea>
  );
};

export default GalleryTabs;
