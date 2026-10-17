import { expect, test } from '@playwright/test';

const url = 'http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&page=home&course=math&scope=package&view=page&count=4';

test('annotated sidebar typography, logo and distinct linear icons in both surfaces', async ({ page }) => {
  for (const recipe of ['S01', 'S02']) {
    await page.goto(`${url}&recipe=${recipe}`);
    const nav = page.getByRole('navigation', { name: '全局导航', exact: true });
    const brand = nav.getByRole('link', { name: '雨课堂教学工作台' });
    await expect(brand.locator('[data-icon="icon/rain-classroom"]')).toBeVisible();
    expect(await brand.evaluate(el => getComputedStyle(el).fontSize)).toBe('15px');
    expect(await nav.locator('.nr-rail-head').evaluate(el => ({ top: getComputedStyle(el).paddingTop, bottom: getComputedStyle(el).paddingBottom }))).toEqual({ top: '16px', bottom: '16px' });
    expect(await page.locator('.nr-page-heading h1').evaluate(el => getComputedStyle(el).fontSize)).toBe('16px');

    const icons = await nav.locator('.nr-rail-content > .nr-branch > .nr-row .nr-leading .rain-icon').evaluateAll(elements => elements.map(el => el.getAttribute('data-icon')));
    expect(icons).toEqual([
      'icon/home', 'icon/course', 'icon/resource', 'icon/exam-library',
      'icon/learning-status', 'icon/members', 'icon/message', 'icon/settings-3',
    ]);
    const sizing = await nav.locator('.nr-rail-content > .nr-branch > .nr-row .nr-link').first().evaluate(el => {
      const icon = el.querySelector('.nr-leading .rain-icon')!;
      return { label: parseFloat(getComputedStyle(el).fontSize), icon: icon.getBoundingClientRect().width };
    });
    expect(sizing.label).toBeGreaterThanOrEqual(15);
    expect(sizing.icon).toBeGreaterThanOrEqual(15);

    const collapsed = nav.getByRole('button', { name: '展开课程建设' });
    if (await collapsed.count()) await collapsed.click();
    const disclosure = nav.getByRole('button', { name: '收起课程建设' });
    await expect(disclosure.locator('[data-icon="icon/arrow-up"]')).toBeVisible();
    expect(await disclosure.locator('.rain-icon').evaluate(el => el.getBoundingClientRect().width)).toBe(12);
    await disclosure.click();
    await expect(nav.getByRole('button', { name: '展开课程建设' }).locator('[data-icon="icon/arrow-down"]')).toBeVisible();
  }
});
