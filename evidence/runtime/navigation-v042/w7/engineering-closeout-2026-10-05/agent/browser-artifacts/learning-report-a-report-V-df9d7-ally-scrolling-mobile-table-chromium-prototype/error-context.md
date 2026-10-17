# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: learning-report-a.spec.ts >> report V2 keeps three breathable chapters, blue gaps and a locally scrolling mobile table
- Location: ../../../Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/tests/e2e/learning-report-a.spec.ts:70:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rgb(57 159 255)"
Received: "rgb(57, 159, 255)"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e4]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]: 教学分析
        - heading "大学物理 · 学习报告" [level=1] [ref=e11]
        - button "统计口径" [ref=e12] [cursor=pointer]
      - link "进入作业批改" [ref=e15] [cursor=pointer]:
        - /url: "#teacher-grading"
    - generic [ref=e20]:
      - region "统计范围" [ref=e21]:
        - generic [ref=e22]:
          - generic [ref=e24]:
            - generic [ref=e25]:
              - generic [ref=e26]:
                - generic "报告班级" [ref=e27]
                - combobox "报告班级" [ref=e29] [cursor=pointer]:
                  - generic "全部班级" [ref=e31]
              - generic [ref=e35]: 已选：全部班级
            - textbox [ref=e36]: 全部班级
          - generic [ref=e38]:
            - generic [ref=e39]:
              - generic [ref=e40]:
                - generic "报告周期" [ref=e41]
                - combobox "报告周期" [ref=e43] [cursor=pointer]:
                  - generic "第 1–6 周" [ref=e45]
              - generic [ref=e49]: 已选：第 1–6 周
            - textbox [ref=e50]: all
        - paragraph [ref=e51]: 全部班级 · 第 1–6 周 · 12 条周度汇总
        - button "刷新报告" [ref=e52] [cursor=pointer]:
          - generic [ref=e55]: 刷新
      - region [ref=e56]:
        - generic [ref=e57]:
          - heading "本期学习概览" [level=2] [ref=e59]
          - generic [ref=e60]: 全部班级 · 第 1–6 周
        - region "关键指标" [ref=e61]:
          - region "成绩表现" [ref=e62]:
            - heading "成绩表现" [level=3] [ref=e66]
            - generic [ref=e67]:
              - generic [ref=e68]:
                - term [ref=e69]: 本期平均分
                - definition [ref=e70]:
                  - generic [ref=e71]: "80.9"
                  - generic [ref=e72]: 分
                - definition [ref=e73]: 按已交份数加权
              - generic [ref=e74]:
                - term [ref=e75]: 首末周变化
                - definition [ref=e76]:
                  - strong [ref=e77]: "+15.0"
                  - generic [ref=e78]: 分
                - definition [ref=e79]: 第 1 → 6 周
          - region "作业完成" [ref=e80]:
            - heading "作业完成" [level=3] [ref=e84]
            - generic [ref=e85]:
              - generic [ref=e87]:
                - term [ref=e88]: 本期提交率
                - definition [ref=e89]:
                  - generic [ref=e90]: 80.8%
              - generic [ref=e91]:
                - paragraph [ref=e92]:
                  - generic [ref=e93]:
                    - text: 已交
                    - strong [ref=e94]: "252"
                    - generic [ref=e95]: / 312 份
                - paragraph [ref=e98]:
                  - generic [ref=e99]: 未提交
                  - generic [ref=e100]: 60 份
        - region [ref=e101]:
          - generic [ref=e102]:
            - generic [ref=e103]:
              - generic [ref=e104]:
                - heading "整体变化" [level=3] [ref=e105]
                - button "趋势说明" [ref=e106] [cursor=pointer]
              - radiogroup "图表指标" [ref=e109]:
                - generic [ref=e111]:
                  - generic [ref=e112] [cursor=pointer]:
                    - radio "平均分" [checked] [ref=e113]
                    - generic: 平均分
                  - generic [ref=e114] [cursor=pointer]:
                    - radio "提交率" [ref=e115]
                    - generic: 提交率
            - figure "总体 · 平均分 满分 100 分" [ref=e116]:
              - generic [ref=e117]:
                - generic [ref=e118]: 总体 · 平均分
                - generic [ref=e122]: 满分 100 分
              - application "平均分趋势图" [ref=e126]:
                - generic [ref=e147]:
                  - generic [ref=e148]:
                    - generic [ref=e149]: 第1周
                    - generic [ref=e151]: 第2周
                    - generic [ref=e153]: 第3周
                    - generic [ref=e155]: 第4周
                    - generic [ref=e157]: 第5周
                    - generic [ref=e159]: 第6周
                  - generic [ref=e161]:
                    - generic [ref=e162]: "0"
                    - generic [ref=e164]: "25"
                    - generic [ref=e166]: "50"
                    - generic [ref=e168]: "75"
                    - generic [ref=e170]: "100"
                  - generic [ref=e172]:
                    - generic [ref=e173]: "73.0"
                    - generic [ref=e174]: "88.0"
      - region [ref=e175]:
        - generic [ref=e176]:
          - heading "班级与提交分析" [level=2] [ref=e178]
          - generic [ref=e179]: 第 1–6 周
        - region [ref=e180]:
          - heading "班级对照" [level=3] [ref=e181]
          - generic [ref=e182]:
            - generic [ref=e183]:
              - heading "平均分（分）" [level=4] [ref=e184]
              - generic [ref=e185]:
                - generic [ref=e186]:
                  - generic [ref=e187]: 一班
                  - strong [ref=e190]: "79.9"
                - generic [ref=e191]:
                  - generic [ref=e192]: 二班
                  - strong [ref=e195]: "81.9"
              - paragraph [ref=e196]:
                - text: 二班高出
                - strong [ref=e197]: "2.0"
                - text: 分
            - generic [ref=e198]:
              - heading "提交率（%）" [level=4] [ref=e199]
              - generic [ref=e200]:
                - generic [ref=e201]:
                  - generic [ref=e202]: 一班
                  - strong [ref=e205]: 78.8%
                - generic [ref=e206]:
                  - generic [ref=e207]: 二班
                  - strong [ref=e210]: 82.7%
              - paragraph [ref=e211]:
                - text: 二班高出
                - strong [ref=e212]: "3.8"
                - text: 个百分点
        - region [ref=e213]:
          - generic [ref=e214]:
            - generic [ref=e215]:
              - heading "提交缺口" [level=3] [ref=e216]
              - generic [ref=e217]: 未提交作业份数
            - figure "第 1 周：15 份未提交；第 2 周：13 份未提交；第 3 周：11 份未提交；第 4 周：9 份未提交；第 5 周：7 份未提交；第 6 周：5 份未提交" [ref=e218]:
              - application "每周未提交份数图" [ref=e223]:
                - generic [ref=e249]:
                  - generic [ref=e250]:
                    - generic [ref=e251]: 第1周
                    - generic [ref=e253]: 第2周
                    - generic [ref=e255]: 第3周
                    - generic [ref=e257]: 第4周
                    - generic [ref=e259]: 第5周
                    - generic [ref=e261]: 第6周
                  - generic [ref=e263]:
                    - generic [ref=e264]: "0"
                    - generic [ref=e266]: "5"
                    - generic [ref=e268]: "10"
                    - generic [ref=e270]: "15"
                    - generic [ref=e272]: "20"
          - complementary "缺口解读" [ref=e274]:
            - generic [ref=e275]:
              - paragraph [ref=e276]: 本期未提交
              - paragraph [ref=e277]:
                - strong [ref=e278]: "60"
                - generic [ref=e279]: 份
            - generic [ref=e280]:
              - paragraph [ref=e281]:
                - text: 第 1–2 周占
                - strong [ref=e282]: 46.7%
              - paragraph [ref=e283]: 28 / 60 份
            - generic [ref=e284]:
              - heading "核查建议" [level=4] [ref=e285]
              - paragraph [ref=e286]: 先核对第 1–2 周的未提交情况，再确认是否需要跟进。
      - region [ref=e287]:
        - generic [ref=e288]:
          - heading "周度明细" [level=2] [ref=e290]
          - generic [ref=e291]: 共 12 条
        - region "报告明细滚动区" [ref=e293]:
          - table "周度明细" [ref=e294]:
            - caption [ref=e295]: 当前筛选范围的全部周度汇总，按作业份数统计。
            - rowgroup [ref=e296]:
              - row [ref=e297]:
                - columnheader "周次" [ref=e298]
                - columnheader "班级" [ref=e299]
                - columnheader "已交 / 应交" [ref=e300]
                - columnheader "未提交" [ref=e301]
                - columnheader "平均分（分）" [ref=e302]
                - columnheader "提交率" [ref=e303]
            - rowgroup [ref=e304]:
              - row [ref=e305]:
                - cell "第 1 周" [ref=e306]
                - cell "一班" [ref=e308]
                - cell "18 / 26" [ref=e310]:
                  - strong [ref=e311]: "18"
                  - generic [ref=e312]: / 26
                - cell "8" [ref=e313]
                - cell "72.0" [ref=e314]
                - cell "69.2%" [ref=e315]
              - row [ref=e320]:
                - cell "第 1 周" [ref=e321]
                - cell "二班" [ref=e323]
                - cell "19 / 26" [ref=e325]:
                  - strong [ref=e326]: "19"
                  - generic [ref=e327]: / 26
                - cell "7" [ref=e328]
                - cell "74.0" [ref=e329]
                - cell "73.1%" [ref=e330]
              - row [ref=e335]:
                - cell "第 2 周" [ref=e336]
                - cell "一班" [ref=e338]
                - cell "19 / 26" [ref=e340]:
                  - strong [ref=e341]: "19"
                  - generic [ref=e342]: / 26
                - cell "7" [ref=e343]
                - cell "75.0" [ref=e344]
                - cell "73.1%" [ref=e345]
              - row [ref=e350]:
                - cell "第 2 周" [ref=e351]
                - cell "二班" [ref=e353]
                - cell "20 / 26" [ref=e355]:
                  - strong [ref=e356]: "20"
                  - generic [ref=e357]: / 26
                - cell "6" [ref=e358]
                - cell "77.0" [ref=e359]
                - cell "76.9%" [ref=e360]
              - row [ref=e365]:
                - cell "第 3 周" [ref=e366]
                - cell "一班" [ref=e368]
                - cell "20 / 26" [ref=e370]:
                  - strong [ref=e371]: "20"
                  - generic [ref=e372]: / 26
                - cell "6" [ref=e373]
                - cell "78.0" [ref=e374]
                - cell "76.9%" [ref=e375]
              - row [ref=e380]:
                - cell "第 3 周" [ref=e381]
                - cell "二班" [ref=e383]
                - cell "21 / 26" [ref=e385]:
                  - strong [ref=e386]: "21"
                  - generic [ref=e387]: / 26
                - cell "5" [ref=e388]
                - cell "80.0" [ref=e389]
                - cell "80.8%" [ref=e390]
              - row [ref=e395]:
                - cell "第 4 周" [ref=e396]
                - cell "一班" [ref=e398]
                - cell "21 / 26" [ref=e400]:
                  - strong [ref=e401]: "21"
                  - generic [ref=e402]: / 26
                - cell "5" [ref=e403]
                - cell "81.0" [ref=e404]
                - cell "80.8%" [ref=e405]
              - row [ref=e410]:
                - cell "第 4 周" [ref=e411]
                - cell "二班" [ref=e413]
                - cell "22 / 26" [ref=e415]:
                  - strong [ref=e416]: "22"
                  - generic [ref=e417]: / 26
                - cell "4" [ref=e418]
                - cell "83.0" [ref=e419]
                - cell "84.6%" [ref=e420]
              - row [ref=e425]:
                - cell "第 5 周" [ref=e426]
                - cell "一班" [ref=e428]
                - cell "22 / 26" [ref=e430]:
                  - strong [ref=e431]: "22"
                  - generic [ref=e432]: / 26
                - cell "4" [ref=e433]
                - cell "84.0" [ref=e434]
                - cell "84.6%" [ref=e435]
              - row [ref=e440]:
                - cell "第 5 周" [ref=e441]
                - cell "二班" [ref=e443]
                - cell "23 / 26" [ref=e445]:
                  - strong [ref=e446]: "23"
                  - generic [ref=e447]: / 26
                - cell "3" [ref=e448]
                - cell "86.0" [ref=e449]
                - cell "88.5%" [ref=e450]
              - row [ref=e455]:
                - cell "第 6 周" [ref=e456]
                - cell "一班" [ref=e458]
                - cell "23 / 26" [ref=e460]:
                  - strong [ref=e461]: "23"
                  - generic [ref=e462]: / 26
                - cell "3" [ref=e463]
                - cell "87.0" [ref=e464]
                - cell "88.5%" [ref=e465]
              - row [ref=e470]:
                - cell "第 6 周" [ref=e471]
                - cell "二班" [ref=e473]
                - cell "24 / 26" [ref=e475]:
                  - strong [ref=e476]: "24"
                  - generic [ref=e477]: / 26
                - cell "2" [ref=e478]
                - cell "89.0" [ref=e479]
                - cell "92.3%" [ref=e480]
        - paragraph [ref=e485]: 示例数据：以作业份数汇总，非去重人数。未提交不计作零分；无提交或应交为零时，相应指标显示“—”。
      - group [ref=e487]:
        - generic "演示设置" [ref=e488] [cursor=pointer]
  - generic [ref=e489]: "5"
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { contrastRatio } from "./color-contrast";
  4   | 
  5   | const evidence = "evidence/runtime/learning-report-a/v2-feedback";
  6   | test.beforeAll(() => mkdirSync(evidence, { recursive: true }));
  7   | 
  8   | test("report V2 preserves filter scope, keyboard readings and recovery", async ({ page }) => {
  9   |   const errors: string[] = [];
  10  |   page.on("pageerror", error => errors.push(error.message));
  11  |   await page.goto("/#learning-report");
  12  |   const metrics = page.getByRole("region", { name: "关键指标", exact: true });
  13  |   const gaps = page.getByRole("region", { name: "提交缺口", exact: true });
  14  |   await expect(metrics).toContainText("80.9");
  15  |   await expect(page.getByRole("table", { name: "周度明细" }).getByRole("row")).toHaveCount(13);
  16  |   await expect(gaps).toContainText("46.7%");
  17  |   const comparisonBefore = await page.getByRole("region", { name: "班级对照", exact: true }).textContent();
  18  |   await page.getByRole("button", { name: "统计口径", exact: true }).click();
  19  |   await expect(page.getByRole("dialog")).toContainText("按已交份数加权");
  20  |   await page.keyboard.press("Escape");
  21  |   await expect(page.getByRole("button", { name: "统计口径", exact: true })).toBeFocused();
  22  |   await page.getByRole("button", { name: "趋势说明", exact: true }).click();
  23  |   await expect(page.getByRole("dialog")).toContainText("只影响此趋势图");
  24  |   await page.keyboard.press("Escape");
  25  |   await expect(page.getByRole("button", { name: "趋势说明", exact: true })).toBeFocused();
  26  |   await page.getByRole("radio", { name: "平均分", exact: true }).press("ArrowRight");
  27  |   await expect(page.getByRole("radio", { name: "提交率", exact: true })).toBeChecked();
  28  |   expect(await page.getByRole("region", { name: "班级对照", exact: true }).textContent()).toBe(comparisonBefore);
  29  |   await expect(gaps).toContainText("46.7%");
  30  |   const chart = page.getByRole("application", { name: "提交率趋势图" });
  31  |   await chart.focus(); await chart.press("ArrowRight");
  32  |   await expect(page.getByRole("status", { name: "图表即时读数" })).toBeVisible();
  33  |   const gapChart = page.getByRole("application", { name: "每周未提交份数图" });
  34  |   await expect(gaps.locator('.report-a-gap-label')).toHaveCount(0);
  35  |   await gaps.locator('.recharts-bar-rectangle path').first().hover();
  36  |   await expect(gaps.locator('.report-a-gap-label')).toHaveText('15');
  37  |   await page.mouse.move(0, 0);
  38  |   await expect(gaps.locator('.report-a-gap-label')).toHaveCount(0);
  39  |   await gapChart.focus(); await gapChart.press("ArrowRight");
  40  |   await expect(gaps.locator('.report-a-gap-label')).toHaveCount(1);
  41  |   await expect(page.getByRole("status", { name: "缺口即时读数" })).toBeVisible();
  42  |   await page.getByRole("combobox", { name: "报告周期" }).click();
  43  |   await page.getByRole("option", { name: "第 4–6 周" }).click();
  44  |   await expect(metrics).toContainText("135");
  45  |   await expect(metrics).toContainText("85.1");
  46  |   await expect(gaps).toContainText("第 4–5 周");
  47  |   await expect(gaps).toContainText("21");
  48  |   await page.getByRole("combobox", { name: "报告班级" }).click();
  49  |   await page.getByRole("option", { name: "二班", exact: true }).click();
  50  |   const performance = page.getByRole("region", { name: "班级表现", exact: true });
  51  |   await expect(performance).not.toContainText("高出");
  52  |   await expect(performance).toContainText("88.5%");
  53  |   await expect(page.getByRole("table", { name: "周度明细" }).getByRole("row")).toHaveCount(4);
  54  |   await page.locator(".bm-d-footer summary").click();
  55  |   await page.getByRole("checkbox", { name: "下次加载失败" }).press("Space");
  56  |   await page.getByRole("button", { name: "刷新报告" }).click();
  57  |   await expect(metrics).toHaveCount(0);
  58  |   await expect(page.getByRole("alert")).toContainText("报告加载失败");
  59  |   await expect(page.getByRole("alert")).toBeFocused();
  60  |   await page.getByRole("button", { name: "重试加载" }).click();
  61  |   await expect(performance).toContainText("88.5%");
  62  |   await page.getByRole("button", { name: "预览空数据" }).click();
  63  |   await expect(page.getByRole("heading", { name: "暂无报告数据" })).toBeVisible();
  64  |   await expect(gaps).toHaveCount(0);
  65  |   await page.getByRole("button", { name: "恢复示例数据" }).click();
  66  |   await expect(performance).toContainText("88.5%");
  67  |   expect(errors).toEqual([]);
  68  | });
  69  | 
  70  | test("report V2 keeps three breathable chapters, blue gaps and a locally scrolling mobile table", async ({ page }) => {
  71  |   await page.goto("/#learning-report");
  72  |   const geometries = [];
  73  |   for (const width of [1242, 1154, 920, 390]) {
  74  |     await page.setViewportSize({ width, height: 900 });
  75  |     await page.evaluate(() => document.fonts.ready);
  76  |     const geometry = await page.evaluate(() => {
  77  |       const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
  78  |       const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);
  79  |       const chapterBoxes = [...document.querySelectorAll('[data-slot="report-chapter"]')].map(el => el.getBoundingClientRect().toJSON());
  80  |       return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, chapterBoxes,
  81  |         hero1: rect('.report-a-hero-score').toJSON(), hero2: rect('.report-a-hero-completion').toJSON(),
  82  |         gap: rect('.report-a-gap-visual').toJSON(), insight: rect('.report-a-gap-insight').toJSON(),
  83  |         dataFont: style('.bm-d-statistic [data-slot="value"]').fontFamily, unitFont: style('.bm-d-statistic [data-slot="unit"]').fontFamily,
  84  |         toggle: rect('.bm-d-metric-option').height, compareSize: style('.report-a-comparison-value').fontSize,
  85  |         blue: style('.report-a-gap-start').stopColor,
  86  |         expectedBlue: style('main').getPropertyValue('--rain-category-fill-taglive-solid-1').trim(),
  87  |         tableScroll: document.querySelector('[data-rain-id="ui-table-scroll-area"]')?.scrollWidth ?? 0,
  88  |       };
  89  |     });
  90  |     geometries.push(geometry);
  91  |     expect(geometry.scrollWidth).toBe(width);
  92  |     expect(geometry.chapterBoxes).toHaveLength(3);
  93  |     expect(geometry.chapterBoxes[1].top - geometry.chapterBoxes[0].bottom).toBe(24);
  94  |     expect(geometry.chapterBoxes[2].top - geometry.chapterBoxes[1].bottom).toBe(24);
  95  |     expect(geometry.toggle).toBe(32); expect(geometry.compareSize).toBe('14px');
  96  |     expect(geometry.dataFont).toContain('LINE Seed'); expect(geometry.unitFont).toContain('PingFang');
  97  |     const expectedBlue = geometry.expectedBlue.startsWith('#')
  98  |       ? `rgb(${geometry.expectedBlue.slice(1).match(/../g)!.map(part => parseInt(part, 16)).join(', ')})`
  99  |       : geometry.expectedBlue;
> 100 |     expect(geometry.blue).toBe(expectedBlue);
      |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  101 |     if (width > 900) expect(geometry.insight.x).toBeGreaterThan(geometry.gap.right);
  102 |     else expect(geometry.insight.y).toBeGreaterThanOrEqual(geometry.gap.bottom);
  103 |     if (width > 760) expect(geometry.hero1.y).toBe(geometry.hero2.y);
  104 |     else expect(geometry.hero2.y).toBeGreaterThan(geometry.hero1.bottom);
  105 |     await page.screenshot({ path: `${evidence}/${width}.png`, fullPage: true });
  106 |   }
  107 |   await page.setViewportSize({ width: 1115, height: 812 });
  108 |   const details = await page.evaluate(() => {
  109 |     const selectors = ['.report-a-hero-title h3', '.report-a-hero .report-a-note', '#bm-d-trend-title', '.report-a-data-note', '.report-a-scope', '.bm-d-chart-figure figcaption > .report-a-note', '#report-a-comparison-title', '#report-a-gaps-title', '.report-a-gap-advice h4', '.report-a-panel-note', '.report-a-comparison-metric', '.bm-d-details th:nth-child(4)', '.bm-d-details td:nth-child(4)', '.bm-d-details th:nth-child(5)', '.bm-d-details td:nth-child(5)'];
  110 |     return selectors.map(selector => { const el = document.querySelector(selector)!; const s = getComputedStyle(el); return { selector, fontSize: s.fontSize, color: s.color, align: s.textAlign, paddingRight: s.paddingRight, height: el.getBoundingClientRect().height }; });
  111 |   });
  112 |   writeFileSync(`${evidence}/annotation-details.json`, JSON.stringify(details, null, 2));
  113 |   const colors = await page.evaluate(() => ['.report-a-scope', '.report-a-data-note', '.bm-d-details .report-a-denominator', '.recharts-cartesian-axis-tick-value', '.report-a-note', '.report-a-comparison-value'].map(selector => ({
  114 |     selector, foreground: getComputedStyle(document.querySelector(selector)!).color,
  115 |     background: getComputedStyle(document.querySelector(selector === '.report-a-scope' ? 'main' : '.report-a-chapter')!).backgroundColor,
  116 |     parent: getComputedStyle(document.querySelector('main')!).backgroundColor,
  117 |   })));
  118 |   writeFileSync(`${evidence}/geometry.json`, JSON.stringify(geometries, null, 2));
  119 |   writeFileSync(`${evidence}/contrast.json`, JSON.stringify(colors.map(reading => ({ ...reading, ratio: contrastRatio(reading.foreground, reading.background, reading.parent), minimum: 4.5, acceptance: 'not-granted' })), null, 2));
  120 |   await page.locator('.bm-d-footer summary').click();
  121 |   await page.getByRole('button', { name: '切换深色' }).click();
  122 |   await expect(page.locator('main')).toHaveAttribute('data-rain-theme', 'dark');
  123 |   await page.evaluate(() => window.scrollTo(0, 0));
  124 |   await page.screenshot({ path: `${evidence}/dark.png`, fullPage: true });
  125 |   await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  126 |   await page.getByRole('radio', { name: '平均分', exact: true }).press('ArrowRight');
  127 |   await expect(page.getByRole('radio', { name: '提交率', exact: true })).toBeChecked();
  128 |   await page.screenshot({ path: `${evidence}/forced-colors.png`, fullPage: true });
  129 |   await page.emulateMedia({ forcedColors: 'none' });
  130 |   await page.goto("/#bm-d");
  131 |   await expect(page.locator('main')).toHaveAttribute('data-presentation', 'original');
  132 |   await expect(page.getByRole('combobox', { name: '固定对照' })).toBeVisible();
  133 |   await expect(page.getByRole('table').getByRole('row')).toHaveCount(13);
  134 | });
  135 | 
```