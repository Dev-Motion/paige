import React from "react";
import useStore from "@store";
import { Box } from "@components/base";
import { defaultTodayPhoto, imageQuality } from "@constants";
import { BlurhashCanvas } from "react-blurhash";
import { css } from "stitches.config";
import { getPictureInfo } from "@utils";
import { shallow } from "zustand/shallow";
import { usePhotos } from "@api/hooks";

const scaffoldCSS = css({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
});
const Scaffold = () => {
  const [temporaryBackground, cursor, setCursor] = useStore(
    (state) => [
      // state.todayPhoto,
      // state.nextPhoto,
      state.temporaryBackground,
      state.cursor,
      state.setCursor,
    ],
    shallow,
  );
  const { data: photos, refetch, isSuccess } = usePhotos();
  React.useEffect(() => {
    if (photos) {
      const interval = setInterval(() => {
        if (cursor < photos.length - 1) {
          setCursor(cursor + 1);
        } else {
          refetch().then(() => setCursor(0));
        }
      }, 3600000);
      return () => clearInterval(interval);
    }
  }, [cursor]);

  React.useEffect(() => {
    if (photos) {
      const cache = (idx: number) => {
        const photo = photos[idx];
        if (photo) {
          const img = new Image();
          img.src = photo.urls?.raw + imageQuality;
        }
      };
      //cache all the images in the background
      for (let i = 0; i < photos.length; i++) {
        cache(i);
      }
    }
  }, [photos]);

  if (!isSuccess) return null;

  const currentPhoto = photos[cursor] ?? defaultTodayPhoto;
  const todayImage = getPictureInfo(currentPhoto);
  return (
    <>
      <Box
        css={{
          background: `url(${
            temporaryBackground.bg || todayImage.urls?.raw + imageQuality
          })`,
          zIndex: -1,
          backgroundPosition: "center",
          backgroundSize: "cover",
          transition: "background 0.5s ease-in-out",
        }}
        className={"scaffold " + scaffoldCSS()}
      ></Box>
      <Box
        className={scaffoldCSS()}
        css={{
          zIndex: -2,
        }}
      >
        {todayImage?.blur_hash && (
          <BlurhashCanvas
            hash={temporaryBackground.blur_hash || todayImage.blur_hash}
            style={{ height: "100%", width: "100%" }}
            punch={1}
          />
        )}
      </Box>
    </>
  );
};

export default Scaffold;
