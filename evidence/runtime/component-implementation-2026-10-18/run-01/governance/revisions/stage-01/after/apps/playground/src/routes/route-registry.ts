import documentationRoutes from "../../../../config/asset-documentation-routes.json";
import type { ComponentDocId } from "../docs/components/component-catalog";

export type AppRoute = {
  componentId?: ComponentDocId;
  focusTargetId: string;
  view: "compositions" | "component-asset" | "navigation-v042" | "tree" | "manage-tree" | "breadcrumb" | "alert" | "input-number" | "avatar" | "table" | "layouts" | "dialog" | "card" | "tabs" | "components" | "foundations" | "token-foundations" | "icons" | "overview" | "text-button" | "text-button-help" | "button-tokens" | "icon-button" | "question-number" | "option-button" | "input" | "select" | "dropdown" | "tag" | "checkbox" | "radio" | "selection-cards" | "selection-patterns" | "selection-playground";
};


export type OverviewRoute = {
  id: "foundations" | "components" | "icons" | "benchmarks";
  label: "Foundations" | "Components" | "Icons" | "Benchmarks";
  href: "#foundations" | "#components" | "#icons" | "#benchmarks";
  description: string;
  meta: string;
};

export const overviewRoutes: readonly OverviewRoute[] = [
  {
    id: "foundations",
    label: "Foundations",
    href: "#foundations",
    description: "查看 Token 目录、完整排版方案，以及字体、密度、Focus 与 Motion 使用规则。",
    meta: "基础体系总入口",
  },
  {
    id: "components",
    label: "Components",
    href: "#components",
    description: "按用途查看基础控件、表单、导航、工作区、图表与会话组合的用法。",
    meta: "组件与组合入口",
  },
  {
    id: "benchmarks",
    label: "Benchmarks",
    href: "#benchmarks",
    description: "查看数据管理、大表单、批改工作台与报告切片的当前实现与独立验收状态。",
    meta: "4 类业务切片",
  },
  {
    id: "icons",
    label: "Icons",
    href: "#icons",
    description: "按用途查找图标，查看默认选择、配色与使用示例。",
    meta: "雨课堂完整图标目录",
  },
];

/** Shared explicit routes preserve legacy hashes and their destination/focus contract. */
export function resolveAppRoute(hash: string): AppRoute {
  const pathname = hash.split("?")[0] ?? "";
  const binding = documentationRoutes.routes.find(route => route.href === pathname);
  if (!binding) return { focusTargetId: "overview-title", view: "overview" };
  return {
    focusTargetId: binding.focusTargetId,
    view: binding.pageKey as AppRoute["view"],
    ...(binding.componentId ? { componentId: binding.componentId as ComponentDocId } : {}),
  };
}
