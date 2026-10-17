import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { g4SizingReviewSourcePaths, getG4SizingReviewSourceBindings, getG4SourceBindings, getG4VisualRefinementSourceBindings, parseYamlSubset } from '../../../scripts/verification-helpers.mjs';
import { getG4ColorConsumers, getTokenFoundationOutputs } from '../../../scripts/token-foundation-outputs.mjs';
import { validateRegisteredRecipeColors } from '../../../scripts/verify-token-foundations.mjs';
import { measureColorContrast, resolveColor, resolveColorSurface } from '../../../packages/foundations/src/color-registry.ts';

const root = process.cwd(), evidence = 'evidence/runtime/g4-review-sizing-2026-10-11/';
const bytes = file => readFileSync(join(root, file));
const sha = file => createHash('sha256').update(bytes(file)).digest('hex');
const save = (file, value) => writeFileSync(join(root, evidence + file), JSON.stringify(value, null, 2) + '\n');
const baseline = JSON.parse(bytes(evidence + 'baseline.json'));
assert.equal(Object.keys(baseline.files).length, 81);
for (const [file, expected] of Object.entries(baseline.files)) assert.equal(sha(evidence + 'before/' + file), expected);
const phase = parseYamlSubset(bytes('status/current-phase.yaml').toString()), entry = phase.componentRefinements.g4Components.sizingReview;
const sourceFiles = Object.fromEntries(g4SizingReviewSourcePaths.map(file => [file, { before: baseline.files[file] ?? null, after: sha(file) }]));
const retainedRecords = Object.fromEntries(Object.entries(baseline.files).filter(([file]) => !g4SizingReviewSourcePaths.includes(file) && file !== 'status/current-phase.yaml'));
save('source-bindings.json', { kind: 'G4SizingReviewSourceBindings', authorizedAt: '2026-10-11', scope: entry.scope, baseline: { path: evidence + 'baseline.json', sha256: sha(evidence + 'baseline.json') }, sourceFiles, retainedRecords });
getG4SizingReviewSourceBindings(root, phase);
const original = getG4SourceBindings(root, phase), visual = getG4VisualRefinementSourceBindings(root, phase);
const binding = { path: evidence + 'source-bindings.json', sha256: sha(evidence + 'source-bindings.json') };
save('source-integrity.json', { kind: 'G4SizingReviewSourceIntegrity', status: 'passed-scoped', sourceBindings: binding,
  actualBaseline: { path: evidence + 'baseline.json', sha256: sha(evidence + 'baseline.json'), savedOriginalShaCount: 81, allSavedOriginalShasValidated: true },
  sourceFileCount: Object.keys(sourceFiles).length, retainedRecordCount: Object.keys(retainedRecords).length,
  predecessorChecks: { originalG4SourceCount: Object.keys(original.sourceFiles).length, originalG4RetainedCount: Object.keys(original.retainedRecords).length,
    visualSourceCount: Object.keys(visual.sourceFiles).length, visualRetainedCount: Object.keys(visual.retainedRecords).length, prior58ActualBeforeShasValidated: true, allOriginalRecordBytesPreserved: true },
  phase: { implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview, humanGate: entry.humanGate },
});
const consumers = getG4ColorConsumers(), outputs = getTokenFoundationOutputs(); outputs.colorRecipeConsumers.push(...consumers.colorRecipeConsumers); outputs.colorCssConsumers.push(...consumers.colorCssConsumers);
save('color-consumers.json', { kind: 'G4SizingReviewColorConsumers', sourceBindings: binding, ...consumers });
const paths = ['packages/ui/src/item/item.tsx', 'packages/ui/src/item/item.css', 'packages/ui/src/progress/progress.tsx', 'packages/ui/src/progress/progress.css', 'apps/playground/src/docs/components/g4-component-pages.tsx', 'apps/playground/src/docs/components/g4-component-pages.css'];
const checks = paths.map(filePath => ({ filePath, sourceSha256: sha(filePath), failures: validateRegisteredRecipeColors({ filePath, source: bytes(filePath).toString(), outputs, root }) }));
const old = JSON.parse(bytes(evidence + 'before/evidence/runtime/g4-visual-refinement-2026-10-11/color-verification.json'));
const arrow = consumers.colorCssConsumers.find(row => row.selector === '.g4-doc-link-icon');
assert.equal(arrow.use.tokenId, 'Icon/Neutral/3'); assert.equal(arrow.use.content, 'meaningful-icon'); assert.equal(arrow.use.critical, true); assert.equal(arrow.use.interaction, 'interactive');
const measurements = [...old.measurements, ...['light', 'dark'].map(theme => ({ filePath: arrow.filePath, recipeId: arrow.use.recipeId, part: '.g4-doc-link-icon color', tokenId: arrow.use.tokenId, theme, parentSurfaceId: 'Background/Neutral/1', parentBackgroundId: null, content: arrow.use.content, critical: true, minimum: 3 }))].map(row => {
  const actual = measureColorContrast(resolveColor(row.tokenId, row.theme), resolveColorSurface(row.parentSurfaceId, row.theme, row.parentBackgroundId ?? undefined));
  return { ...row, actual, passed: row.minimum === null || actual >= row.minimum };
});
const failed = checks.some(row => row.failures.length) || measurements.some(row => !row.passed);
save('color-verification.json', { kind: 'G4SizingReviewScopedColorVerification', status: failed ? 'failed' : 'passed-scoped', sourceBindings: binding,
  scope: 'existing G4 exact Category declarations and light/dark opaque parent surfaces plus critical interactive navigation icon at unchanged 3:1 threshold', checks,
  measurementCount: measurements.length, requiredContrastMeasurementCount: measurements.filter(row => row.minimum !== null).length, failedMeasurementCount: measurements.filter(row => !row.passed).length,
  measurements, copiedExample: { source: 'apps/playground/src/docs/components/g4-component-pages.tsx#itemLinkCode', className: 'text-rain-category-icon-neutral-3', host: 'ItemMedia', asset: '@rain-next/ui/icons/arrow-right', qualification: 'static displayed code text checked separately; its one exact class occurrence is not counted as a live DOM paint; all actual page paints remain registered and measured' }, priorMeasurementInventory: { source: 'evidence/runtime/g4-visual-refinement-2026-10-11/color-verification.json', sha256: baseline.files['evidence/runtime/g4-visual-refinement-2026-10-11/color-verification.json'], basis: 'retained exact prior measurement roles and parent surfaces, all numeric contrast values recomputed from current palette; two new arrow measurements appended' },
  humanGate: 'awaiting_human', contrastAcceptance: 'not-granted', forcedColors: '.g4-doc-link-icon color:inherit only; inherited host colors checked separately at runtime',
});
assert.equal(failed, false, 'Current scoped color checks must pass');
console.log(`G4 sizing evidence refreshed: ${Object.keys(sourceFiles).length} current bindings; 81 actual before SHAs; original 38+10 and visual 18+7 inventories; ${measurements.length} fresh contrast measurements.`);
