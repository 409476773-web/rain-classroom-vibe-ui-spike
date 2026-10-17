# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g123-playground.spec.ts >> narrow Scope searches hidden classes and focuses the accepted scope without replacing the shared editor
- Location: tests/e2e/g123-playground.spec.ts:93:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "ScopeNavigation 范围导航" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 导航 · 共享候选 · A4/R2 局部视觉已确认 · 未发布
    - paragraph [ref=e11]: 固定公共资源入口，并通过可见槽与完整搜索选择课程范围。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "推荐场景" [level=2] [ref=e21]
      - paragraph [ref=e22]: 使用少量真实内容演示组件用途。局部配方复用已有组件；本次运行视觉待审阅。
      - region "课程范围内容" [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - heading "高等数学 A" [level=3] [ref=e28]
            - paragraph [ref=e29]: 课程资料 · 2026 秋季学期
          - link "完整建设页 ↗" [ref=e30] [cursor=pointer]:
            - /url: "?sample=R2#navigation-v042"
        - generic [ref=e33]:
          - generic "分区导航" [ref=e35]:
            - generic [ref=e36]:
              - tablist "课程资料范围" [ref=e39]:
                - tab "公共资源包" [ref=e40] [cursor=pointer]:
                  - generic [ref=e42]:
                    - generic [ref=e43]: 课程内容 · 班级共用
                    - generic [ref=e44]: 公共资源包
                - tab "高等数学 5 班" [active] [selected] [ref=e46] [cursor=pointer]:
                  - generic [ref=e48]:
                    - generic [ref=e49]: 教学班 · 2026 秋
                    - generic [ref=e50]: 高等数学 5 班
              - button "更多班级" [ref=e53] [cursor=pointer]:
                - generic [ref=e55]: "9"
          - tabpanel "高等数学 5 班" [ref=e59]:
            - generic [ref=e60]:
              - generic [ref=e61]: 课程资料 / 高等数学 5 班
              - generic [ref=e62]:
                - generic [ref=e63]:
                  - heading "第一章 函数、极限与连续" [level=3] [ref=e64]
                  - paragraph [ref=e65]: 3 项资料 · 当前教学班的课程内容
                - button "添加资料" [ref=e66] [cursor=pointer]
              - list "本章资料" [ref=e70]:
                - listitem [ref=e71]:
                  - generic [ref=e74]:
                    - strong [ref=e75]: 函数的定义与表示
                    - generic [ref=e76]: 讲义 · PDF · 8 页
                  - generic [ref=e77]: 已开放
                - listitem [ref=e78]:
                  - generic [ref=e81]:
                    - strong [ref=e82]: 极限的直观理解
                    - generic [ref=e83]: 视频 · 18 分钟
                  - generic [ref=e84]: 已开放
                - listitem [ref=e85]:
                  - generic [ref=e88]:
                    - strong [ref=e89]: 第一章随堂练习
                    - generic [ref=e90]: 练习 · 3 道题
                  - generic [ref=e91]: 草稿
              - generic [ref=e93]:
                - generic [ref=e94]: 范围教学备注
                - textbox "范围教学备注" [ref=e96]:
                  - /placeholder: 记录本范围的教学安排
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - text: 高等数学 5 班
                  - status [ref=e99]: · 仅本地演示
                - button "保存草稿" [ref=e100] [cursor=pointer]
      - generic [ref=e102]:
        - generic [ref=e103]:
          - button "复制代码" [ref=e104] [cursor=pointer]
          - status
        - code [ref=e107]: "import { ScopeNavigationRecommendedScene } from \"./recipes/navigation-v042/scope-connected-recipes\"; // 同时携带该文件声明的配方 CSS 与本地依赖。 <ScopeNavigationRecommendedScene />"
    - button "高级组合与异常状态" [ref=e109] [cursor=pointer]
  - region [ref=e111]:
    - heading "使用边界" [level=2] [ref=e112]
    - generic [ref=e113]:
      - generic [ref=e114]:
        - heading "适合用在" [level=3] [ref=e115]
        - list [ref=e116]:
          - listitem [ref=e117]: 公共资源包与多个班级范围，需要更多范围搜索和当前项稳定可见。
      - generic [ref=e118]:
        - heading "避免用在" [level=3] [ref=e119]
        - list [ref=e120]:
          - listitem [ref=e121]: 不负责保存、同步、发布或业务身份服务；不要按标签或数组下标保存草稿。
  - generic [ref=e122]:
    - region [ref=e123]:
      - heading "API 与结构" [level=2] [ref=e124]
      - table [ref=e126]:
        - caption [ref=e127]: ScopeNavigation 范围导航 常用接口
        - rowgroup [ref=e128]:
          - row [ref=e129]:
            - columnheader "名称" [ref=e130]
            - columnheader "类型" [ref=e131]
            - columnheader "默认" [ref=e132]
            - columnheader "说明" [ref=e133]
        - rowgroup [ref=e134]:
          - row [ref=e135]:
            - rowheader [ref=e136]:
              - code [ref=e137]: items
            - cell [ref=e138]:
              - code [ref=e139]: readonly ScopeNavigationItem[]
            - cell "—" [ref=e140]
            - cell "首项必须是公共资源范围；每项 id、label 必填，可带 description、icon、disabled。" [ref=e141]
          - row [ref=e142]:
            - rowheader [ref=e143]:
              - code [ref=e144]: value / onValueChange
            - cell [ref=e145]:
              - code [ref=e146]: string | null / (id) => void
            - cell "—" [ref=e147]
            - cell "范围选择请求由宿主接受；当前项不存在时提示，不自动换范围。" [ref=e148]
          - row [ref=e149]:
            - rowheader [ref=e150]:
              - code [ref=e151]: visibleLimit
            - cell [ref=e152]:
              - code [ref=e153]: 3 | 4 | 5
            - cell "4" [ref=e154]
            - cell "受真实宽度预算限制，当前溢出项替换最后可见槽。" [ref=e155]
          - row [ref=e156]:
            - rowheader [ref=e157]:
              - code [ref=e158]: loading / error
            - cell [ref=e159]:
              - code [ref=e160]: boolean / string
            - cell "—" [ref=e161]
            - cell "宿主提供状态；组件不取数。" [ref=e162]
          - row [ref=e163]:
            - rowheader [ref=e164]:
              - code [ref=e165]: children / renderSurface
            - cell [ref=e166]:
              - code [ref=e167]: ReactNode / renderer
            - cell "—" [ref=e168]
            - cell "共享编辑器内容保持实例；可组合 ConnectedSurface。" [ref=e169]
      - paragraph [ref=e170]: Parts / Slots：Root → navigation track + More Popover/search/results + sharedContent panels；renderSurface 可提供联合工作面。
    - region [ref=e171]:
      - heading "调用示例" [level=2] [ref=e172]
      - generic [ref=e173]:
        - generic [ref=e174]:
          - button "复制代码" [ref=e175] [cursor=pointer]
          - status
        - code [ref=e178]: "<ScopeNavigation items={scopes} value={scopeId} onValueChange={setScopeId} visibleLimit={3} aria-label=\"课程内容范围\" renderSurface={({ track, panels }) => <ConnectedSurface instanceId=\"course-resources\" activeKey={scopeId} track={track}> {panels} </ConnectedSurface>}> <ScopeEditor scopeId={scopeId} drafts={draftsByScopeId} /> </ScopeNavigation>"
      - paragraph [ref=e179]:
        - text: 当前源码：
        - code [ref=e180]: packages/ui/src/navigation/navigation.tsx
```

# Test source

```ts
  8   | 
  9   | test("all 30 independent component URLs show their demo, API and copyable code", async ({ page }) => {
  10  |   const errors: string[] = [];
  11  |   page.on("pageerror", error => errors.push(error.message));
  12  |   for (const id of routes) {
  13  |     await page.goto(`/#${id}`);
  14  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  15  |     await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  16  |     await expect(page.locator("pre code").first()).not.toBeEmpty();
  17  |     await expect(page.getByRole("button", { name: "复制代码", exact: true }).first()).toBeVisible();
  18  |     await page.screenshot({ path: `${captures}/${id}-desktop.png`, fullPage: true });
  19  |   }
  20  |   expect(errors).toEqual([]);
  21  | });
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
> 108 |   expect(await selected.locator('.rain-tabs__label > span').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      |                                                                                                               ^ Error: expect(received).toBe(expected) // Object.is equality
  109 |   await expect(note).toHaveValue("");
  110 |   expect(await editor!.evaluate(element => element.isConnected)).toBe(true);
  111 |   await trigger.click();
  112 |   await popup.getByRole("textbox", { name: "搜索范围", exact: true }).fill("10 班");
  113 |   await popup.getByRole("button", { name: /高等数学 10 班/ }).click();
  114 |   const tenth = scene.getByRole("tab", { name: "高等数学 10 班", exact: true });
  115 |   await expect(tenth).toHaveAttribute("aria-selected", "true");
  116 |   expect(await tenth.locator('.rain-tabs__label > span').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  117 |   await scene.getByRole("tab", { name: "公共资源包", exact: true }).click();
  118 |   await expect(note).toHaveValue("公共资源草稿");
  119 |   await page.screenshot({ path: `${captures}/scope-narrow-selected.png`, fullPage: true });
  120 | });
  121 | 
  122 | test("course workspace keeps its main geometry and draft through narrow peek, unfit pin and wide recovery", async ({ page }) => {
  123 |   await page.goto("/#workspace");
  124 |   const scene = page.getByRole("region", { name: "课程资料编辑", exact: true });
  125 |   const note = scene.getByRole("textbox", { name: "教学备注", exact: true });
  126 |   await expect(note).toBeVisible();
  127 |   const noteBox = (await note.boundingBox())!, mainBox = (await scene.locator('.workspace-recipe__main').boundingBox())!;
  128 |   expect(noteBox.y + noteBox.height).toBeLessThanOrEqual(mainBox.y + mainBox.height);
  129 |   await note.fill("按资料 ID 保留的函数讲义备注");
  130 |   const editor = await note.elementHandle();
  131 |   await scene.getByRole("treeitem", { name: "1.2 极限的直观理解", exact: true }).click();
  132 |   await expect(note).toHaveValue("");
  133 |   await scene.getByRole("treeitem", { name: "1.1 函数的定义与表示", exact: true }).click();
  134 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  135 |   await page.setViewportSize({ width: 390, height: 844 });
  136 |   const directory = scene.locator('[data-region-id="directory"][data-side="start"]'), main = scene.locator(".workspace-recipe__main");
  137 |   await expect(directory).toBeHidden();
  138 |   await main.evaluate(el => { el.scrollTop = Math.min(120, el.scrollHeight - el.clientHeight); });
  139 |   const geometry = () => main.evaluate(el => { const rect = el.getBoundingClientRect(); return { x: rect.x, width: rect.width, scroll: el.scrollTop }; });
  140 |   const before = await geometry();
  141 |   const restore = scene.locator('[data-workspace-action="restore"][aria-controls$="-workspace-directory"]');
  142 |   await restore.click();
  143 |   await expect(directory).toHaveAttribute("data-temporary", "true");
  144 |   expect((await directory.boundingBox())!.height).toBeLessThanOrEqual(380);
  145 |   await directory.getByRole("button", { name: "固定课程目录", exact: true }).click();
  146 |   await expect(directory).toHaveAttribute("data-temporary", "true");
  147 |   await expect(directory).toHaveAttribute("data-mode", "hidden");
  148 |   const during = await geometry();
  149 |   expect(during).toEqual(before);
  150 |   await page.screenshot({ path: `${captures}/workspace-narrow-peek.png`, fullPage: true });
  151 |   await page.keyboard.press("Escape");
  152 |   await expect(directory).toBeHidden();
  153 |   await expect(restore).toBeFocused();
  154 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  155 |   await page.setViewportSize({ width: 1390, height: 900 });
  156 |   await expect(directory).toBeVisible();
  157 |   expect(await editor!.evaluate(element => element.isConnected)).toBe(true);
  158 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  159 |   writeFileSync(`${captures}/workspace-peek-geometry.json`, JSON.stringify({ before, during }, null, 2));
  160 | });
  161 | 
  162 | test("native course and work-area destinations follow history and keep query focus in their scenes", async ({ page, context }) => {
  163 |   for (const destination of [{ id: "navigation-bar", scene: "课程目的地演示", initial: "resources", first: "课程总览", firstId: "overview", second: "学习报告", secondId: "report", defaultLabel: "教学内容" }, { id: "navigation-list", scene: "教师课程导航", initial: "courses", first: "工作台", firstId: "overview", second: "资源库", secondId: "resources", defaultLabel: "我的课程" }]) {
  164 |     await page.goto(`/#${destination.id}?view=${destination.initial}`);
  165 |     const scene = page.getByRole("region", { name: destination.scene, exact: true });
  166 |     const first = scene.getByRole("link", { name: destination.first, exact: true }), second = scene.getByRole("link", { name: destination.second, exact: true });
  167 |     await first.click(); await expect(page).toHaveURL(new RegExp(`view=${destination.firstId}$`));
  168 |     await expect(first).toHaveAttribute("aria-current", "page"); await expect(first).toBeFocused();
  169 |     await second.click(); await expect(page).toHaveURL(new RegExp(`view=${destination.secondId}$`));
  170 |     await page.goBack(); await expect(first).toHaveAttribute("aria-current", "page");
  171 |     await page.goForward(); await expect(second).toHaveAttribute("aria-current", "page");
  172 |     await page.reload(); await expect(second).toHaveAttribute("aria-current", "page");
  173 |     const popupEvent = context.waitForEvent("page");
  174 |     await first.click({ modifiers: ["ControlOrMeta"] });
  175 |     const popup = await popupEvent; await popup.waitForLoadState();
  176 |     await expect(popup).toHaveURL(new RegExp(`view=${destination.firstId}$`));
  177 |     await expect(page).toHaveURL(new RegExp(`view=${destination.secondId}$`)); await popup.close();
  178 |     await page.goto(`/#${destination.id}?view=invalid`);
  179 |     await expect(scene.getByRole("link", { name: destination.defaultLabel, exact: true })).toHaveAttribute("aria-current", "page");
  180 |   }
  181 | });
  182 | 
  183 | test("exercise Tabs keep manual activation while their single marker moves and respects reduced motion", async ({ page }) => {
  184 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  185 |   await page.goto("/#navigation-tabs");
  186 |   const scene = page.getByRole("region", { name: "第一章随堂练习", exact: true }), current = scene.getByRole("tab", { name: "提交情况", exact: true }), history = scene.getByRole("tab", { name: "批阅记录", exact: true });
  187 |   await current.focus(); await page.keyboard.press("ArrowRight");
  188 |   await expect(history).toBeFocused(); await expect(current).toHaveAttribute("aria-selected", "true");
  189 |   await page.keyboard.press("Enter"); await expect(history).toHaveAttribute("aria-selected", "true");
  190 |   const marker = scene.locator(".switching-recipe__tab-marker");
  191 |   const alignment = () => scene.evaluate(el => { const line = el.querySelector(".switching-recipe__tab-marker")!.getBoundingClientRect(), label = el.querySelector('.rain-tabs__tab[aria-selected="true"] .rain-tabs__label')!.getBoundingClientRect(); return Math.abs(line.x + line.width / 2 - label.x - label.width / 2); });
  192 |   await expect.poll(alignment).toBeLessThan(1); await expect(marker).toHaveCount(1);
  193 |   await current.click();
  194 |   const animations = await marker.evaluate(async el => { await new Promise<void>(resolve => requestAnimationFrame(() => resolve())); return el.getAnimations().map(animation => ({ type: animation.constructor.name, duration: animation.effect?.getTiming().duration })); });
  195 |   expect(animations.some(animation => animation.type === "CSSTransition" && Number(animation.duration) > 0)).toBe(true);
  196 |   await scene.getByRole("tab", { name: "题目内容", exact: true }).click(); await history.click(); await current.click();
  197 |   await expect.poll(alignment).toBeLessThan(1);
  198 |   await page.setViewportSize({ width: 390, height: 844 }); await expect.poll(alignment).toBeLessThan(1);
  199 |   await page.emulateMedia({ reducedMotion: "reduce" }); await history.click(); await expect.poll(alignment).toBeLessThan(1);
  200 |   expect(await marker.evaluate(el => getComputedStyle(el).transitionDuration)).toBe("0s");
  201 |   expect(await history.locator(".rain-tabs__label").evaluate(el => getComputedStyle(el, "::after").display)).toBe("none");
  202 |   writeFileSync(`${captures}/tabs-motion-facts.json`, JSON.stringify({ animations, reducedDuration: "0s", markerCount: await marker.count() }, null, 2));
  203 |   await page.screenshot({ path: `${captures}/tabs-selected-focused.png`, fullPage: true });
  204 | });
  205 | 
  206 | test("native segmented arrows preserve the current grading identity and score across traversal axes", async ({ page }) => {
  207 |   await page.goto("/#segmented-control");
  208 |   const scene = page.getByRole("region", { name: "批阅顺序演示", exact: true }), note = scene.getByRole("textbox", { name: "批阅备注", exact: true }), score = scene.getByRole("spinbutton", { name: "得分", exact: true });
```