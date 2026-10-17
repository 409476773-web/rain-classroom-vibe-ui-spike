import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { navigationColorSourceAudit, parseRenderedColor, measureRenderedColor } from './navigation-w7-colors.mjs';
import { verifyNavigationAnatomyRecords, navigationReplacementProbe } from './navigation-w7-color-anatomy.mjs';

it('keeps actual alpha parents, original thresholds, authored categories and incomplete coverage visible', () => {
  const sample = { foregroundColor: 'rgb(0, 0, 0)', ancestors: [{ backgroundColor: 'color(srgb 1 1 1 / 0.51)' }, { backgroundColor: 'rgb(0, 0, 0)' }] };
  const measured = measureRenderedColor(sample, 4.5);
  expect(measured.background!.rgb).toEqual([130.05, 130.05, 130.05]);
  expect(measured.status).toBe('measured-ratio-at-or-above-original-threshold');
  expect(measured.acceptedException).toBe(false);
  expect(measureRenderedColor({ foregroundColor: 'rgb(150, 150, 150)', ancestors: [{ backgroundColor: 'rgb(255, 255, 255)' }] }, 4.5).status).toBe('measured-below-original-threshold');
  expect(measureRenderedColor({ ...sample, ancestors: [{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }] }, 4.5).status).toBe('pending-evidence');
  expect(measureRenderedColor({ ...sample, pendingReason: 'gradient' }, 4.5)).toEqual({ status: 'pending-evidence', reason: 'gradient' });
  expect(() => parseRenderedColor('rgb(300, 0, 0)')).toThrow();
  expect(measureRenderedColor({ ...sample, foregroundColor: 'CanvasText' }, 4.5).status).toBe('pending-evidence');

  const ledger: any = { cssConsumers: [{ id: 'paint', filePath: 'case.css', selector: '.label', property: 'color', value: 'var(--rain-category-fill-brand-solid-2)', contentRole: 'text', minimumContrast: 4.5, critical: true, colorSource: { categoryReferences: [{ cssVariable: '--rain-category-fill-brand-solid-2', tokenId: 'Fill/Brand/Solid/2' }] } }], inlineConsumers: [], unresolvedPaints: [{ declarationId: 'paint', groupingHint: 'ancestor' }], sourceFiles: [{ path: 'case.css' }] };
  const audit = navigationColorSourceAudit(ledger, { humanReview: { status: 'completed-human-review' }, pendingGroups: [{ reason: 'ancestor', declarationIds: ['paint'] }] });
  expect(audit.automatedConformance).toBe('unproved');
  expect(audit.categoryFailures).toHaveLength(1);
  expect(audit.pendingFiles[0].declarationIds).toEqual(['paint']);
  const sideBorder = structuredClone(ledger);
  Object.assign(sideBorder.cssConsumers[0], { property: 'border-left-color', value: 'var(--rain-category-border-brand-1)', contentRole: 'essential-boundary', minimumContrast: 3, colorSource: { categoryReferences: [{ cssVariable: '--rain-category-border-brand-1', tokenId: 'Border/Brand/1' }] } });
  const borderAudit = navigationColorSourceAudit(sideBorder, {});
  expect(borderAudit.categoryFailures).toHaveLength(0);
  expect(borderAudit.propertyMappings).toMatchObject([{ authoredProperty: 'border-left-color', validatorProperty: 'border-color', automatedConformance: 'unproved' }]);
  const invalid = structuredClone(ledger); invalid.cssConsumers[0].minimumContrast = 3;
  expect(() => navigationColorSourceAudit(invalid, {})).toThrow('Changed content threshold');
  const wrongCritical = structuredClone(ledger); delete wrongCritical.cssConsumers[0].critical;
  expect(() => navigationColorSourceAudit(wrongCritical, {})).toThrow('Missing original critical-content flag');
  const missingParent = structuredClone(ledger); missingParent.unresolvedPaints[0].declarationId = 'missing';
  expect(() => navigationColorSourceAudit(missingParent, {})).toThrow('Pending inventory');
});

it('verifies exact source anatomy and keeps the Dark selected-fill regression visible', () => {
  const root = process.cwd();
  const read = (path: string) => readFileSync(join(root, path), 'utf8');
  const ledger = JSON.parse(read('evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/navigation-color-consumers.json'));
  const decisions = JSON.parse(read('evidence/runtime/navigation-v042/w7/closure-2026-10-06/colors/role-anatomy-resolution.json'));
  const records = verifyNavigationAnatomyRecords(ledger, decisions, read);
  expect(records.filter((row: any) => row.eligibleForMetadataCorrectionWithoutPaintChange)).toHaveLength(9);
  expect(records.find((row: any) => row.declarationId === 'nav-color-1093').validatorResults.map((row: any) => row.failure)).toEqual(['Category does not permit role border', 'Invalid property for fill']);
  expect(records.find((row: any) => row.declarationId === 'nav-color-0281').weakNeutralEligibilityStillRequired).toBe(true);
  const changed = structuredClone(decisions); changed.records[0].sourceProofs[0].fragment += ' changed';
  expect(() => verifyNavigationAnatomyRecords(ledger, changed, read)).toThrow('Anatomy source proof changed');
  const check = navigationReplacementProbe(ledger)[2]!;
  expect(check.currentFailure.failure).toBe('Category does not permit role icon');
  expect(check.themes[0]!.identicalPaint).toBe(true);
  const rawDark = check.themes[1]!.parents.find((row: any) => row.parent === 'authored-selected-fill-#edf3ff')!;
  expect(rawDark.currentRatio).toBeGreaterThan(3);
  expect(rawDark.candidateRatio).toBeLessThan(3);
});
