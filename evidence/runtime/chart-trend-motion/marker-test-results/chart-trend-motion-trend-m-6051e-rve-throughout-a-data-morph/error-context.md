# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-trend-motion.spec.ts >> trend motion: a pinned marker stays on the live native curve throughout a data morph
- Location: tests/e2e/chart-trend-motion.spec.ts:238:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 2
Received:   2
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
            - tooltip "第6周 已固定 本期 117 人次 上期 64 人次 Esc 取消固定":
              - generic:
                - generic:
                  - strong: 第6周
                  - generic: 已固定
                - generic:
                  - generic: 本期
                  - strong: 117 人次
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
          - status [ref=e70]: 第6周：本期 117 人次 · 上期 64 人次
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
            - strong [ref=e99]: "64"
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
          - status [ref=e128]: 第12周 · 参与 308 人 · 完成 282 人 · 完成率 91.6%
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
        - status [ref=e183]: 互动讨论 → 分析推理：28 人次
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
  233 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  234 |   await sample.screenshot({ path: `${EVIDENCE}/narrow-reduced.png` });
  235 |   expect(errors).toEqual([]);
  236 | });
  237 | 
  238 | test("trend motion: a pinned marker stays on the live native curve throughout a data morph", async ({ page }, testInfo) => {
  239 |   const { sample, chart, overlay, tooltip, week, errors } = await openTrend(page);
  240 |   await expect(overlay).toHaveAttribute("data-motion", "spring");
  241 |   await week(5).click();
  242 |   // Reach the panel's upper limit first: an already settled panel must not be
  243 |   // what incidentally keeps repainting a marker during the next native morph.
  244 |   for (let update = 0; update < 4; update++) {
  245 |     const previous = Number(await chart.getAttribute("data-render-count"));
  246 |     await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  247 |     await expectNewRender(chart, previous);
  248 |   }
  249 |   await expectReading(tooltip, 110, 64);
  250 |   await expectPanelSettled(page, tooltip);
  251 |   await expect(sample.locator(".trend-guides > g[clip-path] > path")).toHaveCount(3);
  252 |   const previous = Number(await chart.getAttribute("data-render-count"));
  253 |   const sampling = page.evaluate(async () => {
  254 |     const root = document.querySelector('[aria-labelledby="trend-sample-title"]')!;
  255 |     const versions = new Map<string, number>();
  256 |     const pathVersions: { version: number; paths: { d: string; transform: string }[] }[] = [];
  257 |     const frames: { elapsedMs: number; visible: boolean; markerX: number | null; markerY: number | null; distancePx: number | null; candidates: number; pathVersion: number }[] = [];
  258 |     const started = performance.now();
  259 |     return new Promise<{ frames: typeof frames; pathVersions: typeof pathVersions }>(resolve => {
  260 |       const sampleFrame = (now: number) => {
  261 |         // Query the attached layer anew each frame; never retain exited paths.
  262 |         const marker = root.querySelector<SVGGElement>('[data-testid="trend-marker"][data-series="本期"]')!;
  263 |         const circle = marker.querySelector<SVGCircleElement>("circle")!;
  264 |         const color = circle.getAttribute("stroke");
  265 |         const paths = [...root.querySelectorAll<SVGPathElement>(".trend-guides > g[clip-path] > path")]
  266 |           .filter(path => path.isConnected && path.getAttribute("stroke") === color && path.getAttribute("d") && path.getTotalLength() > 0 && path.getScreenCTM());
  267 |         const pathData = paths.map(path => ({ d: path.getAttribute("d")!, transform: path.getAttribute("transform") ?? "" }));
  268 |         const signature = JSON.stringify(pathData);
  269 |         if (!versions.has(signature)) {
  270 |           versions.set(signature, versions.size);
  271 |           pathVersions.push({ version: versions.get(signature)!, paths: pathData });
  272 |         }
  273 |         const visible = getComputedStyle(marker).visibility === "visible"
  274 |           && Number(getComputedStyle(root.querySelector(".trend-guides")!).opacity) > 0.99;
  275 |         const matrix = circle.getScreenCTM();
  276 |         const center = matrix ? new DOMPoint(circle.cx.baseVal.value, circle.cy.baseVal.value).matrixTransform(matrix) : null;
  277 |         let nearest = Infinity;
  278 |         if (visible && center) {
  279 |           for (const path of paths) {
  280 |             const total = path.getTotalLength();
  281 |             const ctm = path.getScreenCTM()!;
  282 |             const distance = (length: number) => {
  283 |               const local = path.getPointAtLength(length);
  284 |               const point = new DOMPoint(local.x, local.y).matrixTransform(ctm);
  285 |               return Math.hypot(point.x - center.x, point.y - center.y);
  286 |             };
  287 |             // Measure Euclidean distance independently of the implementation's
  288 |             // X-to-Y projection: coarse path sampling, then local refinement.
  289 |             const steps = Math.max(1, Math.ceil(total / 6));
  290 |             let bestLength = 0; let bestDistance = Infinity;
  291 |             for (let step = 0; step <= steps; step++) {
  292 |               const length = total * step / steps;
  293 |               const candidate = distance(length);
  294 |               if (candidate < bestDistance) { bestDistance = candidate; bestLength = length; }
  295 |             }
  296 |             let low = Math.max(0, bestLength - total / steps);
  297 |             let high = Math.min(total, bestLength + total / steps);
  298 |             for (let refinement = 0; refinement < 12; refinement++) {
  299 |               const left = low + (high - low) / 3;
  300 |               const right = high - (high - low) / 3;
  301 |               if (distance(left) < distance(right)) high = right; else low = left;
  302 |             }
  303 |             nearest = Math.min(nearest, distance((low + high) / 2));
  304 |           }
  305 |         }
  306 |         frames.push({
  307 |           elapsedMs: Number((now - started).toFixed(2)), visible,
  308 |           markerX: center?.x ?? null, markerY: center?.y ?? null,
  309 |           distancePx: Number.isFinite(nearest) ? nearest : null,
  310 |           candidates: paths.length, pathVersion: versions.get(signature)!,
  311 |         });
  312 |         if (now - started < 1000) requestAnimationFrame(sampleFrame);
  313 |         else resolve({ frames, pathVersions });
  314 |       };
  315 |       requestAnimationFrame(sampleFrame);
  316 |     });
  317 |   });
  318 |   await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  319 |   const facts = await sampling;
  320 |   await expectNewRender(chart, previous);
  321 |   const visibleFrames = facts.frames.filter(frame => frame.visible);
  322 |   const maximumDistance = Math.max(...visibleFrames.map(frame => frame.distancePx ?? Infinity));
  323 |   const movingPaths = new Set(visibleFrames.filter(frame => frame.candidates > 0).map(frame => frame.pathVersion)).size;
  324 |   const markerYs = visibleFrames.map(frame => frame.markerY!).filter(value => value !== null);
  325 |   const evidencePath = `${EVIDENCE}/marker-native-morph.json`;
  326 |   await writeFile(evidencePath, JSON.stringify({
  327 |     scenario: { pinnedWeek: 6, warmupUpdates: 4, before: 110, after: 117, tolerancePx: 1.5 },
  328 |     summary: { sampledFrames: facts.frames.length, visibleFrames: visibleFrames.length, pathVersions: movingPaths, maximumDistancePx: Number.isFinite(maximumDistance) ? maximumDistance : null },
  329 |     ...facts,
  330 |   }, null, 2) + "\n");
  331 |   await testInfo.attach("marker-native-morph", { path: evidencePath, contentType: "application/json" });
  332 |   expect(visibleFrames.length).toBeGreaterThanOrEqual(10);
> 333 |   expect(movingPaths).toBeGreaterThan(2);
      |                       ^ Error: expect(received).toBeGreaterThan(expected)
  334 |   expect(Math.max(...markerYs) - Math.min(...markerYs)).toBeGreaterThan(1);
  335 |   expect(maximumDistance).toBeLessThanOrEqual(1.5);
  336 |   await expect(overlay).toHaveAttribute("data-pinned", "true");
  337 |   await expect(overlay).toHaveAttribute("data-active-week", "5");
  338 |   await expectReading(tooltip, 117, 64);
  339 |   expect(errors).toEqual([]);
  340 | });
  341 | 
```