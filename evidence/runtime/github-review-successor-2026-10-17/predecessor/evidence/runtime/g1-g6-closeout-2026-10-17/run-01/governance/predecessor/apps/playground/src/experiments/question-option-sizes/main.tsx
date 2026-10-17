import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { DensityProvider, type Density } from "@rain-next/foundations";
import {
  Button, Link, OptionButton, OptionGroup, QuestionNumber,
  type OptionButtonAppearance,
} from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "../../styles.css";
import "./review.css";
import linear from "../../docs/components/option-chart-linear.svg";
import parabola from "../../docs/components/option-chart-parabola.svg";

const sizes = [20, 24, 28, 32, 36, 40] as const;
type Size = typeof sizes[number];
const results = [
  { feedback: "correct", label: "正确" }, { feedback: "wrong", label: "错误" },
  { feedback: "unanswered", label: "未作答" }, { feedback: "pending", label: "待批改" },
  { feedback: "reviewed", label: "已批改" },
] as const;

function SizeLabel({ size }: { size: Size }) {
  return <h3>{size}<span>px</span>{size === 28 && <small>默认 · 常规</small>}{size === 32 && <small>常规 · 基准</small>}</h3>;
}

function NumberRow({ size, shape }: { size: Size; shape: "square" | "circle" }) {
  const [current, setCurrent] = useState(12);
  return <div role="group" aria-label={size + "px " + (shape === "square" ? "普通题号" : "圆形小题")} className="size-review-number-row">
    {[1, 12, 100].map(number => <QuestionNumber key={number} number={number} shape={shape}
      current={current === number} size={size} onClick={() => setCurrent(number)} />)}
  </div>;
}

function SelectionColumn({ size, appearance }: { size: Size; appearance: OptionButtonAppearance }) {
  const [single, setSingle] = useState<string | null>("A");
  const [multiple, setMultiple] = useState<readonly string[]>(["C"]);
  const [judgment, setJudgment] = useState<string | null>("true");
  return <div className="size-review-column" data-review-size={size} data-testid={"selection-size-" + size}>
    <SizeLabel size={size} />
    <OptionGroup legend="单选" aria-label={size + "px 单选"} options={[{ value: "A", label: "A" }, { value: "B", label: "B" }]}
      value={single} onValueChange={setSingle} appearance={appearance} size={size} />
    <OptionGroup mode="multiple" legend="多选" aria-label={size + "px 多选"} options={[{ value: "C", label: "C" }, { value: "D", label: "D" }]}
      value={multiple} onValueChange={setMultiple} appearance={appearance} size={size} />
    <OptionGroup legend="判断" aria-label={size + "px 判断"} options={[{ value: "true", label: "对", symbol: "true" }, { value: "false", label: "错", symbol: "false" }]}
      value={judgment} onValueChange={setJudgment} appearance={appearance} size={size} />
    <div><p className="size-review-caption">结果回顾</p><div className="size-review-number-row">
      <OptionButton type="radio" name={"correct-" + size} value="A" label="A" checked readOnly feedback="correct" feedbackVisibility="visible" size={size} />
      <OptionButton type="radio" name={"wrong-" + size} value="B" label="B" checked readOnly feedback="wrong" feedbackVisibility="visible" size={size} />
    </div></div>
  </div>;
}

function FeedbackExamples({ current, size }: { current: boolean; size: Size }) {
  return <div className="size-review-feedback-list">
    {results.map(({ feedback, label }, i) => <div key={feedback}>
      <span>{label}</span>
      <QuestionNumber number={i + 1} feedback={feedback} current={current} size={size} />
      <QuestionNumber number={i + 1} feedback={feedback} current={current} shape="circle" size={size} />
    </div>)}
  </div>;
}

function ContentExamples({ appearance }: { appearance: OptionButtonAppearance }) {
  const [size, setSize] = useState<Size>(28);
  const [text, setText] = useState<string | null>("B");
  const [media, setMedia] = useState<string | null>(null);
  return <section className="size-review-section" aria-labelledby="size-review-content-title">
    <div className="size-review-section-heading">
      <div><h2 id="size-review-content-title">04 · 文字与图片，归在编号右侧</h2><p>切换编号尺寸，正文保持同一字号。点击文字或图片，都可以选择所属选项。</p></div>
      <label className="size-review-select">编号尺寸<select data-focus="item" value={size} onChange={event => setSize(Number(event.target.value) as Size)}>
        {sizes.map(value => <option key={value} value={value}>{value}px{value === 28 ? " · 默认" : ""}</option>)}
      </select></label>
    </div>
    <div data-review-size={size} data-testid="size-review-content" className="size-review-content-examples">
      <OptionGroup legend="文字选项" size={size} appearance={appearance} value={text} onValueChange={setText}
        options={[
          { value: "A", label: "A", text: "在课程结束时，根据一次考试成绩确定学生的最终等级。" },
          { value: "B", label: "B", text: "在学习过程中持续收集学生的理解情况，并根据反馈调整教学内容、练习安排和后续学习计划。" },
        ]} />
      <OptionGroup legend="图文选项" size={size} appearance={appearance} value={media} onValueChange={setMedia}
        options={[
          { value: "A", label: "A", text: "图 A：沿直线持续上升。", media: { src: linear, alt: "直线从左下方向右上方匀速上升" } },
          { value: "B", label: "B", text: "图 B：曲线先下降，在最低点之后逐渐上升。文字和图片共同说明这一选项。", media: { src: parabola, alt: "曲线先下降后上升，形成开口向上的抛物线" } },
        ]} />
    </div>
  </section>;
}

function SizeReview() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [density, setDensity] = useState<Density>("default");
  const [appearance, setAppearance] = useState<OptionButtonAppearance>("filled");
  const [bounds, setBounds] = useState(false);
  const [currentResults, setCurrentResults] = useState(false);
  return <main className="question-option-review" data-rain-theme={theme} data-show-targets={bounds}
    data-rain-id="question-option-size-review" data-asset-identity="local-experiment">
    <div className="size-review-shell">
      <header className="size-review-hero">
        <div className="size-review-links"><Link href="/#question-number">题号组件</Link><Link href="/#option-button">选项组件</Link></div>
        <p className="size-review-eyebrow">RAIN NEXT · SIZE REVIEW</p>
        <h1>题号与选项 · 六档尺寸对照</h1>
        <p>28px 与 32px 都是常规尺寸，默认使用 28px。以下按实际尺寸展示，可直接点击体验。</p>
        <p className="size-review-caption">六档配方已确认 · 公共组件实现对照</p>
      </header>
      <div className="size-review-toolbar" aria-label="对照设置">
        <div role="group" aria-label="预览主题">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
        </div>
        <label className="size-review-select">密度<select data-focus="item" value={density} onChange={event => setDensity(event.target.value as Density)}><option value="default">常规</option><option value="compact">紧凑</option></select></label>
        <label className="size-review-select">未选选项<select data-focus="item" value={appearance} onChange={event => setAppearance(event.target.value as OptionButtonAppearance)}><option value="filled">填底</option><option value="outlined">描边</option></select></label>
        <label><input data-focus="item" type="checkbox" checked={bounds} onChange={event => setBounds(event.target.checked)} />显示点击范围</label>
      </div>
      <DensityProvider density={density} className="size-review-density">
        <section className="size-review-section" aria-labelledby="size-review-number-title">
          <h2 id="size-review-number-title">01 · 普通题号与圆形小题</h2>
          <p>每行分别比较 1、12、100。点击切换当前题号，观察加粗后是否仍有足够空间。</p>
          <div className="size-review-grid">{sizes.map(size => <div key={size} className="size-review-column" data-review-size={size} data-testid={"number-size-" + size}>
            <SizeLabel size={size} /><p className="size-review-caption">普通题号</p><NumberRow size={size} shape="square" />
            <p className="size-review-caption">圆形小题</p><NumberRow size={size} shape="circle" />
          </div>)}</div>
        </section>
        <section className="size-review-section" aria-labelledby="size-review-feedback-title">
          <div className="size-review-section-heading">
            <div><h2 id="size-review-feedback-title">02 · 题号与结果反馈</h2><p>同一行分别展示普通题号和圆形小题。20px 已采用方案 A：12px 圆标，下移 2px。</p></div>
            <label><input data-focus="item" type="checkbox" checked={currentResults} onChange={event => setCurrentResults(event.target.checked)} />查看当前题号状态</label>
          </div>
          <div className="size-review-grid">{sizes.map(size => <div key={size} className="size-review-column" data-review-size={size} data-testid={"feedback-size-" + size}>
            <SizeLabel size={size} /><FeedbackExamples current={currentResults} size={size} />
          </div>)}</div>
        </section>
        <section className="size-review-section" aria-labelledby="size-review-selection-title">
          <h2 id="size-review-selection-title">03 · 字母、判断与结果回顾</h2><p>每列独立选择。单选保留已选答案，多选可以再次点击取消。</p>
          <div className="size-review-grid">{sizes.map(size => <SelectionColumn key={size} size={size} appearance={appearance} />)}</div>
        </section>
        <ContentExamples appearance={appearance} />
      </DensityProvider>
      <footer className="size-review-footer">六档尺寸、方案 A 及密度留白已纳入公共组件。这里展示公共 size 的实际效果，原组件页保留 32px 基准示例。</footer>
    </div>
  </main>;
}

const root = document.getElementById("root");
if (!root) throw new Error("Size review root was not found.");
createRoot(root).render(<StrictMode><SizeReview /></StrictMode>);
