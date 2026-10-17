import { cva } from "class-variance-authority";

export type FieldAppearance = "outlined" | "filled" | "underlined";
export type FieldStatus = "default" | "warning" | "error";

export const fieldFrameRecipe = cva(
  "rain-field-frame relative box-border inline-flex min-w-0 items-center gap-rain-4 border-solid border-rain-line-1 overflow-visible",
  {
    variants: {
      size: {
        24: "px-rain-8 rounded-rain-4 rain-type-ui-compact",
        28: "px-rain-12 rounded-rain-6 rain-type-ui-default",
        32: "px-rain-12 rounded-rain-6 rain-type-ui-default",
        36: "px-rain-12 rounded-rain-6 rain-type-ui-default",
      },
      appearance: {
        outlined: "bg-rain-category-fill-neutral-solid-7 border-rain-category-border-neutral-2",
        filled: "bg-rain-category-fill-neutral-solid-6 border-transparent",
        underlined: "bg-transparent border-rain-category-border-neutral-2",
      },
      status: {
        default: null,
        warning: "bg-rain-category-fill-orange-solid-3 border-rain-category-border-orange-1",
        error: "bg-rain-category-fill-red-solid-3 border-rain-category-border-red-1",
      },
      state: {
        editable: "text-rain-category-text-neutral-1",
        readonly: "text-rain-category-text-neutral-1",
        disabled: "cursor-not-allowed text-rain-category-text-neutral-6",
      },
    },
    compoundVariants: [
      { state: "editable", status: "default", appearance: "outlined", class: "hover:border-rain-category-border-neutral-1 has-[:focus]:border-rain-category-border-brand-1 has-[:focus]:bg-rain-category-fill-brand-alpha-4 data-[open=true]:border-rain-category-border-brand-1 data-[open=true]:bg-rain-category-fill-brand-alpha-4" },
      { state: "editable", status: "default", appearance: "filled", class: "hover:bg-rain-category-fill-neutral-solid-5 has-[:focus]:border-rain-category-border-brand-1 has-[:focus]:bg-rain-category-fill-neutral-solid-6 data-[open=true]:border-rain-category-border-brand-1 data-[open=true]:bg-rain-category-fill-neutral-solid-6" },
      { state: "editable", status: "default", appearance: "underlined", class: "hover:bg-rain-category-fill-neutral-alpha-6 hover:border-rain-category-border-neutral-1 has-[:focus]:border-rain-category-border-brand-1 has-[:focus]:bg-rain-category-fill-brand-alpha-4 data-[open=true]:border-rain-category-border-brand-1 data-[open=true]:bg-rain-category-fill-brand-alpha-4" },
      { appearance: "underlined", status: "warning", class: "bg-rain-category-fill-orange-alpha-2" },
      { appearance: "underlined", status: "error", class: "bg-rain-category-fill-red-alpha-2" },
      { state: "disabled", class: "bg-rain-category-fill-neutral-solid-5 border-rain-category-border-neutral-3" },
      { state: "disabled", appearance: "filled", class: "border-transparent" },
    ],
    defaultVariants: { appearance: "outlined" },
  },
);
