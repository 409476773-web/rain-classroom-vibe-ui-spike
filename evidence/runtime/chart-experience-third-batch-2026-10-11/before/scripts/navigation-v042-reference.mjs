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
const out = resolve(repo, 'evidence/runtime/navigation-v042/reference', run);
await mkdir(out, { recursive: true });
const write = (name, value) => writeFile(resolve(out, name), typeof value === 'string' ? value : JSON.stringify(value, null, 2), { flag: 'wx' });
const wanted = ['R2-default', 'A1-default', 'A1-workpage', 'A4-default', 'connections-default', 'W3-outlined'];
const allCases = JSON.parse(await readFile(resolve(pack, 'contracts/visual-cases.json'), 'utf8')).cases;
const cases = wanted.map(id => allCases.find(item => item.id === id));
cases.push(...[1200, 1600].map(width => ({ ...cases.find(item => item.id === 'R2-default'), width })));
const selectors = ['.modal-mask', '.modal', '.modal-head', '.modal-body', '.scope-results', '#scope-search', '.indicator-tabs .tab-label', '.vr-workspace', '.vr-controls', '.vr-identity', '.vr-button', '.vr-splitter', '.rail-item', '.rail-logo', '.rail-bottom', '.vr-account', '.vr-utilities', '.nav-group-title', '.footnote', '.page-top', '.page-top .path', '.page-top h2', '.page-top p', '.tree', '.node-name', '.rightmeta', '.soft-tag', '.prototype', '.context-card', '.course-cover', '.path-line', '.intro', '.sheet-content', '.table-tools', '.tree-row', '.bottom-notice', '.large-component-stage', '.component-header', '.indicator-tabs', '.indicator-tabs .tab', '.tab .tablabel', '.tab .count', '.attached-tab', '.attached-tab .tablabel', '.attached-tab .primary', '.attached-tab .secondary', '.cs-short-separator', '.cs-host', '.cs-layer', '.cs-union', '.cs-row', '.cs-viewport', '.cs-track', '.cs-controls', '.cs-panel', '.rail', '.contextnav', '.workbody', '.work-sheet', '.vr-bar', '.vr-pane-head', '.soft-item', '.search', '.white-filter', '.cs-tab', '.scope-result'];
const props = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'backgroundImage', 'outline', 'outlineOffset', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderRadius', 'boxShadow', 'padding', 'margin', 'gap', 'minHeight', 'height', 'width', 'overflow', 'display', 'position', 'transform', 'fill', 'stroke', 'strokeWidth', 'left', 'right', 'top', 'bottom', 'boxSizing', 'alignItems', 'justifyContent', 'flexDirection', 'order'];
const browser = await chromium.launch();
const report = { kind: 'immutable-reference-only', source, sourceHash, url: process.env.RAIN_REFERENCE_URL || pathToFileURL(source).href, capturedAt: new Date().toISOString(), browser: browser.version(), os: `${os.platform()} ${os.release()} ${os.arch()}`, dpr: 1, locale: 'zh-CN', reducedMotion: 'reduce', referenceSetup: 'YKT_DEBUG only configures reference artboard; action records use real DOM interactions', results: [], interactions: [] };

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
    if (document.querySelector('.prototype')) { document.body.classList.add('standalone'); resizeScene(); }
  }, c);
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
  for (const id of ['A1-default', 'A4-default', 'R2-default']) {
    const c = cases.find(item => item.id === id);
    const { page, errors } = await openCase(c);
    try {
      const actions = id === 'A1-default' ? [
        ['switch-resource', () => page.locator('[data-key="a1global"][data-value="资源中心"]').click()],
        ['switch-workpage', () => page.locator('[data-key="a1page"][data-value="学分结构"]').click()],
      ] : id === 'A4-default' ? [
        ['switch-next', () => page.locator('.large-component-stage [role="tab"]').nth(1).click()],
        ['move-focus-right', () => page.locator('.large-component-stage [role="tab"][aria-selected="true"]').press('ArrowRight')],
        ['activate-keyboard', () => page.locator(':focus').press('Enter')],
      ] : [
        ['select-visible-class', () => page.locator('[data-cs-id="r2-connected-scope"] [role="tab"]').nth(1).click()],
        ['open-more-classes', () => page.locator('[data-action="scopes"]').first().click()],
        ['search-class-200', () => page.locator('#scope-search').fill('200')],
        ['select-searched-class', () => page.locator('[data-action="scope-select"][data-index="200"]').click()],
      ];
      for (const [name, action] of actions) {
        await action();
        await settle(page);
        const tag = `${id}-${c.width}-${name}`;
        const modal = id === 'R2-default' && ['open-more-classes', 'search-class-200'].includes(name);
        const meta = await capture(page, c, tag, errors, modal ? 'body' : name === 'switch-workpage' ? '.sample-card .demo' : c.sourceSelector);
        if (name === 'switch-resource') assert.equal(meta.snapshot.selected.a1global, '资源中心');
        if (name === 'switch-workpage') assert.equal(meta.snapshot.selected.a1page, '学分结构');
        if (name === 'switch-next') assert.equal(meta.snapshot.selected.a4scope, '2026 秋 · 高等数学 1 班');
        if (name === 'activate-keyboard') assert.equal(meta.snapshot.selected.a4scope, '2026 秋 · 创新实验班');
        if (name === 'select-visible-class') assert.equal(meta.snapshot.business.scope, 1);
        if (name === 'open-more-classes') assert.equal(await page.locator('.scope-result').count(), 201);
        if (name === 'search-class-200') assert.equal(await page.locator('.scope-result').count(), 1);
        if (name === 'select-searched-class') { assert.equal(meta.snapshot.business.scope, 200); assert.equal(await page.locator('[role="dialog"]').count(), 0); }
        report.interactions.push({ case: id, action: name, screenshot: `${tag}.png`, selected: meta.snapshot.selected, business: meta.snapshot.business, pageErrors: errors, focusedElement: await page.evaluate(() => ({tag: document.activeElement.tagName, text: document.activeElement.textContent.slice(0,100), action: document.activeElement.dataset.action})), dialog: await page.locator('[role="dialog"]').count(), searchResults: await page.locator('.scope-result').count(), selectedTabs: await page.locator('[role="tab"][aria-selected="true"]').allTextContents() });
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
