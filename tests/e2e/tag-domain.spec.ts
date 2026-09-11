import { mkdirSync, writeFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const evidenceDir = "evidence/runtime/tag-batch-two";
const saveEvidence = process.env.RAIN_UPDATE_TAG_DOMAIN_EVIDENCE === "1";

test("domain shapes retain complete geometry and centered internal badges in both themes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#tag");
  const samples: object[] = [];
  for (const theme of ["light", "dark"]) {
    await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme);
    const geometry = await page.getByTestId("tag-domain-examples").evaluate((section) => [...section.querySelectorAll('[data-slot="root"]')].map((root) => {
      const r = root.getBoundingClientRect(), label = root.querySelector('[data-slot="label"]')!, l = label.getBoundingClientRect(), badge = root.querySelector('[data-slot="score-badge"]'), b = badge?.getBoundingClientRect();
      const style = getComputedStyle(root);
      return { id: root.getAttribute("data-rain-id"), size: root.getAttribute("data-size")!, layout: root.getAttribute("data-layout"), appearance: root.getAttribute("data-appearance"),
        width: r.width, height: r.height, fontSize: style.fontSize, lineHeight: style.lineHeight, color: style.color, background: style.backgroundColor,
        center: l.y + l.height / 2 - r.y - r.height / 2, labelContained: l.x >= r.x && l.right <= r.right && l.y >= r.y && l.bottom <= r.bottom,
        badge: b ? { width: b.width, height: b.height, gap: l.y - b.bottom, inside: b.x >= r.x && b.right <= r.right && b.y >= r.y && b.bottom <= r.bottom } : null };
    }));
    for (const row of geometry) {
      expect(row.labelContained, JSON.stringify(row)).toBe(true);
      if (row.id === "ui-scored-task-type-mark") {
        const expected = row.layout === "stacked" ? { small: 60, medium: 64, large: 68 } : { small: 48, medium: 52, large: 56 };
        expect(row.width).toBe(expected[row.size as keyof typeof expected]); expect(row.height).toBe(row.width);
        expect(row.center).toBeCloseTo(0, 1); expect(row.badge!.inside).toBe(true); expect(row.badge!.gap).toBeGreaterThanOrEqual(2);
        expect([row.badge!.width, row.badge!.height]).toEqual([28, 14]);
      }
      if (row.id === "ui-tag" && row.layout === "vertical") expect([row.width, row.height]).toEqual(({ "20": [18, 36], "24": [22, 40], "28": [26, 44] } as const)[row.size as "20" | "24" | "28"]);
      if (row.id === "ui-learning-unit-tag" && row.layout === "stacked") expect([row.width, row.height]).toEqual([40, 32]);
      if (row.id === "ui-status-tag") expect(row.height).toBe(Number(row.size));
    }
    const scorePaints = await page.locator('[data-rain-id="ui-scored-task-type-mark"] [data-slot="score-badge"]').evaluateAll((badges) => badges.map((badge) => {
      const css = getComputedStyle(badge);
      return { appearance: badge.parentElement!.getAttribute("data-appearance"), background: css.backgroundColor, color: css.color, opacity: css.opacity };
    }));
    for (const paint of scorePaints) {
      expect(paint.color).toBe("rgb(255, 255, 255)"); expect(paint.opacity).toBe("1");
      expect(paint.background).toBe(paint.appearance === "solid" ? "rgba(255, 255, 255, 0.3)" : theme === "light" ? "rgb(109, 125, 241)" : "rgb(84, 103, 239)");
    }
    const solidDots = await page.locator('[data-rain-id="ui-status-tag"][data-appearance="solid"] [data-slot="status-dot"]').evaluateAll((dots) => dots.map((dot) => ({ dot: getComputedStyle(dot).backgroundColor, parent: getComputedStyle(dot.parentElement!).color })));
    expect(solidDots).toHaveLength(3); for (const dot of solidDots) { expect(dot.dot).toBe(dot.parent); expect(dot.dot).toBe("rgba(255, 255, 255, 0.9)"); }
    samples.push({ theme, geometry, scorePaints, solidDots });
    if (saveEvidence) { mkdirSync(evidenceDir, { recursive: true }); await page.getByTestId("tag-domain-examples").screenshot({ path: `${evidenceDir}/${theme}.png` }); }
  }
  const marks = page.locator('[data-rain-id="ui-scored-task-type-mark"]');
  const before = await marks.evaluateAll((roots) => roots.map((r) => ({ width: r.getBoundingClientRect().width, height: r.getBoundingClientRect().height, font: getComputedStyle(r).font, labelY: r.querySelector('[data-slot="label"]')!.getBoundingClientRect().y - r.getBoundingClientRect().y })));
  await page.getByRole("checkbox", { name: "显示计分角标" }).uncheck();
  expect(await marks.evaluateAll((roots) => roots.map((r) => ({ width: r.getBoundingClientRect().width, height: r.getBoundingClientRect().height, font: getComputedStyle(r).font, labelY: r.querySelector('[data-slot="label"]')!.getBoundingClientRect().y - r.getBoundingClientRect().y })))).toEqual(before);
  await expect(marks.locator('[data-slot="score-badge"]').first()).toBeHidden();
  await page.getByRole("checkbox", { name: "显示新提醒" }).uncheck();
  await expect(page.locator('[data-slot="reminder"]')).toHaveCount(0);
  if (saveEvidence) writeFileSync(`${evidenceDir}/paint-samples.json`, JSON.stringify({ source: "Actual Chromium DOM and computed styles", samples }, null, 2) + "\n");
});

test("complete marks survive narrow screens, full text enlargement, reduced motion and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/#tag");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  if (saveEvidence) { mkdirSync(evidenceDir, { recursive: true }); await page.getByTestId("tag-domain-examples").screenshot({ path: `${evidenceDir}/compact.png` }); }
  await page.evaluate(() => {
    // Enlarge every actual font and line box in the marks, including the internal badge.
    const roots = [...document.querySelectorAll<HTMLElement>('[data-rain-id="ui-scored-task-type-mark"], [data-rain-id="ui-learning-unit-reminder-mark"]')];
    const targets = roots.flatMap((root) => [root, ...root.querySelectorAll<HTMLElement>('[data-slot="score-badge"]')]);
    const values = targets.map((node) => ({ node, size: parseFloat(getComputedStyle(node).fontSize), line: parseFloat(getComputedStyle(node).lineHeight) }));
    for (const { node, size, line } of values) { node.style.fontSize = `${size * 2}px`; node.style.lineHeight = `${line * 2}px`; }
  });
  const enlarged = await page.locator('[data-rain-id="ui-scored-task-type-mark"]').evaluateAll((roots) => roots.map((root) => {
    const r = root.getBoundingClientRect(), l = root.querySelector('[data-slot="label"]')!.getBoundingClientRect(), b = root.querySelector('[data-slot="score-badge"]')!.getBoundingClientRect();
    return { gap: l.y - b.bottom, centered: l.y + l.height / 2 - r.y - r.height / 2, contained: l.x >= r.x && l.right <= r.right && l.bottom <= r.bottom && b.right <= r.right, badgeHeight: b.height };
  }));
  for (const value of enlarged) { expect(value.badgeHeight).toBe(24); expect(value.gap).toBeGreaterThanOrEqual(2); expect(value.centered).toBeCloseTo(0, 1); expect(value.contained).toBe(true); }
  const reminders = await page.locator('[data-rain-id="ui-learning-unit-reminder-mark"]').evaluateAll((roots) => roots.map((root) => {
    const r = root.getBoundingClientRect(), l = root.querySelector('[data-slot="label"]')!.getBoundingClientRect();
    return l.x >= r.x && l.right <= r.right && l.y >= r.y && l.bottom <= r.bottom;
  }));
  for (const contained of reminders) expect(contained).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('.rain-tag-processing').first()).toHaveCSS("animation-name", "none");
  await page.emulateMedia({ forcedColors: "active" });
  const badge = page.locator('[data-slot="score-badge"]').first();
  await expect(badge).toHaveCSS("border-top-width", "1px");
  await expect(page.locator('[data-slot="reminder"]').first()).toHaveCSS("forced-color-adjust", "none");
});
