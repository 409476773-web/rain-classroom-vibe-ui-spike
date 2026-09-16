import { useEffect, useRef, useState } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, Checkbox, FormItem, Link, Textarea, type TextareaProps } from "@rain-next/ui";
import "./input-page.css";

const appearances = [{ value: "outlined", label: "描边" }, { value: "filled", label: "填充" }, { value: "underlined", label: "底线" }] as const;

function LongTextForm({ appearance }: Pick<TextareaProps, "appearance">) {
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState("");
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [failNext, setFailNext] = useState(false);
  const [notice, setNotice] = useState("填写课程说明后保存；刷新页面会清空本地样例。");
  const control = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  return <div className="input-page__grid" data-rain-id="textarea-long-text-form" data-asset-identity="local-experiment">
    <form className="input-page__column" aria-label="课程说明表单" noValidate aria-busy={saving}
      onReset={(event) => {
        event.preventDefault();
        if (saving) return;
        setDraft(saved); setError(undefined); setNotice("已取消修改，恢复到最近保存的内容。");
      }}
      onSubmit={(event) => {
        event.preventDefault();
        if (saving) return;
        if (!draft.trim()) { setError("请输入课程说明"); control.current?.focus(); return; }
        setSaving(true); setError(undefined); setNotice("正在模拟保存…");
        timer.current = setTimeout(() => {
          setSaving(false);
          if (failNext) { setFailNext(false); setNotice("保存失败，草稿已保留，请重试"); return; }
          setSaved(draft); setNotice("已保存到本地样例");
        }, 500);
      }}>
      <FormItem label="课程说明" help="介绍学习目标、课程内容与学习建议。支持换行，最多 1000 个字符（表情可能占多个字符）。" required disabled={saving}
        status={error ? "error" : "default"} message={error}>
        <Textarea ref={control} name="description" appearance={appearance} rows={6} maxLength={1000}
          placeholder="例如：本课程通过课堂讨论与实践项目，帮助你理解人工智能的基本方法。"
          value={draft} onValueChange={(value) => { setDraft(value); if (error) setError(undefined); }} />
      </FormItem>
      <Checkbox label="模拟下次保存失败" checked={failNext} disabled={saving} onCheckedChange={setFailNext} />
      <div className="input-page__row">
        <Button type="submit" variant="primary" loading={saving} disabled={saving}>保存说明</Button>
        <Button type="reset" variant="secondary" disabled={saving}>取消修改</Button>
      </div>
      <p role="status">{notice}</p>
    </form>
    <section className="input-page__column" aria-labelledby="textarea-saved-title">
      <h3 id="textarea-saved-title">已保存的说明</h3>
      <p className="whitespace-pre-wrap break-words rain-type-reading-small">{saved || "尚未保存"}</p>
    </section>
  </div>;
}

export function TextareaPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [density, setDensity] = useState<Density>("default");
  const [appearance, setAppearance] = useState<TextareaProps["appearance"]>("outlined");
  return <DensityProvider density={density}><main className="input-page rain-type-ui-default" data-rain-id="textarea-page" data-rain-theme={theme} data-density={density}>
    <div className="input-page__content">
      <header className="input-page__header">
        <Link href="#components">返回组件总览</Link>
        <h1 id="textarea-title" tabIndex={-1}>Textarea 多行输入</h1>
        <p>用于课程说明、作业要求和长篇反馈。支持多段编辑与纵向拖拽，标签和提示沿用现有字段规则。</p>
        <div className="input-page__row" role="group" aria-label="预览主题">
          {(["light", "dark"] as const).map((value) => <Button key={value} variant={theme === value ? "primary" : "secondary"} aria-pressed={theme === value} onClick={() => setTheme(value)}>{value === "light" ? "浅色" : "深色"}</Button>)}
        </div>
        <div className="input-page__row" role="group" aria-label="区域密度">
          {(["default", "compact"] as const).map((value) => <Button key={value} variant={density === value ? "primary" : "secondary"} aria-pressed={density === value} onClick={() => setDensity(value)}>{value === "default" ? "常规" : "紧凑"}</Button>)}
        </div>
        <div className="input-page__row" role="group" aria-label="多行输入外观">
          {appearances.map(({ value, label }) => <Button key={value} variant={appearance === value ? "primary" : "secondary"} aria-pressed={appearance === value} onClick={() => setAppearance(value)}>{label}</Button>)}
        </div>
      </header>
      <section aria-labelledby="textarea-form-title">
        <h2 id="textarea-form-title">长文本表单 · 课程说明</h2>
        <LongTextForm appearance={appearance} />
      </section>
      <section aria-labelledby="textarea-states-title">
        <h2 id="textarea-states-title">字段状态</h2>
        <div className="input-page__grid">
          <FormItem label="常规说明" help="可以换行，拖动右下角调整高度。"><Textarea appearance={appearance} placeholder="输入多段文字" /></FormItem>
          <FormItem label="待检查说明" status="warning" message="请确认内容是否完整。"><Textarea appearance={appearance} defaultValue="请在课前阅读材料，并准备一个讨论问题。" /></FormItem>
          <FormItem label="错误说明" status="error" message="请补充具体的学习目标。"><Textarea appearance={appearance} defaultValue="待完善" /></FormItem>
          <FormItem label="只读说明" help="内容可选择、复制。"><Textarea appearance={appearance} readOnly defaultValue={"课程资料由教务系统同步。\n如需调整，请联系课程负责人。"} /></FormItem>
          <FormItem label="禁用说明" disabled help="当前没有编辑权限。"><Textarea appearance={appearance} defaultValue="课程说明暂不可编辑。" /></FormItem>
        </div>
      </section>
      <section aria-labelledby="textarea-usage-title">
        <h2 id="textarea-usage-title">使用与组合</h2>
        <div className="input-page__column">
          <p>适用于多行纯文本。默认 4 行，可通过 rows 调整初始高度；右下角支持纵向拖拽，禁用时不可拖拽。文字保持左右 12px、上下 8px 留白。</p>
          <p>与 FormItem 组合时，字段统一提供标签、帮助、错误、必填和禁用状态。独立使用时，需要提供可访问名称。</p>
          <p>value / onValueChange 用于受控编辑，defaultValue 用于原生非受控编辑，二者择一。支持 name、ref、readOnly、maxLength 等原生属性；maxLength 按 UTF-16 计数，表情可能占多个单位。</p>
          <p>外框负责外观与焦点，control 负责原生编辑。表单宿主负责草稿、校验、保存与取消；内容仅在当前样例中保留，刷新后清空。</p>
        </div>
      </section>
      <p className="input-page__note">本地候选组件。角标与文字留白已完成视觉确认；其余视觉及共享字段颜色的对比度问题单独跟踪。</p>
    </div>
  </main></DensityProvider>;
}
