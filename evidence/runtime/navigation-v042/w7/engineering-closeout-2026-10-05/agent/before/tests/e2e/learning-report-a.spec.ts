import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";

const origin = "http://127.0.0.1:5369";
const evidence = "evidence/runtime/learning-report-a/v2-feedback";
test.beforeAll(() => mkdirSync(evidence, { recursive: true }));

test("report V2 preserves filter scope, keyboard readings and recovery", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(`${origin}/#learning-report`);
  const metrics = page.getByRole("region", { name: "关键指标", exact: true });
  const gaps = page.getByRole("region", { name: "提交缺口", exact: true });
  await expect(metrics).toContainText("80.9");
  await expect(page.getByRole("table", { name: "周度明细" }).getByRole("row")).toHaveCount(13);
  await expect(gaps).toContainText("46.7%");
  const comparisonBefore = await page.getByRole("region", { name: "班级对照", exact: true }).textContent();
  await page.getByRole("button", { name: "统计口径", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("按已交份数加权");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "统计口径", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "趋势说明", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("只影响此趋势图");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "趋势说明", exact: true })).toBeFocused();
  await page.getByRole("radio", { name: "平均分", exact: true }).press("ArrowRight");
  await expect(page.getByRole("radio", { name: "提交率", exact: true })).toBeChecked();
  expect(await page.getByRole("region", { name: "班级对照", exact: true }).textContent()).toBe(comparisonBefore);
  await expect(gaps).toContainText("46.7%");
  const chart = page.getByRole("application", { name: "提交率趋势图" });
  await chart.focus(); await chart.press("ArrowRight");
  await expect(page.getByRole("status", { name: "图表即时读数" })).toBeVisible();
  const gapChart = page.getByRole("application", { name: "每周未提交份数图" });
  await expect(gaps.locator('.report-a-gap-label')).toHaveCount(0);
  await gaps.locator('.recharts-bar-rectangle path').first().hover();
  await expect(gaps.locator('.report-a-gap-label')).toHaveText('15');
  await page.mouse.move(0, 0);
  await expect(gaps.locator('.report-a-gap-label')).toHaveCount(0);
  await gapChart.focus(); await gapChart.press("ArrowRight");
  await expect(gaps.locator('.report-a-gap-label')).toHaveCount(1);
  await expect(page.getByRole("status", { name: "缺口即时读数" })).toBeVisible();
  await page.getByRole("combobox", { name: "报告周期" }).click();
  await page.getByRole("option", { name: "第 4–6 周" }).click();
  await expect(metrics).toContainText("135");
  await expect(metrics).toContainText("85.1");
  await expect(gaps).toContainText("第 4–5 周");
  await expect(gaps).toContainText("21");
  await page.getByRole("combobox", { name: "报告班级" }).click();
  await page.getByRole("option", { name: "二班", exact: true }).click();
  const performance = page.getByRole("region", { name: "班级表现", exact: true });
  await expect(performance).not.toContainText("高出");
  await expect(performance).toContainText("88.5%");
  await expect(page.getByRole("table", { name: "周度明细" }).getByRole("row")).toHaveCount(4);
  await page.locator(".bm-d-footer summary").click();
  await page.getByRole("checkbox", { name: "下次加载失败" }).press("Space");
  await page.getByRole("button", { name: "刷新报告" }).click();
  await expect(metrics).toHaveCount(0);
  await expect(page.getByRole("alert")).toContainText("报告加载失败");
  await expect(page.getByRole("alert")).toBeFocused();
  await page.getByRole("button", { name: "重试加载" }).click();
  await expect(performance).toContainText("88.5%");
  await page.getByRole("button", { name: "预览空数据" }).click();
  await expect(page.getByRole("heading", { name: "暂无报告数据" })).toBeVisible();
  await expect(gaps).toHaveCount(0);
  await page.getByRole("button", { name: "恢复示例数据" }).click();
  await expect(performance).toContainText("88.5%");
  expect(errors).toEqual([]);
});

test("report V2 keeps three breathable chapters, blue gaps and a locally scrolling mobile table", async ({ page }) => {
  await page.goto(`${origin}/#learning-report`);
  const geometries = [];
  for (const width of [1242, 1154, 920, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
      const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);
      const chapterBoxes = [...document.querySelectorAll('[data-slot="report-chapter"]')].map(el => el.getBoundingClientRect().toJSON());
      return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, chapterBoxes,
        hero1: rect('.report-a-hero-score').toJSON(), hero2: rect('.report-a-hero-completion').toJSON(),
        gap: rect('.report-a-gap-visual').toJSON(), insight: rect('.report-a-gap-insight').toJSON(),
        dataFont: style('.bm-d-statistic [data-slot="value"]').fontFamily, unitFont: style('.bm-d-statistic [data-slot="unit"]').fontFamily,
        toggle: rect('.bm-d-metric-option').height, compareSize: style('.report-a-comparison-value').fontSize,
        blue: style('.report-a-gap-start').stopColor,
        expectedBlue: style('main').getPropertyValue('--rain-category-fill-taglive-solid-1').trim(),
        tableScroll: document.querySelector('[data-rain-id="ui-table-scroll-area"]')?.scrollWidth ?? 0,
      };
    });
    geometries.push(geometry);
    expect(geometry.scrollWidth).toBe(width);
    expect(geometry.chapterBoxes).toHaveLength(3);
    expect(geometry.chapterBoxes[1].top - geometry.chapterBoxes[0].bottom).toBe(24);
    expect(geometry.chapterBoxes[2].top - geometry.chapterBoxes[1].bottom).toBe(24);
    expect(geometry.toggle).toBe(32); expect(geometry.compareSize).toBe('14px');
    expect(geometry.dataFont).toContain('LINE Seed'); expect(geometry.unitFont).toContain('PingFang');
    const expectedBlue = geometry.expectedBlue.startsWith('#')
      ? `rgb(${geometry.expectedBlue.slice(1).match(/../g)!.map(part => parseInt(part, 16)).join(', ')})`
      : geometry.expectedBlue;
    expect(geometry.blue).toBe(expectedBlue);
    if (width > 900) expect(geometry.insight.x).toBeGreaterThan(geometry.gap.right);
    else expect(geometry.insight.y).toBeGreaterThanOrEqual(geometry.gap.bottom);
    if (width > 760) expect(geometry.hero1.y).toBe(geometry.hero2.y);
    else expect(geometry.hero2.y).toBeGreaterThan(geometry.hero1.bottom);
    await page.screenshot({ path: `${evidence}/${width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1115, height: 812 });
  const details = await page.evaluate(() => {
    const selectors = ['.report-a-hero-title h3', '.report-a-hero .report-a-note', '#bm-d-trend-title', '.report-a-data-note', '.report-a-scope', '.bm-d-chart-figure figcaption > .report-a-note', '#report-a-comparison-title', '#report-a-gaps-title', '.report-a-gap-advice h4', '.report-a-panel-note', '.report-a-comparison-metric', '.bm-d-details th:nth-child(4)', '.bm-d-details td:nth-child(4)', '.bm-d-details th:nth-child(5)', '.bm-d-details td:nth-child(5)'];
    return selectors.map(selector => { const el = document.querySelector(selector)!; const s = getComputedStyle(el); return { selector, fontSize: s.fontSize, color: s.color, align: s.textAlign, paddingRight: s.paddingRight, height: el.getBoundingClientRect().height }; });
  });
  writeFileSync(`${evidence}/annotation-details.json`, JSON.stringify(details, null, 2));
  const colors = await page.evaluate(() => ['.report-a-scope', '.report-a-data-note', '.bm-d-details .report-a-denominator', '.recharts-cartesian-axis-tick-value', '.report-a-note', '.report-a-comparison-value'].map(selector => ({
    selector, foreground: getComputedStyle(document.querySelector(selector)!).color,
    background: getComputedStyle(document.querySelector(selector === '.report-a-scope' ? 'main' : '.report-a-chapter')!).backgroundColor,
    parent: getComputedStyle(document.querySelector('main')!).backgroundColor,
  })));
  writeFileSync(`${evidence}/geometry.json`, JSON.stringify(geometries, null, 2));
  writeFileSync(`${evidence}/contrast.json`, JSON.stringify(colors.map(reading => ({ ...reading, ratio: contrastRatio(reading.foreground, reading.background, reading.parent), minimum: 4.5, acceptance: 'not-granted' })), null, 2));
  await page.locator('.bm-d-footer summary').click();
  await page.getByRole('button', { name: '切换深色' }).click();
  await expect(page.locator('main')).toHaveAttribute('data-rain-theme', 'dark');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${evidence}/dark.png`, fullPage: true });
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.getByRole('radio', { name: '平均分', exact: true }).press('ArrowRight');
  await expect(page.getByRole('radio', { name: '提交率', exact: true })).toBeChecked();
  await page.screenshot({ path: `${evidence}/forced-colors.png`, fullPage: true });
  await page.emulateMedia({ forcedColors: 'none' });
  await page.goto(`${origin}/#bm-d`);
  await expect(page.locator('main')).toHaveAttribute('data-presentation', 'original');
  await expect(page.getByRole('combobox', { name: '固定对照' })).toBeVisible();
  await expect(page.getByRole('table').getByRole('row')).toHaveCount(13);
});
