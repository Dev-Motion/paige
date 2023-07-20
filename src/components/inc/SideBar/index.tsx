import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "stitches.config";
import GeneralTab from "./GeneralTab";
import ThemesTab from "./ThemesTab";
import QuotesTab from "./QuotesTab";
import useStore from "@store";
import { FeedbackModal } from "@components/inc";
import { IconButton, Box, Flex, ScrollArea } from "@components/base";
import { Hamburger, Info } from "@components/icons";
import WeatherTab from "./WeatherTab";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState("daily motivation");
  const sideBarOpen = useStore((state) => state.sideBarOpen);
  const setSideBarOpen = useStore((state) => state.setSideBarOpen);
  const sideBarPosition = useStore((state) => state.sideBarPosition);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    buttonRef.current?.focus();
  }, [sideBarOpen]);
  let motionProps;
  if (sideBarPosition === "left") {
    motionProps = {
      initial: { x: "-100%" },
      exit: { x: "-100%" },
    };
  } else if (sideBarPosition === "right") {
    motionProps = {
      initial: { x: "100%" },
      exit: { x: "100%" },
      css: {
        left: "auto",
        right: 0,
        flexDirection: "row-reverse",
        gridTemplateAreas: "'tabcontent tablist'",
        gridTemplateColumns: "minmax(300px,1fr) minmax(150px,170px)",
      },
    };
  }
  return (
    <AnimatePresence>
      {sideBarOpen && (
        <>
          <SideBarOverlay
            onClick={() => setSideBarOpen(false)}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <TabRoot
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            asChild
            orientation="vertical"
          >
            <MotionContainer
              animate={{ x: 0 }}
              transition={{ type: "tween" }}
              {...motionProps}
            >
              <TabList
                css={{
                  zIndex: "calc($max - 1)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {["General", "Themes", "Quotes", "Weather"].map((item) => {
                  const active = item.toLowerCase() === activeTab;
                  const gen = item.toLowerCase() === "general";
                  return (
                    <TabTrigger
                      key={item}
                      value={item.toLowerCase()}
                      position={sideBarPosition}
                      ref={gen ? buttonRef : undefined}
                    >
                      {item}
                      {active && (
                        <MenuBg position={sideBarPosition} layoutId="btn-bg" />
                      )}
                    </TabTrigger>
                  );
                })}
                <Flex
                  jc="end"
                  ai="center"
                  fd="column"
                  gap="2"
                  css={{
                    flexGrow: 1,
                    pb: "$4",
                  }}
                  id="nav-links"
                >
                  <FeedbackModal />
                  <IconButton
                    onClick={() => setSideBarOpen(false)}
                    size="sm"
                    bg="bgLight"
                    css={{
                      boxShadow: "0 0 0 1px $colors$text",
                      "& svg": {
                        size: "60%",
                      },
                    }}
                  >
                    <Hamburger
                      css={{
                        transform:
                          sideBarPosition === "left"
                            ? "rotate(-180deg)"
                            : "none",
                        color: "$text",
                      }}
                    />
                  </IconButton>
                </Flex>
              </TabList>
              <TabContent
                value="general"
                css={{
                  zIndex: "calc($max - 2)",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <ScrollArea
                  css={{
                    height: "100%",
                  }}
                >
                  <GeneralTab />
                </ScrollArea>
              </TabContent>
              <TabContent
                value="themes"
                css={{
                  zIndex: "calc($max - 2)",
                  height: "100%",
                  overflow: "hidden",
                  "& >*": {
                    maxWidth: "100%",
                  },
                  "& > div > [data-radix-scroll-area-viewport]:first-of-type > div  ":
                    {
                      display: "unset !important",
                      // border: "1px solid black",
                    },
                }}
              >
                <ScrollArea
                  css={{
                    height: "100%",
                  }}
                >
                  <ThemesTab />
                </ScrollArea>
              </TabContent>
              <TabContent
                value="quotes"
                css={{
                  zIndex: "calc($max - 2)",
                  height: "100%",
                  overflow: "hidden",
                  "& >*": {
                    maxWidth: "100%",
                  },
                  "& > div > [data-radix-scroll-area-viewport]:first-of-type > div  ":
                    {
                      display: "unset !important",
                      // border: "1px solid black",
                    },
                }}
              >
                <ScrollArea
                  css={{
                    height: "100%",
                  }}
                >
                  <QuotesTab />
                </ScrollArea>
              </TabContent>
              <TabContent
                value="weather"
                css={{
                  zIndex: "calc($max - 2)",
                  height: "100%",
                  overflow: "hidden",
                  "& >*": {
                    maxWidth: "100%",
                  },
                  "& > div > [data-radix-scroll-area-viewport]:first-of-type > div  ":
                    {
                      display: "unset !important",
                      // border: "1px solid black",
                    },
                }}
              >
                <ScrollArea
                  css={{
                    height: "100%",
                  }}
                >
                  <WeatherTab />
                </ScrollArea>
              </TabContent>
            </MotionContainer>
          </TabRoot>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;

const TabRoot = styled(Tabs.Root, {});
const TabList = styled(Tabs.List, {
  bg: "$bg",
  pt: "$9",
  px: "$4",
  gridArea: "tablist",
});
const TabTrigger = styled(Tabs.Trigger, {
  $$position: "left",
  appearance: "none",
  bg: "transparent",
  border: "none",
  color: "$text",
  width: "100%",
  py: "$2",
  px: "$2",
  br: "$2",
  position: "relative",
  textAlign: "$$position",
  variants: {
    position: {
      left: {
        $$position: "left",
      },
      right: {
        $$position: "right",
      },
    },
  },
});
const TabContent = styled(Tabs.Content, {
  gridArea: "tabcontent",
  bg: "rgba($bgRGB,0.2)",
  backdropFilter: "blur(50px)",
  px: "$5",
  color: "$text",
});

const MotionContainer = styled(motion.div, {
  height: "100vh",
  width: "50vw",
  maxWidth: 550,
  minWidth: "200px",
  display: "grid",
  gridTemplateAreas: "'tablist tabcontent'",
  gridTemplateColumns: "minmax(150px,170px) minmax(300px,1fr)",
  position: "fixed",
  zIndex: "$max",
  top: 0,
  left: 0,
});

const SideBarOverlay = styled(motion.div, {
  position: "fixed",
  inset: 0,
  bg: "rgba(0,0,0,0.25)",
});

const MenuBg = styled(motion.div, {
  $$opacity: 0.2,

  br: "$4",
  backgroundColor: "$accent",
  position: "absolute",
  zIndex: -1,
  // opacity: "0.2",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  "&::after": {
    content: "''",
    position: "absolute",
    left: "$$left",
    right: "$$right",
    opacity: 1,
    bg: "$text",
    top: "50%",
    size: 12,
    br: "$pill",
    transform: "translateY(-50%)",
  },
  variants: {
    position: {
      left: {
        $$right: "8px",
      },
      right: {
        $$left: "8px",
      },
    },
  },
});
