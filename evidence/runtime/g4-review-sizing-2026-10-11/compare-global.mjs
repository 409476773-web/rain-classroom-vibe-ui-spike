import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const evidence = 'evidence/runtime/g4-review-sizing-2026-10-11/', checks = {};
const sha = file => createHash('sha256').update(readFileSync(file)).digest('hex');
const counts = rows => rows.reduce((result, line) => (result[line] = (result[line] ?? 0) + 1, result), {});
for (const name of ['tokens', 'tailwind-b2', 'workspace', 'boundaries', 'evidence']) {
  const beforeLog = evidence + name + '-before-view.log', currentLog = evidence + name + '-global-current.log';
  const captured = readFileSync(beforeLog, 'utf8').trimEnd().split('\n');
  assert(captured[0].startsWith('G4 sizing before view self-checks passed: 81 '));
  const before = captured.slice(1), current = readFileSync(currentLog, 'utf8').trimEnd().split('\n');
  const beforeCounts = counts(before), currentCounts = counts(current), added = [], removed = [];
  for (const [line, count] of Object.entries(currentCounts)) for (let i = beforeCounts[line] ?? 0; i < count; i++) added.push(line);
  for (const [line, count] of Object.entries(beforeCounts)) for (let i = currentCounts[line] ?? 0; i < count; i++) removed.push(line);
  checks[name] = { script: 'scripts/verify-' + (name === 'tokens' ? 'token-foundations' : name) + '.mjs',
    before: { exitCode: 1, log: beforeLog, sha256: sha(beforeLog), diagnosticLines: before.length },
    current: { exitCode: 1, log: currentLog, sha256: sha(currentLog), diagnosticLines: current.length },
    rawDiagnosticEquality: JSON.stringify(before) === JSON.stringify(current), rawDiagnosticDifferences: { added, removed },
  };
  console.log(`${name}: exit1 → exit1; ${before.length} → ${current.length} diagnostic lines; ${added.length} added, ${removed.length} removed.`);
}
writeFileSync(evidence + 'global-before-current-comparison.json', JSON.stringify({ kind: 'G4SizingReviewGlobalBeforeCurrentVerifierComparison',
  status: Object.values(checks).every(row => row.rawDiagnosticEquality) ? 'legacy-global-failures-preserved-exactly' : 'legacy-global-failures-persist-with-raw-diagnostic-deltas',
  globalVerification: 'failed-before-view-and-current', newScopeVerification: 'passed-scoped-separate-from-global',
  method: { runner: evidence + 'global-before-view.mjs', runnerSha256: sha(evidence + 'global-before-view.mjs'), nodeVersion: process.version,
    workspaceReadOnly: true, beforeFileAndModuleBytes: '81 actual saved before files; baseline checksum and every saved SHA checked before each run',
    removedFromBeforeView: 'two current source additions and this feedback evidence directory', unchangedDependencies: 'current filesystem bytes for files not changed in this batch', derivedBeforeFiles: [],
    limitation: 'A finite actual before view, not a full historical workspace capture; every unmapped dependency remains current.' },
  normalization: { verifierDiagnostics: 'none; no failures filtered, no thresholds changed, duplicate diagnostic counts retained', excludedNonVerifierPreamble: 'only required before runner self-check line' },
  checks, deltaExplanation: 'The existing Task4 Data alias diagnostics still expect literal 36px/42px. Actual inherited aliases now reference the explicitly requested 28px/36px preset. The two raw diagnostic strings change; the old validation threshold is not rewritten or counted as passed.',
  humanGate: 'awaiting_human', contrastAcceptance: 'not-granted' }, null, 2) + '\n');
