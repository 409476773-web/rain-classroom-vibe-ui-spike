# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: learning-report-a.spec.ts >> report V2 preserves filter scope, keyboard readings and recovery
- Location: tests/e2e/learning-report-a.spec.ts:9:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5369/#learning-report
Call log:
  - navigating to "http://127.0.0.1:5369/#learning-report", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { contrastRatio } from "./color-contrast";
  4   | 
  5   | const origin = "http://127.0.0.1:5369";
  6   | const evidence = "evidence/runtime/learning-report-a/v2-feedback";
  7   | test.beforeAll(() => mkdirSync(evidence, { recursive: true }));
  8   | 
  9   | test("report V2 preserves filter scope, keyboard readings and recovery", async ({ page }) => {
  10  |   const errors: string[] = [];
  11  |   page.on("pageerror", error => errors.push(error.message));
> 12  |   await page.goto(`${origin}/#learning-report`);
      |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5369/#learning-report
  13  |   const metrics = page.getByRole("region", { name: "关键指标", exact: true });
  14  |   const gaps = page.getByRole("region", { name: "提交缺口", exact: true });
  15  |   await expect(metrics).toContainText("80.9");
  16  |   await expect(page.getByRole("table", { name: "周度明细" }).getByRole("row")).toHaveCount(13);
  17  |   await expect(gaps).toContainText("46.7%");
  18  |   const comparisonBefore = await page.getByRole("region", { name: "班级对照", exact: true }).textContent();
  19  |   await page.getByRole("button", { name: "统计口径", exact: true }).click();
  20  |   await expect(page.getByRole("dialog")).toContainText("按已交份数加权");
  21  |   await page.keyboard.press("Escape");
  22  |   await expect(page.getByRole("button", { name: "统计口径", exact: true })).toBeFocused();
  23  |   await page.getByRole("button", { name: "趋势说明", exact: true }).click();
  24  |   await expect(page.getByRole("dialog")).toContainText("只影响此趋势图");
  25  |   await page.keyboard.press("Escape");
  26  |   await expect(page.getByRole("button", { name: "趋势说明", exact: true })).toBeFocused();
  27  |   await page.getByRole("radio", { name: "平均分", exact: true }).press("ArrowRight");
  28  |   await expect(page.getByRole("radio", { name: "提交率", exact: true })).toBeChecked();
  29  |   expect(await page.getByRole("region", { name: "班级对照", exact: true }).textContent()).toBe(comparisonBefore);
  30  |   await expect(gaps).toContainText("46.7%");
  31  |   const chart = page.getByRole("application", { name: "提交率趋势图" });
  32  |   await chart.focus(); await chart.press("ArrowRight");
  33  |   await expect(page.getByRole("status", { name: "图表即时读数" })).toBeVisible();
  34  |   const gapChart = page.getByRole("application", { name: "每周未提交份数图" });
  35  |   await expect(gaps.locator('.report-a-gap-label')).toHaveCount(0);
  36  |   await gaps.locator('.recharts-bar-rectangle path').first().hover();
  37  |   await expect(gaps.locator('.report-a-gap-label')).toHaveText('15');
  38  |   await page.mouse.move(0, 0);
  39  |   await expect(gaps.locator('.report-a-gap-label')).toHaveCount(0);
  40  |   await gapChart.focus(); await gapChart.press("ArrowRight");
  41  |   await expect(gaps.locator('.report-a-gap-label')).toHaveCount(1);
  42  |   await expect(page.getByRole("status", { name: "缺口即时读数" })).toBeVisible();
  43  |   await page.getByRole("combobox", { name: "报告周期" }).click();
  44  |   await page.getByRole("option", { name: "第 4–6 周" }).click();
  45  |   await expect(metrics).toContainText("135");
  46  |   await expect(metrics).toContainText("85.1");
  47  |   await expect(gaps).toContainText("第 4–5 周");
  48  |   await expect(gaps).toContainText("21");
  49  |   await page.getByRole("combobox", { name: "报告班级" }).click();
  50  |   await page.getByRole("option", { name: "二班", exact: true }).click();
  51  |   const performance = page.getByRole("region", { name: "班级表现", exact: true });
  52  |   await expect(performance).not.toContainText("高出");
  53  |   await expect(performance).toContainText("88.5%");
  54  |   await expect(page.getByRole("table", { name: "周度明细" }).getByRole("row")).toHaveCount(4);
  55  |   await page.locator(".bm-d-footer summary").click();
  56  |   await page.getByRole("checkbox", { name: "下次加载失败" }).press("Space");
  57  |   await page.getByRole("button", { name: "刷新报告" }).click();
  58  |   await expect(metrics).toHaveCount(0);
  59  |   await expect(page.getByRole("alert")).toContainText("报告加载失败");
  60  |   await expect(page.getByRole("alert")).toBeFocused();
  61  |   await page.getByRole("button", { name: "重试加载" }).click();
  62  |   await expect(performance).toContainText("88.5%");
  63  |   await page.getByRole("button", { name: "预览空数据" }).click();
  64  |   await expect(page.getByRole("heading", { name: "暂无报告数据" })).toBeVisible();
  65  |   await expect(gaps).toHaveCount(0);
  66  |   await page.getByRole("button", { name: "恢复示例数据" }).click();
  67  |   await expect(performance).toContainText("88.5%");
  68  |   expect(errors).toEqual([]);
  69  | });
  70  | 
  71  | test("report V2 keeps three breathable chapters, blue gaps and a locally scrolling mobile table", async ({ page }) => {
  72  |   await page.goto(`${origin}/#learning-report`);
  73  |   const geometries = [];
  74  |   for (const width of [1242, 1154, 920, 390]) {
  75  |     await page.setViewportSize({ width, height: 900 });
  76  |     await page.evaluate(() => document.fonts.ready);
  77  |     const geometry = await page.evaluate(() => {
  78  |       const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
  79  |       const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);
  80  |       const chapterBoxes = [...document.querySelectorAll('[data-slot="report-chapter"]')].map(el => el.getBoundingClientRect().toJSON());
  81  |       return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, chapterBoxes,
  82  |         hero1: rect('.report-a-hero-score').toJSON(), hero2: rect('.report-a-hero-completion').toJSON(),
  83  |         gap: rect('.report-a-gap-visual').toJSON(), insight: rect('.report-a-gap-insight').toJSON(),
  84  |         dataFont: style('.bm-d-statistic [data-slot="value"]').fontFamily, unitFont: style('.bm-d-statistic [data-slot="unit"]').fontFamily,
  85  |         toggle: rect('.bm-d-metric-option').height, compareSize: style('.report-a-comparison-value').fontSize,
  86  |         blue: style('.report-a-gap-start').stopColor,
  87  |         expectedBlue: style('main').getPropertyValue('--rain-category-fill-taglive-solid-1').trim(),
  88  |         tableScroll: document.querySelector('[data-rain-id="ui-table-scroll-area"]')?.scrollWidth ?? 0,
  89  |       };
  90  |     });
  91  |     geometries.push(geometry);
  92  |     expect(geometry.scrollWidth).toBe(width);
  93  |     expect(geometry.chapterBoxes).toHaveLength(3);
  94  |     expect(geometry.chapterBoxes[1].top - geometry.chapterBoxes[0].bottom).toBe(24);
  95  |     expect(geometry.chapterBoxes[2].top - geometry.chapterBoxes[1].bottom).toBe(24);
  96  |     expect(geometry.toggle).toBe(32); expect(geometry.compareSize).toBe('14px');
  97  |     expect(geometry.dataFont).toContain('LINE Seed'); expect(geometry.unitFont).toContain('PingFang');
  98  |     const expectedBlue = geometry.expectedBlue.startsWith('#')
  99  |       ? `rgb(${geometry.expectedBlue.slice(1).match(/../g)!.map(part => parseInt(part, 16)).join(', ')})`
  100 |       : geometry.expectedBlue;
  101 |     expect(geometry.blue).toBe(expectedBlue);
  102 |     if (width > 900) expect(geometry.insight.x).toBeGreaterThan(geometry.gap.right);
  103 |     else expect(geometry.insight.y).toBeGreaterThanOrEqual(geometry.gap.bottom);
  104 |     if (width > 760) expect(geometry.hero1.y).toBe(geometry.hero2.y);
  105 |     else expect(geometry.hero2.y).toBeGreaterThan(geometry.hero1.bottom);
  106 |     await page.screenshot({ path: `${evidence}/${width}.png`, fullPage: true });
  107 |   }
  108 |   await page.setViewportSize({ width: 1115, height: 812 });
  109 |   const details = await page.evaluate(() => {
  110 |     const selectors = ['.report-a-hero-title h3', '.report-a-hero .report-a-note', '#bm-d-trend-title', '.report-a-data-note', '.report-a-scope', '.bm-d-chart-figure figcaption > .report-a-note', '#report-a-comparison-title', '#report-a-gaps-title', '.report-a-gap-advice h4', '.report-a-panel-note', '.report-a-comparison-metric', '.bm-d-details th:nth-child(4)', '.bm-d-details td:nth-child(4)', '.bm-d-details th:nth-child(5)', '.bm-d-details td:nth-child(5)'];
  111 |     return selectors.map(selector => { const el = document.querySelector(selector)!; const s = getComputedStyle(el); return { selector, fontSize: s.fontSize, color: s.color, align: s.textAlign, paddingRight: s.paddingRight, height: el.getBoundingClientRect().height }; });
  112 |   });
```