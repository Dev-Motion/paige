import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "stitches.config";
import GeneralTab from "./GeneralTab";
import ThemesTab from "./ThemesTab";
import { useLayout } from "@context/LayoutContext";

const TabRoot = styled(Tabs.Root, {});
const TabList = styled(Tabs.List, {
  bg: "$bg",
  pt: "$9",
  px: "$4",
  gridArea: "tablist",
});
const TabTrigger = styled(Tabs.Trigger);
const TabContent = styled(Tabs.Content, {
  gridArea: "tabcontent",
  bg: "rgba($bgRGB,0.25)",
  backdropFilter: "blur(50px)",
  pt: "$9",
  px: "$5",
  color: "$text",
});

const MotionContainer = styled(motion.div, {
  height: "100vh",
  width: "50vw",
  maxWidth: 600,
  minWidth: "200px",
  display: "grid",
  gridTemplateAreas: "'tablist tabcontent'",
  gridTemplateColumns: "minmax(180px,200px) minmax(300px,1fr)",
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

const MenuButton = styled("button", {
  appearance: "none",
  bg: "transparent",
  border: "none",
  color: "$text",
  width: "100%",
  py: "$2",
  pl: "$2",
  pr: "$1",
  ta: "left",
  br: "$2",
  position: "relative",
});
const MenuBg = styled(motion.div, {
  $$opacity: 0.2,

  br: "$2",
  backgroundColor: "rgb($textRGB ,0.2)",
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
    right: 4,
    opacity: 1,
    bg: "$text",
    top: "50%",
    height: "80%",
    br: "$pill",
    transform: "translateY(-50%)",
    width: 2,
  },
});
const SideBar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [{ sideBar }, setLayout] = useLayout();
  return (
    <AnimatePresence>
      {open && (
        <>
          <SideBarOverlay
            onClick={onClose}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <TabRoot
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            asChild
          >
            <MotionContainer
              animate={{ x: 0 }}
              transition={{ type: "tween" }}
              {...(sideBar === "left"
                ? {
                  initial: { x: "-100%" },
                  exit: { x: "-100%" },
                }
                : {
                  initial: { x: "100%" },
                  exit: { x: "100%" },
                  css: {
                    left: "auto",
                    right: 0,
                    flexDirection: "row-reverse",
                    gridTemplateAreas: "'tabcontent tablist'",
                    gridTemplateColumns:
                        "minmax(260px,1fr) minmax(180px,200px) ",
                  },
                })}
            >
              <TabList css={{ zIndex: "calc($max - 1)" }}>
                {["General", "Themes"].map((item) => (
                  <TabTrigger key={item} value={item.toLowerCase()} asChild>
                    <MenuButton>
                      {item}
                      {item.toLowerCase() === activeTab && (
                        <MenuBg layoutId="btn-bg" />
                      )}
                    </MenuButton>
                  </TabTrigger>
                ))}
              </TabList>
              <TabContent value="general" css={{ zIndex: "calc($max - 2)" }}>
                <GeneralTab />
              </TabContent>
              <TabContent value="themes" css={{ zIndex: "calc($max - 2)" }}>
                <ThemesTab />
              </TabContent>
            </MotionContainer>
          </TabRoot>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
