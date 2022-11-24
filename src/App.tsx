import React from "react";
import { Box } from "@components/base";
import { Main } from "@components/inc";
import ImageProvider, { useImage } from "@context/ImageContext";
import ThemeProvider from "@context/ThemeContext";
import {
  WhiteTheme,
  PurpleTheme,
  GoldTheme,
  BrownTheme,
  CaramelTheme,
} from "stitches.config";
import LayoutProvider from "@context/LayoutContext";

function App() {
  return (
    <ThemeProvider
      themes={{
        default: "darks",
        light: WhiteTheme.className,
        purple: PurpleTheme.className,
        gold: GoldTheme.className,
        brown: BrownTheme.className,
        caramel: CaramelTheme.className,
      }}
      currentTheme="default"
    >
      <LayoutProvider sideBar="left">
        <ImageProvider>
          <Main />
          <ImageCache />
        </ImageProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}

const ImageCache = () => {
  const image = useImage();
  return (
    <Box css={{ display: "none" }}>
      {image?.map((img, index) => {
        return (
          <img
            key={index}
            src={img.raw + "&w=2048&q=80&auto=format"}
            alt="image"
          />
        );
      })}
    </Box>
  );
};
export default App;
