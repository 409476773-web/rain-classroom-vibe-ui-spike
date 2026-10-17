import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { Button, Link } from "@rain-next/ui";
import { rainChartRecipes } from "@rain-next/ui/charts";
import { ChartExample } from "./chart-examples";
import { CHART_ENTRIES, type ChartId, type ChartRecipe } from "./chart-catalog";
import type { ChartState } from "./chart-data";
import { ChartExampleSource, chartExampleCode } from "./chart-example-source";
import { DocExample, DocReference } from "./component-doc";
import "./chart-page.css";
import { useChartReducedMotion } from "./chart-variants/shared";
import { ChartVariantGallery } from "./chart-variant-gallery";
import type { MiniSize } from "./chart-business/mini-layout";

export function ChartPage({ id, navigationCount = 0 }: { id: ChartId; navigationCount?: number }) {
  const entry = CHART_ENTRIES.find(item => item.id === id)!;
  const [recipe, setRecipe] = useState<ChartRecipe>(entry.defaultRecipe);
  const [state, setState] = useState<ChartState>("normal");
  const [size, setSize] = useState<"standard" | "mini">("standard");
  const [miniSize, setMiniSize] = useState<MiniSize>("compact");
  const [seriesCount, setSeriesCount] = useState<3 | 5>(3);
  const [revision, setRevision] = useState(0);
  const [replay, setReplay] = useState(0);
  const [matrixSize,setMatrixSize] = useState<4|6|12>(6);
  const [descending,setDescending] = useState(false);
  const reduced = useChartReducedMotion();
  useEffect(() => { if (navigationCount > 0) document.getElementById(`chart-${id}-title`)?.focus(); }, [id, navigationCount]);
  const hasSeries = ["area", "line", "bar", "pie", "ring", "radar", "scatter"].includes(id);
  return <MotionConfig reducedMotion={reduced ? "always" : "never"}>
    <main className="component-doc core-ui-shell rain-chart-doc" data-rain-id={`doc-chart-${id}`} data-asset-identity="registry-candidate">
      <header className="component-doc__header">
        <Link href="#components">返回组件目录</Link>
        <div className="component-doc__title"><h1 id={`chart-${id}-title`} tabIndex={-1}>{entry.label}</h1><span>G4 · 共享候选 · 未发布 · 视觉待复核</span></div>
        <p>{entry.summary}</p>
      </header>
      <DocExample title={id === "matrix" ? "分类矩阵组件与业务实例" : id === "network" ? "网络组件与业务实例" : "图型与可选配方"} description={id === "matrix" ? "热度、开课学期、相似度、数量气泡与支撑等级，共用矩阵组件、图例与精确读数。示例均为 Mock 数据。" : id === "network" ? "元素、知识点及课程关系，共用节点分类、关系图例、详情与可操作列表。示例均为 Mock 数据。" : "Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。"}>
        <div className="rain-chart" data-rain-id={`chart-${id}`} data-recipe={recipe} data-size={size} data-state={state}>
          <ChartExample id={id} recipe={recipe} state={state} size={size} miniSize={miniSize} seriesCount={seriesCount} revision={revision} replay={replay} reduced={reduced} matrixSize={matrixSize} onMatrixSizeChange={setMatrixSize} descending={descending} />
        </div>
        <div className="rain-chart-doc-controls" data-chart-default-controls="">
          <label>视觉配方 <select aria-label="视觉配方" value={recipe} onChange={event => setRecipe(event.target.value as ChartRecipe)}>{entry.recipes.map(value => <option key={value} value={value}>{rainChartRecipes[value].label}</option>)}</select></label>
          <label>示例状态 <select aria-label="示例状态" value={state} onChange={event => setState(event.target.value as ChartState)}>{Object.entries({ normal:"正常", empty:"无数据", zero:"零值", single:"单项／单点", long:"长标签", missing:"缺测", invalid:"无效数据" }).filter(([value]) => id !== "network" || !["zero", "missing"].includes(value)).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          {hasSeries && <label>系列数 <select aria-label="系列数" value={seriesCount} onChange={event => setSeriesCount(Number(event.target.value) as 3 | 5)}><option value={3}>3</option><option value={5}>5</option></select></label>}
          {["area", "line", "bar", "pie", "ring"].includes(id) && <label>尺寸配方 <select aria-label="尺寸配方" value={size} onChange={event => setSize(event.target.value as typeof size)}><option value="standard">标准</option><option value="mini">迷你 / 嵌入</option></select></label>}
          {size === "mini" && <label>迷你型号 <select aria-label="迷你型号" value={miniSize} onChange={event => setMiniSize(event.target.value as MiniSize)}><option value="compact">紧凑</option><option value="comfortable">舒展</option></select></label>}
          <Button variant="text" size="small" onClick={() => setRevision(value => value + 1)}>更新数据</Button>
          {id !== "network" && <Button variant="text" size="small" onClick={() => setReplay(value => value + 1)}>重播动效</Button>}
          {id === "matrix" && <Button variant="text" size="small" aria-pressed={descending} onClick={() => setDescending(value => !value)}>反转行列顺序</Button>}
        </div>
        <p className="rain-chart-note" role="status">示例数据 · 已更新 {revision} 次{reduced ? " · 已按系统设置减少动效" : ""}</p>
      </DocExample>
      <ChartExampleSource id={id} recipe={recipe} state={state} size={size} miniSize={miniSize} seriesCount={seriesCount} revision={revision} matrixSize={matrixSize} descending={descending} />
      <ChartVariantGallery id={id} recipe={recipe} reduced={reduced} />
      <section className="component-doc__usage"><h2>数据与使用边界</h2>{id === "choropleth" && <p><Link href="#chart-china">查看全国与省市下钻</Link>：真实省市边界、选择详情、返回与数据异常示例。</p>}<p>{entry.dataContract}</p><p>{entry.limitation}</p><p>{id === "matrix" ? "五组分类矩阵统一展示于本页，指向或方向键查看精确读数，图例聚焦辅助比较。" : id === "network" ? "四组网络样本共用稳定ID；悬停或聚焦读取邻接，点击或Enter选择节点，也可从节点列表操作。" : <>悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；<Link href="#chart-business">查看条形和迷你图表在表格、卡片、列表中的组合</Link>。</>}</p></section>
      <details className="rain-chart-source rain-chart-reference"><summary>接口与调用示例</summary>
      <DocReference id={`chart-${id}`} title={entry.label} source={entry.sourcePath} code={chartExampleCode(id, recipe, state, size, matrixSize, miniSize, seriesCount, revision, descending)}
        props={id === "network" ? [
          {name:"nodes / edges",type:"稳定节点与关系身份",description:entry.dataContract},
          {name:"categories / relations",type:"类别、颜色与线型",description:"节点类别和关系类别分别表达，关系方向由箭头表示。"},
          {name:"caption / reducedMotion / onNodeSelect",type:"读数、过渡与选择反馈",description:"节点列表提供等价操作；筛选隐藏选中节点时清除选择。"},
        ] : id === "matrix" ? [
          {name:"rows / columns / cells",type:"分类轴与明确单元格状态",description:entry.dataContract},
          {name:"encoding",type:"heat / bubble / level",description:"明确递增连续域、非负数量最大值或离散等级映射；图例与精确读数同源。"},
          {name:"caption / valueFormat / reducedMotion",type:"文本与过渡",description:"行列标题和精确文字始终可读；滚动限于矩阵自身，连续编码短过渡、离散等级即时变化。"},
        ] : [
          { name: "data / value", type: "原生图型合同", description: entry.dataContract },
          { name: "children", type: "Compound Parts", description: "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" },
          { name: "className / style / margin", type: "原生尺寸接口", description: "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" },
          { name: "enterTransition / animationDuration", type: "原生动效配置", description: "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" },
        ]} slots={id === "network" ? ["chart-root", "node-list", "details", "table", "legend"] : id === "matrix" ? ["table", "legend", "scroll-container"] : ["chart-root", "legend", "tooltip", "精确数据（宿主提供）"]} />
      </details>
      <nav className="rain-chart-doc-related" aria-label="相关图型">{CHART_ENTRIES.map(item => <Link key={item.id} href={`#chart-${item.id}`} aria-current={id === item.id ? "page" : undefined}>{item.label}</Link>)}</nav>
    </main>
  </MotionConfig>;
}
