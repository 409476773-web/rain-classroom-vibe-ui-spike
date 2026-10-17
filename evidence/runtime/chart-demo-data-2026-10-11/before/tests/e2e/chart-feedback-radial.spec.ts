import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.RAIN_CHART_FEEDBACK_RADIAL_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/feedback-2026-10-08/radial";
for (const site of [
  { name: "playground", base: "http://127.0.0.1:5173/" },
  { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
]) for (const width of [1280, 390]) {
  test(`${site.name} radial readings and material fixes at ${width}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 796 });
    const facts: unknown[] = [];
    await mkdir(evidence, { recursive: true });
    await page.goto(`${site.base}#chart-pie`);
    const donut = page.locator('[data-chart-variant="pie-donut"]');
    await donut.scrollIntoViewIfNeeded();
    await expect(donut.locator('[data-slot="chart-stat-suffix"]')).toHaveText("人");
    const reading = await donut.locator(".rain-chart-center-value").evaluate(node => {
      const number = node.querySelector("number-flow-react")!;
      const unit = node.querySelector("small")!;
      return { value: number.getAttribute("aria-label"), gap: unit.getBoundingClientRect().left - number.getBoundingClientRect().right,
        valueFont: parseFloat(getComputedStyle(node).fontSize), unitFont: parseFloat(getComputedStyle(unit).fontSize) };
    });
    expect(reading.value).toBe("500");
    expect(reading.gap).toBeGreaterThanOrEqual(0);
    expect(reading.gap).toBeLessThanOrEqual(4);
    expect(reading.unitFont).toBeLessThan(reading.valueFont * .8);
    facts.push({ id: "pie-donut", ...reading });
    await donut.screenshot({ path: `${evidence}/${site.name}-pie-donut-${width}.png` });

    const gradient = page.locator('[data-chart-variant="pie-gradients"]');
    await gradient.scrollIntoViewIfNeeded();
    await expect(gradient.locator("radialGradient")).toHaveCount(3);
    const hues = await gradient.locator("radialGradient").evaluateAll(nodes => nodes.map(node => [...node.querySelectorAll("stop")].map(stop => stop.getAttribute("stop-color"))));
    expect(hues.every(colors => new Set(colors).size === 1)).toBe(true);
    facts.push({ id: "pie-gradients", hues });
    await gradient.screenshot({ path: `${evidence}/${site.name}-pie-gradients-${width}.png` });
    const pattern = page.locator('[data-chart-variant="pie-patterns"]');
    await pattern.scrollIntoViewIfNeeded();
    await pattern.locator('svg path[fill="transparent"]').first().hover();
    const filters = await pattern.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
    expect(filters.every(filter => filter === "none")).toBe(true);
    facts.push({ id: "pie-patterns", filters });
    await pattern.screenshot({ path: `${evidence}/${site.name}-pie-patterns-hover-${width}.png` });

    await page.goto(`${site.base}#chart-ring`);
    const ring = page.locator('[data-chart-variant="ring-default"]');
    await ring.scrollIntoViewIfNeeded();
    await expect(ring.locator(".rain-chart-center-reading")).toHaveText("70.0%阅读进度");
    await ring.screenshot({ path: `${evidence}/${site.name}-ring-default-${width}.png` });
    const legend = page.locator('[data-chart-variant="ring-legend"]');
    await legend.scrollIntoViewIfNeeded();
    await legend.getByRole("button", { name: /^练习进度/ }).focus();
    await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
    await legend.getByRole("button", { name: /^练习进度/ }).blur();
    await expect(legend.locator(".rain-chart-center-reading")).toHaveText("70.0%阅读进度");
    facts.push({ id: "ring-default", defaultReading: "70.0% / 阅读进度", hoverReading: "66.7% / 练习进度" });

    await page.goto(`${site.base}#chart-gauge`);
    const gauge = page.locator('[data-chart-variant="gauge-linear-label-below"]');
    await gauge.scrollIntoViewIfNeeded();
    await expect(gauge.getByRole("img", { name: "72", exact: true })).toBeVisible();
    await expect(gauge.locator("svg path")).toHaveCount(124);
    const notches = await gauge.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).opacity));
    expect(notches.every(opacity => opacity === "1")).toBe(true);
    const layout = await gauge.locator('[class*="@container/chart-center"]').evaluate(node => {
      const [value, label] = [...node.querySelectorAll(":scope > span")].map(span => span.getBoundingClientRect().toJSON());
      return { direction: getComputedStyle(node).flexDirection, value, label };
    });
    expect(layout.direction).toBe("row");
    expect(layout.label!.left).toBeGreaterThan(layout.value!.right);
    expect(layout.label!.top).toBeLessThan(layout.value!.bottom);
    facts.push({ id: "gauge-linear-label-below", notches, ...layout });
    await gauge.screenshot({ path: `${evidence}/${site.name}-gauge-linear-${width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    await writeFile(`${evidence}/${site.name}-${width}-facts.json`, JSON.stringify(facts, null, 2));
  });
}
