# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-typography-feedback.spec.ts >> card and table trends prefer filled compact areas while the gallery retains both trend forms
- Location: tests/e2e/chart-business-typography-feedback.spec.ts:66:1

# Error details

```
Error: card

expect(received).toBe(expected) // Object.is equality

Expected: "area"
Received: "line"
```

```
Error: card

expect(received).toBe(expected) // Object.is equality

Expected: "compact"
Received: "comfortable"
```

```
Error: card

expect(received).toBe(expected) // Object.is equality

Expected: 96
Received: 128
```

```
Error: card

expect(received).toBe(expected) // Object.is equality

Expected: 32
Received: 48
```

```
Error: table

expect(received).toBe(expected) // Object.is equality

Expected: "area"
Received: "line"
```

```
Error: table

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

```
Error: table

expect(received).toBe(expected) // Object.is equality

Expected: "area"
Received: "line"
```

```
Error: table

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

```
Error: table

expect(received).toBe(expected) // Object.is equality

Expected: "area"
Received: "line"
```

```
Error: table

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

```
Error: table

expect(received).toBe(expected) // Object.is equality

Expected: "area"
Received: "line"
```

```
Error: table

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

```
Error: table

expect(received).toBe(expected) // Object.is equality

Expected: "area"
Received: "line"
```

```
Error: table

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "迷你图表与业务组合" [level=1] [ref=e8]
      - generic [ref=e9]: 共享候选 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 大小条形、轻量趋势、构成与进度，组合进日常阅读数据的地方。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - text: 配色
      - combobox "业务图表配色" [ref=e13]:
        - option "蓝灰单色" [selected]
        - option "蓝紫近邻"
        - option "多色类别"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "业务数据状态" [ref=e15]:
        - option "正常" [selected]
        - option "全零"
        - option "缺测"
        - option "无效数据"
        - option "无数据"
        - option "单项"
        - option "长名称"
    - button "更新数据" [ref=e16] [cursor=pointer]
    - button "重播动效" [ref=e18] [cursor=pointer]
    - button "按数量排序" [ref=e20] [cursor=pointer]
    - button "只看50人以上" [ref=e22] [cursor=pointer]
    - button "40行场景" [ref=e24] [cursor=pointer]
  - status [ref=e26]: 示例数据 · 更新 0 次 · 已按系统设置减少动效
  - generic [ref=e27]:
    - region [ref=e28]:
      - heading "同一量程，大小都能比较" [level=2] [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e32]:
          - generic:
            - generic:
              - generic "计算机学院"
            - generic:
              - generic "经济管理学院"
            - generic:
              - generic "人文学院"
            - generic:
              - generic "理学院"
            - generic:
              - generic "外国语学院"
        - list [ref=e44]:
          - listitem [ref=e45]:
            - generic [ref=e46]: 计算机学院
            - generic [ref=e49]: 25 人
          - listitem [ref=e50]:
            - generic [ref=e51]: 经济管理学院
            - generic [ref=e54]: 50 人
          - listitem [ref=e55]:
            - generic [ref=e56]: 人文学院
            - generic [ref=e59]: 100 人
          - listitem [ref=e60]:
            - generic [ref=e61]: 理学院
            - generic [ref=e64]: 75 人
          - listitem [ref=e65]:
            - generic [ref=e66]: 外国语学院
            - generic [ref=e69]: 45 人
    - generic [ref=e70]:
      - heading "分组比较与互斥堆叠" [level=2] [ref=e71]
      - generic [ref=e72]:
        - figure "本期与上期参与人数" [ref=e73]:
          - generic [ref=e76]:
            - generic:
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e94]:
            - generic [ref=e95]: 本期
            - generic [ref=e97]: 上期
          - group [ref=e99]:
            - generic "查看分项读数" [ref=e100]
        - figure "互斥课程构成" [ref=e101]:
          - generic [ref=e104]:
            - generic:
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e128]:
            - generic [ref=e129]: 已完成
            - generic [ref=e131]: 进行中
            - generic [ref=e133]: 待开始
          - group [ref=e135]:
            - generic "查看分项读数" [ref=e136]
      - generic [ref=e137]:
        - generic [ref=e138]: 评分 7.5 / 10
        - generic [ref=e142]: 相对位置 12 / 60（从前到后）
    - region [ref=e146]:
      - heading "同一图形，两种阅读密度" [level=2] [ref=e147]
      - generic [ref=e148]:
        - figure "数量条 · 紧凑 本期人数 · 25 人" [ref=e149]:
          - generic [ref=e155]:
            - strong [ref=e156]: 数量条 · 紧凑
            - generic [ref=e157]: 本期人数 · 25 人
        - figure "数量条 · 舒展 本期人数 · 25 人" [ref=e158]:
          - generic [ref=e164]:
            - strong [ref=e165]: 数量条 · 舒展
            - generic [ref=e166]: 本期人数 · 25 人
        - figure "构成分段 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e167]:
          - generic [ref=e184]:
            - strong [ref=e185]: 构成分段 · 紧凑
            - list [ref=e186]:
              - listitem [ref=e187]:
                - text: 已完成
                - generic [ref=e189]: 13 人
              - listitem [ref=e190]:
                - text: 进行中
                - generic [ref=e192]: 8 人
              - listitem [ref=e193]:
                - text: 待开始
                - generic [ref=e195]: 4 人
        - figure "构成分段 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e196]:
          - generic [ref=e213]:
            - strong [ref=e214]: 构成分段 · 舒展
            - list [ref=e215]:
              - listitem [ref=e216]:
                - text: 已完成
                - generic [ref=e218]: 13 人
              - listitem [ref=e219]:
                - text: 进行中
                - generic [ref=e221]: 8 人
              - listitem [ref=e222]:
                - text: 待开始
                - generic [ref=e224]: 4 人
        - figure "每日柱图 · 紧凑 近8天每日人数 · 共同上限 88 人" [ref=e225]:
          - generic [ref=e245]:
            - strong [ref=e246]: 每日柱图 · 紧凑
            - generic [ref=e247]: 近8天每日人数 · 共同上限 88 人
        - figure "每日柱图 · 舒展 近8天每日人数 · 共同上限 88 人" [ref=e248]:
          - generic [ref=e268]:
            - strong [ref=e269]: 每日柱图 · 舒展
            - generic [ref=e270]: 近8天每日人数 · 共同上限 88 人
        - figure "小饼 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e271]:
          - generic [ref=e280]:
            - strong [ref=e281]: 小饼 · 紧凑
            - list [ref=e282]:
              - listitem [ref=e283]:
                - text: 已完成
                - generic [ref=e285]: 13 人
              - listitem [ref=e286]:
                - text: 进行中
                - generic [ref=e288]: 8 人
              - listitem [ref=e289]:
                - text: 待开始
                - generic [ref=e291]: 4 人
        - figure "小饼 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e292]:
          - generic [ref=e301]:
            - strong [ref=e302]: 小饼 · 舒展
            - list [ref=e303]:
              - listitem [ref=e304]:
                - text: 已完成
                - generic [ref=e306]: 13 人
              - listitem [ref=e307]:
                - text: 进行中
                - generic [ref=e309]: 8 人
              - listitem [ref=e310]:
                - text: 待开始
                - generic [ref=e312]: 4 人
        - figure "环饼 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e313]:
          - generic [ref=e322]:
            - strong [ref=e323]: 环饼 · 紧凑
            - list [ref=e324]:
              - listitem [ref=e325]:
                - text: 已完成
                - generic [ref=e327]: 13 人
              - listitem [ref=e328]:
                - text: 进行中
                - generic [ref=e330]: 8 人
              - listitem [ref=e331]:
                - text: 待开始
                - generic [ref=e333]: 4 人
        - figure "环饼 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e334]:
          - generic [ref=e343]:
            - strong [ref=e344]: 环饼 · 舒展
            - list [ref=e345]:
              - listitem [ref=e346]:
                - text: 已完成
                - generic [ref=e348]: 13 人
              - listitem [ref=e349]:
                - text: 进行中
                - generic [ref=e351]: 8 人
              - listitem [ref=e352]:
                - text: 待开始
                - generic [ref=e354]: 4 人
        - figure "完成环 · 紧凑 完成 20 人 · 目标 100 人 · 20%" [ref=e355]:
          - img [ref=e362]:
            - generic [ref=e364] [cursor=pointer]
          - generic [ref=e367]:
            - strong [ref=e368]: 完成环 · 紧凑
            - generic [ref=e369]: 完成 20 人 · 目标 100 人 · 20%
        - figure "完成环 · 舒展 完成 20 人 · 目标 100 人" [ref=e370]:
          - generic [ref=e372]:
            - img [ref=e377]:
              - generic [ref=e379] [cursor=pointer]
            - generic:
              - strong: 20%
              - generic: 完成率
          - generic [ref=e382]:
            - strong [ref=e383]: 完成环 · 舒展
            - generic [ref=e384]: 完成 20 人 · 目标 100 人
        - figure "完成弧 · 紧凑 完成 20 人 · 目标 100 人 · 20%" [ref=e385]:
          - img [ref=e392]:
            - generic [ref=e394] [cursor=pointer]
          - generic [ref=e397]:
            - strong [ref=e398]: 完成弧 · 紧凑
            - generic [ref=e399]: 完成 20 人 · 目标 100 人 · 20%
        - figure "完成弧 · 舒展 完成 20 人 · 目标 100 人" [ref=e400]:
          - generic [ref=e402]:
            - img [ref=e407]:
              - generic [ref=e409] [cursor=pointer]
            - generic:
              - strong: 20%
              - generic: 完成率
          - generic [ref=e412]:
            - strong [ref=e413]: 完成弧 · 舒展
            - generic [ref=e414]: 完成 20 人 · 目标 100 人
        - figure [ref=e415]:
          - generic [ref=e428]:
            - strong [ref=e429]: 折线走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e430]:
          - generic [ref=e443]:
            - strong [ref=e444]: 折线走势 · 舒展
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e445]:
          - generic [ref=e459]:
            - strong [ref=e460]: 面积走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e461]:
          - generic [ref=e475]:
            - strong [ref=e476]: 面积走势 · 舒展
            - text: 近8天每日人数 · 观察变化
    - region [ref=e477]:
      - heading "指标卡：舒展型号" [level=2] [ref=e478]
      - generic [ref=e479]:
        - article [ref=e480]:
          - heading "本期参与人数" [level=3] [ref=e482]
          - generic [ref=e483]:
            - generic [ref=e484]: 25 人
            - paragraph [ref=e497]: 近8天每日人数 · 趋势按自身范围展开
        - article [ref=e498]:
          - heading "课程构成" [level=3] [ref=e500]
          - generic [ref=e501]:
            - generic [ref=e502]: 25 门
            - generic [ref=e511]:
              - generic [ref=e512]:
                - text: 已完成
                - generic [ref=e514]: "13"
              - generic [ref=e515]:
                - text: 进行中
                - generic [ref=e517]: "8"
              - generic [ref=e518]:
                - text: 待开始
                - generic [ref=e520]: "4"
        - article [ref=e521]:
          - heading "目标完成" [level=3] [ref=e523]
          - generic [ref=e524]:
            - generic [ref=e525]:
              - generic [ref=e526]:
                - img [ref=e531]:
                  - generic [ref=e533] [cursor=pointer]
                - generic:
                  - strong: 20%
                  - generic: 完成率
              - generic [ref=e536]: 已完成 20 项
            - paragraph [ref=e537]: 目标 100 项
    - region [ref=e538]:
      - heading "表格：紧凑型号，一起比较" [level=2] [ref=e539]
      - paragraph [ref=e540]: 参与人数共用 0—100 人量程；每日柱图共用 0—88 人量程。折线用于看各自走势；点击学院名称读取每个数据点。
      - region "学院数据与迷你图表" [ref=e541]:
        - table [ref=e542]:
          - rowgroup [ref=e543]:
            - row [ref=e544]:
              - columnheader "学院" [ref=e545]
              - columnheader "参与人数" [ref=e546]
              - columnheader "近8天趋势" [ref=e547]
              - columnheader "每日分布" [ref=e548]
              - columnheader "课程构成" [ref=e549]
              - columnheader "目标完成" [ref=e550]
          - rowgroup [ref=e551]:
            - row [ref=e552]:
              - cell [ref=e553]:
                - button "计算机学院" [ref=e554] [cursor=pointer]
              - cell "25 人" [ref=e556]
              - cell [ref=e561]
              - cell [ref=e573]
              - cell "共 25 门" [ref=e592]:
                - generic "已完成 13 / 进行中 8 / 待开始 4" [ref=e593]: 共 25 门
              - cell "20%" [ref=e602]:
                - generic [ref=e603]:
                  - img [ref=e609]:
                    - generic [ref=e611] [cursor=pointer]
                  - generic [ref=e614]: 20%
            - row [ref=e615]:
              - cell [ref=e616]:
                - button "经济管理学院" [ref=e617] [cursor=pointer]
              - cell "50 人" [ref=e619]
              - cell [ref=e624]
              - cell [ref=e636]
              - cell "共 50 门" [ref=e655]:
                - generic "已完成 25 / 进行中 15 / 待开始 10" [ref=e656]: 共 50 门
              - cell "35%" [ref=e665]:
                - generic [ref=e666]:
                  - img [ref=e672]:
                    - generic [ref=e674] [cursor=pointer]
                  - generic [ref=e677]: 35%
            - row [ref=e678]:
              - cell [ref=e679]:
                - button "人文学院" [ref=e680] [cursor=pointer]
              - cell "100 人" [ref=e682]
              - cell [ref=e687]
              - cell [ref=e699]
              - cell "共 100 门" [ref=e718]:
                - generic "已完成 50 / 进行中 30 / 待开始 20" [ref=e719]: 共 100 门
              - cell "50%" [ref=e728]:
                - generic [ref=e729]:
                  - img [ref=e735]:
                    - generic [ref=e737] [cursor=pointer]
                  - generic [ref=e740]: 50%
            - row [ref=e741]:
              - cell [ref=e742]:
                - button "理学院" [ref=e743] [cursor=pointer]
              - cell "75 人" [ref=e745]
              - cell [ref=e750]
              - cell [ref=e762]
              - cell "共 75 门" [ref=e781]:
                - generic "已完成 38 / 进行中 23 / 待开始 14" [ref=e782]: 共 75 门
              - cell "65%" [ref=e791]:
                - generic [ref=e792]:
                  - img [ref=e798]:
                    - generic [ref=e800] [cursor=pointer]
                  - generic [ref=e803]: 65%
            - row [ref=e804]:
              - cell [ref=e805]:
                - button "外国语学院" [ref=e806] [cursor=pointer]
              - cell "45 人" [ref=e808]
              - cell [ref=e813]
              - cell [ref=e825]
              - cell "共 45 门" [ref=e844]:
                - generic "已完成 23 / 进行中 14 / 待开始 8" [ref=e845]: 共 45 门
              - cell "80%" [ref=e854]:
                - generic [ref=e855]:
                  - img [ref=e861]:
                    - generic [ref=e863] [cursor=pointer]
                  - generic [ref=e866]: 80%
    - region [ref=e867]:
      - heading "课程列表：读数就近成组" [level=2] [ref=e868]
      - list [ref=e869]:
        - listitem [ref=e870]:
          - strong [ref=e872]: 计算机学院 · 教学任务
          - generic [ref=e873]: 评分 2.5 / 10
          - generic [ref=e877]:
            - img [ref=e883]:
              - generic [ref=e885] [cursor=pointer]
            - generic [ref=e888]:
              - generic [ref=e889]: 20%
              - generic [ref=e890]: 已完成 20 / 100 项
        - listitem [ref=e891]:
          - strong [ref=e893]: 经济管理学院 · 教学任务
          - generic [ref=e894]: 评分 5.0 / 10
          - generic [ref=e898]:
            - img [ref=e904]:
              - generic [ref=e906] [cursor=pointer]
            - generic [ref=e909]:
              - generic [ref=e910]: 35%
              - generic [ref=e911]: 已完成 35 / 100 项
        - listitem [ref=e912]:
          - strong [ref=e914]: 人文学院 · 教学任务
          - generic [ref=e915]: 评分 10.0 / 10
          - generic [ref=e919]:
            - img [ref=e925]:
              - generic [ref=e927] [cursor=pointer]
            - generic [ref=e930]:
              - generic [ref=e931]: 50%
              - generic [ref=e932]: 已完成 50 / 100 项
      - generic [ref=e933]:
        - generic [ref=e934]:
          - img [ref=e939]:
            - generic [ref=e941] [cursor=pointer]
          - generic:
            - strong: 20%
            - generic: 完成率
        - generic [ref=e944]:
          - strong [ref=e945]: 计算机学院 · 本期教学任务
          - paragraph [ref=e946]: 已完成 20 / 100 项
  - group [ref=e947]:
    - generic "条形与嵌入组合源码" [ref=e948] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/mini-data.ts"
    - option "chart-business/mini-layout.ts"
    - option "chart-business/mini-examples.tsx"
    - option "chart-business/bar-examples.tsx"
    - option "chart-business/embedding-examples.tsx"
    - option "chart-business/chart-business.css"
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | const evidence = "evidence/runtime/chart-mini-typography-feedback-2026-10-09/browser";
  5   | 
  6   | async function openBusiness(page: Page) {
  7   |   await page.emulateMedia({ reducedMotion: "reduce" });
  8   |   await page.goto("/#chart-business");
  9   |   await page.evaluate(() => document.fonts.ready);
  10  |   await expect(page.locator('[data-business="horizontal"] span.text-right.text-xs').first()).toBeVisible();
  11  |   await page.locator(".rain-business-table tbody tr").first().scrollIntoViewIfNeeded();
  12  |   await expect(page.locator(".rain-business-table tbody tr")).toHaveCount(5);
  13  | }
  14  | 
  15  | async function saveFacts(name: string, facts: unknown) {
  16  |   await mkdir(evidence, { recursive: true });
  17  |   await writeFile(`${evidence}/${name}.json`, JSON.stringify(facts, null, 2));
  18  | }
  19  | 
  20  | test("business labels and ordinary mini readings use one 13px hierarchy while card metrics retain emphasis", async ({ page }) => {
  21  |   await openBusiness(page);
  22  |   const labels = await page.locator('[data-business^="horizontal"] span.text-right.text-xs, .rain-business-ranking__label, .rain-business-row-link').evaluateAll(nodes => nodes.map(node => {
  23  |     const css = getComputedStyle(node);
  24  |     return { text: node.textContent, className: node.className, fontSize: css.fontSize, lineHeight: css.lineHeight };
  25  |   }));
  26  |   const ordinarySelector = [
  27  |     ".rain-business-mini-gallery figcaption", ".rain-business-mini-gallery figcaption > strong",
  28  |     ".rain-business-mini-legend li", ".rain-business-mini-legend li > span",
  29  |     ".rain-business-reading", ".rain-business-reading small", ".rain-business-number small",
  30  |     ".rain-business-progress-reading strong", ".rain-business-progress-reading > span",
  31  |     ".rain-business-cards p", ".rain-business-composition-reading", ".rain-business-progress-count",
  32  |     ".rain-business-cell-radial", ".rain-business-cell-radial small",
  33  |     ".rain-business-course-list span", ".rain-business-list-progress b", ".rain-business-comfortable-group p",
  34  |   ].join(", ");
  35  |   const ordinary = await page.locator(ordinarySelector).evaluateAll(nodes => nodes.map(node => {
  36  |     const css = getComputedStyle(node);
  37  |     return { text: node.textContent, className: node.className, fontSize: css.fontSize, lineHeight: css.lineHeight };
  38  |   }));
  39  |   const metrics = await page.locator(".rain-business-cards .rain-business-number").evaluateAll(nodes => nodes.map(node => {
  40  |     const css = getComputedStyle(node);
  41  |     return { text: node.textContent, fontSize: css.fontSize, lineHeight: css.lineHeight };
  42  |   }));
  43  |   await page.getByRole("combobox", { name: "业务数据状态" }).selectOption("missing");
  44  |   await expect(page.locator(".rain-business-mini-gallery .rain-business-mini-state").first()).toBeVisible();
  45  |   const states = await page.locator(".rain-business-mini-state").evaluateAll(nodes => nodes.map(node => {
  46  |     const css = getComputedStyle(node);
  47  |     return { text: node.textContent, fontSize: css.fontSize, lineHeight: css.lineHeight };
  48  |   }));
  49  |   await saveFacts("typography", { labels, ordinary, metrics, states });
  50  |   await page.locator(".rain-business-mini-gallery").screenshot({ path: `${evidence}/typography-missing.png` });
  51  |   expect(labels.length).toBeGreaterThanOrEqual(15);
  52  |   for (const label of labels) expect.soft(label.fontSize, `${label.className}: ${label.text}`).toBe("13px");
  53  |   expect(ordinary.length).toBeGreaterThan(0);
  54  |   expect(states.length).toBeGreaterThan(0);
  55  |   for (const reading of [...ordinary, ...states]) {
  56  |     expect.soft(reading.fontSize, reading.text ?? "").toBe("13px");
  57  |     expect.soft(reading.lineHeight, reading.text ?? "").toBe("20px");
  58  |   }
  59  |   expect(metrics).toHaveLength(2);
  60  |   for (const metric of metrics) {
  61  |     expect(metric.fontSize).toBe("28px");
  62  |     expect(metric.lineHeight).toBe("36px");
  63  |   }
  64  | });
  65  | 
  66  | test("card and table trends prefer filled compact areas while the gallery retains both trend forms", async ({ page }) => {
  67  |   await openBusiness(page);
  68  |   const trends = await page.locator('.rain-business-cards [data-mini-kind="line"], .rain-business-cards [data-mini-kind="area"], .rain-business-table [data-mini-kind="line"], .rain-business-table [data-mini-kind="area"]').evaluateAll(nodes => nodes.map(node => {
  69  |     const slot = node.querySelector(".rain-business-mini-slot")!.getBoundingClientRect();
  70  |     const fills = [...node.querySelectorAll<SVGPathElement>("path[d]")].map(path => {
  71  |       const css = getComputedStyle(path);
  72  |       const box = path.getBBox();
  73  |       return { fill: css.fill, opacity: css.opacity, fillOpacity: css.fillOpacity, width: box.width, height: box.height };
  74  |     }).filter(path => path.fill !== "none" && Number(path.opacity) > 0 && Number(path.fillOpacity) > 0 && path.width > 0 && path.height > 0);
  75  |     return { host: node.closest(".rain-business-cards") ? "card" : "table", kind: node.getAttribute("data-mini-kind"), size: node.getAttribute("data-size"), width: slot.width, height: slot.height, fills };
  76  |   }));
  77  |   const gallery = await page.locator('.rain-business-mini-gallery [data-mini-kind="line"], .rain-business-mini-gallery [data-mini-kind="area"]').evaluateAll(nodes => nodes.map(node => ({ kind: node.getAttribute("data-mini-kind"), size: node.getAttribute("data-size") })));
  78  |   await saveFacts("area-hosts", { trends, gallery });
  79  |   await page.locator(".rain-business-cards").screenshot({ path: `${evidence}/area-card.png` });
  80  |   await page.locator(".rain-business-table").screenshot({ path: `${evidence}/area-table.png` });
  81  |   expect(trends).toHaveLength(6);
  82  |   for (const trend of trends) {
  83  |     expect.soft(trend.kind, trend.host).toBe("area");
  84  |     expect.soft(trend.size, trend.host).toBe("compact");
  85  |     expect.soft(trend.width, trend.host).toBe(96);
  86  |     expect.soft(trend.height, trend.host).toBe(32);
> 87  |     expect.soft(trend.fills.length, trend.host).toBeGreaterThan(0);
      |                                                 ^ Error: table
  88  |   }
  89  |   expect(gallery).toEqual([
  90  |     { kind: "line", size: "compact" }, { kind: "line", size: "comfortable" },
  91  |     { kind: "area", size: "compact" }, { kind: "area", size: "comfortable" },
  92  |   ]);
  93  | });
  94  | 
  95  | test("small quantity bars preserve fractions and physical round caps at every table value", async ({ page }) => {
  96  |   await openBusiness(page);
  97  |   const bars = await page.locator(".rain-business-table .rain-data-bar").evaluateAll(nodes => nodes.map(node => {
  98  |     const track = node.getBoundingClientRect();
  99  |     const fill = node.querySelector<HTMLElement>(".rain-data-bar__fill")!;
  100 |     const box = fill.getBoundingClientRect();
  101 |     const css = getComputedStyle(fill);
  102 |     const matrix = new DOMMatrixReadOnly(css.transform === "none" ? undefined : css.transform);
  103 |     const declaredRadius = parseFloat(css.borderTopRightRadius);
  104 |     // Uniform CSS radii are normalized to half the local short side before transforms apply.
  105 |     const usedRadius = Math.min(declaredRadius, fill.offsetWidth / 2, fill.offsetHeight / 2);
  106 |     return { fraction: Number(node.getAttribute("data-fraction")), trackWidth: track.width, trackHeight: track.height, width: box.width, height: box.height,
  107 |       localWidth: fill.offsetWidth, localHeight: fill.offsetHeight, transform: css.transform, a: matrix.a, d: matrix.d,
  108 |       declaredRadius, usedRadius, physicalRadiusX: usedRadius * Math.abs(matrix.a), physicalRadiusY: usedRadius * Math.abs(matrix.d) };
  109 |   }));
  110 |   await saveFacts("quantity-caps", { bars });
  111 |   await page.locator(".rain-business-table").screenshot({ path: `${evidence}/quantity-caps.png` });
  112 |   expect(bars.map(bar => bar.fraction)).toEqual([.25, .5, 1, .75, .45]);
  113 |   for (const bar of bars) {
  114 |     expect.soft(bar.trackHeight, `${bar.fraction}`).toBe(6);
  115 |     expect.soft(bar.width / bar.trackWidth, `${bar.fraction}`).toBeCloseTo(bar.fraction, 3);
  116 |     expect.soft(bar.height, `${bar.fraction}`).toBe(6);
  117 |     expect.soft(bar.a, `${bar.fraction}`).toBeCloseTo(1, 5);
  118 |     expect.soft(bar.d, `${bar.fraction}`).toBeCloseTo(1, 5);
  119 |     expect.soft(bar.physicalRadiusX, `${bar.fraction}`).toBeCloseTo(3, 3);
  120 |     expect.soft(bar.physicalRadiusY, `${bar.fraction}`).toBeCloseTo(3, 3);
  121 |   }
  122 | });
  123 | 
```