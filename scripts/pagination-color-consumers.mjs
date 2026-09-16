const ui = "packages/ui/src/pagination/";
const docs = "apps/playground/src/docs/components/";
export const paginationColorSourcePaths = [ui + "pagination.styles.ts", ui + "pagination.tsx", ui + "pagination.css", docs + "pagination-page.tsx", docs + "pagination-page.css"];

/** Exact RN-08 paint roles. Registration is not visual or contrast acceptance. */
export function getPaginationColorConsumers() {
  const evidenceRef = "docs/plans/2026-09-14-pagination-rn08.md";
  const parentSurfaces = ["Background/Neutral/1", "Background/Neutral/3"];
  const use = (tokenId, content, recipeId, context = "component-recipe") => ({
    tokenId, content, recipeId, context, evidenceRef, brandIntent: "active",
    role: tokenId.split("/")[0].toLowerCase(),
    property: /^(Background|Fill)\//.test(tokenId) ? "background-color" : tokenId.startsWith("Border/") ? "border-color" : "color",
    interaction: context === "component-recipe" && ["text", "meaningful-icon"].includes(content) ? "interactive" : "non-interactive",
    critical: ["text", "meaningful-icon"].includes(content),
  });
  const paint = (id, state, foreground, background) => ({ id: `pagination-${id}`, state,
    foreground: use(foreground, state === "disabled" ? "disabled" : "text", `pagination-${id}`),
    ...(background ? { background: use(background, "surface", `pagination-${id}`) } : {}),
  });
  const consumer = (symbol, definition, recipes) => ({ filePath: ui + "pagination.styles.ts", symbol, definition, recipes,
    kind: "static", scope: '[data-rain-id="ui-pagination"]', foregroundContent: "text", parentSurfaces, contrastReview: "pending-review" });
  const colorRecipeConsumers = [
    { ...consumer("paginationIconClassName", "rain-pagination__navigation-icon text-rain-category-icon-neutral-3 aria-disabled:text-rain-category-icon-neutral-5", [
      { id: "pagination-navigation-icon", state: "default", foreground: use("Icon/Neutral/3", "meaningful-icon", "pagination-navigation-icon") },
      { id: "pagination-navigation-icon-disabled", state: "disabled", foreground: use("Icon/Neutral/5", "disabled", "pagination-navigation-icon-disabled") },
    ]), foregroundContent: "meaningful-icon" },
    consumer("paginationRootClassName", "rain-pagination relative flex min-w-0 w-full items-center gap-rain-12 text-rain-category-text-neutral-3",
      [paint("ordinary-text", "default", "Text/Neutral/3")]),
    consumer("paginationPageClassName", "rain-pagination__page box-border inline-flex flex-none items-center justify-center rounded-rain-6 border-none bg-transparent px-rain-4 text-inherit no-underline cursor-pointer select-none data-[current=true]:bg-rain-category-fill-brand-alpha-4 data-[current=true]:text-rain-category-text-brand-1 enabled:hover:bg-rain-category-fill-brand-alpha-4 enabled:active:bg-rain-category-fill-brand-alpha-3 disabled:cursor-not-allowed disabled:text-rain-category-text-neutral-6",
      [paint("page", "default", "Text/Neutral/3"), paint("page-hover", "hover", "Text/Neutral/3", "Fill/Brand/Alpha/4"),
        paint("page-pressed", "pressed", "Text/Neutral/3", "Fill/Brand/Alpha/3"),
        paint("current", "selected", "Text/Brand/1", "Fill/Brand/Alpha/4"),
        paint("current-hover", "hover", "Text/Brand/1", "Fill/Brand/Alpha/4"),
        paint("current-pressed", "pressed", "Text/Brand/1", "Fill/Brand/Alpha/3"),
        paint("page-disabled", "disabled", "Text/Neutral/6"), paint("current-disabled", "disabled", "Text/Neutral/6", "Fill/Brand/Alpha/4")]),
    consumer("paginationLinkClassName", "aria-disabled:cursor-not-allowed aria-disabled:text-rain-category-text-neutral-6",
      [paint("link-disabled", "disabled", "Text/Neutral/6"), paint("current-link-disabled", "disabled", "Text/Neutral/6", "Fill/Brand/Alpha/4")]),
  ];
  const css = (filePath, selector, property, value, tokenId, content, surfaces, context = "local-recipe") => ({
    filePath, selector, property, value, scope: context === "local-recipe" ? ".pagination-page" : ".rain-pagination",
    parentSurfaces: surfaces, contrastReview: "pending-review", use: use(tokenId, content, "pagination-parts", context),
  });
  const colorCssConsumers = [
    css(docs + "pagination-page.css", ".pagination-page__width-control input", "accent-color", "var(--rain-category-fill-brand-solid-1)", "Fill/Brand/Solid/1", "surface", ["Background/Neutral/3"]),
    css(docs + "pagination-page.css", ".pagination-page__width-control output", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text", ["Background/Neutral/3"]),
    css(docs + "pagination-page.css", ".pagination-page__preview", "background", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface", ["Background/Neutral/3"]),
    css(docs + "pagination-page.css", ".pagination-page__records li", "border-bottom", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative", ["Background/Neutral/1"]),
    css(docs + "pagination-page.css", ".pagination-page__records li > :first-child", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text", ["Background/Neutral/1"]),
    css(docs + "pagination-page.css", ".pagination-page__state", "background", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface", ["Background/Neutral/3"]),
    css(docs + "pagination-page.css", ".pagination-page__api dd", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text", ["Background/Neutral/3"]),
    ...["hover", "active"].map((state, index) => css(ui + "pagination.css", `.rain-pagination__page:is(a):not([aria-disabled="true"]):${state}`, "background",
      `var(--rain-category-fill-brand-alpha-${4 - index})`, `Fill/Brand/Alpha/${4 - index}`, "surface", parentSurfaces, "component-recipe")),
    { ...css(ui + "pagination.css", '.rain-pagination__page:where(a)[data-current="true"]', "color", "var(--rain-category-text-brand-1)",
      "Text/Brand/1", "text", ["Fill/Brand/Alpha/4", "Fill/Brand/Alpha/3"], "component-recipe"), parentBackgrounds: parentSurfaces },
    { ...css(ui + "pagination.css", '.rain-pagination__page:where(a)[aria-disabled="true"]', "color", "var(--rain-category-text-neutral-6)",
      "Text/Neutral/6", "disabled", [...parentSurfaces, "Fill/Brand/Alpha/4"], "component-recipe"), parentBackgrounds: parentSurfaces },
    css(ui + "pagination.css", '.rain-pagination__page:where(a):not([data-slot="page"]):not([aria-disabled="true"])', "color",
      "var(--rain-category-icon-neutral-3)", "Icon/Neutral/3", "meaningful-icon", parentSurfaces, "component-recipe"),
    ...['.rain-pagination__navigation-icon:not([aria-disabled="true"]):is(:hover, :active)',
      '.rain-pagination__size-trigger:not(:disabled):not([aria-disabled="true"]):is(:hover, :active) .rain-pagination__navigation-icon'].map(selector => ({
        ...css(ui + "pagination.css", selector, "color", "var(--rain-category-icon-neutral-2)", "Icon/Neutral/2", "meaningful-icon",
          [...parentSurfaces, "Fill/Neutral/Alpha/3", "Fill/Neutral/Alpha/2", "Fill/Brand/Alpha/4", "Fill/Brand/Alpha/3"], "component-recipe"), parentBackgrounds: parentSurfaces,
      })),
  ];
  const inlineConsumers = [{ filePath: ui + "pagination.tsx", source: '"w-full text-rain-category-text-red-1"',
    scope: '.rain-pagination__settings [data-slot="jump-error"]', parentSurfaces, contrastReview: "pending-review",
    use: { ...use("Text/Red/1", "text", "pagination-jump-error"), interaction: "non-interactive" } },
    { filePath: ui + "pagination.tsx", source: '"rain-type-ui-compact text-rain-category-text-neutral-3"', scope: '[data-slot="page-size-unit"]', parentSurfaces,
      contrastReview: "pending-review", use: use("Text/Neutral/3", "text", "pagination-page-size-unit") },
    { filePath: ui + "pagination.tsx", source: '"text-rain-category-text-neutral-1"', scope: '[data-slot="page-size-value"]', parentSurfaces,
      contrastReview: "pending-review", use: use("Text/Neutral/1", "text", "pagination-page-size-value") },
    { filePath: ui + "pagination.tsx", source: '"rain-pagination__settings flex flex-col gap-rain-12 text-rain-category-text-neutral-3"', scope: '.rain-pagination__settings',
      parentSurfaces, contrastReview: "pending-review", use: use("Text/Neutral/3", "text", "pagination-settings") }];
  const geometryConsumers = [
    { filePath: docs + "pagination-page.tsx", source: '"--rain-local-pagination-preview-width": `${width}px`' },
    { filePath: docs + "pagination-page.css", source: "width: var(--rain-local-pagination-preview-width);" },
    ...[24, 28, 32].map(size => ({ filePath: ui + "pagination.css", source: `--rain-local-pagination-control-size: var(--rain-input-height-${size});` })),
    ...["min-inline-size", "block-size"].map(property => ({ filePath: ui + "pagination.css", source: `${property}: var(--rain-local-pagination-control-size);` })),
  ];
  const nativeCssConsumers = [{ filePath: ui + "pagination.css", source: `@media (forced-colors: active) {
  .rain-pagination__page[aria-current="page"] { outline: var(--rain-line-thickness-1) solid Highlight; }
  .rain-pagination__page[aria-disabled="true"], .rain-pagination__page:disabled { color: GrayText; }
}` }];
  return { colorRecipeConsumers, colorCssConsumers, inlineConsumers, geometryConsumers, nativeCssConsumers,
    lifecycle: { humanGate: "accepted", humanGateScope: "pagination-current-runtime-visual-only", contrastAcceptance: "not-granted", acceptedException: false } };
}
