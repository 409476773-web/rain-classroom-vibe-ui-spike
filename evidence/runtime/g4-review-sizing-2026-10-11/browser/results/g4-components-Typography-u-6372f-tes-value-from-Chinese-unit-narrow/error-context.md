# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Typography uses existing measured roles and separates value from Chinese unit
- Location: tests/e2e/g4-components.spec.ts:84:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "28px"
Received: "36px"
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "36px"
Received: "42px"
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
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
    - paragraph [ref=e11]: 用稳定的文字层级组织内容。界面文字帮助扫读，阅读文字保持连续，关键数字提供清楚的视觉锚点。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "从标题到正文的阅读层级" [level=2] [ref=e21]
      - paragraph [ref=e22]: 同一份课程导读，把标题、阅读目标、元信息与正文放在连续的阅读顺序中。
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]:
            - paragraph [ref=e26]: 人工智能导论 · 第 04 讲
            - heading "从问题到证据" [level=3] [ref=e27]
            - paragraph [ref=e28]: 学习如何观察问题、识别证据，并形成可解释的判断。
            - paragraph [ref=e29]: 林老师 · 10 月 11 日更新 · 约 5 分钟阅读
          - article "课程导读示例" [ref=e30]:
            - heading "先分清事实与判断" [level=4] [ref=e31]
            - paragraph [ref=e32]: 先描述你观察到的现象，再说明它能够支持什么判断。例如，学生完成了一次课堂讨论，这是可以记录的事实；学生是否理解了概念，还需要结合回答内容和后续表现。
            - paragraph [ref=e33]: 阅读案例时，可以圈出一条事实，写下你的解释，再问自己：还有没有其他可能？把依据与解释放在一起，能让交流更清楚，也让不同观点有机会被检验。
          - paragraph [ref=e34]: 阅读后，请带着一条证据参加课堂讨论。
        - group [ref=e35]:
          - generic "查看代码" [ref=e36] [cursor=pointer]
    - generic [ref=e37]:
      - heading "直接比较已有字阶" [level=2] [ref=e38]
      - paragraph [ref=e39]: 用同一段文字比较字号与行高。选择依据是内容角色；字体和尺寸沿用已登记方案。
      - generic [ref=e41]:
        - generic [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]: 界面正文
            - generic [ref=e45]: 14 / 22
          - paragraph [ref=e46]: 观察问题，整理证据，形成判断。
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]: 紧凑文字
            - generic [ref=e50]: 13 / 18
          - paragraph [ref=e51]: 观察问题，整理证据，形成判断。
        - generic [ref=e52]:
          - generic [ref=e53]:
            - generic [ref=e54]: 元信息
            - generic [ref=e55]: 12 / 20
          - paragraph [ref=e56]: 观察问题，整理证据，形成判断。
        - generic [ref=e57]:
          - generic [ref=e58]:
            - generic [ref=e59]: 辅助说明
            - generic [ref=e60]: 13 / 20
          - paragraph [ref=e61]: 观察问题，整理证据，形成判断。
        - generic [ref=e62]:
          - generic [ref=e63]:
            - generic [ref=e64]: 区块标题
            - generic [ref=e65]: 16 / 24
          - paragraph [ref=e66]: 观察问题，整理证据，形成判断。
        - generic [ref=e67]:
          - generic [ref=e68]:
            - generic [ref=e69]: 页面标题
            - generic [ref=e70]: 24 / 32
          - paragraph [ref=e71]: 观察问题，整理证据，形成判断。
        - generic [ref=e72]:
          - generic [ref=e73]:
            - generic [ref=e74]: 紧凑阅读
            - generic [ref=e75]: 14 / 24
          - paragraph [ref=e76]: 观察问题，整理证据，形成判断。
        - generic [ref=e77]:
          - generic [ref=e78]:
            - generic [ref=e79]: 常规阅读
            - generic [ref=e80]: 15 / 26
          - paragraph [ref=e81]: 观察问题，整理证据，形成判断。
        - generic [ref=e82]:
          - generic [ref=e83]:
            - generic [ref=e84]: 大号阅读
            - generic [ref=e85]: 16 / 26
          - paragraph [ref=e86]: 观察问题，整理证据，形成判断。
    - generic [ref=e87]:
      - heading "关键数字与单位" [level=2] [ref=e88]
      - paragraph [ref=e89]: 数值承担视觉锚点，标签、中文单位和统计范围保持界面字体。以下为课程样例数据。
      - generic [ref=e90]:
        - generic [ref=e91]:
          - text: 平均得分
          - generic [ref=e92]:
            - generic [ref=e93]: "86.5"
            - generic [ref=e94]: 分
          - paragraph [ref=e95]: 共 24 份答卷 · 满分 100 分
        - group [ref=e96]:
          - generic "查看代码" [ref=e97] [cursor=pointer]
  - region [ref=e98]:
    - heading "使用边界" [level=2] [ref=e99]
    - generic [ref=e100]:
      - generic [ref=e101]:
        - heading "适合用在" [level=3] [ref=e102]
        - list [ref=e103]:
          - listitem [ref=e104]: 标题、控件说明、正文和元信息需要建立稳定层级。
          - listitem [ref=e105]: 答案解析、评语与报告结论需要连续阅读。
          - listitem [ref=e106]: 少量关键数值承担视觉锚点，数字与中文单位分开。
      - generic [ref=e107]:
        - heading "避免用在" [level=3] [ref=e108]
        - list [ref=e109]:
          - listitem [ref=e110]: 把普通日期、序号、表格数值或中文单位切换为关键数据字体。
          - listitem [ref=e111]: 为每段文案另建字号、字体或同义包装组件。
          - listitem [ref=e112]: 仅为增大字号选择更高的 HTML 标题层级。
  - generic [ref=e113]:
    - region [ref=e114]:
      - heading "API 与结构" [level=2] [ref=e115]
      - table [ref=e117]:
        - caption [ref=e118]: Typography 文字排版 常用接口
        - rowgroup [ref=e119]:
          - row [ref=e120]:
            - columnheader "名称" [ref=e121]
            - columnheader "类型" [ref=e122]
            - columnheader "默认" [ref=e123]
            - columnheader "说明" [ref=e124]
        - rowgroup [ref=e125]:
          - row [ref=e126]:
            - rowheader [ref=e127]:
              - code [ref=e128]: rain-type-ui-default
            - cell [ref=e129]:
              - code [ref=e130]: ui · 14px / 22px
            - cell "—" [ref=e131]
            - cell "普通界面文字、表格正文和常规标签" [ref=e132]
          - row [ref=e133]:
            - rowheader [ref=e134]:
              - code [ref=e135]: rain-type-ui-compact
            - cell [ref=e136]:
              - code [ref=e137]: ui · 13px / 18px
            - cell "—" [ref=e138]
            - cell "紧凑标签、短提示和辅助字段" [ref=e139]
          - row [ref=e140]:
            - rowheader [ref=e141]:
              - code [ref=e142]: rain-type-ui-caption
            - cell [ref=e143]:
              - code [ref=e144]: ui · 12px / 20px
            - cell "—" [ref=e145]
            - cell "次要元数据、图注与短辅助信息" [ref=e146]
          - row [ref=e147]:
            - rowheader [ref=e148]:
              - code [ref=e149]: rain-type-ui-supporting
            - cell [ref=e150]:
              - code [ref=e151]: ui · 13px / 20px
            - cell "—" [ref=e152]
            - cell "面板短说明和内容补充" [ref=e153]
          - row [ref=e154]:
            - rowheader [ref=e155]:
              - code [ref=e156]: rain-type-heading-section
            - cell [ref=e157]:
              - code [ref=e158]: ui · 16px / 24px
            - cell "—" [ref=e159]
            - cell "卡片、区块标题和页面主标题" [ref=e160]
          - row [ref=e161]:
            - rowheader [ref=e162]:
              - code [ref=e163]: rain-type-heading-page
            - cell [ref=e164]:
              - code [ref=e165]: ui · 24px / 32px
            - cell "—" [ref=e166]
            - cell "极少使用的页面主标题与重要数据" [ref=e167]
          - row [ref=e168]:
            - rowheader [ref=e169]:
              - code [ref=e170]: rain-type-reading-small
            - cell [ref=e171]:
              - code [ref=e172]: reading · 14px / 24px
            - cell "—" [ref=e173]
            - cell "较紧凑的长内容阅读区" [ref=e174]
          - row [ref=e175]:
            - rowheader [ref=e176]:
              - code [ref=e177]: rain-type-reading-default
            - cell [ref=e178]:
              - code [ref=e179]: reading · 15px / 26px
            - cell "—" [ref=e180]
            - cell "答案解析、评语和报告结论" [ref=e181]
          - row [ref=e182]:
            - rowheader [ref=e183]:
              - code [ref=e184]: rain-type-reading-large
            - cell [ref=e185]:
              - code [ref=e186]: reading · 16px / 26px
            - cell "—" [ref=e187]
            - cell "更大字号的阅读区" [ref=e188]
          - row [ref=e189]:
            - rowheader [ref=e190]:
              - code [ref=e191]: rain-type-data-default
            - cell [ref=e192]:
              - code [ref=e193]: data · 36px / 42px
            - cell "—" [ref=e194]
            - cell "极少使用、承担视觉锚点的关键数值。36px 为默认，可选其他已登记字号，并检查对应行高。" [ref=e195]
      - paragraph [ref=e196]: Parts / Slots：原生 heading / paragraph / article、关键数据 label / value / unit
    - region [ref=e197]:
      - heading "调用示例" [level=2] [ref=e198]
      - generic [ref=e199]:
        - generic [ref=e200]:
          - button "复制代码" [ref=e201] [cursor=pointer]
          - status
        - code [ref=e204]: <> <header> <p className="rain-type-ui-caption">人工智能导论 · 第 04 讲</p> <h3 className="rain-type-heading-page">从问题到证据</h3> <p className="rain-type-ui-default">学习如何观察问题、识别证据，并形成可解释的判断。</p> <p className="rain-type-ui-caption">林老师 · 10 月 11 日更新 · 约 5 分钟阅读</p> </header> <article className="rain-type-reading-default"> <h4 className="rain-type-heading-section">先分清事实与判断</h4> <p>先描述你观察到的现象，再说明它能够支持什么判断。</p> </article> <p className="rain-type-ui-supporting">阅读后，请带着一条证据参加课堂讨论。</p> </>
      - paragraph [ref=e205]:
        - text: 当前源码：
        - code [ref=e206]: packages/foundations/src/typography-contract.ts
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
  54  |       expect.soft(heading.size, `${id}: ${heading.text}`).toBe("16px");
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
> 100 |   expect.soft(facts.heading.line).toBe("24px");
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
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
  155 |   const legacy = await statistic.evaluate(root => {
  156 |     const value = getComputedStyle(root.querySelector('[data-slot="statistic-value"]')!);
  157 |     const unit = getComputedStyle(root.querySelector('[data-slot="statistic-unit"]')!);
  158 |     return { value: { size: value.fontSize, line: value.lineHeight, font: value.fontFamily, weight: value.fontWeight }, unit: { size: unit.fontSize, font: unit.fontFamily } };
  159 |   });
  160 |   facts.push({ id: "foundations", measured: legacy });
  161 |   expect.soft(legacy.value.size).toBe("28px");
  162 |   expect.soft(legacy.value.line).toBe("36px");
  163 |   expect(legacy.value.font).toContain("LINE Seed JP");
  164 |   expect(legacy.value.weight).toBe("700");
  165 |   expect(legacy.unit.size).toBe("14px");
  166 |   expect(legacy.unit.font).toContain("PingFang SC");
  167 | 
  168 |   await page.goto("/#token-foundations");
  169 |   const panel = page.locator('[data-rain-id="token-typography-panel"]');
  170 |   const preset = panel.getByRole("combobox", { name: "排版方案", exact: true });
  171 |   const size = panel.getByRole("combobox", { name: "字号", exact: true });
  172 |   const line = panel.getByRole("combobox", { name: "行高", exact: true });
  173 |   const sample = panel.getByTestId("typography-live-preview");
  174 |   const uiSizes = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  175 |   expect(uiSizes).toHaveLength(19);
  176 |   expect(uiSizes).toContain(40);
  177 |   for (const name of ["heading-page", "heading-section"]) {
  178 |     await preset.selectOption(name);
  179 |     const choices = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  180 |     const measured = await sample.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight }));
  181 |     facts.push({ id: name, choices, measured });
  182 |     expect.soft(choices, name).toEqual([16, 17, 18]);
  183 |     expect.soft(measured.size, name).toBe("16px");
  184 |     expect.soft(measured.line, name).toBe("24px");
  185 |     for (const selectedSize of ["17", "18"]) {
  186 |       await size.selectOption(selectedSize);
  187 |       await expect(sample).toHaveCSS("font-size", `${selectedSize}px`);
  188 |     }
  189 |     await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
  190 |     await expect.soft(sample).toHaveCSS("font-size", "16px");
  191 |   }
  192 |   await preset.selectOption("data-default");
  193 |   const dataSizes = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  194 |   const value = sample.locator('[data-slot="statistic-value"]');
  195 |   const measured = await value.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight, weight: getComputedStyle(node).fontWeight }));
  196 |   facts.push({ id: "data-default", choices: dataSizes, measured });
  197 |   writeFileSync(`${evidence}/typography-consumers-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  198 |   expect.soft(Math.max(...dataSizes)).toBe(28);
  199 |   expect.soft(dataSizes.every(candidate => candidate <= 28)).toBe(true);
  200 |   expect.soft(measured.size).toBe("28px");
```