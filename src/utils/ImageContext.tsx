import getImage from "@utils/getImage";
import { useState, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { formatDate } from ".";

const STALE_TIME = 10; // minute

type imageContextType =
  | {
      for?: string;
      blur_hash: string;
      raw: string;
      description: string;
      img_url: string;
      user_name: string;
      user_link: string;
    }[]
  | null;
const ImageContext = createContext<imageContextType>(null);

export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImage must be used within a ImageProvider");
  }
  return context;
};

const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useLocalStorage<imageContextType>(
    "background",
    null
  );
  useEffect(() => {
    if (!image) {
      getNewImages(setImage);
    } else {
      if (image[1].for === formatDate(new Date())) {
        getNewImages(setImage, true);
      }
    }
  }, []);
  return (
    <ImageContext.Provider value={image || null}>
      {children}
    </ImageContext.Provider>
  );
};

function getNewImages(
  setImageState: React.Dispatch<
    React.SetStateAction<imageContextType | undefined>
  >,
  renew: boolean = false,
  query: string = "nature"
) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (!renew) {
    getImage({ count: 2, query }).then((response) => {
      const newImages = response.result.map((image, i) => {
        if (i == 1) {
          return {
            for: formatDate(tomorrow),
            img_url: image.img_url,
            user_name: image.user_name,
            user_link: image.user_link,
            description: image.description,
            blur_hash: image.blur_hash,
            raw: image.raw,
          };
        }
        return {
          for: formatDate(today),
          img_url: image.raw,
          user_name: image.user_name,
          user_link: image.user_link,
          description: image.description,
          blur_hash: image.blur_hash,
          raw: image.raw,
        };
      });
      setImageState(newImages);
    });
  } else {
    getImage({ count: 1, query }).then(({ result }) => {
      const image = result[0];
      setImageState((old) => [
        old![1],
        {
          for: formatDate(tomorrow),
          img_url: image.raw,
          user_name: image.user_name,
          user_link: image.user_link,
          description: image.description,
          blur_hash: image.blur_hash,
          raw: image.raw,
        },
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

export default ImageProvider;
