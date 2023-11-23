import { usePhotos } from "@api/hooks";
import { Box, Flex, IconButton, Text, HoverCard } from "@components/base";
import { withTour } from "@components/base/Tour";
import {
  DownloadIcon,
  ExternalLinkIcon,
  HeartIcon,
  LikeIcon,
  Info,
} from "@components/icons";
import useStore from "@store";
import { getPictureAttribution } from "@utils";
import React from "react";
import { shallow } from "zustand/shallow";

const ImageInfo = () => {
  const { data: photos, isSuccess } = usePhotos();
  const [cursor, favoritePhotos, setFavoritePhotos] = useStore(
    (state) =>
      [state.cursor, state.favoritePhotos, state.setFavoritePhotos] as const,
    shallow,
  );
  if (!isSuccess) return null;
  const todayPhoto = photos[cursor];
  const todayAttribution = getPictureAttribution(todayPhoto);
  const isFavorite = favoritePhotos.some((photo) => photo.id === todayPhoto.id);
  function ToggleFavorite() {
    if (isFavorite) {
      setFavoritePhotos(
        favoritePhotos.filter((photo) => photo.id !== todayPhoto.id),
      );
    } else {
      setFavoritePhotos([...favoritePhotos, todayPhoto]);
    }
  }
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <HoverCard
      trigger={
        <IconButton
          bg="transparent"
          css={{
            include: "accessibleShadow",
          }}
        >
          <Info
            css={{
              size: 30,
              color: "$text",
              "&:hover": {
                fill: "$text",
                stroke: "$bg",
              },
            }}
          />
        </IconButton>
      }
    >
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
            <Text srOnly>image likes</Text>
            <Text fs="xs">{formatter.format(todayAttribution?.likes)}</Text>
          </Flex>
          <Flex ai="center" gap="1">
            <DownloadIcon css={{ size: "$3" }} />
            <Text srOnly>image downloads</Text>
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
    </HoverCard>
  );
};

export default withTour(ImageInfo, {
  name: "image-info",
  title: "Background Image info",
  description:
    "For more details on the image author and engagements on social media. You can save to your favourite tab to use later",
});
