import { useState, type ReactNode } from "react";

import { Button, Link, OptionButton, OptionGroup } from "@rain-next/ui";
import linearChart from "./option-chart-linear.svg";
import parabolaChart from "./option-chart-parabola.svg";
import "./option-button-page.css";

const letterOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
] as const;

const singleRows = [
  { value: "A", label: "A", text: "在课程结束时，根据一次考试成绩确定学生的最终等级。" },
  { value: "B", label: "B", text: "在学习过程中持续收集学生的理解情况，并根据反馈调整教学内容、练习安排和后续学习计划。" },
  { value: "C", label: "C", text: "在新课程开始前，了解学生已有的知识和经验。" },
  { value: "D", label: "D", text: "结合多次学习任务，记录学生在一段时间内的变化。" },
] as const;

const multipleRows = [
  { value: "A", label: "A", text: "阅读文字材料" },
  { value: "B", label: "B", text: "参与课堂讨论" },
  { value: "C", label: "C", text: "整理学习笔记" },
  { value: "D", label: "D", text: "完成课后练习" },
] as const;

const reviewedRows = [
  { ...singleRows[0], feedback: "wrong" },
  { ...singleRows[1], feedback: "correct" },
  singleRows[2],
] as const;

const mixedResults = [
  { value: "A", label: "A", feedback: "correct" },
  { value: "B", label: "B", feedback: "wrong" },
  { value: "C", label: "C", feedback: "correct" },
] as const;

const undisclosedResults = [
  { value: "A", label: "A", feedback: "wrong" },
  { value: "B", label: "B", feedback: "correct" },
] as const;

const judgmentOptions = [
  { value: "true", label: "对", symbol: "true", feedback: "correct" },
  { value: "false", label: "错", symbol: "false", feedback: "wrong" },
] as const;

const mediaOptions = [
  { value: "A", label: "A", text: "图 A：沿直线持续上升。", media: { src: linearChart, alt: "直线从左下方向右上方匀速上升" } },
  { value: "B", label: "B", text: "图 B：曲线先下降，在最低点之后逐渐上升。较长的选项正文可以说明图形的变化过程；阅读全部内容后，仍可直接点击图片、字母或文字完成同一次选择。", media: { src: parabolaChart, alt: "曲线先下降后上升，形成开口向上的抛物线" } },
] as const;

function Section({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return <section className="option-button-page__section" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>{title}</h2>
    <p className="option-button-page__description">{description}</p>
    {children}
  </section>;
}

export function OptionButtonPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [singleFilled, setSingleFilled] = useState<string | null>(null);
  const [singleOutlined, setSingleOutlined] = useState<string | null>(null);
  const [multiple, setMultiple] = useState<string[]>([]);
  const [multipleOutlined, setMultipleOutlined] = useState<string[]>([]);
  const [singleRow, setSingleRow] = useState<string | null>(null);
  const [multipleRow, setMultipleRow] = useState<string[]>([]);
  const [reviewedRow, setReviewedRow] = useState<string | null>("A");
  const [reviewedMultiple, setReviewedMultiple] = useState<string[]>(["A", "B"]);
  const [hiddenAnswer, setHiddenAnswer] = useState<string | null>("A");
  const [unanswered, setUnanswered] = useState<string | null>(null);
  const [judgment, setJudgment] = useState<string | null>(null);
  const [reviewedJudgment, setReviewedJudgment] = useState<string | null>("false");
  const [mediaAnswer, setMediaAnswer] = useState<string | null>(null);

  return <main className="option-button-page rain-type-ui-default" data-rain-id="option-button-page"
    data-asset-identity="local-experiment" data-rain-theme={theme}>
    <div className="option-button-page__content">
      <header className="option-button-page__hero">
        <Link href="#components">返回组件页</Link>
        <p className="option-button-page__eyebrow">RAIN NEXT · OPTION BUTTON</p>
        <h1 id="option-button-title" tabIndex={-1}>选项按钮，独立与整行共用选择</h1>
        <p>可以独立选择 A / B / C / D，也可以点击整行文字完成选择。</p>
        <p className="option-button-page__description">基础选择 32 px · 视觉已验收</p>
        <p className="option-button-page__description">结果与内容组合 · 验收已完成</p>
        <p><Link href="/question-option-sizes.html">查看六档尺寸与密度</Link></p>
        <div className="option-button-page__theme" role="group" aria-label="预览主题">
          <span>预览主题</span>
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
        </div>
      </header>

      <Section id="option-letters" title="独立字母，单选与多选" description="单选使用圆形，多选使用圆角方形。选中后字母加粗、蓝底反白，字母按钮本体不加描边。下面每组可分别操作，初始均未选择。">
        <div className="option-button-page__examples">
          <div className="option-button-page__example" data-testid="option-single-filled">
            <OptionGroup size={32} legend="单选 · 填底" name="option-single-filled" options={letterOptions} value={singleFilled} onValueChange={setSingleFilled} />
            <p className="option-button-page__status" role="status">{singleFilled === null ? "尚未选择" : `已选 ${singleFilled}`}</p>
          </div>
          <div className="option-button-page__example" data-testid="option-single-outlined">
            <OptionGroup size={32} legend="单选 · 描边" name="option-single-outlined" appearance="outlined" options={letterOptions} value={singleOutlined} onValueChange={setSingleOutlined} />
            <p className="option-button-page__status" role="status">{singleOutlined === null ? "尚未选择" : `已选 ${singleOutlined}`}</p>
          </div>
          <div className="option-button-page__example" data-testid="option-multiple">
            <OptionGroup size={32} legend="多选 · 填底" name="option-multiple" mode="multiple" options={letterOptions} value={multiple} onValueChange={setMultiple} />
            <p className="option-button-page__status" role="status">{multiple.length === 0 ? "尚未选择" : `已选 ${multiple.join("、")}`}</p>
          </div>
          <div className="option-button-page__example" data-testid="option-multiple-outlined">
            <OptionGroup size={32} legend="多选 · 描边" name="option-multiple-outlined" mode="multiple" appearance="outlined" options={letterOptions} value={multipleOutlined} onValueChange={setMultipleOutlined} />
            <p className="option-button-page__status" role="status">{multipleOutlined.length === 0 ? "尚未选择" : `已选 ${multipleOutlined.join("、")}`}</p>
          </div>
        </div>
        <p className="option-button-page__description">单选再次点击已选项会保持选择；多选再次点击则取消该项。</p>
      </Section>

      <Section id="option-rows" title="点击整行，完成一次选择" description="字母和正文属于同一个选项。选中行保留浅蓝底和弱蓝描边，内部字母本体保持无描边。">
        <div className="option-button-page__row-examples">
          <div className="option-button-page__example" data-testid="option-single-rows">
            <OptionGroup size={32} legend="单选 · 选择一个课堂评价描述" name="option-single-rows" options={singleRows} value={singleRow} onValueChange={setSingleRow} />
            <p className="option-button-page__status" role="status">{singleRow === null ? "尚未选择" : `已选 ${singleRow}`}</p>
          </div>
          <div className="option-button-page__example" data-testid="option-multiple-rows">
            <OptionGroup size={32} legend="多选 · 选择学习活动" name="option-multiple-rows" mode="multiple" appearance="outlined" options={multipleRows} value={multipleRow} onValueChange={setMultipleRow} />
            <p className="option-button-page__status" role="status">{multipleRow.length === 0 ? "尚未选择" : `已选 ${multipleRow.join("、")}`}</p>
          </div>
        </div>
      </Section>

      <Section id="option-availability" title="暂不可用，保留原有选择" description="禁用状态仍能区分已选与未选，但不能修改选择，也不会进入键盘顺序。">
        <div className="option-button-page__examples" data-testid="option-disabled">
          <div className="option-button-page__example">
            <h3>单选</h3>
            <div className="option-button-page__inline">
              <OptionButton size={32} type="radio" name="option-disabled-single" value="A" label="A" checked={false} disabled />
              <span>未选中</span>
              <OptionButton size={32} type="radio" name="option-disabled-single" value="B" label="B" checked disabled />
              <span>已选中</span>
            </div>
          </div>
          <div className="option-button-page__example">
            <h3>多选</h3>
            <div className="option-button-page__inline">
              <OptionButton size={32} type="checkbox" value="C" label="C" checked={false} appearance="outlined" disabled />
              <span>未选中</span>
              <OptionButton size={32} type="checkbox" value="D" label="D" checked appearance="outlined" disabled />
              <span>已选中</span>
            </div>
          </div>
        </div>
      </Section>

      <Section id="option-results" title="回顾答案，保留选项与结果" description="只读回顾可以聚焦和阅读，但不能修改答案。仅在结果公开后，为已选项显示正确或错误；未选中的正确项保持普通外观。以下结果为展示用示例。">
        <p className="option-button-page__description">选中行保留浅蓝底和弱蓝描边。编号使用正确或错误色系的实底，字母与图标反白；按钮下方不增加结果小字。</p>
        <div className="option-button-page__examples">
          <div className="option-button-page__example" data-testid="option-result-standalone">
            <h3>独立选项的结果</h3>
            <div className="option-button-page__inline">
              <OptionButton size={32} type="radio" name="option-result-correct" value="A" label="A" checked readOnly feedback="correct" feedbackVisibility="visible" />
              <OptionButton size={32} type="radio" name="option-result-wrong" value="B" label="B" checked readOnly feedback="wrong" feedbackVisibility="visible" />
            </div>
          </div>
          <div className="option-button-page__example" data-testid="option-result-multiple">
            <OptionGroup size={32} mode="multiple" legend="多选回顾" name="option-result-multiple" options={mixedResults} value={reviewedMultiple} onValueChange={setReviewedMultiple} readOnly feedbackVisibility="visible" />
            <p className="option-button-page__status">已选 A、B；未选 C 不展示结果。</p>
          </div>
        </div>
        <div className="option-button-page__example" data-testid="option-result-rows">
          <OptionGroup size={32} legend="文字选项回顾" name="option-result-rows" options={reviewedRows} value={reviewedRow} onValueChange={setReviewedRow} readOnly feedbackVisibility="visible" />
          <p className="option-button-page__status">你的选择：A。正确答案与解析由题目页面另行展示。</p>
        </div>
      </Section>

      <Section id="option-disclosure" title="尚未公开或未作答，保留必要信息" description="结果是否公开与有没有作答分别管理。选项不主动揭示未选中的正确答案。">
        <div className="option-button-page__examples">
          <div className="option-button-page__example" data-testid="option-result-hidden">
            <OptionGroup size={32} legend="结果尚未公开" name="option-result-hidden" options={undisclosedResults} value={hiddenAnswer} onValueChange={setHiddenAnswer} readOnly />
            <p className="option-button-page__status">已提交 A，结果尚未公开。</p>
          </div>
          <div className="option-button-page__example" data-testid="option-result-unanswered">
            <OptionGroup size={32} legend="未作答的题目" name="option-result-unanswered" options={undisclosedResults} value={unanswered} onValueChange={setUnanswered} readOnly feedbackVisibility="visible" />
            <p className="option-button-page__status">未作答</p>
          </div>
        </div>
      </Section>

      <Section id="option-judgment-examples" title="判断题，选项内容与评价分别表达" description="对勾和叉号表示选项内容。回顾时保留所选图形，通过结果色表达正确与错误，图形本身反白。">
        <p>判断：形成性评价主要用于改进学习过程。</p>
        <div className="option-button-page__examples">
          <div className="option-button-page__example" data-testid="option-judgment">
            <OptionGroup size={32} legend="请选择对或错" name="option-judgment" options={judgmentOptions} value={judgment} onValueChange={setJudgment} />
            <p className="option-button-page__status" role="status">{judgment === null ? "尚未选择" : `已选：${judgment === "true" ? "对" : "错"}`}</p>
          </div>
          <div className="option-button-page__example" data-testid="option-judgment-review">
            <OptionGroup size={32} legend="判断题回顾" name="option-judgment-review" options={judgmentOptions} value={reviewedJudgment} onValueChange={setReviewedJudgment} readOnly feedbackVisibility="visible" />
            <p className="option-button-page__status">所选内容：错 · 作答结果：错误</p>
          </div>
        </div>
      </Section>

      <Section id="option-media-examples" title="图片与长正文，共用一个选项" description="编号在左，图片与正文共同归在右侧，并沿同一左边缘排列。点击图片、编号或文字，都只选择所属选项。图形仅用于展示内容组合，未配置标准答案。">
        <div className="option-button-page__example" data-testid="option-media">
          <OptionGroup size={32} legend="单选 · 选择一个图形" name="option-media" options={mediaOptions} value={mediaAnswer} onValueChange={setMediaAnswer} />
          <p className="option-button-page__status" role="status">{mediaAnswer === null ? "尚未选择" : `已选 ${mediaAnswer}`}</p>
        </div>
      </Section>

      <Section id="option-contract" title="使用与组合约定" description="默认直接使用完整组件。选择状态由所在题目管理，各题保持独立。">
        <dl className="option-button-page__contract">
          <div><dt>适合</dt><dd>单选题、多选题中的独立字母选项或整行文字选项。定位当前题目时使用 <Link href="#question-number">题号按钮</Link>。</dd></div>
          <div><dt>选项组</dt><dd><code>OptionGroup</code> 提供选项、组名与选择值。单选的 <code>value</code> 为字符串或 <code>null</code>；多选为字符串数组。使用稳定的选项值，不按文字内容推导答案。</dd></div>
          <div><dt>内容与外观</dt><dd><code>label</code> 保留选项名称；<code>text</code> 扩展正文；<code>symbol</code> 表示判断题内容；<code>media</code> 提供图片与替代说明，图片和正文同属编号右侧的内容区域。<code>appearance</code> 的 <code>filled / outlined</code> 区分未选中的填底与描边外观。</dd></div>
          <div><dt>结果公开</dt><dd><code>feedback</code> 表示已提供的答案评价，<code>feedbackVisibility</code> 默认隐藏。仅选中且明确公开时使用结果色和反白文字或图标，并提供辅助阅读说明；按钮内部不追加结果小字。未作答和未选中的正确项不自动揭示答案，表单校验另行管理。</dd></div>
          <div><dt>只读与禁用</dt><dd><code>readOnly</code> 保留答案、焦点和提交值，阻止修改；单选用 Tab 进入，再用方向键逐项阅读，多选用 Tab 逐项阅读。<code>disabled</code> 表示暂不可用，不进入键盘顺序，也不提交选项值。</dd></div>
          <div><dt>结构与修改</dt><dd><code>root / input / control / label / content / media</code> 共用一次选择行为；局部样式通过具名 <code>localRecipe</code> 修改已声明的 Parts，<code>className</code> 用于外部布局。<code>feedback</code> 仅为隐藏的辅助说明，不作为可见样式改造区域。图片放大或播放属于独立操作，需另行设计组合。</dd></div>
          <div><dt>键盘操作</dt><dd>使用 Tab 进入选项；单选组内用方向键切换，多选用空格选中或取消。禁用项不可修改，键盘焦点独立于选择状态。</dd></div>
          <div><dt>尺寸</dt><dd>OptionButton 与 OptionGroup 的 size 支持 20 / 24 / 28 / 32 / 36 / 40，默认 28；组内共享尺寸，正文独立排版。密度只调整外围留白，本页显式保留 32px 基准。</dd></div>
        </dl>
        <pre className="option-button-page__code"><code>{`const [answer, setAnswer] = useState<string | null>(null);

<OptionGroup
  size={32}
  legend="请选择一项"
  name="question-1"
  options={[
    { value: "A", label: "A", text: "选项 A 的正文" },
    { value: "B", label: "B", text: "选项 B 的正文" },
  ]}
  value={answer}
  onValueChange={setAnswer}
/>`}</code></pre>
        <p className="option-button-page__description">样式参考：<Link href="https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e?node-id=2752-19153">选项与题号设计</Link>。颜色、字重、间距、圆角和线条使用现有 Rain Token。</p>
      </Section>
    </div>
  </main>;
}
