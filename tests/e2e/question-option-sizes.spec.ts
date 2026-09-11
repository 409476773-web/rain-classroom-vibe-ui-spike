import { expect, test } from "@playwright/test";

const sizes = [20, 24, 28, 32, 36, 40];
const fonts = [11, 12, 14, 15, 16, 18];
const leading = [16, 18, 20, 22, 24, 26];
const markers = [12, 12, 12, 12, 14, 14];

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/question-option-sizes.html");
  await expect(page.getByRole("heading", { level: 1, name: "题号与选项 · 六档尺寸对照" })).toBeVisible();
});

test("six sizes retain their geometry across density and theme, with feedback inside each target", async ({ page }) => {
  for (const size of sizes) {
    for (const kind of ["number", "selection", "feedback"]) {
      const components = page.getByTestId(`${kind}-size-${size}`).locator('[data-rain-id="ui-question-number"], [data-rain-id="ui-option-button"], [data-rain-id="ui-option-group"]');
      for (const component of await components.all()) {
        await expect(component).toHaveAttribute("data-size", String(size));
        await expect(component).not.toHaveAttribute("data-local-recipe");
      }
    }
  }
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", await page.getByRole("main").evaluate(node => getComputedStyle(node).color));
    for (const density of ["default", "compact"]) {
      await page.getByRole("combobox", { name: "密度", exact: true }).selectOption(density);
      const numbers = await page.locator('[data-testid^="number-size-"]').evaluateAll(columns => columns.map(column => {
        const root = column.querySelector<HTMLElement>('[data-rain-id="ui-question-number"]')!;
        const control = root.querySelector<HTMLElement>('[data-slot="control"]')!;
        const style = getComputedStyle(control);
        return [control.offsetWidth, control.offsetHeight, parseFloat(style.fontSize), parseFloat(style.lineHeight), root.offsetWidth, root.offsetHeight];
      }));
      const padding = density === "default" ? 12 : 8;
      expect(numbers).toEqual(sizes.map((size, i) => [size, size, fonts[i], leading[i], size + padding, size + padding]));
      for (const [i, size] of sizes.entries()) {
        const column = page.getByTestId("selection-size-" + size);
        await expect(column.locator('[data-slot="control"]').first()).toHaveCSS("width", size + "px");
        await expect(column.locator('[data-slot="control"] .rain-icon').first()).toHaveCSS("width", [12, 14, 16, 18, 20, 22][i] + "px");
        await expect(page.getByTestId("feedback-size-" + size).locator('[data-slot="feedback"]').first()).toHaveCSS("width", markers[i] + "px");
        await expect(page.getByTestId("feedback-size-" + size).locator('[data-slot="feedback"] .rain-icon').first()).toHaveCSS("width", [8, 8, 8, 8, 10, 10][i] + "px");
        await expect(page.getByTestId("feedback-size-" + size).locator('[data-icon="icon/grading-pending"]').first()).toHaveCSS("width", markers[i] + "px");
      }
      const contained = await page.locator('.rain-question-number:has(> [data-slot="feedback"])').evaluateAll(roots => roots.every(root => {
        const target = root.getBoundingClientRect(), marker = root.querySelector('[data-slot="feedback"]')!.getBoundingClientRect();
        return marker.left >= target.left && marker.right <= target.right && marker.bottom <= target.bottom;
      }));
      expect(contained).toBe(true);
      const feedbackTargets = await page.locator('[data-testid^="feedback-size-"]').evaluateAll(columns => columns.map(column => {
        const root = column.querySelector<HTMLElement>('[data-rain-id="ui-question-number"]')!;
        return [root.offsetWidth, root.offsetHeight];
      }));
      expect(feedbackTargets).toEqual(density === "default"
        ? [[32, 34], [36, 36], [40, 40], [44, 44], [48, 49], [52, 53]]
        : [[28, 32], [32, 34], [36, 38], [40, 42], [44, 47], [48, 51]]);
      await expect(page.getByTestId("number-size-20").locator('[data-shape="square"] [data-slot="control"]').first()).toHaveCSS("border-radius", "4px");
      await expect(page.getByTestId("selection-size-20").getByRole("group", { name: "20px 多选", exact: true }).locator('[data-slot="control"]').first()).toHaveCSS("border-radius", "4px");
      expect(await page.getByTestId("feedback-size-20").locator('.rain-question-number').first().evaluate(root => {
        const control = root.querySelector('[data-slot="control"]')!.getBoundingClientRect();
        const marker = root.querySelector('[data-slot="feedback"]')!.getBoundingClientRect();
        return marker.top + marker.height / 2 - control.bottom;
      })).toBe(2);
      await page.screenshot({ path: test.info().outputPath(`${theme}-${density}.png`), fullPage: true });
    }
  }
});

test("real selection and keyboard focus survive public sizes and target display", async ({ page }) => {
  await page.getByLabel("显示点击范围", { exact: true }).check();
  const numbers = page.getByTestId("number-size-28").getByRole("group", { name: "28px 普通题号", exact: true });
  await numbers.getByRole("button", { name: "第 100 题", exact: true }).press("Enter");
  await expect(numbers.getByRole("button", { name: "第 100 题", exact: true })).toHaveAttribute("aria-current", "step");
  await expect(numbers.getByRole("button", { name: "第 100 题", exact: true })).toHaveCSS("outline-style", "solid");
  const single = page.getByRole("radiogroup", { name: "28px 单选", exact: true });
  await single.getByRole("radio", { name: "A", exact: true }).press("ArrowRight");
  const selected = single.getByRole("radio", { name: "B", exact: true });
  await expect(selected).toBeChecked();
  await expect(selected).toBeFocused();
  await expect(single.locator('[data-checked="true"]')).toHaveCSS("outline-style", "solid");
  await single.locator('[data-checked="true"]').click();
  await expect(selected).toBeChecked();
  const multiple = page.getByRole("group", { name: "28px 多选", exact: true });
  await multiple.getByRole("checkbox", { name: "C", exact: true }).press("Space");
  await expect(multiple.getByRole("checkbox", { name: "C", exact: true })).not.toBeChecked();
  const density = page.getByRole("combobox", { name: "密度", exact: true });
  await density.press("Tab");
  const appearance = page.getByRole("combobox", { name: "未选选项", exact: true });
  await expect(appearance).toBeFocused();
  await expect(appearance).toHaveCSS("outline-width", "1px");
  await page.emulateMedia({ forcedColors: "active" });
  await expect(appearance).toHaveCSS("outline-width", "2px");
  await expect(appearance).toHaveCSS("box-shadow", "none");
});

test("text and image rows keep their content alignment, font and single selection target", async ({ page }) => {
  const content = page.getByTestId("size-review-content");
  await expect(page.getByRole("combobox", { name: "编号尺寸", exact: true })).toHaveValue("28");
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const size of [20, 28, 40]) {
      await page.getByRole("combobox", { name: "编号尺寸", exact: true }).selectOption(String(size));
      for (const row of await content.locator('[data-rain-id="ui-option-button"]').all()) {
        await expect(row.locator("input")).toHaveCount(1);
        await expect(row.locator('[data-slot="control"]')).toHaveCSS("width", size + "px");
        await expect(row.locator('[data-slot="content"]')).toHaveCSS("font-size", "15px");
      }
      const aligned = await content.locator('[data-layout="card"]').evaluateAll(rows => rows.every(row => {
        const text = row.querySelector('[data-slot="content"]')!.getBoundingClientRect();
        const image = row.querySelector<HTMLImageElement>("img")!;
        const media = image.getBoundingClientRect();
        return image.complete && image.naturalWidth > 0 && Math.abs(text.left - media.left) < 1 && media.top > text.top;
      }));
      expect(aligned).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
  const image = content.getByRole("img", { name: "直线从左下方向右上方匀速上升" });
  await image.click();
  await expect(page.getByRole("radiogroup", { name: "图文选项", exact: true }).getByRole("radio", { name: /^A/ })).toBeChecked();
  await image.click();
  await expect(page.getByRole("radiogroup", { name: "图文选项", exact: true }).getByRole("radio", { name: /^A/ })).toBeChecked();
  await page.locator('[aria-labelledby="size-review-content-title"]').screenshot({ path: test.info().outputPath("mobile-content.png") });
});
