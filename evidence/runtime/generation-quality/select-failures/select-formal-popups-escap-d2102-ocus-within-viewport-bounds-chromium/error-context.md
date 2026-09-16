# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: select.spec.ts >> formal popups escape clipping, inherit themes and retain keyboard focus within viewport bounds
- Location: tests/e2e/select.spec.ts:119:1

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    212
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - link "返回组件总览" [ref=e6] [cursor=pointer]:
        - /url: "#components"
      - heading "Select 选择器" [level=1] [ref=e8]
      - paragraph [ref=e9]: 单选、多选和搜索共用一套字段。默认带清空、键盘操作与完整选中信息。
      - group "预览主题" [ref=e10]:
        - button "浅色" [pressed] [ref=e11] [cursor=pointer]
        - button "深色" [ref=e13] [cursor=pointer]
        - button "切换父背景" [ref=e15] [cursor=pointer]
    - region [ref=e17]:
      - heading "四种选择方式" [level=2] [ref=e18]
      - generic [ref=e19]:
        - generic [ref=e20]:
          - generic [ref=e21]: 普通单选
          - generic [ref=e22]:
            - combobox "普通单选" [expanded] [ref=e24] [cursor=pointer]:
              - generic [ref=e25]: 请选择
            - listbox "选项" [ref=e34]:
              - group "设计学院" [ref=e35]:
                - option "视传 2401" [active] [ref=e37] [cursor=pointer]
                - option "数媒 2401" [ref=e41] [cursor=pointer]:
                  - generic [ref=e42]:
                    - generic [ref=e43]: 数媒 2401
                    - generic [ref=e44]: 数字媒体联合班
                - option "工业设计 2401" [ref=e46] [cursor=pointer]
              - generic [ref=e50]:
                - option "跨学院人工智能与数字媒体设计联合实验教学班" [ref=e51] [cursor=pointer]
                - option "已停用班级" [disabled] [ref=e55]
          - textbox [ref=e61]
        - generic [ref=e62]:
          - generic [ref=e63]: 普通多选
          - generic [ref=e64]:
            - generic [ref=e65]:
              - combobox "普通多选" [ref=e66] [cursor=pointer]:
                - generic "视传 2401、数媒 2401" [ref=e68]
              - button "清除普通多选" [ref=e71] [cursor=pointer]
            - generic [ref=e77]: 已选：视传 2401、数媒 2401
          - textbox [ref=e78]
        - generic [ref=e79]:
          - generic [ref=e80]: 搜索单选
          - combobox "搜索单选" [ref=e83] [cursor=pointer]:
            - generic [ref=e84]: 请选择
          - textbox [ref=e90]
        - generic [ref=e91]:
          - generic [ref=e92]: 搜索多选
          - generic [ref=e93]:
            - generic [ref=e94]:
              - combobox "搜索多选" [ref=e95] [cursor=pointer]:
                - generic "视传 2401" [ref=e97]
              - button "清除搜索多选" [ref=e100] [cursor=pointer]
            - generic [ref=e106]: 已选：视传 2401
          - textbox [ref=e107]
    - region [ref=e108]:
      - heading "框内固定标题" [level=2] [ref=e109]
      - paragraph [ref=e110]: 筛选栏把标题和选中内容放在同一行。多选使用单行摘要或数量，超出宽度时保留选中数量；搜索仍在展开面板中进行。
      - generic [ref=e111]:
        - generic [ref=e112]:
          - generic [ref=e113]:
            - generic [ref=e114]:
              - generic "教学班" [ref=e115]
              - combobox "教学班" [ref=e117] [cursor=pointer]:
                - generic "视传 2401" [ref=e119]
              - button "清除教学班" [ref=e121] [cursor=pointer]
            - generic [ref=e127]: 已选：视传 2401
          - textbox [ref=e128]: a
        - generic [ref=e129]:
          - generic [ref=e130]:
            - generic [ref=e131]:
              - generic "授课范围" [ref=e132]
              - combobox "授课范围" [ref=e134] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e136]:
                  - generic [ref=e137]: 视传 2401、数媒 2401
                  - generic [ref=e138]: "+1"
              - button "清除授课范围" [ref=e140] [cursor=pointer]
            - generic [ref=e146]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e147]
      - generic [ref=e148]: "<FormItem label=\"教学班\" labelPosition=\"inside\"> <Select size={32} options={options} /> </FormItem>"
    - region [ref=e149]:
      - heading "Input 与 Select 外观对照" [level=2] [ref=e150]
      - paragraph [ref=e151]: 下方 Input 用于并排比较描边、填充与底线；单位、内部按钮和搜索等完整用法统一在 Input 详情页。
      - link "查看 Input 全部用法" [ref=e152] [cursor=pointer]:
        - /url: "#input"
      - generic [ref=e154]:
        - generic [ref=e155]:
          - heading "描边" [level=3] [ref=e156]
          - generic [ref=e157]:
            - generic [ref=e158]: 描边输入
            - textbox "描边输入" [ref=e160]: 人工智能导论
          - generic [ref=e162]:
            - generic [ref=e163]: 描边选择
            - generic [ref=e164]:
              - generic [ref=e165]:
                - combobox "描边选择" [ref=e166] [cursor=pointer]:
                  - generic "视传 2401" [ref=e168]
                - button "清除描边选择" [ref=e170] [cursor=pointer]
              - generic [ref=e176]: 已选：视传 2401
            - textbox [ref=e177]: a
          - generic [ref=e178]:
            - generic [ref=e179]: 描边空值
            - combobox "描边空值" [ref=e182] [cursor=pointer]:
              - generic [ref=e183]: 请选择
            - textbox [ref=e189]
          - generic [ref=e190]:
            - generic [ref=e191]: 描边警告
            - generic [ref=e192]:
              - generic [ref=e193]:
                - combobox "描边警告" [ref=e194] [cursor=pointer]:
                  - generic "视传 2401" [ref=e196]
                - button "清除描边警告" [ref=e198] [cursor=pointer]
              - generic [ref=e204]: 已选：视传 2401
            - textbox [ref=e205]: a
            - generic [ref=e206]: 请核对授课范围
          - generic [ref=e207]:
            - generic [ref=e208]:
              - text: 描边错误
              - generic [ref=e209]: "*"
            - combobox "描边错误" [invalid] [ref=e212] [cursor=pointer]:
              - generic [ref=e213]: 请选择
            - textbox [ref=e219]
            - generic [ref=e220]: 请选择有效教学班
          - generic [ref=e221]:
            - generic [ref=e222]: 描边只读
            - generic [ref=e223]:
              - combobox "描边只读" [disabled] [ref=e225]:
                - generic "视传 2401" [ref=e227]
              - generic [ref=e231]: 已选：视传 2401
            - textbox [ref=e232]: a
          - generic [ref=e233]:
            - generic [ref=e234]: 描边禁用
            - generic [ref=e235]:
              - combobox "描边禁用" [disabled] [ref=e237]:
                - generic "视传 2401" [ref=e239]
              - generic [ref=e243]: 已选：视传 2401
            - textbox [disabled] [ref=e244]: a
        - generic [ref=e245]:
          - heading "填充" [level=3] [ref=e246]
          - generic [ref=e247]:
            - generic [ref=e248]: 填充输入
            - textbox "填充输入" [ref=e250]: 人工智能导论
          - generic [ref=e252]:
            - generic [ref=e253]: 填充选择
            - generic [ref=e254]:
              - generic [ref=e255]:
                - combobox "填充选择" [ref=e256] [cursor=pointer]:
                  - generic "视传 2401" [ref=e258]
                - button "清除填充选择" [ref=e260] [cursor=pointer]
              - generic [ref=e266]: 已选：视传 2401
            - textbox [ref=e267]: a
          - generic [ref=e268]:
            - generic [ref=e269]: 填充空值
            - combobox "填充空值" [ref=e272] [cursor=pointer]:
              - generic [ref=e273]: 请选择
            - textbox [ref=e279]
          - generic [ref=e280]:
            - generic [ref=e281]: 填充警告
            - generic [ref=e282]:
              - generic [ref=e283]:
                - combobox "填充警告" [ref=e284] [cursor=pointer]:
                  - generic "视传 2401" [ref=e286]
                - button "清除填充警告" [ref=e288] [cursor=pointer]
              - generic [ref=e294]: 已选：视传 2401
            - textbox [ref=e295]: a
            - generic [ref=e296]: 请核对授课范围
          - generic [ref=e297]:
            - generic [ref=e298]:
              - text: 填充错误
              - generic [ref=e299]: "*"
            - combobox "填充错误" [invalid] [ref=e302] [cursor=pointer]:
              - generic [ref=e303]: 请选择
            - textbox [ref=e309]
            - generic [ref=e310]: 请选择有效教学班
          - generic [ref=e311]:
            - generic [ref=e312]: 填充只读
            - generic [ref=e313]:
              - combobox "填充只读" [disabled] [ref=e315]:
                - generic "视传 2401" [ref=e317]
              - generic [ref=e321]: 已选：视传 2401
            - textbox [ref=e322]: a
          - generic [ref=e323]:
            - generic [ref=e324]: 填充禁用
            - generic [ref=e325]:
              - combobox "填充禁用" [disabled] [ref=e327]:
                - generic "视传 2401" [ref=e329]
              - generic [ref=e333]: 已选：视传 2401
            - textbox [disabled] [ref=e334]: a
        - generic [ref=e335]:
          - heading "底线" [level=3] [ref=e336]
          - generic [ref=e337]:
            - generic [ref=e338]: 底线输入
            - textbox "底线输入" [ref=e340]: 人工智能导论
          - generic [ref=e342]:
            - generic [ref=e343]: 底线选择
            - generic [ref=e344]:
              - generic [ref=e345]:
                - combobox "底线选择" [ref=e346] [cursor=pointer]:
                  - generic "视传 2401" [ref=e348]
                - button "清除底线选择" [ref=e350] [cursor=pointer]
              - generic [ref=e356]: 已选：视传 2401
            - textbox [ref=e357]: a
          - generic [ref=e358]:
            - generic [ref=e359]: 底线空值
            - combobox "底线空值" [ref=e362] [cursor=pointer]:
              - generic [ref=e363]: 请选择
            - textbox [ref=e369]
          - generic [ref=e370]:
            - generic [ref=e371]: 底线警告
            - generic [ref=e372]:
              - generic [ref=e373]:
                - combobox "底线警告" [ref=e374] [cursor=pointer]:
                  - generic "视传 2401" [ref=e376]
                - button "清除底线警告" [ref=e378] [cursor=pointer]
              - generic [ref=e384]: 已选：视传 2401
            - textbox [ref=e385]: a
            - generic [ref=e386]: 请核对授课范围
          - generic [ref=e387]:
            - generic [ref=e388]:
              - text: 底线错误
              - generic [ref=e389]: "*"
            - combobox "底线错误" [invalid] [ref=e392] [cursor=pointer]:
              - generic [ref=e393]: 请选择
            - textbox [ref=e399]
            - generic [ref=e400]: 请选择有效教学班
          - generic [ref=e401]:
            - generic [ref=e402]: 底线只读
            - generic [ref=e403]:
              - combobox "底线只读" [disabled] [ref=e405]:
                - generic "视传 2401" [ref=e407]
              - generic [ref=e411]: 已选：视传 2401
            - textbox [ref=e412]: a
          - generic [ref=e413]:
            - generic [ref=e414]: 底线禁用
            - generic [ref=e415]:
              - combobox "底线禁用" [disabled] [ref=e417]:
                - generic "视传 2401" [ref=e419]
              - generic [ref=e423]: 已选：视传 2401
            - textbox [disabled] [ref=e424]: a
    - region [ref=e425]:
      - heading "尺寸、摘要与标签" [level=2] [ref=e426]
      - generic [ref=e427]:
        - generic [ref=e428]:
          - generic [ref=e429]: 24px 摘要
          - generic [ref=e430]:
            - generic [ref=e431]:
              - combobox "24px 摘要" [ref=e432] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e434]:
                  - generic [ref=e435]: 视传 2401、数媒 2401
                  - generic [ref=e436]: "+1"
              - button "清除24px 摘要" [ref=e438] [cursor=pointer]
            - generic [ref=e444]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e445]
        - generic [ref=e446]:
          - generic [ref=e447]: 28px 摘要
          - generic [ref=e448]:
            - generic [ref=e449]:
              - combobox "28px 摘要" [ref=e450] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e452]:
                  - generic [ref=e453]: 视传 2401、数媒 2401
                  - generic [ref=e454]: "+1"
              - button "清除28px 摘要" [ref=e456] [cursor=pointer]
            - generic [ref=e462]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e463]
        - generic [ref=e464]:
          - generic [ref=e465]: 32px 摘要
          - generic [ref=e466]:
            - generic [ref=e467]:
              - combobox "32px 摘要" [ref=e468] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e470]:
                  - generic [ref=e471]: 视传 2401、数媒 2401
                  - generic [ref=e472]: "+1"
              - button "清除32px 摘要" [ref=e474] [cursor=pointer]
            - generic [ref=e480]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e481]
        - generic [ref=e482]:
          - generic [ref=e483]: 36px 摘要
          - generic [ref=e484]:
            - generic [ref=e485]:
              - combobox "36px 摘要" [ref=e486] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e488]:
                  - generic [ref=e489]: 视传 2401、数媒 2401
                  - generic [ref=e490]: "+1"
              - button "清除36px 摘要" [ref=e492] [cursor=pointer]
            - generic [ref=e498]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e499]
        - generic [ref=e500]:
          - generic [ref=e501]: 32px 标签
          - generic [ref=e502]:
            - generic [ref=e503]:
              - generic [ref=e504]:
                - generic "视传 2401" [ref=e506]:
                  - button "移除 视传 2401" [ref=e509] [cursor=pointer]
                - generic "数媒 2401" [ref=e513]:
                  - button "移除 数媒 2401" [ref=e516] [cursor=pointer]
              - combobox "32px 标签" [ref=e519] [cursor=pointer]
              - button "清除32px 标签" [ref=e524] [cursor=pointer]
            - generic [ref=e527]: 已选：视传 2401、数媒 2401
          - textbox [ref=e528]
        - generic [ref=e529]:
          - generic [ref=e530]: 36px 标签
          - generic [ref=e531]:
            - generic [ref=e532]:
              - generic [ref=e533]:
                - generic "视传 2401" [ref=e535]:
                  - button "移除 视传 2401" [ref=e538] [cursor=pointer]
                - generic "数媒 2401" [ref=e542]:
                  - button "移除 数媒 2401" [ref=e545] [cursor=pointer]
              - combobox "36px 标签" [ref=e548] [cursor=pointer]
              - button "清除36px 标签" [ref=e553] [cursor=pointer]
            - generic [ref=e556]: 已选：视传 2401、数媒 2401
          - textbox [ref=e557]
        - generic [ref=e558]:
          - generic [ref=e559]: 长名称摘要
          - generic [ref=e560]:
            - generic [ref=e561]:
              - combobox "长名称摘要" [ref=e562] [cursor=pointer]:
                - generic "跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401" [ref=e564]:
                  - generic [ref=e565]: 跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401
                  - generic [ref=e566]: "+1"
              - button "清除长名称摘要" [ref=e568] [cursor=pointer]
            - generic [ref=e574]: 已选：跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401
          - textbox [ref=e575]
        - generic [ref=e576]:
          - generic [ref=e577]: 长名称标签
          - generic [ref=e578]:
            - generic [ref=e579]:
              - generic [ref=e580]:
                - generic "跨学院人工智能与数字媒体设计联合实验教学班" [ref=e582]:
                  - button "移除 跨学院人工智能与数字媒体设计联合实验教学班" [ref=e585] [cursor=pointer]
                - generic "数媒 2401" [ref=e589]:
                  - button "移除 数媒 2401" [ref=e592] [cursor=pointer]
                - generic "工业设计 2401" [ref=e596]:
                  - button "移除 工业设计 2401" [ref=e599] [cursor=pointer]
              - combobox "长名称标签" [ref=e602] [cursor=pointer]
              - button "清除长名称标签" [ref=e607] [cursor=pointer]
            - generic [ref=e610]: 已选：跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401
          - textbox [ref=e611]
        - generic [ref=e612]:
          - generic [ref=e613]: 仅显示数量
          - generic [ref=e614]:
            - generic [ref=e615]:
              - combobox "仅显示数量" [ref=e616] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e618]: 已选 3 项
              - button "清除仅显示数量" [ref=e621] [cursor=pointer]
            - generic [ref=e627]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e628]
        - generic [ref=e629]:
          - generic [ref=e630]: 最多选择两项
          - generic [ref=e631]:
            - generic [ref=e632]:
              - combobox "最多选择两项" [ref=e633] [cursor=pointer]:
                - generic "视传 2401、数媒 2401" [ref=e635]
              - button "清除最多选择两项" [ref=e638] [cursor=pointer]
            - generic [ref=e644]: 已选：视传 2401、数媒 2401
          - textbox [ref=e645]
        - generic [ref=e647]:
          - generic [ref=e648]: 紧凑区域默认
          - generic [ref=e649]:
            - generic [ref=e650]:
              - combobox "紧凑区域默认" [ref=e651] [cursor=pointer]:
                - generic "视传 2401" [ref=e653]
              - button "清除紧凑区域默认" [ref=e655] [cursor=pointer]
            - generic [ref=e661]: 已选：视传 2401
          - textbox [ref=e662]: a
        - generic [ref=e663]:
          - generic [ref=e664]: 资料尚未返回
          - generic [ref=e665]:
            - generic [ref=e666]:
              - combobox "资料尚未返回" [ref=e667] [cursor=pointer]:
                - generic "waiting-id" [ref=e669]
              - button "清除资料尚未返回" [ref=e672] [cursor=pointer]
            - generic [ref=e678]: 已选：waiting-id
          - textbox [ref=e679]
    - region [ref=e680]:
      - heading "候选数据与表单草稿" [level=2] [ref=e681]
      - generic [ref=e682]:
        - generic [ref=e684]:
          - generic [ref=e685]: 远程教学班
          - generic [ref=e686]:
            - generic [ref=e687]:
              - combobox "远程教学班" [ref=e688] [cursor=pointer]:
                - generic "视传 2401" [ref=e690]
              - button "清除远程教学班" [ref=e693] [cursor=pointer]
            - generic [ref=e699]: 已选：视传 2401
          - textbox [ref=e700]
          - generic [ref=e701]: 模拟数据：A 较慢，B 较快；搜索“失败”可体验重试。
        - generic [ref=e702]:
          - generic [ref=e703]:
            - generic [ref=e704]: 课程教学班
            - generic [ref=e705]:
              - generic [ref=e706]:
                - combobox "课程教学班" [ref=e707] [cursor=pointer]:
                  - generic "视传 2401" [ref=e709]
                - button "清除课程教学班" [ref=e712] [cursor=pointer]
              - generic [ref=e718]: 已选：视传 2401
            - textbox [ref=e719]
            - generic [ref=e720]: 选择先进入当前表单草稿，保存后更新记录。
          - generic [ref=e721]:
            - button "保存修改" [ref=e722] [cursor=pointer]
            - button "取消修改" [ref=e724] [cursor=pointer]
          - paragraph [ref=e726]: 已保存：视传 2401
        - generic [ref=e727]:
          - generic [ref=e728]: 暂无选项
          - combobox "暂无选项" [ref=e731] [cursor=pointer]:
            - generic [ref=e732]: 请选择
          - textbox [ref=e738]
        - generic [ref=e739]:
          - generic [ref=e740]: 正在加载
          - generic [ref=e741]:
            - generic [ref=e742]:
              - combobox "正在加载" [ref=e743] [cursor=pointer]:
                - generic "视传 2401" [ref=e745]
              - button "清除正在加载" [ref=e747] [cursor=pointer]
            - generic [ref=e753]: 已选：视传 2401
          - textbox [ref=e754]: a
    - region [ref=e755]:
      - heading "独立浅色区域" [level=2] [ref=e756]
      - generic [ref=e757]:
        - generic [ref=e758]: 嵌套浅色
        - generic [ref=e759]:
          - generic [ref=e760]:
            - generic [ref=e761]:
              - generic "视传 2401" [ref=e763]:
                - button "移除 视传 2401" [ref=e766] [cursor=pointer]
              - generic "数媒 2401" [ref=e770]:
                - button "移除 数媒 2401" [ref=e773] [cursor=pointer]
            - combobox "嵌套浅色" [ref=e776] [cursor=pointer]
            - button "清除嵌套浅色" [ref=e781] [cursor=pointer]
          - generic [ref=e784]: 已选：视传 2401、数媒 2401
        - textbox [ref=e785]
    - paragraph [ref=e786]: 当前为组件检查版，选项区已接入正式浮层、菜单内容与 Tag。当前真实组件视觉已完成人工验收；颜色与真实设备核验单独保留。
```

# Test source

```ts
  35  |     cells.push(h("section", { key: "retained", "data-closure-retained": true, style: { display: "grid", gap: "12px" } },
  36  |       h(Select, { options, "aria-label": "保留计数", multiple: true, display: "count", defaultValue: ["alpha", "beta"] }),
  37  |       h(Select, { options, "aria-label": "保留标签", multiple: true, display: "tags", size: 32, defaultValue: ["beta"] })));
  38  |     createRoot(host).render(h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" } }, ...cells));
  39  |   }, { theme, uiPath: `/@fs${new URL("../../packages/ui/src/index.ts", import.meta.url).pathname}` });
  40  |   const host = page.locator("#select-closure-fixture");
  41  |   await expect(host.locator("[data-closure-select] [role=combobox]")).toHaveCount(120);
  42  |   const colors = theme === "light"
  43  |     ? { placeholder: "rgb(116, 133, 168)", strongText: "rgb(73, 93, 135)", disabled: "rgb(160, 172, 197)", arrow: "rgb(150, 163, 193)", disabledArrow: "rgb(184, 194, 216)", text: "rgb(20, 35, 70)", description: "rgb(86, 104, 143)", selected: "rgb(21, 97, 248)" }
  44  |     : { placeholder: "rgb(136, 145, 173)", strongText: "rgb(183, 193, 224)", disabled: "rgb(111, 122, 158)", arrow: "rgb(132, 144, 181)", disabledArrow: "rgb(85, 95, 128)", text: "rgb(239, 241, 245)", description: "rgb(148, 156, 184)", selected: "rgb(81, 136, 255)" };
  45  |   const records: unknown[] = [];
  46  |   async function record(control: Locator, interaction: string) {
  47  |     const paint = await control.evaluate(node => {
  48  |       const trigger = node as HTMLButtonElement, frame = trigger.closest('[data-slot="frame"]')!, owner = trigger.closest('[data-rain-id="ui-select"]')!;
  49  |       const value = getComputedStyle(trigger.querySelector('[data-slot="value"] > span')!), frameCss = getComputedStyle(frame);
  50  |       return { appearance: owner.getAttribute("data-appearance"), size: owner.getAttribute("data-size"),
  51  |         state: owner.closest("[data-closure-select]")!.getAttribute("data-closure-select"), permission: owner.getAttribute("data-permission"),
  52  |         disabled: trigger.disabled, ariaDisabled: trigger.getAttribute("aria-disabled"), open: trigger.getAttribute("aria-expanded"),
  53  |         focused: trigger === document.activeElement, focusVisible: trigger.matches(":focus-visible"), hover: trigger.matches(":hover"),
  54  |         placeholder: value.color, label: trigger.textContent, opacity: value.opacity,
  55  |         foreground: getComputedStyle(trigger).color, arrow: getComputedStyle(frame.querySelector('[data-slot="arrow"]')!).color,
  56  |         background: frameCss.backgroundColor, parentBackground: getComputedStyle(document.getElementById("select-closure-fixture")!).backgroundColor,
  57  |         border: frameCss.borderColor, outline: frameCss.outlineColor, shadow: frameCss.boxShadow };
  58  |     });
  59  |     expect(paint.placeholder).toBe(paint.disabled ? colors.disabled : colors.placeholder);
  60  |     expect(paint.label).toBe("请选择课程"); expect(paint.opacity).toBe("1");
  61  |     expect(paint.disabled).toBe(["disabled", "inherited-disabled"].includes(paint.state!));
  62  |     expect(paint.permission).toBe(paint.disabled ? "disabled" : paint.state === "readonly" ? "readonly" : "editable");
  63  |     expect(paint.arrow).toBe(paint.disabled ? colors.disabledArrow : colors.arrow);
  64  |     const contrast = contrastRatio(paint.placeholder, paint.background, paint.parentBackground);
  65  |     records.push({ theme, interaction, ...paint, contrast, contrastRequired: paint.disabled ? null : 4.5, contrastPass: paint.disabled ? null : contrast >= 4.5 });
  66  |     return paint;
  67  |   }
  68  |   for (const control of await host.locator("[data-closure-select] [role=combobox]").all()) await record(control, "closed");
  69  |   const directory = process.env.RAIN_CLOSURE_EVIDENCE_DIR;
  70  |   if (directory) mkdirSync(directory, { recursive: true });
  71  |   const artifact = (name: string) => directory ? `${directory}/${name}` : testInfo.outputPath(name);
  72  |   await host.locator('[data-closure-cell="outlined-32"]').screenshot({ path: artifact(`implemented-select-${theme}.png`) });
  73  |   for (const appearance of ["outlined", "filled", "underlined"]) for (const size of [24, 28, 32, 36]) {
  74  |     const cell = host.locator(`[data-closure-cell="${appearance}-${size}"]`);
  75  |     const readonly = cell.locator('[data-closure-select="readonly"] [role=combobox]');
  76  |     await readonly.focus(); await readonly.press("Tab"); await page.keyboard.press("Shift+Tab");
  77  |     expect((await record(readonly, "readonly-keyboard-focus")).focusVisible).toBe(true);
  78  |     await readonly.press("ArrowDown"); await expect(readonly).toHaveAttribute("aria-expanded", "false");
  79  |     for (const state of ["normal", "multiple", "searchable", "searchable-multiple"]) {
  80  |       const control = cell.locator(`[data-closure-select="${state}"] [role=combobox]`);
  81  |       await control.hover(); expect((await record(control, "hover")).hover).toBe(true);
  82  |       await control.focus(); await control.press("Tab"); await page.keyboard.press("Shift+Tab");
  83  |       expect((await record(control, "keyboard-focus")).focusVisible).toBe(true);
  84  |       await control.press("ArrowDown"); const panel = popup(control); await expect(panel).toBeVisible();
  85  |       expect((await record(control, "open-empty")).open).toBe("true");
  86  |       await expect(panel.locator("xpath=..")).toHaveAttribute("data-rain-theme", theme);
  87  |       if (state.startsWith("searchable")) {
  88  |         const search = panel.getByRole("combobox", { name: "搜索选项", exact: true });
  89  |         await expect(search).toBeFocused(); await expect(search).toHaveValue("");
  90  |         const paint = await search.evaluate(node => ({ placeholder: getComputedStyle(node, "::placeholder").color, status: node.closest('[data-rain-id="ui-input"]')!.getAttribute("data-status") }));
  91  |         expect(paint).toEqual({ placeholder: colors.placeholder, status: "default" });
  92  |         records.push({ theme, appearance, size, state, interaction: "popup-search", ...paint });
  93  |       }
  94  |       const ordinary = panel.getByRole("option", { name: "可选课程", exact: true });
  95  |       const selected = panel.getByRole("option", { name: "已有课程", exact: true });
  96  |       const disabled = panel.getByRole("option", { name: "暂不可选", exact: true });
  97  |       await expect(ordinary.locator('[data-slot="description"]')).toHaveCSS("color", colors.strongText);
  98  |       await expect(disabled).toHaveAttribute("aria-disabled", "true");
  99  |       await expect(disabled.locator('[data-slot="description"]')).toHaveCSS("color", colors.description);
  100 |       await selected.click();
  101 |       if (!state.includes("multiple")) await control.press("ArrowDown");
  102 |       await expect(selected).toHaveAttribute("aria-selected", "true");
  103 |       await expect(selected.locator('[data-slot="description"]')).toHaveCSS("color", colors.selected);
  104 |       records.push({ theme, appearance, size, state, interaction: "option-description", ordinary: await ordinary.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), selected: await selected.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), disabled: await disabled.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), note: "Selected Brand/2 and disabled Neutral/4 are preserved, not accepted contrast exceptions." });
  105 |       await page.keyboard.press("Escape"); await expect(control).toBeFocused();
  106 |       await expect(control.locator('[data-slot="value"]')).toHaveCSS("color", colors.text);
  107 |       await widget(control).getByRole("button", { name: `清除${appearance} ${size} ${state}`, exact: true }).click();
  108 |       await record(control, "after-clear");
  109 |     }
  110 |   }
  111 |   const retained = host.locator("[data-closure-retained]");
  112 |   await expect(retained.getByRole("combobox", { name: "保留计数" }).locator('[data-slot="value"]')).toHaveCSS("color", colors.text);
  113 |   await expect(retained.getByText("已选 2 项", { exact: true })).toHaveCSS("color", colors.strongText);
  114 |   await expect(retained.locator('[data-rain-id="ui-tag"] [data-slot="label"]')).toHaveCSS("color", colors.text);
  115 |   records.push({ interaction: "retained-count-and-tag", value: colors.text, count: colors.strongText, tag: colors.text });
  116 |   writeFileSync(artifact(`implemented-select-${theme}.json`), JSON.stringify({ scope: "Real Select/FormItem props; three appearances x four sizes; empty single/multiple/searchable/searchable-multiple/warning/error/readonly/disabled/inherited-disabled/loading. Actual keyboard opening, Portal search, selection and clear; ordinary option Neutral/3, selected Brand/2, disabled Neutral/4. No manually assigned component state or color overrides.", theme, records }, null, 2));
  117 | });
  118 | 
  119 | test("formal popups escape clipping, inherit themes and retain keyboard focus within viewport bounds", async ({ page }) => {
  120 |   await page.goto("/#select");
  121 |   for (const theme of ["浅色", "深色"]) {
  122 |     await page.getByRole("button", { name: theme, exact: true }).click();
  123 |     for (const name of ["普通单选", "普通多选", "搜索单选", "搜索多选"]) {
  124 |       const control = page.getByRole("combobox", { name, exact: true });
  125 |       await control.evaluate((node) => {
  126 |         const root = node.closest('[data-rain-id="ui-select"]') as HTMLElement;
  127 |         root.style.overflow = "hidden";
  128 |       });
  129 |       await control.press("ArrowDown");
  130 |       const panel = popup(control);
  131 |       await expect(panel).toBeVisible();
  132 |       expect(await control.evaluate((node) => node.closest('[data-rain-id="ui-select"]')!.contains(document.querySelector('[data-rain-id="ui-select-popup"]')))).toBe(false);
  133 |       await expect(panel.locator("xpath=..")).toHaveAttribute("data-rain-theme", theme === "浅色" ? "light" : "dark");
  134 |       const anchor = (await frame(control).boundingBox())!, box = (await panel.boundingBox())!;
> 135 |       expect(Math.abs(anchor.width - box.width)).toBeLessThanOrEqual(1);
      |                                                  ^ Error: expect(received).toBeLessThanOrEqual(expected)
  136 |       expect(box.x).toBeGreaterThanOrEqual(8);
  137 |       expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width - 8);
  138 |       expect(box.y + box.height).toBeLessThanOrEqual(page.viewportSize()!.height - 8);
  139 |       if (name === "普通单选") {
  140 |         const first = panel.getByRole("option", { name: "视传 2401", exact: true });
  141 |         await expect(first).toBeFocused();
  142 |         await expect(first).toHaveCSS("outline-style", "solid");
  143 |       }
  144 |       await page.keyboard.press("Escape");
  145 |       await expect(control).toBeFocused();
  146 |     }
  147 |   }
  148 | });
  149 | 
  150 | test("shared field paints, sizes, selected values and focus follow the accepted geometry in both themes", async ({ page }, testInfo) => {
  151 |   await page.setViewportSize({ width: 1600, height: 1100 });
  152 |   await page.goto("/#select");
  153 |   for (const theme of ["浅色", "深色"]) {
  154 |     await page.getByRole("button", { name: theme, exact: true }).click();
  155 |     const placeholderColor = theme === "浅色" ? "rgb(116, 133, 168)" : "rgb(136, 145, 173)";
  156 |     const arrowColor = theme === "浅色" ? "rgb(150, 163, 193)" : "rgb(132, 144, 181)";
  157 |     for (const size of [24, 28, 32, 36]) {
  158 |       const control = page.getByRole("combobox", { name: `${size}px 摘要`, exact: true });
  159 |       await expect(frame(control)).toHaveCSS("height", `${size}px`);
  160 |       await expect(frame(control)).toHaveCSS("padding-left", size === 24 ? "8px" : "12px");
  161 |       await expect(control).toHaveCSS("font-size", size === 24 ? "13px" : "14px");
  162 |       await expect(frame(control).locator('[data-slot="arrow"] .rain-icon')).toHaveCSS("width", size === 24 ? "12px" : "14px");
  163 |       await expect(frame(control).locator('[data-slot="clear-slot"]')).toHaveCSS("width", "24px");
  164 |       await expect(control).toHaveAccessibleDescription(/视传 2401、数媒 2401、工业设计 2401/);
  165 |     }
  166 |     for (const size of [32, 36]) {
  167 |       const control = page.getByRole("combobox", { name: `${size}px 标签`, exact: true });
  168 |       await expect(frame(control)).toHaveCSS("height", `${size + 2}px`);
  169 |       const tags = frame(control).locator('[data-rain-id="ui-tag"]');
  170 |       await expect(tags.first()).toHaveCSS("height", `${size - 8}px`);
  171 |       await expect(tags.first()).toHaveCSS("border-radius", "4px");
  172 |       await expect(tags.first()).toHaveCSS("font-size", "14px");
  173 |       await expect(tags.first()).toHaveCSS("line-height", "20px");
  174 |       await expect(tags.first()).toHaveCSS("padding-left", "6px");
  175 |       await expect(tags.first().locator('[data-slot="remove-action"]')).toHaveCSS("width", "24px");
  176 |     }
  177 |     await expect(frame(page.getByRole("combobox", { name: "紧凑区域默认", exact: true }))).toHaveCSS("height", "24px");
  178 |     for (const appearance of ["描边", "填充", "底线"]) {
  179 |       const input = page.getByRole("textbox", { name: appearance + "输入", exact: true });
  180 |       const control = page.getByRole("combobox", { name: appearance + "选择", exact: true });
  181 |       const empty = page.getByRole("combobox", { name: appearance + "空值", exact: true });
  182 |       await expect(empty.locator('[data-slot="value"] > span')).toHaveCSS("color", placeholderColor);
  183 |       await expect(frame(control).locator('[data-slot="arrow"]')).toHaveCSS("color", arrowColor);
  184 |       await page.mouse.move(0, 0);
  185 |       for (const property of ["height", "padding-left", "background-color", "border-color", "border-radius"]) {
  186 |         const value = await frame(input).evaluate((node, key) => getComputedStyle(node).getPropertyValue(key), property);
  187 |         await expect(frame(control)).toHaveCSS(property, value);
  188 |       }
  189 |       await control.focus();
  190 |       await control.press("Tab");
  191 |       await page.keyboard.press("Shift+Tab");
  192 |       await expect(control).toBeFocused();
  193 |       if (appearance === "底线") {
  194 |         await expect(frame(control)).toHaveCSS("outline-style", "none");
  195 |         await expect(frame(control)).toHaveCSS("box-shadow", "none");
  196 |         await expect(frame(control)).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
  197 |       } else {
  198 |         await expect(frame(control)).toHaveCSS("outline-width", "1px");
  199 |         await expect(frame(control)).toHaveCSS("outline-offset", "0px");
  200 |       }
  201 |       const warning = page.getByRole("combobox", { name: appearance + "警告", exact: true });
  202 |       await warning.click();
  203 |       const search = popup(warning).getByRole("combobox", { name: "搜索选项", exact: true });
  204 |       await expect(search).toBeFocused();
  205 |       await expect.poll(() => search.evaluate((node) => getComputedStyle(node, "::placeholder").color)).toBe(placeholderColor);
  206 |       await expect(frame(warning).locator('[data-slot="arrow"]')).toHaveCSS("color", arrowColor);
  207 |       await expect(frame(search)).toHaveAttribute("data-status", "default");
  208 |       await expect(frame(warning)).toHaveAttribute("data-status", "warning");
  209 |       await search.press("Escape");
  210 |       const readonly = page.getByRole("combobox", { name: appearance + "只读", exact: true });
  211 |       await readonly.focus();
  212 |       await readonly.press("ArrowDown");
  213 |       await expect(readonly).toBeFocused();
  214 |       await expect(readonly).toHaveAttribute("aria-expanded", "false");
  215 |       await expect(page.getByRole("combobox", { name: appearance + "禁用", exact: true })).toBeDisabled();
  216 |     }
  217 |     await page.getByRole("heading", { name: "Select 选择器", exact: true }).click();
  218 |     await page.screenshot({ path: testInfo.outputPath(theme === "浅色" ? "light.png" : "dark.png"), fullPage: true });
  219 |   }
  220 |   const underlined = page.getByRole("combobox", { name: "底线选择", exact: true });
  221 |   await underlined.focus();
  222 |   await underlined.press("Tab");
  223 |   await page.keyboard.press("Shift+Tab");
  224 |   await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  225 |   await expect(frame(underlined)).toHaveCSS("border-bottom-width", "2px");
  226 |   await expect(frame(underlined)).toHaveCSS("outline-style", "none");
  227 |   const outlined = page.getByRole("combobox", { name: "描边选择", exact: true });
  228 |   await outlined.focus();
  229 |   await expect(frame(outlined)).toHaveCSS("outline-width", "2px");
  230 |   await expect(frame(outlined)).toHaveCSS("box-shadow", "none");
  231 | });
  232 | 
  233 | test("keyboard selection, search, max count, clearing and tag removal preserve real focus", async ({ page }) => {
  234 |   await page.goto("/#select");
  235 |   const single = page.getByRole("combobox", { name: "普通单选", exact: true });
```