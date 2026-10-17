export const questionNumberFeedbackLabels = {
  none: "", answered: "已作答", correct: "正确", wrong: "错误",
  unanswered: "未作答", pending: "待批改", reviewed: "已批改",
} as const;

export type QuestionNumberFeedback = keyof typeof questionNumberFeedbackLabels;
export type QuestionNumberPart = "root" | "control" | "label" | "feedback";

export const questionNumberControlColors = {
  none: "bg-rain-action-ghost text-rain-category-text-neutral-2 border-rain-category-border-neutral-3",
  answered: "bg-rain-category-fill-brand-alpha-4 text-rain-category-text-brand-2 border-rain-category-border-brand-3",
  correct: "bg-rain-category-fill-green-alpha-2 text-rain-category-text-green-2 border-rain-category-border-green-2",
  wrong: "bg-rain-category-fill-red-alpha-2 text-rain-category-text-red-2 border-rain-category-border-red-2",
  unanswered: "bg-rain-category-fill-orange-alpha-2 text-rain-category-text-orange-2 border-rain-category-border-orange-2",
  pending: "bg-rain-category-fill-brand-alpha-4 text-rain-category-text-brand-2 border-rain-category-border-brand-3",
  reviewed: "bg-rain-category-fill-brand-alpha-4 text-rain-category-text-brand-2 border-rain-category-border-brand-3",
} as const;

export const questionNumberHoverColors = {
  none: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-4",
  answered: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-3",
  correct: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-green-alpha-1",
  wrong: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-red-alpha-1",
  unanswered: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-orange-alpha-1",
  pending: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-3",
  reviewed: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-3",
} as const;

export const questionNumberMarkerColors = {
  correct: "bg-rain-category-fill-green-solid-2 text-rain-category-oncolor-1",
  wrong: "bg-rain-category-fill-red-solid-2 text-rain-category-oncolor-1",
  unanswered: "bg-rain-category-fill-orange-solid-2 text-rain-category-oncolor-1",
  pending: "bg-rain-category-background-neutral-1 text-rain-category-icon-brand-2",
  reviewed: "bg-rain-category-background-neutral-1 text-rain-category-icon-brand-2",
} as const;

export const questionNumberStateColors = {
  currentHover: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-solid-1",
  currentControl: "border-none bg-rain-category-fill-brand-solid-2 text-rain-category-oncolor-1",
  disabledControl: "bg-rain-category-fill-neutral-alpha-4 text-rain-category-text-neutral-5 border-rain-category-border-neutral-3",
} as const;
