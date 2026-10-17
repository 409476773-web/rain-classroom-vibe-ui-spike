/** Shared identity geometry; option text and media keep their own typography. */
const questionOptionSizes = {
  20: { control: "size-rain-20 text-rain-size-11 leading-rain-16", radius: "rounded-rain-4", symbol: "size-rain-icon-12", contentHeight: "min-h-rain-20" },
  24: { control: "size-rain-24 text-rain-size-12 leading-rain-18", radius: "rounded-rain-6", symbol: "size-rain-icon-14", contentHeight: "min-h-rain-24" },
  28: { control: "size-rain-28 text-rain-size-14 leading-rain-20", radius: "rounded-rain-6", symbol: "size-rain-icon-16", contentHeight: "min-h-rain-28" },
  32: { control: "size-rain-32 text-rain-size-15 leading-rain-22", radius: "rounded-rain-6", symbol: "size-rain-icon-18", contentHeight: "min-h-rain-32" },
  36: { control: "size-rain-36 text-rain-size-16 leading-rain-24", radius: "rounded-rain-8", symbol: "size-rain-icon-20", contentHeight: "min-h-rain-36" },
  40: { control: "size-rain-40 text-rain-size-18 leading-rain-26", radius: "rounded-rain-8", symbol: "size-rain-icon-22", contentHeight: "min-h-rain-40" },
} as const;

export type QuestionOptionSize = keyof typeof questionOptionSizes;

export function getQuestionOptionSize(size: QuestionOptionSize) {
  if (typeof size !== "number" || !Object.hasOwn(questionOptionSizes, size)) throw new Error("Question/option size must be 20, 24, 28, 32, 36 or 40.");
  return questionOptionSizes[size];
}
