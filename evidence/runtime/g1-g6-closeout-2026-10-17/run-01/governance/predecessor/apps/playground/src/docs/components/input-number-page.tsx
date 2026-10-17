import { useRef, useState } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Button, FormItem, Input, InputNumber, Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableScrollArea, type InputAppearance, type InputSize } from "@rain-next/ui";
import "./input-number-page.css";

const appearances = [{ value: "outlined", label: "描边" }, { value: "filled", label: "填充" }, { value: "underlined", label: "底线" }] as const;
const sizes: InputSize[] = [24, 28, 32, 36];
const fullScore = 10;
export function InputNumberPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [appearance, setAppearance] = useState<InputAppearance>("outlined");
  const [controlsLayout, setControlsLayout] = useState<"split" | "stacked">("split");
  const [result, setResult] = useState("尚未保存");
  const form = useRef<HTMLFormElement>(null);
  return <main className="number-page rain-type-ui-default" data-rain-theme={theme}>
    <div className="number-page__content">
      <header className="number-page__stack">
        <Link href="#components">返回组件总览</Link>
        <h1 id="input-number-title" tabIndex={-1} className="rain-type-heading-page">InputNumber 数字输入框</h1>
        <p>保留左右加减与传统右侧箭头两种形态。与 Input 共用字段外观、尺寸和状态，默认使用适合短数值的宽度。</p>
        <div className="number-page__row" role="group" aria-label="预览主题">
          {(["light", "dark"] as const).map(item => <Button key={item} variant={theme === item ? "primary" : "secondary"} aria-pressed={theme === item} onClick={() => setTheme(item)}>{item === "light" ? "浅色" : "深色"}</Button>)}
        </div>
      </header>
      <section aria-labelledby="number-compare-title">
        <h2 id="number-compare-title" className="rain-type-heading-section">同一套字段语言</h2>
        <p>左右加减版居中显示数值；传统版左对齐，悬停或聚焦时显示右侧上下箭头。分值示例采用重要数字样式：特殊数字字体、固定粗体，字号保持一致。</p>
        <div className="number-page__matrix" data-testid="appearance-matrix">
          {appearances.map(({ value, label }) => <div className="number-page__panel" key={value} data-appearance={value}>
            <h3 className="rain-type-heading-section">{label}</h3>
            <FormItem label={`${label} · Input`}><Input appearance={value} defaultValue="人工智能导论" clearable={false} /></FormItem>
            <FormItem label={`${label} · 数量`}><InputNumber appearance={value} defaultValue={3} min={0} /></FormItem>
            <FormItem label={`${label} · 传统数值`}><InputNumber controlsLayout="stacked" appearance={value} defaultValue={3} min={0} /></FormItem>
            <FormItem label={`${label} · 分值`}><InputNumber keyData controlsLayout="stacked" appearance={value} defaultValue={2.5} min={0} max={fullScore} step={0.5} suffixText={`/${fullScore}分`} /></FormItem>
          </div>)}
        </div>
      </section>
      <section className="number-page__stack" aria-labelledby="number-grading-title">
        <h2 id="number-grading-title" className="rain-type-heading-section">打分时显示满分</h2>
        <p>例如 2.5 /10分：左侧填写得分，右侧固定显示满分。得分使用强调数字字体；清空得分后，满分仍然可见。</p>
        <div className="number-page__grid number-page__panel" data-testid="grading-examples">
          {(["split", "stacked"] as const).map(layout => <FormItem key={layout} label={`${layout === "split" ? "左右加减" : "传统箭头"} · 得分`} help={`满分 ${fullScore} 分，超出后保留输入并提示错误。`}>
            <InputNumber keyData controlsLayout={layout} appearance={appearance} defaultValue={2.5} min={0} max={fullScore} step={0.5} precision={1} suffixText={`/${fullScore}分`} placeholder="—" />
          </FormItem>)}
        </div>
      </section>
      <section className="number-page__stack" aria-labelledby="number-example-title">
        <h2 id="number-example-title" className="rain-type-heading-section">试一试填写与保存</h2>
        <div className="number-page__row" role="group" aria-label="示例外观">
          {appearances.map(({ value, label }) => <Button key={value} variant={appearance === value ? "primary" : "secondary"} aria-pressed={appearance === value} onClick={() => setAppearance(value)}>{label}</Button>)}
        </div>
        <div className="number-page__row" role="group" aria-label="操作按钮布局">
          {(["split", "stacked"] as const).map(layout => <Button key={layout} variant={controlsLayout === layout ? "primary" : "secondary"} aria-pressed={controlsLayout === layout} onClick={() => setControlsLayout(layout)}>{layout === "split" ? "左右加减" : "右侧箭头"}</Button>)}
        </div>
        <form ref={form} aria-label="评分设置" className="number-page__panel" onSubmit={event => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setResult(`已保存：满分 ${data.get("score")} 分，权重 ${data.get("weight") || "未填写"}`);
        }} onReset={() => setResult("已重置")}>
          <div className="number-page__grid">
            <FormItem label="满分" required help="0–100 分，步长 0.5，最多 1 位小数。输入 120 后会保留并提示错误。">
              <InputNumber keyData controlsLayout={controlsLayout} name="score" defaultValue={12} min={0} max={100} step={0.5} precision={1} suffixText="分" clearable appearance={appearance} />
            </FormItem>
            <FormItem label="权重" help="选填；空白不会自动变成 0。">
              <InputNumber controlsLayout={controlsLayout} name="weight" min={0} max={100} precision={0} suffixText="%" clearable placeholder="—" appearance={appearance} />
            </FormItem>
          </div>
          <div className="number-page__row">
            <Button type="submit" variant="primary">保存设置</Button><Button type="reset" variant="secondary">重置</Button>
            <Button type="button" variant="text" onClick={() => form.current?.requestSubmit()}>程序提交</Button>
          </div>
          <p role="status" data-testid="save-result">{result}</p>
        </form>
      </section>
      <section aria-labelledby="number-width-title">
        <h2 id="number-width-title" className="rain-type-heading-section">按数值内容安排宽度</h2>
        <p>默认给数值预留约五位数字的空间，再加上实际单位和操作按钮的宽度；输入长短变化时，字段宽度保持稳定。需要与其他字段等宽时，再显式撑满所在列。</p>
        <div className="number-page__grid number-page__density">
          <FormItem label="默认紧凑宽度"><InputNumber appearance={appearance} defaultValue={3} /></FormItem>
          <FormItem label="传统紧凑宽度"><InputNumber controlsLayout="stacked" appearance={appearance} defaultValue={3} /></FormItem>
          <FormItem label="按需撑满"><InputNumber controlsLayout={controlsLayout} appearance={appearance} fullWidth defaultValue={12000} suffixText="元" /></FormItem>
        </div>
      </section>
      <section className="number-page__stack" aria-labelledby="number-embedded-title">
        <h2 id="number-embedded-title" className="rain-type-heading-section">嵌入表格与筛选栏</h2>
        <p>表格与筛选栏统一使用默认 32px 高度，与同排按钮对齐。传统版适合密集字段；触屏或频繁增减时，优先使用两侧的大按钮。</p>
        <div className="number-page__panel">
          <form className="number-page__row number-page__toolbar" aria-label="分值筛选条件" onSubmit={event => event.preventDefault()}>
            <span>分值范围</span>
            <FormItem label="最低分" labelPosition="inside"><InputNumber size={32} controlsLayout="stacked" appearance={appearance} min={0} max={100} placeholder="不限" /></FormItem>
            <span aria-hidden="true">—</span>
            <FormItem label="最高分" labelPosition="inside"><InputNumber size={32} controlsLayout="stacked" appearance={appearance} min={0} max={100} placeholder="不限" /></FormItem>
            <Button type="reset" size="small" variant="secondary">重置条件</Button>
          </form>
          <TableScrollArea aria-label="题目分值编辑示例">
            <Table>
              <TableHeader><TableRow><TableHead>题目</TableHead><TableHead>分值</TableHead></TableRow></TableHeader>
              <TableBody>{["随堂练习", "课后作业"].map((label, index) => <TableRow key={label}>
                <TableCell className="number-page__grade-cell"><span className="number-page__grade-label">{label}</span></TableCell>
                <TableCell className="number-page__grade-cell"><InputNumber controlsLayout="stacked" appearance={appearance} size={32} aria-label={`${label}分值`} defaultValue={index === 0 ? 5 : 10} min={0} max={100} suffixText="分" /></TableCell>
              </TableRow>)}</TableBody>
            </Table>
          </TableScrollArea>
        </div>
      </section>
      <section aria-labelledby="number-states-title">
        <h2 id="number-states-title" className="rain-type-heading-section">可修正的错误与操作权限</h2>
        <div className="number-page__grid">
          <FormItem label="超出上限" help="最多 100；减少一次变为 119，继续保留错误，增加不可用。"><InputNumber controlsLayout={controlsLayout} appearance={appearance} defaultValue={120} max={100} /></FormItem>
          <FormItem label="待核对" status="warning" message="建议确认本次班级人数"><InputNumber controlsLayout={controlsLayout} appearance={appearance} defaultValue={30} suffixText="人" /></FormItem>
          <FormItem label="只读" help="可选择、复制；调整按钮不可改值。"><InputNumber keyData controlsLayout={controlsLayout} appearance={appearance} defaultValue={3} readOnly suffixText="学分" /></FormItem>
          <FormItem label="禁用" disabled><InputNumber keyData controlsLayout={controlsLayout} appearance={appearance} defaultValue={3} suffixText="学分" /></FormItem>
          <FormItem label="直接填写" help="关闭按钮后保留相同的数值校验。"><InputNumber keyData controlsLayout={controlsLayout} appearance={appearance} defaultValue={12} controls={false} clearable suffixText="分钟" placeholder="请输入" /></FormItem>
          <FormItem label="学分" labelPosition="inside"><InputNumber controlsLayout={controlsLayout} appearance={appearance} defaultValue={3} step={0.5} /></FormItem>
        </div>
      </section>
      <section aria-labelledby="number-sizes-title">
        <h2 id="number-sizes-title" className="rain-type-heading-section">四档尺寸</h2>
        <div className="number-page__sizes">
          {sizes.map(size => <FormItem key={size} label={`${size}px`}><InputNumber keyData controlsLayout={controlsLayout} size={size} appearance={appearance} defaultValue={3} /></FormItem>)}
        </div>
        <div className="number-page__grid number-page__density">
          <DensityProvider density="compact"><FormItem label="紧凑密度 · 默认 24px"><InputNumber controlsLayout={controlsLayout} appearance={appearance} defaultValue={3} /></FormItem></DensityProvider>
          <FormItem label="常规密度 · 默认 32px"><InputNumber controlsLayout={controlsLayout} appearance={appearance} defaultValue={3} /></FormItem>
        </div>
      </section>
      <section className="number-page__stack" aria-labelledby="number-rules-title">
        <h2 id="number-rules-title" className="rain-type-heading-section">使用约定</h2>
        <p>数量、分数、百分比等需要数值运算的字段使用 InputNumber；学号、手机号、编号仍使用 Input。</p>
        <ul><li>越界与过多小数位保留原文并报错；失焦不会自动改为边界值或四舍五入。</li>
          <li>“−”“.”“−.” 保留为未完成输入，并阻止表单提交；“1.” 在结束编辑或提交时整理为 “1”。</li>
          <li>编辑期间保留 “001.50”；对外数值为 1.5，重新载入数值不承诺还原输入格式。</li>
          <li>上下键增减，滚轮不改值。清空默认关闭；启用后仅在悬停或聚焦时显示，普通状态隐藏。</li></ul>
        <p>重要数字可启用 keyData：数字固定为粗体数据字体，字号、行高与当前尺寸一致；单位、标签和提示文字保持常规样式。</p>
        <pre>{`const fullScore = 10;

<FormItem label="得分" required>
  <InputNumber name="score" min={0} max={fullScore}
    controlsLayout="stacked" keyData
    step={0.5} precision={1}
    suffixText={"/" + fullScore + "分"} />
</FormItem>`}</pre>
        <p>当前示例可用于视觉复核；组件尚未发布。</p>
      </section>
    </div>
  </main>;
}
