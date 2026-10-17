# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tabs.spec.ts >> all 36 public recipes share exact heights, typography, count weight, paints and panel-facing indicators
- Location: tests/e2e/tabs.spec.ts:280:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-public-case="soft-38-end"]').getByRole('tab', { name: '学生', exact: true })
    - locator resolved to <button role="tab" type="button" tabindex="-1" aria-label="学生" data-slot="tab" data-part="tab" data-focus="item" data-position="end" id="base-ui-_r_1rk_" aria-disabled="false" aria-selected="false" data-selected="false" data-disabled="false" data-item-align="center" data-trigger-disabled="" aria-describedby="_r_1ri_" data-orientation="vertical" data-indicator-size="content" aria-controls="base-ui-_r_1s6_" data-activation-direction="none" class="rain-tabs__tab group/tabs h-rain-tabs-38">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - link "返回组件总览" [ref=e6] [cursor=pointer]:
        - /url: "#components"
      - heading "Tabs 分区切换" [level=1] [ref=e8]
      - paragraph [ref=e9]: 在同一页面里切换内容。默认使用完整导航与面板，首次打开后保留本页草稿。
      - generic [ref=e10]:
        - button "浅色主题" [ref=e11] [cursor=pointer]
        - button "深色主题" [ref=e13] [cursor=pointer]
    - region [ref=e15]:
      - heading "课程分区" [level=2] [ref=e16]
      - paragraph [ref=e17]: 数量 0 会保留；没有数量时不占位。导出是独立操作，窄屏下移到单独一行。
      - generic [ref=e18]:
        - generic "分区导航" [ref=e19]:
          - generic [ref=e20]:
            - tablist "课程内容" [ref=e23]:
              - tab "课程概览" [selected] [ref=e24] [cursor=pointer]
              - tab "待评作业" [ref=e27] [cursor=pointer]:
                - generic [ref=e28]:
                  - generic [ref=e29]: 待评作业
                  - generic [ref=e30]: (0)
                - generic [ref=e31]: 数量 0
              - tab "课程资料" [ref=e32] [cursor=pointer]
              - tab "学生" [ref=e37] [cursor=pointer]:
                - generic [ref=e38]:
                  - generic [ref=e41]: 学生
                  - generic [ref=e42]: (128)
                - generic [ref=e43]: 数量 128
            - button "导出" [ref=e45] [cursor=pointer]
        - tabpanel "课程概览" [ref=e48]:
          - generic [ref=e49]:
            - paragraph [ref=e50]: 课程概览的模拟课程内容。切换分区后，已输入的草稿会留在本页。
            - textbox "课程概览备注" [ref=e52]:
              - /placeholder: 填写一条备注
            - generic [ref=e54]:
              - button "保存备注" [ref=e55] [cursor=pointer]
              - status
    - region [ref=e57]:
      - heading "选择一套完整外观" [level=2] [ref=e58]
      - generic [ref=e59]:
        - generic [ref=e60]:
          - combobox "示例外观" [ref=e62] [cursor=pointer]:
            - generic "线条" [ref=e64]
          - generic [ref=e68]: 已选：线条
        - textbox [ref=e69]: line
        - generic [ref=e70]:
          - combobox "示例尺寸" [ref=e72] [cursor=pointer]:
            - generic "常规 · 38" [ref=e74]
          - generic [ref=e78]: 已选：常规 · 38
        - textbox [ref=e79]: "38"
        - generic [ref=e80]:
          - combobox "示例位置" [ref=e82] [cursor=pointer]:
            - generic "顶部" [ref=e84]
          - generic [ref=e88]: 已选：顶部
        - textbox [ref=e89]: top
        - generic [ref=e90]:
          - combobox "蓝线长度" [ref=e92] [cursor=pointer]:
            - generic "限制最大长度（默认）" [ref=e94]
          - generic [ref=e98]: 已选：限制最大长度（默认）
        - textbox [ref=e99]: content
        - generic [ref=e100]:
          - combobox "横向宽度" [ref=e102] [cursor=pointer]:
            - generic "按内容宽度" [ref=e104]
          - generic [ref=e108]: 已选：按内容宽度
        - textbox [ref=e109]: natural
      - generic [ref=e110]:
        - generic "分区导航" [ref=e111]:
          - tablist "外观示例" [ref=e115]:
            - tab "课程概览" [selected] [ref=e116] [cursor=pointer]
            - tab "待评作业" [ref=e119] [cursor=pointer]:
              - generic [ref=e120]:
                - generic [ref=e121]: 待评作业
                - generic [ref=e122]: (0)
              - generic [ref=e123]: 数量 0
            - tab "课程资料" [ref=e124] [cursor=pointer]
            - tab "学生" [ref=e129] [cursor=pointer]:
              - generic [ref=e130]:
                - generic [ref=e133]: 学生
                - generic [ref=e134]: (128)
              - generic [ref=e135]: 数量 128
        - tabpanel "课程概览" [ref=e137]:
          - generic [ref=e138]:
            - paragraph [ref=e139]: 课程概览的模拟课程内容。切换分区后，已输入的草稿会留在本页。
            - textbox "课程概览备注" [ref=e141]:
              - /placeholder: 填写一条备注
            - generic [ref=e143]:
              - button "保存备注" [ref=e144] [cursor=pointer]
              - status
    - generic [ref=e146]:
      - generic [ref=e147]:
        - heading "底板局部分区" [level=2] [ref=e148]
        - generic [ref=e149]:
          - generic "分区导航" [ref=e150]:
            - tablist "底板编辑" [ref=e154]:
              - tab "课程概览" [selected] [ref=e155] [cursor=pointer]
              - tab "待评作业" [ref=e158] [cursor=pointer]:
                - generic [ref=e159]:
                  - generic [ref=e160]: 待评作业
                  - generic [ref=e161]: (0)
                - generic [ref=e162]: 数量 0
          - tabpanel "课程概览" [ref=e164]:
            - generic [ref=e165]:
              - paragraph [ref=e166]: 课程概览的模拟课程内容。切换分区后，已输入的草稿会留在本页。
              - textbox "课程概览备注" [ref=e168]:
                - /placeholder: 填写一条备注
              - generic [ref=e170]:
                - button "保存备注" [ref=e171] [cursor=pointer]
                - status
      - generic [ref=e173]:
        - heading "浅底局部分区" [level=2] [ref=e174]
        - generic [ref=e175]:
          - generic "分区导航" [ref=e176]:
            - tablist "浅底编辑" [ref=e180]:
              - tab "课程概览" [selected] [ref=e181] [cursor=pointer]
              - tab "待评作业" [ref=e184] [cursor=pointer]:
                - generic [ref=e185]:
                  - generic [ref=e186]: 待评作业
                  - generic [ref=e187]: (0)
                - generic [ref=e188]: 数量 0
          - tabpanel "课程概览" [ref=e190]:
            - generic [ref=e191]:
              - paragraph [ref=e192]: 课程概览的模拟课程内容。切换分区后，已输入的草稿会留在本页。
              - textbox "课程概览备注" [ref=e194]:
                - /placeholder: 填写一条备注
              - generic [ref=e196]:
                - button "保存备注" [ref=e197] [cursor=pointer]
                - status
    - generic [ref=e199]:
      - heading "纵向设置与长名称" [level=2] [ref=e200]
      - paragraph [ref=e201]: 同组采用双行高度、名称左对齐；空间不足时移到顶部。名称或数量省略时，悬停或键盘聚焦可查看全文。
      - generic [ref=e202]:
        - generic "分区导航" [ref=e203]:
          - tablist "课程设置" [ref=e207]:
            - tab "基本信息" [selected] [ref=e208] [cursor=pointer]
            - tab "学生与教学班" [ref=e212] [cursor=pointer]:
              - generic [ref=e213]:
                - generic [ref=e216]: 学生与教学班
                - generic [ref=e217]: (128)
              - generic [ref=e218]: 数量 128
            - tab "课程资源与在线教学设置" [ref=e219] [cursor=pointer]
            - tab "通知偏好" [ref=e224] [cursor=pointer]
            - tab "评分方式" [ref=e228] [cursor=pointer]
            - tab "课堂互动" [ref=e232] [cursor=pointer]
            - tab "归档设置" [ref=e236] [cursor=pointer]
            - tab "课程权限" [ref=e240] [cursor=pointer]
        - tabpanel "基本信息" [ref=e245]:
          - generic [ref=e246]:
            - paragraph [ref=e247]: 基本信息的模拟课程内容。切换分区后，已输入的草稿会留在本页。
            - textbox "基本信息备注" [ref=e249]:
              - /placeholder: 填写一条备注
            - generic [ref=e251]:
              - button "保存备注" [ref=e252] [cursor=pointer]
              - status
    - generic [ref=e254]:
      - heading "使用合同" [level=2] [ref=e255]
      - paragraph [ref=e256]: 用于内容分区。独立页面导航使用链接；新建、关闭、拖动工作区标签暂不提供。默认手动键盘模式：方向键移动焦点，Enter 或 Space 切换内容；点击直接切换。automatic 可用于即时、轻量内容。
      - table [ref=e257]:
        - rowgroup [ref=e258]:
          - row [ref=e259]:
            - columnheader "选项" [ref=e260]
            - columnheader "默认与范围" [ref=e261]
        - rowgroup [ref=e262]:
          - row [ref=e263]:
            - cell "items / value" [ref=e264]
            - cell "唯一的 string 或 number 身份；1 与字符串“1”不同。null 表示不选中。受控模式只响应宿主接受的值。" [ref=e265]
          - row [ref=e266]:
            - cell "appearance / size" [ref=e267]
            - cell "line / contained / soft；28 / 32 / 38。未指定尺寸时，compact 使用 32，default 使用 38。" [ref=e268]
          - row [ref=e269]:
            - cell "position / overflow" [ref=e270]
            - cell "top 默认，另有 bottom / start / end。横向默认 More，scroll 可选；纵向为 scroll。" [ref=e271]
          - row [ref=e272]:
            - cell "align / itemAlign" [ref=e273]
            - cell "横向 start 或 center；纵向项内 left / center / right，默认 center。" [ref=e274]
          - row [ref=e275]:
            - cell "labelLines / widthMode" [ref=e276]
            - cell "纵向默认单行，可选整组双行并左对齐，高度 46 / 52 / 60。横向默认 natural；equal 等分可用宽度，空间不足时沿用 More 或滚动。" [ref=e277]
          - row [ref=e278]:
            - cell "collapseBelow" [ref=e279]
            - cell "纵向场景显式指定可用宽度阈值，低于阈值转为顶部横向；本页示例使用 560px，选择与草稿继续保留。" [ref=e280]
          - row [ref=e281]:
            - cell "indicatorSize / showDivider" [ref=e282]
            - cell "Line 独有，默认 content：蓝线在内容范围内居中，最大长度随 28／32／38 尺寸设为 24／28／32px。stretch 保留自适应方式；等分排列时随项宽伸展。纵向限长居中；分隔线默认关闭。" [ref=e283]
          - row [ref=e284]:
            - cell "panelMount" [ref=e285]
            - cell "lazy-retain 默认；eager-retain 提前挂载；unmount 离开销毁。项目可单独覆盖。" [ref=e286]
          - row [ref=e287]:
            - cell "count" [ref=e288]
            - cell "0 与数字字符串显示括号；null、undefined、空字符串隐藏。自定义缩写需要 countAccessibleLabel。" [ref=e289]
          - row [ref=e290]:
            - cell "disabled / disabledReason" [ref=e291]
            - cell "禁用项跳过键盘；完整名称和可选原因可从“分区说明”读取。受控回显可保留已选禁用项。" [ref=e292]
      - paragraph [ref=e293]: 默认直接使用完整 Tabs。明确需要改变布局时，使用同一个 Tabs.Root 下的一组 Tabs.Nav 与 Tabs.Panels；这三个部分同步出现，Suspense 放在 item.content 内。Root 内外与嵌套实例各自独立。
      - code [ref=e295]: "<Tabs aria-label=\"课程内容\" items={items} /> <Tabs aria-label=\"自适应蓝线\" items={items} indicatorSize=\"stretch\" /> <Tabs.Root aria-label=\"课程内容\" items={items}> <Tabs.Nav extraEnd={<Button>导出</Button>} /> <Tabs.Panels /> </Tabs.Root>"
      - paragraph [ref=e296]: Parts：root、nav、list、tab、icon、label、count、indicator、extra-start、extra-end、more、panel。先选 Existing Variant，再为明确差异声明 Local Recipe；结构变化使用 Local Fork。各 Part 保留 data-slot 与追踪属性。
      - paragraph [ref=e297]: 浅底外观取消选中态的常驻描边，以填充、文字颜色和字重表示当前项；键盘焦点框独立保留。普通 Label/Count 仍仅在已登记的 Background/Neutral/1 底面上获得限定用途裁决，不构成通用对比度豁免。
      - paragraph [ref=e298]: 保留 DOM 不等于持久化、缓存数据或暂停媒体。离开页面、删除身份或主动销毁会失去本页状态；网络请求、媒体和隐藏时副作用由内容宿主处理。
      - paragraph [ref=e299]: 当前为工作区 registry-candidate，managed 修改级别；运行视觉 Human Gate、真实屏幕阅读器、跨浏览器检查与发布仍分别记录。来源：Rain Classic Tabs、shadcn/ui、Ant Design、Material UI；行为采用当前 Base UI 1.8.0，视觉来自 Rain Token。
    - group [ref=e300]:
      - generic "交互与状态检查" [ref=e301]
      - paragraph [ref=e302]: 以下为模拟数据和完整配方检查区。
      - generic [ref=e303]:
        - heading "公共组件连续区间" [level=2] [ref=e304]
        - button "加宽导航" [ref=e305] [cursor=pointer]
        - button "收窄导航" [ref=e307] [cursor=pointer]
        - button "极窄导航" [ref=e309] [cursor=pointer]
        - button "仅保留概览" [ref=e311] [cursor=pointer]
        - button "保留前三分区" [ref=e313] [cursor=pointer]
        - button "恢复全部分区" [ref=e315] [cursor=pointer]
        - button "动态删除末项" [ref=e317] [cursor=pointer]
        - generic [ref=e320]:
          - generic "分区导航" [ref=e321]:
            - generic [ref=e324]:
              - tablist "课程分区" [ref=e325]:
                - tab "概览" [selected] [ref=e326] [cursor=pointer]
                - tab "已归档的历史课程和完整资料" [disabled] [ref=e331]
              - button "更多分区" [ref=e336] [cursor=pointer]:
                - generic [ref=e337]: 更多
            - group [ref=e341]:
              - generic "分区说明" [ref=e342]
          - tabpanel "概览" [ref=e344]:
            - textbox "概览草稿" [ref=e346]
      - generic [ref=e348]:
        - heading "隐藏期间的内容更新" [level=2] [ref=e349]
        - button "隐藏示例" [ref=e350] [cursor=pointer]
        - button "更新名称与数量" [ref=e352] [cursor=pointer]
        - generic [ref=e355]:
          - generic "分区导航" [ref=e356]:
            - generic [ref=e359]:
              - tablist "动态内容" [ref=e360]:
                - tab "完整课堂记录与课后练习资料" [selected] [ref=e361] [cursor=pointer]
                - tab "资源" [ref=e366] [cursor=pointer]
              - button "更多分区" [ref=e371] [cursor=pointer]:
                - generic [ref=e372]: 更多
            - group [ref=e376]:
              - generic "分区说明" [ref=e377]
          - tabpanel "完整课堂记录与课后练习资料" [ref=e379]:
            - textbox "动态草稿" [ref=e381]
      - generic [ref=e383]:
        - heading "独立的嵌套分区" [level=2] [ref=e384]
        - generic [ref=e385]:
          - generic "分区导航" [ref=e386]:
            - tablist "外层分区" [ref=e390]:
              - tab "外层一" [selected] [ref=e391] [cursor=pointer]
              - tab "外层二" [ref=e394] [cursor=pointer]
          - tabpanel "外层一" [ref=e398]:
            - generic [ref=e399]:
              - generic "分区导航" [ref=e400]:
                - tablist "内层分区" [ref=e404]:
                  - tab "内层一" [selected] [ref=e405] [cursor=pointer]
                  - tab "内层二" [ref=e408] [cursor=pointer]
              - tabpanel "内层一" [ref=e412]:
                - textbox "内层草稿" [ref=e414]
      - generic [ref=e416]:
        - heading "独立操作与内容指示线" [level=2] [ref=e417]
        - generic [ref=e418]:
          - generic "分区导航" [ref=e419]:
            - generic [ref=e420]:
              - button "前置操作" [ref=e422] [cursor=pointer]
              - tablist "top附加操作" [ref=e426]:
                - tab "概览" [selected] [ref=e427] [cursor=pointer]:
                  - generic [ref=e428]:
                    - generic [ref=e431]: 概览
                    - generic [ref=e432]: (0)
                  - generic [ref=e433]: 数量 0
                - tab "设置" [ref=e434] [cursor=pointer]
                - tab "课" [ref=e437] [cursor=pointer]:
                  - generic [ref=e438]:
                    - generic [ref=e439]: 课
                    - generic [ref=e440]: (123456789012)
                  - generic [ref=e441]: 数量 123456789012
              - button "后置操作" [ref=e443] [cursor=pointer]
          - tabpanel "概览" [ref=e446]:
            - paragraph [ref=e447]: 组合内容
      - generic [ref=e448]:
        - heading "独立操作与内容指示线" [level=2] [ref=e449]
        - generic [ref=e450]:
          - generic "分区导航" [ref=e451]:
            - generic [ref=e452]:
              - button "前置操作" [ref=e454] [cursor=pointer]
              - tablist "bottom附加操作" [ref=e458]:
                - tab "概览" [selected] [ref=e459] [cursor=pointer]:
                  - generic [ref=e460]:
                    - generic [ref=e463]: 概览
                    - generic [ref=e464]: (0)
                  - generic [ref=e465]: 数量 0
                - tab "设置" [ref=e466] [cursor=pointer]
                - tab "课" [ref=e469] [cursor=pointer]:
                  - generic [ref=e470]:
                    - generic [ref=e471]: 课
                    - generic [ref=e472]: (123456789012)
                  - generic [ref=e473]: 数量 123456789012
              - button "后置操作" [ref=e475] [cursor=pointer]
          - tabpanel "概览" [ref=e478]:
            - paragraph [ref=e479]: 组合内容
      - generic [ref=e481]:
        - generic "分区导航" [ref=e482]:
          - tablist "left纵向对齐" [ref=e486]:
            - tab "概览" [selected] [ref=e487] [cursor=pointer]:
              - generic [ref=e488]:
                - generic [ref=e491]: 概览
                - generic [ref=e492]: (0)
              - generic [ref=e493]: 数量 0
            - tab "设置" [ref=e494] [cursor=pointer]
            - tab "课" [ref=e498] [cursor=pointer]:
              - generic [ref=e499]:
                - generic [ref=e501]: 课
                - generic [ref=e502]: (123456789012)
              - generic [ref=e503]: 数量 123456789012
        - tabpanel "概览" [ref=e505]:
          - paragraph [ref=e506]: 组合内容
      - generic [ref=e508]:
        - generic "分区导航" [ref=e509]:
          - tablist "center纵向对齐" [ref=e513]:
            - tab "概览" [selected] [ref=e514] [cursor=pointer]:
              - generic [ref=e515]:
                - generic [ref=e518]: 概览
                - generic [ref=e519]: (0)
              - generic [ref=e520]: 数量 0
            - tab "设置" [ref=e521] [cursor=pointer]
            - tab "课" [ref=e524] [cursor=pointer]:
              - generic [ref=e525]:
                - generic [ref=e526]: 课
                - generic [ref=e527]: (123456789012)
              - generic [ref=e528]: 数量 123456789012
        - tabpanel "概览" [ref=e530]:
          - paragraph [ref=e531]: 组合内容
      - generic [ref=e533]:
        - generic "分区导航" [ref=e534]:
          - tablist "right纵向对齐" [ref=e538]:
            - tab "概览" [selected] [ref=e539] [cursor=pointer]:
              - generic [ref=e540]:
                - generic [ref=e543]: 概览
                - generic [ref=e544]: (0)
              - generic [ref=e545]: 数量 0
            - tab "设置" [ref=e546] [cursor=pointer]
            - tab "课" [ref=e549] [cursor=pointer]:
              - generic [ref=e550]:
                - generic [ref=e551]: 课
                - generic [ref=e552]: (123456789012)
              - generic [ref=e553]: 数量 123456789012
        - tabpanel "概览" [ref=e555]:
          - paragraph [ref=e556]: 组合内容
      - generic [ref=e557]:
        - heading "initial-disabled" [level=2] [ref=e558]
        - button "列表前操作" [ref=e559] [cursor=pointer]
        - generic [ref=e562]:
          - generic "分区导航" [ref=e563]:
            - tablist "initial-disabled课程分区" [ref=e567]:
              - tab "概览" [ref=e568] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [selected] [ref=e573]
              - tab "学生" [ref=e578] [cursor=pointer]:
                - generic [ref=e579]:
                  - generic [ref=e582]: 学生
                  - generic [ref=e583]: (0)
                - generic [ref=e584]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e585] [cursor=pointer]
              - tab "资源" [ref=e590] [cursor=pointer]
              - tab "讨论" [ref=e595] [cursor=pointer]
            - group [ref=e600]:
              - generic "分区说明" [ref=e601]
          - tabpanel "已归档的历史课程和完整资料" [ref=e603]:
            - paragraph [ref=e604]: 已归档的历史课程和完整资料内容
            - textbox "已归档的历史课程和完整资料草稿" [ref=e606]
        - button "列表后操作" [ref=e608] [cursor=pointer]
      - generic [ref=e610]:
        - button "禁用当前分区" [ref=e611] [cursor=pointer]
        - button "禁用资源分区" [ref=e613] [cursor=pointer]
        - button "禁用全部分区" [ref=e615] [cursor=pointer]
        - button "恢复可用分区" [ref=e617] [cursor=pointer]
        - generic [ref=e619]:
          - heading "dynamic-disabled" [level=2] [ref=e620]
          - button "列表前操作" [ref=e621] [cursor=pointer]
          - generic [ref=e624]:
            - generic "分区导航" [ref=e625]:
              - tablist "dynamic-disabled课程分区" [ref=e629]:
                - tab "概览" [selected] [ref=e630] [cursor=pointer]
                - tab "已归档的历史课程和完整资料" [disabled] [ref=e635]
                - tab "学生" [ref=e640] [cursor=pointer]:
                  - generic [ref=e641]:
                    - generic [ref=e644]: 学生
                    - generic [ref=e645]: (0)
                  - generic [ref=e646]: 数量 0
                - tab "完整课堂记录与课后练习资料" [ref=e647] [cursor=pointer]
                - tab "资源" [ref=e652] [cursor=pointer]
                - tab "讨论" [ref=e657] [cursor=pointer]
              - group [ref=e662]:
                - generic "分区说明" [ref=e663]
            - tabpanel "概览" [ref=e665]:
              - paragraph [ref=e666]: 概览内容
              - textbox "概览草稿" [ref=e668]
          - button "列表后操作" [ref=e670] [cursor=pointer]
      - generic [ref=e672]:
        - button "禁用当前分区" [ref=e673] [cursor=pointer]
        - button "禁用资源分区" [ref=e675] [cursor=pointer]
        - button "禁用全部分区" [ref=e677] [cursor=pointer]
        - button "恢复可用分区" [ref=e679] [cursor=pointer]
        - generic [ref=e681]:
          - heading "dynamic-more" [level=2] [ref=e682]
          - button "列表前操作" [ref=e683] [cursor=pointer]
          - generic [ref=e686]:
            - generic "分区导航" [ref=e687]:
              - generic [ref=e690]:
                - tablist "dynamic-more课程分区" [ref=e691]:
                  - tab "概览" [selected] [ref=e692] [cursor=pointer]
                  - tab "已归档的历史课程和完整资料" [disabled] [ref=e697]
                  - tab "学生" [ref=e702] [cursor=pointer]:
                    - generic [ref=e703]:
                      - generic [ref=e706]: 学生
                      - generic [ref=e707]: (0)
                    - generic [ref=e708]: 数量 0
                - button "更多分区" [ref=e709] [cursor=pointer]:
                  - generic [ref=e710]: 更多
              - group [ref=e714]:
                - generic "分区说明" [ref=e715]
            - tabpanel "概览" [ref=e717]:
              - paragraph [ref=e718]: 概览内容
              - textbox "概览草稿" [ref=e720]
          - button "列表后操作" [ref=e722] [cursor=pointer]
      - generic [ref=e724]:
        - heading "manual" [level=2] [ref=e725]
        - button "列表前操作" [ref=e726] [cursor=pointer]
        - generic [ref=e729]:
          - generic "分区导航" [ref=e730]:
            - tablist "manual课程分区" [ref=e734]:
              - tab "概览" [selected] [ref=e735] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e740]
              - tab "学生" [ref=e745] [cursor=pointer]:
                - generic [ref=e746]:
                  - generic [ref=e749]: 学生
                  - generic [ref=e750]: (0)
                - generic [ref=e751]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e752] [cursor=pointer]
              - tab "资源" [ref=e757] [cursor=pointer]
              - tab "讨论" [ref=e762] [cursor=pointer]
            - group [ref=e767]:
              - generic "分区说明" [ref=e768]
          - tabpanel "概览" [ref=e770]:
            - paragraph [ref=e771]: 概览内容
            - textbox "概览草稿" [ref=e773]
        - button "列表后操作" [ref=e775] [cursor=pointer]
      - generic [ref=e777]:
        - heading "automatic" [level=2] [ref=e778]
        - button "列表前操作" [ref=e779] [cursor=pointer]
        - generic [ref=e782]:
          - generic "分区导航" [ref=e783]:
            - tablist "automatic课程分区" [ref=e787]:
              - tab "概览" [selected] [ref=e788] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e793]
              - tab "学生" [ref=e798] [cursor=pointer]:
                - generic [ref=e799]:
                  - generic [ref=e802]: 学生
                  - generic [ref=e803]: (0)
                - generic [ref=e804]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e805] [cursor=pointer]
              - tab "资源" [ref=e810] [cursor=pointer]
              - tab "讨论" [ref=e815] [cursor=pointer]
            - group [ref=e820]:
              - generic "分区说明" [ref=e821]
          - tabpanel "概览" [ref=e823]:
            - paragraph [ref=e824]: 概览内容
            - textbox "概览草稿" [ref=e826]
        - button "列表后操作" [ref=e828] [cursor=pointer]
      - generic [ref=e830]:
        - heading "vertical" [level=2] [ref=e831]
        - button "列表前操作" [ref=e832] [cursor=pointer]
        - generic [ref=e835]:
          - generic "分区导航" [ref=e836]:
            - tablist "vertical课程分区" [ref=e840]:
              - tab "概览" [selected] [ref=e841] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e846]
              - tab "学生" [ref=e851] [cursor=pointer]:
                - generic [ref=e852]:
                  - generic [ref=e855]: 学生
                  - generic [ref=e856]: (0)
                - generic [ref=e857]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e858] [cursor=pointer]
              - tab "资源" [ref=e863] [cursor=pointer]
              - tab "讨论" [ref=e868] [cursor=pointer]
            - group [ref=e873]:
              - generic "分区说明" [ref=e874]
          - tabpanel "概览" [ref=e876]:
            - paragraph [ref=e877]: 概览内容
            - textbox "概览草稿" [ref=e879]
        - button "列表后操作" [ref=e881] [cursor=pointer]
      - generic [ref=e883]:
        - heading "more" [level=2] [ref=e884]
        - button "列表前操作" [ref=e885] [cursor=pointer]
        - generic [ref=e888]:
          - generic "分区导航" [ref=e889]:
            - generic [ref=e892]:
              - tablist "more课程分区" [ref=e893]:
                - tab "概览" [selected] [ref=e894] [cursor=pointer]
                - tab "已归档的历史课程和完整资料" [disabled] [ref=e899]
                - tab "学生" [ref=e904] [cursor=pointer]:
                  - generic [ref=e905]:
                    - generic [ref=e908]: 学生
                    - generic [ref=e909]: (0)
                  - generic [ref=e910]: 数量 0
              - button "更多分区" [ref=e911] [cursor=pointer]:
                - generic [ref=e912]: 更多
            - group [ref=e916]:
              - generic "分区说明" [ref=e917]
          - tabpanel "概览" [ref=e919]:
            - paragraph [ref=e920]: 概览内容
            - textbox "概览草稿" [ref=e922]
        - button "列表后操作" [ref=e924] [cursor=pointer]
      - generic [ref=e926]:
        - heading "controlled" [level=2] [ref=e927]
        - button "列表前操作" [ref=e928] [cursor=pointer]
        - generic [ref=e931]:
          - generic "分区导航" [ref=e932]:
            - generic [ref=e935]:
              - tablist "controlled课程分区" [ref=e936]:
                - tab "概览" [selected] [ref=e937] [cursor=pointer]
                - tab "已归档的历史课程和完整资料" [disabled] [ref=e942]
                - tab "学生" [ref=e947] [cursor=pointer]:
                  - generic [ref=e948]:
                    - generic [ref=e951]: 学生
                    - generic [ref=e952]: (0)
                  - generic [ref=e953]: 数量 0
              - button "更多分区" [ref=e954] [cursor=pointer]:
                - generic [ref=e955]: 更多
            - group [ref=e959]:
              - generic "分区说明" [ref=e960]
          - tabpanel "概览" [ref=e962]:
            - paragraph [ref=e963]: 概览内容
            - textbox "概览草稿" [ref=e965]
        - button "接受待处理选择" [ref=e967] [cursor=pointer]
        - button "列表后操作" [ref=e969] [cursor=pointer]
      - generic [ref=e971]:
        - heading "focus-top" [level=2] [ref=e972]
        - button "列表前操作" [ref=e973] [cursor=pointer]
        - generic [ref=e976]:
          - generic "分区导航" [ref=e977]:
            - tablist "focus-top课程分区" [ref=e981]:
              - tab "概览" [selected] [ref=e982] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e987]
              - tab "学生" [ref=e992] [cursor=pointer]:
                - generic [ref=e993]:
                  - generic [ref=e996]: 学生
                  - generic [ref=e997]: (0)
                - generic [ref=e998]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e999] [cursor=pointer]
              - tab "资源" [ref=e1004] [cursor=pointer]
              - tab "讨论" [ref=e1009] [cursor=pointer]
            - group [ref=e1014]:
              - generic "分区说明" [ref=e1015]
          - tabpanel "概览" [ref=e1017]:
            - paragraph [ref=e1018]: 概览内容
            - textbox "概览草稿" [ref=e1020]
        - button "列表后操作" [ref=e1022] [cursor=pointer]
      - generic [ref=e1024]:
        - heading "focus-bottom" [level=2] [ref=e1025]
        - button "列表前操作" [ref=e1026] [cursor=pointer]
        - generic [ref=e1029]:
          - generic "分区导航" [ref=e1030]:
            - tablist "focus-bottom课程分区" [ref=e1034]:
              - tab "概览" [selected] [ref=e1035] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1040]
              - tab "学生" [ref=e1045] [cursor=pointer]:
                - generic [ref=e1046]:
                  - generic [ref=e1049]: 学生
                  - generic [ref=e1050]: (0)
                - generic [ref=e1051]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1052] [cursor=pointer]
              - tab "资源" [ref=e1057] [cursor=pointer]
              - tab "讨论" [ref=e1062] [cursor=pointer]
            - group [ref=e1067]:
              - generic "分区说明" [ref=e1068]
          - tabpanel "概览" [ref=e1070]:
            - paragraph [ref=e1071]: 概览内容
            - textbox "概览草稿" [ref=e1073]
        - button "列表后操作" [ref=e1075] [cursor=pointer]
      - generic [ref=e1077]:
        - heading "focus-start" [level=2] [ref=e1078]
        - button "列表前操作" [ref=e1079] [cursor=pointer]
        - generic [ref=e1082]:
          - generic "分区导航" [ref=e1083]:
            - tablist "focus-start课程分区" [ref=e1087]:
              - tab "概览" [selected] [ref=e1088] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1093]
              - tab "学生" [ref=e1098] [cursor=pointer]:
                - generic [ref=e1099]:
                  - generic [ref=e1102]: 学生
                  - generic [ref=e1103]: (0)
                - generic [ref=e1104]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1105] [cursor=pointer]
              - tab "资源" [ref=e1110] [cursor=pointer]
              - tab "讨论" [ref=e1115] [cursor=pointer]
            - group [ref=e1120]:
              - generic "分区说明" [ref=e1121]
          - tabpanel "概览" [ref=e1123]:
            - paragraph [ref=e1124]: 概览内容
            - textbox "概览草稿" [ref=e1126]
        - button "列表后操作" [ref=e1128] [cursor=pointer]
      - generic [ref=e1130]:
        - heading "focus-end" [level=2] [ref=e1131]
        - button "列表前操作" [ref=e1132] [cursor=pointer]
        - generic [ref=e1135]:
          - generic "分区导航" [ref=e1136]:
            - tablist "focus-end课程分区" [ref=e1140]:
              - tab "概览" [selected] [ref=e1141] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1146]
              - tab "学生" [ref=e1151] [cursor=pointer]:
                - generic [ref=e1152]:
                  - generic [ref=e1155]: 学生
                  - generic [ref=e1156]: (0)
                - generic [ref=e1157]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1158] [cursor=pointer]
              - tab "资源" [ref=e1163] [cursor=pointer]
              - tab "讨论" [ref=e1168] [cursor=pointer]
            - group [ref=e1173]:
              - generic "分区说明" [ref=e1174]
          - tabpanel "概览" [ref=e1176]:
            - paragraph [ref=e1177]: 概览内容
            - textbox "概览草稿" [ref=e1179]
        - button "列表后操作" [ref=e1181] [cursor=pointer]
      - generic [ref=e1183]:
        - heading "geometry-28" [level=2] [ref=e1184]
        - button "列表前操作" [ref=e1185] [cursor=pointer]
        - generic [ref=e1188]:
          - generic "分区导航" [ref=e1189]:
            - tablist "geometry-28课程分区" [ref=e1193]:
              - tab "概览" [selected] [ref=e1194] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1199]
              - tab "学生" [ref=e1204] [cursor=pointer]:
                - generic [ref=e1205]:
                  - generic [ref=e1208]: 学生
                  - generic [ref=e1209]: (0)
                - generic [ref=e1210]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1211] [cursor=pointer]
              - tab "资源" [ref=e1216] [cursor=pointer]
              - tab "讨论" [ref=e1221] [cursor=pointer]
            - group [ref=e1226]:
              - generic "分区说明" [ref=e1227]
          - tabpanel "概览" [ref=e1229]:
            - paragraph [ref=e1230]: 概览内容
            - textbox "概览草稿" [ref=e1232]
        - button "列表后操作" [ref=e1234] [cursor=pointer]
      - generic [ref=e1236]:
        - heading "geometry-32" [level=2] [ref=e1237]
        - button "列表前操作" [ref=e1238] [cursor=pointer]
        - generic [ref=e1241]:
          - generic "分区导航" [ref=e1242]:
            - tablist "geometry-32课程分区" [ref=e1246]:
              - tab "概览" [selected] [ref=e1247] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1252]
              - tab "学生" [ref=e1257] [cursor=pointer]:
                - generic [ref=e1258]:
                  - generic [ref=e1261]: 学生
                  - generic [ref=e1262]: (0)
                - generic [ref=e1263]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1264] [cursor=pointer]
              - tab "资源" [ref=e1269] [cursor=pointer]
              - tab "讨论" [ref=e1274] [cursor=pointer]
            - group [ref=e1279]:
              - generic "分区说明" [ref=e1280]
          - tabpanel "概览" [ref=e1282]:
            - paragraph [ref=e1283]: 概览内容
            - textbox "概览草稿" [ref=e1285]
        - button "列表后操作" [ref=e1287] [cursor=pointer]
      - generic [ref=e1289]:
        - heading "geometry-38" [level=2] [ref=e1290]
        - button "列表前操作" [ref=e1291] [cursor=pointer]
        - generic [ref=e1294]:
          - generic "分区导航" [ref=e1295]:
            - tablist "geometry-38课程分区" [ref=e1299]:
              - tab "概览" [selected] [ref=e1300] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1305]
              - tab "学生" [ref=e1310] [cursor=pointer]:
                - generic [ref=e1311]:
                  - generic [ref=e1314]: 学生
                  - generic [ref=e1315]: (0)
                - generic [ref=e1316]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1317] [cursor=pointer]
              - tab "资源" [ref=e1322] [cursor=pointer]
              - tab "讨论" [ref=e1327] [cursor=pointer]
            - group [ref=e1332]:
              - generic "分区说明" [ref=e1333]
          - tabpanel "概览" [ref=e1335]:
            - paragraph [ref=e1336]: 概览内容
            - textbox "概览草稿" [ref=e1338]
        - button "列表后操作" [ref=e1340] [cursor=pointer]
      - generic [ref=e1342]:
        - heading "line-28-top" [level=2] [ref=e1343]
        - button "列表前操作" [ref=e1344] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1346] [cursor=pointer]
        - generic [ref=e1349]:
          - generic "分区导航" [ref=e1350]:
            - tablist "line-28-top课程分区" [ref=e1354]:
              - tab "概览" [ref=e1355] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1360]
              - tab "学生" [selected] [ref=e1365] [cursor=pointer]:
                - generic [ref=e1366]:
                  - generic [ref=e1369]: 学生
                  - generic [ref=e1370]: (0)
                - generic [ref=e1371]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1372] [cursor=pointer]
              - tab "资源" [ref=e1377] [cursor=pointer]
              - tab "讨论" [ref=e1382] [cursor=pointer]
            - group [ref=e1387]:
              - generic "分区说明" [ref=e1388]
          - tabpanel "学生" [ref=e1390]:
            - paragraph [ref=e1391]: 学生内容
            - textbox "学生草稿" [ref=e1393]
        - button "列表后操作" [ref=e1395] [cursor=pointer]
      - generic [ref=e1397]:
        - heading "line-28-bottom" [level=2] [ref=e1398]
        - button "列表前操作" [ref=e1399] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1401] [cursor=pointer]
        - generic [ref=e1404]:
          - generic "分区导航" [ref=e1405]:
            - tablist "line-28-bottom课程分区" [ref=e1409]:
              - tab "概览" [ref=e1410] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1415]
              - tab "学生" [selected] [ref=e1420] [cursor=pointer]:
                - generic [ref=e1421]:
                  - generic [ref=e1424]: 学生
                  - generic [ref=e1425]: (0)
                - generic [ref=e1426]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1427] [cursor=pointer]
              - tab "资源" [ref=e1432] [cursor=pointer]
              - tab "讨论" [ref=e1437] [cursor=pointer]
            - group [ref=e1442]:
              - generic "分区说明" [ref=e1443]
          - tabpanel "学生" [ref=e1445]:
            - paragraph [ref=e1446]: 学生内容
            - textbox "学生草稿" [ref=e1448]
        - button "列表后操作" [ref=e1450] [cursor=pointer]
      - generic [ref=e1452]:
        - heading "line-28-start" [level=2] [ref=e1453]
        - button "列表前操作" [ref=e1454] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1456] [cursor=pointer]
        - generic [ref=e1459]:
          - generic "分区导航" [ref=e1460]:
            - tablist "line-28-start课程分区" [ref=e1464]:
              - tab "概览" [ref=e1465] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1470]
              - tab "学生" [selected] [ref=e1475] [cursor=pointer]:
                - generic [ref=e1476]:
                  - generic [ref=e1479]: 学生
                  - generic [ref=e1480]: (0)
                - generic [ref=e1481]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1482] [cursor=pointer]
              - tab "资源" [ref=e1487] [cursor=pointer]
              - tab "讨论" [ref=e1492] [cursor=pointer]
            - group [ref=e1497]:
              - generic "分区说明" [ref=e1498]
          - tabpanel "学生" [ref=e1500]:
            - paragraph [ref=e1501]: 学生内容
            - textbox "学生草稿" [ref=e1503]
        - button "列表后操作" [ref=e1505] [cursor=pointer]
      - generic [ref=e1507]:
        - heading "line-28-end" [level=2] [ref=e1508]
        - button "列表前操作" [ref=e1509] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1511] [cursor=pointer]
        - generic [ref=e1514]:
          - generic "分区导航" [ref=e1515]:
            - tablist "line-28-end课程分区" [ref=e1519]:
              - tab "概览" [ref=e1520] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1525]
              - tab "学生" [selected] [ref=e1530] [cursor=pointer]:
                - generic [ref=e1531]:
                  - generic [ref=e1534]: 学生
                  - generic [ref=e1535]: (0)
                - generic [ref=e1536]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1537] [cursor=pointer]
              - tab "资源" [ref=e1542] [cursor=pointer]
              - tab "讨论" [ref=e1547] [cursor=pointer]
            - group [ref=e1552]:
              - generic "分区说明" [ref=e1553]
          - tabpanel "学生" [ref=e1555]:
            - paragraph [ref=e1556]: 学生内容
            - textbox "学生草稿" [ref=e1558]
        - button "列表后操作" [ref=e1560] [cursor=pointer]
      - generic [ref=e1562]:
        - heading "line-32-top" [level=2] [ref=e1563]
        - button "列表前操作" [ref=e1564] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1566] [cursor=pointer]
        - generic [ref=e1569]:
          - generic "分区导航" [ref=e1570]:
            - tablist "line-32-top课程分区" [ref=e1574]:
              - tab "概览" [ref=e1575] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1580]
              - tab "学生" [selected] [ref=e1585] [cursor=pointer]:
                - generic [ref=e1586]:
                  - generic [ref=e1589]: 学生
                  - generic [ref=e1590]: (0)
                - generic [ref=e1591]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1592] [cursor=pointer]
              - tab "资源" [ref=e1597] [cursor=pointer]
              - tab "讨论" [ref=e1602] [cursor=pointer]
            - group [ref=e1607]:
              - generic "分区说明" [ref=e1608]
          - tabpanel "学生" [ref=e1610]:
            - paragraph [ref=e1611]: 学生内容
            - textbox "学生草稿" [ref=e1613]
        - button "列表后操作" [ref=e1615] [cursor=pointer]
      - generic [ref=e1617]:
        - heading "line-32-bottom" [level=2] [ref=e1618]
        - button "列表前操作" [ref=e1619] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1621] [cursor=pointer]
        - generic [ref=e1624]:
          - generic "分区导航" [ref=e1625]:
            - tablist "line-32-bottom课程分区" [ref=e1629]:
              - tab "概览" [ref=e1630] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1635]
              - tab "学生" [selected] [ref=e1640] [cursor=pointer]:
                - generic [ref=e1641]:
                  - generic [ref=e1644]: 学生
                  - generic [ref=e1645]: (0)
                - generic [ref=e1646]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1647] [cursor=pointer]
              - tab "资源" [ref=e1652] [cursor=pointer]
              - tab "讨论" [ref=e1657] [cursor=pointer]
            - group [ref=e1662]:
              - generic "分区说明" [ref=e1663]
          - tabpanel "学生" [ref=e1665]:
            - paragraph [ref=e1666]: 学生内容
            - textbox "学生草稿" [ref=e1668]
        - button "列表后操作" [ref=e1670] [cursor=pointer]
      - generic [ref=e1672]:
        - heading "line-32-start" [level=2] [ref=e1673]
        - button "列表前操作" [ref=e1674] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1676] [cursor=pointer]
        - generic [ref=e1679]:
          - generic "分区导航" [ref=e1680]:
            - tablist "line-32-start课程分区" [ref=e1684]:
              - tab "概览" [ref=e1685] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1690]
              - tab "学生" [selected] [ref=e1695] [cursor=pointer]:
                - generic [ref=e1696]:
                  - generic [ref=e1699]: 学生
                  - generic [ref=e1700]: (0)
                - generic [ref=e1701]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1702] [cursor=pointer]
              - tab "资源" [ref=e1707] [cursor=pointer]
              - tab "讨论" [ref=e1712] [cursor=pointer]
            - group [ref=e1717]:
              - generic "分区说明" [ref=e1718]
          - tabpanel "学生" [ref=e1720]:
            - paragraph [ref=e1721]: 学生内容
            - textbox "学生草稿" [ref=e1723]
        - button "列表后操作" [ref=e1725] [cursor=pointer]
      - generic [ref=e1727]:
        - heading "line-32-end" [level=2] [ref=e1728]
        - button "列表前操作" [ref=e1729] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1731] [cursor=pointer]
        - generic [ref=e1734]:
          - generic "分区导航" [ref=e1735]:
            - tablist "line-32-end课程分区" [ref=e1739]:
              - tab "概览" [ref=e1740] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1745]
              - tab "学生" [selected] [ref=e1750] [cursor=pointer]:
                - generic [ref=e1751]:
                  - generic [ref=e1754]: 学生
                  - generic [ref=e1755]: (0)
                - generic [ref=e1756]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1757] [cursor=pointer]
              - tab "资源" [ref=e1762] [cursor=pointer]
              - tab "讨论" [ref=e1767] [cursor=pointer]
            - group [ref=e1772]:
              - generic "分区说明" [ref=e1773]
          - tabpanel "学生" [ref=e1775]:
            - paragraph [ref=e1776]: 学生内容
            - textbox "学生草稿" [ref=e1778]
        - button "列表后操作" [ref=e1780] [cursor=pointer]
      - generic [ref=e1782]:
        - heading "line-38-top" [level=2] [ref=e1783]
        - button "列表前操作" [ref=e1784] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1786] [cursor=pointer]
        - generic [ref=e1789]:
          - generic "分区导航" [ref=e1790]:
            - tablist "line-38-top课程分区" [ref=e1794]:
              - tab "概览" [ref=e1795] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1800]
              - tab "学生" [selected] [ref=e1805] [cursor=pointer]:
                - generic [ref=e1806]:
                  - generic [ref=e1809]: 学生
                  - generic [ref=e1810]: (0)
                - generic [ref=e1811]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1812] [cursor=pointer]
              - tab "资源" [ref=e1817] [cursor=pointer]
              - tab "讨论" [ref=e1822] [cursor=pointer]
            - group [ref=e1827]:
              - generic "分区说明" [ref=e1828]
          - tabpanel "学生" [ref=e1830]:
            - paragraph [ref=e1831]: 学生内容
            - textbox "学生草稿" [ref=e1833]
        - button "列表后操作" [ref=e1835] [cursor=pointer]
      - generic [ref=e1837]:
        - heading "line-38-bottom" [level=2] [ref=e1838]
        - button "列表前操作" [ref=e1839] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1841] [cursor=pointer]
        - generic [ref=e1844]:
          - generic "分区导航" [ref=e1845]:
            - tablist "line-38-bottom课程分区" [ref=e1849]:
              - tab "概览" [ref=e1850] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1855]
              - tab "学生" [selected] [ref=e1860] [cursor=pointer]:
                - generic [ref=e1861]:
                  - generic [ref=e1864]: 学生
                  - generic [ref=e1865]: (0)
                - generic [ref=e1866]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1867] [cursor=pointer]
              - tab "资源" [ref=e1872] [cursor=pointer]
              - tab "讨论" [ref=e1877] [cursor=pointer]
            - group [ref=e1882]:
              - generic "分区说明" [ref=e1883]
          - tabpanel "学生" [ref=e1885]:
            - paragraph [ref=e1886]: 学生内容
            - textbox "学生草稿" [ref=e1888]
        - button "列表后操作" [ref=e1890] [cursor=pointer]
      - generic [ref=e1892]:
        - heading "line-38-start" [level=2] [ref=e1893]
        - button "列表前操作" [ref=e1894] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1896] [cursor=pointer]
        - generic [ref=e1899]:
          - generic "分区导航" [ref=e1900]:
            - tablist "line-38-start课程分区" [ref=e1904]:
              - tab "概览" [ref=e1905] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1910]
              - tab "学生" [selected] [ref=e1915] [cursor=pointer]:
                - generic [ref=e1916]:
                  - generic [ref=e1919]: 学生
                  - generic [ref=e1920]: (0)
                - generic [ref=e1921]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1922] [cursor=pointer]
              - tab "资源" [ref=e1927] [cursor=pointer]
              - tab "讨论" [ref=e1932] [cursor=pointer]
            - group [ref=e1937]:
              - generic "分区说明" [ref=e1938]
          - tabpanel "学生" [ref=e1940]:
            - paragraph [ref=e1941]: 学生内容
            - textbox "学生草稿" [ref=e1943]
        - button "列表后操作" [ref=e1945] [cursor=pointer]
      - generic [ref=e1947]:
        - heading "line-38-end" [level=2] [ref=e1948]
        - button "列表前操作" [ref=e1949] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e1951] [cursor=pointer]
        - generic [ref=e1954]:
          - generic "分区导航" [ref=e1955]:
            - tablist "line-38-end课程分区" [ref=e1959]:
              - tab "概览" [ref=e1960] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e1965]
              - tab "学生" [selected] [ref=e1970] [cursor=pointer]:
                - generic [ref=e1971]:
                  - generic [ref=e1974]: 学生
                  - generic [ref=e1975]: (0)
                - generic [ref=e1976]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e1977] [cursor=pointer]
              - tab "资源" [ref=e1982] [cursor=pointer]
              - tab "讨论" [ref=e1987] [cursor=pointer]
            - group [ref=e1992]:
              - generic "分区说明" [ref=e1993]
          - tabpanel "学生" [ref=e1995]:
            - paragraph [ref=e1996]: 学生内容
            - textbox "学生草稿" [ref=e1998]
        - button "列表后操作" [ref=e2000] [cursor=pointer]
      - generic [ref=e2002]:
        - heading "contained-28-top" [level=2] [ref=e2003]
        - button "列表前操作" [ref=e2004] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2006] [cursor=pointer]
        - generic [ref=e2009]:
          - generic "分区导航" [ref=e2010]:
            - tablist "contained-28-top课程分区" [ref=e2014]:
              - tab "概览" [ref=e2015] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2020]
              - tab "学生" [selected] [ref=e2025] [cursor=pointer]:
                - generic [ref=e2026]:
                  - generic [ref=e2029]: 学生
                  - generic [ref=e2030]: (0)
                - generic [ref=e2031]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2032] [cursor=pointer]
              - tab "资源" [ref=e2037] [cursor=pointer]
              - tab "讨论" [ref=e2042] [cursor=pointer]
            - group [ref=e2047]:
              - generic "分区说明" [ref=e2048]
          - tabpanel "学生" [ref=e2050]:
            - paragraph [ref=e2051]: 学生内容
            - textbox "学生草稿" [ref=e2053]
        - button "列表后操作" [ref=e2055] [cursor=pointer]
      - generic [ref=e2057]:
        - heading "contained-28-bottom" [level=2] [ref=e2058]
        - button "列表前操作" [ref=e2059] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2061] [cursor=pointer]
        - generic [ref=e2064]:
          - generic "分区导航" [ref=e2065]:
            - tablist "contained-28-bottom课程分区" [ref=e2069]:
              - tab "概览" [ref=e2070] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2075]
              - tab "学生" [selected] [ref=e2080] [cursor=pointer]:
                - generic [ref=e2081]:
                  - generic [ref=e2084]: 学生
                  - generic [ref=e2085]: (0)
                - generic [ref=e2086]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2087] [cursor=pointer]
              - tab "资源" [ref=e2092] [cursor=pointer]
              - tab "讨论" [ref=e2097] [cursor=pointer]
            - group [ref=e2102]:
              - generic "分区说明" [ref=e2103]
          - tabpanel "学生" [ref=e2105]:
            - paragraph [ref=e2106]: 学生内容
            - textbox "学生草稿" [ref=e2108]
        - button "列表后操作" [ref=e2110] [cursor=pointer]
      - generic [ref=e2112]:
        - heading "contained-28-start" [level=2] [ref=e2113]
        - button "列表前操作" [ref=e2114] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2116] [cursor=pointer]
        - generic [ref=e2119]:
          - generic "分区导航" [ref=e2120]:
            - tablist "contained-28-start课程分区" [ref=e2124]:
              - tab "概览" [ref=e2125] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2130]
              - tab "学生" [selected] [ref=e2135] [cursor=pointer]:
                - generic [ref=e2136]:
                  - generic [ref=e2139]: 学生
                  - generic [ref=e2140]: (0)
                - generic [ref=e2141]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2142] [cursor=pointer]
              - tab "资源" [ref=e2147] [cursor=pointer]
              - tab "讨论" [ref=e2152] [cursor=pointer]
            - group [ref=e2157]:
              - generic "分区说明" [ref=e2158]
          - tabpanel "学生" [ref=e2160]:
            - paragraph [ref=e2161]: 学生内容
            - textbox "学生草稿" [ref=e2163]
        - button "列表后操作" [ref=e2165] [cursor=pointer]
      - generic [ref=e2167]:
        - heading "contained-28-end" [level=2] [ref=e2168]
        - button "列表前操作" [ref=e2169] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2171] [cursor=pointer]
        - generic [ref=e2174]:
          - generic "分区导航" [ref=e2175]:
            - tablist "contained-28-end课程分区" [ref=e2179]:
              - tab "概览" [ref=e2180] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2185]
              - tab "学生" [selected] [ref=e2190] [cursor=pointer]:
                - generic [ref=e2191]:
                  - generic [ref=e2194]: 学生
                  - generic [ref=e2195]: (0)
                - generic [ref=e2196]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2197] [cursor=pointer]
              - tab "资源" [ref=e2202] [cursor=pointer]
              - tab "讨论" [ref=e2207] [cursor=pointer]
            - group [ref=e2212]:
              - generic "分区说明" [ref=e2213]
          - tabpanel "学生" [ref=e2215]:
            - paragraph [ref=e2216]: 学生内容
            - textbox "学生草稿" [ref=e2218]
        - button "列表后操作" [ref=e2220] [cursor=pointer]
      - generic [ref=e2222]:
        - heading "contained-32-top" [level=2] [ref=e2223]
        - button "列表前操作" [ref=e2224] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2226] [cursor=pointer]
        - generic [ref=e2229]:
          - generic "分区导航" [ref=e2230]:
            - tablist "contained-32-top课程分区" [ref=e2234]:
              - tab "概览" [ref=e2235] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2240]
              - tab "学生" [selected] [ref=e2245] [cursor=pointer]:
                - generic [ref=e2246]:
                  - generic [ref=e2249]: 学生
                  - generic [ref=e2250]: (0)
                - generic [ref=e2251]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2252] [cursor=pointer]
              - tab "资源" [ref=e2257] [cursor=pointer]
              - tab "讨论" [ref=e2262] [cursor=pointer]
            - group [ref=e2267]:
              - generic "分区说明" [ref=e2268]
          - tabpanel "学生" [ref=e2270]:
            - paragraph [ref=e2271]: 学生内容
            - textbox "学生草稿" [ref=e2273]
        - button "列表后操作" [ref=e2275] [cursor=pointer]
      - generic [ref=e2277]:
        - heading "contained-32-bottom" [level=2] [ref=e2278]
        - button "列表前操作" [ref=e2279] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2281] [cursor=pointer]
        - generic [ref=e2284]:
          - generic "分区导航" [ref=e2285]:
            - tablist "contained-32-bottom课程分区" [ref=e2289]:
              - tab "概览" [ref=e2290] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2295]
              - tab "学生" [selected] [ref=e2300] [cursor=pointer]:
                - generic [ref=e2301]:
                  - generic [ref=e2304]: 学生
                  - generic [ref=e2305]: (0)
                - generic [ref=e2306]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2307] [cursor=pointer]
              - tab "资源" [ref=e2312] [cursor=pointer]
              - tab "讨论" [ref=e2317] [cursor=pointer]
            - group [ref=e2322]:
              - generic "分区说明" [ref=e2323]
          - tabpanel "学生" [ref=e2325]:
            - paragraph [ref=e2326]: 学生内容
            - textbox "学生草稿" [ref=e2328]
        - button "列表后操作" [ref=e2330] [cursor=pointer]
      - generic [ref=e2332]:
        - heading "contained-32-start" [level=2] [ref=e2333]
        - button "列表前操作" [ref=e2334] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2336] [cursor=pointer]
        - generic [ref=e2339]:
          - generic "分区导航" [ref=e2340]:
            - tablist "contained-32-start课程分区" [ref=e2344]:
              - tab "概览" [ref=e2345] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2350]
              - tab "学生" [selected] [ref=e2355] [cursor=pointer]:
                - generic [ref=e2356]:
                  - generic [ref=e2359]: 学生
                  - generic [ref=e2360]: (0)
                - generic [ref=e2361]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2362] [cursor=pointer]
              - tab "资源" [ref=e2367] [cursor=pointer]
              - tab "讨论" [ref=e2372] [cursor=pointer]
            - group [ref=e2377]:
              - generic "分区说明" [ref=e2378]
          - tabpanel "学生" [ref=e2380]:
            - paragraph [ref=e2381]: 学生内容
            - textbox "学生草稿" [ref=e2383]
        - button "列表后操作" [ref=e2385] [cursor=pointer]
      - generic [ref=e2387]:
        - heading "contained-32-end" [level=2] [ref=e2388]
        - button "列表前操作" [ref=e2389] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2391] [cursor=pointer]
        - generic [ref=e2394]:
          - generic "分区导航" [ref=e2395]:
            - tablist "contained-32-end课程分区" [ref=e2399]:
              - tab "概览" [ref=e2400] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2405]
              - tab "学生" [selected] [ref=e2410] [cursor=pointer]:
                - generic [ref=e2411]:
                  - generic [ref=e2414]: 学生
                  - generic [ref=e2415]: (0)
                - generic [ref=e2416]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2417] [cursor=pointer]
              - tab "资源" [ref=e2422] [cursor=pointer]
              - tab "讨论" [ref=e2427] [cursor=pointer]
            - group [ref=e2432]:
              - generic "分区说明" [ref=e2433]
          - tabpanel "学生" [ref=e2435]:
            - paragraph [ref=e2436]: 学生内容
            - textbox "学生草稿" [ref=e2438]
        - button "列表后操作" [ref=e2440] [cursor=pointer]
      - generic [ref=e2442]:
        - heading "contained-38-top" [level=2] [ref=e2443]
        - button "列表前操作" [ref=e2444] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2446] [cursor=pointer]
        - generic [ref=e2449]:
          - generic "分区导航" [ref=e2450]:
            - tablist "contained-38-top课程分区" [ref=e2454]:
              - tab "概览" [ref=e2455] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2460]
              - tab "学生" [selected] [ref=e2465] [cursor=pointer]:
                - generic [ref=e2466]:
                  - generic [ref=e2469]: 学生
                  - generic [ref=e2470]: (0)
                - generic [ref=e2471]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2472] [cursor=pointer]
              - tab "资源" [ref=e2477] [cursor=pointer]
              - tab "讨论" [ref=e2482] [cursor=pointer]
            - group [ref=e2487]:
              - generic "分区说明" [ref=e2488]
          - tabpanel "学生" [ref=e2490]:
            - paragraph [ref=e2491]: 学生内容
            - textbox "学生草稿" [ref=e2493]
        - button "列表后操作" [ref=e2495] [cursor=pointer]
      - generic [ref=e2497]:
        - heading "contained-38-bottom" [level=2] [ref=e2498]
        - button "列表前操作" [ref=e2499] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2501] [cursor=pointer]
        - generic [ref=e2504]:
          - generic "分区导航" [ref=e2505]:
            - tablist "contained-38-bottom课程分区" [ref=e2509]:
              - tab "概览" [ref=e2510] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2515]
              - tab "学生" [selected] [ref=e2520] [cursor=pointer]:
                - generic [ref=e2521]:
                  - generic [ref=e2524]: 学生
                  - generic [ref=e2525]: (0)
                - generic [ref=e2526]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2527] [cursor=pointer]
              - tab "资源" [ref=e2532] [cursor=pointer]
              - tab "讨论" [ref=e2537] [cursor=pointer]
            - group [ref=e2542]:
              - generic "分区说明" [ref=e2543]
          - tabpanel "学生" [ref=e2545]:
            - paragraph [ref=e2546]: 学生内容
            - textbox "学生草稿" [ref=e2548]
        - button "列表后操作" [ref=e2550] [cursor=pointer]
      - generic [ref=e2552]:
        - heading "contained-38-start" [level=2] [ref=e2553]
        - button "列表前操作" [ref=e2554] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2556] [cursor=pointer]
        - generic [ref=e2559]:
          - generic "分区导航" [ref=e2560]:
            - tablist "contained-38-start课程分区" [ref=e2564]:
              - tab "概览" [ref=e2565] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2570]
              - tab "学生" [selected] [ref=e2575] [cursor=pointer]:
                - generic [ref=e2576]:
                  - generic [ref=e2579]: 学生
                  - generic [ref=e2580]: (0)
                - generic [ref=e2581]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2582] [cursor=pointer]
              - tab "资源" [ref=e2587] [cursor=pointer]
              - tab "讨论" [ref=e2592] [cursor=pointer]
            - group [ref=e2597]:
              - generic "分区说明" [ref=e2598]
          - tabpanel "学生" [ref=e2600]:
            - paragraph [ref=e2601]: 学生内容
            - textbox "学生草稿" [ref=e2603]
        - button "列表后操作" [ref=e2605] [cursor=pointer]
      - generic [ref=e2607]:
        - heading "contained-38-end" [level=2] [ref=e2608]
        - button "列表前操作" [ref=e2609] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2611] [cursor=pointer]
        - generic [ref=e2614]:
          - generic "分区导航" [ref=e2615]:
            - tablist "contained-38-end课程分区" [ref=e2619]:
              - tab "概览" [ref=e2620] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2625]
              - tab "学生" [selected] [ref=e2630] [cursor=pointer]:
                - generic [ref=e2631]:
                  - generic [ref=e2634]: 学生
                  - generic [ref=e2635]: (0)
                - generic [ref=e2636]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2637] [cursor=pointer]
              - tab "资源" [ref=e2642] [cursor=pointer]
              - tab "讨论" [ref=e2647] [cursor=pointer]
            - group [ref=e2652]:
              - generic "分区说明" [ref=e2653]
          - tabpanel "学生" [ref=e2655]:
            - paragraph [ref=e2656]: 学生内容
            - textbox "学生草稿" [ref=e2658]
        - button "列表后操作" [ref=e2660] [cursor=pointer]
      - generic [ref=e2662]:
        - heading "soft-28-top" [level=2] [ref=e2663]
        - button "列表前操作" [ref=e2664] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2666] [cursor=pointer]
        - generic [ref=e2669]:
          - generic "分区导航" [ref=e2670]:
            - tablist "soft-28-top课程分区" [ref=e2674]:
              - tab "概览" [ref=e2675] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2680]
              - tab "学生" [selected] [ref=e2685] [cursor=pointer]:
                - generic [ref=e2686]:
                  - generic [ref=e2689]: 学生
                  - generic [ref=e2690]: (0)
                - generic [ref=e2691]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2692] [cursor=pointer]
              - tab "资源" [ref=e2697] [cursor=pointer]
              - tab "讨论" [ref=e2702] [cursor=pointer]
            - group [ref=e2707]:
              - generic "分区说明" [ref=e2708]
          - tabpanel "学生" [ref=e2710]:
            - paragraph [ref=e2711]: 学生内容
            - textbox "学生草稿" [ref=e2713]
        - button "列表后操作" [ref=e2715] [cursor=pointer]
      - generic [ref=e2717]:
        - heading "soft-28-bottom" [level=2] [ref=e2718]
        - button "列表前操作" [ref=e2719] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2721] [cursor=pointer]
        - generic [ref=e2724]:
          - generic "分区导航" [ref=e2725]:
            - tablist "soft-28-bottom课程分区" [ref=e2729]:
              - tab "概览" [ref=e2730] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2735]
              - tab "学生" [selected] [ref=e2740] [cursor=pointer]:
                - generic [ref=e2741]:
                  - generic [ref=e2744]: 学生
                  - generic [ref=e2745]: (0)
                - generic [ref=e2746]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2747] [cursor=pointer]
              - tab "资源" [ref=e2752] [cursor=pointer]
              - tab "讨论" [ref=e2757] [cursor=pointer]
            - group [ref=e2762]:
              - generic "分区说明" [ref=e2763]
          - tabpanel "学生" [ref=e2765]:
            - paragraph [ref=e2766]: 学生内容
            - textbox "学生草稿" [ref=e2768]
        - button "列表后操作" [ref=e2770] [cursor=pointer]
      - generic [ref=e2772]:
        - heading "soft-28-start" [level=2] [ref=e2773]
        - button "列表前操作" [ref=e2774] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2776] [cursor=pointer]
        - generic [ref=e2779]:
          - generic "分区导航" [ref=e2780]:
            - tablist "soft-28-start课程分区" [ref=e2784]:
              - tab "概览" [ref=e2785] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2790]
              - tab "学生" [selected] [ref=e2795] [cursor=pointer]:
                - generic [ref=e2796]:
                  - generic [ref=e2799]: 学生
                  - generic [ref=e2800]: (0)
                - generic [ref=e2801]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2802] [cursor=pointer]
              - tab "资源" [ref=e2807] [cursor=pointer]
              - tab "讨论" [ref=e2812] [cursor=pointer]
            - group [ref=e2817]:
              - generic "分区说明" [ref=e2818]
          - tabpanel "学生" [ref=e2820]:
            - paragraph [ref=e2821]: 学生内容
            - textbox "学生草稿" [ref=e2823]
        - button "列表后操作" [ref=e2825] [cursor=pointer]
      - generic [ref=e2827]:
        - heading "soft-28-end" [level=2] [ref=e2828]
        - button "列表前操作" [ref=e2829] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2831] [cursor=pointer]
        - generic [ref=e2834]:
          - generic "分区导航" [ref=e2835]:
            - tablist "soft-28-end课程分区" [ref=e2839]:
              - tab "概览" [ref=e2840] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2845]
              - tab "学生" [selected] [ref=e2850] [cursor=pointer]:
                - generic [ref=e2851]:
                  - generic [ref=e2854]: 学生
                  - generic [ref=e2855]: (0)
                - generic [ref=e2856]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2857] [cursor=pointer]
              - tab "资源" [ref=e2862] [cursor=pointer]
              - tab "讨论" [ref=e2867] [cursor=pointer]
            - group [ref=e2872]:
              - generic "分区说明" [ref=e2873]
          - tabpanel "学生" [ref=e2875]:
            - paragraph [ref=e2876]: 学生内容
            - textbox "学生草稿" [ref=e2878]
        - button "列表后操作" [ref=e2880] [cursor=pointer]
      - generic [ref=e2882]:
        - heading "soft-32-top" [level=2] [ref=e2883]
        - button "列表前操作" [ref=e2884] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2886] [cursor=pointer]
        - generic [ref=e2889]:
          - generic "分区导航" [ref=e2890]:
            - tablist "soft-32-top课程分区" [ref=e2894]:
              - tab "概览" [ref=e2895] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2900]
              - tab "学生" [selected] [ref=e2905] [cursor=pointer]:
                - generic [ref=e2906]:
                  - generic [ref=e2909]: 学生
                  - generic [ref=e2910]: (0)
                - generic [ref=e2911]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2912] [cursor=pointer]
              - tab "资源" [ref=e2917] [cursor=pointer]
              - tab "讨论" [ref=e2922] [cursor=pointer]
            - group [ref=e2927]:
              - generic "分区说明" [ref=e2928]
          - tabpanel "学生" [ref=e2930]:
            - paragraph [ref=e2931]: 学生内容
            - textbox "学生草稿" [ref=e2933]
        - button "列表后操作" [ref=e2935] [cursor=pointer]
      - generic [ref=e2937]:
        - heading "soft-32-bottom" [level=2] [ref=e2938]
        - button "列表前操作" [ref=e2939] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2941] [cursor=pointer]
        - generic [ref=e2944]:
          - generic "分区导航" [ref=e2945]:
            - tablist "soft-32-bottom课程分区" [ref=e2949]:
              - tab "概览" [ref=e2950] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e2955]
              - tab "学生" [selected] [ref=e2960] [cursor=pointer]:
                - generic [ref=e2961]:
                  - generic [ref=e2964]: 学生
                  - generic [ref=e2965]: (0)
                - generic [ref=e2966]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e2967] [cursor=pointer]
              - tab "资源" [ref=e2972] [cursor=pointer]
              - tab "讨论" [ref=e2977] [cursor=pointer]
            - group [ref=e2982]:
              - generic "分区说明" [ref=e2983]
          - tabpanel "学生" [ref=e2985]:
            - paragraph [ref=e2986]: 学生内容
            - textbox "学生草稿" [ref=e2988]
        - button "列表后操作" [ref=e2990] [cursor=pointer]
      - generic [ref=e2992]:
        - heading "soft-32-start" [level=2] [ref=e2993]
        - button "列表前操作" [ref=e2994] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e2996] [cursor=pointer]
        - generic [ref=e2999]:
          - generic "分区导航" [ref=e3000]:
            - tablist "soft-32-start课程分区" [ref=e3004]:
              - tab "概览" [ref=e3005] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e3010]
              - tab "学生" [selected] [ref=e3015] [cursor=pointer]:
                - generic [ref=e3016]:
                  - generic [ref=e3019]: 学生
                  - generic [ref=e3020]: (0)
                - generic [ref=e3021]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e3022] [cursor=pointer]
              - tab "资源" [ref=e3027] [cursor=pointer]
              - tab "讨论" [ref=e3032] [cursor=pointer]
            - group [ref=e3037]:
              - generic "分区说明" [ref=e3038]
          - tabpanel "学生" [ref=e3040]:
            - paragraph [ref=e3041]: 学生内容
            - textbox "学生草稿" [ref=e3043]
        - button "列表后操作" [ref=e3045] [cursor=pointer]
      - generic [ref=e3047]:
        - heading "soft-32-end" [level=2] [ref=e3048]
        - button "列表前操作" [ref=e3049] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e3051] [cursor=pointer]
        - generic [ref=e3054]:
          - generic "分区导航" [ref=e3055]:
            - tablist "soft-32-end课程分区" [ref=e3059]:
              - tab "概览" [ref=e3060] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e3065]
              - tab "学生" [selected] [ref=e3070] [cursor=pointer]:
                - generic [ref=e3071]:
                  - generic [ref=e3074]: 学生
                  - generic [ref=e3075]: (0)
                - generic [ref=e3076]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e3077] [cursor=pointer]
              - tab "资源" [ref=e3082] [cursor=pointer]
              - tab "讨论" [ref=e3087] [cursor=pointer]
            - group [ref=e3092]:
              - generic "分区说明" [ref=e3093]
          - tabpanel "学生" [ref=e3095]:
            - paragraph [ref=e3096]: 学生内容
            - textbox "学生草稿" [ref=e3098]
        - button "列表后操作" [ref=e3100] [cursor=pointer]
      - generic [ref=e3102]:
        - heading "soft-38-top" [level=2] [ref=e3103]
        - button "列表前操作" [ref=e3104] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e3106] [cursor=pointer]
        - generic [ref=e3109]:
          - generic "分区导航" [ref=e3110]:
            - tablist "soft-38-top课程分区" [ref=e3114]:
              - tab "概览" [ref=e3115] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e3120]
              - tab "学生" [selected] [ref=e3125] [cursor=pointer]:
                - generic [ref=e3126]:
                  - generic [ref=e3129]: 学生
                  - generic [ref=e3130]: (0)
                - generic [ref=e3131]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e3132] [cursor=pointer]
              - tab "资源" [ref=e3137] [cursor=pointer]
              - tab "讨论" [ref=e3142] [cursor=pointer]
            - group [ref=e3147]:
              - generic "分区说明" [ref=e3148]
          - tabpanel "学生" [ref=e3150]:
            - paragraph [ref=e3151]: 学生内容
            - textbox "学生草稿" [ref=e3153]
        - button "列表后操作" [ref=e3155] [cursor=pointer]
      - generic [ref=e3157]:
        - heading "soft-38-bottom" [level=2] [ref=e3158]
        - button "列表前操作" [ref=e3159] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e3161] [cursor=pointer]
        - generic [ref=e3164]:
          - generic "分区导航" [ref=e3165]:
            - tablist "soft-38-bottom课程分区" [ref=e3169]:
              - tab "概览" [ref=e3170] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e3175]
              - tab "学生" [selected] [ref=e3180] [cursor=pointer]:
                - generic [ref=e3181]:
                  - generic [ref=e3184]: 学生
                  - generic [ref=e3185]: (0)
                - generic [ref=e3186]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e3187] [cursor=pointer]
              - tab "资源" [ref=e3192] [cursor=pointer]
              - tab "讨论" [ref=e3197] [cursor=pointer]
            - group [ref=e3202]:
              - generic "分区说明" [ref=e3203]
          - tabpanel "学生" [ref=e3205]:
            - paragraph [ref=e3206]: 学生内容
            - textbox "学生草稿" [ref=e3208]
        - button "列表后操作" [ref=e3210] [cursor=pointer]
      - generic [ref=e3212]:
        - heading "soft-38-start" [level=2] [ref=e3213]
        - button "列表前操作" [ref=e3214] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e3216] [cursor=pointer]
        - generic [ref=e3219]:
          - generic "分区导航" [ref=e3220]:
            - tablist "soft-38-start课程分区" [ref=e3224]:
              - tab "概览" [ref=e3225] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e3230]
              - tab "学生" [active] [selected] [ref=e3235] [cursor=pointer]:
                - generic [ref=e3236]:
                  - generic [ref=e3239]: 学生
                  - generic [ref=e3240]: (0)
                - generic [ref=e3241]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e3242] [cursor=pointer]
              - tab "资源" [ref=e3247] [cursor=pointer]
              - tab "讨论" [ref=e3252] [cursor=pointer]
            - group [ref=e3257]:
              - generic "分区说明" [ref=e3258]
          - tabpanel "学生" [ref=e3260]:
            - paragraph [ref=e3261]: 学生内容
            - textbox "学生草稿" [ref=e3263]
        - button "列表后操作" [ref=e3265] [cursor=pointer]
      - generic [ref=e3267]:
        - heading "soft-38-end" [level=2] [ref=e3268]
        - button "列表前操作" [ref=e3269] [cursor=pointer]
        - button "切换学生禁用状态" [ref=e3271] [cursor=pointer]
        - generic [ref=e3274]:
          - generic "分区导航" [ref=e3275]:
            - tablist "soft-38-end课程分区" [ref=e3279]:
              - tab "概览" [selected] [ref=e3280] [cursor=pointer]
              - tab "已归档的历史课程和完整资料" [disabled] [ref=e3285]
              - tab "学生" [ref=e3290] [cursor=pointer]:
                - generic [ref=e3291]:
                  - generic [ref=e3294]: 学生
                  - generic [ref=e3295]: (0)
                - generic [ref=e3296]: 数量 0
              - tab "完整课堂记录与课后练习资料" [ref=e3297] [cursor=pointer]
              - tab "资源" [ref=e3302] [cursor=pointer]
              - tab "讨论" [ref=e3307] [cursor=pointer]
            - group [ref=e3312]:
              - generic "分区说明" [ref=e3313]
          - tabpanel "概览" [ref=e3315]:
            - paragraph [ref=e3316]: 概览内容
            - textbox "概览草稿" [ref=e3318]
        - button "列表后操作" [ref=e3320] [cursor=pointer]
      - group [ref=e3322]:
        - generic "布局与换向检查" [ref=e3323]
```

# Test source

```ts
  186 |   const scope = controls.locator('[data-public-case="dynamic-disabled"]');
  187 |   await controls.getByRole("button", { name: "禁用当前分区", exact: true }).click();
  188 |   await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  189 |   await page.keyboard.press("Tab");
  190 |   await expect(scope.getByRole("tab", { name: "学生", exact: true })).toBeFocused();
  191 |   await controls.getByRole("button", { name: "禁用全部分区", exact: true }).click();
  192 |   await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  193 |   await page.keyboard.press("Tab"); await expect(scope.locator("summary")).toBeFocused();
  194 |   await controls.getByRole("button", { name: "恢复可用分区", exact: true }).click();
  195 |   await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  196 |   await page.keyboard.press("Tab"); await expect(scope.getByRole("tab", { name: "概览", exact: true })).toBeFocused();
  197 | });
  198 | 
  199 | 
  200 | test("menu remains stable during viewport resize and outside dismissal preserves its target", async ({ page }) => {
  201 |   const scope = page.locator('[data-public-case="more"]');
  202 |   await scope.getByRole("button", { name: "更多分区", exact: true }).click();
  203 |   const item = page.getByRole("menuitemradio", { name: "讨论", exact: true });
  204 |   await item.focus(); await page.setViewportSize({ width: 1000, height: 900 });
  205 |   await expect(item).toBeFocused();
  206 |   await scope.getByRole("button", { name: "列表后操作", exact: true }).click();
  207 |   await expect(page.getByRole("menu")).toBeHidden();
  208 |   await expect(scope.getByRole("button", { name: "列表后操作", exact: true })).toBeFocused();
  209 | });
  210 | 
  211 | test("soft selected fill has no persistent border and shared Focus is visible on all four edges", async ({ page }) => {
  212 |   for (const position of ["top", "bottom", "start", "end"]) {
  213 |     const scope = page.locator(`[data-public-case="focus-${position}"]`);
  214 |     const tab = scope.getByRole("tab", { name: "学生", exact: true });
  215 |     await tab.scrollIntoViewIfNeeded();
  216 |     const before = await tab.boundingBox();
  217 |     await tab.focus();
  218 |     const focus = await tab.evaluate(node => {
  219 |       const style = getComputedStyle(node);
  220 |       let parent = node.parentElement;
  221 |       const clipping = [];
  222 |       while (parent && parent.tagName !== "SECTION") {
  223 |         const css = getComputedStyle(parent);
  224 |         if ([css.overflowX, css.overflowY].some(value => value !== "visible")) {
  225 |           const rect = parent.getBoundingClientRect(), tab = node.getBoundingClientRect();
  226 |           if (rect.left > tab.left - 3 || rect.right < tab.right + 3 || rect.top > tab.top - 3 || rect.bottom < tab.bottom + 3) clipping.push(parent.tagName);
  227 |         }
  228 |         parent = parent.parentElement;
  229 |       }
  230 |       return { border: style.borderTopWidth, outline: style.outlineWidth, shadow: style.boxShadow, clipping };
  231 |     });
  232 |     expect(focus.border).toBe("0px"); expect(focus.outline).toBe("1px");
  233 |     expect(focus.shadow).not.toBe("none"); expect(focus.clipping).toEqual([]);
  234 |     await page.keyboard.press("Enter"); expect(await tab.boundingBox()).toEqual(before);
  235 |   }
  236 | });
  237 | 
  238 | test("truncated title supports hover and hides when its tab is collected into More", async ({ page }) => {
  239 |   const scope = page.locator('[data-public-case="more"]');
  240 |   const overview = scope.getByRole("tab", { name: "概览", exact: true });
  241 |   await overview.focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  242 |   const records = scope.getByRole("tab", { name: "完整课堂记录与课后练习资料", exact: true });
  243 |   await expect(records).toBeFocused(); await expect(page.getByRole("tooltip")).toBeVisible();
  244 |   await page.keyboard.press("End"); await expect(page.getByRole("tooltip")).toBeHidden();
  245 |   const vertical = page.locator('[data-public-case="vertical"]').getByRole("tab", { name: "完整课堂记录与课后练习资料", exact: true });
  246 |   await vertical.hover(); await expect(page.getByRole("tooltip")).toContainText("完整课堂记录与课后练习资料");
  247 |   await page.keyboard.press("Escape"); await expect(page.getByRole("tooltip")).toBeHidden();
  248 | });
  249 | 
  250 | 
  251 | test("restoring a selected item removes the fallback entry without stealing external focus", async ({ page }) => {
  252 |   const controls = page.locator('[data-public-dynamic="true"]');
  253 |   const scope = controls.locator('[data-public-case="dynamic-disabled"]');
  254 |   await scope.getByRole("tab", { name: "资源", exact: true }).click();
  255 |   await scope.getByRole("tab", { name: "概览", exact: true }).focus();
  256 |   await controls.getByRole("button", { name: "禁用全部分区", exact: true }).click();
  257 |   const restore = controls.getByRole("button", { name: "禁用当前分区", exact: true });
  258 |   await restore.click(); await expect(restore).toBeFocused();
  259 |   await expect(scope.locator('[role="tab"][tabindex="0"]:not(:disabled)')).toHaveCount(1);
  260 |   await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  261 |   await page.keyboard.press("Tab"); await expect(scope.getByRole("tab", { name: "资源", exact: true })).toBeFocused();
  262 | });
  263 | 
  264 | 
  265 | test("a disabled More-window entry is repaired to a visible tab", async ({ page }) => {
  266 |   const controls = page.locator('[data-public-dynamic="more"]');
  267 |   const scope = controls.locator('[data-public-case="dynamic-more"]');
  268 |   await scope.getByRole("button", { name: "更多分区", exact: true }).click();
  269 |   await page.getByRole("menuitemradio", { name: "讨论", exact: true }).click();
  270 |   await expect(scope.getByRole("tab", { name: "讨论", exact: true })).toBeFocused();
  271 |   await page.keyboard.press("ArrowLeft");
  272 |   await expect(scope.getByRole("tab", { name: "资源", exact: true })).toBeFocused();
  273 |   await controls.getByRole("button", { name: "禁用资源分区", exact: true }).click();
  274 |   await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  275 |   await page.keyboard.press("Tab");
  276 |   await expect(scope.getByRole("tab", { name: "完整课堂记录与课后练习资料", exact: true })).toBeFocused();
  277 |   await expect(scope.locator('[role="tab"][tabindex="0"]:not(:disabled):not([hidden])')).toHaveCount(1);
  278 | });
  279 | 
  280 | test("all 36 public recipes share exact heights, typography, count weight, paints and panel-facing indicators", async ({ page }) => {
  281 |   for (const appearance of ['line', 'contained', 'soft']) for (const size of [28, 32, 38] as const) for (const position of ['top', 'bottom', 'start', 'end']) {
  282 |     const scope = page.locator(`[data-public-case="${appearance}-${size}-${position}"]`);
  283 |     const tab = scope.getByRole('tab', { name: '学生', exact: true });
  284 |     await tab.scrollIntoViewIfNeeded();
  285 |     const before = await tab.boundingBox(); expect(before!.height).toBe(size);
> 286 |     await tab.click();
      |               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  287 |     const fact = await tab.evaluate(node => {
  288 |       const read = (selector: string) => { const part = node.querySelector(selector)!; return { style: getComputedStyle(part), rect: part.getBoundingClientRect() }; };
  289 |       const label = read('[data-part="label"]'), count = read('[data-part="count"]'), icon = read('[data-part="icon"]'), paint = read('[data-part="paint"]');
  290 |       const line = node.querySelector('[data-part="indicator"]')?.getBoundingClientRect();
  291 |       const box = node.getBoundingClientRect();
  292 |       return { font: label.style.fontSize, leading: label.style.lineHeight, labelWeight: label.style.fontWeight, countFont: count.style.fontSize,
  293 |         countLeading: count.style.lineHeight, countWeight: count.style.fontWeight, icon: icon.rect.width, paintHeight: paint.rect.height,
  294 |         border: getComputedStyle(node).borderTopWidth, line: line ? { x: line.x - box.x, y: line.y - box.y, width: line.width, height: line.height } : null, width: box.width, height: box.height };
  295 |     });
  296 |     expect(fact.font).toBe(({ 28: '13px', 32: '14px', 38: '15px' })[size]);
  297 |     expect(fact.leading).toBe(({ 28: '18px', 32: '20px', 38: '22px' })[size]);
  298 |     expect(fact.labelWeight).toBe('600'); expect(fact.countFont).toBe('12px'); expect(fact.countLeading).toBe('14px'); expect(fact.countWeight).toBe('400');
  299 |     expect(fact.icon).toBe(size === 38 ? 16 : 14); expect(fact.height).toBe(size);
  300 |     if (appearance === 'contained') expect(fact.paintHeight).toBe(size - 6);
  301 |     if (appearance === 'soft') { expect(fact.border).toBe('0px'); expect(fact.width).toBe(before!.width); }
  302 |     if (appearance === 'line') {
  303 |       const thickness = size === 38 ? 3 : 2;
  304 |       if (position === 'top' || position === 'bottom') { expect(fact.line!.height).toBe(thickness); expect(fact.line!.y).toBe(position === 'top' ? size - thickness : 0); }
  305 |       else { expect(fact.line!.width).toBe(thickness); expect(fact.line!.x).toBe(position === 'start' ? fact.width - thickness : 0); }
  306 |     }
  307 |   }
  308 | });
  309 | 
  310 | 
  311 | test("a long selected label keeps More until even two characters cannot fit", async ({ page }) => {
  312 |   const scope = page.locator('[data-public-tabs="overflow"]');
  313 |   await scope.getByRole('button', { name: '更多分区' }).click();
  314 |   const records = page.getByRole('menuitemradio', { name: '完整课堂记录与课后练习资料', exact: true });
  315 |   await expect(records.locator('[data-slot="leading"] [data-icon="icon/search"]')).toBeVisible();
  316 |   await records.click();
  317 |   const tab = scope.getByRole('tab', { name: '完整课堂记录与课后练习资料', exact: true });
  318 |   await expect(tab).toBeFocused();
  319 |   await expect(scope.getByRole('button', { name: '更多分区' })).toBeVisible();
  320 |   const label = await tab.locator('[data-part="label"]').evaluate(node => ({ width: node.getBoundingClientRect().width, minimum: 2 * parseFloat(getComputedStyle(node).fontSize), truncated: node.scrollWidth > node.clientWidth }));
  321 |   expect(label.width).toBeGreaterThanOrEqual(label.minimum); expect(label.truncated).toBe(true);
  322 |   await scope.getByRole('button', { name: '极窄导航' }).click();
  323 |   await expect(scope.locator('[data-mode="scroll"]')).toBeVisible();
  324 |   await expect(tab).toHaveAttribute('aria-selected', 'true');
  325 | });
  326 | 
  327 | test("deleting an opened menu collection closes it and recovers a valid focus target", async ({ page }) => {
  328 |   const scope = page.locator('[data-public-tabs="overflow"]');
  329 |   await scope.getByRole('button', { name: '更多分区' }).click();
  330 |   await page.getByRole('menuitemradio', { name: '讨论', exact: true }).focus();
  331 |   await scope.getByRole('button', { name: '仅保留概览' }).evaluate(node => (node as HTMLElement).click());
  332 |   await expect(page.getByRole('menu')).toBeHidden();
  333 |   await expect(scope.getByRole('tab', { name: '概览', exact: true })).toBeFocused();
  334 |   await scope.getByRole('button', { name: '恢复全部分区' }).click();
  335 |   await scope.getByRole('button', { name: '更多分区' }).click();
  336 |   await scope.getByRole('button', { name: '仅保留概览' }).click();
  337 |   await expect(scope.getByRole('button', { name: '仅保留概览' })).toBeFocused();
  338 | });
  339 | 
  340 | test("a removed pending keyboard target cannot steal focus after restoration", async ({ page }) => {
  341 |   const scope = page.locator('[data-public-tabs="overflow"]');
  342 |   await scope.getByRole('button', { name: '动态删除末项' }).click();
  343 |   await scope.getByRole('tab', { name: '概览', exact: true }).focus();
  344 |   await page.keyboard.press('End');
  345 |   await expect(scope.getByRole('tab', { name: '讨论', exact: true, includeHidden: true })).toHaveCount(0);
  346 |   const restore = scope.getByRole('button', { name: '恢复全部分区' });
  347 |   await restore.click(); await expect(restore).toBeFocused();
  348 |   await expect(scope.getByRole('tab', { name: '讨论', exact: true, includeHidden: true })).toHaveCount(1);
  349 |   await expect(restore).toBeFocused();
  350 | });
  351 | 
  352 | test("a focused More button hands focus to its accepted tab when all items fit", async ({ page }) => {
  353 |   const scope = page.locator('[data-public-tabs="overflow"]');
  354 |   await scope.getByRole('button', { name: '更多分区' }).focus();
  355 |   await scope.locator('[data-public-width]').evaluate(node => { (node as HTMLElement).style.width = '2000px'; });
  356 |   await expect(scope.getByRole('button', { name: '更多分区' })).toHaveCount(0);
  357 |   await expect(scope.getByRole('tab', { name: '概览', exact: true })).toBeFocused();
  358 | });
  359 | 
  360 | test("menu deletion after a frozen shrink restores a tab in the newly measured interval", async ({ page }) => {
  361 |   const scope = page.locator('[data-public-tabs="overflow"]');
  362 |   await scope.getByRole('button', { name: '加宽导航' }).click();
  363 |   await scope.getByRole('tab', { name: '学生', exact: true }).click();
  364 |   await scope.getByRole('button', { name: '更多分区' }).click();
  365 |   await page.getByRole('menuitemradio', { name: '讨论', exact: true }).focus();
  366 |   await scope.locator('[data-public-width]').evaluate(node => { (node as HTMLElement).style.width = '200px'; });
  367 |   await scope.getByRole('button', { name: '保留前三分区' }).evaluate(node => (node as HTMLElement).click());
  368 |   await expect(page.getByRole('menu')).toBeHidden();
  369 |   await expect(scope.getByRole('tab', { name: '学生', exact: true })).toBeFocused();
  370 |   await expect(scope.getByRole('tab', { name: '学生', exact: true })).toHaveAttribute('aria-selected', 'true');
  371 | });
  372 | 
  373 | const tabsStates = ['ordinary', 'hover', 'pressed', 'selected', 'focus', 'focus-hover', 'focus-pressed', 'selected-hover', 'selected-pressed', 'selected-focus', 'disabled', 'selected-disabled'] as const;
  374 | const tabsColor = (value: string) => {
  375 |   const values = value.match(/[\d.]+/g)!.map(Number), scale = value.startsWith('color(srgb') ? 255 : 1;
  376 |   return { rgb: [values[0]! * scale, values[1]! * scale, values[2]! * scale] as const, alpha: values[3] ?? 1 };
  377 | };
  378 | const tabsOver = (foreground: ReturnType<typeof tabsColor>, background: ReturnType<typeof tabsColor>): ReturnType<typeof tabsColor> => ({ rgb: foreground.rgb.map((value, index) => value * foreground.alpha + background.rgb[index]! * (1 - foreground.alpha)) as unknown as readonly [number, number, number], alpha: 1 });
  379 | async function readTabsFacts(tab: Locator) {
  380 |   return tab.evaluate(node => {
  381 |     const box = node.getBoundingClientRect(), css = getComputedStyle(node);
  382 |     const rect = (element: Element) => { const r = element.getBoundingClientRect(); return { x: r.x - box.x, y: r.y - box.y, width: r.width, height: r.height }; };
  383 |     const part = (name: string) => {
  384 |       const el = node.querySelector(`[data-part="${name}"]`); if (!el) return null;
  385 |       const style = getComputedStyle(el);
  386 |       return { ...rect(el), color: style.color, background: style.backgroundColor, border: style.borderColor, borderWidth: style.borderTopWidth, radius: style.borderTopLeftRadius,
```