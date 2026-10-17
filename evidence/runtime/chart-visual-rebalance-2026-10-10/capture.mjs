import { chromium, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const phase = process.argv[2] ?? "before";
if (!["before", "after"].includes(phase)) throw new Error("Use before or after");
const folder = resolve(`evidence/runtime/chart-visual-rebalance-2026-10-10/${phase}-browser`);
await mkdir(folder, { recursive: true });
const sourceFiles = ["chart-page.tsx", "chart-page.css", "chart-variant-gallery.tsx", "chart-examples.tsx", "chart-examples.css", "chart-business/mini-examples.tsx", "chart-business/embedding-examples.tsx", "chart-business/chart-business.css"];
const sources = await Promise.all(sourceFiles.map(async file => {
  const path = `apps/playground/src/docs/components/${file}`;
  return { path, sha256: createHash("sha256").update(await readFile(path)).digest("hex") };
}));
const browser = await chromium.launch();
const facts = { phase, baseURL: "http://127.0.0.1:5173", recipe: "monochrome-blue", state: "normal", revision: 0, reducedMotion: "reduce", timezone: "Asia/Shanghai", sources, captures: [], errors: [] };
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce", timezoneId: "Asia/Shanghai" });
    const page = await context.newPage();
    page.on("pageerror", error => facts.errors.push(String(error)));
    for (const id of ["line", "bar", "sunburst"]) {
      await page.goto(`${facts.baseURL}/?visual-rebalance=${phase}-${width}-${id}#chart-${id}`);
      await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
      const primary = page.locator(`[data-rain-id="chart-${id}"]`);
      await expect(primary).toHaveAttribute("data-state", "normal");
      await expect(primary).toHaveAttribute("data-size", "standard");
      await expect(primary.locator("svg").first()).toBeVisible();
      await expect(page.getByRole("status").filter({ hasText: "示例数据 · 已更新 0 次" }).first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await page.mouse.move(0, 0);
      await page.evaluate(() => new Promise(resolveFrame => requestAnimationFrame(() => requestAnimationFrame(resolveFrame))));
      const example = primary.locator("xpath=ancestor::section[contains(@class,'component-doc__example')][1]");
      const image = `${id}-${width}.png`;
      await example.screenshot({ path: `${folder}/${image}`, animations: "disabled" });
      facts.captures.push({ id, width, image, dimensions: await example.boundingBox(), normalData: await primary.locator("tbody").textContent() });
    }
    await page.goto(`${facts.baseURL}/?visual-rebalance=${phase}-${width}-business#chart-business`);
    await page.getByRole("combobox", { name: "业务图表配色", exact: true }).selectOption("monochrome-blue");
    await page.getByRole("combobox", { name: "业务数据状态", exact: true }).selectOption("normal");
    await expect(page.getByRole("status").filter({ hasText: "示例数据 · 更新 0 次" })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    for (const [id, selector] of [["business-gallery", ".rain-business-mini-gallery"], ["business-cards", ".rain-business-cards"]]) {
      const target = page.locator(selector);
      await target.scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      await page.evaluate(() => new Promise(resolveFrame => requestAnimationFrame(() => requestAnimationFrame(resolveFrame))));
      const image = `${id}-${width}.png`;
      await target.screenshot({ path: `${folder}/${image}`, animations: "disabled" });
      facts.captures.push({ id, width, image, dimensions: await target.boundingBox(), text: await target.textContent() });
    }
    await context.close();
  }
  if (facts.errors.length) throw new Error(facts.errors.join("\n"));
  console.log(`Captured ${facts.captures.length} ${phase} images; identical recipe, state, revision and reduced motion.`);
} finally {
  await writeFile(`${folder}/facts.json`, JSON.stringify(facts, null, 2));
  await browser.close();
}
