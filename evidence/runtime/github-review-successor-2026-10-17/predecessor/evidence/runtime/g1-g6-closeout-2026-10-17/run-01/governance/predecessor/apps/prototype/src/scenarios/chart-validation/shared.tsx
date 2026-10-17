import { useCallback, useEffect, useRef, useState } from "react";
import { Chart, type G2Spec } from "@antv/g2";
import { Button } from "@rain-next/ui";

export type Appearance = { gradient: boolean; palette: "near" | "wide"; revision: number; motion: boolean };

// Page-local candidate values from CH-114 and CH-003; not public Foundations.
export const palettes = {
  near: ["#5074FF", "#509CFF", "#30B3FF", "#DC7BFF", "#B547FF", "#895AFF"],
  wide: ["#236EFF", "#675FFF", "#01ADC3", "#FF6CC4", "#FF6960", "#F57E58"],
};
export const paletteColors = (appearance: Appearance) => palettes[appearance.palette];

export function chartTheme() {
  const css = getComputedStyle(document.documentElement);
  return {
    type: "light" as const, fontFamily: css.getPropertyValue("--rain-font-ui").trim(),
    defaultColor: palettes.near[0],
    view: { viewFill: "transparent" },
    axis: { labelFill: css.getPropertyValue("--rain-category-text-neutral-4").trim(), labelFontSize: 12, titleFill: css.getPropertyValue("--rain-category-text-neutral-3").trim(), gridStroke: css.getPropertyValue("--rain-category-border-neutral-3").trim(), gridLineDash: [3, 4], line: false, tick: false },
    legendCategory: { labelFill: css.getPropertyValue("--rain-category-text-neutral-3").trim(), labelFontSize: 12 },
  };
}

export function usePlotReady() {
  const host = useRef<HTMLDivElement>(null);
  const onReady = useCallback((chart: unknown) => {
    const candidate = chart as { chart?: { on: (event: string, handler: () => void) => void }; on: (event: string, handler: () => void) => void };
    // Plots' wrapper drops lifecycle events without an event payload.
    const instance = candidate.chart ?? candidate;
    // Lifecycle diagnostics must not trigger another React → Plots update.
    instance.on("beforerender", () => { if (host.current) host.current.dataset.chartReady = "false"; });
    instance.on("afterrender", () => {
      if (!host.current) return;
      host.current.dataset.chartReady = "true";
      host.current.dataset.renderCount = String(Number(host.current.dataset.renderCount ?? 0) + 1);
    });
  }, []);
  return { host, onReady };
}

let instanceSerial = 0;

export function G2Plot({ id, label, options, height = 280 }: { id: string; label: string; options: G2Spec; height?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const chart = useRef<Chart | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const element = host.current!;
    const instance = new Chart({ container: element, autoFit: true, height });
    chart.current = instance;
    element.dataset.chartInstance = String(++instanceSerial);
    return () => { chart.current = null; instance.destroy(); };
  }, [height]);
  useEffect(() => {
    let live = true;
    const instance = chart.current;
    if (!instance) return;
    setReady(false); setError("");
    instance.options(options);
    void instance.render().then(() => {
      if (live) { setReady(true); if (host.current) host.current.dataset.renderCount = String(Number(host.current.dataset.renderCount ?? 0) + 1); }
    }).catch((reason: unknown) => { if (live) setError(reason instanceof Error ? reason.message : String(reason)); });
    return () => { live = false; };
  }, [options, height]);
  return <div className="chart-body" data-rain-id={`chart-validation-${id}`} data-chart-ready={ready ? "true" : "false"} data-chart-error={error || undefined}>
    <div ref={host} className="g2-chart" role="img" aria-label={label} style={{ height }} />
    {error && <p role="alert" className="chart-error">图表暂未渲染：{error}</p>}
  </div>;
}

export function DataDisclosure({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  const [open, setOpen] = useState(false);
  return <div className="chart-data">
    <Button variant="text" size="small" aria-expanded={open} onClick={() => setOpen(!open)}>查看精确数据</Button>
    {open && <div className="chart-table-scroll" tabIndex={0} aria-label="图表精确数据"><table><thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((value, column) => <td key={column}>{value}</td>)}</tr>)}</tbody></table></div>}
  </div>;
}
