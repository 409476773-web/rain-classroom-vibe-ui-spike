import { useRef, useState } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, Checkbox, CheckboxGroup, CheckboxObjectCard, FormItem, Input, Link, RadioCard, RadioCardWithPreview, RadioGroup } from "@rain-next/ui";
import { DependentFields, IndependentPreview, PageSelection } from "../../patterns/selection-patterns";
import { SelectionPreviewContent } from "./selection-preview-content";
import "./selection-cards-page.css";

const templates = [
  { value: "lab", label: "实验报告量规", description: "覆盖实验准备、过程记录、结果分析与反思" },
  { value: "project", label: "课程项目量规", description: "适合长周期项目，关注过程投入与最终成果" },
  { value: "restricted", label: "归档模板", description: "当前不能选择，仍可了解原因。", disabled: true },
];
const courses = [
  { value: "physics", label: "大学物理实验", description: "物理学院 · 必修课程", count: "120 名学生 · 4 个教学班", identity: "物" },
  { value: "circuits", label: "电路原理", description: "电子工程学院 · 专业课程", count: "96 名学生 · 3 个教学班", identity: "电" },
  { value: "shared", label: "公共实验安全", description: "管理员固定，保留当前选择。", count: "全体实验课程学生", identity: "实", disabled: true },
  { value: "english", label: "学术英语", description: "外语学院 · 通识课程", count: "80 名学生 · 2 个教学班", identity: "英" },
  { value: "calculus", label: "高等数学", description: "数学学院 · 必修课程", count: "150 名学生 · 5 个教学班", identity: "数" },
  { value: "archive", label: "往期实验课程", description: "课程已归档，不能新增选择。", count: "2025 秋季", identity: "课", disabled: true },
];
const initialCourses = ["physics", "shared", "english"];

function PreviewExample({ theme }: { theme: "light" | "dark" }) {
  const [value, setValue] = useState<string | null>("lab"), [target, setTarget] = useState<string | null>(null);
  const [removed, setRemoved] = useState<string[]>([]), [submitted, setSubmitted] = useState<string | null>(null);
  const trigger = useRef<HTMLButtonElement>(null), heading = useRef<HTMLHeadingElement>(null);
  const preview = templates.find((item) => item.value === target);
  const open = (key: string, button: HTMLButtonElement) => { trigger.current = button; setTarget(key); };
  return <section className="core-family" aria-labelledby="pattern-preview-title">
    <h2 ref={heading} id="pattern-preview-title" tabIndex={-1}>先预览，再选择</h2>
    <p className="selection-cards-page__intro">可查看任意方案，关闭预览后回到原入口。</p>
    <form aria-label="独立预览示例" onSubmit={(event) => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("preview-template"))); }}>
      <RadioGroup legend="评分模板" name="preview-template" value={value} onValueChange={setValue} options={templates.filter((item) => !removed.includes(item.value))} className="selection-patterns-page__stack"
        renderOption={(props) => props.disabled
          ? <RadioCard {...props} label={props.label!} actions={<Button type="button" size="mini" variant="secondary" aria-label={`查看原因：${props.label}`} onClick={(event) => open(props.value, event.currentTarget)}>查看原因</Button>} />
          : <RadioCardWithPreview {...props} label={props.label!} supportingValue={`${props.value === "lab" ? 5 : 4} 个评价维度 · 总分 100 分`} recommended={props.value === "lab"} identityVisual={<span>量</span>}
            onPreview={(event) => open(props.value, event.currentTarget)} />} />
      <div className="selection-patterns-page__result">
        <p data-testid="preview-selection">当前选择：{templates.find((item) => item.value === value)?.label ?? "未选择"}</p>
        <p data-testid="preview-submitted">已读取的选择：{submitted ?? "尚未读取"}</p>
      </div>
      <div className="flex flex-wrap gap-rain-8 mt-rain-12">
        <Button type="submit">读取模板选择</Button>
        <Button type="button" variant="secondary" onClick={() => { setValue("lab"); setRemoved([]); setSubmitted(null); }}>取消选择修改</Button>
      </div>
    </form>
    <IndependentPreview open={target !== null} onClose={() => setTarget(null)} title={preview?.label ?? "模板预览"} description="演示内容，仅供查看；预览不会改变当前选择。" returnFocusRef={trigger} fallbackFocusRef={heading} theme={theme}>
      <SelectionPreviewContent kind={target ?? "lab"} />
      <details className="mt-rain-16"><summary>预览入口变化演示</summary>
        <p className="text-rain-size-13 leading-rain-22">模拟预览过程中列表更新。关闭后，焦点回到此示例的标题。</p>
        <Button type="button" variant="secondary" disabled={target === null || removed.includes(target)} onClick={() => { if (target !== null) setRemoved((items) => [...items, target]); }}>模拟移除预览入口</Button>
      </details>
    </IndependentPreview>
  </section>;
}

function DependentFieldsExample() {
  const [mode, setMode] = useState<string | null>("unlimited"), [draft, setDraft] = useState("3");
  const [error, setError] = useState<string | null>(null), [submitted, setSubmitted] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  return <section className="core-family" aria-labelledby="pattern-fields-title">
    <h2 id="pattern-fields-title">按选项填写关联设置</h2>
    <p className="selection-cards-page__intro">切换选项会保留本次草稿，只校验和提交当前选项的设置。</p>
    <form aria-label="关联字段示例" noValidate onSubmit={(event) => {
      event.preventDefault();
      if (mode === "limited" && (!/^[1-9]\d?$/.test(draft))) {
        setError("请输入 1–99 之间的整数。"); input.current?.focus(); return;
      }
      setError(null); setSubmitted(JSON.stringify(mode === "limited" ? { mode, attempts: Number(draft) } : { mode }));
    }} onReset={(event) => { const native = event.nativeEvent; queueMicrotask(() => { if (!native.defaultPrevented) { setMode("unlimited"); setDraft("3"); setError(null); setSubmitted(null); } }); }}>
      <RadioGroup legend="作答次数" name="attempt-mode" value={mode} onValueChange={(next) => { setMode(next); setError(null); }} className="selection-patterns-page__stack" options={[
        { value: "unlimited", label: "不限次数", description: "学生可在截止前多次作答，以最后一次提交为准。" },
        { value: "limited", label: "限制次数", description: "设置每名学生最多可以提交的次数。" },
      ]} renderOption={(props) => <RadioCard {...props} label={props.label!} actions={props.value === "limited" ? <DependentFields active={mode === "limited"} legend="次数设置">
        <FormItem label="最多作答次数" help="输入 1–99 之间的整数。切换选项后，本次输入会保留。" required status={error ? "error" : "default"} message={error ?? undefined}>
          <Input ref={input} name="attempts" value={draft} onValueChange={(next) => { setDraft(next); setError(null); }} inputMode="numeric" pattern="[1-9][0-9]?" suffixText="次" />
        </FormItem>
      </DependentFields> : undefined} />} />
      <div className="flex flex-wrap gap-rain-8 mt-rain-16"><Button type="submit">读取作答设置</Button><Button type="reset" variant="secondary">恢复默认设置</Button></div>
      <p className="selection-patterns-page__result" role="status" data-testid="dependent-payload">当前提交数据：{submitted ?? "尚未读取"}</p>
    </form>
  </section>;
}

function PageSelectionExample() {
  const [value, setValue] = useState(initialCourses), [query, setQuery] = useState(""), [page, setPage] = useState(0), [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<{ model: string[]; native: FormDataEntryValue[] } | null>(null);
  const filtered = courses.filter((course) => course.label.includes(query.trim()));
  const pages = Math.max(1, Math.ceil(filtered.length / 3));
  const current = filtered.slice(page * 3, page * 3 + 3), eligibleIds = current.filter((item) => !item.disabled).map((item) => item.value);
  return <section className="core-family" aria-labelledby="pattern-page-title">
    <h2 id="pattern-page-title">选择本页课程</h2>
    <p className="selection-cards-page__intro">搜索和翻页保留已有选择。全选只修改本页可选课程。</p>
    <form aria-label="本页选择示例" onSubmit={(event) => { event.preventDefault(); setSubmitted({ model: [...value], native: new FormData(event.currentTarget).getAll("course") }); }}
      onReset={(event) => { const native = event.nativeEvent; queueMicrotask(() => { if (!native.defaultPrevented) { setValue(initialCourses); setQuery(""); setPage(0); setLoading(false); setSubmitted(null); } }); }}>
      <div className="selection-patterns-page__tools">
        <FormItem label="搜索课程"><Input value={query} onValueChange={(next) => { setQuery(next); setPage(0); }} clearable placeholder="按课程名称搜索" /></FormItem>
        <Button type="button" variant="secondary" disabled={page === 0 || loading} onClick={() => setPage((n) => n - 1)}>上一页</Button>
        <Button type="button" variant="secondary" disabled={page + 1 >= pages || loading} onClick={() => setPage((n) => n + 1)}>下一页</Button>
      </div>
      <p className="selection-cards-page__intro" data-testid="page-scope">{query.trim() ? `「${query.trim()}」搜索结果 · ` : "全部课程 · "}第 {page + 1} / {pages} 页 · 本页 {current.length} 门</p>
      <PageSelection label="全选本页可修改课程" eligibleIds={eligibleIds} value={value} onValueChange={setValue} loading={loading} />
      <div className="mt-rain-16">
        {loading ? <p role="status">正在读取课程…</p> : current.length ? <CheckboxGroup legend="本页课程" legendHidden name="course" value={value} onValueChange={setValue} className="selection-patterns-page__stack" options={current.map(({ value, label, description, disabled }) => ({ value, label, description, disabled }))}
          renderOption={(props) => { const item = current.find((course) => course.value === props.value)!; return <CheckboxObjectCard {...props} label={props.label!} supportingValue={item.count} identityVisual={<span>{item.identity}</span>} status={props.disabled ? "锁定" : undefined} />; }} />
          : <p role="status">没有符合条件的课程。</p>}
      </div>
      <div className="selection-patterns-page__result" aria-live="polite">
        <p data-testid="page-selected">累计选择 {value.length} 门：{courses.filter((course) => value.includes(course.value)).map((course) => course.label).join("、") || "暂无"}</p>
      </div>
      <div className="flex flex-wrap gap-rain-8 mt-rain-12"><Button type="submit" disabled={loading}>读取课程选择</Button><Button type="reset" variant="secondary">恢复初始课程</Button></div>
      <details className="mt-rain-16"><summary>查看提交数据与范围说明</summary>
        <p className="selection-cards-page__note">业务提交保留所有已选课程；原生表单仅包含本页已选且未禁用的课程。</p>
        <p className="selection-patterns-page__result" data-testid="page-payload">业务提交：{submitted ? JSON.stringify(submitted.model) : "尚未读取"}</p>
        <p className="selection-patterns-page__result" data-testid="page-native">原生表单：{submitted ? JSON.stringify(submitted.native) : "尚未读取"}</p>
        <Checkbox label="模拟加载中" checked={loading} onCheckedChange={setLoading} />
      </details>
    </form>
  </section>;
}

export function SelectionPatternsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light"), [density, setDensity] = useState<Density>("default");
  return <DensityProvider density={density}>
    <main data-rain-id="selection-patterns-page" data-asset-identity="local-experiment" data-maturity="prototype-ready" data-rain-theme={theme} className="core-ui-shell selection-cards-page selection-patterns-page">
      <header className="flex flex-col gap-rain-12">
        <Link href="#selection-cards">返回选择卡片</Link>
        <h1 id="selection-patterns-title" tabIndex={-1} className="m-rain-0 rain-type-page-title">选择组合</h1>
        <p className="m-rain-0 rain-type-reading">预览、关联设置与本页全选。以下内容均为演示数据。</p>
        <div className="flex flex-wrap gap-rain-8" aria-label="预览设置">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
          <Button variant="text" aria-pressed={density === "compact"} onClick={() => setDensity(density === "default" ? "compact" : "default")}>紧凑密度</Button>
        </div>
      </header>
      <div className="selection-patterns-page__grid"><PreviewExample theme={theme} /><DependentFieldsExample /></div>
      <PageSelectionExample />
    </main>
  </DensityProvider>;
}
