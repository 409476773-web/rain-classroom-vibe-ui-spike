import { useState } from "react";
import { Button, Input, Link, Select, Tabs, defineRainLocalRecipe, type TabsItem, type TabsSize, type TabsAppearance } from "@rain-next/ui";
import { FolderIcon } from "@rain-next/ui/icons/folder";
import { GroupIcon } from "@rain-next/ui/icons/group";
import { SearchIcon } from "@rain-next/ui/icons/search";
import "./tabs-page.css";

type Item = { value: string; label: string; disabled?: boolean; reason?: string; count?: number };
const defaultItems: readonly Item[] = [
  { value: "overview", label: "概览" },
  { value: "archived", label: "已归档的历史课程和完整资料", disabled: true, reason: "课程已归档" },
  { value: "students", label: "学生", count: 0 },
  { value: "records", label: "完整课堂记录与课后练习资料" },
  { value: "resources", label: "资源" },
  { value: "discussion", label: "讨论" },
];

function PublicOverflowDemo() {
  const [width, setWidth] = useState(320), [source, setSource] = useState(defaultItems), [removeOnEnd, setRemoveOnEnd] = useState(false);
  const items: TabsItem[] = source.map(item => ({ ...item, disabledReason: item.reason, leadingIcon: <SearchIcon />, content: <Input aria-label={`${item.label}草稿`} /> }));
  return <section data-public-tabs="overflow" onKeyDownCapture={event => { if (removeOnEnd && event.key === "End") setSource(current => current.filter(item => item.value !== "discussion")); }}><h2>公共组件连续区间</h2>
    <Button variant="secondary" onClick={() => setWidth(550)}>加宽导航</Button>
    <Button variant="secondary" onClick={() => setWidth(320)}>收窄导航</Button>
    <Button variant="secondary" onClick={() => setWidth(80)}>极窄导航</Button>
    <Button variant="secondary" onClick={() => setSource(defaultItems.slice(0, 1))}>仅保留概览</Button>
    <Button variant="secondary" onClick={() => setSource(defaultItems.slice(0, 3))}>保留前三分区</Button>
    <Button variant="secondary" onClick={() => setSource(defaultItems)}>恢复全部分区</Button>
    <Button variant="secondary" onClick={() => setRemoveOnEnd(true)}>动态删除末项</Button>
    <div data-public-width style={{ width, maxWidth: "100%" }}><Tabs aria-label="课程分区" items={items} size={32} /></div>
  </section>;
}

function PublicCaseDemo({ name, position = "top", appearance = "line", size = 32, more = false, automatic = false, controlled = false, initialValue = "overview", itemSource = defaultItems, matrix = false, refinement = false }: {
  name: string; position?: "top" | "bottom" | "start" | "end"; appearance?: "line" | "contained" | "soft"; size?: 28 | 32 | 38;
  more?: boolean; automatic?: boolean; controlled?: boolean; initialValue?: string; itemSource?: readonly Item[]; matrix?: boolean; refinement?: boolean;
}) {
  const [value, setValue] = useState<string | number | null>(initialValue), [pending, setPending] = useState<string | number | null>(null);
  const [matrixDisabled, setMatrixDisabled] = useState(false);
  const items: TabsItem[] = itemSource.map((item, index) => ({ ...item, label: refinement && item.value === "records" ? "完整课堂记录与课后练习资料和拓展阅读的使用说明" : item.label, disabled: item.disabled || (matrixDisabled && item.value === "students"), disabledReason: item.reason, leadingIcon: refinement && index % 2 === 0 ? undefined : <SearchIcon />, count: refinement && item.value === "records" ? 128 : item.count, content: <><p>{item.label}内容</p><Input aria-label={`${item.label}草稿`} /></> }));
  const paint = appearance === "line" ? { appearance: "line" as const } : { appearance };
  const direction = position === "start" || position === "end" ? { position, overflow: "scroll" as const, ...(refinement ? { labelLines: 2 as const } : {}) } : { position, overflow: more ? "more" as const : "scroll" as const };
  return <section data-public-case={name} data-tabs-matrix={matrix || undefined} data-tabs-layout={refinement || undefined} className="mb-rain-24">
    <h2>{name}</h2><Button variant="secondary">列表前操作</Button>
    {matrix && <Button data-matrix-toggle aria-pressed={matrixDisabled} variant="secondary" onClick={() => setMatrixDisabled(!matrixDisabled)}>切换学生禁用状态</Button>}
    <div style={{ width: more ? 430 : undefined, maxWidth: "100%" }}><Tabs aria-label={`${name}课程分区`} items={items} value={value} onValueChange={next => controlled ? setPending(next) : setValue(next)}
      {...paint} size={size} widthMode={refinement ? "equal" : "natural"} activationMode={automatic ? "automatic" : "manual"} {...direction} /></div>
    {controlled && <Button variant="secondary" onClick={() => setValue(pending)}>接受待处理选择</Button>}
    <Button variant="secondary">列表后操作</Button>
  </section>;
}
function PublicDynamicDemo({ more = false }: { more?: boolean }) {
  const [mode, setMode] = useState("enabled");
  return <div data-public-dynamic={more ? "more" : "true"}>
    <Button variant="secondary" onClick={() => setMode("selected-disabled")}>禁用当前分区</Button>
    <Button variant="secondary" onClick={() => setMode("resources-disabled")}>禁用资源分区</Button>
    <Button variant="secondary" onClick={() => setMode("all-disabled")}>禁用全部分区</Button>
    <Button variant="secondary" onClick={() => setMode("enabled")}>恢复可用分区</Button>
    <PublicCaseDemo name={more ? "dynamic-more" : "dynamic-disabled"} more={more} itemSource={defaultItems.map(item => ({ ...item, disabled: mode === "all-disabled" || item.disabled || (mode === "selected-disabled" && item.value === "overview") || (mode === "resources-disabled" && item.value === "resources") }))} />
  </div>;
}
function RuntimeEdges() {
  const [hidden, setHidden] = useState(false), [updated, setUpdated] = useState(false);
  const items: TabsItem[] = defaultItems.map(item => ({ ...item, label: updated && item.value === 'records' ? '更新后的完整课堂记录与课后练习和拓展阅读资料' : item.label,
    count: updated && item.value === 'records' ? 123456789 : item.count, disabledReason: item.reason, leadingIcon: <SearchIcon />,
    content: <Input aria-label="动态草稿" /> }));
  const inner = <Tabs aria-label="内层分区" size={28} appearance="contained" items={[{ value: 'one', label: '内层一', content: <Input aria-label="内层草稿" /> }, { value: 'two', label: '内层二', content: <p>内层内容二</p> }]} />;
  const extras = [{ value: 'one', label: '概览', leadingIcon: <SearchIcon />, count: 0, content: <p>组合内容</p> }, { value: 'two', label: '设置', content: <p>设置内容</p> }, { value: 'three', label: '课', count: 123456789012, content: <p>简短名称与数量</p> }];
  return <>
    <section data-tabs-edge="hidden"><h2>隐藏期间的内容更新</h2>
      <Button variant="secondary" onClick={() => setHidden(!hidden)}>{hidden ? '显示示例' : '隐藏示例'}</Button>
      <Button variant="secondary" onClick={() => setUpdated(true)}>更新名称与数量</Button>
      <div hidden={hidden} style={{ width: 320, maxWidth: '100%' }}><Tabs aria-label="动态内容" size={32} items={items} defaultValue="records" /></div>
    </section>
    <section data-tabs-edge="nested"><h2>独立的嵌套分区</h2><Tabs aria-label="外层分区" position="start" size={38} items={[{ value: 'one', label: '外层一', content: inner }, { value: 'two', label: '外层二', content: <p>外层内容二</p> }]} /></section>
    {(['top', 'bottom'] as const).map(position => <section key={position} data-tabs-extra={position}><h2>独立操作与内容指示线</h2>
      <Tabs aria-label={`${position}附加操作`} size={32} position={position} align="center" indicatorSize="content" showDivider items={extras}
        extraStart={<Button variant="secondary" size="large">前置操作</Button>} extraEnd={<Button variant="secondary" size="large">后置操作</Button>} />
    </section>)}
    {(['left', 'center', 'right'] as const).map(itemAlign => <section key={itemAlign} data-tabs-item-align={itemAlign}><Tabs aria-label={`${itemAlign}纵向对齐`} position="end" itemAlign={itemAlign} collapseBelow={560} widthMode="equal" size={32} items={extras} /></section>)}
  </>;
}

function PublicCases() {
  const [showRefinements, setShowRefinements] = useState(false);
  return <><PublicOverflowDemo /><RuntimeEdges />
    <PublicCaseDemo name="initial-disabled" initialValue="archived" /><PublicDynamicDemo /><PublicDynamicDemo more />
    <PublicCaseDemo name="manual" /><PublicCaseDemo name="automatic" automatic /><PublicCaseDemo name="vertical" position="start" />
    <PublicCaseDemo name="more" more /><PublicCaseDemo name="controlled" more controlled />
    {(["top", "bottom", "start", "end"] as const).map(position => <PublicCaseDemo key={position} name={`focus-${position}`} position={position} appearance="soft" />)}
    {([28, 32, 38] as const).map(size => <PublicCaseDemo key={size} name={`geometry-${size}`} size={size} appearance="contained" />)}
    {(["line", "contained", "soft"] as const).flatMap(appearance => ([28, 32, 38] as const).flatMap(size => (["top", "bottom", "start", "end"] as const).map(position =>
      <PublicCaseDemo key={`${appearance}:${size}:${position}`} name={`${appearance}-${size}-${position}`} matrix appearance={appearance} size={size} position={position} />)))}
    <details data-tabs-refinement onToggle={event => setShowRefinements(event.currentTarget.open)}><summary data-focus="item">布局与换向检查</summary>
      {showRefinements && <><ResponsiveDemo /><ResponsiveDemo controlled /><AutomaticResizeDemo /><AutomaticResizeDemo disabled />
        {(["line", "contained", "soft"] as const).flatMap(appearance => ([28, 32, 38] as const).flatMap(size => (["top", "bottom", "start", "end"] as const).map(position =>
          <PublicCaseDemo key={`layout:${appearance}:${size}:${position}`} name={`layout-${appearance}-${size}-${position}`} refinement appearance={appearance} size={size} position={position} />)))}</>}
    </details>
  </>;
}


const appearanceNames = { line: "线条", contained: "底板", soft: "浅底" };
function PanelEditor({ label }: { label: string }) {
  const [saved, setSaved] = useState(false);
  return <div className="tabs-page__stack"><p>{label}的模拟课程内容。切换分区后，已输入的草稿会留在本页。</p><Input aria-label={`${label}备注`} placeholder="填写一条备注" />
    <div><Button variant="secondary" onClick={() => setSaved(true)}>保存备注</Button><span role="status">{saved ? " 已在本页保存" : ""}</span></div></div>;
}
const courseItems: readonly TabsItem[] = [
  { value: "overview", label: "课程概览", content: <PanelEditor label="课程概览" /> },
  { value: "tasks", label: "待评作业", count: 0, content: <PanelEditor label="待评作业" /> },
  { value: "resources", label: "课程资料", leadingIcon: <FolderIcon />, content: <PanelEditor label="课程资料" /> },
  { value: "students", label: "学生", leadingIcon: <GroupIcon />, count: 128, content: <PanelEditor label="学生" /> },
];
function RecipePreview() {
  const [appearance, setAppearance] = useState<TabsAppearance>("line"), [size, setSize] = useState<TabsSize>(38);
  const [position, setPosition] = useState<"top" | "bottom" | "start" | "end">("top");
  const [labelLines, setLabelLines] = useState<1 | 2>(1), [widthMode, setWidthMode] = useState<"natural" | "equal">("natural");
  const [indicatorSize, setIndicatorSize] = useState<"content" | "stretch">("content");
  const paint = appearance === "line" ? { appearance: "line" as const, indicatorSize } : { appearance };
  const direction = position === "start" || position === "end" ? { position, labelLines, collapseBelow: 560 } : { position };
  return <section className="tabs-page__surface tabs-page__stack" aria-labelledby="tabs-recipes"><h2 id="tabs-recipes">选择一套完整外观</h2>
    <div className="tabs-page__row">
      <Select aria-label="示例外观" clearable={false} options={Object.entries(appearanceNames).map(([value, label]) => ({ value, label }))} value={appearance} onValueChange={value => { if (value) setAppearance(value as TabsAppearance); }} />
      <Select aria-label="示例尺寸" clearable={false} options={[{ value: 28, label: "小号 · 28" }, { value: 32, label: "紧凑 · 32" }, { value: 38, label: "常规 · 38" }]} value={size} onValueChange={value => { if (value) setSize(value as TabsSize); }} />
      <Select aria-label="示例位置" clearable={false} options={[{ value: "top", label: "顶部" }, { value: "bottom", label: "底部" }, { value: "start", label: "左侧" }, { value: "end", label: "右侧" }]} value={position} onValueChange={value => { if (value) setPosition(value as typeof position); }} />
      {appearance === "line" && <Select aria-label="蓝线长度" clearable={false} options={[{ value: "content", label: "限制最大长度（默认）" }, { value: "stretch", label: "自适应长度" }]} value={indicatorSize} onValueChange={value => { if (value) setIndicatorSize(value as typeof indicatorSize); }} />}
      {position === "start" || position === "end" ? <Select aria-label="名称行数" clearable={false} options={[{ value: 1, label: "单行" }, { value: 2, label: "统一双行高度" }]} value={labelLines} onValueChange={value => { if (value) setLabelLines(value as 1 | 2); }} /> :
        <Select aria-label="横向宽度" clearable={false} options={[{ value: "natural", label: "按内容宽度" }, { value: "equal", label: "等分可用宽度" }]} value={widthMode} onValueChange={value => { if (value) setWidthMode(value as typeof widthMode); }} />}
    </div>
    <Tabs aria-label="外观示例" items={courseItems} {...paint} size={size} widthMode={widthMode} {...direction} />
  </section>;
}
const settingsRecipe = defineRainLocalRecipe({ id: "tabs-settings-scroll", scope: "feature", origin: "ui-tabs", classes: { nav: "tabs-page__settings-nav" }, modifiedParts: ["nav"], candidateTokens: [], promotionStatus: "not-proposed" } as const);
const settings = ["基本信息", "学生与教学班", "课程资源与在线教学设置", "通知偏好", "评分方式", "课堂互动", "归档设置", "课程权限"];
function ResponsiveDemo({ controlled = false }: { controlled?: boolean }) {
  const [width, setWidth] = useState(640), [position, setPosition] = useState<"start" | "end">("start"), [count, setCount] = useState(128);
  const [value, setValue] = useState<string | number | null>("overview"), [pending, setPending] = useState<string | number | null>(null);
  const items = courseItems.map(item => ({ ...item, count: item.value === "students" ? count : item.count }));
  return <section data-tabs-responsive={controlled ? "controlled" : "immediate"}>
    <h2>{controlled ? "宿主确认后的换向" : "按可用空间换向"}</h2>
    <Button variant="secondary" onClick={() => setWidth(640)}>展开空间</Button><Button variant="secondary" onClick={() => setWidth(320)}>收窄空间</Button>
    <Button variant="secondary" onClick={() => setPosition(position === "start" ? "end" : "start")}>切换左右侧</Button>
    <Button variant="secondary" onClick={() => setCount(Number.MAX_SAFE_INTEGER)}>更新长数量</Button>
    <Button variant="secondary" onClick={() => setValue(pending)}>接受待处理选择</Button>
    <div data-responsive-width style={{ width, maxWidth: "100%" }}><Tabs aria-label="响应式课程" appearance="contained" position={position} labelLines={2} collapseBelow={560} widthMode="equal"
      items={items} value={value} onValueChange={next => controlled ? setPending(next) : setValue(next)} /></div>
    <Input aria-label="分区外的备注" />
  </section>;
}
function AutomaticResizeDemo({ disabled = false }: { disabled?: boolean }) {
  const [changes, setChanges] = useState(0), [width, setWidth] = useState(320);
  const selection = disabled ? { value: "students" } : { defaultValue: null };
  return <section data-tabs-automatic-resize={disabled ? "disabled" : "empty"} data-change-count={changes}>
    <h2>自动激活与{disabled ? "禁用回显" : "未选择状态"}</h2>
    <Button variant="secondary" onClick={() => setWidth(width === 320 ? 640 : 320)}>切换可用空间</Button>
    <div data-responsive-width style={{ width, maxWidth: "100%" }}><Tabs aria-label="自动激活换向" position="start" labelLines={2} collapseBelow={560} widthMode="equal" activationMode="automatic"
      {...selection} onValueChange={() => setChanges(count => count + 1)} items={courseItems.map(item => ({ ...item, disabled: disabled && item.value === "students" }))} /></div>
  </section>;
}

export function TabsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [exported, setExported] = useState(false);
  return <main className="tabs-page rain-type-ui-default" data-rain-id="tabs-page" data-rain-theme={theme}>
    <div className="tabs-page__content">
      <header className="tabs-page__stack"><Link href="#components">返回组件总览</Link><h1 id="tabs-title" tabIndex={-1}>Tabs 分区切换</h1>
        <p>在同一页面里切换内容。默认使用完整导航与面板，首次打开后保留本页草稿。</p>
        <div className="tabs-page__row"><Button variant={theme === "light" ? "primary" : "secondary"} onClick={() => setTheme("light")}>浅色主题</Button><Button variant={theme === "dark" ? "primary" : "secondary"} onClick={() => setTheme("dark")}>深色主题</Button></div>
      </header>
      <section className="tabs-page__surface tabs-page__stack" aria-labelledby="tabs-course-title"><h2 id="tabs-course-title">课程分区</h2><p>数量 0 会保留；没有数量时不占位。导出是独立操作，窄屏下移到单独一行。</p>
        <div className="tabs-page__course-actions"><Button variant="secondary" onClick={() => setExported(true)}>导出课程摘要</Button><span role="status">{exported ? "已生成本页模拟摘要" : ""}</span></div>
        <Tabs aria-label="课程内容" items={courseItems} showDivider extraEnd={<Button variant="secondary" size="small" onClick={() => setExported(true)}>导出</Button>} />
      </section>
      <RecipePreview />
      <div className="tabs-page__two">
        {(["contained", "soft"] as const).map(appearance => <section key={appearance} className="tabs-page__surface tabs-page__stack"><h2>{appearanceNames[appearance]}局部分区</h2><Tabs aria-label={`${appearanceNames[appearance]}编辑`} appearance={appearance} size={32} items={courseItems.slice(0, 2)} /></section>)}
      </div>
      <section className="tabs-page__surface tabs-page__stack"><h2>纵向设置与长名称</h2><p>同组采用双行高度、名称左对齐；空间不足时移到顶部。名称或数量省略时，悬停或键盘聚焦可查看全文。</p>
        <Tabs aria-label="课程设置" position="start" labelLines={2} collapseBelow={560} localRecipe={settingsRecipe} items={settings.map((label, index) => ({ value: index, label, leadingIcon: index === 1 ? <GroupIcon /> : index === 2 ? <FolderIcon /> : undefined, count: index === 1 ? 128 : undefined, content: <PanelEditor label={label} /> }))} />
      </section>
      <section className="tabs-page__surface tabs-page__stack"><h2>使用合同</h2>
        <p>用于内容分区。独立页面导航使用链接；新建、关闭、拖动工作区标签暂不提供。默认手动键盘模式：方向键移动焦点，Enter 或 Space 切换内容；点击直接切换。automatic 可用于即时、轻量内容。</p>
        <table><thead><tr><th>选项</th><th>默认与范围</th></tr></thead><tbody>
          <tr><td>items / value</td><td>唯一的 string 或 number 身份；1 与字符串“1”不同。null 表示不选中。受控模式只响应宿主接受的值。</td></tr>
          <tr><td>appearance / size</td><td>line / contained / soft；28 / 32 / 38。未指定尺寸时，compact 使用 32，default 使用 38。</td></tr>
          <tr><td>position / overflow</td><td>top 默认，另有 bottom / start / end。横向默认 More，scroll 可选；纵向为 scroll。</td></tr>
          <tr><td>align / itemAlign</td><td>横向 start 或 center；纵向项内 left / center / right，默认 center。</td></tr>
          <tr><td>labelLines / widthMode</td><td>纵向默认单行，可选整组双行并左对齐，高度 46 / 52 / 60。横向默认 natural；equal 等分可用宽度，空间不足时沿用 More 或滚动。</td></tr>
          <tr><td>collapseBelow</td><td>纵向场景显式指定可用宽度阈值，低于阈值转为顶部横向；本页示例使用 560px，选择与草稿继续保留。</td></tr>
          <tr><td>indicatorSize / showDivider</td><td>Line 独有，默认 content：蓝线在内容范围内居中，最大长度随 28／32／38 尺寸设为 24／28／32px。stretch 保留自适应方式；等分排列时随项宽伸展。纵向限长居中；分隔线默认关闭。</td></tr>
          <tr><td>panelMount</td><td>lazy-retain 默认；eager-retain 提前挂载；unmount 离开销毁。项目可单独覆盖。</td></tr>
          <tr><td>count</td><td>0 与数字字符串显示括号；null、undefined、空字符串隐藏。自定义缩写需要 countAccessibleLabel。</td></tr>
          <tr><td>disabled / disabledReason</td><td>禁用项跳过键盘；完整名称和可选原因可从“分区说明”读取。受控回显可保留已选禁用项。</td></tr>
        </tbody></table>
        <p>默认直接使用完整 Tabs。明确需要改变布局时，使用同一个 Tabs.Root 下的一组 Tabs.Nav 与 Tabs.Panels；这三个部分同步出现，Suspense 放在 item.content 内。Root 内外与嵌套实例各自独立。</p>
        <pre><code>{`<Tabs aria-label="课程内容" items={items} />

<Tabs aria-label="自适应蓝线" items={items} indicatorSize="stretch" />

<Tabs.Root aria-label="课程内容" items={items}>
  <Tabs.Nav extraEnd={<Button>导出</Button>} />
  <Tabs.Panels />
</Tabs.Root>`}</code></pre>
        <p>Parts：root、nav、list、tab、icon、label、count、indicator、extra-start、extra-end、more、panel。先选 Existing Variant，再为明确差异声明 Local Recipe；结构变化使用 Local Fork。各 Part 保留 data-slot 与追踪属性。</p>
        <p>浅底外观取消选中态的常驻描边，以填充、文字颜色和字重表示当前项；键盘焦点框独立保留。普通 Label/Count 仍仅在已登记的 Background/Neutral/1 底面上获得限定用途裁决，不构成通用对比度豁免。</p>
        <p>保留 DOM 不等于持久化、缓存数据或暂停媒体。离开页面、删除身份或主动销毁会失去本页状态；网络请求、媒体和隐藏时副作用由内容宿主处理。</p>
        <p>当前为工作区 registry-candidate，managed 修改级别；运行视觉 Human Gate、真实屏幕阅读器、跨浏览器检查与发布仍分别记录。来源：Rain Classic Tabs、shadcn/ui、Ant Design、Material UI；行为采用当前 Base UI 1.8.0，视觉来自 Rain Token。</p>
      </section>
      <details className="tabs-page__surface" data-tabs-verification><summary data-focus="item">交互与状态检查</summary><p>以下为模拟数据和完整配方检查区。</p><PublicCases /></details>
    </div>
  </main>;
}
