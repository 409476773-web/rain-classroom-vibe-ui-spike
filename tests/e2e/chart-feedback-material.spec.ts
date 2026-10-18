import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = evidenceOutputPath("evidence/runtime/chart-variants/feedback-2026-10-08/material");
for (const site of [
  { name: "playground", base: "http://127.0.0.1:5173/" },
  { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
]) for (const width of [1280, 390]) test(`${site.name} uses coordinated materials and light auxiliary hatching at ${width}px`, async ({ page }) => {
  await mkdir(evidence, { recursive: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width, height: 796 });
  await page.goto(`${site.base}#chart-bar`);
  const facts: unknown[] = [];
  for (const id of ["bar-gradient", "bar-shape-gradient", "bar-pattern", "bar-pattern-reference-band"]) {
    const card = page.locator(`[data-chart-variant="${id}"]`);
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator('[data-ready="true"]')).toBeVisible();
    if (id !== "bar-pattern-reference-band") {
      await expect(card.locator('.component-doc__preview.rain-chart')).toHaveAttribute("data-recipe", "category-near");
      const colors = await card.locator("svg stop, svg pattern path[stroke]").evaluateAll(nodes => nodes.map(node => {
        const style = getComputedStyle(node);
        return node.tagName.toLowerCase() === "stop" ? style.stopColor : style.stroke;
      }));
      expect(colors.length).toBeGreaterThan(0);
      for (const color of colors) {
        const [red, green, blue] = color.match(/\d+(?:\.\d+)?/g)!.map(Number);
        expect(blue, color).toBeGreaterThanOrEqual(Math.max(red!, green!));
      }
      facts.push({ id, colors });
    }
    const texture = id === "bar-pattern-reference-band" ? card.locator(".chart-reference-area pattern path, .chart-reference-area pattern line") : card.locator("svg pattern path, svg pattern line");
    if (await texture.count()) {
      const opacity = await texture.evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).strokeOpacity)));
      expect(opacity.every(value => value === (id === "bar-pattern-reference-band" ? .2 : .8))).toBe(true);
      facts.push({ id, opacity });
    }
    await card.screenshot({ path: `${evidence}/${site.name}-${id}-${width}.png` });
  }
  await page.goto(`${site.base}#chart-area`);
  for (const id of ["area-pattern", "area-pattern-reference-band"]) {
    const card = page.locator(`[data-chart-variant="${id}"]`);
    await card.scrollIntoViewIfNeeded();
    const texture = card.locator("svg pattern path, svg pattern line");
    await expect(texture.first()).toBeAttached();
    const opacity = await texture.evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).strokeOpacity)));
    expect(opacity.every(value => value === (id === "area-pattern" ? .8 : .2))).toBe(true);
    facts.push({ id, opacity });
    await card.screenshot({ path: `${evidence}/${site.name}-${id}-${width}.png` });
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  await writeFile(`${evidence}/${site.name}-${width}-facts.json`, JSON.stringify(facts, null, 2));
});
