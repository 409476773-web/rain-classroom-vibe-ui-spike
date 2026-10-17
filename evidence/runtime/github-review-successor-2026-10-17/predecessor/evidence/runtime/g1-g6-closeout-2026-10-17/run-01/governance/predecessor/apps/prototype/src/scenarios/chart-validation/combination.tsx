import { useCallback, useMemo, useRef, useState } from "react";
import { DualAxes, type Chart, type DualAxesConfig } from "@ant-design/plots";
import { type Appearance, chartTheme, DataDisclosure, paletteColors, usePlotReady } from "./shared";

const weeks = Array.from({ length: 12 }, (_, index) => `第${String(index + 1).padStart(2, "0")}周`);
const participants = [180, 198, 210, 224, 218, 242, 236, 262, 254, 280, 274, 298];
const completionPercent = [58, 63, 67, 72, 68, 74, 70, 81, 78, 85, 83, 89];
const series = ["参与人数", "完成人数", "完成率"] as const;
type SeriesName = (typeof series)[number];
type WeekRow = { week: string; participants: number; completed: number; rate: number };

function withOpacity(hex: string, opacity: number) {
  const value = hex.replace("#", "");
  return `rgba(${parseInt(value.slice(0, 2), 16)}, ${parseInt(value.slice(2, 4), 16)}, ${parseInt(value.slice(4, 6), 16)}, ${opacity})`;
}

// Local experiment: I02 keeps a common people scale, a separate rate scale,
// and exact keyboard-accessible readings alongside the chart.
export function CombinationSample({ appearance }: { appearance: Appearance }) {
  const plotRef = useRef<Chart | null>(null);
  const rangeRef = useRef<[number, number]>([0, 11]);
  const [range, setRange] = useState<[number, number]>([0, 11]);
  const [selectedWeek, setSelectedWeek] = useState(11);
  const [visible, setVisible] = useState<Record<SeriesName, boolean>>({ 参与人数: true, 完成人数: true, 完成率: true });
  const { host, onReady } = usePlotReady();
  const colors = paletteColors(appearance);
  const areaColor = appearance.palette === "near" ? "#6055FF" : colors[1]!;
  const areaEnd = appearance.palette === "near" ? "#6CA7FF" : colors[2]!;
  const columnColor = appearance.palette === "near" ? "#8A7CFC" : colors[0]!;
  const columnEnd = appearance.palette === "near" ? "#86B0FF" : colors[2]!;
  const rateColor = colors[0]!;

  const data = useMemo<WeekRow[]>(() => participants.map((value, index) => {
    const revision = appearance.revision % 7;
    const count = value + revision * (index % 3 - 1) * 2;
    const completed = Math.round(count * (completionPercent[index]! + revision * (index % 2 ? 0.5 : -0.5)) / 100);
    return { week: weeks[index]!, participants: count, completed, rate: Number((completed / count * 100).toFixed(1)) };
  }), [appearance.revision]);

  const updateRange = useCallback((start: number, end: number) => {
    rangeRef.current = [start, end];
    setRange(current => current[0] === start && current[1] === end ? current : [start, end]);
    setSelectedWeek(current => Math.min(end, Math.max(start, current)));
  }, []);

  const handleReady = useCallback<NonNullable<DualAxesConfig["onReady"]>>(plot => {
    plotRef.current = plot;
    // G2 lifecycle events have no payload; Plots' wildcard proxy drops them.
    onReady(plot.chart);
    plot.chart.on("sliderX:filter", (event: { data?: { selection?: unknown[][] } }) => {
      const selected = event.data?.selection?.[0];
      if (!selected?.length) return;
      const start = weeks.indexOf(String(selected[0]));
      const end = weeks.indexOf(String(selected[selected.length - 1]));
      if (start >= 0 && end >= start) updateRange(start, end);
    });
  }, [onReady, updateRange]);

  const showRange = (start: number, end: number) => {
    updateRange(start, end);
    plotRef.current?.chart.emit("sliderX:filter", { data: { selection: [[weeks[start], weeks[end]], [0, 320]] } });
  };

  const options = useMemo<DualAxesConfig>(() => {
    const peopleScale = { key: "combination-people", independent: false, domain: [0, 320], nice: false, tickCount: 5 };
    const peopleAxis = { title: "人数（人）", position: "left", grid: true, labelFormatter: (value: number) => `${value}` };
    return {
      data,
      xField: "week",
      height: 300,
      autoFit: true,
      marginTop: 14,
      marginLeft: 6,
      marginRight: 8,
      legend: false,
      theme: chartTheme(),
      animate: appearance.motion ? { enter: { duration: 420 }, update: { duration: 320 } } : false,
      scale: { x: { type: "band", domain: weeks, padding: 0.38 } },
      axis: { x: { title: false, tick: false, labelAutoHide: true, labelAutoRotate: false, labelSpacing: 12 } },
      slider: { x: {
        size: 22, values: rangeRef.current.map(index => index / 11),
        sparklineColor: areaColor, sparklineAreaOpacity: 0.08,
        labelFormatter: (value: string) => value,
      } },
      interaction: {
        sliderFilter: { adaptiveMode: false },
        tooltip: { shared: true, crosshairs: true, marker: false, position: "top", offset: [0, -8] },
      },
      // Explicit scale keys override DualAxes' independent-per-child default.
      // The draw order is area → columns → line.
      children: [
        {
          type: "area", yField: "participants", shapeField: "smooth",
          scale: { y: peopleScale }, axis: { y: peopleAxis },
          style: {
            // AntV G's 90deg runs downwards (unlike CSS's angle convention).
            fill: appearance.gradient
              ? `linear-gradient(90deg, ${withOpacity(areaColor, 0.3)} 0%, ${withOpacity(areaEnd, 0)} 100%)`
              : withOpacity(areaColor, 0.18),
            opacity: visible.参与人数 ? 1 : 0,
          },
          tooltip: visible.参与人数 ? { title: "week", items: [{ field: "participants", name: "参与人数", valueFormatter: (value: number) => `${value} 人`, color: areaColor }] } : false,
        },
        {
          // G2 5.4.8 can retain incorrect column X transforms when a filtered
          // slider is followed by animated data/style updates. Keep this mark
          // static; area/line motion and native slider interaction remain on.
          type: "interval", yField: "completed", animate: false,
          scale: { y: peopleScale }, axis: { y: peopleAxis },
          style: {
            fill: appearance.gradient ? `linear-gradient(90deg, ${columnColor} 0%, ${columnEnd} 100%)` : columnColor,
            radiusTopLeft: 5, radiusTopRight: 5, maxWidth: 25,
            opacity: visible.完成人数 ? 1 : 0,
          },
          tooltip: visible.完成人数 ? { title: "week", items: [{ field: "completed", name: "完成人数", valueFormatter: (value: number) => `${value} 人`, color: columnColor }] } : false,
        },
        {
          type: "line", yField: "rate", shapeField: "smooth",
          scale: { y: { key: "combination-rate", independent: true, domain: [0, 100], nice: false, tickCount: 5 } },
          axis: { y: { title: "完成率（%）", position: "right", grid: false, labelFormatter: (value: number) => `${value}%` } },
          style: { stroke: rateColor, lineWidth: 2.5, opacity: visible.完成率 ? 1 : 0 },
          tooltip: visible.完成率 ? { title: "week", items: [{ field: "rate", name: "完成率", valueFormatter: (value: number) => `${value.toFixed(1)}%`, color: rateColor }] } : false,
        },
      ],
    };
  }, [data, appearance.gradient, appearance.motion, areaColor, areaEnd, columnColor, columnEnd, rateColor, visible]);

  const displayedData = data.slice(range[0], range[1] + 1);
  const reading = data[selectedWeek]!;
  const legendColors = [areaColor, columnColor, rateColor];
  const visibleCount = series.filter(name => visible[name]).length;

  return <section className="chart-sample sample-wide combination-sample" aria-labelledby="combination-title" data-chart-sample="combination">
    <header className="chart-sample-heading combination-heading">
      <div><p className="chart-eyebrow">04 · 组合与量纲</p><h2 id="combination-title">参与和完成，放在同一段时间里看</h2><p>面积与柱共用人数轴，完成率独立使用右轴。</p></div>
      <span className="chart-recipe">P01 / P03 · 柱、面积与双轴</span>
    </header>
    <div className="chart-controls combination-controls">
      <div className="chart-legend combination-legend" role="group" aria-label="组合图系列">
        {series.map((name, index) => <button key={name} type="button" aria-pressed={visible[name]} disabled={visibleCount === 1 && visible[name]}
          onClick={() => setVisible(current => ({ ...current, [name]: !current[name] }))}>
          <span className={`legend-swatch combination-swatch-${index}`} aria-hidden="true" style={{ background: legendColors[index] }} />{name}
        </button>)}
      </div>
      <div className="combination-range" role="group" aria-label="组合图时间范围">
        <button type="button" aria-pressed={range[0] === 0 && range[1] === 11} onClick={() => showRange(0, 11)}>全部 12 周</button>
        <button type="button" aria-pressed={range[0] === 6 && range[1] === 11} onClick={() => showRange(6, 11)}>后 6 周</button>
      </div>
    </div>
    <div ref={host} className="chart-body" data-rain-id="chart-validation-combination" data-chart-ready="false" data-render-count={0}>
      <div role="img" aria-label="参与人数面积、完成人数柱和完成率折线组合图；左轴人数，右轴0至100%；下方滑块调整周范围" style={{ height: 300 }}>
        <DualAxes {...options} onReady={handleReady} />
      </div>
    </div>
    <div className="chart-readout combination-readout">
      <label>组合读数 <select aria-label="组合读数" value={selectedWeek} onChange={event => setSelectedWeek(Number(event.target.value))}>
        {displayedData.map(row => <option key={row.week} value={weeks.indexOf(row.week)}>{row.week}</option>)}
      </select></label>
      <output data-testid="combination-readout" aria-live="polite">{reading.week} · 参与 {reading.participants} 人 · 完成 {reading.completed} 人 · 完成率 {reading.rate.toFixed(1)}%</output>
      <span data-testid="combination-range">当前 {weeks[range[0]]}—{weeks[range[1]]}，共 {displayedData.length} 周</span>
    </div>
    <DataDisclosure headers={["周次", "参与人数（人）", "完成人数（人）", "完成率"]} rows={displayedData.map(row => [row.week, row.participants, row.completed, `${row.rate.toFixed(1)}%`])} />
  </section>;
}
