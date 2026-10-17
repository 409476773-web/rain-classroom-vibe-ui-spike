import { useState, type ReactNode } from "react";

import { Button, Link, QuestionNumber, type QuestionNumberFeedback } from "@rain-next/ui";
import "./question-number-page.css";

const feedbackExamples: readonly { value: QuestionNumberFeedback; label: string }[] = [
  { value: "none", label: "无结果" },
  { value: "answered", label: "已作答" },
  { value: "correct", label: "正确" },
  { value: "wrong", label: "错误" },
  { value: "unanswered", label: "未作答" },
  { value: "pending", label: "待批改" },
  { value: "reviewed", label: "已批改" },
];

function Section({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return <section className="question-number-page__section" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>{title}</h2>
    <p className="question-number-page__description">{description}</p>
    {children}
  </section>;
}

function FeedbackMatrix({ shape }: { shape: "square" | "circle" }) {
  const [current, setCurrent] = useState(shape === "square" ? 4 : 2);
  const title = shape === "square" ? "普通题" : "小题";
  return <div>
    <h3>{title}</h3>
    <nav aria-label={`${title}反馈示例`}>
      <ol className="question-number-page__matrix" data-testid={`question-number-${shape}-matrix`}>
        {feedbackExamples.map(({ value, label }, index) => <li key={value}>
          <QuestionNumber size={32} number={index + 1} shape={shape} feedback={value} current={current === index + 1}
            aria-label={`${title}第 ${index + 1} 题，${label}`} onClick={() => setCurrent(index + 1)} />
          <span className="question-number-page__caption" data-feedback={value}>{label}</span>
        </li>)}
      </ol>
    </nav>
    <p className="question-number-page__status" role="status">当前查看{title}第 {current} 题 · {feedbackExamples[current - 1]!.label}</p>
  </div>;
}

function ParentChildExample() {
  const [current, setCurrent] = useState(0);
  const children = [{ number: 1, feedback: "correct", label: "正确" }, { number: 2, feedback: "pending", label: "待批改" }, { number: 3, feedback: "unanswered", label: "未作答" }] as const;
  return <div className="question-number-page__sample" data-testid="question-number-parent-child">
    <nav aria-label="第 8 题材料与小题">
      <div className="question-number-page__row">
        <QuestionNumber size={32} number={8} current={current === 0} aria-label="第 8 题，阅读材料" onClick={() => setCurrent(0)} />
        <div><h3>阅读材料</h3><p className="question-number-page__description">阅读一段课堂评价材料，完成下面 3 道小题。</p></div>
      </div>
      <ol className="question-number-page__children">
        {children.map(({ number, feedback, label }) => <li key={number}>
          <QuestionNumber size={32} number={number} shape="circle" feedback={feedback} current={current === number}
            aria-label={`第 8 题，小题 ${number}，${label}`} onClick={() => setCurrent(number)} />
          <span className="question-number-page__caption" data-feedback={feedback}>小题 {number}</span>
        </li>)}
      </ol>
    </nav>
    <p className="question-number-page__status" role="status">当前查看第 8 题 · {current === 0 ? "阅读材料" : `小题 ${current}`}</p>
  </div>;
}

export function QuestionNumberPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [multiDigitCurrent, setMultiDigitCurrent] = useState(false);
  return <main className="question-number-page rain-type-ui-default" data-rain-id="question-number-page"
    data-asset-identity="local-experiment" data-rain-theme={theme}>
    <div className="question-number-page__content">
      <header className="question-number-page__hero">
        <Link href="#components">返回组件页</Link>
        <p className="question-number-page__eyebrow">RAIN NEXT · QUESTION NUMBER</p>
        <h1 id="question-number-title" tabIndex={-1}>题号按钮，定位与结果各自清楚</h1>
        <p>题号告诉你正在看哪道题，底部标识保留这道题的作答或批改结果。</p>
        <p className="question-number-page__description">首版 32 px · 视觉已验收</p>
        <p><Link href="/question-option-sizes.html">查看六档尺寸与密度</Link></p>
        <div className="question-number-page__theme" role="group" aria-label="预览主题">
          <span>预览主题</span>
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
        </div>
      </header>

      <Section id="question-number-results" title="当前位置与结果，同时保留" description="点击任意题号体验。蓝色实底表示当前正在查看，数字加粗且不加描边；切换当前位置不会改变底部结果。下方均按实际尺寸展示。">
        <FeedbackMatrix shape="square" />
        <FeedbackMatrix shape="circle" />
        <p className="question-number-page__description">“无结果”表示当前没有展示反馈，不能推断为未作答。“已作答”只表示已有回答，不表示答案正确。</p>
      </Section>

      <Section id="question-number-children" title="一道材料题，包含多个小题" description="圆角方形表示整道题或材料入口，圆形表示所属小题。材料与小题共用一个当前位置，结果由每道小题各自保留。">
        <ParentChildExample />
      </Section>

      <Section id="question-number-availability" title="多位题号与暂不可用" description="题号完整保留；暂不可用的题目无法点击，也不会进入键盘顺序。使用 Tab 聚焦、Enter 或空格打开可用题目。">
        <div className="question-number-page__row">
          <QuestionNumber size={32} number={108} data-testid="question-number-multi-digit" current={multiDigitCurrent} feedback="answered"
            aria-label="第 108 题，已作答" onClick={() => setMultiDigitCurrent(true)} />
          <span>多位题号</span>
          <QuestionNumber size={32} number={9} data-testid="question-number-disabled" disabled feedback="pending" aria-label="第 9 题，待批改，暂不可用" />
          <span>暂不可用</span>
        </div>
      </Section>

      <Section id="question-number-contract" title="使用与组合约定" description="默认直接使用完整样式。业务扩展按实际场景定制，本页不规定进度、异常等信息的位置或组合样式。">
        <dl className="question-number-page__contract">
          <div><dt>适合</dt><dd>题目导航、答题卡、学生结果回看、教师批改中的题目入口。</dd></div>
          <div><dt>另行使用</dt><dd>A / B / C / D 的答案选择属于选项按钮；题号按钮不承担答案选择行为。</dd></div>
          <div><dt>基础属性</dt><dd><code>number</code> 提供完整题号；<code>shape</code> 区分方形与圆形；<code>current</code> 表示当前位置；<code>feedback</code> 提供一项主要反馈。</dd></div>
          <div><dt>结构与修改</dt><dd><code>root / control / label / feedback</code>。局部变化通过具名 <code>localRecipe</code> 调整已声明部位；<code>className</code> 只承担外部布局。</dd></div>
          <div><dt>业务扩展</dt><dd>进度、异常等信息可以在视觉上整合进题号按钮，也可以采用其他组合。由业务按需定制，保留题号身份、当前位置和结果反馈的明确含义。</dd></div>
          <div><dt>尺寸</dt><dd>size 支持 20 / 24 / 28 / 32 / 36 / 40，默认 28；本页显式保留 32px 基准。密度仅调整外围留白，圆形小题使用相同尺寸配方。</dd></div>
          <div><dt>可访问性</dt><dd>为重复的小题号补充所属题目名称；当前位置使用 <code>aria-current="step"</code>。结果同时提供可读名称；有多个操作时保留清楚的操作目标，避免嵌套按钮。</dd></div>
        </dl>
        <pre className="question-number-page__code"><code>{`<QuestionNumber\n  size={32}\n  number={8}\n  current={currentQuestion === 8}\n  feedback="pending"\n  aria-label="第 8 题，待批改"\n  onClick={() => setCurrentQuestion(8)}\n/>`}</code></pre>
        <p className="question-number-page__description">样式参考：<Link href="https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e?node-id=2761-19654">已确认的题号与底部反馈设计</Link>。颜色、字重、间距、圆角和线条采用现有 Rain Token；图形通过图库入口使用。</p>
      </Section>
    </div>
  </main>;
}
