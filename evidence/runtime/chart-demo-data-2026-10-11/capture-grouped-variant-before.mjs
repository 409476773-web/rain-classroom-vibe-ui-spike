import { chromium, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const folder = "evidence/runtime/chart-demo-data-2026-10-11/before-browser";
const facts = JSON.parse(await readFile(`${folder}/facts.json`, "utf8"));
const source = "apps/playground/src/docs/components/chart-variants/bar.tsx";
const hash = async () => createHash("sha256").update(await readFile(source)).digest("hex");
const beforeHash = await hash();
if (beforeHash !== facts.sources.find(entry => entry.path === source).sha256) throw new Error("bar.tsx already differs from the original baseline");
const browser = await chromium.launch();
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce", timezoneId: "Asia/Shanghai" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(String(error)));
    await page.goto(`http://127.0.0.1:5173/?chart-demo-data=before-${width}-multiple#chart-bar`);
    await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
    const card = page.locator('[data-chart-variant="bar-multiple-series"]');
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator('[data-ready="true"]')).toBeVisible();
    await expect(card.getByRole("status").filter({ hasText: "已更新 0 次" })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(0, 0);
    await page.evaluate(() => new Promise(resolveFrame => requestAnimationFrame(() => requestAnimationFrame(resolveFrame))));
    const image = `bar-multiple-series-${width}.png`;
    await card.screenshot({ path: `${folder}/${image}`, animations: "disabled" });
    facts.captures.push({ id: "bar-multiple-series", width, image, recipe: await card.locator("[data-recipe]").getAttribute("data-recipe"), dimensions: await card.boundingBox(), text: await card.textContent(), exactRows: await card.locator("tbody tr").allTextContents(), verifiedBarSourceHash: beforeHash });
    facts.errors.push(...errors);
    if (errors.length) throw new Error(errors.join("\n"));
    await context.close();
  }
  if (await hash() !== beforeHash) throw new Error("bar.tsx changed during the supplemental baseline");
  facts.baselineSupplement = { id: "bar-multiple-series", reason: "Actual official grouped variant; original bar-default images retained as a separate unmodified control", barSourceHash: beforeHash };
  await writeFile(`${folder}/facts.json`, JSON.stringify(facts, null, 2));
  console.log("Captured actual bar-multiple-series baseline at 1440 and 390; bar.tsx remained unchanged.");
} finally {
  await browser.close();
}
