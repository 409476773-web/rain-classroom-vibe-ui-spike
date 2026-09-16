import { defineRainLocalRecipe } from "../recipes/local-recipe";

export const paginationIconClassName = "rain-pagination__navigation-icon text-rain-category-icon-neutral-3 aria-disabled:text-rain-category-icon-neutral-5";
export const paginationIconButtonRecipe = defineRainLocalRecipe<"root", "ui-icon-button">({
  id: "pagination-navigation-icon", scope: "feature", origin: "ui-icon-button",
  classes: { root: paginationIconClassName }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
});

export const paginationRootClassName = "rain-pagination relative flex min-w-0 w-full items-center gap-rain-12 text-rain-category-text-neutral-3";
export const paginationGroupClassName = "flex min-w-0 max-w-full items-center gap-rain-8";
export const paginationListClassName = "flex min-w-0 max-w-full items-center gap-rain-4 m-rain-0 p-rain-0 list-none";
export const paginationPageClassName = "rain-pagination__page box-border inline-flex flex-none items-center justify-center rounded-rain-6 border-none bg-transparent px-rain-4 text-inherit no-underline cursor-pointer select-none data-[current=true]:bg-rain-category-fill-brand-alpha-4 data-[current=true]:text-rain-category-text-brand-1 enabled:hover:bg-rain-category-fill-brand-alpha-4 enabled:active:bg-rain-category-fill-brand-alpha-3 disabled:cursor-not-allowed disabled:text-rain-category-text-neutral-6";
export const paginationLinkClassName = "aria-disabled:cursor-not-allowed aria-disabled:text-rain-category-text-neutral-6";
export const paginationSizeTypography = { 24: "rain-type-ui-compact", 28: "rain-type-ui-default", 32: "rain-type-ui-default" } as const;
