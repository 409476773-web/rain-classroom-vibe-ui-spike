export type OptionButtonPart = "root" | "input" | "control" | "label" | "content" | "media";
export type OptionButtonAppearance = "filled" | "outlined";
export type OptionFeedback = "none" | "correct" | "wrong";

export const optionFeedbackControlColors = {
  correct: "bg-rain-category-fill-green-solid-2 text-rain-category-oncolor-1",
  wrong: "bg-rain-category-fill-red-solid-2 text-rain-category-oncolor-1",
} as const;

export const optionControlColors = {
  filled: "bg-rain-category-fill-neutral-alpha-4 text-rain-category-text-neutral-2",
  outlined: "bg-rain-action-ghost text-rain-category-text-neutral-2 border-rain-category-border-neutral-3",
  selected: "bg-rain-category-fill-brand-solid-2 text-rain-category-oncolor-1",
  disabled: "peer-disabled:bg-rain-category-fill-neutral-alpha-4 peer-disabled:text-rain-category-text-neutral-5 peer-disabled:border-rain-category-border-neutral-3",
  disabledSelected: "peer-disabled:bg-rain-category-fill-neutral-solid-2 peer-disabled:text-rain-category-text-neutral-5",
} as const;

export const optionRowColors = {
  default: "bg-rain-action-ghost text-rain-category-text-neutral-1 border-rain-action-ghost",
  selected: "bg-rain-category-fill-brand-alpha-4 text-rain-category-text-neutral-1 border-rain-category-border-brand-3",
  disabled: "has-[:disabled]:bg-rain-action-ghost has-[:disabled]:text-rain-category-text-neutral-5 has-[:disabled]:border-rain-action-ghost",
  disabledSelected: "has-[:disabled]:bg-rain-category-fill-neutral-alpha-6 has-[:disabled]:text-rain-category-text-neutral-5 has-[:disabled]:border-rain-category-border-neutral-3",
} as const;

export const optionControlInteractions = {
  filled: "has-[:enabled]:hover:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-3 has-[:enabled]:active:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-2",
  outlined: "has-[:enabled]:hover:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-6 has-[:enabled]:active:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-4",
  selected: "has-[:enabled]:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-1 has-[:enabled]:active:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-1",
} as const;

export const optionRowInteractions = {
  default: "has-[:enabled]:hover:bg-rain-category-fill-neutral-alpha-6 has-[:enabled]:active:bg-rain-category-fill-neutral-alpha-4",
  selected: "has-[:enabled]:hover:bg-rain-category-fill-brand-alpha-3 has-[:enabled]:active:bg-rain-category-fill-brand-alpha-3",
} as const;
