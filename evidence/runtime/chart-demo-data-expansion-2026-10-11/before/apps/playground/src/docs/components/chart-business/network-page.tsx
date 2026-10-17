import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Button, Link, RadioGroup } from "@rain-next/ui";
import type { RainChartRecipe, NetworkChartVariant } from "@rain-next/ui/charts";
import { NetworkExamples } from "./network-examples";
import { NETWORK_FIXTURES, makeNetworkFixtures, type NetworkFixtureId, type NetworkChartState } from "./network-data";
import "../component-doc.css";
import "../chart-page.css";
import "@rain-next/ui/charts/styles.css";
import "./network-page.css";

export type NetworkChartSettings = { fixtureId: NetworkFixtureId | "all"; state: NetworkChartState; relation: string; revision: number; recipe: RainChartRecipe; variant?: NetworkChartVariant };

export function NetworkChartPage({ navigationCount = 0, renderSource }: { navigationCount?: number; renderSource?: (settings: NetworkChartSettings) => ReactNode }) {
  const [fixtureId, setFixtureId] = useState<NetworkFixtureId | "all">("all");
  const [state, setState] = useState<NetworkChartState>("normal");
  const [relation, setRelation] = useState("all");
  const [revision, setRevision] = useState(0);
  const [recipe, setRecipe] = useState<RainChartRecipe>("monochrome-blue");
  const [variant, setVariant] = useState<NetworkChartVariant>("glow");
  const reduced = useReducedMotion() ?? false;
  const relations = makeNetworkFixtures().find(fixture => fixture.id === fixtureId)?.relations ?? [];
  useEffect(() => { if (navigationCount) document.getElementById("chart-network-title")?.focus(); }, [navigationCount]);
  return <MotionConfig reducedMotion={reduced ? "always" : "never"}><main className="component-doc rain-chart-network" data-rain-id="doc-chart-network" data-asset-identity="registry-candidate">
    <header className="component-doc__header"><Link href="#components">返回组件目录</Link>
      <div className="component-doc__title"><h1 id="chart-network-title" tabIndex={-1}>网络关系图</h1><span>共享候选 · 未发布 · 待视觉审阅</span></div>
      <p>查看元素、知识点和课程的连接，区分节点类别与关系类型，并读取方向及关联详情。</p>
    </header>
    <RadioGroup className="rain-network-appearance" legend="呈现样式" orientation="horizontal" value={variant} onValueChange={value => setVariant(value as NetworkChartVariant)} options={[{ value: "glow", label: "柔光网络" }, { value: "structured", label: "结构化关系" }]} />
    <div className="rain-network-controls">
      <label>业务场景<select aria-label="网络业务场景" value={fixtureId} onChange={event => { setFixtureId(event.target.value as NetworkFixtureId | "all"); setRelation("all"); }}><option value="all">全部场景</option>{NETWORK_FIXTURES.map(fixture => <option key={fixture.id} value={fixture.id}>{fixture.label}</option>)}</select></label>
      <label>数据状态<select aria-label="网络数据状态" value={state} onChange={event => setState(event.target.value as NetworkChartState)}>{Object.entries({ normal: "正常", empty: "无数据", single: "单节点", long: "长名称", invalid: "无效数据" }).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label>关系<select aria-label="网络关系类型" value={relation} disabled={fixtureId === "all"} onChange={event => setRelation(event.target.value)}><option value="all">全部关系</option>{relations.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
      <label>配色<select aria-label="网络图表配色" value={recipe} onChange={event => setRecipe(event.target.value as RainChartRecipe)}><option value="monochrome-blue">蓝灰单色</option><option value="category-near">蓝紫近邻</option><option value="category-wide">多色类别</option></select></label>
      <Button size="small" variant="secondary" onClick={() => setRevision(value => value + 1)}>更新数据</Button>
    </div>
    <p className="rain-network-status" role="status">示例数据 · 更新 {revision} 次{reduced ? " · 已按系统设置减少动效" : ""}</p>
    <NetworkExamples fixtureId={fixtureId === "all" ? undefined : fixtureId} state={state} revision={revision} relation={relation} recipe={recipe} variant={variant} reduced={reduced} />
    {renderSource?.({ fixtureId, state, relation, revision, recipe, variant })}
  </main></MotionConfig>;
}
