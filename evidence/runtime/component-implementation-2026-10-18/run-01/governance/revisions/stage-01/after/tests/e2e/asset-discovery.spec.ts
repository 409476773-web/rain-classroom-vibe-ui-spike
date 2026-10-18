import { expect, test } from "@playwright/test";

test("task discovery preserves legacy searches, canonical identity, back navigation and narrow layout", async ({ page }, info) => {
  await page.goto("/#components");
  const search = page.getByRole("textbox", { name: "查找组件名称或旧称" });
  for (const [query, name] of [["Label", "FormItem"], ["Field", "FormItem"], ["TextButton", "Button"], ["InputGroup", "Input Group 输入组合"]]) {
    await search.fill(query!);
    await expect(page.getByRole("link", { name: `查看规范：${name}`, exact: true })).toBeVisible();
  }
  await search.fill("NavigationTabs");
  await page.getByRole("link", { name: "查看规范：NavigationTabs", exact: true }).focus();
  await page.keyboard.press("Enter");
  const detail = page.locator('[data-canonical-asset="ui-navigation-tabs"]');
  await expect(detail).toContainText("唯一 value");
  await detail.getByRole("link", { name: "NavigationBar", exact: true }).click();
  await expect(page.locator('[data-canonical-asset="ui-navigation-bar"]')).toBeVisible();
  await page.goBack();
  await expect(detail).toBeVisible();
  await expect(search).toHaveValue("NavigationTabs");
  await page.reload();
  await expect(search).toHaveValue("NavigationTabs");
  await expect(detail).toBeVisible();
  await detail.screenshot({ path: info.outputPath("navigation-detail-desktop.png") });
  await page.setViewportSize({ width: 390, height: 844 });
  await detail.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  await page.screenshot({ path: info.outputPath("navigation-detail-narrow.png") });
  await page.goto("/#components");
  await search.fill("无结果xyz");
  await expect(page.getByRole("status", { name: "选型结果" })).toContainText("0 项结果");
  await search.fill("");
  await page.getByRole("button", { name: "浏览和切换", exact: true }).click();
  await expect(page.getByRole("button", { name: "浏览和切换", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  await page.locator("#asset-discovery-title").scrollIntoViewIfNeeded();
  await page.screenshot({ path: info.outputPath("task-entry-narrow.png") });
  expect((await page.pageErrors()).map(error => error.message)).toEqual([]);
});

test("overview shows the current batch separately from the retained historical gate", async ({ page }, info) => {
  await page.goto("/");
  await expect(page.getByLabel("当前阶段")).toContainText("本地实施中");
  await expect(page.getByText(/H1选型、H2组合与H3改造/)).toBeVisible();
  await page.screenshot({ path: info.outputPath("overview-desktop.png") });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  await page.screenshot({ path: info.outputPath("overview-narrow.png") });
});

test("H1 comparison material covers six intent and identity groups", async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const groups: Record<string, string[]> = {
    'D01-intents': ['ui-navigation-bar', 'ui-tabs', 'ui-segmented-control', 'ui-scope-navigation', 'ui-object-navigator', 'layout-workspace'],
    'D03-choice': ['ui-select', 'ui-combobox', 'recipe-radio-preview-card', 'recipe-radio-card-with-preview'],
    'D04-overlay-feedback': ['ui-sheet', 'ui-drawer', 'ui-tag', 'ui-checkable-tag', 'ui-checkable-tag-group', 'ui-message', 'ui-toast'],
    'D05-owner': ['layout-workspace', 'layout-connected-surface'],
    'D06-identity': ['recipe-input-group', 'recipe-navigation-r1', 'ui-button', 'ui-form-item'],
  };
  for (const [group, ids] of Object.entries(groups)) for (const id of ids) {
    await page.goto(`/#components?asset=${id}`);
    const detail = page.locator(`[data-canonical-asset="${id}"]`);
    await expect(detail).toBeVisible();
    await expect(detail).toContainText('状态由谁管理');
    await expect(detail).toContainText('局部改造边界');
    await detail.screenshot({ path: info.outputPath(`${group}-${id}.png`) });
  }
  await page.goto('/#components?task=navigate&q=Navigation&asset=ui-navigation-tabs');
  const detail = page.locator('[data-canonical-asset="ui-navigation-tabs"]');
  await detail.getByRole('link', { name: 'NavigationBar', exact: true }).click();
  expect(new URLSearchParams(page.url().split('?')[1]).get('task')).toBe('navigate');
  expect(new URLSearchParams(page.url().split('?')[1]).get('q')).toBe('Navigation');
  await page.reload(); await expect(page.getByRole('textbox', { name: '查找组件名称或旧称' })).toHaveValue('Navigation');
  await page.goBack(); await expect(detail).toBeVisible();
  await page.goto('/#components?asset=recipe-input-group');
  await expect(page.locator('[data-canonical-asset="recipe-input-group"]')).toContainText('用法参考，无独立导出');
});
