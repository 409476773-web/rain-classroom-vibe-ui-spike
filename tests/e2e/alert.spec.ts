import { expect, test } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";

test("Alert themes, density, wrapping and explicit recipe remain distinct", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/#alert");
  await expect(page.getByRole("heading", { name: "Alert 提示", exact: true })).toBeVisible();
  const banner = page.getByTestId("banner-example").locator('[data-rain-id="ui-alert"]');
  await expect(banner).toHaveCSS("border-radius", "0px");
  await expect(banner).toHaveCSS("border-width", "0px 0px 1px");
  const facts = [];
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    await expect(page.locator("#alert-title")).toHaveCSS("color", await page.locator("main").evaluate(node => getComputedStyle(node).color));
    const colors = await page.getByTestId("tone-matrix").locator('[data-rain-id="ui-alert"]').evaluateAll(nodes => nodes.map(node => {
      const style = getComputedStyle(node), icon = node.querySelector('[data-slot="icon"]');
      return { tone: node.getAttribute("data-tone"), color: style.color, background: style.backgroundColor,
        parent: getComputedStyle(document.querySelector("main")!).backgroundColor, icon: icon ? getComputedStyle(icon).color : null,
        border: style.borderTopWidth, padding: style.padding, height: node.getBoundingClientRect().height };
    }));
    expect(colors).toHaveLength(4);
    expect(new Set(colors.map(item => item.color)).size).toBe(4);
    expect(page.getByTestId("tone-matrix").locator('[data-icon-variant="filled"]')).toHaveCount(0);
    for (const item of colors) {
      expect(contrastRatio(item.color, item.background, item.parent)).toBeGreaterThan(1);
      if (item.icon) expect(contrastRatio(item.icon, item.background, item.parent)).toBeGreaterThan(1);
      expect(item.border).toBe("1px"); expect(item.padding).toBe("4px 16px");
    }
    facts.push({ theme, colors });
    await page.screenshot({ path: `evidence/runtime/alert/${theme === "浅色" ? "light" : "dark"}.png`, fullPage: true });
  }
  await expect(page.getByTestId("retry-example").locator('[data-icon-variant="filled"]')).toHaveCount(1);
  await expect(page.getByTestId("banner-example").locator('[data-icon-variant="filled"]')).toHaveCount(1);
  await expect(page.getByTestId("banner-example").locator('[data-slot="title"]')).toHaveCSS("font-weight", "400");
  for (const tone of ["warning", "error"]) {
    const alert = page.locator(`[data-rain-id="ui-alert"][data-tone="${tone}"]`).filter({ has: page.locator('[data-slot="actions"]') });
    const colors = await alert.locator('[data-slot="actions"] [data-variant="tertiary"] [data-slot="label"]').evaluate((label) => ({
      label: getComputedStyle(label).color,
      alert: getComputedStyle(label.closest('[data-rain-id="ui-alert"]')!).color,
    }));
    expect(colors.label).toBe(colors.alert);
  }
  await page.getByRole("button", { name: "紧凑", exact: true }).click();
  const first = page.getByTestId("tone-matrix").locator('[data-rain-id="ui-alert"]').first();
  await expect(first).toHaveAttribute("data-density", "compact");
  await expect(first).not.toHaveAttribute("data-local-recipe");
  await expect(first).toHaveCSS("padding", "4px 12px");
  await expect(page.getByTestId("classic-comparison").locator('[data-local-recipe="alert-classic-short"]')).toHaveCount(4);
  await page.screenshot({ path: "evidence/runtime/alert/compact.png", fullPage: true });
  await page.getByRole("button", { name: "常规", exact: true }).click();
  await page.getByRole("button", { name: "浅色", exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  const narrow = page.getByTestId("narrow-example").locator('[data-rain-id="ui-alert"]').first();
  const title = await narrow.locator('[data-slot="title"]').boundingBox(), actions = await narrow.locator('[data-slot="actions"]').boundingBox();
  expect(actions!.y).toBeGreaterThanOrEqual(title!.y + title!.height);
  const actionLabel = narrow.locator('[data-rain-id="ui-button"] [data-slot="label"]');
  await expect(actionLabel).toHaveCSS("white-space", "normal");
  expect(await actionLabel.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  const labelBox = (await actionLabel.boundingBox())!;
  expect(labelBox.x).toBeGreaterThanOrEqual(actions!.x);
  expect(labelBox.x + labelBox.width).toBeLessThanOrEqual(actions!.x + actions!.width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const overflow = await page.locator('[data-rain-id="ui-alert"]').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 1).length);
  expect(overflow).toBe(0);
  await page.screenshot({ path: "evidence/runtime/alert/narrow.png", fullPage: true });
  await page.getByRole("button", { name: "查看当前课程的资料访问权限说明与详细处理办法" }).click();
  await expect(page.locator("#alert-usage")).toBeFocused();
  await expect(page).toHaveURL(/#alert$/);
  await page.emulateMedia({ forcedColors: "active" });
  await page.screenshot({ path: "evidence/runtime/alert/forced-colors.png", fullPage: true });
  expect(errors).toEqual([]);
  writeFileSync("evidence/runtime/alert/browser-facts.json", `${JSON.stringify({ themes: facts, narrowWidth: 390, overflow, errors }, null, 2)}\n`);
});

test("close and async retry preserve host state and keyboard focus", async ({ page }) => {
  await page.goto("/#alert");
  const retry = page.getByTestId("retry-example");
  await page.getByRole("button", { name: "关闭维护公告" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "查看维护公告" })).toBeFocused();
  await expect(page.getByTestId("banner-example").locator('[data-rain-id="ui-alert"]')).toHaveCount(0);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "关闭维护公告" })).toBeVisible();
  await expect(page.getByRole("button", { name: "关闭维护公告" })).toHaveCSS("width", "24px");
  await expect(page.getByRole("button", { name: "关闭维护公告" })).toHaveCSS("height", "24px");
  await retry.getByRole("button", { name: "重新提交", exact: true }).click();
  await expect(retry.getByRole("button", { name: "正在提交" })).toBeDisabled();
  await expect(retry.getByRole("button", { name: "正在提交" })).toHaveAttribute("aria-disabled", "true");
  await page.keyboard.press("Enter");
  await expect(retry.getByText("暂时无法连接服务器")).toBeVisible();
  await retry.getByRole("button", { name: "重新提交", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(retry.locator('[data-slot="title"]')).toHaveText("成绩已提交");
  await expect(retry.locator('[data-slot="title"]')).toBeFocused();
  await expect(retry.getByTestId("retry-alert")).toBeVisible();

  await page.reload();
  await retry.getByRole("button", { name: "重新提交", exact: true }).click();
  await retry.getByRole("button", { name: "关闭提交提示" }).click();
  await expect(retry.getByRole("button", { name: "查看提交状态" })).toBeFocused();
  await expect(retry.getByTestId("retry-alert")).toHaveCount(0);
  await expect(retry.getByRole("status")).toHaveText("仍未连接成功，修改已保留");
  await page.keyboard.press("Enter");
  await retry.getByRole("button", { name: "重新提交", exact: true }).click();
  await retry.getByRole("button", { name: "关闭提交提示" }).click();
  await expect(retry.getByRole("status")).toHaveText("成绩已提交");
  await expect(retry.getByRole("button", { name: "查看提交状态" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(retry.locator('[data-slot="title"]')).toHaveText("成绩已提交");
  await expect(retry.getByRole("button", { name: "查看提交状态" })).toBeFocused();
  await page.getByRole("button", { name: "检查题目", exact: true }).click();
  await expect(page.getByRole("heading", { name: "需要检查的题目" })).toBeFocused();
});
