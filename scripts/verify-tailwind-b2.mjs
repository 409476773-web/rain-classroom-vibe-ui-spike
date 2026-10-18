import { getG6SourceBindings, getG6PreviousSource, hasG6ComponentsAuthorization, withSourceBindingTraversal } from "./verification-helpers.mjs";
import { hasG123PlaygroundAssetizationAuthorization, g123PlaygroundFiles } from "./verification-helpers.mjs";
import { hasG5ComponentsAuthorization, getRecordedChartSourceBindings } from "./verification-helpers.mjs";
import { g4ComponentFiles, getG4SourceBindings, hasG4ComponentsAuthorization, hasG4SizingReviewAuthorization, g4SizingReviewSourcePaths, validateG4SourceDirectives } from "./verification-helpers.mjs";
import { hasAlertAuthorization } from "./verification-helpers.mjs";
import { hasTooltipAuthorization } from "./verification-helpers.mjs";
import { inputNumberFiles, hasInputNumberAuthorization } from "./verification-helpers.mjs";
import { hasDialogRefinementAuthorization, hasSelectRegressionRepairAuthorization } from "./verification-helpers.mjs";
import { avatarFamilyFiles, hasAvatarFamilyAuthorization } from "./verification-helpers.mjs";
import { hasBmBRn10Authorization, hasInsideFieldLabelsAuthorization, tableRn08Files, hasTableRn08Authorization, hasRn13Authorization, rn13AssetIndexFiles } from "./verification-helpers.mjs";
import { layoutsV1Files, hasLayoutsV1Authorization, hasDialogV2Authorization } from "./verification-helpers.mjs";
import { createHash } from "node:crypto";
import { hasCardV2Authorization } from "./verification-helpers.mjs";
import { hasSwitchSc01Authorization, hasTreeAuthorization, collectRecordedPostB2Documents, readTaskFourFile } from "./verification-helpers.mjs";
export { collectRecordedPostB2Documents } from "./verification-helpers.mjs";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseSync } from "vite";

import { hasSelectFormalDependenciesAuthorization, hasSelectRefinementAuthorization, hasTagBatchTwoRefinementAuthorization, tagBatchTwoNames, hasTagRefinementAuthorization, hasInputRefinementAuthorization, hasQuestionOptionSizeRefinementAuthorization, hasOptionButtonContentRefinementAuthorization, hasOptionButtonRefinementAuthorization, hasQuestionNumberRefinementAuthorization, hasIconButtonRefinementAuthorization, inspectPngMetadata, parseYamlSubset, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";
import { getTokenFoundationOutputs, getCheckboxColorConsumers, getRadioColorConsumers, shareMenuSelectionSelectors } from "./token-foundation-outputs.mjs";
import { dropdownBatchOneFiles, hasDropdownBatchOneAuthorization } from "./verification-helpers.mjs";
import { dropdownFamilyFiles, hasDropdownFamilyAuthorization, hasDropdownSelectionVisualReuseAuthorization } from "./verification-helpers.mjs";
import { hasSelectionPlaygroundSc04Authorization, hasSelectionPatternsSc03Authorization, selectionPatternsSc03Files, hasCheckboxSc01Authorization, hasRadioSc01Authorization, hasSelectionCardsSc02Authorization, selectionCardsSc02Files } from "./verification-helpers.mjs";
import { hasTagBatchThreeAuthorization, tagBatchThreeFiles } from "./verification-helpers.mjs";
import { hasTabsRefinementAuthorization, tabsPreflightFiles, validateTabsPreflightInventory } from "./verification-helpers.mjs";
import { buttonColorThemeMappings, getButtonColorVariables, legacyComponentTokenAliases } from "../packages/foundations/src/token-contract.ts";
import { tagShapeRecipes, tagDetailTokens } from "../packages/foundations/src/tag-token-contract.ts";
import { getLegacyTypographyAliases } from "../packages/foundations/src/typography-contract.ts";

export const tailwindB2BenchmarkPath = "benchmarks/tailwind-b2-ai-editability.yaml";
export const tailwindB2BaselinePath = "evidence/runtime/tailwind-b2/baseline-results.yaml";
export const tailwindB2ReadmePath = "evidence/runtime/tailwind-b2/README.md";
export const tailwindB2ThemeBridgePath = "packages/foundations/src/tailwind-theme.css";
export const tailwindB2ContractPath = "manifests/contracts/tailwind-b2.yaml";
export const tailwindB2ButtonManifestPath = "manifests/ui/button.yaml";
export const tailwindB2InputManifestPath = "manifests/ui/input.yaml";

const taskFourCompositionSpaceTokens = {
  0: "0px",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  18: "18px",
  20: "20px",
  24: "24px",
  32: "32px",
};

const taskFourFoundationsPublicIndex = [
  {
    moduleSpecifier: "./density",
    isTypeOnly: false,
    elements: ["DensityProvider", "densityMetrics", "useDensity"],
  },
  {
    moduleSpecifier: "./density",
    isTypeOnly: true,
    elements: ["Density", "DensityProviderProps"],
  },
  {
    moduleSpecifier: "./composition-contract",
    isTypeOnly: false,
    elements: ["compositionSpaceTokenEntries", "compositionSpaceTokens"],
  },
  {
    moduleSpecifier: "./composition-contract",
    isTypeOnly: true,
    elements: ["CompositionSpaceTokenName"],
  },
  {
    moduleSpecifier: "./token-contract",
    isTypeOnly: false,
    elements: [
      "radiusTokens",
      "semanticColorGroups",
      "semanticColorTokenEntries",
      "semanticColorTokens",
      "semanticColorTokenUsage",
      "shadowTokens",
    ],
  },
  {
    moduleSpecifier: "./token-contract",
    isTypeOnly: true,
    elements: [
      "RadiusTokenName",
      "SemanticColorGroup",
      "SemanticColorTokenName",
      "ShadowTokenName",
    ],
  },
];

const taskFourSemanticColorNames = [
  "brand-primary",
  "brand-primary-subtle",
  "brand-primary-strong",
  "text-primary",
  "text-secondary",
  "text-muted",
  "text-placeholder",
  "text-inverse",
  "text-link",
  "text-disabled",
  "surface-page",
  "surface-panel",
  "surface-raised",
  "surface-overlay",
  "surface-subtle",
  "border-default",
  "border-subtle",
  "border-strong",
  "action-primary",
  "action-primary-hover",
  "action-primary-pressed",
  "action-secondary",
  "action-ghost",
  "action-danger",
  "action-disabled",
  "selection-item",
  "selection-item-hover",
  "selection-text",
  "focus-control",
  "focus-item",
  "focus-danger",
  "semantic-success",
  "semantic-success-surface",
  "semantic-warning",
  "semantic-warning-surface",
  "semantic-error",
  "semantic-error-surface",
  "semantic-info",
  "semantic-info-surface",
  "intelligence-foreground",
  "intelligence-surface",
  "intelligence-gradient",
];

const taskFourSemanticColorTokenValues = {
  "--rain-color-brand-primary": "var(--rain-ref-blue-500)",
  "--rain-color-brand-primary-subtle": "var(--rain-ref-blue-50)",
  "--rain-color-brand-primary-strong": "var(--rain-ref-blue-700)",
  "--rain-color-text-primary": "var(--rain-ref-neutral-950)",
  "--rain-color-text-secondary": "var(--rain-ref-neutral-700)",
  "--rain-color-text-muted": "var(--rain-ref-neutral-600)",
  "--rain-color-text-placeholder": "var(--rain-ref-neutral-500)",
  "--rain-color-text-inverse": "var(--rain-ref-neutral-0)",
  "--rain-color-text-link": "var(--rain-ref-blue-600)",
  "--rain-color-text-disabled": "var(--rain-ref-neutral-400)",
  "--rain-color-surface-page": "var(--rain-ref-neutral-50)",
  "--rain-color-surface-panel": "var(--rain-ref-neutral-0)",
  "--rain-color-surface-raised": "var(--rain-ref-neutral-25)",
  "--rain-color-surface-overlay": "var(--rain-ref-neutral-0)",
  "--rain-color-surface-subtle": "var(--rain-ref-neutral-100)",
  "--rain-color-border-default": "var(--rain-ref-neutral-200)",
  "--rain-color-border-subtle": "var(--rain-ref-neutral-150)",
  "--rain-color-border-strong": "var(--rain-ref-neutral-300)",
  "--rain-color-action-primary": "var(--rain-ref-blue-500)",
  "--rain-color-action-primary-hover": "var(--rain-ref-blue-600)",
  "--rain-color-action-primary-pressed": "var(--rain-ref-blue-700)",
  "--rain-color-action-secondary": "var(--rain-ref-blue-25)",
  "--rain-color-action-ghost": "transparent",
  "--rain-color-action-danger": "var(--rain-ref-red-600)",
  "--rain-color-action-disabled": "var(--rain-ref-neutral-250)",
  "--rain-color-selection-item": "var(--rain-ref-blue-50)",
  "--rain-color-selection-item-hover": "var(--rain-ref-blue-100)",
  "--rain-color-selection-text": "var(--rain-ref-blue-200)",
  "--rain-color-focus-control": "var(--rain-ref-blue-500)",
  "--rain-color-focus-item": "var(--rain-ref-blue-500)",
  "--rain-color-focus-danger": "var(--rain-ref-blue-500)",
  "--rain-color-semantic-success": "var(--rain-ref-green-600)",
  "--rain-color-semantic-success-surface": "var(--rain-ref-green-50)",
  "--rain-color-semantic-warning": "var(--rain-ref-amber-700)",
  "--rain-color-semantic-warning-surface": "var(--rain-ref-amber-50)",
  "--rain-color-semantic-error": "var(--rain-ref-red-700)",
  "--rain-color-semantic-error-surface": "var(--rain-ref-red-50)",
  "--rain-color-semantic-info": "var(--rain-ref-info-600)",
  "--rain-color-semantic-info-surface": "var(--rain-ref-info-50)",
  "--rain-color-intelligence-foreground": "var(--rain-ref-violet-600)",
  "--rain-color-intelligence-surface": "var(--rain-ref-violet-50)",
  "--rain-color-intelligence-gradient": "linear-gradient(110deg, var(--rain-ref-blue-500) 0%, var(--rain-ref-violet-500) 52%, var(--rain-ref-cyan-500) 100%)",
};

// Exact user-confirmed changes supplement, and never rewrite, the B2 baseline.
const confirmedSemanticColorAliases = {
  "--rain-color-text-secondary": "var(--rain-category-text-neutral-3)",
  "--rain-color-text-muted": "var(--rain-category-text-neutral-4)",
  "--rain-color-text-placeholder": "var(--rain-category-text-neutral-5)",
  "--rain-color-text-disabled": "var(--rain-category-text-neutral-6)",
  "--rain-color-surface-page": "var(--rain-category-background-neutral-3)",
  "--rain-color-border-default": "var(--rain-category-border-neutral-3)",
  "--rain-color-border-subtle": "var(--rain-category-border-neutral-3)",
  "--rain-color-border-strong": "var(--rain-category-border-neutral-2)",
  "--rain-color-action-primary": "var(--rain-category-fill-brand-solid-2)",
  "--rain-color-action-disabled": "var(--rain-category-fill-neutral-solid-2)",
  "--rain-color-semantic-success-surface": "var(--rain-category-fill-green-alpha-2)",
  "--rain-color-semantic-warning-surface": "var(--rain-category-fill-orange-alpha-2)",
  "--rain-color-semantic-error-surface": "var(--rain-category-fill-red-alpha-2)",
  "--rain-color-semantic-info-surface": "var(--rain-category-fill-second-alpha-2)",
  "--rain-color-action-primary-text": "var(--rain-category-text-brand-1)",
};
const confirmedLegacyFillAliases = {
  "--rain-tag-neutral-fill": "var(--rain-ref-neutral-700)",
  "--rain-badge-neutral-fill": "var(--rain-ref-neutral-600)",
};

const taskFourReferenceColorTokenValues = {
  "--rain-ref-neutral-0": "#FFFFFF",
  "--rain-ref-neutral-25": "#FAFCFF",
  "--rain-ref-neutral-50": "#F3F7FC",
  "--rain-ref-neutral-100": "#EDF3FA",
  "--rain-ref-neutral-150": "#E8EEF6",
  "--rain-ref-neutral-200": "#D8E3F1",
  "--rain-ref-neutral-250": "#C9D3E0",
  "--rain-ref-neutral-300": "#AEC2DD",
  "--rain-ref-neutral-400": "#97A4B7",
  "--rain-ref-neutral-500": "#69778D",
  "--rain-ref-neutral-600": "#596A82",
  "--rain-ref-neutral-700": "#40506A",
  "--rain-ref-neutral-950": "#14233C",
  "--rain-ref-blue-25": "#EDF3FF",
  "--rain-ref-blue-50": "#EAF2FF",
  "--rain-ref-blue-100": "#DCE9FF",
  "--rain-ref-blue-200": "#CFE0FF",
  "--rain-ref-blue-500": "#1561F8",
  "--rain-ref-blue-600": "#0F52DC",
  "--rain-ref-blue-700": "#0B45B5",
  "--rain-ref-green-50": "#EAF7F0",
  "--rain-ref-green-600": "#18794E",
  "--rain-ref-amber-50": "#FFF4D8",
  "--rain-ref-amber-700": "#A55B00",
  "--rain-ref-red-50": "#FDECEE",
  "--rain-ref-red-600": "#C93842",
  "--rain-ref-red-700": "#B52A36",
  "--rain-ref-info-50": "#E9F4FC",
  "--rain-ref-info-600": "#1769AA",
  "--rain-ref-violet-50": "#F2F0FF",
  "--rain-ref-violet-500": "#6857E5",
  "--rain-ref-violet-600": "#5644C2",
  "--rain-ref-cyan-500": "#27A9E8",
};

const taskFourRadiusAndShadowTokenValues = {
  "--rain-radius-4": "4px",
  "--rain-radius-6": "6px",
  "--rain-radius-8": "8px",
  "--rain-radius-10": "10px",
  "--rain-radius-full": "9999px",
  "--rain-shadow-none": "none",
  "--rain-shadow-overlay": "0 12px 32px rgb(28 62 108 / 12%)",
  "--rain-shadow-dialog": "0 24px 64px rgb(19 48 91 / 16%)",
};

const taskFourButtonSizeTokenValues = {
  mini: {
    height: "28px",
    "min-width": "64px",
    "padding-inline": "var(--rain-space-12)",
    radius: "var(--rain-radius-6)",
    "font-size": "13px",
    "line-height": "18px",
    "leading-icon-size": "14px",
    "trailing-icon-size": "10px",
  },
  small: {
    height: "32px",
    "min-width": "64px",
    "padding-inline": "var(--rain-space-20)",
    radius: "var(--rain-radius-6)",
    "font-size": "14px",
    "line-height": "22px",
    "leading-icon-size": "16px",
    "trailing-icon-size": "12px",
  },
  medium: {
    height: "36px",
    "min-width": "64px",
    "padding-inline": "var(--rain-space-20)",
    radius: "var(--rain-radius-6)",
    "font-size": "14px",
    "line-height": "22px",
    "leading-icon-size": "16px",
    "trailing-icon-size": "12px",
  },
  large: {
    height: "40px",
    "min-width": "80px",
    "padding-inline": "var(--rain-space-24)",
    radius: "var(--rain-radius-6)",
    "font-size": "14px",
    "line-height": "22px",
    "leading-icon-size": "16px",
    "trailing-icon-size": "12px",
  },
  xl: {
    height: "48px",
    "min-width": "160px",
    "padding-inline": "28px",
    radius: "var(--rain-radius-8)",
    "font-size": "16px",
    "line-height": "24px",
    "leading-icon-size": "22px",
    "trailing-icon-size": "16px",
  },
};

const taskFourTextButtonSizeTokenValues = {
  small: {
    height: "20px",
    "font-size": "12px",
    "line-height": "14px",
    "leading-icon-size": "14px",
    "trailing-icon-size": "12px",
  },
  compact: {
    height: "24px",
    "font-size": "13px",
    "line-height": "18px",
    "leading-icon-size": "16px",
    "trailing-icon-size": "12px",
  },
  regular: {
    height: "26px",
    "font-size": "14px",
    "line-height": "20px",
    "leading-icon-size": "16px",
    "trailing-icon-size": "12px",
  },
};

const taskFourComponentTokenValues = {
  "--rain-density-control-height": "36px",
  "--rain-density-control-padding-inline": "14px",
  "--rain-density-item-gap": "10px",
  "--rain-button-border-width": "1px",
  "--rain-button-gap-default": "var(--rain-space-4)",
  "--rain-button-gap-xl": "var(--rain-space-6)",
  "--rain-button-font-weight": "var(--rain-font-weight-semibold)",
  "--rain-button-transition-duration": "100ms",
  "--rain-button-transition-easing": "ease",
  "--rain-button-text-min-width": "0px",
  "--rain-button-text-padding-inline": "var(--rain-space-6)",
  "--rain-button-text-padding-block": "3px",
  "--rain-button-text-gap": "var(--rain-space-4)",
  "--rain-button-text-radius": "var(--rain-radius-6)",
  "--rain-button-text-border-width": "0px",
  "--rain-button-text-font-weight": "var(--rain-font-weight-regular)",
  "--rain-input-gap": "var(--rain-space-8)",
  "--rain-input-border-width": "1px",
  "--rain-input-radius": "var(--rain-radius-6)",
  "--rain-input-font-size": "13px",
  "--rain-input-font-weight": "var(--rain-font-weight-regular)",
  "--rain-input-control-min-width": "64px",
  "--rain-input-clear-min-height": "var(--rain-space-24)",
  "--rain-input-clear-padding-inline": "var(--rain-space-4)",
  "--rain-input-clear-radius": "var(--rain-radius-4)",
  "--rain-input-clear-font-size": "12px",
  "--rain-input-count-overflow-font-weight": "var(--rain-font-weight-semibold)",
  "--rain-input-transition-duration": "var(--rain-motion-feedback-duration)",
  "--rain-input-transition-easing": "ease",
  "--rain-button-primary-bg": "var(--rain-color-brand-primary)",
  "--rain-button-primary-hover-bg": "#0f55df",
  "--rain-button-primary-pressed-bg": "#0e4acb",
  "--rain-button-secondary-bg": "#d3e1ff",
  "--rain-button-secondary-hover-bg": "#c6d8ff",
  "--rain-button-secondary-pressed-bg": "#b9ceff",
  "--rain-button-secondary-border": "#6495ff",
  "--rain-button-secondary-text": "#0f55df",
  "--rain-button-tertiary-text": "#495d87",
  "--rain-button-tertiary-border": "rgb(16 63 183 / 26%)",
  "--rain-button-tertiary-hover-bg": "rgb(80 117 254 / 12%)",
  "--rain-button-tertiary-pressed-bg": "rgb(80 117 254 / 18%)",
  "--rain-button-danger-primary-bg": "#ef5353",
  "--rain-button-danger-primary-hover-bg": "#e24449",
  "--rain-button-danger-primary-pressed-bg": "#c9343f",
  "--rain-button-danger-subtle-bg": "rgb(239 83 83 / 10%)",
  "--rain-button-danger-subtle-hover-bg": "rgb(239 83 83 / 18%)",
  "--rain-button-danger-subtle-pressed-bg": "rgb(239 83 83 / 24%)",
  "--rain-button-danger-border": "#f3bdc0",
  "--rain-button-danger-text": "#c9343f",
  "--rain-button-focus-halo": "rgb(21 97 248 / 20%)",
  "--rain-button-focus-outline-width": "2px",
  "--rain-button-focus-outline-offset": "2px",
  "--rain-button-focus-primary-shadow": "0 0 0 1px var(--rain-color-surface-panel), 0 0 0 4px var(--rain-button-focus-halo)",
  "--rain-button-focus-rest-shadow": "0 0 0 3px var(--rain-button-focus-halo)",
  "--rain-button-loading-opacity": "0.82",
  "--rain-button-disabled-opacity-primary": "0.3",
  "--rain-button-disabled-opacity-rest": "0.4",
  "--rain-button-loading-duration": "800ms",
  "--rain-button-loading-timing-function": "linear",
  "--rain-button-loading-mask-size": "120%",
  "--rain-button-text-default-color": "#56688f",
  "--rain-button-text-brand-color": "var(--rain-button-secondary-text)",
  "--rain-button-text-danger-color": "var(--rain-button-danger-text)",
  "--rain-button-text-hover-bg": "color-mix(in srgb, var(--rain-color-brand-primary) 4%, var(--rain-color-surface-panel))",
  "--rain-button-text-pressed-bg": "color-mix(in srgb, var(--rain-color-brand-primary) 8%, var(--rain-color-surface-panel))",
  "--rain-button-text-danger-hover-bg": "color-mix(in srgb, var(--rain-button-danger-primary-bg) 6%, var(--rain-color-surface-panel))",
  "--rain-button-text-danger-pressed-bg": "color-mix(in srgb, var(--rain-button-danger-primary-bg) 10%, var(--rain-color-surface-panel))",
  "--rain-button-text-disabled-foreground-opacity": "0.3",
  "--rain-button-text-loading-opacity": "1",
  "--rain-button-text-focus-outline": "var(--rain-color-brand-primary)",
  "--rain-button-text-focus-halo": "color-mix(in srgb, var(--rain-color-brand-primary) 20%, transparent)",
  "--rain-button-text-focus-outline-width": "1px",
  "--rain-button-text-focus-outline-offset": "0px",
  "--rain-button-text-focus-shadow": "0 0 0 3px var(--rain-button-text-focus-halo)",
  "--rain-link-color": "var(--rain-color-brand-primary)",
  "--rain-link-hover-color": "var(--rain-color-action-primary-hover)",
  "--rain-link-pressed-color": "var(--rain-color-action-primary-pressed)",
};

const taskFourTypographyTokenValues = {
  "--rain-font-ui": '"PingFang SC", "Microsoft YaHei", ui-sans-serif, sans-serif',
  "--rain-font-reading": '"PingFang SC", "Microsoft YaHei", ui-sans-serif, sans-serif',
  "--rain-font-data": '"LINE Seed JP App_OTF", "SF Pro Rounded", ui-rounded, sans-serif',
  "--rain-font-weight-regular": "400",
  "--rain-font-weight-semibold": "600",
  "--rain-font-weight-bold": "700",
  "--rain-type-ui-size": "14px",
  "--rain-type-ui-line": "22px",
  "--rain-type-reading-size": "15px",
  "--rain-type-reading-line": "26px",
  "--rain-type-data-size": "36px",
  "--rain-type-data-line": "42px",
};

const taskFourFocusTokenValues = {
  "--rain-focus-control": "var(--rain-color-focus-control)",
  "--rain-focus-item": "var(--rain-color-focus-item)",
  "--rain-focus-danger": "var(--rain-color-focus-danger)",
  "--rain-focus-control-halo": "color-mix(in srgb, var(--rain-focus-control) 14%, transparent)",
  "--rain-focus-width": "2px",
  "--rain-focus-offset": "1px",
};

const taskFourMotionTokenValues = {
  "--rain-motion-feedback-duration": "140ms",
  "--rain-motion-overlay-duration": "180ms",
  "--rain-motion-region-duration": "220ms",
  "--rain-motion-ease-out": "cubic-bezier(0.2, 0.8, 0.2, 1)",
};

for (const [size, values] of Object.entries(taskFourButtonSizeTokenValues)) {
  for (const [slot, value] of Object.entries(values)) {
    taskFourComponentTokenValues[`--rain-button-${size}-${slot}`] = value;
  }
}
for (const [size, values] of Object.entries(taskFourTextButtonSizeTokenValues)) {
  for (const [slot, value] of Object.entries(values)) {
    taskFourComponentTokenValues[`--rain-button-text-${size}-${slot}`] = value;
  }
}

const taskFourThemeMappings = {};
for (const name of taskFourSemanticColorNames) {
  const target = name === "intelligence-gradient"
    ? "--background-image-rain-intelligence-gradient"
    : `--color-rain-${name}`;
  taskFourThemeMappings[target] = `var(--rain-color-${name})`;
}
Object.assign(taskFourThemeMappings, {
  "--font-rain-ui": "var(--rain-font-ui)",
  "--font-rain-reading": "var(--rain-font-reading)",
  "--font-rain-data": "var(--rain-font-data)",
  "--font-weight-rain-regular": "var(--rain-font-weight-regular)",
  "--font-weight-rain-semibold": "var(--rain-font-weight-semibold)",
  "--font-weight-rain-bold": "var(--rain-font-weight-bold)",
  "--text-rain-ui": "var(--rain-type-ui-size)",
  "--text-rain-ui--line-height": "var(--rain-type-ui-line)",
  "--text-rain-reading": "var(--rain-type-reading-size)",
  "--text-rain-reading--line-height": "var(--rain-type-reading-line)",
  "--text-rain-data": "var(--rain-type-data-size)",
  "--text-rain-data--line-height": "var(--rain-type-data-line)",
  "--spacing-0": "var(--rain-space-0)",
  "--spacing-rain-control": "var(--rain-density-control-height)",
  "--spacing-rain-control-inline": "var(--rain-density-control-padding-inline)",
  "--spacing-rain-item-gap": "var(--rain-density-item-gap)",
  "--radius-rain-4": "var(--rain-radius-4)",
  "--radius-rain-6": "var(--rain-radius-6)",
  "--radius-rain-8": "var(--rain-radius-8)",
  "--radius-rain-10": "var(--rain-radius-10)",
  "--radius-rain-full": "var(--rain-radius-full)",
  "--shadow-rain-overlay": "var(--rain-shadow-overlay)",
  "--shadow-rain-dialog": "var(--rain-shadow-dialog)",
  "--outline-width-rain-focus": "var(--rain-focus-width)",
  "--outline-offset-rain-focus": "var(--rain-focus-offset)",
  "--transition-duration-rain-feedback": "var(--rain-motion-feedback-duration)",
  "--transition-duration-rain-overlay": "var(--rain-motion-overlay-duration)",
  "--transition-duration-rain-region": "var(--rain-motion-region-duration)",
  "--ease-rain-out": "var(--rain-motion-ease-out)",
  "--font-weight-rain-button": "var(--rain-button-font-weight)",
  "--font-weight-rain-button-text": "var(--rain-button-text-font-weight)",
  "--font-weight-rain-input": "var(--rain-input-font-weight)",
  "--font-weight-rain-input-count-overflow": "var(--rain-input-count-overflow-font-weight)",
  "--spacing-rain-button-gap": "var(--rain-button-gap-default)",
  "--spacing-rain-button-gap-xl": "var(--rain-button-gap-xl)",
  "--spacing-rain-button-text-min-width": "var(--rain-button-text-min-width)",
  "--spacing-rain-button-text-padding-inline": "var(--rain-button-text-padding-inline)",
  "--spacing-rain-button-text-padding-block": "var(--rain-button-text-padding-block)",
  "--spacing-rain-button-text-gap": "var(--rain-button-text-gap)",
  "--spacing-rain-input-height": "var(--rain-density-control-height)",
  "--spacing-rain-input-padding-inline": "var(--rain-density-control-padding-inline)",
  "--spacing-rain-input-gap": "var(--rain-input-gap)",
  "--spacing-rain-input-control-min-width": "var(--rain-input-control-min-width)",
  "--spacing-rain-input-clear-min-height": "var(--rain-input-clear-min-height)",
  "--spacing-rain-input-clear-padding-inline": "var(--rain-input-clear-padding-inline)",
  "--radius-rain-button-text": "var(--rain-button-text-radius)",
  "--radius-rain-input": "var(--rain-input-radius)",
  "--radius-rain-input-clear": "var(--rain-input-clear-radius)",
  "--shadow-rain-button-focus-primary": "var(--rain-button-focus-primary-shadow)",
  "--shadow-rain-button-focus-rest": "var(--rain-button-focus-rest-shadow)",
  "--shadow-rain-button-text-focus": "var(--rain-button-text-focus-shadow)",
  "--border-width-rain-button": "var(--rain-button-border-width)",
  "--border-width-rain-button-text": "var(--rain-button-text-border-width)",
  "--border-width-rain-input": "var(--rain-input-border-width)",
  "--outline-width-rain-button-focus": "var(--rain-button-focus-outline-width)",
  "--outline-offset-rain-button-focus": "var(--rain-button-focus-outline-offset)",
  "--outline-width-rain-button-text-focus": "var(--rain-button-text-focus-outline-width)",
  "--outline-offset-rain-button-text-focus": "var(--rain-button-text-focus-outline-offset)",
  "--opacity-rain-button-loading": "var(--rain-button-loading-opacity)",
  "--opacity-rain-button-disabled-primary": "var(--rain-button-disabled-opacity-primary)",
  "--opacity-rain-button-disabled-rest": "var(--rain-button-disabled-opacity-rest)",
  "--opacity-rain-button-text-disabled": "var(--rain-button-text-disabled-foreground-opacity)",
  "--opacity-rain-button-text-loading": "var(--rain-button-text-loading-opacity)",
  "--transition-duration-rain-button": "var(--rain-button-transition-duration)",
  "--transition-duration-rain-button-loading": "var(--rain-button-loading-duration)",
  "--transition-duration-rain-input": "var(--rain-input-transition-duration)",
  "--ease-rain-button": "var(--rain-button-transition-easing)",
  "--ease-rain-button-loading": "var(--rain-button-loading-timing-function)",
  "--ease-rain-input": "var(--rain-input-transition-easing)",
});

for (const name of Object.keys(taskFourCompositionSpaceTokens)) {
  taskFourThemeMappings[`--spacing-rain-${name}`] = `var(--rain-space-${name})`;
}
for (const [size] of Object.entries(taskFourButtonSizeTokenValues)) {
  taskFourThemeMappings[`--text-rain-button-${size}`] = `var(--rain-button-${size}-font-size)`;
  taskFourThemeMappings[`--text-rain-button-${size}--line-height`] = `var(--rain-button-${size}-line-height)`;
  taskFourThemeMappings[`--text-rain-button-${size}-leading-icon`] = `var(--rain-button-${size}-leading-icon-size)`;
  taskFourThemeMappings[`--text-rain-button-${size}-trailing-icon`] = `var(--rain-button-${size}-trailing-icon-size)`;
  for (const slot of ["height", "min-width", "padding-inline"]) {
    taskFourThemeMappings[`--spacing-rain-button-${size}-${slot}`] = `var(--rain-button-${size}-${slot})`;
  }
  taskFourThemeMappings[`--spacing-rain-button-${size}-leading-icon`] = `var(--rain-button-${size}-leading-icon-size)`;
  taskFourThemeMappings[`--spacing-rain-button-${size}-trailing-icon`] = `var(--rain-button-${size}-trailing-icon-size)`;
  taskFourThemeMappings[`--radius-rain-button-${size}`] = `var(--rain-button-${size}-radius)`;
}
for (const [size] of Object.entries(taskFourTextButtonSizeTokenValues)) {
  taskFourThemeMappings[`--text-rain-button-text-${size}`] = `var(--rain-button-text-${size}-font-size)`;
  taskFourThemeMappings[`--text-rain-button-text-${size}--line-height`] = `var(--rain-button-text-${size}-line-height)`;
  taskFourThemeMappings[`--text-rain-button-text-${size}-leading-icon`] = `var(--rain-button-text-${size}-leading-icon-size)`;
  taskFourThemeMappings[`--text-rain-button-text-${size}-trailing-icon`] = `var(--rain-button-text-${size}-trailing-icon-size)`;
  taskFourThemeMappings[`--spacing-rain-button-text-${size}-height`] = `var(--rain-button-text-${size}-height)`;
  taskFourThemeMappings[`--spacing-rain-button-text-${size}-leading-icon`] = `var(--rain-button-text-${size}-leading-icon-size)`;
  taskFourThemeMappings[`--spacing-rain-button-text-${size}-trailing-icon`] = `var(--rain-button-text-${size}-trailing-icon-size)`;
}

for (const [target, source] of Object.entries({
  primary: "primary-bg",
  "primary-hover": "primary-hover-bg",
  "primary-pressed": "primary-pressed-bg",
  secondary: "secondary-bg",
  "secondary-hover": "secondary-hover-bg",
  "secondary-pressed": "secondary-pressed-bg",
  "secondary-border": "secondary-border",
  "secondary-text": "secondary-text",
  "tertiary-text": "tertiary-text",
  "tertiary-border": "tertiary-border",
  "tertiary-hover": "tertiary-hover-bg",
  "tertiary-pressed": "tertiary-pressed-bg",
  "danger-primary": "danger-primary-bg",
  "danger-primary-hover": "danger-primary-hover-bg",
  "danger-primary-pressed": "danger-primary-pressed-bg",
  "danger-subtle": "danger-subtle-bg",
  "danger-subtle-hover": "danger-subtle-hover-bg",
  "danger-subtle-pressed": "danger-subtle-pressed-bg",
  "danger-border": "danger-border",
  "danger-text": "danger-text",
  "focus-halo": "focus-halo",
  "text-default": "text-default-color",
  "text-brand": "text-brand-color",
  "text-danger": "text-danger-color",
  "text-hover": "text-hover-bg",
  "text-pressed": "text-pressed-bg",
  "text-danger-hover": "text-danger-hover-bg",
  "text-danger-pressed": "text-danger-pressed-bg",
  "text-focus-outline": "text-focus-outline",
  "text-focus-halo": "text-focus-halo",
})) {
  taskFourThemeMappings[`--color-rain-button-${target}`] = `var(--rain-button-${source})`;
}
taskFourThemeMappings["--color-rain-link"] = "var(--rain-link-color)";
taskFourThemeMappings["--color-rain-link-hover"] = "var(--rain-link-hover-color)";
taskFourThemeMappings["--color-rain-link-pressed"] = "var(--rain-link-pressed-color)";
taskFourThemeMappings["--text-rain-input"] = "var(--rain-input-font-size)";
taskFourThemeMappings["--text-rain-input-clear"] = "var(--rain-input-clear-font-size)";

const taskFourProtectedIconHashes = {
  "manifests/icons.json": "86566c0072bc7de5c706fefa5e64ae128b6deeb4fa3aab1e0745609c465d1eb8",
  "packages/ui/src/icon/icon.tsx": "4a717dc0861919c43bd443a62b8c8c40bc37cb889c63752d2ca4a5fc98c19cb8",
  "packages/ui/src/icons/assets/button-loading.png": "48eb44ae2822e9f82d119a423f4a78909b55ce6e4a3917540c9ba13413582915",
  "packages/ui/src/icons/assets/search.svg": "6e7a1b6b3e43def3ce73e3ea1f655422090f3a4fdde360a8518961c3408fbd7f",
  "packages/ui/src/icons/button-loading.tsx": "0306a4b497ebd77393220a93782ddf6bd5957243649474f5aa4c6575541f690c",
  "packages/ui/src/icons/search.tsx": "4312348daf79d6f5dcdc7b1b4c42bf6d2b8fd4122c10e5c56679da3d0a441b72",
  "registry/icons.json": "722298d1247ae694a18c84a7dadf64330140474d4dd83804ee4ec2e49aecc1ce",
};
const taskFourProtectedIconTreeRoots = [
  "evidence/icons/source-exports",
  "packages/ui/src/icons",
];
const taskFourProtectedIconTreeFileCount = 2693;
const taskFourProtectedIconTreeSha256 = "157909d9cdb9b9c2362c6e9ef8186173ac59d050232e6f2d2eb5c4a4b7d9deda";

// The confirmed semantic supplement changes usage metadata only. Normalize the
// complete authorized increment before checking the unchanged frozen manifest.
const iconButtonSemanticUsageSupplement = {
  "icon/rating-star": "default",
  "icon/rating-star-100": "explicit",
  "icon/favorite": "default",
  "icon/favorite-filled": "explicit",
  "icon/like": "default",
  "icon/like-filled": "explicit",
  "icon/dislike": "default",
  "icon/dislike-filled": "explicit",
  "icon/like-alt-2": "default",
  "icon/like-alt": "explicit",
  "icon/pin-top-alt-2": "default",
  "icon/pin-top-alt": "explicit",
  "icon/pin": "default",
  "icon/expand": "default",
  "icon/collapse": "default",
  "icon/filter-filled": "explicit",
};

function normalizeIconButtonSemanticManifest(source) {
  try {
    const manifest = JSON.parse(source.toString("utf8"));
    if (!Object.entries(iconButtonSemanticUsageSupplement).every(([id, usage]) => {
      const matches = manifest.items?.filter((item) => item.id === id);
      return matches?.length === 1 && matches[0].usageStatus === usage;
    })) return source;
    for (const item of manifest.items) {
      if (Object.hasOwn(iconButtonSemanticUsageSupplement, item.id)) item.usageStatus = "unconfirmed";
    }
    return Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
  } catch { return source; }
}

const questionNumberIconSources = {
  "grading-pending": ["2761:19670", "2761:19672"],
  "grading-reviewed": ["2761:19678", "2761:19680"],
};
const questionNumberIconHashes = {
  "packages/ui/src/icons/grading-pending.tsx": "9ac1a614715809979f4348c504788f6e7b5f434f804e6cc45afd17c17b5aafd0",
  "packages/ui/src/icons/assets/grading-pending.svg": "f3a8dde899017dcd31742cfa204f9acdc97cb647b14abadb1ac4a4ea25450804",
  "packages/ui/src/icons/grading-reviewed.tsx": "ee87a771cfed1eaeeffe06be0c92013c51f9dde1206d4cb36face274fbc243b9",
  "packages/ui/src/icons/assets/grading-reviewed.svg": "3e34e34b8fdd3777f3f889bccee954654d2b4988b122547496a8f4d0bd54d9e7",
};

// Remove only the two exact authorized additions, then check the original hashes.
function normalizeQuestionNumberIconArtifact(source, filePath) {
  try {
    const document = JSON.parse(source.toString("utf8"));
    const slugs = Object.keys(questionNumberIconSources);
    const isManifest = filePath === "manifests/icons.json";
    const additions = document.items.filter((item) => slugs.includes(isManifest ? item.id?.slice(5) : item.name));
    const expected = Object.entries(questionNumberIconSources).map(([slug, [nodeId, foregroundNodeId]]) => isManifest ? {
      id: `icon/${slug}`, importPath: `@rain-next/ui/icons/${slug}`, colorMode: "host", usageStatus: "explicit", availability: "available",
      figmaMapping: { fileKey: "MbWg1ft5zk1JRQiQ6dS30e", nodeId, foregroundNodeId, kind: "non-component", componentKey: null, url: `https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e?node-id=${nodeId.replace(":", "-")}` },
    } : {
      name: slug, exportName: slug === "grading-pending" ? "GradingPendingIcon" : "GradingReviewedIcon", importPath: `@rain-next/ui/icons/${slug}`,
      files: [`packages/ui/src/icons/${slug}.tsx`, `packages/ui/src/icons/assets/${slug}.svg`],
    });
    if (!same(additions, expected)) return source;
    if (isManifest) {
      if (!same(document.sourceAdditions, {
        evidence: "evidence/icons/source-additions.json", count: 2, assetIds: slugs.map((slug) => `icon/${slug}`), canvas: [12, 12],
        derivation: "remove-white-backing-and-host-color", implementation: "generated", humanGate: "not-evaluated", publication: "not-published",
      }) || !same(document.layoutConstraints, ["24x24 source canvas; host owns display size", "Supplemental grading rings retain their 12x12 canvas; the host supplies the backing surface."])) return source;
      delete document.sourceAdditions;
      document.layoutConstraints.pop();
      document.count -= 2;
      document.availableCount -= 2;
    }
    document.items = document.items.filter((item) => !additions.includes(item));
    return Buffer.from(`${JSON.stringify(document, null, 2)}\n`);
  } catch { return source; }
}

export const tailwindB2PromptIds = [
  "B2-P1-LOCAL-INPUT",
  "B2-P2-LOCAL-BUTTON",
  "B2-P3-REUSE-AND-PARTS",
];

const promptTexts = [
  "只把当前搜索区的 Input 调得更宽松、背景更浅，不影响其他 Input。",
  "只调整当前页面搜索 Button 的视觉层级，不改变全局 Button。",
  "在同一功能的第二个搜索状态中复用局部样式，并仅为当前搜索功能增加一个独立的 `scope-label` Input Part；不修改全局 Input。",
];

function hasUnpairedUnicodeSurrogate(value) {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return true;
    }
  }
  return false;
}

function compareCanonicalPaths(left, right) {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

const metricFields = [
  "firstPass",
  "userCorrectionPrompts",
  "autonomousRepairCycles",
  "scopeAccuracy",
  "continuationAssessment",
  "elapsedMs",
];
const observationFields = [
  "changedFiles",
  "globalMasterChanged",
  "unregisteredVisualValues",
];
const comparisonFields = ["globalMaster", "nonTarget", "formalSearchIcon"];
const continuationValues = ["clear", "minor-friction", "major-friction", "blocked"];
const reasoningEfforts = ["none", "minimal", "low", "medium", "high", "xhigh", "max", "ultra"];
const sealedNativeBaselineProjectionSha256 = "9051659d685daa75d9b5284a5999ed1d958e7475abb77e84001f4b0f9fcabb47";
const sealedMetricFieldsByPrompt = [
  ["firstPass", "autonomousRepairCycles", "scopeAccuracy", "elapsedMs"],
  ["autonomousRepairCycles", "scopeAccuracy", "elapsedMs"],
  ["firstPass", "autonomousRepairCycles", "scopeAccuracy", "continuationAssessment", "elapsedMs"],
];
const functionalStateAlgorithm = "sha256-u32be-path-bytes-plus-file-sha256-bytes-v1";
const stateObjectPrefix = "evidence/runtime/tailwind-b2/trials/state-objects/sha256/";
const nativeSourceRoots = {
  fixture: "/private/tmp/rain-next-b2-native-trial.H4i2yN",
  runs: [
    "/private/tmp/rain-next-b2-native-p1.cNzY4X",
    "/private/tmp/rain-next-b2-native-p2.i95grx",
    "/private/tmp/rain-next-b2-native-p3.bjo13u",
  ],
  assembled: "/private/tmp/rain-next-b2-p3-actual-assembly.ddKXzS",
};
const protectedFunctionalStatePaths = [
  "manifests/icons.json",
  "package.json",
  "packages/foundations/src/density.tsx",
  "packages/foundations/src/tokens.css",
  "packages/ui/package.json",
  "packages/ui/src/button/button.tsx",
  "packages/ui/src/icon/icon.tsx",
  "packages/ui/src/icons/assets/search.svg",
  "packages/ui/src/icons/search.tsx",
  "packages/ui/src/input/input.tsx",
  "packages/ui/src/styles.css",
  "pnpm-lock.yaml",
  "registry/icons.json",
];
const protectedFixtureInfrastructurePaths = [
  "apps/playground/src/app.tsx",
  "apps/playground/src/routes/route-registry.ts",
  "apps/playground/src/styles.css",
];
const promptLocalChangePaths = [
  [
    "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css",
    "tests/e2e/tailwind-b2-native-baseline.spec.ts",
  ],
  [
    "apps/playground/src/experiments/tailwind-b2-native-baseline/page.test.tsx",
    "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx",
    "tests/e2e/tailwind-b2-native-baseline.spec.ts",
  ],
  [
    "apps/playground/src/experiments/tailwind-b2-native-baseline/local-search-input.tsx",
    "apps/playground/src/experiments/tailwind-b2-native-baseline/local-search-input.utils.ts",
    "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css",
    "apps/playground/src/experiments/tailwind-b2-native-baseline/page.test.tsx",
    "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx",
    "tests/e2e/tailwind-b2-native-baseline.spec.ts",
  ],
].map((paths) => paths.sort(compareCanonicalPaths));
const fixtureFunctionalStatePaths = [
  "apps/playground/src/app.tsx",
  "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css",
  "apps/playground/src/experiments/tailwind-b2-native-baseline/page.test.tsx",
  "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx",
  "apps/playground/src/routes/route-registry.ts",
  "apps/playground/src/styles.css",
  "tests/e2e/tailwind-b2-native-baseline.spec.ts",
];
const requiredFunctionalStatePaths = [
  ...fixtureFunctionalStatePaths,
  ...protectedFunctionalStatePaths,
].sort(compareCanonicalPaths);
const acceptanceCriteria = [
  {
    promptId: tailwindB2PromptIds[0],
    criteria: [
      { id: "local-input-changed", route: "automated", assertion: "Only the target search Input receives the requested local spacing and surface change.", evidenceRefs: ["artifacts.diff"] },
      { id: "input-master-unchanged", route: "automated", assertion: "The shared Input Master remains unchanged.", evidenceRefs: ["protectedComparisons.globalMaster"] },
      { id: "non-target-controls-unchanged", route: "automated", assertion: "The frozen non-target controls remain unchanged.", evidenceRefs: ["protectedComparisons.nonTarget"] },
      { id: "formal-search-icon-unchanged", route: "automated", assertion: "The formal SearchIcon import and rendered identity remain unchanged.", evidenceRefs: ["protectedComparisons.formalSearchIcon"] },
    ],
  },
  {
    promptId: tailwindB2PromptIds[1],
    criteria: [
      { id: "local-button-changed", route: "automated", assertion: "Only the target page search Button receives the local hierarchy change.", evidenceRefs: ["artifacts.diff"] },
      { id: "button-master-unchanged", route: "automated", assertion: "The shared Button Master remains unchanged.", evidenceRefs: ["protectedComparisons.globalMaster"] },
      { id: "non-target-controls-unchanged", route: "automated", assertion: "The frozen non-target controls remain unchanged.", evidenceRefs: ["protectedComparisons.nonTarget"] },
      { id: "formal-search-icon-unchanged", route: "automated", assertion: "The formal SearchIcon import and rendered identity remain unchanged.", evidenceRefs: ["protectedComparisons.formalSearchIcon"] },
      { id: "visual-hierarchy-appropriate", route: "human-gate", assertion: "The resulting search Button has an appropriate visual hierarchy in context.", evidenceRefs: ["artifacts.screenshot"] },
    ],
  },
  {
    promptId: tailwindB2PromptIds[2],
    criteria: [
      { id: "prior-local-styles-reused", route: "automated", assertion: "The saved P1 then P2 local results are reused without cross-architecture state.", evidenceRefs: ["artifacts.diff", "start.prerequisiteAssembly"] },
      { id: "scope-label-part-local", route: "automated", assertion: "The scope-label Input Part is added only for the current search feature.", evidenceRefs: ["artifacts.diff"] },
      { id: "input-master-unchanged", route: "automated", assertion: "The shared Input Master remains unchanged.", evidenceRefs: ["protectedComparisons.globalMaster"] },
      { id: "non-target-controls-unchanged", route: "automated", assertion: "The frozen non-target controls remain unchanged.", evidenceRefs: ["protectedComparisons.nonTarget"] },
      { id: "formal-search-icon-unchanged", route: "automated", assertion: "The formal SearchIcon import and rendered identity remain unchanged.", evidenceRefs: ["protectedComparisons.formalSearchIcon"] },
    ],
  },
];
const continuationRubric = {
  version: "1.0",
  assessmentSource: "recorded-run-review",
  values: [
    { id: "clear", definition: "The next edit is completed without architecture clarification or unrelated repair." },
    { id: "minor-friction", definition: "The next edit completes after one local clarification or repair that does not change architecture." },
    { id: "major-friction", definition: "The next edit completes only after multiple repairs or architecture clarification." },
    { id: "blocked", definition: "The next edit cannot be completed from the recorded state." },
  ],
};
const fixtureStateContract = {
  format: "json-log",
  kind: "TailwindB2FixtureStateManifest",
  route: "/#tailwind-b2-native-baseline",
  viewport: { width: 1280, height: 720 },
  selectors: {
    target: "[data-scope=\"target-search\"]",
    nonTarget: "[data-scope=\"non-target-controls\"]",
    formalSearchIcon: "[data-scope=\"target-search\"] [data-icon=\"icon/search\"]",
  },
  runTargetSelector: "[data-scope=\"target-search\"] [data-rain-id=\"ui-input\"]",
  controls: ["Input", "Button"],
  lighterSurfaceResolution: {
    initialToken: "--rain-color-surface-subtle",
    initialComputed: "rgb(237, 243, 250)",
    acceptance: "higher-luminance-allowed-rain-semantic-or-local-candidate-surface",
    visualQualityRoute: "human-gate",
  },
  functionalState: {
    algorithm: functionalStateAlgorithm,
    pathOrder: "utf8-bytewise-nfc-v1",
    requiredPaths: requiredFunctionalStatePaths,
  },
};

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function same(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function requireExactKeys(value, expected, label, failures) {
  if (!isObject(value)) {
    failures.push(`${label} must be a mapping`);
    return false;
  }
  const actual = Object.keys(value).sort();
  const sortedExpected = [...expected].sort();
  if (!same(actual, sortedExpected)) {
    failures.push(`${label} keys must be exactly ${JSON.stringify(sortedExpected)}, received ${JSON.stringify(actual)}`);
    return false;
  }
  return true;
}

function requireNonEmptyString(value, label, failures) {
  if (typeof value !== "string" || value.trim().length === 0) {
    failures.push(`${label} must be a non-empty string`);
    return false;
  }
  return true;
}

function requireExact(value, expected, label, failures) {
  if (!same(value, expected)) {
    failures.push(`${label} must be ${JSON.stringify(expected)}, received ${JSON.stringify(value)}`);
    return false;
  }
  return true;
}

function requireRelativePath(value, label, failures, requiredPrefix) {
  if (!requireCanonicalLogicalPath(value, label, failures)) return false;
  if (requiredPrefix && !value.startsWith(requiredPrefix)) {
    failures.push(`${label} must be a repository-relative path under ${requiredPrefix ?? "the workspace"}`);
    return false;
  }
  return true;
}

function requireCanonicalLogicalPath(value, label, failures) {
  if (!requireNonEmptyString(value, label, failures)) return false;
  if (
    isAbsolute(value) ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/u.test(value) ||
    hasUnpairedUnicodeSurrogate(value) ||
    value.normalize("NFC") !== value ||
    value.split("/").some((segment) => segment === "" || segment === "." || segment === "..")
  ) {
    failures.push(`${label} must be a canonical repository-relative POSIX path with well-formed Unicode in NFC and without control characters, backslashes, empty segments or dot segments`);
    return false;
  }
  return true;
}

function sha256(source) {
  return createHash("sha256").update(source).digest("hex");
}

function buildSealedNativeBaselineProjection(results) {
  return {
    fixture: results?.fixture,
    results: Array.isArray(results?.results)
      ? results.results.map((trial, index) => ({
          promptId: trial?.promptId,
          architecture: trial?.architecture,
          trialStatus: trial?.trialStatus,
          start: trial?.start,
          run: trial?.run,
          artifacts: trial?.artifacts,
          observations: trial?.observations,
          protectedComparisons: trial?.protectedComparisons,
          acceptanceEvidence: Array.isArray(trial?.acceptanceEvidence)
            ? trial.acceptanceEvidence.filter((entry) => entry?.route === "automated")
            : trial?.acceptanceEvidence,
          metrics: Object.fromEntries(
            (sealedMetricFieldsByPrompt[index] ?? []).map((field) => [
              field,
              trial?.metrics?.[field],
            ]),
          ),
        }))
      : results?.results,
  };
}

function requireSha256(value, label, failures) {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/.test(value)) {
    failures.push(`${label} must be a lowercase SHA-256`);
    return false;
  }
  return true;
}

function validateManifestReference(reference, label, root, failures) {
  if (!isObject(reference)) {
    failures.push(`${label} must be a manifest reference mapping`);
    return null;
  }
  requireExactKeys(reference, ["byteSize", "path", "sha256"], label, failures);
  if (!requireRelativePath(reference.path, `${label}.path`, failures, "evidence/runtime/tailwind-b2/trials/")) {
    return null;
  }
  if (!reference.path.endsWith(".log")) failures.push(`${label}.path must end with .log`);
  const filePath = join(root, reference.path);
  if (!existsSync(filePath)) {
    failures.push(`${label} manifest is missing: ${reference.path}`);
    return null;
  }
  const stat = lstatSync(filePath);
  if (!stat.isFile() || stat.isSymbolicLink()) {
    failures.push(`${label} must reference a regular non-symbolic file`);
    return null;
  }
  const source = readFileSync(filePath);
  if (source.length === 0 || reference.byteSize !== source.length) {
    failures.push(`${label}.byteSize must match the non-empty manifest`);
  }
  if (!requireSha256(reference.sha256, `${label}.sha256`, failures) || reference.sha256 !== sha256(source)) {
    failures.push(`${label} SHA-256 must match the stored manifest`);
  }
  try {
    return JSON.parse(source.toString("utf8"));
  } catch (error) {
    failures.push(`${label} must contain valid JSON: ${error.message}`);
    return null;
  }
}

function computeFunctionalTreeSha256(files) {
  const chunks = [];
  for (const file of files) {
    const filePath = isObject(file) && typeof file.path === "string" ? file.path : "";
    const fileSha256 = isObject(file) && typeof file.sha256 === "string" && /^[a-f0-9]{64}$/.test(file.sha256)
      ? file.sha256
      : "0".repeat(64);
    const pathBytes = Buffer.from(filePath, "utf8");
    const pathLength = Buffer.alloc(4);
    pathLength.writeUInt32BE(pathBytes.length);
    chunks.push(pathLength, pathBytes, Buffer.from(fileSha256, "hex"));
  }
  return sha256(Buffer.concat(chunks));
}

function validateFunctionalState(functionalState, label, root, failures) {
  if (!isObject(functionalState)) {
    failures.push(`${label} must be a mapping`);
    return null;
  }
  requireExactKeys(
    functionalState,
    ["algorithm", "fileCount", "files", "treeSha256"],
    label,
    failures,
  );
  requireExact(functionalState.algorithm, functionalStateAlgorithm, `${label}.algorithm`, failures);
  if (!Array.isArray(functionalState.files)) {
    failures.push(`${label}.files must be an array`);
    return null;
  }
  if (!Number.isInteger(functionalState.fileCount) || functionalState.fileCount < 0) {
    failures.push(`${label}.fileCount must be a non-negative integer`);
  }
  requireExact(
    functionalState.fileCount,
    functionalState.files.length,
    `${label}.fileCount must equal files.length`,
    failures,
  );

  const paths = [];
  const filesByPath = new Map();
  const fileSourcesByPath = new Map();
  for (const [index, file] of functionalState.files.entries()) {
    const fileLabel = `${label}.files[${index}]`;
    if (!isObject(file)) {
      failures.push(`${fileLabel} must be a mapping`);
      continue;
    }
    requireExactKeys(file, ["byteSize", "objectPath", "path", "sha256"], fileLabel, failures);
    if (!requireCanonicalLogicalPath(file.path, `${fileLabel}.path`, failures)) continue;
    const validSha = requireSha256(file.sha256, `${fileLabel}.sha256`, failures);
    if (!Number.isInteger(file.byteSize) || file.byteSize < 0) {
      failures.push(`${fileLabel}.byteSize must be a non-negative integer`);
    }
    const expectedObjectPath = validSha ? `${stateObjectPrefix}${file.sha256}.blob` : null;
    requireExact(file.objectPath, expectedObjectPath, `${fileLabel}.objectPath derived from sha256`, failures);
    let source = null;
    if (expectedObjectPath && requireRelativePath(file.objectPath, `${fileLabel}.objectPath`, failures, stateObjectPrefix)) {
      const objectFilePath = join(root, file.objectPath);
      if (!existsSync(objectFilePath)) {
        failures.push(`${fileLabel}.objectPath state object is missing: ${file.objectPath}`);
      } else {
        const stat = lstatSync(objectFilePath);
        if (!stat.isFile() || stat.isSymbolicLink()) {
          failures.push(`${fileLabel}.objectPath must reference a regular non-symbolic state object`);
        } else {
          source = readFileSync(objectFilePath);
          if (source.length !== file.byteSize) {
            failures.push(`${fileLabel}.byteSize must match the stored state object`);
          }
          if (sha256(source) !== file.sha256) {
            failures.push(`${fileLabel}.sha256 and object filename must match the stored state object bytes`);
          }
        }
      }
    }
    if (filesByPath.has(file.path)) {
      failures.push(`${label}.files contains duplicate functionalState path ${file.path}`);
    }
    paths.push(file.path);
    filesByPath.set(file.path, file.sha256);
    if (source) fileSourcesByPath.set(file.path, source);
  }
  const sortedPaths = [...paths].sort(compareCanonicalPaths);
  requireExact(paths, sortedPaths, `${label}.files must be sorted by canonical UTF-8 bytes`, failures);
  for (const requiredPath of requiredFunctionalStatePaths) {
    if (!filesByPath.has(requiredPath)) {
      failures.push(`${label} is missing required path ${requiredPath}`);
    }
  }
  requireSha256(functionalState.treeSha256, `${label}.treeSha256`, failures);
  requireExact(
    functionalState.treeSha256,
    computeFunctionalTreeSha256(functionalState.files),
    `${label}.treeSha256 must match the computed length-prefixed path/file-SHA tree`,
    failures,
  );
  return {
    filesByPath,
    fileSourcesByPath,
    treeSha256: functionalState.treeSha256,
  };
}

function changedFunctionalPaths(before, after) {
  if (!before || !after) return [];
  return Array.from(new Set([
    ...before.filesByPath.keys(),
    ...after.filesByPath.keys(),
  ]))
    .filter((filePath) => before.filesByPath.get(filePath) !== after.filesByPath.get(filePath))
    .sort(compareCanonicalPaths);
}

function validateProtectedFunctionalState(before, after, label, failures) {
  if (!before || !after) return;
  for (const filePath of [
    ...protectedFunctionalStatePaths,
    ...protectedFixtureInfrastructurePaths,
  ]) {
    if (before.filesByPath.get(filePath) !== after.filesByPath.get(filePath)) {
      failures.push(`${label} protected functional path ${filePath} must remain unchanged`);
    }
  }
}

function validateFixtureStateManifest(document, label, root, failures) {
  if (!isObject(document)) return null;
  requireExactKeys(document, [
    "capture", "controls", "functionalState", "kind", "lighterSurfaceResolution", "route", "schemaVersion", "selectors", "viewport",
  ], label, failures);
  validateCapture(document.capture, `${label}.capture`, failures);
  requireExact(document.schemaVersion, "1.0", `${label}.schemaVersion`, failures);
  requireExact(document.kind, fixtureStateContract.kind, `${label}.kind`, failures);
  requireExact(document.route, fixtureStateContract.route, `${label}.route`, failures);
  requireExact(document.viewport, fixtureStateContract.viewport, `${label}.viewport`, failures);
  requireExact(document.selectors, fixtureStateContract.selectors, `${label}.selectors`, failures);
  requireExact(
    document.lighterSurfaceResolution,
    fixtureStateContract.lighterSurfaceResolution,
    `${label}.lighterSurfaceResolution`,
    failures,
  );
  if (!isObject(document.controls)) {
    failures.push(`${label}.controls must be a mapping`);
    return validateFunctionalState(document.functionalState, `${label}.functionalState`, root, failures);
  }
  requireExactKeys(document.controls, fixtureStateContract.controls, `${label}.controls`, failures);
  for (const component of fixtureStateContract.controls) {
    const control = document.controls[component];
    const controlLabel = `${label}.controls.${component}`;
    if (!isObject(control)) {
      failures.push(`${controlLabel} must be a mapping`);
      continue;
    }
    requireExactKeys(control, ["packageName", "packageVersion"], controlLabel, failures);
    requireExact(control.packageName, "@rain-next/ui", `${controlLabel}.packageName`, failures);
    requireNonEmptyString(control.packageVersion, `${controlLabel}.packageVersion`, failures);
  }
  return validateFunctionalState(document.functionalState, `${label}.functionalState`, root, failures);
}

function validateRunIdentity(identity, kind, label, failures) {
  if (!isObject(identity)) {
    failures.push(`${label} must be structured provenance, not a guessed string`);
    return;
  }
  if (identity.value === "unexposed") {
    requireExactKeys(identity, ["provenance", "reason", "value"], label, failures);
    requireExact(identity.provenance, "runtime-not-exposed", `${label}.provenance`, failures);
    requireNonEmptyString(identity.reason, `${label}.reason`, failures);
    return;
  }
  requireExactKeys(identity, ["provenance", "value"], label, failures);
  requireNonEmptyString(identity.value, `${label}.value`, failures);
  requireNonEmptyString(identity.provenance, `${label}.provenance`, failures);
  if (kind === "reasoningEffort" && !reasoningEfforts.includes(identity.value)) {
    failures.push(`${label}.value must be ${reasoningEfforts.join(", ")} or unexposed`);
  }
}

function validateCaptureSourceRoot(sourceRoot, label, failures) {
  if (!isObject(sourceRoot)) {
    failures.push(`${label} must be structured source-root provenance`);
    return;
  }
  requireExactKeys(sourceRoot, ["kind", "path", "pathProvenance", "retention"], label, failures);
  requireExact(sourceRoot.kind, "temporary-directory", `${label}.kind`, failures);
  if (!requireNonEmptyString(sourceRoot.path, `${label}.path`, failures) || !sourceRoot.path.startsWith("/private/tmp/")) {
    failures.push(`${label}.path must record the original /private/tmp trial root`);
  }
  requireExact(sourceRoot.pathProvenance, "coordinator-recorded", `${label}.pathProvenance`, failures);
  requireExact(sourceRoot.retention, "ephemeral", `${label}.retention`, failures);
}

function validateCapture(capture, label, failures) {
  if (!isObject(capture)) {
    failures.push(`${label} must record raw-byte content-addressing provenance`);
    return;
  }
  requireExactKeys(capture, ["coverage", "method", "sourceRoot"], label, failures);
  requireExact(capture.method, "raw-byte-content-addressing", `${label}.method`, failures);
  requireExact(capture.coverage, "functional-state-files-only", `${label}.coverage`, failures);
  validateCaptureSourceRoot(capture.sourceRoot, `${label}.sourceRoot`, failures);
}

function validateSourceProvenance(provenance, label, failures) {
  if (!isObject(provenance)) {
    failures.push(`${label} must record structured temporary-root provenance`);
    return;
  }
  requireExactKeys(provenance, ["coverage", "method", "sourceRoot", "verificationDependency"], label, failures);
  requireExact(provenance.method, "raw-byte-content-addressing", `${label}.method`, failures);
  requireExact(provenance.coverage, "functional-state-files-only", `${label}.coverage`, failures);
  validateCaptureSourceRoot(provenance.sourceRoot, `${label}.sourceRoot`, failures);
  requireExact(provenance.verificationDependency, false, `${label}.verificationDependency`, failures);
}

function validateMeasurement(measurement, field, label, trialStatus, failures) {
  if (!isObject(measurement)) {
    failures.push(`${label}.${field} must be a measurement mapping`);
    return;
  }
  const value = measurement.value;
  if (value === "not-measured") {
    requireExactKeys(measurement, ["reason", "value"], `${label}.${field}`, failures);
    requireNonEmptyString(measurement.reason, `${label}.${field}.reason`, failures);
    return;
  }

  const measuredKeys = field === "userCorrectionPrompts"
    ? ["evaluationSource", "evidence", "value"]
    : field === "continuationAssessment"
      ? ["assessmentSource", "evidence", "rubricVersion", "value"]
      : ["evidence", "value"];
  requireExactKeys(measurement, measuredKeys, `${label}.${field}`, failures);
  requireNonEmptyString(measurement.evidence, `${label}.${field}.evidence`, failures);
  if (trialStatus === "not-run") {
    failures.push(`${label} is not-run, so ${field} must remain not-measured with a reason`);
  }

  if ((field === "firstPass" || field === "scopeAccuracy") && !["pass", "fail"].includes(value)) {
    failures.push(`${label}.${field}.value must be pass, fail or not-measured`);
  } else if (
    (field === "userCorrectionPrompts" || field === "autonomousRepairCycles" || field === "elapsedMs") &&
    (!Number.isInteger(value) || value < 0)
  ) {
    failures.push(`${label}.${field}.value must be a non-negative integer or not-measured`);
  } else if (
    field === "continuationAssessment" &&
    !continuationValues.includes(value)
  ) {
    failures.push(`${label}.continuationAssessment.value must use the fixed rubric: ${continuationValues.join(", ")}, or not-measured`);
  }
  if (field === "userCorrectionPrompts") {
    requireExact(measurement.evaluationSource, "real-user-evaluation", `${label}.${field}.evaluationSource`, failures);
  }
  if (field === "continuationAssessment") {
    requireExact(measurement.rubricVersion, continuationRubric.version, `${label}.${field}.rubricVersion`, failures);
    requireExact(measurement.assessmentSource, continuationRubric.assessmentSource, `${label}.${field}.assessmentSource`, failures);
  }
}

function validateObservation(observation, field, label, trialStatus, failures) {
  if (!isObject(observation)) {
    failures.push(`${label}.${field} must be an observation mapping`);
    return;
  }
  const value = observation.value;
  if (value === "not-measured") {
    requireExactKeys(observation, ["reason", "value"], `${label}.${field}`, failures);
    requireNonEmptyString(observation.reason, `${label}.${field}.reason`, failures);
    return;
  }

  requireExactKeys(observation, ["evidence", "value"], `${label}.${field}`, failures);
  requireNonEmptyString(observation.evidence, `${label}.${field}.evidence`, failures);
  if (trialStatus === "not-run") {
    failures.push(`${label} is not-run, so ${field} must remain not-measured with a reason`);
  }

  if (field === "changedFiles") {
    if (!Array.isArray(value)) {
      failures.push(`${label}.changedFiles.value must be an array or not-measured`);
      return;
    }
    const seen = new Set();
    for (const [index, filePath] of value.entries()) {
      requireRelativePath(filePath, `${label}.changedFiles.value[${index}]`, failures);
      if (seen.has(filePath)) failures.push(`${label}.changedFiles contains duplicate path ${filePath}`);
      seen.add(filePath);
    }
  } else if (typeof value !== "boolean") {
    failures.push(`${label}.${field}.value must be a boolean or not-measured`);
  }
}

function validateRun(run, trial, index, benchmark, fixture, root, label, failures) {
  if (!isObject(run)) {
    failures.push(`${label}.run must be a mapping`);
    return null;
  }
  if (run.status === "not-recorded") {
    requireExactKeys(run, ["reason", "status"], `${label}.run`, failures);
    requireNonEmptyString(run.reason, `${label}.run.reason`, failures);
    if (trial.trialStatus === "completed") failures.push(`${label} completed status requires recorded run provenance`);
    return null;
  }
  if (run.status !== "recorded") {
    failures.push(`${label}.run.status must be not-recorded or recorded`);
    return false;
  }
  requireExactKeys(run, [
    "browser", "context", "endStateManifest", "endStateSha256", "model", "promptSha256",
    "protocolSha256", "reasoningEffort", "route", "runId", "runManifest", "runSha256",
    "selectors", "sourceProvenance", "startStateManifest", "startStateSha256", "status", "viewport",
  ], `${label}.run`, failures);
  if (trial.trialStatus === "not-run") failures.push(`${label} is not-run and cannot claim a recorded run`);
  requireNonEmptyString(run.runId, `${label}.run.runId`, failures);
  for (const field of ["runSha256", "protocolSha256", "promptSha256", "startStateSha256", "endStateSha256"]) {
    requireSha256(run[field], `${label}.run.${field}`, failures);
  }
  const runManifest = validateManifestReference(run.runManifest, `${label}.run.runManifest`, root, failures);
  const startStateManifest = validateManifestReference(
    run.startStateManifest,
    `${label}.run.startStateManifest`,
    root,
    failures,
  );
  const endStateManifest = validateManifestReference(
    run.endStateManifest,
    `${label}.run.endStateManifest`,
    root,
    failures,
  );
  requireExact(run.runSha256, run.runManifest?.sha256, `${label}.run.runSha256 from runManifest`, failures);
  requireExact(run.startStateSha256, run.startStateManifest?.sha256, `${label}.run.startStateSha256 from startStateManifest`, failures);
  requireExact(run.endStateSha256, run.endStateManifest?.sha256, `${label}.run.endStateSha256 from endStateManifest`, failures);
  if (isObject(runManifest)) {
    requireExactKeys(runManifest, ["architecture", "kind", "promptId", "runId", "schemaVersion"], `${label}.run.runManifest document`, failures);
    requireExact(runManifest.schemaVersion, "1.0", `${label}.run.runManifest.schemaVersion`, failures);
    requireExact(runManifest.kind, "TailwindB2RunManifest", `${label}.run.runManifest.kind`, failures);
    requireExact(runManifest.runId, run.runId, `${label}.run.runManifest.runId`, failures);
    requireExact(runManifest.promptId, trial.promptId, `${label}.run.runManifest.promptId`, failures);
    requireExact(runManifest.architecture, trial.architecture, `${label}.run.runManifest.architecture`, failures);
  }
  let endFunctionalState = null;
  if (isObject(endStateManifest)) {
    requireExactKeys(endStateManifest, ["architecture", "capture", "functionalState", "kind", "promptId", "schemaVersion", "stage"], `${label}.run.endStateManifest document`, failures);
    validateCapture(endStateManifest.capture, `${label}.run.endStateManifest.capture`, failures);
    requireExact(endStateManifest.schemaVersion, "1.0", `${label}.run.endStateManifest.schemaVersion`, failures);
    requireExact(endStateManifest.kind, "TailwindB2TrialStateManifest", `${label}.run.endStateManifest.kind`, failures);
    requireExact(endStateManifest.stage, "end", `${label}.run.endStateManifest.stage`, failures);
    requireExact(endStateManifest.promptId, trial.promptId, `${label}.run.endStateManifest.promptId`, failures);
    requireExact(endStateManifest.architecture, trial.architecture, `${label}.run.endStateManifest.architecture`, failures);
    endFunctionalState = validateFunctionalState(
      endStateManifest.functionalState,
      `${label}.run.endStateManifest.functionalState`,
      root,
      failures,
    );
    requireExact(
      endStateManifest.capture?.sourceRoot,
      run.sourceProvenance?.sourceRoot,
      `${label}.run sourceProvenance must match endStateManifest.capture.sourceRoot`,
      failures,
    );
  }
  let startFunctionalState = null;
  if (index < 2) {
    requireExact(run.startStateManifest, fixture?.stateManifest, `${label}.run.startStateManifest must equal the common fixture manifest`, failures);
    startFunctionalState = validateFixtureStateManifest(startStateManifest, `${label}.run.startStateManifest document`, root, failures);
  } else if (isObject(startStateManifest)) {
    startFunctionalState = validateFunctionalState(
      startStateManifest.functionalState,
      `${label}.run.startStateManifest.functionalState`,
      root,
      failures,
    );
  }
  requireExact(run.protocolSha256, sha256(JSON.stringify(benchmark)), `${label}.run.protocolSha256`, failures);
  requireExact(run.promptSha256, sha256(promptTexts[index]), `${label}.run.promptSha256`, failures);
  validateRunIdentity(run.model, "model", `${label}.run.model`, failures);
  validateRunIdentity(run.reasoningEffort, "reasoningEffort", `${label}.run.reasoningEffort`, failures);
  validateSourceProvenance(run.sourceProvenance, `${label}.run.sourceProvenance`, failures);
  requireExact(
    run.sourceProvenance?.sourceRoot?.path,
    nativeSourceRoots.runs[index],
    `${label}.run.sourceProvenance.sourceRoot.path`,
    failures,
  );
  requireExact(
    run.context,
    index < 2 ? "fresh-independent-common-fixture" : "saved-prerequisite-assembly",
    `${label}.run.context`,
    failures,
  );
  requireExact(run.route, fixtureStateContract.route, `${label}.run.route`, failures);
  if (!isObject(run.viewport)) {
    failures.push(`${label}.run.viewport must be a mapping`);
  } else {
    requireExactKeys(run.viewport, ["height", "width"], `${label}.run.viewport`, failures);
    requireExact(run.viewport, fixtureStateContract.viewport, `${label}.run.viewport`, failures);
  }
  if (!isObject(run.browser)) {
    failures.push(`${label}.run.browser must be a mapping`);
  } else {
    requireExactKeys(run.browser, ["name", "version"], `${label}.run.browser`, failures);
    requireNonEmptyString(run.browser.name, `${label}.run.browser.name`, failures);
    requireNonEmptyString(run.browser.version, `${label}.run.browser.version`, failures);
  }
  if (!isObject(run.selectors)) {
    failures.push(`${label}.run.selectors must be a mapping`);
  } else {
    requireExactKeys(run.selectors, ["formalSearchIcon", "nonTarget", "target"], `${label}.run.selectors`, failures);
    requireExact(run.selectors, {
      target: fixtureStateContract.runTargetSelector,
      nonTarget: fixtureStateContract.selectors.nonTarget,
      formalSearchIcon: fixtureStateContract.selectors.formalSearchIcon,
    }, `${label}.run.selectors`, failures);
  }
  if (index < 2 && fixture?.status === "prepared") {
    requireExact(run.startStateSha256, fixture.stateManifest?.sha256, `${label}.run.startStateSha256`, failures);
  }
  return { endFunctionalState, startFunctionalState };
}

function validateRunFunctionalStateConsistency(runState, trial, criteria, index, label, failures) {
  if (!runState?.startFunctionalState || !runState?.endFunctionalState) return;
  validateProtectedFunctionalState(
    runState.startFunctionalState,
    runState.endFunctionalState,
    `${label}.run start/end functionalState`,
    failures,
  );
  const changedPaths = changedFunctionalPaths(
    runState.startFunctionalState,
    runState.endFunctionalState,
  );
  const observedChangedFiles = trial.observations?.changedFiles?.value;
  if (Array.isArray(observedChangedFiles)) {
    const sortedObserved = [...observedChangedFiles].sort(compareCanonicalPaths);
    requireExact(
      sortedObserved,
      changedPaths,
      `${label}.observations.changedFiles must match run start/end functionalState changes`,
      failures,
    );
  }
  const unexpectedPromptPaths = changedPaths.filter(
    (filePath) => !promptLocalChangePaths[index]?.includes(filePath),
  );
  if (unexpectedPromptPaths.length > 0) {
    failures.push(
      `${label}.run functionalState changes must stay inside the prompt-local path allowlist; unexpected ${unexpectedPromptPaths.join(", ")}`,
    );
  }
  const targetAcceptance = trial.acceptanceEvidence?.find(
    (entry) => entry?.criterionId === criteria[0]?.id,
  );
  const hasFixtureFunctionalChange = changedPaths.some((filePath) =>
    fixtureFunctionalStatePaths.includes(filePath) ||
    filePath.startsWith("apps/playground/src/experiments/tailwind-b2-native-baseline/")
  );
  if (targetAcceptance?.assessment?.value === "pass" && !hasFixtureFunctionalChange) {
    failures.push(`${label}.run.endStateManifest functionalState must record at least one fixture functional state change when target acceptance passes`);
  }
}

function validateProtectedComparisons(comparisons, trialStatus, label, failures) {
  if (!isObject(comparisons)) {
    failures.push(`${label}.protectedComparisons must be a mapping`);
    return false;
  }
  requireExactKeys(comparisons, comparisonFields, `${label}.protectedComparisons`, failures);
  let allRecorded = true;
  for (const field of comparisonFields) {
    const comparison = comparisons[field];
    const comparisonLabel = `${label}.protectedComparisons.${field}`;
    if (!isObject(comparison)) {
      failures.push(`${comparisonLabel} must be a mapping`);
      allRecorded = false;
      continue;
    }
    if (comparison.status === "not-measured") {
      requireExactKeys(comparison, ["reason", "status", "subject"], comparisonLabel, failures);
      requireNonEmptyString(comparison.subject, `${comparisonLabel}.subject`, failures);
      requireNonEmptyString(comparison.reason, `${comparisonLabel}.reason`, failures);
      allRecorded = false;
      continue;
    }
    if (comparison.status !== "recorded") {
      failures.push(`${comparisonLabel}.status must be not-measured or recorded`);
      allRecorded = false;
      continue;
    }
    requireExactKeys(comparison, [
      "afterSha256", "beforeSha256", "evidence", "evidenceRefs", "status", "subject", "verdict",
    ], comparisonLabel, failures);
    if (trialStatus === "not-run") failures.push(`${label} is not-run and cannot claim recorded ${field} evidence`);
    requireNonEmptyString(comparison.subject, `${comparisonLabel}.subject`, failures);
    requireSha256(comparison.beforeSha256, `${comparisonLabel}.beforeSha256`, failures);
    requireSha256(comparison.afterSha256, `${comparisonLabel}.afterSha256`, failures);
    if (!["unchanged", "changed"].includes(comparison.verdict)) {
      failures.push(`${comparisonLabel}.verdict must be unchanged or changed`);
    } else if ((comparison.beforeSha256 === comparison.afterSha256) !== (comparison.verdict === "unchanged")) {
      failures.push(`${comparisonLabel}.verdict must match the before/after hashes`);
    }
    if (!Array.isArray(comparison.evidenceRefs) || comparison.evidenceRefs.length === 0) {
      failures.push(`${comparisonLabel}.evidenceRefs must be a non-empty array`);
    }
    requireNonEmptyString(comparison.evidence, `${comparisonLabel}.evidence`, failures);
  }
  return allRecorded;
}

function validateAcceptanceEvidence(evidence, criteria, trialStatus, label, failures) {
  if (!Array.isArray(evidence)) {
    failures.push(`${label}.acceptanceEvidence must be an array`);
    return false;
  }
  requireExact(evidence.map(({ criterionId }) => criterionId), criteria.map(({ id }) => id), `${label}.acceptanceEvidence criterion IDs`, failures);
  let automatedComplete = true;
  evidence.forEach((entry, criterionIndex) => {
    const criterion = criteria[criterionIndex];
    const entryLabel = `${label}.acceptanceEvidence[${criterionIndex}]`;
    if (!isObject(entry)) {
      failures.push(`${entryLabel} must be a mapping`);
      automatedComplete = false;
      return;
    }
    requireExactKeys(entry, ["assessment", "criterionId", "route"], entryLabel, failures);
    requireExact(entry.route, criterion?.route, `${entryLabel}.route`, failures);
    if (!isObject(entry.assessment)) {
      failures.push(`${entryLabel}.assessment must be a mapping`);
      automatedComplete = false;
      return;
    }
    if (entry.assessment.value === "not-measured") {
      requireExactKeys(entry.assessment, ["reason", "value"], `${entryLabel}.assessment`, failures);
      requireNonEmptyString(entry.assessment.reason, `${entryLabel}.assessment.reason`, failures);
      if (criterion?.route === "automated") automatedComplete = false;
      return;
    }
    requireExactKeys(entry.assessment, ["evidence", "evidenceRefs", "value"], `${entryLabel}.assessment`, failures);
    if (criterion?.route === "human-gate") {
      failures.push(`${entryLabel} ${criterion.id} must remain not-measured and route to human-gate`);
    }
    if (trialStatus === "not-run") failures.push(`${label} is not-run and cannot claim measured acceptance evidence`);
    if (!["pass", "fail"].includes(entry.assessment.value)) {
      failures.push(`${entryLabel}.assessment.value must be pass, fail or not-measured`);
    }
    requireExact(entry.assessment.evidenceRefs, criterion?.evidenceRefs, `${entryLabel}.assessment.evidenceRefs`, failures);
    requireNonEmptyString(entry.assessment.evidence, `${entryLabel}.assessment.evidence`, failures);
  });
  if (trialStatus === "completed" && !automatedComplete) {
    failures.push(`${label} completed status requires evidence for every automated acceptance criterion`);
  }
  return automatedComplete;
}

function validateCrossFieldConsistency(trial, criteria, index, label, failures) {
  const assessmentByCriterion = new Map(
    Array.isArray(trial.acceptanceEvidence)
      ? trial.acceptanceEvidence.map((entry) => [entry?.criterionId, entry?.assessment?.value])
      : [],
  );
  const protectedAcceptance = [
    {
      comparison: "globalMaster",
      criterion: index === 1 ? "button-master-unchanged" : "input-master-unchanged",
    },
    { comparison: "nonTarget", criterion: "non-target-controls-unchanged" },
    { comparison: "formalSearchIcon", criterion: "formal-search-icon-unchanged" },
  ];

  for (const { comparison, criterion } of protectedAcceptance) {
    if (
      trial.protectedComparisons?.[comparison]?.status === "recorded" &&
      trial.protectedComparisons[comparison].verdict === "changed" &&
      assessmentByCriterion.get(criterion) === "pass"
    ) {
      failures.push(`${label}.protectedComparisons.${comparison} changed cannot correspond to acceptance pass for ${criterion}`);
    }
  }

  for (const comparison of ["globalMaster", "nonTarget"]) {
    if (
      trial.protectedComparisons?.[comparison]?.status === "recorded" &&
      trial.protectedComparisons[comparison].verdict === "changed" &&
      trial.metrics?.scopeAccuracy?.value !== "fail"
    ) {
      failures.push(`${label}.protectedComparisons.${comparison} changed requires metrics.scopeAccuracy fail`);
    }
  }

  const hasFailedAutomatedCriterion = criteria.some((criterion) =>
    criterion.route === "automated" && assessmentByCriterion.get(criterion.id) === "fail"
  );
  if (hasFailedAutomatedCriterion && trial.metrics?.firstPass?.value === "pass") {
    failures.push(`${label} automated criterion fail cannot correspond to metrics.firstPass pass`);
  }
  if (trial.artifacts?.targetedTests?.status === "failed" && trial.metrics?.firstPass?.value === "pass") {
    failures.push(`${label}.artifacts.targetedTests failed cannot correspond to metrics.firstPass pass`);
  }
}

function parsePatchPaths(patchPath, label, failures) {
  const parsed = spawnSync(
    "git",
    ["apply", "--numstat", "-z", patchPath],
    { encoding: "utf8" },
  );
  if (parsed.status !== 0) {
    failures.push(`${label} must be a parseable patch: ${parsed.stderr.trim()}`);
    return [];
  }
  const paths = [];
  for (const record of parsed.stdout.split("\0").filter(Boolean)) {
    const firstTab = record.indexOf("\t");
    const secondTab = record.indexOf("\t", firstTab + 1);
    const filePath = secondTab >= 0 ? record.slice(secondTab + 1) : "";
    if (!filePath || !requireCanonicalLogicalPath(filePath, `${label} path`, failures)) {
      failures.push(`${label} contains an unsupported rename or unsafe path record`);
      continue;
    }
    paths.push(filePath);
  }
  if (paths.length === 0) failures.push(`${label} must contain at least one changed path`);
  if (new Set(paths).size !== paths.length) failures.push(`${label} contains duplicate diff paths`);
  return [...new Set(paths)].sort(compareCanonicalPaths);
}

function collectMaterializedFiles(directory, prefix = "") {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const logicalPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = join(directory, entry.name);
    if (entry.isSymbolicLink()) return [logicalPath];
    return entry.isDirectory()
      ? collectMaterializedFiles(absolutePath, logicalPath)
      : [logicalPath];
  });
}

function validatePatchTransition(patchArtifact, startState, endState, changedFiles, root, label, failures) {
  if (!startState || !endState || !isObject(patchArtifact) || patchArtifact.status !== "captured") return;
  if (
    !requireRelativePath(
      patchArtifact.path,
      `${label}.path`,
      failures,
      "evidence/runtime/tailwind-b2/trials/",
    ) ||
    !patchArtifact.path.endsWith(".patch")
  ) return;
  const patchPath = join(root, patchArtifact.path ?? "");
  if (!existsSync(patchPath)) return;
  const patchPaths = parsePatchPaths(patchPath, `${label} patch`, failures);
  const expectedPaths = Array.isArray(changedFiles)
    ? [...changedFiles].sort(compareCanonicalPaths)
    : [];
  requireExact(patchPaths, expectedPaths, `${label} patch paths must exactly match observations.changedFiles`, failures);
  if (
    startState.fileSourcesByPath.size !== startState.filesByPath.size ||
    endState.fileSourcesByPath.size !== endState.filesByPath.size
  ) return;

  const replayRoot = mkdtempSync(join(tmpdir(), "rain-b2-patch-replay-"));
  try {
    for (const [filePath, source] of startState.fileSourcesByPath) {
      const target = join(replayRoot, filePath);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, source, { flag: "wx" });
    }
    const check = spawnSync(
      "git",
      ["apply", "--check", "--whitespace=error-all", patchPath],
      { cwd: replayRoot, encoding: "utf8" },
    );
    if (check.status !== 0) {
      failures.push(`${label} patch must apply without fuzz or whitespace errors to materialized start objects: ${check.stderr.trim()}`);
      return;
    }
    const applied = spawnSync(
      "git",
      ["apply", "--whitespace=error-all", patchPath],
      { cwd: replayRoot, encoding: "utf8" },
    );
    if (applied.status !== 0) {
      failures.push(`${label} patch failed deterministic replay: ${applied.stderr.trim()}`);
      return;
    }
    const actualPaths = collectMaterializedFiles(replayRoot)
      .sort(compareCanonicalPaths);
    const endPaths = [...endState.filesByPath.keys()]
      .sort(compareCanonicalPaths);
    requireExact(actualPaths, endPaths, `${label} replayed file inventory must match end functionalState`, failures);
    for (const [filePath, expectedSource] of endState.fileSourcesByPath) {
      const target = join(replayRoot, filePath);
      if (!existsSync(target)) {
        failures.push(`${label} replayed bytes must exactly match end functionalState object for ${filePath}`);
        continue;
      }
      const stat = lstatSync(target);
      if (!stat.isFile() || stat.isSymbolicLink()) {
        failures.push(`${label} replayed path must be a regular non-symbolic file for ${filePath}`);
        continue;
      }
      if (!readFileSync(target).equals(expectedSource)) {
        failures.push(`${label} replayed bytes must exactly match end functionalState object for ${filePath}`);
      }
    }
  } finally {
    rmSync(replayRoot, { recursive: true, force: true });
  }
}

function validateAssembledFunctionalState(
  commonState,
  sourceRunStates,
  assembledState,
  conflicts,
  label,
  failures,
) {
  const sourceStates = sourceRunStates.map((runState) => runState?.endFunctionalState);
  if (!commonState || !assembledState || sourceStates.some((state) => !state)) return;
  const entries = Array.isArray(conflicts?.entries) ? conflicts.entries : [];
  const entryPaths = [];
  const entriesByPath = new Map();
  for (const [index, entry] of entries.entries()) {
    const entryLabel = `${label}.conflicts.entries[${index}]`;
    if (!isObject(entry)) {
      failures.push(`${entryLabel} must be a structured assembly exception`);
      continue;
    }
    requireExactKeys(
      entry,
      ["assembledSha256", "evidence", "expectedSha256", "kind", "path", "resolution"],
      entryLabel,
      failures,
    );
    if (!requireRelativePath(entry.path, `${entryLabel}.path`, failures)) continue;
    entryPaths.push(entry.path);
    if (entriesByPath.has(entry.path)) {
      failures.push(`${label}.conflicts.entries contains duplicate path ${entry.path}`);
    }
    entriesByPath.set(entry.path, entry);
    if (entry.kind !== "both-sources-changed") {
      failures.push(`${entryLabel}.kind must be both-sources-changed; assembly-normalization is not accepted`);
    }
    requireNonEmptyString(entry.resolution, `${entryLabel}.resolution`, failures);
    requireNonEmptyString(entry.evidence, `${entryLabel}.evidence`, failures);
    requireSha256(entry.expectedSha256, `${entryLabel}.expectedSha256`, failures);
    requireSha256(entry.assembledSha256, `${entryLabel}.assembledSha256`, failures);
    requireExact(
      entry.assembledSha256,
      assembledState.filesByPath.get(entry.path),
      `${entryLabel}.assembledSha256 must match the assembled functionalState`,
      failures,
    );
  }
  requireExact(
    entryPaths,
    [...entryPaths].sort(compareCanonicalPaths),
    `${label}.conflicts.entries must be sorted by canonical UTF-8 bytes`,
    failures,
  );

  const allPaths = Array.from(new Set([
    ...commonState.filesByPath.keys(),
    ...sourceStates.flatMap((state) => [...state.filesByPath.keys()]),
    ...assembledState.filesByPath.keys(),
  ])).sort(compareCanonicalPaths);
  let sourceChangeCount = 0;
  for (const filePath of allPaths) {
    const commonHash = commonState.filesByPath.get(filePath);
    const p1Hash = sourceStates[0].filesByPath.get(filePath);
    const p2Hash = sourceStates[1].filesByPath.get(filePath);
    const p1Changed = p1Hash !== commonHash;
    const p2Changed = p2Hash !== commonHash;
    if (p1Changed || p2Changed) sourceChangeCount += 1;

    let expectedHash = commonHash;
    if (p1Changed && !p2Changed) expectedHash = p1Hash;
    if (!p1Changed && p2Changed) expectedHash = p2Hash;
    if (p1Changed && p2Changed && p1Hash === p2Hash) expectedHash = p1Hash;
    const assembledHash = assembledState.filesByPath.get(filePath);
    if (p1Changed && p2Changed && p1Hash !== p2Hash) {
      const entry = conflicts?.status === "resolved" ? entriesByPath.get(filePath) : null;
      if (!entry || entry.kind !== "both-sources-changed") {
        failures.push(`${label} assembled functionalState has an unrecorded P1/P2 conflict for ${filePath}`);
      } else {
        requireExact(
          entry.expectedSha256,
          p1Hash,
          `${label}.conflicts entry expectedSha256 must match the materialized P1 resolution-patch input for ${filePath}`,
          failures,
        );
      }
      continue;
    }
    if (assembledHash !== expectedHash) {
      failures.push(`${label} assembled functionalState must byte-match the deterministic P1/P2 state for ${filePath}; assembly-normalization is not accepted`);
    } else if (entriesByPath.has(filePath)) {
      failures.push(`${label}.conflicts.entries exception for ${filePath} is not needed by an assembled-state difference`);
    }
  }
  if (
    sourceChangeCount > 0 &&
    changedFunctionalPaths(commonState, assembledState).length === 0
  ) {
    failures.push(`${label} assembled functionalState must differ from the common fixture when P1/P2 states contain a change`);
  }
  validateProtectedFunctionalState(
    commonState,
    assembledState,
    `${label} assembled functionalState`,
    failures,
  );
}

function validatePrerequisiteAssembly(
  assembly,
  results,
  trial,
  root,
  fixtureFunctionalState,
  sourceRunStates,
  label,
  failures,
) {
  if (!isObject(assembly)) {
    failures.push(`${label}.start.prerequisiteAssembly must be a mapping`);
    return false;
  }
  requireExact(assembly.applicationOrder, tailwindB2PromptIds.slice(0, 2), `${label}.start.prerequisiteAssembly.applicationOrder`, failures);
  requireExact(assembly.costExcludedFromP3, true, `${label}.start.prerequisiteAssembly.costExcludedFromP3`, failures);
  if (assembly.status === "not-recorded") {
    requireExactKeys(assembly, ["applicationOrder", "costExcludedFromP3", "reason", "status"], `${label}.start.prerequisiteAssembly`, failures);
    requireNonEmptyString(assembly.reason, `${label}.start.prerequisiteAssembly.reason`, failures);
    if (trial.trialStatus === "completed") failures.push(`${label} completed status requires recorded prerequisiteAssembly evidence`);
    return false;
  }
  if (assembly.status !== "recorded") {
    failures.push(`${label}.start.prerequisiteAssembly.status must be not-recorded or recorded`);
    return false;
  }
  requireExactKeys(assembly, [
    "applicationOrder", "assembledStateManifest", "assembledStateSha256", "conflicts",
    "costExcludedFromP3", "resolutionPatch", "sourcePatches", "status",
  ], `${label}.start.prerequisiteAssembly`, failures);
  if (!Array.isArray(assembly.sourcePatches)) {
    failures.push(`${label}.start.prerequisiteAssembly.sourcePatches must be an array`);
  } else {
    requireExact(assembly.sourcePatches.map(({ promptId }) => promptId), tailwindB2PromptIds.slice(0, 2), `${label}.start.prerequisiteAssembly source patch order`, failures);
    assembly.sourcePatches.forEach((source, index) => {
      requireExactKeys(source, ["path", "promptId", "sha256"], `${label}.start.prerequisiteAssembly.sourcePatches[${index}]`, failures);
      requireExact(source.path, results[index]?.artifacts?.diff?.path, `${label}.start.prerequisiteAssembly.sourcePatches[${index}].path`, failures);
      requireExact(source.sha256, results[index]?.artifacts?.diff?.sha256, `${label}.start.prerequisiteAssembly.sourcePatches[${index}].sha256`, failures);
    });
  }
  validateStoredArtifact(
    assembly.resolutionPatch,
    "diff",
    `${label}.start.prerequisiteAssembly.resolutionPatch`,
    root,
    failures,
  );
  requireSha256(assembly.assembledStateSha256, `${label}.start.prerequisiteAssembly.assembledStateSha256`, failures);
  const assembledState = validateManifestReference(
    assembly.assembledStateManifest,
    `${label}.start.prerequisiteAssembly.assembledStateManifest`,
    root,
    failures,
  );
  requireExact(
    assembly.assembledStateSha256,
    assembly.assembledStateManifest?.sha256,
    `${label}.start.prerequisiteAssembly.assembledStateSha256 from assembledStateManifest`,
    failures,
  );
  let assembledFunctionalState = null;
  if (isObject(assembledState)) {
    requireExactKeys(assembledState, [
      "applicationOrder", "capture", "functionalState", "kind", "promptId", "resolutionPatch", "schemaVersion", "sourcePatches",
    ], `${label}.start.prerequisiteAssembly.assembledStateManifest document`, failures);
    validateCapture(assembledState.capture, `${label}.start.prerequisiteAssembly.assembledStateManifest.capture`, failures);
    requireExact(assembledState.schemaVersion, "1.0", `${label}.start.prerequisiteAssembly.assembledStateManifest.schemaVersion`, failures);
    requireExact(assembledState.kind, "TailwindB2AssembledStateManifest", `${label}.start.prerequisiteAssembly.assembledStateManifest.kind`, failures);
    requireExact(assembledState.promptId, tailwindB2PromptIds[2], `${label}.start.prerequisiteAssembly.assembledStateManifest.promptId`, failures);
    requireExact(assembledState.applicationOrder, assembly.applicationOrder, `${label}.start.prerequisiteAssembly.assembledStateManifest.applicationOrder`, failures);
    requireExact(assembledState.sourcePatches, assembly.sourcePatches, `${label}.start.prerequisiteAssembly.assembledStateManifest.sourcePatches`, failures);
    requireExact(assembledState.resolutionPatch, assembly.resolutionPatch, `${label}.start.prerequisiteAssembly.assembledStateManifest.resolutionPatch`, failures);
    assembledFunctionalState = validateFunctionalState(
      assembledState.functionalState,
      `${label}.start.prerequisiteAssembly.assembledStateManifest.functionalState`,
      root,
      failures,
    );
    requireExact(
      assembledState.capture?.sourceRoot?.path,
      nativeSourceRoots.assembled,
      `${label}.start.prerequisiteAssembly.assembledStateManifest.capture.sourceRoot.path`,
      failures,
    );
  }
  if (trial.run?.status === "recorded") {
    requireExact(trial.run.startStateSha256, assembly.assembledStateSha256, `${label}.run.startStateSha256 from prerequisiteAssembly`, failures);
    requireExact(trial.run.startStateManifest, assembly.assembledStateManifest, `${label}.run.startStateManifest from prerequisiteAssembly`, failures);
  }
  if (!isObject(assembly.conflicts)) {
    failures.push(`${label}.start.prerequisiteAssembly.conflicts must be a mapping`);
  } else {
    requireExactKeys(assembly.conflicts, ["entries", "evidence", "status"], `${label}.start.prerequisiteAssembly.conflicts`, failures);
    if (!["none", "resolved", "unresolved"].includes(assembly.conflicts.status)) {
      failures.push(`${label}.start.prerequisiteAssembly.conflicts.status must be none, resolved or unresolved`);
    }
    if (!Array.isArray(assembly.conflicts.entries)) {
      failures.push(`${label}.start.prerequisiteAssembly.conflicts.entries must be an array`);
    } else if (assembly.conflicts.status === "none" && assembly.conflicts.entries.length !== 0) {
      failures.push(`${label}.start.prerequisiteAssembly.conflicts.entries must be empty when status is none`);
    } else if (assembly.conflicts.status !== "none" && assembly.conflicts.entries.length === 0) {
      failures.push(`${label}.start.prerequisiteAssembly.conflicts.entries must record each conflict`);
    }
    requireNonEmptyString(assembly.conflicts.evidence, `${label}.start.prerequisiteAssembly.conflicts.evidence`, failures);
    if (trial.trialStatus === "completed" && assembly.conflicts.status === "unresolved") {
      failures.push(`${label} cannot complete with unresolved prerequisite assembly conflicts`);
    }
  }
  validateAssembledFunctionalState(
    fixtureFunctionalState,
    sourceRunStates,
    assembledFunctionalState,
    assembly.conflicts,
    `${label}.start.prerequisiteAssembly`,
    failures,
  );
  validatePatchTransition(
    assembly.resolutionPatch,
    sourceRunStates[0]?.endFunctionalState,
    assembledFunctionalState,
    results[1]?.observations?.changedFiles?.value,
    root,
    `${label}.start.prerequisiteAssembly.resolutionPatch`,
    failures,
  );
  return true;
}

function validateStoredArtifact(artifact, kind, label, root, failures) {
  const idleStatus = kind === "targetedTests" ? "not-run" : "not-captured";
  const completedStatuses = kind === "targetedTests" ? ["passed", "failed"] : ["captured"];
  if (!isObject(artifact)) {
    failures.push(`${label}.${kind} must be an artifact mapping`);
    return false;
  }

  if (artifact.status === idleStatus) {
    requireExactKeys(artifact, ["reason", "status"], `${label}.${kind}`, failures);
    requireNonEmptyString(artifact.reason, `${label}.${kind}.reason`, failures);
    return false;
  }
  if (!completedStatuses.includes(artifact.status)) {
    failures.push(`${label}.${kind}.status must be ${[idleStatus, ...completedStatuses].join(", ")}`);
    return false;
  }

  const expectedKeys = kind === "screenshot"
    ? ["byteSize", "height", "path", "sha256", "status", "width"]
    : kind === "targetedTests"
      ? ["byteSize", "command", "exitCode", "path", "sha256", "status"]
      : ["byteSize", "path", "sha256", "status"];
  requireExactKeys(artifact, expectedKeys, `${label}.${kind}`, failures);
  if (!requireRelativePath(
    artifact.path,
    `${label}.${kind}.path`,
    failures,
    "evidence/runtime/tailwind-b2/",
  )) return true;

  const extension = kind === "screenshot" ? ".png" : kind === "diff" ? ".patch" : ".log";
  if (!artifact.path.endsWith(extension)) {
    failures.push(`${label}.${kind}.path must end with ${extension}`);
  }
  const absolutePath = join(root, artifact.path);
  if (!existsSync(absolutePath)) {
    failures.push(`${label}.${kind} artifact is missing: ${artifact.path}`);
    return true;
  }
  const stat = lstatSync(absolutePath);
  if (!stat.isFile() || stat.isSymbolicLink()) {
    failures.push(`${label}.${kind} artifact must be a regular non-symbolic file`);
    return true;
  }
  const source = readFileSync(absolutePath);
  if (source.length === 0 || artifact.byteSize !== source.length) {
    failures.push(`${label}.${kind} byteSize must match the non-empty artifact`);
  }
  if (!/^[a-f0-9]{64}$/.test(artifact.sha256 ?? "") || artifact.sha256 !== sha256(source)) {
    failures.push(`${label}.${kind} SHA-256 must match the stored artifact`);
  }

  if (kind === "screenshot") {
    try {
      const metadata = inspectPngMetadata(source);
      if (artifact.width !== metadata.width || artifact.height !== metadata.height) {
        failures.push(`${label}.screenshot dimensions must match the stored PNG`);
      }
    } catch (error) {
      failures.push(`${label}.screenshot must be a valid PNG: ${error.message}`);
    }
  }
  if (kind === "targetedTests") {
    requireNonEmptyString(artifact.command, `${label}.targetedTests.command`, failures);
    if (!Number.isInteger(artifact.exitCode) || artifact.exitCode < 0) {
      failures.push(`${label}.targetedTests.exitCode must be a non-negative integer`);
    } else if (artifact.status === "passed" && artifact.exitCode !== 0) {
      failures.push(`${label}.targetedTests passed status requires exitCode 0`);
    } else if (artifact.status === "failed" && artifact.exitCode === 0) {
      failures.push(`${label}.targetedTests failed status requires a non-zero exitCode`);
    }
  }
  return true;
}

export function validateTailwindB2Benchmark(benchmark) {
  const failures = [];
  requireExactKeys(
    benchmark,
    ["acceptanceCriteria", "continuationRubric", "evidenceRequirements", "fixtureProtocol", "kind", "metadata", "metrics", "prompts", "schemaVersion", "trialProtocol"],
    "benchmark",
    failures,
  );
  requireExact(benchmark?.schemaVersion, "1.1", "benchmark.schemaVersion", failures);
  requireExact(benchmark?.kind, "TailwindB2AiEditabilityBenchmark", "benchmark.kind", failures);
  requireExact(benchmark?.metadata, {
    id: "tailwind-b2-ai-editability",
    phase: "tailwind-b2-composition-contract",
    pilotScope: "input-button-search-operation-pilot",
    status: "registered",
    elapsedTimeRole: "secondary",
    comparisonArms: ["native-css-baseline", "tailwind-b2"],
  }, "benchmark.metadata", failures);
  requireExact(benchmark?.fixtureProtocol, {
    status: "contract-defined",
    commonFixture: "same-content-controls-icons-viewport-and-acceptance-criteria",
    nonTargetControls: "required",
    lighterSurfaceResolution: "required-before-trials",
    formalSearchIcon: {
      assetId: "icon/search",
      importPath: "@rain-next/ui/icons/search",
      consumption: "static-single-icon-entry",
    },
    stateManifest: fixtureStateContract,
  }, "benchmark.fixtureProtocol", failures);
  requireExact(benchmark?.trialProtocol, {
    p1P2Start: "independent-common-fixture",
    p3Start: "saved-prior-results-same-architecture",
    prerequisiteCostExcludedFromP3: true,
    crossArchitectureStateReuse: false,
    functionalStateObjectStore: "sha256-derived-durable-blobs",
    completedPatchReplay: "strict-materialized-start-to-end",
    p3ResolutionPatchReplay: "p1-end-to-assembled-exact-p2-changed-files",
    unobservedValue: "not-measured",
    unobservedReasonRequired: true,
  }, "benchmark.trialProtocol", failures);
  requireExact(benchmark?.metrics, {
    value: [
      { id: "first-pass-success", field: "firstPass", valueType: "pass-fail" },
      { id: "user-correction-prompts", field: "userCorrectionPrompts", valueType: "non-negative-integer-or-not-measured", provenance: "real-user-evaluation-only" },
      { id: "scope-accuracy", field: "scopeAccuracy", valueType: "pass-fail" },
      { id: "continuation-assessment", field: "continuationAssessment", valueType: "fixed-rubric-enum", rubricVersion: "1.0" },
    ],
    secondary: [
      { id: "autonomous-repair-cycles", field: "autonomousRepairCycles", valueType: "non-negative-integer", role: "diagnostic" },
      { id: "elapsed-time", field: "elapsedMs", valueType: "non-negative-integer", role: "secondary" },
    ],
  }, "benchmark.metrics", failures);
  requireExact(benchmark?.continuationRubric, continuationRubric, "benchmark.continuationRubric", failures);
  requireExact(benchmark?.acceptanceCriteria, acceptanceCriteria, "benchmark.acceptanceCriteria", failures);
  requireExact(benchmark?.evidenceRequirements, {
    perCompletedTrial: ["run-provenance", "run-start-end-state-manifests", "diff", "screenshot", "targeted-tests", "acceptance-evidence", "protected-comparisons", "content-addressed-functional-state", "strict-patch-replay"],
    runHashes: ["runSha256", "protocolSha256", "promptSha256", "startStateSha256", "endStateSha256"],
    runEnvironment: ["model", "reasoningEffort", "context", "route", "viewport", "browser", "selectors", "sourceProvenance"],
    changedFiles: "record-exact-repository-relative-paths",
    sharedMasterChange: "record-true-or-false-with-evidence",
    unregisteredVisualValues: "record-true-or-false-with-evidence",
    protectedBeforeAfter: ["globalMaster", "nonTarget", "formalSearchIcon"],
    p2VisualHierarchy: "not-measured-route-to-human-gate",
    unexposedRunMetadata: "value-unexposed-with-reason-and-provenance",
    temporarySourceRoots: "recorded-for-provenance-never-required-for-verification",
  }, "benchmark.evidenceRequirements", failures);

  if (!Array.isArray(benchmark?.prompts)) {
    failures.push("benchmark.prompts must be an array");
  } else {
    requireExact(benchmark.prompts.map(({ id }) => id), tailwindB2PromptIds, "benchmark prompt IDs", failures);
    requireExact(benchmark.prompts.map(({ text }) => text), promptTexts, "benchmark prompt text", failures);
    benchmark.prompts.forEach((prompt, index) => {
      const expectedStart = index < 2
        ? { mode: "independent-common-fixture", prerequisitePromptIds: [] }
        : { mode: "saved-prior-results-same-architecture", prerequisitePromptIds: tailwindB2PromptIds.slice(0, 2) };
      requireExactKeys(prompt, ["id", "start", "text"], `benchmark.prompts[${index}]`, failures);
      requireExact(prompt.start, expectedStart, `benchmark.prompts[${index}].start`, failures);
    });
  }
  return failures;
}

export function validateTailwindB2Results(results, benchmark, { root = process.cwd() } = {}) {
  const failures = [];
  requireExactKeys(results, ["fixture", "kind", "metadata", "results", "schemaVersion"], "baseline", failures);
  requireExact(results?.schemaVersion, "1.1", "baseline.schemaVersion", failures);
  requireExact(results?.kind, "TailwindB2TrialResults", "baseline.kind", failures);
  if (!isObject(results?.metadata)) {
    failures.push("baseline.metadata must be a mapping");
  } else {
    requireExactKeys(results.metadata, [
      "architecture", "benchmarkId", "benchmarkPath", "comparisonStatus", "phase", "task2Status", "trials",
    ], "baseline.metadata", failures);
    requireExact(results.metadata.benchmarkId, benchmark?.metadata?.id, "baseline.metadata.benchmarkId", failures);
    requireExact(results.metadata.benchmarkPath, tailwindB2BenchmarkPath, "baseline.metadata.benchmarkPath", failures);
    requireExact(results.metadata.phase, "tailwind-b2-composition-contract", "baseline.metadata.phase", failures);
    requireExact(results.metadata.architecture, "native-css-baseline", "baseline.metadata.architecture", failures);
    requireExact(results.metadata.comparisonStatus, "not-run", "baseline.metadata.comparisonStatus", failures);
  }
  let fixtureFunctionalState = null;
  if (!isObject(results?.fixture)) {
    failures.push("baseline.fixture must be a mapping");
  } else {
    const fixtureKeys = results.fixture.status === "not-prepared"
      ? ["definitionRef", "formalSearchIcon", "protocol", "reason", "status"]
      : ["definitionRef", "formalSearchIcon", "protocol", "sourceProvenance", "stateManifest", "status"];
    requireExactKeys(results.fixture, fixtureKeys, "baseline.fixture", failures);
    if (!["not-prepared", "prepared"].includes(results.fixture.status)) {
      failures.push("baseline.fixture.status must be not-prepared or prepared");
    }
    if (results.fixture.status === "not-prepared") {
      requireNonEmptyString(results.fixture.reason, "baseline.fixture.reason", failures);
    } else if (results.fixture.status === "prepared") {
      validateSourceProvenance(results.fixture.sourceProvenance, "baseline.fixture.sourceProvenance", failures);
      const fixtureManifest = validateManifestReference(
        results.fixture.stateManifest,
        "baseline.fixture.stateManifest",
        root,
        failures,
      );
      fixtureFunctionalState = validateFixtureStateManifest(
        fixtureManifest,
        "baseline.fixture state manifest",
        root,
        failures,
      );
      requireExact(
        fixtureManifest?.capture?.sourceRoot,
        results.fixture.sourceProvenance?.sourceRoot,
        "baseline.fixture.sourceProvenance must match state manifest capture.sourceRoot",
        failures,
      );
      requireExact(
        results.fixture.sourceProvenance?.sourceRoot?.path,
        nativeSourceRoots.fixture,
        "baseline.fixture.sourceProvenance.sourceRoot.path",
        failures,
      );
    }
    requireExact(results.fixture.protocol, "same-content-controls-icons-viewport-and-acceptance-criteria", "baseline.fixture.protocol", failures);
    requireExact(results.fixture.definitionRef, tailwindB2ReadmePath, "baseline.fixture.definitionRef", failures);
    requireExact(results.fixture.formalSearchIcon, {
      assetId: "icon/search",
      importPath: "@rain-next/ui/icons/search",
    }, "baseline.fixture.formalSearchIcon", failures);
  }

  if (!Array.isArray(results?.results)) {
    failures.push("baseline.results must be an array");
    return failures;
  }
  requireExact(results.results.map(({ promptId }) => promptId), tailwindB2PromptIds, "baseline result prompt IDs", failures);
  const statuses = [];
  const runStates = [];
  results.results.forEach((trial, index) => {
    const label = `baseline.results[${index}]`;
    requireExactKeys(trial, [
      "acceptanceEvidence", "architecture", "artifacts", "metrics", "observations",
      "promptId", "protectedComparisons", "run", "start", "trialStatus",
    ], label, failures);
    if (!["not-run", "in-progress", "completed"].includes(trial.trialStatus)) {
      failures.push(`${label}.trialStatus must be not-run, in-progress or completed`);
    }
    statuses.push(trial.trialStatus);
    requireExact(trial.architecture, "native-css-baseline", `${label}.architecture`, failures);
    const expectedStart = index < 2
      ? { mode: "independent-common-fixture", prerequisitePromptIds: [] }
      : { mode: "saved-prior-results-same-architecture", prerequisitePromptIds: tailwindB2PromptIds.slice(0, 2) };
    if (!isObject(trial.start)) {
      failures.push(`${label}.start must be a mapping`);
    } else {
      requireExactKeys(
        trial.start,
        index < 2
          ? ["mode", "prerequisitePromptIds", "savedState"]
          : ["mode", "prerequisiteAssembly", "prerequisitePromptIds", "savedState"],
        `${label}.start`,
        failures,
      );
      requireExact(trial.start.mode, expectedStart.mode, `${label}.start.mode`, failures);
      requireExact(trial.start.prerequisitePromptIds, expectedStart.prerequisitePromptIds, `${label}.start.prerequisitePromptIds`, failures);
      const expectedSources = index < 2 ? [] : tailwindB2PromptIds.slice(0, 2);
      const savedState = trial.start.savedState;
      if (!isObject(savedState)) {
        failures.push(`${label}.start.savedState must be a mapping`);
      } else {
        requireExact(savedState.sourcePromptIds, expectedSources, `${label}.start.savedState.sourcePromptIds`, failures);
        if (index < 2) {
          requireExactKeys(savedState, ["reason", "sourcePromptIds", "status"], `${label}.start.savedState`, failures);
          requireExact(savedState.status, "not-required", `${label}.start.savedState.status`, failures);
          requireNonEmptyString(savedState.reason, `${label}.start.savedState.reason`, failures);
        } else if (savedState.status === "not-recorded") {
          requireExactKeys(savedState, ["reason", "sourcePromptIds", "status"], `${label}.start.savedState`, failures);
          requireNonEmptyString(savedState.reason, `${label}.start.savedState.reason`, failures);
        } else if (savedState.status === "recorded") {
          requireExactKeys(savedState, [
            "documentPath", "resultPointers", "sourcePromptIds", "status",
          ], `${label}.start.savedState`, failures);
          requireExact(savedState.documentPath, tailwindB2BaselinePath, `${label}.start.savedState.documentPath`, failures);
          requireExact(savedState.resultPointers, ["/results/0", "/results/1"], `${label}.start.savedState.resultPointers`, failures);
        } else {
          failures.push(`${label}.start.savedState.status must be not-recorded or recorded for P3`);
        }
      }
      if (index === 2) {
        validatePrerequisiteAssembly(
          trial.start.prerequisiteAssembly,
          results.results,
          trial,
          root,
          fixtureFunctionalState,
          runStates.slice(0, 2),
          label,
          failures,
        );
      }
    }

    const runState = validateRun(trial.run, trial, index, benchmark, results.fixture, root, label, failures);
    runStates[index] = runState;
    const hasRecordedRun = Boolean(runState);

    if (!isObject(trial.metrics)) {
      failures.push(`${label}.metrics must be a mapping`);
    } else {
      requireExactKeys(trial.metrics, metricFields, `${label}.metrics`, failures);
      for (const field of metricFields) {
        validateMeasurement(trial.metrics[field], field, `${label}.metrics`, trial.trialStatus, failures);
      }
      if (index === 1 && trial.metrics.firstPass?.value !== "not-measured") {
        failures.push(`${label}.metrics.firstPass must remain not-measured until the P2 visual hierarchy Human Gate`);
      }
      if (index < 2 && trial.metrics.continuationAssessment?.value !== "not-measured") {
        failures.push(`${label} P${index + 1} must keep continuationAssessment not-measured; only P3 measures continuation`);
      }
      if (trial.trialStatus === "completed") {
        for (const field of ["autonomousRepairCycles", "scopeAccuracy", "elapsedMs"]) {
          if (trial.metrics[field]?.value === "not-measured") {
            failures.push(`${label} completed status requires measured ${field}`);
          }
        }
        if (index === 2 && trial.metrics.continuationAssessment?.value === "not-measured") {
          failures.push(`${label} completed P3 status requires measured continuationAssessment`);
        }
        if (index !== 1 && trial.metrics.firstPass?.value === "not-measured") {
          failures.push(`${label} completed status requires measured firstPass`);
        }
      }
    }
    if (!isObject(trial.observations)) {
      failures.push(`${label}.observations must be a mapping`);
    } else {
      requireExactKeys(trial.observations, observationFields, `${label}.observations`, failures);
      for (const field of observationFields) {
        validateObservation(trial.observations[field], field, `${label}.observations`, trial.trialStatus, failures);
      }
    }
    const comparisonsRecorded = validateProtectedComparisons(
      trial.protectedComparisons,
      trial.trialStatus,
      label,
      failures,
    );
    const criteria = acceptanceCriteria[index]?.criteria ?? [];
    validateAcceptanceEvidence(trial.acceptanceEvidence, criteria, trial.trialStatus, label, failures);
    validateRunFunctionalStateConsistency(runState, trial, criteria, index, label, failures);
    if (!isObject(trial.artifacts)) {
      failures.push(`${label}.artifacts must be a mapping`);
    } else {
      requireExactKeys(trial.artifacts, ["diff", "screenshot", "targetedTests"], `${label}.artifacts`, failures);
      const stored = [
        validateStoredArtifact(trial.artifacts.diff, "diff", `${label}.artifacts`, root, failures),
        validateStoredArtifact(trial.artifacts.screenshot, "screenshot", `${label}.artifacts`, root, failures),
        validateStoredArtifact(trial.artifacts.targetedTests, "targetedTests", `${label}.artifacts`, root, failures),
      ];
      if (trial.trialStatus === "not-run" && stored.some(Boolean)) {
        failures.push(`${label} is not-run and cannot claim captured artifacts`);
      }
      if (trial.trialStatus === "completed" && stored.some((value) => !value)) {
        failures.push(`${label} completed status requires diff, screenshot and targeted test evidence`);
      }
      if (trial.trialStatus === "completed" && stored[0]) {
        validatePatchTransition(
          trial.artifacts.diff,
          runState?.startFunctionalState,
          runState?.endFunctionalState,
          trial.observations?.changedFiles?.value,
          root,
          `${label}.artifacts.diff`,
          failures,
        );
      }
    }
    validateCrossFieldConsistency(trial, criteria, index, label, failures);
    if (trial.trialStatus === "completed") {
      if (results.fixture?.status !== "prepared") {
        failures.push(`${label} completed status requires a prepared common fixture`);
      }
      if (!hasRecordedRun) failures.push(`${label} completed status requires the full run/protocol/prompt/start/end provenance`);
      if (!comparisonsRecorded) failures.push(`${label} completed status requires Master, non-target and icon before/after evidence`);
    }
  });

  const expectedTrials = statuses.every((status) => status === "not-run")
    ? "not-run"
    : statuses.every((status) => status === "completed")
      ? "completed"
      : "in-progress";
  requireExact(results.metadata?.trials, expectedTrials, "baseline.metadata.trials does not match per-trial status; expected", failures);
  const expectedTaskStatus = expectedTrials === "not-run"
    ? "schema-ready-awaiting-trials"
    : expectedTrials === "completed"
      ? "trials-recorded-awaiting-review"
      : "baseline-trials-in-progress";
  requireExact(results.metadata?.task2Status, expectedTaskStatus, "baseline.metadata.task2Status", failures);
  if (results.metadata?.task2Status === "completed") {
    failures.push("baseline.metadata.task2Status cannot claim Task 2 completed");
  }
  if (statuses[2] === "completed") {
    if (statuses[0] !== "completed" || statuses[1] !== "completed") {
      failures.push("P3 cannot complete before the same-architecture P1 and P2 results are saved");
    }
    if (results.results[2]?.start?.savedState?.status !== "recorded") {
      failures.push("P3 completed status requires a recorded same-architecture P1/P2 savedState");
    }
  }
  const sealedProjectionSha256 = sha256(
    Buffer.from(JSON.stringify(buildSealedNativeBaselineProjection(results)), "utf8"),
  );
  if (sealedProjectionSha256 !== sealedNativeBaselineProjectionSha256) {
    failures.push(
      `sealed native baseline recorded evidence bundle mismatch: expected ${sealedNativeBaselineProjectionSha256}, received ${sealedProjectionSha256}`,
    );
  }
  return failures;
}


function collectTaskFourTreeFiles(root, relativeDirectory, failures) {
  const absoluteDirectory = join(root, relativeDirectory);
  let entries;
  try {
    const stat = lstatSync(absoluteDirectory);
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      failures.push(`Task 4 protected icon tree must use a regular directory: ${relativeDirectory}`);
      return [];
    }
    entries = readdirSync(absoluteDirectory, { withFileTypes: true });
  } catch (error) {
    failures.push(`Task 4 protected icon tree cannot be read: ${relativeDirectory}: ${error.message}`);
    return [];
  }

  return entries.flatMap((entry) => {
    const relativePath = join(relativeDirectory, entry.name);
    const absolutePath = join(root, relativePath);
    const stat = lstatSync(absolutePath);
    if (stat.isSymbolicLink()) {
      failures.push(`Task 4 protected icon tree cannot contain a symbolic link: ${relativePath}`);
      return [];
    }
    if (stat.isDirectory()) return collectTaskFourTreeFiles(root, relativePath, failures);
    if (!stat.isFile()) {
      failures.push(`Task 4 protected icon tree can contain only regular files: ${relativePath}`);
      return [];
    }
    return [relativePath];
  });
}

function hashTaskFourIconTree(root, failures, questionNumberAuthorized = false) {
  const files = taskFourProtectedIconTreeRoots
    .flatMap((directory) => collectTaskFourTreeFiles(root, directory, failures))
    .filter((path) => !questionNumberAuthorized || !Object.hasOwn(questionNumberIconHashes, path))
    .sort(compareCanonicalPaths);
  const digest = createHash("sha256");
  for (const filePath of files) {
    digest.update(Buffer.from(filePath, "utf8"));
    digest.update(Buffer.from([0]));
    let source = readFileSync(join(root, filePath));
    if (questionNumberAuthorized && filePath === "packages/ui/src/icons/catalog.generated.ts") {
      let catalog = source.toString("utf8");
      for (const slug of Object.keys(questionNumberIconSources)) {
        const line = `  { assetId: "icon/${slug}", src: new URL("./assets/${slug}.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" },\n`;
        if (catalog.split(line).length !== 2) failures.push(`QuestionNumber icon preview must contain the exact addition once: ${slug}`);
        catalog = catalog.replace(line, "");
      }
      source = Buffer.from(catalog);
    }
    digest.update(source);
    digest.update(Buffer.from([0]));
  }
  return { count: files.length, sha256: digest.digest("hex") };
}

function normalizeCssValue(value) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .trim();
}

function stripCssComments(source) {
  let output = "";
  let quote = null;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      output += character;
      if (character === "\\" && index + 1 < source.length) {
        index += 1;
        output += source[index];
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      output += character;
      continue;
    }
    if (character === "/" && source[index + 1] === "*") {
      const closingIndex = source.indexOf("*/", index + 2);
      index = closingIndex < 0 ? source.length : closingIndex + 1;
      continue;
    }
    output += character;
  }
  return output;
}

function parseFoundationsPublicIndex(source, failures, allowTokenFoundations = false) {
  const declarations = [];
  let offset = 0;

  while (offset < source.length) {
    const whitespace = source.slice(offset).match(/^\s*/)?.[0] ?? "";
    offset += whitespace.length;
    if (offset === source.length) break;

    const wildcard = source.slice(offset).match(/^export\s+\*\s+from\s+(["'])(\.\/(?:color-registry|typography-contract|tag-token-contract|select-token-contract|tabs-token-contract|overlay-token-contract|tooltip-token-contract))\1\s*;/);
    if (allowTokenFoundations && wildcard) {
      declarations.push({
        elements: [{ exportedName: "*", localName: "*", isTypeOnly: false }],
        isTypeOnly: false, moduleSpecifier: wildcard[2], source: wildcard[0],
      });
      offset += wildcard[0].length;
      continue;
    }

    const match = source.slice(offset).match(
      /^export\s+(type\s+)?\{([\s\S]*?)\}\s+from\s+(["'])([^"'\\\r\n]+)\3\s*;/,
    );
    if (!match) {
      failures.push(
        `Task 4 Foundations public index re-export inventory is invalid near: ${JSON.stringify(source.slice(offset, offset + 80))}`,
      );
      break;
    }

    const elements = match[2]
      .split(",")
      .map((element) => element.trim())
      .filter(Boolean)
      .map((element) => {
        const elementMatch = element.match(
          /^(type\s+)?([a-z_$][a-z0-9_$]*)(?:\s+as\s+([a-z_$][a-z0-9_$]*))?$/i,
        );
        return elementMatch
          ? {
            exportedName: elementMatch[3] ?? elementMatch[2],
            isTypeOnly: Boolean(elementMatch[1]),
            localName: elementMatch[2],
          }
          : null;
      });
    if (elements.length === 0 || elements.some((element) => element === null)) {
      failures.push(
        `Task 4 Foundations public index re-export inventory is invalid: ${JSON.stringify(match[0])}`,
      );
    } else {
      declarations.push({
        elements,
        isTypeOnly: Boolean(match[1]),
        moduleSpecifier: match[4],
        source: match[0],
      });
    }
    offset += match[0].length;
  }

  return declarations;
}

function collectTopLevelCssAtRules(source, label, failures) {
  const input = stripCssComments(source);
  const statements = [];
  const blockHeaders = [];
  let blockDepth = 0;
  let parenthesisDepth = 0;
  let quote = null;
  let atRuleStart = -1;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (blockDepth > 0) {
      if (character === "{") blockDepth += 1;
      else if (character === "}") blockDepth -= 1;
      continue;
    }
    if (atRuleStart >= 0) {
      if (character === "(") parenthesisDepth += 1;
      else if (character === ")") parenthesisDepth = Math.max(0, parenthesisDepth - 1);
      else if (character === "{" && parenthesisDepth === 0) {
        blockHeaders.push(input.slice(atRuleStart, index).replace(/\s+/g, " ").trim());
        blockDepth = 1;
        atRuleStart = -1;
      } else if (character === ";" && parenthesisDepth === 0) {
        statements.push(input.slice(atRuleStart, index + 1).trim());
        atRuleStart = -1;
      }
      continue;
    }
    if (character === "@") {
      atRuleStart = index;
      parenthesisDepth = 0;
    } else if (character === "{") {
      blockDepth = 1;
    }
  }

  if (atRuleStart >= 0) {
    failures.push(`${label} contains an unterminated top-level at-rule statement`);
  }
  return { statements, blockHeaders };
}

function collectCssAtRuleOccurrences(source, names) {
  const input = stripCssComments(source);
  const allowedNames = new Set(names.map((name) => name.toLowerCase()));
  const occurrences = [];
  let blockDepth = 0;
  let parenthesisDepth = 0;
  let bracketDepth = 0;
  let quote = null;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "(") {
      parenthesisDepth += 1;
      continue;
    }
    if (character === ")") {
      parenthesisDepth = Math.max(0, parenthesisDepth - 1);
      continue;
    }
    if (character === "[") {
      bracketDepth += 1;
      continue;
    }
    if (character === "]") {
      bracketDepth = Math.max(0, bracketDepth - 1);
      continue;
    }
    if (character === "{") {
      blockDepth += 1;
      continue;
    }
    if (character === "}") {
      blockDepth = Math.max(0, blockDepth - 1);
      continue;
    }
    if (character !== "@" || parenthesisDepth > 0 || bracketDepth > 0) continue;

    const match = input.slice(index).match(/^@([a-z-]+)\b/i);
    const name = match?.[1]?.toLowerCase();
    if (!match || !name || !allowedNames.has(name)) continue;

    let nestedQuote = null;
    let nestedParenthesisDepth = 0;
    let nestedBracketDepth = 0;
    for (let cursor = index + match[0].length; cursor < input.length; cursor += 1) {
      const nestedCharacter = input[cursor];
      if (nestedQuote) {
        if (nestedCharacter === "\\") cursor += 1;
        else if (nestedCharacter === nestedQuote) nestedQuote = null;
        continue;
      }
      if (nestedCharacter === '"' || nestedCharacter === "'") {
        nestedQuote = nestedCharacter;
        continue;
      }
      if (nestedCharacter === "(") nestedParenthesisDepth += 1;
      else if (nestedCharacter === ")") {
        nestedParenthesisDepth = Math.max(0, nestedParenthesisDepth - 1);
      } else if (nestedCharacter === "[") nestedBracketDepth += 1;
      else if (nestedCharacter === "]") nestedBracketDepth = Math.max(0, nestedBracketDepth - 1);
      else if (
        nestedCharacter === ";" &&
        nestedParenthesisDepth === 0 &&
        nestedBracketDepth === 0
      ) {
        occurrences.push({
          depth: blockDepth,
          kind: "statement",
          name,
          text: input.slice(index, cursor + 1).replace(/\s+/g, " ").trim(),
        });
        break;
      } else if (
        nestedCharacter === "{" &&
        nestedParenthesisDepth === 0 &&
        nestedBracketDepth === 0
      ) {
        occurrences.push({
          depth: blockDepth,
          kind: "block",
          name,
          text: input.slice(index, cursor).replace(/\s+/g, " ").trim(),
        });
        break;
      }
    }
  }

  return occurrences;
}

function parseCssDeclarations(source, { bodyFragment = false } = {}) {
  const input = stripCssComments(source);
  const entries = [];
  let blockDepth = bodyFragment ? 1 : 0;
  let quote = null;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "{") {
      blockDepth += 1;
      continue;
    }
    if (character === "}") {
      blockDepth = Math.max(0, blockDepth - 1);
      continue;
    }
    if (blockDepth === 0 || character !== "-" || input[index + 1] !== "-") continue;

    let previousIndex = index - 1;
    while (previousIndex >= 0 && /\s/.test(input[previousIndex] ?? "")) previousIndex -= 1;
    if (
      input[previousIndex] !== "{" &&
      input[previousIndex] !== ";" &&
      !(bodyFragment && previousIndex < 0)
    ) continue;

    const nameMatch = input.slice(index).match(/^--(?:\*|[a-z0-9-]+)/);
    if (!nameMatch) continue;
    const name = nameMatch[0];
    let cursor = index + name.length;
    while (/\s/.test(input[cursor] ?? "")) cursor += 1;
    if (input[cursor] !== ":") continue;
    cursor += 1;
    const valueStart = cursor;
    let valueQuote = null;
    let parenthesisDepth = 0;
    let bracketDepth = 0;
    for (; cursor < input.length; cursor += 1) {
      const valueCharacter = input[cursor];
      if (valueQuote) {
        if (valueCharacter === "\\") cursor += 1;
        else if (valueCharacter === valueQuote) valueQuote = null;
        continue;
      }
      if (valueCharacter === '"' || valueCharacter === "'") {
        valueQuote = valueCharacter;
        continue;
      }
      if (valueCharacter === "(") parenthesisDepth += 1;
      else if (valueCharacter === ")") parenthesisDepth = Math.max(0, parenthesisDepth - 1);
      else if (valueCharacter === "[") bracketDepth += 1;
      else if (valueCharacter === "]") bracketDepth = Math.max(0, bracketDepth - 1);
      else if (valueCharacter === ";" && parenthesisDepth === 0 && bracketDepth === 0) break;
      else if (valueCharacter === "}" && parenthesisDepth === 0 && bracketDepth === 0) break;
    }
    if (input[cursor] !== ";") continue;
    entries.push([name, normalizeCssValue(input.slice(valueStart, cursor)), blockDepth]);
    index = cursor;
  }
  const values = {};
  const counts = {};
  for (const [name, value] of entries) {
    values[name] = value;
    counts[name] = (counts[name] ?? 0) + 1;
  }
  return { entries, values, counts };
}

function cssDeclarationRemainder(source) {
  return stripCssComments(source)
    .replace(/--(?:\*|[a-z0-9-]+)\s*:\s*[^;]+;/g, "")
    .trim();
}

function extractCssBlock(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return null;
  const openingBrace = source.indexOf("{", markerIndex);
  if (openingBrace < 0) return null;
  let depth = 0;
  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(openingBrace + 1, index);
    }
  }
  return null;
}

export function parseTopLevelCssBlocks(source, label, failures, { root = process.cwd(), owner = "" } = {}) {
  if (!owner && source.includes('@import "./questionnaire/questionnaire.css";')) {
    try {
      const bindings = getG6SourceBindings(root);
      if (createHash("sha256").update(source).digest("hex") === bindings?.sourceFiles["packages/ui/src/styles.css"]?.after) owner = "packages/ui/src/styles.css";
    } catch (error) { failures.push(`${label} G6 style owner requires bound bytes: ${error.message}`); }
  }

  const historicalSharedImports = '@import "./navigation/navigation.css";\n@import "./navigation/navigation-families.css";\n@import "./tree/tree.css";\n';
  if (!owner && source.startsWith(historicalSharedImports)) {
    try {
      // Older synthetic stages have no G6 successor. Only their real complete
      // stylesheet can own these registered imports; expected snippets cannot.
      if (!getG6SourceBindings(root) && source === readFileSync(join(root, "packages/ui/src/styles.css"), "utf8")) owner = "packages/ui/src/styles.css";
    } catch (error) { failures.push(`${label} historical style owner proof failed: ${error.message}`); }
  }

  if (owner === "packages/ui/src/styles.css") {
    try {
      const bindings = getG6SourceBindings(root);
      if (bindings && createHash("sha256").update(source).digest("hex") !== bindings.sourceFiles[owner]?.after) {
        failures.push(`${label} G6 normalization requires the exact bound owner bytes`);
        return [];
      }
      if (bindings?.closeoutSuccessor) {
        // The separate original Questionnaire verifier has checked the exact current
        // selector extension. Preserve the older component checks on their predecessor.
        source = readFileSync(join(root, "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/questionnaire-predecessor/evidence/runtime/questionnaire-reuse-2026-10-16/baseline/packages/ui/src/styles.css"), "utf8");
        for (const file of ["conversation-composer/conversation-composer", "attachment-workflow/attachment-picker", "attachment-workflow/attachment-preview", "attachment-workflow/attachment-list"]) {
          const line = `@import "./${file}.css";\n`;
          if (source.split(line).length !== 2) throw new Error("Closeout shared CSS must retain each exact Recipe import once");
          source = source.replace(line, "");
        }
      }
    } catch (error) { failures.push(`${label} G6 style owner proof failed: ${error.message}`); return []; }
    const g6Imports = ["attachment", "drawer", "input-otp", "carousel", "bubble", "marker", "message", "message-scroller", "questionnaire"].map(name => `@import "./${name}/${name}.css";`);
    const present = g6Imports.filter(line => source.includes(line));
    if (present.length) {
      try {
        const bindings = getG6SourceBindings(root);
        if (!bindings?.sourceFiles[owner]?.after || present.length !== g6Imports.length || present.some(line => source.split(line).length !== 2)) throw new Error("G6 imports require all nine exact bound companion styles once");
        for (const line of present) source = source.replace(line + "\n", "");
      } catch (error) { failures.push(`${label} G6 imports require finite source binding: ${error.message}`); }
    }
  }
  const sharedImports = '@import "./navigation/navigation.css";\n@import "./navigation/navigation-families.css";\n@import "./tree/tree.css";\n';
  if (owner === "packages/ui/src/styles.css" && source.startsWith(sharedImports)) {
    try {
      const status = parseYamlSubset(readTaskFourFile(root, "status/current-phase.yaml", "Shared CSS authorization", failures));
      validateTokenFoundationsV1Phase(status);
      if (hasTreeAuthorization(status) && status.navigationComponentsV042?.humanGate === "accepted"
        && status.navigationComponentsV042W6W8?.authorization === "authorized"
        && (getG6PreviousSource(root, owner) ?? readTaskFourFile(root, owner, "Shared CSS owner", failures))?.startsWith(sharedImports)) {
        source = source.slice(sharedImports.length);
        const g4Imports = '@import "./item/item.css";\n@import "./progress/progress.css";\n';
        if (source.startsWith(g4Imports) && hasG4ComponentsAuthorization(status)) {
          source = source.slice(g4Imports.length);
        }
      }
    } catch (error) { failures.push(`${label} shared imports require their recorded authorization: ${error.message}`); }
  }
  const input = stripCssComments(source);
  const blocks = [];
  let cursor = 0;
  while (cursor < input.length) {
    while (/\s/.test(input[cursor] ?? "")) cursor += 1;
    if (cursor >= input.length) break;

    let openingBrace = -1;
    let semicolon = -1;
    let headerQuote = null;
    let parenthesisDepth = 0;
    let bracketDepth = 0;
    for (let index = cursor; index < input.length; index += 1) {
      const character = input[index];
      if (headerQuote) {
        if (character === "\\") index += 1;
        else if (character === headerQuote) headerQuote = null;
        continue;
      }
      if (character === '"' || character === "'") {
        headerQuote = character;
        continue;
      }
      if (character === "(") parenthesisDepth += 1;
      else if (character === ")") parenthesisDepth = Math.max(0, parenthesisDepth - 1);
      else if (character === "[") bracketDepth += 1;
      else if (character === "]") bracketDepth = Math.max(0, bracketDepth - 1);
      else if (parenthesisDepth === 0 && bracketDepth === 0 && character === "{") {
        openingBrace = index;
        break;
      } else if (parenthesisDepth === 0 && bracketDepth === 0 && character === ";") {
        semicolon = index;
        break;
      }
    }
    if (openingBrace < 0 || semicolon >= 0) {
      failures.push(`${label} contains an unsupported top-level statement`);
      return blocks;
    }
    const header = input.slice(cursor, openingBrace).replace(/\s+/g, " ").trim();
    if (!header) {
      failures.push(`${label} contains a top-level block without a header`);
      return blocks;
    }

    let depth = 0;
    let bodyQuote = null;
    let closingBrace = -1;
    for (let index = openingBrace; index < input.length; index += 1) {
      const character = input[index];
      if (bodyQuote) {
        if (character === "\\") index += 1;
        else if (character === bodyQuote) bodyQuote = null;
        continue;
      }
      if (character === '"' || character === "'") {
        bodyQuote = character;
        continue;
      }
      if (character === "{") depth += 1;
      if (character === "}") {
        depth -= 1;
        if (depth === 0) {
          closingBrace = index;
          break;
        }
      }
    }
    if (closingBrace < 0) {
      failures.push(`${label} contains an unterminated top-level block: ${header}`);
      return blocks;
    }
    blocks.push({ header, body: input.slice(openingBrace + 1, closingBrace) });
    cursor = closingBrace + 1;
  }
  return blocks;
}

function collectDirectScopedCssDeclarations(
  source,
  allowedHeaders,
  label,
  failures,
  { rejectOutsidePattern = null, scopedRecords = {} } = {},
) {
  const entries = [];
  const scopedCounts = {};
  for (const { header, body } of parseTopLevelCssBlocks(source, label, failures)) {
    const parsedBody = parseCssDeclarations(body, { bodyFragment: true });
    if (Object.hasOwn(scopedRecords, header)) {
      scopedCounts[header] = (scopedCounts[header] ?? 0) + 1;
      validateExactRecord(parsedBody.values, parsedBody.counts, scopedRecords[header], `${label} ${header}`, failures);
      if (parsedBody.entries.some(([, , depth]) => depth !== 1) || cssDeclarationRemainder(body)) failures.push(`${label} theme block must contain only direct authorized declarations: ${header}`);
      continue;
    }
    for (const entry of parsedBody.entries) {
      const [name, , depth] = entry;
      if (allowedHeaders.has(header) && depth === 1) {
        entries.push(entry);
      } else if (rejectOutsidePattern?.test(name)) {
        failures.push(
          `${label} declares ${name} outside a direct allowed root scope: ${header} at depth ${depth}`,
        );
      }
    }
  }
  for (const header of Object.keys(scopedRecords)) if (scopedCounts[header] !== 1) failures.push(`${label} must declare theme scope exactly once: ${header}`);

  const values = {};
  const counts = {};
  for (const [name, value] of entries) {
    values[name] = value;
    counts[name] = (counts[name] ?? 0) + 1;
  }
  return { entries, values, counts };
}

function validateExactRecord(actual, counts, expected, label, failures) {
  for (const [name, value] of Object.entries(expected)) {
    if (!(name in actual)) {
      failures.push(`${label} is missing ${name}: ${value}`);
    } else if (actual[name] !== normalizeCssValue(value)) {
      failures.push(`${label} has ${name}: ${actual[name]}; expected ${normalizeCssValue(value)}`);
    }
    if ((counts[name] ?? 0) !== 1) {
      failures.push(`${label} must declare ${name} exactly once; received ${counts[name] ?? 0}`);
    }
  }
  for (const name of Object.keys(actual)) {
    if (!(name in expected)) failures.push(`${label} contains unexpected declaration ${name}`);
  }
}

function parseCompositionContract(source, failures) {
  const match = source.match(
    /^export const compositionSpaceTokens = \{([\s\S]*?)\} as const;\r?\n\r?\nexport type CompositionSpaceTokenName = keyof typeof compositionSpaceTokens;\r?\n\r?\nexport const compositionSpaceTokenEntries = Object\.entries\(\r?\n  compositionSpaceTokens,\r?\n\) as Array<\[\`\$\{CompositionSpaceTokenName\}\`, string\]>;\r?\n$/,
  );
  if (!match) {
    failures.push("Task 4 TypeScript compositionSpaceTokens object is missing or malformed");
    return {};
  }
  const values = {};
  const counts = {};
  const lines = match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  for (const line of lines) {
    const entry = line.match(/^([0-9]+)\s*:\s*["']([^"']+)["']\s*,?$/);
    if (!entry) {
      failures.push(`Task 4 TypeScript compositionSpaceTokens contains an unsupported entry: ${line}`);
      continue;
    }
    const [, name, value] = entry;
    values[name] = value;
    counts[name] = (counts[name] ?? 0) + 1;
  }
  return { values, counts };
}

function hasTokenFoundationsAuthorization(root, failures) {
  const statusPath = join(root, "status/current-phase.yaml");
  if (!existsSync(statusPath)) return false;
  try {
    const stat = lstatSync(statusPath);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error("status must be a regular file");
    const status = parseYamlSubset(readFileSync(statusPath, "utf8"));
    if (status.currentPhase?.id !== "token-foundations-v1") return false;
    validateTokenFoundationsV1Phase(status);
    return true;
  } catch (error) {
    failures.push(`Token Foundations V1 phase authorization is invalid: ${error.message}`);
    return false;
  }
}

function extendFrozenTokenRecord(frozen, additions, label, failures, aliases = {}, values = additions) {
  for (const [name, value] of Object.entries(additions)) {
    // Only registered one-hop references may replace old literals; their resolved
    // values must still match the original baseline. Missing targets fail closed.
    const target = aliases[name] === value ? value.match(/^var\((--rain-[a-z0-9-]+)\)$/)?.[1] : undefined;
    const resolved = target ? values[target] : value;
    if (Object.hasOwn(frozen, name) && (resolved === undefined || normalizeCssValue(resolved) !== normalizeCssValue(frozen[name]))) {
      failures.push(`Token Foundations V1 must not replace the frozen ${label}: ${name}`);
    }
  }
  return { ...additions, ...frozen, ...aliases };
}

export function validateTailwindB2CompositionBridge({ root = process.cwd() } = {}) {
  return withSourceBindingTraversal(root, () => validateTailwindB2CompositionBridgeInTraversal(root));
}

function validateTailwindB2CompositionBridgeInTraversal(root) {
  const failures = [];
  const tokenFoundationsAuthorized = hasTokenFoundationsAuthorization(root, failures);
  const status = tokenFoundationsAuthorized ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {};
  const refinements = status.tokenRefinements;
  const inputAuthorized = hasInputRefinementAuthorization(status);
  const selectAuthorized = hasSelectRefinementAuthorization(status);
  const tabsAuthorized = hasTabsRefinementAuthorization(status) && status.componentRefinements.tabs.stage !== "preflight";
  const tabsVariablePattern = tabsAuthorized && status.componentRefinements.tabs.visualRefinement ? /^--rain-tabs-height-(?:two-line-)?(?:28|32|38)$/ : /^--rain-tabs-height-(?:28|32|38)$/;
  const selectVariablePattern = /^--rain-select-(?:height-(?:24|28|32|36)|value-height-(?:24|28)|action-size|touch-target-size)$/;
  const tagAuthorized = hasTagRefinementAuthorization(status);
  const tagBatchTwoAuthorized = hasTagBatchTwoRefinementAuthorization(status);
  const tagBatchTwoVariables = new Set([...Object.keys(tagShapeRecipes).flatMap((name) => [`--rain-tag-shape-${name}-width`, `--rain-tag-shape-${name}-height`]), ...Object.keys(tagDetailTokens).map((name) => `--rain-tag-${name}`), "--rain-tag-score-badge-fill"]);
  const iconButtonAuthorized = hasIconButtonRefinementAuthorization(status);
  const questionNumberAuthorized = hasQuestionNumberRefinementAuthorization(status);
  const optionButtonAuthorized = hasOptionButtonRefinementAuthorization(status);
  const alignmentAuthorized = refinements?.foundationsAlignment?.authorization === "authorized";
  const colorAlignmentAuthorized = refinements?.foundationsColorAlignment?.authorization === "authorized";
  const buttonMigrationAuthorized = refinements?.buttonTokenMigration?.authorization === "authorized";
  const globalFocusAuthorized = refinements?.buttonTokenMigration?.focusMigration?.authorization === "authorized";
  const darkAuthorized = refinements?.colorDarkTheme?.authorization === "authorized";
  const outputs = tokenFoundationsAuthorized ? getTokenFoundationOutputs() : {
    variables: {}, typographyVariables: {}, themeVariables: {}, utilities: [],
  };
  if (!iconButtonAuthorized) {
    outputs.variables = Object.fromEntries(Object.entries(outputs.variables).filter(([name]) => !name.startsWith("--rain-icon-")));
    outputs.themeVariables = Object.fromEntries(Object.entries(outputs.themeVariables).filter(([name]) => !name.endsWith("-rain-icon-button")));
    outputs.utilities = outputs.utilities.filter(({ kind }) => !["icon-size", "icon-button-control"].includes(kind));
  }
  if (!inputAuthorized) {
    outputs.variables = Object.fromEntries(Object.entries(outputs.variables).filter(([name]) => !/^--rain-input-(?:height-(?:24|28|32|36)|clear-size)$/.test(name)));
    outputs.utilities = outputs.utilities.filter(({ kind }) => !["input-height", "input-clear"].includes(kind));
  }
  if (!tabsAuthorized) {
    outputs.variables = Object.fromEntries(Object.entries(outputs.variables).filter(([name]) => !name.startsWith("--rain-tabs-")));
    outputs.utilities = outputs.utilities.filter(({ kind }) => !kind.startsWith("tabs-"));
  }
  if (!selectAuthorized) {
    outputs.variables = Object.fromEntries(Object.entries(outputs.variables).filter(([name]) => !name.startsWith("--rain-select-")));
    outputs.utilities = outputs.utilities.filter(({ kind }) => !kind.startsWith("select-"));
  }
  if (!tagAuthorized) {
    outputs.variables = Object.fromEntries(Object.entries(outputs.variables).filter(([name]) => !/^--rain-tag-(?:height-|action-size|selection-alpha|hover-opacity|pressed-opacity|disabled-opacity)/.test(name)));
    outputs.utilities = outputs.utilities.filter(({ kind }) => !kind.startsWith("tag-"));
  }
  if (!tagBatchTwoAuthorized) {
    outputs.variables = Object.fromEntries(Object.entries(outputs.variables).filter(([name]) => !tagBatchTwoVariables.has(name)));
    outputs.utilities = outputs.utilities.filter(({ kind }) => !["tag-shape", "tag-score-badge"].includes(kind));
  }
  const pick = (record, pattern) => Object.fromEntries(Object.entries(record).filter(([name]) => pattern.test(name)));
  const expectedSpaceTokens = tokenFoundationsAuthorized
    ? { ...taskFourCompositionSpaceTokens, 28: "28px", 36: "36px", 40: "40px" }
    : taskFourCompositionSpaceTokens;
  const typographyBaseline = { ...taskFourTypographyTokenValues };
  if (hasG4ComponentsAuthorization(status)) {
    try { getG4SourceBindings(root, status); Object.assign(typographyBaseline, { "--rain-type-data-size": "28px", "--rain-type-data-line": "36px" }); }
    catch (error) { failures.push(`G4 typography source cannot be checked: ${error.message}`); }
  }
  const expectedTypographyTokens = extendFrozenTokenRecord(typographyBaseline, outputs.typographyVariables, "typography values", failures,
    alignmentAuthorized ? getLegacyTypographyAliases() : {});
  const expectedComponentTokens = alignmentAuthorized
    ? extendFrozenTokenRecord(taskFourComponentTokenValues, legacyComponentTokenAliases, "component values", failures,
      legacyComponentTokenAliases, { ...outputs.variables, ...outputs.typographyVariables })
    : { ...taskFourComponentTokenValues };
  const colorAliases = {
    ...(colorAlignmentAuthorized ? confirmedSemanticColorAliases : {}),
    ...(hasSwitchSc01Authorization(status) ? pick(outputs.variables, /^--rain-color-switch-(?:track-(?:unchecked|hover|pressed|checked-hover|checked-pressed)|indicator)$/) : {}),
    ...(globalFocusAuthorized ? {
      "--rain-color-focus-control": "var(--rain-category-border-brand-1)",
      "--rain-color-focus-item": "var(--rain-category-border-brand-1)",
      "--rain-color-focus-danger": "var(--rain-category-border-brand-1)",
    } : {}),
  };
  const expectedFocusTokens = globalFocusAuthorized ? {
    ...taskFourFocusTokenValues,
    "--rain-focus-control-halo": "var(--rain-category-fill-brand-alpha-3)",
    "--rain-focus-width": "1px",
    "--rain-focus-offset": "0px",
  } : taskFourFocusTokenValues;
  const buttonColorAliases = buttonMigrationAuthorized ? getButtonColorVariables() : {};
  Object.assign(expectedComponentTokens, buttonColorAliases, inputAuthorized ? pick(outputs.variables, /^--rain-input-(?:height-(?:24|28|32|36)|clear-size)$/) : {});
  if (selectAuthorized) Object.assign(expectedComponentTokens, pick(outputs.variables, selectVariablePattern));
  if (tabsAuthorized) Object.assign(expectedComponentTokens, pick(outputs.variables, tabsVariablePattern));
  if (tagAuthorized) Object.assign(expectedComponentTokens, pick(outputs.variables, /^--rain-tag-(?:height-|action-size|selection-alpha|hover-opacity|pressed-opacity|disabled-opacity)/));
  if (tagBatchTwoAuthorized) Object.assign(expectedComponentTokens, Object.fromEntries(Object.entries(outputs.variables).filter(([name]) => tagBatchTwoVariables.has(name))));
  if (globalFocusAuthorized) Object.assign(expectedComponentTokens, {
    "--rain-button-focus-outline-width": "1px",
    "--rain-button-focus-outline-offset": "0px",
  });
  const expectedSemanticColors = { ...taskFourSemanticColorTokenValues, ...colorAliases };
  if (colorAlignmentAuthorized) expectedComponentTokens["--rain-link-color"] = "var(--rain-color-action-primary-text)";
  const expectedThemeMappings = extendFrozenTokenRecord(taskFourThemeMappings,
    Object.fromEntries(Object.entries(outputs.themeVariables).filter(([name]) => name !== "--color-rain-action-primary-text" && !Object.hasOwn(buttonColorThemeMappings, name))), "theme mappings", failures);
  if (buttonMigrationAuthorized) Object.assign(expectedThemeMappings, buttonColorThemeMappings);
  if (colorAlignmentAuthorized) {
    delete expectedThemeMappings["--color-rain-action-primary"];
    expectedThemeMappings["--color-rain-action-primary-text"] = "var(--rain-color-action-primary-text)";
  }
  if (!same(outputs.utilities.filter(({ kind, className }) => kind === "semantic-role" || /^(?:text|bg)-rain-action-primary$/.test(className)),
    colorAlignmentAuthorized ? [
      { className: "text-rain-action-primary", declarations: { color: "var(--rain-color-action-primary-text)" }, kind: "semantic-role" },
      { className: "bg-rain-action-primary", declarations: { "background-color": "var(--rain-color-action-primary)" }, kind: "semantic-role" },
    ] : [])) {
    failures.push("Foundations color alignment must keep the exact authorized primary text and fill utilities");
  }
  const expectedPublicIndex = taskFourFoundationsPublicIndex.map((entry) => ({
    ...entry,
    elements: tokenFoundationsAuthorized && entry.moduleSpecifier === "./token-contract"
      ? [entry.isTypeOnly ? "LineThicknessTokenName" : "lineThicknessTokens", ...entry.elements]
      : entry.elements,
  }));
  if (iconButtonAuthorized) expectedPublicIndex.splice(4, 0, {
    moduleSpecifier: "./icon-size-contract", isTypeOnly: false,
    elements: ["iconSizeTokens", "iconSizeTokenEntries", "iconSizeClassNames", "iconButtonControlSizeTokens", "iconButtonControlSizeTokenEntries", "iconButtonControlSizeClassNames"],
  }, {
    moduleSpecifier: "./icon-size-contract", isTypeOnly: true,
    elements: ["IconSizeTokenName", "IconButtonControlSizeTokenName"],
  });
  if (tokenFoundationsAuthorized) expectedPublicIndex.push(...["./color-registry", "./typography-contract"].map((moduleSpecifier) => ({
    moduleSpecifier, isTypeOnly: false, elements: ["*"],
  })));
  if (tagAuthorized) expectedPublicIndex.push({ moduleSpecifier: "./tag-token-contract", isTypeOnly: false, elements: ["*"] });
  if (inputAuthorized) expectedPublicIndex.push({
    moduleSpecifier: "./input-token-contract", isTypeOnly: false,
    elements: ["inputSizeTokens", "inputSizeTokenEntries", "inputSizeClassNames", "inputClearSizeToken", "inputClearSizeClassName"],
  }, { moduleSpecifier: "./input-token-contract", isTypeOnly: true, elements: ["InputSize"] });
  if (selectAuthorized) expectedPublicIndex.push({ moduleSpecifier: "./select-token-contract", isTypeOnly: false, elements: ["*"] });
  if (tabsAuthorized) expectedPublicIndex.push({ moduleSpecifier: "./tabs-token-contract", isTypeOnly: false, elements: ["*"] });
  const bridge = readTaskFourFile(
    root,
    tailwindB2ThemeBridgePath,
    "Tailwind B2 Task 4 theme bridge",
    failures,
  );
  const tokens = readTaskFourFile(
    root,
    "packages/foundations/src/tokens.css",
    "Tailwind B2 Task 4 public Token source",
    failures,
  );
  const typography = readTaskFourFile(
    root,
    "packages/foundations/src/typography.css",
    "Tailwind B2 Task 4 typography Token source",
    failures,
  );
  const focus = readTaskFourFile(
    root,
    "packages/foundations/src/focus.css",
    "Tailwind B2 Task 4 Focus Token source",
    failures,
  );
  const motion = readTaskFourFile(
    root,
    "packages/foundations/src/motion.css",
    "Tailwind B2 Task 4 Motion Token source",
    failures,
  );
  const compositionContract = readTaskFourFile(
    root,
    "packages/foundations/src/composition-contract.ts",
    "Tailwind B2 Task 4 composition contract",
    failures,
  );
  const applicationCss = readTaskFourFile(
    root,
    "apps/playground/src/styles.css",
    "Tailwind B2 Task 4 application CSS",
    failures,
  );
  const foundationsPackageSource = readTaskFourFile(
    root,
    "packages/foundations/package.json",
    "Tailwind B2 Task 4 Foundations package",
    failures,
  );
  const foundationsIndex = readTaskFourFile(
    root,
    "packages/foundations/src/index.ts",
    "Tailwind B2 Task 4 Foundations public index",
    failures,
  );

  const dialogRefinementAuthorized = hasDialogRefinementAuthorization(status);
  if (dialogRefinementAuthorized) expectedPublicIndex.push({ moduleSpecifier: "./overlay-token-contract", isTypeOnly: false, elements: ["*"] });
  if (hasTooltipAuthorization(status)) expectedPublicIndex.push({ moduleSpecifier: "./tooltip-token-contract", isTypeOnly: false, elements: ["*"] });

  const parsedTokens = tokens
    ? collectDirectScopedCssDeclarations(
        tokens,
        new Set([":root", ':root, [data-rain-theme="light"]']),
        "Task 4 public Token source",
        failures,
        {
          rejectOutsidePattern: /^--rain-(?:ref|color|space|density|button|input|link|tag|badge|radius|shadow|line|category)-/,
          scopedRecords: darkAuthorized ? Object.fromEntries(Object.entries(outputs.colorThemes).map(([theme, values]) => [
            `[data-rain-theme="${theme}"]`, {
              ...pick(values, /^--rain-category-/), ...colorAliases,
              ...(buttonMigrationAuthorized ? getButtonColorVariables(theme) : {}),
              ...(colorAlignmentAuthorized ? { "--rain-link-color": "var(--rain-color-action-primary-text)" } : {}),
              ...(tagBatchTwoAuthorized ? pick(values, /^--rain-tag-score-badge-fill$/) : {}),
              ...(dialogRefinementAuthorized ? pick(values, /^--rain-overlay-(?:separation|focus|modal|immersive)$/) : {}),
            },
          ])) : {},
        },
      )
    : null;
  const parsedTypography = typography
    ? collectDirectScopedCssDeclarations(
        typography,
        new Set([":root"]),
        "Task 4 typography Token source",
        failures,
        { rejectOutsidePattern: /^--rain-(?:font|font-weight|type|line-height|letter-spacing)-/ },
      )
    : null;
  const parsedFocus = focus
    ? collectDirectScopedCssDeclarations(
        focus,
        new Set([":root"]),
        "Task 4 Focus Token source",
        failures,
        {
          rejectOutsidePattern: /^--rain-focus-/,
          scopedRecords: globalFocusAuthorized ? {
            "[data-rain-theme]": pick(expectedFocusTokens, /^--rain-focus-(?:control(?:-halo)?|item|danger)$/),
          } : {},
        },
      )
    : null;
  const parsedMotion = motion
    ? collectDirectScopedCssDeclarations(
        motion,
        new Set([":root"]),
        "Task 4 Motion Token source",
        failures,
      )
    : null;

  if (parsedTokens) {
    const actualReferenceColorTokens = Object.fromEntries(
      Object.entries(parsedTokens.values).filter(([name]) => /^--rain-ref-[a-z0-9-]+$/.test(name)),
    );
    const referenceColorCounts = Object.fromEntries(
      Object.entries(parsedTokens.counts).filter(([name]) => /^--rain-ref-[a-z0-9-]+$/.test(name)),
    );
    validateExactRecord(
      actualReferenceColorTokens,
      referenceColorCounts,
      taskFourReferenceColorTokenValues,
      "Task 4 private reference color baseline",
      failures,
    );
    const actualSemanticColorTokens = Object.fromEntries(
      Object.entries(parsedTokens.values).filter(([name]) => /^--rain-color-[a-z0-9-]+$/.test(name)),
    );
    const semanticColorCounts = Object.fromEntries(
      Object.entries(parsedTokens.counts).filter(([name]) => /^--rain-color-[a-z0-9-]+$/.test(name)),
    );
    validateExactRecord(
      actualSemanticColorTokens,
      semanticColorCounts,
      expectedSemanticColors,
      "Task 4 semantic color Token contract",
      failures,
    );
    const actualCompositionTokens = Object.fromEntries(
      Object.entries(parsedTokens.values).filter(([name]) => /^--rain-space-/.test(name)),
    );
    const compositionCounts = Object.fromEntries(
      Object.entries(parsedTokens.counts).filter(([name]) => /^--rain-space-/.test(name)),
    );
    const expectedCompositionTokens = Object.fromEntries(
      Object.entries(expectedSpaceTokens).map(([name, value]) => [
        `--rain-space-${name}`,
        value,
      ]),
    );
    validateExactRecord(
      actualCompositionTokens,
      compositionCounts,
      expectedCompositionTokens,
      "Task 4 CSS composition spacing",
      failures,
    );

    const actualComponentTokens = Object.fromEntries(
      Object.entries(parsedTokens.values).filter(([name]) => /^--rain-(?:density|button|input|link|select|tabs)-/.test(name) || (tagAuthorized && /^--rain-tag-(?!neutral-fill$)/.test(name))),
    );
    const componentCounts = Object.fromEntries(
      Object.entries(parsedTokens.counts).filter(([name]) => /^--rain-(?:density|button|input|link|select|tabs)-/.test(name) || (tagAuthorized && /^--rain-tag-(?!neutral-fill$)/.test(name))),
    );
    validateExactRecord(
      actualComponentTokens,
      componentCounts,
      expectedComponentTokens,
      "Task 4 Button/Input component Token contract",
      failures,
    );

    validateExactRecord(
      pick(parsedTokens.values, tagAuthorized ? /^--rain-(?:tag-neutral-fill$|badge-)/ : /^--rain-(?:tag|badge)-/),
      pick(parsedTokens.counts, tagAuthorized ? /^--rain-(?:tag-neutral-fill$|badge-)/ : /^--rain-(?:tag|badge)-/),
      colorAlignmentAuthorized ? confirmedLegacyFillAliases : {},
      "Foundations isolated legacy fill contract",
      failures,
    );

    const actualRadiusAndShadowTokens = Object.fromEntries(
      Object.entries(parsedTokens.values).filter(([name]) => /^--rain-(?:radius|shadow)-/.test(name)),
    );
    const radiusAndShadowCounts = Object.fromEntries(
      Object.entries(parsedTokens.counts).filter(([name]) => /^--rain-(?:radius|shadow)-/.test(name)),
    );
    validateExactRecord(
      actualRadiusAndShadowTokens,
      radiusAndShadowCounts,
      tokenFoundationsAuthorized
        ? { ...taskFourRadiusAndShadowTokenValues, "--rain-radius-12": "12px", "--rain-radius-16": "16px" }
        : taskFourRadiusAndShadowTokenValues,
      "Task 4 radius and shadow Token contract",
      failures,
    );
    validateExactRecord(
      pick(parsedTokens.values, /^--rain-(?:line|category)-/),
      pick(parsedTokens.counts, /^--rain-(?:line|category)-/),
      pick(outputs.variables, /^--rain-(?:line|category)-/),
      "Token Foundations V1 Line and Category values",
      failures,
    );
    validateExactRecord(
      pick(parsedTokens.values, /^--rain-icon-/),
      pick(parsedTokens.counts, /^--rain-icon-/),
      pick(outputs.variables, /^--rain-icon-/),
      "Authorized Icon Size and IconButton Token contract",
      failures,
    );
  }

  if (parsedTypography) {
    const actualTypographyTokens = Object.fromEntries(
      Object.entries(parsedTypography.values).filter(([name]) => /^--rain-(?:font|font-weight|type|line-height|letter-spacing)-/.test(name)),
    );
    const typographyCounts = Object.fromEntries(
      Object.entries(parsedTypography.counts).filter(([name]) => /^--rain-(?:font|font-weight|type|line-height|letter-spacing)-/.test(name)),
    );
    validateExactRecord(
      actualTypographyTokens,
      typographyCounts,
      expectedTypographyTokens,
      "Task 4 typography Token contract",
      failures,
    );
  }

  if (parsedFocus) {
    validateExactRecord(
      parsedFocus.values,
      parsedFocus.counts,
      expectedFocusTokens,
      "Task 4 Focus Token contract",
      failures,
    );
  }

  if (parsedMotion) {
    validateExactRecord(
      parsedMotion.values,
      parsedMotion.counts,
      taskFourMotionTokenValues,
      "Task 4 Motion Token contract",
      failures,
    );
  }

  if (compositionContract) {
    const parsedContract = parseCompositionContract(compositionContract, failures);
    validateExactRecord(
      parsedContract.values ?? {},
      parsedContract.counts ?? {},
      expectedSpaceTokens,
      "Task 4 TypeScript composition spacing",
      failures,
    );
  }

  if (foundationsIndex) {
    const publicIndexExports = parseFoundationsPublicIndex(foundationsIndex, failures, tokenFoundationsAuthorized);
    const publicIndexInventory = publicIndexExports.map(({ elements, isTypeOnly, moduleSpecifier }) => ({
      moduleSpecifier,
      isTypeOnly,
      elements: elements.map(({ exportedName, isTypeOnly: elementIsTypeOnly, localName }) => (
        elementIsTypeOnly || exportedName !== localName
          ? `${elementIsTypeOnly ? "type " : ""}${localName} as ${exportedName}`
          : exportedName
      )),
    }));
    if (!same(publicIndexInventory, expectedPublicIndex)) {
      failures.push(
        `Task 4 Foundations public index full re-export inventory is invalid: ${JSON.stringify(publicIndexInventory)}`,
      );
    }
    const compositionReExports = publicIndexExports.filter(
      ({ moduleSpecifier }) => moduleSpecifier === "./composition-contract",
    );
    const validNamedReExports = compositionReExports.filter(({ elements }) => (
      elements.every(({ exportedName, isTypeOnly, localName }) => (
        exportedName === localName && !isTypeOnly
      ))
    ));
    if (compositionReExports.length !== 2 || validNamedReExports.length !== 2) {
      failures.push(
        `Task 4 Foundations public index re-export inventory is invalid: ${JSON.stringify(
          compositionReExports.map(({ source }) => source),
        )}`,
      );
    }
    const runtimeExports = validNamedReExports
      .filter(({ isTypeOnly }) => !isTypeOnly)
      .flatMap(({ elements }) => elements.map(({ exportedName }) => exportedName))
      .sort(compareCanonicalPaths);
    const typeExports = validNamedReExports
      .filter(({ isTypeOnly }) => isTypeOnly)
      .flatMap(({ elements }) => elements.map(({ exportedName }) => exportedName))
      .sort(compareCanonicalPaths);
    if (!same(runtimeExports, ["compositionSpaceTokenEntries", "compositionSpaceTokens"])) {
      failures.push(`Task 4 Foundations public index runtime exports are invalid: ${JSON.stringify(runtimeExports)}`);
    }
    if (!same(typeExports, ["CompositionSpaceTokenName"])) {
      failures.push(`Task 4 Foundations public index type exports are invalid: ${JSON.stringify(typeExports)}`);
    }
  }

  if (bridge) {
    const definedRainTokens = new Set(
      [parsedTokens, parsedTypography, parsedFocus, parsedMotion]
        .filter(Boolean)
        .flatMap((source) => Object.keys(source.values)),
    );
    const resetIndex = bridge.indexOf("@theme {");
    const mappingIndex = bridge.indexOf("@theme inline {");
    const resetBlock = extractCssBlock(bridge, "@theme {");
    const mappingBlock = extractCssBlock(bridge, "@theme inline {");
    const resetCount = (bridge.match(/@theme\s*\{/g) ?? []).length;
    const mappingCount = (bridge.match(/@theme\s+inline\s*\{/g) ?? []).length;
    const expectedIconSources = [...(iconButtonAuthorized ? [outputs.iconSizeSourceDirective] : []), ...(inputAuthorized ? [outputs.inputSourceDirective] : []), ...(tagAuthorized ? [outputs.tagSourceDirective] : []), ...(selectAuthorized ? [outputs.selectSourceDirective] : []), ...(tabsAuthorized ? [outputs.tabsSourceDirective] : [])];
    const sourceRules = collectCssAtRuleOccurrences(bridge, ["source"]);
    if (!same(sourceRules.map(({ text }) => text), expectedIconSources)
      || !same(collectTopLevelCssAtRules(bridge, "Task 4 Tailwind theme bridge", failures).statements, expectedIconSources)) {
      failures.push("IconButton theme source must be only the exact authorized static Icon Size and control-size class inventory");
    }
    const topLevelBlocks = parseTopLevelCssBlocks(
      expectedIconSources.reduce((source, directive) => source.replace(directive, ""), bridge),
      "Task 4 Tailwind theme bridge",
      failures,
    );
    const topLevelHeaders = topLevelBlocks.map(({ header }) => header);
    if (!same(topLevelHeaders, [
      "@theme",
      "@theme inline",
      "@utility shadow-rain-none",
      "@utility transition-rain-button",
      "@utility focus-rain-button",
      "@utility focus-rain-button-text",
      ...outputs.utilities.map(({ className }) => `@utility ${className}`),
    ])) {
      failures.push(
        `Task 4 Tailwind theme bridge top-level structure is invalid: ${JSON.stringify(topLevelHeaders)}`,
      );
    }
    if (resetIndex < 0 || mappingIndex <= resetIndex || !resetBlock || resetCount !== 1) {
      failures.push("Task 4 theme bridge must reset the complete Tailwind default theme before Rain mappings");
    } else {
      const parsedReset = parseCssDeclarations(resetBlock, { bodyFragment: true });
      validateExactRecord(
        parsedReset.values,
        parsedReset.counts,
        { "--*": "initial" },
        "Task 4 Tailwind theme reset",
        failures,
      );
      if (cssDeclarationRemainder(resetBlock)) {
        failures.push("Task 4 Tailwind theme reset block may contain only custom-property declarations");
      }
    }
    if (!mappingBlock || mappingCount !== 1) {
      failures.push(`Task 4 theme bridge must contain exactly one @theme inline block; received ${mappingCount}`);
    } else {
      const parsedMappings = parseCssDeclarations(mappingBlock, { bodyFragment: true });
      validateExactRecord(
        parsedMappings.values,
        parsedMappings.counts,
        expectedThemeMappings,
        "Task 4 Tailwind theme mapping contract",
        failures,
      );
      if (cssDeclarationRemainder(mappingBlock)) {
        failures.push("Task 4 Tailwind theme mapping block may contain only custom-property declarations");
      }

      for (const [utilityToken, value] of Object.entries(parsedMappings.values)) {
        const sourceToken = value.match(/^var\((--rain-[a-z0-9-]+)\)$/)?.[1];
        if (sourceToken && !definedRainTokens.has(sourceToken)) {
          failures.push(
            `Task 4 Tailwind theme mapping source is not defined: ${utilityToken} -> ${sourceToken}`,
          );
        }
      }

      const mappedComponentSources = new Set(
        Object.values(parsedMappings.values)
          .map((value) => value.match(/^var\((--rain-(?:density|button|input|link)-[a-z0-9-]+)\)$/)?.[1])
          .filter(Boolean),
      );
      const expectedMappedComponentSources = new Set(
        Object.keys(expectedComponentTokens)
          .filter((name) => !(tagBatchTwoAuthorized && tagBatchTwoVariables.has(name)) && name !== "--rain-button-loading-mask-size" && !(inputAuthorized && /^--rain-input-(?:height-(?:24|28|32|36)|clear-size)$/.test(name)) && !(selectAuthorized && selectVariablePattern.test(name)) && !(tabsAuthorized && tabsVariablePattern.test(name)) && !(tagAuthorized && /^--rain-tag-(?:height-|action-size|selection-alpha|hover-opacity|pressed-opacity|disabled-opacity)/.test(name))),
      );
      for (const name of expectedMappedComponentSources) {
        if (!mappedComponentSources.has(name)) {
          failures.push(`Task 4 Tailwind component mapping does not expose ${name}`);
        }
      }
      for (const name of mappedComponentSources) {
        if (!expectedMappedComponentSources.has(name)) {
          failures.push(`Task 4 Tailwind component mapping exposes unexpected Token ${name}`);
        }
      }
    }
    if (/--rain-ref-/.test(bridge)) {
      failures.push("Task 4 theme bridge must not expose private --rain-ref-* values");
    }
    if (/--breakpoint-[a-z0-9-]+\s*:/.test(bridge)) {
      failures.push("Task 4 theme bridge must not reintroduce a Tailwind breakpoint");
    }
    if (bridge.includes("@rain-next/ui") || /button-loading\.(?:png|svg)/.test(bridge)) {
      failures.push("Task 4 Foundations bridge must not reverse-depend on UI or its icon assets");
    }

    const shadowNoneBlock = extractCssBlock(bridge, "@utility shadow-rain-none");
    const shadowNoneBody = shadowNoneBlock
      ? stripCssComments(shadowNoneBlock)
        .replace(/\s+/g, " ")
        .trim()
      : undefined;
    if (shadowNoneBody !== "box-shadow: var(--rain-shadow-none);") {
      failures.push("Task 4 shadow-rain-none utility must map directly and only to --rain-shadow-none");
    }
    if (!definedRainTokens.has("--rain-shadow-none")) {
      failures.push("Task 4 shadow-rain-none utility source is not defined: --rain-shadow-none");
    }

    const interoperabilityUtilities = [
      {
        header: "@utility transition-rain-button",
        expected: "transition-property: color, background-color, opacity;",
        label: "transition-rain-button",
      },
      {
        header: "@utility focus-rain-button",
        expected: "--rain-focus-width: var(--rain-button-focus-outline-width); --rain-focus-offset: var(--rain-button-focus-outline-offset);"
          + (globalFocusAuthorized ? " --rain-focus-control: var(--rain-button-focus-outline); --rain-focus-danger: var(--rain-button-focus-outline);" : ""),
        label: "focus-rain-button",
      },
      {
        header: "@utility focus-rain-button-text",
        expected: "--rain-focus-width: var(--rain-button-text-focus-outline-width); --rain-focus-offset: var(--rain-button-text-focus-outline-offset);"
          + (globalFocusAuthorized ? " --rain-focus-control: var(--rain-button-text-focus-outline); --rain-focus-danger: var(--rain-button-text-focus-outline);" : ""),
        label: "focus-rain-button-text",
      },
    ];
    for (const utility of interoperabilityUtilities) {
      const block = extractCssBlock(bridge, utility.header);
      const body = block
        ? stripCssComments(block).replace(/\s+/g, " ").trim()
        : undefined;
      if (body !== utility.expected) {
        failures.push(
          `Task 4 ${utility.label} utility must map directly and only to its governed interoperability contract`,
        );
      }
    }
    for (const { className, declarations } of outputs.utilities) {
      const block = topLevelBlocks.find(({ header }) => header === `@utility ${className}`);
      if (!block) {
        failures.push(`Token Foundations V1 utility is missing: ${className}`);
        continue;
      }
      const expectedBody = Object.entries(declarations).map(([name, value]) => `${name}: ${value};`).join(" ");
      if (stripCssComments(block.body).replace(/\s+/g, " ").trim() !== expectedBody) {
        failures.push(`Token Foundations V1 utility ${className} must contain only its exact flat declarations`);
      }
      for (const value of Object.values(declarations)) {
        for (const [, sourceToken] of value.matchAll(/var\((--rain-[a-z0-9-]+)\)/g)) {
          if (!definedRainTokens.has(sourceToken)) failures.push(`Token Foundations V1 utility ${className} source is not defined: ${sourceToken}`);
        }
      }
    }
    for (const token of [
      "--rain-button-focus-outline-width",
      "--rain-button-focus-outline-offset",
      "--rain-button-text-focus-outline-width",
      "--rain-button-text-focus-outline-offset",
    ]) {
      if (!definedRainTokens.has(token)) {
        failures.push(`Task 4 Focus interoperability utility source is not defined: ${token}`);
      }
    }
  }

  if (applicationCss) {
    const expectedHeader = [
      '@import "tailwindcss" source(none);',
      '@import "@rain-next/foundations/tailwind-theme.css";',
      '@source "./";',
      '@source "../../../packages/ui/src";',
    ];
    const actualHeader = applicationCss.split(/\r?\n/).slice(0, 4);
    if (!same(actualHeader, expectedHeader)) {
      failures.push(`Task 4 source detection header must be exactly ${JSON.stringify(expectedHeader)}`);
    }
    const expectedImportDirectives = [
      '@import "tailwindcss" source(none);',
      '@import "@rain-next/foundations/tailwind-theme.css";',
    ];
    const topLevelAtRules = collectTopLevelCssAtRules(
      applicationCss,
      "Task 4 application CSS",
      failures,
    );
    const controlledAtRuleOccurrences = collectCssAtRuleOccurrences(applicationCss, [
      "config",
      "custom-variant",
      "import",
      "plugin",
      "reference",
      "source",
      "theme",
      "utility",
      "variant",
    ]);
    const topLevelAtRuleStatements = topLevelAtRules.statements;
    const importOccurrences = controlledAtRuleOccurrences.filter(({ name }) => name === "import");
    const importDirectives = importOccurrences.map(({ text }) => text);
    if (!same(importDirectives, expectedImportDirectives)) {
      failures.push(`Task 4 application import directives must be exactly ${JSON.stringify(expectedImportDirectives)}`);
    }
    const expectedSourceDirectives = [
      '@source "./";',
      '@source "../../../packages/ui/src";',
      ...(tokenFoundationsAuthorized
        ? ['@source not "./docs/*.{ts,tsx,css}";', '@source not "./docs/components";']
        : ['@source not "./docs";']),
      '@source not "./**/*.test.{ts,tsx}";',
      '@source not "../../../packages/ui/src/icons";',
      '@source not "../../../packages/ui/src/**/*.test.{ts,tsx}";',
      hasAvatarFamilyAuthorization(status) ? '@source not inline("border outline filter underline ring");' : '@source not inline("border outline filter underline");',
      ...(tokenFoundationsAuthorized ? ['@source "./docs/token-foundations";'] : []),
      ...(iconButtonAuthorized ? ['@source "./docs/components/icon-button-page.tsx";'] : []),
      ...(hasInputNumberAuthorization(status) ? ['@source "./docs/components/input-number-page.tsx";'] : []),
      ...(inputAuthorized ? ['@source "./docs/components/input-page.tsx";'] : []),
      ...(selectAuthorized ? ['@source "./docs/components/select-page.tsx";'] : []),
      ...(hasTabsRefinementAuthorization(status) && ["component", "documentation"].includes(status.componentRefinements.tabs.stage) ? ['@source "./docs/components/tabs-page.tsx";'] : []),
      ...(hasTableRn08Authorization(status) ? ['@source "./docs/components/table-page.tsx";', '@source "../../prototype/src/data-table-recipe.tsx";'] : []),
      ...(hasAvatarFamilyAuthorization(status) ? ['@source "./docs/components/avatar-page.tsx";'] : []),
      ...(hasLayoutsV1Authorization(status) ? ['@source "../../../packages/layouts/src/layout.tsx";', '@source "./docs/components/layouts-page.tsx";', '@source "../../prototype/src/layout-recipes.tsx";'] : []),
      ...(hasDialogV2Authorization(status) ? ['@source "./docs/components/dialog-page.tsx";', '@source "../../prototype/src/course-dialog.tsx";'] : []),
      ...(hasCardV2Authorization(status) ? ['@source "./docs/components/card-page.tsx";', '@source "../../prototype/src/card-recipes.tsx";'] : []),
      ...(hasDropdownFamilyAuthorization(status) ? ['@source "./docs/components/dropdown-page.tsx";'] : []),
      ...(tagAuthorized ? ['@source "./docs/components/tag-page.tsx";'] : []),
      ...(questionNumberAuthorized ? ['@source "./docs/components/question-number-page.tsx";'] : []),
      ...(optionButtonAuthorized ? ['@source "./docs/components/option-button-page.tsx";'] : []),
      ...(hasCheckboxSc01Authorization(status) ? ['@source "./docs/components/checkbox-page.tsx";'] : []),
      ...(hasRadioSc01Authorization(status) ? ['@source "./docs/components/radio-page.tsx";'] : []),
      ...(hasSelectionCardsSc02Authorization(status) ? ['@source "./docs/components/selection-cards-page.tsx";'] : []),
      ...(hasSelectionPatternsSc03Authorization(status) ? ['@source "./docs/components/selection-patterns-page.tsx";'] : []),
      ...(hasSelectionPlaygroundSc04Authorization(status) ? ['@source "./docs/components/selection-playground-page.tsx";'] : []),
      ...(hasG123PlaygroundAssetizationAuthorization(status) ? g123PlaygroundFiles.scanSources.map(file => `@source "./docs/components/${file}.tsx";`) : []),
      ...(hasG4ComponentsAuthorization(status) ? ['@source "./docs/components/g4-component-pages.tsx";'] : []),
      ...(hasG5ComponentsAuthorization(status) ? ['@source "./docs/components/g5-component-pages.tsx";'] : []),
      ...(hasG6ComponentsAuthorization(status) ? ["media", "interaction", "conversation"].map(name => `@source "./docs/components/g6-${name}-pages.tsx";`) : []),
      ...(colorAlignmentAuthorized ? ['@source inline("text-rain-action-primary");'] : []),
    ];
    const sourceOccurrences = controlledAtRuleOccurrences.filter(({ name }) => name === "source");
    const sourceDirectives = sourceOccurrences.map(({ text }) => text);
    if (!same(sourceDirectives, expectedSourceDirectives)) {
      failures.push(`Task 4 source detection directives must be exactly ${JSON.stringify(expectedSourceDirectives)}`);
    }
    if (!same(topLevelAtRuleStatements, [...expectedImportDirectives, ...expectedSourceDirectives])) {
      failures.push("Task 4 application CSS top-level at-rule statement inventory is invalid");
    }
    const forbiddenTailwindBlockDirectives = controlledAtRuleOccurrences
      .filter(({ kind, name }) => (
        kind === "block" &&
        ["custom-variant", "plugin", "theme", "utility", "variant"].includes(name)
      ))
      .map(({ text }) => text);
    if (forbiddenTailwindBlockDirectives.length > 0) {
      failures.push(
        `Task 4 application CSS must not reopen Tailwind through a block directive: ${JSON.stringify(forbiddenTailwindBlockDirectives)}`,
      );
    }
    const forbiddenTailwindLoadDirectives = controlledAtRuleOccurrences
      .filter(({ name }) => ["config", "plugin", "reference"].includes(name))
      .map(({ text }) => text);
    if (forbiddenTailwindLoadDirectives.length > 0) {
      failures.push(
        `Task 4 application CSS must not reopen Tailwind through a load directive: ${JSON.stringify(forbiddenTailwindLoadDirectives)}`,
      );
    }
  }

  if (foundationsPackageSource) {
    try {
      const foundationsPackage = JSON.parse(foundationsPackageSource);
      if (foundationsPackage.exports?.["./tailwind-theme.css"] !== "./src/tailwind-theme.css") {
        failures.push("Task 4 Foundations package must export ./tailwind-theme.css exactly");
      }
    } catch (error) {
      failures.push(`Task 4 Foundations package cannot be parsed: ${error.message}`);
    }
  }

  for (const [filePath, expectedHash] of Object.entries(taskFourProtectedIconHashes)) {
    const source = readTaskFourFile(
      root,
      filePath,
      "Task 4 protected icon artifact",
      failures,
      { binary: true },
    );
    const withoutQuestionIcons = source && questionNumberAuthorized && ["manifests/icons.json", "registry/icons.json"].includes(filePath)
      ? normalizeQuestionNumberIconArtifact(source, filePath) : source;
    const baselineSource = withoutQuestionIcons && iconButtonAuthorized && filePath === "manifests/icons.json"
      ? normalizeIconButtonSemanticManifest(withoutQuestionIcons) : withoutQuestionIcons;
    if (baselineSource && sha256(baselineSource) !== expectedHash) {
      failures.push(`Task 4 protected icon artifact changed: ${filePath}`);
    }
  }
  if (questionNumberAuthorized) {
    for (const [filePath, expectedHash] of Object.entries(questionNumberIconHashes)) {
      const source = readTaskFourFile(root, filePath, "QuestionNumber grading icon", failures, { binary: true });
      if (source && sha256(source) !== expectedHash) failures.push(`QuestionNumber grading icon differs from its authorized source: ${filePath}`);
    }
  }
  const protectedIconTree = hashTaskFourIconTree(root, failures, questionNumberAuthorized);
  if (
    protectedIconTree.count !== taskFourProtectedIconTreeFileCount ||
    protectedIconTree.sha256 !== taskFourProtectedIconTreeSha256
  ) {
    failures.push(
      `Task 4 protected icon tree changed: expected ${taskFourProtectedIconTreeFileCount} files / ${taskFourProtectedIconTreeSha256}, received ${protectedIconTree.count} files / ${protectedIconTree.sha256}`,
    );
  }

  return failures;
}

const taskFiveManifestPaths = [
  tailwindB2ContractPath,
  tailwindB2ButtonManifestPath,
  tailwindB2InputManifestPath,
];

const taskFiveDefaultVisualPatterns = [
  /(?<![a-z0-9-])bg-(?!rain-)(?:black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\d+)?\b/gi,
  /(?<![a-z0-9-])text-(?!rain-)(?:black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\d+)?\b/gi,
  /(?<![a-z0-9-])text-(?:xs|sm|base|lg|xl|[2-9]xl)\b/gi,
  /(?<![a-z0-9-])rounded(?!-rain-)(?:-(?:none|xs|sm|md|lg|xl|2xl|3xl|4xl|full))?\b/gi,
  /(?<![a-z0-9-])shadow(?!-rain-)(?:-(?:none|2xs|xs|sm|md|lg|xl|2xl|inner))?\b/gi,
  /(?<![a-z0-9-])font-(?!rain-)(?:sans|serif|mono|thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/gi,
  /(?<![a-z0-9-])(?:gap|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)-(?!rain-)\d+(?:\.5)?\b/gi,
];

const taskFiveArbitraryVisualPattern = /\b(?:bg|text|border|rounded|shadow|font|gap|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|w|h|min-w|max-w|min-h|max-h|size|opacity|duration|ease|outline)-\[[^\]]+\]/gi;
const taskFiveImportantPattern = /(?:^|[\s"'`])(!?[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)*(?:-rain-[a-z0-9-]+|\[[^\]]+\])!)(?=$|[\s"'`])/gi;

function unique(values) {
  return [...new Set(values)];
}

export function validateProtectedTailwindSource({ filePath, source }) {
  const failures = [];
  if (typeof source !== "string") {
    return [`protected Tailwind source must be text: ${filePath}`];
  }

  if (/--rain-ref-[a-z0-9-]+/i.test(source)) {
    const token = source.match(/--rain-ref-[a-z0-9-]+/i)?.[0];
    failures.push(`private reference Token is forbidden in ${filePath}: ${token}`);
  }
  if (source.includes("${")) {
    const visit = (node) => {
      if (!node || typeof node !== "object") return;
      if (node.type === "TemplateLiteral" && node.quasis.slice(0, -1).some((part) => /(?:^|[\s:!])-?(?:(?:min|max)-[wh]|bg|text|border|rounded|shadow|font|gap|p[trblxy]?|m[trblxy]?|w|h|size|opacity|duration|ease|outline)-[^\s]*$/.test(part.value.raw))) {
        failures.push(`dynamic Tailwind class construction is forbidden in ${filePath}`);
      }
      for (const value of Object.values(node)) if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value === "object") visit(value);
    };
    visit(parseSync(filePath, source).program);
  }

  for (const match of source.matchAll(taskFiveArbitraryVisualPattern)) {
    failures.push(`arbitrary visual utility is forbidden in ${filePath}: ${match[0]}`);
  }
  for (const match of source.matchAll(taskFiveImportantPattern)) {
    failures.push(`important modifier is forbidden in ${filePath}: ${match[1]}`);
  }
  for (const pattern of taskFiveDefaultVisualPatterns) {
    pattern.lastIndex = 0;
    for (const match of source.matchAll(pattern)) {
      failures.push(`default visual utility is forbidden in ${filePath}: ${match[0]}`);
    }
  }

  if (/\.(?:styles|recipe)\.[cm]?[jt]sx?$/.test(filePath)) {
    const rawColor = source.match(/#[0-9a-f]{3,8}\b|\b(?:rgb|hsl|oklch)\s*\(/i)?.[0];
    if (rawColor) failures.push(`raw color is forbidden in ${filePath}: ${rawColor}`);
  }
  return unique(failures);
}

function collectTaskFiveFiles(root, relativeDirectory, failures) {
  const absoluteDirectory = join(root, relativeDirectory);
  if (!existsSync(absoluteDirectory)) return [];
  let directoryStat;
  try {
    directoryStat = lstatSync(absoluteDirectory);
  } catch (error) {
    failures.push(`Task 5 protected directory cannot be inspected: ${relativeDirectory}: ${error.message}`);
    return [];
  }
  if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink()) {
    failures.push(`Task 5 protected directory must be a regular directory: ${relativeDirectory}`);
    return [];
  }
  const visit = (directory, prefix) => readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolutePath = join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        failures.push(`Task 5 protected tree cannot contain a symbolic link: ${relativePath}`);
        return [];
      }
      if (entry.isDirectory()) return visit(absolutePath, relativePath);
      if (!entry.isFile()) {
        failures.push(`Task 5 protected tree can contain only regular files: ${relativePath}`);
        return [];
      }
      return [relativePath];
    });
  return visit(absoluteDirectory, relativeDirectory);
}

function validateTaskFiveComponentManifest(manifest, expected, root, label, failures) {
  if (!manifest || typeof manifest !== "object") return;
  for (const [key, value] of Object.entries({
    schemaVersion: "1.0",
    kind: "RainUiManifest",
    id: expected.id,
    category: "ui",
    assetIdentity: expected.assetIdentity ?? "local-experiment",
    maturity: expected.maturity ?? "prototype-ready",
    modificationMode: "managed",
    sourcePath: expected.sourcePath,
    publication: "unpublished",
  })) {
    if (manifest[key] !== value) {
      failures.push(`${label}.${key} must be ${JSON.stringify(value)}`);
    }
  }
  if (JSON.stringify(manifest.parts) !== JSON.stringify(expected.parts)) {
    failures.push(`${label}.parts must be exactly ${JSON.stringify(expected.parts)}`);
  }
  for (const field of [
    "anatomy",
    "props",
    "states",
    "tokens",
    "compositionRules",
    "allowedModifications",
    "restrictedModifications",
    "accessibility",
  ]) {
    if (!Array.isArray(manifest[field]) || manifest[field].length === 0) {
      failures.push(`${label}.${field} must be a non-empty sequence`);
    }
  }
  for (const pathField of ["sourcePath", "styleSourcePath"]) {
    const filePath = manifest[pathField];
    if (typeof filePath !== "string" || isAbsolute(filePath) || filePath.includes("..")) {
      failures.push(`${label}.${pathField} must be a safe repository-relative path`);
      continue;
    }
    try {
      const stat = lstatSync(join(root, filePath));
      if (!stat.isFile() || stat.isSymbolicLink()) {
        failures.push(`${label}.${pathField} must reference a regular file: ${filePath}`);
      }
    } catch {
      failures.push(`${label}.${pathField} is missing: ${filePath}`);
    }
  }
  if (!manifest.visualLineage || typeof manifest.visualLineage !== "object") {
    failures.push(`${label}.visualLineage must be recorded`);
  }
}

export function validateDropdownFamilyManifest({ manifest, name, root = process.cwd(), review }) {
  const failures = [], label = `Dropdown family ${name} manifest`;
  const menu = name === "dropdown-menu";
  validateTaskFiveComponentManifest(manifest, { id: `ui-${name}`, sourcePath: `packages/ui/src/${name}/${name}.tsx`,
    assetIdentity: "registry-candidate", maturity: "registry-candidate",
    parts: menu ? ["content", "item", "label", "description", "leading", "meta", "shortcut", "indicator", "confirmation"] : ["content"] }, root, label, failures);
  if (!manifest || manifest.styleSourcePath !== "packages/ui/src/dropdown-menu/dropdown-menu.css"
    || !same(manifest.verification, { automated: review?.automatedVerification, independentReview: review?.independentReview,
      humanGate: review?.humanGate, ...(review?.humanGate === "accepted" ? { humanGateScope: "dropdown-menu-popover-runtime-visual-only" } : {}), contrastAcceptance: "not-granted", evidence: "evidence/runtime/dropdown/verification.md" })) failures.push(`${label} must keep its own candidate lifecycle and styles`);
  return failures;
}

export function validateDropdownFamilyRegistry(item, { humanGate = "awaiting_human" } = {}) {
  const expected = {
    schemaVersion: 1, kind: "RainLocalSourceRegistry", publication: "not-published", scope: "current-workspace",
    humanGate, ...(humanGate === "accepted" ? { humanGateScope: "dropdown-menu-popover-runtime-visual-only" } : {}), contrastAcceptance: "not-granted", dependencies: { "@base-ui/react": "1.8.0" },
    shared: {
      files: ["packages/ui/src/_internal/popup.tsx", "packages/ui/src/dropdown-menu/dropdown-menu.css", "packages/ui/src/dropdown-menu/dropdown-menu.css.d.ts", "packages/ui/src/recipes/local-recipe.ts", "packages/ui/src/utils/rain-class-names.ts", "packages/ui/src/styles.css"],
      peerDependencies: ["react", "@rain-next/foundations", "tailwind-merge"],
      styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/foundations/typography.css", "@rain-next/foundations/focus.css", "@rain-next/foundations/tailwind-theme.css", "@rain-next/ui/styles.css"],
      registryDependencies: ["check-bold", "arrow-right", "minus-bold"],
    },
    items: [
      { name: "dropdown-menu", exportName: "DropdownMenu", importPath: "@rain-next/ui", manifest: "manifests/ui/dropdown-menu.yaml", files: ["packages/ui/src/dropdown-menu/dropdown-menu.tsx", "packages/ui/src/dropdown-menu/dropdown-menu.styles.ts", "packages/ui/src/checkbox/checkbox.tsx", "packages/ui/src/radio/radio.tsx", "packages/ui/src/utils/use-default-reset.ts"] },
      { name: "popover", exportName: "Popover", importPath: "@rain-next/ui", manifest: "manifests/ui/popover.yaml", files: ["packages/ui/src/popover/popover.tsx"] },
    ],
  };
  return same(item, expected) ? [] : ["Dropdown family Registry must retain its exact unpublished source graph and validated visual Human Gate"];
}

function validateTaskSevenButtonMigration(contract, button, root, failures, phaseStatus) {
  const expectedStyleSourcePath = "packages/ui/src/button/button.styles.ts";
  if (button?.styleSourcePath !== expectedStyleSourcePath) {
    failures.push(
      `Button UI manifest styleSourcePath must be ${expectedStyleSourcePath}`,
    );
  }
  if (button?.lifecycle?.implementation !== "tailwind-first-cva-local-recipe") {
    failures.push(
      "Button UI manifest lifecycle implementation must record the Tailwind-first CVA Local Recipe migration",
    );
  }
  if (
    button?.lifecycle?.ordinaryHumanGate !== "accepted" ||
    button?.lifecycle?.textHumanGate !== (phaseStatus?.componentRefinements?.textButton?.humanGate ?? "awaiting_human")
  ) {
    failures.push(
      "Button migration must preserve the ordinary Human Gate and match the validated TextButton Human Gate",
    );
  }
  if (phaseStatus?.tokenRefinements?.buttonTokenMigration
    && button?.tokenMigration?.humanGate !== phaseStatus.tokenRefinements.buttonTokenMigration.humanGate) {
    failures.push("Button Token migration manifest must match the validated visual acceptance");
  }
  for (const prop of ["className", "localRecipe"]) {
    if (!button?.props?.includes(prop)) {
      failures.push(`Button UI manifest props must include ${prop}`);
    }
  }

  const expectedExceptionIds = [
    "button-loading-mask",
    "button-forced-colors",
    "button-reduced-motion",
  ];
  const buttonExceptions = (contract?.cssExceptions?.entries ?? []).filter(
    (entry) => entry?.component === "ui-button",
  );
  if (
    JSON.stringify(buttonExceptions.map(({ id }) => id)) !==
    JSON.stringify(expectedExceptionIds)
  ) {
    failures.push(
      `Button CSS exception inventory must be exactly ${expectedExceptionIds.join(", ")}`,
    );
  }
  for (const entry of buttonExceptions) {
    if (entry.status !== "implemented-task-7") {
      failures.push(
        `Button CSS exception ${entry.id} status must be implemented-task-7`,
      );
    }
  }

  let recipeSource = "";
  try {
    recipeSource = readFileSync(join(root, expectedStyleSourcePath), "utf8");
  } catch (error) {
    failures.push(`Button Tailwind style source cannot be read: ${error.message}`);
  }
  if (
    recipeSource &&
    !/import\s*\{\s*cva\s*\}\s*from\s*["']class-variance-authority["']/.test(
      recipeSource,
    )
  ) {
    failures.push("Button Tailwind style source must use the governed CVA dependency");
  }
  if (
    recipeSource &&
    (!recipeSource.includes("buttonRootRecipe") ||
      !recipeSource.includes("buttonPartClassName"))
  ) {
    failures.push("Button Tailwind style source must expose Root and Part recipes");
  }

  let buttonSource = "";
  try {
    buttonSource = readFileSync(
      join(root, "packages/ui/src/button/button.tsx"),
      "utf8",
    );
  } catch (error) {
    failures.push(`Button source cannot be read for Task 7: ${error.message}`);
  }
  if (
    buttonSource &&
    (!buttonSource.includes("localRecipe?: RainLocalRecipe") ||
      !buttonSource.includes("getRainLocalRecipePart") ||
      !buttonSource.includes("buttonRootRecipe"))
  ) {
    failures.push(
      "Button source must compose the CVA Master with its typed Local Recipe hook",
    );
  }

  let nativeStyles = "";
  try {
    nativeStyles = readFileSync(
      join(root, "packages/ui/src/styles.css"),
      "utf8",
    );
  } catch (error) {
    failures.push(`Button native CSS exception source cannot be read: ${error.message}`);
  }
  if (/\.rain-button\[data-(?:block|size|state|tone|variant)=/.test(nativeStyles)) {
    failures.push(
      "Unregistered Button native CSS is forbidden after the Tailwind-first migration",
    );
  }
  const registeredExceptionIds = new Set(expectedExceptionIds);
  for (const match of nativeStyles.matchAll(/^[ \t]*\.rain-button[^\n{]*\{/gm)) {
    const preceding = nativeStyles.slice(Math.max(0, match.index - 160), match.index);
    const marker = preceding.match(
      /@rain-css-exception\s+([a-z0-9-]+)(?![\s\S]*@rain-css-exception)/,
    )?.[1];
    if (!marker || !registeredExceptionIds.has(marker)) {
      failures.push(
        `Button CSS exception selector is missing a registered manifest marker: ${match[0].trim()}`,
      );
      continue;
    }
    if (match[0].includes(":focus-visible") && marker !== "button-forced-colors") {
      failures.push("Button Forced Colors selector must use the button-forced-colors marker");
    }
    if (
      match[0].includes("loading-indicator") &&
      marker !== "button-loading-mask" &&
      marker !== "button-reduced-motion"
    ) {
      failures.push("Button Loading selector must use a registered Loading or motion marker");
    }
  }
  for (const id of expectedExceptionIds) {
    if (!nativeStyles.includes(`@rain-css-exception ${id}`)) {
      failures.push(`Button CSS exception ${id} is missing its source marker`);
    }
  }
}

const tagManifests = {
  tag: { file: "tag.tsx", exportName: "Tag", parts: ["root", "content", "label", "leading-icon", "remove-action"] },
  "link-tag": { file: "link-tag.tsx", exportName: "LinkTag", parts: ["root", "main-action", "content", "label", "leading-icon", "remove-action"] },
  "checkable-tag": { file: "checkable-tag.tsx", exportName: "CheckableTag", parts: ["root", "input", "content", "label", "leading-icon", "selection-mark"] },
  "checkable-tag-group": { file: "checkable-tag.tsx", exportName: "CheckableTagGroup", parts: ["root", "legend", "items"] },
};

const tagDomainManifests = {
  "learning-unit-tag": { file: "domain-tags.tsx", exportName: "LearningUnitTag", parts: ["root", "label", "line", "back-layer", "front-layer"] },
  "difficulty-tag": { file: "domain-tags.tsx", exportName: "DifficultyTag", parts: ["root", "label"] },
  "group-type-tag": { file: "domain-tags.tsx", exportName: "GroupTypeTag", parts: ["root", "label"] },
  "status-tag": { file: "domain-tags.tsx", exportName: "StatusTag", parts: ["root", "label", "status-dot"] },
  "system-status-tag": { file: "domain-tags.tsx", exportName: "SystemStatusTag", parts: ["root", "label", "status-icon"] },
  "learning-unit-reminder-mark": { file: "domain-tags.tsx", exportName: "LearningUnitReminderMark", parts: ["root", "label", "line", "reminder", "reminder-hint"] },
  "scored-task-type-mark": { file: "domain-tags.tsx", exportName: "ScoredTaskTypeMark", parts: ["root", "label", "line", "score-badge"] },
};

export function validateTagFamilyManifest({ manifest, name, root = process.cwd(), humanGate = "awaiting_human" }) {
  const failures = [], label = `${name} UI manifest`, expected = tagManifests[name] ?? tagDomainManifests[name];
  if (!expected) return ["Unknown Tag family manifest"];
  validateTaskFiveComponentManifest(manifest, {
    id: `ui-${name}`, sourcePath: `packages/ui/src/tag/${expected.file}`, parts: expected.parts,
    assetIdentity: "registry-candidate", maturity: "registry-candidate",
  }, root, label, failures);
  if (manifest?.styleSourcePath !== (tagDomainManifests[name] ? "packages/ui/src/tag/domain-tags.styles.ts" : "packages/ui/src/tag/tag.styles.ts") || manifest?.verification?.humanGate !== humanGate
    || manifest?.verification?.contrastAcceptance !== "not-granted") failures.push(`${label} must retain the exact Tag recipe, recorded Human Gate and separate contrast review`);
  return failures;
}

export function validateTagCssExceptions({ contract, source, authorized = true, batchTwoAuthorized = true, root = process.cwd() }) {
  const failures = [], label = "Authorized Tag native CSS";
  const ids = [...(batchTwoAuthorized ? ["tag-vertical-layout", "tag-domain-details", "tag-processing-motion", "tag-domain-forced-colors"] : ["tag-vertical-compatibility"]), "tag-disabled-action", "tag-link-composition", "tag-state-composition", "tag-choice-focus", "tag-touch-targets", "tag-forced-colors"];
  const entries = (contract?.cssExceptions?.entries ?? []).filter(({ id, component }) => component === "ui-tag" || ids.includes(id));
  if (!same(entries.map(({ id }) => id), authorized ? ids : []) || (authorized && ids.some((id) => !source.includes(`@rain-css-exception ${id}`)))) failures.push(`${label} must retain its exact authorized exception inventory and source markers`);
  const expected = `
    ${batchTwoAuthorized ? `.rain-tag-vertical [data-slot="content"] { flex-direction: column; }
.rain-tag-vertical [data-slot="label"] { width: 1em; white-space: normal; overflow: visible; overflow-wrap: anywhere; text-align: center; }

/* @rain-css-exception tag-domain-details: registered native shapes, reminder offset and batch alpha. */
.rain-tag-status-dot { background-color: currentColor; width: var(--rain-tag-status-dot); height: var(--rain-tag-status-dot); }
.rain-tag-reminder { background-color: currentColor; width: var(--rain-tag-reminder-diameter); height: var(--rain-tag-reminder-diameter); border-width: var(--rain-tag-reminder-ring); top: var(--rain-tag-reminder-offset); right: var(--rain-tag-reminder-offset); }
.rain-tag-batch__front { align-self: start; margin-left: auto; }
.rain-tag-batch__back { left: 0; opacity: var(--rain-tag-batch-back-alpha); }
.rain-tag-score { display: inline-grid; grid-template-columns: 1fr; grid-template-rows: 1fr auto 1fr; row-gap: var(--rain-space-2); }
.rain-tag-score > [data-slot="label"] { grid-row: 2; grid-column: 1; }
.rain-tag-score[data-state="unscored"] > [data-slot="score-badge"] { visibility: hidden; }
.rain-tag-score-badge { grid-row: 1; grid-column: 1; align-self: start; justify-self: end; border-top-left-radius: 0; border-bottom-right-radius: 0; border-top-right-radius: inherit; }

/* @rain-css-exception tag-processing-motion: use the existing loading motion and honor reduced motion. */
.rain-tag-processing { animation: rain-button-loading-spin var(--rain-button-loading-duration) var(--rain-button-loading-timing-function) infinite; }
@media (prefers-reduced-motion: reduce) { .rain-tag-processing { animation: none; } }

/* @rain-css-exception tag-domain-forced-colors: preserve dots and the scored boundary in system colors. */
@media (forced-colors: active) {
  .rain-tag-status-dot { background: CanvasText; }
  .rain-tag-reminder { background: Highlight; border-color: Canvas; forced-color-adjust: none; }
  .rain-tag-score-badge { color: CanvasText; border: var(--rain-line-thickness-1) solid CanvasText; }
}

` : `    .rain-tag-vertical { writing-mode: vertical-rl; height: auto; min-height: 28px; padding-inline: var(--rain-space-8); border-radius: var(--rain-radius-4); font-size: var(--rain-font-size-12); line-height: var(--rain-line-height-18); }
    .rain-tag-vertical[data-density="compact"] { min-height: 24px; padding-inline: var(--rain-space-6); }
`}
    .rain-tag__remove:disabled { background-color: transparent; }
    .rain-link-tag { padding-inline: 0; isolation: isolate; }
    .rain-tag .rain-tag__main, .rain-tag .rain-tag__main:is(:visited, :hover, :active) {
      position: relative; display: inline-flex; min-width: 0; align-items: center; align-self: center; height: 100%;
      padding-inline: var(--rain-space-8); border-radius: inherit; color: inherit; font: inherit; text-decoration: none; white-space: nowrap;
    }
    .rain-tag[data-size="20"] .rain-tag__main { padding-inline: var(--rain-space-6); }
    .rain-tag[data-size="28"] .rain-tag__main { padding-inline: var(--rain-space-12); }
    .rain-tag[data-removable="true"] .rain-tag__main { padding-inline-end: 0; }
    .rain-tag__main > [data-slot="label"] { display: inline-flex; min-width: 0; }
    .rain-tag__main > [data-slot="new-tab-hint"] { flex: none; }
    .rain-checkable-tag { isolation: isolate; }
    .rain-checkable-tag [data-slot="selection-mark"] > [data-icon="icon/check-bold"] { color: color-mix(in srgb, currentColor var(--rain-tag-selection-alpha), transparent); }
    .rain-tag__overlay { z-index: -1; border-radius: inherit; opacity: 0; }
    .rain-tag__main:hover .rain-tag__overlay, .rain-checkable-tag:hover > .rain-tag__overlay { opacity: var(--rain-tag-hover-opacity); }
    .rain-tag__main:active .rain-tag__overlay, .rain-checkable-tag:active > .rain-tag__overlay { opacity: var(--rain-tag-pressed-opacity); }
    .rain-checkable-tag:has(input:focus-visible) { outline: var(--rain-focus-width) solid var(--rain-focus-item); outline-offset: var(--rain-focus-offset); box-shadow: 0 0 0 3px var(--rain-focus-control-halo); }
    .rain-checkable-tag, .rain-link-tag, .rain-tag[data-removable="true"] { margin-block: calc(var(--rain-space-6) / 2); }
    .rain-tag__remove { position: relative; margin-inline: calc(var(--rain-space-6) / 2); margin-inline-end: calc(var(--rain-space-6) / 2 - var(--rain-space-2)); }
    .rain-checkable-tag::after, .rain-tag a.rain-tag__main::after, .rain-tag__remove::after { content: ""; position: absolute; inset-inline: 0; inset-block: calc(var(--rain-space-6) / -2); }
    .rain-tag__remove::after { inset-inline: calc(var(--rain-space-6) / -2); }
    @media (pointer: coarse) {
      .rain-checkable-tag, .rain-link-tag, .rain-tag[data-removable="true"] { margin-block: var(--rain-space-14); }
      .rain-checkable-tag::after, .rain-tag a.rain-tag__main::after, .rain-tag__remove::after { inset-block: calc(-1 * var(--rain-space-14)); }
    }
    @media (forced-colors: active) {
      .rain-tag { border-color: CanvasText; color: CanvasText; background-color: Canvas; }
      .rain-tag [data-slot="leading-icon"], .rain-tag [data-slot="selection-mark"], .rain-tag__remove { color: CanvasText; }
      .rain-tag [data-slot="selection-mark"] > [data-icon="icon/check-bold"] { color: inherit; }
      .rain-tag__overlay { display: none; }
      .rain-tag[data-state="disabled"], .rain-tag[data-state="disabled"] .rain-tag__remove { color: GrayText; border-color: GrayText; opacity: 1; }
      .rain-checkable-tag:has(input:focus-visible) { outline: 2px solid CanvasText; outline-offset: 2px; box-shadow: none; }
    }
  `;
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/\.rain-(?:tag(?:\b|__)|link-tag\b|checkable-tag\b)/.test(`${header} ${body}`)) return [];
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    // Select composition rules are checked by validateInputCssExceptions.
    if (/^\.rain-select(?:\b|__)/.test(header)) return [];
    // TagSelect has its own exact scoped validator; keep accepted Tag rules independent.
    if (/\.rain-tag-select(?:\b|__)/.test(header)) return [];
    return [{ scope: ancestry, selector: header.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  if (authorized && !same(collect(source), collect(expected))) failures.push(`${label} must preserve only the exact compatibility, composition, native focus, touch and system-color rules`);
  return failures;
}

export function validateTagSelectCssExceptions({ contract, source, authorized = false, root = process.cwd() }) {
  const failures = [], label = "Authorized TagSelect CSS";
  const ids = ["tag-select-layer", "tag-select-interaction", "tag-select-forced-colors"];
  const entries = (contract?.cssExceptions?.entries ?? []).filter((entry) => entry.component === "ui-tag-select" || ids.includes(entry.id));
  if (!same(entries.map((entry) => entry.id), authorized ? ids : [])) failures.push(`${label} requires its exact third-batch exception inventory`);
  const expected = authorized ? `
    .rain-tag-select__positioner { z-index: 40; max-width: calc(100vw - 16px); }
    .rain-tag-select__popup { min-width: min(100%, var(--anchor-width)); width: max-content; max-width: min(20rem, var(--available-width)); max-height: min(20rem, var(--available-height)); overflow-y: auto; overscroll-behavior: contain; }
    .rain-tag-select__trigger { isolation: isolate; min-height: calc(1lh + var(--rain-line-thickness-1) * 2); margin-block: calc(var(--rain-space-6) / 2); }
    .rain-tag-select__trigger:not(:disabled):hover > .rain-tag__overlay { opacity: var(--rain-tag-hover-opacity); }
    .rain-tag-select__trigger:not(:disabled):active > .rain-tag__overlay { opacity: var(--rain-tag-pressed-opacity); }
    .rain-tag-select__trigger::after { content: ""; position: absolute; inset: calc(var(--rain-space-6) / -2) 0; }
    @media (pointer: coarse) {
      .rain-tag-select__trigger { margin-block: var(--rain-space-14); }
      .rain-tag-select__trigger::after { inset-block: calc(var(--rain-space-14) * -1); }
      .rain-tag-select__option { min-height: var(--rain-select-touch-target-size); }
    }
    @media (forced-colors: active) {
      .rain-tag-select__popup { color: CanvasText; background: Canvas; border-color: CanvasText; }
      .rain-tag-select__option[data-highlighted] { outline: 2px solid Highlight; outline-offset: -2px; }
      .rain-tag-select__option[data-selected], .rain-tag-select__option [data-slot="indicator"] { color: CanvasText; }
      .rain-tag-select__option[data-disabled], .rain-tag-select__option[data-disabled] [data-slot="indicator"] { color: GrayText; }
    }` : "";
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/\.rain-tag-select(?:\b|__)/.test(`${header} ${body}`)) return [];
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    return [{ scope: ancestry, selector: header.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  if (!same(collect(source), collect(expected)) || authorized && ids.some((id) => !source.includes(`@rain-css-exception ${id}`))) failures.push(`${label} must keep exact popup limits, inherited Tag feedback, touch targets and system colors`);
  return failures;
}

export function validateTagSelectManifest({ manifest, root = process.cwd(), humanGate = "not-evaluated" }) {
  const failures = [], label = "TagSelect UI manifest";
  validateTaskFiveComponentManifest(manifest, { id: "ui-tag-select", sourcePath: "packages/ui/src/tag/tag-select.tsx", assetIdentity: "registry-candidate", maturity: "registry-candidate",
    parts: ["root", "content", "label", "leading-icon", "popup", "option", "arrow", "indicator"] }, root, label, failures);
  if (manifest?.styleSourcePath !== "packages/ui/src/tag/tag-select.styles.ts" || manifest?.verification?.humanGate !== humanGate
    || manifest?.verification?.contrastAcceptance !== "not-granted" || manifest?.headless !== "@base-ui/react/select@1.8.0") failures.push(`${label} must keep its exact source, dependency and independent third-batch Gate`);
  return failures;
}

export function validateInputFamilyManifest({ manifest, name, root = process.cwd(), humanGate = "awaiting_human" }) {
  const failures = [], label = `${name} UI manifest`;
  const parts = {
    input: ["root", "leading-icon", "prefix", "prefix-text", "control", "clear-slot", "clear-action", "suffix-text", "suffix", "trailing-icon", "count", "trailing-action"],
    "form-item": ["root", "label", "required", "help", "message"],
    "search-input": ["root"],
  };
  if (!Object.hasOwn(parts, name)) return ["Unknown Input family manifest"];
  validateTaskFiveComponentManifest(manifest, {
    id: `ui-${name}`, sourcePath: `packages/ui/src/input/${name}.tsx`,
    assetIdentity: "registry-candidate", maturity: "registry-candidate", parts: parts[name],
  }, root, label, failures);
  const styleSourcePath = name === "form-item" ? "packages/ui/src/input/form-item.tsx" : "packages/ui/src/input/input.styles.ts";
  if (manifest?.styleSourcePath !== styleSourcePath || manifest?.verification?.humanGate !== humanGate
    || manifest?.verification?.humanGateScope !== (humanGate === "accepted" ? "input-search-input-form-item-runtime-visual-only" : undefined)) failures.push(`${label} must retain the Input recipe source and independent Human Gate`);
  if (name === "input" && !same(manifest?.sharedFieldRefinement, {
    implementation: "in-progress", automated: "passed", independentReview: "findings",
    design: "docs/plans/2026-09-08-input-select-field-recipes-design.md", evidence: "evidence/runtime/select/verification.md",
    humanGate, ...(humanGate === "accepted" ? { humanGateScope: "input-search-input-form-item-runtime-visual-only" } : {}),
  })) failures.push(`${label} shared field record must inherit the Input visual-only Gate without expanding acceptance`);
  return failures;
}

export function validateSelectManifest({ manifest, root = process.cwd() }) {
  const failures = [], label = "Select UI manifest";
  const status = loadYaml(root, "status/current-phase.yaml", "Select formal dependency authorization", failures);
  if (!hasSelectRefinementAuthorization(status) || !hasSelectFormalDependenciesAuthorization(status)) failures.push("Select formal dependencies require their separately recorded authorization");
  validateTaskFiveComponentManifest(manifest, { id: "ui-select", sourcePath: "packages/ui/src/select/select.tsx",
    assetIdentity: "registry-candidate", maturity: "registry-candidate", parts: ["root", "frame", "value", "clear-action", "arrow", "tag", "tag-remove", "popup", "search", "option"] }, root, label, failures);
  if (manifest?.styleSourcePath !== "packages/ui/src/select/select.styles.ts" || manifest?.sharedFrameSource !== "packages/ui/src/field/field.styles.ts"
    || !same(manifest?.variants, ["outlined", "filled", "underlined"]) || !same(manifest?.sizes, [24, 28, 32, 36])
    || !same(manifest?.menuLayer, { status: "formal-dependencies", implementation: "base-ui-select-combobox", headlessSelection: "@base-ui/react@1.8.0" })
    || manifest?.verification?.humanGate !== status?.componentRefinements?.select?.humanGate
    || manifest?.verification?.humanGateScope !== (status?.componentRefinements?.select?.humanGate === "accepted" ? "select-runtime-visual-only" : undefined) || manifest?.verification?.visualBaseline !== "accepted-preview-visual-only"
    || manifest?.verification?.contrastAcceptance !== "not-granted") failures.push("Select manifest must retain the exact shared appearance, independent implementation gate and formal dependency boundary");
  return failures;
}

export function validateSelectRegistry(item, { humanGate = "awaiting_human" } = {}) {
  const expected = {
  "schemaVersion": 1,
  "kind": "RainLocalSourceRegistry",
  "publication": "not-published",
  "scope": "current-workspace",
  humanGate, ...(humanGate === "accepted" ? { humanGateScope: "select-runtime-visual-only" } : {}),
  "visualBaseline": "accepted-preview-visual-only",
  "menuLayer": "formal-dependencies",
  "shared": {
    "files": [
      "packages/ui/src/field/field.styles.ts",
      "packages/ui/src/recipes/local-recipe.ts",
      "packages/ui/src/utils/rain-class-names.ts",
      "packages/ui/src/styles.css",
      "packages/ui/src/_internal/popup.tsx",
      "packages/ui/src/dropdown-menu/dropdown-menu.styles.ts"
    ],
    "peerDependencies": [
      "react",
      "@rain-next/foundations",
      "class-variance-authority",
      "tailwind-merge",
      "@base-ui/react"
    ],
    "componentDependencies": [
      "manifests/ui/input.yaml",
      "manifests/ui/form-item.yaml",
      "manifests/ui/button.yaml",
      "manifests/ui/dropdown-menu.yaml",
      "manifests/ui/tag.yaml"
    ],
    "styleDependencies": [
      "@rain-next/foundations/tokens.css",
      "@rain-next/foundations/typography.css",
      "@rain-next/foundations/focus.css",
      "@rain-next/foundations/tailwind-theme.css",
      "@rain-next/ui/styles.css"
    ],
    "registryDependencies": [
      "arrow-down",
      "arrow-up",
      "circle-close-filled",
      "check-bold",
      "search"
    ]
  },
  "items": [
    {
      "name": "select",
      "exportName": "Select",
      "importPath": "@rain-next/ui",
      "manifest": "manifests/ui/select.yaml",
      "files": [
        "packages/ui/src/select/select.tsx",
        "packages/ui/src/select/select.styles.ts",
        "packages/ui/src/select/select.utils.ts"
      ]
    }
  ]
};
  return same(item, expected) ? [] : ["Select Registry must remain the exact unpublished current-workspace candidate with its existing dependencies and independent gate"];
}

export function validateInputCssExceptions({ contract, source, root = process.cwd() }) {
  const failures = [], label = "Authorized Input native CSS";
  const phase = loadYaml(root, "status/current-phase.yaml", "Inside field label authorization", failures);
  const insideLabelsAuthorized = hasInsideFieldLabelsAuthorization(phase);
  const ids = ["input-native-control-reset", "field-focus-and-underline", "select-value-layout", "select-clear-visibility", "select-touch-targets", "select-formal-dependencies", "input-clear-visibility", "input-forced-colors", ...(insideLabelsAuthorized ? ["field-inside-label-width"] : [])];
  const entries = (contract?.cssExceptions?.entries ?? []).filter(({ id, component }) => ["ui-input", "ui-field", "ui-select"].includes(component) || ids.includes(id));
  if (!same(entries.map(({ id }) => id).sort(), [...ids].sort()) || ids.some((id) => !source.includes(`@rain-css-exception ${id}`))) failures.push(`${label} must retain the exact exception inventory and source markers`);
  const expected = [
    {"scope": [], "selector": ".rain-select__positioner", "declarations": "width: var(--anchor-width);"},
    {"scope": [], "selector": ".rain-select__popup", "declarations": hasSelectRegressionRepairAuthorization(phase) ? "--rain-popup-width: var(--anchor-width); width: 100%;" : "width: 100%;"},
    {"scope": [], "selector": ".rain-select [data-slot=\"tag\"] [data-rain-id=\"ui-tag\"]", "declarations": "margin-block: 0;"},
    {"scope": [], "selector": ".rain-select [data-slot=\"tag\"] .rain-tag__remove", "declarations": "margin: 0;"},
    {"scope": [], "selector": ".rain-select [data-slot=\"tag\"] .rain-tag__remove::after", "declarations": "inset: 0;"},
    {"scope": [], "selector": ".rain-select [data-slot=\"tag\"] .rain-tag__remove > span", "declarations": "width: var(--rain-icon-size-14); height: var(--rain-icon-size-14); color: inherit;"},
    {"scope": ["@media (pointer: coarse)"], "selector": ".rain-select [data-slot=\"tag\"] [data-rain-id=\"ui-tag\"]", "declarations": "height: auto; min-block-size: var(--rain-select-touch-target-size);"},
    {"scope": ["@media (pointer: coarse)"], "selector": ".rain-select__popup [data-slot=\"option\"]", "declarations": "min-block-size: var(--rain-select-touch-target-size);"},
    {"scope":[],"selector":".rain-input__control, .rain-select__control","declarations":"font: inherit; -webkit-text-fill-color: currentColor;"},
    {"scope":[],"selector":".rain-select [data-slot=\"frame\"][data-display=\"tags\"]","declarations":"height: auto; padding-block: var(--rain-space-4);"},
    {"scope":[],"selector":".rain-select [data-slot=\"clear-action\"]","declarations":"opacity: 0;"},
    {"scope":[],"selector":".rain-select:is(:hover, :focus-within, [data-state=\"open\"]) [data-slot=\"clear-action\"]","declarations":"opacity: 1;"},
    {"scope":["@media (hover: none), (pointer: coarse)"],"selector":".rain-select [data-slot=\"clear-action\"]","declarations":"opacity: 1;"},
    {"scope":["@media (pointer: coarse)"],"selector":".rain-select [data-slot=\"frame\"], .rain-select [data-slot=\"tag\"]","declarations":"height: auto; min-block-size: var(--rain-select-touch-target-size);"},
    {"scope":["@media (pointer: coarse)"],"selector":".rain-select__control, .rain-select__action","declarations":"min-inline-size: var(--rain-select-touch-target-size); min-block-size: var(--rain-select-touch-target-size);"},
    {"scope":["@media (pointer: coarse)"],"selector":".rain-select > [data-slot=\"frame\"] > [data-slot=\"clear-slot\"]","declarations":"inline-size: var(--rain-select-touch-target-size); block-size: var(--rain-select-touch-target-size);"},
    {"scope":["@media (pointer: coarse)"],"selector":".rain-select [data-slot=\"option\"]","declarations":"min-block-size: var(--rain-select-touch-target-size);"},
    {"scope":[],"selector":".rain-field-frame","declarations":"--rain-focus-control: var(--rain-field-focus-line); --rain-focus-control-halo: var(--rain-field-focus-halo); --rain-field-focus-line: var(--rain-category-border-brand-1); --rain-field-focus-halo: var(--rain-category-fill-brand-alpha-3); --rain-field-readonly-line: var(--rain-category-border-neutral-1);"},
    {"scope":[],"selector":".rain-field-frame[data-status=\"warning\"]","declarations":"--rain-field-focus-line: var(--rain-category-border-orange-1); --rain-field-focus-halo: var(--rain-category-fill-orange-alpha-1); --rain-field-readonly-line: var(--rain-category-border-orange-1);"},
    {"scope":[],"selector":".rain-field-frame[data-status=\"error\"]","declarations":"--rain-field-focus-line: var(--rain-category-border-red-1); --rain-field-focus-halo: var(--rain-category-fill-red-alpha-1); --rain-field-readonly-line: var(--rain-category-border-red-1);"},
    {"scope":[],"selector":".rain-field-frame[data-permission=\"editable\"]:not([data-appearance=\"underlined\"]):has(> [data-slot=\"control\"]:focus-visible)","declarations":"outline: var(--rain-line-thickness-1) solid var(--rain-field-focus-line); outline-offset: 0; border-color: transparent; box-shadow: 0 0 0 3px var(--rain-field-focus-halo);"},
    {"scope":[],"selector":".rain-field-frame[data-permission=\"readonly\"]:not([data-pointer-focus]):has(> [data-slot=\"control\"]:focus-visible)","declarations":"outline: var(--rain-line-thickness-1) solid var(--rain-field-readonly-line); outline-offset: 0; box-shadow: none;"},
    {"scope":[],"selector":".rain-field-frame[data-appearance=\"underlined\"]","declarations":"border-radius: 0; border-top-color: transparent; border-inline-color: transparent;"},
    {"scope":[],"selector":".rain-field-frame[data-appearance=\"underlined\"][data-permission=\"editable\"]:is(:focus-within, [data-open=\"true\"])","declarations":"border-bottom-color: var(--rain-field-focus-line); outline: none; box-shadow: none;"},
    {"scope":[],"selector":".rain-field-frame[data-appearance=\"underlined\"][data-permission=\"editable\"]:not([data-status=\"default\"]):is(:focus-within, [data-open=\"true\"]), .rain-field-frame[data-appearance=\"underlined\"][data-permission=\"readonly\"]:not([data-pointer-focus]):has(> [data-slot=\"control\"]:focus-visible)","declarations":"background-image: linear-gradient(var(--rain-field-focus-line), var(--rain-field-focus-line)); background-size: 100% var(--rain-line-thickness-1); background-position: bottom; background-repeat: no-repeat; outline: none; box-shadow: none;"},
    {"scope":[],"selector":".rain-field-frame[data-appearance=\"underlined\"][data-permission=\"readonly\"]:not([data-pointer-focus]):has(> [data-slot=\"control\"]:focus-visible)","declarations":"border-bottom-color: var(--rain-field-readonly-line); background-image: linear-gradient(var(--rain-field-readonly-line), var(--rain-field-readonly-line));"},
    {"scope":["@media (hover: hover) and (pointer: fine)"],"selector":".rain-input:not(:hover):not(:focus-within) .rain-input__clear","declarations":"visibility: hidden;"},
    {"scope":["@media (forced-colors: active)"],"selector":".rain-input","declarations":"background: Canvas; color: CanvasText; border-color: CanvasText;"},
    {"scope":["@media (forced-colors: active)"],"selector":".rain-input [data-slot=\"control\"]::placeholder","declarations":"color: GrayText;"},
    {"scope":["@media (forced-colors: active)"],"selector":".rain-input [data-slot=\"clear-action\"], .rain-input [data-slot=\"count\"]","declarations":"color: CanvasText;"},
    {"scope":["@media (forced-colors: active)"],"selector":".rain-input[data-state=\"disabled\"]","declarations":"border-color: GrayText; color: GrayText;"},
    {"scope":["@media (forced-colors: active)"],"selector":".rain-field-frame[data-appearance][data-permission]:not([data-pointer-focus]):has(> [data-slot=\"control\"]:focus-visible)","declarations":"outline: 2px solid CanvasText; outline-offset: 2px; box-shadow: none;"},
    {"scope":["@media (forced-colors: active)"],"selector":".rain-field-frame[data-appearance=\"underlined\"][data-permission]:not([data-pointer-focus]):is(:has(> [data-slot=\"control\"]:focus-visible), [data-open=\"true\"])","declarations":"border-top-width: 0; border-bottom: 2px solid Highlight; background-image: none; outline: none; box-shadow: none;"},
    {"scope":["@media (prefers-reduced-motion: reduce)"],"selector":".rain-input","declarations":"transition: none;"}
  ];
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/\.rain-(?:input|select|field-frame|field-label)(?:\b|__)/.test(`${header} ${body}`)) return [];
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    return [{ scope: ancestry, selector: header.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  const nativeRules = collect(source);
  const labelRules = nativeRules.filter(({ selector }) => /\.rain-field-label\b/.test(selector));
  const labelException = entries.filter(entry => entry.id === "field-inside-label-width");
  if (!same(labelException, insideLabelsAuthorized ? [{
    id: "field-inside-label-width", component: "ui-field", selector: ".rain-field-label",
    reason: "Keep optional fixed inside labels within half of the field and reserve remaining width for editable or selected content; no new global geometry Token.",
    tokens: ["--rain-space-4"], tests: ["packages/ui/src/input/input-field.test.tsx", "packages/ui/src/select/select.test.tsx", "tests/e2e/inside-labels.spec.ts"], status: "implemented-inside-field-labels-candidate",
  }] : []) || labelRules.length !== (insideLabelsAuthorized ? 1 : 0)
    || !same(labelRules, insideLabelsAuthorized ? [{ scope: [], selector: ".rain-field-label", declarations: "max-width: 50%;" }] : [])) failures.push(`${label} must retain the exact authorized inside label width rule`);
  if (!same(nativeRules.filter(rule => !labelRules.includes(rule)), expected)) failures.push(`${label} must preserve only the exact native control, shared Focus, clear visibility and system-color rules`);
  return failures;
}

function validateIconButtonCssExceptions(contract, root, authorized, failures) {
  const label = "Authorized IconButton native CSS";
  const source = readTaskFourFile(root, "packages/ui/src/styles.css", label, failures);
  if (!source) return;
  const exceptionIds = ["icon-button-loading-mask", "icon-button-forced-colors", "icon-button-reduced-motion", "icon-size-inheritance"];
  const registered = (contract?.cssExceptions?.entries ?? []).filter(({ id, component }) => component === "ui-icon-button" || exceptionIds.includes(id));
  if (!same(registered.map(({ id }) => id).sort(), authorized ? [...exceptionIds].sort() : [])) {
    failures.push(`${label} exception inventory must match the explicit refinement authorization`);
  }
  for (const id of authorized ? exceptionIds : []) {
    if (!source.includes(`@rain-css-exception ${id}`)) failures.push(`${label} is missing its ${id} source marker`);
  }
  const expectedSource = `
    .rain-icon { display: inline-block; flex: none; ${authorized ? "" : "width: 1em; height: 1em;"} color: inherit; vertical-align: middle; }
    ${authorized ? `
      @layer base { .rain-icon { width: 1em; height: 1em; } }
      .rain-icon-button [data-slot="loading-indicator"] {
        background-color: currentColor;
        -webkit-mask: url("./icons/assets/button-loading.png") center / var(--rain-icon-button-loading-mask-size) no-repeat;
        mask: url("./icons/assets/button-loading.png") center / var(--rain-icon-button-loading-mask-size) no-repeat;
        animation: rain-button-loading-spin var(--rain-icon-button-loading-duration) var(--rain-icon-button-loading-timing-function) infinite;
      }
      @media (forced-colors: active) { .rain-icon-button [data-slot="loading-indicator"] { forced-color-adjust: none; background-color: CanvasText; } }
      @media (prefers-reduced-motion: reduce) { .rain-icon-button [data-slot="loading-indicator"] { animation: none; } }
    ` : ""}
    .rain-icon[data-icon-color-mode="host"] {
      background-color: currentColor; -webkit-mask-position: center; mask-position: center;
      -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat; mask-mode: alpha;
    }
    .rain-icon > img { display: block; width: 100%; height: 100%; object-fit: contain; }
    @media (forced-colors: active) { .rain-icon[data-icon-color-mode="host"] { forced-color-adjust: none; } }
  `;
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/(?:\.rain-icon(?:-button)?)(?![\w-])/.test(`${header} ${body}`)) return [];
    if (header === '.rain-sidebar [data-slot="icon"] > .rain-icon' && hasG123PlaygroundAssetizationAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))) {
      if (stripCssComments(body).replace(/\s+/g, " ").trim() !== "width: var(--rain-space-18); height: var(--rain-space-18);") failures.push("Registered G3 Sidebar icon must retain its exact existing 18px size");
      return [];
    }
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    return [{ scope: ancestry, selector: header, declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  if (!same(collect(source), collect(expectedSource))) {
    failures.push(`${label} must preserve existing Icon defaults and only the exact size, Loading, Forced Colors and reduced-motion exceptions`);
  }
}

function validateQuestionNumberCssException(contract, root, authorized, sizesAuthorized, failures) {
  const label = "Authorized QuestionNumber native CSS";
  const source = readTaskFourFile(root, "packages/ui/src/styles.css", label, failures);
  if (!source) return;
  const entries = (contract?.cssExceptions?.entries ?? []).filter(({ id, component }) => component === "ui-question-number" || id === "question-number-forced-colors");
  if (!same(entries.map(({ id }) => id), authorized ? [...(sizesAuthorized ? ["question-number-feedback-space"] : []), "question-number-forced-colors"] : [])) {
    failures.push(`${label} must register only its authorized forced-colors exception`);
  }
  const expected = authorized ? `
    ${sizesAuthorized ? `.rain-question-number:is([data-size="36"], [data-size="40"]):has(> [data-slot="feedback"]) { padding-bottom: calc(var(--rain-space-14) / 2); }` : ""}
    @media (forced-colors: active) {
      .rain-question-number [data-slot="control"], .rain-question-number [data-slot="feedback"] {
        forced-color-adjust: none; background-color: Canvas; color: CanvasText; border-color: ButtonText;
      }
      .rain-question-number[data-current="true"] [data-slot="control"] { background-color: Highlight; color: HighlightText; }
      .rain-question-number:disabled [data-slot="control"] { color: GrayText; }
    }
  ` : "";
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/\.rain-question-number(?![\w-])/.test(`${header} ${body}`)) return [];
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    return [{ scope: ancestry, selector: header.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  if (!same(collect(source), collect(expected)) || (authorized && !source.includes("@rain-css-exception question-number-forced-colors"))) {
    failures.push(`${label} must preserve only the exact registered system-color rules`);
  }
}

function validateOptionButtonCssExceptions(contract, root, authorized, contentAuthorized, failures) {
  const label = "Authorized OptionButton native CSS";
  const source = readTaskFourFile(root, "packages/ui/src/styles.css", label, failures);
  if (!source) return;
  const ids = ["option-button-focus", "option-button-forced-colors", ...(contentAuthorized ? ["option-button-card-layout", "option-button-review-forced-colors"] : [])];
  const entries = (contract?.cssExceptions?.entries ?? []).filter(({ id, component }) => component === "ui-option-button" || ids.includes(id));
  if (!same(entries.map(({ id }) => id), authorized ? ids : [])) failures.push(`${label} must register only its exact focus and forced-colors exceptions`);
  const expected = authorized ? `
    .rain-option-button:has(input:focus-visible) {
      outline: var(--rain-focus-width) solid var(--rain-focus-item);
      outline-offset: var(--rain-focus-offset); box-shadow: 0 0 0 3px var(--rain-focus-control-halo);
    }
    @media (forced-colors: active) {
      .rain-option-button [data-slot="control"] { forced-color-adjust: none; background-color: Canvas; color: CanvasText; outline: 1px solid ButtonText; }
      .rain-option-button[data-checked="true"] [data-slot="control"] { background-color: Highlight; color: HighlightText; outline: none; }
      .rain-option-button:has(input:disabled) [data-slot="control"] { color: GrayText; }
      .rain-option-button:has(input:focus-visible) { outline: 2px solid CanvasText; outline-offset: 2px; box-shadow: none; }
    }
    ${contentAuthorized ? `.rain-option-group[data-layout="cards"] > [data-slot="items"] {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, calc(var(--rain-space-32) * 8)), 1fr));
    }
    @media (forced-colors: active) {
      .rain-option-button [data-slot="feedback"] {
        position: static; width: auto; height: auto; margin: 0; overflow: visible; clip: auto; clip-path: none; white-space: normal; color: CanvasText;
      }
      .rain-option-button[data-feedback="correct"], .rain-option-button[data-feedback="wrong"] { gap: var(--rain-space-8); }
    }` : ""}
  ` : "";
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/\.rain-option-(?:button|group)(?![\w-])/.test(`${header} ${body}`)) return [];
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    return [{ scope: ancestry, selector: header.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  if (!same(collect(source), collect(expected)) || (authorized && ids.some((id) => !source.includes(`@rain-css-exception ${id}`)))) failures.push(`${label} must preserve only the exact shared-focus and system-color rules`);
}

export function validateCheckboxCssExceptions({ contract, source, authorized = true, interactionAuthorized = true, menuVisualReuse = true, root = process.cwd() }) {
  const failures = [], label = "Authorized Checkbox CSS";
  const ids = [...(interactionAuthorized ? ["checkbox-interaction-highlight"] : []), "checkbox-focus", "checkbox-forced-colors"];
  const entries = (contract?.cssExceptions?.entries ?? []).filter((entry) => entry.component === "ui-checkbox" || ids.includes(entry.id));
  if (!same(entries.map((entry) => entry.id), authorized ? ids : [])) failures.push(`${label} requires its exact native exceptions`);
  const paints = new Map();
  for (const entry of getCheckboxColorConsumers({ menuVisualReuse }).filter((entry) => entry.filePath === "packages/ui/src/styles.css" && (interactionAuthorized || !entry.media))) {
    const key = JSON.stringify([entry.media, entry.selector]);
    if (!paints.has(key)) paints.set(key, { ...entry, declarations: [] });
    paints.get(key).declarations.push(`${entry.property}: ${entry.value};`);
  }
  paints.get(JSON.stringify([undefined, '.rain-checkbox [data-slot="control"]'])).declarations.push("background-clip: padding-box;");
  if (interactionAuthorized) paints.get(JSON.stringify([undefined, '.rain-checkbox [data-slot="control"]'])).declarations.push("position: relative;");
  for (const entry of paints.values()) if (entry.media && entry.selector.startsWith('.rain-checkbox[data-state="unchecked"]')) entry.declarations.push("background-color: transparent;");
  const expected = authorized ? `${[...paints.values()].map(({ media, selector, declarations }) => {
    const rule = `${selector} { ${declarations.join(" ")} }`;
    return media ? `${media} { ${rule} }` : rule;
  }).join("\n")}
    ${interactionAuthorized ? `.rain-checkbox [data-slot="canvas"] { position: relative; }
      .rain-checkbox [data-slot="canvas"]::before { content: ""; position: absolute; inset: calc(var(--rain-space-6) / 4); border-radius: var(--rain-radius-4); pointer-events: none; }` : ''}
    .rain-checkbox:has(input:focus-visible) [data-slot="control"] {
      outline: var(--rain-focus-width) solid var(--rain-focus-control); outline-offset: var(--rain-focus-offset);
      box-shadow: 0 0 0 3px var(--rain-focus-control-halo);
    }
    @media (forced-colors: active) {
      .rain-checkbox [data-slot="control"] { forced-color-adjust: none; background-color: Canvas; border-color: ButtonText; color: ButtonText; }
      .rain-checkbox[data-state="checked"] [data-slot="control"], .rain-checkbox[data-state="mixed"] [data-slot="control"] { background-color: Highlight; border-color: Highlight; color: HighlightText; }
      ${menuVisualReuse ? shareMenuSelectionSelectors('.rain-checkbox:has(input:disabled) [data-slot="control"]') : '.rain-checkbox:has(input:disabled) [data-slot="control"]'} { background-color: Canvas; border-color: GrayText; color: GrayText; }
      .rain-checkbox:has(input:focus-visible) [data-slot="control"] { outline: 2px solid CanvasText; outline-offset: 2px; box-shadow: none; }
    }` : "";
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/\.rain-checkbox(?:-group)?(?![\w-])/.test(`${header} ${body}`)) return [];
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    return [{ scope: ancestry, selector: header.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  if (!same(collect(source), collect(expected)) || (authorized && ids.some((id) => !source.includes(`@rain-css-exception ${id}`)))) {
    failures.push(`${label} must keep its exact registered paints, shared Focus and system-color rules`);
  }
  return failures;
}

export function validateRadioCssExceptions({ contract, source, authorized = true, menuVisualReuse = true, root = process.cwd() }) {
  const failures = [], label = "Authorized Radio CSS";
  const ids = ["radio-interaction-highlight", "radio-focus", "radio-forced-colors"];
  const entries = (contract?.cssExceptions?.entries ?? []).filter((entry) => entry.component === "ui-radio" || ids.includes(entry.id));
  if (!same(entries.map((entry) => entry.id), authorized ? ids : [])) failures.push(`${label} requires its exact native exceptions`);
  const paints = new Map();
  for (const entry of getRadioColorConsumers({ menuVisualReuse }).filter((entry) => entry.filePath === "packages/ui/src/styles.css")) {
    const key = JSON.stringify([entry.media, entry.selector]);
    if (!paints.has(key)) paints.set(key, { ...entry, declarations: [] });
    paints.get(key).declarations.push(`${entry.property}: ${entry.value};`);
  }
  paints.get(JSON.stringify([undefined, '.rain-radio [data-slot="control"]'])).declarations.push("background-clip: padding-box;");
  paints.get(JSON.stringify([undefined, '.rain-radio [data-slot="control"]'])).declarations.push("position: relative;");
  for (const entry of paints.values()) if (entry.media && entry.selector.startsWith('.rain-radio[data-state="unchecked"]')) entry.declarations.push("background-color: transparent;");
  const expected = authorized ? `${[...paints.values()].map(({ media, selector, declarations }) => {
    const rule = `${selector} { ${declarations.join(" ")} }`;
    return media ? `${media} { ${rule} }` : rule;
  }).join("\n")}
    .rain-radio [data-slot="canvas"] { position: relative; }
      .rain-radio [data-slot="canvas"]::before { content: ""; position: absolute; inset: calc(var(--rain-space-2) / 4); border-radius: var(--rain-radius-full); pointer-events: none; }
    .rain-radio:has(input:focus-visible) [data-slot="control"] {
      outline: var(--rain-focus-width) solid var(--rain-focus-control); outline-offset: var(--rain-focus-offset);
      box-shadow: 0 0 0 3px var(--rain-focus-control-halo);
    }
    @media (forced-colors: active) {
      .rain-radio [data-slot="control"] { forced-color-adjust: none; background-color: Canvas; border-color: ButtonText; color: ButtonText; }
      .rain-radio[data-state="checked"] [data-slot="control"] { background-color: Highlight; border-color: Highlight; color: HighlightText; }
      ${menuVisualReuse ? shareMenuSelectionSelectors('.rain-radio:has(input:disabled) [data-slot="control"]') : '.rain-radio:has(input:disabled) [data-slot="control"]'} { background-color: Canvas; border-color: GrayText; color: GrayText; }
      .rain-radio:has(input:focus-visible) [data-slot="control"] { outline: 2px solid CanvasText; outline-offset: 2px; box-shadow: none; }
    }
    .rain-radio [data-slot="mark"] { background-color: currentColor; }` : "";
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/\.rain-radio(?:-group)?(?![\w-])/.test(`${header} ${body}`)) return [];
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    return [{ scope: ancestry, selector: header.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  if (!same(collect(source), collect(expected)) || (authorized && ids.some((id) => !source.includes(`@rain-css-exception ${id}`)))) {
    failures.push(`${label} must keep its exact registered paints, shared Focus and system-color rules`);
  }
  return failures;
}

export function validateSelectionCardCssExceptions({ contract, source, authorized = true, root = process.cwd() }) {
  const failures = [], label = "Selection card CSS";
  const ids = ["selection-card-layout", "selection-card-forced-colors"];
  const records = (contract?.cssExceptions?.entries ?? []).filter((entry) => entry.component === "ui-selection-cards");
  if (authorized ? !same(records.map((entry) => entry.id), ids) : records.length > 0) failures.push(`${label} requires its exact SC-02 exception registration`);
  const expected = authorized ? `/* @rain-css-exception selection-card-layout: V0.3 content rails and inside stroke, using established Tokens. */
.rain-selection-card {
  box-sizing: border-box;
  min-width: var(--rain-space-0);
  max-width: 100%;
  border: var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3);
  border-radius: var(--rain-radius-8);
  background-color: var(--rain-category-background-neutral-1);
  color: var(--rain-category-text-neutral-3);
  font-family: var(--rain-font-ui);
  overflow-wrap: anywhere;
}
.rain-selection-card:has(> .rain-selection-card__selection > input:checked),
.rain-selection-card:has(> .rain-selection-card__selection > input[type="checkbox"]:indeterminate) {
  border-color: var(--rain-category-border-brand-1);
  background-image: linear-gradient(var(--rain-category-fill-brand-alpha-4), var(--rain-category-fill-brand-alpha-4));
}
.rain-selection-card__selection {
  padding: calc(var(--rain-space-16) - var(--rain-line-thickness-1));
  box-sizing: border-box;
  border-radius: var(--rain-radius-8);
}
.rain-selection-card:has(> [data-slot="actions"]) > .rain-selection-card__selection {
  padding-bottom: var(--rain-space-0);
}
.rain-selection-card__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--rain-space-12);
  margin-top: var(--rain-space-12);
  padding: var(--rain-space-0) calc(var(--rain-space-16) - var(--rain-line-thickness-1)) calc(var(--rain-space-16) - var(--rain-line-thickness-1)) calc(var(--rain-space-16) + var(--rain-space-24) + var(--rain-space-8) - var(--rain-line-thickness-1));
}
.rain-selection-card__identity {
  display: inline-flex;
  flex: none;
  width: var(--rain-space-40);
  height: var(--rain-space-40);
  align-items: center;
  justify-content: center;
  border-radius: var(--rain-radius-8);
  background-color: var(--rain-category-fill-brand-alpha-4);
  color: var(--rain-category-text-brand-1);
  font-size: var(--rain-font-size-20);
  line-height: var(--rain-line-height-24);
  font-weight: var(--rain-font-weight-semibold);
}
.rain-selection-card__accent {
  color: var(--rain-category-text-brand-1);
}
.rain-selection-card__recommendation {
  display: inline-flex;
  min-height: var(--rain-line-height-22);
  border: none;
  padding: var(--rain-space-0) var(--rain-space-6);
  border-radius: var(--rain-radius-4);
  font-size: var(--rain-font-size-11);
  line-height: var(--rain-line-height-22);
  font-weight: var(--rain-font-weight-semibold);
}
.rain-selection-recipe-preview .rain-selection-card__selection {
  padding-bottom: calc(var(--rain-space-18) - var(--rain-line-thickness-1));
}
.rain-selection-recipe-preview .rain-selection-card__body,
.rain-selection-recipe-preview [data-slot="supplementary"] {
  gap: var(--rain-space-12);
}
.rain-selection-recipe-preview [data-slot="summary"],
.rain-selection-recipe-comparison [data-slot="summary"] {
  gap: var(--rain-space-6);
}
.rain-selection-card__artwork {
  display: block;
  width: 100%;
  aspect-ratio: 7 / 3;
  object-fit: contain;
}
.rain-selection-recipe-comparison .rain-selection-card__body {
  gap: var(--rain-space-16);
}
.rain-selection-recipe-with-preview [data-slot="summary"] > span > [data-slot="label"] {
  flex: 0 1 auto;
}
.rain-selection-recipe-comparison [data-slot="description"] {
  min-height: calc(var(--rain-line-height-22) * 2);
}
.rain-selection-card__detail {
  display: grid;
  grid-template-columns: minmax(var(--rain-space-0), calc(var(--rain-space-24) + var(--rain-space-2))) minmax(var(--rain-space-0), 1fr);
  column-gap: var(--rain-space-10);
}
.rain-selection-card__detail [data-slot="detail-value"] {
  min-width: var(--rain-space-0);
  color: var(--rain-category-text-neutral-1);
}
/* @rain-css-exception selection-card-forced-colors: preserve selection and independent actions in system colors. */
@media (forced-colors: active) {
  .rain-selection-card {
    background-color: Canvas;
    border-color: ButtonText;
    color: CanvasText;
  }
  .rain-selection-card:has(> .rain-selection-card__selection > input:checked),
  .rain-selection-card:has(> .rain-selection-card__selection > input[type="checkbox"]:indeterminate) {
    background-color: Canvas;
    background-image: none;
    border-color: Highlight;
  }
  .rain-selection-card:has(> .rain-selection-card__selection > input:disabled) { border-color: GrayText; }
  .rain-selection-card__identity,
  .rain-selection-card__recommendation {
    background-color: ButtonFace;
    color: ButtonText;
  }
  .rain-selection-card__accent,
  .rain-selection-card__detail [data-slot="detail-value"] { color: CanvasText; }
}` : "";
  const collect = (css, ancestry = []) => parseTopLevelCssBlocks(css, label, failures, { root }).flatMap(({ header, body }) => {
    if (!/\.rain-selection-(?:card|recipe)[\w-]*/.test(`${header} ${body}`)) return [];
    if (header.startsWith("@")) return collect(body, [...ancestry, header]);
    return [{ scope: ancestry, selector: header.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  if (!same(collect(source), collect(expected)) || (authorized && ids.some((id) => !source.includes(`@rain-css-exception ${id}`)))) failures.push(`${label} must preserve its V0.3 rails, themed paints and system-color rules`);
  return failures;
}


export const g4CssException = {
  id: "g4-components-owned-parts", component: "g4-components",
  selector: ".rain-item owned Parts; .rain-progress owned Parts; .g4-* documentation layout",
  reason: "Owned Parts keep image fitting, focus, state feedback, density, indeterminate shape, reduced motion and forced colors; documentation uses a scoped responsive layout.",
  tokens: ["--rain-space-4", "--rain-space-6", "--rain-space-8", "--rain-space-20", "--rain-focus-item", "--rain-motion-feedback-duration"],
  tests: ["packages/ui/src/item/item.test.tsx", "packages/ui/src/progress/progress.test.tsx", "apps/playground/src/docs/components/g4-component-pages.test.tsx", "scripts/g4-components-governance.test.ts"],
  status: "implemented-g4-candidates-awaiting-human",
};

export function validateG4TailwindContract({ contract, status, root = process.cwd() }) {
  if (!hasG4ComponentsAuthorization(status)) return ["G4 protected sources require their exact candidate authorization"];
  const protectedPaths = [...g4ComponentFiles.ui, ...g4ComponentFiles.application].filter(file => /\.(?:tsx|css)$/.test(file) && !file.endsWith(".test.tsx"));
  const failures = protectedPaths.filter(file => !contract.protectedPaths?.optional?.includes(file)).map(file => `G4 missing protected source: ${file}`);
  if (JSON.stringify((contract.cssExceptions?.entries ?? []).filter(entry => entry.id === g4CssException.id || entry.component === g4CssException.component)) !== JSON.stringify([g4CssException])) failures.push("G4 CSS exception must retain its exact owned Parts, Tokens and checks");
  if (hasG4SizingReviewAuthorization(status)) for (const file of g4SizingReviewSourcePaths.filter(path => path.startsWith("apps/") && path.endsWith(".css"))) {
    failures.push(...validateProtectedTailwindSource({ filePath: file, source: readFileSync(join(root, file), "utf8") }));
  }
  failures.push(...validateG4SourceDirectives(readFileSync(join(root, "apps/playground/src/styles.css"), "utf8"), status, root));
  return failures;
}

export function validateTailwindB2SystemContract({ root = process.cwd() } = {}) {
  return withSourceBindingTraversal(root, () => validateTailwindB2SystemContractInTraversal(root));
}

function validateTailwindB2SystemContractInTraversal(root) {
  const failures = [];
  const tokenFoundationsAuthorized = hasTokenFoundationsAuthorization(root, failures);
  const phaseStatus = tokenFoundationsAuthorized ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : null;
  let g4Status = phaseStatus, g4Authorized = false;
  if (!g4Status) {
    try { g4Status = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")); } catch { /* The phase parser already reports this failure. */ }
  }
  if (hasG4ComponentsAuthorization(g4Status)) {
    try { getG4SourceBindings(root, g4Status); g4Authorized = true; }
    catch (error) { failures.push(`G4 recorded sources cannot be checked: ${error.message}`); }
  }
  const radioAuthorized = hasRadioSc01Authorization(phaseStatus);
  let chartSources;
  try { chartSources = getRecordedChartSourceBindings(root, phaseStatus)?.sourceFiles; } catch (error) { failures.push(`Chart sources cannot be checked: ${error.message}`); }
  const dropdownFamilyAuthorized = hasDropdownFamilyAuthorization(phaseStatus);
  const selectionPatternsAuthorized = hasSelectionPatternsSc03Authorization(phaseStatus);
  const selectionCardsAuthorized = hasSelectionCardsSc02Authorization(phaseStatus);
  const checkboxAuthorized = hasCheckboxSc01Authorization(phaseStatus);
  const inputAuthorized = hasInputRefinementAuthorization(phaseStatus);
  const selectAuthorized = hasSelectRefinementAuthorization(phaseStatus);
  const tagAuthorized = hasTagRefinementAuthorization(phaseStatus);
  const tagBatchTwoAuthorized = hasTagBatchTwoRefinementAuthorization(phaseStatus);
  const tagBatchThreeAuthorized = hasTagBatchThreeAuthorization(phaseStatus);
  const activeTagManifests = { ...tagManifests, ...(tagBatchTwoAuthorized ? tagDomainManifests : {}) };
  const tagHumanGate = (tagBatchTwoAuthorized ? phaseStatus.componentRefinements.tagBatchTwo : phaseStatus?.componentRefinements?.tag)?.humanGate;
  const iconButtonAuthorized = hasIconButtonRefinementAuthorization(phaseStatus);
  const iconButtonHumanGate = phaseStatus?.componentRefinements?.iconButton?.humanGate;
  const questionNumberAuthorized = hasQuestionNumberRefinementAuthorization(phaseStatus);
  const questionNumberHumanGate = phaseStatus?.componentRefinements?.questionNumber?.humanGate;
  const sizesAuthorized = hasQuestionOptionSizeRefinementAuthorization(phaseStatus);
  const sizeRefinement = phaseStatus?.componentRefinements?.questionOptionSizes;
  const sizeReview = sizesAuthorized ? {
    scope: sizeRefinement.scope, implementation: sizeRefinement.implementation,
    automatedVerification: sizeRefinement.automatedVerification, independentReview: sizeRefinement.independentReview,
    humanGate: sizeRefinement.humanGate, evidence: "docs/plans/2026-09-08-question-option-size-implementation.md",
  } : undefined;
  const optionButtonAuthorized = hasOptionButtonRefinementAuthorization(phaseStatus);
  const optionButtonHumanGate = phaseStatus?.componentRefinements?.optionButton?.humanGate;
  const optionButtonContentAuthorized = hasOptionButtonContentRefinementAuthorization(phaseStatus);
  const optionButtonContent = phaseStatus?.componentRefinements?.optionButton?.contentRefinement;
  const optionButtonContentReview = optionButtonContentAuthorized ? {
    scope: optionButtonContent.scope, implementation: optionButtonContent.implementation,
    automatedVerification: optionButtonContent.automatedVerification, independentReview: optionButtonContent.independentReview,
    humanGate: optionButtonContent.humanGate, evidence: "evidence/runtime/option-button-content/verification.md",
    ...(optionButtonContent.contrastAcceptance ? { contrastReview: {
      status: "user-accepted-exceptions", findingCount: optionButtonContent.contrastAcceptance.findingCount,
      evidence: "evidence/runtime/option-button-content/verification.md",
    } } : {}),
  } : undefined;
  const questionNumberContrastReview = questionNumberAuthorized && phaseStatus.componentRefinements.questionNumber.contrastAcceptance ? {
    status: "user-accepted-exceptions", findingCount: phaseStatus.componentRefinements.questionNumber.contrastAcceptance.findingCount,
    evidence: "evidence/runtime/question-number/verification.md",
  } : undefined;
  const optionSourcePath = join(root, "packages/ui/src/option-button/option-button.tsx");
  if (!optionButtonContentAuthorized && existsSync(optionSourcePath)
    && /readOnly\??\s*:|feedbackVisibility\??\s*:|symbol\??\s*:|media\??\s*:|data-slot=["'](?:feedback|media)["']/.test(readFileSync(optionSourcePath, "utf8"))) {
    failures.push("OptionButton result/content sources require their separate exact authorization");
  }


  for (const directory of ["apps/playground/src", "packages/ui/src", ...(hasLayoutsV1Authorization(phaseStatus) ? ["packages/layouts/src"] : [])]) {
    for (const filePath of collectTaskFiveFiles(root, directory, failures)) {
      if (!/\.[cm]?[jt]sx?$/.test(filePath) || /\.test\.[^.]+$/.test(filePath)
        || filePath.startsWith("packages/ui/src/icons/")
        || (filePath.startsWith("apps/playground/src/docs/") && !filePath.startsWith("apps/playground/src/docs/token-foundations/"))) continue;
      if (tokenFoundationsAuthorized && filePath.startsWith("apps/playground/src/docs/token-foundations/")) continue;
      const source = readFileSync(join(root, filePath), "utf8");
      for (const [, utility] of source.matchAll(/(?<![a-z0-9-])(?:[a-z-]+:)*(border-dashed|flex-wrap|overflow-x-auto)(?![a-z0-9-])/g)) {
        if (hasAlertAuthorization(phaseStatus) && filePath === "packages/ui/src/alert/alert.tsx" && utility === "flex-wrap") continue;
        if (hasTableRn08Authorization(phaseStatus) && ["packages/ui/src/pagination/pagination.tsx", "packages/ui/src/empty/empty.tsx"].includes(filePath) && utility === "flex-wrap") continue;
        if (hasLayoutsV1Authorization(phaseStatus) && filePath === "packages/layouts/src/layout.tsx" && utility === "flex-wrap") continue;
        if (hasDialogV2Authorization(phaseStatus) && filePath === "packages/ui/src/dialog/dialog.tsx" && utility === "flex-wrap") continue;
        if (hasCardV2Authorization(phaseStatus) && filePath === "packages/ui/src/card/card.styles.ts" && utility === "flex-wrap") continue;
        if (g4Authorized && ["packages/ui/src/item/item.tsx", "packages/ui/src/progress/progress.tsx"].includes(filePath) && utility === "flex-wrap") continue;
        if (selectionCardsAuthorized && filePath === "packages/ui/src/recipes/selection-card-recipes.tsx" && utility === "flex-wrap") continue;
        if (optionButtonAuthorized && filePath === "packages/ui/src/option-button/option-button.tsx" && utility === "flex-wrap") continue;
        if (hasCheckboxSc01Authorization(phaseStatus) && filePath === "packages/ui/src/checkbox/checkbox.tsx" && utility === "flex-wrap") continue;
        if (hasRadioSc01Authorization(phaseStatus) && filePath === "packages/ui/src/radio/radio.tsx" && utility === "flex-wrap") continue;
        if (tagAuthorized && filePath === "packages/ui/src/tag/checkable-tag.tsx" && utility === "flex-wrap") continue;
        if (selectAuthorized && filePath === "packages/ui/src/select/select.tsx" && utility === "flex-wrap") continue;
        if (chartSources?.[filePath] && filePath === "packages/ui/src/charts/vendor/charts/profit-loss-legend.tsx" && utility === "flex-wrap") continue;
        failures.push(`Token Foundations V1 structural utility ${utility} is outside its authorized demo scope: ${filePath}`);
      }
    }
  }
  const contract = loadYaml(root, tailwindB2ContractPath, "Tailwind B2 contract", failures);
  const button = loadYaml(root, tailwindB2ButtonManifestPath, "Button UI manifest", failures);
  const input = loadYaml(root, tailwindB2InputManifestPath, "Input UI manifest", failures);

  if (contract) {
    if (contract.schemaVersion !== "1.0" || contract.kind !== "TailwindB2Contract") {
      failures.push("Tailwind B2 contract must use schemaVersion 1.0 and kind TailwindB2Contract");
    }
    if (JSON.stringify(contract.pilot?.components) !== JSON.stringify(["ui-button", "ui-input"])) {
      failures.push("Tailwind B2 contract pilot.components must be exactly ui-button and ui-input");
    }
    const requiredRecipeFields = [
      "id",
      "scope",
      "origin",
      "classes",
      "modifiedParts",
      "candidateTokens",
      "promotionStatus",
    ];
    if (JSON.stringify(contract.localRecipe?.requiredFields) !== JSON.stringify(requiredRecipeFields)) {
      failures.push("Tailwind B2 contract Local Recipe required fields are invalid");
    }
    for (const field of [
      "defaultVisualUtilities",
      "arbitraryVisualValues",
      "importantModifiers",
      "dynamicClassConstruction",
      "privateReferenceTokens",
      "rawColors",
    ]) {
      if (contract.forbidden?.[field] !== true) {
        failures.push(`Tailwind B2 contract must forbid ${field}`);
      }
    }
    for (const [index, entry] of (contract.cssExceptions?.entries ?? []).entries()) {
      for (const field of contract.cssExceptions?.requiredFields ?? []) {
        const value = entry?.[field];
        if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
          failures.push(`Tailwind B2 CSS exception ${index} is missing ${field}`);
        }
      }
      for (const token of entry?.tokens ?? []) {
        if (typeof token !== "string" || !token.startsWith("--rain-")) {
          failures.push(`Tailwind B2 CSS exception ${entry?.id ?? index} has an invalid Token: ${String(token)}`);
        }
      }
      for (const testPath of entry?.tests ?? []) {
        if (!existsSync(join(root, testPath))) {
          failures.push(`Tailwind B2 CSS exception ${entry?.id ?? index} test is missing: ${testPath}`);
        }
      }
    }
    if (g4Authorized) failures.push(...validateG4TailwindContract({ contract, status: g4Status, root }));

    const tagProtectedPaths = ["packages/ui/src/tag/tag.tsx", "packages/ui/src/tag/tag.styles.ts", "packages/ui/src/tag/link-tag.tsx", "packages/ui/src/tag/checkable-tag.tsx", "apps/playground/src/docs/components/tag-page.tsx", ...(tagBatchTwoAuthorized ? ["packages/ui/src/tag/domain-tags.tsx", "packages/ui/src/tag/domain-tags.styles.ts"] : [])];
    const dropdownProtected = [...dropdownFamilyFiles.ui, ...dropdownFamilyFiles.application].filter(path => !path.endsWith(".test.tsx"));
    if (dropdownFamilyAuthorized && !dropdownProtected.every(path => contract.protectedPaths?.optional?.includes(path))) failures.push("Dropdown family must protect its exact public and example sources");
    if (!dropdownFamilyAuthorized && dropdownProtected.some(path => existsSync(join(root, path)))) failures.push("Dropdown family requires its own exact implementation authorization");
    const dropdownExceptions = (contract.cssExceptions?.entries ?? []).filter(entry => entry.component === "ui-dropdown-family" || entry.id === "dropdown-family-parts");
    if (!same(dropdownExceptions, dropdownFamilyAuthorized ? [{
      id: "dropdown-family-parts", component: "ui-dropdown-family", selector: ".rain-popup, .rain-menu-item, .rain-menu-separator, .rain-popup-positioner",
      reason: "Base UI viewport constraints, linked item parts, two-line text and native system colors; no additional overlay controller.",
      tokens: ["--rain-space-8", "--rain-icon-size-16", "--rain-icon-size-10", "--rain-category-text-brand-1", "--rain-category-text-brand-2", "--rain-category-icon-brand-1"],
      tests: ["scripts/dropdown-family.test.ts", "tests/e2e/dropdown.spec.ts"], status: "implemented-dropdown-family-candidate",
    }] : [])) failures.push("Dropdown family CSS exception must retain its exact scope, Token roles and checks");
    const thirdTagProtected = [...tagBatchThreeFiles.ui, ...tagBatchThreeFiles.application].filter((path) => !path.endsWith(".test.tsx"));
    if (tagBatchThreeAuthorized && !thirdTagProtected.every((path) => contract.protectedPaths?.optional?.includes(path))) failures.push("Tag batch three must retain its exact protected source paths");
    if (tagAuthorized && !tagProtectedPaths.every((path) => contract.protectedPaths?.optional?.includes(path))) failures.push("Tag sources must retain their exact protected consumer paths");
    if (!tagAuthorized && tagProtectedPaths.slice(1).some((path) => existsSync(join(root, path)))) failures.push("Tag batch one requires its exact implementation authorization");
    const selectProtectedPaths = ["packages/ui/src/field/field.styles.ts", "packages/ui/src/select/select.tsx", "packages/ui/src/select/select.styles.ts", "apps/playground/src/docs/components/select-page.tsx"];
    if (selectAuthorized && !selectProtectedPaths.every((path) => contract.protectedPaths?.optional?.includes(path))) failures.push("Select sources must retain their exact protected consumer paths");
    if (!selectAuthorized && selectProtectedPaths.some((path) => existsSync(join(root, path)))) failures.push("Select requires its exact implementation authorization");
    const inputProtectedPaths = ["packages/ui/src/input/form-item.tsx", "packages/ui/src/input/search-input.tsx", "apps/playground/src/docs/components/input-page.tsx"];
    if (inputAuthorized && !["packages/ui/src/input/input.styles.ts", ...inputProtectedPaths].every((path) => contract.protectedPaths?.optional?.includes(path))) {
      failures.push("Input family sources must retain their exact protected consumer paths");
    }
    if (!inputAuthorized && inputProtectedPaths.some((path) => existsSync(join(root, path)))) {
      failures.push("Input family sources require their exact implementation authorization");
    }
    const protectedPaths = [
      ...(contract.protectedPaths?.required ?? []),
      ...(contract.protectedPaths?.optional ?? []).filter((filePath) => existsSync(join(root, filePath))),
    ];
    for (const filePath of protectedPaths) {
      try {
        const stat = lstatSync(join(root, filePath));
        if (!stat.isFile() || stat.isSymbolicLink()) {
          failures.push(`Task 5 protected path must be a regular file: ${filePath}`);
          continue;
        }
        failures.push(...validateProtectedTailwindSource({
          filePath,
          source: readFileSync(join(root, filePath), "utf8"),
        }));
      } catch (error) {
        failures.push(`Task 5 protected path cannot be read: ${filePath}: ${error.message}`);
      }
    }
    for (const prefix of contract.protectedPaths?.prefixes ?? []) {
      for (const filePath of collectTaskFiveFiles(root, prefix.replace(/\/$/, ""), failures)) {
        if (/\.(?:[cm]?[jt]sx?)$/.test(filePath) && !/\.test\.[^.]+$/.test(filePath)) {
          failures.push(...validateProtectedTailwindSource({
            filePath,
            source: readFileSync(join(root, filePath), "utf8"),
          }));
        }
      }
    }
  }

  validateTaskFiveComponentManifest(button, {
    id: "ui-button",
    sourcePath: "packages/ui/src/button/button.tsx",
    parts: ["root", "leading-icon", "label", "trailing-icon", "loading-indicator"],
  }, root, "Button UI manifest", failures);
  if (inputAuthorized) {
    for (const name of ["input", "form-item", "search-input"]) failures.push(...validateInputFamilyManifest({
      manifest: name === "input" ? input : loadYaml(root, `manifests/ui/${name}.yaml`, `${name} UI manifest`, failures), name, root,
      humanGate: phaseStatus.componentRefinements.input.humanGate,
    }));
  } else validateTaskFiveComponentManifest(input, {
    id: "ui-input", sourcePath: "packages/ui/src/input/input.tsx",
    parts: ["root", "control", "prefix", "suffix", "trailing-action", "clear-action", "count"],
  }, root, "Input UI manifest", failures);
  const insideLabelsAuthorized = hasInsideFieldLabelsAuthorization(phaseStatus);
  for (const name of ["input", "search-input", "select", "form-item"]) {
    if (!insideLabelsAuthorized && !existsSync(join(root, `manifests/ui/${name}.yaml`))) continue;
    const manifest = name === "input" ? input : loadYaml(root, `manifests/ui/${name}.yaml`, `${name} inside label manifest`, failures);
    const entry = phaseStatus?.componentRefinements?.tableRn08?.insideFieldLabels;
    const expected = insideLabelsAuthorized ? {
      implementation: entry.implementation, automated: entry.automatedVerification, independentReview: entry.independentReview,
      plan: "docs/plans/2026-09-14-inside-field-labels.md", evidence: "evidence/runtime/inside-field-labels/verification.md",
      labelPosition: "optional-inside-default-top", humanGate: entry.humanGate,
      ...(entry.humanGate === "accepted" ? { humanGateScope: "input-search-input-select-inside-labels-runtime-visual-only" } : {}),
      contrastAcceptance: "not-granted", publication: "not-authorized",
    } : undefined;
    if (!same(manifest?.insideFieldLabels, expected)) failures.push(`${name} inside label record must retain the exact independent implementation and visual acceptance scope`);
  }
  validateTaskSevenButtonMigration(contract, button, root, failures, phaseStatus);
  if (tagAuthorized) {
    for (const name of Object.keys(activeTagManifests)) failures.push(...validateTagFamilyManifest({ manifest: loadYaml(root, `manifests/ui/${name}.yaml`, `${name} UI manifest`, failures), name, root, humanGate: tagHumanGate }));
    failures.push(...validateTagCssExceptions({ contract, root, source: readTaskFourFile(root, "packages/ui/src/styles.css", "Tag CSS", failures) ?? "", batchTwoAuthorized: tagBatchTwoAuthorized }));
    try {
      const item = JSON.parse(readFileSync(join(root, "registry/tag.json"), "utf8"));
      const expected = {
        schemaVersion: 1, kind: "RainLocalSourceRegistry", publication: "not-published", scope: "current-workspace", humanGate: tagHumanGate, contrastAcceptance: "not-granted",
        shared: {
          files: ["packages/ui/src/tag/tag.tsx", "packages/ui/src/tag/tag.styles.ts", ...(tagBatchTwoAuthorized ? ["packages/ui/src/tag/domain-tags.tsx", "packages/ui/src/tag/domain-tags.styles.ts"] : []), "packages/ui/src/recipes/local-recipe.ts", "packages/ui/src/utils/rain-class-names.ts", "packages/ui/src/link/link.tsx", "packages/ui/src/button/button.tsx", "packages/ui/src/button/button.styles.ts", "packages/ui/src/styles.css"],
          peerDependencies: ["react", "@rain-next/foundations", "class-variance-authority", "tailwind-merge"],
          styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/foundations/typography.css", "@rain-next/foundations/focus.css", "@rain-next/foundations/tailwind-theme.css", "@rain-next/ui/styles.css"], registryDependencies: ["close", "check-bold", ...(tagBatchTwoAuthorized ? ["circle-check", "button-loading", "alert-circle", "circle-close", "info"] : [])],
        },
        items: Object.entries(activeTagManifests).map(([name, { file, exportName }]) => ({ name, exportName, importPath: "@rain-next/ui", manifest: `manifests/ui/${name}.yaml`, files: [`packages/ui/src/tag/${file}`] })),
      };
      if (!same(item, expected)) failures.push("Tag Registry must retain exactly the authorized workspace-only unpublished candidates and the recorded Gates");
    } catch (error) { failures.push(`Tag Registry item cannot be read: ${error.message}`); }
  }
  if (inputAuthorized) failures.push(...validateInputCssExceptions({ contract, root, source: readTaskFourFile(root, "packages/ui/src/styles.css", "Input CSS", failures) ?? "" }));
  failures.push(...validateTagSelectCssExceptions({ contract, root, source: readTaskFourFile(root, "packages/ui/src/styles.css", "TagSelect CSS", failures) ?? "", authorized: tagBatchThreeAuthorized }));
  if (tagBatchThreeAuthorized) {
    const humanGate = phaseStatus.componentRefinements.tagBatchThree.humanGate;
    failures.push(...validateTagSelectManifest({ manifest: loadYaml(root, "manifests/ui/tag-select.yaml", "TagSelect UI manifest", failures), root, humanGate }));
    try {
      const item = JSON.parse(readFileSync(join(root, "registry/tag-select.json"), "utf8"));
      if (item.humanGate !== humanGate || item.contrastAcceptance !== "not-granted" || item.publication !== "not-published"
        || item.scope !== "current-workspace" || !same(item.dependencies, { "@base-ui/react": "1.8.0" })
        || !same(item.items, [{ name: "tag-select", exportName: "TagSelect", importPath: "@rain-next/ui", manifest: "manifests/ui/tag-select.yaml", files: ["packages/ui/src/tag/tag-select.tsx", "packages/ui/src/tag/tag-select.styles.ts"] }])) failures.push("TagSelect Registry must keep the exact third-batch candidate, Base UI dependency and recorded Gate");
    } catch { failures.push("TagSelect Registry must remain readable JSON"); }
  }
  validateIconButtonCssExceptions(contract, root, iconButtonAuthorized, failures);
  validateQuestionNumberCssException(contract, root, questionNumberAuthorized, sizesAuthorized, failures);
  validateOptionButtonCssExceptions(contract, root, optionButtonAuthorized, optionButtonContentAuthorized, failures);
  failures.push(...validateCheckboxCssExceptions({ contract, root, source: readTaskFourFile(root, "packages/ui/src/styles.css", "Checkbox CSS", failures) ?? "", authorized: checkboxAuthorized,
    interactionAuthorized: Boolean(phaseStatus?.componentRefinements?.checkboxSc01?.interactionRefinement), menuVisualReuse: hasDropdownSelectionVisualReuseAuthorization(phaseStatus) }));
  failures.push(...validateRadioCssExceptions({ contract, root, source: readTaskFourFile(root, "packages/ui/src/styles.css", "Radio CSS", failures) ?? "", authorized: radioAuthorized, menuVisualReuse: hasDropdownSelectionVisualReuseAuthorization(phaseStatus) }));
  failures.push(...validateSelectionCardCssExceptions({ contract, root, source: readTaskFourFile(root, "packages/ui/src/styles.css", "Selection card CSS", failures) ?? "", authorized: selectionCardsAuthorized }));
  if (selectionPatternsAuthorized) {
    const state = phaseStatus.componentRefinements.selectionPatternsSc03;
    const humanGateScope = state.humanGateDecision?.scope;
    for (const path of selectionPatternsSc03Files.documents.filter((path) => path.startsWith("manifests/"))) {
      const manifest = loadYaml(root, path, "Selection Pattern manifest", failures);
      if (manifest?.category !== "pattern" || manifest?.assetIdentity !== "registry-candidate" || manifest?.maturity !== "registry-candidate"
        || manifest?.modificationMode !== "forkable" || manifest?.publication !== "unpublished" || !existsSync(join(root, manifest?.sourcePath ?? "missing"))
        || manifest?.verification?.humanGate !== state.humanGate || manifest?.verification?.humanGateScope !== humanGateScope || manifest?.verification?.automated !== state.automatedVerification
        || manifest?.verification?.independentReview !== state.independentReview || manifest?.verification?.contrastAcceptance !== "not-granted") failures.push(`${path} must retain real candidate sources and the SC-03 verification/Gate boundary`);
    }
    try {
      const registry = JSON.parse(readFileSync(join(root, "registry/selection-patterns.json"), "utf8"));
      if (registry.humanGate !== state.humanGate || registry.humanGateScope !== humanGateScope || registry.contrastAcceptance !== "not-granted" || registry.publication !== "not-published"
        || !same(registry.items?.map((item) => item.exportName), ["IndependentPreview", "DependentFields", "PageSelection"])) failures.push("Selection Pattern Registry must retain the three unpublished SC-03 candidates");
      for (const path of [...(registry.shared?.files ?? []), ...(registry.items ?? []).flatMap((item) => item.files ?? [])]) {
        if (!existsSync(join(root, path))) failures.push(`Missing Selection Pattern source: ${path}`);
      }
    } catch { failures.push("Selection Pattern Registry must remain readable JSON"); }
  }
  if (selectionCardsAuthorized) {
    const { humanGate, humanGateDecision, automatedVerification, independentReview } = phaseStatus.componentRefinements.selectionCardsSc02;
    const humanGateScope = humanGateDecision?.scope;
    for (const path of selectionCardsSc02Files.documents.filter((path) => path.startsWith("manifests/"))) {
      const manifest = loadYaml(root, path, "Selection card manifest", failures);
      if (manifest?.verification?.humanGate !== humanGate || manifest?.verification?.humanGateScope !== humanGateScope
        || manifest?.verification?.automated !== automatedVerification || manifest?.verification?.independentReview !== independentReview
        || manifest?.verification?.contrastAcceptance !== "not-granted") failures.push(`${path} must match its scoped card visual decision and retain its contrast review`);
    }
    try {
      const registry = JSON.parse(readFileSync(join(root, "registry/selection-cards.json"), "utf8"));
      if (registry.humanGate !== humanGate || registry.humanGateScope !== humanGateScope || registry.contrastAcceptance !== "not-granted"
        || registry.publication !== "not-published") failures.push("Selection card Registry must match its scoped visual decision and remain unpublished without a contrast exception");
    } catch { failures.push("Selection card Registry must remain readable JSON"); }
  }
  if (radioAuthorized) {
    const { humanGate, humanGateDecision, automatedVerification, independentReview } = phaseStatus.componentRefinements.radioSc01;
    const humanGateScope = humanGateDecision?.scope;
    for (const [name, parts] of [["radio", ["root", "input", "control", "label", "description"]], ["radio-group", ["root", "legend", "help", "items", "message"]]]) {
      const manifest = loadYaml(root, `manifests/ui/${name}.yaml`, `${name} UI manifest`, failures);
      validateTaskFiveComponentManifest(manifest, { id: `ui-${name}`, sourcePath: "packages/ui/src/radio/radio.tsx", assetIdentity: "registry-candidate", maturity: "registry-candidate", parts }, root, `${name} UI manifest`, failures);
      if (manifest?.verification?.humanGate !== humanGate || manifest?.verification?.humanGateScope !== humanGateScope || manifest?.verification?.automated !== automatedVerification
        || manifest?.verification?.independentReview !== independentReview || manifest?.verification?.contrastAcceptance !== "not-granted") failures.push(`${name} must retain its scoped verification and visual Gate`);
    }
    try {
      const item = JSON.parse(getG6PreviousSource(root, "registry/radio.json") ?? readFileSync(join(root, "registry/radio.json"), "utf8"));
      if (item.humanGate !== humanGate || item.humanGateScope !== humanGateScope || item.contrastAcceptance !== "not-granted" || item.publication !== "not-published"
        || item.scope !== "current-workspace" || !same(item.shared?.registryDependencies, [])
        || !item.shared?.files?.includes("packages/ui/src/utils/use-default-reset.ts")
        || !same(item.items, ["radio-group", "radio"].map((name) => ({ name, exportName: name === "radio" ? "Radio" : "RadioGroup", importPath: "@rain-next/ui", manifest: `manifests/ui/${name}.yaml`, files: ["packages/ui/src/radio/radio.tsx"] })))) failures.push("Radio Registry must keep its exact native candidates, sources and unpublished state");
    } catch { failures.push("Radio Registry must remain readable JSON"); }
  }
  if (checkboxAuthorized) {
    const { humanGate, humanGateDecision, interactionRefinement } = phaseStatus.componentRefinements.checkboxSc01;
    const humanGateScope = humanGateDecision?.scope;
    const interactionVerification = interactionRefinement && {
      scope: interactionRefinement.scope, implementation: interactionRefinement.implementation,
      automated: interactionRefinement.automatedVerification, independentReview: interactionRefinement.independentReview,
      humanGate: interactionRefinement.humanGate, contrastAcceptance: interactionRefinement.contrastAcceptance,
      ...(interactionRefinement.humanGate === "accepted" ? { humanGateScope: interactionRefinement.humanGateDecision.scope } : {}),
    };
    for (const [name, parts] of [["checkbox", ["root", "input", "control", "label", "description"]], ["checkbox-group", ["root", "legend", "help", "items", "message"]]]) {
      const manifest = loadYaml(root, `manifests/ui/${name}.yaml`, `${name} UI manifest`, failures);
      validateTaskFiveComponentManifest(manifest, { id: `ui-${name}`, sourcePath: "packages/ui/src/checkbox/checkbox.tsx", assetIdentity: "registry-candidate", maturity: "registry-candidate", parts }, root, `${name} UI manifest`, failures);
      if (manifest?.verification?.humanGate !== humanGate || manifest?.verification?.humanGateScope !== humanGateScope
        || manifest?.verification?.contrastAcceptance !== "not-granted") failures.push(`${name} must match its scoped visual decision and retain its contrast review`);
      if (!same(manifest?.verification?.interactionRefinement, interactionVerification)) failures.push(`${name} must keep its separate interaction review in sync`);
    }
    try {
      const item = JSON.parse(readFileSync(join(root, "registry/checkbox.json"), "utf8"));
      if (item.humanGate !== humanGate || item.humanGateScope !== humanGateScope || item.contrastAcceptance !== "not-granted"
        || item.publication !== "not-published") failures.push("Checkbox Registry must match its scoped visual decision and remain unpublished without a contrast exception");
      if (!same(item.interactionRefinement, interactionVerification)) failures.push("Checkbox Registry must keep its separate interaction review in sync");
    } catch { failures.push("Checkbox Registry must remain readable JSON"); }
  }
  if (iconButtonAuthorized) {
    const iconButton = loadYaml(root, "manifests/ui/icon-button.yaml", "IconButton UI manifest", failures);
    validateTaskFiveComponentManifest(iconButton, {
      id: "ui-icon-button", sourcePath: "packages/ui/src/icon-button/icon-button.tsx",
      assetIdentity: "registry-candidate", maturity: "registry-candidate",
      parts: ["root", "icon", "loading-indicator"],
    }, root, "IconButton UI manifest", failures);
    if (iconButton?.styleSourcePath !== "packages/ui/src/icon-button/icon-button.styles.ts"
      || iconButton?.verification?.humanGate !== iconButtonHumanGate) {
      failures.push("IconButton UI manifest must keep its exact style source and match the validated phase Human Gate");
    }
  }

  if (questionNumberAuthorized) {
    const manifest = loadYaml(root, "manifests/ui/question-number.yaml", "QuestionNumber UI manifest", failures);
    validateTaskFiveComponentManifest(manifest, {
      id: "ui-question-number", sourcePath: "packages/ui/src/question-number/question-number.tsx",
      assetIdentity: "registry-candidate", maturity: "registry-candidate",
      parts: ["root", "control", "label", "feedback"],
    }, root, "QuestionNumber UI manifest", failures);
    if (manifest?.styleSourcePath !== "packages/ui/src/question-number/question-number.styles.ts"
      || manifest?.verification?.humanGate !== questionNumberHumanGate
      || !same(manifest?.verification?.contrastReview, questionNumberContrastReview)
      || !same(manifest?.verification?.sizeRefinement, sizeReview)) {
      failures.push("QuestionNumber UI manifest must keep its exact style source and match the validated phase Human Gate");
    }
    try {
      const item = JSON.parse(readFileSync(join(root, "registry/question-number.json"), "utf8"));
      if (!same(item, {
        schemaVersion: 1, kind: "RainLocalSourceRegistry", publication: "not-published", scope: "current-workspace", humanGate: questionNumberHumanGate,
        ...(questionNumberContrastReview ? { contrastReview: questionNumberContrastReview } : {}),
        ...(sizesAuthorized ? { sizeRefinement: sizeReview } : {}),
        shared: {
          files: ["packages/ui/src/recipes/local-recipe.ts", "packages/ui/src/utils/rain-class-names.ts", "packages/ui/src/icon/icon.tsx", "packages/ui/src/styles.css", ...(sizesAuthorized ? ["packages/ui/src/recipes/question-option-size.ts"] : [])],
          peerDependencies: ["react", "@rain-next/foundations", "tailwind-merge"],
          styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/foundations/typography.css", "@rain-next/foundations/focus.css", "@rain-next/foundations/tailwind-theme.css", "@rain-next/ui/styles.css"],
          registryDependencies: ["close-bold", "check-bold", "warning-bold", "grading-pending", "grading-reviewed"],
        },
        items: [{ name: "question-number", exportName: "QuestionNumber", importPath: "@rain-next/ui", manifest: "manifests/ui/question-number.yaml", files: ["packages/ui/src/question-number/question-number.tsx", "packages/ui/src/question-number/question-number.styles.ts"] }],
      })) failures.push("QuestionNumber Registry item must remain the exact workspace-only unpublished candidate and match the validated phase Human Gate");
    } catch (error) { failures.push(`QuestionNumber Registry item cannot be read: ${error.message}`); }
  }

  if (optionButtonAuthorized) {
    const manifest = loadYaml(root, "manifests/ui/option-button.yaml", "OptionButton UI manifest", failures);
    validateTaskFiveComponentManifest(manifest, {
      id: "ui-option-button", sourcePath: "packages/ui/src/option-button/option-button.tsx",
      assetIdentity: "registry-candidate", maturity: "registry-candidate", parts: ["root", "input", "control", "label", "content", ...(optionButtonContentAuthorized ? ["media"] : [])],
    }, root, "OptionButton UI manifest", failures);
    if (manifest?.styleSourcePath !== "packages/ui/src/option-button/option-button.styles.ts"
      || manifest?.verification?.humanGate !== optionButtonHumanGate
      || manifest?.verification?.humanGateScope !== (optionButtonHumanGate === "accepted" ? "option-button-32-selection-visual-only" : undefined)
      || !same(manifest?.verification?.contentRefinement, optionButtonContentReview)
      || !same(manifest?.verification?.sizeRefinement, sizeReview)) {
      failures.push("OptionButton UI manifest must keep its exact style source and match the validated phase Human Gate");
    }
    try {
      const item = JSON.parse(readFileSync(join(root, "registry/option-button.json"), "utf8"));
      if (!same(item, {
        schemaVersion: 1, kind: "RainLocalSourceRegistry", publication: "not-published", scope: "current-workspace", humanGate: optionButtonHumanGate,
        ...(optionButtonHumanGate === "accepted" ? { humanGateScope: "option-button-32-selection-visual-only" } : {}),
        ...(optionButtonContentAuthorized ? { contentRefinement: optionButtonContentReview } : {}),
        ...(sizesAuthorized ? { sizeRefinement: sizeReview } : {}),
        shared: {
          files: ["packages/ui/src/recipes/local-recipe.ts", "packages/ui/src/utils/rain-class-names.ts", ...(optionButtonContentAuthorized ? ["packages/ui/src/icon/icon.tsx"] : []), "packages/ui/src/styles.css", ...(sizesAuthorized ? ["packages/ui/src/recipes/question-option-size.ts"] : [])],
          peerDependencies: ["react", "@rain-next/foundations", "tailwind-merge"],
          styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/foundations/typography.css", "@rain-next/foundations/focus.css", "@rain-next/foundations/tailwind-theme.css", "@rain-next/ui/styles.css"],
          ...(optionButtonContentAuthorized ? { registryDependencies: ["check-bold", "close-bold"] } : {}),
        },
        items: [["option-group", "OptionGroup"], ["option-button", "OptionButton"]].map(([name, exportName]) => ({
          name, exportName, importPath: "@rain-next/ui", manifest: "manifests/ui/option-button.yaml",
          files: ["packages/ui/src/option-button/option-button.tsx", "packages/ui/src/option-button/option-button.styles.ts"],
        })),
      })) failures.push("OptionButton Registry item must remain the exact workspace-only unpublished candidate and match the validated phase Human Gate");
    } catch (error) { failures.push(`OptionButton Registry item cannot be read: ${error.message}`); }
  }

  if (selectAuthorized) {
    failures.push(...validateSelectManifest({ manifest: loadYaml(root, "manifests/ui/select.yaml", "Select UI manifest", failures), root }));
    try {
      const item = JSON.parse(readFileSync(join(root, "registry/select.json"), "utf8"));
      failures.push(...validateSelectRegistry(item, { humanGate: phaseStatus.componentRefinements.select.humanGate }));
      for (const filePath of [...(item.shared?.files ?? []), ...(item.shared?.componentDependencies ?? []), ...(item.items ?? []).flatMap((entry) => entry.files ?? [])]) {
        if (!existsSync(join(root, filePath))) failures.push(`Missing Select Registry workspace source: ${filePath}`);
      }
    } catch (error) { failures.push(`Select Registry item cannot be read: ${error.message}`); }
  }

  if (hasLayoutsV1Authorization(phaseStatus)) {
    try {
      const registry = JSON.parse(readFileSync(join(root, "registry/layouts.json"), "utf8"));
      const names = ["stack", "inline", "grid", "split"];
      const spacingAcceptance = phaseStatus.componentRefinements.layoutsV1.spacingHierarchy?.humanGate === "accepted"
        ? { humanGate: "accepted", humanGateScope: "layouts-spacing-runtime-visual-only", evidence: "evidence/runtime/spacing-hierarchy/outer-cards/visual-acceptance.md" }
        : undefined;
      const sharedFiles = ["layout.tsx", "layout.css", "layout.css.d.ts", "index.ts"].map(name => `packages/layouts/src/${name}`);
      if (!same((contract?.cssExceptions?.entries ?? []).filter(entry => entry.component === "layouts-v1" || entry.id === "layouts-v1-runtime-geometry"), [{
        id: "layouts-v1-runtime-geometry", component: "layouts-v1", selector: ".rain-grid, .rain-split and their declared parts",
        reason: "Container-based Grid calculations and controlled Split regions; these five node-local variables are geometry, not public Tokens or color aliases.",
        tokens: ["--rain-layout-gap", "--rain-layout-columns", "--rain-layout-column-min-width", "--rain-layout-sidebar-width", "--rain-layout-main-min-width"],
        tests: ["scripts/layouts-v1.test.ts", "packages/layouts/src/layout.test.tsx", "tests/e2e/layouts.spec.ts"], status: "implemented-rn-06-candidate",
      }])) failures.push("RN-06 native CSS must keep its exact geometry exception and verification paths");
      if (registry.kind !== "RainLocalSourceRegistry" || registry.scope !== "current-workspace" || registry.publication !== "not-published"
        || registry.humanGate !== "awaiting_human" || registry.contrastAcceptance !== "not-granted"
        || !same(registry.spacingHierarchy, spacingAcceptance)
        || !same(registry.shared?.files, sharedFiles) || !same(registry.shared?.peerDependencies, ["react", "@rain-next/foundations"])
        || !same(registry.items?.map(item => item.name), names)) failures.push("RN-06 Registry must retain its exact four unpublished Layout candidates");
      for (const name of names) {
        const manifest = loadYaml(root, `manifests/layouts/${name}.yaml`, "RN-06 Manifest", failures);
        const item = registry.items?.find(item => item.name === name);
        if (manifest?.id !== `layout-${name}` || manifest?.sourcePath !== "packages/layouts/src/layout.tsx" || manifest?.styleSourcePath !== "packages/layouts/src/layout.css"
          || manifest?.kind !== "RainLayoutManifest" || manifest?.category !== "layout" || manifest?.migrationLabel !== "react-only"
          || manifest?.maturity !== "registry-candidate" || manifest?.assetIdentity !== "registry-candidate" || manifest?.publication !== "unpublished"
          || manifest?.verification?.humanGate !== "awaiting_human" || manifest?.verification?.contrastAcceptance !== "not-granted"
          || !same(manifest?.verification?.spacingHierarchy, spacingAcceptance)
          || item?.importPath !== "@rain-next/layouts" || item?.manifest !== `manifests/layouts/${name}.yaml`
          || !same(item?.files, sharedFiles) || !same(manifest?.dependencies, ["react", "@rain-next/foundations"])
          || item?.exportName !== name[0].toUpperCase() + name.slice(1)) failures.push(`RN-06 ${name} requires its exact source and unaccepted candidate boundaries`);
      }
      for (const file of layoutsV1Files.layouts) if (!existsSync(join(root, file)) || !lstatSync(join(root, file)).isFile() || lstatSync(join(root, file)).isSymbolicLink()) failures.push(`RN-06 missing regular source: ${file}`);
      for (const file of [...layoutsV1Files.application, "packages/layouts/src/layout.tsx", "packages/layouts/src/layout.css"]) if (!contract?.protectedPaths?.optional?.includes(file)) failures.push(`RN-06 missing protected source: ${file}`);
    } catch (error) { failures.push(`RN-06 metadata cannot be read: ${error.message}`); }
  }
  if (hasDialogV2Authorization(phaseStatus)) {
    try {
      const registry = JSON.parse(readFileSync(join(root, "registry/dialog.json"), "utf8"));
      const visualAcceptance = hasDialogRefinementAuthorization(phaseStatus) && phaseStatus.componentRefinements.dialogRefinement.humanGate === "accepted"
        ? { humanGate: "accepted", humanGateScope: "dialog-alert-dialog-runtime-visual-only", evidence: "evidence/runtime/dialog-bm-b-visual-2026-09-15/verification.md" }
        : undefined;
      if (registry.kind !== "RainLocalSourceRegistry" || registry.scope !== "current-workspace" || registry.publication !== "not-published"
        || registry.humanGate !== "awaiting_human" || registry.contrastAcceptance !== "not-granted" || registry.dependencies?.["@base-ui/react"] !== "1.8.0"
        || !same(registry.dialogVisualAcceptance, visualAcceptance)
        || JSON.stringify(registry.items?.map(item => item.name)) !== JSON.stringify(hasDialogRefinementAuthorization(phaseStatus) ? ["dialog", "alert-dialog", "separator"] : ["dialog", "separator"])) failures.push("RN-05 Registry must retain its exact unpublished candidate scope");
      for (const name of (hasDialogRefinementAuthorization(phaseStatus) ? ["dialog", "alert-dialog", "separator"] : ["dialog", "separator"])) {
        const manifest = loadYaml(root, `manifests/ui/${name}.yaml`, "RN-05 Manifest", failures);
        const accepted = name !== "separator" ? visualAcceptance : undefined;
        const component = name === "alert-dialog" ? "dialog" : name;
        const files = ["tsx", "css", "css.d.ts"].map(extension => `packages/ui/src/${component}/${component}.${extension}`);
        if (manifest?.id !== `ui-${name}` || manifest?.sourcePath !== files[0] || manifest?.maturity !== "registry-candidate"
          || manifest?.assetIdentity !== "registry-candidate" || manifest?.publication !== "unpublished"
          || manifest?.verification?.humanGate !== (accepted ? "accepted" : "awaiting_human") || manifest?.verification?.contrastAcceptance !== "not-granted"
          || manifest?.verification?.humanGateScope !== accepted?.humanGateScope || manifest?.verification?.visualEvidence !== accepted?.evidence
          || manifest?.source?.commit !== "3ba91b1cc83e1bbe4ab35a422ff2a694849c5048"
          || JSON.stringify(registry.items?.find(item => item.name === name)?.files) !== JSON.stringify(files)) failures.push(`RN-05 ${name} source inventory and unaccepted candidate boundaries are required`);
        for (const file of files) if (!existsSync(join(root, file)) || !lstatSync(join(root, file)).isFile() || lstatSync(join(root, file)).isSymbolicLink()) failures.push(`RN-05 missing regular source: ${file}`);
        for (const file of files.slice(0, 2)) if (!contract.protectedPaths?.optional?.includes(file)) failures.push(`RN-05 missing protected source: ${file}`);
      }
    } catch (error) { failures.push(`RN-05 metadata cannot be read: ${error.message}`); }
  }
  const tabsComponentAuthorized = hasTabsRefinementAuthorization(phaseStatus) && ["component", "documentation"].includes(phaseStatus.componentRefinements.tabs.stage);
  if (hasCardV2Authorization(phaseStatus)) {
    try {
      const manifest = loadYaml(root, "manifests/ui/card.yaml", "Card Manifest", failures);
      const registry = JSON.parse(readFileSync(join(root, "registry/card.json"), "utf8"));
      failures.push(...validateCardV2Metadata({ manifest, registry }));
      const item = registry.items?.[0];
      for (const path of [...(registry.shared?.files ?? []), ...(item?.files ?? []), item?.sourceLock, item?.license]) {
        if (typeof path !== "string" || isAbsolute(path) || path.split("/").includes("..") || !existsSync(join(root, path))
          || !lstatSync(join(root, path)).isFile() || lstatSync(join(root, path)).isSymbolicLink()) failures.push("Card Registry requires available regular workspace sources: " + path);
      }
    } catch (error) { failures.push("Card V2 metadata cannot be read: " + error.message); }
  }
  if (tabsComponentAuthorized) {
    try { failures.push(...validateTabsMetadata({ manifest: loadYaml(root, "manifests/ui/tabs.yaml", "Tabs Manifest", failures), registry: JSON.parse(readFileSync(join(root, "registry/tabs.json"), "utf8")), root, review: phaseStatus.componentRefinements.tabs })); }
    catch (error) { failures.push(`Tabs metadata cannot be read: ${error.message}`); }
  }
  const manifestFiles = collectTaskFiveFiles(root, "manifests", failures).sort();
  if (dropdownFamilyAuthorized) {
    for (const name of ["dropdown-menu", "popover"]) failures.push(...validateDropdownFamilyManifest({
      manifest: loadYaml(root, `manifests/ui/${name}.yaml`, `${name} manifest`, failures), name, root, review: phaseStatus.componentRefinements.dropdownFamily,
    }));
    try {
      const item = JSON.parse(getG6PreviousSource(root, "registry/dropdown-family.json") ?? readFileSync(join(root, "registry/dropdown-family.json"), "utf8"));
      failures.push(...validateDropdownFamilyRegistry(item, { humanGate: phaseStatus.componentRefinements.dropdownFamily.humanGate }));
      for (const path of [...(item.shared?.files ?? []), ...(item.items ?? []).flatMap(entry => entry.files ?? []),
        ...(item.shared?.registryDependencies ?? []).map(name => `packages/ui/src/icons/${name}.tsx`)]) {
        if (!existsSync(join(root, path))) failures.push(`Missing Dropdown family Registry source: ${path}`);
      }
    } catch (error) { failures.push(`Dropdown family Registry cannot be read: ${error.message}`); }
  }
  const recordedDocuments = tokenFoundationsAuthorized ? collectRecordedPostB2Documents(root, phaseStatus, failures) : { manifests: [], registries: [] };
  if (g4Authorized && !tokenFoundationsAuthorized) {
    recordedDocuments.manifests.push(...g4ComponentFiles.documents.filter(file => file.startsWith("manifests/")));
    recordedDocuments.registries.push("registry/g4-assets.json");
  }
  const expectedManifestFiles = unique([
    ...recordedDocuments.manifests,
    ...(hasAlertAuthorization(phaseStatus) ? ["manifests/ui/alert.yaml"] : []),
    ...(hasTooltipAuthorization(phaseStatus) ? ["manifests/ui/tooltip.yaml"] : []),
    ...(hasInputNumberAuthorization(phaseStatus) ? ["manifests/ui/input-number.yaml"] : []),
    ...(hasAvatarFamilyAuthorization(phaseStatus) ? avatarFamilyFiles.documents.filter(path => path.startsWith("manifests/")) : []),
    ...(hasRn13Authorization(phaseStatus) ? rn13AssetIndexFiles.documents.filter(path => path.startsWith("manifests/")) : []),
    ...(hasBmBRn10Authorization(phaseStatus) ? ["manifests/ui/textarea.yaml"] : []),
    ...(hasTableRn08Authorization(phaseStatus) ? tableRn08Files.documents.filter(path => path.startsWith("manifests/")) : []),
    ...(hasLayoutsV1Authorization(phaseStatus) ? layoutsV1Files.documents.filter(path => path.startsWith("manifests/")) : []),
    ...(hasDialogV2Authorization(phaseStatus) ? ["manifests/ui/dialog.yaml", "manifests/ui/separator.yaml"] : []),
    ...(hasDialogRefinementAuthorization(phaseStatus) ? ["manifests/ui/alert-dialog.yaml"] : []),
    ...(hasCardV2Authorization(phaseStatus) ? ["manifests/ui/card.yaml"] : []),
    ...(tabsComponentAuthorized ? ["manifests/ui/tabs.yaml"] : []),
    "manifests/.gitkeep",
    "manifests/icons.json",
    ...taskFiveManifestPaths,
    ...(tokenFoundationsAuthorized ? ["manifests/contracts/token-foundations-v1.json"] : []),
    ...(iconButtonAuthorized ? ["manifests/ui/icon-button.yaml"] : []),
    ...(inputAuthorized ? ["manifests/ui/form-item.yaml", "manifests/ui/search-input.yaml"] : []),
    ...(selectAuthorized ? ["manifests/ui/select.yaml"] : []),
    ...(dropdownFamilyAuthorized ? ["manifests/ui/dropdown-menu.yaml", "manifests/ui/popover.yaml"] : []),
    ...(tagBatchTwoAuthorized ? tagBatchTwoNames.map((name) => `manifests/ui/${name}.yaml`) : []),
    ...(tagBatchThreeAuthorized ? ["manifests/ui/tag-select.yaml"] : []),
    ...(tagAuthorized ? ["tag", "link-tag", "checkable-tag", "checkable-tag-group"].map((name) => `manifests/ui/${name}.yaml`) : []),
    ...(questionNumberAuthorized ? ["manifests/ui/question-number.yaml"] : []),
    ...(optionButtonAuthorized ? ["manifests/ui/option-button.yaml"] : []),
    ...(checkboxAuthorized ? ["manifests/ui/checkbox.yaml", "manifests/ui/checkbox-group.yaml"] : []),
    ...(selectionCardsAuthorized ? selectionCardsSc02Files.documents.filter((path) => path.startsWith("manifests/")) : []),
    ...(selectionPatternsAuthorized ? selectionPatternsSc03Files.documents.filter((path) => path.startsWith("manifests/")) : []),
    ...(radioAuthorized ? ["manifests/ui/radio.yaml", "manifests/ui/radio-group.yaml"] : []),
  ]).sort();
  if (JSON.stringify(manifestFiles) !== JSON.stringify(expectedManifestFiles)) {
    failures.push(`Task 5 manifest inventory must be exact: missing ${JSON.stringify(expectedManifestFiles.filter(file => !manifestFiles.includes(file)))}, unexpected ${JSON.stringify(manifestFiles.filter(file => !expectedManifestFiles.includes(file)))}, expected ${expectedManifestFiles.length}, actual ${manifestFiles.length}`);
  }
  const registryFiles = collectTaskFiveFiles(root, "registry", failures).sort();
const expectedRegistryFiles = [ ...recordedDocuments.registries, ...(hasAlertAuthorization(phaseStatus) ? ["registry/alert.json"] : []), ...(hasTooltipAuthorization(phaseStatus) ? ["registry/tooltip.json"] : []), ...(hasInputNumberAuthorization(phaseStatus) ? ["registry/input-number.json"] : []), ...(hasAvatarFamilyAuthorization(phaseStatus) ? avatarFamilyFiles.documents.filter(path => path.startsWith("registry/")) : []), ...(hasRn13Authorization(phaseStatus) ? rn13AssetIndexFiles.documents.filter(path => path.startsWith("registry/")) : []), ...(hasBmBRn10Authorization(phaseStatus) ? ["registry/textarea.json"] : []),...(hasTableRn08Authorization(phaseStatus) ? ["registry/table.json"] : []),
    ...(hasLayoutsV1Authorization(phaseStatus) ? ["registry/layouts.json"] : []),...(hasDialogV2Authorization(phaseStatus) ? ["registry/dialog.json"] : []),...(hasCardV2Authorization(phaseStatus) ? ["registry/card.json"] : []),...(tabsComponentAuthorized ? ["registry/tabs.json"] : []),...(dropdownFamilyAuthorized ? ["registry/dropdown-family.json"] : []),...(selectionPatternsAuthorized ? ["registry/selection-patterns.json"] : []),...(selectionCardsAuthorized ? ["registry/selection-cards.json"] : []),...(radioAuthorized ? ["registry/radio.json"] : []),...(tagBatchThreeAuthorized ? ["registry/tag-select.json"] : []), ...(checkboxAuthorized ? ["registry/checkbox.json"] : []), ...(selectAuthorized ? ["registry/select.json"] : []), ...(tagAuthorized ? ["registry/tag.json"] : []), "registry/.gitkeep", "registry/icons.json", ...(iconButtonAuthorized ? ["registry/icon-button.json"] : []), ...(questionNumberAuthorized ? ["registry/question-number.json"] : []), ...(optionButtonAuthorized ? ["registry/option-button.json"] : [])].sort();
  if (!same(registryFiles, expectedRegistryFiles)) {
    failures.push(`Task 5 Registry must remain unpublished with only the exact authorized local candidates: ${JSON.stringify(registryFiles)}`);
  }
  if (iconButtonAuthorized) {
    try {
      const item = JSON.parse(readFileSync(join(root, "registry/icon-button.json"), "utf8"));
      if (!same(item, {
        schemaVersion: 1, kind: "RainLocalSourceRegistry", publication: "not-published", scope: "current-workspace", humanGate: iconButtonHumanGate,
        shared: {
          files: ["packages/ui/src/recipes/local-recipe.ts", "packages/ui/src/utils/rain-class-names.ts", "packages/ui/src/icon/icon.tsx", "packages/ui/src/styles.css", "packages/ui/src/icons/assets/button-loading.png"],
          peerDependencies: ["react", "@rain-next/foundations", "class-variance-authority", "tailwind-merge"],
          styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/foundations/focus.css", "@rain-next/foundations/motion.css", "@rain-next/foundations/tailwind-theme.css", "@rain-next/ui/styles.css"],
        },
        items: [{ name: "icon-button", exportName: "IconButton", importPath: "@rain-next/ui", manifest: "manifests/ui/icon-button.yaml", files: ["packages/ui/src/icon-button/icon-button.tsx", "packages/ui/src/icon-button/icon-button.styles.ts"] }],
      })) {
        failures.push("IconButton Registry item must remain the exact workspace-only unpublished candidate and match the validated phase Human Gate");
      }
    } catch (error) {
      failures.push(`IconButton Registry item cannot be read: ${error.message}`);
    }
  }
  return unique(failures);
}

function loadYaml(root, filePath, label, failures) {
  const absolutePath = join(root, filePath);
  if (!existsSync(absolutePath)) {
    failures.push(`${label} is missing: ${filePath}`);
    return null;
  }
  try {
    const stat = lstatSync(absolutePath);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0) {
      failures.push(`${label} must be a non-empty regular file: ${filePath}`);
      return null;
    }
    return parseYamlSubset(readFileSync(absolutePath, "utf8"));
  } catch (error) {
    failures.push(`${label} cannot be parsed: ${error.message}`);
    return null;
  }
}

export function validateDropdownReviewSource({ manifest, source, publicCss }) {
  const failures = [];
  const exception = manifest?.cssExceptions?.[0];
  if (manifest?.id !== "dropdown-batch-one-review" || manifest?.assetIdentity !== "local-experiment"
    || manifest?.scope !== "dropdown-visual-and-headless-comparison-only"
    || manifest?.lifecycle?.publication !== "not-published"
    || exception?.id !== "dropdown-comparison-parts" || !exception.reason || !exception.scope?.length
    || exception?.source !== "apps/playground/src/experiments/headless/review.css"
    || !exception?.tests?.includes("tests/e2e/dropdown-batch-one.spec.ts")) return ["Dropdown comparison registration is incomplete"];
  const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
  if (/:root|!important|--rain-ref-/i.test(css)) failures.push("Dropdown comparison must retain local scope and public Token access");
  for (const [, selector] of css.matchAll(/(?:^|[{}])\s*([^{}]+)\{/g)) {
    if (selector.trim().startsWith("@media")) continue;
    if (selector.split(",").some(part => !/^(?:\.dr-|\.dropdown-|\[data-(?:geometry|feedback|shadow|flavor)=)/.test(part.trim()))) {
      failures.push(`Dropdown comparison selector is outside local scope: ${selector.trim()}`);
    }
  }
  const known = new Set([...publicCss.matchAll(/(--rain-[a-z0-9-]+)\s*:/g)].map(match => match[1]));
  for (const [, token] of css.matchAll(/var\((--rain-[a-z0-9-]+)/g)) {
    if ((!known.has(token) && !token.startsWith("--rain-local-dropdown-")) || !exception.tokens.includes(token)) failures.push(`Dropdown comparison Token is not registered: ${token}`);
  }
  for (const pattern of [/(?<![\w-])\d+(?:\.\d+)?px\b/g, /#[0-9a-fA-F]{3,8}\b|rgb\([^)]*\)/g]) {
    const allowed = pattern.source.includes("px") ? exception.registeredLiteralPixels : exception.registeredRawColors;
    for (const [value] of css.matchAll(pattern)) if (!allowed.includes(value)) failures.push(`Dropdown comparison value is not registered: ${value}`);
  }
  return unique(failures);
}

export function validateTabsMetadata({ manifest, registry, root, review = { implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run" } }) {
  const accepted = review.humanGate === "accepted", humanGate = accepted ? "accepted" : "not-evaluated";
  const failures = [], required = {
    implementation: review.implementation, automatedVerification: review.automatedVerification, independentReview: review.independentReview,
    schemaVersion: "1.0", kind: "RainUiManifest", id: "ui-tabs", name: "Tabs", category: "ui",
    assetIdentity: "registry-candidate", maturity: "registry-candidate", modificationMode: "managed",
    sourcePath: "packages/ui/src/tabs/tabs.tsx", styleSourcePath: "packages/ui/src/tabs/tabs.styles.ts",
    publication: "unpublished", humanGate, humanGateScope: accepted ? "tabs-runtime-visual-only" : undefined, contrastAcceptance: "not-granted",
    sizes: [28, 32, 38], positions: ["top", "bottom", "start", "end"], variants: ["line", "contained", "soft"],
    parts: ["root", "nav", "list", "tab", "icon", "label", "count", "indicator", "extra-start", "extra-end", "more", "panel"],
  };
  if (accepted && !hasTabsRefinementAuthorization({ currentPhase: { id: "token-foundations-v1" }, componentRefinements: { tabs: review } })) failures.push("Tabs visual acceptance requires the exact user decision and completed verification");
  for (const [key, value] of Object.entries(required)) if (!same(manifest?.[key], value)) failures.push(`Tabs Manifest must preserve ${key}`);
  for (const key of ["description", "useWhen", "doNotUseWhen", "anatomy", "props", "slots", "states", "dependencies", "tokens", "layoutConstraints", "compositionRules", "allowedModifications", "restrictedModifications", "accessibility", "examples", "recipes", "antiPatterns", "visualLineage", "migrationNotes", "evidence"]) {
    if (!manifest?.[key] || Array.isArray(manifest[key]) && !manifest[key].length) failures.push(`Tabs Manifest requires ${key}`);
  }
  const files = ["tabs.tsx", "tabs.styles.ts", "tabs-full-label.tsx", "tabs-overflow.ts"].map(name => `packages/ui/src/tabs/${name}`);
  if (!same(registry, {
    schemaVersion: 1, kind: "RainLocalSourceRegistry", publication: "not-published", scope: "current-workspace", humanGate,
    ...(accepted ? { humanGateScope: "tabs-runtime-visual-only", contrastAcceptance: "not-granted" } : {}),
    shared: {
      files: ["packages/ui/src/recipes/local-recipe.ts", "packages/ui/src/utils/rain-class-names.ts", "packages/ui/src/styles.css", "packages/ui/src/_internal/popup.tsx"],
      peerDependencies: ["react", "@rain-next/foundations", "tailwind-merge", "@base-ui/react"], componentDependencies: ["manifests/ui/dropdown-menu.yaml"],
      styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/foundations/typography.css", "@rain-next/foundations/focus.css", "@rain-next/foundations/tailwind-theme.css", "@rain-next/ui/styles.css"],
      registryDependencies: ["more-horizontal"],
    },
    items: [{ name: "tabs", exportName: "Tabs", importPath: "@rain-next/ui", manifest: "manifests/ui/tabs.yaml", files }],
  })) failures.push("Tabs Registry must retain its exact unpublished source and dependency inventory");
  if (root) for (const file of [...files, ...(registry?.shared?.files ?? []), ...(registry?.shared?.componentDependencies ?? []), ...(manifest?.evidence ?? []), "packages/ui/src/icons/more-horizontal.tsx"]) {
    if (typeof file !== "string" || isAbsolute(file) || file.split("/").includes("..") || !existsSync(join(root, file))) failures.push(`Tabs source or evidence is unavailable: ${file}`);
  }
  return failures;
}

// Fingerprint only parsed Tabs rules: unrelated CSS and formatting remain editable.
export function validateCardV2Metadata({ manifest, registry }) {
  const failures = [], exports = ["Card", "CardHeader", "CardTitle", "CardDescription", "CardAction", "CardContent", "CardFooter"];
  const files = ["packages/ui/src/card/card.tsx", "packages/ui/src/card/card.styles.ts", "packages/ui/src/card/card.css", "packages/ui/src/card/card.css.d.ts"];
  if (manifest?.id !== "ui-card" || manifest?.publication !== "unpublished" || manifest?.maturity !== "registry-candidate"
    || manifest?.humanGate !== "awaiting_human" || manifest?.contrastAcceptance !== "not-granted"
    || !same(manifest?.exports, exports) || !same(manifest?.parts, ["root", "header", "title", "description", "action", "content", "footer"])
    || manifest?.source?.commit !== "3ba91b1cc83e1bbe4ab35a422ff2a694849c5048" || manifest?.source?.license !== "MIT") failures.push("Card V2 Manifest must retain its source, seven parts and unaccepted candidate boundaries");
  if (registry?.kind !== "RainLocalSourceRegistry" || registry?.publication !== "not-published" || registry?.scope !== "current-workspace"
    || registry?.humanGate !== "awaiting_human" || registry?.contrastAcceptance !== "not-granted"
    || !same(registry?.shared, {
      files: ["packages/ui/src/recipes/local-recipe.ts", "packages/ui/src/utils/rain-class-names.ts"],
      peerDependencies: ["react", "@rain-next/foundations", "tailwind-merge"],
      styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/foundations/typography.css", "@rain-next/foundations/focus.css", "@rain-next/foundations/tailwind-theme.css", "@rain-next/ui/styles.css"],
      registryDependencies: [],
    })
    || !same(registry?.items, [{
      name: "card", exportNames: exports, importPath: "@rain-next/ui", manifest: "manifests/ui/card.yaml",
      sourceLock: "evidence/runtime/card-v2/source-lock.json", license: "evidence/runtime/card-v2/upstream/LICENSE.md", files,
    }])) failures.push("Card V2 Registry must retain its exact local source inventory and unaccepted candidate boundaries");
  return failures;
}

export function validateTabsCssExceptions({ source, contract, authorized, root = process.cwd() }) {
  const failures = [], ids = ["tabs-geometry", "tabs-touch-targets", "tabs-forced-colors"];
  const entries = (contract?.cssExceptions?.entries ?? []).filter(entry => entry.component === "ui-tabs" || ids.includes(entry.id));
  const selectorBranches = selector => {
    const result = []; let start = 0, depth = 0, quote = "";
    for (let index = 0; index < selector.length; index++) {
      const char = selector[index];
      if (char === "\\") { index++; continue; }
      if (quote) { if (char === quote) quote = ""; continue; }
      if (char === '"' || char === "'") quote = char;
      else if (char === "(" || char === "[") depth++;
      else if (char === ")" || char === "]") depth--;
      else if (char === "," && depth === 0) { result.push(selector.slice(start, index)); start = index + 1; }
    }
    return [...result, selector.slice(start)];
  };
  const collect = (css, scope = []) => parseTopLevelCssBlocks(css, "Tabs native CSS", failures, { root }).flatMap(({ header, body }) => {
    if (header.startsWith("@")) return collect(body, [...scope, header.replace(/\s+/g, " ")]);
    const selector = header.replace(/\\([0-9a-f]{1,6})\s?|\\([^\n\r])/gi, (_, hex, literal) => hex ? String.fromCodePoint(parseInt(hex, 16) || 0xfffd) : literal);
    const generic = selectorBranches(selector).some(branch => !/^\s*\.[a-z_-]/i.test(branch) && /\[(?:data-(?:part|slot|appearance)|role)\b|(?:^|[\s,>+~(])(?:button|fieldset|\*)(?=[\s,):[.#>+~]|$)/i.test(branch));
    if (!generic && !/rain-tabs|ui-tabs|--tabs-/.test(selector + body) && !/\[(?:data-(?:slot|part)|role)\s*[*^$~|]?=\s*["']?tab(?:list)?(?=["'\]\s])/.test(selector)) return [];
    return [{ scope, selector: selector.replace(/\s+/g, " "), declarations: stripCssComments(body).replace(/\s+/g, " ").trim() }];
  });
  // Inspect the live rules: generic G6 normalization intentionally reads an older
  // stylesheet and would otherwise hide the R01 divider correction. The full
  // stylesheet import inventory remains checked by verifyTailwindB2.
  const rules = collect(source.replace(/^@import\s+[^;]+;\s*$/gm, ""));
  if (!same(entries.map(({ id }) => id), authorized ? ids : []) || authorized && ids.some(id => !source.includes(`@rain-css-exception ${id}`))) failures.push("Tabs must retain its exact CSS exception inventory and markers");
  const fingerprint = createHash("sha256").update(JSON.stringify(rules)).digest("hex");
  // R01: three undefined space-1 uses became line-thickness-1; see deep-review-fixes-2026-10-17/css.md.
  if (authorized ? fingerprint !== "9811e6b76b9df7e453733c45921b5c7dcf71a1ff2e50e57827d76f50a3278625" : rules.length > 0) failures.push(`Tabs native CSS changed outside reviewed geometry, target spacing or system-color rules (${fingerprint})`);
  return failures;
}

export function validateTabsPreflightSource({ source, contract, authorized }) {
  if (!authorized || !same(contract?.tabsPreflight, {
    source: "apps/playground/src/experiments/tabs-preflight.css", scope: ".rain-tabs-preflight",
    pixelValues: ["28px", "32px", "38px"], status: "local-experiment", test: "tests/e2e/tabs-preflight.spec.ts",
  })) return ["Tabs preflight requires its exact local authorization and CSS contract"];
  const failures = [], css = source.replace(/\/\*[\s\S]*?\*\//g, "");
  if (/(?:[;{])\s*--rain-[a-z0-9-]+\s*:|:root|!important|--rain-ref-|#[0-9a-f]{3,8}\b|@import|@font-face|url\(|\\/i.test(css)) failures.push("Tabs preflight must use local scope and public Tokens");
  for (const [, selector] of css.matchAll(/(?:^|[{}])\s*([^{}]+)\{/g)) {
    if (selector.trim().startsWith("@media")) continue;
    if (selector.split(",").some(part => !/^\.rain-tabs-preflight(?=[\s.#:[>]|$)/.test(part.trim()) || /[+~]/.test(part))) failures.push("Tabs preflight selector leaves its local scope");
  }
  for (const [value] of css.matchAll(/(?<![\w-])\d+(?:\.\d+)?px\b/g)) {
    if (!contract.tabsPreflight.pixelValues.includes(value)) failures.push(`Tabs preflight pixel value is not registered: ${value}`);
  }
  const output = getTokenFoundationOutputs(), known = new Set([...Object.keys(output.variables), ...Object.keys(output.typographyVariables)]);
  for (const [, expression] of css.matchAll(/var\(([^)]*)\)/g)) {
    if (!known.has(expression.trim())) failures.push(`Tabs preflight Token is not registered: ${expression.trim()}`);
  }
  for (const [, property, value] of css.matchAll(/(?:[;{])\s*([a-z-]+)\s*:\s*([^;{}]+)(?=;|})/gi)) {
    if (!/(?:color|background|border|outline|shadow|fill|stroke)/i.test(property) || /(?:width|style|radius|offset)$/.test(property)) continue;
    const remainder = value.replace(/var\(\s*--rain-[a-z0-9-]+\s*\)/g, "").trim();
    if (!/^(?:(?:transparent|currentColor|inherit|none|solid|0)\s*)*$/.test(remainder)) failures.push(`Tabs preflight paint must use public Tokens: ${property}`);
  }
  return unique(failures);
}

export function verifyTailwindB2({ root = process.cwd() } = {}) {
  const failures = validateTailwindB2CompositionBridge({ root });
  failures.push(...validateTailwindB2SystemContract({ root }));
  const phase = loadYaml(root, "status/current-phase.yaml", "Dropdown experiment authorization", failures);
  const tabsSources = new Map();
  for (const file of Object.values(tabsPreflightFiles).flat()) {
    const target = join(root, file);
    if (!existsSync(target)) continue;
    if (!lstatSync(target).isFile() || lstatSync(target).isSymbolicLink()) { failures.push(`Tabs preflight must use a regular file: ${file}`); continue; }
    tabsSources.set(file, readFileSync(target, "utf8"));
  }
  if (hasTabsRefinementAuthorization(phase) || tabsSources.size) {
    const contract = loadYaml(root, tailwindB2ContractPath, "Tabs preflight contract", failures);
    failures.push(...validateTabsPreflightInventory({ status: phase, files: tabsSources, protectedPaths: contract?.protectedPaths }));
    failures.push(...validateTabsCssExceptions({ root, source: readFileSync(join(root, "packages/ui/src/styles.css"), "utf8"), contract,
      authorized: hasTabsRefinementAuthorization(phase) && ["component", "documentation"].includes(phase.componentRefinements.tabs.stage) }));
    if (phase?.componentRefinements?.tabs?.stage === "documentation" && contract?.tabsPreflight) failures.push("Retired Tabs preflight cannot retain its runtime CSS permission");
    const source = tabsSources.get("apps/playground/src/experiments/tabs-preflight.css");
    if (source !== undefined) failures.push(...validateTabsPreflightSource({ source, contract, authorized: hasTabsRefinementAuthorization(phase) }));
  }
  if (hasDropdownBatchOneAuthorization(phase)) {
    try {
      for (const filePath of [...dropdownBatchOneFiles.application, ...dropdownBatchOneFiles.workspace, ...dropdownBatchOneFiles.documents]) {
        if (!existsSync(join(root, filePath))) failures.push(`Dropdown comparison file is missing: ${filePath}`);
        if (filePath.endsWith(".tsx") && existsSync(join(root, filePath))) {
          const source = readFileSync(join(root, filePath), "utf8");
          if (/--rain-ref-/.test(source)) failures.push(`Dropdown comparison cannot use private Tokens: ${filePath}`);
          const tree = parseSync(filePath, source);
          if (tree.errors.length) failures.push(`Dropdown comparison cannot be parsed: ${filePath}`);
          const visit = node => {
            if (!node || typeof node !== "object") return;
            if (node.type === "JSXAttribute" && node.name.name === "className" && node.value) {
              failures.push(...validateProtectedTailwindSource({ filePath, source: source.slice(node.value.start, node.value.end) }));
            }
            for (const value of Object.values(node)) if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value === "object") visit(value);
          };
          visit(tree.program);
        }
      }
      failures.push(...validateDropdownReviewSource({
        manifest: JSON.parse(readFileSync(join(root, "apps/playground/src/experiments/headless/manifest.json"), "utf8")),
        source: readFileSync(join(root, "apps/playground/src/experiments/headless/review.css"), "utf8"),
        publicCss: ["tokens", "typography", "focus", "motion"].map(name => readFileSync(join(root, `packages/foundations/src/${name}.css`), "utf8")).join("\n"),
      }));
    } catch (error) { failures.push(`Dropdown comparison cannot be checked: ${error.message}`); }
  }
  const benchmark = loadYaml(root, tailwindB2BenchmarkPath, "Tailwind B2 benchmark", failures);
  const baseline = loadYaml(root, tailwindB2BaselinePath, "Tailwind B2 baseline", failures);
  const readmePath = join(root, tailwindB2ReadmePath);
  if (!existsSync(readmePath)) {
    failures.push(`Tailwind B2 evidence README is missing: ${tailwindB2ReadmePath}`);
  } else {
    const stat = lstatSync(readmePath);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0) {
      failures.push(`Tailwind B2 evidence README must be a non-empty regular non-symbolic file: ${tailwindB2ReadmePath}`);
    } else {
      const readme = readFileSync(readmePath, "utf8");
      for (const statement of ["not-run", "not-measured", "verify:governance", "@rain-next/ui/icons/search", "不表示 Task 2 完成"]) {
        if (!readme.includes(statement)) {
          failures.push(`Tailwind B2 evidence README must state ${statement}`);
        }
      }
    }
  }
  if (benchmark) failures.push(...validateTailwindB2Benchmark(benchmark));
  if (benchmark && baseline) {
    failures.push(...validateTailwindB2Results(baseline, benchmark, { root }));
  }
  return {
    failures,
    trials: baseline?.metadata?.trials ?? "unavailable",
    resultCount: Array.isArray(baseline?.results) ? baseline.results.length : 0,
  };
}

const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === scriptPath) {
  const result = verifyTailwindB2();
  if (result.failures.length > 0) {
    console.error("Tailwind B2 verification failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(
      `Tailwind B2 verification passed: controlled Rain Token theme bridge and machine-readable system contract; baseline trials ${result.trials}; ${result.resultCount} fixed prompt records; unmeasured values require reasons; elapsed time remains secondary.`,
    );
  }
}
