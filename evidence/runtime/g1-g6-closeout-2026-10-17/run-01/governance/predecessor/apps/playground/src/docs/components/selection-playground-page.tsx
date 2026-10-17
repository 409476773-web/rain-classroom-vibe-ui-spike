import { useRef, useState, type CSSProperties } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, CheckboxGroup, CheckboxObjectCard, FormItem, Input, Link, RadioCardWithPreview, RadioComparisonCard, RadioGroup, RadioPreviewCard } from "@rain-next/ui";
import { DependentFields, IndependentPreview, PageSelection } from "../../patterns/selection-patterns";
import checkboxRegistry from "../../../../../registry/checkbox.json";
import radioRegistry from "../../../../../registry/radio.json";
import cardRegistry from "../../../../../registry/selection-cards.json";
import patternRegistry from "../../../../../registry/selection-patterns.json";
import listArtwork from "./assets/selection-cards/list-workbench.png";
import reportArtwork from "./assets/selection-cards/report-layout.png";
import "./selection-cards-page.css";
import "./selection-playground-page.css";

const categories = ["基础控件", "选择项", "选择卡片", "组合模式"] as const;
const catalogs = [
  { label: "基础控件 / 多选 / 选择项", path: "registry/checkbox.json", registry: checkboxRegistry },
  { label: "基础控件 / 单选 / 选择项", path: "registry/radio.json", registry: radioRegistry },
  { label: "选择卡片 / 完整配方", path: "registry/selection-cards.json", registry: cardRegistry },
  { label: "组合模式 / 预览 / 关联字段 / 全选", path: "registry/selection-patterns.json", registry: patternRegistry },
];

export function SelectionPlaygroundPage() {
  const [category, setCategory] = useState<typeof categories[number]>("基础控件");
  const [title, setTitle] = useState("课程项目方案"), [description, setDescription] = useState("关注过程投入与最终成果，适合长周期课程项目。");
  const [theme, setTheme] = useState<"light" | "dark">("light"), [density, setDensity] = useState<Density>("default");
  const [state, setState] = useState("可选"), [width, setWidth] = useState(564);
  const [checked, setChecked] = useState<string[]>(["first"]), [radio, setRadio] = useState<string | null>("first");
  const [target, setTarget] = useState<string | null>(null), [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null), [query, setQuery] = useState("");
  const trigger = useRef<HTMLButtonElement>(null), heading = useRef<HTMLHeadingElement>(null);
  const label = title.trim() || "未命名选项";
  const disabled = state === "禁用", active = category === "组合模式" && radio === "first" && !disabled;
  const options = [
    { value: "first", label, description: category === "基础控件" ? undefined : description.trim() || undefined, disabled },
    { value: "second", label: "另一个选项", description: category === "基础控件" ? undefined : "用于比较选择、预览与关联设置的独立状态。", disabled },
  ];
  const groupProps = { options, invalid: state === "错误提示", message: state === "错误提示" ? "这是错误提示的演示，请检查当前选择。" : undefined, className: "selection-patterns-page__stack" };
  const open = (value: string, button: HTMLButtonElement) => { trigger.current = button; setTarget(value); };
  const entries = catalogs.flatMap(({ label: kind, path, registry }) => registry.items.map((item) => ({
    ...item, kind, registryPath: path, gate: registry.humanGateScope,
    source: "sourcePath" in item ? String(item.sourcePath) : item.files.at(-1)!,
    shared: registry.shared,
  }))).filter((item) => `${item.name} ${item.exportName} ${item.kind} ${item.source}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));

  return <DensityProvider density={density}>
    <main className="core-ui-shell selection-cards-page selection-playground" data-rain-id="selection-playground-page" data-asset-identity="local-experiment" data-maturity="prototype-ready" data-rain-theme={theme}>
      <header className="flex flex-col gap-rain-12">
        <Link href="#components">返回组件</Link>
        <h1 ref={heading} id="selection-playground-title" tabIndex={-1} className="m-rain-0 rain-type-page-title">选择 Playground</h1>
        <p className="m-rain-0 rain-type-reading">从简单勾选到完整方案选择。修改演示内容，观察选择、预览和提交如何配合。</p>
        <div className="flex flex-wrap gap-rain-8" aria-label="外观设置">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
          <Button variant="text" aria-pressed={density === "compact"} onClick={() => setDensity(density === "default" ? "compact" : "default")}>紧凑密度</Button>
        </div>
        <div className="flex flex-wrap gap-rain-8" role="group" aria-label="选择能力分类">
          {categories.map((name) => <Button key={name} variant={category === name ? "primary" : "secondary"} aria-pressed={category === name} aria-controls="selection-workbench" onClick={() => setCategory(name)}>{name}</Button>)}
        </div>
      </header>

      <div className="selection-playground__workspace">
        <section className="core-family" aria-labelledby="selection-editor-title">
          <h2 id="selection-editor-title">编辑演示内容</h2>
          <div className="flex flex-col gap-rain-16 mt-rain-16">
            <FormItem label="第一项标题" help="留空时使用“未命名选项”；替换文案不会改变选项身份。"><Input value={title} onValueChange={setTitle} /></FormItem>
            <FormItem label="第一项说明" help="基础控件只显示标题，其他类别可使用说明。"><Input value={description} onValueChange={setDescription} /></FormItem>
            <RadioGroup legend="演示状态" name="editor-state" value={state} onValueChange={setState} orientation="horizontal" options={["可选", "禁用", "错误提示"].map((value) => ({ value, label: value }))} />
            <div><p className="m-rain-0 mb-rain-8">容器宽度</p><div className="flex flex-wrap gap-rain-8" aria-label="容器宽度">
              {[296, 320, 564, 612].map((size) => <Button key={size} size="mini" variant={width === size ? "primary" : "secondary"} aria-pressed={width === size} onClick={() => setWidth(size)}>{size}px</Button>)}
            </div><p className="selection-cards-page__note">空间不足时自动收窄。此设置只改变预览容器。</p></div>
            <div className="flex flex-wrap gap-rain-8"><Button variant="secondary" onClick={() => { setChecked([]); setRadio(null); }}>清空选择</Button><Button variant="secondary" onClick={() => { setChecked(["first"]); setRadio("first"); }}>选中第一项</Button></div>
          </div>
        </section>
        <section className="core-family" id="selection-workbench" aria-labelledby="selection-workbench-title">
          <h2 id="selection-workbench-title">{category}</h2>
          <p className="selection-cards-page__intro">以下为虚构演示数据；不同外观共享当前选择，预览可独立打开。</p>
          <form aria-label="选择工作台" className="selection-playground__canvas" style={{ width, maxWidth: "100%" } as CSSProperties} onSubmit={(event) => {
            event.preventDefault();
            const native = new FormData(event.currentTarget);
            setSubmitted(JSON.stringify({ category, checkbox: checked, radio, ...(active ? { fields: { note: draft } } : {}), native: Object.fromEntries([...new Set(native.keys())].map((key) => [key, native.getAll(key)])) }, null, 2));
          }}>
            {(category === "基础控件" || category === "选择项") && <>
              <CheckboxGroup {...groupProps} legend="多项选择" name="workbench-checkbox" value={checked} onValueChange={setChecked} />
              <RadioGroup {...groupProps} legend="单项选择" name="workbench-radio" value={radio} onValueChange={setRadio} />
            </>}
            {category === "选择卡片" && <>
              <RadioGroup {...groupProps} legend="图文选择" name="workbench-layout" value={radio} onValueChange={setRadio} renderOption={(props) => <RadioPreviewCard {...props} label={props.label!} imageSrc={props.value === "first" ? listArtwork : reportArtwork} layoutLabel="工作台布局" audienceLabel="教师工作台" />} />
              <RadioGroup {...groupProps} legend="方案比较" name="workbench-comparison" value={radio} onValueChange={setRadio} renderOption={(props) => <RadioComparisonCard {...props} label={props.label!} recommended={props.value === "first"} details={[{ label: "评价方式", value: props.value === "first" ? "按维度评分" : "直接评分" }, { label: "适用场景", value: "课程项目" }]} />} />
            </>}
            {(category === "选择卡片" || category === "组合模式") && <>
              {category === "组合模式" && <PageSelection label="全选当前演示范围" eligibleIds={disabled ? [] : ["first", "second"]} value={checked} onValueChange={setChecked} />}
              <CheckboxGroup {...groupProps} legend="对象多选" name="workbench-objects" value={checked} onValueChange={setChecked} renderOption={(props) => <CheckboxObjectCard {...props} label={props.label!} supportingValue="120 名学生 · 4 个教学班" identityVisual={<span>课</span>} status="进行中" />} />
              <RadioGroup {...groupProps} legend={category === "组合模式" ? "预览与关联设置" : "带独立预览的选择"} name="workbench-preview" value={radio} onValueChange={setRadio} renderOption={(props) => <RadioCardWithPreview {...props} label={props.label!} identityVisual={<span>量</span>} supportingValue="4 个评价维度 · 总分 100 分" onPreview={(event) => open(props.value, event.currentTarget)} />} />
            </>}
            {category === "组合模式" && <DependentFields active={active} legend="第一项关联设置"><FormItem label="关联备注" help="选中第一项时参与提交。切换后保留本次草稿。"><Input name="note" value={draft} onValueChange={setDraft} /></FormItem></DependentFields>}
            <Button type="submit">读取提交数据</Button>
          </form>
        </section>
      </div>

      <section className="core-family" aria-labelledby="selection-state-title">
        <h2 id="selection-state-title">观察交互结果</h2>
        <div className="selection-patterns-page__result" aria-live="polite">
          <p data-testid="workbench-value">当前选择（group value）：多选 {JSON.stringify(checked)}；单选 {JSON.stringify(radio)}</p>
          <p data-testid="workbench-preview">预览对象（preview target）：{target ?? "未打开"}</p>
          <p data-testid="workbench-active">参与提交的关联字段（active）：{active ? "关联备注" : "无"}</p>
        </div>
        <p className="selection-cards-page__note">业务数据保留已选项；原生表单只包含当前呈现、已选且未禁用的控件。下方保留最近一次读取的结果。</p>
        <pre className="selection-playground__payload" data-testid="workbench-payload">{submitted ?? "尚未读取提交数据"}</pre>
      </section>

      <details className="core-family">
        <summary>查找源码与使用边界</summary>
        <section aria-label="源码检索" className="mt-rain-16">
          <p className="selection-cards-page__intro">13 项本地候选均有实际源码，尚未发布。优先使用完整配方；需要调整时，再查阅对应 Manifest 的修改边界。</p>
          <FormItem label="检索选择资产"><Input value={query} onValueChange={setQuery} clearable placeholder="名称、类别或源码路径" /></FormItem>
          <p role="status" className="selection-cards-page__note">找到 {entries.length} 项资产</p>
          {entries.length === 0 && <p>没有符合条件的资产。</p>}
          {entries.map((item) => <article key={item.name} className="selection-playground__entry">
            <h3>{item.exportName}</h3><p>{item.kind} · 本地候选 · 未发布</p>
            <code>{item.source}</code>
            <details><summary>来源、依赖与验收范围</summary>
              <p>Manifest：<code>{item.manifest}</code></p><p>登记表：<code>{item.registryPath}</code></p>
              <p>已确认的范围：<code>{item.gate}</code>。不含对比度豁免或辅助技术全量验证。</p>
              {"pendingRefinement" in item && <p>长标题换行与滚动修复：2026-09-12 已随综合页编辑、分类、预览与关闭的限定范围确认；颜色及剩余人工检查仍未关闭。</p>}
              <p>本地提交版本：无提交记录；按登记表与实际文件追踪。</p>
              <p>配方文件：<code>{item.files.join("；")}</code></p>
              <p>共享文件：<code>{"files" in item.shared ? item.shared.files.join("；") : "见依赖登记表"}</code></p>
              <p>运行依赖：<code>{item.shared.peerDependencies.join("；")}</code></p>
              <p>样式依赖：<code>{item.shared.styleDependencies.join("；")}</code></p>
              <p>关联登记：<code>{item.shared.registryDependencies.join("；") || "无"}</code></p>
            </details>
          </article>)}
        </section>
      </details>
      <footer className="flex flex-wrap gap-rain-16">
        <Link href="#checkbox">多选完整用例</Link><Link href="#radio">单选完整用例</Link><Link href="#selection-cards">卡片完整用例</Link><Link href="#selection-patterns">组合完整用例</Link>
      </footer>
      <IndependentPreview open={target !== null} onClose={() => setTarget(null)} title={options.find((item) => item.value === target)?.label ?? "选项预览"} description="仅查看演示内容，不改变选择或提交。" returnFocusRef={trigger} fallbackFocusRef={heading} theme={theme}>
        <p>{options.find((item) => item.value === target)?.description ?? "该选项没有说明。"}</p>
      </IndependentPreview>
    </main>
  </DensityProvider>;
}
