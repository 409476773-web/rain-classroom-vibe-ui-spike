# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> shared documentation retains adjacent Button Group, Spinner and Chart paragraph roles
- Location: tests/e2e/g4-components.spec.ts:256:1

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: '更新数据', exact: true }) resolved to 19 elements:
    1) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button motion-reduce:transiti…>…</button> aka getByRole('button', { name: '更新数据' }).first()
    2) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka getByLabel('Line Chart - Linear').getByRole('button', { name: '更新数据' })
    3) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka getByLabel('Line Chart - Multiple Lines').getByRole('button', { name: '更新数据' })
    4) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka getByLabel('Line Chart - Series Markers').getByRole('button', { name: '更新数据' })
    5) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka getByLabel('Line Chart - Dashed Tail').getByRole('button', { name: '更新数据' })
    6) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka getByLabel('Line Chart - Markers').getByRole('button', { name: '更新数据' })
    7) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka locator('section:nth-child(4) > .rain-chart-variant-grid > section:nth-child(2) > .component-doc__preview > .rain-chart-variant__actions > button').first()
    8) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka locator('section:nth-child(3) > .component-doc__preview > .rain-chart-variant__actions > button').first()
    9) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka locator('section:nth-child(4) > .component-doc__preview > .rain-chart-variant__actions > button').first()
    10) <button type="button" data-slot="root" data-size="small" data-tone="default" data-variant="text" data-action="update" data-focus="control" data-state="default" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-button m…>…</button> aka locator('section:nth-child(5) > .component-doc__preview > .rain-chart-variant__actions > button').first()
    ...

Call log:
  - waiting for getByRole('button', { name: '更新数据', exact: true })

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "折线图" [active] [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 连续趋势与多系列比较，保留真实端点。
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
        - generic [ref=e32]:
          - button "参与人数 · 人" [ref=e34] [cursor=pointer]
          - button "完成人数 · 人" [ref=e38] [cursor=pointer]
          - button "复习人数 · 人" [ref=e42] [cursor=pointer]
        - group [ref=e45]:
          - generic "查看精确数据" [ref=e46] [cursor=pointer]
      - generic [ref=e47]:
        - generic [ref=e48]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e49]:
            - option "清晰线与轻面积"
            - option "蓝紫近邻" [selected]
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
        - generic [ref=e50]:
          - text: 示例状态
          - combobox "示例状态" [ref=e51]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - generic [ref=e52]:
          - text: 系列数
          - combobox "系列数" [ref=e53]:
            - option "3" [selected]
            - option "5"
        - generic [ref=e54]:
          - text: 尺寸配方
          - combobox "尺寸配方" [ref=e55]:
            - option "标准" [selected]
            - option "迷你 / 嵌入"
        - button "更新数据" [ref=e56] [cursor=pointer]
        - button "重播动效" [ref=e58] [cursor=pointer]
      - status [ref=e60]: 示例数据 · 已更新 0 次
  - group [ref=e61]:
    - generic "调用配置、完整源码与示例数据" [ref=e62] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-point-reading.tsx"
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
  - region "全部图表变体" [ref=e63]:
    - navigation "变体分组" [ref=e64]:
      - button "基础结构" [ref=e65] [cursor=pointer]
      - button "图形材质" [ref=e67] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e69] [cursor=pointer]
      - button "交互与状态" [ref=e71] [cursor=pointer]
    - region [ref=e73]:
      - heading "基础结构" [level=2] [ref=e74]
      - generic [ref=e75]:
        - region [ref=e76]:
          - generic [ref=e77]:
            - heading "Line Chart - Linear" [level=3] [ref=e78]
            - paragraph [ref=e79]: 数据点之间直线连接
          - generic [ref=e80]:
            - group [ref=e93]:
              - generic "查看精确数据" [ref=e94] [cursor=pointer]
            - generic [ref=e95]:
              - button "更新数据" [ref=e96] [cursor=pointer]
              - button "重播动效" [ref=e98] [cursor=pointer]
              - status [ref=e100]: 示例数据 · 已更新 0 次
            - group [ref=e101]:
              - generic "查看本卡代码" [ref=e102] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e103] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e104]: 对应官网示例
            - generic [ref=e105]: （新标签页打开）
        - region [ref=e106]:
          - generic [ref=e107]:
            - heading "Line Chart - Multiple Lines" [level=3] [ref=e108]
            - paragraph [ref=e109]: 多系列时间趋势对比
          - generic [ref=e110]:
            - paragraph [ref=e112]: 滚动到此处查看示例
            - generic [ref=e113]:
              - button "更新数据" [ref=e114] [cursor=pointer]
              - button "重播动效" [ref=e116] [cursor=pointer]
              - status [ref=e118]: 示例数据 · 已更新 0 次
            - group [ref=e119]:
              - generic "查看本卡代码" [ref=e120] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e121] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e122]: 对应官网示例
            - generic [ref=e123]: （新标签页打开）
    - region [ref=e124]:
      - heading "图形材质" [level=2] [ref=e125]
      - generic [ref=e126]:
        - region [ref=e127]:
          - generic [ref=e128]:
            - heading "Line Chart - Series Markers" [level=3] [ref=e129]
            - paragraph [ref=e130]: 各观测点圆环标记
          - generic [ref=e131]:
            - paragraph [ref=e133]: 滚动到此处查看示例
            - generic [ref=e134]:
              - button "更新数据" [ref=e135] [cursor=pointer]
              - button "重播动效" [ref=e137] [cursor=pointer]
              - status [ref=e139]: 示例数据 · 已更新 0 次
            - group [ref=e140]:
              - generic "查看本卡代码" [ref=e141] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e142] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e143]: 对应官网示例
            - generic [ref=e144]: （新标签页打开）
        - region [ref=e145]:
          - generic [ref=e146]:
            - heading "Line Chart - Dashed Tail" [level=3] [ref=e147]
            - paragraph [ref=e148]: 从指定索引开始绘制虚线尾段
          - generic [ref=e149]:
            - paragraph [ref=e151]: 滚动到此处查看示例
            - generic [ref=e152]:
              - button "更新数据" [ref=e153] [cursor=pointer]
              - button "重播动效" [ref=e155] [cursor=pointer]
              - status [ref=e157]: 示例数据 · 已更新 0 次
            - group [ref=e158]:
              - generic "查看本卡代码" [ref=e159] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e160] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e161]: 对应官网示例
            - generic [ref=e162]: （新标签页打开）
    - region [ref=e163]:
      - heading "坐标与辅助读数" [level=2] [ref=e164]
      - generic [ref=e165]:
        - region [ref=e166]:
          - generic [ref=e167]:
            - heading "Line Chart - Markers" [level=3] [ref=e168]
            - paragraph [ref=e169]: 标注关键事件
          - generic [ref=e170]:
            - paragraph [ref=e172]: 滚动到此处查看示例
            - generic [ref=e173]:
              - button "更新数据" [ref=e174] [cursor=pointer]
              - button "重播动效" [ref=e176] [cursor=pointer]
              - status [ref=e178]: 示例数据 · 已更新 0 次
            - group [ref=e179]:
              - generic "查看本卡代码" [ref=e180] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e181] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e182]: 对应官网示例
            - generic [ref=e183]: （新标签页打开）
        - region [ref=e184]:
          - generic [ref=e185]:
            - heading "Line Chart - X Axis" [level=3] [ref=e186]
            - paragraph [ref=e187]: 显示日期横轴
          - generic [ref=e188]:
            - paragraph [ref=e190]: 滚动到此处查看示例
            - generic [ref=e191]:
              - button "更新数据" [ref=e192] [cursor=pointer]
              - button "重播动效" [ref=e194] [cursor=pointer]
              - status [ref=e196]: 示例数据 · 已更新 0 次
            - group [ref=e197]:
              - generic "查看本卡代码" [ref=e198] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e199] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e200]: 对应官网示例
            - generic [ref=e201]: （新标签页打开）
        - region [ref=e202]:
          - generic [ref=e203]:
            - heading "Line Chart - X & Y Axis" [level=3] [ref=e204]
            - paragraph [ref=e205]: 横轴日期与水平参考网格
          - generic [ref=e206]:
            - paragraph [ref=e208]: 滚动到此处查看示例
            - generic [ref=e209]:
              - button "更新数据" [ref=e210] [cursor=pointer]
              - button "重播动效" [ref=e212] [cursor=pointer]
              - status [ref=e214]: 示例数据 · 已更新 0 次
            - group [ref=e215]:
              - generic "查看本卡代码" [ref=e216] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e217] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e218]: 对应官网示例
            - generic [ref=e219]: （新标签页打开）
        - region [ref=e220]:
          - generic [ref=e221]:
            - heading "Line Chart - Left Y axis" [level=3] [ref=e222]
            - paragraph [ref=e223]: 多个系列共用左纵轴
          - generic [ref=e224]:
            - paragraph [ref=e226]: 滚动到此处查看示例
            - generic [ref=e227]:
              - button "更新数据" [ref=e228] [cursor=pointer]
              - button "重播动效" [ref=e230] [cursor=pointer]
              - status [ref=e232]: 示例数据 · 已更新 0 次
            - group [ref=e233]:
              - generic "查看本卡代码" [ref=e234] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e235] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e236]: 对应官网示例
            - generic [ref=e237]: （新标签页打开）
        - region [ref=e238]:
          - generic [ref=e239]:
            - heading "Line Chart - Left and right Y axes" [level=3] [ref=e240]
            - paragraph [ref=e241]: 左右独立纵轴与量纲
          - generic [ref=e242]:
            - paragraph [ref=e244]: 滚动到此处查看示例
            - generic [ref=e245]:
              - button "更新数据" [ref=e246] [cursor=pointer]
              - button "重播动效" [ref=e248] [cursor=pointer]
              - status [ref=e250]: 示例数据 · 已更新 0 次
            - group [ref=e251]:
              - generic "查看本卡代码" [ref=e252] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e253] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e254]: 对应官网示例
            - generic [ref=e255]: （新标签页打开）
        - region [ref=e256]:
          - generic [ref=e257]:
            - heading "Line Chart - Pattern Background" [level=3] [ref=e258]
            - paragraph [ref=e259]: 图案背景替代网格
          - generic [ref=e260]:
            - paragraph [ref=e262]: 滚动到此处查看示例
            - generic [ref=e263]:
              - button "更新数据" [ref=e264] [cursor=pointer]
              - button "重播动效" [ref=e266] [cursor=pointer]
              - status [ref=e268]: 示例数据 · 已更新 0 次
            - group [ref=e269]:
              - generic "查看本卡代码" [ref=e270] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e271] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e272]: 对应官网示例
            - generic [ref=e273]: （新标签页打开）
        - region [ref=e274]:
          - generic [ref=e275]:
            - heading "Line Chart - Dot Grid Background" [level=3] [ref=e276]
            - paragraph [ref=e277]: 带边缘渐隐的点阵背景
          - generic [ref=e278]:
            - paragraph [ref=e280]: 滚动到此处查看示例
            - generic [ref=e281]:
              - button "更新数据" [ref=e282] [cursor=pointer]
              - button "重播动效" [ref=e284] [cursor=pointer]
              - status [ref=e286]: 示例数据 · 已更新 0 次
            - group [ref=e287]:
              - generic "查看本卡代码" [ref=e288] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e289] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e290]: 对应官网示例
            - generic [ref=e291]: （新标签页打开）
        - region [ref=e292]:
          - generic [ref=e293]:
            - heading "Line Chart - Reference Band" [level=3] [ref=e294]
            - paragraph [ref=e295]: 水平参考区间与边界标识
          - generic [ref=e296]:
            - paragraph [ref=e298]: 滚动到此处查看示例
            - generic [ref=e299]:
              - button "更新数据" [ref=e300] [cursor=pointer]
              - button "重播动效" [ref=e302] [cursor=pointer]
              - status [ref=e304]: 示例数据 · 已更新 0 次
            - group [ref=e305]:
              - generic "查看本卡代码" [ref=e306] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e307] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e308]: 对应官网示例
            - generic [ref=e309]: （新标签页打开）
        - region [ref=e310]:
          - generic [ref=e311]:
            - heading "Line Chart - Pattern Reference Band" [level=3] [ref=e312]
            - paragraph [ref=e313]: 图案参考区间与相应轴标签
          - generic [ref=e314]:
            - paragraph [ref=e316]: 滚动到此处查看示例
            - generic [ref=e317]:
              - button "更新数据" [ref=e318] [cursor=pointer]
              - button "重播动效" [ref=e320] [cursor=pointer]
              - status [ref=e322]: 示例数据 · 已更新 0 次
            - group [ref=e323]:
              - generic "查看本卡代码" [ref=e324] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e325] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e326]: 对应官网示例
            - generic [ref=e327]: （新标签页打开）
    - region [ref=e328]:
      - heading "交互与状态" [level=2] [ref=e329]
      - generic [ref=e330]:
        - region [ref=e331]:
          - generic [ref=e332]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e333]
            - paragraph [ref=e334]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e335]:
            - paragraph [ref=e337]: 滚动到此处查看示例
            - generic [ref=e338]:
              - button "更新数据" [ref=e339] [cursor=pointer]
              - button "重播动效" [ref=e341] [cursor=pointer]
              - status [ref=e343]: 示例数据 · 已更新 0 次
            - group [ref=e344]:
              - generic "查看本卡代码" [ref=e345] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e346] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e347]: 对应官网示例
            - generic [ref=e348]: （新标签页打开）
        - region [ref=e349]:
          - generic [ref=e350]:
            - heading "Line Chart - Projection" [level=3] [ref=e351]
            - paragraph [ref=e352]: 目标与自动预测曲线、终端标记
          - generic [ref=e353]:
            - paragraph [ref=e355]: 滚动到此处查看示例
            - generic [ref=e356]:
              - button "更新数据" [ref=e357] [cursor=pointer]
              - button "重播动效" [ref=e359] [cursor=pointer]
              - status [ref=e361]: 示例数据 · 已更新 0 次
            - group [ref=e362]:
              - generic "查看本卡代码" [ref=e363] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e364] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e365]: 对应官网示例
            - generic [ref=e366]: （新标签页打开）
        - region [ref=e367]:
          - generic [ref=e368]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e369]
            - paragraph [ref=e370]: 按下并拖动时高亮一段范围
          - generic [ref=e371]:
            - paragraph [ref=e373]: 滚动到此处查看示例
            - generic [ref=e374]:
              - button "更新数据" [ref=e375] [cursor=pointer]
              - button "重播动效" [ref=e377] [cursor=pointer]
              - status [ref=e379]: 示例数据 · 已更新 0 次
            - group [ref=e380]:
              - generic "查看本卡代码" [ref=e381] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e382] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e383]: 对应官网示例
            - generic [ref=e384]: （新标签页打开）
        - region [ref=e385]:
          - generic [ref=e386]:
            - heading "Line Chart - Loading" [level=3] [ref=e387]
            - paragraph [ref=e388]: 网格与前景脉冲加载
          - generic [ref=e389]:
            - paragraph [ref=e391]: 滚动到此处查看示例
            - generic [ref=e392]:
              - button "更新数据" [ref=e393] [cursor=pointer]
              - button "重播动效" [ref=e395] [cursor=pointer]
              - status [ref=e397]: 示例数据 · 已更新 0 次
            - group [ref=e398]:
              - generic "查看本卡代码" [ref=e399] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e400] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e401]: 对应官网示例
            - generic [ref=e402]: （新标签页打开）
        - region [ref=e403]:
          - generic [ref=e404]:
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e405]
            - paragraph [ref=e406]: 斜向扫光折线骨架
          - generic [ref=e407]:
            - paragraph [ref=e409]: 滚动到此处查看示例
            - generic [ref=e410]:
              - button "更新数据" [ref=e411] [cursor=pointer]
              - button "重播动效" [ref=e413] [cursor=pointer]
              - status [ref=e415]: 示例数据 · 已更新 0 次
            - group [ref=e416]:
              - generic "查看本卡代码" [ref=e417] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-point-reading.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e418] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e419]: 对应官网示例
            - generic [ref=e420]: （新标签页打开）
  - generic [ref=e421]:
    - heading "数据与使用边界" [level=2] [ref=e422]
    - paragraph [ref=e423]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e424]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e425]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e426] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e428]:
    - generic "接口与调用示例" [ref=e429] [cursor=pointer]
  - navigation "相关图型" [ref=e430]:
    - link "面积图" [ref=e431] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e433] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e435] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e437] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e439] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e441] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e443] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e445] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e447] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e449] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e451] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e453] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e455] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e457] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e459] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e461] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e463] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e465] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e467] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  175 |   expect(readFileSync(savedPath, "utf8")).toBe(`# 课程导读：从问题到证据\n\n${paragraphs.join("\n\n")}\n`);
  176 |   await expect(page).toHaveURL(/#item$/);
  177 | });
  178 | 
  179 | test("Progress keeps actual quantities and external pause/error states", async ({ page }, info) => {
  180 |   await page.goto("/#progress");
  181 |   const task = page.getByRole("region", { name: "资料同步任务", exact: true });
  182 |   const controls = page.getByRole("group", { name: "演示控制", exact: true });
  183 |   const bar = task.getByRole("progressbar", { name: "资料同步", exact: true });
  184 |   expect((await task.boundingBox())!.width).toBeLessThanOrEqual(561);
  185 |   await expect(task.getByRole("button")).toHaveCount(1);
  186 |   await expect(task.getByRole("button", { name: "暂停同步", exact: true })).toBeVisible();
  187 |   await expect(bar).toHaveAttribute("aria-valuenow", "40");
  188 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  189 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  190 |   await task.getByRole("button", { name: "暂停同步", exact: true }).click();
  191 |   await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  192 |   await expect(task.getByRole("status")).toContainText("同步已暂停");
  193 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  194 |   await task.getByRole("button", { name: "继续同步", exact: true }).click();
  195 |   await controls.getByRole("button", { name: "模拟失败", exact: true }).click();
  196 |   await expect(task.getByRole("status")).toContainText("同步中断，请重试");
  197 |   await expect(task.getByRole("status")).toContainText("已完成 60 份");
  198 |   await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  199 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  200 |   await task.screenshot({ path: `${evidence}/progress-${info.project.name}-error.png` });
  201 |   await task.getByRole("button", { name: "重试同步", exact: true }).click();
  202 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  203 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  204 |   await expect(bar).toHaveAttribute("aria-valuenow", "100");
  205 |   await expect(bar).toHaveAttribute("data-state", "complete");
  206 |   await expect(task.getByRole("status")).toContainText("全部资料已同步");
  207 |   await expect(task.getByRole("button")).toHaveCount(0);
  208 |   await expect(task.getByRole("link", { name: "查看课程资料", exact: true })).toHaveAttribute("href", "#item");
  209 |   await task.screenshot({ path: `${evidence}/progress-${info.project.name}-complete.png` });
  210 |   await controls.getByRole("button", { name: "重新开始", exact: true }).click();
  211 |   await expect(bar).toHaveAttribute("aria-valuenow", "0");
  212 |   const unknown = page.getByRole("progressbar", { name: "正在解析资料", exact: true });
  213 |   await expect(unknown).not.toHaveAttribute("aria-valuenow");
  214 |   await expect(unknown).toHaveAttribute("data-state", "indeterminate");
  215 |   await expect(unknown.locator('[data-slot="progress-value"]')).toHaveCount(0);
  216 |   await expect(unknown.locator('[data-slot="progress-track"]')).toBeHidden();
  217 |   await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toBeVisible();
  218 |   await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toHaveAttribute("aria-hidden", "true");
  219 |   expect(await unknown.textContent()).not.toMatch(/\d+%/);
  220 |   await expect(page.getByRole("region", { name: "资料解析任务", exact: true })).toContainText("正在识别资料目录");
  221 |   const quantity = page.getByRole("progressbar", { name: "批改任务", exact: true });
  222 |   await expect(quantity).toHaveAttribute("aria-valuenow", "6");
  223 |   await expect(quantity).toHaveAttribute("aria-valuemax", "24");
  224 |   await expect(quantity.locator('[data-slot="progress-value"]')).toHaveText("25%");
  225 |   const facts = await quantity.evaluate(root => {
  226 |     const track = root.querySelector('[data-slot="progress-track"]')!;
  227 |     const indicator = root.querySelector('[data-slot="progress-indicator"]')!;
  228 |     return { trackWidth: track.getBoundingClientRect().width, indicatorWidth: indicator.getBoundingClientRect().width, trackHeight: track.getBoundingClientRect().height };
  229 |   });
  230 |   expect(facts.indicatorWidth / facts.trackWidth).toBeCloseTo(0.25, 2);
  231 |   expect(facts.trackHeight).toBe(8);
  232 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  233 |   expect(await quantity.locator('[data-slot="progress-track"]').evaluate(node => node.getBoundingClientRect().height)).toBe(6);
  234 |   writeFileSync(`${evidence}/progress-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  235 | });
  236 | 
  237 | test("reduced motion and forced colors retain progress and native-link meaning", async ({ page }, info) => {
  238 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  239 |   await page.goto("/#progress");
  240 |   const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  241 |   const indicator = bar.locator('[data-slot="progress-indicator"]');
  242 |   expect(await indicator.evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  243 |   const paint = await indicator.evaluate(node => getComputedStyle(node).backgroundColor);
  244 |   const trackPaint = await bar.locator('[data-slot="progress-track"]').evaluate(node => getComputedStyle(node).backgroundColor);
  245 |   expect(paint).not.toBe(trackPaint);
  246 |   await page.screenshot({ path: `${evidence}/progress-${info.project.name}-forced-colors.png`, fullPage: true });
  247 |   await page.goto("/#item");
  248 |   const link = page.getByRole("link", { name: /文字排版规范/ });
  249 |   await link.focus();
  250 |   const colors = await link.evaluate(root => ({ root: getComputedStyle(root).color, title: getComputedStyle(root.querySelector('[data-slot="title"]')!).color, outline: getComputedStyle(root).outlineStyle }));
  251 |   expect(colors.title).toBe(colors.root);
  252 |   expect(colors.outline).toBe("solid");
  253 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-forced-colors.png`, fullPage: true });
  254 | });
  255 | 
  256 | test("shared documentation retains adjacent Button Group, Spinner and Chart paragraph roles", async ({ page }, info) => {
  257 |   const facts = [];
  258 |   for (const [id, selector, size, line] of [
  259 |     ["button-group", '[role="status"][aria-label="尺寸对照反馈"]', "13px", "20px"],
  260 |     ["spinner", ".component-doc__loading-result > p", "13px", "20px"],
  261 |     ["chart-line", ".rain-chart-note", "12px", "20px"],
  262 |   ]) {
  263 |     await page.goto(`/#${id}`);
  264 |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  265 |     const description = page.locator(".component-doc__example > p").first();
  266 |     await expect(description).toHaveCSS("line-height", "20px");
  267 |     await expect(page.locator(".component-doc__header > p")).toHaveCSS("line-height", "24px");
  268 |     if (id === "button-group") {
  269 |       await page.getByRole("group", { name: "mini 横向按钮组", exact: true }).getByRole("button", { name: "撤销", exact: true }).click();
  270 |       await expect(page.locator(selector)).toContainText("已撤销");
  271 |     } else if (id === "spinner") {
  272 |       await page.getByRole("button", { name: "完成加载", exact: true }).click();
  273 |       await expect(page.locator(selector)).toContainText("已载入 18 份资料");
  274 |     } else {
> 275 |       await page.getByRole("button", { name: "更新数据", exact: true }).click();
      |                                                                     ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: '更新数据', exact: true }) resolved to 19 elements:
  276 |       await expect(page.locator(selector)).toContainText("已更新 1 次");
  277 |     }
  278 |     await expect(page.locator(selector)).toHaveCSS("font-size", size);
  279 |     await expect(page.locator(selector)).toHaveCSS("line-height", line);
  280 |     facts.push({ id, selector, size, line, text: await page.locator(selector).textContent() });
  281 |   }
  282 |   writeFileSync(`${evidence}/adjacent-docs-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  283 | });
  284 | 
```