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
const out = resolve(repo, 'evidence/runtime/navigation-v042/w5/reference', run);
await mkdir(out, { recursive: true });
const write = (name, value) => writeFile(resolve(out, name), typeof value === 'string' ? value : JSON.stringify(value, null, 2), { flag: 'wx' });
const wanted = ['R4-interaction','R4-grading','R5-default','R6-default'];
const allCases = JSON.parse(await readFile(resolve(pack, 'contracts/visual-cases.json'), 'utf8')).cases;
const baseCases = wanted.map(id => allCases.find(item => item.id === id));
const cases = baseCases.flatMap(c => [1440,1200,1600].map(width => ({...c,width})));
const caseWith = (original, id, patch = {}) => ({ ...baseCases.find(c => c.id === original), id, ...patch });
cases.push(
 ...baseCases.map(c=>({...c,id:c.id+'-inverse',preset:'inverse'})),
 caseWith('R4-interaction','R4-interaction-selected',{actions:[{kind:'click',selector:'[data-action="activity-select"][data-index="1"]'},{kind:'click',selector:'[data-action="group-select"][data-index="1"]'}]}),
 caseWith('R4-grading','R4-grading-selected',{actions:[{kind:'click',selector:'[data-action="grade-question"][data-index="1"]'},{kind:'click',selector:'[data-action="grade-student"][data-index="2"]'}]}),
 caseWith('R5-default','R5-seek-second',{actions:[{kind:'click',selector:'[data-action="replay-seek"][data-index="1"]'}]}),
 caseWith('R5-default','R5-seek-third',{actions:[{kind:'click',selector:'[data-action="replay-seek"][data-index="2"]'}]}),
 caseWith('R6-default','R6-table',{actions:[{kind:'click',selector:'[data-action="r6-page"][data-value="课程任务"]'}]}),
 caseWith('R6-default','R6-form',{actions:[{kind:'click',selector:'[data-action="r6-page"][data-value="学习反馈"]'},{kind:'click',selector:'[data-action="r6-view"][data-value="反馈表单"]'}]}),
 caseWith('R6-default','R6-board',{actions:[{kind:'click',selector:'[data-action="r6-view"][data-value="状态分组"]'}]}),
 caseWith('R6-default','R6-album',{actions:[{kind:'click',selector:'[data-action="r6-view"][data-value="画册"]'}]})
);
const selectors = ['.segmented', '.segmented button', '.segmented button .ic', '.soft-list', '.soft-item .label', '.soft-item .small-label', '.soft-item .av', '.detached-strip', '.object-card', '.object-card .title', '.object-card .meta', '.object-card .meta b', '.object-card .progress', '.object-card .progress span', '.preview-row', '.preview-slide', '.title-text', '.sub', '.dp', '.modal-mask', '.modal', '.modal-head', '.modal-body', '.scope-results', '#scope-search', '.indicator-tabs .tab-label', '.vr-workspace', '.vr-controls', '.vr-identity', '.vr-button', '.vr-splitter', '.rail-item', '.rail-logo', '.rail-bottom', '.vr-account', '.vr-utilities', '.nav-group-title', '.footnote', '.page-top', '.page-top .path', '.page-top h2', '.page-top p', '.tree', '.node-name', '.rightmeta', '.soft-tag', '.prototype', '.context-card', '.course-cover', '.path-line', '.intro', '.sheet-content', '.table-tools', '.tree-row', '.bottom-notice', '.large-component-stage', '.component-header', '.indicator-tabs', '.indicator-tabs .tab', '.tab .tablabel', '.tab .count', '.attached-tab', '.attached-tab .tablabel', '.attached-tab .primary', '.attached-tab .secondary', '.cs-short-separator', '.cs-host', '.cs-layer', '.cs-union', '.cs-row', '.cs-viewport', '.cs-track', '.cs-controls', '.cs-panel', '.rail', '.contextnav', '.workbody', '.work-sheet', '.vr-bar', '.vr-pane-head', '.soft-item', '.search', '.white-filter', '.cs-tab', '.scope-result'];
selectors.push('.workspace-area','.nestedmain','.view-tools-bar','.formwork','.formcanvas','.formpaper','.formbody','.formcover','.formfield','.fieldtile','.player-area','.media-top','.slidecanvas','.slide','.slide-kicker','.slide-footer','.player-controls','.grading-context','.grading-head','.grading-main','.grading-pagebar','.grading-content','.gradeviewer','.grade-content','.gradepanel','.grading-card','.grading-scroll','.queue-bottom','.interaction-head','.interaction-main','.group-result','.group-item','.table','.table th','.table tbody tr','.table tbody td','.kanban','.kanban-col','.task-card','.files-grid','.file-card','textarea','input','.workspace-head','.workspace-head > *','.vr-pane','.vr-pane-head > *','.vr-pane-slot','.vr-pane-status','.vr-ribbon','.vr-ribbon-tabrow','.vr-ribbon-tools','.vr-ribbon-group','.vr-ribbon-command','.vr-editor-paper','.vr-layout-popover','.vr-layout-row','.visibility-controls','.vr-workspace','.nested-main','.nested-context','.nested-docs','.forminspector','.grading-content','.gradepanel','.queue','.playback-left','.knowledge','.ribbon-actions','.vr-controls > *','.search input','.vr-editor-paper textarea');
selectors.push('.answerwork','.answer-title','.answer-body','.pdfpane','.pdf-toolbar','.pdf-page','.gradeform','.gradebottom','.queuehead','.queue-items','.queue .soft-item','.timeline-item','.timeline-item .time','.timeline-item .text','.slide h2','.slide p');
const props = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'backgroundImage', 'outline', 'outlineOffset', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderRadius', 'boxShadow', 'padding', 'margin', 'gap', 'minHeight', 'height', 'width', 'overflow', 'display', 'position', 'transform', 'fill', 'stroke', 'strokeWidth', 'left', 'right', 'top', 'bottom', 'boxSizing', 'alignItems', 'justifyContent', 'flexDirection', 'order'];
const browser = await chromium.launch();
const report = { kind: 'immutable-reference-only', source, sourceHash, url: process.env.RAIN_REFERENCE_URL || pathToFileURL(source).href, capturedAt: new Date().toISOString(), browser: browser.version(), os: `${os.platform()} ${os.release()} ${os.arch()}`, dpr: 1, locale: 'zh-CN', reducedMotion: 'reduce', referenceSetup: 'YKT_DEBUG configures fixed native artboard; all state cases use actual DOM clicks/selects; source-only observations do not pass candidate regressions', results: [], interactions: [] };

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
  const modeKey = c.asset === 'R4' ? 'r4mode' : null;
  if (modeKey && c.ui[modeKey]) await page.locator(`[data-action="recipe-mode"][data-key="${modeKey}"][data-value="${c.ui[modeKey]}"]`).click();
  const actionLog = [];
  for (const action of c.actions || []) {
    const before = await page.evaluate(() => captureSnapshot());
    const control = page.locator(action.selector).first();
    if (action.kind === 'click') await control.click();
    else if (action.kind === 'select') await control.selectOption(action.value);
    else throw new Error(`Unsupported immutable source action: ${action.kind}`);
    await settle(page);
    actionLog.push({ ...action, before: before.visibility, after: (await page.evaluate(() => captureSnapshot())).visibility });
  }
  report.interactions.push({ case: c.id, scope: 'source-only actual DOM setup', actions: actionLog });
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
  for (const c of cases.filter(c => !process.env.RAIN_REFERENCE_CASES || process.env.RAIN_REFERENCE_CASES.split(',').includes(c.id))) {
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
} finally {
  await browser.close();
  report.unchangedSource = sha256(await readFile(source)) === sourceHash;
  await write('capture-report.json', report);
  console.log(`EVIDENCE ${out}`);
}
if (!report.unchangedSource || report.results.some(r => !r.stable || r.pageErrors.length) || report.interactions.some(r => r.status === 'failed' || r.pageErrors?.length)) process.exitCode = 1;
