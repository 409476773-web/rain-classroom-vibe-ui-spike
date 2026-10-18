import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";

const url = process.env.RAIN_V12_NEXT_URL ?? "http://127.0.0.1:5371";
const evidence = evidenceOutputPath("evidence/runtime/tooltip-classic/browser");
test.beforeAll(() => mkdirSync(evidence, { recursive: true }));
test.beforeEach(async ({ page }) => {
  await page.goto(`${url}/#token-first-g1-next`);
  await expect(page.getByRole("heading", { name: "提示与分区调节", exact: true })).toBeVisible();
});

test("Tooltip keeps labels, descriptions, hover, Escape and scoped theme", async ({ page }) => {
  const sample = page.getByRole("region", { name: "默认提示" });
  const trigger = sample.getByRole("button", { name: "成绩口径" });
  await trigger.hover();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toHaveText("仅统计已提交的作答，未作答不计入平均分。");
  await expect(trigger).toHaveAccessibleName("成绩口径");
  await expect(trigger).toHaveAccessibleDescription("仅统计已提交的作答，未作答不计入平均分。");
  await tooltip.hover();
  await expect(tooltip).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
  await page.mouse.move(0, 0);
  await trigger.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("tooltip")).toHaveCount(1);
  await expect(tooltip).toBeVisible();
  await expect(tooltip.locator("..")).toHaveAttribute("data-rain-theme", "light");
  await page.screenshot({ path: `${evidence}/tooltip-light.png`, fullPage: true });
  await page.getByRole("button", { name: "切换深色" }).click();
  await trigger.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("tooltip")).toHaveCount(1);
  await expect(tooltip).toBeVisible();
  await expect(tooltip.locator("..")).toHaveAttribute("data-rain-theme", "dark");
  await page.screenshot({ path: `${evidence}/tooltip-dark.png`, fullPage: true });
  const readings = [];
  for (const theme of ["light", "dark"]) {
    // Mutate the same inherited attribute while the popup stays open: tests the shared bridge.
    await page.locator('.g1').evaluate((node, value) => node.setAttribute('data-rain-theme', value), theme);
    await expect(tooltip.locator("..")).toHaveAttribute("data-rain-theme", theme);
    await expect(tooltip).toHaveCSS("background-color", "rgb(47, 53, 69)");
    await expect(tooltip).toHaveCSS("color", "rgb(255, 255, 255)");
    const pairs = await page.evaluate(() => {
      const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);
      return [
        { name: 'tooltip text', foreground: style('.rain-tooltip').color, background: style('.rain-tooltip').backgroundColor, minimum: 4.5 },
        { name: 'panel text', foreground: style('.g1-next-pane').color, background: style('.g1-next-split').backgroundColor, minimum: 4.5 },
        { name: 'support text', foreground: style('.g1-next-tip > p').color, background: style('.g1-next-tip').backgroundColor, minimum: 4.5 },
        { name: 'resize grip', foreground: style('.rain-g1-resizable-grip').backgroundColor, background: style('.rain-g1-resizable-handle').backgroundColor, minimum: 3 },
      ];
    });
    for (const pair of pairs) {
      const ratio = contrastRatio(pair.foreground, pair.background);
      readings.push({ theme, ...pair, ratio });
      expect(ratio, `${theme} ${pair.name}`).toBeGreaterThanOrEqual(pair.minimum);
    }
  }
  writeFileSync(`${evidence}/contrast.json`, JSON.stringify(readings, null, 2));
  const visual = await tooltip.evaluate(node => { const s = getComputedStyle(node); return { background: s.backgroundColor, color: s.color, font: s.fontSize, line: s.lineHeight, padding: s.padding, radius: s.borderRadius, border: s.borderWidth, shadow: s.boxShadow, width: node.getBoundingClientRect().width }; });
  expect(visual).toMatchObject({ background: 'rgb(47, 53, 69)', color: 'rgb(255, 255, 255)', font: '14px', line: '20px', padding: '7px 16px', radius: '6px', border: '0px', shadow: 'none' });
  expect(visual.width).toBeLessThanOrEqual(250);
  const baseWidth = await tooltip.evaluate(node => getComputedStyle(node).maxWidth);
  await page.getByRole('region', { name: '长文字换行' }).getByRole('button', { name: '成绩口径' }).press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('tooltip')).toHaveCount(1);
  await expect(tooltip).toContainText('切换班级后');
  expect(await tooltip.evaluate(node => getComputedStyle(node).maxWidth)).toBe(baseWidth);
  await page.getByRole('region', { name: '未改兄弟提示' }).getByRole('button', { name: '成绩口径' }).press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('tooltip')).toHaveCount(1);
  await expect(tooltip).toHaveText('仅统计已提交的作答，未作答不计入平均分。');
  expect(await tooltip.evaluate(node => getComputedStyle(node).maxWidth)).toBe(baseWidth);
});

test("Resizable supports pointer and keyboard bounds, reset and instance isolation", async ({ page }) => {
  const sample = page.getByRole("region", { name: "默认分区" });
  const separator = sample.getByRole("separator");
  const sibling = page.getByRole("region", { name: "未改兄弟分区" }).getByRole("separator");
  const initial = Number(await separator.getAttribute("aria-valuenow"));
  const unchanged = await sibling.getAttribute("aria-valuenow");
  await separator.focus();
  await separator.press("ArrowRight");
  await expect.poll(async () => Number(await separator.getAttribute("aria-valuenow"))).toBeGreaterThan(initial);
  await separator.press("End");
  expect(Number(await separator.getAttribute("aria-valuenow"))).toBeLessThanOrEqual(75);
  await separator.press("Home");
  expect(Number(await separator.getAttribute("aria-valuenow"))).toBeGreaterThanOrEqual(25);
  const box = (await separator.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 90, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();
  await expect.poll(async () => Number(await separator.getAttribute("aria-valuenow"))).toBeGreaterThan(25);
  await expect(sibling).toHaveAttribute("aria-valuenow", unchanged!);
  await sample.getByRole("button", { name: "恢复比例" }).click();
  await expect.poll(async () => Number(await separator.getAttribute("aria-valuenow"))).toBeCloseTo(initial, 0);
  const vertical = page.getByRole("region", { name: "上下分区" }).getByRole("separator");
  await expect(vertical).toHaveAttribute("aria-orientation", "horizontal");
  await vertical.focus();
  const before = Number(await vertical.getAttribute("aria-valuenow"));
  await vertical.press("ArrowDown");
  await expect.poll(async () => Number(await vertical.getAttribute("aria-valuenow"))).toBeGreaterThan(before);

  for (const theme of ["light", "dark"]) {
    await page.locator('.g1').evaluate((node, value) => node.setAttribute('data-rain-theme', value), theme);
    for (const region of [sample, page.getByRole("region", { name: "上下分区" })]) {
      const handle = region.getByRole("separator");
      await handle.evaluate(node => (node as HTMLElement).blur());
      await page.mouse.move(0, 0);
      const bounds = (await handle.boundingBox())!;
      expect(Math.min(bounds.width, bounds.height)).toBe(2);
      const idle = await handle.evaluate(node => getComputedStyle(node).backgroundColor);
      // Hit near the end, outside the central grip: the entire separator must respond.
      await handle.hover({ position: { x: 1, y: 1 } });
      const highlighted = await handle.evaluate(node => getComputedStyle(node).backgroundColor);
      expect(highlighted).not.toBe(idle);
      const grip = await handle.locator('.rain-g1-resizable-grip').evaluate(node => getComputedStyle(node).color);
      expect(contrastRatio(grip, highlighted)).toBeGreaterThanOrEqual(3);
      await region.screenshot({ path: `${evidence}/separator-${theme}-${await handle.getAttribute('aria-orientation')}-hover.png` });
      await page.mouse.down();
      await page.mouse.move(0, 0, { steps: 3 });
      await expect(handle).toHaveAttribute('data-separator', 'active');
      await expect(handle).toHaveCSS('background-color', highlighted);
      await page.mouse.up();
      await handle.evaluate(node => (node as HTMLElement).blur());
      await expect(handle).toHaveCSS('background-color', idle);
      await handle.press('ArrowRight');
      await expect(handle).toHaveCSS('background-color', highlighted);
      await handle.evaluate(node => (node as HTMLElement).blur());
    }
  }
});

test("Tooltip works within Dialog; layouts stay usable at narrow widths and forced colors", async ({ page }) => {
  await page.getByRole("button", { name: "弹窗内查看" }).click();
  const dialog = page.getByRole("dialog", { name: "评分说明" });
  await dialog.getByRole("button", { name: "切换主题" }).press("Shift+Tab");
  await expect(page.getByRole("tooltip")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toBeHidden();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "关闭说明" }).click();
  await expect(page.getByRole("button", { name: "弹窗内查看" })).toBeFocused();
  for (const width of [1440, 900, 390]) {
    await page.setViewportSize({ width, height: 950 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    for (const section of await page.locator('.g1-next-split').all()) {
      const bounds = (await section.boundingBox())!;
      const group = (await section.locator('[data-slot="resizable-panel-group"]').boundingBox())!;
      expect(group.y + group.height).toBeLessThanOrEqual(bounds.y + bounds.height);
      expect(group.height).toBeGreaterThanOrEqual(180);
    }
    const help = page.getByRole('region', { name: '默认提示' }).getByRole('button', { name: '成绩口径' });
    await help.press('Tab'); await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('tooltip')).toHaveCount(1);
    const tipBox = (await page.getByRole('tooltip').boundingBox())!;
    expect(tipBox.x).toBeGreaterThanOrEqual(0);
    expect(tipBox.x + tipBox.width).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `${evidence}/layout-${width}.png`, fullPage: true });
    await page.keyboard.press('Escape');
  }
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const separator = page.getByRole("region", { name: "默认分区" }).getByRole("separator");
  await separator.focus();
  await separator.press("ArrowRight");
  await expect(separator).toHaveCSS("outline-style", "solid");
  await page.getByRole('region', { name: '默认提示' }).getByRole('button', { name: '成绩口径' }).press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('tooltip')).toHaveCount(1);
  await expect(page.getByRole('tooltip')).toHaveCSS('border-width', '1px');
  await page.screenshot({ path: `${evidence}/forced-colors.png`, fullPage: true });
});

test("Classic Tooltip supports all placements, optional arrow, empty/disabled guards and controlled opening", async ({ page }) => {
  await page.getByText('查看方位与状态示例', { exact: true }).click();
  const grid = page.getByLabel('十二方位');
  for (const placement of ["top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-start", "bottom", "bottom-end", "left-start", "left", "left-end"]) {
    const trigger = grid.getByRole('button', { name: placement, exact: true });
    await trigger.scrollIntoViewIfNeeded();
    const positions = () => grid.getByRole('button').evaluateAll(nodes => nodes.map(node => { const b = node.getBoundingClientRect(); return [b.x, b.y, b.width, b.height]; }));
    const before = await positions();
    await trigger.press('Tab'); await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('tooltip')).toHaveCount(1);
    const tip = page.getByRole('tooltip');
    await expect(tip).toHaveText(`提示 · ${placement}`);
    expect(await positions()).toEqual(before);
    const box = (await tip.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0); expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(1440);
    const arrow = tip.locator('[data-slot="arrow"]');
    const side = await arrow.getAttribute('data-side');
    const geometry = (await arrow.boundingBox())!;
    const horizontal = side === 'top' || side === 'bottom';
    expect([geometry.width, geometry.height]).toEqual(horizontal ? [14, 6] : [6, 14]);
    const align = await arrow.getAttribute('data-align');
    if (align === 'start') expect(horizontal ? geometry.x - box.x : geometry.y - box.y).toBeCloseTo(horizontal ? 16 : 7, 1);
    if (align === 'end') expect(horizontal ? box.x + box.width - geometry.x - geometry.width : box.y + box.height - geometry.y - geometry.height).toBeCloseTo(horizontal ? 16 : 7, 1);
    if (['top-start', 'right-start'].includes(placement)) await page.screenshot({ path: `${evidence}/placement-${placement}.png`, fullPage: true });
    await page.keyboard.press('Escape');
  }
  await page.getByRole('button', { name: '无箭头', exact: true }).hover();
  await expect(page.getByRole('tooltip')).toHaveText('没有箭头的短说明');
  await expect(page.getByRole('tooltip').locator('[data-slot="arrow"]')).toHaveCount(0);
  await page.keyboard.press('Escape');
  for (const name of ['空内容', '禁用提示']) {
    await page.getByRole('button', { name, exact: true }).press('Tab'); await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('tooltip')).toHaveCount(0);
  }
  await page.getByRole('button', { name: '切换受控提示', exact: true }).click();
  await expect(page.getByRole('tooltip')).toHaveText('由页面控制打开与关闭');
  const trigger = page.getByRole('button', { name: '受控提示', exact: true });
  const triggerBox = (await trigger.boundingBox())!, tipBox = (await page.getByRole('tooltip').boundingBox())!;
  expect(Math.abs(tipBox.x + tipBox.width / 2 - triggerBox.x - triggerBox.width / 2)).toBeLessThan(30);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
});

test("Tooltip prefers below and flips only when the lower space is insufficient", async ({ page }) => {
  const trigger = page.getByRole('region', { name: '默认提示' }).getByRole('button', { name: '成绩口径' });
  await trigger.hover();
  const tip = page.getByRole('tooltip');
  await expect(tip).toHaveAttribute('data-side', 'bottom');
  const anchor = (await trigger.boundingBox())!;
  expect((await tip.boundingBox())!.y).toBeGreaterThan(anchor.y + anchor.height);
  await page.setViewportSize({ width: 1440, height: Math.ceil(anchor.y + anchor.height + 15) });
  await expect(tip).toHaveAttribute('data-side', 'top');
  await page.screenshot({ path: `${evidence}/bottom-fallback.png` });
  await page.setViewportSize({ width: 1440, height: 950 });
  await expect(tip).toHaveAttribute('data-side', 'bottom');
});
