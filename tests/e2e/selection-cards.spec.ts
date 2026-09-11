import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { measureColorContrast } from "../../packages/foundations/src/color-registry";

const evidence = resolve(process.env.RAIN_SELECTION_CARDS_EVIDENCE_DIR ?? "evidence/runtime/selection-cards");
const color = (value: string) => {
  const n = value.match(/[\d.]+/g)!.map(Number), scale = value.startsWith("color(srgb") ? 255 : 1;
  return { rgb: [n[0]! * scale, n[1]! * scale, n[2]! * scale] as const, alpha: (n[3] ?? 1) / (value.includes("%") ? 100 : 1) };
};
const over = (value: ReturnType<typeof color>, base: ReturnType<typeof color>): ReturnType<typeof color> => ({ rgb: value.rgb.map((n, i) => n * value.alpha + base.rgb[i]! * (1 - value.alpha)) as unknown as readonly [number, number, number], alpha: 1 });
const painted = (backgrounds: string[]) => backgrounds.reduceRight((base, value) => over(color(value), base), color("rgb(255, 255, 255)"));
async function capture(page: Page, name: string, target?: Locator) {
  await page.evaluate(() => window.getSelection()?.removeAllRanges());
  await (target ?? page.locator(".selection-cards-page__families")).screenshot({ path: resolve(evidence, name) });
}
async function cardFacts(page: Page) {
  return page.locator(".rain-selection-card").evaluateAll((cards) => cards.map((card) => {
    const input = card.querySelector("input")!, canvas = card.querySelector<HTMLElement>('[data-slot="canvas"]')!, control = card.querySelector<HTMLElement>('[data-slot="control"]')!;
    const r = card.getBoundingClientRect(), box = (selector: string) => { const b = card.querySelector(selector)?.getBoundingClientRect(); return b ? { x: b.x - r.x, y: b.y - r.y, width: b.width, height: b.height } : null; };
    const backgrounds = (element: Element | null) => {
      const result = [];
      for (let node = element; node; node = node.parentElement) {
        const style = getComputedStyle(node);
        // The selected card adds a uniform Alpha/4 layer above its opaque base.
        if (node.classList.contains("rain-selection-card") && style.backgroundImage !== "none") result.push(style.getPropertyValue("--rain-category-fill-brand-alpha-4").trim());
        result.push(style.backgroundColor);
      }
      return result;
    };
    const css = getComputedStyle(card), shape = getComputedStyle(control), label = card.querySelector<HTMLElement>(`[id="${input.getAttribute("aria-labelledby")}"]`)!;
    const labelRange = document.createRange(); labelRange.selectNodeContents(label);
    const leaves = card.querySelectorAll<HTMLElement>('[data-slot="label"], [data-slot="description"], [data-slot="supporting-value"], [data-slot="detail-key"], [data-slot="detail-value"], [data-slot="metadata"] > span, [data-slot="actions"] > span, .rain-selection-card__identity, .rain-selection-card__accent, .rain-selection-card__recommendation');
    return { name: label.textContent, type: input.type, checked: input.checked, mixed: input.indeterminate, indeterminatePseudo: input.matches(":indeterminate"), disabled: input.matches(":disabled"),
      width: r.width, height: r.height, scrollWidth: card.scrollWidth, clientWidth: card.clientWidth,
      border: css.borderColor, background: css.backgroundColor, backgroundImage: css.backgroundImage, radius: css.borderRadius, cardBackgrounds: backgrounds(card),
      canvas: box('[data-slot="canvas"]')!, content: box('[data-slot="content"]')!, label: { ...box(`[id="${input.getAttribute("aria-labelledby")}"]`), textRight: labelRange.getBoundingClientRect().right - r.x, font: getComputedStyle(label).fontFamily, size: getComputedStyle(label).fontSize, weight: getComputedStyle(label).fontWeight },
      description: box('[data-slot="description"]'), labelEnd: box('[data-slot="label-end"]'), media: box('[data-slot="media"]'), actions: box('[data-slot="actions"]'),
      actionContent: card.querySelector('[data-slot="actions"]')?.firstElementChild?.getBoundingClientRect().x,
      actionOffset: card.querySelector('[data-slot="actions"]')?.firstElementChild ? card.querySelector('[data-slot="actions"]')!.firstElementChild!.getBoundingClientRect().x - r.x : null,
      control: { background: shape.backgroundColor, border: shape.borderColor, color: shape.color, width: shape.width, height: shape.height, outline: shape.outline, outlineColor: shape.outlineColor },
      halo: getComputedStyle(canvas, "::before").backgroundColor,
      text: Array.from(leaves).map((node) => ({ text: node.textContent, color: getComputedStyle(node).color, backgrounds: backgrounds(node) })),
    };
  }));
}
test.beforeEach(async ({ page }) => {
  mkdirSync(evidence, { recursive: true });
  await page.goto("/#selection-cards");
  await expect(page.getByRole("heading", { name: "选择卡片", exact: true })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
});

test("card content uses one native input transition and preserves Radio keyboard behavior", async ({ page }) => {
  const layouts = page.getByRole("radiogroup", { name: "工作台布局" });
  const report = layouts.getByRole("radio", { name: "双栏报告" });
  await report.locator("..").locator("img").click();
  await expect(report).toBeChecked(); await expect(page.getByTestId("card-changes")).toHaveText("选择变化：1 次");
  await report.locator("..").locator('[data-slot="metadata"]').click();
  await expect(page.getByTestId("card-changes")).toHaveText("选择变化：1 次");
  await report.focus(); await page.keyboard.press("ArrowUp");
  await expect(layouts.getByRole("radio", { name: "列表工作台" })).toBeChecked();
  await expect(layouts.getByRole("radio", { name: "列表工作台" })).toBeFocused();
  await page.keyboard.press("Space"); await expect(page.getByTestId("card-changes")).toHaveText("选择变化：2 次");
  const course = page.getByRole("group", { name: "选择课程", exact: true }).getByRole("checkbox", { name: "电路原理" });
  await course.locator("..").locator('[data-slot="supporting-value"]').click(); await expect(course).toBeChecked();
  await course.focus(); await page.keyboard.press("Space"); await expect(course).not.toBeChecked();
  await expect(page.getByTestId("card-changes")).toHaveText("选择变化：4 次");
});

test("preview actions stay independent, Tab reachable and available for disabled selection", async ({ page }) => {
  const group = page.getByRole("radiogroup", { name: "评分模板", exact: true });
  const selected = group.getByRole("radio", { name: "实验报告量规" });
  const first = group.getByRole("button", { name: "查看预览：实验报告量规" }), second = group.getByRole("button", { name: "查看预览：课程项目量规" });
  await selected.focus(); await page.keyboard.press("Tab"); await expect(first).toBeFocused();
  await page.keyboard.press("Tab"); await expect(second).toBeFocused();
  await page.keyboard.press("ArrowDown"); await expect(selected).toBeChecked();
  await page.keyboard.press("Enter"); await expect(page.getByTestId("card-preview-status")).toContainText("课程项目量规");
  await expect(page.locator('input[name="template"][value="lab"]')).toBeChecked(); await expect(page.getByTestId("card-changes")).toHaveText("选择变化：0 次");
  await expect(page.getByTestId("card-form-values")).toHaveText("表单值：尚未读取");
  await expect(page.getByRole("dialog", { name: "课程项目量规" })).toBeVisible();
  await page.getByRole("button", { name: "关闭预览" }).click();
  await expect(second).toBeFocused();
  await expect(selected).toBeChecked();
  const disabled = page.getByRole("radio", { name: "当前不可选择", exact: true });
  await disabled.locator("..").click({ force: true }); await expect(disabled).not.toBeChecked();
  await page.getByRole("button", { name: "查看预览：当前不可选择" }).click();
  await expect(page.getByTestId("card-preview-status")).toContainText("当前不可选择");
  expect(await page.locator('.rain-selection-card label button, .rain-selection-card label a, .rain-selection-card label label').count()).toBe(0);
});

test("composed native forms submit only selected enabled values and reset without extra callbacks", async ({ page }) => {
  const form = page.getByRole("form", { name: "选择卡片示例" });
  await form.getByRole("radio", { name: "双栏报告" }).locator("..").click();
  await form.getByRole("checkbox", { name: "电路原理" }).locator("..").click();
  await form.getByRole("radio", { name: "课程项目量规" }).locator("..").click();
  await form.getByRole("button", { name: "读取表单值" }).click();
  await expect(page.getByTestId("card-form-values")).toHaveText('表单值：{"layout":["report"],"course":["physics","circuits"],"method":["rubric"],"template":["project"]}');
  await form.getByRole("button", { name: "恢复默认选择" }).click();
  await expect(form.getByRole("radio", { name: "列表工作台" })).toBeChecked();
  await expect(form.getByRole("checkbox", { name: "电路原理" })).not.toBeChecked();
  await expect(form.getByRole("radio", { name: "实验报告量规" })).toBeChecked();
  await expect(page.getByTestId("card-changes")).toHaveText("选择变化：0 次");
});

test("retains reference geometry, exact long titles, artwork ratio and 320px wrapping", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  const facts = await cardFacts(page), base = facts.slice(0, 8);
  expect(base.map((card) => Math.round(card.width))).toEqual([296, 296, 612, 612, 296, 296, 612, 612]);
  for (const card of facts) {
    expect(card.canvas.x).toBe(16); expect(card.canvas.y).toBe(16); expect(card.content.x).toBe(48);
    expect(card.label.font).toContain('PingFang SC'); expect(card.label.weight).toBe("600");
    expect(card.scrollWidth).toBeLessThanOrEqual(card.clientWidth + 1);
    if (card.media) expect(card.media.width / card.media.height).toBeCloseTo(7 / 3, 2);
    if (card.actionOffset !== null) {
      expect(card.label.x).toBe(100); expect(card.actionOffset).toBe(48);
      if (card.labelEnd && card.label.height === 24) expect(card.labelEnd.x - card.label.textRight).toBeCloseTo(8, 2);
    }
  }
  for (const index of [0, 1]) expect(base[index]!.height).toBeCloseTo(231.4286, 1);
  for (const index of [2, 3]) expect(base[index]!.height).toBe(108);
  for (const index of [4, 5]) expect(base[index]!.height).toBe(208);
  for (const index of [6, 7]) expect(base[index]!.height).toBe(148);
  const long = facts.find((card) => card.name === "按小组项目的阶段成果、个人贡献与过程材料进行综合评价")!;
  expect(long.label.height).toBeGreaterThan(24); expect(long.height).toBeGreaterThan(208);
  const narrow = await page.locator('.selection-cards-page__narrow').evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().width));
  expect(narrow).toEqual([320, 320]);
  const selected = page.getByRole('radiogroup', { name: '评分方式', exact: true }).getByRole('radio', { name: '直接评分' });
  const before = await selected.locator('..').boundingBox(); await selected.locator('..').click(); const after = await selected.locator('..').boundingBox();
  expect(after).toEqual(before);
  await page.setViewportSize({ width: 320, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  for (const card of await cardFacts(page)) expect(card.scrollWidth).toBeLessThanOrEqual(card.clientWidth + 1);
  await capture(page, "narrow.png", page.locator("main"));
});

test("Light and Dark paints use current themed border with readable layered text and native feedback", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  const all = [];
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    await page.mouse.move(1, 1);
    await page.locator('.rain-selection-card button').evaluateAll((buttons) => Promise.all(buttons.flatMap((button) => button.getAnimations()).map((animation) => animation.finished)));
    const facts = await cardFacts(page);
    const host = page.locator('.selection-cards-page__families .core-family').first();
    for (const level of [2, 3]) {
      await host.evaluate((node, value) => { (node as HTMLElement).style.backgroundColor = `var(--rain-category-background-neutral-${value})`; }, level);
      const changed = await cardFacts(page);
      expect(changed.slice(0, 2).map((card) => painted(card.cardBackgrounds))).toEqual(facts.slice(0, 2).map((card) => painted(card.cardBackgrounds)));
    }
    await host.evaluate((node) => (node as HTMLElement).style.removeProperty('background-color'));
    const brandBorder = await page.locator('main').evaluate((node) => getComputedStyle(node).getPropertyValue('--rain-category-border-brand-1').trim());
    const neutralBorder = await page.locator('main').evaluate((node) => getComputedStyle(node).getPropertyValue('--rain-category-border-neutral-3').trim());
    expect(facts.some((card) => card.type === 'radio' && card.indeterminatePseudo && !card.checked)).toBe(true);
    for (const card of facts) {
      if (card.checked || card.mixed) expect(color(card.border)).toEqual(color(brandBorder));
      else { expect(color(card.border)).toEqual(color(neutralBorder)); expect(card.backgroundImage).toBe('none'); }
      if (card.disabled) continue;
      for (const text of card.text) expect(measureColorContrast(color(text.color), painted(text.backgrounds)), `${theme} ${card.name}: ${text.text}`).toBeGreaterThanOrEqual(4.5);
      const background = painted(card.cardBackgrounds);
      if (card.checked || card.mixed) expect(measureColorContrast(color(card.control.color), over(color(card.control.background), background))).toBeGreaterThanOrEqual(3);
      else expect(measureColorContrast(color(card.control.border), background)).toBeGreaterThanOrEqual(3);
    }
    await capture(page, `${theme}.png`); all.push({ theme, state: 'normal', cards: facts });
    const target = page.getByRole('radiogroup', { name: '工作台布局' }).getByRole('radio', { name: '双栏报告' }).locator('..');
    await target.hover(); await capture(page, `${theme}-hover.png`); all.push({ theme, state: 'hover', cards: await cardFacts(page) });
    const box = (await target.boundingBox())!; await page.mouse.move(box.x + 17, box.y + 18); await page.mouse.down();
    await capture(page, `${theme}-pressed.png`); all.push({ theme, state: 'pressed', cards: await cardFacts(page) });
    await page.mouse.move(1, 1); await page.mouse.up();
    const group = page.getByRole('radiogroup', { name: '工作台布局' });
    await group.getByRole('radio', { name: '列表工作台' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(group.getByRole('radio', { name: '双栏报告' })).toBeChecked();
    await expect(target.locator('[data-slot="control"]')).toHaveCSS('outline-style', 'solid');
    all.push({ theme, state: 'focus', cards: await cardFacts(page) });
    await page.keyboard.press('ArrowLeft');
  }
  writeFileSync(resolve(evidence, 'browser-facts.json'), JSON.stringify({ browser: test.info().project.name, viewport: { width: 1600, height: 1100 }, states: all }, null, 2));
});

test("compact density and forced colors retain the control, independent action and keyboard Focus", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  await page.getByRole('button', { name: '紧凑密度', exact: true }).click();
  const facts = await cardFacts(page);
  for (const card of facts) expect(card.control.width).toBe(card.type === 'checkbox' ? '16px' : '18px');
  await capture(page, 'compact.png');
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  const input = page.getByRole('radiogroup', { name: '工作台布局' }).getByRole('radio', { name: '列表工作台' });
  await input.focus(); await page.keyboard.press('ArrowRight');
  const selected = page.getByRole('radio', { name: '双栏报告', exact: true });
  await expect(selected).toBeChecked(); await expect(selected).toBeFocused();
  const control = selected.locator('..').locator('[data-slot="control"]');
  await expect(control).toHaveCSS('outline-style', 'solid'); await expect(control).toHaveCSS('outline-width', '2px');
  await capture(page, 'forced-colors.png');
});

test("touch selects once and leaves the preview action independent", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage(); await page.goto('/#selection-cards');
  const report = page.getByRole('radiogroup', { name: '工作台布局' }).getByRole('radio', { name: '双栏报告' });
  await report.locator('..').tap(); await expect(report).toBeChecked();
  await report.locator('..').tap(); await expect(page.getByTestId('card-changes')).toHaveText('选择变化：1 次');
  await page.getByRole('button', { name: '查看预览：课程项目量规', exact: true }).tap();
  await expect(page.getByRole('dialog', { name: '课程项目量规' })).toBeVisible();
  await expect(page.locator('input[name="template"][value="lab"]')).toBeChecked();
  await page.getByRole('button', { name: '关闭预览' }).tap();
  await expect(page.getByRole('radio', { name: '实验报告量规', exact: true })).toBeChecked();
  await expect(page.getByTestId('card-changes')).toHaveText('选择变化：1 次');
  await context.close();
});
