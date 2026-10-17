# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-network.spec.ts >> normal light node centres keep classification text and boundaries readable in each recipe
- Location: tests/e2e/chart-business-network.spec.ts:9:1

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 4.5
Received:    3.731584072276373
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "网络关系图" [level=1] [ref=e8]
      - generic [ref=e9]: 共享候选 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 查看元素、知识点和课程的连接，区分节点类别与关系类型，并读取方向及关联详情。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - text: 业务场景
      - combobox "网络业务场景" [ref=e13]:
        - option "全部场景"
        - option "元素与知识点"
        - option "知识点关联"
        - option "课程先修关系" [selected]
        - option "理论与实践课程"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "网络数据状态" [ref=e15]:
        - option "正常" [selected]
        - option "无数据"
        - option "单节点"
        - option "长名称"
        - option "无效数据"
    - generic [ref=e16]:
      - text: 关系
      - combobox "网络关系类型" [ref=e17]:
        - option "全部关系" [selected]
        - option "先修关系"
        - option "内容相似"
        - option "能力支撑"
    - generic [ref=e18]:
      - text: 配色
      - combobox "网络图表配色" [ref=e19]:
        - option "蓝灰单色" [selected]
        - option "蓝紫近邻"
        - option "多色类别"
    - button "更新数据" [ref=e20] [cursor=pointer]
  - status [ref=e22]: 示例数据 · 更新 0 次 · 已按系统设置减少动效
  - generic [ref=e23]:
    - generic [ref=e24]:
      - generic [ref=e25]: CH-083
      - heading "课程先修与能力支撑关系" [level=2] [ref=e26]
    - paragraph [ref=e27]: 全 Mock 示例：基础、专业和拓展课程各有类别。先修箭头由先修课指向后续课；同一课程对可同时有先修与内容相似关系，用分开的弧线呈现。 示例权重为0—5的关联强度，未提供权重表示未设定。
    - generic [ref=e28]:
      - generic [ref=e29]:
        - group "节点类别" [ref=e30]:
          - generic [ref=e31]: 基础课程
          - generic [ref=e34]: 专业课程
          - generic [ref=e37]: 拓展课程
        - group "关系类型" [ref=e40]:
          - generic [ref=e41]: 先修关系
          - generic [ref=e43]: 内容相似
          - generic [ref=e45]: 能力支撑
      - region "课程先修与能力支撑关系关系图，可横向滚动" [ref=e47]:
        - img [ref=e48]:
          - generic [ref=e58] [cursor=pointer]:
            - generic [ref=e60]: 专业
            - generic [ref=e61]: 算法设计
          - generic [ref=e62] [cursor=pointer]:
            - generic [ref=e64]: 专业
            - generic [ref=e65]: 数据结构
          - generic [ref=e66] [cursor=pointer]:
            - generic [ref=e68]: 专业
            - generic [ref=e69]: 数据库原理
          - generic [ref=e70] [cursor=pointer]:
            - generic [ref=e72]: 拓展
            - generic [ref=e73]: 软件工程实践
          - generic [ref=e74] [cursor=pointer]:
            - generic [ref=e76]: 拓展
            - generic [ref=e77]: 人工智能导论
          - generic [ref=e78] [cursor=pointer]:
            - generic [ref=e80]: 基础
            - generic [ref=e81]: 离散数学
          - generic [ref=e82] [cursor=pointer]:
            - generic [ref=e84]: 专业
            - generic [ref=e85]: 计算机网络
          - generic [ref=e86] [cursor=pointer]:
            - generic [ref=e88]: 基础
            - generic [ref=e89]: 程序设计基础
      - group "选择节点" [ref=e90]:
        - button "程序设计基础，基础课程" [ref=e91] [cursor=pointer]:
          - generic [ref=e92]: 程序设计基础
        - button "离散数学，基础课程" [ref=e93] [cursor=pointer]:
          - generic [ref=e94]: 离散数学
        - button "数据结构，专业课程" [ref=e95] [cursor=pointer]:
          - generic [ref=e96]: 数据结构
        - button "算法设计，专业课程" [ref=e97] [cursor=pointer]:
          - generic [ref=e98]: 算法设计
        - button "数据库原理，专业课程" [ref=e99] [cursor=pointer]:
          - generic [ref=e100]: 数据库原理
        - button "计算机网络，专业课程" [ref=e101] [cursor=pointer]:
          - generic [ref=e102]: 计算机网络
        - button "人工智能导论，拓展课程" [ref=e103] [cursor=pointer]:
          - generic [ref=e104]: 人工智能导论
        - button "软件工程实践，拓展课程" [ref=e105] [cursor=pointer]:
          - generic [ref=e106]: 软件工程实践
      - group [ref=e107]:
        - generic "查看精确数据 · 课程先修与能力支撑关系" [ref=e108] [cursor=pointer]
    - status [ref=e109]: 选择节点查看关联详情；也可通过节点列表操作。
    - paragraph [ref=e110]: 当前 8 个节点、11 条关系 · 示例数据。节点位置只帮助阅读连接，距离不表示相关度。
  - group [ref=e111]:
    - generic "网络图配置、完整源码与示例数据" [ref=e112] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/network-examples.tsx"
    - option "chart-business/network-data.ts"
    - option "chart-business/network-page.css"
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | import { makeNetworkFixtures } from "../../apps/playground/src/docs/components/chart-business/network-data";
  4   | import { measureColorContrast, type ColorValue } from "../../packages/foundations/src/color-registry";
  5   | 
  6   | const evidence = "evidence/runtime/chart-business-expansion/p4/browser";
  7   | const fixtures = makeNetworkFixtures();
  8   | 
  9   | test("normal light node centres keep classification text and boundaries readable in each recipe", async ({ page }) => {
  10  |   await page.emulateMedia({ reducedMotion:"reduce" });
  11  |   await page.goto("/#chart-network");
  12  |   await page.getByRole("combobox", { name:"网络业务场景" }).selectOption("courses");
  13  |   const facts = [];
  14  |   const rgb = (value: string) => value.match(/[\d.]+/g)!.slice(0,3).map(Number) as unknown as ColorValue["rgb"];
  15  |   for (const recipe of ["monochrome-blue", "category-near", "category-wide"]) {
  16  |     await page.getByRole("combobox", { name:"网络图表配色" }).selectOption(recipe);
  17  |     const paints = await page.locator(".rain-network__svg [data-network-node]").evaluateAll(nodes => nodes.map(node => {
  18  |       const circle = node.querySelector("circle")!, text = node.querySelector("text")!;
  19  |       const id = circle.getAttribute("fill")!.match(/^url\(#(.+)\)$/)![1]!;
  20  |       const stop = document.getElementById(id)!.querySelector("stop")!;
  21  |       return { foreground:getComputedStyle(text).fill, border:getComputedStyle(circle).stroke, centre:getComputedStyle(stop).stopColor, opacity:Number(getComputedStyle(stop).stopOpacity), background:getComputedStyle(document.body).backgroundColor };
  22  |     }));
  23  |     const ratios = paints.map(paint => {
  24  |       const background = { rgb:rgb(paint.background),alpha:1 };
  25  |       const centre = rgb(paint.centre).map((channel,index) => channel*paint.opacity+background.rgb[index]!*(1-paint.opacity)) as unknown as ColorValue["rgb"];
  26  |       return { text:measureColorContrast({rgb:rgb(paint.foreground),alpha:1},{rgb:centre,alpha:1}), border:measureColorContrast({rgb:rgb(paint.border),alpha:1},background) };
  27  |     });
  28  |     facts.push({recipe,paints,ratios});
> 29  |     expect(Math.min(...ratios.map(row => row.text))).toBeGreaterThanOrEqual(4.5);
      |                                                      ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  30  |     expect(Math.min(...ratios.map(row => row.border))).toBeGreaterThanOrEqual(3);
  31  |   }
  32  |   await mkdir(evidence,{recursive:true});
  33  |   await writeFile(`${evidence}/network-contrast-facts.json`,JSON.stringify({scope:"normal light; worst gradient centre over actual opaque body; faded/forced-colors/dark not accepted",facts},null,2));
  34  | });
  35  | 
  36  | for (const motion of ["no-preference", "reduce"] as const) {
  37  |   test(`${motion}: four network examples support equivalent selection, filtering and stable updates`, async ({ page }) => {
  38  |     const errors: string[] = [];
  39  |     page.on("pageerror", error => errors.push(error.message));
  40  |     await page.emulateMedia({ reducedMotion: motion });
  41  |     await page.goto("/#chart-network");
  42  |     await mkdir(evidence, { recursive:true });
  43  |     await expect(page.getByRole("heading", { name:"网络关系图", exact:true })).toBeVisible();
  44  |     await expect(page.locator("[data-network-example]")).toHaveCount(4);
  45  |     for (const fixture of fixtures) {
  46  |       const chart = page.locator(`[data-network-example="${fixture.id}"]`);
  47  |       await expect(chart.locator("[data-network-node]")).toHaveCount(fixture.nodes.length);
  48  |       await expect(chart.locator("[data-network-edge]")).toHaveCount(fixture.edges.length);
  49  |       expect(await chart.locator("path[data-network-edge]").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
  50  |       await expect(chart.getByText(fixture.reference, { exact:true })).toBeVisible();
  51  |       if (motion === "no-preference") await chart.screenshot({ path:`${evidence}/network-${fixture.id}-desktop.png` });
  52  |     }
  53  |     const markers = await page.locator(".rain-network__svg marker").evaluateAll(nodes => nodes.map(node => node.id));
  54  |     expect(new Set(markers).size).toBe(markers.length);
  55  |     expect(markers.length).toBeGreaterThanOrEqual(4);
  56  | 
  57  |     await page.getByRole("combobox", { name:"网络业务场景" }).selectOption("elements");
  58  |     const fixture = fixtures.find(item => item.id === "elements")!;
  59  |     const chart = page.locator('[data-network-example="elements"]');
  60  |     const first = fixture.nodes[0]!;
  61  |     const nodeName = `${first.label}，${fixture.categories.find(item => item.id === first.category)!.label}`;
  62  |     await chart.locator(`[data-network-node="${first.id}"]`).click();
  63  |     await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", first.id);
  64  |     await chart.getByRole("button", { name:"清除节点选择" }).click();
  65  |     const quiz = fixture.nodes.find(node => node.id === "quiz")!;
  66  |     const quizName = `${quiz.label}，${fixture.categories.find(item => item.id === quiz.category)!.label}`;
  67  |     await chart.locator(`[data-network-node="${first.id}"]`).hover();
  68  |     await chart.getByRole("button", { name:quizName, exact:true }).focus();
  69  |     const quizAdjacent = new Set([quiz.id, ...fixture.edges.filter(edge => edge.source === quiz.id || edge.target === quiz.id).flatMap(edge => [edge.source, edge.target])]);
  70  |     for (const node of fixture.nodes) await expect(chart.locator(`[data-network-node="${node.id}"]`)).toHaveAttribute("data-highlighted", String(quizAdjacent.has(node.id)));
  71  |     await chart.screenshot({ path:`${evidence}/network-hover-focus-${motion}.png` });
  72  |     await page.mouse.move(0, 0);
  73  |     await chart.locator(`[data-network-node="${first.id}"]`).hover();
  74  |     await expect(chart.locator(`[data-network-node="${first.id}"]`)).toHaveAttribute("data-highlighted", "true");
  75  |     await expect(chart.locator(`[data-network-node="${quiz.id}"]`)).toHaveAttribute("data-highlighted", "false");
  76  |     await chart.getByRole("button", { name:nodeName, exact:true }).focus();
  77  |     const adjacent = new Set([first.id, ...fixture.edges.filter(edge => edge.source === first.id || edge.target === first.id).flatMap(edge => [edge.source, edge.target])]);
  78  |     for (const node of fixture.nodes) await expect(chart.locator(`[data-network-node="${node.id}"]`)).toHaveAttribute("data-highlighted", String(adjacent.has(node.id)));
  79  |     await page.keyboard.press("Enter");
  80  |     await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", first.id);
  81  |     await expect(chart.locator(".rain-network-feedback")).toHaveText(`已选择：${first.label}`);
  82  | 
  83  |     const moving = chart.locator(`[data-network-node="${fixture.nodes[1]!.id}"]`);
  84  |     await moving.evaluate(node => node.setAttribute("data-test-retained-node", "true"));
  85  |     await chart.locator(".rain-network").evaluate(node => node.setAttribute("data-test-retained-root", "true"));
  86  |     const position = () => moving.evaluate(node => { const box = node.getBoundingClientRect(), viewport = node.closest("svg")!.getBoundingClientRect(); return { x:Number((box.x - viewport.x).toFixed(1)), y:Number((box.y - viewport.y).toFixed(1)) }; });
  87  |     if (motion === "no-preference") await page.waitForTimeout(500);
  88  |     const before = await position();
  89  |     await page.getByRole("button", { name:"更新数据", exact:true }).click();
  90  |     await page.waitForTimeout(80);
  91  |     const middle = await position();
  92  |     await page.waitForTimeout(500);
  93  |     const after = await position();
  94  |     expect(Math.hypot(after.x - before.x, after.y - before.y)).toBeGreaterThan(1);
  95  |     if (motion === "reduce") expect(middle).toEqual(after);
  96  |     else expect(middle).not.toEqual(after);
  97  |     await expect(chart.locator('[data-test-retained-node="true"]')).toHaveCount(1);
  98  |     await expect(chart.locator(".rain-network")).toHaveAttribute("data-recipe", "monochrome-blue");
  99  |     const recipeColors = await chart.locator(".rain-network").evaluate(node => ({ first:getComputedStyle(node).getPropertyValue("--chart-1").trim(), last:getComputedStyle(node).getPropertyValue("--chart-3").trim() }));
  100 |     expect(recipeColors.first.toLowerCase()).toBe("#6288c7");
  101 |     expect(recipeColors.last.toLowerCase()).toBe("#91b0e1");
  102 |     await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", first.id);
  103 | 
  104 |     await page.getByRole("combobox", { name:"网络关系类型" }).selectOption("examines");
  105 |     const expectedEdges = fixture.edges.filter(edge => edge.relation === "examines");
  106 |     const expectedNodes = new Set(expectedEdges.flatMap(edge => [edge.source, edge.target]));
  107 |     await expect(chart.locator("[data-network-edge]")).toHaveCount(expectedEdges.length);
  108 |     await expect(chart.locator("[data-network-node]")).toHaveCount(expectedNodes.size);
  109 |     await expect(chart.locator('[data-test-retained-root="true"]')).toHaveCount(1);
  110 |     await expect(chart.locator(".rain-network__detail[data-selected-node]")).toHaveCount(0);
  111 |     await expect(chart.locator(".rain-network-feedback")).not.toContainText("已选择");
  112 |     await chart.locator(".rain-network__nodes button").first().focus();
  113 |     await page.keyboard.press("Enter");
  114 |     await expect(chart.locator(".rain-network__detail[data-selected-node]")).toHaveCount(1);
  115 |     await chart.getByRole("button", { name:"清除节点选择" }).click();
  116 |     await expect(chart.locator(".rain-network__detail[data-selected-node]")).toHaveCount(0);
  117 | 
  118 |     await page.getByRole("combobox", { name:"网络关系类型" }).selectOption("all");
  119 |     await page.getByText("网络图配置、完整源码与示例数据", { exact:true }).click();
  120 |     const source = await page.locator('a[download="main.tsx"]').getAttribute("href");
  121 |     expect(decodeURIComponent(source ?? "")).toContain('"fixtureId":"elements"');
  122 |     expect(decodeURIComponent(source ?? "")).toContain('"revision":1');
  123 |     await page.getByText("网络图配置、完整源码与示例数据", { exact:true }).click();
  124 |     expect(errors).toEqual([]);
  125 |     await mkdir(evidence, { recursive:true });
  126 |     await page.screenshot({ path:`${evidence}/network-elements-${motion}.png`, fullPage:true });
  127 |     await writeFile(`${evidence}/network-motion-${motion}.json`, JSON.stringify({ motion, before, middle, after, stableIdentity:true, instanceMarkerIds:markers, pageErrors:errors }, null, 2));
  128 |   });
  129 | 
```