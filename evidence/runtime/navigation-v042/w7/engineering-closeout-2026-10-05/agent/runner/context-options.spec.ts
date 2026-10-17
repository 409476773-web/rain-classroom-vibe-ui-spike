import { expect, test } from '@playwright/test';
test('repaired use.contextOptions actually enables reduced-motion media', async ({page}) => { await page.goto('about:blank'); expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true); });
