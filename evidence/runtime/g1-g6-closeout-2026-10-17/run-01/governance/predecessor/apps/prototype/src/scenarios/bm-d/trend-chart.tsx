import { useId } from "react";
import { Area, CartesianGrid, ComposedChart, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { summarize, type WeekData } from "./state";

type Metric = "average" | "completion";
const classFor = (group: WeekData["group"]) => group === "一班" ? "bm-d-series-one" : "bm-d-series-two";

// Local six-week report only. Preserve absent weeks as null instead of joining across them.
export function buildTrendPoints(rows: readonly WeekData[], metric: Metric, firstWeek: number) {
  return Array.from({ length: 7 - firstWeek }, (_, index) => {
    const week = firstWeek + index;
    const value = (group: WeekData["group"]) => summarize(rows.filter(row => row.week === week && row.group === group))[metric];
    return { week, 一班: value("一班"), 二班: value("二班") };
  });
}

function Point({ cx, cy, square, colorClass, r = 3 }: { cx?: number; cy?: number; square: boolean; colorClass?: string; r?: number }) {
  if (cx == null || cy == null) return null;
  return square ? <rect className={colorClass} x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill="currentColor" stroke="currentColor" />
    : <circle className={colorClass} cx={cx} cy={cy} r={r} fill="currentColor" stroke="currentColor" />;
}

export function TrendChart({ rows, metric, firstWeek, selectedWeek, overall = false }: { rows: readonly WeekData[]; metric: Metric; firstWeek: number; selectedWeek?: number; overall?: boolean }) {
  const gradientId = useId();
  const data: Record<string, number | null>[] = overall
    ? Array.from({ length: 7 - firstWeek }, (_, index) => ({ week: firstWeek + index, overall: summarize(rows.filter(row => row.week === firstWeek + index))[metric] }))
    : buildTrendPoints(rows, metric, firstWeek);
  const groups = (["一班", "二班"] as const).filter(group => rows.some(row => row.group === group));
  const overallColor = groups.length === 1 ? classFor(groups[0]!) : "report-a-series-overall";
  const series = overall ? [{ key: "overall", label: groups.length > 1 ? "总体" : groups[0] ?? "当前班级", colorClass: overallColor, square: false }]
    : groups.map(group => ({ key: group, label: group, colorClass: classFor(group), square: group === "二班" }));
  const Chart = overall ? ComposedChart : LineChart;
  const label = metric === "average" ? "平均分" : "提交率", unit = metric === "average" ? "分" : "%";
  return <figure className={`bm-d-chart-figure ${overall ? overallColor : ""}`} data-rain-id="local-report-trend" data-asset-identity="local-experiment">
    <figcaption>
      <span className="bm-d-legend">{series.map(item => <span key={item.key}><svg className={item.colorClass} width="28" height="16" viewBox="0 0 28 16" aria-hidden="true"><line x1="1" x2="27" y1="8" y2="8" stroke="currentColor" strokeDasharray={item.square ? "5 3" : undefined} /><Point cx={14} cy={8} square={item.square} /></svg>{item.label}{overall && ` · ${label}`}</span>)}</span>
      {overall && <span className="report-a-note">{metric === "average" ? "满分 100 分" : "已交 / 应交"}</span>}
    </figcaption>
    <div className="bm-d-chart">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 760, height: 280 }}>
        <Chart data={data} margin={{ top: overall ? 28 : 16, right: overall ? 36 : 16, bottom: 0, left: 0 }} accessibilityLayer aria-label={`${label}趋势图`} data-focus="item">
          {overall && <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" className="report-a-area-start" /><stop offset="100%" className="report-a-area-end" /></linearGradient></defs>}
          <CartesianGrid vertical={false} className="bm-d-gridline" />
          <XAxis dataKey="week" axisLine={false} tickLine={false} tickMargin={12} height={36} interval={0} tickFormatter={week => `第${week}周`} />
          <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} width={36} axisLine={false} tickLine={false} tickMargin={8} />
          {selectedWeek !== undefined && <ReferenceLine x={selectedWeek} className="bm-d-marker" stroke="inherit" />}
          <Tooltip isAnimationActive={false} filterNull={false} cursor={{ className: "bm-d-marker" }} content={({ active, label: week }) => {
            const point = data.find(point => point.week === Number(week));
            return active && point ? <div className="bm-d-tooltip" role="status" aria-label="图表即时读数" aria-live="polite"><strong>临时查看 · 第 {point.week} 周 · {label}</strong>{series.map(item => <p key={item.key}><span className="bm-d-legend"><span className={`report-a-tooltip-dot ${item.colorClass}`} />{item.label}</span><b>{point[item.key] == null ? "缺测" : `${point[item.key]!.toFixed(1)}${unit}`}</b></p>)}</div> : null;
          }} />
          {overall && <Area dataKey="overall" type="linear" stroke="none" fill={`url(#${gradientId})`} baseValue={0} connectNulls={false} isAnimationActive={false} tooltipType="none" />}
          {series.map(item => <Line key={item.key} className={item.colorClass} name={item.label} dataKey={item.key} type="linear" stroke="currentColor" strokeDasharray={item.square ? "6 4" : undefined}
            connectNulls={false} isAnimationActive={false} dot={props => <Point key={props.key} cx={props.cx} cy={props.cy} square={item.square} colorClass={item.colorClass} />}
            label={overall ? props => {
              if (props.index !== 0 && props.index !== data.length - 1) return <g />;
              return <text x={props.x} y={Number(props.y) - 14} textAnchor="middle" className="report-a-point-label">{typeof props.value === "number" ? props.value.toFixed(1) : ""}</text>;
            } : false}
            activeDot={props => <Point cx={props.cx} cy={props.cy} square={item.square} colorClass={item.colorClass} r={5} />} />)}
        </Chart>
      </ResponsiveContainer>
    </div>
  </figure>;
}
