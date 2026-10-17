# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> three G4 pages expose examples, API, copyable code, themes and inherited density
- Location: tests/e2e/g4-components.spec.ts:43:1

# Error details

```
Error: typography: Typography 文字排版

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: typography: Typography 文字排版

expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
```

```
Error: typography: 从标题到正文的阅读层级

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "18px"
```

```
Error: typography: 直接比较已有字阶

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "18px"
```

```
Error: typography: 关键数字与单位

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "18px"
```

```
Error: item: Item 内容条目

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: item: Item 内容条目

expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
```

```
Error: item: 课程资料列表

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "18px"
```

```
Error: item: 整行链接

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "18px"
```

```
Error: progress: Progress 任务进度

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: progress: Progress 任务进度

expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
```

```
Error: progress: 一个任务的完成量与状态

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "18px"
```

```
Error: progress: 未知耗时：明确表达正在处理

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "18px"
```

```
Error: progress: 按实际任务单位计量

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "18px"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Progress 任务进度" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 让任务名称、完成量与状态保持在一起。可计算时显示真实比例，未知时明确表达正在处理。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [ref=e13] [cursor=pointer]
      - button "深色" [pressed] [ref=e15] [cursor=pointer]
      - button "紧凑密度" [active] [pressed] [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "一个任务的完成量与状态" [level=2] [ref=e21]
      - paragraph [ref=e22]: 任务信息与恢复动作保持就近。下方演示控制可切换进度、失败与重置，不会按时间自行增长。
      - generic [ref=e23]:
        - generic [ref=e24]:
          - region "资料同步任务" [ref=e25]:
            - paragraph [ref=e26]: 人工智能导论 · 第 04 讲
            - progressbar "资料同步" [ref=e27]:
              - text: 资料同步
              - generic [ref=e28]: 40%
              - text: x
            - generic [ref=e31]:
              - status [ref=e32]:
                - paragraph [ref=e34]: 已完成 40 / 100 份资料
              - button "暂停同步" [ref=e35] [cursor=pointer]
          - group "演示控制" [ref=e37]:
            - button "完成下一批" [ref=e39] [cursor=pointer]
            - button "模拟失败" [ref=e41] [cursor=pointer]
            - button "重新开始" [ref=e43] [cursor=pointer]
        - group [ref=e45]:
          - generic "查看代码" [ref=e46] [cursor=pointer]
    - generic [ref=e47]:
      - heading "未知耗时：明确表达正在处理" [level=2] [ref=e48]
      - paragraph [ref=e49]: 未知任务保留标签和可访问语义，配合既有加载指示；这个局部组合不展示比例轨道。
      - generic [ref=e50]:
        - region "资料解析任务" [ref=e51]:
          - progressbar "正在解析资料" [ref=e52]:
            - text: 正在解析资料
            - status [ref=e53]
            - text: x
          - paragraph [ref=e55]: 正在识别资料目录，完成后会显示可阅读内容。
        - group [ref=e56]:
          - generic "查看代码" [ref=e57] [cursor=pointer]
    - generic [ref=e58]:
      - heading "按实际任务单位计量" [level=2] [ref=e59]
      - paragraph [ref=e60]: 完成量与总量使用答卷份数，百分比与数量就近展示。
      - generic [ref=e61]:
        - region "答卷批改任务" [ref=e62]:
          - paragraph [ref=e63]: 人工智能导论 · 课堂练习
          - progressbar "批改任务" [ref=e64]:
            - text: 批改任务
            - generic [ref=e65]: 25%
            - text: x
          - paragraph [ref=e68]: 已完成 6 / 24 份答卷
        - group [ref=e69]:
          - generic "查看代码" [ref=e70] [cursor=pointer]
  - region [ref=e71]:
    - heading "使用边界" [level=2] [ref=e72]
    - generic [ref=e73]:
      - generic [ref=e74]:
        - heading "适合用在" [level=3] [ref=e75]
        - list [ref=e76]:
          - listitem [ref=e77]: 同步、上传或批处理有明确总量与完成量。
          - listitem [ref=e78]: 一个持续任务需要稳定的标签、完成比例和外部状态说明。
      - generic [ref=e79]:
        - heading "避免用在" [level=3] [ref=e80]
        - list [ref=e81]:
          - listitem [ref=e82]: 用计时动画伪造处理进度。
          - listitem [ref=e83]: 把失败、暂停、重试、请求或数据持久化放进通用进度组件。
          - listitem [ref=e84]: 用普通进度条替代构成图或多目标进度图表。
  - generic [ref=e85]:
    - region [ref=e86]:
      - heading "API 与结构" [level=2] [ref=e87]
      - table [ref=e89]:
        - caption [ref=e90]: Progress 任务进度 常用接口
        - rowgroup [ref=e91]:
          - row [ref=e92]:
            - columnheader "名称" [ref=e93]
            - columnheader "类型" [ref=e94]
            - columnheader "默认" [ref=e95]
            - columnheader "说明" [ref=e96]
        - rowgroup [ref=e97]:
          - row [ref=e98]:
            - rowheader [ref=e99]:
              - code [ref=e100]: value
            - cell [ref=e101]:
              - code [ref=e102]: number | null
            - cell "—" [ref=e103]
            - cell "当前完成量；null 表示未知比例，非有限值按未知处理。有限值由 Base UI 限制在范围内。" [ref=e104]
          - row [ref=e105]:
            - rowheader [ref=e106]:
              - code [ref=e107]: min / max
            - cell [ref=e108]:
              - code [ref=e109]: number
            - cell "0 / 100" [ref=e110]
            - cell "有限数值且 min < max；错误范围会抛出 RangeError。" [ref=e111]
          - row [ref=e112]:
            - rowheader [ref=e113]:
              - code [ref=e114]: aria-label / ProgressLabel
            - cell [ref=e115]:
              - code [ref=e116]: accessible name
            - cell "—" [ref=e117]
            - cell "提供明确的任务名称；使用 ProgressLabel 时自动建立关联。" [ref=e118]
          - row [ref=e119]:
            - rowheader [ref=e120]:
              - code [ref=e121]: ProgressValue
            - cell [ref=e122]:
              - code [ref=e123]: Base UI Value props
            - cell "—" [ref=e124]
            - cell "由引擎提供归一化读数；未知状态不显示假百分比。" [ref=e125]
          - row [ref=e126]:
            - rowheader [ref=e127]:
              - code [ref=e128]: className / style / ref / render
            - cell [ref=e129]:
              - code [ref=e130]: Base UI props
            - cell "—" [ref=e131]
            - cell "保持原生组合能力与状态回调；不覆盖引擎的数值含义。" [ref=e132]
      - paragraph [ref=e133]: Parts / Slots：root、progress-label、progress-value、progress-track、progress-indicator
    - region [ref=e134]:
      - heading "调用示例" [level=2] [ref=e135]
      - generic [ref=e136]:
        - generic [ref=e137]:
          - button "复制代码" [ref=e138] [cursor=pointer]
          - status
        - code [ref=e141]: "import { useState } from \"react\"; import { Button, Link, Progress, ProgressLabel, ProgressValue } from \"@rain-next/ui\"; export function MaterialSync() { const [value, setValue] = useState(40); const [paused, setPaused] = useState(false); const [failed, setFailed] = useState(false); const complete = value === 100; return <> <section aria-label=\"资料同步任务\"> <Progress value={value} max={100}> <ProgressLabel>资料同步</ProgressLabel><ProgressValue /> </Progress> <div role=\"status\"> <p>{failed ? \"同步中断，请重试\" : complete ? \"全部资料已同步\" : paused ? \"同步已暂停\" : \"已完成 \" + value + \" / 100 份资料\"}</p> {(failed || paused) && <p className=\"rain-type-ui-caption\">已完成 {value} 份，继续时保留当前进度。</p>} </div> {failed ? <Button variant=\"primary\" onClick={() => { setFailed(false); setPaused(false); }}>重试同步</Button> : complete ? <Link href=\"#item\">查看课程资料</Link> : <Button variant={paused ? \"secondary\" : \"text\"} aria-pressed={paused} onClick={() => setPaused(current => !current)}>{paused ? \"继续同步\" : \"暂停同步\"}</Button>} </section> <div role=\"group\" aria-label=\"演示控制\"> <span className=\"rain-type-ui-caption\">演示控制</span> <Button variant=\"secondary\" disabled={paused || failed || complete} onClick={() => setValue(current => Math.min(100, current + 20))}>完成下一批</Button> <Button variant=\"text\" disabled={complete || failed} onClick={() => { setFailed(true); setPaused(false); }}>模拟失败</Button> <Button variant=\"text\" onClick={() => { setValue(0); setPaused(false); setFailed(false); }}>重新开始</Button> </div> </>; }"
      - paragraph [ref=e142]:
        - text: 当前源码：
        - code [ref=e143]: packages/ui/src/progress/progress.tsx
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
  3   | import { fileURLToPath } from "node:url";
  4   | 
  5   | const evidence = fileURLToPath(new URL("../../evidence/runtime/g4-review-sizing-2026-10-11/browser/", import.meta.url));
  6   | mkdirSync(evidence, { recursive: true });
  7   | const browserErrors = new Map<string, string[]>();
  8   | 
  9   | test.beforeEach(({ page }, info) => {
  10  |   const errors: string[] = [];
  11  |   browserErrors.set(info.testId, errors);
  12  |   page.on("pageerror", error => errors.push(`pageerror: ${error.message}`));
  13  |   page.on("console", message => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });
  14  | });
  15  | 
  16  | test.afterEach(({}, info) => {
  17  |   const errors = browserErrors.get(info.testId) ?? [];
  18  |   writeFileSync(`${evidence}/console-${info.project.name}-${info.line}.json`, JSON.stringify(errors, null, 2));
  19  |   expect(errors, "browser console errors and uncaught page errors").toEqual([]);
  20  | });
  21  | 
  22  | test("catalog links focus G4 headings, copy usable examples and preserve adjacent documentation", async ({ page, context }) => {
  23  |   await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  24  |   for (const [id, title, code] of [
  25  |     ["typography", "Typography 文字排版", "rain-type-reading-default"],
  26  |     ["item", "Item 内容条目", "ItemContent"],
  27  |     ["progress", "Progress 任务进度", "ProgressLabel"],
  28  |   ] as const) {
  29  |     await page.goto("/#components");
  30  |     await page.getByRole("link", { name: title, exact: true }).click();
  31  |     await expect(page.locator(`#${id}-title`)).toBeFocused();
  32  |     await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
  33  |     await expect(page.getByText("已复制", { exact: true })).toBeVisible();
  34  |     expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(code);
  35  |   }
  36  |   for (const id of ["accordion", "spinner", "sheet"]) {
  37  |     await page.goto(`/#${id}`);
  38  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  39  |     await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  40  |   }
  41  | });
  42  | 
  43  | test("three G4 pages expose examples, API, copyable code, themes and inherited density", async ({ page }, info) => {
  44  |   const headingFacts = [];
  45  |   for (const id of ["typography", "item", "progress"]) {
  46  |     await page.goto(`/#${id}`);
  47  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  48  |     await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  49  |     const headings = await page.locator(".component-doc__title > h1, .component-doc__example > h2").evaluateAll(nodes => nodes.map(node => ({
  50  |       tag: node.tagName, text: node.textContent, size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight,
  51  |     })));
  52  |     headingFacts.push({ id, headings });
  53  |     for (const heading of headings) {
> 54  |       expect.soft(heading.size, `${id}: ${heading.text}`).toBe("16px");
      |                                                           ^ Error: progress: 按实际任务单位计量
  55  |       expect.soft(heading.line, `${id}: ${heading.text}`).toBe("24px");
  56  |     }
  57  |     await expect(page.locator("pre code").last()).not.toBeEmpty();
  58  |     const codeDetails = page.locator(".g4-doc-example-code").first();
  59  |     const summary = codeDetails.locator("summary");
  60  |     await expect(codeDetails).not.toHaveAttribute("open");
  61  |     await summary.focus();
  62  |     await page.keyboard.press("Tab");
  63  |     await page.keyboard.press("Shift+Tab");
  64  |     await expect(summary).toBeFocused();
  65  |     await expect(summary).toHaveCSS("outline-style", "auto");
  66  |     await page.keyboard.press("Enter");
  67  |     await expect(codeDetails.locator("pre code").first()).toBeVisible();
  68  |     await page.keyboard.press("Space");
  69  |     await expect(codeDetails).not.toHaveAttribute("open");
  70  |     await page.locator(`#${id}-title`).click();
  71  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  72  |     await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-light.png`, fullPage: true });
  73  |     await page.getByRole("button", { name: "深色", exact: true }).click();
  74  |     await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  75  |     await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme", "dark");
  76  |     if (id !== "typography") await expect(page.locator(`[data-rain-id="ui-${id}"][data-slot="root"]`).first()).toHaveAttribute("data-density", "compact");
  77  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), `${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  78  |     await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-dark-compact.png`, fullPage: true });
  79  |     if (id === "item") await page.getByRole("region", { name: "课程资料示例", exact: true }).screenshot({ path: `${evidence}/item-${info.project.name}-dark-compact-scene.png` });
  80  |   }
  81  |   writeFileSync(`${evidence}/headings-${info.project.name}-facts.json`, JSON.stringify(headingFacts, null, 2));
  82  | });
  83  | 
  84  | test("Typography uses existing measured roles and separates value from Chinese unit", async ({ page }, info) => {
  85  |   await page.goto("/#typography");
  86  |   const facts = await page.locator('[data-slot="typography-data-example"]').evaluate(root => {
  87  |     const measure = (selector: string) => {
  88  |       const node = root.querySelector<HTMLElement>(selector)!;
  89  |       const style = getComputedStyle(node);
  90  |       return { text: node.textContent, font: style.fontFamily, size: style.fontSize, line: style.lineHeight };
  91  |     };
  92  |     const reading = getComputedStyle(document.querySelector('[aria-label="课程导读示例"]')!);
  93  |     const heading = getComputedStyle(document.querySelector('[data-slot="typography-ui-example"] h3')!);
  94  |     return { value: measure('[data-slot="value"]'), unit: measure('[data-slot="unit"]'), reading: { font: reading.fontFamily, size: reading.fontSize, line: reading.lineHeight }, heading: { size: heading.fontSize, line: heading.lineHeight }, dataFontCheck: document.fonts.check('28px "LINE Seed JP App_OTF"') };
  95  |   });
  96  |   writeFileSync(`${evidence}/typography-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  97  |   expect.soft(facts.value.size).toBe("28px");
  98  |   expect.soft(facts.value.line).toBe("36px");
  99  |   expect.soft(facts.heading.size).toBe("16px");
  100 |   expect.soft(facts.heading.line).toBe("24px");
  101 |   expect(facts.value.font).toContain("LINE Seed JP");
  102 |   expect(facts.unit.size).toBe("14px");
  103 |   expect(facts.unit.font).toContain("PingFang SC");
  104 |   expect(facts.unit.text).toBe("分");
  105 |   expect(facts.reading.size).toBe("15px");
  106 |   expect(facts.reading.line).toBe("26px");
  107 | });
  108 | 
  109 | test("Typography paragraphs keep the registered line heights on actual text nodes", async ({ page }, info) => {
  110 |   await page.goto("/#typography");
  111 |   await expect(page.locator("#typography-title")).toBeVisible();
  112 |   const facts = [];
  113 |   for (const [selector, line] of [
  114 |     ['[data-slot="typography-ui-example"] p.rain-type-ui-default', "22px"],
  115 |     ['.g4-doc-article > p.rain-type-ui-supporting, [data-slot="typography-data-example"] > p.rain-type-ui-supporting', "20px"],
  116 |     ['[data-slot="typography-ui-example"] p.rain-type-ui-caption', "20px"],
  117 |     ['[aria-label="课程导读示例"] p', "26px"],
  118 |   ] as const) {
  119 |     const paragraphs = await page.locator(selector).evaluateAll(nodes => nodes.map(node => ({
  120 |       text: node.textContent,
  121 |       line: getComputedStyle(node).lineHeight,
  122 |     })));
  123 |     facts.push({ selector, expectedLine: line, paragraphs });
  124 |     expect.soft(paragraphs.length, `${selector} has visible examples`).toBeGreaterThan(0);
  125 |     for (const paragraph of paragraphs) expect.soft(paragraph.line, `${selector}: ${paragraph.text}`).toBe(line);
  126 |   }
  127 |   writeFileSync(`${evidence}/typography-${info.project.name}-paragraph-facts.json`, JSON.stringify(facts, null, 2));
  128 |   await expect(page.locator(".g4-doc-type-row")).toHaveCount(9);
  129 |   for (const [preset, size, line] of [
  130 |     ["ui-default", "14px", "22px"], ["ui-compact", "13px", "18px"],
  131 |     ["ui-caption", "12px", "20px"], ["ui-supporting", "13px", "20px"],
  132 |     ["heading-section", "16px", "24px"], ["heading-page", "16px", "24px"],
  133 |     ["reading-small", "14px", "24px"], ["reading-default", "15px", "26px"],
  134 |     ["reading-large", "16px", "26px"],
  135 |   ] as const) {
  136 |     const sample = page.locator(`.g4-doc-type-row > p.rain-type-${preset}`);
  137 |     await expect(sample).toHaveCSS("font-size", size);
  138 |     await expect(sample).toHaveCSS("line-height", line);
  139 |   }
  140 | });
  141 | 
  142 | test("Typography sizing reaches existing consumers and limits named preset choices", async ({ page }, info) => {
  143 |   const facts = [];
  144 |   for (const [id, headingId] of [["input", "input-title"], ["select", "select-title"], ["input-number", "input-number-title"], ["tag", "tag-title"]] as const) {
  145 |     await page.goto(`/#${id}`);
  146 |     const heading = page.locator(`#${headingId}`);
  147 |     await expect(heading).toBeVisible();
  148 |     const measured = await heading.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight }));
  149 |     facts.push({ id, measured });
  150 |     expect.soft(measured.size, id).toBe("16px");
  151 |     expect.soft(measured.line, id).toBe("24px");
  152 |   }
  153 |   await page.goto("/#foundations");
  154 |   const statistic = page.locator('[data-rain-id="foundation-type-data"]');
```