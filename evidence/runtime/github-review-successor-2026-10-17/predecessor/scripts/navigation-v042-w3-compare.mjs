import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pack = resolve(repo, '../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack');
const source = resolve(pack, 'reference/approved-v0.4.2.html');
const reference = resolve(repo, 'evidence/runtime/navigation-v042/w3/reference/2026-10-01T10-40-10-888Z');
const out = resolve(repo, 'evidence/runtime/navigation-v042/w3/compare', new Date().toISOString().replace(/[:.]/g, '-'));
const hash = data => createHash('sha256').update(data).digest('hex');
const decision = JSON.parse(await readFile(resolve(pack, 'contracts/baseline-decision.json'), 'utf8'));
const sourceHash = hash(await readFile(source));
if (sourceHash !== decision.sha256) throw new Error('Frozen reference SHA-256 mismatch');
const referenceReport = JSON.parse(await readFile(resolve(reference, 'capture-report.json'), 'utf8'));
if (!referenceReport.unchangedSource || referenceReport.results.length !== 20 || referenceReport.results.some(r => !r.stable || r.pageErrors.length)) throw new Error('Canonical W3 reference capture is incomplete');
await mkdir(out, { recursive: true });
const write = (name, data) => writeFile(resolve(out, name), typeof data === 'string' ? data : JSON.stringify(data, null, 2), { flag: 'wx' });
const sourceFiles = ['apps/playground/src/docs/components/navigation-v042-page.tsx', 'apps/playground/src/recipes/navigation-v042/w3-samples.tsx', 'apps/playground/src/recipes/navigation-v042/w3-samples.css', 'apps/playground/src/recipes/navigation-v042/r1-r3.tsx', 'apps/playground/src/recipes/navigation-v042/r1-r3.css', 'packages/layouts/src/workspace.tsx', 'packages/layouts/src/workspace.css', 'packages/ui/src/navigation/navigation-families.tsx', 'packages/ui/src/navigation/navigation-families.css', 'packages/ui/src/navigation/navigation.css'];
const hashes = async () => Object.fromEntries(await Promise.all(sourceFiles.map(async path => { try { return [path, hash(await readFile(resolve(repo, path)))]; } catch { return [path, null]; } })));
const properties = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'padding', 'margin', 'gap', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderRadius', 'boxShadow', 'width', 'height', 'minHeight', 'maxWidth', 'overflow', 'display', 'position', 'transform', 'left', 'right', 'top', 'bottom', 'content'];
const map = [
 ['.soft-list', '.rain-navigation-family__track'], ['.soft-item', '.rain-navigation-family__row'], ['.soft-item', '.rain-navigation-family__entry'], ['.soft-item .label', '.rain-navigation-family__label'], ['.soft-item .small-label', '.rain-navigation-family__description'], ['.soft-item .count', '.rain-navigation-family__count'],
 ['.segmented', '.rain-segmented-control__group > [data-slot="items"]'], ['.segmented button', '.rain-segmented-control__option'], ['.segmented button .ic', '.rain-segmented-control__icon'],
 ['.detached-strip', '.rain-object-navigator[data-appearance="cards"] .rain-navigation-family__track'], ['.object-card', '.rain-object-navigator[data-appearance="cards"] .rain-navigation-family__row'], ['.object-card .title', '.rain-object-navigator[data-appearance="cards"] .rain-navigation-family__label'], ['.object-card .meta', '.rain-navigation-family__metadata'], ['.object-card .meta b', '.rain-navigation-family__metadata b'], ['.object-card .progress', '.rain-navigation-family__progress'], ['.object-card .progress span', '.rain-navigation-family__progress > span'],
 ['.preview-row', '.rain-object-navigator[data-appearance="preview"] .rain-navigation-family__row'], ['.preview-slide', '[data-slot="preview"]'],
 ['.attached-tab', '.rain-tabs__tab'], ['.attached-tab .primary', '.rain-tabs__label > span'], ['.attached-tab .secondary', '.rain-navigation__description'], ['.cs-host', '.rain-connected-surface'], ['.cs-row', '.rain-connected-surface__row'], ['.cs-track', '[role="tablist"]'], ['.cs-panel', '.rain-connected-surface__panel'],
 ['.white-filter', '[data-appearance="white-line"], [data-appearance="white-soft"]'],
 ['.prototype', '.nv43-workspace'], ['.vr-bar', '.nv43-workspace-bar'], ['.rail', '.nv43-platform'], ['.workbody', '.nv43-workbody'], ['.workspace-head', '.nv43-module-header'], ['.contextnav', '.nv43-context'], ['.work-sheet', '.nv43-sheet'], ['.page-top', '.nv43-page-top'], ['.page-top h2', '.nv43-page-top h3'], ['.sheet-content', '.nv43-sheet-content'], ['.table-tools', '.nv43-table-tools'], ['.search', '.nv43-search'], ['.tree-row', '.rain-tree-row'], ['.node-name', '.rain-tree [data-slot="title"]'], ['.indicator-tabs', '.rain-tabs__list'], ['.indicator-tabs .tab', '.rain-tabs__tab'], ['.indicator-tabs .tab-label', '.rain-tabs__label'],
];
const referenceSelectors = [...new Set([...map.map(([s]) => s), '.cs-tab'])];
const candidateSelectors = [...new Set([...map.map(([, s]) => s), '[data-rain-id]', '[data-slot]', '.nv43-table', '.nv43-industry', '.nv43-course-graph'])];
const allCases = JSON.parse(await readFile(resolve(pack, 'contracts/visual-cases.json'), 'utf8')).cases;
const requestedCases = process.env.RAIN_COMPARE_CASES?.split(',');
const wanted = id => !requestedCases || requestedCases.includes(id);
const report = { kind: 'W3-candidate-comparison-only', approved: false, source, sourceHash, canonicalReference: reference, url: process.env.RAIN_CANDIDATE_URL || 'http://127.0.0.1:5198/#navigation-v042', referenceUrl: process.env.RAIN_REFERENCE_URL || pathToFileURL(source).href, sourceBefore: await hashes(), cases: [], pageErrors: [], consoleErrors: [] };
const browser = await chromium.launch();
report.browser = browser.version();
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1, locale: 'zh-CN', reducedMotion: 'reduce' });
page.on('pageerror', error => report.pageErrors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
async function settle(p = page) { await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300); await p.mouse.move(0, 0); await p.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)))); }
async function measure(target, selectors) {
 return target.evaluate((root, { properties, selectors }) => {
  const rect = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
  const style = (e, pseudo = null) => Object.fromEntries(properties.map(key => [key, getComputedStyle(e, pseudo)[key]]));
  return { rect: rect(root), measurements: selectors.flatMap(selector => [...(root.matches(selector) ? [root] : []), ...root.querySelectorAll(selector)].slice(0, 24).map((e, index) => ({ selector, index, text: e.textContent.trim().slice(0, 160), attributes: Object.fromEntries([...e.attributes].map(a => [a.name, a.value])), rect: rect(e), styles: style(e), before: style(e, '::before'), after: style(e, '::after'), paths: [...e.querySelectorAll('path')].slice(0, 12).map(e => e.getAttribute('d')) }))), variables: Object.fromEntries([...getComputedStyle(root)].filter(k => k.startsWith('--')).map(k => [k, getComputedStyle(root).getPropertyValue(k).trim()])) };
 }, { properties, selectors });
}
async function referenceAt(id, width) {
 const name = `${id}-${width}`;
 if (width === 1440) {
  const data = JSON.parse(await readFile(resolve(reference, `${name}-pass1.json`), 'utf8'));
  const originalPng = resolve(reference, `${name}-pass1.png`), png = resolve(out, `${name}-reference-native-crop.png`);
  const crop = spawnSync('python3', ['-c', 'from PIL import Image; import sys,json; im=Image.open(sys.argv[1]); size=(int(sys.argv[3]),int(sys.argv[4])); assert im.width>=size[0] and im.height>=size[1]; im.crop((0,0,*size)).save(sys.argv[2]); print(json.dumps({"originalSize":im.size,"nativeCropSize":size,"resized":False}))', originalPng, png, String(Math.round(data.rect.width)), String(Math.round(data.rect.height))], { encoding: 'utf8' });
  if (crop.status !== 0) throw new Error(crop.stderr);
  return { data, png, originalPng, cropNormalization: JSON.parse(crop.stdout) };
 }
 const c = { ...allCases.find(c => c.id === id), width };
 const p = await browser.newPage({ viewport: { width: Math.max(1600, width), height: 1100 }, deviceScaleFactor: 1, locale: 'zh-CN', reducedMotion: 'reduce' });
 const errors = []; p.on('pageerror', e => errors.push(String(e)));
 try {
  await p.goto(report.referenceUrl, { waitUntil: 'load' });
  await p.waitForFunction(() => window.YKT_DEBUG && window.YKT_VISIBILITY);
  await p.evaluate(c => { YKT_DEBUG.navigate(c.asset); if (typeof vClearTransientSession === 'function') vClearTransientSession(); if (typeof visibilityStore !== 'undefined') delete visibilityStore[vKey()]; Object.assign(ui, c.ui || {}); configs[current] = { ...defaults, ...cfg(), preset: c.preset, density: c.density, contour: c.contour, polish: 'refined', connectionRevision: 'current', inspect: 'native', viewport: c.width, frameHeight: c.height }; render(); }, c);
  const mode = c.asset === 'R1' ? 'r1module' : 'r3mode';
  await p.locator(`[data-action="recipe-mode"][data-key="${mode}"][data-value="${c.ui[mode]}"]`).click();
  await p.evaluate(() => { document.body.classList.add('standalone'); resizeScene(); });
  await settle(p);
  const target = p.locator(c.sourceSelector).nth(c.sourceNth || 0);
  const data = { case: c, sourceHash, viewport: p.viewportSize(), pageErrors: errors, ...await measure(target, referenceSelectors) };
  const png = resolve(out, `${name}-reference-native.png`);
  const bytes = await target.screenshot({ path: png, animations: 'disabled' }); data.screenshotHash = hash(bytes);
  await write(`${name}-reference-native.json`, data); await write(`${name}-reference-native.fragment.html`, await target.evaluate(e => e.outerHTML));
  if (errors.length) throw new Error(errors.join('\n'));
  return { data, png };
 } finally { await p.close(); }
}
function compareImages(ref, candidate, name) {
 const result = spawnSync('python3', [resolve(pack, 'tools/compare_renders.py'), ref, candidate, '--out', resolve(out, `${name}-comparison`)], { encoding: 'utf8' });
 return { exitCode: result.status, output: `${result.stdout}${result.stderr}`.trim() };
}
async function capture(id, width, selector, referenceOverride = null, captureLabel = null) {
 const name = `${captureLabel || id}-${width}`;
 try {
  await settle(); const target = page.locator(selector).first(); await target.waitFor({ state: 'visible' }); await target.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
  const localMap = map.map(([source, candidate]) => [id === 'W3-outlined' && source === '.attached-tab' ? '.cs-tab' : source, /^R[13]-/.test(id) && source.startsWith('.soft') ? `.nv43-context ${candidate}` : candidate]);
  const data = { id, width, viewport: page.viewportSize(), selector, ...await measure(target, [...new Set([...candidateSelectors, ...localMap.map(([, s]) => s)])]) };
  const png = resolve(out, `${name}-candidate.png`);
  data.screenshotCrop = { x: Math.round(data.rect.x), y: Math.floor(data.rect.y), width: Math.round(data.rect.width), height: Math.round(data.rect.height) };
  const bytes = await page.screenshot({ path: png, clip: data.screenshotCrop, animations: 'disabled' }); data.screenshotHash = hash(bytes);
  await settle();
  data.repeatedScreenshotHash = hash(await page.screenshot({ path: resolve(out, `${name}-candidate-pass2.png`), clip: data.screenshotCrop, animations: 'disabled' }));
  data.stable = data.screenshotHash === data.repeatedScreenshotHash;
  await write(`${name}-candidate.json`, data); await write(`${name}-candidate.fragment.html`, await target.evaluate(e => e.outerHTML));
  const ref = referenceOverride || await referenceAt(id, width);
  const geometry = localMap.flatMap(([referenceSelector, candidateSelector]) => data.measurements.filter(m => m.selector === candidateSelector).map(m => {
   const source = ref.data.measurements.find(r => r.selector === referenceSelector && r.index === m.index);
   if (!source) return { referenceSelector, candidateSelector, index: m.index, missingReference: true };
   const from = { ...source.rect, x: source.rect.x - ref.data.rect.x, y: source.rect.y - ref.data.rect.y }, to = { ...m.rect, x: m.rect.x - data.rect.x, y: m.rect.y - data.rect.y };
   return { referenceSelector, candidateSelector, index: m.index, referenceText: source.text, candidateText: m.text, reference: from, candidate: to, delta: Object.fromEntries(Object.keys(from).map(k => [k, +(to[k] - from[k]).toFixed(4)])), changedStyles: Object.fromEntries(properties.filter(k => source.styles[k] !== undefined && source.styles[k] !== m.styles[k]).map(k => [k, { reference: source.styles[k], candidate: m.styles[k] }])) };
  }));
  await write(`${name}-geometry-difference.json`, geometry);
  const comparison = compareImages(ref.png, png, name);
  const metricsPath = resolve(out, `${name}-comparison/metrics.json`); let metrics = null; try { metrics = JSON.parse(await readFile(metricsPath, 'utf8')); } catch {}
  let nativeSizeReview = null;
  if (metrics?.status === 'incomparable-size') {
   const paddedReference = resolve(out, `${name}-reference-native-padded.png`), paddedCandidate = resolve(out, `${name}-candidate-native-padded.png`);
   const pad = spawnSync('python3', ['-c', 'from PIL import Image; import sys; a=Image.open(sys.argv[1]).convert("RGB"); b=Image.open(sys.argv[2]).convert("RGB"); size=(max(a.width,b.width),max(a.height,b.height)); pa=Image.new("RGB",size,"white"); pb=Image.new("RGB",size,"white"); pa.paste(a,(0,0)); pb.paste(b,(0,0)); pa.save(sys.argv[3]); pb.save(sys.argv[4])', ref.png, png, paddedReference, paddedCandidate], { encoding: 'utf8' });
   if (pad.status !== 0) throw new Error(pad.stderr);
   nativeSizeReview = { ...compareImages(paddedReference, paddedCandidate, `${name}-native-size-review`), note: 'Native pixels top-left aligned and white-padded to common canvas; no image resized. Original dimensions remain incomparable and are recorded separately.' };
  }
  report.cases.push({ id: captureLabel || id, baseCase: id, width, stable: data.stable, candidate: png, reference: ref.png, canonicalReferencePng: ref.originalPng, referenceCropNormalization: ref.cropNormalization, referenceRect: ref.data.rect, candidateRect: data.rect, comparison, metrics, nativeSizeReview, geometryFile: `${name}-geometry-difference.json`, selectedControls: await target.locator('[aria-selected="true"],[aria-current="page"],[aria-pressed="true"],input:checked').allTextContents() });
  console.log(JSON.stringify({ id, width, referenceRect: ref.data.rect, candidateRect: data.rect, status: metrics?.status, meanAbsoluteChannelDifference: metrics?.meanAbsoluteChannelDifference }));
 } catch (error) { report.cases.push({ id, width, status: 'failed', error: String(error) }); console.error(`CASE FAILED ${name}: ${error}`); }
}
async function referenceInteractionAt(id, label, action) {
 const c = { ...allCases.find(c => c.id === id), width: 1440 };
 const p = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1, locale: 'zh-CN', reducedMotion: 'reduce' });
 const errors = []; p.on('pageerror', e => errors.push(String(e)));
 try {
  await p.goto(report.referenceUrl, { waitUntil: 'load' });
  await p.waitForFunction(() => window.YKT_DEBUG && window.YKT_VISIBILITY);
  await p.evaluate(c => { YKT_DEBUG.navigate(c.asset); if (typeof vClearTransientSession === 'function') vClearTransientSession(); if (typeof visibilityStore !== 'undefined') delete visibilityStore[vKey()]; Object.assign(ui, c.ui || {}); configs[current] = { ...defaults, ...cfg(), preset: c.preset, density: c.density, contour: c.contour, polish: 'refined', connectionRevision: 'current', inspect: 'native', viewport: c.width, frameHeight: c.height }; render(); }, c);
  if (c.asset === 'R3') await p.locator(`[data-action="recipe-mode"][data-key="r3mode"][data-value="${c.ui.r3mode}"]`).click();
  await p.evaluate(() => { if (document.querySelector('.prototype')) { document.body.classList.add('standalone'); resizeScene(); } });
  await action(p); await settle(p);
  const target = p.locator(c.sourceSelector).nth(c.sourceNth || 0);
  const data = { case: c, action: label, sourceHash, pageErrors: errors, snapshot: await p.evaluate(() => captureSnapshot()), ...await measure(target, referenceSelectors) };
  const clip = { x: Math.round(data.rect.x), y: Math.floor(data.rect.y), width: Math.round(data.rect.width), height: Math.round(data.rect.height) };
  const png = resolve(out, `${label}-1440-reference-native.png`);
  data.screenshotHash = hash(await p.screenshot({ path: png, clip, animations: 'disabled' }));
  await settle(p);
  data.repeatedScreenshotHash = hash(await p.screenshot({ path: resolve(out, `${label}-1440-reference-native-pass2.png`), clip, animations: 'disabled' }));
  data.stable = data.screenshotHash === data.repeatedScreenshotHash;
  await write(`${label}-1440-reference-native.json`, data); await write(`${label}-1440-reference-native.fragment.html`, await target.evaluate(e => e.outerHTML));
  if (errors.length || !data.stable) throw new Error(`Unstable or failed source interaction: ${label} ${errors.join('\n')}`);
  return { data, png };
 } finally { await p.close(); }
}
try {
 await page.goto(report.url, { waitUntil: 'networkidle' });
 const nav = page.getByRole('navigation', { name: '导航候选样本' });
 for (const [sample, ids] of [['A2', ['A2-default', 'A2-queue']], ['A3', ['A3-default', 'A3-inverse']], ['A5', ['A5-default']], ['Contents', ['contents-default', 'C2-info', 'C3-identity', 'C4-summary', 'C5-preview']], ['White', ['white-default', 'W2-soft', 'W3-outlined']]]) {
  if (!ids.some(wanted)) continue;
  await nav.getByRole('button', { name: sample, exact: true }).click(); await page.getByLabel('画板宽度').selectOption('1440');
  for (const id of ids) {
   if (!wanted(id)) continue;
   const exact = id === 'white-default' ? '[data-testid="candidate-White"] > .nv43-two' : `[data-reference-case="${id}"]`;
   if (await page.locator(exact).count()) await capture(id, 1440, exact);
   else if (ids.indexOf(id) === 0) await capture(id, 1440, `[data-testid="candidate-${sample}"]`);
   else report.cases.push({ id, width: 1440, status: 'not-captured', reason: 'No subcase selector; refusing to compare unrelated full family artboard to one reference crop.' });
  }
 }
 for (const [sample, scenes] of [['R1', ['plan', 'industry']], ['R3', ['files', 'errors']]]) {
  if (!scenes.some(scene => wanted(`${sample}-${scene}`))) continue;
  await nav.getByRole('button', { name: sample, exact: true }).click();
  for (const scene of scenes) {
   if (!wanted(`${sample}-${scene}`)) continue;
   await page.getByLabel('业务子场景').selectOption(scene);
   for (const width of process.env.RAIN_COMPARE_WIDTHS ? process.env.RAIN_COMPARE_WIDTHS.split(',').map(Number) : [1440, 1200, 1600]) { await page.setViewportSize({ width: width === 1600 ? 1800 : 1600, height: 1100 }); await page.getByLabel('画板宽度').selectOption(String(width)); await capture(`${sample}-${scene}`, width, `[data-rain-id="recipe-navigation-${sample.toLowerCase()}"]`); }
  }
 }
 if (process.env.RAIN_COMPARE_OPERATIONS === '1') {
  report.interactions = [];
  const operations = [
   { id: 'C5-preview', label: 'C5-preview-selected', sample: 'Contents', candidate: '[data-reference-case="C5-preview"] button[aria-label="等效电路的求解方法"]', source: '[data-action="tab"][data-key="c5"][data-value="等效电路的求解方法"]', attribute: 'aria-pressed', expected: 'true', sourceCheck: '.preview-row.current[data-value="等效电路的求解方法"]' },
   { id: 'R3-files', label: 'R3-files-selected', sample: 'R3', scene: 'files', candidate: 'input[aria-label="选择 高等数学 · 课程资源包"]', source: '[data-action="file-check"][data-id="f0"]', checkbox: true },
   { id: 'R3-errors', label: 'R3-errors-starred', sample: 'R3', scene: 'errors', candidate: '.nv43-star:nth-match(2)', source: '[data-action="star-question"][data-id="e2"]', attribute: 'aria-pressed', expected: 'true' },
  ];
  for (const op of operations.filter(op => wanted(op.id))) {
   await nav.getByRole('button', { name: op.sample, exact: true }).click();
   if (op.scene) await page.getByLabel('业务子场景').selectOption(op.scene);
   await page.setViewportSize({ width: 1600, height: 1100 }); await page.getByLabel('画板宽度').selectOption('1440');
   const target = op.id === 'C5-preview' ? '[data-reference-case="C5-preview"]' : '[data-rain-id="recipe-navigation-r3"]';
   const control = op.id === 'R3-errors' ? page.locator('.nv43-star').nth(1) : page.locator(op.candidate);
   if (op.checkbox) { await control.locator('..').click(); if (!await control.isChecked()) throw new Error(`${op.label} candidate checkbox failed`); }
   else { await control.click(); if (await control.getAttribute(op.attribute) !== op.expected) throw new Error(`${op.label} candidate selection failed`); }
   const ref = await referenceInteractionAt(op.id, op.label, async p => {
    const control = p.locator(op.source); if (op.checkbox) { await control.check(); if (!await control.isChecked()) throw new Error(`${op.label} source checkbox failed`); }
    else { await control.click(); if (op.sourceCheck ? !await p.locator(op.sourceCheck).count() : await control.getAttribute(op.attribute) !== op.expected) throw new Error(`${op.label} source selection failed`); }
   });
   report.interactions.push({ id: op.label, baseCase: op.id, actualDOM: true, candidateAsserted: true, referenceAsserted: true, referenceStable: ref.data.stable });
   await capture(op.id, 1440, target, ref, op.label);
  }
 }
} catch (error) { report.failure = String(error); console.error(error); process.exitCode = 1; }
finally {
 report.sourceAfter = await hashes(); report.sourceUnchangedDuringCapture = JSON.stringify(report.sourceBefore) === JSON.stringify(report.sourceAfter); report.frozenReferenceUnchanged = hash(await readFile(source)) === sourceHash;
 await write('comparison-report.json', report); await browser.close(); console.log(`EVIDENCE ${out}`);
}
if (!report.sourceUnchangedDuringCapture || !report.frozenReferenceUnchanged || report.pageErrors.length || report.consoleErrors.length || report.cases.some(c => c.status === 'failed' || c.stable === false)) process.exitCode = 1;
