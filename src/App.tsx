import React from "react";
import { MainLayout, Scaffold } from "@components/inc";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <MainLayout />
      <Scaffold />
      <Toaster />
    </>
  );
}

export default App;
