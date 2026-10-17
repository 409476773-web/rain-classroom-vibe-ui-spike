import { useState } from "react";
import { Button, Checkbox } from "@rain-next/ui";
import { DensityProvider } from "@rain-next/foundations";
import { WarningColorIcon } from "@rain-next/ui/icons/warning-color";
import { CardViewIcon } from "@rain-next/ui/icons/card-view";
import { CalendarSimpleIcon } from "@rain-next/ui/icons/calendar-simple";
import { CheckColorIcon } from "@rain-next/ui/icons/check-color";
import { ErrorColorIcon } from "@rain-next/ui/icons/error-color";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { CustomIcon } from "@rain-next/ui/icons/custom";
import { GraphNodeIcon } from "@rain-next/ui/icons/graph-node";
import { GraphViewNetworkIcon } from "@rain-next/ui/icons/graph-view-network";
import { GraphViewRadialIcon } from "@rain-next/ui/icons/graph-view-radial";
import { GraphViewTreeIcon } from "@rain-next/ui/icons/graph-view-tree";
import { ButtonChevronDownIcon } from "@rain-next/ui/icons/button-chevron-down";
import { HelpColorIcon } from "@rain-next/ui/icons/help-color";
import { InfoColorIcon } from "@rain-next/ui/icons/info-color";
import { SubmissionFormIcon } from "@rain-next/ui/icons/submission-form";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group";
import { Toggle } from "./toggle";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Skeleton, Spinner } from "./loading";
import { Toaster, toast } from "./toast";
import "./components.css";
import "./page.css";

type GlobalMessageType = "info" | "success" | "error" | "caution" | "warning" | "help" | "loading";

function GlobalMessageIcon({ type }: { type: GlobalMessageType }) {
  if (type === "info") return <InfoColorIcon aria-hidden="true" />;
  if (type === "success") return <CheckColorIcon aria-hidden="true" />;
  if (type === "error") return <ErrorColorIcon aria-hidden="true" />;
  if (type === "warning") return <WarningColorIcon aria-hidden="true" />;
  if (type === "help") return <HelpColorIcon aria-hidden="true" />;
  if (type === "caution") return <WarningColorIcon className="g2-caution-icon" aria-hidden="true" />;
  return <Spinner aria-label="等待中" />;
}

function GlobalMessageRow({ type, label, closable = false, onClose }: { type: GlobalMessageType; label: string; closable?: boolean; onClose?: () => void }) {
  return <div className="g2-message-row" data-message-type={type}>
    <span className="g2-message-icon" data-message-icon={type}><GlobalMessageIcon type={type} /></span>
    <span>{label}</span>
    {closable ? <button type="button" className="g2-message-close" aria-label={`关闭${label}`} onClick={onClose}><CloseIcon aria-hidden="true" /></button> : null}
  </div>;
}

type IconSpecSize = "small" | "medium" | "large" | "xl";
type IconSpecOrientation = "horizontal" | "vertical";

const ICON_SPEC_SIZES: Array<{ key: IconSpecSize; label: string }> = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
  { key: "xl", label: "XL" },
];
const ICON_SPEC_COUNTS = [2, 3, 4, 5, 6] as const;

function IconSpecGlyph({ index }: { index: number }) {
  if (index === 0) return <GraphNodeIcon aria-hidden="true" />;
  if (index === 1) return <GraphViewRadialIcon aria-hidden="true" />;
  if (index === 2) return <GraphViewNetworkIcon aria-hidden="true" />;
  if (index === 3) return <GraphViewTreeIcon aria-hidden="true" />;
  if (index === 4) return <CustomIcon aria-hidden="true" />;
  return <CalendarSimpleIcon aria-hidden="true" />;
}

function IconSpecGroup({ size, orientation, count }: { size: IconSpecSize; orientation: IconSpecOrientation; count: number }) {
  const values = Array.from({ length: count }, (_, index) => `icon-${index}`);
  return <ToggleGroup
    aria-label={`${size} ${orientation === "horizontal" ? "横向" : "纵向"} ${count}项`}
    variant="outline"
    orientation={orientation}
    defaultValue={[values[values.length - 1]!]}
    className={`g2-icon-group g2-icon-spec-group g2-icon-spec-${size} g2-icon-spec-count-${count}`}
  >
    {values.map((value, index) => <ToggleGroupItem key={value} value={value} className="g2-icon-toggle" aria-label={`${size} ${orientation === "horizontal" ? "横向" : "纵向"} 第${index + 1}项`}><IconSpecGlyph index={index} /></ToggleGroupItem>)}
  </ToggleGroup>;
}

function IconSpecimen() {
  return <div className="g2-icon-specimen" role="region" aria-label="图标分段组完整规格">
    {ICON_SPEC_SIZES.map(({ key, label }) => <div className="g2-icon-spec-row" key={key}>
      <strong className="g2-icon-spec-size">{label}</strong>
      <div className="g2-icon-spec-modes">
        <div className="g2-icon-spec-mode"><span>横向 · 2～6 项</span><div className="g2-icon-spec-track">{ICON_SPEC_COUNTS.map(count => <div className="g2-icon-spec-option" key={`${key}-horizontal-${count}`}><span>{count} 项</span><IconSpecGroup size={key} orientation="horizontal" count={count} /></div>)}</div></div>
        <div className="g2-icon-spec-mode"><span>纵向 · 2～3 项</span><div className="g2-icon-spec-track g2-icon-spec-track-vertical">{[2, 3].map(count => <div className="g2-icon-spec-option" key={`${key}-vertical-${count}`}><span>{count} 项</span><IconSpecGroup size={key} orientation="vertical" count={count} /></div>)}</div></div>
      </div>
    </div>)}
  </div>;
}

type SingleSpecSize = "small" | "medium" | "large";
const SINGLE_SPEC_SIZES: Array<{ key: SingleSpecSize; label: string }> = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
];
const SINGLE_SPEC_OPTIONS = ["列表", "分栏", "聚焦", "对比", "批注", "评分", "图表", "更多"];

function SingleSpecGroup({ size, count }: { size: SingleSpecSize; count: 3 | 8 }) {
  return <ToggleGroup
    aria-label={`${size} ${count}项`}
    variant="outline"
    defaultValue={["list"]}
    spacing={0}
    className={`g2-single-toggle-spec g2-single-toggle-${size} g2-single-toggle-count-${count}`}
  >
    {SINGLE_SPEC_OPTIONS.slice(0, count).map((label, index) => <ToggleGroupItem key={label} value={index === 0 ? "list" : `option-${index}`} aria-label={label}>{label}</ToggleGroupItem>)}
  </ToggleGroup>;
}

function SingleSpecimen() {
  return <div className="g2-single-specimen" role="region" aria-label="单选显示模式完整规格">
    <div className="g2-single-spec-header"><span>尺寸</span><span>3 项</span><span>8 项</span></div>
    {SINGLE_SPEC_SIZES.map(({ key, label }) => <div className="g2-single-spec-row" key={key}>
      <strong>{label}</strong>
      <div className="g2-single-spec-cell"><SingleSpecGroup size={key} count={3} /></div>
      <div className="g2-single-spec-cell"><SingleSpecGroup size={key} count={8} /></div>
    </div>)}
  </div>;
}

function G2Contents() {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [showNames, setShowNames] = useState(true);
  const [messageVisible, setMessageVisible] = useState(true);
  const [density, setDensity] = useState<"default" | "compact">("default");
  const notify = (title: string, description: string, type?: "success" | "error" | "info") => toast.add({ title, description, type, timeout: 0 });
  const runLoading = () => { setLoading(true); setLoaded(false); window.setTimeout(() => { setLoading(false); setLoaded(true); }, 700); };
  return <DensityProvider density={density}><main className="g2" data-rain-theme={dark ? "dark" : "light"} data-density={density} data-rain-id="prototype-token-first-g2" data-asset-identity="local-experiment">
    <Toaster theme={dark ? "dark" : "light"} timeout={5000} limit={3}>
      <header className="g2-header">
        <div><p className="g2-eyebrow">Rain Next · G2 source adaptation</p><h1>操作分组与反馈</h1><p>同一教学任务中，选择、执行、加载与反馈保持清楚的关系。</p></div>
        <div className="g2-header-actions"><Checkbox label="紧凑密度" checked={density === "compact"} onCheckedChange={value => setDensity(value ? "compact" : "default")} /><Button variant="secondary" onClick={() => setDark(value => !value)}>{dark ? "切换浅色" : "切换深色"}</Button></div>
      </header>
      <nav className="g2-nav" aria-label="G2 预览"><a href="#token-first-g2" aria-current="page">G2 组件</a><a href="#token-first-g1-next">回看 G1</a></nav>
      <section className="g2-draft-banner" aria-labelledby="g2-draft-title"><div><span className="g2-kicker">Visual draft 01 · Figma first</span><h2 id="g2-draft-title">浅蓝选择面 · 深色反馈面</h2><p>分段选择沿用稿件的组内几何，Global Message 与 Toast 共享深色反馈家族。</p></div><div className="g2-draft-legend" aria-label="视觉方向"><span>connected group</span><span>icon group</span><span>semantic feedback</span></div></section>
      <section className="g2-intro" aria-labelledby="g2-intro-title"><div><span className="g2-kicker">局部实验 · shadcn → Rain</span><h2 id="g2-intro-title">批改设置</h2><p>先选择显示内容，再执行操作；异步结果通过轻提示返回。</p></div><ButtonGroup aria-label="批改操作"><Button variant="secondary" onClick={() => notify("已保存", "批改设置保留在当前示例", "success")}>保存设置</Button><ButtonGroupSeparator /><Button variant="tertiary" onClick={() => notify("已撤回", "本次修改尚未提交", "info")}>撤回</Button></ButtonGroup></section>
      <div className="g2-grid">
        <section className="g2-surface g2-selection-surface" aria-labelledby="g2-selection-title"><div className="g2-section-heading"><div><span className="g2-kicker">Toggle / Toggle Group</span><h2 id="g2-selection-title">显示内容</h2></div><span className="g2-state">{showAnnotations ? "显示批注" : "隐藏批注"}</span></div>
          <div className="g2-example"><h3><span>独立开关</span><span className="g2-example-note">可分别保存</span></h3><div className="g2-controls"><Toggle pressed={showAnnotations} onPressedChange={setShowAnnotations} variant="outline">批注</Toggle><Toggle pressed={showNames} onPressedChange={setShowNames} variant="outline">姓名</Toggle><Toggle disabled variant="outline">答案解析</Toggle></div><p>每个开关表达独立的显示设置，不承担互斥选择。</p></div>
          <div className="g2-example"><h3><span>单选显示模式</span><span className="g2-example-note">互斥 · Small / Medium / Large</span></h3><ToggleGroup aria-label="显示模式" variant="outline" defaultValue={["list"]} spacing={0} className="g2-single-toggle-group g2-single-toggle-spec g2-single-toggle-medium"><ToggleGroupItem value="list">列表</ToggleGroupItem><ToggleGroupItem value="split">分栏</ToggleGroupItem><ToggleGroupItem value="focus">聚焦</ToggleGroupItem></ToggleGroup><SingleSpecimen /><p>同一组模式使用单选行为，方向键在项目间移动；规格矩阵对应 Figma 中的 3 项与 8 项尺寸组合。</p></div>
          <div className="g2-example"><h3><span>多选字段</span><span className="g2-example-note">可并选</span></h3><ToggleGroup aria-label="导出字段" variant="outline" multiple defaultValue={["student", "score"]} className="g2-multi-toggle-group"><ToggleGroupItem value="student">学生</ToggleGroupItem><ToggleGroupItem value="score">得分</ToggleGroupItem><ToggleGroupItem value="comment">评语</ToggleGroupItem></ToggleGroup><p>多选组允许同时保留多个字段，禁用项保持不可操作。</p></div>
          <div className="g2-example g2-icon-example"><h3><span>图标分段组</span><span className="g2-example-note">横向 / 纵向 · Small / Medium / Large / XL</span></h3><div className="g2-icon-pair"><ToggleGroup aria-label="横向图形视图" variant="outline" defaultValue={["network"]} className="g2-icon-group"><ToggleGroupItem value="node" className="g2-icon-toggle" aria-label="节点视图"><GraphNodeIcon aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="radial" className="g2-icon-toggle" aria-label="环状视图"><GraphViewRadialIcon aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="network" className="g2-icon-toggle" aria-label="网状视图"><GraphViewNetworkIcon aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="tree" className="g2-icon-toggle" aria-label="树状视图"><GraphViewTreeIcon aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="custom" className="g2-icon-toggle g2-icon-toggle-custom" aria-label="自定义视图"><CustomIcon aria-hidden="true" /><ButtonChevronDownIcon aria-hidden="true" /></ToggleGroupItem></ToggleGroup><ToggleGroup aria-label="横向页面视图" variant="outline" defaultValue={["card"]} className="g2-icon-group g2-icon-group-tight"><ToggleGroupItem value="calendar" className="g2-icon-toggle" aria-label="日历视图"><CalendarSimpleIcon aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="form" className="g2-icon-toggle" aria-label="表单视图"><SubmissionFormIcon aria-hidden="true" /></ToggleGroupItem><ToggleGroupItem value="card" className="g2-icon-toggle" aria-label="卡片视图"><CardViewIcon aria-hidden="true" /></ToggleGroupItem></ToggleGroup></div><IconSpecimen /><p>图标只表达明确的视图选择，Tooltip 与可见上下文由宿主补齐；规格矩阵对应 Figma 中的尺寸、数量与排布组合。</p></div>
        </section>
        <section className="g2-surface g2-feedback-surface" aria-labelledby="g2-feedback-title"><div className="g2-section-heading"><div><span className="g2-kicker">Spinner / Skeleton / Toast</span><h2 id="g2-feedback-title">异步反馈</h2></div><ButtonGroup aria-label="反馈操作" orientation="horizontal"><Button variant="secondary" onClick={runLoading} disabled={loading}>{loading ? <><Spinner aria-label="正在刷新名单" />刷新中</> : "刷新名单"}</Button><Button variant="tertiary" onClick={() => notify("同步失败", "请检查网络后重试", "error")}>模拟失败</Button></ButtonGroup></div>
          <div className="g2-loading-example" aria-live="polite">{loading ? <div className="g2-record"><Skeleton className="g2-avatar" /><div className="g2-record-copy"><Skeleton className="g2-line g2-line-long" /><Skeleton className="g2-line" /></div></div> : <div className="g2-record"><div className="g2-avatar g2-avatar-ready" aria-hidden="true">林</div><div className="g2-record-copy"><strong>{loaded ? "名单已更新" : "林老师的批注"}</strong><span>{showNames ? "12 位学生 · 3 条新反馈" : "学生姓名已隐藏"}</span></div></div>}</div>
          <ButtonGroupText>完成状态会替换同一块内容，不增加跳动</ButtonGroupText>
          <div className="g2-toast-actions"><Button variant="tertiary" onClick={() => notify("设置已保存", "你可以继续批改", "success")}>成功提示</Button><Button variant="tertiary" onClick={() => notify("还有未完成项目", "请先选择一个显示字段", "info")}>说明提示</Button></div>
          <div className="g2-message-example"><div className="g2-message-heading"><div><span className="g2-kicker">Global Message</span><strong>短反馈视觉稿</strong></div><Button variant="tertiary" onClick={() => setMessageVisible(true)}>恢复消息</Button></div><div className="g2-message-stack" aria-live="polite">{messageVisible ? <><GlobalMessageRow type="info" label="普通的消息提示" /><GlobalMessageRow type="success" label="成功的消息提示" closable onClose={() => setMessageVisible(false)} /><GlobalMessageRow type="error" label="失败的消息提示" /><GlobalMessageRow type="caution" label="慎重警告的消息提示" /><GlobalMessageRow type="warning" label="警告的消息提示" /><GlobalMessageRow type="help" label="帮助用户操作" /><GlobalMessageRow type="loading" label="等待中..." /></> : <span className="g2-message-empty">消息已关闭，点击“恢复消息”查看。</span>}</div></div>
        </section>
      </div>
      <section className="g2-surface g2-source-card" aria-labelledby="g2-source-title"><div><span className="g2-kicker">Source lock</span><h2 id="g2-source-title">适配范围</h2><p>六项组件均为当前原型的 local-experiment，使用固定上游源码并复用 Rain Token、Button、Separator 和图标。</p></div><div className="g2-source-list"><span>默认 · 局部改造 · 兄弟实例</span><span>键盘 · reduced motion · forced colors</span><span>未进入公共 Registry</span></div></section>
    </Toaster>
  </main></DensityProvider>;
}

export function TokenFirstG2Page() { return <G2Contents />; }
