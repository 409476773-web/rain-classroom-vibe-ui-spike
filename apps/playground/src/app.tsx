import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

import { BreadcrumbPage } from "./docs/components/breadcrumb-page";
import { TreePage } from "./docs/components/tree-page";
import { ManageTreePage } from "./docs/components/manage-tree-page";
import { AlertPage } from "./docs/components/alert-page";
import { CompositionsPage } from "./docs/components/compositions-page";
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
import { resolveAppRoute } from "./routes/route-registry";
const ComponentAssetPage = lazy(() => import("./docs/components/component-asset-page").then(module => ({ default: module.ComponentAssetPage })));

const IconsPage = lazy(() => import("./docs/icons-page").then((module) => ({ default: module.IconsPage })));

const NavigationV042Page = lazy(() => import("./docs/components/navigation-v042-page").then(module => ({ default: module.NavigationV042Page })));


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
  const route = resolveAppRoute(location.hash);

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
  } else if (route.view === "compositions") {
    page = <CompositionsPage />;
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
