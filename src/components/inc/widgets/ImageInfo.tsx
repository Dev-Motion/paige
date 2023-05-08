import { Box, Flex, IconButton, Text } from "@components/base";
import {
  DownloadIcon,
  ExternalLinkIcon,
  HeartIcon,
  LikeIcon,
  StarIcon,
  WatchIcon,
} from "@components/icons";
import useStore from "@store";
import { getPictureAttribution } from "@utils";
import React from "react";

const ImageInfo = () => {
  const [todayPhoto, favoritePhotos, setFavoritePhotos] = useStore(
    (state) =>
      [state.todayPhoto, state.favoritePhotos, state.setFavoritePhotos] as const
  );
  const todayAttribution = getPictureAttribution(todayPhoto);
  const isFavorite = favoritePhotos.some((photo) => photo.id === todayPhoto.id);
  function ToggleFavorite() {
    const { for: notNeeded, ...photo } = todayPhoto;
    if (isFavorite) {
      setFavoritePhotos(
        favoritePhotos.filter((photo) => photo.id !== todayPhoto.id)
      );
    } else {
      setFavoritePhotos([...favoritePhotos, photo]);
    }
  }
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <Flex
      fd="column"
      gap="3"
      css={{
        position: "relative",
      }}
    >
      <Text fs="sm">
        {todayAttribution?.description || todayAttribution?.alt_description}
      </Text>
      <Flex gap="3" jc="between">
        <Flex ai="center" gap="1">
          <LikeIcon css={{ size: "$3" }} />
          <Text css={{ include: "screenReaderOnly" }}>image likes</Text>
          <Text fs="xs">{formatter.format(todayAttribution?.likes)}</Text>
        </Flex>
        <Flex ai="center" gap="1">
          <DownloadIcon css={{ size: "$3" }} />
          <Text css={{ include: "screenReaderOnly" }}>image downloads</Text>
          <Text fs="xs">{formatter.format(todayAttribution?.downloads)}</Text>
        </Flex>
        <Flex
          as="a"
          href={todayAttribution?.links?.html}
          target="_blank"
          ai="center"
          gap="1"
        >
          <ExternalLinkIcon css={{ size: "$3" }} />
          <Text fs="xs">link</Text>
        </Flex>
        <Flex
          as="button"
          css={{ include: "buttonReset" }}
          gap="1"
          ai="center"
          onClick={ToggleFavorite}
        >
          <HeartIcon
            css={{
              size: "$3",
              color: "$text",
              fill: isFavorite ? "$text" : "transparent",
              transition: "all 300ms ease-in-out",
            }}
          />
          <Text fs="xs" css={{ color: "$text" }}>
            favorite
          </Text>
        </Flex>
      </Flex>
      <Flex ai="center" gap="2">
        <Box
          as="img"
          css={{
            size: 30,
            br: "$round",
          }}
          src={todayAttribution?.user.profile_image.small}
        ></Box>

        <Text
          as="a"
          target="_blank"
          fs="sm"
          fw="semibold"
          href={todayAttribution.user.links.html}
        >
          {todayAttribution?.user.name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ImageInfo;
