import { useEffect, useRef, useState } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Grid, Inline, Stack } from "@rain-next/layouts";
import { Button, Checkbox, FormItem, IconButton, Link, Popover, RadioGroup, defineRainLocalRecipe, type RadioPart, type PopoverPart, Empty, EmptyActions, EmptyDescription, EmptyTitle, Select, Tag, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableScrollArea } from "@rain-next/ui";
import { RefreshIcon } from "@rain-next/ui/icons/refresh";
import { HelpIcon } from "@rain-next/ui/icons/help";
import { ShareAltIcon } from "@rain-next/ui/icons/share-alt";
import { simulateTask } from "../bm-b/state";
import { reportData, summarize } from "./state";
import { TrendChart } from "./trend-chart";
import { ReportContent } from "./report-sections";
import "./page.css";
import "./report-a.css";

function Statistic({ label, value, unit }: { label: string; value: string; unit: string }) {
  return <div className="bm-d-statistic" data-rain-id="local-statistic" data-slot="statistic"><dt data-slot="label">{label}</dt><dd><span className="rain-type-data" data-slot="value">{value}</span><span data-slot="unit">{unit}</span></dd></div>;
}
const reportHelp = defineRainLocalRecipe<PopoverPart, "ui-popover">({
  id: "bm-d-report-help", scope: "feature", origin: "ui-popover", classes: { content: "bm-d-help" },
  modifiedParts: ["content"], candidateTokens: [], promotionStatus: "not-proposed",
});
const metricButtons = defineRainLocalRecipe<RadioPart, "ui-radio">({
  id: "bm-d-metric-buttons", scope: "feature", origin: "ui-radio",
  classes: { root: "bm-d-metric-option", input: "bm-d-metric-input", control: "bm-d-metric-indicator", label: "bm-d-metric-label" },
  modifiedParts: ["root", "input", "control", "label"], candidateTokens: [], promotionStatus: "not-proposed",
});
const format = (value: number | null) => value === null ? "—" : value.toFixed(1);

export function LearningReportScenario({ loadTask = simulateTask, presentation = "original" }: { loadTask?: (signal: AbortSignal, fail: boolean) => Promise<void>; presentation?: "original" | "comparison" }) {
  const comparison = presentation === "comparison";
  const [group, setGroup] = useState("全部班级"), [period, setPeriod] = useState("all");
  const [metric, setMetric] = useState<"average" | "completion">("average"), [selectedWeek, setSelectedWeek] = useState(6);
  const [dark, setDark] = useState(false), [empty, setEmpty] = useState(false), [failLoad, setFailLoad] = useState(false);
  const [loadState, setLoadState] = useState<"ready" | "loading" | "failed">("ready");
  const requestRef = useRef<AbortController | null>(null), statusRef = useRef<HTMLParagraphElement>(null);
  const firstWeek = period === "recent" ? 4 : 1;
  const rows = empty ? [] : reportData.filter(row => (group === "全部班级" || row.group === group) && row.week >= firstWeek);
  const totals = summarize(rows), weeks = [...new Set(rows.map(row => row.week))], groups = [...new Set(rows.map(row => row.group))];
  const week = weeks.includes(selectedWeek) ? selectedWeek : weeks[weeks.length - 1] ?? 0;
  const unit = metric === "average" ? "分" : "%", metricLabel = metric === "average" ? "平均分" : "提交率";
  const pointValue = (label: string, value: number) => summarize(rows.filter(row => row.group === label && row.week === value))[metric];
  const first = summarize(rows.filter(row => row.week === firstWeek)), last = summarize(rows.filter(row => row.week === 6));
  const scopeDescription = `统计范围：${group} · 第 ${firstWeek}–6 周 · ${rows.length} 条周度汇总；指标覆盖全部筛选数据。`;
  const statistics = [
    { label: "应交作业", value: String(totals.expected), unit: "份" },
    { label: "实际提交", value: String(totals.submissions), unit: "份" },
    { label: "平均分", value: format(totals.average), unit: "分" },
    { label: "提交率", value: `${format(totals.completion)}%`, unit: "" },
  ];
  useEffect(() => () => requestRef.current?.abort(), []);
  useEffect(() => {
    if (!comparison) return;
    const previous = document.title;
    document.title = "学习报告 · 雨课堂";
    return () => { document.title = previous; };
  }, [comparison]);
  useEffect(() => { if (loadState === "failed") statusRef.current?.focus(); }, [loadState]);
  async function reload() {
    if (requestRef.current) return;
    const request = new AbortController(); requestRef.current = request; setLoadState("loading"); setFailLoad(false);
    try {
      await loadTask(request.signal, failLoad);
      if (!request.signal.aborted && requestRef.current === request) setLoadState("ready");
    } catch {
      if (!request.signal.aborted && requestRef.current === request) setLoadState("failed");
    } finally { if (requestRef.current === request && !request.signal.aborted) requestRef.current = null; }
  }
  function changeGroup(value: string) { if (!requestRef.current) { setGroup(value); } }

  const trend = <section className="bm-d-trend" aria-labelledby="bm-d-trend-title"><Stack gap={16}>
            <div className="bm-d-trend-heading"><div className="bm-d-section-heading">{comparison ? <h3 id="bm-d-trend-title">整体变化</h3> : <h2 id="bm-d-trend-title">每周学习趋势</h2>}
              <Popover.Root><Popover.Trigger render={<IconButton size={comparison ? "24/12" : "28/16"} aria-label="趋势说明" icon={<HelpIcon />} />} /><Popover.Content localRecipe={reportHelp}><Popover.Title>趋势说明</Popover.Title><Popover.Description>{comparison ? "展示当前范围的总体变化，平均分按每周已交份数加权。" : "比较两个班的变化，"}纵轴固定 0–100。悬停或聚焦图表后用左右键临时查看各周；{!comparison && "下方选择的固定对照周次保持不变。"}{comparison && <>每份作业满分 100 分；提交率为已交作业除以应交作业。切换指标只影响此趋势图，班级对照同时展示平均分与提交率。</>}</Popover.Description></Popover.Content></Popover.Root>
            </div>
              <RadioGroup className="bm-d-metric-group" localRecipe={metricButtons} legend={comparison ? "图表指标" : "趋势指标"} legendHidden orientation="horizontal" value={metric} onValueChange={value => { if (value === "average" || value === "completion") setMetric(value); }} options={[{ value: "average", label: "平均分" }, { value: "completion", label: "提交率" }]} />
            </div>
            <TrendChart rows={rows} metric={metric} firstWeek={firstWeek} selectedWeek={comparison ? undefined : week} overall={comparison} />
            {!comparison && <div className="bm-d-week"><div><FormItem label="固定对照" labelPosition="inside"><Select clearable={false} value={String(week)} onValueChange={value => value && setSelectedWeek(Number(value))} options={weeks.map(value => ({ value: String(value), label: `第 ${value} 周` }))} /></FormItem></div>
            <p className="bm-d-readout" role="status" aria-label="趋势读数">第 {week} 周{metricLabel}：{groups.map(label => `${label} ${format(pointValue(label, week))}${unit}`).join("；")}。</p></div>}

          </Stack></section>;

  return <main className="bm-d" data-rain-id={comparison ? "local-learning-report-a" : "scenario-bm-d"} data-presentation={presentation} data-asset-identity="local-experiment" data-rain-theme={dark ? "dark" : "light"}>
    <header className="bm-d-header"><div className="bm-d-header-inner">
      <div className="bm-d-title-line">{comparison ? <Tag appearance="outlined" color="neutral" size={24}>教学分析</Tag> : <span className="bm-d-eyebrow">教学分析</span>}<h1>大学物理 · 学习报告</h1>
        <Popover.Root><Popover.Trigger render={<IconButton size={comparison ? "24/12" : "28/16"} aria-label="统计口径" icon={<HelpIcon />} />} /><Popover.Content localRecipe={reportHelp}><Popover.Title>统计口径</Popover.Title><Popover.Description>应交与已交按作业份数累计；平均分按已交份数加权，满分 100；提交率为已交除以应交。周度汇总无法计算去重人数，趋势不代表教学因果。</Popover.Description></Popover.Content></Popover.Root>
      </div>
      <Link href={comparison ? "#teacher-grading" : "#bm-c"} className="bm-d-navigation"><span className="bm-d-action-label">进入作业批改<ShareAltIcon aria-hidden="true" /></span></Link>
    </div></header>
    <div className="bm-d-content"><Stack gap={comparison ? 24 : 20}>
      <section className="bm-d-filter" aria-label="统计范围">
        <Inline gap={12}>
          <div className="bm-d-group"><FormItem label="报告班级" labelPosition="inside"><Select size={comparison ? 36 : undefined} clearable={false} value={group} disabled={loadState === "loading"} onValueChange={value => { if (typeof value === "string") changeGroup(value); }} options={["全部班级", "一班", "二班"].map(value => ({ value, label: value }))} /></FormItem></div>
          <div className="bm-d-period"><FormItem label="报告周期" labelPosition="inside"><Select size={comparison ? 36 : undefined} clearable={false} disabled={loadState === "loading"} value={period} onValueChange={value => { if (value === "all" || value === "recent") { setPeriod(value); } }} options={[{ value: "all", label: "第 1–6 周" }, { value: "recent", label: "第 4–6 周" }]} /></FormItem></div>
        </Inline>
        {comparison && <p className="report-a-scope">{group} · 第 {firstWeek}–6 周 · {rows.length} 条周度汇总</p>}
        <Button variant="text" tone="default" aria-label="刷新报告" leadingIcon={<RefreshIcon />} loading={loadState === "loading"} onClick={() => void reload()}>刷新</Button>
      </section>
      {!comparison && <p className="sr-only">{scopeDescription}</p>}
      {loadState !== "ready" ? <section className="bm-d-message"><p ref={statusRef} tabIndex={-1} role={loadState === "failed" ? "alert" : "status"}>{loadState === "failed" ? "报告加载失败，当前范围的数据尚未更新。" : "正在更新报告…"}</p>{loadState === "failed" && <Button variant="text" tone="default" onClick={() => void reload()}>重试加载</Button>}</section>
        : !rows.length ? <Empty><EmptyTitle>暂无报告数据</EmptyTitle><EmptyDescription>当前范围还没有可用的作业汇总。</EmptyDescription><EmptyActions><Button onClick={() => { setEmpty(false); }}>恢复示例数据</Button></EmptyActions></Empty>
        : comparison ? <ReportContent rows={rows} firstWeek={firstWeek} group={group} trend={trend} /> : <>
          <section aria-label="关键指标"><dl className="bm-d-metrics"><Grid columns={4} minColumnWidth={140} gap={0}>
            {statistics.map(item => <Statistic key={item.label} {...item} />)}
          </Grid></dl></section>
          <div className="bm-d-report-layout">
            {trend}
            <div className="bm-d-observations">
              <section className="bm-d-summary" aria-labelledby="bm-d-summary-title"><h2 id="bm-d-summary-title">本期观察</h2><p>第 {firstWeek} 周至第 6 周，平均分从 {format(first.average)} 分变为 {format(last.average)} 分。</p></section>
              <section className="bm-d-insight" aria-labelledby="bm-d-insight-title"><h2 id="bm-d-insight-title">教学建议 · 示例</h2><p>先了解未提交的原因，再从典型作答中选择需要共同讨论的概念。</p></section>
            </div>
          </div>
          <section className="bm-d-details" aria-labelledby="bm-d-details-title"><Inline justify="between"><div className="bm-d-section-heading"><h2 id="bm-d-details-title">数据明细</h2></div><span className="bm-d-scope">共 {rows.length} 条 · 周度汇总</span></Inline>
            <DensityProvider density="default"><TableScrollArea aria-label="报告明细滚动区"><Table><TableCaption className="sr-only">当前筛选范围的全部周度汇总。</TableCaption><TableHeader><TableRow><TableHead>周次</TableHead><TableHead>班级</TableHead><TableHead className="text-right">应交（份）</TableHead><TableHead className="text-right">已交（份）</TableHead><TableHead className="text-right">平均分（分）</TableHead><TableHead className="text-right">提交率（%）</TableHead></TableRow></TableHeader><TableBody>{rows.map(row => <TableRow key={`${row.group}-${row.week}`} ><TableCell>第 {row.week} 周</TableCell><TableCell><span className="bm-d-class-name" data-group={row.group === "一班" ? "one" : "two"}>{row.group}</span></TableCell><TableCell className="text-right"><span className="bm-d-count">{row.expected}</span></TableCell><TableCell className="text-right"><span className="bm-d-count">{row.submitted}</span></TableCell><TableCell className="text-right"><span className="bm-d-result"><strong>{format(summarize([row]).average)}</strong></span></TableCell><TableCell className="text-right"><span className="bm-d-result"><strong>{format(summarize([row]).completion)}</strong></span></TableCell></TableRow>)}</TableBody></Table></TableScrollArea>
            </DensityProvider>
          </section>
        </>}
      <footer className="bm-d-footer">{!comparison && <p>虚构教学数据与示例建议 · 仅供报告体验</p>}<details><summary data-focus="item">演示设置</summary><Inline gap={16}><Button variant="tertiary" onClick={() => setDark(!dark)}>{dark ? "切换浅色" : "切换深色"}</Button><Checkbox label="下次加载失败" disabled={loadState === "loading"} checked={failLoad} onCheckedChange={setFailLoad} /><Button variant="tertiary" disabled={loadState === "loading"} onClick={() => { setEmpty(true); setLoadState("ready"); }}>预览空数据</Button></Inline></details></footer>
    </Stack></div>
  </main>;
}
