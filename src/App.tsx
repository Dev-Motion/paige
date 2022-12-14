import React, { useEffect } from "react";
import useStore from "@store";
import { Box } from "@components/base";
import { Main } from "@components/inc";

function App() {
  const setTheme = useStore((state) => state.setTheme);
  useEffect(() => {
    setTheme();
  }, []);
  return (
    <>
      <Main />
      <ImageCache />
    </>
  );
}

const ImageCache = () => {
  const [photos, setPhotos] = useStore((state) => [
    state.photos,
    state.setPhotos,
  ]);
  useEffect(() => {
    const today = new Date().toDateString();
    const todayImage = photos.filter(
      (photo) => new Date(photo.for).toDateString() === today
    )[0];
    if (photos.length === 0 || !todayImage) {
      setPhotos("mountains", false);
    }
  }, []);
  return (
    <Box css={{ display: "none" }}>
      {photos?.map((photo, index) => {
        return (
          <img
            key={index}
            src={photo.urls.raw + "&w=2048&q=80&auto=format"}
            alt="image"
          />
        );
      })}
    </Box>
  );
};
export default App;
