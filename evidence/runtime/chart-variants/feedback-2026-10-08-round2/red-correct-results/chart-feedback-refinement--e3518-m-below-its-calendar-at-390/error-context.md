# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> prototype 390px >> prototype every heatmap legend has room below its calendar at 390
- Location: tests/e2e/chart-feedback-refinement.spec.ts:64:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 16
Received:    7.98797607421875
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
      - heading "日历热图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 每一天的学习强度、顺序色阶与单元格聚焦。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "连续强度色阶" [selected]
            - option "蓝灰单色"
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
        - button "对照实例" [ref=e38] [cursor=pointer]
      - generic [ref=e39]:
        - generic [ref=e42]:
          - img [ref=e43]:
            - generic [ref=e45]:
              - generic [ref=e47] [cursor=pointer]
              - generic [ref=e49] [cursor=pointer]
              - generic [ref=e51] [cursor=pointer]
              - generic [ref=e53] [cursor=pointer]
              - generic [ref=e55] [cursor=pointer]
              - generic [ref=e57] [cursor=pointer]
              - generic [ref=e59] [cursor=pointer]
              - generic [ref=e61] [cursor=pointer]
              - generic [ref=e63] [cursor=pointer]
              - generic [ref=e65] [cursor=pointer]
              - generic [ref=e67] [cursor=pointer]
              - generic [ref=e69] [cursor=pointer]
              - generic [ref=e71] [cursor=pointer]
              - generic [ref=e73] [cursor=pointer]
              - generic [ref=e75] [cursor=pointer]
              - generic [ref=e77] [cursor=pointer]
              - generic [ref=e79] [cursor=pointer]
              - generic [ref=e81] [cursor=pointer]
              - generic [ref=e83] [cursor=pointer]
              - generic [ref=e85] [cursor=pointer]
              - generic [ref=e87] [cursor=pointer]
              - generic [ref=e89] [cursor=pointer]
              - generic [ref=e91] [cursor=pointer]
              - generic [ref=e93] [cursor=pointer]
              - generic [ref=e95] [cursor=pointer]
              - generic [ref=e97] [cursor=pointer]
              - generic [ref=e99] [cursor=pointer]
              - generic [ref=e101] [cursor=pointer]
              - generic [ref=e103] [cursor=pointer]
              - generic [ref=e105] [cursor=pointer]
              - generic [ref=e107] [cursor=pointer]
              - generic [ref=e109] [cursor=pointer]
              - generic [ref=e111] [cursor=pointer]
              - generic [ref=e113] [cursor=pointer]
              - generic [ref=e115] [cursor=pointer]
              - generic [ref=e117] [cursor=pointer]
              - generic [ref=e119] [cursor=pointer]
              - generic [ref=e121] [cursor=pointer]
              - generic [ref=e123] [cursor=pointer]
              - generic [ref=e125] [cursor=pointer]
              - generic [ref=e127] [cursor=pointer]
              - generic [ref=e129] [cursor=pointer]
              - generic [ref=e131] [cursor=pointer]
              - generic [ref=e133] [cursor=pointer]
              - generic [ref=e135] [cursor=pointer]
              - generic [ref=e137] [cursor=pointer]
              - generic [ref=e139] [cursor=pointer]
              - generic [ref=e141] [cursor=pointer]
              - generic [ref=e143] [cursor=pointer]
              - generic [ref=e145] [cursor=pointer]
              - generic [ref=e147] [cursor=pointer]
              - generic [ref=e149] [cursor=pointer]
              - generic [ref=e151] [cursor=pointer]
              - generic [ref=e153] [cursor=pointer]
              - generic [ref=e155] [cursor=pointer]
              - generic [ref=e157] [cursor=pointer]
              - generic [ref=e159] [cursor=pointer]
              - generic [ref=e161] [cursor=pointer]
              - generic [ref=e163] [cursor=pointer]
              - generic [ref=e165] [cursor=pointer]
              - generic [ref=e167] [cursor=pointer]
              - generic [ref=e169] [cursor=pointer]
              - generic [ref=e171] [cursor=pointer]
              - generic [ref=e173] [cursor=pointer]
              - generic [ref=e175] [cursor=pointer]
              - generic [ref=e177] [cursor=pointer]
              - generic [ref=e179] [cursor=pointer]
              - generic [ref=e181] [cursor=pointer]
              - generic [ref=e183] [cursor=pointer]
              - generic [ref=e185] [cursor=pointer]
              - generic [ref=e187] [cursor=pointer]
              - generic [ref=e189] [cursor=pointer]
              - generic [ref=e191] [cursor=pointer]
              - generic [ref=e193] [cursor=pointer]
              - generic [ref=e195] [cursor=pointer]
              - generic [ref=e197] [cursor=pointer]
              - generic [ref=e199] [cursor=pointer]
              - generic [ref=e201] [cursor=pointer]
              - generic [ref=e203] [cursor=pointer]
              - generic [ref=e205] [cursor=pointer]
              - generic [ref=e207] [cursor=pointer]
              - generic [ref=e209] [cursor=pointer]
              - generic [ref=e211] [cursor=pointer]
              - generic [ref=e213] [cursor=pointer]
              - generic [ref=e215] [cursor=pointer]
              - generic [ref=e217] [cursor=pointer]
              - generic [ref=e219] [cursor=pointer]
              - generic [ref=e221] [cursor=pointer]
              - generic [ref=e223] [cursor=pointer]
              - generic [ref=e225] [cursor=pointer]
              - generic [ref=e227] [cursor=pointer]
              - generic [ref=e229] [cursor=pointer]
              - generic [ref=e231] [cursor=pointer]
              - generic [ref=e233] [cursor=pointer]
              - generic [ref=e235] [cursor=pointer]
              - generic [ref=e237] [cursor=pointer]
              - generic [ref=e239] [cursor=pointer]
              - generic [ref=e241] [cursor=pointer]
              - generic [ref=e243] [cursor=pointer]
              - generic [ref=e245] [cursor=pointer]
              - generic [ref=e247] [cursor=pointer]
              - generic [ref=e249] [cursor=pointer]
              - generic [ref=e251] [cursor=pointer]
              - generic [ref=e253] [cursor=pointer]
              - generic [ref=e255] [cursor=pointer]
              - generic [ref=e257] [cursor=pointer]
              - generic [ref=e259] [cursor=pointer]
              - generic [ref=e261] [cursor=pointer]
              - generic [ref=e263] [cursor=pointer]
              - generic [ref=e265] [cursor=pointer]
              - generic [ref=e267] [cursor=pointer]
              - generic [ref=e269] [cursor=pointer]
              - generic [ref=e271] [cursor=pointer]
              - generic [ref=e273] [cursor=pointer]
              - generic [ref=e275] [cursor=pointer]
              - generic [ref=e277] [cursor=pointer]
              - generic [ref=e279] [cursor=pointer]
              - generic [ref=e281] [cursor=pointer]
              - generic [ref=e283] [cursor=pointer]
              - generic [ref=e285] [cursor=pointer]
              - generic [ref=e287] [cursor=pointer]
              - generic [ref=e289] [cursor=pointer]
              - generic [ref=e291] [cursor=pointer]
              - generic [ref=e293] [cursor=pointer]
              - generic [ref=e295] [cursor=pointer]
              - generic [ref=e297] [cursor=pointer]
          - generic: Jun
          - generic: Jul
          - generic: Aug
          - generic: Sep
          - generic: Oct
          - generic: M
          - generic: W
          - generic: F
        - group [ref=e298]:
          - generic "查看精确数据" [ref=e299] [cursor=pointer]
      - status [ref=e300]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e301]:
        - strong [ref=e302]: 数据要求：
        - text: 每列一个周日开始的星期，7个日期；0为有效读数，-1为缺测。
      - paragraph [ref=e303]:
        - strong [ref=e304]: 使用边界：
        - text: 原生是日历，不是任意分类矩阵。
      - group [ref=e305]:
        - generic "调用配置、完整源码与示例数据" [ref=e306] [cursor=pointer]
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
      - region "全部图表变体" [ref=e307]:
        - navigation "变体分组" [ref=e308]:
          - button "基础结构" [ref=e309] [cursor=pointer]
          - button "图形材质" [ref=e310] [cursor=pointer]
          - button "坐标与辅助读数" [ref=e311] [cursor=pointer]
          - button "交互与状态" [ref=e312] [cursor=pointer]
        - region [ref=e313]:
          - heading "基础结构" [level=2] [ref=e314]
          - generic [ref=e315]:
            - region [ref=e316]:
              - generic [ref=e317]:
                - heading "Heatmap Chart" [level=3] [ref=e318]
                - paragraph [ref=e319]: 半年贡献日历格、坐标与提示
              - generic [ref=e320]:
                - generic [ref=e321]:
                  - button "更新数据" [ref=e322] [cursor=pointer]
                  - button "重播动效" [ref=e324] [cursor=pointer]
                - generic [ref=e326]:
                  - generic [ref=e328]:
                    - generic [ref=e333]:
                      - img [ref=e334]:
                        - generic [ref=e336]:
                          - generic [ref=e338] [cursor=pointer]
                          - generic [ref=e340] [cursor=pointer]
                          - generic [ref=e342] [cursor=pointer]
                          - generic [ref=e344] [cursor=pointer]
                          - generic [ref=e346] [cursor=pointer]
                          - generic [ref=e348] [cursor=pointer]
                          - generic [ref=e350] [cursor=pointer]
                          - generic [ref=e352] [cursor=pointer]
                          - generic [ref=e354] [cursor=pointer]
                          - generic [ref=e356] [cursor=pointer]
                          - generic [ref=e358] [cursor=pointer]
                          - generic [ref=e360] [cursor=pointer]
                          - generic [ref=e362] [cursor=pointer]
                          - generic [ref=e364] [cursor=pointer]
                          - generic [ref=e366] [cursor=pointer]
                          - generic [ref=e368] [cursor=pointer]
                          - generic [ref=e370] [cursor=pointer]
                          - generic [ref=e372] [cursor=pointer]
                          - generic [ref=e374] [cursor=pointer]
                          - generic [ref=e376] [cursor=pointer]
                          - generic [ref=e378] [cursor=pointer]
                          - generic [ref=e380] [cursor=pointer]
                          - generic [ref=e382] [cursor=pointer]
                          - generic [ref=e384] [cursor=pointer]
                          - generic [ref=e386] [cursor=pointer]
                          - generic [ref=e388] [cursor=pointer]
                          - generic [ref=e390] [cursor=pointer]
                          - generic [ref=e392] [cursor=pointer]
                          - generic [ref=e394] [cursor=pointer]
                          - generic [ref=e396] [cursor=pointer]
                          - generic [ref=e398] [cursor=pointer]
                          - generic [ref=e400] [cursor=pointer]
                          - generic [ref=e402] [cursor=pointer]
                          - generic [ref=e404] [cursor=pointer]
                          - generic [ref=e406] [cursor=pointer]
                          - generic [ref=e408] [cursor=pointer]
                          - generic [ref=e410] [cursor=pointer]
                          - generic [ref=e412] [cursor=pointer]
                          - generic [ref=e414] [cursor=pointer]
                          - generic [ref=e416] [cursor=pointer]
                          - generic [ref=e418] [cursor=pointer]
                          - generic [ref=e420] [cursor=pointer]
                          - generic [ref=e422] [cursor=pointer]
                          - generic [ref=e424] [cursor=pointer]
                          - generic [ref=e426] [cursor=pointer]
                          - generic [ref=e428] [cursor=pointer]
                          - generic [ref=e430] [cursor=pointer]
                          - generic [ref=e432] [cursor=pointer]
                          - generic [ref=e434] [cursor=pointer]
                          - generic [ref=e436] [cursor=pointer]
                          - generic [ref=e438] [cursor=pointer]
                          - generic [ref=e440] [cursor=pointer]
                          - generic [ref=e442] [cursor=pointer]
                          - generic [ref=e444] [cursor=pointer]
                          - generic [ref=e446] [cursor=pointer]
                          - generic [ref=e448] [cursor=pointer]
                          - generic [ref=e450] [cursor=pointer]
                          - generic [ref=e452] [cursor=pointer]
                          - generic [ref=e454] [cursor=pointer]
                          - generic [ref=e456] [cursor=pointer]
                          - generic [ref=e458] [cursor=pointer]
                          - generic [ref=e460] [cursor=pointer]
                          - generic [ref=e462] [cursor=pointer]
                          - generic [ref=e464] [cursor=pointer]
                          - generic [ref=e466] [cursor=pointer]
                          - generic [ref=e468] [cursor=pointer]
                          - generic [ref=e470] [cursor=pointer]
                          - generic [ref=e472] [cursor=pointer]
                          - generic [ref=e474] [cursor=pointer]
                          - generic [ref=e476] [cursor=pointer]
                          - generic [ref=e478] [cursor=pointer]
                          - generic [ref=e480] [cursor=pointer]
                          - generic [ref=e482] [cursor=pointer]
                          - generic [ref=e484] [cursor=pointer]
                          - generic [ref=e486] [cursor=pointer]
                          - generic [ref=e488] [cursor=pointer]
                          - generic [ref=e490] [cursor=pointer]
                          - generic [ref=e492] [cursor=pointer]
                          - generic [ref=e494] [cursor=pointer]
                          - generic [ref=e496] [cursor=pointer]
                          - generic [ref=e498] [cursor=pointer]
                          - generic [ref=e500] [cursor=pointer]
                          - generic [ref=e502] [cursor=pointer]
                          - generic [ref=e504] [cursor=pointer]
                          - generic [ref=e506] [cursor=pointer]
                          - generic [ref=e508] [cursor=pointer]
                          - generic [ref=e510] [cursor=pointer]
                          - generic [ref=e512] [cursor=pointer]
                          - generic [ref=e514] [cursor=pointer]
                          - generic [ref=e516] [cursor=pointer]
                          - generic [ref=e518] [cursor=pointer]
                          - generic [ref=e520] [cursor=pointer]
                          - generic [ref=e522] [cursor=pointer]
                          - generic [ref=e524] [cursor=pointer]
                          - generic [ref=e526] [cursor=pointer]
                          - generic [ref=e528] [cursor=pointer]
                          - generic [ref=e530] [cursor=pointer]
                          - generic [ref=e532] [cursor=pointer]
                          - generic [ref=e534] [cursor=pointer]
                          - generic [ref=e536] [cursor=pointer]
                          - generic [ref=e538] [cursor=pointer]
                          - generic [ref=e540] [cursor=pointer]
                          - generic [ref=e542] [cursor=pointer]
                          - generic [ref=e544] [cursor=pointer]
                          - generic [ref=e546] [cursor=pointer]
                          - generic [ref=e548] [cursor=pointer]
                          - generic [ref=e550] [cursor=pointer]
                          - generic [ref=e552] [cursor=pointer]
                          - generic [ref=e554] [cursor=pointer]
                          - generic [ref=e556] [cursor=pointer]
                          - generic [ref=e558] [cursor=pointer]
                          - generic [ref=e560] [cursor=pointer]
                          - generic [ref=e562] [cursor=pointer]
                          - generic [ref=e564] [cursor=pointer]
                          - generic [ref=e566] [cursor=pointer]
                          - generic [ref=e568] [cursor=pointer]
                          - generic [ref=e570] [cursor=pointer]
                          - generic [ref=e572] [cursor=pointer]
                          - generic [ref=e574] [cursor=pointer]
                          - generic [ref=e576] [cursor=pointer]
                          - generic [ref=e578] [cursor=pointer]
                          - generic [ref=e580] [cursor=pointer]
                          - generic [ref=e582] [cursor=pointer]
                          - generic [ref=e584] [cursor=pointer]
                          - generic [ref=e586] [cursor=pointer]
                          - generic [ref=e588] [cursor=pointer]
                          - generic [ref=e590] [cursor=pointer]
                          - generic [ref=e592] [cursor=pointer]
                          - generic [ref=e594] [cursor=pointer]
                          - generic [ref=e596] [cursor=pointer]
                          - generic [ref=e598] [cursor=pointer]
                          - generic [ref=e600] [cursor=pointer]
                          - generic [ref=e602] [cursor=pointer]
                          - generic [ref=e604] [cursor=pointer]
                          - generic [ref=e606] [cursor=pointer]
                          - generic [ref=e608] [cursor=pointer]
                          - generic [ref=e610] [cursor=pointer]
                          - generic [ref=e612] [cursor=pointer]
                          - generic [ref=e614] [cursor=pointer]
                          - generic [ref=e616] [cursor=pointer]
                          - generic [ref=e618] [cursor=pointer]
                          - generic [ref=e620] [cursor=pointer]
                          - generic [ref=e622] [cursor=pointer]
                          - generic [ref=e624] [cursor=pointer]
                          - generic [ref=e626] [cursor=pointer]
                          - generic [ref=e628] [cursor=pointer]
                          - generic [ref=e630] [cursor=pointer]
                          - generic [ref=e632] [cursor=pointer]
                          - generic [ref=e634] [cursor=pointer]
                          - generic [ref=e636] [cursor=pointer]
                          - generic [ref=e638] [cursor=pointer]
                          - generic [ref=e640] [cursor=pointer]
                          - generic [ref=e642] [cursor=pointer]
                          - generic [ref=e644] [cursor=pointer]
                          - generic [ref=e646] [cursor=pointer]
                          - generic [ref=e648] [cursor=pointer]
                          - generic [ref=e650] [cursor=pointer]
                          - generic [ref=e652] [cursor=pointer]
                          - generic [ref=e654] [cursor=pointer]
                          - generic [ref=e656] [cursor=pointer]
                          - generic [ref=e658] [cursor=pointer]
                          - generic [ref=e660] [cursor=pointer]
                          - generic [ref=e662] [cursor=pointer]
                          - generic [ref=e664] [cursor=pointer]
                          - generic [ref=e666] [cursor=pointer]
                          - generic [ref=e668] [cursor=pointer]
                          - generic [ref=e670] [cursor=pointer]
                          - generic [ref=e672] [cursor=pointer]
                          - generic [ref=e674] [cursor=pointer]
                          - generic [ref=e676] [cursor=pointer]
                          - generic [ref=e678] [cursor=pointer]
                          - generic [ref=e680] [cursor=pointer]
                          - generic [ref=e682] [cursor=pointer]
                          - generic [ref=e684] [cursor=pointer]
                          - generic [ref=e686] [cursor=pointer]
                          - generic [ref=e688] [cursor=pointer]
                          - generic [ref=e690] [cursor=pointer]
                          - generic [ref=e692] [cursor=pointer]
                          - generic [ref=e694] [cursor=pointer]
                          - generic [ref=e696] [cursor=pointer]
                          - generic [ref=e698] [cursor=pointer]
                          - generic [ref=e700] [cursor=pointer]
                      - generic: Apr
                      - generic: May
                      - generic: Jun
                      - generic: Jul
                      - generic: Aug
                      - generic: Sep
                      - generic: Mon
                      - generic: Wed
                      - generic: Fri
                    - generic [ref=e701]:
                      - generic [ref=e702]: 少
                      - generic [ref=e703]:
                        - generic [ref=e704] [cursor=pointer]
                        - generic [ref=e706] [cursor=pointer]
                        - generic [ref=e708] [cursor=pointer]
                        - generic [ref=e710] [cursor=pointer]
                        - generic [ref=e712] [cursor=pointer]
                      - generic [ref=e714]: 多
                  - paragraph [ref=e715]: 2026年4月1日—2026年9月26日，截至完整周。0 是有效读数，缺测不计为 0。
                  - group [ref=e716]:
                    - generic "查看精确数据" [ref=e717] [cursor=pointer]
                - status [ref=e718]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e719]:
                  - generic "查看本卡代码" [ref=e720] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e721] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
            - region [ref=e722]:
              - generic [ref=e723]:
                - heading "Heatmap Chart - Monday Start" [level=3] [ref=e724]
                - paragraph [ref=e725]: 周一起始并弱化周末行
              - generic [ref=e726]:
                - generic [ref=e727]:
                  - button "更新数据" [ref=e728] [cursor=pointer]
                  - button "重播动效" [ref=e730] [cursor=pointer]
                - generic [ref=e732]:
                  - generic [ref=e734]:
                    - generic [ref=e739]:
                      - img [ref=e740]:
                        - generic [ref=e742]:
                          - generic [ref=e744] [cursor=pointer]
                          - generic [ref=e746] [cursor=pointer]
                          - generic [ref=e748] [cursor=pointer]
                          - generic [ref=e750] [cursor=pointer]
                          - generic [ref=e752] [cursor=pointer]
                          - generic [ref=e754] [cursor=pointer]
                          - generic [ref=e756] [cursor=pointer]
                          - generic [ref=e758] [cursor=pointer]
                          - generic [ref=e760] [cursor=pointer]
                          - generic [ref=e762] [cursor=pointer]
                          - generic [ref=e764] [cursor=pointer]
                          - generic [ref=e766] [cursor=pointer]
                          - generic [ref=e768] [cursor=pointer]
                          - generic [ref=e770] [cursor=pointer]
                          - generic [ref=e772] [cursor=pointer]
                          - generic [ref=e774] [cursor=pointer]
                          - generic [ref=e776] [cursor=pointer]
                          - generic [ref=e778] [cursor=pointer]
                          - generic [ref=e780] [cursor=pointer]
                          - generic [ref=e782] [cursor=pointer]
                          - generic [ref=e784] [cursor=pointer]
                          - generic [ref=e786] [cursor=pointer]
                          - generic [ref=e788] [cursor=pointer]
                          - generic [ref=e790] [cursor=pointer]
                          - generic [ref=e792] [cursor=pointer]
                          - generic [ref=e794] [cursor=pointer]
                          - generic [ref=e796] [cursor=pointer]
                          - generic [ref=e798] [cursor=pointer]
                          - generic [ref=e800] [cursor=pointer]
                          - generic [ref=e802] [cursor=pointer]
                          - generic [ref=e804] [cursor=pointer]
                          - generic [ref=e806] [cursor=pointer]
                          - generic [ref=e808] [cursor=pointer]
                          - generic [ref=e810] [cursor=pointer]
                          - generic [ref=e812] [cursor=pointer]
                          - generic [ref=e814] [cursor=pointer]
                          - generic [ref=e816] [cursor=pointer]
                          - generic [ref=e818] [cursor=pointer]
                          - generic [ref=e820] [cursor=pointer]
                          - generic [ref=e822] [cursor=pointer]
                          - generic [ref=e824] [cursor=pointer]
                          - generic [ref=e826] [cursor=pointer]
                          - generic [ref=e828] [cursor=pointer]
                          - generic [ref=e830] [cursor=pointer]
                          - generic [ref=e832] [cursor=pointer]
                          - generic [ref=e834] [cursor=pointer]
                          - generic [ref=e836] [cursor=pointer]
                          - generic [ref=e838] [cursor=pointer]
                          - generic [ref=e840] [cursor=pointer]
                          - generic [ref=e842] [cursor=pointer]
                          - generic [ref=e844] [cursor=pointer]
                          - generic [ref=e846] [cursor=pointer]
                          - generic [ref=e848] [cursor=pointer]
                          - generic [ref=e850] [cursor=pointer]
                          - generic [ref=e852] [cursor=pointer]
                          - generic [ref=e854] [cursor=pointer]
                          - generic [ref=e856] [cursor=pointer]
                          - generic [ref=e858] [cursor=pointer]
                          - generic [ref=e860] [cursor=pointer]
                          - generic [ref=e862] [cursor=pointer]
                          - generic [ref=e864] [cursor=pointer]
                          - generic [ref=e866] [cursor=pointer]
                          - generic [ref=e868] [cursor=pointer]
                          - generic [ref=e870] [cursor=pointer]
                          - generic [ref=e872] [cursor=pointer]
                          - generic [ref=e874] [cursor=pointer]
                          - generic [ref=e876] [cursor=pointer]
                          - generic [ref=e878] [cursor=pointer]
                          - generic [ref=e880] [cursor=pointer]
                          - generic [ref=e882] [cursor=pointer]
                          - generic [ref=e884] [cursor=pointer]
                          - generic [ref=e886] [cursor=pointer]
                          - generic [ref=e888] [cursor=pointer]
                          - generic [ref=e890] [cursor=pointer]
                          - generic [ref=e892] [cursor=pointer]
                          - generic [ref=e894] [cursor=pointer]
                          - generic [ref=e896] [cursor=pointer]
                          - generic [ref=e898] [cursor=pointer]
                          - generic [ref=e900] [cursor=pointer]
                          - generic [ref=e902] [cursor=pointer]
                          - generic [ref=e904] [cursor=pointer]
                          - generic [ref=e906] [cursor=pointer]
                          - generic [ref=e908] [cursor=pointer]
                          - generic [ref=e910] [cursor=pointer]
                          - generic [ref=e912] [cursor=pointer]
                          - generic [ref=e914] [cursor=pointer]
                          - generic [ref=e916] [cursor=pointer]
                          - generic [ref=e918] [cursor=pointer]
                          - generic [ref=e920] [cursor=pointer]
                          - generic [ref=e922] [cursor=pointer]
                          - generic [ref=e924] [cursor=pointer]
                          - generic [ref=e926] [cursor=pointer]
                          - generic [ref=e928] [cursor=pointer]
                          - generic [ref=e930] [cursor=pointer]
                          - generic [ref=e932] [cursor=pointer]
                          - generic [ref=e934] [cursor=pointer]
                          - generic [ref=e936] [cursor=pointer]
                          - generic [ref=e938] [cursor=pointer]
                          - generic [ref=e940] [cursor=pointer]
                          - generic [ref=e942] [cursor=pointer]
                          - generic [ref=e944] [cursor=pointer]
                          - generic [ref=e946] [cursor=pointer]
                          - generic [ref=e948] [cursor=pointer]
                          - generic [ref=e950] [cursor=pointer]
                          - generic [ref=e952] [cursor=pointer]
                          - generic [ref=e954] [cursor=pointer]
                          - generic [ref=e956] [cursor=pointer]
                          - generic [ref=e958] [cursor=pointer]
                          - generic [ref=e960] [cursor=pointer]
                          - generic [ref=e962] [cursor=pointer]
                          - generic [ref=e964] [cursor=pointer]
                          - generic [ref=e966] [cursor=pointer]
                          - generic [ref=e968] [cursor=pointer]
                          - generic [ref=e970] [cursor=pointer]
                          - generic [ref=e972] [cursor=pointer]
                          - generic [ref=e974] [cursor=pointer]
                          - generic [ref=e976] [cursor=pointer]
                          - generic [ref=e978] [cursor=pointer]
                          - generic [ref=e980] [cursor=pointer]
                          - generic [ref=e982] [cursor=pointer]
                          - generic [ref=e984] [cursor=pointer]
                          - generic [ref=e986] [cursor=pointer]
                          - generic [ref=e988] [cursor=pointer]
                          - generic [ref=e990] [cursor=pointer]
                          - generic [ref=e992] [cursor=pointer]
                          - generic [ref=e994] [cursor=pointer]
                          - generic [ref=e996] [cursor=pointer]
                          - generic [ref=e998] [cursor=pointer]
                          - generic [ref=e1000] [cursor=pointer]
                          - generic [ref=e1002] [cursor=pointer]
                          - generic [ref=e1004] [cursor=pointer]
                          - generic [ref=e1006] [cursor=pointer]
                          - generic [ref=e1008] [cursor=pointer]
                          - generic [ref=e1010] [cursor=pointer]
                          - generic [ref=e1012] [cursor=pointer]
                          - generic [ref=e1014] [cursor=pointer]
                          - generic [ref=e1016] [cursor=pointer]
                          - generic [ref=e1018] [cursor=pointer]
                          - generic [ref=e1020] [cursor=pointer]
                          - generic [ref=e1022] [cursor=pointer]
                          - generic [ref=e1024] [cursor=pointer]
                          - generic [ref=e1026] [cursor=pointer]
                          - generic [ref=e1028] [cursor=pointer]
                          - generic [ref=e1030] [cursor=pointer]
                          - generic [ref=e1032] [cursor=pointer]
                          - generic [ref=e1034] [cursor=pointer]
                          - generic [ref=e1036] [cursor=pointer]
                          - generic [ref=e1038] [cursor=pointer]
                          - generic [ref=e1040] [cursor=pointer]
                          - generic [ref=e1042] [cursor=pointer]
                          - generic [ref=e1044] [cursor=pointer]
                          - generic [ref=e1046] [cursor=pointer]
                          - generic [ref=e1048] [cursor=pointer]
                          - generic [ref=e1050] [cursor=pointer]
                          - generic [ref=e1052] [cursor=pointer]
                          - generic [ref=e1054] [cursor=pointer]
                          - generic [ref=e1056] [cursor=pointer]
                          - generic [ref=e1058] [cursor=pointer]
                          - generic [ref=e1060] [cursor=pointer]
                          - generic [ref=e1062] [cursor=pointer]
                          - generic [ref=e1064] [cursor=pointer]
                          - generic [ref=e1066] [cursor=pointer]
                          - generic [ref=e1068] [cursor=pointer]
                          - generic [ref=e1070] [cursor=pointer]
                          - generic [ref=e1072] [cursor=pointer]
                          - generic [ref=e1074] [cursor=pointer]
                          - generic [ref=e1076] [cursor=pointer]
                          - generic [ref=e1078] [cursor=pointer]
                          - generic [ref=e1080] [cursor=pointer]
                          - generic [ref=e1082] [cursor=pointer]
                          - generic [ref=e1084] [cursor=pointer]
                          - generic [ref=e1086] [cursor=pointer]
                          - generic [ref=e1088] [cursor=pointer]
                          - generic [ref=e1090] [cursor=pointer]
                          - generic [ref=e1092] [cursor=pointer]
                          - generic [ref=e1094] [cursor=pointer]
                          - generic [ref=e1096] [cursor=pointer]
                          - generic [ref=e1098] [cursor=pointer]
                          - generic [ref=e1100] [cursor=pointer]
                          - generic [ref=e1102] [cursor=pointer]
                          - generic [ref=e1104] [cursor=pointer]
                          - generic [ref=e1106] [cursor=pointer]
                      - generic: Apr
                      - generic: May
                      - generic: Jun
                      - generic: Jul
                      - generic: Aug
                      - generic: Sep
                      - generic: T
                      - generic: T
                      - generic: S
                    - generic [ref=e1107]:
                      - generic [ref=e1108]: 少
                      - generic [ref=e1109]:
                        - generic [ref=e1110] [cursor=pointer]
                        - generic [ref=e1112] [cursor=pointer]
                        - generic [ref=e1114] [cursor=pointer]
                        - generic [ref=e1116] [cursor=pointer]
                        - generic [ref=e1118] [cursor=pointer]
                      - generic [ref=e1120]: 多
                  - paragraph [ref=e1121]: 2026年4月1日—2026年9月27日，截至完整周。周一至周日按日期连续排列；周末弱化。
                  - group [ref=e1122]:
                    - generic "查看精确数据" [ref=e1123] [cursor=pointer]
                - status [ref=e1124]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1125]:
                  - generic "查看本卡代码" [ref=e1126] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1127] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
        - region [ref=e1128]:
          - heading "图形材质" [level=2] [ref=e1129]
          - region [ref=e1131]:
            - generic [ref=e1132]:
              - heading "Heatmap Chart - Pattern Levels" [level=3] [ref=e1133]
              - paragraph [ref=e1134]: 色阶图案同步用于格子与图例
            - generic [ref=e1135]:
              - generic [ref=e1136]:
                - button "更新数据" [ref=e1137] [cursor=pointer]
                - button "重播动效" [ref=e1139] [cursor=pointer]
              - paragraph [ref=e1142]: 滚动到此处查看示例
              - status [ref=e1143]: 示例数据 · 已更新 0 次 · 已减少动效
              - group [ref=e1144]:
                - generic "查看本卡代码" [ref=e1145] [cursor=pointer]
                - option "main.tsx" [selected]
                - option "index.html"
                - option "chart-variants/structure.tsx"
                - option "chart-variants/shared.tsx"
                - option "chart-variants/data/README.md"
                - option "chart-variants/data/world.geojson"
                - option "chart-data.ts"
                - option "chart-catalog.ts"
                - option "chart-examples.css"
            - link "对应官网示例（新标签页打开）" [ref=e1146] [cursor=pointer]:
              - /url: https://bklit.com/charts/heatmap-chart
        - region [ref=e1147]:
          - heading "坐标与辅助读数" [level=2] [ref=e1148]
          - generic [ref=e1149]:
            - region [ref=e1150]:
              - generic [ref=e1151]:
                - heading "Heatmap Chart - Solid Separators" [level=3] [ref=e1152]
                - paragraph [ref=e1153]: 纯色实线季度分隔
              - generic [ref=e1154]:
                - generic [ref=e1155]:
                  - button "更新数据" [ref=e1156] [cursor=pointer]
                  - button "重播动效" [ref=e1158] [cursor=pointer]
                - paragraph [ref=e1161]: 滚动到此处查看示例
                - status [ref=e1162]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1163]:
                  - generic "查看本卡代码" [ref=e1164] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1165] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
            - region [ref=e1166]:
              - generic [ref=e1167]:
                - heading "Heatmap Chart - Compact Y Axis & Quarter Separators" [level=3] [ref=e1168]
                - paragraph [ref=e1169]: 紧凑星期标签与渐隐季度线
              - generic [ref=e1170]:
                - generic [ref=e1171]:
                  - button "更新数据" [ref=e1172] [cursor=pointer]
                  - button "重播动效" [ref=e1174] [cursor=pointer]
                - paragraph [ref=e1177]: 滚动到此处查看示例
                - status [ref=e1178]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1179]:
                  - generic "查看本卡代码" [ref=e1180] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1181] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
            - region [ref=e1182]:
              - generic [ref=e1183]:
                - heading "Heatmap Chart - Dashed Separators" [level=3] [ref=e1184]
                - paragraph [ref=e1185]: 隐藏纵轴并显示渐隐虚线季度分隔
              - generic [ref=e1186]:
                - generic [ref=e1187]:
                  - button "更新数据" [ref=e1188] [cursor=pointer]
                  - button "重播动效" [ref=e1190] [cursor=pointer]
                - paragraph [ref=e1193]: 滚动到此处查看示例
                - status [ref=e1194]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1195]:
                  - generic "查看本卡代码" [ref=e1196] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1197] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
            - region [ref=e1198]:
              - generic [ref=e1199]:
                - heading "Heatmap Chart - Gradient Legend" [level=3] [ref=e1200]
                - paragraph [ref=e1201]: 连续渐变图例与定制两端文案
              - generic [ref=e1202]:
                - generic [ref=e1203]:
                  - button "更新数据" [ref=e1204] [cursor=pointer]
                  - button "重播动效" [ref=e1206] [cursor=pointer]
                - paragraph [ref=e1208]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e1210]: 滚动到此处查看示例
                - status [ref=e1211]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1212]:
                  - generic "查看本卡代码" [ref=e1213] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1214] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
        - region [ref=e1215]:
          - heading "交互与状态" [level=2] [ref=e1216]
          - generic [ref=e1217]:
            - region [ref=e1218]:
              - generic [ref=e1219]:
                - heading "Heatmap Chart - Contributions" [level=3] [ref=e1220]
                - paragraph [ref=e1221]: 圆形日历格、季度线与图例联动
              - generic [ref=e1222]:
                - generic [ref=e1223]:
                  - button "更新数据" [ref=e1224] [cursor=pointer]
                  - button "重播动效" [ref=e1226] [cursor=pointer]
                - paragraph [ref=e1229]: 滚动到此处查看示例
                - status [ref=e1230]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1231]:
                  - generic "查看本卡代码" [ref=e1232] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1233] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
            - region [ref=e1234]:
              - generic [ref=e1235]:
                - heading "Heatmap Chart - Loading" [level=3] [ref=e1236]
                - paragraph [ref=e1237]: 单元格扫光骨架加载
              - generic [ref=e1238]:
                - generic [ref=e1239]:
                  - button "更新数据" [ref=e1240] [cursor=pointer]
                  - button "重播动效" [ref=e1242] [cursor=pointer]
                - paragraph [ref=e1245]: 滚动到此处查看示例
                - status [ref=e1246]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1247]:
                  - generic "查看本卡代码" [ref=e1248] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1249] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
            - region [ref=e1250]:
              - generic [ref=e1251]:
                - heading "Heatmap Chart - Horizontal Scroll" [level=3] [ref=e1252]
                - paragraph [ref=e1253]: 半年窗口内横向浏览全年
              - generic [ref=e1254]:
                - generic [ref=e1255]:
                  - button "更新数据" [ref=e1256] [cursor=pointer]
                  - button "重播动效" [ref=e1258] [cursor=pointer]
                - paragraph [ref=e1261]: 滚动到此处查看示例
                - status [ref=e1262]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1263]:
                  - generic "查看本卡代码" [ref=e1264] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1265] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
            - region [ref=e1266]:
              - generic [ref=e1267]:
                - heading "Heatmap Chart - Active Scale Hover" [level=3] [ref=e1268]
                - paragraph [ref=e1269]: 增大悬浮单元格与格间距
              - generic [ref=e1270]:
                - generic [ref=e1271]:
                  - button "更新数据" [ref=e1272] [cursor=pointer]
                  - button "重播动效" [ref=e1274] [cursor=pointer]
                - paragraph [ref=e1277]: 滚动到此处查看示例
                - status [ref=e1278]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e1279]:
                  - generic "查看本卡代码" [ref=e1280] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e1281] [cursor=pointer]:
                - /url: https://bklit.com/charts/heatmap-chart
```

# Test source

```ts
  1  | import { expect, test, type Locator } from "@playwright/test";
  2  | import { mkdir } from "node:fs/promises";
  3  | 
  4  | const evidence = process.env.RAIN_CHART_REFINEMENT_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/feedback-2026-10-08-round2/browser";
  5  | test.beforeAll(() => mkdir(evidence, { recursive: true }));
  6  | const centerX = async (plot: Locator) => { const box = (await plot.boundingBox())!; return box.x + box.width / 2; };
  7  | async function centeredHeading(card: Locator) {
  8  |   const text = card.locator(".rain-chart-sunburst-title");
  9  |   const x = await text.evaluate(node => { const range = document.createRange(); range.selectNodeContents(node); const box = range.getBoundingClientRect(); return box.x + box.width / 2; });
  10 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
  11 | }
  12 | async function centeredTrail(card: Locator) {
  13 |   const trail = card.getByRole("navigation", { name: "学习内容层级" });
  14 |   const x = await trail.locator("ol").evaluate(node => { const boxes = [...node.children].map(child => child.getBoundingClientRect()); return (Math.min(...boxes.map(box => box.left)) + Math.max(...boxes.map(box => box.right))) / 2; });
  15 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
  16 | }
  17 | 
  18 | for (const site of [
  19 |   { name: "playground", base: "http://127.0.0.1:5173/" },
  20 |   { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
  21 | ]) for (const width of [1197, 390]) test.describe(`${site.name} ${width}px`, () => {
  22 |   test.beforeEach(async ({ page }) => { await page.setViewportSize({ width, height: 796 }); await page.emulateMedia({ reducedMotion: "reduce" }); });
  23 |   test(`${site.name} pie legend hover has no shadow at ${width}`, async ({ page }) => {
  24 |     await page.goto(`${site.base}#chart-pie`);
  25 |     const card = page.locator('[data-chart-variant="pie-legend"]');
  26 |     await card.scrollIntoViewIfNeeded();
  27 |     await card.locator(".rain-chart-variant-legend-item").nth(1).focus();
  28 |     await expect(card.locator(".rain-chart-center-label")).toHaveText("研讨课");
  29 |     await page.waitForTimeout(300);
  30 |     const filters = await card.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  31 |     expect(filters.length).toBeGreaterThan(0);
  32 |     expect(filters.every(filter => filter === "none")).toBe(true);
  33 |     await card.screenshot({ path: `${evidence}/${site.name}-pie-legend-hover-${width}.png` });
  34 |   });
  35 |   test(`${site.name} every ring has only a centered percentage and label at ${width}`, async ({ page }) => {
  36 |     await page.goto(`${site.base}#chart-ring`);
  37 |     for (const card of await page.locator('[data-chart-variant^="ring-"]').all()) {
  38 |       await card.scrollIntoViewIfNeeded();
  39 |       const reading = card.locator(".rain-chart-center-reading");
  40 |       await expect(reading).toHaveText("70.0%阅读进度");
  41 |       const svg = card.locator("svg").first();
  42 |       const box = (await reading.boundingBox())!, plot = (await svg.boundingBox())!;
  43 |       expect(Math.abs(box.x + box.width / 2 - plot.x - plot.width / 2)).toBeLessThan(2);
  44 |       expect(Math.abs(box.y + box.height / 2 - plot.y - plot.height / 2)).toBeLessThan(2);
  45 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  46 |     }
  47 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  48 |     await legend.scrollIntoViewIfNeeded();
  49 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  50 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
  51 |     await expect(legend.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  52 |   });
  53 |   test(`${site.name} reference range dashed boundaries stay light at ${width}`, async ({ page }) => {
  54 |     for (const family of ["bar", "area", "line", "scatter", "candlestick"]) {
  55 |       await page.goto(`${site.base}#chart-${family}`);
  56 |       const card = page.locator(`[data-chart-variant="${family}-reference-band"]`);
  57 |       await card.scrollIntoViewIfNeeded();
  58 |       const lines = card.locator(".chart-reference-area line[stroke-dasharray]");
  59 |       await expect(lines).toHaveCount(2);
  60 |       expect(await lines.evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).strokeOpacity) <= .25))).toBe(true);
  61 |       await card.screenshot({ path: `${evidence}/${site.name}-${family}-reference-band-${width}.png` });
  62 |     }
  63 |   });
  64 |   test(`${site.name} every heatmap legend has room below its calendar at ${width}`, async ({ page }) => {
  65 |     await page.goto(`${site.base}#chart-heatmap`);
  66 |     for (const card of await page.locator('[data-chart-variant^="heatmap-"]').all()) {
  67 |       await card.scrollIntoViewIfNeeded();
  68 |       const legend = card.getByText(/^(少|低耗时)$/).locator("..");
  69 |       await expect(legend).toBeVisible();
  70 |       const cells = card.locator(".visx-heatmap-rects rect");
  71 |       const bottom = await cells.evaluateAll(nodes => Math.max(...nodes.map(node => node.getBoundingClientRect().bottom)));
  72 |       const box = (await legend.boundingBox())!;
> 73 |       expect(box.y - bottom).toBeGreaterThanOrEqual(16);
     |                              ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  74 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  75 |     }
  76 |     const example = page.locator('main [data-rain-id="chart-heatmap"]').first();
  77 |     const legend = example.getByText("少", { exact: true }).locator("..");
  78 |     await expect(legend).toBeVisible();
  79 |     expect((await legend.boundingBox())!.height).toBeGreaterThan(0);
  80 |     await example.screenshot({ path: `${evidence}/${site.name}-heatmap-default-example-${width}.png` });
  81 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  82 |   });
  83 |   test(`${site.name} all sunburst titles and drilled Breadcrumbs are centered at ${width}`, async ({ page }) => {
  84 |     await page.goto(`${site.base}#chart-sunburst`);
  85 |     for (const card of await page.locator('[data-chart-variant^="sunburst-"]').all()) {
  86 |       await card.scrollIntoViewIfNeeded();
  87 |       await centeredHeading(card);
  88 |       await card.getByRole("button", { name: /基础课程/ }).click();
  89 |       await centeredTrail(card);
  90 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-drill-${width}.png` });
  91 |       await card.getByRole("link", { name: "返回学习内容" }).click();
  92 |       await centeredHeading(card);
  93 |     }
  94 |     const example = page.locator('main [data-rain-id="chart-sunburst"]').first();
  95 |     await example.scrollIntoViewIfNeeded();
  96 |     await centeredHeading(example);
  97 |   });
  98 | });
  99 | 
```