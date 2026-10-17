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
    description: "检查 Button、Input、Select、Tabs、Dropdown/Popover、Tag/Badge 与 Surface/Card，查看完整组件用法。",
    meta: "组件与组合入口",
  },
  {
    id: "benchmarks",
    label: "Benchmarks",
    href: "#benchmarks",
    description: "四类真实业务切片已登记，目前仅提供验证入口。",
    meta: "4 个已登记",
  },
  {
    id: "icons",
    label: "Icons",
    href: "#icons",
    description: "按用途查找图标，查看默认选择、配色与使用示例。",
    meta: "雨课堂完整图标目录",
  },
];
