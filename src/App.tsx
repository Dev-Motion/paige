import { Box, Text } from "@components/base";
import { Main } from "@components/inc";
import ImageProvider, { useImage } from "@utils/ImageContext";
import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ImageProvider>
      <Main />
      {/* <Test /> */}
      <ImageCache />
    </ImageProvider>
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
