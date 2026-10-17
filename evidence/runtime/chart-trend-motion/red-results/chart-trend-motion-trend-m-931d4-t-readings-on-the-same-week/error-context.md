# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-trend-motion.spec.ts >> trend motion: hover keeps guide, markers, date and exact readings on the same week
- Location: tests/e2e/chart-trend-motion.spec.ts:62:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[aria-labelledby="trend-sample-title"]').getByTestId('trend-interaction')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[aria-labelledby="trend-sample-title"]').getByTestId('trend-interaction')

```

```yaml
- main:
  - paragraph: RAIN / CHART STUDIES
  - heading "Rain 图表实验室" [level=1]
  - paragraph: 轻盈的图形，清楚的数据。探索细线、渐变、圆角与组合之间的共同语言。
  - text: 运行验证 · 第 01 版
  - region "图表样式与数据设置":
    - text: 材质
    - button "渐变" [pressed]
    - button "实色"
    - text: 配色
    - button "蓝紫近邻" [pressed]
    - button "多类别色"
    - button "更新样本数据"
  - heading "趋势与比较" [level=2]
  - paragraph: 同一组视觉规则，在不同尺度与图形中展开
  - region "每周学习参与":
    - paragraph: 01 · 趋势与面积
    - heading "每周学习参与" [level=2]
    - text: P03 · 清晰线与轻面积
    - group "趋势插值方式":
      - text: 曲线
      - button "平滑" [pressed]
      - button "折线"
    - img "十二周本期与上期学习参与趋势。本期第四周为零，第八周缺测。精确数值可在图后读取。"
    - text: 趋势读数
    - combobox "趋势读数":
      - option "第1周"
      - option "第2周"
      - option "第3周"
      - option "第4周"
      - option "第5周"
      - option "第6周" [selected]
      - option "第7周"
      - option "第8周"
      - option "第9周"
      - option "第10周"
      - option "第11周"
      - option "第12周"
    - status: 第6周：本期 82 人次 · 上期 64 人次
    - paragraph: 第4周为真实零值；第8周缺测，保留断线。切换材质不改变数据。
    - button "查看精确数据"
  - region "六个班级的练习变化":
    - paragraph: 02 · 分组比较
    - heading "六个班级的练习变化" [level=2]
    - text: P02 · 圆头渐隐柱
    - img "四个单元、六个班级的练习变化。包含短柱、零值和负值，可展开精确数据。"
    - paragraph: 第2单元含 2 人次短柱；第3单元含 0 与 −18。负值从零线向下，圆角朝数值端。
    - button "查看精确数据"
  - region "迷你趋势":
    - paragraph: 03 · 紧凑读数
    - heading "迷你趋势" [level=2]
    - text: P03 · 96 × 40
    - img "十二期学习参与的迷你趋势，精确值见明细。"
    - paragraph:
      - strong: "54"
      - text: 人次 · 最近一期
    - button "查看精确数据"
  - region "参与和完成，放在同一段时间里看":
    - paragraph: 04 · 组合与量纲
    - heading "参与和完成，放在同一段时间里看" [level=2]
    - paragraph: 面积与柱共用人数轴，完成率独立使用右轴。
    - text: P01 / P03 · 柱、面积与双轴
    - group "组合图系列":
      - button "参与人数" [pressed]
      - button "完成人数" [pressed]
      - button "完成率" [pressed]
    - group "组合图时间范围":
      - button "全部 12 周" [pressed]
      - button "后 6 周"
    - img "参与人数面积、完成人数柱和完成率折线组合图；左轴人数，右轴0至100%；下方滑块调整周范围"
    - text: 组合读数
    - combobox "组合读数":
      - option "第01周"
      - option "第02周"
      - option "第03周"
      - option "第04周"
      - option "第05周"
      - option "第06周"
      - option "第07周"
      - option "第08周"
      - option "第09周"
      - option "第10周"
      - option "第11周"
      - option "第12周" [selected]
    - status: 第12周 · 参与 298 人 · 完成 265 人 · 完成率 88.9%
    - text: 当前 第01周—第12周，共 12 周
    - button "查看精确数据"
  - heading "密度与关系" [level=2]
  - paragraph: 让强度、流向与连接各自拥有清楚的表达
  - region "课程与学习目标":
    - paragraph: 05 · 强度与分布
    - heading "课程与学习目标" [level=2]
    - text: P05 · 连续色阶
    - button "热力矩阵" [pressed]
    - button "气泡矩阵"
    - button "6 × 6" [pressed]
    - button "12 × 12"
    - text: 低 高 · 0–6
    - img "6 行、6 列的热力矩阵。数值从 0 到 6，灰色破折号表示缺测。"
    - paragraph: 每格保留精确数值。灰色「—」为缺测。连续色阶保持固定，窄屏可横向滚动。
    - button "查看精确数据"
  - region "学习活动的去向":
    - paragraph: 06 · 流向与追踪
    - heading "学习活动的去向" [level=2]
    - text: P07 · 轻流带 追踪路径
    - combobox "追踪路径":
      - option "全部路径"
      - option "课堂讲授 → 概念理解"
      - option "课堂讲授 → 方法应用"
      - option "课前预习 → 概念理解"
      - option "课前预习 → 分析推理"
      - option "互动讨论 → 方法应用"
      - option "互动讨论 → 分析推理" [selected]
      - option "互动讨论 → 迁移创造"
      - option "课后练习 → 方法应用"
      - option "课后练习 → 迁移创造"
    - img "学习活动流向学习目标的桑基图，流带宽度表示学习人次，可从上方选择追踪路径。"
    - status: 互动讨论 → 分析推理：18 人次
    - paragraph: 流带宽度对应真实权重。节点高度随数据变化，尚未复现参考图中的等高列表布局。
    - button "查看精确数据"
  - region "知识关系网络":
    - paragraph: 07 · 知识与连接
    - heading "知识关系网络" [level=2]
    - text: P08 · 径向节点 聚焦节点
    - combobox "聚焦节点":
      - option "全部节点" [selected]
      - option "基础概念"
      - option "核心原理"
      - option "概念模型"
      - option "研究方法"
      - option "数据分析"
      - option "实验设计"
      - option "案例应用"
      - option "迁移应用"
      - option "综合项目"
    - img "九个知识节点的关系网络。紫色箭头为先修，橙色虚线箭头为应用，蓝色虚线为相似关系。"
    - text: 先修关系 → 相似概念 应用关系 →
    - paragraph: 节点采用径向渐变，无模糊阴影。当前使用固定示例位置；有向关系暂用直线箭头，曲线箭头仍需专门适配。
    - button "查看精确数据"
  - paragraph: 示例数据 · 本地实验
  - paragraph: Plots / G2 绘图，Bklit 表现参考，Rain 配色与字体。当前页面用于方案验证。
```

# Test source

```ts
  1   | import { test, expect, type Locator, type Page } from "@playwright/test";
  2   | 
  3   | test.use({ video: "on" });
  4   | 
  5   | const EVIDENCE = "evidence/runtime/chart-trend-motion";
  6   | 
  7   | async function openTrend(page: Page) {
  8   |   const errors: string[] = [];
  9   |   page.on("pageerror", error => errors.push(error.message));
  10  |   await page.goto("/chart-validation.html");
  11  |   const sample = page.locator('[aria-labelledby="trend-sample-title"]');
  12  |   const chart = sample.locator("[data-chart-ready]").first();
  13  |   await expect(chart).toHaveAttribute("data-chart-ready", "true");
  14  |   await expect.poll(async () => Number(await chart.getAttribute("data-render-count"))).toBeGreaterThan(0);
  15  |   const overlay = sample.getByTestId("trend-interaction");
  16  |   // This assertion is the RED boundary on the unmodified v0.4 page.
> 17  |   await expect(overlay).toBeVisible();
      |                         ^ Error: expect(locator).toBeVisible() failed
  18  |   await expect(overlay).toHaveAttribute("role", "group");
  19  |   await expect(overlay).toHaveAttribute("aria-label", "趋势图交互区");
  20  |   await expect(overlay).toHaveAttribute("tabindex", "0");
  21  |   return {
  22  |     sample, chart, overlay, errors,
  23  |     tooltip: sample.getByRole("tooltip"),
  24  |     readout: sample.getByTestId("trend-readout"),
  25  |     date: sample.getByTestId("trend-date-pill"),
  26  |     week: (index: number) => overlay.locator(`[data-week-index="${index}"]`),
  27  |   };
  28  | }
  29  | 
  30  | async function expectReading(target: Locator, current: number | "缺测", previous: number) {
  31  |   await expect(target).toContainText(new RegExp(`本期[\\s：:]*${current}(?:\\D|$)`));
  32  |   await expect(target).toContainText(new RegExp(`上期[\\s：:]*${previous}(?:\\D|$)`));
  33  | }
  34  | 
  35  | async function centerX(target: Locator) {
  36  |   const bounds = await target.boundingBox();
  37  |   expect(bounds).not.toBeNull();
  38  |   return bounds!.x + bounds!.width / 2;
  39  | }
  40  | 
  41  | async function twoFrames(page: Page) {
  42  |   await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  43  | }
  44  | 
  45  | async function expectPanelSettled(page: Page, tooltip: Locator) {
  46  |   await expect(tooltip).toBeVisible();
  47  |   await expect(tooltip).toHaveCSS("opacity", "1");
  48  |   await expect.poll(async () => {
  49  |     const before = await tooltip.boundingBox();
  50  |     await twoFrames(page);
  51  |     const after = await tooltip.boundingBox();
  52  |     if (!before || !after) return Infinity;
  53  |     return Math.abs(before.x - after.x) + Math.abs(before.y - after.y);
  54  |   }).toBeLessThan(0.5);
  55  | }
  56  | 
  57  | async function expectNewRender(chart: Locator, previous: number) {
  58  |   await expect.poll(async () => Number(await chart.getAttribute("data-render-count"))).toBeGreaterThan(previous);
  59  |   await expect(chart).toHaveAttribute("data-chart-ready", "true");
  60  | }
  61  | 
  62  | test("trend motion: hover keeps guide, markers, date and exact readings on the same week", async ({ page }) => {
  63  |   const { sample, overlay, tooltip, readout, date, week, errors } = await openTrend(page);
  64  |   await expect(overlay).toHaveAttribute("data-motion", "spring");
  65  |   await expect(tooltip).toBeHidden();
  66  |   // Several real pointer moves are retained in the video for motion review.
  67  |   for (const index of [2, 5, 10, 5]) {
  68  |     await week(index).hover();
  69  |     await expect(overlay).toHaveAttribute("data-active-week", String(index));
  70  |     await expectPanelSettled(page, tooltip);
  71  |   }
  72  |   await expectReading(tooltip, 82, 64);
  73  |   await expectReading(readout, 82, 64);
  74  |   await expect(date).toContainText("第6周");
  75  |   const expectedX = await centerX(week(5));
  76  |   for (const target of [
  77  |     sample.getByTestId("trend-crosshair"),
  78  |     sample.locator('[data-testid="trend-marker"][data-series="本期"]'),
  79  |     sample.locator('[data-testid="trend-marker"][data-series="上期"]'),
  80  |     date,
  81  |   ]) {
  82  |     await expect(target).toBeVisible();
  83  |     expect(Math.abs(await centerX(target) - expectedX)).toBeLessThanOrEqual(2.5);
  84  |   }
  85  |   await sample.screenshot({ path: `${EVIDENCE}/hover.png` });
  86  |   await page.getByRole("heading", { name: "Rain 图表实验室", exact: true }).hover();
  87  |   await expect(tooltip).toBeHidden();
  88  |   expect(errors).toEqual([]);
  89  | });
  90  | 
  91  | test("trend motion: a pinned week survives pointer moves and data updates until released", async ({ page }) => {
  92  |   const { sample, chart, overlay, tooltip, readout, week, errors } = await openTrend(page);
  93  |   await week(5).click();
  94  |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  95  |   await week(9).hover();
  96  |   await expect(overlay).toHaveAttribute("data-active-week", "5");
  97  |   await expectReading(tooltip, 82, 64);
  98  |   const before = Number(await chart.getAttribute("data-render-count"));
  99  |   await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  100 |   await expectNewRender(chart, before);
  101 |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  102 |   await expect(overlay).toHaveAttribute("data-active-week", "5");
  103 |   await expectReading(tooltip, 89, 64);
  104 |   await expectReading(readout, 89, 64);
  105 |   await expectPanelSettled(page, tooltip);
  106 |   await sample.screenshot({ path: `${EVIDENCE}/pinned-updated.png` });
  107 |   await week(9).click();
  108 |   await expect(overlay).toHaveAttribute("data-active-week", "9");
  109 |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  110 |   await overlay.focus();
  111 |   await overlay.press("Escape");
  112 |   await expect(overlay).toHaveAttribute("data-pinned", "false");
  113 |   await week(5).click();
  114 |   const canvas = await sample.locator("canvas").boundingBox();
  115 |   expect(canvas).not.toBeNull();
  116 |   // The top-left Canvas margin is outside the plot's week hit targets.
  117 |   await page.mouse.click(canvas!.x + 4, canvas!.y + 4);
```