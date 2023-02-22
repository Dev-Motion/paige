import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Grid, Flex, Skeleton } from "@components/base";
import { styled } from "stitches.config";
import { ScrollArea } from ".";
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
  return (
    <Grid columns={{ "@initial": 1, "@lg": 2 }} gap="2">
      {Array.from({ length: 10 }).map((_, i) => {
        return <Skeleton width="100%" height={150} br="$3" key={i} />;
      })}
    </Grid>
  );
};

export default GalleryTabs;
