# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g2-g3-family-refinement.spec.ts >> separated toggles have one boundary each and retain independent selection
- Location: tests/e2e/g2-g3-family-refinement.spec.ts:8:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "0px"
Received: "4px"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Toggle Group 选择按钮组" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 将相关可按下按钮组织为单选或多选。方向键移动组内焦点，Space 或 Enter 改变选择。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "受控单选" [level=2] [ref=e21]
      - paragraph [ref=e22]: 单选允许取消到空数组；若业务要求必须选一个，由宿主约束。
      - generic [ref=e23]:
        - group "显示模式" [ref=e24]:
          - button "列表" [pressed] [ref=e25] [cursor=pointer]
          - button "分栏" [ref=e26] [cursor=pointer]
          - button "聚焦" [ref=e27] [cursor=pointer]
        - status [ref=e28]: 显示模式：列表
    - generic [ref=e29]:
      - heading "受控多选" [level=2] [ref=e30]
      - generic [ref=e31]:
        - group "显示字段" [ref=e32]:
          - button "姓名" [pressed] [ref=e33] [cursor=pointer]
          - button "分数" [ref=e34] [cursor=pointer]
          - button "批注" [ref=e35] [cursor=pointer]
        - status [ref=e36]: 当前字段：姓名
      - generic [ref=e37]:
        - generic [ref=e38]:
          - button "复制代码" [ref=e39] [cursor=pointer]
          - status
        - code [ref=e42]: "<ToggleGroup multiple value={fields} onValueChange={setFields} aria-label=\"显示字段\"> <ToggleGroupItem value=\"name\">姓名</ToggleGroupItem> <ToggleGroupItem value=\"score\">分数</ToggleGroupItem> </ToggleGroup>"
    - generic [ref=e43]:
      - heading "竖向、禁用与焦点跳过" [level=2] [ref=e44]
      - paragraph [ref=e45]: 竖向使用上下方向键；不可用选项不进入组内焦点。
      - generic [ref=e47]:
        - group "竖向批改模式" [ref=e48]:
          - button "按题批改" [pressed] [ref=e49] [cursor=pointer]
          - button "按人批改不可用" [disabled] [ref=e50]
          - button "复核" [ref=e51] [cursor=pointer]
        - group "不可用的分组" [ref=e52]:
          - button "选中且禁用" [disabled] [pressed] [ref=e53]
          - button "未选中且禁用" [disabled] [ref=e54]
  - region [ref=e55]:
    - heading "使用边界" [level=2] [ref=e56]
    - generic [ref=e57]:
      - generic [ref=e58]:
        - heading "适合用在" [level=3] [ref=e59]
        - list [ref=e60]:
          - listitem [ref=e61]: 互斥显示模式，或同一工具组的多个显示字段。
      - generic [ref=e62]:
        - heading "避免用在" [level=3] [ref=e63]
        - list [ref=e64]:
          - listitem [ref=e65]: 互不相关的工具使用 Toggle；表单字段使用 Radio Group 或 Checkbox。
  - generic [ref=e66]:
    - region [ref=e67]:
      - heading "API 与结构" [level=2] [ref=e68]
      - table [ref=e70]:
        - caption [ref=e71]: Toggle Group 选择按钮组 常用接口
        - rowgroup [ref=e72]:
          - row [ref=e73]:
            - columnheader "名称" [ref=e74]
            - columnheader "类型" [ref=e75]
            - columnheader "默认" [ref=e76]
            - columnheader "说明" [ref=e77]
        - rowgroup [ref=e78]:
          - row [ref=e79]:
            - rowheader [ref=e80]:
              - code [ref=e81]: value / defaultValue
            - cell [ref=e82]:
              - code [ref=e83]: string[]
            - cell "[]" [ref=e84]
            - cell "单选和多选均使用数组；单选最多一个值。" [ref=e85]
          - row [ref=e86]:
            - rowheader [ref=e87]:
              - code [ref=e88]: onValueChange
            - cell [ref=e89]:
              - code [ref=e90]: Base UI Toggle Group callback
            - cell "—" [ref=e91]
            - cell "回报整个组的新值数组。" [ref=e92]
          - row [ref=e93]:
            - rowheader [ref=e94]:
              - code [ref=e95]: multiple
            - cell [ref=e96]:
              - code [ref=e97]: boolean
            - cell "false" [ref=e98]
            - cell "true 允许同时选中多个项目。" [ref=e99]
          - row [ref=e100]:
            - rowheader [ref=e101]:
              - code [ref=e102]: orientation
            - cell [ref=e103]:
              - code [ref=e104]: "\"horizontal\" | \"vertical\""
            - cell "\"horizontal\"" [ref=e105]
            - cell "布局方向与方向键导航。" [ref=e106]
          - row [ref=e107]:
            - rowheader [ref=e108]:
              - code [ref=e109]: spacing
            - cell [ref=e110]:
              - code [ref=e111]: 0 | 8
            - cell "8" [ref=e112]
            - cell "分开的控件或连接的边界。" [ref=e113]
          - row [ref=e114]:
            - rowheader [ref=e115]:
              - code [ref=e116]: variant / size
            - cell [ref=e117]:
              - code [ref=e118]: Toggle variant / size
            - cell "—" [ref=e119]
            - cell "父组统一控制每个 item 外观和尺寸。" [ref=e120]
          - row [ref=e121]:
            - rowheader [ref=e122]:
              - code [ref=e123]: disabled
            - cell [ref=e124]:
              - code [ref=e125]: boolean
            - cell "false" [ref=e126]
            - cell "禁用整组；也可在 item 上禁用。" [ref=e127]
          - row [ref=e128]:
            - rowheader [ref=e129]:
              - code [ref=e130]: ToggleGroupItem.value
            - cell [ref=e131]:
              - code [ref=e132]: string
            - cell "—" [ref=e133]
            - cell "同一组内唯一的选项标识。" [ref=e134]
      - paragraph [ref=e135]: Parts / Slots：toggle-group、toggle-group-item
    - region [ref=e136]:
      - heading "调用示例" [level=2] [ref=e137]
      - generic [ref=e138]:
        - generic [ref=e139]:
          - button "复制代码" [ref=e140] [cursor=pointer]
          - status
        - code [ref=e143]: "import { useState } from \"react\"; import { ToggleGroup, ToggleGroupItem } from \"@rain-next/ui\"; const [view, setView] = useState<string[]>([\"list\"]); <ToggleGroup aria-label=\"显示模式\" value={view} onValueChange={setView} spacing={0} variant=\"outline\"> <ToggleGroupItem value=\"list\">列表</ToggleGroupItem> <ToggleGroupItem value=\"split\">分栏</ToggleGroupItem> <ToggleGroupItem value=\"focus\">聚焦</ToggleGroupItem> </ToggleGroup>"
      - paragraph [ref=e144]:
        - text: 当前源码：
        - code [ref=e145]: packages/ui/src/toggle-group/toggle-group.tsx
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
> 12  |   expect(surface.padding).toBe("0px");
      |                           ^ Error: expect(received).toBe(expected) // Object.is equality
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