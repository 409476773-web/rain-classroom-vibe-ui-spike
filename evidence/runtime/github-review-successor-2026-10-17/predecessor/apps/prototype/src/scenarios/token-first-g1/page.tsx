import { useState } from "react";
import { Alert, AlertTitle, AlertDescription, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction, Input, Switch, Tabs, Tag, Dialog, DropdownMenu, RadioGroup, defineRainLocalRecipe, type CardPart, type DropdownMenuPart } from "@rain-next/ui";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { ArticleFilledIcon } from "@rain-next/ui/icons/article-filled";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible";
import { answers, initialGrades } from "../bm-c/state";
import { reportData, summarize } from "../bm-d/state";
import { TrendChart } from "../bm-d/trend-chart";
import "../bm-d/page.css";
import "./page.css";
import { G1NextSamples } from "./next-samples";

const sampleCardRecipe = defineRainLocalRecipe<CardPart, "ui-card">({ id: "g1-sample-card", scope: "feature", origin: "ui-card", classes: { root: "border-none gap-rain-16 py-rain-24", header: "gap-y-rain-2" }, modifiedParts: ["root", "header"], candidateTokens: [], promotionStatus: "not-proposed" });
const menuRecipe = defineRainLocalRecipe<DropdownMenuPart, "ui-dropdown-menu">({ id: "g1-review-menu", scope: "feature", origin: "ui-dropdown-menu", classes: { content: "g1-local-surface" }, modifiedParts: ["content"], candidateTokens: [], promotionStatus: "not-proposed" });

function ToolbarSample({ kind }: { kind: "default" | "local" | "sibling" }) {
  const [query, setQuery] = useState(""), [paper, setPaper] = useState("A"), [pending, setPending] = useState(false);
  const rows = answers.filter(a => a.paper === paper && `${a.student} ${a.title}`.includes(query.trim()) && (!pending || Boolean(a.text) && !initialGrades[a.id]));
  return <section className={`g1-toolbar-sample ${kind === "local" ? "g1-toolbar-local" : ""}`} data-sample={kind} aria-label={`${kind} 工具栏`}>
    <Tabs.Root aria-label="试卷" size={38} appearance="line" showDivider={false} overflow="scroll" value={paper} onValueChange={v => setPaper(String(v))}
      items={["A", "B"].map(value => ({ value, label: `${value} 卷`, content: <p className="g1-support" role="status">{rows.length} 份作答 · {rows[0] ? `${rows[0].student} / ${rows[0].title}` : "没有匹配结果，请调整条件。"}</p> }))}>
    <div className="g1-toolbar">
      <div className="g1-paper"><Tabs.Nav /></div>
      <Input className="g1-field" size={36} aria-label="查找作答" leadingIcon={<SearchIcon />} value={query} onValueChange={setQuery} placeholder="学生或题目名称" clearable />
      <label className="g1-switch-label"><Switch checked={pending} onCheckedChange={setPending} />仅看待批改</label>
      <Button size="medium" variant="secondary" onClick={() => { setQuery(""); setPaper("A"); setPending(false); }}>恢复条件</Button>
    </div>
    <Tabs.Panels />
    </Tabs.Root>
  </section>;
}

type FoldVariant = "line" | "contained" | "tinted" | "quiet";

function AnswerCard({ kind, changeTheme, foldVariant }: { kind: "default" | "local" | "sibling"; changeTheme: () => void; foldVariant: FoldVariant }) {
  const [note, setNote] = useState(""), [open, setOpen] = useState(false);
  return <Card data-sample={kind} localRecipe={sampleCardRecipe}>
    <CardHeader><CardTitle>运动与受力</CardTitle><CardDescription>大学物理 · 课堂练习 03</CardDescription><CardAction><Tag color="difficulty4">简答题</Tag></CardAction></CardHeader>
    <CardContent><div className="g1-card-grid"><div className="g1-score"><span className="g1-support">示例得分</span><div><strong className="rain-type-data">8</strong><span>/10 分</span></div></div><div className="g1-card-focus"><span className="g1-support">本题关注</span><p>区分惯性与力，说明运动状态变化的条件。</p></div></div>
      <Collapsible variant={foldVariant} className="g1-example"><h3><CollapsibleTrigger className="g1-answer-heading"><span>示例作答</span></CollapsibleTrigger></h3><CollapsibleContent><p className="g1-answer">{answers[0]!.text}</p></CollapsibleContent></Collapsible>
      {note && <p role="status" className="g1-support">{note}</p>}
    </CardContent>
    <CardFooter><span className="g1-demo-note">当前页演示数据</span>
      <div className="g1-card-reference"><Dialog.Root><Dialog.Trigger render={<Button variant="text" tone="default" size="regular">评分细则</Button>} /><Dialog.Content width={616} className="g1-overlay">
        <Dialog.Header><Dialog.Title>评分细则</Dialog.Title><Dialog.Description>运动与受力 · 满分 10 分</Dialog.Description></Dialog.Header>
        <Dialog.Body><div className="g1-rubric"><p>研究对象与现象说明　4 分</p><p>区分惯性与力　　　　4 分</p><p>表达与适用条件　　　2 分</p></div>
          <Accordion variant={foldVariant}><AccordionItem value="long-answer"><AccordionTrigger>长作答如何判断</AccordionTrigger><AccordionContent>按论证内容判断，不根据字数直接给分；保留每份作答的独立判断。</AccordionContent></AccordionItem></Accordion>
        </Dialog.Body><Dialog.Footer><Dialog.Close render={<Button>知道了</Button>} /></Dialog.Footer>
      </Dialog.Content></Dialog.Root></div>
      <DropdownMenu.Root localRecipe={kind === "local" ? menuRecipe : undefined}><DropdownMenu.Trigger render={<Button variant="tertiary" size="mini">更多操作</Button>} /><DropdownMenu.Content className="g1-overlay">
      <DropdownMenu.Item label="标记为复核" onClick={() => setNote("已标记复核，仅保留在当前页面。")} />
      <DropdownMenu.Item label="清除复核标记" disabled={!note} onClick={() => setNote("")} />
    </DropdownMenu.Content></DropdownMenu.Root>
      <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger render={<Button variant="tertiary" size="mini" leadingIcon={<ArticleFilledIcon />}>查看批改说明</Button>} /><Dialog.Content width={616} className="g1-overlay">
        <Dialog.Header><Dialog.Title>批改说明</Dialog.Title><Dialog.Description>统一评分依据，保留每份作答的独立判断。</Dialog.Description></Dialog.Header>
        <Dialog.Body><Alert><AlertTitle>当前为交互演示</AlertTitle><AlertDescription>没有提交真实成绩，刷新后恢复示例。</AlertDescription></Alert>
          <p className="g1-dialog-copy">同一题目先确认评分标准，再逐份查看作答。已经评分的对象可重新复核，未保存的分数不计入完成进度。</p>
          <div className="g1-dialog-actions"><Button variant="secondary" onClick={changeTheme}>切换主题</Button><DropdownMenu.Root><DropdownMenu.Trigger render={<Button variant="secondary">说明选项</Button>} /><DropdownMenu.Content className="g1-overlay"><DropdownMenu.Item label="显示完整评分依据" onClick={() => setNote("已查看完整评分依据。")}/></DropdownMenu.Content></DropdownMenu.Root></div>
        </Dialog.Body><Dialog.Footer><Dialog.Close render={<Button>知道了</Button>} /></Dialog.Footer>
      </Dialog.Content></Dialog.Root>
    </CardFooter>
  </Card>;
}

function WorkbenchDirections() {
  const [direction, setDirection] = useState("a");
  return <><RadioGroup legend="工作台布局方向" orientation="horizontal" value={direction} onValueChange={setDirection} options={[{ value: "a", label: "A · 稳定三栏" }, { value: "b", label: "B · 阅读与评分同轴" }]} />
    <p className="g1-support">两版均保留对象目录、卷别与顺序、作答、评分依据、评语和连续批改。此处比较布局，完整操作沿用现有批改原型。</p>
    <div className={`g1-workbench g1-workbench-${direction}`}>
      <header><div><h2>大学物理 · 主观题批改</h2><span className="g1-support">课堂练习 03　/　A 卷　/　按题批改</span></div><a href="#teacher-grading">打开现有完整交互</a></header>
      <aside className="g1-directory"><h3>第 1 题 · 运动与受力</h3><p className="g1-support">查看对象</p>{answers.filter(a => a.paper === "A" && a.question === 1).map((a, i) => <div key={a.id} data-current={i === 0}><span>{a.student}</span><small>{initialGrades[a.id] ? "已评分" : "待批改"}</small></div>)}</aside>
      <article className="g1-reading"><div className="g1-reading-title"><h3>示例学生 01</h3><Tag>简答题</Tag></div><div className="g1-prompt">{answers[0]!.prompt}</div><div className="g1-answer">{answers[0]!.text}</div></article>
      <aside className="g1-inspector"><h3>本题评分</h3><div className="g1-grade-preview"><strong>8</strong><span> / 10 分</span></div><div className="g1-rule"><h3>评分依据</h3><p>现象与研究对象　4 分</p><p>惯性与力的区分　4 分</p><p>条件与表达　　　2 分</p></div><h3>给学生的评语</h3><div className="g1-comment-preview">思路清楚，请进一步说明惯性不是一种力。</div><p className="g1-support">保存成功后进入同组下一份。</p><a className="g1-flow-link" href="#teacher-grading">进入批改流程</a></aside>
    </div>
    <p className="g1-support">{direction === "a" ? "A：目录、阅读、评分位置稳定，适合长时间连续处理；主要代价是横向占用较多。" : "B：长作答获得更宽阅读区，评分在同一阅读轴尾部；主要代价是长文时需要向下滚动。"}</p></>;
}

function ReportDirections() {
  const [direction, setDirection] = useState("a");
  const totals = summarize(reportData);
  const observations = <section className="g1-report-observation"><h3>本期观察</h3><p>两班在六周内的平均分均逐步提高。先比较变化，再回到具体作答理解差异。</p><h3>后续教学</h3><p>结合提交情况追踪未提交原因；选取典型作答进行课堂讨论。</p><span className="g1-support">示例观察，不推断教学因果。</span></section>;
  const metrics = <dl className="g1-report-metrics">{[["平均分", totals.average?.toFixed(1), "分"], ["提交率", totals.completion?.toFixed(1), "%"], ["已交 / 应交", `${totals.submissions} / ${totals.expected}`, "份"]].map(([label, value, unit]) => <div key={label}><dt>{label}</dt><dd><strong>{value ?? "—"}</strong><span>{unit}</span></dd></div>)}</dl>;
  return <><RadioGroup legend="报告布局方向" orientation="horizontal" value={direction} onValueChange={setDirection} options={[{ value: "a", label: "A · 趋势与对照" }, { value: "b", label: "B · 结论带领阅读" }]} />
    <p className="g1-support">同一六周、两班数据，保留趋势、班级比较、观察与统计口径。图表暂复用 BM-D 配方，F08 通用图表角色留在 G4。</p>
    <div className={`g1-report g1-report-${direction}`}><header><div><h2>大学物理 · 学习报告</h2><span className="g1-support">全部班级　/　第 1—6 周</span></div><a href={direction === "a" ? "#learning-report" : "#bm-d"}>{direction === "a" ? "查看报告 A 精细版" : "打开现有完整交互"}</a></header>
      {direction === "b" && observations}{metrics}
      <section className="g1-report-trend bm-d"><h3>每周平均分</h3><TrendChart rows={reportData} metric="average" firstWeek={1} selectedWeek={6}/></section>
      {direction === "a" && observations}
      <section className="g1-comparison"><h3>两班对照</h3><table><thead><tr><th>班级</th><th>平均分</th><th>提交率</th></tr></thead><tbody>{["一班", "二班"].map(group => { const t = summarize(reportData.filter(r => r.group === group)); return <tr key={group}><th>{group}</th><td>{t.average?.toFixed(1) ?? "—"} 分</td><td>{t.completion?.toFixed(1) ?? "—"}%</td></tr>; })}</tbody></table></section>
      <footer className="g1-support">平均分按已交作业份数加权；提交率 = 已交 / 应交。零分母及缺测显示无值。数据为既有虚构教学汇总。</footer>
    </div><p className="g1-support">{direction === "a" ? "A：先看量化变化，再查看解释，适合反复查看趋势与班级差异。" : "B：先读本期结论，再看证据，适合阶段汇报；持续比较时需更多上下移动。"}</p></>;
}

export function TokenFirstG1Page({ view = "samples" }: { view?: "samples" | "workbench" | "report" | "extensions" }) {
  const [dark, setDark] = useState(false);
  const [foldVariant, setFoldVariant] = useState<FoldVariant>("line");
  return <main className="g1" data-rain-theme={dark ? "dark" : "light"} data-rain-id="prototype-token-first-g1" data-asset-identity="local-experiment" data-density="default">
    <header className="g1-heading"><div><p className="g1-eyebrow">雨课堂 · 组合预览</p><h1>{view === "extensions" ? "提示与分区调节" : view === "samples" ? "常规尺寸与真实组合" : view === "workbench" ? "批改工作台 · 布局对照" : "学习报告 · 布局对照"}</h1></div><Button variant="secondary" onClick={() => setDark(!dark)}>{dark ? "切换浅色" : "切换深色"}</Button></header>
    <nav className="g1-nav" aria-label="本批预览"><a aria-current={view === "samples" ? "page" : undefined} href="#token-first-g1">组合样板</a><a aria-current={view === "workbench" ? "page" : undefined} href="#token-first-workbench">批改工作台</a><a aria-current={view === "report" ? "page" : undefined} href="#token-first-report">学习报告</a><a aria-current={view === "extensions" ? "page" : undefined} href="#token-first-g1-next">提示与分区</a></nav>
    <div className="g1-content">{view === "samples" ? <>
      <section className="g1-section"><h2>查找与筛选</h2><p className="g1-support">条件作用于各自的作答集合；中间一组调整承载背景，前后两组保留默认。</p>{(["default", "local", "sibling"] as const).map(kind => <ToolbarSample key={kind} kind={kind}/>)}</section>
      <section className="g1-section"><h2>作答卡片与批改说明</h2><p className="g1-support">展开作答、查阅评分细则，或标记需要复核的内容。</p><RadioGroup legend="折叠样式" orientation="horizontal" value={foldVariant} onValueChange={value => { if (["line", "contained", "tinted", "quiet"].includes(value)) setFoldVariant(value as FoldVariant); }} options={[{ value: "line", label: "A · 分割线式" }, { value: "contained", label: "B · 整体描边式" }, { value: "tinted", label: "C · 超浅底色式" }, { value: "quiet", label: "D · 静默式" }]} /><div className="g1-cards">{(["default", "local", "sibling"] as const).map(kind => <AnswerCard key={kind} kind={kind} foldVariant={foldVariant} changeTheme={() => setDark(!dark)}/>)}</div></section>
      <section className="g1-notices" aria-label="提示与不可用状态"><Alert tone="warning"><AlertTitle>存在未作答内容</AlertTitle><AlertDescription>核对是否缺交，再决定如何处理。</AlertDescription></Alert><Alert tone="error" role="alert"><AlertTitle>提交失败示例</AlertTitle><AlertDescription>当前分数仍保留，请重新提交。</AlertDescription></Alert><label className="g1-switch-label"><Switch disabled />暂不可编辑的设置</label></section>
    </> : view === "extensions" ? <G1NextSamples changeTheme={() => setDark(!dark)} /> : view === "workbench" ? <WorkbenchDirections/> : <ReportDirections/>}</div>
    <footer className="g1-footer">虚构数据 · 本地设计预览 · 本批默认方向待确认</footer>
  </main>;
}
