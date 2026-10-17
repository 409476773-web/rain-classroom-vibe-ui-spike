import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const folder = 'evidence/runtime/chart-curve-refinement-2026-10-11/curve-audit';
const input = JSON.parse(await readFile(`${folder}/current-precision-turn-results.json`, 'utf8'));
const rows = input.rows.filter(row => row.family === 'timeline-count' || row.family === 'timeline-rate-fullprecision').map(row => {
  const values = row.values, slopes = values.slice(1).map((value, index) => value - values[index]);
  const flat = slopes.some(value => value === 0), nullOrZero = values.some(value => value === null || value === 0);
  const first = Math.abs(slopes[0]), second = Math.abs(slopes[1]), last = Math.abs(slopes.at(-1)), previous = Math.abs(slopes.at(-2));
  const firstGuard = first < second / 3, lastGuard = last < previous / 3;
  const natural = !(flat || nullOrZero || firstGuard || lastGuard);
  const selected = row.curves[natural ? 'natural' : 'monotoneX'];
  return { id: row.id, family: row.family, key: row.key, revision: row.revision, natural, flat, nullOrZero, endpoint: { first, second, last, previous, firstGuard, lastGuard }, selectedObservedTurns: selected.observedTurnCount, selectedCurveTurns: selected.curveTurnCount, selectedAdded: selected.addedTurns, selectedMissing: selected.missingTurns, selectedNegative: selected.negative, naturalAdded: row.curves.natural.addedTurns };
});
const currentSourceHashes = Object.fromEntries(await Promise.all(Object.keys(input.sourceHashes).map(async path => [path, createHash('sha256').update(await readFile(path)).digest('hex')])));
const sourceFresh = Object.keys(input.sourceHashes).every(path => currentSourceHashes[path] === input.sourceHashes[path]);
const result = {
  definition: 'Current curated ordinary time-series only: select native Natural iff all inputs are non-null/non-zero, no adjacent equal values, and neither abs(first slope) < abs(second slope)/3 nor abs(last slope) < abs(previous slope)/3. Otherwise native MonotoneX. No generic guarantee.',
  sourceHashes: input.sourceHashes, currentSourceHashes, sourceFresh,
  allSelectedPreserveTurns: rows.every(row => !row.selectedAdded && !row.selectedMissing), allSelectedNonnegative: rows.every(row => !row.selectedNegative),
  eligible: rows.filter(row => row.natural).map(row => row.id), fallback: rows.filter(row => !row.natural).map(row => row.id), rows,
};
await writeFile(`${folder}/endpoint-selection-results.json`, JSON.stringify(result, null, 2) + '\n');
if (!result.allSelectedPreserveTurns || !result.allSelectedNonnegative || !result.sourceFresh) throw new Error('Endpoint selection verification failed');
process.stdout.write(JSON.stringify({ sourceFresh, allSelectedPreserveTurns: result.allSelectedPreserveTurns, allSelectedNonnegative: result.allSelectedNonnegative, eligible: result.eligible, fallback: result.fallback }, null, 2) + '\n');
