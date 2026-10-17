import { tooltipTokens, tooltipTokenSource } from "../packages/foundations/src/tooltip-token-contract.ts";
import { tabsSizeTokens, tabsTwoLineSizeTokens, tabsSizeRecipes, tabsAppearanceRecipes, tabsGeometry } from "../packages/foundations/src/tabs-token-contract.ts";
import { inputSizeTokens, inputClearSizeToken } from "../packages/foundations/src/input-token-contract.ts";
import { selectSizeTokens, selectValueHeightTokens, selectActionSizeToken, selectTouchTargetSizeToken } from "../packages/foundations/src/select-token-contract.ts";
import { tagSizeTokens, tagSizeRecipes, tagColorSource, tagSystemProfiles, tagStateTokens, tagSelectionMarkColorRecipe, tagShapeRecipes, tagDetailTokens, learningUnitTagProfiles, groupTypeTagProfiles, learningUnitMarkTypes } from "../packages/foundations/src/tag-token-contract.ts";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getTokenFoundationOutputs, renderDeclarations, renderUtilities } from "./token-foundation-outputs.mjs";
import { colorRegistry, colorCategoryProfiles, colorAlphaValues, colorTokenOutputs, localColorRecipe, localColorRecipeOutput, colorDiscovery } from "../packages/foundations/src/color-registry.ts";
import { semanticColorCategoryIds, semanticColorAliases, semanticColorRoleAliases } from "../packages/foundations/src/token-contract.ts";
import { iconSizeTokenEntries, iconButtonControlSizeTokens, iconButtonComponentTokenAliases } from "../packages/foundations/src/icon-size-contract.ts";
import { overlayColors, overlayTokenSource, dialogWidths, dialogGeometryTokens } from "../packages/foundations/src/overlay-token-contract.ts";

function generatedSection(source, id, body, insert = (text, section) => `${text.trimEnd()}\n\n${section}\n`) {
  const start = `/* token-foundations-v1:${id}:start — generated; edit the Token contract */`;
  const end = `/* token-foundations-v1:${id}:end */`;
  const section = `${start}\n${body}\n${end}`;
  const first = source.indexOf(start);
  const last = source.indexOf(end, first);
  if (first >= 0 && (last < 0 || source.indexOf(start, first + 1) >= 0)) throw new Error(`Malformed generated section: ${id}`);
  const outside = (first < 0 ? source : source.slice(0, first) + source.slice(last + end.length)).replace(/\/\*[\s\S]*?\*\//g, "");
  const managedNames = [...body.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((match) => match[1]);
  for (const name of new Set(managedNames)) {
    if (new RegExp(`(?:^|[;{])\\s*${name}\\s*:`).test(outside)) throw new Error(`${name} is declared outside its generated section`);
  }
  for (const match of body.matchAll(/@utility\s+([a-z0-9-]+)\s*\{/g)) {
    if (new RegExp(`@utility\\s+${match[1]}\\s*\\{`).test(outside)) throw new Error(`${match[1]} is declared outside its generated section`);
  }
  if (first < 0) return insert(source, section);
  return source.slice(0, first) + section + source.slice(last + end.length);
}

export function getGeneratedTokenFiles(root = process.cwd()) {
  const outputs = getTokenFoundationOutputs();
  const read = (path) => readFileSync(join(root, path), "utf8");
  const tokensPath = "packages/foundations/src/tokens.css";
  const typePath = "packages/foundations/src/typography.css";
  const themePath = "packages/foundations/src/tailwind-theme.css";
  let tokens = read(tokensPath);
  let theme = read(themePath);
  if (!tokens.includes("token-foundations-v1:values:start")) {
    tokens = tokens.replace(/^  --rain-(?:space-\d+|radius-(?:\d+|full)):[^;]+;\r?\n/gm, "");
  }
  if (!theme.includes("token-foundations-v1:theme:start")) {
    theme = theme.replace(/^  --(?:spacing-rain-\d+|radius-rain-(?:\d+|full)):[^;]+;\r?\n/gm, "");
  }
  theme = generatedSection(theme, "theme", renderDeclarations(outputs.themeVariables), (source, section) => {
    if (!source.includes("@theme inline {\n")) throw new Error("Expected existing inline Rain theme");
    return source.replace("@theme inline {\n", `@theme inline {\n${section}\n`);
  });
  theme = generatedSection(theme, "icon-size-sources", outputs.iconSizeSourceDirective);
  theme = generatedSection(theme, "input-sources", outputs.inputSourceDirective);
  theme = generatedSection(theme, "tag-sources", outputs.tagSourceDirective);
  theme = generatedSection(theme, "select-sources", outputs.selectSourceDirective);
  theme = generatedSection(theme, "tabs-sources", outputs.tabsSourceDirective);
  return {
    [tokensPath]: generatedSection(tokens, "values", `:root {\n${renderDeclarations(outputs.variables)}\n}\n\n${Object.entries(outputs.colorThemes).map(([mode, values]) => `[data-rain-theme="${mode}"] {\n${renderDeclarations(values)}\n}`).join("\n\n")}`),
    [typePath]: generatedSection(read(typePath), "typography", `:root {\n${renderDeclarations(outputs.typographyVariables)}\n}`),
    [themePath]: generatedSection(theme, "utilities", renderUtilities(outputs.utilities)),
    "apps/playground/src/docs/token-foundations/token-foundations.css": generatedSection(
      (() => { try { return read("apps/playground/src/docs/token-foundations/token-foundations.css"); } catch { return ""; } })(),
      "scoped-color", outputs.scopedCss,
    ),
    "apps/playground/src/docs/token-foundations/token-classes.generated.ts":
      `// Generated by generate:tokens. Values and classes come from the Token contracts.\nexport const tokenClassNames = ${JSON.stringify(outputs.classNames, null, 2)} as const;\n`,
    "manifests/contracts/token-foundations-v1.json": `${JSON.stringify({
      schemaVersion: "1.0", id: "token-foundations-v1", assetIdentity: "registry-candidate",
      publication: "not-authorized", supportedThemes: ["light", "dark"], themeScope: "category-color-tokens",
      sourcePaths: ["packages/foundations/src/tooltip-token-contract.ts", "packages/foundations/src/overlay-token-contract.ts", "packages/foundations/src/token-contract.ts", "packages/foundations/src/button-token-contract.ts", "packages/foundations/src/composition-contract.ts", "packages/foundations/src/icon-size-contract.ts", "packages/foundations/src/input-token-contract.ts", "packages/foundations/src/select-token-contract.ts", "packages/foundations/src/tabs-token-contract.ts", "packages/foundations/src/color-registry.ts", "packages/foundations/src/typography-contract.ts", "evidence/runtime/color-dark-theme/confirmed-input.json", "docs/plans/2026-09-06-color-dark-theme.md", "packages/foundations/src/tag-token-contract.ts", tagColorSource],
      consumerPaths: ["apps/playground/src/docs/token-foundations/", "packages/ui/src/button/button.styles.ts", "packages/ui/src/button/button.tsx", "apps/playground/src/docs/components/button-token-review.tsx", ...new Set([...outputs.colorRecipeConsumers, ...outputs.colorCssConsumers].map((entry) => entry.filePath))],
      defaultConsumption: "complete-recipe-first", utilities: outputs.utilities,
      colorConsumers: outputs.colorConsumers, displayConsumers: outputs.displayConsumers,
      buttonColorRecipes: outputs.buttonColorRecipes,
      tooltip: { source: tooltipTokenSource, contract: "packages/foundations/src/tooltip-token-contract.ts", tokens: tooltipTokens, scope: "fixed-classic-surface", consumer: "packages/ui/src/tooltip/tooltip.css", contrastAcceptance: "not-granted" },
      overlay: { source: overlayTokenSource, contract: "packages/foundations/src/overlay-token-contract.ts", none: "no-painted-backdrop", colors: overlayColors,
        cssConsumers: Object.keys(overlayColors).map(name => ({ filePath: "packages/ui/src/dialog/dialog.css", selector: `.rain-dialog-backdrop[data-mask="${name}"]`, property: "background-color", value: `var(--rain-overlay-${name})` })),
        dialogWidths, dialogGeometryTokens, contrastAcceptance: "not-granted" },
      colorRecipeConsumers: outputs.colorRecipeConsumers, colorCssConsumers: outputs.colorCssConsumers,
      color: { supportedThemes: ["light", "dark"], existingComponentMigration: "semantic-aliases-and-button-recipes",
        semanticAlignment: { categoryIds: semanticColorCategoryIds, aliases: semanticColorAliases, roleAliases: semanticColorRoleAliases,
          componentDarkValidation: "not-included", accessibility: "open-placeholder-and-consumer-eligibility" },
        themeAttribute: "data-rain-theme", defaultTheme: "light", records: colorRegistry, profiles: colorCategoryProfiles, alpha: colorAlphaValues, outputs: colorTokenOutputs,
        localRecipe: localColorRecipe, localOutput: localColorRecipeOutput, discovery: colorDiscovery },
      line: { scope: "content-divider-local-recipe", focusMigration: false },
      iconSize: { scope: "public-square-icon-host", glyphSuitability: "independent", existingComponentMigration: "not-included",
        microSizes: iconSizeTokenEntries.filter(([, token]) => token.range === "micro").map(([name]) => name),
        mainSizes: iconSizeTokenEntries.filter(([, token]) => token.range === "main").map(([name]) => name),
        records: iconSizeTokenEntries.map(([, token]) => token), utilityPrefix: "size-rain-icon-",
        tailwindSourceDirective: outputs.iconSizeSourceDirective, playgroundScanDependency: false,
        allowedProperties: ["width", "height"], forbiddenUses: ["spacing", "typography", "click-target-size", "glyph-suitability-claim"] },
      input: { scope: "component-specific", heights: inputSizeTokens, clearSize: inputClearSizeToken, tailwindSourceDirective: outputs.inputSourceDirective, legacyBridge: "compatibility-only" },
      select: { scope: "component-specific", heights: selectSizeTokens, valueHeights: selectValueHeightTokens, actionSize: selectActionSizeToken, touchTargetSize: selectTouchTargetSizeToken, tailwindSourceDirective: outputs.selectSourceDirective, sharedFieldSource: "input-height-aliases", menuLayer: "placeholder" },
      tag: { scope: "tag-batch-two", shapes: tagShapeRecipes, details: tagDetailTokens, learningUnits: learningUnitTagProfiles, groups: groupTypeTagProfiles, markTypes: learningUnitMarkTypes, heights: tagSizeTokens, sizes: tagSizeRecipes, actionSizing: "square-from-tag-inner-height", selectionMark: tagSelectionMarkColorRecipe, states: tagStateTokens, systemProfiles: tagSystemProfiles, source: tagColorSource, tailwindSourceDirective: outputs.tagSourceDirective, solidTypography: { fontRole: "ui", fontWeight: 700, context: "tag-solid-label" }, contrastAcceptance: "not-granted" },
      tabs: { scope: "component-specific", heights: tabsSizeTokens, twoLineHeights: tabsTwoLineSizeTokens, sizes: tabsSizeRecipes, appearances: tabsAppearanceRecipes, geometry: tabsGeometry, tailwindSourceDirective: outputs.tabsSourceDirective, defaultConsumption: "complete-recipe-first", contrastAcceptance: "not-granted" },
      iconButton: { scope: "component-specific", controls: iconButtonControlSizeTokens, aliases: iconButtonComponentTokenAliases },
      localRecipe: { id: "line-v1-content-divider", scope: "feature", origin: "line-foundation-v1",
        modifiedParts: ["divider"], candidateTokens: [], promotionStatus: "not-proposed",
        classes: { divider: "h-rain-line-1 w-full flex-none bg-rain-border-subtle" } },
    }, null, 2)}\n`,
  };
}

export function generateTokenFoundations({ root = process.cwd(), check = false } = {}) {
  const files = getGeneratedTokenFiles(root);
  const stale = [];
  for (const [path, expected] of Object.entries(files)) {
    if (check) {
      let actual;
      try { actual = readFileSync(join(root, path), "utf8"); } catch { /* Missing is a stale output. */ }
      if (actual !== expected) stale.push(path);
    } else {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), expected);
    }
  }
  return stale;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const stale = generateTokenFoundations({ check: process.argv.includes("--check") });
  if (stale.length) { console.error(`Stale Token outputs:\n${stale.join("\n")}`); process.exitCode = 1; }
  else console.log("Token Foundations outputs are consistent.");
}
