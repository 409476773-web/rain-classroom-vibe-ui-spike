import { chromium, expect } from "@playwright/test";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
const phase = process.argv[2];
if (!["before", "after"].includes(phase)) throw new Error("Choose before or after");
const run = "evidence/runtime/chart-experience-second-batch-2026-10-11";
const folder = `${run}/${phase}-browser`;
await mkdir(folder, { recursive: true });
const catalog = await readFile("apps/playground/src/docs/components/chart-catalog.ts", "utf8");
const ids = [...catalog.matchAll(/\{ id: "([a-z-]+)", label:/g)].map(match => match[1]);
if (ids.length !== 19) throw new Error(`Expected 19 chart entries, found ${ids.length}`);
const refs = JSON.parse(await readFile("apps/playground/src/docs/components/chart-variants/reference.json", "utf8"));
const selected = ["pie", "ring", "radar", "gauge", "funnel", "sankey", "heatmap", "choropleth"].map(family => refs.find(row => row.family === family && row.id.endsWith("-default")) ?? refs.find(row => row.family === family));
const baseline = JSON.parse(await readFile(`${run}/baseline-files.json`, "utf8"));
const sources = await Promise.all(baseline.filter(row => row.path.startsWith("apps/playground/") && /\.(ts|tsx)$/.test(row.path) && !row.path.includes(".test.")).map(async row => ({path: row.path, sha256: createHash("sha256").update(await readFile(row.path)).digest("hex")})));
if (phase === "before") for (const row of sources) { if (baseline.find(b => b.path === row.path)?.sha256 !== row.sha256) throw new Error(`Baseline changed ${row.path}`); }
const facts = { phase, state: "normal", revision: 0, motion: "reduce", recipe: "monochrome-blue", fixedTime: "2026-10-11T00:00:00+08:00", sources, captures: [], errors: [] };
const browser = await chromium.launch();
async function shot(page, target, id, width) {
  await target.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const image = `${id}-${width}.png`;
  await target.screenshot({path: `${folder}/${image}`, animations: "disabled"});
  facts.captures.push({id, width, image, dimensions: await target.boundingBox(), text: await target.textContent(), tableRows: await target.locator("tbody tr").allTextContents()});
}
try {
  for (const width of [1440,390]) {
    const context = await browser.newContext({viewport: {width, height:1000}, reducedMotion:"reduce", timezoneId:"Asia/Shanghai"});
    const page = await context.newPage();
    await page.clock.setFixedTime(new Date(facts.fixedTime));
    page.on("pageerror", error => facts.errors.push(String(error)));
    const currentIds = ids.filter(id => ["pie","ring","gauge","radar","matrix","heatmap","funnel","sankey","choropleth"].includes(id));
    if (currentIds.length !== 9) throw new Error("Expected nine second-batch families");
    for (const id of currentIds) {
      await page.goto(`http://127.0.0.1:5173/?demo-expansion=${phase}-${width}#chart-${id}`);
      if (id === "network") { const host=page.locator('[data-rain-id="doc-chart-network"]'); await expect(host).toBeVisible(); await shot(page,host,"default-network",width); continue; }
      const select = page.getByRole("combobox",{name:"视觉配方",exact:true});
      await expect(select).toBeVisible();
      const options = await select.locator("option").evaluateAll(nodes => nodes.map(n => n.value));
      if (options.includes("monochrome-blue")) await select.selectOption("monochrome-blue");
      const host = page.locator(`[data-rain-id="chart-${id}"]`);
      await expect(host).toBeVisible();
      await shot(page,host,`default-${id}`,width);
      {
        const ref = selected.find(row => row?.family === id);
        if (ref) { const card=page.locator(`[data-chart-variant="${ref.id}"]`); await card.scrollIntoViewIfNeeded(); await expect(card.locator('[data-ready="true"]')).toBeVisible(); await shot(page,card,ref.id,width); }
      }
    }
    for (const id of ["business","china"]) {
      await page.goto(`http://127.0.0.1:5173/?demo-expansion=${phase}-${width}#chart-${id}`);
      const host=page.locator(`[data-rain-id="doc-chart-${id}"]`);
      await expect(host).toBeVisible();
      if (id === "china") await expect(host.locator(".rain-china-map svg").first()).toBeVisible();
      await shot(page,id === "business" ? page.locator(".rain-business-mini-gallery") : host,`business-${id}`,width);
    }
    await context.close();
  }
  facts.sourcesAfter = await Promise.all(sources.map(async row => ({path:row.path,sha256:createHash("sha256").update(await readFile(row.path)).digest("hex")})));
  if (JSON.stringify(sources) !== JSON.stringify(facts.sourcesAfter)) throw new Error("Source changed during capture");
  if (facts.errors.length) throw new Error(facts.errors.join("\n"));
  console.log(`Captured ${facts.captures.length} ${phase} regions; no page errors.`);
} finally { await writeFile(`${folder}/facts.json`,JSON.stringify(facts,null,2)); await browser.close(); }
