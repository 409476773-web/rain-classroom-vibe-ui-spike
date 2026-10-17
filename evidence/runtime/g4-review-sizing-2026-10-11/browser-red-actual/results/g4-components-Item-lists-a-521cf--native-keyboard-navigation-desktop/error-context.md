# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Item lists aligned readable resources and keeps native keyboard navigation
- Location: tests/e2e/g4-components.spec.ts:218:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5391/#item
Call log:
  - navigating to "http://127.0.0.1:5391/#item", waiting until "load"

```

# Test source

```ts
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
  146 |     await page.goto(`/#${id}`);
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
> 219 |   await page.goto("/#item");
      |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5391/#item
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
  247 |     const measure = (node: Element) => {
  248 |       const style = getComputedStyle(node), bounds = node.getBoundingClientRect();
  249 |       return { fontSize: style.fontSize, lineHeight: style.lineHeight, height: bounds.height, width: bounds.width };
  250 |     };
  251 |     return [{ title: root.querySelector('[data-slot="title"]')!.textContent, read: measure(read), download: measure(download) }];
  252 |   }));
  253 |   writeFileSync(`${evidence}/item-${info.project.name}-action-sizes.json`, JSON.stringify(actionSizes, null, 2));
  254 |   await page.getByRole("region", { name: "课程资料示例", exact: true }).screenshot({ path: `${evidence}/item-${info.project.name}-scene.png` });
  255 |   expect(actionSizes).toHaveLength(2);
  256 |   for (const row of actionSizes) {
  257 |     for (const key of ["fontSize", "lineHeight"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBe(row.download[key]);
  258 |     for (const key of ["height", "width"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBeCloseTo(row.download[key], 1);
  259 |     expect.soft(row.read.fontSize).toBe("14px");
  260 |     expect.soft(row.read.lineHeight).toBe("20px");
  261 |     expect.soft(row.read.height).toBe(26);
  262 |     expect.soft(row.read.width).toBe(40);
  263 |   }
  264 |   const first = rows.first();
  265 |   const layout = await rows.evaluateAll(nodes => nodes.map(root => {
  266 |     const content = root.querySelector('[data-slot="content"]')!;
  267 |     const title = root.querySelector('[data-slot="title"]')!;
  268 |     const bounds = root.getBoundingClientRect(), contentBounds = content.getBoundingClientRect();
  269 |     const style = getComputedStyle(title);
  270 |     return { rowWidth: bounds.width, contentLeft: contentBounds.left, contentWidth: contentBounds.width,
  271 |       titleWidth: title.clientWidth, titleScrollWidth: title.scrollWidth, clamp: style.webkitLineClamp,
  272 |       wrap: style.overflowWrap, text: title.textContent };
  273 |   }));
  274 |   for (const row of layout) {
  275 |     expect(row.rowWidth).toBeCloseTo(layout[0]!.rowWidth, 0);
  276 |     expect(row.contentLeft).toBeCloseTo(layout[0]!.contentLeft, 0);
  277 |     expect(row.contentWidth).toBeGreaterThanOrEqual(120);
  278 |     expect(row.titleScrollWidth).toBeLessThanOrEqual(row.titleWidth + 1);
  279 |     expect(row.clamp).toBe("none");
  280 |     expect(row.wrap).toBe("anywhere");
  281 |   }
  282 |   writeFileSync(`${evidence}/item-${info.project.name}-layout.json`, JSON.stringify(layout, null, 2));
  283 |   const padding = await first.evaluate(node => getComputedStyle(node).paddingTop);
  284 |   expect(padding).toBe("16px");
  285 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  286 |   expect(await first.evaluate(node => getComputedStyle(node).paddingTop)).toBe("12px");
  287 |   const link = page.getByRole("link", { name: /文字排版规范/ });
  288 |   const navigationIcon = link.locator('[data-slot="media"] > [data-rain-id="icon"]');
  289 |   const iconFacts = [];
  290 |   for (const [theme, label] of [["light", "浅色"], ["dark", "深色"]] as const) {
  291 |     await page.getByRole("button", { name: label, exact: true }).click();
  292 |     const measured = await navigationIcon.evaluate(icon => {
  293 |       const probe = document.createElement("span");
  294 |       probe.style.color = "var(--rain-category-icon-neutral-3)";
  295 |       icon.parentElement!.append(probe);
  296 |       const expectedColor = getComputedStyle(probe).color;
  297 |       probe.remove();
  298 |       return { asset: icon.getAttribute("data-icon"), hidden: icon.getAttribute("aria-hidden"), color: getComputedStyle(icon).color, expectedColor, mask: getComputedStyle(icon).maskImage };
  299 |     });
  300 |     iconFacts.push({ theme, ...measured });
  301 |     expect.soft(measured.asset).toBe("icon/arrow-right");
  302 |     expect.soft(measured.color).toBe(measured.expectedColor);
  303 |     expect(measured.hidden).toBe("true");
  304 |     expect(measured.mask).toContain("arrow-right");
  305 |     await link.screenshot({ path: `${evidence}/item-${info.project.name}-navigation-${theme}.png` });
  306 |     await navigationIcon.screenshot({ path: `${evidence}/item-${info.project.name}-arrow-right-${theme}.png` });
  307 |   }
  308 |   writeFileSync(`${evidence}/item-${info.project.name}-navigation-icon.json`, JSON.stringify(iconFacts, null, 2));
  309 |   await page.getByRole("button", { name: "浅色", exact: true }).click();
  310 |   await link.focus();
  311 |   await page.keyboard.press("Tab");
  312 |   await page.keyboard.press("Shift+Tab");
  313 |   await expect(link).toBeFocused();
  314 |   expect(await link.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
  315 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-focused-link.png`, fullPage: true });
  316 |   await page.keyboard.press("Enter");
  317 |   await expect(page).toHaveURL(/#typography$/);
  318 |   await expect(page.locator("#typography-title")).toBeFocused();
  319 | });
```