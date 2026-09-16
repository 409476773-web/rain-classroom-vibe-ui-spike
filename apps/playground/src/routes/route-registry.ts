export type OverviewRoute = {
  id: "foundations" | "components" | "benchmarks";
  label: "Foundations" | "Components" | "Benchmarks";
  href: "#foundations" | "#components" | "#benchmarks";
  description: string;
  meta: string;
};

export const overviewRoutes: readonly OverviewRoute[] = [
  {
    id: "foundations",
    label: "Foundations",
    href: "#foundations",
    description: "检查语义色、字体、密度、Focus 与 Motion 的 Day 2 合同。",
    meta: "42 个语义色角色",
  },
  {
    id: "components",
    label: "Components",
    href: "#components",
    description: "检查 Button、Input、Tag/Badge 与 Surface/Card 的状态矩阵。",
    meta: "4 个 prototype-ready 候选",
  },
  {
    id: "benchmarks",
    label: "Benchmarks",
    href: "#benchmarks",
    description: "四类真实业务切片已登记，目前仅提供验证入口。",
    meta: "4 个已登记",
  },
];
