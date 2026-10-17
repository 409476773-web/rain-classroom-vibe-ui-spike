import { expect, test, type Locator } from "@playwright/test";
import { resolve } from "node:path";
import { mkdir } from "node:fs/promises";
import { contrastRatio } from "../../../../../tests/e2e/color-contrast";
import { run, save, sourceHashes } from "./quality-helpers";

async function geometry(host: Locator) {
  return host.locator('svg path[d]').evaluateAll(nodes => nodes.map(node => ({ d: node.getAttribute("d"), fill: getComputedStyle(node).fill, fillOpacity: getComputedStyle(node).fillOpacity, stroke: getComputedStyle(node).stroke })).filter(row => row.fill !== "transparent" && row.fill !== "rgba(0, 0, 0, 0)"));
}
async function stable(host: Locator) {
  let last = "", equal = 0;
  await expect.poll(async () => { const next = JSON.stringify(await geometry(host)); equal = next === last ? equal + 1 : 0; last = next; return equal; }, { intervals: [150] }).toBeGreaterThanOrEqual(3);
  const result = await geometry(host);
  expect(result.length).toBeGreaterThanOrEqual(3);
  expect(result.every(row => row.d && !/NaN|Infinity|undefined/.test(row.d))).toBe(true);
  return result;
}
async function labels(host: Locator) {
  return host.locator('svg text[style*="font-weight: 600"]').evaluateAll(nodes => nodes.map(node => {
    const css = getComputedStyle(node); let opacity = 1, parent: Element | null = node;
    while (parent) { opacity *= Number(getComputedStyle(parent).opacity); parent = parent.parentElement; }
    return { text: node.textContent!.trim(), fill: css.fill, stroke: css.stroke, strokeWidth: css.strokeWidth, paintOrder: css.paintOrder, opacity };
  }));
}
async function halo(host: Locator) {
  await expect.poll(() => labels(host).then(rows => rows.length)).toBeGreaterThanOrEqual(3);
  const readings = (await labels(host)).map(row => ({ ...row, whiteAgainstHaloRatio: contrastRatio(row.fill, row.stroke) }));
  expect(readings.every(row => row.text.length > 0)).toBe(true);
  for (const row of readings) { expect(row.fill).toBe("rgb(255, 255, 255)"); expect(row.strokeWidth).toBe("2px"); expect(row.paintOrder).toBe("stroke"); expect(row.opacity).toBe(1); expect(row.whiteAgainstHaloRatio).toBeGreaterThanOrEqual(4.5); }
  return readings;
}
function sameRootGeometry(actual: Awaited<ReturnType<typeof geometry>>, original: Awaited<ReturnType<typeof geometry>>) {
  expect(actual.length).toBe(original.length); let maximumCoordinateDelta = 0;
  const number = /[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi;
  for (const [index, path] of actual.entries()) {
    const prior = original[index]!;
    expect({ fill: path.fill, fillOpacity: path.fillOpacity, stroke: path.stroke }).toEqual({ fill: prior.fill, fillOpacity: prior.fillOpacity, stroke: prior.stroke });
    expect(path.d!.replace(number, "#")).toBe(prior.d!.replace(number, "#"));
    const current = path.d!.match(number)!.map(Number), previous = prior.d!.match(number)!.map(Number); expect(current.length).toBe(previous.length);
    for (const [position, value] of current.entries()) { const delta = Math.abs(value - previous[position]!); expect(delta).toBeLessThan(1e-8); maximumCoordinateDelta = Math.max(maximumCoordinateDelta, delta); }
  }
  return { maximumCoordinateDelta, maximumAllowedCoordinateDelta: 1e-8, sameCommandsAndPalette: true };
}

for (const kind of ["default", "interactive"] as const) test(`Sunburst ${kind} white halo, exact data and keyboard drill/return`, async ({ page }, info) => {
  test.skip(!info.project.name.startsWith("chromium-"), "Four targeted rendered outline observations supplement earlier three-engine entry smoke.");
  const before = await sourceHashes(), errors: string[] = [], observations: unknown[] = [];
  await mkdir(run, { recursive: true });
  page.on("pageerror", error => errors.push(error.message));
  try {
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light", forcedColors: "none" });
    await page.goto("/#chart-sunburst");
    expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
    const host = page.locator(kind === "default" ? '[data-rain-id="chart-sunburst"]' : '[data-chart-variant="sunburst-interactive"]');
    await host.scrollIntoViewIfNeeded();
    await host.locator('[data-rain-id="ui-chart-sunburst"]').scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    const root = await stable(host), rootLabels = await halo(host), rows = await host.locator("tbody tr").allTextContents();
    expect(rows.length).toBeGreaterThan(0);
    observations.push({ action: "root", geometry: root, labels: rootLabels, exactRows: rows });
    await host.screenshot({ path: resolve(run, `${info.project.name}-sunburst-${kind}-root.png`) });
    const course = host.getByRole("button", { name: "查看基础课程", exact: true });
    await course.focus(); await course.press("Enter");
    const back = host.getByRole("link", { name: "返回学习内容", exact: true });
    await expect(back).toBeVisible();
    await expect(host.getByText("基础课程", { exact: true })).toHaveAttribute("aria-current", "page");
    const drilled = await stable(host), drilledLabels = await halo(host);
    expect(drilled).not.toEqual(root); expect(await host.locator("tbody tr").allTextContents()).toEqual(rows);
    observations.push({ action: "drilled", geometry: drilled, labels: drilledLabels, exactRows: rows });
    await host.screenshot({ path: resolve(run, `${info.project.name}-sunburst-${kind}-drilled.png`) });
    await back.focus(); await back.press("Enter");
    await expect(course).toBeVisible(); await page.mouse.move(0, 0);
    const returned = await stable(host), returnProof = sameRootGeometry(returned, root); expect(await host.locator("tbody tr").allTextContents()).toEqual(rows);
    observations.push({ action: "returned", geometry: returned, labels: await halo(host), exactRows: rows, returnProof });
    if (kind === "default") {
      await page.locator("[data-chart-default-controls]").getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
      await stable(host); const mono = await labels(host); expect(mono.length).toBeGreaterThanOrEqual(3);
      for (const row of mono) { expect(row.fill).toBe("rgb(20, 35, 70)"); expect(row.strokeWidth).toBe("1px"); expect(row.stroke).toBe("none"); expect(row.paintOrder).toBe("normal"); expect(row.opacity).toBe(1); }
      expect(await host.locator("tbody tr").allTextContents()).toEqual(rows);
      observations.push({ action: "default-monochrome-unchanged", labels: mono, exactRows: rows, noOutline: true });
      await host.screenshot({ path: resolve(run, `${info.project.name}-sunburst-default-mono.png`) });
    }
    expect(errors).toEqual([]);
  } finally {
    const after = await sourceHashes(); await save(`${info.project.name}-sunburst-${kind}-outline`, { before, after, observations, errors, sourceFrozen: JSON.stringify(before) === JSON.stringify(after), scope: "actual opaque white glyph against existing dark 2px stroke halo, default/interactive and keyboard root-return; default monochrome no-outline preserved; not full palette/alpha/gradient/forced-colors contrast acceptance" }); expect(after).toEqual(before);
  }
});

test("Sunburst dark narrow default and interactive actual white halo", async ({ page }, info) => {
  test.skip(info.project.name !== "chromium-390", "One Rain dark narrow representative page contains both affected callers.");
  const before = await sourceHashes(), errors: string[] = [], observations: unknown[] = [];
  await mkdir(run, { recursive: true }); page.on("pageerror", error => errors.push(error.message));
  try {
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark", forcedColors: "none" });
    await page.addInitScript(() => { if (document.documentElement) document.documentElement.setAttribute("data-rain-theme", "dark"); else document.addEventListener("DOMContentLoaded", () => document.documentElement.setAttribute("data-rain-theme", "dark"), { once: true }); });
    await page.goto("/#chart-sunburst"); await expect(page.locator("html")).toHaveAttribute("data-rain-theme", "dark");
    const media = await page.evaluate(() => ({ reduced: matchMedia("(prefers-reduced-motion: reduce)").matches, dark: matchMedia("(prefers-color-scheme: dark)").matches, forced: matchMedia("(forced-colors: active)").matches, theme: document.documentElement.getAttribute("data-rain-theme") }));
    expect(media).toEqual({ reduced: true, dark: true, forced: false, theme: "dark" });
    for (const kind of ["default", "interactive"]) {
      const host = page.locator(kind === "default" ? '[data-rain-id="chart-sunburst"]' : '[data-chart-variant="sunburst-interactive"]'); await host.scrollIntoViewIfNeeded(); await host.locator('[data-rain-id="ui-chart-sunburst"]').scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
      const paths = await stable(host), readings = await halo(host), rows = await host.locator("tbody tr").allTextContents(); expect(rows.length).toBeGreaterThan(0);
      observations.push({ kind, geometry: paths, labels: readings, exactRows: rows, media });
      await host.screenshot({ path: resolve(run, `${info.project.name}-sunburst-${kind}-dark.png`) });
    }
    expect(errors).toEqual([]);
  } finally {
    const after = await sourceHashes(); await save("chromium-390-sunburst-dark-outline", { before, after, observations, errors, sourceFrozen: JSON.stringify(before) === JSON.stringify(after), scope: "one automated Rain dark narrow page, actual default and interactive white glyph against existing dark stroke halo; not all dark diagrams or full contrast acceptance" }); expect(after).toEqual(before);
  }
});
