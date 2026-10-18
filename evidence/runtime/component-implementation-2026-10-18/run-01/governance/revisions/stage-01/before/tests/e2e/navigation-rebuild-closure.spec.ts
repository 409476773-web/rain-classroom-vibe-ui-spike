import { expect, test } from '@playwright/test';

const url = '/#token-first-g3?rebuild=1';
const evidence = 'evidence/runtime/navigation-rebuild-v03';

test('closure S04: keyboard and pointer follow the icon child destination', async ({ page }) => {
  for (const method of ['keyboard', 'pointer']) {
    await page.goto(`${url}&recipe=S04&page=exams`);
    const disclosure = page.getByRole('navigation', { name: '全局导航', exact: true }).getByRole('button', { name: '展开课程建设', exact: true });
    if (method === 'keyboard') { await disclosure.focus(); await page.keyboard.press('Enter'); }
    else await disclosure.click();
    const child = page.getByRole('navigation', { name: '课程建设子入口' }).getByRole('link', { name: '课程内容', exact: true });
    if (method === 'keyboard') { await child.focus(); await page.keyboard.press('Enter'); }
    else await child.click();
    await expect(page).toHaveURL(/scene=course/);
    await expect(page).toHaveURL(/page=course-content/);
    await expect(page.getByRole('heading', { name: '课程内容', exact: true })).toBeVisible();
  }
  await page.screenshot({ path: `${evidence}/closure-S04-child-destination.png` });
});

test('closure S06: inset clips rounded corners, scrolls independently and survives collapse', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 650 });
  await page.goto(`${url}&recipe=S06&page=exams`);
  const workspace = page.locator('.nr-workspace');
  const main = page.locator('.nr-main-scroll');
  const head = page.locator('.nr-workspace-head');
  const before = (await workspace.boundingBox())!;
  const headBefore = (await head.boundingBox())!;
  await expect(page.locator('.nr-shell')).toHaveAttribute('data-relation', 'inset');
  const clip = await workspace.evaluate(el => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return { radius: parseFloat(style.borderTopLeftRadius), overflow: style.overflow,
      topCornerClips: !el.contains(document.elementFromPoint(rect.left + 1, rect.top + 1)),
      bottomCornerClips: !el.contains(document.elementFromPoint(rect.right - 1, rect.bottom - 1)) };
  });
  expect(clip.radius).toBeGreaterThan(0); expect(clip.overflow).toBe('hidden');
  expect(clip.topCornerClips).toBe(true); expect(clip.bottomCornerClips).toBe(true);
  await main.evaluate(el => { el.scrollTop = el.scrollHeight; });
  expect(await main.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  expect(await head.boundingBox()).toEqual(headBefore);
  const scrollBox = (await main.boundingBox())!;
  expect(scrollBox.y).toBeGreaterThanOrEqual(headBefore.y + headBefore.height);
  expect(scrollBox.y + scrollBox.height).toBeLessThanOrEqual(before.y + before.height);
  await page.getByRole('button', { name: '收起全局导航', exact: true }).click();
  await expect(page.locator('.nr-shell')).toHaveAttribute('data-relation', 'inset');
  const collapsed = (await workspace.boundingBox())!;
  expect(collapsed.width).toBeGreaterThan(before.width); expect(collapsed.y).toBe(before.y);
  expect(collapsed.x + collapsed.width).toBeCloseTo(before.x + before.width);
  expect(await workspace.evaluate(el => getComputedStyle(el).overflow)).toBe('hidden');
  await page.getByRole('button', { name: '展开全局导航', exact: true }).click();
  expect(await workspace.boundingBox()).toEqual(before);
  await test.info().attach('inset-measurements', { body: JSON.stringify({ clip, before, collapsed, scrollBox }), contentType: 'application/json' });
  await page.screenshot({ path: `${evidence}/closure-S06-inset-scroll.png` });
});

test('closure E10: direct editor uses explicit fallback and directory expansion stays per scope', async ({ page }) => {
  await page.goto(`${url}&scene=course&recipe=C01&scope=package&count=1&unit=unit-source-01`);
  await expect(page.getByRole('textbox', { name: '单元内容' })).toBeEditable();
  const back = page.getByRole('link', { name: '返回课程内容', exact: true });
  const href = await back.getAttribute('href');
  expect(href).toContain('page=course-content'); expect(href).not.toContain('unit=unit-source');
  await back.click();
  await expect(page.getByRole('heading', { name: '课程内容', exact: true })).toBeVisible();
  await expect(page.getByLabel('当前教学范围')).toContainText('公共资源包');
  const group = page.getByRole('button', { name: /第一章\s+函数、极限与连续/ });
  await group.click(); await expect(group).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: '高等数学 1 班 · 2026 秋季', exact: true }).click();
  await expect(group).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: '编辑 本班拓展练习', exact: true }).click();
  await page.getByRole('textbox', { name: '单元内容' }).fill('本班本地草稿');
  await page.getByRole('link', { name: '返回课程内容', exact: true }).click();
  await expect(group).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.nr-unit-row[data-selected]')).toContainText('本班拓展练习');
  await page.getByRole('button', { name: '公共资源包', exact: true }).click();
  await expect(group).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.nr-unit-list')).toHaveCount(0);
  await group.click();
  await page.getByRole('button', { name: '编辑 极限的概念与计算', exact: true }).click();
  await page.getByRole('link', { name: '返回课程内容', exact: true }).click();
  await expect(group).toHaveAttribute('aria-expanded', 'true');
  await page.screenshot({ path: `${evidence}/closure-E10-fallback-expansion.png` });
});

test('closure S02: long-label stress fixture and trailing disclosure keep separate hit areas', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 650 });
  await page.goto(`${url}&recipe=S02&page=exams`);
  const nav = page.getByRole('navigation', { name: '全局导航', exact: true });
  const parent = nav.getByRole('link', { name: '课程建设', exact: true });
  const row = parent.locator('..');
  // Text-only stress fixture on the rendered shared NavRow; styles, structure,
  // hit areas and handlers remain the actual candidate implementation.
  await parent.locator('.nr-label').evaluate(el => { el.textContent = '跨学院联合课程建设与教学资源质量管理的超长导航名称'; });
  const label = parent.locator('.nr-label');
  const action = row.locator('.nr-disclosure');
  const labelBox = (await label.boundingBox())!;
  const actionBox = (await action.boundingBox())!;
  const linkBox = (await parent.boundingBox())!;
  expect(labelBox.x + labelBox.width).toBeLessThanOrEqual(actionBox.x);
  expect(linkBox.x + linkBox.width).toBeLessThanOrEqual(actionBox.x);
  expect(actionBox.width).toBeGreaterThanOrEqual(24); expect(actionBox.height).toBeGreaterThanOrEqual(24);
  expect(await label.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  const before = page.url(); const initial = await action.getAttribute('aria-expanded');
  await action.click(); expect(page.url()).toBe(before);
  await expect(action).toHaveAttribute('aria-expanded', initial === 'true' ? 'false' : 'true');
  await page.screenshot({ path: `${evidence}/closure-S02-long-action.png` });
  await parent.focus(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(/page=courses/);
});
