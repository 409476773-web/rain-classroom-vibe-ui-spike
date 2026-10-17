# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Item preserves independent actions, disabled controls, full content and keyboard link navigation
- Location: tests/e2e/g4-components.spec.ts:49:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "solid"
Received: "none"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Item 内容条目" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 将对象的图标、主信息、辅助说明与独立操作组织成一条可阅读内容。数据、选择和任务行为由宿主提供。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [pressed] [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "内容与独立操作" [level=2] [ref=e21]
      - paragraph [ref=e22]: 重点标记和详情由本页管理，按钮不会触发整行导航。
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e28]:
            - generic [ref=e29]: 第一讲阅读资料
            - paragraph [ref=e30]: PDF · 12 页 · 由林老师整理
          - generic [ref=e31]:
            - button "取消重点" [pressed] [ref=e32] [cursor=pointer]
            - button "收起详情" [ref=e34] [cursor=pointer]
        - status [ref=e36]: 已标记为重点资料
        - generic [ref=e37]:
          - heading "资料详情" [level=3] [ref=e38]
          - paragraph [ref=e39]: 本资料包含课程目标、案例导读与三道讨论题。页面操作只影响本地演示。
    - generic [ref=e40]:
      - heading "分组、长标题与多行说明" [level=2] [ref=e41]
      - paragraph [ref=e42]: 列表成员使用明确的 listitem 结构；标题、说明和动作在窄容器内自然换行。
      - list "待阅读资料" [ref=e44]:
        - listitem [ref=e45]:
          - generic [ref=e46]:
            - generic [ref=e49]:
              - generic [ref=e50]: 第二讲阅读资料：从观察问题到整理证据，建立可复核的学习过程说明
              - paragraph [ref=e51]: 这是一段需要完整阅读的资料说明。长标题与中文、English、资料编号 AI-2026-104 保持自然换行，重要信息不会默认被截断。
            - button "等待发布" [disabled] [ref=e53]
        - listitem [ref=e56]:
          - generic [ref=e58]:
            - generic [ref=e59]: 课堂讨论准备
            - paragraph [ref=e60]: 阅读资料后，选择一条证据说明你的观点。
    - generic [ref=e61]:
      - heading "整行链接" [level=2] [ref=e62]
      - paragraph [ref=e63]: 这是原生链接，支持 Tab 聚焦、Enter 打开和浏览器链接操作；内部没有独立按钮。
      - link "查看文字排版规范 了解标题、正文和关键数据的现有用法。" [active] [ref=e65] [cursor=pointer]:
        - /url: "#typography"
        - generic [ref=e66]:
          - generic [ref=e67]: 查看文字排版规范
          - paragraph [ref=e68]: 了解标题、正文和关键数据的现有用法。
  - region [ref=e71]:
    - heading "使用边界" [level=2] [ref=e72]
    - generic [ref=e73]:
      - generic [ref=e74]:
        - heading "适合用在" [level=3] [ref=e75]
        - list [ref=e76]:
          - listitem [ref=e77]: 资料、通知、成员或任务摘要需要稳定的内容与动作排列。
          - listitem [ref=e78]: 普通列表需要清晰的分组与长内容换行。
      - generic [ref=e79]:
        - heading "避免用在" [level=3] [ref=e80]
        - list [ref=e81]:
          - listitem [ref=e82]: 表单字段使用 FormItem；导航选择使用 NavigationList 或 ObjectNavigator。
          - listitem [ref=e83]: 把含按钮、输入或其他链接的整条内容再包成链接或按钮。
          - listitem [ref=e84]: 为静态信息添加伪点击、tabIndex 或选择状态。
  - generic [ref=e85]:
    - region [ref=e86]:
      - heading "API 与结构" [level=2] [ref=e87]
      - table [ref=e89]:
        - caption [ref=e90]: Item 内容条目 常用接口
        - rowgroup [ref=e91]:
          - row [ref=e92]:
            - columnheader "名称" [ref=e93]
            - columnheader "类型" [ref=e94]
            - columnheader "默认" [ref=e95]
            - columnheader "说明" [ref=e96]
        - rowgroup [ref=e97]:
          - row [ref=e98]:
            - rowheader [ref=e99]:
              - code [ref=e100]: variant
            - cell [ref=e101]:
              - code [ref=e102]: "\"default\" | \"outline\" | \"muted\""
            - cell "\"default\"" [ref=e103]
            - cell "透明内容、轻边界与浅底承载。" [ref=e104]
          - row [ref=e105]:
            - rowheader [ref=e106]:
              - code [ref=e107]: size
            - cell [ref=e108]:
              - code [ref=e109]: "\"default\" | \"sm\" | \"xs\""
            - cell "—" [ref=e110]
            - cell "未指定时跟随父级 Density；显式尺寸只影响当前条目。" [ref=e111]
          - row [ref=e112]:
            - rowheader [ref=e113]:
              - code [ref=e114]: render
            - cell [ref=e115]:
              - code [ref=e116]: ReactElement / render function
            - cell "—" [ref=e117]
            - cell "复用原生链接等语义；整行链接内部只放非交互内容。" [ref=e118]
          - row [ref=e119]:
            - rowheader [ref=e120]:
              - code [ref=e121]: children / className / ref
            - cell [ref=e122]:
              - code [ref=e123]: React / native props
            - cell "—" [ref=e124]
            - cell "开放 Parts 组合和宿主布局，不内置业务状态。" [ref=e125]
      - paragraph [ref=e126]: Parts / Slots：ItemGroup、ItemMedia、ItemContent、ItemTitle、ItemDescription、ItemActions、ItemHeader、ItemFooter、ItemSeparator（复用 Separator）
    - region [ref=e127]:
      - heading "调用示例" [level=2] [ref=e128]
      - generic [ref=e129]:
        - generic [ref=e130]:
          - button "复制代码" [ref=e131] [cursor=pointer]
          - status
        - code [ref=e134]: "import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle, Button } from \"@rain-next/ui\"; <Item variant=\"outline\"> <ItemContent> <ItemTitle>第一讲阅读资料</ItemTitle> <ItemDescription>PDF · 12 页 · 由林老师整理</ItemDescription> </ItemContent> <ItemActions> <Button variant=\"text\" onClick={openDetails}>查看资料</Button> </ItemActions> </Item> // 整行是链接时，内部只放展示内容。 <Item render={<a href=\"#typography\" />}> <ItemContent><ItemTitle>查看文字排版规范</ItemTitle></ItemContent> </Item>"
      - paragraph [ref=e135]:
        - text: 当前源码：
        - code [ref=e136]: packages/ui/src/item/item.tsx
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { fileURLToPath } from "node:url";
  4   | 
  5   | const evidence = fileURLToPath(new URL("../../evidence/runtime/g4-components-2026-10-11/browser/", import.meta.url));
  6   | mkdirSync(evidence, { recursive: true });
  7   | 
  8   | test("three G4 pages expose examples, API, copyable code, themes and inherited density", async ({ page }, info) => {
  9   |   const errors: string[] = [];
  10  |   page.on("pageerror", error => errors.push(error.message));
  11  |   for (const id of ["typography", "item", "progress"]) {
  12  |     await page.goto(`/#${id}`);
  13  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  14  |     await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  15  |     await expect(page.locator("pre code").last()).not.toBeEmpty();
  16  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  17  |     await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-light.png`, fullPage: true });
  18  |     await page.getByRole("button", { name: "深色", exact: true }).click();
  19  |     await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  20  |     await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme", "dark");
  21  |     if (id !== "typography") await expect(page.locator(`[data-rain-id="ui-${id}"][data-slot="root"]`).first()).toHaveAttribute("data-density", "compact");
  22  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), `${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  23  |     await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-dark-compact.png`, fullPage: true });
  24  |   }
  25  |   expect(errors).toEqual([]);
  26  | });
  27  | 
  28  | test("Typography uses existing measured roles and separates value from Chinese unit", async ({ page }, info) => {
  29  |   await page.goto("/#typography");
  30  |   const facts = await page.locator('[data-slot="typography-data-example"]').evaluate(root => {
  31  |     const measure = (selector: string) => {
  32  |       const node = root.querySelector<HTMLElement>(selector)!;
  33  |       const style = getComputedStyle(node);
  34  |       return { text: node.textContent, font: style.fontFamily, size: style.fontSize, line: style.lineHeight };
  35  |     };
  36  |     const reading = getComputedStyle(document.querySelector('[aria-label="课程导读示例"]')!);
  37  |     return { value: measure('[data-slot="value"]'), unit: measure('[data-slot="unit"]'), reading: { font: reading.fontFamily, size: reading.fontSize, line: reading.lineHeight }, dataFontAvailable: document.fonts.check('36px "LINE Seed JP App_OTF"') };
  38  |   });
  39  |   expect(facts.value.size).toBe("36px");
  40  |   expect(facts.value.font).toContain("LINE Seed JP");
  41  |   expect(facts.unit.size).toBe("14px");
  42  |   expect(facts.unit.font).toContain("PingFang SC");
  43  |   expect(facts.unit.text).toBe("分");
  44  |   expect(facts.reading.size).toBe("15px");
  45  |   expect(facts.reading.line).toBe("26px");
  46  |   writeFileSync(`${evidence}/typography-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  47  | });
  48  | 
  49  | test("Item preserves independent actions, disabled controls, full content and keyboard link navigation", async ({ page }, info) => {
  50  |   await page.goto("/#item");
  51  |   const first = page.locator('[data-rain-id="ui-item"][data-slot="root"]').first();
  52  |   const padding = await first.evaluate(node => getComputedStyle(node).paddingTop);
  53  |   expect(padding).toBe("16px");
  54  |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  55  |   expect(await first.evaluate(node => getComputedStyle(node).paddingTop)).toBe("12px");
  56  |   await page.getByRole("button", { name: "设为重点", exact: true }).click();
  57  |   await expect(page.getByRole("button", { name: "取消重点", exact: true })).toHaveAttribute("aria-pressed", "true");
  58  |   await page.getByRole("button", { name: "查看详情", exact: true }).click();
  59  |   await expect(page.getByRole("heading", { name: "资料详情", exact: true })).toBeVisible();
  60  |   await expect(page.getByRole("button", { name: "等待发布", exact: true })).toBeDisabled();
  61  |   const list = page.getByRole("list", { name: "待阅读资料" });
  62  |   await expect(list.getByRole("listitem")).toHaveCount(2);
  63  |   const longTitle = list.locator('[data-slot="title"]').first();
  64  |   const text = await longTitle.evaluate(node => {
  65  |     const style = getComputedStyle(node);
  66  |     return { clamp: style.webkitLineClamp, width: node.clientWidth, scrollWidth: node.scrollWidth, overflowWrap: style.overflowWrap };
  67  |   });
  68  |   expect(text.clamp).toBe("none");
  69  |   expect(text.scrollWidth).toBeLessThanOrEqual(text.width + 1);
  70  |   expect(text.overflowWrap).toBe("anywhere");
  71  |   const link = page.getByRole("link", { name: /查看文字排版规范/ });
  72  |   await link.focus();
> 73  |   expect(await link.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
      |                                                                            ^ Error: expect(received).toBe(expected) // Object.is equality
  74  |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-focused-link.png`, fullPage: true });
  75  |   await page.keyboard.press("Enter");
  76  |   await expect(page).toHaveURL(/#typography$/);
  77  |   await expect(page.locator("#typography-title")).toBeFocused();
  78  | });
  79  | 
  80  | test("Progress keeps actual quantities and external pause/error states", async ({ page }, info) => {
  81  |   await page.goto("/#progress");
  82  |   const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  83  |   await expect(bar).toHaveAttribute("aria-valuenow", "40");
  84  |   await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  85  |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  86  |   await page.getByRole("button", { name: "暂停同步", exact: true }).click();
  87  |   await expect(page.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  88  |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  89  |   await page.getByRole("button", { name: "继续同步", exact: true }).click();
  90  |   await page.getByRole("button", { name: "模拟失败", exact: true }).click();
  91  |   await expect(page.getByRole("status").filter({ hasText: "同步失败" })).toBeVisible();
  92  |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  93  |   await page.getByRole("button", { name: "重试同步", exact: true }).click();
  94  |   await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  95  |   await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  96  |   await expect(bar).toHaveAttribute("aria-valuenow", "100");
  97  |   await expect(bar).toHaveAttribute("data-state", "complete");
  98  |   await page.getByRole("button", { name: "重新开始", exact: true }).click();
  99  |   await expect(bar).toHaveAttribute("aria-valuenow", "0");
  100 |   const unknown = page.getByRole("progressbar", { name: "正在解析资料", exact: true });
  101 |   await expect(unknown).not.toHaveAttribute("aria-valuenow");
  102 |   await expect(unknown.locator('[data-slot="progress-value"]')).toHaveCount(0);
  103 |   const quantity = page.getByRole("progressbar", { name: "批改任务", exact: true });
  104 |   await expect(quantity).toHaveAttribute("aria-valuenow", "6");
  105 |   await expect(quantity).toHaveAttribute("aria-valuemax", "24");
  106 |   await expect(quantity.locator('[data-slot="progress-value"]')).toHaveText("25%");
  107 |   const facts = await quantity.evaluate(root => {
  108 |     const track = root.querySelector('[data-slot="progress-track"]')!;
  109 |     const indicator = root.querySelector('[data-slot="progress-indicator"]')!;
  110 |     return { trackWidth: track.getBoundingClientRect().width, indicatorWidth: indicator.getBoundingClientRect().width, trackHeight: track.getBoundingClientRect().height };
  111 |   });
  112 |   expect(facts.indicatorWidth / facts.trackWidth).toBeCloseTo(0.25, 2);
  113 |   expect(facts.trackHeight).toBe(8);
  114 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  115 |   expect(await quantity.locator('[data-slot="progress-track"]').evaluate(node => node.getBoundingClientRect().height)).toBe(6);
  116 |   writeFileSync(`${evidence}/progress-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  117 | });
  118 | 
  119 | test("reduced motion and forced colors retain progress and native-link meaning", async ({ page }, info) => {
  120 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  121 |   await page.goto("/#progress");
  122 |   const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  123 |   const indicator = bar.locator('[data-slot="progress-indicator"]');
  124 |   expect(await indicator.evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  125 |   const paint = await indicator.evaluate(node => getComputedStyle(node).backgroundColor);
  126 |   const trackPaint = await bar.locator('[data-slot="progress-track"]').evaluate(node => getComputedStyle(node).backgroundColor);
  127 |   expect(paint).not.toBe(trackPaint);
  128 |   await page.screenshot({ path: `${evidence}/progress-${info.project.name}-forced-colors.png`, fullPage: true });
  129 |   await page.goto("/#item");
  130 |   const link = page.getByRole("link", { name: /查看文字排版规范/ });
  131 |   await link.focus();
  132 |   const colors = await link.evaluate(root => ({ root: getComputedStyle(root).color, title: getComputedStyle(root.querySelector('[data-slot="title"]')!).color, outline: getComputedStyle(root).outlineStyle }));
  133 |   expect(colors.title).toBe(colors.root);
  134 |   expect(colors.outline).toBe("solid");
  135 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-forced-colors.png`, fullPage: true });
  136 | });
  137 | 
```