import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Onboard from "./Onboard";
import useStore from "@store";
import { ErrorBoundary } from "react-error-boundary";
import ErrorUI from "@components/inc/ErrorUI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Router() {
  const onboarded = useStore((state) => state.name);
  return onboarded ? <App /> : <Onboard />;
}
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallbackRender={ErrorUI}>
        <Router />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
