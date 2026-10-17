import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { paintReadings, run, save, sourceHashes } from "./quality-helpers";

test("ordinary chart axis labels and legend labels meet normal-text contrast on their actual light surface", async ({ page }, info) => {
  test.skip(info.project.name !== "chromium-1440", "One explicit RED/GREEN browser path; the all-entry suite covers all engines and widths.");
  const before = await sourceHashes(), errors: string[] = [], readings: unknown[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await mkdir(run, { recursive: true });
  try {
    for (const family of ["line", "composed"]) {
      await page.goto(`/#chart-${family}`);
      const host = page.locator(`[data-rain-id="chart-${family}"]`);
      await expect(host.locator("svg").first()).toBeVisible();
      await page.mouse.move(0, 0);
      const axes = await paintReadings(host.locator(".text-chart-label"));
      const legends = await paintReadings(host.locator(".legend-container .rain-chart-legend-button, .legend-container .text-legend-foreground"));
      expect(axes.length).toBeGreaterThan(0);
      expect(legends.length).toBeGreaterThan(0);
      readings.push({ family, axes, legends });
      await host.screenshot({ path: resolve(run, `${family}-actual-text.png`) });
      for (const reading of [...axes, ...legends]) expect.soft(reading.ratio, `${family}: ${reading.text} ${reading.foreground} on ${reading.background}`).toBeGreaterThanOrEqual(4.5);
    }
    expect(errors).toEqual([]);
  } finally {
    const after = await sourceHashes();
    await save("contrast-facts", { before, after, readings, errors, sourceFrozen: JSON.stringify(before) === JSON.stringify(after), scope: "ordinary unfaded axis/legend text on actual nearest opaque light surface; not a full graphical contrast or device acceptance" });
    expect(after).toEqual(before);
  }
});
