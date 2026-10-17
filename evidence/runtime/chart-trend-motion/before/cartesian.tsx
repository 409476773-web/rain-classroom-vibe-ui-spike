import { useMemo, useState } from "react";
import { Area, Column, Tiny } from "@ant-design/plots";
import { Button } from "@rain-next/ui";
import {
  type Appearance,
  DataDisclosure,
  chartTheme,
  paletteColors,
  usePlotReady,
} from "./shared";

// Local experiment: P02 / P03 from the approved chart-reference recipe plan.
// V01 keeps series identities stable; V03 separates line and fill; I02 keeps
// exact values available independently of Canvas hover and visual treatment.
const WEEKS = Array.from({ length: 12 }, (_, index) => `第${index + 1}周`);
const TREND_SERIES = ["本期", "上期"];
const CURRENT: (number | null)[] = [42, 56, 63, 0, 71, 82, 68, null, 88, 95, 90, 106];
const PREVIOUS = [35, 46, 52, 47, 58, 64, 56, 70, 72, 78, 82, 88];
const GROUPS = ["第1单元", "第2单元", "第3单元", "第4单元"];
const COLUMN_SERIES = ["班级一", "班级二", "班级三", "班级四", "班级五", "班级六"];
const COLUMN_VALUES = [
  [52, 43, 36, 61, 47, 56],
  [67, 51, 2, 58, 42, 63],
  [61, 0, 48, 72, -18, 54],
  [74, 66, 58, 81, 63, 70],
];
const MINI_VALUES = [21, 27, 25, 32, 29, 37, 35, 43, 41, 48, 45, 54];

type TrendDatum = { week: string; series: string; value: number | null };
type ColumnDatum = { group: string; series: string; value: number };

export function CartesianSamples({ appearance }: { appearance: Appearance }) {
  const [readingIndex, setReadingIndex] = useState(5);
  const [curve, setCurve] = useState<"smooth" | "linear">("smooth");
  const trendReady = usePlotReady();
  const columnReady = usePlotReady();
  const miniReady = usePlotReady();
  const colors = paletteColors(appearance);
  // CH-125 P03's blue is a scoped source recipe, not a new global token.
  const trendColors = [appearance.palette === "near" ? "#3D7BFF" : colors[0]!, colors[4]!];
  // G2 gives line/area style callbacks an entire series, while intervals get
  // one row. Resolve the identity from that series rather than changing data.
  const seriesColor = (datum: TrendDatum | TrendDatum[]) => {
    const series = Array.isArray(datum) ? datum[0]!.series : datum.series;
    return trendColors[TREND_SERIES.indexOf(series)]!;
  };
  const current = useMemo(
    () => CURRENT.map((value, index) => index === 5 ? Number(value) + appearance.revision * 7 : value),
    [appearance.revision],
  );
  const trendData = useMemo<TrendDatum[]>(() => WEEKS.flatMap((week, index) => [
    { week, series: TREND_SERIES[0]!, value: current[index] ?? null },
    { week, series: TREND_SERIES[1]!, value: PREVIOUS[index]! },
  ]), [current]);
  const columnData = useMemo<ColumnDatum[]>(() => GROUPS.flatMap((group, groupIndex) =>
    COLUMN_SERIES.map((series, seriesIndex) => ({
      group,
      series,
      value: COLUMN_VALUES[groupIndex]![seriesIndex]! + (groupIndex === 3 && seriesIndex === 0 ? appearance.revision * 3 : 0),
    }))), [appearance.revision]);
  const miniData = useMemo(() => MINI_VALUES.map((value, index) => ({
    index,
    value: value + (index === MINI_VALUES.length - 1 ? appearance.revision * 2 : 0),
  })), [appearance.revision]);
  const selectedValue = current[readingIndex];

  return <>
    <section className="chart-sample" aria-labelledby="trend-sample-title">
      <header className="chart-sample-heading">
        <div>
          <p className="chart-eyebrow">01 · 趋势与面积</p>
          <h2 id="trend-sample-title">每周学习参与</h2>
        </div>
        <span className="chart-recipe">P03 · 清晰线与轻面积</span>
      </header>
      <div className="chart-controls" role="group" aria-label="趋势插值方式">
        <span>曲线</span>
        <Button size="small" variant={curve === "smooth" ? "secondary" : "text"}
          aria-pressed={curve === "smooth"} onClick={() => setCurve("smooth")}>平滑</Button>
        <Button size="small" variant={curve === "linear" ? "secondary" : "text"}
          aria-pressed={curve === "linear"} onClick={() => setCurve("linear")}>折线</Button>
      </div>
      <div ref={trendReady.host} className="chart-body" data-chart-ready="false" data-render-count={0}
        role="img" aria-label="十二周本期与上期学习参与趋势。本期第四周为零，第八周缺测。精确数值可在图后读取。">
        <Area
          data={trendData}
          xField="week"
          yField="value"
          colorField="series"
          seriesField="series"
          height={280}
          stack={false}
          children={[{ type: "area", animate: appearance.motion ? undefined : false }]}
          theme={chartTheme()}
          scale={{ x: { domain: WEEKS }, y: { zero: true }, color: { domain: TREND_SERIES, range: trendColors } }}
          axis={{
            x: { title: false, labelAutoHide: true, labelAutoRotate: false, labelFormatter: (label: string) => label.replace("第", "") },
            y: { title: "人次", grid: true },
          }}
          legend={{ color: { position: "top", title: false } }}
          style={{
            shape: curve === "smooth" ? "smooth" : "area",
            fill: (datum: TrendDatum | TrendDatum[]) => appearance.gradient
              ? `linear-gradient(90deg, ${seriesColor(datum)}33 0%, ${seriesColor(datum)}00 100%)`
              : seriesColor(datum),
            fillOpacity: appearance.gradient ? 1 : 0.12,
            connect: false,
          }}
          line={{
            animate: appearance.motion ? undefined : false,
            style: {
              shape: curve === "smooth" ? "smooth" : "line",
              stroke: (datum: TrendDatum | TrendDatum[]) => seriesColor(datum),
              lineWidth: 2,
              strokeOpacity: 0.7,
              connect: false,
            },
          }}
          interaction={{ tooltip: { shared: true }, elementHighlight: false }}
          onReady={trendReady.onReady}
        />
      </div>
      <div className="chart-readout">
        <label>
          趋势读数
          <select aria-label="趋势读数" value={readingIndex} onChange={event => setReadingIndex(Number(event.target.value))}>
            {WEEKS.map((week, index) => <option key={week} value={index}>{week}</option>)}
          </select>
        </label>
        <output data-testid="trend-readout" aria-live="polite">
          {WEEKS[readingIndex]}：本期 {selectedValue === null ? "缺测" : `${selectedValue} 人次`} · 上期 {PREVIOUS[readingIndex]} 人次
        </output>
      </div>
      <p className="chart-note">第4周为真实零值；第8周缺测，保留断线。切换材质不改变数据。</p>
      <DataDisclosure headers={["周次", "本期（人次）", "上期（人次）"]}
        rows={WEEKS.map((week, index) => [week, current[index] ?? "缺测", PREVIOUS[index]!])} />
    </section>

    <section className="chart-sample" aria-labelledby="column-sample-title">
      <header className="chart-sample-heading">
        <div>
          <p className="chart-eyebrow">02 · 分组比较</p>
          <h2 id="column-sample-title">六个班级的练习变化</h2>
        </div>
        <span className="chart-recipe">P02 · 圆头渐隐柱</span>
      </header>
      <div ref={columnReady.host} className="chart-body" data-chart-ready="false" data-render-count={0}
        role="img" aria-label="四个单元、六个班级的练习变化。包含短柱、零值和负值，可展开精确数据。">
        <Column
          data={columnData}
          xField="group"
          yField="value"
          colorField="series"
          seriesField="series"
          group
          height={280}
          theme={chartTheme()}
          scale={{ x: { domain: GROUPS, padding: 0.3 }, y: { zero: true }, color: { domain: COLUMN_SERIES, range: colors } }}
          axis={{ x: { title: false }, y: { title: "人次变化", grid: true } }}
          legend={{ color: { position: "top", title: false } }}
          style={{
            fill: (datum: ColumnDatum) => {
              const color = colors[COLUMN_SERIES.indexOf(datum.series)]!;
              if (!appearance.gradient) return color;
              // G's angles differ from CSS: 90deg is downward, 270deg upward.
              // Fade toward the zero baseline; negative columns reverse direction.
              return `linear-gradient(${datum.value < 0 ? 270 : 90}deg, ${color} 0%, ${color}00 100%)`;
            },
            radiusTopLeft: (datum: ColumnDatum) => datum.value > 0 ? 4 : 0,
            radiusTopRight: (datum: ColumnDatum) => datum.value > 0 ? 4 : 0,
            radiusBottomLeft: (datum: ColumnDatum) => datum.value < 0 ? 4 : 0,
            radiusBottomRight: (datum: ColumnDatum) => datum.value < 0 ? 4 : 0,
            maxWidth: 12,
          }}
          interaction={{ tooltip: { shared: true }, elementHighlight: { background: true } }}
          state={{ inactive: { opacity: 0.3 } }}
          animate={appearance.motion ? undefined : false}
          onReady={columnReady.onReady}
        />
      </div>
      <p className="chart-note">第2单元含 2 人次短柱；第3单元含 0 与 −18。负值从零线向下，圆角朝数值端。</p>
      <DataDisclosure headers={["单元", ...COLUMN_SERIES]}
        rows={GROUPS.map(group => [group, ...columnData.filter(datum => datum.group === group).map(datum => datum.value)])} />
    </section>

    <section className="chart-sample" aria-labelledby="mini-sample-title">
      <header className="chart-sample-heading">
        <div>
          <p className="chart-eyebrow">03 · 紧凑读数</p>
          <h2 id="mini-sample-title">迷你趋势</h2>
        </div>
        <span className="chart-recipe">P03 · 96 × 40</span>
      </header>
      <div className="chart-readout">
        <div ref={miniReady.host} className="chart-body" data-chart-ready="false" data-render-count={0}
          style={{ width: 96, height: 40, flex: "0 0 96px" }} role="img" aria-label="十二期学习参与的迷你趋势，精确值见明细。">
          <Tiny.Area
            data={miniData}
            xField="index"
            yField="value"
            width={96}
            height={40}
            autoFit={false}
            padding={0}
            margin={0}
            axis={false}
            legend={false}
            tooltip={false}
            theme={chartTheme()}
            style={{
              fill: appearance.gradient
                ? `linear-gradient(90deg, ${trendColors[0]}33 0%, ${trendColors[0]}00 100%)`
                : trendColors[0],
              fillOpacity: appearance.gradient ? 1 : 0.12,
            }}
            line={{ style: { stroke: trendColors[0], strokeOpacity: 0.7, lineWidth: 2 } }}
            animate={appearance.motion ? undefined : false}
            onReady={miniReady.onReady}
          />
        </div>
        <p><strong>{miniData[miniData.length - 1]!.value}</strong> 人次<span> · 最近一期</span></p>
      </div>
      <DataDisclosure headers={["期次", "参与人次"]} rows={miniData.map(datum => [datum.index + 1, datum.value])} />
    </section>
  </>;
}
