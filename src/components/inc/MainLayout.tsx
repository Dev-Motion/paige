import React, { Suspense, lazy } from "react";
import { Box, Flex, Grid } from "@components/base";

import {
  Time,
  Mantra,
  Reminder,
  Search,
  PinnedSites,
} from "@components/inc/widgets";

import { TopBar, BottomBar } from "@components/inc";
import Portal from "@utils/Portals";

const SideBar = lazy(() => import("./SideBar"));

const MainLayout = () => {
  return (
    <Grid
      css={{
        height: "100vh",
        gridTemplateRows: "1fr auto",
        overflow: "hidden",
      }}
    >
      <Portal root="side_bar_root">
        <Suspense fallback={<Box />}>
          <SideBar />
        </Suspense>
      </Portal>
      <TopBar />
      <Grid
        ai="center"
        as="main"
        css={{
          flex: 1,
          overflow: "hidden",
          gridTemplateRows: "2fr 1fr 2fr",
          // gridTemplateRows: "auto auto 1fr",
          // "@lg": {
          //   gridTemplateRows: "1fr auto 1fr",
          // },
        }}
      >
        <Flex ai="center" jc="center">
          <Time />
        </Flex>
        <Search />
        <PinnedSites />
        <Flex
          ai="center"
          fd="column"
          css={{
            pt: "$4",
            height: "100%",
            "&>*": {
              flex: 1,
            },
          }}
          gap={6}
        >
          {/* <Mantra /> */}
          <Reminder />
        </Flex>
      </Grid>
      <BottomBar />
    </Grid>
  );
};

export default MainLayout;
