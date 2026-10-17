import { forwardRef, useEffect, useId, useState, type AriaAttributes, type CSSProperties, type SyntheticEvent } from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useDensity } from "@rain-next/foundations";
import { InsideFieldLabel, mergeFieldIds, useFormItem } from "../input/form-item";
import { rainCn } from "../utils/rain-class-names";
import { Tooltip } from "../tooltip/tooltip";
import "./slider.css";

export type SliderRange = readonly [number, number];
export interface SliderMark { value: number; label: string }
export type SliderChangeDetails = SliderPrimitive.Root.ChangeEventDetails;
export type SliderCommitDetails = SliderPrimitive.Root.CommitEventDetails;
interface SliderBaseProps extends Pick<AriaAttributes, "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"> {
  id?: string;
  name?: string;
  form?: string;
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  disabled?: boolean;
  className?: string;
  thumbLabels?: readonly [string, string];
  getAriaValueText?: (formattedValue: string, value: number, index: number) => string;
  marks?: readonly SliderMark[];
  formatValue?: (value: number, index: number) => string;
  showValue?: boolean;
}
export type SliderProps = SliderBaseProps & (
  | { range?: false; value?: number; defaultValue?: number; onValueChange?: (value: number, details: SliderChangeDetails) => void; onValueCommitted?: (value: number, details: SliderCommitDetails) => void }
  | { range: true; value?: SliderRange; defaultValue?: SliderRange; onValueChange?: (value: SliderRange, details: SliderChangeDetails) => void; onValueCommitted?: (value: SliderRange, details: SliderCommitDetails) => void }
);

/** Adapted from shadcn Base UI Slider, commit 3ba91b1cc83e1bbe4ab35a422ff2a694849c5048 (MIT). */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(props, ref) {
  const field = useFormItem(), generatedId = useId(), density = useDensity();
  const [focused, setFocused] = useState<number | null>(null), [openTip, setOpenTip] = useState<number | null>(null);
  const [tipDismissed, setTipDismissed] = useState(false);
  const [overlapDragDocument, setOverlapDragDocument] = useState<Document | null>(null);
  useEffect(() => {
    if (!overlapDragDocument) return;
    const end = () => setOverlapDragDocument(null), events = ["pointerup", "pointercancel", "touchend", "touchcancel"];
    events.forEach(event => overlapDragDocument.addEventListener(event, end));
    return () => events.forEach(event => overlapDragDocument.removeEventListener(event, end));
  }, [overlapDragDocument]);
  const { min = 0, max = 100, step = 1 } = props;
  const disabled = Boolean(props.disabled || field?.disabled), id = field?.id ?? props.id ?? `rain-slider-${generatedId}`;
  if (![min, max, step].every(Number.isFinite) || min >= max || step <= 0) throw new Error("Slider requires finite min < max and a positive step.");
  for (const value of [props.value, props.defaultValue]) {
    if (value === undefined) continue;
    if (props.range ? !Array.isArray(value) || value.length !== 2 || !value.every(Number.isFinite) || value[0] > value[1]
      : typeof value !== "number" || !Number.isFinite(value)) throw new Error("Slider value must match its single or ordered range mode.");
  }
  const marks = props.marks ?? [];
  if (!Array.isArray(marks) || marks.some(mark => !Number.isFinite(mark.value) || mark.value < min || mark.value > max || typeof mark.label !== "string" || !mark.label.trim())
    || new Set(marks.map(mark => mark.value)).size !== marks.length) throw new Error("Slider marks require unique finite values within min/max and plain text labels.");
  function format(value: number, index: number) {
    const text = props.formatValue ? props.formatValue(value, index) : String(value);
    if (typeof text !== "string") throw new Error("Slider formatValue must return plain text.");
    return text;
  }
  const label = props["aria-label"] ?? field?.labelText;
  const labelledBy = mergeFieldIds(props["aria-labelledby"], field?.labelId);
  const invalid = field?.status === "error" ? true : props["aria-invalid"];
  const description = mergeFieldIds(props["aria-describedby"], field?.descriptionIds);
  function startOverlapDrag(event: SyntheticEvent<HTMLDivElement>, values: readonly number[]) {
    const thumb = (event.target as Element).closest('[data-slot="thumb"]');
    const opening = !disabled && props.range && values[0] === values[1] && thumb && !("button" in event && event.button !== 0);
    setOverlapDragDocument(opening ? event.currentTarget.ownerDocument : null);
    // Avoid a deferred Base UI focus restoring the originally hit thumb after direction selects the other endpoint.
    if (opening) thumb.querySelector<HTMLInputElement>('input[type="range"]')?.focus({ preventScroll: true });
  }
  return <SliderPrimitive.Root<number | readonly number[]> ref={ref} data-rain-id="ui-slider" data-slot="root" data-density={density}
    data-status={field?.status ?? "default"} className={rainCn("rain-slider", props.className)}
    value={props.value} defaultValue={props.defaultValue ?? (props.range ? [min, max] : min)} min={min} max={max} step={step}
    largeStep={props.largeStep} disabled={disabled} name={props.name} form={props.form} orientation="horizontal"
    aria-label={label} aria-labelledby={labelledBy} thumbAlignment="edge" thumbCollisionBehavior={overlapDragDocument ? "swap" : "none"}
    onValueChange={(value, details) => {
      if (props.range) props.onValueChange?.(value as SliderRange, details);
      else props.onValueChange?.(value as number, details);
      // Let the first accepted direction select an overlapping endpoint, then keep that endpoint fixed.
      if (!details.isCanceled && Array.isArray(value) && value[0] !== value[1]) setOverlapDragDocument(null);
    }}
    onValueCommitted={(value, details) => {
      if (props.range) props.onValueCommitted?.(value as SliderRange, details);
      else props.onValueCommitted?.(value as number, details);
    }} render={(rootProps, state) => <div {...rootProps}>
      <InsideFieldLabel disabled={disabled} />
      <SliderPrimitive.Control className="rain-slider__control" data-slot="control"
        onPointerDownCapture={event => { setFocused(null); setTipDismissed(false); startOverlapDrag(event, state.values); }}
        onTouchStartCapture={event => startOverlapDrag(event, state.values)}>
        <SliderPrimitive.Track className="rain-slider__track" data-slot="track">
          <SliderPrimitive.Indicator className="rain-slider__range" data-slot="range" />
        </SliderPrimitive.Track>
        {state.values.map((value, index) => {
          const endpoint = props.range ? props.thumbLabels?.[index] ?? `${label ?? "范围"}${index ? "上限" : "下限"}` : label;
          const active = (focused ?? state.activeThumbIndex) === index;
          const visible = !disabled && props.showValue !== false && !tipDismissed && (state.dragging ? state.activeThumbIndex === index : openTip === index);
          return <Tooltip key={index} text={props.range ? `${index ? "上限" : "下限"} ${format(value, index)}` : format(value, index)}
            placement="top" portal open={visible} disabled={disabled || props.showValue === false} openDelay={0} closeDelay={0}
            onOpenChange={(open, details) => {
              setOpenTip(current => open ? index : current === index ? null : current);
              if (open) setTipDismissed(false);
              else if (details.reason === "escape-key") setTipDismissed(true);
            }}>
            <SliderPrimitive.Thumb index={index} className="rain-slider__thumb" data-slot="thumb" data-active={active}
              aria-describedby={description} aria-label={endpoint} aria-labelledby={props.range ? undefined : labelledBy}
              getAriaValueText={props.getAriaValueText ?? ((_, current, currentIndex) => format(current, currentIndex))}
              onFocus={() => { setFocused(index); setOpenTip(index); setTipDismissed(false); }}
              onBlur={() => setFocused(null)}
              inputRef={input => {
                if (!input) return;
                input.id = index ? `${id}-end` : id;
                input.setAttribute("aria-valuemin", String(props.range && index ? state.values[0] : min));
                input.setAttribute("aria-valuemax", String(props.range && !index ? state.values[1] : max));
                // aria-valuetext already announces the value; retain only the field's real description.
                if (description) input.setAttribute("aria-describedby", description);
                else input.removeAttribute("aria-describedby");
                if (invalid !== undefined) input.setAttribute("aria-invalid", String(invalid));
                else input.removeAttribute("aria-invalid");
              }} />
          </Tooltip>;
        })}
      </SliderPrimitive.Control>
      {marks.length > 0 && <div className="rain-slider__marks" data-slot="marks" aria-hidden="true"><div className="rain-slider__marks-rail">
        {marks.map(mark => <span key={mark.value} className="rain-slider__mark" data-slot="mark" data-value={mark.value}
          data-edge={mark.value === min ? "start" : mark.value === max ? "end" : undefined}
          data-selected={mark.value >= (props.range ? state.values[0]! : min) && mark.value <= state.values.at(-1)!}
          style={{ "--rain-slider-mark-position": `${(mark.value - min) / (max - min) * 100}%` } as CSSProperties}>
          <span className="rain-slider__mark-tick" /><span className="rain-slider__mark-label">{mark.label}</span>
        </span>)}
      </div></div>}
    </div>} />;
});
