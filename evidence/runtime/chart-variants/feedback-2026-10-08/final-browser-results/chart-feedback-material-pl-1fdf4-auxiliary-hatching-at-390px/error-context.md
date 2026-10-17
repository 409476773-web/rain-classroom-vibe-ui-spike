# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-material.spec.ts >> playground uses coordinated materials and light auxiliary hatching at 390px
- Location: tests/e2e/chart-feedback-material.spec.ts:8:37

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-chart-variant="bar-pattern"]').locator('[data-palette-mode="example"]')
Expected: "category-near"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-chart-variant="bar-pattern"]').locator('[data-palette-mode="example"]')

```

```yaml
- main:
  - link "返回组件目录":
    - /url: "#components"
  - heading "柱状图" [level=1]
  - text: G4 · 共享候选 · 未发布 · 视觉待复核
  - paragraph: 分组比较、互斥堆叠、同色渐变与圆头渐隐柱。
  - heading "图型与可选配方" [level=2]
  - paragraph: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
  - text: 视觉配方
  - combobox "视觉配方":
    - option "蓝紫近邻" [selected]
    - option "多色类别"
    - option "协调实色"
    - option "蓝灰单色"
    - option "同色渐变柱"
    - option "圆头渐隐柱"
  - text: 示例状态
  - combobox "示例状态":
    - option "正常" [selected]
    - option "无数据"
    - option "零值"
    - option "单项／单点"
    - option "长标签"
    - option "缺测"
    - option "无效数据"
  - text: 系列数
  - combobox "系列数":
    - option "3" [selected]
    - option "5"
  - button "更新数据"
  - button "重播动效"
  - text: 柱形
  - combobox "柱形配方":
    - option "分组柱" [selected]
    - option "互斥等级堆叠"
  - text: 0 100 200 300 课程一 课程二 课程三 课程四 课程五 课程六
  - button "参与人数 · 人"
  - button "完成人数 · 人"
  - button "复习人数 · 人"
  - group: 查看精确数据
  - status: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - heading "数据与使用边界" [level=2]
  - paragraph: 类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。
  - paragraph: 原生柱坐标以0为下界，本例拒绝负值。
  - paragraph: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - region "API 与结构":
    - heading "API 与结构" [level=2]
    - table "柱状图 常用接口":
      - caption: 柱状图 常用接口
      - rowgroup:
        - row "名称 类型 默认 说明":
          - columnheader "名称"
          - columnheader "类型"
          - columnheader "默认"
          - columnheader "说明"
      - rowgroup:
        - row "data / value 原生图型合同 — 类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。":
          - rowheader "data / value":
            - code: data / value
          - cell "原生图型合同":
            - code: 原生图型合同
          - cell "—"
          - cell "类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。"
        - row "children Compound Parts — 通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。":
          - rowheader "children":
            - code: children
          - cell "Compound Parts":
            - code: Compound Parts
          - cell "—"
          - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。"
        - row "className / style / margin 原生尺寸接口 — 宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。":
          - rowheader "className / style / margin":
            - code: className / style / margin
          - cell "原生尺寸接口":
            - code: 原生尺寸接口
          - cell "—"
          - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。"
        - row "enterTransition / animationDuration 原生动效配置 — 默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。":
          - rowheader "enterTransition / animationDuration":
            - code: enterTransition / animationDuration
          - cell "原生动效配置":
            - code: 原生动效配置
          - cell "—"
          - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。"
    - paragraph: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
  - region "调用示例":
    - heading "调用示例" [level=2]
    - button "复制代码"
    - status
    - code: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-bar\" data-recipe=\"category-near\"> <ChartExample id=\"bar\" recipe=\"category-near\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
    - paragraph:
      - text: 当前源码：
      - code: packages/ui/src/charts/vendor/charts/bar-chart.tsx
  - group: 调用配置、完整源码与示例数据
  - region "全部图表变体":
    - navigation "变体分组":
      - button "基础结构"
      - button "图形材质"
      - button "坐标与辅助读数"
      - button "交互与状态"
    - region "基础结构":
      - heading "基础结构" [level=2]
      - region "Bar Chart":
        - heading "Bar Chart" [level=3]
        - paragraph: 默认圆头纵向柱
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - 3D Stacked":
        - heading "Bar Chart - 3D Stacked" [level=3]
        - paragraph: 分段侧面的立体堆叠柱
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Multiple Series":
        - heading "Bar Chart - Multiple Series" [level=3]
        - paragraph: 按类别比较多系列分组柱
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Stacked":
        - heading "Bar Chart - Stacked" [level=3]
        - paragraph: 互斥类别的分段间隔堆叠
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Horizontal":
        - heading "Bar Chart - Horizontal" [level=3]
        - paragraph: 横向柱与纵向类别标签
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Dense Data":
        - heading "Bar Chart - Dense Data" [level=3]
        - paragraph: 60天密集柱与窄间隔
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - No Gap":
        - heading "Bar Chart - No Gap" [level=3]
        - paragraph: 零间隙柱、渐变与线指示器
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
    - region "图形材质":
      - heading "图形材质" [level=2]
      - region "Bar Chart - 3D Depth":
        - heading "Bar Chart - 3D Depth" [level=3]
        - paragraph: 顶面侧面构成立体柱及线指示器
        - button "更新数据"
        - button "重播动效"
        - text: 0 20 40 60 80 一班 二班 三班 四班 五班 六班
        - paragraph: 人数 · 按日期或班级比较
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Gradient":
        - heading "Bar Chart - Gradient" [level=3]
        - paragraph: 系列渐变柱填充
        - button "更新数据"
        - button "重播动效"
        - paragraph: 本卡使用独立示例配色，保留材质或色阶差异。
        - text: 0 20 40 60 80 一班 二班 三班 四班 五班 六班
        - paragraph: 人数 · 按日期或班级比较
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Shape & Gradient":
        - heading "Bar Chart - Shape & Gradient" [level=3]
        - paragraph: 离散方块柱、渐变与吸附圆环指示
        - button "更新数据"
        - button "重播动效"
        - paragraph: 本卡使用独立示例配色，保留材质或色阶差异。
        - text: 0 20 40 60 80 一班 二班 三班 四班 五班 六班
        - paragraph: 人数 · 按日期或班级比较
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Shape Squircle Ring":
        - heading "Bar Chart - Shape Squircle Ring" [level=3]
        - paragraph: 圆角方块柱与吸附方环指示
        - button "更新数据"
        - button "重播动效"
        - text: 0 20 40 60 80 一班 二班 三班 四班 五班 六班
        - paragraph: 人数 · 按日期或班级比较
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Pattern":
        - heading "Bar Chart - Pattern" [level=3]
        - paragraph: 斜线图案柱填充
        - button "更新数据"
        - button "重播动效"
        - text: 0 20 40 60 80 一班 二班 三班 四班 五班 六班
        - paragraph: 人数 · 按日期或班级比较
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
    - region "坐标与辅助读数":
      - heading "坐标与辅助读数" [level=2]
      - region "Bar Chart - Left Y axis":
        - heading "Bar Chart - Left Y axis" [level=3]
        - paragraph: 分组柱共用左侧数值轴
        - button "更新数据"
        - button "重播动效"
        - text: 0 20 40 60 80 一班 二班 三班 四班 五班 六班
        - paragraph: 人数 · 按日期或班级比较
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Left and right Y axes":
        - heading "Bar Chart - Left and right Y axes" [level=3]
        - paragraph: 左右独立数值轴
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Pattern Background":
        - heading "Bar Chart - Pattern Background" [level=3]
        - paragraph: 图案背景替代网格
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Dot Grid Background":
        - heading "Bar Chart - Dot Grid Background" [level=3]
        - paragraph: 带边缘渐隐的点阵背景
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Reference Band":
        - heading "Bar Chart - Reference Band" [level=3]
        - paragraph: 水平参考区间与边界标识
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Pattern Reference Band":
        - heading "Bar Chart - Pattern Reference Band" [level=3]
        - paragraph: 图案参考区间与相应轴标签
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
    - region "交互与状态":
      - heading "交互与状态" [level=2]
      - region "Bar Chart - Interactive":
        - heading "Bar Chart - Interactive" [level=3]
        - paragraph: 90天活动柱图与悬浮读数
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Loading":
        - heading "Bar Chart - Loading" [level=3]
        - paragraph: 占位柱斜向扫光加载
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
      - region "Bar Chart - Custom Tooltip":
        - heading "Bar Chart - Custom Tooltip" [level=3]
        - paragraph: 提示内容与数值格式定制
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/bar-chart
  - navigation "相关图型":
    - link "面积图":
      - /url: "#chart-area"
    - link "折线图":
      - /url: "#chart-line"
    - link "柱状图":
      - /url: "#chart-bar"
    - link "组合图":
      - /url: "#chart-composed"
    - link "饼图 / 环饼":
      - /url: "#chart-pie"
    - link "多目标进度环":
      - /url: "#chart-ring"
    - link "雷达图":
      - /url: "#chart-radar"
    - link "时间散点":
      - /url: "#chart-scatter"
    - link "漏斗图":
      - /url: "#chart-funnel"
    - link "仪表图":
      - /url: "#chart-gauge"
    - link "桑基图":
      - /url: "#chart-sankey"
    - link "旭日图":
      - /url: "#chart-sunburst"
    - link "日历热图":
      - /url: "#chart-heatmap"
    - link "分区地图":
      - /url: "#chart-choropleth"
    - link "K线图":
      - /url: "#chart-candlestick"
    - link "盈亏线":
      - /url: "#chart-profit-loss"
    - link "实时折线":
      - /url: "#chart-live-line"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdir, writeFile } from "node:fs/promises";
  3  | 
  4  | const evidence = "evidence/runtime/chart-variants/feedback-2026-10-08/material";
  5  | for (const site of [
  6  |   { name: "playground", base: "http://127.0.0.1:5173/" },
  7  |   { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
  8  | ]) for (const width of [1280, 390]) test(`${site.name} uses coordinated materials and light auxiliary hatching at ${width}px`, async ({ page }) => {
  9  |   await mkdir(evidence, { recursive: true });
  10 |   await page.emulateMedia({ reducedMotion: "reduce" });
  11 |   await page.setViewportSize({ width, height: 796 });
  12 |   await page.goto(`${site.base}#chart-bar`);
  13 |   const facts: unknown[] = [];
  14 |   for (const id of ["bar-gradient", "bar-shape-gradient", "bar-pattern", "bar-pattern-reference-band"]) {
  15 |     const card = page.locator(`[data-chart-variant="${id}"]`);
  16 |     await card.scrollIntoViewIfNeeded();
  17 |     await expect(card.locator('[data-ready="true"]')).toBeVisible();
  18 |     if (id !== "bar-pattern-reference-band") {
> 19 |       await expect(card.locator('[data-palette-mode="example"]')).toHaveAttribute("data-recipe", "category-near");
     |                                                                   ^ Error: expect(locator).toHaveAttribute(expected) failed
  20 |       const colors = await card.locator("svg stop, svg pattern path[stroke]").evaluateAll(nodes => nodes.map(node => {
  21 |         const style = getComputedStyle(node);
  22 |         return node.tagName.toLowerCase() === "stop" ? style.stopColor : style.stroke;
  23 |       }));
  24 |       expect(colors.length).toBeGreaterThan(0);
  25 |       for (const color of colors) {
  26 |         const [red, green, blue] = color.match(/\d+(?:\.\d+)?/g)!.map(Number);
  27 |         expect(blue, color).toBeGreaterThanOrEqual(Math.max(red!, green!));
  28 |       }
  29 |       facts.push({ id, colors });
  30 |     }
  31 |     const texture = id === "bar-pattern-reference-band" ? card.locator(".chart-reference-area pattern path, .chart-reference-area pattern line") : card.locator("svg pattern path, svg pattern line");
  32 |     if (await texture.count()) {
  33 |       const opacity = await texture.evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).strokeOpacity)));
  34 |       expect(opacity.every(value => value === (id === "bar-pattern-reference-band" ? .2 : .8))).toBe(true);
  35 |       facts.push({ id, opacity });
  36 |     }
  37 |     await card.screenshot({ path: `${evidence}/${site.name}-${id}-${width}.png` });
  38 |   }
  39 |   await page.goto(`${site.base}#chart-area`);
  40 |   for (const id of ["area-pattern", "area-pattern-reference-band"]) {
  41 |     const card = page.locator(`[data-chart-variant="${id}"]`);
  42 |     await card.scrollIntoViewIfNeeded();
  43 |     const texture = card.locator("svg pattern path, svg pattern line");
  44 |     await expect(texture.first()).toBeAttached();
  45 |     const opacity = await texture.evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).strokeOpacity)));
  46 |     expect(opacity.every(value => value === (id === "area-pattern" ? .8 : .2))).toBe(true);
  47 |     facts.push({ id, opacity });
  48 |     await card.screenshot({ path: `${evidence}/${site.name}-${id}-${width}.png` });
  49 |   }
  50 |   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  51 |   await writeFile(`${evidence}/${site.name}-${width}-facts.json`, JSON.stringify(facts, null, 2));
  52 | });
  53 | 
```