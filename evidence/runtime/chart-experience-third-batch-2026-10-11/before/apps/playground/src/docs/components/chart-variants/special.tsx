import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  Background, Candlestick, CandlestickChart, ChartLegend, ChartLegendHoverProvider, ChartTooltip,
  Grid, LiveLine, LiveLineChart, LiveXAxis, LiveYAxis, PatternLines, ReferenceArea, TooltipContent, XAxis,
} from "@rain-next/ui/charts";
import { dateLabel, makeCandles, makeLivePoints } from "../chart-data";
import { immediate, seriesColors, useVariantSetting, VariantTable, type VariantExampleProps } from "./shared";

export const SPECIAL_VARIANT_IDS = [
  "live-line-interactive", "live-line-default", "live-line-now-offset", "live-line-momentum-colors", "live-line-line-only", "live-line-pattern-background", "live-line-dot-grid-background", "live-line-reference-band", "live-line-pattern-reference-band",
  "candlestick-tooltip-line-default", "candlestick-tooltip-line-gradient", "candlestick-chart-1-3", "candlestick-lime-emerald-yellow-red", "candlestick-solid-colors", "candlestick-pattern", "candlestick-tooltip-only", "candlestick-pattern-background", "candlestick-dot-grid-background", "candlestick-reference-band", "candlestick-pattern-reference-band",
] as const;

const positive = "var(--chart-positive)";
const negative = "var(--chart-negative)";
const neutral = "var(--chart-neutral)";
const timeLabel = (timeMs: number) => new Date(timeMs).toLocaleTimeString("zh-CN", { hour12: false, minute: "2-digit", second: "2-digit" });

function CandleGradient({ id, from, to }: { id: string; from: string; to: string }) {
  return <linearGradient id={id} x1="0" x2="0" y1="1" y2="0"><stop offset="0%" stopColor={from} /><stop offset="100%" stopColor={to} /></linearGradient>;
}

function CandlestickVariant({ variantId, revision, replay, reduced, active }: VariantExampleProps) {
  const data = useMemo(() => makeCandles(revision), [revision]);
  const unique = useId().replaceAll(":", "");
  const upId = `rain-special-candle-up-${unique}`;
  const downId = `rain-special-candle-down-${unique}`;
  const pattern = variantId === "candlestick-pattern";
  const gradient = ["candlestick-tooltip-line-gradient", "candlestick-lime-emerald-yellow-red"].includes(variantId);
  const defaultPalette = variantId === "candlestick-tooltip-line-default";
  const stronger = variantId === "candlestick-chart-1-3";
  const solid = variantId === "candlestick-solid-colors";
  const tooltipOnly = variantId === "candlestick-tooltip-only";
  const matching = variantId.startsWith("candlestick-tooltip-line-");
  const up = defaultPalette || stronger ? seriesColors[0]! : positive;
  const down = defaultPalette ? seriesColors[4]! : stronger ? seriesColors[2]! : negative;
  const [hovered, setHovered] = useState<number | null>(null);
  const still = reduced || !active;
  return <>
    <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
      <CandlestickChart data={data} className="rain-chart-special-plot" style={{ height: 280 }}
        margin={{ top: 24, right: 16, bottom: 38, left: 16 }} animationDuration={still ? 0 : undefined}
        enterTransition={still ? immediate : undefined} revealSignature={String(replay)} candleWidth={solid ? 8 : undefined} candleGap={pattern ? .15 : undefined}>
        {gradient && <CandleGradient id={upId} from="var(--rain-category-border-green-2)" to={positive} />}
        {gradient && <CandleGradient id={downId} from="var(--rain-category-border-orange-2)" to={negative} />}
        {pattern && <PatternLines id={upId} width={8} height={8} orientation={["diagonal"]} stroke="var(--chart-background)" strokeWidth={1.5} />}
        {pattern && <PatternLines id={downId} width={8} height={8} orientation={["diagonal"]} stroke="var(--chart-background)" strokeWidth={1.5} />}
        {variantId === "candlestick-pattern-background" ? <Background />
          : variantId === "candlestick-dot-grid-background" ? <Background pattern="dots" opacity={.85} />
          : variantId === "candlestick-reference-band" ? <ReferenceArea y1={108} y2={118} strokeStyle="dashed" showMarkers />
          : variantId === "candlestick-pattern-reference-band" ? <ReferenceArea y1={108} y2={118} pattern="diagonal" patternColor="var(--chart-foreground-muted)" axisLabelColor={seriesColors[0]} fillOpacity={.85} />
          : <Grid horizontal />}
        <Candlestick animate={!still} fadedOpacity={.25}
          positiveFill={gradient ? `url(#${upId})` : defaultPalette || stronger || solid ? up : undefined}
          negativeFill={gradient ? `url(#${downId})` : defaultPalette || stronger || solid ? down : undefined}
          bodyPatternPositive={pattern ? `url(#${upId})` : undefined} bodyPatternNegative={pattern ? `url(#${downId})` : undefined} insideStrokeWidth={pattern ? 1 : undefined} />
        <ChartTooltip className="rain-chart-tooltip" damping={still ? 0 : undefined} showCrosshair={!tooltipOnly} showDots={!matching && !tooltipOnly}
          indicatorColor={matching ? point => Number(point.close) >= Number(point.open) ? up : down : undefined}
          content={({ point }) => <TooltipContent title={dateLabel(point.date as Date)} rows={[
            { label: "开", value: String(point.open), color: neutral }, { label: "高", value: String(point.high), color: neutral },
            { label: "低", value: String(point.low), color: neutral }, { label: "收", value: String(point.close), color: Number(point.close) >= Number(point.open) ? up : down },
          ]} />} />
        <XAxis numTicks={4} />
      </CandlestickChart>
      <ChartLegend className="rain-chart-legend" items={[{ label: "上涨 / 平盘", value: 0, color: up }, { label: "下跌", value: 0, color: down }]}
        showValue={false} hoveredIndex={hovered} onHover={setHovered}
        renderItem={({ item, index, isFaded }) => <button type="button" className="rain-chart-legend-button"
          onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => setHovered(index)} style={{ opacity: isFaded ? .4 : 1 }}>
          <span aria-hidden="true" style={{ background: item.color }} />{item.label}</button>} />
    </ChartLegendHoverProvider>
    <p className="rain-chart-note">开、高、低、收为模拟指数；涨跌方向不代表业务好坏。</p>
    <VariantTable data={data.map(point => ({ "日期": dateLabel(point.date), "开": point.open, "高": point.high, "低": point.low, "收": point.close, "方向": point.close > point.open ? "上涨" : point.close < point.open ? "下跌" : "平盘" }))} />
  </>;
}

function nextLivePoints(previous: { time: number; value: number }[], timeMs: number) {
  const time = timeMs / 1000;
  if (time <= (previous.at(-1)?.time ?? 0)) return previous;
  return [...previous.slice(-119), { time, value: makeLivePoints(time, 0, "single")[0]!.value }];
}

function LiveVariant(props: VariantExampleProps) {
  const { variantId, recipe, revision, replay, reduced, active } = props;
  const [points, setPoints] = useState(() => props.settings?.points ?? makeLivePoints());
  const [pausedByUser, setPausedByUser] = useVariantSetting("paused", false, props);
  const [manualNow, setManualNow] = useState<number | undefined>(() => props.settings?.frozenNow);
  const running = active && !reduced && !pausedByUser;
  const append = useCallback((timeMs = Date.now()) => {
    setPoints(previous => nextLivePoints(previous, timeMs));
  }, []);
  useEffect(() => {
    if (!running) return;
    setManualNow(undefined);
    const timer = window.setInterval(append, 600);
    return () => window.clearInterval(timer);
  }, [running, append]);
  const togglePause = () => {
    if (pausedByUser) {
      setManualNow(undefined);
      props.onSettingsChange?.({ points: undefined, frozenNow: undefined });
    } else {
      const now = manualNow ?? Date.now();
      setManualNow(now);
      props.onSettingsChange?.({ points, frozenNow: now });
    }
    setPausedByUser(!pausedByUser);
  };
  const manualAppend = () => {
    const now = Date.now();
    const next = nextLivePoints(points, now);
    setPoints(next);
    setManualNow(now);
    props.onSettingsChange?.({ points: next, frozenNow: now });
  };
  const data = useMemo(() => points.map(point => ({ ...point, value: point.value + [0, 9, 4][revision % 3]! })), [points, revision]);
  const latest = data.at(-1)!.value;
  const offset = variantId === "live-line-now-offset";
  const momentum = variantId === "live-line-momentum-colors";
  const windowSeconds = offset ? 20 : momentum ? 25 : variantId === "live-line-line-only" ? 28 : 30;
  const stroke = offset ? seriesColors[2]! : seriesColors[0]!;
  const directionColors = recipe === "monochrome-blue"
    ? { up: seriesColors[0]!, down: seriesColors[1]!, flat: seriesColors[3]! }
    : { up: positive, down: negative, flat: neutral };
  return <>
    <div className="rain-chart-live-controls">
      <button type="button" className="rain-chart-variant-button" onClick={togglePause} disabled={reduced}>{pausedByUser ? "恢复实时" : "暂停实时"}</button>
      <button type="button" className="rain-chart-variant-button" onClick={manualAppend} disabled={running}>追加一次</button>
      <span className="rain-chart-note" role="status" data-live-paused={!running} data-live-count={data.length}>{reduced ? "减少动效 · 手动更新" : pausedByUser ? "已暂停" : active ? "每 0.6 秒更新" : "离屏暂停"} · {data.length}/120 条</span>
    </div>
    <LiveLineChart data={data} value={latest} className="rain-chart-special-plot" style={{ height: 260 }}
      window={windowSeconds} numXTicks={4} nowOffsetUnits={offset ? 1 : 0} exaggerate={offset} paused={!running} running={running} frozenNow={manualNow}
      margin={{ top: 24, right: 68, bottom: 38, left: 58 }}>
      {variantId === "live-line-pattern-background" ? <Background />
        : variantId === "live-line-dot-grid-background" ? <Background pattern="dots" opacity={.85} />
        : variantId === "live-line-reference-band" ? <ReferenceArea y1={80} y2={105} strokeStyle="dashed" showMarkers />
        : variantId === "live-line-pattern-reference-band" ? <ReferenceArea y1={80} y2={105} pattern="diagonal" patternColor="var(--chart-foreground-muted)" axisLabelColor={seriesColors[0]} fillOpacity={.85} />
        : <Grid horizontal />}
      <LiveLine key={replay} dataKey="value" stroke={stroke} fill={variantId !== "live-line-line-only"} pulse={running} dotSize={offset ? 4 : momentum ? 5 : undefined}
        momentumColors={momentum ? directionColors : undefined} formatValue={value => `${Math.round(value)} 人`} />
      <LiveXAxis numTicks={4} formatTime={timeLabel} /><LiveYAxis position="left" allowDecimals={false} formatValue={value => String(Math.round(value))} />
      <ChartTooltip className="rain-chart-tooltip" showDatePill={false} damping={running ? undefined : 0}
        content={({ point }) => <TooltipContent title={timeLabel((point.date as Date).getTime())} rows={[{ label: "实时人数 · 插值读数", value: `${Number(point.value).toFixed(1)} 人`, color: stroke }]} />} />
    </LiveLineChart>
    <p className="rain-chart-note">最新人数 {latest} 人 · 最近 {windowSeconds} 秒 · 模拟数据，时间戳为 Unix 秒。</p>
    <VariantTable data={data.map(point => ({ "Unix 秒": point.time, "时分秒": timeLabel(point.time * 1000), "实时人数 · 人": point.value }))} />
  </>;
}

export function SpecialVariant(props: VariantExampleProps) {
  return props.variantId.startsWith("live-line-") ? <LiveVariant {...props} /> : <CandlestickVariant {...props} />;
}
