import { cva } from "class-variance-authority";
import { iconButtonControlSizeClassNames, iconSizeClassNames } from "@rain-next/foundations";

/** Complete recipes: the control, icon and radius are selected together. */
export const iconButtonSizes = {
  "18/11": { control: 18, icon: 11, radius: 6 },
  "20/12": { control: 20, icon: 12, radius: 6 },
  "20/14": { control: 20, icon: 14, radius: 6 },
  "24/12": { control: 24, icon: 12, radius: 6 },
  "24/14": { control: 24, icon: 14, radius: 6 },
  "24/16": { control: 24, icon: 16, radius: 6 },
  "28/12": { control: 28, icon: 12, radius: 6 },
  "28/14": { control: 28, icon: 14, radius: 6 },
  "28/16": { control: 28, icon: 16, radius: 6 },
  "28/18": { control: 28, icon: 18, radius: 6 },
  "28/20": { control: 28, icon: 20, radius: 6 },
  "32/12": { control: 32, icon: 12, radius: 6 },
  "32/14": { control: 32, icon: 14, radius: 6 },
  "32/16": { control: 32, icon: 16, radius: 6 },
  "32/18": { control: 32, icon: 18, radius: 6 },
  "32/20": { control: 32, icon: 20, radius: 6 },
  "32/24": { control: 32, icon: 24, radius: 6 },
  "36/20": { control: 36, icon: 20, radius: 8 },
} as const;

export type IconButtonSize = keyof typeof iconButtonSizes;
export type IconButtonHighlight = "none" | "icon" | "surface";
export type IconButtonTone = "default" | "danger";
export type IconButtonState = "default" | "loading" | "disabled";
export type IconButtonPart = "root" | "icon" | "loading-indicator";

export const iconButtonRootRecipe = cva(
  "rain-icon-button box-border relative inline-flex flex-none items-center justify-center p-rain-0 border-none overflow-visible align-middle appearance-none select-none isolate transition-colors duration-rain-icon-button ease-rain-icon-button focus-visible:outline-solid motion-reduce:transition-none",
  {
    variants: {
      tone: {
        default: "text-rain-category-icon-neutral-2",
        danger: "text-rain-category-icon-red-1",
      },
      highlight: {
        none: "bg-rain-action-ghost",
        icon: "bg-rain-action-ghost",
        surface: "bg-rain-category-fill-brand-alpha-4",
      },
      state: {
        default: "cursor-pointer",
        loading: "cursor-progress",
        disabled: "cursor-not-allowed",
      },
    },
    compoundVariants: [
      { tone: "default", highlight: ["icon", "surface"], class: "text-rain-category-icon-brand-1" },
      { state: "default", tone: "default", highlight: "none", class: "hover:bg-rain-category-fill-neutral-alpha-3 active:bg-rain-category-fill-neutral-alpha-2" },
      { state: "default", tone: "default", highlight: ["icon", "surface"], class: "hover:bg-rain-category-fill-brand-alpha-3 active:bg-rain-category-fill-brand-alpha-3" },
      { state: "default", tone: "danger", class: "hover:bg-rain-category-fill-red-alpha-2 active:bg-rain-category-fill-red-alpha-1" },
      { state: "disabled", class: "text-rain-category-icon-neutral-5" },
    ],
  },
);

export function iconButtonSizeClasses(size: IconButtonSize) {
  const recipe = iconButtonSizes[size];
  return {
    root: `${iconButtonControlSizeClassNames[recipe.control]} ${recipe.radius === 8 ? "rounded-rain-8" : "rounded-rain-6"}`,
    icon: iconSizeClassNames[recipe.icon],
  };
}
