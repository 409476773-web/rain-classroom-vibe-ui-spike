import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator, type Page } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const evidence = resolve(process.env.NAVIGATION_FEEDBACK_EVIDENCE_DIR ?? evidenceOutputPath('evidence/runtime/navigation-v042/w5/review-06-r4-feedback'));
const capture = process.env.R4_FEEDBACK_CAPTURE;
mkdirSync(evidence,{recursive:true});
const open = async (page: Page, width = 1440) => {
  await page.goto(`/?sample=R4&feedbackWidth=${width}#navigation-v042`);
  await expect(page.getByRole('heading', { name: '导航组件 · v0.4.2' })).toBeVisible();
  await page.getByRole('combobox', { name: '业务子场景' }).selectOption('interaction');
  await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  const root = page.locator('[data-recipe-id="recipe-navigation-r4"]');
  await expect(root).toBeVisible();
  return root;
};
const region = (root: Locator, id: string) => root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
const restore = (root: Locator, id: string) => root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`).first();
const shape = async (locator: Locator) => locator.evaluate(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
const tokenStyle = async (root: Locator, token: string, property: string) => root.evaluate((el, { name, cssProperty }) => {
  const probe = document.createElement('span'); probe.style.setProperty(cssProperty, name.startsWith('--') ? `var(${name})` : name);
  probe.style.position = 'absolute'; probe.style.visibility = 'hidden'; el.append(probe);
  const value = getComputedStyle(probe).getPropertyValue(cssProperty); probe.remove(); return value;
}, { name: token, cssProperty: property });
const tokenColor = (root: Locator, token: string) => tokenStyle(root, token, 'color');
// Behavioral contracts now use the accepted successor palette and geometry:
// w5/review-11-annotations-navigation/scope.md and w5/review-12-pale-splitters/scope.md;
// source is frozen by g2-acceptance-13/accepted-source-before-status.json.
const platformWhite = '--rain-category-oncolor-1';
const inverseCurrent = 'color-mix(in srgb, var(--rain-category-oncolor-1) 8%, transparent)';
const inverseHover = 'color-mix(in srgb, var(--rain-category-oncolor-1) 6%, transparent)';
const metrics = async (root: Locator) => root.evaluate(e => {
  const rect = (el: Element) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
  const one = (selector: string) => {
    const el = e.querySelector(selector); if (!el) return null;
    const css = getComputedStyle(el);
    return { ...rect(el), color: css.color, background: css.backgroundColor, fontSize: css.fontSize, lineHeight: css.lineHeight, padding: css.padding, marginBottom: css.marginBottom, gap: css.gap, overflowX: css.overflowX, scrollWidth: (el as HTMLElement).scrollWidth, clientWidth: (el as HTMLElement).clientWidth };
  };
  const rootRect = rect(e);
  const footer = Array.from(e.querySelectorAll('.nv5-platform-content>footer>*')).map(rect);
  return { root: rootRect, recovery: one('.nv5-recovery'), module: one('.nv5-module-header'), activityTrack: one('.nv5-activities .rain-navigation-family__track'), activities: Array.from(e.querySelectorAll('.nv5-activities .rain-navigation-family__entry')).map(rect), progress: one('.nv5-activities [role="progressbar"]'), selectedProgressFill: one('.nv5-activities [data-active="true"] [data-slot="progress-fill"]'), otherProgressFill: one('.nv5-activities [data-active="false"] [data-slot="progress-fill"]'), activityMetadata: one('.nv5-activities .rain-navigation-family__metadata'), queueHead: one('.nv5-queue-head'), queueRegionHead: one('.nv5-queue>.nv5-region-head'), queueRegionTitle: one('.nv5-queue>.nv5-region-head>strong'), queueList: one('.nv5-group-objects'), groupLabel: one('.nv5-group-objects .rain-navigation-family__label'), detailTitle: one('.nv5-group-title h3'), context: one('.nv5-class-context'), contextHead: one('.nv5-class-context>.nv5-region-head'), contextEntry: one('.nv5-class-context .rain-navigation-family__entry'), contextSplitter: one('.rain-workspace__splitter[aria-label="调整课堂功能宽度"]'), contextFooter: one('.nv5-class-context>.nv5-context-footer'), brand: one('.nv5-brand'), platformSelected: one('.nv5-platform .rain-navigation-family__item[data-active="true"] .rain-navigation-family__row'), footer, avatarGroups: e.querySelectorAll('[data-rain-id="ui-avatar-group"]').length, nestedButtons: e.querySelectorAll('button button').length, horizontalRegions: Array.from(e.querySelectorAll('.nv5-interaction-main,.nv5-interaction-detail,.nv5-group-detail')).map(el => ({ ...rect(el), scrollWidth: (el as HTMLElement).scrollWidth, clientWidth: (el as HTMLElement).clientWidth })), selectedScore: one('.nv5-group-objects button[aria-pressed="true"] .nv5-score'), platformMode: e.querySelector('[data-region-id="global"]')?.getAttribute('data-mode'), platformTemporary: e.querySelector('[data-region-id="global"]')?.getAttribute('data-temporary') };
});
const settle = async (page: Page) => {
  await page.locator('[data-recipe-id="recipe-navigation-r4"] img').evaluateAll(async images => { await Promise.all(images.map(async node => { const img = node as HTMLImageElement; try { await img.decode(); } catch {} })); });
  await page.mouse.move(1790, 1090);
  await page.evaluate(() => document.fonts.ready);
};

test('capture immutable R4 feedback snapshots', async ({ page }) => {
  test.setTimeout(120000);
  test.skip(!capture, 'Evidence capture is a separate operation from contract verification.');
  const dir = resolve(evidence, capture!); mkdirSync(dir, { recursive: true });
  const results: Record<string, unknown> = {}; const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1200, 1440, 1600]) {
    const root = await open(page, width);
    for (const mode of ['compact', 'expanded', 'ungraded']) {
      if (mode === 'expanded') await region(root, 'global').getByRole('button', { name: '展开平台导航', exact: true }).click();
      if (mode === 'ungraded') await root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '知行合一', exact: true }).click();
      await settle(page);
      const key = `R4-interaction-${width}-${mode}`;
      results[key] = await metrics(root);
      await root.screenshot({ path: resolve(dir, `${key}.png`) });
      writeFileSync(resolve(dir, 'measurements.json'), JSON.stringify({ createdAt: new Date().toISOString(), phase: capture, scope: 'R4 interaction, DPR1 Chromium; approved HTML remains historical baseline', pageErrors: errors, cases: results }, null, 2));
    }
  }
  writeFileSync(resolve(dir, 'measurements.json'), JSON.stringify({ createdAt: new Date().toISOString(), phase: capture, scope: 'R4 interaction, DPR1 Chromium; approved HTML remains historical baseline', pageErrors: errors, cases: results }, null, 2));
  expect(errors).toEqual([]);
});

test.describe('R4 feedback contracts', () => {
  test.skip(Boolean(capture), 'Contract assertions run separately from immutable before/after capture.');
  test('existing AvatarGroup portraits remain visible and do not nest actions inside group selectors', async ({ page }) => {
    const root = await open(page), row = root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '第一小分队', exact: true });
    const avatars = row.locator('[data-rain-id="ui-avatar-group"] [data-rain-id="ui-avatar"]');
    await expect(avatars).toHaveCount(4);
    await settle(page);
    for (const avatar of await avatars.all()) {
      const portrait = avatar.locator('img[data-slot="portrait"]');
      await expect(portrait).toBeVisible();
      expect(await portrait.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
    expect(await root.locator('button button').count()).toBe(0);
  });
  test('compact activity cards reserve more room for details across every supported canvas width', async ({ page }) => {
    const before = JSON.parse(readFileSync(resolve('evidence/runtime/navigation-v042/w5/review-06-r4-feedback/before-v2/measurements.json'), 'utf8'));
    for (const width of [1200, 1440, 1600]) {
      const root = await open(page, width), now = await metrics(root), prior = before.cases[`R4-interaction-${width}-compact`];
      expect(now.recovery?.height).toBe(56); expect(now.module?.height).toBe(44);
      expect(now.activityTrack?.padding).toBe('12px');
      expect(now.activityTrack!.height).toBeLessThan(prior.activityTrack.height);
      expect(now.queueHead!.height).toBeLessThan(prior.queueHead.height);
      expect(now.queueList!.height).toBeGreaterThan(prior.queueList.height);
      for (const card of now.activities) expect(card.height).toBeLessThan(prior.activities[0].height);
      expect(now.progress?.height).toBe(4); expect(now.activityMetadata?.gap).toBe('4px');
      expect(now.activityTrack?.background).toBe(await tokenColor(root, '--rain-category-background-neutral-2'));
      const progress = root.locator('.nv5-activities [role="progressbar"]').first();
      expect(await progress.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-neutral-solid-3'));
      expect(await root.locator('.nv5-activities [data-active="true"] [data-slot="progress-fill"]').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-brand-solid-3'));
      expect(await root.locator('.nv5-activities [data-active="false"] [data-slot="progress-fill"]').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-neutral-solid-1'));
      expect(now.queueRegionHead?.height).toBe(36); expect(now.groupLabel?.fontSize).toBe('14px');
      expect(now.detailTitle?.fontSize).toBe('16px'); expect(now.detailTitle?.height).toBe(22);
      expect(now.contextFooter?.fontSize).toBe('12px');
      const selectedTab = root.getByRole('tab', { name: '智能汇报', exact: true });
      expect(await selectedTab.evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(root, '--rain-category-text-neutral-1'));
      expect(await root.getByRole('tab', { name: '投稿', exact: true }).evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(root, '--rain-category-text-neutral-2'));
      const regionControls = root.locator('.nv5-region-head>[data-rain-id="ui-icon-button"]');
      await expect(regionControls).toHaveCount(4);
      for (const control of await regionControls.all()) {
        const box = await shape(control); expect(box.width).toBe(32); expect(box.height).toBe(32);
      }
      for (const pane of now.horizontalRegions) expect(pane.scrollWidth).toBeLessThanOrEqual(pane.clientWidth + 1);
    }
  });
  test('group filter, search and activity selection preserve identity and grey ungraded scores', async ({ page }) => {
    const root = await open(page);
    await root.getByRole('group', { name: '课堂活动', exact: true }).getByRole('button', { name: '小组汇报：从概念到真实应用', exact: true }).click();
    await root.getByRole('radio', { name: '未评分', exact: true }).locator('..').click();
    expect(await root.locator('.nv5-queue-filter .rain-segmented-control__option[data-state="checked"]').evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(root, '--rain-category-text-brand-1'));
    await root.getByRole('textbox', { name: '搜索小组', exact: true }).fill('知行');
    const row = root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '知行合一', exact: true });
    await row.click();
    await expect(root.getByRole('heading', { name: '知行合一', exact: true })).toBeVisible();
    await expect(root.locator('.nv5-recovery-identity')).toContainText('知行合一');
    await expect(root.locator('.nv5-group-title')).toContainText('小组汇报：从概念到真实应用');
    await expect(root.getByLabel('当前小组得分')).toContainText('—');
    const color = await row.locator('.nv5-score').evaluate(el => getComputedStyle(el).color);
    expect(color).toBe(await tokenColor(root, '--rain-category-text-neutral-3'));
    await region(root, 'queue').getByRole('button', { name: '隐藏小组列表', exact: true }).click();
    await restore(root, 'queue').click(); await expect(row).toHaveAttribute('aria-pressed', 'true');
    await expect(root.getByRole('textbox', { name: '搜索小组', exact: true })).toHaveValue('知行');
  });
  test('context boundary moves closer while keyboard, pointer resizing and temporary restoration retain the selected object', async ({ page }) => {
    const root = await open(page), splitter = root.getByRole('separator', { name: '调整课堂功能宽度', exact: true });
    const nav = region(root, 'context').getByRole('navigation', { name: '课堂功能', exact: true });
    const last = await shape(nav.locator('.rain-navigation-family__entry').first()), boundary = await shape(splitter);
    expect(boundary.x - (last.x + last.width)).toBeLessThanOrEqual(8);
    expect(await splitter.evaluate(el => getComputedStyle(el, '::before').backgroundColor)).toBe(await tokenColor(root, '--rain-category-border-neutral-4'));
    expect(await splitter.evaluate(el => getComputedStyle(el, '::before').opacity)).toBe('0.4');
    await splitter.hover();
    expect(await splitter.evaluate(el => getComputedStyle(el, '::before').backgroundColor)).toBe(await tokenColor(root, '--rain-category-border-brand-1'));
    expect(await splitter.evaluate(el => getComputedStyle(el, '::before').opacity)).toBe('1');
    const original = Number(await splitter.getAttribute('aria-valuenow'));
    await splitter.focus(); await page.keyboard.press('ArrowRight'); expect(Number(await splitter.getAttribute('aria-valuenow'))).toBeGreaterThan(original);
    expect(await splitter.evaluate(el => getComputedStyle(el).outlineColor)).toBe(await tokenColor(root, '--rain-color-focus-control'));
    expect(await splitter.evaluate(el => getComputedStyle(el, '::before').opacity)).toBe('1');
    const box = await shape(splitter); await page.mouse.move(box.x + box.width / 2, box.y + 80); await page.mouse.down(); await page.mouse.move(box.x + 28, box.y + 80, { steps: 8 });
    expect(await splitter.evaluate(el => getComputedStyle(el, '::before').opacity)).toBe('1');
    await page.mouse.up();
    expect(Number(await splitter.getAttribute('aria-valuenow'))).toBeGreaterThan(original + 10);
    await region(root, 'context').getByRole('button', { name: '隐藏课堂功能', exact: true }).click(); await expect(region(root, 'context')).toBeHidden();
    const recovery = restore(root, 'context');
    await page.mouse.move(1790, 1090);
    expect(await recovery.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-background-neutral-2'));
    await recovery.hover();
    expect(await recovery.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-brand-solid-3'));
    await recovery.click(); await expect(region(root, 'context')).toBeVisible();
    await region(root, 'context').getByRole('button', { name: '取消固定课堂功能', exact: true }).click();
    await expect(region(root, 'context')).toHaveAttribute('data-temporary', 'true');
    expect(await region(root, 'context').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-background-neutral-1'));
    expect(await region(root, 'context').evaluate(el => getComputedStyle(el).boxShadow)).toBe(await tokenStyle(root, '--rain-shadow-overlay', 'box-shadow'));
    expect(await region(root, 'context').locator('.nv5-region-head>small').evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(root, '--rain-category-text-neutral-3'));
    const temporaryHead = region(root, 'context').locator('.nv5-region-head');
    expect((await shape(temporaryHead.locator('strong'))).height).toBe(22);
    expect(await temporaryHead.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    const allRegionControls = root.locator('.nv5-region-head>[data-rain-id="ui-icon-button"]');
    await expect(allRegionControls).toHaveCount(4);
    for (const control of await allRegionControls.all()) { const box = await shape(control); expect(box.width).toBe(32); expect(box.height).toBe(32); }
    await expect(root.getByRole('heading', { name: '第一小分队', exact: true })).toBeVisible();
  });
  test('platform brand and footer keep sensible alignment in compact and expanded modes', async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    for (const width of [1200, 1440, 1600]) {
      const root = await open(page, width), footer = root.locator('.nv5-platform-content>footer'), global = region(root, 'global');
      const compact = await footer.locator(':scope>*').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }));
      expect(compact).toHaveLength(3); expect(Math.max(...compact.map(r => r.x)) - Math.min(...compact.map(r => r.x))).toBeLessThanOrEqual(1);
      await global.getByRole('button', { name: '展开平台导航', exact: true }).click();
      if (width === 1200) await expect(global).toHaveAttribute('data-temporary', 'true');
      else await expect(global).toHaveAttribute('data-mode', 'expanded');
      expect(await root.locator('.nv5-platform .rain-navigation-family__item[data-active="true"] .rain-navigation-family__row').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, platformWhite));
      expect(await global.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '#e8edf8'));
      const expanded = await footer.locator(':scope>*').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }));
      const brand = await shape(root.locator('.nv5-brand')), platform = await shape(global);
      expect(Math.max(...expanded.map(r => r.y + r.height / 2)) - Math.min(...expanded.map(r => r.y + r.height / 2))).toBeLessThanOrEqual(1);
      await expect(footer.locator(':scope>button').first()).toHaveClass(/nv5-platform-account/);
      expect(expanded[0]!.height).toBe(44);
      for (const control of expanded.slice(1)) { expect(control.width).toBe(28); expect(control.height).toBe(28); }
      expect(expanded[0]!.x + expanded[0]!.width).toBeLessThanOrEqual(expanded[1]!.x);
      expect(expanded[1]!.x + expanded[1]!.width).toBeLessThanOrEqual(expanded[2]!.x);
      for (const control of expanded) { expect(control.x).toBeGreaterThanOrEqual(platform.x); expect(control.x + control.width).toBeLessThanOrEqual(platform.x + platform.width); }
      expect(brand.x - platform.x).toBeLessThanOrEqual(20);
      await expect(root.locator('.nv5-platform-content>footer [data-rain-id="ui-avatar"] .rain-avatar__picture')).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
  test('S4 inverse platform and recovery use their scoped Token palette', async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('/?sample=S4&feedback=inverse-final#navigation-v042');
    await page.getByRole('combobox', { name: '业务子场景' }).selectOption('interaction');
    await page.getByRole('combobox', { name: '画板宽度' }).selectOption('1440');
    await page.getByRole('checkbox', { name: '深色外框', exact: true }).check();
    const root = page.locator('[data-recipe-id="recipe-navigation-r4"]'), global = region(root, 'global');
    await expect(root).toHaveAttribute('data-inverse', 'true'); await expect(global).toHaveAttribute('data-rain-theme', 'dark');
    await global.getByRole('button', { name: '展开平台导航', exact: true }).click();
    const active = global.getByRole('link', { name: '课程', exact: true }), inactive = global.getByRole('link', { name: '工作台', exact: true });
    const activeRow = global.locator('.rain-navigation-family__item[data-active="true"] .rain-navigation-family__row');
    const inactiveRow = global.locator('.rain-navigation-family__item[data-active="false"] .rain-navigation-family__row').first();
    await page.mouse.move(1790, 1090);
    expect(await global.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(global, '#252d43'));
    expect(await global.evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(global, '--rain-category-text-neutral-3'));
    expect(await activeRow.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(global, inverseCurrent));
    expect(await active.evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(global, platformWhite));
    const activeIcon = active.locator('.rain-navigation-family__leading [data-rain-id="icon"]');
    await expect(activeIcon).toHaveCount(1);
    expect(await activeIcon.evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(global, platformWhite));
    expect(await inactive.evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(global, '--rain-category-text-neutral-3'));
    await inactive.hover();
    expect(await inactiveRow.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(global, inverseHover));
    await active.hover();
    expect(await activeRow.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(global, inverseCurrent));
    await region(root, 'context').getByRole('button', { name: '隐藏课堂功能', exact: true }).click();
    const recovery = restore(root, 'context'); await page.mouse.move(1790, 1090);
    expect(await recovery.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(recovery, '--rain-category-background-neutral-2'));
    await recovery.hover();
    expect(await recovery.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(recovery, '--rain-category-fill-brand-solid-3'));
    await recovery.click();
    await expect(region(root, 'context')).toHaveAttribute('data-temporary', 'true');
    await settle(page);
    expect((await shape(region(root, 'context').locator('.nv5-region-head>strong'))).height).toBe(22);
    await root.screenshot({ path: resolve(evidence, 'S4-interaction-1440-inverse-final-03.png') });
    writeFileSync(resolve(evidence, 'inverse-final-03-measurements.json'), JSON.stringify({ recordedAt: new Date().toISOString(), themeScope: 'Only platform is data-rain-theme=dark; main content keeps light palette', root: await metrics(root), temporaryContextTitle: await shape(region(root, 'context').locator('.nv5-region-head>strong')), tokenChecks: ['accepted-platform #252d43/container-text3/oncolor1/current-and-current-hover-oncolor1-8%/hover-oncolor1-6%', 'recovery hidden-background2/hover-fill-brand-solid3'], pageErrors: errors }, null, 2));
    expect(errors).toEqual([]);
  });
});
