import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

import { BreadcrumbPage } from "./docs/components/breadcrumb-page";
import { TreePage } from "./docs/components/tree-page";
import { ManageTreePage } from "./docs/components/manage-tree-page";
import { AlertPage } from "./docs/components/alert-page";
import { CoreUiPage } from "./docs/components/core-ui-page";
import { InputNumberPage } from "./docs/components/input-number-page";
import { InputPage } from "./docs/components/input-page";
import { SelectPage } from "./docs/components/select-page";
import { DropdownPage } from "./docs/components/dropdown-page";
import { TagPage } from "./docs/components/tag-page";
import { SelectionCardsPage } from "./docs/components/selection-cards-page";
import { SelectionPatternsPage } from "./docs/components/selection-patterns-page";
import { SelectionPlaygroundPage } from "./docs/components/selection-playground-page";
import { RadioPage } from "./docs/components/radio-page";
import { CheckboxPage } from "./docs/components/checkbox-page";
import { IconButtonPage } from "./docs/components/icon-button-page";
import { OptionButtonPage } from "./docs/components/option-button-page";
import { QuestionNumberPage } from "./docs/components/question-number-page";
import { ButtonTokenReviewPage } from "./docs/components/button-token-review";
import { TextButtonHelpPage, TextButtonPage } from "./docs/components/text-button-page";
import { FoundationsPage } from "./docs/foundations-page";
import { TokenFoundationsPage } from "./docs/token-foundations/token-foundations-page";
import { CardPage } from "./docs/components/card-page";
import { LayoutsPage } from "./docs/components/layouts-page";
import { TablePage } from "./docs/components/table-page";
import { AvatarPage } from "./docs/components/avatar-page";
import { DialogPage } from "./docs/components/dialog-page";
import { TabsPage } from "./docs/components/tabs-page";
import { OverviewPage } from "./routes/overview-page";
import { componentDocEntries, type ComponentDocId } from "./docs/components/component-catalog";
const ComponentAssetPage = lazy(() => import("./docs/components/component-asset-page").then(module => ({ default: module.ComponentAssetPage })));

const IconsPage = lazy(() => import("./docs/icons-page").then((module) => ({ default: module.IconsPage })));

const NavigationV042Page = lazy(() => import("./docs/components/navigation-v042-page").then(module => ({ default: module.NavigationV042Page })));

type AppRoute = {
  componentId?: ComponentDocId;
  focusTargetId: string;
  view: "component-asset" | "navigation-v042" | "tree" | "manage-tree" | "breadcrumb" | "alert" | "input-number" | "avatar" | "table" | "layouts" | "dialog" | "card" | "tabs" | "components" | "foundations" | "token-foundations" | "icons" | "overview" | "text-button" | "text-button-help" | "button-tokens" | "icon-button" | "question-number" | "option-button" | "input" | "select" | "dropdown" | "tag" | "checkbox" | "radio" | "selection-cards" | "selection-patterns" | "selection-playground";
};

function resolveRoute(hash: string): AppRoute {
  hash = hash.split("?")[0] ?? "";
  if (hash === "#navigation-v042") return { focusTargetId: "navigation-v042-title", view: "navigation-v042" };
  if (hash === "#tree") return { focusTargetId: "tree-title", view: "tree" };
  if (hash === "#manage-tree") return { focusTargetId: "manage-tree-title", view: "manage-tree" };
  if (hash === "#breadcrumb") return { focusTargetId: "breadcrumb-title", view: "breadcrumb" };
  if (hash === "#alert") return { focusTargetId: "alert-title", view: "alert" };
  const component = componentDocEntries.find(item => hash === `#${item.id}`);
  if (component) return { focusTargetId: `${component.id}-title`, view: "component-asset", componentId: component.id };
  if (hash === "#avatar") return { focusTargetId: "avatar-title", view: "avatar" };
  if (hash === "#layouts") return { focusTargetId: "layouts-title", view: "layouts" };
  if (hash === "#table") return { focusTargetId: "table-title", view: "table" };
  if (hash === "#dialog") return { focusTargetId: "dialog-title", view: "dialog" };
  if (hash === "#card") return { focusTargetId: "card-title", view: "card" };
  if (hash === "#tabs") return { focusTargetId: "tabs-title", view: "tabs" };
  if (hash === "#dropdown") return { focusTargetId: "dropdown-title", view: "dropdown" };
  if (hash === "#selection-playground") return { focusTargetId: "selection-playground-title", view: "selection-playground" };
  if (hash === "#selection-patterns") return { focusTargetId: "selection-patterns-title", view: "selection-patterns" };
  if (hash === "#selection-cards") return { focusTargetId: "selection-cards-title", view: "selection-cards" };
  if (hash === "#radio") return { focusTargetId: "radio-title", view: "radio" };
  if (hash === "#checkbox") return { focusTargetId: "checkbox-title", view: "checkbox" };
  if (hash === "#select" || hash === "#native-select") return { focusTargetId: "select-title", view: "select" };
  if (hash === "#tag") return { focusTargetId: "tag-title", view: "tag" };
  if (hash === "#input-number") return { focusTargetId: "input-number-title", view: "input-number" };
  if (hash === "#input") return { focusTargetId: "input-title", view: "input" };
  if (hash === "#option-button") {
    return { focusTargetId: "option-button-title", view: "option-button" };
  }
  if (hash === "#question-number") {
    return { focusTargetId: "question-number-title", view: "question-number" };
  }
  if (hash === "#icon-button" || hash === "#icon-sizes") {
    return { focusTargetId: hash === "#icon-sizes" ? "icon-sizes-title" : "icon-button-title", view: "icon-button" };
  }
  if (hash === "#button-tokens") {
    return { focusTargetId: "button-token-review-title", view: "button-tokens" };
  }
  if (hash === "#token-foundations") {
    return { focusTargetId: "token-foundations-title", view: "token-foundations" };
  }
  if (hash === "#icons") {
    return { focusTargetId: "icons-title", view: "icons" };
  }
  if (hash === "#text-button") {
    return { focusTargetId: "text-button-title", view: "text-button" };
  }
  if (hash === "#text-button-help") {
    return { focusTargetId: "text-button-help-title", view: "text-button-help" };
  }
  if (hash === "#foundations") {
    return { focusTargetId: "foundations-title", view: "foundations" };
  }
  if (hash === "#components") {
    return { focusTargetId: "core-ui-title", view: "components" };
  }
  if (hash === "#benchmarks") {
    return { focusTargetId: "benchmarks-title", view: "overview" };
  }
  return { focusTargetId: "overview-title", view: "overview" };
}

function RouteFocus({ targetId, navigationCount }: { targetId: string; navigationCount: number }) {
  const previousTarget = useRef<string | null>(null);
  useEffect(() => {
    const sameDestinationDocument = previousTarget.current === targetId && (targetId === "navigation-list-title" || targetId === "navigation-bar-title");
    if (navigationCount > 0 && !sameDestinationDocument) document.getElementById(targetId)?.focus();
    previousTarget.current = targetId;
  }, [navigationCount, targetId]);
  return null;
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

  let page: ReactNode;
  if (route.view === "component-asset" && route.componentId) {
    page = <ComponentAssetPage key={route.componentId} component={route.componentId} navigationCount={location.navigationCount} />;
  } else if (route.view === "navigation-v042") {
    page = <NavigationV042Page />;
  } else if (route.view === "tree") {
    page = <TreePage />;
  } else if (route.view === "manage-tree") {
    page = <ManageTreePage />;
  } else if (route.view === "breadcrumb") {
    page = <BreadcrumbPage />;
  } else if (route.view === "alert") {
    page = <AlertPage />;
  } else if (route.view === "avatar") {
    page = <AvatarPage />;
  } else if (route.view === "table") {
    page = <TablePage />;
  } else if (route.view === "layouts") {
    page = <LayoutsPage />;
  } else if (route.view === "dialog") {
    page = <DialogPage />;
  } else if (route.view === "card") {
    page = <CardPage />;
  } else if (route.view === "tabs") {
    page = <TabsPage />;

  } else if (route.view === "selection-playground") {
    page = <SelectionPlaygroundPage />;
  } else if (route.view === "selection-patterns") {
    page = <SelectionPatternsPage />;
  } else if (route.view === "selection-cards") {
    page = <SelectionCardsPage />;
  } else if (route.view === "radio") {
    page = <RadioPage />;
  } else if (route.view === "checkbox") {
    page = <CheckboxPage />;
  } else if (route.view === "tag") {
    page = <TagPage />;
  } else if (route.view === "input-number") {
    page = <InputNumberPage />;
  } else if (route.view === "input") {
    page = <InputPage />;
  } else if (route.view === "dropdown") {
    page = <DropdownPage />;
  } else if (route.view === "select") {
    page = <SelectPage />;
  } else if (route.view === "option-button") {
    page = <OptionButtonPage />;
  } else if (route.view === "question-number") {
    page = <QuestionNumberPage />;
  } else if (route.view === "icon-button") {
    page = <IconButtonPage />;
  } else if (route.view === "button-tokens") {
    page = <ButtonTokenReviewPage />;
  } else if (route.view === "token-foundations") {
    page = <TokenFoundationsPage />;
  } else if (route.view === "foundations") {
    page = <FoundationsPage />;
  } else if (route.view === "icons") {
    page = <IconsPage />;
  } else if (route.view === "components") {
    page = <CoreUiPage />;
  } else if (route.view === "text-button") {
    page = <TextButtonPage />;
  } else if (route.view === "text-button-help") {
    page = <TextButtonHelpPage />;
  } else {
    page = <OverviewPage />;
  }

  return (
    <Suspense fallback={<main aria-busy="true" className="playground-shell" data-rain-id="playground-loading"><p role="status">正在打开页面…</p></main>}>
      {page}
      <RouteFocus targetId={route.focusTargetId} navigationCount={location.navigationCount} />
    </Suspense>
  );
}
