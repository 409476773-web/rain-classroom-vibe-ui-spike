import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Checkbox, Input, Link } from "@rain-next/ui";
import { ShareAltIcon } from "@rain-next/ui/icons/share-alt";
import { Settings3Icon } from "@rain-next/ui/icons/settings-3";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { BaseFixture } from "./base";
import { RadixFixture } from "./radix";
import { Avatar, ItemContent, layerAttributes, type ReviewSettings } from "./content";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "../../styles.css";
import "./review.css";

const samples = [
  { key: "plain", label: "分享课程", icon: <ShareAltIcon /> },
  { key: "description", label: "新建课堂讨论", description: "从一个问题开始，收集不同观点", icon: <Settings3Icon /> },
  { key: "identity-selected", label: "王老师", description: "工业设计系 · 教师账号", avatar: true, selected: true },
  { key: "checkbox", label: "显示已归档", indicator: "check" as const, selected: true },
  { key: "selected-disabled", label: "保留教师资料", description: "管理员已锁定此项，当前设置仍然生效。", indicator: "check" as const, selected: true, disabled: true, critical: true },
  { key: "submenu", label: "默认教学班", description: "2026级工业设计专业 · 实验教学班", submenu: true },
  { key: "danger", label: "删除课程", icon: <DeleteIcon />, danger: true },
];

function VisualMenu({ flavor, settings }: { flavor: "source" | "tokens"; settings: ReviewSettings }) {
  const [selected, setSelected] = useState<string[]>(samples.filter(sample => sample.selected).map(sample => sample.key));
  return <div {...layerAttributes(settings)} data-flavor={flavor} data-rain-theme={flavor === "source" ? "light" : settings.theme}
    data-geometry={flavor === "source" ? "source" : settings.geometry} data-shadow={flavor === "source" ? "source" : settings.shadow}
    className="dr-surface dr-visual-menu">
    <p className="dr-group-label">内容与状态</p>
    {samples.map(sample => <button key={sample.key} type="button" className="dr-item" data-focus="item"
      data-testid={`${flavor === "tokens" ? "token" : "source"}-${sample.key}`}
      data-selected={selected.includes(sample.key)} data-tone={sample.danger ? "danger" : undefined}
      aria-pressed={selected.includes(sample.key)} aria-disabled={sample.disabled || undefined}
      onClick={() => { if (!sample.disabled) setSelected(current => current.includes(sample.key) ? current.filter(key => key !== sample.key) : [...current, sample.key]); }}>
      <ItemContent label={sample.label} description={sample.description} leading={sample.avatar ? <Avatar /> : sample.icon}
        indicator={sample.indicator} submenu={sample.submenu} critical={sample.critical} />
      {sample.avatar && <span className="dr-check-right" aria-hidden="true"><CheckBoldIcon /></span>}
    </button>)}
  </div>;
}

function BoundarySamples({ settings }: { settings: ReviewSettings }) {
  return <section className="dr-section" aria-labelledby="boundary-title">
    <div className="dr-section-heading"><h2 id="boundary-title">长内容，也要读得完整</h2><p>标题最多两行；关键范围和不可用原因完整放在说明中。</p></div>
    <div className="dr-boundary-grid">
      {["dr-width-narrow", "dr-width-medium", "dr-width-wide"].map((width, index) => <div key={width} className="dr-boundary-case">
        <p className="dr-caption">{[220, 282, 340][index]}px 宽度样本</p>
        <div {...layerAttributes(settings)} className={["dr-surface", width].join(" ")}>
          <button type="button" className="dr-item" data-focus="item"><ItemContent label="将当前课程的完整教学资料复制到新的教学班级中" submenu /></button>
          <button type="button" className="dr-item" data-focus="item"><ItemContent label="选择教学模板" description="按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。" /></button>
        </div>
      </div>)}
    </div>
    <div className="dr-critical-grid">
      <div {...layerAttributes(settings)} className="dr-surface">
        <button type="button" className="dr-item" data-focus="item" data-tone="danger"><ItemContent label="清理已归档资料"
          description="操作范围：2026级工业设计专业全部教学班，以及这些教学班关联的课堂讨论、作业附件和教师批改记录。" leading={<DeleteIcon />} critical /></button>
      </div>
      <div {...layerAttributes(settings)} className="dr-surface">
        <button type="button" className="dr-item" data-focus="item" aria-disabled="true" data-testid="token-critical-reason"><ItemContent label="导出学生成绩"
          description="你目前是课程协作教师，尚未获得成绩导出权限。请联系课程负责人开启权限后再操作，已有成绩不会因此改变。" critical /></button>
      </div>
    </div>
  </section>;
}

function Review() {
  const [theme, setTheme] = useState<ReviewSettings["theme"]>("light");
  const [geometry, setGeometry] = useState<ReviewSettings["geometry"]>("source");
  const [feedback, setFeedback] = useState<ReviewSettings["feedback"]>("neutral");
  const [shadow, setShadow] = useState<ReviewSettings["shadow"]>("source");
  const [candidate, setCandidate] = useState(new URLSearchParams(location.search).get("candidate") === "radix" ? "radix" : "base");
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [lastEvent, setLastEvent] = useState("选择一个操作，查看交互结果。");
  const settings = { theme, geometry, feedback, shadow };
  return <main className="dropdown-review" data-rain-theme={theme} data-rain-id="dropdown-batch-one-review" data-asset-identity="local-experiment">
    <div className="dr-shell">
      <header className="dr-hero">
        <Link href="/">Rain Next</Link>
        <h1>下拉菜单 · 第一批</h1>
        <p>先看清每一条内容，再体验菜单与自由组合面板。</p>
        <div className="dr-hero-note">文字规则已确认 · 留白、背景与阴影待检查</div>
      </header>
      <section className="dr-settings" aria-label="样本设置">
        <div role="group" aria-label="预览主题" className="dr-theme-controls">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
        </div>
        <label>行间留白<select data-focus="control" value={geometry} onChange={event => setGeometry(event.target.value as ReviewSettings["geometry"])}>
          <option value="source">保留原稿 · 36 / 60</option><option value="tokens">现有间距 · 34 / 58</option>
        </select></label>
        <label>状态背景<select data-focus="control" value={feedback} onChange={event => setFeedback(event.target.value as ReviewSettings["feedback"])}>
          <option value="neutral">中性浅蓝</option><option value="brand">品牌浅蓝</option>
        </select></label>
        <label>浮层阴影<select data-focus="control" value={shadow} onChange={event => setShadow(event.target.value as ReviewSettings["shadow"])}>
          <option value="source">原稿低阴影</option><option value="tokens">现有浮层阴影</option>
        </select></label>
      </section>

      <section id="visual-review" className="dr-section" aria-labelledby="visual-title">
        <div className="dr-section-heading"><h2 id="visual-title">相同内容，并排比较</h2><p>两列使用正式字体与已确认的 600／400 层次。点击条目可查看选中样式，Tab 可检查键盘焦点。</p></div>
        <div className="dr-comparison-grid">
          <div className="dr-comparison-column"><h3>原稿外观</h3><p className="dr-caption">浅色原稿＋已确认文字规则</p><VisualMenu flavor="source" settings={settings} /></div>
          <div className="dr-comparison-column"><h3>Rain Token 对照</h3><p className="dr-caption">切换上方设置，比较当前方案</p><VisualMenu flavor="tokens" settings={settings} /></div>
        </div>
        <p className="dr-footnote">选中时文字与图标都使用主题色；说明颜色浅一档，主文字 600、说明 400。关键限制与不可用原因保持清晰。</p>
      </section>

      <section className="dr-section" aria-labelledby="interaction-title">
        <div className="dr-section-heading"><h2 id="interaction-title">真实点击，真实键盘</h2><p>课程操作包含复选、单选、子菜单与弹窗；新建面板包含搜索、分类、预览和独立收藏。</p></div>
        <div className="dr-lab-settings">
          <label>交互底座<select data-focus="control" aria-label="交互底座" value={candidate} onChange={event => { setCandidate(event.target.value); setLastEvent("已切换，使用相同内容与样式对照。"); }}><option value="base">Base UI</option><option value="radix">Radix</option></select></label>
          <Checkbox label="操作后关闭" checked={closeOnAction} onCheckedChange={setCloseOnAction} />
          <span className="dr-caption">“记录稍后处理”单独保持打开。</span>
        </div>
        {candidate === "base" ? <BaseFixture {...settings} closeOnAction={closeOnAction} onEvent={setLastEvent} /> : <RadixFixture {...settings} closeOnAction={closeOnAction} onEvent={setLastEvent} />}
        <p className="dr-event" role="status">{lastEvent}</p>
        <div className="dr-outside-target"><label className="dr-field-label">外部焦点目标<Input aria-label="外部焦点目标" placeholder="浮层打开时，点击这里" /></label></div>
        <p className="dr-footnote">模板首次创建会演示失败；重试后成功，用于检查选择与搜索是否保留。</p>
      </section>

      <BoundarySamples settings={settings} />
      <footer className="dr-footer">第一批局部样本 · 视觉对照与交互底座验证 · 公共组件尚未发布</footer>
    </div>
  </main>;
}

const root = document.getElementById("root");
if (!root) throw new Error("Dropdown review root was not found.");
createRoot(root).render(<StrictMode><Review /></StrictMode>);
