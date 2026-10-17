import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = "evidence/runtime/chart-demo-data-expansion-2026-10-11/post-review";
for (const width of [1440, 390]) for (const motion of ["reduce", "no-preference"] as const) {
  test(`profit/loss final samples retain correct sign colors at ${width}px ${motion}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto("/#chart-profit-loss");
    const chart = page.locator('[data-rain-id="chart-profit-loss"]');
    const paths = chart.locator('path[stroke="var(--chart-positive)"],path[stroke="var(--chart-negative)"]');
    const snapshots = [];
    await mkdir(evidence, { recursive: true });
    for (let revision = 0; revision < 3; revision++) {
      if (revision) await page.getByRole("button", { name: "更新数据", exact: true }).first().click();
      await expect(paths).toHaveCount(4);
      if (motion === "no-preference") await page.waitForTimeout(1200);
      const segments = await paths.evaluateAll(nodes => nodes.map(node => {
        const path = node as SVGPathElement;
        return { stroke: path.getAttribute("stroke"), points: Array.from({ length: 31 }, (_, index) => {
          const point = path.getPointAtLength(path.getTotalLength() * index / 30);
          return { x: point.x, y: point.y };
        }) };
      }));
      expect(segments.map(segment => segment.stroke)).toEqual(["var(--chart-negative)", "var(--chart-positive)", "var(--chart-negative)", "var(--chart-positive)"]);
      const zeroY = segments[0]!.points.at(-1)!.y;
      expect(segments.every(segment => segment.points.every(point => segment.stroke === "var(--chart-positive)" ? point.y <= zeroY + .1 : point.y >= zeroY - .1))).toBe(true);
      snapshots.push({ revision, zeroY, segments });
      await chart.screenshot({ path: `${evidence}/profit-${width}-${motion}-${revision}.png` });
    }
    await page.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
    await expect(paths).toHaveCount(1);
    await expect.poll(() => paths.first().evaluate(node => (node as SVGPathElement).getBBox().height)).toBe(0);
    await expect(paths.first()).toHaveAttribute("stroke", "var(--chart-positive)");
    await writeFile(`${evidence}/profit-${width}-${motion}.json`, JSON.stringify({ snapshots, allZeroUsesNonnegativeColor: true }, null, 2));
  });
}

test("narrow hourly matrix reaches daytime peaks through existing keyboard scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-matrix");
  const matrix = page.locator('[data-matrix-example="weekday-hour"] [data-rain-id="ui-chart-matrix"]');
  const first = matrix.locator('[data-slot="cell"][data-row-id="weekday-1"][data-column-id="hour-1"]');
  const scroll = matrix.locator('[data-slot="scroll-container"]');
  await scroll.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await scroll.focus();
  await expect(first).toHaveAttribute("data-active", "true");
  for (let index = 0; index < 14; index++) await page.keyboard.press("ArrowRight");
  const daytime = matrix.locator('[data-slot="cell"][data-row-id="weekday-1"][data-column-id="hour-15"]');
  await expect(daytime).toHaveAttribute("data-active", "true");
  await expect(scroll).toBeFocused();
  expect(Number(await daytime.getAttribute("aria-label"))).toBeGreaterThan(0);
  expect(await scroll.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await mkdir(evidence, { recursive: true });
  await matrix.screenshot({ path: `${evidence}/hourly-matrix-daytime-390.png` });
});
