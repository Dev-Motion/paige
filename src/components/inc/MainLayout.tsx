import React, { Suspense, lazy } from "react";
import { Flex, Grid } from "@components/base";
import {
  Time,
  Mantra,
  Reminder,
  TopBar,
  BottomBar,
  CommandMenu,
  Search,
} from "@components/inc";
import Portal from "@utils/Portals";

const SideBar = lazy(() => import("./SideBar"));

const MainLayout = () => {
  return (
    <Flex
      fd="column"
      css={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Portal root="side_bar_root">
        <Suspense fallback={<div />}>
          <SideBar />
        </Suspense>
      </Portal>
      <TopBar />
      <Grid
        ai="center"
        as="main"
        css={{
          flex: 1,
          gridTemplateRows: "1fr auto 1fr",
        }}
      >
        <Flex ai="center" jc="center">
          <Time />
        </Flex>
        <Search />
        <Flex
          ai="center"
          fd="column"
          css={{
            mt: "$3",
            "&>*": {
              flex: 1,
            },
          }}
          gap={6}
        >
          <Mantra />
          <Reminder />
        </Flex>
      </Grid>
      <BottomBar />
      <CommandMenu />
    </Flex>
  );
};

export default MainLayout;
