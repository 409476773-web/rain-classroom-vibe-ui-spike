import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from '@playwright/test';
import { chooseSelect } from './navigation-rebuild-select';
import { contrastRatio } from './color-contrast';

const base = '/#token-first-g3?rebuild=1&course=math&scope=package&view=page&count=200';
const evidence = evidenceOutputPath('evidence/runtime/navigation-rebuild-v03');

test('course preview keeps test tools outside the layout and preserves sidebar controls', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 780 });
  for (const recipe of ['C01', 'S08', 'S05']) {
    await page.goto(`${base}&scene=course&page=course-content&recipe=${recipe}`);
    const course = page.locator('.nr-course-workspace');
    const main = page.locator('.nr-course-main');
    await expect(page.locator('.nr-controls').getByRole('button', { name: '课程测试', exact: true })).toBeVisible();
    await expect(page.getByLabel('班级样本数量', { exact: true })).toBeHidden();
    await expect(course.getByRole('button', { name: '模拟课程加载' })).toHaveCount(0);
    expect((await course.boundingBox())!.y).toBe((await course.locator('.nr-course-split').boundingBox())!.y);
    if (recipe !== 'S05') {
      expect(await page.locator('.nr-global-top').evaluate(el => ({ top: getComputedStyle(el).paddingTop, bottom: getComputedStyle(el).paddingBottom }))).toEqual({ top: '0px', bottom: '0px' });
    }
    const sidebar = course.locator('.rain-split-sidebar');
    const hideButton = sidebar.getByRole('button', { name: '隐藏课程导航', exact: true });
    await expect(hideButton).toBeVisible();
    await expect(main.getByRole('button', { name: '隐藏课程导航', exact: true })).toHaveCount(0);
    const neutralColor = await hideButton.evaluate(el => getComputedStyle(el).color);
    const width = (await main.boundingBox())!.width;
    await hideButton.click();
    await expect(page.getByRole('navigation', { name: '课程导航', exact: true })).toBeHidden();
    expect((await main.boundingBox())!.width).toBeGreaterThan(width + 200);
    const courseBox = (await course.boundingBox())!;
    const floatingBox = (await page.getByRole('button', { name: '恢复课程导航', exact: true }).boundingBox())!;
    expect(Math.abs(floatingBox.x - courseBox.x)).toBeLessThan(1);
    expect(await page.getByRole('button', { name: '恢复课程导航', exact: true }).evaluate(el => {
      const style = getComputedStyle(el);
      return { left: style.borderLeftWidth, right: style.borderRightWidth, leftRadius: style.borderTopLeftRadius, rightRadius: style.borderTopRightRadius, color: style.color };
    })).toEqual({ left: '0px', right: '1px', leftRadius: '0px', rightRadius: '6px', color: neutralColor });
    await expect(page.getByRole('button', { name: '恢复课程导航', exact: true })).toBeFocused();
    if (recipe === 'C01') await page.screenshot({ path: `${evidence}/visual-feedback-8-C01-collapsed.png` });
    await page.keyboard.press('Enter');
    await expect(page.getByRole('navigation', { name: '课程导航', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: '隐藏课程导航', exact: true })).toBeFocused();
    await page.screenshot({ path: `${evidence}/visual-feedback-8-${recipe}-course.png` });
  }
  await page.getByRole('button', { name: '课程测试', exact: true }).click();
  await page.getByRole('button', { name: '模拟课程加载', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('正在加载课程内容');
  await page.getByRole('button', { name: '恢复课程内容', exact: true }).click();
  await expect(page.getByRole('textbox', { name: '筛选学习单元', exact: true })).toBeVisible();
  await page.screenshot({ path: `${evidence}/visual-feedback-8-test-panel.png` });
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: '专注预览', exact: true }).click();
  await expect(page.locator('.nr-controls')).toBeHidden();
  await expect(page.getByRole('button', { name: '课程测试', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: '隐藏课程导航', exact: true })).toBeVisible();
  await page.screenshot({ path: `${evidence}/visual-feedback-8-focus.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: '隐藏课程导航', exact: true }).click();
  await expect(page.getByRole('button', { name: '恢复课程导航', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `${evidence}/visual-feedback-8-course-390.png` });
});

test('N04 wide table padding, quiet update time, action divider, and icon rail alignment', async ({ page }) => {
  await page.setViewportSize({ width: 1495, height: 747 });
  await page.goto(`${base}&scene=platform&page=courses&recipe=N04`);
  const first = page.getByRole('table').getByRole('row').nth(1);
  expect(await first.getByRole('cell').first().evaluate(el => ({ left: getComputedStyle(el).paddingLeft, right: getComputedStyle(el).paddingRight }))).toEqual({ left: '16px', right: '16px' });
  const date = await first.getByRole('cell').nth(5).evaluate(el => {
    const probe = document.createElement('span');
    probe.style.color = 'var(--rain-category-text-neutral-4)';
    el.appendChild(probe);
    const original = getComputedStyle(probe).color;
    probe.remove();
    return { color: getComputedStyle(el).color, original, background: getComputedStyle(el.closest('.nr-workspace')!).backgroundColor };
  });
  expect(contrastRatio(date.color, date.background)).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(date.color, date.background)).toBeLessThan(contrastRatio(date.original, date.background));
  const divider = await page.locator('.nr-toolbar-action').evaluate(el => ({ width: getComputedStyle(el, '::before').width, height: getComputedStyle(el, '::before').height, color: getComputedStyle(el, '::before').backgroundColor }));
  expect(divider).toMatchObject({ width: '1px', height: '24px' });
  expect(divider.color).not.toBe('rgba(0, 0, 0, 0)');
  await page.screenshot({ path: `${evidence}/visual-feedback-5-courses-1495.png` });
  const rail = page.getByRole('navigation', { name: '全局导航' });
  await rail.getByRole('button', { name: '收起全局导航' }).click();
  const centers = await rail.evaluate(el => {
    const center = (selector: string) => { const r = el.querySelector(selector)!.getBoundingClientRect(); return r.left + r.width / 2; };
    const rail = el.getBoundingClientRect();
    return { rail: rail.left + rail.width / 2, brand: center('.nr-brand .rain-icon'), item: center('.nr-leading .rain-icon'), avatar: center('.nr-profile .nr-avatar') };
  });
  expect(Math.abs(centers.brand - centers.item)).toBeLessThanOrEqual(1);
  expect(Math.abs(centers.avatar - centers.item)).toBeLessThanOrEqual(1);
  expect(Math.abs(centers.rail - centers.item)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: `${evidence}/visual-feedback-5-courses-icon-1495.png` });
  await rail.getByRole('button', { name: '展开全局导航' }).click();
  await page.setViewportSize({ width: 1124, height: 807 });
  expect(await page.getByRole('table').evaluate(el => el.parentElement!.scrollWidth <= el.parentElement!.clientWidth)).toBe(true);
  expect(await first.getByRole('cell').first().evaluate(el => getComputedStyle(el).paddingLeft)).toBe('12px');
  await page.screenshot({ path: `${evidence}/visual-feedback-5-courses-1124.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: '新建考试' })).toBeVisible();
  await page.screenshot({ path: `${evidence}/visual-feedback-5-courses-390.png` });
});

test('S08 sticky action cell follows table row hover and selection', async ({ page }) => {
  await page.setViewportSize({ width: 1495, height: 747 });
  await page.goto(`${base}&scene=platform&page=courses&recipe=S08`);
  const row = page.getByRole('table').getByRole('row').nth(2);
  await row.getByRole('cell').first().hover();
  const hoverSurface = await row.getByRole('cell').last().evaluate(el => getComputedStyle(el).backgroundImage);
  expect(hoverSurface).toContain('linear-gradient');
  await page.screenshot({ path: `${evidence}/visual-feedback-5-S08-hover.png` });
  await row.getByRole('button', { name: '详情' }).click();
  const selectedSurface = await page.locator('.nr-table tbody tr').nth(1).locator('td').last().evaluate(el => getComputedStyle(el).backgroundImage);
  expect(selectedSurface).toContain('linear-gradient');
  expect(selectedSurface).not.toBe(hoverSurface);
});

test('N04 platform annotation keeps table metadata in columns and details as the only row action', async ({ page }) => {
  await page.setViewportSize({ width: 1077, height: 793 });
  await page.goto(`${base}&scene=platform&page=resources&recipe=N04`);
  const nav = page.getByRole('navigation', { name: '全局导航' });
  expect(await nav.getByRole('link', { name: '雨课堂教学工作台' }).evaluate(el => getComputedStyle(el).fontSize)).toBe('15px');
  expect(await nav.getByRole('button', { name: '收起全局导航' }).evaluate(el => getComputedStyle(el).justifyContent)).toBe('flex-end');
  await expect(nav.locator('.nr-profile [data-icon="icon/teacher-student-profile"]')).toBeVisible();
  const main = page.locator('.nr-page-content');
  expect(await main.evaluate(el => ({ top: getComputedStyle(el).paddingTop, bottom: getComputedStyle(el).paddingBottom }))).toEqual({ top: '16px', bottom: '16px' });
  await expect(main.getByText('组织教学任务，查看各班级的考试与完成情况。')).toHaveCount(0);
  const table = main.getByRole('table');
  for (const heading of ['条目名称', '编号', '教学班级', '状态', '参与人数', '更新时间', '操作']) {
    await expect(table.getByRole('columnheader', { name: heading })).toBeVisible();
  }
  const first = table.getByRole('row').nth(1);
  await expect(first.getByRole('cell').nth(0).locator('button')).toHaveCount(0);
  await expect(first.getByRole('cell').nth(1)).toHaveText('EX-0001');
  await expect(first.getByRole('cell').nth(5)).toHaveText('09-23 10:30');
  expect(await first.locator('.nr-exam-name').evaluate(el => ({ font: getComputedStyle(el).fontSize, weight: getComputedStyle(el).fontWeight }))).toEqual({ font: '15px', weight: '600' });
  expect(await first.getByRole('button', { name: '详情', exact: true }).evaluate(el => el.getBoundingClientRect().right <= el.closest('[data-slot="scroll-area"]')!.getBoundingClientRect().right)).toBe(true);
  await page.screenshot({ path: `${evidence}/visual-feedback-4-resources-1077.png` });
  await first.getByRole('button', { name: '详情', exact: true }).click();
  await expect(page.getByRole('dialog', { name: '资源中心 · 跨班级协同记录' })).toBeVisible();
  await page.getByRole('button', { name: '关闭详情' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await first.getByRole('button', { name: '详情', exact: true }).evaluate(el => el.getBoundingClientRect().right <= el.closest('[data-slot="scroll-area"]')!.getBoundingClientRect().right)).toBe(true);
  await page.screenshot({ path: `${evidence}/visual-feedback-4-resources-390.png` });
});

test('N04 course platform toolbar, centered table columns, and rail toggle alignment', async ({ page }) => {
  await page.setViewportSize({ width: 1124, height: 807 });
  await page.goto(`${base}&scene=platform&page=courses&recipe=N04`);
  const nav = page.getByRole('navigation', { name: '全局导航' });
  const toggle = nav.getByRole('button', { name: '收起全局导航' });
  expect(await toggle.evaluate(el => getComputedStyle(el).justifyContent)).toBe('flex-end');
  const toolbar = page.locator('.nr-list-tools');
  const table = page.getByRole('table');
  const count = toolbar.locator('.nr-result-count');
  expect(await count.evaluate(el => getComputedStyle(el).fontSize)).toBe('14px');
  const create = toolbar.getByRole('button', { name: '新建考试' });
  await expect(create).toBeVisible();
  const positions = await page.evaluate(() => {
    const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
    return { headingBottom: rect('.nr-page-heading').bottom, toolbarTop: rect('.nr-list-tools').top, toolbarBottom: rect('.nr-list-tools').bottom, tableTop: rect('.nr-table-wrap').top, countLeft: rect('.nr-result-count').left, searchLeft: rect('.nr-search').left, toolbarRight: rect('.nr-list-tools').right };
  });
  expect(positions.toolbarTop - positions.headingBottom).toBe(12);
  expect(positions.tableTop - positions.toolbarBottom).toBe(12);
  expect(positions.countLeft).toBeLessThan(positions.searchLeft);
  expect(await create.evaluate(el => el.getBoundingClientRect().right)).toBeLessThanOrEqual(positions.toolbarRight);
  const headers = await table.getByRole('columnheader').allTextContents();
  expect(headers).toEqual(['条目名称', '编号', '教学班级', '状态', '参与人数', '更新时间', '操作']);
  const first = table.getByRole('row').nth(1);
  expect(await table.evaluate(el => el.parentElement!.scrollWidth <= el.parentElement!.clientWidth)).toBe(true);
  for (const index of [3, 4, 6]) {
    expect(await first.getByRole('cell').nth(index).evaluate(el => getComputedStyle(el).textAlign)).toBe('center');
    expect(await table.getByRole('columnheader').nth(index).evaluate(el => getComputedStyle(el).textAlign)).toBe('center');
  }
  await expect(first.getByRole('cell').nth(6).getByRole('button', { name: '详情', exact: true })).toBeVisible();
  await page.screenshot({ path: `${evidence}/visual-feedback-4-courses-1124.png` });
  await toggle.click();
  const expand = nav.getByRole('button', { name: '展开全局导航' });
  expect(await expand.evaluate(el => getComputedStyle(el).justifyContent)).toBe('center');
  await page.screenshot({ path: `${evidence}/visual-feedback-4-courses-collapsed-1124.png` });
});

test('course sidebar uses distinct outline-style assets, a 12px arrow in a 36px target, and pill counts', async ({ page }) => {
  await page.goto(`${base}&scene=course&page=course-overview&recipe=S02`);
  const nav = page.getByRole('navigation', { name: '课程导航' });
  const ids = await nav.locator('.nr-rail-content > .nr-branch > .nr-row .nr-leading .rain-icon').evaluateAll(icons => icons.map(icon => icon.getAttribute('data-icon')));
  expect(ids).toEqual(['icon/course-builder', 'icon/outline', 'icon/content-exam', 'icon/members', 'icon/learning-status']);
  const disclosure = nav.getByRole('button', { name: '展开课程内容' });
  expect(await disclosure.evaluate(el => ({ target: el.getBoundingClientRect().width, glyph: el.querySelector('.rain-icon')!.getBoundingClientRect().width }))).toEqual({ target: 36, glyph: 12 });
  await disclosure.click();
  await expect(nav.getByRole('button', { name: '收起课程内容' })).toBeVisible();
  const badge = nav.locator('.nr-count');
  expect(await badge.evaluate(el => getComputedStyle(el).borderRadius)).toBe('9999px');
  await page.screenshot({ path: `${evidence}/visual-feedback-2-course.png` });
  await page.goto(`${base}&scene=course&page=course-tests&recipe=N04`);
  const selected = page.getByRole('navigation', { name: '课程导航' }).getByRole('link', { name: '作业与测验' });
  await expect(selected).toHaveAttribute('aria-current', 'page');
  expect(await selected.locator('.nr-count').evaluate(el => getComputedStyle(el).color)).toBe(await selected.evaluate(el => getComputedStyle(el).color));
});

test('N02 tab-like underline, N03 quieter label and distinct linear panel icon', async ({ page }) => {
  await page.goto(`${base}&scene=platform&page=resources&recipe=N02`);
  const selected = page.getByRole('navigation', { name: '顶部全局导航' }).getByRole('link', { name: '资源中心' });
  expect(await selected.evaluate(el => getComputedStyle(el).fontSize)).toBe('15px');
  expect(await selected.evaluate(el => {
    const indicator = getComputedStyle(el, '::after');
    return { height: indicator.height, radius: indicator.borderRadius, width: indicator.width, color: indicator.backgroundColor, token: getComputedStyle(el).getPropertyValue('--rain-category-fill-brand-solid-2').trim() };
  })).toMatchObject({ height: '3px', radius: '9999px', width: '32px' });
  await page.screenshot({ path: `${evidence}/visual-feedback-2-topnav.png` });

  await page.goto(`${base}&scene=tools&page=resources&recipe=N03`);
  const rail = page.getByRole('navigation', { name: '全局导航' });
  expect(await rail.locator('.nr-group-label').evaluate(el => {
    const probe = document.createElement('span');
    probe.style.color = 'var(--rain-category-text-neutral-4)';
    el.appendChild(probe);
    const token = getComputedStyle(probe).color;
    probe.remove();
    return getComputedStyle(el).color === token;
  })).toBe(true);
  await page.getByRole('navigation', { name: '实例 A 导航' }).getByRole('button', { name: '展开资源中心入口' }).click();
  const panel = page.getByRole('dialog', { name: '实例 A 导航：二级入口' });
  await expect(panel.getByRole('link', { name: '课程提纲' }).locator('[data-icon="icon/course-builder"]')).toBeVisible();
  await page.screenshot({ path: `${evidence}/visual-feedback-2-panel.png` });
});

test('M01 shortcut hints recede, labels stay separate, submenu arrow is linear, edge indicator is rounded', async ({ page }) => {
  await page.goto(`${base}&scene=commands&page=courses&recipe=M01`);
  await chooseSelect(page, '导航当前表达', '边缘指示');
  const rail = page.getByRole('navigation', { name: '全局导航' });
  const edge = await rail.getByRole('link', { name: '课程建设' }).locator('..').evaluate(el => getComputedStyle(el, '::before').borderRadius);
  expect(edge).toBe('9999px');
  await page.getByRole('region', { name: '命令工作台 A' }).getByRole('menuitem', { name: '插入', exact: true }).click();
  const menu = page.locator('.nr-command-popup[data-command-instance="A"][data-command-menu="插入"]');
  const longRow = menu.getByRole('menuitem', { name: '插入包含完整学习目标与评价标准的课堂讨论段落' });
  const appearance = await longRow.evaluate(el => {
    const label = el.querySelector('[data-slot=command-label]')!.getBoundingClientRect();
    const keys = el.querySelector('[data-slot=command-shortcut]')!.getBoundingClientRect();
    const key = el.querySelector('kbd')!;
    const style = getComputedStyle(key);
    return { gap: keys.left - label.right, font: style.fontSize, border: style.borderTopWidth, background: style.backgroundColor, color: style.color, popup: getComputedStyle(el.closest('.nr-command-popup')!).backgroundColor, label: getComputedStyle(el).color };
  });
  expect(appearance.gap).toBeGreaterThanOrEqual(12);
  expect(appearance.font).toBe('11px');
  expect(appearance.border).toBe('0px');
  expect(appearance.background).toBe('rgba(0, 0, 0, 0)');
  expect(contrastRatio(appearance.color, appearance.popup)).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(appearance.color, appearance.popup)).toBeLessThan(contrastRatio(appearance.label, appearance.popup));
  await expect(menu.getByRole('menuitem', { name: '练习类别' }).locator('[data-icon="icon/arrow-right"]')).toBeVisible();
  await page.screenshot({ path: `${evidence}/visual-feedback-2-command.png` });
});
