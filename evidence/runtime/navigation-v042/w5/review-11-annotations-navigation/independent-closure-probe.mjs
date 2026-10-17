import { chromium, expect } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const evidence = path.dirname(fileURLToPath(import.meta.url));
const files = ['r1-r3.tsx', 'r1-r3.css', 'r4-r6.tsx', 'r4-r6.css', 'platform-navigation.css'];
const hashes = Object.fromEntries(await Promise.all(files.map(async name => [name, createHash('sha256').update(await readFile(path.join(process.cwd(), 'apps/playground/src/recipes/navigation-v042', name))).digest('hex')])));
const result = { at: new Date().toISOString(), scope: 'independent final account geometry, DOM keyboard order and temporary popup closure', hashes, passed: false, checks: [] };
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1800, height: 1100 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5198/?sample=R1#navigation-v042');
  await page.getByTestId('candidate-canvas').evaluate(element => { element.style.width = '900px'; });
  const root = page.getByTestId('candidate-canvas').locator('.rain-workspace');
  await expect(root).toHaveAttribute('data-viewport-width', '900');
  const rail = root.locator('.rain-workspace__region[data-region-id="global"]');
  const account = rail.getByRole('button', { name: '当前账户：林老师', exact: true });
  expect((await account.boundingBox()).height).toBe(40);
  await rail.getByRole('button', { name: '展开平台导航', exact: true }).click();
  await expect(rail).toHaveAttribute('data-temporary', 'true');
  expect((await account.boundingBox()).height).toBe(44);
  expect((await account.boundingBox()).width).toBeGreaterThan(100);
  const avatar = account.locator('[data-rain-id="ui-avatar"]');
  expect((await avatar.boundingBox()).height).toBe(32);
  result.checks.push('R1 account retains compact40/expanded44 target and 32px portrait');
  await account.focus();
  await page.keyboard.press('Enter');
  const popup = page.getByRole('dialog', { name: '当前账户', exact: true });
  await expect(popup).toBeVisible();
  await popup.getByText('账户入口示例。', { exact: true }).click();
  await expect(rail).toHaveAttribute('data-temporary', 'true');
  await page.keyboard.press('Escape');
  await expect(popup).toBeHidden();
  await expect(account).toBeFocused();
  await expect(rail).toHaveAttribute('data-temporary', 'true');
  await page.keyboard.press('Escape');
  await expect(rail).toHaveAttribute('data-temporary', 'false');
  expect(await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))).toBe('展开平台导航');
  result.checks.push('R1 temporary account popup retains portal interaction and ordered Escape/focus return');
  await page.goto('http://127.0.0.1:5198/?sample=R4#navigation-v042');
  const r4 = page.getByTestId('candidate-canvas').locator('.rain-workspace');
  await expect(r4).toHaveAttribute('data-viewport-width', '1440');
  const r4Rail = r4.locator('.rain-workspace__region[data-region-id="global"]');
  await r4Rail.getByRole('button', { name: '展开平台导航', exact: true }).click();
  await expect(r4Rail).toHaveAttribute('data-mode', 'expanded');
  const r4Account = r4Rail.getByRole('button', { name: '当前账户：林老师', exact: true });
  const notification = r4Rail.getByRole('button', { name: '通知', exact: true });
  const help = r4Rail.getByRole('button', { name: '帮助', exact: true });
  for (const dark of [false, true]) {
    await page.getByLabel('深色外框', { exact: true }).setChecked(dark);
    expect((await r4Account.boundingBox()).height).toBe(44);
    const [a, n, h] = await Promise.all([r4Account.boundingBox(), notification.boundingBox(), help.boundingBox()]);
    expect(a.x).toBeLessThan(n.x);
    expect(n.x).toBeLessThan(h.x);
    await r4Account.focus();
    await page.keyboard.press('Tab');
    await expect(notification).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(help).toBeFocused();
    result.checks.push(`R4 ${dark ? 'dark' : 'light'} footer visual and keyboard order is account, notification, help`);
  }
  expect(errors).toEqual([]);
  result.pageErrors = errors;
  result.passed = true;
} catch (error) {
  result.error = error.stack ?? String(error);
  process.exitCode = 1;
} finally {
  await browser.close();
  await writeFile(path.join(evidence, 'independent-closure-probe.json'), `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result));
}
