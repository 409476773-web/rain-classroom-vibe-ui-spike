import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import os from 'node:os';

// Immutable reference only. Diagnostics prepare artboards; all behavior uses DOM inputs.
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pack = resolve(repo, '../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack');
const source = resolve(pack, 'reference/approved-v0.4.2.html');
const decision = JSON.parse(await readFile(resolve(pack, 'contracts/baseline-decision.json'), 'utf8'));
const sha256 = data => createHash('sha256').update(data).digest('hex');
const sourceHash = sha256(await readFile(source));
if (sourceHash !== decision.sha256) throw new Error('Frozen reference SHA-256 mismatch');
const run = new Date().toISOString().replace(/[:.]/g, '-');
const out = resolve(repo, 'evidence/runtime/navigation-v042/w3/reference', run);
await mkdir(out, { recursive: true });
const write = (name, value) => writeFile(resolve(out, name), typeof value === 'string' ? value : JSON.stringify(value, null, 2), { flag: 'wx' });
const wanted = ['A3-default', 'A5-default', 'A2-default', 'A2-queue', 'contents-default', 'C2-info', 'C3-identity', 'C4-summary', 'C5-preview', 'white-default', 'W2-soft', 'W3-outlined', 'R1-plan', 'R1-industry', 'R3-files', 'R3-errors'];
const allCases = JSON.parse(await readFile(resolve(pack, 'contracts/visual-cases.json'), 'utf8')).cases;
const cases = wanted.map(id => allCases.find(item => item.id === id));
cases.push(
  { ...cases.find(c => c.id === 'A3-default'), id: 'A3-inverse', sourceNth: 1, preset: 'inverse' },
  { ...cases.find(c => c.id === 'A3-default'), id: 'A3-compact', density: 'compact' },
  { ...cases.find(c => c.id === 'A5-default'), id: 'A5-info', sourceSelector: '.sample-card .demo', sourceNth: 0 },
  { ...cases.find(c => c.id === 'A5-default'), id: 'A5-summary', sourceSelector: '.large-component-stage' }
);
const selectors = ['.segmented', '.segmented button', '.segmented button .ic', '.soft-list', '.soft-item .label', '.soft-item .small-label', '.soft-item .av', '.detached-strip', '.object-card', '.object-card .title', '.object-card .meta', '.object-card .meta b', '.object-card .progress', '.object-card .progress span', '.preview-row', '.preview-slide', '.title-text', '.sub', '.dp', '.modal-mask', '.modal', '.modal-head', '.modal-body', '.scope-results', '#scope-search', '.indicator-tabs .tab-label', '.vr-workspace', '.vr-controls', '.vr-identity', '.vr-button', '.vr-splitter', '.rail-item', '.rail-logo', '.rail-bottom', '.vr-account', '.vr-utilities', '.nav-group-title', '.footnote', '.page-top', '.page-top .path', '.page-top h2', '.page-top p', '.tree', '.node-name', '.rightmeta', '.soft-tag', '.prototype', '.context-card', '.course-cover', '.path-line', '.intro', '.sheet-content', '.table-tools', '.tree-row', '.bottom-notice', '.large-component-stage', '.component-header', '.indicator-tabs', '.indicator-tabs .tab', '.tab .tablabel', '.tab .count', '.attached-tab', '.attached-tab .tablabel', '.attached-tab .primary', '.attached-tab .secondary', '.cs-short-separator', '.cs-host', '.cs-layer', '.cs-union', '.cs-row', '.cs-viewport', '.cs-track', '.cs-controls', '.cs-panel', '.rail', '.contextnav', '.workbody', '.work-sheet', '.vr-bar', '.vr-pane-head', '.soft-item', '.search', '.white-filter', '.cs-tab', '.scope-result'];
const props = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'backgroundImage', 'outline', 'outlineOffset', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderRadius', 'boxShadow', 'padding', 'margin', 'gap', 'minHeight', 'height', 'width', 'overflow', 'display', 'position', 'transform', 'fill', 'stroke', 'strokeWidth', 'left', 'right', 'top', 'bottom', 'boxSizing', 'alignItems', 'justifyContent', 'flexDirection', 'order'];
const browser = await chromium.launch();
const report = { kind: 'immutable-reference-only', source, sourceHash, url: process.env.RAIN_REFERENCE_URL || pathToFileURL(source).href, capturedAt: new Date().toISOString(), browser: browser.version(), os: `${os.platform()} ${os.release()} ${os.arch()}`, dpr: 1, locale: 'zh-CN', reducedMotion: 'reduce', referenceSetup: 'YKT_DEBUG configures artboard; recipe mode and action records use real DOM interactions', results: [], interactions: [] };

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))));
}
async function openCase(c) {
  const page = await browser.newPage({ viewport: { width: Math.max(1600, c.width), height: Math.max(1100, c.height + 200) }, deviceScaleFactor: 1, locale: 'zh-CN', reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto(report.url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.YKT_DEBUG && window.YKT_VISIBILITY);
  await page.evaluate(c => {
    YKT_DEBUG.navigate(c.asset);
    if (typeof vClearTransientSession === 'function') vClearTransientSession();
    if (typeof visibilityStore !== 'undefined') delete visibilityStore[vKey()];
    Object.assign(ui, c.ui || {});
    configs[current] = { ...defaults, ...cfg(), preset: c.preset, density: c.density, contour: c.contour, polish: 'refined', connectionRevision: 'current', inspect: 'native', viewport: c.width, frameHeight: c.height };
    render();
  }, c);
  const modeKey = c.asset === 'R1' ? 'r1module' : c.asset === 'R3' ? 'r3mode' : null;
  if (modeKey) await page.locator(`[data-action="recipe-mode"][data-key="${modeKey}"][data-value="${c.ui[modeKey]}"]`).click();
  await page.evaluate(() => { if (document.querySelector('.prototype')) { document.body.classList.add('standalone'); resizeScene(); } });
  await settle(page);
  return { page, errors };
}
async function capture(page, c, tag, errors, targetSelector = c.sourceSelector) {
  const target = page.locator(targetSelector).nth(c.sourceNth || 0);
  await target.waitFor({ state: 'visible' });
  const png = await target.screenshot({ path: resolve(out, `${tag}.png`), animations: 'disabled' });
  const measured = await target.evaluate((root, { selectors, props }) => {
    const rect = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
    const style = (e, pseudo = null) => { const cs = getComputedStyle(e, pseudo); return Object.fromEntries([...props, 'content'].map(key => [key, cs[key]])); };
    return { rect: rect(root), measurements: selectors.flatMap(selector => [...(root.matches(selector) ? [root] : []), ...root.querySelectorAll(selector)].slice(0, 16).map((e, index) => ({ selector, index, text: e.textContent.trim().slice(0, 160), rect: rect(e), attributes: Object.fromEntries([...e.attributes].map(a => [a.name, a.value])), styles: style(e), before: style(e, '::before'), after: style(e, '::after'), paths: [...e.querySelectorAll('path')].map(p => p.getAttribute('d')) }))), computedVariables: Object.fromEntries([...getComputedStyle(root)].filter(key => key.startsWith('--')).map(key => [key, getComputedStyle(root).getPropertyValue(key).trim()])) };
  }, { selectors, props });
  const meta = { case: c, sourceHash, environment: { browser: report.browser, os: report.os, dpr: 1, viewport: page.viewportSize() }, screenshot: `${tag}.png`, screenshotHash: sha256(png), ...measured, snapshot: await page.evaluate(() => captureSnapshot()), pageErrors: errors };
  await write(`${tag}.json`, meta);
  await write(`${tag}.fragment.html`, await target.evaluate(root => { const fragment = root.cloneNode(true); fragment.querySelectorAll('script,style').forEach(node => node.remove()); return fragment.outerHTML; }));
  return meta;
}
try {
  for (const c of cases) {
    const tag = `${c.id}-${c.width}`;
    const hashes = [];
    const pageErrors = [];
    for (let pass = 1; pass <= 2; pass++) {
      const { page, errors } = await openCase(c);
      try { hashes.push((await capture(page, c, `${tag}-pass${pass}`, errors)).screenshotHash); pageErrors.push(...errors); }
      finally { await page.close(); }
    }
    const result = { id: tag, hashes, stable: hashes[0] === hashes[1], pageErrors };
    report.results.push(result);
    console.log(JSON.stringify(result));
  }
  const interactionCases = [
    ['A2-default', [['select-function', '[data-key="a2in"][data-value="使用的班级"]', 'selected', 'a2in', '使用的班级']]],
    ['A2-queue', [['select-student', '[data-key="a2queue"][data-value="林晓"]', 'selected', 'a2queue', '林晓']]],
    ['A3-default', [['select-chart', '[data-key="a3chart"][data-value="桑基图"]', 'selected', 'a3chart', '桑基图']]],
    ['A3-inverse', [['select-paper', '[data-key="a3paper"][data-value="B 卷"]', 'selected', 'a3paper', 'B 卷']]],
    ['A5-default', [['select-activity', '[data-key="a5activities"][data-index="1"]', 'selected', 'a5activities']]],
    ['A5-info', [['select-topic', '[data-key="a5topics"][data-index="1"]', 'selected', 'a5topics', '第二题 · 案例分析']]],
    ['R1-plan', [['select-industry', '[data-key="r1top"][data-value="专业应用"]', 'business', 'r1module', 'industry']]],
    ['R1-industry', [['select-chart', '[data-key="r1graph"][data-value="桑基图"]', 'selected', 'r1graph', '桑基图']]],
    ['R3-files', [['select-errors', '[data-key="r3modules"][data-value="题库"]', 'business', 'r3mode', 'errors']]],
    ['R3-errors', [['select-files', '[data-key="r3modules"][data-value="云盘"]', 'business', 'r3mode', 'files']]],
  ];
  for (const [id, actions] of interactionCases) {
    const c = cases.find(item => item.id === id);
    const { page, errors } = await openCase(c);
    try {
      for (const [name, selector, scope, key, expected] of actions) {
        const control = page.locator(selector).first();
        const value = expected ?? await control.getAttribute('data-value');
        await control.click();
        await settle(page);
        const tag = `${id}-${c.width}-${name}`;
        const meta = await capture(page, c, tag, errors);
        assert.equal(meta.snapshot[scope][key], value);
        report.interactions.push({ case: id, action: name, screenshot: `${tag}.png`, selected: meta.snapshot.selected, business: meta.snapshot.business, pageErrors: errors, focusedElement: await page.evaluate(() => ({tag: document.activeElement.tagName, text: document.activeElement.textContent.slice(0,100), action: document.activeElement.dataset.action})) });
        console.log(`ACTION ${tag}`);
      }
    } catch (error) { report.interactions.push({ case: id, status: 'failed', error: String(error), pageErrors: errors }); console.error(error); }
    finally { await page.close(); }
  }
} finally {
  await browser.close();
  report.unchangedSource = sha256(await readFile(source)) === sourceHash;
  await write('capture-report.json', report);
  console.log(`EVIDENCE ${out}`);
}
if (!report.unchangedSource || report.results.some(r => !r.stable || r.pageErrors.length) || report.interactions.some(r => r.status === 'failed' || r.pageErrors?.length)) process.exitCode = 1;
