import { useEffect, useState } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Button } from "@rain-next/ui";
import { CartesianSamples } from "./cartesian";
import { CombinationSample } from "./combination";
import { ExtendedSamples } from "./extended";
import { type Appearance } from "./shared";

export function ChartValidationPage() {
  const [gradient, setGradient] = useState(true);
  const [palette, setPalette] = useState<Appearance["palette"]>("near");
  const [revision, setRevision] = useState(0);
  const [motion, setMotion] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => { const query = matchMedia("(prefers-reduced-motion: reduce)"); const change = () => setMotion(!query.matches); query.addEventListener("change", change); return () => query.removeEventListener("change", change); }, []);
  const appearance = { gradient, palette, revision, motion };
  return <DensityProvider density="default"><main className="chart-lab" data-rain-id="local-chart-validation" data-asset-identity="local-experiment" data-rain-theme="light" data-material={gradient ? "gradient" : "solid"}>
    <div className="chart-lab-inner">
      <header className="chart-lab-heading">
        <div><p className="chart-eyebrow">RAIN / CHART STUDIES</p><h1>Rain 图表实验室</h1><p className="chart-intro">轻盈的图形，清楚的数据。探索细线、渐变、圆角与组合之间的共同语言。</p></div>
        <div className="chart-lab-status"><span className="status-dot" />运行验证 · 第 01 版</div>
      </header>
      <section className="chart-lab-toolbar" aria-label="图表样式与数据设置">
        <div className="toolbar-group"><span>材质</span><Button variant={gradient ? "secondary" : "text"} size="small" aria-pressed={gradient} onClick={() => setGradient(true)}>渐变</Button><Button variant={!gradient ? "secondary" : "text"} size="small" aria-pressed={!gradient} onClick={() => setGradient(false)}>实色</Button></div>
        <div className="toolbar-group"><span>配色</span><Button variant={palette === "near" ? "secondary" : "text"} size="small" aria-pressed={palette === "near"} onClick={() => setPalette("near")}>蓝紫近邻</Button><Button variant={palette === "wide" ? "secondary" : "text"} size="small" aria-pressed={palette === "wide"} onClick={() => setPalette("wide")}>多类别色</Button></div>
        <Button variant="secondary" size="small" onClick={() => setRevision(value => value + 1)}>更新样本数据</Button>
      </section>
      <div className="chart-section-heading"><h2>趋势与比较</h2><p>同一组视觉规则，在不同尺度与图形中展开</p></div>
      <div className="chart-grid"><CartesianSamples appearance={appearance} /><CombinationSample appearance={appearance} /></div>
      <div className="chart-section-heading"><h2>密度与关系</h2><p>让强度、流向与连接各自拥有清楚的表达</p></div>
      <div className="chart-grid"><ExtendedSamples appearance={appearance} /></div>
      <footer className="chart-lab-footer"><p>示例数据 · 本地实验</p><p>Plots / G2 绘图，Bklit 表现参考，Rain 配色与字体。当前页面用于方案验证。</p></footer>
    </div>
  </main></DensityProvider>;
}
