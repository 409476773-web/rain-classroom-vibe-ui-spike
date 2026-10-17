import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/charts/styles.css";
import "../samples/heatmap-pattern-levels/chart-examples.css";
import { BarChart, Bar, BarXAxis, BarDepthBack, BarDepthFront, BarDepthProvider, Grid, ReferenceArea, YAxis, ChartTooltip, TooltipContent, buildArcs } from "@rain-next/ui/charts";
import { BarVariant } from "../samples/bar-3d-stacked/chart-variants/bar";
import { TrendVariant } from "../samples/line-trio-brush/chart-variants/trend";
import { StructureVariant } from "../samples/heatmap-pattern-levels/chart-variants/structure";
import { VariantTable, immediate, type VariantSettings } from "../samples/heatmap-pattern-levels/chart-variants/shared";
import { makeHierarchy } from "../samples/heatmap-pattern-levels/chart-data";
import type { ChartRecipe } from "../samples/heatmap-pattern-levels/chart-catalog";

function CombinedBar({ revision, dense, zero }: { revision: number; dense: boolean; zero: boolean }) {
  const data = Array.from({ length: dense ? 60 : 6 }, (_, index) => ({ label: dense ? String(index + 1) : ["一班", "二班", "三班", "四班", "五班", "六班"][index]!, 完成: zero ? 0 : 32 + index * 7 % 54 + revision * 4, 进行中: zero ? 0 : 18 + index * 2 + revision * 2 }));
  const plot = <BarChart data={data} xDataKey="label" stacked={!dense} stackGap={0} barGap={dense ? .1 : .2} className="rain-chart-plot" aspectRatio="" margin={{ top: 40, left: 48, right: 20, bottom: 36 }} animationDuration={0} enterTransition={immediate}>
    <Grid horizontal />
    <ReferenceArea className="consumer-reference" y1={40} y2={70} ifOverflow="visible" pattern="diagonal" patternColor="var(--chart-3)" axisLabelColor="var(--chart-3)" showMarkers />
    {!dense && <BarDepthBack dataKey="完成" color="var(--chart-1)" />}
    <Bar dataKey="完成" fill="var(--chart-1)" animate={false} perspective={!dense} lineCap="butt" minBarHeight={0} />
    {!dense && <Bar dataKey="进行中" fill="var(--chart-2)" animate={false} perspective lineCap="butt" minBarHeight={0} />}
    {!dense && <BarDepthFront dataKey="完成" />}
    <YAxis numTicks={4} /><BarXAxis maxLabels={4} />
    <ChartTooltip className="rain-chart-tooltip" content={({ point }) => <TooltipContent title={String(point.label)} rows={[{ label: "完成", value: String(point.完成) + " 人", color: "var(--chart-1)" }, ...(!dense ? [{ label: "进行中", value: String(point.进行中) + " 人", color: "var(--chart-2)" }] : [])]} />} />
  </BarChart>;
  return <>{dense ? plot : <BarDepthProvider segmentsAccessor={point => [{ value: Number(point.完成), color: "var(--chart-1)" }, { value: Number(point.进行中), color: "var(--chart-2)" }]}>{plot}</BarDepthProvider>}<p>参考区间40—70人；完成与进行中互斥。</p><VariantTable data={data} /></>;
}

function App() {
  const [revision, setRevision] = useState(0);
  const [recipe, setRecipe] = useState<ChartRecipe>("category-wide");
  const [zero, setZero] = useState(false);
  const [active, setActive] = useState(true);
  const [settings, setSettings] = useState<VariantSettings>(() => ({ loading: false, focusId: buildArcs(makeHierarchy(0)).arcs.find(arc => arc.name === "基础课程")!.id }));
  const props = { recipe, revision, replay: 0, active, reduced: true };
  const restored = { ...props, settings, onSettingsChange: (patch: VariantSettings) => setSettings(previous => ({ ...previous, ...patch })) };
  const bars = location.pathname.includes("bars");
  return <MotionConfig reducedMotion="always"><main className="rain-chart" data-recipe={recipe}>
    <h1>{bars ? "独立消费：柱图与参考区间" : "独立消费：Brush、日历与层级"}</h1>
    <div className="controls"><button onClick={() => setRevision(value => value + 1)}>替换数据</button><select aria-label="组合配色" value={recipe} onChange={event => setRecipe(event.target.value as ChartRecipe)}><option value="category-wide">分类</option><option value="monochrome-blue">蓝灰</option></select><button aria-pressed={zero} onClick={() => setZero(value => !value)}>切换零值</button><button aria-pressed={!active} onClick={() => setActive(value => !value)}>切换暂停</button><output aria-label="组合版本">{revision}</output></div>
    {bars ? <div className="grid"><section data-combination="stack"><h2>3D堆叠 + 参考区间</h2><CombinedBar revision={revision} dense={false} zero={zero} /></section><section data-combination="dense"><h2>60点密集柱 + 参考区间</h2><CombinedBar revision={revision} dense zero={zero} /></section><section data-combination="downloaded-bar"><h2>已下载3D堆叠源码</h2><BarVariant {...props} variantId="bar-3d-stacked" /></section></div> : <div className="grid"><section data-combination="brush-a"><h2>Brush A</h2><TrendVariant {...props} variantId="line-trio-brush" /></section><section data-combination="brush-b"><h2>Brush B</h2><TrendVariant {...props} variantId="line-trio-brush" /></section><section data-combination="calendar-a"><h2>日历纹理 A</h2><StructureVariant {...props} variantId="heatmap-pattern-levels" /></section><section data-combination="calendar-b"><h2>日历纹理 B</h2><StructureVariant {...props} variantId="heatmap-pattern-levels" /></section><section data-combination="calendar-scroll"><h2>全年横滚日历</h2><StructureVariant {...props} variantId="heatmap-horizontal-scroll" /></section><section data-combination="hierarchy"><h2>层级分析 · 恢复基础课程</h2><StructureVariant {...restored} variantId="sunburst-legend" /></section><section data-combination="loading-restored"><h2>恢复loading:false</h2><StructureVariant {...restored} variantId="heatmap-loading" /></section></div>}
  </main></MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);
