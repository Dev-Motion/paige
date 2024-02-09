import * as React from "react";

import { Dialog, Button, Text, Card, Box, Flex } from "@components/base";
import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTour } from "@components/base/Tour";
import { motion } from "framer-motion";

const carouselImages = [
  { image: "./images/tour-1.png", alt: "Task Management" },
  { image: "./images/tour-2.png", alt: "Personalization" },
  { image: "./images/tour-3.png", alt: "Other Useful widgets" },
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
          css={{
            width: "100vw",
            maxWidth: 400,
            display: "flex",
            fd: "column",
            gap: "$4",
            pt: "$4",
            pb: "$6",
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
                {carouselImages.map((img, i) => {
                  return (
                    <Box
                      key={i}
                      css={{
                        flex: "0 0 100%",
                        minWidth: 0,
                        mr: "$2",
                      }}
                    >
                      <img
                        src={img.image}
                        alt={img.alt}
                        width={800}
                        height={480}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Box>
                  );
                })}
              </Flex>
            </Box>
            <Flex
              jc="center"
              ai="center"
              gap="2"
              css={{
                py: "$2",
              }}
            >
              {scrollSnaps.map((_, i) => {
                const current = i === selectedIndex;
                return (
                  <Box
                    key={i}
                    onClick={() => scrollTo(i)}
                    as={motion.div}
                    layoutId={
                      current ? "selected-step-index" : `unselected-${i}`
                    }
                    css={{
                      bg: current ? "$accent" : "rgba($textRGB,0.8)",
                      height: 10,
                      width: current ? 36 : 10,
                      br: "$pill",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
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
            <Text fs="sm" as="p" ta="center">
              Your personal new tab companion. Plan, navigate, and personalize
              your space. Focus, inspire, and achieve with every new tab.
            </Text>
            <Flex
              jc="between"
              css={{
                pt: "$4",
                gap: "$2",
                "&>*": {
                  flex: 1,
                },
              }}
            >
              <Button kind="outline" br="md" onClick={endTour}>
                Skip Tour
              </Button>
              <Button color="accent" br="md" onClick={goToNextStep}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}
