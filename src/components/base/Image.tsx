import React from "react";
import NextImage from "next/image";
import type { ImageLoader, ImageProps } from "next/image";

const unsplashLoader: ImageLoader = ({
  src,
  width: w,
  quality: q,
}) => {
  if (src.includes("unsplash")) {
    return src + `&w=${w}&q=${q || 80}&auto=format`;
  }
  return src
};

const Image = ({ ...props }: ImageProps) => {
  // return <Image {...props} alt={alt} loader={unsplashLoader} />;
  return <NextImage {...props} loader={unsplashLoader} />;
};

export default Image;
