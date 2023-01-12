import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SideBarProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SideBarProvider>
      <App />
    </SideBarProvider>
  </React.StrictMode>
);
