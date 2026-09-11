import { useRef, useState } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, Checkbox, CheckboxGroup, Link } from "@rain-next/ui";
import "./checkbox-page.css";

const defaults = ["locked", "outside", "homework"];
const options = [
  { value: "locked", label: "接收安全通知", description: "由管理员统一开启，当前不可修改。", disabled: true },
  { value: "homework", label: "作业提醒", description: "发布作业和临近截止时通知我。" },
  { value: "class", label: "课堂提醒", description: "上课前提醒，课程时间调整时也会通知。" },
];
export function CheckboxPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [density, setDensity] = useState<Density>("default");
  const [checked, setChecked] = useState(false), [mixed, setMixed] = useState(true);
  const [changes, setChanges] = useState(0), [draft, setDraft] = useState<readonly string[]>(defaults);
  const [submitted, setSubmitted] = useState<string[] | null>(null);
  const [requiredValue, setRequiredValue] = useState<string[]>([]), [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState(false), groupRef = useRef<HTMLFieldSetElement>(null);
  return <DensityProvider density={density}>
    <main data-rain-id="checkbox-page" data-asset-identity="local-experiment" data-maturity="prototype-ready"
      data-rain-theme={theme} className="core-ui-shell checkbox-page">
      <header className="flex flex-col gap-rain-12">
        <Link href="#components">返回组件</Link>
        <h1 id="checkbox-title" tabIndex={-1} className="m-rain-0 rain-type-page-title">Checkbox 多选框</h1>
        <p className="m-rain-0 rain-type-reading">选择一个或多个选项。说明文字与选框一起响应点击。</p>
        <div className="flex flex-wrap gap-rain-8" aria-label="预览设置">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
          <Button variant="text" aria-pressed={density === "compact"} onClick={() => setDensity(density === "default" ? "compact" : "default")}>紧凑密度</Button>
        </div>
      </header>
      <section className="core-family" aria-labelledby="checkbox-basic-title">
        <h2 id="checkbox-basic-title" className="m-rain-0 mb-rain-16 rain-type-section-title">基础与状态</h2>
        <div className="flex flex-col gap-rain-16">
          <Checkbox label="接收课程通知" description="仅在有新内容时通知，不会重复发送。"
            checked={checked} onCheckedChange={(value) => { setChecked(value); setChanges((count) => count + 1); }} />
          <p className="m-rain-0 text-rain-size-13 leading-rain-22" data-testid="callback-count">选择变化：{changes} 次</p>
          <Checkbox label="部分项目已选" description="半选状态；点击后转为普通勾选。"
            indeterminate={mixed} onCheckedChange={() => setMixed(false)} />
          <Checkbox label="不可选择" description="权限由管理员管理。需要修改时请联系管理员。" disabled />
          <Checkbox label="已选择且锁定" defaultChecked disabled />
        </div>
      </section>
      <section className="core-family" aria-labelledby="checkbox-form-title">
        <h2 id="checkbox-form-title" className="m-rain-0 mb-rain-16 rain-type-section-title">默认选择与表单重置</h2>
        <form aria-label="通知偏好表单" onSubmit={(event) => {
          event.preventDefault(); setSubmitted(new FormData(event.currentTarget).getAll("notice").map(String));
        }} onReset={(event) => {
          const native = event.nativeEvent;
          queueMicrotask(() => { if (!native.defaultPrevented) { setDraft(defaults); setSubmitted(null); } });
        }}>
          <CheckboxGroup legend="通知偏好" help="可以多选。安全通知保持开启。" name="notice" options={options}
            defaultValue={defaults} onValueChange={setDraft} />
          <div className="mt-rain-16 flex flex-wrap gap-rain-8">
            <Button type="submit">读取表单值</Button><Button type="reset" variant="secondary">重置偏好</Button>
          </div>
          <p data-testid="draft-values" className="mb-rain-0 text-rain-size-13 leading-rain-22">保存的选择：{draft.join("、") || "无"}</p>
          <p data-testid="submitted-values" className="mb-rain-0 text-rain-size-13 leading-rain-22">本次表单值：{submitted === null ? "尚未读取" : submitted.join("、") || "无"}</p>
          <p className="mb-rain-0 text-rain-size-13 leading-rain-22">锁定项和当前未展示的项仍保留在选择数据中；原生表单只包含已勾选、可用且已展示的选项。</p>
        </form>
      </section>
      <section className="core-family" aria-labelledby="checkbox-required-title">
        <h2 id="checkbox-required-title" className="m-rain-0 mb-rain-16 rain-type-section-title">至少选择一项</h2>
        <form aria-label="分组校验表单" onSubmit={(event) => {
          event.preventDefault();
          const empty = requiredValue.length === 0; setInvalid(empty); setSaved(!empty);
          if (empty) groupRef.current?.querySelector<HTMLInputElement>('input:not(:disabled)')?.focus();
        }} onReset={(event) => {
          const native = event.nativeEvent;
          queueMicrotask(() => { if (!native.defaultPrevented) { setRequiredValue([]); setInvalid(false); setSaved(false); } });
        }}>
          <CheckboxGroup ref={groupRef} legend="学习内容" name="learning" required help="至少选择一项，可随时修改。"
            options={[{ value: "lesson", label: "课程内容" }, { value: "practice", label: "课后练习" }]}
            value={requiredValue} onValueChange={(value) => { setRequiredValue(value); setInvalid(false); setSaved(false); }}
            invalid={invalid} message={invalid ? "请至少选择一项学习内容。" : undefined} />
          <div className="mt-rain-16 flex flex-wrap gap-rain-8">
            <Button type="submit">保存学习偏好</Button><Button type="reset" variant="secondary">清空学习偏好</Button>
          </div>
          <p role="status" className="mb-rain-0 text-rain-size-13 leading-rain-22">{saved ? "学习偏好已保存。" : ""}</p>
        </form>
      </section>
      <section className="core-family" aria-labelledby="checkbox-wrap-title">
        <h2 id="checkbox-wrap-title" className="m-rain-0 mb-rain-16 rain-type-section-title">长文本与空列表</h2>
        <Checkbox label="当课程内容更新、课后练习发布或学习计划发生调整时，通过站内消息提醒我"
          description="标题自然换行，选框保持在首行位置。VeryLongUnbrokenNotificationPreferenceForResponsiveLayoutVerification" />
        <div className="mt-rain-24">
          <CheckboxGroup legend="更多通知" options={[]} help="暂无可配置项目。" />
        </div>
      </section>
    </main>
  </DensityProvider>;
}
