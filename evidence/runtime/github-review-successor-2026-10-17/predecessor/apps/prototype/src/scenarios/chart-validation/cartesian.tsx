import { useMemo } from "react";
import { Column, Tiny } from "@ant-design/plots";
import { TrendMotionSample } from "./trend-motion";
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
const GROUPS = ["第1单元", "第2单元", "第3单元", "第4单元"];
const COLUMN_SERIES = ["班级一", "班级二", "班级三", "班级四", "班级五", "班级六"];
const COLUMN_VALUES = [
  [52, 43, 36, 61, 47, 56],
  [67, 51, 2, 58, 42, 63],
  [61, 0, 48, 72, -18, 54],
  [74, 66, 58, 81, 63, 70],
];
const MINI_VALUES = [21, 27, 25, 32, 29, 37, 35, 43, 41, 48, 45, 54];

type ColumnDatum = { group: string; series: string; value: number };

export function CartesianSamples({ appearance }: { appearance: Appearance }) {
  const columnReady = usePlotReady();
  const miniReady = usePlotReady();
  const colors = paletteColors(appearance);
  // CH-125 P03's blue is a scoped source recipe, not a new global token.
  const trendColors = [appearance.palette === "near" ? "#3D7BFF" : colors[0]!, colors[4]!];
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

  return <>
    <TrendMotionSample appearance={appearance} />

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
