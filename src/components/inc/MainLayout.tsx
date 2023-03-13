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
    <Grid
      // fd="column"
      css={{
        height: "100vh",
        gridTemplateRows: "1fr auto",
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
          <Mantra />
          {/* <Reminder /> */}
        </Flex>
      </Grid>
      <BottomBar />
      {/* <CommandMenu /> */}
      {/* To prevent the default chrome behaviour of focusing on the the chrome search bar */}
      <Flex
        as="input"
        autoFocus
        css={{
          include: "screenReaderOnly",
        }}
      />
    </Grid>
  );
};

export default MainLayout;
