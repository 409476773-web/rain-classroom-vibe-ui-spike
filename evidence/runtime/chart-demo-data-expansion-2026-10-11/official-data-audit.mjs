import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { parseSync } from 'vite';
import { exportedDownloads, assertDownloadClosure } from '../../../scripts/verify-chart-variant-consumption.mjs';
const root = process.cwd();
const run = join(root, 'evidence/runtime/chart-demo-data-expansion-2026-10-11');
const prefix = 'apps/playground/src/docs/components/chart-variants/';
const owned = ['bar', 'radial', 'comparison', 'structure', 'special'];
const read = path => readFileSync(path, 'utf8');
const hash = content => createHash('sha256').update(content).digest('hex');
const name = node => node.id?.name ?? node.declarations?.[0]?.id?.name;
const unwrap = node => node.declaration ?? node;
const nodes = node => { const result = []; const visit = value => { if (!value || typeof value !== 'object') return; if (value.type) result.push(value); for (const [key, child] of Object.entries(value)) if (!['start', 'end', 'loc', 'comments'].includes(key)) { if (Array.isArray(child)) child.forEach(visit); else if (child && typeof child === 'object') visit(child); } }; visit(node); return result; };
const clean = value => { if (Array.isArray(value)) return value.map(clean); if (!value || typeof value !== 'object') return value; return Object.fromEntries(Object.entries(value).filter(([key]) => !['start', 'end', 'loc', 'raw', 'comments'].includes(key)).map(([key, child]) => [key, clean(child)])); };
const parse = (filename, source) => { const result = parseSync(filename, source); assert.deepEqual(result.errors, []); return result.program; };
const dataDeclarations = { BarVariant: ['data'], PieVariant: ['data'], RingVariant: ['data'], RadarVariant: ['data'], GaugeVariant: ['value'], LiveVariant: ['data'], structureSankeyData: ['total'] };
function normalized(program) {
  const copy = structuredClone(program);
  copy.body = copy.body.filter(node => name(unwrap(node)) !== 'heatmapActivityWeeks');
  for (const statement of copy.body) {
    const fn = unwrap(statement);
    if (fn.type !== 'FunctionDeclaration') continue;
    const dropped = dataDeclarations[name(fn)] ?? [];
    fn.body.body = fn.body.body.filter(node => node.type !== 'VariableDeclaration' || !node.declarations.some(declaration => dropped.includes(declaration.id.name) || declaration.id.type === 'ArrayPattern' && declaration.id.elements.some(element => dropped.includes(element?.name))));
    if (['structureHeatmapData', 'structureSankeyData', 'nextLivePoints'].includes(name(fn))) {
      for (const node of nodes(fn)) if (node.type === 'Property' && ((name(fn) === 'structureHeatmapData' && node.key.name === 'count') || (name(fn) !== 'structureHeatmapData' && node.key.name === 'value'))) node.value = { type: 'AuthorizedDataValue' };
    }
  }
  return clean(copy);
}
const sourceFacts = {};
for (const family of owned) {
  const file = `${prefix}${family}.tsx`;
  const previous = read(join(run, 'before', file));
  const current = read(join(root, file));
  const oldAst = parse(file, previous); const newAst = parse(file, current);
  assert.deepEqual(normalized(newAst), normalized(oldAst), `${family}: a non-data AST node changed`);
  const jsx = (ast, text) => nodes(ast).filter(node => ['JSXElement', 'JSXFragment'].includes(node.type)).map(node => text.slice(node.start, node.end));
  assert.deepEqual(jsx(newAst, current), jsx(oldAst, previous), `${family}: JSX bytes changed`);
  sourceFacts[file] = { beforeSha256: hash(previous), sha256: hash(current), allJsxBytesUnchanged: true, remainingAstUnchanged: true };
  if (family === 'bar') {
    const initializer = ast => nodes(ast).find(node => node.type === 'VariableDeclarator' && node.id.name === 'data').init;
    const oldData = initializer(oldAst); const newData = initializer(newAst);
    assert.equal(current.slice(newData.consequent.start, newData.consequent.end), previous.slice(oldData.consequent.start, oldData.consequent.end), 'approved grouped branch changed');
    assert.equal(current.slice(newData.alternate.consequent.start, newData.alternate.consequent.end), previous.slice(oldData.alternate.start, oldData.alternate.end), 'dense data branch changed');
    sourceFacts[file].approvedGroupedAndDenseBranchesByteIdentical = true;
  }
  if (family === 'structure') {
    const conditional = ast => nodes(ast).find(node => node.type === 'Property' && node.key.name === 'count').value;
    assert.deepEqual(clean(conditional(newAst).test), clean(conditional(oldAst).test), 'calendar missing-cell mask changed');
    sourceFacts[file].calendarMissingMaskUnchanged = true;
  }
}
const cssFiles = [];
const walk = directory => { for (const item of readdirSync(directory)) { const path = join(directory, item); if (statSync(path).isDirectory()) walk(path); else if (path.endsWith('.css')) cssFiles.push(path); } };
walk(join(run, 'before'));
for (const path of cssFiles) assert.equal(hash(read(path)), hash(read(path.replace(join(run, 'before'), root))), `CSS changed: ${path}`);
const docs = join(root, 'apps/playground/src/docs/components');
const exports = await exportedDownloads(docs);
const references = JSON.parse(read(join(docs, 'chart-variants/reference.json')));
const downloads = [];
for (const id of ['bar-default', 'bar-multiple-series', 'bar-dense-data', 'pie-default', 'pie-gradients', 'ring-default', 'radar-default', 'gauge-default', 'heatmap-default', 'sankey-simple', 'live-line-default', 'candlestick-chart-1-3']) {
  const files = exports.files(references.find(variant => variant.id === id), 'monochrome-blue', 0, 0, true);
  assertDownloadClosure(files, id);
  const family = id.startsWith('pie') || id.startsWith('ring') || id.startsWith('radar') ? 'radial' : id.startsWith('gauge') ? 'comparison' : id.startsWith('heatmap') || id.startsWith('sankey') ? 'structure' : id.startsWith('bar') ? 'bar' : 'special';
  assert.equal(files[`chart-variants/${family}.tsx`], read(join(docs, `chart-variants/${family}.tsx`)));
  downloads.push({ id, fileCount: Object.keys(files).length, rawCurrentFamilySource: true, importClosurePassed: true });
}
const testFacts = Object.fromEntries(owned.map(family => { const file = `${prefix}${family}.test.tsx`; return [file, { sha256: hash(read(join(root, file))) }]; }));
const result = { timestamp: new Date().toISOString(), status: 'passed', sourceFacts, testFacts, cssFilesByteIdentical: cssFiles.length, downloads,
  units: { red: { exitCode: 1, files: 5, failed: 28, passed: 37, log: 'official-unit-red.log' }, initialIndependentGreen: { exitCode: 1, files: 3, failed: 1, passed: 50, reason: 'New assertion used td:first-child, but the table first column is th; corrected the assertion only.', log: 'official-unit-green-independent.log' }, finalGreen: { exitCode: 0, files: 5, passed: 65, failed: 0, log: 'official-unit-green.log' } },
  coreDataSha256: hash(read(join(docs, 'chart-data.ts'))),
  limits: ['Structural, native-renderer unit and source-closure audit; browser, build and subjective visual approval are handled separately.'] };
writeFileSync(join(run, 'official-data-facts.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ status: result.status, families: owned.length, cssFilesByteIdentical: cssFiles.length, downloads: downloads.length }));
