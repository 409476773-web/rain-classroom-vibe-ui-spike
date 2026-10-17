import { chooseSelect } from './navigation-rebuild-select';
import { expect, test, type Locator, type Page } from '@playwright/test';

async function openTools(page: Page, recipe = 'N04') {
  await page.goto(`/#token-first-g3?rebuild=1&scene=tools&recipe=${recipe}&page=exams`);
  await expect(page.getByRole('navigation', { name: '实例 A 导航', exact: true })).toBeVisible();
  return page.getByRole('navigation', { name: '实例 A 导航', exact: true });
}

async function insideViewport(panel: Locator) {
  expect(await panel.evaluate(element => {
    const r = element.getBoundingClientRect();
    return r.left >= 0 && r.top >= 0 && r.right <= innerWidth + 1 && r.bottom <= innerHeight + 1;
  })).toBe(true);
}

for (const recipe of ['N01', 'N02']) {
  test(`${recipe}: eight links retain real destinations, current and keyboard access`, async ({ page }, info) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto(`/#token-first-g3?rebuild=1&scene=course&recipe=${recipe}&page=courses`);
    const nav = page.getByRole('navigation', { name: '顶部全局导航', exact: true });
    await expect(nav.getByRole('link')).toHaveCount(8);
    await expect(nav.getByRole('link', { name: '课程建设', exact: true })).toHaveAttribute('aria-current', 'page');
    await nav.getByRole('link', { name: '考试管理', exact: true }).click();
    await expect(page).toHaveURL(/page=exams(?:&|$)/);
    await expect(page.getByRole('heading', { name: '考试管理', exact: true })).toBeVisible();
    await page.reload();
    await expect(nav.getByRole('link', { name: '考试管理', exact: true })).toHaveAttribute('aria-current', 'page');
    await chooseSelect(page,'导航组合',new RegExp(`^${recipe === 'N01' ? 'N02' : 'N01'} `));
    await expect(page).toHaveURL(/scene=platform/);
    await expect(page).toHaveURL(/page=exams(?:&|$)/);
    await expect(page.getByRole('heading', { name: '考试管理', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: '考试管理', exact: true })).toHaveAttribute('aria-current', 'page');
    await chooseSelect(page,'导航组合',new RegExp(`^${recipe} `));
    await nav.getByRole('link').first().focus();
    for (let index = 0; index < 8; index++) {
      const link = nav.getByRole('link').nth(index);
      await expect(link).toBeFocused();
      await expect(link).toBeInViewport();
      if (index < 7) await page.keyboard.press('Tab');
    }
    expect(await nav.getByRole('tab').count()).toBe(0);
    expect(await nav.getByRole('link').last().evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none');
    await page.screenshot({ path: info.outputPath(`${recipe}-1200x800-keyboard.png`) });
    const current = nav.getByRole('link', { name: '考试管理', exact: true });
    const before = await current.evaluate(element => getComputedStyle(element).backgroundColor);
    const other = nav.getByRole('link', { name: '资源中心', exact: true });
    await other.hover();
    await expect(current).toHaveAttribute('aria-current', 'page');
    expect(await current.evaluate(element => getComputedStyle(element).backgroundColor)).toBe(before);
    if (recipe === 'N02') expect(await other.evaluate(element => getComputedStyle(element).backgroundColor)).not.toBe(before);
    await current.focus();
    const focus = await current.evaluate(element => {
      const style = getComputedStyle(element);
      return { outline: style.outlineStyle, width: style.outlineWidth, color: style.outlineColor, surface: style.backgroundColor, indicator: getComputedStyle(element, '::after').backgroundColor };
    });
    expect(focus.outline).toBe('solid');
    expect(parseFloat(focus.width)).toBeGreaterThan(0);
    expect(focus.color).not.toBe(focus.surface);
    await info.attach('current-hover-focus-computed', { body: JSON.stringify(focus), contentType: 'application/json' });
    await page.screenshot({ path: info.outputPath(`${recipe}-current-hover-focus.png`) });
    await page.setViewportSize({ width: 700, height: 800 });
    expect(await nav.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
    await nav.getByRole('link').first().focus();
    for (let index = 0; index < 8; index++) {
      await expect(nav.getByRole('link').nth(index)).toBeFocused();
      await expect(nav.getByRole('link').nth(index)).toBeInViewport();
      if (index < 7) await page.keyboard.press('Tab');
    }
    await page.screenshot({ path: info.outputPath(`${recipe}-700x800-overflow.png`) });
  });
}

test('N03: current A / open B, pointer continuity, Escape and independent parent destination', async ({ page }, info) => {
  const nav = await openTools(page, 'N03');
  const route = page.url();
  await nav.getByRole('button', { name: '展开资源中心入口' }).click();
  const panel = page.getByRole('dialog', { name: '实例 A 导航：二级入口' });
  await expect(panel).toBeVisible();
  await expect(nav.getByRole('link', { name: '考试管理', exact: true })).toHaveAttribute('aria-current', 'page');
  await panel.getByRole('link').last().hover();
  await expect(panel).toBeVisible();
  await insideViewport(panel);
  await page.screenshot({ path: info.outputPath('N03-current-a-open-b.png') });
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(nav.getByRole('button', { name: '展开资源中心入口' })).toBeFocused();
  expect(page.url()).toBe(route);
  await nav.getByRole('link', { name: '资源中心', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/page=resources(?:&|$)/);
  await expect(page.getByRole('heading', { name: '资源中心', exact: true })).toBeVisible();
});

test('N04: four rich links follow reading order and blank/title areas reach the same tool', async ({ page }, info) => {
  const nav = await openTools(page);
  await nav.getByRole('button', { name: '展开资源中心入口' }).focus();
  await page.keyboard.press('Enter');
  const panel = page.getByRole('dialog', { name: '实例 A 导航：教学工具' });
  const links = panel.getByRole('link');
  await expect(links).toHaveCount(4);
  for (let index = 0; index < 4; index++) {
    await expect(links.nth(index)).toBeFocused();
    if (index < 3) await page.keyboard.press('Tab');
  }
  const geometry = await links.evaluateAll(elements => elements.map(element => {
    const rect = element.getBoundingClientRect();
    const copy = element.querySelector('[data-slot="description"]')!;
    return { x: rect.x, y: rect.y, height: rect.height, contentFits: copy.scrollHeight <= copy.clientHeight + 1 };
  }));
  expect(geometry[0]!.y).toBe(geometry[1]!.y);
  expect(geometry[0]!.x).toBeLessThan(geometry[1]!.x);
  expect(geometry[2]!.y).toBeGreaterThan(geometry[0]!.y);
  expect(geometry.every(item => item.contentFits)).toBe(true);
  await page.screenshot({ path: info.outputPath('N04-rich-two-column.png') });
  const first = links.first();
  const box = (await first.boundingBox())!;
  const target = await first.getAttribute('href');
  await first.click({ position: { x: box.width - 8, y: box.height - 8 } });
  await expect(page).toHaveURL(new RegExp('page=tool-outline(?:&|$)'));
  await expect(page.getByRole('heading', { name: '课程提纲', exact: true })).toBeVisible();
  await nav.getByRole('button', { name: '展开资源中心入口' }).click();
  await expect(panel.getByRole('link', { name: '课程提纲', exact: true })).toHaveAttribute('href', target!);
  await panel.getByRole('link', { name: '课程提纲', exact: true }).locator('[data-slot="title"]').click();
  await expect(page.getByRole('heading', { name: '课程提纲', exact: true })).toBeVisible();
});

test('N03/N04: A surface and density leave B and both portal scopes independent', async ({ page }, info) => {
  const navA = await openTools(page);
  const navB = page.getByRole('navigation', { name: '实例 B 导航', exact: true });
  const bBefore = await navB.getByRole('link').first().evaluate(element => ({ height: element.getBoundingClientRect().height, color: getComputedStyle(element).color }));
  const aBefore = (await navA.getByRole('link').first().boundingBox())!.height;
  await chooseSelect(page,'实例 A 面层','深色');
  await chooseSelect(page,'实例 A 密度','紧凑');
  expect((await navA.getByRole('link').first().boundingBox())!.height).toBeLessThan(aBefore);
  expect(await navB.getByRole('link').first().evaluate(element => ({ height: element.getBoundingClientRect().height, color: getComputedStyle(element).color }))).toEqual(bBefore);
  await navA.getByRole('button', { name: '展开资源中心入口' }).click();
  const popupA = page.getByRole('dialog', { name: '实例 A 导航：教学工具' });
  await expect(popupA).toBeVisible();
  expect(await popupA.evaluate(element => element.closest('[data-rain-theme]')?.getAttribute('data-rain-theme'))).toBe('dark');
  await expect(navB.getByRole('button', { name: '展开资源中心入口' })).toHaveAttribute('aria-expanded', 'false');
  await page.screenshot({ path: info.outputPath('N04-A-dark-B-light.png') });
  await page.keyboard.press('Escape');
  await navB.getByRole('button', { name: '展开资源中心入口' }).focus();
  await page.keyboard.press('Enter');
  const popupB = page.getByRole('dialog', { name: '实例 B 导航：教学工具' });
  await expect(popupB).toBeVisible();
  expect(await popupB.evaluate(element => element.closest('[data-rain-theme]')?.getAttribute('data-rain-theme'))).toBe('light');
  await expect(navA.getByRole('button', { name: '展开资源中心入口' })).toHaveAttribute('aria-expanded', 'false');
});

test('N04: portal hover is delayed and remains usable while moving into its panel', async ({ page }) => {
  await openTools(page);
  const nav = page.getByRole('navigation', { name: '实例 B 导航', exact: true });
  const trigger = nav.getByRole('button', { name: '展开资源中心入口' });
  await trigger.hover();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  const panel = page.getByRole('dialog', { name: '实例 B 导航：教学工具' });
  await expect(panel).toBeVisible();
  await panel.getByRole('link', { name: '作业反馈', exact: true }).hover();
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
});

test('N03: keyboard can leave the panel and an outside click dismisses it', async ({ page }) => {
  const nav = await openTools(page, 'N03');
  const trigger = nav.getByRole('button', { name: '展开资源中心入口' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const panel = page.getByRole('dialog', { name: '实例 A 导航：二级入口' });
  await expect(panel.getByRole('link').first()).toBeFocused();
  for (let index = 0; index < 4; index++) await page.keyboard.press('Tab');
  await expect(panel).toBeHidden();
  await expect(nav.getByRole('link', { name: '考试管理', exact: true })).toBeFocused();
  await trigger.click();
  await expect(panel).toBeVisible();
  await page.getByRole('heading', { name: 'AI 教学工具', exact: true }).click();
  await expect(panel).toBeHidden();
});

for (const viewport of [{ width: 1200, height: 650 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
  test(`N04: long descriptions and edge collision at ${viewport.width}x${viewport.height}`, async ({ page }, info) => {
    await page.setViewportSize(viewport);
    const nav = await openTools(page);
    await nav.getByRole('button', { name: '展开资源中心入口' }).click();
    const panel = page.getByRole('dialog', { name: '实例 A 导航：教学工具' });
    await expect(panel.getByRole('link')).toHaveCount(4);
    await insideViewport(panel);
    const columns = await panel.locator('.nr-topnav-links').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(viewport.width < 600 ? 1 : 2);
    await page.screenshot({ path: info.outputPath(`N04-${viewport.width}x${viewport.height}.png`) });
  });
}
