import assert from 'node:assert/strict';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { chromium } from '@playwright/test';

const base = process.env.CONSUMER_URL || 'http://127.0.0.1:5391';
const output = resolve(process.env.CONSUMER_EVIDENCE || 'logs');
mkdirSync(join(output, 'screenshots'), { recursive: true });
const facts = { url: base, startedAt: new Date().toISOString(), browser: '', checks: [], console: [], screenshots: [], status: 'running' };
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({ headless: true, ...(existsSync(chrome) ? { executablePath: chrome } : {}) });
facts.browser = browser.version();
function observe(page) {
  page.on('console', message => facts.console.push({ type: message.type(), text: message.text(), url: page.url() }));
  page.on('pageerror', error => facts.console.push({ type: 'pageerror', text: error.message, url: page.url() }));
  page.on('requestfailed', request => facts.console.push({ type: 'requestfailed', text: `${request.url()}: ${request.failure()?.errorText}`, url: page.url() }));
}
async function check(name, action) { await action(); facts.checks.push({ name, status: 'passed' }); console.log(`PASS ${name}`); }
async function snapshot(page, name) {
  const path = join(output, 'screenshots', `${name}.png`);
  const viewport = page.viewportSize();
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width: viewport.width, height: Math.max(viewport.height, height) });
  await page.waitForTimeout(200);
  await page.screenshot({ path });
  facts.screenshots.push(path);
  (facts.screenshotViewports ??= []).push({ name, interactionViewport: viewport, captureViewport: page.viewportSize() });
  await page.setViewportSize(viewport);
}
async function settleReport(page) {
  await page.waitForFunction(() => {
    const svg = document.querySelector('[data-rain-id="ui-chart-composed"] svg');
    const clip = svg?.querySelector('clipPath[id*="grow-clip"] rect');
    if (!clip && document.querySelector('.consumer')?.getAttribute('data-motion') === 'reduced') return Boolean(svg?.querySelector('path'));
    return svg && clip && Number(clip.getAttribute('width')) >= Number(svg.getAttribute('width')) - 152 - 2 * Number(clip.getAttribute('x')) - .5;
  }, undefined, { timeout: 15000 });
}
async function settleRegional(page) {
  await page.waitForFunction(() => {
    const map = document.querySelector('[data-rain-id="ui-chart-choropleth"]');
    const path = map?.querySelector('path');
    const center = document.querySelector('.goal-rate');
    if (!path || !center) return false;
    const box = path.getBoundingClientRect();
    let opacity = 1;
    for (let node = path; node && node !== map; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity);
    const ring = document.querySelector('[data-rain-id="ui-chart-ring"] path[fill="var(--chart-1)"]');
    const full = document.querySelector('[data-rain-id="ui-chart-ring"] path[fill="var(--chart-4)"]');
    // The final, most delayed ring has a real 100% target. Its progress path
    // must equal its complete background arc before entry is finished.
    const fullArc = full && full.getAttribute('d') === full.previousElementSibling?.getAttribute('d');
    return box.width > 20 && box.height > 20 && opacity >= .8 && center.getBoundingClientRect().width > 30 && ring?.getBoundingClientRect().height > 100 && fullArc;
  }, undefined, { timeout: 15000 });
}
async function focusByTab(page, name, role = 'button') {
  await page.mouse.click(5, 5);
  for (let index = 0; index < 30; index++) {
    await page.keyboard.press('Tab');
    if (await page.getByRole(role, { name, exact: true }).evaluate(element => element === document.activeElement)) return;
  }
  throw new Error(`Keyboard did not reach ${name}`);
}
const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, reducedMotion: 'no-preference' });
const page = await context.newPage(); observe(page);
let activePage = page;
const root = id => page.locator(`[data-rain-id="${id}"]`);
try {
  await page.goto(`${base}/?task=report`); await settleReport(page);
  await check('Report: native composed graph, two axes, independent computed rates', async () => {
    assert.equal(await root('ui-chart-composed').count(), 1);
    assert.ok((await root('ui-chart-composed').locator('svg path').count()) > 0);
    assert.ok((await root('ui-chart-composed').innerText()).includes('%'));
    const rows = page.getByRole('table').locator('tbody tr');
    assert.equal(await rows.count(), 6);
    assert.match(await rows.first().innerText(), /180\s+126\s+70\.0%/);
    assert.match(await page.locator('.definition').innerText(), /完成人数 ÷ 报名人数/);
  });
  await snapshot(page, 'report-desktop');
  await check('Report: real pointer hover exposes exact tooltip values and denominator', async () => {
    const plot = await root('ui-chart-composed').boundingBox();
    await page.mouse.move(plot.x + plot.width / 2, plot.y + plot.height / 2);
    await page.getByText('完成率（分母：报名）', { exact: true }).waitFor({ state: 'visible' });
    assert.ok(await page.getByText('完成率（分母：报名）', { exact: true }).isVisible());
  });
  await snapshot(page, 'report-tooltip');
  await check('Report: Tab reaches legend and exposes visible Focus', async () => {
    await focusByTab(page, '报名人数（左轴，人）');
    const focus = await page.getByRole('button', { name: '报名人数（左轴，人）', exact: true }).evaluate(element => ({ visible: element.matches(':focus-visible'), outline: getComputedStyle(element).outlineWidth, color: getComputedStyle(element).outlineColor }));
    assert.equal(focus.visible, true); assert.notEqual(focus.outline, '0px'); facts.reportFocus = focus;
  });
  await snapshot(page, 'report-keyboard-focus');
  await check('Report: normal update appends one date and keeps the computed rate', async () => {
    await page.getByRole('button', { name: '追加最新日期' }).click();
    await page.waitForTimeout(700);
    assert.equal(await page.getByRole('table').locator('tbody tr').count(), 7);
    assert.match(await page.getByRole('table').locator('tbody tr').last().innerText(), /260\s+234\s+90\.0%/);
    assert.equal(await root('ui-chart-composed').count(), 1);
  });
  await snapshot(page, 'report-updated');
  await check('Report: all zero keeps counts and removes the rate curve', async () => {
    await page.getByLabel('报告数据').selectOption('zero'); await page.waitForTimeout(500);
    assert.equal(await root('ui-chart-composed').count(), 1);
    assert.equal(await root('ui-chart-composed').locator('svg [stroke="var(--chart-3)"]').count(), 0);
    assert.match(await page.getByRole('table').locator('tbody tr').first().innerText(), /不适用（报名人数为 0）/);
  });
  await snapshot(page, 'report-zero');
  await check('Report: mixed zero denominator stops drawing and never fabricates 0%', async () => {
    await page.getByLabel('报告数据').selectOption('mixed');
    assert.equal(await root('ui-chart-composed').count(), 0);
    assert.match(await page.getByRole('table').locator('tbody tr').nth(2).innerText(), /不适用（报名人数为 0）/);
    assert.ok(await page.getByText('有日期报名人数为 0，完成率不适用。当前停止绘图，全部精确数据仍保留。').isVisible());
  });
  await snapshot(page, 'report-mixed-zero');
  await check('Report: invalid and empty data are explicit, no native graph', async () => {
    await page.getByLabel('报告数据').selectOption('invalid'); assert.equal(await root('ui-chart-composed').count(), 0);
    assert.ok(await page.getByText('数据无效：完成人数超过报名人数，已拒绝绘图。').isVisible());
    await page.getByLabel('报告数据').selectOption('empty'); assert.equal(await root('ui-chart-composed').count(), 0);
    assert.equal(await page.getByRole('table').locator('tbody tr').count(), 0);
  });
  await page.goto(`${base}/?task=regional`); await settleRegional(page);
  await check('Regional: actual map and ring geometry has measurable dimensions and visible opacity', async () => {
    const geometry = await page.evaluate(() => Array.from(document.querySelectorAll('[data-rain-id="ui-chart-choropleth"], [data-rain-id="ui-chart-ring"]')).map(root => ({ id: root.getAttribute('data-rain-id'), width: root.getBoundingClientRect().width, height: root.getBoundingClientRect().height, paths: Array.from(root.querySelectorAll('path')).map(path => { let opacity = 1; for (let node = path; node && node !== root; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity); const box = path.getBoundingClientRect(); return { width: box.width, height: box.height, opacity }; }) })));
    for (const graph of geometry) { assert.ok(graph.width > 200 && graph.height >= 280); assert.ok(graph.paths.every(path => path.width > 0 && path.height > 0 && path.opacity > 0)); }
    facts.regionalGeometry = geometry;
    for (const id of ['ui-chart-choropleth', 'ui-chart-ring']) {
      const path = join(output, 'screenshots', `${id}-desktop.png`);
      await page.locator(`[data-rain-id="${id}"]`).screenshot({ path }); facts.screenshots.push(path);
    }
  });
  await check('Regional: six original polygons, 0 and missing have distinct fills and table states', async () => {
    assert.equal(await root('ui-chart-choropleth').count(), 1);
    const paths = root('ui-chart-choropleth').locator('svg path');
    assert.equal(await paths.count(), 6);
    assert.equal(await root('ui-chart-choropleth').locator('path[fill="var(--chart-scale-01)"]').count(), 1);
    assert.equal(await root('ui-chart-choropleth').locator('path[fill="var(--chart-no-data)"]').count(), 1);
    assert.match(await page.locator('[data-region-id="west"]').innerText(), /0\s+有效/);
    assert.match(await page.locator('[data-region-id="south"]').innerText(), /—\s+缺测/);
  });
  await check('Targets: four independent denominators, 0% and 100% are real', async () => {
    assert.equal(await root('ui-chart-ring').count(), 1);
    assert.ok((await root('ui-chart-ring').locator('svg path').count()) >= 7);
    const table = page.getByRole('table', { name: '各目标的独立分母与精确读数' });
    assert.match(await table.locator('tbody').innerText(), /18 \/ 24 节\s+75\.0%/);
    assert.match(await table.locator('tbody').innerText(), /70 \/ 100 条\s+70\.0%/);
    assert.match(await table.locator('tbody').innerText(), /0 \/ 12 项\s+0\.0%/);
    assert.match(await table.locator('tbody').innerText(), /6 \/ 6 站\s+100\.0%/);
    assert.equal(await page.locator('.goal-rate').innerText(), '75.0%');
  });
  await snapshot(page, 'regional-desktop');
  await check('Regional: real pointer hover reaches native map tooltip', async () => {
    await root('ui-chart-choropleth').locator('path[fill="var(--chart-scale-01)"]').hover(); await page.waitForTimeout(400);
    assert.ok(await page.getByText('区域强度（0—100）', { exact: true }).isVisible());
  });
  await snapshot(page, 'regional-tooltip');
  await check('Targets: Tab focus selects its own denominator and visible Focus', async () => {
    await focusByTab(page, '评论回复 · 70.0%');
    assert.equal(await page.locator('.goal-rate').innerText(), '70.0%');
    facts.goalFocus = await page.getByRole('button', { name: '评论回复 · 70.0%', exact: true }).evaluate(element => ({ visible: element.matches(':focus-visible'), outline: getComputedStyle(element).outlineWidth }));
    assert.equal(facts.goalFocus.visible, true); assert.notEqual(facts.goalFocus.outline, '0px');
  });
  await snapshot(page, 'regional-keyboard-focus');
  await check('Regional and targets: normal update preserves IDs, units and denominators', async () => {
    await page.getByRole('button', { name: '刷新地区与目标数据' }).click(); await page.waitForTimeout(800);
    assert.match(await page.locator('[data-region-id="west"]').innerText(), /8\s+有效/);
    assert.match(await page.getByRole('table', { name: '各目标的独立分母与精确读数' }).innerText(), /20 \/ 24 节\s+83\.3%/);
    assert.equal(await page.locator('.goal-rate').innerText(), '82.0%');
  });
  await snapshot(page, 'regional-updated');
  await check('Regional: all zero stays valid, all missing stays missing', async () => {
    await page.getByLabel('地区数据').selectOption('zero'); await page.waitForTimeout(200);
    assert.equal(await root('ui-chart-choropleth').locator('path[fill="var(--chart-scale-01)"]').count(), 6);
    assert.equal(await root('ui-chart-choropleth').locator('path[fill="var(--chart-no-data)"]').count(), 0);
    await page.getByLabel('地区数据').selectOption('missing'); await page.waitForTimeout(200);
    assert.equal(await root('ui-chart-choropleth').locator('path[fill="var(--chart-no-data)"]').count(), 6);
  });
  await snapshot(page, 'regional-missing');
  await check('Targets: zero retains its targets; invalid denominator and empty refuse drawing', async () => {
    await page.getByLabel('目标数据').selectOption('zero'); assert.equal(await page.locator('.goal-rate').innerText(), '0.0%');
    await page.getByLabel('目标数据').selectOption('invalid'); assert.equal(await root('ui-chart-ring').count(), 0);
    assert.ok(await page.getByText('目标无效：maxValue 必须大于 0，已拒绝绘图。').isVisible());
    await page.getByLabel('目标数据').selectOption('empty'); assert.equal(await root('ui-chart-ring').count(), 0);
    assert.ok(await page.getByText('当前没有目标。').isVisible());
  });
  await check('Regional: invalid intensity and empty geometry refuse drawing', async () => {
    await page.getByLabel('地区数据').selectOption('invalid'); assert.equal(await root('ui-chart-choropleth').count(), 0);
    assert.ok(await page.getByText('地区值无效：强度超出 0—100，已拒绝绘图。').isVisible());
    await page.getByLabel('地区数据').selectOption('empty'); assert.equal(await root('ui-chart-choropleth').count(), 0);
  });
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
  const small = await mobile.newPage(); observe(small);
  activePage = small;
  for (const task of ['report', 'regional']) {
    await small.goto(`${base}/?task=${task}`);
    if (task === 'report') await settleReport(small); else await settleRegional(small);
    await check(`${task}: 390px host renders without page horizontal overflow`, async () => {
      const size = await small.evaluate(() => ({ viewport: innerWidth, width: document.documentElement.scrollWidth }));
      assert.ok(size.width <= size.viewport); facts[`${task}Mobile`] = size;
    });
    await snapshot(small, `${task}-mobile`);
    if (task === 'report') {
      await check('Report: narrow exact table is reachable by Tab and scrolls with ArrowRight', async () => {
        await focusByTab(small, '每日报名与完成精确数据滚动区', 'region');
        const table = small.getByRole('region', { name: '每日报名与完成精确数据滚动区', exact: true });
        await small.keyboard.press('ArrowRight'); await small.keyboard.press('ArrowRight'); await small.waitForTimeout(300);
        facts.reportTableKeyboardScroll = await table.evaluate(element => ({ scrollLeft: element.scrollLeft, focusVisible: element.matches(':focus-visible'), outline: getComputedStyle(element).outlineWidth }));
        assert.ok(facts.reportTableKeyboardScroll.scrollLeft > 0);
        assert.equal(facts.reportTableKeyboardScroll.focusVisible, true);
        assert.notEqual(facts.reportTableKeyboardScroll.outline, '0px');
      });
      await snapshot(small, 'report-mobile-table-keyboard');
    }
  }
  await mobile.close();
  const reduced = await browser.newContext({ viewport: { width: 1280, height: 1000 }, reducedMotion: 'reduce' });
  const quiet = await reduced.newPage(); observe(quiet);
  activePage = quiet;
  for (const task of ['report', 'regional']) {
    await quiet.goto(`${base}/?task=${task}`);
    if (task === 'report') await settleReport(quiet); else await settleRegional(quiet);
    await check(`${task}: reduced motion keeps final data and has no active browser animations`, async () => {
      assert.equal(await quiet.locator('.consumer').getAttribute('data-motion'), 'reduced');
      const animations = await quiet.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length);
      assert.equal(animations, 0); facts[`${task}ReducedActiveAnimations`] = animations;
      if (task === 'report') assert.match(await quiet.getByRole('table').locator('tbody tr').first().innerText(), /70\.0%/);
      else assert.equal(await quiet.locator('.goal-rate').innerText(), '75.0%');
    });
    if (task === 'report') {
      await check('Report: reduced motion pointer move updates the native day ticker and highlight band immediately', async () => {
        const chart = quiet.locator('[data-rain-id="ui-chart-composed"]');
        const box = await chart.boundingBox();
        await quiet.mouse.move(box.x + 77, box.y + box.height / 2);
        await chart.getByText('完成率（分母：报名）', { exact: true }).waitFor({ state: 'visible' });
        await quiet.mouse.move(box.x + box.width - 77, box.y + box.height / 2);
        await quiet.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const state = await chart.evaluate(element => {
          const stacks = element.querySelectorAll('.bg-zinc-900 .flex.flex-col');
          const dayY = new DOMMatrixReadOnly(getComputedStyle(stacks[stacks.length - 1]).transform).m42;
          const svg = element.querySelector('svg');
          const innerWidth = Number(svg.getAttribute('width')) - 152;
          const bands = Array.from(svg.querySelectorAll('clipPath rect')).map(rect => ({ x: parseFloat(rect.getAttribute('x')), width: parseFloat(rect.getAttribute('width')), height: parseFloat(rect.getAttribute('height')) }));
          return { dayY, expectedDayY: -120, expectedBandX: innerWidth * .8, bands };
        });
        facts.reportReducedHover = state;
        assert.ok(Math.abs(state.dayY - state.expectedDayY) < .1);
        assert.ok(state.bands.some(band => Math.abs(band.x - state.expectedBandX) < 1 && band.width > 0));
      });
    }
    await snapshot(quiet, `${task}-reduced-motion`);
  }
  await reduced.close();
  await check('Browser console: no error, uncaught exception or failed request', async () => {
    assert.deepEqual(facts.console.filter(entry => ['error', 'pageerror', 'requestfailed'].includes(entry.type)), []);
  });
  facts.status = 'passed';
} catch (error) {
  facts.status = 'failed'; facts.error = { message: error.message, stack: error.stack };
  console.error(error); process.exitCode = 1;
  await snapshot(activePage, 'failure');
} finally {
  facts.finishedAt = new Date().toISOString();
  writeFileSync(join(output, 'browser-facts.json'), JSON.stringify(facts, null, 2));
  await browser.close();
}
