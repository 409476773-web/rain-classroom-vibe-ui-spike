import { useEffect, useId, useRef, useState, type ComponentType } from "react";
import { Button, Link } from "@rain-next/ui";
import { CHART_VARIANTS, variantExamples, type ChartVariant } from "./chart-variants";
import type { ChartId, ChartRecipe } from "./chart-catalog";
import type { VariantExampleProps, VariantSettings } from "./chart-variants/shared";
import { ChartVariantSource } from "./chart-example-source";
import "./component-doc.css";
import "./chart-page.css";

export function ChartVariantCard({ variant, recipe, reduced, Example }: { variant: ChartVariant; recipe: ChartRecipe; reduced: boolean; Example: ComponentType<VariantExampleProps> }) {
  const root = useRef<HTMLElement>(null);
  const heading = `variant-${variant.id}-${useId().replaceAll(":", "")}`;
  const [near, setNear] = useState(() => typeof IntersectionObserver === "undefined");
  const [started, setStarted] = useState(() => typeof IntersectionObserver === "undefined");
  const [visible, setVisible] = useState(() => !document.hidden);
  const [revision, setRevision] = useState(0);
  const [replay, setReplay] = useState(0);
  const [curveName, setCurveName] = useState<string>();
  const [settings, setSettings] = useState<VariantSettings>({});
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(entries => {
      const value = entries.some(entry => entry.isIntersecting);
      setNear(value);
      if (value) setStarted(true);
    });
    const preload = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) setStarted(true);
    }, { rootMargin: "240px" });
    observer.observe(root.current!);
    preload.observe(root.current!);
    return () => { observer.disconnect(); preload.disconnect(); };
  }, []);
  useEffect(() => {
    const change = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);
  const active = visible && near;
  const effectiveRecipe: ChartRecipe = variant.paletteMode === "semantic" ? "sign" : variant.id === "heatmap-gradient-legend" ? "intensity" : variant.paletteMode === "example" ? "category-near" : recipe;
  return <section ref={root} className="rain-chart-variant component-doc__example" aria-labelledby={heading} data-chart-variant={variant.id} data-layout={variant.layout} data-active={active}
    onFocusCapture={() => setStarted(true)}>
    <header><h3 id={heading} tabIndex={-1}>{variant.title}</h3><p>{variant.description}</p></header>
    <div className="component-doc__preview rain-chart" data-recipe={effectiveRecipe} data-palette-mode={variant.paletteMode}>
      <div className="rain-chart-doc-controls">
        <Button variant="secondary" size="small" data-action="update" onClick={() => setRevision(value => value + 1)}>更新数据</Button>
        <Button variant="secondary" size="small" onClick={() => setReplay(value => value + 1)}>重播动效</Button>
      </div>
      {variant.paletteMode !== "page" && <p className="rain-chart-note">{variant.paletteMode === "semantic" ? "本卡使用固定涨跌或正负语义色。" : "本卡使用独立示例配色，保留材质或色阶差异。"}</p>}
      <div className="rain-chart-variant__plot" data-ready={started}>
        {started ? <Example variantId={variant.id} recipe={effectiveRecipe} revision={revision} replay={replay} reduced={reduced} active={active} curveName={curveName} onCurveChange={setCurveName} settings={settings} onSettingsChange={patch => setSettings(previous => ({ ...previous, ...patch }))} /> : <p className="rain-chart-note">滚动到此处查看示例</p>}
      </div>
      <p className="rain-chart-note" role="status">示例数据 · 已更新 {revision} 次{reduced ? " · 已减少动效" : ""}</p>
      <ChartVariantSource variant={variant} recipe={effectiveRecipe} revision={revision} replay={replay} reduced={reduced} curveName={curveName} settings={settings} />
    </div>
    <Link href={variant.sourceUrl} target="_blank" rel="noreferrer">对应官网示例</Link>
  </section>;
}

const groups = { structure: "基础结构", appearance: "图形材质", reading: "坐标与辅助读数", interaction: "交互与状态" } as const;
export function ChartVariantGallery({ id, recipe, reduced }: { id: ChartId; recipe: ChartRecipe; reduced: boolean }) {
  const variants = CHART_VARIANTS.filter(item => item.chartId === id);
  const Example = variantExamples[id as keyof typeof variantExamples];
  if (!variants.length || !Example) return null;
  function jump(group: string) {
    const target = document.getElementById(`chart-${id}-variants-${group}`);
    target?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    target?.focus({ preventScroll: true });
  }
  return <section className="rain-chart-variants" aria-label="全部图表变体">
    <div className="rain-chart-doc-controls" role="navigation" aria-label="变体分组">{Object.entries(groups).filter(([key]) => variants.some(item => item.group === key)).map(([key, label]) => <Button key={key} variant="text" size="small" onClick={() => jump(key)}>{label}</Button>)}</div>
    {Object.entries(groups).map(([key, label]) => {
      const items = variants.filter(item => item.group === key);
      return items.length ? <section key={key} className="rain-chart-variant-group" aria-labelledby={`chart-${id}-variants-${key}`}><h2 id={`chart-${id}-variants-${key}`} tabIndex={-1}>{label}</h2><div className="rain-chart-variant-grid">{items.map(variant => <ChartVariantCard key={variant.id} variant={variant} recipe={recipe} reduced={reduced} Example={Example} />)}</div></section> : null;
    })}
  </section>;
}
