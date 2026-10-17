import { forwardRef, useId, type AriaAttributes } from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useDensity } from "@rain-next/foundations";
import { InsideFieldLabel, mergeFieldIds, useFormItem } from "../input/form-item";
import { rainCn } from "../utils/rain-class-names";
import "./slider.css";

export type SliderRange = readonly [number, number];
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
}
export type SliderProps = SliderBaseProps & (
  | { range?: false; value?: number; defaultValue?: number; onValueChange?: (value: number, details: SliderChangeDetails) => void; onValueCommitted?: (value: number, details: SliderCommitDetails) => void }
  | { range: true; value?: SliderRange; defaultValue?: SliderRange; onValueChange?: (value: SliderRange, details: SliderChangeDetails) => void; onValueCommitted?: (value: SliderRange, details: SliderCommitDetails) => void }
);

/** Adapted from shadcn Base UI Slider, commit 3ba91b1cc83e1bbe4ab35a422ff2a694849c5048 (MIT). */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(props, ref) {
  const field = useFormItem(), generatedId = useId(), density = useDensity();
  const { min = 0, max = 100, step = 1 } = props;
  const disabled = Boolean(props.disabled || field?.disabled), id = field?.id ?? props.id ?? `rain-slider-${generatedId}`;
  if (![min, max, step].every(Number.isFinite) || min >= max || step <= 0) throw new Error("Slider requires finite min < max and a positive step.");
  for (const value of [props.value, props.defaultValue]) {
    if (value === undefined) continue;
    if (props.range ? !Array.isArray(value) || value.length !== 2 || !value.every(Number.isFinite) || value[0] > value[1]
      : typeof value !== "number" || !Number.isFinite(value)) throw new Error("Slider value must match its single or ordered range mode.");
  }
  const label = props["aria-label"] ?? field?.labelText;
  const labelledBy = mergeFieldIds(props["aria-labelledby"], field?.labelId);
  const invalid = field?.status === "error" ? true : props["aria-invalid"];
  const description = mergeFieldIds(props["aria-describedby"], field?.descriptionIds);
  return <SliderPrimitive.Root<number | readonly number[]> ref={ref} data-rain-id="ui-slider" data-slot="root" data-density={density}
    data-status={field?.status ?? "default"} className={rainCn("rain-slider", props.className)}
    value={props.value} defaultValue={props.defaultValue ?? (props.range ? [min, max] : min)} min={min} max={max} step={step}
    largeStep={props.largeStep} disabled={disabled} name={props.name} form={props.form} orientation="horizontal"
    aria-label={label} aria-labelledby={labelledBy} thumbAlignment="edge" thumbCollisionBehavior="none"
    onValueChange={(value, details) => {
      if (props.range) props.onValueChange?.(value as SliderRange, details);
      else props.onValueChange?.(value as number, details);
    }}
    onValueCommitted={(value, details) => {
      if (props.range) props.onValueCommitted?.(value as SliderRange, details);
      else props.onValueCommitted?.(value as number, details);
    }}>
    <InsideFieldLabel disabled={disabled} />
    <SliderPrimitive.Control className="rain-slider__control" data-slot="control">
      <SliderPrimitive.Track className="rain-slider__track" data-slot="track">
        <SliderPrimitive.Indicator className="rain-slider__range" data-slot="range" />
      </SliderPrimitive.Track>
      {Array.from({ length: props.range ? 2 : 1 }, (_, index) => <SliderPrimitive.Thumb key={index} index={index}
        className="rain-slider__thumb" data-slot="thumb" aria-describedby={description}
        aria-label={props.range ? props.thumbLabels?.[index] ?? `${label ?? "范围"}${index ? "上限" : "下限"}` : label}
        aria-labelledby={props.range ? undefined : labelledBy} getAriaValueText={props.getAriaValueText}
        inputRef={input => {
          // Base UI's Thumb id addresses its wrapper; label/status belong on its native range input.
          if (!input) return;
          input.id = index ? `${id}-end` : id;
          if (invalid !== undefined) input.setAttribute("aria-invalid", String(invalid));
          else input.removeAttribute("aria-invalid");
        }} />)}
    </SliderPrimitive.Control>
  </SliderPrimitive.Root>;
});
