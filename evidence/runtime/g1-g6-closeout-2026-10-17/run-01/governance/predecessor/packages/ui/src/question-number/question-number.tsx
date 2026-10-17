import { forwardRef, type ButtonHTMLAttributes } from "react";
import { useDensity } from "@rain-next/foundations";
import { CheckBoldIcon } from "../icons/check-bold";
import { CloseBoldIcon } from "../icons/close-bold";
import { WarningBoldIcon } from "../icons/warning-bold";
import { GradingPendingIcon } from "../icons/grading-pending";
import { GradingReviewedIcon } from "../icons/grading-reviewed";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { getQuestionOptionSize, type QuestionOptionSize } from "../recipes/question-option-size";
import {
  questionNumberControlColors, questionNumberFeedbackLabels, questionNumberHoverColors, questionNumberMarkerColors, questionNumberStateColors,
  type QuestionNumberFeedback, type QuestionNumberPart,
} from "./question-number.styles";

export type { QuestionNumberFeedback, QuestionNumberPart } from "./question-number.styles";
export type QuestionNumberSize = QuestionOptionSize;

export interface QuestionNumberProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "dangerouslySetInnerHTML" | "style" | "role" | "aria-current" | "aria-pressed" | "aria-selected"> {
  number: string | number;
  size?: QuestionNumberSize;
  shape?: "square" | "circle";
  current?: boolean;
  feedback?: QuestionNumberFeedback;
  /** Layout only. Change declared visual parts through a named Local Recipe. */
  className?: string;
  localRecipe?: RainLocalRecipe<QuestionNumberPart, "ui-question-number">;
}

const feedbackIcons = {
  correct: CheckBoldIcon, wrong: CloseBoldIcon, unanswered: WarningBoldIcon,
  pending: GradingPendingIcon, reviewed: GradingReviewedIcon,
} as const;

export const QuestionNumber = forwardRef<HTMLButtonElement, QuestionNumberProps>(function QuestionNumber({
  number, size = 28, shape = "square", current = false, feedback = "none", disabled = false,
  localRecipe, className, type = "button", "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy, "aria-disabled": ariaDisabled, ...nativeProps
}, ref) {
  const density = useDensity();
  const sizeRecipe = getQuestionOptionSize(size);
  if ((typeof number !== "string" && typeof number !== "number") || !String(number).trim()
    || (typeof number === "number" && !Number.isFinite(number))) {
    throw new Error("QuestionNumber requires a non-empty string or finite number identity.");
  }
  if (!Object.hasOwn(questionNumberFeedbackLabels, feedback) || !["square", "circle"].includes(shape)) {
    throw new Error("QuestionNumber requires an approved feedback and shape.");
  }
  const unavailable = disabled || ariaDisabled === true || ariaDisabled === "true";
  const radius = shape === "circle" ? "rounded-rain-full" : sizeRecipe.radius;
  const marker = feedback === "none" || feedback === "answered" ? null : feedback;
  const FeedbackIcon = marker ? feedbackIcons[marker] : null;
  const markerSize = size >= 36 ? "size-rain-icon-14" : "size-rain-icon-12";
  const name = `第 ${number} 题${feedback === "none" ? "" : `，${questionNumberFeedbackLabels[feedback]}`}`;

  return <button
    {...nativeProps} ref={ref} type={type} disabled={unavailable}
    aria-label={ariaLabel?.trim() || (ariaLabelledBy?.trim() ? undefined : name)}
    aria-labelledby={ariaLabelledBy} aria-current={current ? "step" : undefined}
    aria-disabled={unavailable || undefined}
    data-rain-id="ui-question-number" data-slot="root" data-size={size} data-density={density}
    data-shape={shape} data-current={current} data-feedback={feedback}
    data-rain-state={unavailable ? "disabled" : "default"} data-focus="item" data-local-recipe={localRecipe?.id}
    className={rainCn(
      "rain-question-number relative inline-flex flex-none items-center justify-center box-border border-none bg-rain-action-ghost align-middle appearance-none select-none overflow-visible",
      density === "compact" ? "p-rain-4" : "p-rain-6",
      marker && (size === 20 ? "pb-rain-8" : "pb-rain-6"),
      radius, unavailable ? "cursor-not-allowed" : "cursor-pointer",
      !current && questionNumberHoverColors[feedback],
      current && questionNumberStateColors.currentHover,
      className, getRainLocalRecipePart(localRecipe, "root"),
    )}
  >
    <span data-slot="control" className={rainCn(
      "inline-flex flex-none items-center justify-center box-border border-solid font-rain-ui", sizeRecipe.control,
      radius, current ? questionNumberStateColors.currentControl : rainCn("border-rain-line-1", questionNumberControlColors[feedback]),
      unavailable && questionNumberStateColors.disabledControl,
      getRainLocalRecipePart(localRecipe, "control"),
    )}>
      <span data-slot="label" className={rainCn(current ? "font-rain-bold" : "font-rain-semibold", getRainLocalRecipePart(localRecipe, "label"))}>{number}</span>
    </span>
    {marker && FeedbackIcon && <span aria-hidden="true" data-slot="feedback" className={rainCn(
      "absolute bottom-rain-0 inline-flex items-center justify-center rounded-rain-full", markerSize,
      questionNumberMarkerColors[marker], getRainLocalRecipePart(localRecipe, "feedback"),
    )}>
      <FeedbackIcon className={marker === "pending" || marker === "reviewed" ? markerSize : size >= 36 ? "size-rain-icon-10" : "size-rain-icon-8"} />
    </span>}
  </button>;
});

QuestionNumber.displayName = "QuestionNumber";
