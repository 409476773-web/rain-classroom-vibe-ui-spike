# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g123-playground.spec.ts >> course workspace keeps its main geometry and draft through narrow peek, unfit pin and wide recovery
- Location: tests/e2e/g123-playground.spec.ts:116:1

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 967
Received:    1050.28125
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "WorkspaceLayout 可恢复工作区" [level=1] [ref=e9]
      - generic [ref=e10]: Layout · 导航 · 共享候选 · 当前导航场景局部审阅已确认 · 未发布
    - paragraph [ref=e11]: 管理可隐藏区域、恢复入口、暂态面板、调宽和专注；业务草稿与对象身份由应用保留。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "推荐场景" [level=2] [ref=e21]
      - paragraph [ref=e22]: 使用少量真实内容演示组件用途。局部配方复用已有组件；本次运行视觉待审阅。
      - region "课程资料编辑" [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]: 目录、资料与属性，各得其所。
          - link "完整建设页 ↗" [ref=e28] [cursor=pointer]:
            - /url: "?sample=R2#navigation-v042"
        - generic [ref=e30]:
          - generic [ref=e31]:
            - strong [ref=e32]: 高等数学 A · 课程内容
            - generic [ref=e33]:
              - button "隐藏课程目录" [expanded] [ref=e34] [cursor=pointer]: 课程目录
              - button "隐藏资料属性" [expanded] [ref=e35] [cursor=pointer]: 资料属性
            - button "专注资料" [ref=e36] [cursor=pointer]
          - generic [ref=e38]:
            - generic "课程目录" [ref=e40]:
              - generic [ref=e41]:
                - heading "课程目录" [level=3] [ref=e42]
                - button "隐藏课程目录" [ref=e43] [cursor=pointer]
              - tree "高等数学课程目录" [ref=e46]:
                - treeitem "第一章 · 函数与极限" [expanded] [level=1] [ref=e47]:
                  - generic [ref=e48]:
                    - button "收起第一章 · 函数与极限" [expanded] [ref=e49] [cursor=pointer]
                    - generic "第一章 · 函数与极限" [ref=e54]
                - treeitem "1.1 函数的定义与表示" [level=2] [selected] [ref=e55]:
                  - generic "1.1 函数的定义与表示" [ref=e60]
                - treeitem "1.2 极限的直观理解" [level=2] [ref=e61]:
                  - generic "1.2 极限的直观理解" [ref=e66]
                - treeitem "1.3 极限的基本运算" [level=2] [ref=e67]:
                  - generic "1.3 极限的基本运算" [ref=e72]
                - treeitem "第二章 · 导数与微分" [level=1] [ref=e73]:
                  - generic [ref=e74]:
                    - button "展开第二章 · 导数与微分" [ref=e75] [cursor=pointer]
                    - generic "第二章 · 导数与微分" [ref=e80]
                - generic [ref=e81]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                - status [ref=e82]
              - paragraph [ref=e83]: 公共资源包 · 3 项资料
            - separator "调整课程目录宽度" [ref=e85]
            - region "当前资料" [ref=e86]:
              - generic [ref=e87]: 第一章 / 1.1
              - generic [ref=e88]:
                - generic [ref=e89]:
                  - heading "函数的定义与表示" [level=3] [ref=e90]
                  - paragraph [ref=e91]: 讲义 · PDF · 8 页
                - button "保存草稿" [ref=e92] [cursor=pointer]
              - article "讲义内容示例" [ref=e94]:
                - paragraph [ref=e95]: 高等数学 A
                - heading "1.1 函数的定义与表示" [level=4] [ref=e96]
                - heading "学习目标" [level=5] [ref=e97]
                - paragraph [ref=e98]: 理解函数的概念，区分定义域与值域，并掌握常见表示方式。
                - heading "例：用图像理解对应关系" [level=5] [ref=e99]
                - img "函数 y = x + 1 的图像，直线通过零与一和负一与零" [ref=e100]:
                  - generic [ref=e104]:
                    - generic [ref=e105]: "0"
                    - generic [ref=e106]: −1
                    - generic [ref=e107]: "1"
                    - generic [ref=e108]: "2"
                    - generic [ref=e109]: "1"
                    - generic [ref=e110]: "2"
                    - generic [ref=e111]: x
                    - generic [ref=e112]: "y"
                    - generic [ref=e113]: y = x + 1
                - paragraph [ref=e114]: 每一个 x，都对应唯一的函数值。这里 x = 0 时，y = 1。
              - generic [ref=e115]:
                - generic [ref=e116]: 教学备注
                - textbox "教学备注" [ref=e118]: 课堂上补充生活中的函数关系示例。
              - status [ref=e119]: 草稿未保存
            - separator "调整资料属性宽度" [ref=e120]
            - generic "资料属性" [ref=e122]:
              - generic [ref=e123]:
                - heading "资料属性" [level=3] [ref=e124]
                - button "隐藏资料属性" [ref=e125] [cursor=pointer]
              - generic [ref=e128]:
                - generic [ref=e129]:
                  - generic [ref=e130]: 资料名称
                  - generic [ref=e131]:
                    - textbox "资料名称" [ref=e132]: 函数的定义与表示
                    - generic [ref=e134]: 8/80
                - generic [ref=e135]:
                  - term [ref=e136]: 所属章节
                  - definition [ref=e137]: 第一章 · 函数与极限
                  - term [ref=e138]: 文件类型
                  - definition [ref=e139]: PDF
                  - term [ref=e140]: 页数
                  - definition [ref=e141]: 8 页
                - generic [ref=e142]:
                  - generic [ref=e143]: 使用范围
                  - generic [ref=e144]:
                    - generic [ref=e145]:
                      - combobox "使用范围" [ref=e146] [cursor=pointer]:
                        - generic "公共资源包" [ref=e148]
                      - button "清除使用范围" [ref=e150] [cursor=pointer]
                    - generic [ref=e156]: 已选：公共资源包
                  - textbox [ref=e157]: public
                - generic [ref=e158]:
                  - term [ref=e159]: 负责人
                  - definition [ref=e160]: 林老师
                - paragraph [ref=e161]: 示例数据 · 仅本地编辑
      - generic [ref=e162]:
        - generic [ref=e163]:
          - button "复制代码" [ref=e164] [cursor=pointer]
          - status
        - code [ref=e167]: "import { WorkspaceRecommendedScene } from \"./recipes/navigation-v042/navigation-workspace-recipes\"; // 同时携带该文件声明的配方 CSS 与本地依赖。 <WorkspaceRecommendedScene />"
    - button "高级组合与异常状态" [ref=e169] [cursor=pointer]
  - region [ref=e171]:
    - heading "使用边界" [level=2] [ref=e172]
    - generic [ref=e173]:
      - generic [ref=e174]:
        - heading "适合用在" [level=3] [ref=e175]
        - list [ref=e176]:
          - listitem [ref=e177]: 多个区域需独立隐藏、恢复与临时查看，并保留业务内容。
      - generic [ref=e178]:
        - heading "避免用在" [level=3] [ref=e179]
        - list [ref=e180]:
          - listitem [ref=e181]: 固定两列优先已有 Split；不把学生、题目、评分、草稿或 session 写入布局偏好。
  - generic [ref=e182]:
    - region [ref=e183]:
      - heading "API 与结构" [level=2] [ref=e184]
      - table [ref=e186]:
        - caption [ref=e187]: WorkspaceLayout 可恢复工作区 常用接口
        - rowgroup [ref=e188]:
          - row [ref=e189]:
            - columnheader "名称" [ref=e190]
            - columnheader "类型" [ref=e191]
            - columnheader "默认" [ref=e192]
            - columnheader "说明" [ref=e193]
        - rowgroup [ref=e194]:
          - row [ref=e195]:
            - rowheader [ref=e196]:
              - code [ref=e197]: spec
            - cell [ref=e198]:
              - code [ref=e199]: WorkspaceSpec
            - cell "—" [ref=e200]
            - cell "稳定 workspaceKey、regions、恢复图、宽度预算与 allowedModes；每个可隐藏区域都有外部恢复 owner。" [ref=e201]
          - row [ref=e202]:
            - rowheader [ref=e203]:
              - code [ref=e204]: preferences / onPreferencesChange
            - cell [ref=e205]:
              - code [ref=e206]: WorkspacePreferences / callback
            - cell "—" [ref=e207]
            - cell "只保存 mode 与 expandedWidth；受控调用必须接纳请求，否则显示等待同步。" [ref=e208]
          - row [ref=e209]:
            - rowheader [ref=e210]:
              - code [ref=e211]: viewportWidth
            - cell [ref=e212]:
              - code [ref=e213]: number
            - cell "真实容器测量" [ref=e214]
            - cell "可用于确定性嵌入；空间不足只派生有效布局，保留展开请求。" [ref=e215]
          - row [ref=e216]:
            - rowheader [ref=e217]:
              - code [ref=e218]: storage / storageKey
            - cell [ref=e219]:
              - code [ref=e220]: WorkspaceStorage / string
            - cell "—" [ref=e221]
            - cell "宿主注入存储；只保存布局偏好，不保存会话/业务数据。" [ref=e222]
          - row [ref=e223]:
            - rowheader [ref=e224]:
              - code [ref=e225]: RecoverableRegion regionId / header / footer / children
            - cell [ref=e226]:
              - code [ref=e227]: string / ReactNode / ReactNode / node | render
            - cell "—" [ref=e228]
            - cell "单个 body 持续挂载；render 可读 effective、temporary、visible。" [ref=e229]
          - row [ref=e230]:
            - rowheader [ref=e231]:
              - code [ref=e232]: RegionRestoreTrigger regionId / intent
            - cell [ref=e233]:
              - code [ref=e234]: string / toggle | peek
            - cell "toggle" [ref=e235]
            - cell "稳定外部控制，恢复失去焦点的隐藏区域。" [ref=e236]
          - row [ref=e237]:
            - rowheader [ref=e238]:
              - code [ref=e239]: PaneSplitter regionId
            - cell [ref=e240]:
              - code [ref=e241]: string
            - cell "—" [ref=e242]
            - cell "鼠标拖动、方向键/Shift/Home/End 调宽；Enter 隐藏并恢复焦点。" [ref=e243]
          - row [ref=e244]:
            - rowheader [ref=e245]:
              - code [ref=e246]: useWorkspaceLayout()
            - cell [ref=e247]:
              - code [ref=e248]: WorkspaceController
            - cell "—" [ref=e249]
            - cell "提供 preferences/effective/session 与 dispatch；ENTER_FOCUS/EXIT_FOCUS、PEEK_REGION/PIN_TEMP/UNPIN 等只改变布局。" [ref=e250]
      - paragraph [ref=e251]: Parts / Slots：WorkspaceLayout → toolbar/ribbon + flow；RecoverableRegion 是单个持续挂载 body；RegionRestoreTrigger 在稳定外部 owner；PaneSplitter 每边界一个。
    - region [ref=e252]:
      - heading "调用示例" [level=2] [ref=e253]
      - generic [ref=e254]:
        - generic [ref=e255]:
          - button "复制代码" [ref=e256] [cursor=pointer]
          - status
        - code [ref=e259]: "<WorkspaceLayout spec={spec} toolbar={<RecoveryToolbar />}> <RecoverableRegion regionId=\"directory\">{directory}</RecoverableRegion> <PaneSplitter regionId=\"directory\" /> <main>{hostOwnedEditor}</main> </WorkspaceLayout> // RecoveryToolbar 位于可隐藏区域外： function RecoveryToolbar() { return <RegionRestoreTrigger regionId=\"directory\" />; }"
      - paragraph [ref=e260]:
        - text: 当前源码：
        - code [ref=e261]: packages/layouts/src/workspace.tsx
```

# Test source

```ts
  22  | 
  23  | test("the component catalog opens lazy documentation with heading focus and clipboard", async ({ page, context }) => {
  24  |   await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  25  |   await page.goto("/#components");
  26  |   await page.getByRole("link", { name: "Accordion 折叠组", exact: true }).click();
  27  |   await expect(page.locator("#accordion-title")).toBeFocused();
  28  |   await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
  29  |   await expect(page.getByText("已复制", { exact: true })).toBeVisible();
  30  |   expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Accordion");
  31  | });
  32  | 
  33  | test("all component examples fit a narrow viewport", async ({ page }) => {
  34  |   await page.setViewportSize({ width: 390, height: 844 });
  35  |   for (const id of routes) {
  36  |     await page.goto(`/#${id}`);
  37  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  38  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
  39  |   }
  40  |   await page.screenshot({ path: `${captures}/workspace-narrow.png`, fullPage: true });
  41  | });
  42  | 
  43  | test("navigation drafts remain with their content and layout actions preserve workspace drafts", async ({ page }) => {
  44  |   await page.goto("/#navigation-tabs");
  45  |   await page.getByRole("button", { name: "高级组合与异常状态", exact: true }).click();
  46  |   const draft = page.getByRole("textbox", { name: "该内容面备注" });
  47  |   await draft.fill("资料草稿");
  48  |   await page.getByRole("tab", { name: "课堂任务" }).click();
  49  |   await expect(draft).toHaveValue("");
  50  |   await draft.fill("课堂草稿");
  51  |   await page.getByRole("button", { name: "切换为连接工作面样式" }).click();
  52  |   await expect(draft).toHaveValue("课堂草稿");
  53  |   await page.getByRole("tab", { name: "课程资料" }).click();
  54  |   await expect(draft).toHaveValue("资料草稿");
  55  |   await page.goto("/#workspace?chapter=2");
  56  |   await expect(page.locator("#workspace-title")).toBeVisible();
  57  |   const workspaceDraft = page.getByRole("textbox", { name: "宿主草稿" });
  58  |   await workspaceDraft.fill("布局操作保留的草稿");
  59  |   await page.getByRole("button", { name: "专注主内容" }).click();
  60  |   await expect(workspaceDraft).toHaveValue("布局操作保留的草稿");
  61  |   await page.getByRole("button", { name: "退出专注" }).click();
  62  |   await expect(workspaceDraft).toHaveValue("布局操作保留的草稿");
  63  | });
  64  | 
  65  | test("recommended objects keep sibling marking separate and show exact two-row activity progress", async ({ page }) => {
  66  |   await page.goto("/#object-navigator");
  67  |   const queue = page.getByRole("region", { name: "学生批阅", exact: true });
  68  |   const note = queue.getByRole("textbox", { name: "批阅备注", exact: true });
  69  |   await note.fill("欧阳小明的第 3 题草稿");
  70  |   await queue.getByRole("button", { name: "标记 林晓", exact: true }).click();
  71  |   await expect(queue.getByRole("button", { name: "欧阳小明", exact: true })).toHaveAttribute("aria-pressed", "true");
  72  |   await queue.getByRole("button", { name: "林晓", exact: true }).click();
  73  |   await queue.getByRole("button", { name: "欧阳小明", exact: true }).click();
  74  |   await expect(note).toHaveValue("欧阳小明的第 3 题草稿");
  75  |   await queue.getByRole("button", { name: "陈一诺", exact: true }).click();
  76  |   await expect(queue.getByRole("spinbutton", { name: "得分", exact: true })).toBeDisabled();
  77  |   await expect(queue.getByRole("button", { name: "保存评分", exact: true })).toBeDisabled();
  78  |   const activities = page.getByRole("region", { name: "课堂活动", exact: true });
  79  |   const progress = activities.getByRole("progressbar");
  80  |   expect(await progress.evaluateAll(items => items.map(item => item.getAttribute("aria-valuenow")))).toEqual(["75", "100", "37.5"]);
  81  |   const facts = await activities.locator('[data-slot="entry"]').evaluateAll(entries => entries.map(entry => {
  82  |     const metadata = entry.querySelector<HTMLElement>('[data-slot="metadata"]')!, info = metadata.querySelector<HTMLElement>(".object-recipe__activity-meta > span")!, bar = metadata.querySelector<HTMLElement>(".object-recipe__activity-progress")!;
  83  |     return { width: entry.getBoundingClientRect().width, metadataHeight: metadata.getBoundingClientRect().height, sameRow: Math.abs(info.getBoundingClientRect().top - bar.getBoundingClientRect().top) <= 2, extraProgress: Boolean(entry.querySelector('[data-slot="progress"]')) };
  84  |   }));
  85  |   facts.forEach(fact => { expect(fact.sameRow).toBe(true); expect(fact.extraProgress).toBe(false); expect(fact.metadataHeight).toBeLessThanOrEqual(20); });
  86  |   writeFileSync(`${captures}/object-progress-geometry.json`, JSON.stringify(facts, null, 2));
  87  |   const previews = page.getByRole("region", { name: "讲稿预览", exact: true });
  88  |   await previews.getByRole("button", { name: "课堂小结", exact: true }).click();
  89  |   await expect(previews.getByRole("img", { name: "当前讲稿：课堂小结", exact: true })).toBeVisible();
  90  |   expect(await previews.getByRole("img", { name: "当前讲稿：课堂小结", exact: true }).evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 1000)).toBe(true);
  91  | });
  92  | 
  93  | test("narrow Scope searches hidden classes and focuses the accepted scope without replacing the shared editor", async ({ page }) => {
  94  |   await page.setViewportSize({ width: 390, height: 844 });
  95  |   await page.goto("/#scope-navigation");
  96  |   const scene = page.getByRole("region", { name: "课程范围内容", exact: true }), note = scene.getByRole("textbox", { name: "范围教学备注", exact: true });
  97  |   await note.fill("公共资源草稿");
  98  |   const editor = await note.elementHandle();
  99  |   const trigger = scene.getByRole("button", { name: "更多班级", exact: true });
  100 |   await expect(trigger).toContainText("9");
  101 |   await trigger.click();
  102 |   const popup = page.locator(".rain-navigation-scope-dropdown");
  103 |   await popup.getByRole("textbox", { name: "搜索范围", exact: true }).fill("5 班");
  104 |   await popup.getByRole("button", { name: /高等数学 5 班/ }).click();
  105 |   const selected = scene.getByRole("tab", { name: "高等数学 5 班", exact: true });
  106 |   await expect(selected).toBeFocused();
  107 |   await expect(selected).toHaveAttribute("aria-selected", "true");
  108 |   expect(await selected.locator('.rain-tabs__label').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  109 |   await expect(note).toHaveValue("");
  110 |   expect(await editor!.evaluate(element => element.isConnected)).toBe(true);
  111 |   await scene.getByRole("tab", { name: "公共资源包", exact: true }).click();
  112 |   await expect(note).toHaveValue("公共资源草稿");
  113 |   await page.screenshot({ path: `${captures}/scope-narrow-selected.png`, fullPage: true });
  114 | });
  115 | 
  116 | test("course workspace keeps its main geometry and draft through narrow peek, unfit pin and wide recovery", async ({ page }) => {
  117 |   await page.goto("/#workspace");
  118 |   const scene = page.getByRole("region", { name: "课程资料编辑", exact: true });
  119 |   const note = scene.getByRole("textbox", { name: "教学备注", exact: true });
  120 |   await expect(note).toBeVisible();
  121 |   const noteBox = (await note.boundingBox())!, mainBox = (await scene.locator('.workspace-recipe__main').boundingBox())!;
> 122 |   expect(noteBox.y + noteBox.height).toBeLessThanOrEqual(mainBox.y + mainBox.height);
      |                                      ^ Error: expect(received).toBeLessThanOrEqual(expected)
  123 |   await note.fill("按资料 ID 保留的函数讲义备注");
  124 |   const editor = await note.elementHandle();
  125 |   await scene.getByRole("treeitem", { name: "1.2 极限的直观理解", exact: true }).click();
  126 |   await expect(note).toHaveValue("");
  127 |   await scene.getByRole("treeitem", { name: "1.1 函数的定义与表示", exact: true }).click();
  128 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  129 |   await page.setViewportSize({ width: 390, height: 844 });
  130 |   const directory = scene.locator('[data-region-id="directory"][data-side="start"]'), main = scene.locator(".workspace-recipe__main");
  131 |   await expect(directory).toBeHidden();
  132 |   await main.evaluate(el => { el.scrollTop = Math.min(120, el.scrollHeight - el.clientHeight); });
  133 |   const geometry = () => main.evaluate(el => { const rect = el.getBoundingClientRect(); return { x: rect.x, width: rect.width, scroll: el.scrollTop }; });
  134 |   const before = await geometry();
  135 |   const restore = scene.locator('[data-workspace-action="restore"][aria-controls$="-workspace-directory"]');
  136 |   await restore.click();
  137 |   await expect(directory).toHaveAttribute("data-temporary", "true");
  138 |   expect((await directory.boundingBox())!.height).toBeLessThanOrEqual(380);
  139 |   await directory.getByRole("button", { name: "固定课程目录", exact: true }).click();
  140 |   await expect(directory).toHaveAttribute("data-temporary", "true");
  141 |   await expect(directory).toHaveAttribute("data-mode", "hidden");
  142 |   const during = await geometry();
  143 |   expect(during).toEqual(before);
  144 |   await page.screenshot({ path: `${captures}/workspace-narrow-peek.png`, fullPage: true });
  145 |   await page.keyboard.press("Escape");
  146 |   await expect(directory).toBeHidden();
  147 |   await expect(restore).toBeFocused();
  148 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  149 |   await page.setViewportSize({ width: 1390, height: 900 });
  150 |   await expect(directory).toBeVisible();
  151 |   expect(await editor!.evaluate(element => element.isConnected)).toBe(true);
  152 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  153 |   writeFileSync(`${captures}/workspace-peek-geometry.json`, JSON.stringify({ before, during }, null, 2));
  154 | });
  155 | 
  156 | test("native course and work-area destinations follow history and keep query focus in their scenes", async ({ page, context }) => {
  157 |   for (const destination of [{ id: "navigation-bar", scene: "课程目的地演示", initial: "resources", first: "课程总览", firstId: "overview", second: "学习报告", secondId: "report", defaultLabel: "教学内容" }, { id: "navigation-list", scene: "教师课程导航", initial: "courses", first: "工作台", firstId: "overview", second: "资源库", secondId: "resources", defaultLabel: "我的课程" }]) {
  158 |     await page.goto(`/#${destination.id}?view=${destination.initial}`);
  159 |     const scene = page.getByRole("region", { name: destination.scene, exact: true });
  160 |     const first = scene.getByRole("link", { name: destination.first, exact: true }), second = scene.getByRole("link", { name: destination.second, exact: true });
  161 |     await first.click(); await expect(page).toHaveURL(new RegExp(`view=${destination.firstId}$`));
  162 |     await expect(first).toHaveAttribute("aria-current", "page"); await expect(first).toBeFocused();
  163 |     await second.click(); await expect(page).toHaveURL(new RegExp(`view=${destination.secondId}$`));
  164 |     await page.goBack(); await expect(first).toHaveAttribute("aria-current", "page");
  165 |     await page.goForward(); await expect(second).toHaveAttribute("aria-current", "page");
  166 |     await page.reload(); await expect(second).toHaveAttribute("aria-current", "page");
  167 |     const popupEvent = context.waitForEvent("page");
  168 |     await first.click({ modifiers: ["ControlOrMeta"] });
  169 |     const popup = await popupEvent; await popup.waitForLoadState();
  170 |     await expect(popup).toHaveURL(new RegExp(`view=${destination.firstId}$`));
  171 |     await expect(page).toHaveURL(new RegExp(`view=${destination.secondId}$`)); await popup.close();
  172 |     await page.goto(`/#${destination.id}?view=invalid`);
  173 |     await expect(scene.getByRole("link", { name: destination.defaultLabel, exact: true })).toHaveAttribute("aria-current", "page");
  174 |   }
  175 | });
  176 | 
  177 | test("exercise Tabs keep manual activation while their single marker moves and respects reduced motion", async ({ page }) => {
  178 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  179 |   await page.goto("/#navigation-tabs");
  180 |   const scene = page.getByRole("region", { name: "第一章随堂练习", exact: true }), current = scene.getByRole("tab", { name: "提交情况", exact: true }), history = scene.getByRole("tab", { name: "批阅记录", exact: true });
  181 |   await current.focus(); await page.keyboard.press("ArrowRight");
  182 |   await expect(history).toBeFocused(); await expect(current).toHaveAttribute("aria-selected", "true");
  183 |   await page.keyboard.press("Enter"); await expect(history).toHaveAttribute("aria-selected", "true");
  184 |   const marker = scene.locator(".switching-recipe__tab-marker");
  185 |   const alignment = () => scene.evaluate(el => { const line = el.querySelector(".switching-recipe__tab-marker")!.getBoundingClientRect(), label = el.querySelector('.rain-tabs__tab[aria-selected="true"] .rain-tabs__label')!.getBoundingClientRect(); return Math.abs(line.x + line.width / 2 - label.x - label.width / 2); });
  186 |   await expect.poll(alignment).toBeLessThan(1); await expect(marker).toHaveCount(1);
  187 |   await current.click();
  188 |   const animations = await marker.evaluate(async el => { await new Promise<void>(resolve => requestAnimationFrame(() => resolve())); return el.getAnimations().map(animation => ({ type: animation.constructor.name, duration: animation.effect?.getTiming().duration })); });
  189 |   expect(animations.some(animation => animation.type === "CSSTransition" && Number(animation.duration) > 0)).toBe(true);
  190 |   await scene.getByRole("tab", { name: "题目内容", exact: true }).click(); await history.click(); await current.click();
  191 |   await expect.poll(alignment).toBeLessThan(1);
  192 |   await page.setViewportSize({ width: 390, height: 844 }); await expect.poll(alignment).toBeLessThan(1);
  193 |   await page.emulateMedia({ reducedMotion: "reduce" }); await history.click(); await expect.poll(alignment).toBeLessThan(1);
  194 |   expect(await marker.evaluate(el => getComputedStyle(el).transitionDuration)).toBe("0s");
  195 |   expect(await history.locator(".rain-tabs__label").evaluate(el => getComputedStyle(el, "::after").display)).toBe("none");
  196 |   writeFileSync(`${captures}/tabs-motion-facts.json`, JSON.stringify({ animations, reducedDuration: "0s", markerCount: await marker.count() }, null, 2));
  197 |   await page.screenshot({ path: `${captures}/tabs-selected-focused.png`, fullPage: true });
  198 | });
  199 | 
  200 | test("native segmented arrows preserve the current grading identity and score across traversal axes", async ({ page }) => {
  201 |   await page.goto("/#segmented-control");
  202 |   const scene = page.getByRole("region", { name: "批阅顺序演示", exact: true }), note = scene.getByRole("textbox", { name: "批阅备注", exact: true }), score = scene.getByRole("spinbutton", { name: "得分", exact: true });
  203 |   await note.fill("欧阳小明第 3 题未保存备注");
  204 |   await scene.getByRole("radio", { name: "按人", exact: true }).focus(); await page.keyboard.press("ArrowRight");
  205 |   await expect(scene.getByRole("radio", { name: "按题", exact: true })).toBeChecked();
  206 |   await expect(note).toHaveValue("欧阳小明第 3 题未保存备注"); await expect(score).toHaveValue("7");
  207 |   await scene.getByRole("button", { name: "第 1 题 · 函数的概念", exact: true }).click();
  208 |   await expect(score).toHaveValue(""); await expect(scene.getByRole("button", { name: "保存评分", exact: true })).toBeDisabled();
  209 |   await score.fill("9"); await note.fill("欧阳小明第 1 题备注");
  210 |   await scene.getByRole("radio", { name: "按题", exact: true }).focus(); await page.keyboard.press("ArrowLeft");
  211 |   await expect(scene.getByRole("button", { name: "欧阳小明", exact: true })).toHaveAttribute("aria-pressed", "true");
  212 |   await scene.getByRole("button", { name: "李梦", exact: true }).click(); await expect(score).toHaveValue("");
  213 |   await scene.getByRole("button", { name: "欧阳小明", exact: true }).click(); await expect(score).toHaveValue("9"); await expect(note).toHaveValue("欧阳小明第 1 题备注");
  214 |   await scene.getByRole("button", { name: "保存评分", exact: true }).click(); await expect(scene.getByRole("status")).toHaveText("评分已在本地保存");
  215 |   await page.screenshot({ path: `${captures}/segmented-after-traversal.png`, fullPage: true });
  216 | });
  217 | 
  218 | test("exercise marker stays in the selected label at 200 percent CSS zoom", async ({ page }) => {
  219 |   await page.setViewportSize({ width: 780, height: 1100 });
  220 |   await page.goto("/#navigation-tabs");
  221 |   await page.evaluate(() => { document.body.style.zoom = "2"; });
  222 |   const scene = page.getByRole("region", { name: "第一章随堂练习", exact: true });
```