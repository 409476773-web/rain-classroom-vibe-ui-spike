# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g2-g3-family-refinement.spec.ts >> Command keeps its typography, bounds and actual compact density
- Location: tests/e2e/g2-g3-family-refinement.spec.ts:28:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "14px"
Received: "16px"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Command 命令" [level=1] [ref=e9]
      - generic [ref=e10]: UI · G3 · 共享候选 · 原 G3 整组视觉待确认 · 未发布
    - paragraph [ref=e11]: 从宿主注册的命令中筛选并执行，保留分组、禁用项与空结果。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e20]:
    - heading "交互示例与关键状态" [level=2] [ref=e21]
    - paragraph [ref=e22]: 演示数据仅保留在当前页面。使用真实共享组件，可直接操作并查看结果。
    - generic [ref=e25]:
      - generic "课程资料命令" [ref=e26]:
        - combobox "搜索命令，例如：新建" [expanded] [ref=e27]
        - status [ref=e28]
        - listbox [ref=e29]:
          - group "资料" [ref=e30]:
            - option "新建资料" [ref=e32] [cursor=pointer]
            - option "打开资料预览" [ref=e33] [cursor=pointer]
            - option "发布资料（无权限）" [disabled] [ref=e34]
          - group "工作台" [ref=e35]:
            - option "恢复示例" [ref=e37] [cursor=pointer]
        - textbox [ref=e38]
      - status [ref=e39]: 已新建 0 份示例资料；预览未打开。
      - paragraph [ref=e40]: 输入不存在的词查看空结果；方向键选择命令，Enter 执行。命令实际执行由这个示例宿主处理。
  - region [ref=e41]:
    - heading "使用边界" [level=2] [ref=e42]
    - generic [ref=e43]:
      - generic [ref=e44]:
        - heading "适合用在" [level=3] [ref=e45]
        - list [ref=e46]:
          - listitem [ref=e47]: 已知命令集合的快速检索与执行。
      - generic [ref=e48]:
        - heading "避免用在" [level=3] [ref=e49]
        - list [ref=e50]:
          - listitem [ref=e51]: 目的地导航用 NavigationList/NavigationMenu；组件不发请求、不自行注册全局快捷键。
  - generic [ref=e52]:
    - region [ref=e53]:
      - heading "API 与结构" [level=2] [ref=e54]
      - table [ref=e56]:
        - caption [ref=e57]: Command 命令 常用接口
        - rowgroup [ref=e58]:
          - row [ref=e59]:
            - columnheader "名称" [ref=e60]
            - columnheader "类型" [ref=e61]
            - columnheader "默认" [ref=e62]
            - columnheader "说明" [ref=e63]
        - rowgroup [ref=e64]:
          - row [ref=e65]:
            - rowheader [ref=e66]:
              - code [ref=e67]: items
            - cell [ref=e68]:
              - code [ref=e69]: readonly CommandGroupData[]
            - cell "—" [ref=e70]
            - cell "分组为 value + items；每项为 value、label、disabled?。" [ref=e71]
          - row [ref=e72]:
            - rowheader [ref=e73]:
              - code [ref=e74]: Input placeholder / aria-label
            - cell [ref=e75]:
              - code [ref=e76]: string
            - cell "—" [ref=e77]
            - cell "提供可访问的命令输入名称。" [ref=e78]
          - row [ref=e79]:
            - rowheader [ref=e80]:
              - code [ref=e81]: Item value / disabled / onSelect
            - cell [ref=e82]:
              - code [ref=e83]: CommandOption / boolean / () => void
            - cell "—" [ref=e84]
            - cell "传入选项对象与禁用状态；宿主实际执行动作。" [ref=e85]
      - paragraph [ref=e86]: Parts / Slots：Command → Input、Empty、List；List render group → Group、GroupLabel、Collection → Item。
    - region [ref=e87]:
      - heading "调用示例" [level=2] [ref=e88]
      - generic [ref=e89]:
        - generic [ref=e90]:
          - button "复制代码" [ref=e91] [cursor=pointer]
          - status
        - code [ref=e94]: "<Command items={groups} aria-label=\"资料命令\"> <Command.Input placeholder=\"搜索命令\" /> <Command.Empty>没有匹配命令</Command.Empty> <Command.List>{group => <Command.Group key={group.value} items={group.items}> <Command.GroupLabel>{group.value}</Command.GroupLabel> <Command.Collection>{item => <Command.Item key={item.value} value={item} disabled={item.disabled} onSelect={() => execute(item.value)}>{item.label}</Command.Item>}</Command.Collection> </Command.Group>}</Command.List> </Command>"
      - paragraph [ref=e95]:
        - text: 当前源码：
        - code [ref=e96]: packages/ui/src/command/command.tsx
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
> 32  |   expect(await input.evaluate(el => getComputedStyle(el).fontSize)).toBe("14px");
      |                                                                     ^ Error: expect(received).toBe(expected) // Object.is equality
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
  63  |   expect(await nav.getByRole("heading", { name: "工作区", exact: true }).evaluate(el => getComputedStyle(el).fontSize)).toBe("12px");
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