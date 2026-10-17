# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-trend-motion.spec.ts >> trend motion: legend visibility updates pinned readings and keeps one series visible
- Location: tests/e2e/chart-trend-motion.spec.ts:148:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[aria-labelledby="trend-sample-title"]').locator('.trend-guides > g[clip-path] > path')
Expected: 3
Received: 6
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[aria-labelledby="trend-sample-title"]').locator('.trend-guides > g[clip-path] > path')
    14 × locator resolved to 6 elements
       - unexpected value "6"

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - paragraph [ref=e8]: RAIN / CHART STUDIES
        - heading "Rain 图表实验室" [level=1] [ref=e9]
        - paragraph [ref=e10]: 轻盈的图形，清楚的数据。探索细线、渐变、圆角与组合之间的共同语言。
      - generic [ref=e11]: 运行验证 · 第 01 版
    - region "图表样式与数据设置" [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]: 材质
        - button "渐变" [pressed] [ref=e16] [cursor=pointer]
        - button "实色" [ref=e18] [cursor=pointer]
      - generic [ref=e20]:
        - generic [ref=e21]: 配色
        - button "蓝紫近邻" [pressed] [ref=e22] [cursor=pointer]
        - button "多类别色" [ref=e24] [cursor=pointer]
      - button "更新样本数据" [active] [ref=e26] [cursor=pointer]
    - generic [ref=e28]:
      - heading "趋势与比较" [level=2] [ref=e29]
      - paragraph [ref=e30]: 同一组视觉规则，在不同尺度与图形中展开
    - generic [ref=e31]:
      - region [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]:
            - paragraph [ref=e35]: 01 · 趋势与面积
            - heading "每周学习参与" [level=2] [ref=e36]
          - generic [ref=e37]: P03 · 清晰线与轻面积
        - group "趋势插值方式" [ref=e38]:
          - generic [ref=e39]: 曲线
          - button "平滑" [pressed] [ref=e40] [cursor=pointer]
          - button "折线" [ref=e42] [cursor=pointer]
        - generic "趋势系列" [ref=e44]:
          - button "本期" [pressed] [ref=e45] [cursor=pointer]
          - button "上期" [pressed] [ref=e47] [cursor=pointer]
          - generic [ref=e49]: 悬停读取 · 点击固定
        - generic [ref=e50]:
          - img "十二周本期与上期学习参与趋势。本期第四周为零，第八周缺测。精确数值可在图后读取。" [ref=e51]
          - group "趋势图交互区" [ref=e54]:
            - generic: 第6周
            - tooltip "第6周 已固定 本期 89 人次 上期 64 人次 Esc 取消固定":
              - generic:
                - generic:
                  - strong: 第6周
                  - generic: 已固定
                - generic:
                  - generic: 本期
                  - strong: 89 人次
                - generic:
                  - generic: 上期
                  - strong: 64 人次
                - paragraph: Esc 取消固定
        - generic [ref=e67]:
          - generic [ref=e68]:
            - text: 趋势读数
            - combobox "趋势读数" [ref=e69]:
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
          - status [ref=e70]: 第6周：本期 89 人次 · 上期 64 人次
        - paragraph [ref=e71]: 方向键切换周次，Enter / 空格固定，Esc 取消。第4周为真实零值；第8周缺测，保留断线。
        - button "查看精确数据" [ref=e73] [cursor=pointer]
      - region [ref=e75]:
        - generic [ref=e76]:
          - generic [ref=e77]:
            - paragraph [ref=e78]: 02 · 分组比较
            - heading "六个班级的练习变化" [level=2] [ref=e79]
          - generic [ref=e80]: P02 · 圆头渐隐柱
        - img "四个单元、六个班级的练习变化。包含短柱、零值和负值，可展开精确数据。" [ref=e81]
        - paragraph [ref=e84]: 第2单元含 2 人次短柱；第3单元含 0 与 −18。负值从零线向下，圆角朝数值端。
        - button "查看精确数据" [ref=e86] [cursor=pointer]
      - region [ref=e88]:
        - generic [ref=e89]:
          - generic [ref=e90]:
            - paragraph [ref=e91]: 03 · 紧凑读数
            - heading "迷你趋势" [level=2] [ref=e92]
          - generic [ref=e93]: P03 · 96 × 40
        - generic [ref=e94]:
          - img "十二期学习参与的迷你趋势，精确值见明细。" [ref=e95]
          - paragraph [ref=e98]:
            - strong [ref=e99]: "56"
            - text: 人次 · 最近一期
        - button "查看精确数据" [ref=e101] [cursor=pointer]
      - region [ref=e103]:
        - generic [ref=e104]:
          - generic [ref=e105]:
            - paragraph [ref=e106]: 04 · 组合与量纲
            - heading "参与和完成，放在同一段时间里看" [level=2] [ref=e107]
            - paragraph [ref=e108]: 面积与柱共用人数轴，完成率独立使用右轴。
          - generic [ref=e109]: P01 / P03 · 柱、面积与双轴
        - generic [ref=e110]:
          - group "组合图系列" [ref=e111]:
            - button "参与人数" [pressed] [ref=e112] [cursor=pointer]
            - button "完成人数" [pressed] [ref=e114] [cursor=pointer]
            - button "完成率" [pressed] [ref=e116] [cursor=pointer]
          - group "组合图时间范围" [ref=e118]:
            - button "全部 12 周" [pressed] [ref=e119] [cursor=pointer]
            - button "后 6 周" [ref=e120] [cursor=pointer]
        - img "参与人数面积、完成人数柱和完成率折线组合图；左轴人数，右轴0至100%；下方滑块调整周范围" [ref=e122]
        - generic [ref=e125]:
          - generic [ref=e126]:
            - text: 组合读数
            - combobox "组合读数" [ref=e127]:
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
          - status [ref=e128]: 第12周 · 参与 300 人 · 完成 269 人 · 完成率 89.7%
          - generic [ref=e129]: 当前 第01周—第12周，共 12 周
        - button "查看精确数据" [ref=e131] [cursor=pointer]
    - generic [ref=e133]:
      - heading "密度与关系" [level=2] [ref=e134]
      - paragraph [ref=e135]: 让强度、流向与连接各自拥有清楚的表达
    - generic [ref=e136]:
      - region [ref=e137]:
        - generic [ref=e138]:
          - generic [ref=e139]:
            - paragraph [ref=e140]: 05 · 强度与分布
            - heading "课程与学习目标" [level=2] [ref=e141]
          - generic [ref=e142]: P05 · 连续色阶
        - generic [ref=e143]:
          - generic [ref=e144]:
            - button "热力矩阵" [pressed] [ref=e145] [cursor=pointer]
            - button "气泡矩阵" [ref=e147] [cursor=pointer]
          - generic [ref=e149]:
            - button "6 × 6" [pressed] [ref=e150] [cursor=pointer]
            - button "12 × 12" [ref=e152] [cursor=pointer]
          - generic [ref=e154]: 低 高 · 0–6
        - generic "矩阵横向滚动区域" [ref=e162]:
          - img "6 行、6 列的热力矩阵。数值从 0 到 6，灰色破折号表示缺测。" [ref=e165]
        - paragraph [ref=e167]: 每格保留精确数值。灰色「—」为缺测。连续色阶保持固定，窄屏可横向滚动。
        - button "查看精确数据" [ref=e169] [cursor=pointer]
      - region [ref=e171]:
        - generic [ref=e172]:
          - generic [ref=e173]:
            - paragraph [ref=e174]: 06 · 流向与追踪
            - heading "学习活动的去向" [level=2] [ref=e175]
          - generic [ref=e176]: P07 · 轻流带
        - generic [ref=e178]:
          - text: 追踪路径
          - combobox "追踪路径" [ref=e179]:
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
        - img "学习活动流向学习目标的桑基图，流带宽度表示学习人次，可从上方选择追踪路径。" [ref=e181]
        - status [ref=e183]: 互动讨论 → 分析推理：20 人次
        - paragraph [ref=e184]: 流带宽度对应真实权重。节点高度随数据变化，尚未复现参考图中的等高列表布局。
        - button "查看精确数据" [ref=e186] [cursor=pointer]
      - region [ref=e188]:
        - generic [ref=e189]:
          - generic [ref=e190]:
            - paragraph [ref=e191]: 07 · 知识与连接
            - heading "知识关系网络" [level=2] [ref=e192]
          - generic [ref=e193]: P08 · 径向节点
        - generic [ref=e195]:
          - text: 聚焦节点
          - combobox "聚焦节点" [ref=e196]:
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
        - img "九个知识节点的关系网络。紫色箭头为先修，橙色虚线箭头为应用，蓝色虚线为相似关系。" [ref=e198]
        - generic [ref=e200]:
          - generic [ref=e201]: 先修关系 →
          - generic [ref=e203]: 相似概念
          - generic [ref=e205]: 应用关系 →
        - paragraph [ref=e207]: 节点采用径向渐变，无模糊阴影。当前使用固定示例位置；有向关系暂用直线箭头，曲线箭头仍需专门适配。
        - button "查看精确数据" [ref=e209] [cursor=pointer]
    - generic [ref=e211]:
      - paragraph [ref=e212]: 示例数据 · 本地实验
      - paragraph [ref=e213]: Plots / G2 绘图，Bklit 表现参考，Rain 配色与字体。当前页面用于方案验证。
```

# Test source

```ts
  60  |   await expect(chart).toHaveAttribute("data-chart-ready", "true");
  61  | }
  62  | 
  63  | test("trend motion: hover keeps guide, markers, date and exact readings on the same week", async ({ page }) => {
  64  |   const { sample, overlay, tooltip, readout, date, week, errors } = await openTrend(page);
  65  |   await expect(overlay).toHaveAttribute("data-motion", "spring");
  66  |   await expect(tooltip).toBeHidden();
  67  |   // Several real pointer moves are retained in the video for motion review.
  68  |   for (const index of [2, 5, 10, 5]) {
  69  |     await week(index).hover();
  70  |     await expect(overlay).toHaveAttribute("data-active-week", String(index));
  71  |     await expectPanelSettled(page, tooltip);
  72  |   }
  73  |   await expectReading(tooltip, 82, 64);
  74  |   await expectReading(readout, 82, 64);
  75  |   await expect(date).toContainText("第6周");
  76  |   const expectedX = await centerX(week(5));
  77  |   for (const target of [
  78  |     sample.getByTestId("trend-crosshair"),
  79  |     sample.locator('[data-testid="trend-marker"][data-series="本期"]'),
  80  |     sample.locator('[data-testid="trend-marker"][data-series="上期"]'),
  81  |     date,
  82  |   ]) {
  83  |     await expect(target).toBeVisible();
  84  |     expect(Math.abs(await centerX(target) - expectedX)).toBeLessThanOrEqual(2.5);
  85  |   }
  86  |   await sample.screenshot({ path: `${EVIDENCE}/hover.png` });
  87  |   await page.getByRole("heading", { name: "Rain 图表实验室", exact: true }).hover();
  88  |   await expect(tooltip).toBeHidden();
  89  |   expect(errors).toEqual([]);
  90  | });
  91  | 
  92  | test("trend motion: a pinned week survives pointer moves and data updates until released", async ({ page }) => {
  93  |   const { sample, chart, overlay, tooltip, readout, week, errors } = await openTrend(page);
  94  |   await week(5).click();
  95  |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  96  |   await week(9).hover();
  97  |   await expect(overlay).toHaveAttribute("data-active-week", "5");
  98  |   await expectReading(tooltip, 82, 64);
  99  |   const before = Number(await chart.getAttribute("data-render-count"));
  100 |   await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  101 |   await expectNewRender(chart, before);
  102 |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  103 |   await expect(overlay).toHaveAttribute("data-active-week", "5");
  104 |   await expectReading(tooltip, 89, 64);
  105 |   await expectReading(readout, 89, 64);
  106 |   await expectPanelSettled(page, tooltip);
  107 |   await sample.screenshot({ path: `${EVIDENCE}/pinned-updated.png` });
  108 |   await week(9).click();
  109 |   await expect(overlay).toHaveAttribute("data-active-week", "9");
  110 |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  111 |   await overlay.focus();
  112 |   await overlay.press("Escape");
  113 |   await expect(overlay).toHaveAttribute("data-pinned", "false");
  114 |   await week(5).click();
  115 |   const canvas = await sample.locator("canvas").boundingBox();
  116 |   expect(canvas).not.toBeNull();
  117 |   // The top-left Canvas margin is outside the plot's week hit targets.
  118 |   await page.mouse.click(canvas!.x + 4, canvas!.y + 4);
  119 |   await expect(overlay).toHaveAttribute("data-pinned", "false");
  120 |   expect(errors).toEqual([]);
  121 | });
  122 | 
  123 | test("trend motion: keyboard reading and pinning are equivalent to pointer selection", async ({ page }) => {
  124 |   const { overlay, tooltip, readout, errors } = await openTrend(page);
  125 |   await overlay.focus();
  126 |   await overlay.press("Home");
  127 |   await expect(overlay).toHaveAttribute("data-active-week", "0");
  128 |   await expectReading(tooltip, 42, 35);
  129 |   await overlay.press("ArrowRight");
  130 |   await expect(overlay).toHaveAttribute("data-active-week", "1");
  131 |   await expectReading(readout, 56, 46);
  132 |   await overlay.press("End");
  133 |   await expect(overlay).toHaveAttribute("data-active-week", "11");
  134 |   await expectReading(tooltip, 106, 88);
  135 |   await overlay.press("ArrowLeft");
  136 |   await expect(overlay).toHaveAttribute("data-active-week", "10");
  137 |   await overlay.press("Enter");
  138 |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  139 |   await overlay.press("Escape");
  140 |   await expect(overlay).toHaveAttribute("data-pinned", "false");
  141 |   await overlay.press("Home");
  142 |   await overlay.press("Space");
  143 |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  144 |   await expect(overlay).toHaveAttribute("data-active-week", "0");
  145 |   expect(errors).toEqual([]);
  146 | });
  147 | 
  148 | test("trend motion: legend visibility updates pinned readings and keeps one series visible", async ({ page }) => {
  149 |   const { sample, chart, overlay, tooltip, readout, week, errors } = await openTrend(page);
  150 |   await week(5).click();
  151 |   const beforeUpdate = Number(await chart.getAttribute("data-render-count"));
  152 |   await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  153 |   await expectNewRender(chart, beforeUpdate);
  154 |   await expectReading(tooltip, 89, 64);
  155 |   const current = sample.getByRole("button", { name: "本期", exact: true });
  156 |   const previous = sample.getByRole("button", { name: "上期", exact: true });
  157 |   const lines = sample.locator(".trend-guides > g[clip-path] > path");
  158 |   const areas = sample.locator(".trend-materials > g[mask] path");
  159 |   const currentColor = await sample.locator('[data-testid="trend-marker"][data-series="本期"] circle').first().getAttribute("stroke");
> 160 |   await expect(lines).toHaveCount(3);
      |                       ^ Error: expect(locator).toHaveCount(expected) failed
  161 |   await expect(areas).toHaveCount(3);
  162 |   await expect(current).toHaveAttribute("aria-pressed", "true");
  163 |   await expect(previous).toHaveAttribute("aria-pressed", "true");
  164 |   const before = Number(await chart.getAttribute("data-render-count"));
  165 |   await previous.click();
  166 |   await expectNewRender(chart, before);
  167 |   await expect(previous).toHaveAttribute("aria-pressed", "false");
  168 |   // Current has two continuous segments separated by a real missing week.
  169 |   // Removed native nodes must not leave copied highlights or material behind.
  170 |   await expect(lines).toHaveCount(2);
  171 |   await expect(areas).toHaveCount(2);
  172 |   expect(await lines.evaluateAll(paths => paths.map(path => path.getAttribute("stroke")))).toEqual([currentColor, currentColor]);
  173 |   expect(await areas.evaluateAll(paths => paths.map(path => {
  174 |     const fill = path.getAttribute("fill") ?? "";
  175 |     const gradientId = /^url\(#(.+)\)$/.exec(fill)?.[1];
  176 |     return gradientId ? document.getElementById(gradientId)?.querySelector("stop")?.getAttribute("stop-color") : fill;
  177 |   }))).toEqual([currentColor, currentColor]);
  178 |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  179 |   await expect(overlay).toHaveAttribute("data-active-week", "5");
  180 |   await expect(tooltip).toContainText(/本期[\s：:]*89/);
  181 |   await expect(tooltip).not.toContainText("上期");
  182 |   await expect(readout).not.toContainText("上期");
  183 |   await expect(sample.locator('[data-testid="trend-marker"][data-series="上期"]')).toBeHidden();
  184 |   if (await current.isEnabled()) await current.click();
  185 |   await expect(current).toHaveAttribute("aria-pressed", "true");
  186 |   await expect(tooltip).toContainText(/本期[\s：:]*89/);
  187 |   const beforeRestore = Number(await chart.getAttribute("data-render-count"));
  188 |   await previous.click();
  189 |   await expectNewRender(chart, beforeRestore);
  190 |   await expect(previous).toHaveAttribute("aria-pressed", "true");
  191 |   await expect(lines).toHaveCount(3);
  192 |   await expect(areas).toHaveCount(3);
  193 |   await expectReading(tooltip, 89, 64);
  194 |   await expectReading(readout, 89, 64);
  195 |   await expect(overlay).toHaveAttribute("data-active-week", "5");
  196 |   expect(errors).toEqual([]);
  197 | });
  198 | 
  199 | test("trend motion: reduced motion keeps zero, missing values and edge panels usable at 390px", async ({ page }) => {
  200 |   await page.setViewportSize({ width: 390, height: 844 });
  201 |   await page.emulateMedia({ reducedMotion: "reduce" });
  202 |   const { sample, overlay, tooltip, readout, week, errors } = await openTrend(page);
  203 |   await expect(overlay).toHaveAttribute("data-motion", "reduced");
  204 |   await week(3).hover();
  205 |   await expect(overlay).toHaveAttribute("data-active-week", "3");
  206 |   await expectReading(tooltip, 0, 47);
  207 |   await expectReading(readout, 0, 47);
  208 |   await expect(sample.locator('[data-testid="trend-marker"][data-series="本期"]')).toBeVisible();
  209 |   await week(7).hover();
  210 |   await expect(overlay).toHaveAttribute("data-active-week", "7");
  211 |   await expectReading(tooltip, "缺测", 70);
  212 |   await expectReading(readout, "缺测", 70);
  213 |   await expect(sample.locator('[data-testid="trend-marker"][data-series="本期"]')).toBeHidden();
  214 |   await expect(sample.locator('[data-testid="trend-marker"][data-series="上期"]')).toBeVisible();
  215 |   for (const index of [0, 11]) {
  216 |     await week(index).hover();
  217 |     await expect(overlay).toHaveAttribute("data-active-week", String(index));
  218 |     const first = await tooltip.boundingBox();
  219 |     await twoFrames(page);
  220 |     const next = await tooltip.boundingBox();
  221 |     const card = await sample.boundingBox();
  222 |     expect(first).not.toBeNull();
  223 |     expect(next).not.toBeNull();
  224 |     expect(card).not.toBeNull();
  225 |     expect(Math.abs(next!.x - first!.x) + Math.abs(next!.y - first!.y)).toBeLessThanOrEqual(0.5);
  226 |     expect(next!.x).toBeGreaterThanOrEqual(card!.x - 1);
  227 |     expect(next!.x + next!.width).toBeLessThanOrEqual(card!.x + card!.width + 1);
  228 |     expect(await tooltip.evaluate(node => node.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length)).toBe(0);
  229 |   }
  230 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  231 |   await sample.screenshot({ path: `${EVIDENCE}/narrow-reduced.png` });
  232 |   expect(errors).toEqual([]);
  233 | });
  234 | 
```