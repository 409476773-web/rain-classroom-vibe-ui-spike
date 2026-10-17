import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Button, Link } from "@rain-next/ui";
import { ChinaRegionExamples, type ChinaChartSettings } from "./china-region-examples";
import { useChinaReducedMotion } from "./china-region-map";
import { getChinaLayerRegions, type ChinaDataState } from "./china-region-data";
import "../component-doc.css";
import "../chart-page.css";
import "@rain-next/ui/charts/styles.css";
import "./china-region-page.css";
export type { ChinaChartSettings } from "./china-region-examples";

export function ChinaRegionPage({ navigationCount = 0, renderSource }: { navigationCount?: number; renderSource?: (settings: ChinaChartSettings) => ReactNode }) {
  const [settings, setSettings] = useState<ChinaChartSettings>({ provinceId: null, selectedId: null, state: "normal", revision: 0, recipe: "monochrome-blue" });
  const reduced = useChinaReducedMotion();
  useEffect(() => { if (navigationCount) document.getElementById("chart-china-title")?.focus(); }, [navigationCount]);
  return <MotionConfig reducedMotion={reduced ? "always" : "never"}><main className="component-doc rain-chart-china" data-rain-id="doc-chart-china" data-asset-identity="registry-candidate">
    <header className="component-doc__header"><Link href="#components">返回组件目录</Link><div className="component-doc__title"><h1 id="chart-china-title" tabIndex={-1}>全国与省市下钻</h1><span>业务配方 · 未发布 · 待视觉审阅</span></div><p>从全国查看各省参与强度，再进入省内真实城市与省直管县级区域。边界有可追溯来源，统计与地区详情使用示例数据。</p></header>
    <ChinaRegionExamples {...settings} reduced={reduced} onNavigate={navigation => setSettings(previous => ({ ...previous, ...navigation }))} />
    <details className="rain-china-demo"><summary>体验不同数据状态与配色</summary>
    <div className="rain-china-controls">
      <label>查看范围<select aria-label="地图查看范围" value={settings.provinceId ?? "national"} onChange={event => setSettings(previous => ({ ...previous, provinceId: event.target.value === "national" ? null : event.target.value, selectedId: null }))}><option value="national">全国</option>{getChinaLayerRegions(null).filter(region => region.hasChildren).map(region => <option key={region.id} value={region.id}>{region.name}</option>)}</select></label>
      <label>数据状态<select aria-label="地图数据状态" value={settings.state} onChange={event => setSettings(previous => ({ ...previous, state: event.target.value as ChinaDataState }))}>{Object.entries({ normal: "正常", zero: "全部为零", missing: "全部缺测", invalid: "无效数值", unmatched: "未匹配统计ID", "load-error": "模拟加载失败" }).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label>配色<select aria-label="地图图表配色" value={settings.recipe} onChange={event => setSettings(previous => ({ ...previous, recipe: event.target.value as ChinaChartSettings["recipe"] }))}><option value="monochrome-blue">蓝灰单色</option><option value="intensity">紫蓝强度</option></select></label>
      <Button variant="secondary" size="small" onClick={() => setSettings(previous => ({ ...previous, revision: previous.revision + 1 }))}>更新数据</Button>
    </div>
    <p className="rain-china-status" role="status">示例数据 · 更新 {settings.revision} 次{reduced ? " · 已按系统设置减少动效" : ""}</p>
    </details>
    {renderSource?.(settings)}
  </main></MotionConfig>;
}
