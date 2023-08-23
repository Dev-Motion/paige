import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Onboard from "./Onboard";
import useStore from "@store";
import { ErrorBoundary } from "react-error-boundary";
import ErrorUI from "@components/inc/ErrorUI";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// 1. the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// 2. the persister
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function Router() {
  const onboarded = useStore((state) => state.name);
  return onboarded ? <App /> : <Onboard />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      persistOptions={{ persister }}
      client={queryClient}
    >
      <ErrorBoundary fallbackRender={ErrorUI}>
        <Router />
      </ErrorBoundary>
    </PersistQueryClientProvider>
  </React.StrictMode>
);
