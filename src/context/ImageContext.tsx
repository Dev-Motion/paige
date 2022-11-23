import getImage from "@utils/getImage";
import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { formatDate } from "@utils/index";

const ERROR_MESSAGE = "You need internet connection to get updated images";
export type ImageResponse = {
  for: string;
  blur_hash: string;
  raw: string;
  description: string;
  img_url: string;
  user_name: string;
  user_link: string;
  color: string;
};
type imageContextType = ImageResponse[] | null;
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
    const today = new Date();
    if (!image) {
      getNewImages(setImage);
    } else {
      const imageDate = new Date(image[1].for);

      if (imageDate === today) {
        getNewImages(setImage, true);
      } else if (today > imageDate) {
        getNewImages(setImage);
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
  renew = false,
  query = "nature"
) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (!renew) {
    getImage({ count: 2, query })
      .then((response) => {
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
              color: image.color,
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
            color: image.color,
          };
        });
        setImageState(newImages);
      })
      .catch((e) => {
        console.log(ERROR_MESSAGE);
      });
  } else {
    getImage({ count: 1, query })
      .then(({ result }) => {
        const image = result[0];
        setImageState((old) => [
          old?.[1] as ImageResponse,
          {
            for: formatDate(tomorrow),
            img_url: image.raw,
            user_name: image.user_name,
            user_link: image.user_link,
            description: image.description,
            blur_hash: image.blur_hash,
            raw: image.raw,
            color: image.color,
          },
        ]);
      })
      .catch((e) => {
        console.log(ERROR_MESSAGE);
      });
  }
}

export default ImageProvider;
