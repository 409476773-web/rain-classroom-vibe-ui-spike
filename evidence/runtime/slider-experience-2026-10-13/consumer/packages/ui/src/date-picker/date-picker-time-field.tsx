import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Input } from "../input/input";
import { FormItemContext } from "../input/form-item";
import { readTime, type TimeText } from "./date-picker.utils";
export type { TimeText } from "./date-picker.utils";

export type TimeFieldProps = {
  label: string;
  value: TimeText;
  onValueChange: (value: TimeText) => void;
  disabled?: boolean;
  step?: 5 | 15 | 30;
  error?: string;
  errorId?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onCompositionChange?: (composing: boolean) => void;
  onTextPresenceChange?: (hasText: boolean) => void;
};

const pad = (part: number) => String(part).padStart(2, "0");
const formatTime = (value: TimeText) => value.hour || value.minute ? `${value.hour}:${value.minute}` : "";
function splitTime(text: string): TimeText {
  const separator = text.indexOf(":");
  return separator < 0 ? { hour: text, minute: "" }
    : { hour: text.slice(0, separator), minute: text.slice(separator + 1) };
}

export function TimeField({ label, value, onValueChange, disabled = false, step = 15, error, errorId,
  onBlur, onFocus, onCompositionChange, onTextPresenceChange }: TimeFieldProps) {
  const id = useId(), composing = useRef(false);
  // Preserve typed separators, but let a new parent draft clear even ":" (two empty segments).
  const [draft, setDraft] = useState(() => ({ value, text: formatTime(value) }));
  if (value !== draft.value) {
    setDraft({ value, text: formatTime(value) });
  }
  if (![5, 15, 30].includes(step)) throw new Error("DatePicker time step must be 5, 15 or 30.");

  function changeText(text: string) {
    if (disabled) return;
    const next = splitTime(text);
    setDraft({ value: next, text });
    onValueChange(next);
    onTextPresenceChange?.(Boolean(text));
  }

  function normalize(text: string) {
    if (disabled || composing.current) return;
    const parsed = readTime(splitTime(text));
    if (parsed) {
      const normalized = `${pad(parsed.hour)}:${pad(parsed.minute)}`;
      if (normalized !== text) changeText(normalized);
    }
    onBlur?.();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const isComposing = composing.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229;
    if (event.key === "Enter") {
      event.stopPropagation();
      if (!isComposing) { event.preventDefault(); normalize(event.currentTarget.value); }
    } else if (!disabled && !isComposing && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault(); event.stopPropagation();
      const parsed = readTime(splitTime(event.currentTarget.value));
      if (!parsed) return;
      const minutes = parsed.hour * 60 + parsed.minute;
      const next = Math.max(0, Math.min(1439, minutes + (event.key === "ArrowUp" ? 1 : -1)));
      if (next !== minutes) changeText(`${pad(Math.floor(next / 60))}:${pad(next % 60)}`);
    }
  }

  return <FormItemContext.Provider value={null}>
    <div className="rain-date-picker__time rain-date-picker__time-field" data-slot="time-field">
      <Input id={`rain-date-time-${id}`} aria-label={`${label}时间`}
        aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}
        value={draft.text} disabled={disabled} clearable={false} placeholder="HH:mm" size={32}
        status={error ? "error" : "default"} onFocus={onFocus} onValueChange={changeText}
        onBlur={event => normalize(event.currentTarget.value)} onKeyDown={handleKeyDown}
        onCompositionStart={() => { composing.current = true; onCompositionChange?.(true); }}
        onCompositionEnd={() => { composing.current = false; onCompositionChange?.(false); }} />
    </div>
  </FormItemContext.Provider>;
}
