import React from "react";
import useStore from "@store";
import { Box } from "@components/base";
import { imageQuality } from "@constants";
import { BlurhashCanvas } from "react-blurhash";
import { css } from "stitches.config";
import { getPictureInfo } from "@utils";

const scaffoldCSS = css({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
});
const Scaffold = () => {
  const photos = useStore((state) => state.todayPhoto);
  const nextImage = useStore((state) => state.nextPhoto);
  const todayImage = getPictureInfo(photos);
  return (
    <>
      <Box
        css={{
          background: `url(${todayImage.urls?.raw + imageQuality})`,
          zIndex: -1,
          backgroundPosition: "center",
          backgroundSize: "cover",
          transition: "background 0.5s ease-in-out",
        }}
        className={"scaffold " + scaffoldCSS()}
      >
        <Box
          css={{
            background: `url(${nextImage.urls?.raw + imageQuality})`,
            include: "screenReaderOnly",
          }}
        />
      </Box>
      <Box
        className={scaffoldCSS()}
        css={{
          zIndex: -2,
        }}
      >
        {todayImage?.blur_hash && (
          <BlurhashCanvas
            hash={todayImage.blur_hash}
            style={{ height: "100%", width: "100%" }}
            punch={1}
          />
        )}
      </Box>
    </>
  );
};

export default Scaffold;
