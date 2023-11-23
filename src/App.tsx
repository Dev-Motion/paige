import React from "react";
import { MainLayout, Scaffold, Toaster } from "@components/inc";
import * as Tour from "@components/base/Tour";
import useStore from "@store";

function App() {
  const completeTour = useStore((state) => state.completeTour);
  return (
    <Tour.Root
      onEnd={() => {
        completeTour();
      }}
      order={[
        "time",
        "mantra",
        "menu",
        "weather",
        "image-info",
        "quotes",
        "todo",
      ]}
    >
      <MainLayout />
      <Scaffold />
      <Toaster />
    </Tour.Root>
  );
}

export default App;
