import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Box, Text } from "@components/base";
import Portal from "@utils/Portals";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "stitches.config";

const SideBarContainer = styled("div", {
  height: "100vh",
  width: "50vw",
  minWidth: "600px",
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
});
const SideBarOverlay = styled(motion.div, {
  zIndex: "$max",
  position: "fixed",
  inset: 0,
  bg: "rgba(0,0,0,0.2)",
});
const LeftSide = styled(motion.div, {
  bg: "$bg",
});
const RightSide = styled(motion.div, {
  gridColumn: "span 2",
  bg: "rgba(0,0,0,0.25)",
  backdropFilter: "blur(50px)",
});
const SideBar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {open && (
        <SideBarOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
        >
          <SideBarContainer onClick={(e) => e.stopPropagation()}>
            <LeftSide
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ type: "tween", ease: "easeInOut" }}
              exit={{
                x: "-100%",
                transition: { delay: 0.2, type: "tween", ease: "easeInOut" },
              }}
              css={{ zIndex: "calc($max - 1)" }}
            ></LeftSide>
            <RightSide
              initial={{ x: "-100%", opacity: 0 }}
              css={{ zIndex: "calc($max - 2)" }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { delay: 0.2, type: "tween", ease: "easeInOut" },
              }}
              exit={{ x: "-100%", opacity: 0, type: "tween" }}
            ></RightSide>
          </SideBarContainer>
        </SideBarOverlay>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
