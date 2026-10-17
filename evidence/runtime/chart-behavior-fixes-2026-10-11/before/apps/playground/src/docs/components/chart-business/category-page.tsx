import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Button, Link } from "@rain-next/ui";
import type { RainChartRecipe } from "@rain-next/ui/charts";
import { CategoryExamples } from "./category-examples";
import { CATEGORY_FIXTURES, type CategoryChartState, type CategoryFixtureId } from "./comparison-data";
import "../component-doc.css";
import "@rain-next/ui/charts/styles.css";
import "./category-page.css";

export type CategoryChartSettings = { fixtureId: CategoryFixtureId | "all"; state: CategoryChartState; revision: number; replay: number; descending: boolean; recipe: RainChartRecipe };

export function CategoryChartPage({ navigationCount = 0, renderSource }: { navigationCount?: number; renderSource?: (settings: CategoryChartSettings) => ReactNode }) {
  const [fixtureId, setFixtureId] = useState<CategoryFixtureId | "all">("all");
  const [state, setState] = useState<CategoryChartState>("normal");
  const [revision, setRevision] = useState(0), [replay, setReplay] = useState(0);
  const [descending, setDescending] = useState(false);
  const [recipe, setRecipe] = useState<RainChartRecipe>("monochrome-blue");
  const reduced = useReducedMotion() ?? false;
  useEffect(() => { if (navigationCount) document.getElementById("chart-category-title")?.focus(); }, [navigationCount]);
  return <MotionConfig reducedMotion={reduced ? "always" : "never"}><main className="component-doc rain-chart-category" data-rain-id="doc-chart-category" data-asset-identity="registry-candidate">
    <header className="component-doc__header"><Link href="#components">返回组件目录</Link>
      <div className="component-doc__title"><h1 id="chart-category-title" tabIndex={-1}>分类趋势与业务对照</h1><span>共享候选 · 未发布 · 待视觉审阅</span></div>
      <p>按学期、学院、知识点层级和版本比较，保留每个类别的身份、单位和原始读数。</p>
    </header>
    <div className="rain-category-controls">
      <label>业务场景<select aria-label="分类业务场景" value={fixtureId} onChange={event => setFixtureId(event.target.value as CategoryFixtureId | "all")}><option value="all">全部场景</option>{CATEGORY_FIXTURES.map(fixture => <option key={fixture.id} value={fixture.id}>{fixture.label}</option>)}</select></label>
      <label>数据状态<select aria-label="分类数据状态" value={state} onChange={event => setState(event.target.value as CategoryChartState)}>{Object.entries({ normal: "正常", zero: "全零", missing: "局部缺测", empty: "无数据", single: "单项", long: "长名称", invalid: "无效数据" }).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label>配色<select aria-label="分类图表配色" value={recipe} onChange={event => setRecipe(event.target.value as RainChartRecipe)}><option value="monochrome-blue">蓝灰单色</option><option value="category-near">蓝紫近邻</option><option value="category-wide">多色类别</option></select></label>
      <Button size="small" variant="secondary" onClick={() => setRevision(value => value + 1)}>更新数据</Button>
      <Button size="small" variant="secondary" onClick={() => setReplay(value => value + 1)}>重播动效</Button>
      <Button size="small" variant="secondary" aria-pressed={descending} onClick={() => setDescending(value => !value)}>反转类别顺序</Button>
    </div>
    <p className="rain-category-status" role="status">示例数据 · 更新 {revision} 次{reduced ? " · 已按系统设置减少动效" : ""}</p>
    <CategoryExamples fixtureId={fixtureId === "all" ? undefined : fixtureId} state={state} revision={revision} replay={replay} descending={descending} recipe={recipe} reduced={reduced} />
    {renderSource?.({ fixtureId, state, revision, replay, descending, recipe })}
  </main></MotionConfig>;
}
