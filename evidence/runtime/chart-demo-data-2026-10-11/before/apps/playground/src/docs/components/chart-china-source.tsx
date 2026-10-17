import { useState } from "react";
import { DocCode } from "./component-doc";
import type { ChinaChartSettings } from "./chart-business/china-region-examples";
import chinaExamples from "./chart-business/china-region-examples.tsx?raw";
import chinaMap from "./chart-business/china-region-map.tsx?raw";
import chinaData from "./chart-business/china-region-data.ts?raw";
import chinaStyles from "./chart-business/china-region-page.css?raw";
const chinaDataFiles = import.meta.glob("./chart-business/data/china/*", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export function chartChinaFiles(settings: ChinaChartSettings): Record<string, string> {
  return {
    "main.tsx": `import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import { Button } from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "@rain-next/ui/charts/styles.css";
import { ChinaRegionExamples, type ChinaChartSettings } from "./chart-business/china-region-examples";
import { useChinaReducedMotion } from "./chart-business/china-region-map";
function App() {
  const [settings, setSettings] = useState<ChinaChartSettings>(${JSON.stringify(settings)});
  const reduced = useChinaReducedMotion();
  return <MotionConfig reducedMotion="user"><main className="rain-chart-china" style={{ margin:"auto", padding:24 }}>
    <h1>全国与省市下钻</h1>
    <ChinaRegionExamples {...settings} reduced={reduced} onNavigate={navigation => setSettings(previous => ({ ...previous, ...navigation }))} />
    <Button size="small" variant="secondary" onClick={() => setSettings(previous => ({ ...previous, revision:previous.revision+1 }))}>更新数据</Button>
  </main></MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);`,
    "index.html": '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rain 全国与省市下钻</title></head><body style="margin:0"><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
    "chart-business/china-region-examples.tsx": chinaExamples,
    "chart-business/china-region-data.ts": chinaData,
    "chart-business/china-region-map.tsx": chinaMap,
    "chart-business/china-region-page.css": chinaStyles,
    ...Object.fromEntries(Object.entries(chinaDataFiles).map(([path, source]) => [path.slice(2), source])),
  };
}

export function ChartChinaSource({ settings }: { settings: ChinaChartSettings }) {
  const [selected, setSelected] = useState("main.tsx");
  const files = chartChinaFiles(settings);
  return <>
    <p>下载保留当前地区、选择、状态、更新次数和配色。完整12份文件含399项真实边界、来源许可及校验清单；保持目录结构，在已有Rain React/Vite工作区使用。统计及详情为示例数据。</p>
    <div className="rain-chart-source__files">{Object.entries(files).map(([name, source]) => <a key={name} download={name} href={`data:text/plain;charset=utf-8,${encodeURIComponent(source)}`}>下载 {name}</a>)}</div>
    <label>查看文件<select aria-label="中国地图源码文件" value={selected} onChange={event => setSelected(event.target.value)}>{Object.keys(files).map(name => <option key={name}>{name}</option>)}</select></label>
    <DocCode code={files[selected]!} />
  </>;
}
