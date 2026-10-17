# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g2-g3-family-refinement.spec.ts >> Sidebar restores group hierarchy and centers collapsed icons without losing location
- Location: tests/e2e/g2-g3-family-refinement.spec.ts:60:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "12px"
Received: "16px"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Sidebar 侧栏" [level=1] [ref=e9]
      - generic [ref=e10]: UI · G3 · 共享候选 · 原 G3 整组视觉待确认 · 未发布
    - paragraph [ref=e11]: 组织工作区目的地、当前项和辅助内容，支持受控或内部收起状态。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e20]:
    - heading "交互示例与关键状态" [level=2] [ref=e21]
    - paragraph [ref=e22]: 演示数据仅保留在当前页面。使用真实共享组件，可直接操作并查看结果。
    - generic [ref=e25]:
      - navigation "示例工作台导航" [ref=e26]:
        - generic [ref=e27]: 教学工作台
        - generic [ref=e29]:
          - heading "工作区" [level=2] [ref=e30]
          - link "教学总览" [ref=e31] [cursor=pointer]:
            - /url: "#sidebar?view=overview"
          - link "我的课程" [ref=e35] [cursor=pointer]:
            - /url: "#sidebar?view=courses"
          - link "工作台设置" [ref=e39] [cursor=pointer]:
            - /url: "#sidebar?view=settings"
        - button "收起示例导航" [expanded] [ref=e44]: 收起导航
      - region "当前页面" [ref=e45]:
        - heading "教学总览" [level=3] [ref=e46]
        - paragraph [ref=e47]: 导航目的地与当前项由宿主提供。收起后仍保留当前目的地与可访问名称。
        - status [ref=e48]: 当前页面：overview
  - region [ref=e49]:
    - heading "使用边界" [level=2] [ref=e50]
    - generic [ref=e51]:
      - generic [ref=e52]:
        - heading "适合用在" [level=3] [ref=e53]
        - list [ref=e54]:
          - listitem [ref=e55]: 需要有名称、有当前项的纵向工作区导航。
      - generic [ref=e56]:
        - heading "避免用在" [level=3] [ref=e57]
        - list [ref=e58]:
          - listitem [ref=e59]: Sidebar 是 UI 导航容器；复杂区域恢复、暂态面板与调宽由 WorkspaceLayout 等 Layout 处理。
  - generic [ref=e60]:
    - region [ref=e61]:
      - heading "API 与结构" [level=2] [ref=e62]
      - table [ref=e64]:
        - caption [ref=e65]: Sidebar 侧栏 常用接口
        - rowgroup [ref=e66]:
          - row [ref=e67]:
            - columnheader "名称" [ref=e68]
            - columnheader "类型" [ref=e69]
            - columnheader "默认" [ref=e70]
            - columnheader "说明" [ref=e71]
        - rowgroup [ref=e72]:
          - row [ref=e73]:
            - rowheader [ref=e74]:
              - code [ref=e75]: collapsed / onCollapsedChange
            - cell [ref=e76]:
              - code [ref=e77]: boolean / (collapsed) => void
            - cell "—" [ref=e78]
            - cell "受控收起状态；或使用 defaultCollapsed。" [ref=e79]
          - row [ref=e80]:
            - rowheader [ref=e81]:
              - code [ref=e82]: defaultCollapsed
            - cell [ref=e83]:
              - code [ref=e84]: boolean
            - cell "false" [ref=e85]
            - cell "非受控实例的初始状态。" [ref=e86]
          - row [ref=e87]:
            - rowheader [ref=e88]:
              - code [ref=e89]: side
            - cell [ref=e90]:
              - code [ref=e91]: left | right
            - cell "left" [ref=e92]
            - cell "标注侧栏方向，不接管页面的区域预算。" [ref=e93]
          - row [ref=e94]:
            - rowheader [ref=e95]:
              - code [ref=e96]: Item active / href / icon
            - cell [ref=e97]:
              - code [ref=e98]: boolean / string / ReactNode
            - cell "—" [ref=e99]
            - cell "当前目的地使用 aria-current；路径由应用提供。" [ref=e100]
      - paragraph [ref=e101]: Parts / Slots：Sidebar → Header、Content、Footer；Content → Section → Item；Trigger 必须在 Sidebar 内。
    - region [ref=e102]:
      - heading "调用示例" [level=2] [ref=e103]
      - generic [ref=e104]:
        - generic [ref=e105]:
          - button "复制代码" [ref=e106] [cursor=pointer]
          - status
        - code [ref=e109]: "<Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} aria-label=\"工作区\"> <SidebarHeader>教学工作台</SidebarHeader> <SidebarContent><SidebarSection label=\"课程\"> <SidebarItem href=\"/courses\" active icon={<CourseFilledIcon />}>我的课程</SidebarItem> </SidebarSection></SidebarContent> <SidebarFooter><SidebarTrigger>收起导航</SidebarTrigger></SidebarFooter> </Sidebar>"
      - paragraph [ref=e110]:
        - text: 当前源码：
        - code [ref=e111]: packages/ui/src/sidebar/sidebar.tsx
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync } from "node:fs";
  3   | import { fileURLToPath } from "node:url";
  4   | 
  5   | const captures = fileURLToPath(new URL("../../evidence/runtime/g2-g3-family-refinement-2026-10-08/browser/", import.meta.url));
  6   | mkdirSync(captures, { recursive: true });
  7   | 
  8   | test("separated toggles have one boundary each and retain independent selection", async ({ page }) => {
  9   |   await page.goto("/#toggle-group");
  10  |   const fields = page.getByRole("group", { name: "显示字段", exact: true });
  11  |   const surface = await fields.evaluate(el => ({ padding: getComputedStyle(el).padding, border: getComputedStyle(el).borderWidth, background: getComputedStyle(el).backgroundColor }));
  12  |   expect(surface.padding).toBe("0px");
  13  |   expect(surface.border).toBe("0px");
  14  |   expect(surface.background).toBe("rgba(0, 0, 0, 0)");
  15  |   await page.screenshot({ path: `${captures}/toggle-group-light.png`, fullPage: true });
  16  |   const score = fields.getByRole("button", { name: "分数", exact: true });
  17  |   const previous = await score.getAttribute("aria-pressed");
  18  |   await score.click();
  19  |   await expect(score).toHaveAttribute("aria-pressed", previous === "true" ? "false" : "true");
  20  |   await expect(fields.getByRole("button", { name: "姓名", exact: true })).toHaveAttribute("aria-pressed", "true");
  21  |   const modes = page.getByRole("group", { name: "显示模式", exact: true });
  22  |   await modes.getByRole("button", { name: "列表", exact: true }).press("ArrowRight");
  23  |   await expect(modes.getByRole("button", { name: "分栏", exact: true })).toBeFocused();
  24  |   await page.keyboard.press("Space");
  25  |   await expect(modes.getByRole("button", { name: "分栏", exact: true })).toHaveAttribute("aria-pressed", "true");
  26  | });
  27  | 
  28  | test("Command keeps its typography, bounds and actual compact density", async ({ page }) => {
  29  |   await page.goto("/#command");
  30  |   const command = page.locator('[data-rain-id="ui-command"]');
  31  |   const input = command.getByRole("combobox");
  32  |   expect(await input.evaluate(el => getComputedStyle(el).fontSize)).toBe("14px");
  33  |   expect(await command.locator('[data-slot="list"]').evaluate(el => getComputedStyle(el).maxHeight)).toBe("320px");
  34  |   expect((await command.boundingBox())!.width).toBeLessThanOrEqual(480);
  35  |   const normal = (await command.getByRole("option").first().boundingBox())!.height;
  36  |   await page.screenshot({ path: `${captures}/command-light.png`, fullPage: true });
  37  |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  38  |   const compact = (await command.getByRole("option").first().boundingBox())!.height;
  39  |   expect(compact).toBeLessThan(normal);
  40  |   expect((await input.boundingBox())!.height).toBe(30);
  41  | });
  42  | 
  43  | test("Command executes with keyboard, skips disabled items and supports empty results", async ({ page }) => {
  44  |   await page.goto("/#command");
  45  |   const input = page.getByRole("combobox");
  46  |   await input.fill("新建");
  47  |   await input.press("Enter");
  48  |   await expect(page.getByRole("status").filter({ hasText: "已新建 1 份" })).toBeVisible();
  49  |   await input.fill("资料预览");
  50  |   await input.press("Enter");
  51  |   await expect(page.getByRole("status").filter({ hasText: "预览已打开" })).toBeVisible();
  52  |   await input.fill("不存在的命令");
  53  |   await expect(page.getByText("没有匹配的命令", { exact: true })).toBeVisible();
  54  |   await input.fill("发布");
  55  |   await expect(page.getByRole("option", { name: /发布资料/ })).toHaveAttribute("aria-disabled", "true");
  56  |   await input.press("Enter");
  57  |   await expect(page.getByRole("status").filter({ hasText: "已新建 1 份" })).toBeVisible();
  58  | });
  59  | 
  60  | test("Sidebar restores group hierarchy and centers collapsed icons without losing location", async ({ page }) => {
  61  |   await page.goto("/#sidebar");
  62  |   const nav = page.getByRole("navigation", { name: "示例工作台导航", exact: true });
> 63  |   expect(await nav.getByRole("heading", { name: "工作区", exact: true }).evaluate(el => getComputedStyle(el).fontSize)).toBe("12px");
      |                                                                                                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  64  |   await page.screenshot({ path: `${captures}/sidebar-light.png`, fullPage: true });
  65  |   const normal = (await nav.getByRole("link", { name: "我的课程", exact: true }).boundingBox())!.height;
  66  |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  67  |   expect((await nav.getByRole("link", { name: "我的课程", exact: true }).boundingBox())!.height).toBeLessThan(normal);
  68  |   await nav.getByRole("link", { name: "我的课程", exact: true }).click();
  69  |   await page.getByRole("button", { name: "收起示例导航", exact: true }).click();
  70  |   const current = nav.getByRole("link", { name: "我的课程", exact: true });
  71  |   await expect(current).toHaveAttribute("aria-current", "page");
  72  |   const centerOffset = await current.evaluate(el => {
  73  |     const row = el.getBoundingClientRect(), icon = el.querySelector('[data-slot="icon"]')!.getBoundingClientRect();
  74  |     return Math.abs((row.left + row.right) / 2 - (icon.left + icon.right) / 2);
  75  |   });
  76  |   expect(centerOffset).toBeLessThanOrEqual(1);
  77  |   await page.screenshot({ path: `${captures}/sidebar-collapsed.png`, fullPage: true });
  78  | });
  79  | 
  80  | test("dark documentation paints a dark page and preview surface", async ({ page }) => {
  81  |   for (const id of ["toggle-group", "command", "sidebar"]) {
  82  |     await page.goto(`/#${id}`);
  83  |     await page.getByRole("button", { name: "深色", exact: true }).click();
  84  |     await expect(page.locator("html")).toHaveAttribute("data-rain-theme", "dark");
  85  |     const preview = await page.locator(".component-doc__preview").first().evaluate(el => getComputedStyle(el).backgroundColor);
  86  |     expect(preview).toBe("rgb(30, 36, 59)");
  87  |     await page.screenshot({ path: `${captures}/${id}-dark.png`, fullPage: true });
  88  |   }
  89  | });
  90  | 
  91  | test("first family samples and adjacent documentation fit a narrow viewport", async ({ page }) => {
  92  |   await page.setViewportSize({ width: 390, height: 844 });
  93  |   for (const id of ["toggle-group", "command", "sidebar", "toggle", "skeleton", "sheet", "context-menu", "navigation-menu"]) {
  94  |     await page.goto(`/#${id}`);
  95  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  96  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
  97  |     if (["toggle-group", "command", "sidebar"].includes(id)) await page.screenshot({ path: `${captures}/${id}-narrow.png`, fullPage: true });
  98  |   }
  99  | });
  100 | 
```