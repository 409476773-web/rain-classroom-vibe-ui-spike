import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const folder = 'evidence/runtime/chart-curve-refinement-2026-10-11/curve-audit';
const requireUi = createRequire(resolve('packages/ui/package.json'));
const { line, curveNatural, curveMonotoneX } = await import(requireUi.resolve('d3-shape'));
const requireVite = createRequire(import.meta.resolve('vite'));
const { transformSync } = await import(requireVite.resolve('rolldown/utils'));
const hash = text => createHash('sha256').update(text).digest('hex');
const importSource = async (source, name) => import('data:text/javascript;base64,' + Buffer.from(transformSync(name, source).code).toString('base64'));
const slice = (source, start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
const EPS = 1e-8;
const sign = value => Math.abs(value) < EPS ? 0 : Math.sign(value);
const valueAt = (p, t) => (1 - t) ** 3 * p[0] + 3 * (1 - t) ** 2 * t * p[1] + 3 * (1 - t) * t * t * p[2] + t ** 3 * p[3];
const derivative = (p, t) => 3 * ((1 - t) ** 2 * (p[1] - p[0]) + 2 * (1 - t) * t * (p[2] - p[1]) + t * t * (p[3] - p[2]));

function roots(p) {
  const a = -p[0] + 3 * p[1] - 3 * p[2] + p[3], b = 3 * p[0] - 6 * p[1] + 3 * p[2], c = -3 * p[0] + 3 * p[1];
  if (Math.abs(3 * a) < EPS) return Math.abs(2 * b) < EPS ? [] : [-c / (2 * b)];
  const d = 4 * b * b - 12 * a * c;
  if (d < -EPS) return [];
  const q = Math.sqrt(Math.max(0, d));
  return [(-2 * b + q) / (6 * a), (-2 * b - q) / (6 * a)];
}

function build(values, curve) {
  const segments = []; let point;
  const context = {
    moveTo(x, y) { point = [x, y]; },
    lineTo(x, y) { segments.push({ x: [point[0], point[0] + (x - point[0]) / 3, point[0] + 2 * (x - point[0]) / 3, x], y: [point[1], point[1] + (y - point[1]) / 3, point[1] + 2 * (y - point[1]) / 3, y] }); point = [x, y]; },
    bezierCurveTo(x1, y1, x2, y2, x, y) { segments.push({ x: [point[0], x1, x2, x], y: [point[1], y1, y2, y] }); point = [x, y]; },
    closePath() {},
  };
  line().x((_, index) => index).y(v => v).curve(curve).context(context)(values);
  return segments;
}

function observedTurns(values) {
  const result = []; let previous;
  for (let edge = 0; edge < values.length - 1; edge++) {
    const direction = sign(values[edge + 1] - values[edge]);
    if (!direction) continue;
    if (previous && direction !== previous.direction) result.push({ kind: previous.direction > 0 ? 'peak' : 'trough', fromObservation: previous.edge + 1, toObservation: edge, value: values[edge] });
    previous = { direction, edge };
  }
  return result;
}

function measure(values, curve) {
  let minimum = Math.min(...values), maximum = Math.max(...values), maxEndpointOvershoot = 0, inputPointError = 0, previous;
  const turns = [], overshoots = [];
  for (const [index, segment] of build(values, curve).entries()) {
    const cuts = [0, ...roots(segment.y).filter(t => t > EPS && t < 1 - EPS).sort((a, b) => a - b), 1].filter((t, i, list) => i === 0 || Math.abs(t - list[i - 1]) > EPS);
    const candidates = cuts.map(t => ({ t, x: valueAt(segment.x, t), value: valueAt(segment.y, t) }));
    const segmentMinimum = Math.min(...candidates.map(p => p.value)), segmentMaximum = Math.max(...candidates.map(p => p.value));
    const overshoot = Math.max(0, Math.min(values[index], values[index + 1]) - segmentMinimum, segmentMaximum - Math.max(values[index], values[index + 1]));
    minimum = Math.min(minimum, segmentMinimum); maximum = Math.max(maximum, segmentMaximum);
    maxEndpointOvershoot = Math.max(maxEndpointOvershoot, overshoot);
    inputPointError = Math.max(inputPointError, Math.abs(segment.y[0] - values[index]), Math.abs(segment.y[3] - values[index + 1]));
    if (overshoot > EPS) overshoots.push({ segment: index, from: values[index], to: values[index + 1], segmentMinimum, segmentMaximum, overshoot });
    for (let part = 1; part < cuts.length; part++) {
      const start = cuts[part - 1], end = cuts[part], direction = sign(derivative(segment.y, (start + end) / 2));
      if (!direction) continue;
      if (previous && direction !== previous.direction) turns.push({ kind: previous.direction > 0 ? 'peak' : 'trough', segment: index, t: start, x: valueAt(segment.x, start), value: valueAt(segment.y, start) });
      previous = { direction };
    }
  }
  const observed = observedTurns(values);
  return { observedTurnCount: observed.length, curveTurnCount: turns.length, addedTurns: Math.max(0, turns.length - observed.length), missingTurns: Math.max(0, observed.length - turns.length), minimum, maximum, negative: minimum < -EPS, over100: maximum > 100 + EPS, inputPointError, maxEndpointOvershoot, observed, turns, overshoots };
}

function audit(row) {
  return { ...row, inputRange: [Math.min(...row.values), Math.max(...row.values)], curves: { natural: measure(row.values, curveNatural), monotoneX: measure(row.values, curveMonotoneX) } };
}

function summarize(rows) {
  return [...new Set(rows.map(row => row.family))].flatMap(family => ['natural', 'monotoneX'].map(curve => {
    const list = rows.filter(row => row.family === family);
    return { family, curve, series: list.length, sameTurnCount: list.filter(row => row.curves[curve].curveTurnCount === row.curves[curve].observedTurnCount).length, extraTurnSeries: list.filter(row => row.curves[curve].addedTurns).map(row => ({ id: row.id, from: row.curves[curve].observedTurnCount, to: row.curves[curve].curveTurnCount })), missingTurnSeries: list.filter(row => row.curves[curve].missingTurns).map(row => row.id), negativeSeries: list.filter(row => row.curves[curve].negative).map(row => row.id), exactInputPointError: Math.max(...list.map(row => row.curves[curve].inputPointError)), minimum: Math.min(...list.map(row => row.curves[curve].minimum)), maximum: Math.max(...list.map(row => row.curves[curve].maximum)), maxEndpointOvershoot: Math.max(...list.map(row => row.curves[curve].maxEndpointOvershoot)) };
  }));
}

const initialFiles = ['results.json', 'timeline-source.txt', 'mini-source.txt'];
const initialHashes = Object.fromEntries(await Promise.all(initialFiles.map(async name => [name, hash(await readFile(`${folder}/${name}`))])));
const baseline = JSON.parse(await readFile(`${folder}/results.json`, 'utf8'));
const baselineTurns = JSON.parse(await readFile(`${folder}/turn-results.json`, 'utf8'));
const timelinePath = 'apps/playground/src/docs/components/chart-data.ts', miniPath = 'apps/playground/src/docs/components/chart-business/mini-data.ts', categoryPath = 'apps/playground/src/docs/components/chart-business/comparison-data.ts';
const [timelineSource, miniSource, categorySource] = await Promise.all([timelinePath, miniPath, categoryPath].map(path => readFile(path, 'utf8')));
const timelineModule = slice(timelineSource, 'export function makeTimeline(', 'export function makeMissingTimeline(') + slice(timelineSource, 'export function assertValidDate(', 'export function assertRingData(');
const [{ makeTimeline }, { makeMiniRows }, { makeCategoryFixtures }] = await Promise.all([importSource(timelineModule, 'timeline.ts'), importSource(miniSource, 'mini.ts'), importSource(categorySource, 'comparison.ts')]);
const currentRows = [];
const inputIdentity = [];
for (let revision = 0; revision < 3; revision++) {
  const data = makeTimeline(revision);
  for (const key of ['enrolled', 'completed', 'returned', 'answered', 'reviewed']) {
    const id = `timeline-${key}-revision-${revision}`, values = data.map(row => row[key]);
    currentRows.push(audit({ family: 'timeline-count', id, revision, key, values }));
    inputIdentity.push({ id, sameAsInitialSnapshot: JSON.stringify(values) === JSON.stringify(baseline.results.find(row => row.id === id).values) });
  }
  currentRows.push(audit({ family: 'timeline-rate-fullprecision', id: `timeline-rate-fullprecision-revision-${revision}`, revision, key: 'rate', values: data.map(row => row.rate) }));
  currentRows.push(audit({ family: 'timeline-rate-rounded-control', id: `timeline-rate-rounded-control-revision-${revision}`, revision, key: 'rate', values: data.map(row => Math.round(row.rate)) }));
  if (!data.every(row => row.rate === row.completed / row.enrolled * 100)) throw new Error(`Current rate is not fullprecision at revision ${revision}`);
}
for (let revision = 0; revision < 12; revision++) for (const row of makeMiniRows(revision)) {
  const id = `${row.id}-revision-${revision}`;
  currentRows.push(audit({ family: 'mini-trend', id, revision, key: 'trend', values: row.trend }));
  inputIdentity.push({ id, sameAsInitialSnapshot: JSON.stringify(row.trend) === JSON.stringify(baseline.results.find(item => item.id === id).values) });
}
const turnCrossCheck = currentRows.map(row => {
  const baselineId = row.id.replace('rate-fullprecision', 'rate-unrounded').replace('rate-rounded-control', 'rate-rounded');
  const old = baselineTurns.rows.find(item => item.id === baselineId);
  const same = ['natural', 'monotoneX'].every(curve => old.curves[curve].turnCount === row.curves[curve].curveTurnCount);
  if (!same) throw new Error(`Turn-count mismatch with initial independent audit: ${row.id}`);
  return { id: row.id, baselineId, same };
});
const areaRows = [];
for (let revision = 0; revision < 3; revision++) for (const fixture of makeCategoryFixtures(revision).filter(fixture => ['semester', 'period', 'version'].includes(fixture.id))) for (const series of fixture.series) {
  const nullable = fixture.rows.map(row => row[series.key]);
  if (nullable.some((value, index) => value === null && nullable.slice(index + 1).some(value => value !== null))) throw new Error('Audit only flattens absent tail, never interior gaps');
  const values = nullable.filter(value => value !== null);
  areaRows.push(audit({ family: `business-area-${fixture.id}`, id: `${fixture.id}-${series.key}-revision-${revision}`, revision, key: series.key, values, sourceValues: nullable, omittedNullTail: nullable.length - values.length }));
}
const meta = { definition: 'Observed turns: sign changes of nonzero adjacent differences, flat platforms count once. Curve turns: sign changes over the complete cubic derivative including exact interior roots and knots. Existing extrema may move between observation points. Bounds use exact derivative roots; source-valued geometry assumes equally spaced ordinal x or equally spaced daily dates, both current fixtures satisfy.', epsilon: EPS, installedD3Shape: requireUi.resolve('d3-shape'), sourceHashes: { [timelinePath]: hash(timelineSource), [miniPath]: hash(miniSource), [categoryPath]: hash(categorySource) }, initialSnapshotHashes: initialHashes };
await writeFile(`${folder}/current-precision-turn-results.json`, JSON.stringify({ ...meta, sameCountAndMiniValuesAsInitialSnapshot: inputIdentity.every(row => row.sameAsInitialSnapshot), sameTurnCountsAsInitialIndependentAudit: turnCrossCheck.every(row => row.same), inputIdentity, turnCrossCheck, summary: summarize(currentRows), rows: currentRows }, null, 2) + '\n');
await writeFile(`${folder}/business-area-turn-results.json`, JSON.stringify({ ...meta, summary: summarize(areaRows), rows: areaRows }, null, 2) + '\n');
for (const [name, source] of [['current-timeline-source.txt', timelineSource], ['current-mini-source.txt', miniSource], ['business-area-source.txt', categorySource]]) await writeFile(`${folder}/${name}`, source);
for (const name of initialFiles) if (hash(await readFile(`${folder}/${name}`)) !== initialHashes[name]) throw new Error(`Initial snapshot modified: ${name}`);
process.stdout.write(JSON.stringify({ inputIdentity: inputIdentity.every(row => row.sameAsInitialSnapshot), current: summarize(currentRows), businessArea: summarize(areaRows) }, null, 2) + '\n');
