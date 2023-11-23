import * as React from "react";

import { Dialog, Button, Text, Card, Box, Flex } from "@components/base";
import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTour } from "@components/base/Tour";

const carouselImages = [
  "./images/carousel/1.png",
  "./images/carousel/2.png",
  "./images/carousel/3.png",
];
export default function WelcomeDialog() {
  const { currentStep, goToNextStep, start, endTour } = useTour();
  const display = currentStep === "welcome";
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay()],
  );

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);
  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);
  React.useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);
  if (!display || !start) {
    return null;
  }
  return (
    <Dialog open>
      <Dialog.Content overlay asChild>
        <Card
          py="6"
          css={{
            width: "100vw",
            maxWidth: 400,
            display: "flex",
            fd: "column",
            gap: "$4",
          }}
        >
          <Box px="4">
            <Box
              ref={emblaRef}
              css={{
                overflow: "hidden",
              }}
            >
              <Flex css={{}}>
                {carouselImages.map((src) => {
                  return (
                    <Box
                      key={src}
                      css={{
                        flex: "0 0 100%",
                        minWidth: 0,
                        bg: "rgba($textRGB,0.4)",
                        height: 300,
                        mr: "$2",
                      }}
                    />
                  );
                })}
              </Flex>
            </Box>
            <Flex
              jc="center"
              ai="center"
              gap="4"
              css={{
                py: "$2",
              }}
            >
              {scrollSnaps.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => scrollTo(i)}
                  css={{
                    bg: i === selectedIndex ? "$accent" : "rgba($textRGB,0.8)",
                    size: i === selectedIndex ? 12 : 10,
                    br: "$pill",
                  }}
                />
              ))}
            </Flex>
          </Box>
          <Flex
            fd="column"
            gap="2"
            css={{
              px: "$6",
            }}
          >
            <Text as="h1" fs="2xl" ta="center" fw="bold">
              Welcome to Paige
            </Text>
            <Text as="p" ta="center">
              Get started right away and personalize your browsing experience..
              Create reminders for tasks and get notified when due
            </Text>
            <Flex
              jc="between"
              css={{
                pt: "$4",
              }}
            >
              <Button kind="outline" br="md" onClick={endTour}>
                Skip Tour
              </Button>
              <Button color="accent" br="md" onClick={goToNextStep}>
                Start Tour
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}
