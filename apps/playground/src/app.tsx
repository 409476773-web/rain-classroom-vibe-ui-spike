import { useEffect, useState } from "react";

import { CoreUiPage } from "./docs/components/core-ui-page";
import { FoundationsPage } from "./docs/foundations-page";
import { OverviewPage } from "./routes/overview-page";

type AppRoute = {
  focusTargetId: string;
  view: "core-ui" | "foundations" | "overview";
};

function resolveRoute(hash: string): AppRoute {
  if (hash === "#foundations") {
    return { focusTargetId: "foundations-title", view: "foundations" };
  }
  if (hash === "#components") {
    return { focusTargetId: "core-ui-title", view: "core-ui" };
  }
  if (hash === "#benchmarks") {
    return { focusTargetId: "benchmarks-title", view: "overview" };
  }
  return { focusTargetId: "overview-title", view: "overview" };
}

export function App() {
  const [location, setLocation] = useState(() => ({
    hash: window.location.hash,
    navigationCount: 0,
  }));
  const route = resolveRoute(location.hash);

  useEffect(() => {
    function handleHashChange() {
      setLocation((current) => ({
        hash: window.location.hash,
        navigationCount: current.navigationCount + 1,
      }));
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (location.navigationCount > 0) {
      document.getElementById(route.focusTargetId)?.focus();
    }
  }, [location.navigationCount, route.focusTargetId]);

  if (route.view === "foundations") {
    return <FoundationsPage />;
  }

  if (route.view === "core-ui") {
    return <CoreUiPage />;
  }

  return <OverviewPage />;
}
