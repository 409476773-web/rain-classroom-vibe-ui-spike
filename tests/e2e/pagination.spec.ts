import { expect, test } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";

for (const theme of ["light", "dark"] as const) test(`pagination sizes, paint and actual narrow container in ${theme}`, async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (["error", "warning"].includes(message.type())) errors.push(message.text()); });
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#pagination");
  await expect(page.getByRole("heading", { name: "Pagination 分页", exact: true })).toBeVisible();
  expect(await page.title()).not.toBe("");
  await expect(page.locator("vite-error-overlay")).toHaveCount(0);
  await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
  const basic = page.getByRole("navigation", { name: "基础分页", exact: true });
  const records = [];
  for (const size of [24, 28, 32]) {
    await page.getByRole("button", { name: `${size}px`, exact: true }).click();
    await expect(basic).toHaveAttribute("data-size", String(size));
    const current = basic.locator('[aria-current="page"]');
    const paint = await current.evaluate(node => {
      const css = getComputedStyle(node), box = node.getBoundingClientRect();
      let parent = node.parentElement!;
      while (parent.parentElement && getComputedStyle(parent).backgroundColor === "rgba(0, 0, 0, 0)") parent = parent.parentElement;
      return { height: box.height, width: box.width, fontSize: css.fontSize, lineHeight: css.lineHeight,
        radius: css.borderRadius, fontFamily: css.fontFamily, foreground: css.color, background: css.backgroundColor, parentBackground: getComputedStyle(parent).backgroundColor };
    });
    expect(paint.height).toBeCloseTo(size, 1);
    expect(paint.width).toBeGreaterThanOrEqual(size);
    expect(paint.fontSize).toBe(size === 24 ? "13px" : "14px");
    expect(paint.lineHeight).toBe(size === 24 ? "18px" : "22px");
    expect(paint.radius).toBe("6px");
    expect(paint.fontFamily).toContain("PingFang SC");
    records.push({ theme, size, ...paint, contrast: contrastRatio(paint.foreground, paint.background, paint.parentBackground) });
    const settings = page.getByRole("navigation", { name: "课程列表分页", exact: true }).getByRole("button", { name: "分页设置" });
    await settings.click();
    const popup = page.getByRole("dialog", { name: "分页设置" });
    const input = popup.getByRole("textbox", { name: "跳转到页码" });
    const submit = popup.getByRole("button", { name: "跳转", exact: true });
    expect((await popup.boundingBox())!.width).toBe(180);
    await expect(popup.getByText(/^共 \d+ 页$/)).toHaveCount(0);
    await expect(input).not.toHaveAttribute("aria-describedby");
    await expect(submit).toHaveText("跳转");
    await expect(submit).toHaveAttribute("data-variant", "text");
    await expect(submit).toHaveAttribute("data-tone", "brand");
    const fields = await popup.evaluate(node => {
      const input = node.querySelector('[data-rain-id="ui-input"]')!.getBoundingClientRect();
      const button = node.querySelector('button[data-rain-id="ui-button"]')!.getBoundingClientRect();
      return { inside: button.left >= input.left && button.right <= input.right && button.top >= input.top && button.bottom <= input.bottom,
        optionTops: Array.from(node.querySelectorAll('[role="group"] button'), button => button.getBoundingClientRect().top) };
    });
    expect(fields.inside).toBe(true);
    expect(new Set(fields.optionTops).size).toBe(1);
    await page.keyboard.press("Escape");
  }
  await page.locator('[data-rain-id="pagination-data-example"]').screenshot({ path: testInfo.outputPath(`${theme}-data.png`), animations: "disabled" });
  const links = page.getByRole("navigation", { name: "链接分页", exact: true });
  const expectedIconColor = theme === "light" ? "rgb(116, 133, 168)" : "rgb(136, 145, 173)";
  const iconRecords = [];
  for (const icon of [basic.getByRole("button", { name: "下一页", exact: true }), basic.getByRole("button", { name: /向后跳转至/ }),
    basic.getByRole("button", { name: "分页设置", exact: true }), links.getByRole("link", { name: "下一页", exact: true })]) {
    await expect(icon).toHaveCSS("color", expectedIconColor);
    await icon.hover();
    await expect(icon).toHaveCSS("color", theme === "light" ? "rgb(73, 93, 135)" : "rgb(183, 193, 224)");
    await page.mouse.down();
    const paint = await icon.evaluate(node => {
      const css = getComputedStyle(node); let parent = node.parentElement!;
      while (parent.parentElement && getComputedStyle(parent).backgroundColor === "rgba(0, 0, 0, 0)") parent = parent.parentElement;
      return { foreground: css.color, background: css.backgroundColor, parentBackground: getComputedStyle(parent).backgroundColor };
    });
    const contrast = contrastRatio(paint.foreground, paint.background, paint.parentBackground);
    expect(contrast).toBeGreaterThanOrEqual(3);
    iconRecords.push({ theme, name: await icon.getAttribute("aria-label"), state: "pressed", ...paint, contrast });
    await page.mouse.move(0, 0); await page.mouse.up();
  }
  writeFileSync(testInfo.outputPath(`${theme}-navigation-paint.json`), JSON.stringify(iconRecords, null, 2));
  const interactions = [];
  for (const [kind, target] of [
    ["current-button", basic.locator('[aria-current="page"]')],
    ["ordinary-button", basic.getByRole("button", { name: "第 2 页", exact: true })],
    ["current-link", links.locator('[aria-current="page"]')],
    ["ordinary-link", links.getByRole("link", { name: "第 2 页", exact: true })],
  ] as const) {
    await page.mouse.click(0, 0);
    await target.hover();
    const backgrounds = [];
    for (const state of ["hover", "pressed"] as const) {
      if (state === "pressed") await page.mouse.down();
      const paint = await target.evaluate(node => {
        const css = getComputedStyle(node);
        let parent = node.parentElement!;
        while (parent.parentElement && getComputedStyle(parent).backgroundColor === "rgba(0, 0, 0, 0)") parent = parent.parentElement;
        return { foreground: css.color, background: css.backgroundColor, parentBackground: getComputedStyle(parent).backgroundColor };
      });
      const contrast = contrastRatio(paint.foreground, paint.background, paint.parentBackground);
      if (kind === "current-link") expect(paint.foreground).toBe(records.at(-1)!.foreground);
      expect(contrast, `${theme} ${kind} ${state}`).toBeGreaterThanOrEqual(4.5);
      interactions.push({ theme, kind, state, ...paint, contrast });
      backgrounds.push(paint.background);
    }
    await page.mouse.move(0, 0); await page.mouse.up();
    expect(backgrounds[0], `${theme} ${kind} hover differs from pressed`).not.toBe(backgrounds[1]);
  }
  writeFileSync(testInfo.outputPath(`${theme}-interaction-paint.json`), JSON.stringify(interactions, null, 2));
  const settings = page.getByRole("navigation", { name: "课程列表分页", exact: true }).getByRole("button", { name: "分页设置" });
  await page.getByText("条数常驻", { exact: true }).click();
  const inlinePaint = await settings.evaluate(node => ({ width: node.getBoundingClientRect().width,
    number: getComputedStyle(node.querySelector('[data-slot="page-size-value"]')!).color,
    unit: getComputedStyle(node.querySelector('[data-slot="page-size-unit"]')!).color,
    numberFontSize: getComputedStyle(node.querySelector('[data-slot="page-size-value"]')!).fontSize,
    unitFontSize: getComputedStyle(node.querySelector('[data-slot="page-size-unit"]')!).fontSize }));
  expect(inlinePaint.width).toBeLessThan(90);
  expect(inlinePaint.number).not.toBe(inlinePaint.unit);
  expect(inlinePaint.number).toBe(theme === "light" ? "rgb(20, 35, 70)" : "rgb(239, 241, 245)");
  expect(inlinePaint.numberFontSize).toBe("14px");
  expect(inlinePaint.unitFontSize).toBe("13px");
  await settings.click();
  const popup = page.getByRole("dialog", { name: "分页设置" });
  await expect(popup).toBeVisible();
  expect(await popup.evaluate(node => node.closest('[data-rain-theme]')?.getAttribute('data-rain-theme'))).toBe(theme);
  await popup.screenshot({ path: testInfo.outputPath(`${theme}-settings.png`), animations: "disabled" });
  await page.keyboard.press("Escape");
  await page.getByText("条数常驻", { exact: true }).click();
  writeFileSync(testInfo.outputPath(`${theme}-inline-paint.json`), JSON.stringify(inlinePaint, null, 2));
  const slider = page.getByRole("slider", { name: "预览容器宽度" });
  await slider.focus(); await slider.press("Home");
  await expect(slider).toHaveValue("240");
  await expect(basic).toHaveAttribute("data-size", "32");
  await expect.poll(() => basic.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  const data = page.getByRole("navigation", { name: "课程列表分页", exact: true });
  const children = await data.locator('button:visible, input:not([aria-hidden="true"]):visible, [role=combobox]:visible').evaluateAll(nodes => nodes.map(node => {
    const parent = node.closest('[data-rain-id="ui-pagination"]')!.getBoundingClientRect(), box = node.getBoundingClientRect();
    return { left: box.left - parent.left, right: parent.right - box.right };
  }));
  expect(children.length).toBeGreaterThan(0);
  for (const child of children) { expect(child.left).toBeGreaterThanOrEqual(-1); expect(child.right).toBeGreaterThanOrEqual(-1); }
  await expect(basic.getByRole("button", { name: "下一页", exact: true })).toBeVisible();
  await basic.getByRole("button", { name: "下一页", exact: true }).click();
  await expect(page.locator('[data-rain-id="pagination-basic-example"] [data-slot="current-page"]')).toContainText("第 2 页");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-rain-id="pagination-data-example"]').screenshot({ path: testInfo.outputPath(`${theme}-narrow.png`), animations: "disabled" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Pagination 分页", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
  writeFileSync(testInfo.outputPath(`${theme}-paint.json`), JSON.stringify(records, null, 2));
});

test("default-width mobile entry, long numbers and forced-color focus", async ({ page }) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/#pagination");
    await expect(page.getByRole("slider", { name: "预览容器宽度" })).toHaveValue("1000");
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const roots = await page.locator('[data-rain-id="ui-pagination"]').evaluateAll(nodes => nodes.map(node => ({
      width: node.clientWidth, scroll: node.scrollWidth,
    })));
    for (const root of roots) expect(root.scroll).toBeLessThanOrEqual(root.width + 1);
  }
  await page.setViewportSize({ width: 1440, height: 1050 });
  const large = page.getByRole("navigation", { name: "大页码分页", exact: true });
  await expect(large).toHaveAttribute("data-presentation", "full");
  const current = large.locator('[aria-current="page"]');
  await expect(current).toHaveText("10000");
  const box = await current.boundingBox();
  expect(box!.width).toBeGreaterThan(box!.height);
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.keyboard.press("Tab"); await current.focus();
  await expect(current).toBeFocused();
  const focus = await current.evaluate(node => {
    const style = getComputedStyle(node);
    return { width: style.outlineWidth, style: style.outlineStyle, offset: style.outlineOffset };
  });
  expect(focus).toEqual({ width: "2px", style: "solid", offset: "2px" });
});

test("data proposals preserve records on failure, retry once and discard stale results", async ({ page }) => {
  await page.goto("/#pagination");
  const example = page.locator('[data-rain-id="pagination-data-example"]');
  const nav = page.getByRole("navigation", { name: "课程列表分页", exact: true });
  await expect(example.locator('[data-slot="data-range"]')).toHaveText("当前显示第 1–20 条");
  await page.getByText("模拟下次加载失败", { exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "模拟下次加载失败" })).toBeChecked();
  await nav.getByRole("button", { name: "下一页", exact: true }).click();
  await expect(example.locator('[data-slot="data-status"]')).toContainText("正在加载第 2 页");
  await expect(nav.locator('[aria-current="page"]')).toHaveText("1");
  await expect(example.locator('[data-slot="data-status"]')).toContainText("加载失败");
  await expect(example.locator('[data-slot="data-range"]')).toHaveText("当前显示第 1–20 条");
  await page.getByRole("button", { name: "重试", exact: true }).click();
  await expect(example.locator('[data-slot="data-status"]')).toContainText("已显示第 2 页");
  await expect(example.locator('[data-slot="data-range"]')).toHaveText("当前显示第 21–40 条");
  await page.getByRole("button", { name: "连续翻两页", exact: true }).click();
  await expect(example.locator('[data-slot="data-status"]')).toContainText("已显示第 4 页");
  await page.waitForTimeout(1000);
  await expect(example.locator('[data-slot="data-range"]')).toHaveText("当前显示第 61–80 条");
  await expect(page.locator('[data-rain-id="pagination-basic-example"] [data-slot="current-page"]')).toContainText("第 1 页");
});

test("single-line settings, jump validation, IME and keyboard focus", async ({ page }, testInfo) => {
  await page.goto("/#pagination");
  const basic = page.getByRole("navigation", { name: "基础分页", exact: true });
  const more = basic.getByRole("button", { name: "分页设置", exact: true });
  await expect(basic.getByRole("textbox")).toHaveCount(0);
  await more.click();
  const popup = page.getByRole("dialog", { name: "分页设置" });
  const jump = popup.getByRole("textbox", { name: "跳转到页码" });
  const height = (await basic.boundingBox())!.height;
  for (const value of ["1", "999", "abc", "1.5", "9007199254740992"]) {
    await jump.fill(value);
    expect((await basic.boundingBox())!.height).toBe(height);
  }
  await jump.press("Enter");
  await expect(jump).toHaveAttribute("aria-invalid", "true");
  await expect(popup.getByRole("alert")).toBeVisible();
  expect((await basic.boundingBox())!.height).toBe(height);
  await expect(basic.locator('[aria-current="page"]')).toHaveText("1");
  await popup.screenshot({ path: testInfo.outputPath("settings-error.png"), animations: "disabled" });
  await jump.fill("4");
  await jump.dispatchEvent("compositionstart");
  await jump.press("Enter");
  await expect(basic.locator('[aria-current="page"]')).toHaveText("1");
  await jump.dispatchEvent("compositionend");
  await jump.press("Tab");
  await expect(basic.locator('[aria-current="page"]')).toHaveText("1");
  await popup.getByRole("button", { name: "跳转", exact: true }).click();
  await expect(basic.locator('[aria-current="page"]')).toHaveText("4");
  await expect(popup).toHaveCount(0);
  await expect(more).toBeFocused();
  await more.press("Enter");
  await expect(popup).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(more).toBeFocused();
  const next = basic.getByRole("button", { name: "下一页", exact: true });
  await next.focus(); await next.press("Enter");
  await expect(basic.locator('[aria-current="page"]')).toHaveText("5");
  await expect(next).toBeFocused();
  const data = page.getByRole("navigation", { name: "课程列表分页", exact: true });
  const settings = data.getByRole("button", { name: "分页设置" });
  await settings.click();
  await popup.getByRole("button", { name: "每页 50 条", exact: true }).click();
  await expect(settings).toHaveAttribute("title", "每页 50 条；分页设置");
  await expect(popup).toHaveCount(0);
  await expect(settings).toBeFocused();
  await expect(page.locator('[data-rain-id="pagination-data-example"] [data-slot="data-range"]')).toHaveText("当前显示第 1–50 条");
  await page.getByText("条数常驻", { exact: true }).click();
  await expect(settings).toContainText("50");
  expect((await settings.boundingBox())!.width).toBeLessThan(90);
  await settings.click();
  await expect(popup.getByRole("button", { name: "每页 50 条" })).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 320, height: 844 });
  const slider = page.getByRole("slider", { name: "预览容器宽度" });
  await slider.focus(); await slider.press("Home");
  await expect(data).toHaveAttribute("data-presentation", "simple");
  const compactHeight = (await data.boundingBox())!.height;
  expect(compactHeight).toBe(32);
  await settings.click();
  await popup.getByRole("textbox").fill("5");
  await popup.getByRole("textbox").press("Enter");
  await expect(popup.getByRole("alert")).toHaveText("请输入 1–3 之间的整数页码");
  expect((await data.boundingBox())!.height).toBe(compactHeight);
  expect(await data.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  const popupBox = (await popup.boundingBox())!;
  expect(popupBox.x).toBeGreaterThanOrEqual(0);
  expect(popupBox.x + popupBox.width).toBeLessThanOrEqual(320);
});

test("empty, one page, unknown totals, large numbers and real links", async ({ page }) => {
  await page.goto("/#pagination");
  const empty = page.getByRole("navigation", { name: "零条分页", exact: true });
  await expect(empty).toContainText("共 0 条");
  await expect(empty).not.toContainText("1–0");
  const single = page.getByRole("navigation", { name: "单页分页", exact: true });
  await expect(single.getByRole("button", { name: "下一页", exact: true })).toHaveCount(0);
  await expect(single.getByRole("button", { name: "分页设置" })).toBeVisible();
  const unknown = page.getByRole("navigation", { name: "未知总数分页", exact: true });
  for (let count = 0; count < 4; count++) await unknown.getByRole("button", { name: "下一页", exact: true }).click();
  await expect(unknown.getByRole("button", { name: "下一页", exact: true })).toBeDisabled();
  await expect(unknown).not.toContainText("共");
  const disabled = page.getByRole("navigation", { name: "禁用分页", exact: true });
  await expect(disabled.getByRole("button", { name: "下一页", exact: true })).toBeDisabled();
  const links = page.getByRole("navigation", { name: "链接分页", exact: true });
  const destination = links.locator('a[href="?pagination-page=2#pagination"]').first();
  await destination.click();
  await expect(page).toHaveURL(/pagination-page=2#pagination$/);
  await expect(page.getByRole("navigation", { name: "链接分页", exact: true }).locator('[aria-current="page"]')).toHaveText("2");
});
