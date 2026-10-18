# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: runtime-state-remediation.spec.ts >> [B02] start compact-only collapse preserves editor, draft, width and focus at 1440px
- Location: tests/e2e/runtime-state-remediation.spec.ts:16:3

# Error details

```
Error: page.evaluate: TypeError: Failed to fetch dynamically imported module: http://127.0.0.1:5391/@fs/Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/github-review-20261017/tests/e2e/runtime-state-remediation.fixture.tsx
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "返回组件总览" [ref=e6] [cursor=pointer]:
          - /url: "#components"
        - heading "Input 输入框" [level=1] [ref=e8]
        - paragraph [ref=e9]: Input 家族的完整用法：四档尺寸、前后文案、单位、内部按钮、清空、计数与搜索快捷用法，统一使用三种外观。
        - group "预览主题" [ref=e10]:
          - button "浅色" [pressed] [ref=e11] [cursor=pointer]
          - button "深色" [ref=e13] [cursor=pointer]
      - region [ref=e15]:
        - heading "字段外观" [level=2] [ref=e16]
        - group "输入框外观" [ref=e17]:
          - button "描边" [pressed] [ref=e18] [cursor=pointer]
          - button "填充" [ref=e20] [cursor=pointer]
          - button "底线" [ref=e22] [cursor=pointer]
        - paragraph [ref=e24]: 切换后，下方全部示例共用所选外观，已输入的内容会保留。
      - region [ref=e25]:
        - heading "框内固定标题" [level=2] [ref=e26]
        - paragraph [ref=e27]: 适合与按钮同排的筛选栏。标题在填写和清空后始终保留；常规32px、紧凑28px。普通表单继续使用上方标题。
        - generic [ref=e28]:
          - generic [ref=e30]:
            - generic "资料名称" [ref=e31]
            - textbox "资料名称" [ref=e33]:
              - /placeholder: 输入名称
          - generic [ref=e37]:
            - generic "查找资料" [ref=e38]
            - textbox "查找资料" [ref=e42]:
              - /placeholder: 输入名称
            - button "搜索" [ref=e45] [cursor=pointer]
        - generic [ref=e47]: "<FormItem label=\"资料名称\" labelPosition=\"inside\"> <Input size={32} placeholder=\"输入名称\" /> </FormItem>"
      - region [ref=e48]:
        - heading "尺寸与状态" [level=2] [ref=e49]
        - paragraph [ref=e50]: 24 用于紧凑区域；28、32 用于普通表单和查询；36 用于更宽松的界面。
        - generic [ref=e51]:
          - generic [ref=e52]:
            - heading "24px" [level=3] [ref=e53]
            - generic [ref=e54]:
              - generic [ref=e55]: 24 常规
              - textbox "24 常规" [ref=e57]:
                - /placeholder: 输入课程名称
            - generic [ref=e59]:
              - generic [ref=e60]: 24 已填写
              - textbox "24 已填写" [ref=e62]: 人工智能导论
            - generic [ref=e64]:
              - generic [ref=e65]: 24 警告
              - textbox "24 警告" [ref=e67]: 人工智能导论
              - generic [ref=e69]: 名称较相似，请检查
            - generic [ref=e70]:
              - generic [ref=e71]: 24 错误
              - textbox "24 错误" [invalid] [ref=e73]: AI-2026
              - generic [ref=e75]: 课程编号已存在
            - generic [ref=e76]:
              - generic [ref=e77]: 24 只读
              - textbox "24 只读" [ref=e79]: 教务系统同步
            - generic [ref=e80]:
              - generic [ref=e81]: 24 禁用
              - textbox "24 禁用" [disabled] [ref=e83]: 等待授权
          - generic [ref=e84]:
            - heading "28px" [level=3] [ref=e85]
            - generic [ref=e86]:
              - generic [ref=e87]: 28 常规
              - textbox "28 常规" [ref=e89]:
                - /placeholder: 输入课程名称
            - generic [ref=e91]:
              - generic [ref=e92]: 28 已填写
              - textbox "28 已填写" [ref=e94]: 人工智能导论
            - generic [ref=e96]:
              - generic [ref=e97]: 28 警告
              - textbox "28 警告" [ref=e99]: 人工智能导论
              - generic [ref=e101]: 名称较相似，请检查
            - generic [ref=e102]:
              - generic [ref=e103]: 28 错误
              - textbox "28 错误" [invalid] [ref=e105]: AI-2026
              - generic [ref=e107]: 课程编号已存在
            - generic [ref=e108]:
              - generic [ref=e109]: 28 只读
              - textbox "28 只读" [ref=e111]: 教务系统同步
            - generic [ref=e112]:
              - generic [ref=e113]: 28 禁用
              - textbox "28 禁用" [disabled] [ref=e115]: 等待授权
          - generic [ref=e116]:
            - heading "32px" [level=3] [ref=e117]
            - generic [ref=e118]:
              - generic [ref=e119]: 32 常规
              - textbox "32 常规" [ref=e121]:
                - /placeholder: 输入课程名称
            - generic [ref=e123]:
              - generic [ref=e124]: 32 已填写
              - textbox "32 已填写" [ref=e126]: 人工智能导论
            - generic [ref=e128]:
              - generic [ref=e129]: 32 警告
              - textbox "32 警告" [ref=e131]: 人工智能导论
              - generic [ref=e133]: 名称较相似，请检查
            - generic [ref=e134]:
              - generic [ref=e135]: 32 错误
              - textbox "32 错误" [invalid] [ref=e137]: AI-2026
              - generic [ref=e139]: 课程编号已存在
            - generic [ref=e140]:
              - generic [ref=e141]: 32 只读
              - textbox "32 只读" [ref=e143]: 教务系统同步
            - generic [ref=e144]:
              - generic [ref=e145]: 32 禁用
              - textbox "32 禁用" [disabled] [ref=e147]: 等待授权
          - generic [ref=e148]:
            - heading "36px" [level=3] [ref=e149]
            - generic [ref=e150]:
              - generic [ref=e151]: 36 常规
              - textbox "36 常规" [ref=e153]:
                - /placeholder: 输入课程名称
            - generic [ref=e155]:
              - generic [ref=e156]: 36 已填写
              - textbox "36 已填写" [ref=e158]: 人工智能导论
            - generic [ref=e160]:
              - generic [ref=e161]: 36 警告
              - textbox "36 警告" [ref=e163]: 人工智能导论
              - generic [ref=e165]: 名称较相似，请检查
            - generic [ref=e166]:
              - generic [ref=e167]: 36 错误
              - textbox "36 错误" [invalid] [ref=e169]: AI-2026
              - generic [ref=e171]: 课程编号已存在
            - generic [ref=e172]:
              - generic [ref=e173]: 36 只读
              - textbox "36 只读" [ref=e175]: 教务系统同步
            - generic [ref=e176]:
              - generic [ref=e177]: 36 禁用
              - textbox "36 禁用" [disabled] [ref=e179]: 等待授权
      - region [ref=e180]:
        - heading "常用组合" [level=2] [ref=e181]
        - generic [ref=e182]:
          - generic [ref=e183]:
            - generic [ref=e184]: 课程学分
            - generic [ref=e185]:
              - textbox "课程学分" [ref=e186]: "3"
              - generic [ref=e188]: 学分
              - generic [ref=e189]: 1/3
              - button "换算" [ref=e191] [cursor=pointer]
            - generic [ref=e193]: 清除在单位之前；计数与末尾操作保持固定位置。
          - generic [ref=e195]:
            - generic [ref=e196]: 全部附加内容
            - generic [ref=e197]:
              - generic [ref=e200]: 建议
              - generic [ref=e202]: ￥
              - textbox "全部附加内容" [ref=e203]: "120"
              - generic [ref=e205]: 元
              - generic [ref=e206]: 含税
              - generic [ref=e210]: 3/6
              - button "查看价格" [ref=e212] [cursor=pointer]
            - generic [ref=e215]: 附加内容较多，窄屏可左右滑动查看完整结构。
          - generic [ref=e216]:
            - generic [ref=e217]: 只读课程编号
            - generic [ref=e218]:
              - textbox "只读课程编号" [ref=e219]: AI-2026
              - button "查看" [ref=e221] [cursor=pointer]
            - generic [ref=e223]: 只读内容可以选择、复制和查看；按 Tab 定位操作。
          - generic [ref=e224]:
            - generic [ref=e225]: 只读改值操作
            - generic [ref=e226]:
              - textbox "只读改值操作" [ref=e227]: 教学班同步
              - button "更新" [disabled] [ref=e229]
            - generic [ref=e231]: 会改值的操作保留位置并禁用。
          - generic [ref=e233]:
            - generic [ref=e234]: 紧凑搜索
            - generic [ref=e236]:
              - textbox "紧凑搜索" [ref=e239]: 课程
              - button "搜索" [ref=e242] [cursor=pointer]
            - generic [ref=e244]: 紧凑区域默认 24px，搜索操作使用 24px 文字按钮。
          - generic [ref=e245]:
            - generic [ref=e246]: 关闭清空
            - textbox "关闭清空" [ref=e248]: 无需清空的字段
            - generic [ref=e249]: 明确关闭时释放清空占位。
      - region [ref=e250]:
        - heading "字数与回填" [level=2] [ref=e251]
        - generic [ref=e252]:
          - generic [ref=e253]:
            - generic [ref=e254]: 硬限制
            - generic [ref=e255]:
              - textbox "硬限制" [ref=e256]: 雨👨‍👩‍👧‍👦
              - generic [ref=e258]: 2/6
            - generic [ref=e259]: 组合 Emoji 算一个字，中文组字结束后应用限制。
          - generic [ref=e260]:
            - generic [ref=e261]: 软限制
            - generic [ref=e262]:
              - textbox "软限制" [ref=e263]: 人工智能导论
              - generic [ref=e265]: 6/4
              - generic [ref=e266]: 已超过 4 字上限
            - generic [ref=e267]: 保留超限内容；计数提示不会自动变成字段错误。
          - generic [ref=e268]:
            - generic [ref=e269]: 超限回填
            - generic [ref=e270]:
              - textbox "超限回填" [ref=e271]: abcdef
              - generic [ref=e273]: 6/4
              - generic [ref=e274]: 已超过 4 字上限
            - generic [ref=e275]: 已有内容完整保留，可逐步删减；不会静默截断尾部。
          - generic [ref=e276]:
            - generic [ref=e277]: 隐藏计数
            - generic [ref=e278]:
              - textbox "隐藏计数" [ref=e279]: abcdef
              - generic [ref=e281]: 已超过 4 字上限
            - generic [ref=e282]: 隐藏数字后，超限仍提供可访问的文字说明。
      - region [ref=e283]:
        - heading "搜索快捷用法" [level=2] [ref=e284]
        - paragraph [ref=e285]: SearchInput 使用同一个 Input，提供搜索按钮、Enter 提交和清空搜索；加载中仍可编辑。
        - generic [ref=e286]:
          - generic [ref=e287]:
            - generic [ref=e288]: 课程搜索
            - generic [ref=e290]:
              - textbox "课程搜索" [ref=e293]:
                - /placeholder: 输入课程名称
              - generic [ref=e295]: 0/20
              - button "搜索" [ref=e297] [cursor=pointer]
            - generic [ref=e299]: 输入时保留草稿；按 Enter 或搜索提交。加载中仍可输入和清空。
          - paragraph [ref=e300]: 课程类型：必修课
          - paragraph [ref=e301]: 最近提交：尚未提交
          - status [ref=e302]: 最新结果：尚未查询
      - paragraph [ref=e303]: 当前运行视觉已完成人工验收，组件仍未发布。弱边界、辅助文字及部分状态下的颜色问题已单独记录。
  - generic [ref=e306]:
    - generic [ref=e307]: "[plugin:vite:oxc] Transform failed with 1 error: [PARSE_ERROR] Expected `}` but found `)` ╭─[ ../../tests/e2e/runtime-state-remediation.fixture.tsx:80:155 ] │ 80 │ }}/>}<button onClick={() => pending.filter(request => request.signal.aborted).forEach(request => request.reject(new Error(\"old cancelled request\"))))}>拒绝已取消请求</button> │ ┬ │ ╰── `}` expected ────╯"
    - generic [ref=e308]: /Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/github-review-20261017/tests/e2e/runtime-state-remediation.fixture.tsx
    - generic [ref=e309]: at transformWithOxc (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/github-review-20261017/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:4103:19) at TransformPluginContext.transform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/github-review-20261017/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:4174:26) at EnvironmentPluginContainer.transform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/github-review-20261017/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:30932:51) at async loadAndTransform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/github-review-20261017/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:20671:26)
    - generic [ref=e310]:
      - text: Click outside, press Esc key, or fix the code to dismiss.You can also disable this overlay by setting
      - code [ref=e311]: server.hmr.overlay
      - text: to
      - code [ref=e312]: "false"
      - text: in
      - code [ref=e313]: vite.config.ts
      - text: .
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | 
  3   | const fixturePath = `/@fs${new URL("./runtime-state-remediation.fixture.tsx", import.meta.url).pathname}`;
  4   | async function mount(page: Page, fixture: "workspace" | "input" | "tree", options: { side?: "start" | "end" | "top"; controlled?: boolean; strict?: boolean } = {}) {
  5   |   await page.goto("/#input");
> 6   |   await page.evaluate(async ({ path, fixture, options }) => {
      |              ^ Error: page.evaluate: TypeError: Failed to fetch dynamically imported module: http://127.0.0.1:5391/@fs/Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/github-review-20261017/tests/e2e/runtime-state-remediation.fixture.tsx
  7   |     const module = await import(path);
  8   |     if (fixture === "workspace") module.mountWorkspaceRemediation(options.side);
  9   |     if (fixture === "input") module.mountInputRemediation();
  10  |     if (fixture === "tree") module.mountTreeRemediation(options.controlled ?? false, options.strict ?? true);
  11  |   }, { path: fixturePath, fixture, options });
  12  | }
  13  | test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));
  14  | 
  15  | for (const width of [1440, 900]) for (const side of ["start", "end"] as const) {
  16  |   test(`[B02] ${side} compact-only collapse preserves editor, draft, width and focus at ${width}px`, async ({ page }, info) => {
  17  |     await page.setViewportSize({ width, height: 900 }); await mount(page, "workspace", { side });
  18  |     const editor = page.getByRole("textbox", { name: "区域草稿" }), body = page.getByRole("textbox", { name: "正文草稿" });
  19  |     await editor.fill("此对象的未保存草稿"); await editor.evaluate(node => { node.dataset.testIdentity = "original"; });
  20  |     await body.fill("正文独立更新");
  21  |     const restore = page.locator('[data-workspace-action="restore"]');
  22  |     const controlledId = await restore.getAttribute("aria-controls");
  23  |     const splitter = page.getByRole("separator", { name: "调整复核区域宽度" });
  24  |     await splitter.focus(); await page.keyboard.press(side === "start" ? "ArrowRight" : "ArrowLeft");
  25  |     await expect(splitter).toHaveAttribute("aria-valuenow", "226");
  26  |     await page.keyboard.press("Enter"); await expect(restore).toHaveAttribute("data-mode", "compact"); await expect(restore).toBeFocused();
  27  |     await expect(page.getByRole("separator")).toHaveCount(0);
  28  |     await restore.press("Enter"); await expect(splitter).toHaveAttribute("aria-valuenow", "226");
  29  |     await expect(editor).toHaveAttribute("data-test-identity", "original"); await expect(editor).toHaveValue("此对象的未保存草稿");
  30  |     await expect(body).toHaveValue("正文独立更新"); await expect(restore).toHaveAttribute("aria-controls", controlledId!);
  31  |     await page.locator("#workspace-remediation").screenshot({ path: info.outputPath(`${side}-${width}-restored.png`) });
  32  |     await info.attach("workspace-state", { body: await page.getByTestId("workspace-state").innerText(), contentType: "application/json" });
  33  |   });
  34  | }
  35  | 
  36  | for (const width of [1440, 900]) test(`[B02] full/hidden ribbon recovers with the same DOM and pin base at ${width}px`, async ({ page }, info) => {
  37  |   await page.setViewportSize({ width, height: 900 }); await mount(page, "workspace", { side: "top" });
  38  |   const editor = page.getByRole("textbox", { name: "区域草稿" }), restore = page.locator('[data-workspace-action="restore"]');
  39  |   await editor.fill("顶部草稿"); await editor.evaluate(node => { node.dataset.testIdentity = "original"; });
  40  |   await restore.click(); await expect(restore).toHaveAttribute("data-mode", "hidden"); await expect(restore).toBeFocused();
  41  |   await expect(editor).toBeHidden(); await restore.press("Enter"); await expect(editor).toBeVisible();
  42  |   await expect(editor).toHaveAttribute("data-test-identity", "original"); await expect(editor).toHaveValue("顶部草稿");
  43  |   await page.getByRole("button", { name: "固定当前区域" }).click(); await expect(restore).toHaveAttribute("data-mode", "full");
  44  |   await page.getByRole("button", { name: "取消固定区域" }).click();
  45  |   await expect(restore).toHaveAttribute("data-mode", "hidden"); await expect(editor).toBeVisible();
  46  |   await restore.focus(); await page.keyboard.press("Escape"); await expect(editor).toBeHidden(); await expect(restore).toBeFocused();
  47  |   await restore.press("Enter"); await expect(editor).toHaveValue("顶部草稿");
  48  |   await page.locator("#workspace-remediation").screenshot({ path: info.outputPath(`top-${width}-restored.png`) });
  49  | });
  50  | 
  51  | test("[B03] native reset keeps each owner, documented defaults, callbacks and controlled values distinct", async ({ page }, info) => {
  52  |   await mount(page, "input");
  53  |   const field = page.getByRole("textbox", { name: "默认字段", exact: true }), native = page.getByRole("textbox", { name: "原生默认字段" });
  54  |   await field.fill("编辑值"); await native.fill("编辑值"); await page.getByRole("textbox", { name: "外置字段" }).fill("外置草稿");
  55  |   await page.getByRole("textbox", { name: "查询字段" }).fill("查询草稿"); await page.getByRole("textbox", { name: "取消复位字段" }).fill("表单B草稿");
  56  |   await page.getByRole("button", { name: "更新默认值", exact: true }).click();
  57  |   await expect(field).toHaveValue("编辑值"); await expect(native).toHaveValue("编辑值");
  58  |   const callbacks = await page.getByTestId("input-callbacks").innerText();
  59  |   const immediate = await page.locator("#reset-a").evaluate(node => { const form = node as HTMLFormElement; form.reset(); return Object.fromEntries(new FormData(form)); });
  60  |   expect(immediate).toEqual({ rain: "挂载值", native: "更新默认值", query: "初始查询", ime: "AB", readonly: "只读", external: "外置值" });
  61  |   await expect(field).toHaveValue("挂载值"); await expect(field.locator("xpath=..").locator('[data-slot="count"]')).toHaveText("3");
  62  |   await expect(page.getByRole("textbox", { name: "取消复位字段" })).toHaveValue("表单B草稿");
  63  |   await expect(page.getByRole("textbox", { name: "查询字段" })).toHaveAccessibleDescription("宿主错误保留");
  64  |   await expect(page.getByTestId("input-callbacks")).toHaveText(callbacks);
  65  |   await page.getByRole("button", { name: "取消复位B" }).click(); await expect(page.getByRole("textbox", { name: "取消复位字段" })).toHaveValue("表单B草稿");
  66  |   await page.getByRole("button", { name: "宿主主动复位" }).click();
  67  |   await expect(page.getByRole("textbox", { name: "受控更新字段" })).toHaveValue("宿主重置值");
  68  |   await expect(page.getByRole("textbox", { name: "受控拒绝字段" })).toHaveValue("固定宿主值");
  69  |   await field.fill("再次编辑"); await page.getByRole("button", { name: "复位表单A", exact: true }).click(); await expect(field).toHaveValue("挂载值");
  70  |   await info.attach("immediate-form-data", { body: JSON.stringify(immediate), contentType: "application/json" });
  71  |   await page.locator("#input-remediation").screenshot({ path: info.outputPath("owner-reset.png") });
  72  | });
  73  | 
  74  | test("[B03] reset clears synthetic composition state before later input and clear", async ({ page }) => {
  75  |   await mount(page, "input");
  76  |   const field = page.getByRole("textbox", { name: "组字字段" });
  77  |   await field.dispatchEvent("compositionstart", { data: "" });
  78  |   await field.evaluate(node => {
  79  |     const input = node as HTMLInputElement;
  80  |     Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, "A课程B");
  81  |     input.dispatchEvent(new InputEvent("input", { bubbles: true, data: "课程", inputType: "insertCompositionText", isComposing: true }));
  82  |   });
  83  |   await expect(field).toHaveValue("A课程B");
  84  |   await page.locator("#reset-a").evaluate(node => (node as HTMLFormElement).reset());
  85  |   await expect(field.locator("xpath=..").locator('[data-slot="count"]')).toHaveText("2/3");
  86  |   await expect(field).toHaveValue("AB"); await field.dispatchEvent("compositionend", { data: "" });
  87  |   await field.fill("AXB"); await expect(field).toHaveValue("AXB");
  88  |   await page.getByRole("button", { name: "清除组字字段" }).click(); await expect(field).toHaveValue("");
  89  | });
  90  | 
  91  | for (const controlled of [false, true]) test(`[B04] StrictMode ${controlled ? "controlled" : "default"} rejection is retryable while a parallel branch succeeds`, async ({ page }, info) => {
  92  |   await mount(page, "tree", { controlled });
  93  |   const host = page.locator("#tree-remediation");
  94  |   await expect.poll(async () => JSON.parse((await host.getAttribute("data-timeline"))!)).toEqual(expect.arrayContaining([expect.objectContaining({ type: "abort", key: "alpha" }), expect.objectContaining({ type: "abort", key: "beta" })]));
  95  |   await page.getByRole("button", { name: "拒绝已取消请求" }).click(); await expect(page.getByRole("button", { name: /加载失败，重试/ })).toHaveCount(0);
  96  |   await page.getByRole("button", { name: "拒绝甲分支" }).click(); await expect(page.getByRole("button", { name: /加载失败，重试/ })).toBeVisible();
  97  |   await page.getByRole("button", { name: "完成乙分支" }).click(); await expect(page.getByRole("treeitem", { name: "乙分支子节点" })).toBeVisible();
  98  |   await page.getByRole("button", { name: /加载失败，重试/ }).click(); await page.getByRole("button", { name: "完成甲分支" }).click();
  99  |   await expect(page.getByRole("treeitem", { name: "甲分支子节点" })).toBeVisible(); await expect(page.getByText("加载中…", { exact: true })).toHaveCount(0);
  100 |   const timeline = JSON.parse((await host.getAttribute("data-timeline"))!);
  101 |   expect(timeline.filter((item: { type: string }) => item.type === "delivered")).toHaveLength(2);
  102 |   await info.attach("request-timeline", { body: JSON.stringify(timeline, null, 2), contentType: "application/json" });
  103 |   await host.screenshot({ path: info.outputPath(`strict-${controlled}-recovered.png`) });
  104 | });
  105 | 
  106 | test("[B04] revision changes, deleted branches and unmount invalidate pending results in a real root", async ({ page }, info) => {
```