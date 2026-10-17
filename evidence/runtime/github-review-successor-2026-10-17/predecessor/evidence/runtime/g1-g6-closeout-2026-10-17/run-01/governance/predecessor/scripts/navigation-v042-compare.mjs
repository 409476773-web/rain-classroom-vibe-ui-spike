import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(repo, 'evidence/runtime/navigation-v042');
const referenceRuns = [];
for (const name of (await readdir(resolve(root, 'reference'))).filter(name => /^\d{4}-/.test(name)).sort()) {
  try {
    const report = JSON.parse(await readFile(resolve(root, 'reference', name, 'capture-report.json'), 'utf8'));
    if (report.unchangedSource && report.results?.length === 8 && report.results.every(result => result.stable && !result.pageErrors.length)) referenceRuns.push(name);
  } catch { /* Diagnostic-only folders are never full reference runs. */ }
}
if (!referenceRuns.length) throw new Error('No complete immutable reference capture found');
const reference = resolve(root, 'reference', referenceRuns.at(-1));
const out = resolve(root, 'candidate', new Date().toISOString().replace(/[:.]/g, '-'));
const sampleFilter = process.argv.find(arg => arg.startsWith('--samples='))?.slice('--samples='.length).split(',');
if (sampleFilter?.some(sample => !['A1', 'A4', 'Connections'].includes(sample))) throw new Error('Unknown sample filter');
await mkdir(out, { recursive: true });
const write = (name, value) => writeFile(resolve(out, name), typeof value === 'string' ? value : JSON.stringify(value, null, 2), { flag: 'wx' });
const sourceFiles = ['apps/playground/src/recipes/navigation-v042/r2.tsx', 'apps/playground/src/recipes/navigation-v042/r2.css', 'apps/playground/src/docs/components/navigation-v042-page.tsx', 'packages/layouts/src/connected-surface.tsx', 'packages/layouts/src/connected-surface.css', 'packages/ui/src/navigation/navigation.tsx', 'packages/ui/src/navigation/navigation.css', 'packages/ui/src/tabs/tabs.tsx', 'packages/ui/src/styles.css', 'apps/playground/src/recipes/navigation-v042/samples.tsx', 'apps/playground/src/recipes/navigation-v042/samples.css'];
const hashes = async () => Object.fromEntries(await Promise.all(sourceFiles.map(async path => [path, createHash('sha256').update(await readFile(resolve(repo, path))).digest('hex')])));
const report = { kind: 'candidate-comparison-only', url: process.env.RAIN_CANDIDATE_URL || 'http://127.0.0.1:5198/#navigation-v042', reference, sourceBefore: await hashes(), cases: [], consoleErrors: [], pageErrors: [], approved: false };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1, locale: 'zh-CN', reducedMotion: 'reduce' });
report.browser = browser.version();
page.on('pageerror', error => report.pageErrors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
const properties = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'padding', 'margin', 'gap', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderRadius', 'boxShadow', 'width', 'height', 'overflow', 'display', 'position', 'transform', 'left', 'right', 'top', 'bottom', 'content'];
const map = [['.indicator-tabs', '.rain-tabs__nav'], ['.indicator-tabs .tab', '[role="tab"]'], ['.indicator-tabs .tab-label', '.rain-tabs__label'], ['.tab .count', '.rain-tabs__count'], ['.large-component-stage', '.nv42-parity'], ['.component-header', '.nv42-a1-header'], ['.indicator-tabs', '.rain-navigation__bar'], ['.indicator-tabs .tab', '.rain-navigation__bar .rain-tabs__tab'], ['.indicator-tabs .tab-label', '.rain-navigation__bar .rain-tabs__label'], ['.attached-tab .primary', '.rain-tabs__label > span'], ['.attached-tab .secondary', '.rain-navigation__description'], ['.prototype', '[data-rain-id="recipe-navigation-r2"]'], ['.vr-bar', '.nv42-workspace-bar'], ['.rail', '.nv42-rail'], ['.contextnav', '.nv42-context'], ['.context-card', '.nv42-context-card'], ['.course-cover', '.nv42-cover'], ['.cs-host', '.rain-connected-surface'], ['.cs-row', '.rain-connected-surface__row'], ['.cs-viewport', '.rain-tabs__viewport'], ['.cs-track', '[role="tablist"]'], ['.cs-controls', '.nv42-connection-controls'], ['.attached-tab', '[role="tab"]'], ['.cs-panel', '.rain-connected-surface__panel'], ['.page-top', '.nv42-page-top'], ['.sheet-content', '.nv42-sheet-content'], ['.table-tools', '.nv42-table-tools'], ['.tree-row', '[role="treeitem"]'], ['.bottom-notice', '.nv42-notice']];
async function settle() { await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(650); await page.mouse.move(0, 0); await page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)))); }
async function capture(name, selector, refName, sourceSelector) {
  await settle();
  const target = page.locator(selector).first();
  await target.waitFor({ state: 'visible' });
  const png = `${name}.png`;
  await target.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const box = await target.boundingBox();
  // Canvas height is integral but reviewer chrome can place it at a fractional y.
  // Keep 1:1 pixels: snap the crop origin only; never resize either image.
  const crop = name.startsWith('R2-') || sourceSelector ? { x: Math.round(box.x), y: Math.floor(box.y), width: Math.round(box.width), height: Math.round(box.height) } : null;
  if (crop) await page.screenshot({ path: resolve(out, png), clip: crop, animations: 'disabled' });
  else await target.screenshot({ path: resolve(out, png), animations: 'disabled' });
  console.log(`SCREENSHOT ${resolve(out, png)}`);
  const data = await target.evaluate((root, { properties, selectors }) => {
    const rect = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
    return { rect: rect(root), measurements: selectors.flatMap(selector => [...(root.matches(selector) ? [root] : []), ...root.querySelectorAll(selector)].slice(0, 20).map((el, index) => ({ selector, index, text: el.textContent.trim().slice(0, 100), rect: rect(el), attributes: Object.fromEntries([...el.attributes].map(a => [a.name, a.value])), styles: Object.fromEntries(properties.map(key => [key, getComputedStyle(el)[key]])), before: Object.fromEntries(properties.map(key => [key, getComputedStyle(el, '::before')[key]])), after: Object.fromEntries(properties.map(key => [key, getComputedStyle(el, '::after')[key]])), paths: [...el.querySelectorAll('path')].slice(0, 4).map(path => path.getAttribute('d')) }))), variables: Object.fromEntries([...getComputedStyle(root)].filter(p => p.startsWith('--rain-local')).map(p => [p, getComputedStyle(root).getPropertyValue(p)])) };
  }, { properties, selectors: [...new Set([...map.map(pair => pair[1]), '[data-rain-id]', '[data-slot="label"]', '[data-slot="description"]', '.nv42-path', '.nv42-title-row', '.nv42-tree-meta'])] });
  data.screenshotCrop = crop;
  data.viewport = page.viewportSize();
  await write(`${name}.json`, data);
  await write(`${name}.fragment.html`, await target.evaluate(el => el.outerHTML));
  const result = { name, png, rect: data.rect, viewport: page.viewportSize(), selectedControls: await target.locator('[aria-selected="true"], [aria-current="page"]').allTextContents(), compared: false };
  if (refName) {
    const ref = JSON.parse(await readFile(resolve(reference, `${refName}.json`), 'utf8'));
    let referencePng = resolve(reference, `${refName}.png`);
    if (sourceSelector) {
      const region = ref.measurements.find(item => item.selector === sourceSelector && item.index === 0).rect;
      referencePng = resolve(out, `${name}-reference-crop.png`);
      const crop = spawnSync('python3', ['-c', 'from PIL import Image; import sys; x,y,w,h=map(int,sys.argv[3:]); Image.open(sys.argv[1]).crop((x,y,x+w,y+h)).save(sys.argv[2])', resolve(reference, `${refName}.png`), referencePng, String(Math.round(region.x - ref.rect.x)), String(Math.round(region.y - ref.rect.y)), String(Math.round(region.width)), String(Math.round(region.height))], { encoding: 'utf8' });
      if (crop.status !== 0) throw new Error(crop.stderr);
      ref.rect = region;
      result.referenceRegion = sourceSelector;
    }
    const geometry = map.flatMap(([refSelector, candidateSelector]) => data.measurements.filter(m => m.selector === candidateSelector).map(m => {
      const source = ref.measurements.find(r => r.selector === refSelector && r.index === m.index);
      if (!source) return { refSelector, candidateSelector, index: m.index, missingReference: true };
      const from = { ...source.rect, x: source.rect.x - ref.rect.x, y: source.rect.y - ref.rect.y };
      const to = { ...m.rect, x: m.rect.x - data.rect.x, y: m.rect.y - data.rect.y };
      return { refSelector, candidateSelector, index: m.index, reference: from, candidate: to, delta: Object.fromEntries(Object.keys(from).map(key => [key, +(to[key] - from[key]).toFixed(4)])), changedStyles: Object.fromEntries(properties.filter(key => source.styles[key] !== m.styles[key]).map(key => [key, { reference: source.styles[key], candidate: m.styles[key] }])) };
    }));
    await write(`${name}.geometry-difference.json`, geometry);
    const compare = spawnSync('python3', [resolve(repo, '../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/tools/compare_renders.py'), referencePng, resolve(out, png), '--out', resolve(out, `${name}-comparison`)], { encoding: 'utf8' });
    result.compared = compare.status === 0;
    result.compareExitCode = compare.status;
    result.compareOutput = `${compare.stdout}${compare.stderr}`.trim();
  }
  report.cases.push(result);
}
try {
  await page.goto(report.url, { waitUntil: 'networkidle' });
  if (!sampleFilter) await page.getByRole('navigation', { name: '导航候选样本' }).getByRole('button', { name: 'R2', exact: true }).click();
  for (const width of sampleFilter ? [] : [1440, 1200, 1600]) {
    if (width === 1600) await page.setViewportSize({ width: 1800, height: 1100 });
    await page.getByLabel('画板宽度').selectOption(String(width));
    await capture(`R2-default-${width}`, '[data-rain-id="recipe-navigation-r2"]', `R2-default-${width}-pass1`);
  }
  if (!process.argv.includes('--r2-only')) {
    await page.setViewportSize({ width: 1600, height: 1100 });
    await page.getByLabel('画板宽度').selectOption('1440');
    for (const sample of sampleFilter ?? ['A1', 'A4', 'Connections']) {
      await page.getByRole('navigation', { name: '导航候选样本' }).getByRole('button', { name: sample, exact: true }).click();
      if (sample !== 'A1') await page.locator(`[data-testid="candidate-${sample}"] [role="tablist"]`).first().getByRole('tab').first().click();
      const baseline = sample === 'Connections' ? 'connections-default-1440-pass1' : `${sample}-default-1440-pass1`;
      await capture(`${sample}-default`, `[data-testid="candidate-${sample}"]`, baseline);
      if (sample === 'A1') {
        await capture('A1-count-track', '.nv42-a1-workpage .rain-tabs__nav', 'A1-workpage-1440-pass1', '.indicator-tabs');
        await page.locator('[data-testid="candidate-A1"]').getByRole('link', { name: '资源中心', exact: true }).click();
        await capture('A1-selected-resource', '[data-testid="candidate-A1"]', 'A1-default-1440-switch-resource');
        continue;
      }
      const tabs = page.locator(`[data-testid="candidate-${sample}"] [role="tablist"]`).first().getByRole('tab');
      if (await tabs.count() > 1) { await tabs.nth(1).click(); await capture(`${sample}-selected-second`, `[data-testid="candidate-${sample}"]`, sample === 'A4' ? 'A4-default-1440-switch-next' : undefined); }
    }
    if (!sampleFilter || sampleFilter.includes('Connections')) {
    await page.getByLabel('表面').selectOption('outlined');
    await page.locator('[data-testid="candidate-Connections"] [role="tablist"]').first().getByRole('tab').first().click();
    await capture('Connections-outlined-behavior', '[data-testid="candidate-Connections"]');
    report.outlinedBehavior = await page.locator('[data-testid="candidate-Connections"] [aria-selected="true"]').evaluate(el => ({ note: 'Outline behavior only; this identity fixture is not the W3 full-artboard parity case.', selected: el.textContent, topIndicator: Object.fromEntries(['content', 'height', 'backgroundColor', 'top', 'left', 'right'].map(key => [key, getComputedStyle(el, '::before')[key]])) }));
    }
  }
} catch (error) { report.failure = String(error); console.error(error); process.exitCode = 1; }
finally {
  report.sourceAfter = await hashes();
  report.sourceUnchangedDuringCapture = JSON.stringify(report.sourceBefore) === JSON.stringify(report.sourceAfter);
  await write('comparison-report.json', report);
  await browser.close();
  console.log(`EVIDENCE ${out}`);
}
if (report.pageErrors.length || report.consoleErrors.length || report.cases.some(item => item.compareExitCode !== undefined && item.compareExitCode !== 0)) process.exitCode = 1;
