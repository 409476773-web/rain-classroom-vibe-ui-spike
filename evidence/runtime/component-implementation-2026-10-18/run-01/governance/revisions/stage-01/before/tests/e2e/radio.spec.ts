import { expect, test, type Locator } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const evidence = resolve(process.env.RAIN_RADIO_EVIDENCE_DIR ?? "evidence/runtime/radio");
test.beforeEach(async ({ page }) => {
  await page.goto("/#radio");
  await expect(page.getByRole("heading", { name: "Radio 单选框" })).toBeVisible();
});
test("native Tab, arrows, Space and labels keep groups independent and emit once", async ({ page }) => {
  const basic = page.getByRole("radiogroup", { name: "课程展示" });
  const title = basic.getByRole("radio", { name: "仅展示标题" }), summary = basic.getByRole("radio", { name: "展示标题和简介" });
  await title.focus(); await page.keyboard.press("Space");
  await expect(page.getByTestId("callback-count")).toHaveText("选择变化：0 次");
  await page.keyboard.press("ArrowDown");
  await expect(summary).toBeFocused(); await expect(summary).toBeChecked(); await expect(title).not.toBeChecked();
  await page.keyboard.press("Space");
  await expect(page.getByTestId("callback-count")).toHaveText("选择变化：1 次");
  await page.keyboard.press("Tab");
  const form = page.getByRole("form", { name: "发布方式表单" });
  await expect(form.getByRole("radio", { name: "立即发布" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(form.getByRole("radio", { name: "定时发布" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(form.getByRole("radio", { name: "立即发布" })).toBeFocused();
  await expect(summary).toBeChecked();
  await basic.getByText("适合快速浏览课程列表。").click();
  await expect(title).toBeChecked();
  await expect(page.getByTestId("callback-count")).toHaveText("选择变化：2 次");
});

test("canceled activation, canceled reset and default reset preserve native submitted state", async ({ page }) => {
  const form = page.getByRole("form", { name: "发布方式表单" });
  const scheduled = form.getByRole("radio", { name: "定时发布" }), now = form.getByRole("radio", { name: "立即发布" });
  await scheduled.evaluate((input) => input.addEventListener("click", (event) => event.preventDefault(), { once: true }));
  await form.getByText("在预定时间自动发布。").click();
  await expect(scheduled).not.toBeChecked(); await expect(now).toBeChecked();
  expect(await form.evaluate((node) => new FormData(node as HTMLFormElement).getAll("publish"))).toEqual(["now"]);
  await form.getByText("在预定时间自动发布。").click();
  await form.getByRole("button", { name: "读取表单值" }).click();
  await expect(page.getByTestId("submitted-values")).toHaveText("本次表单值：scheduled");
  expect(await form.evaluate((node) => {
    node.addEventListener("reset", (event) => event.preventDefault(), { once: true });
    (node as HTMLFormElement).reset(); return new FormData(node as HTMLFormElement).getAll("publish");
  })).toEqual(["scheduled"]);
  await expect(scheduled).toBeChecked();
  expect(await form.evaluate((node) => { (node as HTMLFormElement).reset(); return new FormData(node as HTMLFormElement).getAll("publish"); })).toEqual(["now"]);
  await expect(now).toBeChecked(); await expect(scheduled).not.toBeChecked();
});

test("native required validity, controlled reset and disabled fieldsets work together", async ({ page }) => {
  const form = page.getByRole("form", { name: "评价方式表单" });
  expect(await form.evaluate((node) => (node as HTMLFormElement).checkValidity())).toBe(false);
  await form.getByRole("button", { name: "保存评价方式" }).click();
  const input = form.getByRole("radio", { name: "分数评价" });
  await expect(input).toBeFocused(); await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByText("请先选择评价方式。")).toBeVisible();
  await page.keyboard.press("Space");
  expect(await form.evaluate((node) => (node as HTMLFormElement).checkValidity())).toBe(true);
  await form.getByRole("button", { name: "保存评价方式" }).click();
  await expect(form.getByRole("status")).toHaveText("评价方式已保存。");
  await form.getByRole("button", { name: "清空评价方式" }).click();
  await expect(input).not.toBeChecked();
  expect(await form.evaluate((node) => new FormData(node as HTMLFormElement).getAll("evaluation"))).toEqual([]);
  const disabled = page.getByRole("radiogroup", { name: "由管理员配置" });
  await disabled.getByText("定时发布", { exact: true }).click({ force: true });
  await expect(disabled.getByRole("radio", { name: "定时发布" })).toBeDisabled();
  await expect(disabled.getByRole("radio", { name: "立即发布" })).toBeChecked();
});

const paint = (label: Locator) => label.locator('[data-slot="control"]').evaluate((node) => {
  const css = getComputedStyle(node), root = node.closest("label")!;
  const canvas = getComputedStyle(node.parentElement!), halo = getComputedStyle(node.parentElement!, "::before");
  const title = getComputedStyle(root.querySelector('[data-slot="label"]')!);
  const description = root.querySelector('[data-slot="description"]');
  const dot = node.querySelector('[data-slot="mark"]');
  return { background: css.backgroundColor, border: css.borderColor, color: css.color, width: css.width, height: css.height,
    radius: css.borderRadius, line: css.borderWidth, outline: css.outline, shadow: css.boxShadow,
    canvasWidth: canvas.width, canvasHeight: canvas.height, haloBackground: halo.backgroundColor, haloWidth: halo.width, haloHeight: halo.height, haloRadius: halo.borderRadius, haloInset: halo.top,
    dot: dot ? { width: getComputedStyle(dot).width, height: getComputedStyle(dot).height, color: getComputedStyle(dot).backgroundColor } : null,
    title: { color: title.color, font: title.fontFamily, size: title.fontSize, lineHeight: title.lineHeight, weight: title.fontWeight },
    description: description ? { size: getComputedStyle(description).fontSize, lineHeight: getComputedStyle(description).lineHeight, weight: getComputedStyle(description).fontWeight } : null,
    surface: getComputedStyle(root.closest(".core-family")!).backgroundColor };
});

test("real Light and Dark states retain exact geometry, paints, fonts and native Focus", async ({ page }) => {
  mkdirSync(evidence, { recursive: true });
  await page.setViewportSize({ width: 1600, height: 1000 });
  const facts = [];
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    for (const name of ["仅展示标题", "展示标题和简介", "不可选择", "已选择且锁定"]) {
      const input = page.getByRole("radio", { name, exact: true }), label = input.locator("..");
      await page.mouse.move(0, 0);
      const normal = await paint(label), disabled = await input.isDisabled(), selected = await input.isChecked();
      expect([normal.width, normal.height, normal.radius, normal.line]).toEqual(["18px", "18px", "9999px", "1px"]);
      expect([normal.canvasWidth, normal.canvasHeight, normal.haloWidth, normal.haloHeight, normal.haloRadius, normal.haloInset])
        .toEqual(["24px", "24px", "23px", "23px", "9999px", "0.5px"]);
      expect(normal.title).toMatchObject({ size: "15px", lineHeight: "24px", weight: "600" });
      if (normal.description) expect(normal.description).toEqual({ size: "13px", lineHeight: "22px", weight: "400" });
      if (selected) expect(normal.dot).toMatchObject({ width: "6px", height: "6px", color: normal.color });
      expect(normal.surface).toBe(theme === "light" ? "rgb(255, 255, 255)" : "rgb(30, 36, 59)");
      await label.locator('[data-slot="content"]').hover();
      const hover = await paint(label);
      if (disabled) expect(hover).toEqual(normal);
      else {
        expect(hover.haloBackground).not.toBe(normal.haloBackground);
        expect(hover.title).toEqual(normal.title);
        if (selected) expect(hover.background).toBe(normal.background);
        else { expect(hover.background).toBe("rgba(0, 0, 0, 0)"); expect(hover.border).not.toBe(normal.border); }
      }
      await page.mouse.down(); const pressed = await paint(label);
      if (disabled) expect(pressed).toEqual(normal);
      else {
        expect(pressed.haloBackground).not.toBe(hover.haloBackground);
        if (selected) expect(pressed.background).not.toBe(normal.background);
      }
      await page.mouse.move(0, 0); await page.mouse.up();
      await expect(input).toBeChecked({ checked: selected });
      expect(await paint(label)).toEqual(normal);
      facts.push({ theme, name, selected, disabled, normal, hover, pressed });
    }
    await page.evaluate(() => getSelection()?.removeAllRanges());
    await page.screenshot({ path: resolve(evidence, `${theme}.png`), fullPage: true });
    const label = page.getByRole("radio", { name: "展示标题和简介", exact: true }).locator("..");
    await label.locator('[data-slot="description"]').hover();
    const section = page.locator('section[aria-labelledby="radio-basic-title"]');
    await section.screenshot({ path: resolve(evidence, `${theme}-hover.png`) });
    await page.mouse.down(); await page.evaluate(() => getSelection()?.removeAllRanges()); await section.screenshot({ path: resolve(evidence, `${theme}-pressed.png`) });
    await page.mouse.move(0, 0); await page.mouse.up();
    const input = label.getByRole("radio"); await input.focus(); await page.keyboard.down("Space");
    const keyboard = await paint(label);
    expect(keyboard.outline).not.toContain("none");
    expect(keyboard.haloBackground).not.toBe("rgba(0, 0, 0, 0)");
    await page.keyboard.up("Space"); await expect(input).toBeChecked();
    facts.push({ theme, name: "keyboard", selected: false, afterReleaseChecked: await input.isChecked(), disabled: false, normal: keyboard, hover: keyboard, pressed: keyboard });
    await page.reload();
  }
  const session = await page.context().newCDPSession(page);
  await session.send("DOM.enable"); await session.send("CSS.enable");
  const document = await session.send("DOM.getDocument");
  const node = await session.send("DOM.querySelector", { nodeId: document.root.nodeId, selector: '.rain-radio [data-slot="label"]' });
  const platformFonts = await session.send("CSS.getPlatformFontsForNode", { nodeId: node.nodeId });
  writeFileSync(resolve(evidence, "browser-facts.json"), JSON.stringify({ facts, platformFonts }, null, 2));
  await session.detach();
});

test("320px wrapping, both densities and system colors preserve a working circular control", async ({ page }) => {
  mkdirSync(evidence, { recursive: true });
  await page.setViewportSize({ width: 320, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(await page.locator('.rain-radio').evaluateAll((labels) => labels.every((label) => {
    const content = label.querySelector('[data-slot="content"]') as HTMLElement;
    return label.getBoundingClientRect().width <= label.parentElement!.getBoundingClientRect().width && content.scrollWidth <= content.clientWidth + 1;
  }))).toBe(true);
  await page.screenshot({ path: resolve(evidence, "narrow.png"), fullPage: true });
  await page.getByRole("button", { name: "紧凑密度" }).click();
  await expect(page.locator('.rain-radio').first()).toHaveAttribute("data-density", "compact");
  expect((await paint(page.locator('.rain-radio').first())).width).toBe("18px");
  await page.screenshot({ path: resolve(evidence, "compact.png"), fullPage: true });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const input = page.getByRole("radio", { name: "展示标题和简介", exact: true }), label = input.locator("..");
  await input.focus(); await page.keyboard.press("Space"); await expect(input).toBeChecked();
  const normal = await paint(label); expect(normal.outline).toContain("solid 2px"); expect(normal.dot?.color).not.toBe(normal.background);
  await label.hover(); expect((await paint(label)).background).toBe(normal.background);
  await page.mouse.down(); expect((await paint(label)).background).toBe(normal.background);
  await page.mouse.move(0, 0); await page.mouse.up();
  await page.evaluate(() => getSelection()?.removeAllRanges());
  await input.focus(); await page.keyboard.press("Space");
  await page.screenshot({ path: resolve(evidence, "forced-colors.png"), fullPage: true });
});

test("touch taps select once without sticky desktop hover", async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage(); await page.goto("/#radio");
    expect(await page.evaluate(() => matchMedia("(hover: hover)").matches)).toBe(false);
    const input = page.getByRole("radio", { name: "展示标题和简介", exact: true }), label = input.locator("..");
    const normal = await paint(label);
    await label.hover(); expect((await paint(label)).haloBackground).toBe(normal.haloBackground);
    await label.tap(); await expect(input).toBeChecked();
    await label.tap(); await expect(input).toBeChecked();
    // Chromium may keep native :active briefly after touch release (measured at about 150ms).
    await expect.poll(async () => (await paint(label)).haloBackground, { timeout: 1000 }).toBe(normal.haloBackground);
    await expect(page.getByTestId("callback-count")).toHaveText("选择变化：1 次");
  } finally { await context.close(); }
});
