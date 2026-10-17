import { expect, test, type Locator, type Page } from '@playwright/test';

async function open(page: Page, sample: string, width = 1440) {
  await page.goto(`/?sample=${sample}#navigation-v042`);
  await expect(page.getByRole('heading', { name: '导航组件 · v0.4.2' })).toBeVisible();
  await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  return page.getByTestId('candidate-canvas').locator('.rain-workspace').first();
}
const region = (root: Locator, id: string) => root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
const restore = (root: Locator, id: string) => root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`).first();
const shape = (locator: Locator) => locator.evaluate(element => {
  const rect = element.getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
});
test('N01 S1 hides all regions and restores each once with keyboard-reachable focus', async ({ page }) => {
  const root = await open(page, 'S1');
  await root.getByRole('button', { name: '布局设置', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: '隐藏全部区域', exact: true }).click();
  await page.keyboard.press('Escape');
  for (const pane of await root.locator('.rain-workspace__region').all()) await expect(pane).toBeHidden();
  for (const entry of await root.locator('.rain-workspace__restore').all()) {
    const id = await entry.getAttribute('aria-controls');
    expect(id).toBeTruthy();
    await entry.focus(); await page.keyboard.press('Enter');
    await expect(root.locator(`[id="${id}"]`)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(entry).toBeFocused();
    expect(await root.evaluate(element => [...element.querySelectorAll('[hidden]')].some(hidden => hidden.contains(document.activeElement)))).toBe(false);
  }
});
async function setHover(page: Page, root: Locator) {
  await root.getByRole('button', { name: '布局设置', exact: true }).click();
  const checkbox = page.getByRole('checkbox', { name: '悬停临时查看', exact: true });
  await checkbox.locator('..').click();
  await expect(checkbox).toBeChecked();
  await page.keyboard.press('Escape');
}

for (const sample of ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6']) {
  test(`N16 N17 N18 W7 matrix ${sample} accepted platform glyphs, palettes and account layout`, async ({ page }) => {
    const root = await open(page, sample, 1600);
    const rail = region(root, 'global');
    const expanded = async () => await rail.getAttribute('data-mode') === 'expanded' || await rail.getAttribute('data-temporary') === 'true';
    for (const inverse of [false, true]) {
      await page.getByRole('checkbox', { name: '深色外框', exact: true }).setChecked(inverse);
      for (const mode of ['expanded', 'compact']) {
        if (await expanded() !== (mode === 'expanded')) {
          await rail.getByRole('button', { name: mode === 'expanded' ? '展开平台导航' : await rail.getAttribute('data-temporary') === 'true' ? '关闭临时平台导航' : '收起平台导航', exact: true }).click();
        }
        await expect.poll(expanded).toBe(mode === 'expanded');
        expect((await shape(rail)).width).toBe(mode === 'expanded' ? 208 : 64);
        expect(await rail.evaluate(element => getComputedStyle(element).backgroundColor)).toBe(inverse ? 'rgb(37, 45, 67)' : 'rgb(232, 237, 248)');
        const links = rail.getByRole('link');
        expect(await links.count()).toBeGreaterThan(0);
        for (const link of await links.all()) {
          const glyph = link.locator('[data-rain-id="icon"]').first();
          const box = await shape(glyph);
          expect([box.width, box.height]).toEqual([18, 18]);
          if (mode === 'compact') {
            const row = await shape(link);
            expect(Math.abs(box.x + box.width / 2 - row.x - row.width / 2)).toBeLessThanOrEqual(1);
          }
        }
        const account = rail.getByRole('button', { name: '当前账户：林老师', exact: true });
        const notice = rail.getByRole('button', { name: '通知', exact: true });
        const help = rail.getByRole('button', { name: '帮助', exact: true });
        await expect(account.locator('[data-rain-id="ui-avatar"]')).toBeVisible();
        const a = await shape(account), n = await shape(notice), h = await shape(help);
        if (mode === 'expanded') {
          expect(a.x + a.width).toBeLessThanOrEqual(n.x + 1); expect(n.x + n.width).toBeLessThanOrEqual(h.x + 1);
          const toggle = await shape(rail.getByRole('button', { name: '收起平台导航', exact: true }));
          const brand = await shape(rail.locator('.nv42-brand,.nv43-brand,.nv5-brand,.nv44-brand').first());
          expect(toggle.x).toBeGreaterThan(brand.x);
          expect(toggle.x + toggle.width).toBeLessThanOrEqual((await shape(rail)).x + 208);
        }
        else { expect(n.y + n.height).toBeLessThanOrEqual(h.y + 1); expect(h.y + h.height).toBeLessThanOrEqual(a.y + 1); }
      }
    }
  });
}

test('N17 R2 brand stays mounted through real expand collapse motion with accepted slot widths', async ({ page }) => {
  const root = await open(page, 'R2');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const rail = region(root, 'global'), slot = root.locator('[data-region-slot="global"]');
  const brand = rail.locator('.nv42-brand strong');
  const original = await brand.elementHandle();
  expect((await shape(slot)).width).toBe(64);
  await rail.getByRole('button', { name: '展开平台导航', exact: true }).click();
  const widths = await slot.evaluate(async element => {
    const values: number[] = [], start = performance.now();
    while (performance.now() - start < 350) { await new Promise(requestAnimationFrame); values.push(element.getBoundingClientRect().width); }
    return values;
  });
  await expect.poll(async () => (await shape(slot)).width).toBe(208);
  expect(widths.filter(width => width > 64 && width < 208).length).toBeGreaterThan(2);
  expect(await brand.evaluate((element, previous) => element === previous, original)).toBe(true);
  await rail.getByRole('button', { name: '收起平台导航', exact: true }).click();
  await expect.poll(async () => (await shape(slot)).width).toBe(64);
  expect(await brand.evaluate((element, previous) => element === previous, original)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(slot).toHaveCSS('transition-duration', '0s');
});

test('N11 real wheel scroll in a constrained S2 host survives hide and restore', async ({ page }) => {
  const root = await open(page, 'S2');
  const pane = region(root, 'context');
  // Host sizing is a test fixture only; the user path and saved scroll state remain real.
  await page.addStyleTag({ content: '.nv43-workspace .rain-workspace__region[data-region-id="context"]{height:160px!important;min-height:0!important;overflow:auto!important}' });
  await pane.hover();
  await page.mouse.wheel(0, 260);
  await expect.poll(() => pane.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  const before = await pane.evaluate(element => element.scrollTop);
  const selected = await pane.getByRole('treeitem', { selected: true }).getAttribute('id');
  expect(selected).toBeTruthy();
  await restore(root, 'context').click();
  await expect(pane).toBeHidden();
  await restore(root, 'context').click();
  await expect(pane).toBeVisible();
  expect(await pane.evaluate(element => element.scrollTop)).toBe(before);
  expect(await pane.getByRole('treeitem', { selected: true }).getAttribute('id')).toBe(selected);
});

test('N15 A2 selected and hovered queue rows retain a shared zero-gap boundary', async ({ page }) => {
  await open(page, 'A2');
  const queue = page.getByTestId('candidate-A2').getByRole('group', { name: '当前学生队列' });
  const entries = queue.locator('[data-slot="entry"]');
  for (const index of [0, 1, 2]) {
    await entries.nth(index).click();
    await entries.nth((index + 1) % await entries.count()).hover();
    const rows = await queue.locator('.rain-navigation-family__row').evaluateAll(elements => elements.map(element => { const rect = element.getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, height: rect.height }; }));
    rows.forEach(row => expect(row.height).toBe(76));
    rows.slice(1).forEach((row, rowIndex) => expect(row.top).toBe(rows[rowIndex]!.bottom));
  }
});

for (const sample of ['R2', 'R4', 'S3', 'S5']) test(`N20 N24 ${sample} accepted pale splitter retains pointer and keyboard targets`, async ({ page }) => {
  const root = await open(page, sample, 1200);
  const splitter = root.locator('.rain-workspace__splitter:not([hidden])').first();
  await splitter.scrollIntoViewIfNeeded();
  const paint = () => splitter.evaluate(element => ({ line: getComputedStyle(element, '::before').opacity, handle: getComputedStyle(element, '::after').opacity, width: element.getBoundingClientRect().width, value: Number(element.getAttribute('aria-valuenow')) }));
  await page.mouse.move(1790, 1090);
  const before = await paint();
  expect(before.line).toBe('0.4'); expect(before.handle).toBe('0'); expect(before.width).toBeGreaterThanOrEqual(5);
  await splitter.hover(); expect((await paint()).line).toBe('1');
  const box = await splitter.boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.down(); await page.mouse.move(box!.x + box!.width / 2 + 18, box!.y + box!.height / 2, { steps: 3 }); await page.mouse.up();
  await splitter.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  await expect(splitter).toBeFocused(); expect((await paint()).line).toBe('1');
  const width = (await paint()).value;
  await page.keyboard.press('ArrowRight');
  expect((await paint()).value).not.toBe(width);
});

test('N06 N04 hover bridges the entry and panel, Escape suppresses rebound, reentry remains usable', async ({ page }) => {
  const root = await open(page, 'S3');
  await setHover(page, root);
  const entry = restore(root, 'context'), pane = region(root, 'context');
  const content = root.locator('.nv5-document-views');
  const before = await shape(content);
  await entry.hover();
  await expect(pane).toHaveAttribute('data-temporary', 'true');
  expect(await shape(content)).toEqual(before);
  await pane.getByRole('textbox', { name: '搜索工作区' }).hover();
  await expect(pane).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(pane).toBeHidden();
  await page.waitForTimeout(500); // Exceeds the documented 240ms open / 360ms close timers.
  await expect(pane).toBeHidden();
  await root.locator('.nv44-identity').hover();
  await entry.hover();
  await expect(pane).toHaveAttribute('data-temporary', 'true');
});

test('N07 queued hover cannot open a panel after switching S3 to S6', async ({ page }) => {
  const root = await open(page, 'S3');
  await setHover(page, root);
  await restore(root, 'context').hover();
  await page.getByRole('navigation', { name: '导航候选样本' }).getByRole('button', { name: 'S6', exact: true }).click();
  const replay = page.locator('[data-recipe-id="recipe-navigation-r5"]');
  await expect(replay).toBeVisible();
  await page.waitForTimeout(600);
  await expect(replay.locator('[data-temporary="true"]')).toHaveCount(0);
  await expect(replay).toHaveAttribute('data-focused', 'false');
});

test('N18 inverse temporary platform retains the account, native links, focus and close recovery', async ({ page }) => {
  const root = await open(page, 'S3');
  await page.getByRole('checkbox', { name: '深色外框', exact: true }).check();
  await restore(root, 'global').click();
  const pane = region(root, 'global');
  await expect(pane).toHaveAttribute('data-temporary', 'true');
  await expect(pane).toHaveAttribute('data-rain-theme', 'dark');
  const account = pane.getByRole('button', { name: '当前账户：林老师', exact: true });
  await expect(account).toBeVisible();
  await pane.getByRole('link', { name: '课程', exact: true }).focus();
  await expect(pane.getByRole('link', { name: '课程', exact: true })).toBeFocused();
  const palette = await pane.evaluate(element => ({ background: getComputedStyle(element).backgroundColor, color: getComputedStyle(element).color }));
  expect(palette.background).not.toBe('rgb(255, 255, 255)');
  expect(palette.color).not.toBe(palette.background);
  await page.keyboard.press('Escape');
  await expect(pane).not.toHaveAttribute('data-temporary', 'true');
  await expect(restore(root, 'global')).toBeFocused();
});

test('N19 searchable scope owns one visible focus ring and no inner input outline', async ({ page }) => {
  const root = await open(page, 'R2');
  await root.getByRole('button', { name: '更多班级', exact: true }).click();
  const input = page.getByRole('textbox', { name: '搜索范围', exact: true });
  await expect(input).toBeFocused();
  const facts = await input.evaluate(element => {
    const parent = element.closest('[data-rain-id="ui-input"]') ?? element.parentElement!;
    const inner = getComputedStyle(element), outer = getComputedStyle(parent);
    return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerShadow: outer.boxShadow, outerOutline: outer.outlineStyle };
  });
  expect(facts.innerOutline).toBe('none');
  expect(facts.innerShadow).toBe('none');
  expect(facts.outerShadow !== 'none' || facts.outerOutline !== 'none').toBe(true);
  await page.keyboard.press('Escape');
  await expect(root.getByRole('button', { name: '更多班级', exact: true })).toBeFocused();
});

test('N19 S3 temporary context search retains its single shared Input focus ring', async ({ page }) => {
  const root = await open(page, 'S3');
  await restore(root, 'context').click();
  const input = region(root, 'context').getByRole('textbox', { name: '搜索工作区', exact: true });
  await input.focus();
  await expect(input).toBeFocused();
  const styles = await input.evaluate(element => {
    const inner = getComputedStyle(element), outer = getComputedStyle(element.closest('[data-rain-id="ui-input"]')!);
    return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerOutline: outer.outlineStyle, outerShadow: outer.boxShadow };
  });
  expect(styles.innerOutline).toBe('none'); expect(styles.innerShadow).toBe('none');
  expect(styles.outerOutline !== 'none' || styles.outerShadow !== 'none').toBe(true);
});

test('N14 connected geometry remains finite after first middle last selection, resize and region recovery', async ({ page }) => {
  const root = await open(page, 'R2');
  const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  for (const label of ['公共资源包', '2026 秋 · 高等数学 1 班', '2026 秋 · 创新实验班']) {
    await scope.getByRole('tab', { name: label, exact: true }).click();
    await expect(scope.getByRole('tab', { name: label, exact: true })).toHaveAttribute('aria-selected', 'true');
    const paths = await scope.locator('svg path').evaluateAll(elements => elements.map(element => element.getAttribute('d')));
    expect(paths.length).toBeGreaterThan(0);
    expect(paths.every(path => Boolean(path) && !/NaN|Infinity|undefined/.test(path!))).toBe(true);
  }
  for (const width of [1200, 1600, 1440]) await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  await root.locator('.nv42-workspace-bar').getByRole('button', { name: '隐藏课程导航', exact: true }).click();
  await root.getByRole('button', { name: '恢复课程导航', exact: true }).click();
  await expect(scope.getByRole('tab', { name: '2026 秋 · 创新实验班', exact: true })).toHaveAttribute('aria-selected', 'true');
  expect(await scope.locator('svg path').evaluateAll(elements => elements.every(element => !/NaN|Infinity/.test(element.getAttribute('d') ?? '')))).toBe(true);
});

for (const width of [1200, 1440, 1600]) test(`N21 N23 W7 matrix scope caps and search 200 classes at ${width}`, async ({ page }) => {
  const root = await open(page, 'R2', width);
  const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  for (const cap of [3, 4, 5]) {
    await page.getByRole('combobox', { name: '可见范围' }).selectOption(String(cap));
    const tabs = scope.getByRole('tab');
    expect(await tabs.count()).toBeLessThanOrEqual(cap);
    await expect(tabs.first()).toHaveAccessibleName('公共资源包');
    await root.getByRole('button', { name: '更多班级', exact: true }).click();
    await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('高等数学 200 班');
    await page.getByRole('button', { name: /^2026 秋 · 高等数学 200 班/ }).click();
    await expect(tabs.last()).toHaveAccessibleName('2026 秋 · 高等数学 200 班');
    await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.first()).toHaveAccessibleName('公共资源包');
  }
});

for (const sample of ['R4', 'S4']) for (const width of [1200, 1440, 1600]) test(`N12 N28 W7 matrix ${sample} grading theme retains draft and input identity at ${width}`, async ({ page }) => {
  const root = await open(page, sample, width);
  await page.getByRole('combobox', { name: '业务子场景' }).selectOption('grading');
  const draft = root.getByRole('textbox', { name: '给当前作答的反馈', exact: true });
  await draft.fill('W7 同一作答的未保存草稿');
  await draft.evaluate(element => element.setAttribute('data-w7-original-input', 'true'));
  const selected = await root.getByRole('group', { name: '学生队列' }).locator('[aria-pressed="true"]').getAttribute('aria-label');
  for (const inverse of [true, false]) {
    await page.getByRole('checkbox', { name: '深色外框', exact: true }).setChecked(inverse);
    await expect(draft).toHaveValue('W7 同一作答的未保存草稿');
    await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
    expect(await root.getByRole('group', { name: '学生队列' }).locator('[aria-pressed="true"]').getAttribute('aria-label')).toBe(selected);
  }
  await root.getByRole('radio', { name: '大', exact: true }).locator('..').click();
  await expect(draft).toHaveValue('W7 同一作答的未保存草稿');
  await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
  await expect(root.locator('.nv5-demo-note')).toContainText('未提交成绩');
});

test('N31 StrictMode standalone repeatedly mounts workspaces without stale temporary state', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/navigation-v042-w3-consumer.html');
  for (let cycle = 0; cycle < 3; cycle++) {
    await page.getByRole('radio', { name: '协作空间', exact: true }).locator('..').click();
    const root = page.locator('[data-recipe-id="recipe-navigation-r6"]');
    await restore(root, 'context').click();
    await restore(root, 'context').click();
    await page.getByRole('radio', { name: '课堂回放', exact: true }).locator('..').click();
    const replay = page.locator('[data-recipe-id="recipe-navigation-r5"]');
    await replay.getByRole('button', { name: '播放回放', exact: true }).click();
    await page.getByRole('radio', { name: '云盘', exact: true }).locator('..').click();
    await expect(page.locator('[data-rain-id="recipe-navigation-r3"]').first()).toBeVisible();
    await expect(page.locator('.rain-workspace__region[data-temporary="true"]')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test('N29 N27 same-label scopes retain separate IDs and drafts through removal, restoration and disabled results', async ({ page }) => {
  await page.goto('/navigation-v042-w6-consumer.html#E1');
  const root = page.locator('[data-rain-id="local-navigation-w6-e1"]');
  const more = root.getByRole('button', { name: '更多班级', exact: true });
  const choose = async (index: number, id: string) => {
    await more.click();
    await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('同名跨学院联合班');
    const results = page.getByRole('button', { name: /^同名跨学院联合班/ });
    await expect(results).toHaveCount(2);
    await results.nth(index).click();
    await expect(root).toHaveAttribute('data-scope-id', id);
  };
  await choose(0, 'class-199');
  const draft = root.getByRole('textbox', { name: '资源说明草稿', exact: true });
  await draft.fill('只属于199的说明');
  await choose(1, 'class-200'); await expect(draft).toHaveValue(''); await draft.fill('只属于200的说明');
  await choose(0, 'class-199'); await expect(draft).toHaveValue('只属于199的说明');
  await choose(1, 'class-200'); await expect(draft).toHaveValue('只属于200的说明');
  await more.click();
  await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('238班');
  await expect(page.getByRole('button', { name: /238班/, exact: false })).toBeDisabled();
  await page.keyboard.press('Escape'); await expect(root).toHaveAttribute('data-scope-id', 'class-200');
  await root.getByRole('button', { name: '移除当前班级', exact: true }).click();
  await expect(root.getByText('当前范围已不可用，请重新选择。', { exact: true })).toBeVisible();
  await expect(root.locator('[role="tab"][aria-selected="true"]')).toHaveCount(0);
  await expect(root).toHaveAttribute('data-scope-id', 'class-200');
  await root.getByRole('button', { name: '恢复刚移除的班级', exact: true }).click();
  await expect(root.locator('[role="tab"][aria-selected="true"]')).toHaveCount(1);
  await expect(draft).toHaveValue('只属于200的说明');
});

test('N32 N28 R6 wide narrow wide derives layout without losing draft, region instance or font size', async ({ page }) => {
  const root = await open(page, 'R6', 1600);
  const fields = region(root, 'fields');
  const draft = root.getByRole('textbox', { name: '你希望我们改进的地方', exact: true });
  await draft.fill('宽度只改变可用布局');
  await draft.evaluate(element => element.setAttribute('data-w7-original-input', 'true'));
  const originalId = await fields.getAttribute('id');
  const font = await draft.evaluate(element => getComputedStyle(element).fontSize);
  await expect(fields).toBeVisible();
  await page.getByRole('combobox', { name: '画板宽度' }).selectOption('1200');
  await expect(fields).toBeHidden();
  await expect(root.locator('.nv5-adaptation')).toContainText('你的展开偏好未被覆盖');
  await page.getByRole('combobox', { name: '画板宽度' }).selectOption('1600');
  await expect(fields).toHaveAttribute('data-mode', 'expanded');
  await expect(fields).toBeVisible();
  expect(await fields.getAttribute('id')).toBe(originalId);
  await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
  await expect(draft).toHaveValue('宽度只改变可用布局');
  expect(await draft.evaluate(element => getComputedStyle(element).fontSize)).toBe(font);
});

test('N36 accepted Review11 W3 exception retains gradient without a top accent for first middle last', async ({ page }) => {
  await open(page, 'White');
  const root = page.getByTestId('candidate-White');
  const tabs = root.getByRole('tab');
  for (const tab of await tabs.all()) {
    await tab.hover(); await tab.click(); await page.mouse.move(0, 0);
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(await tab.evaluate(element => ({ content: getComputedStyle(element, '::before').content, display: getComputedStyle(element, '::before').display, fill: getComputedStyle(element).backgroundImage }))).toEqual({ content: 'none', display: 'none', fill: 'linear-gradient(rgb(224, 234, 255), rgb(255, 255, 255))' });
    expect(await root.locator('.rain-connected-surface__union').evaluateAll(elements => elements.every(element => Boolean(element.getAttribute('d')) && !/NaN|Infinity/.test(element.getAttribute('d')!)))).toBe(true);
  }
});

test('N35 A4 adjacent separators follow ordinary hover current and blur without duplication', async ({ page }) => {
  await open(page, 'A4');
  const tabs = page.getByTestId('candidate-A4').getByRole('tab');
  const separator = tabs.nth(1);
  const opacity = () => separator.evaluate(element => getComputedStyle(element, '::after').opacity);
  await tabs.nth(0).click(); await page.mouse.move(0, 0);
  await expect.poll(opacity).toBe('0.65');
  await tabs.nth(2).hover(); await expect.poll(opacity).toBe('0');
  await page.mouse.move(0, 0); await expect.poll(opacity).toBe('0.65');
  await tabs.nth(2).click(); await page.mouse.move(0, 0); await expect.poll(opacity).toBe('0');
});

test('N33 N38 standalone E6 material review runs native selection, drafts and recovery without reference globals', async ({ page }) => {
  await page.goto('/navigation-v042-w6-consumer.html#E6');
  await expect(page.locator('[data-ai-task="E6"]')).toBeVisible();
  expect(await page.evaluate(() => ['YKT_DEBUG', 'YKT_VISIBILITY', 'ui', 'vApply'].filter(key => key in window))).toEqual([]);
  await expect(page.locator('iframe')).toHaveCount(0);
  const root = page.locator('[data-ai-task="E6"] .rain-workspace');
  await expect(root).toHaveCount(1);
  const draft = root.getByRole('textbox', { name: '审核意见', exact: true });
  await expect(draft).toBeVisible();
  await draft.fill('W7 审核工作台草稿');
  const controls = root.locator('.rain-workspace__restore');
  expect(await controls.count()).toBeGreaterThan(0);
  await controls.first().click();
  await controls.first().click();
  await expect(draft).toHaveValue('W7 审核工作台草稿');
});
