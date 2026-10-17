import { useId, type ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TextScoreIcon } from "@rain-next/ui/icons/text-score";
import { ArticleFilledIcon } from "@rain-next/ui/icons/article-filled";
import { TimeFilledIcon } from "@rain-next/ui/icons/time-filled";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableScrollArea } from "@rain-next/ui";
import { DensityProvider } from "@rain-next/foundations";
import { summarize, type WeekData } from "./state";

const format = (value: number | null) => value === null ? "—" : value.toFixed(1);
const classId = (label: string) => label === "一班" ? "one" : "two";

function ChapterTitle({ id, children, note }: { id: string; children: ReactNode; note: string }) {
  return <div className="report-a-chapter-heading"><span className="report-a-section-marker" aria-hidden="true" /><h2 id={id}>{children}</h2><span className="report-a-note">{note}</span></div>;
}

// Page-owned compositions: all sections consume the same host-filtered range.
function ReportOverview({ rows, firstWeek }: { rows: readonly WeekData[]; firstWeek: number }) {
  const total = summarize(rows);
  const first = summarize(rows.filter(row => row.week === firstWeek));
  const last = summarize(rows.filter(row => row.week === 6));
  const change = first.average === null || last.average === null ? null : last.average - first.average;
  return <section className="report-a-overview-grid" aria-label="关键指标" data-rain-id="local-report-overview">
    <section className="report-a-hero report-a-hero-score" aria-label="成绩表现">
      <div className="report-a-hero-title"><span className="report-a-symbol" aria-hidden="true"><ArticleFilledIcon /></span><h3>成绩表现</h3></div>
      <div className="report-a-score-decoration" aria-hidden="true"><i /><i /><i /></div>
      <dl className="report-a-hero-values">
        <div className="bm-d-statistic" data-rain-id="local-statistic" data-slot="statistic"><dt>本期平均分</dt><dd><span className="rain-type-data" data-slot="value">{format(total.average)}</span><span data-slot="unit">分</span></dd><dd className="report-a-note">按已交份数加权</dd></div>
        <div className="report-a-change"><dt>首末周变化</dt><dd><strong>{change !== null && change > 0 ? "+" : ""}{format(change)}</strong><span>分</span></dd><dd className="report-a-note">第 {firstWeek} → 6 周</dd></div>
      </dl>
    </section>
    <section className="report-a-hero report-a-hero-completion" aria-label="作业完成">
      <div className="report-a-hero-title"><span className="report-a-symbol" aria-hidden="true"><TimeFilledIcon /></span><h3>作业完成</h3></div>
      <TextScoreIcon className="report-a-completion-decoration" aria-hidden="true" />
      <div className="report-a-completion-body">
        <dl><div className="bm-d-statistic" data-rain-id="local-statistic" data-slot="statistic"><dt>本期提交率</dt><dd><span className="rain-type-data" data-slot="value">{format(total.completion)}{total.completion !== null ? "%" : ""}</span></dd></div></dl>
        <div className="report-a-completion-counts"><p><span>已交 <strong>{total.submissions}</strong><span className="report-a-denominator"> / {total.expected} 份</span></span></p><div className="report-a-completion-track" aria-hidden="true"><span style={{ width: `${total.completion ?? 0}%` }} /></div><p><span>未提交</span><span><b>{total.expected - total.submissions}</b> 份</span></p></div>
      </div>
    </section>
  </section>;
}

function ReportClassComparison({ rows }: { rows: readonly WeekData[] }) {
  const classes = (["一班", "二班"] as const).filter(label => rows.some(row => row.group === label))
    .map(label => ({ label, ...summarize(rows.filter(row => row.group === label)) }));
  return <section className="report-a-comparison" aria-labelledby="report-a-comparison-title">
    <h3 id="report-a-comparison-title">{classes.length > 1 ? "班级对照" : "班级表现"}</h3>
    <div className="report-a-comparison-grid">{(["average", "completion"] as const).map(metric => {
      const difference = classes.length === 2 && classes.every(item => item[metric] !== null) ? classes[1]![metric]! - classes[0]![metric]! : null;
      return <div className="report-a-comparison-metric" key={metric}>
        <h4>{metric === "average" ? "平均分（分）" : "提交率（%）"}</h4>
        <div className="report-a-comparison-rows">{classes.map(item => <div className="report-a-comparison-row" key={item.label}>
          <span className="report-a-class-label" data-group={classId(item.label)}>{item.label}</span>
          <div className="report-a-bar" data-group={classId(item.label)} aria-hidden="true"><span style={{ width: `${item[metric] ?? 0}%` }} /></div>
          <strong className="report-a-comparison-value">{format(item[metric])}{metric === "completion" && item[metric] !== null ? "%" : ""}</strong>
        </div>)}</div>
        {difference !== null && <p className="report-a-panel-note">{Math.abs(difference) < 0.05 ? "两班当前指标相同" : <>{difference > 0 ? "二班" : "一班"}高出 <strong>{Math.abs(difference).toFixed(1)}</strong> {metric === "average" ? "分" : "个百分点"}</>}</p>}
      </div>;
    })}</div>
  </section>;
}

export function buildGapPoints(rows: readonly WeekData[], firstWeek: number) {
  return Array.from({ length: 7 - firstWeek }, (_, index) => {
    const week = firstWeek + index, observed = rows.filter(row => row.week === week);
    const total = summarize(observed);
    return { week, gap: observed.length ? total.expected - total.submissions : null };
  });
}

export function ReportSubmissionGaps({ rows, firstWeek }: { rows: readonly WeekData[]; firstWeek: number }) {
  const gradientId = useId();
  const total = summarize(rows), gap = total.expected - total.submissions;
  const weeks = buildGapPoints(rows, firstWeek), firstTwo = weeks.slice(0, 2);
  const comparable = firstTwo.length === 2 && firstTwo.every(point => point.gap !== null);
  const firstTwoGap = firstTwo.reduce((sum, point) => sum + (point.gap ?? 0), 0);
  const max = Math.max(5, ...weeks.map(point => point.gap ?? 0));
  const step = Math.max(5, Math.ceil(max / 20) * 5), axisMax = step * 4;
  const range = `第 ${firstWeek}–${firstWeek + 1} 周`;
  return <section className="report-a-gaps" aria-labelledby="report-a-gaps-title" data-rain-id="local-report-submission-gaps">
    <div className="report-a-gap-visual">
      <div className="report-a-panel-heading"><h3 id="report-a-gaps-title">提交缺口</h3><span className="report-a-note">未提交作业份数</span></div>
      <figure className="report-a-gap-figure">
        <figcaption className="sr-only">{weeks.map(point => `第 ${point.week} 周：${point.gap === null ? "缺测" : `${point.gap} 份未提交`}`).join("；")}</figcaption>
        <div className="bm-d-chart report-a-gap-chart"><ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 640, height: 244 }}>
          <BarChart data={weeks} margin={{ top: 24, right: 16, bottom: 0, left: 0 }} accessibilityLayer aria-label="每周未提交份数图" data-focus="item">
            <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" className="report-a-gap-start" /><stop offset="100%" className="report-a-gap-end" /></linearGradient></defs>
            <CartesianGrid vertical={false} className="bm-d-gridline" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} height={36} tickMargin={12} interval={0} tickFormatter={week => `第${week}周`} />
            <YAxis domain={[0, axisMax]} ticks={Array.from({ length: 5 }, (_, index) => index * step)} width={32} axisLine={false} tickLine={false} tickMargin={8} />
            <Tooltip shared={false} isAnimationActive={false} cursor={{ className: "report-a-gap-cursor" }} content={({ active, payload }) => {
              const point = weeks.find(point => point.week === payload?.[0]?.payload?.week);
              return active && point ? <div className="bm-d-tooltip" role="status" aria-label="缺口即时读数">第 {point.week} 周 · 未提交 <strong>{point.gap === null ? "缺测" : `${point.gap} 份`}</strong></div> : null;
            }} />
            <Bar dataKey="gap" fill={`url(#${gradientId})`} maxBarSize={48} radius={[3, 3, 0, 0]} isAnimationActive={false}
              activeBar={({ x, y, width, height, index }) => <g>
                <Rectangle x={x} y={y} width={width} height={height} fill={`url(#${gradientId})`} radius={[3, 3, 0, 0]} />
                <text x={x + width / 2} y={y - 8} textAnchor="middle" className="report-a-gap-label">{weeks[index]?.gap}</text>
              </g>} />
          </BarChart>
        </ResponsiveContainer></div>
      </figure>
    </div>
    <aside className="report-a-gap-insight" aria-label="缺口解读">
      <div><p>本期未提交</p><p className="report-a-gap-total"><strong>{gap}</strong><span>份</span></p></div>
      {gap > 0 && comparable && <div className="report-a-gap-share"><p>{range}占 <strong>{(firstTwoGap / gap * 100).toFixed(1)}%</strong></p><p className="report-a-note">{firstTwoGap} / {gap} 份</p></div>}
      <div className="report-a-gap-advice"><h4>核查建议</h4><p>{gap === 0 ? "当前范围的作业均已提交，可结合成绩表现继续查看学习情况。" : comparable && firstTwoGap > 0 ? `先核对${range}的未提交情况，再确认是否需要跟进。` : "结合下方周度明细，核对未提交情况，再确认是否需要跟进。"}</p></div>
    </aside>
  </section>;
}

export function ReportContent({ rows, firstWeek, group, trend }: { rows: readonly WeekData[]; firstWeek: number; group: string; trend: ReactNode }) {
  return <>
    <section className="report-a-chapter report-a-overview" aria-labelledby="report-overview-title" data-slot="report-chapter">
      <ChapterTitle id="report-overview-title" note={`${group} · 第 ${firstWeek}–6 周`}>本期学习概览</ChapterTitle>
      <ReportOverview rows={rows} firstWeek={firstWeek} />
      {trend}
    </section>
    <section className="report-a-chapter report-a-analysis" aria-labelledby="report-analysis-title" data-slot="report-chapter">
      <ChapterTitle id="report-analysis-title" note={`第 ${firstWeek}–6 周`}>班级与提交分析</ChapterTitle>
      <ReportClassComparison rows={rows} />
      <ReportSubmissionGaps rows={rows} firstWeek={firstWeek} />
    </section>
    <section className="report-a-chapter bm-d-details" aria-labelledby="bm-d-details-title" data-slot="report-chapter">
      <ChapterTitle id="bm-d-details-title" note={`共 ${rows.length} 条`}>周度明细</ChapterTitle>
      <DensityProvider density="compact"><TableScrollArea aria-label="报告明细滚动区"><Table aria-label="周度明细"><TableCaption className="sr-only">当前筛选范围的全部周度汇总，按作业份数统计。</TableCaption>
        <TableHeader><TableRow><TableHead>周次</TableHead><TableHead>班级</TableHead><TableHead className="text-right">已交 / 应交</TableHead><TableHead className="text-center">未提交</TableHead><TableHead className="text-center">平均分（分）</TableHead><TableHead>提交率</TableHead></TableRow></TableHeader>
        <TableBody>{rows.map((row, index) => {
          const summary = summarize([row]);
          return <TableRow key={`${row.group}-${row.week}`} data-week-end={rows[index + 1]?.week !== row.week ? "true" : undefined}>
            <TableCell><span className={rows[index - 1]?.week === row.week ? "sr-only" : undefined}>第 {row.week} 周</span></TableCell>
            <TableCell><span className="report-a-class-label" data-group={classId(row.group)}>{row.group}</span></TableCell>
            <TableCell className="text-right"><strong className="report-a-submitted">{row.submitted}</strong><span className="report-a-denominator"> / {row.expected}</span></TableCell>
            <TableCell className="text-center">{row.expected - row.submitted}</TableCell>
            <TableCell className="text-center">{format(summary.average)}</TableCell>
            <TableCell><span className="report-a-table-rate"><span className="report-a-table-bar" data-group={classId(row.group)} aria-hidden="true"><span style={{ width: `${summary.completion ?? 0}%` }} /></span><span>{format(summary.completion)}{summary.completion !== null ? "%" : ""}</span></span></TableCell>
          </TableRow>;
        })}</TableBody>
      </Table></TableScrollArea></DensityProvider>
      <p className="report-a-data-note">示例数据：以作业份数汇总，非去重人数。未提交不计作零分；无提交或应交为零时，相应指标显示“—”。</p>
    </section>
  </>;
}
