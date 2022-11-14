import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { styled } from "stitches.config";

const TabRoot = styled(Tabs.Root, {});
const TabList = styled(Tabs.List, {
  bg: "$bg",
  pt: "$9",
  px: "$4",
});
const TabTrigger = styled(Tabs.Trigger);
const TabContent = styled(Tabs.Content, {
  gridColumn: "span 2",
  bg: "rgba(0,0,0,0.25)",
  backdropFilter: "blur(50px)",
});

const MotionContainer = styled(motion.div, {
  height: "100vh",
  width: "50vw",
  maxWidth: 550,
  minWidth: "200px",
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
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
  color: "$text",
  width: "100%",
  py: "$2",
  px: "$1",
  ta: "left",
  br: "$2",
  position: "relative",
});
const MenuBg = styled(motion.div, {
  $$opacity: 0.2,
  $$white: "255,255,255",
  br: "$2",
  backgroundColor: "rgb($$white ,$$opacity)",
  position: "absolute",
  zIndex: -1,
  // opacity: "0.2",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  "&::after": {
    content: '""',
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
  const [activeTab, setActiveTab] = useState("account");
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
              initial={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ type: "tween" }}
            >
              <TabList css={{ zIndex: "calc($max - 1)" }}>
                {["Account", "Help"].map((item) => (
                  <TabTrigger value={item.toLowerCase()} asChild>
                    <MenuButton>
                      {item}
                      {item.toLowerCase() === activeTab && (
                        <MenuBg layoutId="btn-bg" />
                      )}
                    </MenuButton>
                  </TabTrigger>
                ))}
                {/* <TabTrigger value="help" asChild>
                  <MenuButton>
                    Help
                    <MenuBg />
                  </MenuButton>
                </TabTrigger> */}
              </TabList>
              <TabContent value="account" css={{ zIndex: "calc($max - 2)" }}>
                account
              </TabContent>
              <TabContent value="help" css={{ zIndex: "calc($max - 2)" }}>
                help
              </TabContent>
            </MotionContainer>
          </TabRoot>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
