# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Typography paragraphs keep the registered line heights on actual text nodes
- Location: tests/e2e/g4-components.spec.ts:109:1

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('.g4-doc-type-row > p.rain-type-heading-page')
Expected: "16px"
Received: "24px"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for locator('.g4-doc-type-row > p.rain-type-heading-page')
    14 × locator resolved to <p class="rain-type-heading-page">观察问题，整理证据，形成判断。</p>
       - unexpected value "24px"

```

```yaml
- paragraph: 观察问题，整理证据，形成判断。
```

# Test source

```ts
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
> 137 |     await expect(sample).toHaveCSS("font-size", size);
      |                          ^ Error: expect(locator).toHaveCSS(expected) failed
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
  201 |   expect.soft(measured.line).toBe("36px");
  202 |   expect(measured.weight).toBe("700");
  203 |   await size.selectOption("24");
  204 |   await line.selectOption("32");
  205 |   await expect(value).toHaveCSS("font-size", "24px");
  206 |   await expect(value).toHaveCSS("line-height", "32px");
  207 |   await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
  208 |   await expect(value).toHaveCSS("font-size", "28px");
  209 |   await expect(value).toHaveCSS("line-height", "36px");
  210 |   await panel.screenshot({ path: `${evidence}/typography-panel-${info.project.name}.png` });
  211 | });
  212 | 
  213 | test("Item lists aligned readable resources and keeps native keyboard navigation", async ({ page }, info) => {
  214 |   await page.goto("/#item");
  215 |   const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  216 |   await expect(list.getByRole("listitem")).toHaveCount(3);
  217 |   await expect(list.getByRole("button", { name: "课堂讨论任务尚未开放", exact: true })).toBeDisabled();
  218 |   const rows = list.locator('[data-rain-id="ui-item"][data-slot="root"]');
  219 |   await expect(rows).toHaveCount(3);
  220 |   const mediaSizes = await rows.evaluateAll(nodes => nodes.map(root => {
  221 |     const media = root.querySelector('[data-slot="media"]')!, icon = media.querySelector('[data-rain-id="icon"]')!;
  222 |     const box = media.getBoundingClientRect(), glyph = icon.getBoundingClientRect();
  223 |     const probe = document.createElement("span");
  224 |     probe.style.backgroundColor = "var(--rain-category-background-neutral-2)";
  225 |     media.append(probe);
  226 |     const expectedBackground = getComputedStyle(probe).backgroundColor;
  227 |     probe.remove();
  228 |     return { box: { width: box.width, height: box.height }, icon: { width: glyph.width, height: glyph.height }, background: getComputedStyle(media).backgroundColor, expectedBackground };
  229 |   }));
  230 |   writeFileSync(`${evidence}/item-${info.project.name}-media-sizes.json`, JSON.stringify(mediaSizes, null, 2));
  231 |   for (const media of mediaSizes) {
  232 |     expect.soft(media.box).toEqual({ width: 40, height: 40 });
  233 |     expect.soft(media.icon).toEqual({ width: 20, height: 20 });
  234 |     expect(media.background).toBe(media.expectedBackground);
  235 |   }
  236 |   const actionSizes = await rows.evaluateAll(nodes => nodes.flatMap(root => {
  237 |     const actions = root.querySelector('[data-slot="actions"]')!;
```