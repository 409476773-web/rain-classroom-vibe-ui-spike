# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Typography paragraphs keep the registered line heights on actual text nodes
- Location: tests/e2e/g4-components.spec.ts:70:1

# Error details

```
Error: p.rain-type-ui-default: 人工智能导论 · 第 04 讲，共 12 份资料。

expect(received).toBe(expected) // Object.is equality

Expected: "22px"
Received: "24px"
```

```
Error: p.rain-type-ui-supporting: 请先阅读导读，再完成课堂讨论。示例包含中文、English 与普通数字 2026。

expect(received).toBe(expected) // Object.is equality

Expected: "20px"
Received: "24px"
```

```
Error: p.rain-type-ui-supporting: 满分 100 分 · 本地样例

expect(received).toBe(expected) // Object.is equality

Expected: "20px"
Received: "24px"
```

```
Error: p.rain-type-ui-caption: 更新于 2026-10-11 · 课程编号 AI-104

expect(received).toBe(expected) // Object.is equality

Expected: "20px"
Received: "24px"
```

```
Error: article.rain-type-reading-default p: 观察一个学习过程时，先明确学生要解决的问题，再选择能够解释过程的材料。相同的概念可以通过文字、实例和图形表达，阅读区应保持连续的节奏，让学生有足够空间理解关系。

expect(received).toBe(expected) // Object.is equality

Expected: "26px"
Received: "24px"
```

```
Error: article.rain-type-reading-default p: 课堂讨论结束后，请结合证据说明你的判断。长答案、评语、课程介绍和报告结论沿用 Reading 排版；工具栏、表格与短标签继续使用 UI 排版。

expect(received).toBe(expected) // Object.is equality

Expected: "26px"
Received: "24px"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Typography 文字排版" [level=1] [ref=e9]
      - generic [ref=e10]: Foundations · 复用现有排版基础 · 用法待审阅
    - paragraph [ref=e11]: 按内容角色选择已登记的排版方案，保留文字语义。界面、长阅读和关键数字各有清楚的用途。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "界面文字：标题、正文与元信息" [level=2] [ref=e21]
      - paragraph [ref=e22]: 普通数字与中文、英文保持同一 UI 字体；HTML 标题层级按文档结构选择。
      - generic [ref=e24]:
        - heading "本周课程资料" [level=3] [ref=e25]
        - paragraph [ref=e26]: 人工智能导论 · 第 04 讲，共 12 份资料。
        - paragraph [ref=e27]: 请先阅读导读，再完成课堂讨论。示例包含中文、English 与普通数字 2026。
        - paragraph [ref=e28]: 更新于 2026-10-11 · 课程编号 AI-104
    - generic [ref=e29]:
      - heading "长内容：使用 Reading 排版" [level=2] [ref=e30]
      - paragraph [ref=e31]: 字号与行高由内容角色决定，不根据字符串长度临时调整。
      - article "课程导读示例" [ref=e33]:
        - paragraph [ref=e34]: 观察一个学习过程时，先明确学生要解决的问题，再选择能够解释过程的材料。相同的概念可以通过文字、实例和图形表达，阅读区应保持连续的节奏，让学生有足够空间理解关系。
        - paragraph [ref=e35]: 课堂讨论结束后，请结合证据说明你的判断。长答案、评语、课程介绍和报告结论沿用 Reading 排版；工具栏、表格与短标签继续使用 UI 排版。
    - generic [ref=e36]:
      - heading "关键数字：数值与单位分开" [level=2] [ref=e37]
      - paragraph [ref=e38]: 这是课程样例数据。关键数值使用 Data 字体；标签、单位、分母和解释保留 UI 字体。字体缺失时使用已登记回退，不随源码分发字体文件。
      - generic [ref=e40]:
        - text: 平均得分
        - generic [ref=e41]:
          - generic [ref=e42]: "86.5"
          - generic [ref=e43]: 分
        - paragraph [ref=e44]: 满分 100 分 · 本地样例
  - region [ref=e45]:
    - heading "使用边界" [level=2] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - heading "适合用在" [level=3] [ref=e49]
        - list [ref=e50]:
          - listitem [ref=e51]: 标题、控件说明、正文和元信息需要建立稳定层级。
          - listitem [ref=e52]: 答案解析、评语与报告结论需要连续阅读。
          - listitem [ref=e53]: 少量关键数值承担视觉锚点，数字与中文单位分开。
      - generic [ref=e54]:
        - heading "避免用在" [level=3] [ref=e55]
        - list [ref=e56]:
          - listitem [ref=e57]: 把普通日期、序号、表格数值或中文单位切换为关键数据字体。
          - listitem [ref=e58]: 为每段文案另建字号、字体或同义包装组件。
          - listitem [ref=e59]: 仅为增大字号选择更高的 HTML 标题层级。
  - generic [ref=e60]:
    - region [ref=e61]:
      - heading "API 与结构" [level=2] [ref=e62]
      - table [ref=e64]:
        - caption [ref=e65]: Typography 文字排版 常用接口
        - rowgroup [ref=e66]:
          - row [ref=e67]:
            - columnheader "名称" [ref=e68]
            - columnheader "类型" [ref=e69]
            - columnheader "默认" [ref=e70]
            - columnheader "说明" [ref=e71]
        - rowgroup [ref=e72]:
          - row [ref=e73]:
            - rowheader [ref=e74]:
              - code [ref=e75]: rain-type-ui-default
            - cell [ref=e76]:
              - code [ref=e77]: ui · 14px / 22px
            - cell "—" [ref=e78]
            - cell "普通界面文字、表格正文和常规标签" [ref=e79]
          - row [ref=e80]:
            - rowheader [ref=e81]:
              - code [ref=e82]: rain-type-ui-compact
            - cell [ref=e83]:
              - code [ref=e84]: ui · 13px / 18px
            - cell "—" [ref=e85]
            - cell "紧凑标签、短提示和辅助字段" [ref=e86]
          - row [ref=e87]:
            - rowheader [ref=e88]:
              - code [ref=e89]: rain-type-ui-caption
            - cell [ref=e90]:
              - code [ref=e91]: ui · 12px / 20px
            - cell "—" [ref=e92]
            - cell "次要元数据、图注与短辅助信息" [ref=e93]
          - row [ref=e94]:
            - rowheader [ref=e95]:
              - code [ref=e96]: rain-type-ui-supporting
            - cell [ref=e97]:
              - code [ref=e98]: ui · 13px / 20px
            - cell "—" [ref=e99]
            - cell "面板短说明和内容补充" [ref=e100]
          - row [ref=e101]:
            - rowheader [ref=e102]:
              - code [ref=e103]: rain-type-heading-section
            - cell [ref=e104]:
              - code [ref=e105]: ui · 16px / 24px
            - cell "—" [ref=e106]
            - cell "卡片、区块标题和页面主标题" [ref=e107]
          - row [ref=e108]:
            - rowheader [ref=e109]:
              - code [ref=e110]: rain-type-heading-page
            - cell [ref=e111]:
              - code [ref=e112]: ui · 24px / 32px
            - cell "—" [ref=e113]
            - cell "极少使用的页面主标题与重要数据" [ref=e114]
          - row [ref=e115]:
            - rowheader [ref=e116]:
              - code [ref=e117]: rain-type-reading-small
            - cell [ref=e118]:
              - code [ref=e119]: reading · 14px / 24px
            - cell "—" [ref=e120]
            - cell "较紧凑的长内容阅读区" [ref=e121]
          - row [ref=e122]:
            - rowheader [ref=e123]:
              - code [ref=e124]: rain-type-reading-default
            - cell [ref=e125]:
              - code [ref=e126]: reading · 15px / 26px
            - cell "—" [ref=e127]
            - cell "答案解析、评语和报告结论" [ref=e128]
          - row [ref=e129]:
            - rowheader [ref=e130]:
              - code [ref=e131]: rain-type-reading-large
            - cell [ref=e132]:
              - code [ref=e133]: reading · 16px / 26px
            - cell "—" [ref=e134]
            - cell "更大字号的阅读区" [ref=e135]
          - row [ref=e136]:
            - rowheader [ref=e137]:
              - code [ref=e138]: rain-type-data-default
            - cell [ref=e139]:
              - code [ref=e140]: data · 36px / 42px
            - cell "—" [ref=e141]
            - cell "极少使用、承担视觉锚点的关键数值。36px 为默认，可选其他已登记字号，并检查对应行高。" [ref=e142]
      - paragraph [ref=e143]: Parts / Slots：原生 heading / paragraph / article、关键数据 label / value / unit
    - region [ref=e144]:
      - heading "调用示例" [level=2] [ref=e145]
      - generic [ref=e146]:
        - generic [ref=e147]:
          - button "复制代码" [ref=e148] [cursor=pointer]
          - status
        - code [ref=e151]: <h2 className="rain-type-heading-section">课程资料</h2> <p className="rain-type-ui-default">本周共 12 份资料，更新于 10 月 11 日。</p> <p className="rain-type-ui-caption">普通日期、序号与表格数字沿用 UI 字体。</p> <article className="rain-type-reading-default"> <p>长答案、评语、课程介绍和报告结论使用 Reading 排版。</p> </article> <div> <span className="rain-type-ui-default">平均得分 </span> <span className="rain-type-data-default">86.5</span> <span className="rain-type-ui-default"> 分</span> </div>
      - paragraph [ref=e152]:
        - text: 当前源码：
        - code [ref=e153]: packages/foundations/src/typography-contract.ts
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { fileURLToPath } from "node:url";
  4   | 
  5   | const evidence = fileURLToPath(new URL("../../evidence/runtime/g4-visual-refinement-2026-10-11/browser/", import.meta.url));
  6   | mkdirSync(evidence, { recursive: true });
  7   | 
  8   | test("catalog links focus G4 headings, copy usable examples and preserve adjacent documentation", async ({ page, context }) => {
  9   |   await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  10  |   for (const [id, title, code] of [
  11  |     ["typography", "Typography 文字排版", "rain-type-reading-default"],
  12  |     ["item", "Item 内容条目", "ItemContent"],
  13  |     ["progress", "Progress 任务进度", "ProgressLabel"],
  14  |   ]) {
  15  |     await page.goto("/#components");
  16  |     await page.getByRole("link", { name: title, exact: true }).click();
  17  |     await expect(page.locator(`#${id}-title`)).toBeFocused();
  18  |     await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
  19  |     await expect(page.getByText("已复制", { exact: true })).toBeVisible();
  20  |     expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(code);
  21  |   }
  22  |   for (const id of ["accordion", "spinner", "sheet"]) {
  23  |     await page.goto(`/#${id}`);
  24  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  25  |     await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  26  |   }
  27  | });
  28  | 
  29  | test("three G4 pages expose examples, API, copyable code, themes and inherited density", async ({ page }, info) => {
  30  |   const errors: string[] = [];
  31  |   page.on("pageerror", error => errors.push(error.message));
  32  |   for (const id of ["typography", "item", "progress"]) {
  33  |     await page.goto(`/#${id}`);
  34  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  35  |     await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  36  |     await expect(page.locator("pre code").last()).not.toBeEmpty();
  37  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  38  |     await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-light.png`, fullPage: true });
  39  |     await page.getByRole("button", { name: "深色", exact: true }).click();
  40  |     await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  41  |     await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme", "dark");
  42  |     if (id !== "typography") await expect(page.locator(`[data-rain-id="ui-${id}"][data-slot="root"]`).first()).toHaveAttribute("data-density", "compact");
  43  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), `${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  44  |     await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-dark-compact.png`, fullPage: true });
  45  |   }
  46  |   expect(errors).toEqual([]);
  47  | });
  48  | 
  49  | test("Typography uses existing measured roles and separates value from Chinese unit", async ({ page }, info) => {
  50  |   await page.goto("/#typography");
  51  |   const facts = await page.locator('[data-slot="typography-data-example"]').evaluate(root => {
  52  |     const measure = (selector: string) => {
  53  |       const node = root.querySelector<HTMLElement>(selector)!;
  54  |       const style = getComputedStyle(node);
  55  |       return { text: node.textContent, font: style.fontFamily, size: style.fontSize, line: style.lineHeight };
  56  |     };
  57  |     const reading = getComputedStyle(document.querySelector('[aria-label="课程导读示例"]')!);
  58  |     return { value: measure('[data-slot="value"]'), unit: measure('[data-slot="unit"]'), reading: { font: reading.fontFamily, size: reading.fontSize, line: reading.lineHeight }, dataFontCheck: document.fonts.check('36px "LINE Seed JP App_OTF"') };
  59  |   });
  60  |   expect(facts.value.size).toBe("36px");
  61  |   expect(facts.value.font).toContain("LINE Seed JP");
  62  |   expect(facts.unit.size).toBe("14px");
  63  |   expect(facts.unit.font).toContain("PingFang SC");
  64  |   expect(facts.unit.text).toBe("分");
  65  |   expect(facts.reading.size).toBe("15px");
  66  |   expect(facts.reading.line).toBe("26px");
  67  |   writeFileSync(`${evidence}/typography-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  68  | });
  69  | 
  70  | test("Typography paragraphs keep the registered line heights on actual text nodes", async ({ page }, info) => {
  71  |   await page.goto("/#typography");
  72  |   await expect(page.locator("#typography-title")).toBeVisible();
  73  |   const facts = [];
  74  |   for (const [selector, line] of [
  75  |     ["p.rain-type-ui-default", "22px"],
  76  |     ["p.rain-type-ui-supporting", "20px"],
  77  |     ["p.rain-type-ui-caption", "20px"],
  78  |     ["article.rain-type-reading-default p", "26px"],
  79  |   ]) {
  80  |     const paragraphs = await page.locator(selector).evaluateAll(nodes => nodes.map(node => ({
  81  |       text: node.textContent,
  82  |       line: getComputedStyle(node).lineHeight,
  83  |     })));
  84  |     facts.push({ selector, expectedLine: line, paragraphs });
  85  |     expect.soft(paragraphs.length, `${selector} has visible examples`).toBeGreaterThan(0);
> 86  |     for (const paragraph of paragraphs) expect.soft(paragraph.line, `${selector}: ${paragraph.text}`).toBe(line);
      |                                                                                                       ^ Error: article.rain-type-reading-default p: 课堂讨论结束后，请结合证据说明你的判断。长答案、评语、课程介绍和报告结论沿用 Reading 排版；工具栏、表格与短标签继续使用 UI 排版。
  87  |   }
  88  |   writeFileSync(`${evidence}/typography-${info.project.name}-paragraph-facts.json`, JSON.stringify(facts, null, 2));
  89  | });
  90  | 
  91  | test("Item preserves independent actions, disabled controls, full content and keyboard link navigation", async ({ page }, info) => {
  92  |   await page.goto("/#item");
  93  |   const first = page.locator('[data-rain-id="ui-item"][data-slot="root"]').first();
  94  |   const padding = await first.evaluate(node => getComputedStyle(node).paddingTop);
  95  |   expect(padding).toBe("16px");
  96  |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  97  |   expect(await first.evaluate(node => getComputedStyle(node).paddingTop)).toBe("12px");
  98  |   await page.getByRole("button", { name: "设为重点", exact: true }).click();
  99  |   await expect(page.getByRole("button", { name: "取消重点", exact: true })).toHaveAttribute("aria-pressed", "true");
  100 |   await page.getByRole("button", { name: "查看详情", exact: true }).click();
  101 |   await expect(page.getByRole("heading", { name: "资料详情", exact: true })).toBeVisible();
  102 |   await expect(page.getByRole("button", { name: "等待发布", exact: true })).toBeDisabled();
  103 |   const list = page.getByRole("list", { name: "待阅读资料" });
  104 |   await expect(list.getByRole("listitem")).toHaveCount(2);
  105 |   const longTitle = list.locator('[data-slot="title"]').first();
  106 |   const text = await longTitle.evaluate(node => {
  107 |     const style = getComputedStyle(node);
  108 |     return { clamp: style.webkitLineClamp, width: node.clientWidth, scrollWidth: node.scrollWidth, overflowWrap: style.overflowWrap };
  109 |   });
  110 |   expect(text.clamp).toBe("none");
  111 |   expect(text.scrollWidth).toBeLessThanOrEqual(text.width + 1);
  112 |   expect(text.overflowWrap).toBe("anywhere");
  113 |   const link = page.getByRole("link", { name: /查看文字排版规范/ });
  114 |   await link.focus();
  115 |   await page.keyboard.press("Tab");
  116 |   await page.keyboard.press("Shift+Tab");
  117 |   await expect(link).toBeFocused();
  118 |   expect(await link.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
  119 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-focused-link.png`, fullPage: true });
  120 |   await page.keyboard.press("Enter");
  121 |   await expect(page).toHaveURL(/#typography$/);
  122 |   await expect(page.locator("#typography-title")).toBeFocused();
  123 | });
  124 | 
  125 | test("Progress keeps actual quantities and external pause/error states", async ({ page }, info) => {
  126 |   await page.goto("/#progress");
  127 |   const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  128 |   await expect(bar).toHaveAttribute("aria-valuenow", "40");
  129 |   await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  130 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  131 |   await page.getByRole("button", { name: "暂停同步", exact: true }).click();
  132 |   await expect(page.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  133 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  134 |   await page.getByRole("button", { name: "继续同步", exact: true }).click();
  135 |   await page.getByRole("button", { name: "模拟失败", exact: true }).click();
  136 |   await expect(page.getByRole("status").filter({ hasText: "同步失败" })).toBeVisible();
  137 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  138 |   await page.getByRole("button", { name: "重试同步", exact: true }).click();
  139 |   await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  140 |   await page.getByRole("button", { name: "完成下一批", exact: true }).click();
  141 |   await expect(bar).toHaveAttribute("aria-valuenow", "100");
  142 |   await expect(bar).toHaveAttribute("data-state", "complete");
  143 |   await page.getByRole("button", { name: "重新开始", exact: true }).click();
  144 |   await expect(bar).toHaveAttribute("aria-valuenow", "0");
  145 |   const unknown = page.getByRole("progressbar", { name: "正在解析资料", exact: true });
  146 |   await expect(unknown).not.toHaveAttribute("aria-valuenow");
  147 |   await expect(unknown.locator('[data-slot="progress-value"]')).toHaveCount(0);
  148 |   const quantity = page.getByRole("progressbar", { name: "批改任务", exact: true });
  149 |   await expect(quantity).toHaveAttribute("aria-valuenow", "6");
  150 |   await expect(quantity).toHaveAttribute("aria-valuemax", "24");
  151 |   await expect(quantity.locator('[data-slot="progress-value"]')).toHaveText("25%");
  152 |   const facts = await quantity.evaluate(root => {
  153 |     const track = root.querySelector('[data-slot="progress-track"]')!;
  154 |     const indicator = root.querySelector('[data-slot="progress-indicator"]')!;
  155 |     return { trackWidth: track.getBoundingClientRect().width, indicatorWidth: indicator.getBoundingClientRect().width, trackHeight: track.getBoundingClientRect().height };
  156 |   });
  157 |   expect(facts.indicatorWidth / facts.trackWidth).toBeCloseTo(0.25, 2);
  158 |   expect(facts.trackHeight).toBe(8);
  159 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  160 |   expect(await quantity.locator('[data-slot="progress-track"]').evaluate(node => node.getBoundingClientRect().height)).toBe(6);
  161 |   writeFileSync(`${evidence}/progress-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  162 | });
  163 | 
  164 | test("reduced motion and forced colors retain progress and native-link meaning", async ({ page }, info) => {
  165 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  166 |   await page.goto("/#progress");
  167 |   const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  168 |   const indicator = bar.locator('[data-slot="progress-indicator"]');
  169 |   expect(await indicator.evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  170 |   const paint = await indicator.evaluate(node => getComputedStyle(node).backgroundColor);
  171 |   const trackPaint = await bar.locator('[data-slot="progress-track"]').evaluate(node => getComputedStyle(node).backgroundColor);
  172 |   expect(paint).not.toBe(trackPaint);
  173 |   await page.screenshot({ path: `${evidence}/progress-${info.project.name}-forced-colors.png`, fullPage: true });
  174 |   await page.goto("/#item");
  175 |   const link = page.getByRole("link", { name: /查看文字排版规范/ });
  176 |   await link.focus();
  177 |   const colors = await link.evaluate(root => ({ root: getComputedStyle(root).color, title: getComputedStyle(root.querySelector('[data-slot="title"]')!).color, outline: getComputedStyle(root).outlineStyle }));
  178 |   expect(colors.title).toBe(colors.root);
  179 |   expect(colors.outline).toBe("solid");
  180 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-forced-colors.png`, fullPage: true });
  181 | });
  182 | 
```