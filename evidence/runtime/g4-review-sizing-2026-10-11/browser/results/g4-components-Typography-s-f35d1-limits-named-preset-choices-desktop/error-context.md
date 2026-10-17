# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Typography sizing reaches existing consumers and limits named preset choices
- Location: tests/e2e/g4-components.spec.ts:142:1

# Error details

```
Error: input

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: input

expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
```

```
Error: select

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: select

expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
```

```
Error: input-number

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: input-number

expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
```

```
Error: tag

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: tag

expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
```

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
Error: heading-page

expect(received).toEqual(expected) // deep equality

- Expected  -  0
+ Received  + 16

  Array [
+   9,
+   10,
+   11,
+   12,
+   13,
+   14,
+   15,
    16,
    17,
    18,
+   19,
+   20,
+   22,
+   24,
+   26,
+   28,
+   32,
+   36,
+   40,
  ]
```

```
Error: heading-page

expect(received).toBe(expected) // Object.is equality

Expected: "16px"
Received: "24px"
```

```
Error: heading-page

expect(received).toBe(expected) // Object.is equality

Expected: "24px"
Received: "32px"
```

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('[data-rain-id="token-typography-panel"]').getByTestId('typography-live-preview')
Expected: "16px"
Received: "24px"
Timeout:  5000ms

Call log:
  - Expect "soft toHaveCSS" with timeout 5000ms
  - waiting for locator('[data-rain-id="token-typography-panel"]').getByTestId('typography-live-preview')
    14 × locator resolved to <p class="rain-type-heading-page" data-slot="typography-text-sample" data-testid="typography-live-preview">学习与探索，让每一次思考都有回响。Rain Classroom 2026，课程说明支持中文、Eng…</p>
       - unexpected value "24px"

```

```yaml
- paragraph: 学习与探索，让每一次思考都有回响。Rain Classroom 2026，课程说明支持中文、English 与普通数字混排。
```

```
Error: heading-section

expect(received).toEqual(expected) // deep equality

- Expected  -  0
+ Received  + 16

  Array [
+   9,
+   10,
+   11,
+   12,
+   13,
+   14,
+   15,
    16,
    17,
    18,
+   19,
+   20,
+   22,
+   24,
+   26,
+   28,
+   32,
+   36,
+   40,
  ]
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 28
Received: 40
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

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
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('[data-rain-id="token-typography-panel"]').getByTestId('typography-live-preview').locator('[data-slot="statistic-value"]')
Expected: "28px"
Received: "36px"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for locator('[data-rain-id="token-typography-panel"]').getByTestId('typography-live-preview').locator('[data-slot="statistic-value"]')
    14 × locator resolved to <span data-slot="statistic-value" class="rain-type-data-default">98.6</span>
       - unexpected value "36px"

```

```yaml
- text: "98.6"
```

# Test source

```ts
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
  201 |   expect.soft(measured.line).toBe("36px");
  202 |   expect(measured.weight).toBe("700");
  203 |   await size.selectOption("24");
  204 |   await line.selectOption("32");
  205 |   await expect(value).toHaveCSS("font-size", "24px");
  206 |   await expect(value).toHaveCSS("line-height", "32px");
  207 |   await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
> 208 |   await expect(value).toHaveCSS("font-size", "28px");
      |                       ^ Error: expect(locator).toHaveCSS(expected) failed
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
  238 |     const read = actions.querySelector("button"), download = actions.querySelector("a[download]");
  239 |     if (!read || !download) return [];
  240 |     const measure = (node: Element) => {
  241 |       const style = getComputedStyle(node), bounds = node.getBoundingClientRect();
  242 |       return { fontSize: style.fontSize, lineHeight: style.lineHeight, height: bounds.height, width: bounds.width };
  243 |     };
  244 |     return [{ title: root.querySelector('[data-slot="title"]')!.textContent, read: measure(read), download: measure(download) }];
  245 |   }));
  246 |   writeFileSync(`${evidence}/item-${info.project.name}-action-sizes.json`, JSON.stringify(actionSizes, null, 2));
  247 |   await page.getByRole("region", { name: "课程资料示例", exact: true }).screenshot({ path: `${evidence}/item-${info.project.name}-scene.png` });
  248 |   expect(actionSizes).toHaveLength(2);
  249 |   for (const row of actionSizes) {
  250 |     for (const key of ["fontSize", "lineHeight"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBe(row.download[key]);
  251 |     for (const key of ["height", "width"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBeCloseTo(row.download[key], 1);
  252 |     expect.soft(row.read.fontSize).toBe("14px");
  253 |     expect.soft(row.read.lineHeight).toBe("20px");
  254 |     expect.soft(row.read.height).toBe(26);
  255 |   }
  256 |   const first = rows.first();
  257 |   const layout = await rows.evaluateAll(nodes => nodes.map(root => {
  258 |     const content = root.querySelector('[data-slot="content"]')!;
  259 |     const title = root.querySelector('[data-slot="title"]')!;
  260 |     const bounds = root.getBoundingClientRect(), contentBounds = content.getBoundingClientRect();
  261 |     const style = getComputedStyle(title);
  262 |     return { rowWidth: bounds.width, contentLeft: contentBounds.left, contentWidth: contentBounds.width,
  263 |       titleWidth: title.clientWidth, titleScrollWidth: title.scrollWidth, clamp: style.webkitLineClamp,
  264 |       wrap: style.overflowWrap, text: title.textContent };
  265 |   }));
  266 |   for (const row of layout) {
  267 |     expect(row.rowWidth).toBeCloseTo(layout[0]!.rowWidth, 0);
  268 |     expect(row.contentLeft).toBeCloseTo(layout[0]!.contentLeft, 0);
  269 |     expect(row.contentWidth).toBeGreaterThanOrEqual(120);
  270 |     expect(row.titleScrollWidth).toBeLessThanOrEqual(row.titleWidth + 1);
  271 |     expect(row.clamp).toBe("none");
  272 |     expect(row.wrap).toBe("anywhere");
  273 |   }
  274 |   writeFileSync(`${evidence}/item-${info.project.name}-layout.json`, JSON.stringify(layout, null, 2));
  275 |   const padding = await first.evaluate(node => getComputedStyle(node).paddingTop);
  276 |   expect(padding).toBe("16px");
  277 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  278 |   expect(await first.evaluate(node => getComputedStyle(node).paddingTop)).toBe("12px");
  279 |   const link = page.getByRole("link", { name: /文字排版规范/ });
  280 |   const navigationIcon = link.locator('[data-slot="media"] > [data-rain-id="icon"]');
  281 |   const iconFacts = await navigationIcon.evaluate(icon => {
  282 |     const probe = document.createElement("span");
  283 |     probe.style.color = "var(--rain-category-icon-neutral-3)";
  284 |     icon.parentElement!.append(probe);
  285 |     const expectedColor = getComputedStyle(probe).color;
  286 |     probe.remove();
  287 |     return { asset: icon.getAttribute("data-icon"), hidden: icon.getAttribute("aria-hidden"), color: getComputedStyle(icon).color, expectedColor };
  288 |   });
  289 |   writeFileSync(`${evidence}/item-${info.project.name}-navigation-icon.json`, JSON.stringify(iconFacts, null, 2));
  290 |   expect.soft(iconFacts.asset).toBe("icon/arrow-right");
  291 |   expect.soft(iconFacts.color).toBe(iconFacts.expectedColor);
  292 |   expect(iconFacts.hidden).toBe("true");
  293 |   await link.focus();
  294 |   await page.keyboard.press("Tab");
  295 |   await page.keyboard.press("Shift+Tab");
  296 |   await expect(link).toBeFocused();
  297 |   expect(await link.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
  298 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-focused-link.png`, fullPage: true });
  299 |   await page.keyboard.press("Enter");
  300 |   await expect(page).toHaveURL(/#typography$/);
  301 |   await expect(page.locator("#typography-title")).toBeFocused();
  302 | });
  303 | 
  304 | test("Item reading dialogs return focus and native downloads match the readable document", async ({ page }, info) => {
  305 |   await page.goto("/#item");
  306 |   const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  307 |   const first = list.getByRole("listitem").first();
  308 |   const trigger = first.getByRole("button", { name: "阅读课程导读", exact: true });
```