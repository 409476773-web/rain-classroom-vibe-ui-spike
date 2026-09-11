import { forwardRef, useId, type InputHTMLAttributes, type FieldsetHTMLAttributes } from "react";
import { useDensity } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { getQuestionOptionSize, type QuestionOptionSize } from "../recipes/question-option-size";
import { CheckBoldIcon } from "../icons/check-bold";
import { CloseBoldIcon } from "../icons/close-bold";
import { optionControlColors, optionControlInteractions, optionRowColors, optionRowInteractions, optionFeedbackControlColors, type OptionButtonAppearance, type OptionButtonPart, type OptionFeedback } from "./option-button.styles";

export type { OptionButtonAppearance, OptionButtonPart, OptionFeedback } from "./option-button.styles";
export type OptionButtonSize = QuestionOptionSize;
type OptionRecipe = RainLocalRecipe<OptionButtonPart, "ui-option-button">;

export interface OptionMedia { src: string; alt: string }
interface OptionContent {
  text?: string;
  symbol?: "true" | "false";
  media?: OptionMedia;
  feedback?: OptionFeedback;
}

export interface OptionButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "children" | "style" | "className" | "defaultChecked" | "checked" | "value" | "role" | "aria-checked" | "readOnly" | "onChange" | "dangerouslySetInnerHTML">, OptionContent {
  type: "radio" | "checkbox";
  value: string;
  label: string;
  checked: boolean;
  readOnly?: boolean;
  feedbackVisibility?: "hidden" | "visible";
  onCheckedChange?: (checked: boolean) => void;
  appearance?: OptionButtonAppearance;
  size?: OptionButtonSize;
  /** Layout only; visual changes use the declared Local Recipe parts. */
  className?: string;
  localRecipe?: OptionRecipe;
}

function nonEmpty(value: unknown): value is string { return typeof value === "string" && value.trim().length > 0; }

export const OptionButton = forwardRef<HTMLInputElement, OptionButtonProps>(function OptionButton({
  type, value, label, text, checked, onCheckedChange, appearance = "filled", size = 28, name, disabled = false,
  readOnly = false, feedback = "none", feedbackVisibility = "hidden", symbol, media,
  className, localRecipe, "aria-disabled": ariaDisabled, onClick, onKeyDown, ...inputProps
}, ref) {
  const density = useDensity(), descriptionId = useId();
  const sizeRecipe = getQuestionOptionSize(size);
  const contentGap = density === "compact" ? "gap-rain-8" : "gap-rain-12";
  if (!["radio", "checkbox"].includes(type) || !["filled", "outlined"].includes(appearance)
    || !nonEmpty(value) || !nonEmpty(label) || typeof checked !== "boolean"
    || (text !== undefined && !nonEmpty(text))) throw new Error("OptionButton requires a valid type, appearance, value, label, checked value and optional text.");
  if (type === "radio" && !nonEmpty(name)) throw new Error("A radio OptionButton requires a non-empty group name.");
  if (typeof readOnly !== "boolean" || !["none", "correct", "wrong"].includes(feedback)
    || !["hidden", "visible"].includes(feedbackVisibility)
    || (symbol !== undefined && (!["true", "false"].includes(symbol) || type !== "radio"))
    || (media !== undefined && (!media || !nonEmpty(media.src) || !nonEmpty(media.alt)))) throw new Error("OptionButton requires valid readOnly, feedback, symbol and meaningful media src/alt.");
  const unavailable = disabled || ariaDisabled === true || ariaDisabled === "true";
  const visibleFeedback = checked && feedbackVisibility === "visible" ? feedback : "none";
  const SymbolIcon = symbol === "true" ? CheckBoldIcon : CloseBoldIcon;
  const hasContent = Boolean(text || media);
  const controlState = checked ? "selected" : appearance;
  const rowState = checked ? "selected" : "default";
  const shape = type === "radio" ? "rounded-rain-full" : sizeRecipe.radius;
  return <label data-rain-id="ui-option-button" data-slot="root" data-size={size} data-density={density}
    data-checked={checked} data-disabled={unavailable} data-readonly={readOnly} data-feedback={visibleFeedback} data-appearance={appearance} data-layout={media ? "card" : text ? "row" : "standalone"}
    data-rain-state={unavailable ? "disabled" : checked ? "checked" : "default"} data-local-recipe={localRecipe?.id}
    className={rainCn("rain-option-button relative inline-flex box-border align-middle font-rain-ui text-rain-size-15 leading-rain-22",
      readOnly ? "cursor-default select-text" : "cursor-pointer select-none", "has-[:disabled]:cursor-not-allowed",
      hasContent ? rainCn("w-full min-w-rain-0 items-start rounded-rain-8 border-solid border-rain-line-1", density === "compact" ? "p-rain-8" : "p-rain-12", contentGap, optionRowColors[rowState], optionRowColors[checked ? "disabledSelected" : "disabled"], !unavailable && !readOnly && optionRowInteractions[rowState])
        : rainCn("flex-none items-center justify-center border-none bg-rain-action-ghost", density === "compact" ? "p-rain-4" : "p-rain-6", shape),
      !unavailable && !readOnly && visibleFeedback === "none" && optionControlInteractions[checked ? "selected" : appearance], className, getRainLocalRecipePart(localRecipe, "root"))}>
    <input {...inputProps} ref={ref} type={type} value={value} name={name} checked={checked} disabled={unavailable}
      readOnly={readOnly} aria-readonly={type === "checkbox" && readOnly || undefined}
      aria-describedby={[inputProps["aria-describedby"], readOnly && `${descriptionId}-readonly`, visibleFeedback !== "none" && `${descriptionId}-feedback`].filter(Boolean).join(" ") || undefined}
      aria-disabled={unavailable || undefined} data-slot="input" data-focus="item"
      className={rainCn("sr-only peer", getRainLocalRecipePart(localRecipe, "input"))}
      onClick={onClick}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!readOnly || event.defaultPrevented) return;
        if (event.key === " ") event.preventDefault();
        if (type === "radio" && ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)) {
          event.preventDefault();
          const input = event.currentTarget;
          const radios = Array.from(input.ownerDocument.querySelectorAll<HTMLInputElement>('input[type="radio"]'))
            .filter((candidate) => candidate.name === input.name && candidate.form === input.form && candidate.readOnly && !candidate.matches(":disabled"));
          const step = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
          radios[(radios.indexOf(input) + step + radios.length) % radios.length]?.focus();
        }
      }}
      onChange={(event) => {
        // Controlled restoration keeps readonly inputs submittable. Cancelling click
        // would roll a checkbox back again after React restores its checked value.
        if (readOnly) { event.currentTarget.checked = checked; return; }
        if (!unavailable) onCheckedChange?.(event.currentTarget.checked);
      }} />
    <span data-slot="control" className={rainCn("inline-flex flex-none items-center justify-center box-border border-solid", sizeRecipe.control,
      shape, checked || appearance === "filled" ? "border-none" : "border-rain-line-1", visibleFeedback === "none" ? optionControlColors[controlState] : optionFeedbackControlColors[visibleFeedback], optionControlColors[checked ? "disabledSelected" : "disabled"], getRainLocalRecipePart(localRecipe, "control"))}>
      <span data-slot="label" className={rainCn(checked ? "font-rain-bold" : "font-rain-semibold", getRainLocalRecipePart(localRecipe, "label"))}>{symbol ? <><SymbolIcon className={sizeRecipe.symbol} /><span className="sr-only">{label}</span></> : label}</span>
    </span>
    {hasContent && <span data-slot="content" className={rainCn("min-w-rain-0 break-words font-rain-regular", media ? rainCn("flex flex-1 flex-col", contentGap) : "self-center", getRainLocalRecipePart(localRecipe, "content"))}>
      {text && (media ? <span className={rainCn("flex items-center", sizeRecipe.contentHeight)}>{text}</span> : text)}
      {media && <img data-slot="media" src={media.src} alt={media.alt} draggable={false} className={rainCn("block w-full h-auto rounded-rain-6", getRainLocalRecipePart(localRecipe, "media"))} />}
    </span>}
    {visibleFeedback !== "none" && <span id={`${descriptionId}-feedback`} aria-hidden="true" data-slot="feedback" className="sr-only">
      {visibleFeedback === "correct" ? "回答正确" : "回答错误"}
    </span>}
    {readOnly && <span id={`${descriptionId}-readonly`} className="sr-only" aria-hidden="true">只读</span>}
  </label>;
});
OptionButton.displayName = "OptionButton";

export interface OptionItem extends OptionContent { value: string; label: string; disabled?: boolean }
interface OptionGroupBase extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "children" | "style" | "onChange" | "defaultValue" | "value" | "role"> {
  options: readonly OptionItem[];
  legend: string;
  appearance?: OptionButtonAppearance;
  size?: OptionButtonSize;
  readOnly?: boolean;
  feedbackVisibility?: "hidden" | "visible";
  localRecipe?: OptionRecipe;
}
export type OptionGroupProps = OptionGroupBase & (
  | { mode?: "single"; value: string | null; onValueChange: (value: string | null) => void }
  | { mode: "multiple"; value: readonly string[]; onValueChange: (value: string[]) => void }
);

export function OptionGroup(props: OptionGroupProps) {
  const generated = useId(), density = useDensity();
  const { options, legend, name, disabled = false, appearance = "filled", size = 28, localRecipe, className,
    mode = "single", value, readOnly = false, feedbackVisibility = "hidden", onValueChange: _onValueChange, "aria-disabled": ariaDisabled, ...fieldsetProps } = props;
  const unavailable = disabled || ariaDisabled === true || ariaDisabled === "true";
  if (!nonEmpty(legend) || !Array.isArray(options) || options.length === 0
    || !["single", "multiple"].includes(mode) || (name !== undefined && !nonEmpty(name))) throw new Error("OptionGroup requires a legend, options, a valid mode and optional name.");
  const keys = options.map((option) => option.value);
  if (keys.some((key) => !nonEmpty(key)) || new Set(keys).size !== keys.length) throw new Error("OptionGroup option values must be non-empty and unique.");
  if (mode === "single" ? value !== null && (typeof value !== "string" || !keys.includes(value))
    : !Array.isArray(value) || new Set(value).size !== value.length || value.some((key) => !keys.includes(key))) throw new Error("OptionGroup controlled value must match its mode and unique option values.");
  const groupName = name ?? `rain-option-${generated}`;
  return <fieldset {...fieldsetProps} disabled={unavailable} name={groupName} role={mode === "single" ? "radiogroup" : undefined}
    aria-labelledby={nonEmpty(fieldsetProps["aria-labelledby"]) ? fieldsetProps["aria-labelledby"] : nonEmpty(fieldsetProps["aria-label"]) ? undefined : `${generated}-legend`} aria-disabled={unavailable || undefined}
    aria-readonly={mode === "single" && readOnly || undefined}
    data-rain-id="ui-option-group" data-slot="root" data-size={size} data-density={density} data-mode={mode} data-readonly={readOnly} data-layout={options.some((option) => option.media) ? "cards" : "options"}
    className={rainCn("rain-option-group min-w-rain-0 m-rain-0 p-rain-0 border-none font-rain-ui text-rain-size-15 leading-rain-22", className)}>
    <legend id={`${generated}-legend`} data-slot="legend" className="p-rain-0 mb-rain-12 font-rain-semibold">{legend}</legend>
    <div data-slot="items" className={rainCn("flex items-start", density === "compact" ? "gap-rain-4" : "gap-rain-8", options.some((option) => option.text) ? "flex-col" : "flex-wrap")}>
      {options.map((option) => <OptionButton key={option.value} {...option} type={mode === "single" ? "radio" : "checkbox"}
        checked={mode === "single" ? value === option.value : (value as readonly string[]).includes(option.value)}
        name={groupName} form={fieldsetProps.form} appearance={appearance} size={size} disabled={unavailable || option.disabled} localRecipe={localRecipe} readOnly={readOnly} feedbackVisibility={feedbackVisibility}
        onCheckedChange={(checked) => {
          if (props.mode === "multiple") props.onValueChange(checked ? [...props.value, option.value] : props.value.filter((key) => key !== option.value));
          else if (checked) props.onValueChange(option.value);
        }} />)}
    </div>
  </fieldset>;
}
