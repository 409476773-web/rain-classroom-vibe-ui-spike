import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const run = 'evidence/runtime/chart-behavior-fixes-2026-10-11';
const owner = 'packages/ui/src/charts/vendor/charts/profit-loss-segments.ts';
const requireRoot = createRequire(resolve('package.json'));
const requireVite = createRequire(requireRoot.resolve('vite'));
const { transformSync } = await import(requireVite.resolve('rolldown/utils'));
const currentSource = await readFile(owner, 'utf8');
const baselineSource = await readFile(`${run}/before/${owner}`, 'utf8');
const importSplitter = async (source, name) => (await import('data:text/javascript;base64,' + Buffer.from(transformSync(name, source).code).toString('base64'))).splitProfitLossSegments;
const current = await importSplitter(currentSource, 'current.ts');
const baseline = await importSplitter(baselineSource, 'baseline.ts');
const values = [-2, -1, 0, 1, 2];
let cases = 0, unchangedNoZeroCases = 0, affectedCases = 0;
function check(sequence) {
  const rows = sequence.map((value, index) => Object.freeze({ date: new Date(index * 8000 + 1000), value, observedIndex: index }));
  const input = { data: rows, dataKey: 'value', xAccessor: row => row.date };
  const segments = current(input);
  const nonzero = sequence.filter(value => value !== 0);
  const expectedCount = nonzero.length ? 1 + nonzero.slice(1).filter((value, index) => Math.sign(value) !== Math.sign(nonzero[index])).length : 1;
  if (segments.length !== expectedCount) throw new Error(`segment count ${sequence}`);
  if (segments.some(segment => segment.data.some(row => row.value !== 0 && (row.value > 0) !== segment.isPositive))) throw new Error(`sign ${sequence}`);
  if (rows.some(row => !segments.some(segment => segment.data.includes(row)))) throw new Error(`dropped observation ${sequence}`);
  for (let index = 0; index < segments.length; index++) {
    const segment = segments[index];
    if (segment.data.some((row, offset) => offset && row.date.getTime() < segment.data[offset - 1].date.getTime())) throw new Error(`time order ${sequence}`);
    if (index && (segments[index - 1].data.at(-1) !== segment.data[0] || segment.data[0].value !== 0)) throw new Error(`boundary continuity ${sequence}`);
  }
  const old = baseline(input);
  const equal = JSON.stringify(old) === JSON.stringify(segments);
  if (!sequence.includes(0)) {
    if (!equal) throw new Error(`nonzero interpolation regression ${sequence}`);
    unchangedNoZeroCases++;
  }
  if (!equal) affectedCases++;
  cases++;
}
function enumerate(sequence, length) {
  if (sequence.length === length) return check(sequence);
  for (const value of values) enumerate([...sequence, value], length);
}
for (let length = 1; length <= 7; length++) enumerate([], length);
const result = { cases, range: values, lengths: [1, 7], unchangedNoZeroCases, affectedCases, signCorrect: true, observationsRetained: true, boundaryIdentityAndTimeOrder: true, nonzeroInterpolationIdentical: true, ownerSha256: createHash('sha256').update(currentSource).digest('hex') };
await writeFile(`${run}/profit-loss-independent-probe.json`, JSON.stringify(result, null, 2) + '\n');
process.stdout.write(JSON.stringify(result) + '\n');
