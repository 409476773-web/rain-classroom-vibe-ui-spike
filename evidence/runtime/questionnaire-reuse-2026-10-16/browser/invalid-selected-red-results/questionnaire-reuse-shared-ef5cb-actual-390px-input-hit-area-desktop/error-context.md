# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: questionnaire-reuse.spec.ts >> shared field focus/permissions, forced colors, and actual 390px input hit area
- Location: tests/e2e/questionnaire-reuse.spec.ts:207:1

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('[data-reuse-era="after"]').getByRole('form', { name: 'after invalid', exact: true }).getByRole('radio', { name: '选中项', exact: true }).locator('..')
Expected: "rgb(243, 72, 72)"
Received: "rgb(61, 123, 255)"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for locator('[data-reuse-era="after"]').getByRole('form', { name: 'after invalid', exact: true }).getByRole('radio', { name: '选中项', exact: true }).locator('..')
    14 × locator resolved to <label data-invalid="" data-checked="" data-shortcut="A" data-type="radio" data-slot="choice" data-state="checked" data-density="default" data-rain-state="checked" class="rain-selection-card rain-selection-card__selection w-full rain-radio relative inline-flex min-w-rain-0 max-w-full items-start gap-rain-8 align-middle font-rain-ui cursor-pointer has-[:disabled]:cursor-not-allowed rain-questionnaire__choice">…</label>
       - unexpected value "rgb(61, 123, 255)"

```

```yaml
- radio "选中项" [checked]
- text: 选中项
```

# Test source

```ts
  122 |   await expect(form.getByRole("progressbar")).toContainText("第 2 题");
  123 |   await detail.fill("希望理解证据");
  124 |   await form.getByRole("button", { name: "下一题", exact: true }).click();
  125 |   await form.getByRole("checkbox", { name: /观察记录/ }).locator("..").click();
  126 |   await form.getByRole("button", { name: "上一题", exact: true }).click();
  127 |   await expect(detail).toHaveValue("希望理解证据");
  128 |   await form.getByRole("button", { name: "下一题", exact: true }).click();
  129 |   await form.getByRole("button", { name: "下一题", exact: true }).click();
  130 |   const note = form.getByRole("textbox", { name: "给老师的补充", exact: true });
  131 |   await note.fill("原生自定义 render 仍可输入\n第二行");
  132 |   await expect(note).toHaveValue("原生自定义 render 仍可输入\n第二行");
  133 |   await expect(note).toHaveAttribute("maxlength", "120");
  134 |   await page.getByText("演示控制", { exact: true }).click();
  135 |   await page.getByRole("button", { name: "模拟提交失败：关", exact: true }).click();
  136 |   await form.getByRole("button", { name: "提交反馈", exact: true }).click();
  137 |   await expect(form.getByRole("alert")).toContainText("提交失败");
  138 |   await expect(note).toHaveValue("原生自定义 render 仍可输入\n第二行");
  139 |   await page.getByRole("button", { name: "模拟提交失败：开", exact: true }).click();
  140 |   await form.getByRole("button", { name: "提交反馈", exact: true }).click();
  141 |   await expect(page.getByRole("region", { name: "反馈摘要", exact: true })).toContainText("希望理解证据");
  142 |   await expect(page.getByRole("heading", { name: "反馈已提交", exact: true })).toBeFocused();
  143 | });
  144 | 
  145 | for (const shortcuts of ["letters", "numbers"] as const) test(`${shortcuts} shortcuts, sole native labels/inputs and skip re-selection match Primitive`, async ({ page }, info) => {
  146 |   await mount(page, { shortcuts });
  147 |   const report = [];
  148 |   for (const era of ["rain", "raw"]) {
  149 |     const form = page.getByRole("form", { name: `Comparison ${era}`, exact: true });
  150 |     const goal = form.getByRole("group", { name: "Goal", exact: true });
  151 |     await expect(goal.locator('input[type="radio"]')).toHaveCount(3);
  152 |     if (era === "rain") expect(await goal.locator('input[type="radio"]').evaluateAll(inputs => inputs.every(input => input.parentElement?.tagName === "LABEL" && input.parentElement.querySelectorAll("input").length === 1 && input.parentElement.querySelectorAll("label").length === 0 && input.nextElementSibling?.getAttribute("data-slot") === "canvas"))).toBe(true);
  153 |     await expect(form.getByRole("radio", { name: "Alpha", exact: true }).locator("..")).not.toHaveAttribute("data-disabled");
  154 |     await expect(form.getByRole("radio", { name: "Disabled", exact: true }).locator("..")).toHaveAttribute("data-disabled");
  155 |     await goal.focus(); await goal.press(shortcuts === "letters" ? "b" : "2");
  156 |     await expect(form.getByRole("radio", { name: "Beta", exact: true })).toBeChecked();
  157 |     await expect(form.locator("[data-reuse-changes]")).toHaveText("1");
  158 |     await expect(goal).toBeVisible();
  159 |     await goal.press(shortcuts === "letters" ? "c" : "3");
  160 |     await expect(form.getByRole("radio", { name: "Disabled", exact: true })).not.toBeChecked();
  161 |     await form.getByRole("button", { name: "Skip", exact: true }).click();
  162 |     await form.getByRole("button", { name: "Previous", exact: true }).click();
  163 |     expect((await facts(form)).data).toEqual([]);
  164 |     await form.getByRole("radio", { name: "Alpha", exact: true }).locator("..").click();
  165 |     expect((await facts(form)).data).toEqual([["goal", "a"]]);
  166 |     const input = form.getByRole("textbox", { name: "Free answer", exact: true });
  167 |     await expect(input).toHaveAttribute("size", "20"); await expect(input).toHaveAttribute("maxlength", "120");
  168 |     await input.fill("native answer"); await expect(form.getByRole("radio", { name: "Alpha", exact: true })).not.toBeChecked();
  169 |     await input.press("a"); expect((await facts(form)).data).toEqual([["goal", "native answera"]]);
  170 |     report.push({ era, facts: await facts(form) });
  171 |   }
  172 |   expect(report[0]!.facts).toEqual(report[1]!.facts);
  173 |   writeFileSync(resolve(evidence, `shortcuts-${shortcuts}-${info.project.name}.json`), JSON.stringify(report, null, 2));
  174 | });
  175 | 
  176 | test("native constraints and six reset paths retain raw-engine DOM values and FormData", async ({ page }, info) => {
  177 |   test.setTimeout(120_000);
  178 |   const report = [];
  179 |   for (const reset of ["current", "old-text", "default-old-text", "skip", "cancel", "controlled"]) {
  180 |     await mount(page, { reset });
  181 |     const records = [];
  182 |     for (const era of ["rain", "raw"]) {
  183 |       const form = page.getByRole("form", { name: `Comparison ${era}`, exact: true });
  184 |       const input = form.getByRole("textbox", { name: "Free answer", exact: true });
  185 |       await input.fill("new text");
  186 |       if (reset === "current") {
  187 |         await input.fill(""); await input.pressSequentially("x".repeat(121)); await expect(input).toHaveValue("x".repeat(120));
  188 |         expect(await input.evaluate(node => ({ min: (node as HTMLInputElement).minLength, pattern: (node as HTMLInputElement).pattern, size: (node as HTMLInputElement).size }))).toEqual({ min: 2, pattern: ".{2,}", size: 20 });
  189 |         await input.fill(""); await input.pressSequentially("😀".repeat(61)); await expect(input).toHaveValue("😀".repeat(60));
  190 |         await input.fill(""); await input.pressSequentially("x");
  191 |         expect(await input.evaluate(node => (node as HTMLInputElement).validity.tooShort)).toBe(true);
  192 |         expect(await input.evaluate(node => (node as HTMLInputElement).validity.patternMismatch)).toBe(true);
  193 |       }
  194 |       if (reset === "old-text" || reset === "default-old-text") await form.getByRole("radio", { name: "Alpha", exact: true }).locator("..").click();
  195 |       if (reset === "skip") { await form.getByRole("button", { name: "Skip", exact: true }).click(); await form.getByRole("button", { name: "Previous", exact: true }).click(); }
  196 |       const before = await facts(form);
  197 |       await form.getByRole("button", { name: "Reset", exact: true }).click();
  198 |       records.push({ era, before, after: await facts(form) });
  199 |     }
  200 |     expect(records[0]!.before, reset).toEqual(records[1]!.before);
  201 |     expect(records[0]!.after, reset).toEqual(records[1]!.after);
  202 |     report.push({ reset, records });
  203 |   }
  204 |   writeFileSync(resolve(evidence, `native-reset-${info.project.name}.json`), JSON.stringify(report, null, 2));
  205 | });
  206 | 
  207 | test("shared field focus/permissions, forced colors, and actual 390px input hit area", async ({ page }, info) => {
  208 |   await mount(page, { mode: "visual" });
  209 |   const after = page.locator('[data-reuse-era="after"]'), normal = after.getByRole("textbox", { name: "normal answer", exact: true });
  210 |   const invalid = after.getByRole("textbox", { name: "invalid answer", exact: true }), disabled = after.getByRole("textbox", { name: "disabled answer", exact: true }), readonly = after.getByRole("textbox", { name: "readonly answer", exact: true });
  211 |   await expect(disabled).toBeDisabled(); await expect(disabled.locator("..")).toHaveAttribute("data-state", "disabled");
  212 |   await expect(readonly).toHaveAttribute("readonly", ""); await expect(readonly.locator("..")).toHaveAttribute("data-permission", "readonly");
  213 |   await expect(invalid.locator("..")).toHaveAttribute("data-status", "error");
  214 |   const normalForm = after.getByRole("form", { name: "after normal", exact: true });
  215 |   const choice = normalForm.getByRole("radio", { name: "未选项", exact: true }), shape = choice.locator("..").locator('[data-slot="control"]');
  216 |   await choice.focus(); await choice.press("Space"); await expect(choice).toBeChecked();
  217 |   await expect(shape).toHaveCSS("outline-style", "solid");
  218 |   const invalidChoice = after.getByRole("form", { name: "after invalid", exact: true }).getByRole("radio", { name: "未选项", exact: true }).locator("..");
  219 |   await expect(invalidChoice).toHaveAttribute("data-invalid");
  220 |   const invalidBorder = await invalidChoice.evaluate(node => { const probe = document.createElement("span"); node.append(probe); probe.style.color = "var(--rain-category-border-red-1)"; const expected = getComputedStyle(probe).color; probe.remove(); return expected; });
  221 |   await expect(invalidChoice).toHaveCSS("border-color", invalidBorder);
> 222 |   await expect(after.getByRole("form", { name: "after invalid", exact: true }).getByRole("radio", { name: "选中项", exact: true }).locator("..")).toHaveCSS("border-color", invalidBorder);
      |                                                                                                                                                ^ Error: expect(locator).toHaveCSS(expected) failed
  223 |   const report = [];
  224 |   const select = after.getByRole("combobox", { name: "Select sibling", exact: true }), textarea = after.getByRole("textbox", { name: "Textarea sibling", exact: true });
  225 |   for (const target of [normal, invalid, readonly, select, textarea]) {
  226 |     await target.focus(); await target.press("Tab"); await page.keyboard.press("Shift+Tab");
  227 |     await expect(target).toBeFocused(); await expect(target.locator("..")).toHaveCSS("outline-width", "1px");
  228 |     report.push(await target.evaluate(node => { const css = getComputedStyle(node.parentElement!); return { label: node.getAttribute("aria-label"), outline: css.outline, shadow: css.boxShadow }; }));
  229 |   }
  230 |   if (info.project.name === "narrow") {
  231 |     await normal.scrollIntoViewIfNeeded();
  232 |     const box = (await normal.boundingBox())!; expect(box.height).toBeGreaterThanOrEqual(44);
  233 |     for (const y of [box.y + 2, box.y + box.height - 2]) {
  234 |       await normal.evaluate(node => (node as HTMLInputElement).blur()); await page.mouse.click(box.x + box.width / 2, y); await expect(normal).toBeFocused();
  235 |     }
  236 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  237 |     report.push({ actualInputHeight: box.height, topAndBottomClicksFocus: true });
  238 |   }
  239 |   await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  240 |   for (const target of [normal, select, textarea]) {
  241 |     await target.focus(); await target.press("Tab"); await page.keyboard.press("Shift+Tab");
  242 |     await expect(target.locator("..")).toHaveCSS("outline-width", "2px"); await expect(target.locator("..")).toHaveCSS("box-shadow", "none");
  243 |   }
  244 |   await choice.focus(); await expect(shape).toHaveCSS("outline-width", "2px");
  245 |   const placeholder = await normal.evaluate(node => getComputedStyle(node, "::placeholder").color);
  246 |   expect(placeholder).not.toBe("rgba(0, 0, 0, 0)");
  247 |   await after.screenshot({ path: resolve(evidence, `forced-colors-${info.project.name}.png`) });
  248 |   writeFileSync(resolve(evidence, `focus-hit-area-${info.project.name}.json`), JSON.stringify({ report, placeholder }, null, 2));
  249 | });
  250 | 
  251 | test("baseline/current ordinary DOM-paint-geometry equality and questionnaire visual matrix", async ({ page }, info) => {
  252 |   test.setTimeout(120_000);
  253 |   const report = [];
  254 |   for (const theme of ["light", "dark"] as const) for (const density of ["default", "compact"] as const) {
  255 |     await mount(page, { mode: "visual", theme, density });
  256 |     const records = [];
  257 |     for (const era of ["before", "after"]) {
  258 |       const panel = page.locator(`[data-reuse-era="${era}"]`), ordinary = panel.locator('[data-visual="ordinary"]');
  259 |       const facts = await ordinary.evaluate(host => {
  260 |         const origin = host.getBoundingClientRect();
  261 |         return [...host.querySelectorAll("*")].map(node => {
  262 |           const css = getComputedStyle(node), r = node.getBoundingClientRect();
  263 |           const round = (n: number) => Math.round(n * 100) / 100;
  264 |           return { tag: node.tagName, classes: [...node.classList].sort(), slot: node.getAttribute("data-slot"), state: node.getAttribute("data-state"), text: node.childElementCount ? null : node.textContent,
  265 |             input: node instanceof HTMLInputElement ? { type: node.type, checked: node.checked, disabled: node.disabled, mixed: node.indeterminate } : null,
  266 |             box: { x: round(r.x - origin.x), y: round(r.y - origin.y), width: round(r.width), height: round(r.height) },
  267 |             css: { color: css.color, background: css.backgroundColor, backgroundImage: css.backgroundImage, border: css.border, radius: css.borderRadius, padding: css.padding, gap: css.gap, font: css.font, opacity: css.opacity, outline: css.outline, shadow: css.boxShadow } };
  268 |         });
  269 |       });
  270 |       records.push({ era, facts });
  271 |       await ordinary.screenshot({ path: resolve(evidence, `ordinary-${era}-${theme}-${density}-${info.project.name}.png`) });
  272 |       await panel.locator('[data-visual="questionnaire"]').screenshot({ path: resolve(evidence, `questionnaire-${era}-${theme}-${density}-${info.project.name}.png`) });
  273 |     }
  274 |     expect(records[0]!.facts).toEqual(records[1]!.facts);
  275 |     report.push({ theme, density, records });
  276 |   }
  277 |   writeFileSync(resolve(evidence, `before-after-${info.project.name}.json`), JSON.stringify({ note: "Before TSX is copied from the frozen task baseline; relative behavior dependencies resolve to unchanged live helpers. Before global CSS is scoped with native @scope; before questionnaire class names and CSS are renamed together. Original controls must match DOM/paint/geometry. Questionnaire screenshots document the intentional visual change and await human acceptance.", report }, null, 2));
  278 | });
  279 | 
```