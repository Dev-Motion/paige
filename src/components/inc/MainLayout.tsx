import React from "react";
import { Flex, Grid } from "@components/base";
import {
  Time,
  Search,
  Mantra,
  Reminder,
  SideBar,
  TopBar,
  BottomBar,
} from "@components/inc";
import Portal from "@utils/Portals";

const MainLayout = () => {
  // chrome.bookmarks.search("github", (results) => {
  //   console.log("trying");
  //   console.log(results);
  // });
  return (
    <Flex
      fd="column"
      css={{
        minHeight: "100vh",
      }}
    >
      <Portal root="side_bar_root">
        <SideBar />
      </Portal>
      <TopBar />
      <Grid
        ai="center"
        as="main"
        css={{
          flex: 1,
          gridTemplateRows: "1fr 1fr",
          "&>*": {
            height: "100%",
          },
        }}
      >
        <Flex ai="center" jc="between" fd="column" css={{ pb: "$5" }}>
          <Time />
          <Search />
        </Flex>
        <Flex ai="center" fd="column" jc="end" gap={6}>
          <Mantra />
          <Reminder />
        </Flex>
      </Grid>
      <BottomBar />
    </Flex>
  );
};

export default MainLayout;
