import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Onboard from "./Onboard";
import useStore from "@store";

function Router() {
  const onboarded = useStore((state) => state.name);
  return onboarded ? <App /> : <Onboard />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
