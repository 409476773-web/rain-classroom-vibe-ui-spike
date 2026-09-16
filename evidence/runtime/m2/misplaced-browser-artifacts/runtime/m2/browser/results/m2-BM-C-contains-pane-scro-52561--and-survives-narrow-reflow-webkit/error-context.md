# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: m2.spec.ts >> BM-C contains pane scrolling, restores collapse focus and survives narrow reflow
- Location: tests/e2e/m2.spec.ts:44:1

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByRole('button', { name: '展开评分', exact: true })
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for getByRole('button', { name: '展开评分', exact: true })
    14 × locator resolved to <button type="button" data-slot="root" data-size="medium" data-tone="default" data-focus="control" data-state="default" aria-expanded="false" data-density="default" data-variant="tertiary" data-rain-id="ui-button" aria-controls="bm-c-inspector" class="rain-button box-border relative inline-flex flex-none items-center justify-center py-rain-0 overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-button font-rain-button no-underline tran…>…</button>
       - unexpected value "inactive"

```

```yaml
- button "展开评分"
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { join } from "node:path";
  4   | 
  5   | let errors: string[];
  6   | test.beforeEach(async ({ page }) => { errors = []; page.on("pageerror", error => errors.push(error.message)); page.on("console", message => { if (message.type() === "error") errors.push(message.text()); }); });
  7   | test.afterEach(() => expect(errors).toEqual([]));
  8   | const directory = (project: string) => { const path = join(process.env.RAIN_M2_EVIDENCE!, project); mkdirSync(path, { recursive: true }); return path; };
  9   | 
  10  | test("BM-C keeps paper, traversal, group position and unsaved drafts", async ({ page }) => {
  11  |   await page.goto("/#bm-c");
  12  |   const score = page.getByRole("textbox", { name: "本题得分", exact: true });
  13  |   await score.fill("8.5");
  14  |   await page.getByRole("textbox", { name: "评语（选填）", exact: true }).fill("补充适用条件");
  15  |   await page.getByRole("button", { name: "下一位", exact: true }).click();
  16  |   await expect(score).toHaveValue("");
  17  |   await page.getByRole("button", { name: "上一位", exact: true }).click();
  18  |   await expect(score).toHaveValue("8.5");
  19  |   await page.getByRole("button", { name: "按人批改", exact: true }).click();
  20  |   await expect(page.getByRole("heading", { name: "示例学生 01 · 第 1 题", exact: true })).toBeVisible();
  21  |   await page.getByRole("button", { name: "下一题", exact: true }).click();
  22  |   await page.getByRole("button", { name: "下一题", exact: true }).click();
  23  |   await expect(page.getByRole("button", { name: "下一题", exact: true })).toBeDisabled();
  24  |   await page.getByRole("button", { name: "B 卷", exact: true }).click(); await expect(score).toHaveValue("");
  25  |   await page.getByRole("button", { name: "A 卷", exact: true }).click(); await expect(score).toHaveValue("8.5");
  26  |   await expect(page.getByRole("textbox", { name: "评语（选填）", exact: true })).toHaveValue("补充适用条件");
  27  | });
  28  | 
  29  | test("BM-C failure stays on the same answer; zero saves and only success advances", async ({ page }) => {
  30  |   await page.goto("/#bm-c");
  31  |   const score = page.getByRole("textbox", { name: "本题得分", exact: true });
  32  |   await score.fill("10.5"); await page.getByRole("button", { name: "保存并下一位", exact: true }).click(); await expect(score).toBeFocused(); await expect(score).toHaveAttribute("aria-invalid", "true");
  33  |   await score.fill("0"); await page.getByText("演示设置", { exact: true }).click(); await page.getByText("下次保存失败", { exact: true }).click();
  34  |   await page.getByRole("button", { name: "保存并下一位", exact: true }).click();
  35  |   await expect(page.getByRole("button", { name: "B 卷", exact: true })).toBeDisabled();
  36  |   await expect(page.getByRole("alert")).toBeFocused(); await expect(score).toHaveValue("0");
  37  |   await expect(page.getByRole("heading", { name: "示例学生 01 · 第 1 题", exact: true })).toBeVisible();
  38  |   await page.getByRole("button", { name: "重试并下一位", exact: true }).click();
  39  |   await expect(page.getByRole("heading", { name: "示例学生 02 · 第 1 题", exact: true })).toBeFocused();
  40  |   await page.getByRole("button", { name: "上一位", exact: true }).click(); await expect(score).toHaveValue("0");
  41  |   await expect(page.getByRole("button", { name: "选择 示例学生 01 第 1 题", exact: true })).toContainText("0 分");
  42  | });
  43  | 
  44  | test("BM-C contains pane scrolling, restores collapse focus and survives narrow reflow", async ({ page }, info) => {
  45  |   await page.setViewportSize({ width: 1280, height: 720 }); await page.goto("/#bm-c");
  46  |   const score = page.getByRole("textbox", { name: "本题得分", exact: true }), comment = page.getByRole("textbox", { name: "评语（选填）", exact: true });
  47  |   await score.fill("8"); await comment.fill("这是一条保留在作答对象中的草稿。".repeat(30));
  48  |   await page.getByRole("region", { name: "评分面板", exact: true }).getByRole("button", { name: "收起评分", exact: true }).click();
> 49  |   await expect(page.getByRole("button", { name: "展开评分", exact: true })).toBeFocused();
      |                                                                         ^ Error: expect(locator).toBeFocused() failed
  50  |   await page.getByText("加宽评分区", { exact: true }).click(); await page.getByRole("button", { name: "展开评分", exact: true }).click(); await expect(score).toHaveValue("8");
  51  |   await page.getByRole("region", { name: "批改目录", exact: true }).getByRole("button", { name: "收起目录", exact: true }).click();
  52  |   await expect(page.getByRole("button", { name: "展开目录", exact: true })).toBeFocused(); await page.getByRole("button", { name: "展开目录", exact: true }).click();
  53  |   const facts = await page.evaluate(() => {
  54  |     const answer = document.querySelector<HTMLElement>(".bm-c-answer")!, nav = document.querySelector<HTMLElement>(".bm-c-context nav")!, footer = document.querySelector<HTMLElement>(".bm-c-grade-footer")!;
  55  |     return { viewport: innerHeight, document: document.documentElement.scrollHeight, navHeight: nav.clientHeight, navScroll: nav.scrollHeight, navOverflow: getComputedStyle(nav).overflowY, answerOverflow: getComputedStyle(answer).overflowY, footerBottom: footer.getBoundingClientRect().bottom, overflow: document.documentElement.scrollWidth - innerWidth };
  56  |   });
  57  |   expect(facts.document).toBeLessThanOrEqual(facts.viewport + 1); expect(facts.navOverflow).toBe("auto"); expect(facts.answerOverflow).toBe("auto"); expect(facts.footerBottom).toBeLessThanOrEqual(facts.viewport); expect(facts.overflow).toBeLessThanOrEqual(1);
  58  |   await page.screenshot({ path: join(directory(info.project.name), "bm-c-desktop.png"), fullPage: true });
  59  |   await page.setViewportSize({ width: 390, height: 844 }); await expect(score).toHaveValue("8");
  60  |   await page.getByRole("button", { name: "切换深色", exact: true }).click();
  61  |   await expect(comment).toHaveValue("这是一条保留在作答对象中的草稿。".repeat(30));
  62  |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  63  |   await page.screenshot({ path: join(directory(info.project.name), "bm-c-narrow-dark.png"), fullPage: true });
  64  |   writeFileSync(join(directory(info.project.name), "bm-c-geometry.json"), JSON.stringify(facts, null, 2));
  65  | });
  66  | 
  67  | test("BM-C filters and clears an empty directory without losing a draft", async ({ page }) => {
  68  |   await page.goto("/#bm-c"); await page.getByRole("textbox", { name: "本题得分", exact: true }).fill("8.5");
  69  |   const search = page.getByRole("textbox", { name: "查找批改对象", exact: true }); await search.fill("不存在");
  70  |   await expect(page.getByRole("heading", { name: "没有匹配的批改对象", exact: true })).toBeVisible();
  71  |   await page.getByRole("button", { name: "清空筛选", exact: true }).click(); await expect(page.getByRole("textbox", { name: "本题得分", exact: true })).toHaveValue("8.5");
  72  | });
  73  | 
  74  | test("BM-D full-range metrics survive pagination and chart selection with separate numeric fonts", async ({ page }, info) => {
  75  |   await page.goto("/#bm-d");
  76  |   const metrics = page.getByRole("region", { name: "关键指标", exact: true }); const values = metrics.locator('[data-slot="value"]');
  77  |   await expect(values).toHaveText(["312", "252", "80.9", "80.8%"]);
  78  |   await page.getByRole("button", { name: "下一页", exact: true }).click(); await page.getByRole("button", { name: "第 4 周", exact: true }).click();
  79  |   await expect(values).toHaveText(["312", "252", "80.9", "80.8%"]);
  80  |   await expect(page.getByRole("status", { name: "趋势读数", exact: true })).toContainText("第 4 周");
  81  |   const facts = await page.evaluate(() => ({
  82  |     values: [...document.querySelectorAll('.bm-d-statistic [data-slot="value"]')].map(node => ({ font: getComputedStyle(node).fontFamily, weight: getComputedStyle(node).fontWeight })),
  83  |     units: [...document.querySelectorAll('.bm-d-statistic [data-slot="unit"]')].map(node => getComputedStyle(node).fontFamily),
  84  |     bodyFont: getComputedStyle(document.querySelector('.bm-d-details td')!).fontFamily,
  85  |     actualLineSeedAvailable: document.fonts.check('36px "LINE Seed JP App_OTF"'),
  86  |   }));
  87  |   expect(facts.values.every(value => value.font.includes("LINE Seed") && value.weight === "700")).toBe(true); expect(facts.units.every(font => font.includes("PingFang"))).toBe(true); expect(facts.bodyFont).toContain("PingFang");
  88  |   await page.screenshot({ path: join(directory(info.project.name), "bm-d-desktop.png"), fullPage: true });
  89  |   writeFileSync(join(directory(info.project.name), "bm-d-fonts.json"), JSON.stringify(facts, null, 2));
  90  | });
  91  | 
  92  | test("BM-D filters the source, distinguishes chart state and recovers from failure and empty", async ({ page }) => {
  93  |   await page.goto("/#bm-d"); await page.getByRole("button", { name: "二班", exact: true }).click();
  94  |   await expect(page.getByRole("region", { name: "关键指标" }).locator('[data-slot="value"]')).toHaveText(["156", "129", "81.9", "82.7%"]);
  95  |   await page.getByRole("button", { name: "提交率", exact: true }).click(); await expect(page.getByRole("status", { name: "趋势读数" })).toContainText("提交率");
  96  |   await page.getByText("演示设置", { exact: true }).click(); await page.getByText("下次加载失败", { exact: true }).click(); await page.getByRole("button", { name: "刷新报告", exact: true }).click();
  97  |   await expect(page.getByRole("region", { name: "关键指标" })).toHaveCount(0); await expect(page.getByRole("alert")).toBeFocused();
  98  |   await page.getByRole("button", { name: "重试加载", exact: true }).click(); await expect(page.getByRole("region", { name: "关键指标" })).toBeVisible();
  99  |   await page.getByRole("button", { name: "预览空数据", exact: true }).click(); await expect(page.getByRole("heading", { name: "暂无报告数据" })).toBeVisible();
  100 |   await page.getByRole("button", { name: "恢复示例数据", exact: true }).click(); await expect(page.getByRole("region", { name: "关键指标" })).toBeVisible();
  101 | });
  102 | 
  103 | test("BM-D narrow dark report retains readable equivalent data and keyboard access", async ({ page }, info) => {
  104 |   await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/#bm-d");
  105 |   await page.getByRole("button", { name: "切换深色", exact: true }).click();
  106 |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  107 |   const week = page.getByRole("button", { name: "第 4 周", exact: true }); await week.focus(); await page.keyboard.press("Enter");
  108 |   await expect(week).toHaveAttribute("aria-pressed", "true"); await expect(page.getByRole("table")).toBeVisible();
  109 |   await page.screenshot({ path: join(directory(info.project.name), "bm-d-narrow-dark.png"), fullPage: true });
  110 | });
  111 | 
```