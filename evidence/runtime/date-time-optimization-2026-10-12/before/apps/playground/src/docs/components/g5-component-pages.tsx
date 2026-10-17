import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Button, Calendar, Checkbox, Combobox, DatePicker, Dialog, FormItem, Input, InputNumber, NativeSelect,
  Select, Sheet, Slider, Textarea, type DateRange, type SelectOption, type SliderRange,
} from "@rain-next/ui";
import { Stack, Grid } from "@rain-next/layouts";
import { ComponentDoc, DocExample, type DocProp } from "./component-doc";
import "./g5-component-pages.css";

export const g5Ids = ["label", "field", "input-group", "native-select", "combobox", "slider", "calendar", "date-picker"] as const;
export type G5ComponentId = typeof g5Ids[number];
const courses: readonly SelectOption[] = [
  { value: "ai", label: "人工智能导论", description: "计算机学院 · 2026 秋", group: "通识课程" },
  { value: "design", label: "设计研究方法", description: "设计学院 · 2026 秋", group: "专业课程" },
  { value: "data", label: "数据分析基础", description: "计算机学院 · 2026 秋", group: "专业课程" },
  { value: "archived", label: "已归档课程", group: "专业课程", disabled: true },
];
const october = new Date(2026, 9, 1);
const initialRange: DateRange = { from: new Date(2026, 9, 12, 9), to: new Date(2026, 9, 20, 18) };
const dateText = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const commonFieldProps: DocProp[] = [
  { name: "size / appearance / status", type: "24 | 28 | 32 | 36 / outlined | filled | underlined / default | warning | error", description: "沿用 Rain 字段尺寸、外观和状态；FormItem 可以统一传递状态。" },
  { name: "disabled / required", type: "boolean", description: "禁用与必填按真实控件语义使用，提供可见标签或可访问名称。" },
];
type Definition = { title: string; description: string; source: string; useWhen: string[]; avoidWhen: string[]; props: DocProp[]; code: string };
const definitions: Record<G5ComponentId, Definition> = {
  label: {
    title: "Label 字段标签", description: "清楚说明字段填写什么，让标签与对应的输入、选择和错误保持关联。",
    source: "packages/ui/src/input/form-item.tsx", useWhen: ["为输入或选择提供可见名称。", "标明必填，并让点击标签聚焦正确控件。"],
    avoidWhen: ["给已经拥有标签的 Checkbox 或 Radio 再加一层同义标签。", "把多个独立输入放进同一个 FormItem。"],
    props: [{ name: "FormItem.label / labelPosition", type: "ReactNode / top | inside", default: "top", description: "标签与字段关联，框内标签适用于已有单行输入和选择组合。" }],
    code: `import { FormItem, Input } from "@rain-next/ui";\nexport function Example() {\n  return <FormItem label="课程名称" required help="显示在学生的课程列表中。">\n    <Input name="course" size={36} defaultValue="人工智能导论" />\n  </FormItem>;\n}`,
  },
  field: {
    title: "Field 字段与校验", description: "用既有 FormItem 组织标签、控件、说明与反馈，再按填写任务组合完整表单。",
    source: "packages/ui/src/input/form-item.tsx", useWhen: ["编辑一个对象，多个字段最终统一保存。", "帮助和错误需要跟随对应字段。"],
    avoidWhen: ["把业务校验或提交状态塞进字段组件。", "为每个字段套一个 Card。"],
    props: [{ name: "label / help / message", type: "ReactNode", description: "标签、帮助和反馈分别与一个逻辑字段关联。" }, { name: "status / disabled / required", type: "FieldStatus / boolean / boolean", description: "传递字段状态；校验和保存由宿主持有。" }],
    code: `import { FormItem, Input } from "@rain-next/ui";\nimport { Grid } from "@rain-next/layouts";\nexport function Example() {\n  return <Grid columns={2} minColumnWidth={240} gap={16}>\n    <FormItem label="作业名称" required><Input size={36} defaultValue="第五讲案例分析" /></FormItem>\n    <FormItem label="说明" help="学生可见。"><Input size={36} placeholder="补充填写要求" /></FormItem>\n  </Grid>;\n}`,
  },
  "input-group": {
    title: "Input Group 输入组合", description: "行内信息继续使用 Input 插槽；多行输入让正文、字数与操作共享同一个外框。",
    source: "packages/ui/src/textarea/textarea.tsx", useWhen: ["评语、作业说明等长输入需要就近操作。", "输入内容与顶部提示、底部计数需要形成一组。"],
    avoidWhen: ["用新组合重做 SearchInput 或 InputNumber。", "在同一个字段身份下拼多个独立输入。"],
    props: [{ name: "blockStart / blockEnd", type: "ReactNode", description: "Textarea 顶部和底部的附加内容，保留单一外框。" }, { name: "blockStartChangesValue / blockEndChangesValue", type: "boolean", default: "true", description: "设为 false 的查看、复制动作可在只读字段中使用；禁用时全部阻止。" }],
    code: `import { useState } from "react";\nimport { Button, FormItem, Textarea } from "@rain-next/ui";\nexport function Example() {\n  const [value, setValue] = useState("");\n  return <FormItem label="评语"><Textarea value={value} onValueChange={setValue} rows={4} maxLength={280}\n    blockStart={<span>先肯定依据，再指出可改进之处。</span>}\n    blockEnd={<><span>{value.length} / 280</span><Button size="small" onClick={() => setValue("")}>清空</Button></>}\n  /></FormItem>;\n}`,
  },
  "native-select": {
    title: "Native Select 原生选择", description: "原生选择、键盘和表单能力配合 Rain 字段外观，适合简单、明确的选项。",
    source: "packages/ui/src/native-select/native-select.tsx", useWhen: ["简单单选需要原生表单提交与必填校验。", "保留设备与系统的原生选择体验。"],
    avoidWhen: ["需要候选搜索、远端状态或复杂选项说明。", "需要跨系统完全一致的展开面板。"],
    props: [...commonFieldProps, { name: "children / name / form", type: "option、optgroup / string / string", description: "保留原生选项与表单归属。" }, { name: "value / onValueChange", type: "string / (value: string) => void", description: "原生 value 使用字符串；原生 onChange 也保留。" }],
    code: `import { FormItem, NativeSelect } from "@rain-next/ui";\nexport function Example() {\n  return <FormItem label="作业类型" required><NativeSelect name="kind" defaultValue="practice" size={36}>\n    <option value="">请选择</option><optgroup label="课内任务">\n      <option value="practice">课堂练习</option><option value="report">案例报告</option>\n    </optgroup><option value="archived" disabled>已归档任务</option>\n  </NativeSelect></FormItem>;\n}`,
  },
  combobox: {
    title: "Combobox 输入式选择", description: "直接在字段中输入并选择候选；需要接受新文本时，通过明确的选项完成确认。",
    source: "packages/ui/src/combobox/combobox.tsx", useWhen: ["希望输入和候选选择发生在同一个字段中。", "业务明确允许接受已有列表之外的文本。"],
    avoidWhen: ["只是从弹层里搜索已有选项，现有 Select 已覆盖。", "因用户失焦就自动创建业务对象。"],
    props: [...commonFieldProps, { name: "options / selectedOption", type: "SelectOption[] / SelectOption", description: "复用选项的值、标签、分组、说明与禁用；保留远端已选元信息。" }, { name: "value / searchValue / open", type: "string | number | null / string / boolean", description: "选中值、查询文本与打开状态独立受控。" }, { name: "allowCustomValue / onValueChange", type: "boolean / (value, details) => void", default: "false", description: "明确选择新文本才提交，details.reason 区分 select、custom、clear。" }],
    code: `import { useState } from "react";\nimport { Combobox, FormItem } from "@rain-next/ui";\nexport function Example() {\n  const [value, setValue] = useState<string | number | null>(null);\n  return <FormItem label="课程主题"><Combobox value={value} onValueChange={setValue} allowCustomValue size={36}\n    options={[{ value: "evidence", label: "证据与判断" }, { value: "reasoning", label: "推理与论证" }]}\n    placeholder="选择主题，或输入新的主题" /></FormItem>;\n}`,
  },
  slider: {
    title: "Slider 数值滑块", description: "连续调节数值或双端范围，读数随操作更新，需要精确值时配合数值输入。",
    source: "packages/ui/src/slider/slider.tsx", useWhen: ["调节参数，拖动过程需要即时反馈。", "从连续数值中设定一个区间。"],
    avoidWhen: ["用滑块替代精确输入的唯一入口。", "把需要逐项解释的离散选项伪装为连续数值。"],
    props: [{ name: "range / value", type: "boolean / number | readonly [number, number]", default: "false", description: "单值与双端范围；端点相遇时停止，保持边界身份。" }, { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "有限上下限与正步长。" }, { name: "onValueChange / onValueCommitted", type: "(value, details) => void", description: "连续更新与操作结束分别回调，副作用留宿主。" }],
    code: `import { useState } from "react";\nimport { FormItem, InputNumber, Slider } from "@rain-next/ui";\nexport function Example() {\n  const [value, setValue] = useState(60);\n  return <><FormItem label="及格线"><Slider value={value} onValueChange={setValue} /></FormItem>\n    <InputNumber aria-label="精确及格线" value={value} min={0} max={100} precision={0}\n      onValueChange={next => { if (next !== null && next >= 0 && next <= 100) setValue(next); }} />\n  </>;\n}`,
  },
  calendar: {
    title: "Calendar 日历", description: "中文日期网格、年月导航与区间状态，直接嵌入页面或作为日期选择面板。",
    source: "packages/ui/src/calendar/calendar.tsx", useWhen: ["在页面中查看和选择单日或日期范围。", "需要成熟的日期键盘导航与禁用规则。"],
    avoidWhen: ["需要确认、取消与时分时，直接把日历事件当最终提交。", "自行重写月份计算与日期网格。"],
    props: [{ name: "mode / selected / onSelect", type: "single | range / DayPicker 对应类型", description: "沿用日期引擎选择语义，range 可以有未完成的结束日期。" }, { name: "disabled / month / numberOfMonths", type: "Matcher / Date / number", description: "禁用规则、当前月份与展示月数。" }, { name: "animate", type: "boolean", default: "true", description: "方向性月份切换，减少动态效果时关闭，键盘导航保留引擎焦点行为。" }],
    code: `import { useState } from "react";\nimport { Calendar } from "@rain-next/ui";\nexport function Example() {\n  const [selected, setSelected] = useState<Date>();\n  return <Calendar mode="single" selected={selected} onSelect={setSelected}\n    defaultMonth={new Date(2026, 9, 1)} disabled={{ dayOfWeek: [0, 6] }} />;\n}`,
  },
  "date-picker": {
    title: "Date Picker 日期与时间", description: "在面板里编辑日期与时分，确认后更新字段；取消或关闭会放弃未确认修改。",
    source: "packages/ui/src/date-picker/date-picker.tsx", useWhen: ["设置截止日期、开放时间或起止区间。", "需要检查选择结果后再明确提交。"],
    avoidWhen: ["需要自由输入日期字符串或复杂时区、秒级排班。", "把面板里每次选择都立即写入业务数据。"],
    props: [...commonFieldProps, { name: "mode / showTime", type: "single | range / boolean", default: "single / false", description: "单日、日期区间及各自的时分模式。" }, { name: "value / onValueChange", type: "Date | DateRange | null / callback", description: "公开区间必须完整，仅确定时提交；清空也经过确定。" }, { name: "minDate / maxDate / disabledDates", type: "Date / Date / Matcher", description: "无时间时按日比较，带时间时比较分钟，区间不跨禁用日期。" }],
    code: `import { useState } from "react";\nimport { DatePicker, FormItem, type DateRange } from "@rain-next/ui";\nexport function Example() {\n  const [value, setValue] = useState<DateRange | null>(null);\n  return <FormItem label="开放时间" required><DatePicker mode="range" showTime\n    value={value} onValueChange={setValue} size={36} /></FormItem>;\n}`,
  },
};

function LabelExamples() {
  return <>
    <DocExample title="标签与输入关联" description="点击课程名称进入输入；帮助与必填说明跟随同一个字段。">
      <div className="g5-panel"><FormItem label="课程名称" required help="显示在学生的课程列表中。"><Input size={36} defaultValue="人工智能导论" /></FormItem></div>
    </DocExample>
    <DocExample title="框内标签与自有标签" description="单行字段可以使用框内固定标签；勾选控件沿用自己的标签。">
      <div className="g5-panel"><Stack gap={16}><FormItem label="授课班级" labelPosition="inside"><Select size={36} options={[{ value: "a", label: "计算机 2401" }, { value: "b", label: "计算机 2402" }]} defaultValue="a" /></FormItem><Checkbox label="允许学生查看反馈" defaultChecked /></Stack></div>
    </DocExample>
  </>;
}

export function AssignmentSettingsExample() {
  const [title, setTitle] = useState("第五讲案例分析"), [course, setCourse] = useState<string | number | null>("ai");
  const [kind, setKind] = useState("report"), [note, setNote] = useState("结合课堂案例，说明你的判断及支持它的证据。"), [points, setPoints] = useState<number | null>(100);
  const [schedule, setSchedule] = useState<DateRange | null>(initialRange), [error, setError] = useState(""), [saved, setSaved] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) { setError("请输入作业名称。"); setSaved(""); titleRef.current?.focus(); return; }
    if (course === null || points === null || points <= 0 || !schedule) { setError("请补齐课程、满分和开放时间。"); setSaved(""); return; }
    setError(""); setSaved(`《${title.trim()}》设置已保存；满分 ${points} 分，${dateText(schedule.to)} 截止。`);
  }
  return <form className="g5-panel g5-form" aria-label="作业发布设置" onSubmit={save} noValidate>
    <div className="g5-task-heading"><h3>作业发布设置</h3><p>人工智能导论 · 第五讲</p></div>
    <Grid columns={2} minColumnWidth={240} gap={16}>
      <FormItem label="作业名称" required status={error && !title.trim() ? "error" : "default"} message={error && !title.trim() ? error : undefined}><Input ref={titleRef} size={36} value={title} onValueChange={next => { setTitle(next); setError(""); setSaved(""); }} /></FormItem>
      <FormItem label="作业类型"><NativeSelect size={36} name="kind" value={kind} onValueChange={setKind}><option value="report">案例报告</option><option value="practice">课堂练习</option><option value="discussion">讨论任务</option></NativeSelect></FormItem>
      <FormItem label="所属课程" required><Combobox size={36} options={courses} value={course} onValueChange={setCourse} /></FormItem>
      <FormItem label="满分" required><InputNumber size={36} fullWidth value={points} onValueChange={setPoints} min={1} max={200} precision={0} suffixText="分" /></FormItem>
    </Grid>
    <FormItem label="作业说明" help="说明学习目标、提交内容和判断依据。"><Textarea rows={3} value={note} onValueChange={setNote} maxLength={500} blockEnd={<span className="g5-count">{note.length} / 500</span>} /></FormItem>
    <FormItem label="开放时间" required help="起止时间都确认后，才更新当前设置。"><DatePicker mode="range" showTime size={36} value={schedule} onValueChange={setSchedule} /></FormItem>
    <div className="g5-form-footer"><p role="status">{saved || (error && title.trim() ? error : "保存后更新这份作业设置。")}</p><Button type="submit" variant="primary">保存设置</Button></div>
  </form>;
}

function FieldExamples() {
  return <>
    <DocExample title="按填写任务组织表单" description="短字段并排，长说明独占一行；日期和保存各自有明确的确认范围。"><AssignmentSettingsExample /></DocExample>
    <DocExample title="帮助、警告与错误" description="反馈就近出现；字段组仍用已有 Layout，字段身份各自独立。"><div className="g5-panel"><Grid columns={2} minColumnWidth={220} gap={16}>
      <FormItem label="班级人数" status="warning" message="当前分组建议每组 4–6 人。"><InputNumber size={36} fullWidth defaultValue={5} min={1} max={10} /></FormItem>
      <FormItem label="提交标题" status="error" message="请填写提交标题。" required><Input size={36} placeholder="例如：案例分析报告" /></FormItem>
    </Grid></div></DocExample>
  </>;
}

function InputGroupExamples() {
  const [value, setValue] = useState(""), [submitted, setSubmitted] = useState("");
  return <>
    <DocExample title="多行评语与就近操作" description="顶部提示、正文和底部操作共用外框；只有提交评语才显示提交结果。"><div className="g5-panel"><FormItem label="评语"><Textarea value={value} onValueChange={setValue} rows={4} maxLength={280} placeholder="写下具体观察与改进建议…"
      blockStart={<span className="g5-muted">先肯定依据，再指出可改进之处。</span>}
      blockEnd={<><span className="g5-count">{value.length} / 280</span><div className="g5-actions"><Button size="small" variant="text" onClick={() => setValue("")}>清空评语</Button><Button size="small" variant="primary" disabled={!value.trim()} onClick={() => setSubmitted(value)}>提交评语</Button></div></>} /></FormItem>
      <p className="g5-feedback" role="status" aria-label="评语提交结果">{submitted ? `已提交：${submitted}` : "尚未提交评语。"}</p></div></DocExample>
    <DocExample title="局部外观与未修改实例" description="同一输入组合改为填充外观，兄弟实例沿用默认外框。"><div className="g5-panel"><Grid columns={2} minColumnWidth={220} gap={16}>
      <FormItem label="填充外观"><Textarea appearance="filled" rows={3} defaultValue="注意区分事实与推断。" blockEnd={<span className="g5-count">评语模板</span>} /></FormItem>
      <FormItem label="未修改的输入组合"><Textarea rows={3} defaultValue="请说明你的判断依据。" blockEnd={<span className="g5-count">作业说明</span>} /></FormItem>
    </Grid></div></DocExample>
    <DocExample title="已有行内组合" description="单位、前缀和末尾动作继续使用 Input 的现有插槽。"><div className="g5-panel"><Input size={36} aria-label="课程地址" prefixText="rain.cn/" defaultValue="ai-introduction" suffixText="课程主页" /></div></DocExample>
  </>;
}

function NativeSelectExamples() {
  const [value, setValue] = useState("report"), [submitted, setSubmitted] = useState("");
  return <><DocExample title="原生选择与表单提交" description="值通过浏览器 FormData 读取，必填与键盘操作保留原生语义。"><form className="g5-panel g5-form" onSubmit={event => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("kind"))); }}>
    <FormItem label="任务类型" required><NativeSelect size={36} name="kind" value={value} onValueChange={setValue}><option value="">请选择任务类型</option><optgroup label="课内任务"><option value="report">案例报告</option><option value="practice">课堂练习</option></optgroup><option value="archived" disabled>已归档任务</option></NativeSelect></FormItem>
    <div className="g5-form-footer"><p role="status">{submitted ? `提交值：${submitted}` : "选择任务类型后提交。"}</p><Button type="submit" variant="primary">提交任务类型</Button></div>
  </form></DocExample><DocExample title="填充外观与禁用" description="收起态保持同一字段视觉，展开面板由当前设备与系统提供。"><div className="g5-panel"><Grid columns={2} minColumnWidth={220} gap={16}>
    <FormItem label="填充选择"><NativeSelect size={36} appearance="filled" defaultValue="all"><option value="all">全部学生</option><option value="active">在读学生</option></NativeSelect></FormItem>
    <FormItem label="禁用选择" disabled><NativeSelect size={36} defaultValue="all"><option value="all">全部学生</option></NativeSelect></FormItem>
  </Grid></div></DocExample></>;
}

function ComboboxExamples() {
  const [value, setValue] = useState<string | number | null>("ai"), [customValue, setCustomValue] = useState<string | number | null>(null), [reason, setReason] = useState("");
  const [failed, setFailed] = useState(true);
  return <>
    <DocExample title="输入并选择课程" description="候选提供分组与说明，输入保持焦点，方向键与 Enter 可以完成选择。"><div className="g5-panel"><FormItem label="检索课程" help="已归档课程不可选择。"><Combobox size={36} options={courses} value={value} onValueChange={setValue} clearable /></FormItem><p className="g5-feedback" role="status">{value === null ? "尚未选择课程。" : `已选：${courses.find(course => course.value === value)?.label ?? value}`}</p></div></DocExample>
    <DocExample title="允许明确接受新文本" description="输入新主题后，选择“使用此输入”；业务可以再保存主题或转换为自己的标识。"><div className="g5-panel"><FormItem label="课程主题"><Combobox size={36} allowCustomValue options={[{ value: "evidence", label: "证据与判断" }, { value: "reasoning", label: "推理与论证" }]} value={customValue} onValueChange={(next, details) => { setCustomValue(next); setReason(details.reason); }} placeholder="选择主题，或输入新的主题" /></FormItem><p className="g5-feedback" role="status">{customValue === null ? "尚未选择主题。" : `${reason === "custom" ? "已接受新主题" : "已选主题"}：${customValue}`}</p></div></DocExample>
    <DocExample title="失败恢复与局部外观" description="失败提示与重试属于当前候选列表；填充外观只影响此实例。"><div className="g5-panel"><Grid columns={2} minColumnWidth={220} gap={16}>
      <FormItem label="重试课程"><Combobox size={36} appearance="filled" options={courses} loadError={failed ? "课程暂时未载入。" : undefined} onRetry={() => setFailed(false)} /></FormItem>
      <FormItem label="默认外观的课程"><Combobox size={36} options={courses} defaultValue="design" /></FormItem>
    </Grid></div></DocExample>
  </>;
}

function SliderExamples() {
  const [pass, setPass] = useState(60), [range, setRange] = useState<SliderRange>([40, 90]), [committed, setCommitted] = useState("尚未调整范围。");
  return <><DocExample title="连续调整与精确输入" description="拖动与键盘即时更新读数，数值输入提供精确入口。"><div className="g5-panel"><div className="g5-slider-heading"><span>及格线</span><strong>{pass}<span className="g5-muted"> 分</span></strong></div><FormItem label="调整及格线"><Slider value={pass} onValueChange={setPass} /></FormItem><div className="g5-slider-input"><InputNumber aria-label="精确及格线" size={36} value={pass} onValueChange={next => { if (next !== null && next >= 0 && next <= 100) setPass(next); }} min={0} max={100} precision={0} suffixText="分" /></div></div></DocExample>
    <DocExample title="双端筛选范围" description="端点保持下限与上限身份；操作结束后，宿主可以提交筛选。"><div className="g5-panel"><div className="g5-slider-heading"><span>成绩区间</span><strong>{range[0]}–{range[1]}<span className="g5-muted"> 分</span></strong></div><FormItem label="筛选成绩"><Slider range value={range} onValueChange={setRange} onValueCommitted={next => setCommitted(`已确认筛选范围：${next[0]}–${next[1]} 分。`)} thumbLabels={["成绩下限", "成绩上限"]} /></FormItem><p className="g5-feedback" role="status">{committed}</p></div></DocExample>
    <DocExample title="默认、局部宽度与禁用" description="局部缩短布局宽度，保留相同滑块和焦点规则。"><div className="g5-panel"><Stack gap={24}><Slider aria-label="默认滑块" defaultValue={35} /><Slider aria-label="局部宽度滑块" defaultValue={70} className="g5-slider-short" /><Slider aria-label="禁用滑块" defaultValue={50} disabled /></Stack></div></DocExample>
  </>;
}

function CalendarExamples() {
  const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 9, 12));
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date } | undefined>({ from: new Date(2026, 9, 14), to: new Date(2026, 9, 20) });
  return <><DocExample title="选择一个日期" description="周一开始；年月下拉、前后月按钮与日期键盘导航共同工作。"><div className="g5-panel g5-calendar-panel"><Calendar mode="single" defaultMonth={october} selected={selected} onSelect={setSelected} /><p className="g5-feedback" role="status">{selected ? `已选：${dateText(selected)}` : "尚未选择日期。"}</p></div></DocExample>
    <DocExample title="区间状态与禁用日期" description="端点与中间日期有不同表达。此例禁用周末；需要最终确认时使用 Date Picker。"><div className="g5-panel g5-calendar-panel"><Calendar mode="range" defaultMonth={october} selected={range} onSelect={setRange} disabled={{ dayOfWeek: [0, 6] }} excludeDisabled /><p className="g5-feedback" role="status">{range?.from ? `${dateText(range.from)} 至 ${range.to ? dateText(range.to) : "待选择"}` : "选择开始日期。"}</p></div></DocExample>
  </>;
}

export function TeachingFilterExample() {
  const [course, setCourse] = useState<string | number | null>("ai"), [range, setRange] = useState<SliderRange>([60, 100]);
  const [period, setPeriod] = useState<DateRange | null>({ from: new Date(2026, 9, 1), to: new Date(2026, 9, 31) });
  const students = [{ id: "1", score: 86, course: "ai", date: new Date(2026, 9, 12) }, { id: "2", score: 72, course: "ai", date: new Date(2026, 9, 18) }, { id: "3", score: 54, course: "ai", date: new Date(2026, 9, 24) }, { id: "4", score: 91, course: "design", date: new Date(2026, 9, 20) }];
  const count = students.filter(student => (course === null || student.course === course) && student.score >= range[0] && student.score <= range[1]
    && (period === null || (student.date >= period.from && student.date <= period.to))).length;
  return <div className="g5-panel g5-form"><div className="g5-task-heading"><h3>教学数据筛选</h3><p>以下为本地课程样例数据。</p></div><Grid columns={2} minColumnWidth={240} gap={16}>
    <FormItem label="筛选课程"><Combobox size={36} options={courses} value={course} onValueChange={setCourse} clearable /></FormItem>
    <FormItem label="统计日期"><DatePicker mode="range" size={36} value={period} onValueChange={setPeriod} /></FormItem>
  </Grid><FormItem label={`成绩范围 ${range[0]}–${range[1]} 分`}><Slider range value={range} onValueChange={setRange} thumbLabels={["筛选成绩下限", "筛选成绩上限"]} /></FormItem>
    <div className="g5-filter-result" role="status"><strong>{count}</strong><span>位学生符合当前筛选</span><p>{period ? `${dateText(period.from)} 至 ${dateText(period.to)}` : "未限定统计日期"}</p></div>
  </div>;
}

function DatePickerExamples() {
  const [single, setSingle] = useState<Date | null>(new Date(2026, 9, 20)), [dateTime, setDateTime] = useState<Date | null>(new Date(2026, 9, 20, 18));
  const [range, setRange] = useState<DateRange | null>(initialRange), [dates, setDates] = useState<DateRange | null>(null);
  return <><DocExample title="单日与带时分的单日" description="字段显示已确认值，面板中的修改在确定前保持为草稿。"><div className="g5-panel"><Grid columns={2} minColumnWidth={240} gap={16}>
    <FormItem label="截止日期"><DatePicker size={36} value={single} onValueChange={setSingle} /></FormItem>
    <FormItem label="截止时间"><DatePicker size={36} showTime value={dateTime} onValueChange={setDateTime} /></FormItem>
  </Grid></div></DocExample><DocExample title="日期区间与日期时间区间" description="宽屏并排展示连续两个月，窄屏切换单月；时分使用现有数值输入。取消、外点或 Escape 放弃草稿。"><div className="g5-panel"><Stack gap={20}>
    <FormItem label="开放时间" required><DatePicker size={36} mode="range" showTime value={range} onValueChange={setRange} /></FormItem>
    <FormItem label="日期区间"><DatePicker size={36} mode="range" value={dates} onValueChange={setDates} defaultMonth={october} /></FormItem>
  </Stack></div></DocExample><DocExample title="在筛选区组合使用" description="课程与成绩即时改变结果；统计日期按面板确认后的值更新。"><TeachingFilterExample /></DocExample>
    <DocExample title="在对话框和侧栏中编辑" description="日期面板先处理自己的关闭，再回到当前编辑任务。"><div className="g5-panel"><Grid columns={2} minColumnWidth={240} gap={16}>
      <Dialog.Root><Dialog.Trigger render={<Button variant="secondary">对话框设置日期</Button>} /><Dialog.Content>
        <Dialog.Header><Dialog.Title>作业日期设置</Dialog.Title><Dialog.Description>只在日期面板确定后更新日期。</Dialog.Description></Dialog.Header>
        <Dialog.Body><FormItem label="对话框截止日期"><DatePicker size={36} value={single} onValueChange={setSingle} /></FormItem></Dialog.Body>
        <Dialog.Footer><Dialog.Close render={<Button variant="primary">完成日期设置</Button>} /></Dialog.Footer>
      </Dialog.Content></Dialog.Root>
      <Sheet.Root><Sheet.Trigger render={<Button variant="secondary">侧栏设置时间</Button>} /><Sheet.Portal><Sheet.Backdrop /><Sheet.Content>
        <Sheet.Header><Sheet.Title>作业时间设置</Sheet.Title><Sheet.Description>只在日期面板确定后更新时间。</Sheet.Description></Sheet.Header>
        <Sheet.Body><FormItem label="侧栏截止时间"><DatePicker size={36} showTime value={dateTime} onValueChange={setDateTime} /></FormItem></Sheet.Body>
        <Sheet.Footer><Sheet.Close render={<Button variant="primary">完成时间设置</Button>} /></Sheet.Footer>
      </Sheet.Content></Sheet.Portal></Sheet.Root>
    </Grid></div></DocExample>
  </>;
}

const examples: Record<G5ComponentId, () => ReactNode> = {
  label: LabelExamples, field: FieldExamples, "input-group": InputGroupExamples, "native-select": NativeSelectExamples,
  combobox: ComboboxExamples, slider: SliderExamples, calendar: CalendarExamples, "date-picker": DatePickerExamples,
};

export function G5ComponentPage({ component }: { component: G5ComponentId }) {
  const definition = definitions[component], Example = examples[component];
  return <ComponentDoc id={component} {...definition} category="G5 · 表单与日期" status={component === "label" || component === "field" ? "复用现有字段能力 · 当前用法待审阅" : "共享候选 · 视觉与体验待审阅"}>
    <Example />
    <details className="g5-source-note"><summary>来源、复用关系与当前边界</summary><p>字段、输入、按钮、菜单和浮层使用现有 Rain 部件。新增部分适配固定版本的 shadcn Base UI 源码与 Nova 样式；日历交互与月份切换使用 DayPicker 9.13.2。自动检查、人工视觉接受和发布分别记录。</p><p>调用示例使用公开入口；完整接入关系见 docs/ai/g5-components.md 与 registry/g5-assets.json。</p></details>
  </ComponentDoc>;
}
