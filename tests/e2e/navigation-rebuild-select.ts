import type { Page } from '@playwright/test';

export async function chooseSelect(page: Page, name: string, option: string | RegExp) {
  await page.getByLabel(name, { exact: true }).click();
  await page.getByRole('option', { name: option, exact: typeof option === 'string' }).click();
}
