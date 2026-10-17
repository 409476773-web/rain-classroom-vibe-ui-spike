import { chromium, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('apps/playground/src/docs/components');
const folder = resolve('evidence/runtime/chart-demo-data-2026-10-11/interaction-browser');
await mkdir(folder, { recursive: true });
const after = JSON.parse(await readFile('evidence/runtime/chart-demo-data-2026-10-11/after-browser/facts.json', 'utf8'));
const sourceText = async file => readFile(`${root}/${file}`, 'utf8');
const hash = value => createHash('sha256').update(value).digest('hex');
const trioSource = await sourceText('chart-variants/trend.tsx');
const trioCode = trioSource.match(/const trioSamples = ([\s\S]*?) as const;/)[1];
const trioSamples = Function(`return (${trioCode})`)();
const groupedSource = await sourceText('chart-data.ts');
const groupedCode = groupedSource.match(/const groupedBarSnapshots = ([\s\S]*?) as const;/)[1];
const groupedSamples = Function(`return (${groupedCode})`)();
const miniSource = await sourceText('chart-business/mini-data.ts');
const miniLabels = miniSource.match(/const labels = (.*);/)[1];
const miniCode = miniSource.match(/export function makeMiniRows([\s\S]*?)\nexport function getComparisonMax/)[1];
const miniFunction = `function makeMiniRows${miniCode}`.replace('state: BusinessChartState', 'state').replace('): MiniRow[]', ')').replaceAll(' as const', '').replaceAll(']!', ']');
const makeMiniRows = Function(`const labels = ${miniLabels}; ${miniFunction}; return makeMiniRows`)();
const classes = ['一班', '二班', '三班', '四班', '五班', '六班'];
const courses = ['课程一', '课程二', '课程三', '课程四', '课程五', '课程六'];
let results = { baseURL: 'http://127.0.0.1:5173', sourceFreeze: after.sources, cases: [], errors: [], downloads: [], limitations: ['No Safari, VoiceOver, physical touch, contrast conformance, frame-rate or publication claim.'] };
if (process.argv.includes('--resume')) {
  results = JSON.parse(await readFile(`${folder}/facts.json`, 'utf8'));
  delete results.failure;
  for (const source of after.sources) expect(hash(await readFile(source.path))).toBe(source.sha256);
}
const browser = await chromium.launch();

async function tableRows(host) {
  return host.locator('tbody tr').evaluateAll(rows => rows.map(row => Array.from(row.querySelectorAll('th,td'), cell => cell.textContent.trim())));
}
async function openData(host) {
  const details = host.locator('details.rain-chart-data');
  if (!(await details.getAttribute('open') !== null)) await details.locator('summary').click();
}
async function geometry(host, kind) {
  const selector = kind === 'line' ? '.rain-chart-plot path[stroke-linecap="round"][stroke-width="2"]' : kind === 'bar' ? '.rain-chart-plot [class^="bar-series-"] rect' : 'path[pointer-events="none"]';
  const nodes = await host.locator(selector).evaluateAll(nodes => nodes.map(node => ({ d: node.getAttribute('d'), x: node.getAttribute('x'), y: node.getAttribute('y'), width: node.getAttribute('width'), height: node.getAttribute('height') })));
  expect(nodes.length).toBeGreaterThan(0);
  return nodes;
}
async function finiteGeometry(host) {
  const values = await host.locator('svg path,svg rect').evaluateAll(nodes => nodes.flatMap(node => ['d','x','y','width','height'].map(name => node.getAttribute(name)).filter(Boolean)));
  expect(values.length).toBeGreaterThan(0);
  expect(values.some(value => /NaN|Infinity|undefined/.test(value))).toBe(false);
}
async function update(host, page, revision, statusStyle = 'variant') {
  await host.getByRole('button', { name: '更新数据', exact: true }).evaluate(node => node.click());
  const expected = statusStyle === 'business' ? `更新 ${revision} 次` : `已更新 ${revision} 次`;
  await expect(host.getByRole('status').filter({ hasText: expected })).toBeVisible();
  await page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))));
}
async function tooltip(page, host, kind, expected) {
  const plot = host.locator('.rain-chart-plot').first();
  await plot.scrollIntoViewIfNeeded();
  const box = await plot.boundingBox();
  const margin = kind === 'line' ? { left: 16, right: 16 } : { left: 58, right: 24 };
  await page.mouse.move(box.x + margin.left + (box.width - margin.left - margin.right) * .43, box.y + box.height * .42);
  const tip = host.locator('.rain-chart-tooltip').first();
  await expect(tip).toBeVisible();
  const text = await tip.innerText();
  const label = expected.find(row => text.includes(row[0]));
  expect(label, `Tooltip title must select one exact row: ${text}`).toBeTruthy();
  for (const value of label.slice(1)) expect(text.split(/\s+/)).toContain(value);
  expect(text).toContain(kind === 'line' ? '次' : '人');
  await page.mouse.move(0, 0);
  return { text, matchedRow: label };
}
async function sourceCheck(page, host, summary, files, assertions, label) {
  const source = host.locator('details.rain-chart-source').filter({ hasText: summary });
  await source.locator('summary').click();
  const decoded = async file => {
    const link = source.getByRole('link', { name: `下载 ${file}`, exact: true });
    const href = await link.getAttribute('href');
    return decodeURIComponent(href.slice(href.indexOf(',') + 1));
  };
  const matches = [];
  for (const file of files) {
    const content = await decoded(file);
    expect(content).toBe(await sourceText(file));
    matches.push({ file, sha256: hash(content), matchesRuntime: true });
  }
  const main = await decoded('main.tsx');
  for (const token of assertions) expect(main).toContain(token);
  const event = page.waitForEvent('download');
  await source.getByRole('link', { name: `下载 ${files[0]}`, exact: true }).click();
  const download = await event;
  const saved = `${folder}/${label}-download.txt`;
  await download.saveAs(saved);
  expect(await readFile(saved, 'utf8')).toBe(await sourceText(files[0]));
  results.downloads.push({ label, matches, mainConfigurationVerified: assertions, actualDownload: saved, suggestedFilename: download.suggestedFilename() });
  await source.locator('summary').click();
}

async function reviewTrio(page, width, motion) {
  await page.goto(`${results.baseURL}/?demo-review=${width}-${motion}-line#chart-line`);
  await page.getByRole('combobox', { name: '视觉配方', exact: true }).selectOption('monochrome-blue');
  const card = page.locator('[data-chart-variant="line-trio-brush"]');
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator('[data-ready="true"]')).toBeVisible();
  await openData(card);
  const expected = revision => trioSamples[revision % 3].desktop.map((desktop, i) => [`9月${i + 1}日`, String(desktop), String(trioSamples[revision % 3].mobile[i]), String(trioSamples[revision % 3].tablet[i])]);
  const states = [];
  let firstGeometry;
  let transition;
  for (let revision = 0; revision <= 3; revision++) {
    if (revision) await update(card, page, revision);
    await expect.poll(() => tableRows(card)).toEqual(expected(revision));
    if (revision === 0) { await page.waitForTimeout(1400); firstGeometry = await geometry(card, 'line'); }
    if (revision === 1) {
      await page.waitForTimeout(120); const middle = await geometry(card, 'line');
      await page.waitForTimeout(1500); const end = await geometry(card, 'line');
      expect(end).not.toEqual(firstGeometry);
      if (motion === 'no-preference') expect(middle).not.toEqual(end);
      else expect(middle).toEqual(end);
      transition = { intermediateGeometry: JSON.stringify(middle) !== JSON.stringify(end), finiteTerminal: true };
    }
    await finiteGeometry(card);
    states.push({ revision, rows: await tableRows(card) });
  }
  expect(states[3].rows).toEqual(states[0].rows);
  await page.waitForTimeout(motion === 'reduce' ? 50 : 1400);
  const tip = await tooltip(page, card, 'line', expected(3));
  const left = card.locator('.visx-brush-handle-left');
  const before = (await left.boundingBox()).x;
  const start = card.getByRole('slider', { name: '范围开始日期' });
  await start.focus(); await page.keyboard.press('ArrowRight');
  await expect(start).toHaveValue('1');
  await expect.poll(async () => (await left.boundingBox()).x).toBeGreaterThan(before + 3);
  await expect.poll(() => tableRows(card)).toEqual(expected(3).slice(1));
  const endRange = card.getByRole('slider', { name: '范围结束日期' });
  await endRange.focus(); await page.keyboard.press('ArrowLeft');
  await expect(endRange).toHaveValue('28');
  await expect.poll(() => tableRows(card)).toEqual(expected(3).slice(1, 29));
  await expect(card.getByRole('status', { name: '当前查看范围' })).toContainText('9月2日—9月29日');
  if (width === 1440 && motion === 'reduce') {
    await sourceCheck(page, card, '查看本卡代码', ['chart-variants/trend.tsx', 'chart-data.ts'], ['revision={3}', 'data-recipe="monochrome-blue"', `"brush":["${new Date(2026, 8, 2).toISOString()}"`], 'line-trio-brush');
  }
  await card.getByRole('button', { name: '重置范围', exact: true }).click();
  await expect(start).toHaveValue('0'); await expect(endRange).toHaveValue('29');
  await expect.poll(() => tableRows(card)).toEqual(expected(3));
  const right = card.locator('.visx-brush-handle-right');
  await right.scrollIntoViewIfNeeded(); const rightBox = await right.boundingBox();
  await page.mouse.move(rightBox.x + rightBox.width / 2, rightBox.y + rightBox.height / 2);
  await page.mouse.down(); await page.mouse.move(rightBox.x - Math.min(120, width * .22), rightBox.y + rightBox.height / 2, { steps: 8 }); await page.mouse.up();
  await expect.poll(() => endRange.inputValue()).not.toBe('29');
  const endIndex = Number(await endRange.inputValue());
  await expect.poll(() => tableRows(card)).toEqual(expected(3).slice(0, endIndex + 1));
  await card.getByRole('button', { name: '重置范围', exact: true }).click();
  await expect.poll(() => tableRows(card)).toEqual(expected(3));
  await card.getByRole('button', { name: '重播动效', exact: true }).click();
  await page.waitForTimeout(motion === 'reduce' ? 100 : 1500);
  await finiteGeometry(card); await expect.poll(() => tableRows(card)).toEqual(expected(3));
  results.cases.push({ target: 'line-trio-brush', width, motion, threeSnapshotCycle: true, states, transition, tooltip: tip, brush: { keyboardStart: 1, keyboardEnd: 28, pointerEnd: endIndex, tableAndVisibleRangeSynchronized: true, resetRows: 30 }, replayKeepsData: true });
}

async function reviewBars(page, width, motion) {
  await page.goto(`${results.baseURL}/?demo-review=${width}-${motion}-bar#chart-bar`);
  await page.getByRole('combobox', { name: '视觉配方', exact: true }).selectOption('monochrome-blue');
  const main = page.locator('[data-rain-id="chart-bar"]');
  const section = main.locator('xpath=ancestor::section[contains(@class,"component-doc__example")][1]');
  await openData(main);
  const mainExpected = revision => groupedSamples[revision % 3].map((row, i) => [courses[i], ...row.slice(0, 3).map(String)]);
  const mainStates = []; let initial; let transition;
  for (let revision = 0; revision <= 3; revision++) {
    if (revision) await update(section, page, revision);
    await expect.poll(() => tableRows(main)).toEqual(mainExpected(revision));
    if (revision === 0) { await main.scrollIntoViewIfNeeded(); await page.waitForTimeout(1400); initial = await geometry(main, 'bar'); }
    if (revision === 1) {
      await page.waitForTimeout(120); const middle = await geometry(main, 'bar'); await page.waitForTimeout(1500); const end = await geometry(main, 'bar');
      expect(end).not.toEqual(initial);
      if (motion === 'no-preference') expect(middle).not.toEqual(end); else expect(middle).toEqual(end);
      transition = { intermediateGeometry: JSON.stringify(middle) !== JSON.stringify(end), finiteTerminal: true };
    }
    await finiteGeometry(main); mainStates.push({ revision, rows: await tableRows(main) });
  }
  expect(mainStates[3].rows).toEqual(mainStates[0].rows);
  await page.waitForTimeout(motion === 'reduce' ? 50 : 1400);
  const mainTip = await tooltip(page, main, 'bar', mainExpected(3));
  if (width === 1440 && motion === 'reduce') await sourceCheck(page, page.locator('[data-rain-id="doc-chart-bar"]'), '调用配置、完整源码与示例数据', ['chart-data.ts', 'chart-examples.tsx'], ['useState(3)', 'data-recipe="monochrome-blue"'], 'bar-grouped');
  results.cases.push({ target: 'bar-grouped', width, motion, threeSnapshotCycle: true, states: mainStates, transition, tooltip: mainTip });

  const card = page.locator('[data-chart-variant="bar-multiple-series"]');
  await card.scrollIntoViewIfNeeded(); await expect(card.locator('[data-ready="true"]')).toBeVisible(); await openData(card);
  const expected = revision => groupedSamples[revision % 3].map((row, i) => [classes[i], String(row[1]), String(row[0] - row[1])]);
  const states = [];
  for (let revision = 0; revision <= 3; revision++) {
    if (revision) await update(card, page, revision);
    await expect.poll(() => tableRows(card)).toEqual(expected(revision)); await finiteGeometry(card);
    states.push({ revision, rows: await tableRows(card) });
  }
  expect(states[3].rows).toEqual(states[0].rows);
  await page.waitForTimeout(motion === 'reduce' ? 50 : 1500);
  const tip = await tooltip(page, card, 'bar', expected(3));
  if (width === 1440 && motion === 'reduce') await sourceCheck(page, card, '查看本卡代码', ['chart-variants/bar.tsx', 'chart-data.ts'], ['revision={3}', 'variantId="bar-multiple-series"'], 'bar-multiple-series');
  await card.getByRole('button', { name: '重播动效', exact: true }).click(); await page.waitForTimeout(motion === 'reduce' ? 100 : 1500);
  await finiteGeometry(card); await expect.poll(() => tableRows(card)).toEqual(expected(3));
  results.cases.push({ target: 'bar-multiple-series', width, motion, threeSnapshotCycle: true, states, tooltip: tip, completedPlusActiveMatchesParticipants: true, replayKeepsData: true });
}

async function miniReadings(page, revision) {
  const expectedRows = makeMiniRows(revision);
  const first = expectedRows[0];
  const gallery = page.locator('.rain-business-mini-gallery');
  for (const kind of ['segments', 'pie', 'donut']) {
    const group = gallery.locator(`[data-mini-group="${kind}"]`);
    await expect(group.locator('.rain-business-mini-legend span')).toHaveText(first.parts.map(value => `${value} 人`));
    expect(first.parts.reduce((sum, value) => sum + value, 0)).toBe(first.count);
  }
  for (const kind of ['ring', 'arc']) {
    const group = gallery.locator(`[data-mini-group="${kind}"]`);
    await expect(group.locator('.rain-business-mini-gallery__description')).toHaveText(`完成 ${first.completed} 人 · 目标 ${first.goal} 人`);
    await expect(group.locator('figcaption').first()).toHaveText(`紧凑 · ${first.completed}%`);
    await expect(group.locator('[data-primary-reading]')).toHaveText(`${first.completed}%`);
  }
  const cards = page.locator('.rain-business-cards');
  await expect(cards.locator('[data-primary-reading]')).toHaveText([`${first.count} 人`, `${first.count} 门`, `${first.completed}%`]);
  await expect(cards.locator('.rain-business-composition-reading b')).toHaveText(first.parts.map(String));
  const rows = page.locator('.rain-business-table tbody tr');
  await expect(rows).toHaveCount(5);
  const table = [];
  for (let index = 0; index < 5; index++) {
    const row = rows.nth(index), expected = expectedRows[index];
    await expect(row.locator('[data-reading="count"]')).toHaveText(`${expected.count} 人`);
    await expect(row.locator('[title]').filter({ hasText: '共' })).toHaveAttribute('title', `已完成 ${expected.parts[0]} / 进行中 ${expected.parts[1]} / 待开始 ${expected.parts[2]}`);
    await expect(row.locator('td').last()).toContainText(`${expected.completed}%`);
    table.push({ id: expected.id, count: expected.count, parts: expected.parts, completed: expected.completed, goal: expected.goal });
  }
  return { revision, first: { count: first.count, parts: first.parts, completed: first.completed, goal: first.goal }, table };
}
async function reviewMini(page, width, motion) {
  await page.goto(`${results.baseURL}/?demo-review=${width}-${motion}-business#chart-business`);
  const host = page.locator('[data-rain-id="doc-chart-business"]');
  await page.getByRole('combobox', { name: '业务图表配色', exact: true }).selectOption('monochrome-blue');
  await page.getByRole('combobox', { name: '业务数据状态', exact: true }).selectOption('normal');
  const pie = page.locator('.rain-business-mini-gallery [data-mini-kind="pie"][data-size="comfortable"]');
  await pie.scrollIntoViewIfNeeded(); await expect(pie.locator('path[pointer-events="none"]').first()).toBeVisible(); await page.waitForTimeout(1200);
  const initial = await geometry(pie, 'pie');
  const owned = pie.locator('path[pointer-events="none"]').first(); await owned.evaluate(node => node.setAttribute('data-review-mounted', 'true'));
  const states = []; let transition;
  const maxRevision = width === 1440 && motion === 'reduce' ? 12 : 3;
  for (let revision = 0; revision <= maxRevision; revision++) {
    if (revision) await update(host, page, revision, 'business');
    states.push(await miniReadings(page, revision));
    if (revision === 1) {
      await page.waitForTimeout(120); const middle = await geometry(pie, 'pie'); await page.waitForTimeout(1000); const end = await geometry(pie, 'pie');
      expect(end).not.toEqual(initial);
      if (motion === 'no-preference') expect(middle).not.toEqual(end); else expect(middle).toEqual(end);
      await expect(pie.locator('[data-review-mounted="true"]')).toHaveCount(1);
      transition = { intermediateGeometry: JSON.stringify(middle) !== JSON.stringify(end), mountedPathPreserved: true, finiteTerminal: true };
    }
    await finiteGeometry(pie);
    if (revision === 3 && width === 1440 && motion === 'reduce') await sourceCheck(page, host, '条形与嵌入组合源码', ['chart-business/mini-data.ts', 'chart-business/mini-examples.tsx', 'chart-business/embedding-examples.tsx'], ['"revision":3', '"state":"normal"', '"recipe":"monochrome-blue"'], 'business-mini');
  }
  expect(states[3].first.completed).toBe(states[0].first.completed);
  expect(states[3].first.parts).toEqual(states[0].first.parts);
  if (maxRevision === 12) expect(states[12].table).toEqual(states[0].table);
  const firstRow = page.locator('.rain-business-table tbody tr').first(); await firstRow.scrollIntoViewIfNeeded();
  await firstRow.getByRole('button', { name: '计算机学院', exact: true }).click();
  const expected = makeMiniRows(maxRevision)[0];
  await expect(page.locator('.rain-business-detail').filter({ hasText: '每日读数' })).toContainText(`构成：已完成 ${expected.parts[0]} / 进行中 ${expected.parts[1]} / 待开始 ${expected.parts[2]}；目标：${expected.completed} / ${expected.goal}`);
  await page.getByRole('button', { name: '重播动效', exact: true }).evaluate(node => node.click());
  await page.waitForTimeout(motion === 'reduce' ? 100 : 1200); await miniReadings(page, maxRevision);
  await page.getByRole('combobox', { name: '业务数据状态', exact: true }).selectOption('zero');
  await expect(page.locator('.rain-business-cards [data-primary-reading]').last()).toHaveText('—');
  await expect(page.locator('.rain-business-mini-gallery [data-mini-group="ring"]')).toContainText('不适用');
  expect(await page.locator('.rain-business-mini-gallery [data-mini-group="ring"]').textContent()).not.toMatch(/\d+%/);
  await page.getByRole('combobox', { name: '业务数据状态', exact: true }).selectOption('missing');
  await expect(page.locator('.rain-business-mini-gallery [data-mini-group="pie"]')).toContainText('缺测');
  await expect(page.locator('.rain-business-cards [data-primary-reading]').last()).toHaveText('—');
  results.cases.push({ target: 'business-composition-and-progress', width, motion, states, compositionAndProgressSnapshots: 3, existingQuantityCycle: 4, fullDataCycle: maxRevision === 12 ? 12 : 'only first four states checked', transition, tableCardsGalleryAndDetailSynchronized: true, unavailableStatesKeepTruthfulReading: true, replayKeepsData: true });
}

try {
  for (const width of [1440, 390]) for (const motion of ['reduce', 'no-preference']) {
    if (results.cases.filter(item => item.width === width && item.motion === motion).length === 4) continue;
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: motion, timezoneId: 'Asia/Shanghai', acceptDownloads: true });
    const page = await context.newPage(); page.on('pageerror', error => results.errors.push(String(error)));
    for (const [name, review] of [['trio', reviewTrio], ['grouped-bars', reviewBars], ['business-mini', reviewMini]]) {
      console.log(`Review ${name} ${width} ${motion}`);
      await review(page, width, motion);
    }
    await context.close();
  }
  for (const source of after.sources) expect(hash(await readFile(source.path))).toBe(source.sha256);
  expect(results.errors).toEqual([]);
  results.status = 'passed';
  console.log(`Passed ${results.cases.length} target-width-motion cases, four current-source downloads, and final source-freeze checks.`);
} catch (error) {
  results.status = 'failed'; results.failure = String(error.stack ?? error); throw error;
} finally {
  await writeFile(`${folder}/facts.json`, JSON.stringify(results, null, 2));
  await browser.close();
}
