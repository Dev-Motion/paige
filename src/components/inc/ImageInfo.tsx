import { Box, Flex, IconButton, Text } from "@components/base";
import {
  DownloadIcon,
  ExternalLinkIcon,
  HeartIcon,
  StarIcon,
  WatchIcon,
} from "@components/icons";
import useStore from "@store";
import { getTimeItem } from "@utils";
import React from "react";

const ImageInfo = () => {
  const photoAttributions = useStore((state) => state.photoAttributions);
  const todayAttribution = getTimeItem(photoAttributions)!;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <Flex
      fd="column"
      gap="4"
      css={{
        position: "relative",
        pt: "$4",
      }}
    >
      <IconButton
        size="sm"
        bg="transparent"
        css={{
          position: "absolute",
          top: -10,
          right: -10,
        }}
      >
        <StarIcon css={{ size: "$4" }} />
      </IconButton>
      <Text>
        {todayAttribution?.description || todayAttribution?.alt_description}
      </Text>
      <Flex gap="3">
        <Flex ai="center" gap="1">
          <WatchIcon css={{ size: "$3" }} />
          <Text css={{ include: "screenReaderOnly" }}>image views</Text>
          <Text fs="sm">{formatter.format(todayAttribution.views)}</Text>
        </Flex>
        <Flex ai="center" gap="1">
          <HeartIcon css={{ size: "$3" }} />
          <Text css={{ include: "screenReaderOnly" }}>image likes</Text>
          <Text fs="sm">{formatter.format(todayAttribution?.likes)}</Text>
        </Flex>
        <Flex ai="center" gap="1">
          <DownloadIcon css={{ size: "$3" }} />
          <Text css={{ include: "screenReaderOnly" }}>image downloads</Text>
          <Text fs="sm">{formatter.format(todayAttribution?.downloads)}</Text>
        </Flex>
        <Flex
          as="a"
          href={todayAttribution?.links?.html}
          target="_blank"
          ai="center"
          gap="1"
        >
          <ExternalLinkIcon css={{ size: "$3" }} />
          <Text fs="sm">link</Text>
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

        <Text as="a" target="_blank" href={todayAttribution.user.links.html}>
          {todayAttribution?.user.name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ImageInfo;
