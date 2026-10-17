import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { CHART_ENTRIES } from "../../../../../apps/playground/src/docs/components/chart-catalog";
import { paintReadings, renderedTextAudit, run, save, sourceHashes } from "./quality-helpers";

test("current default registry chart entries render finite geometry and expose exact data without document overflow", async ({ page }, info) => {
  const before = await sourceHashes(), errors: string[] = [], observations: unknown[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await mkdir(run, { recursive: true });
  expect(CHART_ENTRIES).toHaveLength(19);
  const requested = (process.env.RAIN_QUALITY_IDS ?? "").split(",").filter(Boolean);
  const entries = CHART_ENTRIES.filter(entry => requested.length === 0 || requested.includes(entry.id));
  if (requested.length) expect(entries.length).toBe(requested.length);
  try {
    for (const entry of entries) {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`/#chart-${entry.id}`);
      await expect(page.getByRole("heading", { name: entry.label, level: 1 })).toBeVisible();
      const host = page.locator(`[data-rain-id="${entry.id === "network" ? "doc-chart-network" : `chart-${entry.id}`}"]`);
      if (entry.id === "network" && page.viewportSize()!.width === 390) {
        await expect(host.locator('.rain-network[data-narrow="true"]').first()).toBeVisible();
        await expect(host.locator(".rain-network__relations").first()).toBeVisible();
        expect(await host.locator(".rain-network__relations li").count()).toBeGreaterThan(0);
      } else if (entry.id === "matrix") await expect(host.locator('[data-rain-id="ui-chart-matrix"]').first()).toBeVisible();
      else await expect.poll(() => host.locator("svg").evaluateAll(nodes => nodes.filter(node => { const box = node.getBoundingClientRect(); return box.width > 60 && box.height > 60; }).length)).toBeGreaterThan(0);
      const summaries = host.locator("summary").filter({ hasText: "查看精确数据" });
      for (let index = 0; index < await summaries.count(); index++) await summaries.nth(index).click();
      await expect(host.locator("tbody tr").first()).toBeVisible();
      const rows = await host.locator("tbody tr").allTextContents();
      expect(rows.length).toBeGreaterThan(0);
      expect(rows.join(" ")).not.toMatch(/NaN|Infinity|undefined/);
      const invalidGeometry = await host.locator("svg [d],svg [points],svg [transform],svg [cx],svg [x]").evaluateAll(nodes => nodes.flatMap(node => [...node.attributes].filter(attribute => /^(d|points|transform|cx|cy|x|y|width|height|r)$/.test(attribute.name) && /NaN|Infinity|undefined/.test(attribute.value)).map(attribute => ({ tag: node.tagName, name: attribute.name, value: attribute.value }))));
      expect(invalidGeometry).toEqual([]);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      const bounds = await host.evaluate(node => { const box = node.getBoundingClientRect(); return { left: box.left, right: box.right, width: box.width, viewport: innerWidth }; });
      const status = await host.locator('[role="status"]').allTextContents();
      const ordinaryText = await paintReadings(host.locator(".text-chart-label, .legend-container .rain-chart-legend-button, .legend-container .text-legend-foreground"));
      const renderedText = await renderedTextAudit(host.locator("svg text, .text-chart-label, .legend-container .rain-chart-legend-button, .legend-container .text-legend-foreground, .rain-chart-note, [role=status], .rain-chart-center-value, .rain-chart-center-label, [data-slot=cell], .rain-network__relations li"));
      observations.push({ id: entry.id, rows, status, bounds, invalidGeometry, ordinaryText, renderedText, narrowNetworkEquivalentReading: entry.id === "network" && page.viewportSize()!.width === 390 });
      await host.screenshot({ path: resolve(run, `${info.project.name}-${entry.id}.png`) });
    }
    expect(errors).toEqual([]);
  } finally {
    const after = await sourceHashes();
    await save(`${info.project.name}-entries`, { before, after, observations, errors, requested: entries.map(entry => entry.id), actualReducedMotion: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches).catch(() => null), sourceFrozen: JSON.stringify(before) === JSON.stringify(after), scope: "current registry chart defaults; ordinary-motion current-frame finite geometry/exact-table access/layout smoke, not terminal visual or physical Safari/VoiceOver/touch acceptance" });
    expect(after).toEqual(before);
  }
});
