import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Button, DatePicker, FormItem, InputNumber, type DatePickerPreset, type DateRange } from "@rain-next/ui";
import { Grid, Inline } from "@rain-next/layouts";

const minute = 60_000;
const pad = (value: number) => String(value).padStart(2, "0");
const dayText = (value: Date) => `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
const timeText = (value: Date) => `${pad(value.getHours())}:${pad(value.getMinutes())}`;
export const dateTimeText = (value: Date) => `${dayText(value)} ${timeText(value)}`;
export const dateAt = (now: Date, days: number, hour: number, minutes = 0) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + days, hour, minutes);

export function localTimeZoneText() {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return `本机时间（${zone || "浏览器当前时区"}${zone === "Asia/Shanghai" ? " · 北京时间" : ""}）`;
}

export function useFutureMinute() {
  const [timestamp, setTimestamp] = useState(() => (Math.floor(Date.now() / minute) + 1) * minute);
  const refresh = useCallback(() => setTimestamp((Math.floor(Date.now() / minute) + 1) * minute), []);
  const minimum = useMemo(() => new Date(timestamp), [timestamp]);
  useEffect(() => {
    const timer = window.setTimeout(refresh, Math.max(1, timestamp - Date.now()));
    return () => window.clearTimeout(timer);
  }, [timestamp, refresh]);
  useEffect(() => {
    const resume = () => { if (!document.hidden) refresh(); };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", resume);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [refresh]);
  return { minimum, refresh };
}

export const homeworkDeadlinePresets: readonly DatePickerPreset<Date>[] = [
  { label: "今天 23:59", getValue: now => dateAt(now, 0, 23, 59) },
  { label: "明天 23:59", getValue: now => dateAt(now, 1, 23, 59) },
  { label: "一周后 23:59", getValue: now => dateAt(now, 7, 23, 59) },
];

const durationPresets = [30, 60, 90, 120] as const;
const timeRangeExamples: readonly { label: string; getValue: (now: Date) => DateRange }[] = [
  { label: "同日 90 分钟", getValue: now => ({ from: dateAt(now, 1, 9), to: dateAt(now, 1, 10, 30) }) },
  { label: "跨午夜", getValue: now => ({ from: dateAt(now, 1, 23), to: dateAt(now, 2, 1) }) },
  { label: "跨月时段", getValue: now => {
    let from = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23);
    if (from <= now) from = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23);
    return { from, to: new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1, 1) };
  } },
];

function durationText(minutes: number) {
  const hours = Math.floor(minutes / 60), rest = minutes % 60;
  return hours ? `${hours} 小时${rest ? ` ${rest} 分钟` : ""}` : `${rest} 分钟`;
}

function rangeText(range: DateRange) {
  const nextDay = dateAt(range.from, 1, 0);
  const sameDay = dayText(range.from) === dayText(range.to);
  const tomorrow = dayText(nextDay) === dayText(range.to);
  return `${dateTimeText(range.from)} → ${sameDay ? timeText(range.to) : `${dateTimeText(range.to)}${tomorrow ? "（次日）" : ""}`}`;
}

function windowError(range: DateRange | null, now: Date) {
  if (!range) return "请选择完整的开放时间。";
  if (range.from < now) return "开放时间已经过去，请重新选择。";
  if (range.to.getTime() - range.from.getTime() < minute) return "结束时间需至少晚于开始时间 1 分钟。";
  return "";
}

export function ExamTimeSettingsExample() {
  const [windowValue, setWindowValue] = useState<DateRange | null>(() => ({ from: dateAt(new Date(), 1, 9), to: dateAt(new Date(), 1, 11) }));
  const [answerMinutes, setAnswerMinutes] = useState<number | null>(60);
  const [answerInputValid, setAnswerInputValid] = useState(true);
  const [entry, setEntry] = useState<Date | null>(() => dateAt(new Date(), 1, 10, 30));
  const [error, setError] = useState({ window: "", duration: "" }), [saved, setSaved] = useState("");
  const windowRef = useRef<HTMLButtonElement>(null), answerRef = useRef<HTMLInputElement>(null);
  const { minimum, refresh } = useFutureMinute();
  const zone = localTimeZoneText();
  const windowMinutes = windowValue ? (windowValue.to.getTime() - windowValue.from.getTime()) / minute : 0;
  const durationValid = answerInputValid && answerMinutes !== null && Number.isSafeInteger(answerMinutes) && answerMinutes > 0;
  let entryResult = "补齐开放窗口、答题时长和模拟入场时间后查看结果。";
  if (windowValue && entry && durationValid) {
    if (entry < windowValue.from) entryResult = "尚未开放，不能开始作答。";
    else if (entry >= windowValue.to) entryResult = "考试已关闭，不能开始作答。";
    else {
      const finish = new Date(Math.min(entry.getTime() + answerMinutes * minute, windowValue.to.getTime()));
      entryResult = `可答题 ${durationText((finish.getTime() - entry.getTime()) / minute)}；最晚于 ${dateTimeText(finish)} 结束。`;
    }
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = { window: windowError(windowValue, new Date()), duration: !durationValid || !answerRef.current?.validity.valid ? "请输入正整数答题时长。" : "" };
    setError(nextError); refresh();
    if (nextError.window || nextError.duration) {
      setSaved(""); (nextError.window ? windowRef : answerRef).current?.focus(); return;
    }
    setSaved(`考试设置已保存（仅当前页面）：${rangeText(windowValue!)}；答题时长 ${answerMinutes} 分钟；关闭时统一结束。`);
  }

  return <form className="g5-panel g5-form" aria-label="考试开放设置" onSubmit={save} noValidate>
    <div className="g5-task-heading"><h3>考试开放与答题时长</h3><p>本地样板 · 开放窗口与每位学生的答题时长分别设置。</p></div>
    <FormItem label="考试开放窗口" required status={error.window ? "error" : "default"} message={error.window || undefined}>
      <DatePicker ref={windowRef} aria-label="考试开放窗口" mode="range" showTime size={36} value={windowValue}
        onValueChange={value => { setWindowValue(value); setError({ window: "", duration: "" }); setSaved(""); }} minDate={minimum}
        onOpenChange={open => { if (open) refresh(); }} minDurationMinutes={1} timeStep={15} />
    </FormItem>
    <Grid columns={2} minColumnWidth={240} gap={16}>
      <FormItem label="答题时长" required status={error.duration ? "error" : "default"} message={error.duration || undefined} help="每位学生开始作答后计时。">
        <InputNumber ref={answerRef} size={36} fullWidth min={1} precision={0} value={answerMinutes} suffixText="分钟"
          onValidityChange={validity => setAnswerInputValid(validity.valid)} onChange={() => setSaved("")}
          onValueChange={value => { setAnswerMinutes(value); setError({ window: "", duration: "" }); setSaved(""); }} />
      </FormItem>
      <div className="g5-date-policy"><strong>关闭规则</strong><p>本地演示策略：到达关闭时间统一结束。</p></div>
    </Grid>
    <dl className="g5-date-summary" aria-label="考试设置摘要">
      <div><dt>开放窗口</dt><dd>{windowValue ? rangeText(windowValue) : "待设置"}</dd></div>
      <div><dt>窗口长度</dt><dd>{windowValue ? durationText(windowMinutes) : "待设置"}</dd></div>
      <div><dt>时间基准</dt><dd>{zone}</dd></div>
    </dl>
    {durationValid && windowValue && answerMinutes > windowMinutes && <p className="g5-date-warning">答题时长超过开放窗口；按本演示策略，所有人最晚在关闭时间结束，原时长设置保留。</p>}
    <div className="g5-date-simulation">
      <FormItem label="模拟入场时间" help="可选择开放前、窗口中或关闭时，查看能否开始以及实际可用时长。">
        <DatePicker aria-label="模拟入场时间" size={36} showTime value={entry} onValueChange={setEntry}
          presets={windowValue ? [
            { label: "开放前 1 分钟", getValue: () => new Date(windowValue.from.getTime() - minute) },
            { label: "开放时刻", getValue: () => new Date(windowValue.from) },
            { label: "关闭前 30 分钟", getValue: () => new Date(windowValue.to.getTime() - 30 * minute) },
            { label: "关闭时刻", getValue: () => new Date(windowValue.to) },
          ] : undefined} />
      </FormItem>
      <p className="g5-date-preview" aria-label="模拟入场结果">{entryResult}</p>
    </div>
    <div className="g5-form-footer"><p role="status" aria-label="考试保存结果">{saved || (error.window || error.duration ? "请修正标出的设置，内容已保留。" : "开放窗口与答题时长分别设置，完成后保存。")}</p><Button type="submit" variant="primary">保存考试设置</Button></div>
  </form>;
}

export function CrossDayTimeExample() {
  const [value, setValue] = useState<DateRange | null>(() => timeRangeExamples[1]!.getValue(new Date()));
  const [error, setError] = useState(""), [saved, setSaved] = useState("");
  const ref = useRef<HTMLButtonElement>(null);
  const { minimum, refresh } = useFutureMinute();
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = windowError(value, new Date());
    setError(nextError); refresh();
    if (nextError) { setSaved(""); ref.current?.focus(); return; }
    setSaved(`时间段已保存（仅当前页面）：${rangeText(value!)}。`);
  }
  return <form className="g5-panel g5-form" aria-label="时间段设置" onSubmit={save} noValidate>
    <div className="g5-task-heading"><h3>同日与跨日时间段</h3><p>本地活动样板 · 加载示例后，可继续修改起止日期与时间。</p></div>
    <Inline role="group" aria-label="加载示例" gap={8}>
      <span className="g5-muted">加载示例</span>
      {timeRangeExamples.map(example => <Button key={example.label} type="button" variant="tertiary" onClick={() => {
        setValue(example.getValue(new Date())); setError(""); setSaved(""); refresh();
      }}>{example.label}</Button>)}
    </Inline>
    <FormItem label="活动时间段" required status={error ? "error" : "default"} message={error || undefined}>
      <DatePicker ref={ref} aria-label="活动时间段" size={36} mode="range" showTime value={value} minDate={minimum}
        onOpenChange={open => { if (open) refresh(); }} onValueChange={next => { setValue(next); setError(""); setSaved(""); }}
        durationPresets={durationPresets} minDurationMinutes={1} timeStep={15} />
    </FormItem>
    <dl className="g5-date-summary" aria-label="时间段摘要">
      <div><dt>起止时间</dt><dd>{value ? rangeText(value) : "待设置"}</dd></div>
      <div><dt>时段长度</dt><dd>{value ? durationText((value.to.getTime() - value.from.getTime()) / minute) : "待设置"}</dd></div>
      <div><dt>时间基准</dt><dd>{localTimeZoneText()}</dd></div>
    </dl>
    <p className="g5-date-help">先选择要修改的开始或结束日期，时间直接输入 HH:mm。清空会清除全部草稿，取消可恢复；按时长设置结束可按需展开。</p>
    <div className="g5-form-footer"><p role="status" aria-label="时间段保存结果">{saved || (error ? "请修正标出的时间段，内容已保留。" : "调整完成后保存时间段。")}</p><Button type="submit" variant="primary">保存时间段</Button></div>
  </form>;
}
