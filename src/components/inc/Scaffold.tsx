import React, { useEffect, useState } from "react";
import { Box } from "@components/base";
import { useLocalStorage } from "react-use";
import getImage from "@utils/getImage";

const STALE_TIME = 10; // minute
let imgKey = 0;

interface imageState {
  time?: number;
  imageUrl: string;
}

const Scaffold = ({ show }: { show: () => void }) => {
  const [imageState, setImageState] = useLocalStorage<imageState[]>(
    "imageState",
    [
      {
        time: new Date().getTime(),
        imageUrl: "",
      },
    ]
  );
  useEffect(() => {
    if (imageState?.length == 1 && imageState[0].imageUrl == "") {
      getNewImages(setImageState);
    } else {
      checkStale(imageState![0].time!, () => {
        console.log("i`m stale");
        getNewImages(setImageState, true);
      });
    }
  }, []);

  return (
    <Box
      id="scaffolding"
      css={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        height: "100vh",
        width: "100vw",
      }}
    >
      {imageState!.map((image, index) => {
        return (
          <img
            key={index}
            alt={"scaffold image"}
            sizes="(min-width: 240px) 100vw,
              80vw"
            src={image.imageUrl}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              opacity: index === 1 ? 0 : 1,
              top: 0,
              left: 0,
              zIndex: -1 * (index + 1),
            }}
            {...(index === 0 && { onLoad: show })}
          />
        );
      })}
    </Box>
  );
};

function getNewImages(
  setImageState: React.Dispatch<React.SetStateAction<imageState[] | undefined>>,
  renew: boolean = false
) {
  if (!renew) {
    getImage({ count: 2, query: "mountains" }).then((response) => {
      const newImages = response.result.map((image, i) => {
        if (i == 1) {
          return {
            imageUrl: image.raw,
          };
        }
        return {
          time: new Date().getTime(),
          imageUrl: image.raw,
        };
      });
      setImageState(newImages);
    });
  } else {
    getImage({ count: 1, query: "galaxy" }).then((response) => {
      setImageState((old) => [
        { ...old![1], time: new Date().getTime() },
        { imageUrl: response.result[0].raw },
      ]);
      return;
    });
  }
}

function checkStale(time: number, onStale: () => void) {
  const now = new Date();
  const normalizedDiff = (now.getTime() - time) / 1000;
  const minutes = Math.floor(normalizedDiff / 60);
  const hours = Math.floor(minutes / 60);

  console.log("checkStale", minutes);
  //if the time if stale run the onStale function
  if (minutes > STALE_TIME) {
    onStale();
  }
}

export default Scaffold;
