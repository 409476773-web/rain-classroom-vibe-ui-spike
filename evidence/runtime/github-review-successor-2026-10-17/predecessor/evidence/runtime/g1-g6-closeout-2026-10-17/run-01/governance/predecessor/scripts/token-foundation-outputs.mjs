import { getAlertColorConsumers } from "./alert.mjs";
import { tooltipTokens } from "../packages/foundations/src/tooltip-token-contract.ts";
import { getPaginationColorConsumers } from "./pagination-color-consumers.mjs";
import { overlayColors, dialogGeometryTokens } from "../packages/foundations/src/overlay-token-contract.ts";
import { tabsSizeTokens, tabsSizeClassNames, tabsTwoLineSizeTokens, tabsTwoLineSizeClassNames } from "../packages/foundations/src/tabs-token-contract.ts";
import { inputSizeTokens, inputSizeClassNames, inputClearSizeToken, inputClearSizeClassName } from "../packages/foundations/src/input-token-contract.ts";
import { selectSizeTokens, selectSizeClassNames, selectValueHeightTokens, selectValueHeightClassNames, selectActionSizeToken, selectTouchTargetSizeToken, selectActionSizeClassName } from "../packages/foundations/src/select-token-contract.ts";
import { tagSizeTokens, tagSizeClassNames, tagStateTokens, tagColorProfiles, tagSelectionMarkColorRecipe, tagScoreBadgeColorRecipe, tagShapeRecipes, tagShapeClassNames, tagDetailTokens } from "../packages/foundations/src/tag-token-contract.ts";
import { compositionSpaceTokens } from "../packages/foundations/src/composition-contract.ts";
import { iconSizeTokenEntries, iconSizeClassNames, iconButtonControlSizeTokenEntries, iconButtonControlSizeClassNames, iconButtonComponentTokenAliases, iconButtonMotionThemeMappings } from "../packages/foundations/src/icon-size-contract.ts";
import { getButtonColorVariables, buttonColorThemeMappings, buttonColorRecipes, legacyComponentTokenAliases, legacyPaintAliases, semanticColorAliases, semanticColorRoleAliases, lineThicknessTokens, radiusTokens } from "../packages/foundations/src/token-contract.ts";
import { colorTokenOutputs, localColorRecipe, localColorRecipeOutput, resolveColor, resolveColorSurface, measureColorContrast, validateColorUse, colorToCss } from "../packages/foundations/src/color-registry.ts";
import { getTypographyCssVariables, getTypographyThemeVariables, getTypographyPresetDeclarations, typographyUtilityClassNames } from "../packages/foundations/src/typography-contract.ts";

/** @typedef {{filePath: string, selector: string, scope: string, className: string, use: import("../packages/foundations/src/color-registry.ts").ColorUse}} ColorConsumer */
/** @typedef {{filePath: string, selector: string, scope: string, displayOnly: boolean, kind: string, className?: string, themeMapping?: string, consumerScope?: string}} DisplayConsumer */

// Data owners define values; CSS, class inventories and consumer maps are derived here.
export function getTokenFoundationOutputs() {
  const linkAlias = { "--rain-link-color": "var(--rain-color-action-primary-text)" };
  const variables = { ...legacyComponentTokenAliases, ...legacyPaintAliases, ...semanticColorAliases, ...semanticColorRoleAliases, ...linkAlias, ...getButtonColorVariables(), ...iconButtonComponentTokenAliases };
  const colorThemes = { light: {}, dark: {} };
  Object.assign(variables, dialogGeometryTokens, tooltipTokens);
  for (const [name, colors] of Object.entries(overlayColors)) {
    const variable = `--rain-overlay-${name}`;
    variables[variable] = colorToCss(colors.light);
    for (const theme of ["light", "dark"]) colorThemes[theme][variable] = colorToCss(colors[theme]);
  }
  const themeVariables = { ...buttonColorThemeMappings, ...iconButtonMotionThemeMappings };
  const utilities = [];
  const classNames = { line: { border: {}, h: {}, w: {} }, radius: {}, space: {}, iconSize: iconSizeClassNames, iconButtonControlSize: iconButtonControlSizeClassNames, inputSize: inputSizeClassNames, inputClearSize: inputClearSizeClassName, selectSize: selectSizeClassNames, selectValueHeight: selectValueHeightClassNames, selectActionSize: selectActionSizeClassName, tagSize: tagSizeClassNames, tagShape: tagShapeClassNames, tabsSize: tabsSizeClassNames, tabsTwoLineSize: tabsTwoLineSizeClassNames };
  // Runtime class-map imports must not depend on an application's source scanner.
  const iconSizeSourceDirective = `@source inline("${[...Object.values(iconSizeClassNames), ...Object.values(iconButtonControlSizeClassNames)].join(" ")}");`;
  const inputSourceDirective = `@source inline("${[...Object.values(inputSizeClassNames), inputClearSizeClassName].join(" ")}");`;
  const tagSourceDirective = `@source inline("${[...Object.values(tagSizeClassNames), ...Object.values(tagShapeClassNames), "opacity-rain-tag-disabled", "bg-rain-tag-score-badge"].join(" ")}");`;
  const selectSourceDirective = `@source inline("${[...Object.values(selectSizeClassNames), ...Object.values(selectValueHeightClassNames), selectActionSizeClassName].join(" ")}");`;
  const tabsSourceDirective = `@source inline("${[...Object.values(tabsSizeClassNames), ...Object.values(tabsTwoLineSizeClassNames)].join(" ")}");`;
  for (const [heights, classes, prefix] of [[tabsSizeTokens, tabsSizeClassNames, ""], [tabsTwoLineSizeTokens, tabsTwoLineSizeClassNames, "two-line-"]]) for (const [name, value] of Object.entries(heights)) {
    const variable = `--rain-tabs-height-${prefix}${name}`;
    variables[variable] = value;
    utilities.push({ className: classes[name], declarations: { height: `var(${variable})` }, kind: "tabs-height" });
  }
  for (const [name, value] of Object.entries(selectSizeTokens)) {
    const variable = `--rain-select-height-${name}`;
    variables[variable] = value;
    utilities.push({ className: selectSizeClassNames[name], declarations: { height: `var(${variable})` }, kind: "select-height" });
  }
  for (const [name, value] of Object.entries(selectValueHeightTokens)) {
    const variable = `--rain-select-value-height-${name}`;
    variables[variable] = value;
    utilities.push({ className: selectValueHeightClassNames[name], declarations: { height: `var(${variable})` }, kind: "select-value-height" });
  }
  variables["--rain-select-action-size"] = `${selectActionSizeToken}px`;
  variables["--rain-select-touch-target-size"] = `${selectTouchTargetSizeToken}px`;
  utilities.push({ className: selectActionSizeClassName, declarations: { width: "var(--rain-select-action-size)", height: "var(--rain-select-action-size)" }, kind: "select-action" });
  for (const [name, value] of Object.entries(tagSizeTokens)) {
    const variable = `--rain-tag-height-${name}`;
    variables[variable] = value;
    utilities.push({ className: tagSizeClassNames[name], declarations: { height: `var(${variable})` }, kind: "tag-height" });
  }
  for (const [name, recipe] of Object.entries(tagShapeRecipes)) {
    const width = `--rain-tag-shape-${name}-width`, height = `--rain-tag-shape-${name}-height`;
    variables[width] = `${recipe.width}px`; variables[height] = `${recipe.height}px`;
    utilities.push({ className: tagShapeClassNames[name], kind: "tag-shape", declarations: {
      "min-width": `var(${width})`, "min-height": `var(${height})`,
      "font-size": `var(--rain-font-size-${recipe.fontSize})`, "line-height": `var(--rain-line-height-${recipe.lineHeight})`,
      "border-radius": `var(--rain-radius-${recipe.radius})`, "padding-inline": `var(--rain-space-${recipe.paddingInline})`, "padding-block": `var(--rain-space-${recipe.paddingBlock})`,
    } });
  }
  for (const [name, value] of Object.entries(tagDetailTokens)) variables[`--rain-tag-${name}`] = `${value}${name.endsWith("alpha") ? "%" : "px"}`;
  for (const [state, opacity] of Object.entries(tagStateTokens)) variables[`--rain-tag-${state}-opacity`] = String(opacity);
  utilities.push({ className: "opacity-rain-tag-disabled", declarations: { opacity: "var(--rain-tag-disabled-opacity)" }, kind: "tag-disabled" });
  variables["--rain-tag-selection-alpha"] = `${tagSelectionMarkColorRecipe.alpha}%`;
  for (const theme of ["light", "dark"]) colorThemes[theme]["--rain-tag-score-badge-fill"] = colorToCss(validateColorUse({ ...tagScoreBadgeColorRecipe, theme, parentSurfaceId: "Background/Neutral/1" }).value);
  variables["--rain-tag-score-badge-fill"] = colorThemes.light["--rain-tag-score-badge-fill"];
  utilities.push({ className: "bg-rain-tag-score-badge", declarations: { "background-color": "var(--rain-tag-score-badge-fill)" }, kind: "tag-score-badge" });
  for (const [name, value] of Object.entries(inputSizeTokens)) {
    const variable = `--rain-input-height-${name}`;
    variables[variable] = value;
    utilities.push({ className: inputSizeClassNames[name], declarations: { height: `var(${variable})` }, kind: "input-height" });
  }
  variables["--rain-input-clear-size"] = `${inputClearSizeToken}px`;
  utilities.push({ className: inputClearSizeClassName, declarations: { width: "var(--rain-input-clear-size)", height: "var(--rain-input-clear-size)" }, kind: "input-clear" });
  for (const [name, token] of iconSizeTokenEntries) {
    const variable = `--rain-icon-size-${name}`;
    variables[variable] = `${token.value}${token.unit}`;
    utilities.push({ className: iconSizeClassNames[name], declarations: { width: `var(${variable})`, height: `var(${variable})` }, kind: "icon-size" });
  }
  for (const [name, value] of iconButtonControlSizeTokenEntries) {
    const variable = `--rain-icon-button-control-${name}`;
    variables[variable] = value;
    utilities.push({ className: iconButtonControlSizeClassNames[name], declarations: { width: `var(${variable})`, height: `var(${variable})` }, kind: "icon-button-control" });
  }
  for (const [name, value] of Object.entries(compositionSpaceTokens)) {
    variables[`--rain-space-${name}`] = value;
    themeVariables[`--spacing-rain-${name}`] = `var(--rain-space-${name})`;
    classNames.space[name] = Object.fromEntries(
      ["gap", "p", "px", "py", "m", "mx", "my"].map((property) => [property, `${property}-rain-${name}`]),
    );
  }
  for (const [name, value] of Object.entries(radiusTokens)) {
    variables[`--rain-radius-${name}`] = value;
    themeVariables[`--radius-rain-${name}`] = `var(--rain-radius-${name})`;
    classNames.radius[name] = `rounded-rain-${name}`;
  }
  for (const [name, value] of Object.entries(lineThicknessTokens)) {
    variables[`--rain-line-thickness-${name}`] = value;
    for (const [prefix, property] of [["border", "border-width"], ["h", "height"], ["w", "width"]]) {
      const className = `${prefix}-rain-line-${name}`;
      classNames.line[prefix][name] = className;
      utilities.push({ className, declarations: { [property]: `var(--rain-line-thickness-${name})` }, kind: "line" });
    }
  }
  Object.assign(themeVariables, getTypographyThemeVariables());
  classNames.typography = typographyUtilityClassNames;
  classNames.color = {};
  const scopedCss = [];
  scopedCss.push('[data-rain-id="token-foundations"] .token-color-dark-canvas {\n  background-color: var(--rain-category-background-neutral-1);\n  color: var(--rain-category-text-neutral-1);\n}');
  scopedCss.push('[data-rain-id="token-foundations"] .token-color-light-canvas {\n  background-color: var(--rain-category-background-neutral-1);\n}');
  for (const output of colorTokenOutputs) {
    variables[output.variable] = output.value;
    colorThemes.light[output.variable] = output.value;
    colorThemes.dark[output.variable] = output.darkValue;
    themeVariables[output.themeVariable] = `var(${output.variable})`;
    classNames.color[output.id] = { utilities: output.utilities, display: output.displayClassName, displayForeground: output.displayForegroundClassName };
    for (const use of output.utilities) {
      if (!utilities.some((entry) => entry.className === use.className)) utilities.push({
        className: use.className, declarations: { [use.property]: `var(${output.variable})` }, kind: "category",
      });
    }
    scopedCss.push(`${output.displayScope} .${output.displayClassName} {\n  background-color: var(${output.variable});\n}`);
    if (output.displayForegroundClassName) scopedCss.push(`${output.displayScope} .${output.displayForegroundClassName} {\n  color: var(${output.variable});\n}`);
  }
  for (const theme of Object.values(colorThemes)) Object.assign(theme, semanticColorAliases, semanticColorRoleAliases, linkAlias);
  for (const theme of ["light", "dark"]) Object.assign(colorThemes[theme], getButtonColorVariables(theme));
  themeVariables["--color-rain-action-primary-text"] = "var(--rain-color-action-primary-text)";
  // The old action name stays compatible; its foreground has a distinct role.
  utilities.push({ className: "text-rain-action-primary", declarations: { color: "var(--rain-color-action-primary-text)" }, kind: "semantic-role" });
  utilities.push({ className: "bg-rain-action-primary", declarations: { "background-color": "var(--rain-color-action-primary)" }, kind: "semantic-role" });
  classNames.localColor = localColorRecipeOutput.className;
  scopedCss.push(`${localColorRecipeOutput.scope} {\n  ${localColorRecipeOutput.variable}: ${localColorRecipeOutput.value};\n}`);
  scopedCss.push(`${localColorRecipeOutput.scope} .${localColorRecipeOutput.className} {\n  background-color: var(${localColorRecipeOutput.variable});\n}`);
  for (const [slug, declarations] of Object.entries(getTypographyPresetDeclarations())) {
    utilities.push({ className: `rain-type-${slug}`, declarations, kind: "typography" });
  }
  const colorConsumerPath = "apps/playground/src/docs/token-foundations/color-panel.tsx";
  /** @type {ColorConsumer[]} */
  const colorConsumers = [
    {
      filePath: colorConsumerPath, selector: ".token-color-recipe-comparison", scope: localColorRecipeOutput.scope,
      className: "bg-rain-category-background-neutral-1",
      use: { tokenId: "Background/Neutral/1", role: "background", property: "background-color", context: "local-recipe", content: "surface", recipeId: localColorRecipe.recipeId, theme: "light" },
    },
    {
      filePath: colorConsumerPath, selector: '[data-slot="original-fill"]', scope: localColorRecipeOutput.scope,
      className: "bg-rain-category-fill-neutral-alpha-3",
      use: { tokenId: localColorRecipe.tokenId, role: localColorRecipe.role, property: localColorRecipe.property,
        context: localColorRecipe.context, content: localColorRecipe.content, parentSurfaceId: localColorRecipe.parentSurfaceId,
        recipeId: localColorRecipe.recipeId, theme: "light" },
    },
    { filePath: colorConsumerPath, selector: '[data-slot="derived-fill"]', scope: localColorRecipeOutput.scope,
      className: localColorRecipeOutput.className, use: localColorRecipe },
  ];
  for (const theme of /** @type {import("../packages/foundations/src/color-registry.ts").ColorTheme[]} */ (["light", "dark"])) {
    const common = { filePath: colorConsumerPath, scope: '[data-rain-id="token-color-discovery-examples"]' };
    const evidenceRef = "evidence/runtime/tag-color-discovery/verification.md";
    colorConsumers.push(
      { ...common, selector: `[data-slot="discovery-${theme}-surface"]`, className: "bg-rain-category-background-neutral-1",
        use: { tokenId: "Background/Neutral/1", role: "background", property: "background-color", context: "page", content: "surface", theme, evidenceRef } },
      { ...common, selector: `[data-slot="discovery-${theme}-fill"]`, className: "bg-rain-category-fill-tagpurple-alpha-1",
        use: { tokenId: "Fill/TagPurple/Alpha/1", role: "fill", property: "background-color", context: "page", content: "surface", parentSurfaceId: "Background/Neutral/1", theme, evidenceRef } },
      { ...common, selector: `[data-slot="discovery-${theme}-text"]`, className: "text-rain-category-text-neutral-1",
        use: { tokenId: "Text/Neutral/1", role: "text", property: "color", context: "page", content: "text", parentSurfaceId: "Fill/TagPurple/Alpha/1", parentBackgroundId: "Background/Neutral/1", interaction: "non-interactive", critical: true, theme, evidenceRef } },
      { ...common, selector: `[data-slot="discovery-${theme}-icon"]`, className: "text-rain-category-icon-tagpurple-1",
        use: { tokenId: "Icon/TagPurple/1", role: "icon", property: "color", context: "page", content: "meaningful-icon", parentSurfaceId: "Fill/TagPurple/Alpha/1", parentBackgroundId: "Background/Neutral/1", interaction: "non-interactive", critical: true, theme, evidenceRef } },
    );
  }
  /** @type {DisplayConsumer[]} */
  const displayConsumers = [{
    filePath: colorConsumerPath, selector: '[data-slot="category-swatch"]',
    scope: colorTokenOutputs[0].displayScope, displayOnly: true, kind: "swatch",
  }, ...["light", "dark"].map((mode) => ({
    filePath: colorConsumerPath, selector: `.token-color-${mode}-canvas`,
    className: `token-color-${mode}-canvas`, scope: colorTokenOutputs[0].displayScope,
    displayOnly: true, kind: "comparison-canvas", themeMapping: mode,
  })), ...["background", "text", "icon"].map((part) => ({
    filePath: "apps/playground/src/docs/token-foundations/color-pairing-preview.tsx",
    selector: `[data-slot="pairing-${part}"]`, scope: colorTokenOutputs[0].displayScope,
    displayOnly: true, kind: part === "background" ? "pairing-background" : "pairing-foreground",
    consumerScope: '[data-rain-id="token-color-pairing"]',
  }))];
  return { variables, colorThemes, typographyVariables: getTypographyCssVariables(), themeVariables, utilities, classNames, iconSizeSourceDirective, inputSourceDirective, tagSourceDirective, selectSourceDirective, tabsSourceDirective, scopedCss: scopedCss.join("\n\n"), colorConsumers, displayConsumers, buttonColorRecipes, ...getComponentColorConsumers() };
}

// Reviewed state routing is registered alongside the existing Token consumers.
// The verifier compares the literal CVA/local-recipe definition before evaluating its paints.
function getIconButtonColorConsumers() {
  const evidenceRef = "docs/plans/2026-09-07-icon-button-implementation.md";
  const parentSurfaces = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const use = (tokenId, content, recipeId, context = "component-recipe") => ({
    tokenId, role: tokenId.split("/")[0].toLowerCase(),
    property: /^(Background|Fill)\//.test(tokenId) ? "background-color" : tokenId.startsWith("Border/") ? "border-color" : "color",
    content, recipeId, context, evidenceRef, brandIntent: "action",
    interaction: content === "meaningful-icon" ? "interactive" : "non-interactive", critical: content === "meaningful-icon",
  });
  const config = {
    variants: {
      tone: { default: "text-rain-category-icon-neutral-2", danger: "text-rain-category-icon-red-1" },
      highlight: { none: "bg-rain-action-ghost", icon: "bg-rain-action-ghost", surface: "bg-rain-category-fill-brand-alpha-4" },
      state: { default: "cursor-pointer", loading: "cursor-progress", disabled: "cursor-not-allowed" },
    },
    compoundVariants: [
      { tone: "default", highlight: ["icon", "surface"], class: "text-rain-category-icon-brand-1" },
      { state: "default", tone: "default", highlight: "none", class: "hover:bg-rain-category-fill-neutral-alpha-3 active:bg-rain-category-fill-neutral-alpha-2" },
      { state: "default", tone: "default", highlight: ["icon", "surface"], class: "hover:bg-rain-category-fill-brand-alpha-3 active:bg-rain-category-fill-brand-alpha-3" },
      { state: "default", tone: "danger", class: "hover:bg-rain-category-fill-red-alpha-2 active:bg-rain-category-fill-red-alpha-1" },
      { state: "disabled", class: "text-rain-category-icon-neutral-5" },
    ],
  };
  const recipes = [["default", "none"], ["default", "icon"], ["default", "surface"], ["danger", "none"]].flatMap(([tone, highlight]) =>
    ["default", "hover", "pressed", "loading", "disabled"].map((state) => {
      const id = `icon-button-${tone}-${highlight}-${state}`;
      let fill = highlight === "surface" ? "Fill/Brand/Alpha/4" : null;
      if (state === "hover" || state === "pressed") fill = tone === "danger" ? `Fill/Red/Alpha/${state === "hover" ? 2 : 1}`
        : highlight !== "none" ? "Fill/Brand/Alpha/3" : `Fill/Neutral/Alpha/${state === "hover" ? 3 : 2}`;
      return { id, tone, highlight, state, background: fill ? use(fill, "surface", id) : null,
        foreground: use(state === "disabled" ? "Icon/Neutral/5" : tone === "danger" ? "Icon/Red/1" : highlight !== "none" ? "Icon/Brand/1" : "Icon/Neutral/2",
          state === "disabled" ? "disabled" : "meaningful-icon", id) };
    }));
  const emphasisClasses = "data-[feedback=interactive]:hover:bg-rain-action-ghost data-[feedback=interactive]:active:bg-rain-action-ghost data-[feedback=interactive]:hover:text-rain-category-icon-neutral-1 data-[feedback=interactive]:active:text-rain-category-icon-neutral-1";
  const colorRecipeConsumers = [
    { filePath: "packages/ui/src/icon-button/icon-button.styles.ts", symbol: "iconButtonRootRecipe", kind: "cva", scope: '[data-rain-id="ui-icon-button"]',
      definition: config, parentSurfaces, recipes },
    { filePath: "apps/playground/src/docs/components/icon-button-page.tsx", symbol: "emphasisRecipe", kind: "local-recipe", scope: '[data-rain-id="icon-button-page"]',
      definition: { id: "icon-button-contained-emphasis", scope: "feature", origin: "ui-icon-button", classes: { root: emphasisClasses } }, parentSurfaces,
      recipes: ["default", "hover", "pressed", "loading", "disabled"].map((state) => {
        const id = `icon-button-emphasis-${state}`;
        return { id, state, background: null, foreground: use(state === "disabled" ? "Icon/Neutral/5" : ["hover", "pressed"].includes(state) ? "Icon/Neutral/1" : "Icon/Neutral/2", state === "disabled" ? "disabled" : "meaningful-icon", id, "local-recipe") };
      }) },
  ];
  const cssPath = "apps/playground/src/docs/components/icon-button-page.css";
  const css = (selector, property, value, tokenId, content, surfaces = ["Background/Neutral/1"]) => ({
    filePath: cssPath, selector, property, value, scope: ".icon-button-page", parentSurfaces: surfaces,
    use: use(tokenId, content, "icon-button-page", "local-recipe"),
  });
  const colorCssConsumers = [
    css(".icon-button-page", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text", parentSurfaces),
    css(".icon-button-page", "background", "var(--rain-category-background-neutral-3)", "Background/Neutral/3", "surface"),
    css(".icon-button-page__eyebrow", "color", "var(--rain-category-text-neutral-4)", "Text/Neutral/4", "text", ["Background/Neutral/3"]),
    css(".icon-button-page__description", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text", parentSurfaces),
    css(".icon-button-page__section", "background", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface"),
    css(".icon-button-page__section", "border", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative", ["Background/Neutral/1", "Background/Neutral/3"]),
    css(".icon-button-page__sample", "background", "var(--rain-category-background-neutral-2)", "Background/Neutral/2", "surface"),
    css(".icon-button-page__panel", "border-left", "var(--rain-line-thickness-2) solid var(--rain-category-border-neutral-2)", "Border/Neutral/2", "decorative", parentSurfaces),
    css(".icon-button-page__feedback", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text", parentSurfaces),
    css(".icon-button-page__controls input", "accent-color", "var(--rain-category-fill-brand-solid-1)", "Fill/Brand/Solid/1", "surface"),
    css(".icon-button-page__table th, .icon-button-page__table td", "border-bottom", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative"),
    css(".icon-button-page__size", "color", "var(--rain-category-icon-neutral-2)", "Icon/Neutral/2", "meaningful-icon"),
    css(".icon-button-page__size", "border", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative"),
    css(".icon-button-page__size strong", "color", "var(--rain-category-text-neutral-2)", "Text/Neutral/2", "text"),
    css(".icon-button-page__size small", "color", "var(--rain-category-text-neutral-4)", "Text/Neutral/4", "text"),
  ];
  return { colorRecipeConsumers, colorCssConsumers };
}

export function getEmptyColorConsumers() {
  const definition = { title: "text-rain-category-text-neutral-3", description: "text-rain-category-text-neutral-3" };
  return [{ filePath: "packages/ui/src/empty/empty.tsx", symbol: "emptyPaints", kind: "static", scope: '[data-rain-id="ui-empty"]',
    foregroundContent: "text", parentSurfaces: ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"], definition,
    recipes: ["title", "description"].map(part => ({ id: `empty-${part}`, state: "ordinary", foreground: {
      tokenId: "Text/Neutral/3", content: "text", recipeId: `empty-${part}`,
      evidenceRef: "docs/plans/2026-09-14-empty-refinement.md", context: "component-recipe", role: "text", property: "color",
      interaction: "non-interactive", critical: true,
    } })),
  }];
}

export function getTableRn08ColorConsumers() {
  const evidenceRef = "docs/plans/2026-09-14-table-visual-refinement.md";
  const definition = {
    root: "bg-rain-category-background-neutral-1 text-rain-category-text-neutral-2",
    header: "bg-rain-category-background-neutral-2 text-rain-category-text-neutral-4",
    footer: "bg-rain-category-background-neutral-2 text-rain-category-text-neutral-2",
    row: "border-rain-category-border-neutral-3 hover:bg-rain-category-fill-neutral-alpha-5 data-[state=selected]:bg-rain-category-fill-brand-alpha-4",
    caption: "text-rain-category-text-neutral-3",
  };
  const use = (tokenId, content, recipeId, selected = false) => ({
    tokenId, content, recipeId, evidenceRef, context: "component-recipe", role: tokenId.split("/")[0].toLowerCase(),
    property: /^(Background|Fill)\//.test(tokenId) ? "background-color" : tokenId.startsWith("Border/") ? "border-color" : "color",
    interaction: "non-interactive", critical: content === "text", ...(selected ? { brandIntent: "selected" } : {}),
  });
  const rows = [["root", "ordinary", "Background/Neutral/1"], ["header", "ordinary", "Background/Neutral/2"],
    ["header-hover", "hover", "Fill/Neutral/Alpha/5", "Background/Neutral/2"], ["footer", "ordinary", "Background/Neutral/2"],
    ["footer-hover", "hover", "Fill/Neutral/Alpha/5", "Background/Neutral/2"], ["row-hover", "hover", "Fill/Neutral/Alpha/5"], ["row-selected", "selected", "Fill/Brand/Alpha/4"]];
  return [{ filePath: "packages/ui/src/table/table.styles.ts", symbol: "tablePaints", kind: "static", scope: '[data-rain-id="ui-table"]',
    foregroundContent: "text", contrastReview: "pending-review", parentSurfaces: ["Background/Neutral/1"], definition,
    recipes: [...rows.map(([id, state, background, parent]) => ({ id: "table-" + id, state, ...(parent ? { parentSurfaces: [parent] } : {}),
      foreground: { ...use(id.startsWith("header") ? "Text/Neutral/4" : "Text/Neutral/2", "text", "table-" + id, state === "selected"), ...(id.startsWith("header") ? { interaction: "interactive" } : {}) },
      background: use(background, "surface", "table-" + id, state === "selected"),
      boundary: use("Border/Neutral/3", "decorative", "table-" + id, state === "selected"),
    })), { id: "table-caption", state: "ordinary", foreground: use("Text/Neutral/3", "text", "table-caption") }],
  }];
}

export function getMaterialRecipeColorConsumers() {
  const evidenceRef = "docs/plans/2026-09-14-table-card-parity.md";
  return [
    { selector: '.data-table-recipe .material-card[data-selected="true"]', property: "background-color", tokenId: "Fill/Brand/Alpha/4", content: "surface", parents: ["Background/Neutral/1"] },
    { selector: ".data-table-recipe .data-table-metadata", property: "color", tokenId: "Text/Neutral/4", content: "text", parents: ["Background/Neutral/1", "Fill/Brand/Alpha/4", "Fill/Neutral/Alpha/5"] },
  ].map(({ selector, property, tokenId, content, parents }) => ({
    filePath: "apps/prototype/src/data-table-recipe.css", selector, property,
    value: "var(" + colorTokenOutputs.find(entry => entry.id === tokenId).variable + ")", scope: ".data-table-recipe",
    parentSurfaces: parents, parentBackgrounds: ["Background/Neutral/1"],
    use: { tokenId, content, property, role: content === "text" ? "text" : "fill", context: "local-recipe", interaction: "non-interactive", critical: false,
      brandIntent: "selected", recipeId: "material-card-selection", evidenceRef },
  }));
}

export function getCardColorConsumers() {
  const evidenceRef = "docs/plans/2026-09-13-card-visual-refinement-plan.md";
  const surfaces = ["Background/Neutral/1", "Background/Neutral/2"];
  const use = (tokenId, content, recipeId) => ({
    tokenId, content, recipeId, evidenceRef, context: "component-recipe",
    role: tokenId.split("/")[0].toLowerCase(),
    property: /^(Background|Fill)\//.test(tokenId) ? "background-color" : tokenId.startsWith("Border/") ? "border-color" : "color",
    interaction: "non-interactive", critical: content === "text",
  });
  const definition = {
    root: "border-rain-category-border-neutral-3 bg-rain-category-background-neutral-1 text-rain-category-text-neutral-2",
    title: "text-rain-category-text-neutral-1",
    description: "text-rain-category-text-neutral-3",
    footer: "text-rain-category-text-neutral-3",
    raised: "bg-rain-category-background-neutral-2 border-rain-category-border-neutral-2 text-rain-category-text-neutral-2",
  };
  const recipes = Object.keys(definition).map(part => ({
    id: "card-" + part, state: "ordinary",
    foreground: use("Text/Neutral/" + (part === "title" ? 1 : ["description", "footer"].includes(part) ? 3 : 2), "text", "card-" + part),
    ...(["root", "raised"].includes(part) ? {
      background: use("Background/Neutral/" + (part === "root" ? 1 : 2), "surface", "card-" + part),
      boundary: use("Border/Neutral/" + (part === "root" ? 3 : 2), "decorative", "card-" + part),
    } : {}),
  }));
  const rows = [
    ["apps/playground/src/docs/components/card-page.css", ".card-review", "background", "Background/Neutral/3", "surface", ["Background/Neutral/1"]],
    ["apps/playground/src/docs/components/card-page.css", ".card-review", "color", "Text/Neutral/1", "text", ["Background/Neutral/3"]],
    ["apps/playground/src/docs/components/card-page.css", ".card-review pre", "background", "Background/Neutral/1", "surface", ["Background/Neutral/3"]],
    ["apps/prototype/src/styles.css", ".rain-prototype", "background", "Background/Neutral/3", "surface", ["Background/Neutral/1"]],
    ["apps/prototype/src/styles.css", ".rain-prototype", "color", "Text/Neutral/1", "text", ["Background/Neutral/3"]],
    ["apps/prototype/src/styles.css", ".rain-prototype-note", "color", "Text/Neutral/3", "text", ["Background/Neutral/3"]],
    ["apps/prototype/src/card-recipes.css", ".card-example-label", "color", "Text/Neutral/3", "text", ["Background/Neutral/3"]],
    ["apps/prototype/src/card-recipes.css", ".card-action-status", "color", "Text/Neutral/3", "text", ["Background/Neutral/1"]],
    ["apps/prototype/src/card-recipes.css", ".reminder-card-actions", "background", "Background/Neutral/2", "surface", ["Background/Neutral/1"]],
    ["apps/prototype/src/card-recipes.css", ".course-card-cover", "background", "Background/Neutral/2", "surface", ["Background/Neutral/1"]],
    ["apps/prototype/src/card-recipes.css", ".course-card-cover", "color", "Text/Neutral/2", "text", ["Background/Neutral/2"]],
  ];
  return {
    colorRecipeConsumers: [{ filePath: "packages/ui/src/card/card.styles.ts", symbol: "cardPaints", kind: "static", scope: '[data-rain-id="ui-card"]',
      foregroundContent: "text", parentSurfaces: surfaces, definition, recipes }],
    colorCssConsumers: rows.map(([filePath, selector, property, tokenId, content, parentSurfaces]) => ({
      filePath, selector, property, value: "var(" + colorTokenOutputs.find(entry => entry.id === tokenId).variable + ")",
      parentSurfaces,
      use: { ...use(tokenId, content, "card-examples"), context: "local-recipe" },
    })),
  };
}

export function getDialogColorConsumers() {
  const rows = [
    ["packages/ui/src/dialog/dialog.css", ".rain-dialog", "background-color", "Background/Neutral/1", "surface"],
    ["packages/ui/src/dialog/dialog.css", ".rain-dialog", "color", "Text/Neutral/2", "text", ["Background/Neutral/1", "Background/Neutral/2"]],
    ["packages/ui/src/dialog/dialog.css", ":where(.rain-dialog)", "border-color", "Border/Neutral/3", "decorative"],
    ["packages/ui/src/dialog/dialog.css", ".rain-dialog-title", "color", "Text/Neutral/1", "text"],
    ["packages/ui/src/dialog/dialog.css", ".rain-dialog-description", "color", "Text/Neutral/3", "text"],
    ["packages/ui/src/dialog/dialog.css", ":where(.rain-dialog-footer[data-divider])", "border-color", "Border/Neutral/4", "decorative", ["Background/Neutral/1"]],
    ["packages/ui/src/separator/separator.css", ".rain-separator", "background-color", "Border/Neutral/4", "decorative"],
    ["apps/prototype/src/course-dialog.css", ".course-dialog-example", "background-color", "Background/Neutral/1", "surface"],
    ["apps/prototype/src/course-dialog.css", ".course-dialog-example", "color", "Text/Neutral/2", "text"],
    ["apps/prototype/src/course-dialog.css", ".course-dialog-example h2", "color", "Text/Neutral/1", "text"],
    ["apps/prototype/src/course-dialog.css", ".course-dialog-note", "color", "Text/Neutral/3", "text"],
    ["apps/prototype/src/course-dialog.css", ".course-dialog-error", "color", "Text/Red/1", "text"],
    ["apps/playground/src/docs/components/dialog-page.css", ".dialog-review", "background-color", "Background/Neutral/3", "surface"],
    ["apps/playground/src/docs/components/dialog-page.css", ".dialog-review", "color", "Text/Neutral/1", "text", ["Background/Neutral/3"]],
  ];
  return rows.map(([filePath, selector, property, tokenId, content, parentSurfaces = ["Background/Neutral/1"]]) => ({
    filePath, selector, property, value: `var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`, parentSurfaces,
    use: { tokenId, property, content, role: tokenId.split("/")[0].toLowerCase(), context: "component-recipe", interaction: "non-interactive", critical: content === "text", recipeId: "dialog-v2", evidenceRef: "docs/plans/2026-09-13-dialog-v2-implementation.md" },
  }));
}

export function getLayoutsColorConsumers() {
  const surfaces = ["Background/Neutral/1", "Background/Neutral/2"];
  const rows = [
    ["apps/prototype/src/layout-recipes.css", ".layout-recipes", "color", "Text/Neutral/2", "text", surfaces],
    ["apps/prototype/src/layout-recipes.css", ".layout-recipes h3", "color", "Text/Neutral/1", "text", surfaces],
    ["apps/prototype/src/layout-recipes.css", ".layout-recipes h4", "color", "Text/Neutral/1", "text", surfaces],
    ["apps/prototype/src/layout-recipes.css", ".layout-example-muted", "color", "Text/Neutral/3", "text", surfaces],
    ["apps/prototype/src/layout-recipes.css", ".layout-example-pane", "background-color", "Background/Neutral/2", "surface", ["Background/Neutral/1"]],
    ["apps/playground/src/docs/components/layouts-page.css", ".layouts-review", "background-color", "Background/Neutral/3", "surface", ["Background/Neutral/1"]],
    ["apps/playground/src/docs/components/layouts-page.css", ".layouts-review", "color", "Text/Neutral/1", "text", ["Background/Neutral/3"]],
  ];
  return rows.map(([filePath, selector, property, tokenId, content, parentSurfaces]) => ({
    filePath, selector, property,
    value: `${property === "border-top" ? "var(--rain-line-thickness-1) solid " : ""}var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`,
    parentSurfaces,
    use: { tokenId, property: property === "border-top" ? "border-color" : property, content, role: tokenId.split("/")[0].toLowerCase(), context: "local-recipe", interaction: "non-interactive", critical: content === "text", recipeId: "layouts-v1-examples", evidenceRef: "docs/plans/2026-09-13-layouts-v1-implementation.md" },
  }));
}

export function getBmBColorConsumers() {
  const filePath = "apps/prototype/src/scenarios/bm-b/page.css";
  const rows = [
    [".bm-b-note, .bm-b-demo", "color", "Text/Neutral/3", "text", ["Background/Neutral/3"]],
    [".bm-b-body h3", "color", "Text/Neutral/1", "text"],
    [".bm-b-body", "background-color", "Background/Neutral/2", "surface"],
    [".bm-b-body section", "background-color", "Background/Neutral/1", "surface", ["Background/Neutral/2"]],
    [".bm-b-file-status", "color", "Text/Neutral/3", "text"],
    [".bm-b-feedback", "color", "Text/Neutral/3", "text", ["Background/Neutral/2"]],
    [".bm-b-hint", "color", "Text/Neutral/5", "text", ["Background/Neutral/1"], false],
    [".bm-b-dialog .bm-b-error", "color", "Text/Red/1", "text", ["Background/Neutral/1", "Background/Neutral/2"]],
  ];
  return rows.map(([selector, property, tokenId, content, parentSurfaces = ["Background/Neutral/1"], critical = content === "text"]) => ({
    filePath, selector, property,
    ...(selector === ".bm-b-hint" ? { contrastReview: "pending-review" } : {}),
    value: `${property.startsWith("border") ? "var(--rain-line-thickness-1) solid " : ""}var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`,
    parentSurfaces,
    use: { tokenId, property: property.startsWith("border") ? "border-color" : property, content, role: tokenId.split("/")[0].toLowerCase(), context: "local-recipe", interaction: content === "essential-boundary" ? "interactive" : "non-interactive", critical, recipeId: "bm-b-textbook-dialog", evidenceRef: "docs/plans/2026-09-15-bm-b-rn10.md" },
  }));
}


// G4 reuses existing Category identities; registration does not grant contrast acceptance.
export function getG4ColorConsumers() {
  const evidenceRef = "docs/plans/2026-10-11-g4-components.md", parents = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const use = (tokenId, content, recipeId, interaction = "non-interactive") => ({ tokenId, content, recipeId, evidenceRef,
    role: tokenId.split("/")[0].toLowerCase(), property: /^(Background|Fill)\//.test(tokenId) ? "background-color" : tokenId.startsWith("Border/") ? "border-color" : "color",
    context: "component-recipe", interaction, critical: ["text", "meaningful-icon", "essential-boundary"].includes(content),
    ...(tokenId.includes("/Brand/") ? { brandIntent: "action" } : {}),
  });
  const definition = {
    root: "text-rain-category-text-neutral-2", outline: "border-rain-category-border-neutral-3 bg-rain-category-background-neutral-1",
    muted: "bg-rain-category-background-neutral-2", title: "text-rain-category-text-neutral-1",
    description: "text-rain-category-text-neutral-3", footer: "text-rain-category-text-neutral-3",
    mediaIcon: "border-rain-category-border-neutral-3 bg-rain-category-background-neutral-1 text-rain-category-icon-neutral-3",
  };
  const recipes = [
    ...["default", "outline", "muted"].flatMap(variant => [
      ["root", "Text/Neutral/2"], ["title", "Text/Neutral/1"], ["description", "Text/Neutral/3"], ["footer", "Text/Neutral/3"],
    ].map(([part, token]) => ({ id: `g4-item-${variant}-${part}`, state: "default", foreground: use(token, "text", `g4-item-${variant}-${part}`),
      ...(variant === "default" ? {} : { background: use(variant === "outline" ? "Background/Neutral/1" : "Background/Neutral/2", "surface", `g4-item-${variant}`) }),
      ...(variant === "outline" ? { boundary: use("Border/Neutral/3", "decorative", "g4-item-outline") } : {}),
    }))),
    ...[["hover", "Fill/Neutral/Alpha/4"], ["active", "Fill/Neutral/Alpha/3"]].flatMap(([state, background]) => [
      ["root", "Text/Neutral/2"], ["title", "Text/Neutral/1"], ["description", "Text/Neutral/3"], ["footer", "Text/Neutral/3"],
    ].map(([part, token]) => ({ id: `g4-item-${state}-${part}`, state, foreground: use(token, "text", `g4-item-${state}-${part}`, "interactive"), background: use(background, "surface", `g4-item-${state}`, "interactive") }))),
    { id: "g4-item-media-icon", state: "default", foreground: use("Icon/Neutral/3", "meaningful-icon", "g4-item-media-icon"),
      background: use("Background/Neutral/1", "surface", "g4-item-media-icon"), boundary: use("Border/Neutral/3", "decorative", "g4-item-media-icon") },
  ];
  const colorRecipeConsumers = [{ filePath: "packages/ui/src/item/item.tsx", symbol: "itemPaints", kind: "static", definition,
    scope: '[data-rain-id="ui-item"]', foregroundContent: "text-and-meaningful-icon", parentSurfaces: parents, recipes },
    { filePath: "packages/ui/src/progress/progress.tsx", symbol: "progressPaints", kind: "static",
      definition: { root: "text-rain-category-text-neutral-1", value: "text-rain-category-text-neutral-2", track: "bg-rain-category-fill-neutral-solid-4", indicator: "bg-rain-category-fill-brand-solid-2" },
      scope: '[data-rain-id="ui-progress"]', foregroundContent: "text-and-progress", parentSurfaces: parents,
      recipes: [
        ...[["root", "Text/Neutral/1"], ["value", "Text/Neutral/2"]].map(([part, token]) => ({ id: `g4-progress-${part}`, state: "default", foreground: use(token, "text", `g4-progress-${part}`) })),
        { id: "g4-progress-track", state: "default", foreground: use("Fill/Neutral/Solid/4", "surface", "g4-progress-track") },
        { id: "g4-progress-indicator", state: "default", foreground: use("Fill/Brand/Solid/2", "surface", "g4-progress-indicator"), background: use("Fill/Neutral/Solid/4", "surface", "g4-progress-indicator"), requiredStateContrast: 3 },
      ],
    }];
  const rows = [
    ["packages/ui/src/item/item.css", ".rain-item__description > a", "color", "Text/Brand/1", "text", "interactive", parents],
    ["packages/ui/src/item/item.css", ".rain-item:is(a[href], button:not(:disabled)):hover", "background-color", "Fill/Neutral/Alpha/4", "surface", "interactive", parents],
    ["packages/ui/src/item/item.css", ".rain-item:is(a[href], button:not(:disabled)):active", "background-color", "Fill/Neutral/Alpha/3", "surface", "interactive", parents],
    ...[
      [".g4-doc-panel", "background", "Background/Neutral/1", "surface"],
      [".g4-doc-panel", "color", "Text/Neutral/1", "text"],
      [".g4-doc-panel", "border", "Border/Neutral/3", "decorative"],
      [".g4-doc-example-code > summary", "color", "Text/Brand/1", "text", "interactive"],
      [".g4-doc-muted, .g4-doc-type-spec", "color", "Text/Neutral/4", "text"],
      [".g4-doc-body, .g4-doc-feedback, .g4-doc-resource-footer, .g4-doc-read-state", "color", "Text/Neutral/3", "text"],
      [".g4-doc-type-row + .g4-doc-type-row", "border-block-start", "Border/Neutral/3", "decorative"],
      [".g4-doc-resource-header", "border-block-end", "Border/Neutral/3", "decorative"],
      [".g4-doc-file", "background", "Background/Neutral/2", "surface"],
      [".g4-doc-file", "color", "Icon/Neutral/3", "meaningful-icon"],
      [".g4-doc-link-icon", "color", "Icon/Neutral/3", "meaningful-icon", "interactive"],
      [".g4-doc-read-state > .rain-icon", "color", "Icon/Green/1", "meaningful-icon"],
      [".g4-doc-resource-footer", "border-block-start", "Border/Neutral/3", "decorative"],
      [".g4-doc-task-feedback", "color", "Text/Neutral/3", "text"],
      ['.g4-doc-task-feedback[data-kind="error"]', "color", "Text/Red/1", "text"],
      ['.g4-doc-task-feedback[data-kind="complete"] > .rain-icon', "color", "Icon/Green/1", "meaningful-icon"],
    ].map(([selector, property, tokenId, content, interaction = "non-interactive"]) => ["apps/playground/src/docs/components/g4-component-pages.css", selector, property, tokenId, content, interaction, [selector === ".g4-doc-file" && property === "color" ? "Background/Neutral/2" : "Background/Neutral/1"]]),
  ];
  return { colorRecipeConsumers, colorCssConsumers: rows.map(([filePath, selector, property, tokenId, content, interaction, parentSurfaces]) => ({
    filePath, selector, property, parentSurfaces, value: `${property.startsWith("border") && property !== "border-color" ? "var(--rain-line-thickness-1) solid " : ""}var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`,
    use: { ...use(tokenId, content, filePath.includes("/item/") ? "g4-item" : filePath.includes("/progress/") ? "g4-progress" : "g4-playground", interaction),
      ...(filePath.startsWith("apps/") ? { evidenceRef: selector === ".g4-doc-link-icon" ? "docs/plans/2026-10-11-g4-sizing-and-icons.md" : "docs/plans/2026-10-11-g4-visual-refinement.md" } : {}), ...(tokenId === "Text/Neutral/4" ? { critical: false } : {}) },
  })) };
}

function getComponentColorConsumers() {
  const inputs = getInputColorConsumers(), icons = getIconButtonColorConsumers(), questions = getQuestionNumberColorConsumers(), options = getOptionButtonColorConsumers(), optionContent = getOptionButtonContentColorConsumers();
  const tags = getTagColorConsumers(), tagThree = getTagBatchThreeColorConsumers(), selects = getSelectColorConsumers();
  return {
    colorRecipeConsumers: [...inputs.colorRecipeConsumers, ...icons.colorRecipeConsumers, ...questions.colorRecipeConsumers, ...options.colorRecipeConsumers, ...optionContent, ...tags.colorRecipeConsumers, ...getTagDomainColorConsumers(), ...tagThree.colorRecipeConsumers, ...selects.colorRecipeConsumers, ...getTabsColorConsumers(), ...getCardColorConsumers().colorRecipeConsumers, ...getTableRn08ColorConsumers(), ...getEmptyColorConsumers(), ...getPaginationColorConsumers().colorRecipeConsumers],
    colorCssConsumers: [...getAlertColorConsumers(), ...inputs.colorCssConsumers, ...icons.colorCssConsumers, ...questions.colorCssConsumers, ...options.colorCssConsumers, ...getQuestionOptionSizeReviewColorConsumers(), ...tags.colorCssConsumers, ...tagThree.colorCssConsumers, ...selects.colorCssConsumers, ...getCheckboxColorConsumers(), ...getRadioColorConsumers(), ...getSelectionCardColorConsumers(), ...getSelectionPatternColorConsumers(), ...getDropdownFamilyColorConsumers(), ...getTabsPageColorConsumers(), ...getCardColorConsumers().colorCssConsumers, ...getDialogColorConsumers(), ...getTreeColorConsumers(), ...getManageTreeColorConsumers(), ...getTreePageColorConsumers(), ...getLayoutsColorConsumers(), ...getPaginationColorConsumers().colorCssConsumers, ...getMaterialRecipeColorConsumers(), ...getBmBColorConsumers(), ...getChartColorConsumers()],
  };
}

// Fixed-source Bklit bindings are chart-local recipes, never new public Tokens.
// The finite ledger keeps physical CSS declarations separate from the actual reading/paint role.
export function getChartColorConsumers() {
  const shared = "packages/ui/src/charts/styles.css", examples = "apps/playground/src/docs/components/chart-examples.css";
  const page = "apps/playground/src/docs/components/chart-page.css", catalog = "apps/prototype/src/scenarios/bklit-validation/catalog.css";
  const evidenceRef = "packages/ui/src/charts/README.md", sourceCommit = "5d699897b2dde26374cf15501dbaadbc52cea982";
  const white = ["Background/Neutral/1"], pageSurface = ["Background/Neutral/2"];
  const metadata = { scope: "bklit-rain-charts", supportedThemes: ["light"], darkAcceptance: "not-granted", contrastReview: "pending-review",
    contrastMeasurementScope: "full-opacity-against-declared-opaque-surfaces; graph-overlap-gradients-and-faded-states-await-runtime-review", sourceCommit, evidenceRef };
  const use = (tokenId, content, interaction = "non-interactive", critical = content === "text", recipeId = "chart-rain-base") => ({
    tokenId, property: tokenId.startsWith("Text/") ? "color" : tokenId.startsWith("Border/") ? "border-color" : "background-color",
    content, role: tokenId.split("/")[0].toLowerCase(), context: "component-recipe", interaction, critical, recipeId, evidenceRef,
    ...(tokenId.includes("/Brand/") ? { brandIntent: "action" } : {}),
  });
  const direct = (filePath, selector, property, tokenId, content, parents = white, interaction = "non-interactive", critical = content === "text", template = "VAR") => ({
    ...metadata, filePath, selector, property, value: template.replace("VAR", `var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`),
    parentSurfaces: parents, use: use(tokenId, content, interaction, critical),
  });
  const native = (filePath, selector, property, value, bindingKind, extra = {}) => ({
    ...metadata, filePath, selector, property, value, nativeBinding: { kind: bindingKind, ...extra },
  });
  const business = consumer => ({ ...consumer, scope: "rain-chart-business" });
  const rows = [
    // Native aliases have their own consumer role; weak grid strokes are decorative, brush handles are essential boundaries.
    ...[
      ["--background", "Background/Neutral/1", "surface"], ["--foreground", "Text/Neutral/1", "text"],
      ["--border", "Border/Neutral/4", "decorative"], ["--muted", "Background/Neutral/2", "surface"],
      ["--muted-foreground", "Text/Neutral/4", "text", ["Background/Neutral/2"], false],
      ["--chart-background", "Background/Neutral/3", "surface"], ["--chart-foreground", "Text/Neutral/2", "text"],
      ["--chart-foreground-muted", "Text/Neutral/4", "text", white, false],
      ["--chart-label", "Text/Neutral/4", "text", white, true],
      ["--chart-grid", "Border/Neutral/4", "decorative"], ["--chart-crosshair", "Border/Neutral/1", "essential-boundary"],
      ["--chart-brush-border", "Border/Neutral/3", "essential-boundary"],
      ["--chart-tooltip-muted", "Text/Neutral/4", "text", white, false],
      ["--chart-indicator-color", "Text/Neutral/2", "text"], ["--chart-indicator-secondary-color", "Background/Neutral/3", "surface"],
      ["--chart-marker-background", "Background/Neutral/2", "surface"], ["--chart-marker-border", "Border/Neutral/3", "essential-boundary"],
      ["--chart-marker-foreground", "Text/Neutral/2", "text", ["Background/Neutral/2"]],
      ["--chart-marker-badge-background", "Background/Neutral/3", "surface"],
      ["--chart-marker-badge-foreground", "Text/Neutral/2", "text", ["Background/Neutral/3"]],
      ["--chart-scale-pattern-color", "Border/Neutral/2", "essential-boundary"], ["--chart-no-data", "Background/Neutral/3", "surface"],
      ["--color-zinc-500", "Text/Neutral/4", "text", white, false], ["--color-zinc-900", "Text/Neutral/1", "text"],
      ["--color-zinc-100", "Background/Neutral/2", "surface"], ["--color-white", "Background/Neutral/1", "surface"],
      ["--chart-neutral", "Text/Neutral/4", "text", white, false],
    ].map(([property, tokenId, content, parents = white, critical = content === "text"]) => direct(shared, ".rain-chart", property, tokenId, content, parents, content === "essential-boundary" ? "interactive" : "non-interactive", critical)),
    direct(shared, ".rain-chart .sankey-nodes text", "fill", "Text/Neutral/4", "text", white, "non-interactive", true),
    { ...direct(shared, ".rain-chart", "--chart-label-inverse", "OnColor/1", "text", [], "non-interactive", true),
      use: { ...use("OnColor/1", "text", "non-interactive", true), role: "text", property: "color", onColor: true },
      runtimeParentSurfaces: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
      contrastMeasurementScope: "inverse-text-against-runtime-sector-fills; measured-in-feedback-2026-10-08; no-opaque-Foundation-parent-assumed" },
    direct(shared, '.rain-chart [data-rain-id="ui-chart-funnel"] .font-semibold.text-foreground', "color", "Text/Neutral/4", "text", white, "non-interactive", true),
    ...[
      [".rain-chart-center-value", "color", "Text/Neutral/1", "large-text"],
      [".rain-chart .rain-chart-sunburst-title", "color", "Text/Neutral/1", "text"],
      [".rain-chart-center-label", "color", "Text/Neutral/4", "text"], [".rain-chart-note", "color", "Text/Neutral/4", "text"],
      [".rain-chart-empty", "color", "Text/Neutral/4", "text"],
      [".rain-chart-data :is(th,td)", "border-bottom", "Border/Neutral/4", "decorative", "1px solid VAR"],
      [".rain-chart-data summary", "color", "Text/Neutral/3", "text", "VAR", "interactive"],
      [".rain-chart-data caption", "color", "Text/Neutral/4", "text"],
      [".rain-chart :is(button,select):where(:not([data-rain-id]))", "color", "Text/Neutral/3", "text", "VAR", "interactive"],
      [".rain-chart :is(button,select):where(:not([data-rain-id]))", "background", "Background/Neutral/1", "surface"],
      [".rain-chart :is(button,select):where(:not([data-rain-id]))", "border", "Border/Neutral/3", "essential-boundary", "1px solid VAR", "interactive"],
    ].map(([selector, property, tokenId, content, template = "VAR", interaction = "non-interactive"]) => direct(examples, selector, property, tokenId, content, white, interaction, content === "text" || content === "large-text", template)),
    ...[
      [".rain-chart-doc-controls label, .rain-chart-source label", "color", "Text/Neutral/4", "text", "VAR", "interactive"],
      [".rain-chart-doc-controls select, .rain-chart-source select", "color", "Text/Neutral/3", "text", "VAR", "interactive"],
      [".rain-chart-doc-controls select, .rain-chart-source select", "background", "Background/Neutral/1", "surface"],
      [".rain-chart-doc-controls select, .rain-chart-source select", "border", "Border/Neutral/3", "essential-boundary", "1px solid VAR", "interactive"],
      [".rain-chart-source summary", "color", "Text/Neutral/3", "text", "VAR", "interactive"],
    ].map(([selector, property, tokenId, content, template = "VAR", interaction = "non-interactive"]) => direct(page, selector, property, tokenId, content, white, interaction, content === "text", template)),
    ...[
      ["body", "background", "Background/Neutral/2", "surface"], [".rain-chart-catalog", "color", "Text/Neutral/1", "text"],
      [".rain-chart-catalog__intro p", "color", "Text/Neutral/4", "text"],
      [".rain-chart-catalog nav a", "color", "Text/Neutral/3", "text", "VAR", "interactive"],
      [".rain-chart-catalog nav a[aria-current]", "background", "Background/Neutral/3", "surface"],
      [".rain-chart-catalog :is(button,select)", "color", "Text/Neutral/2", "text", "VAR", "interactive", white],
      [".rain-chart-catalog :is(button,select)", "background", "Background/Neutral/1", "surface"],
      [".rain-chart-catalog :is(button,select)", "border", "Border/Neutral/3", "essential-boundary", "1px solid VAR", "interactive", white],
      [".rain-chart-catalog label", "color", "Text/Neutral/4", "text", "VAR", "interactive"],
      [".rain-chart-catalog__preview", "background", "Background/Neutral/1", "surface"],
      [".rain-chart-catalog__preview", "border", "Border/Neutral/4", "decorative", "1px solid VAR"],
      [".rain-chart-catalog__description", "color", "Text/Neutral/3", "text"],
      [".rain-chart-catalog__note", "color", "Text/Neutral/4", "text"],
      [".rain-chart-catalog summary", "color", "Text/Neutral/3", "text", "VAR", "interactive"],
      [".rain-chart-catalog th, .rain-chart-catalog td", "border-bottom", "Border/Neutral/4", "decorative", "1px solid VAR"],
      [".rain-chart-catalog pre", "background", "Background/Neutral/2", "surface"],
      [".rain-chart-catalog__status", "color", "Text/Neutral/4", "text"],
    ].map(([selector, property, tokenId, content, template = "VAR", interaction = "non-interactive", parents = pageSurface]) => direct(catalog, selector, property, tokenId, content, parents, interaction, content === "text", template)),
    ...[
      [".rain-chart-catalog a", "color", "Text/Brand/2", "text", pageSurface, "action"],
      [".rain-chart-catalog nav a[aria-current]", "color", "Text/Brand/2", "text", ["Background/Neutral/3"], "selected"],
      [".rain-chart-catalog button:hover", "border-color", "Border/Brand/1", "essential-boundary", white, "action"],
    ].map(([selector, property, tokenId, content, parents, brandIntent]) => {
      const consumer = direct(catalog, selector, property, tokenId, content, parents, "interactive", true);
      return { ...consumer, use: { ...consumer.use, brandIntent } };
    }),
  ];
  const palettes = [
    [".rain-chart", ["#5074ff", "#895aff", "#8a7cfc", "#509cff", "#30b3ff"], ["#8a7cfc", "#86b0ff"]],
    ['.rain-chart[data-recipe="category-wide"]', ["#236eff", "#675fff", "#01adc3", "#ff6cc4", "#f57e58"], ["#01adc3", "#22cadf"]],
    ['.rain-chart[data-recipe="category-solid"]', ["#4661fe", "#8848ff", "#37b5ce", "#658cff", "#bfa5ff"], ["var(--chart-3)", "var(--chart-3)"]],
    ['.rain-chart[data-recipe="monochrome-blue"]', ["#6288C7", "#3F5D91", "#91B0E1", "#BFD3F2", "#E5EEFC"], ["var(--chart-1)", "var(--chart-3)"]],
  ];
  for (const [selector, series, bar] of palettes) {
    for (let index = 0; index < series.length; index++) rows.push(native(shared, selector, `--rain-local-chart-series-${index + 1}`, series[index], "local-data-palette", { dataRole: "category", minimum: 3, parentSurfaces: white }));
    for (const [index, part] of ["top", "bottom"].entries()) rows.push(native(shared, selector, `--rain-local-chart-bar-${part}`, bar[index], bar[index].startsWith("#") ? "local-data-palette" : "scoped-data-alias", { dataRole: "gradient-endpoint", minimum: 3, parentSurfaces: white }));
  }
  for (const [index, value] of ["#f5f4ff", "#dfe1ff", "#a1a9ff", "#7c7dfd", "#4a31d1"].entries()) {
    const local = `--rain-local-chart-scale-0${index + 1}`;
    rows.push(native(shared, ".rain-chart", local, value, "local-data-palette", { dataRole: "intensity", minimum: 3, parentSurfaces: white }));
    rows.push(native(shared, ".rain-chart", `--chart-scale-0${index + 1}`, `var(${local})`, "scoped-data-alias", { dataRole: "intensity" }));
  }
  for (const [sign, value] of [["positive", "#30a87b"], ["negative", "#ed6b70"]]) rows.push(native(shared, ".rain-chart", `--rain-local-chart-${sign}`, value, "local-data-palette", { dataRole: "sign", minimum: 3, parentSurfaces: white }));
  for (const [index, series] of [5, 4, 3, 1, 2].entries()) rows.push(native(shared, '.rain-chart[data-recipe="monochrome-blue"]', `--rain-local-chart-scale-0${index + 1}`, `var(--rain-local-chart-series-${series})`, "scoped-data-alias", { dataRole: "intensity" }));
  for (let index = 1; index <= 5; index++) rows.push(native(shared, ".rain-chart", `--chart-${index}`, `var(--rain-local-chart-series-${index})`, "scoped-data-alias", { dataRole: "category" }));
  for (const [property, value] of [
    ["--chart-line-primary", "var(--chart-1)"], ["--chart-line-secondary", "var(--chart-2)"],
    ["--chart-positive", "var(--rain-local-chart-positive)"], ["--chart-negative", "var(--rain-local-chart-negative)"],
    ["--color-emerald-500", "var(--rain-local-chart-positive)"], ["--color-red-500", "var(--rain-local-chart-negative)"],
    ["--chart-segment-background", "color-mix(in srgb, var(--chart-1) 6%, transparent)"],
    ["--chart-segment-line", "color-mix(in srgb, var(--chart-1) 25%, transparent)"],
  ]) rows.push(native(shared, ".rain-chart", property, value, "scoped-data-alias", { dataRole: property.includes("segment") ? "segment-emphasis" : "series-or-sign" }));
  for (const [property, value, tokenId, content, parents = white, interaction = "non-interactive", critical = content === "text"] of [
    ["--popover", "var(--background)", "Background/Neutral/1", "surface"], ["--popover-foreground", "var(--foreground)", "Text/Neutral/1", "text"],
    ["--chart-tooltip-background", "var(--background)", "Background/Neutral/1", "surface"], ["--chart-tooltip-foreground", "var(--foreground)", "Text/Neutral/1", "text"],
    ["--legend", "var(--background)", "Background/Neutral/1", "surface"],
    ["--legend-foreground", "var(--chart-label)", "Text/Neutral/5", "text", [...white, ...pageSurface], "interactive", true],
    ["--legend-muted", "var(--muted)", "Background/Neutral/2", "surface"],
    ["--legend-muted-foreground", "var(--muted-foreground)", "Text/Neutral/4", "text", [...white, ...pageSurface], "interactive", true],
    ["--legend-track", "var(--border)", "Border/Neutral/4", "essential-boundary", [...white, ...pageSurface], "interactive", false],
    ["--color-muted", "var(--muted)", "Background/Neutral/2", "surface"],
    ["--color-chart-label", "var(--chart-label)", "Text/Neutral/5", "text"],
    ["color", "var(--foreground)", "Text/Neutral/1", "text"],
  ]) rows.push(native(shared, ".rain-chart", property, value, "scoped-token-alias", { use: use(tokenId, content, interaction, critical), parentSurfaces: parents }));
  for (const [selector, property, value, tokenId, content] of [
    [".rain-chart .rain-data-bar", "background", "var(--chart-no-data)", "Background/Neutral/3", "surface"],
    ['.rain-chart .rain-data-bar[data-state="missing"]', "background", "repeating-linear-gradient(135deg, var(--chart-no-data), var(--chart-no-data) 3px, transparent 3px, transparent 6px)", "Background/Neutral/3", "surface"],
    ['.rain-chart .rain-data-bar[data-state="invalid"], .rain-chart .rain-data-bar[data-state="overflow"]', "outline", "1px dashed var(--chart-marker-border)", "Border/Neutral/3", "essential-boundary"],
  ]) rows.push(business(native(shared, selector, property, value, "scoped-token-alias", { use: use(tokenId, content), parentSurfaces: white })));
  rows.push(business(native(shared, ".rain-chart .rain-data-bar__fill", "background", "var(--chart-1)", "scoped-data-alias", { dataRole: "quantity" })));
  const businessCss = "apps/playground/src/docs/components/chart-business/chart-business.css";
  for (const [selector, property, tokenId, content] of [
    [".rain-business-bar-plot", "--chart-label", "Text/Neutral/3", "text"],
    [".rain-business-ranking__label", "color", "Text/Neutral/3", "text"],
    [".rain-business-controls select", "border", "Border/Neutral/3", "essential-boundary"],
    [".rain-business-controls select", "background", "Background/Neutral/1", "surface"],
    [".rain-business-note", "color", "Text/Neutral/4", "text"],
    [".rain-business-reading small, .rain-business-number small", "color", "Text/Neutral/4", "text"],
    [".rain-business-mini-gallery__group", "border-bottom", "Border/Neutral/4", "decorative"],
    [".rain-business-mini-gallery__group h3", "color", "Text/Neutral/2", "text"],
    [".rain-business-mini-gallery figcaption", "color", "Text/Neutral/3", "text"],
    [".rain-business-mini-gallery__description", "color", "Text/Neutral/3", "text"],
    [".rain-business-mini-state", "color", "Text/Neutral/3", "text"],
    [".rain-business-cards p", "color", "Text/Neutral/4", "text"],
    [".rain-business-table-scroll", "border", "Border/Neutral/4", "decorative"],
    [".rain-business-table thead", "background", "Background/Neutral/2", "surface"],
    [".rain-business-detail", "border", "Border/Neutral/3", "decorative"],
    [".rain-business-detail", "background", "Background/Neutral/2", "surface"],
    [".rain-business-course-list li", "border-bottom", "Border/Neutral/4", "decorative"],
    [".rain-business-course-list span", "color", "Text/Neutral/3", "text"],
  ]) rows.push(business(direct(businessCss, selector, property, tokenId, content, white, content === "essential-boundary" ? "interactive" : "non-interactive", content === "text", property.startsWith("border") ? "1px solid VAR" : "VAR")));
  const networkCss = "apps/playground/src/docs/components/chart-business/network-page.css";
  for (const [selector, property, tokenId, content] of [
    [".rain-network-controls select", "border", "Border/Neutral/3", "essential-boundary"],
    [".rain-network-controls select", "background", "Background/Neutral/1", "surface"],
    [".rain-network-status, .rain-network-note, .rain-network-feedback", "color", "Text/Neutral/3", "text"],
    [".rain-network-example", "--chart-label", "Text/Neutral/3", "text"],
    [".rain-network-example", "border-top", "Border/Neutral/4", "decorative"],
    [".rain-network-example h2", "color", "Text/Neutral/2", "text"],
    [".rain-network-reference", "color", "Text/Neutral/4", "text"],
    [".rain-network-description", "color", "Text/Neutral/3", "text"],
    [".rain-network-state", "border", "Border/Neutral/4", "decorative"],
    [".rain-network-state", "color", "Text/Neutral/3", "text"],
  ]) rows.push(business(direct(networkCss, selector, property, tokenId, content, white, content === "essential-boundary" ? "interactive" : "non-interactive", content === "text", property.startsWith("border") ? "1px solid VAR" : "VAR")));
  rows.push(business(native(networkCss, ".rain-network-controls select:focus-visible", "outline", "var(--rain-focus-width) solid var(--rain-focus-control)", "foundation-focus", { use: { ...use("Border/Brand/1", "essential-boundary", "interactive", true, "chart-rain-focus"), property: "outline-color" }, parentSurfaces: white })));
  rows.push(business(native(networkCss, ".rain-network-controls select:focus-visible", "box-shadow", "0 0 0 3px var(--rain-focus-control-halo)", "foundation-focus", { use: use("Fill/Brand/Alpha/3", "surface", "interactive", false, "chart-rain-focus-halo"), parentSurfaces: white })));
  const chinaCss = "apps/playground/src/docs/components/chart-business/china-region-page.css";
  for (const [selector, property, tokenId, content] of [
    [".rain-china-controls select", "border", "Border/Neutral/3", "essential-boundary"],
    [".rain-china-controls select", "background", "Background/Neutral/1", "surface"],
    [".rain-china-status, .rain-china-note", "color", "Text/Neutral/3", "text"],
    [".rain-china-example", "border-top", "Border/Neutral/4", "decorative"],
    [".rain-china-example h2", "color", "Text/Neutral/2", "text"],
    [".rain-china-reference", "color", "Text/Neutral/3", "text"],
    [".rain-china-state", "color", "Text/Neutral/3", "text"],
    [".rain-china-state", "background", "Background/Neutral/1", "surface"],
    [".rain-china-canvas:has([data-map-active=\"true\"]) .rain-china-state", "background", "Fill/Neutral/Alpha/2", "surface"],
    [".rain-china-map-controls", "border", "Border/Neutral/4", "decorative"],
    [".rain-china-map-controls", "background", "Background/Neutral/1", "surface"],
    [".rain-china-scale", "color", "Text/Neutral/3", "text"],
    [".rain-china-scale i", "border", "Border/Neutral/4", "decorative"],
    [".rain-china-reading", "border-top", "Border/Neutral/4", "decorative"],
    [".rain-china-reading", "border-bottom", "Border/Neutral/4", "decorative"],
    [".rain-china-reading", "color", "Text/Neutral/3", "text"],
    [".rain-china-detail", "color", "Text/Neutral/3", "text"],
    [".rain-china-detail h3", "color", "Text/Neutral/2", "text"],
    [".rain-china-source-line", "color", "Text/Neutral/3", "text"],
    [".rain-china-unmatched", "color", "Text/Neutral/3", "text"],
    [".rain-china-data", "color", "Text/Neutral/3", "text"],
    [".rain-china-demo", "color", "Text/Neutral/3", "text"],
  ]) rows.push(business(direct(chinaCss, selector, property, tokenId, content, white, content === "essential-boundary" ? "interactive" : "non-interactive", content === "text", property.startsWith("border") || property === "outline" ? "1px solid VAR" : "VAR")));
  for (const [selector, variable] of [[".rain-china-controls select:focus-visible", "--rain-focus-control"], [".rain-china-data summary:focus-visible", "--rain-focus-item"]]) {
    rows.push(business(native(chinaCss, selector, "outline", `var(--rain-focus-width) solid var(${variable})`, "foundation-focus", { use: { ...use("Border/Brand/1", "essential-boundary", "interactive", true, "chart-rain-focus"), property: "outline-color" }, parentSurfaces: white })));
  }
  rows.push(business(native(chinaCss, ".rain-china-controls select:focus-visible", "box-shadow", "0 0 0 3px var(--rain-focus-control-halo)", "foundation-focus", { use: use("Fill/Brand/Alpha/3", "surface", "interactive", false, "chart-rain-focus-halo"), parentSurfaces: white })));
  const categoryCss = "apps/playground/src/docs/components/chart-business/category-page.css";
  for (const [selector, property, tokenId, content] of [
    [".rain-category-controls select", "border", "Border/Neutral/3", "essential-boundary"],
    [".rain-category-controls select", "background", "Background/Neutral/1", "surface"],
    [".rain-category-status", "color", "Text/Neutral/3", "text"],
    [".rain-category-example", "--chart-label", "Text/Neutral/3", "text"],
    [".rain-category-example", "border-top", "Border/Neutral/4", "decorative"],
    [".rain-category-example h2", "color", "Text/Neutral/2", "text"],
    [".rain-category-reference", "color", "Text/Neutral/4", "text"],
    [".rain-category-description", "color", "Text/Neutral/3", "text"],
    [".rain-category-data summary", "color", "Text/Neutral/3", "text"],
    [".rain-category-state", "border", "Border/Neutral/4", "decorative"],
    [".rain-category-state", "color", "Text/Neutral/3", "text"],
  ]) rows.push(business(direct(categoryCss, selector, property, tokenId, content, white, content === "essential-boundary" ? "interactive" : "non-interactive", content === "text", property.startsWith("border") ? "1px solid VAR" : "VAR")));
  const categoryFocus = ".rain-category-controls select:focus-visible, .rain-category-scroll:focus-visible, .rain-category-data summary:focus-visible";
  rows.push(business(native(categoryCss, categoryFocus, "outline", "var(--rain-focus-width) solid var(--rain-focus-control)", "foundation-focus", { use: { ...use("Border/Brand/1", "essential-boundary", "interactive", true, "chart-rain-focus"), property: "outline-color" }, parentSurfaces: white })));
  rows.push(business(native(categoryCss, categoryFocus, "box-shadow", "0 0 0 3px var(--rain-focus-control-halo)", "foundation-focus", { use: use("Fill/Brand/Alpha/3", "surface", "interactive", false, "chart-rain-focus-halo"), parentSurfaces: white })));
  const matrixCss = "packages/ui/src/charts/matrix/matrix.css";
  for (const [selector, property, value, tokenId, content] of [
    [".rain-chart.rain-matrix", "color", "var(--chart-foreground,var(--rain-category-text-neutral-2))", "Text/Neutral/2", "text"],
    [".rain-chart.rain-matrix th", "color", "var(--chart-foreground,var(--rain-category-text-neutral-2))", "Text/Neutral/2", "text"],
    ['.rain-chart.rain-matrix th[data-active="true"]', "color", "var(--chart-foreground)", "Text/Neutral/2", "text"],
    [".rain-chart.rain-matrix .rain-matrix__row-heading", "background", "var(--background,var(--rain-category-background-neutral-1))", "Background/Neutral/1", "surface"],
    [".rain-chart.rain-matrix .rain-matrix__missing", "background", "repeating-linear-gradient(135deg,var(--chart-no-data,var(--rain-category-background-neutral-3)),var(--chart-no-data,var(--rain-category-background-neutral-3)) 3px,transparent 3px,transparent 6px)", "Background/Neutral/3", "surface"],
    [".rain-chart.rain-matrix .rain-matrix__not-applicable", "border", "var(--rain-line-thickness-1) dashed var(--chart-grid,var(--rain-category-border-neutral-4))", "Border/Neutral/4", "decorative"],
    [".rain-chart.rain-matrix .rain-matrix__symbol text", "fill", "currentColor", "OnColor/1", "text"],
    [".rain-chart.rain-matrix [data-slot=\"reading-container\"]", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text"],
    [".rain-chart.rain-matrix [data-tone=\"light\"]", "color", "var(--rain-category-oncolor-1)", "OnColor/1", "text"],
    ['.rain-chart.rain-matrix[data-variant="bubble"] .rain-matrix__symbol [data-slot="reading-container"]', "color", "var(--rain-category-oncolor-1)", "OnColor/1", "text"],
    [".rain-chart.rain-matrix [data-slot=\"zero-mark\"]", "fill", "var(--chart-no-data,var(--rain-category-background-neutral-3))", "Background/Neutral/3", "surface"],
    [".rain-chart.rain-matrix .rain-matrix__color-probe--dark", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text"],
    [".rain-chart.rain-matrix .rain-matrix__color-probe--light", "color", "var(--rain-category-oncolor-1)", "OnColor/1", "text"],
  ]) rows.push(business(native(matrixCss,selector,property,value,"scoped-token-alias", tokenId.startsWith("OnColor/")
    ? {use:{...use(tokenId,content),role:"text",property:property === "fill" ? "fill" : "color",onColor:true},parentSurfaces:[],runtimeParentSurfaces:["--chart-scale-01","--chart-scale-02","--chart-scale-03","--chart-scale-04","--chart-scale-05"],contrastMeasurementScope:"actual-cell-fill-including-interpolated-colors-and-transitions; no-reading-backplate; human-contrast-gate-pending"}
    : {use:use(tokenId,content),parentSurfaces:white,...(selector.includes('reading-container') ? {runtimeParentSurfaces:["--chart-scale-01","--chart-scale-02","--chart-scale-03","--chart-scale-04","--chart-scale-05"],contrastMeasurementScope:"actual-cell-fill-including-interpolated-colors-and-transitions; no-reading-backplate; human-contrast-gate-pending"} : {})})));
  rows.push(business(native(matrixCss,'.rain-chart.rain-matrix th[data-active="true"]',"background","linear-gradient(var(--chart-segment-background),var(--chart-segment-background)),var(--background,var(--rain-category-background-neutral-1))","scoped-data-alias",{dataRole:"matrix-active-axis",runtimeParentSurfaces:["--background"],contrastMeasurementScope:"active-axis-data-tint-on-opaque-surface-with-header-text; human-contrast-gate-pending"})));
  for (const [selector,value] of [
    [".rain-chart.rain-matrix .rain-matrix__scroll:focus-visible","var(--rain-focus-width) solid var(--rain-focus-control)"],
    ['.rain-chart.rain-matrix td[data-active="true"]',"var(--rain-line-thickness-1) solid var(--rain-focus-item)"],
    ['.rain-chart.rain-matrix .rain-matrix__legend [role="button"]:focus-visible',"var(--rain-focus-width) solid var(--rain-focus-item)"],
    ['.rain-chart.rain-matrix .rain-matrix__legend-range[data-active="true"]',"var(--rain-line-thickness-2) solid var(--rain-focus-item)"],
  ]) rows.push(business(native(matrixCss,selector,"outline",value,"foundation-focus",{use:{...use("Border/Brand/1","essential-boundary","interactive",true),property:"outline-color"},parentSurfaces:white,runtimeParentSurfaces:["--chart-scale-01","--chart-scale-02","--chart-scale-03","--chart-scale-04","--chart-scale-05"],contrastMeasurementScope:"active-cell-and-legend-boundaries-against-actual-fill; human-contrast-gate-pending"})));
  for (const [selector, property, value] of [
    [".rain-chart.rain-matrix .rain-matrix__heat","background","Canvas"],
    [".rain-chart.rain-matrix .rain-matrix__heat","border","var(--rain-line-thickness-1) solid CanvasText"],
    [".rain-chart.rain-matrix circle","fill","CanvasText"],
    ['.rain-chart.rain-matrix .rain-matrix__heat [data-slot="reading-container"]',"color","CanvasText"],
    ['.rain-chart.rain-matrix[data-variant="bubble"] .rain-matrix__symbol [data-slot="reading-container"]',"color","Canvas"],
  ]) rows.push({...business(native(matrixCss,selector,property,value,"forced-colors-data",{runtimeReview:"pending-review"})),media:"@media (forced-colors:active)"});
  rows.push(native(examples, ".rain-chart-gauge", "--chart-5", "var(--chart-2)", "scoped-data-alias", { dataRole: "gauge-native-compatibility" }));
  for (const [filePath, selector, parents] of [
    [shared, ".rain-chart :is(button,a,select,summary,[tabindex]):focus-visible", white],
    [page, ".rain-chart-source :is(a,button,select,summary):focus-visible, .rain-chart-doc-controls select:focus-visible", white],
    [catalog, ".rain-chart-catalog :is(button,select,a,summary):focus-visible", [...white, ...pageSurface]],
  ]) {
    rows.push(native(filePath, selector, "outline", "var(--rain-focus-width) solid var(--rain-focus-control)", "foundation-focus", { use: { ...use("Border/Brand/1", "essential-boundary", "interactive", true, "chart-rain-focus"), property: "outline-color" }, parentSurfaces: parents }));
    rows.push(native(filePath, selector, "box-shadow", "0 0 0 3px var(--rain-focus-control-halo)", "foundation-focus", { use: use("Fill/Brand/Alpha/3", "surface", "interactive", false, "chart-rain-focus-halo"), parentSurfaces: parents }));
    rows.push({ ...native(filePath, selector, "outline", "2px solid CanvasText", "forced-colors-focus", { runtimeReview: "pending-review" }), media: "@media (forced-colors: active)" });
  }
  return rows;
}

export function getTreeColorConsumers() {
  const filePath = "packages/ui/src/tree/tree.css";
  const rows = [
    [".rain-tree", "color", "Text/Neutral/1", "text"],
    ['.rain-tree-node:hover > .rain-tree-row', "background", "Fill/Neutral/Alpha/6", "surface"],
    ['[data-rain-theme="dark"] .rain-tree-node[data-selected="true"] > .rain-tree-row', "background", "Fill/Brand/Solid/4", "surface"],
    ['[data-rain-theme="dark"] .rain-tree[data-selection-appearance="inset"] .rain-tree-node[data-selected="true"] > .rain-tree-row::before', "background", "Fill/Brand/Solid/4", "surface"],
    ['.rain-tree-node [data-slot="description"]', "color", "Text/Neutral/6", "text"],
    ['.rain-tree-node [data-slot="meta"], .rain-tree-node [data-slot="meta-mobile"]', "color", "Text/Neutral/6", "text"],
    [".rain-tree-expander, .rain-tree-drag-handle", "color", "Icon/Neutral/4", "meaningful-icon"],
    ['.rain-tree-node:is(:hover, :focus-within, :has([data-slot="drop-indicator"])) :is([data-slot="description"], [data-slot="meta"], [data-slot="meta-mobile"])', "color", "Text/Neutral/4", "text"],
    ['.rain-tree-node:is(:hover, :focus-within, :has([data-slot="drop-indicator"])) :is(.rain-tree-expander, .rain-tree-drag-handle)', "color", "Icon/Neutral/3", "meaningful-icon"],
    ['.rain-tree-node :is(.rain-tree-expander, .rain-tree-drag-handle):is(:hover, :focus-visible)', "color", "Icon/Neutral/2", "meaningful-icon"],
    [".rain-tree-expander:hover, .rain-tree-drag-handle:hover", "background", "Fill/Neutral/Alpha/3", "surface"],
    ['.rain-tree-node [data-slot="title"] mark', "background", "Fill/Brand/Alpha/3", "surface"],
    [".rain-tree-connector, .rain-tree-ancestor-line, .rain-tree-outgoing-line", "background", "Border/Neutral/3", "decorative"],
    [".rain-tree-connector::after", "background", "Border/Neutral/3", "decorative"],
    ['.rain-tree[data-line-style="dotted"] :is(.rain-tree-connector, .rain-tree-ancestor-line, .rain-tree-outgoing-line)', "background", "Border/Neutral/3", "decorative", "repeating-linear-gradient(to bottom, VAR 0 2px, transparent 2px 4px)"],
    ['.rain-tree[data-line-style="dotted"] .rain-tree-connector::after', "background", "Border/Neutral/3", "decorative", "repeating-linear-gradient(to right, VAR 0 2px, transparent 2px 4px)"],
    ['.rain-tree [data-slot="drop-indicator"]', "background", "Fill/Brand/Solid/2", "surface"],
    ['.rain-tree [data-slot="drop-indicator"][data-placement="inside"]', "border", "Border/Brand/3", "decorative", "1px solid VAR"],
    ['.rain-tree [data-slot="drop-indicator"][data-placement="inside"]', "background", "Fill/Brand/Alpha/4", "surface"],
    ['.rain-tree-node[data-selected="true"] [data-slot="title"]', "color", "Text/Brand/1", "text"],
  ];
  return rows.map(([selector, property, tokenId, content, template = "VAR"]) => ({
    filePath, selector, property,
    value: template.replace("VAR", `var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`),
    parentSurfaces: ["Background/Neutral/1", "Background/Neutral/2"],
    ...(["Text/Neutral/6", "Icon/Neutral/4"].includes(tokenId) ? { contrastReview: "pending-review" } : {}),
    use: { tokenId, property: property === "background" ? "background-color" : property === "border" ? "border-color" : property, content, role: tokenId.split("/")[0].toLowerCase(),
      context: "component-recipe", interaction: content === "meaningful-icon" ? "interactive" : "non-interactive",
      critical: content === "text" || content === "meaningful-icon", ...(tokenId.includes('/Brand/') ? { brandIntent: selector.includes('data-selected') ? "selected" : "active" } : {}),
      recipeId: "tree-layout-a", evidenceRef: "docs/plans/2026-09-25-tree-implementation-rules.md" },
  }));
}

export function getManageTreeColorConsumers() {
  const filePath = "apps/playground/src/patterns/manage-tree/manage-tree.css";
  const rows = [
    [".rain-manage-tree", "color", "Text/Neutral/1", "text"],
    ['.rain-manage-tree [data-slot="conflict"]', "border", "Border/Neutral/2", "decorative", "1px solid VAR"],
    ['.rain-manage-tree [data-slot="conflict"]', "background", "Background/Neutral/1", "surface"],
  ];
  return rows.map(([selector, property, tokenId, content, template = "VAR"]) => ({
    filePath, selector, property, value: template.replace("VAR", `var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`),
    parentSurfaces: ["Background/Neutral/1", "Background/Neutral/2"],
    use: { tokenId, property: property === "background" ? "background-color" : property === "border" ? "border-color" : property,
      content, role: tokenId.split("/")[0].toLowerCase(), context: "local-recipe", interaction: "non-interactive",
      critical: content === "text", recipeId: "manage-tree-pattern", evidenceRef: "docs/plans/2026-09-25-tree-implementation-rules.md" },
  }));
}

export function getTreePageColorConsumers() {
  const filePath = "apps/playground/src/docs/components/tree-page.css";
  const rows = [
    [".tree-page", "color", "Text/Neutral/1", "text"],
    [".tree-page__header a", "color", "Text/Brand/1", "text"],
    [".tree-page__header p, .tree-page__panel > p", "color", "Text/Neutral/3", "text"],
    [".tree-page__panel", "border", "Border/Neutral/2", "decorative", "1px solid VAR"],
    [".tree-page__panel", "background", "Background/Neutral/1", "surface"],
    [".tree-page__manage-link", "color", "Text/Brand/1", "text"],
    [".tree-state-copy", "color", "Text/Neutral/3", "text"],
  ];
  return rows.map(([selector, property, tokenId, content, template = "VAR"]) => ({
    filePath, selector, property, value: template.replace("VAR", `var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`),
    parentSurfaces: ["Background/Neutral/1", "Background/Neutral/2"],
    use: { tokenId, property: property === "background" ? "background-color" : property === "border" ? "border-color" : property,
      content, role: tokenId.split("/")[0].toLowerCase(), context: "local-recipe", interaction: "non-interactive",
      critical: content === "text", ...(tokenId.includes('/Brand/') ? { brandIntent: "action" } : {}), recipeId: "tree-playground", evidenceRef: "docs/plans/2026-09-25-tree-implementation-rules.md" },
  }));
}

export function getTabsColorConsumers() {
  const filePath = "packages/ui/src/tabs/tabs.styles.ts", scope = '[data-rain-id="ui-tabs"]';
  const evidenceRef = "docs/plans/2026-09-10-tabs-implementation.md", base = "Background/Neutral/1";
  const stateFlags = {
    ordinary: {}, hover: { hover: true }, pressed: { pressed: true }, selected: { selected: true },
    focus: { focus: true }, "focus-hover": { focus: true, hover: true }, "focus-pressed": { focus: true, pressed: true },
    "selected-hover": { selected: true, hover: true }, "selected-pressed": { selected: true, pressed: true },
    "selected-focus": { selected: true, focus: true }, disabled: { disabled: true }, "selected-disabled": { selected: true, disabled: true },
  };
  const tokens = (appearance, { selected = false, disabled = false, hover = false, pressed = false } = {}) => {
    const soft = appearance === "soft", interaction = disabled ? "normal" : pressed ? "pressed" : hover ? "hover" : "normal";
    const text = disabled ? "Text/Neutral/6" : selected ? soft ? "Text/Brand/1" : `Text/Neutral/${interaction === "hover" ? 2 : 1}`
      : `Text/Neutral/${soft ? { normal: 4, hover: 3, pressed: 2 }[interaction] : { normal: 3, hover: 2, pressed: 1 }[interaction]}`;
    return {
      label: text, count: selected && !disabled && !soft ? "Text/Neutral/2" : text,
      icon: disabled ? "Icon/Neutral/5" : selected ? soft ? "Icon/Brand/1" : "Icon/Neutral/1" : `Icon/Neutral/${{ normal: 3, hover: 2, pressed: 1 }[interaction]}`,
      paint: appearance === "line" ? null : selected ? soft ? "Fill/Brand/Alpha/4" : base
        : soft ? `Fill/Neutral/Alpha/${{ normal: 6, hover: 5, pressed: 4 }[interaction]}`
        : interaction === "normal" ? null : `Fill/Neutral/Alpha/${interaction === "hover" ? 6 : 5}`,
      border: null,
    };
  };
  const paintClass = (tokenId, part) => {
    const property = part === "paint" ? "background-color" : part === "border" ? "border-color" : "color";
    if (!tokenId) return part === "border" ? "border-transparent" : "bg-transparent";
    return colorTokenOutputs.find(entry => entry.id === tokenId).utilities.find(entry => entry.property === property).className;
  };
  const definition = {};
  for (const appearance of ["line", "contained", "soft"]) {
    definition[appearance] = {};
    for (const [name, flags] of Object.entries({ normal: {}, selected: { selected: true }, disabled: { disabled: true }, selectedDisabled: { selected: true, disabled: true } })) {
      const normal = tokens(appearance, flags), hover = tokens(appearance, { ...flags, hover: true }), pressed = tokens(appearance, { ...flags, pressed: true });
      definition[appearance][name] = Object.fromEntries(Object.entries(normal).map(([part, tokenId]) => [part,
        [paintClass(tokenId, part), ...(hover[part] !== tokenId ? [`group-hover/tabs:${paintClass(hover[part], part)}`] : []),
          ...(pressed[part] !== tokenId || pressed[part] !== hover[part] ? [`group-active/tabs:${paintClass(pressed[part], part)}`] : [])].join(" ") ]));
    }
  }
  definition.more = { label: "text-rain-category-text-neutral-3 group-hover/tabs:text-rain-category-text-neutral-2 group-active/tabs:text-rain-category-text-neutral-1",
    icon: "text-rain-category-icon-neutral-3 group-hover/tabs:text-rain-category-icon-neutral-2 group-active/tabs:text-rain-category-icon-neutral-1" };
  definition.tray = "bg-rain-category-background-neutral-3";
  definition.indicator = "bg-rain-category-fill-brand-solid-2";
  definition.divider = "bg-rain-category-border-neutral-3";
  const use = (tokenId, part, flags, recipeId) => {
    const contentPart = ["label", "count", "icon", "more-label", "more-icon"].includes(part);
    return { tokenId, role: tokenId.split("/")[0].toLowerCase(), property: /^(Fill|Background)\//.test(tokenId) || ["indicator", "divider"].includes(part) ? "background-color" : tokenId.startsWith("Border/") ? "border-color" : "color",
      content: contentPart ? flags.disabled ? "disabled" : part.endsWith("icon") ? "meaningful-icon" : "text" : part === "border" || part === "divider" ? "decorative" : "surface",
      context: "component-recipe", recipeId, evidenceRef, interaction: contentPart ? "interactive" : "non-interactive", critical: contentPart && !flags.disabled, brandIntent: "selected" };
  };
  const recipes = [];
  for (const appearance of ["line", "contained", "soft"]) for (const [state, given] of Object.entries(stateFlags)) {
    const flags = { selected: false, disabled: false, hover: false, pressed: false, focus: false, ...given }, paints = tokens(appearance, flags);
    const underlay = appearance === "contained" && !flags.selected ? "Background/Neutral/3" : base;
    for (const [part, tokenId] of Object.entries(paints)) {
      if (!tokenId) continue;
      const id = `tabs-${appearance}-${part}-${state}`, foreground = use(tokenId, part, flags, id);
      recipes.push({ id, componentId: "ui-tabs", appearance, part, state, ...flags, foreground,
        parentSurfaceId: part === "paint" ? underlay : paints.paint ?? underlay, parentBackgroundId: underlay });
    }
    if (appearance === "line" && flags.selected) {
      const id = `tabs-line-indicator-${state}`;
      recipes.push({ id, componentId: "ui-tabs", appearance, part: "indicator", state, ...flags, foreground: use("Fill/Brand/Solid/2", "indicator", flags, id), parentSurfaceId: base, parentBackgroundId: base, requiredStateContrast: 3 });
    }
    if (!flags.selected && !flags.disabled) for (const part of ["more-label", "more-icon"]) {
      const id = `tabs-${appearance}-${part}-${state}`, tokenId = `${part === "more-icon" ? "Icon" : "Text"}/Neutral/${flags.pressed ? 1 : flags.hover ? 2 : 3}`;
      recipes.push({ id, componentId: "ui-tabs", appearance, part, state, ...flags, foreground: use(tokenId, part, flags, id), parentSurfaceId: paints.paint ?? underlay, parentBackgroundId: underlay });
    }
  }
  for (const [part, tokenId] of [["tray", "Background/Neutral/3"], ["divider", "Border/Neutral/3"]]) {
    const id = `tabs-${part}`;
    recipes.push({ id, componentId: "ui-tabs", appearance: part === "tray" ? "contained" : "line", part, state: "ordinary", selected: false, disabled: false, hover: false, pressed: false, focus: false,
      foreground: use(tokenId, part, {}, id), parentSurfaceId: base, parentBackgroundId: base });
  }
  return [{ filePath, scope, componentId: "ui-tabs", symbol: "tabsPaints", kind: "static", refinement: "tabs", foregroundContent: "tabs-parts", parentSurfaces: [base], definition, recipes }];
}

export function getTabsPageColorConsumers() {
  return [
    [".tabs-page", "background", "Background/Neutral/3", "surface"],
    [".tabs-page", "color", "Text/Neutral/1", "text"],
    [".tabs-page__surface", "background", "Background/Neutral/1", "surface"],
    [".tabs-page th, .tabs-page td", "border-bottom", "Border/Neutral/1", "decorative"],
    [".tabs-page pre", "background", "Background/Neutral/3", "surface"],
  ].map(([selector, property, tokenId, content]) => {
    const value = `var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`;
    return { filePath: "apps/playground/src/docs/components/tabs-page.css", selector, property,
      value: property === "border-bottom" ? `var(--rain-line-thickness-1) solid ${value}` : value,
      scope: ".tabs-page", parentSurfaces: ["Background/Neutral/1", "Background/Neutral/3"],
      use: { tokenId, role: tokenId.split("/")[0].toLowerCase(), property: tokenId.startsWith("Border/") ? "border-color" : tokenId.startsWith("Background/") ? "background-color" : "color", content,
        context: "local-recipe", recipeId: "tabs-documentation", evidenceRef: "docs/plans/2026-09-10-tabs-implementation.md", interaction: "non-interactive", critical: content === "text" },
    };
  });
}

export function getDropdownFamilyColorConsumers() {
  const surface = "Background/Neutral/1", parents = [surface, "Fill/Neutral/Alpha/6", "Fill/Neutral/Alpha/5", "Fill/Red/Alpha/2", "Fill/Red/Alpha/1"];
  const css = (selector, property, value, tokenId, content, surfaces = parents, extra = {}) => ({
    filePath: "packages/ui/src/dropdown-menu/dropdown-menu.css", selector, property, value, parentSurfaces: surfaces,
    parentBackgrounds: [surface], contrastReview: "pending-review",
    use: { tokenId, role: tokenId.startsWith("OnColor/") ? "icon" : tokenId.split("/")[0].toLowerCase(),
      property: tokenId.startsWith("Border/") ? "border-color" : /^(Background|Fill)\//.test(tokenId) ? "background-color" : "color",
      content, context: "component-recipe", recipeId: "menu-public-parts", evidenceRef: "docs/plans/2026-09-09-dropdown-family-construction-plan.md",
      brandIntent: "selected", interaction: content === "text" ? "interactive" : "non-interactive", critical: content !== "disabled",
      ...(tokenId.startsWith("OnColor/") ? { onColor: true } : {}), ...extra },
  });
  const selected = '.rain-menu-item:is([data-checked], [data-selected="true"])';
  const page = (...args) => ({ ...css(...args), filePath: "apps/playground/src/docs/components/dropdown-page.css" });
  return [
    css(".rain-popup", "background-color", "var(--rain-category-background-neutral-1)", surface, "surface", [surface, "Background/Neutral/2", "Background/Neutral/3"]),
    css(".rain-popup", "border-color", "var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative"),
    css(".rain-popup", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
    css('.rain-menu-item:where([data-tone="danger"], [data-disabled]) [data-slot="description"]', "color", "var(--rain-category-text-neutral-4)", "Text/Neutral/4", "text", [surface, "Fill/Red/Alpha/2", "Fill/Red/Alpha/1"], { recipeId: "menu-public-description", critical: false }),
    css('.rain-menu-item:where(:not([data-tone="danger"]):not([data-disabled])) [data-slot="description"]', "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text", [surface, "Fill/Neutral/Alpha/6", "Fill/Neutral/Alpha/5"], { recipeId: "menu-public-description", critical: false }),
    css('.rain-menu-item [data-slot="description"][data-critical="true"]', "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
    css('.rain-menu-item [data-slot="leading"]', "color", "var(--rain-category-icon-neutral-2)", "Icon/Neutral/2", "meaningful-icon"),
    css('.rain-menu-item [data-slot="submenu-indicator"]', "color", "var(--rain-category-icon-neutral-2)", "Icon/Neutral/2", "meaningful-icon"),
    css('.rain-menu-item:not([data-tone="danger"])[data-highlighted]:not([data-disabled])', "background-color", "var(--rain-category-fill-neutral-alpha-6)", "Fill/Neutral/Alpha/6", "surface", [surface]),
    css('.rain-menu-item[data-tone="danger"] [data-slot="label"]', "color", "var(--rain-category-text-red-1)", "Text/Red/1", "text", [surface, "Fill/Red/Alpha/2", "Fill/Red/Alpha/1"]),
    css('.rain-menu-item[data-tone="danger"] [data-slot="leading"]', "color", "var(--rain-category-icon-red-1)", "Icon/Red/1", "meaningful-icon", [surface, "Fill/Red/Alpha/2", "Fill/Red/Alpha/1"]),
    css('.rain-menu-item[data-tone="danger"][data-highlighted]:not([data-disabled])', "background-color", "var(--rain-category-fill-red-alpha-2)", "Fill/Red/Alpha/2", "surface", [surface]),
    { ...css('.rain-menu-item:not([data-tone="danger"]):hover:not([data-disabled])', "background-color", "var(--rain-category-fill-neutral-alpha-6)", "Fill/Neutral/Alpha/6", "surface", [surface]), media: "@media (hover: hover)" },
    { ...css('.rain-menu-item[data-tone="danger"]:hover:not([data-disabled])', "background-color", "var(--rain-category-fill-red-alpha-2)", "Fill/Red/Alpha/2", "surface", [surface]), media: "@media (hover: hover)" },
    css('.rain-menu-item:not([data-tone="danger"]):active:not([data-disabled])', "background-color", "var(--rain-category-fill-neutral-alpha-5)", "Fill/Neutral/Alpha/5", "surface", [surface]),
    css('.rain-menu-item[data-tone="danger"]:active:not([data-disabled])', "background-color", "var(--rain-category-fill-red-alpha-1)", "Fill/Red/Alpha/1", "surface", [surface]),
    css('.rain-menu-item[data-disabled] [data-slot="label"]', "color", "var(--rain-category-text-neutral-6)", "Text/Neutral/6", "disabled", [surface]),
    css('.rain-menu-item[data-disabled] [data-slot="leading"]', "color", "var(--rain-category-icon-neutral-5)", "Icon/Neutral/5", "disabled", [surface]),
    css(`${selected} [data-slot="label"]`, "color", "var(--rain-category-text-brand-1)", "Text/Brand/1", "text", parents, { recipeId: "menu-public-selected-text" }),
    css(`${selected} [data-slot="description"]`, "color", "var(--rain-category-text-brand-2)", "Text/Brand/2", "text", parents, { recipeId: "menu-public-selected-description", critical: false }),
    css(`${selected} [data-slot="description"][data-critical="true"]`, "color", "var(--rain-category-text-brand-1)", "Text/Brand/1", "text", parents, { recipeId: "menu-public-selected-text" }),
    css(`${selected} [data-slot="leading"], ${selected} [data-slot="submenu-indicator"]`, "color", "var(--rain-category-icon-brand-1)", "Icon/Brand/1", "meaningful-icon", parents, { recipeId: "menu-public-selected-icon" }),
    css('.rain-menu-item [data-slot="confirmation"]', "background-color", "var(--rain-category-fill-brand-solid-2)", "Fill/Brand/Solid/2", "surface"),
    css('.rain-menu-item [data-slot="confirmation"]', "color", "var(--rain-category-oncolor-1)", "OnColor/1", "meaningful-icon", ["Fill/Brand/Solid/2"]),
    css(".rain-menu-separator", "background-color", "var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative", [surface]),
    page(".dropdown-page", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text", [surface, "Background/Neutral/3"]),
    page(".dropdown-page", "background-color", "var(--rain-category-background-neutral-3)", "Background/Neutral/3", "surface", [surface]),
    page(".dropdown-page .core-family", "background-color", "var(--rain-category-background-neutral-1)", surface, "surface", ["Background/Neutral/3"]),
    page(".dropdown-page .core-family", "border-color", "var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative", ["Background/Neutral/3"]),
    page(".dropdown-panel-footer", "border-top", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative", [surface]),
    page('.dropdown-panel-body [role="alert"]', "color", "var(--rain-category-text-red-1)", "Text/Red/1", "text", [surface]),
    page(".dropdown-example-backdrop", "background-color", "var(--rain-category-fill-neutral-alpha-1)", "Fill/Neutral/Alpha/1", "surface", [surface, "Background/Neutral/3"]),
    page(".dropdown-example-dialog", "background-color", "var(--rain-category-background-neutral-1)", surface, "surface", [surface]),
    page(".dropdown-example-dialog", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text", [surface]),
    page('.dropdown-template-panel .dropdown-template-radio[data-state="checked"] [data-slot="label"]', "color", "var(--rain-category-text-brand-1)", "Text/Brand/1", "text", [surface]),
    page('.dropdown-template-panel .dropdown-template-radio[data-state="checked"] [data-slot="description"]', "color", "var(--rain-category-text-brand-2)", "Text/Brand/2", "text", [surface], { critical: false }),
  ];
}

/** One selector adapter for the two canonical native palettes and their menu consumers. */
export function shareMenuSelectionSelectors(source) {
  return source
    .replaceAll(':has(input:disabled) [data-slot="control"]', ':is(:has(input:disabled), [data-menu-control][data-disabled="true"]) [data-slot="control"]')
    .replaceAll(':has(input:enabled):hover', ':is(:has(input:enabled):hover, [data-menu-control][data-highlighted]:not([data-disabled="true"]))')
    .replaceAll(':has(input:enabled):is(:active, :has(input:active))', ':is(:has(input:enabled):is(:active, :has(input:active)), .rain-menu-item:active:not([data-disabled]) > [data-menu-control]:not([data-disabled="true"]))');
}

export function getCheckboxColorConsumers({ menuVisualReuse = true } = {}) {
  const filePath = "packages/ui/src/styles.css";
  const evidenceRef = "docs/plans/2026-09-09-checkbox-sc01-implementation.md";
  const parents = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const css = (selector, property, value, tokenId, content, parentSurfaces = parents, extra = {}) => ({
    filePath, selector: menuVisualReuse ? shareMenuSelectionSelectors(selector) : selector, property, value, parentSurfaces,
    use: { tokenId, role: tokenId.startsWith("OnColor/") ? "icon" : tokenId.split("/")[0].toLowerCase(),
      property: tokenId.startsWith("Border/") ? "border-color" : /^(Background|Fill)\//.test(tokenId) ? "background-color" : "color",
      content, context: "component-recipe", recipeId: "checkbox-standard", evidenceRef,
      brandIntent: "selected", interaction: "non-interactive", critical: content !== "disabled",
      ...(tokenId.startsWith("OnColor/") ? { onColor: true } : {}), ...extra },
  });
  const boundary = { context: "local-recipe", recipeId: "checkbox-boundary", alpha: 65, alphaOperation: "replace" };
  const selected = '.rain-checkbox[data-state="checked"] [data-slot="control"], .rain-checkbox[data-state="mixed"] [data-slot="control"]';
  const disabled = '.rain-checkbox:has(input:disabled) [data-slot="control"]';
  const uncheckedFeedback = (state) => `.rain-checkbox[data-state="unchecked"]:has(input:enabled)${state} [data-slot="control"]`;
  const selectedFeedback = (state) => `.rain-checkbox:is([data-state="checked"], [data-state="mixed"]):has(input:enabled)${state} [data-slot="control"]`;
  const pressed = ':is(:active, :has(input:active))';
  const feedbackBoundary = { ...boundary, recipeId: "checkbox-boundary-feedback", alpha: 85 };
  const pageCss = (...args) => ({ ...css(...args), filePath: "apps/playground/src/docs/components/checkbox-page.css" });
  return [
    css(".rain-checkbox", "--rain-local-checkbox-boundary", "rgb(from var(--rain-category-border-neutral-1) r g b / 65%)", "Border/Neutral/1", "essential-boundary", parents, boundary),
    css(".rain-checkbox", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
    css('.rain-checkbox [data-slot="control"]', "background-color", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface"),
    { ...css('.rain-checkbox [data-slot="control"]', "border-color", "var(--rain-local-checkbox-boundary)", "Border/Neutral/1", "essential-boundary", parents, boundary),
      sourceAlias: { selector: ".rain-checkbox", property: "--rain-local-checkbox-boundary" } },
    css(selected, "background-color", "var(--rain-category-fill-brand-solid-2)", "Fill/Brand/Solid/2", "surface"),
    css(selected, "border-color", "var(--rain-category-border-brand-1)", "Border/Brand/1", "decorative"),
    css(selected, "color", "var(--rain-category-oncolor-1)", "OnColor/1", "meaningful-icon", ["Fill/Brand/Solid/2"]),
    css(disabled, "background-color", "var(--rain-category-fill-neutral-solid-2)", "Fill/Neutral/Solid/2", "surface"),
    css(disabled, "border-color", "var(--rain-category-border-neutral-2)", "Border/Neutral/2", "disabled"),
    css(disabled, "color", "var(--rain-category-icon-neutral-4)", "Icon/Neutral/4", "disabled", ["Fill/Neutral/Solid/2"]),
    css('.rain-checkbox:has(input:disabled) [data-slot="label"]', "color", "var(--rain-category-text-neutral-4)", "Text/Neutral/4", "disabled"),
    css(".rain-checkbox-group", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
    css('.rain-checkbox-group[data-invalid="true"] > [data-slot="message"]', "color", "var(--rain-category-text-red-1)", "Text/Red/1", "text"),
    ...[
      css('.rain-checkbox:has(input:enabled):hover [data-slot="canvas"]::before', "background-color", "var(--rain-category-fill-neutral-alpha-3)", "Fill/Neutral/Alpha/3", "surface"),
      { ...css(uncheckedFeedback(":hover"), "border-color", "rgb(from var(--rain-category-border-neutral-1) r g b / 85%)", "Border/Neutral/1", "essential-boundary", ["Fill/Neutral/Alpha/3"], feedbackBoundary), parentBackgrounds: parents },
    ].map((entry) => ({ ...entry, media: "@media (hover: hover) and (forced-colors: none)" })),
    ...[
      css(`.rain-checkbox:has(input:enabled)${pressed} [data-slot="canvas"]::before`, "background-color", "var(--rain-category-fill-neutral-alpha-2)", "Fill/Neutral/Alpha/2", "surface"),
      { ...css(uncheckedFeedback(pressed), "border-color", "rgb(from var(--rain-category-border-neutral-1) r g b / 85%)", "Border/Neutral/1", "essential-boundary", ["Fill/Neutral/Alpha/2"], feedbackBoundary), parentBackgrounds: parents },
      css(selectedFeedback(pressed), "background-color", "var(--rain-category-fill-brand-solid-1)", "Fill/Brand/Solid/1", "surface"),
      css(selectedFeedback(pressed), "color", "var(--rain-category-oncolor-1)", "OnColor/1", "meaningful-icon", ["Fill/Brand/Solid/1"]),
    ].map((entry) => ({ ...entry, media: "@media (forced-colors: none)" })),
    pageCss(".checkbox-page", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text"),
    pageCss(".checkbox-page", "background-color", "var(--rain-category-background-neutral-3)", "Background/Neutral/3", "surface"),
    pageCss(".checkbox-page .core-family", "background-color", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface"),
    pageCss(".checkbox-page .core-family", "border-color", "var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative"),
  ];
}

export function getSelectionPatternColorConsumers() {
  const css = (selector, property, value, tokenId, content) => ({
    filePath: "apps/playground/src/patterns/selection-patterns.css", selector, property, value,
    parentSurfaces: ["Background/Neutral/1"], parentBackgrounds: ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"],
    use: { tokenId, role: tokenId.split("/")[0].toLowerCase(),
      property: tokenId.startsWith("Border/") ? "border-color" : /^(Background|Fill)\//.test(tokenId) ? "background-color" : "color",
      content, context: "component-recipe", recipeId: "selection-patterns-sc03", evidenceRef: "docs/plans/2026-09-10-selection-patterns-sc03-implementation.md",
      interaction: "non-interactive", critical: true },
  });
  return [
    css(".rain-selection-preview__backdrop", "background-color", "var(--rain-category-fill-neutral-alpha-1)", "Fill/Neutral/Alpha/1", "surface"),
    css(".rain-selection-preview", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text"),
    css(".rain-selection-preview", "background-color", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface"),
    css(".rain-selection-preview", "border", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative"),
    css('.rain-selection-preview [data-slot="description"]', "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
  ];
}

export function getSelectionCardColorConsumers() {
  const filePath = "packages/ui/src/styles.css", evidenceRef = "docs/plans/2026-09-10-selection-cards-sc02-implementation.md";
  const backgrounds = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const css = (selector, property, value, tokenId, content, parentSurfaces = ["Background/Neutral/1", "Fill/Brand/Alpha/4"], parentBackgrounds = backgrounds) => ({
    filePath, selector, property, value, parentSurfaces, parentBackgrounds,
    use: { tokenId, role: tokenId.split("/")[0].toLowerCase(),
      property: tokenId.startsWith("Border/") ? "border-color" : /^(Background|Fill)\//.test(tokenId) ? "background-color" : "color",
      content, context: "component-recipe", recipeId: "selection-card-sc02", evidenceRef,
      brandIntent: "selected", interaction: "non-interactive", critical: content !== "disabled" },
  });
  const selected = '.rain-selection-card:has(> .rain-selection-card__selection > input:checked), .rain-selection-card:has(> .rain-selection-card__selection > input[type="checkbox"]:indeterminate)';
  const pageCss = (selector, property, value, tokenId, content) => ({ ...css(selector, property, value, tokenId, content, backgrounds), filePath: "apps/playground/src/docs/components/selection-cards-page.css" });
  return [
    css(".rain-selection-card", "border", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative", backgrounds),
    css(".rain-selection-card", "background-color", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface", backgrounds),
    css(".rain-selection-card", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
    css(selected, "border-color", "var(--rain-category-border-brand-1)", "Border/Brand/1", "decorative", backgrounds),
    css(selected, "background-image", "linear-gradient(var(--rain-category-fill-brand-alpha-4), var(--rain-category-fill-brand-alpha-4))", "Fill/Brand/Alpha/4", "surface", ["Background/Neutral/1"]),
    css(".rain-selection-card__identity", "background-color", "var(--rain-category-fill-brand-alpha-4)", "Fill/Brand/Alpha/4", "surface"),
    css(".rain-selection-card__identity", "color", "var(--rain-category-text-brand-1)", "Text/Brand/1", "text"),
    css(".rain-selection-card__accent", "color", "var(--rain-category-text-brand-1)", "Text/Brand/1", "text"),
    css('.rain-selection-card__detail [data-slot="detail-value"]', "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text"),
    pageCss(".selection-cards-page", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text"),
    pageCss(".selection-cards-page", "background-color", "var(--rain-category-background-neutral-3)", "Background/Neutral/3", "surface"),
    pageCss(".selection-cards-page .core-family", "background-color", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface"),
    pageCss(".selection-cards-page .core-family", "border-color", "var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative"),
    pageCss(".selection-cards-page__intro, .selection-cards-page__note", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
  ];
}

export function getRadioColorConsumers({ menuVisualReuse = true } = {}) {
  const filePath = "packages/ui/src/styles.css";
  const evidenceRef = "docs/plans/2026-09-10-radio-sc01-implementation.md";
  const parents = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const css = (selector, property, value, tokenId, content, parentSurfaces = parents, extra = {}) => ({
    filePath, selector: menuVisualReuse ? shareMenuSelectionSelectors(selector) : selector, property, value, parentSurfaces,
    use: { tokenId, role: tokenId.startsWith("OnColor/") ? "icon" : tokenId.split("/")[0].toLowerCase(),
      property: tokenId.startsWith("Border/") ? "border-color" : /^(Background|Fill)\//.test(tokenId) ? "background-color" : "color",
      content, context: "component-recipe", recipeId: "radio-standard", evidenceRef,
      brandIntent: "selected", interaction: "non-interactive", critical: content !== "disabled",
      ...(tokenId.startsWith("OnColor/") ? { onColor: true } : {}), ...extra },
  });
  const boundary = { context: "local-recipe", recipeId: "radio-boundary", alpha: 65, alphaOperation: "replace" };
  const selected = '.rain-radio[data-state="checked"] [data-slot="control"]';
  const disabled = '.rain-radio:has(input:disabled) [data-slot="control"]';
  const uncheckedFeedback = (state) => `.rain-radio[data-state="unchecked"]:has(input:enabled)${state} [data-slot="control"]`;
  const selectedFeedback = (state) => `.rain-radio[data-state="checked"]:has(input:enabled)${state} [data-slot="control"]`;
  const pressed = ':is(:active, :has(input:active))';
  const feedbackBoundary = { ...boundary, recipeId: "radio-boundary-feedback", alpha: 85 };
  const pageCss = (...args) => ({ ...css(...args), filePath: "apps/playground/src/docs/components/radio-page.css" });
  return [
    css(".rain-radio", "--rain-local-radio-boundary", "rgb(from var(--rain-category-border-neutral-1) r g b / 65%)", "Border/Neutral/1", "essential-boundary", parents, boundary),
    css(".rain-radio", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
    css('.rain-radio [data-slot="control"]', "background-color", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface"),
    { ...css('.rain-radio [data-slot="control"]', "border-color", "var(--rain-local-radio-boundary)", "Border/Neutral/1", "essential-boundary", parents, boundary),
      sourceAlias: { selector: ".rain-radio", property: "--rain-local-radio-boundary" } },
    css(selected, "background-color", "var(--rain-category-fill-brand-solid-2)", "Fill/Brand/Solid/2", "surface"),
    css(selected, "border-color", "var(--rain-category-border-brand-1)", "Border/Brand/1", "decorative"),
    css(selected, "color", "var(--rain-category-oncolor-1)", "OnColor/1", "meaningful-icon", ["Fill/Brand/Solid/2"]),
    css(disabled, "background-color", "var(--rain-category-fill-neutral-solid-2)", "Fill/Neutral/Solid/2", "surface"),
    css(disabled, "border-color", "var(--rain-category-border-neutral-2)", "Border/Neutral/2", "disabled"),
    css(disabled, "color", "var(--rain-category-icon-neutral-4)", "Icon/Neutral/4", "disabled", ["Fill/Neutral/Solid/2"]),
    css('.rain-radio:has(input:disabled) [data-slot="label"]', "color", "var(--rain-category-text-neutral-4)", "Text/Neutral/4", "disabled"),
    css(".rain-radio-group", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"),
    css('.rain-radio-group[data-invalid="true"] > [data-slot="message"]', "color", "var(--rain-category-text-red-1)", "Text/Red/1", "text"),
    ...[
      css('.rain-radio:has(input:enabled):hover [data-slot="canvas"]::before', "background-color", "var(--rain-category-fill-neutral-alpha-3)", "Fill/Neutral/Alpha/3", "surface"),
      { ...css(uncheckedFeedback(":hover"), "border-color", "rgb(from var(--rain-category-border-neutral-1) r g b / 85%)", "Border/Neutral/1", "essential-boundary", ["Fill/Neutral/Alpha/3"], feedbackBoundary), parentBackgrounds: parents },
    ].map((entry) => ({ ...entry, media: "@media (hover: hover) and (forced-colors: none)" })),
    ...[
      css(`.rain-radio:has(input:enabled)${pressed} [data-slot="canvas"]::before`, "background-color", "var(--rain-category-fill-neutral-alpha-2)", "Fill/Neutral/Alpha/2", "surface"),
      { ...css(uncheckedFeedback(pressed), "border-color", "rgb(from var(--rain-category-border-neutral-1) r g b / 85%)", "Border/Neutral/1", "essential-boundary", ["Fill/Neutral/Alpha/2"], feedbackBoundary), parentBackgrounds: parents },
      css(selectedFeedback(pressed), "background-color", "var(--rain-category-fill-brand-solid-1)", "Fill/Brand/Solid/1", "surface"),
      css(selectedFeedback(pressed), "color", "var(--rain-category-oncolor-1)", "OnColor/1", "meaningful-icon", ["Fill/Brand/Solid/1"]),
    ].map((entry) => ({ ...entry, media: "@media (forced-colors: none)" })),
    pageCss(".radio-page", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text"),
    pageCss(".radio-page", "background-color", "var(--rain-category-background-neutral-3)", "Background/Neutral/3", "surface"),
    pageCss(".radio-page .core-family", "background-color", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface"),
    pageCss(".radio-page .core-family", "border-color", "var(--rain-category-border-neutral-3)", "Border/Neutral/3", "decorative"),
  ];
}

// Frozen review definitions: the verifier compares these with the actual static recipes.
function getQuestionNumberColorConsumers() {
  const evidenceRef = "docs/plans/2026-09-08-question-number-implementation.md";
  const parentSurfaces = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const definitions = {
    questionNumberControlColors: {
  none: "bg-rain-action-ghost text-rain-category-text-neutral-2 border-rain-category-border-neutral-3",
  answered: "bg-rain-category-fill-brand-alpha-4 text-rain-category-text-brand-2 border-rain-category-border-brand-3",
  correct: "bg-rain-category-fill-green-alpha-2 text-rain-category-text-green-2 border-rain-category-border-green-2",
  wrong: "bg-rain-category-fill-red-alpha-2 text-rain-category-text-red-2 border-rain-category-border-red-2",
  unanswered: "bg-rain-category-fill-orange-alpha-2 text-rain-category-text-orange-2 border-rain-category-border-orange-2",
  pending: "bg-rain-category-fill-brand-alpha-4 text-rain-category-text-brand-2 border-rain-category-border-brand-3",
  reviewed: "bg-rain-category-fill-brand-alpha-4 text-rain-category-text-brand-2 border-rain-category-border-brand-3",
},
    questionNumberHoverColors: {
  none: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-4",
  answered: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-3",
  correct: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-green-alpha-1",
  wrong: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-red-alpha-1",
  unanswered: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-orange-alpha-1",
  pending: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-3",
  reviewed: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-3",
},
    questionNumberMarkerColors: {
  correct: "bg-rain-category-fill-green-solid-2 text-rain-category-oncolor-1",
  wrong: "bg-rain-category-fill-red-solid-2 text-rain-category-oncolor-1",
  unanswered: "bg-rain-category-fill-orange-solid-2 text-rain-category-oncolor-1",
  pending: "bg-rain-category-background-neutral-1 text-rain-category-icon-brand-2",
  reviewed: "bg-rain-category-background-neutral-1 text-rain-category-icon-brand-2",
},
    questionNumberStateColors: {
  currentHover: "enabled:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-solid-1",
  currentControl: "border-none bg-rain-category-fill-brand-solid-2 text-rain-category-oncolor-1",
  disabledControl: "bg-rain-category-fill-neutral-alpha-4 text-rain-category-text-neutral-5 border-rain-category-border-neutral-3",
},
  };
  const use = (output, content, recipeId) => ({
    tokenId: output.id, role: output.id.startsWith("OnColor/") ? (content === "meaningful-icon" ? "icon" : "text") : output.id.split("/")[0].toLowerCase(),
    property: /^(Background|Fill)\//.test(output.id) ? "background-color" : output.id.startsWith("Border/") ? "border-color" : "color",
    content, recipeId, context: "component-recipe", evidenceRef, brandIntent: "active",
    interaction: "non-interactive", critical: content !== "disabled", ...(output.id.startsWith("OnColor/") ? { onColor: true } : {}),
  });
  const fromClass = (classes, prefix) => {
    const found = classes.match(new RegExp(`(?:${prefix})-rain-category-[a-z0-9-]+`))?.[0];
    return found ? colorTokenOutputs.find((output) => output.utilities.some((utility) => utility.className === found)) : null;
  };
  const colorRecipeConsumers = Object.entries(definitions).map(([symbol, definition]) => ({
    filePath: "packages/ui/src/question-number/question-number.styles.ts", symbol, kind: "static", scope: '[data-rain-id="ui-question-number"]',
    definition, parentSurfaces, contrastReview: "declared-review",
    foregroundContent: symbol === "questionNumberMarkerColors" ? "meaningful-icon" : "text",
    recipes: Object.entries(definition).map(([state, classes]) => {
      const id = `question-number-${symbol.replace("questionNumber", "").replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "")}-${state.toLowerCase()}`;
      const textClasses = symbol === "questionNumberHoverColors" ? definitions.questionNumberControlColors[state]
        : state === "currentHover" ? definitions.questionNumberStateColors.currentControl : classes;
      const content = state === "disabledControl" ? "disabled" : symbol === "questionNumberMarkerColors" ? "meaningful-icon" : "text";
      const background = fromClass(classes, "bg"), foreground = fromClass(textClasses, "text"), border = fromClass(classes, "border");
      return { id, state: content === "disabled" ? "disabled" : state,
        background: background ? use(background, "surface", id) : null,
        foreground: use(foreground, content, id),
        ...(border ? { boundary: use(border, "decorative", id) } : {}),
      };
    }),
  }));
  const paints = [
    [".question-number-page", "color", "var(--rain-category-text-neutral-1)", "--rain-category-text-neutral-1"],
    [".question-number-page", "background", "var(--rain-category-background-neutral-3)", "--rain-category-background-neutral-3"],
    [".question-number-page__eyebrow", "color", "var(--rain-category-text-neutral-4)", "--rain-category-text-neutral-4"],
    [".question-number-page__description", "color", "var(--rain-category-text-neutral-3)", "--rain-category-text-neutral-3"],
    [".question-number-page__section", "background", "var(--rain-category-background-neutral-1)", "--rain-category-background-neutral-1"],
    [".question-number-page__section", "border", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "--rain-category-border-neutral-3"],
    [".question-number-page__caption", "color", "var(--rain-category-text-neutral-3)", "--rain-category-text-neutral-3"],
    [".question-number-page__caption[data-feedback=\"correct\"]", "color", "var(--rain-category-text-green-2)", "--rain-category-text-green-2"],
    [".question-number-page__caption[data-feedback=\"wrong\"]", "color", "var(--rain-category-text-red-2)", "--rain-category-text-red-2"],
    [".question-number-page__caption[data-feedback=\"unanswered\"]", "color", "var(--rain-category-text-orange-2)", "--rain-category-text-orange-2"],
    [".question-number-page__caption:is([data-feedback=\"pending\"], [data-feedback=\"reviewed\"])", "color", "var(--rain-category-text-brand-2)", "--rain-category-text-brand-2"],
    [".question-number-page__status", "color", "var(--rain-category-text-neutral-3)", "--rain-category-text-neutral-3"],
    [".question-number-page__sample", "background", "var(--rain-category-background-neutral-2)", "--rain-category-background-neutral-2"],
    [".question-number-page__contract > div", "border-bottom", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "--rain-category-border-neutral-3"],
    [".question-number-page__contract dd", "color", "var(--rain-category-text-neutral-3)", "--rain-category-text-neutral-3"],
    [".question-number-page__code", "background", "var(--rain-category-background-neutral-2)", "--rain-category-background-neutral-2"],
    [".question-number-page__code", "color", "var(--rain-category-text-neutral-2)", "--rain-category-text-neutral-2"],
  ];
  const colorCssConsumers = paints.map(([selector, property, value, variable]) => {
    const output = colorTokenOutputs.find((output) => output.variable === variable);
    const content = /^(Background|Fill)\//.test(output.id) ? "surface" : output.id.startsWith("Border/") ? "decorative" : "text";
    return { filePath: "apps/playground/src/docs/components/question-number-page.css", selector, property, value,
      scope: ".question-number-page", parentSurfaces, contrastReview: "declared-review",
      use: { ...use(output, content, "question-number-page"), critical: selector !== ".question-number-page__eyebrow" },
    };
  });
  return { colorRecipeConsumers, colorCssConsumers };
}

// Exact OptionButton 32 definitions. New options inherit no contrast exception.
function getOptionButtonColorConsumers() {
  const evidenceRef = "docs/plans/2026-09-08-option-button-implementation.md";
  const parentSurfaces = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const definitions = {
    optionControlColors: {
  filled: "bg-rain-category-fill-neutral-alpha-4 text-rain-category-text-neutral-2",
  outlined: "bg-rain-action-ghost text-rain-category-text-neutral-2 border-rain-category-border-neutral-3",
  selected: "bg-rain-category-fill-brand-solid-2 text-rain-category-oncolor-1",
  disabled: "peer-disabled:bg-rain-category-fill-neutral-alpha-4 peer-disabled:text-rain-category-text-neutral-5 peer-disabled:border-rain-category-border-neutral-3",
  disabledSelected: "peer-disabled:bg-rain-category-fill-neutral-solid-2 peer-disabled:text-rain-category-text-neutral-5",
},
    optionRowColors: {
  default: "bg-rain-action-ghost text-rain-category-text-neutral-1 border-rain-action-ghost",
  selected: "bg-rain-category-fill-brand-alpha-4 text-rain-category-text-neutral-1 border-rain-category-border-brand-3",
  disabled: "has-[:disabled]:bg-rain-action-ghost has-[:disabled]:text-rain-category-text-neutral-5 has-[:disabled]:border-rain-action-ghost",
  disabledSelected: "has-[:disabled]:bg-rain-category-fill-neutral-alpha-6 has-[:disabled]:text-rain-category-text-neutral-5 has-[:disabled]:border-rain-category-border-neutral-3",
},
    optionControlInteractions: {
  filled: "has-[:enabled]:hover:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-3 has-[:enabled]:active:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-2",
  outlined: "has-[:enabled]:hover:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-6 has-[:enabled]:active:[&>[data-slot=control]]:bg-rain-category-fill-neutral-alpha-4",
  selected: "has-[:enabled]:hover:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-1 has-[:enabled]:active:[&>[data-slot=control]]:bg-rain-category-fill-brand-alpha-1",
},
    optionRowInteractions: {
  default: "has-[:enabled]:hover:bg-rain-category-fill-neutral-alpha-6 has-[:enabled]:active:bg-rain-category-fill-neutral-alpha-4",
  selected: "has-[:enabled]:hover:bg-rain-category-fill-brand-alpha-3 has-[:enabled]:active:bg-rain-category-fill-brand-alpha-3",
},
  };
  const use = (output, content, recipeId) => ({
    tokenId: output.id, role: output.id.startsWith("OnColor/") ? "text" : output.id.split("/")[0].toLowerCase(),
    property: /^(Background|Fill)\//.test(output.id) ? "background-color" : output.id.startsWith("Border/") ? "border-color" : "color",
    content, recipeId, context: "component-recipe", evidenceRef, brandIntent: "active",
    interaction: "non-interactive", critical: content !== "disabled", ...(output.id.startsWith("OnColor/") ? { onColor: true } : {}),
  });
  const fromClass = (classes, prefix) => {
    const found = classes.match(new RegExp(`(?:${prefix})-rain-category-[a-z0-9-]+`))?.[0];
    return found ? colorTokenOutputs.find((output) => output.utilities.some((utility) => utility.className === found)) : null;
  };
  const colorRecipeConsumers = Object.entries(definitions).map(([symbol, definition]) => ({
    filePath: "packages/ui/src/option-button/option-button.styles.ts", symbol, kind: "static", scope: '[data-rain-id="ui-option-button"]',
    definition, parentSurfaces, foregroundContent: "text",
    recipes: Object.entries(definition).flatMap(([state, classes]) => {
      const interactions = symbol.endsWith("Interactions");
      const textClasses = interactions ? definitions[symbol === "optionControlInteractions" ? "optionControlColors" : "optionRowColors"][state] : classes;
      const content = state.startsWith("disabled") ? "disabled" : "text";
      return (interactions ? classes.split(" ") : [classes]).map((paint) => {
        const interaction = interactions ? (paint.includes(":hover:") ? "hover" : "active") : state;
        const id = `option-button-${symbol}-${state}-${interaction}`.toLowerCase();
        const background = fromClass(paint, "bg"), foreground = fromClass(textClasses, "text"), border = fromClass(paint, "border");
        return { id, state: content === "disabled" ? "disabled" : interaction,
          background: background ? use(background, "surface", id) : null,
          foreground: use(foreground, content, id),
          ...(border ? { boundary: use(border, "decorative", id) } : {}),
        };
      });
    }),
  }));
  const paints = [
    [
        ".option-button-page",
        "color",
        "var(--rain-category-text-neutral-1)",
        "--rain-category-text-neutral-1"
    ],
    [
        ".option-button-page",
        "background",
        "var(--rain-category-background-neutral-3)",
        "--rain-category-background-neutral-3"
    ],
    [
        ".option-button-page__eyebrow",
        "color",
        "var(--rain-category-text-neutral-3)",
        "--rain-category-text-neutral-3"
    ],
    [
        ".option-button-page__description",
        "color",
        "var(--rain-category-text-neutral-3)",
        "--rain-category-text-neutral-3"
    ],
    [
        ".option-button-page__section",
        "background",
        "var(--rain-category-background-neutral-1)",
        "--rain-category-background-neutral-1"
    ],
    [
        ".option-button-page__section",
        "border",
        "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)",
        "--rain-category-border-neutral-3"
    ],
    [
        ".option-button-page__example",
        "background",
        "var(--rain-category-background-neutral-2)",
        "--rain-category-background-neutral-2"
    ],
    [
        ".option-button-page .option-button-page__status",
        "color",
        "var(--rain-category-text-neutral-3)",
        "--rain-category-text-neutral-3"
    ],
    [
        ".option-button-page__contract > div",
        "border-bottom",
        "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)",
        "--rain-category-border-neutral-3"
    ],
    [
        ".option-button-page__contract dd",
        "color",
        "var(--rain-category-text-neutral-3)",
        "--rain-category-text-neutral-3"
    ],
    [
        ".option-button-page__code",
        "background",
        "var(--rain-category-background-neutral-2)",
        "--rain-category-background-neutral-2"
    ],
    [
        ".option-button-page__code",
        "color",
        "var(--rain-category-text-neutral-2)",
        "--rain-category-text-neutral-2"
    ]
];
  const colorCssConsumers = paints.map(([selector, property, value, variable]) => {
    const output = colorTokenOutputs.find((output) => output.variable === variable);
    const content = /^(Background|Fill)\//.test(output.id) ? "surface" : output.id.startsWith("Border/") ? "decorative" : "text";
    return { filePath: "apps/playground/src/docs/components/option-button-page.css", selector, property, value,
      scope: ".option-button-page", parentSurfaces, use: use(output, content, "option-button-page"),
    };
  });
  return { colorRecipeConsumers, colorCssConsumers };
}

// User-corrected review recipe: solid family fill, reversed label/glyph, no visible caption.
function getOptionButtonContentColorConsumers() {
  const definition = {
    correct: "bg-rain-category-fill-green-solid-2 text-rain-category-oncolor-1",
    wrong: "bg-rain-category-fill-red-solid-2 text-rain-category-oncolor-1",
  };
  const use = (tokenId, content, recipeId) => ({
    tokenId, role: tokenId === "OnColor/1" ? (content === "meaningful-icon" ? "icon" : "text") : "fill",
    property: tokenId === "OnColor/1" ? "color" : "background-color", content, recipeId,
    context: "component-recipe", evidenceRef: "docs/plans/2026-09-08-option-button-content-implementation.md",
    interaction: "non-interactive", critical: true, ...(tokenId === "OnColor/1" ? { onColor: true } : {}),
  });
  return [{
    filePath: "packages/ui/src/option-button/option-button.styles.ts", symbol: "optionFeedbackControlColors", kind: "static", scope: '[data-rain-id="ui-option-button"]',
    refinement: "option-button-content", definition, parentSurfaces: ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"],
    foregroundContent: "text-and-meaningful-icon", contrastReview: "declared-review",
    recipes: ["correct", "wrong"].flatMap((state) => ["label", "symbol"].map((presentation) => {
      const id = `option-button-content-review-${state}-${presentation}`;
      return { id, state, presentation,
        background: use(`Fill/${state === "correct" ? "Green" : "Red"}/Solid/2`, "surface", id),
        foreground: use("OnColor/1", presentation === "label" ? "text" : "meaningful-icon", id),
      };
    })),
  }];
}

export function renderDeclarations(declarations, indentation = "  ") {
  return Object.entries(declarations).map(([name, value]) => `${indentation}${name}: ${value};`).join("\n");
}

export function renderUtilities(utilities) {
  return utilities.map(({ className, declarations }) =>
    `@utility ${className} {\n${renderDeclarations(declarations)}\n}`,
  ).join("\n\n");
}

function getQuestionOptionSizeReviewColorConsumers() {
  const paints = [
    [".question-option-review", "background", "var(--rain-category-background-neutral-2)", "--rain-category-background-neutral-2"],
    [".question-option-review", "color", "var(--rain-category-text-neutral-1)", "--rain-category-text-neutral-1"],
    [".size-review-eyebrow, .size-review-caption, .size-review-section > p, .size-review-section-heading p, .size-review-footer", "color", "var(--rain-category-text-neutral-3)", "--rain-category-text-neutral-3"],
    [".size-review-toolbar", "background", "var(--rain-category-background-neutral-1)", "--rain-category-background-neutral-1"],
    [".size-review-toolbar", "border", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "--rain-category-border-neutral-3"],
    [".question-option-review input[type=\"checkbox\"]", "accent-color", "var(--rain-category-fill-brand-solid-2)", "--rain-category-fill-brand-solid-2"],
    [".size-review-select select", "border", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "--rain-category-border-neutral-3"],
    [".size-review-select select", "background", "var(--rain-category-background-neutral-1)", "--rain-category-background-neutral-1"],
    [".size-review-section", "background", "var(--rain-category-background-neutral-1)", "--rain-category-background-neutral-1"],
    [".size-review-section", "border", "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)", "--rain-category-border-neutral-3"],
    [".size-review-column", "background", "var(--rain-category-background-neutral-2)", "--rain-category-background-neutral-2"],
    [".size-review-column h3 small", "color", "var(--rain-category-text-brand-2)", "--rain-category-text-brand-2"],
    [".size-review-feedback-list > div > span", "color", "var(--rain-category-text-neutral-3)", "--rain-category-text-neutral-3"],
    [".question-option-review[data-show-targets=\"true\"] .rain-question-number:not(:focus-visible), .question-option-review[data-show-targets=\"true\"] .rain-option-button:not(:has(input:focus-visible))", "outline", "var(--rain-line-thickness-1) dashed var(--rain-category-border-neutral-2)", "--rain-category-border-neutral-2"],
  ];
  return paints.map(([selector, property, value, variable]) => {
    const output = colorTokenOutputs.find((entry) => entry.variable === variable);
    const surface = /^(Background|Fill)\//.test(output.id), border = output.id.startsWith("Border/");
    return {
      filePath: "apps/playground/src/experiments/question-option-sizes/review.css", selector, property, value,
      scope: ".question-option-review", parentSurfaces: ["Background/Neutral/1", "Background/Neutral/2"],
      use: {
        tokenId: output.id, role: output.id.split("/")[0].toLowerCase(),
        property: surface ? "background-color" : border ? "border-color" : "color",
        content: surface ? "surface" : border ? "decorative" : "text", context: "local-recipe",
        recipeId: "question-option-size-review", evidenceRef: "docs/plans/2026-09-08-question-option-size-implementation.md",
        brandIntent: property === "accent-color" ? "selected" : "brand-emphasis", interaction: "non-interactive", critical: true,
      },
    };
  });
}

// Input uses the confirmed literal paints; eligibility findings remain independent of source integrity.
export function getInputColorConsumers() {
  const filePath = "packages/ui/src/input/input.styles.ts";
  const evidenceRef = "docs/plans/2026-09-08-input-design.md";
  const parentSurfaces = ["Background/Neutral/1", "Background/Neutral/3"];
  const surfaces = { default: "Fill/Neutral/Solid/7", editing: "Fill/Brand/Alpha/4", warning: "Fill/Orange/Solid/3", error: "Fill/Red/Solid/3", disabled: "Fill/Neutral/Solid/5" };
  const use = (tokenId, content, recipeId) => ({
    tokenId, role: tokenId.split("/")[0].toLowerCase(), property: /^(?:Fill|Background)\//.test(tokenId) ? "background-color" : tokenId.startsWith("Border/") ? "border-color" : "color",
    content, context: "component-recipe", recipeId, evidenceRef, brandIntent: "active",
    interaction: /^input-(?:placeholder|clear)-/.test(recipeId) ? "interactive" : "non-interactive",
    critical: recipeId.startsWith("input-placeholder-") || !["Text/Neutral/4", "Text/Neutral/5", "Icon/Neutral/3", "Icon/Neutral/5", "Text/Neutral/6"].includes(tokenId),
  });
  const paint = (id, state, tokenId, content, background) => ({
    id, state, foreground: use(tokenId, content, id), ...(background ? { background: use(background, "surface", id) } : {}),
  });
  const enabledStates = fieldColorStates().filter(({ state }) => state !== "disabled");
  const acrossInput = (symbol, tokenId, content, disabledToken) => [
    ...enabledStates.map(({ state, appearance, background }) => paint(`input-${symbol}-${appearance === "outlined" ? "" : appearance + "-"}${state}`, state, tokenId, content, background)),
    ...(disabledToken ? [paint(`input-${symbol}-disabled`, "disabled", disabledToken, "disabled", surfaces.disabled)] : []),
  ];
  const consumer = (symbol, kind, definition, foregroundContent, recipes) => ({ filePath, symbol, kind, definition, foregroundContent, recipes, scope: '[data-rain-id="ui-input"]', parentSurfaces, contrastReview: "pending-review" });
  const insideLabelRecipes = fieldColorStates().map(({ state, appearance, background }) => {
    const id = `input-inside-label-${appearance}-${state}`;
    const recipe = paint(id, state, state === "disabled" ? "Text/Neutral/6" : "Text/Neutral/4", state === "disabled" ? "disabled" : "text", background);
    return { ...recipe, appearance, foreground: { ...recipe.foreground, interaction: "interactive", critical: true, evidenceRef: "docs/plans/2026-09-14-inside-field-labels.md" } };
  });
  const colorRecipeConsumers = [
    consumer("inputControlClassName", "static", "rain-input__control min-w-0 w-full flex-1 border-none bg-transparent p-rain-0 text-inherit outline-none placeholder:text-rain-category-text-neutral-5 disabled:cursor-not-allowed disabled:placeholder:text-rain-category-text-neutral-6", "text", acrossInput("placeholder", "Text/Neutral/5", "text", "Text/Neutral/6")),
    consumer("inputAffixClassName", "static", "inline-flex flex-none items-center whitespace-nowrap text-rain-category-text-neutral-4 group-data-[state=disabled]/input:text-rain-category-text-neutral-6", "text", acrossInput("affix", "Text/Neutral/4", "text", "Text/Neutral/6")),
    consumer("inputSuffixTextClassName", "static", "inline-flex flex-none items-center whitespace-nowrap text-rain-category-text-neutral-5 group-data-[state=disabled]/input:text-rain-category-text-neutral-6", "text", acrossInput("suffix-text", "Text/Neutral/5", "text", "Text/Neutral/6")),
    consumer("inputIconColors", "static", "text-rain-category-icon-neutral-3 group-data-[state=disabled]/input:text-rain-category-icon-neutral-5", "decorative", acrossInput("decoration", "Icon/Neutral/3", "decorative", "Icon/Neutral/5")),
    consumer("inputClearClassName", "static", "rain-input__clear inline-flex size-full items-center justify-center rounded-rain-4 border-none bg-transparent p-rain-0 cursor-pointer text-rain-category-icon-neutral-3 hover:text-rain-category-icon-neutral-2 active:text-rain-category-icon-neutral-1", "meaningful-icon", ["Icon/Neutral/3", "Icon/Neutral/2", "Icon/Neutral/1"].flatMap((id, index) => acrossInput(`clear-${index}`, id, "meaningful-icon"))),
    consumer("inputCountRecipe", "cva", { variants: { overflow: { true: "text-rain-category-text-red-1", false: "text-rain-category-text-neutral-5" }, disabled: { true: "text-rain-category-text-neutral-6", false: null } } }, "text", [...acrossInput("count-overflow", "Text/Red/1", "text"), ...acrossInput("count", "Text/Neutral/5", "text", "Text/Neutral/6")]),
    { ...consumer("formItemColors", "static", { root: "text-rain-category-text-neutral-1", required: "text-rain-category-text-red-1", inside: "text-rain-category-text-neutral-4", help: "text-rain-category-text-neutral-3", error: "text-rain-category-text-red-1", warning: "text-rain-category-text-orange-1", message: "text-rain-category-text-neutral-3" }, "text", [["root", "Text/Neutral/1"], ["required", "Text/Red/1"], ["help", "Text/Neutral/3"], ["error", "Text/Red/1"], ["warning", "Text/Orange/1"], ["message", "Text/Neutral/3"]].map(([part, token]) => paint(`input-form-item-${part}`, part, token, "text")).concat(insideLabelRecipes)), filePath: "packages/ui/src/input/form-item.tsx", scope: '[data-rain-id="ui-form-item"]' },
  ];
  const colorCssConsumers = [
    [".input-page", "background", "var(--rain-category-background-neutral-3)", "Background/Neutral/3", "surface"],
    [".input-page", "color", "var(--rain-category-text-neutral-1)", "Text/Neutral/1", "text"],
    [".input-page p", "color", "var(--rain-category-text-neutral-3)", "Text/Neutral/3", "text"],
    [".input-page__column", "background", "var(--rain-category-background-neutral-1)", "Background/Neutral/1", "surface"],
  ].map(([selector, property, value, tokenId, content]) => ({
    filePath: "apps/playground/src/docs/components/input-page.css", selector, property, value, scope: ".input-page", parentSurfaces,
    use: { ...use(tokenId, content, "input-page"), context: "local-recipe" },
  }));
  return { colorRecipeConsumers, colorCssConsumers };
}

/** Fixed Tag identities and reviewed class routing; values come only from Foundations. */
export function getTagColorConsumers() {
  const parentSurfaces = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const evidenceRef = "docs/plans/2026-09-09-tag-batch-one-implementation.md";
  const profiles = {
    neutral: { text: "Text/Neutral/3", icon: "Icon/Neutral/2", filled: "Fill/Neutral/Alpha/6", border: "Border/Neutral/3", solid: "Fill/TagSlate/Solid/1", overlay: "Fill/Neutral/Solid/2", close: ["Fill/TagNeutralAction/Alpha/1", "Fill/TagNeutralAction/Alpha/2"] },
    brand: { text: "Text/Brand/1", icon: "Icon/Brand/1", filled: "Fill/Brand/Alpha/4", border: "Border/Brand/3", solid: "Fill/Brand/Solid/1", close: ["Fill/TagBrandAction/Alpha/1", "Fill/TagBrandAction/Alpha/2"] },
    ...Object.fromEntries(Object.entries(tagColorProfiles).map(([name, { family }]) => [name, {
      text: `Text/${family}/1`, icon: `Icon/${family}/1`, filled: `Fill/${family}/Alpha/1`, border: `Border/${family}/1`, solid: `Fill/${family}/Solid/1`, close: [`Fill/${family}/Alpha/2`, `Fill/${family}/Alpha/3`],
    }])),
  };
  const strong = {
    neutral: { text: "OnColor/1", icon: "OnColor/1", close: ["Fill/TagSolidAction/Alpha/1", "Fill/TagSolidAction/Alpha/2"] },
    colored: { text: "OnColor/1", icon: "OnColor/1", close: ["Fill/TagSolidAction/Alpha/1", "Fill/TagSolidAction/Alpha/2"] },
  };
  const utility = (id) => colorTokenOutputs.find((entry) => entry.id === id).utilities[0].className;
  const definition = (paints) => Object.fromEntries(Object.entries(paints).map(([name, colors]) => [name,
    Object.fromEntries(Object.entries(colors).map(([part, id]) => [part, part === "close" ? `hover:${utility(id[0])} active:${utility(id[1])}` : utility(id)])),
  ]));
  const use = (tokenId, role, content, recipeId) => ({ tokenId, role, property: role === "text" || role === "icon" ? "color" : role === "border" ? "border-color" : "background-color",
    content, context: "component-recipe", recipeId, evidenceRef, interaction: "interactive", critical: true,
    ...(tokenId.startsWith("OnColor/") ? { onColor: true } : {}), brandIntent: "selected",
  });
  const recipes = Object.entries(profiles).flatMap(([color, paints]) => ["filled", "outlined", "solid"].map((appearance) => {
    const id = `tag-${color}-${appearance}`, foreground = appearance === "solid" ? strong[color === "neutral" ? "neutral" : "colored"] : paints;
    return { id, color, appearance, state: "default",
      background: appearance === "outlined" ? null : use(appearance === "solid" ? paints.solid : paints.filled, "fill", "surface", id),
      foreground: use(foreground.text, "text", "text", id), icon: use(foreground.icon, "icon", "meaningful-icon", id),
      selectionIcon: { ...use(foreground.icon, "icon", "meaningful-icon", id), ...tagSelectionMarkColorRecipe },
      boundary: appearance === "solid" || color === "neutral" && appearance === "filled" ? null : use(paints.border, "border", "essential-boundary", id),
      boundaryScope: appearance === "filled" && color !== "neutral" ? "selected-filled" : appearance === "outlined" ? "outlined" : "none",
      overlay: use(appearance !== "solid" && paints.overlay ? paints.overlay : paints.solid, "fill", "surface", id), closeBackgrounds: foreground.close.map((tokenId) => use(tokenId, "fill", "surface", id)),
      states: ["default", "hover", "pressed", "disabled", "close-hover", "close-pressed"],
      opacity: tagStateTokens.disabled, multiply: { hover: tagStateTokens.hover, pressed: tagStateTokens.pressed },
    };
  }));
  const colorRecipeConsumers = [
    { symbol: "tagColorPaints", definition: definition(profiles), recipes },
    { symbol: "tagSolidPaints", definition: definition(strong), recipes: [] },
  ].map((entry) => ({ filePath: "packages/ui/src/tag/tag.styles.ts", kind: "static", scope: "[data-rain-id=ui-tag], [data-rain-id=ui-link-tag], [data-rain-id=ui-checkable-tag]", refinement: "tag-batch-one",
    foregroundContent: "text-and-meaningful-icon", contrastReview: "declared-review", parentSurfaces, ...entry }));
  const colorCssConsumers = parentSurfaces.map((tokenId, index) => ({ filePath: "apps/playground/src/docs/components/tag-page.css", selector: `.tag-page__samples[data-parent="${index + 1}"]`, property: "background",
    value: `var(${colorTokenOutputs.find((entry) => entry.id === tokenId).variable})`, scope: ".tag-page", parentSurfaces,
    use: use(tokenId, "background", "surface", "tag-page"),
  }));
  for (const [selector, property, tokenId, role, content] of [
    [".tag-page", "background", "Background/Neutral/3", "background", "surface"],
    [".tag-page", "color", "Text/Neutral/1", "text", "text"],
    [".tag-page__samples", "color", "Text/Neutral/1", "text", "text"],
    [".tag-page__controls select", "background", "Background/Neutral/1", "background", "surface"],
  ]) colorCssConsumers.push({ filePath: "apps/playground/src/docs/components/tag-page.css", selector, property,
    value: `var(${colorTokenOutputs.find((entry) => entry.id === tokenId).variable})`, scope: ".tag-page", parentSurfaces,
    use: use(tokenId, role, content, "tag-page"),
  });
  return { colorRecipeConsumers, colorCssConsumers };
}

export function getTagBatchThreeColorConsumers() {
  const evidenceRef = "docs/plans/2026-09-09-tag-batch-three-implementation.md", parentSurfaces = ["Background/Neutral/1"];
  const use = (tokenId, content, recipeId) => {
    const role = tokenId.split("/")[0].toLowerCase();
    return { tokenId, role, content, property: ["text", "icon"].includes(role) ? "color" : role === "border" ? "border-color" : "background-color",
      context: "component-recipe", interaction: content === "disabled" ? "disabled" : content === "decorative" ? "non-interactive" : "interactive",
      critical: content !== "decorative" && content !== "disabled", brandIntent: "selected", recipeId, evidenceRef };
  };
  const utility = (id) => colorTokenOutputs.find((entry) => entry.id === id).utilities[0].className;
  const recipes = [
    ["default", "Text/Neutral/1", "text"], ["selected", "Text/Brand/1", "text"], ["selected-icon", "Icon/Brand/1", "meaningful-icon"],
    ["disabled", "Text/Neutral/6", "disabled"], ["disabled-icon", "Icon/Neutral/5", "disabled"],
  ].flatMap(([state, id, content]) => [false, true].map((highlighted) => {
    const recipeId = `tag-select-option-${state}${highlighted ? "-highlighted" : ""}`;
    return { id: recipeId, state, foreground: use(id, content, recipeId), background: highlighted ? use("Fill/Neutral/Alpha/6", "surface", recipeId) : null };
  }));
  const colorRecipeConsumers = [{
    filePath: "packages/ui/src/tag/tag-select.styles.ts", symbol: "tagSelectPaints", kind: "static", scope: '[data-rain-id="ui-tag-select"]',
    refinement: "tag-batch-three", parentSurfaces, foregroundContent: "text-and-meaningful-icon", contrastReview: "required-pass",
    inheritedRecipe: { filePath: "packages/ui/src/tag/tag.styles.ts", symbol: "getTagRecipe", parts: ["trigger", "label", "arrow", "leading-icon", "interaction-overlay"], contrastAcceptance: "not-granted" },
    definition: {
      popup: `${utility("Background/Neutral/1")} ${utility("Border/Neutral/2")}`,
      option: `${utility("Text/Neutral/1")} data-[selected]:${utility("Text/Brand/1")} data-[disabled]:${utility("Text/Neutral/6")}`,
      active: `data-[highlighted]:${utility("Fill/Neutral/Alpha/6")}`,
      indicator: `${utility("Icon/Brand/1")} group-data-[disabled]/option:${utility("Icon/Neutral/5")}`,
    },
    surface: use("Background/Neutral/1", "surface", "tag-select-popup"),
    boundary: use("Border/Neutral/2", "decorative", "tag-select-popup-edge"), recipes,
  }];
  const colorCssConsumers = [
    [".tag-management__popup", "background", "Background/Neutral/1", "surface"],
    [".tag-management__popup", "color", "Text/Neutral/1", "text"],
    [".tag-management__popup", "border", "Border/Neutral/2", "decorative"],
    [".tag-management__help, .tag-management__status", "color", "Text/Neutral/3", "text"],
  ].map(([selector, property, tokenId, content]) => ({
    filePath: "apps/playground/src/docs/components/tag-page.css", selector, property, scope: '[data-rain-id="tag-management-recipe"]', parentSurfaces,
    value: `${property === "border" ? "var(--rain-line-thickness-1) solid " : ""}var(${colorTokenOutputs.find((entry) => entry.id === tokenId).variable})`,
    use: { ...use(tokenId, content, "tag-management-page"), context: "local-recipe" },
  }));
  return { colorRecipeConsumers, colorCssConsumers };
}

export function getTagDomainColorConsumers() {
  const filePath = "packages/ui/src/tag/domain-tags.styles.ts", evidenceRef = "docs/plans/2026-09-09-tag-batch-two-implementation.md";
  const parentSurfaces = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];
  const use = (tokenId, role, content, recipeId) => ({ tokenId, role, property: role === "fill" ? "background-color" : role === "border" ? "border-color" : "color",
    content, context: "component-recipe", recipeId, evidenceRef, interaction: "non-interactive", critical: true,
    ...(tokenId.startsWith("OnColor/") ? { onColor: true } : {}), brandIntent: "selected" });
  const pair = (id, background, foreground, role = "text", content = "text") => ({ id, state: "static",
    background: use(background, "fill", "surface", id), foreground: use(foreground, role, content, id) });
  const definition = {
    进行中: { filled: "bg-rain-category-fill-tagongoing-alpha-1 text-rain-category-text-tagongoing-1", solid: "bg-rain-category-fill-tagongoing-solid-1 text-rain-category-oncolor-tagongoing-1", dot: "text-rain-category-icon-tagongoing-1" },
    未提交: { filled: "bg-rain-category-fill-tagunsubmitted-alpha-1 text-rain-category-text-tagunsubmitted-1", solid: "bg-rain-category-fill-tagunsubmitted-solid-1 text-rain-category-oncolor-1" },
    已结束: { filled: "bg-rain-category-fill-tagended-1 text-rain-category-text-tagended-1", solid: "bg-rain-category-fill-tagslate-solid-1 text-rain-category-oncolor-1" },
  };
  const statusRecipes = [
    pair("tag-domain-ongoing-filled", "Fill/TagOngoing/Alpha/1", "Text/TagOngoing/1"), pair("tag-domain-ongoing-solid", "Fill/TagOngoing/Solid/1", "OnColor/TagOngoing/1"),
    pair("tag-domain-unsubmitted-filled", "Fill/TagUnsubmitted/Alpha/1", "Text/TagUnsubmitted/1"), pair("tag-domain-unsubmitted-solid", "Fill/TagUnsubmitted/Solid/1", "OnColor/1"),
    pair("tag-domain-ended-filled", "Fill/TagEnded/1", "Text/TagEnded/1"), pair("tag-domain-ended-solid", "Fill/TagSlate/Solid/1", "OnColor/1"),
    pair("tag-domain-ongoing-dot-filled", "Fill/TagOngoing/Alpha/1", "Icon/TagOngoing/1", "icon", "meaningful-icon"),
    pair("tag-domain-ongoing-dot-solid", "Fill/TagOngoing/Solid/1", "OnColor/TagOngoing/1", "icon", "meaningful-icon"),
  ];
  const domainRecipes = [pair("tag-domain-batch", "Fill/TagBatch/Solid/1", "OnColor/1"),
    // The reminder is a red icon surrounded by its independent white ring, not a text foreground on the Tag body.
    { id: "tag-domain-reminder", state: "static", foreground: use("Icon/TagReminder/1", "icon", "meaningful-icon", "tag-domain-reminder"), adjacentPaint: use("Border/TagReminder/1", "border", "decorative", "tag-domain-reminder") },
    ...Object.entries(tagColorProfiles).map(([name, { family }]) => pair(`tag-domain-score-badge-${name}`, `Fill/${family}/Solid/1`, "OnColor/1")),
    ...Object.entries(tagColorProfiles).map(([name, { family }]) => ({ ...pair(`tag-domain-score-badge-${name}-solid`, `Fill/${family}/Solid/1`, "OnColor/1"), overlay: { ...tagScoreBadgeColorRecipe } })),
  ];
  // Ordinary domain labels and markers consume the same registered surface dictionary; only static paint applies.
  for (const [name, { family }] of Object.entries(tagColorProfiles)) for (const appearance of ["filled", "outlined", "solid"]) {
    const id = `tag-domain-${name}-${appearance}`;
    domainRecipes.push({ id, state: "static", background: appearance === "outlined" ? null : use(`Fill/${family}/${appearance === "solid" ? "Solid" : "Alpha"}/1`, "fill", "surface", id),
      foreground: use(appearance === "solid" ? "OnColor/1" : `Text/${family}/1`, "text", "text", id),
      ...(appearance === "outlined" ? { boundary: use(`Border/${family}/1`, "border", "essential-boundary", id) } : {}),
    });
  }
  return [
    { symbol: "tagStatusPaints", definition, recipes: statusRecipes },
    { symbol: "tagDomainPaints", definition: { batch: "bg-rain-category-fill-tagbatch-solid-1 text-rain-category-oncolor-1", reminder: "text-rain-category-icon-tagreminder-1 border-rain-category-border-tagreminder-1", badge: "text-rain-category-oncolor-1", solidBadge: "bg-rain-tag-score-badge" }, recipes: domainRecipes },
  ].map((entry) => ({ filePath, scope: "[data-rain-id^=ui-][data-slot=root]", kind: "static", refinement: "tag-batch-two", foregroundContent: "text-and-meaningful-icon", contrastReview: "declared-review", parentSurfaces, ...entry }));
}

/** Measure the actual adjacent paint, including the score plate over its opaque Solid body. */
export function measureTagDomainColorRecipe(recipe, theme, parent) {
  const validate = (use, surface = parent) => {
    try { validateColorUse({ ...use, theme, parentSurfaceId: surface, ...(surface !== parent ? { parentBackgroundId: parent } : {}) }); }
    catch (error) { if (!/^Insufficient contrast:/.test(error.message)) throw error; }
  };
  if (recipe.background) validate(recipe.background);
  const surface = recipe.background?.tokenId ?? parent;
  validate(recipe.foreground, surface);
  let background = resolveColorSurface(surface, theme, surface !== parent ? parent : undefined);
  if (recipe.overlay) {
    const { value } = validateColorUse({ ...recipe.overlay, theme, parentSurfaceId: surface, parentBackgroundId: parent });
    background = { rgb: value.rgb.map((channel, i) => channel * value.alpha + background.rgb[i] * (1 - value.alpha)), alpha: 1 };
  }
  const checks = [];
  if (recipe.adjacentPaint) {
    validate(recipe.adjacentPaint);
    checks.push({ part: "reminder-dot", use: recipe.foreground, actual: measureColorContrast(resolveColor(recipe.foreground.tokenId, theme), resolveColor(recipe.adjacentPaint.tokenId, theme)), adjacentTokenId: recipe.adjacentPaint.tokenId });
  } else checks.push({ part: "foreground", use: recipe.foreground, actual: measureColorContrast(resolveColor(recipe.foreground.tokenId, theme), background) });
  if (recipe.boundary) { validate(recipe.boundary); checks.push({ part: "boundary", use: recipe.boundary, actual: measureColorContrast(resolveColor(recipe.boundary.tokenId, theme), resolveColor(parent, theme)) }); }
  return checks.map((check) => ({ ...check, minimum: check.use.content === "text" ? 4.5 : check.use.content === "meaningful-icon" || check.use.content === "essential-boundary" ? 3 : 0 }));
}

/** Tag-only paint stack: isolated multiply, close's normal overlay, then group opacity on a known opaque page. */
export function measureTagColorRecipe(recipe, theme, parentId, state = "default") {
  if (!recipe.states.includes(state) || !["light", "dark"].includes(theme)
    || !["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"].includes(parentId)) throw new Error("Unknown Tag paint state, theme or parent");
  const parent = resolveColor(parentId, theme), transparent = { rgb: [0, 0, 0], alpha: 0 };
  const over = (top, bottom, multiply = false) => {
    const alpha = Math.min(1, top.alpha + bottom.alpha * (1 - top.alpha));
    return { rgb: top.rgb.map((channel, i) => alpha ? Math.min(255, Math.max(0, (top.alpha * channel * (multiply ? 1 - bottom.alpha + bottom.alpha * bottom.rgb[i] / 255 : 1)
      + bottom.alpha * bottom.rgb[i] * (1 - top.alpha)) / alpha)) : 0), alpha };
  };
  const check = (use, parentSurfaceId = parentId) => {
    if (!use) return;
    try { validateColorUse({ ...use, theme, parentSurfaceId, ...(parentSurfaceId !== parentId ? { parentBackgroundId: parentId } : {}) }); }
    catch (error) { if (!/^Insufficient contrast:/.test(error.message)) throw error; }
  };
  check(recipe.background); check(recipe.foreground, recipe.background?.tokenId ?? parentId); check(recipe.icon, recipe.background?.tokenId ?? parentId);
  check(recipe.selectionIcon, recipe.background?.tokenId ?? parentId);
  check(recipe.boundary); check(recipe.overlay); recipe.closeBackgrounds.forEach((paint) => check(paint));
  let background = recipe.background ? resolveColor(recipe.background.tokenId, theme) : transparent;
  const borderBackground = background; // inset-0 children paint inside the padding box, below the unchanged border.
  if (state === "hover" || state === "pressed") {
    const overlay = resolveColor(recipe.overlay.tokenId, theme);
    background = over({ ...overlay, alpha: overlay.alpha * recipe.multiply[state] }, background, true);
  }
  if (state === "close-hover" || state === "close-pressed") background = over(resolveColor(recipe.closeBackgrounds[state === "close-hover" ? 0 : 1].tokenId, theme), background);
  const opacity = state === "disabled" ? recipe.opacity : 1;
  const flatten = (paint) => over({ ...paint, alpha: paint.alpha * opacity }, parent);
  const paintedBackground = flatten(background);
  const foreground = flatten(over(resolveColor(recipe.foreground.tokenId, theme), background));
  const icon = flatten(over(resolveColor(recipe.icon.tokenId, theme), background));
  const selectionIcon = flatten(over({ ...resolveColor(recipe.selectionIcon.tokenId, theme), alpha: recipe.selectionIcon.alpha / 100 }, background));
  const boundary = recipe.boundary ? flatten(over(resolveColor(recipe.boundary.tokenId, theme), borderBackground)) : null;
  return { background: paintedBackground, foreground, icon, selectionIcon, boundary, opacity,
    textContrast: measureColorContrast(foreground, paintedBackground), iconContrast: measureColorContrast(icon, paintedBackground),
    selectionIconContrast: measureColorContrast(selectionIcon, paintedBackground),
    boundaryContrast: boundary ? measureColorContrast(boundary, parent) : null,
  };
}

// One reviewed paint matrix for the shared Input/Select frame and their child parts.
function fieldColorStates() {
  const surfaces = {
    outlined: { default: ["Fill/Neutral/Solid/7", "Border/Neutral/2"], hover: ["Fill/Neutral/Solid/7", "Border/Neutral/1"], editing: ["Fill/Brand/Alpha/4", "Border/Brand/1"], readonly: ["Fill/Neutral/Solid/7", "Border/Neutral/2"], "readonly-focus": ["Fill/Neutral/Solid/7", "Border/Neutral/1"] },
    filled: { default: ["Fill/Neutral/Solid/6", null], hover: ["Fill/Neutral/Solid/5", null], editing: ["Fill/Neutral/Solid/6", "Border/Brand/1"], readonly: ["Fill/Neutral/Solid/6", null], "readonly-focus": ["Fill/Neutral/Solid/6", "Border/Neutral/1"] },
    underlined: { default: [null, "Border/Neutral/2"], hover: ["Fill/Neutral/Alpha/6", "Border/Neutral/1"], editing: ["Fill/Brand/Alpha/4", "Border/Brand/1"], readonly: [null, "Border/Neutral/2"], "readonly-focus": [null, "Border/Neutral/1"] },
  };
  return Object.entries(surfaces).flatMap(([appearance, normal]) => Object.entries({ ...normal,
    warning: [appearance === "underlined" ? "Fill/Orange/Alpha/2" : "Fill/Orange/Solid/3", "Border/Orange/1"],
    error: [appearance === "underlined" ? "Fill/Red/Alpha/2" : "Fill/Red/Solid/3", "Border/Red/1"],
    disabled: ["Fill/Neutral/Solid/5", appearance === "filled" ? null : "Border/Neutral/3"],
  }).map(([state, [background, border]]) => ({ appearance, state, background, border })));
}

/** Static review snapshots below are compared with live source, never imported from it during verification. */
export function getSelectColorConsumers() {
  const parentSurfaces = ["Background/Neutral/1", "Background/Neutral/3"];
  const evidenceRef = "docs/plans/2026-09-08-input-select-field-recipes-design.md";
  const use = (tokenId, content, recipeId) => ({ tokenId, role: tokenId.split("/")[0].toLowerCase(),
    property: /^(Fill|Background)\//.test(tokenId) ? "background-color" : tokenId.startsWith("Border/") ? "border-color" : "color",
    content, context: "component-recipe", recipeId, evidenceRef, brandIntent: "active", interaction: "interactive", critical: true });
  const states = fieldColorStates();
  const paint = (id, state, token, content, layers, appearance) => ({ id, state, appearance,
    foreground: use(token, state === "disabled" ? "disabled" : content, id), layers: layers.filter(Boolean).map((tokenId) => use(tokenId, "surface", id)) });
  const across = (part, token, content, disabledToken, extra = []) => states.filter(({ state }) => disabledToken || !["disabled", "readonly", "readonly-focus"].includes(state)).map(({ state, appearance, background }) =>
    paint("select-" + part + "-" + appearance + "-" + state, state, state === "disabled" ? disabledToken : token, content, [background, ...extra], appearance));
  const definition = {
  "variants": {
    "size": {
      "24": "px-rain-8 rounded-rain-4 rain-type-ui-compact",
      "28": "px-rain-12 rounded-rain-6 rain-type-ui-default",
      "32": "px-rain-12 rounded-rain-6 rain-type-ui-default",
      "36": "px-rain-12 rounded-rain-6 rain-type-ui-default"
    },
    "appearance": {
      "outlined": "bg-rain-category-fill-neutral-solid-7 border-rain-category-border-neutral-2",
      "filled": "bg-rain-category-fill-neutral-solid-6 border-transparent",
      "underlined": "bg-transparent border-rain-category-border-neutral-2"
    },
    "status": {
      "default": null,
      "warning": "bg-rain-category-fill-orange-solid-3 border-rain-category-border-orange-1",
      "error": "bg-rain-category-fill-red-solid-3 border-rain-category-border-red-1"
    },
    "state": {
      "editable": "text-rain-category-text-neutral-1",
      "readonly": "text-rain-category-text-neutral-1",
      "disabled": "cursor-not-allowed text-rain-category-text-neutral-6"
    }
  },
  "compoundVariants": [
    {
      "state": "editable",
      "status": "default",
      "appearance": "outlined",
      "class": "hover:border-rain-category-border-neutral-1 has-[:focus]:border-rain-category-border-brand-1 has-[:focus]:bg-rain-category-fill-brand-alpha-4 data-[open=true]:border-rain-category-border-brand-1 data-[open=true]:bg-rain-category-fill-brand-alpha-4"
    },
    {
      "state": "editable",
      "status": "default",
      "appearance": "filled",
      "class": "hover:bg-rain-category-fill-neutral-solid-5 has-[:focus]:border-rain-category-border-brand-1 has-[:focus]:bg-rain-category-fill-neutral-solid-6 data-[open=true]:border-rain-category-border-brand-1 data-[open=true]:bg-rain-category-fill-neutral-solid-6"
    },
    {
      "state": "editable",
      "status": "default",
      "appearance": "underlined",
      "class": "hover:bg-rain-category-fill-neutral-alpha-6 hover:border-rain-category-border-neutral-1 has-[:focus]:border-rain-category-border-brand-1 has-[:focus]:bg-rain-category-fill-brand-alpha-4 data-[open=true]:border-rain-category-border-brand-1 data-[open=true]:bg-rain-category-fill-brand-alpha-4"
    },
    {
      "appearance": "underlined",
      "status": "warning",
      "class": "bg-rain-category-fill-orange-alpha-2"
    },
    {
      "appearance": "underlined",
      "status": "error",
      "class": "bg-rain-category-fill-red-alpha-2"
    },
    {
      "state": "disabled",
      "class": "bg-rain-category-fill-neutral-solid-5 border-rain-category-border-neutral-3"
    },
    {
      "state": "disabled",
      "appearance": "filled",
      "class": "border-transparent"
    }
  ],
  "defaultVariants": {
    "appearance": "outlined"
  }
};
  const styleDefinitions = {
  "selectPlaceholderClassName": "truncate text-rain-category-text-neutral-5 group-data-[permission=disabled]/select:text-rain-category-text-neutral-6",
  "selectCountClassName": "flex-none text-rain-category-text-neutral-3 group-data-[permission=disabled]/select:text-rain-category-text-neutral-6",
  "selectArrowColors": "text-rain-category-icon-neutral-4 group-data-[permission=disabled]/select:text-rain-category-icon-neutral-5",
  "selectClearColors": "text-rain-category-icon-neutral-3 hover:text-rain-category-icon-neutral-2 active:text-rain-category-icon-neutral-1",
  "selectValueColors": "bg-rain-category-fill-neutral-alpha-4 text-rain-category-text-neutral-1 group-data-[permission=disabled]/select:text-rain-category-text-neutral-6",
  "selectRemoveColors": "text-rain-category-icon-neutral-2 hover:text-rain-category-icon-neutral-1 hover:bg-rain-category-fill-neutral-alpha-5 active:bg-rain-category-fill-neutral-alpha-4",
  "selectIndicatorClassName": "text-rain-category-icon-brand-1",
  "selectSecondaryClassName": "text-rain-category-text-neutral-3"
};
  const consumer = (symbol, foregroundContent, recipes) => ({ filePath: "packages/ui/src/select/select.styles.ts", symbol, kind: "static", definition: styleDefinitions[symbol],
    scope: ["selectSecondaryClassName", "selectIndicatorClassName"].includes(symbol) ? '[data-rain-id="ui-select-popup"]' : '[data-rain-id="ui-select"]', foregroundContent, recipes, parentSurfaces, contrastReview: "pending-review" });
  const rootRecipes = states.map(({ appearance, state, background, border }) => {
    const id = "field-" + appearance + "-" + state;
    return { ...paint(id, state, state === "disabled" ? "Text/Neutral/6" : "Text/Neutral/1", "text", [background], appearance),
      boundary: border ? use(border, state === "disabled" ? "disabled" : "essential-boundary", id) : null };
  });
  const panel = (id, token, layers = ["Background/Neutral/1"], state = "default") => paint("select-" + id, state, token, "text", layers);
  const colorRecipeConsumers = [
    { filePath: "packages/ui/src/field/field.styles.ts", symbol: "fieldFrameRecipe", kind: "cva", definition, scope: ".rain-field-frame", components: ["ui-input", "ui-select"], foregroundContent: "text", recipes: rootRecipes, parentSurfaces, contrastReview: "pending-review" },
    consumer("selectPlaceholderClassName", "text", across("placeholder", "Text/Neutral/5", "text", "Text/Neutral/6")),
    consumer("selectCountClassName", "text", across("count", "Text/Neutral/3", "text", "Text/Neutral/6")),
    consumer("selectArrowColors", "meaningful-icon", across("arrow", "Icon/Neutral/4", "meaningful-icon", "Icon/Neutral/5")),
    consumer("selectClearColors", "meaningful-icon", ["Icon/Neutral/3", "Icon/Neutral/2", "Icon/Neutral/1"].flatMap((token, index) => across("clear-" + index, token, "meaningful-icon"))),
    consumer("selectValueColors", "text", across("tag", "Text/Neutral/1", "text", "Text/Neutral/6", ["Fill/Neutral/Alpha/4"])),
    consumer("selectRemoveColors", "meaningful-icon", [null, "Fill/Neutral/Alpha/5", "Fill/Neutral/Alpha/4"].flatMap((overlay, index) => across("remove-" + index, index ? "Icon/Neutral/1" : "Icon/Neutral/2", "meaningful-icon", undefined, ["Fill/Neutral/Alpha/4", overlay]))),
    consumer("selectIndicatorClassName", "meaningful-icon", [paint("select-indicator", "selected", "Icon/Brand/1", "meaningful-icon", ["Background/Neutral/1"])]),
    consumer("selectSecondaryClassName", "text", [panel("secondary", "Text/Neutral/3")]),
  ];
  const colorCssConsumers = [];
  for (const [selector, property, tokenId] of [
    [".select-page", "background", "Background/Neutral/3"], [".select-page", "color", "Text/Neutral/1"],
    [".select-page__surface", "color", "Text/Neutral/1"], ['.select-page__surface[data-parent="1"]', "background", "Background/Neutral/1"], ['.select-page__surface[data-parent="3"]', "background", "Background/Neutral/3"],
  ]) colorCssConsumers.push({ filePath: "apps/playground/src/docs/components/select-page.css", selector, property, value: "var(" + colorTokenOutputs.find((entry) => entry.id === tokenId).variable + ")", scope: ".select-page", parentSurfaces,
    use: { ...use(tokenId, property === "color" ? "text" : "surface", "select-page"), context: "local-recipe" } });
  for (const [state, family, halo] of [["default", "Brand", 3], ["warning", "Orange", 1], ["error", "Red", 1]]) {
    const selector = state === "default" ? ".rain-field-frame" : '.rain-field-frame[data-status="' + state + '"]';
    for (const [property, tokenId, content] of [["--rain-field-focus-line", "Border/" + family + "/1", "essential-boundary"], ["--rain-field-focus-halo", "Fill/" + family + "/Alpha/" + halo, "surface"], ["--rain-field-readonly-line", "Border/" + (state === "default" ? "Neutral" : family) + "/1", "essential-boundary"]]) {
      const focusUse = use(tokenId, content, "field-focus-" + state + (property.includes("readonly") ? "-readonly" : property.includes("halo") ? "-halo" : "-line"));
      const focusPairs = property === "--rain-field-focus-line" ? states.filter((entry) => entry.state === (state === "default" ? "editing" : state)).flatMap(({ appearance, background }) =>
        [["field", []], ["clear", [background]], ["tag-remove", [background, "Fill/Neutral/Alpha/4"]]].flatMap(([part, layers]) =>
          [false, true].filter((withHalo) => !(appearance === "underlined" && part === "field" && withHalo)).map((withHalo) => ({ id: focusUse.recipeId, state, appearance, part: part + (withHalo ? "-halo" : "-host"), foreground: focusUse,
            layers: [...layers, ...(withHalo ? ["Fill/" + family + "/Alpha/" + halo] : [])].filter(Boolean).map((id) => use(id, "surface", focusUse.recipeId)) })))) : [];
      colorCssConsumers.push({ filePath: "packages/ui/src/styles.css", selector, property, value: "var(" + colorTokenOutputs.find((entry) => entry.id === tokenId).variable + ")", scope: ".rain-field-frame", parentSurfaces,
        use: focusUse, focusPairs, contrastReview: "pending-review" });
    }
  }
  return { colorRecipeConsumers, colorCssConsumers };
}

/** Select has an explicit, small paint stack: page, field, selected value, optional remove-action feedback. */
export function measureSelectColorRecipe(recipe, theme, parentId) {
  const parent = resolveColor(parentId, theme);
  if (parent.alpha !== 1 || recipe.layers.length > 3) throw new Error("Select requires an opaque parent and at most three declared surface layers");
  const over = (top, bottom) => ({ rgb: top.rgb.map((channel, index) => channel * top.alpha + bottom.rgb[index] * (1 - top.alpha)), alpha: 1 });
  const surface = recipe.layers.reduce((background, layer) => over(resolveColor(layer.tokenId, theme), background), parent);
  const boundary = recipe.boundary ? over(resolveColor(recipe.boundary.tokenId, theme), surface) : null;
  return { surface, textContrast: measureColorContrast(resolveColor(recipe.foreground.tokenId, theme), surface),
    boundaryInnerContrast: boundary ? measureColorContrast(boundary, surface) : null,
    boundaryOuterContrast: boundary ? measureColorContrast(boundary, parent) : null };
}
