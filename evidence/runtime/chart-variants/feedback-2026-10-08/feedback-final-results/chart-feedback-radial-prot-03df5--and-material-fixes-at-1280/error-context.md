# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-radial.spec.ts >> prototype radial readings and material fixes at 1280
- Location: tests/e2e/chart-feedback-radial.spec.ts:9:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 501.34375
Received:   501.34375
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
      - heading "仪表图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 单项达成率的弧形或线形刻度表达。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "清晰线与轻面积" [selected]
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
        - generic [ref=e40]:
          - text: 形态
          - combobox "仪表形态" [ref=e41] [cursor=pointer]:
            - option "弧形刻度" [selected]
            - option "线形刻度"
        - generic [ref=e42]:
          - text: 读数
          - combobox "仪表读数" [ref=e43] [cursor=pointer]:
            - option "当前数据" [selected]
            - option "50%"
            - option "100%"
        - generic [ref=e48]:
          - generic:
            - generic:
              - generic:
                - img "76":
                  - generic:
                    - generic:
                      - generic:
                        - generic: "7"
                        - generic: "6"
                - text: "%"
              - generic: 目标达成率
        - group [ref=e120]:
          - generic "查看精确数据" [ref=e121] [cursor=pointer]
      - status [ref=e122]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e123]:
        - strong [ref=e124]: 数据要求：
        - text: value限定0—100；业务量程需先归一，中心显示同一比率。
      - paragraph [ref=e125]:
        - strong [ref=e126]: 使用边界：
        - text: 本例不提供任意量程或阈值告警的语义。
      - group [ref=e127]:
        - generic "调用配置、完整源码与示例数据" [ref=e128] [cursor=pointer]
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
      - region "全部图表变体" [ref=e129]:
        - navigation "变体分组" [ref=e130]:
          - button "基础结构" [ref=e131] [cursor=pointer]
          - button "图形材质" [ref=e132] [cursor=pointer]
          - button "坐标与辅助读数" [ref=e133] [cursor=pointer]
        - region [ref=e134]:
          - heading "基础结构" [level=2] [ref=e135]
          - generic [ref=e136]:
            - region [ref=e137]:
              - generic [ref=e138]:
                - heading "Gauge" [level=3] [ref=e139]
                - paragraph [ref=e140]: 刻度弧、主题填充与中心数值
              - generic [ref=e141]:
                - generic [ref=e142]:
                  - button "更新数据" [ref=e143] [cursor=pointer]
                  - button "重播动效" [ref=e145] [cursor=pointer]
                - paragraph [ref=e148]: 滚动到此处查看示例
                - status [ref=e149]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e150]:
                  - generic "查看本卡代码" [ref=e151] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e152] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e153]:
              - generic [ref=e154]:
                - heading "Gauge — sparse ring, quarter sweep" [level=3] [ref=e155]
                - paragraph [ref=e156]: 稀疏刻度的局部弧段；角度按源例复核
              - generic [ref=e157]:
                - generic [ref=e158]:
                  - button "更新数据" [ref=e159] [cursor=pointer]
                  - button "重播动效" [ref=e161] [cursor=pointer]
                - paragraph [ref=e164]: 滚动到此处查看示例
                - status [ref=e165]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e166]:
                  - generic "查看本卡代码" [ref=e167] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e168] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e169]:
              - generic [ref=e170]:
                - heading "Gauge — same density, bottom half sweep" [level=3] [ref=e171]
                - paragraph [ref=e172]: 保持稀疏刻度并转向下半圆
              - generic [ref=e173]:
                - generic [ref=e174]:
                  - button "更新数据" [ref=e175] [cursor=pointer]
                  - button "重播动效" [ref=e177] [cursor=pointer]
                - paragraph [ref=e180]: 滚动到此处查看示例
                - status [ref=e181]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e182]:
                  - generic "查看本卡代码" [ref=e183] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e184] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e185]:
              - generic [ref=e186]:
                - heading "Gauge — flipped sweep (270° → 450°)" [level=3] [ref=e187]
                - paragraph [ref=e188]: 旋转弧段，使缺口位于另一侧
              - generic [ref=e189]:
                - generic [ref=e190]:
                  - button "更新数据" [ref=e191] [cursor=pointer]
                  - button "重播动效" [ref=e193] [cursor=pointer]
                - paragraph [ref=e196]: 滚动到此处查看示例
                - status [ref=e197]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e198]:
                  - generic "查看本卡代码" [ref=e199] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e200] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e201]:
              - generic [ref=e202]:
                - heading "Gauge — linear notch track" [level=3] [ref=e203]
                - paragraph [ref=e204]: 响应容器宽度的横向刻度条
              - generic [ref=e205]:
                - generic [ref=e206]:
                  - button "更新数据" [ref=e207] [cursor=pointer]
                  - button "重播动效" [ref=e209] [cursor=pointer]
                - generic [ref=e211]:
                  - group "预设进度" [ref=e343]:
                    - button "0%" [ref=e344] [cursor=pointer]
                    - button "50%" [ref=e345] [cursor=pointer]
                    - button "100%" [ref=e346] [cursor=pointer]
                    - status "当前进度" [ref=e347]: 72%
                  - group [ref=e348]:
                    - generic "查看精确数据" [ref=e349] [cursor=pointer]
                - status [ref=e350]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e351]:
                  - generic "查看本卡代码" [ref=e352] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e353] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
        - region [ref=e354]:
          - heading "图形材质" [level=2] [ref=e355]
          - generic [ref=e356]:
            - region [ref=e357]:
              - generic [ref=e358]:
                - heading "Gauge — tight arc, filleted corners" [level=3] [ref=e359]
                - paragraph [ref=e360]: 无刻度间隙、圆角与自定弧段
              - generic [ref=e361]:
                - generic [ref=e362]:
                  - button "更新数据" [ref=e363] [cursor=pointer]
                  - button "重播动效" [ref=e365] [cursor=pointer]
                - generic [ref=e367]:
                  - generic [ref=e372]:
                    - generic:
                      - generic:
                        - generic:
                          - img "66":
                            - generic:
                              - generic:
                                - generic:
                                  - generic: "6"
                                  - generic: "6"
                          - text: "%"
                        - generic: 完成进度
                  - group "预设进度" [ref=e440]:
                    - button "0%" [ref=e441] [cursor=pointer]
                    - button "50%" [ref=e442] [cursor=pointer]
                    - button "100%" [ref=e443] [cursor=pointer]
                    - status "当前进度" [ref=e444]: 66%
                  - group [ref=e445]:
                    - generic "查看精确数据" [ref=e446] [cursor=pointer]
                - status [ref=e447]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e448]:
                  - generic "查看本卡代码" [ref=e449] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e450] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e451]:
              - generic [ref=e452]:
                - heading "Gauge — dual arc gradients" [level=3] [ref=e453]
                - paragraph [ref=e454]: 激活及未激活弧段分别渐变
              - generic [ref=e455]:
                - generic [ref=e456]:
                  - button "更新数据" [ref=e457] [cursor=pointer]
                  - button "重播动效" [ref=e459] [cursor=pointer]
                - paragraph [ref=e461]: 本卡使用独立示例配色，保留材质或色阶差异。
                - generic [ref=e462]:
                  - generic [ref=e467]:
                    - generic:
                      - generic:
                        - generic:
                          - img "66":
                            - generic:
                              - generic:
                                - generic:
                                  - generic: "6"
                                  - generic: "6"
                          - text: "%"
                        - generic: 完成进度
                  - group "预设进度" [ref=e535]:
                    - button "0%" [ref=e536] [cursor=pointer]
                    - button "50%" [ref=e537] [cursor=pointer]
                    - button "100%" [ref=e538] [cursor=pointer]
                    - status "当前进度" [ref=e539]: 66%
                  - group [ref=e540]:
                    - generic "查看精确数据" [ref=e541] [cursor=pointer]
                - status [ref=e542]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e543]:
                  - generic "查看本卡代码" [ref=e544] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e545] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e546]:
              - generic [ref=e547]:
                - heading "Gauge — pattern foreground, dim solid track" [level=3] [ref=e548]
                - paragraph [ref=e549]: 前景图案与低透明度实色轨道
              - generic [ref=e550]:
                - generic [ref=e551]:
                  - button "更新数据" [ref=e552] [cursor=pointer]
                  - button "重播动效" [ref=e554] [cursor=pointer]
                - generic [ref=e556]:
                  - generic [ref=e561]:
                    - generic:
                      - generic:
                        - generic:
                          - img "66":
                            - generic:
                              - generic:
                                - generic:
                                  - generic: "6"
                                  - generic: "6"
                          - text: "%"
                        - generic: 完成进度
                  - group "预设进度" [ref=e629]:
                    - button "0%" [ref=e630] [cursor=pointer]
                    - button "50%" [ref=e631] [cursor=pointer]
                    - button "100%" [ref=e632] [cursor=pointer]
                    - status "当前进度" [ref=e633]: 66%
                  - group [ref=e634]:
                    - generic "查看精确数据" [ref=e635] [cursor=pointer]
                - status [ref=e636]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e637]:
                  - generic "查看本卡代码" [ref=e638] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e639] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e640]:
              - generic [ref=e641]:
                - heading "Gauge — soft fillets, full depth" [level=3] [ref=e642]
                - paragraph [ref=e643]: 保留刻度深度并柔化圆角
              - generic [ref=e644]:
                - generic [ref=e645]:
                  - button "更新数据" [ref=e646] [cursor=pointer]
                  - button "重播动效" [ref=e648] [cursor=pointer]
                - generic [ref=e650]:
                  - generic [ref=e655]:
                    - generic:
                      - generic:
                        - generic:
                          - img "66":
                            - generic:
                              - generic:
                                - generic:
                                  - generic: "6"
                                  - generic: "6"
                          - text: "%"
                        - generic: 完成进度
                  - group "预设进度" [ref=e723]:
                    - button "0%" [ref=e724] [cursor=pointer]
                    - button "50%" [ref=e725] [cursor=pointer]
                    - button "100%" [ref=e726] [cursor=pointer]
                    - status "当前进度" [ref=e727]: 66%
                  - group [ref=e728]:
                    - generic "查看精确数据" [ref=e729] [cursor=pointer]
                - status [ref=e730]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e731]:
                  - generic "查看本卡代码" [ref=e732] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e733] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e734]:
              - generic [ref=e735]:
                - heading "Gauge — short notches, bold corners" [level=3] [ref=e736]
                - paragraph [ref=e737]: 缩短刻度径向深度并加大圆角
              - generic [ref=e738]:
                - generic [ref=e739]:
                  - button "更新数据" [ref=e740] [cursor=pointer]
                  - button "重播动效" [ref=e742] [cursor=pointer]
                - paragraph [ref=e745]: 滚动到此处查看示例
                - status [ref=e746]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e747]:
                  - generic "查看本卡代码" [ref=e748] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e749] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e750]:
              - generic [ref=e751]:
                - heading "Gauge — near-circular notches" [level=3] [ref=e752]
                - paragraph [ref=e753]: 几何约束下近圆形刻度
              - generic [ref=e754]:
                - generic [ref=e755]:
                  - button "更新数据" [ref=e756] [cursor=pointer]
                  - button "重播动效" [ref=e758] [cursor=pointer]
                - paragraph [ref=e761]: 滚动到此处查看示例
                - status [ref=e762]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e763]:
                  - generic "查看本卡代码" [ref=e764] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e765] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e766]:
              - generic [ref=e767]:
                - heading "Gauge — linear dual gradients" [level=3] [ref=e768]
                - paragraph [ref=e769]: 横向激活及未激活刻度分别渐变
              - generic [ref=e770]:
                - generic [ref=e771]:
                  - button "更新数据" [ref=e772] [cursor=pointer]
                  - button "重播动效" [ref=e774] [cursor=pointer]
                - paragraph [ref=e776]: 本卡使用独立示例配色，保留材质或色阶差异。
                - generic [ref=e777]:
                  - group "预设进度" [ref=e909]:
                    - button "0%" [ref=e910] [cursor=pointer]
                    - button "50%" [ref=e911] [cursor=pointer]
                    - button "100%" [ref=e912] [cursor=pointer]
                    - status "当前进度" [ref=e913]: 72%
                  - group [ref=e914]:
                    - generic "查看精确数据" [ref=e915] [cursor=pointer]
                - status [ref=e916]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e917]:
                  - generic "查看本卡代码" [ref=e918] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e919] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
        - region [ref=e920]:
          - heading "坐标与辅助读数" [level=2] [ref=e921]
          - region [ref=e923]:
            - generic [ref=e924]:
              - heading "Gauge — linear with label below" [level=3] [ref=e925]
              - paragraph [ref=e926]: 横向刻度条下方显示标签与值
            - generic [ref=e927]:
              - generic [ref=e928]:
                - button "更新数据" [ref=e929] [cursor=pointer]
                - button "重播动效" [ref=e931] [cursor=pointer]
              - generic [ref=e933]:
                - generic [ref=e1067]:
                  - generic [ref=e1068]:
                    - img "72" [ref=e1069]:
                      - generic [ref=e1072]:
                        - generic [ref=e1073]: "7"
                        - generic [ref=e1075]: "2"
                    - text: "%"
                  - generic [ref=e1077]: 完成进度
                - group "预设进度" [ref=e1078]:
                  - button "0%" [ref=e1079] [cursor=pointer]
                  - button "50%" [ref=e1080] [cursor=pointer]
                  - button "100%" [ref=e1081] [cursor=pointer]
                  - status "当前进度" [ref=e1082]: 72%
                - group [ref=e1083]:
                  - generic "查看精确数据" [ref=e1084] [cursor=pointer]
              - status [ref=e1085]: 示例数据 · 已更新 0 次 · 已减少动效
              - group [ref=e1086]:
                - generic "查看本卡代码" [ref=e1087] [cursor=pointer]
                - option "main.tsx" [selected]
                - option "index.html"
                - option "chart-variants/comparison.tsx"
                - option "chart-variants/shared.tsx"
                - option "chart-variants/data/README.md"
                - option "chart-variants/data/world.geojson"
                - option "chart-data.ts"
                - option "chart-catalog.ts"
                - option "chart-examples.css"
            - link "对应官网示例（新标签页打开）" [ref=e1088] [cursor=pointer]:
              - /url: https://bklit.com/charts/gauge-chart
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdir, writeFile } from "node:fs/promises";
  3  | 
  4  | const evidence = process.env.RAIN_CHART_FEEDBACK_RADIAL_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/feedback-2026-10-08/radial";
  5  | for (const site of [
  6  |   { name: "playground", base: "http://127.0.0.1:5173/" },
  7  |   { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
  8  | ]) for (const width of [1280, 390]) {
  9  |   test(`${site.name} radial readings and material fixes at ${width}`, async ({ page }) => {
  10 |     await page.emulateMedia({ reducedMotion: "reduce" });
  11 |     await page.setViewportSize({ width, height: 796 });
  12 |     const facts: unknown[] = [];
  13 |     await mkdir(evidence, { recursive: true });
  14 |     await page.goto(`${site.base}#chart-pie`);
  15 |     const donut = page.locator('[data-chart-variant="pie-donut"]');
  16 |     await donut.scrollIntoViewIfNeeded();
  17 |     await expect(donut.locator('[data-slot="chart-stat-suffix"]')).toHaveText("人");
  18 |     const reading = await donut.locator(".rain-chart-center-value").evaluate(node => {
  19 |       const number = node.querySelector("number-flow-react")!;
  20 |       const unit = node.querySelector("small")!;
  21 |       return { value: number.getAttribute("aria-label"), gap: unit.getBoundingClientRect().left - number.getBoundingClientRect().right,
  22 |         valueFont: parseFloat(getComputedStyle(node).fontSize), unitFont: parseFloat(getComputedStyle(unit).fontSize) };
  23 |     });
  24 |     expect(reading.value).toBe("500");
  25 |     expect(reading.gap).toBeGreaterThanOrEqual(0);
  26 |     expect(reading.gap).toBeLessThanOrEqual(4);
  27 |     expect(reading.unitFont).toBeLessThan(reading.valueFont * .8);
  28 |     facts.push({ id: "pie-donut", ...reading });
  29 |     await donut.screenshot({ path: `${evidence}/${site.name}-pie-donut-${width}.png` });
  30 | 
  31 |     const gradient = page.locator('[data-chart-variant="pie-gradients"]');
  32 |     await gradient.scrollIntoViewIfNeeded();
  33 |     await expect(gradient.locator("radialGradient")).toHaveCount(3);
  34 |     const hues = await gradient.locator("radialGradient").evaluateAll(nodes => nodes.map(node => [...node.querySelectorAll("stop")].map(stop => stop.getAttribute("stop-color"))));
  35 |     expect(hues.every(colors => new Set(colors).size === 1)).toBe(true);
  36 |     facts.push({ id: "pie-gradients", hues });
  37 |     await gradient.screenshot({ path: `${evidence}/${site.name}-pie-gradients-${width}.png` });
  38 |     const pattern = page.locator('[data-chart-variant="pie-patterns"]');
  39 |     await pattern.scrollIntoViewIfNeeded();
  40 |     await pattern.locator('svg path[fill="transparent"]').first().hover();
  41 |     const filters = await pattern.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  42 |     expect(filters.every(filter => filter === "none")).toBe(true);
  43 |     facts.push({ id: "pie-patterns", filters });
  44 |     await pattern.screenshot({ path: `${evidence}/${site.name}-pie-patterns-hover-${width}.png` });
  45 | 
  46 |     await page.goto(`${site.base}#chart-ring`);
  47 |     const ring = page.locator('[data-chart-variant="ring-default"]');
  48 |     await ring.scrollIntoViewIfNeeded();
  49 |     await expect(ring.locator(".rain-chart-center-reading")).toHaveText("70.0%阅读进度28 / 40 项");
  50 |     await ring.screenshot({ path: `${evidence}/${site.name}-ring-default-${width}.png` });
  51 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  52 |     await legend.scrollIntoViewIfNeeded();
  53 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  54 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度8 / 12 项");
  55 |     await legend.getByRole("button", { name: /^练习进度/ }).blur();
  56 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("70.0%阅读进度28 / 40 项");
  57 |     facts.push({ id: "ring-default", defaultReading: "70.0% / 阅读进度 / 28 of 40", hoverReading: "66.7% / 练习进度 / 8 of 12" });
  58 | 
  59 |     await page.goto(`${site.base}#chart-gauge`);
  60 |     const gauge = page.locator('[data-chart-variant="gauge-linear-label-below"]');
  61 |     await gauge.scrollIntoViewIfNeeded();
  62 |     await expect(gauge.getByRole("img", { name: "72", exact: true })).toBeVisible();
  63 |     await expect(gauge.locator("svg path")).toHaveCount(124);
  64 |     const notches = await gauge.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).opacity));
  65 |     expect(notches.every(opacity => opacity === "1")).toBe(true);
  66 |     const layout = await gauge.locator('[class*="@container/chart-center"]').evaluate(node => {
  67 |       const [value, label] = [...node.querySelectorAll(":scope > span")].map(span => span.getBoundingClientRect().toJSON());
  68 |       return { direction: getComputedStyle(node).flexDirection, value, label };
  69 |     });
  70 |     expect(layout.direction).toBe("row");
> 71 |     expect(layout.label!.left).toBeGreaterThan(layout.value!.right);
     |                                ^ Error: expect(received).toBeGreaterThan(expected)
  72 |     expect(layout.label!.top).toBeLessThan(layout.value!.bottom);
  73 |     facts.push({ id: "gauge-linear-label-below", notches, ...layout });
  74 |     await gauge.screenshot({ path: `${evidence}/${site.name}-gauge-linear-${width}.png` });
  75 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  76 |     await writeFile(`${evidence}/${site.name}-${width}-facts.json`, JSON.stringify(facts, null, 2));
  77 |   });
  78 | }
  79 | 
```