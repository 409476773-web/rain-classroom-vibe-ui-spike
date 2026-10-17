import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { dateTimeOptimizationEvidence, datePickerUxRefinementEvidence, sliderRefinementEvidence, getDateTimeOptimizationSourceBindings, getSliderRefinementSourceBindings, parseYamlSubset } from "./verification-helpers.mjs";
import { measureColorContrast, resolveColor, resolveColorSurface } from "../packages/foundations/src/color-registry.ts";

export const g5ColorLedger = "evidence/runtime/g5-components-2026-10-12/color-consumers.json";
function getPreviousG5ColorConsumers(root = process.cwd()) {
  const source = readFileSync(join(root, g5ColorLedger), "utf8");
  if (createHash("sha256").update(source).digest("hex") !== "56eb522eaa2df75846531b2d7c783bc1e6133de452c886626a74799652cf10eb") throw new Error("G5 colors must retain their finite declarations, reading roles and surfaces");
  const original = JSON.parse(source);
  const phasePath = join(root, "status/current-phase.yaml");
  const phase = existsSync(phasePath) ? parseYamlSubset(readFileSync(phasePath, "utf8")) : {};
  if (!Object.hasOwn(phase?.componentRefinements ?? {}, "dateTimeOptimization")) return original;
  const bindings = getDateTimeOptimizationSourceBindings(root, phase);
  const ledgerPath = dateTimeOptimizationEvidence + "color-consumers.json";
  const ledger = JSON.parse(readFileSync(join(root, ledgerPath), "utf8"));
  const paths = ["packages/ui/src/calendar/calendar.css", "packages/ui/src/date-picker/date-picker.css", "apps/playground/src/docs/components/g5-component-pages.css"];
  if (!bindings.sourceFiles[ledgerPath] || ledger.kind !== "DateTimeOptimizationFiniteColorConsumers"
    || ledger.scope !== "calendar-date-picker-assignment-exam-time-ranges" || ledger.humanGate !== "awaiting_human" || ledger.contrastAcceptance !== "not-granted"
    || JSON.stringify(Object.keys(ledger.sourceFiles ?? {}).sort()) !== JSON.stringify([...paths].sort())
    || ledger.colorRecipeConsumers?.length !== 0
    || !Array.isArray(ledger.colorCssConsumers) || !Array.isArray(ledger.nativeCssConsumers)
    || [...ledger.colorCssConsumers, ...ledger.nativeCssConsumers].some(row => !paths.includes(row.filePath))
    || ledger.colorCssConsumers.some(row => row.contrastReview !== "pending-review" || row.use?.evidenceRef !== "docs/plans/2026-10-12-date-time-optimization-design.md"
      || (row.value.includes("color-mix(") || row.use?.alpha !== undefined || row.use?.alphaOperation !== undefined || row.use?.componentOpacity !== undefined)
        && !(row.filePath === "packages/ui/src/calendar/calendar.css" && row.selector === ".rain-calendar__preview:not([data-selected])" && row.property === "background"
          && row.value === "color-mix(in srgb, var(--rain-category-fill-brand-alpha-4) 50%, transparent)"
          && row.use.tokenId === "Fill/Brand/Alpha/4" && row.use.alpha === 5 && row.use.alphaOperation === "replace" && row.use.componentOpacity === undefined))) {
    throw new Error("Date-time colors require the exact finite successor ledger without transferring acceptance");
  }
  const merged = { ...original,
    sourceFiles: { ...original.sourceFiles, ...ledger.sourceFiles },
    colorCssConsumers: [...original.colorCssConsumers.filter(row => !paths.includes(row.filePath)), ...ledger.colorCssConsumers],
    nativeCssConsumers: [...original.nativeCssConsumers.filter(row => !paths.includes(row.filePath)), ...ledger.nativeCssConsumers],
  };
  const refinement = phase.componentRefinements.dateTimeOptimization.uxRefinement;
  if (!refinement) return merged;
  // The parent reader above validates the child proof before returning the frozen parent bindings.
  const uxBindings = JSON.parse(readFileSync(join(root, refinement.sourceBindings), "utf8"));
  const uxLedgerPath = datePickerUxRefinementEvidence + "color-consumers.json";
  const uxLedger = JSON.parse(readFileSync(join(root, uxLedgerPath), "utf8"));
  const uxFile = "packages/ui/src/date-picker/date-picker.css";
  if (!uxBindings.sourceFiles[uxLedgerPath] || uxLedger.kind !== "DatePickerUxRefinementFiniteColorConsumers"
    || uxLedger.scope !== "date-picker-panel-time-input-endpoints-validation-narrow-keyboard" || uxLedger.humanGate !== "awaiting_human" || uxLedger.contrastAcceptance !== "not-granted"
    || JSON.stringify(Object.keys(uxLedger.sourceFiles ?? {})) !== JSON.stringify([uxFile])
    || uxLedger.colorRecipeConsumers?.length !== 0 || !Array.isArray(uxLedger.colorCssConsumers) || !Array.isArray(uxLedger.nativeCssConsumers)
    || [...uxLedger.colorCssConsumers, ...uxLedger.nativeCssConsumers].some(row => row.filePath !== uxFile)
    || uxLedger.colorCssConsumers.some(row => row.contrastReview !== "pending-review" || row.use?.evidenceRef !== "docs/plans/2026-10-12-date-picker-ux-refinement.md"
      || row.value.includes("color-mix(") || row.use?.alpha !== undefined || row.use?.alphaOperation !== undefined || row.use?.componentOpacity !== undefined)) {
    throw new Error("DatePicker UX colors require their exact finite successor ledger without transferring acceptance");
  }
  return { ...merged, sourceFiles: { ...merged.sourceFiles, ...uxLedger.sourceFiles },
    colorCssConsumers: [...merged.colorCssConsumers.filter(row => row.filePath !== uxFile), ...uxLedger.colorCssConsumers],
    nativeCssConsumers: [...merged.nativeCssConsumers.filter(row => row.filePath !== uxFile), ...uxLedger.nativeCssConsumers],
  };
}
export function getG5ColorConsumers(root = process.cwd()) {
  const previous = getPreviousG5ColorConsumers(root);
  const phasePath = join(root, "status/current-phase.yaml");
  const phase = existsSync(phasePath) ? parseYamlSubset(readFileSync(phasePath, "utf8")) : {};
  if (!Object.hasOwn(phase?.componentRefinements ?? {}, "sliderRefinement")) return previous;
  const bindings = getSliderRefinementSourceBindings(root, phase);
  const ledgerPath = sliderRefinementEvidence + "color-consumers.json";
  const ledger = JSON.parse(readFileSync(join(root, ledgerPath), "utf8"));
  const paths = ["packages/ui/src/slider/slider.css", "apps/playground/src/docs/components/slider-examples.css"];
  if (!bindings.sourceFiles[ledgerPath] || ledger.kind !== "SliderRefinementFiniteColorConsumers"
    || ledger.scope !== phase.componentRefinements.sliderRefinement.scope || ledger.humanGate !== "awaiting_human" || ledger.contrastAcceptance !== "not-granted"
    || JSON.stringify(Object.keys(ledger.sourceFiles ?? {})) !== JSON.stringify(paths)
    || ledger.colorRecipeConsumers?.length !== 0 || !Array.isArray(ledger.colorCssConsumers) || !Array.isArray(ledger.nativeCssConsumers)
    || [...ledger.colorCssConsumers, ...ledger.nativeCssConsumers].some(row => !paths.includes(row.filePath))
    || ledger.colorCssConsumers.some(row => row.contrastReview !== "pending-review" || row.use?.evidenceRef !== "docs/plans/2026-10-13-slider-refinement.md"
      || row.value.includes("color-mix(") || row.use?.alpha !== undefined || row.use?.alphaOperation !== undefined || row.use?.componentOpacity !== undefined)) {
    throw new Error("Slider colors require their exact finite successor ledger without transferring acceptance");
  }
  return { ...previous, sourceFiles: { ...previous.sourceFiles, ...ledger.sourceFiles },
    colorCssConsumers: [...previous.colorCssConsumers.filter(row => !paths.includes(row.filePath)), ...ledger.colorCssConsumers],
    nativeCssConsumers: [...previous.nativeCssConsumers.filter(row => !paths.includes(row.filePath)), ...ledger.nativeCssConsumers],
  };
}

export function verifyG5ColorSources(root = process.cwd()) {
  const ledger = getG5ColorConsumers(root);
  for (const [file, expected] of Object.entries(ledger.sourceFiles)) {
    if (createHash("sha256").update(readFileSync(join(root, file))).digest("hex") !== expected) throw new Error(`G5 color source changed: ${file}`);
  }
  return ledger;
}
export function prepareG5NativePaints(filePath, source, root = process.cwd()) {
  const rows = getG5ColorConsumers(root).nativeCssConsumers.filter(row => row.filePath === filePath);
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, comment => " ".repeat(comment.length));
  const found = new Set(), ranges = [];
  for (const block of clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = block[1].trim().replace(/\s+/g, " ");
    const bodyStart = block.index + block[0].indexOf("{") + 1;
    for (const declaration of block[2].matchAll(/([a-z-]+)\s*:\s*([^;{}]+);/g)) {
      const row = rows.find(row => !found.has(row) && row.selector === selector && row.property === declaration[1] && row.value === declaration[2].trim());
      if (row) { found.add(row); ranges.push([bodyStart + declaration.index, bodyStart + declaration.index + declaration[0].length]); }
    }
  }
  if (found.size !== rows.length) throw new Error(`G5 native/platform or inherited focus paint changed: ${filePath}`);
  for (const [start, end] of ranges.reverse()) source = source.slice(0, start) + " ".repeat(end - start) + source.slice(end);
  return source;
}
export function resolveG5ConsumerPaint(use) {
  const value = resolveColor(use.tokenId, use.theme);
  return use.alpha === undefined ? value : { ...value, alpha: use.alpha / 100 };
}
export function measureG5StateContrast(ledger = getG5ColorConsumers()) {
  return ledger.colorCssConsumers.filter(row => row.requiredStateContrast).flatMap(row => ["light", "dark"].flatMap(theme => row.parentSurfaces.map(parentSurfaceId => ({
    filePath: row.filePath, selector: row.selector, tokenId: row.use.tokenId, theme, parentSurfaceId,
    actual: measureColorContrast(resolveG5ConsumerPaint({ ...row.use, theme }), resolveColorSurface(parentSurfaceId, theme, "Background/Neutral/1")),
    minimum: row.requiredStateContrast, acceptedException: false, status: "pending-review",
  }))));
}
