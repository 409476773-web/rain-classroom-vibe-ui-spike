import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const evidence = fileURLToPath(new URL("../../evidence/runtime/g4-visual-refinement-2026-10-11/browser/", import.meta.url));
mkdirSync(evidence, { recursive: true });

test("catalog links focus G4 headings, copy usable examples and preserve adjacent documentation", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  for (const [id, title, code] of [
    ["typography", "Typography 文字排版", "rain-type-reading-default"],
    ["item", "Item 内容条目", "ItemContent"],
    ["progress", "Progress 任务进度", "ProgressLabel"],
  ]) {
    await page.goto("/#components");
    await page.getByRole("link", { name: title, exact: true }).click();
    await expect(page.locator(`#${id}-title`)).toBeFocused();
    await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
    await expect(page.getByText("已复制", { exact: true })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(code);
  }
  for (const id of ["accordion", "spinner", "sheet"]) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  }
});

test("three G4 pages expose examples, API, copyable code, themes and inherited density", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const id of ["typography", "item", "progress"]) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
    await expect(page.locator("pre code").last()).not.toBeEmpty();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-light.png`, fullPage: true });
    await page.getByRole("button", { name: "深色", exact: true }).click();
    await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
    await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme", "dark");
    if (id !== "typography") await expect(page.locator(`[data-rain-id="ui-${id}"][data-slot="root"]`).first()).toHaveAttribute("data-density", "compact");
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-dark-compact.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});

test("Typography uses existing measured roles and separates value from Chinese unit", async ({ page }, info) => {
  await page.goto("/#typography");
  const facts = await page.locator('[data-slot="typography-data-example"]').evaluate(root => {
    const measure = (selector: string) => {
      const node = root.querySelector<HTMLElement>(selector)!;
      const style = getComputedStyle(node);
      return { text: node.textContent, font: style.fontFamily, size: style.fontSize, line: style.lineHeight };
    };
    const reading = getComputedStyle(document.querySelector('[aria-label="课程导读示例"]')!);
    return { value: measure('[data-slot="value"]'), unit: measure('[data-slot="unit"]'), reading: { font: reading.fontFamily, size: reading.fontSize, line: reading.lineHeight }, dataFontCheck: document.fonts.check('36px "LINE Seed JP App_OTF"') };
  });
  expect(facts.value.size).toBe("36px");
  expect(facts.value.font).toContain("LINE Seed JP");
  expect(facts.unit.size).toBe("14px");
  expect(facts.unit.font).toContain("PingFang SC");
  expect(facts.unit.text).toBe("分");
  expect(facts.reading.size).toBe("15px");
  expect(facts.reading.line).toBe("26px");
  writeFileSync(`${evidence}/typography-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
});

test("Typography paragraphs keep the registered line heights on actual text nodes", async ({ page }, info) => {
  await page.goto("/#typography");
  await expect(page.locator("#typography-title")).toBeVisible();
  const facts = [];
  for (const [selector, line] of [
    ["p.rain-type-ui-default", "22px"],
    ["p.rain-type-ui-supporting", "20px"],
    ["p.rain-type-ui-caption", "20px"],
    ["article.rain-type-reading-default p", "26px"],
  ]) {
    const paragraphs = await page.locator(selector).evaluateAll(nodes => nodes.map(node => ({
      text: node.textContent,
      line: getComputedStyle(node).lineHeight,
    })));
    facts.push({ selector, expectedLine: line, paragraphs });
    expect.soft(paragraphs.length, `${selector} has visible examples`).toBeGreaterThan(0);
    for (const paragraph of paragraphs) expect.soft(paragraph.line, `${selector}: ${paragraph.text}`).toBe(line);
  }
  writeFileSync(`${evidence}/typography-${info.project.name}-paragraph-facts.json`, JSON.stringify(facts, null, 2));
});

test("Item preserves independent actions, disabled controls, full content and keyboard link navigation", async ({ page }, info) => {
  await page.goto("/#item");
  const first = page.locator('[data-rain-id="ui-item"][data-slot="root"]').first();
  const padding = await first.evaluate(node => getComputedStyle(node).paddingTop);
  expect(padding).toBe("16px");
  await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  expect(await first.evaluate(node => getComputedStyle(node).paddingTop)).toBe("12px");
  await page.getByRole("button", { name: "设为重点", exact: true }).click();
  await expect(page.getByRole("button", { name: "取消重点", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "查看详情", exact: true }).click();
  await expect(page.getByRole("heading", { name: "资料详情", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "等待发布", exact: true })).toBeDisabled();
  const list = page.getByRole("list", { name: "待阅读资料" });
  await expect(list.getByRole("listitem")).toHaveCount(2);
  const longTitle = list.locator('[data-slot="title"]').first();
  const text = await longTitle.evaluate(node => {
    const style = getComputedStyle(node);
    return { clamp: style.webkitLineClamp, width: node.clientWidth, scrollWidth: node.scrollWidth, overflowWrap: style.overflowWrap };
  });
  expect(text.clamp).toBe("none");
  expect(text.scrollWidth).toBeLessThanOrEqual(text.width + 1);
  expect(text.overflowWrap).toBe("anywhere");
  const link = page.getByRole("link", { name: /查看文字排版规范/ });
  await link.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(link).toBeFocused();
  expect(await link.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
  await page.screenshot({ path: `${evidence}/item-${info.project.name}-focused-link.png`, fullPage: true });
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#typography$/);
  await expect(page.locator("#typography-title")).toBeFocused();
});

test("Progress keeps actual quantities and external pause/error states", async ({ page }, info) => {
  await page.goto("/#progress");
  const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  await expect(bar).toHaveAttribute("aria-valuenow", "40");
  await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  await expect(bar).toHaveAttribute("aria-valuenow", "60");
  await page.getByRole("button", { name: "暂停同步", exact: true }).click();
  await expect(page.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  await expect(bar).toHaveAttribute("aria-valuenow", "60");
  await page.getByRole("button", { name: "继续同步", exact: true }).click();
  await page.getByRole("button", { name: "模拟失败", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "同步失败" })).toBeVisible();
  await expect(bar).toHaveAttribute("aria-valuenow", "60");
  await page.getByRole("button", { name: "重试同步", exact: true }).click();
  await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  await expect(bar).toHaveAttribute("aria-valuenow", "100");
  await expect(bar).toHaveAttribute("data-state", "complete");
  await page.getByRole("button", { name: "重新开始", exact: true }).click();
  await expect(bar).toHaveAttribute("aria-valuenow", "0");
  const unknown = page.getByRole("progressbar", { name: "正在解析资料", exact: true });
  await expect(unknown).not.toHaveAttribute("aria-valuenow");
  await expect(unknown.locator('[data-slot="progress-value"]')).toHaveCount(0);
  const quantity = page.getByRole("progressbar", { name: "批改任务", exact: true });
  await expect(quantity).toHaveAttribute("aria-valuenow", "6");
  await expect(quantity).toHaveAttribute("aria-valuemax", "24");
  await expect(quantity.locator('[data-slot="progress-value"]')).toHaveText("25%");
  const facts = await quantity.evaluate(root => {
    const track = root.querySelector('[data-slot="progress-track"]')!;
    const indicator = root.querySelector('[data-slot="progress-indicator"]')!;
    return { trackWidth: track.getBoundingClientRect().width, indicatorWidth: indicator.getBoundingClientRect().width, trackHeight: track.getBoundingClientRect().height };
  });
  expect(facts.indicatorWidth / facts.trackWidth).toBeCloseTo(0.25, 2);
  expect(facts.trackHeight).toBe(8);
  await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  expect(await quantity.locator('[data-slot="progress-track"]').evaluate(node => node.getBoundingClientRect().height)).toBe(6);
  writeFileSync(`${evidence}/progress-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
});

test("reduced motion and forced colors retain progress and native-link meaning", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await page.goto("/#progress");
  const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  const indicator = bar.locator('[data-slot="progress-indicator"]');
  expect(await indicator.evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  const paint = await indicator.evaluate(node => getComputedStyle(node).backgroundColor);
  const trackPaint = await bar.locator('[data-slot="progress-track"]').evaluate(node => getComputedStyle(node).backgroundColor);
  expect(paint).not.toBe(trackPaint);
  await page.screenshot({ path: `${evidence}/progress-${info.project.name}-forced-colors.png`, fullPage: true });
  await page.goto("/#item");
  const link = page.getByRole("link", { name: /查看文字排版规范/ });
  await link.focus();
  const colors = await link.evaluate(root => ({ root: getComputedStyle(root).color, title: getComputedStyle(root.querySelector('[data-slot="title"]')!).color, outline: getComputedStyle(root).outlineStyle }));
  expect(colors.title).toBe(colors.root);
  expect(colors.outline).toBe("solid");
  await page.screenshot({ path: `${evidence}/item-${info.project.name}-forced-colors.png`, fullPage: true });
});
