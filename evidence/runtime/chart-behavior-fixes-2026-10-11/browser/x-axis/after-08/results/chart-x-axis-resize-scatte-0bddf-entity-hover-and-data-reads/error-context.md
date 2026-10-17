# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-x-axis-resize.spec.ts >> scatter no-preference: earliest resize frames retain axis identity, hover and data reads
- Location: tests/e2e/chart-x-axis-resize.spec.ts:98:3

# Error details

```
Error: [{"reason":"resize-event","elapsed":0,"width":999},{"reason":"raf","elapsed":11,"width":999},{"reason":"resize-observer","elapsed":11.900000005960464,"width":999},{"reason":"raf","elapsed":15.100000001490116,"width":999},{"reason":"raf","elapsed":46.400000005960464,"width":390},{"reason":"raf","elapsed":52.80000000447035,"width":390},{"reason":"raf","elapsed":59.900000005960464,"width":390},{"reason":"raf","elapsed":67.70000000298023,"width":390},{"reason":"raf","elapsed":76.10000000149012,"width":390},{"reason":"raf","elapsed":83.60000000149012,"width":390}]

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "时间散点" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 时间轴上的多系列观测值与点聚焦。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - generic:
            - generic:
              - generic: "0"
              - generic: "100"
              - generic: "200"
              - generic: "300"
              - generic: "400"
          - generic:
            - generic: Sep 1
            - generic: Sep 9
            - generic: Sep 17
            - generic: Sep 24
        - generic [ref=e246]:
          - button "参与人数 · 人" [ref=e248] [cursor=pointer]
          - button "完成人数 · 人" [ref=e252] [cursor=pointer]
          - button "复习人数 · 人" [ref=e256] [cursor=pointer]
        - group [ref=e259]:
          - generic "查看精确数据" [ref=e260] [cursor=pointer]
      - generic [ref=e261]:
        - generic [ref=e262]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e263]:
            - option "蓝紫近邻" [selected]
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
        - generic [ref=e264]:
          - text: 示例状态
          - combobox "示例状态" [ref=e265]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - generic [ref=e266]:
          - text: 系列数
          - combobox "系列数" [ref=e267]:
            - option "3" [selected]
            - option "5"
        - button "更新数据" [ref=e268] [cursor=pointer]
        - button "重播动效" [ref=e270] [cursor=pointer]
      - status [ref=e272]: 示例数据 · 已更新 1 次
  - group [ref=e273]:
    - generic "调用配置、完整源码与示例数据" [ref=e274] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-variants/data/README.md"
    - option "chart-variants/data/world.geojson"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
    - option "chart-business/mini-examples.tsx"
    - option "chart-business/mini-data.ts"
    - option "chart-business/mini-layout.ts"
    - option "chart-business/chart-business.css"
    - option "chart-business/matrix-examples.tsx"
    - option "chart-business/matrix-data.ts"
    - option "chart-business/network-examples.tsx"
    - option "chart-business/network-data.ts"
    - option "chart-business/network-page.css"
  - region "全部图表变体" [ref=e275]:
    - navigation "变体分组" [ref=e276]:
      - button "基础结构" [ref=e277] [cursor=pointer]
      - button "图形材质" [ref=e279] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e281] [cursor=pointer]
    - region [ref=e283]:
      - heading "基础结构" [level=2] [ref=e284]
      - region [ref=e286]:
        - generic [ref=e287]:
          - heading "Scatter Chart" [level=3] [ref=e288]
          - paragraph [ref=e289]: 多系列日期散点、外环与十字提示
        - generic [ref=e290]:
          - generic [ref=e291]:
            - generic [ref=e292]:
              - generic:
                - generic: Sep 1
                - generic: Sep 9
                - generic: Sep 17
                - generic: Sep 24
            - generic [ref=e448]:
              - button "参与人数 · 人" [ref=e450] [cursor=pointer]
              - button "完成人数 · 人" [ref=e453] [cursor=pointer]
            - paragraph [ref=e455]: 横轴为日期，纵轴从 0 起表示非负数值。
            - group [ref=e456]:
              - generic "查看精确数据" [ref=e457] [cursor=pointer]
          - generic [ref=e458]:
            - button "更新数据" [ref=e459] [cursor=pointer]
            - button "重播动效" [ref=e461] [cursor=pointer]
            - status [ref=e463]: 示例数据 · 已更新 0 次
          - group [ref=e464]:
            - generic "查看本卡代码" [ref=e465] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/comparison.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e466] [cursor=pointer]:
          - /url: https://bklit.com/charts/scatter-chart
          - generic [ref=e467]: 对应官网示例
          - generic [ref=e468]: （新标签页打开）
    - region [ref=e469]:
      - heading "图形材质" [level=2] [ref=e470]
      - generic [ref=e471]:
        - region [ref=e472]:
          - generic [ref=e473]:
            - heading "Scatter Chart - No Rings" [level=3] [ref=e474]
            - paragraph [ref=e475]: 只保留实心点
          - generic [ref=e476]:
            - paragraph [ref=e478]: 滚动到此处查看示例
            - generic [ref=e479]:
              - button "更新数据" [ref=e480] [cursor=pointer]
              - button "重播动效" [ref=e482] [cursor=pointer]
              - status [ref=e484]: 示例数据 · 已更新 0 次
            - group [ref=e485]:
              - generic "查看本卡代码" [ref=e486] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e487] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e488]: 对应官网示例
            - generic [ref=e489]: （新标签页打开）
        - region [ref=e490]:
          - generic [ref=e491]:
            - heading "Scatter Chart - Small Dots" [level=3] [ref=e492]
            - paragraph [ref=e493]: 更小半径与细外环
          - generic [ref=e494]:
            - paragraph [ref=e496]: 滚动到此处查看示例
            - generic [ref=e497]:
              - button "更新数据" [ref=e498] [cursor=pointer]
              - button "重播动效" [ref=e500] [cursor=pointer]
              - status [ref=e502]: 示例数据 · 已更新 0 次
            - group [ref=e503]:
              - generic "查看本卡代码" [ref=e504] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e505] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e506]: 对应官网示例
            - generic [ref=e507]: （新标签页打开）
        - region [ref=e508]:
          - generic [ref=e509]:
            - heading "Scatter Chart - Wide Ring Gap" [level=3] [ref=e510]
            - paragraph [ref=e511]: 加大点与外环的间隙
          - generic [ref=e512]:
            - paragraph [ref=e514]: 滚动到此处查看示例
            - generic [ref=e515]:
              - button "更新数据" [ref=e516] [cursor=pointer]
              - button "重播动效" [ref=e518] [cursor=pointer]
              - status [ref=e520]: 示例数据 · 已更新 0 次
            - group [ref=e521]:
              - generic "查看本卡代码" [ref=e522] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e523] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e524]: 对应官网示例
            - generic [ref=e525]: （新标签页打开）
    - region [ref=e526]:
      - heading "坐标与辅助读数" [level=2] [ref=e527]
      - generic [ref=e528]:
        - region [ref=e529]:
          - generic [ref=e530]:
            - heading "Scatter Chart - Left Y axis" [level=3] [ref=e531]
            - paragraph [ref=e532]: 系列共用左侧数值轴
          - generic [ref=e533]:
            - paragraph [ref=e535]: 滚动到此处查看示例
            - generic [ref=e536]:
              - button "更新数据" [ref=e537] [cursor=pointer]
              - button "重播动效" [ref=e539] [cursor=pointer]
              - status [ref=e541]: 示例数据 · 已更新 0 次
            - group [ref=e542]:
              - generic "查看本卡代码" [ref=e543] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e544] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e545]: 对应官网示例
            - generic [ref=e546]: （新标签页打开）
        - region [ref=e547]:
          - generic [ref=e548]:
            - heading "Scatter Chart - Left and right Y axes" [level=3] [ref=e549]
            - paragraph [ref=e550]: 左右独立数值轴
          - generic [ref=e551]:
            - paragraph [ref=e553]: 滚动到此处查看示例
            - generic [ref=e554]:
              - button "更新数据" [ref=e555] [cursor=pointer]
              - button "重播动效" [ref=e557] [cursor=pointer]
              - status [ref=e559]: 示例数据 · 已更新 0 次
            - group [ref=e560]:
              - generic "查看本卡代码" [ref=e561] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e562] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e563]: 对应官网示例
            - generic [ref=e564]: （新标签页打开）
        - region [ref=e565]:
          - generic [ref=e566]:
            - heading "Scatter Chart - Pattern Background" [level=3] [ref=e567]
            - paragraph [ref=e568]: 图案背景替代网格
          - generic [ref=e569]:
            - paragraph [ref=e571]: 滚动到此处查看示例
            - generic [ref=e572]:
              - button "更新数据" [ref=e573] [cursor=pointer]
              - button "重播动效" [ref=e575] [cursor=pointer]
              - status [ref=e577]: 示例数据 · 已更新 0 次
            - group [ref=e578]:
              - generic "查看本卡代码" [ref=e579] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e580] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e581]: 对应官网示例
            - generic [ref=e582]: （新标签页打开）
        - region [ref=e583]:
          - generic [ref=e584]:
            - heading "Scatter Chart - Dot Grid Background" [level=3] [ref=e585]
            - paragraph [ref=e586]: 带边缘渐隐的点阵背景
          - generic [ref=e587]:
            - paragraph [ref=e589]: 滚动到此处查看示例
            - generic [ref=e590]:
              - button "更新数据" [ref=e591] [cursor=pointer]
              - button "重播动效" [ref=e593] [cursor=pointer]
              - status [ref=e595]: 示例数据 · 已更新 0 次
            - group [ref=e596]:
              - generic "查看本卡代码" [ref=e597] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e598] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e599]: 对应官网示例
            - generic [ref=e600]: （新标签页打开）
        - region [ref=e601]:
          - generic [ref=e602]:
            - heading "Scatter Chart - Reference Band" [level=3] [ref=e603]
            - paragraph [ref=e604]: 水平参考区间与边界标识
          - generic [ref=e605]:
            - paragraph [ref=e607]: 滚动到此处查看示例
            - generic [ref=e608]:
              - button "更新数据" [ref=e609] [cursor=pointer]
              - button "重播动效" [ref=e611] [cursor=pointer]
              - status [ref=e613]: 示例数据 · 已更新 0 次
            - group [ref=e614]:
              - generic "查看本卡代码" [ref=e615] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e616] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e617]: 对应官网示例
            - generic [ref=e618]: （新标签页打开）
        - region [ref=e619]:
          - generic [ref=e620]:
            - heading "Scatter Chart - Pattern Reference Band" [level=3] [ref=e621]
            - paragraph [ref=e622]: 图案参考区间与相应轴标签
          - generic [ref=e623]:
            - paragraph [ref=e625]: 滚动到此处查看示例
            - generic [ref=e626]:
              - button "更新数据" [ref=e627] [cursor=pointer]
              - button "重播动效" [ref=e629] [cursor=pointer]
              - status [ref=e631]: 示例数据 · 已更新 0 次
            - group [ref=e632]:
              - generic "查看本卡代码" [ref=e633] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e634] [cursor=pointer]:
            - /url: https://bklit.com/charts/scatter-chart
            - generic [ref=e635]: 对应官网示例
            - generic [ref=e636]: （新标签页打开）
  - generic [ref=e637]:
    - heading "数据与使用边界" [level=2] [ref=e638]
    - paragraph [ref=e639]: X为Date，Y为非负值；本例记录每天人数。
    - paragraph [ref=e640]: 当前不是任意XY散点，不支持负Y；同一时间的多值以系列表达。
    - paragraph [ref=e641]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e642] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e644]:
    - generic "接口与调用示例" [ref=e645] [cursor=pointer]
  - navigation "相关图型" [ref=e646]:
    - link "面积图" [ref=e647] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e649] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e651] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e653] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e655] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e657] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e659] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e661] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e663] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e665] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e667] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e669] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e671] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e673] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e675] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e677] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e679] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e681] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e683] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  44  |     const host = document.querySelector(selector)!;
  45  |     const store = window as unknown as { __axisIds?: WeakMap<Element, number>; __axisCounter?: number; __axisDone?: Promise<FrameAudit> };
  46  |     store.__axisIds ??= new WeakMap();
  47  |     store.__axisCounter ??= 0;
  48  |     const ticks = () => [...host.querySelectorAll("span.whitespace-nowrap.text-chart-label.text-xs")].filter(node => {
  49  |       const parent = node.parentElement!;
  50  |       return parent.style.bottom === "12px" && parent.style.width === "0px" && parent.style.display === "flex";
  51  |     });
  52  |     const id = (node: Element) => {
  53  |       if (!store.__axisIds!.has(node)) store.__axisIds!.set(node, ++store.__axisCounter!);
  54  |       return store.__axisIds!.get(node)!;
  55  |     };
  56  |     const beforeIds = ticks().map(id);
  57  |     const samples: Sample[] = [];
  58  |     let count = 0, started: number | null = targetWidth == null ? performance.now() : null;
  59  |     let firstEvent: string | null = null;
  60  |     let finish: (value: FrameAudit) => void;
  61  |     store.__axisDone = new Promise(resolve => { finish = resolve; });
  62  |     const sample = (reason: string) => {
  63  |       if (targetWidth !== null && innerWidth !== targetWidth) return;
  64  |       started ??= performance.now();
  65  |       firstEvent ??= reason;
  66  |       samples.push({ reason, elapsed: performance.now() - started, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
  67  |         overflowTicks: [...document.querySelectorAll('span.whitespace-nowrap.text-chart-label.text-xs')].filter(node => node.getBoundingClientRect().right > innerWidth + 1).map(node => ({ label: node.textContent, host: node.closest('[data-rain-id]')?.getAttribute('data-rain-id'), example: node.closest('[data-chart-example],[data-category-example]')?.outerHTML.slice(0,200), right: node.getBoundingClientRect().right, inlineLeft: node.parentElement!.style.left, parentWidth: node.parentElement!.parentElement!.getBoundingClientRect().width, transition: getComputedStyle(node.parentElement!).transition })),
  68  |         overflowElements: [...document.querySelectorAll('svg,div,span')].filter(node => node.getBoundingClientRect().right > innerWidth + 1 && node.closest('.rain-chart-plot,.rain-category-plot')).map(node => ({ tag: node.tagName, class: node.getAttribute('class'), host: node.closest('[data-rain-id]')?.getAttribute('data-rain-id'), right: node.getBoundingClientRect().right, width: node.getBoundingClientRect().width, attributeWidth: node.getAttribute('width'), parentClass: node.parentElement!.getAttribute('class') ?? '', parentWidth: node.parentElement!.getBoundingClientRect().width })).slice(0,25),
  69  |         ticks: ticks().map(node => {
  70  |           const box = node.getBoundingClientRect(), parent = node.parentElement!, style = getComputedStyle(parent), text = getComputedStyle(node);
  71  |           return { id: id(node), label: node.textContent ?? "", left: box.left, right: box.right, center: (box.left + box.right) / 2, position: style.left, transition: style.transition, color: text.color, fontSize: text.fontSize, inlineLeft: parent.style.left, overlayWidth: parent.parentElement!.getBoundingClientRect().width, containingWidth: parent.parentElement!.parentElement!.getBoundingClientRect().width };
  72  |         }),
  73  |       });
  74  |     };
  75  |     const resize = () => sample("resize-event");
  76  |     addEventListener("resize", resize);
  77  |     const observer = new ResizeObserver(() => sample("resize-observer"));
  78  |     const plot = host.querySelector(".rain-chart-plot,.rain-category-plot") ?? host;
  79  |     observer.observe(plot);
  80  |     const next = () => {
  81  |       if (targetWidth === null || innerWidth === targetWidth) { sample("raf"); count++; }
  82  |       if (count < frames || started === null || performance.now() - started < durationMs) requestAnimationFrame(next);
  83  |       else {
  84  |         observer.disconnect(); removeEventListener("resize", resize);
  85  |         finish!({ samples, beforeIds, afterIds: ticks().map(id), firstEvent });
  86  |       }
  87  |     };
  88  |     requestAnimationFrame(next);
  89  |   }, { selector, targetWidth, frames, durationMs });
  90  | }
  91  | 
  92  | async function finishFrames(page: Page): Promise<FrameAudit> {
  93  |   return page.evaluate(async () => (window as unknown as { __axisDone: Promise<FrameAudit> }).__axisDone);
  94  | }
  95  | 
  96  | const cases = ["line", "area", "composed", "scatter", "profit-loss", "category"];
  97  | for (const family of cases) for (const reducedMotion of ["no-preference", "reduce"] as const) {
  98  |   test(`${family} ${reducedMotion}: earliest resize frames retain axis identity, hover and data reads`, async ({ page }) => {
  99  |     await mkdir(evidence, { recursive: true });
  100 |     const intercepted: string[] = [], errors: string[] = [], audits: FrameAudit[] = [];
  101 |     page.on("pageerror", error => errors.push(String(error)));
  102 |     await attachBefore(page, intercepted);
  103 |     await page.emulateMedia({ reducedMotion });
  104 |     await page.goto(`/?axis-resize-audit=${runName}#chart-${family}`);
  105 |     const category = family === "category";
  106 |     if (category) await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
  107 |     const selector = category ? '[data-category-example="semester"]' : `[data-rain-id="chart-${family}"]`;
  108 |     const host = page.locator(selector);
  109 |     const plot = host.locator(".rain-chart-plot,.rain-category-plot").first();
  110 |     await expect(plot.locator("svg").first()).toBeVisible();
  111 |     await expect(host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first()).toBeVisible();
  112 |     const controls = page.locator(category ? ".rain-category-controls" : "[data-chart-default-controls]");
  113 |     const beforeVisual = await host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first().evaluate(node => ({ color: getComputedStyle(node).color, fontSize: getComputedStyle(node).fontSize }));
  114 |     try {
  115 |       for (const width of [390, 1440]) {
  116 |         await beginFrames(page, selector, width);
  117 |         await page.setViewportSize({ width, height: 1000 });
  118 |         audits.push(await finishFrames(page));
  119 |       }
  120 |       // The data update remains in progress when the responsive shrink begins.
  121 |       await beginFrames(page, selector, 390);
  122 |       await controls.getByRole("button", { name: "更新数据", exact: true }).evaluate(button => (button as HTMLButtonElement).click());
  123 |       await page.setViewportSize({ width: 390, height: 1000 });
  124 |       audits.push(await finishFrames(page));
  125 |       const svg = plot.locator("svg").first(); await svg.scrollIntoViewIfNeeded();
  126 |       const box = (await svg.boundingBox())!;
  127 |       // Initial reveal deliberately disables input; retry the genuine pointer
  128 |       // after it becomes interactive, without changing any resize-frame sample.
  129 |       await expect(async () => {
  130 |         await page.mouse.move(0, 0);
  131 |         await page.mouse.move(box.x + 80, box.y + box.height / 2);
  132 |         await expect(host.locator(category ? ".rain-category-tooltip" : ".rain-chart-tooltip")).toBeVisible({ timeout: 100 });
  133 |       }).toPass({ timeout: 5000, intervals: [50] });
  134 |       await page.mouse.move(0, 0);
  135 |       await host.screenshot({ path: `${evidence}/${family}-${reducedMotion}-390.png` });
  136 |     } finally {
  137 |       await writeFile(`${evidence}/${family}-${reducedMotion}.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, beforeVisual, audits }, null, 2));
  138 |     }
  139 |     expect(errors).toEqual([]);
  140 |     if (baseline) expect(intercepted.length).toBeGreaterThan(0);
  141 |     for (const audit of audits) {
  142 |       expect(audit.samples.filter(sample => sample.reason === "raf")).toHaveLength(8);
  143 |       expect(audit.afterIds).toEqual(audit.beforeIds);
> 144 |       expect(audit.samples.every(sample => sample.documentWidth <= sample.viewport + 1), JSON.stringify(audit.samples.map(sample => ({ reason: sample.reason, elapsed: sample.elapsed, width: sample.documentWidth })))).toBe(true);
      |                                                                                                                                                                                                                          ^ Error: [{"reason":"resize-event","elapsed":0,"width":999},{"reason":"raf","elapsed":11,"width":999},{"reason":"resize-observer","elapsed":11.900000005960464,"width":999},{"reason":"raf","elapsed":15.100000001490116,"width":999},{"reason":"raf","elapsed":46.400000005960464,"width":390},{"reason":"raf","elapsed":52.80000000447035,"width":390},{"reason":"raf","elapsed":59.900000005960464,"width":390},{"reason":"raf","elapsed":67.70000000298023,"width":390},{"reason":"raf","elapsed":76.10000000149012,"width":390},{"reason":"raf","elapsed":83.60000000149012,"width":390}]
  145 |       expect(audit.samples.flatMap(sample => sample.ticks).every(tick => tick.color === beforeVisual.color && tick.fontSize === beforeVisual.fontSize)).toBe(true);
  146 |     }
  147 |   });
  148 | }
  149 | 
  150 | test("native consumer: same-size data positions animate normally and mounted media changes become immediate", async ({ page }) => {
  151 |   await mkdir(evidence, { recursive: true });
  152 |   const intercepted: string[] = [], errors: string[] = [];
  153 |   const audits: FrameAudit[] = [];
  154 |   page.on("pageerror", error => errors.push(String(error)));
  155 |   await attachBefore(page, intercepted);
  156 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  157 |   await page.goto(`/?axis-native-consumer=${runName}`);
  158 |   const module = `/@fs${resolve(`${run}/x-axis-consumer.tsx`)}`;
  159 |   await page.evaluate(async module => { await import(/* @vite-ignore */ module); }, module);
  160 |   const host = page.locator("[data-test-axis-host]");
  161 |   await expect(host.getByText("Sep 2", { exact: true })).toBeVisible();
  162 |   const position = () => host.getByText("Sep 2", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!).left);
  163 |   try {
  164 |     await beginFrames(page, "[data-test-axis-host]", null, 40, 650);
  165 |     await page.getByRole("button", { name: "Change time domain" }).click();
  166 |     const normal = await finishFrames(page); audits.push(normal);
  167 |     const normalPositions = normal.samples.filter(sample => sample.reason === "raf").map(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position));
  168 |     expect(normalPositions.some(left => left > 170.5 && left < 299.5)).toBe(true);
  169 |     expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
  170 |     await page.emulateMedia({ reducedMotion: "reduce" });
  171 |     await beginFrames(page, "[data-test-axis-host]", null, 8);
  172 |     await page.getByRole("button", { name: "Change time domain" }).click();
  173 |     const reduced = await finishFrames(page); audits.push(reduced);
  174 |     // The caller keeps animationDuration=1100; the mounted XAxis must react itself.
  175 |     expect(reduced.samples.filter(sample => sample.reason === "raf").slice(-4).every(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position) === 300)).toBe(true);
  176 |     expect(reduced.samples.flatMap(sample => sample.ticks).every(tick => !tick.transition.startsWith("left"))).toBe(true);
  177 |     await page.emulateMedia({ reducedMotion: "no-preference" });
  178 |     await beginFrames(page, "[data-test-axis-host]", null, 40, 650);
  179 |     await page.getByRole("button", { name: "Change time domain" }).click();
  180 |     const restored = await finishFrames(page); audits.push(restored);
  181 |     expect(restored.samples.some(sample => sample.ticks.some(tick => tick.label === "Sep 2" && Number.parseFloat(tick.position) > 170.5 && Number.parseFloat(tick.position) < 299.5))).toBe(true);
  182 |     expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
  183 |   } finally {
  184 |     await writeFile(`${evidence}/native-consumer.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, audits }, null, 2));
  185 |   }
  186 |   expect(errors).toEqual([]);
  187 | });
  188 | 
```