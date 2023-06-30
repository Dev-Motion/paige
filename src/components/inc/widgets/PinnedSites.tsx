import { Box, Card, Dialog, Flex, Text } from "@components/base";
import { Button } from "@components/base/Button";
import { AddIcon } from "@components/icons";
import { isRunningInExtension } from "@constants";
import useStore from "@store";
import { faviconURL } from "@utils";
import React from "react";
import { CSS } from "stitches.config";

function PinnedSites() {
  const pinnedSites = useStore((state) => state.pinnedSites);
  return (
    <Flex css={{ jc: "center", gap: "$3", mt: "$3" }}>
      {pinnedSites.map((data) => (
        <SiteBlock key={data.id} {...data} />
      ))}
      <AddSite />
    </Flex>
  );
}

function AddSite() {
  const pinnedSite = useStore((state) => state.pinnedSites);
  const addPinnedSite = useStore((state) => state.addPinnedSite);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  const [topSites, setTopSites] = React.useState<
    chrome.topSites.MostVisitedURL[]
  >([]);
  if (pinnedSite.length >= 5) return null;
  if (isRunningInExtension) {
    chrome.topSites.get((sites) => setTopSites(sites.slice(0, 8)));
  }
  return (
    <Dialog>
      <Dialog.Button asChild>
        <Flex
          as="button"
          fd="column"
          ai="center"
          css={{ include: "buttonReset", width: 60 }}
        >
          <Card
            css={{
              bg: "rgba($bgRGB,0.7)",
              br: "10",
              display: "flex",
              pd: 8,
              size: 40,
              jc: "center",
              ai: "center",
            }}
          >
            <AddIcon css={{ color: "$text" }} />
          </Card>
          <Text
            fs="xs"
            fw="bold"
            css={{ mt: "$1", ta: "center", color: "$text" }}
          >
            Add a site
          </Text>
        </Flex>
      </Dialog.Button>
      <Dialog.Content overlay>
        <Card css={{ pd: "$5", maxWidth: 330 }}>
          <Dialog.Close
            css={{ position: "absolute", top: "$2", right: "$2" }}
          />
          <Box>
            <Text as="h1" fs="lg" fw="bold" css={{ mb: "$2" }}>
              Add a Site
            </Text>
            <Text as="p" fs="sm">
              You can add any site or webpage. You can paste the webpage link or
              select a top visited site below, to add a site to your paige
            </Text>
          </Box>
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              const title = formData.get("website-title") as string;
              const url = formData.get("website-url") as string;
              if (!(title && url)) {
                setErrorMessage("Title and Url are neccessary");
                return;
              }
              addPinnedSite({ title, url });
              setErrorMessage(null);
            }}
            css={{ spacey: "$2", py: "$2" }}
          >
            <Flex fd="column" gap="1">
              <Text
                as="label"
                fs="xs"
                htmlFor="website-title"
                css={{ mr: "$2" }}
              >
                Title
              </Text>
              <Box
                as="input"
                placeholder="Add a title here"
                id="website-title"
                name="website-title"
                css={{
                  bg: "transparent",
                  outline: "none",
                  border: "1px solid $colors$text",
                  br: "$4",
                  px: "$2",
                  py: "$2",
                  color: "$text",
                  "&::placeholder": {
                    color: "rgba($textRGB,0.5)",
                  },
                }}
              />
            </Flex>
            <Flex fd="column" gap="1">
              <Text as="label" fs="xs" htmlFor="website-url" css={{ mr: "$2" }}>
                Url
              </Text>
              <Box
                as="input"
                placeholder="Paste a webpage or site here"
                id="website-url"
                name="website-url"
                css={{
                  bg: "transparent",
                  outline: "none",
                  border: "1px solid $colors$text",
                  br: "$4",
                  px: "$2",
                  py: "$2",
                  color: "$text",
                  "&::placeholder": {
                    color: "rgba($textRGB,0.5)",
                  },
                }}
              />
              <Text fs="xs" css={{ color: "red" }}>
                {errorMessage}
              </Text>
            </Flex>

            <Flex jc="end">
              <Button size="sm">Add site</Button>
            </Flex>
          </Box>
          {isRunningInExtension && (
            <Box>
              <Text fw="bold" fs="sm" css={{ mb: "$1" }}>
                Most visited sites
              </Text>
              <Flex wrap="wrap" jc="between" css={{ rowGap: "$2" }}>
                {topSites.map((data, i) => {
                  return (
                    <SiteBlock
                      css={{ include: "buttonReset" }}
                      button
                      onClick={() => addPinnedSite(data)}
                      transparent
                      key={i}
                      {...data}
                    />
                  );
                })}
              </Flex>
            </Box>
          )}
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}
//if it's a button it should have an OnClick functoion
type buttonSite =
  | {
      button?: false;
      onClick?: never;
    }
  | {
      button: true;
      onClick?: () => void;
    };
function SiteBlock({
  url,
  title,
  transparent,
  button = false,
  css,
  onClick,
}: {
  url: string;
  title: string;
  transparent?: boolean;
  button?: boolean;
  css?: CSS;
} & buttonSite) {
  // remove https:// and return only root domain
  const domain = url.replace("https://", "").split("/")[0];
  const size = 32;
  return (
    <Flex
      as={button ? "button" : "a"}
      onClick={onClick}
      href={url}
      fd="column"
      ai="center"
      css={{ ...css, width: 60 }}
    >
      <Card
        css={{
          bg: transparent ? "transparent" : "rgba($bgRGB,0.7)",
          backdropFilter: transparent ? "none" : "",
          br: "10",
          display: "flex",
          pd: 8,
          size: 40,
          jc: "center",
          ai: "center",
        }}
      >
        <Box
          as="img"
          css={{ width: "100%", objectFit: "contain" }}
          src={
            isRunningInExtension
              ? faviconURL(url)
              : `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
          }
        />
      </Card>
      <Text
        fs="xs"
        fw="bold"
        css={{
          mt: "$1",
          ta: "center",
          width: "100%",
          color: "$text",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {title}
      </Text>
    </Flex>
  );
}

export default PinnedSites;
