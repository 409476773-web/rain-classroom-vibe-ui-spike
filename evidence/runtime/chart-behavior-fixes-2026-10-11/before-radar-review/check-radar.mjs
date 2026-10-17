import { chromium, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const run = "evidence/runtime/chart-behavior-fixes-2026-10-11";
const folder = `${run}/before-radar-review`;
await mkdir(folder, { recursive: true });
const sourcePaths = [
  "apps/playground/src/docs/components/chart-data.ts",
  "apps/playground/src/docs/components/chart-examples.tsx",
  "apps/playground/src/docs/components/chart-page.tsx",
  "apps/playground/src/docs/components/chart-variants/shared.tsx",
  "apps/playground/src/docs/components/chart-variants/radial.tsx",
  ...["radar-chart", "radar-area", "radar-context", "radar-grid", "radar-axis", "radar-labels", "use-mount-progress", "use-enter-complete", "animation"].map(name => `packages/ui/src/charts/vendor/charts/${name}.${["use-mount-progress", "use-enter-complete", "animation"].includes(name) ? "ts" : "tsx"}`),
];
const baseline = JSON.parse(await readFile(`${run}/baseline-files.json`, "utf8"));
const hashSources = () => Promise.all(sourcePaths.map(async path => {
  const sha256 = createHash("sha256").update(await readFile(path)).digest("hex");
  const beforeSha256 = baseline.find(row => row.path === path)?.sha256 ?? null;
  return { path, sha256, beforeSha256, unchangedSinceBaseline: sha256 === beforeSha256 };
}));
const radialFunction = source => source.slice(source.indexOf("function RadialExample("), source.indexOf("function FunnelExample("));
const callerPath = "apps/playground/src/docs/components/chart-examples.tsx";
const oldCaller = radialFunction(await readFile(`${run}/before/${callerPath}`, "utf8"));
const currentCaller = radialFunction(await readFile(callerPath, "utf8"));
const callerEvidence = { function: "RadialExample", unchangedSinceBaseline: oldCaller === currentCaller, beforeSha256: createHash("sha256").update(oldCaller).digest("hex"), currentSha256: createHash("sha256").update(currentCaller).digest("hex") };
const facts = { url: "http://127.0.0.1:5173/#chart-radar", serviceCwd: "apps/playground in .worktrees/card-v2 (verified PID 75834)", state: "normal", revision: 0, recipe: "monochrome-blue", fixedTime: "2026-10-11T00:00:00+08:00", callerEvidence, sourcesBefore: await hashSources(), samples: [], errors: [] };
const browser = await chromium.launch();

async function geometry(host) {
  return host.evaluate(node => {
    const svg = node.querySelector('[data-rain-id="ui-chart-radar"] svg');
    const size = Math.min(Number(svg?.getAttribute("width")), Number(svg?.getAttribute("height")));
    const radius = (size - 100) / 2;
    const table = [...node.querySelectorAll("tbody tr")].map(row => ({ label: row.querySelector("th")?.textContent, values: [...row.querySelectorAll("td")].map(cell => Number(cell.textContent)) }));
    const series = [...node.querySelectorAll('[data-rain-id="ui-chart-radar"] svg g[style*="cursor"]')].map((group, index) => {
      const path = group.querySelector("path");
      const d = path?.getAttribute("d") ?? "";
      const coordinates = (d.match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
      const values = table[index]?.values ?? [];
      const expected = values.flatMap((value, metric) => {
        const angle = metric * Math.PI * 2 / values.length - Math.PI / 2;
        return [radius * value / 100 * Math.cos(angle), radius * value / 100 * Math.sin(angle)];
      });
      const coordinateError = coordinates.length === expected.length ? Math.max(...coordinates.map((value, offset) => Math.abs(value - expected[offset]))) : Infinity;
      const points = [...group.querySelectorAll("circle")].map(point => ({ x: Number(point.getAttribute("cx")), y: Number(point.getAttribute("cy")) }));
      const box = path?.getBBox();
      return { label: table[index]?.label, values, d, coordinates, expected, coordinateError, finite: coordinates.length === 10 && coordinates.every(Number.isFinite), maxRadius: Math.max(...points.map(point => Math.hypot(point.x, point.y))), pathBox: box ? {x: box.x, y: box.y, width: box.width, height: box.height} : null, opacity: Number(getComputedStyle(group).opacity), points };
    });
    return { at: performance.now(), size, radius, table, series, allAtTarget: series.length === 3 && series.every(row => row.finite && row.coordinateError < 0.0001 && row.opacity > 0.99), htmlAnimations: document.getAnimations().length };
  });
}

try {
  for (const width of [1440, 390]) for (const reducedMotion of ["no-preference", "reduce"]) {
    const name = `${reducedMotion === "reduce" ? "reduced" : "normal"}-${width}`;
    const context = await browser.newContext({viewport: {width, height: 1000}, reducedMotion, timezoneId: "Asia/Shanghai"});
    const page = await context.newPage();
    page.on("pageerror", error => facts.errors.push({name, error: String(error)}));
    await page.clock.setFixedTime(new Date(facts.fixedTime));
    await page.goto(`${facts.url.replace("/#", `/?radar-review=${name}#`)}`);
    const host = page.locator('[data-rain-id="chart-radar"]');
    await expect(host).toBeVisible();
    await page.getByRole("combobox", {name: "视觉配方", exact: true}).selectOption(facts.recipe);
    await expect(host).toHaveAttribute("data-recipe", facts.recipe);
    await host.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const initial = await geometry(host);
    const record = {name, width, reducedMotion, mediaMatchesReduce: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), initial, timeline: [], stable: null};
    facts.samples.push(record);
    await host.screenshot({path: `${folder}/${name}-two-raf.png`, animations: "disabled"});
    const started = Date.now();
    let previousPaths = null;
    let consecutiveTargets = 0;
    while (Date.now() - started < 8000) {
      const sample = await geometry(host);
      const signature = sample.series.map(row => row.d).join("|");
      record.timeline.push({elapsedSinceInitial: sample.at - initial.at, allAtTarget: sample.allAtTarget, coordinateErrors: sample.series.map(row => row.coordinateError), maxRadii: sample.series.map(row => row.maxRadius), opacities: sample.series.map(row => row.opacity)});
      consecutiveTargets = sample.allAtTarget && signature === previousPaths ? consecutiveTargets + 1 : 0;
      previousPaths = signature;
      if (consecutiveTargets >= 3) { record.stable = sample; break; }
      await page.waitForTimeout(100);
    }
    if (!record.stable) throw new Error(`${name}: no stable, nondegenerate terminal geometry within 8 seconds`);
    await host.screenshot({path: `${folder}/${name}-stable.png`, animations: "disabled"});
    record.terminalElapsedSinceInitial = record.stable.at - initial.at;
    record.hostBox = await host.boundingBox();
    console.log(`${name}: early target=${initial.allAtTarget}; stable after ${record.terminalElapsedSinceInitial.toFixed(0)} ms; all three areas match table values`);
    await context.close();
  }
  facts.sourcesAfter = await hashSources();
  facts.sourcesFrozenDuringReview = facts.sourcesBefore.every((row, index) => row.sha256 === facts.sourcesAfter[index].sha256);
  if (!facts.sourcesFrozenDuringReview) throw new Error("Source hashes changed during radar review");
  if (facts.errors.length) throw new Error(JSON.stringify(facts.errors));
  facts.status = "passed";
} finally {
  await writeFile(`${folder}/facts.json`, JSON.stringify(facts, null, 2));
  await browser.close();
}
