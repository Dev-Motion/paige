import { keyframes } from "stitches.config";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-10px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(10px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const shimmer = keyframes({
  "0%": {
    backgroundPosition: "200% 0",
  },
  "100%": {
    backgroundPosition: "-200% 0",
  },
});

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});
const fadeOut = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  },
});
const ping = keyframes({
  "0%": {
    transform: "scale(1)",
    opacity: 1,
  },
  "75%": {
    transform: "scale(2)",
    opacity: 0,
  },
  "100%": {
    transform: "scale(2.5)",
    opacity: 0,
  },
});

export default {
  slideUpAndFade,
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
  fadeIn,
  fadeOut,
  shimmer,
  ping,
};
