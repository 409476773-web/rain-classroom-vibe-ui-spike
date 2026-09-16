# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: m2.spec.ts >> BM-C contains pane scrolling, restores collapse focus and survives narrow reflow
- Location: tests/e2e/m2.spec.ts:44:1

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 140
Received:    87
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - link "返回课程报告" [ref=e7] [cursor=pointer]:
        - /url: "#bm-d"
      - generic [ref=e8]: /
      - generic [ref=e9]:
        - heading "大学物理 · 单元作业批改" [level=1] [ref=e10]
        - paragraph [ref=e11]: 运动、能量与实验 · 手动批改
    - generic [ref=e12]:
      - generic [ref=e13]: A 卷已批改 2 / 18
      - progressbar "A 卷批改进度" [ref=e14]
      - button "切换深色" [ref=e15] [cursor=pointer]
  - generic [ref=e17]:
    - generic [ref=e18]:
      - generic "试卷" [ref=e19]:
        - button "A 卷" [pressed] [ref=e20] [cursor=pointer]
        - button "B 卷" [ref=e22] [cursor=pointer]
      - generic "批改顺序" [ref=e24]:
        - button "按题批改" [pressed] [ref=e25] [cursor=pointer]
        - button "按人批改" [ref=e27] [cursor=pointer]
    - generic [ref=e29]:
      - button "收起目录" [expanded] [ref=e30] [cursor=pointer]
      - button "收起评分" [expanded] [ref=e32] [cursor=pointer]
      - generic [ref=e34] [cursor=pointer]:
        - checkbox "加宽评分区" [checked] [ref=e35]
        - generic [ref=e39]: 加宽评分区
  - generic [ref=e41]:
    - region "批改目录" [ref=e42]:
      - generic [ref=e44]:
        - generic [ref=e45]:
          - generic [ref=e46]:
            - heading "批改目录" [level=2] [ref=e47]
            - button "收起目录" [ref=e48] [cursor=pointer]
          - generic [ref=e50]:
            - generic [ref=e51]: 查找批改对象
            - textbox "查找批改对象" [ref=e53]:
              - /placeholder: 学生或题目
          - generic [ref=e55]:
            - generic [ref=e56]: 目录状态
            - generic [ref=e57]:
              - generic [ref=e58]:
                - combobox "目录状态" [ref=e59] [cursor=pointer]:
                  - generic "全部作答" [ref=e61]
                - button "清除目录状态" [ref=e63] [cursor=pointer]
              - generic [ref=e69]: 已选：全部作答
            - textbox [ref=e70]: all
          - paragraph [ref=e71]: 当前目录 18 份作答
        - navigation "分层批改目录" [ref=e72]:
          - group [ref=e73]:
            - generic "第 1 题 · 运动与受力" [ref=e74] [cursor=pointer]
            - list [ref=e75]:
              - listitem [ref=e76]:
                - button "选择 示例学生 01 第 1 题" [ref=e77] [cursor=pointer]:
                  - generic [ref=e78]: 示例学生 01
                  - generic [ref=e79]: 待批改 · 草稿
              - listitem [ref=e80]:
                - button "选择 示例学生 02 第 1 题" [ref=e81] [cursor=pointer]:
                  - generic [ref=e82]: 示例学生 02
                  - generic [ref=e83]: 待批改
              - listitem [ref=e84]:
                - button "选择 示例学生 03 第 1 题" [ref=e85] [cursor=pointer]:
                  - generic [ref=e86]: 示例学生 03
                  - generic [ref=e87]: 8 分
              - listitem [ref=e88]:
                - button "选择 示例学生 04 第 1 题" [ref=e89] [cursor=pointer]:
                  - generic [ref=e90]: 示例学生 04
                  - generic [ref=e91]: 待批改
              - listitem [ref=e92]:
                - button "选择 示例学生 05 第 1 题" [ref=e93] [cursor=pointer]:
                  - generic [ref=e94]: 示例学生 05
                  - generic [ref=e95]: 待批改
              - listitem [ref=e96]:
                - button "选择 示例学生 06 第 1 题" [ref=e97] [cursor=pointer]:
                  - generic [ref=e98]: 示例学生 06
                  - generic [ref=e99]: 待批改
          - group [ref=e100]:
            - generic "第 2 题 · 能量转化" [ref=e101] [cursor=pointer]
          - group [ref=e102]:
            - generic "第 3 题 · 实验与误差" [ref=e103] [cursor=pointer]
    - generic [ref=e105]:
      - region "当前作答" [ref=e106]:
        - generic [ref=e107]:
          - generic [ref=e108]:
            - paragraph [ref=e109]: A 卷 · 主观题 · 10 分
            - heading "示例学生 02 · 第 1 题" [active] [level=2] [ref=e110]
          - generic [ref=e111]:
            - heading "运动与受力" [level=3] [ref=e112]
            - paragraph [ref=e113]: 公交车突然刹车时，乘客为什么向前倾？请用惯性与受力分析说明，并区分力与运动状态的关系。
          - generic [ref=e114]:
            - generic [ref=e115]:
              - heading "学生作答" [level=3] [ref=e116]
              - generic [ref=e117]: 文字作答
            - paragraph [ref=e118]: 先明确研究对象，再分析所处条件。我将题目中的对象单独考虑，区分外部作用和对象本身的运动状态。
            - paragraph [ref=e119]: 车辆制动时，脚部随车辆减速，身体上部由于惯性仍倾向保持原来的运动状态，所以人会向前倾。惯性是物体的属性，不是一种额外的力。
            - paragraph [ref=e120]: 分析中需要交代条件，避免直接把结论套用到所有情形。改变条件时，应重新检查上述解释是否仍然成立。
            - paragraph [ref=e121]: 验证思路：通过重复观察比较不同条件下的变化，记录现象，再用所学规律解释结果。对不符合预期的数据保留记录，并检查可能的测量误差。
      - region "评分面板" [ref=e122]:
        - form "评分表单" [ref=e123]:
          - generic [ref=e125]:
            - generic [ref=e126]:
              - heading "评分与评语" [level=2] [ref=e127]
              - button "收起评分" [ref=e128] [cursor=pointer]
            - paragraph [ref=e130]: 示例学生 02 · 第 1 题
            - group [ref=e131]:
              - generic "查看评分参考" [ref=e132] [cursor=pointer]
            - generic [ref=e133]:
              - generic [ref=e134]:
                - text: 本题得分
                - generic [ref=e135]: "*"
              - textbox "本题得分" [ref=e137]:
                - /placeholder: 请输入分数
              - generic [ref=e139]: 满分 10 分，支持 0.5 分
            - generic [ref=e140]:
              - generic [ref=e141]: 评语（选填）
              - textbox "评语（选填）" [ref=e143]:
                - /placeholder: 记录值得肯定的思路，或给出改进建议
            - paragraph [ref=e144]: 切换对象会保留草稿，保存后计入已批改。评语无需必填。
            - group [ref=e145]:
              - generic "演示设置" [ref=e146] [cursor=pointer]
          - generic [ref=e148]:
            - status [ref=e149]: 尚未评分
            - generic [ref=e150]:
              - button "保存" [ref=e151] [cursor=pointer]
              - button "保存并下一位" [ref=e153] [cursor=pointer]
            - generic [ref=e155]:
              - button "上一位" [ref=e156] [cursor=pointer]
              - generic [ref=e158]: 2 / 6
              - button "下一位" [ref=e159] [cursor=pointer]
  - paragraph [ref=e161]: 虚构教学示例 · 评分仅保留在当前页面，刷新后恢复。
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
  49  |   await expect(page.getByRole("button", { name: "展开评分", exact: true })).toBeFocused();
  50  |   await page.getByText("加宽评分区", { exact: true }).click(); await page.getByRole("button", { name: "展开评分", exact: true }).click(); await expect(score).toHaveValue("8");
  51  |   await page.getByRole("region", { name: "批改目录", exact: true }).getByRole("button", { name: "收起目录", exact: true }).click();
  52  |   await expect(page.getByRole("button", { name: "展开目录", exact: true })).toBeFocused(); await page.getByRole("button", { name: "展开目录", exact: true }).click();
  53  |   const facts = await page.evaluate(() => {
  54  |     const answer = document.querySelector<HTMLElement>(".bm-c-answer")!, nav = document.querySelector<HTMLElement>(".bm-c-context nav")!, footer = document.querySelector<HTMLElement>(".bm-c-grade-footer")!;
  55  |     return { viewport: innerHeight, document: document.documentElement.scrollHeight, navHeight: nav.clientHeight, navScroll: nav.scrollHeight, navOverflow: getComputedStyle(nav).overflowY, answerOverflow: getComputedStyle(answer).overflowY, footerBottom: footer.getBoundingClientRect().bottom, overflow: document.documentElement.scrollWidth - innerWidth };
  56  |   });
  57  |   expect(facts.document).toBeLessThanOrEqual(facts.viewport + 1); expect(facts.navOverflow).toBe("auto"); expect(facts.answerOverflow).toBe("auto"); expect(facts.footerBottom).toBeLessThanOrEqual(facts.viewport); expect(facts.overflow).toBeLessThanOrEqual(1);
  58  |   await page.screenshot({ path: join(directory(info.project.name), "bm-c-desktop.png"), fullPage: true });
  59  |   await page.setViewportSize({ width: 1152, height: 720 });
  60  |   const answerPane = page.getByRole("region", { name: "当前作答", exact: true });
  61  |   await answerPane.evaluate(element => { element.scrollTop = element.scrollHeight; });
  62  |   expect(await answerPane.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  63  |   await page.getByRole("button", { name: "下一位", exact: true }).click();
  64  |   const nextHeading = page.getByRole("heading", { name: "示例学生 02 · 第 1 题", exact: true });
  65  |   await expect(nextHeading).toBeFocused();
  66  |   const navigation = await nextHeading.evaluate(heading => ({ headingTop: heading.getBoundingClientRect().top, paneTop: heading.closest(".bm-c-answer")!.getBoundingClientRect().top }));
> 67  |   expect(navigation.headingTop).toBeGreaterThanOrEqual(navigation.paneTop);
      |                                 ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  68  |   await page.getByRole("button", { name: "上一位", exact: true }).click(); await expect(score).toHaveValue("8");
  69  |   await page.setViewportSize({ width: 390, height: 844 }); await expect(score).toHaveValue("8");
  70  |   await page.getByRole("button", { name: "切换深色", exact: true }).click();
  71  |   await expect(comment).toHaveValue("这是一条保留在作答对象中的草稿。".repeat(30));
  72  |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  73  |   await page.screenshot({ path: join(directory(info.project.name), "bm-c-narrow-dark.png"), fullPage: true });
  74  |   writeFileSync(join(directory(info.project.name), "bm-c-geometry.json"), JSON.stringify({ ...facts, navigation }, null, 2));
  75  | });
  76  | 
  77  | test("BM-C filters and clears an empty directory without losing a draft", async ({ page }) => {
  78  |   await page.goto("/#bm-c"); await page.getByRole("textbox", { name: "本题得分", exact: true }).fill("8.5");
  79  |   const search = page.getByRole("textbox", { name: "查找批改对象", exact: true }); await search.fill("不存在");
  80  |   await expect(page.getByRole("heading", { name: "没有匹配的批改对象", exact: true })).toBeVisible();
  81  |   await page.getByRole("button", { name: "清空筛选", exact: true }).click(); await expect(page.getByRole("textbox", { name: "本题得分", exact: true })).toHaveValue("8.5");
  82  |   await search.click(); await search.pressSequentially("第 2 题");
  83  |   await expect(search).toHaveValue("第 2 题"); await expect(search).toBeFocused();
  84  |   await expect(page.getByRole("heading", { name: "示例学生 01 · 第 2 题", exact: true })).toBeVisible();
  85  | });
  86  | 
  87  | test("BM-D full-range metrics survive pagination and chart selection with separate numeric fonts", async ({ page }, info) => {
  88  |   await page.goto("/#bm-d");
  89  |   const metrics = page.getByRole("region", { name: "关键指标", exact: true }); const values = metrics.locator('[data-slot="value"]');
  90  |   await expect(values).toHaveText(["312", "252", "80.9", "80.8%"]);
  91  |   await page.getByRole("button", { name: "下一页", exact: true }).click(); await page.getByRole("button", { name: "第 4 周", exact: true }).click();
  92  |   await expect(values).toHaveText(["312", "252", "80.9", "80.8%"]);
  93  |   await expect(page.getByRole("status", { name: "趋势读数", exact: true })).toContainText("第 4 周");
  94  |   const facts = await page.evaluate(() => ({
  95  |     values: [...document.querySelectorAll('.bm-d-statistic [data-slot="value"]')].map(node => ({ font: getComputedStyle(node).fontFamily, weight: getComputedStyle(node).fontWeight })),
  96  |     units: [...document.querySelectorAll('.bm-d-statistic [data-slot="unit"]')].map(node => getComputedStyle(node).fontFamily),
  97  |     bodyFont: getComputedStyle(document.querySelector('.bm-d-details td')!).fontFamily,
  98  |     actualLineSeedAvailable: document.fonts.check('36px "LINE Seed JP App_OTF"'),
  99  |   }));
  100 |   expect(facts.values.every(value => value.font.includes("LINE Seed") && value.weight === "700")).toBe(true); expect(facts.units.every(font => font.includes("PingFang"))).toBe(true); expect(facts.bodyFont).toContain("PingFang");
  101 |   await page.screenshot({ path: join(directory(info.project.name), "bm-d-desktop.png"), fullPage: true });
  102 |   writeFileSync(join(directory(info.project.name), "bm-d-fonts.json"), JSON.stringify(facts, null, 2));
  103 | });
  104 | 
  105 | test("BM-D filters the source, distinguishes chart state and recovers from failure and empty", async ({ page }) => {
  106 |   await page.goto("/#bm-d"); await page.getByRole("button", { name: "二班", exact: true }).click();
  107 |   await expect(page.getByRole("region", { name: "关键指标" }).locator('[data-slot="value"]')).toHaveText(["156", "129", "81.9", "82.7%"]);
  108 |   await page.getByRole("combobox", { name: "报告周期", exact: true }).click();
  109 |   await page.getByRole("option", { name: "第 4–6 周", exact: true }).click();
  110 |   await expect(page.getByRole("region", { name: "关键指标" }).locator('[data-slot="value"]')).toHaveText(["78", "69", "86.1", "88.5%"]);
  111 |   await page.getByRole("button", { name: "提交率", exact: true }).click(); await expect(page.getByRole("status", { name: "趋势读数" })).toContainText("提交率");
  112 |   await page.getByText("演示设置", { exact: true }).click(); await page.getByText("下次加载失败", { exact: true }).click(); await page.getByRole("button", { name: "刷新报告", exact: true }).click();
  113 |   await expect(page.getByRole("region", { name: "关键指标" })).toHaveCount(0); await expect(page.getByRole("alert")).toBeFocused();
  114 |   await page.getByRole("button", { name: "重试加载", exact: true }).click(); await expect(page.getByRole("region", { name: "关键指标" })).toBeVisible();
  115 |   await page.getByRole("button", { name: "预览空数据", exact: true }).click(); await expect(page.getByRole("heading", { name: "暂无报告数据" })).toBeVisible();
  116 |   await page.getByRole("button", { name: "恢复示例数据", exact: true }).click(); await expect(page.getByRole("region", { name: "关键指标" })).toBeVisible();
  117 | });
  118 | 
  119 | test("BM-D narrow dark report retains readable equivalent data and keyboard access", async ({ page }, info) => {
  120 |   await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/#bm-d");
  121 |   await page.getByRole("button", { name: "切换深色", exact: true }).click();
  122 |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  123 |   const week = page.getByRole("button", { name: "第 4 周", exact: true }); await week.focus(); await page.keyboard.press("Enter");
  124 |   await expect(week).toHaveAttribute("aria-pressed", "true"); await expect(page.getByRole("table")).toBeVisible();
  125 |   await page.screenshot({ path: join(directory(info.project.name), "bm-d-narrow-dark.png"), fullPage: true });
  126 | });
  127 | 
```