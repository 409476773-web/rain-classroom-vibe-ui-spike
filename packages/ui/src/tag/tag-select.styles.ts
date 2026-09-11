export const tagSelectPaints = {
  popup: "bg-rain-category-background-neutral-1 border-rain-category-border-neutral-2",
  option: "text-rain-category-text-neutral-1 data-[selected]:text-rain-category-text-brand-1 data-[disabled]:text-rain-category-text-neutral-6",
  active: "data-[highlighted]:bg-rain-category-fill-neutral-alpha-6",
  indicator: "text-rain-category-icon-brand-1 group-data-[disabled]/option:text-rain-category-icon-neutral-5",
} as const;

export const tagSelectPopupClassName = "rain-tag-select__popup box-border rounded-rain-8 border-solid border-rain-line-1 p-rain-4 shadow-rain-overlay rain-type-ui-default";
export const tagSelectOptionClassName = "rain-tag-select__option group/option flex min-w-0 items-center justify-between gap-rain-12 rounded-rain-4 px-rain-8 py-rain-6 cursor-pointer select-none outline-none data-[disabled]:cursor-not-allowed";
