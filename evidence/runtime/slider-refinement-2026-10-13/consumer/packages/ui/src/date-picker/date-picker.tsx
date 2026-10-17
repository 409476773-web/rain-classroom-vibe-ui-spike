import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type AriaAttributes } from "react";
import { useDensity, type InputSize } from "@rain-next/foundations";
import { CalendarIcon } from "@rain-next/ui/icons/calendar";
import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";
import { DoubleArrowDownIcon } from "@rain-next/ui/icons/double-arrow-down";
import { DoubleArrowUpIcon } from "@rain-next/ui/icons/double-arrow-up";
import { dateMatchModifiers, rangeContainsModifiers, type Matcher } from "react-day-picker";
import { Calendar, CalendarOverlayContext } from "../calendar/calendar";
import { Button, type ButtonPart } from "../button/button";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { Input } from "../input/input";
import { IconButton } from "../icon-button/icon-button";
import { Popover } from "../popover/popover";
import { Sheet } from "../sheet/sheet";
import { fieldFrameRecipe, type FieldAppearance, type FieldStatus } from "../field/field.styles";
import { FormItem, FormItemContext, InsideFieldLabel, mergeFieldIds, useFormItem } from "../input/form-item";
import { inputIconClassName, inputSizeClassName } from "../input/input.styles";
import { rainCn } from "../utils/rain-class-names";
import { TimeField } from "./date-picker-time-field";
import { combineDate, dateText, dateTimeText, durationText, localDay, nextDay, readDate, readEndpoint, readTime, validDate, type TimeText } from "./date-picker.utils";
import "./date-picker.css";

/** Committed ranges are complete; partial values stay inside the text draft. */
export interface DateRange { from: Date; to: Date }
export interface DatePickerPreset<T> { label: string; getValue: (now: Date) => T }
type PickerValue = Date | DateRange | null;
type Endpoint = "start" | "end";
type EndpointText = { date: string; time: TimeText };
type Draft = Record<Endpoint, EndpointText>;
type SelectionIntent = "new-start" | "new-end" | Endpoint;
type DraftIssue = { text: string; invalid: boolean; endpoint?: Endpoint; part?: "date" | "time" | "range" };
interface DatePickerBaseProps extends Pick<AriaAttributes, "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"> {
  id?: string;
  className?: string;
  placeholder?: string;
  size?: InputSize;
  appearance?: FieldAppearance;
  status?: FieldStatus;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  showTime?: boolean;
  /** Local-day bounds without time; local-minute bounds when showTime is enabled. */
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Matcher | Matcher[];
  defaultMonth?: Date;
  timeStep?: 5 | 15 | 30;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export type DatePickerProps = DatePickerBaseProps & (
  | { mode?: "single"; value?: Date | null; defaultValue?: Date | null; onValueChange?: (value: Date | null) => void; presets?: readonly DatePickerPreset<Date>[] }
  | { mode: "range"; value?: DateRange | null; defaultValue?: DateRange | null; onValueChange?: (value: DateRange | null) => void; presets?: readonly DatePickerPreset<DateRange>[];
      durationPresets?: readonly number[]; minDurationMinutes?: number; maxDurationMinutes?: number; excludeDisabled?: boolean }
);

const durationPresetRecipe = defineRainLocalRecipe<ButtonPart, "ui-button">({
  id: "date-picker-neutral-duration-presets", scope: "feature", origin: "ui-button",
  classes: {
    root: "bg-rain-category-fill-neutral-solid-6 border-rain-action-ghost enabled:hover:bg-rain-category-fill-neutral-solid-5 enabled:active:bg-rain-category-fill-neutral-solid-4",
    label: "font-rain-regular",
  },
  modifiedParts: ["root", "label"], candidateTokens: [], promotionStatus: "not-proposed",
});
const pad = (value: number) => String(value).padStart(2, "0");
const emptyTime = (): TimeText => ({ hour: "", minute: "" });
function endpointText(date?: Date): EndpointText {
  return { date: date === undefined ? "" : validDate(date) ? dateText(date) : "无效日期", time: validDate(date) ? { hour: pad(date.getHours()), minute: pad(date.getMinutes()) } : emptyTime() };
}
function getDraft(value: PickerValue): Draft {
  return { start: endpointText(value instanceof Date ? value : value?.from), end: endpointText(value && !(value instanceof Date) ? value.to : undefined) };
}
function formatValue(value: PickerValue, showTime: boolean) {
  if (!value) return "";
  if (value instanceof Date) return validDate(value) ? dateTimeText(value, showTime) : "无效日期";
  return validDate(value.from) && validDate(value.to) ? `${dateTimeText(value.from, showTime)} 至 ${dateTimeText(value.to, showTime)}` : "无效日期范围";
}
function displayMonth(value: PickerValue, fallback?: Date) {
  const first = value instanceof Date ? value : value?.from;
  return validDate(first) ? first : validDate(fallback) ? fallback : new Date();
}
function availableWidth() {
  if (typeof window === "undefined") return 320;
  return Math.min(window.innerWidth, window.visualViewport?.width ?? Infinity, document.documentElement.clientWidth || Infinity);
}
const coarsePointer = () => typeof window !== "undefined" && Boolean(window.matchMedia?.("(pointer: coarse)").matches);

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(props, forwardedRef) {
  const { mode = "single", showTime = false, minDate, maxDate, disabledDates, defaultMonth, timeStep = 15, appearance = "outlined", size,
    className, placeholder, readOnly = false, "aria-label": ariaLabel, "aria-labelledby": labelledBy, "aria-describedby": describedBy } = props;
  const range = mode === "range", rangeProps = props.mode === "range" ? props : undefined;
  const minDuration = rangeProps?.minDurationMinutes ?? 0, maxDuration = rangeProps?.maxDurationMinutes;
  const durationPresets = rangeProps?.durationPresets;
  const excludeDisabled = rangeProps?.excludeDisabled ?? true;
  const field = useFormItem(), density = useDensity(), generatedId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null), bodyRef = useRef<HTMLDivElement>(null), titleRef = useRef<HTMLHeadingElement>(null);
  useImperativeHandle(forwardedRef, () => triggerRef.current!, []);
  const [internalValue, setInternalValue] = useState<PickerValue>(props.defaultValue ?? null);
  const committed = props.value !== undefined ? props.value : internalValue;
  const [internalOpen, setInternalOpen] = useState(props.defaultOpen ?? false);
  const disabled = Boolean(props.disabled || field?.disabled), required = Boolean(props.required || field?.required);
  const requestedOpen = props.open ?? internalOpen, open = requestedOpen && !disabled && !readOnly;
  const status = field?.status ?? props.status ?? "default", resolvedSize = size ?? (density === "compact" ? 24 : 32);
  const [draft, setDraft] = useState<Draft>(() => getDraft(committed));
  const [intent, setIntent] = useState<SelectionIntent>("new-start");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [composing, setComposing] = useState<Record<string, boolean>>({});
  const [announcement, setAnnouncement] = useState("");
  const [preview, setPreview] = useState<Date>();
  const [customDuration, setCustomDuration] = useState("");
  const [timeTextPresent, setTimeTextPresent] = useState({ start: false, end: false });
  const [durationOpen, setDurationOpen] = useState(false);
  const [pointerFocused, setPointerFocused] = useState(false);
  const [month, setMonth] = useState(() => displayMonth(committed, defaultMonth));
  const [viewportWidth, setViewportWidth] = useState(availableWidth);
  const [sheet, setSheet] = useState(coarsePointer);
  const nestedOpen = useRef(false), closeReason = useRef("");
  const controlId = field?.id ?? props.id ?? `rain-date-picker-${generatedId}`;
  const hintId = `${controlId}-draft-hint`, valueId = `${controlId}-value-description`;
  const monthCount = range && !showTime && !sheet && viewportWidth >= 576 ? 2 : 1;
  const atGranularity = (date: Date) => showTime ? Math.floor(date.getTime() / 60000) : localDay(date).getTime();
  const invalidBounds = (minDate !== undefined && !validDate(minDate)) || (maxDate !== undefined && !validDate(maxDate)) ||
    (validDate(minDate) && validDate(maxDate) && atGranularity(minDate) > atGranularity(maxDate));
  const validMinutes = (value: number, allowZero = false) => Number.isSafeInteger(value) && value >= (allowZero ? 0 : 1);
  const invalidConfig = ![5, 15, 30].includes(timeStep) || !validMinutes(minDuration, true) ||
    (maxDuration !== undefined && (!validMinutes(maxDuration, true) || maxDuration < minDuration)) ||
    (durationPresets !== undefined && durationPresets.some(value => !validMinutes(value))) ||
    (!showTime && (durationPresets !== undefined || rangeProps?.minDurationMinutes !== undefined || maxDuration !== undefined));
  const bounds: Matcher[] = [
    ...(disabledDates ? Array.isArray(disabledDates) ? disabledDates : [disabledDates] : []),
    ...(validDate(minDate) ? [{ before: localDay(minDate) }] : []), ...(validDate(maxDate) ? [{ after: localDay(maxDate) }] : []),
  ];
  const fieldName = ariaLabel ?? field?.labelText ?? (range ? "选择日期范围" : "选择日期");

  useEffect(() => {
    const update = () => setViewportWidth(availableWidth());
    window.addEventListener("resize", update); window.visualViewport?.addEventListener("resize", update);
    return () => { window.removeEventListener("resize", update); window.visualViewport?.removeEventListener("resize", update); };
  }, []);
  function resetDraft() {
    setDraft(getDraft(committed)); setIntent(range && showTime ? "start" : "new-start"); setTouched({}); setComposing({}); setPreview(undefined); setCustomDuration(""); setTimeTextPresent({ start: false, end: false }); setDurationOpen(false);
    setMonth(displayMonth(committed, defaultMonth)); nestedOpen.current = false;
  }
  const committedKey = formatValue(committed, showTime);
  useEffect(() => { resetDraft(); }, [committedKey, mode, showTime, open]);
  function requestOpen(next: boolean) {
    if (next && (disabled || readOnly)) return;
    if (next) { setSheet(coarsePointer()); setAnnouncement(""); resetDraft(); }
    setInternalOpen(next); props.onOpenChange?.(next);
  }
  useEffect(() => { if (requestedOpen && (disabled || readOnly)) requestOpen(false); }, [disabled, readOnly, requestedOpen]);

  const disabledRangeCache = new Map<string, boolean>();
  function rangeCrossesDisabled(from: Date, to: Date) {
    const fromDay = localDay(from), toDay = localDay(to), key = `${fromDay.getTime()}:${toDay.getTime()}`;
    if (!disabledRangeCache.has(key)) disabledRangeCache.set(key, rangeContainsModifiers({ from: fromDay, to: toDay }, bounds));
    return disabledRangeCache.get(key)!;
  }
  function valueIssue(value: Exclude<PickerValue, null>): string {
    const from = value instanceof Date ? value : value.from, to = value instanceof Date ? undefined : value.to;
    if (!validDate(from) || (to !== undefined && !validDate(to))) return "日期无效，请重新选择";
    if (to && atGranularity(to) < atGranularity(from)) return "结束时间不能早于开始时间";
    if ([from, ...(to ? [to] : [])].some(date => dateMatchModifiers(localDay(date), bounds))) return to ? "范围包含不可选日期，请重新选择" : "该日期不可选，请重新选择";
    if (to && excludeDisabled && bounds.length && rangeCrossesDisabled(from, to)) return "范围包含不可选日期，请重新选择";
    if ([from, ...(to ? [to] : [])].some(date => (validDate(minDate) && atGranularity(date) < atGranularity(minDate)) || (validDate(maxDate) && atGranularity(date) > atGranularity(maxDate)))) return "所选时间超出允许范围，请调整时间";
    if (to && showTime) {
      const minutes = atGranularity(to) - atGranularity(from);
      if (minutes < minDuration) return `时段长度至少${minDuration}分钟，请调整结束时间`;
      if (maxDuration !== undefined && minutes > maxDuration) return `时段长度最多${maxDuration}分钟，请调整结束时间`;
    }
    return "";
  }
  const startDay = composing["start-date"] ? null : readDate(draft.start.date), endDay = range && !composing["end-date"] ? readDate(draft.end.date) : null;
  const from = composing["start-date"] || composing["start-time"] ? null : readEndpoint(draft.start.date, showTime ? draft.start.time : undefined);
  const to = range && !composing["end-date"] && !composing["end-time"] ? readEndpoint(draft.end.date, showTime ? draft.end.time : undefined) : null;
  const hasDraft = Boolean(customDuration) || ((range ? ["start", "end"] : ["start"]) as Endpoint[]).some(key => {
    const endpoint = draft[key];
    return endpoint.date || showTime && (endpoint.time.hour || endpoint.time.minute || timeTextPresent[key]);
  });
  let issue: DraftIssue = { text: "", invalid: false }, candidate: PickerValue = null;
  if (invalidBounds) issue = { text: "日期边界无效，请检查允许范围", invalid: true };
  else if (invalidConfig) issue = { text: "日期配置无效，请检查时间步长和时长限制", invalid: true };
  else if (Object.values(composing).some(Boolean)) issue = { text: "正在输入，请完成输入后确认", invalid: false };
  else {
    for (const key of (range ? ["start", "end"] : ["start"]) as Endpoint[]) {
      const endpoint = draft[key], label = range ? key === "start" ? "开始" : "结束" : "日期";
      if (endpoint.date && !readDate(endpoint.date)) { issue = { text: `${label}日期无效，请填写 YYYY-MM-DD`, invalid: Boolean(touched[`${key}-date`]), endpoint: key, part: "date" }; break; }
      if (endpoint.date && showTime && !readTime(endpoint.time)) { issue = { text: `请填写有效${label}时间：小时 0–23，分钟 0–59`, invalid: Boolean(touched[`${key}-time`]), endpoint: key, part: "time" }; break; }
      if (endpoint.date && showTime && !readEndpoint(endpoint.date, endpoint.time)) { issue = { text: `${label}日期或时间在本机时区不存在，请调整`, invalid: true, endpoint: key, part: "time" }; break; }
    }
    if (!issue.text) {
      if (!draft.start.date && !draft.end.date) issue = { text: required || hasDraft ? range ? "请选择完整日期范围" : "请选择日期" : "", invalid: false };
      else if (!from) issue = { text: range ? "请选择开始日期" : "请选择日期", invalid: false };
      else if (range && !to) issue = { text: "请选择结束日期", invalid: false };
      else {
        candidate = range && to ? { from, to } : from;
        const text = valueIssue(candidate);
        const startOutside = dateMatchModifiers(localDay(from), bounds) || (validDate(minDate) && atGranularity(from) < atGranularity(minDate)) || (validDate(maxDate) && atGranularity(from) > atGranularity(maxDate));
        const unavailableDay = dateMatchModifiers(localDay(from), bounds) || Boolean(to && dateMatchModifiers(localDay(to), bounds))
          || Boolean(to && excludeDisabled && bounds.length && rangeCrossesDisabled(from, to));
        issue = { text, invalid: Boolean(text), endpoint: text ? startOutside || !range ? "start" : "end" : undefined, part: showTime && !unavailableDay ? "range" : "date" };
      }
    }
  }
  const canConfirm = !issue.text;
  function updateEndpoint(key: Endpoint, endpoint: EndpointText) { setDraft(previous => ({ ...previous, [key]: endpoint })); setPreview(undefined); }
  function typeDate(key: Endpoint, text: string) {
    updateEndpoint(key, { ...draft[key], date: text });
    const date = composing[`${key}-date`] ? null : readDate(text);
    if (date) setMonth(date);
  }
  function selectDate(date: Date) {
    if (invalidBounds || dateMatchModifiers(date, bounds)) return;
    setPreview(undefined);
    if (!range) { updateEndpoint("start", { ...draft.start, date: dateText(date) }); return; }
    if (intent === "start" || intent === "end") {
      updateEndpoint(intent, { ...draft[intent], date: dateText(date) });
      setIntent(showTime ? intent === "start" && !endDay ? "end" : intent : "new-start");
      return;
    }
    if (intent === "new-start" || !startDay) {
      setDraft(previous => ({ start: { ...previous.start, date: dateText(date) }, end: { ...previous.end, date: "" } }));
      setIntent("new-end");
    } else {
      setDraft(previous => ({ start: { ...previous.start, date: dateText(date < startDay ? date : startDay) }, end: { ...previous.end, date: dateText(date < startDay ? startDay : date) } }));
      setIntent("new-start");
    }
  }
  function confirm() {
    if (!canConfirm) return;
    if (formatValue(candidate, showTime) !== committedKey) {
      if (props.value === undefined) setInternalValue(candidate);
      if (props.mode === "range") props.onValueChange?.(candidate as DateRange | null);
      else props.onValueChange?.(candidate as Date | null);
      setAnnouncement(candidate ? `已选择 ${formatValue(candidate, showTime)}` : "日期已清空");
    }
    closeReason.current = "confirm"; requestOpen(false);
  }
  function clear() {
    setDraft(getDraft(null)); setIntent(range && showTime ? "start" : "new-start"); setTouched({}); setComposing({}); setPreview(undefined); setCustomDuration(""); setTimeTextPresent({ start: false, end: false });
    setAnnouncement("已清空日期和时间草稿");
  }
  function durationValue(minutes: number): DateRange | null {
    if (!from || !validMinutes(minutes)) return null;
    const end = new Date(from.getTime() + minutes * 60000);
    return validDate(end) && end.getFullYear() <= 9999 ? { from, to: end } : null;
  }
  function applyValue(value: Exclude<PickerValue, null>) {
    setDraft(getDraft(value)); setIntent(range && showTime ? "start" : "new-start"); setTouched({}); setPreview(undefined);
    setMonth(value instanceof Date ? value : value.from);
  }
  function presetValue(preset: DatePickerPreset<Date> | DatePickerPreset<DateRange>) {
    try {
      const value = preset.getValue(new Date());
      if (range ? value instanceof Date || !validDate(value?.from) || !validDate(value?.to) : !(value instanceof Date) || !validDate(value)) return { value: null, reason: "快捷日期无效" };
      return { value, reason: invalidBounds || invalidConfig ? "日期约束无效" : valueIssue(value) };
    } catch { return { value: null, reason: "快捷日期无法计算" }; }
  }
  function initialFocus() {
    if (sheet) return titleRef.current;
    if (showTime) return bodyRef.current?.querySelector<HTMLInputElement>("input") ?? titleRef.current;
    const calendar = bodyRef.current?.querySelector('[data-rain-id="ui-calendar"]');
    return calendar?.querySelector<HTMLElement>('.rain-calendar__day-button[data-selected-single="true"]:not(:disabled), .rain-calendar__day-button[data-range-start="true"]:not(:disabled)') ??
      calendar?.querySelector<HTMLElement>('.rain-calendar__day-button[tabindex="0"]:not(:disabled)') ?? titleRef.current;
  }
  function onOverlayChange(next: boolean, details: { reason: string; cancel: () => void }) {
    if (!next && nestedOpen.current && ["escape-key", "outside-press", "focus-out"].includes(details.reason)) { details.cancel(); return; }
    if (next && (disabled || readOnly)) { details.cancel(); return; }
    closeReason.current = details.reason; requestOpen(next);
  }
  const overlayContext = (next: boolean) => {
    if (next) nestedOpen.current = true;
    else queueMicrotask(() => { nestedOpen.current = false; });
  };
  let previewRange: DateRange | undefined;
  if (range && preview) {
    if (intent === "new-end" && startDay) previewRange = preview < startDay ? { from: preview, to: startDay } : { from: startDay, to: preview };
    else if (intent === "start" && endDay) previewRange = { from: preview, to: endDay };
    else if (intent === "end" && startDay) previewRange = { from: startDay, to: preview };
  }
  const previewStartTime = readTime(draft.start.time), previewEndTime = readTime(draft.end.time);
  const previewStart = previewRange && (showTime ? previewStartTime && combineDate(previewRange.from, previewStartTime) : previewRange.from);
  const previewEnd = previewRange && (showTime ? previewEndTime && combineDate(previewRange.to, previewEndTime) : previewRange.to);
  const invalidPreview = previewRange && (!previewStart || !previewEnd || Boolean(valueIssue({ from: previewStart, to: previewEnd })));
  const calendarProps = {
    month, onMonthChange: setMonth, disabled: invalidBounds ? true : bounds, numberOfMonths: monthCount,
    startMonth: invalidBounds ? undefined : minDate, endMonth: invalidBounds ? undefined : maxDate,
    onDayMouseEnter: (date: Date) => setPreview(date), onDayFocus: (date: Date) => setPreview(date),
    modifiers: { preview: previewRange && !invalidPreview ? previewRange : [], preview_invalid: invalidPreview && preview ? preview : [] },
    modifiersClassNames: { preview: "rain-calendar__preview", preview_invalid: "rain-calendar__preview-invalid" },
  };
  const complete = Boolean(from && (!range || to));
  const derivedSummary = range && showTime && complete && from && to && to >= from
    ? `${dateText(nextDay(from)) === dateText(to) ? "次日 · " : ""}共 ${durationText((to.getTime() - from.getTime()) / 60000)}` : "";
  const customMinutes = !composing.duration && /^\d+$/.test(customDuration) ? Number(customDuration) : NaN;
  const customValue = durationValue(customMinutes), customReason = customValue ? valueIssue(customValue) : customDuration ? "请输入正整数分钟，并先完善开始时间" : "请输入自定义分钟数";
  const displayedValue = formatValue(committed, showTime);
  const nextDayAvailable = range && showTime && from && to && dateText(from) === dateText(to) && to < from;
  const activeEndpoint = intent === "end" || intent === "new-end" ? "end" : "start";
  const visibleIssue = issue.invalid ? issue.text : "";
  const durationHintId = `${controlId}-duration-hint`;
  const durationMissingStart = !from ? "先填写开始日期和时间" : "";
  const body = <FormItemContext.Provider value={null}><CalendarOverlayContext.Provider value={overlayContext}>
    <div ref={bodyRef} className="rain-date-picker__body">
      <div className="rain-date-picker__endpoints" data-range={range} data-show-time={showTime} data-narrow={monthCount === 1}>
        {((range ? ["start", "end"] : ["start"]) as Endpoint[]).map(key => {
          const label = range ? key === "start" ? "开始" : "结束" : "日期";
          const dateError = issue.endpoint === key && issue.part === "date" && issue.invalid ? issue.text : undefined;
          const timeError = issue.endpoint === key && (issue.part === "time" || issue.part === "range") && issue.invalid ? issue.text : undefined;
          return <div key={key} className="rain-date-picker__endpoint" data-endpoint={key} data-active={range && activeEndpoint === key}>
            <FormItem labelPosition="inside" label={<><span aria-hidden="true">{label}</span><span className="sr-only">{range ? `${label}日期` : label}</span></>}
              id={`${controlId}-${key}-date`} status={dateError ? "error" : "default"} className="rain-date-picker__date-field">
            <Input aria-describedby={dateError ? hintId : undefined}
              className="rain-date-picker__date-input" value={draft[key].date} placeholder="YYYY-MM-DD" clearable={false} size={32}
              onValueChange={value => typeDate(key, value)}
              trailingAction={<IconButton icon={<CalendarIcon />} size="24/16" highlight={range && activeEndpoint === key ? "icon" : "none"}
                aria-label={`在日历中修改${range ? label : ""}日期`} aria-pressed={range ? activeEndpoint === key : undefined}
                onClick={() => { if (range) setIntent(key); const date = readDate(draft[key].date); if (date) setMonth(date); setPreview(undefined); }} />}
              onBlur={() => setTouched(previous => ({ ...previous, [`${key}-date`]: true }))}
              onCompositionStart={() => setComposing(previous => ({ ...previous, [`${key}-date`]: true }))}
              onCompositionEnd={event => { setComposing(previous => ({ ...previous, [`${key}-date`]: false })); updateEndpoint(key, { ...draft[key], date: event.currentTarget.value }); const date = readDate(event.currentTarget.value); if (date) setMonth(date); }}
              onKeyDown={event => { if (event.key === "Enter") { event.stopPropagation(); if (!composing[`${key}-date`] && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) { event.preventDefault(); setTouched(previous => ({ ...previous, [`${key}-date`]: true })); } } }} />
            </FormItem>
            {showTime ? <TimeField label={label} value={draft[key].time} onValueChange={time => updateEndpoint(key, { ...draft[key], time })}
              onTextPresenceChange={present => setTimeTextPresent(previous => ({ ...previous, [key]: present }))}
              step={invalidConfig ? 15 : timeStep} onBlur={() => setTouched(previous => ({ ...previous, [`${key}-time`]: true }))}
              onCompositionChange={next => setComposing(previous => ({ ...previous, [`${key}-time`]: next }))}
              error={timeError} errorId={hintId} /> : null}
          </div>;
        })}
      </div>
      {visibleIssue ? <div id={hintId} role="status" aria-label="日期选择提示" data-slot="draft-hint" data-invalid="true" className="rain-date-picker__hint">{visibleIssue}</div> : null}
      {nextDayAvailable ? <Button variant="text" size="regular" onClick={() => { const time = readTime(draft.end.time); if (from && time) { const end = combineDate(nextDay(from), time); if (end) updateEndpoint("end", endpointText(end)); } }}>结束日期改为次日</Button> : null}
      {props.presets?.length ? <div data-slot="presets" className="rain-date-picker__presets" aria-label="常用日期">
        {props.presets.map((preset, index) => {
          const result = presetValue(preset), id = `${controlId}-preset-${index}`;
          return <div key={index} className="rain-date-picker__preset"><Button variant="text" size="small" disabled={Boolean(result.reason)} aria-describedby={result.reason ? id : undefined}
            onClick={() => { const next = presetValue(preset); if (next.value && !next.reason) applyValue(next.value); }}>{preset.label}</Button>
            {result.reason ? <span id={id} className="rain-date-picker__shortcut-reason">{result.reason}</span> : null}</div>;
        })}
      </div> : null}
      <div className="rain-date-picker__calendar" onMouseLeave={() => setPreview(undefined)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPreview(undefined); }}>
        {range ? <Calendar {...calendarProps} mode="range" selected={{ from: startDay ?? undefined, to: endDay ?? undefined }} onSelect={(_, date) => selectDate(date)} />
          : <Calendar {...calendarProps} mode="single" selected={startDay ?? undefined} onSelect={(_, date) => selectDate(date)} />}
      </div>
      {range && showTime && durationPresets !== undefined ? <div data-slot="duration" className="rain-date-picker__duration">
        <Button variant="text" size="regular" aria-expanded={durationOpen} aria-controls={`${controlId}-duration`} trailingIcon={durationOpen ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />}
          onClick={() => setDurationOpen(previous => !previous)}>按时长设置结束</Button>
        {durationOpen ? <div id={`${controlId}-duration`} className="rain-date-picker__duration-content">
        <div className="rain-date-picker__presets">{durationPresets.map((minutes, index) => {
          const value = durationValue(minutes), reason = value ? valueIssue(value) : "请先完善开始时间";
          const id = `${controlId}-minutes-preset-${index}`;
          return <div key={index} className="rain-date-picker__preset"><Button variant="tertiary" size="mini" localRecipe={durationPresetRecipe} className="min-w-rain-0" disabled={Boolean(reason) || invalidConfig} aria-describedby={reason ? durationMissingStart ? durationHintId : id : undefined}
            onClick={() => { if (value && !reason) { updateEndpoint("end", endpointText(value.to)); setIntent("end"); setAnnouncement(`结束时间已更新为 ${dateTimeText(value.to)}`); } }}>{minutes}分钟</Button>
            {reason && !durationMissingStart ? <span id={id} className="rain-date-picker__value-description">{reason}</span> : null}</div>;
        })}</div>
        <div className="rain-date-picker__custom-duration"><Input aria-label="自定义时长（分钟）" value={customDuration} onValueChange={setCustomDuration} clearable={false} size={32} inputMode="numeric"
          placeholder="自定义分钟" onCompositionStart={() => setComposing(previous => ({ ...previous, duration: true }))}
          onCompositionEnd={event => { setComposing(previous => ({ ...previous, duration: false })); setCustomDuration(event.currentTarget.value); }}
          onKeyDown={event => { if (event.key === "Enter") { event.stopPropagation(); if (!composing.duration && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) event.preventDefault(); } }} />
          <Button size="small" variant="secondary" disabled={Boolean(customReason) || invalidConfig} onClick={() => { if (customValue && !customReason) { updateEndpoint("end", endpointText(customValue.to)); setIntent("end"); setAnnouncement(`结束时间已更新为 ${dateTimeText(customValue.to)}`); } }}>应用时长</Button>
        </div>
        {durationMissingStart ? <div id={durationHintId} className="rain-date-picker__shortcut-reason">{durationMissingStart}</div>
          : customDuration && customReason ? <div className="rain-date-picker__hint" role="status">{customReason}</div> : null}
        </div> : null}
      </div> : null}
      {derivedSummary ? <div data-slot="summary" className="rain-date-picker__summary" aria-live="polite">{derivedSummary}</div> : null}
      <span className="rain-date-picker__value-description" role="status" aria-label="日期选择步骤">{!issue.invalid ? issue.text : ""}</span>
    </div>
  </CalendarOverlayContext.Provider></FormItemContext.Provider>;
  const actions = <div data-slot="actions" className="rain-date-picker__actions">
    <Button variant="text" size="regular" leadingIcon={<CircleCloseIcon />} disabled={!hasDraft} onClick={clear}>清空</Button><span className="rain-date-picker__action-spacer" />
    <Button size="small" variant="tertiary" onClick={() => { closeReason.current = "cancel"; requestOpen(false); }}>取消</Button>
    <Button size="small" variant="primary" disabled={!canConfirm} onClick={confirm}>确定</Button>
  </div>;
  const title = `${range ? "选择日期范围" : "选择日期"}${showTime ? "与时间" : ""}`;
  const OverlayRoot = sheet ? Sheet.Root : Popover.Root, OverlayTrigger = sheet ? Sheet.Trigger : Popover.Trigger;
  return <OverlayRoot open={open} onOpenChange={onOverlayChange}>
    <div data-rain-id="ui-date-picker" data-slot="root" data-mode={mode} data-size={resolvedSize} data-state={disabled ? "disabled" : readOnly ? "readonly" : "editable"}
      data-open={open} data-status={status} data-appearance={appearance} className={rainCn("rain-date-picker", className)}>
      <div data-slot="frame" data-open={open} data-appearance={appearance} data-status={status} data-size={resolvedSize}
        data-permission={disabled ? "disabled" : readOnly ? "readonly" : "editable"} data-pointer-focus={readOnly && pointerFocused || undefined}
        onPointerDownCapture={() => { if (readOnly) setPointerFocused(true); }} onKeyDownCapture={() => setPointerFocused(false)}
        className={rainCn(fieldFrameRecipe({ size: resolvedSize, appearance, status, state: disabled ? "disabled" : readOnly ? "readonly" : "editable" }), inputSizeClassName(resolvedSize))}>
        <InsideFieldLabel disabled={disabled} />
        <OverlayTrigger data-slot="control" data-focus={undefined} render={<button ref={triggerRef} type="button" id={controlId} disabled={disabled} aria-disabled={readOnly || undefined}
          aria-label={ariaLabel ?? (labelledBy || field?.labelId ? undefined : fieldName)} aria-labelledby={mergeFieldIds(labelledBy, field?.labelId)}
          aria-describedby={mergeFieldIds(describedBy, field?.descriptionIds, valueId)} aria-invalid={props["aria-invalid"] ?? (status === "error" || undefined)} className="rain-date-picker__trigger" />}>
          <span data-slot="value" data-placeholder={!displayedValue}>{displayedValue || placeholder || (range ? "请选择日期范围" : "请选择日期")}</span>
          <span className={inputIconClassName} aria-hidden="true"><CalendarIcon /></span>
        </OverlayTrigger>
      </div>
      <span id={valueId} className="rain-date-picker__value-description">{displayedValue || "尚未选择日期"}</span>
      <span className="rain-date-picker__value-description" role="status">{announcement}</span>
    </div>
    {sheet ? <Sheet.Portal><Sheet.Backdrop /><Sheet.Content side="bottom" className="rain-date-picker__sheet" data-month-count={1}
      aria-describedby={visibleIssue ? hintId : undefined} initialFocus={initialFocus} finalFocus={() => closeReason.current === "outside-press" ? false : triggerRef.current}>
      <Sheet.Header><Sheet.Title ref={titleRef} tabIndex={-1}>{title}</Sheet.Title></Sheet.Header>
      <Sheet.Body tabIndex={-1}>{body}</Sheet.Body><Sheet.Footer>{actions}</Sheet.Footer>
    </Sheet.Content></Sheet.Portal> : <Popover.Content width={monthCount === 2 ? 560 : showTime ? 380 : 320} className="rain-date-picker__popup" data-month-count={monthCount}
      positionerProps={{ sticky: true, collisionAvoidance: { side: "shift", align: "shift", fallbackAxisSide: "none" } }}
      aria-describedby={visibleIssue ? hintId : undefined} initialFocus={initialFocus} finalFocus={() => closeReason.current === "outside-press" ? false : triggerRef.current}>
      <Popover.Title ref={titleRef} tabIndex={-1}>{title}</Popover.Title>{body}{actions}
    </Popover.Content>}
  </OverlayRoot>;
});
