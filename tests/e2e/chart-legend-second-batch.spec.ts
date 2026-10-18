import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const run = "evidence/runtime/chart-experience-second-batch-2026-10-11";
async function sources() {
  const baseline = JSON.parse(await readFile(`${run}/baseline-files.json`, "utf8"));
  const paths = [...baseline.map((row: { path: string }) => row.path).filter((path: string) => /^(packages\/ui\/src\/charts\/|apps\/playground\/src\/docs\/components\/chart)/.test(path) && /\.(tsx?|css)$/.test(path) && !path.includes(".test.")), "packages/ui/src/charts/vendor/charts/legend/use-legend-interaction.ts"];
  return Promise.all(paths.map(async path => ({ path, sha256: createHash("sha256").update(await readFile(path, "utf8")).digest("hex") })));
}

test("custom legends restore the same reading after Escape and a repeated click", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const before = await sources(), errors: string[] = [], checks: unknown[] = [];
  page.on("pageerror", error => errors.push(String(error)));
  for (const [family, variant] of [["pie", "pie-legend"], ["ring", "ring-legend"], ["funnel", "funnel-default"], ["scatter", "scatter-default"]]) {
    await page.goto(`http://127.0.0.1:5173/?legend-click=${variant}#chart-${family}`);
    const host = page.locator(`[data-chart-variant="${variant}"]`);
    await host.scrollIntoViewIfNeeded();
    const button = host.locator(".legend-container button").nth(1);
    const marked = host.locator(".legend-container [data-hovered]");
    await button.focus();
    const label = (await button.textContent())!;
    await expect(marked).toContainText(label);
    await button.press("Escape");
    await expect(marked).toHaveCount(0);
    await expect(button).toBeFocused();
    await button.press("Enter");
    await expect(marked).toContainText(label);
    await button.press("Escape");
    await button.click();
    await expect(marked).toContainText(label);
    const center = await host.locator('[role="status"]').allTextContents();
    checks.push({ family, variant, label, center, restoredByEnterAndClick: true });
  }
  expect(errors).toEqual([]);
  expect(await sources()).toEqual(before);
  await writeFile(`${run}/legend-browser/custom-repeat-click.json`, JSON.stringify({ checks, errors, sourceFrozen: true }, null, 2));
});

for (const width of [1440, 390]) for (const motion of ["no-preference", "reduce"] as const) {
  test(`${width}px ${motion}: temporary legends preserve readings and restore the keyboard target`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: motion });
    const before = await sources(), errors: string[] = [], checks: unknown[] = [];
    page.on("pageerror", error => errors.push(String(error)));
    const hosts = [
      { family: "line", variant: undefined }, { family: "line", variant: "line-dual-y-axis" },
      { family: "radar", variant: undefined }, { family: "ring", variant: "ring-legend" },
      { family: "candlestick", variant: "candlestick-tooltip-line-default" },
    ];
    for (const { family, variant } of hosts) {
      await page.goto(`http://127.0.0.1:5173/?legend-case=${width}-${motion}-${variant ?? family}#chart-${family}`);
      const recipe = page.getByRole("combobox", { name: "视觉配方", exact: true });
      if ((await recipe.locator("option").evaluateAll(options => options.map(option => (option as HTMLOptionElement).value))).includes("monochrome-blue")) await recipe.selectOption("monochrome-blue");
      const host = page.locator(variant ? `[data-chart-variant="${variant}"]` : `[data-rain-id="chart-${family}"]`);
      await host.scrollIntoViewIfNeeded();
      const buttons = host.locator(".legend-container button"), first = buttons.nth(0), second = buttons.nth(1);
      await expect(second).toBeVisible();
      const firstText = (await first.textContent())!, secondText = (await second.textContent())!;
      const marked = host.locator(".legend-container [data-hovered]");
      await page.mouse.move(0, 0);
      await first.focus();
      await expect(marked).toHaveCount(1);
      await expect(marked).toContainText(firstText);
      await second.hover();
      await expect(marked).toContainText(secondText);
      await page.mouse.move(0, 0);
      await expect(marked).toContainText(firstText);
      await first.press("Escape");
      await expect(marked).toHaveCount(0);
      await first.press("Enter");
      await expect(marked).toContainText(firstText);
      await first.press("Space");
      await expect(marked).toContainText(firstText);
      await expect(first).not.toHaveAttribute("aria-pressed");
      const legendBefore = await buttons.allTextContents();
      await first.press("Escape");
      await expect(marked).toHaveCount(0);
      expect(await buttons.allTextContents()).toEqual(legendBefore);
      await first.click();
      await expect(marked).toContainText(firstText);
      await page.getByRole("heading", { level: 1 }).click();
      await expect(marked).toHaveCount(0);
      const plot = await host.locator("svg").first().boundingBox();
      expect(plot?.width).toBeGreaterThan(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      checks.push({ family, variant: variant ?? "default", firstText, secondText, plot, legendBefore, events: ["focus", "pointer-preview", "pointer-return", "Escape", "Enter", "Space", "outside-click"], dataHidden: false });
    }
    expect(errors).toEqual([]);
    const after = await sources();
    expect(after).toEqual(before);
    const folder = evidenceOutputPath(`${run}/legend-browser`);
    await mkdir(folder, { recursive: true });
    await writeFile(`${folder}/${width}-${motion}.json`, JSON.stringify({ checks, errors, sourcesBefore: before, sourcesAfter: after, sourceFrozen: true }, null, 2));
  });
}
