import { chromium, expect } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const evidence = path.dirname(fileURLToPath(import.meta.url));
const repo = process.cwd();
const files = ['r1-r3.tsx', 'r4-r6.tsx', 'platform-navigation.css'];
const hashes = Object.fromEntries(await Promise.all(files.map(async name => [name, createHash('sha256').update(await readFile(path.join(repo, 'apps/playground/src/recipes/navigation-v042', name))).digest('hex')])));
const result = { at: new Date().toISOString(), scope: 'independent R1 constrained temporary account popup and focus return', hashes, passed: false, checks: [] };
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
  await rail.getByRole('button', { name: '展开平台导航', exact: true }).click();
  await expect(rail).toHaveAttribute('data-temporary', 'true');
  result.checks.push('actual 900px host temporarily opens global navigation');
  const account = rail.getByRole('button', { name: '当前账户：林老师', exact: true });
  await account.focus();
  await page.keyboard.press('Enter');
  const popup = page.getByRole('dialog', { name: '当前账户', exact: true });
  await expect(popup).toBeVisible();
  await popup.getByText('账户入口示例。', { exact: true }).click();
  await expect(rail).toHaveAttribute('data-temporary', 'true');
  result.checks.push('keyboard account activation opens popup; pointer inside portal retains temporary navigation');
  await page.keyboard.press('Escape');
  await expect(popup).toBeHidden();
  await expect(account).toBeFocused();
  await expect(rail).toHaveAttribute('data-temporary', 'true');
  result.checks.push('first Escape closes only popup and restores account focus');
  await page.keyboard.press('Escape');
  await expect(rail).toHaveAttribute('data-temporary', 'false');
  result.checks.push('second Escape dismisses temporary navigation');
  result.finalFocus = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(result.finalFocus).toBe('展开平台导航');
  result.checks.push('focus returns to persistent global restore owner');
  expect(errors).toEqual([]);
  result.pageErrors = errors;
  result.passed = true;
} catch (error) {
  result.error = error.stack ?? String(error);
  process.exitCode = 1;
} finally {
  await browser.close();
  await writeFile(path.join(evidence, 'independent-account-probe.json'), `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result));
}
