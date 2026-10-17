import { expect, test, type Locator } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { renderedTextAudit, run, save, sourceHashes } from "./quality-helpers";

async function stableGeometry(host: Locator) {
  let last = "", equal = 0;
  await expect.poll(async () => {
    const value = await host.locator("svg path[d],svg circle,svg clipPath rect,[data-slot=mark-container]").evaluateAll(nodes => nodes.map(node => ({
      tag: node.tagName, d: node.getAttribute("d"), r: node.getAttribute("r"), cx: node.getAttribute("cx"), cy: node.getAttribute("cy"),
      width: getComputedStyle(node).width, opacity: getComputedStyle(node).opacity, transform: getComputedStyle(node).transform,
    })));
    const current = JSON.stringify(value);
    equal = current === last ? equal + 1 : 0;
    last = current;
    return equal;
  }, { intervals: [150], timeout: 10_000 }).toBeGreaterThanOrEqual(3);
  return JSON.parse(last);
}

for (const family of ["line", "scatter", "matrix"]) test(`${family}: explicit reduced-motion terminal geometry after each actual plot enters view`, async ({ page }, info) => {
  test.skip(!info.project.name.startsWith("chromium-"), "Six representative terminal observations supplement all three-engine entry smoke.");
  const before = await sourceHashes(), errors: string[] = [], observations: unknown[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await mkdir(run, { recursive: true });
  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/#chart-${family}`);
    expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
    await expect(page.getByRole("status").filter({ hasText: "已按系统设置减少动效" }).first()).toBeVisible();
    const host = page.locator(`[data-rain-id="chart-${family}"]`);
    if (family === "matrix") {
      const charts = host.locator('[data-rain-id="ui-chart-matrix"]');
      await expect(charts).toHaveCount(5);
      for (let index = 0; index < 5; index++) {
        const chart = charts.nth(index), scroll = chart.locator('[data-slot="scroll-container"]');
        await scroll.scrollIntoViewIfNeeded();
        await expect(chart).toHaveAttribute("data-revealed", "true");
        await expect.poll(() => chart.locator('[data-slot="mark-container"]').evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).opacity) === 1))).toBe(true);
        const geometry = await stableGeometry(chart), rows = await chart.locator("tbody tr").allTextContents();
        const text = await renderedTextAudit(chart.locator('svg text,[data-slot="reading"],caption,.rain-matrix__legend-endpoints span'));
        observations.push({ index, caption: await chart.locator("caption").textContent(), revealed: await chart.getAttribute("data-revealed"), reduced: await chart.getAttribute("data-reduced-motion"), geometry, rows, text });
        await chart.screenshot({ path: resolve(run, `${info.project.name}-matrix-${index}-terminal.png`) });
      }
    } else {
      await host.locator(".rain-chart-plot").scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      let lineProof: unknown = null;
      if (family === "line") {
        const pathSpans = () => host.locator(".rain-chart-plot svg path[d]").evaluateAll(nodes => nodes.map(node => {
          const path = node as SVGGraphicsElement, bounds = path.getBBox(), svg = path.closest("svg")!;
          return { d: path.getAttribute("d"), x: bounds.x, width: bounds.width, expectedInnerWidth: svg.getBoundingClientRect().width - 82, stroke: getComputedStyle(path).stroke };
        }).filter(row => row.stroke !== "none"));
        await expect.poll(async () => (await pathSpans()).filter(row => Math.abs(row.width - row.expectedInnerWidth) < 1 && Math.abs(row.x) < 1).length).toBe(3);
        lineProof = await pathSpans();
      } else {
        await expect.poll(() => host.locator(".rain-chart-plot circle").evaluateAll(nodes => nodes.filter(node => Number(node.getAttribute("r")) === 5 && getComputedStyle(node).fill !== "none").length)).toBe(72);
      }
      const geometry = await stableGeometry(host);
      const text = await renderedTextAudit(host.locator("svg text,.text-chart-label,.legend-container button,.rain-chart-note,[data-point-reading] [role=status]"));
      observations.push({ family, geometry, text, lineProof });
      await host.screenshot({ path: resolve(run, `${info.project.name}-${family}-terminal.png`) });
    }
    expect(errors).toEqual([]);
  } finally {
    const after = await sourceHashes();
    await save(`${info.project.name}-${family}-terminal`, { before, after, observations, errors, actualMotion: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches).catch(() => null), sourceFrozen: JSON.stringify(before) === JSON.stringify(after), scope: "six Chromium1440/390 representatives; explicit media plus three full-width Line series paths/all 72 point marks/each matrix revealed and stable; no full-directory terminal or real-device acceptance" });
    expect(after).toEqual(before);
  }
});

test("sunburst settled labels record their actual opaque sector or conditional underlay", async ({ page }, info) => {
  test.skip(info.project.name !== "chromium-1440", "One extra text-measurement path supplements current-frame inventory.");
  const before = await sourceHashes();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-sunburst");
  const host = page.locator('[data-rain-id="chart-sunburst"]');
  await host.locator(".rain-chart-radial-plot").scrollIntoViewIfNeeded();
  await expect.poll(() => renderedTextAudit(host.locator("svg text")).then(readings => readings.length)).toBeGreaterThan(1);
  const geometry = await stableGeometry(host), text = await renderedTextAudit(host.locator("svg text,.rain-chart-note"));
  await host.screenshot({ path: resolve(run, "chromium-1440-sunburst-text-audit.png") });
  const after = await sourceHashes();
  await save("sunburst-text-audit", { before, after, geometry, text, sourceFrozen: JSON.stringify(before) === JSON.stringify(after), scope: "actual settled sector text colors and underlays; measurement only, not palette or graphical contrast acceptance" });
  expect(after).toEqual(before);
});
