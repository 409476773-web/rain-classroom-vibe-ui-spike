import { useRef, useState, type FormEvent } from "react";
import { Grid, Stack } from "@rain-next/layouts";
import { Button, FormItem, Input, InputNumber, Select, Textarea, type SelectHandle, type SelectValue } from "@rain-next/ui";

type FieldName = "title" | "course" | "points";
const clearErrors = { title: "", course: "", points: "" };
const sectionStyle = { margin: 0, padding: 0, border: 0, minWidth: 0 };
const legendStyle = { padding: 0, marginBottom: "var(--rain-space-16)", fontSize: "var(--rain-font-size-16)", lineHeight: "var(--rain-line-height-24)", fontWeight: "var(--rain-font-weight-semibold)" };

/** Local example host; replace local save with the application's persistence adapter. */
type Settings = { title: string; course: SelectValue; points: number; note: string };
const localSave = async (_settings: Settings) => { await new Promise(resolve => setTimeout(resolve, 400)); };
export function SectionedFormExample({ onSave = localSave, disabled = false }: { onSave?: (settings: Settings) => Promise<void>; disabled?: boolean } = {}) {
  const inFlight = useRef(false);
  const [loading, setLoading] = useState(false), [failure, setFailure] = useState("");
  const locked = disabled || loading;
  const [title, setTitle] = useState("第五讲案例分析");
  const [course, setCourse] = useState<SelectValue | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [note, setNote] = useState("请结合课堂案例，说明判断及其依据。");
  const [errors, setErrors] = useState(clearErrors);
  const [saved, setSaved] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const courseRef = useRef<SelectHandle>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  function edit(field?: FieldName) {
    setSaved("");
    if (field) setErrors(current => ({ ...current, [field]: "" }));
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || inFlight.current) return;
    const next = {
      title: title.trim() ? "" : "请输入作业名称。",
      course: course === null ? "请选择所属课程。" : "",
      points: points !== null && Number.isInteger(points) && points >= 1 && points <= 200 && pointsRef.current?.validity.valid
        ? "" : "请输入 1–200 之间的整数满分。",
    };
    setErrors(next); setSaved("");
    if (next.title) titleRef.current?.focus();
    else if (next.course) courseRef.current?.focus();
    else if (next.points) pointsRef.current?.focus();
    else {
      const payload = { title: title.trim(), course: course!, points: points!, note };
      inFlight.current = true; setLoading(true); setFailure("");
      try { await onSave(payload); setSaved(`《${payload.title}》已保存到当前页面，满分 ${payload.points} 分。`); }
      catch { setFailure("保存失败，已保留全部输入，请重试。"); }
      finally { inFlight.current = false; setLoading(false); }
    }
  }
  return <form aria-label="分区作业设置" noValidate onSubmit={save}>
      <style>{`.rain-settings-readable-select:not([data-permission="disabled"]) [data-slot="control"][data-placeholder] [data-slot="value"] > span { color: var(--rain-category-text-neutral-3); }`}</style>
      <Stack gap={24}>
        <p style={{ margin: 0 }}>本地模拟保存；刷新后恢复初始内容。</p>
        <fieldset style={sectionStyle}>
          <legend style={legendStyle}>基本信息</legend>
          <Grid columns={2} minColumnWidth={240} gap={16}>
            <FormItem label="作业名称" required status={errors.title ? "error" : "default"} message={errors.title || undefined}>
              <Input disabled={locked} ref={titleRef} size={36} value={title} onValueChange={value => { setTitle(value); edit("title"); }} />
            </FormItem>
            <FormItem label="所属课程" required status={errors.course ? "error" : "default"} message={errors.course || undefined}>
              <Select className="rain-settings-readable-select" disabled={locked} ref={courseRef} size={36} value={course} placeholder="请选择课程" options={[{ value: "ai", label: "人工智能导论" }, { value: "design", label: "设计研究方法" }]}
                onValueChange={value => { setCourse(value); edit("course"); }} />
            </FormItem>
          </Grid>
        </fieldset>
        <fieldset style={sectionStyle}>
          <legend style={legendStyle}>评分与要求</legend>
          <Stack gap={16}>
            <FormItem label="满分" required help="当前本地示例允许 1–200 分，业务范围由应用决定。" status={errors.points ? "error" : "default"} message={errors.points || undefined}>
              <InputNumber disabled={locked} ref={pointsRef} size={36} value={points} min={1} max={200} precision={0} suffixText="分"
                onChange={() => edit("points")} onValueChange={value => { setPoints(value); edit("points"); }} />
            </FormItem>
            <FormItem label="作业说明" help="说明提交内容和判断依据。">
              <Textarea disabled={locked} rows={3} value={note} onValueChange={value => { setNote(value); edit(); }} />
            </FormItem>
          </Stack>
        </fieldset>
        {failure && <p role="alert">{failure}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "var(--rain-space-12)" }}>
          <p role="status" aria-label="分区表单保存结果" style={{ margin: 0 }}>{saved || (Object.values(errors).some(Boolean) ? "请修正标出的字段，已保留全部输入。" : "填写完成后统一保存。")}</p>
          <Button disabled={disabled} loading={loading} type="submit" variant="primary" size="medium">保存设置</Button>
        </div>
      </Stack>
    </form>;
}
