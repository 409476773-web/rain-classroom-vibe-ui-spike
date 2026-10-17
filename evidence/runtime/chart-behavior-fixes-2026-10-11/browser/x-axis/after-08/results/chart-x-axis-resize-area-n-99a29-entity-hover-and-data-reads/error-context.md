# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-x-axis-resize.spec.ts >> area no-preference: earliest resize frames retain axis identity, hover and data reads
- Location: tests/e2e/chart-x-axis-resize.spec.ts:98:3

# Error details

```
Error: page.evaluate: Execution context was destroyed, most likely because of a navigation
```

# Page snapshot

```yaml
- main [ref=f1e3]:
  - generic [ref=f1e4]:
    - link "返回组件目录" [ref=f1e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=f1e7]:
      - heading "面积图" [level=1] [ref=f1e8]
      - generic [ref=f1e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=f1e10]: 时间趋势、轻渐变面积与原生聚焦。
  - generic [ref=f1e11]:
    - heading "图型与可选配方" [level=2] [ref=f1e12]
    - paragraph [ref=f1e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=f1e14]:
      - generic [ref=f1e15]:
        - generic [ref=f1e16]:
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
        - button "参与人数 · 人" [ref=f1e31] [cursor=pointer]
        - group [ref=f1e34]:
          - generic "查看精确数据" [ref=f1e35] [cursor=pointer]
      - generic [ref=f1e36]:
        - generic [ref=f1e37]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=f1e38]:
            - option "清晰线与轻面积" [selected]
            - option "蓝紫近邻"
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
        - generic [ref=f1e39]:
          - text: 示例状态
          - combobox "示例状态" [ref=f1e40]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - generic [ref=f1e41]:
          - text: 系列数
          - combobox "系列数" [ref=f1e42]:
            - option "3" [selected]
            - option "5"
        - generic [ref=f1e43]:
          - text: 尺寸配方
          - combobox "尺寸配方" [ref=f1e44]:
            - option "标准" [selected]
            - option "迷你 / 嵌入"
        - button "更新数据" [ref=f1e45] [cursor=pointer]
        - button "重播动效" [ref=f1e47] [cursor=pointer]
      - status [ref=f1e49]: 示例数据 · 已更新 0 次
  - group [ref=f1e50]:
    - generic "调用配置、完整源码与示例数据" [ref=f1e51] [cursor=pointer]
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
  - region "全部图表变体" [ref=f1e52]:
    - navigation "变体分组" [ref=f1e53]:
      - button "基础结构" [ref=f1e54] [cursor=pointer]
      - button "图形材质" [ref=f1e56] [cursor=pointer]
      - button "坐标与辅助读数" [ref=f1e58] [cursor=pointer]
      - button "交互与状态" [ref=f1e60] [cursor=pointer]
    - region [ref=f1e62]:
      - heading "基础结构" [level=2] [ref=f1e63]
      - generic [ref=f1e64]:
        - region [ref=f1e65]:
          - generic [ref=f1e66]:
            - heading "Area Chart" [level=3] [ref=f1e67]
            - paragraph [ref=f1e68]: 默认平滑渐变面积
          - generic [ref=f1e69]:
            - generic [ref=f1e70]:
              - generic [ref=f1e71]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - group [ref=f1e84]:
                - generic "查看精确数据" [ref=f1e85] [cursor=pointer]
            - generic [ref=f1e86]:
              - button "更新数据" [ref=f1e87] [cursor=pointer]
              - button "重播动效" [ref=f1e89] [cursor=pointer]
              - status [ref=f1e91]: 示例数据 · 已更新 0 次
            - group [ref=f1e92]:
              - generic "查看本卡代码" [ref=f1e93] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e94] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e95]: 对应官网示例
            - generic [ref=f1e96]: （新标签页打开）
        - region [ref=f1e97]:
          - generic [ref=f1e98]:
            - heading "Area Chart - Step" [level=3] [ref=f1e99]
            - paragraph [ref=f1e100]: 阶梯插值表达离散变化
          - generic [ref=f1e101]:
            - generic [ref=f1e102]:
              - generic [ref=f1e103]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - group [ref=f1e116]:
                - generic "查看精确数据" [ref=f1e117] [cursor=pointer]
            - generic [ref=f1e118]:
              - button "更新数据" [ref=f1e119] [cursor=pointer]
              - button "重播动效" [ref=f1e121] [cursor=pointer]
              - status [ref=f1e123]: 示例数据 · 已更新 0 次
            - group [ref=f1e124]:
              - generic "查看本卡代码" [ref=f1e125] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e126] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e127]: 对应官网示例
            - generic [ref=f1e128]: （新标签页打开）
        - region [ref=f1e129]:
          - generic [ref=f1e130]:
            - heading "Area Chart - Stacked" [level=3] [ref=f1e131]
            - paragraph [ref=f1e132]: 多面积叠加对比；不推定累计求和
          - generic [ref=f1e133]:
            - paragraph [ref=f1e135]: 滚动到此处查看示例
            - generic [ref=f1e136]:
              - button "更新数据" [ref=f1e137] [cursor=pointer]
              - button "重播动效" [ref=f1e139] [cursor=pointer]
              - status [ref=f1e141]: 示例数据 · 已更新 0 次
            - group [ref=f1e142]:
              - generic "查看本卡代码" [ref=f1e143] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e144] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e145]: 对应官网示例
            - generic [ref=f1e146]: （新标签页打开）
    - region [ref=f1e147]:
      - heading "图形材质" [level=2] [ref=f1e148]
      - generic [ref=f1e149]:
        - region [ref=f1e150]:
          - generic [ref=f1e151]:
            - heading "Area Chart - Gradient" [level=3] [ref=f1e152]
            - paragraph [ref=f1e153]: 调整底部透明度的面积填充
          - generic [ref=f1e154]:
            - paragraph [ref=f1e155]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=f1e157]: 滚动到此处查看示例
            - generic [ref=f1e158]:
              - button "更新数据" [ref=f1e159] [cursor=pointer]
              - button "重播动效" [ref=f1e161] [cursor=pointer]
              - status [ref=f1e163]: 示例数据 · 已更新 0 次
            - group [ref=f1e164]:
              - generic "查看本卡代码" [ref=f1e165] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e166] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e167]: 对应官网示例
            - generic [ref=f1e168]: （新标签页打开）
        - region [ref=f1e169]:
          - generic [ref=f1e170]:
            - heading "Area Chart - No Stroke" [level=3] [ref=f1e171]
            - paragraph [ref=f1e172]: 隐藏面积轮廓线
          - generic [ref=f1e173]:
            - paragraph [ref=f1e175]: 滚动到此处查看示例
            - generic [ref=f1e176]:
              - button "更新数据" [ref=f1e177] [cursor=pointer]
              - button "重播动效" [ref=f1e179] [cursor=pointer]
              - status [ref=f1e181]: 示例数据 · 已更新 0 次
            - group [ref=f1e182]:
              - generic "查看本卡代码" [ref=f1e183] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e184] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e185]: 对应官网示例
            - generic [ref=f1e186]: （新标签页打开）
        - region [ref=f1e187]:
          - generic [ref=f1e188]:
            - heading "Area Chart - Fade Edges" [level=3] [ref=f1e189]
            - paragraph [ref=f1e190]: 左右边缘渐隐
          - generic [ref=f1e191]:
            - paragraph [ref=f1e193]: 滚动到此处查看示例
            - generic [ref=f1e194]:
              - button "更新数据" [ref=f1e195] [cursor=pointer]
              - button "重播动效" [ref=f1e197] [cursor=pointer]
              - status [ref=f1e199]: 示例数据 · 已更新 0 次
            - group [ref=f1e200]:
              - generic "查看本卡代码" [ref=f1e201] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e202] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e203]: 对应官网示例
            - generic [ref=f1e204]: （新标签页打开）
        - region [ref=f1e205]:
          - generic [ref=f1e206]:
            - heading "Area Chart - Pattern" [level=3] [ref=f1e207]
            - paragraph [ref=f1e208]: 斜线图案面积填充
          - generic [ref=f1e209]:
            - paragraph [ref=f1e211]: 滚动到此处查看示例
            - generic [ref=f1e212]:
              - button "更新数据" [ref=f1e213] [cursor=pointer]
              - button "重播动效" [ref=f1e215] [cursor=pointer]
              - status [ref=f1e217]: 示例数据 · 已更新 0 次
            - group [ref=f1e218]:
              - generic "查看本卡代码" [ref=f1e219] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e220] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e221]: 对应官网示例
            - generic [ref=f1e222]: （新标签页打开）
        - region [ref=f1e223]:
          - generic [ref=f1e224]:
            - heading "Area Chart - Series Markers" [level=3] [ref=f1e225]
            - paragraph [ref=f1e226]: 各数据点使用圆环标记
          - generic [ref=f1e227]:
            - paragraph [ref=f1e229]: 滚动到此处查看示例
            - generic [ref=f1e230]:
              - button "更新数据" [ref=f1e231] [cursor=pointer]
              - button "重播动效" [ref=f1e233] [cursor=pointer]
              - status [ref=f1e235]: 示例数据 · 已更新 0 次
            - group [ref=f1e236]:
              - generic "查看本卡代码" [ref=f1e237] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e238] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e239]: 对应官网示例
            - generic [ref=f1e240]: （新标签页打开）
        - region [ref=f1e241]:
          - generic [ref=f1e242]:
            - heading "Area Chart - Dashed Tail" [level=3] [ref=f1e243]
            - paragraph [ref=f1e244]: 未完整时段使用虚线尾段
          - generic [ref=f1e245]:
            - paragraph [ref=f1e247]: 滚动到此处查看示例
            - generic [ref=f1e248]:
              - button "更新数据" [ref=f1e249] [cursor=pointer]
              - button "重播动效" [ref=f1e251] [cursor=pointer]
              - status [ref=f1e253]: 示例数据 · 已更新 0 次
            - group [ref=f1e254]:
              - generic "查看本卡代码" [ref=f1e255] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e256] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e257]: 对应官网示例
            - generic [ref=f1e258]: （新标签页打开）
    - region [ref=f1e259]:
      - heading "坐标与辅助读数" [level=2] [ref=f1e260]
      - generic [ref=f1e261]:
        - region [ref=f1e262]:
          - generic [ref=f1e263]:
            - heading "Area Chart - Left Y axis" [level=3] [ref=f1e264]
            - paragraph [ref=f1e265]: 同量纲系列共用左纵轴
          - generic [ref=f1e266]:
            - paragraph [ref=f1e268]: 滚动到此处查看示例
            - generic [ref=f1e269]:
              - button "更新数据" [ref=f1e270] [cursor=pointer]
              - button "重播动效" [ref=f1e272] [cursor=pointer]
              - status [ref=f1e274]: 示例数据 · 已更新 0 次
            - group [ref=f1e275]:
              - generic "查看本卡代码" [ref=f1e276] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e277] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e278]: 对应官网示例
            - generic [ref=f1e279]: （新标签页打开）
        - region [ref=f1e280]:
          - generic [ref=f1e281]:
            - heading "Area Chart - Left and right Y axes" [level=3] [ref=f1e282]
            - paragraph [ref=f1e283]: 左右独立纵轴与量纲
          - generic [ref=f1e284]:
            - paragraph [ref=f1e286]: 滚动到此处查看示例
            - generic [ref=f1e287]:
              - button "更新数据" [ref=f1e288] [cursor=pointer]
              - button "重播动效" [ref=f1e290] [cursor=pointer]
              - status [ref=f1e292]: 示例数据 · 已更新 0 次
            - group [ref=f1e293]:
              - generic "查看本卡代码" [ref=f1e294] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e295] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e296]: 对应官网示例
            - generic [ref=f1e297]: （新标签页打开）
        - region [ref=f1e298]:
          - generic [ref=f1e299]:
            - heading "Area Chart - Pattern Background" [level=3] [ref=f1e300]
            - paragraph [ref=f1e301]: 图案背景替代网格
          - generic [ref=f1e302]:
            - paragraph [ref=f1e304]: 滚动到此处查看示例
            - generic [ref=f1e305]:
              - button "更新数据" [ref=f1e306] [cursor=pointer]
              - button "重播动效" [ref=f1e308] [cursor=pointer]
              - status [ref=f1e310]: 示例数据 · 已更新 0 次
            - group [ref=f1e311]:
              - generic "查看本卡代码" [ref=f1e312] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e313] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e314]: 对应官网示例
            - generic [ref=f1e315]: （新标签页打开）
        - region [ref=f1e316]:
          - generic [ref=f1e317]:
            - heading "Area Chart - Dot Grid Background" [level=3] [ref=f1e318]
            - paragraph [ref=f1e319]: 带边缘渐隐的点阵背景
          - generic [ref=f1e320]:
            - paragraph [ref=f1e322]: 滚动到此处查看示例
            - generic [ref=f1e323]:
              - button "更新数据" [ref=f1e324] [cursor=pointer]
              - button "重播动效" [ref=f1e326] [cursor=pointer]
              - status [ref=f1e328]: 示例数据 · 已更新 0 次
            - group [ref=f1e329]:
              - generic "查看本卡代码" [ref=f1e330] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e331] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e332]: 对应官网示例
            - generic [ref=f1e333]: （新标签页打开）
        - region [ref=f1e334]:
          - generic [ref=f1e335]:
            - heading "Area Chart - Reference Band" [level=3] [ref=f1e336]
            - paragraph [ref=f1e337]: 带边界标识的水平参考区间
          - generic [ref=f1e338]:
            - paragraph [ref=f1e340]: 滚动到此处查看示例
            - generic [ref=f1e341]:
              - button "更新数据" [ref=f1e342] [cursor=pointer]
              - button "重播动效" [ref=f1e344] [cursor=pointer]
              - status [ref=f1e346]: 示例数据 · 已更新 0 次
            - group [ref=f1e347]:
              - generic "查看本卡代码" [ref=f1e348] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e349] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e350]: 对应官网示例
            - generic [ref=f1e351]: （新标签页打开）
        - region [ref=f1e352]:
          - generic [ref=f1e353]:
            - heading "Area Chart - Pattern Reference Band" [level=3] [ref=f1e354]
            - paragraph [ref=f1e355]: 图案参考区间与相应轴标签
          - generic [ref=f1e356]:
            - paragraph [ref=f1e358]: 滚动到此处查看示例
            - generic [ref=f1e359]:
              - button "更新数据" [ref=f1e360] [cursor=pointer]
              - button "重播动效" [ref=f1e362] [cursor=pointer]
              - status [ref=f1e364]: 示例数据 · 已更新 0 次
            - group [ref=f1e365]:
              - generic "查看本卡代码" [ref=f1e366] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e367] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e368]: 对应官网示例
            - generic [ref=f1e369]: （新标签页打开）
    - region [ref=f1e370]:
      - heading "交互与状态" [level=2] [ref=f1e371]
      - generic [ref=f1e372]:
        - region [ref=f1e373]:
          - generic [ref=f1e374]:
            - heading "Area Chart - Interactive" [level=3] [ref=f1e375]
            - paragraph [ref=f1e376]: 双面积趋势、曲线选择与临时拖选
          - generic [ref=f1e377]:
            - paragraph [ref=f1e379]: 滚动到此处查看示例
            - generic [ref=f1e380]:
              - button "更新数据" [ref=f1e381] [cursor=pointer]
              - button "重播动效" [ref=f1e383] [cursor=pointer]
              - status [ref=f1e385]: 示例数据 · 已更新 0 次
            - group [ref=f1e386]:
              - generic "查看本卡代码" [ref=f1e387] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e388] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e389]: 对应官网示例
            - generic [ref=f1e390]: （新标签页打开）
        - region [ref=f1e391]:
          - generic [ref=f1e392]:
            - heading "Area Chart - Loading" [level=3] [ref=f1e393]
            - paragraph [ref=f1e394]: 网格与前景脉冲加载
          - generic [ref=f1e395]:
            - paragraph [ref=f1e397]: 滚动到此处查看示例
            - generic [ref=f1e398]:
              - button "更新数据" [ref=f1e399] [cursor=pointer]
              - button "重播动效" [ref=f1e401] [cursor=pointer]
              - status [ref=f1e403]: 示例数据 · 已更新 0 次
            - group [ref=f1e404]:
              - generic "查看本卡代码" [ref=f1e405] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e406] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e407]: 对应官网示例
            - generic [ref=f1e408]: （新标签页打开）
        - region [ref=f1e409]:
          - generic [ref=f1e410]:
            - heading "Area Chart - Loading (Sweep)" [level=3] [ref=f1e411]
            - paragraph [ref=f1e412]: 斜向扫光骨架加载
          - generic [ref=f1e413]:
            - paragraph [ref=f1e415]: 滚动到此处查看示例
            - generic [ref=f1e416]:
              - button "更新数据" [ref=f1e417] [cursor=pointer]
              - button "重播动效" [ref=f1e419] [cursor=pointer]
              - status [ref=f1e421]: 示例数据 · 已更新 0 次
            - group [ref=f1e422]:
              - generic "查看本卡代码" [ref=f1e423] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e424] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e425]: 对应官网示例
            - generic [ref=f1e426]: （新标签页打开）
        - region [ref=f1e427]:
          - generic [ref=f1e428]:
            - heading "Area Chart - Segment Selection" [level=3] [ref=f1e429]
            - paragraph [ref=f1e430]: 按下并拖动时高亮一段范围
          - generic [ref=f1e431]:
            - paragraph [ref=f1e433]: 滚动到此处查看示例
            - generic [ref=f1e434]:
              - button "更新数据" [ref=f1e435] [cursor=pointer]
              - button "重播动效" [ref=f1e437] [cursor=pointer]
              - status [ref=f1e439]: 示例数据 · 已更新 0 次
            - group [ref=f1e440]:
              - generic "查看本卡代码" [ref=f1e441] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=f1e442] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=f1e443]: 对应官网示例
            - generic [ref=f1e444]: （新标签页打开）
  - generic [ref=f1e445]:
    - heading "数据与使用边界" [level=2] [ref=f1e446]
    - paragraph [ref=f1e447]: 按日期排序；各系列同量纲。本例为人数，透明叠加而非堆叠。
    - paragraph [ref=f1e448]: 缺测不能默认补零；迷你图是尺寸配方。
    - paragraph [ref=f1e449]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=f1e450] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=f1e452]:
    - generic "接口与调用示例" [ref=f1e453] [cursor=pointer]
  - navigation "相关图型" [ref=f1e454]:
    - link "面积图" [ref=f1e455] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=f1e457] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=f1e459] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=f1e461] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=f1e463] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=f1e465] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=f1e467] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=f1e469] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=f1e471] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=f1e473] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=f1e475] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=f1e477] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=f1e479] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=f1e481] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=f1e483] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=f1e485] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=f1e487] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=f1e489] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=f1e491] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | import { mkdir, readFile, writeFile } from "node:fs/promises";
  3   | import { createHash } from "node:crypto";
  4   | import { createRequire } from "node:module";
  5   | import { resolve } from "node:path";
  6   | 
  7   | const run = "evidence/runtime/chart-behavior-fixes-2026-10-11";
  8   | const runName = process.env.RAIN_CHART_AXIS_RUN ?? "after-01";
  9   | const evidence = `${run}/browser/x-axis/${runName}`;
  10  | const baseline = process.env.RAIN_CHART_AXIS_BASELINE === "1";
  11  | const sourcePath = resolve("packages/ui/src/charts/vendor/charts/x-axis.tsx");
  12  | const beforeSource = await readFile(`${run}/before/packages/ui/src/charts/vendor/charts/x-axis.tsx`, "utf8");
  13  | const beforeHash = createHash("sha256").update(beforeSource).digest("hex");
  14  | const requireFromVite = createRequire(import.meta.resolve("vite"));
  15  | const { transformSync } = await import(requireFromVite.resolve("rolldown/utils"));
  16  | const compiledBefore = transformSync(sourcePath, beforeSource, { jsx: { runtime: "automatic", development: true } }).code;
  17  | const bodyStart = "const X_AXIS_POSITION_TWEEN_MS";
  18  | const beforeBody = compiledBefore.slice(compiledBefore.indexOf(bodyStart));
  19  | 
  20  | type Sample = {
  21  |   reason: string; elapsed: number; viewport: number; documentWidth: number;
  22  |   ticks: { id: number; label: string; left: number; right: number; center: number; position: string; transition: string; color: string; fontSize: string; inlineLeft: string; overlayWidth: number; containingWidth: number }[];
  23  |   overflowTicks: { label: string | null; host: string | null | undefined; example: string | undefined; right: number; inlineLeft: string; parentWidth: number; transition: string }[];
  24  |   overflowElements: { tag: string; class: string | null; host: string | null | undefined; right: number; width: number; attributeWidth: string | null; parentClass: string; parentWidth: number }[];
  25  | };
  26  | type FrameAudit = { samples: Sample[]; beforeIds: number[]; afterIds: number[]; firstEvent: string | null };
  27  | 
  28  | async function attachBefore(page: Page, intercepted: string[]) {
  29  |   if (!baseline) return;
  30  |   await page.route(url => decodeURIComponent(url.pathname) === `/@fs${sourcePath}` && !url.searchParams.has("raw"), async route => {
  31  |     const response = await route.fetch();
  32  |     const liveModule = await response.text();
  33  |     const index = liveModule.indexOf(bodyStart);
  34  |     expect(index).toBeGreaterThan(0);
  35  |     // Keep Vite's resolved dependency/development prelude, use the exact saved
  36  |     // baseline source for every function, JSX body and export in the module.
  37  |     intercepted.push(route.request().url());
  38  |     await route.fulfill({ response, body: liveModule.slice(0, index) + beforeBody, headers: { ...response.headers(), "content-type": "application/javascript" } });
  39  |   });
  40  | }
  41  | 
  42  | async function beginFrames(page: Page, selector: string, targetWidth: number | null, frames = 8, durationMs = 0) {
> 43  |   await page.evaluate(({ selector, targetWidth, frames, durationMs }) => {
      |              ^ Error: page.evaluate: Execution context was destroyed, most likely because of a navigation
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
```