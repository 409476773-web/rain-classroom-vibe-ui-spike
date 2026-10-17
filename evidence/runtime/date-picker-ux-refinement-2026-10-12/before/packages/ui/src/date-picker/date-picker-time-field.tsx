import { useContext, useId, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { CalendarOverlayContext } from "../calendar/calendar";
import { FormItemContext } from "../input/form-item";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { readTime, type TimeText, type TimeValue } from "./date-picker.utils";
export type { TimeText } from "./date-picker.utils";
export type TimeFieldProps = {
  label: string;
  value: TimeText;
  onValueChange: (value: TimeText) => void;
  disabled?: boolean;
  step?: 5 | 15 | 30;
  error?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onCompositionChange?: (composing: boolean) => void;
  suggestionDisabled?: (time: TimeValue) => boolean;
  suggestionReason?: (time: TimeValue) => string | undefined;
};

export function TimeField({ label, value, onValueChange, disabled = false, step = 15, error, onBlur, onFocus,
  onCompositionChange, suggestionDisabled, suggestionReason }: TimeFieldProps) {
  const onOpenChange = useContext(CalendarOverlayContext);
  const id = useId(), errorId = `rain-date-time-${id}-error`;
  const composing = useRef(false);
  const [compositionActive, setCompositionActive] = useState(false);
  if (![5, 15, 30].includes(step)) throw new Error("DatePicker time step must be 5, 15 or 30.");
  const current = compositionActive ? null : readTime(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  const currentText = current ? `${pad(current.hour)}:${pad(current.minute)}` : null;
  const options = [...Array.from({ length: 1440 / step }, (_, index) => index * step), 1439].map(minutes => {
    const time = { hour: Math.floor(minutes / 60), minute: minutes % 60 };
    const text = `${pad(time.hour)}:${pad(time.minute)}`;
    return { value: text, label: text, disabled: suggestionDisabled?.(time), description: suggestionReason?.(time) };
  });

  function normalize(part: keyof TimeText, raw: string) {
    if (disabled || composing.current) return;
    const parsed = readTime({ hour: "0", minute: "0", [part]: raw });
    if (parsed && pad(parsed[part]) !== value[part]) onValueChange({ ...value, [part]: pad(parsed[part]) });
    onBlur?.();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, part: keyof TimeText) {
    const isComposing = composing.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229;
    if (event.key === "Enter") {
      event.stopPropagation();
      if (!isComposing) { event.preventDefault(); normalize(part, event.currentTarget.value); }
    } else if (!disabled && !isComposing && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault(); event.stopPropagation();
      const parsed = readTime({ hour: "0", minute: "0", [part]: event.currentTarget.value });
      if (!parsed) return;
      const next = Math.max(0, Math.min(part === "hour" ? 23 : 59, parsed[part] + (event.key === "ArrowUp" ? 1 : -1)));
      if (next !== parsed[part]) onValueChange({ ...value, [part]: pad(next) });
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    if (disabled || composing.current) return;
    const text = event.clipboardData.getData("text");
    if (!/^\d{2}:\d{2}$/.test(text)) return;
    const [hour, minute] = text.split(":") as [string, string];
    if (!readTime({ hour, minute })) return;
    event.preventDefault();
    onValueChange({ hour, minute });
  }

  return <FormItemContext.Provider value={null}>
    <fieldset className="rain-date-picker__time rain-date-picker__time-field" data-slot="time-field" disabled={disabled} onFocus={onFocus}>
      <legend>{label}时间</legend>
      <div className="rain-date-picker__time-controls" data-slot="time-controls">
        {(["hour", "minute"] as const).map((part, index) => <span className="rain-date-picker__time-segment" key={part}>
          {index > 0 ? <span aria-hidden="true" data-slot="time-separator">:</span> : null}
          <Input id={`rain-date-time-${id}-${part}`} aria-label={`${label}${part === "hour" ? "小时" : "分钟"}`}
            aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}
            value={value[part]} disabled={disabled} clearable={false} inputMode="numeric" size={28} status={error ? "error" : "default"}
            onValueChange={text => onValueChange({ ...value, [part]: text })}
            onBlur={event => normalize(part, event.currentTarget.value)} onKeyDown={event => handleKeyDown(event, part)} onPaste={handlePaste}
            onCompositionStart={() => { composing.current = true; setCompositionActive(true); onCompositionChange?.(true); }}
            onCompositionEnd={() => { composing.current = false; setCompositionActive(false); onCompositionChange?.(false); }} />
        </span>)}
        <Select className="rain-date-picker__time-suggestions" aria-label={`${label}常用时间`} size={28}
          value={currentText} selectedOptions={currentText ? [{ value: currentText, label: currentText }] : undefined}
          options={options} placeholder="常用时间" clearable={false} disabled={disabled || compositionActive} onOpenChange={onOpenChange}
          onValueChange={next => {
            if (disabled || composing.current || typeof next !== "string") return;
            const [hour, minute] = next.split(":") as [string, string];
            const parsed = readTime({ hour, minute });
            if (parsed && !suggestionDisabled?.(parsed)) onValueChange({ hour, minute });
          }} />
      </div>
      {error ? <span id={errorId} className="rain-date-picker__time-error" data-slot="time-error">{error}</span> : null}
    </fieldset>
  </FormItemContext.Provider>;
}
