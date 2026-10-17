# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g123-playground.spec.ts >> all component examples fit a narrow viewport
- Location: tests/e2e/g123-playground.spec.ts:32:1

# Error details

```
Error: alert

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 391
Received:    621
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - link "返回组件总览" [ref=e6] [cursor=pointer]:
        - /url: "#components"
      - generic [ref=e8]:
        - paragraph [ref=e9]: 反馈 / FEEDBACK
        - heading "Alert 提示" [level=1] [ref=e10]
        - paragraph [ref=e11]: 让重要信息留在相关内容旁，清楚说明发生了什么，以及下一步能做什么。
      - generic [ref=e12]:
        - group "预览主题" [ref=e13]:
          - button "浅色" [pressed] [ref=e14] [cursor=pointer]
          - button "深色" [ref=e16] [cursor=pointer]
        - group "预览密度" [ref=e18]:
          - button "常规" [pressed] [ref=e19] [cursor=pointer]
          - button "紧凑" [ref=e21] [cursor=pointer]
    - region [ref=e23]:
      - generic [ref=e24]:
        - heading "四种状态，同一种阅读方式" [level=2] [ref=e25]
        - paragraph [ref=e26]: 浅底与同色正文传达含义；复合提示显示面状状态图标。
      - generic [ref=e27]:
        - generic [ref=e28]:
          - generic [ref=e29]: 信息
          - generic [ref=e30]: 成绩发布后，学生才能查看批改结果。
        - generic [ref=e32]:
          - generic [ref=e33]: 成功
          - generic [ref=e34]: 成绩已发布，学生现在可以查看评分与评语。
        - generic [ref=e36]:
          - generic [ref=e37]: 警告
          - generic [ref=e38]: 有 3 道题尚未设置分值，请在发布前补全。
        - generic [ref=e40]:
          - generic [ref=e41]: 错误
          - generic [ref=e42]: 成绩提交失败，本次修改仍然保留。
    - region [ref=e44]:
      - generic [ref=e45]:
        - heading "有原因，也有下一步" [level=2] [ref=e46]
        - paragraph [ref=e47]: 标题、说明和操作按内容组合；提示不会自动消失。
      - generic [ref=e48]:
        - generic [ref=e49]:
          - generic [ref=e50]: 风险与处理建议
          - generic [ref=e54]:
            - generic [ref=e55]: 发布前，请检查题目设置
            - generic [ref=e56]:
              - text: 还有以下内容需要补全：
              - list [ref=e57]:
                - listitem [ref=e58]: 第 3、7、12 题尚未设置分值。
                - listitem [ref=e59]: 第 8 题缺少供学生查看的答案解析。
            - generic [ref=e60]:
              - button "检查题目" [ref=e61] [cursor=pointer]
              - button "查看提示使用说明" [ref=e63] [cursor=pointer]
        - generic [ref=e65]:
          - generic [ref=e66]:
            - generic [ref=e67]: 有成绩尚未提交
            - button "查看提交状态" [ref=e68] [cursor=pointer]
          - status [ref=e70]: 有成绩尚未提交
          - generic [ref=e71]:
            - generic [ref=e74]:
              - generic [ref=e75]: 成绩提交失败
              - generic [ref=e76]: 本次评分与评语仍然保留。关闭提示不会取消提交，你可以随时查看最新状态。
              - button "重新提交" [ref=e78] [cursor=pointer]
            - button "关闭提交提示" [ref=e80] [cursor=pointer]
          - paragraph [ref=e83]: 交互演示：首次重试失败，第二次成功，不会提交真实成绩。
    - region [ref=e84]:
      - generic [ref=e85]:
        - heading "顶部公告，保留页面上下文" [level=2] [ref=e86]
        - button "查看维护公告" [ref=e87] [cursor=pointer]
      - generic [ref=e89]:
        - generic [ref=e90]:
          - generic [ref=e93]:
            - generic [ref=e94]: 今晚 23:00—23:30 系统维护，期间暂时无法提交作业。
            - button "了解提示规则" [ref=e96] [cursor=pointer]
          - button "关闭维护公告" [ref=e98] [cursor=pointer]
        - generic [ref=e101]:
          - generic [ref=e102]: 人工智能导论 · 课程作业
          - heading "第三章 · 课堂练习" [level=3] [ref=e103]
          - paragraph [ref=e104]: 公告关闭后，课程内容仍可继续查看。
    - region [ref=e105]:
      - generic [ref=e106]:
        - heading "保留熟悉的短提示" [level=2] [ref=e107]
        - paragraph [ref=e108]: 单段文字默认不显示图标；可选配方仍可显式关闭图标，密度切换只调整留白。
      - generic [ref=e109]:
        - generic [ref=e110]:
          - generic [ref=e111]: 默认 · 同色正文、无图标
          - generic [ref=e112]: 成绩发布后，学生才能查看批改结果。
          - generic [ref=e114]: 成绩已发布，学生现在可以查看评分与评语。
          - generic [ref=e116]: 有 3 道题尚未设置分值，请在发布前补全。
          - generic [ref=e118]: 成绩提交失败，本次修改仍然保留。
        - generic [ref=e120]:
          - generic [ref=e121]: 可选 · 同色正文、显式无图标
          - generic [ref=e122]: 成绩发布后，学生才能查看批改结果。
          - generic [ref=e124]: 成绩已发布，学生现在可以查看评分与评语。
          - generic [ref=e126]: 有 3 道题尚未设置分值，请在发布前补全。
          - generic [ref=e128]: 成绩提交失败，本次修改仍然保留。
    - region [ref=e130]:
      - generic [ref=e131]:
        - heading "窄容器也能完整阅读" [level=2] [ref=e132]
        - paragraph [ref=e133]: 长文字自然换行，操作区下移，关闭入口始终独立。
      - generic [ref=e134]:
        - generic [ref=e138]:
          - generic [ref=e139]: 当前资料仅向已加入课程的学生开放，请确认所选班级与课程对应。
          - button "查看当前课程的资料访问权限说明与详细处理办法" [ref=e141] [cursor=pointer]
        - generic [ref=e146]:
          - generic [ref=e147]: 文件名称较长
          - generic [ref=e148]: 待处理文件：IntroductionToArtificialIntelligence_2026_ClassroomExercises_ChapterThree_RevisionFinal.pdf
    - generic [ref=e149]:
      - region [ref=e150]:
        - heading "API 与结构" [level=2] [ref=e151]
        - table [ref=e153]:
          - caption [ref=e154]: Alert 常用接口
          - rowgroup [ref=e155]:
            - row [ref=e156]:
              - columnheader "名称" [ref=e157]
              - columnheader "类型" [ref=e158]
              - columnheader "默认" [ref=e159]
              - columnheader "说明" [ref=e160]
          - rowgroup [ref=e161]:
            - row [ref=e162]:
              - rowheader [ref=e163]:
                - code [ref=e164]: tone
              - cell [ref=e165]:
                - code [ref=e166]: info | success | warning | error
              - cell "info" [ref=e167]
              - cell "提示语义与对应图标" [ref=e168]
            - row [ref=e169]:
              - rowheader [ref=e170]:
                - code [ref=e171]: presentation
              - cell [ref=e172]:
                - code [ref=e173]: page | banner
              - cell "page" [ref=e174]
              - cell "页面内提示或顶部公告" [ref=e175]
            - row [ref=e176]:
              - rowheader [ref=e177]:
                - code [ref=e178]: icon
              - cell [ref=e179]:
                - code [ref=e180]: ReactElement | false
              - cell "—" [ref=e181]
              - cell "显式图标或隐藏图标" [ref=e182]
            - row [ref=e183]:
              - rowheader [ref=e184]:
                - code [ref=e185]: onClose / closeLabel
              - cell [ref=e186]:
                - code [ref=e187]: MouseEventHandler / string
              - cell "—" [ref=e188]
              - cell "宿主控制关闭、草稿和焦点恢复" [ref=e189]
            - row [ref=e190]:
              - rowheader [ref=e191]:
                - code [ref=e192]: localRecipe
              - cell [ref=e193]:
                - code [ref=e194]: AlertLocalRecipe
              - cell "—" [ref=e195]
              - cell "限定实例外观，不修改共享默认" [ref=e196]
        - paragraph [ref=e197]: Parts / Slots：AlertTitle、AlertDescription、AlertActions
      - region [ref=e198]:
        - heading "调用示例" [level=2] [ref=e199]
        - generic [ref=e200]:
          - generic [ref=e201]:
            - button "复制代码" [ref=e202] [cursor=pointer]
            - status
          - code [ref=e205]: "import { Alert, AlertTitle, AlertDescription } from \"@rain-next/ui\"; export function SaveNotice() { return <Alert tone=\"success\" role=\"status\"> <AlertTitle>草稿已保存</AlertTitle> <AlertDescription>你可以继续编辑本份资料。</AlertDescription> </Alert>; }"
        - paragraph [ref=e206]:
          - text: 当前源码：
          - code [ref=e207]: packages/ui/src/alert/alert.tsx
    - generic [ref=e208]:
      - heading "使用约定" [level=2] [ref=e209]
      - paragraph [ref=e210]: 页面内持续提示用 Alert；自动消失的操作反馈用 Message / Toast；必须回应的重要确认用 AlertDialog。关闭提示不代表问题已解决。
      - paragraph [ref=e211]: 当前为未发布的共享候选；原运行视觉已确认，本轮新增文档单独审阅。四种同色正文的对比度仍需单独验收；关键任务应结合实际背景确认。
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdirSync } from "node:fs";
  3  | 
  4  | const routes = ["alert","switch","collapsible","accordion","tooltip","resizable","button-group","toggle","toggle-group","spinner","skeleton","toast","breadcrumb","scroll-area","sheet","sidebar","command","kbd","context-menu","hover-card","menubar","navigation-menu","navigation-tabs","navigation-bar","scope-navigation","navigation-list","object-navigator","segmented-control","connected-surface","workspace"];
  5  | const captures = "evidence/runtime/g123-playground-2026-10-07/browser";
  6  | mkdirSync(captures, { recursive: true });
  7  | 
  8  | test("all 30 independent component URLs show their demo, API and copyable code", async ({ page }) => {
  9  |   const errors: string[] = [];
  10 |   page.on("pageerror", error => errors.push(error.message));
  11 |   for (const id of routes) {
  12 |     await page.goto(`/#${id}`);
  13 |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  14 |     await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  15 |     await expect(page.locator("pre code").first()).not.toBeEmpty();
  16 |     await expect(page.getByRole("button", { name: "复制代码", exact: true }).first()).toBeVisible();
  17 |     await page.screenshot({ path: `${captures}/${id}-desktop.png`, fullPage: true });
  18 |   }
  19 |   expect(errors).toEqual([]);
  20 | });
  21 | 
  22 | test("the component catalog opens lazy documentation with heading focus and clipboard", async ({ page, context }) => {
  23 |   await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  24 |   await page.goto("/#components");
  25 |   await page.getByRole("link", { name: "Accordion 折叠组", exact: true }).click();
  26 |   await expect(page.locator("#accordion-title")).toBeFocused();
  27 |   await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
  28 |   await expect(page.getByText("已复制", { exact: true })).toBeVisible();
  29 |   expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Accordion");
  30 | });
  31 | 
  32 | test("all component examples fit a narrow viewport", async ({ page }) => {
  33 |   await page.setViewportSize({ width: 390, height: 844 });
  34 |   for (const id of routes) {
  35 |     await page.goto(`/#${id}`);
  36 |     await expect(page.locator(`#${id}-title`)).toBeVisible();
> 37 |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
     |                                                                                 ^ Error: alert
  38 |   }
  39 |   await page.screenshot({ path: `${captures}/workspace-narrow.png`, fullPage: true });
  40 | });
  41 | 
  42 | test("navigation drafts remain with their content and layout actions preserve workspace drafts", async ({ page }) => {
  43 |   await page.goto("/#navigation-tabs");
  44 |   const draft = page.getByRole("textbox", { name: "该内容面备注" });
  45 |   await draft.fill("资料草稿");
  46 |   await page.getByRole("tab", { name: "课堂任务" }).click();
  47 |   await expect(draft).toHaveValue("");
  48 |   await draft.fill("课堂草稿");
  49 |   await page.getByRole("button", { name: "切换为连接工作面样式" }).click();
  50 |   await expect(draft).toHaveValue("课堂草稿");
  51 |   await page.getByRole("tab", { name: "课程资料" }).click();
  52 |   await expect(draft).toHaveValue("资料草稿");
  53 |   await page.goto("/#workspace?chapter=2");
  54 |   await expect(page.locator("#workspace-title")).toBeVisible();
  55 |   const workspaceDraft = page.getByRole("textbox", { name: "宿主草稿" });
  56 |   await workspaceDraft.fill("布局操作保留的草稿");
  57 |   await page.getByRole("button", { name: "专注主内容" }).click();
  58 |   await expect(workspaceDraft).toHaveValue("布局操作保留的草稿");
  59 |   await page.getByRole("button", { name: "退出专注" }).click();
  60 |   await expect(workspaceDraft).toHaveValue("布局操作保留的草稿");
  61 | });
  62 | 
  63 | test("context menu keyboard access follows the same engine and returns focus", async ({ page }) => {
  64 |   await page.goto("/#context-menu");
  65 |   const trigger = page.locator('[data-demo-component="context-menu"] [data-rain-id="ui-context-menu"][data-slot="trigger"]');
  66 |   await trigger.focus();
  67 |   await page.keyboard.press("Shift+F10");
  68 |   await expect(page.getByRole("menuitem").first()).toBeVisible();
  69 |   await page.keyboard.press("Escape");
  70 |   await expect(trigger).toBeFocused();
  71 | });
  72 | 
  73 | test("dark portaled Sheet preserves its theme and the trigger receives focus on closing", async ({ page }) => {
  74 |   await page.goto("/#sheet");
  75 |   await page.getByRole("button", { name: "深色", exact: true }).click();
  76 |   const trigger = page.getByRole("button", { name: "打开资料详情", exact: true });
  77 |   await trigger.click();
  78 |   const popup = page.locator('[data-rain-id="ui-sheet"][data-slot="content"]');
  79 |   await expect(popup).toBeVisible();
  80 |   expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  81 |   expect(await popup.evaluate(el => getComputedStyle(el).backgroundColor)).toBe("rgb(30, 36, 59)");
  82 |   await page.screenshot({ path: `${captures}/sheet-dark-open.png`, fullPage: true });
  83 |   await page.keyboard.press("Escape");
  84 |   await expect(trigger).toBeFocused();
  85 | });
  86 | 
```