import React from "react";
import useStore from "@store";
import { Box } from "@components/base";
import { imageQuality } from "@constants";

const Scaffold = () => {
  const photos = useStore((state) => state.photos);
  const today = new Date().toDateString();

  const todayImage =
    photos.filter((photo) => new Date(photo.for).toDateString() === today)[0] ||
    photos[1];
  return (
    <Box
      css={{
        position: "absolute",
        inset: 0,
        background: `url(${todayImage?.urls?.raw + imageQuality}),${
          todayImage?.color
        }`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        zIndex: -1,
      }}
    />
  );
};

export default Scaffold;
