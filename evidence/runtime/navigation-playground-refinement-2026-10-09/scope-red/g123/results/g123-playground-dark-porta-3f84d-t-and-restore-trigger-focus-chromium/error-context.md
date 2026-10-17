# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g123-playground.spec.ts >> dark portaled Scope results use readable theme text and restore trigger focus
- Location: tests/e2e/g123-playground.spec.ts:88:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rgb(239, 241, 245)"
Received: "rgb(32, 38, 49)"
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
      - button "浅色" [ref=e13] [cursor=pointer]
      - button "深色" [pressed] [ref=e15] [cursor=pointer]
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
                - tab "公共资源包" [selected] [ref=e40] [cursor=pointer]:
                  - generic [ref=e44]:
                    - generic [ref=e45]: 课程内容 · 班级共用
                    - generic [ref=e46]: 公共资源包
                - tab "高等数学 1 班" [ref=e48] [cursor=pointer]:
                  - generic [ref=e52]:
                    - generic [ref=e53]: 教学班 · 2026 秋
                    - generic [ref=e54]: 高等数学 1 班
                - tab "高等数学 2 班" [ref=e56] [cursor=pointer]:
                  - generic [ref=e60]:
                    - generic [ref=e61]: 教学班 · 2026 秋
                    - generic [ref=e62]: 高等数学 2 班
              - generic [ref=e64]:
                - button "更多班级" [expanded] [ref=e66] [cursor=pointer]:
                  - generic [ref=e68]: "8"
                - dialog [ref=e73]:
                  - generic [ref=e74]:
                    - generic [ref=e75]:
                      - heading "选择课程内容范围" [level=2] [ref=e76]
                      - button "关闭范围选择" [ref=e77]
                    - textbox "搜索范围" [active] [ref=e83]:
                      - /placeholder: 搜索班级名称或序号
                    - generic "范围搜索结果" [ref=e85]:
                      - button "公共资源包 课程内容 · 班级共用" [pressed] [ref=e86]:
                        - generic [ref=e89]:
                          - strong [ref=e90]: 公共资源包
                          - generic [ref=e91]: 课程内容 · 班级共用
                      - button "高等数学 1 班 教学班 · 2026 秋" [ref=e93]:
                        - generic [ref=e96]:
                          - strong [ref=e97]: 高等数学 1 班
                          - generic [ref=e98]: 教学班 · 2026 秋
                      - button "高等数学 2 班 教学班 · 2026 秋" [ref=e99]:
                        - generic [ref=e102]:
                          - strong [ref=e103]: 高等数学 2 班
                          - generic [ref=e104]: 教学班 · 2026 秋
                      - button "高等数学 3 班 教学班 · 2026 秋" [ref=e105]:
                        - generic [ref=e108]:
                          - strong [ref=e109]: 高等数学 3 班
                          - generic [ref=e110]: 教学班 · 2026 秋
                      - button "高等数学 4 班 教学班 · 2026 秋" [ref=e111]:
                        - generic [ref=e114]:
                          - strong [ref=e115]: 高等数学 4 班
                          - generic [ref=e116]: 教学班 · 2026 秋
                      - button "高等数学 5 班 教学班 · 2026 秋" [ref=e117]:
                        - generic [ref=e120]:
                          - strong [ref=e121]: 高等数学 5 班
                          - generic [ref=e122]: 教学班 · 2026 秋
                      - button "高等数学 6 班 教学班 · 2026 秋" [ref=e123]:
                        - generic [ref=e126]:
                          - strong [ref=e127]: 高等数学 6 班
                          - generic [ref=e128]: 教学班 · 2026 秋
                      - button "高等数学 7 班 教学班 · 2026 秋" [ref=e129]:
                        - generic [ref=e132]:
                          - strong [ref=e133]: 高等数学 7 班
                          - generic [ref=e134]: 教学班 · 2026 秋
                      - button "高等数学 8 班 教学班 · 2026 秋" [ref=e135]:
                        - generic [ref=e138]:
                          - strong [ref=e139]: 高等数学 8 班
                          - generic [ref=e140]: 教学班 · 2026 秋
                      - button "高等数学 9 班 教学班 · 2026 秋" [ref=e141]:
                        - generic [ref=e144]:
                          - strong [ref=e145]: 高等数学 9 班
                          - generic [ref=e146]: 教学班 · 2026 秋
                      - button "高等数学 10 班 教学班 · 2026 秋" [ref=e147]:
                        - generic [ref=e150]:
                          - strong [ref=e151]: 高等数学 10 班
                          - generic [ref=e152]: 教学班 · 2026 秋
          - tabpanel "公共资源包" [ref=e157]:
            - generic [ref=e158]:
              - generic [ref=e159]: 课程资料 / 公共资源包
              - generic [ref=e160]:
                - generic [ref=e161]:
                  - heading "第一章 函数、极限与连续" [level=3] [ref=e162]
                  - paragraph [ref=e163]: 3 项资料 · 供关联班级复用
                - button "添加资料" [ref=e164] [cursor=pointer]
              - list "本章资料" [ref=e168]:
                - listitem [ref=e169]:
                  - generic [ref=e172]:
                    - strong [ref=e173]: 函数的定义与表示
                    - generic [ref=e174]: 讲义 · PDF · 12 页
                  - generic [ref=e175]: 课程共用
                - listitem [ref=e176]:
                  - generic [ref=e179]:
                    - strong [ref=e180]: 极限的直观理解
                    - generic [ref=e181]: 视频 · 18 分钟
                  - generic [ref=e182]: 课程共用
                - listitem [ref=e183]:
                  - generic [ref=e186]:
                    - strong [ref=e187]: 第一章随堂练习
                    - generic [ref=e188]: 练习 · 3 道题
                  - generic [ref=e189]: 课程共用
              - generic [ref=e191]:
                - generic [ref=e192]: 范围教学备注
                - textbox "范围教学备注" [ref=e194]:
                  - /placeholder: 记录本范围的教学安排
              - generic [ref=e195]:
                - generic [ref=e196]:
                  - text: 公共资源可供班级复用
                  - status [ref=e197]: · 仅本地演示
                - button "保存草稿" [ref=e198] [cursor=pointer]
      - generic [ref=e200]:
        - generic [ref=e201]:
          - button "复制代码" [ref=e202] [cursor=pointer]
          - status
        - code [ref=e205]: "import { ScopeNavigationRecommendedScene } from \"./recipes/navigation-v042/scope-connected-recipes\"; // 同时携带 scope-connected-recipes.css。 <ScopeNavigationRecommendedScene />"
    - button "高级组合与异常状态" [ref=e207] [cursor=pointer]
  - region [ref=e209]:
    - heading "使用边界" [level=2] [ref=e210]
    - generic [ref=e211]:
      - generic [ref=e212]:
        - heading "适合用在" [level=3] [ref=e213]
        - list [ref=e214]:
          - listitem [ref=e215]: 公共资源包与多个班级范围，需要更多范围搜索和当前项稳定可见。
      - generic [ref=e216]:
        - heading "避免用在" [level=3] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]: 不负责保存、同步、发布或业务身份服务；不要按标签或数组下标保存草稿。
  - generic [ref=e220]:
    - region [ref=e221]:
      - heading "API 与结构" [level=2] [ref=e222]
      - table [ref=e224]:
        - caption [ref=e225]: ScopeNavigation 范围导航 常用接口
        - rowgroup [ref=e226]:
          - row [ref=e227]:
            - columnheader "名称" [ref=e228]
            - columnheader "类型" [ref=e229]
            - columnheader "默认" [ref=e230]
            - columnheader "说明" [ref=e231]
        - rowgroup [ref=e232]:
          - row [ref=e233]:
            - rowheader [ref=e234]:
              - code [ref=e235]: items
            - cell [ref=e236]:
              - code [ref=e237]: readonly ScopeNavigationItem[]
            - cell "—" [ref=e238]
            - cell "首项必须是公共资源范围；每项 id、label 必填，可带 description、icon、disabled。" [ref=e239]
          - row [ref=e240]:
            - rowheader [ref=e241]:
              - code [ref=e242]: value / onValueChange
            - cell [ref=e243]:
              - code [ref=e244]: string | null / (id) => void
            - cell "—" [ref=e245]
            - cell "范围选择请求由宿主接受；当前项不存在时提示，不自动换范围。" [ref=e246]
          - row [ref=e247]:
            - rowheader [ref=e248]:
              - code [ref=e249]: visibleLimit
            - cell [ref=e250]:
              - code [ref=e251]: 3 | 4 | 5
            - cell "4" [ref=e252]
            - cell "受真实宽度预算限制，当前溢出项替换最后可见槽。" [ref=e253]
          - row [ref=e254]:
            - rowheader [ref=e255]:
              - code [ref=e256]: loading / error
            - cell [ref=e257]:
              - code [ref=e258]: boolean / string
            - cell "—" [ref=e259]
            - cell "宿主提供状态；组件不取数。" [ref=e260]
          - row [ref=e261]:
            - rowheader [ref=e262]:
              - code [ref=e263]: children / renderSurface
            - cell [ref=e264]:
              - code [ref=e265]: ReactNode / renderer
            - cell "—" [ref=e266]
            - cell "共享编辑器内容保持实例；可组合 ConnectedSurface。" [ref=e267]
      - paragraph [ref=e268]: Parts / Slots：Root → navigation track + More Popover/search/results + sharedContent panels；renderSurface 可提供联合工作面。
    - region [ref=e269]:
      - heading "调用示例" [level=2] [ref=e270]
      - generic [ref=e271]:
        - generic [ref=e272]:
          - button "复制代码" [ref=e273] [cursor=pointer]
          - status
        - code [ref=e276]: "<ScopeNavigation items={scopes} value={scopeId} onValueChange={setScopeId} visibleLimit={3} aria-label=\"课程内容范围\" renderSurface={({ track, panels }) => <ConnectedSurface instanceId=\"course-resources\" activeKey={scopeId} track={track}> {panels} </ConnectedSurface>}> <ScopeEditor scopeId={scopeId} drafts={draftsByScopeId} /> </ScopeNavigation>"
      - paragraph [ref=e277]:
        - text: 当前源码：
        - code [ref=e278]: packages/ui/src/navigation/navigation.tsx
```

# Test source

```ts
  6   | const captures = process.env.RAIN_NAVIGATION_EVIDENCE_DIR ? `${process.env.RAIN_NAVIGATION_EVIDENCE_DIR}/g123` : fileURLToPath(new URL("../../evidence/runtime/g123-playground-2026-10-07/browser/", import.meta.url));
  7   | mkdirSync(captures, { recursive: true });
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
  45  |   const draft = page.getByRole("textbox", { name: "该内容面备注" });
  46  |   await draft.fill("资料草稿");
  47  |   await page.getByRole("tab", { name: "课堂任务" }).click();
  48  |   await expect(draft).toHaveValue("");
  49  |   await draft.fill("课堂草稿");
  50  |   await page.getByRole("button", { name: "切换为连接工作面样式" }).click();
  51  |   await expect(draft).toHaveValue("课堂草稿");
  52  |   await page.getByRole("tab", { name: "课程资料" }).click();
  53  |   await expect(draft).toHaveValue("资料草稿");
  54  |   await page.goto("/#workspace?chapter=2");
  55  |   await expect(page.locator("#workspace-title")).toBeVisible();
  56  |   const workspaceDraft = page.getByRole("textbox", { name: "宿主草稿" });
  57  |   await workspaceDraft.fill("布局操作保留的草稿");
  58  |   await page.getByRole("button", { name: "专注主内容" }).click();
  59  |   await expect(workspaceDraft).toHaveValue("布局操作保留的草稿");
  60  |   await page.getByRole("button", { name: "退出专注" }).click();
  61  |   await expect(workspaceDraft).toHaveValue("布局操作保留的草稿");
  62  | });
  63  | 
  64  | test("context menu keyboard access follows the same engine and returns focus", async ({ page }) => {
  65  |   await page.goto("/#context-menu");
  66  |   const trigger = page.locator('[data-demo-component="context-menu"] [data-rain-id="ui-context-menu"][data-slot="trigger"]');
  67  |   await trigger.focus();
  68  |   await page.keyboard.press("Shift+F10");
  69  |   await expect(page.getByRole("menuitem").first()).toBeVisible();
  70  |   await page.keyboard.press("Escape");
  71  |   await expect(trigger).toBeFocused();
  72  | });
  73  | 
  74  | test("dark portaled Sheet preserves its theme and the trigger receives focus on closing", async ({ page }) => {
  75  |   await page.goto("/#sheet");
  76  |   await page.getByRole("button", { name: "深色", exact: true }).click();
  77  |   const trigger = page.getByRole("button", { name: "打开资料详情", exact: true });
  78  |   await trigger.click();
  79  |   const popup = page.locator('[data-rain-id="ui-sheet"][data-slot="content"]');
  80  |   await expect(popup).toBeVisible();
  81  |   expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  82  |   expect(await popup.evaluate(el => getComputedStyle(el).backgroundColor)).toBe("rgb(30, 36, 59)");
  83  |   await page.screenshot({ path: `${captures}/sheet-dark-open.png`, fullPage: true });
  84  |   await page.keyboard.press("Escape");
  85  |   await expect(trigger).toBeFocused();
  86  | });
  87  | 
  88  | test("dark portaled Scope results use readable theme text and restore trigger focus", async ({ page }) => {
  89  |   await page.goto("/#scope-navigation");
  90  |   await page.getByRole("button", { name: "深色", exact: true }).click();
  91  |   const scene = page.getByRole("region", { name: "课程范围内容", exact: true });
  92  |   const trigger = scene.getByRole("button", { name: /更多/ });
  93  |   await trigger.click();
  94  |   const popup = page.locator(".rain-navigation-scope-dropdown");
  95  |   await expect(popup).toBeVisible();
  96  |   expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  97  |   const paint = await popup.locator(".rain-scope-navigation__result:not([aria-pressed='true'])").first().evaluate(el => {
  98  |     const style = getComputedStyle(el);
  99  |     const probe = document.createElement("span");
  100 |     probe.style.color = "var(--rain-category-text-neutral-1)";
  101 |     el.append(probe);
  102 |     const expected = getComputedStyle(probe).color;
  103 |     probe.remove();
  104 |     return { current: style.color, expected };
  105 |   });
> 106 |   expect(paint.current).toBe(paint.expected);
      |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  107 |   await page.screenshot({ path: `${captures}/scope-dark-popup.png`, fullPage: true });
  108 |   await page.keyboard.press("Escape");
  109 |   await expect(trigger).toBeFocused();
  110 | });
  111 | 
```