import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = "evidence/runtime/chart-behavior-fixes-2026-10-11/browser/radar";
const variants = ["radar-default", "radar-triangle", "radar-hexagon", "radar-single-series", "radar-minimal", "radar-grid-only"];
const hostFor = (page: Page, id: string) => page.locator(id === "default" ? '[data-rain-id="chart-radar"]' : `[data-chart-variant="${id}"]`);
const actionsFor = (page: Page, id: string) => id === "default" ? page.locator('[data-chart-default-controls]') : hostFor(page, id).locator('.rain-chart-variant__actions');

function readRadar(host: Element) {
  const svg = host.querySelector<SVGSVGElement>('[data-rain-id="ui-chart-radar"] svg');
  const size = Math.min(Number(svg?.getAttribute("width")), Number(svg?.getAttribute("height")));
  const radius = (size - (host.getAttribute("data-rain-id") === "chart-radar" ? 100 : 96)) / 2;
  const table = [...host.querySelectorAll("tbody tr")].map(row => ({ label: row.querySelector("th")?.textContent, values: [...row.querySelectorAll("td")].map(cell => Number(cell.textContent)) }));
  const series = [...host.querySelectorAll<SVGGElement>('[data-rain-id="ui-chart-radar"] svg g[style*="cursor"]')].map((group, index) => {
    const path = group.querySelector<SVGPathElement>("path")!;
    const d = path?.getAttribute("d") ?? "";
    const coordinates = (d.match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
    const values = table[index]?.values ?? [];
    const expected = values.flatMap((value, metric) => {
      const angle = metric * Math.PI * 2 / values.length - Math.PI / 2;
      return [radius * value / 100 * Math.cos(angle), radius * value / 100 * Math.sin(angle)];
    });
    const coordinateError = coordinates.length === expected.length && expected.length > 0 ? Math.max(...coordinates.map((value, offset) => Math.abs(value - expected[offset]!))) : Infinity;
    const points = [...group.querySelectorAll("circle")].map(point => ({ x: Number(point.getAttribute("cx")), y: Number(point.getAttribute("cy")), r: Number(point.getAttribute("r")) }));
    const pointError = points.length ? Math.max(...points.flatMap((point, offset) => [Math.abs(point.x - expected[offset * 2]!), Math.abs(point.y - expected[offset * 2 + 1]!)])) : 0;
    const box = path?.getBBox();
    const style = getComputedStyle(path), groupStyle = getComputedStyle(group);
    return { label: table[index]?.label, values, d, coordinates, expected, coordinateError, pointError, finite: coordinates.length === values.length * 2 && coordinates.every(Number.isFinite), maxRadius: Math.max(...Array.from({ length: coordinates.length / 2 }, (_, offset) => Math.hypot(coordinates[offset * 2]!, coordinates[offset * 2 + 1]!))), box: box ? { x: box.x, y: box.y, width: box.width, height: box.height } : null, opacity: Number(groupStyle.opacity), transform: groupStyle.transform, fill: style.fill, fillOpacity: Number(style.fillOpacity), stroke: style.stroke, strokeWidth: parseFloat(style.strokeWidth), filter: style.filter, points };
  });
  return { at: performance.now(), size, radius, table, series, allAtTarget: size > 10 && series.length === table.length && series.length > 0 && series.every(row => row.finite && row.coordinateError < .0001 && row.pointError < .0001 && row.opacity > .99) };
}

type RadarFacts = ReturnType<typeof readRadar>;
declare global {
  interface Window {
    __rainReadRadar: typeof readRadar;
    __rainRadarFirst: { id: string; reduced: boolean; recipe: string | null; facts: RadarFacts; active: string | null }[];
  }
}

async function record(name: string, facts: unknown) {
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/${name}.json`, JSON.stringify(facts, null, 2));
}

async function open(page: Page, reduced: "reduce" | "no-preference", width: number) {
  await page.setViewportSize({ width, height: 1000 });
  await page.emulateMedia({ reducedMotion: reduced });
  await page.addInitScript({ content: `
    window.__rainReadRadar = (${readRadar.toString()});
    window.__rainRadarFirst = [];
    const seen = new WeakSet();
    new MutationObserver(() => {
      for (const svg of document.querySelectorAll('[data-rain-id="ui-chart-radar"] svg')) {
        if (seen.has(svg)) continue;
        const host = svg.closest('[data-chart-variant], [data-rain-id="chart-radar"]');
        if (!host) continue;
        const facts = window.__rainReadRadar(host);
        if (facts.size <= 10 || !facts.series.length || facts.table.length !== facts.series.length) continue;
        seen.add(svg);
        window.__rainRadarFirst.push({ active: host.getAttribute('data-active'), id: host.getAttribute('data-chart-variant') || 'default', reduced: matchMedia('(prefers-reduced-motion: reduce)').matches, recipe: host.getAttribute('data-recipe') || host.querySelector('[data-recipe]')?.getAttribute('data-recipe'), facts });
      }
    }).observe(document, { subtree: true, childList: true, attributes: true });
  ` });
  await page.goto("/#chart-radar");
  await expect(hostFor(page, "default").locator('[data-rain-id="ui-chart-radar"] svg')).toBeVisible();
  await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
}

async function ready(page: Page, id: string) {
  const host = hostFor(page, id);
  await host.scrollIntoViewIfNeeded();
  if (id !== "default") await expect(host).toHaveAttribute("data-active", "true");
  await expect(host.locator('[data-rain-id="ui-chart-radar"] svg')).toBeVisible();
  await page.mouse.move(0, 0);
  return host;
}

const geometry = (host: Locator) => host.evaluate(node => window.__rainReadRadar(node));
const first = (page: Page, id: string) => page.evaluate(id => window.__rainRadarFirst.filter(sample => sample.id === id).at(-1), id);
const settleFrame = (page: Page) => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));

async function replay(page: Page, id: string) {
  const previous = await page.evaluate(id => window.__rainRadarFirst.filter(sample => sample.id === id).length, id);
  await actionsFor(page, id).getByRole("button", { name: "重播动效", exact: true }).click();
  await expect.poll(() => page.evaluate(id => window.__rainRadarFirst.filter(sample => sample.id === id).length, id)).toBeGreaterThan(previous);
  return first(page, id);
}

async function sampleEntry(host: Locator) {
  return host.evaluate(async node => {
    const frames: RadarFacts[] = [], start = performance.now();
    await new Promise<void>(resolve => {
      const sample = (now: number) => {
        frames.push(window.__rainReadRadar(node));
        if (now - start < 2300) requestAnimationFrame(sample); else resolve();
      };
      requestAnimationFrame(sample);
    });
    return frames;
  });
}

async function preserveLegendAndGlow(page: Page, host: Locator, id: string) {
  const before = await geometry(host);
  expect(before.series.every(row => row.fillOpacity === .15 && row.filter === "none")).toBe(true);
  expect(before.series.every(row => row.strokeWidth === (id === "radar-hexagon" ? 0 : 2))).toBe(true);
  const button = host.locator(".rain-chart-legend-button").first();
  await button.focus();
  await expect.poll(async () => (await geometry(host)).series[0]!.fillOpacity).toBeCloseTo(.35, 2);
  if (before.series.length > 1) await expect.poll(async () => (await geometry(host)).series[1]!.opacity).toBeCloseTo(.3, 2);
  const focused = await geometry(host);
  if (["radar-hexagon", "radar-grid-only"].includes(id)) expect(focused.series[0]!.filter).toBe("none");
  else expect(focused.series[0]!.filter).toContain("drop-shadow(");
  expect(focused.series.map(row => row.fill)).toEqual(before.series.map(row => row.fill));
  await button.evaluate(node => (node as HTMLButtonElement).blur());
  await page.mouse.move(0, 0);
  await expect.poll(async () => (await geometry(host)).series.every(row => row.opacity === 1 && row.fillOpacity === .15)).toBe(true);
  return { before, focused, restored: await geometry(host) };
}

for (const width of [1440, 390]) {
  test(`reduced radar paints its first valid geometry and preserves six variants at ${width}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(String(error)));
    await open(page, "reduce", width);
    const results = [];
    for (const id of ["default", ...variants]) {
      const host = await ready(page, id);
      const firstSize = await first(page, id);
      await record(`${id}-${width}-reduced-first`, firstSize);
      expect(firstSize?.reduced).toBe(true);
      expect(firstSize?.facts.allAtTarget).toBe(true);
      expect((await geometry(host)).allAtTarget).toBe(true);
      await host.screenshot({ path: `${evidence}/${id}-${width}-reduced.png`, animations: "disabled" });
      const initial = await geometry(host);
      await actionsFor(page, id).getByRole("button", { name: "更新数据", exact: true }).click();
      await settleFrame(page);
      const updated = await geometry(host);
      expect(updated.allAtTarget).toBe(true);
      expect(updated.table).not.toEqual(initial.table);
      const replayedFirst = await replay(page, id);
      await settleFrame(page);
      expect(replayedFirst?.facts.allAtTarget).toBe(true);
      expect((await geometry(host)).table).toEqual(updated.table);
      const legend = await preserveLegendAndGlow(page, host, id);
      results.push({ id, firstSize, updated, replayedFirst, legend });
    }
    await record(`reduced-${width}`, { results, errors });
    expect(errors).toEqual([]);
  });

  test(`ordinary radar retains stagger, intermediate geometry and six variant styles at ${width}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(String(error)));
    await open(page, "no-preference", width);
    const results = [];
    for (const id of ["default", ...variants]) {
      const host = await ready(page, id);
      const early = await replay(page, id);
      await record(`${id}-${width}-normal-early`, { early, active: await host.getAttribute("data-active"), current: await geometry(host) });
      expect(early?.reduced).toBe(false);
      if (id !== "default") expect(early?.active).toBe("true");
      expect(early?.facts.allAtTarget).toBe(false);
      const frames = await sampleEntry(host);
      const terminal = frames.at(-1)!;
      expect(terminal.allAtTarget).toBe(true);
      expect(frames.some(frame => frame.series.some(row => row.maxRadius > 1 && row.coordinateError > .1))).toBe(true);
      const lastSeries = frames.map(frame => frame.series.at(-1)!).filter(Boolean);
      expect(lastSeries.some(row => row.maxRadius <= 1)).toBe(true);
      await host.screenshot({ path: `${evidence}/${id}-${width}-normal.png`, animations: "disabled" });
      const updatedBefore = await geometry(host);
      await actionsFor(page, id).getByRole("button", { name: "更新数据", exact: true }).click();
      await settleFrame(page);
      const updated = await geometry(host);
      expect(updated.allAtTarget).toBe(true);
      expect(updated.table).not.toEqual(updatedBefore.table);
      const legend = await preserveLegendAndGlow(page, host, id);
      results.push({ id, early, frames, updated, legend });
    }
    await record(`normal-${width}`, { results, errors });
    expect(errors).toEqual([]);
  });

  test(`enabling system reduce during entry reveals radar without the old delay at ${width}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(String(error)));
    await open(page, "no-preference", width);
    const host = await ready(page, "default");
    await replay(page, "default");
    const before = await geometry(host);
    expect(before.allAtTarget).toBe(false);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await settleFrame(page);
    const immediate = await geometry(host);
    await record(`dynamic-reduce-${width}`, { before, immediate, reduce: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches) });
    expect(immediate.allAtTarget).toBe(true);
    await host.screenshot({ path: `${evidence}/dynamic-reduce-${width}.png`, animations: "disabled" });
    expect((await replay(page, "default"))?.facts.allAtTarget).toBe(true);

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await settleFrame(page);
    await replay(page, "default");
    await host.locator(".rain-chart-legend-button").first().focus();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await settleFrame(page);
    const hovered = await geometry(host);
    expect(hovered.series.every(row => row.coordinateError < .0001 && row.pointError < .0001)).toBe(true);
    expect(hovered.series[0]!).toMatchObject({ opacity: 1, fillOpacity: .35, strokeWidth: 3, transform: "matrix(1.05, 0, 0, 1.05, 0, 0)" });
    expect(hovered.series[0]!.points.every(point => point.r === 6)).toBe(true);
    expect(hovered.series.slice(1).every(row => row.opacity === .3 && row.fillOpacity === .15 && row.strokeWidth === 2 && row.transform === "none")).toBe(true);
    await record(`dynamic-reduce-hover-${width}`, { hovered, errors });
    expect(errors).toEqual([]);
  });
}
