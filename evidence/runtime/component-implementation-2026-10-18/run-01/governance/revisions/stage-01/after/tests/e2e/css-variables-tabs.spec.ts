import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

for (const theme of ["light", "dark"] as const) test(`Tabs showDivider has one-pixel thickness in all four positions without changing indicators (${theme})`, async ({ page }) => {
  await page.goto("/#tabs");
  await page.locator('[data-tabs-verification] > summary').waitFor();
  // Vite compiles this real TSX fixture with the same React module graph as the app.
  await page.evaluate(async url => (await import(url)).mountTabsFixture(), `/@fs${resolve("tests/e2e/css-composition.fixture.tsx")}`);
  const fixture = page.locator("#tabs-divider-verification");
  await fixture.evaluate((node, value) => node.setAttribute("data-rain-theme", value), theme);
  await expect(fixture.getByRole("tab")).toHaveCount(8);
  const facts = [];
  for (const position of ["top", "bottom", "start", "end"]) {
    const scope = fixture.locator(`[data-divider-position="${position}"]`);
    const readGeometry = () => scope.evaluate(root => {
      const box = (node: Element) => { const { x, y, width, height } = node.getBoundingClientRect(); return { x, y, width, height }; };
      const divider = root.querySelector('[data-part="divider"]')!;
      return { divider: box(divider), color: getComputedStyle(divider).backgroundColor,
        nav: box(root.querySelector('.rain-tabs__nav-row')!),
        indicator: box(root.querySelector('[aria-selected="true"] [data-part="indicator"]')!),
        tab: box(root.querySelector('[aria-selected="true"]')!) };
    });
    const before = await readGeometry();
    await scope.getByRole("tab", { name: "设置", exact: true }).click();
    await expect(scope.getByRole("tabpanel")).toContainText("设置内容");
    const after = await readGeometry();
    facts.push({ position, before, after });
  }
  const output = evidenceOutputPath("evidence/runtime/deep-review-fixes-2026-10-17/css"); mkdirSync(output, { recursive: true });
  writeFileSync(resolve(output, `tabs-divider-${theme}-facts.json`), `${JSON.stringify(facts, null, 2)}\n`);
  await fixture.screenshot({ path: resolve(output, `tabs-divider-four-positions-${theme}.png`) });
  for (const { position, before, after } of facts) {
    const vertical = position === "start" || position === "end";
    for (const fact of [before, after]) {
      expect(vertical ? fact.divider.width : fact.divider.height).toBe(1);
      expect(vertical ? fact.divider.height : fact.divider.width).toBeGreaterThan(30);
      expect(fact.color).not.toMatch(/rgba\([^)]*, 0\)|transparent/);
      expect(vertical ? fact.indicator.width : fact.indicator.height).toBe(2);
      expect(vertical ? fact.divider.x : fact.divider.y).toBeCloseTo(
        position === "top" ? fact.nav.y + fact.nav.height - 1 : position === "bottom" ? fact.nav.y
          : position === "start" ? fact.nav.x + fact.nav.width - 1 : fact.nav.x, 1);
    }
    expect(after.nav).toEqual(before.nav);
  }
  expect((await page.pageErrors()).map(error => error.message)).toEqual([]);
});

for (const theme of ["light", "dark"] as const) test(`Tabs non-target appearances and NavigationBar preserve behavior (${theme})`, async ({ page }, info) => {
  await page.goto("/#tabs");
  await page.evaluate(async url => (await import(url)).mountNonTargetTabsFixture(), `/@fs${resolve("tests/e2e/css-composition.fixture.tsx")}`);
  const fixture = page.locator("#tabs-non-target");
  await fixture.evaluate((node, value) => node.setAttribute("data-rain-theme", value), theme);
  for (const appearance of ["line", "contained", "soft"]) {
    const scope = fixture.locator(`[data-non-target="${appearance}"]`);
    await expect(scope.locator('[data-part="divider"]')).toHaveCount(0);
    const before = await scope.getByRole("tablist").boundingBox();
    await scope.getByRole("tab", { name: "设置", exact: true }).click();
    await expect(scope.getByRole("tabpanel")).toContainText("设置内容");
    await expect(scope.getByRole("tab", { name: "停用", exact: true })).toHaveAttribute("aria-disabled", "true");
    expect(await scope.getByRole("tablist").boundingBox()).toEqual(before);
  }
  const nav = fixture.getByRole("navigation", { name: "页面导航对照" });
  await expect(nav.getByRole("tab")).toHaveCount(0);
  await expect(nav.getByRole("link", { name: "课程概览" })).toHaveAttribute("aria-current", "page");
  const before = await nav.boundingBox();
  await nav.getByRole("link", { name: "课程设置" }).click();
  await expect(nav.getByRole("link", { name: "课程设置" })).toHaveAttribute("aria-current", "page");
  expect(await nav.boundingBox()).toEqual(before);
  await fixture.screenshot({ path: info.outputPath(`non-target-${theme}.png`) });
  expect((await page.pageErrors()).map(error => error.message)).toEqual([]);
});
