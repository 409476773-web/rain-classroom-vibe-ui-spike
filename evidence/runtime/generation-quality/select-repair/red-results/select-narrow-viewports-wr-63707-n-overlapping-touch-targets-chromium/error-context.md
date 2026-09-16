# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: select.spec.ts >> narrow viewports wrap tags, retain summaries and expose non-overlapping touch targets
- Location: tests/e2e/select.spec.ts:321:1

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 320
Received:    420
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
          - combobox "普通单选" [ref=e24] [cursor=pointer]:
            - generic [ref=e25]: 请选择
          - textbox [ref=e31]
        - generic [ref=e32]:
          - generic [ref=e33]: 普通多选
          - generic [ref=e34]:
            - generic [ref=e35]:
              - combobox "普通多选" [ref=e36] [cursor=pointer]:
                - generic "视传 2401、数媒 2401" [ref=e38]
              - button "清除普通多选" [ref=e41] [cursor=pointer]
            - generic [ref=e47]: 已选：视传 2401、数媒 2401
          - textbox [ref=e48]
        - generic [ref=e49]:
          - generic [ref=e50]: 搜索单选
          - combobox "搜索单选" [ref=e53] [cursor=pointer]:
            - generic [ref=e54]: 请选择
          - textbox [ref=e60]
        - generic [ref=e61]:
          - generic [ref=e62]: 搜索多选
          - generic [ref=e63]:
            - generic [ref=e64]:
              - combobox "搜索多选" [ref=e65] [cursor=pointer]:
                - generic "视传 2401" [ref=e67]
              - button "清除搜索多选" [ref=e70] [cursor=pointer]
            - generic [ref=e76]: 已选：视传 2401
          - textbox [ref=e77]
    - region [ref=e78]:
      - heading "框内固定标题" [level=2] [ref=e79]
      - paragraph [ref=e80]: 筛选栏把标题和选中内容放在同一行。多选使用单行摘要或数量，超出宽度时保留选中数量；搜索仍在展开面板中进行。
      - generic [ref=e81]:
        - generic [ref=e82]:
          - generic [ref=e83]:
            - generic [ref=e84]:
              - generic "教学班" [ref=e85]
              - combobox "教学班" [ref=e87] [cursor=pointer]:
                - generic "视传 2401" [ref=e89]
              - button "清除教学班" [ref=e91] [cursor=pointer]
            - generic [ref=e97]: 已选：视传 2401
          - textbox [ref=e98]: a
        - generic [ref=e99]:
          - generic [ref=e100]:
            - generic [ref=e101]:
              - generic "授课范围" [ref=e102]
              - combobox "授课范围" [ref=e104] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e106]:
                  - generic [ref=e107]: 视传 2401、数媒 2401
                  - generic [ref=e108]: "+1"
              - button "清除授课范围" [ref=e110] [cursor=pointer]
            - generic [ref=e116]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e117]
      - generic [ref=e118]: "<FormItem label=\"教学班\" labelPosition=\"inside\"> <Select size={32} options={options} /> </FormItem>"
    - region [ref=e119]:
      - heading "Input 与 Select 外观对照" [level=2] [ref=e120]
      - paragraph [ref=e121]: 下方 Input 用于并排比较描边、填充与底线；单位、内部按钮和搜索等完整用法统一在 Input 详情页。
      - link "查看 Input 全部用法" [ref=e122] [cursor=pointer]:
        - /url: "#input"
      - generic [ref=e124]:
        - generic [ref=e125]:
          - heading "描边" [level=3] [ref=e126]
          - generic [ref=e127]:
            - generic [ref=e128]: 描边输入
            - generic [ref=e129]:
              - textbox "描边输入" [ref=e130]: 人工智能导论
              - button "清除描边输入" [ref=e132] [cursor=pointer]
          - generic [ref=e135]:
            - generic [ref=e136]: 描边选择
            - generic [ref=e137]:
              - generic [ref=e138]:
                - combobox "描边选择" [ref=e139] [cursor=pointer]:
                  - generic "视传 2401" [ref=e141]
                - button "清除描边选择" [ref=e143] [cursor=pointer]
              - generic [ref=e149]: 已选：视传 2401
            - textbox [ref=e150]: a
          - generic [ref=e151]:
            - generic [ref=e152]: 描边空值
            - combobox "描边空值" [ref=e155] [cursor=pointer]:
              - generic [ref=e156]: 请选择
            - textbox [ref=e162]
          - generic [ref=e163]:
            - generic [ref=e164]: 描边警告
            - generic [ref=e165]:
              - generic [ref=e166]:
                - combobox "描边警告" [ref=e167] [cursor=pointer]:
                  - generic "视传 2401" [ref=e169]
                - button "清除描边警告" [ref=e171] [cursor=pointer]
              - generic [ref=e177]: 已选：视传 2401
            - textbox [ref=e178]: a
            - generic [ref=e179]: 请核对授课范围
          - generic [ref=e180]:
            - generic [ref=e181]:
              - text: 描边错误
              - generic [ref=e182]: "*"
            - combobox "描边错误" [invalid] [ref=e185] [cursor=pointer]:
              - generic [ref=e186]: 请选择
            - textbox [ref=e192]
            - generic [ref=e193]: 请选择有效教学班
          - generic [ref=e194]:
            - generic [ref=e195]: 描边只读
            - generic [ref=e196]:
              - combobox "描边只读" [disabled] [ref=e198]:
                - generic "视传 2401" [ref=e200]
              - generic [ref=e204]: 已选：视传 2401
            - textbox [ref=e205]: a
          - generic [ref=e206]:
            - generic [ref=e207]: 描边禁用
            - generic [ref=e208]:
              - combobox "描边禁用" [disabled] [ref=e210]:
                - generic "视传 2401" [ref=e212]
              - generic [ref=e216]: 已选：视传 2401
            - textbox [disabled] [ref=e217]: a
        - generic [ref=e218]:
          - heading "填充" [level=3] [ref=e219]
          - generic [ref=e220]:
            - generic [ref=e221]: 填充输入
            - generic [ref=e222]:
              - textbox "填充输入" [ref=e223]: 人工智能导论
              - button "清除填充输入" [ref=e225] [cursor=pointer]
          - generic [ref=e228]:
            - generic [ref=e229]: 填充选择
            - generic [ref=e230]:
              - generic [ref=e231]:
                - combobox "填充选择" [ref=e232] [cursor=pointer]:
                  - generic "视传 2401" [ref=e234]
                - button "清除填充选择" [ref=e236] [cursor=pointer]
              - generic [ref=e242]: 已选：视传 2401
            - textbox [ref=e243]: a
          - generic [ref=e244]:
            - generic [ref=e245]: 填充空值
            - combobox "填充空值" [ref=e248] [cursor=pointer]:
              - generic [ref=e249]: 请选择
            - textbox [ref=e255]
          - generic [ref=e256]:
            - generic [ref=e257]: 填充警告
            - generic [ref=e258]:
              - generic [ref=e259]:
                - combobox "填充警告" [ref=e260] [cursor=pointer]:
                  - generic "视传 2401" [ref=e262]
                - button "清除填充警告" [ref=e264] [cursor=pointer]
              - generic [ref=e270]: 已选：视传 2401
            - textbox [ref=e271]: a
            - generic [ref=e272]: 请核对授课范围
          - generic [ref=e273]:
            - generic [ref=e274]:
              - text: 填充错误
              - generic [ref=e275]: "*"
            - combobox "填充错误" [invalid] [ref=e278] [cursor=pointer]:
              - generic [ref=e279]: 请选择
            - textbox [ref=e285]
            - generic [ref=e286]: 请选择有效教学班
          - generic [ref=e287]:
            - generic [ref=e288]: 填充只读
            - generic [ref=e289]:
              - combobox "填充只读" [disabled] [ref=e291]:
                - generic "视传 2401" [ref=e293]
              - generic [ref=e297]: 已选：视传 2401
            - textbox [ref=e298]: a
          - generic [ref=e299]:
            - generic [ref=e300]: 填充禁用
            - generic [ref=e301]:
              - combobox "填充禁用" [disabled] [ref=e303]:
                - generic "视传 2401" [ref=e305]
              - generic [ref=e309]: 已选：视传 2401
            - textbox [disabled] [ref=e310]: a
        - generic [ref=e311]:
          - heading "底线" [level=3] [ref=e312]
          - generic [ref=e313]:
            - generic [ref=e314]: 底线输入
            - generic [ref=e315]:
              - textbox "底线输入" [ref=e316]: 人工智能导论
              - button "清除底线输入" [ref=e318] [cursor=pointer]
          - generic [ref=e321]:
            - generic [ref=e322]: 底线选择
            - generic [ref=e323]:
              - generic [ref=e324]:
                - combobox "底线选择" [ref=e325] [cursor=pointer]:
                  - generic "视传 2401" [ref=e327]
                - button "清除底线选择" [ref=e329] [cursor=pointer]
              - generic [ref=e335]: 已选：视传 2401
            - textbox [ref=e336]: a
          - generic [ref=e337]:
            - generic [ref=e338]: 底线空值
            - combobox "底线空值" [ref=e341] [cursor=pointer]:
              - generic [ref=e342]: 请选择
            - textbox [ref=e348]
          - generic [ref=e349]:
            - generic [ref=e350]: 底线警告
            - generic [ref=e351]:
              - generic [ref=e352]:
                - combobox "底线警告" [ref=e353] [cursor=pointer]:
                  - generic "视传 2401" [ref=e355]
                - button "清除底线警告" [ref=e357] [cursor=pointer]
              - generic [ref=e363]: 已选：视传 2401
            - textbox [ref=e364]: a
            - generic [ref=e365]: 请核对授课范围
          - generic [ref=e366]:
            - generic [ref=e367]:
              - text: 底线错误
              - generic [ref=e368]: "*"
            - combobox "底线错误" [invalid] [ref=e371] [cursor=pointer]:
              - generic [ref=e372]: 请选择
            - textbox [ref=e378]
            - generic [ref=e379]: 请选择有效教学班
          - generic [ref=e380]:
            - generic [ref=e381]: 底线只读
            - generic [ref=e382]:
              - combobox "底线只读" [disabled] [ref=e384]:
                - generic "视传 2401" [ref=e386]
              - generic [ref=e390]: 已选：视传 2401
            - textbox [ref=e391]: a
          - generic [ref=e392]:
            - generic [ref=e393]: 底线禁用
            - generic [ref=e394]:
              - combobox "底线禁用" [disabled] [ref=e396]:
                - generic "视传 2401" [ref=e398]
              - generic [ref=e402]: 已选：视传 2401
            - textbox [disabled] [ref=e403]: a
    - region [ref=e404]:
      - heading "尺寸、摘要与标签" [level=2] [ref=e405]
      - generic [ref=e406]:
        - generic [ref=e407]:
          - generic [ref=e408]: 24px 摘要
          - generic [ref=e409]:
            - generic [ref=e410]:
              - combobox "24px 摘要" [ref=e411] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e413]:
                  - generic [ref=e414]: 视传 2401、数媒 2401
                  - generic [ref=e415]: "+1"
              - button "清除24px 摘要" [ref=e417] [cursor=pointer]
            - generic [ref=e423]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e424]
        - generic [ref=e425]:
          - generic [ref=e426]: 28px 摘要
          - generic [ref=e427]:
            - generic [ref=e428]:
              - combobox "28px 摘要" [ref=e429] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e431]:
                  - generic [ref=e432]: 视传 2401、数媒 2401
                  - generic [ref=e433]: "+1"
              - button "清除28px 摘要" [ref=e435] [cursor=pointer]
            - generic [ref=e441]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e442]
        - generic [ref=e443]:
          - generic [ref=e444]: 32px 摘要
          - generic [ref=e445]:
            - generic [ref=e446]:
              - combobox "32px 摘要" [ref=e447] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e449]:
                  - generic [ref=e450]: 视传 2401、数媒 2401
                  - generic [ref=e451]: "+1"
              - button "清除32px 摘要" [ref=e453] [cursor=pointer]
            - generic [ref=e459]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e460]
        - generic [ref=e461]:
          - generic [ref=e462]: 36px 摘要
          - generic [ref=e463]:
            - generic [ref=e464]:
              - combobox "36px 摘要" [ref=e465] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e467]:
                  - generic [ref=e468]: 视传 2401、数媒 2401
                  - generic [ref=e469]: "+1"
              - button "清除36px 摘要" [ref=e471] [cursor=pointer]
            - generic [ref=e477]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e478]
        - generic [ref=e479]:
          - generic [ref=e480]: 32px 标签
          - generic [ref=e481]:
            - generic [ref=e482]:
              - generic [ref=e483]:
                - generic "视传 2401" [ref=e485]:
                  - button "移除 视传 2401" [ref=e488] [cursor=pointer]
                - generic "数媒 2401" [ref=e492]:
                  - button "移除 数媒 2401" [ref=e495] [cursor=pointer]
              - combobox "32px 标签" [ref=e498] [cursor=pointer]
              - button "清除32px 标签" [ref=e503] [cursor=pointer]
            - generic [ref=e506]: 已选：视传 2401、数媒 2401
          - textbox [ref=e507]
        - generic [ref=e508]:
          - generic [ref=e509]: 36px 标签
          - generic [ref=e510]:
            - generic [ref=e511]:
              - generic [ref=e512]:
                - generic "视传 2401" [ref=e514]:
                  - button "移除 视传 2401" [ref=e517] [cursor=pointer]
                - generic "数媒 2401" [ref=e521]:
                  - button "移除 数媒 2401" [ref=e524] [cursor=pointer]
              - combobox "36px 标签" [ref=e527] [cursor=pointer]
              - button "清除36px 标签" [ref=e532] [cursor=pointer]
            - generic [ref=e535]: 已选：视传 2401、数媒 2401
          - textbox [ref=e536]
        - generic [ref=e537]:
          - generic [ref=e538]: 长名称摘要
          - generic [ref=e539]:
            - generic [ref=e540]:
              - combobox "长名称摘要" [ref=e541] [cursor=pointer]:
                - generic "跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401" [ref=e543]: 已选 3 项
              - button "清除长名称摘要" [ref=e546] [cursor=pointer]
            - generic [ref=e552]: 已选：跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401
          - textbox [ref=e553]
        - generic [ref=e554]:
          - generic [ref=e555]: 长名称标签
          - generic [ref=e556]:
            - generic [ref=e557]:
              - generic [ref=e558]:
                - generic "跨学院人工智能与数字媒体设计联合实验教学班" [ref=e560]:
                  - button "移除 跨学院人工智能与数字媒体设计联合实验教学班" [ref=e563] [cursor=pointer]
                - generic "数媒 2401" [ref=e567]:
                  - button "移除 数媒 2401" [ref=e570] [cursor=pointer]
                - generic "工业设计 2401" [ref=e574]:
                  - button "移除 工业设计 2401" [ref=e577] [cursor=pointer]
              - combobox "长名称标签" [ref=e580] [cursor=pointer]
              - button "清除长名称标签" [ref=e585] [cursor=pointer]
            - generic [ref=e588]: 已选：跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401
          - textbox [ref=e589]
        - generic [ref=e590]:
          - generic [ref=e591]: 仅显示数量
          - generic [ref=e592]:
            - generic [ref=e593]:
              - combobox "仅显示数量" [ref=e594] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e596]: 已选 3 项
              - button "清除仅显示数量" [ref=e599] [cursor=pointer]
            - generic [ref=e605]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e606]
        - generic [ref=e607]:
          - generic [ref=e608]: 最多选择两项
          - generic [ref=e609]:
            - generic [ref=e610]:
              - combobox "最多选择两项" [ref=e611] [cursor=pointer]:
                - generic "视传 2401、数媒 2401" [ref=e613]
              - button "清除最多选择两项" [ref=e616] [cursor=pointer]
            - generic [ref=e622]: 已选：视传 2401、数媒 2401
          - textbox [ref=e623]
        - generic [ref=e625]:
          - generic [ref=e626]: 紧凑区域默认
          - generic [ref=e627]:
            - generic [ref=e628]:
              - combobox "紧凑区域默认" [ref=e629] [cursor=pointer]:
                - generic "视传 2401" [ref=e631]
              - button "清除紧凑区域默认" [ref=e633] [cursor=pointer]
            - generic [ref=e639]: 已选：视传 2401
          - textbox [ref=e640]: a
        - generic [ref=e641]:
          - generic [ref=e642]: 资料尚未返回
          - generic [ref=e643]:
            - generic [ref=e644]:
              - combobox "资料尚未返回" [ref=e645] [cursor=pointer]:
                - generic "waiting-id" [ref=e647]
              - button "清除资料尚未返回" [ref=e650] [cursor=pointer]
            - generic [ref=e656]: 已选：waiting-id
          - textbox [ref=e657]
    - region [ref=e658]:
      - heading "候选数据与表单草稿" [level=2] [ref=e659]
      - generic [ref=e660]:
        - generic [ref=e662]:
          - generic [ref=e663]: 远程教学班
          - generic [ref=e664]:
            - generic [ref=e665]:
              - combobox "远程教学班" [ref=e666] [cursor=pointer]:
                - generic "视传 2401" [ref=e668]
              - button "清除远程教学班" [ref=e671] [cursor=pointer]
            - generic [ref=e677]: 已选：视传 2401
          - textbox [ref=e678]
          - generic [ref=e679]: 模拟数据：A 较慢，B 较快；搜索“失败”可体验重试。
        - generic [ref=e680]:
          - generic [ref=e681]:
            - generic [ref=e682]: 课程教学班
            - generic [ref=e683]:
              - generic [ref=e684]:
                - combobox "课程教学班" [ref=e685] [cursor=pointer]:
                  - generic "视传 2401" [ref=e687]
                - button "清除课程教学班" [ref=e690] [cursor=pointer]
              - generic [ref=e696]: 已选：视传 2401
            - textbox [ref=e697]
            - generic [ref=e698]: 选择先进入当前表单草稿，保存后更新记录。
          - generic [ref=e699]:
            - button "保存修改" [ref=e700] [cursor=pointer]
            - button "取消修改" [ref=e702] [cursor=pointer]
          - paragraph [ref=e704]: 已保存：视传 2401
        - generic [ref=e705]:
          - generic [ref=e706]: 暂无选项
          - combobox "暂无选项" [ref=e709] [cursor=pointer]:
            - generic [ref=e710]: 请选择
          - textbox [ref=e716]
        - generic [ref=e717]:
          - generic [ref=e718]: 正在加载
          - generic [ref=e719]:
            - generic [ref=e720]:
              - combobox "正在加载" [ref=e721] [cursor=pointer]:
                - generic "视传 2401" [ref=e723]
              - button "清除正在加载" [ref=e725] [cursor=pointer]
            - generic [ref=e731]: 已选：视传 2401
          - textbox [ref=e732]: a
    - region [ref=e733]:
      - heading "独立浅色区域" [level=2] [ref=e734]
      - generic [ref=e735]:
        - generic [ref=e736]: 嵌套浅色
        - generic [ref=e737]:
          - generic [ref=e738]:
            - generic [ref=e739]:
              - generic "视传 2401" [ref=e741]:
                - button "移除 视传 2401" [ref=e744] [cursor=pointer]
              - generic "数媒 2401" [ref=e748]:
                - button "移除 数媒 2401" [ref=e751] [cursor=pointer]
            - combobox "嵌套浅色" [ref=e754] [cursor=pointer]
            - button "清除嵌套浅色" [ref=e759] [cursor=pointer]
          - generic [ref=e762]: 已选：视传 2401、数媒 2401
        - textbox [ref=e763]
    - paragraph [ref=e764]: 当前为组件检查版，选项区已接入正式浮层、菜单内容与 Tag。当前真实组件视觉已完成人工验收；颜色与真实设备核验单独保留。
```

# Test source

```ts
  227 |   const outlined = page.getByRole("combobox", { name: "描边选择", exact: true });
  228 |   await outlined.focus();
  229 |   await expect(frame(outlined)).toHaveCSS("outline-width", "2px");
  230 |   await expect(frame(outlined)).toHaveCSS("box-shadow", "none");
  231 | });
  232 | 
  233 | test("keyboard selection, search, max count, clearing and tag removal preserve real focus", async ({ page }) => {
  234 |   await page.goto("/#select");
  235 |   const single = page.getByRole("combobox", { name: "普通单选", exact: true });
  236 |   await single.press("ArrowDown");
  237 |   const list = popup(single).getByRole("listbox");
  238 |   await expect(popup(single).getByRole("option", { name: "视传 2401", exact: true })).toBeFocused();
  239 |   await page.keyboard.press("End");
  240 |   await expect(popup(single).getByRole("option", { name: "跨学院人工智能与数字媒体设计联合实验教学班", exact: true })).toBeFocused();
  241 |   await page.keyboard.press("Enter");
  242 |   await expect(single).toBeFocused();
  243 |   await expect(single).toHaveText("跨学院人工智能与数字媒体设计联合实验教学班");
  244 |   const before = await frame(single).boundingBox();
  245 |   await single.press("Tab");
  246 |   const clear = widget(single).getByRole("button", { name: "清除普通单选", exact: true });
  247 |   await expect(clear).toBeFocused();
  248 |   await clear.press("Enter");
  249 |   await expect(single).toBeFocused();
  250 |   expect(await frame(single).boundingBox()).toEqual(before);
  251 |   const searchable = page.getByRole("combobox", { name: "搜索多选", exact: true });
  252 |   await searchable.click();
  253 |   const search = popup(searchable).getByRole("combobox", { name: "搜索选项", exact: true });
  254 |   await search.fill("数字媒体");
  255 |   await expect(popup(searchable).getByRole("option")).toHaveCount(2);
  256 |   await search.press("Home");
  257 |   await search.press("Enter");
  258 |   await expect(popup(searchable).getByRole("option").first()).toHaveAttribute("aria-selected", "true");
  259 |   await search.press("Escape");
  260 |   await expect(searchable).toBeFocused();
  261 |   await searchable.click();
  262 |   await expect(search).toHaveValue("");
  263 |   await search.press("Escape");
  264 |   const max = page.getByRole("combobox", { name: "最多选择两项", exact: true });
  265 |   await max.click();
  266 |   const menu = popup(max);
  267 |   await expect(menu.getByRole("option", { name: "工业设计 2401", exact: true })).toHaveAttribute("aria-disabled", "true");
  268 |   await menu.getByRole("option", { name: "视传 2401", exact: true }).click();
  269 |   await expect(menu.getByRole("option", { name: "工业设计 2401", exact: true })).not.toHaveAttribute("aria-disabled", "true");
  270 |   await menu.getByRole("listbox").press("Escape");
  271 |   const tags = widget(page.getByRole("combobox", { name: "32px 标签", exact: true }));
  272 |   const remove = tags.getByRole("button", { name: "移除 视传 2401", exact: true });
  273 |   await remove.focus();
  274 |   await remove.press("Enter");
  275 |   await expect(tags.getByRole("button", { name: "移除 数媒 2401", exact: true })).toBeFocused();
  276 |   await tags.getByRole("button", { name: "移除 数媒 2401", exact: true }).press("Enter");
  277 |   await expect(tags.getByRole("combobox", { name: "32px 标签", exact: true })).toBeFocused();
  278 |   const empty = page.getByRole("combobox", { name: "暂无选项", exact: true });
  279 |   await empty.click();
  280 |   await expect(popup(empty).getByText("暂无选项", { exact: true })).toBeVisible();
  281 |   await page.getByRole("heading", { name: "Select 选择器", exact: true }).click();
  282 |   await expect(empty).toHaveAttribute("aria-expanded", "false");
  283 | });
  284 | 
  285 | test("remote results, retry and form drafts keep selected metadata and pending edits separate", async ({ page }) => {
  286 |   await page.clock.install();
  287 |   await page.goto("/#select");
  288 |   const remote = page.getByRole("combobox", { name: "远程教学班", exact: true });
  289 |   await remote.click();
  290 |   const search = popup(remote).getByRole("combobox", { name: "搜索选项", exact: true });
  291 |   await search.fill("A");
  292 |   await page.clock.runFor(50);
  293 |   await search.fill("B");
  294 |   await page.clock.runFor(200);
  295 |   await expect(popup(remote).getByRole("option", { name: "B 班", exact: true })).toBeVisible();
  296 |   await page.clock.runFor(1000);
  297 |   await expect(popup(remote).getByRole("option")).toHaveCount(1);
  298 |   await expect(remote).toHaveAccessibleDescription(/视传 2401/);
  299 |   await search.fill("失败");
  300 |   await page.clock.runFor(200);
  301 |   await expect(popup(remote).getByText("加载失败，请重试", { exact: true })).toBeVisible();
  302 |   await popup(remote).getByRole("button", { name: "重试", exact: true }).click();
  303 |   await page.clock.runFor(200);
  304 |   await expect(popup(remote).getByRole("option", { name: "恢复后的班级", exact: true })).toBeVisible();
  305 |   await search.press("Escape");
  306 |   const draft = page.getByTestId("select-draft");
  307 |   const control = draft.getByRole("combobox", { name: "课程教学班", exact: true });
  308 |   await control.click();
  309 |   await popup(control).getByRole("option", { name: /数媒 2401/ }).click();
  310 |   await popup(control).getByRole("listbox").press("Escape");
  311 |   await expect(page.getByTestId("select-saved")).toHaveText("已保存：视传 2401");
  312 |   await draft.getByRole("button", { name: "取消修改", exact: true }).click();
  313 |   await expect(control).toHaveAccessibleDescription(/已选：视传 2401$/);
  314 |   await control.click();
  315 |   await popup(control).getByRole("option", { name: /数媒 2401/ }).click();
  316 |   await popup(control).getByRole("listbox").press("Escape");
  317 |   await draft.getByRole("button", { name: "保存修改", exact: true }).click();
  318 |   await expect(page.getByTestId("select-saved")).toHaveText("已保存：视传 2401、数媒 2401");
  319 | });
  320 | 
  321 | test("narrow viewports wrap tags, retain summaries and expose non-overlapping touch targets", async ({ browser, baseURL }, testInfo) => {
  322 |   const context = await browser.newContext({ baseURL, viewport: { width: 360, height: 844 }, isMobile: true, hasTouch: true });
  323 |   const page = await context.newPage();
  324 |   await page.goto("/#select");
  325 |   for (const width of [320, 360, 736]) {
  326 |     await page.setViewportSize({ width, height: 844 });
> 327 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      |                                                                             ^ Error: expect(received).toBeLessThanOrEqual(expected)
  328 |     expect(await page.evaluate(() => innerWidth)).toBe(width);
  329 |     const long = page.getByRole("combobox", { name: "长名称摘要", exact: true });
  330 |     await expect(long).toHaveAccessibleDescription(/跨学院人工智能与数字媒体设计联合实验教学班/);
  331 |     const control = page.getByRole("combobox", { name: "长名称标签", exact: true });
  332 |     const targets = frame(control).locator("button");
  333 |     const boxes = await targets.evaluateAll((nodes) => nodes.map((node) => { const { x, y, width, height } = node.getBoundingClientRect(); return { x, y, width, height }; }));
  334 |     for (let i = 0; i < boxes.length; i++) {
  335 |       const a = boxes[i]!;
  336 |       expect(a.width).toBeGreaterThanOrEqual(44); expect(a.height).toBeGreaterThanOrEqual(44);
  337 |       for (const b of boxes.slice(i + 1)) expect(Math.min(a.x + a.width, b.x + b.width) <= Math.max(a.x, b.x) || Math.min(a.y + a.height, b.y + b.height) <= Math.max(a.y, b.y)).toBe(true);
  338 |     }
  339 |     await expect(widget(control).getByRole("button", { name: "清除长名称标签", exact: true })).toHaveCSS("opacity", "1");
  340 |     const searchable = page.getByRole("combobox", { name: "搜索多选", exact: true });
  341 |     await searchable.tap();
  342 |     const search = popup(searchable).getByRole("combobox", { name: "搜索选项", exact: true });
  343 |     await search.fill("视传");
  344 |     expect((await popup(searchable).getByRole("option").first().boundingBox())!.height).toBeGreaterThanOrEqual(44);
  345 |     const clearSearch = frame(search).getByRole("button", { name: "清除搜索选项", exact: true });
  346 |     await expect(frame(search)).toHaveCSS("height", "32px");
  347 |     await expect(clearSearch).toHaveCSS("width", "24px");
  348 |     await expect(clearSearch).toHaveCSS("height", "24px");
  349 |     const searchBox = (await frame(search).boundingBox())!, clearBox = (await clearSearch.boundingBox())!;
  350 |     expect(clearBox.y).toBeGreaterThanOrEqual(searchBox.y);
  351 |     expect(clearBox.y + clearBox.height).toBeLessThanOrEqual(searchBox.y + searchBox.height);
  352 |     await clearSearch.tap();
  353 |     await expect(search).toHaveValue("");
  354 |     await expect(search).toBeFocused();
  355 |     await expect(searchable).toHaveAccessibleDescription(/视传 2401/);
  356 |     await search.press("Escape");
  357 |   }
  358 |   await page.setViewportSize({ width: 360, height: 844 });
  359 |   await page.screenshot({ path: testInfo.outputPath("compact.png"), fullPage: true });
  360 |   await context.close();
  361 | });
  362 | 
```