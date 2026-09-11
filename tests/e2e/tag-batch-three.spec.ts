import { mkdirSync, writeFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import { contrastRatio } from "./color-contrast";

const evidence = "evidence/runtime/tag-batch-three";
const record = process.env.RAIN_UPDATE_TAG_THREE_EVIDENCE === "1";
const popup = (page: Page) => page.locator('[data-rain-id="ui-tag-select"][data-slot="popup"][data-open]');
const manager = (page: Page) => page.getByRole("dialog");
async function boundaries(page: Page) {
  const box = await page.locator('[data-slot="popup"][data-open]').boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  expect(box!.y + box!.height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);
}
async function screenshot(page: Page, name: string) {
  if (record) { mkdirSync(evidence, { recursive: true }); await page.screenshot({ path: `${evidence}/${name}.png` }); }
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#tag");
});
test.afterEach(async ({ page }) => { expect((await page.pageErrors()).map((error) => error.message)).toEqual([]); });

test("finite selection supports mouse, keyboard, disabled skipping, IME and normal dismissal", async ({ page }) => {
  const trigger = page.getByRole("combobox", { name: "学习环节", exact: true });
  const open = async () => {
    await trigger.click(); await expect(popup(page)).toBeVisible();
    await expect(popup(page).getByRole("option", { selected: true })).toBeFocused();
  };
  await trigger.focus();
  await trigger.dispatchEvent("keydown", { key: "Enter", isComposing: true });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("option", { name: "课前", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(page.getByRole("option", { name: "课后", exact: true })).toBeFocused();
  await expect(page.getByRole("option", { name: "已归档", exact: true })).toHaveAttribute("aria-disabled", "true");
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveText("课后"); await expect(trigger).toBeFocused();
  await open(); await page.getByRole("option", { name: "课后", exact: true }).click();
  await expect(popup(page)).toBeHidden(); await expect(trigger).toHaveText("课后"); await expect(trigger).toBeFocused();
  await open(); await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  await open(); await page.keyboard.press("Tab"); await expect(popup(page)).toBeHidden();
  await expect(page.getByTestId("tag-flow-examples").getByRole("button", { name: "移除标签 期末复习" })).toBeFocused();
  await open(); await page.getByRole("heading", { name: "设计方法复习资料", exact: true }).click();
  await expect(popup(page)).toBeHidden();
});

test("all complete size and appearance recipes retain geometry and popup paint in both themes", async ({ page }) => {
  await page.getByText("尺寸、展开与边界检查", { exact: true }).click();
  const facts: object[] = [], errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const theme of ["light", "dark"]) {
    await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme);
    for (const size of [20, 24, 28]) for (const appearance of ["filled", "outlined", "solid"]) {
      const control = page.getByRole("combobox", { name: `${size}px ${appearance} 标签`, exact: true });
      const geometry = await control.evaluate((node) => {
        const rect = node.getBoundingClientRect(), label = node.querySelector('[data-slot="label"]')!.getBoundingClientRect(), css = getComputedStyle(node);
        return { height: rect.height, fontSize: css.fontSize, fontWeight: css.fontWeight, labelContained: label.y >= rect.y && label.bottom <= rect.bottom };
      });
      expect(geometry.height).toBe(size); expect(geometry.labelContained).toBe(true);
      expect(geometry.fontWeight).toBe(appearance === "solid" ? "700" : "400");
      await control.click(); await expect(popup(page)).toBeVisible(); await boundaries(page);
      const paints = await popup(page).evaluate((node) => {
        const selected = node.querySelector('[role="option"][aria-selected="true"]')!, ordinary = node.querySelectorAll('[role="option"]')[1]!;
        return { parent: getComputedStyle(node).backgroundColor, text: getComputedStyle(ordinary).color, textSurface: getComputedStyle(ordinary).backgroundColor,
          selected: getComputedStyle(selected).color, selectedSurface: getComputedStyle(selected).backgroundColor, icon: getComputedStyle(selected.querySelector('[data-slot="indicator"]')!).color,
          theme: node.closest('[data-rain-theme]')?.getAttribute('data-rain-theme') };
      });
      expect(paints.theme).toBe(theme);
      expect(paints.parent).toBe(theme === "light" ? "rgb(255, 255, 255)" : "rgb(30, 36, 59)");
      const ratios = { text: contrastRatio(paints.text, paints.textSurface, paints.parent), selected: contrastRatio(paints.selected, paints.selectedSurface, paints.parent), icon: contrastRatio(paints.icon, paints.selectedSurface, paints.parent) };
      expect(ratios.text).toBeGreaterThanOrEqual(4.5); expect(ratios.selected).toBeGreaterThanOrEqual(4.5); expect(ratios.icon).toBeGreaterThanOrEqual(3);
      facts.push({ theme, size, appearance, geometry, paints, ratios });
      if (size === 24 && appearance === "filled") await screenshot(page, theme);
      await page.keyboard.press("Escape");
    }
  }
  expect(errors).toEqual([]);
  if (record) writeFileSync(`${evidence}/browser-facts.json`, JSON.stringify({ source: "Actual Chromium DOM and computed styles; popup text 4.5 and icon 3.0 thresholds; existing trigger palette findings remain separate", facts, errors }, null, 2) + "\n");
});

test("management creates, retains errors, edits shared IDs and unlinks only the current resource", async ({ page }) => {
  const current = page.getByRole("group", { name: "当前资料标签", exact: true });
  const related = page.getByRole("region", { name: "关联资料", exact: true });
  await page.getByText("尺寸、展开与边界检查", { exact: true }).click();
  await page.getByRole("checkbox", { name: "模拟下一次标签保存失败" }).check();
  await page.getByRole("button", { name: "设置资料标签", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "搜索标签" })).toBeFocused();
  await manager(page).locator("label").filter({ has: page.getByRole("checkbox", { name: "课堂讨论", exact: true }) }).click();
  await expect(manager(page).getByRole("checkbox", { name: "课堂讨论", exact: true })).toBeChecked();
  await expect(current).toContainText("课堂讨论"); await expect(manager(page)).toBeVisible();
  await page.getByRole("textbox", { name: "搜索标签" }).fill("读书报告");
  await expect(current).toContainText("期末复习");
  await page.getByRole("button", { name: "创建“读书报告”", exact: true }).click();
  const name = page.getByRole("textbox", { name: "标签名称", exact: true });
  await expect(name).toBeFocused(); await expect(manager(page).getByRole("radio")).toHaveCount(20);
  const chosen = manager(page).getByRole("radio").nth(4); await chosen.focus(); await chosen.press("Space");
  await screenshot(page, "create");
  await page.getByRole("button", { name: "创建并选中", exact: true }).click();
  await expect(name).toBeDisabled(); await expect(page.getByRole("alert")).toContainText("暂时无法保存");
  await expect(name).toHaveValue("读书报告"); await expect(chosen).toBeChecked();
  await name.fill("  期末复习  "); await page.getByRole("button", { name: "创建并选中", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("已有同名标签");
  await name.fill("读书报告"); await name.press("Enter");
  await expect(current).toContainText("读书报告"); await expect(page.getByRole("textbox", { name: "搜索标签" })).toBeFocused();
  await page.getByRole("button", { name: "管理标签", exact: true }).click();
  await page.getByRole("button", { name: "编辑期末复习", exact: true }).click();
  await name.fill("跨学科复习"); await manager(page).getByRole("radio").nth(6).press("Space");
  await screenshot(page, "edit"); await page.getByRole("button", { name: "保存修改", exact: true }).click();
  await expect(page.getByRole("button", { name: "编辑跨学科复习", exact: true })).toBeFocused();
  await expect(current).toContainText("跨学科复习"); await expect(related).toContainText("跨学科复习");
  const colors = await page.locator('[data-rain-id="ui-tag"]').filter({ hasText: "跨学科复习" }).evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-color")));
  expect(new Set(colors).size).toBe(1);
  await page.getByRole("button", { name: "关闭标签面板" }).click();
  await expect(page.getByRole("button", { name: "设置资料标签" })).toBeFocused();
  await current.getByRole("button", { name: "移除标签 跨学科复习" }).click();
  await expect(current).not.toContainText("跨学科复习"); await expect(related).toContainText("跨学科复习");
  await expect(page.getByRole("button", { name: "设置资料标签" })).toBeFocused();
  await page.getByRole("button", { name: "设置资料标签" }).click();
  await page.getByRole("button", { name: "返回选择", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "跨学科复习", exact: true })).not.toBeChecked();
});

test("portal follows the local theme and supports controlled opening, long labels, scroll and edge flipping", async ({ page }) => {
  await page.getByText("尺寸、展开与边界检查", { exact: true }).click();
  await page.getByRole("combobox", { name: "主题", exact: true }).selectOption("dark");
  await page.getByRole("combobox", { name: "嵌套浅色标签", exact: true }).click();
  await expect(popup(page)).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await page.keyboard.press("Escape");
  const main = page.getByRole("combobox", { name: "学习环节", exact: true });
  await main.click();
  // Change the existing host theme attribute while focus stays in the open portal.
  await main.evaluate((node) => node.closest('[data-rain-theme]')!.setAttribute("data-rain-theme", "light"));
  await expect(popup(page)).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "切换候选面板", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "受控展开标签" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("combobox", { name: "受控展开标签" })).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("combobox", { name: "禁用标签选择" })).toBeDisabled();
  const long = page.getByRole("combobox", { name: "滚动区域长名称标签", exact: true });
  await long.evaluate((node) => { node.scrollIntoView({ block: "end" }); window.scrollBy(0, -30); });
  await long.click(); await boundaries(page);
  await expect(popup(page)).toHaveAttribute("data-side", "top");
  await expect(popup(page).getByRole("option")).toHaveCount(19);
  const before = (await popup(page).boundingBox())!.y;
  await page.getByTestId("tag-select-scroll").evaluate((node) => { node.scrollTop = 12; });
  await expect.poll(async () => (await popup(page).boundingBox())!.y).toBeLessThan(before);
  await page.keyboard.press("End"); await expect(page.getByRole("option", { name: "第 18 单元的学习资料", exact: true })).toBeFocused();
  await page.keyboard.press("Enter"); await expect(long).toHaveText("第 18 单元的学习资料");
});

test("narrow layouts keep the complete twenty-color form inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.getByRole("button", { name: "设置资料标签" }).click();
  await page.getByRole("button", { name: "创建标签", exact: true }).click();
  await boundaries(page); await expect(manager(page).getByRole("radio")).toHaveCount(20);
  const layout = await manager(page).evaluate((node) => {
    const root = node.getBoundingClientRect();
    return { overflow: node.scrollWidth > node.clientWidth, controls: [...node.querySelectorAll('button, input[type="radio"]')].map((child) => { const r = child.getBoundingClientRect(); return r.x >= root.x && r.right <= root.right; }) };
  });
  expect(layout.overflow).toBe(false); expect(layout.controls.every(Boolean)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  await screenshot(page, "narrow");
  await page.keyboard.press("Escape"); await expect(page.getByRole("button", { name: "设置资料标签" })).toBeFocused();
});

test("text enlargement and native forced colors preserve popup content, boundary and focus", async ({ page }) => {
  const trigger = page.getByRole("combobox", { name: "学习环节", exact: true });
  await trigger.evaluate((node) => { const css = getComputedStyle(node); node.style.fontSize = `${parseFloat(css.fontSize) * 2}px`; node.style.lineHeight = `${parseFloat(css.lineHeight) * 2}px`; });
  expect(await trigger.evaluate((node) => { const root = node.getBoundingClientRect(), label = node.querySelector('[data-slot="label"]')!.getBoundingClientRect(); return label.y >= root.y && label.bottom <= root.bottom; })).toBe(true);
  await trigger.click();
  await popup(page).evaluate((node) => { const css = getComputedStyle(node); node.style.fontSize = `${parseFloat(css.fontSize) * 2}px`; node.style.lineHeight = `${parseFloat(css.lineHeight) * 2}px`; });
  const contained = await popup(page).evaluate((node) => [...node.querySelectorAll('[role="option"]')].every((option) => { const r = option.getBoundingClientRect(), text = option.firstElementChild!.getBoundingClientRect(); return text.y >= r.y && text.bottom <= r.bottom && text.right <= r.right; }));
  expect(contained).toBe(true); await boundaries(page);
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await expect(popup(page)).toHaveCSS("border-top-width", "1px");
  await page.keyboard.press("Home"); await expect(page.getByRole("option", { name: "课前", exact: true })).toBeFocused();
  await expect(page.getByRole("option", { name: "课前", exact: true })).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "设置资料标签" }).click();
  const colors = await manager(page).evaluate((node) => { const css = getComputedStyle(node); return { background: css.backgroundColor, color: css.color, border: css.borderTopColor, width: css.borderTopWidth, adjustment: css.forcedColorAdjust }; });
  expect(colors.adjustment).toBe("auto"); expect(colors.width).toBe("1px");
  expect(contrastRatio(colors.color, colors.background)).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(colors.border, colors.background)).toBeGreaterThanOrEqual(3);
  await screenshot(page, "forced-colors");
});
