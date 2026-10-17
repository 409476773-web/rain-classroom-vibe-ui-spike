import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { makeCategoryFixtures } from "../../apps/playground/src/docs/components/chart-business/comparison-data";

for (const motion of ["no-preference", "reduce"] as const) {
  test(`${motion}: category stacks retain rectangles and coherent geometry through updates and reorder`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto("/#chart-category");
    await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("knowledge");
    const chart = page.locator('[data-category-example="knowledge"]');
    const groups = chart.locator("g.series-bar");
    await expect(groups.locator("rect")).toHaveCount(6);
    if (motion === "no-preference") await page.waitForTimeout(1600);
    await groups.nth(0).locator("rect").first().evaluate(node => node.setAttribute("data-test-stack-part", "covered-first"));
    await groups.nth(1).locator("rect").first().evaluate(node => node.setAttribute("data-test-stack-part", "uncovered-first"));
    const covered = chart.locator('[data-test-stack-part="covered-first"]');
    const uncovered = chart.locator('[data-test-stack-part="uncovered-first"]');
    const geometry = async () => Promise.all([covered, uncovered].map(part => part.evaluate(node => {
      const { x, y, width, height } = (node as SVGGraphicsElement).getBBox();
      return { x, y, width, height };
    })));
    const before = await geometry();
    await page.getByRole("button", { name: "更新数据", exact: true }).click();
    if (motion === "no-preference") await page.waitForTimeout(160);
    const middle = await geometry();
    expect(Math.abs(middle[1]!.y + middle[1]!.height - middle[0]!.y)).toBeLessThan(2);
    if (motion === "no-preference") await page.waitForTimeout(1200);
    const after = await geometry();
    const values = [0, 1].map(revision => Number(makeCategoryFixtures(revision).find(fixture => fixture.id === "knowledge")!.rows[0]!.covered));
    expect(after[0]!.height / before[0]!.height).toBeCloseTo(values[1]! / values[0]!, 2);
    if (motion === "no-preference") {
      expect(middle[0]!.height).toBeGreaterThan(Math.min(before[0]!.height, after[0]!.height));
      expect(middle[0]!.height).toBeLessThan(Math.max(before[0]!.height, after[0]!.height));
    } else {
      expect(middle).toEqual(after);
    }
    await page.getByRole("button", { name: "反转类别顺序" }).click();
    if (motion === "no-preference") await page.waitForTimeout(160);
    const reorderMiddle = await geometry();
    if (motion === "no-preference") await page.waitForTimeout(1200);
    const reorderAfter = await geometry();
    expect(reorderAfter[0]!.x).toBeGreaterThan(after[0]!.x);
    expect(reorderAfter[0]!.height).toBeCloseTo(after[0]!.height, 2);
    if (motion === "no-preference") {
      expect(reorderMiddle[0]!.x).toBeGreaterThan(after[0]!.x);
      expect(reorderMiddle[0]!.x).toBeLessThan(reorderAfter[0]!.x);
    } else {
      expect(reorderMiddle).toEqual(reorderAfter);
    }
    await expect(covered).toHaveCount(1);
    await expect(uncovered).toHaveCount(1);
    expect(errors).toEqual([]);
    const evidence = "evidence/runtime/chart-business-expansion/p3/browser";
    await mkdir(evidence, { recursive: true });
    await writeFile(`${evidence}/stack-motion-${motion}.json`, JSON.stringify({ motion, before, middle, after, reorderMiddle, reorderAfter, stableIdentity: true, pageErrors: errors }, null, 2));
  });
}
