import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.RAIN_CHART_RADAR_EVIDENCE_DIR ?? evidenceOutputPath("evidence/runtime/chart-radar-feedback-2026-10-09/browser");
const variants = ["radar-default", "radar-triangle", "radar-hexagon", "radar-single-series", "radar-minimal", "radar-grid-only"];
test.beforeAll(() => mkdir(evidence, { recursive: true }));
const cardFor = (page: Page, id: string) => page.locator(`[data-chart-variant="${id}"]`);
const groups = (card: Locator) => card.locator('[data-rain-id="ui-chart-radar"] svg g[style*="cursor"]');
const legend = (card: Locator) => card.locator(".legend-container, .rain-chart-variant-legend").last();
async function facts(name: string, value: unknown) { await writeFile(`${evidence}/${name}.json`, JSON.stringify(value, null, 2)); }
async function open(page: Page, reduced: "reduce" | "no-preference" = "reduce", width = 1280) {
  await page.emulateMedia({ reducedMotion: reduced });
  await page.setViewportSize({ width, height: 796 });
  await page.goto("/#chart-radar");
  await expect(page.locator('[data-rain-id="doc-chart-radar"]')).toBeVisible();
}
async function ready(card: Locator) {
  await card.scrollIntoViewIfNeeded();
  await expect(groups(card).first().locator("path")).toHaveAttribute("d", /M.+Z/);
}
async function hoverReadings(card: Locator) {
  return groups(card).evaluateAll(nodes => nodes.map(node => ({
    opacity: Number(getComputedStyle(node).opacity),
    fill: Number(getComputedStyle(node.querySelector("path")!).fillOpacity),
    stroke: parseFloat(getComputedStyle(node.querySelector("path")!).strokeWidth),
  })));
}

test("all radar variant legends match the default label typography and expose buttons", async ({ page }) => {
  await open(page);
  const base = await page.locator('[data-rain-id="chart-radar"] .rain-chart-legend-button').first().evaluate(node => {
    const style = getComputedStyle(node);
    return { font: style.fontSize, weight: style.fontWeight, color: style.color };
  });
  const rows = [];
  for (const id of variants) {
    const card = cardFor(page, id);
    await ready(card);
    const row = await legend(card).evaluate(node => [...node.children].map(item => {
      const button = item.matches("button") ? item : item.querySelector("button");
      const label = button ?? item;
      const style = getComputedStyle(label);
      return { label: label.textContent?.trim(), button: Boolean(button), font: style.fontSize, weight: style.fontWeight, color: style.color };
    }));
    rows.push({ id, row });
  }
  await facts("legend-typography", { base, rows });
  expect(base).toMatchObject({ font: "13px", weight: "400" });
  for (const { id, row } of rows) {
    expect.soft(row.length, id).toBe(id === "radar-single-series" ? 1 : 2);
    for (const item of row) expect.soft(item, id).toMatchObject({ button: true, ...base });
  }
});

test("radar legend focus and pointer inspect the matching series without affecting another instance", async ({ page }) => {
  await open(page);
  const first = cardFor(page, "radar-default"), second = cardFor(page, "radar-triangle");
  await ready(first);
  await ready(second);
  const button = first.getByRole("button", { name: "课程 A", exact: true });
  await expect(button).toHaveCount(1);
  await button.focus();
  await expect.poll(async () => (await hoverReadings(first))[0]!.fill).toBeCloseTo(.35, 2);
  await expect.poll(async () => (await hoverReadings(first))[1]!.opacity).toBeCloseTo(.3, 2);
  expect(await hoverReadings(second)).toEqual([{ opacity: 1, fill: .15, stroke: 2 }, { opacity: 1, fill: .15, stroke: 2 }]);
  const focused = await button.evaluate(node => ({ outline: getComputedStyle(node).outlineStyle, width: getComputedStyle(node).outlineWidth }));
  expect(focused.outline).not.toBe("none");
  expect(parseFloat(focused.width)).toBeGreaterThan(0);
  await facts("focused-isolation", { first: await hoverReadings(first), second: await hoverReadings(second), focused });
  await first.screenshot({ path: `${evidence}/legend-focus.png` });
  await button.blur();
  await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  await first.getByRole("button", { name: "课程 B", exact: true }).hover();
  await expect.poll(async () => (await hoverReadings(first))[1]!.fill).toBeCloseTo(.35, 2);
  await page.mouse.move(1, 1);
  await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  await groups(first).last().hover({ force: true });
  await expect.poll(async () => (await hoverReadings(first))[1]!.fill).toBeCloseTo(.35, 2);
  await page.mouse.move(1, 1);
  await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
});

test("three five and six dimension outer grids meet their 100 point metric directions", async ({ page }) => {
  await open(page);
  const rows = [];
  for (const [id, dimensions] of [["radar-triangle", 3], ["radar-default", 5], ["radar-hexagon", 6]] as const) {
    const card = cardFor(page, id);
    await ready(card);
    const result = await card.locator('[data-rain-id="ui-chart-radar"] svg').evaluate((svg, n) => {
      const point = (node: SVGGraphicsElement, x: number, y: number) => new DOMPoint(x, y).matrixTransform(node.getScreenCTM()!);
      const center = point(svg as SVGSVGElement, Number(svg.getAttribute("width")) / 2, Number(svg.getAttribute("height")) / 2);
      const polygons = [...svg.querySelectorAll<SVGPathElement>('path[fill="none"]')].map(path => {
        const numbers = (path.getAttribute("d") ?? "").match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number) ?? [];
        const vertices = Array.from({ length: numbers.length / 2 }, (_, i) => point(path, numbers[i * 2]!, numbers[i * 2 + 1]!));
        return { vertices, radius: Math.max(...vertices.map(p => Math.hypot(p.x - center.x, p.y - center.y))) };
      });
      const outer = polygons.sort((a, b) => b.radius - a.radius)[0]!;
      const axes = [...svg.querySelectorAll<SVGLineElement>("line")].map(line => point(line, Number(line.getAttribute("x2")), Number(line.getAttribute("y2"))));
      // The hexagon intentionally hides axes; labels still define every metric direction.
      const endpoints = axes.length === n ? axes : [...svg.querySelectorAll<SVGTextElement>("text")].map(text => {
        const p = point(text, Number(text.getAttribute("x")), Number(text.getAttribute("y")));
        const r = Math.hypot(p.x - center.x, p.y - center.y);
        return { x: center.x + (p.x - center.x) * outer.radius / r, y: center.y + (p.y - center.y) * outer.radius / r };
      });
      return { axisCount: axes.length, endpoints: endpoints.map(p => ({ x: p.x, y: p.y })), radius: outer.radius,
        distances: endpoints.map(p => Math.min(...outer.vertices.map(v => Math.hypot(v.x - p.x, v.y - p.y)))) };
    }, dimensions);
    rows.push({ id, dimensions, ...result });
  }
  await facts("grid-axis-alignment", rows);
  for (const row of rows) {
    expect.soft(row.endpoints.length, row.id).toBe(row.dimensions);
    expect.soft(row.radius, row.id).toBeGreaterThan(50);
    for (const distance of row.distances) expect.soft(distance, row.id).toBeLessThan(1);
  }
});

test("default and variant radar hover glows stay light and local to their series", async ({ page }) => {
  await open(page, "no-preference");
  const rows = [];
  for (const id of ["default-example", ...variants]) {
    const card = id === "default-example" ? page.locator('[data-rain-id="chart-radar"]') : cardFor(page, id);
    await ready(card);
    await page.waitForTimeout(1800);
    await groups(card).last().hover({ force: true });
    await expect.poll(async () => (await hoverReadings(card)).at(-1)!.fill).toBeCloseTo(.35, 2);
    const filter = await groups(card).last().locator("path").evaluate(node => getComputedStyle(node).filter);
    const slash = filter.match(/\/\s*([\d.]+)(%)?\s*\)/);
    const rgba = filter.match(/rgba\([^)]*,\s*([\d.]+)\)/);
    const alpha = slash ? Number(slash[1]) / (slash[2] ? 100 : 1) : rgba ? Number(rgba[1]) : 1;
    const pixels = [...filter.matchAll(/(-?\d+(?:\.\d+)?)px/g)].map(match => Number(match[1]));
    rows.push({ id, filter, alpha, blur: pixels.at(-1) });
    await card.screenshot({ path: `${evidence}/${id}-hover.png` });
    await page.mouse.move(1, 1);
  }
  await facts("hover-glow", rows);
  for (const row of rows) {
    if (["radar-hexagon", "radar-grid-only"].includes(row.id)) expect.soft(row.filter, row.id).toBe("none");
    else {
      expect.soft(row.filter, row.id).toContain("drop-shadow(");
      expect.soft(row.alpha, row.id).toBeLessThanOrEqual(.3);
      expect.soft(row.blur, row.id).toBeLessThanOrEqual(6);
    }
  }
});

for (const scenario of [{ name: "reduced-390", reduced: "reduce", width: 390, zoom: 1 }, { name: "normal-200-percent", reduced: "no-preference", width: 1280, zoom: 2 }] as const) {
  test(`radar labels and finite geometry survive ${scenario.name}`, async ({ page }) => {
    await open(page, scenario.reduced, scenario.width);
    if (scenario.zoom === 2) await page.addStyleTag({ content: "html { zoom: 2; }" });
    const rows = [];
    for (const id of variants) {
      const card = cardFor(page, id);
      await ready(card);
      if (scenario.reduced === "no-preference") await page.waitForTimeout(1500);
      const row = await card.evaluate(node => {
        const svg = node.querySelector('[data-rain-id="ui-chart-radar"] svg')!;
        const paths = [...svg.querySelectorAll("path[d]")].map(path => path.getAttribute("d"));
        const text = [...node.querySelectorAll(".legend-container button, .rain-chart-variant-legend button")].map(button => ({
          label: button.textContent?.trim(), right: button.getBoundingClientRect().right, left: button.getBoundingClientRect().left,
        }));
        return { paths, text, card: node.getBoundingClientRect().toJSON() };
      });
      rows.push({ id, ...row });
      expect.soft(row.text.length, id).toBe(id === "radar-single-series" ? 1 : 2);
      for (const path of row.paths) expect.soft(path, id).not.toMatch(/NaN|Infinity/);
      for (const text of row.text) {
        expect.soft(text.right, id).toBeLessThanOrEqual(scenario.width + 1);
        expect.soft(text.left, id).toBeGreaterThanOrEqual(-1);
      }
    }
    await facts(scenario.name, rows);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(scenario.width + 1);
    await cardFor(page, "radar-default").screenshot({ path: `${evidence}/${scenario.name}.png` });
  });
}
