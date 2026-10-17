import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, expect } from "@playwright/test";

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const width = Number(process.argv[2]);
assert([1440, 390].includes(width), "Pass 1440 or 390 as the first argument");
const output = resolve(process.argv[3] ?? join(workspace, "evidence/runtime/chart-variants/per-variant-review"));
const referencePath = join(workspace, "apps/playground/src/docs/components/chart-variants/reference.json");
const reference = JSON.parse(readFileSync(referencePath, "utf8"));
assert.equal(reference.length, 170);
const digest = path => createHash("sha256").update(readFileSync(join(workspace, path))).digest("hex");
const sources = ["chart-variant-gallery.tsx", "chart-example-source.tsx", "chart-examples.css", "chart-page.css", ...["bar", "trend", "radial", "comparison", "structure", "special", "shared"].map(name => `chart-variants/${name}.tsx`)].map(name => `apps/playground/src/docs/components/${name}`);
const facts = { status: "running", startedAt: new Date().toISOString(), command: "node scripts/capture-chart-variant-review.mjs", arguments: process.argv.slice(2), baseURL: "http://127.0.0.1:5173", width, height: 1000, reducedMotion: "reduce", timeZone: "Asia/Shanghai", humanGate: "pending", publication: "unpublished", sourceSnapshot: sources.map(path => ({ path, sha256: digest(path) })), cards: [], errors: [] };
mkdirSync(join(output, String(width)), { recursive: true });
const save = () => writeFileSync(join(output, `width${width}.json`), JSON.stringify(facts, null, 2));
let browser;

async function geometry(card) {
  return card.locator(".rain-chart-variant__plot").evaluate(plot => {
    const roots = [...plot.querySelectorAll('[data-slot="chart-root"]')];
    const invalid = [];
    const marks = roots.flatMap(root => [...root.querySelectorAll("svg path[d],svg rect,svg circle,svg polygon,svg line")]).filter(node => {
      if (node.closest("defs,clipPath,mask")) return false;
      for (const name of ["d", "points", "x", "y", "width", "height", "cx", "cy", "r", "x1", "x2", "y1", "y2"]) {
        const value = node.getAttribute(name);
        if (value && /NaN|Infinity|undefined/.test(value)) invalid.push(`${node.tagName}.${name}=${value}`);
      }
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      const painted = style.fill !== "none" && style.fill !== "transparent" && style.fill !== "rgba(0, 0, 0, 0)" || style.stroke !== "none" && style.stroke !== "transparent";
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0 && painted;
    });
    return { nativeRoots: roots.length, visibleMarks: marks.length, paths: marks.filter(node => node.tagName.toLowerCase() === "path").length, invalid };
  });
}

try {
  browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width, height: 1000 }, timezoneId: "Asia/Shanghai", reducedMotion: "reduce" });
  const page = await context.newPage();
  page.on("pageerror", error => facts.errors.push(String(error)));
  page.on("console", message => { if (message.type() === "error") facts.errors.push(message.text()); });
  for (const chartId of [...new Set(reference.map(row => row.chartId))]) {
    await page.goto(`${facts.baseURL}/#chart-${chartId}`);
    const variants = reference.filter(row => row.chartId === chartId);
    await expect(page.locator("[data-chart-variant]")).toHaveCount(variants.length);
    for (const variant of variants) {
      const card = page.locator(`[data-chart-variant="${variant.id}"]`);
      await page.mouse.move(0, 0);
      await card.scrollIntoViewIfNeeded();
      await expect(card.locator('[data-ready="true"]')).toBeVisible();
      await expect(card).toHaveAttribute("data-active", "true");
      const showData = card.getByRole("button", { name: "显示数据", exact: true });
      const loaded = await showData.count() > 0;
      if (loaded) await showData.click();
      await expect.poll(async () => (await geometry(card)).visibleMarks, { message: `${variant.id} has actual painted native geometry at ${width}` }).toBeGreaterThan(0);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      const actual = await geometry(card);
      assert(actual.nativeRoots > 0 && actual.invalid.length === 0, `${variant.id}: native geometry is not finite`);
      // Two paint frames leave immediately reduced native transitions fully applied.
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await page.mouse.move(0, 0);
      const image = join(output, String(width), `${variant.id}-${width}.png`);
      await card.screenshot({ path: image, animations: "disabled" });
      facts.cards.push({ id: variant.id, chartId, title: variant.title, width, path: relative(output, image), sourceUrl: variant.sourceUrl, paletteMode: variant.paletteMode, recipe: await card.locator(".component-doc__preview").getAttribute("data-recipe"), state: loaded ? "ready-after-show-data" : "normal", reducedMotion: "reduce", humanGate: "pending", ...actual });
      save();
    }
    console.log(`${width}px: ${chartId} ${variants.length} captures, ${facts.cards.length}/170`);
  }
  assert.equal(facts.cards.length, 170);
  assert.equal(new Set(facts.cards.map(card => card.id)).size, 170);
  assert.deepEqual(facts.errors, []);
  facts.canonicalChanges = facts.sourceSnapshot.filter(source => digest(source.path) !== source.sha256).map(source => source.path);
  assert.deepEqual(facts.canonicalChanges, [], "Runtime sources changed during capture");
  facts.sourceStable = true;
  facts.status = "captured-pending-human-review";
  facts.finishedAt = new Date().toISOString();
  console.log(`${width}px complete: 170 named card PNGs, no browser errors; Human Gate pending.`);
} catch (error) {
  facts.status = "failed";
  facts.failure = String(error.stack ?? error);
  console.error(facts.failure);
  process.exitCode = 1;
} finally {
  await browser?.close();
  save();
}
