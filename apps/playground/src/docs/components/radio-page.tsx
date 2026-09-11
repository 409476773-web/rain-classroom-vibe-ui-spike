import { useState } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, Link, Radio, RadioGroup } from "@rain-next/ui";
import "./radio-page.css";

const publishOptions = [
  { value: "now", label: "立即发布", description: "发布后，学生即可查看课程内容。" },
  { value: "scheduled", label: "定时发布", description: "在预定时间自动发布。" },
  { value: "review", label: "审核后发布", description: "当前课程暂未开启审核流程。", disabled: true },
];
export function RadioPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light"), [density, setDensity] = useState<Density>("default");
  const [appearance, setAppearance] = useState<string | null>("title"), [changes, setChanges] = useState(0);
  const [submitted, setSubmitted] = useState<string | null>(null), [requiredValue, setRequiredValue] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false), [saved, setSaved] = useState(false);
  return <DensityProvider density={density}>
    <main data-rain-id="radio-page" data-asset-identity="local-experiment" data-maturity="prototype-ready"
      data-rain-theme={theme} className="core-ui-shell radio-page">
      <header className="flex flex-col gap-rain-12">
        <Link href="#components">返回组件</Link>
        <h1 id="radio-title" tabIndex={-1} className="m-rain-0 rain-type-page-title">Radio 单选框</h1>
        <p className="m-rain-0 rain-type-reading">从一组选项中选择一项。点击标题或说明均可选择，方向键可以切换。</p>
        <div className="flex flex-wrap gap-rain-8" aria-label="预览设置">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
          <Button variant="text" aria-pressed={density === "compact"} onClick={() => setDensity(density === "default" ? "compact" : "default")}>紧凑密度</Button>
        </div>
      </header>
      <section className="core-family" aria-labelledby="radio-basic-title">
        <h2 id="radio-basic-title" className="m-rain-0 mb-rain-16 rain-type-section-title">基础与状态</h2>
        <div className="flex flex-col gap-rain-16">
          <RadioGroup legend="课程展示" value={appearance} onValueChange={(value) => { setAppearance(value); setChanges((count) => count + 1); }}
            options={[{ value: "title", label: "仅展示标题", description: "适合快速浏览课程列表。" }, { value: "summary", label: "展示标题和简介", description: "同时展示课程概要，便于了解学习内容。" }]} />
          <p data-testid="callback-count" className="m-rain-0 text-rain-size-13 leading-rain-22">选择变化：{changes} 次</p>
          <Radio name="disabled-choice" value="unavailable" label="不可选择" description="当前权限不支持此选项。" checked={false} disabled onCheckedChange={() => {}} />
          <Radio name="locked-choice" value="locked" label="已选择且锁定" checked disabled onCheckedChange={() => {}} />
        </div>
      </section>
      <section className="core-family" aria-labelledby="radio-form-title">
        <h2 id="radio-form-title" className="m-rain-0 mb-rain-16 rain-type-section-title">默认选择与表单重置</h2>
        <form aria-label="发布方式表单" onSubmit={(event) => {
          event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("publish") ?? "无"));
        }} onReset={(event) => {
          const native = event.nativeEvent;
          queueMicrotask(() => { if (!native.defaultPrevented) setSubmitted(null); });
        }}>
          <RadioGroup legend="发布方式" name="publish" options={publishOptions} defaultValue="now" help="只选择一种发布方式。" />
          <div className="mt-rain-16 flex flex-wrap gap-rain-8">
            <Button type="submit">读取表单值</Button><Button type="reset" variant="secondary">重置发布方式</Button>
          </div>
          <p data-testid="submitted-values" className="mb-rain-0 text-rain-size-13 leading-rain-22">本次表单值：{submitted ?? "尚未读取"}</p>
        </form>
      </section>
      <section className="core-family" aria-labelledby="radio-required-title">
        <h2 id="radio-required-title" className="m-rain-0 mb-rain-16 rain-type-section-title">必选与分组校验</h2>
        <form aria-label="评价方式表单" noValidate onSubmit={(event) => {
          event.preventDefault(); const valid = event.currentTarget.checkValidity(); setInvalid(!valid); setSaved(valid);
          if (!valid) event.currentTarget.querySelector<HTMLInputElement>('input:enabled')?.focus();
        }} onReset={(event) => {
          const native = event.nativeEvent;
          queueMicrotask(() => { if (!native.defaultPrevented) { setRequiredValue(null); setInvalid(false); setSaved(false); } });
        }}>
          <RadioGroup legend="评价方式" name="evaluation" required value={requiredValue} orientation="horizontal"
            onValueChange={(value) => { setRequiredValue(value); setInvalid(false); setSaved(false); }}
            options={[{ value: "score", label: "分数评价" }, { value: "level", label: "等级评价" }, { value: "comment", label: "文字评价" }]}
            help="请选择一种评价方式。" invalid={invalid} message={invalid ? "请先选择评价方式。" : undefined} />
          <div className="mt-rain-16 flex flex-wrap gap-rain-8">
            <Button type="submit">保存评价方式</Button><Button type="reset" variant="secondary">清空评价方式</Button>
          </div>
          <p role="status" className="mb-rain-0 text-rain-size-13 leading-rain-22">{saved ? "评价方式已保存。" : ""}</p>
        </form>
      </section>
      <section className="core-family" aria-labelledby="radio-wrap-title">
        <h2 id="radio-wrap-title" className="m-rain-0 mb-rain-16 rain-type-section-title">长文本、整组禁用与空列表</h2>
        <RadioGroup legend="课程提醒" options={[
          { value: "all", label: "当课程内容更新、课后练习发布或学习计划发生调整时，通过站内消息提醒我", description: "标题自然换行，单选框保持在首行位置。VeryLongUnbrokenNotificationPreferenceForResponsiveLayoutVerification" },
          { value: "important", label: "仅提醒重要变更" },
        ]} />
        <div className="mt-rain-24"><fieldset disabled className="m-rain-0 p-rain-0 border-none min-w-rain-0">
          <RadioGroup legend="由管理员配置" defaultValue="now" options={publishOptions} />
        </fieldset></div>
        <div className="mt-rain-24"><RadioGroup legend="更多设置" options={[]} help="暂无可配置项目。" /></div>
      </section>
    </main>
  </DensityProvider>;
}
