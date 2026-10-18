import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { colorRegistry } from "../../packages/foundations/src/color-registry";
import { contrastRatio } from "./color-contrast";

const evidence = process.env.RAIN_TOKEN_EVIDENCE_DIR ?? "evidence/runtime/token-foundations-v1";
const discoveryEvidence = process.env.RAIN_TOKEN_EVIDENCE_DIR ?? "evidence/runtime/tag-color-discovery/browser";
mkdirSync(evidence, { recursive: true });
mkdirSync(discoveryEvidence, { recursive: true });

test("legacy typography and complete presets consume the same font size and line height", async ({ page }) => {
  await page.goto("/#foundations");
  const legacy = page.locator('[data-rain-id="foundation-type-ui"] > .rain-type-ui').first();
  await expect(legacy).toHaveCSS("font-size", "14px");
  await expect(legacy).toHaveCSS("line-height", "22px");
  await page.evaluate(() => {
    document.documentElement.style.setProperty("--rain-font-size-14", "15px");
    document.documentElement.style.setProperty("--rain-line-height-22", "24px");
  });
  await expect(legacy).toHaveCSS("font-size", "15px");
  await expect(legacy).toHaveCSS("line-height", "24px");
  await page.getByRole("link", { name: "查看 Token 目录与完整排版方案" }).click();
  const preset = page.getByTestId("typography-live-preview");
  await expect(preset).toHaveCSS("font-size", "15px");
  await expect(preset).toHaveCSS("line-height", "24px");
  await page.evaluate(() => {
    document.documentElement.style.removeProperty("--rain-font-size-14");
    document.documentElement.style.removeProperty("--rain-line-height-22");
  });
  await expect(preset).toHaveCSS("font-size", "14px");
  await expect(preset).toHaveCSS("line-height", "22px");
});

test("line and geometry render their registered dimensions and keep the content recipe fixed", async ({ page }) => {
  await page.goto("/#token-foundations");
  await expect(page.getByRole("heading", { name: "Token 基础建设", exact: true })).toHaveCSS("font-size", "40px");
  const border = page.locator('[data-slot="line-border-sample"]');
  for (const width of ["1", "2", "3", "4", "5", "6"]) {
    await page.getByRole("combobox", { name: "线条粗细" }).selectOption(width);
    await expect(border).toHaveCSS("border-top-width", `${width}px`);
    await expect(page.locator('[data-slot="line-horizontal-sample"]')).toHaveCSS("height", `${width}px`);
    await expect(page.locator('[data-slot="line-vertical-sample"]')).toHaveCSS("width", `${width}px`);
  }
  await page.getByRole("combobox", { name: "线型" }).selectOption("dashed");
  await expect(border).toHaveCSS("border-top-style", "dashed");
  const divider = page.locator('[data-local-recipe="line-v1-content-divider"]');
  await expect(divider).toHaveCSS("height", "1px");
  await expect(divider).toHaveCSS("margin-top", "0px");
  await expect(page.getByRole("list", { name: "圆角选择" }).getByText("12px").locator("..")).toHaveCSS("border-radius", "12px");
  await expect(page.getByRole("list", { name: "间距选择" }).getByText("28px").locator("..").locator("div")).toHaveCSS("gap", "28px");
  await page.locator('[data-token-section="line"]').screenshot({ path: `${evidence}/line.png` });
  await page.locator('[data-token-section="geometry"]').screenshot({ path: `${evidence}/geometry.png` });
});

test("typography fields override the full preset in computed CSS and Equal resolves to the selected size", async ({ page }) => {
  await page.goto("/#token-foundations");
  const sample = page.getByTestId("typography-live-preview");
  await expect(sample).toHaveCSS("font-size", "14px");
  await expect(sample).toHaveCSS("line-height", "22px");
  await page.getByRole("combobox", { name: "字号", exact: true }).selectOption("16");
  await page.getByRole("combobox", { name: "行高", exact: true }).selectOption("32");
  await expect(sample).toHaveCSS("font-size", "16px");
  await expect(sample).toHaveCSS("line-height", "32px");
  await expect(sample).toHaveCSS("font-weight", "400");
  await page.getByRole("combobox", { name: "行高", exact: true }).selectOption("equal");
  await expect(sample).toHaveCSS("line-height", "16px");
  await page.getByRole("combobox", { name: "排版方案" }).selectOption("data-default");
  await expect(sample.locator('[data-slot="statistic-value"]')).toHaveCSS("font-weight", "700");
  await expect(sample.locator('[data-slot="statistic-unit"]')).toHaveCSS("font-weight", "400");
  await page.locator('[data-rain-id="token-typography-panel"]').screenshot({ path: `${evidence}/typography.png` });
  await page.getByRole("combobox", { name: "字号", exact: true }).selectOption("24");
  await page.getByRole("combobox", { name: "行高", exact: true }).selectOption("32");
  const value = sample.locator('[data-slot="statistic-value"]');
  for (const excluded of ["32", "36", "40"]) await expect(page.getByRole("combobox", { name: "字号", exact: true }).locator(`option[value="${excluded}"]`)).toHaveCount(0);
  for (const size of ["15", "14", "13", "12", "11", "10", "9", "28"]) {
    await page.getByRole("combobox", { name: "字号", exact: true }).selectOption(size);
    await expect(value).toBeVisible();
    await expect(value).toHaveCSS("font-size", `${size}px`);
    const lineHeight = Number(await page.getByRole("combobox", { name: "行高", exact: true }).inputValue());
    expect(lineHeight).toBeGreaterThanOrEqual(Number(size));
    expect(lineHeight).toBeLessThanOrEqual(2 * Number(size));
    await expect(value).toHaveCSS("line-height", `${lineHeight}px`);
    await expect(value).toHaveCSS("font-weight", "700");
  }
  await page.getByRole("combobox", { name: "字号", exact: true }).selectOption("14");
  await page.getByRole("combobox", { name: "行高", exact: true }).selectOption("20");
  await expect(value).toHaveCSS("line-height", "20px");
  await page.getByRole("combobox", { name: "行高", exact: true }).selectOption("equal");
  await expect(value).toHaveCSS("line-height", "14px");
  for (const presetName of ["ui-default", "reading-default"]) {
    await page.getByRole("combobox", { name: "排版方案" }).selectOption(presetName);
    await page.getByRole("combobox", { name: "字号", exact: true }).selectOption("40");
    await expect(sample).toHaveCSS("font-size", "40px");
  }
});

test("color facts display in scope and local Alpha replacement paints 20 percent without leaking", async ({ page }) => {
  await page.goto("/#token-foundations");
  await expect(page.locator('[data-slot="category-swatch"]')).toHaveCount(colorRegistry.length * 2);
  await expect(page.getByRole("button", { name: "Text/Neutral/1", exact: true }).locator('[data-slot="category-swatch"]')).toHaveCSS("background-color", "rgb(20, 35, 70)");
  await expect(page.locator('[data-slot="original-fill"]')).toHaveCSS("background-color", "rgba(80, 117, 254, 0.16)");
  await expect(page.locator('[data-slot="derived-fill"]')).toHaveCSS("background-color", "rgba(80, 117, 254, 0.2)");
  const outside = await page.evaluate(() => {
    const node = document.createElement("div");
    node.className = "bg-rain-swatch-text-neutral-1 bg-rain-local-token-color-demo-highlight";
    node.dataset.slot = "derived-fill";
    document.body.append(node);
    const style = getComputedStyle(node);
    const result = { background: style.backgroundColor, width: style.width };
    node.remove();
    return result;
  });
  expect(outside.background).toBe("rgba(0, 0, 0, 0)");
  expect(outside.width).not.toBe("160px");
  const colorEvidence = process.env.RAIN_TOKEN_EVIDENCE_DIR ?? "evidence/runtime/color-family-supplement";
  mkdirSync(colorEvidence, { recursive: true });
  await page.locator('[data-rain-id="token-color-panel"]').screenshot({ path: `${colorEvidence}/colors.png` });
});

test("new Fill families preserve exact colors and preview only permitted foregrounds on the actual parent", async ({ page }) => {
  await page.goto("/#token-foundations");
  for (const [id, css] of [
    ["Text/Second/2", "rgb(55, 81, 167)"],
    ["Icon/Second/4", "rgb(145, 172, 234)"],
    ["Fill/Second/Solid/1", "rgb(55, 82, 171)"],
    ["Fill/Second/Alpha/1", "rgba(73, 118, 242, 0.18)"],
    ["Text/Orange/1", "rgb(221, 92, 0)"],
    ["Border/Orange/1", "rgb(247, 134, 0)"],
    ["Border/Green/1", "rgb(20, 191, 130)"],
    ["Fill/Green/Solid/2", "rgb(20, 181, 101)"],
    ["Icon/Red/1", "rgb(202, 39, 50)"],
    ["Fill/Red/Alpha/2", "rgba(243, 72, 72, 0.1)"],
  ] as const) {
    await expect(page.getByRole("button", { name: id, exact: true }).locator('[data-slot="category-swatch"]')).toHaveCSS("background-color", css);
  }

  const preview = page.getByRole("region", { name: "Fill 前景配对预览" });
  const textSelect = preview.getByRole("combobox", { name: "文字颜色" });
  const iconSelect = preview.getByRole("combobox", { name: "图标颜色" });
  for (const select of [textSelect, iconSelect]) {
    expect(await select.locator("option").evaluateAll((options) => options.map((option) => (option as HTMLOptionElement).value)))
      .toEqual(["OnColor/1", "OnColor/2", "OnColor/3", "OnColor/4", "OnColor/5"]);
  }
  await preview.getByRole("combobox", { name: "色系" }).selectOption("Red");
  await preview.getByRole("combobox", { name: "填充背景" }).selectOption("Fill/Red/Solid/3");
  await iconSelect.selectOption("Icon/Red/2");
  const sampleText = preview.locator('[data-slot="pairing-text"]');
  const sampleIcon = preview.locator('[data-slot="pairing-icon"] [data-rain-id="icon"]');
  await expect(sampleText).toHaveCSS("color", "rgb(202, 39, 50)");
  await expect(sampleText).toHaveCSS("font-size", "14px");
  await expect(sampleIcon).toHaveCSS("color", "rgb(243, 72, 72)");
  await expect(sampleIcon).toHaveCSS("background-color", "rgb(243, 72, 72)");
  await expect(sampleIcon).toHaveAttribute("data-icon", "icon/arrow-down");
  await expect(preview.getByRole("status")).toContainText("文字 4.80 : 1 · 满足 4.5 : 1");
  await expect(preview.getByRole("status")).toContainText("图标 3.17 : 1 · 满足 3 : 1");
  await preview.getByRole("combobox", { name: "填充背景" }).selectOption("Fill/Red/Alpha/2");
  await expect(preview.getByRole("status")).toContainText("文字 4.81 : 1 · 满足 4.5 : 1");
  await preview.getByRole("combobox", { name: "Alpha 父背景" }).selectOption("Background/Neutral/3");
  const backgrounds = preview.locator('[data-slot="pairing-background"]');
  await expect(backgrounds.nth(0)).toHaveCSS("background-color", "rgb(242, 244, 255)");
  await expect(backgrounds.nth(1)).toHaveCSS("background-color", "rgba(243, 72, 72, 0.1)");
  await expect(preview).toContainText("实际父背景：Background/Neutral/3");
  await expect(preview.getByRole("status")).toContainText("不足 4.5 : 1");
  await expect(preview.getByRole("status")).toContainText("仅作展示，不能作为已通过的组件方案");
  const colorEvidence = process.env.RAIN_TOKEN_EVIDENCE_DIR ?? "evidence/runtime/color-family-supplement";
  mkdirSync(colorEvidence, { recursive: true });
  await preview.screenshot({ path: `${colorEvidence}/preview.png` });

  await preview.getByRole("combobox", { name: "填充背景" }).selectOption("Fill/Red/Solid/2");
  await expect(textSelect).toHaveValue("OnColor/1");
  await expect(iconSelect).toHaveValue("OnColor/1");
  await expect(sampleText).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(sampleIcon).toHaveCSS("color", "rgb(255, 255, 255)");
  const outside = await page.evaluate(() => {
    const node = document.createElement("span");
    document.body.append(node);
    const baseline = getComputedStyle(node).color;
    node.className = "text-rain-swatch-text-red-1 text-rain-swatch-oncolor-1";
    const color = getComputedStyle(node).color;
    node.remove();
    return { baseline, color };
  });
  expect(outside.color).toBe(outside.baseline);
});

test("Dark colors use confirmed values and theme-aware Alpha pairing while Light stays unchanged", async ({ page }) => {
  await page.goto("/#token-foundations");
  for (const [id, css] of [
    ["Text/Neutral/1", "rgb(239, 241, 245)"],
    ["Fill/Neutral/Solid/2", "rgb(42, 48, 74)"],
    ["Border/Neutral/4", "rgba(194, 212, 255, 0.05)"],
    ["Fill/Neutral/Alpha/4", "rgba(86, 106, 181, 0.15)"],
    ["Fill/Brand/Alpha/3", "rgba(56, 96, 255, 0.3)"],
    ["OnColor/3", "rgba(255, 255, 255, 0.8)"],
  ] as const) {
    await expect(page.getByRole("button", { name: `Dark ${id}`, exact: true }).locator('[data-slot="category-swatch"]')).toHaveCSS("background-color", css);
  }
  const darkButton = page.getByRole("button", { name: "Dark Fill/Neutral/Solid/2", exact: true });
  await expect(darkButton.locator("xpath=ancestor::tr")).toHaveCSS("background-color", "rgb(30, 36, 59)");
  await expect(darkButton).toHaveCSS("color", "rgb(239, 241, 245)");
  await darkButton.click();
  const theme = page.getByRole("combobox", { name: "预览主题" });
  await expect(theme).toHaveValue("dark");
  const detail = page.getByRole("region", { name: "颜色详情" });
  await expect(detail).toContainText("rgb(42 48 74)");
  const preview = page.getByRole("region", { name: "Fill 前景配对预览" });
  await preview.getByRole("combobox", { name: "色系" }).selectOption("Red");
  await preview.getByRole("combobox", { name: "填充背景" }).selectOption("Fill/Red/Alpha/2");
  await preview.getByRole("combobox", { name: "图标颜色" }).selectOption("Icon/Red/2");
  await expect(preview.getByRole("status")).toContainText("文字 4.26 : 1 · 不足 4.5 : 1");
  await preview.getByRole("combobox", { name: "Alpha 父背景" }).selectOption("Background/Neutral/3");
  const backgrounds = preview.locator('[data-slot="pairing-background"]');
  const sampleText = preview.locator('[data-slot="pairing-text"]');
  const sampleIcon = preview.locator('[data-slot="pairing-icon"] [data-rain-id="icon"]');
  await expect(backgrounds.nth(0)).toHaveCSS("background-color", "rgb(21, 25, 43)");
  await expect(backgrounds.nth(1)).toHaveCSS("background-color", "rgba(243, 72, 72, 0.1)");
  await expect(sampleText).toHaveCSS("color", "rgb(245, 88, 88)");
  await expect(sampleIcon).toHaveCSS("color", "rgb(225, 56, 67)");
  await expect(preview.getByRole("status")).toContainText("文字 4.84 : 1 · 满足 4.5 : 1");
  await expect(preview.getByRole("status")).toContainText("图标 3.66 : 1 · 满足 3 : 1");
  await expect(page.locator('[data-slot="original-fill"]')).toHaveCSS("background-color", "rgba(80, 117, 254, 0.16)");
  await expect(page.getByRole("button", { name: "Text/Neutral/1", exact: true }).locator('[data-slot="category-swatch"]')).toHaveCSS("background-color", "rgb(20, 35, 70)");
  const darkEvidence = process.env.RAIN_TOKEN_EVIDENCE_DIR ?? "evidence/runtime/color-dark-theme";
  mkdirSync(darkEvidence, { recursive: true });
  await preview.screenshot({ path: `${darkEvidence}/dark-pairing.png` });
  await page.getByRole("table", { name: "Fill/Neutral/Solid", exact: true }).screenshot({ path: `${darkEvidence}/dark-neutral-solid.png` });
  await theme.selectOption("light");
  await expect(sampleText).toHaveCSS("color", "rgb(202, 39, 50)");
  await expect(backgrounds.nth(0)).toHaveCSS("background-color", "rgb(242, 244, 255)");
  await expect(preview.getByRole("combobox", { name: "图标颜色" })).toHaveValue("Icon/Red/2");
});

test("navigation focuses the new heading and mobile keeps overflow within comparison tables", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /^Token 基础建设/ }).click();
  await expect(page.getByRole("heading", { name: "Token 基础建设", exact: true })).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("color discovery supports keyboard search, repeated pairing navigation and narrow layouts", async ({ page }) => {
  await page.goto("/#token-foundations");
  const search = page.getByRole("searchbox", { name: "搜索颜色" });
  await search.fill("蓝紫");
  await search.press("Tab");
  const category = page.getByRole("combobox", { name: "颜色用途" });
  await expect(category).toBeFocused();
  await expect(category).toHaveCSS("outline-style", "solid");
  await category.selectOption("Fill");
  await expect(page.getByText("找到 4 个颜色 Token；每个同时展示 Light / Dark。")).toBeVisible();
  const choice = page.getByRole("button", { name: "Dark Fill/TagPurple/Alpha/1", exact: true });
  await choice.focus();
  await choice.press("Enter");
  await expect(choice).toHaveAttribute("aria-pressed", "true");
  const detail = page.getByRole("region", { name: "颜色详情" });
  await expect(detail).toContainText("bg-rain-category-fill-tagpurple-alpha-1");
  const openPreview = detail.getByRole("button", { name: "预览此色组配对" });
  await openPreview.click();
  const preview = page.getByRole("region", { name: "Fill 前景配对预览" });
  await expect(preview.getByRole("heading")).toBeFocused();
  await expect(preview).toContainText("文字用途校验：通过");
  await preview.getByRole("combobox", { name: "填充背景" }).selectOption("Fill/TagPurple/Alpha/2");
  await expect(preview).toContainText("文字用途校验：需补充条件");
  await expect(preview).toContainText("不作通用页面配对推荐");
  await preview.getByRole("combobox", { name: "色系" }).selectOption("TagGold");
  await openPreview.click();
  await expect(preview.getByRole("combobox", { name: "填充背景" })).toHaveValue("Fill/TagPurple/Alpha/1");
  await expect(preview.getByRole("heading")).toBeFocused();
  await preview.getByText("查看完整使用类名与条件", { exact: true }).click();
  await expect(preview).toContainText("text-rain-category-text-neutral-1");
  await preview.screenshot({ path: `${discoveryEvidence}/discovery-pairing.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await search.focus();
  const searchBox = (await search.boundingBox())!;
  const categoryBox = (await category.boundingBox())!;
  expect(searchBox.x + searchBox.width <= categoryBox.x || searchBox.y + searchBox.height <= categoryBox.y).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `${discoveryEvidence}/discovery-mobile.png` });
  await page.getByRole("button", { name: "清空筛选" }).click();
  await expect(page.locator('[data-slot="category-swatch"]')).toHaveCount(colorRegistry.length * 2);
  await search.fill("不存在的色组");
  await expect(page.getByText("没有匹配的颜色，请换一个色名、业务名称或 Token ID。")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("registered page-owned examples paint the actual Light and Dark parents with readable text and icons", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#token-foundations");
  const samples = page.getByRole("region", { name: "页面自有内容使用示例" });
  const measurements = [];
  for (const theme of ["light", "dark"] as const) {
    const sample = (part: string) => samples.locator(`[data-slot="discovery-${theme}-${part}"]`);
    await expect(sample("surface")).toHaveCSS("background-color", theme === "light" ? "rgb(255, 255, 255)" : "rgb(30, 36, 59)");
    await expect(sample("fill")).toHaveCSS("background-color", theme === "light" ? "rgba(114, 64, 231, 0.1)" : "rgba(142, 102, 236, 0.18)");
    await expect(sample("text")).toHaveCSS("color", theme === "light" ? "rgb(20, 35, 70)" : "rgb(239, 241, 245)");
    await expect(sample("icon")).toHaveCSS("color", theme === "light" ? "rgb(114, 64, 231)" : "rgb(157, 123, 239)");
    const rendered = await samples.evaluate((region, currentTheme) => {
      const style = (part: string) => getComputedStyle(region.querySelector(`[data-slot="discovery-${currentTheme}-${part}"]`)!);
      return { surface: style("surface").backgroundColor, fill: style("fill").backgroundColor, text: style("text").color, icon: style("icon").color };
    }, theme);
    const text = contrastRatio(rendered.text, rendered.fill, rendered.surface);
    const icon = contrastRatio(rendered.icon, rendered.fill, rendered.surface);
    expect(text).toBeGreaterThanOrEqual(4.5);
    expect(icon).toBeGreaterThanOrEqual(3);
    measurements.push({ theme, ...rendered, textContrast: text, iconContrast: icon });
  }
  expect(errors).toEqual([]);
  writeFileSync(`${discoveryEvidence}/discovery-measurements.json`, JSON.stringify({ measurements, errors }, null, 2) + "\n");
  await samples.screenshot({ path: `${discoveryEvidence}/discovery-page-examples.png` });
});
