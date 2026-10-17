import { chromium, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const phase = process.argv[2] ?? "before";
if (!["before", "after"].includes(phase)) throw new Error("Use before or after");
const folder = resolve(`evidence/runtime/chart-demo-data-2026-10-11/${phase}-browser`);
await mkdir(folder, { recursive: true });
const files = ["chart-data.ts", "chart-variants/trend.tsx", "chart-variants/bar.tsx", "chart-business/mini-data.ts", "chart-business/mini-examples.tsx", "chart-business/embedding-examples.tsx", "chart-business/chart-business.css", "chart-examples.tsx", "chart-examples.css", "chart-page.tsx", "chart-variant-gallery.tsx", "chart-example-source.tsx"];
const sources = await Promise.all(files.map(async file => {
  const path = `apps/playground/src/docs/components/${file}`;
  return { path, sha256: createHash("sha256").update(await readFile(path)).digest("hex") };
}));
const browser = await chromium.launch();
const facts = { phase, baseURL: "http://127.0.0.1:5173", previewCwd: "apps/playground in card-v2", requestedRecipe: "monochrome-blue", state: "normal", revision: 0, reducedMotion: "reduce", timezone: "Asia/Shanghai", sources, captures: [], errors: [] };
async function capture(page, id, target, width) {
  await target.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => new Promise(resolveFrame => requestAnimationFrame(() => requestAnimationFrame(resolveFrame))));
  const image = `${id}-${width}.png`;
  const recipe = await target.evaluate(node => {
    const element = node.matches("[data-recipe]") ? node : node.querySelector("[data-recipe]") ?? node.closest("[data-recipe]");
    return element?.getAttribute("data-recipe") ?? null;
  });
  await target.screenshot({ path: `${folder}/${image}`, animations: "disabled" });
  facts.captures.push({ id, width, image, recipe, dimensions: await target.boundingBox(), text: await target.textContent(), exactRows: await target.locator("tbody tr").allTextContents() });
}
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce", timezoneId: "Asia/Shanghai" });
    const page = await context.newPage();
    page.on("pageerror", error => facts.errors.push(String(error)));
    await page.goto(`${facts.baseURL}/?chart-demo-data=${phase}-${width}-line#chart-line`);
    await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
    const trio = page.locator('[data-chart-variant="line-trio-brush"]');
    await trio.scrollIntoViewIfNeeded();
    await expect(trio.locator('[data-ready="true"]')).toBeVisible();
    await expect(trio.getByRole("status").filter({ hasText: "已更新 0 次" })).toBeVisible();
    await capture(page, "line-trio-brush", trio, width);
    await page.goto(`${facts.baseURL}/?chart-demo-data=${phase}-${width}-bar#chart-bar`);
    await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
    const primary = page.locator('[data-rain-id="chart-bar"]');
    await expect(primary).toHaveAttribute("data-state", "normal");
    await expect(primary).toHaveAttribute("data-size", "standard");
    await expect(primary.getByRole("combobox", { name: "柱形配方", exact: true })).toHaveValue("grouped");
    await capture(page, "bar-grouped", primary.locator("xpath=ancestor::section[contains(@class,'component-doc__example')][1]"), width);
    const variant = page.locator('[data-chart-variant="bar-multiple-series"]');
    await variant.scrollIntoViewIfNeeded();
    await expect(variant.locator('[data-ready="true"]')).toBeVisible();
    await expect(variant.getByRole("status").filter({ hasText: "已更新 0 次" })).toBeVisible();
    await capture(page, "bar-multiple-series", variant, width);
    await page.goto(`${facts.baseURL}/?chart-demo-data=${phase}-${width}-business#chart-business`);
    await page.getByRole("combobox", { name: "业务图表配色", exact: true }).selectOption("monochrome-blue");
    await page.getByRole("combobox", { name: "业务数据状态", exact: true }).selectOption("normal");
    await expect(page.getByRole("status").filter({ hasText: "示例数据 · 更新 0 次" })).toBeVisible();
    await capture(page, "business-gallery", page.locator(".rain-business-mini-gallery"), width);
    await capture(page, "business-cards", page.locator(".rain-business-cards"), width);
    await context.close();
  }
  if (facts.errors.length) throw new Error(facts.errors.join("\n"));
  console.log(`Captured ${facts.captures.length} ${phase} images with actual recipes and normal revision-zero data.`);
} finally {
  await writeFile(`${folder}/facts.json`, JSON.stringify(facts, null, 2));
  await browser.close();
}
