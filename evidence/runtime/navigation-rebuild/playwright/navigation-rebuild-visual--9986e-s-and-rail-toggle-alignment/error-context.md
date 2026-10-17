# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-rebuild-visual-feedback-2.spec.ts >> N04 course platform toolbar, centered table columns, and rail toggle alignment
- Location: tests/e2e/navigation-rebuild-visual-feedback-2.spec.ts:37:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.evaluate: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('navigation', { name: '全局导航' }).getByRole('button', { name: '收起全局导航' })

```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | import { chooseSelect } from './navigation-rebuild-select';
  3   | import { contrastRatio } from './color-contrast';
  4   | 
  5   | const base = '/#token-first-g3?rebuild=1&course=math&scope=package&view=page&count=200';
  6   | const evidence = 'evidence/runtime/navigation-rebuild-v03';
  7   | 
  8   | test('N04 platform annotation keeps table metadata in columns and details as the only row action', async ({ page }) => {
  9   |   await page.setViewportSize({ width: 1077, height: 793 });
  10  |   await page.goto(`${base}&scene=platform&page=resources&recipe=N04`);
  11  |   const nav = page.getByRole('navigation', { name: '全局导航' });
  12  |   expect(await nav.getByRole('link', { name: '雨课堂教学工作台' }).evaluate(el => getComputedStyle(el).fontSize)).toBe('15px');
  13  |   expect(await nav.getByRole('button', { name: '收起全局导航' }).evaluate(el => getComputedStyle(el).justifyContent)).toBe('flex-end');
  14  |   await expect(nav.locator('.nr-profile [data-icon="icon/teacher-student-profile"]')).toBeVisible();
  15  |   const main = page.locator('.nr-page-content');
  16  |   expect(await main.evaluate(el => ({ top: getComputedStyle(el).paddingTop, bottom: getComputedStyle(el).paddingBottom }))).toEqual({ top: '16px', bottom: '16px' });
  17  |   await expect(main.getByText('组织教学任务，查看各班级的考试与完成情况。')).toHaveCount(0);
  18  |   const table = main.getByRole('table');
  19  |   for (const heading of ['条目名称', '编号', '教学班级', '状态', '参与人数', '更新时间', '操作']) {
  20  |     await expect(table.getByRole('columnheader', { name: heading })).toBeVisible();
  21  |   }
  22  |   const first = table.getByRole('row').nth(1);
  23  |   await expect(first.getByRole('cell').nth(0).locator('button')).toHaveCount(0);
  24  |   await expect(first.getByRole('cell').nth(1)).toHaveText('EX-0001');
  25  |   await expect(first.getByRole('cell').nth(5)).toHaveText('09-23 10:30');
  26  |   expect(await first.locator('.nr-exam-name').evaluate(el => ({ font: getComputedStyle(el).fontSize, weight: getComputedStyle(el).fontWeight }))).toEqual({ font: '15px', weight: '600' });
  27  |   expect(await first.getByRole('button', { name: '详情', exact: true }).evaluate(el => el.getBoundingClientRect().right <= el.closest('[data-slot="scroll-area"]')!.getBoundingClientRect().right)).toBe(true);
  28  |   await page.screenshot({ path: `${evidence}/visual-feedback-4-resources-1077.png` });
  29  |   await first.getByRole('button', { name: '详情', exact: true }).click();
  30  |   await expect(page.getByRole('dialog', { name: '资源中心 · 跨班级协同记录' })).toBeVisible();
  31  |   await page.getByRole('button', { name: '关闭详情' }).click();
  32  |   await page.setViewportSize({ width: 390, height: 844 });
  33  |   expect(await first.getByRole('button', { name: '详情', exact: true }).evaluate(el => el.getBoundingClientRect().right <= el.closest('[data-slot="scroll-area"]')!.getBoundingClientRect().right)).toBe(true);
  34  |   await page.screenshot({ path: `${evidence}/visual-feedback-4-resources-390.png` });
  35  | });
  36  | 
  37  | test('N04 course platform toolbar, centered table columns, and rail toggle alignment', async ({ page }) => {
  38  |   await page.setViewportSize({ width: 1124, height: 807 });
  39  |   await page.goto(`${base}&scene=platform&page=courses&recipe=N04`);
  40  |   const nav = page.getByRole('navigation', { name: '全局导航' });
  41  |   const toggle = nav.getByRole('button', { name: '收起全局导航' });
> 42  |   expect(await toggle.evaluate(el => getComputedStyle(el).justifyContent)).toBe('flex-end');
      |                       ^ Error: locator.evaluate: Test timeout of 30000ms exceeded.
  43  |   const heading = page.locator('.nr-page-heading');
  44  |   const toolbar = page.locator('.nr-list-tools');
  45  |   const table = page.getByRole('table');
  46  |   const count = toolbar.locator('.nr-result-count');
  47  |   expect(await count.evaluate(el => getComputedStyle(el).fontSize)).toBe('14px');
  48  |   const create = toolbar.getByRole('button', { name: '新建考试' });
  49  |   await expect(create).toBeVisible();
  50  |   const positions = await page.evaluate(() => {
  51  |     const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
  52  |     return { headingBottom: rect('.nr-page-heading').bottom, toolbarTop: rect('.nr-list-tools').top, toolbarBottom: rect('.nr-list-tools').bottom, tableTop: rect('.nr-table-wrap').top, countLeft: rect('.nr-result-count').left, searchLeft: rect('.nr-search').left, toolbarRight: rect('.nr-list-tools').right };
  53  |   });
  54  |   expect(positions.toolbarTop - positions.headingBottom).toBe(12);
  55  |   expect(positions.tableTop - positions.toolbarBottom).toBe(12);
  56  |   expect(positions.countLeft).toBeLessThan(positions.searchLeft);
  57  |   expect(await create.evaluate(el => el.getBoundingClientRect().right)).toBeLessThanOrEqual(positions.toolbarRight);
  58  |   const headers = await table.getByRole('columnheader').allTextContents();
  59  |   expect(headers).toEqual(['条目名称', '编号', '教学班级', '状态', '参与人数', '更新时间', '操作']);
  60  |   const first = table.getByRole('row').nth(1);
  61  |   for (const index of [3, 4, 6]) {
  62  |     expect(await first.getByRole('cell').nth(index).evaluate(el => getComputedStyle(el).textAlign)).toBe('center');
  63  |     expect(await table.getByRole('columnheader').nth(index).evaluate(el => getComputedStyle(el).textAlign)).toBe('center');
  64  |   }
  65  |   await expect(first.getByRole('cell').nth(6).getByRole('button', { name: '详情', exact: true })).toBeVisible();
  66  |   await page.screenshot({ path: `${evidence}/visual-feedback-4-courses-1124.png` });
  67  |   await toggle.click();
  68  |   const expand = nav.getByRole('button', { name: '展开全局导航' });
  69  |   expect(await expand.evaluate(el => getComputedStyle(el).justifyContent)).toBe('center');
  70  |   await page.screenshot({ path: `${evidence}/visual-feedback-4-courses-collapsed-1124.png` });
  71  | });
  72  | 
  73  | test('course sidebar uses distinct outline-style assets, a 12px arrow in a 36px target, and pill counts', async ({ page }) => {
  74  |   await page.goto(`${base}&scene=course&page=course-overview&recipe=S02`);
  75  |   const nav = page.getByRole('navigation', { name: '课程导航' });
  76  |   const ids = await nav.locator('.nr-rail-content > .nr-branch > .nr-row .nr-leading .rain-icon').evaluateAll(icons => icons.map(icon => icon.getAttribute('data-icon')));
  77  |   expect(ids).toEqual(['icon/course-builder', 'icon/outline', 'icon/content-exam', 'icon/members', 'icon/learning-status']);
  78  |   const disclosure = nav.getByRole('button', { name: '展开课程内容' });
  79  |   expect(await disclosure.evaluate(el => ({ target: el.getBoundingClientRect().width, glyph: el.querySelector('.rain-icon')!.getBoundingClientRect().width }))).toEqual({ target: 36, glyph: 12 });
  80  |   await disclosure.click();
  81  |   await expect(nav.getByRole('button', { name: '收起课程内容' })).toBeVisible();
  82  |   const badge = nav.locator('.nr-count');
  83  |   expect(await badge.evaluate(el => getComputedStyle(el).borderRadius)).toBe('9999px');
  84  |   await page.screenshot({ path: `${evidence}/visual-feedback-2-course.png` });
  85  |   await page.goto(`${base}&scene=course&page=course-tests&recipe=N04`);
  86  |   const selected = page.getByRole('navigation', { name: '课程导航' }).getByRole('link', { name: '作业与测验' });
  87  |   await expect(selected).toHaveAttribute('aria-current', 'page');
  88  |   expect(await selected.locator('.nr-count').evaluate(el => getComputedStyle(el).color)).toBe(await selected.evaluate(el => getComputedStyle(el).color));
  89  | });
  90  | 
  91  | test('N02 tab-like underline, N03 quieter label and distinct linear panel icon', async ({ page }) => {
  92  |   await page.goto(`${base}&scene=platform&page=resources&recipe=N02`);
  93  |   const selected = page.getByRole('navigation', { name: '顶部全局导航' }).getByRole('link', { name: '资源中心' });
  94  |   expect(await selected.evaluate(el => getComputedStyle(el).fontSize)).toBe('15px');
  95  |   expect(await selected.evaluate(el => {
  96  |     const indicator = getComputedStyle(el, '::after');
  97  |     return { height: indicator.height, radius: indicator.borderRadius, width: indicator.width, color: indicator.backgroundColor, token: getComputedStyle(el).getPropertyValue('--rain-category-fill-brand-solid-2').trim() };
  98  |   })).toMatchObject({ height: '3px', radius: '9999px', width: '32px' });
  99  |   await page.screenshot({ path: `${evidence}/visual-feedback-2-topnav.png` });
  100 | 
  101 |   await page.goto(`${base}&scene=tools&page=resources&recipe=N03`);
  102 |   const rail = page.getByRole('navigation', { name: '全局导航' });
  103 |   expect(await rail.locator('.nr-group-label').evaluate(el => {
  104 |     const probe = document.createElement('span');
  105 |     probe.style.color = 'var(--rain-category-text-neutral-4)';
  106 |     el.appendChild(probe);
  107 |     const token = getComputedStyle(probe).color;
  108 |     probe.remove();
  109 |     return getComputedStyle(el).color === token;
  110 |   })).toBe(true);
  111 |   await page.getByRole('navigation', { name: '实例 A 导航' }).getByRole('button', { name: '展开资源中心入口' }).click();
  112 |   const panel = page.getByRole('dialog', { name: '实例 A 导航：二级入口' });
  113 |   await expect(panel.getByRole('link', { name: '课程提纲' }).locator('[data-icon="icon/course-builder"]')).toBeVisible();
  114 |   await page.screenshot({ path: `${evidence}/visual-feedback-2-panel.png` });
  115 | });
  116 | 
  117 | test('M01 shortcut hints recede, labels stay separate, submenu arrow is linear, edge indicator is rounded', async ({ page }) => {
  118 |   await page.goto(`${base}&scene=commands&page=courses&recipe=M01`);
  119 |   await chooseSelect(page, '导航当前表达', '边缘指示');
  120 |   const rail = page.getByRole('navigation', { name: '全局导航' });
  121 |   const edge = await rail.getByRole('link', { name: '课程建设' }).locator('..').evaluate(el => getComputedStyle(el, '::before').borderRadius);
  122 |   expect(edge).toBe('9999px');
  123 |   await page.getByRole('region', { name: '命令工作台 A' }).getByRole('menuitem', { name: '插入', exact: true }).click();
  124 |   const menu = page.locator('.nr-command-popup[data-command-instance="A"][data-command-menu="插入"]');
  125 |   const longRow = menu.getByRole('menuitem', { name: '插入包含完整学习目标与评价标准的课堂讨论段落' });
  126 |   const appearance = await longRow.evaluate(el => {
  127 |     const label = el.querySelector('[data-slot=command-label]')!.getBoundingClientRect();
  128 |     const keys = el.querySelector('[data-slot=command-shortcut]')!.getBoundingClientRect();
  129 |     const key = el.querySelector('kbd')!;
  130 |     const style = getComputedStyle(key);
  131 |     return { gap: keys.left - label.right, font: style.fontSize, border: style.borderTopWidth, background: style.backgroundColor, color: style.color, popup: getComputedStyle(el.closest('.nr-command-popup')!).backgroundColor, label: getComputedStyle(el).color };
  132 |   });
  133 |   expect(appearance.gap).toBeGreaterThanOrEqual(12);
  134 |   expect(appearance.font).toBe('11px');
  135 |   expect(appearance.border).toBe('0px');
  136 |   expect(appearance.background).toBe('rgba(0, 0, 0, 0)');
  137 |   expect(contrastRatio(appearance.color, appearance.popup)).toBeGreaterThanOrEqual(4.5);
  138 |   expect(contrastRatio(appearance.color, appearance.popup)).toBeLessThan(contrastRatio(appearance.label, appearance.popup));
  139 |   await expect(menu.getByRole('menuitem', { name: '练习类别' }).locator('[data-icon="icon/arrow-right"]')).toBeVisible();
  140 |   await page.screenshot({ path: `${evidence}/visual-feedback-2-command.png` });
  141 | });
  142 | 
```