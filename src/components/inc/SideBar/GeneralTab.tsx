import React from "react";
import { Box, Flex, Switch, Text } from "@components/base";
import { LeftLayout, RightLayout } from "@components/icons";
import useStore from "@store";
import { searchProviders } from "@constants";
import { ProviderItem } from "../CommandMenu";

const GeneralTab = () => {
  const [is24Hour, setIs24Hour] = useStore((state) => [
    state.is24Hour,
    state.setIs24Hour,
  ]);
  const onChecked = (checked: boolean) => setIs24Hour(checked);

  return (
    <>
      <Box css={{ pt: "$8", spacey: "$5" }}>
        <Box>
          <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
            General
          </Text>
          <Text as="p" fs={{ "@initial": "sm", "@md": "md" }}>
            Personalize your experience by changing the settings below
          </Text>
        </Box>
        <Box>
          <Text as="h2" fw="semibold">
            Time
          </Text>
          <Flex jc="between" ai="center" css={{ mt: "$2" }}>
            <Text as="label" fs="sm">
              set time format to 24 hours
            </Text>
            <Switch checked={is24Hour} onCheckedChange={onChecked} />
          </Flex>
        </Box>
        <Box>
          <Text as="h2" fw="semibold">
            Search provider
          </Text>
          <Text fs="sm" css={{ mt: "$2" }}>
            Select your default search provider. You can always change it later
          </Text>
          <Box css={{ mt: "$2", bg: "rgba($bgRGB,0.5)", pd: "$2", br: "$2" }}>
            <SearchProviders />
          </Box>
        </Box>
      </Box>
      <LayoutSetting />
    </>
  );
};

const SearchProviders = () => {
  const [searchProvider, setSearchProvider] = useStore((state) => [
    state.searchProvider,
    state.setSearchProvider,
  ]);
  return (
    <Box>
      {searchProviders.map(({ name }) => (
        <ProviderItem key={name} provider={name} />
      ))}
    </Box>
  );
};

const LayoutSetting = () => {
  const [
    sideBar,
    showTime,
    showGreeting,
    showTodayGoal,
    showTodo,
    showDailyMotivation,
  ] = useStore((state) => [
    state.sideBarPosition,
    state.showTime,
    state.showGreeting,
    state.showTodayGoal,
    state.showTodo,
    state.showDailyMotivation,
  ]);
  const [
    setSideBar,
    setOpen,
    setShowTime,
    setShowGreeting,
    setShowTodayGoal,
    setShowTodo,
    setShowDailyMotivation,
  ] = useStore((state) => [
    state.setSideBarPosition,
    state.setSideBarOpen,
    state.setShowTime,
    state.setShowGreeting,
    state.setShowTodayGoal,
    state.setShowTodo,
    state.setShowDailyMotivation,
  ]);
  const close = (position: "left" | "right") => {
    setOpen(false);
    setSideBar(position);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };
  return (
    <Box css={{ pb: "$5", spacey: "$4" }}>
      <Box css={{ mt: "$5" }}>
        <Text as="h1" fs={{ "@initial": "xl", "@md": "2xl" }} fw="bold">
          Layout
        </Text>
        <Text as="p" fs={{ "@initial": "sm", "@md": "md" }}>
          Select your preferred layout
        </Text>
      </Box>
      <Box>
        <Text as="h2" fw="semibold">
          Show
        </Text>
        <Flex fd="column" gap="1" css={{ mt: "$2" }}>
          <Flex jc="between" ai="center">
            <Text as="label" fs="sm">
              Time
            </Text>
            <Switch
              checked={showTime}
              onCheckedChange={(checked) => setShowTime(checked)}
            />
          </Flex>
          <Flex jc="between" ai="center">
            <Text as="label" fs="sm">
              Greeting
            </Text>
            <Switch
              checked={showGreeting}
              onCheckedChange={(checked) => setShowGreeting(checked)}
            />
          </Flex>

          <Flex jc="between" ai="center">
            <Text as="label" fs="sm">
              Today&apos;s Goal
            </Text>
            <Switch
              checked={showTodayGoal}
              onCheckedChange={(checked) => setShowTodayGoal(checked)}
            />
          </Flex>
          <Flex jc="between" ai="center">
            <Text as="label" fs="sm">
              Todo
            </Text>
            <Switch
              checked={showTodo}
              onCheckedChange={(checked) => setShowTodo(checked)}
            />
          </Flex>
          <Flex jc="between" ai="center">
            <Text as="label" fs="sm">
              Daily motivation
            </Text>
            <Switch
              checked={showDailyMotivation}
              onCheckedChange={(checked) => setShowDailyMotivation(checked)}
            />
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Text as="h2" fw="semibold">
          Change sidebar layout
        </Text>
        <Flex gap="2" css={{ mt: "$2" }}>
          <Box
            onClick={() => {
              close("left");
            }}
            css={{
              $$tabColor:
                sideBar === "left"
                  ? "$colors$text"
                  : "rgba($colors$textRGB, 0.5)",
            }}
          >
            <RightLayout
              css={{
                $$color: "$$tabColor",
              }}
            />
            <Text fs="sm" css={{ color: "$$tabColor" }}>
              Left Layout
            </Text>
          </Box>
          <Box
            onClick={() => {
              close("right");
            }}
            css={{
              $$tabColor:
                sideBar === "right"
                  ? "$colors$text"
                  : "rgba($colors$textRGB, 0.5)",
            }}
          >
            <LeftLayout
              css={{
                $$color: "$$tabColor",
              }}
            />
            <Text fs="sm" css={{ color: "$" }}>
              Right Layout
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default GeneralTab;
