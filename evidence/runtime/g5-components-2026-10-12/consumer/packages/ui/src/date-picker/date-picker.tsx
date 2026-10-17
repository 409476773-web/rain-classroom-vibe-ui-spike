import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type AriaAttributes } from "react";
import { useDensity, type InputSize } from "@rain-next/foundations";
import { CalendarIcon } from "@rain-next/ui/icons/calendar";
import { dateMatchModifiers, rangeContainsModifiers, type DateRange as DayPickerDateRange, type Matcher } from "react-day-picker";
import { Calendar, CalendarOverlayContext } from "../calendar/calendar";
import { Button } from "../button/button";
import { InputNumber } from "../input-number/input-number";
import { Popover } from "../popover/popover";
import { fieldFrameRecipe, type FieldAppearance, type FieldStatus } from "../field/field.styles";
import { FormItemContext, InsideFieldLabel, mergeFieldIds, useFormItem } from "../input/form-item";
import { inputIconClassName, inputSizeClassName } from "../input/input.styles";
import { rainCn } from "../utils/rain-class-names";
import "./date-picker.css";

/** Committed ranges are complete; partial DayPicker ranges stay inside the draft. */
export interface DateRange { from: Date; to: Date }
type PickerValue = Date | DateRange | null;
type TimeDraft = { hour: number | null; minute: number | null };
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
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export type DatePickerProps = DatePickerBaseProps & (
  | { mode?: "single"; value?: Date | null; defaultValue?: Date | null; onValueChange?: (value: Date | null) => void }
  | { mode: "range"; value?: DateRange | null; defaultValue?: DateRange | null; onValueChange?: (value: DateRange | null) => void }
);

const localDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const validDate = (date: Date | undefined): date is Date => date instanceof Date && Number.isFinite(date.getTime());
const firstDate = (value: PickerValue) => value instanceof Date ? value : value?.from;
const pad = (number: number) => String(number).padStart(2, "0");
function formatDate(date: Date, showTime: boolean) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}${showTime ? ` ${pad(date.getHours())}:${pad(date.getMinutes())}` : ""}`;
}
function formatValue(value: PickerValue, showTime: boolean) {
  if (!value) return "";
  if (value instanceof Date) return validDate(value) ? formatDate(value, showTime) : "无效日期";
  return validDate(value.from) && validDate(value.to) ? `${formatDate(value.from, showTime)} 至 ${formatDate(value.to, showTime)}` : "无效日期范围";
}
function getTime(date?: Date): TimeDraft { return { hour: validDate(date) ? date.getHours() : 0, minute: validDate(date) ? date.getMinutes() : 0 }; }
function invalidValue(value: PickerValue) { return value !== null && (value instanceof Date ? !validDate(value) : !validDate(value.from) || !validDate(value.to)); }
function displayMonth(value: PickerValue, fallback?: Date) {
  const date = firstDate(value);
  return validDate(date) ? date : validDate(fallback) ? fallback : new Date();
}
function getDraft(value: PickerValue): DayPickerDateRange {
  if (!value) return { from: undefined };
  return value instanceof Date ? { from: validDate(value) ? localDay(value) : undefined } : { from: validDate(value.from) ? localDay(value.from) : undefined, to: validDate(value.to) ? localDay(value.to) : undefined };
}
function withTime(date: Date, time: TimeDraft, showTime: boolean) {
  const result = localDay(date);
  if (showTime) result.setHours(time.hour ?? 0, time.minute ?? 0, 0, 0);
  return result;
}
function equalValue(a: PickerValue, b: PickerValue, showTime: boolean) { return formatValue(a, showTime) === formatValue(b, showTime); }
function availableWidth() {
  if (typeof window === "undefined") return 320;
  return Math.min(window.innerWidth, window.visualViewport?.width ?? Infinity, document.documentElement.clientWidth || Infinity);
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(props, forwardedRef) {
  const { mode = "single", showTime = false, minDate, maxDate, disabledDates, defaultMonth, appearance = "outlined", size,
    className, placeholder, readOnly = false, "aria-label": ariaLabel, "aria-labelledby": labelledBy, "aria-describedby": describedBy } = props;
  const field = useFormItem(), density = useDensity(), generatedId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(forwardedRef, () => triggerRef.current!, []);
  const [internalValue, setInternalValue] = useState<PickerValue>(props.defaultValue ?? null);
  const committed = props.value !== undefined ? props.value : internalValue;
  const [internalOpen, setInternalOpen] = useState(props.defaultOpen ?? false);
  const disabled = Boolean(props.disabled || field?.disabled), required = Boolean(props.required || field?.required);
  const requestedOpen = props.open ?? internalOpen;
  const open = requestedOpen && !disabled && !readOnly;
  const status = field?.status ?? props.status ?? "default";
  const resolvedSize = size ?? (density === "compact" ? 24 : 32);
  const [draft, setDraft] = useState<DayPickerDateRange>(() => getDraft(committed));
  const [startTime, setStartTime] = useState<TimeDraft>(() => getTime(firstDate(committed)));
  const [endTime, setEndTime] = useState<TimeDraft>(() => getTime(committed && !(committed instanceof Date) ? committed.to : undefined));
  const [timeInvalid, setTimeInvalid] = useState<Record<string, boolean>>({});
  const [invalidDraftDate, setInvalidDraftDate] = useState(() => invalidValue(committed));
  const [pointerFocused, setPointerFocused] = useState(false);
  const [pickingEnd, setPickingEnd] = useState(false);
  const [month, setMonth] = useState(() => displayMonth(committed, defaultMonth));
  const [viewportWidth, setViewportWidth] = useState(availableWidth);
  const nestedOpen = useRef(false), closeReason = useRef("");
  const controlId = field?.id ?? props.id ?? `rain-date-picker-${generatedId}`;
  const hintId = `${controlId}-draft-hint`;
  const range = mode === "range";
  const monthCount = range && viewportWidth >= 576 ? 2 : 1;
  const atGranularity = (date: Date) => showTime ? Math.floor(date.getTime() / 60000) : localDay(date).getTime();
  const invalidBounds = (minDate !== undefined && !validDate(minDate)) || (maxDate !== undefined && !validDate(maxDate)) ||
    (validDate(minDate) && validDate(maxDate) && atGranularity(minDate) > atGranularity(maxDate));
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
    setDraft(getDraft(committed)); setStartTime(getTime(firstDate(committed)));
    setEndTime(getTime(committed && !(committed instanceof Date) ? committed.to : undefined));
    setTimeInvalid({}); setPickingEnd(false); setInvalidDraftDate(invalidValue(committed));
    setMonth(displayMonth(committed, defaultMonth));
  }
  // An external controlled value is authoritative, including while the panel is open.
  const committedKey = formatValue(committed, showTime);
  useEffect(() => { resetDraft(); }, [committedKey, mode, showTime, open]);

  function requestOpen(next: boolean) {
    if (next && (disabled || readOnly)) return;
    if (next) resetDraft();
    setInternalOpen(next); props.onOpenChange?.(next);
  }
  useEffect(() => { if (requestedOpen && (disabled || readOnly)) requestOpen(false); }, [disabled, readOnly, requestedOpen]);

  function selectDate(date: Date) {
    if (dateMatchModifiers(date, bounds)) return;
    setInvalidDraftDate(false);
    if (!range) { setDraft({ from: localDay(date) }); return; }
    if (!pickingEnd || !draft.from) { setDraft({ from: localDay(date) }); setPickingEnd(true); return; }
    const clicked = localDay(date), first = localDay(draft.from);
    setDraft(clicked < first ? { from: clicked, to: first } : { from: first, to: clicked });
    setPickingEnd(false);
  }

  let message = "", candidate: PickerValue = null;
  if (invalidBounds) message = "日期边界无效，请检查允许范围";
  else if (invalidDraftDate) message = "日期无效，请重新选择";
  else if (!draft.from) message = required ? (range ? "请选择完整日期范围" : "请选择日期") : "";
  else if (range && !draft.to) message = "请选择结束日期";
  else if (bounds.length && (range && draft.to ? rangeContainsModifiers({ from: draft.from, to: draft.to }, bounds) : dateMatchModifiers(draft.from, bounds))) {
    message = range ? "范围包含不可选日期，请重新选择" : "该日期不可选，请重新选择";
  } else if (showTime && (Object.values(timeInvalid).some(Boolean) || [startTime, ...(range ? [endTime] : [])].some(time => time.hour === null || time.minute === null || !Number.isInteger(time.hour) || !Number.isInteger(time.minute) || time.hour < 0 || time.hour > 23 || time.minute < 0 || time.minute > 59))) {
    message = "请填写有效时间：小时 0–23，分钟 0–59";
  } else if (draft.from) {
    const from = withTime(draft.from, startTime, showTime), to = range && draft.to ? withTime(draft.to, endTime, showTime) : undefined;
    if (to && to < from) message = "结束时间不能早于开始时间";
    else if ([from, ...(to ? [to] : [])].some(date => (minDate && atGranularity(date) < atGranularity(minDate)) || (maxDate && atGranularity(date) > atGranularity(maxDate)))) message = "所选时间超出允许范围，请调整时间";
    else candidate = to ? { from, to } : from;
  }

  function confirm() {
    if (message) return;
    if (!equalValue(candidate, committed, showTime)) {
      if (props.value === undefined) setInternalValue(candidate);
      if (props.mode === "range") props.onValueChange?.(candidate as DateRange | null);
      else props.onValueChange?.(candidate as Date | null);
    }
    closeReason.current = "confirm"; requestOpen(false);
  }
  function setTimeValidity(key: string, invalid: boolean) {
    setTimeInvalid(previous => previous[key] === invalid ? previous : { ...previous, [key]: invalid });
  }
  function timeFields(label: string, key: "start" | "end", value: TimeDraft, setValue: (value: TimeDraft) => void, hasDate: boolean) {
    return <fieldset className="rain-date-picker__time" data-slot={`${key}-time`}>
      <legend>{label}时间</legend>
      <div className="rain-date-picker__time-fields">
        <InputNumber aria-label={`${label}小时`} value={value.hour} min={0} max={23} step={1} precision={0} required disabled={!hasDate}
          controlsLayout="stacked" size={28} onValueChange={hour => setValue({ ...value, hour })} onValidityChange={validity => setTimeValidity(`${key}-hour`, !validity.valid)} />
        <span aria-hidden="true">:</span>
        <InputNumber aria-label={`${label}分钟`} value={value.minute} min={0} max={59} step={1} precision={0} required disabled={!hasDate}
          controlsLayout="stacked" size={28} onValueChange={minute => setValue({ ...value, minute })} onValidityChange={validity => setTimeValidity(`${key}-minute`, !validity.valid)} />
      </div>
    </fieldset>;
  }
  const displayedValue = formatValue(committed, showTime);
  function draftSummary(date: Date, time: TimeDraft, key: "start" | "end") {
    const valid = !timeInvalid[`${key}-hour`] && !timeInvalid[`${key}-minute`] && time.hour !== null && time.minute !== null &&
      Number.isInteger(time.hour) && Number.isInteger(time.minute) && time.hour >= 0 && time.hour <= 23 && time.minute >= 0 && time.minute <= 59;
    return `${formatDate(date, false)}${showTime ? ` ${valid ? `${pad(time.hour!)}:${pad(time.minute!)}` : "--:--"}` : ""}`;
  }
  const summary = draft.from ? `${draftSummary(draft.from, startTime, "start")}${range ? ` 至 ${draft.to ? draftSummary(draft.to, endTime, "end") : "待选择"}` : ""}` : "尚未选择日期";

  return <Popover.Root open={open} onOpenChange={(next, details) => {
    if (!next && nestedOpen.current && ["escape-key", "outside-press"].includes(details.reason)) { details.cancel(); return; }
    if (next && (disabled || readOnly)) { details.cancel(); return; }
    closeReason.current = details.reason; requestOpen(next);
  }}>
    <div data-rain-id="ui-date-picker" data-slot="root" data-mode={mode} data-size={resolvedSize} data-state={disabled ? "disabled" : readOnly ? "readonly" : "editable"}
      data-open={open} data-status={status} data-appearance={appearance} className={rainCn("rain-date-picker", className)}>
      <div data-slot="frame" data-open={open} data-appearance={appearance} data-status={status} data-size={resolvedSize}
        data-permission={disabled ? "disabled" : readOnly ? "readonly" : "editable"} data-pointer-focus={readOnly && pointerFocused || undefined}
        onPointerDownCapture={() => { if (readOnly) setPointerFocused(true); }} onKeyDownCapture={() => setPointerFocused(false)}
        className={rainCn(fieldFrameRecipe({ size: resolvedSize, appearance, status, state: disabled ? "disabled" : readOnly ? "readonly" : "editable" }), inputSizeClassName(resolvedSize))}>
        <InsideFieldLabel disabled={disabled} />
        <Popover.Trigger data-slot="control" data-focus={undefined} render={<button ref={triggerRef} type="button" id={controlId} disabled={disabled} aria-disabled={readOnly || undefined}
          aria-label={ariaLabel ?? (labelledBy || field?.labelId ? undefined : fieldName)} aria-labelledby={mergeFieldIds(labelledBy, field?.labelId)}
          aria-describedby={mergeFieldIds(describedBy, field?.descriptionIds)} aria-invalid={props["aria-invalid"] ?? (status === "error" || undefined)}
          className="rain-date-picker__trigger" />}>
          <span data-slot="value" data-placeholder={!displayedValue}>{displayedValue || placeholder || (range ? "请选择日期范围" : "请选择日期")}</span>
          <span className={inputIconClassName} aria-hidden="true"><CalendarIcon /></span>
        </Popover.Trigger>
      </div>
    </div>
    <Popover.Content width={monthCount === 2 ? 560 : 320} className="rain-date-picker__popup" data-month-count={monthCount}
      aria-describedby={message ? hintId : undefined} finalFocus={() => closeReason.current === "outside-press" ? false : triggerRef.current}>
      <FormItemContext.Provider value={null}>
        <Popover.Title>{range ? "选择日期范围" : "选择日期"}{showTime ? "与时间" : ""}</Popover.Title>
        <CalendarOverlayContext.Provider value={next => {
          if (next) nestedOpen.current = true;
          else queueMicrotask(() => { nestedOpen.current = false; });
        }}>
          {range ? <Calendar mode="range" month={month} onMonthChange={setMonth} selected={draft} onSelect={(_, date) => selectDate(date)} disabled={bounds} numberOfMonths={monthCount}
            startMonth={invalidBounds ? undefined : minDate} endMonth={invalidBounds ? undefined : maxDate} />
            : <Calendar mode="single" month={month} onMonthChange={setMonth} selected={draft.from} onSelect={(_, date) => selectDate(date)} disabled={bounds} startMonth={invalidBounds ? undefined : minDate} endMonth={invalidBounds ? undefined : maxDate} />}
        </CalendarOverlayContext.Provider>
        {showTime ? <div key={`${open}-${committedKey}`} className="rain-date-picker__times" data-range={range} data-narrow={monthCount === 1}>
          {timeFields(range ? "开始" : "日期", "start", startTime, setStartTime, Boolean(draft.from))}
          {range ? timeFields("结束", "end", endTime, setEndTime, Boolean(draft.to)) : null}
        </div> : null}
        <div data-slot="summary" className="rain-date-picker__summary">{summary}</div>
        {message ? <div id={hintId} role="status" aria-label="日期选择提示" data-slot="draft-hint" data-invalid className="rain-date-picker__hint">{message}</div> : null}
        <div data-slot="actions" className="rain-date-picker__actions">
          <Button variant="text" size="small" disabled={!draft.from && !invalidDraftDate} onClick={() => { setDraft({ from: undefined }); setPickingEnd(false); setInvalidDraftDate(false); }}>清空</Button>
          <span className="rain-date-picker__action-spacer" />
          <Button size="small" variant="tertiary" onClick={() => { closeReason.current = "cancel"; requestOpen(false); }}>取消</Button>
          <Button size="small" variant="primary" disabled={Boolean(message)} onClick={confirm}>确定</Button>
        </div>
      </FormItemContext.Provider>
    </Popover.Content>
  </Popover.Root>;
});
