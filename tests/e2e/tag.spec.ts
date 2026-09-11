import { writeFileSync } from "node:fs";
import { expect, test, type Locator } from "@playwright/test";
import { resolveColor, tagColorProfiles, type ColorTheme } from "../../packages/foundations/src/index";
import { getTagColorConsumers, measureTagColorRecipe } from "../../scripts/token-foundation-outputs.mjs";

const rgba = (css: string) => { const values = css.match(/[\d.]+/g)!.map(Number); return { rgb: values.slice(0, 3), alpha: values[3] ?? 1 }; };
const saveEvidence = process.env.RAIN_UPDATE_TAG_EVIDENCE === "1";

test("Tag compound paint matches real browser pixels across appearances and action states", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/#tag");
  const recipes = getTagColorConsumers().colorRecipeConsumers[0]!.recipes;
  const samples: object[] = [];
  async function sample(target: Locator, expected: number[], context: object) {
    const png = await target.screenshot();
    const pixels = await page.evaluate(async (base64) => {
      const image = new Image(); image.src = `data:image/png;base64,${base64}`; await image.decode();
      const canvas = document.createElement("canvas"); canvas.width = image.width; canvas.height = image.height;
      const context = canvas.getContext("2d")!; context.drawImage(image, 0, 0);
      return {
        background: [...context.getImageData(3, Math.floor(image.height / 2), 1, 1).data].slice(0, 3),
        edge: [...context.getImageData(Math.floor(image.width / 2), 0, 1, 1).data].slice(0, 3),
      };
    }, png.toString("base64"));
    const actual = pixels.background;
    samples.push({ ...context, actual, expected, borderPixel: pixels.edge });
    for (const channel of [0, 1, 2]) expect(Math.abs(actual[channel]! - expected[channel]!), JSON.stringify({ ...context, actual, expected })).toBeLessThanOrEqual(2);
    return pixels.edge;
  }
  for (const theme of ["light", "dark"]) for (const color of ["paper", "neutral"]) for (const appearance of ["filled", "outlined", "solid"]) {
    await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme);
    await page.getByRole("combobox", { name: "交互示例配色" }).selectOption(color);
    await page.getByRole("combobox", { name: "交互示例外观" }).selectOption(appearance);
    const recipe = recipes.find(({ id }) => id === `tag-${color}-${appearance}`)!;
    const choice = page.getByRole("checkbox", { name: "可选分类" }).locator("..");
    await choice.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
    let borderPixel: number[] | undefined;
    for (const state of ["default", "hover", "pressed"]) {
      if (state === "hover") await choice.hover();
      if (state === "pressed") await page.mouse.down();
      const paint = measureTagColorRecipe(recipe, theme, "Background/Neutral/1", state);
      const edge = await sample(choice, paint.background.rgb, { theme, color, appearance, state });
      if (appearance === "outlined" && borderPixel) expect(edge).toEqual(borderPixel);
      borderPixel = edge;
    }
    await page.mouse.move(0, 0); await page.mouse.up();
    const disabled = page.locator('[data-rain-id="ui-tag"]').filter({ hasText: "已锁定" });
    await sample(disabled, measureTagColorRecipe(recipe, theme, "Background/Neutral/1", "disabled").background.rgb, { theme, color, appearance, state: "disabled" });
    const close = page.locator(`[data-tag-size="24"] [data-appearance="${appearance}"] [data-slot="remove-action"]`);
    await close.hover();
    for (const state of ["close-hover", "close-pressed"]) {
      if (state === "close-pressed") await page.mouse.down();
      await sample(close, measureTagColorRecipe(recipe, theme, "Background/Neutral/1", state).background.rgb, { theme, color, appearance, state });
    }
    await page.mouse.move(0, 0); await page.mouse.up();
  }
  if (saveEvidence) writeFileSync("evidence/runtime/tag-batch-one/paint-samples.json", JSON.stringify({ source: "Chromium screenshot pixels from the actual #tag page", tolerance: 2, samples }, null, 2) + "\n");
});

test("Tag paints all source profiles, complete sizes and an isolated Light scope", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#tag");
  await expect(page.getByRole("heading", { name: "Tag 标签", exact: true })).toBeVisible();
  for (const theme of ["light", "dark"] as ColorTheme[]) {
    await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme);
    expect(rgba(await page.locator("#tag-title").evaluate((element) => getComputedStyle(element).color))).toEqual(resolveColor("Text/Neutral/1", theme));
    expect(rgba(await page.getByTestId("tag-light-island").evaluate((element) => getComputedStyle(element).color))).toEqual(resolveColor("Text/Neutral/1", "light"));
    for (const surface of ["1", "2", "3"]) {
      await page.getByRole("combobox", { name: "标签所在底色" }).selectOption(surface);
      const samples = await page.locator('[data-profile] [data-rain-id="ui-tag"]').evaluateAll((elements) => elements.map((element) => {
        const css = getComputedStyle(element);
        return { profile: element.getAttribute("data-color")!, appearance: element.getAttribute("data-appearance")!, text: css.color, background: css.backgroundColor, border: css.borderTopColor, weight: css.fontWeight, parent: getComputedStyle(element.closest(".tag-page__samples")!).backgroundColor };
      }));
      expect(samples).toHaveLength(60);
      for (const sample of samples) {
        const family = tagColorProfiles[sample.profile as keyof typeof tagColorProfiles].family;
        expect(rgba(sample.text), `${theme}/${sample.profile}/${sample.appearance}`).toEqual(resolveColor(sample.appearance === "solid" ? "OnColor/1" : `Text/${family}/1`, theme));
        expect(rgba(sample.parent)).toEqual(resolveColor(`Background/Neutral/${surface}`, theme));
        expect(sample.weight).toBe(sample.appearance === "solid" ? "700" : "400");
        if (sample.appearance === "outlined") { expect(rgba(sample.background).alpha).toBe(0); expect(rgba(sample.border)).toEqual(resolveColor(`Border/${family}/1`, theme)); }
        else { expect(rgba(sample.background)).toEqual(resolveColor(`Fill/${family}/${sample.appearance === "solid" ? "Solid" : "Alpha"}/1`, theme)); expect(rgba(sample.border).alpha).toBe(0); }
      }
    }
    await page.getByRole("combobox", { name: "标签所在底色" }).selectOption("1");
    await page.screenshot({ fullPage: true, path: saveEvidence ? `evidence/runtime/tag-batch-one/${theme}.png` : testInfo.outputPath(`${theme}.png`) });
  }
  const island = page.getByTestId("tag-light-island").locator('[data-rain-id="ui-tag"][data-appearance="filled"]');
  expect(rgba(await island.evaluate((element) => getComputedStyle(element).color))).toEqual(resolveColor("Text/TagPaper/1", "light"));
  const dimensions = await page.locator('[data-tag-size] [data-rain-id="ui-tag"]').evaluateAll((tags) => tags.map((tag) => {
    const css = getComputedStyle(tag), close = tag.querySelector('[data-slot="remove-action"]')!, icon = close.querySelector(".rain-icon")!;
    const content = tag.querySelector('[data-slot="content"]')!, box = close.getBoundingClientRect(), contentBox = content.getBoundingClientRect();
    const rootBox = tag.getBoundingClientRect();
    return { size: tag.getAttribute("data-size"), height: css.height, font: css.fontSize, line: css.lineHeight, padding: css.paddingLeft, close: [box.width, box.height], icon: [icon.getBoundingClientRect().width, icon.getBoundingClientRect().height], extraGap: box.left + parseFloat(getComputedStyle(close, "::after").left) - contentBox.right, inset: [box.top - rootBox.top, rootBox.bottom - box.bottom] };
  }));
  for (const item of dimensions) expect(item).toEqual({ size: item.size, height: `${item.size}px`, font: item.size === "20" ? "12px" : "13px", line: item.size === "20" ? "14px" : "18px", padding: item.size === "20" ? "6px" : item.size === "24" ? "8px" : "12px", close: [Number(item.size) - 2, Number(item.size) - 2], icon: item.size === "20" ? [12, 12] : [14, 14], extraGap: 0, inset: [1, 1] });
  const longSection = page.locator('[aria-labelledby="tag-long-title"]');
  const long = longSection.locator(".tag-page__long [data-slot=label]");
  expect(await long.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await page.getByText("查看完整名称", { exact: true }).focus(); await page.keyboard.press("Enter");
  await expect(longSection.locator("details[open] p")).toBeVisible();
});

test("native selection, link actions, removal focus and form values remain independent", async ({ page }) => {
  await page.goto("/#tag");
  const radioGroup = page.getByRole("radiogroup", { name: "资源类型" });
  await radioGroup.getByRole("radio", { name: "全部" }).focus(); await page.keyboard.press("ArrowRight");
  await expect(radioGroup.getByRole("radio", { name: "试卷" })).toBeChecked();
  await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  await expect(radioGroup.getByRole("radio", { name: "全部" })).toBeChecked();
  await page.keyboard.press("Enter"); await expect(radioGroup.getByRole("radio", { name: "全部" })).toBeChecked();
  const choice = page.getByRole("checkbox", { name: "可选分类" }), root = choice.locator("..");
  await expect(root.locator('[data-slot="selection-mark"]')).toHaveCount(0);
  await choice.focus(); await page.keyboard.press("Space");
  await expect(root.locator('[data-slot="label"] + [data-slot="selection-mark"]')).toHaveCount(1);
  const multiple = page.getByRole("group", { name: "资源筛选" });
  await multiple.getByRole("checkbox", { name: "作业" }).locator("..").click();
  await expect(multiple.getByRole("checkbox", { name: "作业" })).toBeChecked();
  await page.getByRole("button", { name: "提交筛选" }).click(); await expect(page.getByTestId("tag-action-status")).toHaveText("已提交 paper、assignment");
  const link = page.locator('[data-rain-id="ui-link-tag"]').filter({ has: page.getByRole("link", { name: "第三章课件", exact: true }) });
  await link.getByRole("button", { name: "移除标签 第三章课件" }).click();
  await expect(page.getByTestId("tag-action-status")).toHaveText("已移除链接标签");
  await expect(page.getByRole("button", { name: "恢复链接标签" })).toBeFocused();
  await page.getByRole("button", { name: "恢复链接标签" }).click();
  await expect(page.getByRole("link", { name: "第三章课件", exact: true })).toBeFocused();
  const external = page.getByRole("link", { name: /^学堂在线\s*（新标签页打开）$/ });
  await expect(external).toHaveAttribute("rel", "noopener noreferrer"); await expect(external).toHaveAttribute("target", "_blank");
  const collection = page.getByRole("region", { name: "管理标签" });
  await collection.getByRole("button", { name: "移除标签 期末复习" }).click();
  await expect(collection.getByRole("button", { name: "移除标签 第三章课件" })).toBeFocused();
  await collection.getByRole("button", { name: "撤销移除" }).click();
  await expect(collection.getByRole("button", { name: "移除标签 期末复习" })).toBeFocused();
});

test("Tag pointer feedback and keyboard Focus preserve the shared rules including forced colors", async ({ page }) => {
  await page.goto("/#tag");
  const choice = page.getByRole("checkbox", { name: "可选分类" }), root = choice.locator(".."), overlay = root.locator('[data-slot="interaction-overlay"]');
  await root.hover(); await expect(overlay).toHaveCSS("opacity", "0.12");
  await page.mouse.down(); await expect(overlay).toHaveCSS("opacity", "0.18"); await page.mouse.up();
  await choice.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
  await expect(root).toHaveCSS("outline-width", "1px"); await expect(root).toHaveCSS("outline-offset", "0px");
  expect(await root.evaluate((element) => getComputedStyle(element).boxShadow)).toContain("0px 0px 0px 3px");
  await page.emulateMedia({ forcedColors: "active" });
  await expect(root).toHaveCSS("outline-width", "2px"); await expect(root).toHaveCSS("box-shadow", "none");
  await expect(overlay).not.toBeVisible();
  const selectedMark = page.getByRole("radio", { name: "全部", exact: true }).locator("..").locator('[data-slot="selection-mark"]');
  expect(await selectedMark.locator(".rain-icon").evaluate((icon) => getComputedStyle(icon).color)).toBe(await selectedMark.evaluate((mark) => getComputedStyle(mark).color));
  const disabled = page.locator('[data-rain-id="ui-tag"]').filter({ hasText: "已锁定" });
  await expect(disabled).toHaveCSS("opacity", "1");
});

test("Tag action targets fit each size without overflowing or overlapping navigation", async ({ page }) => {
  await page.goto("/#tag");
  for (const size of [20, 24, 28]) {
    await page.getByRole("combobox", { name: "交互示例尺寸" }).selectOption(String(size));
    const link = page.getByRole("link", { name: "第三章课件", exact: true });
    const root = link.locator(".."), close = root.getByRole("button", { name: "移除标签 第三章课件" });
    await root.scrollIntoViewIfNeeded();
    const rootBox = (await root.boundingBox())!, mainBox = (await link.boundingBox())!, closeBox = (await close.boundingBox())!;
    expect(rootBox.height).toBe(size);
    expect([mainBox.y, mainBox.height]).toEqual([rootBox.y + 1, size - 2]);
    expect([closeBox.y, closeBox.width, closeBox.height]).toEqual([rootBox.y + 1, size - 2, size - 2]);
    expect(closeBox.x - 3).toBe(mainBox.x + mainBox.width);
    await close.hover();
    expect(await close.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
    const target = await close.evaluate((element) => {
      const rect = element.getBoundingClientRect(), css = getComputedStyle(element, "::after");
      return css.content === "none" ? { width: rect.width, height: rect.height } : { width: parseFloat(css.width), height: parseFloat(css.height) };
    });
    expect(target).toEqual({ width: size + 4, height: size + 4 });
    await page.mouse.click(closeBox.x + closeBox.width / 2, rootBox.y - 4);
    await expect(link).toBeVisible();
    await link.focus(); await page.keyboard.press("Tab"); await expect(close).toBeFocused();
    await expect(close).toHaveCSS("outline-width", "1px");
    const choice = page.getByRole("checkbox", { name: "可选分类" });
    await expect(choice.locator("..")).toHaveCSS("height", `${size}px`);
    await choice.locator("..").click(); await expect(choice).toBeChecked();
    await choice.locator("..").click(); await expect(choice).not.toBeChecked();
    await close.scrollIntoViewIfNeeded();
    const hitBox = (await close.boundingBox())!;
    await page.mouse.click(hitBox.x - 2, hitBox.y + hitBox.height / 2);
    await expect(link).toHaveCount(0);
    await page.getByRole("button", { name: "恢复链接标签" }).click();
  }
});

test("Tag selection marks are smaller and lighter across sizes, appearances and themes", async ({ page }) => {
  await page.goto("/#tag");
  for (const theme of ["light", "dark"]) {
    await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme);
    for (const size of [20, 24, 28]) {
      await page.getByRole("combobox", { name: "交互示例尺寸" }).selectOption(String(size));
      for (const appearance of ["filled", "outlined", "solid"]) {
        await page.getByRole("combobox", { name: "交互示例外观" }).selectOption(appearance);
        for (const input of [page.getByRole("radio", { name: "全部", exact: true }), page.getByRole("checkbox", { name: "试卷", exact: true })]) {
          const mark = input.locator("..").locator('[data-slot="selection-mark"]');
          await expect(mark).toHaveCSS("width", size === 20 ? "10px" : "12px");
          await expect(mark).toHaveCSS("height", size === 20 ? "10px" : "12px");
          await expect(mark).toHaveCSS("opacity", "1");
          expect(await mark.locator(".rain-icon").evaluate((icon) => getComputedStyle(icon).color)).toMatch(/\/ 0\.9\)$/);
          await expect(mark.locator(".rain-icon")).toHaveCSS("width", size === 20 ? "10px" : "12px");
          await expect(input).toBeChecked();
        }
      }
    }
  }
});

test.describe("touch", () => {
  test.use({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });
  test("keeps the page within 360px and separates expanded vertical action targets", async ({ page }, testInfo) => {
    await page.goto("/#tag");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    const choice = page.getByRole("checkbox", { name: "可选分类" }), root = choice.locator("..");
    await root.scrollIntoViewIfNeeded();
    const box = await root.boundingBox();
    await page.touchscreen.tap(box!.x + box!.width / 2, box!.y - 8);
    await expect(choice).toBeChecked();
    await page.getByRole("combobox", { name: "交互示例尺寸" }).selectOption("20");
    const targets = await page.locator('.rain-checkable-tag, .rain-tag a.rain-tag__main, .rain-tag__remove:not(:disabled)').evaluateAll((labels) => labels.map((label) => {
      const rect = label.getBoundingClientRect(), css = getComputedStyle(label, "::after"), own = getComputedStyle(label);
      return { x: rect.x + parseFloat(own.borderLeftWidth) + parseFloat(css.left), y: rect.y + parseFloat(own.borderTopWidth) + parseFloat(css.top), width: parseFloat(css.width), height: parseFloat(css.height) };
    }));
    for (const target of targets) { expect(target.height).toBeGreaterThanOrEqual(44); expect(target.width).toBeGreaterThanOrEqual(24); }
    for (let i = 0; i < targets.length; i++) for (let j = i + 1; j < targets.length; j++) {
      const a = targets[i]!, b = targets[j]!;
      expect(a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height).toBe(false);
    }
    await page.screenshot({ fullPage: true, path: saveEvidence ? "evidence/runtime/tag-batch-one/compact.png" : testInfo.outputPath("compact.png") });
  });
});
