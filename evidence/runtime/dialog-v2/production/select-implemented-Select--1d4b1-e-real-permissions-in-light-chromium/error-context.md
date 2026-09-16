# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: select.spec.ts >> implemented Select placeholders and option descriptions preserve real permissions in light
- Location: tests/e2e/select.spec.ts:9:49

# Error details

```
Error: page.evaluate: TypeError: Failed to fetch dynamically imported module: http://127.0.0.1:5195/node_modules/.vite/deps/react.js
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
      - heading "Input 与 Select 外观对照" [level=2] [ref=e79]
      - paragraph [ref=e80]: 下方 Input 用于并排比较描边、填充与底线；单位、内部按钮和搜索等完整用法统一在 Input 详情页。
      - link "查看 Input 全部用法" [ref=e81] [cursor=pointer]:
        - /url: "#input"
      - generic [ref=e83]:
        - generic [ref=e84]:
          - heading "描边" [level=3] [ref=e85]
          - generic [ref=e86]:
            - generic [ref=e87]: 描边输入
            - textbox "描边输入" [ref=e89]: 人工智能导论
          - generic [ref=e91]:
            - generic [ref=e92]: 描边选择
            - generic [ref=e93]:
              - generic [ref=e94]:
                - combobox "描边选择" [ref=e95] [cursor=pointer]:
                  - generic "视传 2401" [ref=e97]
                - button "清除描边选择" [ref=e99] [cursor=pointer]
              - generic [ref=e105]: 已选：视传 2401
            - textbox [ref=e106]: a
          - generic [ref=e107]:
            - generic [ref=e108]: 描边空值
            - combobox "描边空值" [ref=e111] [cursor=pointer]:
              - generic [ref=e112]: 请选择
            - textbox [ref=e118]
          - generic [ref=e119]:
            - generic [ref=e120]: 描边警告
            - generic [ref=e121]:
              - generic [ref=e122]:
                - combobox "描边警告" [ref=e123] [cursor=pointer]:
                  - generic "视传 2401" [ref=e125]
                - button "清除描边警告" [ref=e127] [cursor=pointer]
              - generic [ref=e133]: 已选：视传 2401
            - textbox [ref=e134]: a
            - generic [ref=e135]: 请核对授课范围
          - generic [ref=e136]:
            - generic [ref=e137]:
              - text: 描边错误
              - generic [ref=e138]: "*"
            - combobox "描边错误" [invalid] [ref=e141] [cursor=pointer]:
              - generic [ref=e142]: 请选择
            - textbox [ref=e148]
            - generic [ref=e149]: 请选择有效教学班
          - generic [ref=e150]:
            - generic [ref=e151]: 描边只读
            - generic [ref=e152]:
              - combobox "描边只读" [disabled] [ref=e154]:
                - generic "视传 2401" [ref=e156]
              - generic [ref=e160]: 已选：视传 2401
            - textbox [ref=e161]: a
          - generic [ref=e162]:
            - generic [ref=e163]: 描边禁用
            - generic [ref=e164]:
              - combobox "描边禁用" [disabled] [ref=e166]:
                - generic "视传 2401" [ref=e168]
              - generic [ref=e172]: 已选：视传 2401
            - textbox [disabled] [ref=e173]: a
        - generic [ref=e174]:
          - heading "填充" [level=3] [ref=e175]
          - generic [ref=e176]:
            - generic [ref=e177]: 填充输入
            - textbox "填充输入" [ref=e179]: 人工智能导论
          - generic [ref=e181]:
            - generic [ref=e182]: 填充选择
            - generic [ref=e183]:
              - generic [ref=e184]:
                - combobox "填充选择" [ref=e185] [cursor=pointer]:
                  - generic "视传 2401" [ref=e187]
                - button "清除填充选择" [ref=e189] [cursor=pointer]
              - generic [ref=e195]: 已选：视传 2401
            - textbox [ref=e196]: a
          - generic [ref=e197]:
            - generic [ref=e198]: 填充空值
            - combobox "填充空值" [ref=e201] [cursor=pointer]:
              - generic [ref=e202]: 请选择
            - textbox [ref=e208]
          - generic [ref=e209]:
            - generic [ref=e210]: 填充警告
            - generic [ref=e211]:
              - generic [ref=e212]:
                - combobox "填充警告" [ref=e213] [cursor=pointer]:
                  - generic "视传 2401" [ref=e215]
                - button "清除填充警告" [ref=e217] [cursor=pointer]
              - generic [ref=e223]: 已选：视传 2401
            - textbox [ref=e224]: a
            - generic [ref=e225]: 请核对授课范围
          - generic [ref=e226]:
            - generic [ref=e227]:
              - text: 填充错误
              - generic [ref=e228]: "*"
            - combobox "填充错误" [invalid] [ref=e231] [cursor=pointer]:
              - generic [ref=e232]: 请选择
            - textbox [ref=e238]
            - generic [ref=e239]: 请选择有效教学班
          - generic [ref=e240]:
            - generic [ref=e241]: 填充只读
            - generic [ref=e242]:
              - combobox "填充只读" [disabled] [ref=e244]:
                - generic "视传 2401" [ref=e246]
              - generic [ref=e250]: 已选：视传 2401
            - textbox [ref=e251]: a
          - generic [ref=e252]:
            - generic [ref=e253]: 填充禁用
            - generic [ref=e254]:
              - combobox "填充禁用" [disabled] [ref=e256]:
                - generic "视传 2401" [ref=e258]
              - generic [ref=e262]: 已选：视传 2401
            - textbox [disabled] [ref=e263]: a
        - generic [ref=e264]:
          - heading "底线" [level=3] [ref=e265]
          - generic [ref=e266]:
            - generic [ref=e267]: 底线输入
            - textbox "底线输入" [ref=e269]: 人工智能导论
          - generic [ref=e271]:
            - generic [ref=e272]: 底线选择
            - generic [ref=e273]:
              - generic [ref=e274]:
                - combobox "底线选择" [ref=e275] [cursor=pointer]:
                  - generic "视传 2401" [ref=e277]
                - button "清除底线选择" [ref=e279] [cursor=pointer]
              - generic [ref=e285]: 已选：视传 2401
            - textbox [ref=e286]: a
          - generic [ref=e287]:
            - generic [ref=e288]: 底线空值
            - combobox "底线空值" [ref=e291] [cursor=pointer]:
              - generic [ref=e292]: 请选择
            - textbox [ref=e298]
          - generic [ref=e299]:
            - generic [ref=e300]: 底线警告
            - generic [ref=e301]:
              - generic [ref=e302]:
                - combobox "底线警告" [ref=e303] [cursor=pointer]:
                  - generic "视传 2401" [ref=e305]
                - button "清除底线警告" [ref=e307] [cursor=pointer]
              - generic [ref=e313]: 已选：视传 2401
            - textbox [ref=e314]: a
            - generic [ref=e315]: 请核对授课范围
          - generic [ref=e316]:
            - generic [ref=e317]:
              - text: 底线错误
              - generic [ref=e318]: "*"
            - combobox "底线错误" [invalid] [ref=e321] [cursor=pointer]:
              - generic [ref=e322]: 请选择
            - textbox [ref=e328]
            - generic [ref=e329]: 请选择有效教学班
          - generic [ref=e330]:
            - generic [ref=e331]: 底线只读
            - generic [ref=e332]:
              - combobox "底线只读" [disabled] [ref=e334]:
                - generic "视传 2401" [ref=e336]
              - generic [ref=e340]: 已选：视传 2401
            - textbox [ref=e341]: a
          - generic [ref=e342]:
            - generic [ref=e343]: 底线禁用
            - generic [ref=e344]:
              - combobox "底线禁用" [disabled] [ref=e346]:
                - generic "视传 2401" [ref=e348]
              - generic [ref=e352]: 已选：视传 2401
            - textbox [disabled] [ref=e353]: a
    - region [ref=e354]:
      - heading "尺寸、摘要与标签" [level=2] [ref=e355]
      - generic [ref=e356]:
        - generic [ref=e357]:
          - generic [ref=e358]: 24px 摘要
          - generic [ref=e359]:
            - generic [ref=e360]:
              - combobox "24px 摘要" [ref=e361] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e363]:
                  - generic [ref=e364]: 视传 2401、数媒 2401
                  - generic [ref=e365]: "+1"
              - button "清除24px 摘要" [ref=e367] [cursor=pointer]
            - generic [ref=e373]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e374]
        - generic [ref=e375]:
          - generic [ref=e376]: 28px 摘要
          - generic [ref=e377]:
            - generic [ref=e378]:
              - combobox "28px 摘要" [ref=e379] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e381]:
                  - generic [ref=e382]: 视传 2401、数媒 2401
                  - generic [ref=e383]: "+1"
              - button "清除28px 摘要" [ref=e385] [cursor=pointer]
            - generic [ref=e391]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e392]
        - generic [ref=e393]:
          - generic [ref=e394]: 32px 摘要
          - generic [ref=e395]:
            - generic [ref=e396]:
              - combobox "32px 摘要" [ref=e397] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e399]:
                  - generic [ref=e400]: 视传 2401、数媒 2401
                  - generic [ref=e401]: "+1"
              - button "清除32px 摘要" [ref=e403] [cursor=pointer]
            - generic [ref=e409]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e410]
        - generic [ref=e411]:
          - generic [ref=e412]: 36px 摘要
          - generic [ref=e413]:
            - generic [ref=e414]:
              - combobox "36px 摘要" [ref=e415] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e417]:
                  - generic [ref=e418]: 视传 2401、数媒 2401
                  - generic [ref=e419]: "+1"
              - button "清除36px 摘要" [ref=e421] [cursor=pointer]
            - generic [ref=e427]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e428]
        - generic [ref=e429]:
          - generic [ref=e430]: 32px 标签
          - generic [ref=e431]:
            - generic [ref=e432]:
              - generic [ref=e433]:
                - generic "视传 2401" [ref=e435]:
                  - button "移除 视传 2401" [ref=e438] [cursor=pointer]
                - generic "数媒 2401" [ref=e442]:
                  - button "移除 数媒 2401" [ref=e445] [cursor=pointer]
              - combobox "32px 标签" [ref=e448] [cursor=pointer]
              - button "清除32px 标签" [ref=e453] [cursor=pointer]
            - generic [ref=e456]: 已选：视传 2401、数媒 2401
          - textbox [ref=e457]
        - generic [ref=e458]:
          - generic [ref=e459]: 36px 标签
          - generic [ref=e460]:
            - generic [ref=e461]:
              - generic [ref=e462]:
                - generic "视传 2401" [ref=e464]:
                  - button "移除 视传 2401" [ref=e467] [cursor=pointer]
                - generic "数媒 2401" [ref=e471]:
                  - button "移除 数媒 2401" [ref=e474] [cursor=pointer]
              - combobox "36px 标签" [ref=e477] [cursor=pointer]
              - button "清除36px 标签" [ref=e482] [cursor=pointer]
            - generic [ref=e485]: 已选：视传 2401、数媒 2401
          - textbox [ref=e486]
        - generic [ref=e487]:
          - generic [ref=e488]: 长名称摘要
          - generic [ref=e489]:
            - generic [ref=e490]:
              - combobox "长名称摘要" [ref=e491] [cursor=pointer]:
                - generic "跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401" [ref=e493]:
                  - generic [ref=e494]: 跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401
                  - generic [ref=e495]: "+1"
              - button "清除长名称摘要" [ref=e497] [cursor=pointer]
            - generic [ref=e503]: 已选：跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401
          - textbox [ref=e504]
        - generic [ref=e505]:
          - generic [ref=e506]: 长名称标签
          - generic [ref=e507]:
            - generic [ref=e508]:
              - generic [ref=e509]:
                - generic "跨学院人工智能与数字媒体设计联合实验教学班" [ref=e511]:
                  - button "移除 跨学院人工智能与数字媒体设计联合实验教学班" [ref=e514] [cursor=pointer]
                - generic "数媒 2401" [ref=e518]:
                  - button "移除 数媒 2401" [ref=e521] [cursor=pointer]
                - generic "工业设计 2401" [ref=e525]:
                  - button "移除 工业设计 2401" [ref=e528] [cursor=pointer]
              - combobox "长名称标签" [ref=e531] [cursor=pointer]
              - button "清除长名称标签" [ref=e536] [cursor=pointer]
            - generic [ref=e539]: 已选：跨学院人工智能与数字媒体设计联合实验教学班、数媒 2401、工业设计 2401
          - textbox [ref=e540]
        - generic [ref=e541]:
          - generic [ref=e542]: 仅显示数量
          - generic [ref=e543]:
            - generic [ref=e544]:
              - combobox "仅显示数量" [ref=e545] [cursor=pointer]:
                - generic "视传 2401、数媒 2401、工业设计 2401" [ref=e547]: 已选 3 项
              - button "清除仅显示数量" [ref=e550] [cursor=pointer]
            - generic [ref=e556]: 已选：视传 2401、数媒 2401、工业设计 2401
          - textbox [ref=e557]
        - generic [ref=e558]:
          - generic [ref=e559]: 最多选择两项
          - generic [ref=e560]:
            - generic [ref=e561]:
              - combobox "最多选择两项" [ref=e562] [cursor=pointer]:
                - generic "视传 2401、数媒 2401" [ref=e564]
              - button "清除最多选择两项" [ref=e567] [cursor=pointer]
            - generic [ref=e573]: 已选：视传 2401、数媒 2401
          - textbox [ref=e574]
        - generic [ref=e576]:
          - generic [ref=e577]: 紧凑区域默认
          - generic [ref=e578]:
            - generic [ref=e579]:
              - combobox "紧凑区域默认" [ref=e580] [cursor=pointer]:
                - generic "视传 2401" [ref=e582]
              - button "清除紧凑区域默认" [ref=e584] [cursor=pointer]
            - generic [ref=e590]: 已选：视传 2401
          - textbox [ref=e591]: a
        - generic [ref=e592]:
          - generic [ref=e593]: 资料尚未返回
          - generic [ref=e594]:
            - generic [ref=e595]:
              - combobox "资料尚未返回" [ref=e596] [cursor=pointer]:
                - generic "waiting-id" [ref=e598]
              - button "清除资料尚未返回" [ref=e601] [cursor=pointer]
            - generic [ref=e607]: 已选：waiting-id
          - textbox [ref=e608]
    - region [ref=e609]:
      - heading "候选数据与表单草稿" [level=2] [ref=e610]
      - generic [ref=e611]:
        - generic [ref=e613]:
          - generic [ref=e614]: 远程教学班
          - generic [ref=e615]:
            - generic [ref=e616]:
              - combobox "远程教学班" [ref=e617] [cursor=pointer]:
                - generic "视传 2401" [ref=e619]
              - button "清除远程教学班" [ref=e622] [cursor=pointer]
            - generic [ref=e628]: 已选：视传 2401
          - textbox [ref=e629]
          - generic [ref=e630]: 模拟数据：A 较慢，B 较快；搜索“失败”可体验重试。
        - generic [ref=e631]:
          - generic [ref=e632]:
            - generic [ref=e633]: 课程教学班
            - generic [ref=e634]:
              - generic [ref=e635]:
                - combobox "课程教学班" [ref=e636] [cursor=pointer]:
                  - generic "视传 2401" [ref=e638]
                - button "清除课程教学班" [ref=e641] [cursor=pointer]
              - generic [ref=e647]: 已选：视传 2401
            - textbox [ref=e648]
            - generic [ref=e649]: 选择先进入当前表单草稿，保存后更新记录。
          - generic [ref=e650]:
            - button "保存修改" [ref=e651] [cursor=pointer]
            - button "取消修改" [ref=e653] [cursor=pointer]
          - paragraph [ref=e655]: 已保存：视传 2401
        - generic [ref=e656]:
          - generic [ref=e657]: 暂无选项
          - combobox "暂无选项" [ref=e660] [cursor=pointer]:
            - generic [ref=e661]: 请选择
          - textbox [ref=e667]
        - generic [ref=e668]:
          - generic [ref=e669]: 正在加载
          - generic [ref=e670]:
            - generic [ref=e671]:
              - combobox "正在加载" [ref=e672] [cursor=pointer]:
                - generic "视传 2401" [ref=e674]
              - button "清除正在加载" [ref=e676] [cursor=pointer]
            - generic [ref=e682]: 已选：视传 2401
          - textbox [ref=e683]: a
    - region [ref=e684]:
      - heading "独立浅色区域" [level=2] [ref=e685]
      - generic [ref=e686]:
        - generic [ref=e687]: 嵌套浅色
        - generic [ref=e688]:
          - generic [ref=e689]:
            - generic [ref=e690]:
              - generic "视传 2401" [ref=e692]:
                - button "移除 视传 2401" [ref=e695] [cursor=pointer]
              - generic "数媒 2401" [ref=e699]:
                - button "移除 数媒 2401" [ref=e702] [cursor=pointer]
            - combobox "嵌套浅色" [ref=e705] [cursor=pointer]
            - button "清除嵌套浅色" [ref=e710] [cursor=pointer]
          - generic [ref=e713]: 已选：视传 2401、数媒 2401
        - textbox [ref=e714]
    - paragraph [ref=e715]: 当前为组件检查版，选项区已接入正式浮层、菜单内容与 Tag。当前真实组件视觉已完成人工验收；颜色与真实设备核验单独保留。
```

# Test source

```ts
  1   | import { expect, test, type Locator } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { contrastRatio } from "./color-contrast";
  4   | 
  5   | const frame = (control: Locator) => control.locator("xpath=..");
  6   | const widget = (control: Locator) => frame(control).locator("xpath=..");
  7   | const popup = (control: Locator) => control.page().locator('[data-rain-id="ui-select-popup"]:visible');
  8   | 
  9   | for (const theme of ["light", "dark"] as const) test(`implemented Select placeholders and option descriptions preserve real permissions in ${theme}`, async ({ page }, testInfo) => {
  10  |   test.setTimeout(120_000);
  11  |   await page.setViewportSize({ width: 1440, height: 1100 });
  12  |   await page.emulateMedia({ reducedMotion: "reduce" });
  13  |   await page.goto("/#select");
> 14  |   await page.evaluate(async ({ theme, uiPath }) => {
      |              ^ Error: page.evaluate: TypeError: Failed to fetch dynamically imported module: http://127.0.0.1:5195/node_modules/.vite/deps/react.js
  15  |     const reactPath = "/node_modules/.vite/deps/react.js", clientPath = "/node_modules/.vite/deps/react-dom_client.js";
  16  |     const { createElement: h } = (await import(reactPath)).default;
  17  |     const { createRoot } = (await import(clientPath)).default;
  18  |     const { Select, FormItem } = await import(uiPath);
  19  |     document.getElementById("root")!.style.display = "none";
  20  |     const host = document.createElement("section");
  21  |     host.id = "select-closure-fixture"; host.setAttribute("data-rain-theme", theme);
  22  |     host.style.cssText = "padding:24px;background:var(--rain-category-background-neutral-1);color:var(--rain-category-text-neutral-1);font-family:var(--rain-font-ui)";
  23  |     document.body.append(host);
  24  |     const options = [{ value: "alpha", label: "可选课程", description: "普通未选说明" }, { value: "beta", label: "已有课程", description: "选中后保留品牌说明" }, { value: "blocked", label: "暂不可选", description: "禁用说明保留原色", disabled: true }];
  25  |     const cells = ["outlined", "filled", "underlined"].flatMap(appearance => [24, 28, 32, 36].map(size => h("section", { key: `${appearance}-${size}`, "data-closure-cell": `${appearance}-${size}`, style: { display: "grid", gap: "12px", alignContent: "start" } },
  26  |       h("h2", { style: { fontSize: "16px", margin: 0 } }, `${theme} · ${appearance} · ${size}px · 实施后`),
  27  |       ...["normal", "multiple", "searchable", "searchable-multiple", "warning", "error", "readonly", "disabled", "inherited-disabled", "loading"].map(state => {
  28  |         const label = `${appearance} ${size} ${state}`;
  29  |         const control = h(Select, { options, appearance, size, placeholder: "请选择课程", "aria-label": label,
  30  |           multiple: state.includes("multiple"), searchable: state.startsWith("searchable"), loading: state === "loading",
  31  |           readOnly: state === "readonly", disabled: state === "disabled", status: ["warning", "error"].includes(state) ? state : "default" });
  32  |         return h("div", { key: state, "data-closure-select": state, style: { display: "grid", gap: "4px" } },
  33  |           state === "inherited-disabled" ? h(FormItem, { label, disabled: true }, control) : [h("span", { key: "label", style: { fontSize: "12px" } }, state), control]);
  34  |       }))));
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
```