import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { styled } from "stitches.config";
import { Box, Flex, Text, Grid } from "@components/base";
import ScrollArea from "../ScrollArea";
import TagInput from "../TagInput";
import getImage, { ImageReturnType } from "@utils/getImage";
import { useLocalStorage } from "react-use";
import useStore from "@store";

const TabRoot = styled(Tabs.Root, {});
const TabList = styled(Tabs.List, {
  bg: "transparent",
  mt: "$1",
});
const TabTrigger = styled(Tabs.Trigger);

const ThemesTab = () => {
  return (
    <Box>
      <Box css={{ mb: "$4" }}>
        <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
          Themes
        </Text>
        <Text as="p" fs={{ "@initial": "sm", "@md": "md" }}>
          Personalize your themes here
        </Text>
      </Box>
      <Text as="span" fs={{ "@initial": "xs", "@md": "sm" }}>
        choose theme colors here
      </Text>
      <ThemeChanger />
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
});
const ActiveTheme = styled(motion.div, {
  $$padding: "10px",
  border: "2px dashed $$bg",
  height: "calc(100% + $$padding)",
  width: "calc(100% + $$padding)",
  position: "absolute",
  top: "calc(-$$padding / 2)",
  left: "calc(-$$padding / 2)",
});
const ThemeChanger = () => {
  const [theme, setTheme] = useStore((state) => [state.theme, state.setTheme]);
  return (
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
  );
};

const galleryTabs = [
  {
    value: "cloud",
    name: "Cloud Wallpapers",
  },
  {
    value: "favourites",
    name: "Favourites",
  },
  {
    value: "recent",
    name: "Recently Used",
  },
  {
    value: "default",
    name: "Default",
  },
  {
    value: "add",
    name: "Add Photo",
  },
] as const;

const GalleryTabs = () => {
  const [activeTab, setActiveTab] =
    useState<typeof galleryTabs[number]["value"]>("cloud");

  return (
    <TabRoot defaultValue={activeTab}>
      <TabList asChild>
        <ScrollArea>
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
      <TagInput />
      <Tabs.Content value="cloud">
        <GalleryContent tags={["tags"]} />
      </Tabs.Content>
      <Tabs.Content value="2">hey</Tabs.Content>
    </TabRoot>
  );
};

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

const GalleryContent = ({ tags }: { tags: string[] }) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useLocalStorage<ImageReturnType | null>(
    "gallery content",
    null
  );

  React.useEffect(() => {
    getImage({
      query: tags.join(" "),
      count: 10,
    })
      .then((data) => {
        setLoading(false);
        setImages(data);
      })
      .catch(() => {
        console.log("you need mobile data to get new images");
      });
  }, []);
  return (
    <ScrollArea>
      <Grid columns={{ "@initial": 1, "@lg": 2 }} gap="2">
        {loading
          ? images?.result.map((_, i) => {
            return <Skeleton key={i} />;
          })
          : images?.result.map((_, i) => {
            return <Skeleton key={i} />;
          })}
        {/* {images?.result.map((_, i) => {
          return <Skeleton key={i} />;
        })} */}
      </Grid>
    </ScrollArea>
  );
};

const Skeleton = styled("div", {
  width: "100%",
  height: 150,
  br: "$4",
  bg: "Gray",
});

export default ThemesTab;
