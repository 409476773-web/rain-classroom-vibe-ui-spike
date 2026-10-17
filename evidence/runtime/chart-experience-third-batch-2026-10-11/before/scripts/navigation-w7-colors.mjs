import { createHash } from 'node:crypto';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { colorRegistry, measureColorContrast, validateColorUse } from '../packages/foundations/src/color-registry.ts';
import { getNavigationColorConsumerRegistration } from './verify-token-foundations.mjs';

const ledgerPath = 'evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/navigation-color-consumers.json';
const ledgerSha256 = 'dafd3516d33b9dd6e92ea433a13fd31b8b4d08d8bf49357242c1243f96d72dee';
const minimums = { text: 4.5, 'meaningful-icon': 3, 'meaningful-graphic': 3, 'essential-boundary': 3, surface: 0, 'decorative-boundary': 0, 'native-no-paint': 0 };

export function navigationColorSourceAudit(ledger, registration) {
  const paints = [...ledger.cssConsumers, ...ledger.inlineConsumers];
  for (const row of paints) {
    if (row.minimumContrast !== minimums[row.contentRole]) throw new Error(`Changed content threshold: ${row.id}`);
    if (typeof row.critical !== 'boolean') throw new Error(`Missing original critical-content flag: ${row.id}`);
    for (const requirement of row.additionalRequirements ?? []) if (requirement.minimumContrast !== minimums[requirement.contentRole] || requirement.critical !== true) throw new Error(`Changed mixed-content requirement: ${row.id}`);
    if (row.registrationStatus === 'exact-native-nonpaint' && !['0', 'none', 'transparent', '1px solid transparent', '3px solid transparent'].includes(row.value)) throw new Error(`Unproved no-paint declaration: ${row.id}`);
  }
  const pending = ledger.unresolvedPaints.map(row => ({ ...row, filePath: ledger.cssConsumers.find(paint => paint.id === row.declarationId)?.filePath }));
  if (pending.some(row => !row.filePath) || new Set(pending.map(row => row.declarationId)).size !== pending.length) throw new Error('Pending inventory must reference each exact paint once');
  const categoryFailures = [], propertyMappings = [];
  for (const row of ledger.cssConsumers) {
    // Only a single direct Category reference proves authored token identity.
    const variable = row.value.match(/^var\((--rain-category-[a-z0-9-]+)\)$/)?.[1];
    const reference = row.colorSource.categoryReferences.find(reference => reference.cssVariable === variable);
    if (!reference) continue;
    const token = colorRegistry.find(token => token.id === reference.tokenId);
    if (!token) throw new Error(`Unknown authored Category token: ${row.id}`);
    const role = row.property === 'color' && row.contentRole === 'text' ? 'text'
      : row.property === 'color' && row.contentRole === 'meaningful-icon' ? 'icon'
      : /^(?:border.*-color|outline-color)$/.test(row.property) ? 'border'
      : ['background', 'background-color'].includes(row.property) && row.contentRole === 'surface' ? token.category === 'Fill' ? 'fill' : 'background' : null;
    if (!role) continue;
    const content = { text: 'text', icon: 'meaningful-icon', border: row.contentRole === 'decorative-boundary' ? 'decorative' : 'essential-boundary', fill: 'surface', background: 'surface' }[role];
    // Existing bounded consumer adapters use border-color for a single authored side-color. Keep the original declaration and report this API mapping; it grants no paint/background closure.
    const property = row.property === 'background' ? 'background-color' : /^border-(?:top|right|bottom|left|block-start|block-end|inline-start|inline-end)-color$/.test(row.property) ? 'border-color' : row.property;
    if (property !== row.property && row.property !== 'background') propertyMappings.push({ declarationId: row.id, authoredProperty: row.property, validatorProperty: property, existingMapping: 'scripts/verify-token-foundations.mjs#prepareDropdownColorReview', originalDeclarationAndThresholdChanged: false, automatedConformance: 'unproved' });
    const use = { tokenId: token.id, role, content, property, context: 'local-recipe', recipeId: 'navigation-w7-declared-role-probe', critical: row.critical, evidenceRef: ledgerPath };
    // A Category/property rejection precedes parent validation. No default white parent, fake brand intent or passed use is supplied.
    try { validateColorUse(use); }
    catch (error) {
      if (/^Category does not permit role|^Invalid property for/.test(error.message)) categoryFailures.push({ declarationId: row.id, filePath: row.filePath, selector: row.selector, property: row.property, value: row.value, tokenId: token.id, contentRole: row.contentRole, status: 'declared-role-category-conflict-needs-anatomy-resolution', validator: 'packages/foundations/src/color-registry.ts#validateColorUse', validatorUse: use, failure: error.message, limits: 'Conservative ledger classification can require correction from exact source anatomy. This is a declared contract conflict, not a claim that the visible UI has a readability defect.' });
    }
  }
  return {
    status: 'registered-source-contract-audited-conformance-open', automatedConformance: 'unproved', humanReview: registration.humanReview,
    sourceIntegrity: registration, sourceSuccessors: registration.sourceSuccessors ?? [],
    originalLedger: { path: ledgerPath, sha256: ledgerSha256, cssPaints: ledger.cssConsumers.length, inlinePaints: ledger.inlineConsumers.length },
    thresholds: { text: 4.5, meaningfulContent: 3, roleCounts: Object.fromEntries(Object.keys(minimums).map(role => [role, paints.filter(row => row.contentRole === role).length])), passiveTextKeepsFullThreshold: paints.filter(row => row.contentRole === 'text' && row.critical === false).map(row => row.id) },
    exactNoPaints: ledger.cssConsumers.filter(row => row.registrationStatus === 'exact-native-nonpaint').map(row => row.id),
    categoryFailures, propertyMappings,
    pendingFiles: ledger.sourceFiles.map(file => ({ filePath: file.path, declarationIds: pending.filter(row => row.filePath === file.path).map(row => row.declarationId), automatedConformance: 'unproved' })),
    pendingGroups: registration.pendingGroups,
    findingsAreNotExceptions: true,
    closureRule: 'A registered source is not a conformance pass. Keep actual ancestor/cascade/gradient/native evidence and authored Category eligibility open; manual readability acceptance does not change automatic thresholds.',
  };
}

export function parseRenderedColor(value) {
  const rgb = value.match(/^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/i);
  const srgb = value.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/i);
  const match = rgb ?? srgb;
  if (!match) throw new Error(`Unsupported rendered colour: ${value}`);
  const result = { rgb: match.slice(1, 4).map(channel => Number(channel) * (srgb ? 255 : 1)), alpha: Number(match[4] ?? 1) };
  if (result.rgb.some(channel => !Number.isFinite(channel) || channel < 0 || channel > 255) || !Number.isFinite(result.alpha) || result.alpha < 0 || result.alpha > 1) throw new Error(`Invalid rendered colour: ${value}`);
  return result;
}

export function measureRenderedColor(sample, minimumContrast) {
  if (sample.pendingReason) return { status: 'pending-evidence', reason: sample.pendingReason };
  try {
    const layers = sample.ancestors.map(ancestor => parseRenderedColor(ancestor.backgroundColor));
    const opaque = layers.findIndex(layer => layer.alpha === 1);
    if (opaque < 0) return { status: 'pending-evidence', reason: 'No actual opaque background; no white parent assumed' };
    let background = layers[opaque];
    for (let index = opaque - 1; index >= 0; index--) {
      const layer = layers[index];
      background = { rgb: layer.rgb.map((channel, component) => channel * layer.alpha + background.rgb[component] * (1 - layer.alpha)), alpha: 1 };
    }
    const foreground = parseRenderedColor(sample.foregroundColor);
    const actual = measureColorContrast(foreground, background);
    return { status: actual < minimumContrast ? 'measured-below-original-threshold' : 'measured-ratio-at-or-above-original-threshold', actual, minimumContrast, foreground, background, acceptedException: false, eligibility: 'not-inferred-from-ratio', declarationClosure: 'not-inferred-from-selector-match' };
  } catch (error) { return { status: 'pending-evidence', reason: error.message }; }
}

// Browser observation only: this finite default-state pass does not resolve a CSS cascade or certify every authored declaration.
export async function navigationRenderedColorAudit(page, ledger, browserUrl) {
  const observations = [], coverage = [], faults = [];
  page.on('pageerror', error => faults.push(`pageerror: ${error.message}`));
  page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) faults.push(`HTTP ${response.status()}: ${response.url()}`); });
  const rows = ledger.cssConsumers.filter(row => row.property === 'color' && ['text', 'meaningful-icon'].includes(row.contentRole));
  for (const scene of ['E1', 'E2', 'E3', 'E4', 'E5', 'E6']) {
    const url = new URL(browserUrl); url.hash = scene;
    await page.goto(url.href);
    await page.locator(`.w6-consumer[data-active-task="${scene}"]`).waitFor({ state: 'visible' });
    const active = page.locator(`[data-scene="${scene}"]`);
    const samples = await active.evaluate((root, rows) => {
      const records = [];
      const identity = element => ({ tag: element.tagName, classes: element.className?.baseVal ?? element.className, rainId: element.getAttribute('data-rain-id'), region: element.getAttribute('data-region-id') });
      for (const row of rows) {
        if (row.frames.length || row.selector.includes(':scope') || row.selector.includes('::')) continue;
        let elements;
        try { elements = [...root.querySelectorAll(row.selector)]; } catch { continue; }
        for (const [index, element] of elements.entries()) {
          const box = element.getBoundingClientRect(), css = getComputedStyle(element);
          if (!box.width || !box.height || box.bottom < 0 || box.top > innerHeight || box.right < 0 || box.left > innerWidth || css.visibility !== 'visible') continue;
          const directText = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
          if (row.contentRole === 'text' && !directText && !['INPUT', 'TEXTAREA'].includes(element.tagName)) continue;
          // SVG descendants can contain independent fill/stroke paints; a computed container color alone is insufficient.
          if (row.contentRole === 'meaningful-icon') { records.push({ declarationId: row.id, elementIndex: index, target: identity(element), pendingReason: 'SVG/control inner paint and meaningful shape require their own finite measurement' }); continue; }
          const ancestors = [], problems = [];
          let opaque = false;
          for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
            const style = getComputedStyle(ancestor), owner = identity(ancestor);
            if (style.opacity !== '1' || style.filter !== 'none' || style.backdropFilter !== 'none' || style.mixBlendMode !== 'normal') problems.push('Group opacity/filter/blend requires separate compositing evidence');
            if (!opaque) {
              if (style.backgroundImage !== 'none' || /\binset\b/.test(style.boxShadow)) problems.push('Background image/gradient/inset shadow requires painted-position evidence');
              if (ancestor.matches('.rain-connected-surface') && ancestor.querySelector('.rain-connected-surface__union')) problems.push('Sibling SVG union background requires its own painted-position evidence');
              for (const pseudo of ['::before', '::after']) {
                const paint = getComputedStyle(ancestor, pseudo);
                if (!['none', 'normal'].includes(paint.content) && paint.display !== 'none' && paint.visibility === 'visible' && (paint.backgroundImage !== 'none' || !['rgba(0, 0, 0, 0)', 'transparent'].includes(paint.backgroundColor))) problems.push('Generated overlay paint requires painted-position evidence');
              }
              ancestors.push({ ...owner, backgroundColor: style.backgroundColor });
              // Computed opaque RGB is an actual stopping surface; underlying page paint is not substituted.
              opaque = /^rgb\([^/]*\)$/.test(style.backgroundColor) || /^color\(srgb\s+[\d.]+\s+[\d.]+\s+[\d.]+\)$/.test(style.backgroundColor);
            }
          }
          if (css.textShadow !== 'none') problems.push('Text shadow requires painted-position evidence');
          const x = Math.max(0, Math.min(innerWidth - 1, box.left + box.width / 2)), y = Math.max(0, Math.min(innerHeight - 1, box.top + box.height / 2));
          const top = document.elementFromPoint(x, y);
          if (!top || !(top === element || element.contains(top))) problems.push('Target visibility is clipped, occluded or not directly proved at the sampled position');
          records.push({ declarationId: row.id, elementIndex: index, target: identity(element), text: (element.textContent ?? element.value ?? '').trim().slice(0, 100), foregroundColor: css.color, ancestors, pendingReason: [...new Set(problems)].join('; ') || null });
        }
      }
      return records;
    }, rows);
    for (const sample of samples) {
      const declaration = rows.find(row => row.id === sample.declarationId);
      observations.push({ scene, state: 'initial-current-selection', authoredDeclaration: { id: declaration.id, filePath: declaration.filePath, selector: declaration.selector, value: declaration.value, frames: declaration.frames }, ...sample, measurement: measureRenderedColor(sample, declaration.minimumContrast) });
    }
    coverage.push({ scene, url: page.url(), observations: samples.length, viewport: page.viewportSize(), theme: await page.locator('html').getAttribute('data-rain-theme') });
  }
  return { status: faults.length ? 'runtime-audit-failed' : 'bounded-runtime-measurement-complete-conformance-open', automatedConformance: 'unproved', faults, coverage, observations,
    counts: Object.fromEntries(['measured-below-original-threshold', 'measured-ratio-at-or-above-original-threshold', 'pending-evidence'].map(status => [status, observations.filter(row => row.measurement.status === status).length])),
    limits: ['Initial selected/default states at one recorded viewport only; hover/focus/pressed/disabled/resizing/native/high-contrast/theme matrices remain unproved.', 'Preview URL-to-served-source binding is not inferred; retain the root server provenance before calling an observation current-source evidence.', 'Selector matches can observe the same winning runtime paint through multiple authored declarations; observation count is not unique UI defects or declaration coverage.', 'No CSS scope/container/cascade proof is inferred. The original 810 pending declarations are retained; source Category eligibility and mixed icon/graphic paint remain separate.', 'A measured ratio is not readability approval, colour-family eligibility, an exception or production conformance.'],
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({ options: { root: { type: 'string' }, out: { type: 'string' }, 'browser-url': { type: 'string' } } });
  const root = values.root ?? process.cwd(), source = readFileSync(join(root, ledgerPath), 'utf8');
  if (createHash('sha256').update(source).digest('hex') !== ledgerSha256) throw new Error('Original navigation ledger changed');
  const ledger = JSON.parse(source), registration = getNavigationColorConsumerRegistration(root);
  let result = navigationColorSourceAudit(ledger, registration);
  result.sourceAnatomyIntegrity = [...ledger.domProofSources, ...ledger.contracts].map(file => {
    const actual = createHash('sha256').update(readFileSync(join(root, file.path))).digest('hex');
    if (actual !== file.sha256) throw new Error(`Source anatomy/contract changed: ${file.path}`);
    return { path: file.path, sha256: actual, status: 'exact-original-source-proof-verified' };
  });
  if (values['browser-url']) {
    const url = new URL(values['browser-url']);
    if (!['http:', 'https:'].includes(url.protocol) || !['127.0.0.1', 'localhost'].includes(url.hostname)) throw new Error('Only the intended existing local navigation preview may be audited');
    const { chromium } = await import('@playwright/test');
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage({ viewport: { width: 1343, height: 747 } });
      result = { source: result, runtimeEvidenceInput: { browserUrl: url.href, currentWorkingSourceHashes: ledger.sourceFiles.map(file => ({ path: file.path, currentSHA: createHash('sha256').update(readFileSync(join(root, file.path))).digest('hex'), originalBaselineSHA: file.sha256 })), servedSourceBinding: 'not-inferred-from-working-source-or-URL; root records actual accepted-baseline preview provenance separately', sourceSuccessorsMeasuredByThisSixScenePass: false }, runtime: await navigationRenderedColorAudit(page, ledger, url.href) };
    }
    finally { await browser.close(); }
  }
  if (!values.out) throw new Error('A reviewable evidence --out path is required');
  mkdirSync(dirname(values.out), { recursive: true }); writeFileSync(values.out, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify({ status: result.status ?? result.runtime.status, sourceFiles: registration.sourceFiles, originalPendingPaints: registration.pendingPaints, categoryFailures: (result.source ?? result).categoryFailures.length, runtimeCounts: result.runtime?.counts, evidence: values.out }));
  // Completing the audit does not make unresolved automatic conformance green.
  process.exitCode = 1;
}
