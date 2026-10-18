import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const captures = evidenceOutputPath(fileURLToPath(new URL("../../evidence/runtime/g2-g3-family-refinement-2026-10-08/browser/", import.meta.url)));
mkdirSync(captures, { recursive: true });

test("separated toggles have one boundary each and retain independent selection", async ({ page }) => {
  await page.goto("/#toggle-group");
  const fields = page.getByRole("group", { name: "显示字段", exact: true });
  const surface = await fields.evaluate(el => ({ padding: getComputedStyle(el).padding, border: getComputedStyle(el).borderWidth, background: getComputedStyle(el).backgroundColor }));
  expect(surface.padding).toBe("0px");
  expect(surface.border).toBe("0px");
  expect(surface.background).toBe("rgba(0, 0, 0, 0)");
  await page.screenshot({ path: `${captures}/toggle-group-light.png`, fullPage: true });
  const score = fields.getByRole("button", { name: "分数", exact: true });
  const previous = await score.getAttribute("aria-pressed");
  await score.click();
  await expect(score).toHaveAttribute("aria-pressed", previous === "true" ? "false" : "true");
  await expect(fields.getByRole("button", { name: "姓名", exact: true })).toHaveAttribute("aria-pressed", "true");
  const modes = page.getByRole("group", { name: "显示模式", exact: true });
  await modes.getByRole("button", { name: "列表", exact: true }).press("ArrowRight");
  await expect(modes.getByRole("button", { name: "分栏", exact: true })).toBeFocused();
  await page.keyboard.press("Space");
  await expect(modes.getByRole("button", { name: "分栏", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("Command keeps its typography, bounds and actual compact density", async ({ page }) => {
  await page.goto("/#command");
  const command = page.locator('[data-rain-id="ui-command"]');
  const input = command.getByRole("combobox");
  expect(await input.evaluate(el => getComputedStyle(el).fontSize)).toBe("14px");
  expect(await command.locator('[data-slot="list"]').evaluate(el => getComputedStyle(el).maxHeight)).toBe("320px");
  expect((await command.boundingBox())!.width).toBeLessThanOrEqual(480);
  await expect(command.locator('[data-slot="empty"]')).not.toBeVisible();
  const normal = (await command.getByRole("option").first().boundingBox())!.height;
  await page.screenshot({ path: `${captures}/command-light.png`, fullPage: true });
  await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  const compact = (await command.getByRole("option").first().boundingBox())!.height;
  expect(compact).toBeLessThan(normal);
  expect((await input.boundingBox())!.height).toBe(30);
});

test("Command executes with keyboard, skips disabled items and supports empty results", async ({ page }) => {
  await page.goto("/#command");
  const input = page.getByRole("combobox");
  await input.fill("新建");
  await input.press("Enter");
  await expect(page.getByRole("status").filter({ hasText: "已新建 1 份" })).toBeVisible();
  await input.fill("资料预览");
  await input.press("Enter");
  await expect(page.getByRole("status").filter({ hasText: "预览已打开" })).toBeVisible();
  await input.fill("不存在的命令");
  await expect(page.getByText("没有匹配的命令", { exact: true })).toBeVisible();
  await input.fill("发布");
  await expect(page.getByRole("option", { name: /发布资料/ })).toHaveAttribute("aria-disabled", "true");
  await input.press("Enter");
  await expect(page.getByRole("status").filter({ hasText: "已新建 1 份" })).toBeVisible();
});

test("Sidebar restores group hierarchy and centers collapsed icons without losing location", async ({ page }) => {
  await page.goto("/#sidebar");
  const nav = page.getByRole("navigation", { name: "示例工作台导航", exact: true });
  expect(await nav.getByRole("heading", { name: "工作区", exact: true }).evaluate(el => getComputedStyle(el).fontSize)).toBe("12px");
  expect(await nav.getByRole("link", { name: "教学总览", exact: true }).evaluate(el => getComputedStyle(el).color)).toBe("rgb(15, 85, 223)");
  await page.screenshot({ path: `${captures}/sidebar-light.png`, fullPage: true });
  const normal = (await nav.getByRole("link", { name: "我的课程", exact: true }).boundingBox())!.height;
  await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  expect((await nav.getByRole("link", { name: "我的课程", exact: true }).boundingBox())!.height).toBeLessThan(normal);
  await nav.getByRole("link", { name: "我的课程", exact: true }).click();
  await page.getByRole("button", { name: "收起示例导航", exact: true }).click();
  const current = nav.getByRole("link", { name: "我的课程", exact: true });
  await expect(current).toHaveAttribute("aria-current", "page");
  const centerOffset = await current.evaluate(el => {
    const row = el.getBoundingClientRect(), icon = el.querySelector('[data-slot="icon"]')!.getBoundingClientRect();
    return Math.abs((row.left + row.right) / 2 - (icon.left + icon.right) / 2);
  });
  expect(centerOffset).toBeLessThanOrEqual(1);
  await page.screenshot({ path: `${captures}/sidebar-collapsed.png`, fullPage: true });
});

test("dark documentation paints a dark page and preview surface", async ({ page }) => {
  for (const id of ["toggle-group", "command", "sidebar"]) {
    await page.goto(`/#${id}`);
    await page.getByRole("button", { name: "深色", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("data-rain-theme", "dark");
    const preview = await page.locator(".component-doc__preview").first().evaluate(el => getComputedStyle(el).backgroundColor);
    expect(preview).toBe("rgb(30, 36, 59)");
    await page.screenshot({ path: `${captures}/${id}-dark.png`, fullPage: true });
  }
});

test("first family samples and adjacent documentation fit a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ["toggle-group", "command", "sidebar", "toggle", "skeleton", "sheet", "context-menu", "navigation-menu"]) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
    if (["toggle-group", "command", "sidebar"].includes(id)) await page.screenshot({ path: `${captures}/${id}-narrow.png`, fullPage: true });
  }
});
