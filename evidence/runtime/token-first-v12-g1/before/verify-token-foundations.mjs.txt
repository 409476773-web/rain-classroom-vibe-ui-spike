import { getInputNumberColorConsumers, prepareInputNumberSource } from "./input-number.mjs";
import { hasInputNumberAuthorization } from "./verification-helpers.mjs";
import { hasGenerationQualityAuthorization, hasM2Authorization, hasDialogRefinementAuthorization } from "./verification-helpers.mjs";
import { hasAvatarFamilyAuthorization } from "./verification-helpers.mjs";
import { getAvatarColorConsumers, prepareAvatarSource } from "./avatar-family.mjs";
import { overlayColors } from "../packages/foundations/src/overlay-token-contract.ts";
import { hasBmBRn10Authorization } from "./verification-helpers.mjs";
import { getBmBColorConsumers } from "./token-foundation-outputs.mjs";
import { getPaginationColorConsumers, paginationColorSourcePaths } from "./pagination-color-consumers.mjs";
import { hasEmptyRefinementAuthorization, hasInsideFieldLabelsAuthorization, hasTableVisualRefinementAuthorization, hasTablePaginationReplacementAuthorization, hasTableRn08Authorization } from "./verification-helpers.mjs";
import { getEmptyColorConsumers, getTableRn08ColorConsumers } from "./token-foundation-outputs.mjs";
import { hasLayoutsV1Authorization, hasDialogV2Authorization } from "./verification-helpers.mjs";
import { getLayoutsColorConsumers, getDialogColorConsumers } from "./token-foundation-outputs.mjs";
import { hasCardV2Authorization } from "./verification-helpers.mjs";
import { getCardColorConsumers } from "./token-foundation-outputs.mjs";
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseSync } from "vite";
import { colorRegistry, colorCategoryProfiles, colorTokenOutputs, colorToCss, validateColorUse, resolveColor, resolveColorSurface, measureColorContrast } from "../packages/foundations/src/color-registry.ts";
import { semanticColorTokens } from "../packages/foundations/src/token-contract.ts";
import { compositionSpaceTokens } from "../packages/foundations/src/composition-contract.ts";
import { validateButtonColorRecipe } from "../packages/foundations/src/button-token-contract.ts";
import { generateTokenFoundations } from "./generate-token-foundations.mjs";
import { getTokenFoundationOutputs, getInputColorConsumers, getTagColorConsumers, getTagDomainColorConsumers, measureTagDomainColorRecipe, measureTagColorRecipe, getSelectColorConsumers, measureSelectColorRecipe } from "./token-foundation-outputs.mjs";
import { parseTopLevelCssBlocks, validateProtectedTailwindSource } from "./verify-tailwind-b2.mjs";
import { hasDropdownBatchOneAuthorization, hasSelectRefinementAuthorization, hasCheckboxSc01Authorization, hasRadioSc01Authorization, hasSelectionPatternsSc03Authorization, hasSelectionCardsSc02Authorization, hasTagBatchThreeAuthorization } from "./verification-helpers.mjs";
import { getTagBatchThreeColorConsumers } from "./token-foundation-outputs.mjs";
import { getDropdownFamilyColorConsumers, getTabsPageColorConsumers, getTabsColorConsumers } from "./token-foundation-outputs.mjs";
import { hasDropdownFamilyAuthorization, hasDropdownSelectionVisualReuseAuthorization, hasTabsRefinementAuthorization } from "./verification-helpers.mjs";
import { getCheckboxColorConsumers, getRadioColorConsumers, getSelectionCardColorConsumers, getSelectionPatternColorConsumers } from "./token-foundation-outputs.mjs";
import { hasTagBatchTwoRefinementAuthorization, hasTagRefinementAuthorization, hasInputRefinementAuthorization, buttonTextContrastException, hasOptionButtonContentRefinementAuthorization, hasOptionButtonRefinementAuthorization, hasQuestionNumberRefinementAuthorization, parseYamlSubset, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";

const consumerDirectory = "apps/playground/src/docs/token-foundations/";
const strings = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const categorySource = /\b(?:bg|text|border|outline|ring)-rain-(?:category|local)-|--rain-(?:category|local)-[a-z0-9]|token-classes\.generated|\b(?:colorTokenOutputs|localColorRecipeOutput)\b/;

// This snapshot locks only two local CSS consumers, including real text/data-graphic roles.
export function getM2ColorConsumers(root = process.cwd()) {
  const source = readFileSync(join(root, "evidence/runtime/m2/color-consumers.json"), "utf8");
  if (createHash("sha256").update(source).digest("hex") !== "cf356b144ead2ba8d5fd69a9b70c66cdcedfe27c55af8d06f348f247b991e160") throw new Error("M2 color metadata differs from its reviewed scope, roles or thresholds");
  const records = JSON.parse(source);
  const phasePath = join(root, "status/current-phase.yaml");
  const phase = existsSync(phasePath) ? parseYamlSubset(readFileSync(phasePath, "utf8")) : {};
  if (phase.componentRefinements?.generationQuality) {
    if (!hasGenerationQualityAuthorization(phase)) throw new Error("Generation quality colors require exact authorization");
    const updated = readFileSync(join(root, "evidence/runtime/generation-quality/color-consumers.json"), "utf8");
    const expected = phase.componentRefinements.generationQuality.visualRefinement ? "0677768f8e6aab8ca6a97589f37c7d70be5d1e2e314addd81bf6a49c9f682fd2" : "485262dde798d4b1b16c1bccc1399fbcfa03f64347676aeacc664514b4562a08";
    if (createHash("sha256").update(updated).digest("hex") !== expected) throw new Error("Generation quality color metadata differs from its reviewed scope, roles or thresholds");
    records[1] = JSON.parse(updated);
    if (phase.componentRefinements.generationQuality.bmCVisualRefinement) {
      const workbench = readFileSync(join(root, "evidence/runtime/generation-quality/bm-c-feedback/color-consumers.json"), "utf8");
      if (createHash("sha256").update(workbench).digest("hex") !== "513eb3a2788ab70fb98ddabf67222d928411ba00bc231bd8e89782b696ba6661") throw new Error("BM-C feedback color metadata differs from its reviewed scope, roles or thresholds");
      records[0] = JSON.parse(workbench);
    }
    if (phase.componentRefinements.generationQuality.compositionRefinement) {
      const report = readFileSync(join(root, "evidence/runtime/generation-quality/composition-refinement/color-consumers.json"), "utf8");
      if (createHash("sha256").update(report).digest("hex") !== "2dcc2bb1ed1d3e462e330a6a1f671038ee9f161e7b349392eefff378681d3191") throw new Error("BM-D composition color metadata differs from its reviewed scope, roles or thresholds");
      records[1] = JSON.parse(report);
    }
    if (phase.componentRefinements.generationQuality.bmCCompositionRefinement) {
      const workbench = readFileSync(join(root, "evidence/runtime/generation-quality/bm-c-composition/color-consumers.json"), "utf8");
      if (createHash("sha256").update(workbench).digest("hex") !== "7ad8d88b9576006c2e1028893bb71dca790ec283ccb2ff84d625cec315c17ffd") throw new Error("BM-C composition color metadata differs from its reviewed scope, roles or thresholds");
      records[0] = JSON.parse(workbench);
    }
    if (phase.componentRefinements.generationQuality.bmCPrimaryWorkflowRefinement) {
      const workbench = readFileSync(join(root, "evidence/runtime/generation-quality/bm-c-primary-workflow/color-consumers.json"), "utf8");
      if (createHash("sha256").update(workbench).digest("hex") !== "7fa3c5afad2a23b534eb2b4533bebfc3b5a9eb27205c1e8ecf1be48b562e7d37") throw new Error("BM-C primary workflow color metadata differs from its reviewed scope, roles or thresholds");
      records[0] = JSON.parse(workbench);
    }
    if (phase.componentRefinements.generationQuality.bmCDirectoryRefinement) {
      const workbench = readFileSync(join(root, "evidence/runtime/generation-quality/bm-c-directory-detail/color-consumers.json"), "utf8");
      if (createHash("sha256").update(workbench).digest("hex") !== "d7b3612859299fea7b6314e321222f52bfef071bfe00c80d2be86ca924792619") throw new Error("BM-C directory color metadata differs from its reviewed scope, roles or thresholds");
      records[0] = JSON.parse(workbench);
    }
    if (phase.componentRefinements.generationQuality.bmCQuestionSwitchRefinement) {
      const workbench = readFileSync(join(root, "evidence/runtime/generation-quality/bm-c-question-switch/color-consumers.json"), "utf8");
      if (createHash("sha256").update(workbench).digest("hex") !== "79a988a183e133f15f80b03d91eff9ba5a092a2122f876cf5fe3dd9da49d4e06") throw new Error("BM-C question navigation color metadata differs from its reviewed scope, roles or thresholds");
      records[0] = JSON.parse(workbench);
    }
  }
  return records.flatMap(({ filePath, scope, recipeId, paints }) => paints.map(({ tokenId, content, interaction, critical, brandIntent, minimumContrast, ...paint }) => ({
    filePath, scope, ...paint, minimumContrast,
    value: `${paint.property.startsWith("border") ? "var(--rain-line-thickness-1) solid " : ""}var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`,
    // This finite local SVG mapping keeps Icon at meaningful-icon/3:1 and auxiliary Border at decorative.
    // It does not add SVG properties to the public Category API.
    use: { tokenId, role: tokenId.split("/")[0].toLowerCase(), content,
      property: paint.property === "background" ? "background-color" : paint.property.startsWith("border") || (paint.property === "stroke" && tokenId.startsWith("Border/")) ? "border-color" : ["stroke", "fill"].includes(paint.property) ? "color" : paint.property,
      context: "local-recipe", recipeId, evidenceRef: phase.componentRefinements?.generationQuality && filePath.includes("/bm-d/") ? "docs/plans/2026-09-15-rain-generation-quality-improvement.md" : "docs/plans/2026-09-15-m2-workbench-report.md", interaction, critical,
      ...(brandIntent ? { brandIntent } : {}),
    },
  })));
}

export function validateTabsPaintRouting(source) {
  try {
    const program = parseSync('tabs.tsx', source).program, names = ['TabParts', 'MoreParts'];
    const clean = value => Array.isArray(value) ? value.map(clean) : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).filter(([key]) => !['start', 'end', 'loc', 'raw', 'comments'].includes(key)).map(([key, entry]) => [key, clean(entry)])) : value;
    const definitions = program.body.filter(node => node.type === 'FunctionDeclaration' && names.includes(node.id?.name));
    const calls = [];
    const visit = (node, parents = []) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(child => visit(child, parents)); return; }
      if (node.type === 'JSXElement' && names.includes(node.openingElement.name.name)) calls.push({
        call: clean(node.openingElement), owner: parents.findLast(parent => parent.type === 'FunctionDeclaration')?.id?.name,
        hosts: parents.filter(parent => parent.type === 'JSXElement').map(parent => ({ name: clean(parent.openingElement.name),
          identity: clean(parent.openingElement.attributes.filter(attribute => ['data-part', 'data-slot', 'data-measure-item', 'data-measure-more', 'aria-hidden', 'inert'].includes(attribute.name?.name))) })),
      });
      for (const entry of Object.values(node)) if (entry && typeof entry === 'object') visit(entry, [...parents, node]);
    };
    visit(program);
    const hash = createHash('sha256').update(JSON.stringify({ definitions: clean(definitions), calls })).digest('hex');
    return hash === 'afbba4f540ab4f7594deeff17a518066ad703ae1cda2ca83e904ca2d83321ee0' ? [] : ['Tabs actual Tab/More paint routing or its real/measurement hosts changed outside the reviewed color contract'];
  } catch { return ['Tabs actual paint routing must remain parseable and statically reviewable']; }
}

/** Exact reviewed definitions; this does not grant their files a Category-color exemption. */
/** The RN-05 gap is layout, not a color. Only its exact declared source is excluded from paint inspection. */
export function prepareDialogLayoutSource(filePath, source, status) {
  if (!hasDialogV2Authorization(status)) return source;
  if (filePath === "apps/prototype/src/course-dialog.css") return source.replace("gap: var(--rain-local-course-dialog-gap);", "");
  if (filePath === "apps/prototype/src/course-dialog.tsx") return source
    .replace('candidateTokens: ["--rain-local-course-dialog-gap"]', "candidateTokens: []")
    .replace(status.componentRefinements.dialogV2.visualRefinement
      ? '"--rain-local-course-dialog-gap": "var(--rain-space-24)"'
      : '"--rain-local-course-dialog-gap": "var(--rain-space-16)"', "");
  return source;
}

/** RN-06 runtime variables describe geometry only; no general custom-property or paint exemption. */
export function validateLayoutsRuntimeGeometry({ filePath, source, status }) {
  const ownsGeometry = ["packages/layouts/src/layout.tsx", "packages/layouts/src/layout.css"].includes(filePath);
  if (!ownsGeometry) return source.includes("--rain-layout-") ? [`RN-06 runtime geometry cannot escape its two owned sources: ${filePath}`] : [];
  if (!hasLayoutsV1Authorization(status)) return ["RN-06 runtime geometry requires its exact authorization"];
  const failures = [];
  const values = {
    "--rain-layout-gap": "compositionSpaceTokens[gap]", "--rain-layout-columns": "columns",
    "--rain-layout-column-min-width": 'positiveWidth("minColumnWidth", minColumnWidth)',
    "--rain-layout-sidebar-width": "sidebarWidthCss", "--rain-layout-main-min-width": "mainWidthCss",
  };
  if (filePath.endsWith(".tsx")) {
    const found = [], spaceMap = [];
    const walk = node => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) { node.forEach(walk); return; }
      if (node.type === "Property" && typeof node.key.value === "string" && node.key.value.startsWith("--rain-layout-")) {
        const name = node.key.value;
        if (node.computed || source.slice(node.value.start, node.value.end).replace(/\s+/g, " ") !== values[name]) failures.push(`RN-06 undeclared runtime geometry source: ${name}`);
        found.push(name);
      }
      if (node.type === "Property" && /^(?:color|background(?:Color|Image)?|border(?:Color|Width|Style|Radius)?|boxShadow|font(?:Family|Size|Weight)?|lineHeight|padding(?:Top|Bottom|Left|Right|Inline|Block)?)$/.test(node.key.name ?? node.key.value ?? "")) failures.push("Layout cannot author inline paint, typography or component padding");
      if (node.type === "VariableDeclarator" && node.id?.name === "gapClasses") {
        for (const property of node.init?.properties ?? []) spaceMap.push([String(property.key.value), property.value?.value]);
      }
      if (node.type === "ImportDeclaration" && node.source.value.startsWith("@rain-next/") && node.source.value !== "@rain-next/foundations") failures.push("Layout cannot depend on UI or higher layers");
      for (const value of Object.values(node)) if (value && typeof value === "object") walk(value);
    };
    try { walk(parseSync(filePath, source).program); }
    catch { failures.push("RN-06 geometry must remain statically parseable"); }
    if (JSON.stringify(found.sort()) !== JSON.stringify([...Object.keys(values), "--rain-layout-gap"].sort())) failures.push("RN-06 runtime geometry definitions must remain the exact five variables on Grid and Split");
    if (JSON.stringify(spaceMap.sort()) !== JSON.stringify(Object.keys(compositionSpaceTokens).map(key => [key, `gap-rain-${key}`]).sort())) failures.push("Layout gap classes must reuse every existing Rain Space mapping without additions");
  } else {
    const walk = css => {
      for (const { header, body } of parseTopLevelCssBlocks(css, "RN-06 layout CSS", failures)) {
        if (header === "@layer components") { walk(body); continue; }
        if (header.startsWith("@") || header.split(",").some(selector => !selector.trim().startsWith(".rain-grid") && !selector.trim().startsWith(".rain-split"))) failures.push("RN-06 CSS must stay inside its Grid/Split parts");
        for (const [, property, value] of body.matchAll(/([a-z-]+)\s*:\s*([^;{}]+)(?:;|$)/g)) {
          if (!["grid-template-columns", "min-width", "width", "flex", "flex-direction", "display"].includes(property)) failures.push(`Layout CSS cannot own paint, typography or component padding: ${property}`);
          for (const [, variable] of value.matchAll(/var\((--[a-z0-9-]+)\)/g)) {
            const expected = variable === "--rain-layout-sidebar-width" ? "width" : variable === "--rain-layout-main-min-width" ? "min-width" : "grid-template-columns";
            if (!(variable in values) || property !== expected) failures.push(`RN-06 geometry variable is not allowed for ${property}: ${variable}`);
          }
        }
      }
    };
    walk(source);
  }
  return [...new Set(failures)];
}

/** @param {{filePath: string, source: string, outputs?: ReturnType<typeof getTokenFoundationOutputs>, root?: string, pendingContrastFindings?: any[], pendingEligibilityFindings?: any[], scopedEligibilityDecisions?: any[]}} options */
export function validateRegisteredRecipeColors({ filePath, source, outputs = getTokenFoundationOutputs(), root = process.cwd(), pendingContrastFindings = [], pendingEligibilityFindings = [], scopedEligibilityDecisions = [] }) {
  source = prepareDialogLayoutSource(filePath, source, existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {});
  const failures = [], ranges = [];
  source = prepareInputNumberSource(filePath, source, existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {}, failures);
  source = prepareAvatarSource(filePath, source, existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {}, failures);
  if (filePath === "packages/ui/src/dialog/dialog.css") {
    const phase = existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {};
    if (!hasDialogRefinementAuthorization(phase)) failures.push("Dedicated Dialog masks require the exact refinement authorization");
    for (const name of Object.keys(overlayColors)) {
      const rule = `.rain-dialog-backdrop[data-mask="${name}"] { background-color: var(--rain-overlay-${name}); }`;
      if (source.split(rule).length !== 2) failures.push(`Missing or duplicated dedicated mask consumer: ${name}`);
      else source = source.replace(rule, " ".repeat(rule.length));
    }
  }

  if (filePath === 'packages/ui/src/tabs/tabs.tsx') failures.push(...validateTabsPaintRouting(source));
  const recipes = outputs.colorRecipeConsumers.filter((entry) => entry.filePath === filePath);
  const cssConsumers = outputs.colorCssConsumers.filter((entry) => entry.filePath === filePath);
  const expectedNumber = getInputNumberColorConsumers().filter(entry => entry.filePath === filePath);
  if (expectedNumber.length && (recipes.length || JSON.stringify(cssConsumers) !== JSON.stringify(expectedNumber))) failures.push("InputNumber colors must retain exact roles and surfaces");
  const expectedAvatar = getAvatarColorConsumers().filter(entry => entry.filePath === filePath);
  if (expectedAvatar.length && (recipes.length || JSON.stringify(cssConsumers) !== JSON.stringify(expectedAvatar))) failures.push("Avatar colors must retain their exact registered roles and parent surfaces");
  if (["apps/prototype/src/scenarios/bm-c/page.css", "apps/prototype/src/scenarios/bm-d/page.css"].includes(filePath)) {
    try {
      const phase = existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {};
      if (!hasM2Authorization(phase) || recipes.length
        || JSON.stringify(cssConsumers) !== JSON.stringify(getM2ColorConsumers(root).filter(entry => entry.filePath === filePath))) {
        return ["M2 colors require exact authorization, selectors, Tokens, content roles, parent surfaces and thresholds"];
      }
    } catch (error) { return [error.message]; }
  }
  const paginationScope = paginationColorSourcePaths.includes(filePath);
  const paginationMetadata = paginationScope ? getPaginationColorConsumers() : null;
  const paginationAuthorized = paginationScope && existsSync(join(root, "status/current-phase.yaml"))
    && hasTablePaginationReplacementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  const paginationMetadataMatches = paginationScope
    && JSON.stringify(recipes) === JSON.stringify(paginationMetadata.colorRecipeConsumers.filter(entry => entry.filePath === filePath))
    && JSON.stringify(cssConsumers) === JSON.stringify(paginationMetadata.colorCssConsumers.filter(entry => entry.filePath === filePath));
  if (paginationScope && (!paginationAuthorized || !paginationMetadataMatches)) return ["Pagination colors require exact RN-08 authorization, source definitions and content roles"];
  const maskPaginationSource = (entry) => {
    if (source.split(entry.source).length !== 2) { failures.push(`Pagination registered source must occur exactly once: ${filePath} ${entry.source}`); return; }
    source = source.replace(entry.source, " ".repeat(entry.source.length));
  };
  if (paginationAuthorized) {
    // These exact geometry declarations are not paints. Every other local variable remains subject to the color check.
    [...paginationMetadata.geometryConsumers, ...paginationMetadata.nativeCssConsumers]
      .filter(entry => entry.filePath === filePath).forEach(maskPaginationSource);
  }
  const paginationUse = use => paginationAuthorized && use.recipeId?.startsWith("pagination-")
    && use.evidenceRef === "docs/plans/2026-09-14-table-pagination-replacement.md";

  if (filePath === "apps/playground/src/docs/components/tabs-page.css") {
    const phase = existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {};
    const authorized = hasTabsRefinementAuthorization(phase) && ["component", "documentation"].includes(phase.componentRefinements.tabs.stage);
    if (!authorized || JSON.stringify(cssConsumers) !== JSON.stringify(getTabsPageColorConsumers())) failures.push("Tabs documentation colors require their exact authorization and consumer roles");
  }
  const tabsScope = filePath === "packages/ui/src/tabs/tabs.styles.ts";
  const tabsPhase = tabsScope && existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {};
  const tabsAuthorized = tabsScope && hasTabsRefinementAuthorization(tabsPhase) && ["colors", "component", "documentation"].includes(tabsPhase.componentRefinements.tabs.stage);
  const tabsMetadataMatches = tabsScope && JSON.stringify(recipes) === JSON.stringify(getTabsColorConsumers()) && cssConsumers.length === 0;
  if (tabsScope && (!tabsAuthorized || !tabsMetadataMatches)) failures.push("Tabs color consumers require exact authorized source, state, part, role, surfaces and thresholds");
  const dropdownFamilyScope = ["packages/ui/src/dropdown-menu/dropdown-menu.css", "apps/playground/src/docs/components/dropdown-page.css"].includes(filePath);
  const dropdownFamilyAuthorized = dropdownFamilyScope && existsSync(join(root, "status/current-phase.yaml"))
    && hasDropdownFamilyAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  if (dropdownFamilyScope && (!dropdownFamilyAuthorized
    || JSON.stringify(cssConsumers) !== JSON.stringify(getDropdownFamilyColorConsumers().filter(entry => entry.filePath === filePath)))) failures.push("Dropdown family colors require exact authorization, content roles and actual popup surfaces");
  const dropdownFamilyUse = use => dropdownFamilyAuthorized && use.recipeId?.startsWith("menu-public-")
    && use.evidenceRef === "docs/plans/2026-09-09-dropdown-family-construction-plan.md";
  const checkboxCss = cssConsumers.filter((entry) => /^\.rain-checkbox(?:\b|-group\b)/.test(entry.selector));
  if (filePath === "packages/ui/src/styles.css" && (checkboxCss.length || source.includes(".rain-checkbox"))) {
    const status = existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : null;
    if (!hasCheckboxSc01Authorization(status) || (checkboxCss.some((entry) => entry.media) && !status.componentRefinements.checkboxSc01.interactionRefinement)
      || JSON.stringify(checkboxCss) !== JSON.stringify(getCheckboxColorConsumers({ menuVisualReuse: hasDropdownSelectionVisualReuseAuthorization(status) }).filter((entry) => entry.filePath === filePath))) failures.push("Checkbox CSS metadata requires its exact scoped authorization, Alpha source and contrast roles");
  }
  const radioCss = cssConsumers.filter((entry) => /^\.rain-radio(?:\b|-group\b)/.test(entry.selector));
  if (filePath === "packages/ui/src/styles.css" && (radioCss.length || source.includes(".rain-radio"))) {
    const status = existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : null;
    if (!hasRadioSc01Authorization(status)
      || JSON.stringify(radioCss) !== JSON.stringify(getRadioColorConsumers({ menuVisualReuse: hasDropdownSelectionVisualReuseAuthorization(status) }).filter((entry) => entry.filePath === filePath))) failures.push("Radio CSS metadata requires its exact scoped authorization, Alpha source and contrast roles");
  }
  const selectionPatternCss = cssConsumers.filter((entry) => entry.use?.recipeId === "selection-patterns-sc03");
  if (selectionPatternCss.length || filePath === "apps/playground/src/patterns/selection-patterns.css") {
    const status = existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : null;
    if (!hasSelectionPatternsSc03Authorization(status)
      || JSON.stringify(selectionPatternCss) !== JSON.stringify(getSelectionPatternColorConsumers().filter((entry) => entry.filePath === filePath))) failures.push("Selection Pattern colors require exact SC-03 scope and declared parent surfaces");
  }
  const selectionCardCss = cssConsumers.filter((entry) => entry.use?.recipeId === "selection-card-sc02");
  if (selectionCardCss.length || source.includes(".rain-selection-card") || filePath.endsWith("/selection-cards-page.css")) {
    const status = existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : null;
    if (!hasSelectionCardsSc02Authorization(status)
      || JSON.stringify(selectionCardCss) !== JSON.stringify(getSelectionCardColorConsumers().filter((entry) => entry.filePath === filePath))) failures.push("Selection card colors require exact SC-02 scope, current themed border and real content contrast roles");
  }
  const questionNumberScope = ["packages/ui/src/question-number/question-number.styles.ts", "apps/playground/src/docs/components/question-number-page.css"].includes(filePath);
  const questionNumberAuthorized = questionNumberScope && existsSync(join(root, "status/current-phase.yaml"))
    && hasQuestionNumberRefinementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  const optionButtonAuthorized = filePath === "packages/ui/src/option-button/option-button.styles.ts" && existsSync(join(root, "status/current-phase.yaml"))
    && hasOptionButtonRefinementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  const optionButtonContentAuthorized = optionButtonAuthorized
    && hasOptionButtonContentRefinementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  if (filePath === "apps/prototype/src/scenarios/bm-b/page.css" && (!existsSync(join(root, "status/current-phase.yaml"))
    || !hasBmBRn10Authorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))
    || JSON.stringify(cssConsumers) !== JSON.stringify(getBmBColorConsumers()))) failures.push("BM-B colors require exact RN-10 authorization and actual content roles/surfaces");
  const expectedDialog = getDialogColorConsumers().filter(entry => entry.filePath === filePath);
  const expectedLayouts = getLayoutsColorConsumers().filter(entry => entry.filePath === filePath);
  if (expectedLayouts.length && (!existsSync(join(root, "status/current-phase.yaml"))
    || !hasLayoutsV1Authorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))
    || JSON.stringify(cssConsumers) !== JSON.stringify(expectedLayouts))) failures.push("RN-06 example colors require exact authorization, content roles and parent surfaces");
  if (expectedDialog.length && (!hasDialogV2Authorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))
    || JSON.stringify(cssConsumers) !== JSON.stringify(expectedDialog))) failures.push("Dialog V2 colors require exact authorization and declared content roles");
  const expectedTable = getTableRn08ColorConsumers().filter(entry => entry.filePath === filePath);
  const expectedEmpty = getEmptyColorConsumers().filter(entry => entry.filePath === filePath);
  const emptyAuthorized = expectedEmpty.length > 0 && existsSync(join(root, "status/current-phase.yaml")) && hasEmptyRefinementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  if (expectedEmpty.length && (!emptyAuthorized || JSON.stringify(recipes) !== JSON.stringify(expectedEmpty) || cssConsumers.length)) failures.push("Empty colors require exact component scope, source definitions and text contrast roles");
  const tableAuthorized = expectedTable.length > 0 && existsSync(join(root, "status/current-phase.yaml")) && hasTableRn08Authorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  const tableVisualAuthorized = tableAuthorized && hasTableVisualRefinementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  if (expectedTable.length && (!tableVisualAuthorized || JSON.stringify(recipes) !== JSON.stringify(expectedTable) || cssConsumers.length)) failures.push("RN-08 colors require exact authorization, source definitions and text contrast roles");
  const expectedCard = getCardColorConsumers();
  const cardScope = [...expectedCard.colorRecipeConsumers, ...expectedCard.colorCssConsumers].some(entry => entry.filePath === filePath);
  const cardAuthorized = cardScope && existsSync(join(root, "status/current-phase.yaml"))
    && hasCardV2Authorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  if (cardScope && (!cardAuthorized || JSON.stringify(recipes) !== JSON.stringify(expectedCard.colorRecipeConsumers.filter(entry => entry.filePath === filePath))
    || JSON.stringify(cssConsumers) !== JSON.stringify(expectedCard.colorCssConsumers.filter(entry => entry.filePath === filePath)))) failures.push("Card V2 colors require exact scoped authorization, source definitions and text contrast roles");
  const inputPhase = ["packages/ui/src/input/input.styles.ts", "packages/ui/src/input/form-item.tsx"].includes(filePath) && existsSync(join(root, "status/current-phase.yaml"))
    ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : null;
  const inputAuthorized = hasInputRefinementAuthorization(inputPhase);
  const expectedInput = getInputColorConsumers();
  if (filePath === "packages/ui/src/input/form-item.tsx" && !hasInsideFieldLabelsAuthorization(inputPhase)) failures.push("Fixed inside label colors require their exact independent authorization");
  if (inputPhase && (!inputAuthorized || JSON.stringify(recipes) !== JSON.stringify(expectedInput.colorRecipeConsumers.filter((entry) => entry.filePath === filePath)))) failures.push("Input color metadata must retain the exact declared content roles and eligibility");
  const dropdownAuthorized = filePath === "apps/playground/src/experiments/headless/review.css"
    && existsSync(join(root, "status/current-phase.yaml"))
    && hasDropdownBatchOneAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  const dropdownUse = use => dropdownAuthorized && use.recipeId?.startsWith("dropdown-")
    && use.evidenceRef === "docs/plans/2026-09-09-dropdown-family-construction-plan.md";
  const tagScope = ["packages/ui/src/tag/tag.styles.ts", "apps/playground/src/docs/components/tag-page.css"].includes(filePath);
  const tagAuthorized = tagScope && existsSync(join(root, "status/current-phase.yaml"))
    && hasTagRefinementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  const tagDomainScope = filePath === "packages/ui/src/tag/domain-tags.styles.ts";
  const tagDomainAuthorized = tagDomainScope && existsSync(join(root, "status/current-phase.yaml"))
    && hasTagBatchTwoRefinementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  if (tagDomainScope && (!tagDomainAuthorized || JSON.stringify(recipes) !== JSON.stringify(getTagDomainColorConsumers()))) failures.push("Tag domain metadata requires its exact second-batch authorization, paint roles and thresholds");
  const expectedTags = getTagColorConsumers();
  const expectedTagThree = getTagBatchThreeColorConsumers();
  const tagThreeRecipes = recipes.filter((entry) => entry.refinement === "tag-batch-three");
  const tagThreeCss = cssConsumers.filter((entry) => entry.use?.recipeId === "tag-management-page");
  const tagThreeScope = filePath === "packages/ui/src/tag/tag-select.styles.ts" || tagThreeCss.length > 0 || source.includes(".tag-management__popup");
  const tagThreeAuthorized = tagThreeScope && existsSync(join(root, "status/current-phase.yaml"))
    && hasTagBatchThreeAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  if (tagThreeScope && (!tagThreeAuthorized || JSON.stringify(tagThreeRecipes) !== JSON.stringify(expectedTagThree.colorRecipeConsumers.filter((entry) => entry.filePath === filePath))
    || JSON.stringify(tagThreeCss) !== JSON.stringify(expectedTagThree.colorCssConsumers.filter((entry) => entry.filePath === filePath)))) failures.push("Tag batch three metadata requires its exact authorization, popup roles and Background/Neutral/1 parent");
  if (tagScope && (!tagAuthorized || JSON.stringify(recipes) !== JSON.stringify(expectedTags.colorRecipeConsumers.filter((entry) => entry.filePath === filePath))
    || JSON.stringify(cssConsumers.filter((entry) => !tagThreeCss.includes(entry))) !== JSON.stringify(expectedTags.colorCssConsumers.filter((entry) => entry.filePath === filePath)))) failures.push("Tag consumer metadata requires the exact authorized palette, roles, thresholds and paint states");
  const expectedSelect = getSelectColorConsumers();
  const selectScope = [...expectedSelect.colorRecipeConsumers, ...expectedSelect.colorCssConsumers].some((entry) => entry.filePath === filePath);
  const selectAuthorized = selectScope && existsSync(join(root, "status/current-phase.yaml"))
    && hasSelectRefinementAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")));
  if (selectScope && (!selectAuthorized || JSON.stringify(recipes) !== JSON.stringify(expectedSelect.colorRecipeConsumers.filter((entry) => entry.filePath === filePath))
    || JSON.stringify(cssConsumers.filter((entry) => !checkboxCss.includes(entry) && !radioCss.includes(entry) && !selectionCardCss.includes(entry))) !== JSON.stringify(expectedSelect.colorCssConsumers.filter((entry) => entry.filePath === filePath)))) failures.push("Select and shared field color metadata must retain their exact authorization, surfaces, content roles and thresholds");
  const selectFocusUse = (use) => selectAuthorized && use.evidenceRef === "docs/plans/2026-09-08-input-select-field-recipes-design.md"
    && /^field-focus-(?:default|warning|error)-(?:line|readonly)$/.test(use.recipeId ?? "") && use.content === "essential-boundary";
  const inputVisualRevisionAuthorized = inputAuthorized && Boolean(inputPhase.componentRefinements.input.visualRevision);
  const inputConsumerContent = {
    inputRootRecipe: "text", inputControlClassName: "text", inputAffixClassName: "text", inputSuffixTextClassName: "text", inputIconColors: "decorative",
    inputClearClassName: "meaningful-icon", inputCountRecipe: "text", formItemColors: "text",
  };
  const inputContrastUse = (use) => inputAuthorized && use.evidenceRef === "docs/plans/2026-09-08-input-design.md" && (
    (use.recipeId?.startsWith("input-root-") && use.role === "border" && use.content === "essential-boundary")
    || (use.recipeId?.startsWith("input-count-overflow-") && use.tokenId === "Text/Red/1" && use.content === "text")
    || (inputVisualRevisionAuthorized && use.role === "text" && use.content === "text" && (
      (/^input-(?:placeholder|suffix-text|count)-(?:(?:filled|underlined)-)?(?:default|hover|editing|readonly|readonly-focus|warning|error)$/.test(use.recipeId ?? "") && use.tokenId === "Text/Neutral/5")
      || (use.recipeId === "input-form-item-warning" && use.tokenId === "Text/Orange/1"))));
  const sharedInputContrastUse = (use) => inputAuthorized && hasSelectRefinementAuthorization(inputPhase)
    && use.evidenceRef === "docs/plans/2026-09-08-input-design.md" && use.parentSurfaceId === "Fill/Red/Alpha/2"
    && ((use.recipeId === "input-affix-underlined-error" && use.tokenId === "Text/Neutral/4" && use.content === "text")
      || (use.recipeId === "input-clear-0-underlined-error" && use.tokenId === "Icon/Neutral/3" && use.content === "meaningful-icon"));
  const optionContentSymbols = ["optionFeedbackControlColors"];
  const checkColor = (use, label, pendingReview = false) => {
    const bmBHint = pendingReview && filePath === "apps/prototype/src/scenarios/bm-b/page.css"
      && label === `.bm-b-hint color ${use.theme} Background/Neutral/1` && use.recipeId === "bm-b-textbook-dialog"
      && use.tokenId === "Text/Neutral/5" && use.content === "text" && use.interaction === "non-interactive" && use.critical === false
      && use.parentSurfaceId === "Background/Neutral/1" && use.evidenceRef === "docs/plans/2026-09-15-bm-b-rn10.md";
    // Fixed field titles retain their critical interactive role even when the requested weak token needs review.
    const insideLabel = pendingReview && filePath === "packages/ui/src/input/form-item.tsx"
      && hasInsideFieldLabelsAuthorization(inputPhase) && inputPhase.componentRefinements.tableRn08.insideFieldLabels.labelColor === "Text/Neutral/4"
      && /^input-inside-label-(?:outlined|filled|underlined)-(?:default|hover|editing|readonly|readonly-focus|warning|error)$/.test(use.recipeId ?? "")
      && use.tokenId === "Text/Neutral/4" && use.content === "text" && use.interaction === "interactive" && use.critical === true
      && use.evidenceRef === "docs/plans/2026-09-14-inside-field-labels.md";
    if (insideLabel) {
      const actual = measureColorContrast(resolveColor(use.tokenId, use.theme), resolveColorSurface(use.parentSurfaceId, use.theme, use.parentBackgroundId));
      const finding = { status: "pending-review", acceptedException: false, filePath, recipeId: use.recipeId,
        tokenId: use.tokenId, content: use.content, interaction: use.interaction, critical: use.critical, theme: use.theme,
        parentSurfaceId: use.parentSurfaceId, parentBackgroundId: use.parentBackgroundId ?? null, actual, minimum: 4.5,
        evidenceRef: use.evidenceRef };
      pendingEligibilityFindings.push({ ...finding, reason: "Weak Neutral needs non-critical, non-interactive content" });
      if (actual < 4.5) pendingContrastFindings.push(finding);
    }
    // Header includes the sorting button: retain interactive, critical text and its full text contrast threshold.
    const tableHeader = pendingReview && tableVisualAuthorized && ["table-header", "table-header-hover"].includes(use.recipeId) && use.tokenId === "Text/Neutral/4"
      && use.content === "text" && use.interaction === "interactive" && use.critical === true
      && use.evidenceRef === "docs/plans/2026-09-14-table-visual-refinement.md";
    if (tableHeader) {
      const actual = measureColorContrast(resolveColor(use.tokenId, use.theme), resolveColorSurface(use.parentSurfaceId, use.theme, use.parentBackgroundId));
      if (actual < 4.5) failures.push(`${label}: Table header text contrast ${actual} is below 4.5`);
      pendingEligibilityFindings.push({ status: "pending-review", acceptedException: false, filePath, recipeId: use.recipeId,
        tokenId: use.tokenId, content: use.content, interaction: use.interaction, critical: use.critical, theme: use.theme,
        parentSurfaceId: use.parentSurfaceId, parentBackgroundId: use.parentBackgroundId ?? null, actual, minimum: 4.5,
        evidenceRef: use.evidenceRef, reason: "Weak Neutral needs non-critical, non-interactive content" });
    }
    const inputPlaceholder = pendingReview && inputAuthorized && /^input-placeholder-/.test(use.recipeId ?? "") && use.tokenId === "Text/Neutral/5" && use.content === "text";
    const dropdownDescription = pendingReview && ((dropdownUse(use) && use.recipeId === "dropdown-interactive-description")
      || (dropdownFamilyUse(use) && use.recipeId === "menu-public-description"))
      && use.tokenId === "Text/Neutral/4" && use.content === "text" && use.interaction === "interactive" && use.critical === false;
    if (inputPlaceholder || dropdownDescription) pendingEligibilityFindings.push({ status: "pending-review", acceptedException: false, filePath, recipeId: use.recipeId,
      tokenId: use.tokenId, content: use.content, theme: use.theme, parentSurfaceId: use.parentSurfaceId, parentBackgroundId: use.parentBackgroundId ?? null,
      actual: measureColorContrast(resolveColor(use.tokenId, use.theme), resolveColorSurface(use.parentSurfaceId, use.theme, use.parentBackgroundId)), minimum: 4.5,
      evidenceRef: use.evidenceRef, reason: "Weak Neutral needs non-critical, non-interactive content" });
    try { validateColorUse(use); }
    catch (error) {
      const insufficient = error.message.match(/^Insufficient contrast: ([0-9.]+) < ([0-9.]+)$/);
      if (insideLabel && (insufficient || error.message === "Weak Neutral needs non-critical, non-interactive content")) { /* Both findings are measured and recorded above without rounding. */ }
      else if (pendingReview && insufficient && filePath === "packages/ui/src/status-indicator/status-indicator.css"
        && use.recipeId === "avatar-family" && use.tokenId === "OnColor/1" && use.content === "meaningful-icon"
        && use.evidenceRef === "docs/plans/2026-09-16-avatar-family-design-and-construction.md"
        && use.theme === "light" && ["Fill/TagSlate/Solid/1", "Fill/TagCourseware/Solid/1"].includes(use.parentSurfaceId)) pendingContrastFindings.push({
          status: "pending-review", acceptedException: false, filePath, recipeId: use.recipeId,
          tokenId: use.tokenId, content: use.content, theme: use.theme, parentSurfaceId: use.parentSurfaceId,
          actual: measureColorContrast(resolveColor(use.tokenId, use.theme), resolveColorSurface(use.parentSurfaceId, use.theme)),
          minimum: 3, evidenceRef: use.evidenceRef,
        });
      else if (pendingReview && insufficient && (bmBHint || paginationUse(use) || questionNumberAuthorized || (optionButtonContentAuthorized && use.recipeId.startsWith("option-button-content-")) || inputContrastUse(use) || dropdownUse(use) || dropdownFamilyUse(use) || selectFocusUse(use) || sharedInputContrastUse(use))) pendingContrastFindings.push({
        status: "pending-review", acceptedException: false, filePath, recipeId: use.recipeId,
        tokenId: use.tokenId, content: use.content, theme: use.theme,
        parentSurfaceId: use.parentSurfaceId, parentBackgroundId: use.parentBackgroundId ?? null,
        actual: sharedInputContrastUse(use) ? measureColorContrast(resolveColor(use.tokenId, use.theme), resolveColorSurface(use.parentSurfaceId, use.theme, use.parentBackgroundId)) : Number(insufficient[1]), minimum: Number(insufficient[2]), evidenceRef: use.evidenceRef,
      });
      else if (pendingReview && (dropdownUse(use) || dropdownFamilyUse(use)) && ({ "dropdown-selected-text": "Text/Brand/1", "dropdown-selected-description": "Text/Brand/2", "dropdown-selected-icon": "Icon/Brand/1",
        "menu-public-selected-text": "Text/Brand/1", "menu-public-selected-description": "Text/Brand/2", "menu-public-selected-icon": "Icon/Brand/1" })[use.recipeId] === use.tokenId
        && ["Fill/Red/Alpha/1", "Fill/Red/Alpha/2"].includes(use.parentSurfaceId)
        && error.message === "These subtle surfaces require Neutral or same-family foregrounds") {
        const actual = measureColorContrast(resolveColor(use.tokenId, use.theme), resolveColorSurface(use.parentSurfaceId, use.theme, use.parentBackgroundId));
        const finding = { status: "pending-review", acceptedException: false, filePath, recipeId: use.recipeId,
          tokenId: use.tokenId, content: use.content, theme: use.theme, parentSurfaceId: use.parentSurfaceId,
          parentBackgroundId: use.parentBackgroundId, reason: error.message, evidenceRef: use.evidenceRef,
          actual, minimum: use.content === "meaningful-icon" ? 3 : 4.5 };
        pendingEligibilityFindings.push(finding);
        if (actual < finding.minimum) pendingContrastFindings.push({ ...finding, measurementOnly: true });
      } else if (pendingReview && inputContrastUse(use) && use.recipeId.startsWith("input-count-overflow-")
        && ["Fill/Orange/Solid/3", "Fill/Orange/Alpha/2"].includes(use.parentSurfaceId)
        && error.message === "These subtle surfaces require Neutral or same-family foregrounds") {
        const actual = measureColorContrast(resolveColor(use.tokenId, use.theme), resolveColorSurface(use.parentSurfaceId, use.theme, use.parentBackgroundId));
        const finding = { status: "pending-review", acceptedException: false, filePath, recipeId: use.recipeId,
          tokenId: use.tokenId, content: use.content, theme: use.theme, parentSurfaceId: use.parentSurfaceId,
          parentBackgroundId: use.parentBackgroundId ?? null, evidenceRef: use.evidenceRef };
        pendingEligibilityFindings.push({ ...finding, reason: error.message, actual, minimum: 4.5 });
        if (actual < 4.5) pendingContrastFindings.push({ ...finding, actual, minimum: 4.5, measurementOnly: true });
      } else if (!((inputPlaceholder || dropdownDescription || tableHeader) && error.message === "Weak Neutral needs non-critical, non-interactive content")) failures.push(`${label}: ${error.message}`);
    }
  };
  const checkUse = (use, parents, label, pendingReview = false, parentBackgrounds = [use.parentBackgroundId]) => {
    if (!existsSync(join(root, use.evidenceRef?.split("#")[0] ?? ""))) failures.push(`Missing color consumer evidence: ${label}`);
    for (const theme of ["light", "dark"]) for (const parent of parents) for (const parentBackgroundId of parentBackgrounds) {
      checkColor({ ...use, theme, parentSurfaceId: parent, ...(parentBackgroundId ? { parentBackgroundId } : {}) }, `${label} ${theme} ${parent}`, pendingReview);
    }
  };
  if (paginationAuthorized) for (const consumer of paginationMetadata.inlineConsumers.filter(entry => entry.filePath === filePath)) {
    checkUse(consumer.use, consumer.parentSurfaces, consumer.scope, true);
    maskPaginationSource(consumer);
  }
  if (recipes.length) {
    const parsed = parseSync(filePath, source);
    if (parsed.errors.length) return [`Cannot parse registered recipe: ${filePath}`];
    if (tabsScope) {
      const [definition, freeze, ...extra] = parsed.program.body;
      const freezeSource = '[tabsPaints, ...Object.values(tabsPaints), ...Object.values(tabsPaints).flatMap(value => typeof value === "object" ? Object.values(value) : [])].filter(value => typeof value === "object").forEach(Object.freeze);';
      if (definition?.type !== "ExportNamedDeclaration" || definition.declaration?.kind !== "const"
        || definition.declaration.declarations?.length !== 1 || definition.declaration.declarations[0].id?.name !== "tabsPaints"
        || !freeze || source.slice(freeze.start, freeze.end) !== freezeSource || extra.length) {
        return ["Tabs paints must contain only the reviewed literal and its exact deep freeze; aliases or later mutation are forbidden"];
      }
    }
    const declarations = [], imports = [];
    const visit = (node) => {
      if (!node || typeof node !== "object") return;
      if (node.type === "VariableDeclarator") declarations.push(node);
      if (node.type === "ImportDeclaration") imports.push(node);
      for (const value of Object.values(node)) if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value === "object") visit(value);
    };
    visit(parsed.program);
    const literal = (node) => {
      if (node?.type === "TSAsExpression" || node?.type === "TSSatisfiesExpression") return literal(node.expression);
      if (node?.type === "Literal") return node.value;
      if (node?.type === "ArrayExpression") return node.elements.map(literal);
      if (node?.type === "ObjectExpression") return Object.fromEntries(node.properties.map((property) => {
        if (property.type !== "Property" || property.computed || property.kind !== "init") throw new Error("Color recipes must be literal objects");
        return [property.key.name ?? property.key.value, literal(property.value)];
      }));
      throw new Error("Color recipes must be static literals");
    };
    for (const consumer of recipes) {
      const matches = declarations.filter((node) => node.id?.name === consumer.symbol);
      let reviewedSourceMatches = false;
      try {
        if (matches.length !== 1) throw new Error("Expected one registered recipe definition");
        const init = matches[0].init;
        const callee = consumer.kind === "cva" ? "cva" : "defineRainLocalRecipe";
        const from = consumer.kind === "cva" ? "class-variance-authority" : "@rain-next/ui";
        if (consumer.kind !== "static" && (init?.type !== "CallExpression" || init.callee?.name !== callee
          || !imports.some((entry) => entry.source.value === from && entry.specifiers.some((part) => part.imported?.name === callee && part.local.name === callee)))) throw new Error("Registered recipe must use its declared recipe factory");
        if (consumer.kind === "static" && !paginationAuthorized && !(emptyAuthorized && consumer.symbol === "emptyPaints") && !(tableAuthorized && consumer.symbol === "tablePaints") && !(cardAuthorized && consumer.symbol === "cardPaints") && !questionNumberAuthorized && !optionButtonAuthorized && !(inputAuthorized && Object.hasOwn(inputConsumerContent, consumer.symbol))
          && !(tabsAuthorized && consumer.symbol === "tabsPaints") && !selectAuthorized && !(tagThreeAuthorized && consumer.symbol === "tagSelectPaints") && !(tagDomainAuthorized && ["tagStatusPaints", "tagDomainPaints"].includes(consumer.symbol)) && !(tagAuthorized && ["tagColorPaints", "tagSolidPaints"].includes(consumer.symbol))) throw new Error("Static color recipe requires its exact component authorization");
        if (optionContentSymbols.includes(consumer.symbol) && (!optionButtonContentAuthorized || consumer.refinement !== "option-button-content")) throw new Error("OptionButton content color recipe requires its separate exact authorization");
        if (consumer.refinement === "option-button-content" && !optionContentSymbols.includes(consumer.symbol)) throw new Error("OptionButton content authorization cannot expand the accepted selection recipes");
        const actual = literal(consumer.kind === "static" ? init : init.arguments[consumer.kind === "cva" ? 1 : 0]);
        const reviewed = ["cva", "static"].includes(consumer.kind) ? actual : Object.fromEntries(Object.keys(consumer.definition).map((key) => [key, actual[key]]));
        if (JSON.stringify(reviewed) !== JSON.stringify(consumer.definition)) throw new Error("Registered color state routing differs from the reviewed definition");
        if (consumer.kind === "cva" && categorySource.test(source.slice(init.arguments[0].start, init.arguments[0].end))) throw new Error("Unregistered base color in CVA recipe");
        reviewedSourceMatches = true;
        ranges.push([init.start, init.end]);
      } catch (error) { failures.push(`${filePath} ${consumer.symbol}: ${error.message}`); }
      if (tabsScope) {
        if (!tabsAuthorized || !tabsMetadataMatches || !reviewedSourceMatches) continue;
        for (const recipe of consumer.recipes) for (const theme of ["light", "dark"]) {
          const use = { ...recipe.foreground, theme, parentSurfaceId: recipe.parentSurfaceId, parentBackgroundId: recipe.parentBackgroundId };
          const label = `${recipe.id} ${theme}`;
          try { validateColorUse(use); }
          catch (error) {
            const softText = error.message === "Weak Neutral needs non-critical, non-interactive content"
              && consumer.componentId === "ui-tabs" && consumer.symbol === "tabsPaints" && consumer.scope === '[data-rain-id="ui-tabs"]'
              && recipe.appearance === "soft" && ["label", "count"].includes(recipe.part) && ["ordinary", "focus"].includes(recipe.state)
              && !recipe.selected && !recipe.disabled && !recipe.hover && !recipe.pressed
              && use.tokenId === "Text/Neutral/4" && use.role === "text" && use.content === "text" && use.property === "color"
              && use.context === "component-recipe" && use.interaction === "interactive" && use.critical === true
              && use.evidenceRef === "docs/plans/2026-09-10-tabs-implementation.md"
              && use.parentSurfaceId === "Fill/Neutral/Alpha/6" && use.parentBackgroundId === "Background/Neutral/1"
              && !["alpha", "alphaOperation", "componentOpacity"].some(key => Object.hasOwn(use, key));
            const actual = measureColorContrast(resolveColor(use.tokenId, theme), resolveColorSurface(use.parentSurfaceId, theme, use.parentBackgroundId));
            if (softText && actual >= 4.5 && existsSync(join(root, "evidence/runtime/tabs/soft-text-eligibility.md"))) {
              scopedEligibilityDecisions.push({ type: "scopedEligibilityDecision", contrastException: false, componentId: "ui-tabs", filePath,
                recipeId: recipe.id, part: recipe.part, state: recipe.state, theme, tokenId: use.tokenId, actual, minimum: 4.5,
                parentSurfaceId: use.parentSurfaceId, parentBackgroundId: use.parentBackgroundId, evidenceRef: "evidence/runtime/tabs/soft-text-eligibility.md" });
            } else failures.push(`${label}: ${error.message}`);
          }
          if (recipe.part === "indicator") {
            const actual = measureColorContrast(resolveColor(use.tokenId, theme), resolveColorSurface(use.parentSurfaceId, theme, use.parentBackgroundId));
            if (recipe.requiredStateContrast !== 3 || actual < 3) failures.push(`${label}: necessary selected indicator contrast ${actual.toFixed(3)} < 3`);
          }
          if (!existsSync(join(root, use.evidenceRef))) failures.push(`Missing Tabs color consumer evidence: ${recipe.id}`);
        }
        continue;
      }
      if (tagThreeAuthorized && consumer.symbol === "tagSelectPaints") {
        checkUse(consumer.surface, consumer.parentSurfaces, "TagSelect popup surface");
        checkUse(consumer.boundary, consumer.parentSurfaces, "TagSelect decorative popup edge");
        for (const recipe of consumer.recipes) for (const theme of ["light", "dark"]) for (const parent of consumer.parentSurfaces) {
          if (recipe.background) checkColor({ ...recipe.background, theme, parentSurfaceId: parent }, recipe.id);
          checkColor({ ...recipe.foreground, theme, parentSurfaceId: recipe.background?.tokenId ?? parent,
            ...(recipe.background ? { parentBackgroundId: parent } : {}) }, recipe.id);
        }
        continue;
      }
      if (tagDomainAuthorized) {
        for (const recipe of consumer.recipes) for (const theme of ["light", "dark"]) for (const parent of consumer.parentSurfaces) {
          try {
            for (const { use, actual, minimum, part, adjacentTokenId } of measureTagDomainColorRecipe(recipe, theme, parent)) if (actual < minimum) pendingContrastFindings.push({
              status: "pending-review", acceptedException: false, filePath, recipeId: recipe.id, theme, state: "static", part,
              tokenId: use.tokenId, content: use.content, parentSurfaceId: recipe.background?.tokenId ?? parent, parentBackgroundId: parent,
              ...(adjacentTokenId ? { adjacentTokenId } : {}), ...(recipe.overlay ? { overlay: recipe.overlay } : {}), actual, minimum, evidenceRef: use.evidenceRef,
            });
          } catch (error) { failures.push(`${recipe.id} ${theme} ${parent}: ${error.message}`); }
        }
        continue;
      }
      if (selectAuthorized) {
        for (const recipe of consumer.recipes) for (const theme of ["light", "dark"]) for (const parent of consumer.parentSurfaces) {
          try {
            const measured = measureSelectColorRecipe(recipe, theme, parent);
            for (const layer of recipe.layers) validateColorUse({ ...layer, theme, parentSurfaceId: parent });
            const immediate = recipe.layers.at(-1)?.tokenId ?? parent;
            const checks = [[recipe.foreground, measured.textContrast, immediate, "foreground"], ...(recipe.boundary ? [[recipe.boundary, measured.boundaryInnerContrast, immediate, "boundary-inner"], [recipe.boundary, measured.boundaryOuterContrast, parent, "boundary-outer"]] : [])];
            for (const [use, actual, parentSurfaceId, part] of checks) {
              const minimum = use.content === "text" ? 4.5 : ["meaningful-icon", "essential-boundary"].includes(use.content) ? 3 : 0;
              const finding = { status: "pending-review", acceptedException: false, filePath, recipeId: recipe.id,
                tokenId: use.tokenId, content: use.content, appearance: recipe.appearance, state: recipe.state, theme, part,
                parentSurfaceId, parentBackgroundId: parent, surfaceLayers: recipe.layers.map((layer) => layer.tokenId), actual, minimum, evidenceRef: use.evidenceRef };
              // Eligibility uses the immediate surface identity; contrast uses the complete, explicitly declared paint stack.
              try { validateColorUse({ ...use, theme, parentSurfaceId, parentBackgroundId: parent }); }
              catch (error) { if (!/^Insufficient contrast:/.test(error.message) && error.message !== "Weak Neutral needs non-critical, non-interactive content") throw error; }
              if (minimum && colorCategoryProfiles.some((profile) => profile.weakIds.includes(use.tokenId))) pendingEligibilityFindings.push({ ...finding, reason: "Weak Neutral needs non-critical, non-interactive content" });
              if (actual < minimum) pendingContrastFindings.push(finding);
            }
          } catch (error) { failures.push(`${recipe.id} ${theme} ${parent}: ${error.message}`); }
        }
        continue;
      }
      const inputReview = inputAuthorized && Object.hasOwn(inputConsumerContent, consumer.symbol);
      const optionReview = consumer.refinement === "option-button-content" && consumer.symbol === "optionFeedbackControlColors";
      if (tagAuthorized && ["tagColorPaints", "tagSolidPaints"].includes(consumer.symbol)) {
        for (const recipe of consumer.recipes) for (const theme of ["light", "dark"]) for (const parentId of consumer.parentSurfaces) for (const state of recipe.states) {
          try {
            const measured = measureTagColorRecipe(recipe, theme, parentId, state);
            if (state === "disabled") continue;
            const parts = state.startsWith("close-") ? [["close-icon", recipe.icon, measured.iconContrast, 3]]
              : [["label", recipe.foreground, measured.textContrast, 4.5], ["selection-icon", recipe.selectionIcon, measured.selectionIconContrast, 3],
                ...(recipe.boundary ? [[recipe.boundaryScope, recipe.boundary, measured.boundaryContrast, 3]] : [])];
            for (const [part, use, actual, minimum] of parts) if (actual < minimum) pendingContrastFindings.push({
              status: "pending-review", acceptedException: false, filePath, recipeId: recipe.id, color: recipe.color, appearance: recipe.appearance, state, part,
              tokenId: use.tokenId, content: use.content, theme, parentSurfaceId: recipe.background?.tokenId ?? parentId, parentBackgroundId: parentId,
              ...(use.alpha === undefined ? {} : { alpha: use.alpha, alphaOperation: use.alphaOperation }),
              actual, minimum, evidenceRef: use.evidenceRef, paintScope: "tag-isolated-group",
            });
          } catch (error) { failures.push(`${recipe.id} ${theme} ${parentId} ${state}: ${error.message}`); }
        }
        continue;
      }
      if (optionReview && JSON.stringify(consumer.recipes.map(({ state, presentation }) => `${state}:${presentation}`)) !== JSON.stringify(["correct:label", "correct:symbol", "wrong:label", "wrong:symbol"])) failures.push("OptionButton review must retain both text and meaningful-icon presentations for each result");
      for (const recipe of consumer.recipes) {
        const paginationIconReview = paginationAuthorized && paginationMetadataMatches && consumer.symbol === "paginationIconClassName";
        const foregroundContent = paginationIconReview ? "meaningful-icon" : inputReview ? inputConsumerContent[consumer.symbol] : optionReview ? (recipe.presentation === "symbol" ? "meaningful-icon" : "text") : consumer.kind === "static" && consumer.symbol !== "questionNumberMarkerColors" ? "text" : "meaningful-icon";
        if (consumer.kind === "static" && consumer.foregroundContent !== (optionReview ? "text-and-meaningful-icon" : foregroundContent)) failures.push(`Static color recipe must preserve its declared text or meaningful-icon role: ${consumer.symbol}`);
        if (recipe.foreground.content !== (recipe.state === "disabled" ? "disabled" : foregroundContent)) failures.push(`Registered foreground must keep its real content contrast: ${recipe.id}`);
        const pendingReview = ["pending-review", "declared-review"].includes(consumer.contrastReview) && (tableVisualAuthorized || paginationAuthorized || inputReview || questionNumberAuthorized || (optionButtonContentAuthorized && optionReview));
        for (const theme of ["light", "dark"]) for (const parent of tableVisualAuthorized && recipe.parentSurfaces ? recipe.parentSurfaces : consumer.parentSurfaces) {
          const label = `${recipe.id} ${theme} ${parent}`;
          if (recipe.background) checkColor({ ...recipe.background, theme, parentSurfaceId: parent }, label);
          if (inputReview && consumer.symbol === "inputRootRecipe" && recipe.boundary?.content !== (recipe.state === "disabled" ? "disabled" : "essential-boundary")) failures.push(`Input boundaries must keep their essential-boundary role: ${recipe.id}`);
          if (recipe.boundary) checkColor({ ...recipe.boundary, theme, parentSurfaceId: parent }, label, pendingReview);
          checkColor({ ...recipe.foreground, theme, parentSurfaceId: recipe.background?.tokenId ?? parent,
            ...(recipe.background ? { parentBackgroundId: parent } : {}) }, label, pendingReview);
        }
        if (!existsSync(join(root, recipe.foreground.evidenceRef.split("#")[0]))) failures.push(`Missing color consumer evidence: ${recipe.id}`);
      }
    }
  }
  if (cssConsumers.length) {
    const found = new Set();
    const uncommented = source.replace(/\/\*[\s\S]*?\*\//g, (comment) => " ".repeat(comment.length));
    for (const block of uncommented.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selector = block[1].trim().replace(/\s+/g, " ");
      const bodyStart = block.index + block[0].indexOf("{") + 1;
      for (const declaration of block[2].matchAll(/([a-z-]+)\s*:\s*([^;{}]+);/g)) {
        const property = declaration[1], value = declaration[2].trim();
        if (!categorySource.test(value)) continue;
        const consumer = cssConsumers.find((entry) => entry.selector === selector && entry.property === property && entry.value === value);
        if (!consumer || found.has(consumer)) { failures.push(`Unregistered Category CSS paint ${filePath}: ${selector} ${property}`); continue; }
        found.add(consumer);
        const output = colorTokenOutputs.find((entry) => entry.id === consumer.use.tokenId);
        if (consumer.sourceAlias) {
          const alias = cssConsumers.find((entry) => entry.selector === consumer.sourceAlias.selector && entry.property === consumer.sourceAlias.property);
          if (!alias || !alias.property.startsWith("--rain-local-") || !selector.startsWith(`${alias.selector} `)
            || value !== `var(${alias.property})` || JSON.stringify(alias.use) !== JSON.stringify(consumer.use)) {
            failures.push(`Category CSS scoped alias mismatch: ${selector} ${property}`);
          }
        } else if (!output || !value.includes(`var(${output.variable})`)) failures.push(`Category CSS source mismatch: ${selector} ${property}`);
        if (property.startsWith("--rain-local-") && (!output || consumer.use.alphaOperation !== "replace"
          || value !== `rgb(from var(${output.variable}) r g b / ${consumer.use.alpha}%)`)) failures.push(`Category CSS local Alpha mismatch: ${selector} ${property}`);
        checkUse(consumer.use, consumer.parentSurfaces, `${selector} ${property}`, ["pending-review", "declared-review"].includes(consumer.contrastReview), consumer.parentBackgrounds);
        if (selectAuthorized) for (const recipe of consumer.focusPairs ?? []) for (const theme of ["light", "dark"]) for (const parent of consumer.parentSurfaces) {
          const actual = measureSelectColorRecipe(recipe, theme, parent).textContrast;
          if (actual < 3) pendingContrastFindings.push({ status: "pending-review", acceptedException: false, filePath, recipeId: recipe.id, part: recipe.part,
            tokenId: recipe.foreground.tokenId, content: "essential-boundary", appearance: recipe.appearance, state: recipe.state, theme,
            parentSurfaceId: recipe.layers.at(-1)?.tokenId ?? parent, parentBackgroundId: parent, surfaceLayers: recipe.layers.map((layer) => layer.tokenId), actual, minimum: 3, evidenceRef: recipe.foreground.evidenceRef });
        }
        ranges.push([bodyStart + declaration.index, bodyStart + declaration.index + declaration[0].length]);
      }
    }
    for (const consumer of cssConsumers) if (!found.has(consumer)) failures.push(`Missing registered CSS paint: ${filePath} ${consumer.selector} ${consumer.property}`);
  }
  let unregistered = source;
  for (const [start, end] of ranges.sort((a, b) => b[0] - a[0])) unregistered = unregistered.slice(0, start) + " ".repeat(end - start) + unregistered.slice(end);
  if (categorySource.test(unregistered)) failures.push(`Category/local colors require registered Token consumer metadata: ${filePath}`);
  // UI native rules have an exact B2 exception validator; this pass verifies every Category paint in that file.
  if (filePath.endsWith(".css") && !(filePath === "packages/ui/src/styles.css" && selectAuthorized)) {
    if (dropdownFamilyAuthorized || expectedDialog.length) unregistered = prepareOverlayNativeCss(filePath, unregistered, failures);
    failures.push(...validateTokenConsumerCss({ filePath, source: unregistered }));
  }
  return [...new Set(failures)];
}

// Only native system paints and the existing Dialog shadow; every Category paint is checked above.
function prepareOverlayNativeCss(filePath, source, failures) {
  const walk = (css, media = "") => parseTopLevelCssBlocks(css, "Dropdown native CSS", failures).map(({ header, body }) => {
    if (header.startsWith("@media")) return `${header} {${walk(body, header)}}`;
    const masked = body.replace(/([a-z-]+)\s*:\s*([^;{}]+);/g, (declaration, property, raw) => {
      const value = raw.trim();
      if (media === "@media (forced-colors: active)" && (
        (filePath === "packages/ui/src/dialog/dialog.css" && ((header === ".rain-dialog" && ["background-color:Canvas", "color:CanvasText", "border-color:ButtonText", "box-shadow:none"].includes(`${property}:${value}`))
          || (header === ".rain-dialog-title, .rain-dialog-description" && property === "color" && value === "CanvasText")
          || (header === ".rain-dialog-footer" && ["background-color:Canvas", "border-color:CanvasText"].includes(`${property}:${value}`))))
        || (filePath === "packages/ui/src/separator/separator.css" && header === ".rain-separator" && property === "background-color" && value === "CanvasText")
      )) return "";
      if (filePath === "apps/playground/src/docs/components/dropdown-page.css" && !media && header === ".dropdown-example-dialog"
        && property === "box-shadow" && value === "var(--rain-shadow-dialog)") return "";
      if (filePath === "packages/ui/src/dropdown-menu/dropdown-menu.css" && media === "@media (forced-colors: active)"
        && [".rain-popup", '.rain-menu-item[data-disabled]', '.rain-menu-item [data-slot="indicator"], .rain-menu-item[data-checked] [data-slot="indicator"]',
          '.rain-menu-item:is([data-checked], [data-selected="true"]) [data-slot="label"]'].includes(header)
        && ["color", "background-color", "border-color"].includes(property) && ["Canvas", "CanvasText", "ButtonText", "GrayText", "LinkText"].includes(value)) return "";
      return declaration;
    });
    return `${header} {${masked}}`;
  }).join("\n");
  return walk(source);
}

function attribute(node, name) {
  const value = node.attributes.find((part) => part.type === "JSXAttribute" && part.name.name === name)?.value;
  if (value?.type === "Literal") return String(value.value);
  if (value?.type === "JSXExpressionContainer" && value.expression.type === "Literal") return String(value.expression.value);
}

function matches(node, selector) {
  const attr = selector.match(/^\[([a-z-]+)="([^"]+)"\]$/);
  if (attr) return attribute(node, attr[1]) === attr[2];
  return selector.startsWith(".") && (attribute(node, "className") ?? "").split(/\s+/).includes(selector.slice(1));
}

function inScope(node, selector, paintClass) {
  for (let current = node; current; current = current.parent) {
    const element = current.type === "JSXElement" ? current.openingElement : current;
    if (element.type === "JSXOpeningElement" && matches(element, selector) && (!paintClass || (attribute(element, "className") ?? "").split(/\s+/).includes(paintClass))) return true;
  }
  return false;
}

function renderedTheme(node) {
  for (let current = node; current; current = current.parent) {
    if (current.type !== "JSXOpeningElement" && current.type !== "JSXElement") continue;
    const element = current.type === "JSXElement" ? current.openingElement : current;
    if (!element.attributes.some((part) => part.type === "JSXAttribute" && part.name.name === "data-rain-theme")) continue;
    const theme = attribute(element, "data-rain-theme");
    if (theme !== "light" && theme !== "dark") throw new Error("Actual color consumers require a literal supported theme boundary");
    return theme;
  }
  return "light";
}

function emittedPaint(outputs, entry) {
  const utility = outputs.utilities.find((item) => item.className === entry.className);
  const block = outputs.scopedCss.match(new RegExp(`${escapeRegex(entry.scope)} \\.${escapeRegex(entry.className)} \\{([^}]+)\\}`))?.[1];
  const value = utility?.declarations[entry.use.property] ?? block?.match(new RegExp(`${escapeRegex(entry.use.property)}: ([^;]+);`))?.[1];
  const variable = value?.match(/^var\((--rain-[a-z0-9-]+)\)$/)?.[1];
  if (variable?.startsWith("--rain-category-")) return outputs.colorThemes[entry.use.theme ?? "light"]?.[variable];
  return variable ? outputs.variables[variable] ?? outputs.scopedCss.match(new RegExp(`${escapeRegex(variable)}: ([^;]+);`))?.[1] : value;
}

/** A bounded JSX checker: public inventory lookups and same-file class forwarding stay declarative. */
export function validateTokenConsumerSource({ filePath, source, outputs = getTokenFoundationOutputs(), root = process.cwd() }) {
  const failures = [];
  const parsed = parseSync(filePath, source);
  if (parsed.errors.length) return [...failures, `Cannot parse Token consumer ${filePath}: ${parsed.errors.map((error) => error.message).join("; ")}`];
  const tree = parsed.program;
  const sourceText = (node) => source.slice(node.start, node.end);
  const nodes = [], allNodes = [], bindings = [], initializers = new Map(), inventories = new Map(), helpers = new Map();
  const colorConsumers = outputs.colorConsumers.filter((entry) => entry.filePath === filePath);
  const displays = outputs.displayConsumers.filter((entry) => entry.filePath === filePath);
  const allowed = new Set([
    ...strings(outputs.classNames), ...outputs.utilities.map((item) => item.className),
    ...Object.keys(outputs.themeVariables).filter((name) => name.startsWith("--spacing-rain-")).flatMap((name) =>
      ["h", "w", "min-h", "min-w", "max-h", "max-w", "size"].map((prefix) => `${prefix}-${name.slice("--spacing-".length)}`)),
    ...Object.keys(semanticColorTokens).flatMap((name) => ["text", "bg", "border", "outline", "ring"].map((prefix) => `${prefix}-rain-${name}`)),
  ]);
  // The older guard scans substrings. Hide only full registered classes so a
  // category name such as text-neutral-1 is not mistaken for Tailwind's palette.
  const legacySource = source.replace(/[A-Za-z][A-Za-z0-9_:/!.-]*/g, (word) => allowed.has(word) ? "registered-token" : word);
  failures.push(...validateProtectedTailwindSource({ filePath, source: legacySource }));
  const bindingNames = (pattern) => {
    if (!pattern) return [];
    if (pattern.type === "Identifier") return [pattern.name];
    if (pattern.type === "ObjectPattern") return pattern.properties.flatMap((part) => bindingNames(part.value ?? part.argument));
    if (pattern.type === "ArrayPattern") return pattern.elements.flatMap(bindingNames);
    if (pattern.type === "AssignmentPattern") return bindingNames(pattern.left);
    if (pattern.type === "RestElement") return bindingNames(pattern.argument);
    return [];
  };
  const visit = (node, parent) => {
    if (!node || typeof node !== "object" || typeof node.type !== "string") return;
    Object.defineProperty(node, "parent", { value: parent });
    allNodes.push(node);
    if (node.type === "VariableDeclarator") bindings.push(...bindingNames(node.id));
    if (["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(node.type)) bindings.push(...bindingNames(node.id), ...node.params.flatMap(bindingNames));
    if (node.type === "ClassDeclaration" || node.type === "CatchClause") bindings.push(...bindingNames(node.id ?? node.param));
    if (node.type === "JSXOpeningElement") nodes.push(node);
    if (node.type === "VariableDeclarator" && node.id.type === "Identifier" && node.init) {
      if (initializers.has(node.id.name)) failures.push(`Ambiguous duplicate local binding in Token consumer ${filePath}: ${node.id.name}`);
      initializers.set(node.id.name, node.init);
    }
    if (node.type === "ImportDeclaration") {
      for (const item of node.specifiers.filter((item) => item.type === "ImportSpecifier")) {
        const original = item.imported.name;
        if (["rainCn", "defineRainLocalRecipe"].includes(original) && node.source.value === "@rain-next/ui") helpers.set(item.local.name, original);
        if (original === "tokenClassNames" && /token-classes\.generated$/.test(node.source.value)) inventories.set(item.local.name, outputs.classNames);
        if (original === "typographyUtilityClassNames" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, outputs.classNames.typography);
        if (original === "iconSizeClassNames" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, outputs.classNames.iconSize);
        if (original === "inputSizeClassNames" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, outputs.classNames.inputSize);
        if (original === "inputClearSizeClassName" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, outputs.classNames.inputClearSize);
        if (original === "selectSizeClassNames" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, outputs.classNames.selectSize);
        if (original === "selectValueHeightClassNames" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, outputs.classNames.selectValueHeight);
        if (original === "selectActionSizeClassName" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, outputs.classNames.selectActionSize);
        if (original === "iconButtonControlSizeClassNames" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, outputs.classNames.iconButtonControlSize);
        if (original === "colorTokenOutputs" && node.source.value === "@rain-next/foundations") inventories.set(item.local.name, colorTokenOutputs);
      }
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach((child) => visit(child, node));
      else visit(value, node);
    }
  };
  visit(tree);
  for (const name of bindings) if (inventories.has(name) || helpers.has(name) || ["Map", "Object"].includes(name)) failures.push(`Trusted Token binding cannot be shadowed in ${filePath}: ${name}`);
  const rootBinding = (expression) => expression?.type === "MemberExpression" ? rootBinding(expression.object) : expression?.type === "Identifier" ? expression.name : undefined;
  for (const node of allNodes) {
    const target = node.type === "AssignmentExpression" ? node.left : node.type === "UpdateExpression" ? node.argument : undefined;
    if (target && (inventories.has(rootBinding(target)) || initializers.has(rootBinding(target)))) failures.push(`Token inventory bindings cannot be reassigned in ${filePath}`);
    if (node.type === "CallExpression") {
      const method = node.callee.type === "MemberExpression" && (node.callee.property.name ?? node.callee.property.value);
      const mutates = ["assign", "defineProperty", "defineProperties", "setPrototypeOf"].includes(method) && rootBinding(node.callee.object) === "Object" ? node.arguments[0] :
        ["set", "delete", "clear", "push", "pop", "shift", "unshift", "splice", "sort", "reverse", "fill", "copyWithin"].includes(method) ? node.callee.object : undefined;
      if (mutates && (inventories.has(rootBinding(mutates)) || initializers.has(rootBinding(mutates)))) failures.push(`Token inventory bindings cannot be mutated in ${filePath}`);
    }
  }


  function inventory(expression, seen = new Set()) {
    if (!expression) return undefined;
    if (expression.type === "TSAsExpression" || expression.type === "TSNonNullExpression") return inventory(expression.expression, seen);
    if (expression.type === "Literal") return expression.value;
    if (expression.type === "Identifier") {
      if (inventories.has(expression.name)) return inventories.get(expression.name);
      if (!seen.has(expression.name)) return inventory(initializers.get(expression.name), new Set([...seen, expression.name]));
    }
    if (expression.type === "CallExpression" && helpers.get(expression.callee.name) === "defineRainLocalRecipe") return inventory(expression.arguments[0], seen);
    if (expression.type === "NewExpression" && expression.callee.name === "Map") {
      const mapping = expression.arguments[0];
      const callback = mapping?.arguments?.[0];
      const parameter = callback?.params?.[0]?.name;
      const pair = callback?.body?.elements;
      if (mapping?.type === "CallExpression" && mapping.callee.property?.name === "map" && parameter &&
          pair?.length === 2 && pair[0].type === "MemberExpression" && pair[0].object.name === parameter &&
          pair[0].property.name === "id" && pair[1].name === parameter) {
        const values = inventory(mapping.callee.object, seen);
        if (Array.isArray(values)) return Object.fromEntries(values.map((value) => [value.id, value]));
      }
    }
    if (expression.type === "CallExpression" && expression.callee.type === "MemberExpression" && expression.callee.property.name === "get") {
      const values = inventory(expression.callee.object, seen);
      if (values) return Object.values(values);
    }
    if (expression.type === "ObjectExpression" && expression.properties.every((item) => item.type === "Property" && !item.computed)) {
      return Object.fromEntries(expression.properties.map((item) => [item.key.name ?? item.key.value, inventory(item.value, seen)]));
    }
    if (expression.type === "MemberExpression") {
      const object = inventory(expression.object, seen);
      const key = expression.computed ? (expression.property.type === "Literal" ? expression.property.value : undefined) : expression.property.name;
      if (object && key === undefined) return Object.values(object);
      return Array.isArray(object) ? object.flatMap((item) => item?.[key] ?? []) : object?.[key];
    }
  }

  function classes(expression, seen = new Set()) {
    if (expression.type === "Literal" && typeof expression.value === "string") return expression.value.split(/\s+/).filter(Boolean);
    if (expression.type === "TemplateLiteral" && expression.expressions.length === 0) return expression.quasis[0].value.cooked.split(/\s+/).filter(Boolean);
    if (expression.type === "ConditionalExpression") return [...classes(expression.consequent, seen), ...classes(expression.alternate, seen)];
    if (expression.type === "Identifier") {
      if (expression.name === "undefined") return [];
      if (initializers.has(expression.name) && !seen.has(expression.name)) return classes(initializers.get(expression.name), new Set([...seen, expression.name]));
      if (expression.name === "className") {
        let owner = expression.parent;
        while (owner && owner.type !== "FunctionDeclaration") owner = owner.parent;
        const calls = owner?.id && nodes.filter((node) => node.name.name === owner.id.name);
        if (owner && owner.parent?.type !== "ExportNamedDeclaration" && calls?.length &&
            owner.params.some((param) => param.type === "ObjectPattern" && param.properties.some((part) => part.value?.name === "className")) &&
            calls.every((node) => node.attributes.some((part) => part.type === "JSXAttribute" && part.name.name === "className"))) return [];
      }
    }
    if (expression.type === "Literal" && (expression.value === false || expression.value === null)) return [];
    if (expression.type === "CallExpression" && helpers.get(expression.callee.name) === "rainCn") return expression.arguments.flatMap((item) => classes(item, seen));
    if (expression.type === "MemberExpression") {
      const values = inventory(expression);
      if (values !== undefined) return strings(values).flatMap((value) => value.split(/\s+/).filter(Boolean));
    }
    failures.push(`Unregistered dynamic class expression in ${filePath}: ${sourceText(expression)}`);
    return [];
  }

  const nodeClasses = new Map(nodes.map((node) => {
    const value = node.attributes.find((part) => part.type === "JSXAttribute" && part.name.name === "className")?.value;
    return [node, value ? classes(value.type === "JSXExpressionContainer" ? value.expression : value) : []];
  }));
  function nearestSurface(node, entry) {
    // A foreground can share its surface node; background paint is carried by an ancestor.
    for (let current = entry.use.property === "background-color" ? node.parent.parent : node.parent; current; current = current.parent) {
      if (current.type !== "JSXElement") continue;
      const element = current.openingElement;
      const paints = nodeClasses.get(element).filter((name) => name.startsWith("bg-rain-") || displays.some((item) => item.kind === "comparison-canvas" && item.className === name));
      if (!paints.length) continue;
      if (paints.length !== 1) throw new Error("Parent surface has ambiguous background paint");
      return colorConsumers.find((candidate) => candidate.use.property === "background-color" && candidate.className === paints[0] && matches(element, candidate.selector) && inScope(element, candidate.scope));
    }
  }
  const matchedConsumers = new Set(), matchedDisplays = new Set();
  for (const node of nodes) {
    if (node.attributes.some((part) => part.type === "JSXSpreadAttribute")) failures.push(`Opaque JSX spread is forbidden in Token consumers: ${filePath}`);
    if (node.attributes.some((part) => part.type === "JSXAttribute" && part.name.name === "style")) failures.push(`Inline visual style is forbidden in ${filePath}; use registered Tokens`);
    for (const className of nodeClasses.get(node)) {
      const canvas = displays.find((entry) => entry.kind === "comparison-canvas" && entry.className === className);
      if (canvas) {
        let matchingTheme = false;
        try { matchingTheme = renderedTheme(node) === canvas.themeMapping; } catch { /* A comparison canvas needs a known theme. */ }
        if (canvas.displayOnly !== true || !matchingTheme || !matches(node, canvas.selector) ||
            canvas.scope !== colorTokenOutputs[0].displayScope || !outputs.scopedCss.includes(`${canvas.scope} .${className} {`)) failures.push(`Display-only canvas scope mismatch in ${filePath}`);
        else matchedDisplays.add(canvas);
        continue;
      }
      if (/^(bg|text)-rain-swatch-/.test(className)) {
        const entry = displays.find((item) => item.kind !== "comparison-canvas" && matches(node, item.selector));
        const foreground = className.startsWith("text-");
        const registered = colorTokenOutputs.some((output) => (foreground ? output.displayForegroundClassName : output.displayClassName) === className);
        if (!entry || !registered || entry.displayOnly !== true || entry.scope !== colorTokenOutputs[0].displayScope || attribute(node, "aria-hidden") !== "true"
          || (foreground && entry.kind !== "pairing-foreground") || (!foreground && entry.kind === "pairing-foreground")
          || (entry.kind.startsWith("pairing-") && (!entry.consumerScope || !inScope(node, entry.consumerScope)))) failures.push(`Display-only swatch escaped its registered decorative consumer in ${filePath}`);
        else matchedDisplays.add(entry);
        continue;
      }
      if ((className.includes("-rain-") || className.startsWith("rain-type-")) && !allowed.has(className)) failures.push(`Unregistered Rain utility in ${filePath}: ${className}`);
      if (!className.includes("-rain-category-") && !className.includes("-rain-local-")) continue;
      const entry = colorConsumers.find((item) => item.className === className && matches(node, item.selector));
      if (!entry) { failures.push(`Color utility needs matching consumer metadata in ${filePath}: ${className}`); continue; }
      matchedConsumers.add(entry);
      if (!inScope(node, entry.scope)) failures.push(`Color consumer scope mismatch in ${filePath}: ${entry.selector}`);
      try {
        if (renderedTheme(node) !== (entry.use.theme ?? "light")) throw new Error("Rendered theme does not match consumer metadata");
        const resolved = validateColorUse(entry.use);
        // Core supports leaf compositing math. This batch does not prove DOM group opacity.
        if (entry.use.componentOpacity !== undefined) throw new Error("Consumer componentOpacity needs DOM compositing evidence; not supported in this batch");
        if (entry.use.evidenceRef) {
          const evidencePath = resolve(root, entry.use.evidenceRef.split("#")[0]);
          let verified = false;
          try {
            const resolvedPath = realpathSync(evidencePath), fromRoot = relative(realpathSync(root), resolvedPath);
            verified = fromRoot !== ".." && !fromRoot.startsWith("../") && statSync(resolvedPath).isFile() && readFileSync(resolvedPath).length > 0;
          } catch { /* A claim without its local evidence is not verified. */ }
          if (!verified) throw new Error("Consumer evidence must be an existing nonempty repository file");
        }
        const token = colorRegistry.find((item) => item.id === entry.use.tokenId);
        const categoryOutput = colorTokenOutputs.find((item) => item.id === token?.id);
        if (className.includes("-rain-category-") && !categoryOutput?.utilities.some((item) => item.className === className && item.role === entry.use.role && item.property === entry.use.property)) throw new Error("Class, Token, role and property do not match");
        if (emittedPaint(outputs, entry) !== colorToCss(resolved.value)) throw new Error("Rendered color does not match the declared Alpha operation");
        if (entry.use.parentSurfaceId) {
          const parent = nearestSurface(node, entry);
          if (!parent || parent === entry || parent.use.tokenId !== entry.use.parentSurfaceId) throw new Error("Declared parent must match the nearest painted surface");
          if ((parent.use.theme ?? "light") !== (entry.use.theme ?? "light")) throw new Error("Parent surface theme does not match the consumer theme");
          if (parent.use.alpha !== undefined || parent.use.componentOpacity !== undefined) throw new Error("Parent paint overrides need explicit surface chain evidence");
          if (entry.use.parentBackgroundId && parent.use.parentSurfaceId !== entry.use.parentBackgroundId) throw new Error("Declared surface chain does not match the painted parent background");
        }
      } catch (error) { failures.push(`Invalid color consumer ${filePath} ${entry.selector}: ${error.message}`); }
    }
  }
  for (const entry of colorConsumers) if (!matchedConsumers.has(entry)) failures.push(`Missing registered color consumer ${filePath}: ${entry.selector}`);
  for (const entry of displays) if (!matchedDisplays.has(entry)) failures.push(`Missing registered display consumer ${filePath}: ${entry.selector}`);
  return [...new Set(failures)];
}

export function validateTokenConsumerCss({ filePath, source, outputs = getTokenFoundationOutputs() }) {
  const authored = source.replace(/\/\* token-foundations-v1:scoped-color:start[^]*?\/\* token-foundations-v1:scoped-color:end \*\//g, "").replace(/\/\*[^]*?\*\//g, "");
  const failures = [];
  if (/--rain-ref-|--rain-category-|--rain-local-|bg-rain-swatch-|#[\da-f]{3,8}\b|\b(?:rgb|hsl|oklch)\s*\(/i.test(authored)) failures.push(`Raw/private or unregistered Category/display color in ${filePath}`);
  const generatedSelectors = [...outputs.scopedCss.matchAll(/\.([a-z][a-z0-9-]*)\s*\{/g)].map((match) => match[1]);
  for (const className of generatedSelectors) {
    if (new RegExp(`\\.${escapeRegex(className)}(?![\\w-])`).test(authored)) failures.push(`Managed scoped selector cannot be redefined outside its generated section in ${filePath}: ${className}`);
  }
  if (new Set(generatedSelectors).size !== generatedSelectors.length) failures.push(`Managed scoped selectors have duplicate generated rules in ${filePath}`);
  const semanticVariables = new Set(Object.keys(semanticColorTokens).map((name) => `var(--rain-color-${name})`));
  for (const match of authored.matchAll(/(?:^|[;{])\s*([a-z-]+)\s*:\s*([^;}]+)/gi)) {
    const property = match[1].toLowerCase(), value = match[2].trim();
    if (!/^(?:color|.*-color|background(?:-image)?|fill|stroke|box-shadow|text-shadow|filter)$/.test(property)) continue;
    const inherited = ["transparent", "inherit", "currentcolor", "none"].includes(value.toLowerCase());
    const semanticName = value.match(/^var\(--rain-color-([a-z-]+)\)$/)?.[1];
    const validSemantic = semanticVariables.has(value) &&
      (!/^(?:color|fill|stroke|text-decoration-color)$/.test(property) || semanticName.startsWith("text-") || /^(?:semantic-(?:success|warning|error|info)|intelligence-foreground)$/.test(semanticName)) &&
      (!/^(?:border.*-color|outline-color)$/.test(property) || /^(?:border|focus)-/.test(semanticName)) &&
      !["box-shadow", "text-shadow", "filter", "background-image"].includes(property);
    if (!inherited && !validSemantic) failures.push(`Unregistered visual color declaration in ${filePath}: ${property}: ${value}`);
  }
  for (const match of authored.matchAll(/(?:^|[;{])\s*(border|outline)(?:-(?:top|right|bottom|left|block|inline))?\s*:\s*([^;}]+)/g)) {
    const remainder = match[2].replace(/var\(--rain-(?:color|line-thickness|space)-[a-z0-9-]+\)/g, "").replace(/\b(?:none|solid|dashed|dotted|double|transparent|inherit|currentColor)\b/g, "").replace(/\b(?:0|[\d.]+(?:px|rem|em))\b/g, "").trim();
    if (remainder) failures.push(`Unregistered border color in ${filePath}: ${match[2]}`);
  }
  return [...new Set(failures)];
}

function sourceFiles(root, directory) {
  if (!existsSync(join(root, directory))) return [];
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory.replace(/\/$/, "")}/${entry.name}`;
    if (entry.isSymbolicLink() || ["dist", "node_modules", ".git"].includes(entry.name)) return [];
    return entry.isDirectory() ? sourceFiles(root, path) : /\.(?:tsx?|css)$/.test(path) && !/\.(?:test|generated)\./.test(path) ? [path] : [];
  });
}

export function validateButtonAliasSource(source, bridge, outputs = getTokenFoundationOutputs()) {
  const failures = [];
  const mappings = new Map([...bridge.matchAll(/--color-([a-z0-9-]+):\s*var\((--rain-button-[a-z0-9-]+)\)/g)]
    .map((match) => [match[1], match[2]]));
  for (const match of source.matchAll(/\b(bg|text|border|outline|ring)-(rain-button-[a-z0-9-]+)/g)) {
    const alias = mappings.get(match[2]);
    const value = outputs.variables[alias];
    if (!value) continue; // Geometry aliases have separate existing contracts.
    const variable = value.match(/var\((--rain-category-[a-z0-9-]+)\)/)?.[1];
    const token = colorTokenOutputs.find((entry) => entry.variable === variable);
    const property = { bg: "background-color", text: "color", border: "border-color", outline: "outline-color", ring: "box-shadow" }[match[1]];
    if (!token?.utilities.some((entry) => entry.property === property)) failures.push(`Button alias used across color roles: ${match[0]} (${alias})`);
  }
  return [...new Set(failures)];
}

export function prepareDropdownColorReview({ manifest, source }) {
  const failures = [], review = manifest?.colorReview;
  if (manifest?.id !== "dropdown-batch-one-review" || review?.contrastAcceptance !== "not-granted"
    || !Array.isArray(review?.paints) || !Array.isArray(review?.exceptions)) {
    return { failures: ["Dropdown color comparison registration is missing"], source, consumers: [] };
  }
  if (/--rain-ref-/.test(source)) failures.push("Dropdown color comparison cannot use private Tokens");
  const counts = new Map(review.exceptions.map(entry => [entry, 0]));
  const walk = (css, media = "") => parseTopLevelCssBlocks(css, "Dropdown color comparison", failures).map(({ header, body }) => {
    if (header.startsWith("@media")) return `${header} {${walk(body, header)}}`;
    const masked = body.replace(/([a-z-]+)\s*:\s*([^;{}]+);/g, (declaration, property, rawValue) => {
      const value = rawValue.trim();
      const entry = review.exceptions.find(item => item.selector === header && item.property === property && item.value === value && item.media === media);
      if (!entry) return declaration;
      counts.set(entry, counts.get(entry) + 1);
      const sourceObservation = entry.kind === "observed-source" && entry.theme === "light" && !media
        && header.split(",").every(part => part.trim().startsWith('[data-flavor="source"].dr-surface'));
      const geometry = entry.kind === "local-geometry" && !media
        && /^(?:--rain-local-dropdown-(?:pad-y|description-pad-y|shadow|layer)|padding|padding-block|box-shadow|z-index)$/.test(property);
      const systemColor = entry.kind === "system-color" && media === "@media (forced-colors: active)"
        && ["color", "background", "border-color"].includes(property) && ["Canvas", "CanvasText", "Highlight"].includes(value);
      if (entry.acceptedException !== false || entry.promotion !== "not-proposed" || !(sourceObservation || geometry || systemColor)) {
        failures.push(`Dropdown observation is outside its exact scope: ${header} ${property}`);
        return declaration;
      }
      return " ".repeat(declaration.length);
    });
    return `${header} {${masked}}`;
  }).join("\n");
  const maskedSource = walk(source);
  for (const [entry, count] of counts) if (count !== 1) failures.push(`Dropdown observation must appear exactly once: ${entry.selector} ${entry.property} (${count})`);
  const consumers = review.paints.map(entry => {
    const [selector, property, value, tokenId, content, parentSurfaces, recipeId, brandIntent, interaction, critical] = entry;
    if (!["interactive", "non-interactive"].includes(interaction) || typeof critical !== "boolean") failures.push(`Dropdown content purpose must be explicit: ${selector}`);
    const role = tokenId.startsWith("OnColor/") ? "icon" : tokenId.split("/")[0].toLowerCase();
    return {
      filePath: "apps/playground/src/experiments/headless/review.css", selector, property, value,
      scope: ".dr-surface, .dropdown-review, .dropdown-layer", parentSurfaces, contrastReview: "pending-review",
      use: { tokenId, role, content, property: property.startsWith("border") ? "border-color" : property === "background" || property === "accent-color" ? "background-color" : "color",
        context: "local-recipe", recipeId, evidenceRef: "docs/plans/2026-09-09-dropdown-family-construction-plan.md",
        ...(brandIntent ? { brandIntent } : {}), interaction, critical,
        parentBackgroundId: "Background/Neutral/1", ...(tokenId.startsWith("OnColor/") ? { onColor: true } : {}) },
    };
  });
  return { failures, source: maskedSource, consumers, lifecycle: manifest.lifecycle };
}

export function verifyTokenFoundations({ root = process.cwd() } = {}) {
  const failures = [], outputs = getTokenFoundationOutputs();
  const exceptionCandidates = [], acceptedTextContrastExceptions = [], acceptedComponentContrastExceptions = [], pendingContrastFindings = [], pendingEligibilityFindings = [], scopedEligibilityDecisions = [];
  const bridgePath = join(root, "packages/foundations/src/tailwind-theme.css");
  const buttonBridge = existsSync(bridgePath) ? readFileSync(bridgePath, "utf8") : "";
  for (const recipe of outputs.buttonColorRecipes) {
    for (const theme of ["light", "dark"]) for (const parent of ["Background/Neutral/1", "Background/Neutral/3"]) {
      try {
        const result = validateButtonColorRecipe(recipe, theme, parent);
        const exception = result.acceptedTextContrastException;
        if (exception) {
          const scope = buttonTextContrastException;
          const label = recipe.parts.find((entry) => entry.part === scope.part);
          if (recipe.variant !== scope.variant || recipe.tone !== scope.tone
            || !scope.states.includes(recipe.state) || !scope.themes.includes(theme) || !scope.parentSurfaces.includes(parent)
            || label?.use.tokenId !== scope.foreground || label.use.role !== "text" || label.use.content !== "text"
            || Object.keys(exception).sort().join(",") !== "actual,decisionSource,minimum"
            || exception.decisionSource !== scope.decisionSource || exception.minimum !== scope.minimumContrast
            || !Number.isFinite(exception.actual) || exception.actual < 1 || exception.actual >= exception.minimum
            || exception.actual !== result.textContrast) throw new Error("Text contrast exception is outside the exact accepted Button label scope");
          exceptionCandidates.push({ recipeId: recipe.id, theme, parentId: parent, part: scope.part, ...exception });
        }
      }
      catch (error) { failures.push(`${recipe.id} ${theme} ${parent}: ${error.message}`); }
    }
  }
  if (exceptionCandidates.length) {
    try {
      const status = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8"));
      validateTokenFoundationsV1Phase(status);
      if (!status.tokenRefinements?.buttonTokenMigration?.contrastException) throw new Error("Missing the explicit user decision");
      acceptedTextContrastExceptions.push(...exceptionCandidates);
    } catch (error) { failures.push(`Button text contrast exception authorization is invalid: ${error.message}`); }
  }
  try { failures.push(...generateTokenFoundations({ root, check: true }).map((path) => `Stale Token output: ${path}`)); }
  catch (error) { failures.push(`Token outputs cannot be checked: ${error.message}`); }
  const files = sourceFiles(root, consumerDirectory);
  for (const entry of [...outputs.colorConsumers, ...outputs.displayConsumers]) if (!files.includes(entry.filePath)) failures.push(`Missing consumer source: ${entry.filePath}`);
  for (const filePath of files) {
    const source = readFileSync(join(root, filePath), "utf8");
    if (!filePath.endsWith(".css")) failures.push(...validateTokenConsumerSource({ filePath, source, outputs, root }));
    else failures.push(...validateTokenConsumerCss({ filePath, source }));
  }
  let dropdownReview;
  const dropdownCssPath = "apps/playground/src/experiments/headless/review.css";
  try {
    if (hasDropdownBatchOneAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))) {
      dropdownReview = prepareDropdownColorReview({
        manifest: JSON.parse(readFileSync(join(root, "apps/playground/src/experiments/headless/manifest.json"), "utf8")),
        source: readFileSync(join(root, dropdownCssPath), "utf8"),
      });
      failures.push(...dropdownReview.failures);
      outputs.colorCssConsumers.push(...dropdownReview.consumers);
    }
  } catch (error) { failures.push(`Dropdown color comparison cannot be checked: ${error.message}`); }
  try {
    if (hasM2Authorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))) outputs.colorCssConsumers.push(...getM2ColorConsumers(root));
  } catch (error) { failures.push(`M2 color registration cannot be checked: ${error.message}`); }
  if (existsSync(join(root, "status/current-phase.yaml")) && hasAvatarFamilyAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))) outputs.colorCssConsumers.push(...getAvatarColorConsumers());
  if (existsSync(join(root, "status/current-phase.yaml")) && hasInputNumberAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))) outputs.colorCssConsumers.push(...getInputNumberColorConsumers());
  const registeredRecipePaths = new Set([...outputs.colorRecipeConsumers, ...outputs.colorCssConsumers].map((entry) => entry.filePath).concat(paginationColorSourcePaths));
  for (const filePath of registeredRecipePaths) if (!existsSync(join(root, filePath))) failures.push(`Missing consumer source: ${filePath}`);
  for (const filePath of [...sourceFiles(root, "apps"), ...sourceFiles(root, "packages/ui/src"), ...sourceFiles(root, "packages/layouts/src")]) {
    if (filePath.startsWith(consumerDirectory)) continue;
    const source = prepareDialogLayoutSource(filePath, readFileSync(join(root, filePath), "utf8"), existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {});
    failures.push(...validateLayoutsRuntimeGeometry({ filePath, source, status: existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {} }));
    failures.push(...validateButtonAliasSource(source, buttonBridge, outputs).map((failure) => `${filePath}: ${failure}`));
    if (registeredRecipePaths.has(filePath) || filePath === "packages/ui/src/tabs/tabs.tsx") failures.push(...validateRegisteredRecipeColors({ filePath, source: filePath === dropdownCssPath && dropdownReview ? dropdownReview.source : source, outputs, root, pendingContrastFindings, pendingEligibilityFindings, scopedEligibilityDecisions }));
    else if (categorySource.test(source)) failures.push(`Category/local colors require registered Token consumer metadata: ${filePath}`);
    if (/(?:bg|text)-rain-swatch-|\.display(?:Foreground)?ClassName\b/.test(source) || outputs.displayConsumers.some((entry) => entry.className && source.includes(entry.className))) failures.push(`Display-only colors cannot be consumed outside the registered documentation scope: ${filePath}`);
  }
  let phase = {};
  try { phase = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")); }
  catch (error) { failures.push(`Token phase authorization cannot be checked: ${error.message}`); }
  for (const [label, prefix, review, authorized] of [
    ["QuestionNumber", "question-number-", phase.componentRefinements?.questionNumber, hasQuestionNumberRefinementAuthorization(phase)],
    ["OptionButton content", "option-button-content-", phase.componentRefinements?.optionButton?.contentRefinement, hasOptionButtonContentRefinementAuthorization(phase)],
  ]) {
    const acceptance = review?.contrastAcceptance;
    if (!acceptance) continue;
    const findings = pendingContrastFindings.filter((entry) => entry.recipeId.startsWith(prefix));
    const fingerprint = createHash("sha256").update(JSON.stringify(findings.map(({ status, acceptedException, ...finding }) => JSON.stringify(finding)).sort())).digest("hex");
    if (!authorized || findings.length !== acceptance.findingCount || fingerprint !== acceptance.findingsSha256) {
      failures.push(`${label} accepted contrast exceptions must match the exact user-reviewed measurements`);
      continue;
    }
    acceptedComponentContrastExceptions.push(...findings.map((entry) => ({ ...entry,
      status: "user-accepted-exception", acceptedException: true,
      unroundedActual: measureColorContrast(resolveColor(entry.tokenId, entry.theme), resolveColorSurface(entry.parentSurfaceId, entry.theme, entry.parentBackgroundId ?? undefined)),
      decisionSource: acceptance.decisionSource, acceptanceEvidence: acceptance.evidence,
    })));
    for (let index = pendingContrastFindings.length - 1; index >= 0; index--) {
      if (pendingContrastFindings[index].recipeId.startsWith(prefix)) pendingContrastFindings.splice(index, 1);
    }
  }
  if (pendingContrastFindings.length) {
    if (pendingContrastFindings.some((entry) => entry.recipeId.startsWith("question-number-"))) {
      const review = phase.componentRefinements?.questionNumber;
      if (review?.independentReview !== "findings" || review?.implementation === "completed") failures.push("QuestionNumber contrast findings remain pending: independentReview must stay findings and implementation must not claim completed");
    }
    if (pendingContrastFindings.some((entry) => entry.recipeId.startsWith("option-button-content-"))) {
      const review = phase.componentRefinements?.optionButton?.contentRefinement;
      if (review?.independentReview !== "findings" || review?.implementation === "completed") failures.push("OptionButton content contrast findings remain pending: its separate independentReview must stay findings and implementation must not claim completed");
    }
  }
  if ([...pendingContrastFindings, ...pendingEligibilityFindings].some(entry => entry.recipeId.startsWith("input-inside-label-"))) {
    const review = phase.componentRefinements?.tableRn08?.insideFieldLabels;
    if (!hasInsideFieldLabelsAuthorization(phase) || review?.independentReview !== "findings" || review?.contrastAcceptance !== "not-granted") failures.push("Inside field label color findings remain pending in their separate review; no clean review or accepted exception may be claimed");
  }
  if ([...pendingContrastFindings, ...pendingEligibilityFindings].some(entry => entry.recipeId.startsWith("input-") && !entry.recipeId.startsWith("input-inside-label-"))) {
    const review = phase.componentRefinements?.input;
    if (review?.independentReview !== "findings" || review?.implementation === "completed") failures.push("Input color findings remain pending: independentReview must stay findings and implementation must not claim completed");
  }
  if (pendingContrastFindings.some((entry) => entry.recipeId.startsWith("tag-"))) {
    const review = phase.componentRefinements?.tag;
    if (!hasTagRefinementAuthorization(phase) || review?.independentReview !== "findings" || review?.implementation === "completed" || review?.contrastAcceptance !== "not-granted") failures.push("Tag source contrast findings remain pending: keep implementation in progress, independentReview findings and no accepted exception");
  }
  if (pendingContrastFindings.some((entry) => entry.recipeId.startsWith("tag-domain-"))) {
    const review = phase.componentRefinements?.tagBatchTwo;
    if (!hasTagBatchTwoRefinementAuthorization(phase) || review?.independentReview !== "findings" || review?.implementation === "completed" || review?.contrastAcceptance !== "not-granted") failures.push("Tag second-batch contrast findings remain pending in their separate review record");
  }
  if ([...pendingContrastFindings, ...pendingEligibilityFindings].some((entry) => /^(?:select|field)-/.test(entry.recipeId))) {
    const review = phase.componentRefinements?.select;
    if (!hasSelectRefinementAuthorization(phase) || review?.independentReview !== "findings" || review?.implementation === "completed" || review?.contrastAcceptance !== "not-granted") failures.push("Select and shared field color findings remain pending: keep implementation in progress, independentReview findings and no accepted exception");
  }
  if ([...pendingContrastFindings, ...pendingEligibilityFindings].some((entry) => entry.recipeId.startsWith("dropdown-"))) {
    const review = dropdownReview?.lifecycle;
    if (review?.humanGate !== "awaiting_human" || review?.contrastAcceptance !== "not-granted" || review?.independentReview === "passed") failures.push("Dropdown comparison color findings remain pending in its own Manifest; no visual acceptance or clean independent review may be claimed");
  }
  if ([...pendingContrastFindings, ...pendingEligibilityFindings].some(entry => entry.recipeId.startsWith("menu-public-"))) {
    const review = phase.componentRefinements?.dropdownFamily;
    if (!hasDropdownFamilyAuthorization(phase) || review?.implementation === "completed" || review?.independentReview === "passed"
      || review?.contrastAcceptance !== "not-granted") failures.push("Dropdown public color findings remain pending in their own scope; no clean review or contrast acceptance may be claimed");
  }
  return { failures: [...new Set(failures)], consumerFiles: files.length + registeredRecipePaths.size, acceptedTextContrastExceptions, acceptedComponentContrastExceptions, pendingContrastFindings, pendingEligibilityFindings, scopedEligibilityDecisions };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = verifyTokenFoundations();
  for (const [label, prefix] of [["BM-B hint", "bm-b-textbook-dialog"], ["QuestionNumber", "question-number-"], ["OptionButton content", "option-button-content-"], ["Input", "input-"], ["Inside field label", "input-inside-label-"], ["Tag", "tag-"], ["Select", "select-"], ["Shared field", "field-"], ["Dropdown comparison", "dropdown-"], ["Dropdown public", "menu-public-"], ["Pagination", "pagination-"], ["Table", "table-"]]) {
    const matches = entry => entry.recipeId.startsWith(prefix) && (prefix !== "input-" || !entry.recipeId.startsWith("input-inside-label-"));
    const count = result.pendingContrastFindings.filter(matches).length;
    if (count) console.log(`${label} contrast review remains pending: ${count} declared foreground/boundary combinations below minimum; these are findings, not accepted exceptions or readability passes.`);
    const accepted = result.acceptedComponentContrastExceptions.filter(matches).length;
    if (accepted) console.log(`${label}: ${accepted} user-accepted contrast exceptions retain their measured ratios and original thresholds; these are not readability passes.`);
    const eligibility = result.pendingEligibilityFindings.filter(matches).length;
    if (eligibility) console.log(`${label} color-family eligibility remains pending: ${eligibility} declared pairings; contrast measurements do not establish eligibility and no exception was accepted.`);
  }
  for (const exception of result.acceptedTextContrastExceptions) {
    console.log(`User-accepted text contrast exception: ${exception.recipeId} ${exception.theme} ${exception.parentId} ${exception.part}: ${exception.actual.toFixed(3)} < ${exception.minimum} (${exception.decisionSource}).`);
  }
  if (result.failures.length) { console.error(result.failures.join("\n")); process.exitCode = 1; }
  else console.log(`Token Foundations verified: generated facts and ${result.consumerFiles} consumer files; ${result.acceptedTextContrastExceptions.length} user-accepted text contrast exceptions${result.acceptedTextContrastExceptions.length ? " remain below 4.5:1 (not readability passes)" : ""}.`);
}
