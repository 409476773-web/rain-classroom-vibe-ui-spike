import { createHash } from 'node:crypto';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { resolveColor, measureColorContrast, validateColorUse, colorCategoryProfiles } from '../packages/foundations/src/color-registry.ts';
import { buttonColorRecipes } from '../packages/foundations/src/button-token-contract.ts';
import { getNavigationColorConsumerRegistration } from './verify-token-foundations.mjs';

const ledgerPath = 'evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/navigation-color-consumers.json';
const ledgerSha256 = 'dafd3516d33b9dd6e92ea433a13fd31b8b4d08d8bf49357242c1243f96d72dee';
const decisionPath = 'evidence/runtime/navigation-v042/w7/closure-2026-10-06/colors/role-anatomy-resolution.json';
const sha = source => createHash('sha256').update(source).digest('hex');
const probe = use => {
  try { return { use, result: validateColorUse(use), status: 'declared-use-validates-no-runtime-proof', rolePropertyPermitted: true }; }
  catch (error) { return { use, failure: error.message, rolePropertyPermitted: !/^Category does not permit role|^Invalid property for/.test(error.message), status: 'declared-use-rejected' }; }
};

export function verifyNavigationAnatomyRecords(ledger, decisions, readSource) {
  const expected = ['0281', '0312', '0928', '0944', '0946', '0983', '1031', '1071', '1093', '1096', '1128', '1258', '1261', '1263'].map(id => `nav-color-${id}`);
  if (JSON.stringify(decisions.records.map(row => row.declarationId).sort()) !== JSON.stringify(expected)) throw new Error('Anatomy decisions must cover the exact fourteen remaining declarations');
  if (decisions.originalLedgerSha256 !== ledgerSha256) throw new Error('Anatomy ledger identity changed');
  return decisions.records.map(row => {
    const original = ledger.cssConsumers.find(paint => paint.id === row.declarationId);
    for (const [key, value] of Object.entries(row.source)) if (JSON.stringify(original?.[key]) !== JSON.stringify(value)) throw new Error(`Anatomy source tuple changed: ${row.declarationId}/${key}`);
    for (const proof of row.sourceProofs) {
      const source = readSource(proof.path);
      if (sha(source) !== proof.sha256 || source.split(proof.fragment).length - 1 !== 1 || source.split('\n')[proof.line - 1] !== proof.fragment) throw new Error(`Anatomy source proof changed: ${row.declarationId}/${proof.path}`);
    }
    if (row.originalLedgerChanged !== false || row.originalThresholdChanged !== false) throw new Error('No original declaration or threshold may be replaced by this adjudication');
    return { ...row, validatorResults: row.validatorUses.map(probe), weakNeutralEligibilityStillRequired: row.validatorUses.some(use => colorCategoryProfiles.some(profile => profile.weakIds.includes(use.tokenId))),
      eligibleForMetadataCorrectionWithoutPaintChange: ['metadata-role-misclassification', 'metadata-property-role-misclassification'].includes(row.decisionStatus),
      metadataCorrectionIsNotAutomaticConformance: true };
  });
}

function sourceFact(root, ledger, path, fragment) {
  const source = readFileSync(join(root, path), 'utf8');
  const matches = source.split('\n').map((line, index) => ({ line, number: index + 1 })).filter(row => row.line.includes(fragment));
  if (matches.length !== 1) throw new Error(`Source fact is not unique: ${path}/${fragment}`);
  const original = [...ledger.sourceFiles, ...ledger.domProofSources, ...ledger.contracts].find(file => file.path === path);
  const currentSHA = sha(source);
  if (original && original.sha256 !== currentSHA) throw new Error(`Source fact no longer matches original proof: ${path}`);
  return { path, currentSHA, line: matches[0].number, fragment: matches[0].line, boundary: original ? 'existing-ledger-source' : 'current-source-fact-not-new-human-acceptance' };
}

export function navigationReplacementProbe(ledger) {
  return ['0031', '0074', '0077'].map(id => {
    const row = ledger.cssConsumers.find(paint => paint.id === `nav-color-${id}`);
    const role = id === '0077' ? 'icon' : 'text', tokenId = id === '0077' ? 'Icon/Brand/2' : 'Text/Brand/2';
    const use = { tokenId: 'Fill/Brand/Solid/2', role, property: 'color', content: row.contentRole, context: 'local-recipe', recipeId: 'navigation-w7-source-anatomy-probe', critical: true, evidenceRef: ledgerPath };
    const themes = ['light', 'dark'].map(theme => {
      const current = resolveColor(use.tokenId, theme), candidate = resolveColor(tokenId, theme);
      const parents = ['Background/Neutral/3', 'Background/Neutral/1', 'authored-selected-fill-#edf3ff'].map(parent => {
        const background = parent.startsWith('Background/') ? resolveColor(parent, theme) : { rgb: [237, 243, 255], alpha: 1 };
        return { parent, background, currentRatio: measureColorContrast(current, background), candidateRatio: measureColorContrast(candidate, background), minimumContrast: row.minimumContrast, proof: 'authored-parent/theme-model-only-not-runtime-cascade' };
      });
      return { theme, current, candidate, identicalPaint: JSON.stringify(current) === JSON.stringify(candidate), parents };
    });
    return { declarationId: row.id, source: { filePath: row.filePath, selector: row.selector, frames: row.frames, property: row.property, value: row.value, occurrence: row.occurrence }, actualContentRole: row.contentRole, sourceRoleReason: id === '0031' ? 'NavigationBar/Tabs labels contain visible text; hover color is inherited by the label.' : id === '0074' ? 'Scope result strong renders item.label; its small description has a separate paint.' : 'Selected CheckBoldIcon visually communicates selected state; aria-hidden prevents duplicated accessible information, not the meaningful visual paint.',
      currentFailure: probe(use), minimalCategoryCandidate: tokenId, candidateRoleProbe: probe({ ...use, tokenId }), themes,
      contexts: ['Whole page Light: Light values', 'Whole page Dark: modeled Dark values; runtime coverage pending', 'Inverse platform on Light page: data-rain-theme=dark is scoped to global region; these outer navigation/result consumers stay Light'],
      conclusion: 'Category substitution preserves Light RGB exactly and improves modeled Dark ratios on actual dark-neutral parents, but worsens contrast on the unchanged raw selected-fill. Dark Icon candidate is 2.987103578836599 on #edf3ff, below 3. No substitution or background change adopted; actual state/cascade/parent and brand intent still need evidence.' };
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({ options: { root: { type: 'string' }, out: { type: 'string' } } });
  const root = values.root ?? process.cwd(), source = readFileSync(join(root, ledgerPath), 'utf8');
  if (sha(source) !== ledgerSha256) throw new Error('Original navigation ledger changed');
  const ledger = JSON.parse(source), decisions = JSON.parse(readFileSync(join(root, decisionPath), 'utf8'));
  const registration = getNavigationColorConsumerRegistration(root);
  const records = verifyNavigationAnatomyRecords(ledger, decisions, path => readFileSync(join(root, path), 'utf8'));
  const primary = buttonColorRecipes.filter(recipe => recipe.variant === 'primary' && recipe.tone === 'default' && ['default', 'hover', 'pressed'].includes(recipe.state)).map(recipe => ({ recipeId: recipe.id, state: recipe.state, borders: recipe.parts.filter(part => part.part === 'border') }));
  const fillBorders = buttonColorRecipes.flatMap(recipe => recipe.parts.filter(part => part.part === 'border' && part.use.tokenId.startsWith('Fill/')).map(part => ({ recipeId: recipe.id, part })));
  if (fillBorders.length) throw new Error('Button contract has acquired a Fill border use; adjudication must be rechecked');
  const sourceFacts = [
    ['packages/foundations/src/color-registry.ts', 'text: ["color"], icon: ["color"], border:'],
    ['packages/foundations/src/button-token-contract.ts', 'let background: string | null = null, border:'],
    ['packages/ui/src/navigation/navigation.tsx', '<span className="rain-tabs__label" data-label={item.label}>'],
    ['packages/ui/src/navigation/navigation.tsx', '<span className="rain-scope-navigation__result-label"><strong>{item.label}</strong>'],
    ['packages/ui/src/navigation/navigation.tsx', '<CheckBoldIcon className="rain-scope-navigation__check"'],
    ['packages/ui/src/navigation/navigation.tsx', 'className="rain-navigation-scope-popup rain-navigation-scope-dropdown"'],
    ['packages/ui/src/navigation/navigation.css', '--rain-local-navigation-selected-fill: #edf3ff;'],
    ['packages/ui/src/navigation/navigation.css', 'background:var(--rain-category-background-neutral-1);'],
    ['apps/playground/src/recipes/navigation-w6/consumer.css', '.w6-consumer {'],
    ['apps/playground/src/recipes/navigation-w6/consumer-app.tsx', '<NavigationBar aria-label="W6独立消费任务"'],
    ['apps/playground/src/recipes/navigation-v042/platform-navigation.css', '.rain-workspace:is(.nv42-r2,.nv43-workspace,.nv5-workspace,.nv44-workspace) .rain-workspace__region[data-region-id="global"][data-rain-theme="dark"] {'],
  ].map(([path, fragment]) => sourceFact(root, ledger, path, fragment));
  const result = { status: 'exact-anatomy-and-category-probes-complete-conformance-open', automatedConformance: 'unproved', originalLedger: { path: ledgerPath, sha256: ledgerSha256 }, decisionTable: { path: decisionPath, sha256: sha(readFileSync(join(root, decisionPath))) }, sourceSuccessors: registration.sourceSuccessors, records,
    counts: { metadataCanBeCorrectedWithoutPaintChange: records.filter(row => row.eligibleForMetadataCorrectionWithoutPaintChange).length, mixedContainerOrOverrideNeedsFurtherEvidence: 2, realConsumerCategoryPropertyConflicts: 3, explicitNavigationHoverCheckConflicts: 3 },
    buttonContract: { sourceFact: sourceFacts[1], primary, fillBorders, conclusion: 'Same-color/decorative border is not a Fill border permission. Current Button primary default/hover have no border; pressed uses Border/Brand/1. Geometry/paint of any transparent-border candidate must be verified separately.' },
    sourceFacts, replacements: navigationReplacementProbe(ledger), originalLedgerChanged: false, originalThresholdsChanged: false,
    limits: ['Anatomy decisions preserve original conservative rows and thresholds. A future exact registration can correct nine classifications without changing paint; this does not resolve weak-neutral eligibility, actual background/state/cascade or the 810 baseline pending declarations.', 'Category/property probes intentionally omit unknown parents and guessed brand intent. Eligible role/property is not a valid full consumer use.', 'Source facts and replacement theme calculations are not browser paint facts, new human approval, accepted exceptions or a global Dark-mode pass.'] };
  if (!values.out) throw new Error('A reviewable --out path is required');
  mkdirSync(dirname(values.out), { recursive: true }); writeFileSync(values.out, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify({ status: result.status, counts: result.counts, evidence: values.out }));
  process.exitCode = 1;
}
