import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const evidence = process.env.RAIN_CHART_CATEGORY_EVIDENCE_DIR ?? "evidence/runtime/chart-business-expansion/p3/browser";

for (const motion of ["reduce", "no-preference"] as const) {
  test(`${motion}: category business examples keep identity, units and original period dates`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto("/#chart-category");
    await expect(page.getByRole("heading", { level: 1, name: "分类趋势与业务对照" })).toBeVisible();
    await expect(page.locator("[data-category-example]")).toHaveCount(6);
    await expect(page.locator(".rain-category-plot > div > svg")).toHaveCount(6);
    for (const [id, count] of [["semester", 1], ["period", 2]] as const) {
      const fills = page.locator(`[data-category-example="${id}"] path[fill^="url(#area-gradient-"]`);
      await expect(fills).toHaveCount(count);
      await expect.poll(() => fills.evaluateAll(paths => paths.every(path => (path as SVGGraphicsElement).getBBox().height > 10))).toBe(true);
    }
    const score = page.locator('[data-category-example="score"]');
    await expect(score.locator(".series-bar rect")).toHaveCount(4);
    await expect(score.locator(".rain-category-plot").getByText("10分", { exact: true })).toBeVisible();
    await expect.poll(() => score.locator(".series-bar rect").evaluateAll(bars => bars.map(bar => {
      const { y, height } = (bar as SVGGraphicsElement).getBBox();
      return Number((height / (y + height)).toFixed(2));
    }))).toEqual([.62, .71, .78, .86]);
    if (motion === "reduce") {
      await mkdir(evidence, { recursive: true });
      await page.screenshot({ path: `${evidence}/desktop.png`, fullPage: true });
      for (const id of ["semester", "period", "score"]) await page.locator(`[data-category-example="${id}"]`).screenshot({ path: `${evidence}/${id}.png` });
    }
    const college = page.locator('[data-category-example="colleges"]');
    await college.getByText("查看精确数据", { exact: false }).click();
    await expect(college.getByRole("rowheader", { name: "计算机学院", exact: true })).toHaveCount(2);
    await expect(college.getByRole("table")).toContainText("东校区");
    const row = college.locator('[data-category-row="college-0"]');
    await row.evaluate(node => node.setAttribute("data-test-identity", "retained"));
    await page.getByRole("button", { name: "更新数据", exact: true }).click();
    await page.getByRole("button", { name: "反转类别顺序" }).click();
    await expect(row).toHaveAttribute("data-test-identity", "retained");
    await expect(college.locator("tbody tr").first()).toHaveAttribute("data-category-row", "college-3");
    await expect(row).toContainText("44");
    await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("period");
    const period = page.locator('[data-category-example="period"]');
    await period.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(period.getByRole("table")).toBeVisible();
    await expect(period.getByRole("table")).toContainText("2027-01-01");
    await expect(period.getByRole("table")).toContainText("2026-12-25");
    await expect(period.locator('[data-category-row="day-5"]')).toContainText("缺测");
    await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("knowledge");
    await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("zero");
    const knowledge = page.locator('[data-category-example="knowledge"]');
    await knowledge.locator("summary").click();
    await expect(knowledge.getByRole("table")).toContainText("不适用");
    await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("invalid");
    await expect(page.getByRole("alert")).toContainText("无效数据");
    await expect(page.locator(".rain-category-plot svg")).toHaveCount(0);
    await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("empty");
    await expect(knowledge.getByRole("status")).toHaveText("暂无数据");
    await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("single");
    await expect(knowledge.locator(".rain-category-plot > div > svg")).toHaveCount(1);
    expect(await knowledge.locator("svg path").evaluateAll(paths => paths.some(node => /NaN|Infinity|undefined/.test(node.getAttribute("d") ?? "")))).toBe(false);
    expect(errors).toEqual([]);
  });
}

test("missing categories keep discontinuous paths during updates and period tooltip shows both dates", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#chart-category");
  await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
  await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("missing");
  const line = page.locator('[data-category-example="semester"] svg path.visx-linepath[stroke-linecap="round"]').first();
  const area = page.locator('[data-category-example="semester"] path[fill^="url(#area-gradient-"]');
  await expect.poll(async () => ((await line.getAttribute("d"))?.match(/M/g) ?? []).length).toBe(2);
  await expect.poll(async () => ((await area.getAttribute("d"))?.match(/M/g) ?? []).length).toBe(2);
  await page.waitForTimeout(1600);
  await line.evaluate(node => node.setAttribute("data-test-category-path", "retained"));
  const before = await line.getAttribute("d");
  await page.getByRole("button", { name: "更新数据", exact: true }).click();
  await page.waitForTimeout(160);
  const middle = await line.getAttribute("d");
  for (let sample = 0; sample < 6; sample++) {
    const d = await line.getAttribute("d");
    expect((d?.match(/M/g) ?? []).length).toBe(2);
    expect(d).not.toMatch(/NaN|Infinity|undefined/);
    expect(((await area.getAttribute("d"))?.match(/M/g) ?? []).length).toBe(2);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(1100);
  const end = await line.getAttribute("d");
  expect(middle).not.toBe(before);
  expect(middle).not.toBe(end);
  expect(end).not.toBe(before);
  expect((end?.match(/M/g) ?? []).length).toBe(2);
  await expect(line).toHaveAttribute("data-test-category-path", "retained");
  await page.getByRole("button", { name: "更新数据", exact: true }).click();
  await page.waitForTimeout(160);
  await page.getByRole("button", { name: "更新数据", exact: true }).click();
  await page.getByRole("button", { name: "反转类别顺序" }).click();
  await expect.poll(async () => ((await line.getAttribute("d"))?.match(/M/g) ?? []).length).toBe(2);
  await expect(line).toHaveAttribute("data-test-category-path", "retained");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("normal");
  await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("period");
  const svg = page.locator('[data-category-example="period"] svg').first();
  await expect(svg).toBeVisible();
  await svg.scrollIntoViewIfNeeded();
  const box = await svg.boundingBox();
  const tooltip = page.locator(".rain-category-tooltip");
  await expect.poll(async () => {
    await page.mouse.move(box!.x + box!.width / 2, box!.y + 100);
    await page.mouse.move(box!.x + box!.width / 2 + 1, box!.y + 100);
    return (await tooltip.allTextContents()).join("");
  }).toContain("2027-01-01");
  await expect(tooltip).toContainText("2026-12-25");
  await expect.poll(() => tooltip.evaluate(node => Number(getComputedStyle(node).opacity))).toBeGreaterThan(.98);
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: `${evidence}/period-tooltip.png`, fullPage: true });
  const category = page.locator('[data-category-example="period"]');
  await category.locator("summary").click();
  await expect(category.getByRole("table")).toContainText("2027-01-03");
  expect(await page.locator("svg path").evaluateAll(paths => paths.some(node => /NaN|Infinity|undefined/.test(node.getAttribute("d") ?? "")))).toBe(false);
  expect(errors).toEqual([]);
});

test("long categories fit a narrow page through deliberate horizontal scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-category");
  await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("colleges");
  await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("long");
  await page.setViewportSize({ width: 390, height: 900 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const scroll = page.locator(".rain-category-scroll");
  const dimensions = await scroll.evaluate(node => ({ width: node.clientWidth, scrollWidth: node.scrollWidth, overflowX: getComputedStyle(node).overflowX }));
  expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.width);
  expect(dimensions.overflowX).toBe("auto");
  await scroll.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => scroll.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
  await page.locator(".rain-category-data summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("table")).toContainText("跨学科数字教育与教师发展联合培养项目");
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: `${evidence}/narrow-long.png`, fullPage: true });
});
