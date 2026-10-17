# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [P4] multiple candlesticks keep independent SVG gradients
- Location: tests/e2e/bklit-catalog.spec.ts:10:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 6
Received: 4
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - heading "Rain 图表库" [level=1] [ref=e6]
      - paragraph [ref=e7]: 17种图型，Rain 配色与字体，Bklit 原生动效与交互。
    - link "查看原生与 Rain 对照" [ref=e8] [cursor=pointer]:
      - /url: /bklit-validation.html
  - generic [ref=e9]:
    - navigation "图型目录" [ref=e10]:
      - link "面积图" [ref=e11] [cursor=pointer]:
        - /url: "#chart-area"
      - link "折线图" [ref=e12] [cursor=pointer]:
        - /url: "#chart-line"
      - link "柱状图" [ref=e13] [cursor=pointer]:
        - /url: "#chart-bar"
      - link "组合图" [ref=e14] [cursor=pointer]:
        - /url: "#chart-composed"
      - link "饼图 / 环饼" [ref=e15] [cursor=pointer]:
        - /url: "#chart-pie"
      - link "多目标进度环" [ref=e16] [cursor=pointer]:
        - /url: "#chart-ring"
      - link "雷达图" [ref=e17] [cursor=pointer]:
        - /url: "#chart-radar"
      - link "时间散点" [ref=e18] [cursor=pointer]:
        - /url: "#chart-scatter"
      - link "漏斗图" [ref=e19] [cursor=pointer]:
        - /url: "#chart-funnel"
      - link "仪表图" [ref=e20] [cursor=pointer]:
        - /url: "#chart-gauge"
      - link "桑基图" [ref=e21] [cursor=pointer]:
        - /url: "#chart-sankey"
      - link "旭日图" [ref=e22] [cursor=pointer]:
        - /url: "#chart-sunburst"
      - link "日历热图" [ref=e23] [cursor=pointer]:
        - /url: "#chart-heatmap"
      - link "分区地图" [ref=e24] [cursor=pointer]:
        - /url: "#chart-choropleth"
      - link "K线图" [ref=e25] [cursor=pointer]:
        - /url: "#chart-candlestick"
      - link "盈亏线" [ref=e26] [cursor=pointer]:
        - /url: "#chart-profit-loss"
      - link "实时折线" [ref=e27] [cursor=pointer]:
        - /url: "#chart-live-line"
    - region [ref=e28]:
      - heading "K线图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 开高低收、涨跌方向与原生烛形交互。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "正负与涨跌" [selected]
        - generic [ref=e34]:
          - text: 示例状态
          - combobox "示例状态" [ref=e35]:
            - option "正常数据" [selected]
            - option "无数据"
            - option "零值"
            - option "长标签"
            - option "单项／单点"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=e36] [cursor=pointer]
        - button "重播动效" [ref=e37] [cursor=pointer]
        - button "对照实例" [active] [pressed] [ref=e38] [cursor=pointer]
      - generic [ref=e39]:
        - generic [ref=e40]:
          - generic:
            - generic:
              - generic: "80"
              - generic: "100"
              - generic: "120"
              - generic: "140"
          - generic:
            - generic: Sep 1
            - generic: Sep 7
            - generic: Sep 14
            - generic: Sep 20
        - generic [ref=e90]:
          - button "上涨 / 平盘（收盘≥开盘）" [ref=e92] [cursor=pointer]
          - button "下跌（收盘＜开盘）" [ref=e96] [cursor=pointer]
        - paragraph [ref=e99]: 平盘为横向实体；方向颜色不代表业务好坏。
      - generic [ref=e100]:
        - generic [ref=e101]:
          - generic:
            - generic:
              - generic: "80"
              - generic: "100"
              - generic: "120"
              - generic: "140"
          - generic:
            - generic: Sep 1
            - generic: Sep 7
            - generic: Sep 14
            - generic: Sep 20
        - generic [ref=e171]:
          - button "上涨 / 平盘（收盘≥开盘）" [ref=e173] [cursor=pointer]
          - button "下跌（收盘＜开盘）" [ref=e177] [cursor=pointer]
        - paragraph [ref=e180]: 平盘为横向实体；方向颜色不代表业务好坏。
        - group [ref=e181]:
          - generic "查看精确数据" [ref=e182] [cursor=pointer]
      - status [ref=e183]: 示例数据
      - paragraph [ref=e184]:
        - strong [ref=e185]: 数据要求：
        - text: low≤min(open,close)，high≥max(open,close)，日期有序。
      - paragraph [ref=e186]:
        - strong [ref=e187]: 使用边界：
        - text: 上涨、下跌、平盘只表示方向，不直接表示业务好坏。
      - group [ref=e188]:
        - generic "调用与配方配置" [ref=e189] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("[P0] Rain chart catalog is a usable independent entry", async ({ page }) => {
  4  |   await page.goto("/bklit-catalog.html");
  5  |   await expect(page.getByRole("heading", { name: "Rain 图表库", exact: true })).toBeVisible({ timeout: 5000 });
  6  |   await expect(page.getByRole("navigation", { name: "图型目录" }).getByRole("link")).toHaveCount(17);
  7  |   await expect(page.locator('[data-rain-id="chart-area"] svg').first()).toBeVisible();
  8  | });
  9  | 
  10 | test("[P4] multiple candlesticks keep independent SVG gradients", async ({ page }) => {
  11 |   await page.goto("/bklit-catalog.html#chart-candlestick");
  12 |   await page.getByRole("button", { name: "对照实例" }).click();
  13 |   await expect(page.locator('[data-rain-id="chart-candlestick"]')).toHaveCount(2);
  14 |   await expect(page.locator('[data-rain-id="chart-candlestick"] svg').first()).toBeVisible();
  15 |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  16 |   expect(ids.length).toBeGreaterThan(1);
> 17 |   expect(new Set(ids).size).toBe(ids.length);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  18 | });
  19 | 
```