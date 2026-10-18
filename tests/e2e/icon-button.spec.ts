import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator, type Page } from "@playwright/test";

// Resolve the named Foundation color in the real component's theme scope.
async function tokenColor(control: Locator, token: string) {
  return control.evaluate((element, name) => {
    if (!getComputedStyle(element).getPropertyValue(name).trim()) throw new Error(`Missing Foundation token ${name}`);
    const probe = document.createElement("span");
    probe.style.color = `var(${name})`;
    probe.hidden = true;
    element.append(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, token);
}

async function expectToken(control: Locator, property: string, token: string) {
  await expect(control).toHaveCSS(property, await tokenColor(control, token));
}

async function clickUnavailableWithPointer(page: Page, control: Locator) {
  await control.scrollIntoViewIfNeeded();
  const box = await control.boundingBox();
  if (!box) throw new Error("The real button must have a visible pointer target");
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto("/#icon-button");
  await expect(page.getByRole("heading", { name: "图标按钮，让紧凑操作更清楚", level: 1 })).toBeVisible();
});

test("confirmed marks and directory actions use existing glyphs with independent states", async ({ page }) => {
  for (const [label, resting, marked] of [
    ["星标收藏课程", "rating-star", "rating-star-100"],
    ["收藏课程", "favorite", "favorite-filled"],
    ["点赞课程", "like", "like-filled"],
    ["不喜欢课程", "dislike", "dislike-filled"],
    ["为课程鼓掌", "like-alt-2", "like-alt"],
    ["置顶课程", "pin-top-alt-2", "pin-top-alt-2"],
    ["固定课程", "pin", "pin-top-alt"],
  ]) {
    const button = page.getByRole("button", { name: label, exact: true });
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(button.locator(`[data-icon="icon/${resting}"]`)).toBeVisible();
    await button.focus();
    await button.press("Enter");
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(button).not.toHaveAttribute("aria-expanded");
    await expect(button).toHaveAttribute("data-highlight", "icon");
    await expect(button.locator(`[data-icon="icon/${marked}"]`)).toBeVisible();
    await expectToken(button, "color", "--rain-category-icon-brand-1");
    await expect(button).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  }
  await expect(page.getByTestId("icon-button-mark-top")).toContainText("已置顶");
  await expect(page.getByTestId("icon-button-mark-pin")).toContainText("已固定");

  const directory = page.getByRole("button", { name: "展开课程目录", exact: true });
  await expect(directory.locator('[data-icon="icon/expand"]')).toBeVisible();
  await directory.focus();
  await directory.press("Space");
  const closeDirectory = page.getByRole("button", { name: "收起课程目录", exact: true });
  await expect(closeDirectory).toHaveAttribute("aria-expanded", "true");
  await expect(closeDirectory).not.toHaveAttribute("aria-pressed");
  await expect(closeDirectory.locator('[data-icon="icon/collapse"]')).toBeVisible();
  await expectToken(closeDirectory, "background-color", "--rain-category-fill-brand-alpha-4");
  await expect(page.locator("#icon-button-course-directory")).toBeVisible();
  await closeDirectory.press("Space");
  await expect(directory).toBeFocused();
  await expect(directory).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#icon-button-course-directory")).toBeHidden();
  for (const label of ["置顶课程", "固定课程"]) await expect(page.getByRole("button", { name: label, exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("public IconSize classes and all complete IconButton recipes set real geometry", async ({ page }) => {
  const publicSizes = [4, 6, 8, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36];
  const iconMatrix = page.getByTestId("icon-size-matrix");
  await expect(iconMatrix.locator("[data-icon-size]")).toHaveCount(15);
  for (const size of publicSizes) {
    const icon = iconMatrix.locator(`[data-icon-size="${size}"] > .rain-icon`);
    await expect(icon).toHaveClass(new RegExp(`\\bsize-rain-icon-${size}\\b`));
    await expect(icon).toHaveCSS("width", `${size}px`);
    await expect(icon).toHaveCSS("height", `${size}px`);
  }

  const sizeMatrix = page.getByTestId("icon-button-size-matrix");
  const recipes = ["18/11", "20/12", "20/14", "24/12", "24/14", "24/16", "28/12", "28/14", "28/16", "28/18", "28/20", "32/12", "32/14", "32/16", "32/18", "32/20", "32/24", "36/20"];
  await expect(sizeMatrix.locator('[data-rain-id="ui-icon-button"]')).toHaveCount(18);
  for (const size of recipes) {
    const [control, icon] = size.split("/").map(Number);
    const button = sizeMatrix.locator(`[data-size="${size}"]`);
    await expect(button).toHaveCSS("width", `${control}px`);
    await expect(button).toHaveCSS("height", `${control}px`);
    await expect(button).toHaveCSS("border-radius", control === 36 ? "8px" : "6px");
    await expect(button).toHaveCSS("border-top-width", "0px");
    for (const target of [button.locator('[data-slot="icon"]'), button.locator(".rain-icon")]) {
      await expect(target).toHaveCSS("width", `${icon}px`);
      await expect(target).toHaveCSS("height", `${icon}px`);
    }
  }

  for (const [density, expectedSize, dimension] of [["compact", "32/18", 32], ["default", "36/20", 36]] as const) {
    const scope = page.getByTestId(`icon-button-density-${density}`);
    const automatic = scope.getByRole("button", { name: `${density} 默认尺寸` });
    await expect(automatic).toHaveAttribute("data-size", expectedSize);
    await expect(automatic).toHaveCSS("width", `${dimension}px`);
    await expect(scope.getByRole("button", { name: `${density} 明确尺寸` })).toHaveCSS("width", "24px");
  }
});

for (const theme of ["light", "dark"] as const) {
  test(`${theme}: default, highlighted and danger paints use their current Foundation colors`, async ({ page }) => {
    await page.getByRole("group", { name: "预览主题" }).getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    for (const [name, foreground, restingBackground, hoverBackground, pressedBackground] of [
      ["普通", "icon-neutral-2", null, "fill-neutral-alpha-3", "fill-neutral-alpha-2"],
      ["危险", "icon-red-1", null, "fill-red-alpha-2", "fill-red-alpha-1"],
      ["图标高亮", "icon-brand-1", null, "fill-brand-alpha-3", "fill-brand-alpha-3"],
      ["浅底高亮", "icon-brand-1", "fill-brand-alpha-4", "fill-brand-alpha-3", "fill-brand-alpha-3"],
    ] as const) {
      const button = page.getByRole("button", { name: `${name} 可操作`, exact: true });
      await page.mouse.move(0, 0);
      await expectToken(button, "color", `--rain-category-${foreground}`);
      if (restingBackground) await expectToken(button, "background-color", `--rain-category-${restingBackground}`);
      else await expect(button).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      await button.hover();
      await expectToken(button, "background-color", `--rain-category-${hoverBackground}`);
      await expectToken(button, "color", `--rain-category-${foreground}`);
      await page.mouse.down();
      await expectToken(button, "background-color", `--rain-category-${pressedBackground}`);
      await page.mouse.up();

      const disabled = page.getByRole("button", { name: `${name} 禁用`, exact: true });
      await disabled.hover({ force: true });
      await expectToken(disabled, "color", "--rain-category-icon-neutral-5");
      await expect(disabled).toHaveCSS("opacity", "1");
      if (restingBackground) await expectToken(disabled, "background-color", `--rain-category-${restingBackground}`);
      else await expect(disabled).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    }

    const emphasis = page.getByRole("button", { name: "强调反馈编辑" });
    await emphasis.hover();
    await expect(emphasis).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expectToken(emphasis, "color", "--rain-category-icon-neutral-1");
    await page.mouse.down();
    await expect(emphasis).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await page.mouse.up();
    const blockedEmphasis = page.getByRole("button", { name: "强调反馈禁用" });
    await blockedEmphasis.hover({ force: true });
    await expectToken(blockedEmphasis, "color", "--rain-category-icon-neutral-5");
    await page.mouse.move(0, 0);
    await page.screenshot({ path: evidenceOutputPath(`evidence/runtime/icon-button/${theme}.png`), fullPage: true, animations: "disabled" });
  });
}

test("loading keeps focus, blocks real pointer and keyboard activation, and restores the latest icon", async ({ page }) => {
  const button = page.getByTestId("icon-button-loading-action");
  const originalBox = await button.boundingBox();
  await button.focus();
  // A host update while the action retains focus, through the page's real control.
  await page.getByRole("checkbox", { name: "加载中", exact: true }).evaluate((element) => (element as HTMLInputElement).click());
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("aria-busy", "true");
  await expect(button).toHaveAttribute("aria-disabled", "true");
  await expect(button).not.toHaveAttribute("disabled");
  const loadingGlyph = button.locator('[data-slot="loading-indicator"]');
  await expect(loadingGlyph).toHaveCSS("width", "20px");
  await expect(loadingGlyph).toHaveCSS("height", "20px");
  await expect(loadingGlyph).toHaveCSS("mask-size", "120%");
  await expect(loadingGlyph).toHaveCSS("animation-duration", "0.8s");
  await expect(loadingGlyph).toHaveCSS("mask-image", /button-loading\.png/);
  await expect(button.locator('[data-slot="icon"]')).toHaveCount(0);
  expect((await button.boundingBox())?.width).toBe(originalBox?.width);
  await clickUnavailableWithPointer(page, button);
  await button.press("Enter");
  await button.press("Space");
  await expect(page.getByTestId("icon-button-loading-status")).toContainText("触发 0 次");
  await expect(button).toBeFocused();

  await page.getByRole("checkbox", { name: "加载期间更新收藏结果" }).check();
  await page.getByRole("checkbox", { name: "加载中", exact: true }).uncheck();
  await expect(button.locator('[data-icon="icon/favorite-filled"]')).toBeVisible();
  await button.click();
  await expect(page.getByTestId("icon-button-loading-status")).toContainText("触发 1 次");
  await page.getByRole("checkbox", { name: "操作不可用" }).check();
  await page.getByRole("checkbox", { name: "加载中", exact: true }).check();
  await expect(button).toBeDisabled();
  await expect(loadingGlyph).toBeVisible();
  await expectToken(button, "color", "--rain-category-icon-neutral-5");
  await clickUnavailableWithPointer(page, button);
  await expect(page.getByTestId("icon-button-loading-status")).toContainText("触发 1 次");

  const selectedDisabledLoading = page.getByRole("button", { name: "浅底高亮 禁用并加载", exact: true });
  await expect(selectedDisabledLoading).toBeDisabled();
  await expectToken(selectedDisabledLoading, "background-color", "--rain-category-fill-brand-alpha-4");
  await expectToken(selectedDisabledLoading, "color", "--rain-category-icon-neutral-5");
  await expectToken(selectedDisabledLoading.locator('[data-slot="loading-indicator"]'), "background-color", "--rain-category-icon-neutral-5");
});

test("keyboard focus survives forced colors and reduced motion preserves a static loading glyph", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const first = page.getByRole("button", { name: "普通 可操作", exact: true });
  await first.focus();
  await page.keyboard.press("Tab");
  const loading = page.getByRole("button", { name: "普通 加载中", exact: true });
  await expect(loading).toBeFocused();
  await expect(loading).toHaveCSS("outline-width", "2px");
  await expect(loading).toHaveCSS("outline-offset", "2px");
  await expect(loading).toHaveCSS("outline-style", "solid");
  await expect(loading).toHaveCSS("box-shadow", "none");
  await expect(loading).toHaveCSS("transition-duration", "0s");
  const glyph = loading.locator('[data-slot="loading-indicator"]');
  await expect(glyph).toBeVisible();
  await expect(glyph).toHaveCSS("animation-name", "none");
  await expect(glyph).toHaveCSS("mask-image", /button-loading\.png/);
  expect(await glyph.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
});

test("filter state and panel state remain independent in all four real examples", async ({ page }) => {
  for (const [key, applied, open] of [["00", false, false], ["01", false, true], ["10", true, false], ["11", true, true]] as const) {
    const fixture = page.getByTestId(`icon-button-filter-${key}`);
    const button = fixture.getByRole("button", { name: "筛选课程" });
    await expect(button).toHaveAttribute("aria-expanded", String(open));
    await expect(button).not.toHaveAttribute("aria-pressed");
    await expect(button.locator(`[data-icon="icon/filter${applied ? "-filled" : ""}"]`)).toBeVisible();
    await expect(button).toHaveAttribute("data-highlight", open ? "surface" : applied ? "icon" : "none");
    const panel = page.locator(`#${await button.getAttribute("aria-controls")}`);
    if (open) await expect(panel).toBeVisible(); else await expect(panel).toBeHidden();
  }
  const fixture = page.getByTestId("icon-button-filter-11");
  const button = fixture.getByRole("button", { name: "筛选课程" });
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button.locator('[data-icon="icon/filter-filled"]')).toBeVisible();
  await expect(fixture.getByText("已筛选 · 已收起", { exact: true })).toBeVisible();
  await button.click();
  await fixture.getByRole("button", { name: "清除筛选" }).click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(button).toHaveAttribute("data-highlight", "surface");
  await expect(button.locator('[data-icon="icon/filter"]')).toBeVisible();
});

test("embedded actions appear for keyboard users and remain independent of their host", async ({ page }) => {
  const row = page.getByTestId("icon-button-table-row");
  const action = row.getByRole("button", { name: "编辑第一章" });
  await row.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(action).toHaveCSS("opacity", "0");
  await row.hover();
  await expect(action).toHaveCSS("opacity", "1");
  await row.getByRole("cell", { name: "进行中", exact: true }).click();
  await expect(page.getByTestId("icon-button-row-status")).toHaveText("打开课程 1 次 · 编辑 0 次");
  await action.click();
  await expect(page.getByTestId("icon-button-row-status")).toHaveText("打开课程 1 次 · 编辑 1 次");
  await page.mouse.move(0, 0);
  await row.getByRole("button", { name: "高等数学 · 第一章", exact: true }).focus();
  await expect(action).toHaveCSS("opacity", "1");
  await page.keyboard.press("Tab");
  await expect(action).toBeFocused();
  await page.keyboard.press("Space");
  await expect(page.getByTestId("icon-button-row-status")).toHaveText("打开课程 1 次 · 编辑 2 次");

  const input = page.getByRole("textbox", { name: "课程关键词" });
  await input.fill("函数");
  await page.keyboard.press("Tab");
  await expect(input.locator('xpath=..').locator('[data-slot="clear-action"]')).toBeFocused();
  await page.keyboard.press("Tab");
  const search = page.getByRole("button", { name: "搜索课程", exact: true });
  await expect(search).toBeFocused();
  await expect(search).toHaveCSS("width", "24px");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("icon-button-input-status")).toHaveText("正在查看“函数”的演示结果");
  await expect(search).toBeFocused();
});
