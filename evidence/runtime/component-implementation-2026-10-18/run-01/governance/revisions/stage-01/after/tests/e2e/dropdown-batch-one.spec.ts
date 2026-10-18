import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Page } from "@playwright/test";

async function openReview(page: Page, candidate: "base" | "radix" = "base") {
  await page.goto(`/dropdown-review.html?candidate=${candidate}`);
  await expect(page.getByRole("heading", { name: "下拉菜单 · 第一批" })).toBeVisible({ timeout: 3000 });
}

for (const candidate of ["base", "radix"] as const) {
  test.describe(candidate, () => {
    test("keyboard menu opens, navigates, and returns focus", async ({ page }) => {
      await openReview(page, candidate);
      const trigger = page.getByRole("button", { name: "课程操作", exact: true });
      await trigger.focus();
      await page.keyboard.press("ArrowDown");
      await expect(page.getByRole("menuitem", { name: "查看课程", exact: true })).toBeFocused();
      await page.keyboard.press("End");
      await expect(page.getByRole("menuitem", { name: "删除课程", exact: true })).toBeFocused();
      await page.keyboard.press("Home");
      await expect(page.getByRole("menuitem", { name: "查看课程", exact: true })).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("menu")).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    test("business policy controls actions and checked items for mouse and keyboard", async ({ page }) => {
      await openReview(page, candidate);
      const trigger = page.getByRole("button", { name: "课程操作", exact: true });
      await trigger.click();
      await page.getByRole("menuitem", { name: "查看课程", exact: true }).click();
      await expect(page.getByRole("menu")).toBeVisible();
      await page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true }).click();
      await expect(page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true })).toBeChecked();
      await page.keyboard.press("Escape");
      await page.getByText("操作后关闭", { exact: true }).click();
      await expect(page.getByRole("checkbox", { name: "操作后关闭", exact: true })).toBeChecked();
      await trigger.click();
      await page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true }).click();
      await expect(page.getByRole("menu")).toHaveCount(0);
      await trigger.focus();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
      await expect(page.getByRole("menu")).toHaveCount(0);
      await trigger.click();
      await page.getByRole("menuitem", { name: "记录稍后处理", exact: true }).click();
      await expect(page.getByRole("menu")).toBeVisible();
    });

    test("submenu escape closes one level and preserves its parent", async ({ page }) => {
      test.fail(candidate === "radix", "Recorded native contract gap: Radix closes the complete menu tree on submenu Escape; Base UI must pass.");
      await openReview(page, candidate);
      await page.getByRole("button", { name: "课程操作", exact: true }).click();
      const sub = page.getByRole("menuitem", { name: "导出", exact: true });
      await sub.focus();
      await page.keyboard.press("ArrowRight");
      await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toHaveCount(0);
      await expect(sub).toBeFocused();
      await expect(page.getByRole("menu")).toHaveCount(1);
    });

    test("dialog receives focus from menu and contains long content", async ({ page }) => {
      await openReview(page, candidate);
      const trigger = page.getByRole("button", { name: "课程操作", exact: true });
      await trigger.click();
      await page.getByRole("menuitem", { name: "编辑课程", exact: true }).click();
      const dialog = page.getByRole("dialog", { name: "编辑课程" });
      await expect(dialog).toBeVisible();
      await expect(page.getByLabel("课程名称", { exact: true })).toBeFocused();
      await page.getByRole("button", { name: "保存课程", exact: true }).focus();
      await page.keyboard.press("Tab");
      await expect(page.getByLabel("课程名称", { exact: true })).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    test("select keeps controlled value and skips disabled options", async ({ page }) => {
      await openReview(page, candidate);
      const select = page.getByRole("combobox", { name: "课程范围" });
      await select.focus();
      await page.keyboard.press("ArrowDown");
      await expect(page.getByRole("listbox")).toBeVisible();
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
      await expect(select).toContainText("仅我创建");
      await expect(select).toBeFocused();
      await select.click();
      await expect(page.getByRole("option", { name: "已停用课程" })).toHaveAttribute("aria-disabled", "true");
      await page.keyboard.press("Escape");
      await expect(select).toContainText("仅我创建");
    });

    test("Tab leaves the non-modal menu for the next page control", async ({ page }) => {
      test.fail(candidate === "radix", "Recorded native contract gap: Radix prevents Tab in menu content even when non-modal; Base UI must pass.");
      await openReview(page, candidate);
      const trigger = page.getByRole("button", { name: "课程操作", exact: true });
      await trigger.focus();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Tab");
      await expect(page.getByRole("menu")).toHaveCount(0);
      await expect(page.getByRole("button", { name: "新建学习单元", exact: true })).toBeFocused();
    });

    test("dialog backdrop dismisses and restores its originating trigger", async ({ page }) => {
      await openReview(page, candidate);
      await page.getByRole("button", { name: "课程操作", exact: true }).click();
      await page.getByRole("menuitem", { name: "编辑课程", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "编辑课程" })).toBeVisible();
      await page.mouse.click(10, 10);
      await expect(page.getByRole("dialog", { name: "编辑课程" })).toHaveCount(0);
      await expect(page.getByRole("button", { name: "课程操作", exact: true })).toBeFocused();
    });

    test("mixed panel permits keyboard access to independent controls and an empty result", async ({ page }) => {
      await openReview(page, candidate);
      await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
      const panel = page.getByRole("dialog", { name: "选择学习模板" });
      const search = panel.getByRole("textbox", { name: "搜索模板" });
      await page.keyboard.press("Tab");
      await expect(panel.getByRole("button", { name: "全部", exact: true })).toBeFocused();
      await search.fill("不存在的模板");
      await expect(panel.getByRole("status")).toContainText("没有匹配的模板");
      await expect(panel.getByRole("button", { name: "创建学习单元", exact: true })).toBeDisabled();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "新建学习单元", exact: true })).toBeFocused();
    });

    test("mixed panel preserves search and selection on failure and permits retry", async ({ page }) => {
      await openReview(page, candidate);
      const trigger = page.getByRole("button", { name: "新建学习单元", exact: true });
      await trigger.click();
      const panel = page.getByRole("dialog", { name: "选择学习模板" });
      const search = panel.getByRole("textbox", { name: "搜索模板" });
      await expect(search).toBeFocused();
      await search.fill("函数");
      await panel.getByRole("button", { name: "选择 函数图像练习", exact: true }).click();
      await panel.getByRole("button", { name: "收藏 函数图像练习", exact: true }).click();
      await expect(panel.getByRole("button", { name: "选择 函数图像练习", exact: true })).toHaveAttribute("aria-pressed", "true");
      await panel.getByRole("button", { name: "创建学习单元", exact: true }).click();
      await expect(panel.getByRole("button", { name: "选择 函数图像练习", exact: true })).toBeDisabled();
      await expect(panel.getByRole("button", { name: "选择 函数单元测验", exact: true })).toBeDisabled();
      await expect(panel.getByRole("alert")).toContainText("请重试");
      await expect(search).toHaveValue("函数");
      await panel.getByRole("button", { name: "重试创建", exact: true }).click();
      await expect(panel).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });

    test("navigation has the same explicit close policy for pointer and keyboard", async ({ page }) => {
      await openReview(page, candidate);
      const trigger = page.getByRole("button", { name: "课程操作", exact: true });
      await trigger.click();
      await page.getByRole("menuitem", { name: "查看视觉对照", exact: true }).click();
      await expect(page.getByRole("menu")).toHaveCount(0);
      await expect(page).toHaveURL(/#visual-review$/);
      await trigger.focus();
      await page.keyboard.press("ArrowDown");
      const link = page.getByRole("menuitem", { name: "查看视觉对照", exact: true });
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("menu")).toHaveCount(0);
    });

    test("outside click follows the destination without stealing focus", async ({ page }) => {
      await openReview(page, candidate);
      await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
      const destination = page.getByRole("textbox", { name: "外部焦点目标" });
      await destination.click();
      await expect(page.getByRole("dialog", { name: "选择学习模板" })).toHaveCount(0);
      await expect(destination).toBeFocused();
    });

    test("portals retain dark theme and avoid narrow viewport edges", async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await openReview(page, candidate);
      await page.getByRole("button", { name: "深色", exact: true }).click();
      await page.getByRole("button", { name: "课程操作", exact: true }).click();
      const menu = page.getByRole("menu").first();
      const bounds = await menu.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(7);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(353);
      await expect(menu).toHaveCSS("background-color", "rgb(30, 36, 59)");
      await page.keyboard.press("Escape");
      await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
      const panel = page.getByRole("dialog", { name: "选择学习模板" });
      const panelBounds = await panel.boundingBox();
      expect(panelBounds!.x).toBeGreaterThanOrEqual(7);
      expect(panelBounds!.x + panelBounds!.width).toBeLessThanOrEqual(353);
      await expect(panel).toHaveCSS("background-color", "rgb(30, 36, 59)");
      await page.screenshot({ path: evidenceOutputPath(`evidence/runtime/dropdown-batch-one/${candidate}-dark-narrow-panel.png`) });
    });
  });
}

test("selected text and explanatory hierarchy follow the confirmed recipe", async ({ page }) => {
  await openReview(page);
  const selected = page.getByTestId("token-identity-selected");
  for (const [theme, color, descriptionColor, neutralDescription] of [["浅色", "rgb(15, 85, 223)", "rgb(21, 97, 248)", "rgb(86, 104, 143)"], ["深色", "rgb(124, 165, 255)", "rgb(81, 136, 255)", "rgb(148, 156, 184)"]] as const) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    await expect(selected.locator("[data-slot=label]")).toHaveCSS("font-weight", "600");
    await expect(selected.locator("[data-slot=description]")).toHaveCSS("font-weight", "400");
    for (const id of ["token-identity-selected", "token-selected-disabled"]) {
      await expect(page.getByTestId(id).locator("[data-slot=label]")).toHaveCSS("color", color);
      await expect(page.getByTestId(id).locator("[data-slot=description]")).toHaveCSS("color", id === "token-selected-disabled" ? color : descriptionColor);
    }
    await expect(page.getByTestId("source-identity-selected").locator("[data-slot=label]")).toHaveCSS("color", "rgb(15, 85, 223)");
    await expect(page.getByTestId("token-description").locator("[data-slot=label]")).toHaveCSS("font-weight", "600");
    await expect(page.getByTestId("token-description").locator("[data-slot=description]")).toHaveCSS("color", neutralDescription);
  }
});

test("selected leading and submenu icons follow the theme and restore their unselected colors", async ({ page }) => {
  await openReview(page);
  for (const [theme, brand] of [["浅色", "rgb(15, 85, 223)"], ["深色", "rgb(124, 165, 255)"]] as const) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    for (const flavor of ["source", "token"]) for (const sample of ["plain", "description", "danger", "submenu"]) {
      const item = page.getByTestId(`${flavor}-${sample}`);
      const icon = item.locator(".dr-leading, .dr-submenu-icon");
      const original = await icon.evaluate(el => getComputedStyle(el).color);
      await item.click();
      await expect(icon).toHaveCSS("color", flavor === "source" ? "rgb(15, 85, 223)" : brand);
      await expect(item.locator("[data-slot=label]")).toHaveCSS("font-weight", "600");
      await item.screenshot({ path: evidenceOutputPath(`evidence/runtime/dropdown-batch-one/${theme === "浅色" ? "light" : "dark"}-${flavor}-${sample}-selected.png`) });
      await item.click();
      await expect(icon).toHaveCSS("color", original);
    }
  }
});

test("critical descriptions grow and shared keyboard focus survives forced colors", async ({ page }) => {
  await openReview(page);
  const reason = page.getByTestId("token-critical-reason");
  await expect(reason.locator("[data-slot=description]")).toHaveCSS("-webkit-line-clamp", "none");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const item = page.getByTestId("token-identity-selected");
  await item.focus();
  await expect(item).toHaveCSS("outline-width", "2px");
  await expect(item).toHaveCSS("box-shadow", "none");
});

test("geometry candidates and combined selection, press and keyboard focus remain distinct", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openReview(page);
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    for (const [geometry, shortHeight, descriptionHeight] of [["source", 36, 60], ["tokens", 34, 58]] as const) {
      await page.getByLabel("行间留白").selectOption(geometry);
      await expect(page.getByTestId("token-plain")).toHaveCSS("height", `${shortHeight}px`);
      await expect(page.getByTestId("token-identity-selected")).toHaveCSS("height", `${descriptionHeight}px`);
    }
    await page.getByLabel("行间留白").selectOption("source");
    const checked = page.getByTestId("token-checkbox");
    await page.keyboard.press("Tab");
    await checked.focus();
    await checked.hover();
    await expect(checked).toHaveCSS("outline-width", "1px");
    await expect(checked).not.toHaveCSS("box-shadow", "none");
    await expect(checked.locator("[data-slot=label]")).toHaveCSS("font-weight", "600");
    await checked.screenshot({ path: evidenceOutputPath(`evidence/runtime/dropdown-batch-one/${theme}-checked-focus.png`) });
    const danger = page.getByTestId("token-danger");
    await danger.focus();
    await page.keyboard.down("Space");
    await expect(danger).toHaveCSS("outline-width", "1px");
    await expect(danger).not.toHaveCSS("box-shadow", "none");
    await danger.screenshot({ path: evidenceOutputPath(`evidence/runtime/dropdown-batch-one/${theme}-danger-pressed-focus.png`) });
    await page.keyboard.up("Space");
    await page.keyboard.press("Space");
    await page.screenshot({ path: evidenceOutputPath(`evidence/runtime/dropdown-batch-one/${theme}-full-review.png`), fullPage: true });
  }
});
