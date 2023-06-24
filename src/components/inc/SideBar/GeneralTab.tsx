import React from "react";
import { Box, Flex, Switch, Text } from "@components/base";
import { LeftLayout, RightLayout } from "@components/icons";
import useStore from "@store";
import { searchProviders } from "@constants";
import { ProviderItem } from "../CommandMenu";
import { shallow } from "zustand/shallow";

const GeneralTab = () => {
  const is24Hour = useStore((state) => state.is24Hour);
  const setIs24Hour = useStore((state) => state.setIs24Hour);
  const onChecked = (checked: boolean) => setIs24Hour(checked);

  return (
    <>
      <Box css={{ pt: "$5", spacey: "$5" }}>
        <Box>
          <Text as="h1" fs="lg" fw="bold">
            General
          </Text>
          <Text as="p" fs="xs" css={{ mt: 5 }}>
            Personalize your experience by changing the settings below
          </Text>
        </Box>
        <Box>
          <Text as="h2" fw="semibold" fs="sm">
            Time
          </Text>
          <Flex jc="between" ai="center" css={{ mt: "$2" }}>
            <Text as="label" fs="xs">
              set time format to 24 hours
            </Text>
            <Switch checked={is24Hour} onCheckedChange={onChecked} />
          </Flex>
        </Box>
        <Box>
          <Text as="h2" fs="sm" fw="semibold">
            Search provider
          </Text>
          <Text fs="xs" css={{ mt: "$2" }}>
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
  ] = useStore(
    (state) => [
      state.sideBarPosition,
      state.showTime,
      state.showGreeting,
      state.showTodayGoal,
      state.showTodo,
      state.showDailyMotivation,
    ],
    shallow
  );
  const [
    setSideBar,
    setOpen,
    setShowTime,
    setShowGreeting,
    setShowTodayGoal,
    setShowTodo,
    setShowDailyMotivation,
  ] = useStore(
    (state) => [
      state.setSideBarPosition,
      state.setSideBarOpen,
      state.setShowTime,
      state.setShowGreeting,
      state.setShowTodayGoal,
      state.setShowTodo,
      state.setShowDailyMotivation,
    ],
    shallow
  );
  const close = (position: "left" | "right") => {
    setOpen(false);
    setSideBar(position);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };
  return (
    <Box css={{ mt: "$5", pb: "$5", spacey: "$5" }}>
      <Box>
        <Text as="h1" fs="sm" fw="bold">
          Layout
        </Text>
        <Text as="p" fs={"xs"}>
          Select your preferred layout
        </Text>
        <Flex gap="2" css={{ mt: "$2" }}>
          <Box
            onClick={() => {
              close("left");
            }}
            css={{
              $$tabColor:
                sideBar === "left"
                  ? "$colors$accent"
                  : "rgba($colors$textRGB, 0.5)",
            }}
          >
            <RightLayout
              css={{
                $$color: "$$tabColor",
              }}
            />
            <Text fs="sm" css={{ color: "$text" }}>
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
                  ? "$colors$accent"
                  : "rgba($colors$textRGB, 0.5)",
            }}
          >
            <LeftLayout
              css={{
                $$color: "$$tabColor",
              }}
            />
            <Text fs="sm" css={{ color: "$text" }}>
              Right Layout
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Text as="h2" fs="sm" fw="semibold">
          Show
        </Text>
        <Flex fd="column" gap="1" css={{ mt: "$2" }}>
          <Flex jc="between" ai="center">
            <Text as="label" fs="xs">
              Time
            </Text>
            <Switch
              checked={showTime}
              onCheckedChange={(checked) => setShowTime(checked)}
            />
          </Flex>
          <Flex jc="between" ai="center">
            <Text as="label" fs="xs">
              Greeting
            </Text>
            <Switch
              checked={showGreeting}
              onCheckedChange={(checked) => setShowGreeting(checked)}
            />
          </Flex>

          <Flex jc="between" ai="center">
            <Text as="label" fs="xs">
              Today&apos;s Goal
            </Text>
            <Switch
              checked={showTodayGoal}
              onCheckedChange={(checked) => setShowTodayGoal(checked)}
            />
          </Flex>
          <Flex jc="between" ai="center">
            <Text as="label" fs="xs">
              Todo
            </Text>
            <Switch
              checked={showTodo}
              onCheckedChange={(checked) => setShowTodo(checked)}
            />
          </Flex>
          <Flex jc="between" ai="center">
            <Text as="label" fs="xs">
              Daily motivation
            </Text>
            <Switch
              checked={showDailyMotivation}
              onCheckedChange={(checked) => setShowDailyMotivation(checked)}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
export default GeneralTab;
