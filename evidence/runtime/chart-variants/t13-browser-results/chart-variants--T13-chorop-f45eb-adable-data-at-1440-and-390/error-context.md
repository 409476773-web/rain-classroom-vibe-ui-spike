# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants.spec.ts >> [T13] choropleth: all 5 frozen cards render real geometry and readable data at 1440 and 390
- Location: tests/e2e/chart-variants.spec.ts:50:3

# Error details

```
Error: choropleth-interactive at 390px

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
      - heading "分区地图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 地区值映射顺序色，区分低值与无数据。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "连续强度色阶" [selected]
            - option "蓝灰单色"
        - generic [ref=e18]:
          - text: 示例状态
          - combobox "示例状态" [ref=e19]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=e20] [cursor=pointer]
        - button "重播动效" [ref=e22] [cursor=pointer]
      - generic [ref=e24]:
        - img [ref=e28]:
          - generic [ref=e31]:
            - generic [ref=e32] [cursor=pointer]
            - generic [ref=e33] [cursor=pointer]
            - generic [ref=e34] [cursor=pointer]
            - generic [ref=e35] [cursor=pointer]
        - generic "学习强度色阶，0到100，另有无数据" [ref=e36]:
          - generic [ref=e37]: "0"
          - generic [ref=e43]: "100"
          - generic [ref=e45]: 无数据
        - paragraph [ref=e46]: 自创示意区域，用于验证地区键与强度色阶。
        - group [ref=e47]:
          - generic "查看精确数据" [ref=e48] [cursor=pointer]
      - status [ref=e49]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e50]:
    - heading "数据与使用边界" [level=2] [ref=e51]
    - paragraph [ref=e52]: GeoJSON地区id唯一，值按id关联；本例为自创示意区域。
    - paragraph [ref=e53]: 示意几何不代表实际行政边界；本例不展示地图缩放。
    - paragraph [ref=e54]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e55]:
    - region [ref=e56]:
      - heading "API 与结构" [level=2] [ref=e57]
      - table [ref=e59]:
        - caption [ref=e60]: 分区地图 常用接口
        - rowgroup [ref=e61]:
          - row [ref=e62]:
            - columnheader "名称" [ref=e63]
            - columnheader "类型" [ref=e64]
            - columnheader "默认" [ref=e65]
            - columnheader "说明" [ref=e66]
        - rowgroup [ref=e67]:
          - row [ref=e68]:
            - rowheader [ref=e69]:
              - code [ref=e70]: data / value
            - cell [ref=e71]:
              - code [ref=e72]: 原生图型合同
            - cell "—" [ref=e73]
            - cell "GeoJSON地区id唯一，值按id关联；本例为自创示意区域。" [ref=e74]
          - row [ref=e75]:
            - rowheader [ref=e76]:
              - code [ref=e77]: children
            - cell [ref=e78]:
              - code [ref=e79]: Compound Parts
            - cell "—" [ref=e80]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e81]
          - row [ref=e82]:
            - rowheader [ref=e83]:
              - code [ref=e84]: className / style / margin
            - cell [ref=e85]:
              - code [ref=e86]: 原生尺寸接口
            - cell "—" [ref=e87]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e88]
          - row [ref=e89]:
            - rowheader [ref=e90]:
              - code [ref=e91]: enterTransition / animationDuration
            - cell [ref=e92]:
              - code [ref=e93]: 原生动效配置
            - cell "—" [ref=e94]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e95]
      - paragraph [ref=e96]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e97]:
      - heading "调用示例" [level=2] [ref=e98]
      - generic [ref=e99]:
        - generic [ref=e100]:
          - button "复制代码" [ref=e101] [cursor=pointer]
          - status
        - code [ref=e104]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig, useReducedMotion } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; function App() { const [revision, setRevision] = useState(0); const reduced = useReducedMotion() ?? false; return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-choropleth\" data-recipe=\"intensity\"> <ChartExample id=\"choropleth\" recipe=\"intensity\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e105]:
        - text: 当前源码：
        - code [ref=e106]: packages/ui/src/charts/vendor/charts/choropleth/choropleth-chart.tsx
  - group [ref=e107]:
    - generic "调用配置、完整源码与示例数据" [ref=e108] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e109]:
    - navigation "变体分组" [ref=e110]:
      - button "基础结构" [ref=e111] [cursor=pointer]
      - button "图形材质" [ref=e113] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e115] [cursor=pointer]
      - button "交互与状态" [ref=e117] [cursor=pointer]
    - region [ref=e119]:
      - heading "基础结构" [level=2] [ref=e120]
      - region [ref=e122]:
        - generic [ref=e123]:
          - heading "Choropleth Chart" [level=3] [ref=e124]
          - paragraph [ref=e125]: 单色分区地图与经纬网
        - generic [ref=e126]:
          - generic [ref=e127]:
            - button "更新数据" [ref=e128] [cursor=pointer]
            - button "重播动效" [ref=e130] [cursor=pointer]
          - generic [ref=e132]:
            - paragraph [ref=e133]: 世界地图 · 单色地区与经纬线。 示例参与量为模拟数据；底图为 Natural Earth 1:110m。
            - group [ref=e134]:
              - generic "查看精确数据" [ref=e135] [cursor=pointer]
          - status [ref=e136]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e137]:
            - generic "查看本卡代码" [ref=e138] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e139] [cursor=pointer]:
          - /url: https://bklit.com/charts/choropleth-chart
          - generic [ref=e140]: 对应官网示例
          - generic [ref=e141]: （新标签页打开）
    - region [ref=e142]:
      - heading "图形材质" [level=2] [ref=e143]
      - generic [ref=e144]:
        - region [ref=e145]:
          - generic [ref=e146]:
            - heading "Choropleth Chart - Analytics" [level=3] [ref=e147]
            - paragraph [ref=e148]: 按数值映射地区色阶
          - generic [ref=e149]:
            - generic [ref=e150]:
              - button "更新数据" [ref=e151] [cursor=pointer]
              - button "重播动效" [ref=e153] [cursor=pointer]
            - generic [ref=e155]:
              - paragraph [ref=e156]: 颜色按参与量递增；灰色为缺测，0 保留最低有效等级。 示例参与量为模拟数据；底图为 Natural Earth 1:110m。
              - group [ref=e157]:
                - generic "查看精确数据" [ref=e158] [cursor=pointer]
            - status [ref=e159]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e160]:
              - generic "查看本卡代码" [ref=e161] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e162] [cursor=pointer]:
            - /url: https://bklit.com/charts/choropleth-chart
            - generic [ref=e163]: 对应官网示例
            - generic [ref=e164]: （新标签页打开）
        - region [ref=e165]:
          - generic [ref=e166]:
            - heading "Choropleth Chart - Patterns" [level=3] [ref=e167]
            - paragraph [ref=e168]: 各地区使用带颜色的图案填充
          - generic [ref=e169]:
            - generic [ref=e170]:
              - button "更新数据" [ref=e171] [cursor=pointer]
              - button "重播动效" [ref=e173] [cursor=pointer]
            - generic [ref=e175]:
              - paragraph [ref=e176]: 按分区编码纹理颜色，参与量在提示和明细中读取。 示例参与量为模拟数据；底图为 Natural Earth 1:110m。
              - group [ref=e177]:
                - generic "查看精确数据" [ref=e178] [cursor=pointer]
            - status [ref=e179]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e180]:
              - generic "查看本卡代码" [ref=e181] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e182] [cursor=pointer]:
            - /url: https://bklit.com/charts/choropleth-chart
            - generic [ref=e183]: 对应官网示例
            - generic [ref=e184]: （新标签页打开）
    - region [ref=e185]:
      - heading "坐标与辅助读数" [level=2] [ref=e186]
      - region [ref=e188]:
        - generic [ref=e189]:
          - heading "Choropleth Chart - Graticule" [level=3] [ref=e190]
          - paragraph [ref=e191]: 突出经纬参考线
        - generic [ref=e192]:
          - generic [ref=e193]:
            - button "更新数据" [ref=e194] [cursor=pointer]
            - button "重播动效" [ref=e196] [cursor=pointer]
          - generic [ref=e198]:
            - img [ref=e202]:
              - generic [ref=e207]:
                - generic [ref=e208] [cursor=pointer]
                - generic [ref=e209] [cursor=pointer]
                - generic [ref=e210] [cursor=pointer]
                - generic [ref=e211] [cursor=pointer]
                - generic [ref=e212] [cursor=pointer]
                - generic [ref=e213] [cursor=pointer]
                - generic [ref=e214] [cursor=pointer]
                - generic [ref=e215] [cursor=pointer]
                - generic [ref=e216] [cursor=pointer]
                - generic [ref=e217] [cursor=pointer]
                - generic [ref=e218] [cursor=pointer]
                - generic [ref=e219] [cursor=pointer]
                - generic [ref=e220] [cursor=pointer]
                - generic [ref=e221] [cursor=pointer]
                - generic [ref=e222] [cursor=pointer]
                - generic [ref=e223] [cursor=pointer]
                - generic [ref=e224] [cursor=pointer]
                - generic [ref=e225] [cursor=pointer]
                - generic [ref=e226] [cursor=pointer]
                - generic [ref=e227] [cursor=pointer]
                - generic [ref=e228] [cursor=pointer]
                - generic [ref=e229] [cursor=pointer]
                - generic [ref=e230] [cursor=pointer]
                - generic [ref=e231] [cursor=pointer]
                - generic [ref=e232] [cursor=pointer]
                - generic [ref=e233] [cursor=pointer]
                - generic [ref=e234] [cursor=pointer]
                - generic [ref=e235] [cursor=pointer]
                - generic [ref=e236] [cursor=pointer]
                - generic [ref=e237] [cursor=pointer]
                - generic [ref=e238] [cursor=pointer]
                - generic [ref=e239] [cursor=pointer]
                - generic [ref=e240] [cursor=pointer]
                - generic [ref=e241] [cursor=pointer]
                - generic [ref=e242] [cursor=pointer]
                - generic [ref=e243] [cursor=pointer]
                - generic [ref=e244] [cursor=pointer]
                - generic [ref=e245] [cursor=pointer]
                - generic [ref=e246] [cursor=pointer]
                - generic [ref=e247] [cursor=pointer]
                - generic [ref=e248] [cursor=pointer]
                - generic [ref=e249] [cursor=pointer]
                - generic [ref=e250] [cursor=pointer]
                - generic [ref=e251] [cursor=pointer]
                - generic [ref=e252] [cursor=pointer]
                - generic [ref=e253] [cursor=pointer]
                - generic [ref=e254] [cursor=pointer]
                - generic [ref=e255] [cursor=pointer]
                - generic [ref=e256] [cursor=pointer]
                - generic [ref=e257] [cursor=pointer]
                - generic [ref=e258] [cursor=pointer]
                - generic [ref=e259] [cursor=pointer]
                - generic [ref=e260] [cursor=pointer]
                - generic [ref=e261] [cursor=pointer]
                - generic [ref=e262] [cursor=pointer]
                - generic [ref=e263] [cursor=pointer]
                - generic [ref=e264] [cursor=pointer]
                - generic [ref=e265] [cursor=pointer]
                - generic [ref=e266] [cursor=pointer]
                - generic [ref=e267] [cursor=pointer]
                - generic [ref=e268] [cursor=pointer]
                - generic [ref=e269] [cursor=pointer]
                - generic [ref=e270] [cursor=pointer]
                - generic [ref=e271] [cursor=pointer]
                - generic [ref=e272] [cursor=pointer]
                - generic [ref=e273] [cursor=pointer]
                - generic [ref=e274] [cursor=pointer]
                - generic [ref=e275] [cursor=pointer]
                - generic [ref=e276] [cursor=pointer]
                - generic [ref=e277] [cursor=pointer]
                - generic [ref=e278] [cursor=pointer]
                - generic [ref=e279] [cursor=pointer]
                - generic [ref=e280] [cursor=pointer]
                - generic [ref=e281] [cursor=pointer]
                - generic [ref=e282] [cursor=pointer]
                - generic [ref=e283] [cursor=pointer]
                - generic [ref=e284] [cursor=pointer]
                - generic [ref=e285] [cursor=pointer]
                - generic [ref=e286] [cursor=pointer]
                - generic [ref=e287] [cursor=pointer]
                - generic [ref=e288] [cursor=pointer]
                - generic [ref=e289] [cursor=pointer]
                - generic [ref=e290] [cursor=pointer]
                - generic [ref=e291] [cursor=pointer]
                - generic [ref=e292] [cursor=pointer]
                - generic [ref=e293] [cursor=pointer]
                - generic [ref=e294] [cursor=pointer]
                - generic [ref=e295] [cursor=pointer]
                - generic [ref=e296] [cursor=pointer]
                - generic [ref=e297] [cursor=pointer]
                - generic [ref=e298] [cursor=pointer]
                - generic [ref=e299] [cursor=pointer]
                - generic [ref=e300] [cursor=pointer]
                - generic [ref=e301] [cursor=pointer]
                - generic [ref=e302] [cursor=pointer]
                - generic [ref=e303] [cursor=pointer]
                - generic [ref=e304] [cursor=pointer]
                - generic [ref=e305] [cursor=pointer]
                - generic [ref=e306] [cursor=pointer]
                - generic [ref=e307] [cursor=pointer]
                - generic [ref=e308] [cursor=pointer]
                - generic [ref=e309] [cursor=pointer]
                - generic [ref=e310] [cursor=pointer]
                - generic [ref=e311] [cursor=pointer]
                - generic [ref=e312] [cursor=pointer]
                - generic [ref=e313] [cursor=pointer]
                - generic [ref=e314] [cursor=pointer]
                - generic [ref=e315] [cursor=pointer]
                - generic [ref=e316] [cursor=pointer]
                - generic [ref=e317] [cursor=pointer]
                - generic [ref=e318] [cursor=pointer]
                - generic [ref=e319] [cursor=pointer]
                - generic [ref=e320] [cursor=pointer]
                - generic [ref=e321] [cursor=pointer]
                - generic [ref=e322] [cursor=pointer]
                - generic [ref=e323] [cursor=pointer]
                - generic [ref=e324] [cursor=pointer]
                - generic [ref=e325] [cursor=pointer]
                - generic [ref=e326] [cursor=pointer]
                - generic [ref=e327] [cursor=pointer]
                - generic [ref=e328] [cursor=pointer]
                - generic [ref=e329] [cursor=pointer]
                - generic [ref=e330] [cursor=pointer]
                - generic [ref=e331] [cursor=pointer]
                - generic [ref=e332] [cursor=pointer]
                - generic [ref=e333] [cursor=pointer]
                - generic [ref=e334] [cursor=pointer]
                - generic [ref=e335] [cursor=pointer]
                - generic [ref=e336] [cursor=pointer]
                - generic [ref=e337] [cursor=pointer]
                - generic [ref=e338] [cursor=pointer]
                - generic [ref=e339] [cursor=pointer]
                - generic [ref=e340] [cursor=pointer]
                - generic [ref=e341] [cursor=pointer]
                - generic [ref=e342] [cursor=pointer]
                - generic [ref=e343] [cursor=pointer]
                - generic [ref=e344] [cursor=pointer]
                - generic [ref=e345] [cursor=pointer]
                - generic [ref=e346] [cursor=pointer]
                - generic [ref=e347] [cursor=pointer]
                - generic [ref=e348] [cursor=pointer]
                - generic [ref=e349] [cursor=pointer]
                - generic [ref=e350] [cursor=pointer]
                - generic [ref=e351] [cursor=pointer]
                - generic [ref=e352] [cursor=pointer]
                - generic [ref=e353] [cursor=pointer]
                - generic [ref=e354] [cursor=pointer]
                - generic [ref=e355] [cursor=pointer]
                - generic [ref=e356] [cursor=pointer]
                - generic [ref=e357] [cursor=pointer]
                - generic [ref=e358] [cursor=pointer]
                - generic [ref=e359] [cursor=pointer]
                - generic [ref=e360] [cursor=pointer]
                - generic [ref=e361] [cursor=pointer]
                - generic [ref=e362] [cursor=pointer]
                - generic [ref=e363] [cursor=pointer]
                - generic [ref=e364] [cursor=pointer]
                - generic [ref=e365] [cursor=pointer]
                - generic [ref=e366] [cursor=pointer]
                - generic [ref=e367] [cursor=pointer]
                - generic [ref=e368] [cursor=pointer]
                - generic [ref=e369] [cursor=pointer]
                - generic [ref=e370] [cursor=pointer]
                - generic [ref=e371] [cursor=pointer]
                - generic [ref=e372] [cursor=pointer]
                - generic [ref=e373] [cursor=pointer]
                - generic [ref=e374] [cursor=pointer]
                - generic [ref=e375] [cursor=pointer]
                - generic [ref=e376] [cursor=pointer]
                - generic [ref=e377] [cursor=pointer]
                - generic [ref=e378] [cursor=pointer]
                - generic [ref=e379] [cursor=pointer]
                - generic [ref=e380] [cursor=pointer]
                - generic [ref=e381] [cursor=pointer]
                - generic [ref=e382] [cursor=pointer]
                - generic [ref=e383] [cursor=pointer]
                - generic [ref=e384] [cursor=pointer]
            - paragraph [ref=e385]: 世界地图 · 单色地区与经纬线。 示例参与量为模拟数据；底图为 Natural Earth 1:110m。
            - group [ref=e386]:
              - generic "查看精确数据" [ref=e387] [cursor=pointer]
          - status [ref=e388]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e389]:
            - generic "查看本卡代码" [ref=e390] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e391] [cursor=pointer]:
          - /url: https://bklit.com/charts/choropleth-chart
          - generic [ref=e392]: 对应官网示例
          - generic [ref=e393]: （新标签页打开）
    - region [ref=e394]:
      - heading "交互与状态" [level=2] [ref=e395]
      - region [ref=e397]:
        - generic [ref=e398]:
          - heading "Choropleth Chart - Interactive" [level=3] [ref=e399]
          - paragraph [ref=e400]: 分区地图交互读取访问量
        - generic [ref=e401]:
          - generic [ref=e402]:
            - button "更新数据" [ref=e403] [cursor=pointer]
            - button "重播动效" [ref=e405] [cursor=pointer]
          - generic [ref=e407]:
            - generic [ref=e410]:
              - img [ref=e411]:
                - generic [ref=e416]:
                  - generic [ref=e417] [cursor=pointer]
                  - generic [ref=e418] [cursor=pointer]
                  - generic [ref=e419] [cursor=pointer]
                  - generic [ref=e420] [cursor=pointer]
                  - generic [ref=e421] [cursor=pointer]
                  - generic [ref=e422] [cursor=pointer]
                  - generic [ref=e423] [cursor=pointer]
                  - generic [ref=e424] [cursor=pointer]
                  - generic [ref=e425] [cursor=pointer]
                  - generic [ref=e426] [cursor=pointer]
                  - generic [ref=e427] [cursor=pointer]
                  - generic [ref=e428] [cursor=pointer]
                  - generic [ref=e429] [cursor=pointer]
                  - generic [ref=e430] [cursor=pointer]
                  - generic [ref=e431] [cursor=pointer]
                  - generic [ref=e432] [cursor=pointer]
                  - generic [ref=e433] [cursor=pointer]
                  - generic [ref=e434] [cursor=pointer]
                  - generic [ref=e435] [cursor=pointer]
                  - generic [ref=e436] [cursor=pointer]
                  - generic [ref=e437] [cursor=pointer]
                  - generic [ref=e438] [cursor=pointer]
                  - generic [ref=e439] [cursor=pointer]
                  - generic [ref=e440] [cursor=pointer]
                  - generic [ref=e441] [cursor=pointer]
                  - generic [ref=e442] [cursor=pointer]
                  - generic [ref=e443] [cursor=pointer]
                  - generic [ref=e444] [cursor=pointer]
                  - generic [ref=e445] [cursor=pointer]
                  - generic [ref=e446] [cursor=pointer]
                  - generic [ref=e447] [cursor=pointer]
                  - generic [ref=e448] [cursor=pointer]
                  - generic [ref=e449] [cursor=pointer]
                  - generic [ref=e450] [cursor=pointer]
                  - generic [ref=e451] [cursor=pointer]
                  - generic [ref=e452] [cursor=pointer]
                  - generic [ref=e453] [cursor=pointer]
                  - generic [ref=e454] [cursor=pointer]
                  - generic [ref=e455] [cursor=pointer]
                  - generic [ref=e456] [cursor=pointer]
                  - generic [ref=e457] [cursor=pointer]
                  - generic [ref=e458] [cursor=pointer]
                  - generic [ref=e459] [cursor=pointer]
                  - generic [ref=e460] [cursor=pointer]
                  - generic [ref=e461] [cursor=pointer]
                  - generic [ref=e462] [cursor=pointer]
                  - generic [ref=e463] [cursor=pointer]
                  - generic [ref=e464] [cursor=pointer]
                  - generic [ref=e465] [cursor=pointer]
                  - generic [ref=e466] [cursor=pointer]
                  - generic [ref=e467] [cursor=pointer]
                  - generic [ref=e468] [cursor=pointer]
                  - generic [ref=e469] [cursor=pointer]
                  - generic [ref=e470] [cursor=pointer]
                  - generic [ref=e471] [cursor=pointer]
                  - generic [ref=e472] [cursor=pointer]
                  - generic [ref=e473] [cursor=pointer]
                  - generic [ref=e474] [cursor=pointer]
                  - generic [ref=e475] [cursor=pointer]
                  - generic [ref=e476] [cursor=pointer]
                  - generic [ref=e477] [cursor=pointer]
                  - generic [ref=e478] [cursor=pointer]
                  - generic [ref=e479] [cursor=pointer]
                  - generic [ref=e480] [cursor=pointer]
                  - generic [ref=e481] [cursor=pointer]
                  - generic [ref=e482] [cursor=pointer]
                  - generic [ref=e483] [cursor=pointer]
                  - generic [ref=e484] [cursor=pointer]
                  - generic [ref=e485] [cursor=pointer]
                  - generic [ref=e486] [cursor=pointer]
                  - generic [ref=e487] [cursor=pointer]
                  - generic [ref=e488] [cursor=pointer]
                  - generic [ref=e489] [cursor=pointer]
                  - generic [ref=e490] [cursor=pointer]
                  - generic [ref=e491] [cursor=pointer]
                  - generic [ref=e492] [cursor=pointer]
                  - generic [ref=e493] [cursor=pointer]
                  - generic [ref=e494] [cursor=pointer]
                  - generic [ref=e495] [cursor=pointer]
                  - generic [ref=e496] [cursor=pointer]
                  - generic [ref=e497] [cursor=pointer]
                  - generic [ref=e498] [cursor=pointer]
                  - generic [ref=e499] [cursor=pointer]
                  - generic [ref=e500] [cursor=pointer]
                  - generic [ref=e501] [cursor=pointer]
                  - generic [ref=e502] [cursor=pointer]
                  - generic [ref=e503] [cursor=pointer]
                  - generic [ref=e504] [cursor=pointer]
                  - generic [ref=e505] [cursor=pointer]
                  - generic [ref=e506] [cursor=pointer]
                  - generic [ref=e507] [cursor=pointer]
                  - generic [ref=e508] [cursor=pointer]
                  - generic [ref=e509] [cursor=pointer]
                  - generic [ref=e510] [cursor=pointer]
                  - generic [ref=e511] [cursor=pointer]
                  - generic [ref=e512] [cursor=pointer]
                  - generic [ref=e513] [cursor=pointer]
                  - generic [ref=e514] [cursor=pointer]
                  - generic [ref=e515] [cursor=pointer]
                  - generic [ref=e516] [cursor=pointer]
                  - generic [ref=e517] [cursor=pointer]
                  - generic [ref=e518] [cursor=pointer]
                  - generic [ref=e519] [cursor=pointer]
                  - generic [ref=e520] [cursor=pointer]
                  - generic [ref=e521] [cursor=pointer]
                  - generic [ref=e522] [cursor=pointer]
                  - generic [ref=e523] [cursor=pointer]
                  - generic [ref=e524] [cursor=pointer]
                  - generic [ref=e525] [cursor=pointer]
                  - generic [ref=e526] [cursor=pointer]
                  - generic [ref=e527] [cursor=pointer]
                  - generic [ref=e528] [cursor=pointer]
                  - generic [ref=e529] [cursor=pointer]
                  - generic [ref=e530] [cursor=pointer]
                  - generic [ref=e531] [cursor=pointer]
                  - generic [ref=e532] [cursor=pointer]
                  - generic [ref=e533] [cursor=pointer]
                  - generic [ref=e534] [cursor=pointer]
                  - generic [ref=e535] [cursor=pointer]
                  - generic [ref=e536] [cursor=pointer]
                  - generic [ref=e537] [cursor=pointer]
                  - generic [ref=e538] [cursor=pointer]
                  - generic [ref=e539] [cursor=pointer]
                  - generic [ref=e540] [cursor=pointer]
                  - generic [ref=e541] [cursor=pointer]
                  - generic [ref=e542] [cursor=pointer]
                  - generic [ref=e543] [cursor=pointer]
                  - generic [ref=e544] [cursor=pointer]
                  - generic [ref=e545] [cursor=pointer]
                  - generic [ref=e546] [cursor=pointer]
                  - generic [ref=e547] [cursor=pointer]
                  - generic [ref=e548] [cursor=pointer]
                  - generic [ref=e549] [cursor=pointer]
                  - generic [ref=e550] [cursor=pointer]
                  - generic [ref=e551] [cursor=pointer]
                  - generic [ref=e552] [cursor=pointer]
                  - generic [ref=e553] [cursor=pointer]
                  - generic [ref=e554] [cursor=pointer]
                  - generic [ref=e555] [cursor=pointer]
                  - generic [ref=e556] [cursor=pointer]
                  - generic [ref=e557] [cursor=pointer]
                  - generic [ref=e558] [cursor=pointer]
                  - generic [ref=e559] [cursor=pointer]
                  - generic [ref=e560] [cursor=pointer]
                  - generic [ref=e561] [cursor=pointer]
                  - generic [ref=e562] [cursor=pointer]
                  - generic [ref=e563] [cursor=pointer]
                  - generic [ref=e564] [cursor=pointer]
                  - generic [ref=e565] [cursor=pointer]
                  - generic [ref=e566] [cursor=pointer]
                  - generic [ref=e567] [cursor=pointer]
                  - generic [ref=e568] [cursor=pointer]
                  - generic [ref=e569] [cursor=pointer]
                  - generic [ref=e570] [cursor=pointer]
                  - generic [ref=e571] [cursor=pointer]
                  - generic [ref=e572] [cursor=pointer]
                  - generic [ref=e573] [cursor=pointer]
                  - generic [ref=e574] [cursor=pointer]
                  - generic [ref=e575] [cursor=pointer]
                  - generic [ref=e576] [cursor=pointer]
                  - generic [ref=e577] [cursor=pointer]
                  - generic [ref=e578] [cursor=pointer]
                  - generic [ref=e579] [cursor=pointer]
                  - generic [ref=e580] [cursor=pointer]
                  - generic [ref=e581] [cursor=pointer]
                  - generic [ref=e582] [cursor=pointer]
                  - generic [ref=e583] [cursor=pointer]
                  - generic [ref=e584] [cursor=pointer]
                  - generic [ref=e585] [cursor=pointer]
                  - generic [ref=e586] [cursor=pointer]
                  - generic [ref=e587] [cursor=pointer]
                  - generic [ref=e588] [cursor=pointer]
                  - generic [ref=e589] [cursor=pointer]
                  - generic [ref=e590] [cursor=pointer]
                  - generic [ref=e591] [cursor=pointer]
                  - generic [ref=e592] [cursor=pointer]
                  - generic [ref=e593] [cursor=pointer]
              - generic [ref=e594]:
                - button "放大地图" [ref=e595] [cursor=pointer]:
                  - generic [ref=e596]: 放大
                - button "缩小地图" [ref=e597] [cursor=pointer]:
                  - generic [ref=e598]: 缩小
                - button "重置地图" [ref=e599] [cursor=pointer]:
                  - generic [ref=e600]: 重置
            - paragraph [ref=e601]: 可拖动、滚轮缩放，也可使用放大、缩小、重置按钮。 示例参与量为模拟数据；底图为 Natural Earth 1:110m。
            - group [ref=e602]:
              - generic "查看精确数据" [active] [ref=e603] [cursor=pointer]
          - status [ref=e604]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e605]:
            - generic "查看本卡代码" [ref=e606] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e607] [cursor=pointer]:
          - /url: https://bklit.com/charts/choropleth-chart
          - generic [ref=e608]: 对应官网示例
          - generic [ref=e609]: （新标签页打开）
  - navigation "相关图型" [ref=e610]:
    - link "面积图" [ref=e611] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e613] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e615] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e617] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e619] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e621] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e623] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e625] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e627] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e629] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e631] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e633] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e635] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e637] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e639] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e641] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e643] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | import CHART_VARIANT_REFERENCE from "../../apps/playground/src/docs/components/chart-variants/reference.json" with { type: "json" };
  4   | 
  5   | const evidence = process.env.RAIN_CHART_VARIANTS_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/current";
  6   | 
  7   | test("[T01] variants remain on one page, local updates stay isolated and group navigation preserves the route", async ({ page }) => {
  8   |   await page.emulateMedia({ reducedMotion: "reduce" });
  9   |   await page.goto("/#chart-bar");
  10  |   const first = page.locator('[data-chart-variant="bar-default"]');
  11  |   const second = page.locator('[data-chart-variant="bar-multiple-series"]');
  12  |   await first.scrollIntoViewIfNeeded();
  13  |   await expect(first.locator('[data-ready="true"]')).toBeVisible();
  14  |   await first.getByRole("button", { name: "更新数据", exact: true }).click();
  15  |   await expect(first.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  16  |   await expect(second.getByRole("status").filter({ hasText: "已更新 0 次" })).toHaveCount(1);
  17  |   await page.getByRole("button", { name: "基础结构", exact: true }).click();
  18  |   await expect(page.locator("#chart-bar-variants-structure")).toBeFocused();
  19  |   await expect(page).toHaveURL(/#chart-bar$/);
  20  |   for (const width of [1440, 900, 390]) {
  21  |     await page.setViewportSize({ width, height: 1000 });
  22  |     await first.scrollIntoViewIfNeeded();
  23  |     await first.getByText("查看本卡代码", { exact: true }).click();
  24  |     await expect(first.locator("pre")).toContainText('variantId="bar-default"');
  25  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  26  |     await mkdir(evidence, { recursive: true });
  27  |     await first.screenshot({ path: `${evidence}/bar-default-category-wide-normal-${width}-reduce.png` });
  28  |     await first.getByText("查看本卡代码", { exact: true }).click();
  29  |   }
  30  | });
  31  | 
  32  | test("[T03] each displayed card exposes its actual family source and current parameters", async ({ page }) => {
  33  |   await page.emulateMedia({ reducedMotion: "reduce" });
  34  |   await page.goto("/#chart-bar");
  35  |   const card = page.locator('[data-chart-variant="bar-default"]');
  36  |   await card.scrollIntoViewIfNeeded();
  37  |   await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
  38  |   await card.getByRole("button", { name: "更新数据", exact: true }).click();
  39  |   await card.getByText("查看本卡代码", { exact: true }).click();
  40  |   await expect(card.locator("pre")).toContainText('recipe="monochrome-blue" revision={1}');
  41  |   await card.getByRole("combobox", { name: "本卡源码文件" }).selectOption("chart-variants/bar.tsx");
  42  |   await expect(card.locator("pre")).toContainText("export function BarVariant");
  43  |   const href = await card.getByRole("link", { name: "下载 chart-variants/bar.tsx", exact: true }).getAttribute("href");
  44  |   expect(decodeURIComponent(href!)).toContain('from "@rain-next/ui/charts"');
  45  | });
  46  | 
  47  | const familyIds = [...new Set(CHART_VARIANT_REFERENCE.map(row => row.chartId))];
  48  | for (const family of familyIds) {
  49  |   const variants = CHART_VARIANT_REFERENCE.filter(row => row.chartId === family);
  50  |   test(`[T13] ${family}: all ${variants.length} frozen cards render real geometry and readable data at 1440 and 390`, async ({ page }) => {
  51  |     test.setTimeout(180_000);
  52  |     const errors: string[] = [];
  53  |     page.on("pageerror", error => errors.push(error.message));
  54  |     page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  55  |     await page.emulateMedia({ reducedMotion: "reduce" });
  56  |     await page.setViewportSize({ width: 1440, height: 1000 });
  57  |     await page.goto(`/#chart-${family}`);
  58  |     await expect(page.locator("[data-chart-variant]")).toHaveCount(variants.length);
  59  |     await mkdir(evidence, { recursive: true });
  60  |     const audit: Record<string, unknown>[] = [];
  61  |     for (const width of [1440, 390]) {
  62  |       await page.setViewportSize({ width, height: 1000 });
  63  |       for (const variant of variants) {
  64  |         const card = page.locator(`[data-chart-variant="${variant.id}"]`);
  65  |         await card.scrollIntoViewIfNeeded();
  66  |         await expect(card.locator('[data-ready="true"]')).toBeVisible();
  67  |         await expect(card).toHaveAttribute("data-active", "true");
  68  |         const showData = card.getByRole("button", { name: "显示数据", exact: true });
  69  |         if (await showData.count()) await showData.click();
  70  |         const geometry = async () => card.locator(".rain-chart-variant__plot").evaluate(plot => {
  71  |           const roots = [...plot.querySelectorAll('[data-slot="chart-root"]')];
  72  |           const invalid: string[] = [];
  73  |           const marks = roots.flatMap(root => [...root.querySelectorAll("svg path[d], svg rect, svg circle, svg polygon, svg line")]).filter(node => {
  74  |             if (node.closest("defs, clipPath, mask")) return false;
  75  |             for (const name of ["d", "points", "x", "y", "width", "height", "cx", "cy", "r", "x1", "x2", "y1", "y2"]) {
  76  |               const value = node.getAttribute(name);
  77  |               if (value && /NaN|Infinity|undefined/.test(value)) invalid.push(`${node.tagName}.${name}=${value}`);
  78  |             }
  79  |             const rect = node.getBoundingClientRect();
  80  |             const style = getComputedStyle(node);
  81  |             const painted = style.fill !== "none" && style.fill !== "transparent" && style.fill !== "rgba(0, 0, 0, 0)" || style.stroke !== "none" && style.stroke !== "transparent";
  82  |             return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0 && painted;
  83  |           });
  84  |           return { nativeRoots: roots.length, visibleMarks: marks.length, paths: marks.filter(node => node.tagName.toLowerCase() === "path").length, invalid };
  85  |         });
  86  |         await expect.poll(async () => (await geometry()).visibleMarks, { message: `${variant.id} has painted finite native marks at ${width}px` }).toBeGreaterThan(0);
  87  |         const result = await geometry();
  88  |         expect(result.nativeRoots, variant.id).toBeGreaterThan(0);
  89  |         expect(result.invalid, variant.id).toEqual([]);
  90  |         const summary = card.getByText("查看精确数据", { exact: true });
  91  |         await summary.click();
  92  |         const table = card.getByRole("table");
  93  |         await expect(table, `${variant.id} exact data is readable`).toBeVisible();
  94  |         const rows = await table.locator("tbody tr").count();
  95  |         expect(rows, variant.id).toBeGreaterThan(0);
  96  |         expect(await table.textContent(), variant.id).not.toMatch(/NaN|Infinity|undefined/);
  97  |         await summary.click();
> 98  |         expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${variant.id} at ${width}px`).toBe(true);
      |                                                                                                                                  ^ Error: choropleth-interactive at 390px
  99  |         const duplicateDefs = await page.evaluate(() => {
  100 |           const ids = [...document.querySelectorAll("svg defs [id]")].map(node => node.id);
  101 |           return ids.filter((id, index) => ids.indexOf(id) !== index);
  102 |         });
  103 |         expect(duplicateDefs, `${variant.id} SVG definitions are instance-safe`).toEqual([]);
  104 |         audit.push({ id: variant.id, width, ...result, rows, duplicateDefs });
  105 |         if (variant === variants[0]) {
  106 |           await card.scrollIntoViewIfNeeded();
  107 |           await card.screenshot({ path: `${evidence}/${family}-${width}-all-variants-reduce.png` });
  108 |         }
  109 |       }
  110 |     }
  111 |     await writeFile(`${evidence}/${family}-render-audit.json`, `${JSON.stringify({ family, count: variants.length, errors, audit }, null, 2)}\n`);
  112 |     expect(errors, `${family} browser errors`).toEqual([]);
  113 |   });
  114 | }
  115 | 
```