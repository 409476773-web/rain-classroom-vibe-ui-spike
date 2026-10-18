import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

test("Tabs showDivider has one-pixel thickness in all four positions without changing indicators", async ({ page }) => {
  await page.goto("/#tabs");
  await page.locator('[data-tabs-verification] > summary').waitFor();
  // Vite compiles this real TSX fixture with the same React module graph as the app.
  await page.evaluate(async url => (await import(url)).mountTabsFixture(), `/@fs${resolve("tests/e2e/css-composition.fixture.tsx")}`);
  const fixture = page.locator("#tabs-divider-verification");
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
  const output = resolve("evidence/runtime/deep-review-fixes-2026-10-17/css"); mkdirSync(output, { recursive: true });
  writeFileSync(resolve(output, "tabs-divider-facts.json"), `${JSON.stringify(facts, null, 2)}\n`);
  await fixture.screenshot({ path: resolve(output, "tabs-divider-four-positions.png") });
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
