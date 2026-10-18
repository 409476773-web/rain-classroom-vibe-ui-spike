import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { chooseSelect } from './navigation-rebuild-select';
import { expect, test, type Locator } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const evidence = evidenceOutputPath('evidence/runtime/navigation-rebuild-v03');
test.beforeAll(() => mkdirSync(evidence, { recursive: true }));
async function insideViewport(locator: Locator) {
  expect(await locator.evaluate(element => { const r = element.getBoundingClientRect(); return r.left >= 0 && r.top >= 0 && r.right <= innerWidth + 1 && r.bottom <= innerHeight + 1; })).toBe(true);
}

for (const recipe of ['M01', 'M02']) test(`${recipe}: real commands, disabled action and visible undo/redo`, async ({ page }) => {
  await page.goto(`/#token-first-g3?rebuild=1&scene=commands&recipe=${recipe}`);
  const a = page.getByRole('region', { name: '命令工作台 A' });
  await expect(a).toHaveAttribute('data-appearance', recipe === 'M01' ? 'plain' : 'framed');
  const paragraphs = a.getByRole('list', { name: '文档段落 A' }).getByRole('listitem');
  await expect(paragraphs).toHaveCount(2);
  await a.getByRole('menuitem', { name: '文件', exact: true }).click();
  await expect(page.getByRole('menuitem', { name: '发布到课程（未接入）', exact: true })).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('Escape');
  await a.getByRole('menuitem', { name: '插入', exact: true }).click();
  await page.getByRole('menuitem', { name: '插入讲解段落', exact: true }).click();
  await expect(paragraphs).toHaveCount(3);
  await a.getByRole('menuitem', { name: '编辑', exact: true }).click();
  await page.getByRole('menuitem', { name: '撤销', exact: true }).click();
  await expect(paragraphs).toHaveCount(2);
  await a.getByRole('menuitem', { name: '编辑', exact: true }).click();
  await page.getByRole('menuitem', { name: '重做', exact: true }).click();
  await expect(paragraphs).toHaveCount(3);
  await a.getByRole('textbox', { name: '备课备注' }).fill('输入自己的课堂提示');
  await page.keyboard.press('Meta+Shift+Enter');
  await expect(paragraphs).toHaveCount(3);
  await expect(a.getByRole('textbox', { name: '备课备注' })).toBeFocused();
  await expect(a.getByText('键位仅作展示，未注册快捷键。')).toBeVisible();
  await page.screenshot({ path: `${evidence}/commands-${recipe}-content.png`, fullPage: true });
});

test('M01/M02 menu focus coordinates across categories and Escape closes one layer at a time', async ({ page }) => {
  await page.goto('/#token-first-g3?rebuild=1&scene=commands&recipe=M01');
  const a = page.getByRole('region', { name: '命令工作台 A' });
  const file = a.getByRole('menuitem', { name: '文件', exact: true });
  const edit = a.getByRole('menuitem', { name: '编辑', exact: true });
  await file.focus(); await page.keyboard.press('ArrowRight'); await expect(edit).toBeFocused();
  await page.keyboard.press('ArrowDown'); await expect(page.getByRole('menu', { name: '编辑', exact: true })).toBeVisible();
  await page.keyboard.press('ArrowRight'); await expect(page.getByRole('menu', { name: '插入', exact: true })).toBeVisible();
  await page.getByRole('menuitem', { name: '练习类别', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  const child = page.getByRole('menu', { name: '练习类别', exact: true });
  await expect(child).toBeVisible(); await insideViewport(child);
  await page.screenshot({ path: `${evidence}/commands-submenu.png`, fullPage: true });
  await page.keyboard.press('Escape');
  await expect(child).toBeHidden();
  await expect(page.getByRole('menu', { name: '插入', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu', { name: '插入', exact: true })).toBeHidden();
  await expect(a.getByRole('menuitem', { name: '插入', exact: true })).toBeFocused();
});

test('A checkbox, radio, submenu action and Portal changes leave B unchanged', async ({ page }) => {
  await page.goto('/#token-first-g3?rebuild=1&scene=commands&recipe=M02');
  const a = page.getByRole('region', { name: '命令工作台 A' });
  const b = page.getByRole('region', { name: '命令工作台 B' });
  const bPaint = await b.evaluate(element => { const bar = element.querySelector('.nr-command-bar')!; const item = bar.querySelector('[data-slot=trigger]')!; return [getComputedStyle(element).backgroundColor, getComputedStyle(element).color, getComputedStyle(bar).backgroundColor, getComputedStyle(item).height]; });
  await chooseSelect(page,'A 命令面层','深色');
  await a.getByRole('menuitem', { name: '视图', exact: true }).click();
  const popup = page.getByRole('menu', { name: '视图', exact: true });
  await expect(popup).toHaveAttribute('data-rain-theme', 'dark');
  const checkbox = popup.getByRole('menuitemcheckbox', { name: '显示大纲' });
  await expect(checkbox).toHaveAttribute('aria-checked', 'true');
  const labelX = await checkbox.locator('[data-slot=command-label]').evaluate(element => element.getBoundingClientRect().x);
  await checkbox.click(); await expect(checkbox).toHaveAttribute('aria-checked', 'false');
  expect(await checkbox.locator('[data-slot=command-label]').evaluate(element => element.getBoundingClientRect().x)).toBe(labelX);
  await expect(a.getByRole('complementary', { name: '文档大纲 A' })).toHaveCount(0);
  await expect(b.getByRole('complementary', { name: '文档大纲 B' })).toHaveCount(1);
  await popup.getByRole('menuitemradio', { name: '紧凑', exact: true }).click();
  await expect(popup.getByRole('menuitemradio', { name: '紧凑', exact: true })).toHaveAttribute('aria-checked', 'true');
  await expect(popup.getByRole('menuitemradio', { name: '标准', exact: true })).toHaveAttribute('aria-checked', 'false');
  await expect(popup).toHaveAttribute('data-density', 'compact');
  await expect(a).toHaveAttribute('data-density', 'compact');
  await expect(b).toHaveAttribute('data-density', 'default');
  await expect(b).toHaveAttribute('data-rain-theme', 'light');
  expect(await b.evaluate(element => { const bar = element.querySelector('.nr-command-bar')!; const item = bar.querySelector('[data-slot=trigger]')!; return [getComputedStyle(element).backgroundColor, getComputedStyle(element).color, getComputedStyle(bar).backgroundColor, getComputedStyle(item).height]; })).toEqual(bPaint);
  await page.screenshot({ path: `${evidence}/commands-isolated-dark-compact.png`, fullPage: true });
  await page.keyboard.press('Escape');
  await a.getByRole('menuitem', { name: '插入', exact: true }).click();
  await page.getByRole('menuitem', { name: '练习类别', exact: true }).click();
  await page.getByRole('menuitemradio', { name: '课后练习', exact: true }).click();
  await expect(a.getByText('备课文档 · 课后练习 · 本地演示')).toBeVisible();
  await expect(b.getByText('备课文档 · 随堂练习 · 本地演示')).toHaveCount(1);
});

for (const viewport of [{ width: 1200, height: 800 }, { width: 1200, height: 650 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }]) test(`four command columns do not overlap at ${viewport.width}x${viewport.height}`, async ({ page }) => {
  await page.setViewportSize(viewport);
  await page.goto('/#token-first-g3?rebuild=1&scene=commands&recipe=M02');
  const a = page.getByRole('region', { name: '命令工作台 A' });
  await a.getByRole('menuitem', { name: '插入', exact: true }).click();
  const popup = page.getByRole('menu', { name: '插入', exact: true });
  await insideViewport(popup);
  const rows = popup.locator('.nr-command-item');
  expect(await rows.evaluateAll(elements => elements.every(element => {
    const rects = [...element.children].map(child => child.getBoundingClientRect());
    return rects.length === 4 && rects.every((r, i) => i === 0 || r.left >= rects[i - 1]!.right - 1);
  }))).toBe(true);
  await expect(page.getByRole('menuitem', { name: '插入包含完整学习目标与评价标准的课堂讨论段落', exact: true })).toBeVisible();
  await page.screenshot({ path: `${evidence}/commands-columns-${viewport.width}x${viewport.height}.png`, fullPage: true });
});
