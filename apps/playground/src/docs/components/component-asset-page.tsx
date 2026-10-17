import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SwitchPage } from "./switch-page";
import { AccordionPage } from "./accordion-page";
import { CollapsiblePage } from "./collapsible-page";
import { ResizablePage } from "./resizable-page";
import { TooltipPage } from "./tooltip-page";
import { ButtonGroupPage } from "./button-group-page";
import { TogglePage } from "./toggle-page";
import { ToggleGroupPage } from "./toggle-group-page";
import { SpinnerPage } from "./spinner-page";
import { SkeletonPage } from "./skeleton-page";
import { ToastPage } from "./toast-page";
import { TypographyPage, ItemPage, ProgressPage } from "./g4-component-pages";
import { G3ComponentPage, type G3ComponentId } from "./g3-component-pages";
import { NavigationComponentPage, type NavigationComponentId } from "./navigation-component-pages";
import type { ComponentDocId } from "./component-catalog";
import type { ChartId } from "./chart-catalog";
import type { ChinaChartSettings } from "./chart-business/china-region-examples";
import type { G5ComponentId } from "./g5-component-pages";
const G5ComponentPage = lazy(() => import("./g5-component-pages").then(module => ({ default: module.G5ComponentPage })));
const G6MediaPage = lazy(() => import("./g6-media-pages").then(module => ({ default: module.G6MediaPage })));
const G6InteractionPage = lazy(() => import("./g6-interaction-pages").then(module => ({ default: module.G6InteractionPage })));
const ConversationComposerPage = lazy(() => import("./conversation-composer-page").then(module => ({default:module.ConversationComposerPage})));
const G6ConversationPage = lazy(() => import("./g6-conversation-pages").then(module => ({ default: module.G6ConversationPage })));
const ChinaRegionPage = lazy(() => import("./chart-business/china-region-page").then(module => ({ default: module.ChinaRegionPage })));
const ChinaSource = lazy(() => import("./chart-china-source").then(module => ({ default: module.ChartChinaSource })));
function ChinaDownload({ settings }: { settings: ChinaChartSettings }) {
  const [open, setOpen] = useState(false);
  return <details className="rain-chart-source" onToggle={event => setOpen(event.currentTarget.open)}><summary>中国地图配置、完整源码与边界数据</summary>{open && <Suspense fallback={<p role="status">正在载入源码与边界数据…</p>}><ChinaSource settings={settings} /></Suspense>}</details>;
}
const ChartPage = lazy(() => import("./chart-page").then(module => ({ default: module.ChartPage })));
const ChartBusinessPage = lazy(() => import("./chart-business/chart-business-page").then(module => ({ default: module.ChartBusinessPage })));
const CategoryChartPage = lazy(async () => {
  const [page, source] = await Promise.all([import("./chart-business/category-page"), import("./chart-example-source")]);
  return { default: ({ navigationCount }: { navigationCount: number }) => <page.CategoryChartPage navigationCount={navigationCount} renderSource={settings => <source.ChartCategorySource settings={settings} />} /> };
});
const NetworkChartPage = lazy(async () => {
  const [page, source] = await Promise.all([import("./chart-business/network-page"), import("./chart-example-source")]);
  return { default: ({ navigationCount }: { navigationCount: number }) => <page.NetworkChartPage navigationCount={navigationCount} renderSource={settings => <source.ChartNetworkSource settings={settings} />} /> };
});

const pages = { switch:SwitchPage, accordion:AccordionPage, collapsible:CollapsiblePage, resizable:ResizablePage, tooltip:TooltipPage, "button-group":ButtonGroupPage, toggle:TogglePage, "toggle-group":ToggleGroupPage, spinner:SpinnerPage, skeleton:SkeletonPage, toast:ToastPage, typography:TypographyPage, item:ItemPage, progress:ProgressPage };
const g3 = ["scroll-area","sheet","sidebar","command","kbd","context-menu","hover-card","menubar","navigation-menu"];
export function ComponentAssetPage({ component, navigationCount = 0 }: { component: ComponentDocId; navigationCount?: number }) {
  const previousComponent = useRef<ComponentDocId | null>(null);
  useEffect(() => {
    const sameDestinationDocument = previousComponent.current === component && (component === "navigation-list" || component === "navigation-bar");
    if (navigationCount > 0 && !sameDestinationDocument) document.getElementById(`${component}-title`)?.focus();
    previousComponent.current = component;
  }, [component, navigationCount]);
  if (component === "conversation-composer") return <Suspense fallback={<p role="status">正在载入对话输入…</p>}><ConversationComposerPage/></Suspense>;
  if (component === "chart-business") return <Suspense fallback={<p role="status">正在载入图表…</p>}><ChartBusinessPage navigationCount={navigationCount} /></Suspense>;
  if (["label", "field", "input-group", "combobox", "slider", "calendar", "date-picker"].includes(component)) return <Suspense fallback={<p role="status">正在载入表单组件…</p>}><G5ComponentPage key={component} component={component as G5ComponentId} /></Suspense>;
  if (component === "data-table" || component === "aspect-ratio" || component === "attachment" || component === "direction") return <Suspense fallback={<p role="status">正在载入媒体组件…</p>}><G6MediaPage key={component} component={component} /></Suspense>;
  if (component === "drawer" || component === "input-otp" || component === "carousel") return <Suspense fallback={<p role="status">正在载入交互组件…</p>}><G6InteractionPage key={component} component={component} /></Suspense>;
  if (component === "bubble" || component === "marker" || component === "message" || component === "message-scroller" || component === "questionnaire") return <Suspense fallback={<p role="status">正在载入会话组件…</p>}><G6ConversationPage key={component} component={component} /></Suspense>;
  if (component === "chart-category") return <Suspense fallback={<p role="status">正在载入图表…</p>}><CategoryChartPage navigationCount={navigationCount} /></Suspense>;
  if (component === "chart-network") return <Suspense fallback={<p role="status">正在载入图表…</p>}><NetworkChartPage navigationCount={navigationCount} /></Suspense>;
  if (component === "chart-china") return <Suspense fallback={<p role="status">正在载入图表…</p>}><ChinaRegionPage navigationCount={navigationCount} renderSource={settings => <ChinaDownload settings={settings} />} /></Suspense>;
  if (component.startsWith("chart-")) return <Suspense fallback={<p role="status">正在载入图表…</p>}><ChartPage key={component} id={component.slice(6) as ChartId} navigationCount={navigationCount} /></Suspense>;
  if (component in pages) { const Page = pages[component as keyof typeof pages]; return <Page />; }
  if (g3.includes(component)) return <G3ComponentPage component={component as G3ComponentId} />;
  return <NavigationComponentPage component={component as NavigationComponentId} />;
}
