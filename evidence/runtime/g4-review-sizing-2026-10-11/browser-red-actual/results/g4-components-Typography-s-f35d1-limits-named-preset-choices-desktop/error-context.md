# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Typography sizing reaches existing consumers and limits named preset choices
- Location: tests/e2e/g4-components.spec.ts:143:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5391/#input
Call log:
  - navigating to "http://127.0.0.1:5391/#input", waiting until "load"

```

# Test source

```ts
  46  |     await page.goto(`/#${id}`);
  47  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  48  |     await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  49  |     const headings = await page.locator(".component-doc__title > h1, main.component-doc h2").evaluateAll(nodes => nodes.map(node => ({
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
  90  |       return { text: node.textContent, font: style.fontFamily, size: style.fontSize, line: style.lineHeight, weight: style.fontWeight };
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
  102 |   expect(facts.value.weight).toBe("700");
  103 |   expect(facts.unit.size).toBe("14px");
  104 |   expect(facts.unit.font).toContain("PingFang SC");
  105 |   expect(facts.unit.text).toBe("分");
  106 |   expect(facts.reading.size).toBe("15px");
  107 |   expect(facts.reading.line).toBe("26px");
  108 | });
  109 | 
  110 | test("Typography paragraphs keep the registered line heights on actual text nodes", async ({ page }, info) => {
  111 |   await page.goto("/#typography");
  112 |   await expect(page.locator("#typography-title")).toBeVisible();
  113 |   const facts = [];
  114 |   for (const [selector, line] of [
  115 |     ['[data-slot="typography-ui-example"] p.rain-type-ui-default', "22px"],
  116 |     ['.g4-doc-article > p.rain-type-ui-supporting, [data-slot="typography-data-example"] > p.rain-type-ui-supporting', "20px"],
  117 |     ['[data-slot="typography-ui-example"] p.rain-type-ui-caption', "20px"],
  118 |     ['[aria-label="课程导读示例"] p', "26px"],
  119 |   ] as const) {
  120 |     const paragraphs = await page.locator(selector).evaluateAll(nodes => nodes.map(node => ({
  121 |       text: node.textContent,
  122 |       line: getComputedStyle(node).lineHeight,
  123 |     })));
  124 |     facts.push({ selector, expectedLine: line, paragraphs });
  125 |     expect.soft(paragraphs.length, `${selector} has visible examples`).toBeGreaterThan(0);
  126 |     for (const paragraph of paragraphs) expect.soft(paragraph.line, `${selector}: ${paragraph.text}`).toBe(line);
  127 |   }
  128 |   writeFileSync(`${evidence}/typography-${info.project.name}-paragraph-facts.json`, JSON.stringify(facts, null, 2));
  129 |   await expect(page.locator(".g4-doc-type-row")).toHaveCount(9);
  130 |   for (const [preset, size, line] of [
  131 |     ["ui-default", "14px", "22px"], ["ui-compact", "13px", "18px"],
  132 |     ["ui-caption", "12px", "20px"], ["ui-supporting", "13px", "20px"],
  133 |     ["heading-section", "16px", "24px"], ["heading-page", "16px", "24px"],
  134 |     ["reading-small", "14px", "24px"], ["reading-default", "15px", "26px"],
  135 |     ["reading-large", "16px", "26px"],
  136 |   ] as const) {
  137 |     const sample = page.locator(`.g4-doc-type-row > p.rain-type-${preset}`);
  138 |     await expect(sample).toHaveCSS("font-size", size);
  139 |     await expect(sample).toHaveCSS("line-height", line);
  140 |   }
  141 | });
  142 | 
  143 | test("Typography sizing reaches existing consumers and limits named preset choices", async ({ page }, info) => {
  144 |   const facts = [];
  145 |   for (const [id, headingId] of [["input", "input-title"], ["select", "select-title"], ["input-number", "input-number-title"], ["tag", "tag-title"]] as const) {
> 146 |     await page.goto(`/#${id}`);
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5391/#input
  147 |     const heading = page.locator(`#${headingId}`);
  148 |     await expect(heading).toBeVisible();
  149 |     const measured = await heading.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight }));
  150 |     facts.push({ id, measured });
  151 |     expect.soft(measured.size, id).toBe("16px");
  152 |     expect.soft(measured.line, id).toBe("24px");
  153 |   }
  154 |   await page.goto("/#foundations");
  155 |   const statistic = page.locator('[data-rain-id="foundation-type-data"]');
  156 |   const legacy = await statistic.evaluate(root => {
  157 |     const value = getComputedStyle(root.querySelector('[data-slot="statistic-value"]')!);
  158 |     const unit = getComputedStyle(root.querySelector('[data-slot="statistic-unit"]')!);
  159 |     return { value: { size: value.fontSize, line: value.lineHeight, font: value.fontFamily, weight: value.fontWeight }, unit: { size: unit.fontSize, font: unit.fontFamily } };
  160 |   });
  161 |   facts.push({ id: "foundations", measured: legacy });
  162 |   expect.soft(legacy.value.size).toBe("28px");
  163 |   expect.soft(legacy.value.line).toBe("36px");
  164 |   expect(legacy.value.font).toContain("LINE Seed JP");
  165 |   expect(legacy.value.weight).toBe("700");
  166 |   expect(legacy.unit.size).toBe("14px");
  167 |   expect(legacy.unit.font).toContain("PingFang SC");
  168 | 
  169 |   await page.goto("/#token-foundations");
  170 |   const panel = page.locator('[data-rain-id="token-typography-panel"]');
  171 |   const preset = panel.getByRole("combobox", { name: "排版方案", exact: true });
  172 |   const size = panel.getByRole("combobox", { name: "字号", exact: true });
  173 |   const line = panel.getByRole("combobox", { name: "行高", exact: true });
  174 |   const sample = panel.getByTestId("typography-live-preview");
  175 |   const uiSizes = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  176 |   expect(uiSizes).toHaveLength(19);
  177 |   expect(uiSizes).toContain(40);
  178 |   for (const name of ["heading-page", "heading-section"]) {
  179 |     await preset.selectOption(name);
  180 |     const choices = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  181 |     const measured = await sample.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight }));
  182 |     facts.push({ id: name, choices, measured });
  183 |     expect.soft(choices, name).toEqual([16, 17, 18]);
  184 |     expect.soft(measured.size, name).toBe("16px");
  185 |     expect.soft(measured.line, name).toBe("24px");
  186 |     for (const selectedSize of ["17", "18"]) {
  187 |       await size.selectOption(selectedSize);
  188 |       await expect(sample).toHaveCSS("font-size", `${selectedSize}px`);
  189 |     }
  190 |     await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
  191 |     await expect.soft(sample).toHaveCSS("font-size", "16px");
  192 |   }
  193 |   await preset.selectOption("data-default");
  194 |   const dataSizes = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  195 |   const value = sample.locator('[data-slot="statistic-value"]');
  196 |   const measured = await value.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight, weight: getComputedStyle(node).fontWeight }));
  197 |   facts.push({ id: "data-default", choices: dataSizes, measured });
  198 |   writeFileSync(`${evidence}/typography-consumers-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  199 |   expect.soft(Math.max(...dataSizes)).toBe(28);
  200 |   expect.soft(dataSizes.every(candidate => candidate <= 28)).toBe(true);
  201 |   expect.soft(measured.size).toBe("28px");
  202 |   expect.soft(measured.line).toBe("36px");
  203 |   expect(measured.weight).toBe("700");
  204 |   for (const excluded of [32, 36, 40]) expect(dataSizes).not.toContain(excluded);
  205 |   await size.selectOption("24");
  206 |   await line.selectOption("32");
  207 |   await expect(value).toHaveCSS("font-size", "24px");
  208 |   await expect(value).toHaveCSS("line-height", "32px");
  209 |   await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
  210 |   await expect(value).toHaveCSS("font-size", "28px");
  211 |   await expect(value).toHaveCSS("line-height", "36px");
  212 |   await preset.selectOption("reading-default");
  213 |   await size.selectOption("40");
  214 |   await expect(sample).toHaveCSS("font-size", "40px");
  215 |   await panel.screenshot({ path: `${evidence}/typography-panel-${info.project.name}.png` });
  216 | });
  217 | 
  218 | test("Item lists aligned readable resources and keeps native keyboard navigation", async ({ page }, info) => {
  219 |   await page.goto("/#item");
  220 |   const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  221 |   await expect(list.getByRole("listitem")).toHaveCount(3);
  222 |   await expect(list.getByRole("button", { name: "课堂讨论任务尚未开放", exact: true })).toBeDisabled();
  223 |   const rows = list.locator('[data-rain-id="ui-item"][data-slot="root"]');
  224 |   await expect(rows).toHaveCount(3);
  225 |   const mediaSizes = await rows.evaluateAll(nodes => nodes.map(root => {
  226 |     const media = root.querySelector('[data-slot="media"]')!, icon = media.querySelector('[data-rain-id="icon"]')!;
  227 |     const box = media.getBoundingClientRect(), glyph = icon.getBoundingClientRect();
  228 |     const probe = document.createElement("span");
  229 |     probe.style.backgroundColor = "var(--rain-category-background-neutral-2)";
  230 |     media.append(probe);
  231 |     const expectedBackground = getComputedStyle(probe).backgroundColor;
  232 |     probe.remove();
  233 |     return { box: { width: box.width, height: box.height }, icon: { width: glyph.width, height: glyph.height }, asset: icon.getAttribute("data-icon"), hidden: icon.getAttribute("aria-hidden"), background: getComputedStyle(media).backgroundColor, expectedBackground };
  234 |   }));
  235 |   writeFileSync(`${evidence}/item-${info.project.name}-media-sizes.json`, JSON.stringify(mediaSizes, null, 2));
  236 |   for (const media of mediaSizes) {
  237 |     expect.soft(media.box).toEqual({ width: 40, height: 40 });
  238 |     expect.soft(media.icon).toEqual({ width: 20, height: 20 });
  239 |     expect(media.asset).toBe("icon/file");
  240 |     expect(media.hidden).toBe("true");
  241 |     expect(media.background).toBe(media.expectedBackground);
  242 |   }
  243 |   const actionSizes = await rows.evaluateAll(nodes => nodes.flatMap(root => {
  244 |     const actions = root.querySelector('[data-slot="actions"]')!;
  245 |     const read = actions.querySelector("button"), download = actions.querySelector("a[download]");
  246 |     if (!read || !download) return [];
```