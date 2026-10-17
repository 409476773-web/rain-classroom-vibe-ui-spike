# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-category.spec.ts >> no-preference: category business examples keep identity, units and original period dates
- Location: tests/e2e/chart-business-category.spec.ts:7:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 4
+ Received  + 4

  Array [
-   0.62,
-   0.71,
-   0.78,
-   0.86,
+   NaN,
+   NaN,
+   NaN,
+   NaN,
  ]

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "分类趋势与业务对照" [level=1] [ref=e8]
      - generic [ref=e9]: 共享候选 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 按学期、学院、知识点层级和版本比较，保留每个类别的身份、单位和原始读数。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - text: 业务场景
      - combobox "分类业务场景" [ref=e13]:
        - option "全部场景" [selected]
        - option "学期趋势"
        - option "学院数量与占比"
        - option "层级堆叠与覆盖率"
        - option "周期对照"
        - option "版本变化"
        - option "版本评分"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "分类数据状态" [ref=e15]:
        - option "正常" [selected]
        - option "全零"
        - option "局部缺测"
        - option "无数据"
        - option "单项"
        - option "长名称"
        - option "无效数据"
    - generic [ref=e16]:
      - text: 配色
      - combobox "分类图表配色" [ref=e17]:
        - option "蓝灰单色" [selected]
        - option "蓝紫近邻"
        - option "多色类别"
    - button "更新数据" [ref=e18] [cursor=pointer]
    - button "重播动效" [ref=e20] [cursor=pointer]
    - button "反转类别顺序" [ref=e22] [cursor=pointer]
  - status [ref=e24]: 示例数据 · 更新 0 次
  - generic [ref=e25]:
    - region [ref=e26]:
      - generic [ref=e27]:
        - generic [ref=e28]: CH-060
        - heading "学期课程参与趋势" [level=2] [ref=e29]
      - paragraph [ref=e30]: 横轴按学期顺序等距排列。人数是各学期独立统计，缺测保留断口。
      - region "学期课程参与趋势图表，可横向滚动" [ref=e31]:
        - generic [ref=e33]:
          - generic:
            - generic:
              - generic: 0人
              - generic: 50人
              - generic: 100人
              - generic: 150人
              - generic: 200人
              - generic: 250人
          - generic:
            - generic: 2024春
            - generic: 2024秋
            - generic: 2025春
            - generic: 2025秋
            - generic: 2026春
            - generic: 2026秋
      - generic [ref=e46]: 参与人数 · 人
      - group [ref=e51]:
        - generic "查看精确数据 · 学期课程参与趋势" [ref=e52] [cursor=pointer]
    - region [ref=e53]:
      - generic [ref=e54]:
        - generic [ref=e55]: CH-005
        - heading "学院开课数量与覆盖率" [level=2] [ref=e56]
      - paragraph [ref=e57]: 左轴为开课数量；右轴固定0—100%，覆盖率=已开课/计划课程。两个“计算机学院”对应不同校区，保留独立身份。
      - region "学院开课数量与覆盖率图表，可横向滚动" [ref=e58]:
        - generic [ref=e60]:
          - generic:
            - generic:
              - generic: 0门
              - generic: 20门
              - generic: 40门
              - generic: 60门
              - generic: 80门
          - generic:
            - generic:
              - generic: 0%
              - generic: 20%
              - generic: 40%
              - generic: 60%
              - generic: 80%
              - generic: 100%
          - generic:
            - generic: 计算机学院
            - generic: 人文学院
            - generic: 计算机学院
            - generic: 经济管理学院
      - generic [ref=e77]:
        - generic [ref=e78] [cursor=pointer]: 开课数量 · 门
        - generic [ref=e82] [cursor=pointer]: 开课覆盖率 · %
      - group [ref=e86]:
        - generic "查看精确数据 · 学院开课数量与覆盖率" [ref=e87] [cursor=pointer]
    - region [ref=e88]:
      - generic [ref=e89]:
        - generic [ref=e90]: CH-067
        - heading "知识点层级与覆盖情况" [level=2] [ref=e91]
      - paragraph [ref=e92]: 左轴按已覆盖+待覆盖堆叠，合计为本层级知识点数量；右轴固定0—100%。缺测分项不补零，也不继续计算覆盖率。
      - region "知识点层级与覆盖情况图表，可横向滚动" [ref=e93]:
        - generic [ref=e95]:
          - generic:
            - generic:
              - generic: 0个
              - generic: 20个
              - generic: 40个
              - generic: 60个
              - generic: 80个
              - generic: 100个
              - generic: 120个
          - generic:
            - generic:
              - generic: 0%
              - generic: 20%
              - generic: 40%
              - generic: 60%
              - generic: 80%
              - generic: 100%
          - generic:
            - generic: 基础概念
            - generic: 综合应用
            - generic: 专题拓展
      - generic [ref=e115]:
        - generic [ref=e116] [cursor=pointer]: 已覆盖 · 个
        - generic [ref=e120] [cursor=pointer]: 待覆盖 · 个
        - generic [ref=e124] [cursor=pointer]: 覆盖率 · %
      - group [ref=e128]:
        - generic "查看精确数据 · 知识点层级与覆盖情况" [ref=e129] [cursor=pointer]
    - region [ref=e130]:
      - generic [ref=e131]:
        - generic [ref=e132]: CH-049
        - heading "本期与上期学习对照" [level=2] [ref=e133]
      - paragraph [ref=e134]: 本例按周期内第几天对齐；按星期或教学周比较时，需要另行确定对应位置。两个面积叠加对照，不累计；两期保留各自日期，上期第5天尚无记录，保持缺测。
      - region "本期与上期学习对照图表，可横向滚动" [ref=e135]:
        - generic [ref=e137]:
          - generic:
            - generic:
              - generic: 0次
              - generic: 20次
              - generic: 40次
              - generic: 60次
          - generic:
            - generic: 第1天
            - generic: 第2天
            - generic: 第3天
            - generic: 第4天
            - generic: 第5天
      - generic [ref=e153]:
        - generic [ref=e154] [cursor=pointer]: 本期学习次数 · 次
        - generic [ref=e158] [cursor=pointer]: 上期学习次数 · 次
      - group [ref=e162]:
        - generic "查看精确数据 · 本期与上期学习对照" [ref=e163] [cursor=pointer]
    - region [ref=e164]:
      - generic [ref=e165]:
        - generic [ref=e166]: CH-073
        - heading "培养方案版本变化" [level=2] [ref=e167]
      - paragraph [ref=e168]: 版本按公布顺序等距排列；面积表达各版本课程总数的变化，不把版本号解析成日期。
      - region "培养方案版本变化图表，可横向滚动" [ref=e169]:
        - generic [ref=e171]:
          - generic:
            - generic:
              - generic: 0门
              - generic: 20门
              - generic: 40门
              - generic: 60门
          - generic:
            - generic: 2022版
            - generic: 2023修订版
            - generic: 2024版
            - generic: 2025修订版
            - generic: 2026版
      - generic [ref=e184]: 课程总数 · 门
      - group [ref=e189]:
        - generic "查看精确数据 · 培养方案版本变化" [ref=e190] [cursor=pointer]
    - region [ref=e191]:
      - generic [ref=e192]:
        - generic [ref=e193]: CH-112
        - heading "课程版本满意度" [level=2] [ref=e194]
      - paragraph [ref=e195]: 固定0—10分评分尺度；本例分数越高代表满意度越高。不同业务若方向相反，需另写解释。
      - region "课程版本满意度图表，可横向滚动" [ref=e196]:
        - generic [ref=e198]:
          - generic:
            - generic:
              - generic: 0分
              - generic: 2分
              - generic: 4分
              - generic: 6分
              - generic: 8分
              - generic: 10分
          - generic:
            - generic: 第一版
            - generic: 第二版
            - generic: 第三版
            - generic: 第四版
      - generic [ref=e213]: 满意度 · 分
      - group [ref=e218]:
        - generic "查看精确数据 · 课程版本满意度" [ref=e219] [cursor=pointer]
  - group [ref=e220]:
    - generic "分类图表配置、完整源码与示例数据" [ref=e221]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/category-examples.tsx"
    - option "chart-business/comparison-data.ts"
    - option "chart-business/category-page.css"
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdir } from "node:fs/promises";
  3   | 
  4   | const evidence = process.env.RAIN_CHART_CATEGORY_EVIDENCE_DIR ?? "evidence/runtime/chart-business-expansion/p3/browser";
  5   | 
  6   | for (const motion of ["reduce", "no-preference"] as const) {
  7   |   test(`${motion}: category business examples keep identity, units and original period dates`, async ({ page }) => {
  8   |     const errors: string[] = [];
  9   |     page.on("pageerror", error => errors.push(error.message));
  10  |     await page.emulateMedia({ reducedMotion: motion });
  11  |     await page.goto("/#chart-category");
  12  |     await expect(page.getByRole("heading", { level: 1, name: "分类趋势与业务对照" })).toBeVisible();
  13  |     await expect(page.locator("[data-category-example]")).toHaveCount(6);
  14  |     await expect(page.locator(".rain-category-plot > div > svg")).toHaveCount(6);
  15  |     for (const [id, count] of [["semester", 1], ["period", 2]] as const) {
  16  |       const fills = page.locator(`[data-category-example="${id}"] path[fill^="url(#area-gradient-"]`);
  17  |       await expect(fills).toHaveCount(count);
  18  |       await expect.poll(() => fills.evaluateAll(paths => paths.every(path => (path as SVGGraphicsElement).getBBox().height > 10))).toBe(true);
  19  |     }
  20  |     const score = page.locator('[data-category-example="score"]');
  21  |     await expect(score.locator(".series-bar rect")).toHaveCount(4);
  22  |     await expect(score.locator(".rain-category-plot").getByText("10分", { exact: true })).toBeVisible();
  23  |     await expect.poll(() => score.locator(".series-bar rect").evaluateAll(bars => bars.map(bar => {
  24  |       const height = Number(bar.getAttribute("height"));
  25  |       return Number((height / (Number(bar.getAttribute("y")) + height)).toFixed(2));
> 26  |     }))).toEqual([.62, .71, .78, .86]);
      |          ^ Error: expect(received).toEqual(expected) // deep equality
  27  |     if (motion === "reduce") {
  28  |       await mkdir(evidence, { recursive: true });
  29  |       await page.screenshot({ path: `${evidence}/desktop.png`, fullPage: true });
  30  |       for (const id of ["semester", "period", "score"]) await page.locator(`[data-category-example="${id}"]`).screenshot({ path: `${evidence}/${id}.png` });
  31  |     }
  32  |     const college = page.locator('[data-category-example="colleges"]');
  33  |     await college.getByText("查看精确数据", { exact: false }).click();
  34  |     await expect(college.getByRole("rowheader", { name: "计算机学院", exact: true })).toHaveCount(2);
  35  |     await expect(college.getByRole("table")).toContainText("东校区");
  36  |     const row = college.locator('[data-category-row="college-0"]');
  37  |     await row.evaluate(node => node.setAttribute("data-test-identity", "retained"));
  38  |     await page.getByRole("button", { name: "更新数据", exact: true }).click();
  39  |     await page.getByRole("button", { name: "反转类别顺序" }).click();
  40  |     await expect(row).toHaveAttribute("data-test-identity", "retained");
  41  |     await expect(college.locator("tbody tr").first()).toHaveAttribute("data-category-row", "college-3");
  42  |     await expect(row).toContainText("44");
  43  |     await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("period");
  44  |     const period = page.locator('[data-category-example="period"]');
  45  |     await period.locator("summary").focus();
  46  |     await page.keyboard.press("Enter");
  47  |     await expect(period.getByRole("table")).toBeVisible();
  48  |     await expect(period.getByRole("table")).toContainText("2027-01-01");
  49  |     await expect(period.getByRole("table")).toContainText("2026-12-25");
  50  |     await expect(period.locator('[data-category-row="day-5"]')).toContainText("缺测");
  51  |     await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("knowledge");
  52  |     await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("zero");
  53  |     const knowledge = page.locator('[data-category-example="knowledge"]');
  54  |     await knowledge.locator("summary").click();
  55  |     await expect(knowledge.getByRole("table")).toContainText("不适用");
  56  |     await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("invalid");
  57  |     await expect(page.getByRole("alert")).toContainText("无效数据");
  58  |     await expect(page.locator(".rain-category-plot svg")).toHaveCount(0);
  59  |     await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("empty");
  60  |     await expect(knowledge.getByRole("status")).toHaveText("暂无数据");
  61  |     await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("single");
  62  |     await expect(knowledge.locator(".rain-category-plot > div > svg")).toHaveCount(1);
  63  |     expect(await knowledge.locator("svg path").evaluateAll(paths => paths.some(node => /NaN|Infinity|undefined/.test(node.getAttribute("d") ?? "")))).toBe(false);
  64  |     expect(errors).toEqual([]);
  65  |   });
  66  | }
  67  | 
  68  | test("missing categories keep discontinuous paths during updates and period tooltip shows both dates", async ({ page }) => {
  69  |   const errors: string[] = [];
  70  |   page.on("pageerror", error => errors.push(error.message));
  71  |   await page.emulateMedia({ reducedMotion: "no-preference" });
  72  |   await page.goto("/#chart-category");
  73  |   await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
  74  |   await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("missing");
  75  |   const line = page.locator('[data-category-example="semester"] svg path.visx-linepath[stroke-linecap="round"]').first();
  76  |   const area = page.locator('[data-category-example="semester"] path[fill^="url(#area-gradient-"]');
  77  |   await expect.poll(async () => ((await line.getAttribute("d"))?.match(/M/g) ?? []).length).toBe(2);
  78  |   await expect.poll(async () => ((await area.getAttribute("d"))?.match(/M/g) ?? []).length).toBe(2);
  79  |   await page.waitForTimeout(1600);
  80  |   await line.evaluate(node => node.setAttribute("data-test-category-path", "retained"));
  81  |   const before = await line.getAttribute("d");
  82  |   await page.getByRole("button", { name: "更新数据", exact: true }).click();
  83  |   await page.waitForTimeout(160);
  84  |   const middle = await line.getAttribute("d");
  85  |   for (let sample = 0; sample < 6; sample++) {
  86  |     const d = await line.getAttribute("d");
  87  |     expect((d?.match(/M/g) ?? []).length).toBe(2);
  88  |     expect(d).not.toMatch(/NaN|Infinity|undefined/);
  89  |     expect(((await area.getAttribute("d"))?.match(/M/g) ?? []).length).toBe(2);
  90  |     await page.waitForTimeout(80);
  91  |   }
  92  |   await page.waitForTimeout(1100);
  93  |   const end = await line.getAttribute("d");
  94  |   expect(middle).not.toBe(before);
  95  |   expect(middle).not.toBe(end);
  96  |   expect(end).not.toBe(before);
  97  |   expect((end?.match(/M/g) ?? []).length).toBe(2);
  98  |   await expect(line).toHaveAttribute("data-test-category-path", "retained");
  99  |   await page.getByRole("button", { name: "更新数据", exact: true }).click();
  100 |   await page.waitForTimeout(160);
  101 |   await page.getByRole("button", { name: "更新数据", exact: true }).click();
  102 |   await page.getByRole("button", { name: "反转类别顺序" }).click();
  103 |   await expect.poll(async () => ((await line.getAttribute("d"))?.match(/M/g) ?? []).length).toBe(2);
  104 |   await expect(line).toHaveAttribute("data-test-category-path", "retained");
  105 |   await page.emulateMedia({ reducedMotion: "reduce" });
  106 |   await page.getByRole("combobox", { name: "分类数据状态" }).selectOption("normal");
  107 |   await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("period");
  108 |   const svg = page.locator('[data-category-example="period"] svg').first();
  109 |   await expect(svg).toBeVisible();
  110 |   await svg.scrollIntoViewIfNeeded();
  111 |   const box = await svg.boundingBox();
  112 |   const tooltip = page.locator(".rain-category-tooltip");
  113 |   await expect.poll(async () => {
  114 |     await page.mouse.move(box!.x + box!.width / 2, box!.y + 100);
  115 |     await page.mouse.move(box!.x + box!.width / 2 + 1, box!.y + 100);
  116 |     return (await tooltip.allTextContents()).join("");
  117 |   }).toContain("2027-01-01");
  118 |   await expect(tooltip).toContainText("2026-12-25");
  119 |   await expect.poll(() => tooltip.evaluate(node => Number(getComputedStyle(node).opacity))).toBeGreaterThan(.98);
  120 |   await mkdir(evidence, { recursive: true });
  121 |   await page.screenshot({ path: `${evidence}/period-tooltip.png`, fullPage: true });
  122 |   const category = page.locator('[data-category-example="period"]');
  123 |   await category.locator("summary").click();
  124 |   await expect(category.getByRole("table")).toContainText("2027-01-03");
  125 |   expect(await page.locator("svg path").evaluateAll(paths => paths.some(node => /NaN|Infinity|undefined/.test(node.getAttribute("d") ?? "")))).toBe(false);
  126 |   expect(errors).toEqual([]);
```